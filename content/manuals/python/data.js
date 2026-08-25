/** Chapter body for /manuals/python. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "python",
  "title": "Python",
  "tagline": "Readable power — venv, pytest, and httpx for automation glue.",
  "category": "foundations",
  "accent": "#3F6212",
  "cover": "covers/python-cover.png",
  "duration": "8–14 weeks",
  "levelSpan": "Beginner → Pro",
  "who": "Beginners and QA/devs building Python fluency before or alongside the Playwright + Python path — not data science, not Django.",
  "outcomes": [
    "Create venv per project, manage dependencies with requirements.txt, and avoid global pip pollution",
    "Write readable functions, modules, and JSON/file helpers with type hints lite",
    "Test with pytest — fixtures, parametrize, conftest.py — the same stack Playwright uses",
    "Call REST APIs with httpx, handle errors with logging, and ship small CLI glue scripts",
    "Package scripts for reuse with pyproject.toml basics — enough to share tools across repos"
  ],
  "pace": {
    "hoursPerDay": "1–1.5 hours/day (≈ 7–10 hrs/week)",
    "recommended": "~5–8 weeks part-time",
    "accelerated": "~3–4 weeks at 2–3 hrs/day",
    "slow": "~10–12 weeks if busy"
  },
  "chapters": [
    {
      "id": "py-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this Python path",
      "minutes": 20,
      "overview": "This path builds Python fluency for automation — not data science, not web frameworks. It complements the Playwright + Python roadmap: master venv, syntax, pytest, and httpx here; browser automation lives there. Do not duplicate Playwright chapters.",
      "learn": [
        "How this path fits the Playwright curriculum",
        "venv-first workflow",
        "Stop rules before moving on"
      ],
      "steps": [
        {
          "title": "Complement, not duplicate",
          "body": "Playwright path covers browser tests end-to-end. This path covers Python itself: environments, syntax, pytest, httpx. If you are on the Playwright roadmap, treat this as a parallel foundation track.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create py-journey/ repo. Note in README: \"Foundation track — pairs with Playwright path.\"",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Study pace",
          "body": "1–1.5 hrs/day. Finish venv + syntax before deep pytest. httpx after you can write functions and read JSON.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Block calendar slots. Target finish date in README.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Weeks 1–2: venv, syntax, functions",
            "Weeks 3–4: files, JSON, pytest",
            "Weeks 5–6: httpx, logging, checkpoint"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Job-ready definition",
          "body": "You are ready when you can: create/activate venv, write tested pure functions, load JSON config, call an API with httpx, and explain why global pip installs are avoided.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add checklist to README.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "py-journey repo created",
        "Python 3.11+ verified",
        "README with timeline"
      ],
      "practice": {
        "title": "Hello venv",
        "brief": "python -m venv .venv, activate, python --version in README."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Python Tutorial (official)",
          "url": "https://docs.python.org/3/tutorial/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Real Python — venv",
          "url": "https://realpython.com/python-virtual-environments-a-primer/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "This path builds Python fluency for automation — not data science, not web frameworks. It complements the Playwright + Python roadmap: master venv, syntax, pytest, and httpx here; browser automation lives there. Do not duplicate Playwright chapters.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "py-venv",
      "phase": "A · Setup",
      "level": "beginner",
      "title": "Virtual environments & toolchain",
      "minutes": 40,
      "durationLabel": "Week 1",
      "overview": "Never pollute global Python. venv per project. pip install inside venv. requirements.txt for reproducibility.",
      "learn": [
        "python -m venv",
        "activate/deactivate",
        "pip install",
        "requirements.txt"
      ],
      "steps": [
        {
          "title": "Create and activate venv",
          "body": "python -m venv .venv creates an isolated environment. Activate before every session.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create .venv in py-journey. Activate. Run which python (or where python on Windows).",
          "tip": null,
          "code": "python -m venv .venv\n\n# macOS / Linux\nsource .venv/bin/activate\n\n# Windows\n.venv\\Scripts\\activate\n\npython --version\npip --version",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Install packages",
          "body": "pip install httpx pytest. pip freeze > requirements.txt commits exact versions.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "pip install httpx pytest. pip freeze > requirements.txt. Commit both.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Editor setup",
          "body": "VS Code / Cursor: select .venv interpreter. Python extension enables run/debug.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Open py-journey in editor. Confirm interpreter points to .venv.",
          "tip": "Forgot to activate? Symptoms: ModuleNotFoundError for packages you \"installed\".",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "venv activates cleanly",
        "requirements.txt committed",
        "Editor uses .venv interpreter"
      ],
      "practice": {
        "title": "Fresh clone drill",
        "brief": "Delete .venv, recreate, pip install -r requirements.txt — still works."
      },
      "resources": [
        {
          "type": "doc",
          "name": "venv — official docs",
          "url": "https://docs.python.org/3/library/venv.html",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Never pollute global Python. venv per project. pip install inside venv. requirements.txt for reproducibility.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "py-syntax",
      "phase": "A · Setup",
      "level": "beginner",
      "title": "Syntax, types & control flow",
      "minutes": 50,
      "durationLabel": "Week 1–2",
      "overview": "Indentation, variables, strings, f-strings, if/for, lists, dicts. Enough to read test code and write helpers.",
      "learn": [
        "Indentation rules",
        "f-strings",
        "if/elif/else",
        "for loops",
        "lists and dicts"
      ],
      "steps": [
        {
          "title": "Variables and f-strings",
          "body": "Dynamic typing — types exist at runtime. f-strings are the readable default for formatting.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Script that stores username/password and prints formatted login attempt.",
          "tip": null,
          "code": "username = \"standard_user\"\npassword = \"secret_sauce\"\nprint(f\"Attempting login for {username}\")",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Control flow",
          "body": "if/elif/else for branching. for item in items for iteration. while sparingly.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Loop over 3 invalid passwords; print whether each is empty or too short.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Lists and dicts",
          "body": "Lists ordered, dicts keyed. List comprehensions when readable. dict.get(key, default) avoids KeyError.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "users = [{\"name\":\"A\",\"role\":\"admin\"},{\"name\":\"B\",\"role\":\"user\"}]. Filter admins, print names.",
          "tip": null,
          "code": "admins = [u[\"name\"] for u in users if u.get(\"role\") == \"admin\"]",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "f-strings used",
        "for loop with if",
        "dict .get used"
      ],
      "practice": {
        "title": "Password validator",
        "brief": "Function is_valid_password(s) → bool with length and empty checks."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Python — Control Flow",
          "url": "https://docs.python.org/3/tutorial/controlflow.html",
          "lang": "EN",
          "free": true
        },
        {
          "type": "lab",
          "name": "HackerRank — Python",
          "url": "https://www.hackerrank.com/domains/python",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Indentation, variables, strings, f-strings, if/for, lists, dicts. Enough to read test code and write helpers.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "py-functions",
      "phase": "B · Structure",
      "level": "beginner",
      "title": "Functions, modules & packages",
      "minutes": 45,
      "durationLabel": "Week 2",
      "overview": "def, return, default args, type hints lite, import, project layout with src/ and tests/.",
      "learn": [
        "Functions and returns",
        "Default arguments",
        "Modules and imports",
        "Type hints lite"
      ],
      "steps": [
        {
          "title": "Write functions",
          "body": "Pure functions first — same input, same output, no side effects. Easier to test.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write is_valid_email(s), normalize_phone(s), build_url(base, path).",
          "tip": null,
          "code": "def is_valid_email(s: str) -> bool:\n    return \"@\" in s and \".\" in s.split(\"@\")[-1]",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Modules and imports",
          "body": "One file = one module. from helpers import foo or import helpers. Avoid circular imports.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Split helpers into src/helpers.py. Import from src/main.py.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Project layout",
          "body": "src/ for code, tests/ for pytest, requirements.txt at root. Standard layout employers recognize.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Restructure py-journey: src/, tests/, move helpers.",
          "tip": null,
          "code": "py-journey/\n  src/\n    helpers.py\n    main.py\n  tests/\n    test_helpers.py\n  requirements.txt",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "3+ functions in src/",
        "tests/ folder exists",
        "Imports work from main"
      ],
      "practice": {
        "title": "Config loader",
        "brief": "load_config(path) → dict with try/except for missing file."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Python — Modules",
          "url": "https://docs.python.org/3/tutorial/modules.html",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "def, return, default args, type hints lite, import, project layout with src/ and tests/.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "py-files",
      "phase": "B · Structure",
      "level": "intermediate",
      "title": "Files, JSON & pathlib",
      "minutes": 40,
      "durationLabel": "Week 2–3",
      "overview": "with open(...) for files. json.load/dump. pathlib.Path for cross-platform paths. Test data lives in JSON.",
      "learn": [
        "with open context manager",
        "json module",
        "pathlib.Path",
        "Reading test fixtures"
      ],
      "steps": [
        {
          "title": "Read and write files",
          "body": "with open(path) as f: always closes the file. Specify encoding=\"utf-8\" on Windows.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write users.json with 3 users. Load in Python and print usernames.",
          "tip": null,
          "code": "import json\n\nwith open(\"users.json\", encoding=\"utf-8\") as f:\n    users = json.load(f)\n\nfor u in users:\n    print(u[\"username\"])",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "pathlib",
          "body": "Path(\"data/users.json\") / \"subdir\" — cleaner than os.path.join.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Refactor file paths to use pathlib.Path.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Write JSON output",
          "body": "json.dump(data, f, indent=2) for readable output files from glue scripts.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Script: read CSV or JSON → transform → write summary.json.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "JSON load/save works",
        "pathlib used",
        "utf-8 encoding explicit"
      ],
      "practice": {
        "title": "Fixture reader",
        "brief": "load_fixture(name) loads tests/fixtures/{name}.json."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Python — json",
          "url": "https://docs.python.org/3/library/json.html",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "with open(...) for files. json.load/dump. pathlib.Path for cross-platform paths. Test data lives in JSON.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "py-checkpoint-a",
      "kind": "checkpoint",
      "phase": "B · Structure",
      "level": "beginner",
      "title": "Checkpoint A — Syntax, modules & files",
      "minutes": 30,
      "durationLabel": "Gate · Week 3–4",
      "overview": "Before pytest and httpx, prove you can write clean Python in a proper project layout. Fix gaps before Phase C — the Playwright path assumes this baseline.",
      "learn": [
        "Self-assessment",
        "Project layout readiness"
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "You pass when all six are true. Audit py-journey. Fix failures this week.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Mark pass/fail for each criterion in README. Fix failures before continuing.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "venv activates; requirements.txt committed; no global pip installs for project deps",
            "src/ + tests/ layout with 5+ pure helper functions (no I/O in unit-testable ones)",
            "List comprehensions and dict .get used — not index errors on missing keys",
            "JSON load/save with pathlib.Path and encoding=\"utf-8\"",
            "Can explain why indentation matters and what a module is in 60 seconds",
            "Code pushed to GitHub with 3+ meaningful commits"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Code review yourself",
          "body": "Re-read helpers.py. Rename vague variables. Extract repeated logic. Remove dead code and print statements.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "30-minute refactor pass. Commit: \"refactor: checkpoint A cleanup\".",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Playwright bridge",
          "body": "Playwright path uses the same venv, pytest, and src/ layout. If checkpoint A is shaky, browser tests will hurt.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Note in README: \"Checkpoint A passed on [date]. Next: pytest chapter, then Playwright path for E2E.\"",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 6 pass criteria met",
        "Refactor commit pushed",
        "README updated with checkpoint date"
      ],
      "practice": {
        "title": "Rubber duck",
        "brief": "Explain venv, import, and json.load to an imaginary teammate in 3 minutes — no notes."
      },
      "parentId": null,
      "overviewText": "Before pytest and httpx, prove you can write clean Python in a proper project layout. Fix gaps before Phase C — the Playwright path assumes this baseline.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "py-pytest",
      "phase": "C · Testing",
      "level": "intermediate",
      "title": "pytest fundamentals",
      "minutes": 45,
      "durationLabel": "Week 3",
      "overview": "Arrange-act-assert. test_ prefix. assert directly. pytest discovers tests/ automatically.",
      "learn": [
        "pytest discovery",
        "assert style",
        "Running pytest",
        "Test naming"
      ],
      "steps": [
        {
          "title": "First tests",
          "body": "test_is_valid_email_true(), test_is_valid_email_false(). No unittest boilerplate.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "5 pytest tests for helpers from earlier chapters. pytest -v.",
          "tip": null,
          "code": "# tests/test_helpers.py\nfrom src.helpers import is_valid_email\n\ndef test_valid_email():\n    assert is_valid_email(\"a@b.com\") is True\n\ndef test_invalid_email():\n    assert is_valid_email(\"nope\") is False",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Arrange-act-assert",
          "body": "Setup data, call function, assert outcome. One logical assertion per test when possible.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Refactor one vague test into three focused tests.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Run and debug failures",
          "body": "pytest shows assertion diffs. pytest -k email runs subset. pytest --lf reruns last failures.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Break a test on purpose. Read failure output. Fix it.",
          "tip": "Keep tests fast — no network in unit tests. Mock or fixture files instead.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "5+ tests green",
        "pytest -v passes",
        "No network in unit tests"
      ],
      "practice": {
        "title": "Config tests",
        "brief": "Test load_config with missing file raises or returns default."
      },
      "resources": [
        {
          "type": "doc",
          "name": "pytest — Getting Started",
          "url": "https://docs.pytest.org/en/stable/getting-started.html",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Arrange-act-assert. test_ prefix. assert directly. pytest discovers tests/ automatically.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "py-fixtures",
      "phase": "C · Testing",
      "level": "intermediate",
      "title": "Fixtures & parametrization",
      "minutes": 40,
      "durationLabel": "Week 3–4",
      "overview": "@pytest.fixture for shared setup. @pytest.mark.parametrize for data-driven tests. conftest.py for shared fixtures.",
      "learn": [
        "@pytest.fixture",
        "parametrize",
        "conftest.py",
        "Fixture scope"
      ],
      "steps": [
        {
          "title": "Fixtures",
          "body": "Fixture functions provide test data or clients. pytest injects by parameter name.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create sample_users fixture returning list of dicts. Use in 2 tests.",
          "tip": null,
          "code": "import pytest\n\n@pytest.fixture\ndef sample_users():\n    return [{\"username\": \"a\"}, {\"username\": \"b\"}]\n\ndef test_user_count(sample_users):\n    assert len(sample_users) == 2",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Parametrize",
          "body": "Run same test logic with multiple inputs. Great for validation functions.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Parametrize is_valid_password with 4 cases: valid, empty, short, long.",
          "tip": null,
          "code": "@pytest.mark.parametrize(\"pwd,expected\", [\n    (\"secret123\", True),\n    (\"\", False),\n    (\"ab\", False),\n])\ndef test_password(pwd, expected):\n    assert is_valid_password(pwd) == expected",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "conftest.py",
          "body": "Shared fixtures live in tests/conftest.py — auto-discovered, no imports needed.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Move sample_users fixture to conftest.py.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Fixture used",
        "Parametrize with 3+ cases",
        "conftest.py exists"
      ],
      "practice": {
        "title": "URL builder tests",
        "brief": "Parametrize build_url with trailing slash edge cases."
      },
      "resources": [
        {
          "type": "doc",
          "name": "pytest — Fixtures",
          "url": "https://docs.pytest.org/en/stable/explanation/fixtures.html",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "@pytest.fixture for shared setup. @pytest.mark.parametrize for data-driven tests. conftest.py for shared fixtures.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "py-httpx",
      "phase": "D · HTTP",
      "level": "intermediate",
      "title": "httpx for API calls",
      "minutes": 45,
      "durationLabel": "Week 4–5",
      "overview": "Sync httpx for scripts; async httpx pairs with Playwright later. Status codes, JSON bodies, timeouts, basic auth headers.",
      "learn": [
        "httpx.Client",
        "GET/POST",
        "Status codes",
        "Timeouts and errors"
      ],
      "steps": [
        {
          "title": "GET request",
          "body": "httpx.get(url) or with Client() for connection reuse. response.raise_for_status() on errors.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Fetch jsonplaceholder users. Assert 200 and len(users) == 10.",
          "tip": null,
          "code": "import httpx\n\nresp = httpx.get(\"https://jsonplaceholder.typicode.com/users\", timeout=10.0)\nresp.raise_for_status()\nusers = resp.json()\nassert len(users) == 10",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "POST and headers",
          "body": "client.post(url, json={...}) sends JSON body. headers={\"Authorization\": \"Bearer ...\"} when needed.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "POST a new todo to jsonplaceholder. Print returned id.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Test API helpers",
          "body": "Extract fetch_users(client) → list. Unit test with httpx mock or fixture JSON — not live network.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write fetch_users using httpx. Test parsing with fixture file.",
          "tip": "Playwright path uses httpx for API-only tests — this chapter prepares you for that.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "GET script works",
        "POST tried once",
        "API helper has unit test"
      ],
      "practice": {
        "title": "Health check script",
        "brief": "CLI: check_urls.txt → GET each → print OK/FAIL with status."
      },
      "resources": [
        {
          "type": "doc",
          "name": "httpx — QuickStart",
          "url": "https://www.python-httpx.org/quickstart/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "JSONPlaceholder",
          "url": "https://jsonplaceholder.typicode.com/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Sync httpx for scripts; async httpx pairs with Playwright later. Status codes, JSON bodies, timeouts, basic auth headers.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "py-logging",
      "phase": "D · HTTP",
      "level": "intermediate",
      "title": "Errors, logging & CLI glue",
      "minutes": 40,
      "durationLabel": "Week 5",
      "overview": "try/except specific exceptions. logging module over print. argparse for CLI tools. ruff for lint/format.",
      "learn": [
        "try/except/else/finally",
        "logging levels",
        "argparse basics",
        "ruff format"
      ],
      "steps": [
        {
          "title": "Specific exceptions",
          "body": "Catch FileNotFoundError, httpx.HTTPStatusError — not bare except. Re-raise when you cannot handle.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Wrap httpx call: catch timeout and HTTP errors with clear messages.",
          "tip": null,
          "code": "try:\n    resp = httpx.get(url, timeout=5.0)\n    resp.raise_for_status()\nexcept httpx.TimeoutException:\n    logging.error(\"Timeout fetching %s\", url)\nexcept httpx.HTTPStatusError as e:\n    logging.error(\"HTTP %s for %s\", e.response.status_code, url)",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "logging over print",
          "body": "logging.info/warning/error with format. Control level via LOG_LEVEL env or flag.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Replace prints in glue script with logging.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "argparse CLI",
          "body": "argparse.ArgumentParser for --url, --verbose. Entry point if __name__ == \"__main__\".",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add CLI to health check: python -m src.health_check --file urls.txt -v",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Specific except used",
        "logging configured",
        "CLI with argparse"
      ],
      "practice": {
        "title": "Retry wrapper",
        "brief": "retry(fn, attempts=3, delay=1) with logging on failure."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Python — logging",
          "url": "https://docs.python.org/3/library/logging.html",
          "lang": "EN",
          "free": true
        },
        {
          "type": "tool",
          "name": "ruff",
          "url": "https://docs.astral.sh/ruff/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "try/except specific exceptions. logging module over print. argparse for CLI tools. ruff for lint/format.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "py-packaging",
      "phase": "E · Ship",
      "level": "intermediate",
      "title": "Packaging lite — pyproject.toml & entry points",
      "minutes": 40,
      "durationLabel": "Week 6–7",
      "overview": "You do not need to publish to PyPI yet. pyproject.toml declares project metadata and dependencies. pip install -e . makes your package importable. Entry points turn modules into CLI commands.",
      "learn": [
        "pyproject.toml basics",
        "pip install -e .",
        "Console scripts entry points",
        "src layout packaging"
      ],
      "steps": [
        {
          "title": "Minimal pyproject.toml",
          "body": "PEP 621 project table: name, version, dependencies. Build backend can be hatchling or setuptools — keep it minimal.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add pyproject.toml to py-journey with project name, version 0.1.0, dependencies from requirements.txt.",
          "tip": null,
          "code": "[project]\nname = \"py-journey\"\nversion = \"0.1.0\"\ndependencies = [\"httpx>=0.27\", \"pytest>=8.0\"]\n\n[build-system]\nrequires = [\"hatchling\"]\nbuild-backend = \"hatchling.build\"",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Editable install",
          "body": "pip install -e . installs package in development mode — imports work without PYTHONPATH hacks.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run pip install -e . in venv. Import from helpers without sys.path manipulation.",
          "tip": "Playwright frameworks use this pattern — src/ package + editable install in CI.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "CLI entry point",
          "body": "[project.scripts] health-check = \"py_journey.health_check:main\" maps command to function.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Wire health_check CLI as console script. Run health-check --help after install.",
          "tip": null,
          "code": "[project.scripts]\nhealth-check = \"py_journey.health_check:main\"",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "What you are not doing yet",
          "body": "No PyPI publish, no complex monorepos, no poetry vs pip debate. Just enough structure to share a tool across repos.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Document in README: how to clone, venv, pip install -e ., run tests.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "pyproject.toml committed",
        "pip install -e . works",
        "CLI entry point runs",
        "README documents install steps"
      ],
      "practice": {
        "title": "Shareable tool",
        "brief": "Extract retry() helper into installable subpackage. Friend clones repo and runs pip install -e . successfully."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Python Packaging User Guide",
          "url": "https://packaging.python.org/en/latest/tutorials/packaging-projects/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Hatchling — pyproject.toml",
          "url": "https://hatch.pypa.io/latest/config/project/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "You do not need to publish to PyPI yet. pyproject.toml declares project metadata and dependencies. pip install -e . makes your package importable. Entry points turn modules into CLI commands.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "py-checkpoint-b",
      "kind": "checkpoint",
      "phase": "E · Ship",
      "level": "advanced",
      "title": "Checkpoint B — Python automation-ready",
      "minutes": 35,
      "durationLabel": "Gate · Week 8–10",
      "overview": "Final gate: tested helpers, httpx literacy, logging, and packaging — the Python bar before claiming automation readiness or starting Playwright in earnest.",
      "learn": [
        "Portfolio readiness",
        "Interview Python topics"
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Verify every item. Fix gaps this week.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "py-journey: venv, pyproject.toml, src/ + tests/, 15+ pytest tests all green",
            "Fixtures + @pytest.mark.parametrize used; conftest.py for shared setup",
            "httpx helper with timeout, raise_for_status, and specific exception handling",
            "logging configured (not print) in at least one CLI script",
            "pip install -e . documented; health-check or equivalent entry point works",
            "Can explain list vs dict, fixture scope, and why venv in 2 minutes",
            "README links Playwright path as next step — browser automation not duplicated here"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Mock interview",
          "body": "Common QA Python questions: difference list/dict, what pytest fixture does, how to avoid global pip, sync vs async httpx (awareness).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Record 5-minute answers. Demo pytest -v and one httpx script live.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "What next",
          "body": "Playwright + Python path for browser tests. API-only tests combine httpx here with pytest patterns you already know.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write 3 ninety-day goals: Playwright POM, API test suite, CI green run.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 7 pass criteria met",
        "Mock interview recorded",
        "90-day goals written"
      ],
      "practice": {
        "title": "Green demo",
        "brief": "Screen record: pytest -v, run CLI tool, show pyproject.toml. Portfolio-ready."
      },
      "parentId": null,
      "overviewText": "Final gate: tested helpers, httpx literacy, logging, and packaging — the Python bar before claiming automation readiness or starting Playwright in earnest.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "py-reference",
      "kind": "guide",
      "phase": "Reference",
      "level": "beginner",
      "title": "Timeline, tools & cheat sheet",
      "minutes": 15,
      "overview": "Return when lost. Week map, daily tools, and interview quick hits for Python automation foundations.",
      "learn": [
        "10-week map",
        "Tool bookmarks",
        "Interview one-liners"
      ],
      "steps": [
        {
          "title": "Week map",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Weeks 1–2 — venv, syntax, functions",
            "Weeks 3–4 — files, JSON + Checkpoint A",
            "Weeks 5–6 — pytest, fixtures, httpx",
            "Weeks 7–8 — logging, packaging",
            "Weeks 9–10 — Checkpoint B + polish"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Daily tools",
          "body": "Official tutorial for syntax. pytest -v for regression. ruff check/format. httpx docs for API calls. venv always activated.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Bookmark this chapter. Pin docs.python.org and docs.pytest.org.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Interview quick hits",
          "body": "list vs tuple (mutable vs not). dict vs set. GIL awareness (lite). fixture vs setup method. why venv. try/except specific exceptions.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Maintain living doc docs/python-interview.md in repo.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Playwright pairing",
          "body": "This path = language + pytest + httpx. Playwright path = browser + POM + CI. Do not repeat browser chapters here.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "When Checkpoint B passes, open Playwright path at Chapter 1 or parallel track.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Week map understood",
        "Bookmarks saved",
        "Interview doc started"
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Return when lost. Week map, daily tools, and interview quick hits for Python automation foundations.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    }
  ],
  "resources": {
    "docs": [
      {
        "name": "Python Tutorial",
        "url": "https://docs.python.org/3/tutorial/"
      },
      {
        "name": "pytest docs",
        "url": "https://docs.pytest.org/"
      },
      {
        "name": "httpx docs",
        "url": "https://www.python-httpx.org/"
      },
      {
        "name": "Real Python",
        "url": "https://realpython.com/"
      },
      {
        "name": "Python Packaging Guide",
        "url": "https://packaging.python.org/"
      }
    ],
    "tools": [
      "CPython 3.11+",
      "venv",
      "pytest",
      "httpx",
      "ruff",
      "hatchling"
    ],
    "books": [
      "Python Crash Course (Matthes) — Part I",
      "Automate the Boring Stuff (Sweigart) — selective chapters"
    ],
    "practice": [
      "https://www.hackerrank.com/domains/python",
      "https://exercism.org/tracks/python",
      "Automate a folder rename script with pytest coverage"
    ],
    "videos": [
      {
        "name": "Corey Schafer — Python Playlist",
        "url": "https://www.youtube.com/playlist?list=PL-osiE80TeTt2P9rFLY6bfsImaqv0vDi-"
      },
      {
        "name": "Fireship — Python in 100 seconds",
        "url": "https://www.youtube.com/watch?v=x7X9w_GIm1s"
      }
    ]
  }
};
