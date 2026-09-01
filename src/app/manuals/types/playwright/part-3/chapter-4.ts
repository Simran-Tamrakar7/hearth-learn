import type { ChapterRecord } from "../../../types";

/** 15. Configuration Management */
export const chapter = {
  "id": "pw-3-config",
  "title": "15. Configuration Management",
  "minutes": 40,
  "level": "intermediate",
  "phase": "Part 3 · Test Structure & Framework",
  "partName": "Part 3 · Test Structure & Framework",
  "overviewText": "Python Playwright has no built-in config file equivalent to the JavaScript test runner's playwright.config.ts — pytest.ini and conftest.py together fill that role. pytest.ini holds pytest-level settings: registered markers, default CLI options (addopts), and test discovery rules. conftest.py handles anything requiring Python code: environment-based base URL fixtures, browser context configuration, and conditional setup logic. Environment variables (BASE_URL, TEST_ENV) make the same test code run against dev, staging, or prod without hardcoded URLs. A common pattern is an ENVIRONMENTS dictionary keyed by environment name, read via os.environ.get('TEST_ENV', 'staging'), exposed as a session-scoped base_url fixture. Running write-heavy tests against production is a frequent real-world mistake — most teams restrict prod runs to smoke-tagged, read-only tests enforced by combining TEST_ENV with markers.",
  "why": "Hardcoded URLs and settings scattered across test files mean every environment switch requires editing code. When staging moves from staging.example.com to staging-v2.example.com, grep-and-replace across 40 files is error-prone and unreviewable. Centralized config means one fixture or one environment variable change propagates everywhere. Registered markers in pytest.ini also prevent the warning noise that erodes trust in CI output when pytest emits PytestUnknownMarkWarning on every run.",
  "when": "Create pytest.ini as soon as you define custom markers (Chapter 13) or want default CLI flags like --headed. Add environment-based fixtures in conftest.py when the same suite must run against dev, staging, and prod. Never hardcode production URLs in test files — always read from environment with a safe staging default.",
  "practical": {
    "app": "HRMS — Multi-environment test suite",
    "scenario": "QA runs the same 80-test suite against staging nightly and against prod as a read-only smoke check before release. BASE_URL=https://app.example.com pytest -m smoke runs 8 prod-safe tests; TEST_ENV=staging pytest runs the full suite against staging with no code changes.",
    "pass": "base_url fixture returns os.environ.get('BASE_URL', 'https://staging.example.com') — one env var switches every test.",
    "fail": "Twelve test files hardcode 'https://staging.example.com'; prod smoke run accidentally hits staging because someone forgot to update three files."
  },
  "advantages": [
    "Same test code runs against any environment via environment variables",
    "pytest.ini centralizes markers, defaults, and discovery rules in one file",
    "conftest.py fixtures encode environment logic without polluting individual tests",
    "Registered markers eliminate warning noise and document team conventions"
  ],
  "limitations": [
    "No single playwright.config.ts equivalent — pytest.ini + conftest.py split is less discoverable for newcomers",
    "Environment variable typos fail silently if defaults mask the mistake",
    "Session-scoped base_url fixture cached at run start — mid-run env changes have no effect",
    "Prod access requires discipline — nothing in pytest prevents destructive tests against production"
  ],
  "tools": [
    {
      "name": "pytest.ini",
      "sub": "Pytest configuration file",
      "url": "https://docs.pytest.org/en/stable/reference/customize.html",
      "desc": "pytest.ini is the standard configuration file for pytest projects, placed at the repository root or tests/ directory. The [pytest] section registers custom markers (preventing unknown-marker warnings), sets default command-line options via addopts, and configures test discovery patterns. For Playwright projects it commonly registers smoke/regression markers and sets defaults like --headed or --browser chromium for local development runs.",
      "adv": [
        "Single file documents all custom markers with descriptions",
        "addopts sets team-wide defaults without remembering CLI flags",
        "Version-controllable — config changes are reviewed in PRs",
        "Suppresses PytestUnknownMarkWarning for registered markers"
      ],
      "lim": [
        "Static only — cannot contain Python logic or environment conditionals",
        "Must live in root or test directory — nested configs are not supported",
        "addopts defaults apply to every run unless overridden on CLI",
        "Does not replace conftest.py for dynamic fixture values"
      ],
      "steps": [
        {
          "t": "Step 1 — Create pytest.ini at project root",
          "p": "Register markers and set defaults:",
          "c": "# pytest.ini\n[pytest]\nmarkers =\n    smoke: quick critical-path tests\n    regression: full edge-case suite\naddopts = --browser chromium\ntestpaths = tests"
        },
        {
          "t": "Step 2 — Verify markers are recognized",
          "p": "Run pytest --markers to list registered markers:",
          "c": "pytest --markers\n# @pytest.mark.smoke: quick critical-path tests"
        }
      ]
    },
    {
      "name": "Environment-based fixtures",
      "sub": "conftest.py pattern",
      "url": "https://playwright.dev/python/docs/test-runners",
      "desc": "conftest.py holds Python fixtures that read environment variables to configure test behavior dynamically. A session-scoped base_url fixture reads BASE_URL or TEST_ENV and returns the appropriate URL. This pattern makes the identical test suite runnable against dev, staging, or prod by changing only the invocation command, not the test code.",
      "adv": [
        "Zero code changes to switch environments — only env vars change",
        "Safe default (staging) prevents accidental prod hits",
        "Session scope means URL resolved once per run, not per test",
        "Combines with markers to restrict prod to smoke-only runs"
      ],
      "lim": [
        "Requires CI pipeline to set env vars correctly per job",
        "No compile-time check that TEST_ENV value is valid",
        "Prod runs need explicit team policy — pytest won't enforce read-only",
        "Secrets (API keys) should use .env files or CI secrets, not hardcoded in conftest"
      ],
      "steps": [
        {
          "t": "Step 1 — Define environment map in conftest.py",
          "p": "Map environment names to URLs:",
          "c": "import os\nimport pytest\n\nENVIRONMENTS = {\n    \"dev\": \"https://dev.example.com\",\n    \"staging\": \"https://staging.example.com\",\n    \"prod\": \"https://app.example.com\",\n}\n\n@pytest.fixture(scope=\"session\")\ndef base_url():\n    env = os.environ.get(\"TEST_ENV\", \"staging\")\n    return os.environ.get(\"BASE_URL\", ENVIRONMENTS[env])"
        },
        {
          "t": "Step 2 — Use base_url in tests and page objects",
          "p": "Pass the fixture to tests that need it:",
          "c": "def test_homepage_loads(page, base_url):\n    page.goto(base_url)\n    expect(page).to_have_title(re.compile(\"HRMS\"))"
        },
        {
          "t": "Step 3 — Run against different environments",
          "p": "Switch via environment variable at invocation:",
          "c": "TEST_ENV=staging pytest\nTEST_ENV=prod pytest -m smoke   # read-only smoke only\nBASE_URL=https://custom.example.com pytest"
        }
      ]
    }
  ],
  "contentMarkdown": "## Configuration at the Project Level\n\nHard-coded URLs, timeouts, and browser options scattered across test files become a maintenance burden the moment you add a staging environment. Centralize configuration in **pytest.ini**, environment variables, and `conftest.py` hooks so one change propagates everywhere.\n\n## pytest.ini — The Project Config File\n\nPlace `pytest.ini` at the repository root (or `tests/` directory):\n\n```ini\n[pytest]\ntestpaths = tests/e2e\npython_files = test_*.py\npython_classes = Test*\npython_functions = test_*\n\nmarkers =\n    smoke: critical path tests\n    regression: full coverage tests\n    slow: tests exceeding 30 seconds\n\naddopts =\n    --strict-markers\n    --tb=short\n    -ra\n\n# Playwright-specific defaults (pytest-playwright)\n# These can also be set via CLI; pytest.ini provides the baseline\n```\n\n`--strict-markers` fails on unregistered marker names — catches typos like `@pytest.mark.smoek`.\n\n## Environment Variables\n\nNever commit secrets or environment-specific URLs. Read them at runtime:\n\n```python\n# tests/conftest.py\nimport os\nimport pytest\n\n@pytest.fixture(scope=\"session\")\ndef base_url() -> str:\n    url = os.environ.get(\"BASE_URL\")\n    if not url:\n        raise RuntimeError(\"BASE_URL environment variable is required\")\n    return url.rstrip(\"/\")\n\n@pytest.fixture(scope=\"session\")\ndef admin_credentials():\n    return {\n        \"email\": os.environ[\"ADMIN_EMAIL\"],\n        \"password\": os.environ[\"ADMIN_PASSWORD\"],\n    }\n```\n\nSet variables locally and in CI:\n\n```bash\n# .env.local (gitignored)\nBASE_URL=http://localhost:3000\nADMIN_EMAIL=admin@example.com\nADMIN_PASSWORD=local-dev-secret\n```\n\n```bash\nexport BASE_URL=https://staging.example.com\npytest -m smoke\n```\n\nFor local development, load `.env` files with `python-dotenv` in `conftest.py`:\n\n```python\nfrom dotenv import load_dotenv\nload_dotenv()  # reads .env before fixtures resolve\n```\n\n## BASE_URL Pattern\n\nEvery test navigates relative to a single base URL fixture:\n\n```python\ndef test_pricing_page(page, base_url):\n    page.goto(f\"{base_url}/pricing\")\n    expect(page.get_by_role(\"heading\", name=\"Pricing\")).to_be_visible()\n```\n\nPage objects accept `base_url` in their constructor (Chapter 14):\n\n```python\nclass DashboardPage(BasePage):\n    def open(self):\n        self.navigate(\"/dashboard\")  # uses self.base_url internally\n```\n\n## Multi-Environment Pattern\n\nTeams typically run against three targets:\n\n| Environment | BASE_URL | When |\n|-------------|----------|------|\n| Local | `http://localhost:3000` | Developer machine |\n| Staging | `https://staging.example.com` | PR checks, QA |\n| Production | `https://app.example.com` | Smoke only, read-only tests |\n\nSwitch environments without code changes:\n\n```bash\nBASE_URL=https://staging.example.com pytest -m smoke\nBASE_URL=https://app.example.com pytest -m smoke --headed\n```\n\nIn CI, set `BASE_URL` per job:\n\n```yaml\nenv:\n  BASE_URL: https://staging.example.com\n  ADMIN_EMAIL: ${{ secrets.STAGING_ADMIN_EMAIL }}\n  ADMIN_PASSWORD: ${{ secrets.STAGING_ADMIN_PASSWORD }}\n```\n\n## Playwright-Specific Configuration Hooks\n\npytest-playwright exposes hook fixtures in `conftest.py`:\n\n```python\nimport pytest\n\n@pytest.fixture(scope=\"session\")\ndef browser_type_launch_args(browser_type_launch_args):\n    return {\n        **browser_type_launch_args,\n        \"headless\": True,\n        \"slow_mo\": 0,\n    }\n\n@pytest.fixture(scope=\"session\")\ndef browser_context_args(browser_context_args, base_url):\n    return {\n        **browser_context_args,\n        \"base_url\": base_url,\n        \"viewport\": {\"width\": 1440, \"height\": 900},\n        \"ignore_https_errors\": True,\n    }\n```\n\nWith `base_url` set on the context, tests can use relative paths:\n\n```python\ndef test_homepage(page):\n    page.goto(\"/\")  # resolves against context base_url\n```\n\n## Timeouts and Retries\n\nSet global timeouts in config or conftest:\n\n```python\n@pytest.fixture(autouse=True)\ndef set_default_timeouts(page):\n    page.set_default_timeout(15_000)       # locator actions\n    page.set_default_navigation_timeout(30_000)\n```\n\nFor flaky network environments, consider `pytest-rerunfailures` — but fix root causes rather than masking them.\n\n## Key Takeaways\n\n- `pytest.ini` registers markers and default CLI options.\n- `BASE_URL` and credentials come from environment variables, never hard-coded.\n- Use `browser_context_args` to set viewport, `base_url`, and HTTPS settings project-wide.\n- One config change switches between local, staging, and production.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
