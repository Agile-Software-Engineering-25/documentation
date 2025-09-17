---
sidebar_position: 1
sidebar_custom_props:
  myEmoji: 📚
---

# About

The **shared-components library** is the central place for reusable UI components and a common `joy` theme.  
It is used by **all SAU frontend teams** to ensure a consistent look & feel and to avoid duplicate work.

Before creating a new component in your project, always check if it already exists here.  
If not, you can request a new component so it becomes available for everyone (see [Request a new shared component](./request-shared-component.md)).

## Components

The library now contains **real, reusable production components**.  
A full list of currently available components can be found in the [README](https://github.com/Agile-Software-Engineering-25/shared-components).  
Releases are published regularly (target: weekly).

:::info
We do **not** provide a custom shared button component.  
Use the standard [Joy UI `Button`](https://mui.com/joy-ui/react-button/) or [Joy UI `IconButton`](https://mui.com/joy-ui/react-button/#icon-button) instead.  
Any styling requirements should be handled through the theme or joy API.
:::

## Migration

This library is now distributed as an **npm package**, which **replaces the old GitHub submodule setup**.  
For instructions on how to migrate, see the [Migration Guide](./migration-guide.md).

## Contributing

There are dedicated subpages for contributing, requesting new components, and migration:

- [Contributing](./developing.md)  
- [Request a new shared component](./request-shared-component.md)  
- [Migration Guide](./migration-guide.md)  

## Installation & Usage

Install the package with npm:

```bash
npm install @agile-software/shared-components
```

For setup details and usage examples, see the Shared Components [README](https://github.com/Agile-Software-Engineering-25/shared-components).

## Support & Maintainers

If you encounter any problems reach out to:  
- **Alexander Jablonowski**  
- **Simon Dietrich**
