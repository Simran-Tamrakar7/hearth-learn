import type { ChapterRecord } from "../../types";

/** 15. Configuration Management */
export const chapter = {
  "id": "pw-3-config",
  "title": "15. Configuration Management",
  "minutes": 40,
  "level": "intermediate",
  "phase": "Part 3 · Test Structure & Framework",
  "partName": "Part 3 · Test Structure & Framework",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "pytest.ini / conftest.py as config equivalent Since Python Playwright has no built-in config file (unlike the JS test runner's playwright.config.ts), pytest.ini fills that role for pytest-level settings, and conftest.py handles anything needing actual code (like environment-based fixture values). ini # pytest.ini [pytest] markers = smoke: quick critical-path tests regression: full regression suite\n\n## Overview\n\nSince Python Playwright has no built-in config file (unlike the JS test runner's playwright.config.ts), pytest.ini fills that role for pytest-level settings, and conftest.py handles anything needing actual code (like environment-based fixture values). ini\n\n[pytest]\n\nmarkers =\n\nsmoke: quick critical-path tests\n\nregression: full regression suite\n\naddopts = --headed --browser chromium\n\nWhat it does: Central place for pytest-level settings: registered markers, default command-line options, test discovery rules. Types/params:\n\nPointers: Registering markers here (Chapter 13) is what keeps @pytest.mark.smoke from producing warnings and documents what each marker means for the rest of the team. Environment variables, base URLs python\n\nbash BASE_URL=https://prod.example.com pytest\n\nWhat it does: Reads an environment variable, falling back to a default if it isn't set. Types/params:\n\nPointers: This is the standard pattern for making a test suite environment-aware without hardcoding URLs, so the exact same test code runs against dev, staging, or prod depending on how it's invoked. Managing multiple environments (dev/staging/prod) A common pattern is separate .env-style files or a small config dictionary keyed by environment name: python\n\n```\n# conftest.py\n\nimport os\n\nimport pytest\n\n@pytest.fixture(scope=\"session\")\n\ndef base_url():\n\nreturn os.environ.get(\"BASE_URL\", \"https://staging.example.com\")\n\npytest.ini [pytest] section (config file, not a function)\n\npytest.ini / conftest.py as config equivalent\n```\n\n## ENVIRONMENTS = {\n\n\"dev\": \"https://dev.example.com\",\n\n\"staging\": \"https://staging.example.com\",\n\n\"prod\": \"https://app.example.com\",\n\n}\n\nenv = os.environ.get(\"TEST_ENV\", \"staging\")\n\nbash TEST_ENV=prod pytest # careful — running full suites against prod is usually restricted to read-only smoke tests Pointer worth flagging: running write-heavy tests (creating/deleting data) against production is a common real-world mistake — most teams restrict prod runs to smoke-tagged, non-destructive tests only, enforced by combining TEST_ENV with markers from Chapter 13.\n\n```\n@pytest.fixture(scope=\"session\")\n\ndef base_url():\n\nreturn ENVIRONMENTS[env]\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
