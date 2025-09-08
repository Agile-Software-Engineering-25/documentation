---
sidebar_position: 1
title: Springboot Example
---

# Spring Boot template (annotated)

These manifests deploy a Spring Boot service behind Traefik using Kustomize. This assumes your spring boot application is listening on port 8080.

> Replace placeholders like `<service-name>`, `<team-namespace>`, `<deployment-path>`, `<image>` with your values. No angle bracket should be left in the final files.

You need to copy these files into your repo, under `k8s`.

---

## `kustomization.yaml` (overview)

```yaml title="kustomization.yaml"
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

metadata:
  name: <service-name>

resources:
  - deployment.yaml
  - service.yaml
  - ingress.yaml

commonLabels:
  environment: <team-namespace>
  managed-by: kustomize
  app: <service-name>

namePrefix: "ase-"

namespace: <team-namespace>

replicas:
  - name: <service-name>
    count: 1
```

## `service.yaml`

```yaml title="service.yaml"
apiVersion: v1
kind: Service
metadata:
  name: <service-name>
  labels:
    app: <service-name>
spec:
  selector:
    app: <service-name>
  ports:
    - name: http
      protocol: TCP
      port: 8080
      targetPort: 8080
  type: ClusterIP
```

## `ingress.yaml`

```yaml title="ingress.yaml"
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: <service-name>
  labels:
    app: <service-name>
  annotations:
    traefik.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: traefik
  rules:
    - host: sau-portal.de
      http:
        paths:
          - path: <deployment-path> # specify under which path your service should be reachable
            pathType: Prefix
            backend:
              service:
                name: <service-name>
                port:
                  number: 8080
```

## `deployment.yaml`

```yaml title="deployment.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <service-name>
  labels:
    app: <service-name>
spec:
  replicas: 1
  selector:
    matchLabels:
      app: <service-name>
  template:
    metadata:
      labels:
        app: <service-name>
    spec:
      containers:
        - name: <service-name>
          image: <image>
          ports:
            - containerPort: 8080
          resources:
            requests:
              memory: "256Mi"
              cpu: "100m"
            limits:
              memory: "1Gi"
              cpu: "300m"
          readinessProbe:
            httpGet:
              path: <deployment-path> # you might need to change this to a health endpoint of your application
              port: 8080
            initialDelaySeconds: 10
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: <deployment-path> # you might need to change this to a health endpoint of your application
              port: 8080
            initialDelaySeconds: 20
            periodSeconds: 20
          env: # add environment variables here if needed
            - name: SOME_ENVIRONMENT_VARIABLE
              value: "ᓚᘏᗢ"
```

## Remarks

### Base Path

Your application will get the full `<deployment-path>` as base path, so make sure your application can handle that.

To ensure this we recommend to set up a production profile that specifies `server.servlet.context-path=<deployment-path>`
:::tip
the profile can be activated via an environment variable in the deployment, e.g. `SPRING_PROFILES_ACTIVE=production`
:::

### Requested Resources

The resources available to the container can be adjusted in the deployment file (`spec.template.spec.containers.resources`)

Please make sure you don't request excessive amount of resources as we don't have a lot available in our cluster

:::note
if you need more resources as specified in this `deployment.yaml` please contact Team 15
:::
