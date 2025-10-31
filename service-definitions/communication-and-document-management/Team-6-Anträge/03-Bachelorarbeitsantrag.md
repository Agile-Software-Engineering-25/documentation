# API

## General Structure

### `antrag/bachelorarbeit`

#### POST

- `thema`: date
- `prüfer`: string
- `prüfungstermin`: string
- `expose`: file (PDF)

Sends mail to Prüfungsamt for correcty submitted application.
User gets notification of successful submission
Only accepts Content-Type: multipart/form-data

### `antrag/bachelorarbeit/{matrikelnummer}`

### GET

Returns all applications with matching matrikelnummer.
- `matrikelnummer`

### `antrag/bachelorarbeit/{id}`

#### DELETE
Deletes the application with the provided id from the database.
- `id`


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
