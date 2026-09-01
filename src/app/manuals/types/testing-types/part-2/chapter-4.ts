import type { ChapterRecord } from "../../types";

/** Smoke Testing */
export const chapter = {
  "id": "tt-smoke-testing",
  "overlayNo": 8,
  "title": "Smoke Testing",
  "minutes": 20,
  "level": "beginner",
  "phase": "Part 2 · Functional",
  "partName": "Part 2 · Functional",
  "overviewText": "Smoke testing is a quick, shallow pass over the most critical functions of an application — login works, the homepage loads, core navigation responds — run immediately after a new build to answer one question: is this build stable enough to test further, or is it broken at the foundation?",
  "why": "Running a full regression suite against a build that can't even log in wastes hours of testing effort on a build that was doomed from the start. Smoke testing is a cheap early filter — a handful of checks that take minutes, not hours, and catch catastrophic breakages before anyone invests real testing time.",
  "when": "Immediately after every new build or deployment, before any deeper testing begins. It's typically the very first stage of CI/CD after a build succeeds — a fast gate that decides whether the pipeline proceeds to fuller test suites.",
  "practical": {
    "app": "HRMS Post-Deployment Check",
    "scenario": "After every deploy to staging, a smoke suite checks: login succeeds, the dashboard loads, the employee list renders, and the payroll module opens.",
    "pass": "All four checks pass in under 90 seconds — the pipeline proceeds to the full regression suite.",
    "fail": "The dashboard fails to load due to a broken build artifact — the pipeline halts immediately, and the team is alerted before anyone wastes time running deeper tests against a build that was never going to work."
  },
  "advantages": [
    "Extremely fast — a broken build is caught in minutes, not after a full test cycle",
    "Cheap to write and maintain because the scope is deliberately narrow",
    "Prevents wasted effort running deeper suites against a fundamentally broken build",
    "Gives immediate, high-confidence signal right after every deployment"
  ],
  "limitations": [
    "Shallow by design — it will not catch anything beyond the most critical paths",
    "A passing smoke test says nothing about edge cases or business logic correctness",
    "Needs discipline to keep small; scope creep turns it into a slow regression suite",
    "Still needs a human or a fuller suite behind it — smoke testing alone is never sufficient"
  ],
  "tools": [
    {
      "name": "Manual",
      "sub": "Quick Checklist",
      "url": null,
      "desc": "For small teams or infrequent releases, a short manual checklist (log in, load the dashboard, open one core module) is often enough — speed and low setup cost matter more than automation here.",
      "adv": [
        "Zero tool setup or maintenance required",
        "Can be performed immediately by any team member",
        "Takes less than 3 minutes for a 5-step checklist",
        "Immediately catches catastrophic white-screen or server crash issues"
      ],
      "lim": [
        "Requires human availability after every deployment",
        "Cannot easily run in automated midnight CI/CD pipelines",
        "Subject to human oversight if done in a rush"
      ],
      "steps": [
        {
          "t": "Step 1 — Open deployment landing page",
          "p": "Load https://staging.hrms-app.com and verify HTTP 200 and favicon / title render.",
          "c": "Action: Open browser -> Navigate to URL -> Verify login page displays without console error"
        },
        {
          "t": "Step 2 — Execute sanity login",
          "p": "Enter valid admin credentials and submit.",
          "c": "User: smoke_admin@hrms.com / Pass: TestPass123! -> Click Login"
        },
        {
          "t": "Step 3 — Verify critical modules render",
          "p": "Click through Dashboard, Employees, and Payroll tabs.",
          "c": "Check: Dashboard widgets load -> Employee table displays records -> Payroll cycle selector opens"
        },
        {
          "t": "Step 4 — Decision gate",
          "p": "If any step fails, abort testing and ping on-call developer. If all pass, green-light regression.",
          "c": "Verdict: PASS (1 min 45s) -> Ready for QA Deep Testing"
        }
      ]
    },
    {
      "name": "Selenium",
      "sub": "Automated Smoke Gate",
      "url": "https://selenium.dev",
      "desc": "For frequent builds, a small Selenium script automates the same handful of critical checks so smoke testing runs unattended on every deploy.",
      "adv": [
        "Extremely fast — a broken build is caught in minutes, not after a full test cycle",
        "Cheap to write and maintain because the scope is deliberately narrow",
        "Prevents wasted effort running deeper suites against a fundamentally broken build",
        "Gives immediate, high-confidence signal right after every deployment"
      ],
      "lim": [
        "Shallow by design — it will not catch anything beyond the most critical paths",
        "A passing smoke test says nothing about edge cases or business logic correctness",
        "Needs discipline to keep small; scope creep turns it into a slow regression suite",
        "Still needs a human or a fuller suite behind it — smoke testing alone is never sufficient"
      ],
      "steps": [
        {
          "t": "Step 1 — Identify critical smoke paths",
          "p": "Limit scope to 5 critical endpoints: Login, Dashboard, Employee List, Leaves, Payroll.",
          "c": "Critical Paths:\n1. GET /login -> Form visible\n2. POST /auth/login -> 200 OK + JWT\n3. GET /dashboard -> Metrics widget rendered\n4. GET /employees -> Table count > 0\n5. GET /payroll -> Active cycle visible"
        },
        {
          "t": "Step 2 — Write lightweight fast-failing Selenium script",
          "p": "Set tight timeouts (e.g. 5 seconds) to fail fast on hung servers.",
          "c": "from selenium import webdriver\nfrom selenium.webdriver.common.by import By\nfrom selenium.webdriver.support.ui import WebDriverWait\nfrom selenium.webdriver.support import expected_conditions as EC\nimport pytest\n\n@pytest.fixture\ndef driver():\n    options = webdriver.ChromeOptions()\n    options.add_argument(\"--headless=new\")\n    driver = webdriver.Chrome(options=options)\n    driver.set_page_load_timeout(10)\n    yield driver\n    driver.quit()\n\ndef test_smoke_critical_pipeline(driver):\n    wait = WebDriverWait(driver, 5)\n    \n    # 1. Login\n    driver.get(\"https://staging.hrms-app.com/login\")\n    driver.find_element(By.NAME, \"email\").send_keys(\"smoke_user@hrms.com\")\n    driver.find_element(By.NAME, \"password\").send_keys(\"SmokePass123!\")\n    driver.find_element(By.CSS_SELECTOR, \"button[type='submit']\").click()\n    \n    # 2. Dashboard\n    wait.until(EC.visibility_of_element_located((By.ID, \"dashboard-stats\")))\n    \n    # 3. Employee list\n    driver.get(\"https://staging.hrms-app.com/employees\")\n    wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, \".employee-row\")))\n    \n    # 4. Payroll\n    driver.get(\"https://staging.hrms-app.com/payroll\")\n    wait.until(EC.visibility_of_element_located((By.ID, \"payroll-period-select\")))"
        },
        {
          "t": "Step 3 — Wire into CI/CD deployment pipeline",
          "p": "Configure GitHub Actions / GitLab CI to run smoke tests immediately after deployment.",
          "c": "smoke-test:\n  stage: post-deploy\n  script:\n    - pytest -m smoke --maxfail=1 --timeout=120\n  rules:\n    - if: $CI_COMMIT_BRANCH == \"main\""
        },
        {
          "t": "Step 4 — Set fast fail & alert hook",
          "p": "On failure, halt pipeline immediately and send Slack alert with logs.",
          "c": "if pytest fails:\n  send_slack_alert(\"#build-failures\", \"🚨 Smoke test failed on Staging build! Aborting regression suite.\")\n  exit 1"
        },
        {
          "t": "Step 5 — Maintain strict runtime budget",
          "p": "Ensure total smoke suite execution time remains under 90 seconds.",
          "c": "Benchmark: 4 tests executed in 38.4s -> PASS"
        },
        {
          "t": "Step 6 — Promote to full regression",
          "p": "When smoke is green, automatically trigger deeper automated integration & regression suites.",
          "c": "Status: SMOKE GREEN -> Triggering Full E2E & Regression Pipeline"
        }
      ]
    }
  ],
  "contentMarkdown": "## Post-Deployment Smoke Gate\n\nImplement fast sanity checks executed immediately following deployment to confirm baseline uptime.\n\n```\npytest -m smoke --maxfail=1\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
