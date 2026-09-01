import type { ChapterRecord } from "../../../types";

/** 2. Environment Setup */
export const chapter = {
  "id": "pw-1-setup",
  "title": "2. Environment Setup",
  "minutes": 45,
  "level": "beginner",
  "phase": "Part 1 · Foundations",
  "partName": "Part 1 · Foundations",
  "overviewText": "A working Playwright Python environment requires Python itself, an isolated virtual environment (venv), the playwright and pytest-playwright packages, and downloaded browser binaries — three separate install steps beginners often conflate. This chapter covers venv activation, pip installs, playwright install for Chromium/Firefox/WebKit binaries, and a starter folder structure (tests/, pages/, conftest.py, pytest.ini, requirements.txt) that scales into Page Object Model (Chapter 14) and full architecture (Chapter 29) without a painful mid-project reorganization.",
  "why": "Broken setup blocks everything downstream. Missing browser binaries produces cryptic launch errors; skipping venv causes dependency conflicts with system Python; a flat tests/ dump forces refactoring once you hit a dozen files. Getting the foundation right once saves hours of debugging and rework across the entire manual.",
  "when": "Follow this chapter exactly before writing your first script (Chapter 4). Revisit when onboarding a new teammate, setting up CI agents, or troubleshooting 'Executable doesn't exist' errors after a Playwright version upgrade (re-run playwright install).",
  "practical": {
    "app": "New Playwright project — team onboarding",
    "scenario": "A junior QA engineer clones the repo and runs pytest without activating venv or installing browsers. Tests fail with 'BrowserType.launch: Executable doesn't exist'. You point them to requirements.txt, venv activation, pip install -r requirements.txt, and playwright install — all five tests pass on first clean setup.",
    "pass": "Fresh machine: venv active, dependencies installed, playwright install complete, pytest discovers tests/ and launches Chromium headless.",
    "fail": "Engineer pip installs playwright globally, mixes Python 3.9 system packages with 3.11 project deps, and spends a day debugging import errors unrelated to test logic."
  },
  "advantages": [
    "venv isolation prevents dependency hell across Python projects on one machine",
    "pytest-playwright fixtures eliminate boilerplate browser launch/teardown in every test file",
    "Starter folder structure anticipates POM (pages/) and shared fixtures (conftest.py) from day one",
    "requirements.txt makes CI reproducible — same versions locally and on the pipeline agent",
    "playwright install downloads pinned browser versions matched to the library version",
    "pytest.ini centralizes markers, timeout defaults, and trace-on-failure options early"
  ],
  "limitations": [
    "Browser binaries add ~300MB per engine — disk and CI cache size matter",
    "playwright install must be re-run after every major Playwright version bump",
    "Windows path activation (venv\\Scripts\\activate) differs from Mac/Linux — onboarding docs need both",
    "Corporate proxies may block browser binary downloads — IT whitelist sometimes required",
    "Empty pages/ folder feels premature for a hello-world project — discipline to create structure anyway",
    "Does not cover Docker/CI agent setup — that comes in later parts"
  ],
  "tools": [
    {
      "name": "pytest-playwright",
      "sub": "Pytest integration",
      "url": "https://pypi.org/project/pytest-playwright/",
      "desc": "pytest-playwright is the community-maintained plugin that wires Playwright into pytest's fixture system. It provides built-in fixtures — browser, context, page — scoped per test or session, reads configuration from pytest.ini or pyproject.toml, and handles browser launch/teardown automatically. It is the Python equivalent of what @playwright/test provides for JavaScript, minus the built-in parallel runner (use pytest-xdist instead).",
      "adv": [
        "Zero boilerplate — def test_login(page): page.goto(...) works immediately",
        "Fixtures scoped function/session/module — control browser reuse vs isolation",
        "Reads --browser, --headed, --slowmo CLI flags for quick debugging",
        "Integrates with pytest markers, parametrize, and xdist out of the box"
      ],
      "lim": [
        "Separate package from playwright core — version compatibility must be checked",
        "Less feature-rich reporting than @playwright/test's HTML reporter — often paired with pytest-html or allure",
        "Fixture customization requires conftest.py knowledge — not zero-config for advanced setups",
        "No built-in visual comparison — screenshot diffing is manual or plugin-based"
      ],
      "steps": [
        {
          "t": "Step 1 — Create and activate a virtual environment",
          "p": "From your project root:",
          "c": "python -m venv venv\nsource venv/bin/activate       # Mac/Linux\n# venv\\Scripts\\activate         # Windows"
        },
        {
          "t": "Step 2 — Install Playwright and pytest-playwright",
          "p": "Add to requirements.txt and install:",
          "c": "pip install playwright pytest-playwright pytest\nplaywright install              # downloads Chromium, Firefox, WebKit"
        },
        {
          "t": "Step 3 — Create starter folder structure",
          "p": "Scaffold the project:",
          "c": "project/\n├── tests/\n│   └── test_example.py\n├── pages/              # page objects — used from Chapter 14\n├── conftest.py         # shared fixtures\n├── pytest.ini\n└── requirements.txt"
        },
        {
          "t": "Step 4 — Configure pytest.ini",
          "p": "Minimal pytest-playwright config:",
          "c": "[pytest]\ntestpaths = tests\naddopts = --headed --browser chromium"
        },
        {
          "t": "Step 5 — Write and run a smoke test",
          "p": "tests/test_example.py:",
          "c": "def test_homepage(page):\n    page.goto(\"https://example.com\")\n    assert \"Example\" in page.title()"
        },
        {
          "t": "Step 6 — Verify the setup",
          "p": "Run pytest and confirm browser launch:",
          "c": "pytest tests/test_example.py -v\n# Expected: 1 passed, Chromium launches (headed if --headed set)"
        }
      ]
    }
  ],
  "contentMarkdown": "venv hygiene, install pytest-playwright + browser binaries, and a starter folder structure that won’t fight you when POM arrives.\n\n## Python, pip, and virtual environments\n\nAssuming Python is installed, the critical habit here is virtual environments (venv). Every project should get its own isolated environment.\n\n```\npython -m venv venv\nsource venv/bin/activate      # Mac/Linux\nvenv\\Scripts\\activate         # Windows\n```\n\n## Installing Playwright + browser binaries\n\nTwo separate steps that beginners often miss the distinction between.\n\n## Project folder structure\n\nEven a simple starting structure pays off later (preview of Chapter 14’s POM and Chapter 29’s scalable architecture). Starting with this loose structure — rather than dumping every test file flat in one folder — means you won’t need a painful reorganization once the suite grows past a handful of tests.\n\n```\nproject/\n├── tests/\n├── pages/          # page object classes — comes later\n├── conftest.py\n├── pytest.ini\n└── requirements.txt\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
