# API

## General Structure

### `/bachelorarbeit`

#### POST

- `thema`: string
- `prüfer`: string
- `prüfungstermin`: string in "dd-mm-yyyy" format
- `expose`: file (PDF)

Sends mail to Prüfungsamt for correcty submitted application.
User gets notification of successful submission.

Only accepts Content-Type: multipart/form-data

### `/bachelorarbeit/{matrikelnummer}`

#### GET

Returns all applications with matching matrikelnummer.
- `matrikelnummer`: string

### `/bachelorarbeit/{id}`

#### DELETE
Deletes the application with the provided id from the database.
- `id`: long


# WEB

### `antrag/bachelorarbeit`

#### GET
Empty application with the following fields:
- `thema`: string
- `prüfer`: dropdown of list
- `startdate`: date
- `expose`: file (PDF)

#### POST
Sends mail to Prüfungsamt for correcty submitted application.
User gets notification of successful submission
