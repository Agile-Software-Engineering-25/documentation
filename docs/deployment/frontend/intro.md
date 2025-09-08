# 🚀 Microfrontend Deployment Guide

---

Deploying your **microfrontends** is simpler than deploying backend services.  
You don’t need to deal with Rancher or Kubernetes — all you need are your **MinIO credentials**.

👉 Your Product Owner should have access to these credentials.  
If not, please reach out to **Janne Keipert** (📧 jabbekeipert@gmail.com).

---

## 📦 Deployment Process

---

Your task is straightforward:  
**Upload your build artifacts to MinIO.**

We’ve prepared a **MinIO server** and a **bucket** specifically for this purpose.  
Below is a ready-to-use **GitHub Actions workflow** that:

1. Builds your application (`npm run build`)
2. Uploads the build artifacts to your MinIO bucket

---

## 🛠 GitHub Actions Workflow

---

```yaml
name: Build and Deploy to MinIO

on:
  push:
    branches: ["main"]
  workflow_dispatch: # Allow manual triggering

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Clear shared components dir
        run: |
          rm -rf ./shared-components/*
          rm -rf ./shared-components/.[!.]* ./shared-components/..?* || true

      - name: Setup Shared Components
        run: npm run init

      - name: Build application
        run: npm run build
        env:
          VITE_BACKEND_BASE_URL: ${{ vars.VITE_BACKEND_BASE_URL }}

      - name: Setup MinIO Client
        run: |
          curl https://dl.min.io/aistor/mc/release/linux-amd64/mc \
            --create-dirs \
            -o $HOME/minio-binaries/mc
          chmod +x $HOME/minio-binaries/mc
          export PATH=$PATH:$HOME/minio-binaries/

      - name: Configure MinIO Client
        run: |
          $HOME/minio-binaries/mc alias set minio \
            ${{ secrets.MINIO_ENDPOINT }} \
            ${{ secrets.MINIO_ACCESS_KEY }} \
            ${{ secrets.MINIO_SECRET_KEY }}

      - name: Clear existing files in bucket
        run: |
          $HOME/minio-binaries/mc rm --recursive --force minio/${{ secrets.BUCKET_NAME }} || echo "No existing files to remove"

      - name: Upload dist files to MinIO
        run: |
          $HOME/minio-binaries/mc cp --recursive dist/ minio/${{ secrets.BUCKET_NAME }}

      - name: Set bucket to public (optional)
        run: |
          $HOME/minio-binaries/mc anonymous set public minio/${{ secrets.BUCKET_NAME }} || echo "Could not set public access - check permissions"

      - name: List uploaded files
        run: |
          echo "Files uploaded to MinIO:"
          $HOME/minio-binaries/mc ls --recursive minio/${{ secrets.BUCKET_NAME }}

      - name: Deploy Summary
        run: |
          echo "🚀 Deployment completed successfully!"
          echo "📦 Files uploaded from ./dist to minio/${{secrets.BUCKET_NAME}} bucket"
          echo "🌐 Application should be available at your MinIO endpoint"
```

---

## 🔑 Required Repository Secrets

| Secret Name             | Description                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| `MINIO_ENDPOINT`        | MinIO server endpoint (e.g. `https://minio.sau-portal.de`)                                                 |
| `MINIO_ACCESS_KEY`      | Access key (username) for MinIO                                                                            |
| `MINIO_SECRET_KEY`      | Secret key (password) for MinIO                                                                            |
| `BUCKET_NAME`           | Name of the bucket where build artifacts will be uploaded (this is your Team number (e.g. `ase-12`))       |
| `VITE_BACKEND_BASE_URL` | Backend base URL used in your app (see [Using env variables in Vite](https://vite.dev/guide/env-and-mode)) |

---

## 🧪 Testing the Workflow

If you want the workflow to run for **every branch push**, update this section:

```yaml
on:
  push:
    branches: ["main"]
  workflow_dispatch:
```

⬇ Change it to:

```yaml
on:
  push:
    branches: ["**"]
  workflow_dispatch:
```

---

## 🌐 Accessing Your Deployed App

Once deployed, your artifacts will be available at:

```
https://sau-portal.de/api/[BUCKET_NAME]/singleSpa.js
```

To integrate your microfrontend into the **Root UI**, please contact:  
📧 **Janne Keipert** (jabbekeipert@gmail.com)

---

## 📝 Notes

- ✅ Deployment is **fully automated** once set up
- ⚠️ Be cautious everything you upload into your bucket will be **public** — only upload non sensitive files
- 🐛 If you spot any errors or issues, let me know
