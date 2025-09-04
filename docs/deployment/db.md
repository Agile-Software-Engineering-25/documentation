---
sidebar_position: 3
title: Database connection
---

## How to use your Database Schema

Each team has: 

- One database user: ase-n

- One private schema: ase-n_schema 

- One shared database: appdb

- Hostname: postgres.db (inside the cluster)

- Port: 5432
:::tip
Your account can only create/read/write objects inside your schema.
:::

## Credentials

- Username: ase-n depending on your team
- Password: intial given to you by **Team 15**

## Connect from Rancher

1. In Rancher, go to your namespace (ase-n).
2. Launch a shell pod (for example, run a postgres:17 image).
    - Rancher UI → Workloads → Deploy → Image: postgres:17 → Command: sleep 3600
3. Exec into the pod via Rancher UI or kubectl exec:
```bash
export PGPASSWORD=<your_team_password>
psql -h postgres.db -U ase-N -d appdb
```
4. Inside psql, you can run SQL in your schema:
```sql
-- see current schema path (should show ase-N_schema first)
SHOW search_path;

-- create a test table in your schema
CREATE TABLE test_data (id serial PRIMARY KEY, value text);

-- insert & query
INSERT INTO test_data (value) VALUES ('hello world');
SELECT * FROM test_data;
```

## Usage from services in your namespace

- Connection string: 
```bash
postgresql://ase-N:<password>@postgres.db:5432/appdb
```
- Example env in a deploament: 
```yaml
env:
  - name: DB_HOST
    value: postgres.db
  - name: DB_PORT
    value: "5432"
  - name: DB_NAME
    value: appdb
  - name: DB_USER
    valueFrom:
      secretKeyRef:
        name: db-credentials
        key: POSTGRES_USER
  - name: DB_PASSWORD
    valueFrom:
      secretKeyRef:
        name: db-credentials
        key: POSTGRES_PASSWORD
```

## Best practice

- Store creds in a Secret in your namespace:
```bash
kubectl -n ase-N create secret generic db-credentials \
  --from-literal=POSTGRES_USER=ase-N \
  --from-literal=POSTGRES_PASSWORD='<password>'
```