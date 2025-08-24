---
sidebar_position: 1
title: Springboot Example
---

# Spring Boot template (annotated)

These manifests deploy a Spring Boot service behind Traefik using Kustomize. Explanations, gotchas, and a couple of alternatives are included.

> Replace placeholders like `<service-name>`, `<team>`, `<image>`, `<tag>` with your values.

---

## `ingress.yaml`

```yaml title="ingress.yaml"
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: <service-name>
  namespace: <team>
  annotations:
    traefik.ingress.kubernetes.io/router.entrypoints: websecure # send traffic over HTTPS
spec:
  ingressClassName: traefik
  tls:
    - hosts: ["sau-portal.de"]           
      secretName: tls-to-come              
  rules:
    - host: sau-portal.de
      http:
        paths:
          - path: /<team>/<service-name>   # Public URL prefix for this service
            pathType: Prefix
            backend:
              service:
                name: <service-name>       # Must match the Service metadata.name
                port:
                  number: 80              
```

**What’s happening**
- Routes `https://sau-portal.de/<team>/<service-name>/*` to your Service on port 80.
- Traefik terminates TLS using `tls-to-come`. 
   :::caution
  currently there is no TLS for services
   :::

**Gotchas**
- `tls.hosts` must include **exactly** the host(s) in your rules; if you later use another host, add it here too.
- Path **rewrite**: This Ingress does **not** strip the `/<service-name>` segment. The backend receives the full path.
  - If your Spring Boot `server.servlet.context-path` is only `/<team>`, your controllers must be mapped under `/<service-name>` (see options below), or use a Traefik `StripPrefix` middleware.

---

## `deployment.yaml`

```yaml title="deployment.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <service-name>
  namespace: <team> # e.g. ase-1
  labels:
    app.kubernetes.io/name: <service-name>
    app.kubernetes.io/instance: <service-name>
spec:
  replicas: 2                              
  revisionHistoryLimit: 2
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app.kubernetes.io/name: <service-name>
      app.kubernetes.io/instance: <service-name>
  template:
    metadata:
      labels:
        app.kubernetes.io/name: <service-name>
        app.kubernetes.io/instance: <service-name>
    spec:
      serviceAccountName: default
      terminationGracePeriodSeconds: 30        
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        runAsGroup: 1000
        fsGroup: 1000
      imagePullSecrets:
        - name: <pull-secret-name>             # e.g. ghrc-secret for GHCR
      containers:
        - name: app
          image: ghcr.io/agile-software-engineering-25/<image>:<tag>   
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 8080              
          env:
            - name: SERVER_SERVLET_CONTEXT_PATH
              value: "/<team>"                # App will live under /<team>
            
            # Tell Spring to respect X-Forwarded-* from Traefik
            - name: SERVER_FORWARD_HEADERS_STRATEGY
              value: "framework"

            # Reasonable JVM sizing for containers (tune per app)
            - name: JAVA_TOOL_OPTIONS
              value: "-XX:MaxRAMPercentage=75 -XX:InitialRAMPercentage=50 -Djava.security.egd=file:/dev/./urandom"

            # Expose only necessary actuator endpoints; prometheus requires micrometer-registry-prometheus
            - name: MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE
              value: "health,prometheus"
            - name: MANAGEMENT_ENDPOINT_HEALTH_PROBES_ENABLED
              value: "true"                      # Adds /actuator/health/liveness & /readiness

            # Enable graceful shutdown at app level (align with terminationGracePeriodSeconds)
            - name: SERVER_SHUTDOWN
              value: "graceful"

          readinessProbe:
            httpGet:
              path: /<team>/actuator/health/readiness
              port: 8080
            initialDelaySeconds: 10
            periodSeconds: 5
            failureThreshold: 6
            timeoutSeconds: 1
          livenessProbe:
            httpGet:
              path: /<team>/actuator/health/liveness
              port: 8080
            initialDelaySeconds: 20
            periodSeconds: 10
            failureThreshold: 3
            timeoutSeconds: 1
          startupProbe:
            httpGet:
              path: /<team>/actuator/health
              port: 8080
            periodSeconds: 5
            failureThreshold: 30

          resources:
            requests:
              cpu: "250m"
              memory: "512Mi"
            limits:
              cpu: "1"
              memory: "1024Mi"

          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true       # Immutable root FS → mount /tmp as writable
            capabilities:
              drop: ["ALL"]

          volumeMounts:
            - name: tmp
              mountPath: /tmp                  

      volumes:
        - name: tmp
          emptyDir: {}                         
```

**What’s happening**
- Runs a non-root container with immutable root FS and a writable `/tmp`.
- Actuator health groups for k8s are enabled; probes point to the context path + actuator endpoints.
- JVM memory opts scale with container limits.
- Readiness/liveness/startup probes are tuned for typical Boot startup; adjust for your app’s profile.

