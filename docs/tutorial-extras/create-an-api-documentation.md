---
sidebar_position: 3
---

# Document APIs with Scalar

Docusaurus integrates with **Scalar** to create beautiful, interactive API documentation from your **OpenAPI specifications**. This creates **individual pages for each API**, plus **navigation integration** and **search functionality**.

## Configuration Overview

The `scalar-configs.ts` file and Docusaurus configuration are already set up. You just need to add your API definitions to the existing configuration.

## Add Your First API

Create your OpenAPI specification file at `static/openapi/your-api-name.json`:

```json title="static/openapi/your-api-name.json"
{
  "openapi": "3.0.0",
  "info": {
    "title": "Your API Name",
    "version": "1.0.0",
    "description": "Description of what your API does"
  },
  "servers": [
    {
      "url": "https://sau-portal.de/ase-<your-team-number>/<api-address>",
      "description": "Production server"
    }
  ],
  "paths": {
    "/your-endpoint": {
      "get": {
        "summary": "Your endpoint description",
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": { "type": "string" },
                    "name": { "type": "string" },
                    "status": { "type": "string" }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

Then add your API definition to the `apiDefinitions` array in `scalar-configs.ts`:

```typescript title="scalar-configs.ts"
const apiDefinitions: ApiDefinition[] = [
  {
    name: 'notifications',
    label: 'Notifications API',
    path: 'examination-and-grade-management/notification-service-api',
    showInNav: false,
  },
  // Add your new API here
  {
    name: 'your-api-name',
    label: 'Your API Display Name',
    path: 'your-category/your-api-path',
    showInNav: false,
  },
];
```

Your API documentation will be available at [http://localhost:3000/documentation/service-definitions/your-category/your-api-path](http://localhost:3000/documentation/service-definitions/your-category/your-api-path).



Make sure to create corresponding OpenAPI files:
- `static/openapi/<api-name>.json`

## Configuration Options

Each API definition supports these properties:

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | **Required.** Must match your OpenAPI filename (without extension) |
| `label` | `string` | **Required.** Display name in navigation and page title |
| `path` | `string` | **Required.** URL path structure for the documentation |
| `showInNav` | `boolean` | **Required.** Whether to show in the main navigation bar. Keep it false! |

## Project Structure

Your project should be organized like this:

```
your-project/
├── docusaurus.config.ts
├── scalar-configs.ts          # ← API configurations
├── static/
│   └── openapi/              # ← OpenAPI specification files
│       ├── notifications.json
│       ├── <api-name>.json
└── ... other files
```