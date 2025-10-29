---
id: parkingservice
title: Parking Service API
sidebar_label: Parking Service
---

# 🅿️ Parking Service API

Die **Parking Service API** stellt Informationen über die Auslastung von Parkplätzen für einen bestimmten Tag bereit.  
Über die Schnittstelle können Daten **abgerufen**, **hinzugefügt** oder **gelöscht** werden.

---

## 🔗 Basis-URL

```
/parkingservice
```

---

## 📘 Endpunkt-Parameter

| Parameter       | Typ     | Erforderlich | Beschreibung |
|-----------------|----------|---------------|---------------|
| `parkingLotId`  | Integer | ✅ Ja         | Die eindeutige ID des Parkplatzes |
| `date`          | String (YYYY-MM-DD) | ✅ Ja | Das Datum, für das die Auslastung abgefragt oder geändert wird |

---

## 🔍 GET /parkingservice

Gibt die **Auslastung** des Parkplatzes an einem bestimmten Tag zurück.

**Beispiel-Request:**
```http
GET /parkingservice?parkingLotId=1&date=2025-11-07
```

**Beispiel-Response:**
```json
{
  "id": 10,
  "parkingLotId": 1,
  "date": "2025-11-07",
  "usedParkingLots": 40
}
```

**Antwort-Codes:**

| Code | Beschreibung |
|------|---------------|
| 200  | OK – Daten erfolgreich abgerufen |
| 400  | Fehlende oder ungültige Parameter |
| 404  | Parkplatz oder Datum nicht gefunden |

---

## ➕ POST /parkingservice

Fügt einen neuen Datensatz zur Parkplatz-Auslastung hinzu.  
**Nur für authentifizierte Benutzer.**

**Antwort-Codes:**

| Code | Beschreibung |
|------|---------------|
| 201  | Erfolgreich erstellt |
| 400  | Ungültige Eingabe |
| 401  | Nicht authentifiziert |
| 409  | Datensatz existiert bereits |

---

## ❌ DELETE /parkingservice

Löscht einen User aus der Auslastung heraus.  
**Nur für authentifizierte Benutzer.**
