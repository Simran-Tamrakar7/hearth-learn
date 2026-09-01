import type { ChapterRecord } from "../../types";

/** 14. Page Object Model (POM) */
export const chapter = {
  "id": "pw-3-pom",
  "title": "14. Page Object Model (POM)",
  "minutes": 55,
  "level": "intermediate",
  "phase": "Part 3 · Test Structure & Framework",
  "partName": "Part 3 · Test Structure & Framework",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "Why POM, folder structure Without POM, locators get written directly inside test functions — meaning if the UI changes (a button's text, an ID), you have to hunt down and fix every test that touches that element. POM solves this by centralizing each page's locators and actions into a dedicated class, so a UI change means fixing one class, not dozens of tests.\n\n## Overview\n\nWhy POM, folder structure Without POM, locators get written directly inside test functions — meaning if the UI changes (a button's text, an ID), you have to hunt down and fix every test that touches that element. POM solves this by centralizing each page's locators and actions into a dedicated class, so a UI change means fixing one class, not dozens of tests.\n\nproject/\n\n├── pages/\n\n│ ├── base_page.py\n\n│ ├── login_page.py\n\n│ └── dashboard_page.py\n\n├── tests/\n\n│ ├── test_login.py\n\n│ └── test_dashboard.py\n\n└── conftest.py Base Page class A BasePage holds behavior common to every page — navigation, generic waits — so individual page classes don't repeat it. python\n\n## pages/base_page.py\n\nself.page = page\n\nBasePage.__init__(self, page) What it does: Stores a reference to the Playwright page object so every method in the class (and its subclasses) can use it. Types/params:\n\nPointers: Every page class should inherit from this and call\n\n```\ndef navigate(self, path):\n\nself.page.goto(f\"https://app.example.com{path}\")\n\ndef wait_for_load(self):\n\nself.page.wait_for_load_state(\"networkidle\")\n\nsuper().__init__(page) to get this shared setup for free.\n\nclass BasePage:\n\ndef __init__(self, page):\n```\n\n## pages/login_page.py\n\nself.username_input = page.get_by_label(\"Username\")\n\nself.password_input = page.get_by_label(\"Password\")\n\nself.login_button = page.get_by_role(\"button\", name=\"Log in\")\n\npython\n\nlogin_page = LoginPage(page)\n\nLoginPage.login(self, username, password) (example custom page method — pattern, not a Playwright API) What it does: Encapsulates the full \"log in\" user flow as one method call, hiding the individual locator/action steps from the test itself. Types/params:\n\nPointers: The test file itself should read almost like plain English (login_page.login(...)) — if a test file is full of raw locators and .fill()/.click() calls, that's a signal POM isn't being followed consistently.\n\n```\ndef login(self, username, password):\n\nself.navigate(\"/login\")\n\nself.username_input.fill(username)\n\nself.password_input.fill(password)\n\nself.login_button.click()\n\nfrom pages.base_page import BasePage\n\nclass LoginPage(BasePage):\n\ndef __init__(self, page):\n\nsuper().__init__(page)\n\nlogin_page.login(\"testuser\", \"testpass\")\n\nexpect(page.get_by_text(\"Welcome, testuser\")).to_be_visible()\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
