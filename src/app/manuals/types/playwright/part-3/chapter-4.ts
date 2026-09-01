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
  "contentMarkdown": "pytest.ini / conftest.py as config equivalent Since Python Playwright has no built-in config file (unlike the JS test runner's playwright.config.ts), pytest.ini fills that role for pytest-level settings, and conftest.py handles anything needing actual code (like environment-based fixture values). ini # pytest.ini [pytest] markers = smoke: quick critical-path tests regression: full regression suite\n\n## Overview\n\nSince Python Playwright has no built-in config file (unlike the JS test runner's playwright.config.ts), pytest.ini fills that role for pytest-level settings, and conftest.py handles anything needing actual code (like environment-based fixture values). ini\n\n[pytest]\n\nmarkers =\n\nsmoke: quick critical-path tests\n\nregression: full regression suite\n\naddopts = --headed --browser chromium\n\nWhat it does: Central place for pytest-level settings: registered markers, default command-line options, test discovery rules. Types/params:\n\nPointers: Registering markers here (Chapter 13) is what keeps @pytest.mark.smoke from producing warnings and documents what each marker means for the rest of the team. Environment variables, base URLs python\n\nbash BASE_URL=https://prod.example.com pytest\n\nWhat it does: Reads an environment variable, falling back to a default if it isn't set. Types/params:\n\nPointers: This is the standard pattern for making a test suite environment-aware without hardcoding URLs, so the exact same test code runs against dev, staging, or prod depending on how it's invoked. Managing multiple environments (dev/staging/prod) A common pattern is separate .env-style files or a small config dictionary keyed by environment name: python\n\n```\n# conftest.py\n\nimport os\n\nimport pytest\n\n@pytest.fixture(scope=\"session\")\n\ndef base_url():\n\nreturn os.environ.get(\"BASE_URL\", \"https://staging.example.com\")\n\npytest.ini [pytest] section (config file, not a function)\n\npytest.ini / conftest.py as config equivalent\n```\n\n## ENVIRONMENTS = {\n\n\"dev\": \"https://dev.example.com\",\n\n\"staging\": \"https://staging.example.com\",\n\n\"prod\": \"https://app.example.com\",\n\n}\n\nenv = os.environ.get(\"TEST_ENV\", \"staging\")\n\nbash TEST_ENV=prod pytest # careful — running full suites against prod is usually restricted to read-only smoke tests Pointer worth flagging: running write-heavy tests (creating/deleting data) against production is a common real-world mistake — most teams restrict prod runs to smoke-tagged, non-destructive tests only, enforced by combining TEST_ENV with markers from Chapter 13.\n\n```\n@pytest.fixture(scope=\"session\")\n\ndef base_url():\n\nreturn ENVIRONMENTS[env]\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
