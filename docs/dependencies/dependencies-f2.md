---
sidebar_position: 2
sidebar_custom_props:
  myEmoji: 🏫
---

# Dokumente & Newsfeed: Document Service

#### Contact: Lennart Gerst


## Group: F2

### 🔧 Technische Arbeitsbereiche
1. **Arbeiten mit Umgebungsvariablen**
2. **Usergruppenabhängigkeit (zentrale Rolle)**  
   - Relevante Parameter: `ID`, `Rolle`, `Studiengruppe`, `Modul`, `Jahrgang`, `Fachrichtung`

### 🔗 Externe Abhängigkeiten

#### Wichtigste Abhängigkeit nach F3
- **User Berechtigung / Rollen**  
  → Essentiell für alle Funktionalitäten in Dokumente & Newsfeed

#### Bestehende Abhängigkeiten **zu uns**:
- Von **F4**: Zugang zu unserer Datenbank für **Stammdatenverwaltung**
- Von **F1**: Zugang zu unserer Datenbank für **Stundenplan-Datenspeicherung**

### 🔄 Inter-SOS2-Ebenen-Abhängigkeiten
- **Team 4 (DokM-Backend, Lennard)** ⇄ **Team 7 (DokM-Frontend, Santino)**  
  Gemeinsame Schnittstellen zur Anzeige und Verwaltung dokumentenbasierter Inhalte
- **Team 7 (Doku-Viewer, Santino)** → **Team 5 (Newsfeed)**  
  **API-Aufruf von Team 7 an Team 5**, um Newsfeed-Daten basierend auf Nutzergruppeninformationen darzustellen

💬 **Abstract File Service (zentraler Speicherlayer)**  
- Alle dateibezogenen Dienste (Dokumente, Newsfeed-Anhänge, Antragsformulare) sollten – soweit möglich – über den zentralen **Abstract File Service** laufen, um eine einheitliche Dateiablage, Berechtigungsprüfung und Wiederverwendbarkeit sicherzustellen.



### 📌 Team-spezifische Verantwortlichkeiten

| Team | Funktionalität | Abhängigkeiten |
|------|----------------|----------------|
| Khalid | Usergruppenabhängiger **Newsfeed** | ID, Rolle, Studiengruppe, Modul, Jahrgang, Fachrichtung |
| Santino | Usergruppenabhängige **Dokumentenanzeige** | ID, Rolle, Studiengruppe, Modul, Jahrgang, Fachrichtung |
| Lennard | Usergruppenabhängiges **Tagging von Dokumenten** + Abstract File Service | ID, Rolle, Studiengruppe, Modul, Jahrgang |
| Josi | Usergruppenabhängige **Anträge** | ID, Rolle, Studiengruppe, Modul |
| (alle mit Dateibezug) | Nutzung des **Abstract File Service** empfohlen | — |

### 🗃️ Datenbankabhängigkeiten
- **F1**: Stundenplan-Daten
- **F4**: Stammdatenverwaltung

---

## Exposing information

### Dokumentenservice (DokM-Backend)

- Mit der **User-ID** und zugehörigen Metadaten (`Rolle`, `Studiengruppe`, `Modul`, `Jahrgang`, `Fachrichtung`) können nutzerspezifisch relevante Dokumente abgefragt werden.
- Dokumente sind mit **Tags** versehen, die über die genannten Userkontexte filtern lassen.
- Beispielhafte Response für eine Dokumentanfrage:

```json
[
  {
    "document_id": "doc-uuid",
    "title": "Modulhandbuch WI 2025",
    "tags": ["WI", "2025", "Modulhandbuch"],
    "visibility": {
      "role": ["student", "lecturer"],
      "study_group": ["WI"],
      "year": ["2025"]
    },
    "uploaded_by": "lecturer-uuid",
    "uploaded_at": "2025-05-20T12:45:00Z",
    "abstract": "Modulbeschreibungen für das Studienjahr 2025"
  }
]
