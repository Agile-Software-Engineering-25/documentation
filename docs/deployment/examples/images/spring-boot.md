---
sidebar_position: 1
title: Spring Boot Docker Image
---

# Spring Boot Docker Image

This example image creates a Docker image for a Spring Boot application using a multi-stage build. The first stage builds the application using Maven, and the second stage runs the application using a lightweight JRE image.

It defaults to the `default` Spring profile, but you can change this by setting the `SPRING_PROFILES_ACTIVE` environment variable when running the container.
(`docker run -e SPRING_PROFILES_ACTIVE=prod ...`)

To make this work, you might need to add the following plugin to your `pom.xml` to create a fat/uber JAR: (Change the `mainClass` to your main class)

```xml
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-jar-plugin</artifactId>
                <version>3.4.2</version>
                <configuration>
                    <archive>
                        <manifest>
                            <addDefaultImplementationEntries>true</addDefaultImplementationEntries>
                            <!-- Change to your main class -->
                            <mainClass>com.ase.my-service.Application</mainClass>
                        </manifest>
                    </archive>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
```

## Create a Dockerfile

Create a `Dockerfile` in your project root with the following content:

```Dockerfile
# Stage 1: Build
FROM maven:3.9.5-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package

# Stage 2: Runtime
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENV SPRING_PROFILES_ACTIVE=default
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```
