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
  "contentMarkdown": "## Marker expressions for selective execution\n\npytest markers let you tag tests by priority, feature, or environment and run subsets without maintaining separate files.\n\n```python\n# pytest.ini\n[pytest]\nmarkers =\n    smoke: fast critical-path tests for PR gate\n    regression: full suite for nightly runs\n    leave: leave module tests\n    payroll: payroll module tests\n    flaky: known intermittent — retry enabled\n```\n\n```python\nimport pytest\n\n@pytest.mark.smoke\ndef test_login_redirects_to_dashboard(page):\n    page.goto(\"/login\")\n    page.get_by_label(\"Email\").fill(\"user@example.com\")\n    page.get_by_label(\"Password\").fill(\"password\")\n    page.get_by_role(\"button\", name=\"Sign in\").click()\n    page.wait_for_url(\"**/dashboard\")\n\n@pytest.mark.regression\n@pytest.mark.leave\ndef test_submit_leave_request(page, leave_page):\n    leave_page.open()\n    leave_page.submit_request(\"Annual\", \"2026-10-01\", \"2026-10-03\")\n```\n\n```bash\n# PR gate — smoke only\npytest -m smoke\n\n# Nightly — everything except flaky\npytest -m \"regression and not flaky\"\n\n# Module team — leave tests only\npytest -m leave\n\n# Combine markers with boolean logic\npytest -m \"(smoke or leave) and not flaky\"\n```\n\nDocument markers in `pytest.ini` so `pytest --markers` shows descriptions — this prevents marker sprawl and naming collisions.\n\n## Diagnosing flaky tests\n\nA flaky test passes and fails non-deterministically. Systematic diagnosis beats random reruns.\n\n```bash\n# Run a suspected flaky test 20 times\npytest tests/modules/test_leave.py::test_approve_request --count=20\n\n# Run with trace on every attempt\npytest tests/modules/test_leave.py::test_approve_request --count=10 --tracing=on\n```\n\nCommon root causes and fixes:\n\n| Symptom | Likely cause | Fix |\n|---------|-------------|-----|\n| Timeout on locator | Race condition — element not ready | Use `wait_for` with explicit state |\n| Passes headed, fails headless | Animation or timing | Wait for `networkidle` or disable animations |\n| Fails only in CI | Slow runner, missing deps | Increase timeout; check `--with-deps` |\n| Fails at month boundary | Hardcoded dates | Use relative dates via factory |\n| Intermittent 500 errors | Shared test data collision | Isolate data per test with factories |\n\n```python\n# Bad — races the UI\npage.click(\"#submit\")\nassert page.locator(\".success\").is_visible()\n\n# Good — waits for the outcome\npage.get_by_role(\"button\", name=\"Submit\").click()\npage.get_by_text(\"Request submitted\").wait_for(state=\"visible\")\n```\n\n## pytest hooks for suite-wide behavior\n\nHooks centralize logic that would otherwise be copy-pasted across conftest files.\n\n```python\n# conftest.py\nimport pytest\n\ndef pytest_collection_modifyitems(config, items):\n    \"\"\"Auto-skip tests marked @pytest.mark.staging when not on staging.\"\"\"\n    if not config.getoption(\"--staging\"):\n        skip_staging = pytest.mark.skip(reason=\"requires --staging flag\")\n        for item in items:\n            if \"staging\" in item.keywords:\n                item.add_marker(skip_staging)\n\ndef pytest_runtest_setup(item):\n    \"\"\"Log marker composition before each test.\"\"\"\n    markers = [m.name for m in item.iter_markers()]\n    if markers:\n        print(f\"\\nRunning {item.name} with markers: {markers}\")\n\n@pytest.hookimpl(tryfirst=True, hookwrapper=True)\ndef pytest_runtest_makereport(item, call):\n    outcome = yield\n    report = outcome.get_result()\n    if report.when == \"call\" and report.failed:\n        # Quarantine: auto-add flaky marker after 3 CI failures (custom logic)\n        item._failure_count = getattr(item, \"_failure_count\", 0) + 1\n```\n\nUse `pytest_collection_modifyitems` to skip or reorder tests based on environment. Use `pytest_runtest_makereport` for failure artifacts and quarantine tracking.\n\n## TestRail integration\n\nTestRail links automated test results to manual test cases, giving QA managers a single view of coverage and pass rates.\n\n```bash\npip install trcli\n```\n\n```bash\n# Export pytest JUnit XML\npytest --junitxml=results.xml\n\n# Upload to TestRail\ntrcli -y \\\n  -h https://yourcompany.testrail.io \\\n  --project \"HRMS Automation\" \\\n  --username $TESTRAIL_USER \\\n  --password $TESTRAIL_KEY \\\n  parse_junit \\\n  --title \"Nightly Run $(date +%Y-%m-%d)\" \\\n  -f results.xml\n```\n\n```python\n# Map pytest test IDs to TestRail case IDs via markers\n@pytest.mark.testrail(\"C1234\")\n@pytest.mark.smoke\ndef test_login_redirects_to_dashboard(page):\n    ...\n```\n\nAdd the TestRail upload step to your nightly CI pipeline after JUnit XML generation. PR smoke runs typically skip TestRail to keep feedback fast.\n\n## Suite health metrics\n\nTrack these weekly: flake rate (failures that pass on retry), average runtime per marker, tests with no assertions, and tests that have not failed in 90 days (possibly obsolete). A suite that grows without pruning becomes slower and less trusted than no suite at all.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
