---
sidebar_position: 4
sidebar_custom_props:
  myEmoji: 📚
---

# Migration Guide

This page contains migrations guides for every new major version of shared-components.

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
