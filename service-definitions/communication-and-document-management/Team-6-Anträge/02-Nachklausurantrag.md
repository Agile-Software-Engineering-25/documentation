# API

## General Structure

### `antrag/nachklausur`

#### POST
Sends mail to Prüfungsamt for correcty submitted application.
User gets notification of successful submission
Following fields have to be provided: 
- `modul`: dropdown
- `pruefungstermin`: date
Only accepts Content-Type: multipart/form-data

### `antrag/nachklausur/{matrikelnummer}`

### GET

Returns all applications with matching matrikelnummer.
- `matrikelnummer`

### `antrag/nachklausur/{id}`

#### DELETE
Deletes the application with the provided id from the database.
- `id`

# WEB

### `antrag/nachklausur`

#### GET
Empty application with the following fields:
- `modul`: dropdown
- `pruefungstermin`: date

#### POST
Sends mail to Prüfungsamt for correcty submitted application.
User gets notification of successful submission