**Gotchas**
- The probe paths include the **context path** (`/<team>`). Probes talk **directly** to the Pod, not through Ingress.
- If you enable `readOnlyRootFilesystem`, ensure all write paths (logs, tmp, caches) are redirected to writable volumes or `/tmp`.
- Consider setting `SPRING_MAIN_BANNER-MODE=off` for quieter logs (optional).
- `terminationGracePeriodSeconds` should be ≥ your Spring graceful shutdown timeout (defaults ~30s). You can tune `SPRING_LIFECYCLE_TIMEOUT_PER_SHUTDOWN_PHASE`.

---

## Routing options: make paths line up

You have two clean choices to make Ingress and app paths consistent:

### Option A (keep as in template)
- **Ingress path:** `/<team>/<service-name>`
- **Spring context path:** `/<team>` (via `SERVER_SERVLET_CONTEXT_PATH`)
- **Controller mappings:** prefix your REST controllers with `@RequestMapping("/<service-name>")` (or an API base like `"/<service-name>/api"`).
- **Probes:** `/ <team >/actuator/...` (already in template).

### Option B (single context path)
- Set `SERVER_SERVLET_CONTEXT_PATH= /<team>/<service-name>` so the app lives exactly where the Ingress routes.
- Update probes accordingly, e.g. `/ <team >/ <service-name >/actuator/health/liveness`.
- This avoids per-controller prefixes.

### Option C (strip at the edge)
- Keep app at `/<team>` and configure a Traefik `StripPrefix` middleware to remove `/<service-name>` before proxying.
- Use this if you can’t or don’t want to change app paths.

> Pick **one** approach and apply it consistently to avoid 404s.

---

## `service.yaml`

```yaml title="service.yaml"
apiVersion: v1
kind: Service
metadata:
  name: <service-name>
  namespace: <team> # e.g ase-1
spec:
  selector:
    app.kubernetes.io/name: <service-name>  # Must match Deployment template labels
  ports:
    - name: http
      port: 80                               
      targetPort: 8080                     
```

**What’s happening**
- Stable in-cluster endpoint for the Pods; Ingress sends traffic here.

**Gotchas**
- If you change labels in the Deployment, update the Service `selector` to match.

---

## `kustomization.yaml` (base)

```yaml title="kustomization.yaml (base)"
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: <team> #e.g ase-1
resources:
  - deployment.yaml
  - service.yaml
  - ingress.yaml
```

**What’s happening**
- Defines the base set of resources. Overlays overlay (:D) environment-specific bits like tags and suffixes.

---

## Overlay example (dev)

```yaml title="overlays/dev/kustomization.yaml"
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - ../../base
images:
  - name: ghcr.io/agile-software-engineering-25/<image>:<tag>     # Must exactly match the image in the Deployment to be rewritten
    newTag: 1.0.0
nameSuffix: -dev                        # Appends "-dev" to resource names
```

**What’s happening**
- Reuses the base and swaps in the `1.0.0` image tag.
- Adds a `-dev` suffix to resources (e.g., `Deployment/<service-name>-dev`).

**Gotchas**
- If you suffix names, references in other manifests are rewritten by Kustomize for known fields (Service names in Ingress backends are supported). Still, verify with `kustomize build`.

---

## Prometheus metrics (optional)

- The env `MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE=health,prometheus` exposes `/actuator/prometheus` when the **Prometheus registry** is on the classpath.
- Add the dependency (example for Gradle):

```kotlin title="build.gradle.kts"
dependencies {
  implementation("io.micrometer:micrometer-registry-prometheus")
}
```

- If you run Prometheus Operator, create a `ServiceMonitor` that scrapes the Service on `/actuator/prometheus`.

---

## Minimal Dockerfile (example)

```dockerfile title="Dockerfile"
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# Copy fat jar
COPY build/libs/*.jar app.jar
# Run as non-root (matches k8s securityContext)
USER 1000:1000
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
```

> Ensure the container listens on 8080 (default for Boot when not overridden), or update manifests accordingly.

---

## Quick local health check

```sh
# If you port-forward the Pod to localhost:8080
kubectl -n <team> port-forward deploy/<service-name> 8080:8080
curl -i http://localhost:8080/<team>/actuator/health
```

You should see `200 OK` with a JSON health payload.

---

## Common pitfalls checklist

- **Context vs Ingress path mismatch** → choose Option A/B/C above and be consistent.
- **Missing TLS host** → keep `spec.tls.hosts` in sync with `rules.host`.
- **Read-only FS writes** → mount `/tmp` and redirect any file writes there or to another volume.
- **Probes too strict** → increase `startupProbe.failureThreshold` or delays for slow, cold-start profiles.
- **Forwarded headers** → keep `SERVER_FORWARD_HEADERS_STRATEGY=framework` so links and redirects use the external host + scheme.
- **Image placeholder** → fix `ghcr.io/<org>/<image>:<tag>` (avoid accidental `//`).

