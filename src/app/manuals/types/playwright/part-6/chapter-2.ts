import type { ChapterRecord } from "../../../types";

/** 30. Managing Test Suites at Scale */
export const chapter = {
  "id": "pw-6-scale",
  "title": "30. Managing Test Suites at Scale",
  "minutes": 45,
  "level": "pro",
  "phase": "Part 6 · Pro-Level Practices",
  "partName": "Part 6 · Pro-Level Practices",
  "overviewText": "Managing test suites at scale means moving beyond 'run everything every time' to a governance model where tests are tagged, selectively executed, flaky tests are tracked systematically, and results are linked back to requirements in test management tools. At scale, you layer multiple tagging dimensions — @pytest.mark.smoke, @pytest.mark.module_leave, @pytest.mark.critical — and combine them with boolean expressions (pytest -m \"smoke and module_leave\") for precise slicing. Flaky tests are tracked by pass rate over many runs, not just re-run until they pass. Custom pytest hooks (pytest_runtest_logreport) enable integrations like Slack notifications or TestRail result posting. Quarantining chronically flaky tests — marking them separately so they don't block CI while being actively fixed — is a professional practice that prevents one unreliable test from eroding trust in the entire suite.",
  "why": "A suite of 200 tests that takes 45 minutes to run on every pull request will be skipped, not waited for. Without selective execution, teams either run the full suite too rarely (missing regressions) or run it too often (blocking merges for 45 minutes). Without flaky-test tracking, the same three tests fail intermittently, developers add retries, and eventually nobody trusts a red CI build — they merge anyway. Systematic suite governance is what keeps automation valuable at scale rather than becoming a maintenance burden that teams quietly abandon.",
  "when": "Apply suite governance when your test count exceeds what you can comfortably run on every pull request (roughly 50–80 tests or 15+ minutes). Introduce marker-based selective execution first, then flaky-test tracking once you have at least 20 CI runs of history to analyze. Integrate with TestRail or Xray when stakeholders need to see requirement coverage mapped to automated test results — typically when the QA team has existing manual test case documentation to link against.",
  "practical": {
    "app": "Bizlevate HRMS — 180-test regression suite",
    "scenario": "A targeted deploy is going to the Leave module only. The team runs pytest -m \"smoke and module_leave\" — 12 tests in 3 minutes — instead of the full 180-test suite. One test, test_leave_request_approval_flow, has an 72% pass rate over the last 50 CI runs.",
    "pass": "The smoke + module_leave run completes in 3 minutes and all 12 tests pass. The flaky-test dashboard flags test_leave_request_approval_flow at 72% pass rate — the team quarantines it with @pytest.mark.quarantine, opens a fix ticket, and removes it from blocking CI runs while the race condition in the approval wait is fixed.",
    "fail": "Without selective execution, the team runs all 180 tests before every Leave deploy, waiting 45 minutes. test_leave_request_approval_flow fails 28% of the time; developers add --reruns 3, it still fails sometimes, and the team starts ignoring red CI builds."
  },
  "advantages": [
    "Marker-based selective execution runs only relevant tests — smoke in 3 minutes vs full suite in 45",
    "Boolean marker expressions (and, or, not) enable precise slicing by module, priority, and speed",
    "Flaky-test pass-rate tracking distinguishes genuine flakiness from real bugs",
    "Quarantine markers prevent one unreliable test from blocking the entire CI pipeline",
    "Custom pytest hooks enable Slack notifications and TestRail result posting without third-party plugins",
    "TestRail/Xray integration links automated results to manual test case IDs for stakeholder visibility"
  ],
  "limitations": [
    "Marker governance requires team discipline — unmarked tests fall outside selective execution",
    "Flaky-test tracking requires CI history infrastructure — not available out of the box with pytest alone",
    "Quarantined tests that are never fixed become permanent blind spots",
    "TestRail/Xray integration adds maintenance overhead — test case IDs must stay in sync with automation",
    "Custom pytest hooks are powerful but poorly documented — debugging hook issues is non-trivial"
  ],
  "tools": [
    {
      "name": "pytest markers",
      "sub": "Selective Execution",
      "url": "https://docs.pytest.org/en/stable/reference/reference.html#globalvar-pytest.mark",
      "desc": "pytest markers are labels attached to test functions that enable selective execution via the -m CLI flag. At scale, teams define multiple marker dimensions — smoke, regression, critical, module_leave, slow — and combine them with boolean expressions. pytest -m \"smoke and module_leave\" runs only smoke tests for the Leave module. pytest -m \"critical and not slow\" runs critical tests excluding known-slow ones. Markers must be registered in pytest.ini to avoid warnings.",
      "adv": [
        "Boolean expressions (and, or, not) enable precise test slicing without restructuring files",
        "Registered in pytest.ini — enforced and documented in one place",
        "Works with CI matrix strategies — different jobs run different marker combinations",
        "Zero code changes to tests — just add @pytest.mark decorators"
      ],
      "lim": [
        "Unmarked tests are excluded from selective runs — requires discipline to mark every test",
        "Complex boolean expressions become hard to read and maintain",
        "Marker definitions in pytest.ini must be kept in sync with actual usage",
        "No built-in UI for marker management — convention and documentation only"
      ],
      "steps": [
        {
          "t": "Step 1 — Register markers in pytest.ini",
          "p": "Define all marker dimensions:",
          "c": "[pytest]\nmarkers =\n    smoke: fast critical-path tests\n    regression: full regression suite\n    critical: must-pass before any deploy\n    module_leave: Leave module tests\n    slow: known slow tests (>30s)\n    quarantine: flaky tests excluded from blocking CI"
        },
        {
          "t": "Step 2 — Tag tests with multiple markers",
          "p": "Layer dimensions on each test:",
          "c": "@pytest.mark.smoke\n@pytest.mark.module_leave\n@pytest.mark.critical\ndef test_leave_request_approval_flow(page):\n    ..."
        },
        {
          "t": "Step 3 — Run selective subsets",
          "p": "Execute precise slices:",
          "c": "pytest -m \"smoke and module_leave\"        # 12 tests, ~3 min\npytest -m \"critical and not slow\"           # critical, fast tests\npytest -m \"not quarantine\"                  # exclude flaky tests from CI"
        }
      ]
    },
    {
      "name": "TestRail",
      "sub": "Test Management",
      "url": "https://www.testrail.com",
      "desc": "TestRail is a test case management tool that tracks manual and automated test cases, links them to requirements, and records pass/fail history over time. Integration with Playwright involves tagging automated tests with TestRail case IDs (@pytest.mark.testrail_id('C1234')) and posting results back via the TestRail API after each CI run. This gives stakeholders a single view of requirement coverage — manual and automated — without requiring them to read pytest output.",
      "adv": [
        "Links automated test results to manual test case IDs — stakeholders see coverage in one place",
        "Pass/fail history per test case over time — complements flaky-test tracking",
        "Requirement traceability — shows which user stories are covered by automation",
        "API integration allows automated result posting from CI without manual entry"
      ],
      "lim": [
        "Commercial tool — requires a license",
        "Test case IDs must be manually maintained in test decorators",
        "Integration requires custom pytest hook or plugin — not built into pytest-playwright",
        "Value depends on existing manual test case documentation — less useful for automation-only teams"
      ],
      "steps": [
        {
          "t": "Step 1 — Tag tests with TestRail case IDs",
          "p": "Add the case ID as a marker:",
          "c": "@pytest.mark.testrail_id(\"C1234\")\ndef test_leave_request_approval_flow(page):\n    ..."
        },
        {
          "t": "Step 2 — Post results via TestRail API in a pytest hook",
          "p": "Add to conftest.py:",
          "c": "def pytest_runtest_logreport(report):\n    if report.when == \"call\":\n        case_id = getattr(report, \"testrail_id\", None)\n        if case_id:\n            # POST result to TestRail API\n            post_result(case_id, \"passed\" if report.passed else \"failed\")"
        }
      ]
    }
  ],
  "contentMarkdown": "Test tagging and selective execution across large suites Building directly on Chapter 13's markers, at scale you typically layer multiple tagging dimensions rather than one flat list: @pytest.mark.smoke @pytest.mark.module_leave @pytest.mark.critical def test_leave_request_approval_flow(): ... pytest -m \"smoke and module_leave\" # only smoke tests for the Leave module pytest -m \"critical and not sl\n\n## Test tagging and selective execution across large suites\n\nBuilding directly on Chapter 13's markers, at scale you typically layer multiple tagging dimensions rather than one flat list:\n\n...\n\nPointers: Combine markers with boolean expressions (and, or, not) for precise slicing — e.g., running just the critical-path tests for one module before a targeted deploy, without running the entire suite.\n\n```\npytest -m \"smoke and module_leave\"        # only smoke tests for the Leave module\n\npytest -m \"critical and not slow\"          # critical tests, excluding known-slow ones\n\n@pytest.mark.smoke\n\n@pytest.mark.module_leave\n\n@pytest.mark.critical\n\ndef test_leave_request_approval_flow():\n```\n\n## Diagnosing and managing flaky tests systematically\n\nRather than just re-running a failing test until it passes, track flakiness data over time to distinguish \"genuinely flaky\" from \"actually broken.\"\n\nPointers: A dedicated flaky-test dashboard (many teams build this from CI history, or use a plugin/tool that tracks pass rate per test over many runs) is the professional approach — a test with an 80% pass rate over the last 50 runs is a real signal worth investigating (race condition, bad wait, shared test data), not something to just keep re-running around. Quarantining chronically flaky tests (marking them separately so\n\nthey don't block CI while being actively fixed) is a common practice rather than letting them erode trust in the whole suite.\n\n```\n# A simple pattern: log every retry attempt with pytest-rerunfailures\n\npytest --reruns 2 --reruns-delay 1 -v\n```\n\n## Writing custom reporters/plugins\n\nPytest's plugin system (hooks) lets you customize behavior beyond built-in options — e.g., posting results to a team Slack channel, or reshaping output for a specific tool.\n\nWhat it does: A hook function pytest automatically calls after each test phase (setup/call/teardown), letting you react to results programmatically.\n\nTypes/params:\n\n(\"setup\"/\"call\"/\"teardown\"), .outcome, .passed/.failed/.skipped,\n\n.nodeid (the test's identifier)\n\nPointers: Custom hooks are pytest's extension mechanism — worth knowing they exist even if you don't write one immediately, since they're how most third-party pytest plugins (including pytest-html, pytest-rerunfailures themselves) are actually built.\n\n```\n# conftest.py\n\ndef pytest_runtest_logreport(report):\n\nif report.when == \"call\" and report.failed:\n\n# e.g., send a Slack notification, log to a custom system, etc.\n\nprint(f\"FAILED: {report.nodeid}\")\n\npytest_runtest_logreport(report) (pytest hook)\n```\n\n## Integrating with test management tools (TestRail, Xray)\n\nThese tools track manually-written test cases and requirements; integration links automated test results back to that tracking, so a stakeholder can see \"requirement X is covered by automated test Y, currently passing.\"\n\n...\n\nPointers: This is a strong area to lean into given your QA documentation background — the mapping between manual test cases (which you likely already know how to write well) and automated test IDs is often the piece automation-only engineers overlook, and it's exactly the kind of cross-functional value a QA-background-plus-automation-skills profile brings to a team.\n\n```\n# Common pattern: tag tests with the TestRail/Xray case ID\n\n@pytest.mark.testrail_id(\"C1234\")\n\ndef test_leave_request_approval_flow():\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
