---
sidebar_position: 4
sidebar_custom_props:
  myEmoji: 📚
---

# Migration Guide

This page contains migrations guides for every new major version of shared-components.

## v2.1.0

With the version 2.1.0 shared components migrates to publishing npm packages. Using git submodules can still work but will not be supported.
Starting with this version you can install and import shared-components just like every other npm package.

To migrate execute the following script in your frontend repository:

```bash
TODO
```

## v2.0.0

`createCustomTheme` was split into `createCustomJoyTheme` and `createCustomMuiTheme`.

You need to create separate themes for Mui and Joy. Simply call `createCustomJoyTheme` and `createCustomMuiTheme` and pass them to the Mui and Joy Providers.

### Pre v2.0.0

```ts title="App.tsx"
import { createCustomTheme } from "@agile-software/shared-components";

const theme = createCustomTheme({});

function App() {
  return (
    <ThemeProvider theme={{ [MATERIAL_THEME_ID]: theme }}>
      <JoyCssVarsProvider>
        // more components
      <JoyCssVarsProvider />
    <ThemeProvider />
  );
}
```

### After v2.0.0

```ts title="App.tsx"
import {
  createCustomJoyTheme,
  createCustomMuiTheme,
} from '@agile-software/shared-components';

const joyTheme = createCustomJoyTheme();
const muiTheme = createCustomMuiTheme();

function App() {
  return (
    <ThemeProvider theme={{ [MATERIAL_THEME_ID]: muiTheme }}>
      <JoyCssVarsProvider
        theme={joyTheme}
        defaultMode="light"
        modeStorageKey="joy-mode"
        colorSchemeStorageKey="joy-color-scheme"
      >
        // more components
      <JoyCssVarsProvider />
    <ThemeProvider />
  );
}
```

### Type Declaration Updates

Along with the function changes, you'll need to update your type declarations in `src/@types/agile-shared-components.d.ts`:

#### Pre v2.0.0

```ts title="src/@types/agile-shared-components.d.ts"
declare module "@agile-software/shared-components" {
  export const createCustomTheme: (config: Record<string, unknown>) =>
    | { $$joy: Record<string, unknown> }
    | {
        cssVarPrefix?: string;
        colorSchemes: Record<string, Record<string, unknown>>;
      };
}
```

#### After v2.0.0

```ts title="src/@types/agile-shared-components.d.ts"
declare module "@agile-software/shared-components" {
  import { extendTheme } from "@mui/joy/styles";
  import { Theme } from "@mui/material/styles";

  export type CustomTheme = ReturnType<typeof extendTheme>;

  export function createCustomJoyTheme(): CustomTheme;
  export function createCustomMuiTheme(): Theme;
}
```
