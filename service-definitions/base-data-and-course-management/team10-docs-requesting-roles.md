# Documentation: Request for Creating a New Role

Dieses Formular dient dazu, dass Teams bei Bedarf eine **eigene Rolle** beantragen können.
Nach erfolgreicher Prüfung durch **Team-10** wird die Rolle in **Keycloak** eingepflegt.

Wenn ein Benutzer (User) oder ein Microservice (Client) diese Rolle besitzt, kann der entsprechende Microservice (oder die Stelle im Frontend) die beschriebene Aktion ausführen.

---

## Aufbau des Rollennamens
Der Name der Rolle setzt sich wie folgt zusammen:

```
[Area].[Team].[Berechtigung].[Modul/Name]
```

**Beispiele für vollständige Rollennamen:**
- `Area-3.Team-10.Read.Rechteverteilung`

---

## Formularfelder

1. **Area**  → bildet den ersten Teil des Namens **[Area]**
   Auswahl der Area, zu der die Rolle gehört.

2. **Team**  → bildet den zweiten Teil **[Team]**
   Auswahl des Teams, für das der Antrag gestellt wird.

3. **Berechtigungen** (Mehrfachauswahl möglich)  → bildet den dritten Teil **[Berechtigung]**
   - **Lesen**  (typischer Namensbestandteil: `Read`)
   - **Schreiben** (typischer Namensbestandteil: `Write`)
   Wähle alle zutreffenden Berechtigungen.

4. **Modul/Name (letzter Namensbestandteil)**  → bildet den vierten Teil **[Modul/Name]**
   Hier trägst du **nur** den letzten Bestandteil ein, z. B. `ReportService`, `CustomerDB`, `UserProfile`.
   Die ersten drei Bestandteile ergeben sich aus den Antworten in 1–3.

5. **Begründung**
   Hier begründest du, warum die Rolle benötigt wird. Was ist der Use-Case?

6. **User/Microservice**
   Hier gibst du an, ob die Rolle für einen User oder für einen Microservice benötigt wird.

7. **Standardgruppen**
   (Wird nur angezeigt, wenn unter Punkt 6 "User" ausgewählt wurde)
   Hier kannst du deine Rolle einigen Standardgruppen zuordnen.
   Zur Auswahl stehen `HVS-Admin`, `Hochschulverwaltungsmitarbeiter`, `Dozent` und `Student`.

---

## Namensvorschau (Beispiel)
Wenn in 1–3 **Area-3**, **Team-10**, **Lesen** gewählt wird und in 4 **Rechteverteilung**, lautet der vollständige Rollenname:
```
Area-3.Team-10.Read.Rechteverteilung
```

---

## Hinweise
- Bitte unbedingt das oben beschriebene **Namensschema** einhalten.
- Bei Fragen oder Rückmeldungen:
  📧 **AgileProjektarbeit@mg.telekom.de**

---

## Formular-Link
Das Formular ist unter folgendem Link erreichbar:
👉 [Antragsformular öffnen](https://forms.office.com/pages/responsepage.aspx?id=2Uu2W3K4MUGX34oDJ9ihSLtU7JRVS5VLizM3es16HI9UNTBLVUI1WkhFTVY5U1o4RlRCQzVOMkY0Qy4u&route=shorturl)

---

## Absenden
Nach dem Ausfüllen können Sie den Antrag mit Klick auf **Absenden** direkt einreichen.
Die zuständige Person erhält automatisch Ihren Namen und Ihre E-Mail-Adresse.
