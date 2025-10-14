---
sidebar_position: 2
title: Team 7 – Frontend Setup Guide
---
# Frontend Setup Guide

This guide explains how to set up the ASE project's frontend locally.

---

## Prerequisites
- **Software**
    - [Node.js](https://nodejs.org/en/download)
    - [Git](https://git-scm.com/downloads/win)

---
## Step 0.1 – Install Node
💡 *Note*: Only required if Node is not already installed.

Download the Node installer and complete the installation. 
Then run the following command:
```
terminal

npm install -g npm
```

To verify that Node was installed successfully, run:
```
terminal

npm version
```

---
## Step 0.2 – Install Git
💡 *Note*: Only required if Git is not already installed.

Download the Git installer and run Git Bash. 
Alternatively, verify the installation with:
```
terminal

git version
```

---

## Step 1 – Clone the repository
Create a new project in your IDE and open it. Your GitHub account must be authenticated in the IDE.
Open the terminal and clone the frontend repository from its page:
```
terminal 

git clone https://github.com/Agile-Software-Engineering-25/team-7-frontend-dms.git 
```
❗*Important*: Make sure the IDE has the repository root folder itself open—not the folder where the project is stored! Navigate into the directory with:
```
terminal

cd team-7-frontend-dms
```

---
## Step 2 – Build the frontend via Linux/Bash
💡 *Note*: The following commands are executed in Bash.
To build the application, run the following commands in the `team-7-frontend-dms` directory:
```
bash

npm run init
```
And:
```
bash

npm i
```

Additionally, update shared components:
```
bash

npm run updateSharedComponents
```
To start the frontend locally:
```
bash

npm run dev
```

---

## Step 3 – Open the local site

Your local instance should now be running. To access the frontend, open the URL that Vite prints in the terminal. It should look like: 
http://localhost:5173/

To access the project, append the following path:
http://localhost:5173/document-management/?mock=1

From there you’ll enter the local development environment of the Document Manager.
