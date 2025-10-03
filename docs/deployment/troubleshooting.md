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

If your answer to the questions on top were all "Yes" contact Team 15. There might have been an error while distributing your password. Otherwise see the [db](db) documentation.

## Kubernetes

### My application gets randomly restarted

We noticed that pods on the `ecs-thor` node need more time to start. If your pod is running on the node and is restarting it could be due to `livenessProbe.initialDelaySeconds` being too low. Try increasing it. See [Spring Boot Template](examples/kustomization-config/springboot-template) for our recommendation.

To see on which node your pod is running go to [rancher.sau-portal.de](https://rancher.sau-portal.de) -> Workload -> Deployment -> your application -> on the right side under "Node" is the node the pod is running on.
![Screenshot](/img/deployment/troubleshooting/see-pod-node.png)

### My pod receives an 401 when pulling the image

If you get a error message like this one:

![Screenshot](/img/deployment/troubleshooting/401-image-pull-unauthorized.png)

Check the visibility of your package.

1. Go to the packages of your repository
   ![Screenshot](/img/deployment/troubleshooting/change-package-visibility.png)
2. check if your package is public
   - if it is private go on with the steps, if not this can not help you
3. Go to Package settings
4. Scroll down to "Danger Zone"
5. Change the visibility to "Public"
   :::tip
   if you don't want to change the visibility of your package get in contact with Team 15
   :::
