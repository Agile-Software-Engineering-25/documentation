---
sidebar_position: 2
title: DB User and Schema Addition
---

How to add new db users and schemas.

1. Connect to Postgres inside k8s

```bash
kubectl exec -it postgres-0 -n db -- psql -U <admin_user> -d appdb
```

2. Create a new user (role)

```sql
-- create a login role with password
CREATE ROLE myuser WITH LOGIN PASSWORD 'mypassword';

ALTER ROLE myuser
NOSUPERUSER
NOCREATEDB
NOCREATEROLE
NOINHERIT
LOGIN;

-- create schema
CREATE SCHEMA myschema AUTHORIZATION myuser;

REVOKE ALL ON SCHEMA myschema FROM PUBLIC;
GRANT ALL ON SCHEMA myschema TO myuser;
```
