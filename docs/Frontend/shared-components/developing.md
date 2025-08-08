---
sidebar_position: 2
sidebar_custom_props:
  myEmoji: 📚
---

# Contribute to the shared-components

This is a step-by-step guide if you need to change some components or add new ones from the shared-components library.

## 1. Setup shared-components

It is not possible (or not intended) to make commits on the submodule in your frontend project. For that reason you need to clone the library locally.

1. `git clone https://github.com/Agile-Software-Engineering-25/shared-components.git`
2. Create a new branch on github
3. `git checkout feature/add-new-component` change this to your branch
4. `npm i`
5. `npm run build:watch`

## 2. Prepare your frontend project

This assumes you already did the first time setup of the frontend project.

1. Checkout a new branch (if you are not already on one)

`git checkout -b feature/update-shared-components`

2. Inside the `package.json` replace `./shared-components` in the dependency of `@agile-software/shared-components` with the path to the shared-components project you just cloned.
3. `npm i`
4. `npm run dev`

Now you can work on the shared-components library and see live updates in your frontend. When you create a new component in the library, you need to import and use it in your frontend project to see the live updates.

Before you start working, review the README of the shared-components library to learn how to create a new component, or you might find that a component already exists for your needs.

## 3. Feature developing is done

When you are done working on shared-components you can simply replace the path of `@agile-software/shared-components` inside the `package.json` back to `./shared-components`.

To update the version of the shared-components submodule execute:
`npm run updateSharedComponents`.

## Support

If you encounter any problems reach out to Alexander Jablonowski or Team 15.
