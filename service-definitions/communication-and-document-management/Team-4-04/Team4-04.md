# Team4-04 🚀

## 🔎 Overview
Team 4-04 provides the **Document Service** as an **Abstract File Service**.
It connects user requests with the **Central Database**.
Core functions include **CRUD operations**, plus extended features like **sorting, tagging, filtering – and now moving** documents and folders.

---

## 🛠️ Request Sources
- **📂 Document Storage**
  - GET, CREATE, UPLOAD/POST, UPDATE/PUT, DELETE, MOVE
- **🔗 External Modules using the Abstract File Service**
  - GET, UPLOAD/POST, UPDATE/PUT, DELETE

All requests are routed to the **File Handler (CRUD)**.

---

## ⚙️ File Handler (CRUD)
Main handler for all file and folder operations.
Supports:
- **Files:** GET, CREATE, UPLOAD, UPDATE, DELETE, MOVE
- **Folders:** CREATE, RENAME, DELETE, MOVE

The File Handler interacts directly with the **Central Database**.

---

## 🔄 Extended Handler
Adds smart logic on top of CRUD:
- **Sorting** – by metadata (ascending / descending)
- **Tagging** – add, remove, list tags
- **Filtering** – by metadata, date, timespan, same search

Extended requests are forwarded to the **Central Database**.

---

## 🗄️ Central Database
- Stores **documents and folders** in a hierarchical structure.
- Ensures consistent access, versioning, and integrity.

---

## 📌 Folder Management (Highlights)
- **Create** new folders
- **Rename** existing folders
- **Delete** folders
- **Move** folders between locations
- Supports **tags and filters** (just like documents)

---

## 🌐 Visual Flow (Simplified)
soon more

