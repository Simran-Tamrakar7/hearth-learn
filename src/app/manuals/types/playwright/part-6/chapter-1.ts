import type { ChapterRecord } from "../../../types";

/** 29. Building a Scalable Framework from Scratch */
export const chapter = {
  "id": "pw-6-framework",
  "title": "29. Building a Scalable Framework from Scratch",
  "minutes": 60,
  "level": "pro",
  "phase": "Part 6 · Pro-Level Practices",
  "partName": "Part 6 · Pro-Level Practices",
  "overviewText": "Building a scalable Playwright framework means moving beyond a flat tests/ + pages/ layout to an enterprise-grade architecture where new contributors can navigate the codebase without a guided tour. The organizing principle is simple: a new engineer should be able to guess where something lives before searching for it. That means separating tests by type (smoke, regression, modules), grouping page objects by feature module, extracting cross-cutting logic into a utils/ layer, centralizing environment configuration in a config/ directory, and keeping test data in dedicated files rather than hardcoded strings. The utils/ layer holds API helpers, custom wait conditions, and data generators — anything that doesn't belong in a page object (which should only know about its own page) or a test (which should read like a scenario, not implementation detail).",
  "why": "A flat test structure works for one developer writing ten tests. It collapses at fifty tests and three contributors. Without clear separation of concerns, page object methods get duplicated across files, environment URLs get hardcoded in individual tests, and API setup logic lives inside test functions instead of reusable utilities. The result is a suite that is painful to extend, scary to refactor, and impossible to onboard onto. Enterprise-grade folder architecture is not bureaucracy — it is the minimum structure needed for a suite to survive contact with a real team.",
  "when": "Restructure when your suite exceeds roughly 30–40 tests or when a second contributor joins. Signs you need this now: you are copy-pasting locator strings across tests, environment URLs appear in more than one file, or a new team member asks 'where does X live?' more than once. Apply the restructure before adding CI/CD (Part 5) — a well-organized framework makes CI setup straightforward; a messy one makes it fragile.",
  "practical": {
    "app": "Bizlevate HRMS — Multi-module automation framework",
    "scenario": "A new QA engineer joins the team and needs to add tests for the Payroll module. With the enterprise layout, they create pages/modules/payroll_page.py and tests/modules/test_payroll.py following existing patterns — without asking where anything goes.",
    "pass": "The new engineer finds pages/modules/leave_page.py as a template, creates payroll_page.py following the same pattern, adds test_payroll.py in tests/modules/, and imports Settings from config/settings.py for the staging URL. The PR is reviewable because the structure is predictable.",
    "fail": "Without the enterprise layout, the new engineer creates test_payroll.py in the root tests/ folder, hardcodes the staging URL, duplicates login logic from another test file, and the PR requires extensive rework because there is no established pattern to follow."
  },
  "advantages": [
    "New contributors navigate the codebase by convention, not tribal knowledge",
    "Feature-module grouping mirrors the application structure — obvious mapping between app and tests",
    "utils/ layer eliminates duplication of API helpers and custom wait conditions",
    "config/settings.py provides a single source of truth for environment URLs and credentials",
    "Separating smoke, regression, and module tests enables selective CI execution via markers",
    "test_data/ directory keeps test inputs out of test logic — easy to update without touching code"
  ],
  "limitations": [
    "Folder structure decisions are conventions, not enforced by Playwright — requires team discipline",
    "Over-engineering the structure for a solo project adds navigation overhead with no payoff",
    "utils/ can become a junk drawer if the 'does it know about a specific page?' rule is not enforced",
    "Config-driven execution adds indirection — developers must know to check Settings, not grep for URLs",
    "Restructuring an existing flat suite is disruptive — better to start right than migrate later"
  ],
  "tools": [
    {
      "name": "pytest.ini",
      "sub": "Framework Configuration",
      "url": "https://docs.pytest.org/en/stable/reference/customize.html",
      "desc": "pytest.ini is the central configuration file for a Playwright test framework. It defines test discovery paths, default CLI options (browser, headless, screenshot flags), custom markers (smoke, regression, module_leave), and logging settings. Keeping framework-wide defaults in pytest.ini means contributors run pytest without remembering flags, and CI uses the same defaults as local development.",
      "adv": [
        "Single file controls test discovery, default browser, and marker definitions",
        "addopts sets default CLI flags — contributors run pytest without remembering options",
        "Marker definitions in pytest.ini enable pytest -m smoke selective execution",
        "Version-controlled alongside code — CI and local use identical settings"
      ],
      "lim": [
        "pytest.ini options can be overridden by CLI flags — document which takes precedence",
        "Does not replace conftest.py for fixtures — complements it",
        "Marker registration is required before using custom markers or pytest warns"
      ],
      "steps": [
        {
          "t": "Step 1 — Create pytest.ini at the project root",
          "p": "Define test paths, default options, and markers:",
          "c": "[pytest]\ntestpaths = tests\naddopts = --browser chromium --screenshot=only-on-failure\nmarkers =\n    smoke: fast critical-path tests\n    regression: full regression suite\n    module_leave: Leave module tests\n    module_payroll: Payroll module tests"
        },
        {
          "t": "Step 2 — Create config/settings.py",
          "p": "Centralize environment configuration:",
          "c": "import os\n\nclass Settings:\n    ENV = os.environ.get(\"TEST_ENV\", \"staging\")\n    BASE_URL = {\n        \"dev\": \"https://dev.example.com\",\n        \"staging\": \"https://staging.example.com\",\n        \"prod\": \"https://app.example.com\",\n    }[ENV]\n    HEADLESS = os.environ.get(\"HEADLESS\", \"true\").lower() == \"true\""
        },
        {
          "t": "Step 3 — Create the enterprise folder structure",
          "p": "Scaffold the directory layout:",
          "c": "project/\n├── tests/\n│   ├── smoke/\n│   ├── regression/\n│   └── modules/\n├── pages/\n│   ├── base_page.py\n│   └── modules/\n├── utils/\n│   ├── api_helpers.py\n│   └── wait_helpers.py\n├── config/\n│   └── settings.py\n├── test_data/\n│   └── users.json\n├── conftest.py\n└── pytest.ini"
        }
      ]
    }
  ],
  "contentMarkdown": "Folder architecture for enterprise-grade projects Past a certain size, a flat tests/ + pages/ structure (Chapter 14) stops being enough. An enterprise-grade layout separates concerns clearly so new contributors can navigate it without a guided tour: project/ ├── tests/ │ ├── smoke/ │ ├── regression/ │ └── modules/ │ ├── test_leave.py │ ├── test_attendance.py │ └── test_payroll.py ├── pages/ │ ├── \n\n## Folder architecture for enterprise-grade projects\n\nPast a certain size, a flat tests/ + pages/ structure (Chapter 14) stops being enough. An enterprise-grade layout separates concerns clearly so new contributors can navigate it without a guided tour:\n\nproject/\n\n├── tests/\n\n│ ├── smoke/\n\n│ ├── regression/\n\n│ └── modules/\n\n│ ├── test_leave.py\n\n│ ├── test_attendance.py\n\n│ └── test_payroll.py\n\n├── pages/\n\n│ ├── base_page.py\n\n│ └── modules/\n\n│ ├── leave_page.py\n\n│ └── attendance_page.py\n\n├── utils/\n\n│ ├── api_helpers.py\n\n│ ├── data_generators.py\n\n│ └── wait_helpers.py\n\n├── config/\n\n│ ├── environments.py\n\n│ └── settings.py\n\n├── test_data/\n\n│ └── users.json\n\n├── conftest.py\n\n├── pytest.ini\n\n└── requirements.txt\n\nPointers: The organizing principle is \"a new engineer should be able to guess where something lives before searching for it.\" Grouping page objects and tests by feature module (mirroring your actual application's modules — e.g., matching Bizlevate's Leave/Attendance/Payroll structure) rather than by arbitrary file order keeps the mapping between app and test suite obvious.\n\n## Utilities/helpers layer\n\nA utils/ layer holds logic that doesn't belong in a page object (which should only know about its own page) or a test (which should read like a scenario, not implementation detail).\n\nresponse = request.post(\"/users\", json={\"name\": name, \"email\": email})\n\n```\nreturn response.json()[\"id\"]\n\ndef delete_test_user(request, user_id):\n\nrequest.delete(f\"/users/{user_id}\")\n\n# utils/wait_helpers.py\n\ndef wait_for_toast_to_disappear(page, timeout=5000):\n\n# utils/api_helpers.py\n\ndef create_test_user(request, name, email):\n```\n\n## Utility function pattern (utils/*.py — convention, not a Playwright API)\n\nWhat it does: Groups reusable, cross-cutting logic (API setup helpers, custom wait conditions, data generation) that multiple page objects or test files need, without duplicating it in each.\n\nTypes/params: N/A — plain Python functions, organized by concern (e.g., api_helpers.py, wait_helpers.py, data_generators.py).\n\nPointers: A good test for whether something belongs in utils/ versus a page object: does it know about a specific page's UI? If yes, it's a page object method. Does it know about the API or a generic wait pattern usable across many pages? That's a utility.\n\n## Config-driven test execution\n\nBehavior (which environment, which browser, headless/headed) should be controlled by configuration, not hardcoded into test files, so the same framework runs anywhere without code changes.\n\n```\n# config/settings.py\n\nimport os\n\nclass Settings:\n```\n\n## BASE_URL = {\n\n\"dev\": \"https://dev.example.com\",\n\n\"staging\": \"https://staging.example.com\",\n\n\"prod\": \"https://app.example.com\",\n\n}[ENV]\n\n## Settings class pattern (convention, not a Playwright API)\n\nWhat it does: Centralizes all environment/execution configuration into one importable object, read once from environment variables at import time.\n\nTypes/params: N/A — a plain Python class with class-level attributes, typically populated via os.environ.get() (Chapter 15).\n\nPointers: Import Settings wherever configuration is needed (conftest.py, page objects, utilities) instead of scattering separate os.environ.get() calls throughout the codebase — one clear source of truth is easier to audit and change later.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
