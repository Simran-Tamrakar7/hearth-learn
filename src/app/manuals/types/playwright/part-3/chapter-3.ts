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
  "contentMarkdown": "## Why Page Object Model?\n\nRaw Playwright tests interleave selectors, waits, and assertions in one function. When the login form changes from `#email` to `[data-testid=\"email\"]`, you hunt through dozens of files. The **Page Object Model (POM)** encapsulates each page's locators and actions behind a class. Tests read like user stories; UI changes touch one file.\n\nBenefits:\n\n- **Single source of truth** for selectors on a given page.\n- **Readable tests** — `login_page.sign_in(email, password)` instead of five locator lines.\n- **Reusable actions** — navigation, form fills, and waits live in one place.\n- **Easier onboarding** — new team members learn the page API, not every selector in the app.\n\n## Folder Structure\n\n```\ntests/\n  e2e/\n    pages/\n      __init__.py\n      base_page.py\n      login_page.py\n      dashboard_page.py\n    test_login.py\n    test_dashboard.py\n```\n\nEach page class maps to one route or major UI surface. Complex flows compose multiple page objects.\n\n## BasePage — Shared Behavior\n\nA base class holds navigation, waits, and utilities every page needs:\n\n```python\nfrom playwright.sync_api import Page, expect\n\nclass BasePage:\n    def __init__(self, page: Page, base_url: str):\n        self.page = page\n        self.base_url = base_url\n\n    def navigate(self, path: str = \"/\"):\n        self.page.goto(f\"{self.base_url}{path}\")\n\n    def wait_for_load(self):\n        self.page.wait_for_load_state(\"networkidle\")\n\n    def screenshot(self, name: str):\n        self.page.screenshot(path=f\"screenshots/{name}.png\")\n```\n\nSubclasses inherit `navigate`, `wait_for_load`, and any shared assertion helpers.\n\n## LoginPage Example\n\nDefine locators as properties or class attributes. Wrap user actions in methods:\n\n```python\nfrom playwright.sync_api import Page, expect\nfrom .base_page import BasePage\n\nclass LoginPage(BasePage):\n    def __init__(self, page: Page, base_url: str):\n        super().__init__(page, base_url)\n        self.email_input = page.get_by_label(\"Email\")\n        self.password_input = page.get_by_label(\"Password\")\n        self.sign_in_button = page.get_by_role(\"button\", name=\"Sign in\")\n        self.error_alert = page.get_by_role(\"alert\")\n\n    def open(self):\n        self.navigate(\"/login\")\n\n    def sign_in(self, email: str, password: str):\n        self.email_input.fill(email)\n        self.password_input.fill(password)\n        self.sign_in_button.click()\n\n    def expect_error(self, message: str):\n        expect(self.error_alert).to_contain_text(message)\n\n    def expect_redirect_to_dashboard(self):\n        expect(self.page).to_have_url(f\"{self.base_url}/dashboard\")\n```\n\n## Tests Using Page Objects\n\nTests become thin orchestration layers:\n\n```python\nimport pytest\nfrom playwright.sync_api import Page\nfrom pages.login_page import LoginPage\n\n@pytest.fixture\ndef login_page(page: Page, base_url) -> LoginPage:\n    return LoginPage(page, base_url)\n\ndef test_valid_login_redirects_to_dashboard(login_page):\n    login_page.open()\n    login_page.sign_in(\"qa@example.com\", \"secret\")\n    login_page.expect_redirect_to_dashboard()\n\ndef test_invalid_password_shows_error(login_page):\n    login_page.open()\n    login_page.sign_in(\"qa@example.com\", \"wrong\")\n    login_page.expect_error(\"Invalid credentials\")\n```\n\nWhen the login form adds a \"Remember me\" checkbox, you update `LoginPage.sign_in()` once — not every test file.\n\n## Composing Page Objects\n\nMulti-step flows chain page objects:\n\n```python\ndef test_create_leave_request(logged_in_page, base_url):\n    dashboard = DashboardPage(logged_in_page, base_url)\n    leave_form = LeaveRequestPage(logged_in_page, base_url)\n\n    dashboard.open()\n    dashboard.click_new_leave_request()\n    leave_form.fill(start_date=\"2026-06-01\", end_date=\"2026-06-05\", reason=\"Vacation\")\n    leave_form.submit()\n    leave_form.expect_success_message(\"Leave request submitted\")\n```\n\n## POM Guidelines\n\n- **Locators live in page classes**, not in test files.\n- **Methods return self or the next page** for fluent chaining: `return DashboardPage(self.page, self.base_url)`.\n- **Assertions can live in page objects** (`expect_error`) or in tests — pick one convention and stick with it.\n- **Do not over-abstract** — a page with one button does not need its own class.\n- **Prefer role and label locators** inside page objects; they survive CSS refactors better than XPath.\n\n## Anti-patterns to Avoid\n\n- **God objects** — one `AppPage` with 200 methods. Split by route.\n- **Assertions only in tests, locators only in pages** is fine, but mixing both styles in the same project confuses readers.\n- **Leaking Playwright `Page` into tests** defeats the purpose. Tests should call page-object methods, not raw `page.locator()` calls.\n\n## Key Takeaways\n\n- One class per page; shared behavior in `BasePage`.\n- Locators and actions are encapsulated; tests read like user workflows.\n- UI changes update one page class, not every test.\n- Compose page objects for multi-step flows; keep classes focused.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
