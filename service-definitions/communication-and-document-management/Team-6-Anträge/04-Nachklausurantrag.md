# API

## General Structure

### `/nachklausur`

#### POST
Sends mail to Prüfungsamt for correcty submitted application.
User gets notification of successful submission
Following fields have to be provided: 
- `modul`: string
- `pruefungstermin`: string in "dd-mm-yyyy" format

Only accepts Content-Type: multipart/form-data

### `/nachklausur/{matrikelnummer}`

#### GET

Returns all applications with matching matrikelnummer.
- `matrikelnummer`: String

### `/nachklausur/{id}`

#### DELETE
Deletes the application with the provided id from the database.
- `id`: long

# WEB

### `antrag/nachklausur`

#### GET
Empty application with the following fields:
- `modul`: dropdown
- `pruefungstermin`: date

#### POST
Sends mail to Prüfungsamt for correcty submitted application.
User gets notification of successful submission
