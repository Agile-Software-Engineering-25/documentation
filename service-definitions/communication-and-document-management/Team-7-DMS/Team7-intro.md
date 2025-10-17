---
sidebar_position: 1
title: Team 7 — Document Management System (DMS)
---

---

# Purpose & value
Provide a **central, system for documents** with an intuitive folder hierarchy, enabling teams to upload, organize, and retrieve files efficiently. The DMS reduces scattered storage, improves collaboration, and lays the groundwork for compliance-friendly document handling.
- **our Service:** https://sau-portal.de/document-management/document-management/?mock=1
---

# Core capabilities (MVP)
- **Documents:** upload, download, rename (metadata), delete
- **Folders:** create hierarchy (root + subfolders), list contents, rename/move, delete when empty
- **API:** REST with **OpenAPI/Swagger UI**
- **Status:** user management & role-based access are **planned**, not fully available yet

---

# Data model
- **Document:** id, name, type (MIME), size, folderId, ownerId *(for future RBAC)*, createdDate, downloadUrl, binary content *(to be externalized)*
- **Folder:** id, name, parentId *(null for root)*, createdDate

---

# Architecture & integrations
```
                [React SPA]
                    ⇅ REST
              [Spring Boot DMS]
                ↙──────────↘
[PostgreSQL(metadata)]  [MinIO (file blobs)]
```
---


# Technology stack & operations
- **Backend:** Java 21, Spring Boot, Maven
- **Frontend:** React + TypeScript
- **Database:** PostgreSQL + MinIO (prod), H2 (dev/test)
- **Packaging/Deploy:** Docker, Kubernetes, CI/CD with GitHub
- **Health:** Spring Boot Actuator endpoints for health checks

---

# Repositories
- Frontend: https://github.com/Agile-Software-Engineering-25/team-7-frontend-dms
- Backend: https://github.com/Agile-Software-Engineering-25/team-7-backend-dms

---


