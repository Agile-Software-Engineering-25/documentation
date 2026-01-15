# API

## General Structure

### `antrag/bachelorarbeit`

#### POST

- `name` string
- `matrikelnummer` string
- `studiengang`: string
- `titel`: string
- `prüfungstermin`: string
- `thema`: date
- `prüfer`: string
- `expose`: file (PDF)

Sends mail to Prüfungsamt for correcty submitted application.
User gets notification of successful submission


### `antrag/bachelorarbeit/{matrikelnummer}`

### GET

Request to get Antrag for Bachelorarbeit by matrikelnummer
- `matrikelnummer`

# WEB

### `antrag/bachelorarbeit`

#### GET
Empty application with the following fields:
- `name` (filled out through jwt token)
- `matrikelnummer` (filled out through jwt token)
- `studiengang`: string
- `titel`: string
- `erstprüfer`: dropdown of list
- `startdate`: date
- `expose`: file (PDF)

#### POST
Sends mail to Prüfungsamt for correcty submitted application.
User gets notification of successful submission