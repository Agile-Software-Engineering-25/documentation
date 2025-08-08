# General
## Area 3
Diese Area verwaltet Stammdaten und das Berechtigungsmanagement, inkl. Authentifizierung.

# xxxxxxx
## Team 8, PO: Ole Leister
WIP


# Stammdaten-Microservice für Studiengänge, Module und Kurse
## Team 9, PO: Paticia Schiewald

## Was bietet unser Service
Unser Service stell die folgenden Daten und Funktionalitäten zur Verfügung:

- Verwaltung und Bereitstellung von **Studiengängen**
- Verwaltung und Bereitstellung von **Modulen**
- Verwaltung und Bereitstellung von **Kursen**
- Zuordnung von Modulen zu Studiengängen
- Zuordnung von Kursen zu Modulen

## Abhängigkeiten / Benötigte externe Services
Unser Service benötigt folgende Daten und Funktionalitäten:

- **Dozenten- und Studierendendaten** aus dem Service von **Team 10** und **Team 11**
- **JWT-Authentifizierung** über den Auth-Service von **Team 10**


# Master Data & Course Management: Auth Service
## Team 10, PO: Luca Schmitz

## Exposing Information:
- After successful login (probably using PKCE Authorization Flow) Keycloak issues a JWT containing:
  - User ID
  - System-generated email address
  - First & last name
  - Assigned roles
- This JWT is attached to every request sent to other microservices.
- We provide a Spring Boot (aligned with the reference implementation) filter (/middleware) that:
  - Validates the JWT
  - Parses its contents
  - It makes the extracted information easily accessible within the microservice.
- We will provide all microservice teams with a simple process, that allows them to define their own roles that can be assigned to users (or user groups like 'student', 'lecturer', 'administrative_employee', 'system_admin', etc.).

## Requiring Information:
- For user registration, we collaborate with the role- and master data management services to ensure a smooth onboarding process. The required data includes:
  - First name (used for generating the system email and stored for further usage)
  - Last name (same purpose as above)
  - Private email address (used once to send login credentials for the system email account; afterward, only the system address will be used)
- Together with the other F3 microservice teams, we will jointly develop a unified registration frontend to provide a consistent user experience.


# Stammdaten-Microservice für Personen
## Team 11, PO: Carlo Bockermann
(WIP)