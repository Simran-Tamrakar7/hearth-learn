/** Playwright manual Part 6 — Pro-Level Practices */
export const chapters = [
  {
    contentMarkdown: `## Enterprise folder architecture

A scalable Playwright framework organizes code so a new contributor can guess where something lives before searching. The guiding principle: mirror the application structure and separate concerns by responsibility.

\`\`\`
project/
├── config/
│   ├── settings.py          # Environment URLs, timeouts, credentials
│   └── browsers.py          # Browser launch options per environment
├── pages/
│   ├── base_page.py         # Shared navigation, waits, assertions
│   └── modules/
│       ├── login_page.py
│       ├── leave_page.py
│       └── payroll_page.py
├── tests/
│   ├── smoke/               # Fast PR gate (< 5 min)
│   ├── regression/          # Full suite (nightly)
│   └── modules/             # Feature-scoped tests
├── utils/
│   ├── api_client.py        # REST helpers for test setup/teardown
│   ├── data_factory.py      # Generate test entities
│   └── wait_helpers.py      # Custom wait conditions
├── test_data/
│   ├── users.json
│   └── leave_requests.json
├── conftest.py
├── pytest.ini
└── requirements.txt
\`\`\`

Tests should read like scenarios. Page objects should know only about their page. Utilities should hold everything else.

## The utils layer

The \`utils/\` directory is where cross-cutting logic lives — anything that does not belong in a page object or a test function.

\`\`\`python
# utils/api_client.py
import requests
from config.settings import Settings

class APIClient:
    def __init__(self):
        self.base_url = Settings.BASE_URL
        self.session = requests.Session()

    def login(self, username: str, password: str) -> str:
        resp = self.session.post(
            f"{self.base_url}/api/auth/login",
            json={"username": username, "password": password},
        )
        resp.raise_for_status()
        token = resp.json()["token"]
        self.session.headers["Authorization"] = f"Bearer {token}"
        return token

    def create_leave_request(self, employee_id: int, leave_type: str) -> dict:
        resp = self.session.post(
            f"{self.base_url}/api/leave-requests",
            json={"employeeId": employee_id, "type": leave_type},
        )
        resp.raise_for_status()
        return resp.json()
\`\`\`

\`\`\`python
# utils/data_factory.py
from faker import Faker

fake = Faker()

def random_employee() -> dict:
    return {
        "name": fake.name(),
        "email": fake.company_email(),
        "department": fake.random_element(["HR", "Engineering", "Finance"]),
    }
\`\`\`

Never put API calls or data generation inside test functions — extract them to utils so every test uses the same setup path.

## Settings class — single source of truth

Hardcoding URLs and credentials in tests is the fastest way to create a suite that breaks when environments change.

\`\`\`python
# config/settings.py
import os
from dataclasses import dataclass

@dataclass(frozen=True)
class Settings:
    BASE_URL: str = os.getenv("BASE_URL", "http://localhost:3000")
    API_URL: str = os.getenv("API_URL", "http://localhost:3000/api")
    TEST_USER: str = os.getenv("TEST_USER", "testuser@example.com")
    TEST_PASSWORD: str = os.getenv("TEST_PASSWORD", "TestPass123!")
    DEFAULT_TIMEOUT: int = int(os.getenv("DEFAULT_TIMEOUT", "30000"))
    HEADLESS: bool = os.getenv("HEADLESS", "true").lower() == "true"
\`\`\`

\`\`\`python
# conftest.py
from config.settings import Settings

@pytest.fixture(scope="session")
def browser_type_launch_args(browser_type_launch_args):
    return {**browser_type_launch_args, "headless": Settings.HEADLESS}
\`\`\`

Every test, page object, and utility imports \`Settings\` — one place to change when staging moves or credentials rotate.

## Base page pattern

A \`BasePage\` eliminates duplicated navigation and wait logic across feature page objects.

\`\`\`python
# pages/base_page.py
from playwright.sync_api import Page
from config.settings import Settings

class BasePage:
    def __init__(self, page: Page):
        self.page = page
        self.base_url = Settings.BASE_URL

    def navigate(self, path: str = "/"):
        self.page.goto(f"{self.base_url}{path}")
        self.page.wait_for_load_state("networkidle")

    def wait_for_toast(self, message: str):
        self.page.get_by_role("alert").filter(has_text=message).wait_for()
\`\`\`

\`\`\`python
# pages/modules/leave_page.py
from pages.base_page import BasePage

class LeavePage(BasePage):
    def open(self):
        self.navigate("/leave")

    def submit_request(self, leave_type: str, start: str, end: str):
        self.page.get_by_label("Leave Type").select_option(leave_type)
        self.page.get_by_label("Start Date").fill(start)
        self.page.get_by_label("End Date").fill(end)
        self.page.get_by_role("button", name="Submit").click()
        self.wait_for_toast("Request submitted")
\`\`\`

Restructure when your suite exceeds ~30–40 tests or a second contributor joins. Apply the structure before scaling CI.`,
  },
  {
    contentMarkdown: `## Marker expressions for selective execution

pytest markers let you tag tests by priority, feature, or environment and run subsets without maintaining separate files.

\`\`\`python
# pytest.ini
[pytest]
markers =
    smoke: fast critical-path tests for PR gate
    regression: full suite for nightly runs
    leave: leave module tests
    payroll: payroll module tests
    flaky: known intermittent — retry enabled
\`\`\`

\`\`\`python
import pytest

@pytest.mark.smoke
def test_login_redirects_to_dashboard(page):
    page.goto("/login")
    page.get_by_label("Email").fill("user@example.com")
    page.get_by_label("Password").fill("password")
    page.get_by_role("button", name="Sign in").click()
    page.wait_for_url("**/dashboard")

@pytest.mark.regression
@pytest.mark.leave
def test_submit_leave_request(page, leave_page):
    leave_page.open()
    leave_page.submit_request("Annual", "2026-10-01", "2026-10-03")
\`\`\`

\`\`\`bash
# PR gate — smoke only
pytest -m smoke

# Nightly — everything except flaky
pytest -m "regression and not flaky"

# Module team — leave tests only
pytest -m leave

# Combine markers with boolean logic
pytest -m "(smoke or leave) and not flaky"
\`\`\`

Document markers in \`pytest.ini\` so \`pytest --markers\` shows descriptions — this prevents marker sprawl and naming collisions.

## Diagnosing flaky tests

A flaky test passes and fails non-deterministically. Systematic diagnosis beats random reruns.

\`\`\`bash
# Run a suspected flaky test 20 times
pytest tests/modules/test_leave.py::test_approve_request --count=20

# Run with trace on every attempt
pytest tests/modules/test_leave.py::test_approve_request --count=10 --tracing=on
\`\`\`

Common root causes and fixes:

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| Timeout on locator | Race condition — element not ready | Use \`wait_for\` with explicit state |
| Passes headed, fails headless | Animation or timing | Wait for \`networkidle\` or disable animations |
| Fails only in CI | Slow runner, missing deps | Increase timeout; check \`--with-deps\` |
| Fails at month boundary | Hardcoded dates | Use relative dates via factory |
| Intermittent 500 errors | Shared test data collision | Isolate data per test with factories |

\`\`\`python
# Bad — races the UI
page.click("#submit")
assert page.locator(".success").is_visible()

# Good — waits for the outcome
page.get_by_role("button", name="Submit").click()
page.get_by_text("Request submitted").wait_for(state="visible")
\`\`\`

## pytest hooks for suite-wide behavior

Hooks centralize logic that would otherwise be copy-pasted across conftest files.

\`\`\`python
# conftest.py
import pytest

def pytest_collection_modifyitems(config, items):
    """Auto-skip tests marked @pytest.mark.staging when not on staging."""
    if not config.getoption("--staging"):
        skip_staging = pytest.mark.skip(reason="requires --staging flag")
        for item in items:
            if "staging" in item.keywords:
                item.add_marker(skip_staging)

def pytest_runtest_setup(item):
    """Log marker composition before each test."""
    markers = [m.name for m in item.iter_markers()]
    if markers:
        print(f"\\nRunning {item.name} with markers: {markers}")

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()
    if report.when == "call" and report.failed:
        # Quarantine: auto-add flaky marker after 3 CI failures (custom logic)
        item._failure_count = getattr(item, "_failure_count", 0) + 1
\`\`\`

Use \`pytest_collection_modifyitems\` to skip or reorder tests based on environment. Use \`pytest_runtest_makereport\` for failure artifacts and quarantine tracking.

## TestRail integration

TestRail links automated test results to manual test cases, giving QA managers a single view of coverage and pass rates.

\`\`\`bash
pip install trcli
\`\`\`

\`\`\`bash
# Export pytest JUnit XML
pytest --junitxml=results.xml

# Upload to TestRail
trcli -y \\
  -h https://yourcompany.testrail.io \\
  --project "HRMS Automation" \\
  --username \$TESTRAIL_USER \\
  --password \$TESTRAIL_KEY \\
  parse_junit \\
  --title "Nightly Run \$(date +%Y-%m-%d)" \\
  -f results.xml
\`\`\`

\`\`\`python
# Map pytest test IDs to TestRail case IDs via markers
@pytest.mark.testrail("C1234")
@pytest.mark.smoke
def test_login_redirects_to_dashboard(page):
    ...
\`\`\`

Add the TestRail upload step to your nightly CI pipeline after JUnit XML generation. PR smoke runs typically skip TestRail to keep feedback fast.

## Suite health metrics

Track these weekly: flake rate (failures that pass on retry), average runtime per marker, tests with no assertions, and tests that have not failed in 90 days (possibly obsolete). A suite that grows without pruning becomes slower and less trusted than no suite at all.`,
  },
  {
    contentMarkdown: `## Naming conventions

Consistent naming makes tests readable in reports, code review, and CI logs without opening the source file.

\`\`\`python
# Test functions — describe behavior, not implementation
# Good
def test_admin_can_approve_pending_leave_request(page, leave_page): ...
def test_employee_cannot_approve_own_leave_request(page, leave_page): ...

# Bad
def test_leave_1(page): ...
def test_click_approve_button(page): ...
\`\`\`

\`\`\`python
# Page objects — {Feature}Page, methods are verbs
class LeaveApprovalPage:
    def open_pending_queue(self): ...
    def approve_request(self, employee_name: str): ...
    def reject_request(self, employee_name: str, reason: str): ...
\`\`\`

\`\`\`python
# Locators — prefer role and label over CSS
# Good
page.get_by_role("button", name="Approve")
page.get_by_label("Rejection reason")

# Bad
page.locator("#btn-approve-123")
page.locator("div.modal > form > textarea:nth-child(2)")
\`\`\`

File names: \`test_{feature}.py\` for tests, \`{feature}_page.py\` for page objects. Match the application module name so navigation is intuitive.

## Anti-patterns to reject in code review

**Hardcoded waits**

\`\`\`python
# Anti-pattern
import time
page.click("#submit")
time.sleep(3)
assert page.locator(".success").is_visible()

# Correct
page.get_by_role("button", name="Submit").click()
page.get_by_text("Success").wait_for(state="visible")
\`\`\`

**Locators in test files**

\`\`\`python
# Anti-pattern — locator leaks into test
def test_approve_leave(page):
    page.locator("[data-testid=approve-btn]").click()

# Correct — locator lives in page object
def test_approve_leave(page, leave_page):
    leave_page.approve_pending_request("Jane Doe")
\`\`\`

**Tests that depend on execution order**

\`\`\`python
# Anti-pattern — test_b fails if test_a did not run first
created_id = None

def test_a_create_user(page):
    global created_id
    created_id = create_user()

def test_b_delete_user(page):
    delete_user(created_id)  # breaks under parallel execution
\`\`\`

Each test must set up and tear down its own data. Shared state across tests breaks parallel runs and produces order-dependent flakes.

**Assertion-free tests**

\`\`\`python
# Anti-pattern — no assertion, always passes
def test_dashboard_loads(page):
    page.goto("/dashboard")

# Correct
def test_dashboard_loads(page):
    page.goto("/dashboard")
    page.get_by_role("heading", name="Dashboard").wait_for()
\`\`\`

**Over-mocking in E2E tests**

If every API call is stubbed, you are testing the frontend in isolation — that is a component test, not an E2E test. Reserve API mocking for error-path scenarios and slow third-party services.

## Documentation standards

Every page object method that is not self-evident gets a one-line docstring. Every marker gets a description in \`pytest.ini\`. Every environment variable gets a row in the project README.

\`\`\`python
class LeavePage(BasePage):
    def submit_request(self, leave_type: str, start: str, end: str) -> None:
        """Fill and submit a new leave request form.

        Args:
            leave_type: One of 'Annual', 'Sick', 'Personal'.
            start: ISO date string (YYYY-MM-DD).
            end: ISO date string (YYYY-MM-DD).
        """
        ...
\`\`\`

\`\`\`markdown
## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| BASE_URL | Yes | — | Application under test |
| TEST_USER | Yes | — | Login email for test account |
| TEST_PASSWORD | Yes | — | Login password for test account |
| HEADLESS | No | true | Run browsers headless |
\`\`\`

## Code review checklist

Before approving a Playwright PR, verify:

1. No \`time.sleep()\` — all waits are Playwright-native
2. Locators use role/label/testid, not CSS chains
3. Test sets up and tears down its own data
4. No hardcoded URLs or credentials — uses \`Settings\`
5. New tests have appropriate markers (\`smoke\`, \`regression\`, module)
6. Page object methods are reused, not duplicated
7. At least one meaningful assertion per test
8. Failure artifacts configured (screenshot/trace on failure)

Reject PRs that add tests without assertions or that copy-paste login flows instead of using fixtures.`,
  },
  {
    contentMarkdown: `## Auth reuse — the biggest performance win

Logging in through the UI before every test is the most common source of wasted suite runtime. Authenticate once, save state, reuse across tests.

\`\`\`python
# conftest.py
import pytest
from pathlib import Path

AUTH_STATE = Path("test_data/.auth/user.json")

@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    if AUTH_STATE.exists():
        return {**browser_context_args, "storage_state": str(AUTH_STATE)}
    return browser_context_args

@pytest.fixture(scope="session", autouse=True)
def save_auth_state(browser):
    if not AUTH_STATE.exists():
        AUTH_STATE.parent.mkdir(parents=True, exist_ok=True)
        context = browser.new_context()
        page = context.new_page()
        page.goto("/login")
        page.get_by_label("Email").fill("testuser@example.com")
        page.get_by_label("Password").fill("TestPass123!")
        page.get_by_role("button", name="Sign in").click()
        page.wait_for_url("**/dashboard")
        context.storage_state(path=str(AUTH_STATE))
        context.close()
\`\`\`

\`\`\`python
# Faster — authenticate via API, skip UI entirely
@pytest.fixture(scope="session", autouse=True)
def save_auth_state(api_client):
    if not AUTH_STATE.exists():
        token = api_client.login("testuser@example.com", "TestPass123!")
        # Write storage state manually or use browser context once
        ...
\`\`\`

A 47-test suite that logs in via UI each time adds ~15 seconds per test. Auth reuse cuts that to near zero.

## API setup instead of UI navigation

Create test preconditions via API calls, then use the UI only for what you are actually testing.

\`\`\`python
def test_admin_approves_leave_request(page, api_client, leave_page):
    # Setup via API — milliseconds
    leave = api_client.create_leave_request(
        employee_id=42, leave_type="Annual", status="pending"
    )

    # Test the UI flow — seconds, but only the part under test
    leave_page.open_pending_queue()
    leave_page.approve_request(leave["employeeName"])
    leave_page.assert_request_status(leave["id"], "Approved")
\`\`\`

Rule of thumb: if the test name does not contain "login" or "register", do not walk through login in that test.

## Parallel execution tuning

pytest-xdist runs tests across multiple workers. Playwright tests are I/O-bound, so parallelization yields near-linear speedup until you hit shared resource limits.

\`\`\`bash
pip install pytest-xdist
\`\`\`

\`\`\`bash
# Auto-detect CPU cores
pytest -n auto

# Fixed worker count
pytest -n 4

# Distribute by file — keeps module tests together
pytest -n 4 --dist loadfile
\`\`\`

\`\`\`python
# conftest.py — isolate browser per worker
@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    import os
    worker_id = os.environ.get("PYTEST_XDIST_WORKER", "gw0")
    return {
        **browser_context_args,
        "storage_state": f"test_data/.auth/{worker_id}.json",
    }
\`\`\`

Parallel pitfalls: shared test data (two workers creating the same email), shared auth state files (use per-worker paths), and database connection limits (cap workers or use isolated schemas).

## Locator optimization

Slow locators slow every interaction. Prefer Playwright's built-in locators in this order:

1. \`get_by_role()\` — fastest, most resilient
2. \`get_by_label()\` / \`get_by_placeholder()\`
3. \`get_by_test_id()\`
4. \`get_by_text()\` — use with exact match when possible
5. CSS/XPath — last resort

\`\`\`python
# Slow — scans entire DOM with CSS
page.locator("div.container > ul.list > li:nth-child(3) > a").click()

# Fast — uses accessibility tree
page.get_by_role("link", name="Leave Requests").click()
\`\`\`

\`\`\`python
# Chain locators to narrow scope
table = page.get_by_role("table", name="Pending Requests")
table.get_by_role("row", name="Jane Doe").get_by_role("button", name="Approve").click()
\`\`\`

Avoid \`page.locator("text=Approve")\` on pages with multiple "Approve" buttons — scope to a row or section first.

## Browser and context reuse

\`\`\`python
# Session-scoped browser — one browser launch for entire run
@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    return {**browser_context_args, "viewport": {"width": 1280, "height": 720}}

# Function-scoped context — fresh cookies per test (default, safest)
# Session-scoped context — faster but risks state leakage between tests
\`\`\`

Default to function-scoped contexts. Move to session-scoped only for read-only smoke tests where isolation is not required.

## Measuring and setting budgets

\`\`\`bash
# Show slowest tests
pytest --durations=10

# Fail if suite exceeds time budget (pytest-timeout)
pip install pytest-timeout
pytest --timeout=120
\`\`\`

Set CI time budgets per marker: smoke < 5 minutes, regression < 45 minutes. If a marker exceeds its budget, investigate auth reuse, API setup, and parallel worker count before adding more hardware.`,
  },
  {
    contentMarkdown: `## Checkpoint — Pro-Level Practices

Use this checkpoint to confirm you can design, scale, and maintain an enterprise Playwright framework. Answer from memory before considering the manual complete.

## Self-check questions

**Scalable Framework**
1. Name the five top-level directories in the enterprise layout and what each holds.
2. What belongs in \`utils/\` vs \`pages/\` vs \`tests/\`?
3. Why should \`Settings\` be a frozen dataclass reading from environment variables?
4. What does \`BasePage\` eliminate across feature page objects?

**Managing Suites at Scale**
5. Write the pytest command to run smoke tests excluding flaky ones.
6. What are the three most common causes of flaky Playwright tests?
7. Which pytest hook modifies the test collection before execution?
8. What file format does TestRail ingest from pytest?

**Code Review & Best Practices**
9. Why is \`time.sleep()\` an anti-pattern in Playwright tests?
10. What makes a test unsafe for parallel execution?
11. Name four items on the code review checklist.

**Performance**
12. What is the single biggest runtime win for a multi-test suite?
13. When should you set up test data via API instead of the UI?
14. What is the recommended locator priority order?
15. What does \`pytest -n auto\` do?

## Practical exercise

Given a flat project with 60 tests, login logic copy-pasted in 40 files, and a 90-minute CI runtime, list the five changes you would make in priority order.

\`\`\`
1. Extract Settings class and remove hardcoded URLs/credentials
2. Implement auth state reuse (storage_state fixture) — eliminates 40 UI logins
3. Restructure into pages/modules/, tests/modules/, utils/ layout
4. Add smoke/regression markers; run smoke on PR, regression nightly
5. Enable pytest-xdist (-n auto) with per-worker auth state files
\`\`\`

Estimate the runtime impact of each change:

| Change | Estimated savings |
|--------|------------------|
| Auth reuse | ~10–15 sec × 40 tests = 7–10 min |
| API setup for preconditions | ~5–20 sec × 30 tests = 2.5–10 min |
| Parallel (-n 4) | ~60–70% of remaining time |
| Smoke-only on PR | Runs 15 tests instead of 60 |

## Architecture diagram

\`\`\`
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   tests/    │────▶│  pages/      │────▶│  Playwright │
│  (scenarios)│     │ (page logic) │     │  (browser)  │
└──────┬──────┘     └──────────────┘     └─────────────┘
       │
       ▼
┌─────────────┐     ┌──────────────┐
│   utils/    │────▶│  config/     │
│ (API, data) │     │ (Settings)   │
└─────────────┘     └──────────────┘
\`\`\`

## Pass criteria

You have completed the Playwright manual if you can: draw the enterprise folder layout from memory, write a \`Settings\` class and \`storage_state\` auth fixture, compose a marker expression for selective CI runs, identify three anti-patterns in a code review, and explain how auth reuse plus API setup plus parallel execution compound to cut suite runtime by 70% or more. If any section above required more than one re-read, revisit that chapter — the patterns compound, and gaps here become expensive at scale.`,
  },
];
