---
sidebar_position: 6
---

# Templates

## vite template

### dockerfile

```dockerfile
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# important to set the correct path for your app
ARG BASE_PATH=/<team>/app/<app-path>/
RUN npm run build -- --base=${BASE_PATH}

# --- serve
FROM nginxinc/nginx-unprivileged:1.29.1-alpine
COPY --from=build /app/dist /usr/share/nginx/html/<team>/app/<app-path>/
```

### main-ingress.yaml 

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: main
  namespace: main
  annotations:
    traefik.ingress.kubernetes.io/router.entrypoints: websecure
spec:
  ingressClassName: traefik
  tls: [ { hosts: ["sau-portal.de"], secretName: still-to-come-tls } ]
  rules:
    - host: sau-portal.de
      http:
        paths:
          - path: /main
            pathType: Prefix
            backend:
              service:
                name: <app-name>
                port:
                  number: 80
```

### ingress.yaml

```yaml
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
          - path: /<team>/app/<app-path>
            pathType: Prefix
            backend:
              service:
                name: <app-name>
                port:
                  number: 80
```

### config-map.yaml

```yaml
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
        location ~* /healthz$ { return 200 'ok'; add_header Content-Type text/plain; }

        location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?)$ {
          root /usr/share/nginx/html;
          expires 1y; add_header Cache-Control "public, max-age=31536000, immutable";
          try_files $uri =404;
        }

        location = /<team>/app/<app-path>/remoteEntry.js {
          root /usr/share/nginx/html;
          try_files $uri =404;
        }

        location /<team>/app/<app-path>/ {
          root /usr/share/nginx/html;
          try_files $uri $uri/ /<team>/app/<app-path>/index.html;
        }
      }
    }
```

### deployment.yaml

```yaml
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
        - name: <pull-secret-name> # e.g ghrc-secret
      securityContext:
        runAsNonRoot: true
        runAsUser: 101        
        runAsGroup: 101
        fsGroup: 101
      containers:
        - name: web
          image:  ghcr.io/agile-software-engineering-25/<image>:<tag> # e.g ghcr.io/agile-software-engineering-25/python-k3s-demo:latest
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

### service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: <app-name>
  namespace: <team>
spec:
  type: ClusterIP
  selector: { app.kubernetes.io/name: <app-name> }
  ports: [ { name: http, port: 80, targetPort: 8080 } ]
  ```

### kustomization.yaml

### overlay

