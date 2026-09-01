import type { ChapterRecord } from "../../../types";

/** 13. Test Organization */
export const chapter = {
  "id": "pw-3-org",
  "title": "13. Test Organization",
  "minutes": 40,
  "level": "intermediate",
  "phase": "Part 3 · Test Structure & Framework",
  "partName": "Part 3 · Test Structure & Framework",
  "overviewText": "Test organization in pytest means structuring a growing Playwright suite so you can run the right tests at the right time without executing all 400 cases before every commit. Markers (@pytest.mark.smoke, @pytest.mark.regression) tag individual tests for selective execution via pytest -m smoke. Parametrized tests (@pytest.mark.parametrize) run one test function multiple times with different input tuples, producing distinct entries in the report for each combination. Folder structure (tests/smoke/, tests/regression/, tests/modules/) provides a second slicing axis independent of markers — run pytest tests/smoke/ for a fast pre-deploy check or pytest -m \"not regression\" to skip slow edge-case suites. Custom markers must be registered in pytest.ini to avoid unknown-marker warnings and to document what each tag means for the team.",
  "why": "An unorganized suite forces every CI run to execute every test — a 45-minute full regression before a one-line CSS fix can merge. Markers and folder structure let teams run a 3-minute smoke subset on every push and reserve the full regression for nightly or pre-release gates. Parametrization eliminates copy-pasted test functions that differ only in input data; when login validation rules change, you update one function instead of three near-identical copies.",
  "when": "Introduce markers as soon as you have tests with clearly different run-frequency needs (smoke vs regression vs critical). Use parametrization whenever you catch yourself writing the same test logic with different hardcoded inputs. Reorganize into feature folders when individual test files exceed ~200 lines or when new team members cannot find where to add a test for a given module.",
  "practical": {
    "app": "HRMS — Login validation suite",
    "scenario": "Three separate test functions verify empty username, empty password, and wrong password errors — each copy-pastes the same goto/fill/click sequence. Refactoring to a single parametrized test with three tuples cuts maintenance to one function; adding a fourth case (expired password) is one new tuple, not a new file.",
    "pass": "pytest -m smoke runs 8 critical-path tests in 90 seconds before deploy; pytest -m regression runs the full 120-case suite overnight.",
    "fail": "Every CI push runs all 120 tests including slow edge cases; a login label change breaks three copy-pasted tests that each hardcode different invalid credentials."
  },
  "advantages": [
    "Markers enable selective execution — smoke in minutes, full regression on schedule",
    "Parametrization produces one test per input combination in reports, pinpointing exact failing data",
    "Folder + marker dual slicing gives flexibility for both directory-based and tag-based CI jobs",
    "Registered markers in pytest.ini document team vocabulary and suppress warnings"
  ],
  "limitations": [
    "Marker sprawl — ad-hoc tags like @pytest.mark.johns_test become useless for filtering",
    "Over-parametrized tests with 50+ tuples produce noisy reports hard to scan",
    "Folder structure alone does not prevent a smoke-tagged test from living deep in a feature folder unless markers are also applied",
    "Parametrization shares one test body — if one input needs genuinely different setup, a separate test is cleaner"
  ],
  "tools": [
    {
      "name": "pytest.mark",
      "sub": "Test tagging",
      "url": "https://docs.pytest.org/en/stable/how-to/mark.html",
      "desc": "pytest.mark attaches metadata tags to test functions for selective execution and categorization. Built-in markers include skip, skipif, and xfail; custom markers like smoke and regression are team-defined. Register custom markers in pytest.ini under [pytest] markers = to document their purpose and prevent PytestUnknownMarkWarning. Filter at runtime with pytest -m smoke (include) or pytest -m \"not regression\" (exclude).",
      "adv": [
        "Run only the tests relevant to the current CI stage",
        "Combine markers with boolean expressions: -m \"smoke and not slow\"",
        "Self-documenting when registered in pytest.ini with descriptions",
        "Works on individual functions or entire classes"
      ],
      "lim": [
        "Unregistered custom markers emit warnings on every run",
        "No built-in enforcement — a test can lack a marker it should have",
        "Marker vocabulary requires team agreement to stay useful",
        "Does not replace folder organization for large suites"
      ],
      "steps": [
        {
          "t": "Step 1 — Register markers in pytest.ini",
          "p": "Document each marker's purpose:",
          "c": "# pytest.ini\n[pytest]\nmarkers =\n    smoke: quick critical-path tests for pre-deploy\n    regression: full edge-case and integration tests"
        },
        {
          "t": "Step 2 — Tag test functions",
          "p": "Apply markers above the test definition:",
          "c": "import pytest\n\n@pytest.mark.smoke\ndef test_login_works(page):\n    page.goto(\"https://app.example.com/login\")\n    page.get_by_label(\"Username\").fill(\"testuser\")\n    page.get_by_label(\"Password\").fill(\"testpass\")\n    page.get_by_role(\"button\", name=\"Log in\").click()\n    expect(page.get_by_text(\"Welcome\")).to_be_visible()\n\n@pytest.mark.regression\ndef test_login_special_characters_in_username(page):\n    ..."
        },
        {
          "t": "Step 3 — Run filtered subsets",
          "p": "Execute only tagged tests from the command line:",
          "c": "pytest -m smoke\npytest -m \"not regression\"\npytest tests/smoke/    # folder-based filtering"
        }
      ]
    },
    {
      "name": "pytest.mark.parametrize",
      "sub": "Data-driven tests",
      "url": "https://docs.pytest.org/en/stable/how-to/parametrize.html",
      "desc": "pytest.mark.parametrize runs a single test function once per tuple of argument values. Each tuple becomes a distinct test case in the report with the values appended to the test name (e.g., test_login_validation[validuser-wrongpass-Invalid credentials]). This is the pytest-native way to implement data-driven testing without duplicating test logic across nearly identical functions.",
      "adv": [
        "One test function covers many input combinations — single point of maintenance",
        "Each parameter set appears as a separate test in reports for precise failure identification",
        "Easy to add new cases — append a tuple, no new function needed",
        "Combines with fixtures — parametrized tests can also request page, logged_in_page, etc."
      ],
      "lim": [
        "All parameter sets share identical test logic — divergent setup needs separate tests",
        "Large parameter lists (30+ tuples) produce long report names",
        "Cannot parametrize individual steps within a test — only the function's parameters",
        "Complex nested data is better loaded from JSON/CSV fixtures (Chapter 16)"
      ],
      "steps": [
        {
          "t": "Step 1 — Define parametrized login validation",
          "p": "One function, three input combinations:",
          "c": "import pytest\nfrom playwright.sync_api import expect\n\n@pytest.mark.parametrize(\"username,password,expected_error\", [\n    (\"\", \"validpass\", \"Username is required\"),\n    (\"validuser\", \"\", \"Password is required\"),\n    (\"validuser\", \"wrongpass\", \"Invalid credentials\"),\n])\ndef test_login_validation(page, username, password, expected_error):\n    page.goto(\"https://app.example.com/login\")\n    page.get_by_label(\"Username\").fill(username)\n    page.get_by_label(\"Password\").fill(password)\n    page.get_by_role(\"button\", name=\"Log in\").click()\n    expect(page.get_by_text(expected_error)).to_be_visible()"
        },
        {
          "t": "Step 2 — Run and inspect report output",
          "p": "Each tuple appears as a separate test result:",
          "c": "pytest test_login.py -v\n# test_login_validation[] PASSED\n# test_login_validation[validuser--Password is required] PASSED\n# test_login_validation[validuser-wrongpass-Invalid credentials] PASSED"
        }
      ]
    }
  ],
  "contentMarkdown": "## Why Organization Matters\n\nA Playwright suite grows fast. Without structure, you end up with 200 tests in one folder, no way to run a quick smoke check before deploy, and duplicated login code in every file. pytest gives you **markers**, **parametrize**, and conventional folder layouts to keep large suites navigable.\n\n## Folder Structure\n\nA practical layout separates concerns by feature and test type:\n\n```\ntests/\n  conftest.py\n  pytest.ini\n  e2e/\n    conftest.py\n    smoke/\n      test_login.py\n      test_homepage.py\n    regression/\n      test_checkout.py\n      test_user_settings.py\n    pages/\n      base_page.py\n      login_page.py\n    data/\n      users.json\n```\n\n- `smoke/` — fast, critical-path tests run on every PR.\n- `regression/` — broader coverage run nightly or pre-release.\n- `pages/` — Page Object classes (Chapter 14).\n- `data/` — JSON or CSV test data files.\n\nPoint pytest at the right subtree:\n\n```bash\npytest tests/e2e/smoke/          # smoke only\npytest tests/e2e/regression/     # full regression\n```\n\n## Markers — Label and Filter Tests\n\nMarkers tag tests with metadata. Register them in `pytest.ini` so typos fail loudly:\n\n```ini\n[pytest]\nmarkers =\n    smoke: critical path, run on every PR\n    regression: full coverage, run nightly\n    slow: tests that take > 30 seconds\n```\n\nApply markers to tests:\n\n```python\nimport pytest\nfrom playwright.sync_api import Page, expect\n\n@pytest.mark.smoke\ndef test_login_page_loads(page: Page):\n    page.goto(\"/login\")\n    expect(page.get_by_role(\"heading\", name=\"Sign in\")).to_be_visible()\n\n@pytest.mark.regression\n@pytest.mark.slow\ndef test_full_checkout_flow(page: Page):\n    # multi-step flow ...\n    pass\n```\n\nRun subsets from the CLI:\n\n```bash\npytest -m smoke                  # only smoke tests\npytest -m \"smoke and not slow\"   # smoke, skip slow ones\npytest -m regression             # nightly suite\n```\n\n## Smoke vs Regression Grouping\n\n| Group | Goal | Typical count | When to run |\n|-------|------|---------------|-------------|\n| Smoke | Prove the app is alive | 5–15 tests | Every commit / PR |\n| Regression | Broad feature coverage | 50–500+ tests | Nightly, pre-release |\n\nSmoke tests should complete in under five minutes total. They cover login, one read path, and one write path. Regression tests exercise edge cases, error states, and multi-step workflows.\n\nIn CI pipelines, run smoke on every push and regression on a schedule:\n\n```yaml\n# GitHub Actions example\n- name: Smoke tests\n  run: pytest -m smoke --browser chromium\n\n- name: Regression (nightly)\n  if: github.event_name == 'schedule'\n  run: pytest -m regression --browser chromium\n```\n\n## Parametrize — One Test, Many Inputs\n\n`@pytest.mark.parametrize` runs the same test logic with different data without copy-pasting:\n\n```python\nimport pytest\nfrom playwright.sync_api import Page, expect\n\n@pytest.mark.parametrize(\"email,password,expected_error\", [\n    (\"\", \"secret\", \"Email is required\"),\n    (\"bad@\", \"secret\", \"Invalid email format\"),\n    (\"qa@example.com\", \"\", \"Password is required\"),\n    (\"qa@example.com\", \"wrong\", \"Invalid credentials\"),\n])\ndef test_login_validation(page: Page, email, password, expected_error):\n    page.goto(\"/login\")\n    page.get_by_label(\"Email\").fill(email)\n    page.get_by_label(\"Password\").fill(password)\n    page.get_by_role(\"button\", name=\"Sign in\").click()\n    expect(page.get_by_role(\"alert\")).to_contain_text(expected_error)\n```\n\nEach tuple becomes a separate test case in the report — failures show exactly which input broke.\n\nParametrize works with fixtures too:\n\n```python\n@pytest.mark.parametrize(\"browser_name\", [\"chromium\", \"firefox\", \"webkit\"])\ndef test_cross_browser(page, browser_name):\n    page.goto(\"/\")\n    expect(page).to_have_title(\"My App\")\n```\n\n## Combining Markers and Parametrize\n\nStack decorators — parametrize expands first, then markers apply to every generated test:\n\n```python\n@pytest.mark.smoke\n@pytest.mark.parametrize(\"path\", [\"/\", \"/pricing\", \"/about\"])\ndef test_public_pages_load(page, path):\n    page.goto(path)\n    expect(page).not_to_have_title(\"\")\n```\n\n## Naming Conventions\n\nConsistent names make failures scannable:\n\n- Files: `test_<feature>.py` (pytest discovers `test_*` files automatically).\n- Functions: `test_<action>_<expected_outcome>` — e.g., `test_login_with_valid_credentials_redirects_to_dashboard`.\n- Markers: lowercase, no spaces — `smoke`, not `Smoke Test`.\n\n## Key Takeaways\n\n- Split tests into `smoke/` and `regression/` folders; register markers in `pytest.ini`.\n- Use `-m smoke` in CI for fast feedback; run regression on a schedule.\n- Parametrize validation and boundary cases instead of duplicating test functions.\n- Keep smoke suites under five minutes — if they grow, promote only the most critical paths.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
