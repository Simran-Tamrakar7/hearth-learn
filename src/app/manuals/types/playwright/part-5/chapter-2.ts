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
  "contentMarkdown": "HTML report (pytest-html) pip install pytest-html pytest --html=report.html --self-contained-html pytest --html=<path> --self-contained-html What it does: Generates a single-file HTML report summarizing pass/fail/skip results after a test run. Types/params: ● --html=<path> (string, required) — output file location ● --self-contained-html (flag, optional) — embeds CSS/JS directly in the file so it'\n\n## HTML report (pytest-html)\n\nWhat it does: Generates a single-file HTML report summarizing pass/fail/skip results after a test run.\n\nTypes/params:\n\nPointers: Good baseline reporting with minimal setup. Lacks the richer history-tracking and screenshot/trace attachment support that Allure offers — reach for Allure once a team needs more than a quick pass/fail summary.\n\n```\npip install pytest-html\n\npytest --html=report.html --self-contained-html\n\npytest --html=<path> --self-contained-html\n```\n\n## Allure reporting setup\n\nallure serve allure-results # opens an interactive report locally\n\nWhat it does: Writes raw result data (in Allure's format) to a directory during the test run, to be rendered into a report afterward.\n\nTypes/params:\n\nPointers: Requires the separate Allure command-line tool (allure serve / allure\n\ngenerate) to actually render the raw results into a viewable report — the allure-pytest package alone only produces the raw data.\n\n@allure.step(\"Log in as test user\")\n\n...\n\n@allure.attach(name=\"screenshot\", attachment_type=allure.attachment_type.PNG)\n\n@allure.step(description)\n\nWhat it does: Marks a function as a named step in the Allure report, so the report shows a readable step-by-step breakdown of what a test did, not just pass/fail.\n\nTypes/params:\n\nPointers: Especially valuable for longer tests/flows — a failed test's Allure report will show exactly which named step failed, rather than requiring someone to read raw code to figure out where things went wrong.\n\n```\ndef login(page):\n\npage.get_by_label(\"Username\").fill(\"testuser\")\n\npip install allure-pytest\n\npytest --alluredir=allure-results\n\ndef attach_screenshot(page):\n\nreturn page.screenshot()\n```\n\n## Publishing reports as CI artifacts\n\n- name: Upload test report\n\nwith:\n\npath: report.html\n\nactions/upload-artifact (GitHub Actions built-in action)\n\nWhat it does: Saves specified files/directories from the CI run so they're downloadable after the workflow finishes, instead of only existing in ephemeral CI logs.\n\nTypes/params:\n\nPointers: if: always() is important here — without it, the upload step is skipped whenever the test step itself fails, which is exactly the case where you most need the report/trace artifacts to debug what went wrong.\n\n```\nif: always()\n\nuses: actions/upload-artifact@v4\n\nname: playwright-report\n\n# GitHub Actions step\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
