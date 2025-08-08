---
sidebar_position: 10
---

# Requirements for the deployment

## 🧩 Goal

A central, multi-tenant **K3s Kubernetes platform** where each of the 15 teams can **only manage their own deployments
**, accessible via a **secure (SSL-protected)** API and web interface, including an example pipeline and
`kubectl` usage.

---

## ✅ Requirements for the Setup Team

### 1. K3s Cluster Setup

- Install **K3s as a lightweight Kubernetes distribution**.
  - Either as a single node or HA with embedded etcd.
- Set up a **Load Balancer / Ingress Controller** (e.g., Traefik is preinstalled in K3s but can be replaced).
- Ensure **external accessibility**, e.g., via Nginx reverse proxy or directly with Ingress + domain.

### 2. SSL / TLS Configuration

- For your domain (e.g., `project.yourcompany.com`):
  - Use Ingress with **Let's Encrypt via cert-manager** or Traefik ACME.
- DNS setup: Wildcard or subdomain pointing to the cluster.
- Example Ingress annotation:

```
ingress.kubernetes.io/ssl-redirect: "true"
cert-manager.io/cluster-issuer: "letsencrypt-prod"

```

### 3. Multi-Tenant Namespace Isolation

- For each team:
  - **One separate namespace** (e.g., `team-a`, `team-b`, ...)
  - **RBAC rules** that restrict access to the team's own namespace.
  - One **Kubernetes ServiceAccount**, with exported Kubeconfig.
- RBAC example:

```
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: team-a
  name: team-a-role
rules:
- apiGroups: [""]
  resources: ["pods", "services", "deployments"]
  verbs: ["get", "list", "watch", "create", "update", "delete"]

kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: team-a-binding
  namespace: team-a
subjects:
- kind: User
  name: team-a-user
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: team-a-role
  apiGroup: rbac.authorization.k8s.io

```

    👉 Alternatively, use **ServiceAccount** token for automation.

### 4. Demo Page on Root Domain

- Namespace e.g. `public`.
- Simple nginx deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
name: demo-page
namespace: public
spec:
replicas: 1
selector:
matchLabels:
app: demo
template:
metadata:
labels:
app: demo
spec:
containers:
- name: nginx
image: nginx
ports:
- containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
name: demo-service
namespace: public
spec:
selector:
app: demo
ports:

- port: 80
  targetPort: 80

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
name: demo-ingress
namespace: public
annotations:
nginx.ingress.kubernetes.io/rewrite-target: /
spec:
rules:

- host: project.yourdomain.com
  http:
  paths:
    - path: /
      pathType: Prefix
      backend:
      service:
      name: demo-service
      port:
      number: 80

```

### 5. CI/CD Example (e.g. GitLab / GitHub Actions)

**Goal**: Automatically deploy to own namespace using `kubectl`.

### GitLab CI Example:

```yaml
stages:
  - deploy
deploy_to_k8s:
image: bitnami/kubectl
stage: deploy
script:
  - echo "$KUBECONFIG_CONTENT" > kubeconfig
  - export KUBECONFIG=$(pwd)/kubeconfig
  - kubectl config use-context default
  - kubectl apply -f deployment.yaml
only:
  - main
```

- `KUBECONFIG\_CONTENT` is a **base64-encoded kubeconfig YAML**, which the team receives (restricted to their namespace).
- Alternatively: Set up OIDC or basic user authentication.
  ***

### 6. kubectl Access for Teams

Each team receives:

- A **namespace**
- A **kubeconfig file** (exported using `kubectl config view --minify`)
- Usage instructions:

```bash
export KUBECONFIG=./kubeconfig-team-a.yaml
kubectl get pods -n team-a
```

## 📄 Documentation (as README template)

The team setting up K3s should provide documentation for:

- How to get access (kubeconfig, RBAC)
- Where teams are allowed to deploy (namespace naming convention)
- How to deploy apps (examples)
- How SSL / domains are managed
- CI/CD pipeline examples
- Troubleshooting tips
