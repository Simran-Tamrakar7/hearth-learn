import type { ChapterRecord } from "../../../types";

/** Automated Testing */
export const chapter = {
  "id": "tt-automated-testing",
  "overlayNo": 6,
  "title": "Automated Testing",
  "minutes": 35,
  "level": "intermediate",
  "phase": "Part 2 · Execution Method",
  "partName": "Part 2 · Execution Method",
  "overviewText": "Automated testing is the practice of writing scripts that execute test steps and check results without a human clicking through them each time — the same suite can run in seconds, on every commit, forever, without getting tired or skipping a step.",
  "why": "As an application grows, the number of things that could break grows with it. Manually re-checking everything before every release becomes physically impossible. Automated tests turn that impossible manual re-check into a suite that runs in minutes, catching regressions the moment they're introduced rather than days or weeks later.",
  "when": "For anything that will be run more than a handful of times — regression suites, critical user paths, and anything gating a release. It's not a replacement for manual testing on new or fast-changing features, but the right investment for stable flows a team relies on not breaking.",
  "practical": {
    "app": "HRMS Regression Suite",
    "scenario": "Before every release, a 40-scenario regression suite (login, employee CRUD, leave requests, payroll processing) runs automatically in CI. A developer's change to the date-picker component accidentally breaks the 'from date' field across every form that uses it.",
    "pass": "All 40 scenarios green — the build is promoted to staging.",
    "fail": "6 of 40 scenarios fail on the same from-date selector — CI blocks the merge before it ever reaches a human tester, and the pattern across failures immediately points at the shared component."
  },
  "advantages": [
    "Executes repetitive regression suites in seconds without human fatigue",
    "Continuous integration safety net catching breaking bugs on every pull request",
    "Enables true continuous deployment and faster release cadences",
    "Reusable test scripts scale seamlessly across environments and browsers"
  ],
  "limitations": [
    "Higher upfront time and code investment to write and maintain test frameworks",
    "Blind to visual glitches, awkward workflows, and UX oddities unless specifically scripted",
    "Brittle against rapid UI changes if locators are not cleanly decoupled",
    "False sense of security if test assertions only check status codes rather than data integrity"
  ],
  "tools": [
    {
      "name": "Selenium",
      "sub": "WebDriver",
      "url": "https://selenium.dev",
      "desc": "The longest-standing browser automation framework, with WebDriver support across every major browser and a massive existing ecosystem — see Chapter 3 for the full breakdown of its strengths and limitations at the system-test level; the same trade-offs apply here.",
      "adv": [
        "Broadest browser and language support of any automation tool",
        "Selenium Grid parallelizes large regression suites across machines",
        "Deepest CI/CD and test-management tool integration in the industry",
        "Best fit for teams with existing Java/C#/Python Selenium investment"
      ],
      "lim": [
        "No auto-waiting — flaky without disciplined explicit waits",
        "More verbose to write and maintain than Playwright or Cypress",
        "Slower feedback loop during local development than Cypress's live reload",
        "Debugging failures takes more manual digging without a built-in trace tool"
      ],
      "steps": [
        {
          "t": "Step 1 — Install Selenium and PyTest",
          "p": "Install selenium bindings and webdriver-manager.",
          "c": "pip install selenium webdriver-manager pytest"
        },
        {
          "t": "Step 2 — Set up headless Chrome driver",
          "p": "Initialize ChromeOptions with headless flags and WebDriverWait.",
          "c": "from selenium import webdriver\nfrom selenium.webdriver.chrome.service import Service\nfrom selenium.webdriver.chrome.options import Options\nfrom webdriver_manager.chrome import ChromeDriverManager\n\noptions = Options()\noptions.add_argument(\"--headless=new\")\noptions.add_argument(\"--window-size=1920,1080\")\ndriver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)"
        },
        {
          "t": "Step 3 — Write regression test with explicit waits",
          "p": "Automate user login and dashboard verification.",
          "c": "from selenium.webdriver.common.by import By\nfrom selenium.webdriver.support.ui import WebDriverWait\nfrom selenium.webdriver.support import expected_conditions as EC\n\ndef test_hrms_login_flow(driver):\n    driver.get(\"https://staging.hrms-app.com/login\")\n    wait = WebDriverWait(driver, 10)\n    \n    wait.until(EC.visibility_of_element_located((By.NAME, \"email\"))).send_keys(\"admin@hrms.com\")\n    driver.find_element(By.NAME, \"password\").send_keys(\"SecurePass123!\")\n    driver.find_element(By.CSS_SELECTOR, \"button[type='submit']\").click()\n    \n    header = wait.until(EC.visibility_of_element_located((By.TAG_NAME, \"h1\")))\n    assert \"Dashboard\" in header.text"
        },
        {
          "t": "Step 4 — Automate employee creation & assertion",
          "p": "Fill employee form and assert presence in employee table.",
          "c": "def test_create_employee(driver):\n    driver.get(\"https://staging.hrms-app.com/employees/new\")\n    wait = WebDriverWait(driver, 10)\n    \n    wait.until(EC.visibility_of_element_located((By.NAME, \"fullName\"))).send_keys(\"Priya Sharma\")\n    driver.find_element(By.NAME, \"department\").send_keys(\"Engineering\")\n    driver.find_element(By.ID, \"btn-save\").click()\n    \n    toast = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, \"toast-success\")))\n    assert \"Employee created\" in toast.text"
        },
        {
          "t": "Step 5 — Run headless suite in CI pipeline",
          "p": "Execute parallelized test suite with pytest.",
          "c": "pytest -v -n 4 --html=reports/regression-report.html"
        }
      ]
    },
    {
      "name": "Playwright",
      "sub": "Modern Web Automation",
      "url": "https://playwright.dev",
      "desc": "Auto-waiting, multi-browser, single-API automation with the Trace Viewer for fast failure debugging — see Chapter 3 for full detail.",
      "adv": [
        "Auto-waiting removes most flaky, timing-based failures",
        "One API for Chromium, Firefox, and WebKit",
        "Trace Viewer gives a step-by-step replay of any failed run",
        "Network interception mocks specific states without needing real backend data"
      ],
      "lim": [
        "Smaller legacy tooling footprint than Selenium",
        "A real learning curve for teams migrating existing Selenium suites",
        "Modern-language-first — weaker fit for older tech stacks",
        "Traces add storage overhead on large CI runs"
      ],
      "steps": [
        {
          "t": "Step 1 — Install Playwright with browsers",
          "p": "Initialize Playwright test suite.",
          "c": "pip install pytest-playwright\nplaywright install --with-deps chromium firefox webkit"
        },
        {
          "t": "Step 2 — Write resilient test with auto-waiting locators",
          "p": "Playwright automatically waits for elements to be actionable before clicking.",
          "c": "from playwright.sync_api import Page, expect\n\ndef test_leave_application(page: Page):\n    page.goto(\"https://staging.hrms-app.com/login\")\n    page.get_by_label(\"Email\").fill(\"employee@hrms.com\")\n    page.get_by_label(\"Password\").fill(\"Password123!\")\n    page.get_by_role(\"button\", { name: \"Sign In\" }).click()\n    \n    # Navigate to Leave Module\n    page.get_by_role(\"link\", { name: \"Leaves\" }).click()\n    page.get_by_role(\"button\", { name: \"Apply Leave\" }).click()\n    \n    page.get_by_label(\"Leave Type\").select_option(\"Sick Leave\")\n    page.get_by_label(\"Days\").fill(\"2\")\n    page.get_by_role(\"button\", { name: \"Submit Request\" }).click()\n    \n    expect(page.get_by_text(\"Leave request submitted successfully\")).to_be_visible()"
        },
        {
          "t": "Step 3 — Run cross-browser tests simultaneously",
          "p": "Execute against Chromium, Firefox, and WebKit in parallel.",
          "c": "pytest --browser chromium --browser firefox --browser webkit"
        },
        {
          "t": "Step 4 — Record execution trace on test failure",
          "p": "Capture screenshots, DOM snapshots, and network calls for debugging.",
          "c": "pytest --tracing=retain-on-failure"
        },
        {
          "t": "Step 5 — Open interactive Trace Viewer",
          "p": "Inspect exact time-travel replay of the failed test.",
          "c": "playwright show-trace test-results/trace.zip"
        }
      ]
    },
    {
      "name": "Cypress",
      "sub": "JavaScript / In-Browser",
      "url": "https://cypress.io",
      "desc": "A JavaScript-native testing tool that runs inside the browser itself rather than driving it remotely, which gives it unusually fast, reliable feedback and a live, time-traveling test runner UI that shows exactly what the app looked like at every step.",
      "adv": [
        "Runs in-browser, giving very fast and reliable execution with automatic retry-ability",
        "Time-travel debugger shows a DOM snapshot at every command — excellent failure visibility",
        "Simple, readable API — a shallow learning curve for JavaScript developers",
        "Great local developer experience with live reload as tests are written"
      ],
      "lim": [
        "JavaScript/TypeScript only — no first-class support for other languages",
        "Runs only in Chromium-family and Firefox browsers, no native WebKit/Safari support",
        "Each test is scoped to a single browser tab — can't easily test multi-tab or multi-origin flows without workarounds",
        "Less suited to true cross-browser regression coverage than Playwright"
      ],
      "steps": [
        {
          "t": "Step 1 — Install Cypress",
          "p": "Install Cypress as a dev dependency in your JavaScript project.",
          "c": "npm install cypress --save-dev"
        },
        {
          "t": "Step 2 — Open interactive Cypress test runner",
          "p": "Scaffold folders and launch the Cypress desktop GUI.",
          "c": "npx cypress open"
        },
        {
          "t": "Step 3 — Write your first E2E test spec",
          "p": "Create cypress/e2e/payroll.cy.js with visit, get, click, and type commands.",
          "c": "describe('HRMS Payroll Regression', () => {\n  beforeEach(() => {\n    cy.visit('/login');\n    cy.get('[data-test=email]').type('admin@hrms.com');\n    cy.get('[data-test=password]').type('SecurePass123!');\n    cy.get('[data-test=btn-login]').click();\n    cy.url().should('include', '/dashboard');\n  });\n\n  it('processes monthly payroll batch', () => {\n    cy.get('[data-test=nav-payroll]').click();\n    cy.get('[data-test=select-cycle]').select('August 2025');\n    cy.get('[data-test=btn-process]').click();\n    cy.get('.toast-success').should('be.visible').and('contain', 'Payroll completed for 47 employees');\n  });\n});"
        },
        {
          "t": "Step 4 — Leverage automatic retry-ability",
          "p": "cy.get and .should() automatically retry until assertions pass or timeout.",
          "c": "cy.get('.success-toast').should('be.visible');\ncy.get('[data-test=status-badge]').should('have.text', 'Approved');"
        },
        {
          "t": "Step 5 — Run headlessly in CI pipeline",
          "p": "Execute tests in terminal with video and screenshot artifact generation.",
          "c": "npx cypress run --browser chrome"
        },
        {
          "t": "Step 6 — Review time-travel debugger",
          "p": "Click on any command in the test runner log to view the DOM snapshot at that exact microsecond.",
          "c": "// Command Log hover exposes state before and after each DOM action\ncy.get('[data-test=from-date]').click(); // [SNAPSHOT: DOM before & after click]"
        },
        {
          "t": "Step 7 — Connect Cypress Cloud for analytics",
          "p": "Record runs to detect flaky tests, parallelize execution, and view historical metrics.",
          "c": "npx cypress run --record --key <your-cypress-cloud-project-key>"
        }
      ]
    }
  ],
  "contentMarkdown": "## Automated CI Test Suite\n\nAuthor headless browser test suites wired directly to pull request gates in GitHub Actions.\n\n```\nnpx cypress run --record --spec \"cypress/e2e/regression/**\"\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
