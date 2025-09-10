---
sidebar_position: 1
title: deploy-to-k8s
---

# deploy-to-k8s

A GitHub composite action to deploy applications to the SAU Kubernetes cluster using Kustomize.

## What it does

This action:

- Installs kubectl
- Configures kubeconfig from a secret
- Deploys Kubernetes manifests using Kustomize (`kubectl apply -k`)
- Waits for rollout completion with timeout

## Usage

```yaml
name: Deploy to Kubernetes

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to cluster
        uses: Agile-Software-Engineering-25/deploy-to-k8s@main
        with:
          kubeconfig: ${{ secrets.KUBECONFIG }}
          namespace: ${{ variables.K8S_NAMESPACE}}
```

## Inputs

| Input        | Description                                                                                | Required | Default |
| ------------ | ------------------------------------------------------------------------------------------ | -------- | ------- |
| `kubeconfig` | Kubeconfig contents. Pass your repository secret containing the kubeconfig YAML.           | Yes      | -       |
| `namespace`  | Kubernetes namespace to deploy to.                                                         | Yes      | -       |
| `image`      | The Image Name which is supposed to be used (used to dynamically override the k8s config)  | No       | -       |
| `tag`        | The Image Tag which is supposed to be used (used to dynamically override the k8s config)   | No       | -       |
| `deployment` | The Kubernetes Namespace which is supposed to be deployed to (needed for dynamic override) | No       | -       |

## Secrets Setup

1. **Add kubeconfig to repository secrets**:

   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `KUBECONFIG`
   - Value: Your complete kubeconfig YAML content (not base64 encoded)

2. **Kubeconfig format**:
   ```yaml
   apiVersion: v1
   kind: Config
   clusters:
     - cluster:
         server: https://your-k8s-api-server
         certificate-authority-data: LS0tLS1CRUdJTi...
       name: your-cluster
   contexts:
     - context:
         cluster: your-cluster
         user: your-user
       name: your-context
   current-context: your-context
   users:
     - name: your-user
       user:
         client-certificate-data: LS0tLS1CRUdJTi...
         client-key-data: LS0tLS1CRUdJTi...
   ```

## Requirements

- Repository must have `KUBECONFIG` secret configured
- Repository must have a `k8s` directory in the root of the repository containing a Kustomize configuration
