import type { ChapterRecord } from "../../../types";

/** 28. Logging & Error Handling */
export const chapter = {
  "id": "pw-5-logging",
  "title": "28. Logging & Error Handling",
  "minutes": 35,
  "level": "advanced",
  "phase": "Part 5 · CI/CD & Reporting",
  "partName": "Part 5 · CI/CD & Reporting",
  "overviewText": "Logging and error handling in Playwright test suites means going beyond raw pytest console output to produce readable, actionable evidence when tests fail — especially in CI where you cannot watch the browser run in real time. Python's logging module adds timestamped narrative traces of what each test was doing before it broke. pytest-playwright's --screenshot and --video flags automatically capture visual evidence on failure. pytest-rerunfailures adds controlled retry logic for genuinely flaky tests. Together, these three layers transform a CI failure from a cryptic stack trace into a debuggable incident with context, visuals, and a clear decision on whether the failure is a real bug or environmental noise.",
  "why": "A test that fails in CI with only 'AssertionError: expected True, got False' forces someone to re-run it locally, watch it manually, and guess what went wrong. That cycle can take hours. Custom logging tells you what the test was doing ('Navigated to login page', 'Filled username field') right before the assertion failed. A screenshot shows the actual UI state at failure — maybe the page hadn't loaded, maybe a modal was blocking the button. Video replay shows the full sequence of events. Without these, debugging CI failures is archaeology. With them, it is diagnosis.",
  "when": "Add custom logging from the first CI integration — INFO-level logs are cheap and immediately useful when reading CI output. Enable --screenshot=only-on-failure and --video=retain-on-failure in your CI pytest command from day one. Add pytest-rerunfailures only after you have a flaky-test tracking process (Chapter 30) — retries are for genuine environmental noise, not a substitute for fixing real bugs.",
  "practical": {
    "app": "Bizlevate HRMS — Attendance module CI run",
    "scenario": "test_mark_attendance_for_today fails in GitHub Actions. The CI log shows logger.info entries tracing navigation steps, and the uploaded failure screenshot reveals a 'Session expired' banner that was not present during local runs.",
    "pass": "The screenshot artifact shows the session-expired banner clearly. The developer identifies that the session-reuse fixture (Chapter 20) expired mid-run due to a short token TTL on staging. The fixture is updated to refresh tokens proactively. The test passes on the next CI run.",
    "fail": "Without logging or screenshots, the CI log shows only 'TimeoutError: waiting for locator button[name=\"Mark Attendance\"]'. The developer re-runs locally (passes), re-runs in CI (passes), and marks the test as flaky — adding retries instead of fixing the session expiry bug that will fail again under load."
  },
  "advantages": [
    "Custom logging provides a readable narrative of test actions in CI output without opening code",
    "Screenshot-on-failure captures exact UI state at the moment of assertion failure",
    "Video-on-failure replays the full browser session — invaluable for timing-related bugs",
    "pytest-rerunfailures handles genuine environmental flakiness without masking real bugs",
    "All three integrate with GitHub Actions artifact upload for post-run review",
    "INFO-level logging adds negligible overhead — no reason not to enable it from the start"
  ],
  "limitations": [
    "Logging adds noise if set to DEBUG level — INFO is the right default for test runs",
    "Screenshots and videos on every test (not just failures) generate large artifact storage",
    "Retry logic can mask real bugs if rerun count is set too high without flaky-test tracking",
    "Videos are large — retain-on-failure is essential to avoid CI storage bloat",
    "Custom logging requires discipline — log statements must be maintained as tests evolve",
    "Screenshots show a single frame — they miss transient UI states that video captures"
  ],
  "tools": [
    {
      "name": "Python logging",
      "sub": "Standard Library",
      "url": "https://docs.python.org/3/library/logging.html",
      "desc": "Python's built-in logging module configures structured, timestamped log output for test runs. logging.basicConfig sets the minimum severity level and output format for the whole run. logger.info() calls inside test functions and page objects produce a readable trace of actions in CI output — 'Starting login test', 'Navigated to login page', 'Filled username field' — that tells you exactly where a test was when it failed, without opening the test source code.",
      "adv": [
        "Zero dependencies — part of Python standard library",
        "INFO level provides useful narrative without DEBUG noise",
        "Integrates with pytest output — logs appear inline in CI console",
        "logger instances per module (logging.getLogger(__name__)) keep output organized"
      ],
      "lim": [
        "No built-in log aggregation — CI log volume grows with suite size",
        "Log statements must be manually maintained as tests change",
        "Does not capture visual state — pairs with screenshots, not replaces them",
        "DEBUG level on a large suite produces overwhelming output"
      ],
      "steps": [
        {
          "t": "Step 1 — Configure logging in conftest.py",
          "p": "Set up once for the whole suite:",
          "c": "import logging\n\nlogging.basicConfig(\n    level=logging.INFO,\n    format=\"%(asctime)s - %(levelname)s - %(message)s\"\n)"
        },
        {
          "t": "Step 2 — Add log statements to tests and page objects",
          "p": "Trace key actions:",
          "c": "logger = logging.getLogger(__name__)\n\ndef test_login(page):\n    logger.info(\"Starting login test\")\n    page.goto(\"https://app.example.com/login\")\n    logger.info(\"Navigated to login page\")\n    page.get_by_label(\"Username\").fill(\"testuser\")\n    logger.info(\"Filled username field\")"
        },
        {
          "t": "Step 3 — Review logs in CI output",
          "p": "After a CI failure, read the log lines immediately before the assertion error:",
          "c": "2026-08-10 14:32:01 - INFO - Starting login test\n2026-08-10 14:32:03 - INFO - Navigated to login page\n2026-08-10 14:32:03 - INFO - Filled username field\nAssertionError: Login button not visible"
        }
      ]
    },
    {
      "name": "pytest-playwright screenshot/video",
      "sub": "Failure Evidence",
      "url": "https://playwright.dev/python/docs/test-runners",
      "desc": "pytest-playwright supports --screenshot and --video CLI flags that automatically capture visual evidence during test runs. --screenshot=only-on-failure saves a PNG at the moment of assertion failure. --video=retain-on-failure saves a WebM video of the full browser session for failed tests only. Both integrate with GitHub Actions artifact upload so failure evidence is downloadable after CI runs without re-running locally.",
      "adv": [
        "Zero code changes — CLI flags only",
        "only-on-failure and retain-on-failure avoid storage bloat from passing tests",
        "Screenshots show exact UI state at the moment of failure",
        "Videos replay the full browser session — catch timing and animation bugs"
      ],
      "lim": [
        "Screenshots are a single frame — miss transient states between actions",
        "Videos add execution overhead and storage size even with retain-on-failure",
        "Artifacts must be explicitly uploaded in CI — not automatic",
        "Headless screenshot rendering may differ slightly from headed local runs"
      ],
      "steps": [
        {
          "t": "Step 1 — Add flags to your pytest CI command",
          "p": "Enable screenshot and video capture on failure:",
          "c": "pytest --browser chromium \\\n  --screenshot=only-on-failure \\\n  --video=retain-on-failure"
        },
        {
          "t": "Step 2 — Upload failure artifacts in GitHub Actions",
          "p": "Add artifact upload for the test-results directory:",
          "c": "- name: Upload failure evidence\n  if: failure()\n  uses: actions/upload-artifact@v4\n  with:\n    name: test-failures\n    path: test-results/"
        },
        {
          "t": "Step 3 — Review screenshot after a CI failure",
          "p": "Download the artifact, open the PNG for the failed test:",
          "c": "# test-results/test_login/test-failed-1.png\n# Shows: Session expired banner visible, login form hidden"
        }
      ]
    },
    {
      "name": "pytest-rerunfailures",
      "sub": "Flaky Test Retries",
      "url": "https://github.com/pytest-dev/pytest-rerunfailures",
      "desc": "pytest-rerunfailures is a pytest plugin that automatically re-runs failed tests up to a specified number of times before marking them as genuine failures. --reruns 2 --reruns-delay 1 re-runs each failed test twice with a one-second pause between attempts. It is designed for genuine environmental flakiness — network blips, race conditions in test setup — not as a way to paper over reproducible bugs. Tests that only pass 1-in-3 times even with retries indicate a real problem worth fixing, not retrying indefinitely.",
      "adv": [
        "Handles genuine environmental flakiness without manual re-runs",
        "Configurable rerun count and delay between attempts",
        "Integrates with pytest markers to apply retries selectively",
        "Reduces false CI failures from transient network or timing issues"
      ],
      "lim": [
        "Can mask real bugs if rerun count is set too high without flaky-test tracking",
        "Adds execution time — each retry runs the full test again",
        "Not a substitute for fixing root causes of flakiness",
        "Tests that pass only with retries should be investigated, not accepted"
      ],
      "steps": [
        {
          "t": "Step 1 — Install pytest-rerunfailures",
          "p": "Add to requirements.txt:",
          "c": "pip install pytest-rerunfailures"
        },
        {
          "t": "Step 2 — Add retry flags to CI pytest command",
          "p": "Re-run failed tests up to 2 times with a 1-second delay:",
          "c": "pytest --browser chromium --reruns 2 --reruns-delay 1"
        },
        {
          "t": "Step 3 — Apply retries selectively with markers",
          "p": "Only retry known-flaky tests, not the whole suite:",
          "c": "@pytest.mark.flaky(reruns=2, reruns_delay=1)\ndef test_network_dependent_flow(page):\n    ..."
        }
      ]
    }
  ],
  "contentMarkdown": "## Structured logging with logging.basicConfig\n\nPlaywright tests fail in CI with minimal console output unless you configure logging explicitly. Set up logging once in `conftest.py` so every test emits timestamped, leveled messages.\n\n```python\n# conftest.py\nimport logging\nimport pytest\n\ndef pytest_configure(config):\n    logging.basicConfig(\n        level=logging.INFO,\n        format=\"%(asctime)s [%(levelname)s] %(name)s: %(message)s\",\n        datefmt=\"%Y-%m-%d %H:%M:%S\",\n    )\n\n@pytest.fixture(autouse=True)\ndef log_test_name(request):\n    logger = logging.getLogger(\"playwright.tests\")\n    logger.info(\"START: %s\", request.node.name)\n    yield\n    logger.info(\"END: %s\", request.node.name)\n```\n\nUse module-level loggers in page objects and utilities rather than `print()` — log levels let you dial verbosity up in CI (`--log-cli-level=DEBUG`) without changing code.\n\n```python\nimport logging\n\nlogger = logging.getLogger(__name__)\n\nclass LoginPage:\n    def login(self, page, username: str, password: str):\n        logger.info(\"Logging in as %s\", username)\n        page.goto(\"/login\")\n        page.get_by_label(\"Username\").fill(username)\n        page.get_by_label(\"Password\").fill(password)\n        page.get_by_role(\"button\", name=\"Sign in\").click()\n        logger.info(\"Login submitted, waiting for dashboard\")\n```\n\n## Screenshot on failure\n\npytest-playwright captures screenshots automatically when configured in `conftest.py` or via CLI flags.\n\n```python\n# conftest.py\nimport pytest\n\n@pytest.fixture(scope=\"session\")\ndef browser_context_args(browser_context_args):\n    return {\n        **browser_context_args,\n        \"record_video_dir\": \"test-results/videos/\",\n    }\n```\n\n```bash\n# CLI flags — screenshot and video on failure\npytest --screenshot=only-on-failure --video=retain-on-failure\n\n# Trace on first retry — best debugging artifact Playwright offers\npytest --tracing=retain-on-failure\n```\n\n```python\n# conftest.py — programmatic screenshot in a hook\n@pytest.hookimpl(tryfirst=True, hookwrapper=True)\ndef pytest_runtest_makereport(item, call):\n    outcome = yield\n    report = outcome.get_result()\n    if report.when == \"call\" and report.failed:\n        page = item.funcargs.get(\"page\")\n        if page and page.context.pages:\n            path = f\"test-results/{item.nodeid.replace('::', '_')}.png\"\n            page.screenshot(path=path, full_page=True)\n```\n\nScreenshots answer \"what did the page look like when it broke?\" Traces answer \"what happened step by step?\" — capture both on failure in CI.\n\n## Video recording\n\nVideos are heavier than screenshots but invaluable for timing-related failures and animations.\n\n```python\n# conftest.py\n@pytest.fixture(scope=\"session\")\ndef browser_context_args(browser_context_args):\n    return {\n        **browser_context_args,\n        \"record_video_dir\": \"test-results/videos/\",\n        \"record_video_size\": {\"width\": 1280, \"height\": 720},\n    }\n```\n\n```bash\npytest --video=retain-on-failure\n```\n\nUpload `test-results/` as a CI artifact so videos survive runner teardown. A 30-second failure video often saves 30 minutes of local reproduction.\n\n## pytest-rerunfailures for transient flakes\n\n`pytest-rerunfailures` automatically retries failed tests a configurable number of times before marking them as failed. Use it as a safety net, not a substitute for fixing root causes.\n\n```bash\npip install pytest-rerunfailures\n```\n\n```bash\n# Retry each failure up to 2 times\npytest --reruns 2 --reruns-delay 1\n\n# Retry only tests marked @pytest.mark.flaky\npytest --reruns 2 --only-rerun flaky\n```\n\n```python\nimport pytest\n\n@pytest.mark.flaky(reruns=2, reruns_delay=1)\ndef test_dashboard_loads(page):\n    page.goto(\"/dashboard\")\n    page.get_by_text(\"Welcome\").wait_for(state=\"visible\", timeout=5000)\n```\n\nPair reruns with trace capture on the final failure (`--tracing=retain-on-failure`) so you still get a debug artifact when all retries exhaust.\n\n## Error handling patterns\n\nWrap API setup and teardown in try/finally blocks so a failed assertion does not leave orphaned test data.\n\n```python\ndef test_approve_leave_request(page, api_client, leave_factory):\n    leave_id = None\n    try:\n        leave_id = leave_factory.create(status=\"pending\")\n        page.goto(f\"/admin/leave/{leave_id}\")\n        page.get_by_role(\"button\", name=\"Approve\").click()\n        page.get_by_text(\"Approved\").wait_for()\n    finally:\n        if leave_id:\n            api_client.delete(f\"/api/leave/{leave_id}\")\n```\n\nClean logging, failure artifacts, controlled reruns, and reliable teardown together make CI failures diagnosable in minutes instead of hours.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
