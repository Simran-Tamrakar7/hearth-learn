import { ch } from '../helpers.js'

/** PART 1 — Testing by Level. Sourced from the Testing Types Part 1 HTML guide. */
export const testingLevelsManual = {
  id: 'testing-by-level',
  title: 'Testing by Level',
  tagline:
    'The four levels that carry an application from a single function to a signed-off release — why each one matters, the free tools teams use, how to run them, and where each tool falls short.',
  category: 'quality',
  accent: '#0F766E',
  cover: 'covers/test-automation-cover.png',
  duration: '2–3 weeks',
  levelSpan: 'Beginner → Intermediate',
  who: 'QA and builders who need a clear map of unit, integration, system, and acceptance testing — and which tools belong on each rung.',
  outcomes: [
    'Name the four testing levels and what each one is allowed to miss',
    'Write and run unit, integration, and system tests with free tools',
    'Run a UAT cycle with business scenarios, TestRail, Jira, and sign-off',
  ],
  chapters: [
    ch({
      id: 'tbl-guide',
      kind: 'guide',
      phase: 'Part 1 · Testing by Level',
      level: 'beginner',
      title: 'The four rungs',
      minutes: 15,
      durationLabel: 'Day 0',
      overview:
        'Part 1 of the Software Testing Reference. Tests are not a pile of cases — they are levels. A unit test cannot sign off a release. A UAT session cannot prove a function is correct in isolation. This path walks unit, integration, system, and acceptance testing, with the free tools teams actually use and how those tools stack up.',
      learn: ['Unit vs integration vs system vs UAT', 'What each level is allowed to miss', 'Free-tool posture'],
      steps: [
        {
          title: "Read the stack bottom-up",
          body: "Unit tests the smallest piece of code in isolation. Integration verifies that combined modules keep their contracts. System tests the fully wired product the way a user would. Acceptance (UAT) is the business gate: does this fit how the work actually happens?",
          items: [
            "Unit — a function, method, or class; dependencies mocked",
            "Integration — interfaces, data flow, and contracts between modules",
            "System — black-box, end to end, real user path",
            "Acceptance — stakeholders confirm fitness for the business, not just the spec",
          ],
          doThis: "Write one sentence for each level using a product you know. If two sentences sound the same, you do not have the distinction yet.",
        },
        {
          title: "Tools are not levels",
          body: "PyTest can run unit, API, and UI tests. Selenium can sit at integration or system. The level is the question you are asking, not the logo on the runner.",
          tip: "If a tool can do three levels, still pick one question per test. Mixed-purpose suites rot fast.",
        },
      ],
      checklist: ['I can name the four levels in order', 'I can say what a unit test is not allowed to prove'],
    }),

    ch({
      id: "tbl-unit",
      phase: 'Part 1 · Testing by Level',
      level: "beginner",
      title: "Unit Testing",
      minutes: 50,
      overview: "Testing the smallest piece of code in isolation — a single function, method, or class — with every external dependency mocked out.",
      learn: [
        "Why it matters",
        "When to use it",
        "Practical example",
        "JUnit",
        "PyTest",
        "Jest",
      ],
      steps: [
        {
          title: "Why it matters",
          body: "Skipped unit tests mean bugs that could've been caught in seconds during development instead travel all the way to integration, system testing, or production. A bug found at unit level takes minutes to fix; the same bug in production takes hours across multiple systems, and may already have caused data corruption or customer-facing failures. Unit tests also double as living documentation of exactly how each function should behave.",
        },
        {
          title: "When to use it",
          body: "Written at the same time as the code, not after — every function added in a sprint should have tests in the same pull request. They run on every commit in CI/CD and must pass before merge. The cheapest, fastest safety net in development, and it should never be skipped regardless of deadline pressure.",
        },
        {
          title: "Practical example",
          body: "HRMS — Tax deduction logic — Finance reports employee net salaries look wrong after a code change. Unit tests for the tax function immediately pinpoint the broken slab logic — a developer used < instead of <= on the 10% slab boundary, taxing employees earning exactly NPR 500,000 at 20% instead of 10%.",
          items: [
            "Pass — calculate_tax(500000) returns 5000.0 — the 1% slab applies correctly.",
            "Fail — calculate_tax(500000) returns 100000.0 — the boundary bug is caught instantly, before it reaches payroll.",
          ],
        },
        {
          title: "JUnit — Java",
          body: "The standard unit testing framework for Java, built around annotations (@Test, @BeforeEach, @ParameterizedTest) and wired directly into Maven and Gradle build lifecycles.",
          resources: [
            { label: "junit.org", url: "https://junit.org", kind: "Docs" },
          ],
        },
        {
          title: "JUnit: advantages",
          items: [
            "Deep IDE integration — pass/fail shows inline in IntelliJ and Eclipse",
            "Runs automatically as part of the Maven/Gradle build, no extra wiring",
            "Modular Platform/Jupiter/Vintage design supports legacy and modern code side by side",
            "Rich annotation model (@Nested, @ParameterizedTest) keeps large suites organized",
          ],
        },
        {
          title: "JUnit: limitations",
          items: [
            "Java-only — no use outside the JVM ecosystem",
            "More boilerplate than PyTest or Jest for the same test",
            "No built-in mocking — Mockito or similar has to be added separately",
            "Parameterized data sources need extra annotations most teams have to look up each time",
          ],
        },
        {
          title: "JUnit: 01 — Add JUnit to your Maven project",
          body: "In pom.xml, add the junit-jupiter dependency scoped to test.",
          code: "<dependency>\n    <groupId>org.junit.jupiter</groupId>\n    <artifactId>junit-jupiter</artifactId>\n    <version>5.10.0</version>\n    <scope>test</scope>\n</dependency>",
        },
        {
          title: "JUnit: 02 — Write the class under test",
          body: "Create Calculator.java with add, subtract, and divide (which throws on divide-by-zero).",
          code: "public class Calculator {\n    public int add(int a, int b) { return a + b; }\n    public double divide(int a, int b) {\n        if (b == 0) throw new ArithmeticException(\"Cannot divide by zero\");\n        return (double) a / b;\n    }\n}",
        },
        {
          title: "JUnit: 03 — Create the test class",
          body: "Create CalculatorTest.java in src/test/java, with a fresh instance built in @BeforeEach.",
          code: "@BeforeEach\nvoid setUp() { calculator = new Calculator(); }\n\n@Test\nvoid testAddTwoPositiveNumbers() {\n    assertEquals(8, calculator.add(3, 5));\n}",
        },
        {
          title: "JUnit: 04 — Run tests via Maven",
          body: "mvn test compiles and runs the whole suite, reporting failures and errors.",
          code: "mvn test\n\n[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0\n[INFO] BUILD SUCCESS",
        },
        {
          title: "JUnit: 05 — Run with parameterized inputs",
          body: "@ParameterizedTest with @CsvSource runs one test body against many input rows.",
          code: "@ParameterizedTest\n@CsvSource({\"2, 3, 5\", \"0, 0, 0\", \"-1, 1, 0\"})\nvoid testAddMultipleCases(int a, int b, int expected) {\n    assertEquals(expected, calculator.add(a, b));\n}",
        },
        {
          title: "JUnit: 06 — Group tests with @Nested",
          body: "Keeps related cases (e.g. all division tests) organized under one readable block.",
          code: "@Nested\n@DisplayName(\"Division tests\")\nclass DivisionTests {\n    @Test\n    void divideByZero() {\n        assertThrows(ArithmeticException.class, () -> calculator.divide(5, 0));\n    }\n}",
        },
        {
          title: "JUnit: 07 — View results in IntelliJ",
          body: "Right-click the test class → Run. Green tick per pass, red cross per fail, with expected vs actual shown inline.",
        },
        {
          title: "PyTest — Python",
          body: "Python's default testing framework — plain functions prefixed test_, discovered and run with no class inheritance or special imports required.",
          resources: [
            { label: "pytest.org", url: "https://pytest.org", kind: "Docs" },
          ],
        },
        {
          title: "PyTest: advantages",
          items: [
            "Almost zero boilerplate — a plain function is a valid test",
            "One of the richest plugin ecosystems (coverage, parallel runs, HTML reports, mocking, Playwright)",
            "Same framework can cover unit, API/integration, and UI tests",
            "Failure output shows both sides of a failed assertion clearly",
          ],
        },
        {
          title: "PyTest: limitations",
          items: [
            "Python-only",
            "Heavy plugin use can make a suite fragile if plugin versions drift",
            "Fixture scoping (function/class/module/session) has a learning curve",
            "Loose structure means teams need their own conventions to stay consistent",
          ],
        },
        {
          title: "PyTest: 01 — Install PyTest",
          code: "pip install pytest pytest-cov\npytest --version",
        },
        {
          title: "PyTest: 02 — Write the function to test",
          body: "Create salary.py with gross salary and slab-based tax logic.",
          code: "def calculate_tax(gross_salary):\n    if gross_salary <= 500000:\n        return gross_salary * 0.01\n    elif gross_salary <= 700000:\n        return gross_salary * 0.10\n    else:\n        return gross_salary * 0.20",
        },
        {
          title: "PyTest: 03 — Write the test file",
          body: "Create test_salary.py — plain functions starting with test_.",
          code: "def test_tax_lowest_slab():\n    assert calculate_tax(400000) == 4000.0\n\ndef test_negative_basic_raises_error():\n    with pytest.raises(ValueError, match=\"Basic salary cannot be negative\"):\n        calculate_gross_salary(-1000, 5000, 0, 0)",
        },
        {
          title: "PyTest: 04 — Run the tests",
          code: "pytest test_salary.py -v\n\n6 passed in 0.08s",
        },
        {
          title: "PyTest: 05 — Use fixtures for reusable setup",
          body: "A fixture supplies shared test data to any test that requests it by name.",
          code: "@pytest.fixture\ndef employee_data():\n    return {\"basic\": 50000, \"allowances\": 10000,\n            \"overtime_hours\": 5, \"overtime_rate\": 500}",
        },
        {
          title: "PyTest: 06 — Parameterize for multiple scenarios",
          body: "One test body, many input/expected pairs.",
          code: "@pytest.mark.parametrize(\"gross, expected_tax\", [\n    (400000, 4000.0), (600000, 60000.0), (800000, 160000.0),\n])\ndef test_tax_slabs(gross, expected_tax):\n    assert calculate_tax(gross) == expected_tax",
        },
        {
          title: "PyTest: 07 — Run with a coverage report",
          code: "pytest test_salary.py --cov=salary --cov-report=term-missing -v\n\nsalary.py   10   0   100%",
        },
        {
          title: "Jest — JavaScript",
          body: "Meta's zero-configuration testing framework for JavaScript and TypeScript — runner, assertions, mocking, coverage, and snapshot testing bundled into one package.",
          resources: [
            { label: "jestjs.io", url: "https://jestjs.io", kind: "Docs" },
          ],
        },
        {
          title: "Jest: advantages",
          items: [
            "Zero-config — install and run, no separate assertion or mocking library needed",
            "Parallel test execution by default via worker threads",
            "Watch mode re-runs only affected tests for instant feedback",
            "Snapshot testing catches unintended UI changes without writing new assertions",
          ],
        },
        {
          title: "Jest: limitations",
          items: [
            "Snapshot tests get rubber-stamped if diffs aren't actually reviewed",
            "Config gets complex fast for ESM or monorepo setups",
            "Slower cold-start on very large suites than newer runners like Vitest",
            "Full TypeScript support needs the ts-jest wrapper, not native",
          ],
        },
        {
          title: "Jest: 01 — Initialize and install Jest",
          code: "npm init -y\nnpm install --save-dev jest",
        },
        {
          title: "Jest: 02 — Write the function to test",
          body: "Create leaveCalculator.js.",
          code: "function calculateRemainingLeave(totalDays, usedDays) {\n    if (usedDays > totalDays) throw new Error(\"Used days cannot exceed total allocated days\");\n    return totalDays - usedDays;\n}\nmodule.exports = { calculateRemainingLeave };",
        },
        {
          title: "Jest: 03 — Write the test file",
          body: "Create leaveCalculator.test.js using describe/test blocks.",
          code: "describe('calculateRemainingLeave', () => {\n  test('returns correct remaining days', () => {\n    expect(calculateRemainingLeave(20, 5)).toBe(15);\n  });\n});",
        },
        {
          title: "Jest: 04 — Run the tests",
          code: "npm test\n\nTests: 5 passed, 5 total",
        },
        {
          title: "Jest: 05 — Mock a dependency",
          body: "Replace a real API call with a controlled fake response.",
          code: "jest.mock('./api', () => ({\n  getEmployeeById: jest.fn().mockResolvedValue({ id: 1, leaveBalance: 12 })\n}));",
        },
        {
          title: "Jest: 06 — Run with coverage",
          code: "npm run test:coverage\n\nleaveCalculator.js  100  100  100  100",
        },
        {
          title: "Jest: 07 — Run in watch mode",
          body: "Re-runs only the tests affected by your last save — no manual re-run needed.",
          code: "npm run test:watch",
        },
      ],
      checklist: [
        "I can explain why unit testing exists",
        "I can name a pass and a fail for the Unit Testing practical",
        'I know one advantage and one limitation of each tool at this level',
      ],
      practice: {
        title: "Unit Testing — pass vs fail",
        brief: "Replay the HRMS — Tax deduction logic scenario. Write one pass line and one fail line before you open a tool.",
      },
      links: [
        { name: "JUnit", url: "https://junit.org", kind: 'doc' },
        { name: "PyTest", url: "https://pytest.org", kind: 'doc' },
        { name: "Jest", url: "https://jestjs.io", kind: 'doc' },
      ],
    }),

    ch({
      id: "tbl-integration",
      phase: 'Part 1 · Testing by Level',
      level: "intermediate",
      title: "Integration Testing",
      minutes: 50,
      overview: "Verifying that components work correctly once combined — the interfaces, contracts, and data flow between modules that unit tests can't see.",
      learn: [
        "Why it matters",
        "When to use it",
        "Practical example",
        "Postman",
        "PyTest",
        "Selenium",
      ],
      steps: [
        {
          title: "Why it matters",
          body: "The most damaging bugs in real applications live at integration points — API response shapes that don't match what the frontend expects, queries returning unexpected nulls, tokens expiring mid-session, listeners dropping messages under load. These are invisible to unit tests because unit tests mock all external dependencies. Skip this level and interface bugs survive all the way to system testing or production, where they're far more expensive to trace.",
        },
        {
          title: "When to use it",
          body: "Begins as soon as two or more components are ready to connect — typically mid-sprint once a feature's API and frontend both exist. Runs in CI/CD on every pull request targeting main. A full integration suite must pass before any build is promoted to system testing or staging.",
        },
        {
          title: "Practical example",
          body: "HRMS — Leave request to balance integration — Full flow: log in, read an employee's leave balance (12 days), submit a 3-day annual leave request, re-read the balance, check a manager notification exists, approve the request, and re-check the balance stays consistent.",
          items: [
            "Pass — All 7 steps succeed — balance drops from 12 to 9 on request, notification is created, and stays at 9 after approval.",
            "Fail — Balance still shows 12 after the request — the leave service isn't wired to the balance service, a bug unit tests would never catch.",
          ],
        },
        {
          title: "Postman — API client",
          body: "An HTTP client built around Collections — grouped, chained API requests with variables passed between them and JavaScript assertions on every response.",
          resources: [
            { label: "postman.com", url: "https://postman.com", kind: "Docs" },
          ],
        },
        {
          title: "Postman: advantages",
          items: [
            "GUI-based, so non-developers can build and run requests without code",
            "Collections + variables make chaining requests (e.g. login → use token) simple",
            "Newman CLI runs full collections in CI/CD with JUnit-style reports",
            "One-click environment switching between dev, staging, and production",
          ],
        },
        {
          title: "Postman: limitations",
          items: [
            "Test scripts are JavaScript-only inside the Tests tab — awkward for complex logic",
            "Large collections get hard to navigate and maintain over time",
            "Free tier has workspace and monthly request limits at scale",
            "Not built for direct database checks — HTTP only",
          ],
        },
        {
          title: "Postman: 01 — Install Postman",
          body: "Download from postman.com/downloads and create a free account (unlimited collections and requests on the free tier).",
        },
        {
          title: "Postman: 02 — Create a Collection",
          body: "New → Collection, name it e.g. HRMS Integration Tests — this is your test suite.",
        },
        {
          title: "Postman: 03 — Set a collection variable for the base URL",
          code: "base_url = https://staging.hrms-app.com/api",
        },
        {
          title: "Postman: 04 — Add a login request and extract the token",
          body: "POST {{base_url}}/auth/login, then in the Tests tab assert 200 and save the token as a variable.",
          code: "pm.test(\"Login returns 200\", () => pm.response.to.have.status(200));\npm.collectionVariables.set(\"auth_token\", pm.response.json().token);",
        },
        {
          title: "Postman: 05 — Add a chained request using the token",
          body: "GET {{base_url}}/employees with Authorization: Bearer {{auth_token}}, then assert the response shape.",
          code: "pm.test(\"Returns array of employees\", () => {\n  pm.expect(pm.response.json().data).to.be.an(\"array\");\n});",
        },
        {
          title: "Postman: 06 — Run the full collection",
          body: "Collection name → Run collection — executes every request in order and shows pass/fail per assertion.",
        },
        {
          title: "Postman: 07 — Run from the terminal with Newman",
          code: "npm install -g newman newman-reporter-htmlextra\nnewman run HRMS_Integration_Tests.json -e staging_environment.json \\\n  --reporters cli,htmlextra --reporter-htmlextra-export reports/integration_report.html",
        },
        {
          title: "PyTest — API integration",
          body: "Used with the requests library, PyTest becomes an API integration tool that can add real logic — database checks, data manipulation — that Postman's scripts can't easily do.",
          resources: [
            { label: "pytest.org", url: "https://pytest.org", kind: "Docs" },
          ],
        },
        {
          title: "PyTest: advantages",
          items: [
            "Full Python logic available in tests — DB queries, complex assertions",
            "Same framework and CI config as unit and UI tests, if already used elsewhere",
            "Session-scoped fixtures share an auth token across an entire suite",
            "pytest-html produces shareable, professional reports",
          ],
        },
        {
          title: "PyTest: limitations",
          items: [
            "Requires Python fluency — not approachable for manual/business testers",
            "No GUI for quickly exploring an endpoint ad hoc, unlike Postman",
            "Test data cleanup has to be handled manually in code",
            "Less visual — harder to demo results to non-technical stakeholders",
          ],
        },
        {
          title: "PyTest: 01 — Install dependencies",
          code: "pip install pytest requests pytest-html",
        },
        {
          title: "PyTest: 02 — Create conftest.py with an auth fixture",
          body: "Logs in once per session and shares the token across all tests.",
          code: "@pytest.fixture(scope=\"session\")\ndef auth_token():\n    r = requests.post(f\"{BASE_URL}/auth/login\", json={...})\n    assert r.status_code == 200\n    return r.json()[\"token\"]",
        },
        {
          title: "PyTest: 03 — Write integration tests",
          body: "Checks that submitting a leave request actually decreases the stored balance.",
          code: "def test_create_leave_request_updates_balance(api_headers):\n    before = requests.get(f\"{BASE_URL}/leave/balance/1\", headers=api_headers).json()[\"annual_leave\"]\n    requests.post(f\"{BASE_URL}/leave/request\", headers=api_headers, json={\"employee_id\":1,\"days\":2})\n    after = requests.get(f\"{BASE_URL}/leave/balance/1\", headers=api_headers).json()[\"annual_leave\"]\n    assert after == before - 2",
        },
        {
          title: "PyTest: 04 — Run with an HTML report",
          code: "pytest tests/integration/ -v --html=reports/integration.html",
        },
        {
          title: "PyTest: 05 — Parameterize across multiple employees",
          code: "@pytest.mark.parametrize(\"employee_id\", [1, 2, 3, 5, 10])\ndef test_payslip_exists_for_active_employees(api_headers, employee_id):\n    r = requests.get(f\"{BASE_URL}/payslip/{employee_id}/latest\", headers=api_headers)\n    assert r.status_code == 200",
        },
        {
          title: "Selenium — Browser-backend flow",
          body: "Used at the integration level to click real UI elements and confirm the correct data actually reaches the backend and comes back, rather than testing the API directly.",
          resources: [
            { label: "selenium.dev", url: "https://selenium.dev", kind: "Docs" },
          ],
        },
        {
          title: "Selenium: advantages",
          items: [
            "Mature, 20+ years in production — huge documentation and community",
            "WebDriver protocol works natively with every major browser",
            "Selenium Grid distributes tests across machines and browsers in parallel",
            "Validates the real frontend-to-backend path, not just the API contract",
          ],
        },
        {
          title: "Selenium: limitations",
          items: [
            "No built-in auto-waiting — flakier than Playwright without careful WebDriverWait usage",
            "Slower to author tests than a pure API approach",
            "Heavier setup and maintenance overhead than Postman or PyTest",
            "Overkill when the integration in question doesn't touch the UI at all",
          ],
        },
        {
          title: "Selenium: 01 — Install Selenium",
          code: "pip install selenium webdriver-manager",
        },
        {
          title: "Selenium: 02 — Set up the driver",
          code: "driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))\nwait = WebDriverWait(driver, 10)",
        },
        {
          title: "Selenium: 03 — Test login integrates with session",
          body: "Confirms the frontend-backend auth handshake actually works, not just that the API returns 200.",
          code: "driver.get(\"https://staging.hrms-app.com/login\")\ndriver.find_element(By.ID, \"email\").send_keys(\"hr@company.com\")\ndriver.find_element(By.CSS_SELECTOR, \"button[type='submit']\").click()\ndashboard = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, \".dashboard-header\")))\nassert dashboard.is_displayed()",
        },
        {
          title: "Selenium: 04 — Test a form submission integrates with the database",
          body: "Submits a real leave request through the UI and checks for a success toast.",
          code: "driver.find_element(By.ID, \"from-date\").send_keys(\"2025-09-15\")\ndriver.find_element(By.CSS_SELECTOR, \"button.submit-leave\").click()\nsuccess = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, \".success-toast\")))\nassert \"Leave request submitted\" in success.text",
        },
        {
          title: "Selenium: 05 — Always close the driver after tests",
          code: "driver.quit()",
        },
      ],
      checklist: [
        "I can explain why integration testing exists",
        "I can name a pass and a fail for the Integration Testing practical",
        'I know one advantage and one limitation of each tool at this level',
      ],
      practice: {
        title: "Integration Testing — pass vs fail",
        brief: "Replay the HRMS — Leave request to balance integration scenario. Write one pass line and one fail line before you open a tool.",
      },
      links: [
        { name: "Postman", url: "https://postman.com", kind: 'doc' },
        { name: "PyTest", url: "https://pytest.org", kind: 'doc' },
        { name: "Selenium", url: "https://selenium.dev", kind: 'doc' },
      ],
    }),

    ch({
      id: "tbl-system",
      phase: 'Part 1 · Testing by Level',
      level: "intermediate",
      title: "System Testing",
      minutes: 45,
      overview: "Testing the fully integrated application as a black box, end to end, exactly the way a real user would experience it.",
      learn: [
        "Why it matters",
        "When to use it",
        "Practical example",
        "Playwright",
        "Selenium",
      ],
      steps: [
        {
          title: "Why it matters",
          body: "System testing is the last major technical quality gate before software reaches users. It proves the application works not just piece by piece but as the unified product a real user interacts with. Bugs found here cost more to fix than earlier-level bugs, but far less than bugs found after go-live — and it produces the most business-relevant pass/fail evidence for stakeholders.",
        },
        {
          title: "When to use it",
          body: "Begins after integration testing passes and the app is deployed to a stable staging environment. Critical-path tests run on every release candidate; a full regression suite runs before every major release, after significant features, and after architectural changes. Never the only testing layer — it works best sitting on top of solid unit and integration coverage.",
        },
        {
          title: "Practical example",
          body: "HRMS Payroll System — Full payroll cycle: log in as Payroll Admin, select the pay period, confirm all 47 active employees appear, process payroll, wait for async completion, verify one employee's gross/tax/net figures, generate payslips, then log in as that employee and check the payslip is visible.",
          items: [
            "Pass — All 10 steps succeed — payroll flows end-to-end correctly.",
            "Fail — The employee can't see their payslip after generation — a cross-module visibility bug only detectable at system level.",
          ],
        },
        {
          title: "Playwright — Modern browser automation",
          body: "Microsoft's browser automation library, built by former Puppeteer engineers, with auto-waiting and a Trace Viewer designed to remove the flakiness that plagued older tools.",
          resources: [
            { label: "playwright.dev", url: "https://playwright.dev", kind: "Docs" },
          ],
        },
        {
          title: "Playwright: advantages",
          items: [
            "Auto-waiting removes most timing-related flaky failures automatically",
            "One API drives Chromium, Firefox, and WebKit — no per-browser rewrites",
            "Trace Viewer replays a failed run step-by-step with screenshots and network calls",
            "Network interception mocks specific states without touching the real database",
          ],
        },
        {
          title: "Playwright: limitations",
          items: [
            "Newer tool — smaller long-tail community and fewer legacy integrations than Selenium",
            "Teams migrating from Selenium have a real API and mental-model switch to make",
            "Best support is in modern language bindings; older stacks may not be first-class",
            "Trace files can get large on long test runs, adding storage overhead",
          ],
        },
        {
          title: "Playwright: 01 — Install Playwright",
          code: "pip install playwright pytest-playwright\nplaywright install",
        },
        {
          title: "Playwright: 02 — Configure conftest.py",
          body: "Headless launch, a shared base_url, and generous default timeouts.",
          code: "@pytest.fixture(scope=\"session\")\ndef browser_type_launch_args():\n    return {\"headless\": True}\n\n@pytest.fixture(scope=\"session\")\ndef base_url():\n    return \"https://staging.hrms-app.com\"",
        },
        {
          title: "Playwright: 03 — Write a complete system test",
          body: "Log in, add an employee end-to-end, and confirm it shows up in the list.",
          code: "def test_employee_onboarding_complete_flow(page: Page):\n    page.goto(\"https://staging.hrms-app.com/login\")\n    page.get_by_label(\"Email\").fill(\"hr@company.com\")\n    page.get_by_role(\"button\", name=\"Login\").click()\n    expect(page.get_by_role(\"heading\", name=\"Dashboard\")).to_be_visible()",
        },
        {
          title: "Playwright: 04 — Enable tracing for failure debugging",
          body: "Captures screenshots, DOM snapshots, and sources for every test run.",
          code: "context.tracing.start(screenshots=True, snapshots=True, sources=True)\nyield context\ncontext.tracing.stop(path=\"traces/trace.zip\")",
        },
        {
          title: "Playwright: 05 — Run the tests",
          code: "pytest tests/ -v --html=reports/system_test_report.html",
        },
        {
          title: "Playwright: 06 — View a trace on failure",
          code: "playwright show-trace traces/trace_failed_test.zip",
        },
        {
          title: "Selenium — Veteran browser automation",
          body: "The longest-standing browser automation tool, still widely deployed in enterprise frameworks, with WebDriver support in effectively every browser and CI system.",
          resources: [
            { label: "selenium.dev", url: "https://selenium.dev", kind: "Docs" },
          ],
        },
        {
          title: "Selenium: advantages",
          items: [
            "20+ years of maturity — the largest documentation base and community in the space",
            "Integrates with virtually every CI/CD and test management tool that exists",
            "Selenium Grid scales to large cross-browser, cross-machine test suites",
            "Strong fit for teams with existing Java or C# Selenium frameworks",
          ],
        },
        {
          title: "Selenium: limitations",
          items: [
            "No auto-waiting — tests are more flaky by default without careful explicit waits",
            "Test authoring is more verbose and slower than Playwright",
            "Falling behind on developer experience — weaker debugging tools out of the box",
            "Higher long-term maintenance cost as the UI under test evolves",
          ],
        },
        {
          title: "Selenium: 01 — Install dependencies",
          code: "pip install selenium webdriver-manager pytest",
        },
        {
          title: "Selenium: 02 — Create a headless driver fixture",
          code: "options = webdriver.ChromeOptions()\noptions.add_argument(\"--headless\")\ndriver = webdriver.Chrome(service=service, options=options)\ndriver.implicitly_wait(10)",
        },
        {
          title: "Selenium: 03 — Write a system test",
          body: "Full leave-application workflow from login to a visible success message.",
          code: "driver.find_element(By.ID, \"email\").send_keys(\"emp@company.com\")\ndriver.find_element(By.CSS_SELECTOR, \"button[type='submit']\").click()\nleave_link = wait.until(EC.element_to_be_clickable((By.LINK_TEXT, \"Apply Leave\")))\nleave_link.click()",
        },
        {
          title: "Selenium: 04 — Take a screenshot on failure",
          code: "@pytest.fixture(autouse=True)\ndef screenshot_on_failure(driver, request):\n    yield\n    if request.node.rep_call.failed:\n        driver.save_screenshot(f\"screenshots/{request.node.name}.png\")",
        },
        {
          title: "Selenium: 05 — Run tests in parallel",
          code: "pip install pytest-xdist\npytest tests/ -n 4",
        },
      ],
      checklist: [
        "I can explain why system testing exists",
        "I can name a pass and a fail for the System Testing practical",
        'I know one advantage and one limitation of each tool at this level',
      ],
      practice: {
        title: "System Testing — pass vs fail",
        brief: "Replay the HRMS Payroll System scenario. Write one pass line and one fail line before you open a tool.",
      },
      links: [
        { name: "Playwright", url: "https://playwright.dev", kind: 'doc' },
        { name: "Selenium", url: "https://selenium.dev", kind: 'doc' },
      ],
    }),

    ch({
      id: "tbl-uat",
      phase: 'Part 1 · Testing by Level',
      level: "intermediate",
      title: "Acceptance Testing (UAT)",
      minutes: 40,
      overview: "The final gate before release, performed by real business stakeholders to confirm the software fits how the business actually works — not just the written spec.",
      learn: [
        "Why it matters",
        "When to use it",
        "Practical example",
        "Manual Testing",
        "TestRail",
        "Jira",
      ],
      steps: [
        {
          title: "Why it matters",
          body: "Requirements pass through humans, developers, and project managers — three points where meaning can drift from original intent. UAT is where that drift surfaces while it's still cheap to fix. A system can pass every automated test and still fail UAT, because it was technically correct but didn't match business reality. In regulated industries UAT sign-off is a legal requirement, not optional.",
        },
        {
          title: "When to use it",
          body: "Mandatory before every production release, without exception. Lightweight UAT happens at Sprint Review in agile projects; full formal UAT with sign-off happens before every major release. If a go-live proceeds without UAT sign-off, the business must document and formally accept that risk.",
        },
        {
          title: "Practical example",
          body: "HRMS — Leave policy compliance UAT — An HR Director with 15 years of experience applies for 3 days of casual leave for an employee who only has 2 remaining. Every automated test passed because test data always had sufficient balance — nobody tested this real-world boundary.",
          items: [
            "Pass — System now shows \"Insufficient casual leave balance. Available: 2 days, Requested: 3 days. Request rejected.\"",
            "Fail — The system approves the request with no warning, allowing a negative leave balance — a Blocker, since it breaks policy and causes payroll complications.",
          ],
        },
        {
          title: "Manual Testing — Primary UAT method",
          body: "Business users work through real scenarios — not scripted steps — applying job knowledge no automated check can substitute for.",
        },
        {
          title: "Manual Testing: advantages",
          items: [
            "Applies real business judgment automation structurally cannot replicate",
            "Scenarios are business-driven, surfacing exceptions a spec never anticipated",
            "Catches requirement drift and specification gaps before go-live",
            "Produces the formal, signed acceptance record required for sign-off",
          ],
        },
        {
          title: "Manual Testing: limitations",
          items: [
            "Business users aren't trained testers — coverage can be inconsistent",
            "Scheduling time with busy stakeholders is a recurring bottleneck",
            "Feedback is often vague and needs a QA engineer to turn into an actionable bug",
            "Doesn't scale to frequent releases the way automated levels do",
          ],
        },
        {
          title: "Manual Testing: 01 — Define UAT entry criteria",
          body: "System tests pass, a stable UAT environment exists, realistic test data is loaded, tester accounts are set up, and a schedule is agreed.",
        },
        {
          title: "Manual Testing: 02 — Write scenarios in business language",
          body: "Not click-by-click scripts — business tasks with context and an expected outcome.",
          code: "UAT Scenario: Process Monthly Payroll — August 2025\n1. Log in as Payroll Manager\n2. Select August 2025 pay period\n3. Confirm all 47 active employees appear\n4. Verify gross salaries against the approved salary sheet\n5. Process payroll, generate payslips, mark disbursed",
        },
        {
          title: "Manual Testing: 03 — Brief UAT testers",
          body: "A short 30-minute session: what UAT is for, how to mark pass/fail, how to report a bug.",
        },
        {
          title: "Manual Testing: 04 — Execute UAT sessions",
          body: "A QA engineer observes and takes notes without steering — an unexpected path a tester takes is real user behaviour worth capturing.",
        },
        {
          title: "Manual Testing: 05 — Log all findings",
          body: "Classify every finding as Blocker, Major, or Minor.",
        },
        {
          title: "Manual Testing: 06 — Fix, retest, and get sign-off",
          body: "Dev fixes blockers and agreed majors; testers retest those specific scenarios; the authorised stakeholder formally signs off.",
        },
        {
          title: "Manual Testing: 07 — Document the results",
          body: "A completion report: scenarios tested, pass/fail counts, bugs found and fixed, accepted known issues, and signatures.",
        },
        {
          title: "TestRail — Test case management",
          body: "A web-based test case manager where UAT scenarios are assigned to specific business testers, who click through and mark pass/fail with comments — no technical skill needed.",
          resources: [
            { label: "testrail.com", url: "https://testrail.com", kind: "Docs" },
          ],
        },
        {
          title: "TestRail: advantages",
          items: [
            "Structured scenario tracking that non-technical testers can execute unaided",
            "Real-time dashboards show UAT progress without chasing anyone for status",
            "Direct Jira integration turns a failed case into a bug ticket automatically",
            "Free tier is workable for a typical small UAT cycle",
          ],
        },
        {
          title: "TestRail: limitations",
          items: [
            "Free tier caps users and projects — a constraint on larger UAT rounds",
            "Someone still has to author good business-language scenarios up front",
            "One more tool for already-busy stakeholders to get oriented in",
            "Limited value on its own without a bug tracker connected to it",
          ],
        },
        {
          title: "TestRail: 01 — Create a free TestRail account",
          body: "Sign up at testrail.com or use the hosted trial.",
        },
        {
          title: "TestRail: 02 — Create a project",
          body: "e.g. \"HRMS UAT — August 2025 Release\".",
        },
        {
          title: "TestRail: 03 — Create a test suite with UAT scenarios",
          body: "Business-language cases with title, description, and plain-English expected result.",
        },
        {
          title: "TestRail: 04 — Create a test plan and assign testers",
          body: "Payroll scenarios to the Payroll Manager, leave scenarios to the HR Director.",
        },
        {
          title: "TestRail: 05 — Testers execute and record results",
          body: "Pass, Fail, or Blocked, with comments, all from the browser.",
        },
        {
          title: "TestRail: 06 — Track progress and export a report",
          body: "Live dashboard during the cycle; export a PDF for the sign-off record at the end.",
        },
        {
          title: "Jira — Bug & feedback tracking",
          body: "The bug and feedback repository for a UAT cycle — testers log what they saw, developers pick it up, fix it, and hand it back for retest.",
          resources: [
            { label: "atlassian.com/software/jira", url: "https://atlassian.com/software/jira", kind: "Docs" },
          ],
        },
        {
          title: "Jira: advantages",
          items: [
            "Industry-standard issue tracking most teams already know",
            "Kanban board gives a visual read on every open UAT finding at a glance",
            "Free tier covers up to 10 users, enough for most UAT teams",
            "Clear fix loop: open → fixed → ready for retest → closed",
          ],
        },
        {
          title: "Jira: limitations",
          items: [
            "Not a test case manager by itself — needs TestRail or similar alongside it",
            "10-user free cap can be limiting once stakeholders are added in",
            "Can get cluttered and noisy without disciplined ticket hygiene",
            "UAT-specific workflows and fields need to be configured, not default",
          ],
        },
        {
          title: "Jira: 01 — Create a free Jira account",
          body: "Create a project, e.g. \"HRMS UAT Bugs\".",
        },
        {
          title: "Jira: 02 — Configure issue types",
          body: "Bug for defects, Task for retest activity, Feedback for non-bug observations.",
        },
        {
          title: "Jira: 03 — Testers log bugs",
          body: "Summary, description (steps/expected/actual), priority, and a screenshot attachment.",
          code: "Summary: Payslip shows wrong tax amount for employees above NPR 700,000\nPriority: Blocker",
        },
        {
          title: "Jira: 04 — Developers work the queue",
          body: "Filter for open UAT bugs, fix, transition to \"Fixed — Ready for UAT Retest\".",
        },
        {
          title: "Jira: 05 — Tester retests and closes",
          body: "Confirms the fix and closes the ticket, or reopens with comments.",
        },
        {
          title: "Jira: 06 — UAT sign-off",
          body: "Once all Blockers and agreed Majors are closed, export a zero-open-blockers report for the formal sign-off document.",
        },
      ],
      checklist: [
        "I can explain why acceptance testing (uat) exists",
        "I can name a pass and a fail for the Acceptance Testing (UAT) practical",
        'I know one advantage and one limitation of each tool at this level',
      ],
      practice: {
        title: "Acceptance Testing (UAT) — pass vs fail",
        brief: "Replay the HRMS — Leave policy compliance UAT scenario. Write one pass line and one fail line before you open a tool.",
      },
      links: [
        { name: "TestRail", url: "https://testrail.com", kind: 'doc' },
        { name: "Jira", url: "https://atlassian.com/software/jira", kind: 'doc' },
      ],
    }),

    ch({
      id: 'tbl-checkpoint',
      kind: 'checkpoint',
      phase: 'Part 1 · Gate',
      level: 'intermediate',
      title: 'Checkpoint: pick the right level',
      minutes: 25,
      durationLabel: 'Gate',
      overview:
        'Prove you can assign a test to a level and a tool without inflating the pyramid. Four levels, ten tools, free tier — use them on purpose.',
      learn: ['Level selection', 'Tool tradeoffs', 'Pyramid hygiene'],
      steps: [
        {
          title: "Assign four tests",
          body: "Take one feature. Write four tests — one per level — and name the tool you would use, plus one limitation you accept.",
          items: [
            "Unit — JUnit, PyTest, or Jest",
            "Integration — Postman, PyTest, or Selenium",
            "System — Playwright or Selenium",
            "UAT — manual + TestRail + Jira",
          ],
          doThis: "Publish a one-pager: feature, four tests, four tools, four limitations.",
        },
        {
          title: "Kill one redundant E2E",
          body: "If you already have a unit test for the calculation and an API test for the contract, the browser path should only prove the user can finish the job. Cut anything else.",
          quiz: {
            question: "A discount formula is wrong. Which level should catch it first?",
            options: ["Unit","Integration","System","UAT"],
            answer: 0,
            explain: "A formula is a unit. System and UAT may still fail, but they are the expensive place to learn that math is wrong.",
          },
        },
      ],
      checklist: [
        'Four tests mapped to four levels',
        'Each tool has a named limitation',
        'No E2E that only re-proves a unit',
      ],
      practice: {
        title: 'Level one-pager',
        brief: 'Share the four-test map with a peer. If they cannot tell the levels apart from your wording, rewrite.',
      },
    }),
  ],
  resources: {
    docs: [
      { name: 'JUnit', url: 'https://junit.org' },
      { name: 'PyTest', url: 'https://pytest.org' },
      { name: 'Jest', url: 'https://jestjs.io' },
      { name: 'Postman', url: 'https://postman.com' },
      { name: 'Playwright', url: 'https://playwright.dev' },
      { name: 'Selenium', url: 'https://selenium.dev' },
      { name: 'TestRail', url: 'https://testrail.com' },
      { name: 'Jira', url: 'https://atlassian.com/software/jira' },
    ],
    tools: ['JUnit', 'PyTest', 'Jest', 'Postman', 'Playwright', 'Selenium', 'TestRail', 'Jira'],
    practice: ['Map one feature to all four levels before adding more E2E.'],
  },
}
