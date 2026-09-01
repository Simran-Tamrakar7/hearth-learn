/** Playwright manual Part 3 — Test Structure & Framework */
export const chapters = [
  {
    contentMarkdown: `## Pytest as the Test Runner

Playwright Python tests are plain pytest tests. You write functions named \`test_*\`, use \`assert\` or Playwright's \`expect()\`, and run them with \`pytest\`. The **pytest-playwright** plugin wires browser lifecycle into pytest's fixture system so you never manually launch Chromium in every file.

Install both packages:

\`\`\`bash
pip install pytest pytest-playwright
playwright install
\`\`\`

A minimal test requests the \`page\` fixture injected by pytest-playwright:

\`\`\`python
from playwright.sync_api import Page, expect

def test_homepage_title(page: Page):
    page.goto("https://example.com")
    expect(page).to_have_title("Example Domain")
\`\`\`

## Built-in Fixtures: page, browser, context

pytest-playwright provides three core fixtures:

| Fixture | Scope | What you get |
|---------|-------|--------------|
| \`page\` | function | A fresh \`Page\` in an isolated \`BrowserContext\` |
| \`context\` | function | A \`BrowserContext\` (cookies, storage, permissions) |
| \`browser\` | session | The shared \`Browser\` instance for the run |

Most tests only need \`page\`. Reach for \`context\` when you need to set permissions, geolocation, or locale before creating pages. Use \`browser\` when you need multiple contexts in one test (e.g., two users chatting).

\`\`\`python
def test_two_tabs(context):
    page_a = context.new_page()
    page_b = context.new_page()
    page_a.goto("https://example.com")
    page_b.goto("https://playwright.dev")
\`\`\`

## Writing Your Own Fixtures

Fixtures replace copy-pasted setup. Define a function decorated with \`@pytest.fixture\`, use \`yield\` to hand the resource to the test, and put cleanup after \`yield\`:

\`\`\`python
import pytest
from playwright.sync_api import Page

@pytest.fixture
def logged_in_page(page: Page) -> Page:
    page.goto("/login")
    page.get_by_label("Email").fill("qa@example.com")
    page.get_by_label("Password").fill("secret")
    page.get_by_role("button", name="Sign in").click()
    page.wait_for_url("**/dashboard")
    yield page
    # teardown runs even if the test fails
    page.goto("/logout")

def test_dashboard_widget(logged_in_page):
    expect(logged_in_page.get_by_text("Leave balance")).to_be_visible()
\`\`\`

Tests declare fixtures as **parameters** — pytest resolves the dependency graph automatically.

## conftest.py — Shared Fixtures Without Imports

Place a \`conftest.py\` file in any test directory. Fixtures defined there are auto-discovered for that folder and all subfolders. No import statement needed.

\`\`\`
tests/
  conftest.py          # project-wide fixtures
  e2e/
    conftest.py        # e2e-only fixtures (e.g., BASE_URL)
    test_login.py
    test_dashboard.py
\`\`\`

\`\`\`python
# tests/conftest.py
import os
import pytest

@pytest.fixture(scope="session")
def base_url():
    return os.environ.get("BASE_URL", "http://localhost:3000")
\`\`\`

\`\`\`python
# tests/e2e/test_dashboard.py
def test_loads(base_url, page):
    page.goto(f"{base_url}/dashboard")
\`\`\`

## Fixture Scopes

Scope controls how often a fixture is created:

| Scope | Created | Use when |
|-------|---------|----------|
| \`function\` | Once per test (default) | Page state must be isolated |
| \`class\` | Once per test class | Shared setup within a class |
| \`module\` | Once per file | Expensive read-only setup |
| \`session\` | Once per pytest run | Browser launch, auth token |

**Default to \`function\` scope.** Session-scoped fixtures that mutate shared data cause cross-test pollution — a classic source of flaky suites.

\`\`\`python
@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    return {**browser_context_args, "viewport": {"width": 1280, "height": 720}}
\`\`\`

The \`browser_context_args\` hook fixture lets you customize every context's defaults project-wide.

## CLI Flags

pytest-playwright adds browser flags you pass through pytest:

\`\`\`bash
pytest --headed                  # show the browser window
pytest --browser firefox         # run in Firefox instead of Chromium
pytest --browser webkit          # run in WebKit (Safari engine)
pytest --slowmo 500              # 500 ms delay between actions
pytest --tracing on              # record trace for every test
pytest --screenshot only-on-failure
pytest --video retain-on-failure
pytest tests/e2e/test_login.py -k "valid"   # keyword filter
pytest -m smoke                  # run only @pytest.mark.smoke tests
\`\`\`

Combine flags freely. In CI, headless + tracing on failure is the standard starting point.

## Async vs Sync API

pytest-playwright supports both sync and async fixtures. The sync API (\`playwright.sync_api\`) is simpler for most teams. If your app is async-native (FastAPI background tasks, asyncio event loops), use the async plugin variant with \`async def test_...\` and \`await page.goto(...)\`.

## Key Takeaways

- Install \`pytest-playwright\`; request \`page\` in every test signature.
- Put shared fixtures in \`conftest.py\`; keep scope at \`function\` unless you have a measured reason not to.
- Use \`yield\` fixtures for guaranteed teardown.
- Pass \`--headed\`, \`--browser\`, and \`--slowmo\` from the CLI — no wrapper scripts needed.`,
  },
  {
    contentMarkdown: `## Why Organization Matters

A Playwright suite grows fast. Without structure, you end up with 200 tests in one folder, no way to run a quick smoke check before deploy, and duplicated login code in every file. pytest gives you **markers**, **parametrize**, and conventional folder layouts to keep large suites navigable.

## Folder Structure

A practical layout separates concerns by feature and test type:

\`\`\`
tests/
  conftest.py
  pytest.ini
  e2e/
    conftest.py
    smoke/
      test_login.py
      test_homepage.py
    regression/
      test_checkout.py
      test_user_settings.py
    pages/
      base_page.py
      login_page.py
    data/
      users.json
\`\`\`

- \`smoke/\` — fast, critical-path tests run on every PR.
- \`regression/\` — broader coverage run nightly or pre-release.
- \`pages/\` — Page Object classes (Chapter 14).
- \`data/\` — JSON or CSV test data files.

Point pytest at the right subtree:

\`\`\`bash
pytest tests/e2e/smoke/          # smoke only
pytest tests/e2e/regression/     # full regression
\`\`\`

## Markers — Label and Filter Tests

Markers tag tests with metadata. Register them in \`pytest.ini\` so typos fail loudly:

\`\`\`ini
[pytest]
markers =
    smoke: critical path, run on every PR
    regression: full coverage, run nightly
    slow: tests that take > 30 seconds
\`\`\`

Apply markers to tests:

\`\`\`python
import pytest
from playwright.sync_api import Page, expect

@pytest.mark.smoke
def test_login_page_loads(page: Page):
    page.goto("/login")
    expect(page.get_by_role("heading", name="Sign in")).to_be_visible()

@pytest.mark.regression
@pytest.mark.slow
def test_full_checkout_flow(page: Page):
    # multi-step flow ...
    pass
\`\`\`

Run subsets from the CLI:

\`\`\`bash
pytest -m smoke                  # only smoke tests
pytest -m "smoke and not slow"   # smoke, skip slow ones
pytest -m regression             # nightly suite
\`\`\`

## Smoke vs Regression Grouping

| Group | Goal | Typical count | When to run |
|-------|------|---------------|-------------|
| Smoke | Prove the app is alive | 5–15 tests | Every commit / PR |
| Regression | Broad feature coverage | 50–500+ tests | Nightly, pre-release |

Smoke tests should complete in under five minutes total. They cover login, one read path, and one write path. Regression tests exercise edge cases, error states, and multi-step workflows.

In CI pipelines, run smoke on every push and regression on a schedule:

\`\`\`yaml
# GitHub Actions example
- name: Smoke tests
  run: pytest -m smoke --browser chromium

- name: Regression (nightly)
  if: github.event_name == 'schedule'
  run: pytest -m regression --browser chromium
\`\`\`

## Parametrize — One Test, Many Inputs

\`@pytest.mark.parametrize\` runs the same test logic with different data without copy-pasting:

\`\`\`python
import pytest
from playwright.sync_api import Page, expect

@pytest.mark.parametrize("email,password,expected_error", [
    ("", "secret", "Email is required"),
    ("bad@", "secret", "Invalid email format"),
    ("qa@example.com", "", "Password is required"),
    ("qa@example.com", "wrong", "Invalid credentials"),
])
def test_login_validation(page: Page, email, password, expected_error):
    page.goto("/login")
    page.get_by_label("Email").fill(email)
    page.get_by_label("Password").fill(password)
    page.get_by_role("button", name="Sign in").click()
    expect(page.get_by_role("alert")).to_contain_text(expected_error)
\`\`\`

Each tuple becomes a separate test case in the report — failures show exactly which input broke.

Parametrize works with fixtures too:

\`\`\`python
@pytest.mark.parametrize("browser_name", ["chromium", "firefox", "webkit"])
def test_cross_browser(page, browser_name):
    page.goto("/")
    expect(page).to_have_title("My App")
\`\`\`

## Combining Markers and Parametrize

Stack decorators — parametrize expands first, then markers apply to every generated test:

\`\`\`python
@pytest.mark.smoke
@pytest.mark.parametrize("path", ["/", "/pricing", "/about"])
def test_public_pages_load(page, path):
    page.goto(path)
    expect(page).not_to_have_title("")
\`\`\`

## Naming Conventions

Consistent names make failures scannable:

- Files: \`test_<feature>.py\` (pytest discovers \`test_*\` files automatically).
- Functions: \`test_<action>_<expected_outcome>\` — e.g., \`test_login_with_valid_credentials_redirects_to_dashboard\`.
- Markers: lowercase, no spaces — \`smoke\`, not \`Smoke Test\`.

## Key Takeaways

- Split tests into \`smoke/\` and \`regression/\` folders; register markers in \`pytest.ini\`.
- Use \`-m smoke\` in CI for fast feedback; run regression on a schedule.
- Parametrize validation and boundary cases instead of duplicating test functions.
- Keep smoke suites under five minutes — if they grow, promote only the most critical paths.`,
  },
  {
    contentMarkdown: `## Why Page Object Model?

Raw Playwright tests interleave selectors, waits, and assertions in one function. When the login form changes from \`#email\` to \`[data-testid="email"]\`, you hunt through dozens of files. The **Page Object Model (POM)** encapsulates each page's locators and actions behind a class. Tests read like user stories; UI changes touch one file.

Benefits:

- **Single source of truth** for selectors on a given page.
- **Readable tests** — \`login_page.sign_in(email, password)\` instead of five locator lines.
- **Reusable actions** — navigation, form fills, and waits live in one place.
- **Easier onboarding** — new team members learn the page API, not every selector in the app.

## Folder Structure

\`\`\`
tests/
  e2e/
    pages/
      __init__.py
      base_page.py
      login_page.py
      dashboard_page.py
    test_login.py
    test_dashboard.py
\`\`\`

Each page class maps to one route or major UI surface. Complex flows compose multiple page objects.

## BasePage — Shared Behavior

A base class holds navigation, waits, and utilities every page needs:

\`\`\`python
from playwright.sync_api import Page, expect

class BasePage:
    def __init__(self, page: Page, base_url: str):
        self.page = page
        self.base_url = base_url

    def navigate(self, path: str = "/"):
        self.page.goto(f"{self.base_url}{path}")

    def wait_for_load(self):
        self.page.wait_for_load_state("networkidle")

    def screenshot(self, name: str):
        self.page.screenshot(path=f"screenshots/{name}.png")
\`\`\`

Subclasses inherit \`navigate\`, \`wait_for_load\`, and any shared assertion helpers.

## LoginPage Example

Define locators as properties or class attributes. Wrap user actions in methods:

\`\`\`python
from playwright.sync_api import Page, expect
from .base_page import BasePage

class LoginPage(BasePage):
    def __init__(self, page: Page, base_url: str):
        super().__init__(page, base_url)
        self.email_input = page.get_by_label("Email")
        self.password_input = page.get_by_label("Password")
        self.sign_in_button = page.get_by_role("button", name="Sign in")
        self.error_alert = page.get_by_role("alert")

    def open(self):
        self.navigate("/login")

    def sign_in(self, email: str, password: str):
        self.email_input.fill(email)
        self.password_input.fill(password)
        self.sign_in_button.click()

    def expect_error(self, message: str):
        expect(self.error_alert).to_contain_text(message)

    def expect_redirect_to_dashboard(self):
        expect(self.page).to_have_url(f"{self.base_url}/dashboard")
\`\`\`

## Tests Using Page Objects

Tests become thin orchestration layers:

\`\`\`python
import pytest
from playwright.sync_api import Page
from pages.login_page import LoginPage

@pytest.fixture
def login_page(page: Page, base_url) -> LoginPage:
    return LoginPage(page, base_url)

def test_valid_login_redirects_to_dashboard(login_page):
    login_page.open()
    login_page.sign_in("qa@example.com", "secret")
    login_page.expect_redirect_to_dashboard()

def test_invalid_password_shows_error(login_page):
    login_page.open()
    login_page.sign_in("qa@example.com", "wrong")
    login_page.expect_error("Invalid credentials")
\`\`\`

When the login form adds a "Remember me" checkbox, you update \`LoginPage.sign_in()\` once — not every test file.

## Composing Page Objects

Multi-step flows chain page objects:

\`\`\`python
def test_create_leave_request(logged_in_page, base_url):
    dashboard = DashboardPage(logged_in_page, base_url)
    leave_form = LeaveRequestPage(logged_in_page, base_url)

    dashboard.open()
    dashboard.click_new_leave_request()
    leave_form.fill(start_date="2026-06-01", end_date="2026-06-05", reason="Vacation")
    leave_form.submit()
    leave_form.expect_success_message("Leave request submitted")
\`\`\`

## POM Guidelines

- **Locators live in page classes**, not in test files.
- **Methods return self or the next page** for fluent chaining: \`return DashboardPage(self.page, self.base_url)\`.
- **Assertions can live in page objects** (\`expect_error\`) or in tests — pick one convention and stick with it.
- **Do not over-abstract** — a page with one button does not need its own class.
- **Prefer role and label locators** inside page objects; they survive CSS refactors better than XPath.

## Anti-patterns to Avoid

- **God objects** — one \`AppPage\` with 200 methods. Split by route.
- **Assertions only in tests, locators only in pages** is fine, but mixing both styles in the same project confuses readers.
- **Leaking Playwright \`Page\` into tests** defeats the purpose. Tests should call page-object methods, not raw \`page.locator()\` calls.

## Key Takeaways

- One class per page; shared behavior in \`BasePage\`.
- Locators and actions are encapsulated; tests read like user workflows.
- UI changes update one page class, not every test.
- Compose page objects for multi-step flows; keep classes focused.`,
  },
  {
    contentMarkdown: `## Configuration at the Project Level

Hard-coded URLs, timeouts, and browser options scattered across test files become a maintenance burden the moment you add a staging environment. Centralize configuration in **pytest.ini**, environment variables, and \`conftest.py\` hooks so one change propagates everywhere.

## pytest.ini — The Project Config File

Place \`pytest.ini\` at the repository root (or \`tests/\` directory):

\`\`\`ini
[pytest]
testpaths = tests/e2e
python_files = test_*.py
python_classes = Test*
python_functions = test_*

markers =
    smoke: critical path tests
    regression: full coverage tests
    slow: tests exceeding 30 seconds

addopts =
    --strict-markers
    --tb=short
    -ra

# Playwright-specific defaults (pytest-playwright)
# These can also be set via CLI; pytest.ini provides the baseline
\`\`\`

\`--strict-markers\` fails on unregistered marker names — catches typos like \`@pytest.mark.smoek\`.

## Environment Variables

Never commit secrets or environment-specific URLs. Read them at runtime:

\`\`\`python
# tests/conftest.py
import os
import pytest

@pytest.fixture(scope="session")
def base_url() -> str:
    url = os.environ.get("BASE_URL")
    if not url:
        raise RuntimeError("BASE_URL environment variable is required")
    return url.rstrip("/")

@pytest.fixture(scope="session")
def admin_credentials():
    return {
        "email": os.environ["ADMIN_EMAIL"],
        "password": os.environ["ADMIN_PASSWORD"],
    }
\`\`\`

Set variables locally and in CI:

\`\`\`bash
# .env.local (gitignored)
BASE_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=local-dev-secret
\`\`\`

\`\`\`bash
export BASE_URL=https://staging.example.com
pytest -m smoke
\`\`\`

For local development, load \`.env\` files with \`python-dotenv\` in \`conftest.py\`:

\`\`\`python
from dotenv import load_dotenv
load_dotenv()  # reads .env before fixtures resolve
\`\`\`

## BASE_URL Pattern

Every test navigates relative to a single base URL fixture:

\`\`\`python
def test_pricing_page(page, base_url):
    page.goto(f"{base_url}/pricing")
    expect(page.get_by_role("heading", name="Pricing")).to_be_visible()
\`\`\`

Page objects accept \`base_url\` in their constructor (Chapter 14):

\`\`\`python
class DashboardPage(BasePage):
    def open(self):
        self.navigate("/dashboard")  # uses self.base_url internally
\`\`\`

## Multi-Environment Pattern

Teams typically run against three targets:

| Environment | BASE_URL | When |
|-------------|----------|------|
| Local | \`http://localhost:3000\` | Developer machine |
| Staging | \`https://staging.example.com\` | PR checks, QA |
| Production | \`https://app.example.com\` | Smoke only, read-only tests |

Switch environments without code changes:

\`\`\`bash
BASE_URL=https://staging.example.com pytest -m smoke
BASE_URL=https://app.example.com pytest -m smoke --headed
\`\`\`

In CI, set \`BASE_URL\` per job:

\`\`\`yaml
env:
  BASE_URL: https://staging.example.com
  ADMIN_EMAIL: \${{ secrets.STAGING_ADMIN_EMAIL }}
  ADMIN_PASSWORD: \${{ secrets.STAGING_ADMIN_PASSWORD }}
\`\`\`

## Playwright-Specific Configuration Hooks

pytest-playwright exposes hook fixtures in \`conftest.py\`:

\`\`\`python
import pytest

@pytest.fixture(scope="session")
def browser_type_launch_args(browser_type_launch_args):
    return {
        **browser_type_launch_args,
        "headless": True,
        "slow_mo": 0,
    }

@pytest.fixture(scope="session")
def browser_context_args(browser_context_args, base_url):
    return {
        **browser_context_args,
        "base_url": base_url,
        "viewport": {"width": 1440, "height": 900},
        "ignore_https_errors": True,
    }
\`\`\`

With \`base_url\` set on the context, tests can use relative paths:

\`\`\`python
def test_homepage(page):
    page.goto("/")  # resolves against context base_url
\`\`\`

## Timeouts and Retries

Set global timeouts in config or conftest:

\`\`\`python
@pytest.fixture(autouse=True)
def set_default_timeouts(page):
    page.set_default_timeout(15_000)       # locator actions
    page.set_default_navigation_timeout(30_000)
\`\`\`

For flaky network environments, consider \`pytest-rerunfailures\` — but fix root causes rather than masking them.

## Key Takeaways

- \`pytest.ini\` registers markers and default CLI options.
- \`BASE_URL\` and credentials come from environment variables, never hard-coded.
- Use \`browser_context_args\` to set viewport, \`base_url\`, and HTTPS settings project-wide.
- One config change switches between local, staging, and production.`,
  },
  {
    contentMarkdown: `## Separating Test Data from Test Logic

Tests that embed \`"qa@example.com"\` and \`"SuperSecret123"\` inline are hard to update and impossible to share across environments. **Test data management** keeps inputs in dedicated files or factories, loads them through fixtures, and cleans up created records after each test.

## JSON Fixtures

Store static data in \`tests/e2e/data/\`:

\`\`\`json
{
  "valid_user": {
    "email": "qa@example.com",
    "password": "TestPass123!",
    "display_name": "QA User"
  },
  "invalid_users": [
    {"email": "", "password": "secret", "error": "Email is required"},
    {"email": "bad@", "password": "secret", "error": "Invalid email"}
  ]
}
\`\`\`

Load with a fixture:

\`\`\`python
import json
import pytest
from pathlib import Path

DATA_DIR = Path(__file__).parent / "data"

@pytest.fixture(scope="session")
def users_data():
    with open(DATA_DIR / "users.json") as f:
        return json.load(f)

def test_login_with_valid_user(page, users_data, login_page):
    user = users_data["valid_user"]
    login_page.open()
    login_page.sign_in(user["email"], user["password"])
    login_page.expect_redirect_to_dashboard()
\`\`\`

JSON fixtures work well for static, version-controlled data. Commit them alongside tests so PRs show data changes explicitly.

## Dynamic Data with Faker

Static emails collide when tests run in parallel — two tests creating \`qa@example.com\` cause unique-constraint failures. Generate unique values with **Faker**:

\`\`\`bash
pip install faker
\`\`\`

\`\`\`python
import pytest
from faker import Faker

@pytest.fixture
def fake() -> Faker:
    return Faker()

@pytest.fixture
def new_user(fake):
    return {
        "email": fake.unique.email(),
        "password": fake.password(length=16),
        "first_name": fake.first_name(),
        "last_name": fake.last_name(),
    }

def test_register_new_user(page, new_user):
    page.goto("/register")
    page.get_by_label("Email").fill(new_user["email"])
    page.get_by_label("Password").fill(new_user["password"])
    page.get_by_role("button", name="Create account").click()
    expect(page.get_by_text("Welcome")).to_be_visible()
\`\`\`

\`fake.unique\` ensures no duplicate emails within a single test run.

## API Seeding — Create Data Before UI Tests

For complex entities (orders, projects, leave requests), seed via API instead of clicking through the UI:

\`\`\`python
import pytest
import requests

@pytest.fixture
def api_client(base_url):
    session = requests.Session()
    session.headers["Authorization"] = f"Bearer {os.environ['API_TOKEN']}"
    session.base_url = base_url
    return session

@pytest.fixture
def seeded_project(api_client, fake):
    payload = {"name": fake.company(), "status": "active"}
    resp = api_client.post(f"{api_client.base_url}/api/projects", json=payload)
    resp.raise_for_status()
    project = resp.json()
    yield project
    # cleanup
    api_client.delete(f"{api_client.base_url}/api/projects/{project['id']}")
\`\`\`

The UI test starts on a page that already has data:

\`\`\`python
def test_project_dashboard(page, base_url, seeded_project):
    page.goto(f"{base_url}/projects/{seeded_project['id']}")
    expect(page.get_by_role("heading")).to_contain_text(seeded_project["name"])
\`\`\`

## Cleanup with yield Fixtures

**Always clean up data your test creates.** A \`yield\` fixture guarantees teardown runs after pass or fail:

\`\`\`python
@pytest.fixture
def created_employee(api_client, fake):
    employee = {
        "email": fake.unique.email(),
        "department": "Engineering",
    }
    resp = api_client.post("/api/employees", json=employee)
    resp.raise_for_status()
    employee["id"] = resp.json()["id"]

    yield employee

    api_client.delete(f"/api/employees/{employee['id']}")
\`\`\`

If the test fails mid-flow, pytest still executes the code after \`yield\`. This prevents orphaned records from polluting the next run.

## Combining JSON and Faker

A common pattern: JSON provides the template, Faker provides uniqueness:

\`\`\`python
@pytest.fixture
def employee_payload(users_data, fake):
    template = users_data["employee_template"].copy()
    template["email"] = fake.unique.email()
    template["employee_id"] = fake.uuid4()
    return template
\`\`\`

## Data Directory Conventions

\`\`\`
tests/e2e/data/
  users.json           # static user accounts
  products.json        # catalog items for e-commerce tests
  api_responses/       # mock response bodies (used with page.route)
    empty_search.json
    server_error.json
\`\`\`

Keep sensitive production data out of the repo. Generate synthetic data with Faker or use dedicated test-environment accounts.

## Key Takeaways

- Static data in JSON files; dynamic unique values from Faker.
- Seed complex state via API fixtures, not UI clicks.
- Use \`yield\` fixtures for guaranteed cleanup — teardown runs on failure too.
- Never commit real user passwords or production data to version control.`,
  },
  {
    contentMarkdown: `## Checkpoint — Framework

Verify you can apply Part 3 concepts before moving to advanced topics.

- [ ] I can write a Playwright test that requests the \`page\` fixture and runs with \`pytest\`.
- [ ] I have a \`conftest.py\` with at least one shared fixture using \`yield\` teardown.
- [ ] I understand fixture scopes and default to \`function\` unless I have a measured reason not to.
- [ ] I can run \`pytest -m smoke\` and \`pytest -m regression\` with markers registered in \`pytest.ini\`.
- [ ] I have used \`@pytest.mark.parametrize\` for at least one data-driven test.
- [ ] My project has a \`pages/\` folder with a \`BasePage\` and at least one page object class.
- [ ] Tests call page-object methods, not raw locators scattered in test files.
- [ ] \`BASE_URL\` is read from an environment variable, not hard-coded.
- [ ] Test data lives in JSON files or Faker-generated fixtures, not inline strings.
- [ ] Created test data is cleaned up via a \`yield\` fixture after each test.

**Score:** 8–10 checked — ready for Part 4. 5–7 — revisit the gaps. Below 5 — rework Part 3 before continuing.`,
  },
];
