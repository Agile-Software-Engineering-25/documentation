---
sidebar_position: 8
---

# Java Code Conventions

# Code Conventions

For this project we want to use the Oracle Code Conventions (except the 2 space indentation), if you want to have a deep
look you can find the full pdf
here: [https://www.oracle.com/technetwork/java/codeconventions-150003.pdf](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf)  
But for the scope of this project we summarized the most important topics for you all right here:

## Oracle Code Conventions for Java Code - Summary

These conventions aim to improve code readability, maintainability, and consistency within Java projects.

### I. Naming Conventions

- **Packages:**
  - Lowercase throughout.
  - Separate components with dots (`.`).
  - Unique prefix for company/project (e.g., `com.example.projectname`).
- **Classes and Interfaces:**
  - Noun phrases.
  - PascalCase (first letter of each word capitalized).
  - Examples: `MyClass`, `LoggerInterface`.
- **Methods:**

  - Verb phrases.
  - camelCase (first letter of the _first_ word lowercase, subsequent words capitalized).
  - Examples: `calculateSum()`, `getName()`, `processData()`.
  - Here it is important that the name of a method is descriptive enough to understand what the method does meaning
    this is a bad example: `User.makeRequest()` or `User.saveData()` Instead you should resent to something like:
    `User.sendAccessRequest()` and `User.savePassword()`

- **Variables:**
  - camelCase for subsequent words.
  - Descriptive and meaningful.
  - Examples: `firstName`, `totalAmount`, `isValid`.
- **Constants (static final fields):**
  - All uppercase.
  - Words separated by underscores (`\_`).
  - Examples: `MAX\_VALUE`, `DEFAULT\_TIMEOUT`, `PI`.
- **Type Parameters (Generics):**
  - Single uppercase letter.
  - By default use `<T>`, only resent to something else in edge cases or if you have more then one generic type

### II. Formatting

- **Indentation:**
  - **2 spaces** for each level of indentation. No tabs.
- **Line Length:**
  - Aim for lines no longer than **80 characters**. Break long lines thoughtfully.
  - Especially when chaining stream methods like this:
  - Bad example:

```java
return topics.stream().map(Topic::getMessages).flatMap(Collection::stream).filter(message -> message.getDate().isAfter(
LocalDateTime.now().minusDays(pastDateRange))).collect(Collectors.toList());
```

    - Good example:

```java
return topics.stream()
    .map(Topic::getMessages)
    .flatMap(Collection::stream)
    .filter(message -> message.getDate()
		.isAfter(LocalDateTime.now().minusDays(pastDateRange)))
    .collect(Collectors.toList());
```

- Braces (**`{}`):**
  - **Open brace on the same line** as the statement (`if`, `for`, `while`, method declaration, class declaration).
  - **Close brace on its own line**, aligned with the statement that opened it.
  - Good Example (and only correct way to set braces):

```java
class MyClass {
public void myMethod() {
if (condition) {
// code
} else {
// other code
}
}
}
```

- **Spacing:**
  - **Keywords followed by a parenthesis** should be separated by a space (e.g., `while (true)`).
  - **Commas** should be followed by a space (e.g., `method(arg1, arg2)`).
  - **Operators** should have spaces on both sides (e.g., `a + b`, `x == y`).
  - **Type casts** should have a space after the cast (e.g., `(int) value`).
  - **No space after a method name and its opening parenthesis** (e.g., `method()`, not `method ()`).

### III. Comments

- **Use Javadoc comments** for classes, interfaces, methods, and public/protected members.
  - Start with `/\*\*` and end with `\*/`.
  - Include `@param`, `@return`, `@throws` tags where appropriate.
- **Block comments** (`/\* ... \*/`) for multi-line comments within a method.
- **Single-line comments** (`//`) for short explanations or disabling code.
- **Avoid excessive commenting.** Write self-documenting code whenever possible.
- Comments should explain _why_ the code does something, not **_what_ it does.**  


```
/**

* Returns an Image object that can then be painted on the screen.
* The url argument must specify an absolute <a href="#{@link}">{@link URL}</a>. The name
* argument is a specifier that is relative to the url argument.
* <p>
* This method always returns immediately, whether or not the
* image exists. When this applet attempts to draw the image on
* the screen, the data will be loaded. The graphics primitives
* that draw the image will incrementally paint on the screen.
*
* @param url an absolute URL giving the base location of the image
* @param name the location of the image, relative to the url argument
* @return the image at the specified URL
* @see Image
  */
  public Image getImage(URL url, String name) {
  try {
  return getImage(new URL(url, name));
  } catch (MalformedURLException e) {
  return null;
  }
  }
```

-

### IV. Declarations

- **One declaration per line** for local variables.
- int count;
- String name;
- int count, index;
- **Initialize variables where declared** if possible.
- **Place member variables** at the top of the class, generally after `static final` constants.  


### V. Statements

- `if`, `for`, `while`, **`do-while` statements** always use braces, even for single statements. This prevents errors when adding more lines later.

```
if (condition) {
    doSomething();
}
```

- **`switch` statements:**
  - Each `case` should either end with `break`, `return`, or a comment indicating fall-through.
  - Always include a `default` case.

### VI. White Space

- Use blank lines to **group related lines of code** and improve readability.
- Use blank lines between:
  - Methods.
  - Logical sections within a method.
  - Class member declarations (to some extent, for grouping).

### VII. Miscellaneous

- **Organize imports:**
  - Specific imports (`java.util.List`).
  - Wildcard imports (`java.util.\*`) are generally discouraged for clarity, but the conventions mention them as a
    possibility if there are too many imports from one package.
  - Order imports alphabetically.
- **Avoid magic numbers:** Use named constants instead.
- **Handle exceptions appropriately.**
- **Be consistent** with existing code within a project.
