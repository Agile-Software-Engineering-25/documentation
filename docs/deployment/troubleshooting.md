---
sidebar_position: 999
title: Troubleshooting
---

# Troubleshooting

Common problems and there solution will be added here.

You probably visited this page because you have a problem. Here is a cat to make you feel better: ᓚᘏᗢ

:::tip
If this section didn't help you, ask **Team 15**.
:::

## Database

### I can't login into the my postgres user

If you get this error:

```
psql: error: connection to server at "postgres.db" (10.43.73.40), port 5432 failed: FATAL:  password authentication failed for user "{SOME-USER-ACCOUNT}"
```

Answer this points honestly:

- Are you executing the login inside a pod on the kubernetes cluster?
- Did you execute the following command?:

```bash
export PGPASSWORD=<your_team_password>
psql -h postgres.db -U ase-<team-number> -d appdb
```

- Are you sure you used the correct password?

If your answer to the questions on top were all "Yes" contact Team 15. There might have been an error while distributing your password. Otherwise see the [db](deployment/db) documentation.
