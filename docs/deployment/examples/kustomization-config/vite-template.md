---
sidebar_position: 2
title: Vite Example
---

# Vite template (annotated)

This page adds concise explanations and gotchas to a production-ready Vite + Nginx deployment on Kubernetes with Traefik Ingress and Kustomize overlays.

## How to read this template

- Replace all placeholders like `<app-name>`, `<team>`, `<app-path>`, `<tag>` with your values.
- The Nginx config assumes your built assets live at `/usr/share/nginx/html` inside the container.
- The app is served under a **sub-path**: `/<team>/app/<app-path>/`. Your Vite `base` must match this (see tip below).

:::tip Vite base path
In `vite.config.ts` set:

```ts title="vite.config.ts"
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/<team>/app/<app-path>/',
})
```

This ensures all asset URLs are generated with the correct prefix when hosted behind Traefik at a sub-path.
:::

---

## `ingress.yaml`

```yaml title="ingress.yaml"
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: <app-name>                       
  namespace: <team>                   
  annotations:
    traefik.ingress.kubernetes.io/router.entrypoints: websecure  
spec:
  ingressClassName: traefik              
  tls:
    - hosts: ["sau-portal.de"]                
      secretName: still-to-come-tls     
  rules:
    - host: sau-portal.de                
      http:
        paths:
          - path: /<team>/app/<app-path> # URL path prefix under which the app is served
            pathType: Prefix
            backend:
              service:
                name: <app-name>      
                port:
                  number: 80            
```

**What’s happening:**
- Routes `https://sau-portal.de/<team>/app/<app-path>/*` to your Service.
- Traefik terminates TLS using the certificate in `secretName`.
   :::caution
  currently there is no TLS for services
   :::
**Gotchas:**
- The `tls.hosts` list must contain **every** host you use. If your rule uses `sau-portal.de`, add that exact host in `tls.hosts` too, e.g. `hosts: ["sau-portal.de"]` (or include both).
- If you change the sub-path, update **both** Ingress `path` and the Vite `base` setting.

---

## `config-map.yaml` (Nginx)

```yaml title="config-map.yaml"
apiVersion: v1
kind: ConfigMap
metadata:
  name: <app-name>-nginx
  namespace: <team>
data: # remember to change data for your team in this config and dont just copy it
  nginx.conf: |
    worker_processes 1;
    events { worker_connections 1024; }
    http {
      include mime.types; default_type application/octet-stream; sendfile on;
      server {
        listen 8080; server_name _;

        # Simple health check endpoint for probes
        location ~* /healthz$ { return 200 'ok'; add_header Content-Type text/plain; }

        # Long-cache static assets (immutable, content-hashed files)
        location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?)$ {
          root /usr/share/nginx/html;
          expires 1y; add_header Cache-Control "public, max-age=31536000, immutable";
          try_files $uri =404;
        }

        # Explicitly expose module-federation entry if you use it
        location = /<team>/app/<app-path>/remoteEntry.js {
          root /usr/share/nginx/html;
          try_files $uri =404;
        }

        # SPA routing: fallback to index.html inside the sub-path
        location /<team>/app/<app-path>/ {
          root /usr/share/nginx/html;
          try_files $uri $uri/ /<team>/app/<app-path>/index.html;
        }
      }
    }
```

**What’s happening:**
- Serves static files from `/usr/share/nginx/html` on port `8080`.
- Caches fingerprinted assets aggressively for performance.
- Provides `/healthz` for Kubernetes probes.
- Uses SPA fallback so client-side routing works under the sub-path.

**Gotchas:**
- Ensure your Docker image copies the Vite build output (usually `dist/`) to `/usr/share/nginx/html`.
- If you don’t use Module Federation, you can remove the `remoteEntry.js` location block.

---

## `deployment.yaml`

