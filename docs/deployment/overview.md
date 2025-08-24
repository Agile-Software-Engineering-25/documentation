---
sidebar_position: 1
title: Overview - Deployment
---

# Overview - Deployment

The SAU deployment consists out of a [K3s](https://docs.k3s.io/) cluster with a rancher instance to administer the cluster.

Rancher is accessible via https://rancher.sau-portal.de/ <br/>
Services exposed in K3s are accessible via https://sau-portal.de/

---

To make the developer experience as easy as possible actions were created to easily deploy application via github actions. Have a look into [deploy-to-k8s](/docs/deployment/actions/deploy-to-k8s) and [upload-image](/docs/deployment/actions/upload-image).

If you experience issues with the deployment check the [Troubleshooting section](/docs/deployment/troubleshooting).

To start your deployment process look into the [Quickstart](/docs/deployment/quickstart) Page.
