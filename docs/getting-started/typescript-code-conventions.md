---
sidebar_position: 8
---

# Typescript Code Conventions

# Typescript

For Typescript we have some pretty easy conventions:  
eslint:

- 2 spaces for indentation
- use `const` and `let` instead of `var`
- Never use the `any` type
- use arrow functions where it improves readability (instead of `function` functions:
  `(userName: string) => console.log("User:", userName)`)
- handle null/undefined values (use `!` and `?` and `??` for null/undefined assertions/handling)

quality:

- camelCase for functions (except for Components)
- PascalCase for Interfaces, Components and Types
- do not use abbreviations for naming of things
- all function names should be descriptive enough to understand what is happening in the function
- all variable names should be descriptive enough to understand what is happening
