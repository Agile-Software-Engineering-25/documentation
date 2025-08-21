# Area Overview  
## Area 2  
# F2 – Communication & Document Management  

## Newsfeed (PO: Khalid Lakniti)  

- Module for group communication.  
- Shows news and events in time order.  
- Authors can create and publish articles or announcements.  
- Filter by target group:  
  - Authors choose role, department, or user group when publishing.  
  - Users see only newsfeeds allowed by their permissions.  
- Announcements and events appear as posts.  

## Document Management (PO: Santino Pia)  

- Store, manage, and access digital documents.  
- Upload:  
  - Only university staff can upload, one or many files.  
- Download:  
  - Possible for authorized users.  
- Supported formats:  
  - PDF, Word, Excel, PowerPoint, JPG, PNG, GIF, ZIP.  
- Built-in viewer for PDF and images.  
- Manage documents:  
  - Rename, move, delete (depends on permission).  
- File versioning to track duplicates.  

## Structure & Metadata (PO: Lennard Gerst)  

- Folder structure:  
  - Hierarchical storage for documents and content.  
- Metadata system:  
  - Tags and categories can be defined freely.  
  - Folder and content visibility depends on permissions.  
- Abstract File Handler:  
  - Central service for file access.  
  - CRUD interface for files and metadata.  
  - One interface for all modules.  
  - Central storage, used across modules.  

## Application Procedures (PO: Josefine Zwach)  

- Applications through forms:  
  - Exam retake  
  - Study certificate  
  - Bachelor thesis registration  
- Validation:  
  - Check required fields and data types.  
- Submission:  
  - Form is sent by email to the exam office or staff.  
- Confirmation:  
  - User receives a status message after sending.  
