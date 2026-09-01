import type { ChapterRecord } from "../../../types";

/** 26. Test Reporting */
export const chapter = {
  "id": "pw-5-report",
  "title": "26. Test Reporting",
  "minutes": 40,
  "level": "advanced",
  "phase": "Part 5 · CI/CD & Reporting",
  "partName": "Part 5 · CI/CD & Reporting",
  "overviewText": "Test reporting transforms raw pytest console output into structured, shareable artifacts that stakeholders, developers, and QA leads can review without re-running the suite. At the simplest level, pytest-html generates a single self-contained HTML file summarizing pass/fail/skip results. Allure goes further — producing interactive reports with step-by-step breakdowns, screenshot attachments, and historical trend data. In CI, reports must be published as artifacts (via GitHub Actions upload-artifact or Jenkins archiveArtifacts) so they survive after the ephemeral CI runner is destroyed. The if: always() condition is critical: without it, the upload step is skipped exactly when tests fail — the moment you most need the report to debug what went wrong.",
  "why": "A failing test in CI with only a stack trace in the log is painful to debug — especially for a QA lead or product owner who wasn't the one who wrote the test. A structured HTML or Allure report with screenshots, step breakdowns, and environment context turns a cryptic CI failure into something anyone on the team can understand and act on. Reports also create an audit trail: over time, you can see which tests fail most often, which modules are flakiest, and whether suite health is improving or degrading. Without published artifacts, CI logs are the only record — and they disappear or become unreadable in large suites.",
  "when": "Add basic HTML reporting (pytest-html) as soon as you have CI running — it takes one pip install and one CLI flag. Upgrade to Allure when the team needs step-level breakdowns, screenshot attachments per step, or historical trend tracking across runs. Always publish reports as CI artifacts from the first CI workflow — retrofitting artifact upload after the team has already been debugging from raw logs is a common missed step.",
  "practical": {
    "app": "Bizlevate HRMS — Full regression suite in GitHub Actions",
    "scenario": "The nightly regression run fails on test_leave_request_approval_flow. The QA lead downloads the Allure report artifact from the GitHub Actions run page instead of reading raw CI logs.",
    "pass": "The Allure report shows the test failed at step 'Click Approve button' with a screenshot attached at the moment of failure. The screenshot reveals the Approve button was disabled because the manager role was not assigned — a data setup issue, not a UI bug. The fix takes 10 minutes.",
    "fail": "Without a report artifact, the QA lead reads 400 lines of CI log output, cannot find the failure screenshot, and asks the developer to re-run the test locally — adding hours of back-and-forth that a published Allure artifact would have eliminated."
  },
  "advantages": [
    "pytest-html requires zero code changes — one CLI flag produces a shareable HTML file",
    "Allure step decorators (@allure.step) show exactly which named step failed, not just the test name",
    "Screenshot attachments in Allure reports capture UI state at the moment of failure",
    "GitHub Actions upload-artifact makes reports downloadable for 90 days after every CI run",
    "Self-contained HTML reports work offline — no server needed to view them",
    "Allure history tracking shows pass-rate trends per test over many runs"
  ],
  "limitations": [
    "pytest-html lacks step-level breakdowns and screenshot attachment support that Allure provides",
    "Allure requires a separate CLI tool (allure serve / allure generate) to render raw results into a viewable report",
    "Large screenshot attachments inflate artifact size — CI storage limits may apply",
    "Reports only help if someone actually downloads and reads them — a cultural adoption problem, not a tooling one",
    "Allure-pytest integration adds decorators to test code — another dependency to maintain"
  ],
  "tools": [
    {
      "name": "pytest-html",
      "sub": "HTML Reporting",
      "url": "https://pytest-html.readthedocs.io",
      "desc": "pytest-html is a pytest plugin that generates a single-file HTML report after a test run, summarizing pass/fail/skip counts, individual test results, and failure messages. The --self-contained-html flag embeds all CSS and JavaScript directly in the file so it can be shared or uploaded as a CI artifact without needing a web server. It is the fastest path to structured reporting with minimal setup.",
      "adv": [
        "One pip install and one CLI flag — no code changes required",
        "--self-contained-html produces a single shareable file with no external dependencies",
        "Integrates directly into existing pytest CLI invocations and CI workflows",
        "Good enough for most teams before Allure complexity is justified"
      ],
      "lim": [
        "No step-level breakdown — shows test pass/fail only, not individual actions within a test",
        "No built-in screenshot or trace attachment support",
        "No historical trend tracking across runs",
        "Report styling is basic compared to Allure's interactive UI"
      ],
      "steps": [
        {
          "t": "Step 1 — Install pytest-html",
          "p": "Add to requirements.txt and install:",
          "c": "pip install pytest-html"
        },
        {
          "t": "Step 2 — Run tests with HTML report output",
          "p": "Generate a self-contained report after the test run:",
          "c": "pytest --html=report.html --self-contained-html"
        },
        {
          "t": "Step 3 — Publish as a GitHub Actions artifact",
          "p": "Add to your workflow YAML:",
          "c": "- name: Upload test report\n  if: always()\n  uses: actions/upload-artifact@v4\n  with:\n    name: playwright-report\n    path: report.html"
        },
        {
          "t": "Step 4 — Download and review after a CI failure",
          "p": "On the GitHub Actions run page → Artifacts → download playwright-report → open report.html in a browser.",
          "c": "# Report shows: 44 passed, 3 failed, 0 skipped\n# Failed tests listed with full assertion messages"
        }
      ]
    },
    {
      "name": "Allure Report",
      "sub": "Interactive Reporting",
      "url": "https://allurereport.org",
      "desc": "Allure is an interactive test reporting framework that produces rich HTML reports with step-by-step test breakdowns, screenshot and log attachments, environment metadata, and historical pass-rate trends. The allure-pytest plugin writes raw result data to a directory during the test run; the Allure CLI then renders that data into a navigable report. @allure.step decorators mark individual actions as named steps, so a failed test's report shows exactly which step broke rather than requiring someone to read the test source code.",
      "adv": [
        "@allure.step decorators produce readable step-by-step breakdowns in the report",
        "Screenshot and log attachments per step give full context at the moment of failure",
        "Historical trend view shows pass rate per test over many CI runs",
        "Integrates with GitHub Actions, Jenkins, and most CI platforms via artifact upload"
      ],
      "lim": [
        "Requires the separate Allure CLI (allure serve / allure generate) to render reports",
        "Adds decorators to test code — more setup than pytest-html",
        "Large attachment volumes can slow report generation on big suites",
        "Allure server (for trend history) requires additional infrastructure beyond local serve"
      ],
      "steps": [
        {
          "t": "Step 1 — Install allure-pytest and the Allure CLI",
          "p": "Install the pytest plugin and the standalone CLI tool:",
          "c": "pip install allure-pytest\n# macOS:\nbrew install allure\n# Or download from https://github.com/allure-framework/allure2/releases"
        },
        {
          "t": "Step 2 — Add step decorators to tests",
          "p": "Mark key actions as named steps:",
          "c": "import allure\n\n@allure.step(\"Log in as test user\")\ndef login(page):\n    page.get_by_label(\"Username\").fill(\"testuser\")\n    page.get_by_label(\"Password\").fill(\"password123\")\n    page.get_by_role(\"button\", name=\"Sign in\").click()\n\ndef test_leave_approval(page):\n    login(page)\n    # ... rest of test"
        },
        {
          "t": "Step 3 — Run tests and generate the report",
          "p": "Write raw results during the run, then render locally:",
          "c": "pytest --alluredir=allure-results\nallure serve allure-results  # opens interactive report in browser"
        },
        {
          "t": "Step 4 — Publish Allure results as a CI artifact",
          "p": "Upload allure-results in GitHub Actions, then generate the report in a follow-up step or locally:",
          "c": "- name: Upload Allure results\n  if: always()\n  uses: actions/upload-artifact@v4\n  with:\n    name: allure-results\n    path: allure-results/"
        }
      ]
    }
  ],
  "contentMarkdown": "## pytest-html — quick HTML reports\n\n`pytest-html` generates a self-contained HTML report from any pytest run. It requires zero configuration for basic use and produces a file you can open in a browser or attach to a bug ticket.\n\n```bash\npip install pytest-html\n```\n\n```bash\n# Generate report.html in the project root\npytest --html=report.html --self-contained-html\n\n# --self-contained-html embeds CSS/JS inline — single file, easy to email or upload\n```\n\n```python\n# conftest.py — attach screenshot to HTML report on failure\nimport pytest\n\n@pytest.hookimpl(hookwrapper=True)\ndef pytest_runtest_makereport(item, call):\n    outcome = yield\n    report = outcome.get_result()\n    if report.when == \"call\" and report.failed:\n        page = item.funcargs.get(\"page\")\n        if page:\n            screenshot = page.screenshot()\n            import pytest_html\n            extra = getattr(report, \"extra\", [])\n            extra.append(pytest_html.extras.png(screenshot, \"Failure screenshot\"))\n            report.extra = extra\n```\n\nThe hook above embeds a failure screenshot directly into the HTML report — invaluable when debugging CI failures without re-running locally.\n\n## Allure reporting\n\nAllure produces rich, interactive reports with history, trends, categories, and step-level detail. It is the standard choice for teams that need stakeholder-friendly dashboards.\n\n```bash\npip install allure-pytest\n```\n\n```bash\n# Run tests with Allure results directory\npytest --alluredir=allure-results\n\n# Generate and open the HTML report locally\nallure serve allure-results\n```\n\n```python\n# pytest.ini\n[pytest]\naddopts = --alluredir=allure-results\n```\n\nAllure reports group tests by feature, show duration trends across runs, and link attachments (screenshots, logs) to specific steps — far more navigable than a flat HTML table for large suites.\n\n## @allure.step — structured test narration\n\n`@allure.step` decorates functions and methods so Allure renders them as expandable steps in the report. Page object methods are the natural place to add steps.\n\n```python\nimport allure\nfrom playwright.sync_api import Page\n\nclass LeavePage:\n    def __init__(self, page: Page):\n        self.page = page\n\n    @allure.step(\"Navigate to leave request form\")\n    def open_new_request(self):\n        self.page.goto(\"/leave/new\")\n        self.page.get_by_role(\"button\", name=\"New Request\").click()\n\n    @allure.step(\"Submit leave request: {leave_type} from {start} to {end}\")\n    def submit_request(self, leave_type: str, start: str, end: str):\n        self.page.get_by_label(\"Leave Type\").select_option(leave_type)\n        self.page.get_by_label(\"Start Date\").fill(start)\n        self.page.get_by_label(\"End Date\").fill(end)\n        self.page.get_by_role(\"button\", name=\"Submit\").click()\n```\n\nWhen a test fails at `submit_request`, the Allure report shows exactly which step broke and with what parameters — no log-diving required.\n\n## CI artifact upload\n\nReports are useless in CI if they disappear when the runner shuts down. Upload them as artifacts on every run, especially on failure.\n\n```yaml\n# GitHub Actions — upload multiple report types\n- name: Upload test artifacts\n  if: always()\n  uses: actions/upload-artifact@v4\n  with:\n    name: test-reports-${{ github.run_number }}\n    path: |\n      report.html\n      allure-results/\n      test-results/\n    retention-days: 14\n```\n\n```bash\n# Jenkins — archive in post block\narchiveArtifacts artifacts: 'report.html, allure-results/**', allowEmptyArchive: true\n```\n\nSet `if: always()` (GitHub Actions) or use a `post { always { ... } }` block (Jenkins) so reports upload even when tests fail — that is precisely when you need them most.\n\n## Choosing a reporting strategy\n\nUse `pytest-html` for quick, zero-setup reports on small teams. Adopt Allure when the suite grows past ~50 tests, multiple contributors need to triage failures, or stakeholders want trend dashboards. Many teams run both: pytest-html for fast PR artifact review, Allure for nightly trend analysis.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
