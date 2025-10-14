# API

## General Structure

### `/nachklausur`

#### GET
Empty application with the following fields:
- `name` (filled out through jwt token)
- `matrikelnummer` (filled out through jwt token)
- `modul`: dropdown
- `pruefungstermin`: date

#### POST
Sends mail to Prüfungsamt for correcty submitted application.
User gets notification of successful submission
