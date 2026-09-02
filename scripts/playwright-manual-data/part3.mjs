/** Playwright manual Part 3 — Test Structure & Framework */
export const chapters = [
  {
    id: "pw-20-pytest",
    title: "20. Pytest Basics for Playwright",
    minutes: 40,
    level: "intermediate",
    phase: "Part 3 · Test Structure & Framework",
    partName: "Part 3 · Test Structure & Framework",
    overviewText: "pytest-playwright integration: test discovery, the page fixture, sync vs async API, CLI flags (--headed, --browser, --slowmo), and running tests with pytest.",
    why: "pytest is the standard Python test runner for Playwright. Fixture injection, markers, and CLI flags are daily workflow — not optional framework knowledge.",
    when: "Read at the start of Part 3 before writing multi-file suites. Revisit for CLI debugging flags.",
    practical: { app: "New Playwright pytest project", scenario: "Tests run headless but developer needs to watch login flow.", pass: "pytest --headed --slowmo=500 tests/test_login.py", fail: "Hardcode headless=False in every test file." },
    advantages: ["page fixture injected automatically by pytest-playwright", "pytest -k flag runs subset by name expression", "--browser firefox switches engine from CLI", "--tracing retain-on-failure captures debug traces", "Sync API simpler for pytest — no async boilerplate", "pytest.ini centralizes browser and timeout defaults"],
    limitations: ["Async API needs pytest-asyncio — extra setup", "Sync API blocks — no parallel coroutines in one test", "Fixture scope mistakes cause slow or leaking tests", "pytest-xdist parallel needs worker isolation awareness", "No built-in BDD — need pytest-bdd separately", "JS @playwright/test runner features not in Python binding"],
    contentMarkdown: `## 20. Pytest Basics for Playwright

This is where scripts stop being one-off files and start becoming a real test framework.
Everything in this chapter is pytest itself — Playwright plugs into it via pytest-playwright, it doesn't replace it. Up to this point, every example has been a standalone script; from here on, the manual assumes you're building an actual suite that runs many tests, shares setup, and gets executed repeatedly in CI.
A fixture is reusable setup (and optional teardown) code a test requests by naming it as a parameter.
Instead of copy-pasting login steps into every test function, you write it once as a fixture and every test that needs a logged-in user just asks for it.
\`\`\`python
import pytest

@pytest.fixture
def logged_in_page(page):
    page.goto("https://app.example.com/login")
    page.get_by_label("Username").fill("testuser")
    page.get_by_label("Password").fill("testpass")
    page.get_by_role("button", name="Log in").click()
    yield page
    # teardown (runs after the test finishes) — anything after yield
    page.get_by_role("button", name="Log out").click()

def test_dashboard_shows_welcome_message(logged_in_page):
    expect(logged_in_page.get_by_text("Welcome, testuser")).to_be_visible()

@pytest.fixture marks a function as a reusable setup/teardown block.
\`\`\`

scope (string, optional, default "function") controls how often it re-runs: "function" re-runs for every single test that uses it, "class" runs once per test class, "module" runs once per test file, and "session" runs once for the entire test run. autouse (boolean, optional, default False) makes the fixture run automatically for every applicable test without being explicitly requested when True. params (list, optional) turns the fixture into a parametrized fixture, running the test once per value in the list. Code after yield is teardown — it runs after the test completes, pass or fail, making fixtures the right place for cleanup logic (logging out, deleting test data) rather than scattering try/finally blocks through every test.
conftest.py shares fixtures across test files without any import statement.
Fixtures defined there are automatically available to every test file in the same folder (and subfolders). This is how shared setup — like a logged_in_page fixture used across dozens of test files — gets centralized in one place instead of duplicated or manually imported everywhere.
\`\`\`python
# conftest.py
import pytest

@pytest.fixture(scope="session")
def api_base_url():
    return "https://api.example.com"

@pytest.fixture(scope="function")
def clean_page(page):
    page.goto("https://app.example.com")
    yield page
\`\`\`


Fixture scope choice is a real speed/safety tradeoff, not just a config detail.
A session-scoped login fixture — log in once, reuse the saved session for every test (tying into storage_state, covered in Part 4's Authentication & Session Reuse chapter) — can save enormous amounts of time versus a function-scoped one that logs in fresh before every single test. But scope should match reality: if tests mutate shared state (one test changes a setting another test depends on being default), a broader scope than "function" can cause tests to interfere with each other in ways that are painful to debug. As a rule of thumb, default to "function" scope for anything that mutates state, and only widen the scope deliberately once you've confirmed the fixture's setup is genuinely safe to share.
conftest.py is a file location convention, not a callable.
It's a special filename pytest auto-discovers — fixtures defined here are shared across all test files in that directory and below, with no import needed. Put widely-shared fixtures (base URL, login, browser context config) here; test-file-specific fixtures can stay local to that file instead, to avoid a bloated global conftest.py.
Installing pytest-playwright gives you page, browser, and context fixtures for free.
\`\`\`python
def test_homepage_title(page):
    page.goto("https://example.com")
    expect(page).to_have_title("Example Domain")
\`\`\`


These are automatically provided fixtures giving you a ready-to-use Page/Browser/BrowserContext in any test function, without manual setup — you request them by naming them as test function parameters, e.g. def test_x(page):. page is by far the most commonly used — it comes with a fresh BrowserContext per test by default, giving you test isolation automatically (tying back to Part 1's Browser/Context/Page hierarchy).
The plugin also adds useful command-line flags.
\`\`\`python
pytest --headed              # run visibly instead of headless
pytest --browser firefox     # run against Firefox instead of default Chromium
pytest --slowmo 500          # slow down actions by 500ms, helpful for watching a test run
\`\`\`


These are especially useful while developing or debugging a test locally — you can flip to headed mode and slow motion without changing a single line of test code, then drop back to defaults (headless, full speed) before committing.`,
    customSummary: `## 20. Pytest Basics for Playwright

Fixtures are reusable setup/teardown blocks requested by parameter name — code after yield is teardown, runs regardless of pass/fail.
scope controls fixture lifetime: function (default), class, module, session; autouse=True runs it automatically without being requested.
conftest.py shares fixtures across a folder/subfolders with no import needed — put widely-shared setup there.
Session-scoped login fixtures save time but risk cross-test interference if tests mutate shared state — default to function scope for anything that mutates state.
pytest-playwright gives page/browser/context fixtures for free; page includes a fresh context per test = automatic isolation.
CLI flags: --headed, --browser firefox, --slowmo 500 — useful for local debugging, not for CI defaults.`,
    chapterNum: 20,
  },
  {
    id: "pw-21-fixtures",
    title: "21. Fixtures Deep Dive",
    minutes: 42,
    level: "intermediate",
    phase: "Part 3 · Test Structure & Framework",
    partName: "Part 3 · Test Structure & Framework",
    overviewText: "pytest fixture scopes (function, class, module, session), autouse, yield teardown, conftest.py sharing, custom browser/context fixtures, and authenticated session patterns.",
    why: "Fixtures are how Playwright tests share login state, test data, and browser configuration without copy-paste setup in every test.",
    when: "Read when duplicating login code across files or when tests leak state between runs.",
    practical: { app: "HRMS test suite with admin login", scenario: "Every test repeats 15-second login flow.", pass: "Session-scoped authenticated_page fixture with storage_state reuse.", fail: "Copy-paste login steps into all 40 test functions." },
    advantages: ["Session-scoped login saves minutes per CI run", "conftest.py auto-discovered — no imports needed", "yield fixture guarantees teardown even on failure", "storage_state persists cookies/localStorage across tests", "Custom context fixture sets viewport/locale per suite", "autouse=True for global setup like tracing"],
    limitations: ["Session-scoped browser leaks state if tests mutate shared data", "Over-scoped fixtures cause test interdependence", "conftest.py discovery rules confuse nested folder layouts", "storage_state stale after app schema changes", "Fixture dependency chains hard to debug when deep", "Module scope rare — most Playwright fixtures are function-scoped"],
    contentMarkdown: `## 21. Fixtures Deep Dive

Pytest fixtures and Playwright's own fixtures are two different layers working together.
Playwright's built-in fixtures (page, browser, context, browser_name) are themselves implemented as ordinary pytest fixtures under the hood — pytest-playwright is, mechanically, just a plugin that registers a set of fixtures into the pytest ecosystem you already know. This matters conceptually: there's no separate "Playwright fixture system" to learn on top of pytest's — everything you learn about scope, yield, autouse, and composition in plain pytest applies identically to Playwright's own fixtures, and to any custom fixture you build that depends on them (like the logged_in_page example above, which is a custom fixture built on top of Playwright's built-in page fixture).
Fixtures can request other fixtures, forming a dependency chain — this is composition.
\`\`\`python
import pytest

@pytest.fixture(scope="session")
def api_base_url():
    return "https://api.example.com"

@pytest.fixture
def authenticated_context(browser, api_base_url):
    context = browser.new_context(base_url=api_base_url)
    # perform login via API, then attach session cookie to context
    yield context
    context.close()

@pytest.fixture
def logged_in_page(authenticated_context):
    page = authenticated_context.new_page()
    yield page
\`\`\`


Here, logged_in_page depends on authenticated_context, which itself depends on browser (a Playwright built-in) and api_base_url (a custom session-scoped fixture). Pytest resolves this chain automatically — a test that requests logged_in_page transparently gets the whole chain set up in the right order, and torn down in reverse order once the test finishes. This composability is what lets a suite grow in complexity (multi-user setups, pre-seeded data, multiple browser contexts) without every test function needing to manually orchestrate all of it — each layer of setup lives in exactly one fixture, reused everywhere it's needed.
Fixture scope interacts with dependency chains in a way worth understanding precisely.
A fixture's effective scope is capped by the narrowest scope of anything it depends on — a session-scoped fixture cannot safely depend on a function-scoped one, because the function-scoped dependency would be torn down and recreated far more often than the session-scoped fixture expects to see it change. Pytest will actually raise an error if you try this (a ScopeMismatch), which is a useful guardrail: it forces you to think through whether your fixture hierarchy's lifetimes actually make sense together, rather than silently producing a fixture holding a stale/closed reference to something scoped more narrowly than itself.
autouse=True runs a fixture for every applicable test without being explicitly requested.
\`\`\`python
@pytest.fixture(autouse=True)
def set_default_timeout(page):
    page.set_default_timeout(10000)
\`\`\`


This is useful for genuinely universal setup — a default timeout override, a console-error listener that should run on every single test regardless of whether the test author remembered to ask for it. The tradeoff: autouse fixtures are invisible in a test's own signature, so overusing them makes it harder to read a test function and know everything that's happening around it just by looking at its parameters. Reserve autouse for setup that genuinely applies to every test in scope, not as a shortcut to avoid naming a fixture explicitly.
Fixture teardown order is the reverse of setup order, and this matters for correctness.
If fixture B depends on fixture A, A is set up first and B second — but on teardown, B tears down first and A second. This mirrors resource-management logic you'd expect from nested context managers: you don't want to close a browser context (A) while a page object (B) that lives inside it hasn't been cleaned up yet. This ordering is automatic and you don't need to manage it manually, but understanding it explains why teardown code should reference only what its own fixture set up, not assume anything about a fixture that depends on it.
Parametrized fixtures run every dependent test once per parameter value.
\`\`\`python
@pytest.fixture(params=["chromium", "firefox", "webkit"])
def browser_type_name(request):
    return request.param

def test_page_loads(browser_type_name):
    # this test runs 3 times, once per browser_type_name value
    ...
\`\`\`

params (list, optional) turns the fixture into a generator of test variations — request.param (accessed via pytest's built-in request fixture) gives the current value inside the fixture body. Every test depending on this fixture runs once per value in the list, similar in effect to @pytest.mark.parametrize but scoped at the fixture level instead of the test level — useful when the same parametrization needs to apply across many different tests that all share the fixture, rather than repeating a parametrize decorator on each one individually.`,
    customSummary: `## 21. Fixtures Deep Dive

Playwright's fixtures are ordinary pytest fixtures under the hood — no separate system to learn.
Fixtures can depend on other fixtures (composition) — pytest resolves and tears down the chain automatically, in reverse order of setup.
A fixture's scope is capped by its narrowest dependency — pytest raises a ScopeMismatch error if a session-scoped fixture depends on a function-scoped one.
autouse=True fixtures run invisibly for every applicable test — reserve for truly universal setup (default timeouts, global listeners), since overuse hides what's happening in a test.
Parametrized fixtures (params=[...], read via request.param) run every dependent test once per value — useful when the same parametrization needs to apply across many tests sharing a fixture.`,
    chapterNum: 21,
  },
  {
    id: "pw-22-organization",
    title: "22. Test Organization",
    minutes: 38,
    level: "intermediate",
    phase: "Part 3 · Test Structure & Framework",
    partName: "Part 3 · Test Structure & Framework",
    overviewText: "Folder structure, naming conventions, test markers (@pytest.mark.smoke), grouping by feature/module, separating E2E from API tests, and scaling beyond a single test file.",
    why: "A 200-test suite without organization becomes unmaintainable. Structure decisions made early compound — or haunt — for years.",
    when: "Read when your tests/ folder exceeds 5 files or when CI needs smoke vs regression subsets.",
    practical: { app: "Growing HRMS test suite", scenario: "CI needs 3-minute smoke run separate from full regression.", pass: "@pytest.mark.smoke on critical paths; pytest -m smoke in CI job.", fail: "One giant test_e2e.py with 80 tests and no markers." },
    advantages: ["Feature-folder mirroring (tests/leave/, tests/payroll/) aids navigation", "Markers enable selective CI runs (-m smoke, -m 'not slow')", "Descriptive test names serve as living documentation", "Separate conftest.py per feature folder for scoped fixtures", "API tests in tests/api/ share project without browser overhead", "README in tests/ documents setup assumptions for new team members"],
    limitations: ["Over-nested folders create import path confusion", "Marker proliferation without convention becomes noise", "Shared conftest.py conflicts in deeply nested trees", "No enforced structure — pytest allows anything", "Renaming tests breaks CI job filters referencing names", "Cross-feature tests don't fit clean folder boundaries"],
    contentMarkdown: `## 22. Test Organization

Markers tag tests so you can selectively run subsets instead of the entire suite every time.
\`\`\`python
import pytest

@pytest.mark.smoke
def test_login_works():
    ...
\`\`\`

\`\`\`python
@pytest.mark.regression
def test_edge_case_special_characters_in_username():
    ...
\`\`\`

\`\`\`python
pytest -m smoke              # run only smoke-tagged tests
pytest -m "not regression"   # run everything except regression tests
\`\`\`


Custom markers need to be registered in pytest.ini (Chapter 24) or pytest will emit a warning about unknown markers.
\`\`\`python
@pytest.mark.<name> attaches a tag to a test function.
\`\`\`

<name> (any string you choose, e.g. smoke, regression, slow) must be registered in config to avoid warnings. Built-in markers also exist, like @pytest.mark.skip(reason="...") and @pytest.mark.xfail(reason="...") (expected to fail). Use a consistent, small marker vocabulary across the team (smoke, regression, critical) rather than ad-hoc one-off tags — otherwise -m filtering becomes unreliable as the vocabulary sprawls.
Parametrized tests run one function multiple times with different data.
\`\`\`python
import pytest

@pytest.mark.parametrize("username,password,expected_error", [
\`\`\`

    ("", "validpass", "Username is required"),
    ("validuser", "", "Password is required"),
    ("validuser", "wrongpass", "Invalid credentials"),
])
\`\`\`python
def test_login_validation(page, username, password, expected_error):
    page.get_by_label("Username").fill(username)
    page.get_by_label("Password").fill(password)
    page.get_by_role("button", name="Log in").click()
    expect(page.get_by_text(expected_error)).to_be_visible()
\`\`\`


This runs as three separate test cases in the report, each clearly showing which input combination passed/failed — far more maintainable than three nearly-identical copy-pasted test functions. argnames (string, comma-separated) names the parameters the test function will receive; argvalues (list of tuples) provides one tuple of values per test run, with tuple order matching argnames order. Each parameter set shows up as a distinct test in reports (e.g., test_login_validation[validuser-wrongpass-Invalid credentials]), making failures easy to pinpoint to a specific data combination.
Folder structure gives a second, independent way to organize and slice tests.
tests/
├── smoke/
│   └── test_critical_paths.py
├── regression/
│   └── test_edge_cases.py
└── modules/
    ├── test_leave_management.py
    └── test_attendance.py

Combined with markers, this gives two independent ways to slice the suite — by folder (pytest tests/smoke/) or by tag (pytest -m smoke) — useful since a "smoke" test might live logically inside a feature folder but still need to run as part of a fast pre-deploy check.
@smoke/@regression-style tagging is the practical foundation of selective execution in CI.
In real pipelines, you rarely run the entire suite on every single commit — a common pattern is running @smoke-tagged tests on every push (fast feedback, a few minutes), and reserving the full @regression suite for a nightly run or pre-release gate (slower, more thorough). This is why marker discipline (naming things consistently, registering them properly) matters beyond just local convenience — it becomes the actual mechanism controlling what runs when in CI/CD (tying forward into Part 5's CI/CD Integration chapter).
--grep/--grep-invert-style selective execution filters by test name pattern rather than by marker.
Playwright's JS/TS test runner has native --grep/--grep-invert flags that filter tests by matching (or excluding) a pattern against the test's title string. Python's pytest-playwright doesn't have an identically-named flag, but pytest's own -k flag provides equivalent behavior:
\`\`\`python
pytest -k "login"              # run only tests with "login" in their name
pytest -k "not slow"           # exclude tests with "slow" in their name
pytest -k "login and not slow" # combine conditions
\`\`\`


-k (string expression) matches against test function names and can combine conditions with and/or/not. The practical difference from markers: -k requires no upfront tagging/registration — it works off whatever your test names already are — which makes it convenient for a one-off local run ("just run the tests related to leave requests right now"), whereas markers are the more deliberate, intentional mechanism for stable, repeatable CI filtering. Use -k for ad-hoc local filtering and markers for anything that needs to be reliably referenced in a pipeline config.`,
    customSummary: `## 22. Test Organization

@pytest.mark.<name> tags tests for selective running (pytest -m smoke, pytest -m "not regression") — must be registered in pytest.ini or triggers warnings.
@pytest.mark.parametrize(argnames, argvalues) runs one test function multiple times with different data — each combination shows as a distinct result in reports.
Folder structure (e.g. smoke/, regression/, modules/) gives a second, independent way to slice the suite alongside markers.
Marker discipline (small, consistent vocabulary) is what makes CI selective-execution reliable — e.g. running @smoke on every push, full @regression nightly.
Pytest's -k "expression" filters by test name pattern (supports and/or/not) — good for ad-hoc local runs; markers are better for stable CI-referenced filtering.`,
    chapterNum: 22,
  },
  {
    id: "pw-23-pom",
    title: "23. Page Object Model (POM)",
    minutes: 40,
    level: "intermediate",
    phase: "Part 3 · Test Structure & Framework",
    partName: "Part 3 · Test Structure & Framework",
    overviewText: "Page Object Model pattern: page classes encapsulating locators and actions, BasePage shared utilities, composition over inheritance, and keeping tests readable as user-journey scripts.",
    why: "POM is the standard interview answer for 'how do you maintain a large test suite?' Locator changes touch one class, not 50 tests.",
    when: "Read when the same page interactions appear in 3+ tests or when onboarding teammates to the suite.",
    practical: { app: "HRMS login used by 30 tests", scenario: "Login button renamed from 'Sign In' to 'Log In' — 30 tests break.", pass: "LoginPage.login() method updated once; all tests pass.", fail: "Find-and-replace get_by_role('button', name='Sign In') across 30 files." },
    advantages: ["Locator change isolated to one Page class", "Tests read as user journeys — high-level intent clear", "BasePage shares wait helpers and navigation utilities", "Composition (LoginPage used by DashboardPage) over deep inheritance", "Page classes testable independently of pytest fixtures", "Interview-standard pattern recognized across the industry"],
    limitations: ["Over-abstraction creates indirection — hard to debug", "POM classes can become god-objects with every method", "Inheritance hierarchies brittle when pages share little", "Not Playwright-specific — adds boilerplate for small suites", "Async page methods need consistent await/sync choice", "Page objects don't replace good locator strategy — garbage in, garbage out"],
    contentMarkdown: `## 23. Page Object Model (POM)

POM centralizes each page's locators and actions into a dedicated class.
Without POM, locators get written directly inside test functions — meaning if the UI changes (a button's text, an ID), you have to hunt down and fix every test that touches that element. POM solves this by centralizing each page's locators and actions into one class, so a UI change means fixing one class, not dozens of tests.
project/
├── pages/
│   ├── base_page.py
│   ├── login_page.py
│   └── dashboard_page.py
├── tests/
│   ├── test_login.py
│   └── test_dashboard.py
└── conftest.py

A BasePage class holds behavior common to every page.
\`\`\`python
# pages/base_page.py
class BasePage:
    def __init__(self, page):
        self.page = page

    def navigate(self, path):
        self.page.goto(f"https://app.example.com{path}")

    def wait_for_load(self):
        self.page.wait_for_load_state("networkidle")
\`\`\`


BasePage.__init__(self, page) stores a reference to the Playwright page object so every method in the class (and its subclasses) can use it. page (Page object, required) is typically passed in from the page pytest fixture. Every page class should inherit from this and call super().__init__(page) to get this shared setup for free — navigation helpers, generic wait logic, anything that would otherwise be duplicated across every single page class.
Individual page classes hold their own locators and user-facing methods.
\`\`\`python
# pages/login_page.py
from pages.base_page import BasePage

class LoginPage(BasePage):
    def __init__(self, page):
\`\`\`

        super().__init__(page)
\`\`\`python
        self.username_input = page.get_by_label("Username")
        self.password_input = page.get_by_label("Password")
        self.login_button = page.get_by_role("button", name="Log in")

    def login(self, username, password):
        self.navigate("/login")
        self.username_input.fill(username)
        self.password_input.fill(password)
        self.login_button.click()

# tests/test_login.py
from pages.login_page import LoginPage

def test_successful_login(page):
\`\`\`

    login_page = LoginPage(page)
\`\`\`python
    login_page.login("testuser", "testpass")
    expect(page.get_by_text("Welcome, testuser")).to_be_visible()
\`\`\`


LoginPage.login(self, username, password) encapsulates the full "log in" user flow as one method call, hiding the individual locator/action steps from the test itself. username and password (both strings, required) are the only things the test needs to supply. The test file itself should read almost like plain English (login_page.login(...)) — if a test file is full of raw locators and .fill()/.click() calls, that's a signal POM isn't being followed consistently, and locator maintenance will end up scattered across test files instead of contained in the page classes where it belongs.`,
    customSummary: `## 23. Page Object Model (POM)

POM centralizes each page's locators/actions into a dedicated class — a UI change means fixing one class, not every test that touches it.
BasePage holds shared behavior (navigation, generic waits); every page class inherits from it via super().__init__(page).
Page classes hold locators as attributes and expose plain-English methods (e.g. login_page.login(username, password)).
A test file full of raw locators/.fill()/.click() calls signals POM isn't being followed — the test should read like plain English instead.`,
    chapterNum: 23,
  },
  {
    id: "pw-24-config",
    title: "24. Configuration Management",
    minutes: 38,
    level: "intermediate",
    phase: "Part 3 · Test Structure & Framework",
    partName: "Part 3 · Test Structure & Framework",
    overviewText: "playwright.config / pytest.ini settings, environment variables, baseURL, timeout defaults, screenshot/video/trace on failure, multi-environment configs (dev/staging/prod), and .env patterns.",
    why: "Hardcoded URLs and timeouts in test files break the moment you run against staging. Central config is the difference between portable and fragile suites.",
    when: "Read when pointing tests at staging, tuning CI timeouts, or enabling trace-on-failure.",
    practical: { app: "HRMS tested against dev and staging", scenario: "Developer runs tests locally against localhost; CI runs against staging URL.", pass: "BASE_URL env var in pytest.ini; page.goto('/login') uses baseURL.", fail: "Hardcode https://staging.hrm.example.com in every test file." },
    advantages: ["baseURL in config — relative paths in tests", "Environment variables switch targets without code changes", "Global timeout prevents hung tests eating CI minutes", "trace=retain-on-failure auto-captures debug artifacts", "pytest.ini co-locates Playwright and pytest settings", "Per-project config for multi-app monorepos"],
    limitations: ["Config spread across pytest.ini, conftest.py, and .env confuses newcomers", "Wrong BASE_URL causes silent tests against wrong environment", "Global timeout too short for slow staging; too long wastes CI", "Secrets in .env need .gitignore discipline", "Playwright Python config less documented than JS playwright.config.ts", "Multi-browser matrix multiplies CI time linearly"],
    contentMarkdown: `## 24. Configuration Management

pytest.ini and conftest.py together fill the role of a config file.
Since Python Playwright has no built-in config file (unlike the JS test runner's playwright.config.ts), pytest.ini fills that role for pytest-level settings, and conftest.py handles anything needing actual code (like environment-based fixture values).
\`\`\`python
# pytest.ini
[pytest]
markers =
\`\`\`

    smoke: quick critical-path tests
    regression: full regression suite
\`\`\`python
addopts = --headed --browser chromium
\`\`\`


The [pytest] section is the central place for pytest-level settings: registered markers, default command-line options, test discovery rules. markers is a list of name: description pairs, required to avoid "unknown marker" warnings. addopts is a string of default CLI flags applied to every pytest run automatically. Registering markers here is what keeps @pytest.mark.smoke from producing warnings, and documents what each marker means for the rest of the team.
Environment variables let a suite run against different URLs without code changes.
\`\`\`python
# conftest.py
import os
import pytest

@pytest.fixture(scope="session")
def base_url():
    return os.environ.get("BASE_URL", "https://staging.example.com")
\`\`\`


BASE_URL=https://prod.example.com pytest

os.environ.get(key, default) reads an environment variable, falling back to a default if it isn't set. key (string, required) is the environment variable name, and default (any, optional) is the value returned if the variable isn't set. This is the standard pattern for making a test suite environment-aware without hardcoding URLs, so the exact same test code runs against dev, staging, or prod depending on how it's invoked.
A config dictionary keyed by environment name manages multiple environments cleanly.
\`\`\`python
# conftest.py
\`\`\`

ENVIRONMENTS = {
    "dev": "https://dev.example.com",
    "staging": "https://staging.example.com",
    "prod": "https://app.example.com",
}

\`\`\`python
@pytest.fixture(scope="session")
def base_url():
\`\`\`

    env = os.environ.get("TEST_ENV", "staging")
\`\`\`python
    return ENVIRONMENTS[env]
\`\`\`


TEST_ENV=prod pytest    # careful — running full suites against prod is usually restricted to read-only smoke tests

Running write-heavy tests (creating/deleting data) against production is a common real-world mistake — most teams restrict prod runs to smoke-tagged, non-destructive tests only, enforced by combining TEST_ENV with markers from Chapter 22.
.env files keep environment-specific values out of version control and out of shell commands.
Rather than passing environment variables inline on every command (BASE_URL=... TEST_ENV=... pytest), most real projects use a .env file per environment (.env.dev, .env.staging, .env.prod) loaded via a package like python-dotenv:
\`\`\`python
# conftest.py
from dotenv import load_dotenv
import os
\`\`\`


load_dotenv(f".env.{os.environ.get('TEST_ENV', 'staging')}")

\`\`\`python
@pytest.fixture(scope="session")
def base_url():
    return os.environ["BASE_URL"]

# .env.staging
\`\`\`

BASE_URL=https://staging.example.com
API_KEY=stg_xxx123

This keeps secrets and per-environment values (API keys, base URLs, feature-flag toggles) out of the codebase itself — .env files are added to .gitignore and never committed, so credentials don't end up in source control history. It also means switching environments is a one-flag change (TEST_ENV=prod) rather than remembering and retyping a whole set of variables by hand every time.
Global Setup and Teardown hooks run once for the entire test session, not per-test.
Pytest supports this via session-scoped fixtures combined with autouse=True, which is the Python-side equivalent of what the JS test runner calls globalSetup/globalTeardown in its config file:
\`\`\`python
# conftest.py
import pytest

@pytest.fixture(scope="session", autouse=True)
def global_setup_teardown():
    print("Running global setup — e.g., seeding a test database, warming a cache")
    # setup code here
\`\`\`

    yield
\`\`\`python
    print("Running global teardown — e.g., tearing down shared test infrastructure")
    # teardown code here
\`\`\`


This is the right place for expensive, one-time setup that every test in the run depends on but that would be wasteful to repeat per-test — seeding a shared test database with baseline reference data, starting a mock server, or authenticating a service account once for the whole run. The autouse=True + session scope combination guarantees it runs exactly once, automatically, without any test needing to explicitly request it.`,
    customSummary: `## 24. Configuration Management

pytest.ini's [pytest] section holds registered markers and addopts (default CLI flags) — the closest Python equivalent to playwright.config.ts.
os.environ.get(key, default) reads env vars for base URLs, keeping test code environment-agnostic.
A config dictionary keyed by environment name (dev/staging/prod) plus a TEST_ENV variable manages multi-environment runs — restrict prod runs to non-destructive smoke tests only.
.env files (loaded via python-dotenv, git-ignored) keep secrets/URLs out of source control and out of manual shell commands.
Global Setup/Teardown = a session-scoped, autouse=True fixture with yield — Python's equivalent of JS's globalSetup/globalTeardown, for one-time expensive setup (seeding a DB, starting a mock server).`,
    chapterNum: 24,
  },
  {
    id: "pw-25-test-data",
    title: "25. Test Data Management",
    minutes: 40,
    level: "intermediate",
    phase: "Part 3 · Test Structure & Framework",
    partName: "Part 3 · Test Structure & Framework",
    overviewText: "Test data strategies: JSON/CSV fixtures, factory functions, Faker for dynamic data, API seeding before UI tests, data-driven tests with @pytest.mark.parametrize, and cleanup patterns.",
    why: "Tests that depend on specific database rows break when data changes. Managing test data is as important as managing locators.",
    when: "Read when tests fail because 'user john@example.com already exists' or when parametrize would eliminate duplicate test bodies.",
    practical: { app: "HRMS employee creation tests", scenario: "Test creates employee with fixed email — fails on second run.", pass: "Faker-generated unique email per run; API teardown deletes record after.", fail: "Hardcode test@example.com and manually delete from DB between runs." },
    advantages: ["JSON fixtures version-controlled alongside tests", "Faker generates unique emails/names — no collision", "API seeding faster than UI setup for test prerequisites", "@pytest.mark.parametrize eliminates copy-paste test bodies", "Factory functions compose complex objects from defaults", "storage_state fixture reuses auth without re-login"],
    limitations: ["Faker data not reproducible without seed — harder to debug", "API seeding requires backend endpoints or direct DB access", "Fixture files drift from current app schema", "Parametrize explosion — 50 combinations from 5 params", "Cleanup missed on failure leaves dirty database", "Shared test data causes order-dependent failures in parallel runs"],
    contentMarkdown: `## 25. Test Data Management

Static fixtures (JSON/CSV/YAML) store predictable, reusable test data outside the test code itself.
// test_data/users.json
{
  "valid_user": {"username": "testuser", "password": "testpass"},
  "invalid_user": {"username": "baduser", "password": "wrongpass"}
}

\`\`\`python
import json

@pytest.fixture
def user_data():
    with open("test_data/users.json") as f:
        return json.load(f)

def test_login(page, user_data):
\`\`\`

    creds = user_data["valid_user"]
\`\`\`python
    login_page.login(creds["username"], creds["password"])
\`\`\`


json.load(file_object) parses a JSON file into a Python dictionary/list; file_object (an open file handle, required) must be opened in read mode first. Keep test data files separate from test logic — this lets non-engineers (or future you) update test data without touching test code, and keeps large data sets from cluttering test files.
faker generates realistic, unique data on the fly.
\`\`\`python
from faker import Faker
\`\`\`


fake = Faker()

\`\`\`python
@pytest.fixture
def random_user():
    return {
\`\`\`

        "email": fake.email(),
        "name": fake.name(),
        "phone": fake.phone_number(),
    }

\`\`\`python
def test_signup(page, random_user):
    page.get_by_label("Email").fill(random_user["email"])
    page.get_by_label("Name").fill(random_user["name"])
\`\`\`


For tests needing unique data every run — signup flows that reject duplicate emails, for example — generate realistic fake data on the fly instead of relying on static fixtures. Faker(locale) (optional locale string, e.g. "en_US", "ne_NP" if available) localizes generated data. Generator methods like .email(), .name(), .phone_number() take no required parameters and return a string appropriate to their name. Each call returns a new random value — call it once and store the result in a variable if you need the same value used consistently across multiple steps in a test.
Data cleanup strategies prevent test-created data from accumulating and breaking unrelated tests.
\`\`\`python
@pytest.fixture
def created_user(page, random_user):
    # setup: create the user via UI or API
\`\`\`

    api_create_user(random_user)
\`\`\`python
    yield random_user
    # teardown: clean up after the test, regardless of pass/fail
\`\`\`

    api_delete_user(random_user["email"])

Tests that create data (a new user, a new leave request) need a plan for removing it afterward, or repeated test runs accumulate junk that can eventually cause unrelated failures — e.g., a "list should show exactly 3 items" test failing because 200 leftover test users are also in the list. Cleanup via API (fast, direct) is generally preferable to cleanup via UI (slow, another thing that can flake). Using a fixture's yield pattern guarantees cleanup runs even if the test itself fails partway through, which a cleanup step placed only at the end of a test function would not guarantee.
Secrets and credentials need handling distinct from ordinary test data.
Test data like a fake user's name or email is safe to commit to version control — but credentials (API keys, service account passwords, database connection strings, test-account passwords for real staging environments) are not, even in a "test" context, since a leaked staging credential can still be a real security exposure. The standard approach layers on top of the .env pattern from Chapter 24: secrets live in environment variables or a dedicated secrets manager (not hardcoded in test files, not committed in a test_data/ JSON file), and CI pipelines inject them at runtime from the CI platform's own secrets store (GitHub Actions secrets, Azure DevOps variable groups, etc. — covered concretely in Part 5's CI/CD Integration chapter).
\`\`\`python
# conftest.py
import os

@pytest.fixture(scope="session")
def admin_credentials():
    return {
\`\`\`

        "username": os.environ["ADMIN_USERNAME"],
        "password": os.environ["ADMIN_PASSWORD"],  # never hardcoded, never committed
    }

Note the use of os.environ["ADMIN_PASSWORD"] (bracket access, which raises a clear error if missing) rather than .get() with a default here — for credentials specifically, failing loudly if a secret isn't configured is usually preferable to silently falling back to some placeholder value that would produce a confusing downstream failure instead.
Teardown and rollback strategies for API-seeded data need to handle partial failure gracefully.
The yield-based cleanup pattern above works cleanly for the common case, but real suites often need to go a step further: what happens if the setup step itself partially succeeds before failing (e.g., a test creates three related records via API, and the second one fails)? A robust pattern tracks everything created so far and rolls all of it back, not just the last successful step:
\`\`\`python
@pytest.fixture
def seeded_leave_request(api_client, random_user):
\`\`\`

    created_ids = []
### try

        user_id = api_client.create_user(random_user)
        created_ids.append(("user", user_id))
        leave_id = api_client.create_leave_request(user_id, days=3)
        created_ids.append(("leave_request", leave_id))
\`\`\`python
        yield {"user_id": user_id, "leave_id": leave_id}
\`\`\`

### finally

\`\`\`python
        # roll back everything created, in reverse order, regardless of how far setup got
        for kind, obj_id in reversed(created_ids):
\`\`\`

            api_client.delete(kind, obj_id)

Wrapping setup in try/finally (with created_ids tracked incrementally) ensures that even a failure halfway through setup still cleans up whatever was successfully created before the failure — a bare yield-after-everything pattern would skip cleanup entirely if setup itself raised an exception before reaching the yield. Rolling back in reverse creation order also matters when records have dependencies (deleting a user before deleting their leave request might fail due to a foreign-key constraint on the backend) — cleaning up in the exact reverse order they were created mirrors how the dependencies were built up in the first place, and is the safest general default.`,
    customSummary: `## 25. Test Data Management

Static fixtures (JSON/CSV/YAML) store predictable test data outside test code — easy to update without touching logic.
faker generates unique realistic data per run (emails, names) — call once and store the value if reused across steps in the same test.
Cleanup via API (fast) is preferred over UI (slow, flaky); yield-based fixture teardown guarantees cleanup runs even if the test fails.
Secrets/credentials are handled differently from ordinary test data — sourced from env vars or a secrets manager, never hardcoded or committed; use os.environ["KEY"] (not .get()) so missing secrets fail loudly.
Robust rollback for multi-step API-seeded data: track each created resource as you go, wrap setup in try/finally, and delete everything in reverse creation order — protects against partial-setup failures and dependency/foreign-key issues on cleanup.`,
    chapterNum: 25,
  },
];
