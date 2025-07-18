---
sidebar_custom_props:
  myEmoji: 📚
---

# System Tests with Playwright (Java)

> ⚠️ Note: This page is under active maintance and information might change fast.

---

## 🧭 Introduction

System tests using [Playwright](https://playwright.dev/java/) automate end-to-end browser interactions. They are especially useful for:

- ✅ Verifying critical user flows (Smoke Tests)
- 🧪 Catching regressions during new releases
- 👀 Detecting UI/UX issues early

Unlike unit or integration tests, system tests simulate full user interactions in a **real browser environment**, such as Chromium.

---

## 🔍 Demo Project

A [demo project on GitHub](https://github.com/agile-software-engineering-25/demo-system-test) demonstrates best practices:

- Java + Playwright + JUnit 5
- Tagged Smoke Tests
- Allure Reporting
- GitHub Actions CI/CD
- 📊 [Smoke Report](https://agile-software-engineering-25.github.io/demo-system-test/smoke/) • [Full Report](https://agile-software-engineering-25.github.io/demo-system-test/full/)

---

## 🚧 Topics to Clarify for Production

| Topic                    | Questions to Discuss                                                |
|--------------------------|---------------------------------------------------------------------|
| **Public Reports**       | Can reports (e.g. GitHub Pages) be made public? (security wise)     |
| **Test Data & Users**    | How do we manage and reset test data and test accounts?             |
| **Test Videos**          | Should we record test videos? Only on failures?                     |
| **Ticket Integration**   | Should we link tests to tickets via annotations like `@Ticket("JIRA-123")`? |

---

## 🧱 How to Implement a New Test

1. 🧠 **Get Test Steps from the Business Team**  
   For example: "User logs in and creates a new article."

2. 🧩 **Implement Using the Page Object Pattern**  
   One class per page/component to encapsulate UI interactions.

3. 🏷️ **Tag as Smoke Test**  
   Use `@Tag("smoke")` for critical test paths.

4. 🧪 **Group Related Tests**  
   Tests that verify the same functionality (e.g., login behavior) should be grouped in a **dedicated test class**.  
   ➕ Even if there is only one test, a separate class should still be created per feature for clarity and scalability.

5. 🎫 **(Optional) Link to Ticket System**  
   Consider using annotations like `@Ticket("JIRA-123")` to trace tests to requirements or bug reports.

For more details and code structure, check out the [demo project](https://github.com/agile-software-engineering-25/demo-system-test).

---

## ✅ Sample Test: Login Functionality

```java
package com.ase.demo.tests;

import com.ase.demo.base.TestBase;
import com.ase.demo.pages.LoginPage;
import com.ase.demo.pages.SecureAreaPage;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static io.qameta.allure.Allure.step;

public class LoginTest extends TestBase {

    @Test
    @Tag("smoke")
    void testSuccessfulLogin() {
        step("Navigate to Login Page", () -> navigateToPath("/login"));

        step("Login with valid credentials", () -> {
            LoginPage loginPage = new LoginPage(page);
            loginPage.login("tomsmith", "SuperSecretPassword!");
        });

        step("Verify successful login message and logout button", () -> {
            SecureAreaPage secureAreaPage = new SecureAreaPage(page);
            assertThat(secureAreaPage.getSuccessMessage())
                .contains("You logged into a secure area!");
            assertThat(secureAreaPage.isLogoutButtonVisible()).isTrue();
        });
    }
}
```

## 📊 Allure Reports

[Allure](https://docs.qameta.io/allure/) is a flexible test reporting framework that shows:

- ✔️ Which tests were executed
- ❌ Pass/fail status
- 🕒 Execution time
- 📸 Screenshots, logs, attachments
