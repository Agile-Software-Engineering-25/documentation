---
sidebar_position: 2
sidebar_custom_props:
  myEmoji: 🏫
---

# Documents & Newsfeed: Document Service

#### Contact: Lennard Gerst

## Group: F2

### 🔧 Technical Work Areas
1. **Working with environment variables**
2. **User group dependency (central role)**  
   - Relevant parameters: `ID`, `Role`, `Study group`, `Module`, `Year`, `Field of study`

### 🔗 External Dependencies

#### Main dependency on F3
- **User permissions / roles**  
  → Essential for all functions in Documents & Newsfeed

#### Existing dependencies **towards us**:
- From **F4**: Access to our database for **master data management**  
- From **F1**: Access to our database for **timetable data storage**

### 🔄 Inter-SOS2 Level Dependencies
- **Team 4 (DocM Backend, Lennard)** ⇄ **Team 7 (DocM Frontend, Santino)**  
  Shared interfaces for displaying and managing document-based content  
- **Team 7 (Doc Viewer, Santino)** → **Team 5 (Newsfeed)**  
  **API call from Team 7 to Team 5** to show newsfeed data based on user group information  

💬 **Abstract File Service (central storage layer)**  
- All file-related services (documents, newsfeed attachments, application forms) should – whenever possible – use the central **Abstract File Service**.  
- This ensures unified file storage, permission checks, and reusability.

### 📌 Team Responsibilities

| Team | Functionality | Dependencies |
|------|---------------|--------------|
| Khalid | User group–based **Newsfeed** | ID, Role, Study group, Module, Year, Field of study |
| Santino | User group–based **Document display** | ID, Role, Study group, Module, Year, Field of study |
| Lennard | User group–based **Document tagging** + Abstract File Service | ID, Role, Study group, Module, Year |
| Josi | User group–based **Applications** | ID, Role, Study group, Module |
| (all dealing with files) | Use of **Abstract File Service** recommended | — |

### 🗃️ Database Dependencies
- **F1**: Timetable data  
- **F4**: Master data management  

---

## Exposing Information

### Document Service (DocM Backend)

- With **User ID** and related metadata (`Role`, `Study group`, `Module`, `Year`, `Field of study`), user-specific relevant documents can be retrieved.  
- Documents have **tags** that filter content based on the user context.  
- Example response for a document request:

```json
[
  {
    "document_id": "doc-uuid",
    "title": "Module Handbook WI 2025",
    "tags": ["WI", "2025", "Handbook"],
    "visibility": {
      "role": ["student", "lecturer"],
      "study_group": ["WI"],
      "year": ["2025"]
    },
    "uploaded_by": "lecturer-uuid",
    "uploaded_at": "2025-05-20T12:45:00Z",
    "abstract": "Module descriptions for the academic year 2025"
  }
]
