import type { ChapterRecord } from "../../types";

/** Integration Testing */
export const chapter = {
  "id": "tt-integration-testing",
  "overlayNo": 2,
  "title": "Integration Testing",
  "minutes": 30,
  "level": "mid",
  "phase": "Part 1 · By Level",
  "partName": "Part 1 · By Level",
  "overviewText": "Integration testing verifies that multiple individual units or components work correctly when they are combined together. While unit testing checks each piece in isolation, integration testing checks the connections between pieces — does the login module correctly communicate with the user database? Does the leave request service correctly update the leave balance and trigger a manager notification? Does the API return the right data structure when the frontend calls it? Integration tests are run after unit tests pass and before full system testing begins. They expose a category of bugs that unit tests are structurally incapable of finding — bugs that live in the interfaces, contracts, and data flows between components. In a real HRMS system, a unit test confirms that the leave balance calculation function works correctly in isolation. Only an integration test confirms that when an employee submits a leave request through the actual API, the correct balance is deducted in the actual database and the manager actually receives the notification through the actual notification service.",
  "why": "The most damaging bugs in real applications almost always live at integration points — API response shapes that do not match what the frontend expects, database queries that return unexpected null values, authentication tokens that expire mid-session, event listeners that drop messages under load. These bugs are completely invisible to unit tests because unit tests mock all external dependencies. Skipping integration testing means these interface bugs survive all the way to system testing or production, where finding and fixing them is dramatically more expensive and disruptive.",
  "when": "Integration testing begins as soon as two or more components are ready to connect — typically mid-sprint when a feature's API and frontend are both available. It runs in CI/CD on every pull request targeting the main branch. A full integration suite must pass before any build is promoted to system testing or staging.",
  "practical": {
    "app": "HRMS — Leave request to balance integration",
    "scenario": "Full integration test flow:\n1. POST /auth/login → get token, assert status 200\n2. GET /leave/balance/5 → store annual leave balance (12 days)\n3. POST /leave/request with employee 5, annual leave, 3 days → assert 201, request ID returned\n4. GET /leave/balance/5 again → assert balance is now 9 days\n5. GET /notifications?recipient=manager_id → assert new notification exists for pending leave\n6. PATCH /leave/request/{id}/approve → manager approves\n7. GET /leave/balance/5 → balance remains 9 (already deducted at request time)",
    "pass": "All 7 steps succeed, data flows correctly across all integrated services.",
    "fail": "Step 4 shows balance still 12 — the leave request service is not integrated with the balance service. A bug unit tests would never find."
  },
  "advantages": [
    "Catches interface bugs that unit tests are structurally unable to find",
    "Tests real data flow across modules — authentication, database reads/writes, notifications",
    "Postman collections are reusable across dev, staging, and production environments",
    "Faster than system testing — direct API calls without full browser rendering",
    "Automated with Newman or PyTest in CI/CD — runs on every pull request"
  ],
  "limitations": [
    "All integrated components must be running — more infrastructure than unit tests",
    "Harder to isolate failure root cause — bug could be in any connected component",
    "Test data management is complex — requests create real records that need cleanup",
    "Slower than unit tests — network calls and service responses add time",
    "Undocumented APIs make integration tests hard to write without trial and error"
  ],
  "tools": [
    {
      "name": "Postman",
      "sub": "API client",
      "url": "https://postman.com",
      "desc": "Postman is the world's most widely used API platform, originally created in 2012 by Abhinav Asthana as a Chrome extension and now a standalone desktop and web application used by over 25 million developers and testers. At its core, Postman is an HTTP client — it lets you construct and send any kind of HTTP request (GET, POST, PUT, PATCH, DELETE) to any API endpoint and inspect every detail of the response including status code, headers, body, cookies, and response time. For integration testing specifically, Postman's real power comes from its Collections feature — you group related API requests into a collection and run them in sequence, passing data between them using variables. For example, a login request extracts the authentication token from the response and stores it as a variable, and every subsequent request automatically uses that token in its Authorization header. Each request has a Tests tab where you write JavaScript assertions that automatically validate the response — checking status codes, response structure, data types, and business logic values. The Newman CLI tool lets you run entire Postman collections from the command line or CI/CD pipeline without opening the GUI, producing JUnit-compatible XML reports that integrate with Jenkins, GitHub Actions, or any other build system. Postman also supports environment files — you define base URLs and credentials for dev, staging, and production separately, and switch between them with one click without changing any request.",
      "adv": [
        "GUI-based, so non-developers can build and run requests without code",
        "Collections + variables make chaining requests (e.g. login → use token) simple",
        "Newman CLI runs full collections in CI/CD with JUnit-style reports",
        "One-click environment switching between dev, staging, and production"
      ],
      "lim": [
        "Test scripts are JavaScript-only inside the Tests tab — awkward for complex logic",
        "Large collections get hard to navigate and maintain over time",
        "Free tier has workspace and monthly request limits at scale",
        "Not built for direct database checks — HTTP only"
      ],
      "steps": [
        {
          "t": "Step 1 — Download and install Postman",
          "p": "Go to postman.com/downloads and download the desktop app. Free tier supports unlimited collections.",
          "c": "// Download desktop client from https://postman.com/downloads"
        },
        {
          "t": "Step 2 — Create a new Collection",
          "p": "Click 'New' → 'Collection'. Name it HRMS Integration Tests.",
          "c": "Collection Name: \"HRMS Integration Tests\""
        },
        {
          "t": "Step 3 — Set up a Collection Variable for the base URL",
          "p": "Click the collection name → Variables tab. Add variable base_url.",
          "c": "Variable: base_url\nInitial value: https://staging.hrms-app.com/api"
        },
        {
          "t": "Step 4 — Add a login request",
          "p": "POST {{base_url}}/auth/login with credentials and save JWT token.",
          "c": "// In Tests tab:\npm.test(\"Login returns 200\", function () {\n    pm.response.to.have.status(200);\n});\n\npm.test(\"Response contains auth token\", function () {\n    const body = pm.response.json();\n    pm.expect(body).to.have.property(\"token\");\n    pm.expect(body.token).to.be.a(\"string\").and.not.empty;\n});\n\npm.test(\"Response contains user info\", function () {\n    const body = pm.response.json();\n    pm.expect(body.user).to.have.property(\"id\");\n    pm.expect(body.user.role).to.equal(\"HR_ADMIN\");\n});\n\n// Pass token to all subsequent requests\npm.collectionVariables.set(\"auth_token\", pm.response.json().token);\npm.collectionVariables.set(\"user_id\", pm.response.json().user.id);"
        },
        {
          "t": "Step 5 — Add a chained request using the token",
          "p": "GET {{base_url}}/employees with Authorization: Bearer {{auth_token}}.",
          "c": "pm.test(\"Returns 200\", () => pm.response.to.have.status(200));\n\npm.test(\"Returns array of employees\", function () {\n    const body = pm.response.json();\n    pm.expect(body.data).to.be.an(\"array\");\n    pm.expect(body.data.length).to.be.above(0);\n});\n\npm.test(\"Each employee has required fields\", function () {\n    const employees = pm.response.json().data;\n    employees.forEach(emp => {\n        pm.expect(emp).to.have.property(\"id\");\n        pm.expect(emp).to.have.property(\"name\");\n        pm.expect(emp).to.have.property(\"department\");\n    });\n});\n\n// Save first employee ID for next request\npm.collectionVariables.set(\"employee_id\", pm.response.json().data[0].id);"
        },
        {
          "t": "Step 6 — Run the full collection",
          "p": "Click collection name → 'Run collection'. The runner executes all requests in order and validates assertions.",
          "c": "// Visual Runner executes requests in sequence with assertion summaries."
        },
        {
          "t": "Step 7 — Run from terminal using Newman",
          "p": "Automate runs in CI/CD pipeline and export HTML reports.",
          "c": "npm install -g newman newman-reporter-htmlextra\nnewman run HRMS_Integration_Tests.json \\\n    -e staging_environment.json \\\n    --reporters cli,htmlextra \\\n    --reporter-htmlextra-export reports/integration_report.html"
        }
      ]
    },
    {
      "name": "PyTest",
      "sub": "API integration",
      "url": "https://pytest.org",
      "desc": "PyTest is not just a unit testing framework — used with the requests library it becomes a powerful API integration testing tool. The advantage over Postman is that Python test code can include complex logic, data manipulation, database queries, and external validations that Postman's JavaScript test scripts cannot easily handle. PyTest fixtures handle authentication once and share the token across all tests in a session. Parameterization runs the same API test against multiple data sets. The pytest-html plugin generates professional HTML reports. For teams already using Python for their Playwright UI tests, using PyTest for API integration tests means one language, one framework, one CI/CD configuration for all testing layers.",
      "adv": [
        "Full Python logic available in tests — DB queries, complex assertions",
        "Same framework and CI config as unit and UI tests, if already used elsewhere",
        "Session-scoped fixtures share an auth token across an entire suite",
        "pytest-html produces shareable, professional reports"
      ],
      "lim": [
        "Requires Python fluency — not approachable for manual/business testers",
        "No GUI for quickly exploring an endpoint ad hoc, unlike Postman",
        "Test data cleanup has to be handled manually in code",
        "Less visual — harder to demo results to non-technical stakeholders"
      ],
      "steps": [
        {
          "t": "Step 1 — Install dependencies",
          "p": "pip install pytest requests pytest-html",
          "c": "pip install pytest requests pytest-html"
        },
        {
          "t": "Step 2 — Create conftest.py with auth fixture",
          "p": "Define session-scoped auth fixture in conftest.py:",
          "c": "import pytest\nimport requests\n\nBASE_URL = \"https://staging.hrms-app.com/api\"\n\n@pytest.fixture(scope=\"session\")\ndef auth_token():\n    response = requests.post(f\"{BASE_URL}/auth/login\", json={\n        \"email\": \"hr@company.com\",\n        \"password\": \"Admin@1234\"\n    })\n    assert response.status_code == 200\n    return response.json()[\"token\"]\n\n@pytest.fixture(scope=\"session\")\ndef api_headers(auth_token):\n    return {\n        \"Authorization\": f\"Bearer {auth_token}\",\n        \"Content-Type\": \"application/json\"\n    }"
        },
        {
          "t": "Step 3 — Write integration tests",
          "p": "Test employee listing and multi-step balance deduction:",
          "c": "import requests\nimport pytest\n\nBASE_URL = \"https://staging.hrms-app.com/api\"\n\ndef test_get_employees_returns_list(api_headers):\n    response = requests.get(f\"{BASE_URL}/employees\", headers=api_headers)\n    assert response.status_code == 200\n    data = response.json()\n    assert isinstance(data[\"data\"], list)\n    assert len(data[\"data\"]) > 0\n\ndef test_employee_has_required_fields(api_headers):\n    response = requests.get(f\"{BASE_URL}/employees\", headers=api_headers)\n    employee = response.json()[\"data\"][0]\n    assert \"id\" in employee\n    assert \"name\" in employee\n    assert \"department\" in employee\n    assert \"email\" in employee\n\ndef test_create_leave_request_updates_balance(api_headers):\n    # Get balance before\n    balance_before = requests.get(\n        f\"{BASE_URL}/leave/balance/1\", headers=api_headers\n    ).json()[\"annual_leave\"]\n\n    # Submit leave request\n    response = requests.post(f\"{BASE_URL}/leave/request\", headers=api_headers, json={\n        \"employee_id\": 1,\n        \"type\": \"annual\",\n        \"days\": 2,\n        \"reason\": \"Personal work\"\n    })\n    assert response.status_code == 201\n    assert \"request_id\" in response.json()\n\n    # Get balance after\n    balance_after = requests.get(\n        f\"{BASE_URL}/leave/balance/1\", headers=api_headers\n    ).json()[\"annual_leave\"]\n\n    # Integration assertion — balance must have decreased\n    assert balance_after == balance_before - 2"
        },
        {
          "t": "Step 4 — Run with HTML report",
          "p": "pytest tests/integration/ -v --html=reports/integration.html",
          "c": "pytest tests/integration/ -v --html=reports/integration.html"
        },
        {
          "t": "Step 5 — Parameterize for multiple employees",
          "p": "Run same API check against employee ID matrix:",
          "c": "@pytest.mark.parametrize(\"employee_id\", [1, 2, 3, 5, 10])\ndef test_payslip_exists_for_active_employees(api_headers, employee_id):\n    response = requests.get(\n        f\"{BASE_URL}/payslip/{employee_id}/latest\",\n        headers=api_headers\n    )\n    assert response.status_code == 200\n    assert response.json()[\"net_salary\"] > 0"
        }
      ]
    },
    {
      "name": "Selenium",
      "sub": "Browser-backend flow",
      "url": "https://selenium.dev",
      "desc": "Selenium, for integration testing, is used to test the integration between the browser-rendered frontend and the backend services — it clicks real UI elements and verifies that the correct data flows through to the backend and back. While Selenium has largely been replaced by Playwright for new projects, it remains widely deployed in existing enterprise frameworks and is still a valid tool for integration-level UI testing. Its WebDriver protocol controls real browsers, and its WebDriverWait with expected_conditions handles dynamic page elements. Selenium Grid extends it to run integration tests in parallel across multiple browsers simultaneously.",
      "adv": [
        "Mature, 20+ years in production — huge documentation and community",
        "WebDriver protocol works natively with every major browser",
        "Selenium Grid distributes tests across machines and browsers in parallel",
        "Validates the real frontend-to-backend path, not just the API contract"
      ],
      "lim": [
        "No built-in auto-waiting — flakier than Playwright without careful WebDriverWait usage",
        "Slower to author tests than a pure API approach",
        "Heavier setup and maintenance overhead than Postman or PyTest",
        "Overkill when the integration in question doesn't touch the UI at all"
      ],
      "steps": [
        {
          "t": "Step 1 — Install Selenium",
          "p": "pip install selenium webdriver-manager",
          "c": "pip install selenium webdriver-manager"
        },
        {
          "t": "Step 2 — Set up the driver",
          "p": "Initialize Chrome WebDriver with explicit wait:",
          "c": "from selenium import webdriver\nfrom selenium.webdriver.chrome.service import Service\nfrom webdriver_manager.chrome import ChromeDriverManager\nfrom selenium.webdriver.common.by import By\nfrom selenium.webdriver.support.ui import WebDriverWait\nfrom selenium.webdriver.support import expected_conditions as EC\n\ndriver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))\nwait = WebDriverWait(driver, 10)"
        },
        {
          "t": "Step 3 — Write an integration test — login and verify dashboard loads",
          "p": "Validate that login form integrates with user session:",
          "c": "def test_login_integrates_with_session(driver):\n    driver.get(\"https://staging.hrms-app.com/login\")\n\n    driver.find_element(By.ID, \"email\").send_keys(\"hr@company.com\")\n    driver.find_element(By.ID, \"password\").send_keys(\"Admin@1234\")\n    driver.find_element(By.CSS_SELECTOR, \"button[type='submit']\").click()\n\n    # Wait for dashboard — confirms frontend-backend auth integration works\n    dashboard = wait.until(\n        EC.visibility_of_element_located((By.CSS_SELECTOR, \".dashboard-header\"))\n    )\n    assert dashboard.is_displayed()\n    assert \"dashboard\" in driver.current_url"
        },
        {
          "t": "Step 4 — Test form submission integrates with database",
          "p": "Submit leave request and verify backend persistence confirmation:",
          "c": "def test_leave_form_submission_shows_confirmation(driver, auth_session):\n    driver.get(\"https://staging.hrms-app.com/leave/apply\")\n\n    wait.until(EC.element_to_be_clickable((By.ID, \"leave-type\"))).click()\n    driver.find_element(By.CSS_SELECTOR, \"option[value='annual']\").click()\n    driver.find_element(By.ID, \"from-date\").send_keys(\"2025-09-15\")\n    driver.find_element(By.ID, \"to-date\").send_keys(\"2025-09-17\")\n    driver.find_element(By.ID, \"reason\").send_keys(\"Family event\")\n    driver.find_element(By.CSS_SELECTOR, \"button.submit-leave\").click()\n\n    success = wait.until(\n        EC.visibility_of_element_located((By.CSS_SELECTOR, \".success-toast\"))\n    )\n    assert \"Leave request submitted\" in success.text"
        },
        {
          "t": "Step 5 — Always close the driver after tests",
          "p": "driver.quit()",
          "c": "driver.quit()"
        }
      ]
    }
  ],
  "contentMarkdown": "## API Integration Workflow\n\nVerify multi-step API chains with token propagation and contract verification across microservices.\n\n```\npm.collectionVariables.set(\"auth_token\", pm.response.json().token);\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
