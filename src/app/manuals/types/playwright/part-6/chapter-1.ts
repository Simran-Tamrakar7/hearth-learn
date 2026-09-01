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
  "contentMarkdown": "## Enterprise folder architecture\n\nA scalable Playwright framework organizes code so a new contributor can guess where something lives before searching. The guiding principle: mirror the application structure and separate concerns by responsibility.\n\n```\nproject/\n├── config/\n│   ├── settings.py          # Environment URLs, timeouts, credentials\n│   └── browsers.py          # Browser launch options per environment\n├── pages/\n│   ├── base_page.py         # Shared navigation, waits, assertions\n│   └── modules/\n│       ├── login_page.py\n│       ├── leave_page.py\n│       └── payroll_page.py\n├── tests/\n│   ├── smoke/               # Fast PR gate (< 5 min)\n│   ├── regression/          # Full suite (nightly)\n│   └── modules/             # Feature-scoped tests\n├── utils/\n│   ├── api_client.py        # REST helpers for test setup/teardown\n│   ├── data_factory.py      # Generate test entities\n│   └── wait_helpers.py      # Custom wait conditions\n├── test_data/\n│   ├── users.json\n│   └── leave_requests.json\n├── conftest.py\n├── pytest.ini\n└── requirements.txt\n```\n\nTests should read like scenarios. Page objects should know only about their page. Utilities should hold everything else.\n\n## The utils layer\n\nThe `utils/` directory is where cross-cutting logic lives — anything that does not belong in a page object or a test function.\n\n```python\n# utils/api_client.py\nimport requests\nfrom config.settings import Settings\n\nclass APIClient:\n    def __init__(self):\n        self.base_url = Settings.BASE_URL\n        self.session = requests.Session()\n\n    def login(self, username: str, password: str) -> str:\n        resp = self.session.post(\n            f\"{self.base_url}/api/auth/login\",\n            json={\"username\": username, \"password\": password},\n        )\n        resp.raise_for_status()\n        token = resp.json()[\"token\"]\n        self.session.headers[\"Authorization\"] = f\"Bearer {token}\"\n        return token\n\n    def create_leave_request(self, employee_id: int, leave_type: str) -> dict:\n        resp = self.session.post(\n            f\"{self.base_url}/api/leave-requests\",\n            json={\"employeeId\": employee_id, \"type\": leave_type},\n        )\n        resp.raise_for_status()\n        return resp.json()\n```\n\n```python\n# utils/data_factory.py\nfrom faker import Faker\n\nfake = Faker()\n\ndef random_employee() -> dict:\n    return {\n        \"name\": fake.name(),\n        \"email\": fake.company_email(),\n        \"department\": fake.random_element([\"HR\", \"Engineering\", \"Finance\"]),\n    }\n```\n\nNever put API calls or data generation inside test functions — extract them to utils so every test uses the same setup path.\n\n## Settings class — single source of truth\n\nHardcoding URLs and credentials in tests is the fastest way to create a suite that breaks when environments change.\n\n```python\n# config/settings.py\nimport os\nfrom dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Settings:\n    BASE_URL: str = os.getenv(\"BASE_URL\", \"http://localhost:3000\")\n    API_URL: str = os.getenv(\"API_URL\", \"http://localhost:3000/api\")\n    TEST_USER: str = os.getenv(\"TEST_USER\", \"testuser@example.com\")\n    TEST_PASSWORD: str = os.getenv(\"TEST_PASSWORD\", \"TestPass123!\")\n    DEFAULT_TIMEOUT: int = int(os.getenv(\"DEFAULT_TIMEOUT\", \"30000\"))\n    HEADLESS: bool = os.getenv(\"HEADLESS\", \"true\").lower() == \"true\"\n```\n\n```python\n# conftest.py\nfrom config.settings import Settings\n\n@pytest.fixture(scope=\"session\")\ndef browser_type_launch_args(browser_type_launch_args):\n    return {**browser_type_launch_args, \"headless\": Settings.HEADLESS}\n```\n\nEvery test, page object, and utility imports `Settings` — one place to change when staging moves or credentials rotate.\n\n## Base page pattern\n\nA `BasePage` eliminates duplicated navigation and wait logic across feature page objects.\n\n```python\n# pages/base_page.py\nfrom playwright.sync_api import Page\nfrom config.settings import Settings\n\nclass BasePage:\n    def __init__(self, page: Page):\n        self.page = page\n        self.base_url = Settings.BASE_URL\n\n    def navigate(self, path: str = \"/\"):\n        self.page.goto(f\"{self.base_url}{path}\")\n        self.page.wait_for_load_state(\"networkidle\")\n\n    def wait_for_toast(self, message: str):\n        self.page.get_by_role(\"alert\").filter(has_text=message).wait_for()\n```\n\n```python\n# pages/modules/leave_page.py\nfrom pages.base_page import BasePage\n\nclass LeavePage(BasePage):\n    def open(self):\n        self.navigate(\"/leave\")\n\n    def submit_request(self, leave_type: str, start: str, end: str):\n        self.page.get_by_label(\"Leave Type\").select_option(leave_type)\n        self.page.get_by_label(\"Start Date\").fill(start)\n        self.page.get_by_label(\"End Date\").fill(end)\n        self.page.get_by_role(\"button\", name=\"Submit\").click()\n        self.wait_for_toast(\"Request submitted\")\n```\n\nRestructure when your suite exceeds ~30–40 tests or a second contributor joins. Apply the structure before scaling CI.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
