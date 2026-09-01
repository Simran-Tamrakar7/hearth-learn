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
  "contentMarkdown": "Markers Markers tag tests so you can selectively run subsets instead of the entire suite every time. python import pytest @pytest.mark.smoke def test_login_works(): ...\n\n## Overview\n\nMarkers Markers tag tests so you can selectively run subsets instead of the entire suite every time. python\n\n...\n\n...\n\nbash\n\nCustom markers need to be registered in pytest.ini (Chapter 15) or pytest will emit a warning about unknown markers.\n\nWhat it does: Attaches a tag to a test function, usable later to filter which tests run. Types/params:\n\nPointers: Use consistent, small marker vocabulary across the team (smoke, regression, critical) rather than ad-hoc one-off tags — otherwise -m filtering becomes unreliable. Parametrized tests Instead of writing near-identical test functions for different inputs, parametrize one test function to run multiple times with different data. python\n\n(\"\", \"validpass\", \"Username is required\"),\n\n(\"validuser\", \"\", \"Password is required\"),\n\n(\"validuser\", \"wrongpass\", \"Invalid credentials\"),\n\n])\n\nThis runs as three separate test cases in the report, each clearly showing which input combination passed/failed — far more maintainable than three nearly-identical copy-pasted test functions.\n\n## Overview (2)\n\nWhat it does: Runs the same test function once per set of provided argument values. Types/params:\n\nfunction will receive, e.g. \"username,password,expected_error\"\n\nPointers: Each parameter set shows up as a distinct test in reports (e.g., test_login_validation[validuser-wrongpass-Invalid credentials]), making failures easy to pinpoint to a specific data combination. Grouping/tagging tests (smoke, regression) Beyond individual markers, teams typically organize entire folders by test type or feature area:\n\ntests/\n\n├── smoke/\n\n│ └── test_critical_paths.py\n\n├── regression/\n\n│ └── test_edge_cases.py\n\n└── modules/\n\n├── test_leave_management.py\n\n└── test_attendance.py\n\nCombined with markers, this gives two independent ways to slice the suite — by folder (pytest tests/smoke/) or by tag (pytest -m smoke) — useful since a \"smoke\" test might live logically inside a feature folder but still need to run as part of a fast pre-deploy check.\n\n## Overview\n\n\n\n```\ndef test_login_validation(page, username, password, expected_error):\n\npage.get_by_label(\"Username\").fill(username)\n\npage.get_by_label(\"Password\").fill(password)\n\npage.get_by_role(\"button\", name=\"Log in\").click()\n\nexpect(page.get_by_text(expected_error)).to_be_visible()\n\npytest -m smoke        # run only smoke-tagged tests\n\npytest -m \"not regression\"   # run everything except regression tests\n\n@pytest.mark.regression\n\ndef test_edge_case_special_characters_in_username():\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
