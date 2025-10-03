---
sidebar_position: 2
title: k3s Setup
---

# Setup

1. Open the following ports in your firewall:
   - UDP 8472, 51820, 51821
   - TCP 6443, 10250

## Setup Server Node

1. [Install Wireguard](https://www.wireguard.com/install/)

On Ubuntu: `sudo apt install wireguard`

2.

```bash
curl -sfL https://get.k3s.io | sh -s - server \
    --node-external-ip=<server-public-ip> \
    --advertise-address=<server-public-ip> \
    --flannel-backend=wireguard-native  \
    --flannel-external-ip \
    --secrets-encryption
```

## Add Agent Node

1. [Install Wireguard](https://www.wireguard.com/install/)
2. Get `K3S_TOKEN` from server node

```bash
cat /var/lib/rancher/k3s/server/node-token
```

Keep this token secret!

3.

```bash
curl -sfL https://get.k3s.io | \
K3S_TOKEN=<K3S_Token> \
sh -s - \
    agent \
  --server https://<server-node-public-ip>:6443 \
  --node-external-ip=<agent-public-ip>
```

## Setup Rancher

1. Add Helm repo

```bash
helm repo add rancher-stable https://releases.rancher.com/server-charts/stable
```

2. Create namespace for rancher

```bash
kubectl create namespace cattle-system
```

3. Install cert-manager

Find the version you want to install on the [cert-manager releases page](https://github.com/cert-manager/cert-manager/releases) and replace `<VERSION>` with it in the command below.

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/<VERSION>/cert-manager.crds.yaml
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --set crds.enabled=true
```

4. Install Rancher

```bash
helm upgrade rancher rancher-stable/rancher \
  --namespace cattle-system \
  --set hostname=<your-domain> \
  --set bootstrapPassword=admin \
  --set ingress.tls.source=letsEncrypt \
  --set letsEncrypt.email=<your-email> \
  --set letsEncrypt.ingress.class=traefik \
  --set letsEncrypt.environment=production \
  --set agentTLSMode=system-store
```

See https://ranchermanager.docs.rancher.com/getting-started/installation-and-upgrade/install-upgrade-on-a-kubernetes-cluster if you need help.

# Create Secrets

How to add a docker-registry secret: (the access-token needs read:packages writes)

```bash
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=<your-github-username> \
  --docker-password=<new-personal-access-token> \
  --docker-email=<your-email> \
  -n demo \
  --dry-run=client -o yaml | kubectl apply -f -
```