```yaml title="deployment.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <app-name>
  namespace: <team>
  labels:
    app.kubernetes.io/name: <app-name>
spec:
  replicas: 2                               
  revisionHistoryLimit: 2                  
  selector:
    matchLabels:
      app.kubernetes.io/name: <app-name>
  template:
    metadata:
      labels:
        app.kubernetes.io/name: <app-name>
    spec:
      imagePullSecrets:
        - name: <pull-secret-name>          # e.g. ghrc-secret for GHCR
      securityContext:
        runAsNonRoot: true
        runAsUser: 101
        runAsGroup: 101
        fsGroup: 101                       
      containers:
        - name: web
          image: ghcr.io/agile-software-engineering-25/<image>:<tag> 
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8080         
              name: http
          readinessProbe:
            httpGet: { path: /healthz, port: 8080 }
            initialDelaySeconds: 5
            periodSeconds: 5
          livenessProbe:
            httpGet: { path: /healthz, port: 8080 }
            initialDelaySeconds: 10
            periodSeconds: 10
          resources:
            requests: { cpu: "100m", memory: "128Mi" }
            limits:   { cpu: "500m", memory: "256Mi" }
          volumeMounts:
            - name: nginx-conf
              mountPath: /etc/nginx/nginx.conf
              subPath: nginx.conf           
            - name: nginx-cache
              mountPath: /var/cache/nginx
            - name: nginx-run
              mountPath: /var/run
      volumes:
        - name: nginx-conf
          configMap:
            name: <app-name>-nginx
            items:
              - key: nginx.conf
                path: nginx.conf
        - name: nginx-cache
          emptyDir: {}
        - name: nginx-run
          emptyDir: {}
```

**What’s happening:**
- Deploys a non-root Nginx container serving your Vite build.
- Health checks wire to `/healthz` in Nginx.
- Mounts your Nginx config from ConfigMap; provides ephemeral caches/run dirs.

**Gotchas:**
- The container image should already contain your built site at `/usr/share/nginx/html`.
- Ensure the container listens on `8080` to match probes and Service `targetPort`.

---

## `service.yaml`

```yaml title="service.yaml"
apiVersion: v1
kind: Service
metadata:
  name: <app-name>
  namespace: <team>
spec:
  type: ClusterIP
  selector: { app.kubernetes.io/name: <app-name> } 
  ports: [{ name: http, port: 80, targetPort: 8080 }] 
```

**What’s happening:**
- Stable in-cluster address that Traefik routes to via the Ingress.

**Gotchas:**
- `selector` must match the labels in your Deployment `.spec.template.metadata.labels`.

---

## `kustomization.yaml` (base)

```yaml title="kustomization.yaml (base)"
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: <team>           # e.g. ase-1
resources:
  - deployment.yaml
  - service.yaml
  - ingress.yaml
  - config-map.yaml
```

**What’s happening:**
- The base defines all core resources. Overlays can then patch/tag them per environment.

---

## Overlay example (dev)

```yaml title="overlays/dev/kustomization.yaml"
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - ../../base
images:
  - name: ghcr.io/agile-software-engineering-25/<image>:<tag>
    newTag: 1.0.0                   
nameSuffix: -dev                      # Appends "-dev" to resource names in this overlay
```

**What’s happening:**
- Reuses the base and swaps in the environment-specific image tag.
- Adds a `-dev` suffix to resource names (e.g., `Deployment/<app-name>-dev`).

**Gotchas:**
- The `images.name` must match the **exact** image reference used in your Deployment to be rewritten.
- If you suffix names, remember to adjust any external references accordingly (e.g., Ingress or Service names if referenced elsewhere).

---

## Common pitfalls

- **TLS host mismatch:** If `spec.rules[0].host` is `sau-portal.de`, ensure `spec.tls[0].hosts` contains `sau-portal.de` (or both hosts if you have multiple).
- **Wrong Vite base:** Broken asset URLs or blank page often mean `base` is not set to `/<team>/app/<app-path>/`.
- **Index fallback path:** The SPA fallback must point to the **prefixed** `index.html`, not `/index.html`.
- **Cache invalidation:** Use content-hashed filenames (Vite does this by default) so the long cache headers are safe.
- **Non-root container:** Make sure your image works with `runAsNonRoot` and UID/GID `101` (common for distroless/alpine nginx variants). Adjust if your base image differs.

---

## Minimal Dockerfile (example)

```dockerfile title="Dockerfile"
FROM nginx:1.27-alpine
# Copy built assets from your build stage or local dist
COPY dist/ /usr/share/nginx/html/
# Nginx config comes from the ConfigMap at runtime
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

> Build the Vite app first (e.g., `npm run build`) so `dist/` exists, or use a multi-stage Dockerfile.

---

## Health check locally

```sh
# If you run the container locally on 8080
curl -i http://localhost:8080/healthz
```

You should see `200 OK` with `ok`.

