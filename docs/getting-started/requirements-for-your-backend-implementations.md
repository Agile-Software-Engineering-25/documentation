---
sidebar_position: 9
---

# Requirements for your backend implementations

## Backend Microservice Technical Requirements

While teams have the flexibility to choose their preferred backend technologies, all microservice applications developed for this project must adhere to the following technical requirements to ensure a uniform and robust application landscape.

### Authentication

We will utilize a centralized [Keycloak](https://www.keycloak.org/) instance, provided by F3, as our single source for [JSON Web Tokens (JWTs)](https://jwt.io/introduction). Your application must be capable of validating these JWTs. This validation process involves using the public key, which can be retrieved using the `iss` (issuer) claim embedded within the tokens.  
For teams opting for Java Spring Boot, this functionality is supported out-of-the-box and typically requires minimal configuration. When selecting your technologies, we strongly recommend researching libraries and frameworks that simplify JWT validation and integration with your chosen language.

### Data Abstraction / Object-Relational Mapping (ORM)

All services are expected to interact with a database. For this project, we will be using a [PostgreSQL](https://www.postgresql.org/) database deployed within our Kubernetes cluster. Your application must be capable of both reading from and writing data to this database.  
It is crucial to select libraries or frameworks that provide robust support for:

- **Data Sanitization:** To prevent common vulnerabilities like [SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection).
- **Concurrency Management:** Given that our application will support multiple parallel users, effective concurrency handling and transaction management are essential. Libraries offering transaction support will be particularly beneficial. [Object-Relational Mapping (ORM)](https://en.wikipedia.org/wiki/Object-relational_mapping) frameworks are often a good choice here as they typically include these features.  


### Role-Based Authorization

The JWTs your application receives will include a `roles` claim. This claim will contain a list of all roles assigned to the authenticated user. These roles will be the cornerstone of our application's security model.  
Your application must easily facilitate **Role-Based Access Control (RBAC)**. For example, you should be able to configure your application such that only users with the `user:creation` role can access the `POST /user` endpoint, while other endpoints may be accessible with different role combinations.

### Performance

Our goal is to achieve an application capable of handling **1000 parallel users** without significant impact on load times. To meet this target, please strive to keep response times as low as possible for your microservices. Our general thresholds are:

- **GET Requests:** Aim for a response time under **250ms**.
- **POST Requests:** Aim for a response time under **500ms**.  


### Architecture

All applications must be packaged and distributed as [Docker containers](https://www.docker.com/). We will deploy all services within a [Kubernetes](https://kubernetes.io/) cluster. Therefore, each team is required to provide a `kustomization.yaml` file for the deployment of their application. Example `kustomization.yaml` files will be provided soon to guide you through this process.

## Stateless Application

The application bust be stateless meaning no information is stored about past requests. => same request must return the same response
