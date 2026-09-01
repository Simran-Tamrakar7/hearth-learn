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
  "contentMarkdown": "This is where scripts stop being one-off files and start becoming a real test framework. Everything in this chapter is pytest itself — Playwright plugs into it via pytest-playwright, it doesn't replace it.\n\n## Overview\n\nThis is where scripts stop being one-off files and start becoming a real test framework. Everything in this chapter is pytest itself — Playwright plugs into it via\n\nFixtures A fixture is a reusable block of setup (and optional teardown) code that a test can request just by naming it as a parameter. Instead of copy-pasting login steps into every test function, you write it once as a fixture and every test that needs a logged-in user just asks for it. python\n\n```\nimport pytest\n\n@pytest.fixture\n\ndef logged_in_page(page):\n\npytest-playwright, it doesn't replace it.\n```\n\n## page.goto(\"https://app.example.com/login\")\n\n# teardown (runs after the test finishes) — anything after yield\n\ntestuser\")).to_be_visible()\n\nWhat it does: Marks a function as a reusable setup/teardown block that tests can request by parameter name. Types/params:\n\nPointers: Code after yield is teardown — it runs after the test completes (pass or fail), making fixtures the right place for cleanup logic (logging out, deleting test data) rather than scattering try/finally blocks through every test. conftest.py and fixture scope conftest.py is a special pytest file — fixtures defined there are automatically available to every test file in the same folder (and subfolders) without any import statement. This is how shared setup (like a logged_in_page fixture used across dozens of test files) gets centralized in one place instead of duplicated or manually imported everywhere. python\n\n```\n# conftest.py\n\nimport pytest\n\n@pytest.fixture(scope=\"session\")\n\ndef api_base_url():\n\nreturn \"https://api.example.com\"\n\n@pytest.fixture(scope=\"function\")\n\ndef clean_page(page):\n\npage.get_by_label(\"Username\").fill(\"testuser\")\n\npage.get_by_label(\"Password\").fill(\"testpass\")\n\npage.get_by_role(\"button\", name=\"Log in\").click()\n\nyield page\n\npage.get_by_role(\"button\", name=\"Log out\").click()\n\ndef test_dashboard_shows_welcome_message(logged_in_page):\n\nexpect(logged_in_page.get_by_text(\"Welcome,\n```\n\n## page.goto(\"https://app.example.com\")\n\nScope choice matters for speed: a session-scoped login fixture (log in once, reuse the saved session for every test — tying into storage_state in Chapter 20) can save enormous amounts of time versus a function-scoped one that logs in fresh before every single test. But scope should match reality — if tests mutate shared state (e.g., one test changes a setting another test depends on being default), a broader scope than function can cause tests to interfere with each other in ways that are painful to debug.\n\nconftest.py (concept, not a function) What it does: A special filename pytest auto-discovers; fixtures defined here are shared across all test files in that directory and below, with no import needed. Types/params: N/A — it's a file location convention, not a callable. Pointers: Put widely-shared fixtures (base URL, login, browser context config) here. Test-file-specific fixtures can stay local to that file instead, to avoid a bloated global conftest.py.\n\nInstalling pytest-playwright automatically gives you a page fixture (and browser, context) ready to use in any test, with no setup code required: python\n\n```\npytest-playwright plugin basics\n\ndef test_homepage_title(page):\n\nyield page\n```\n\n## expect(page).to_have_title(\"Example Domain\")\n\nThe plugin also adds useful command-line flags: bash\n\nChromium\n\nwatching a test run\n\npage, browser, context (pytest-playwright built-in fixtures) What it does: Automatically provided fixtures giving you a ready-to-use Page/Browser/BrowserContext in any test function, without manual setup. Types/params: N/A — request by naming them as test function parameters, e.g. def\n\nPointers: page is by far the most commonly used — it comes with a fresh BrowserContext per test by default, giving you test isolation automatically (see Part 1, Chapter 3 on the Browser/Context/Page hierarchy).\n\n```\npytest --headed              # run visibly instead of headless\n\npytest --browser firefox     # run against Firefox instead of default\n\npytest --slowmo 500          # slow down actions by 500ms, helpful for\n\ntest_x(page):.\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
