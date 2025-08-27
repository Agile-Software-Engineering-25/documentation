---
sidebar_position: 3
---
# Document APIs with Scalar
Docusaurus integrates with **Scalar** to create beautiful, interactive API documentation from your **OpenAPI specifications**. This creates **individual pages for each API**, plus **navigation integration** and **search functionality**.

## Configuration Overview
The `scalar-configs.ts` file and Docusaurus configuration are already set up. You just need to add your API definitions to the existing configuration.

## Add Your First API

### Step 1: Create OpenAPI Specification
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

### Step 2: Add API Configuration
Add your API definition to the `apiDefinitions` array in `scalar-configs.ts`:

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

### Step 3: Create Markdown File for Sidebar
Create a markdown file at the location specified in your `path` configuration. The file should be named `<api-name>.md` matching the `name` field from your scalar config:

```markdown title="docs/your-category/your-api-path.md"
#"Title that should be shown in the sidebar"
```

**Important:** The markdown filename must match the `name` field in your scalar configuration (e.g., if `name: 'your-api-name'`, then create `your-api-name.md`).

Your API documentation will be available at [http://localhost:3000/documentation/service-definitions/your-category/your-api-path](http://localhost:3000/documentation/service-definitions/your-category/your-api-path).

Make sure to create corresponding OpenAPI files:
- `static/openapi/<api-name>.json`

## Configuration Options
Each API definition supports these properties:

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | **Required.** Must match your OpenAPI filename (without extension) and markdown filename |
| `label` | `string` | **Required.** Display name in navigation and page title |
| `path` | `string` | **Required.** URL path structure for the documentation |
| `showInNav` | `boolean` | **Required.** Whether to show in the main navigation bar. Keep it false! |

## Project Structure
Your project should be organized like this:

```
your-project/
├── docusaurus.config.ts
├── scalar-configs.ts          # ← API configurations
├── docs/
│   └── your-category/        # ← Documentation structure
│       └── your-api-name.md  # ← Markdown file for sidebar
├── static/
│   └── openapi/              # ← OpenAPI specification files
│       ├── notifications.json
│       ├── <api-name>.json
└── ... other files
```

## Summary
To add a new API documentation page, you need to create **three files**:
1. **OpenAPI spec**: `static/openapi/<api-name>.json`
2. **Configuration entry**: Add to `apiDefinitions` in `scalar-configs.ts`
3. **Markdown file**: `docs/<path>/<api-name>.md` (matching the `name` and `path` from config)