---
sidebar_position: 1
title: Quickstart
---

## Deploy your service

:::warning
Please constraint from deploying a frontend
:::

:::tip
In most scenarios, running a single pod is enough for your service.
:::

1. Get your kubeconfig
   1. Go to https://rancher.sau-portal.de/dashboard/c/local/
   2. Copy the kubeconfig of your team to your clipboard
      ![Screenshot](/img/deployment/quickstart\how-to-copy-kubeconfig.png)
2. Go to your repository → Settings → Secrets and variables → Actions→ New repository secret
   1. Name the secret `KUBECONFIG`
   2. Paste your kubeconfig into the secret
   3. Create the secret
3. Go to your repository → Settings → Secrets and variables → Actions → Variables → New repository variable
   1. Name the variables `K8S_NAMESPACE`
   2. Your namespace is `ase-<YOUR-TEAMNUMBER>`
4. Create a docker image that serves your application  
   The docker image depends on your application. Have a look into the examples or create one on your own.
5. Create a kustomize configuration in a `k8s` directory in the root of your project  
    The configuration again depends on your application. Have a look into the examples or create on your own.

   :::tip
   Your image will be stored in the ghcr of the `Agile-Software-Engineering-25` organization. You will reach your image under: `ghcr.io/agile-software-engineering-25/<repo-name>:latest` (replace `<repo-name>` with the name of your repository).

   After you first run the `build-and-publish-image` workflow on your repository, you will find your published images under packages on the start page of your repository.
   :::

   :::note
   If you want to add a ingress to your configuration to make the application accessible over the internet you can use any ingress path you like. You will get an error if the path is already taken.

   If you are in doubt which ingress path to use you can contact Team 15.
   :::

6. Create a `.github/workflows` directory in the root of your project
7. Create a `deploy-application.yaml` file in the directory and paste this into it:

```yaml
name: deploy-to-k8s

on:
  push:

jobs:
  test-action:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v5

      - name: Upload image
        uses: Agile-Software-Engineering-25/build-and-publish-image@v1
        with:
          push: true

      - name: Deploy to Namespace
        uses: Agile-Software-Engineering-25/deploy-to-k8s@v1
        with:
          kubeconfig: ${{ secrets.KUBECONFIG }}
          namespace: ${{ vars.K8S_NAMESPACE }}
```

8. Your application should now be deployed :D  
   Look into the namespace of your team: https://rancher.sau-portal.de/dashboard/c/local/explorer/projectsnamespaces
