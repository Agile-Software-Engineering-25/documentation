---
sidebar_position: 3
sidebar_custom_props:
  myEmoji: 📅
---

# Scheduling Service

#### Contact: Sebastian Froböse

### ⚠️ This page is still in progress ⚠️

## Group: F1 — Team 2

## Exposing information:

- Read-only API for timetable **events** with filtering and utility endpoints.
- **Base URL (DEV):** `http://localhost:3000/api/v1`
- **Auth:** Bearer **JWT** . In DEV, `GET /api/v1/login` returns a test token.

### Endpoints

- `GET /schedule` – Get events with filters 
- Query params: `courseId`, `lecturerId`, `roomId`, `studyGroup`, `type`, `startTime`, `endTime`
- `GET /schedule/personal` – Get events for the authenticated user)
- `GET /schedule/all` – Get all events
- `GET /schedule/types` – Get available event types
- `GET /schedule/conflicts` – Check for event conflicts 

**Open (no auth, DEV only):**
- `GET /api/v1/login` – returns dev token
- `GET /api/v1/docs` – Swagger UI
- `GET /health` – health check

### Response example 

```json
[
  {
    "id": "de305d54-75b4-431b-adb2-eb6b9e546014",
    "time": "2025-07-23T10:00:00Z",
    "endTime": "2025-07-23T12:00:00Z",
    "title": "Database Systems II",
    "roomId": "a4f3e1ab-003f-4b88-b4cd-6e6e22a5c9cd",
    "courseId": "de305d54-75b4-431b-adb2-eb6b9e546014",
    "studyGroup": "INF21A",
    "lecturer": "Prof. Dr. Schmidt",
    "type": "Kurs",
    "groupId": "d1a113fd-d62e-4be1-92fc-2b0977c0c20d"
  }
]
