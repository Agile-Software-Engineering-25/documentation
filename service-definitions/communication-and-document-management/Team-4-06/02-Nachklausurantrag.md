# API

## General Structure

### `antrag/nachklausur`

#### POST
Sends mail to Prüfungsamt for correcty submitted application.
User gets notification of successful submission
Following fields have to be provided: 

- `name` (filled out through jwt token)
- `matrikelnummer` (filled out through jwt token)
- `modul`: dropdown
- `pruefungstermin`: date


# WEB

### `antrag/nachklausur`

#### GET
Empty application with the following fields:
- `name` (filled out through jwt token)
- `matrikelnummer` (filled out through jwt token)
- `modul`: dropdown
- `pruefungstermin`: date

#### POST
Sends mail to Prüfungsamt for correcty submitted application.
User gets notification of successful submission
