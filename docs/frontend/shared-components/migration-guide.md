---
sidebar_position: 4
sidebar_custom_props:
  myEmoji: 📚
---

# Migration Guide

This page contains migrations guides for every new major version of shared-components.

## v2.1.0

With the version 2.1.0 shared components migrates to publishing npm packages. Using git submodules probably still works but will not be supported.
Starting with this version you can install and import shared-components just like every other npm package.

To migrate execute the following script in your frontend repository:

:::warning
You also need to remove the `npm run init` command from all workflow runs.
:::

:::warning
This script will remove your `.submodules` file, the `scripts` and `shared-components` directories (recursively!), update the `shared-components` dependency and will stage everything. Check if nothing went wrong before committing!
:::

```bash title="migration.sh"
#!/bin/bash
# Migration script for shared-components v2.1.0
# ⚠️ Must be executed in Git Bash on Windows

set -e

echo "Updating @agile-software/shared-components to v2.1.0 in package.json..."
if grep -q '"@agile-software/shared-components":' package.json; then
  sed -i.bak 's|"@agile-software/shared-components": *"[^"]*"|"@agile-software/shared-components": "^2.1.0"|' package.json
  rm package.json.bak
  echo "Dependency updated."
else
  echo "Dependency @agile-software/shared-components not found in package.json."
fi

echo "Removing 'init' script from package.json..."
if grep -q '"init":' package.json; then
  sed -i.bak '/"init":/d' package.json
  rm package.json.bak
  echo "'init' script removed."
else
  echo "No 'init' script found in package.json."
fi

echo "Removing local shared-components directory..."
git config -f .gitmodules --remove-section submodule.shared-components || true
git config -f .git/config --remove-section submodule.shared-components || true
git stage .
git rm --cached shared-components || true
rm -rf shared-components

echo "Removing .gitmodules file..."
rm -f .gitmodules

echo "Removing script directory..."
rm -rf scripts

echo "Removing src/@types/agile-shared-components.d.ts if it exists..."
if [ -f "src/@types/agile-shared-components.d.ts" ]; then
  rm "src/@types/agile-shared-components.d.ts"
  echo "File deleted."
else
  echo "File not found, skipping."
fi

echo "Staging changes..."
git stage .

echo "Done. ✅"
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
