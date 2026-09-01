import type { ChapterRecord } from "../../../types";

/** 12. Pytest Basics for Playwright */
export const chapter = {
  "id": "pw-3-pytest",
  "title": "12. Pytest Basics for Playwright",
  "minutes": 50,
  "level": "intermediate",
  "phase": "Part 3 · Test Structure & Framework",
  "partName": "Part 3 · Test Structure & Framework",
  "overviewText": "Pytest is the test runner and framework layer beneath Playwright Python tests — not a replacement for Playwright, but the structure that turns one-off browser scripts into a maintainable suite. Fixtures provide reusable setup and teardown (login flows, clean pages, base URLs) that tests request by parameter name instead of copy-pasting boilerplate. conftest.py is a special file pytest auto-discovers: fixtures defined there are available to every test in that folder tree without imports. The pytest-playwright plugin adds built-in page, browser, and context fixtures so every test function can declare def test_something(page): and get an isolated browser page ready to use. Understanding pytest's fixture scopes (function, class, module, session) is critical for balancing test isolation against suite speed — a session-scoped login that saves storage_state can eliminate hundreds of redundant UI logins across a large run.",
  "why": "Without pytest structure, Playwright scripts become fragile one-off files: login steps duplicated in every test, no shared teardown when a test fails mid-flow, and no way to run subsets of the suite. When a test breaks at 2 AM in CI, pytest's fixture teardown (code after yield) still runs cleanup even on failure — preventing orphaned test users and polluted databases. Fixtures also encode team conventions once (how to log in, which base URL to use) instead of every author reinventing them.",
  "when": "Adopt pytest fixtures and conftest.py as soon as you have more than two or three Playwright tests, or any test that needs shared setup like authentication. Use function-scoped fixtures by default for isolation; reach for session-scoped fixtures only when setup is expensive and tests do not mutate shared server state. Install pytest-playwright at project start — its page fixture is the standard entry point for every browser test.",
  "practical": {
    "app": "HRMS — Dashboard smoke tests",
    "scenario": "A team has twelve Playwright tests that each repeat a 15-second UI login before checking a dashboard widget. Refactoring login into a logged_in_page fixture in conftest.py cuts per-test setup from 15 seconds to zero (when combined with storage_state from Chapter 20), and a broken logout button now requires fixing one fixture instead of twelve tests.",
    "pass": "def test_leave_balance_shows(logged_in_page): expect(logged_in_page.get_by_text('Annual leave')).to_be_visible() — test reads intent, no raw locators for login.",
    "fail": "Each test inlines page.goto('/login') and .fill() calls; when the login form adds a CAPTCHA, all twelve tests break independently and cleanup never runs after mid-test failures."
  },
  "advantages": [
    "Fixtures eliminate duplicated setup code — write login once, reuse everywhere by parameter name",
    "yield-based teardown runs after pass or fail, guaranteeing cleanup without try/finally in every test",
    "conftest.py shares fixtures across an entire test tree with zero import boilerplate",
    "pytest-playwright's page fixture provides automatic per-test BrowserContext isolation",
    "CLI flags (--headed, --browser firefox, --slowmo) integrate without custom wrapper scripts"
  ],
  "limitations": [
    "Fixture scope mistakes cause subtle cross-test interference — session-scoped state shared by tests that mutate data is a common footgun",
    "Over-nesting fixtures (fixture A depends on B depends on C) makes failure traces harder to read",
    "pytest itself does not run browsers — you still need pytest-playwright installed and configured",
    "conftest.py can become a dumping ground if every one-off fixture lands there instead of staying local"
  ],
  "tools": [
    {
      "name": "PyTest",
      "sub": "Python test framework",
      "url": "https://pytest.org",
      "desc": "PyTest is the test runner and assertion framework for Python Playwright projects. Tests are plain functions prefixed with test_; fixtures are functions decorated with @pytest.fixture that tests request as parameters. The yield pattern splits setup (before yield) from teardown (after yield), so cleanup runs even when a test fails. conftest.py is a filename convention — pytest loads fixtures from it automatically for the directory and all subdirectories. Fixture scope controls lifetime: function (default, fresh per test), class, module, or session (once per entire test run).",
      "adv": [
        "Zero class boilerplate — a plain function is a valid test",
        "Fixture dependency injection by parameter name keeps tests readable",
        "Rich plugin ecosystem including pytest-playwright, pytest-xdist, pytest-html",
        "Clear failure output with full assertion diffs"
      ],
      "lim": [
        "Fixture scoping requires deliberate design — wrong scope causes flaky or slow suites",
        "Python-only — not usable outside the Python Playwright binding",
        "Large conftest.py files become hard to navigate without discipline",
        "Async tests need pytest-asyncio on top for async Playwright patterns"
      ],
      "steps": [
        {
          "t": "Step 1 — Install pytest and pytest-playwright",
          "p": "Add both packages to your project:",
          "c": "pip install pytest pytest-playwright\nplaywright install"
        },
        {
          "t": "Step 2 — Create a reusable login fixture",
          "p": "In conftest.py, define a fixture with setup and teardown:",
          "c": "import pytest\nfrom playwright.sync_api import expect\n\n@pytest.fixture\ndef logged_in_page(page):\n    page.goto(\"https://app.example.com/login\")\n    page.get_by_label(\"Username\").fill(\"testuser\")\n    page.get_by_label(\"Password\").fill(\"testpass\")\n    page.get_by_role(\"button\", name=\"Log in\").click()\n    expect(page.get_by_text(\"Welcome, testuser\")).to_be_visible()\n    yield page\n    page.get_by_role(\"button\", name=\"Log out\").click()"
        },
        {
          "t": "Step 3 — Request the fixture in a test",
          "p": "Name the fixture as a parameter — pytest injects it automatically:",
          "c": "def test_dashboard_shows_welcome(logged_in_page):\n    logged_in_page.goto(\"https://app.example.com/dashboard\")\n    expect(logged_in_page.get_by_role(\"heading\", name=\"Dashboard\")).to_be_visible()"
        },
        {
          "t": "Step 4 — Use the built-in page fixture",
          "p": "pytest-playwright provides page with no setup code required:",
          "c": "def test_homepage_title(page):\n    page.goto(\"https://example.com\")\n    expect(page).to_have_title(\"Example Domain\")"
        },
        {
          "t": "Step 5 — Run with useful CLI flags",
          "p": "Control browser visibility and engine from the command line:",
          "c": "pytest --headed              # watch the browser\npytest --browser firefox     # run against Firefox\npytest --slowmo 500          # slow actions by 500ms for debugging"
        }
      ]
    },
    {
      "name": "pytest-playwright",
      "sub": "Playwright pytest plugin",
      "url": "https://playwright.dev/python/docs/test-runners",
      "desc": "pytest-playwright is the official plugin that wires Playwright's browser lifecycle into pytest's fixture system. It automatically provides page, context, and browser fixtures — each test gets a fresh BrowserContext by default for isolation. The plugin adds CLI options for headed mode, browser selection (chromium, firefox, webkit), and slow-motion debugging. It also exposes a request fixture for API calls without opening a browser page, bridging UI and API testing in one framework.",
      "adv": [
        "page fixture ready in every test with zero manual browser launch code",
        "Fresh BrowserContext per test gives isolation by default",
        "CLI flags for browser engine and headed mode need no config file changes",
        "request fixture enables API setup alongside UI tests in the same file"
      ],
      "lim": [
        "Browser/context lifecycle is managed by the plugin — custom multi-context scenarios need explicit fixtures",
        "Default function scope for page means full browser startup per test unless you optimize with storage_state",
        "Plugin version must stay aligned with playwright Python package version",
        "Some advanced Playwright features (tracing, HAR) require manual fixture extensions"
      ],
      "steps": [
        {
          "t": "Step 1 — Verify plugin is active",
          "p": "Run pytest with --browser flag to confirm plugin loaded:",
          "c": "pytest --help | grep browser\n# Should list --browser, --headed, --slowmo options"
        },
        {
          "t": "Step 2 — Write a minimal test using page",
          "p": "The page fixture is injected automatically:",
          "c": "from playwright.sync_api import expect\n\ndef test_example_domain(page):\n    page.goto(\"https://example.com\")\n    expect(page.get_by_role(\"heading\")).to_be_visible()"
        },
        {
          "t": "Step 3 — Override browser in CI",
          "p": "Run the same suite against multiple engines:",
          "c": "pytest --browser chromium\npytest --browser firefox\npytest --browser webkit"
        }
      ]
    }
  ],
  "contentMarkdown": "## Pytest as the Test Runner\n\nPlaywright Python tests are plain pytest tests. You write functions named `test_*`, use `assert` or Playwright's `expect()`, and run them with `pytest`. The **pytest-playwright** plugin wires browser lifecycle into pytest's fixture system so you never manually launch Chromium in every file.\n\nInstall both packages:\n\n```bash\npip install pytest pytest-playwright\nplaywright install\n```\n\nA minimal test requests the `page` fixture injected by pytest-playwright:\n\n```python\nfrom playwright.sync_api import Page, expect\n\ndef test_homepage_title(page: Page):\n    page.goto(\"https://example.com\")\n    expect(page).to_have_title(\"Example Domain\")\n```\n\n## Built-in Fixtures: page, browser, context\n\npytest-playwright provides three core fixtures:\n\n| Fixture | Scope | What you get |\n|---------|-------|--------------|\n| `page` | function | A fresh `Page` in an isolated `BrowserContext` |\n| `context` | function | A `BrowserContext` (cookies, storage, permissions) |\n| `browser` | session | The shared `Browser` instance for the run |\n\nMost tests only need `page`. Reach for `context` when you need to set permissions, geolocation, or locale before creating pages. Use `browser` when you need multiple contexts in one test (e.g., two users chatting).\n\n```python\ndef test_two_tabs(context):\n    page_a = context.new_page()\n    page_b = context.new_page()\n    page_a.goto(\"https://example.com\")\n    page_b.goto(\"https://playwright.dev\")\n```\n\n## Writing Your Own Fixtures\n\nFixtures replace copy-pasted setup. Define a function decorated with `@pytest.fixture`, use `yield` to hand the resource to the test, and put cleanup after `yield`:\n\n```python\nimport pytest\nfrom playwright.sync_api import Page\n\n@pytest.fixture\ndef logged_in_page(page: Page) -> Page:\n    page.goto(\"/login\")\n    page.get_by_label(\"Email\").fill(\"qa@example.com\")\n    page.get_by_label(\"Password\").fill(\"secret\")\n    page.get_by_role(\"button\", name=\"Sign in\").click()\n    page.wait_for_url(\"**/dashboard\")\n    yield page\n    # teardown runs even if the test fails\n    page.goto(\"/logout\")\n\ndef test_dashboard_widget(logged_in_page):\n    expect(logged_in_page.get_by_text(\"Leave balance\")).to_be_visible()\n```\n\nTests declare fixtures as **parameters** — pytest resolves the dependency graph automatically.\n\n## conftest.py — Shared Fixtures Without Imports\n\nPlace a `conftest.py` file in any test directory. Fixtures defined there are auto-discovered for that folder and all subfolders. No import statement needed.\n\n```\ntests/\n  conftest.py          # project-wide fixtures\n  e2e/\n    conftest.py        # e2e-only fixtures (e.g., BASE_URL)\n    test_login.py\n    test_dashboard.py\n```\n\n```python\n# tests/conftest.py\nimport os\nimport pytest\n\n@pytest.fixture(scope=\"session\")\ndef base_url():\n    return os.environ.get(\"BASE_URL\", \"http://localhost:3000\")\n```\n\n```python\n# tests/e2e/test_dashboard.py\ndef test_loads(base_url, page):\n    page.goto(f\"{base_url}/dashboard\")\n```\n\n## Fixture Scopes\n\nScope controls how often a fixture is created:\n\n| Scope | Created | Use when |\n|-------|---------|----------|\n| `function` | Once per test (default) | Page state must be isolated |\n| `class` | Once per test class | Shared setup within a class |\n| `module` | Once per file | Expensive read-only setup |\n| `session` | Once per pytest run | Browser launch, auth token |\n\n**Default to `function` scope.** Session-scoped fixtures that mutate shared data cause cross-test pollution — a classic source of flaky suites.\n\n```python\n@pytest.fixture(scope=\"session\")\ndef browser_context_args(browser_context_args):\n    return {**browser_context_args, \"viewport\": {\"width\": 1280, \"height\": 720}}\n```\n\nThe `browser_context_args` hook fixture lets you customize every context's defaults project-wide.\n\n## CLI Flags\n\npytest-playwright adds browser flags you pass through pytest:\n\n```bash\npytest --headed                  # show the browser window\npytest --browser firefox         # run in Firefox instead of Chromium\npytest --browser webkit          # run in WebKit (Safari engine)\npytest --slowmo 500              # 500 ms delay between actions\npytest --tracing on              # record trace for every test\npytest --screenshot only-on-failure\npytest --video retain-on-failure\npytest tests/e2e/test_login.py -k \"valid\"   # keyword filter\npytest -m smoke                  # run only @pytest.mark.smoke tests\n```\n\nCombine flags freely. In CI, headless + tracing on failure is the standard starting point.\n\n## Async vs Sync API\n\npytest-playwright supports both sync and async fixtures. The sync API (`playwright.sync_api`) is simpler for most teams. If your app is async-native (FastAPI background tasks, asyncio event loops), use the async plugin variant with `async def test_...` and `await page.goto(...)`.\n\n## Key Takeaways\n\n- Install `pytest-playwright`; request `page` in every test signature.\n- Put shared fixtures in `conftest.py`; keep scope at `function` unless you have a measured reason not to.\n- Use `yield` fixtures for guaranteed teardown.\n- Pass `--headed`, `--browser`, and `--slowmo` from the CLI — no wrapper scripts needed.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
