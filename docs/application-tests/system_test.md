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

---

## 🧱 How to Implement a New Test

1. 🧠 **Get Test Steps from the Business Team**  
   For example: "User logs in and creates a new article."

2. 🧩 **Implement Using the Page Object Pattern**  
   One class per page/component to encapsulate UI interactions.

3. 🏷️ **Tag as Smoke Test (if applicable)**  
   Use `@Tag("smoke")` in JUnit 5 for quick execution.

For details check out the demo project.

---

## 📊 Allure Reports

[Allure](https://docs.qameta.io/allure/) is a flexible test reporting framework that shows:

- ✔️ Which tests were executed
- ❌ Pass/fail status
- 🕒 Execution time
- 📸 Screenshots, logs, attachments
