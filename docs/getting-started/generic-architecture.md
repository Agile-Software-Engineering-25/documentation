---
sidebar_position: 2
---

# Generic Architecture

## Generic Architecture information

## **GitHub:**

We’ve setup a GitHub organisation (agile-software-engineering-25) in which we want to store all repositories
contributing to the application.  
Inside this organisation please name your repos following this convention:

`team-<Gruppennummer>-<frontend | backend>-<short description>`

Beispiele:

- `team-12-backend-exam_grads_doz`
- `team-11-backend-stammdatenverwaltung`
- `team-10-backend-auth`
- `team-10-frontend-login`
- ...

## Jira:

We have a central Telekom hosted Jira which we will use for the entire project management.

## Deployment:

We will deploy our application inside a k8s (kubernetes) cluster which will be provided by the team of Tobias Rüttinger.
There we will use one centralized Postgres database with different user accounts to decrease performance needs. The team
of Tobias will later on provide instructions on how to deploy to k8s and how to connect to the database.
