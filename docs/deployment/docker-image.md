---
sidebar_position: 3
title: Build & Publish a Docker Image
---

## Prerequisites

- Java app built with **Maven** (example below). Gradle works too.
- Docker installed locally (only needed if you build locally—CI is preferred).
- Access to the container registry used by the workflow in the [repo] (https://github.com/Agile-Software-Engineering-25/deploy-to-k8s).

## Create a Dockerfile

Create a `Dockerfile` in your project root:

```dockerfile
# ---- Build stage ----
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# For Maven:
COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN ./mvnw -q -B dependency:go-offline

# Copy sources and build
COPY src src
RUN ./mvnw -q -DskipTests package

# ---- Runtime stage ----
FROM eclipse-temurin:21-jre
WORKDIR /app

# Optional JVM flags (adjust as needed)
ENV JAVA_OPTS=""

# Copy the fat/uber JAR from the build stage
# For Maven (default target/*.jar). For Gradle, see comment below.
COPY --from=build /app/target/*.jar /app/app.jar
# Gradle alternative:
# COPY --from=build /app/build/libs/*-all.jar /app/app.jar
# or if not using shadow/all-jar:
# COPY --from=build /app/build/libs/*.jar /app/app.jar

EXPOSE 8080
ENTRYPOINT ["sh","-c","java $JAVA_OPTS -jar /app/app.jar"]