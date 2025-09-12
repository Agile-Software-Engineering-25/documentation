---
sidebar_position: 3
title: Add Agent Node to cluster
---

# Add Agent Node to cluster

This explains how you can add a new agent node to our k3s cluster.

1. Setup the Server

2. Open the following ports in your firewall:

   - UDP 8472, 51820, 51821
   - TCP 6443, 10250

3. [Install Wireguard](https://www.wireguard.com/install/)

On Ubuntu: `sudo apt install wireguard`

4. Get the `K3S_TOKEN`

Ask Alexander Jablonowski for this

5. Add the server to the cluster

Replace `<K3S_Token>` with the `K3S_TOKEN` from the last step,`<server-node-public-ip>` with the IP of the server node and `<agent-public-ip>` with the static, public IP of your server.

```bash
curl -sfL https://get.k3s.io | \
K3S_TOKEN=<K3S_Token>
INSTALL_K3S_VERSION=v1.32.7+k3s1 \
sh -s - \
    agent \
  --server https://<server-node-public-ip>:6443 \
  --node-external-ip=<agent-public-ip>
```
