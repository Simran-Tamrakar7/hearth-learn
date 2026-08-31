---
id: "pw-3-pom"
title: "14. Page Object Model (POM)"
minutes: 55
partName: "Part 3 · Test Structure & Framework"
level: "intermediate"
---

Why POM, folder structure Without POM, locators get written directly inside test functions — meaning if the UI changes (a button's text, an ID), you have to hunt down and fix every test that touches that element. POM solves this by centralizing each page's locators and actions into a dedicated class, so a UI change means fixing one class, not dozens of tests.

## Overview

Why POM, folder structure Without POM, locators get written directly inside test functions — meaning if the UI changes (a button's text, an ID), you have to hunt down and fix every test that touches that element. POM solves this by centralizing each page's locators and actions into a dedicated class, so a UI change means fixing one class, not dozens of tests.

project/

├── pages/

│ ├── base_page.py

│ ├── login_page.py

│ └── dashboard_page.py

├── tests/

│ ├── test_login.py

│ └── test_dashboard.py

└── conftest.py Base Page class A BasePage holds behavior common to every page — navigation, generic waits — so individual page classes don't repeat it. python

## pages/base_page.py

self.page = page

BasePage.__init__(self, page) What it does: Stores a reference to the Playwright page object so every method in the class (and its subclasses) can use it. Types/params:

Pointers: Every page class should inherit from this and call

```
def navigate(self, path):

self.page.goto(f"https://app.example.com{path}")

def wait_for_load(self):

self.page.wait_for_load_state("networkidle")

super().__init__(page) to get this shared setup for free.

class BasePage:

def __init__(self, page):
```

## pages/login_page.py

self.username_input = page.get_by_label("Username")

self.password_input = page.get_by_label("Password")

self.login_button = page.get_by_role("button", name="Log in")

python

login_page = LoginPage(page)

LoginPage.login(self, username, password) (example custom page method — pattern, not a Playwright API) What it does: Encapsulates the full "log in" user flow as one method call, hiding the individual locator/action steps from the test itself. Types/params:

Pointers: The test file itself should read almost like plain English (login_page.login(...)) — if a test file is full of raw locators and .fill()/.click() calls, that's a signal POM isn't being followed consistently.

```
def login(self, username, password):

self.navigate("/login")

self.username_input.fill(username)

self.password_input.fill(password)

self.login_button.click()

from pages.base_page import BasePage

class LoginPage(BasePage):

def __init__(self, page):

super().__init__(page)

login_page.login("testuser", "testpass")

expect(page.get_by_text("Welcome, testuser")).to_be_visible()
```