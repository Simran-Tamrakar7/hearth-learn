import type { ChapterRecord } from "../../../types";

/** 14. Page Object Model (POM) */
export const chapter = {
  "id": "pw-3-pom",
  "title": "14. Page Object Model (POM)",
  "minutes": 55,
  "level": "intermediate",
  "phase": "Part 3 · Test Structure & Framework",
  "partName": "Part 3 · Test Structure & Framework",
  "overviewText": "The Page Object Model (POM) centralizes each page's locators and user actions into a dedicated Python class, so tests read like business scenarios (login_page.login('testuser', 'testpass')) instead of raw locator chains. When the UI changes — a button label, an input ID, a navigation path — you fix one page class instead of hunting through dozens of test files. A BasePage class holds shared behavior (navigate, wait_for_load) that every page inherits, eliminating repeated boilerplate. The standard folder layout separates pages/ (page object classes), tests/ (test functions), and conftest.py (shared fixtures) into distinct concerns. POM is a design pattern, not a Playwright API — it works because Playwright locators are lazy and re-evaluate on action, so storing them as class attributes on a page object is safe.",
  "why": "Without POM, locators live inline in test functions. A single UI refactor — renaming 'Log in' to 'Sign in' — breaks every test that clicks that button, and each must be found and fixed individually. POM inverts this: the login button locator lives in LoginPage.login_button, and one fix propagates to every test that calls login_page.login(). Tests become readable specifications of user intent rather than implementation-detail scripts that only the author understands.",
  "when": "Adopt POM when you have the same page interacted with by more than two tests, or when a locator appears in three or more places. Start with a BasePage and the pages your suite hits most (login, dashboard). Do not POM-wrap every page on day one — over-abstracting a page used by one test adds ceremony without payoff.",
  "practical": {
    "app": "HRMS — Login and dashboard flows",
    "scenario": "The HRMS renames the login button from 'Log in' to 'Sign in' and changes the username field label from 'Username' to 'Email address'. Without POM, 18 tests across 6 files break. With LoginPage encapsulating both locators, one line changes in login_page.py and all 18 tests pass without modification.",
    "pass": "login_page.login('testuser', 'testpass') followed by expect(dashboard_page.welcome_message).to_be_visible() — test reads as a user story.",
    "fail": "Test file contains page.get_by_role('button', name='Log in') in fourteen places; button rename requires fourteen independent search-and-replace edits."
  },
  "advantages": [
    "UI changes localized to one page class instead of scattered across every test file",
    "Tests read as user-intent scenarios — login_page.login() not raw .fill()/.click() chains",
    "BasePage eliminates repeated navigation and wait boilerplate across page classes",
    "New team members find locators in predictable pages/ directory instead of grep-ing test files",
    "Page methods can compose flows (login then navigate to settings) reusable across tests"
  ],
  "limitations": [
    "Upfront design cost — premature POM for a one-test page adds files without benefit",
    "Page classes can become god-objects if every possible action lands in one class",
    "POM does not eliminate flaky tests — bad waits inside page methods still flake",
    "Over-abstraction (PageFactory patterns, deep inheritance trees) fights Python's simplicity"
  ],
  "tools": [
    {
      "name": "Page Object Model",
      "sub": "Design pattern",
      "url": "https://playwright.dev/python/docs/pom",
      "desc": "POM is a structural pattern where each web page (or significant UI section) maps to a Python class. The class stores locators as attributes initialized in __init__ and exposes methods that perform user actions (login, submit_form, navigate_to_settings). Tests instantiate page objects and call methods — they never reference raw CSS selectors or XPath. Playwright's lazy locators make this safe: locator objects re-query the DOM at action time, so storing them as class attributes does not go stale between page navigations within the same test.",
      "adv": [
        "Single point of change when UI elements move or rename",
        "Tests become readable specifications decoupled from DOM structure",
        "Composable page methods encode reusable user flows",
        "Natural fit with pytest fixtures — yield a LoginPage instance from a fixture"
      ],
      "lim": [
        "Not a Playwright feature — discipline and convention, not enforced by the framework",
        "Can be over-engineered with unnecessary base-class hierarchies",
        "Dynamic pages (SPAs with conditional sections) need careful page-object boundaries",
        "Initial setup slower than inline locators for the first few tests"
      ],
      "steps": [
        {
          "t": "Step 1 — Create BasePage with shared behavior",
          "p": "pages/base_page.py holds navigation and wait helpers:",
          "c": "class BasePage:\n    def __init__(self, page):\n        self.page = page\n\n    def navigate(self, path):\n        self.page.goto(f\"https://app.example.com{path}\")\n\n    def wait_for_load(self):\n        self.page.wait_for_load_state(\"networkidle\")"
        },
        {
          "t": "Step 2 — Create LoginPage inheriting BasePage",
          "p": "Encapsulate locators and the login action:",
          "c": "from pages.base_page import BasePage\n\nclass LoginPage(BasePage):\n    def __init__(self, page):\n        super().__init__(page)\n        self.username_input = page.get_by_label(\"Username\")\n        self.password_input = page.get_by_label(\"Password\")\n        self.login_button = page.get_by_role(\"button\", name=\"Log in\")\n\n    def login(self, username, password):\n        self.navigate(\"/login\")\n        self.username_input.fill(username)\n        self.password_input.fill(password)\n        self.login_button.click()"
        },
        {
          "t": "Step 3 — Write tests using page objects",
          "p": "Test file reads like a scenario, not a script:",
          "c": "from pages.login_page import LoginPage\nfrom playwright.sync_api import expect\n\ndef test_login_shows_welcome(page):\n    login_page = LoginPage(page)\n    login_page.login(\"testuser\", \"testpass\")\n    expect(page.get_by_text(\"Welcome, testuser\")).to_be_visible()"
        },
        {
          "t": "Step 4 — Add a fixture for common page objects",
          "p": "In conftest.py, yield page object instances:",
          "c": "import pytest\nfrom pages.login_page import LoginPage\n\n@pytest.fixture\ndef login_page(page):\n    return LoginPage(page)\n\ndef test_login_with_fixture(login_page, page):\n    login_page.login(\"testuser\", \"testpass\")\n    expect(page.get_by_text(\"Welcome, testuser\")).to_be_visible()"
        }
      ]
    }
  ],
  "contentMarkdown": "Why POM, folder structure Without POM, locators get written directly inside test functions — meaning if the UI changes (a button's text, an ID), you have to hunt down and fix every test that touches that element. POM solves this by centralizing each page's locators and actions into a dedicated class, so a UI change means fixing one class, not dozens of tests.\n\n## Overview\n\nWhy POM, folder structure Without POM, locators get written directly inside test functions — meaning if the UI changes (a button's text, an ID), you have to hunt down and fix every test that touches that element. POM solves this by centralizing each page's locators and actions into a dedicated class, so a UI change means fixing one class, not dozens of tests.\n\nproject/\n\n├── pages/\n\n│ ├── base_page.py\n\n│ ├── login_page.py\n\n│ └── dashboard_page.py\n\n├── tests/\n\n│ ├── test_login.py\n\n│ └── test_dashboard.py\n\n└── conftest.py Base Page class A BasePage holds behavior common to every page — navigation, generic waits — so individual page classes don't repeat it. python\n\n## pages/base_page.py\n\nself.page = page\n\nBasePage.__init__(self, page) What it does: Stores a reference to the Playwright page object so every method in the class (and its subclasses) can use it. Types/params:\n\nPointers: Every page class should inherit from this and call\n\n```\ndef navigate(self, path):\n\nself.page.goto(f\"https://app.example.com{path}\")\n\ndef wait_for_load(self):\n\nself.page.wait_for_load_state(\"networkidle\")\n\nsuper().__init__(page) to get this shared setup for free.\n\nclass BasePage:\n\ndef __init__(self, page):\n```\n\n## pages/login_page.py\n\nself.username_input = page.get_by_label(\"Username\")\n\nself.password_input = page.get_by_label(\"Password\")\n\nself.login_button = page.get_by_role(\"button\", name=\"Log in\")\n\npython\n\nlogin_page = LoginPage(page)\n\nLoginPage.login(self, username, password) (example custom page method — pattern, not a Playwright API) What it does: Encapsulates the full \"log in\" user flow as one method call, hiding the individual locator/action steps from the test itself. Types/params:\n\nPointers: The test file itself should read almost like plain English (login_page.login(...)) — if a test file is full of raw locators and .fill()/.click() calls, that's a signal POM isn't being followed consistently.\n\n```\ndef login(self, username, password):\n\nself.navigate(\"/login\")\n\nself.username_input.fill(username)\n\nself.password_input.fill(password)\n\nself.login_button.click()\n\nfrom pages.base_page import BasePage\n\nclass LoginPage(BasePage):\n\ndef __init__(self, page):\n\nsuper().__init__(page)\n\nlogin_page.login(\"testuser\", \"testpass\")\n\nexpect(page.get_by_text(\"Welcome, testuser\")).to_be_visible()\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
