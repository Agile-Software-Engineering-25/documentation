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

0. Configure your frontend
1. Builds your application (`npm run build`)
2. Uploads the build artifacts to your MinIO bucket

---

## 🔧 Configure your vite frontend 
### Base URL
Inside your vite.config.js file, you should have this line: (around line 16)

```ts
  base: command === "serve" ? "/" : BASE_URL_DEPLOYMENT
```

Here you need to define your deployment base URL, for this you can just replace the variable in the end with
`/api/ASE-[YOUR-TEAM-NUMBER]/`.

For your build to succeed, you also need to remove the variable `BASE_URL_DEPLOYMENT` from the `vite.config.ts` file. (as the typescript build is quite picky)

### External libraries:

In line 12, you should have something like this:

`const NPM_EXTERNALS: string[] = ["react", "react-dom"];`

This defines the external libraries that are not bundled into the application, at the moment we have some issues with the external libraries, so we need to add them into every build for now. 
This means you can just clear the array for now.
This should leave you with something like this:

`const NPM_EXTERNALS: string[] = [];`

In the end it should look like this:
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import vitePluginSingleSpa from "vite-plugin-single-spa";
import vitePluginReactHMR from "vite-plugin-react-single-spa-hmr";

const PORT = parseInt(process.env.PORT ?? "5173");

const ENTRY_POINT = "src/singleSpa.tsx";

const NPM_EXTERNALS: string[] = [];

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : "/api/ASE-12/",
  plugins: [
    react(),
    command === "serve" && vitePluginReactHMR(ENTRY_POINT),
    vitePluginSingleSpa({
      type: "mife",
      serverPort: PORT,
      spaEntryPoints: ENTRY_POINT,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@custom-types": path.resolve(__dirname, "./src/@custom-types"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@stores": path.resolve(__dirname, "./src/stores"),
    },
  },
  build: {
    rollupOptions: {
      external: [...NPM_EXTERNALS],
    },
  },
}));
```


---

## 🛠 GitHub Actions Workflow

---

```yaml
name: Build and Deploy to MinIO

on:
  push:
    branches: [ "main" ]
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
|-------------------------|------------------------------------------------------------------------------------------------------------|
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
    branches: [ "main" ]
  workflow_dispatch:
```

⬇ Change it to:

```yaml
on:
  push:
    branches: [ "**" ]
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
