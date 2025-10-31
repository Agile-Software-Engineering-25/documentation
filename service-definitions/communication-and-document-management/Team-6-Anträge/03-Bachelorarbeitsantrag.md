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


### `antrag/bachelorarbeit/{matrikelnummer}`

### GET

Request to get Antrag for Bachelorarbeit by matrikelnummer
- `matrikelnummer`

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
