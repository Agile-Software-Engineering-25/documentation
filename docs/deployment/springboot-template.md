---
sidebar_position: 5
---

# Templates

## Springboot template

These are templates for a springboot deployment

### ingress.yaml

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: <service-name>
  namespace: <team>
  annotations:
    traefik.ingress.kubernetes.io/router.entrypoints: websecure
spec:
  ingressClassName: traefik
  tls:
    - hosts: ["sau-portal.de"]
      secretName: tls-to-come 
  rules:
    - host: sau-portal.de
      http:
        paths:
          - path: /<team>/<service-name>
            pathType: Prefix
            backend:
              service:
                name: <service-name>
                port:
                  number: 80
```

### deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <service-name>
  namespace: <team>                        # e.g. ase-1
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
        - name: <pull-secret-name>         # pull secret, e.g ghrc-secret
      containers:
        - name: app
          image: ghcr.io/agile-software-engineering-25/<image>:<tag>  # e.g. ghcr.io/agile-software-engineering-25/python-k3s-demo:latest
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: 8080
          env:
            - name: SERVER_SERVLET_CONTEXT_PATH
              value: "/<team>" # e.g ase-1
            - name: SERVER_FORWARD_HEADERS_STRATEGY
              value: "framework"
            - name: JAVA_TOOL_OPTIONS
              value: "-XX:MaxRAMPercentage=75 -XX:InitialRAMPercentage=50 -Djava.security.egd=file:/dev/./urandom"
            - name: MANAGEMENT_ENDPOINTS_WEB_EXPOSURE_INCLUDE
              value: "health,prometheus"
            - name: MANAGEMENT_ENDPOINT_HEALTH_PROBES_ENABLED
              value: "true"
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
            readOnlyRootFilesystem: true
            capabilities:
              drop: ["ALL"]
          volumeMounts:
            - name: tmp
              mountPath: /tmp
      volumes:
        - name: tmp
          emptyDir: {}
```

### service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: <service-name>
  namespace: <team>      # e.g ase-1        
spec:
  selector:
    app.kubernetes.io/name: <service-name>
  ports:
    - name: http
      port: 80
      targetPort: 8080
```

### kustomization.yaml

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: <team> #e.g ase-1
resources:
  - java-spring-deployment.yaml
  - java-spring-service.yaml
  - ingress.yaml
```

### overlay

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - ../../base
images:
  - name: ghcr.io/agile-software-engineering-25/<app>:<tag>
    newTag: 1.0.0
nameSuffix: -dev # for dev overlay
```