---
sidebar_position: 2
title: Connect Spring Boot To Database
---

## Spring Boot Settings Change

1. Add this to your production profile (or whatever profile you use in your deployment):

```yaml title='application.yaml'
spring:
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
    show-sql: false
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        format_sql: true
  datasource:
    url: jdbc:postgresql://postgres.db:5432/appdb
    username: ${POSTGRES_USER}
    password: ${POSTGRES_PASSWORD}
    driver-class-name: org.postgresql.Driver
```

2. Add this to your `deployment.yaml`

```yaml title='deployment.yaml'
spec:
    template:
        spec:
            containers:
                - env:
                    - name: POSTGRES_USER
                    valueFrom:
                        secretKeyRef:
                        name: postgres-secret
                        key: POSTGRES_USER
                    - name: POSTGRES_PASSWORD
                    valueFrom:
                        secretKeyRef:
                        name: postgres-secret
                        key: POSTGRES_PASSWORD

```

## Add postgres-secret

1. go to https://rancher.sau-portal.de/dashboard/c/local/explorer/secret/create
2. click `Opaque`
3. Enter `postgres-secret` as the Name
4. Add a `POSTGRES_PASSWORD` and `POSTGRES_USER` key
5. Your initial credentials were given to each PO by Team 15
   :::note
   If you have problems with your credentials notify team 15
   :::

Your application should now use the production database. 🥳
:::note
If you initialize test data on each start up you need to deactivate that as this will continue to happen on each start of your pod. After some time your db will be cluttered with useless data.
:::
