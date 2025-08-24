---
sidebar_position: 1
title: Quickstart
---

## Deploy your service

Use the provided workflow in this [repository](https://github.com/Agile-Software-Engineering-25/deploy-to-k8s) to build and deploy to the cluster.

To deploy with this Workflow, you need to have stored the b64 Kubeconfig of your provided Rancher User Account (E.g. ase-1-user).
1. Login to your account.
2. 5 clickables left from your profile picture in the top right corner, you can dowload the config.
3. Base64 encrypt you config. (E.g. for linux shell: `base64 -w0 ./kubeconfig > kubeconfig.b64`).
4. Go to your Github repo, and navigate to Settings/Secrets and Variables/Actions.
5. Create a new Secret with the name KUBECONFIG_B64, and the encoded Secret you just created.

If questions come up, reach out to **Team 15**.
