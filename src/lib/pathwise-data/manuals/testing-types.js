import { ch, r } from '../helpers.js'

/** Tools Data for Part 1: By Level */
const UNIT_TOOLS = [
  {
    name: 'JUnit',
    sub: 'Java',
    url: 'https://junit.org',
    desc: 'The standard unit testing framework for Java, built around annotations (@Test, @BeforeEach, @ParameterizedTest) and wired directly into Maven and Gradle build lifecycles.',
    adv: [
      'Deep IDE integration — pass/fail shows inline in IntelliJ and Eclipse',
      'Runs automatically as part of the Maven/Gradle build, no extra wiring',
      'Modular Platform/Jupiter/Vintage design supports legacy and modern code side by side',
      'Rich annotation model (@Nested, @ParameterizedTest) keeps large suites organized',
    ],
    lim: [
      'Java-only — no use outside the JVM ecosystem',
      'More boilerplate than PyTest or Jest for the same test',
      'No built-in mocking — Mockito or similar has to be added separately',
      'Parameterized data sources need extra annotations most teams have to look up each time',
    ],
    steps: [
      {
        t: 'Add JUnit to your Maven project',
        p: 'In pom.xml, add the junit-jupiter dependency scoped to test.',
        c: `<dependency>\n    <groupId>org.junit.jupiter</groupId>\n    <artifactId>junit-jupiter</artifactId>\n    <version>5.10.0</version>\n    <scope>test</scope>\n</dependency>`,
      },
      {
        t: 'Write the class under test',
        p: 'Create Calculator.java with add, subtract, and divide (which throws on divide-by-zero).',
        c: `public class Calculator {\n    public int add(int a, int b) { return a + b; }\n    public double divide(int a, int b) {\n        if (b == 0) throw new ArithmeticException("Cannot divide by zero");\n        return (double) a / b;\n    }\n}`,
      },
      {
        t: 'Create the test class',
        p: 'Create CalculatorTest.java in src/test/java, with a fresh instance built in @BeforeEach.',
        c: `@BeforeEach\nvoid setUp() { calculator = new Calculator(); }\n\n@Test\nvoid testAddTwoPositiveNumbers() {\n    assertEquals(8, calculator.add(3, 5));\n}`,
      },
      {
        t: 'Run tests via Maven',
        p: 'mvn test compiles and runs the whole suite, reporting failures and errors.',
        c: `mvn test\n\n[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0\n[INFO] BUILD SUCCESS`,
      },
      {
        t: 'Run with parameterized inputs',
        p: '@ParameterizedTest with @CsvSource runs one test body against many input rows.',
        c: `@ParameterizedTest\n@CsvSource({"2, 3, 5", "0, 0, 0", "-1, 1, 0"})\nvoid testAddMultipleCases(int a, int b, int expected) {\n    assertEquals(expected, calculator.add(a, b));\n}`,
      },
    ],
  },
  {
    name: 'PyTest',
    sub: 'Python',
    url: 'https://pytest.org',
    desc: "Python's default testing framework — plain functions prefixed test_, discovered and run with no class inheritance or special imports required.",
    adv: [
      'Almost zero boilerplate — a plain function is a valid test',
      'One of the richest plugin ecosystems (coverage, parallel runs, HTML reports, mocking, Playwright)',
      'Same framework can cover unit, API/integration, and UI tests',
      'Failure output shows both sides of a failed assertion clearly',
    ],
    lim: [
      'Python-only',
      'Heavy plugin use can make a suite fragile if plugin versions drift',
      'Fixture scoping (function/class/module/session) has a learning curve',
      'Loose structure means teams need their own conventions to stay consistent',
    ],
    steps: [
      {
        t: 'Install PyTest',
        p: 'Install pytest and coverage plugin via pip.',
        c: `pip install pytest pytest-cov\npytest --version`,
      },
      {
        t: 'Write the function to test',
        p: 'Create salary.py with gross salary and slab-based tax logic.',
        c: `def calculate_tax(gross_salary):\n    if gross_salary <= 500000:\n        return gross_salary * 0.01\n    elif gross_salary <= 700000:\n        return gross_salary * 0.10\n    else:\n        return gross_salary * 0.20`,
      },
      {
        t: 'Write the test file',
        p: 'Create test_salary.py — plain functions starting with test_.',
        c: `def test_tax_lowest_slab():\n    assert calculate_tax(400000) == 4000.0\n\ndef test_negative_basic_raises_error():\n    with pytest.raises(ValueError, match="Basic salary cannot be negative"):\n        calculate_gross_salary(-1000, 5000, 0, 0)`,
      },
      {
        t: 'Run with parameterized inputs and coverage',
        p: 'One test body, many input/expected pairs.',
        c: `@pytest.mark.parametrize("gross, expected_tax", [\n    (400000, 4000.0), (600000, 60000.0), (800000, 160000.0),\n])\ndef test_tax_slabs(gross, expected_tax):\n    assert calculate_tax(gross) == expected_tax\n\n# Run with coverage report:\n# pytest test_salary.py --cov=salary --cov-report=term-missing -v`,
      },
    ],
  },
  {
    name: 'Jest',
    sub: 'JavaScript',
    url: 'https://jestjs.io',
    desc: "Meta's zero-configuration testing framework for JavaScript and TypeScript — runner, assertions, mocking, coverage, and snapshot testing bundled into one package.",
    adv: [
      'Zero-config — install and run, no separate assertion or mocking library needed',
      'Parallel test execution by default via worker threads',
      'Watch mode re-runs only affected tests for instant feedback',
      'Snapshot testing catches unintended UI changes without writing new assertions',
    ],
    lim: [
      "Snapshot tests get rubber-stamped if diffs aren't actually reviewed",
      'Config gets complex fast for ESM or monorepo setups',
      'Slower cold-start on very large suites than newer runners like Vitest',
      'Full TypeScript support needs the ts-jest wrapper, not native',
    ],
    steps: [
      {
        t: 'Initialize and install Jest',
        p: 'Add jest to devDependencies.',
        c: `npm init -y\nnpm install --save-dev jest`,
      },
      {
        t: 'Write the function to test',
        p: 'Create leaveCalculator.js.',
        c: `function calculateRemainingLeave(totalDays, usedDays) {\n    if (usedDays > totalDays) throw new Error("Used days cannot exceed total allocated days");\n    return totalDays - usedDays;\n}\nmodule.exports = { calculateRemainingLeave };`,
      },
      {
        t: 'Write the test file',
        p: 'Create leaveCalculator.test.js using describe/test blocks.',
        c: `describe('calculateRemainingLeave', () => {\n  test('returns correct remaining days', () => {\n    expect(calculateRemainingLeave(20, 5)).toBe(15);\n  });\n});`,
      },
      {
        t: 'Run tests and watch mode',
        p: 'Execute the suite with coverage.',
        c: `npm test\nnpm run test:coverage`,
      },
    ],
  },
]

const INTEGRATION_TOOLS = [
  {
    name: 'Postman',
    sub: 'API client',
    url: 'https://postman.com',
    desc: 'An HTTP client built around Collections — grouped, chained API requests with variables passed between them and JavaScript assertions on every response.',
    adv: [
      'GUI-based, so non-developers can build and run requests without code',
      'Collections + variables make chaining requests (e.g. login → use token) simple',
      'Newman CLI runs full collections in CI/CD with JUnit-style reports',
      'One-click environment switching between dev, staging, and production',
    ],
    lim: [
      'Test scripts are JavaScript-only inside the Tests tab — awkward for complex logic',
      'Large collections get hard to navigate and maintain over time',
      'Free tier has workspace and monthly request limits at scale',
      'Not built for direct database checks — HTTP only',
    ],
    steps: [
      {
        t: 'Create a Collection & set base URL variable',
        p: 'Create HRMS Integration Tests collection and configure {{base_url}}.',
        c: `base_url = https://staging.hrms-app.com/api`,
      },
      {
        t: 'Add login request and extract JWT token',
        p: 'POST {{base_url}}/auth/login, assert 200, and save token in collection variables.',
        c: `pm.test("Login returns 200", () => pm.response.to.have.status(200));\npm.collectionVariables.set("auth_token", pm.response.json().token);`,
      },
      {
        t: 'Add chained request with token header',
        p: 'GET {{base_url}}/employees with Bearer {{auth_token}} and assert schema.',
        c: `pm.test("Returns array of employees", () => {\n  pm.expect(pm.response.json().data).to.be.an("array");\n});`,
      },
      {
        t: 'Run with Newman in CI/CD',
        p: 'Automate collection run and export HTML report.',
        c: `npm install -g newman newman-reporter-htmlextra\nnewman run HRMS_Integration_Tests.json -e staging_environment.json \\\n  --reporters cli,htmlextra --reporter-htmlextra-export reports/integration_report.html`,
      },
    ],
  },
  {
    name: 'PyTest',
    sub: 'API integration',
    url: 'https://pytest.org',
    desc: "Used with the requests library, PyTest becomes an API integration tool that can add real logic — database checks, data manipulation — that Postman's scripts can't easily do.",
    adv: [
      'Full Python logic available in tests — DB queries, complex assertions',
      'Same framework and CI config as unit and UI tests, if already used elsewhere',
      'Session-scoped fixtures share an auth token across an entire suite',
      'pytest-html produces shareable, professional reports',
    ],
    lim: [
      'Requires Python fluency — not approachable for manual/business testers',
      'No GUI for quickly exploring an endpoint ad hoc, unlike Postman',
      'Test data cleanup has to be handled manually in code',
      'Less visual — harder to demo results to non-technical stakeholders',
    ],
    steps: [
      {
        t: 'Install requests & pytest-html',
        p: 'Set up testing libraries.',
        c: `pip install pytest requests pytest-html`,
      },
      {
        t: 'Create conftest.py with session token fixture',
        p: 'Authenticate once and pass headers to all integration tests.',
        c: `@pytest.fixture(scope="session")\ndef auth_token():\n    r = requests.post(f"{BASE_URL}/auth/login", json={"user":"admin","pass":"secret"})\n    assert r.status_code == 200\n    return r.json()["token"]`,
      },
      {
        t: 'Write multi-step integration assertions',
        p: 'Verify that submitting a leave request immediately updates the leave balance.',
        c: `def test_create_leave_request_updates_balance(api_headers):\n    before = requests.get(f"{BASE_URL}/leave/balance/1", headers=api_headers).json()["annual_leave"]\n    requests.post(f"{BASE_URL}/leave/request", headers=api_headers, json={"employee_id":1,"days":2})\n    after = requests.get(f"{BASE_URL}/leave/balance/1", headers=api_headers).json()["annual_leave"]\n    assert after == before - 2`,
      },
    ],
  },
  {
    name: 'Selenium',
    sub: 'Browser-backend flow',
    url: 'https://selenium.dev',
    desc: 'Used at the integration level to click real UI elements and confirm the correct data actually reaches the backend and comes back, rather than testing the API directly.',
    adv: [
      'Mature, 20+ years in production — huge documentation and community',
      'WebDriver protocol works natively with every major browser',
      'Selenium Grid distributes tests across machines and browsers in parallel',
      'Validates the real frontend-to-backend path, not just the API contract',
    ],
    lim: [
      'No built-in auto-waiting — flakier than Playwright without careful WebDriverWait usage',
      'Slower to author tests than a pure API approach',
      'Heavier setup and maintenance overhead than Postman or PyTest',
      "Overkill when the integration in question doesn't touch the UI at all",
    ],
    steps: [
      {
        t: 'Initialize Chrome WebDriver with WebDriverWait',
        p: 'Configure robust explicit waits.',
        c: `driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))\nwait = WebDriverWait(driver, 10)`,
      },
      {
        t: 'Test UI form submission writes to backend',
        p: 'Submit leave request and wait for success toast.',
        c: `driver.get("https://staging.hrms-app.com/login")\ndriver.find_element(By.ID, "email").send_keys("hr@company.com")\ndriver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()\nsuccess = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".success-toast")))\nassert "Leave request submitted" in success.text\ndriver.quit()`,
      },
    ],
  },
]

const SYSTEM_TOOLS = [
  {
    name: 'Playwright',
    sub: 'Modern browser automation',
    url: 'https://playwright.dev',
    desc: "Microsoft's browser automation library, built by former Puppeteer engineers, with auto-waiting and a Trace Viewer designed to remove the flakiness that plagued older tools.",
    adv: [
      'Auto-waiting removes most timing-related flaky failures automatically',
      'One API drives Chromium, Firefox, and WebKit — no per-browser rewrites',
      'Trace Viewer replays a failed run step-by-step with screenshots and network calls',
      'Network interception mocks specific states without touching the real database',
    ],
    lim: [
      'Newer tool — smaller long-tail community and fewer legacy integrations than Selenium',
      'Teams migrating from Selenium have a real API and mental-model switch to make',
      'Best support is in modern language bindings; older stacks may not be first-class',
      'Trace files can get large on long test runs, adding storage overhead',
    ],
    steps: [
      {
        t: 'Install Playwright and browser binaries',
        p: 'Quick setup.',
        c: `pip install playwright pytest-playwright\nplaywright install`,
      },
      {
        t: 'Write complete end-to-end system test',
        p: 'Login and onboard a new employee end-to-end.',
        c: `def test_employee_onboarding_complete_flow(page: Page):\n    page.goto("https://staging.hrms-app.com/login")\n    page.get_by_label("Email").fill("hr@company.com")\n    page.get_by_role("button", name="Login").click()\n    expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()`,
      },
      {
        t: 'Debug failures with Trace Viewer',
        p: 'Replay step-by-step timeline.',
        c: `playwright show-trace traces/trace_failed_test.zip`,
      },
    ],
  },
  {
    name: 'Selenium',
    sub: 'Veteran browser automation',
    url: 'https://selenium.dev',
    desc: 'The longest-standing browser automation tool, still widely deployed in enterprise frameworks, with WebDriver support in effectively every browser and CI system.',
    adv: [
      '20+ years of maturity — the largest documentation base and community in the space',
      'Integrates with virtually every CI/CD and test management tool that exists',
      'Selenium Grid scales to large cross-browser, cross-machine test suites',
      'Strong fit for teams with existing Java or C# Selenium frameworks',
    ],
    lim: [
      'No auto-waiting — tests are more flaky by default without careful explicit waits',
      'Test authoring is more verbose and slower than Playwright',
      'Falling behind on developer experience — weaker debugging tools out of the box',
      'Higher long-term maintenance cost as the UI under test evolves',
    ],
    steps: [
      {
        t: 'Set up Headless Chrome options',
        p: 'Configure headless browser fixture.',
        c: `options = webdriver.ChromeOptions()\noptions.add_argument("--headless")\ndriver = webdriver.Chrome(service=service, options=options)\ndriver.implicitly_wait(10)`,
      },
      {
        t: 'Run tests in parallel across workers',
        p: 'Use pytest-xdist to scale tests.',
        c: `pip install pytest-xdist\npytest tests/ -n 4`,
      },
    ],
  },
]

const UAT_TOOLS = [
  {
    name: 'Manual Testing',
    sub: 'Primary UAT method',
    url: null,
    desc: 'Business users work through real scenarios — not scripted steps — applying job knowledge no automated check can substitute for.',
    adv: [
      'Applies real business judgment automation structurally cannot replicate',
      'Scenarios are business-driven, surfacing exceptions a spec never anticipated',
      'Catches requirement drift and specification gaps before go-live',
      'Produces the formal, signed acceptance record required for sign-off',
    ],
    lim: [
      "Business users aren't trained testers — coverage can be inconsistent",
      'Scheduling time with busy stakeholders is a recurring bottleneck',
      'Feedback is often vague and needs a QA engineer to turn into an actionable bug',
      "Doesn't scale to frequent releases the way automated levels do",
    ],
    steps: [
      {
        t: 'Write business-language UAT scenario',
        p: 'Define realistic business tasks and expected outcomes.',
        c: `UAT Scenario: Process Monthly Payroll — August 2025\n1. Log in as Payroll Manager\n2. Select August 2025 pay period\n3. Confirm all 47 active employees appear\n4. Verify gross salaries against the approved salary sheet\n5. Process payroll, generate payslips, mark disbursed`,
      },
      {
        t: 'Triage findings into Blocker, Major, Minor',
        p: 'Fix blockers, retest, and secure formal stakeholder sign-off.',
        c: `Blockers: 0 remaining\nMajors: Accepted or fixed\nResult: Formal UAT Sign-off Granted`,
      },
    ],
  },
  {
    name: 'TestRail',
    sub: 'Test case management',
    url: 'https://testrail.com',
    desc: 'A web-based test case manager where UAT scenarios are assigned to specific business testers, who click through and mark pass/fail with comments — no technical skill needed.',
    adv: [
      'Structured scenario tracking that non-technical testers can execute unaided',
      'Real-time dashboards show UAT progress without chasing anyone for status',
      'Direct Jira integration turns a failed case into a bug ticket automatically',
      'Free tier is workable for a typical small UAT cycle',
    ],
    lim: [
      'Free tier caps users and projects — a constraint on larger UAT rounds',
      'Someone still has to author good business-language scenarios up front',
      'One more tool for already-busy stakeholders to get oriented in',
      'Limited value on its own without a bug tracker connected to it',
    ],
    steps: [
      {
        t: 'Create Test Run & Assign Stakeholders',
        p: 'Assign Payroll scenarios to Payroll Manager and leave to HR Director.',
        c: `Project: HRMS UAT — August 2025 Release\nSections assigned per stakeholder\nLive Pass/Fail Dashboard tracking`,
      },
    ],
  },
  {
    name: 'Jira',
    sub: 'Bug & feedback tracking',
    url: 'https://atlassian.com/software/jira',
    desc: 'The bug and feedback repository for a UAT cycle — testers log what they saw, developers pick it up, fix it, and hand it back for retest.',
    adv: [
      'Industry-standard issue tracking most teams already know',
      'Kanban board gives a visual read on every open UAT finding at a glance',
      'Free tier covers up to 10 users, enough for most UAT teams',
      'Clear fix loop: open → fixed → ready for retest → closed',
    ],
    lim: [
      'Not a test case manager by itself — needs TestRail or similar alongside it',
      '10-user free cap can be limiting once stakeholders are added in',
      'Can get cluttered and noisy without disciplined ticket hygiene',
      'UAT-specific workflows and fields need to be configured, not default',
    ],
    steps: [
      {
        t: 'Log UAT Defect Ticket with steps & screenshots',
        p: 'Structure clear reproducible bug report.',
        c: `Summary: [UAT-Blocker] Leave request approves negative balance\nPriority: Blocker\nStatus: Open -> Fixed -> Ready for UAT Retest -> Closed`,
      },
    ],
  },
]

/** Testing Types Manual — Part 1: By Level */
export const testingTypesManual = {
  id: 'testing-types',
  title: 'Testing Types & Levels',
  tagline: 'The complete software testing reference — Unit, Integration, System, and Acceptance levels with practical tools, real scenarios, and workflows.',
  category: 'automation',
  accent: '#E8A33D',
  cover: 'covers/test-automation-cover.png',
  duration: '4–6 weeks',
  levelSpan: 'Beginner → Architect',
  who: 'QA engineers, SDETs, and software developers who want to master testing levels from function isolation to production release.',
  outcomes: [
    'Distinguish between Unit, Integration, System, and UAT levels with clear boundaries',
    'Choose the right free tools (JUnit, PyTest, Jest, Postman, Selenium, Playwright, TestRail, Jira) for each level',
    'Evaluate tool advantages and limitations with practical step-by-step implementations',
  ],
  chapters: [
    ch({
      id: 'tt-unit-testing',
      kind: 'guide',
      phase: 'Part 1 · By Level',
      level: 'beginner',
      title: 'Unit Testing',
      minutes: 25,
      durationLabel: 'Chapter 01',
      overviewText:
        'Testing the smallest piece of code in isolation — a single function, method, or class — with every external dependency mocked out.',
      why:
        "Skipped unit tests mean bugs that could've been caught in seconds during development instead travel all the way to integration, system testing, or production. A bug found at unit level takes minutes to fix; the same bug in production takes hours across multiple systems, and may already have caused data corruption or customer-facing failures. Unit tests also double as living documentation of exactly how each function should behave.",
      when:
        'Written at the same time as the code, not after — every function added in a sprint should have tests in the same pull request. They run on every commit in CI/CD and must pass before merge. The cheapest, fastest safety net in development, and it should never be skipped regardless of deadline pressure.',
      practical: {
        app: 'HRMS — Tax deduction logic',
        scenario:
          'Finance reports employee net salaries look wrong after a code change. Unit tests for the tax function immediately pinpoint the broken slab logic — a developer used < instead of <= on the 10% slab boundary, taxing employees earning exactly NPR 500,000 at 20% instead of 10%.',
        pass: 'calculate_tax(500000) returns 5000.0 — the 1% slab applies correctly.',
        fail: 'calculate_tax(500000) returns 100000.0 — the boundary bug is caught instantly, before it reaches payroll.',
      },
      learn: [
        'Why skipped unit tests exponentially increase fix costs downstream',
        'How to write unit tests with JUnit (Java), PyTest (Python), and Jest (JavaScript)',
        'Advantages and limitations of each major unit testing framework',
      ],
      tools: UNIT_TOOLS,
      steps: [
        {
          title: 'Unit Testing Architecture',
          body: 'Unit tests isolate functions and mock out databases, external APIs, and network calls for sub-millisecond execution in CI pipelines.',
          doThis: 'Write 3 unit tests for your core boundary business logic.',
          code: `// Unit Test Example in Jest:\ntest('returns correct tax slab', () => {\n  expect(calculateTax(500000)).toBe(5000.0);\n});`,
        },
      ],
      checklist: ['Understands unit test boundaries', 'Written tests in JUnit, PyTest, or Jest', 'Ran coverage reports'],
      practice: { title: 'Boundary test suite', brief: 'Write 5 unit tests verifying tax boundary calculations and edge cases.' },
      resources: [
        r('doc', 'JUnit 5 User Guide', 'https://junit.org/junit5/docs/current/user-guide/', 'EN'),
        r('doc', 'PyTest Documentation', 'https://pytest.org', 'EN'),
        r('doc', 'Jest Documentation', 'https://jestjs.io', 'EN'),
      ],
    }),

    ch({
      id: 'tt-integration-testing',
      kind: 'guide',
      phase: 'Part 1 · By Level',
      level: 'mid',
      title: 'Integration Testing',
      minutes: 30,
      durationLabel: 'Chapter 02',
      overviewText:
        'Verifying that components work correctly once combined — the interfaces, contracts, and data flow between modules that unit tests can\'t see.',
      why:
        'The most damaging bugs in real applications live at integration points — API response shapes that don\'t match what the frontend expects, queries returning unexpected nulls, tokens expiring mid-session, listeners dropping messages under load. These are invisible to unit tests because unit tests mock all external dependencies. Skip this level and interface bugs survive all the way to system testing or production, where they\'re far more expensive to trace.',
      when:
        'Begins as soon as two or more components are ready to connect — typically mid-sprint once a feature\'s API and frontend both exist. Runs in CI/CD on every pull request targeting main. A full integration suite must pass before any build is promoted to system testing or staging.',
      practical: {
        app: 'HRMS — Leave request to balance integration',
        scenario:
          'Full flow: log in, read an employee\'s leave balance (12 days), submit a 3-day annual leave request, re-read the balance, check a manager notification exists, approve the request, and re-check the balance stays consistent.',
        pass: 'All 7 steps succeed — balance drops from 12 to 9 on request, notification is created, and stays at 9 after approval.',
        fail: 'Balance still shows 12 after the request — the leave service isn\'t wired to the balance service, a bug unit tests would never catch.',
      },
      learn: [
        'How integration testing catches interface mismatches and asynchronous state bugs',
        'Using Postman Collections & Newman for automated API contract verification',
        'Writing PyTest API suites with session fixtures and Selenium UI-backend validation',
      ],
      tools: INTEGRATION_TOOLS,
      steps: [
        {
          title: 'API Integration Workflow',
          body: 'Verify multi-step API chains with token propagation and contract verification across microservices.',
          doThis: 'Build a collection chaining auth token into subsequent requests.',
          code: `pm.collectionVariables.set("auth_token", pm.response.json().token);`,
        },
      ],
      checklist: ['Verified multi-endpoint API flows', 'Implemented session auth caching', 'Generated HTML integration reports'],
      practice: { title: 'Auth-to-checkout integration chain', brief: 'Create a 4-step chained request suite passing tokens and verifying database state.' },
      resources: [
        r('doc', 'Postman Documentation', 'https://learning.postman.com/docs/getting-started/introduction/', 'EN'),
        r('doc', 'Selenium WebDriver', 'https://selenium.dev/documentation/', 'EN'),
      ],
    }),

    ch({
      id: 'tt-system-testing',
      kind: 'guide',
      phase: 'Part 1 · By Level',
      level: 'advanced',
      title: 'System Testing',
      minutes: 35,
      durationLabel: 'Chapter 03',
      overviewText:
        'Testing the fully integrated application as a black box, end to end, exactly the way a real user would experience it.',
      why:
        'System testing is the last major technical quality gate before software reaches users. It proves the application works not just piece by piece but as the unified product a real user interacts with. Bugs found here cost more to fix than earlier-level bugs, but far less than bugs found after go-live — and it produces the most business-relevant pass/fail evidence for stakeholders.',
      when:
        'Begins after integration testing passes and the app is deployed to a stable staging environment. Critical-path tests run on every release candidate; a full regression suite runs before every major release, after significant features, and after architectural changes. Never the only testing layer — it works best sitting on top of solid unit and integration coverage.',
      practical: {
        app: 'HRMS Payroll System',
        scenario:
          'Full payroll cycle: log in as Payroll Admin, select the pay period, confirm all 47 active employees appear, process payroll, wait for async completion, verify one employee\'s gross/tax/net figures, generate payslips, then log in as that employee and check the payslip is visible.',
        pass: 'All 10 steps succeed — payroll flows end-to-end correctly.',
        fail: 'The employee can\'t see their payslip after generation — a cross-module visibility bug only detectable at system level.',
      },
      learn: [
        'End-to-end system testing architecture and black-box verification',
        'Playwright test runner with auto-waiting, tracing, and video recording',
        'Scaling cross-browser system tests in parallel with Selenium Grid & pytest-xdist',
      ],
      tools: SYSTEM_TOOLS,
      steps: [
        {
          title: 'End-to-End System Test Architecture',
          body: 'Simulate complete real-world journeys with headless browsers, taking screenshots and recording network traces on failure.',
          doThis: 'Write a Playwright script automating user login and dashboard verification.',
          code: `await page.goto("https://staging.hrms-app.com/login");\nawait expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();`,
        },
      ],
      checklist: ['Covered complete end-to-end user journeys', 'Configured headless CI pipeline', 'Implemented failure trace capture'],
      practice: { title: 'Full user checkout & receipt journey', brief: 'Automate complete multi-page flow with assertions on confirmation invoice.' },
      resources: [
        r('doc', 'Playwright Official Docs', 'https://playwright.dev', 'EN'),
        r('doc', 'Selenium HQ', 'https://selenium.dev', 'EN'),
      ],
    }),

    ch({
      id: 'tt-acceptance-testing',
      kind: 'guide',
      phase: 'Part 1 · By Level',
      level: 'advanced',
      title: 'Acceptance Testing (UAT)',
      minutes: 30,
      durationLabel: 'Chapter 04',
      overviewText:
        'The final gate before release, performed by real business stakeholders to confirm the software fits how the business actually works — not just the written spec.',
      why:
        'Requirements pass through humans, developers, and project managers — three points where meaning can drift from original intent. UAT is where that drift surfaces while it\'s still cheap to fix. A system can pass every automated test and still fail UAT, because it was technically correct but didn\'t match business reality. In regulated industries UAT sign-off is a legal requirement, not optional.',
      when:
        'Mandatory before every production release, without exception. Lightweight UAT happens at Sprint Review in agile projects; full formal UAT with sign-off happens before every major release. If a go-live proceeds without UAT sign-off, the business must document and formally accept that risk.',
      practical: {
        app: 'HRMS — Leave policy compliance UAT',
        scenario:
          'An HR Director with 15 years of experience applies for 3 days of casual leave for an employee who only has 2 remaining. Every automated test passed because test data always had sufficient balance — nobody tested this real-world boundary.',
        pass: 'System now shows "Insufficient casual leave balance. Available: 2 days, Requested: 3 days. Request rejected."',
        fail: 'The system approves the request with no warning, allowing a negative leave balance — a Blocker, since it breaks policy and causes payroll complications.',
      },
      learn: [
        'How UAT acts as the human and business alignment safety gate',
        'Facilitating scenario-based manual UAT sessions with stakeholders',
        'Organizing test execution, evidence, and sign-offs in TestRail and Jira',
      ],
      tools: UAT_TOOLS,
      steps: [
        {
          title: 'Stakeholder UAT Process',
          body: 'Engage business domain experts with clear business task scenarios and formal sign-off gates.',
          doThis: 'Write a 5-step business acceptance test scenario.',
          code: `UAT Scenario: Monthly Payroll Disbursal Verification\n1. Log in as Payroll Manager\n2. Verify gross and tax amounts\n3. Export sign-off report`,
        },
      ],
      checklist: ['Defined UAT entry and exit criteria', 'Conducted stakeholder test sessions', 'Achieved zero blocker formal sign-off'],
      practice: { title: 'UAT Sign-off package', brief: 'Draft a complete UAT sign-off memo including test matrix, triage list, and stakeholder signature block.' },
      resources: [
        r('tool', 'TestRail', 'https://www.testrail.com', 'EN'),
        r('tool', 'Atlassian Jira', 'https://www.atlassian.com/software/jira', 'EN'),
      ],
    }),

    ch({
      id: 'tt-manual-testing',
      kind: 'guide',
      phase: 'Part 2 · Execution Method',
      level: 'beginner',
      title: 'Manual Testing',
      minutes: 25,
      durationLabel: 'Chapter 05',
      overviewText:
        'Manual testing is the practice of executing test cases by hand, without automation scripts — a person walks through the application clicking, typing, and observing exactly the way an end user would, then records whether the actual result matches the expected one.',
      why:
        'Not everything can or should be automated. A human notices when a layout looks visually off, when wording is confusing, when a workflow feels clunky, or when something behaves "correctly" on paper but wrong in spirit — none of which a scripted assertion catches. Manual testing is also where automation starts: before a flow is scripted, someone has to walk through it by hand to confirm what "correct" even looks like.',
      when:
        'Constantly, alongside automation rather than instead of it — for exploratory sessions, new features that don\'t have test scripts yet, one-off verification of a bug fix, and anything involving visual judgment or subjective UX quality. It\'s the default for early-stage features that change too fast for automation to be worth writing yet.',
      practical: {
        app: 'HRMS — Multi-Step Employee Onboarding',
        scenario:
          'A new multi-step onboarding wizard is released. The automated tests verify all required inputs save to the database, but a manual tester immediately notices the modal cut off on smaller screens and ambiguous date formatting that confuses the HR team.',
        pass: 'Tester verifies all form fields, layout responsiveness, and copy clarity across screen sizes before sign-off.',
        fail: 'Unintuitive button placement causes form submission before review — caught by human observation.',
      },
      advantages: [
        'Catches visual, UX, and "does this feel right" issues automation structurally can\'t judge',
        'No scripting investment needed — testing can start the moment a feature exists',
        'Flexible — a tester can deviate and explore the moment something looks suspicious',
        'Cheapest entry point for small teams or early-stage products',
      ],
      limitations: [
        'Slow and doesn\'t scale — the same regression suite takes minutes automated, hours by hand',
        'Inconsistent between testers and even between runs by the same tester',
        'Impractical to repeat frequently enough for continuous delivery',
        'Human error and fatigue lead to missed steps on long or repetitive test cases',
      ],
      tools: [
        {
          name: 'Manual Testing',
          sub: 'Methodology',
          url: null,
          desc: 'There\'s no software here — the "tool" is a structured way of working: a test case document (steps, expected result), the application itself, and a tester\'s judgment.',
          adv: [
            'Catches visual, UX, and "does this feel right" issues automation structurally can\'t judge',
            'No scripting investment needed — testing can start the moment a feature exists',
            'Flexible — a tester can deviate and explore the moment something looks suspicious',
            'Cheapest entry point for small teams or early-stage products',
          ],
          lim: [
            'Slow and doesn\'t scale — the same regression suite takes minutes automated, hours by hand',
            'Inconsistent between testers and even between runs by the same tester',
            'Impractical to repeat frequently enough for continuous delivery',
            'Human error and fatigue lead to missed steps on long or repetitive test cases',
          ],
          steps: [
            {
              t: 'Step 1 — Write the test case specification',
              p: 'Document preconditions, numbered steps, test data, and expected results.',
              c: 'Test Case ID: TC-MAN-01\nTitle: Verify Employee Onboarding Wizard Validation\nPreconditions: Logged in as HR Admin\nSteps:\n1. Navigate to /employees/new\n2. Leave "Department" empty and click "Next"\n3. Observe field validation\nExpected: "Department is required" red error text appears below field',
            },
            {
              t: 'Step 2 — Set up test data and environment',
              p: 'Ensure test environment has matching database state without dirty leftover records.',
              c: 'Environment: Staging (v2.4.0-rc1)\nUser: hr_admin@hrms.internal / Role: HR_ADMIN\nSeed: Clean department table with 5 active departments',
            },
            {
              t: 'Step 3 — Execute steps exactly as written',
              p: 'Follow each numbered action step without skipping or assuming state.',
              c: '1. Open Chrome DevTools (Console tab open for unhandled JS exceptions)\n2. Enter: First Name = "Aayush", Last Name = "Shrestha", Email = "aayush@hrms.internal"\n3. Leave "Department" unselected and click "Next Step"',
            },
            {
              t: 'Step 4 — Compare actual vs expected result',
              p: 'Evaluate visual rendering, system response time, and exact wording.',
              c: 'Expected: Red outline on Department dropdown with message "Department is required"\nActual: Red outline displayed, focus moved to dropdown, submission blocked',
            },
            {
              t: 'Step 5 — Record Pass/Fail with evidence',
              p: 'Attach full-screen screenshot and console log if any discrepancy occurs.',
              c: 'Result: PASS\nNotes: UI validation is instant, no console errors\nEvidence: screenshot_tc_man_01_pass.png',
            },
            {
              t: 'Step 6 — Log failures in bug tracker',
              p: 'If actual != expected, file ticket with severity, priority, and exact reproduction steps.',
              c: 'Bug ID: HRMS-1042\nSummary: Onboarding wizard modal overlaps navigation bar on 1366x768 resolution\nSeverity: Major / Priority: P2\nSteps to Reproduce: [1..4]',
            },
            {
              t: 'Step 7 — Re-execute after developer fix',
              p: 'Verify fixed build on staging and close ticket after confirming no side regressions.',
              c: 'Retest on Build 2.4.0-rc2: Modal stays within viewport, responsiveness confirmed.\nStatus: VERIFIED & CLOSED',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Manual Test Case Execution',
          body: 'Perform exploratory and structured test walkthroughs following test cases step-by-step.',
          doThis: 'Write a manual test case for leave application validation.',
          code: 'Test Case: Verify Leave Expiry Notification\n1. Login as Employee\n2. Open Notifications\n3. Confirm leave balance expiry reminder banner',
        },
      ],
      checklist: ['Documented test cases with clear preconditions', 'Executed manual steps with bug evidence', 'Verified fixes on staging build'],
      practice: { title: 'Exploratory testing session', brief: 'Conduct a 20-minute timeboxed exploratory session on the HRMS onboarding flow.' },
      resources: [
        r('guide', 'Ministry of Testing — Exploratory Testing', 'https://www.ministryoftesting.com', 'EN'),
      ],
    }),

    ch({
      id: 'tt-automated-testing',
      kind: 'guide',
      phase: 'Part 2 · Execution Method',
      level: 'intermediate',
      title: 'Automated Testing',
      minutes: 35,
      durationLabel: 'Chapter 06',
      overviewText:
        'Automated testing is the practice of writing scripts that execute test steps and check results without a human clicking through them each time — the same suite can run in seconds, on every commit, forever, without getting tired or skipping a step.',
      why:
        'As an application grows, the number of things that could break grows with it. Manually re-checking everything before every release becomes physically impossible. Automated tests turn that impossible manual re-check into a suite that runs in minutes, catching regressions the moment they\'re introduced rather than days or weeks later.',
      when:
        'For anything that will be run more than a handful of times — regression suites, critical user paths, and anything gating a release. It\'s not a replacement for manual testing on new or fast-changing features, but the right investment for stable flows a team relies on not breaking.',
      practical: {
        app: 'HRMS Regression Suite',
        scenario:
          'Before every release, a 40-scenario regression suite (login, employee CRUD, leave requests, payroll processing) runs automatically in CI. A developer\'s change to the date-picker component accidentally breaks the "from date" field across every form that uses it.',
        pass: 'All 40 scenarios green — the build is promoted to staging.',
        fail: '6 of 40 scenarios fail on the same from-date selector — CI blocks the merge before it ever reaches a human tester, and the pattern across failures immediately points at the shared component.',
      },
      advantages: [
        'Executes repetitive regression suites in seconds without human fatigue',
        'Continuous integration safety net catching breaking bugs on every pull request',
        'Enables true continuous deployment and faster release cadences',
        'Reusable test scripts scale seamlessly across environments and browsers',
      ],
      limitations: [
        'Higher upfront time and code investment to write and maintain test frameworks',
        'Blind to visual glitches, awkward workflows, and UX oddities unless specifically scripted',
        'Brittle against rapid UI changes if locators are not cleanly decoupled',
        'False sense of security if test assertions only check status codes rather than data integrity',
      ],
      tools: [
        {
          name: 'Selenium',
          sub: 'WebDriver',
          url: 'https://selenium.dev',
          desc: 'The longest-standing browser automation framework, with WebDriver support across every major browser and a massive existing ecosystem — see Chapter 3 for the full breakdown of its strengths and limitations at the system-test level; the same trade-offs apply here.',
          adv: [
            'Broadest browser and language support of any automation tool',
            'Selenium Grid parallelizes large regression suites across machines',
            'Deepest CI/CD and test-management tool integration in the industry',
            'Best fit for teams with existing Java/C#/Python Selenium investment',
          ],
          lim: [
            'No auto-waiting — flaky without disciplined explicit waits',
            'More verbose to write and maintain than Playwright or Cypress',
            'Slower feedback loop during local development than Cypress\'s live reload',
            'Debugging failures takes more manual digging without a built-in trace tool',
          ],
          steps: [
            {
              t: 'Step 1 — Install Selenium and PyTest',
              p: 'Install selenium bindings and webdriver-manager.',
              c: 'pip install selenium webdriver-manager pytest',
            },
            {
              t: 'Step 2 — Set up headless Chrome driver',
              p: 'Initialize ChromeOptions with headless flags and WebDriverWait.',
              c: 'from selenium import webdriver\nfrom selenium.webdriver.chrome.service import Service\nfrom selenium.webdriver.chrome.options import Options\nfrom webdriver_manager.chrome import ChromeDriverManager\n\noptions = Options()\noptions.add_argument("--headless=new")\noptions.add_argument("--window-size=1920,1080")\ndriver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)',
            },
            {
              t: 'Step 3 — Write regression test with explicit waits',
              p: 'Automate user login and dashboard verification.',
              c: 'from selenium.webdriver.common.by import By\nfrom selenium.webdriver.support.ui import WebDriverWait\nfrom selenium.webdriver.support import expected_conditions as EC\n\ndef test_hrms_login_flow(driver):\n    driver.get("https://staging.hrms-app.com/login")\n    wait = WebDriverWait(driver, 10)\n    \n    wait.until(EC.visibility_of_element_located((By.NAME, "email"))).send_keys("admin@hrms.com")\n    driver.find_element(By.NAME, "password").send_keys("SecurePass123!")\n    driver.find_element(By.CSS_SELECTOR, "button[type=\'submit\']").click()\n    \n    header = wait.until(EC.visibility_of_element_located((By.TAG_NAME, "h1")))\n    assert "Dashboard" in header.text',
            },
            {
              t: 'Step 4 — Automate employee creation & assertion',
              p: 'Fill employee form and assert presence in employee table.',
              c: 'def test_create_employee(driver):\n    driver.get("https://staging.hrms-app.com/employees/new")\n    wait = WebDriverWait(driver, 10)\n    \n    wait.until(EC.visibility_of_element_located((By.NAME, "fullName"))).send_keys("Priya Sharma")\n    driver.find_element(By.NAME, "department").send_keys("Engineering")\n    driver.find_element(By.ID, "btn-save").click()\n    \n    toast = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "toast-success")))\n    assert "Employee created" in toast.text',
            },
            {
              t: 'Step 5 — Run headless suite in CI pipeline',
              p: 'Execute parallelized test suite with pytest.',
              c: 'pytest -v -n 4 --html=reports/regression-report.html',
            },
          ],
        },
        {
          name: 'Playwright',
          sub: 'Modern Web Automation',
          url: 'https://playwright.dev',
          desc: 'Auto-waiting, multi-browser, single-API automation with the Trace Viewer for fast failure debugging — see Chapter 3 for full detail.',
          adv: [
            'Auto-waiting removes most flaky, timing-based failures',
            'One API for Chromium, Firefox, and WebKit',
            'Trace Viewer gives a step-by-step replay of any failed run',
            'Network interception mocks specific states without needing real backend data',
          ],
          lim: [
            'Smaller legacy tooling footprint than Selenium',
            'A real learning curve for teams migrating existing Selenium suites',
            'Modern-language-first — weaker fit for older tech stacks',
            'Traces add storage overhead on large CI runs',
          ],
          steps: [
            {
              t: 'Step 1 — Install Playwright with browsers',
              p: 'Initialize Playwright test suite.',
              c: 'pip install pytest-playwright\nplaywright install --with-deps chromium firefox webkit',
            },
            {
              t: 'Step 2 — Write resilient test with auto-waiting locators',
              p: 'Playwright automatically waits for elements to be actionable before clicking.',
              c: 'from playwright.sync_api import Page, expect\n\ndef test_leave_application(page: Page):\n    page.goto("https://staging.hrms-app.com/login")\n    page.get_by_label("Email").fill("employee@hrms.com")\n    page.get_by_label("Password").fill("Password123!")\n    page.get_by_role("button", { name: "Sign In" }).click()\n    \n    # Navigate to Leave Module\n    page.get_by_role("link", { name: "Leaves" }).click()\n    page.get_by_role("button", { name: "Apply Leave" }).click()\n    \n    page.get_by_label("Leave Type").select_option("Sick Leave")\n    page.get_by_label("Days").fill("2")\n    page.get_by_role("button", { name: "Submit Request" }).click()\n    \n    expect(page.get_by_text("Leave request submitted successfully")).to_be_visible()',
            },
            {
              t: 'Step 3 — Run cross-browser tests simultaneously',
              p: 'Execute against Chromium, Firefox, and WebKit in parallel.',
              c: 'pytest --browser chromium --browser firefox --browser webkit',
            },
            {
              t: 'Step 4 — Record execution trace on test failure',
              p: 'Capture screenshots, DOM snapshots, and network calls for debugging.',
              c: 'pytest --tracing=retain-on-failure',
            },
            {
              t: 'Step 5 — Open interactive Trace Viewer',
              p: 'Inspect exact time-travel replay of the failed test.',
              c: 'playwright show-trace test-results/trace.zip',
            },
          ],
        },
        {
          name: 'Cypress',
          sub: 'JavaScript / In-Browser',
          url: 'https://cypress.io',
          desc: 'A JavaScript-native testing tool that runs inside the browser itself rather than driving it remotely, which gives it unusually fast, reliable feedback and a live, time-traveling test runner UI that shows exactly what the app looked like at every step.',
          adv: [
            'Runs in-browser, giving very fast and reliable execution with automatic retry-ability',
            'Time-travel debugger shows a DOM snapshot at every command — excellent failure visibility',
            'Simple, readable API — a shallow learning curve for JavaScript developers',
            'Great local developer experience with live reload as tests are written',
          ],
          lim: [
            'JavaScript/TypeScript only — no first-class support for other languages',
            'Runs only in Chromium-family and Firefox browsers, no native WebKit/Safari support',
            'Each test is scoped to a single browser tab — can\'t easily test multi-tab or multi-origin flows without workarounds',
            'Less suited to true cross-browser regression coverage than Playwright',
          ],
          steps: [
            {
              t: 'Step 1 — Install Cypress',
              p: 'Install Cypress as a dev dependency in your JavaScript project.',
              c: 'npm install cypress --save-dev',
            },
            {
              t: 'Step 2 — Open interactive Cypress test runner',
              p: 'Scaffold folders and launch the Cypress desktop GUI.',
              c: 'npx cypress open',
            },
            {
              t: 'Step 3 — Write your first E2E test spec',
              p: 'Create cypress/e2e/payroll.cy.js with visit, get, click, and type commands.',
              c: 'describe(\'HRMS Payroll Regression\', () => {\n  beforeEach(() => {\n    cy.visit(\'/login\');\n    cy.get(\'[data-test=email]\').type(\'admin@hrms.com\');\n    cy.get(\'[data-test=password]\').type(\'SecurePass123!\');\n    cy.get(\'[data-test=btn-login]\').click();\n    cy.url().should(\'include\', \'/dashboard\');\n  });\n\n  it(\'processes monthly payroll batch\', () => {\n    cy.get(\'[data-test=nav-payroll]\').click();\n    cy.get(\'[data-test=select-cycle]\').select(\'August 2025\');\n    cy.get(\'[data-test=btn-process]\').click();\n    cy.get(\'.toast-success\').should(\'be.visible\').and(\'contain\', \'Payroll completed for 47 employees\');\n  });\n});',
            },
            {
              t: 'Step 4 — Leverage automatic retry-ability',
              p: 'cy.get and .should() automatically retry until assertions pass or timeout.',
              c: 'cy.get(\'.success-toast\').should(\'be.visible\');\ncy.get(\'[data-test=status-badge]\').should(\'have.text\', \'Approved\');',
            },
            {
              t: 'Step 5 — Run headlessly in CI pipeline',
              p: 'Execute tests in terminal with video and screenshot artifact generation.',
              c: 'npx cypress run --browser chrome',
            },
            {
              t: 'Step 6 — Review time-travel debugger',
              p: 'Click on any command in the test runner log to view the DOM snapshot at that exact microsecond.',
              c: '// Command Log hover exposes state before and after each DOM action\ncy.get(\'[data-test=from-date]\').click(); // [SNAPSHOT: DOM before & after click]',
            },
            {
              t: 'Step 7 — Connect Cypress Cloud for analytics',
              p: 'Record runs to detect flaky tests, parallelize execution, and view historical metrics.',
              c: 'npx cypress run --record --key <your-cypress-cloud-project-key>',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Automated CI Test Suite',
          body: 'Author headless browser test suites wired directly to pull request gates in GitHub Actions.',
          doThis: 'Write a Cypress/Playwright regression script for employee management.',
          code: 'npx cypress run --record --spec "cypress/e2e/regression/**"',
        },
      ],
      checklist: ['Authored automated UI regression suites', 'Enabled auto-waiting assertions', 'Configured CI pipeline triggers with video/trace artifacts'],
      practice: { title: 'CI Regression pipeline', brief: 'Set up a GitHub Actions workflow that executes Cypress/Playwright on every PR to main.' },
      resources: [
        r('tool', 'Playwright', 'https://playwright.dev', 'EN'),
        r('tool', 'Cypress', 'https://cypress.io', 'EN'),
        r('tool', 'Selenium', 'https://selenium.dev', 'EN'),
      ],
    }),

    ch({
      id: 'tt-functional-testing',
      kind: 'guide',
      phase: 'Part 2 · Functional',
      level: 'intermediate',
      title: 'Functional Testing',
      minutes: 30,
      durationLabel: 'Chapter 07',
      overviewText:
        'Functional testing verifies that the application does what its requirements say it should do — given a specific input or action, does it produce the correct output or behavior, regardless of how the code is structured internally.',
      why:
        'Functional testing is the most direct check against "does the software actually work." A login form technically rendering without crashing means nothing if it lets in the wrong password. Functional testing exists to answer the business question directly: for this input, is this the right output?',
      when:
        'Throughout development, on every feature as it\'s built, and continuously in regression. It\'s the backbone layer sitting between low-level unit tests and full end-to-end system tests — verifying business rules and workflows at the feature level.',
      practical: {
        app: 'HRMS Leave Approval Rules',
        scenario:
          'A functional test verifies that a leave request exceeding the employee\'s remaining balance is rejected, while a request within balance is approved and correctly deducted.',
        pass: 'Requesting 2 days with 5 remaining succeeds; requesting 6 days with 5 remaining is rejected with a clear balance message.',
        fail: 'The system approves a 6-day request against a 5-day balance, letting the balance go negative — a business rule violation the functional test exists specifically to catch.',
      },
      advantages: [
        'Directly validates business logic and requirements from user perspective',
        'Ensures security gates (auth, permissions, validation) behave according to spec',
        'Bridges technical implementation and business acceptance criteria',
        'Can be automated across multiple layers (API, UI, component)',
      ],
      limitations: [
        'Does not check performance, load, security vulnerabilities, or infrastructure',
        'Requires clear and unambiguous requirements documentation to design test cases',
        'May miss internal edge cases if tests only focus on standard business paths',
        'Can become redundant if unit, integration, and UI functional tests test the exact same rule',
      ],
      tools: [
        {
          name: 'Selenium',
          sub: 'Feature Verification',
          url: 'https://selenium.dev',
          desc: 'Same tool, same core trade-offs, applied here to verify feature-level business rules through the UI rather than full end-to-end journeys.',
          adv: [
            'Broadest browser and language support of any automation tool',
            'Selenium Grid parallelizes large regression suites across machines',
            'Deepest CI/CD and test-management tool integration in the industry',
            'Best fit for teams with existing Java/C#/Python Selenium investment',
          ],
          lim: [
            'No auto-waiting — flaky without disciplined explicit waits',
            'More verbose to write and maintain than Playwright or Cypress',
            'Slower feedback loop during local development than Cypress\'s live reload',
            'Debugging failures takes more manual digging without a built-in trace tool',
          ],
          steps: [
            {
              t: 'Step 1 — Define functional test specification',
              p: 'Map business requirement rules to test methods.',
              c: 'Requirement BR-401: Leave requests exceeding remaining balance must be rejected.',
            },
            {
              t: 'Step 2 — Implement business logic verification in Selenium',
              p: 'Test boundary input (balance = 5, request = 6).',
              c: 'def test_reject_over_balance_leave(driver):\n    driver.get("https://staging.hrms-app.com/leaves/apply")\n    driver.find_element(By.ID, "days-input").send_keys("6")\n    driver.find_element(By.ID, "submit-btn").click()\n    \n    error_msg = WebDriverWait(driver, 5).until(\n        EC.visibility_of_element_located((By.CLASS_NAME, "alert-error"))\n    )\n    assert "Requested days (6) exceeds available balance (5)" in error_msg.text',
            },
            {
              t: 'Step 3 — Test happy path boundary',
              p: 'Verify valid submission (request = 2) succeeds and decrements displayed balance to 3.',
              c: 'def test_approve_valid_leave(driver):\n    driver.get("https://staging.hrms-app.com/leaves/apply")\n    driver.find_element(By.ID, "days-input").send_keys("2")\n    driver.find_element(By.ID, "submit-btn").click()\n    \n    balance = WebDriverWait(driver, 5).until(\n        EC.visibility_of_element_located((By.ID, "remaining-balance"))\n    )\n    assert balance.text == "3"',
            },
          ],
        },
        {
          name: 'Cypress',
          sub: 'Fast Feature Checks',
          url: 'https://cypress.io',
          desc: 'Its fast feedback loop and retry-ability make it a strong fit for feature-level functional checks that run constantly during development, not just at release time.',
          adv: [
            'Runs in-browser, giving very fast and reliable execution with automatic retry-ability',
            'Time-travel debugger shows a DOM snapshot at every command — excellent failure visibility',
            'Simple, readable API — a shallow learning curve for JavaScript developers',
            'Great local developer experience with live reload as tests are written',
          ],
          lim: [
            'JavaScript/TypeScript only — no first-class support for other languages',
            'Runs only in Chromium-family and Firefox browsers, no native WebKit/Safari support',
            'Each test is scoped to a single browser tab',
            'Less suited to true cross-browser regression coverage than Playwright',
          ],
          steps: [
            {
              t: 'Step 1 — Create functional spec file',
              p: 'Create cypress/e2e/leave-rules.cy.js.',
              c: 'describe(\'Leave Policy Functional Tests\', () => {\n  it(\'rejects leave when requested days exceed quota\', () => {\n    cy.login(\'employee@hrms.com\', \'Pass123!\');\n    cy.visit(\'/leaves/new\');\n    cy.get(\'[data-test=leave-days]\').type(\'6\');\n    cy.get(\'[data-test=btn-submit]\').click();\n    cy.get(\'[data-test=validation-error]\')\n      .should(\'be.visible\')\n      .and(\'contain\', \'Insufficient leave balance\');\n  });\n});',
            },
          ],
        },
        {
          name: 'BugBug',
          sub: 'No-Code / Low-Code Test Recorder',
          url: 'https://bugbug.io',
          desc: 'A no-code/low-code browser test recorder — testers click through the application once, BugBug records the actions as a reusable test, and it can be edited visually afterward without touching code. Built specifically to make functional testing accessible to QA testers who don\'t write code.',
          adv: [
            'No coding required — QA testers without dev skills can create real automated tests',
            'Recording is fast — a working test exists minutes after the manual walkthrough',
            'Visual editing makes maintaining tests approachable for non-engineers',
            'Built-in cloud scheduling and reporting without separate CI setup',
          ],
          lim: [
            'Less flexible than code-based tools for complex logic or conditional flows',
            'Free tier has limits on test runs and team size',
            'Recorded selectors can be brittle if the UI changes structurally',
            'Less control over test architecture than a hand-written Playwright/Cypress suite',
          ],
          steps: [
            {
              t: 'Step 1 — Install BugBug extension & create account',
              p: 'Install the free BugBug Chrome extension from Chrome Web Store.',
              c: 'Chrome Extension: BugBug Test Recorder\nWebsite: https://bugbug.io (Free Tier: 50 cloud runs/month)',
            },
            {
              t: 'Step 2 — Record browser scenario visually',
              p: 'Click "Record" and perform the functional scenario in the browser normally.',
              c: 'Action: Navigate to https://staging.hrms-app.com -> Click [Apply Leave] -> Type "2" into [Days] -> Click [Submit]',
            },
            {
              t: 'Step 3 — Inspect recorded step pipeline',
              p: 'BugBug captures each click, input, and navigation as a clean human-readable step.',
              c: 'Step 1: Go to URL https://staging.hrms-app.com/leaves\nStep 2: Click button "Apply Leave"\nStep 3: Type "2" in input #leave-days\nStep 4: Click button "Submit"',
            },
            {
              t: 'Step 4 — Add visual assertions',
              p: 'Click on target element to create assertions like "Text should contain" or "Element visible".',
              c: 'Assertion: Element .toast-success text contains "Request Approved"',
            },
            {
              t: 'Step 5 — Save into functional test suite',
              p: 'Group tests into logical suites: "Leave Management", "Employee Profiles", "Payroll".',
              c: 'Suite: "HRMS Core Functional Suite" (12 recorded tests)',
            },
            {
              t: 'Step 6 — Run suite on-demand or cloud schedule',
              p: 'Execute tests in BugBug cloud runner or trigger via webhook / GitHub Action.',
              c: 'Trigger: Webhook POST on Staging Deploy -> BugBug Cloud executes 12 tests in parallel',
            },
            {
              t: 'Step 7 — Review visual step-by-step report',
              p: 'View screenshot diffs and step timings to immediately identify failed rules.',
              c: 'Report: 12 Passed, 0 Failed (Execution time: 42s)\nScreenshot evidence attached to each step',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Functional Business Logic Testing',
          body: 'Verify feature input/output constraints against product specifications using scripted and low-code tooling.',
          doThis: 'Write a positive and negative functional test case for an HRMS workflow.',
          code: 'Functional Spec: Employee Leave Policy\n- Valid range: 1-5 days -> Approved\n- Invalid range: >5 days -> Rejected with validation message',
        },
      ],
      checklist: ['Verified all positive requirement paths', 'Asserted negative input error messages', 'Automated boundary checks in functional suite'],
      practice: { title: 'Business logic test suite', brief: 'Author a 5-test functional suite covering employee salary calculation rules.' },
      resources: [
        r('tool', 'BugBug No-Code Testing', 'https://bugbug.io', 'EN'),
      ],
    }),

    ch({
      id: 'tt-smoke-testing',
      kind: 'guide',
      phase: 'Part 2 · Functional',
      level: 'beginner',
      title: 'Smoke Testing',
      minutes: 20,
      durationLabel: 'Chapter 08',
      overviewText:
        'Smoke testing is a quick, shallow pass over the most critical functions of an application — login works, the homepage loads, core navigation responds — run immediately after a new build to answer one question: is this build stable enough to test further, or is it broken at the foundation?',
      why:
        'Running a full regression suite against a build that can\'t even log in wastes hours of testing effort on a build that was doomed from the start. Smoke testing is a cheap early filter — a handful of checks that take minutes, not hours, and catch catastrophic breakages before anyone invests real testing time.',
      when:
        'Immediately after every new build or deployment, before any deeper testing begins. It\'s typically the very first stage of CI/CD after a build succeeds — a fast gate that decides whether the pipeline proceeds to fuller test suites.',
      practical: {
        app: 'HRMS Post-Deployment Check',
        scenario:
          'After every deploy to staging, a smoke suite checks: login succeeds, the dashboard loads, the employee list renders, and the payroll module opens.',
        pass: 'All four checks pass in under 90 seconds — the pipeline proceeds to the full regression suite.',
        fail: 'The dashboard fails to load due to a broken build artifact — the pipeline halts immediately, and the team is alerted before anyone wastes time running deeper tests against a build that was never going to work.',
      },
      advantages: [
        'Extremely fast — a broken build is caught in minutes, not after a full test cycle',
        'Cheap to write and maintain because the scope is deliberately narrow',
        'Prevents wasted effort running deeper suites against a fundamentally broken build',
        'Gives immediate, high-confidence signal right after every deployment',
      ],
      limitations: [
        'Shallow by design — it will not catch anything beyond the most critical paths',
        'A passing smoke test says nothing about edge cases or business logic correctness',
        'Needs discipline to keep small; scope creep turns it into a slow regression suite',
        'Still needs a human or a fuller suite behind it — smoke testing alone is never sufficient',
      ],
      tools: [
        {
          name: 'Manual',
          sub: 'Quick Checklist',
          url: null,
          desc: 'For small teams or infrequent releases, a short manual checklist (log in, load the dashboard, open one core module) is often enough — speed and low setup cost matter more than automation here.',
          adv: [
            'Zero tool setup or maintenance required',
            'Can be performed immediately by any team member',
            'Takes less than 3 minutes for a 5-step checklist',
            'Immediately catches catastrophic white-screen or server crash issues',
          ],
          lim: [
            'Requires human availability after every deployment',
            'Cannot easily run in automated midnight CI/CD pipelines',
            'Subject to human oversight if done in a rush',
          ],
          steps: [
            {
              t: 'Step 1 — Open deployment landing page',
              p: 'Load https://staging.hrms-app.com and verify HTTP 200 and favicon / title render.',
              c: 'Action: Open browser -> Navigate to URL -> Verify login page displays without console error',
            },
            {
              t: 'Step 2 — Execute sanity login',
              p: 'Enter valid admin credentials and submit.',
              c: 'User: smoke_admin@hrms.com / Pass: TestPass123! -> Click Login',
            },
            {
              t: 'Step 3 — Verify critical modules render',
              p: 'Click through Dashboard, Employees, and Payroll tabs.',
              c: 'Check: Dashboard widgets load -> Employee table displays records -> Payroll cycle selector opens',
            },
            {
              t: 'Step 4 — Decision gate',
              p: 'If any step fails, abort testing and ping on-call developer. If all pass, green-light regression.',
              c: 'Verdict: PASS (1 min 45s) -> Ready for QA Deep Testing',
            },
          ],
        },
        {
          name: 'Selenium',
          sub: 'Automated Smoke Gate',
          url: 'https://selenium.dev',
          desc: 'For frequent builds, a small Selenium script automates the same handful of critical checks so smoke testing runs unattended on every deploy.',
          adv: [
            'Extremely fast — a broken build is caught in minutes, not after a full test cycle',
            'Cheap to write and maintain because the scope is deliberately narrow',
            'Prevents wasted effort running deeper suites against a fundamentally broken build',
            'Gives immediate, high-confidence signal right after every deployment',
          ],
          lim: [
            'Shallow by design — it will not catch anything beyond the most critical paths',
            'A passing smoke test says nothing about edge cases or business logic correctness',
            'Needs discipline to keep small; scope creep turns it into a slow regression suite',
            'Still needs a human or a fuller suite behind it — smoke testing alone is never sufficient',
          ],
          steps: [
            {
              t: 'Step 1 — Identify critical smoke paths',
              p: 'Limit scope to 5 critical endpoints: Login, Dashboard, Employee List, Leaves, Payroll.',
              c: 'Critical Paths:\n1. GET /login -> Form visible\n2. POST /auth/login -> 200 OK + JWT\n3. GET /dashboard -> Metrics widget rendered\n4. GET /employees -> Table count > 0\n5. GET /payroll -> Active cycle visible',
            },
            {
              t: 'Step 2 — Write lightweight fast-failing Selenium script',
              p: 'Set tight timeouts (e.g. 5 seconds) to fail fast on hung servers.',
              c: 'from selenium import webdriver\nfrom selenium.webdriver.common.by import By\nfrom selenium.webdriver.support.ui import WebDriverWait\nfrom selenium.webdriver.support import expected_conditions as EC\nimport pytest\n\n@pytest.fixture\ndef driver():\n    options = webdriver.ChromeOptions()\n    options.add_argument("--headless=new")\n    driver = webdriver.Chrome(options=options)\n    driver.set_page_load_timeout(10)\n    yield driver\n    driver.quit()\n\ndef test_smoke_critical_pipeline(driver):\n    wait = WebDriverWait(driver, 5)\n    \n    # 1. Login\n    driver.get("https://staging.hrms-app.com/login")\n    driver.find_element(By.NAME, "email").send_keys("smoke_user@hrms.com")\n    driver.find_element(By.NAME, "password").send_keys("SmokePass123!")\n    driver.find_element(By.CSS_SELECTOR, "button[type=\'submit\']").click()\n    \n    # 2. Dashboard\n    wait.until(EC.visibility_of_element_located((By.ID, "dashboard-stats")))\n    \n    # 3. Employee list\n    driver.get("https://staging.hrms-app.com/employees")\n    wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".employee-row")))\n    \n    # 4. Payroll\n    driver.get("https://staging.hrms-app.com/payroll")\n    wait.until(EC.visibility_of_element_located((By.ID, "payroll-period-select")))',
            },
            {
              t: 'Step 3 — Wire into CI/CD deployment pipeline',
              p: 'Configure GitHub Actions / GitLab CI to run smoke tests immediately after deployment.',
              c: 'smoke-test:\n  stage: post-deploy\n  script:\n    - pytest -m smoke --maxfail=1 --timeout=120\n  rules:\n    - if: $CI_COMMIT_BRANCH == "main"',
            },
            {
              t: 'Step 4 — Set fast fail & alert hook',
              p: 'On failure, halt pipeline immediately and send Slack alert with logs.',
              c: 'if pytest fails:\n  send_slack_alert("#build-failures", "🚨 Smoke test failed on Staging build! Aborting regression suite.")\n  exit 1',
            },
            {
              t: 'Step 5 — Maintain strict runtime budget',
              p: 'Ensure total smoke suite execution time remains under 90 seconds.',
              c: 'Benchmark: 4 tests executed in 38.4s -> PASS',
            },
            {
              t: 'Step 6 — Promote to full regression',
              p: 'When smoke is green, automatically trigger deeper automated integration & regression suites.',
              c: 'Status: SMOKE GREEN -> Triggering Full E2E & Regression Pipeline',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Post-Deployment Smoke Gate',
          body: 'Implement fast sanity checks executed immediately following deployment to confirm baseline uptime.',
          doThis: 'Write a 3-minute smoke test checklist or lightweight Selenium script.',
          code: 'pytest -m smoke --maxfail=1',
        },
      ],
      checklist: ['Created fast-failing smoke test suite', 'Automated trigger on post-deployment webhook', 'Established instant failure notification alerts'],
      practice: { title: 'Smoke test gatekeeper', brief: 'Design a post-deploy smoke gate that halts bad releases in under 90 seconds.' },
      resources: [
        r('guide', 'Google Testing Blog — Flaky Tests & Smoke Runs', 'https://testing.googleblog.com', 'EN'),
      ],
    }),

    ch({
      id: 'tt-sanity-testing',
      kind: 'guide',
      phase: 'Part 3 · Functional',
      level: 'beginner',
      title: 'Sanity Testing',
      minutes: 20,
      durationLabel: 'Chapter 09',
      overviewText:
        'Sanity testing is a narrow, focused check run after a specific bug fix or minor change — not the whole application, just the area that changed and its immediate neighbors — to confirm the fix works and didn\'t break anything obviously adjacent, before committing to a fuller regression pass.',
      why:
        'After a fix, the natural question is "did that actually work, and did it break anything nearby?" Running a full regression suite for every single small fix is wasteful when the change is narrow. Sanity testing answers that immediate question quickly, so a fix can be confidently merged or immediately flagged as incomplete without waiting on a full test cycle.',
      when:
        'Right after a bug fix, a small config change, or a minor patch — before merging, and before (or sometimes instead of, for very low-risk changes) a full regression run. It\'s the quick "does this look sane" check between smoke testing and full regression.',
      practical: {
        app: 'HRMS — Single Bug Fix Sanity Check',
        scenario:
          'A developer fixes a bug where employee date of birth in the profile editor was saving with an off-by-one timezone offset. The tester runs a sanity check on the DOB picker, saves the profile, and checks adjacent fields (Join Date, Anniversary Date) to confirm the fix works and didn\'t break nearby date inputs.',
        pass: 'DOB saves correctly as 1995-04-12, Join Date and Anniversary fields remain intact and save without corruption.',
        fail: 'Fix for DOB inadvertently breaks Join Date parsing, causing 500 error on profile update — caught in minutes before full regression.',
      },
      advantages: [
        'Very fast — targeted at exactly the change, not the whole application',
        'Gives quick confidence that a specific fix actually resolved the issue',
        'Avoids the wasted cost of a full regression run on every small patch',
        'Naturally performed by whoever understands the change best',
      ],
      limitations: [
        'Narrow by design — will not catch problems outside the checked area',
        'Relies heavily on the tester correctly judging what\'s \'adjacent\' to the change',
        'No formal record or repeatability — it\'s judgment-based, not scripted',
        'Not a substitute for regression testing before a real release',
      ],
      tools: [
        {
          name: 'Manual Testing',
          sub: 'Judgment-Based Verification',
          url: null,
          seeChapter: 5,
          desc: 'Sanity testing is inherently manual and judgment-based (see Chapter 5): a tester who understands the fix decides which handful of related checks actually matter, then runs exactly those — no script, because the scope is different every time.',
          adv: [
            'Very fast — targeted at exactly the change, not the whole application',
            'Gives quick confidence that a specific fix actually resolved the issue',
            'Avoids the wasted cost of a full regression run on every small patch',
            'Naturally performed by whoever understands the change best',
          ],
          lim: [
            'Narrow by design — will not catch problems outside the checked area',
            'Relies heavily on the tester correctly judging what\'s \'adjacent\' to the change',
            'No formal record or repeatability — it\'s judgment-based, not scripted',
            'Not a substitute for regression testing before a real release',
          ],
          steps: [
            {
              t: 'Step 1 — Read the fix description',
              p: 'Understand exactly which files, components, and database models were touched.',
              c: 'PR #412: "Fix timezone offset on employee DOB datepicker"\nChanged: components/DatePicker.tsx, utils/dateFormatter.ts',
            },
            {
              t: 'Step 2 — Identify target & adjacent functionality',
              p: 'Target: Profile DOB field. Adjacent: Join Date, Probation End Date, Age calculation widget.',
              c: 'Sanity Scope: 1. Edit DOB -> 2. Save -> 3. Reload Profile -> 4. Check Join Date -> 5. Verify Age Badge',
            },
            {
              t: 'Step 3 — Verify original bug is resolved',
              p: 'Reproduce exact conditions from original defect report.',
              c: 'Input: Select "1992-06-15" (UTC+5:45 timezone)\nExpected: Displayed as "June 15, 1992" after saving\nActual: Saved and displayed as June 15, 1992 (Fixed)',
            },
            {
              t: 'Step 4 — Spot-check adjacent fields',
              p: 'Verify neighboring date pickers and calculated fields still behave normally.',
              c: 'Join Date: "2021-01-10" remains uncorrupted\nCalculated Age: "33 years" updates dynamically',
            },
            {
              t: 'Step 5 — Confirm no regression in narrow area',
              p: 'Ensure profile form submissions still return HTTP 200 without console errors.',
              c: 'Network: PUT /api/employees/1042 -> 200 OK (38ms)\nConsole: 0 errors / 0 warnings',
            },
            {
              t: 'Step 6 — Sign off sanity gate',
              p: 'Mark fix as verified in PR comments, unblocking merge or promotion to staging.',
              c: 'Verdict: SANITY PASSED -> Safe to merge into develop branch',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Targeted Bug Verification',
          body: 'Execute narrow sanity verifications directly targeting modified components and immediate dependencies.',
          doThis: 'Review PR changes and run focused verification on touched logic and neighboring inputs.',
          code: 'git diff main..feature-branch',
        },
      ],
      checklist: ['Identified exact touched scope', 'Verified fix for root defect', 'Confirmed zero regression in adjacent inputs'],
      practice: { title: 'Sanity verification plan', brief: 'Create a 5-point sanity checklist for a date-picker bug fix.' },
      resources: [
        r('guide', 'Ministry of Testing — Sanity vs Smoke Testing', 'https://ministryoftesting.com', 'EN'),
      ],
    }),

    ch({
      id: 'tt-regression-testing',
      kind: 'guide',
      phase: 'Part 3 · Functional',
      level: 'intermediate',
      title: 'Regression Testing',
      minutes: 30,
      durationLabel: 'Chapter 10',
      overviewText:
        'Regression testing re-runs previously passing tests after a code change to confirm that nothing that used to work has quietly broken — the opposite direction from sanity testing: instead of narrowly checking the new change, it broadly re-checks everything that was already known to be correct.',
      why:
        'Software is interconnected — a change meant to fix one thing can silently break something completely unrelated through a shared dependency, a reused component, or an overlooked side effect. Without regression testing, those breakages aren\'t discovered until a user (or worse, a customer in production) stumbles into them. A strong regression suite is what lets a team ship frequently without fear.',
      when:
        'Before every release, after every significant merge to the main branch, and ideally on every pull request via CI/CD. The regression suite grows over time as new features are added — each new feature\'s tests become part of the suite that protects everything built after it.',
      practical: {
        app: 'HRMS Regression Before a Release',
        scenario:
          'Ahead of a monthly release, the full 120-test regression suite runs against the release candidate. A recent refactor of the date-formatting utility, done to fix a display bug on the payroll page, subtly changes how dates are parsed on the leave request form.',
        pass: 'All 120 tests green — release proceeds.',
        fail: '4 leave-request tests fail with date-parsing errors, tracing back to the shared utility — a regression that had nothing to do with what the refactor was meant to touch, caught before it reached users.',
      },
      advantages: [
        'Catches breakage in old, unrelated functionality that no one thought to manually re-check',
        'Enables frequent releases with confidence instead of dread',
        'Suite grows automatically in value over time as more features are covered',
        'Runs unattended in CI, giving continuous protection with no ongoing manual effort',
      ],
      limitations: [
        'Suite maintenance is a real, ongoing cost — tests need updates as the app legitimately changes',
        'Large suites can become slow without parallelization, becoming a release bottleneck',
        'Flaky tests erode trust fast — once a team starts ignoring \'failures,\' the suite stops protecting anything',
        'Doesn\'t replace exploratory or new-feature testing — it only re-checks what\'s already scripted',
      ],
      tools: [
        {
          name: 'Selenium',
          sub: 'Grid Parallelized Suites',
          url: 'https://selenium.dev',
          seeChapter: 6,
          desc: 'A common home for legacy regression suites (see Chapter 6); its maturity and Grid-based parallelization make large, long-running regression suites practical to execute quickly across many browsers.',
          adv: [
            'Broadest browser and language support of any automation tool',
            'Selenium Grid parallelizes large regression suites across machines',
            'Deepest CI/CD and test-management tool integration in the industry',
            'Best fit for teams with existing Java/C#/Python Selenium investment',
          ],
          lim: [
            'No auto-waiting — flaky without disciplined explicit waits',
            'More verbose to write and maintain than Playwright or Cypress',
            'Slower feedback loop during local development than Cypress\'s live reload',
            'Debugging failures takes more manual digging without a built-in trace tool',
          ],
          steps: [
            {
              t: 'Step 1 — Organize test suites into regression groups',
              p: 'Tag tests with pytest markers: @pytest.mark.regression, @pytest.mark.core_auth, @pytest.mark.payroll.',
              c: '@pytest.mark.regression\n@pytest.mark.leaves\ndef test_leave_approval_workflow(driver):\n    # Full 4-step approval flow\n    pass',
            },
            {
              t: 'Step 2 — Distribute execution across Selenium Grid',
              p: 'Run tests in parallel across multiple browser nodes.',
              c: 'pytest -m regression -n 8 --dist loadscope --html=reports/full-regression.html',
            },
            {
              t: 'Step 3 — Investigate failures individually',
              p: 'Every regression failure is a critical signal that previously working code broke.',
              c: 'FAILURES: test_leave_request_dates -> AttributeError in dateFormatter.ts line 42',
            },
          ],
        },
        {
          name: 'Playwright',
          sub: 'Flake-Free CI Suite',
          url: 'https://playwright.dev',
          seeChapter: 6,
          desc: 'Its auto-waiting and Trace Viewer (see Chapter 6) make it well suited for regression suites specifically because flaky regression failures (false positives) are one of the most damaging things a team can have — a suite nobody trusts stops getting acted on.',
          adv: [
            'Auto-waiting removes most flaky, timing-based failures',
            'One API for Chromium, Firefox, and WebKit',
            'Trace Viewer gives a step-by-step replay of any failed run',
            'Network interception mocks specific states without needing real backend data',
          ],
          lim: [
            'Smaller legacy tooling footprint than Selenium',
            'A real learning curve for teams migrating existing Selenium suites',
            'Modern-language-first — weaker fit for older tech stacks',
            'Traces add storage overhead on large CI runs',
          ],
          steps: [
            {
              t: 'Step 1 — Add newly shipped features to regression directory',
              p: 'Keep tests organized by domain: tests/regression/auth/, tests/regression/payroll/.',
              c: 'tests/\n├── regression/\n│   ├── test_auth.py\n│   ├── test_employees.py\n│   ├── test_leaves.py\n│   └── test_payroll.py',
            },
            {
              t: 'Step 2 — Run regression with parallel workers',
              p: 'Execute 120 tests across 4 worker processes in under 3 minutes.',
              c: 'pytest tests/regression/ --numprocesses 4 --tracing=retain-on-failure',
            },
            {
              t: 'Step 3 — Inspect Trace Viewer on regression failure',
              p: 'Replay exact network requests and DOM states leading to regression failure.',
              c: 'playwright show-trace test-results/test_leaves-failed/trace.zip',
            },
          ],
        },
        {
          name: 'BugBug',
          sub: 'No-Code Regression Suite',
          url: 'https://bugbug.io',
          seeChapter: 7,
          desc: 'Since regression suites accumulate dozens or hundreds of recorded scenarios over time (see Chapter 7), BugBug\'s no-code recording lets non-developer QA staff keep contributing new regression cases without bottlenecking on engineering time to write them.',
          adv: [
            'No coding required — QA testers without dev skills can create real automated tests',
            'Recording is fast — a working test exists minutes after the manual walkthrough',
            'Visual editing makes maintaining tests approachable for non-engineers',
            'Built-in cloud scheduling and reporting without separate CI setup',
          ],
          lim: [
            'Less flexible than code-based tools for complex logic or conditional flows',
            'Free tier has limits on test runs and team size',
            'Recorded selectors can be brittle if the UI changes structurally',
            'Less control over test architecture than a hand-written Playwright/Cypress suite',
          ],
          steps: [
            {
              t: 'Step 1 — Accumulate recorded test cases',
              p: 'Every completed sprint ticket gets a corresponding recorded scenario added to BugBug.',
              c: 'Suite: "Main Release Regression Suite" (74 recorded flows)',
            },
            {
              t: 'Step 2 — Schedule nightly regression runs',
              p: 'Configure cloud runner to execute the full suite every night at 2:00 AM.',
              c: 'Schedule: Daily @ 02:00 UTC -> Notify Slack #qa-alerts on failure',
            },
            {
              t: 'Step 3 — Prune outdated tests during redesigns',
              p: 'Update recorded steps visually when UI workflows change intentionally.',
              c: 'Action: Re-record Step 3 (New multi-step leave modal) -> Save suite version',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Automated Regression Suite Maintenance',
          body: 'Construct resilient regression pipelines triggered on pull requests and release tags.',
          doThis: 'Group tests by feature module and parallelize across CI runners.',
          code: 'pytest tests/regression/ -n auto',
        },
      ],
      checklist: ['Tagged tests with domain markers', 'Automated parallel CI execution', 'Configured failure artifact retention'],
      practice: { title: '100-test regression framework', brief: 'Architect a fast, parallelized regression suite with retry mechanisms.' },
      resources: [
        r('guide', 'Martin Fowler — Regression Testing Strategies', 'https://martinfowler.com', 'EN'),
      ],
    }),

    ch({
      id: 'tt-interface-testing',
      kind: 'guide',
      phase: 'Part 3 · Functional',
      level: 'intermediate',
      title: 'Interface Testing',
      minutes: 25,
      durationLabel: 'Chapter 11',
      overviewText:
        'Interface testing verifies the points where two systems, modules, or layers communicate — most commonly APIs — checking that requests are handled correctly, responses match the expected contract, error codes are correct, and data types and structures are exactly what the consuming side expects.',
      why:
        'An interface is a contract, and contracts get broken silently — a backend team renames a field, changes a data type from string to number, or removes a value the frontend depends on, and nothing about the backend\'s own tests notices because the backend still "works" in isolation. Interface testing exists specifically to catch contract breaks at the boundary, before they surface as a broken frontend or a failed downstream integration.',
      when:
        'As soon as an API or interface is defined and ready to be consumed by another team or component — often before the consuming side is even built, using the interface contract itself. It should run in CI on every change to the API layer, since interface breaks are cheap to catch at this level and expensive to catch after the frontend has already shipped against a broken assumption.',
      practical: {
        app: 'HRMS Payroll API Contract',
        scenario:
          'The payroll API\'s /payslip/{id}/latest endpoint is expected to always return net_salary as a number. A backend change accidentally starts returning it as a formatted string ("NPR 45,000") instead.',
        pass: 'The interface test asserts typeof response.net_salary === "number" and passes when the field is numeric.',
        fail: 'The assertion fails immediately after the backend change — caught in CI before the frontend, which does arithmetic on that field, ever breaks in front of a real user.',
      },
      advantages: [
        'Catches breaking contract changes before they reach any consumer of the API',
        'Runs independently of the frontend, so interface bugs are found earlier and diagnosed faster',
        'Assertions double as living documentation of exactly what the API guarantees',
        'Reusable across every team or service that consumes the same interface',
      ],
      limitations: [
        'Only as good as the assumptions written into the assertions — an untested edge case stays invisible',
        'Doesn\'t verify how the interface behaves under real UI-driven usage patterns',
        'Needs to be kept in sync manually when the contract intentionally evolves',
        'JavaScript-only assertions in Postman limit how complex the contract checks can get',
      ],
      tools: [
        {
          name: 'Postman',
          sub: 'API Contract Validation',
          url: 'https://postman.com',
          seeChapter: 2,
          desc: 'Postman is used here specifically (see Chapter 2) to validate the contract itself: status codes, response shape, field types, and required fields — independent of any particular UI flow that might consume the API.',
          adv: [
            'Catches breaking contract changes before they reach any consumer of the API',
            'Runs independently of the frontend, so interface bugs are found earlier and diagnosed faster',
            'Assertions double as living documentation of exactly what the API guarantees',
            'Reusable across every team or service that consumes the same interface',
          ],
          lim: [
            'Only as good as the assumptions written into the assertions — an untested edge case stays invisible',
            'Doesn\'t verify how the interface behaves under real UI-driven usage patterns',
            'Needs to be kept in sync manually when the contract intentionally evolves',
            'JavaScript-only assertions in Postman limit how complex the contract checks can get',
          ],
          steps: [
            {
              t: 'Step 1 — Define expected endpoint contract',
              p: 'Document required schema: status codes, keys, and strict primitive types.',
              c: 'GET /api/v1/payslips/latest\nContract:\n- status: 200 OK\n- id: string (UUID)\n- employee_id: number\n- net_salary: number\n- line_items: array',
            },
            {
              t: 'Step 2 — Write Tests tab schema assertions',
              p: 'Validate response types and structure using pm.expect.',
              c: 'pm.test("Status code is 200", () => {\n    pm.response.to.have.status(200);\n});\n\npm.test("Validate contract data types", () => {\n    const res = pm.response.json();\n    pm.expect(res).to.have.property("net_salary");\n    pm.expect(typeof res.net_salary).to.eql("number");\n    pm.expect(Array.isArray(res.line_items)).to.be.true;\n});',
            },
            {
              t: 'Step 3 — Test happy path boundary',
              p: 'Execute valid requests and verify 200/201 status codes.',
              c: 'pm.test("Response time is under 200ms", () => {\n    pm.expect(pm.response.responseTime).to.be.below(200);\n});',
            },
            {
              t: 'Step 4 — Test contract violations deliberately',
              p: 'Send malformed payload (e.g. invalid string ID) and assert 400 Bad Request with standard error envelope.',
              c: '// Request with employee_id = "invalid-abc"\npm.test("Returns 400 with standard error object", () => {\n    pm.response.to.have.status(400);\n    const err = pm.response.json();\n    pm.expect(err.error).to.eql("INVALID_EMPLOYEE_ID");\n});',
            },
            {
              t: 'Step 5 — Save dedicated contract collection',
              p: 'Keep contract tests isolated in an \'Interface Contracts\' collection.',
              c: 'Collection: "HRMS API Contracts v1" (38 endpoint tests)',
            },
            {
              t: 'Step 6 — Run via Newman CLI in CI pipeline',
              p: 'Execute contract checks on every backend commit before frontend builds.',
              c: 'newman run collections/api-contracts.json -e env/staging.json --reporters cli,junit',
            },
            {
              t: 'Step 7 — Version collection alongside API',
              p: 'Commit contract collection files in the same git repository as the backend service.',
              c: 'git add postman/api-contracts.json && git commit -m "chore(api): update contract for v1.2"',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Schema Contract Validation',
          body: 'Enforce response payload JSON schema, HTTP response headers, and status code invariants.',
          doThis: 'Write explicit property type assertions in Postman Tests scripts.',
          code: 'pm.expect(typeof res.net_salary).to.eql("number");',
        },
      ],
      checklist: ['Verified required field presence', 'Asserted strict primitive types', 'Validated error envelope structure'],
      practice: { title: 'API contract test suite', brief: 'Build a comprehensive Postman test suite validating API interface contracts.' },
      resources: [
        r('tool', 'Postman Schema Testing', 'https://postman.com', 'EN'),
      ],
    }),

    ch({
      id: 'tt-usability-testing',
      kind: 'guide',
      phase: 'Part 3 · Functional',
      level: 'intermediate',
      title: 'Usability Testing',
      minutes: 25,
      durationLabel: 'Chapter 12',
      overviewText:
        'Usability testing evaluates how easy, intuitive, and pleasant an application is for real users to actually use — not whether a feature technically works, but whether people can find it, understand it, and complete their task without confusion, frustration, or unnecessary effort.',
      why:
        'A feature can pass every functional test and still fail its users if nobody can figure out how to use it. Confusing navigation, unclear labels, hidden actions, and unexpected flows drive users away or generate support tickets, even when the underlying logic is flawless. Usability testing is where a team learns whether the software actually serves the humans using it, not just the specification.',
      when:
        'Early, during design and prototyping (to catch usability problems before they\'re expensive to fix), and again after a feature ships, by observing real usage patterns. It\'s a continuous practice, not a one-time gate — usability issues are often only visible once real users start behaving in ways the design didn\'t anticipate.',
      practical: {
        app: 'HRMS Leave Request Form',
        scenario:
          'Session recordings show a pattern: a large share of users click the "Reason" field, pause for several seconds, then abandon the form entirely without submitting.',
        pass: 'Adding placeholder examples in the Reason field and marking it optional instead of required raises form completion significantly, visible in the next batch of recordings.',
        fail: 'Recordings show repeated hesitation and abandonment at the same field — a usability problem invisible to every functional and regression test that had been passing the whole time, because the form worked correctly; it just wasn\'t usable.',
      },
      advantages: [
        'Shows real user behavior, not assumptions about how users will behave',
        'Session recordings surface confusion (rage-clicks, dead ends) that no functional test could ever detect',
        'Heatmaps make it immediately visible when an important action is being missed by users',
        'Feedback widgets capture user sentiment in the exact moment of friction',
      ],
      limitations: [
        'Observational, not diagnostic — it shows that users struggle, not automatically why',
        'Free tier limits session/recording volume, capping how much real usage can be observed',
        'Raises privacy considerations — session recordings can capture sensitive on-screen data if not configured carefully',
        'Doesn\'t replace structured usability testing sessions with direct user interviews and follow-up questions',
      ],
      tools: [
        {
          name: 'Hotjar',
          sub: 'Behavior Analytics & Heatmaps',
          url: 'https://hotjar.com',
          desc: 'A behavior analytics tool that shows how real users actually interact with an application — session recordings play back exactly what a user clicked, scrolled, and hesitated on; heatmaps show where attention and clicks concentrate; and feedback widgets let users report confusion directly, in the moment.',
          adv: [
            'Shows real user behavior, not assumptions about how users will behave',
            'Session recordings surface confusion (rage-clicks, dead ends) that no functional test could ever detect',
            'Heatmaps make it immediately visible when an important action is being missed by users',
            'Feedback widgets capture user sentiment in the exact moment of friction',
          ],
          lim: [
            'Observational, not diagnostic — it shows that users struggle, not automatically why',
            'Free tier limits session/recording volume, capping how much real usage can be observed',
            'Raises privacy considerations — session recordings can capture sensitive on-screen data if not configured carefully',
            'Doesn\'t replace structured usability testing sessions with direct user interviews and follow-up questions',
          ],
          steps: [
            {
              t: 'Step 1 — Create free Hotjar account & install snippet',
              p: 'Add the Hotjar tracking snippet to your web app\'s HTML head or Google Tag Manager.',
              c: '<!-- Hotjar Tracking Code -->\n<script>\n    (function(h,o,t,j,a,r){\n        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};\n        h._hjSettings={hjid:YOUR_SITE_ID,hjsv:6};\n        a=o.getElementsByTagName(\'head\')[0];\n        r=o.createElement(\'script\');r.async=1;\n        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;\n        a.appendChild(r);\n    })(window,document,\'https://static.hotjar.com/c/hotjar-\',\'.js?sv=\');\n</script>',
            },
            {
              t: 'Step 2 — Enable session recordings for target flows',
              p: 'Target specific URLs: https://hrms-app.com/leaves/new and https://hrms-app.com/payroll.',
              c: 'Tracking Rule: Record sessions matching URL pattern /leaves/*',
            },
            {
              t: 'Step 3 — Collect natural user sessions',
              p: 'Allow real employees to use the feature naturally or conduct 5 moderated user tests.',
              c: 'Sample: 50 employee sessions recorded over 3 business days',
            },
            {
              t: 'Step 4 — Analyze rage-clicks and drop-off patterns',
              p: 'Filter for sessions with frustration signals like rapid clicking or abandonment.',
              c: 'Filter: Rage clicks > 2 OR U-turn navigation detected -> 8 sessions flagged at "Reason" textarea',
            },
            {
              t: 'Step 5 — Generate click & scroll heatmaps',
              p: 'Evaluate if primary call-to-action buttons (e.g. \'Submit Leave\') are below the fold.',
              c: 'Heatmap Insight: 32% of users never scroll to bottom [Submit] button on 1366x768 screens',
            },
            {
              t: 'Step 6 — Deploy in-context feedback widget',
              p: 'Add a micro-survey: \'Did you find what you were looking for?\'',
              c: 'Feedback Widget: 1-5 rating + optional comment on /leaves/apply page',
            },
            {
              t: 'Step 7 — Iterate design and measure improvement',
              p: 'Implement UX fix (e.g. move Submit button above fold, add placeholder text) and observe next cohort.',
              c: 'Post-Fix Metric: Form completion rate increased from 61% -> 94%',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'User Experience & Behavioral Analysis',
          body: 'Analyze user friction, rage clicks, and task completion metrics using heatmaps and replay sessions.',
          doThis: 'Install Hotjar and analyze drop-off funnels across multi-step user workflows.',
          code: 'hj(\'identify\', userId, { role: \'employee\' });',
        },
      ],
      checklist: ['Installed user behavior tracking snippet', 'Captured 50+ real interaction sessions', 'Resolved top drop-off UX friction points'],
      practice: { title: 'Usability audit & friction report', brief: 'Conduct a heatmap analysis and write a 3-point UX improvement plan.' },
      resources: [
        r('tool', 'Hotjar Official Documentation', 'https://hotjar.com', 'EN'),
        r('guide', 'Nielsen Norman Group — Usability 101', 'https://nngroup.com', 'EN'),
      ],
    }),

    ch({
      id: 'tt-performance-testing',
      kind: 'guide',
      phase: 'Part 4 · Non-Functional',
      level: 'intermediate',
      title: 'Performance Testing',
      minutes: 25,
      durationLabel: 'Chapter 13',
      overviewText:
        'Performance testing measures how fast and efficiently an application responds under normal conditions — page load time, server response time, time to first byte, rendering speed — establishing whether the software is fast enough for real users, independent of whether its features are functionally correct.',
      why:
        'A feature that works perfectly but takes eight seconds to load might as well not work at all — users abandon slow pages, slow APIs cascade into slow user experiences across an entire application, and poor performance directly costs conversions, productivity, and trust. Performance problems are also often invisible in functional testing, since a slow response and a fast one can return the exact same correct data.',
      when:
        'Early and continuously — as soon as key pages or endpoints exist, and again after any change likely to affect speed (new dependencies, added images, database query changes). It should also be checked before every major release, since performance regressions creep in gradually and are easy to miss without deliberate measurement.',
      practical: {
        app: 'HRMS Employee List Page',
        scenario:
          'The Employee List page, which loads all 47 employees plus their photos, is measured before and after adding lazy-loading for images below the fold.',
        pass: 'LCP drops to 1.6s — only the visible employees\' photos load immediately, with the rest deferred until scrolled into view.',
        fail: 'Largest Contentful Paint of 4.8s, all 47 photos loading immediately regardless of scroll position.',
      },
      advantages: [
        'Free, instant, and requires zero setup — just a URL',
        'Combines controlled lab testing with real-world field data from actual users',
        'Directly reports Core Web Vitals, the same metrics that affect search ranking',
        'Gives specific, actionable fixes rather than just a score',
      ],
      limitations: [
        'Field data requires enough real Chrome traffic to exist — new or low-traffic pages only get lab data',
        'Single-page focused — not designed for testing full user journeys or authenticated flows',
        'Scores can vary run to run due to network conditions during the test itself',
        'Doesn\'t test backend/API performance directly, only what\'s observable from the browser',
      ],
      tools: [
        {
          name: 'PageSpeed Insights',
          sub: 'Google Lighthouse & Core Web Vitals',
          url: 'https://pagespeed.web.dev',
          desc: 'Google\'s own performance auditing tool, built on Lighthouse, that scores a page on both lab data (a controlled simulated load) and real-world field data pulled from actual Chrome users (via the Chrome UX Report), then lists specific, prioritized fixes.',
          adv: [
            'Free, instant, and requires zero setup — just a URL',
            'Combines controlled lab testing with real-world field data from actual users',
            'Directly reports Core Web Vitals, the same metrics that affect search ranking',
            'Gives specific, actionable fixes rather than just a score',
          ],
          lim: [
            'Field data requires enough real Chrome traffic to exist',
            'Single-page focused — not designed for multi-step journeys',
            'Scores can vary run to run based on network conditions',
            'Doesn\'t test backend/API performance directly',
          ],
          steps: [
            {
              t: 'Step 1 — Enter page URL at pagespeed.web.dev',
              p: 'Enter your staging or production page URL without account setup.',
              c: 'Target: https://hrms-app.com/employees',
            },
            {
              t: 'Step 2 — Review Mobile & Desktop scores separately',
              p: 'Mobile uses a throttled 4G CPU profile and is typically the stricter target.',
              c: 'Mobile Performance Score: 64/100 (Needs Improvement)\nDesktop Performance Score: 92/100 (Good)',
            },
            {
              t: 'Step 3 — Inspect Core Web Vitals thresholds',
              p: 'Verify Largest Contentful Paint (LCP < 2.5s), Interaction to Next Paint (INP < 200ms), and CLS (< 0.1).',
              c: 'Metrics:\n- LCP: 4.8s (FAIL - Poor)\n- INP: 85ms (PASS - Good)\n- CLS: 0.02 (PASS - Good)',
            },
            {
              t: 'Step 4 — Execute prioritized Opportunities list',
              p: 'Implement high-impact optimizations suggested by Lighthouse.',
              c: 'Opportunities:\n1. Defer offscreen images (Estimated savings: 2.4s)\n2. Eliminate render-blocking resources (Savings: 0.8s)',
            },
            {
              t: 'Step 5 — Compare Lab Data vs Field Data (CrUX)',
              p: 'Identify if real Chrome users on slower networks experience larger latency gaps.',
              c: 'CrUX 75th Percentile: 3.2s LCP across 12,000 real-world page views',
            },
            {
              t: 'Step 6 — Re-audit after optimization deployment',
              p: 'Verify improved performance scores on the latest build.',
              c: 'Post-Optimization Mobile Score: 94/100 (LCP: 1.6s - PASS)',
            },
          ],
        },
        {
          name: 'GTmetrix',
          sub: 'Waterfall Network Breakdown',
          url: 'https://gtmetrix.com',
          desc: 'A performance testing tool that runs a page through a real browser from a chosen test location, producing a detailed waterfall chart of every request, a filmstrip of how the page visually rendered over time, and grades across specific performance dimensions.',
          adv: [
            'Waterfall view pinpoints exactly which request is the bottleneck, not just an overall score',
            'Filmstrip shows real visual loading progress, useful for judging perceived speed',
            'Selectable test locations approximate real users better than a single fixed location',
            'Free scheduled monitoring catches gradual regressions without manual re-checking',
          ],
          lim: [
            'Free tier limits test locations, browsers, and monitoring frequency',
            'Single-page and browser-observable only — no backend visibility',
            'Results can vary between runs due to network conditions',
            'Advanced features (video comparison, more locations) are paywalled',
          ],
          steps: [
            {
              t: 'Step 1 — Run test from target geographic region',
              p: 'Select nearest server location (e.g. Singapore, London, or Vancouver).',
              c: 'Location: Singapore | Browser: Chrome Desktop',
            },
            {
              t: 'Step 2 — Inspect Grade & Speed Visualization',
              p: 'Review GTmetrix Grade (Structure & Performance indices).',
              c: 'GTmetrix Grade: B (82%) | TTFB: 240ms | Fully Loaded: 3.4s',
            },
            {
              t: 'Step 3 — Analyze Network Waterfall tab',
              p: 'Sort requests by size and duration to isolate uncompressed assets.',
              c: 'Waterfall Bottleneck: GET /static/team-banner.png (2.8 MB, 1.4s download)',
            },
            {
              t: 'Step 4 — Watch Visual Filmstrip playback',
              p: 'Evaluate perceived speed milestones like First Contentful Paint.',
              c: 'Filmstrip: Blank white screen until 1.8s -> First visual header at 2.1s',
            },
            {
              t: 'Step 5 — Apply Top Issues recommendations',
              p: 'Convert large assets to modern WebP/AVIF formats.',
              c: 'Fix: cwebp -q 80 team-banner.png -o team-banner.webp (Reduced to 180 KB)',
            },
            {
              t: 'Step 6 — Set up recurring scheduled monitor',
              p: 'Configure daily automated runs to detect speed regressions.',
              c: 'Schedule: Mon-Fri @ 08:00 AM -> Alert Slack #web-perf if Grade drops below A',
            },
          ],
        },
        {
          name: 'WebPageTest',
          sub: 'Multi-Step & Global Network Simulation',
          url: 'https://webpagetest.org',
          desc: 'The most configurable of the three — real browsers on real devices and real network conditions across many global locations, with deep control over connection speed, number of test runs, and scripted multi-step user journeys rather than just a single page load.',
          adv: [
            'Deepest configurability of the three — real devices, real networks, real global locations',
            'Supports scripted multi-step journeys, not just single-page loads',
            'Side-by-side video comparison makes \'which is actually faster\' visually undeniable',
            'Has a free API for wiring performance checks into CI/CD',
          ],
          lim: [
            'Steeper learning curve than PageSpeed Insights or GTmetrix',
            'More setup effort for scripted, multi-step tests',
            'Free tier queue times can be slower during high-demand periods',
            'Advanced scripting requires learning WebPageTest syntax',
          ],
          steps: [
            {
              t: 'Step 1 — Configure connection speed and profile',
              p: 'Select throttled 4G (9 Mbps, 170ms RTT) or custom broadband profile.',
              c: 'Profile: 4G LTE | Location: Virginia, USA | Runs: 3 (Median selection)',
            },
            {
              t: 'Step 2 — Script multi-step user workflow',
              p: 'Record multi-step authentication journey using WebPageTest script commands.',
              c: 'logData 0\nnavigate https://hrms-app.com/login\nsetValue name=email admin@hrms.com\nsetValue name=password Secret123!\nlogData 1\nsubmitForm button[type=submit]',
            },
            {
              t: 'Step 3 — Inspect median run waterfall & visual progression',
              p: 'Examine detailed connection breakdown: DNS, TLS negotiation, TTFB, and download.',
              c: 'DNS: 18ms | TLS: 42ms | TTFB: 190ms | Content Download: 420ms',
            },
            {
              t: 'Step 4 — Generate Side-by-Side Video comparison',
              p: 'Compare performance before vs after optimization side-by-side.',
              c: 'Comparison: Build v2.3.0 (Old) vs Build v2.4.0 (Optimized)',
            },
            {
              t: 'Step 5 — Automate with WebPageTest CI API',
              p: 'Trigger performance audits automatically in GitHub Actions.',
              c: 'npx webpagetest test "https://staging.hrms-app.com" --key $WPT_API_KEY --medianMetric lcp',
            },
            {
              t: 'Step 6 — Set build breaking budgets',
              p: 'Fail CI pipeline if LCP exceeds 2500ms.',
              c: 'Result: LCP 1450ms <= 2500ms budget -> CI Status GREEN',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Web Vitals & Performance Benchmarking',
          body: 'Benchmark Time to First Byte (TTFB), Largest Contentful Paint (LCP), and Interaction to Next Paint (INP).',
          doThis: 'Audit target URLs with PageSpeed Insights and establish performance budgets.',
          code: 'npx lighthouse-ci collect --url=https://staging.hrms-app.com',
        },
      ],
      checklist: ['Verified LCP under 2.5s', 'Optimized render-blocking assets', 'Configured automated performance monitoring'],
      practice: { title: 'Core Web Vitals optimization plan', brief: 'Audit a slow landing page and deliver an LCP reduction strategy.' },
      resources: [
        r('tool', 'Google PageSpeed Insights', 'https://pagespeed.web.dev', 'EN'),
        r('guide', 'web.dev — Core Web Vitals Guide', 'https://web.dev/vitals/', 'EN'),
      ],
    }),

    ch({
      id: 'tt-load-testing',
      kind: 'guide',
      phase: 'Part 4 · Non-Functional',
      level: 'advanced',
      title: 'Load Testing',
      minutes: 30,
      durationLabel: 'Chapter 14',
      overviewText:
        'Load testing simulates a realistic, expected number of concurrent users hitting the application at once, to verify it performs acceptably under the traffic it\'s actually expected to handle in production — not a single user\'s speed, but the system\'s behavior under a real crowd.',
      why:
        'An application that\'s fast for one user can behave completely differently under 500 concurrent users — database connections get exhausted, response times climb, and requests start queuing or timing out. Load testing answers a concrete business question before launch day: can this system actually handle the traffic we expect, or will it buckle the moment real users show up?',
      when:
        'Before any launch or event expected to bring a surge or a sustained new baseline of traffic (a new product launch, a marketing campaign, a payroll deadline where every employee logs in the same morning), and periodically as the user base grows, since \'acceptable load\' from a year ago may no longer reflect today\'s real usage.',
      practical: {
        app: 'HRMS Payroll Deadline Morning',
        scenario:
          'Every month on payroll day, roughly 300 employees log in within the same 30-minute window to check their payslip. A load test simulates 300 concurrent virtual users hitting login and the payslip endpoint.',
        pass: '95th percentile response time stays under 2 seconds, zero failed requests at 300 concurrent users.',
        fail: 'Response times climb past 8 seconds and 12% of requests start timing out past 250 concurrent users — a capacity ceiling discovered in testing, not on the actual payroll morning.',
      },
      advantages: [
        'Free, mature, and widely supported open-source tooling options',
        'Validates database connection pools and API throughput under realistic peak demand',
        'Defines concrete SLA thresholds (e.g. 95th percentile under 2s)',
        'Can be automated in continuous integration for continuous capacity assurance',
      ],
      limitations: [
        'Requires representative test environments and sanitized test datasets',
        'Generating high concurrency (10,000+ users) requires distributed load generators',
        'Test scripts need regular maintenance as API signatures evolve',
      ],
      tools: [
        {
          name: 'Apache JMeter',
          sub: 'Open-Source Protocol & Thread Simulation',
          url: 'https://jmeter.apache.org',
          desc: 'A mature, GUI-based open-source load testing tool that simulates many virtual users executing a sequence of requests (HTTP, but also databases, FTP, and more), with built-in graphical reports showing response times, throughput, and error rates as load increases.',
          adv: [
            'Free, mature, and extremely widely used — extensive documentation and plugin ecosystem',
            'GUI mode makes building and visualizing tests approachable without heavy scripting',
            'Supports many protocols beyond HTTP (databases, message queues, FTP)',
            'Detailed built-in reporting on response time, throughput, and error rate under load',
          ],
          lim: [
            'GUI mode consumes significant memory — large runs require CLI execution',
            'XML test plans are harder to version control cleanly than code scripts',
            'Steeper learning curve for complex dynamic parameterization',
          ],
          steps: [
            {
              t: 'Step 1 — Download & launch Apache JMeter',
              p: 'Run jmeter.bat (Windows) or jmeter.sh (macOS/Linux).',
              c: './bin/jmeter',
            },
            {
              t: 'Step 2 — Create Thread Group for target users',
              p: 'Configure Number of Threads (Users): 300, Ramp-up period: 60s, Duration: 300s.',
              c: 'Thread Group Configuration:\n- Number of Threads: 300\n- Ramp-Up: 60 seconds\n- Duration: 300 seconds',
            },
            {
              t: 'Step 3 — Add HTTP Request samplers',
              p: 'Add POST /api/v1/auth/login and GET /api/v1/payslips/latest.',
              c: 'Sampler 1: POST https://staging.hrms-app.com/api/v1/auth/login\nSampler 2: GET https://staging.hrms-app.com/api/v1/payslips/latest',
            },
            {
              t: 'Step 4 — Add Response Assertions',
              p: 'Verify HTTP status code 200 and response body contains valid JSON keys.',
              c: 'Response Assertion: Response Code = 200 AND Body contains "net_salary"',
            },
            {
              t: 'Step 5 — Add Listeners for live reporting',
              p: 'Add Summary Report and Aggregate Graph listeners to track p90, p95, and throughput.',
              c: 'Listeners Added: Summary Report, View Results Tree, Aggregate Report',
            },
            {
              t: 'Step 6 — Execute headlessly via CLI for true benchmarking',
              p: 'Run in non-GUI mode to prevent client memory consumption.',
              c: 'jmeter -n -t hrms_payroll_load.jmx -l results.jtl -e -o ./html_report',
            },
            {
              t: 'Step 7 — Validate against SLA metrics',
              p: 'Inspect generated HTML dashboard for error rate (0%) and 95th percentile response times.',
              c: 'Report Summary: 300 VUs | Error Rate: 0.00% | 95th Percentile: 1.42s -> PASS',
            },
          ],
        },
        {
          name: 'k6',
          sub: 'Developer-Centric Code-First Load Testing',
          url: 'https://k6.io',
          desc: 'A modern, developer-centric, code-first load testing tool where tests are written in JavaScript rather than configured through a GUI, designed specifically to fit into CI/CD pipelines as version-controlled, readable test scripts.',
          adv: [
            'Code-based scripts are readable, version-controllable, and fit naturally into CI/CD',
            'Lightweight — far lower resource usage than JMeter for generating the same load',
            'Built-in threshold checks let the test itself pass/fail automatically against defined SLAs',
            'Clean, modern JavaScript API with a shallow learning curve for developers',
          ],
          lim: [
            'Free/open-source tier lacks a built-in GUI',
            'Distributed load generation across multiple machines requires Cloud tier',
            'JavaScript-only test scripting',
          ],
          steps: [
            {
              t: 'Step 1 — Install k6 CLI',
              p: 'Install via brew or direct standalone binary.',
              c: 'brew install k6',
            },
            {
              t: 'Step 2 — Write load test in JavaScript with stages',
              p: 'Define ramp-up, steady peak, and ramp-down stages.',
              c: 'import http from \'k6/http\';\nimport { check, sleep } from \'k6\';\n\nexport const options = {\n  stages: [\n    { duration: \'1m\', target: 300 },\n    { duration: \'3m\', target: 300 },\n    { duration: \'1m\', target: 0 },\n  ],\n  thresholds: {\n    http_req_duration: [\'p(95)<2000\'],\n    http_req_failed: [\'rate<0.01\'],\n  },\n};',
            },
            {
              t: 'Step 3 — Implement authenticated API flow',
              p: 'Send login request, extract JWT token, and hit payslip endpoint.',
              c: 'export default function () {\n  const loginRes = http.post(\'https://staging.hrms-app.com/api/login\', {\n    email: \'user@hrms.com\',\n    password: \'password123\',\n  });\n  check(loginRes, { \'status is 200\': (r) => r.status === 200 });\n  const token = loginRes.json(\'token\');\n\n  const res = http.get(\'https://staging.hrms-app.com/api/payslips/latest\', {\n    headers: { Authorization: `Bearer ${token}` },\n  });\n  check(res, { \'payslip status 200\': (r) => r.status === 200 });\n  sleep(1);\n}',
            },
            {
              t: 'Step 4 — Execute test in terminal',
              p: 'Run test locally and view real-time metrics stream.',
              c: 'k6 run load-test.js',
            },
            {
              t: 'Step 5 — Evaluate threshold exit code in CI',
              p: 'k6 automatically returns non-zero exit code if SLA thresholds are breached.',
              c: 'http_req_duration..............: avg=640ms min=120ms med=480ms max=1820ms p(95)=1.4s ✓\nhttp_req_failed................: 0.00% ✓',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Concurrency Simulation & SLA Verification',
          body: 'Model peak concurrent user traffic and assert response latency under 2 seconds for the 95th percentile.',
          doThis: 'Write a k6 script executing 300 virtual users and evaluate connection pool thresholds.',
          code: 'k6 run --vus 300 --duration 5m load-test.js',
        },
      ],
      checklist: ['Defined peak concurrent user volume', 'Configured automated SLA failure thresholds', 'Monitored backend database connection pools'],
      practice: { title: '300-user load simulation', brief: 'Create an automated load test validating peak payroll login traffic.' },
      resources: [
        r('tool', 'k6 Official Documentation', 'https://k6.io/docs/', 'EN'),
        r('tool', 'Apache JMeter Official Site', 'https://jmeter.apache.org', 'EN'),
      ],
    }),

    ch({
      id: 'tt-stress-testing',
      kind: 'guide',
      phase: 'Part 4 · Non-Functional',
      level: 'advanced',
      title: 'Stress Testing',
      minutes: 25,
      durationLabel: 'Chapter 15',
      overviewText:
        'Stress testing pushes the application beyond its expected normal load — well past the numbers load testing confirmed as acceptable — deliberately looking for the breaking point, and just as importantly, how the system fails and whether it recovers gracefully once the excess load is removed.',
      why:
        'Real traffic doesn\'t always stay within expected bounds — a viral moment, a bot attack, a mistaken bulk operation, or simply underestimated growth can push load far past what was planned for. Stress testing answers a different question than load testing: not "does it work at expected load" but "what happens when that\'s exceeded, and does it fail safely or catastrophically."',
      when:
        'After load testing has established the normal-capacity baseline, specifically to find the ceiling above it — before launches with unpredictable traffic potential, and periodically to make sure the failure mode (crash vs. graceful degradation vs. queuing) is still what the team expects as the system evolves.',
      practical: {
        app: 'HRMS Login Endpoint Under Stress',
        scenario:
          'Building on the 300-user load test baseline, a stress test ramps concurrent users continuously past that point to find where the login endpoint actually breaks.',
        pass: 'At approximately 650 concurrent users, database connection pool is exhausted and new login attempts return 503 errors — existing sessions remain unaffected and app recovers within 30 seconds once load drops below 400.',
        fail: 'Server memory leak causes kernel panic and persistent database corruption at 500 users, requiring manual container restarts — a catastrophic failure mode caught safely in stress testing.',
      },
      advantages: [
        'Reveals the actual breaking point rather than assuming capacity based on load testing alone',
        'Exposes failure mode — a system that fails gracefully (clear errors, queuing) is far safer than one that crashes outright',
        'Confirms whether the system recovers cleanly once excess load is removed',
        'Gives infrastructure and on-call teams concrete numbers to plan and alert around',
      ],
      limitations: [
        'Deliberately destabilizes the system under test — requires isolated staging environment',
        'Finding the exact breaking point takes iterative tuning',
        'Results can be affected by shared infrastructure',
        'Confirmed ceiling shifts as code and dependencies change',
      ],
      tools: [
        {
          name: 'Apache JMeter',
          sub: 'Ramp-Up Stress Simulation',
          url: 'https://jmeter.apache.org',
          seeChapter: 14,
          desc: 'JMeter works identically for stress testing as for load testing (see Chapter 14) — the only difference is intent and configuration: configuring the Thread Group to climb aggressively beyond the 300-user baseline until the server degrades.',
          adv: [
            'Reveals the actual breaking point rather than assuming capacity based on load testing alone',
            'Exposes failure mode — confirms graceful degradation vs catastrophic server crash',
            'Confirms whether the system recovers cleanly once excess load is removed',
            'Gives infrastructure teams concrete capacity ceilings to configure autoscaling alerts',
          ],
          lim: [
            'Deliberately destabilizes the environment — requires isolated staging resources',
            'Iterative calibration required to find the exact inflection point',
          ],
          steps: [
            {
              t: 'Step 1 — Start from load-tested baseline',
              p: 'Load test verified 300 concurrent users as acceptable baseline.',
              c: 'Baseline: 300 users @ 1.4s response time',
            },
            {
              t: 'Step 2 — Configure aggressive stepping thread group',
              p: 'Add 100 virtual users every 60 seconds up to 1000 users.',
              c: 'Schedule: 300 -> 400 -> 500 -> 600 -> 700 -> 800 -> 900 -> 1000 VUs',
            },
            {
              t: 'Step 3 — Monitor breaking point indicators',
              p: 'Track point where response times spike (>5s) and 5xx errors begin occurring.',
              c: 'Breaking Point: At 650 VUs, response times spike to 8.2s and 503 Service Unavailable begins',
            },
            {
              t: 'Step 4 — Evaluate failure mode',
              p: 'Verify system returns HTTP 503 gracefully without server process crash.',
              c: 'Failure Mode: 503 (Connection pool exhausted) - Web process remained active',
            },
            {
              t: 'Step 5 — Ramp down load and observe recovery',
              p: 'Drop load back to 300 VUs and confirm response times recover within 30 seconds.',
              c: 'Recovery: Response time normalized to 1.3s in 24 seconds -> PASS',
            },
          ],
        },
        {
          name: 'k6',
          sub: 'Spike & Breaking-Point Stages',
          url: 'https://k6.io',
          seeChapter: 14,
          desc: 'Using k6\'s code-driven stages (see Chapter 14), you can define a stress test that continuously increases virtual users until the system hits its threshold.',
          adv: [
            'Code-based scripts are readable, version-controllable, and fit naturally into CI/CD',
            'Lightweight — far lower resource usage than JMeter for generating the same load',
            'Built-in threshold checks let the test itself pass/fail automatically against defined SLAs',
            'Clean, modern JavaScript API with a shallow learning curve for developers',
          ],
          lim: [
            'Free tier lacks GUI dashboards without external monitoring stacks',
            'Large scale tests requires cloud runners',
          ],
          steps: [
            {
              t: 'Step 1 — Configure stress stages in k6 script',
              p: 'Define progressive multi-stage climb well past normal load capacity.',
              c: 'export const options = {\n  stages: [\n    { duration: \'2m\', target: 300 },\n    { duration: \'5m\', target: 600 },\n    { duration: \'5m\', target: 900 },\n    { duration: \'2m\', target: 300 },\n    { duration: \'1m\', target: 0 },\n  ],\n};',
            },
            {
              t: 'Step 2 — Execute stress run and pipe metrics',
              p: 'Run k6 with live terminal charts.',
              c: 'k6 run --out influxdb=http://localhost:8086/k6 stress-test.js',
            },
            {
              t: 'Step 3 — Document safe operational ceiling',
              p: 'Establish maximum safe ceiling at 550 VUs with alerts triggered at 500.',
              c: 'Recommendation: Set autoscaling trigger at 450 VUs; alert at 500 VUs',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Breaking-Point & Recovery Profiling',
          body: 'Subject infrastructure to extreme traffic spikes and evaluate self-healing and graceful degradation.',
          doThis: 'Execute an escalating k6 stress test and verify 503 error handling and recovery time.',
          code: 'k6 run stress-test.js',
        },
      ],
      checklist: ['Identified absolute breaking concurrency point', 'Confirmed absence of permanent data corruption', 'Validated auto-recovery under 30 seconds'],
      practice: { title: 'Stress test & breaking point audit', brief: 'Discover the exact concurrency ceiling of an authentication API.' },
      resources: [
        r('guide', 'AWS Well-Architected — Reliability & Stress Testing', 'https://aws.amazon.com/architecture/well-architected/', 'EN'),
      ],
    }),

    ch({
      id: 'tt-scalability-testing',
      kind: 'guide',
      phase: 'Part 4 · Non-Functional',
      level: 'advanced',
      title: 'Scalability Testing',
      minutes: 25,
      durationLabel: 'Chapter 16',
      overviewText:
        'Scalability testing measures how an application\'s performance changes as load increases in stages, specifically to determine whether — and how — adding more resources (servers, database capacity, workers) allows the system to keep pace with growing demand, rather than just finding a single breaking point.',
      why:
        'Knowing a system breaks at 650 users (stress testing) is different from knowing whether adding a second application server lets it comfortably handle 1,300. Scalability testing is what informs real infrastructure and cost decisions — whether the application scales roughly linearly with added resources, or whether some bottleneck (a single database, a shared cache, a non-parallelizable process) caps growth no matter how much hardware is thrown at it.',
      when:
        'During capacity planning ahead of expected growth, before infrastructure investment decisions, and whenever the architecture changes in ways that could affect how well it scales (moving to microservices, adding caching layers, changing database sharding). It\'s less about a single test and more an ongoing question revisited as both load and architecture evolve.',
      practical: {
        app: 'HRMS Application Server Scaling',
        scenario:
          'The team tests whether adding application servers behind a load balancer lets the system handle proportionally more concurrent users.',
        pass: 'Going from 1 to 2 application servers roughly doubles the concurrent users handled at acceptable response times (300 → 580), confirming the application layer scales close to linearly.',
        fail: 'Going from 2 to 4 servers barely improves capacity (580 → 620) — the database, still a single instance, is now the bottleneck, and no amount of additional application servers will fix it without addressing the database layer itself.',
      },
      advantages: [
        'Directly answers whether adding resources actually solves the capacity problem, not just whether a problem exists',
        'Produces a real cost/benefit curve for infrastructure decisions rather than guesswork',
        'Surfaces architectural bottlenecks (a single shared database, for example) that no amount of added compute will fix',
        'Reusable methodology as the application grows — the same matrix approach applies at every stage',
      ],
      limitations: [
        'Time-consuming — requires running the full test matrix across multiple resource configurations, not a single run',
        'Needs the ability to actually provision and tear down different resource configurations for testing, which isn\'t always trivial',
        'Results are specific to the exact architecture tested — a major architecture change invalidates the previous scalability curve',
        'Doesn\'t by itself identify the root cause of a bottleneck, only that one exists — deeper profiling is needed to pinpoint it',
      ],
      tools: [
        {
          name: 'Apache JMeter',
          sub: 'Multi-Node Benchmark Matrix',
          url: 'https://jmeter.apache.org',
          seeChapter: 14,
          desc: 'Apache JMeter is used here (see Chapter 14) across a series of progressively increasing load levels, each measured against a specific resource configuration (1 node, 2 nodes, 4 nodes), to see how the throughput curve responds.',
          adv: [
            'Directly answers whether adding resources actually solves the capacity problem',
            'Produces a real cost/benefit curve for infrastructure decisions rather than guesswork',
            'Surfaces architectural bottlenecks before large cloud investments',
            'Reusable matrix methodology as application grows',
          ],
          lim: [
            'Time-consuming — requires running full test matrix across multiple resource configurations',
            'Needs ability to provision and teardown cloud infrastructure for testing',
            'Results specific to tested architecture',
          ],
          steps: [
            {
              t: 'Step 1 — Define test matrix of load vs compute configurations',
              p: 'Matrix: Load levels (100, 300, 600, 1000 users) across Config A (1 server), Config B (2 servers), Config C (4 servers).',
              c: 'Matrix:\n- Config A: 1 App Server (2 CPU, 4GB RAM)\n- Config B: 2 App Servers + Load Balancer\n- Config C: 4 App Servers + Load Balancer',
            },
            {
              t: 'Step 2 — Execute identical JMeter test plan across each configuration',
              p: 'Run benchmark suite against Config A, record throughput and p95 latency.',
              c: 'Run 1 (Config A): 300 VUs -> 1.4s p95, 210 req/sec',
            },
            {
              t: 'Step 3 — Scale application layer to Config B (2 nodes)',
              p: 'Repeat identical load and scale up to 600 users.',
              c: 'Run 2 (Config B): 600 VUs -> 1.5s p95, 410 req/sec (Linear Scaling 97%)',
            },
            {
              t: 'Step 4 — Scale to Config C (4 nodes) and test for database bottleneck',
              p: 'Test 1000 users to verify if database queries become the primary bottleneck.',
              c: 'Run 3 (Config C): 1000 VUs -> 4.8s p95, 440 req/sec (Bottleneck at Postgres connection limits)',
            },
            {
              t: 'Step 5 — Chart scalability curve and report ROI',
              p: 'Inform engineering that scaling beyond 2 app servers requires database read replicas or connection pooling (PgBouncer).',
              c: 'Decision: Introduce PgBouncer and Read Replicas before provisioning additional App instances',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Horizontal & Vertical Scaling Verification',
          body: 'Measure compute resource throughput scaling efficiency across 1x, 2x, and 4x infrastructure configurations.',
          doThis: 'Execute JMeter scaling matrix and graph throughput vs replica count.',
          code: 'jmeter -n -t scalability_matrix.jmx -l scale_results.jtl',
        },
      ],
      checklist: ['Constructed multi-node load test matrix', 'Plotted throughput scaling curve', 'Isolated architectural bottleneck layer'],
      practice: { title: 'Horizontal scaling efficiency report', brief: 'Model and test linear scaling capacity across a load-balanced cluster.' },
      resources: [
        r('guide', 'Cloudflare — Understanding Horizontal vs Vertical Scalability', 'https://www.cloudflare.com/learning/performance/what-is-scalability/', 'EN'),
      ],
    }),

    ch({
      id: 'tt-volume-testing',
      kind: 'guide',
      phase: 'Part 5 · Non-Functional',
      level: 'advanced',
      title: 'Volume Testing',
      minutes: 25,
      durationLabel: 'Chapter 17',
      overviewText:
        'Volume testing checks how an application behaves when the database is filled with a large quantity of data — not many concurrent users, but a large amount of data at rest — verifying that queries, searches, exports, and reports still perform acceptably once the system has scaled up in data size rather than traffic.',
      why:
        'A system tested with 50 sample records can behave very differently once a real database holds 500,000 rows — an unindexed query that returned instantly in dev can take minutes in production, pagination can break, exports can time out, and reports can grind to a halt. Volume testing catches the specific failure mode of "it works, but only with a small amount of data," which functional testing on a small dataset will never reveal.',
      when:
        'Before launch, once the expected data growth over the first year (or several years) can be estimated, and again whenever a new data-heavy feature (bulk import, reporting module, audit log) is added. It\'s especially important before enabling any feature that queries or aggregates across the entire dataset.',
      practical: {
        app: 'HRMS Employee Search',
        scenario:
          'The employee search feature is tested with 100 employees during development, then loaded with 50,000 synthetic employee records to simulate several years of company growth.',
        pass: 'Adding a database index on name brings search down to 80ms at the same 50,000-record volume.',
        fail: 'Search takes 6.2 seconds per query — a full table scan with no index on the name column.',
      },
      advantages: [
        'Directly exposes missing database indexes and inefficient queries before real data accumulates',
        'Cheap to generate — synthetic data at any scale, without needing real users or real time',
        'Reveals UI-level breakage (broken pagination, timeouts) that only appears at scale',
        'Findings translate directly into concrete database and query fixes',
      ],
      limitations: [
        'Synthetic data can miss real-world data patterns (skewed distributions, unusual characters, edge-case values)',
        'Requires a disposable test database — never run volume tests against production',
        'Doesn\'t test concurrent access at volume, only single-user query performance at scale',
        'Cleanup after testing needs care — large synthetic datasets must be fully removed before reuse',
      ],
      tools: [
        {
          name: 'Python + Faker',
          sub: 'Synthetic Bulk Data Generation',
          url: 'https://faker.readthedocs.io',
          desc: 'A lightweight approach where a script generates large volumes of realistic-looking fake data (names, dates, addresses) and inserts it directly into the database, bypassing the UI entirely for speed.',
          adv: [
            'Fast generation of millions of structured rows tailored to exact schema',
            'Bypasses UI overhead for high-speed direct database seeding',
            'Customizable localization (locales, currencies, regional phone formats)',
            'Free and easy to integrate into migration pipelines',
          ],
          lim: [
            'Requires custom scripting tailored to relational foreign-key constraints',
            'May not fully replicate organic distribution skews',
          ],
          steps: [
            {
              t: 'Step 1 — Install Faker library in Python environment',
              p: 'Install Faker and your database connector (e.g. psycopg2, mysql-connector).',
              c: 'pip install faker psycopg2-binary',
            },
            {
              t: 'Step 2 — Write bulk generator script',
              p: 'Generate realistic employee records in memory batches of 10,000 rows.',
              c: 'from faker import Faker\nimport psycopg2\n\nfake = Faker()\nconn = psycopg2.connect("dbname=hrms_staging user=postgres")\ncur = conn.cursor()\n\nrecords = [(fake.name(), fake.email(), fake.job(), fake.date_of_birth()) for _ in range(50000)]\ncur.executemany("INSERT INTO employees (name, email, role, dob) VALUES (%s, %s, %s, %s)", records)\nconn.commit()',
            },
            {
              t: 'Step 3 — Seed target volume tiers',
              p: 'Benchmark performance at 10k, 100k, and 500k rows.',
              c: 'python seed_volume.py --target=500000',
            },
            {
              t: 'Step 4 — Execute query benchmarks & explain plans',
              p: 'Run query profiling (EXPLAIN ANALYZE) against search and filtering queries.',
              c: 'EXPLAIN ANALYZE SELECT * FROM employees WHERE name ILIKE \'%Smith%\';\n-- Seq Scan on employees (actual time=6200.12ms)',
            },
            {
              t: 'Step 5 — Apply query optimization & database indexing',
              p: 'Create b-tree or trigram index on heavily filtered columns.',
              c: 'CREATE INDEX idx_employees_name_trgm ON employees USING gin (name gin_trgm_ops);',
            },
            {
              t: 'Step 6 — Verify sub-second execution',
              p: 'Re-run query to confirm index scan reduces time from 6.2s to 80ms.',
              c: 'EXPLAIN ANALYZE SELECT * FROM employees WHERE name ILIKE \'%Smith%\';\n-- Bitmap Index Scan on idx_employees_name_trgm (actual time=78.4ms) -> PASS',
            },
          ],
        },
        {
          name: 'Apache JMeter',
          sub: 'Volume-Loaded Query Benchmarking',
          url: 'https://jmeter.apache.org',
          seeChapter: 14,
          desc: 'Once volume is loaded into the database, JMeter can be reused (see Chapter 14) to hit the affected endpoints repeatedly and measure how response time changes purely due to data size, independent of concurrent user count.',
          adv: [
            'Measures end-to-end API response time under full database payload volume',
            'Automates pagination, filtering, and export endpoint testing',
            'Reuses existing test plans from Chapter 14',
          ],
          lim: [
            'Requires dedicated staging instance with pre-populated test data',
          ],
          steps: [
            {
              t: 'Step 1 — Configure HTTP Sampler for search endpoint',
              p: 'Hit /api/v1/employees/search?q=Smith against the 500k-row staging environment.',
              c: 'GET https://staging.hrms-app.com/api/v1/employees/search?page=1&limit=50&q=Smith',
            },
            {
              t: 'Step 2 — Add duration assertions',
              p: 'Assert response completes in under 500ms even with 500,000 records in database.',
              c: 'Duration Assertion: Max response time <= 500ms',
            },
            {
              t: 'Step 3 — Test CSV/PDF bulk export timeout limits',
              p: 'Hit /api/v1/reports/export-all and verify background worker queues payload without HTTP 504 Gateway Timeout.',
              c: 'POST /api/v1/reports/export-all -> 202 Accepted (Job ID: exp_9812)',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Database Volume Inflation & Query Optimization',
          body: 'Benchmark database indexing and full-table scan query bottlenecks with synthetic datasets exceeding 500,000 records.',
          doThis: 'Generate 500k mock records with Faker and profile database query performance.',
          code: 'python seed_volume.py --records=500000',
        },
      ],
      checklist: ['Generated realistic synthetic test dataset', 'Executed EXPLAIN ANALYZE on top 5 critical queries', 'Added necessary indexes to maintain sub-100ms response times'],
      practice: { title: '500,000-row volume query optimization', brief: 'Benchmark search endpoints under high-volume database conditions and optimize indexing.' },
      resources: [
        r('tool', 'Faker Python Documentation', 'https://faker.readthedocs.io', 'EN'),
        r('guide', 'Use The Index, Luke — Database Indexing Guide', 'https://use-the-index-luke.com', 'EN'),
      ],
    }),

    ch({
      id: 'tt-security-testing',
      kind: 'guide',
      phase: 'Part 5 · Non-Functional',
      level: 'advanced',
      title: 'Security Testing',
      minutes: 30,
      durationLabel: 'Chapter 18',
      overviewText:
        'Security testing probes an application for vulnerabilities that could let an attacker access data, impersonate a user, disrupt service, or otherwise act outside their intended permissions — checking not whether the app does what it\'s supposed to, but whether it can be made to do what it\'s not supposed to.',
      why:
        'A functionally perfect application can still expose sensitive data or grant unauthorized access if a single endpoint is missing an auth check, a form is vulnerable to injection, or a session token isn\'t invalidated correctly. Security failures are also uniquely costly — unlike a functional bug, a security gap can be actively and repeatedly exploited by someone specifically looking for it, often silently, long before anyone notices.',
      when:
        'Continuously — basic checks (dependency scanning, auth checks on new endpoints) belong in every CI run, while deeper testing (manual probing, penetration-style checks) should happen before major releases and whenever authentication, permissions, or data-handling code changes.',
      practical: {
        app: 'HRMS Payslip Access (IDOR Vulnerability)',
        scenario:
          'Manual security testing checks whether an employee can view another employee\'s payslip by changing the ID in the URL (/payslip/104 → /payslip/105).',
        pass: 'The same request returns a 403 Forbidden, because the backend now verifies the session\'s employee ID matches the requested payslip\'s owner.',
        fail: 'The request succeeds and returns employee 105\'s payslip data — a broken access control vulnerability, since the backend checked only that a valid session existed, not that it belonged to the requested employee.',
      },
      advantages: [
        'ZAP catches common, well-known vulnerability classes automatically, without needing deep security expertise to start',
        'Dependency scanning catches inherited risk from third-party code, which manual testing would never think to check',
        'Both are free and scriptable, fitting naturally into CI/CD for continuous coverage',
        'Findings map directly to well-known, well-documented vulnerability categories (OWASP Top 10), making fixes easier to research',
      ],
      limitations: [
        'Automated scanning finds known patterns, not novel logic flaws — it doesn\'t replace a skilled human security review or a real penetration test',
        'Produces false positives that require manual verification, and can also miss context-specific vulnerabilities',
        'Dependency scanners only know about disclosed vulnerabilities — a zero-day dependency risk stays invisible',
        'Authenticated/permission-based flaws often need manual scenario testing',
      ],
      tools: [
        {
          name: 'OWASP ZAP',
          sub: 'Automated Vulnerability & Proxy Scanner',
          url: 'https://www.zaproxy.org',
          desc: 'A free, open-source web application security scanner that acts as a proxy between the tester and the application, automatically crawling it and testing for common vulnerabilities (SQL injection, XSS, insecure headers, and more) drawn from the OWASP Top 10.',
          adv: [
            'Free, industry-standard tool backed by OWASP Foundation',
            'Automated spider crawler and active attack scanner',
            'Can intercept and tamper with live HTTP requests as an interactive proxy',
            'Provides clear remediation guidance mapped to CWE and OWASP Top 10',
          ],
          lim: [
            'Active scanning can alter test data — execute against staging only',
            'Requires authenticated session configuration for protected areas',
          ],
          steps: [
            {
              t: 'Step 1 — Launch OWASP ZAP & configure browser proxy',
              p: 'Start ZAP GUI or Docker container and point target browser to 127.0.0.1:8080.',
              c: 'zap.sh -daemon -port 8080 -config api.disablekey=true',
            },
            {
              t: 'Step 2 — Run Automated Spider crawl',
              p: 'Discover all endpoints, forms, input fields, and REST APIs.',
              c: 'Target: https://staging.hrms-app.com\nSpider: Discovered 48 URLs and 14 form parameters',
            },
            {
              t: 'Step 3 — Configure authenticated context',
              p: 'Supply session cookie or JWT bearer token so ZAP can audit internal authenticated routes.',
              c: 'Header: Authorization: Bearer eyJhbGciOi...',
            },
            {
              t: 'Step 4 — Execute Active Scan against OWASP Top 10',
              p: 'Inject automated payloads testing for SQLi, Reflected XSS, and CSRF.',
              c: 'Active Scan Status: Testing Cross-Site Scripting (XSS), SQL Injection, Path Traversal',
            },
            {
              t: 'Step 5 — Review risk-categorized Alert report',
              p: 'Inspect High, Medium, and Low findings with proof-of-concept request/response pairs.',
              c: 'Alert Summary:\n- High: Missing Content-Security-Policy (CSP)\n- Medium: Cookie without SameSite=Strict\n- Informational: Server header banner leakage',
            },
            {
              t: 'Step 6 — Integrate ZAP in GitHub Actions CI',
              p: 'Automate baseline security scans on every pull request.',
              c: 'docker run -v $(pwd):/zap/wrk/:rw -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t https://staging.hrms-app.com -r zap_report.html',
            },
          ],
        },
        {
          name: 'npm audit / pip-audit',
          sub: 'Dependency Vulnerability Gatekeeper',
          url: 'https://pypi.org/project/pip-audit/',
          desc: 'Dependency vulnerability scanners built into (or added alongside) the package manager, checking every third-party library the project depends on against known vulnerability databases.',
          adv: [
            'Zero setup — built directly into package managers',
            'Scans entire dependency graph including transitive child packages',
            'Automated exit codes for continuous integration breaking on High/Critical CVEs',
            'Directly recommends semver-safe upgrade commands',
          ],
          lim: [
            'Only detects known public CVEs (zero-days remain unflagged)',
            'Cannot audit proprietary custom in-house libraries',
          ],
          steps: [
            {
              t: 'Step 1 — Run audit scan on project root',
              p: 'Execute security scan across package-lock.json or requirements.txt.',
              c: 'npm audit\n# Or for Python:\npip-audit -r requirements.txt',
            },
            {
              t: 'Step 2 — Inspect vulnerability advisory details',
              p: 'Review CVE severity, CVSS score, affected package versions, and fix availability.',
              c: 'axios  <1.7.4\nSeverity: High\nAxios Cross-Site Request Forgery Vulnerability - CVE-2024-39338\nFix available: upgrade to axios@1.7.4',
            },
            {
              t: 'Step 3 — Apply automated safe patches',
              p: 'Upgrade vulnerable dependencies without breaking major versions.',
              c: 'npm audit fix',
            },
            {
              t: 'Step 4 — Add CI audit barrier',
              p: 'Configure pipeline to fail if any High or Critical severity CVE is introduced.',
              c: 'npm audit --audit-level=high',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'OWASP Top 10 & Dependency Audit',
          body: 'Scan endpoints for injection and broken object-level authorization (IDOR) vulnerabilities and audit dependencies.',
          doThis: 'Run OWASP ZAP baseline scan and configure automated dependency audit checks.',
          code: 'npm audit && docker run -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t https://staging.hrms-app.com',
        },
      ],
      checklist: ['Configured automated dependency CVE scanner', 'Executed OWASP ZAP active scan against authenticated endpoints', 'Verified strict object-level authorization controls'],
      practice: { title: 'OWASP Top 10 vulnerability assessment', brief: 'Conduct a penetration testing pass and audit authorization policies.' },
      resources: [
        r('tool', 'OWASP ZAP Official Site', 'https://www.zaproxy.org', 'EN'),
        r('guide', 'OWASP Top 10 Security Risks', 'https://owasp.org/www-project-top-ten/', 'EN'),
      ],
    }),

    ch({
      id: 'tt-compatibility-testing',
      kind: 'guide',
      phase: 'Part 5 · Non-Functional',
      level: 'intermediate',
      title: 'Compatibility Testing',
      minutes: 25,
      durationLabel: 'Chapter 19',
      overviewText:
        'Compatibility testing verifies that an application works correctly across the different environments real users will actually use it in — different browsers, operating systems, screen sizes, and devices — rather than just the one environment it was built and tested on.',
      why:
        'Code that renders and behaves correctly in one browser can break in another due to differing CSS support, JavaScript engine quirks, or default behaviors — and a layout that looks fine on a developer\'s laptop can be unusable on a small phone screen. Without compatibility testing, these gaps only surface when real users on real devices hit them, often generating confusing, hard-to-reproduce support tickets.',
      when:
        'Throughout development for major features, and definitely before release — checked against the specific browsers, OS versions, and device sizes the actual user base is known (or expected) to use, rather than testing exhaustively against every possible combination.',
      practical: {
        app: 'HRMS Leave Calendar Widget',
        scenario:
          'The leave calendar widget, built and tested primarily in Chrome on desktop, is checked against Safari on iOS and an older Android device.',
        pass: 'The overlay renders correctly across Chrome, Safari, and the tested Android browser once the stacking-context bug is corrected.',
        fail: 'On Safari iOS, the date picker overlay renders behind the calendar instead of on top of it, making dates unselectable — a CSS stacking-context issue invisible in Chrome.',
      },
      advantages: [
        'Real-device testing (BrowserStack) catches issues emulators and simulators simply can\'t reproduce',
        'Covers the full matrix of browser/OS/device combinations without needing to physically own each one',
        'DevTools Device Mode gives a fast, free, zero-setup first pass during active development',
        'Screenshot comparison makes visual regressions across browsers immediately obvious',
      ],
      limitations: [
        'Free/trial tiers limit the number of test minutes or device combinations available',
        'Testing every possible combination is impossible — prioritization based on real user analytics is essential',
        'Device Mode emulation isn\'t a perfect substitute for a real device\'s touch behavior, performance, or rendering quirks',
        'Manual walkthroughs across many combinations are time-consuming without automation layered on top',
      ],
      tools: [
        {
          name: 'BrowserStack',
          sub: 'Real Cloud Device & Cross-Browser Lab',
          url: 'https://browserstack.com',
          desc: 'A cloud platform providing access to real browsers and real devices (not just emulators) for manual and automated cross-browser/cross-device testing, without needing to own or maintain a physical device lab.',
          adv: [
            'Access to real physical iPhones, iPads, Samsung Galaxy, and Google Pixel devices',
            'Supports hundreds of legacy and modern browser versions (Chrome, Firefox, Safari, Edge)',
            'Interactive devtools with remote debugging from cloud devices',
            'Automated parallel test execution with Selenium and Playwright',
          ],
          lim: [
            'Free tier offers limited interactive test minutes',
            'Requires internet connection with occasional cloud streaming latency',
          ],
          steps: [
            {
              t: 'Step 1 — Select target OS, Browser, and Device matrix',
              p: 'Select Safari on iOS 17 (iPhone 15) and Chrome on Windows 11.',
              c: 'Environment Matrix:\n1. iOS 17 | Safari | iPhone 15 Pro\n2. Android 14 | Chrome | Galaxy S24\n3. macOS Sonoma | Safari 17.4',
            },
            {
              t: 'Step 2 — Launch live interactive testing session',
              p: 'Navigate to staging HRMS URL and interact with UI in real time.',
              c: 'Live session URL: https://staging.hrms-app.com/calendar',
            },
            {
              t: 'Step 3 — Inspect device-specific rendering and console logs',
              p: 'Open remote Web Inspector to debug CSS z-index and touch-event behavior.',
              c: 'Inspected: .datepicker-modal { z-index: 9999; -webkit-transform: translateZ(0); }',
            },
            {
              t: 'Step 4 — Capture cross-browser visual comparison screenshots',
              p: 'Trigger 10-browser screenshot comparison in one click.',
              c: 'Captured: Desktop Chrome, Desktop Firefox, Desktop Safari, iOS Safari, Android Chrome',
            },
            {
              t: 'Step 5 — Log bug with direct BrowserStack session link',
              p: 'Export annotated screen recordings directly to Jira or GitHub Issues.',
              c: 'Ticket Created: BUG-402: Datepicker modal hidden behind calendar table on Mobile Safari',
            },
          ],
        },
        {
          name: 'Chrome DevTools Device Mode',
          sub: 'Built-In Viewport & Touch Emulation',
          url: 'https://developer.chrome.com/docs/devtools/device-mode',
          desc: 'A free, built-in feature of Chrome that simulates different screen sizes and device viewports directly in the browser, useful for quick responsive-design checks without needing BrowserStack for every small check.',
          adv: [
            'Instant access with zero accounts, tokens, or setup required',
            'Simulates mobile viewports, touch cursors, and orientation rotation',
            'Network throttling (Fast 3G, Slow 3G, Offline) and CPU throttling',
            'Inspect media queries and CSS breakpoints live',
          ],
          lim: [
            'Uses Blink engine — cannot catch Safari (WebKit) or Firefox (Gecko) rendering bugs',
          ],
          steps: [
            {
              t: 'Step 1 — Toggle Device Toolbar in Chrome DevTools',
              p: 'Press Ctrl+Shift+M (Windows/Linux) or Cmd+Option+M (macOS).',
              c: 'Shortcut: Cmd + Option + M',
            },
            {
              t: 'Step 2 — Select device preset or responsive dimensions',
              p: 'Test iPhone SE (375px), iPhone 14 Pro (393px), and iPad Mini (768px).',
              c: 'Viewport: 375 x 667 (iPhone SE) | DPR: 2.0',
            },
            {
              t: 'Step 3 — Verify responsive navigation & touch targets',
              p: 'Ensure mobile hamburger menu opens and tap targets meet the 48x48px minimum size.',
              c: 'Check: Button touch target >= 48px x 48px | Text readable without pinch zoom',
            },
            {
              t: 'Step 4 — Test network throttling on mobile viewport',
              p: 'Select Slow 3G to evaluate layout shifts while assets download.',
              c: 'Throttling: Slow 3G (500 Kbps, 400ms RTT) | Check for CLS issues',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Cross-Device & Cross-Browser Verification',
          body: 'Validate responsive viewport layouts and CSS rendering across iOS Safari, Android Chrome, and desktop browsers.',
          doThis: 'Test responsive breakpoints in DevTools Device Mode and execute cross-browser passes on BrowserStack.',
          code: 'npx playwright test --project=webkit --project=firefox',
        },
      ],
      checklist: ['Verified mobile breakpoints (375px, 768px, 1024px)', 'Tested on real iOS Safari and Android Chrome devices', 'Confirmed touch target usability on mobile inputs'],
      practice: { title: 'Responsive & cross-browser audit', brief: 'Audit layout and interaction fidelity across mobile, tablet, and desktop viewports.' },
      resources: [
        r('tool', 'BrowserStack Live', 'https://browserstack.com', 'EN'),
        r('guide', 'Chrome DevTools Device Mode', 'https://developer.chrome.com/docs/devtools/device-mode', 'EN'),
      ],
    }),

    ch({
      id: 'tt-reliability-testing',
      kind: 'guide',
      phase: 'Part 5 · Non-Functional',
      level: 'advanced',
      title: 'Reliability Testing',
      minutes: 25,
      durationLabel: 'Chapter 20',
      overviewText:
        'Reliability testing verifies that an application continues to function correctly over an extended, continuous period of real-world-like usage — checking for the slow degradation, resource leaks, and intermittent failures that only show up over time, not in a single short test run.',
      why:
        'Some problems simply don\'t appear in a quick test — a memory leak that\'s invisible after five minutes can crash a server after five days; a background job that occasionally fails silently might go unnoticed until it\'s failed hundreds of times. Reliability testing answers a question none of the other non-functional tests do: not "is it fast" or "does it break under load," but "does it keep working, correctly, hour after hour, day after day."',
      when:
        'Before launch for any system expected to run continuously (most production systems), and especially before releases introducing long-running processes, background jobs, or caching layers — run as an extended soak test over hours or days rather than a short pass/fail check.',
      practical: {
        app: 'HRMS Background Payroll Job',
        scenario:
          'A background job that recalculates payroll totals nightly is soak-tested by running it continuously, once per hour, for 72 hours in a staging environment instead of just once.',
        pass: 'With the connection properly closed, memory usage returns to baseline after each run and stays flat across the full 72-hour soak test.',
        fail: 'Memory usage climbs steadily with each run and never releases, and by hour 60 the job starts failing outright — a connection object was never being closed after each run.',
      },
      advantages: [
        'Catches slow-building problems (memory leaks, connection exhaustion, gradual degradation) invisible to short tests',
        'Soak testing gives confidence the system can run unattended for real production durations, not just survive a demo',
        'Uptime Kuma provides ongoing, long-term visibility rather than a one-time snapshot',
        'Correlating downtime/latency spikes with deployment history turns reliability into an actionable, trackable metric',
      ],
      limitations: [
        'Inherently time-consuming — a meaningful soak test takes hours or days, not minutes, to produce a useful signal',
        'Requires a stable, dedicated test environment tied up for the full duration of the run',
        'A slow leak may need an even longer run than initially planned to become clearly visible in the data',
        'Uptime monitoring shows that something degraded, not automatically why',
      ],
      tools: [
        {
          name: 'Apache JMeter',
          sub: 'Extended Soak & Memory Leak Detection',
          url: 'https://jmeter.apache.org',
          seeChapter: 14,
          desc: 'The same load-testing tool from Chapter 14 (see Chapter 14), reused here not for a short burst but for a sustained, moderate, continuous load run over many hours, specifically watching for degradation over time rather than an immediate breaking point.',
          adv: [
            'Simulates steady realistic background traffic over hours or days',
            'Exposes unclosed database connections and thread deadlocks',
            'Automated generation of response time trend graphs',
          ],
          lim: [
            'Requires dedicated staging infrastructure during test window',
          ],
          steps: [
            {
              t: 'Step 1 — Configure moderate steady thread group',
              p: 'Configure 50 virtual users with constant throughput rather than an escalating ramp.',
              c: 'Thread Group:\n- Users: 50 VUs\n- Constant Throughput: 120 req/min\n- Duration: 86400 seconds (24 Hours)',
            },
            {
              t: 'Step 2 — Monitor server memory & CPU consumption',
              p: 'Attach Prometheus/Grafana or Node.js process monitor to track heap allocation.',
              c: 'Monitoring: process.memoryUsage().heapUsed recorded every 60 seconds',
            },
            {
              t: 'Step 3 — Analyze response time drift',
              p: 'Compare 95th percentile latency in Hour 1 vs Hour 24.',
              c: 'Hour 01 Latency: 180ms\nHour 12 Latency: 185ms\nHour 24 Latency: 182ms -> Flat curve (No degradation)',
            },
            {
              t: 'Step 4 — Verify zero connection exhaustion',
              p: 'Confirm database connection pool returns all leased connections to pool.',
              c: 'Active Postgres Connections: Constant 8/20 pool size across 24 hours -> PASS',
            },
          ],
        },
        {
          name: 'Uptime Kuma',
          sub: 'Self-Hosted Uptime & SLA Monitor',
          url: 'https://github.com/louislam/uptime-kuma',
          desc: 'A free, self-hostable uptime monitoring tool that continuously pings an application\'s endpoints and tracks availability, response time, and downtime over days, weeks, or months — reliability observed through real, ongoing operation rather than a single test.',
          adv: [
            '100% free, open-source, and self-hostable via Docker in under 2 minutes',
            'Supports HTTP/HTTPS, TCP, Ping, DNS, and keyword validation',
            'Beautiful status pages and instant multi-channel alerts (Slack, Discord, Email, Webhook)',
            'Calculates 24h, 30-day, and 1-year uptime percentages with certificate expiry tracking',
          ],
          lim: [
            'Requires hosting server to run monitor continuously',
          ],
          steps: [
            {
              t: 'Step 1 — Deploy Uptime Kuma via Docker',
              p: 'Run single container instance on monitoring server.',
              c: 'docker run -d --restart=always -p 3001:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:1',
            },
            {
              t: 'Step 2 — Add application monitors & keyword checks',
              p: 'Monitor healthcheck endpoint /api/health and assert status 200 with JSON payload {"status":"ok"}.',
              c: 'Monitor Type: HTTP(s) - Keyword\nURL: https://hrms-app.com/api/health\nInterval: 60 seconds\nKeyword: "status":"ok"',
            },
            {
              t: 'Step 3 — Configure instant alert notifications',
              p: 'Set up Webhook or Slack alerts if an endpoint fails 3 consecutive checks.',
              c: 'Alert Channels: Slack #alerts-devops, Telegram Bot, PagerDuty',
            },
            {
              t: 'Step 4 — Track 30-day SLA and correlate with releases',
              p: 'Inspect uptime graph (99.98%) and review response time spikes following code deployments.',
              c: 'Monthly Uptime: 99.98% | Mean Response Time: 142ms | Total Downtime: 8 mins',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Soak Testing & Uptime Monitoring',
          body: 'Execute extended soak tests to surface memory leaks and monitor production uptime SLAs.',
          doThis: 'Run a 24-hour soak test with JMeter and configure continuous health probes in Uptime Kuma.',
          code: 'docker run -d -p 3001:3001 louislam/uptime-kuma:1',
        },
      ],
      checklist: ['Completed 24h+ soak test under steady load', 'Verified flat memory and CPU resource utilization', 'Configured 60-second automated uptime health checks'],
      practice: { title: '72-hour soak test & SLA monitoring plan', brief: 'Plan and execute an extended soak test to verify zero memory leaks over long durations.' },
      resources: [
        r('tool', 'Uptime Kuma GitHub', 'https://github.com/louislam/uptime-kuma', 'EN'),
        r('guide', 'Google SRE Book — Monitoring Distributed Systems', 'https://sre.google/sre-book/monitoring-distributed-systems/', 'EN'),
      ],
    }),

    ch({
      id: 'tt-accessibility-testing',
      kind: 'guide',
      phase: 'Part 6 · Other Testing Types',
      level: 'intermediate',
      title: 'Accessibility Testing',
      minutes: 25,
      durationLabel: 'Chapter 21',
      overviewText:
        'Accessibility testing verifies that an application can actually be used by people with disabilities — screen reader users, keyboard-only users, people with low vision or color blindness, people with motor impairments — checking against established standards (primarily WCAG) rather than assuming "it works for me" means it works for everyone.',
      why:
        'Accessibility gaps quietly exclude real users: a button that\'s only clickable with a mouse locks out keyboard users entirely, low-contrast text is unreadable for people with low vision, and unlabeled form fields are meaningless to a screen reader. In many jurisdictions it\'s also a legal requirement, not just good practice — but even without that, a genuinely usable application has to be usable by everyone, not just the majority case.',
      when:
        'Throughout design and development, not bolted on at the end — checked whenever new UI is built, and audited more thoroughly before release. Retrofitting accessibility into a finished application is far more expensive than building it in from the start.',
      practical: {
        app: 'HRMS Leave Request Form',
        scenario:
          'The leave request form is scanned with axe DevTools, then manually tested using keyboard-only navigation.',
        pass: 'The date picker is fully operable via keyboard, and an aria-label announces "Leave start date, press Enter to open calendar" to screen reader users.',
        fail: 'The date picker can be opened with a mouse click but has no keyboard equivalent — Tab skips over it entirely, and screen readers announce it only as "button," with no indication of its purpose.',
      },
      advantages: [
        'Automated tools catch a large share of common issues in seconds, with no specialized training required to start',
        'WAVE\'s in-context overlay makes it easy to see and fix issues without cross-referencing a separate report',
        'Findings map to WCAG, a well-documented, industry-standard set of guidelines',
        'Free and requires no backend access — works on any page reachable by the browser',
      ],
      limitations: [
        'Automated scanning catches roughly a third to half of real accessibility issues — many problems (logical reading order, meaningful alt text, screen-reader usability) need manual testing',
        'Doesn\'t replace testing with a real screen reader (NVDA, JAWS, VoiceOver) or real keyboard-only navigation',
        'Doesn\'t evaluate cognitive accessibility (clarity of language, predictability of flows) at all',
        'Best practice is manual testing with actual assistive-technology users, which neither tool provides',
      ],
      tools: [
        {
          name: 'axe DevTools',
          sub: 'Automated WCAG Rule Engine & Browser Extension',
          url: 'https://www.deque.com/axe/devtools',
          desc: 'A free browser extension that automatically scans a page against WCAG rules and flags specific violations — missing alt text, insufficient color contrast, missing form labels, improper heading structure — each with a direct link to the relevant guideline.',
          adv: [
            'Zero false-positive rule engine trusted across enterprise development teams',
            'One-click scan directly within Chrome/Firefox DevTools',
            'Clear categorization by severity: Critical, Serious, Moderate, Minor',
            'Automates compliance auditing with WCAG 2.1 AA and AAA standards',
          ],
          lim: [
            'Automated audits only catch ~40% of all WCAG criteria',
            'Keyboard trapping and visual focus order require manual inspection',
          ],
          steps: [
            {
              t: 'Step 1 — Install axe DevTools browser extension',
              p: 'Install from Chrome Web Store or Firefox Add-ons and open browser DevTools.',
              c: 'Shortcut: Open DevTools -> Navigate to \'axe DevTools\' tab',
            },
            {
              t: 'Step 2 — Execute Full Page Automated Scan',
              p: 'Click \'Scan ALL of my page\' to analyze entire DOM hierarchy.',
              c: 'Scanning: https://staging.hrms-app.com/leave-request\nInspecting: 142 DOM nodes, 18 form inputs',
            },
            {
              t: 'Step 3 — Inspect Critical & Serious WCAG Violations',
              p: 'Review highlighted target elements, failure summaries, and code snippets.',
              c: 'Violation Found: WCAG 4.1.2 (Name, Role, Value)\nElement: <button class="date-trigger">📅</button>\nFix: Add aria-label="Select leave start date"',
            },
            {
              t: 'Step 4 — Perform manual Tab key navigation pass',
              p: 'Unplug mouse and navigate using Tab, Shift+Tab, Enter, and Spacebar.',
              c: 'Navigation Sequence: [Header] -> [Tab: Reason Input] -> [Tab: Datepicker Button (Focus Ring Visible)] -> [Enter: Modal Opens]',
            },
            {
              t: 'Step 5 — Re-scan page to confirm 100% automated resolution',
              p: 'Re-run axe DevTools scanner to verify zero remaining Critical/Serious issues.',
              c: 'axe Clean Scan: 0 Critical, 0 Serious, 0 Moderate -> PASS',
            },
          ],
        },
        {
          name: 'WAVE',
          sub: 'Visual In-Context Accessibility Evaluation',
          url: 'https://wave.webaim.org',
          desc: 'A free web-based accessibility evaluation tool by WebAIM that overlays visual icons directly on the page showing exactly where each accessibility issue is located, making it especially easy to see problems in context.',
          adv: [
            'Visual in-page icon overlays point directly to offending UI components',
            'Dedicated Contrast analyzer tests foreground/background ratios in real time',
            'Structure view visualizes semantic heading hierarchies (H1 -> H2 -> H3)',
            '100% free with no registration required',
          ],
          lim: [
            'Visual icon badges can temporarily shift dynamic CSS layouts during inspection',
          ],
          steps: [
            {
              t: 'Step 1 — Launch WAVE extension on target view',
              p: 'Activate WAVE toolbar icon on HRMS leave management screen.',
              c: 'WAVE Activated: Overlaying accessibility badges across 34 interface elements',
            },
            {
              t: 'Step 2 — Review color contrast ratios',
              p: 'Check low-contrast helper text against WCAG 4.5:1 requirement for standard text.',
              c: 'Contrast Error: #8A9B95 on #FAF7F2 (Contrast ratio: 3.1:1 - FAIL)\nFixed Color: #52635E on #FAF7F2 (Contrast ratio: 5.4:1 - PASS)',
            },
            {
              t: 'Step 3 — Inspect semantic heading hierarchy',
              p: 'Open the \'Structure\' panel to confirm heading levels aren\'t skipped.',
              c: 'Heading Tree:\n- H1: Request Leave\n  - H2: Employee Information\n  - H2: Dates & Duration\n  - H3: Half-Day Options',
            },
            {
              t: 'Step 4 — Verify ARIA Landmarks and form labels',
              p: 'Ensure all <input>, <select>, and <textarea> elements possess linked <label for> tags.',
              c: 'Check: <label for="leave_type">Leave Type</label> correctly tied to <select id="leave_type">',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'WCAG 2.1 AA Audit & Keyboard Operability',
          body: 'Audit DOM accessibility with axe DevTools and WAVE, verifying complete keyboard and screen reader support.',
          doThis: 'Run axe DevTools automated sweep and perform a mouse-free keyboard navigation audit.',
          code: 'npx @axe-core/cli https://staging.hrms-app.com/leave-request',
        },
      ],
      checklist: ['Achieved 0 Critical/Serious axe DevTools violations', 'Verified visible keyboard focus indicators on all interactive elements', 'Confirmed 4.5:1 minimum text contrast ratio'],
      practice: { title: 'WCAG 2.1 AA accessibility audit', brief: 'Audit form inputs, datepickers, and modal dialogues for complete screen-reader accessibility.' },
      resources: [
        r('tool', 'axe DevTools Browser Extension', 'https://www.deque.com/axe/devtools', 'EN'),
        r('tool', 'WAVE Web Accessibility Evaluation Tool', 'https://wave.webaim.org', 'EN'),
        r('guide', 'W3C Web Content Accessibility Guidelines (WCAG 2.1)', 'https://www.w3.org/TR/WCAG21/', 'EN'),
      ],
    }),

    ch({
      id: 'tt-exploratory-testing',
      kind: 'guide',
      phase: 'Part 6 · Other Testing Types',
      level: 'intermediate',
      title: 'Exploratory Testing',
      minutes: 20,
      durationLabel: 'Chapter 22',
      overviewText:
        'Exploratory testing is simultaneous learning, test design, and test execution — a tester actively explores the application without a predefined script, using their own judgment, curiosity, and growing understanding of the system to hunt for bugs that scripted tests were never written to find.',
      why:
        'Scripted tests only find what they were explicitly written to check. A skilled tester exploring freely — trying unusual input combinations, unexpected navigation paths, or edge cases nobody thought to script — routinely finds real bugs that every other testing type in this manual misses entirely, simply because no one anticipated that specific scenario in advance.',
      when:
        'Continuously, alongside scripted testing rather than instead of it — especially valuable on new features (before enough is known to write good scripts yet), and as a periodic supplement even on mature, heavily-scripted areas of the application.',
      practical: {
        app: 'HRMS Leave Request Form',
        scenario:
          'During a 90-minute exploratory session on the newly built leave request feature, a tester tries submitting the form with the browser\'s back button mid-submission, then resubmitting.',
        pass: 'The bug is fixed, and a new scripted regression test is added specifically for back-button resubmission, so exploratory testing effectively expanded the regression suite\'s coverage.',
        fail: 'Using back-then-resubmit creates two duplicate leave requests for the same dates, silently — no script had ever been written to check this specific navigation pattern, because no one anticipated it during scripted test design.',
      },
      advantages: [
        'Finds real bugs that no scripted test was ever written to catch, since it isn\'t limited by a predefined script',
        'Cheap to start — needs no tooling or setup, only a skilled, curious tester and time',
        'Builds deep, first-hand understanding of the application that improves the quality of future scripted tests too',
        'Particularly effective early on new features, before there\'s enough stability to script against yet',
      ],
      limitations: [
        'Not repeatable or automatable by nature — the same session run twice can turn up different findings',
        'Effectiveness depends heavily on the individual tester\'s skill, domain knowledge, and curiosity',
        'No formal coverage guarantee — there\'s no way to confirm every important area was actually explored',
        'Hard to measure or report on in the same structured way as pass/fail scripted results',
      ],
      tools: [
        {
          name: 'Manual (Unscripted Exploration)',
          sub: 'Time-Boxed Charter & Heuristic Bug Hunting',
          url: 'https://www.agilealliance.org/glossary/exploratory-testing/',
          seeChapter: 5,
          desc: 'Exploratory testing is inherently manual and unscripted by definition (see Chapter 5) — a dedicated tool would defeat the point, since the value comes from a human\'s real-time judgment and curiosity, not a repeatable script.',
          adv: [
            'Freedom to follow intuitive hunches and investigate subtle UI/logic glitches',
            'Zero script maintenance overhead',
            'Uncovers unexpected race conditions, duplicate submissions, and navigation edge cases',
          ],
          lim: [
            'Non-deterministic execution requires diligent session recording for repros',
          ],
          steps: [
            {
              t: 'Step 1 — Define a focused Session Charter',
              p: 'Set a 60–90 minute timebox with a specific exploratory scope.',
              c: 'Charter: Explore edge cases in leave submission workflows with aggressive back/forward navigation and double clicks.\nDuration: 75 Minutes',
            },
            {
              t: 'Step 2 — Apply creative testing heuristics',
              p: 'Test boundary values, rapid input changes, tab switching, and session timeouts.',
              c: 'Heuristics Applied:\n- SFDPOT (Structure, Function, Data, Platform, Operations, Time)\n- Interrupt-driven actions (Back button, Refresh mid-POST, Double Submit)',
            },
            {
              t: 'Step 3 — Log real-time observations and anomalies',
              p: 'Record video or take timestamped notes of unexpected behaviors.',
              c: 'Observation: Clicking Submit -> Back -> Submit creates duplicate record with ID #9081 and #9082 without validation error',
            },
            {
              t: 'Step 4 — File bug report and convert to automated regression',
              p: 'Document reproducible steps and add a scripted Playwright/Cypress test.',
              c: 'Created Jira: BUG-519 (Duplicate leave request on browser back-navigation)\nAdded Automated Test: tests/e2e/leave-duplicate-prevent.spec.ts',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Charter-Based Exploratory Session',
          body: 'Execute time-boxed unscripted exploratory sessions targeting boundary disruptions and navigational race conditions.',
          doThis: 'Conduct a 60-minute time-boxed session using SFDPOT heuristics and file reproducible bug reports.',
          code: '# Session charter notes recorded in QA test log',
        },
      ],
      checklist: ['Defined explicit timebox and scope charter', 'Explored interruption and back-navigation behaviors', 'Logged novel edge-case bugs into automated regression suite'],
      practice: { title: 'Time-boxed exploratory charter', brief: 'Plan and execute a 60-minute unscripted exploratory bug hunt targeting checkout workflows.' },
      resources: [
        r('guide', 'James Bach — Exploratory Testing Dynamics', 'https://www.satisfice.com/exploratory-testing', 'EN'),
        r('guide', 'Elisabeth Hendrickson — Explore It!', 'https://pragprog.com/titles/ehxta/explore-it/', 'EN'),
      ],
    }),

    ch({
      id: 'tt-localization-testing',
      kind: 'guide',
      phase: 'Part 6 · Other Testing Types',
      level: 'intermediate',
      title: 'Localization Testing',
      minutes: 20,
      durationLabel: 'Chapter 23',
      overviewText:
        'Localization testing verifies that an application works correctly when adapted for a specific language, region, or culture — checking not just that text is translated, but that dates, currencies, number formats, text direction, and layout all behave correctly for each target locale.',
      why:
        'Translation alone isn\'t localization — a correctly translated app can still show dates in the wrong format, truncate text that\'s longer in the target language than in English, mishandle currency symbols, or break layout entirely in a right-to-left language. These issues are invisible to anyone testing only in the original language, yet directly affect every user in the target locale.',
      when:
        'As soon as a locale is added or planned, and again whenever UI text changes (since new strings need translation and re-verification) — checked specifically in each supported locale, not assumed to work based on the default-locale testing already done.',
      practical: {
        app: 'HRMS Payslip Page (German locale)',
        scenario:
          'The payslip page, which shows "Net Salary" as a button label, is checked in the German locale where the translated label is significantly longer.',
        pass: 'The button is resized to accommodate longer translated text, and the layout is re-verified across all supported locales to confirm no other label overflows.',
        fail: '"Netto-Gehalt anzeigen" overflows its button and wraps awkwardly onto two lines, overlapping the amount displayed below it.',
      },
      advantages: [
        'Catches real, user-facing localization bugs that reviewing translation files alone would miss entirely',
        'Manual locale switching requires no special tooling, just the application\'s existing locale settings',
        'Surfaces layout bugs (truncation, RTL mirroring) that are highly visible and damaging to trust once shipped',
        'Builds a reusable checklist per locale that scales as more languages are added',
      ],
      limitations: [
        'Manual and time-consuming — scales linearly with the number of supported locales',
        'Requires either a native speaker or a professional translation review to properly validate — machine translation spot-checks aren\'t sufficient on their own',
        'Easy to miss a locale-specific edge case (an unusual date format, an uncommon currency symbol) without a native reviewer\'s eye',
        'Doesn\'t automatically re-verify itself when new strings are added — needs to be repeated on every content change',
      ],
      tools: [
        {
          name: 'Manual Locale Switching',
          sub: 'In-App Locale & RTL Layout Verification',
          url: 'https://developer.mozilla.org/en-US/docs/Mozilla/Localization',
          seeChapter: 5,
          desc: 'The core of localization testing is manually walking through the application (see Chapter 5) with each supported locale selected, since layout, date, and formatting issues only appear with real locale-specific data.',
          adv: [
            'Evaluates exact pixel layout, text overflow, and line-breaking behaviors',
            'Validates date/time formatting (DD/MM/YYYY vs MM/DD/YYYY) and currency symbols',
            'Verifies Right-to-Left (RTL) mirroring for Arabic and Hebrew locales',
          ],
          lim: [
            'Manual regression pass required whenever UI strings or layouts change',
          ],
          steps: [
            {
              t: 'Step 1 — Switch active locale in application settings',
              p: 'Select German (de-DE), Japanese (ja-JP), and Arabic (ar-SA).',
              c: 'Locale Switch: de-DE (German) | Currency: EUR (€) | Date: DD.MM.YYYY',
            },
            {
              t: 'Step 2 — Inspect text expansion & button truncation',
              p: 'Ensure German compound nouns (e.g. Urlaubsantragsformular) do not overflow button boundaries.',
              c: 'Inspected: Button width dynamically expands with flexbox; no CSS overflow: hidden truncation',
            },
            {
              t: 'Step 3 — Validate date, time, and numeric formatting',
              p: 'Check currency separators (e.g. 1.234,56 € vs $1,234.56) and calendar weeks.',
              c: 'Formatted Output: € 4.500,00 | Date: 23.08.2026 -> Verified',
            },
            {
              t: 'Step 4 — Verify Right-to-Left (RTL) layout mirroring',
              p: 'Switch to Arabic and verify navigation menus, sidebars, and icons mirror to dir="rtl".',
              c: 'Check: <html dir="rtl"> correctly flips flex-direction and text-align',
            },
            {
              t: 'Step 5 — Detect untranslated raw i18n keys',
              p: 'Search DOM for missing key fallbacks (e.g. leave.request.submit_button).',
              c: 'Audit: 0 raw string keys detected in rendered HTML -> PASS',
            },
          ],
        },
        {
          name: 'Google Translate (Spot-Check Only)',
          sub: 'Sanity Verification for Translated Strings',
          url: 'https://translate.google.com',
          desc: 'Used only as a rough sanity check on translated strings, not as a translation source — to catch obviously wrong or nonsensical translations before flagging them to an actual translator for a proper review.',
          adv: [
            'Instant spot-checking of unfamiliar languages during QA testing',
            'Detects obviously corrupted encodings or reversed translations',
          ],
          lim: [
            'Cannot replace professional human translation or native domain review',
          ],
          steps: [
            {
              t: 'Step 1 — Paste suspicious UI copy into Google Translate',
              p: 'Check if translated button label reflects expected action context.',
              c: 'Input (DE): \'Urlaub einreichen\' -> Output (EN): \'Submit leave\' (Context matches)',
            },
            {
              t: 'Step 2 — Flag ambiguous translations for native review',
              p: 'Create translation review tickets for native localization specialists.',
              c: 'Ticket: L10N-104: Review German payslip tax deduction phrasing with HR compliance',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Multi-Locale & RTL Validation',
          body: 'Verify text expansion, currency/date internationalization, and Right-to-Left layout mirroring.',
          doThis: 'Audit UI layouts under German (de-DE) for expansion and Arabic (ar-SA) for RTL mirroring.',
          code: 'npx playwright test --grep @l10n',
        },
      ],
      checklist: ['Verified zero text truncation on longest locale strings', 'Confirmed correct currency and date formatting rules', 'Validated RTL layout mirroring for Arabic/Hebrew'],
      practice: { title: 'i18n & l10n compliance checklist', brief: 'Audit multi-currency, date-picker, and layout expansion in an internationalized application.' },
      resources: [
        r('guide', 'MDN — Localization & Internationalization Guide', 'https://developer.mozilla.org/en-US/docs/Mozilla/Localization', 'EN'),
        r('tool', 'Google Translate', 'https://translate.google.com', 'EN'),
      ],
    }),

    ch({
      id: 'tt-recovery-testing',
      kind: 'guide',
      phase: 'Part 6 · Other Testing Types',
      level: 'advanced',
      title: 'Recovery Testing',
      minutes: 25,
      durationLabel: 'Chapter 24',
      overviewText:
        'Recovery testing deliberately induces failure — killing a server process, cutting a database connection, forcing a crash mid-operation — to verify that the application recovers correctly afterward, without data loss or corruption, rather than assuming failures simply won\'t happen.',
      why:
        'Failures happen regardless of how well an application is built — servers restart, networks drop, dependencies go down. What separates a resilient system from a fragile one isn\'t whether failure occurs, but what happens next: does the system recover cleanly with data intact, or does it corrupt data, lose in-progress work, or require manual intervention to bring back online? Recovery testing answers that question deliberately, before a real outage forces the answer on the team.',
      when:
        'Before launch for any system where downtime or data loss would be costly, and periodically afterward — especially after infrastructure changes (new caching layer, new database replication setup) that could change how the system behaves during a failure.',
      practical: {
        app: 'HRMS Leave Request Submission',
        scenario:
          'A tester kills the application server process midway through a leave request submission, right after the database write but before the confirmation response is sent back to the user.',
        pass: 'A unique submission token prevents the duplicate: the resubmission is recognized as the same request and safely ignored, and the user is shown the original confirmation instead.',
        fail: 'The leave request is saved in the database, but because the user never received confirmation, they resubmit — creating a duplicate request, since there was no safeguard against a repeated submission of the same data.',
      },
      advantages: [
        'Verifies real resilience under actual failure conditions, not just assumed resilience based on code review',
        'Directly tests data integrity guarantees (transactions, rollbacks) under the exact conditions they\'re meant to protect against',
        'Surfaces failure scenarios that need automatic recovery (retries, failover) versus ones needing better monitoring/alerting for manual response',
        'Builds real confidence and concrete recovery-time expectations for the team, rather than optimistic assumptions',
      ],
      limitations: [
        'Deliberately destructive — must be run in an isolated staging environment, never against production without extreme care and a maintenance window',
        'Manual approach doesn\'t scale to testing every possible failure combination — prioritization toward the most critical/likely failures is necessary',
        'Some failure modes (e.g. certain network partition types) are genuinely hard to simulate accurately without specialized chaos-engineering tools',
        'A passing recovery test today doesn\'t guarantee the same resilience after future architecture changes — needs periodic re-testing',
      ],
      tools: [
        {
          name: 'Manual Process & Network Interruption',
          sub: 'Forced Process Termination & Database Disconnect',
          url: 'https://en.wikipedia.org/wiki/Fault_tolerance',
          seeChapter: 5,
          desc: 'Recovery testing at a basic level doesn\'t require specialized chaos-engineering tooling (see Chapter 5) — a tester or engineer can manually kill a process, disconnect a network cable, or forcibly stop a database mid-transaction, then observe recovery behavior.',
          adv: [
            'Simulates real unannounced infrastructure outages',
            'Validates database ACID transaction rollbacks under crash conditions',
            'Evaluates client-side retry exponential backoff policies',
          ],
          lim: [
            'Must strictly execute in dedicated staging/sandbox environments',
          ],
          steps: [
            {
              t: 'Step 1 — Identify critical transactional workflows',
              p: 'Select multi-step write operations such as payroll processing or bulk employee import.',
              c: 'Target: POST /api/v1/payroll/process (Multi-table batch transaction)',
            },
            {
              t: 'Step 2 — Trigger transaction and force process kill (SIGKILL)',
              p: 'Execute kill -9 on Node.js / Java worker during active batch insertion.',
              c: 'kill -9 $(pgrep -f "payroll-worker")',
            },
            {
              t: 'Step 3 — Restart worker service and verify automatic recovery',
              p: 'Start service and observe if orchestrator (e.g. systemd/Kubernetes) heals the container.',
              c: 'systemctl restart hrms-worker\nStatus: Active (Running) within 3.2 seconds',
            },
            {
              t: 'Step 4 — Audit database state for partial writes',
              p: 'Verify Postgres transaction rolled back cleanly without orphan records.',
              c: 'SELECT count(*) FROM payroll_ledger WHERE batch_id = \'b_9812\' AND status = \'PARTIAL\';\nResult: 0 rows (Transaction rolled back completely -> PASS)',
            },
            {
              t: 'Step 5 — Test idempotency token on client resubmission',
              p: 'Resubmit failed payroll request and verify duplicate is rejected with cached confirmation.',
              c: 'POST /api/v1/payroll/process (Header: Idempotency-Key: idemp_9812)\nResponse: 200 OK (Replayed original transaction confirmation)',
            },
          ],
        },
        {
          name: 'Chaos Engineering Scripts',
          sub: 'Automated Failure Injection & Latency Simulation',
          url: 'https://principlesofchaos.org',
          desc: 'Lightweight bash/docker scripts that periodically inject random network latency, drop database packets, or restart services to test resilience automatically.',
          adv: [
            'Automates intermittent outage testing',
            'Measures Mean Time to Recovery (MTTR) with objective timers',
          ],
          lim: [
            'Requires careful isolation to prevent cross-service pollution',
          ],
          steps: [
            {
              t: 'Step 1 — Inject packet loss with Toxiproxy or Pumba',
              p: 'Simulate 500ms network latency and 20% packet loss between App and Redis cache.',
              c: 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock gaiaadm/pumba netem --duration 5m delay --time 500 redis_container',
            },
            {
              t: 'Step 2 — Verify application degrades gracefully without crashing',
              p: 'Confirm app falls back to primary DB when cache is slow without throwing 500 errors.',
              c: 'Health Check: 200 OK (Cache bypassed via fallback policy) -> PASS',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Resilience & Database Rollback Verification',
          body: 'Simulate abrupt process terminations and test automatic container healing, transaction rollback, and idempotency guarantees.',
          doThis: 'Trigger simulated process kill during database transaction and verify rollback integrity.',
          code: 'kill -9 $(pgrep -f worker) && npm test -- tests/recovery.spec.ts',
        },
      ],
      checklist: ['Verified 100% database transaction rollback on mid-operation crashes', 'Tested automatic process recovery within SLA threshold', 'Validated idempotency tokens on retried client requests'],
      practice: { title: 'Disaster recovery and idempotency audit', brief: 'Model unexpected system failure during financial transactions and verify data consistency.' },
      resources: [
        r('guide', 'Principles of Chaos Engineering', 'https://principlesofchaos.org', 'EN'),
        r('guide', 'AWS Well-Architected Framework — Reliability Pillar', 'https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html', 'EN'),
      ],
    }),

    ch({
      id: 'tt-black-box-testing',
      kind: 'guide',
      phase: 'Part 7 · By Knowledge',
      level: 'beginner',
      title: 'Black Box Testing',
      minutes: 20,
      durationLabel: 'Chapter 25',
      overviewText:
        'Black box testing evaluates an application purely from the outside — inputs and outputs — without any knowledge of or access to the internal code, logic, or architecture that produces those outputs. The tester acts exactly like a real user or an external system: they can\'t see (and don\'t need to see) what\'s happening underneath.',
      why:
        'Most real users, and most of the testing types elsewhere in this manual (functional, usability, system, acceptance), operate this way by necessity — a customer doesn\'t read the source code before deciding a feature is broken. Black box testing keeps the focus on what actually matters to the end user: does the right input produce the right output, regardless of how messy or elegant the code behind it is.',
      when:
        'Throughout functional, system, and acceptance testing — essentially the default mode for anyone testing from a user\'s perspective rather than a developer\'s. Especially valuable when the tester is independent from the development team, since it avoids any unconscious bias toward "testing what the code does" instead of "testing what the user needs."',
      practical: {
        app: 'HRMS Leave Balance Calculation',
        scenario:
          'A tester checks that submitting a leave request for more days than an employee has remaining is correctly rejected, based only on the stated business rule ("cannot request more leave than available balance") — with no knowledge of how the balance is calculated internally.',
        pass: 'Requesting 3 days against a 5-day balance succeeds; requesting 8 days against the same balance is rejected with a clear error.',
        fail: 'Requesting exactly the remaining balance (5 of 5 days) is incorrectly rejected — an off-by-one boundary bug the black box test catches without ever seeing the code.',
      },
      advantages: [
        'Matches exactly how real users and external systems experience the application',
        'Testers don\'t need programming or architecture knowledge to be effective',
        'Naturally unbiased by implementation details — tests what should happen, not what the code happens to do',
        'Test cases remain valid even if the internal implementation is completely rewritten',
      ],
      limitations: [
        'Can\'t target specific code paths directly — some internal logic branches may never get exercised',
        'Less efficient at finding certain classes of bugs (e.g. a rare internal edge case) that white box testing would catch directly',
        'Test case design can miss scenarios if requirements themselves are incomplete or ambiguous',
        'Root-causing a failure often takes longer, since there\'s no visibility into where in the code it actually broke',
      ],
      tools: [
        {
          name: 'Manual (Specification-Based)',
          sub: 'Requirements-Driven Black Box Validation',
          url: 'https://en.wikipedia.org/wiki/Black-box_testing',
          seeChapter: 5,
          desc: 'Most black box testing starts here (see Chapter 5) — a tester working through the UI or API purely based on requirements and expected behavior, with zero reference to the underlying implementation.',
          adv: [
            '100% focused on business requirements and user personas',
            'Surfaces ambiguous or contradictory specification requirements',
          ],
          lim: [
            'Manual regression execution becomes repetitive without automation',
          ],
          steps: [
            {
              t: 'Step 1 — Extract testable conditions from requirement specs',
              p: 'Define boundary partitions (e.g. 0 days, 1-5 days, 6+ days).',
              c: 'Equivalence Partitioning:\n- Valid: 1 <= request_days <= balance (5)\n- Invalid: request_days > balance (5)\n- Boundary: 0 days, 5 days, 6 days',
            },
            {
              t: 'Step 2 — Execute boundary value test cases',
              p: 'Submit leave requests at each boundary condition via the UI form.',
              c: 'Test Case BB-01: Request 5 days (Expected: Approved -> Actual: Approved - PASS)\nTest Case BB-02: Request 6 days (Expected: 400 Bad Request -> PASS)',
            },
            {
              t: 'Step 3 — Log defects with input-output mismatches',
              p: 'Record precise reproduction payloads without guessing backend causes.',
              c: 'Bug Report: BUG-601: Requesting exactly 5/5 balance displays \'Insufficient Balance\' error',
            },
          ],
        },
        {
          name: 'Selenium WebDriver',
          sub: 'Automated User-Perspective Regression',
          url: 'https://www.selenium.dev',
          seeChapter: 6,
          desc: 'Once black box test cases are defined manually, Selenium automates the same input-and-observe-output approach (see Chapter 6) — driving the UI exactly as a user would, checking outcomes, never touching the backend code.',
          adv: [
            'Automates black box test suites across real browser instances',
            'Tests end-to-end user workflows completely decoupled from backend codebase',
          ],
          lim: [
            'Requires UI selector maintenance if DOM markup changes',
          ],
          steps: [
            {
              t: 'Step 1 — Script black box boundary assertions',
              p: 'Automate form input typing and verify user-facing modal responses.',
              c: 'await page.fill(\'#leave-days\', \'5\');\nawait page.click(\'#submit-btn\');\nawait expect(page.locator(\'.alert-success\')).toBeVisible();',
            },
            {
              t: 'Step 2 — Run in CI pipeline on pull requests',
              p: 'Execute full black box regression suite against staging deployment.',
              c: 'npx playwright test tests/blackbox-leave.spec.ts',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Equivalence Partitioning & Boundary Value Black Box Suite',
          body: 'Construct black box test matrices derived purely from requirement specifications and business rules.',
          doThis: 'Execute equivalence partitioning and boundary value testing across all input forms.',
          code: 'npx playwright test --grep @blackbox',
        },
      ],
      checklist: ['Defined input equivalence classes and boundary values', 'Executed black box tests without implementation bias', 'Automated high-value user paths with Selenium/Playwright'],
      practice: { title: 'Black box boundary value test plan', brief: 'Design an equivalence partitioning and boundary value test plan for user checkout.' },
      resources: [
        r('guide', 'ISTQB — Black Box Testing Techniques', 'https://www.istqb.org', 'EN'),
        r('tool', 'Selenium HQ Documentation', 'https://www.selenium.dev', 'EN'),
      ],
    }),

    ch({
      id: 'tt-white-box-testing',
      kind: 'guide',
      phase: 'Part 7 · By Knowledge',
      level: 'intermediate',
      title: 'White Box Testing',
      minutes: 25,
      durationLabel: 'Chapter 26',
      overviewText:
        'White box testing examines and tests the internal structure, logic, and code paths of an application directly — the tester (usually a developer) has full visibility into the source code and designs tests specifically to exercise particular branches, conditions, and statements within it.',
      why:
        'Some bugs only live inside logic that\'s invisible from the outside — an untested conditional branch, a loop that mishandles one specific edge case, an off-by-one error buried in a calculation. Black box testing can miss these entirely if the right input never happens to be tried; white box testing finds them directly by deliberately targeting every path through the code, and it\'s what makes code coverage a meaningful, measurable metric.',
      when:
        'Continuously during development, primarily by the developers writing the code themselves — unit tests are the most common form of white box testing. It\'s run on every commit via CI, using coverage tools to confirm which parts of the codebase are (and aren\'t) actually being exercised by tests.',
      practical: {
        app: 'HRMS Leave Balance Calculation Function',
        scenario:
          'A coverage report shows the calculateRemainingLeave() function has 80% line coverage, but the branch handling a negative starting balance (a data correction scenario) is never exercised by any test.',
        pass: 'A new unit test specifically targeting the negative-balance branch is added, coverage rises to 96%, and the bug is caught and fixed before it ever reaches a real employee record.',
        fail: 'The untested branch contains a bug — it returns a positive number instead of correctly flagging the account for HR review — invisible until a real data-correction case eventually hits production.',
      },
      advantages: [
        'Directly targets internal logic paths that black box testing can miss entirely',
        'Coverage tools make "how much of the code is actually tested" a concrete, measurable number',
        'Catches edge cases and boundary conditions buried deep inside functions, not just visible at the UI/API surface',
        'Tightly integrated into the development workflow — usually run automatically on every commit',
      ],
      limitations: [
        'Requires source code access and programming knowledge — not something a non-technical tester can typically do',
        'High coverage percentage doesn\'t guarantee correctness — a line can be "covered" without meaningful assertions',
        'Tests are tied to implementation details, so a significant refactor can require rewriting tests even if user-facing behavior didn\'t change',
        'Doesn\'t verify the user-facing experience at all — an internal unit can be 100% covered while the UI is broken',
      ],
      tools: [
        {
          name: 'Istanbul (nyc)',
          sub: 'JavaScript Code & Branch Coverage Engine',
          url: 'https://istanbul.js.org',
          desc: 'A JavaScript code coverage tool that instruments code during test runs and reports exactly which lines, branches, functions, and statements were executed by the test suite — and which were missed.',
          adv: [
            'Industry standard for Node.js and modern frontend frameworks (Jest, Vitest, Mocha)',
            'Provides interactive line-by-line HTML coverage heatmaps',
            'Strict threshold enforcement in CI (e.g. fail if branch coverage < 85%)',
            'Highlights uncovered ternary conditions and catch blocks',
          ],
          lim: [
            'Adds minor instrumentation overhead during test execution',
          ],
          steps: [
            {
              t: 'Step 1 — Run test suite with coverage instrumentation',
              p: 'Execute Jest or Vitest with the --coverage flag enabled.',
              c: 'npx jest --coverage --collectCoverageFrom="src/lib/**/*.ts"',
            },
            {
              t: 'Step 2 — Inspect branch coverage report',
              p: 'Review statement, branch, function, and line coverage percentages.',
              c: 'File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s\nleaveCalculator.ts    |   85.71 |    66.66 |     100 |   85.71 | 24-26 (Negative balance branch)',
            },
            {
              t: 'Step 3 — Write white box unit test for uncovered branch',
              p: 'Add test case supplying negative balance inputs to reach line 24.',
              c: 'test(\'flags HR review when starting balance is negative\', () => {\n  const result = calculateRemainingLeave({ balance: -2, requested: 3 });\n  expect(result.status).toBe(\'NEEDS_HR_REVIEW\');\n});',
            },
            {
              t: 'Step 4 — Enforce CI coverage thresholds in package.json',
              p: 'Fail build if coverage drops below specified quality bar.',
              c: '"jest": {\n  "coverageThreshold": {\n    "global": {\n      "branches": 90,\n      "functions": 95,\n      "lines": 90\n    }\n  }\n}',
            },
          ],
        },
        {
          name: 'Coverage.py',
          sub: 'Python Code Execution & Branch Analyzer',
          url: 'https://coverage.readthedocs.io',
          desc: 'The equivalent coverage tool for Python — measures which lines and branches of code are executed during a test run (typically via PyTest) and produces an HTML or terminal report highlighting what\'s covered.',
          adv: [
            'Seamless integration with PyTest via pytest-cov',
            'Generates visual line-by-line color-coded HTML reports',
            'Tracks conditional branch coverage with --branch flag',
          ],
          lim: [
            'Requires separate Python virtualenv configuration',
          ],
          steps: [
            {
              t: 'Step 1 — Run PyTest with coverage tracking',
              p: 'Execute test suite with branch coverage enabled.',
              c: 'pytest --cov=hrms_payroll --cov-branch --cov-report=html tests/',
            },
            {
              t: 'Step 2 — Open HTML coverage viewer',
              p: 'Inspect colored red lines representing untested exception handlers.',
              c: 'open htmlcov/index.html',
            },
            {
              t: 'Step 3 — Add targeted test case to hit uncovered branch',
              p: 'Verify 100% path coverage achieved across calculation module.',
              c: 'def test_negative_leave_balance():\n    assert calculate_leave(balance=-1, days=2) == Flag.HR_AUDIT',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Code & Branch Coverage Instrumentation',
          body: 'Instrument test suites to measure statement, branch, function, and line coverage metrics.',
          doThis: 'Execute Jest or PyTest with branch coverage and enforce 90%+ thresholds in CI.',
          code: 'npm test -- --coverage --coverageThreshold=\'{"global":{"branches":90}}\'',
        },
      ],
      checklist: ['Instrumented branch coverage reporting in CI/CD', 'Eliminated uncovered conditional execution paths in business logic', 'Enforced automated coverage quality gate'],
      practice: { title: 'White box branch coverage optimization', brief: 'Analyze uncovered execution paths in calculation modules and achieve >90% branch coverage.' },
      resources: [
        r('tool', 'Istanbul Coverage Documentation', 'https://istanbul.js.org', 'EN'),
        r('tool', 'Coverage.py Documentation', 'https://coverage.readthedocs.io', 'EN'),
      ],
    }),

    ch({
      id: 'tt-gray-box-testing',
      kind: 'guide',
      phase: 'Part 7 · By Knowledge',
      level: 'intermediate',
      title: 'Gray Box Testing',
      minutes: 20,
      durationLabel: 'Chapter 27',
      overviewText:
        'Gray box testing sits between black box and white box — the tester has partial knowledge of the internal structure (perhaps database schema, API design, or high-level architecture) without full access to or deep understanding of the complete source code, and uses that partial insight to design smarter, more targeted external tests.',
      why:
        'Pure black box testing can waste time on inputs unlikely to reveal anything, while pure white box testing requires full code access that testers (especially independent QA) often don\'t have or need. Gray box testing gets much of white box testing\'s precision — targeting known trouble spots like specific database constraints or API integration points — while still testing from the outside, the way a real user or consuming system actually would.',
      when:
        'Especially valuable for integration and API testing, where a tester knows the API contract or database schema without needing to read every line of backend implementation. Common when QA has access to design docs, database diagrams, or API specifications but not the full codebase.',
      practical: {
        app: 'HRMS Employee ID Uniqueness',
        scenario:
          'A tester who knows (from the database schema, not the code) that employee_id is a unique constraint deliberately tests submitting two leave requests with a manually crafted duplicate employee_id via the API.',
        pass: 'The second request is correctly rejected with a 409 Conflict, matching the schema-level guarantee the tester knew to check for.',
        fail: 'The API accepts both requests and returns 200 for each — the uniqueness constraint exists in the schema but isn\'t actually being enforced at the application layer before the write, only relied upon (incorrectly) as documentation.',
      },
      advantages: [
        'More efficient than pure black box testing — partial internal knowledge focuses effort on higher-value, more likely-to-fail scenarios',
        'Doesn\'t require full codebase access or deep programming expertise, unlike white box testing',
        'Particularly effective for integration and API testing, where contracts and schemas are naturally partial knowledge',
        'Bridges the gap between developers and independent QA, letting each contribute what they know best',
      ],
      limitations: [
        'Requires access to at least some internal documentation (schema, architecture, API spec) — not purely external like black box testing',
        'Partial knowledge can be outdated or wrong if internal documentation isn\'t kept in sync with the actual implementation',
        'Not as targeted as full white box testing, since deep code paths are still invisible',
        'Effectiveness depends on how good and current the available partial knowledge actually is',
      ],
      tools: [
        {
          name: 'Manual (Architecture-Guided)',
          sub: 'Schema & Contract-Driven Gray Box Testing',
          url: 'https://en.wikipedia.org/wiki/Gray_box_testing',
          seeChapter: 5,
          desc: 'A tester with partial system knowledge (e.g. \'this field maps to a database column with a unique constraint\') designs test cases (see Chapter 5) that specifically target known internal constraints from the outside, without needing to read backend code.',
          adv: [
            'Focuses test effort on known architectural weak points and data boundaries',
            'Targets foreign key relationships and schema constraints directly',
          ],
          lim: [
            'Requires reliable, up-to-date architectural diagrams or OpenAPI specs',
          ],
          steps: [
            {
              t: 'Step 1 — Review database ERD and OpenAPI schemas',
              p: 'Identify constraints: unique indexes, enum values, nullable columns, foreign keys.',
              c: 'Schema Insight: table \'leave_applications\' has UNIQUE(employee_id, start_date)',
            },
            {
              t: 'Step 2 — Design targeted boundary injection requests',
              p: 'Craft requests specifically designed to challenge the schema constraints from the client UI.',
              c: 'Test Scenario: Submit two overlapping leave requests for Employee #104 on 2026-09-01',
            },
            {
              t: 'Step 3 — Evaluate app layer validation vs DB crashes',
              p: 'Confirm app returns HTTP 409 Conflict rather than an unhandled 500 Postgres error.',
              c: 'Response: HTTP 409 Conflict: {"error": "Leave request already exists for specified date range"} -> PASS',
            },
          ],
        },
        {
          name: 'Postman',
          sub: 'Schema-Informed API Boundary Testing',
          url: 'https://www.postman.com',
          seeChapter: 2,
          desc: 'Used with knowledge of the underlying API contract or database schema (see Chapter 2) to construct requests specifically designed to probe known internal boundaries from outside the system.',
          adv: [
            'Allows crafting precise HTTP headers, payloads, and parameter types',
            'Validates responses against OpenAPI schema definitions automatically',
          ],
          lim: [
            'Requires API collection maintenance when schemas change',
          ],
          steps: [
            {
              t: 'Step 1 — Import OpenAPI 3.0 specification into Postman',
              p: 'Load API contract to automatically generate schema validation tests.',
              c: 'Postman: Imported hrms-api-v1.yaml -> 42 endpoints with schema contracts',
            },
            {
              t: 'Step 2 — Send edge-case payloads informed by DB column types',
              p: 'Test varchar(50) limits with 51-character string to ensure proper 422 Unprocessable Entity.',
              c: 'POST /api/v1/employees (Payload: { "name": "A".repeat(51) }) -> Expected: 422 Unprocessable Entity',
            },
            {
              t: 'Step 3 — Assert schema integrity and status codes',
              p: 'Verify backend gracefully validates before reaching database engine.',
              c: 'pm.test("Status code is 422", () => pm.response.to.have.status(422));',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Database Schema & API Contract Injections',
          body: 'Design tests probing known schema constraints, foreign key cascades, and OpenAPI payload boundaries.',
          doThis: 'Execute contract boundary tests in Postman informed by internal database ER diagrams.',
          code: 'newman run postman_graybox_collection.json -e staging_env.json',
        },
      ],
      checklist: ['Mapped test cases to schema constraints and unique indexes', 'Validated graceful application-layer error handling for DB violations', 'Tested API contracts with boundary-violating payloads'],
      practice: { title: 'Gray box API constraint test plan', brief: 'Design an API test suite targeting database uniqueness and foreign key integrity constraints.' },
      resources: [
        r('guide', 'Postman — Contract Testing Best Practices', 'https://learning.postman.com', 'EN'),
        r('guide', 'OWASP — Testing for Schema Validation', 'https://owasp.org', 'EN'),
      ],
    }),

    ch({
      id: 'tt-adhoc-testing',
      kind: 'guide',
      phase: 'Part 7 · By Knowledge',
      level: 'beginner',
      title: 'Ad-hoc Testing',
      minutes: 15,
      durationLabel: 'Chapter 28',
      overviewText:
        'Ad-hoc testing is completely informal, unplanned testing — no charter, no documentation, no predefined scope — where a tester simply uses the application in whatever way occurs to them in the moment, specifically to catch bugs that any structured approach might never think to look for.',
      why:
        'Even exploratory testing (Chapter 22) has a loose charter and session structure. Ad-hoc testing has none — and that total lack of structure is precisely its value: a tester (or anyone else) poking around with zero plan sometimes stumbles onto exactly the kind of bizarre, unanticipated bug that no amount of careful planning would have led anyone to script or even charter a session around.',
      when:
        'Informally, whenever there\'s spare time near a release, or when onboarding a new tester who hasn\'t yet learned "the right way" to use the app (their naive, uninformed usage often finds real bugs precisely because they don\'t know what they\'re "supposed" to do). Never relied upon as the only testing strategy — it\'s a cheap, opportunistic supplement to structured testing, not a replacement for it.',
      practical: {
        app: 'HRMS Login Page',
        scenario:
          'A new team member, unfamiliar with the "intended" login flow, tries pasting an email address with trailing whitespace copied from an email signature.',
        pass: 'The fix (trimming whitespace before comparison) ships, and the specific scenario is added as a proper regression test so ad-hoc luck becomes permanent, repeatable coverage.',
        fail: 'Login fails silently with no error message — the backend does an exact string match on the email and never trims whitespace, a bug no scripted test had considered because no one had thought to test a copy-pasted email with trailing spaces.',
      },
      advantages: [
        'Extremely cheap — needs no planning, documentation, or tooling at all',
        'Can surface truly unanticipated bugs precisely because there\'s no plan constraining where the tester looks',
        'New, uninformed testers are often especially effective at this, since they don\'t yet know the "intended" way to use the app',
        'Zero setup cost makes it easy to slot into any spare moment before a release',
      ],
      limitations: [
        'Completely unrepeatable and undocumented — a bug found ad-hoc may be hard to reproduce reliably afterward',
        'No coverage guarantee whatsoever — pure luck plays a real role in what gets found',
        'Hard to justify as dedicated time on a schedule, since there\'s no way to predict or measure its output in advance',
        'Should never be the primary or only testing strategy — it\'s a supplement, not a foundation',
      ],
      tools: [
        {
          name: 'Manual (Unstructured Exploration)',
          sub: 'Spontaneous Monkey & Intuition-Driven Testing',
          url: 'https://en.wikipedia.org/wiki/Ad_hoc_testing',
          seeChapter: 5,
          desc: 'Ad-hoc testing is manual by definition (see Chapter 5), and deliberately unstructured — even a loose charter would make it exploratory testing instead. The tool here is simply a person, curiosity, and no plan.',
          adv: [
            'Zero overhead — start immediately in any spare 10-minute window',
            'Mimics messy, non-linear end-user behaviors (copy-pasting messy text, accidental double clicks)',
          ],
          lim: [
            'Bug reproducibility depends on tester memory unless screen recording was active',
          ],
          steps: [
            {
              t: 'Step 1 — Launch application with zero predefined charter',
              p: 'Navigate freely without following standard happy paths.',
              c: 'Action: Open HRMS login -> Paste formatted email \' john.doe@company.com \' with leading and trailing spaces',
            },
            {
              t: 'Step 2 — Observe UI state reactions',
              p: 'Watch for silent submission failures, unhandled exceptions, or broken button states.',
              c: 'Observed Bug: Clicking \'Sign In\' shows generic \'Invalid credentials\' error instead of trimming whitespace',
            },
            {
              t: 'Step 3 — Reconstruct reproducible step sequence',
              p: 'Verify exact steps needed to trigger the glitch again.',
              c: 'Reproduction Steps:\n1. Open /login\n2. Paste \' test@example.com \'\n3. Enter valid password\n4. Observe auth failure',
            },
            {
              t: 'Step 4 — Convert discovery into automated regression test',
              p: 'Ensure backend trims input sanitizeEmail(input.trim()) and add automated test.',
              c: 'Added Test: expect(login(\' user@domain.com \', \'pass123\')).resolves.toBe(true);',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Unstructured Opportunistic Bug Hunting',
          body: 'Probe unexpected edge cases opportunistically and convert sporadic findings into permanent regression suites.',
          doThis: 'Perform spontaneous ad-hoc testing sessions and capture reproduction steps for edge-case anomalies.',
          code: '# Convert finding into automated regression in tests/e2e/regression.spec.ts',
        },
      ],
      checklist: ['Tested irregular real-world user inputs (whitespace, rapid clicks, aborts)', 'Successfully reproduced observed anomalies', 'Added automated regression tests for confirmed defects'],
      practice: { title: 'Ad-hoc bug reproduction to regression workflow', brief: 'Convert an unstructured ad-hoc bug discovery into a reproducible automated test script.' },
      resources: [
        r('guide', 'Guru99 — Ad-hoc Testing Guide', 'https://www.guru99.com/adhoc-testing.html', 'EN'),
        r('guide', 'Ministry of Testing — Unstructured QA Insights', 'https://www.ministryoftesting.com', 'EN'),
      ],
    }),

    ch({
      id: 'tt-alpha-testing',
      kind: 'guide',
      phase: 'Part 8 · Release & Quality',
      level: 'intermediate',
      title: 'Alpha Testing',
      minutes: 20,
      durationLabel: 'Chapter 29',
      overviewText:
        'Alpha testing is testing performed by internal staff — typically a QA team or select employees, not real external customers — on a version of the application that\'s feature-complete or near-complete, conducted in an environment that closely resembles production, before anyone outside the organization sees it.',
      why:
        'By the time a build is ready for alpha testing, it\'s meant to behave like the real, finished product — this is the last major internal checkpoint before real customers get involved. Alpha testing catches the kind of issues that only show up when the whole application is used end-to-end, holistically, rather than one feature or one test type at a time — precisely because it\'s the first point where everything comes together in something resembling its final form.',
      when:
        'After individual features have passed their own functional, integration, and system testing — as the structured internal bridge between "development is finished" and "let real users touch it" (beta testing, Chapter 30).',
      practical: {
        app: 'HRMS Full Onboarding Flow',
        scenario:
          'Before the HRMS is offered to any pilot customer, three internal employees from outside the dev team are asked to fully onboard a fictional new hire end-to-end — from account creation through first payslip.',
        pass: 'The bug is fixed before any real customer or employee ever encounters it, and the workflow order issue is documented for future UX review.',
        fail: 'Two of three testers get stuck at the same step — the "assign manager" field silently fails to save if left until last, with no error shown, only discovered because a full realistic workflow was followed rather than testing that field in isolation.',
      },
      advantages: [
        'Catches holistic, end-to-end issues that isolated feature-level testing structurally can\'t see',
        'Uses people already inside the organization, so it\'s fast to organize and doesn\'t require external recruitment',
        'Happens in a controlled environment, so problems are found and fixed before any real customer is affected',
        'Serves as a genuine go/no-go checkpoint before committing to a real beta program',
      ],
      limitations: [
        'Internal staff are not truly representative of real customers — they know too much about the product and its intended use',
        'Limited diversity of real-world hardware, network conditions, and usage patterns compared to actual external users',
        'Can create a false sense of confidence if internal testers unconsciously avoid the "wrong" way of using the app',
        'Doesn\'t replace beta testing\'s exposure to genuinely unpredictable real-world usage',
      ],
      tools: [
        {
          name: 'Manual (Holistic Internal Verification)',
          sub: 'End-to-End Persona-Driven Alpha Validation',
          url: 'https://en.wikipedia.org/wiki/Software_testing#Alpha_testing',
          seeChapter: 5,
          desc: 'Alpha testing is inherently manual and holistic (see Chapter 5) — internal staff use the near-final application the way a real customer eventually would, across full end-to-end workflows rather than isolated test cases.',
          adv: [
            'Discovers cross-module workflow friction and missing user transitions',
            'Fast internal coordination without non-disclosure agreement overhead',
          ],
          lim: [
            'Testers naturally suffer from confirmation bias toward known happy paths',
          ],
          steps: [
            {
              t: 'Step 1 — Deploy feature-complete release candidate build',
              p: 'Stage RC1 build in dedicated staging environment mirroring production hardware and configs.',
              c: 'Deployment Target: https://staging-rc1.hrms-company.internal\nBuild Hash: rc-1.4.0-rev8912 (Feature Freeze Applied)',
            },
            {
              t: 'Step 2 — Distribute end-to-end scenario briefs to internal staff',
              p: 'Assign realistic persona briefs (e.g. \'Onboard 5 contractors across 2 departments\').',
              c: 'Scenario Sheet: \'You are an HR manager setting up payroll for new engineering hires.\'',
            },
            {
              t: 'Step 3 — Log blocker and friction defects into triage board',
              p: 'Record blocker issues that prevent workflow progression.',
              c: 'Issue ALPHA-102: Saving onboarding form with empty manager dropdown silently fails.',
            },
            {
              t: 'Step 4 — Execute Go / No-Go signoff audit',
              p: 'Audit unresolved Sev-1 and Sev-2 defects before approving public beta rollout.',
              c: 'Signoff Gate: 0 Sev-1 Blocker / 0 Sev-2 Critical -> APPROVED FOR BETA',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Internal Holistic Scenario Walkthroughs',
          body: 'Conduct structured alpha walkthroughs across cross-functional internal stakeholders with realistic seed data.',
          doThis: 'Execute full end-to-end business workflows and document friction points on internal triage board.',
          code: 'npm run test:e2e:staging-rc',
        },
      ],
      checklist: ['Verified 0 blocker defects across core business journeys', 'Conducted cross-departmental testing with non-engineering staff', 'Achieved official Go / No-Go signoff for public beta'],
      practice: { title: 'Alpha test plan & persona charter', brief: 'Create an internal alpha test plan covering 5 multi-step customer workflows.' },
      resources: [
        r('guide', 'Atlassian — Alpha vs Beta Testing Strategy', 'https://www.atlassian.com', 'EN'),
        r('guide', 'ProductPlan — Managing Alpha Programs', 'https://www.productplan.com', 'EN'),
      ],
    }),

    ch({
      id: 'tt-beta-testing',
      kind: 'guide',
      phase: 'Part 8 · Release & Quality',
      level: 'intermediate',
      title: 'Beta Testing',
      minutes: 25,
      durationLabel: 'Chapter 30',
      overviewText:
        'Beta testing releases a near-final version of the application to a limited group of real, external users — actual customers or a selected pilot group — who use it in their own real-world environment, with their own real data and workflows, before general release.',
      why:
        'No amount of internal testing, however thorough, fully replicates real customers using real data on their own devices, networks, and workflows, with their own (sometimes unexpected) priorities and habits. Beta testing is the first genuine exposure to that unpredictability, and it surfaces feedback on both bugs and overall product fit that internal teams — too close to the product to see it fresh — are structurally unlikely to find themselves.',
      when:
        'After alpha testing confirms the build is stable and feature-complete, and before general/public release — run for a defined period with a defined group of real users, specifically to gather both bug reports and genuine product feedback ahead of a wider launch.',
      practical: {
        app: 'HRMS Payroll Module (Pilot Company)',
        scenario:
          'Before general release, the HRMS payroll module is piloted with one real client company (40 employees) for a full pay cycle.',
        pass: 'A fallback in-app viewer is added for low-storage conditions, fixing a real-world constraint no internal alpha test was ever likely to reproduce.',
        fail: 'Several employees report that payslip PDFs fail to download on older Android devices with limited storage — an issue never surfaced internally, since every internal test device had ample free storage.',
      },
      advantages: [
        'Exposes the application to genuinely diverse real-world devices, networks, and usage patterns no internal test can fully replicate',
        'Surfaces product-fit feedback ("this feature is confusing" or "I actually needed X"), not just bug reports',
        'Both platforms provide automatic crash reporting, removing the burden of manual bug capture from testers',
        'Staged rollout (especially Play Console\'s tracks) lets confidence build gradually before a full public release',
      ],
      limitations: [
        'Real users report bugs inconsistently — some issues go unreported unless a user is specifically motivated to file one',
        'Beta testers, even real users, are self-selected and may not represent the full eventual user base',
        'Slower feedback loop than internal testing — waiting on real usage takes real time, not an on-demand test run',
        'Managing a beta program (recruiting, communicating, triaging feedback) is a real ongoing operational cost, not just a technical one',
      ],
      tools: [
        {
          name: 'TestFlight',
          sub: 'Apple iOS Beta Distribution & Feedback Engine',
          url: 'https://developer.apple.com/testflight',
          desc: 'Apple\'s official beta distribution platform for iOS apps — lets a limited group of real external testers install a pre-release build directly, and routes their crash reports and feedback back to the development team automatically.',
          adv: [
            'Distribute pre-release builds to up to 10,000 external testers via public link',
            'Automated native crash log capturing and symbolication via App Store Connect',
            'Testers can submit annotated screenshots and feedback directly from iOS',
            'Multiple build version grouping with expiring 90-day test windows',
          ],
          lim: [
            'Limited to iOS/iPadOS/macOS Apple ecosystem',
            'Requires Apple Developer Program enrollment ($99/year)',
          ],
          steps: [
            {
              t: 'Step 1 — Archive and upload iOS IPA build to App Store Connect',
              p: 'Build release archive and upload via Xcode Organizer or Fastlane.',
              c: 'fastlane beta --env production (Uploads archive to TestFlight track)',
            },
            {
              t: 'Step 2 — Configure External Beta Testing group',
              p: 'Invite pilot corporate customers via email and specify \'What to Test\' release notes.',
              c: 'TestFlight Group: \'HRMS Beta Pilot Cohort A\' (50 pilot users invited)',
            },
            {
              t: 'Step 3 — Monitor crashes and feedback reports',
              p: 'Review incoming stack traces and user screenshots in App Store Connect.',
              c: 'Crash Log: EXC_BAD_ACCESS in PDFRenderer.swift (Low memory on iPhone SE 2020)',
            },
            {
              t: 'Step 4 — Push patched update directly to beta cohort',
              p: 'Deploy incremental build 1.4.0 (Build 12) with PDF streaming fix.',
              c: 'Fastlane: Published 1.4.0 (12) -> Notification pushed to all TestFlight testers',
            },
          ],
        },
        {
          name: 'Google Play Console',
          sub: 'Android Internal, Closed & Open Staged Tracks',
          url: 'https://play.google.com/console',
          desc: 'Google\'s equivalent for Android — offers staged testing tracks (internal, closed, open) that progressively widen the real-user testing pool before a full production release.',
          adv: [
            'Automated Pre-Launch Reports running on real Firebase Test Lab device matrix',
            'Tiered release tracks: Internal (quick QA), Closed (pilot email list), Open (public opt-in)',
            'Real-time ANR (Application Not Responding) and crash analytics in Android Vitals',
          ],
          lim: [
            'Google Play review process applies to closed/open tracks',
          ],
          steps: [
            {
              t: 'Step 1 — Upload Android App Bundle (AAB) to Closed Testing Track',
              p: 'Submit bundle to targeted beta track via Play Console or Gradle.',
              c: './gradlew bundleRelease && fastlane supply --track closed_beta',
            },
            {
              t: 'Step 2 — Review Pre-Launch Report diagnostics',
              p: 'Inspect automated test runs across 15 physical Android OEM devices.',
              c: 'Pre-Launch Result: 1 ANR caught on Android 10 (Storage permissions deprecated)',
            },
            {
              t: 'Step 3 — Promote build to staged production rollout',
              p: 'Begin with 10% rollout, expanding to 100% as stability vitals remain clean.',
              c: 'Release: 1.4.0 Rollout -> 10% -> 25% -> 50% -> 100% Production',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Staged Beta Release Distribution & Telemetry Monitoring',
          body: 'Deploy release candidates to closed external cohorts and collect crash diagnostics and telemetry.',
          doThis: 'Distribute builds via TestFlight or Google Play Console and monitor crash-free sessions percentage (>99.5%).',
          code: 'fastlane supply --track closed_beta --rollout 0.20',
        },
      ],
      checklist: ['Configured feedback channels and automated crash reporting', 'Monitored crash-free rate (>99.5% goal)', 'Synthesized usability and performance feedback into sprint backlog'],
      practice: { title: 'Beta cohort rollout strategy', brief: 'Design a 3-tier staged beta rollout for iOS and Android mobile clients.' },
      resources: [
        r('tool', 'Apple TestFlight Guide', 'https://developer.apple.com/testflight', 'EN'),
        r('tool', 'Google Play Console Testing Tracks', 'https://play.google.com/console', 'EN'),
      ],
    }),

    ch({
      id: 'tt-retesting',
      kind: 'guide',
      phase: 'Part 8 · Release & Quality',
      level: 'beginner',
      title: 'Retesting (Confirmation Testing)',
      minutes: 15,
      durationLabel: 'Chapter 31',
      overviewText:
        'Retesting — also called confirmation testing — re-runs the exact test case that originally found a specific bug, after a fix has been applied, to confirm that specific bug is actually resolved. It\'s distinct from regression testing (Chapter 10): retesting checks only the one thing that was reported broken, not the surrounding application.',
      why:
        'A fix that looks correct in code review can still fail to actually resolve the reported issue — the wrong root cause was targeted, the fix was incomplete, or it only worked for some of the originally reported scenarios. Without retesting, a bug can be marked "fixed" and closed based on developer confidence alone, only for the exact same reported behavior to resurface in front of a user.',
      when:
        'Every time a bug fix is submitted for verification — before the associated ticket is closed, and always alongside (not instead of) a related sanity or regression check of nearby functionality.',
      practical: {
        app: 'HRMS Duplicate Leave Request Bug',
        scenario:
          'A previously reported bug — submitting a leave request twice via double-click created two duplicate entries — is fixed and sent back for verification.',
        pass: 'Retesting the exact same steps on both Chrome and Firefox confirms only a single leave request is created in either case, and the ticket is closed with confidence.',
        fail: 'Retesting the exact original repro (double-clicking Submit) still creates a duplicate on Firefox, even though the fix was verified as working on Chrome — the fix only addressed one browser\'s event timing.',
      },
      advantages: [
        'Directly confirms the specific reported problem is actually resolved, not just assumed fixed based on the code change',
        'Very fast and targeted — reruns one specific case, not a broader suite',
        'Prevents prematurely closed bugs from silently resurfacing in front of real users',
        'Catches partial fixes that resolve only some of several originally reported variations',
      ],
      limitations: [
        'Narrow by design — confirms only the specific reported bug, says nothing about surrounding functionality (that\'s what sanity/regression testing is for)',
        'Relies on the original bug report having clear, accurate, reproducible steps to retest against',
        'No formal automation — typically manual, since it\'s tied to one specific historical report each time',
        'Easy to skip under time pressure, which is exactly when a fix is most likely to be incomplete',
      ],
      tools: [
        {
          name: 'Manual (Exact Repro Confirmation)',
          sub: 'Defect Verification & Closure Protocol',
          url: 'https://en.wikipedia.org/wiki/Software_testing#Retesting',
          seeChapter: 5,
          desc: 'Retesting is inherently manual and specific (see Chapter 5): a tester reproduces the exact original steps that triggered the bug, using the exact original data and conditions where possible, to directly confirm the fix.',
          adv: [
            'Definitively verifies bug resolution against original reported steps',
            'Validates across multiple reported platform variations (Chrome, Firefox, Safari)',
          ],
          lim: [
            'Does not detect secondary side-effects or regressions in neighboring components',
          ],
          steps: [
            {
              t: 'Step 1 — Open resolved defect ticket and read reproduction steps',
              p: 'Verify exact test preconditions, test data, and user environment.',
              c: 'Ticket: BUG-404: Rapid double-click on \'Apply Leave\' inserts duplicate database row.',
            },
            {
              t: 'Step 2 — Execute exact reproduction on patched build',
              p: 'Attempt rapid double-clicking on submit button across multiple browsers.',
              c: 'Action: Double click \'Apply Leave\' (Delay: 40ms between clicks)\nResult: Button disables on first click; only 1 request sent.',
            },
            {
              t: 'Step 3 — Verify across reported cross-browser variations',
              p: 'Retest on Chrome 128, Firefox 129, and Safari 17.',
              c: 'Chrome: PASS (1 record)\nFirefox: PASS (1 record)\nSafari: PASS (1 record)',
            },
            {
              t: 'Step 4 — Update ticket status to Verified / Closed',
              p: 'Attach screen recording proof and close ticket.',
              c: 'Status: VERIFIED FIXED -> Closed on Build v1.4.0-rc2',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Defect Verification & Closure Protocol',
          body: 'Re-run exact original defect reproduction scripts against patched staging builds.',
          doThis: 'Verify resolved bug tickets across all reported browser and OS combinations.',
          code: 'npm run test -- tests/retest/bug-404.spec.ts',
        },
      ],
      checklist: ['Retested exact historical reproduction sequence', 'Verified across all reported platform/browser variations', 'Attached video proof to defect tracker before marking closed'],
      practice: { title: 'Bug retesting & signoff checklist', brief: 'Document verification steps and cross-browser matrices for high-severity defect resolution.' },
      resources: [
        r('guide', 'Ministry of Testing — Retesting vs Regression Testing', 'https://www.ministryoftesting.com', 'EN'),
        r('guide', 'ISTQB — Confirmation Testing Guidelines', 'https://www.istqb.org', 'EN'),
      ],
    }),

    ch({
      id: 'tt-mutation-testing',
      kind: 'guide',
      phase: 'Part 8 · Release & Quality',
      level: 'advanced',
      title: 'Mutation Testing',
      minutes: 30,
      durationLabel: 'Chapter 32',
      overviewText:
        'Mutation testing evaluates the quality of an existing test suite itself — not the application — by deliberately introducing small, artificial bugs ("mutants") into the source code, one at a time, and checking whether the existing tests actually catch each one. A test suite that fails to notice a deliberately broken line has a real gap in its coverage, even if its coverage percentage looks high.',
      why:
        'Code coverage (Chapter 26) only measures whether a line was executed during testing — not whether the test actually checks anything meaningful about it. A test can run a line of code and still pass even if that line is subtly wrong, simply because nothing in the test asserts on the right thing. Mutation testing directly exposes that gap: a genuinely strong test suite should kill (catch) nearly every artificially introduced mutant; a weak one lets many "survive" undetected.',
      when:
        'Periodically on critical, high-value parts of the codebase (business-critical logic, financial calculations, security-sensitive code) — not typically run on the entire codebase on every commit, since it\'s computationally expensive. Most valuable once basic code coverage is already reasonably high and the team wants to know whether that coverage is actually meaningful.',
      practical: {
        app: 'HRMS Leave Balance Deduction Logic',
        scenario:
          'Mutation testing is run specifically against the deductLeaveBalance() function, which already has 90% line coverage.',
        pass: 'A new test asserting the exact-balance boundary case is added; re-running Stryker confirms that specific mutant is now killed, and the mutation score improves.',
        fail: 'Stryker flips a <= to < in the balance-check condition, and every existing test still passes — revealing that no test actually checks the exact boundary case (requesting leave equal to the remaining balance), despite that line technically being "covered."',
      },
      advantages: [
        'Directly measures test suite quality, not just code coverage quantity — a much stronger signal than coverage percentage alone',
        'Surfaces specific, concrete gaps ("this exact kind of bug would slip through") rather than a vague sense that testing could be better',
        'Particularly valuable for critical logic (financial calculations, security checks) where a silent gap is genuinely costly',
        'Improvements are directly actionable — each surviving mutant points to exactly one missing assertion to write',
      ],
      limitations: [
        'Computationally expensive — reruns the full test suite once per mutant, so it doesn\'t scale to running on every commit across an entire codebase',
        'Best targeted at specific critical modules rather than applied broadly, due to that runtime cost',
        'Some surviving mutants are genuinely equivalent (functionally identical to the original code) and can\'t actually be killed — these need to be manually identified and excluded, adding overhead',
        'Requires an existing, reasonably mature test suite to be worth running at all — mutation testing on an untested codebase just reports that everything survives, which isn\'t a useful finding on its own',
      ],
      tools: [
        {
          name: 'Stryker Mutator',
          sub: 'Automated Mutation Testing Engine for JS/TS, .NET & Scala',
          url: 'https://stryker-mutator.io',
          desc: 'An open-source mutation testing framework (supporting JavaScript/TypeScript, C#, and other languages) that automatically generates mutants — small code changes like flipping a > to >=, or changing true to false — reruns the existing test suite against each one, and reports which mutants were killed versus survived.',
          adv: [
            'Supports modern frameworks (Jest, Vitest, Mocha, Jasmine, karma)',
            'Provides an interactive HTML dashboard showing surviving mutants line-by-line',
            'Calculates objective Mutation Score % to evaluate test suite rigor',
            'Built-in incremental analysis and concurrency to speed up mutation runs',
          ],
          lim: [
            'High compute duration when executing across thousands of mutants',
          ],
          steps: [
            {
              t: 'Step 1 — Install Stryker CLI and test runner plugin',
              p: 'Add Stryker dependencies to your Node project.',
              c: 'npm install --save-dev @stryker-mutator/core @stryker-mutator/jest-runner',
            },
            {
              t: 'Step 2 — Configure stryker.config.json for targeted modules',
              p: 'Target high-criticality modules (e.g. payroll and leave calculation logic).',
              c: '{\n  "mutate": ["src/lib/payrollCalculator.ts"],\n  "testRunner": "jest",\n  "reporters": ["html", "clear-text", "progress"],\n  "thresholds": { "high": 80, "low": 60, "break": 50 }\n}',
            },
            {
              t: 'Step 3 — Run Stryker mutation suite',
              p: 'Execute mutation analysis and observe mutation score metrics.',
              c: 'npx stryker run\nMutation score: 72.41% (21 killed, 8 survived, 0 timeout)',
            },
            {
              t: 'Step 4 — Inspect surviving mutant and add missing assertion',
              p: 'Check mutant where operator was flipped and add missing unit test assertion.',
              c: 'Surviving Mutant #4: line 18: balance <= 0 mutated to balance < 0\nFix: Added test expect(deductLeave(0, 1)).toThrow(\'Zero balance\');\nRe-run: Mutation score increased to 100% (All mutants killed)!',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Automated Mutant Generation & Mutation Score Analysis',
          body: 'Evaluate assertion effectiveness by running Stryker Mutator against core financial and calculation algorithms.',
          doThis: 'Execute Stryker on critical calculation packages and achieve >80% mutation score.',
          code: 'npx stryker run --mutate "src/lib/calculations/**/*.ts"',
        },
      ],
      checklist: ['Configured Stryker for business-critical algorithms', 'Eliminated surviving mutants by adding precise boundary assertions', 'Achieved >80% mutation score on audited modules'],
      practice: { title: 'Mutation test audit & mutant elimination', brief: 'Run Stryker on a financial calculation function and eliminate all surviving mutants.' },
      resources: [
        r('tool', 'Stryker Mutator Official Site', 'https://stryker-mutator.io', 'EN'),
        r('guide', 'Mutation Testing Best Practices', 'https://martinfowler.com/bliki/MutationTesting.html', 'EN'),
      ],
    }),

    ch({
      id: 'tt-ab-testing',
      kind: 'guide',
      phase: 'Part 9 · Modern Engineering & Integrations',
      level: 'intermediate',
      title: 'A/B Testing',
      minutes: 20,
      durationLabel: 'Chapter 33',
      overviewText:
        'A/B testing compares two (or more) versions of a feature — shown to different segments of real users simultaneously — to measure which version actually performs better against a specific, predefined metric (conversion rate, engagement, completion rate), rather than deciding through opinion or internal debate.',
      why:
        'Teams often disagree about which of two designs, copy choices, or flows is "better," and that disagreement is frequently unresolvable through discussion alone — different people have genuinely different intuitions. A/B testing replaces that debate with real evidence: actual user behavior, measured against a specific metric, decides the outcome. It also catches cases where a change that feels like an improvement to the team actually performs worse with real users.',
      when:
        'When there\'s a genuine, specific decision to make between two or more concrete alternatives, and enough traffic/users to reach a statistically meaningful result in a reasonable timeframe. Not useful for low-traffic features or purely subjective creative decisions with no clear success metric to measure against.',
      practical: {
        app: 'HRMS Leave Request Form Length',
        scenario:
          'The team hypothesizes that removing the optional "Additional Comments" field from the leave request form will increase completion rate, but disagrees on whether it\'s worth the loss of context for approvers.',
        pass: 'The shorter form variant shows a statistically significant 9% increase in completion rate over two weeks, with no measurable increase in approval-stage back-and-forth — settling the debate with evidence rather than opinion.',
        fail: 'Teams spend 3 weeks debating in meeting rooms without data, while completion rates drop on unoptimized legacy forms.',
      },
      advantages: [
        'Replaces subjective opinion with real, measured user behavior on a specific metric',
        'Free, self-hostable, and integrates with feature-flagging, so variants can be toggled without a redeploy',
        'Statistical significance reporting prevents decisions based on noise or too-small samples',
        'Builds an organizational record of what\'s actually been tried and what the real outcome was',
      ],
      limitations: [
        'Requires meaningful traffic/user volume to reach significance in a reasonable time',
        'Only measures the specific metric chosen — can miss secondary qualitative impacts',
        'Running many simultaneous experiments on overlapping segments can create interaction effects',
        'Requires real discipline to wait for statistical significance rather than reacting prematurely',
      ],
      tools: [
        {
          name: 'GrowthBook',
          sub: 'Open-Source Feature Flagging & Experimentation Platform',
          url: 'https://growthbook.io',
          desc: 'An open-source feature flagging and A/B testing platform — lets a team split real users into variant groups, serve each group a different version of a feature, and analyze which variant wins against a chosen metric, with a self-hostable free tier.',
          adv: [
            'Self-hostable open-source engine with zero vendor lock-in',
            'Built-in Bayesian and Frequentist statistical calculation engines',
            'SDK support for Next.js, React, Node.js, Python, iOS, and Android',
            'Connects directly to your data warehouse (Postgres, BigQuery, Snowflake)',
          ],
          lim: [
            'Requires connecting an analytics data warehouse for automated metric queries',
          ],
          steps: [
            {
              t: 'Step 1 — Initialize GrowthBook SDK in Next.js frontend',
              p: 'Load feature flags and assign user to variant group based on user UUID.',
              c: 'import { GrowthBook } from \'@growthbook/growthbook-react\';\nconst gb = new GrowthBook({\n  apiHost: \'https://growthbook.company.com\',\n  clientKey: \'sdk-prod-key-1892\'\n});',
            },
            {
              t: 'Step 2 — Define variant feature flag in code',
              p: 'Branch form layout based on experiment feature flag value.',
              c: 'const formVariant = gb.getFeatureValue(\'hrms_leave_form_length\', \'control\');\n// \'control\' -> Full form | \'variant_compact\' -> Compact 1-step form',
            },
            {
              t: 'Step 3 — Track conversion event on form submission',
              p: 'Dispatch completed_leave_request telemetry event to analytics pipeline.',
              c: 'analytics.track(\'leave_request_completed\', {\n  userId: user.id,\n  durationMs: elapsedTime,\n  variant: formVariant\n});',
            },
            {
              t: 'Step 4 — Evaluate statistical significance in dashboard',
              p: 'Review p-value and confidence interval before declaring winner.',
              c: 'GrowthBook Dashboard:\n- Variant Compact: +9.2% Conversion (p = 0.003 -> 99.7% Statistically Significant)\n- Action: Promote Variant Compact to 100% rollout',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Feature Flag Experimentation & Statistical Analysis',
          body: 'Implement multivariate feature branches and track conversion telemetry to achieve statistically validated optimizations.',
          doThis: 'Deploy A/B experiment via GrowthBook and observe metric divergence until p < 0.01.',
          code: 'npm run test -- tests/analytics/ab-tracking.spec.ts',
        },
      ],
      checklist: ['Defined single primary metric and measurable hypothesis', 'Verified equal traffic allocation and hashing consistency', 'Confirmed statistical significance (>95% confidence) before rollout'],
      practice: { title: 'A/B experimentation setup & hypothesis design', brief: 'Design an A/B test comparing single-page checkout against multi-step checkout.' },
      resources: [
        r('tool', 'GrowthBook Documentation', 'https://docs.growthbook.io', 'EN'),
        r('guide', 'Experimentation Works — Stefan Thomke', 'https://hbr.org/2020/02/the-surprising-power-of-online-experiments', 'EN'),
      ],
    }),

    ch({
      id: 'tt-api-testing',
      kind: 'guide',
      phase: 'Part 9 · Modern Engineering & Integrations',
      level: 'beginner',
      title: 'API Testing',
      minutes: 25,
      durationLabel: 'Chapter 34',
      overviewText:
        'API testing verifies an API\'s behavior directly at the request/response level — checking endpoints, methods, payloads, status codes, headers, and response bodies — independent of any UI, working with the API exactly as any consuming client (frontend, mobile app, third-party integration) actually would.',
      why:
        'Modern applications are built on APIs, often consumed by more than one client (web, mobile, partner integrations) — testing only through one UI never fully validates the API itself, and a bug fixed for one consumer can remain broken for the others. API testing catches issues earlier and faster than UI-driven testing, since there\'s no rendering, no browser, and no waiting on frontend behavior — just the request and response themselves.',
      when:
        'As soon as an endpoint exists and is ready to be called — often the very first testing possible on new backend work, well before any UI is built against it — and continuously afterward in CI, since API tests run fast and catch backend regressions immediately.',
      practical: {
        app: 'HRMS Leave Request API',
        scenario:
          'The POST /leave-requests endpoint is tested directly, independent of the leave request form UI that will eventually call it.',
        pass: 'A valid request returns 201 with the created leave request object, matching the documented schema exactly.',
        fail: 'Submitting a request with start_date after end_date returns 201 (success) instead of the expected 400 validation error — a backend gap caught in API testing weeks before the UI is even built against this endpoint.',
      },
      advantages: [
        'Faster and more direct than UI-driven testing — no browser rendering or frontend overhead',
        'Validates the API for every consumer (web, mobile, third-party), not just whichever UI happens to be tested',
        'Catches backend issues at the earliest possible point, often before any frontend is built',
        'Free tools cover everything from quick browser checks (Hoppscotch) to full CI suites (Postman/Newman)',
      ],
      limitations: [
        'Doesn\'t verify how the API is consumed and rendered by a real UI — pair with E2E testing',
        'Assertions are only as good as the understanding of the intended contract — untested edge cases stay invisible',
        'Doesn\'t catch issues that only manifest from real concurrent, UI-driven usage patterns',
      ],
      tools: [
        {
          name: 'Postman',
          sub: 'Complete API Lifecycle, Mocking & CI Runner',
          url: 'https://www.postman.com',
          seeChapter: 2,
          desc: 'The most widely used API client (see Chapter 2 and Chapter 11) for manual and automated API testing, with collections, environments, and scripted assertions covering everything from quick checks to CI suites via Newman.',
          adv: [
            'Environment variable chaining across multiple API calls',
            'Automated collection runner via Newman CLI in CI pipelines',
          ],
          lim: [
            'Free tier limits cloud collection sharing in large teams',
          ],
          steps: [
            {
              t: 'Step 1 — Create request and environment variables',
              p: 'Configure authorization bearer tokens and base URLs.',
              c: 'POST {{baseUrl}}/api/v1/leave-requests\nHeaders: { "Authorization": "Bearer {{jwtToken}}" }',
            },
            {
              t: 'Step 2 — Write test script assertions in Postman',
              p: 'Verify status code, response time (<200ms), and JSON schema.',
              c: 'pm.test("Status code is 201", () => pm.response.to.have.status(201));\npm.test("Returns valid leave ID", () => {\n  pm.expect(pm.response.json().data).to.have.property(\'id\');\n});',
            },
            {
              t: 'Step 3 — Run in CI pipeline via Newman',
              p: 'Automate entire collection run on every backend pull request.',
              c: 'npx newman run collections/hrms-api.json -e env/staging.json --reporters cli,junit',
            },
          ],
        },
        {
          name: 'Insomnia',
          sub: 'Lightweight REST & GraphQL Developer Client',
          url: 'https://insomnia.rest',
          desc: 'A lightweight, developer-focused REST/GraphQL API client — a leaner alternative to Postman, well suited to developers who want a fast, low-friction way to build and test requests.',
          adv: [
            'Extremely fast and lightweight native desktop client',
            'First-class GraphQL schema introspection and code generation',
            'Git-based collection sync with repository branches',
          ],
          lim: [
            'Fewer team collaboration features on free tier',
          ],
          steps: [
            {
              t: 'Step 1 — Build request in Insomnia workspace',
              p: 'Construct payload with syntax-highlighted JSON editor.',
              c: 'POST https://api.hrms.internal/graphql\nQuery: mutation { applyLeave(days: 3, type: SICK) { id status } }',
            },
            {
              t: 'Step 2 — Inspect response headers and timings',
              p: 'Check 200 OK, latency breakdown, and JSON body structure.',
              c: 'Response: 200 OK | Time: 42ms | Size: 180 B',
            },
          ],
        },
        {
          name: 'Hoppscotch',
          sub: 'Open-Source Browser & WebSocket API Playground',
          url: 'https://hoppscotch.io',
          desc: 'A free, open-source, browser-based API testing tool — needs no installation at all, runs directly at hoppscotch.io, and supports REST, GraphQL, and WebSocket testing with a clean, fast interface.',
          adv: [
            'Zero install — runs instantly in any web browser',
            'Supports REST, GraphQL, WebSocket, SSE, and MQTT in one interface',
            '100% free and open-source with offline PWA support',
          ],
          lim: [
            'Browser CORS restrictions require Hoppscotch browser extension for local APIs',
          ],
          steps: [
            {
              t: 'Step 1 — Open Hoppscotch in browser',
              p: 'Navigate to https://hoppscotch.io and select REST or WebSocket tab.',
              c: 'Target: https://api.hrms.internal/api/v1/health',
            },
            {
              t: 'Step 2 — Send real-time SSE or WebSocket messages',
              p: 'Test server-sent notifications for leave request approvals in real time.',
              c: 'Connected: wss://api.hrms.internal/notifications/feed\nReceived: {"event": "LEAVE_APPROVED", "id": "lr_9012"}',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Automated REST and GraphQL Contract Validation',
          body: 'Execute comprehensive HTTP assertions validating status codes, JSON schema structures, and headers.',
          doThis: 'Execute Newman collection in CI pipeline and assert 100% contract compliance.',
          code: 'npx newman run hrms-api.json -e env-staging.json --bail',
        },
      ],
      checklist: ['Verified HTTP status codes for valid and invalid payloads', 'Validated JSON schema types and required properties', 'Automated collection execution in CI/CD pipeline'],
      practice: { title: 'API contract test collection', brief: 'Build a Postman/Newman collection with 10 assertions for authentication and CRUD endpoints.' },
      resources: [
        r('tool', 'Postman Documentation', 'https://learning.postman.com', 'EN'),
        r('tool', 'Hoppscotch Community', 'https://hoppscotch.io', 'EN'),
      ],
    }),

    ch({
      id: 'tt-database-testing',
      kind: 'guide',
      phase: 'Part 9 · Modern Engineering & Integrations',
      level: 'intermediate',
      title: 'Database Testing',
      minutes: 25,
      durationLabel: 'Chapter 35',
      overviewText:
        'Database testing verifies the data layer directly — schema structure, constraints, data integrity, stored procedures, and the correctness of the raw data itself — independent of any application layer sitting on top of it, checking the database exactly as it actually stores and enforces data.',
      why:
        'An application can appear to work correctly in the UI while the underlying data is silently wrong, duplicated, orphaned, or violating an intended constraint — a foreign key that should prevent an orphaned record but doesn\'t, a transaction that partially commits, a migration that subtly corrupts existing rows. These issues often go unnoticed at the application layer until they cause a much harder-to-diagnose problem later.',
      when:
        'Whenever schema changes are made (new tables, new constraints, migrations), and periodically as a direct integrity check independent of application-level testing — especially important after any bulk data operation, migration, or refactor of how a table is used.',
      practical: {
        app: 'HRMS Employee-Department Relationship',
        scenario:
          'After a migration restructures how employees are linked to departments, DBeaver is used to directly verify data integrity.',
        pass: 'A corrective script reassigns the orphaned records, and a foreign key constraint is added so the same orphaning can no longer occur silently in the future.',
        fail: 'A query reveals 12 employee records with a department_id that no longer exists in the departments table — orphaned records left behind by an incomplete migration, invisible in the UI since the application simply shows a blank department field rather than erroring.',
      },
      advantages: [
        'Verifies data integrity directly at the source, independent of whatever the application layer happens to display',
        'Catches constraint and migration issues that could otherwise go unnoticed until causing major database corruption',
        'DBeaver supports most major databases (Postgres, MySQL, Oracle, SQLite) with one consistent tool',
        'Direct SQL queries easily audit millions of records for subtle inconsistencies',
      ],
      limitations: [
        'Requires SQL knowledge and an understanding of schema constraints to be effective',
        'Testing directly against the database bypasses application-layer validation, requiring care with test data',
        'Must be run against disposable staging databases, never production, given destructive test checks',
        'Doesn\'t verify UI presentation — pairs with, but doesn\'t replace, application testing',
      ],
      tools: [
        {
          name: 'DBeaver Community',
          sub: 'Universal Database Management & SQL Inspection Client',
          url: 'https://dbeaver.io',
          desc: 'A free, universal database client supporting most major databases (PostgreSQL, MySQL, SQL Server, and more) — lets a tester connect directly to the database, browse schema, run arbitrary queries, and directly inspect and verify data and constraints without going through the application.',
          adv: [
            'Universal multi-platform support (PostgreSQL, MySQL, MariaDB, SQLite, Oracle, Snowflake)',
            'Visual Entity Relationship Diagram (ERD) schema visualizer',
            'Data compare and schema diff tools to audit migrations',
            'Export query results to CSV, JSON, or SQL dump for test verification',
          ],
          lim: [
            'Requires direct database port connectivity (or SSH tunnel) to staging DB',
          ],
          steps: [
            {
              t: 'Step 1 — Connect DBeaver to Staging Database via SSL/SSH Tunnel',
              p: 'Establish secure connection to Postgres staging instance.',
              c: 'Host: staging-db.internal | Port: 5432 | Database: hrms_db | SSL: require',
            },
            {
              t: 'Step 2 — Audit foreign key constraint enforcement',
              p: 'Attempt inserting orphan child record directly to test schema constraints.',
              c: 'INSERT INTO leave_requests (id, employee_id, days) VALUES (\'lr_99\', \'non_existent_emp\', 3);\nExpected: ERROR: insert on table "leave_requests" violates foreign key constraint "fk_employee" -> PASS',
            },
            {
              t: 'Step 3 — Run SQL integrity audit queries post-migration',
              p: 'Verify 0 orphan records, 0 invalid nulls, and exact row counts.',
              c: 'SELECT e.id, e.name FROM employees e\nLEFT JOIN departments d ON e.department_id = d.id\nWHERE d.id IS NULL;\nResult: 0 rows (No orphans detected -> PASS)',
            },
            {
              t: 'Step 4 — Verify ACID transaction rollback on mid-flight failure',
              p: 'Simulate failure during batch payroll update and confirm ledger is untouched.',
              c: 'BEGIN;\nUPDATE employee_balances SET leave_balance = leave_balance - 1;\n-- Simulating failure before COMMIT\nROLLBACK;\nSELECT count(*) FROM employee_balances WHERE updated_at > now() - interval \'1 minute\';\nResult: 0 rows (Rollback verified)',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Direct SQL Constraint & Migration Integrity Audit',
          body: 'Audit schema tables directly with SQL queries probing foreign keys, unique constraints, and ACID rollbacks.',
          doThis: 'Execute SQL integrity audit scripts against staging database post-migration.',
          code: 'psql -h localhost -U postgres -d hrms_staging -f scripts/db-audit.sql',
        },
      ],
      checklist: ['Verified 0 orphaned foreign key references', 'Audited not-null and uniqueness constraints with boundary injections', 'Tested transaction rollback on unhandled mid-stream errors'],
      practice: { title: 'Database schema and constraint audit script', brief: 'Write an automated SQL audit script testing foreign key integrity and orphaned rows.' },
      resources: [
        r('tool', 'DBeaver Community Download', 'https://dbeaver.io', 'EN'),
        r('guide', 'PostgreSQL Data Integrity Documentation', 'https://www.postgresql.org/docs/current/ddl-constraints.html', 'EN'),
      ],
    }),

    ch({
      id: 'tt-end-to-end-testing',
      kind: 'guide',
      phase: 'Part 9 · Modern Engineering & Integrations',
      level: 'advanced',
      title: 'End-to-End (E2E) Testing',
      minutes: 30,
      durationLabel: 'Chapter 36',
      overviewText:
        'End-to-end testing verifies a complete user journey through the entire system exactly as a real user would experience it — from the UI, through the backend, to the database and back — covering the full path a real task takes rather than any single layer or component in isolation.',
      why:
        'Individual layers can each pass their own tests (the API works, the database is correct, the UI renders fine) while the combination of all of them still fails for a real user — a token that expires between two API calls in a multi-step flow, a UI state that gets out of sync with a backend response, a redirect that breaks partway through. End-to-end testing is the only testing type in this manual that verifies the entire real journey works together, exactly as a user actually experiences it.',
      when:
        'For the most critical, high-value user journeys (login, checkout, core workflows like leave request submission) — not for every possible path, since E2E tests are the slowest and most expensive to write and maintain. Run in CI before releases, and ideally on every merge to the main branch for the most critical flows.',
      practical: {
        app: 'HRMS Full Leave Request Journey',
        scenario:
          'An E2E test walks through the entire real journey: log in as an employee, navigate to the leave request form, fill it out, submit, log in as their manager, approve it, and confirm the leave balance updates correctly.',
        pass: 'The dashboard cache is correctly invalidated on approval, and the full journey — from submission through visible balance update — passes as a real user would experience it.',
        fail: 'The leave balance on the employee\'s dashboard doesn\'t update after manager approval — every individual layer (API, database, UI component) passes its own tests, but the combination, specifically the dashboard\'s cache not being invalidated after approval, only breaks when the full real journey is tested end-to-end.',
      },
      advantages: [
        'The only testing type that verifies the complete, real path a user actually takes, across every layer working together',
        'Catches integration issues between layers that no individual layer\'s own tests could ever detect on their own',
        'Directly validates the highest-value, most business-critical journeys with the highest possible confidence',
        'Both tools offer strong debugging (Cypress\'s time-travel, Playwright\'s trace viewer) for diagnosing failures quickly',
      ],
      limitations: [
        'Slowest and most expensive tests to run and maintain in the entire testing pyramid — use sparingly on critical paths',
        'Most prone to flakiness of any test type, since real timing, network, and rendering are all involved simultaneously',
        'A failure doesn\'t immediately indicate which layer broke — requires investigation via trace logs',
        'Requires a full, realistic integrated environment to run against',
      ],
      tools: [
        {
          name: 'Playwright',
          sub: 'Modern Cross-Browser & Multi-Tab E2E Engine',
          url: 'https://playwright.dev',
          seeChapter: 6,
          desc: 'Supports true end-to-end journeys (see Chapter 6) across multiple browser engines (Chromium, Firefox, WebKit), with strong support for multi-tab, multi-origin, and complex authentication flows that a full real user journey involves.',
          adv: [
            'Auto-waiting eliminates arbitrary sleep timers and test flakiness',
            'Supports multi-context personas (e.g. Employee submits, Manager approves in same test)',
            'Rich HTML trace viewer with DOM snapshot recording and video capture',
          ],
          lim: [
            'Requires real browser engine downloads in CI runners',
          ],
          steps: [
            {
              t: 'Step 1 — Create multi-persona E2E test in Playwright',
              p: 'Instantiate employee and manager browser contexts simultaneously.',
              c: 'const employeeContext = await browser.newContext();\nconst managerContext = await browser.newContext();\nconst empPage = await employeeContext.newPage();\nconst mgrPage = await managerContext.newPage();',
            },
            {
              t: 'Step 2 — Employee submits leave request',
              p: 'Fill leave application form and submit.',
              c: 'await empPage.goto(\'/dashboard/leave/apply\');\nawait empPage.fill(\'#leave-days\', \'3\');\nawait empPage.click(\'#submit-btn\');\nawait expect(empPage.locator(\'.status-badge\')).toHaveText(\'PENDING_APPROVAL\');',
            },
            {
              t: 'Step 3 — Manager approves leave request',
              p: 'Navigate to approval inbox in manager session and click approve.',
              c: 'await mgrPage.goto(\'/admin/approvals\');\nawait mgrPage.click(\'button:has-text("Approve #9812")\');\nawait expect(mgrPage.locator(\'.alert-success\')).toBeVisible();',
            },
            {
              t: 'Step 4 — Verify employee dashboard cache reflects balance deduction',
              p: 'Confirm employee balance decrements from 15 to 12 days live.',
              c: 'await empPage.reload();\nawait expect(empPage.locator(\'#remaining-balance\')).toHaveText(\'12 Days\');',
            },
          ],
        },
        {
          name: 'Cypress',
          sub: 'Developer-Centric Real-Time Interactive E2E Runner',
          url: 'https://www.cypress.io',
          seeChapter: 6,
          desc: 'A JavaScript-based E2E testing framework (see Chapter 6) built specifically around real browser execution, with time-travel debugging and automatic waiting that makes multi-step flows easy to write reliably.',
          adv: [
            'Visual interactive test runner with real-time DOM time-travel',
            'Automatic waiting for elements and network requests before assertions',
          ],
          lim: [
            'Limited multi-tab support compared to Playwright',
          ],
          steps: [
            {
              t: 'Step 1 — Write end-to-end journey in Cypress',
              p: 'Walk through complete authentication and onboarding flow.',
              c: 'describe(\'Employee Onboarding Journey\', () => {\n  it(\'completes onboarding and verifies payslip generation\', () => {\n    cy.login(\'hr_admin@company.com\', \'SecurePass123\');\n    cy.visit(\'/onboarding/new\');\n    cy.get(\'#emp-name\').type(\'Jane Doe\');\n    cy.get(\'#submit\').click();\n    cy.url().should(\'include\', \'/employees/overview\');\n  });\n});',
            },
            {
              t: 'Step 2 — Run in CI headlessly with video recording',
              p: 'Execute full suite and capture screenshots on unexpected errors.',
              c: 'npx cypress run --record --key $CYPRESS_RECORD_KEY',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Full Multi-Step User Journey Automation',
          body: 'Model critical user transactions from login to final database write across realistic multi-page workflows.',
          doThis: 'Execute Playwright end-to-end suite with trace recordings enabled.',
          code: 'npx playwright test tests/e2e/core-journeys.spec.ts --trace on',
        },
      ],
      checklist: ['Tested complete journey across UI, API, Cache, and Database layers', 'Validated UI state cache invalidation upon external status mutations', 'Integrated HTML trace artifact capture on test failures in CI'],
      practice: { title: 'End-to-end user transaction test spec', brief: 'Write a full Playwright E2E test verifying a multi-step user onboarding and approval journey.' },
      resources: [
        r('tool', 'Playwright Official Documentation', 'https://playwright.dev', 'EN'),
        r('tool', 'Cypress Documentation', 'https://docs.cypress.io', 'EN'),
      ],
    }),

    ch({
      id: 'tt-cross-browser-testing',
      kind: 'guide',
      phase: 'Part 10 · Device, Platform & Security',
      level: 'intermediate',
      title: 'Cross-browser Testing',
      minutes: 20,
      durationLabel: 'Chapter 37',
      overviewText:
        'Cross-browser testing verifies that an application renders and functions correctly across the different browsers real users actually use — Chrome, Firefox, Safari, Edge, and their various versions — checking specifically for browser-engine differences rather than device or screen-size differences (that\'s compatibility testing\'s broader scope, Chapter 19).',
      why:
        'Different browsers use different rendering engines (Blink, Gecko, WebKit) with different levels of CSS and JavaScript support, and even the same engine can behave differently across versions — a flexbox layout that renders perfectly in Chrome can break in Safari, or a JavaScript feature can silently fail in an older browser version still used by a real portion of the audience. Without deliberate cross-browser testing, these gaps only surface as confusing, hard-to-reproduce bug reports from specific users.',
      when:
        'Throughout development on any UI-facing feature, and definitely before release — checked against the specific browsers and versions the actual user base analytics show are actually in use, rather than testing exhaustively against every browser that has ever existed.',
      practical: {
        app: 'HRMS Leave Calendar Widget (Revisited)',
        scenario:
          'The same leave calendar widget from Chapter 19 is run through LambdaTest\'s automated grid across Chrome, Firefox, Safari, and Edge simultaneously, using the existing Playwright suite.',
        pass: 'A Safari-specific CSS adjustment resolves the misalignment, confirmed by re-running the same automated suite across all four browsers in parallel.',
        fail: 'The calendar\'s date-picker overlay renders correctly in Chrome, Firefox, and Edge, but is subtly misaligned in Safari specifically — a WebKit-specific CSS quirk that a single-browser local test run would never have surfaced.',
      },
      advantages: [
        'Covers real browser engines and versions without needing to install and maintain each one locally',
        'Existing Selenium/Playwright/Cypress suites can be reused directly against the cloud grid without rewriting',
        'Parallel execution across many browsers is dramatically faster than testing each one sequentially by hand',
        'Screenshot comparison makes visual, engine-specific rendering bugs immediately obvious',
      ],
      limitations: [
        'Free tier limits test minutes, concurrent sessions, or browser combinations available',
        'Testing every possible browser/version combination is impractical — prioritization by analytics is essential',
        'Cloud-based execution can be slower than a local browser for quick iterative dev checks',
        'Doesn\'t cover mobile-specific browser quirks as deeply as dedicated mobile testing (Chapter 38)',
      ],
      tools: [
        {
          name: 'LambdaTest',
          sub: 'Cloud Cross-Browser Testing Cloud & Real-Device Farm',
          url: 'https://lambdatest.com',
          desc: 'A cloud-based cross-browser testing platform offering real and emulated browsers across many OS/browser/version combinations, supporting both manual, live interactive testing and automated Selenium/Playwright/Cypress test execution across that same browser matrix.',
          adv: [
            'Over 3000+ real browser and operating system combinations',
            'Automated visual regression and screenshot comparison across browsers',
            'Direct integration with Playwright, Cypress, and Selenium test runners',
            'Local tunnel testing (UnderPass) for localhost and staging environments',
          ],
          lim: [
            'Free tier limits monthly live testing minutes and parallel executions',
          ],
          steps: [
            {
              t: 'Step 1 — Configure Playwright project for LambdaTest cloud grid',
              p: 'Set capabilities and authentication credentials in playwright.config.ts.',
              c: 'const capabilities = {\n  \'browserName\': \'Safari\',\n  \'browserVersion\': \'17.0\',\n  \'LT:Options\': {\n    \'platform\': \'macOS Sonoma\',\n    \'build\': \'HRMS Build #104\',\n    \'user\': process.env.LT_USERNAME,\n    \'accessKey\': process.env.LT_ACCESS_KEY\n  }\n};',
            },
            {
              t: 'Step 2 — Connect Playwright test to LambdaTest CDP endpoint',
              p: 'Execute tests remotely over secure websocket connection.',
              c: 'const browser = await chromium.connect({\n  wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`\n});',
            },
            {
              t: 'Step 3 — Run cross-browser visual snapshot comparisons',
              p: 'Capture rendered calendar component and assert pixel tolerance across WebKit and Blink.',
              c: 'await page.goto(\'/leave-calendar\');\nawait expect(page).toHaveScreenshot(\'calendar-widget.png\', { maxDiffPixelRatio: 0.01 });',
            },
            {
              t: 'Step 4 — Review cross-browser execution report in LambdaTest dashboard',
              p: 'Inspect video recordings, console logs, and network telemetry for Safari failures.',
              c: 'Report:\n- Chrome 122 (Win 11): PASS (1.2s)\n- Firefox 123 (macOS): PASS (1.4s)\n- Safari 17 (macOS): FAIL (WebKit CSS alignment offset detected -> Fixed in PR #88)',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Cloud Parallel Multi-Browser Automation',
          body: 'Execute Playwright/Selenium suites simultaneously across Blink, Gecko, and WebKit cloud instances.',
          doThis: 'Trigger LambdaTest matrix execution and verify cross-engine visual snapshots.',
          code: 'npx playwright test --config=playwright.lambdatest.config.ts',
        },
      ],
      checklist: ['Verified top 4 browser engines (Chrome, Firefox, Safari, Edge)', 'Audited visual layout stability on Safari WebKit engine', 'Automated parallel matrix execution in pre-release CI pipeline'],
      practice: { title: 'Cross-browser compatibility test matrix', brief: 'Set up a Playwright configuration targeting Chrome, Firefox, and WebKit on LambdaTest.' },
      resources: [
        r('tool', 'LambdaTest Platform', 'https://lambdatest.com', 'EN'),
        r('guide', 'Can I Use — Browser Support Tables', 'https://caniuse.com', 'EN'),
      ],
    }),

    ch({
      id: 'tt-mobile-testing',
      kind: 'guide',
      phase: 'Part 10 · Device, Platform & Security',
      level: 'intermediate',
      title: 'Mobile Testing',
      minutes: 25,
      durationLabel: 'Chapter 38',
      overviewText:
        'Mobile testing verifies an application\'s behavior specifically on mobile devices — native apps (iOS/Android) or mobile web — covering touch interactions, device-specific behaviors (interruptions like calls or notifications, orientation changes, varying screen sizes), and mobile-specific constraints like intermittent network connectivity and battery/performance limits.',
      why:
        'Mobile devices introduce an entire category of behavior that desktop testing simply doesn\'t exercise — touch gestures instead of mouse clicks, apps getting backgrounded or interrupted mid-task, unreliable network connections, wildly varying screen sizes and pixel densities, and OS-level behaviors (permissions, notifications) unique to mobile. An application that works flawlessly on desktop can still be genuinely broken or frustrating on a real phone.',
      when:
        'Throughout development for any application with a mobile presence (native app or responsive mobile web), and definitely before release — tested against the specific device/OS combinations that match the real or expected user base.',
      practical: {
        app: 'HRMS Mobile Leave Request',
        scenario:
          'A mobile-specific test deliberately backgrounds the app midway through filling out a leave request form, then returns to it after two minutes.',
        pass: 'Form data is persisted locally as it\'s entered, so returning to the app after being backgrounded restores exactly where the user left off.',
        fail: 'Returning to the app shows a completely blank form — all previously entered data was lost when the app was backgrounded, since form state was only held in memory with no persistence.',
      },
      advantages: [
        'Covers mobile-specific interaction patterns and OS behaviors that desktop tools never exercise',
        'One framework (Appium) spans both iOS and Android, avoiding separate automation toolchains',
        'Free and open-source, with a huge community and active driver ecosystem',
        'Can run against both emulators/simulators (fast, cheap) and physical real devices (most accurate)',
      ],
      limitations: [
        'Setup is notably more involved than web automation (XCUITest, UiAutomator2, Xcode, Android SDK)',
        'Emulators don\'t perfectly replicate real device battery drain, touch latency, or thermal throttling',
        'Execution speed is slower than web automation, especially against physical devices',
        'iOS automation strictly requires macOS with Xcode installed',
      ],
      tools: [
        {
          name: 'Appium',
          sub: 'Cross-Platform Native & Mobile Web Automation Framework',
          url: 'https://appium.io',
          desc: 'A free, open-source automation framework for native, hybrid, and mobile web apps on both iOS and Android — uses the same underlying automation approach across platforms, letting a single testing strategy (and largely similar test code) cover both.',
          adv: [
            'Supports iOS (XCUITest driver) and Android (UiAutomator2 driver) using WebDriver standard',
            'Automate native, hybrid, and mobile web apps with standard JavaScript, Python, or Java',
            'Simulate device hardware triggers (rotation, backgrounding, network toggling, battery status)',
            'Integrates seamlessly with Appium Inspector for visual element hierarchy exploration',
          ],
          lim: [
            'Requires local Android SDK / Xcode toolchain configuration',
          ],
          steps: [
            {
              t: 'Step 1 — Install Appium 2.x and platform drivers',
              p: 'Install core engine along with Android and iOS drivers.',
              c: 'npm install -g appium\nappium driver install uiautomator2\nappium driver install xcuitest',
            },
            {
              t: 'Step 2 — Define Appium desired capabilities for mobile test session',
              p: 'Configure target package, activity, and device identifiers.',
              c: 'const caps = {\n  platformName: \'Android\',\n  \'appium:automationName\': \'UiAutomator2\',\n  \'appium:deviceName\': \'Pixel_7_API_34\',\n  \'appium:app\': \'./builds/hrms-mobile.apk\',\n  \'appium:appPackage\': \'com.hrms.app\'\n};',
            },
            {
              t: 'Step 3 — Write mobile interruption test with WebDriverIO/Appium',
              p: 'Fill leave request form, background app for 10 seconds, and assert form state persistence.',
              c: 'const leaveInput = await driver.$(\'~leave_reason_input\');\nawait leaveInput.setValue(\'Medical appointment\');\n// Background app for 10 seconds\nawait driver.background(10);\n// Verify input persisted upon foregrounding\nawait expect(leaveInput).toHaveText(\'Medical appointment\');',
            },
            {
              t: 'Step 4 — Execute test suite on connected device or emulator',
              p: 'Run mobile tests via Appium CLI server.',
              c: 'npx wdio run wdio.conf.js --spec tests/mobile/leave-interruption.spec.js',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Mobile Gesture and Lifecycle Automation',
          body: 'Automate mobile user flows handling backgrounding, push notifications, network dropouts, and touch gestures.',
          doThis: 'Execute Appium mobile regression suite across Android emulator and iOS simulator.',
          code: 'npx wdio run wdio.mobile.conf.js',
        },
      ],
      checklist: ['Tested background and foreground lifecycle state persistence', 'Verified touch target sizes (>48x48px) and multi-touch gestures', 'Audited offline and low-bandwidth degradation behaviors'],
      practice: { title: 'Mobile app interruption automation spec', brief: 'Write an Appium test simulating app backgrounding and phone call interruptions.' },
      resources: [
        r('tool', 'Appium Official Documentation', 'https://appium.io/docs/en/latest', 'EN'),
        r('guide', 'Mobile Testing Heuristics (I SLICED DICE)', 'https://kallithea-test.com/mobile-testing-heuristics', 'EN'),
      ],
    }),

    ch({
      id: 'tt-installation-testing',
      kind: 'guide',
      phase: 'Part 10 · Device, Platform & Security',
      level: 'beginner',
      title: 'Installation Testing',
      minutes: 15,
      durationLabel: 'Chapter 39',
      overviewText:
        'Installation testing verifies that an application installs, updates, and uninstalls correctly across the environments and methods real users will actually use — checking the install process itself, not the application\'s functionality once it\'s already running.',
      why:
        'An application that works perfectly once installed is still a failure if users can\'t actually get it installed in the first place, or if an update corrupts their existing data, or if an uninstall leaves broken remnants behind. Installation is a real user\'s very first experience with the product — a bad first impression here can lose a user before they ever see any of the application\'s actual features.',
      when:
        'Before every release that includes a packaged installer, app store submission, or update mechanism — checked specifically against a clean environment (not the developer\'s already-configured machine) and against the realistic upgrade path from the previous version.',
      practical: {
        app: 'HRMS Desktop Client Update',
        scenario:
          'The HRMS desktop client is tested updating from version 2.3 to 2.4 on a machine with existing saved data and settings.',
        pass: 'The update correctly migrates the existing settings file to the new version\'s format, and the user\'s saved preferences persist across the update exactly as expected.',
        fail: 'After updating, the user\'s saved report filters and dashboard layout preferences are reset to default — the update process overwrote the local settings file instead of migrating it.',
      },
      advantages: [
        'Catches a user\'s literal first impression of the product, before any feature is even reached',
        'Update-path testing specifically protects existing users\' data during version upgrades',
        'Clean-environment testing surfaces missing dependencies invisible on dev machines',
        'Relatively quick to test manually compared to the cost of a broken install reaching real users',
      ],
      limitations: [
        'Manual and environment-specific — requires genuinely clean systems/VMs to avoid false positives',
        'Doesn\'t scale easily across every possible OS version and hardware configuration combination',
        'Update-path testing requires maintaining prior release builds and realistic migration fixtures',
        'App-store review and rollout mechanisms introduce platform behaviors outside team control',
      ],
      tools: [
        {
          name: 'Manual Clean-State Matrix',
          sub: 'Clean Virtual Machine & Sandbox State Verification',
          url: 'https://hearth-learn.vercel.app/manuals/testing-types',
          seeChapter: 5,
          desc: 'Installation testing is inherently manual (see Chapter 5), environment-specific, and best done on genuinely clean systems or fresh device images, since a developer\'s own machine already has dependencies and prior state that would mask real installation problems.',
          adv: [
            'Zero software overhead — validates real user installer dialogs and permissions',
            'Exercises real disk permissions, firewall prompts, and registry write locks',
            'Audits data persistence during real in-place binary upgrades',
          ],
          lim: [
            'Requires provisioning disposable VMs (e.g. VirtualBox, Windows Sandbox, Docker)',
          ],
          steps: [
            {
              t: 'Step 1 — Spin up clean, unprovisioned VM/Sandbox environment',
              p: 'Use Windows Sandbox or fresh macOS user account with no pre-installed runtimes.',
              c: 'Windows Sandbox: launch clean instance with default OS image',
            },
            {
              t: 'Step 2 — Execute clean install test',
              p: 'Verify installer wizard steps, desktop shortcut generation, and startup launch.',
              c: 'Run HRMS-Setup-2.4.0.exe -> Verify installation completes without missing DLL errors',
            },
            {
              t: 'Step 3 — Execute upgrade path test with existing user profile',
              p: 'Install v2.3 first, customize user preferences, then run v2.4 installer over it.',
              c: '1. Install v2.3.0 -> Save filter "Q3 Engineering Leave"\n2. Run v2.4.0 updater\n3. Launch app -> Verify filter "Q3 Engineering Leave" is preserved intact',
            },
            {
              t: 'Step 4 — Execute clean uninstall verification',
              p: 'Uninstall application and check that file system and registry are cleaned safely.',
              c: 'Uninstall HRMS -> Verify %APPDATA%/HRMS cleans binaries while prompting to retain user data files',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Clean Sandbox Install & Upgrade Path Verification',
          body: 'Verify installation packages in isolated environments auditing registry keys, file permissions, and legacy data migration.',
          doThis: 'Execute installer test checklist across fresh VM and upgraded staging machines.',
          code: 'powershell.exe -ExecutionPolicy Bypass -File scripts/verify-installer.ps1',
        },
      ],
      checklist: ['Verified clean install on unprovisioned vanilla OS', 'Confirmed user settings and local database survival after upgrade', 'Audited complete file and registry cleanup upon uninstallation'],
      practice: { title: 'Installation and upgrade test plan', brief: 'Design an installation test matrix covering clean installs, upgrades, and interrupted setups.' },
      resources: [
        r('guide', 'Installation Testing Guide', 'https://www.guru99.com/installation-testing.html', 'EN'),
      ],
    }),

    ch({
      id: 'tt-penetration-testing',
      kind: 'guide',
      phase: 'Part 10 · Device, Platform & Security',
      level: 'advanced',
      title: 'Penetration Testing',
      minutes: 30,
      durationLabel: 'Chapter 40',
      overviewText:
        'Penetration testing simulates a real, motivated attacker deliberately trying to break into an application — going beyond automated vulnerability scanning (Chapter 18) to manually chain together weaknesses, exploit business logic flaws, and attempt actual unauthorized access, exactly as a real adversary would.',
      why:
        'Automated security scanning (Chapter 18) is good at catching known vulnerability patterns, but a skilled human attacker doesn\'t stop at a single flagged issue — they chain a minor information leak with a weak permission check with a predictable ID to achieve something far more damaging than any single automated finding would suggest. Penetration testing is what reveals that real, combined risk, which automated tools structurally can\'t discover on their own.',
      when:
        'Before major releases involving authentication, payment, or sensitive data handling, and periodically (e.g. annually, or after significant architecture changes) for applications handling genuinely sensitive data — as a deeper complement to continuous automated security scanning in CI.',
      practical: {
        app: 'HRMS Cross-Account Data Access',
        scenario:
          'A penetration tester manually chains two individually minor findings: predictable, sequential employee IDs in the URL, and a payslip endpoint that only checks for a valid session rather than verifying it belongs to the requested employee.',
        pass: 'The severity is escalated from a routine backlog item to an emergency fix, based on the demonstrated real-world impact rather than the automated scanner\'s more abstract finding.',
        fail: 'By iterating sequential employee IDs, the tester demonstrates systematic access to every employee\'s payslip data in the company with a single valid low-privilege login — a full-scale data exposure that automated scanning had only flagged as an isolated finding without demonstrating its true scope.',
      },
      advantages: [
        'Finds real, chained risk that automated scanning alone structurally cannot discover',
        'Directly tests business logic flaws (e.g. broken object-level authorization across user accounts) that pattern scanners miss',
        'Produces concrete, demonstrated exploit paths that create urgent prioritization for critical fixes',
        'Complements continuous automated scanning (Chapter 18) rather than duplicating it',
      ],
      limitations: [
        'Requires genuine security expertise to be effective — cannot be replaced by running an automated tool',
        'Time-consuming and typically run periodically, not continuously on every commit',
        'Must have explicit authorization and clearly defined scope — unauthorized testing is illegal',
        'A clean test result today doesn\'t guarantee safety after future code changes',
      ],
      tools: [
        {
          name: 'OWASP ZAP',
          sub: 'Interactive Interception Proxy & Penetration Suite',
          url: 'https://www.zaproxy.org',
          seeChapter: 18,
          desc: 'Used here (see Chapter 18) not just for automated scanning but as an interactive proxy — a human tester actively manipulates requests, chains findings together, and probes business logic manually, using ZAP as a tool to intercept and modify traffic.',
          adv: [
            'Intercept and rewrite HTTP/HTTPS requests in flight (Breakpoints)',
            'Fuzzer tool sends thousands of boundary payloads against specific parameter fields',
            'Custom payload scripting in JavaScript and Python',
          ],
          lim: [
            'Requires configuring local proxy certificate in target browser',
          ],
          steps: [
            {
              t: 'Step 1 — Configure ZAP as intercepting proxy',
              p: 'Route browser traffic through localhost:8080 to inspect and pause live requests.',
              c: 'Browser Network Proxy -> 127.0.0.1:8080 (ZAP Proxy)',
            },
            {
              t: 'Step 2 — Set breakpoint on sensitive endpoint',
              p: 'Trap request before it reaches server to manipulate payload parameters.',
              c: 'GET /api/v1/employees/1042/payslip\nHeader: Authorization: Bearer <Emp1042_Token>',
            },
            {
              t: 'Step 3 — Manually tamper employee ID to probe Broken Object Level Authorization (BOLA)',
              p: 'Change employee ID to 1043 while keeping Emp 1042 token to verify authorization enforcement.',
              c: 'Tampered Request: GET /api/v1/employees/1043/payslip\nExpected: 403 Forbidden\nActual (Vulnerable): 200 OK with Emp 1043 salary data -> CRITICAL VULNERABILITY CONFIRMED',
            },
            {
              t: 'Step 4 — Document reproduction steps and provide patch recommendation',
              p: 'Produce proof-of-concept exploit report for developers with required session check.',
              c: 'Fix in controller: if (req.user.id !== requestedEmpId && !req.user.isAdmin) throw new ForbiddenException();',
            },
          ],
        },
        {
          name: 'Nikto',
          sub: 'Open-Source Web Server Infrastructure Vulnerability Scanner',
          url: 'https://github.com/sullo/nikto',
          desc: 'A free, open-source web server scanner that checks specifically for dangerous files, outdated server software, and known server-level misconfigurations — a useful complement to ZAP\'s application-layer focus.',
          adv: [
            'Scans web servers for over 6700 potentially dangerous files and CGIs',
            'Checks for outdated server components, exposed .git directories, and open admin endpoints',
            'Fast CLI execution suitable for infrastructure auditing',
          ],
          lim: [
            'Generates high volume of server log traffic — easily detected by WAFs',
          ],
          steps: [
            {
              t: 'Step 1 — Install and run Nikto against staging target',
              p: 'Execute comprehensive web server configuration scan.',
              c: 'nikto -h https://staging.hrms.internal -ssl -port 443',
            },
            {
              t: 'Step 2 — Analyze security header and exposed file findings',
              p: 'Check for missing security headers (X-Frame-Options, CSP) and backup file disclosures.',
              c: '+ OSVDB-3092: /admin.bak: Backup file found containing server credentials.\n+ Missing security header: X-Content-Type-Options\n+ Server leaks Nginx version: nginx/1.18.0',
            },
            {
              t: 'Step 3 — Remediate server configuration',
              p: 'Harden Nginx config by deleting exposed backup files and hiding server banners.',
              c: 'server_tokens off;\nadd_header X-Content-Type-Options nosniff;',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Manual Business Logic & BOLA Vulnerability Assessment',
          body: 'Probe endpoints using intercepting proxies manipulating parameter authorization states to discover chained exploit chains.',
          doThis: 'Execute manual penetration audit with OWASP ZAP and generate proof-of-concept report.',
          code: 'zap.sh -cmd -quickurl https://staging.hrms.internal -quickout report-pentest.html',
        },
      ],
      checklist: ['Verified authorization barriers across distinct user tenant boundaries', 'Probed IDOR/BOLA across all numeric resource identifiers', 'Audited web server configurations with Nikto infrastructure scanning'],
      practice: { title: 'Penetration testing proof of concept report', brief: 'Document an IDOR vulnerability reproduction with remediation patch guidance.' },
      resources: [
        r('tool', 'OWASP Web Security Testing Guide (WSTG)', 'https://owasp.org/www-project-web-security-testing-guide', 'EN'),
        r('tool', 'Nikto Scanner GitHub Repository', 'https://github.com/sullo/nikto', 'EN'),
      ],
    }),

    ch({
      id: 'tt-seo-site-health-testing',
      kind: 'guide',
      phase: 'Part 11 · Operational, Infrastructure & Site Health',
      level: 'beginner',
      title: 'SEO / Site Health Testing',
      minutes: 15,
      durationLabel: 'Chapter 41',
      overviewText:
        'SEO and site health testing checks how well an application\'s public-facing pages are structured for search engine crawling and indexing — proper metadata, valid sitemaps, crawlable links, mobile-friendliness, and the absence of broken links or crawl errors — verifying discoverability rather than functionality.',
      why:
        'A feature can work perfectly for a user who\'s already on the page and still fail the business if search engines can\'t crawl, index, or rank it correctly — missing meta tags, broken canonical URLs, orphaned pages with no internal links, or a robots.txt accidentally blocking an entire section can quietly make otherwise-working content invisible to anyone searching for it. These issues are typically invisible to functional testing entirely, since the page itself renders and works fine — it\'s just never found.',
      when:
        'Before launch of any public-facing site or major content change, and periodically afterward (monthly or after significant site restructuring), since crawl issues and broken links accumulate gradually as content and links change over time.',
      practical: {
        app: 'HRMS Public Careers Page',
        scenario:
          'A Screaming Frog crawl of the company\'s public careers section (linked from the HRMS) turns up a batch of broken internal links.',
        pass: 'Broken links are corrected or removed, unique titles are added to each page, and a re-crawl confirms zero remaining 404s in the careers section.',
        fail: '14 job listing pages return 404 because they were removed without their internal links being cleaned up elsewhere on the site, and three pages have duplicate <title> tags, hurting how they\'re distinguished in search results.',
      },
      advantages: [
        'Search Console uses real Google crawl and search data, not a simulation — the most accurate picture of how the site is actually seen',
        'Screaming Frog\'s full-site crawl catches structural issues (broken links, duplicate metadata) that spot-checking individual pages would miss',
        'Both tools are free for small-to-mid-sized sites, with no setup cost beyond installing/verifying',
        'Findings translate directly into concrete, actionable fixes (a broken link, a missing tag) rather than vague scores',
      ],
      limitations: [
        'Screaming Frog\'s free tier caps at 500 URLs — larger sites need the paid tier for a full crawl',
        'Search Console data has an inherent delay — it reflects Google\'s crawl history, not the current live state of every page',
        'Neither tool evaluates actual keyword ranking strategy or content quality — they check technical crawlability and structure',
        'Fixing flagged issues doesn\'t guarantee improved rankings — many external ranking factors are outside what these tools measure',
      ],
      tools: [
        {
          name: 'Google Search Console',
          sub: 'Official Google Indexing, Crawl & Core Web Vitals Platform',
          url: 'https://search.google.com/search-console',
          desc: 'Google\'s own free tool showing exactly how Googlebot sees and indexes a site — which pages are indexed, which are excluded and why, crawl errors, mobile usability issues, and Core Web Vitals data pulled directly from real Google crawl and search data.',
          adv: [
            '100% authoritative direct telemetry from Googlebot search crawlers',
            'URL inspection tool displays live rendered HTML, DOM snapshots, and HTTP response codes',
            'Real-user Core Web Vitals data (LCP, INP, CLS) aggregated from Chrome UX Report',
          ],
          lim: [
            'Data updates on a 24-48 hour delay rather than real-time inspection',
          ],
          steps: [
            {
              t: 'Step 1 — Verify domain ownership and submit XML sitemap',
              p: 'Add DNS TXT record or HTML meta tag and submit sitemap.xml to Search Console.',
              c: 'Sitemap: https://company.com/sitemap.xml\nSubmitted: 342 URLs -> 342 Indexed (0 Errors)',
            },
            {
              t: 'Step 2 — Inspect individual page indexability and mobile usability',
              p: 'Run URL Inspection on key public pages to verify Googlebot rendering and canonical tags.',
              c: 'URL: https://company.com/careers/senior-qa-engineer\nPage is indexed: Yes | Mobile usable: Yes | Canonical: https://company.com/careers/senior-qa-engineer',
            },
            {
              t: 'Step 3 — Monitor Coverage and Core Web Vitals reports',
              p: 'Check for 404 crawl errors, unindexed pages, or slow LCP render metrics.',
              c: 'Coverage Report: 0 Server errors (5xx), 0 Redirect errors, 0 Excluded by \'noindex\' tag',
            },
          ],
        },
        {
          name: 'Screaming Frog SEO Spider',
          sub: 'Desktop Website Crawler & Technical SEO Audit Engine',
          url: 'https://screamingfrog.co.uk',
          desc: 'A desktop crawler that systematically walks an entire site the way a search engine would, free up to 500 URLs, reporting broken links, missing metadata, duplicate titles, redirect chains, and other structural SEO issues in one consolidated crawl.',
          adv: [
            'Simulates search engine crawlers with deep depth and internal link graph analysis',
            'Pinpoints broken internal links (4xx), redirect loops (3xx), and missing H1/meta tags instantly',
            'Audits canonical links, hreflang tags, and structured schema JSON-LD markup',
          ],
          lim: [
            'Free tier limits single crawl sessions to 500 URLs',
          ],
          steps: [
            {
              t: 'Step 1 — Run site crawl in Screaming Frog',
              p: 'Enter base URL and crawl staging/production domain.',
              c: 'Target: https://company.com | Crawled: 480 URLs | Duration: 42s',
            },
            {
              t: 'Step 2 — Filter Response Codes tab for 4xx Client Errors',
              p: 'Identify broken links and inspect the Inlinks tab to find exactly which pages contain the broken anchor tags.',
              c: 'Filter: Client Error (4xx)\nURL: /careers/intern-designer -> 404 Not Found\nInlinks: Found linked on /careers and /about-us -> Clean up obsolete links',
            },
            {
              t: 'Step 3 — Audit Page Titles and Meta Descriptions tabs',
              p: 'Identify missing, duplicate, or truncated title tags across all crawled pages.',
              c: 'Filter: Duplicate Titles -> /careers/job-1 and /careers/job-2 have identical title \'Careers - Company\'\nFix: Make titles dynamic with position names',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Technical Crawlability & Metadata Audit',
          body: 'Verify public-facing HTML documents contain valid canonical links, schema markup, and zero 4xx errors.',
          doThis: 'Execute Screaming Frog audit and verify 100% crawl pass rate.',
          code: 'screamingfrogseospider --crawl https://staging.hrms.internal --headless --output-folder ./reports',
        },
      ],
      checklist: ['Verified sitemap.xml validity in Google Search Console', 'Confirmed zero broken internal links (4xx) across public pages', 'Audited meta titles, descriptions, and OpenGraph social tags'],
      practice: { title: 'Site health crawl & broken link remediation', brief: 'Run Screaming Frog on a public portal and eliminate all 4xx/3xx redirect chains.' },
      resources: [
        r('tool', 'Google Search Console Help', 'https://support.google.com/webmasters', 'EN'),
        r('tool', 'Screaming Frog SEO Spider Guide', 'https://www.screamingfrog.co.uk/seo-spider/user-guide', 'EN'),
      ],
    }),

    ch({
      id: 'tt-uptime-availability-testing',
      kind: 'guide',
      phase: 'Part 11 · Operational, Infrastructure & Site Health',
      level: 'beginner',
      title: 'Uptime / Availability Testing',
      minutes: 15,
      durationLabel: 'Chapter 42',
      overviewText:
        'Uptime and availability testing continuously monitors whether an application (or specific critical endpoints) is actually reachable and responding correctly, over time, from external vantage points — tracking real-world availability as an ongoing metric rather than a one-time pass/fail test.',
      why:
        'An application can pass every functional and performance test and still go down in production due to infrastructure failure, a bad deploy, a certificate expiring, or a dependency outage — and without active external monitoring, the team may not find out until a user reports it, which is far slower and far more damaging than catching it immediately. Uptime testing turns availability from an assumption into a continuously measured, alertable fact.',
      when:
        'Continuously, in production, from the moment an application goes live — this isn\'t a pre-release test type at all, but an ongoing operational practice that should run for the entire lifetime of the application.',
      practical: {
        app: 'HRMS Login Endpoint Outage',
        scenario:
          'UptimeRobot, monitoring the HRMS login endpoint every 5 minutes, detects a failure.',
        pass: 'The team rolls back the deploy immediately based on the automated alert, avoiding what would otherwise have been a morning-long outage discovered only through user complaints.',
        fail: 'An alert fires within 5 minutes of a bad deploy taking down the login endpoint — well before the next morning\'s login surge, and well before any user had a chance to report it.',
      },
      advantages: [
        'Continuous, always-on monitoring catches outages the moment they happen, rather than waiting for a user report',
        'Free tiers are genuinely usable for small-to-mid scale applications, with no infrastructure to self-host',
        'Historical uptime data gives a concrete, trackable reliability metric over time, not just anecdotal impressions',
        'SSL expiration monitoring (StatusCake) catches a specific, entirely preventable class of outage before it happens',
      ],
      limitations: [
        'Free tier check intervals (e.g. every 5 minutes) mean brief transient outages can go briefly undetected',
        'Simple HTTP status pings don\'t verify deep functional workflows — a page can return 200 while UI logic fails',
        'Doesn\'t diagnose root causes, only flags that an outage occurred — requires APM/logs for debugging',
        'Public status pages require active human communication during major incidents',
      ],
      tools: [
        {
          name: 'UptimeRobot',
          sub: 'Cloud Uptime & API Endpoint Heartbeat Monitor',
          url: 'https://uptimerobot.com',
          desc: 'A free uptime monitoring service that pings a specified URL or endpoint at a regular interval (as frequently as every 5 minutes on the free tier) and sends alerts the moment a check fails, tracking uptime percentage and response time history over time.',
          adv: [
            '50 free monitors with 5-minute interval check cadence',
            'Multi-channel alerting via Slack, Discord, Microsoft Teams, Webhooks, SMS, and Email',
            'Free hosted public status page for incident communication',
            'HTTP keyword matching (verifies response body text, not just status 200)',
          ],
          lim: [
            '1-minute check intervals require paid tier',
          ],
          steps: [
            {
              t: 'Step 1 — Create HTTP(s) and Keyword monitors',
              p: 'Add critical endpoints with response assertion checks.',
              c: 'Monitor Type: HTTP(s) Keyword\nURL: https://hrms.company.com/api/health\nKeyword to find: "status":"healthy"\nInterval: 5 minutes',
            },
            {
              t: 'Step 2 — Configure alerting integrations for on-call teams',
              p: 'Set up webhook dispatch to Slack #engineering-alerts and PagerDuty.',
              c: 'Alert Contact: Webhook -> https://hooks.slack.com/services/T00/B00/X00\nThreshold: Alert when down for 1 check cycle',
            },
            {
              t: 'Step 3 — Deploy public status page',
              p: 'Publish transparent status dashboard at status.company.com.',
              c: 'Status Page: https://status.company.com\nMetrics: 99.98% 30-Day Uptime | Avg Response Time: 142ms',
            },
          ],
        },
        {
          name: 'StatusCake',
          sub: 'Global Multi-Location Uptime & SSL Expiration Sentinel',
          url: 'https://statuscake.com',
          desc: 'A free uptime and performance monitoring service, additionally offering multi-location checks (verifying reachability from several global regions, not just one) and basic SSL certificate expiration monitoring on its free tier.',
          adv: [
            'Global test probes across North America, Europe, Asia, and Australia',
            'Automated SSL certificate expiration alerts 30 days and 7 days prior to expiry',
            'Page speed and server response time historical tracking',
          ],
          lim: [
            'Free tier limits total test count to 10 monitors',
          ],
          steps: [
            {
              t: 'Step 1 — Configure Multi-Location Uptime Check',
              p: 'Verify reachability from globally distributed test nodes.',
              c: 'Target: https://hrms.company.com\nLocations: US East, London, Singapore, Sydney\nRule: Trigger alert only if 2+ locations report failure (prevent false alarms)',
            },
            {
              t: 'Step 2 — Enable SSL Expiry Sentinel',
              p: 'Configure automated notification 14 days before certificate expiration.',
              c: 'SSL Check: hrms.company.com\nIssuer: Let\'s Encrypt | Expiry: 48 days remaining | Alert trigger: <= 14 days',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Automated 24/7 Availability & Latency Monitoring',
          body: 'Deploy external heartbeat monitors executing regular ping and HTTP body assertions against core user journeys.',
          doThis: 'Set up UptimeRobot monitor and simulate endpoint failure to test alerting webhooks.',
          code: 'curl -X POST https://api.uptimerobot.com/v2/newMonitor -d "api_key=u10-key&type=1&url=https://hrms.company.com"',
        },
      ],
      checklist: ['Configured multi-location uptime checks on primary APIs', 'Verified on-call alerting channel integration (Slack/PagerDuty)', 'Enabled SSL certificate expiration alerts at 30-day thresholds'],
      practice: { title: 'Uptime monitoring and status page setup', brief: 'Set up an UptimeRobot dashboard monitoring 5 critical endpoints with a public status page.' },
      resources: [
        r('tool', 'UptimeRobot Documentation', 'https://uptimerobot.com/help', 'EN'),
        r('tool', 'StatusCake Help Center', 'https://statuscake.com/help', 'EN'),
      ],
    }),

    ch({
      id: 'tt-fuzz-testing',
      kind: 'guide',
      phase: 'Part 11 · Operational, Infrastructure & Site Health',
      level: 'advanced',
      title: 'Fuzz Testing',
      minutes: 25,
      durationLabel: 'Chapter 43',
      overviewText:
        'Fuzz testing feeds an application large volumes of random, malformed, or unexpected input — automatically and at scale — specifically to find inputs that cause crashes, hangs, memory corruption, or unexpected behavior that no one would have thought to manually craft as a test case.',
      why:
        'Manually designed test cases only cover inputs a human thought to try. Fuzzing automates the search across a vast space of inputs no person would ever manually enumerate, and it\'s particularly effective at finding the kind of low-level, security-relevant bugs (buffer overflows, unhandled exceptions, injection points) that cause real crashes or vulnerabilities — often the exact class of bug that becomes a serious exploit if a real attacker finds it first.',
      when:
        'Especially valuable for any component that parses external or untrusted input directly (file uploads, API request parsing, data import features) — run periodically, and especially before release of any new input-parsing functionality, since fuzzing is computationally intensive and best targeted rather than run blindly everywhere.',
      practical: {
        app: 'HRMS CSV Bulk Import',
        scenario:
          'The HRMS\'s bulk employee-import feature (CSV upload) is fuzz-tested with ZAP\'s fuzzer, feeding malformed and oversized field values into the upload parameter.',
        pass: 'A field-length validation check is added before processing, and the fix is confirmed by re-running the same fuzzer payloads without triggering the hang.',
        fail: 'A CSV row with an extremely long value in the name field causes the import process to hang indefinitely rather than rejecting it with a validation error — a resource-exhaustion risk if repeated deliberately by a malicious upload.',
      },
      advantages: [
        'Automatically explores a vastly larger input space than any manually designed test suite could feasibly cover',
        'Particularly effective at finding security-relevant low-level bugs (crashes, memory issues) before an attacker does',
        'Coverage-guided fuzzing (AFL) intelligently targets rarely-exercised code paths rather than wasting effort on already-tested ones',
        'Runs unattended once configured, continuously generating new findings without ongoing manual effort',
      ],
      limitations: [
        'Computationally intensive and often needs to run for extended periods (hours to days) to be genuinely effective',
        'AFL specifically requires compiled/native code and source access — not directly applicable to web apps without adaptation',
        'A crash found by a fuzzer still needs manual investigation to determine real-world exploitability and severity',
        'Less effective against code with heavy early structural validation that rejects malformed data before reaching deep logic',
      ],
      tools: [
        {
          name: 'OWASP ZAP Fuzzer',
          sub: 'Application-Layer Parameter & Payload Fuzzing Engine',
          url: 'https://www.zaproxy.org',
          seeChapter: 18,
          desc: 'ZAP includes a built-in fuzzer (see Chapter 18 and Chapter 40) that can be pointed at specific request parameters, automatically substituting a wide range of malformed, boundary, and malicious payloads into that parameter and observing how the application responds.',
          adv: [
            'Built-in fuzzing payload databases (JbroFuzz, SecLists, SQL Injection, Format Strings)',
            'Real-time HTTP response code, size, and latency anomaly detection',
            'Supports custom regex payload generators and mutation dictionaries',
          ],
          lim: [
            'Targeted at HTTP request parameters rather than binary memory spaces',
          ],
          steps: [
            {
              t: 'Step 1 — Intercept target API request in ZAP',
              p: 'Select POST /api/v1/employees/bulk-import request and right-click -> Fuzz.',
              c: 'Target Parameter: file_contents or employee_name',
            },
            {
              t: 'Step 2 — Attach SecLists Malformed & Boundary Payload sets',
              p: 'Configure payload generator with 10,000 malformed strings and unicode byte sequences.',
              c: 'Payload Categories: Null bytes, Long strings (65KB+), Special characters (%00, \\r\\n, \\uFFFF), Format strings',
            },
            {
              t: 'Step 3 — Execute fuzzing run and filter by response anomalies',
              p: 'Sort fuzzer results by HTTP 500 Internal Server Error, timeouts (>5000ms), and atypical body sizes.',
              c: 'Result: Payload #4102 (String length 131,072 chars) -> HTTP 504 Gateway Timeout (Regex ReDoS detected in parser)\nFix: Bound input length to max 255 chars in Joi/Zod validator',
            },
          ],
        },
        {
          name: 'AFL (American Fuzzy Lop)',
          sub: 'Coverage-Guided Genetic Binary & Native Code Fuzzer',
          url: 'https://github.com/google/AFL',
          desc: 'A well-known, highly effective coverage-guided fuzzer, primarily used against compiled binaries/native code — it intelligently mutates input based on which code paths each mutation newly exercises, making it far more effective than purely random fuzzing.',
          adv: [
            'Genetic algorithm uses lightweight binary instrumentation to track branch coverage',
            'Extremely fast — executes thousands of mutated executions per second per CPU core',
            'Automated test-case minimization (afl-tmin) reduces crashing payloads to minimal repros',
          ],
          lim: [
            'Requires C/C++/Rust source compilation with afl-gcc or afl-clang instrumentation',
          ],
          steps: [
            {
              t: 'Step 1 — Compile native parser binary with AFL instrumentation',
              p: 'Instrument CSV/Image/PDF parsing engine using AFL compiler wrapper.',
              c: 'afl-gcc -O2 -o hrms_parser src/csv_parser.c',
            },
            {
              t: 'Step 2 — Seed test corpus and launch fuzzing engine',
              p: 'Provide small valid seed files in in_dir and start afl-fuzz across CPU cores.',
              c: 'afl-fuzz -i seed_inputs/ -o findings_dir/ -- ./hrms_parser @@',
            },
            {
              t: 'Step 3 — Inspect crashing inputs in findings directory',
              p: 'Analyze core dumps and heap traces generated in findings_dir/crashes/.',
              c: 'Crash ID 0001: SIGSEGV (Out of bounds buffer read at line 84)\nFix: Added explicit array bounds check before memory copy',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Boundary & Malformed Parameter Fuzzing',
          body: 'Subject file upload and JSON ingestion endpoints to large payload mutation sets detecting ReDoS and buffer anomalies.',
          doThis: 'Execute ZAP fuzzing session on CSV import API and audit response times.',
          code: 'zap-cli fuzz --target https://staging.hrms.internal/api/import --payload-list seclists-fuzz.txt',
        },
      ],
      checklist: ['Identified all untrusted data parsing interfaces (CSV, PDF, JSON)', 'Audited input length limits and regex ReDoS vulnerabilities', 'Eliminated unhandled 500 error responses during fuzzing runs'],
      practice: { title: 'API parameter fuzzing with OWASP ZAP', brief: 'Fuzz a user profile update API with 5,000 malformed unicode and boundary strings.' },
      resources: [
        r('tool', 'AFL GitHub Repository', 'https://github.com/google/AFL', 'EN'),
        r('guide', 'OWASP Fuzzing Guide', 'https://owasp.org/www-community/Fuzzing', 'EN'),
      ],
    }),

    ch({
      id: 'tt-vulnerability-scanning',
      kind: 'guide',
      phase: 'Part 11 · Operational, Infrastructure & Site Health',
      level: 'intermediate',
      title: 'Vulnerability Scanning',
      minutes: 25,
      durationLabel: 'Chapter 44',
      overviewText:
        'Vulnerability scanning automatically checks an application and its infrastructure against databases of known, previously disclosed vulnerabilities — outdated software versions, missing security patches, exposed services, and common misconfigurations — providing broad, continuous coverage of well-documented risk rather than discovering novel issues.',
      why:
        'A large share of real-world breaches don\'t come from exotic, novel attacks — they come from known, disclosed vulnerabilities in outdated software that simply hasn\'t been patched yet. Vulnerability scanning provides continuous, low-effort coverage of exactly that risk category, catching an outdated library or an exposed misconfigured service before it becomes the entry point for a real attacker who\'s specifically searching for exactly this kind of easy, known target.',
      when:
        'Continuously — ideally scheduled to run automatically on a regular cadence (daily or weekly) against both the application and its infrastructure, since new vulnerabilities are disclosed in existing, unchanged software on an ongoing basis, not just when the codebase itself changes.',
      practical: {
        app: 'HRMS Server Infrastructure',
        scenario:
          'A scheduled weekly Nessus scan against the HRMS\'s staging infrastructure flags an outdated version of a widely used web server software with a publicly disclosed, actively exploited vulnerability.',
        pass: 'The server software is updated to the patched version, a re-scan confirms the vulnerability is no longer present, and the update cadence is tightened to catch future disclosures faster.',
        fail: 'The flagged version has been running unpatched for three months since the last infrastructure update, exposing a known, actively exploited vulnerability to anything that finds and probes the server.',
      },
      advantages: [
        'Provides broad, continuous, automated coverage of well-known vulnerability categories with minimal manual effort',
        'Catches an entire class of real-world breach risk (unpatched, known-vulnerable software) actively exploited in the wild',
        'Nessus extends coverage beyond the web application layer into broader infrastructure and network-level risk',
        'Findings map directly to CVE identifiers with concrete remediation and patching guidance',
      ],
      limitations: [
        'Only catches known, previously disclosed vulnerabilities — offers zero protection against zero-day issues',
        'Produces false positives requiring manual triage and verification, same as any automated scanner',
        'Doesn\'t test business logic or chained exploitation paths — that\'s specifically what penetration testing (Chapter 40) is for',
        'Nessus Essentials free tier caps scan targets to 16 IP addresses',
      ],
      tools: [
        {
          name: 'OWASP ZAP Dynamic Scanner',
          sub: 'Automated DAST Web Vulnerability Scanner',
          url: 'https://www.zaproxy.org',
          seeChapter: 18,
          desc: 'Used here (see Chapter 18 and Chapter 40) in its core automated-scan mode, run on a recurring schedule against the live application to catch newly disclosed vulnerability patterns matching the OWASP Top 10.',
          adv: [
            'Automated DAST spidering and active vulnerability scanning',
            'Native GitHub Actions / GitLab CI/CD pipeline integration for automated gatekeeping',
            'Exports machine-readable SARIF, JSON, and HTML vulnerability reports',
          ],
          lim: [
            'Active scanning can create high load and generate dummy test records in databases',
          ],
          steps: [
            {
              t: 'Step 1 — Run automated baseline scan in CI pipeline',
              p: 'Execute ZAP docker container against staging environment.',
              c: 'docker run -t zaproxy/zap-stable zap-baseline.py -t https://staging.hrms.internal -r zap-report.html',
            },
            {
              t: 'Step 2 — Triage identified High and Medium findings',
              p: 'Review generated HTML report for SQLi, XSS, and broken CORS headers.',
              c: 'Findings:\n- 0 High Severity\n- 1 Medium: Missing Anti-clickjacking Header (X-Frame-Options)\n- 2 Low: Cookie Without SameSite Attribute',
            },
          ],
        },
        {
          name: 'Nessus Essentials',
          sub: 'Comprehensive Infrastructure & Host Vulnerability Scanner',
          url: 'https://www.tenable.com/products/nessus',
          desc: 'A free (for up to 16 IP addresses) vulnerability scanner covering infrastructure-level checks — network services, outdated OS packages, misconfigurations — drawing on Tenable\'s industry-leading vulnerability database.',
          adv: [
            'Massive database of 180,000+ CVE plugins updated continuously',
            'Audits OS patch levels, SSH configurations, open database ports, and SSL ciphers',
            'Identifies actively exploited vulnerabilities (CISA KEV catalog integration)',
          ],
          lim: [
            'Free tier limited to 16 IP addresses',
          ],
          steps: [
            {
              t: 'Step 1 — Create and launch Basic Network Scan',
              p: 'Configure target subnet IP range and trigger discovery scan.',
              c: 'Target: 192.168.1.10-20 | Scan Policy: Basic Network Scan | Duration: 14m',
            },
            {
              t: 'Step 2 — Analyze CVE severity breakdown and remediation guide',
              p: 'Filter findings by CVSS >= 7.0 and review vendor patch instructions.',
              c: 'Critical: OpenSSL 1.1.1k Vulnerability (CVE-2021-3711 -> Remote Code Execution)\nRemediation: Upgrade openssl to >= 1.1.1l via apt-get upgrade openssl',
            },
            {
              t: 'Step 3 — Re-scan to verify remediation',
              p: 'Execute differential scan to confirm 0 critical host vulnerabilities remain.',
              c: 'Re-scan: 192.168.1.14 -> 0 Critical, 0 High -> PASS',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Automated DAST & Infrastructure CVE Audit',
          body: 'Schedule automated DAST scans and host port assessments to identify unpatched third-party vulnerabilities.',
          doThis: 'Execute weekly Nessus host scan and verify zero unpatched critical CVEs.',
          code: 'docker run --rm -v $(pwd):/zap/wrk/:rw zaproxy/zap-stable zap-full-scan.py -t https://staging.hrms.internal',
        },
      ],
      checklist: ['Scheduled weekly automated vulnerability scans in staging', 'Triaged all Critical and High CVE findings with vendor patches', 'Audited security headers (CSP, HSTS, X-Content-Type-Options)'],
      practice: { title: 'Automated DAST scan pipeline integration', brief: 'Set up a GitHub Actions workflow running OWASP ZAP baseline scan on PRs.' },
      resources: [
        r('tool', 'Tenable Nessus Community', 'https://www.tenable.com/products/nessus', 'EN'),
        r('guide', 'NIST National Vulnerability Database', 'https://nvd.nist.gov', 'EN'),
      ],
    }),

    ch({
      id: 'tt-static-testing',
      kind: 'guide',
      phase: 'Part 12 · Code Quality, Techniques & Visual UI',
      level: 'beginner',
      title: 'Static Testing',
      minutes: 20,
      durationLabel: 'Chapter 45',
      overviewText:
        'Static testing examines an application\'s code, requirements, or design artifacts without actually executing the program — reviewing source code, checking for style and structural issues, and validating documents against standards, all before a single line of code ever runs.',
      why:
        'Some classes of problems are cheapest to catch before execution ever happens at all — a syntax issue, an unused variable, an unreachable code path, an inconsistency between a requirement document and what\'s actually being built. Static testing catches these at the earliest, cheapest possible point in the development cycle, often in seconds, well before a dynamic test would even have the chance to run and reveal the same issue at a much higher cost.',
      when:
        'Continuously, as code is written — ideally directly in the editor and again automatically on every commit via CI, since static analysis is fast, cheap, and doesn\'t require a running application at all. Requirements and design document reviews happen earlier still, before any code is written against them.',
      practical: {
        app: 'HRMS Leave Balance Function',
        scenario:
          'A SonarQube scan flags the calculateRemainingLeave() function for a code smell: deeply nested conditional logic that\'s hard to read and maintain.',
        pass: 'The function is refactored into smaller, named helper functions with early returns, reducing nesting — SonarQube\'s quality gate now passes, and the logic is meaningfully easier for the next developer to safely modify.',
        fail: 'Five levels of nested if statements make the function\'s actual logic difficult to follow and prone to future editing mistakes, even though it currently works correctly.',
      },
      advantages: [
        'Catches issues before any code runs, at the cheapest possible point in the development cycle',
        'Fast enough to run on every keystroke in the editor or every commit in CI, with zero runtime overhead',
        'SonarQube\'s trend dashboard makes overall codebase health and technical debt visible over time',
        'ESLint catches real bugs (unused variables, race conditions, unreachable code) alongside style issues',
      ],
      limitations: [
        'Cannot catch runtime-only issues — data-dependent bugs that manifest only with specific inputs stay invisible',
        'Rule sets need careful tuning to avoid overwhelming developers with noisy false-positive lints',
        'Doesn\'t verify actual application behavior, only code structure and compliance with configured rules',
        'SonarQube self-hosting incurs ongoing infrastructure and maintenance costs',
      ],
      tools: [
        {
          name: 'SonarQube Community Edition',
          sub: 'Self-Hosted Code Quality, Security & Technical Debt Platform',
          url: 'https://sonarsource.com/products/sonarqube',
          desc: 'A free, self-hostable static code analysis platform covering multiple languages, checking for code smells, bugs, security vulnerabilities, and duplicated code, with a dashboard tracking code quality trends over time across an entire codebase.',
          adv: [
            'Analyzes 30+ programming languages for Bugs, Vulnerabilities, and Code Smells',
            'Automated Quality Gates block PR merges on new vulnerabilities or low test coverage',
            'Calculates technical debt remediation time estimates in hours and days',
          ],
          lim: [
            'Requires hosting a server instance and database (Postgres)',
          ],
          steps: [
            {
              t: 'Step 1 — Integrate SonarScanner in GitHub Actions CI',
              p: 'Add scanner step to pull request validation workflow.',
              c: '- name: SonarQube Scan\n  uses: SonarSource/sonarqube-scan-action@v2\n  env:\n    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}\n    SONAR_HOST_URL: \'https://sonarqube.internal\'',
            },
            {
              t: 'Step 2 — Configure Quality Gate thresholds in sonar-project.properties',
              p: 'Enforce zero new bugs and maintain >80% test coverage on new code.',
              c: 'sonar.projectKey=hrms-core\nsonar.sources=src\nsonar.qualitygate.wait=true',
            },
            {
              t: 'Step 3 — Review findings dashboard and refactor high-cognitive complexity blocks',
              p: 'Inspect flagged nested branches and refactor to guard clauses.',
              c: 'SonarQube Alert: Cognitive Complexity of calculateLeave() is 18 (allowed: 15)\nAction: Refactored 5 nested ifs into early returns -> Cognitive Complexity reduced to 6 -> Quality Gate PASSED',
            },
          ],
        },
        {
          name: 'ESLint',
          sub: 'Pluggable JavaScript & TypeScript Static Analysis Linter',
          url: 'https://eslint.org',
          desc: 'A widely used, configurable JavaScript/TypeScript linter — checks code against a defined set of style and correctness rules directly in the editor and in CI, catching issues like unused variables, unreachable code, and inconsistent style before code is even committed.',
          adv: [
            'Instant in-editor feedback under 50ms as you type',
            'Automated auto-fixing (`--fix`) fixes hundreds of formatting and syntax issues automatically',
            'Extensible ecosystem with typescript-eslint, react-hooks, and security plugins',
          ],
          lim: [
            'Confined to JavaScript, TypeScript, and JSON files',
          ],
          steps: [
            {
              t: 'Step 1 — Configure eslint.config.mjs with recommended security and type rules',
              p: 'Set up strict typescript-eslint and react rules.',
              c: 'import tsPlugin from \'@typescript-eslint/eslint-plugin\';\nexport default [\n  tsPlugin.configs[\'recommended-type-checked\'],\n  { rules: { \'no-unused-vars\': \'error\', \'no-floating-promises\': \'error\' } }\n];',
            },
            {
              t: 'Step 2 — Run linter in CI and pre-commit hooks via husky',
              p: 'Prevent invalid code from being committed.',
              c: 'npx eslint src/ --max-warnings=0\nResult: 0 errors, 0 warnings (100% clean build)',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Static Code Analysis & Quality Gate Enforcement',
          body: 'Analyze source code using AST parsers detecting dead code, type mismatches, and cognitive complexity anomalies.',
          doThis: 'Execute ESLint and SonarScanner locally before pushing pull requests.',
          code: 'npx eslint src/ && npx sonarqube-scanner',
        },
      ],
      checklist: ['Configured strict linter rules in editor and pre-commit hook', 'Enforced Quality Gate blocking PRs on new bugs or security flaws', 'Eliminated code duplication and reduced cognitive complexity'],
      practice: { title: 'SonarQube quality gate and ESLint setup', brief: 'Configure a strict TypeScript ESLint config and SonarQube quality gate for a project.' },
      resources: [
        r('tool', 'ESLint Official Documentation', 'https://eslint.org/docs', 'EN'),
        r('tool', 'SonarQube Documentation', 'https://docs.sonarsource.com/sonarqube', 'EN'),
      ],
    }),

    ch({
      id: 'tt-dynamic-testing',
      kind: 'guide',
      phase: 'Part 12 · Code Quality, Techniques & Visual UI',
      level: 'beginner',
      title: 'Dynamic Testing',
      minutes: 20,
      durationLabel: 'Chapter 46',
      overviewText:
        'Dynamic testing evaluates an application by actually executing it with real inputs and observing real outputs and behavior — the umbrella category covering nearly every testing type elsewhere in this manual that involves running the software, in direct contrast to static testing\'s code-only, no-execution approach.',
      why:
        'Static testing can catch a real class of issues before execution, but it fundamentally cannot verify that the application actually behaves correctly for a real user — that requires actually running it. Dynamic testing is where functional correctness, real performance, real user experience, and real integration between components are all ultimately proven, since no amount of code review alone can substitute for observing the actual running system.',
      when:
        'Throughout the entire testing process, essentially anywhere the application is actually running and being interacted with — this chapter names the category rather than introducing a new activity, since functional, system, performance, and most other chapters in this manual are all forms of dynamic testing.',
      practical: {
        app: 'HRMS Leave Balance Function (Dynamic Execution)',
        scenario:
          'The same calculateRemainingLeave() function from Chapter 45\'s static example is dynamically tested by actually calling it with real employee data across a range of scenarios.',
        pass: 'Re-running the same dynamic test with a zero balance now correctly returns a blocked request, verified by actually executing the function rather than just reading it.',
        fail: 'Calling the function with a leave balance of exactly zero returns a negative number instead of correctly blocking the request — a runtime behavior bug that static analysis, which only reviewed the code\'s structure, never caught since the code was syntactically fine.',
      },
      advantages: [
        'The only way to verify actual runtime behavior — no amount of code review substitutes for observing the real running system',
        'Directly validates the real user experience, network requests, and database transactions',
        'Covers the vast majority of meaningful testing activity, since most bugs that matter to users only manifest at runtime',
        'Encompasses nearly every specific testing type covered elsewhere in this manual',
      ],
      limitations: [
        'Requires a running, executable application and configured test environment — cannot be done from source alone',
        'Slower and more resource-intensive than static analysis',
        'Test coverage depends strictly on which scenarios are executed — unexecuted execution paths remain untested',
        'Best paired with static testing rather than used in isolation',
      ],
      tools: [
        {
          name: 'Playwright Dynamic Test Engine',
          sub: 'Cross-Browser Dynamic Runtime Execution Framework',
          url: 'https://playwright.dev',
          seeChapter: 6,
          desc: 'Automates dynamic testing directly (see Chapter 6 and Chapter 36) — driving a real, running browser through real interactions and observing real resulting behavior, the defining characteristic of dynamic testing.',
          adv: [
            'Interacts with real DOM nodes, WebSockets, cookies, and local storage',
            'Asserts live network responses and dynamic client-side state transitions',
          ],
          lim: [
            'Requires compiled and running frontend/backend servers',
          ],
          steps: [
            {
              t: 'Step 1 — Execute live browser interaction script',
              p: 'Drive real browser session through leave submission workflow.',
              c: 'await page.goto(\'http://localhost:3000/dashboard\');\nawait page.click(\'#apply-leave-btn\');\nawait page.fill(\'#days-input\', \'0\');\nawait page.click(\'#submit-btn\');',
            },
            {
              t: 'Step 2 — Assert runtime error handling and DOM validation',
              p: 'Confirm application dynamically blocks 0-day submission with visible toast error.',
              c: 'await expect(page.locator(\'.toast-error\')).toHaveText(\'Leave days must be at least 1\');\nawait expect(page.locator(\'#leave-balance\')).toHaveText(\'10 Days Remaining\');',
            },
          ],
        },
        {
          name: 'Selenium WebDriver',
          sub: 'Industry Standard Browser Automation Protocol',
          url: 'https://www.selenium.dev',
          seeChapter: 6,
          desc: 'Drives real browsers across native operating systems (see Chapter 6) executing dynamic test assertions against live web applications.',
          adv: [
            'W3C standard WebDriver protocol supported across all major browsers',
            'Direct multi-language bindings for Java, Python, C#, and Ruby',
          ],
          lim: [
            'Requires external driver binaries (chromedriver, geckodriver)',
          ],
          steps: [
            {
              t: 'Step 1 — Launch WebDriver instance and navigate to target',
              p: 'Initialize browser driver and execute dynamic HTTP request.',
              c: 'WebDriver driver = new ChromeDriver();\ndriver.get("https://hrms.internal/login");',
            },
            {
              t: 'Step 2 — Execute dynamic form interaction',
              p: 'Interact with live DOM elements and assert page title change.',
              c: 'driver.findElement(By.id("username")).sendKeys("admin");\ndriver.findElement(By.id("submit")).click();\nassertEquals("Dashboard", driver.getTitle());',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Live Runtime Execution & Boundary Assertion',
          body: 'Execute running application binaries stimulating real boundary conditions and validating HTTP state transitions.',
          doThis: 'Execute Playwright dynamic runtime suite against local dev server.',
          code: 'npx playwright test tests/dynamic/leave-boundary.spec.ts',
        },
      ],
      checklist: ['Verified live runtime execution across valid and invalid inputs', 'Audited state transitions on UI, database, and cache layers', 'Paired dynamic execution passes with prior static analysis checks'],
      practice: { title: 'Dynamic test suite implementation', brief: 'Implement a suite of Playwright dynamic tests asserting 0-day, negative, and max leave submissions.' },
      resources: [
        r('tool', 'Playwright Test Guide', 'https://playwright.dev/docs/intro', 'EN'),
        r('guide', 'Dynamic Testing Methodology', 'https://www.guru99.com/dynamic-testing.html', 'EN'),
      ],
    }),

    ch({
      id: 'tt-gui-testing',
      kind: 'guide',
      phase: 'Part 12 · Code Quality, Techniques & Visual UI',
      level: 'intermediate',
      title: 'GUI Testing',
      minutes: 25,
      durationLabel: 'Chapter 47',
      overviewText:
        'GUI testing verifies the graphical user interface itself — buttons, forms, menus, layout, visual elements, and their interactive behavior — checking that what\'s rendered looks and behaves correctly, distinct from testing the underlying business logic those UI elements happen to trigger.',
      why:
        'The UI is what a user actually sees and touches, and a perfectly correct backend can still fail a real user if a button is misaligned, a dropdown doesn\'t open, a form field doesn\'t accept expected input, or a modal fails to close — none of which necessarily reflects a business logic bug at all, just a UI-layer defect. GUI testing focuses specifically on this visible, interactive surface, which is exactly where most real users spend all of their attention.',
      when:
        'Throughout UI development, on every new screen or component, and again during full regression passes before release — particularly important after any UI framework upgrade, redesign, or styling change, since these can silently break visual or interactive elements without touching any underlying logic at all.',
      practical: {
        app: 'HRMS Leave Request Submit Button',
        scenario:
          'A GUI test both clicks the \'Submit\' button (functional) and visually snapshots the button\'s appearance (visual) after a recent styling update.',
        pass: 'The button\'s contrast is corrected, the visual snapshot matches an updated approved baseline, and both the functional click and visual appearance are confirmed correct together.',
        fail: 'The button correctly submits the form, but the visual snapshot shows it\'s now rendered in a low-contrast gray-on-gray color scheme following a recent style change — technically functional, but visually broken in a way only the visual comparison catches.',
      },
      advantages: [
        'Directly verifies the exact surface real users interact with and judge the product by',
        'Applitools\' visual AI meaningfully reduces false positives compared to simple pixel-diff comparisons',
        'Selenium/Playwright interaction testing catches functional GUI defects (unresponsive buttons, broken dropdowns)',
        'Can be automated and run continuously in CI pipelines',
      ],
      limitations: [
        'Purely functional GUI tests won\'t catch visual-only issues like misaligned text that is still clickable',
        'Applitools free tier limits visual checkpoints/snapshots available per month',
        'GUI tests require more maintenance than API tests as visual design evolves',
        'Doesn\'t evaluate whether the GUI is intuitive — that is Usability Testing\'s scope (Chapter 12)',
      ],
      tools: [
        {
          name: 'Selenium GUI Driver',
          sub: 'Functional DOM & Interactive Element Automation',
          url: 'https://www.selenium.dev',
          seeChapter: 6,
          desc: 'Automates interaction with GUI elements directly (see Chapter 6) — clicking buttons, filling forms, opening menus — verifying they respond correctly to real interaction, the core of functional GUI testing.',
          adv: [
            'Simulates real user mouse clicks, keyboard strokes, drag-and-drop, and hover interactions',
            'Explicit WebDriverWait handles dynamic AJAX element rendering smoothly',
          ],
          lim: [
            'Does not detect visual color contrast or layout misalignment issues on its own',
          ],
          steps: [
            {
              t: 'Step 1 — Locate and interact with GUI dropdown components',
              p: 'Select option from interactive leave type dropdown menu.',
              c: 'WebElement dropdown = driver.findElement(By.id("leave-type-select"));\nSelect select = new Select(dropdown);\nselect.selectByVisibleText("Annual Leave");',
            },
            {
              t: 'Step 2 — Verify modal dialog opens and closes smoothly',
              p: 'Click trigger and assert modal overlay visibility in the DOM.',
              c: 'driver.findElement(By.id("open-policy-modal")).click();\nWebElement modal = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("policy-modal")));\nassertTrue(modal.isDisplayed());',
            },
          ],
        },
        {
          name: 'Applitools Eyes',
          sub: 'AI-Powered Visual GUI & Contrast Validation',
          url: 'https://applitools.com',
          desc: 'An AI-powered visual testing platform that goes beyond functional interaction to compare how a UI actually looks against a baseline, using visual AI to intelligently distinguish meaningful visual changes from harmless rendering noise.',
          adv: [
            'Visual AI algorithm ignores pixel anti-aliasing noise and focuses on real human-visible discrepancies',
            'Automated cross-browser and cross-device visual layout checks in cloud Ultrafast Grid',
            'Automated WCAG color contrast compliance verification built into visual snapshots',
          ],
          lim: [
            'Free tier limited to 100 visual checkpoints per month',
          ],
          steps: [
            {
              t: 'Step 1 — Initialize Applitools Eyes in test suite',
              p: 'Configure API key and open visual session.',
              c: 'import { Eyes, Target } from \'@applitools/eyes-playwright\';\nconst eyes = new Eyes();\nawait eyes.open(page, \'HRMS App\', \'Leave Form GUI Check\');',
            },
            {
              t: 'Step 2 — Capture visual snapshot of interactive form',
              p: 'Check entire DOM snapshot against AI baseline.',
              c: 'await page.goto(\'/leave/apply\');\nawait eyes.check(\'Apply Leave Form Initial View\', Target.window().fully());\nawait eyes.close();',
            },
            {
              t: 'Step 3 — Review AI visual diff in Applitools dashboard',
              p: 'Inspect highlighted color contrast defect on primary CTA button.',
              c: 'Dashboard:\n- Flagged Defect: Submit button contrast ratio 2.1:1 (Fails WCAG AA minimum 4.5:1)\n- Action: Update button background from #CCCCCC to #1C2A26 -> Re-run -> 100% Match',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Interactive GUI Component Verification',
          body: 'Script clicks, hovers, modal triggers, and form validations verifying UI responsiveness and visual appearance.',
          doThis: 'Execute Playwright GUI interaction and Applitools visual check.',
          code: 'npx eyes-playwright test tests/gui/components.spec.ts',
        },
      ],
      checklist: ['Verified all interactive states (hover, focus, disabled, active)', 'Audited color contrast ratios against WCAG 2.1 AA (>= 4.5:1)', 'Automated modal, dropdown, and tooltip visibility assertions'],
      practice: { title: 'GUI component interaction and visual test', brief: 'Write automated tests checking form inputs, select dropdowns, and modal dialogs.' },
      resources: [
        r('tool', 'Applitools Official Tutorial', 'https://applitools.com/tutorials', 'EN'),
        r('guide', 'W3C WAI-ARIA Authoring Practices', 'https://www.w3.org/WAI/ARIA/apg', 'EN'),
      ],
    }),

    ch({
      id: 'tt-visual-regression-testing',
      kind: 'guide',
      phase: 'Part 12 · Code Quality, Techniques & Visual UI',
      level: 'intermediate',
      title: 'Visual Regression Testing',
      minutes: 25,
      durationLabel: 'Chapter 48',
      overviewText:
        'Visual regression testing captures screenshots of an application\'s UI and automatically compares them against a previously approved baseline, flagging any pixel-level (or perceptually meaningful) visual differences — catching unintended appearance changes that functional tests, which only check behavior, would never notice.',
      why:
        'A code change can leave every functional test green — every button still clicks, every form still submits — while silently breaking the visual appearance: a CSS change bleeds into an unrelated component, a font fails to load, spacing shifts unexpectedly. These are real, user-visible defects that pure functional testing structurally cannot detect, since functionality and appearance are genuinely separate concerns.',
      when:
        'On every UI-affecting change, ideally in CI on every pull request — most valuable specifically for shared components and design-system elements, where an unintended visual change can silently ripple across many pages that all depend on that one shared piece.',
      practical: {
        app: 'HRMS Shared Button Component',
        scenario:
          'A shared <Button> component used across dozens of pages in the HRMS has its default padding changed as part of an unrelated ticket.',
        pass: 'The team confirms the padding change was actually intentional and desired everywhere, approves the new baseline across all 23 scenarios at once, and the visual regression suite now reflects the updated, intended design.',
        fail: 'BackstopJS flags visual differences across 23 different pages/scenarios that all use the shared component — a change intended for one specific screen unintentionally affected every page using that component, caught immediately rather than discovered piecemeal by users.',
      },
      advantages: [
        'Catches purely visual regressions that no functional test, however thorough, would ever detect',
        'Percy integrates directly into existing Playwright/Cypress suites without writing new test flows',
        'BackstopJS is fully free and self-hosted, with zero account or usage-tier limits',
        'Invaluable for design systems and shared UI component libraries',
      ],
      limitations: [
        'Requires an established, deliberately maintained baseline to avoid constant noisy diffs',
        'Every intentional design change requires updating and approving the new baseline',
        'Sensitive to font rendering differences across different CI host OS environments unless containerized',
        'Doesn\'t verify backend functional correctness — pairs with, not replaces, functional testing',
      ],
      tools: [
        {
          name: 'Percy by BrowserStack',
          sub: 'Cloud Automated Visual Review & PR Diff Platform',
          url: 'https://percy.io',
          desc: 'A visual review platform that integrates with existing test suites (Selenium, Cypress, Playwright) to automatically capture screenshots during test runs and compare them against an approved baseline, presenting visual diffs for review directly in pull requests.',
          adv: [
            'Zero-friction SDK integration (`percySnapshot(page, \'Name\')`) into existing test suites',
            'Automated visual rendering across Chrome, Firefox, Edge, and Safari at multiple breakpoints',
            'Direct GitHub/GitLab PR integration with visual approval check gates',
          ],
          lim: [
            'Free tier provides 5,000 visual snapshots per month',
          ],
          steps: [
            {
              t: 'Step 1 — Install Percy Playwright SDK',
              p: 'Add @percy/playwright to project dependencies.',
              c: 'npm install --save-dev @percy/cli @percy/playwright',
            },
            {
              t: 'Step 2 — Add visual snapshots into existing Playwright tests',
              p: 'Trigger DOM snapshot upload at key UI states.',
              c: 'import percySnapshot from \'@percy/playwright\';\n\ntest(\'Visual regression check on dashboard\', async ({ page }) => {\n  await page.goto(\'/dashboard\');\n  await percySnapshot(page, \'HRMS Dashboard Home\', { widths: [375, 768, 1280] });\n});',
            },
            {
              t: 'Step 3 — Run test suite with Percy CLI in CI',
              p: 'Execute tests and upload DOM assets for rendering.',
              c: 'npx percy exec -- npx playwright test',
            },
            {
              t: 'Step 4 — Review visual diffs on GitHub PR',
              p: 'Inspect highlighted pixel changes and click \'Approve\' to set new baseline.',
              c: 'Percy Bot: 1 visual change detected in \'HRMS Dashboard Home\' (1280px)\nDiff: Navigation sidebar padding shifted by 8px\nAction: Approved by Lead Designer',
            },
          ],
        },
        {
          name: 'BackstopJS',
          sub: 'Open-Source Self-Hosted Visual Regression Engine',
          url: 'https://github.com/garris/BackstopJS',
          desc: 'A free, open-source visual regression tool that\'s fully self-hosted (no account or paid tier needed at all) — captures screenshots at defined breakpoints/scenarios and generates an HTML report highlighting pixel differences against a saved reference set.',
          adv: [
            '100% free and open-source with unlimited local/CI runs',
            'Config-driven scenarios (`backstop.json`) without writing complex test scripts',
            'Runs inside official Docker container to eliminate cross-platform font rendering diffs',
          ],
          lim: [
            'Requires hosting and managing reference image files in Git or S3',
          ],
          steps: [
            {
              t: 'Step 1 — Initialize BackstopJS configuration',
              p: 'Generate backstop.json specifying viewports and URLs.',
              c: 'npx backstop init',
            },
            {
              t: 'Step 2 — Create reference baseline screenshots',
              p: 'Capture initial golden master screenshots across viewports.',
              c: 'npx backstop reference',
            },
            {
              t: 'Step 3 — Execute visual regression test against modified code',
              p: 'Capture new screenshots and compare against reference images.',
              c: 'npx backstop test\nReport: 22 passed, 1 failed (Shared button component padding altered)',
            },
            {
              t: 'Step 4 — Approve intentional visual updates',
              p: 'Promote new screenshots to become the updated reference baseline.',
              c: 'npx backstop approve',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Pixel-Level Snapshot Baseline Comparison',
          body: 'Capture viewport screenshots of components across breakpoints and assert zero unexpected pixel variations.',
          doThis: 'Execute BackstopJS visual regression suite and inspect HTML diff report.',
          code: 'npx backstop test',
        },
      ],
      checklist: ['Captured reference screenshots across mobile, tablet, and desktop viewports', 'Enforced visual regression gate in pull request CI workflows', 'Containerized test execution in Docker for consistent font rendering'],
      practice: { title: 'Visual regression test suite configuration', brief: 'Set up BackstopJS for a design system component library across 3 breakpoints.' },
      resources: [
        r('tool', 'Percy Documentation', 'https://docs.percy.io', 'EN'),
        r('tool', 'BackstopJS GitHub Repository', 'https://github.com/garris/BackstopJS', 'EN'),
      ],
    }),

    ch({
      id: 'tt-negative-testing',
      kind: 'guide',
      phase: 'Part 13 · Test Design Techniques & Partitioning',
      level: 'beginner',
      title: 'Negative Testing',
      minutes: 20,
      durationLabel: 'Chapter 49',
      overviewText:
        'Negative testing deliberately feeds an application invalid, unexpected, or malformed input — the opposite of what the system is designed to correctly handle — to verify it fails gracefully with a clear, correct error, rather than crashing, behaving unpredictably, or silently accepting something it shouldn\'t.',
      why:
        'Most requirements describe what the system should do with valid input, but real users (and real attackers) inevitably provide invalid input too — an empty required field, a negative number where only positive makes sense, a wildly out-of-range date. Without deliberate negative testing, these paths often go completely unverified, since they\'re the paths nobody thinks to check when the focus is naturally on "does the feature work."',
      when:
        'Alongside every positive test case, as a matching pair — any input field, form, or endpoint tested for correct valid behavior should also be tested for correct handling of invalid input, ideally designed together at the same time rather than as an afterthought.',
      practical: {
        app: 'HRMS Leave Request Date Field',
        scenario:
          'The leave request form\'s start-date field is negative-tested with a range of invalid inputs.',
        pass: 'The same input is now rejected with a clear "Please enter a valid date within the next 2 years" error, and no record is created.',
        fail: 'Submitting a start date in the year 1900 is silently accepted and saved without any validation error — the form only checks that a date is present, not that it\'s realistic.',
      },
      advantages: [
        'Catches an entire class of real-world input that valid-only testing structurally never exercises',
        'Directly improves error handling quality and user-facing error messages, not just crash prevention',
        'Surfaces security-relevant gaps since many vulnerabilities begin with unexpected/malformed input',
        'Cheap to design alongside positive test cases during initial feature analysis',
      ],
      limitations: [
        'The space of possible invalid inputs is technically infinite — prioritization toward realistic and high-risk invalid inputs is necessary',
        'Easy to under-invest in relative to positive testing when delivery deadlines press',
        'Does not guarantee complete coverage against inputs nobody thought to try',
        'Requires clear expected-error-behavior specifications to test against',
      ],
      tools: [
        {
          name: 'Manual Negative Testing Mindset',
          sub: 'Heuristic Error & Boundary Injection',
          url: 'https://hearth-learn.vercel.app/manuals/testing-types',
          seeChapter: 5,
          desc: 'Negative testing isn\'t a separate tool, but a deliberate mindset (see Chapter 5) applied within existing testing workflows — asking "what\'s the wrong input, and does the system handle it gracefully?"',
          adv: [
            'Zero software setup required — focuses on creative edge-case injection',
            'Audits user-facing error message clarity, grammar, and field highlighting',
          ],
          lim: [
            'Manual execution of large negative permutations is labor intensive',
          ],
          steps: [
            {
              t: 'Step 1 — Identify invalid input permutations',
              p: 'List negative scenarios: past dates, empty mandatory strings, special character strings, and type mismatches.',
              c: 'Test Vectors:\n1. Start Date: 01/01/1900\n2. Leave Days: -5\n3. Employee ID: \' OR \'1\'=\'1',
            },
            {
              t: 'Step 2 — Submit negative payloads and assert error responses',
              p: 'Confirm form highlights invalid fields with red borders and clear guidance.',
              c: 'Expected Response: HTTP 422 Unprocessable Entity\nUI Banner: "Start date must be between today and +2 years"',
            },
          ],
        },
        {
          name: 'Postman Negative API Suite',
          sub: 'Schema Validation & Status Code Verification',
          url: 'https://www.postman.com',
          seeChapter: 2,
          desc: 'Automates negative API assertions (see Chapter 2 and Chapter 34) ensuring endpoints reject malformed JSON, missing fields, and bad data types with appropriate 4xx status codes.',
          adv: [
            'Asserts HTTP 400, 401, 403, and 422 response status codes automatically',
            'Validates error response schemas with Chai assertions',
          ],
          lim: [
            'Requires maintaining negative test collection JSONs',
          ],
          steps: [
            {
              t: 'Step 1 — Send invalid payload to leave request API',
              p: 'Transmit POST request missing mandatory \'reason\' property.',
              c: 'pm.test("Status code is 400 Bad Request", function () {\n    pm.response.to.have.status(400);\n});\npm.test("Error message is descriptive", function () {\n    var json = pm.response.json();\n    pm.expect(json.error).to.eql("Field \'reason\' is required");\n});',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Deliberate Invalid Payload & Type Assertion',
          body: 'Submit out-of-range, null, negative, and malformed inputs to form fields and API parameters verifying graceful error handling.',
          doThis: 'Design a 1:1 matching negative test matrix for all existing positive test cases.',
          code: 'curl -X POST https://staging.hrms.internal/api/leave -d \'{"days": -5}\' -H "Content-Type: application/json"',
        },
      ],
      checklist: ['Identified invalid permutations for every required field', 'Verified user-facing error message clarity and formatting', 'Confirmed zero database state mutations on rejected requests'],
      practice: { title: 'Negative test suite design for user registration', brief: 'Design 15 negative test cases targeting invalid emails, weak passwords, and duplicate user records.' },
      resources: [
        r('guide', 'OWASP Input Validation Cheat Sheet', 'https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html', 'EN'),
        r('tool', 'Postman API Testing Guide', 'https://learning.postman.com/docs/writing-scripts/test-scripts', 'EN'),
      ],
    }),

    ch({
      id: 'tt-positive-testing',
      kind: 'guide',
      phase: 'Part 13 · Test Design Techniques & Partitioning',
      level: 'beginner',
      title: 'Positive Testing',
      minutes: 15,
      durationLabel: 'Chapter 50',
      overviewText:
        'Positive testing verifies that an application behaves correctly when given valid, expected input exactly as the requirements describe — confirming the system does what it\'s supposed to do under normal, correct-usage conditions, the direct counterpart to negative testing\'s focus on invalid input.',
      why:
        'Before checking that a system correctly rejects what it shouldn\'t accept, it has to first be confirmed that it correctly accepts and processes what it should — positive testing is the foundational baseline check that a feature actually works at all under its intended, expected conditions. Without it as a deliberate, explicit practice, teams can end up assuming a feature works simply because no one has reported it broken yet.',
      when:
        'As the first, most basic layer of test coverage for any new feature — typically the very first test case written for any given piece of functionality, establishing the expected-behavior baseline that other test types (negative, boundary) build outward from.',
      practical: {
        app: 'HRMS Leave Request Submission',
        scenario:
          'The leave request form is positive-tested with a straightforward, entirely valid submission.',
        pass: 'Submitting a leave request for 3 valid future dates, with a valid reason and an employee who has sufficient balance, correctly creates the request and shows a confirmation — establishing that the core intended flow works exactly as designed before any edge case or invalid input is considered.',
        fail: 'A valid submission fails with an unhandled exception or hangs indefinitely on submission, indicating core baseline functional logic is broken.',
      },
      advantages: [
        'Establishes the essential baseline confirmation that a feature actually works as intended before anything else is tested',
        'Simple and fast to design and execute, directly following from stated business requirements',
        'Forms the foundation that negative and boundary testing build on and complement',
        'Directly validates the core business value the feature was built to deliver',
      ],
      limitations: [
        'On its own, says nothing about how the system handles invalid input, edge cases, or real-world imperfect usage',
        'Can create false confidence if treated as sufficient coverage without negative testing',
        'Does not stress-test the edges of valid ranges — that is Boundary Value Analysis\'s role (Chapter 51)',
        'A feature that only gets positive-tested will have its failure modes discovered by real users',
      ],
      tools: [
        {
          name: 'Manual Positive Flow Verification',
          sub: 'Baseline Specification Verification',
          url: 'https://hearth-learn.vercel.app/manuals/testing-types',
          seeChapter: 5,
          desc: 'Positive testing uses standard manual verification (see Chapter 5) with the specific, deliberate goal of confirming valid, expected input produces valid, expected output.',
          adv: [
            'Directly verifies requirement acceptance criteria',
            'Fastest validation method during early development spikes',
          ],
          lim: [
            'Subject to human tester bias toward happy-path only testing',
          ],
          steps: [
            {
              t: 'Step 1 — Prepare valid dataset matching requirements',
              p: 'Select active employee with 15 days balance, set valid future dates, and provide normal text reason.',
              c: 'Payload: { employeeId: "EMP-1042", startDate: "2026-09-01", days: 3, reason: "Annual Vacation" }',
            },
            {
              t: 'Step 2 — Submit request and verify confirmation banner',
              p: 'Confirm database updates balance from 15 to 12 and UI shows \'Application Submitted Successfully\'.',
              c: 'Result: HTTP 201 Created | Leave Balance: 12 | Status: Pending Manager Approval -> PASS',
            },
          ],
        },
        {
          name: 'Playwright / Selenium Positive Automation',
          sub: 'Automated Happy Path Regression Suite',
          url: 'https://playwright.dev',
          seeChapter: 6,
          desc: 'Automates positive end-to-end flows (see Chapter 6) ensuring new builds don\'t regress core functional happy paths.',
          adv: [
            'Executes in CI on every commit in under 30 seconds',
            'Captures trace recordings and screenshots of successful completions',
          ],
          lim: [
            'Must be paired with negative suites for comprehensive safety',
          ],
          steps: [
            {
              t: 'Step 1 — Script automated positive test in Playwright',
              p: 'Fill valid inputs and assert redirect to confirmation view.',
              c: 'test(\'Valid leave request submits successfully\', async ({ page }) => {\n  await page.goto(\'/leave/new\');\n  await page.fill(\'#startDate\', \'2026-09-01\');\n  await page.fill(\'#days\', \'3\');\n  await page.fill(\'#reason\', \'Vacation\');\n  await page.click(\'#submitBtn\');\n  await expect(page.locator(\'.success-alert\')).toBeVisible();\n});',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Happy-Path Baseline Specification Verification',
          body: 'Verify primary business user flows with valid, compliant inputs confirming intended functionality executes cleanly.',
          doThis: 'Execute core acceptance test scenarios validating state transitions against business criteria.',
          code: 'npx playwright test tests/positive/leave-creation.spec.ts',
        },
      ],
      checklist: ['Verified all mandatory and optional fields with valid inputs', 'Audited persistent state changes in database records', 'Confirmed confirmation alerts and redirect destinations'],
      practice: { title: 'Positive functional test matrix creation', brief: 'Create a comprehensive positive test suite for a shopping cart checkout flow.' },
      resources: [
        r('tool', 'Playwright Official Getting Started', 'https://playwright.dev/docs/intro', 'EN'),
        r('guide', 'ISTQB Foundation Level Syllabus', 'https://www.istqb.org', 'EN'),
      ],
    }),

    ch({
      id: 'tt-boundary-value-analysis',
      kind: 'guide',
      phase: 'Part 13 · Test Design Techniques & Partitioning',
      level: 'beginner',
      title: 'Boundary Value Analysis',
      minutes: 20,
      durationLabel: 'Chapter 51',
      overviewText:
        'Boundary value analysis specifically targets test inputs at, just above, and just below the edges of valid input ranges — since bugs disproportionately cluster at exactly these boundary points (off-by-one errors, incorrect comparison operators), rather than spreading evenly across the entire range of possible input.',
      why:
        'A field accepting values from 1 to 100 is far more likely to have a bug at exactly 0, 1, 100, or 101 than at some arbitrary value like 47 — a <= mistakenly written as <, or a loop that runs one iteration too many or too few, is a boundary-specific class of bug that testing only the "safe middle" of a range would never reveal. Boundary value analysis concentrates testing effort precisely where defects are statistically most likely to actually live.',
      when:
        'Whenever a field, parameter, or condition has a defined valid range or threshold — numeric ranges, date ranges, string length limits, or any comparison-based business rule (e.g. "leave balance must be greater than or equal to requested days").',
      practical: {
        app: 'HRMS Leave Balance Boundary',
        scenario:
          'The leave request form is boundary-tested against an employee with exactly 5 days of remaining leave balance.',
        pass: 'Requesting exactly 5 days is now correctly accepted, while requesting 6 days (one over the boundary) is still correctly rejected.',
        fail: 'Requesting exactly 5 days (equal to the full remaining balance) is incorrectly rejected with an error, even though the business rule states a request "up to and including" the full balance should be allowed — an off-by-one bug using < instead of <= in the balance check.',
      },
      advantages: [
        'Concentrates testing effort precisely where real bugs statistically cluster, rather than spreading it evenly and inefficiently',
        'Directly catches off-by-one errors and incorrect comparison operators (< vs <=)',
        'Requires relatively few test cases (3 per boundary: Min-1, Min, Min+1, Max-1, Max, Max+1) for high defect-detection yield',
        'Straightforward to apply systematically to any field with defined numeric, date, or length bounds',
      ],
      limitations: [
        'Only effective where a genuine range or threshold exists — does not apply to unconstrained free-text fields',
        'Requires valid ranges to be explicitly known and documented',
        'Does not cover broad invalid formats (e.g. letters in numeric fields) — pairs with negative testing',
        'Interacting multi-variable boundaries can lead to combinatorial expansion',
      ],
      tools: [
        {
          name: 'Manual 3-Point Boundary Matrix',
          sub: 'Minimum, Maximum & Neighbor Value Analysis',
          url: 'https://hearth-learn.vercel.app/manuals/testing-types',
          seeChapter: 5,
          desc: 'A systematic test design technique (see Chapter 5) constructing 3 test values around every boundary: [Boundary - 1], [Boundary], and [Boundary + 1].',
          adv: [
            'High ROI defect yield per test case',
            'Clear mathematical structure easily reviewed in QA test plans',
          ],
          lim: [
            'Manual entry requires diligence across multiple input fields',
          ],
          steps: [
            {
              t: 'Step 1 — Identify Boundary Conditions for Leave Days (1 to 30)',
              p: 'Calculate 3-point boundary values for Min (1) and Max (30).',
              c: 'Lower Boundary (1):\n- 0 (Invalid / Blocked)\n- 1 (Valid Min / Allowed)\n- 2 (Valid / Allowed)\n\nUpper Boundary (30):\n- 29 (Valid / Allowed)\n- 30 (Valid Max / Allowed)\n- 31 (Invalid / Blocked)',
            },
            {
              t: 'Step 2 — Execute boundary assertions in test environment',
              p: 'Submit each value and record HTTP response status.',
              c: 'Days = 0 -> 422 Unprocessable Entity (PASS)\nDays = 1 -> 201 Created (PASS)\nDays = 30 -> 201 Created (PASS)\nDays = 31 -> 422 Unprocessable Entity (PASS)',
            },
          ],
        },
        {
          name: 'Automated Parameterized Boundary Runner',
          sub: 'Jest / PyTest Parameterized Boundary Suites',
          url: 'https://playwright.dev',
          seeChapter: 6,
          desc: 'Executes parameterized boundary test tables automatically across unit, integration, and E2E layers (see Chapter 6).',
          adv: [
            'Tests dozens of boundary values in milliseconds',
            'Ensures off-by-one regressions cannot re-enter the codebase',
          ],
          lim: [
            'Requires defining parameter arrays in test files',
          ],
          steps: [
            {
              t: 'Step 1 — Write parameterized Jest test table',
              p: 'Assert boundary validation logic directly against leave calculation function.',
              c: 'test.each([\n  [0, false],\n  [1, true],\n  [5, true],\n  [6, false]\n])(\'validateRequestedDays(%i, maxBalance=5) should return %s\', (days, expected) => {\n  expect(validateRequestedDays(days, 5)).toBe(expected);\n});',
            },
          ],
        },
      ],
      steps: [
        {
          title: '3-Point Extreme Boundary Value Evaluation',
          body: 'Calculate Min-1, Min, Min+1, Max-1, Max, and Max+1 for all numeric inputs and execute boundary validations.',
          doThis: 'Execute boundary tests against age, date, and price threshold inputs.',
          code: 'npx jest tests/unit/boundary-analysis.test.ts',
        },
      ],
      checklist: ['Identified lower and upper boundaries for all numeric fields', 'Tested 3 points (B-1, B, B+1) at every identified boundary', 'Audited comparison operators (< vs <=, > vs >=) in code'],
      practice: { title: 'Boundary value analysis test plan', brief: 'Construct a 3-point boundary table for a discount coupon code with 8-16 char length limits.' },
      resources: [
        r('guide', 'Boundary Value Analysis in Software Testing', 'https://www.guru99.com/equivalence-partitioning-boundary-value-analysis.html', 'EN'),
        r('tool', 'Jest Parameterized Testing Docs', 'https://jestjs.io/docs/api#testeachtablename-fn-timeout', 'EN'),
      ],
    }),

    ch({
      id: 'tt-equivalence-partitioning',
      kind: 'guide',
      phase: 'Part 13 · Test Design Techniques & Partitioning',
      level: 'beginner',
      title: 'Equivalence Partitioning',
      minutes: 20,
      durationLabel: 'Chapter 52',
      overviewText:
        'Equivalence partitioning divides an input\'s full range of possible values into distinct partitions (or "classes") that the system is expected to treat identically, and then tests just one representative value from each partition — on the reasoning that if one value in a partition works correctly, the others in that same partition almost certainly will too.',
      why:
        'Testing every single possible input value is both impossible and unnecessary — most values within a given valid or invalid category will be processed identically by the underlying logic. Equivalence partitioning provides a systematic, principled way to dramatically reduce the number of test cases needed while still maintaining genuinely meaningful coverage, by testing one representative from each meaningfully distinct group rather than exhaustively testing everything.',
      when:
        'Whenever an input has a large or continuous range of possible values that can be logically grouped into distinct behavior categories — a natural complement to boundary value analysis, which then specifically targets the edges between the partitions this technique identifies.',
      practical: {
        app: 'HRMS Employee Age Field (Eligibility)',
        scenario:
          'The HRMS\'s benefits eligibility check partitions the age field into: invalid (under 18), valid working-age (18–64), and a separate valid senior category (65+) with different benefit rules.',
        pass: 'Testing one representative from each partition — age 16 (correctly rejected), age 35 (correctly processed under standard rules), and age 70 (correctly processed under senior rules) — confirms all three distinct behavior categories work as intended, without needing to test every possible age individually.',
        fail: 'A partition assumption fails because internal logic has hidden sub-branches that treat age 60 differently without QA awareness.',
      },
      advantages: [
        'Dramatically reduces the number of test cases needed while preserving genuinely meaningful coverage',
        'Provides a systematic, repeatable, principled method for choosing test cases rather than picking values arbitrarily',
        'Naturally complements boundary value analysis — partitions identify ranges, boundaries identify the risky edges between them',
        'Makes test coverage reasoning explicit and transparent for audit and review',
      ],
      limitations: [
        'Relies on the assumption that all values within a partition are treated identically — invalid partitioning hides bugs',
        'Requires understanding the system\'s actual business rules to partition correctly',
        'Less effective for inputs with complex interdependencies between multiple fields',
        'Does not test boundary edges on its own — must pair with Boundary Value Analysis (Chapter 51)',
      ],
      tools: [
        {
          name: 'Manual Equivalence Partitioning Matrix',
          sub: 'Equivalence Class & Representative Selection',
          url: 'https://hearth-learn.vercel.app/manuals/testing-types',
          seeChapter: 5,
          desc: 'Divides input domains into Valid (V) and Invalid (I) equivalence classes (see Chapter 5), selecting single representative test vectors for each class.',
          adv: [
            'Reduces thousands of potential test inputs to a handful of high-confidence runs',
            'Standard test design practice required across ISTQB methodologies',
          ],
          lim: [
            'Risk of missing sub-partition anomalies if business logic is misunderstood',
          ],
          steps: [
            {
              t: 'Step 1 — Construct Equivalence Class Table',
              p: 'Define valid and invalid partitions for Employee Age input.',
              c: 'Class 1 (Invalid): Age < 18 -> Representative: 15\nClass 2 (Valid Standard): 18 <= Age <= 64 -> Representative: 35\nClass 3 (Valid Senior): Age >= 65 -> Representative: 72\nClass 4 (Invalid Non-Numeric): String/Special -> Representative: "abc"',
            },
            {
              t: 'Step 2 — Execute representative tests across all 4 partitions',
              p: 'Confirm Class 1 rejects with minor notice, Class 2 assigns Standard Benefits, Class 3 assigns Senior Benefits, Class 4 rejects with type error.',
              c: 'Result: 4 targeted test cases provide 100% functional equivalence coverage for the entire age spectrum.',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Input Domain Partitioning & Representative Extraction',
          body: 'Segment input data ranges into discrete equivalence classes and select single representative vectors per partition.',
          doThis: 'Partition complex loan interest rate calculator inputs into 5 distinct classes.',
          code: 'npx jest tests/unit/equivalence-classes.test.ts',
        },
      ],
      checklist: ['Categorized all valid and invalid input partitions', 'Selected exactly one representative value per equivalence class', 'Combined partition tests with boundary checks at class transitions'],
      practice: { title: 'Equivalence partition table design', brief: 'Design an equivalence class table for an airline baggage weight fee calculator.' },
      resources: [
        r('guide', 'Black-box Test Design Techniques (ISTQB)', 'https://www.istqb.org', 'EN'),
        r('guide', 'Equivalence Class Partitioning Explained', 'https://en.wikipedia.org/wiki/Equivalence_partitioning', 'EN'),
      ],
    }),

    ch({
      id: 'tt-monkey-testing',
      kind: 'guide',
      phase: 'Part 14 · Advanced Resilience, Chaos & Contracts',
      level: 'intermediate',
      title: 'Monkey Testing',
      minutes: 20,
      durationLabel: 'Chapter 53',
      overviewText:
        'Monkey testing bombards an application with random, unstructured input — random taps, random keystrokes, random navigation — generated automatically and at high volume, with no logic or intent behind any individual action, specifically to find crashes and stability issues through sheer volume rather than targeted design.',
      why:
        'Some crashes only surface after an enormous number of interactions in unpredictable sequences — combinations no human tester would ever manually think to try, let alone repeat thousands of times. Monkey testing trades precision for volume: it doesn\'t know what it\'s looking for, but by generating vast quantities of random interaction, it reliably finds the kind of raw stability bugs (crashes, freezes, memory issues) that accumulate under real, chaotic, high-volume usage.',
      when:
        'Particularly valuable for mobile apps before release, as a cheap, automatable stability stress-check — run for extended periods against a build to catch crashes before real, high-volume usage in the wild finds them first.',
      practical: {
        app: 'HRMS Mobile App Stability',
        scenario:
          'Android Monkey is run against the HRMS mobile app with 100,000 random events over several hours.',
        pass: 'The resource leak is fixed, and a repeat 100,000-event run completes without a crash, giving real confidence in the app\'s stability under sustained, unpredictable usage.',
        fail: 'The app crashes after approximately 40,000 events with an out-of-memory error, traced to a screen transition animation that wasn\'t properly releasing image resources on repeated rapid navigation — a leak that would only become noticeable after extensive real-world usage.',
      },
      advantages: [
        'Extremely cheap to run — zero test case design or maintenance required, just a target event count',
        'Finds real stability bugs through sheer volume that manual testing would never stumble onto',
        'Android Monkey requires zero setup beyond having the standard Android SDK installed',
        'Runs unattended overnight or in CI without ongoing manual effort',
      ],
      limitations: [
        'Completely unstructured — cannot verify business logic or expected outputs, only raw crash stability',
        'Crashes found can be hard to reproduce since random interaction streams are not always cleanly recorded',
        'Does not test realistic user journeys — purely random clicks rarely resemble real user behavior',
        'May generate impossible UI sequences that real users would never encounter',
      ],
      tools: [
        {
          name: 'Android Monkey (adb monkey)',
          sub: 'Built-In Android SDK Pseudo-Random Event Injector',
          url: 'https://developer.android.com/studio/test/other-testing-tools/monkey',
          desc: 'A built-in Android SDK tool that generates a specified (often very large) number of pseudo-random user events — taps, gestures, system events — directly against an app, requiring zero setup beyond having the Android SDK installed.',
          adv: [
            'Built directly into Android OS/SDK with zero dependencies',
            'Injects thousands of touch events, keypresses, and orientation changes per minute',
            'Configurable throttle delays and seed parameters for pseudo-random repeatability',
          ],
          lim: [
            'Confined to Android platforms (requires Appium/XCUITest for iOS)',
          ],
          steps: [
            {
              t: 'Step 1 — Launch Android Monkey against HRMS package',
              p: 'Execute adb monkey command targeting app package with 50,000 events.',
              c: 'adb shell monkey -p com.hrms.mobile --throttle 100 -v -v -v 50000 > monkey_log.txt',
            },
            {
              t: 'Step 2 — Monitor logcat for ANRs and native crash dumps',
              p: 'Search generated log for OutOfMemoryError and NullPointerExceptions.',
              c: '// CRASH: com.hrms.mobile (pid 14202)\n// Short Msg: java.lang.OutOfMemoryError: Failed to allocate a 32MB bitmap\n// Long Msg: java.lang.OutOfMemoryError in DashboardActivity.onTransition()',
            },
            {
              t: 'Step 3 — Reproduce and patch bitmap allocation leak',
              p: 'Release cached bitmap drawables in onDestroy() and re-run Monkey with same random seed.',
              c: 'adb shell monkey -p com.hrms.mobile -s 12345 50000 -> 0 Crashes -> STABILITY VERIFIED',
            },
          ],
        },
        {
          name: 'Appium Chaos & Monkey Scripts',
          sub: 'Cross-Platform Random UI Navigation Generator',
          url: 'https://appium.io',
          seeChapter: 38,
          desc: 'Can be configured to generate random interaction sequences programmatically (see Chapter 38) across both iOS and Android apps.',
          adv: [
            'Works uniformly across iOS and Android mobile applications',
            'Restricts random clicks to valid interactive elements within the DOM tree',
          ],
          lim: [
            'Slower event generation speed compared to native adb monkey',
          ],
          steps: [
            {
              t: 'Step 1 — Execute Appium random element traversal loop',
              p: 'Query interactive buttons and randomly click elements for 1,000 iterations.',
              c: 'const elements = await driver.$$(\'button, a, input\');\nconst randomEl = elements[Math.floor(Math.random() * elements.length)];\nawait randomEl.click();',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'High-Volume Unstructured Random Event Bombardment',
          body: 'Inject 50,000+ random tap, gesture, and keyboard events into mobile app runtimes auditing memory stability.',
          doThis: 'Execute adb shell monkey stress run and analyze logcat ANR outputs.',
          code: 'adb shell monkey -p com.hrms.mobile -v 50000',
        },
      ],
      checklist: ['Configured reproducible random seed (-s) for debugging', 'Monitored system memory and heap allocations during runs', 'Audited app response times after sustained monkey event bursts'],
      practice: { title: 'Android Monkey stability session', brief: 'Run a 25,000-event monkey test session on an Android APK and capture any ANR traces.' },
      resources: [
        r('tool', 'Android Studio UI/Application Exerciser Monkey', 'https://developer.android.com/studio/test/other-testing-tools/monkey', 'EN'),
        r('tool', 'Appium Documentation', 'https://appium.io/docs/en/latest', 'EN'),
      ],
    }),

    ch({
      id: 'tt-chaos-testing',
      kind: 'guide',
      phase: 'Part 14 · Advanced Resilience, Chaos & Contracts',
      level: 'advanced',
      title: 'Chaos Testing',
      minutes: 25,
      durationLabel: 'Chapter 54',
      overviewText:
        'Chaos testing deliberately and continuously injects real failures into a live (typically production or production-like) system — killing services, introducing network latency, taking down dependencies — as an ongoing practice, verifying the system\'s actual resilience under real, unpredictable conditions rather than assuming resilience based on architecture alone.',
      why:
        'Distributed systems fail in ways that are extremely difficult to predict from architecture diagrams or code review alone — a service that\'s supposed to fail over gracefully might not, in practice, until it\'s actually tested by deliberately breaking it in a real, running environment. Chaos testing (an evolution of recovery testing, Chapter 24, applied continuously and often directly in production) builds genuine confidence in resilience by proving it under real conditions, rather than hoping the theoretical design holds up.',
      when:
        'For mature systems with real production traffic and enough infrastructure sophistication to safely inject controlled failure — typically an advanced practice adopted once basic reliability and recovery testing (Chapters 20, 24) are already well established, not a starting point for a young or fragile system.',
      practical: {
        app: 'HRMS Payroll Service Redundancy',
        scenario:
          'Chaos Monkey is configured to randomly terminate one of three redundant payroll-service instances during a controlled testing window.',
        pass: 'Health check intervals are tightened, and a repeat test shows failover now completes within 5 seconds, with zero failed requests during the same instance termination — genuine, tested resilience rather than an untested assumption.',
        fail: 'Terminating one instance causes a brief but real spike in failed requests — the load balancer takes 45 seconds to detect the failure and reroute traffic, longer than the assumed near-instant failover the team believed was in place.',
      },
      advantages: [
        'Proves real resilience under actual failure conditions, not just theoretical resilience based on architecture design',
        'Surfaces single points of failure believed to be redundant before they cause a real uncontrolled outage',
        'Builds an engineering culture around designing for failure as the default expectation',
        'Netflix\'s long track record demonstrates proven effectiveness in large-scale cloud systems',
      ],
      limitations: [
        'Genuinely risky if run without sufficient automated monitoring, health checks, and rollback safety nets',
        'Requires mature cloud infrastructure (Kubernetes, AWS Auto Scaling, multi-zone redundancy)',
        'Not appropriate for early-stage or fragile architectures',
        'Requires explicit organizational buy-in for production-level experiments',
      ],
      tools: [
        {
          name: 'Chaos Monkey by Netflix',
          sub: 'Cloud Infrastructure Resilience & Pod Termination Engine',
          url: 'https://github.com/Netflix/chaosmonkey',
          desc: 'Netflix\'s original open-source chaos engineering tool — randomly and automatically terminates instances/services within a production environment during business hours, on the principle that engineers should build systems resilient enough to handle random failure as a matter of course.',
          adv: [
            'Forces architectural redundancy to be built into all microservices by default',
            'Configurable schedules (runs only during office hours when engineers are on hand)',
            'Integrates natively with AWS EC2 Auto Scaling Groups and Spinnaker',
          ],
          lim: [
            'Requires mature multi-instance cloud deployments',
          ],
          steps: [
            {
              t: 'Step 1 — Configure Chaos Monkey schedule and eligible cluster targets',
              p: 'Define targets in chaosmonkey.toml with bounded blast radius.',
              c: '[chaosmonkey]\nenabled = true\nleashed = true\nschedule = "0 9-15 * * 1-5"\n[clusters]\ninclude = ["hrms-payroll-service"]',
            },
            {
              t: 'Step 2 — Trigger controlled container/VM termination during business hours',
              p: 'Chaos Monkey terminates payroll-service-pod-2.',
              c: 'Chaos Monkey Event: Terminated instance i-0a823bf91 (payroll-service)\nAction: Kubernetes replica controller provisions replacement pod within 4.2s',
            },
            {
              t: 'Step 3 — Verify zero dropped user requests in APM telemetry',
              p: 'Inspect Datadog/Prometheus metrics for HTTP 502/503 errors during pod death.',
              c: 'Result: Load balancer rerouted traffic to remaining 2 pods | Error Rate: 0.00% | Latency P99: +12ms -> PASS',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Automated Instance & Pod Failure Injection',
          body: 'Schedule randomized pod terminations against multi-replica Kubernetes clusters observing zero-downtime failover.',
          doThis: 'Execute Chaos Monkey experiment in staging cluster and audit error rate telemetry.',
          code: 'kubectl delete pod -l app=hrms-payroll --grace-period=0 --force',
        },
      ],
      checklist: ['Verified multi-replica container redundancy across availability zones', 'Audited load balancer health check interval thresholds (<= 5s)', 'Enforced automated alerts on unrecovered pod terminations'],
      practice: { title: 'Chaos engineering experiment design', brief: 'Design a chaos experiment injecting 200ms latency on a database connection.' },
      resources: [
        r('tool', 'Netflix Chaos Monkey GitHub', 'https://github.com/Netflix/chaosmonkey', 'EN'),
        r('guide', 'Principles of Chaos Engineering', 'https://principlesofchaos.org', 'EN'),
      ],
    }),

    ch({
      id: 'tt-contract-testing',
      kind: 'guide',
      phase: 'Part 14 · Advanced Resilience, Chaos & Contracts',
      level: 'intermediate',
      title: 'Contract Testing',
      minutes: 25,
      durationLabel: 'Chapter 55',
      overviewText:
        'Contract testing verifies that two independently developed services — a consumer (e.g. a frontend or another microservice) and a provider (e.g. an API) — agree on the exact shape of their interaction, without requiring either side to run against a full, live instance of the other, by checking each side independently against a shared, explicit contract.',
      why:
        'In a microservices or multi-team architecture, spinning up every real dependent service just to test one integration point is slow, brittle, and doesn\'t scale — but skipping integration verification entirely risks exactly the kind of silent contract-breaking change interface testing (Chapter 11) exists to catch. Contract testing solves this by letting each side test independently against a shared, versioned agreement, catching breaking changes without ever needing a full, live, integrated environment.',
      when:
        'In any architecture with multiple independently deployed services or teams that depend on each other\'s APIs — run in CI on both the consumer and provider sides whenever either changes, specifically before either side is deployed, to catch a contract break before it reaches a real integrated environment.',
      practical: {
        app: 'HRMS Payroll Frontend and Payslip API',
        scenario:
          'The HRMS frontend team defines a Pact contract expecting the /payslip/{id}/latest endpoint to always return net_salary as a number (directly echoing Chapter 11\'s interface testing example, verified here without needing the frontend and backend running together).',
        pass: 'The backend reverts the field back to a number, Pact verification passes, and both teams can deploy independently with confidence the contract still holds.',
        fail: 'The backend team\'s Pact verification run fails after a change accidentally starts returning net_salary as a string — caught in the backend team\'s own CI, before their deploy, without the frontend team\'s environment needing to be involved at all.',
      },
      advantages: [
        'Verifies real integration compatibility without needing a full live integrated environment',
        'Scales cleanly across dozens of microservices and independent team release cadences',
        'Catches breaking API schema changes immediately in CI before code is deployed',
        'The generated contract acts as living, versioned documentation of API expectations',
      ],
      limitations: [
        'Requires both consumer and provider teams to adopt and maintain Pact contracts',
        'Does not verify full end-to-end multi-service business logic — complements E2E testing',
        'Upfront setup cost for Pact Broker infrastructure and CI workflows',
        'Contracts must be actively versioned as APIs evolve to avoid schema drift',
      ],
      tools: [
        {
          name: 'Pact Framework & Pact Broker',
          sub: 'Consumer-Driven Contract Testing Standard',
          url: 'https://pact.io',
          desc: 'An open-source contract testing framework where the consumer defines its expectations of the provider as an explicit, shareable contract file, and the provider then verifies independently that it actually satisfies that same contract.',
          adv: [
            'Consumer-driven contract generation in JavaScript, Java, Python, Go, and .NET',
            'Pact Broker (\'can-i-deploy\' CLI tool) prevents deployments if contract verification fails',
            'Eliminates flaky, slow end-to-end integration test environments in CI',
          ],
          lim: [
            'Requires hosting or using hosted Pact Broker (PactFlow)',
          ],
          steps: [
            {
              t: 'Step 1 — Consumer defines API expectations in Pact test',
              p: 'Frontend tests define expected JSON structure and publish contract to Pact Broker.',
              c: 'await pact.addInteraction({\n  state: \'a valid employee exists\',\n  uponReceiving: \'a request for latest payslip\',\n  withRequest: { method: \'GET\', path: \'/api/payslip/1042/latest\' },\n  willRespondWith: {\n    status: 200,\n    body: { net_salary: MatchersV3.number(4500.00) }\n  }\n});',
            },
            {
              t: 'Step 2 — Provider verifies contract independently in CI',
              p: 'Backend runs Pact verification test against its local API server.',
              c: 'npx pact-provider-verifier --provider-base-url=http://localhost:8080 --broker-url=https://pact.internal\nResult: 1 interaction verified successfully (0 contract breaks)',
            },
            {
              t: 'Step 3 — Run can-i-deploy gatekeeper before production release',
              p: 'Verify both frontend and backend versions satisfy compatible contracts.',
              c: 'pact-broker can-i-deploy --pacticipant HRMS-Frontend --version 2.4.0 --to-environment production\nResult: Computer says YES. Safe to deploy.',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Consumer-Driven Contract Generation & Verification',
          body: 'Author consumer contract expectations and execute automated provider verification in CI pipelines.',
          doThis: 'Run pact-provider-verifier against staging backend API.',
          code: 'npx pact-provider-verifier --provider-base-url=http://localhost:3001 --pact-urls=./pacts/frontend-backend.json',
        },
      ],
      checklist: ['Published versioned pact contracts to central Pact Broker', 'Configured can-i-deploy gating checks in GitHub Actions CI', 'Verified provider satisfies all active consumer contract versions'],
      practice: { title: 'Pact contract test implementation', brief: 'Write a consumer Pact test for an employee profile endpoint and verify it against a Mock Service.' },
      resources: [
        r('tool', 'Pact Official Documentation', 'https://docs.pact.io', 'EN'),
        r('tool', 'PactFlow Hosted Contract Platform', 'https://pactflow.io', 'EN'),
      ],
    }),

    ch({
      id: 'tt-concurrency-testing',
      kind: 'guide',
      phase: 'Part 14 · Advanced Resilience, Chaos & Contracts',
      level: 'advanced',
      title: 'Concurrency Testing',
      minutes: 25,
      durationLabel: 'Chapter 56',
      overviewText:
        'Concurrency testing verifies an application\'s correctness when multiple operations happen simultaneously against shared data or resources — checking specifically for race conditions, deadlocks, and data corruption that only occur when timing between simultaneous operations lines up in exactly the wrong way.',
      why:
        'Some bugs are entirely invisible in single-user, sequential testing and only emerge when two or more operations genuinely overlap in time against the same shared resource — two users updating the same record simultaneously, two processes both reading-then-writing a value without proper locking, resulting in one update silently overwriting the other. These race-condition bugs are notoriously hard to reproduce reliably, since they depend on precise, often rare timing.',
      when:
        'Specifically for any feature involving shared, concurrently-accessed data or resources (booking systems, balance/inventory updates, any "read-then-write" operation) — tested deliberately, since concurrency bugs essentially never surface through normal single-user manual testing at all.',
      practical: {
        app: 'HRMS Last-Slot Leave Approval',
        scenario:
          'Two managers simultaneously approve overlapping leave requests that would each independently be valid, but together would leave the team without adequate coverage on a specific day — a shared-resource conflict tested with JMeter firing both approval requests at the exact same moment.',
        pass: 'A database-level lock on the coverage check ensures the second concurrent approval correctly sees the first one\'s effect and is properly blocked with a clear conflict error, verified by re-running the same simultaneous-approval scenario.',
        fail: 'Both approvals succeed independently, since each request only checks current coverage without accounting for the other request being processed at the exact same instant — a lost-update race condition resulting in a real staffing gap neither manager intended.',
      },
      advantages: [
        'Directly catches race conditions and deadlocks that are completely invisible to sequential testing',
        'Verifies database isolation levels (SERIALIZABLE, REPEATABLE READ) and mutex locking mechanisms',
        'JMeter synchronization timers force genuinely simultaneous HTTP execution',
        'Findings translate directly into concrete architectural fixes (atomic operations, optimistic concurrency locking)',
      ],
      limitations: [
        'Race conditions depend on microscopic CPU timing differences and can be intermittent to reproduce',
        'Requires pinpointing high-risk shared database tables and transactions in advance',
        'Verification requires direct database queries to audit data integrity after tests finish',
        'Subsequent code refactors can re-introduce race conditions without strict concurrency regression checks',
      ],
      tools: [
        {
          name: 'Apache JMeter Synchronizing Timer',
          sub: 'Simultaneous Concurrency & Race Condition Probe',
          url: 'https://jmeter.apache.org',
          seeChapter: 14,
          desc: 'Used here not for volume performance measurement (see Chapter 14), but specifically configured with Synchronizing Timers to release multiple threads at the exact same microsecond against a shared resource.',
          adv: [
            'Synchronizing Timer holds threads until exact batch count is reached, releasing them simultaneously',
            'Parametrized thread requests test conflicting balance deductions or approvals',
            'Automated response assertions catch HTTP 409 Conflict vs 500 DB Deadlock exceptions',
          ],
          lim: [
            'Requires configuring thread rendezvous points in JMeter GUI',
          ],
          steps: [
            {
              t: 'Step 1 — Configure Synchronizing Timer in JMeter Thread Group',
              p: 'Set Group of 10 threads to block until all 10 are queued, then fire simultaneously.',
              c: 'Thread Group: 10 Threads, Ramp-Up: 0s\n+ Synchronizing Timer (Number of Simulated Users to Group by: 10)\n+ HTTP Request: POST /api/v1/leave/approve-slot',
            },
            {
              t: 'Step 2 — Execute concurrent approval requests against single remaining slot',
              p: 'Fire 10 simultaneous approvals against Employee #1042 slot.',
              c: 'Results:\n- Thread 1: HTTP 200 OK (Slot Claimed)\n- Threads 2-10: HTTP 409 Conflict (Slot No Longer Available)\n- Database Status: Exactly 1 record approved, 0 over-allocations -> PASS',
            },
            {
              t: 'Step 3 — Verify database integrity with SQL check',
              p: 'Assert no double-booking or negative remaining slot count in Postgres.',
              c: 'SELECT count(*) FROM leave_slots WHERE slot_date = \'2026-09-01\' AND status = \'APPROVED\';\nResult: 1 (Row-level SELECT FOR UPDATE lock prevented race condition)',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Simultaneous Multi-Threaded State Assertion',
          body: 'Configure thread synchronization barriers releasing concurrent HTTP transactions against identical database rows.',
          doThis: 'Execute JMeter concurrent approval test and assert 0 race condition data leaks.',
          code: 'jmeter -n -t tests/concurrency/simultaneous-approval.jmx -l results.jtl',
        },
      ],
      checklist: ['Identified all critical read-then-write database transactions', 'Configured synchronizing thread rendezvous barriers in JMeter', 'Verified database row locking (SELECT FOR UPDATE) and transaction isolation'],
      practice: { title: 'Concurrency race condition probe', brief: 'Set up a JMeter test firing 50 simultaneous debit requests against a bank account with $100 balance.' },
      resources: [
        r('tool', 'Apache JMeter Documentation', 'https://jmeter.apache.org/usermanual', 'EN'),
        r('guide', 'Concurrency Control & Race Conditions in Databases', 'https://en.wikipedia.org/wiki/Concurrency_control', 'EN'),
      ],
    }),

    ch({
      id: 'tt-configuration-testing',
      kind: 'guide',
      phase: 'Part 15 · Environment, Migration & Disaster Recovery',
      level: 'intermediate',
      title: 'Configuration Testing',
      minutes: 20,
      durationLabel: 'Chapter 57',
      overviewText:
        'Configuration testing verifies that an application behaves correctly across the different hardware, software, and settings configurations it\'s expected to run under — different OS versions, browser settings, screen resolutions, locale/language settings, and application-level configuration flags — checking specifically for configuration-dependent behavior rather than a single fixed environment.',
      why:
        'An application tested only in its developers\' default configuration can behave differently the moment a real user\'s environment diverges even slightly — a different OS version, a disabled browser feature, a non-default locale setting, or a toggled feature flag. Configuration testing exists specifically to catch the gap between "works on my machine" and "works across the actual range of configurations real users and deployments will have."',
      when:
        'Before release, against the specific matrix of configurations the real user base or deployment targets are known to use — and again whenever new configurable options, feature flags, or settings are introduced, since each new toggle multiplies the configuration space that needs to be verified.',
      practical: {
        app: 'HRMS Multi-Currency Configuration',
        scenario:
          'The HRMS is configuration-tested with the "multi-currency payroll" feature flag toggled on, a setting only a subset of customers actually enable.',
        pass: 'The export correctly reflects the configured currency when the flag is enabled, verified by re-testing specifically with the flag toggled on, not just the default configuration.',
        fail: 'With the flag enabled, the payslip PDF export silently defaults to USD formatting regardless of the configured local currency — a bug invisible in the default (flag-off) configuration that most internal testing had exclusively used.',
      },
      advantages: [
        'Catches environment-and-settings-dependent bugs invisible in a single fixed test configuration',
        'Systematic matrix approach ensures configuration coverage is deliberate rather than incidental',
        'Particularly important for applications with many feature flags or deployment-specific settings',
        'Reuses existing tooling from cross-browser and compatibility testing (Chapters 19 & 37)',
      ],
      limitations: [
        'The full configuration space is often too large to test exhaustively — real-world prioritization is essential',
        'Feature-flag combinations grow combinatorially, quickly outpacing manual verification capacity',
        'Findings tied to a specific configuration can be harder to reproduce and debug than single-environment bugs',
        'Requires accurate knowledge of real user configuration distribution to prioritize effectively',
      ],
      tools: [
        {
          name: 'LambdaTest Configuration Grid',
          sub: 'Matrix OS, Browser & Feature-Flag Runner',
          url: 'https://www.lambdatest.com',
          seeChapter: 37,
          desc: 'Used to systematically run functional test flows across combinations of OS, browser version, screen resolution, and runtime environment settings (see Chapter 37).',
          adv: [
            'Covers 3000+ browser, OS, and resolution combinations on real cloud infrastructure',
            'Allows testing feature flags and locale settings programmatically via capabilities',
          ],
          lim: [
            'Requires prioritizing high-usage combinations to manage execution runtimes',
          ],
          steps: [
            {
              t: 'Step 1 — Define Configuration Test Matrix',
              p: 'Specify target combinations: OS (macOS Sonoma, Windows 11, Ubuntu), Browser (Chrome, Firefox, Safari), and Flag (multiCurrency=true).',
              c: 'const matrix = [\n  { os: \'Windows 11\', browser: \'Chrome\', flags: { multiCurrency: true, locale: \'en-GB\' } },\n  { os: \'macOS Sonoma\', browser: \'Safari\', flags: { multiCurrency: true, locale: \'ja-JP\' } }\n];',
            },
            {
              t: 'Step 2 — Execute automated test suite across matrix nodes',
              p: 'Run payslip export validation across all defined configuration nodes.',
              c: 'npx playwright test tests/config-matrix/payslip-export.spec.ts --project=lambdatest-grid',
            },
            {
              t: 'Step 3 — Assert currency symbol and number formatting compliance',
              p: 'Verify generated PDF and UI display £ for GBP and ¥ for JPY.',
              c: 'Result: Windows/Chrome -> £4,500.00 (PASS) | macOS/Safari -> ¥650,000 (PASS)',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Systematic Matrix Configuration Execution',
          body: 'Execute acceptance test suites across combinatoric matrix of OS, display resolutions, and application feature flags.',
          doThis: 'Execute Playwright configuration matrix suite across cloud browser providers.',
          code: 'npx playwright test tests/configuration-matrix.spec.ts',
        },
      ],
      checklist: ['Defined configuration matrix weighted by production user analytics', 'Verified all application feature flags in both enabled and disabled states', 'Audited locale and regional date/currency formatting variants'],
      practice: { title: 'Configuration matrix test design', brief: 'Design a test matrix covering 3 OS variants, 3 browsers, and 2 feature flags for a media editor.' },
      resources: [
        r('tool', 'LambdaTest Cross Browser Cloud', 'https://www.lambdatest.com', 'EN'),
        r('guide', 'Configuration Testing Overview', 'https://en.wikipedia.org/wiki/Configuration_testing', 'EN'),
      ],
    }),

    ch({
      id: 'tt-data-migration-testing',
      kind: 'guide',
      phase: 'Part 15 · Environment, Migration & Disaster Recovery',
      level: 'intermediate',
      title: 'Data Migration Testing',
      minutes: 25,
      durationLabel: 'Chapter 58',
      overviewText:
        'Data migration testing verifies that data is correctly, completely, and accurately transferred when moving between systems, schemas, or storage formats — checking that every migrated record retains its integrity, that no data is lost or duplicated, and that the migrated data behaves correctly in the new system, not just that the migration process completed without an error.',
      why:
        'A migration script can run to completion, report success, and still have silently corrupted, dropped, or mismatched data — a completed migration process is not proof of a correct one. Because migrations are often one-way and hard to reverse cleanly once real usage has resumed on the new system, an undetected migration defect can be exceptionally costly and difficult to fix after the fact, making thorough testing before and during the migration especially critical.',
      when:
        'Before any significant data migration — schema changes, platform migrations, database version upgrades, or moving to an entirely new system — tested first against a copy of real data in a safe environment, never attempted for the first time directly against production.',
      practical: {
        app: 'HRMS Legacy System Migration',
        scenario:
          'Employee records are migrated from a legacy HRMS to the new system, tested first against a full copy of real production data.',
        pass: 'The migration script is corrected to convert legacy placeholder values to proper nulls, a re-run of the test migration shows all 340 records now pass validation, and the real migration proceeds with confidence.',
        fail: '340 employee records with a legacy "N/A" placeholder in the phone number field are migrated as literal text "N/A" instead of being correctly converted to a proper null value — breaking the new system\'s phone-number validation on those records.',
      },
      advantages: [
        'Directly verifies data correctness and completeness, not just that migration scripts ran without throwing errors',
        'Catches transformation edge cases (unusual characters, nulls, date formats) that simple row-count checks miss',
        'Testing against isolated test copies eliminates the risk of catastrophic corruption on live production databases',
        'A tested rollback plan provides a verified safety net if cutover anomalies occur',
      ],
      limitations: [
        'Requires a representative sanitized copy of real production data to uncover dirty-data edge cases',
        'Field-by-field verification on billions of rows requires statistical sampling or automated checksum hashing',
        'Testing in lower environments cannot always simulate peak concurrent production traffic during real cutover',
        'Rollback testing adds substantial time and storage overhead to project timelines',
      ],
      tools: [
        {
          name: 'DBeaver Data Comparison & Schema Audit',
          sub: 'Pre/Post Data Reconciliation & Checksum Engine',
          url: 'https://dbeaver.io',
          seeChapter: 35,
          desc: 'Used to compare source and destination datasets (see Chapter 35), verifying record counts, data types, foreign key constraints, and checksum values before and after migration.',
          adv: [
            'Universal database client supporting PostgreSQL, MySQL, Oracle, and MS SQL',
            'Automated table row count comparison and schema structure diffing',
          ],
          lim: [
            'Requires building custom SQL reconciliation queries for complex transformed columns',
          ],
          steps: [
            {
              t: 'Step 1 — Audit Pre-Migration Source Row Counts & Hashes',
              p: 'Execute count and MD5 checksum aggregate across legacy tables.',
              c: 'SELECT count(*), md5(string_agg(id || name || email, \'\')) FROM legacy_employees;\nResult: 14,250 records | Hash: 8f9b2d4e1...',
            },
            {
              t: 'Step 2 — Execute migration pipeline against staging database copy',
              p: 'Run ETL pipeline transforming legacy schemas into new PostgreSQL tables.',
              c: 'python3 scripts/migrate_employees.py --source=legacy_db --dest=staging_hrms_db',
            },
            {
              t: 'Step 3 — Run Post-Migration Data Reconciliation Script',
              p: 'Verify 100% record match, zero orphaned records, and valid null conversions.',
              c: 'SELECT count(*) FROM employees WHERE phone_number = \'N/A\';\nResult: 0 records (Converted to NULL correctly) | Total Migrated: 14,250 -> 100% PASS',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Automated Checksum & Record Count Reconciliation',
          body: 'Verify row counts, hash aggregates, schema constraints, and foreign key integrity before and after migration execution.',
          doThis: 'Execute data reconciliation SQL script comparing source vs destination tables.',
          code: 'python3 scripts/reconcile_migration.py --source postgres://old --dest postgres://new',
        },
      ],
      checklist: ['Verified 1:1 row count parity across all migrated database tables', 'Audited transformation logic for NULL values, dates, and Unicode characters', 'Tested and timed the database rollback script in staging'],
      practice: { title: 'Database migration reconciliation plan', brief: 'Design an SQL audit script validating 50,000 customer records after schema normalization.' },
      resources: [
        r('tool', 'DBeaver Community Database Tool', 'https://dbeaver.io', 'EN'),
        r('guide', 'Database Migration Testing Best Practices', 'https://www.guru99.com/data-migration-testing.html', 'EN'),
      ],
    }),

    ch({
      id: 'tt-disaster-recovery-testing',
      kind: 'guide',
      phase: 'Part 15 · Environment, Migration & Disaster Recovery',
      level: 'advanced',
      title: 'Disaster Recovery Testing',
      minutes: 25,
      durationLabel: 'Chapter 59',
      overviewText:
        'Disaster recovery testing verifies that an organization can actually restore a fully functioning system after a catastrophic, large-scale failure — a full data center outage, a complete database loss, a major security incident — by actually executing the recovery plan, not just reviewing it on paper, and measuring whether it meets defined recovery time and data loss targets.',
      why:
        'A written disaster recovery plan that\'s never actually been executed is an untested assumption, not a real safety net — backups can be silently corrupted or incomplete, documented recovery steps can be outdated or simply wrong, and the people expected to execute the plan may not actually know how in a real crisis. Disaster recovery testing is what turns "we have a plan" into "we\'ve proven the plan actually works," well before a real disaster forces the answer under far higher pressure.',
      when:
        'Periodically (at minimum annually, more often for critical systems) as a scheduled, deliberate exercise — and definitely after any significant infrastructure change that could affect the recovery process (new database, new hosting provider, new backup strategy), since a recovery plan tested against an old architecture may no longer be valid.',
      practical: {
        app: 'HRMS Full Database Loss Simulation',
        scenario:
          'The team simulates a complete production database loss in an isolated environment, executing the documented recovery procedure from backups.',
        pass: 'The recovery documentation is corrected to reflect the current backup tooling, and a repeat test completes full restoration in 1 hour 40 minutes, within the defined target, with a verified data loss of under 5 minutes.',
        fail: 'Recovery takes 6 hours against a documented Recovery Time Objective of 2 hours — the written procedure referenced a backup tool that had been replaced eight months earlier without the documentation being updated.',
      },
      advantages: [
        'Proves recovery capability is real and current rather than an untested assumption on paper',
        'Surfaces gaps in documentation, access credentials, and team readiness before real crises',
        'Establishes empirical RTO (Recovery Time Objective) and RPO (Recovery Point Objective) metrics',
        'Builds genuine team familiarity and operational confidence during high-stress incidents',
      ],
      limitations: [
        'Time-consuming and resource-intensive to execute realistic full-scale disaster drills',
        'Simulating complete regional cloud outages safely without risking production requires isolated staging environments',
        'Drills conducted once a year risk documentation becoming stale between exercises',
        'Cannot anticipate every unpredictable multi-factor failure sequence in advance',
      ],
      tools: [
        {
          name: 'Manual Disaster Recovery Drill Procedure',
          sub: 'RTO & RPO Cold-Start Restoration Drill',
          url: 'https://hearth-learn.vercel.app/manuals/testing-types',
          seeChapter: 5,
          desc: 'A deliberate, stopwatch-timed operational exercise (see Chapter 5) executing the documented Disaster Recovery (DR) runbook from scratch in an isolated environment.',
          adv: [
            'Verifies real-world backup restore capability and backup encryption key validity',
            'Measures empirical Recovery Time Objective (RTO) against SLA commitments',
          ],
          lim: [
            'Requires cross-functional coordination between DevOps, DBA, and QA teams',
          ],
          steps: [
            {
              t: 'Step 1 — Declare simulated disaster & start stopwatch',
              p: 'Simulate primary database deletion in isolated disaster recovery AWS VPC.',
              c: 'Event: AWS us-east-1 Primary RDS instance terminated.\nTarget SLA: RTO <= 2 Hours | RPO <= 15 Minutes.',
            },
            {
              t: 'Step 2 — Execute runbook: restore cross-region WAL backup',
              p: 'Deploy new PostgreSQL instance in us-west-2 from encrypted S3 backup snapshot.',
              c: 'aws rds restore-db-instance-to-point-in-time \\\n  --source-db-instance-identifier hrms-prod-backup \\\n  --target-db-instance-identifier hrms-restored \\\n  --restore-time "2026-08-23T10:00:00Z"',
            },
            {
              t: 'Step 3 — Run smoke validation & stop timer',
              p: 'Point staging application endpoints to restored database and verify data integrity.',
              c: 'Status: Restored 14,250 employee records | Time Elapsed: 1h 38m (RTO MET) | Data Gap: 3m (RPO MET) -> PASS',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Stopwatch-Timed Disaster Recovery Execution',
          body: 'Simulate complete cluster termination and execute documented restoration runbooks auditing RTO and RPO metrics.',
          doThis: 'Execute AWS RDS point-in-time snapshot recovery to a standby region.',
          code: 'aws rds restore-db-instance-to-point-in-time --source-db-instance-identifier prod-rds --target-db-instance-identifier dr-rds',
        },
      ],
      checklist: ['Measured actual Recovery Time Objective (RTO) against SLAs', 'Audited maximum data loss window against Recovery Point Objective (RPO)', 'Updated recovery runbooks with current credentials and tooling changes'],
      practice: { title: 'Disaster recovery runbook authoring', brief: 'Author a step-by-step DR runbook for restoring a Redis cache and PostgreSQL cluster from S3.' },
      resources: [
        r('guide', 'AWS Disaster Recovery Whitepaper', 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html', 'EN'),
        r('guide', 'Disaster Recovery Testing Guide', 'https://en.wikipedia.org/wiki/Disaster_recovery', 'EN'),
      ],
    }),

    ch({
      id: 'tt-documentation-testing',
      kind: 'guide',
      phase: 'Part 15 · Environment, Migration & Disaster Recovery',
      level: 'beginner',
      title: 'Documentation Testing',
      minutes: 15,
      durationLabel: 'Chapter 60',
      overviewText:
        'Documentation testing verifies that an application\'s supporting documentation — user guides, API documentation, help articles, installation instructions, README files — is accurate, complete, and actually works when followed exactly as written, rather than assuming documentation is correct simply because it exists.',
      why:
        'Documentation is often written once, early, and then never re-verified as the underlying application evolves — a screenshot goes stale, a described step no longer matches the current UI, an API example uses a field that\'s since been renamed. Users who follow inaccurate documentation don\'t just fail to complete their task; they often lose trust in the product entirely, assuming (reasonably) that if the documentation is wrong, the product itself might be too.',
      when:
        'Whenever documentation is written or updated, and periodically thereafter as the underlying application changes — especially important to re-verify after any UI change, API change, or feature update that the existing documentation describes, since documentation drift accumulates silently over time.',
      practical: {
        app: 'HRMS API Documentation',
        scenario:
          'A tester follows the public API documentation\'s example request for creating a leave request exactly as written.',
        pass: 'The documentation is corrected to match the current field name, the exact documented example is re-tested and now succeeds as written, and a note is added to the release checklist to re-verify API docs on any field-naming change going forward.',
        fail: 'The documented example uses a field named leave_type, but the actual current API expects type — the field was renamed three releases ago and the documentation was never updated, meaning every developer following the docs exactly as written gets an immediate, confusing 400 error.',
      },
      advantages: [
        'Catches user-facing blockers invisible to automated code tests when the software works but docs are wrong',
        'Fresh-reader audits surface hidden domain assumptions the original developer overlooked',
        'Directly protects customer trust and reduces costly customer support ticket volumes',
        'API documentation testing acts as contract verification between developer teams',
      ],
      limitations: [
        'Purely manual and vulnerable to being deprioritized under tight delivery deadlines',
        'Documentation drift re-accumulates quickly if not embedded in release checklists',
        'Does not automatically scale across hundreds of localized help articles',
        'Evaluating clarity and structure requires qualitative writing judgment rather than binary pass/fail checks',
      ],
      tools: [
        {
          name: 'Manual Documentation & API Verification',
          sub: 'Literal Execution & Fresh-Reader Audit',
          url: 'https://hearth-learn.vercel.app/manuals/testing-types',
          seeChapter: 5,
          desc: 'A rigorous review practice (see Chapter 5) where an independent tester executes every code sample, cURL command, and UI click instruction verbatim without prior assumptions.',
          adv: [
            'Guarantees every code sample in API docs executes successfully out-of-the-box',
            'Audits documentation links, screenshots, and parameter schemas against live build',
          ],
          lim: [
            'Requires dedicated manual review time on each feature release',
          ],
          steps: [
            {
              t: 'Step 1 — Execute documented API cURL snippet verbatim',
              p: 'Copy exact JSON payload from docs portal and send request to staging endpoint.',
              c: 'curl -X POST https://api.hrms.com/v1/leave \\\n  -H "Authorization: Bearer <TOKEN>" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"type": "VACATION", "startDate": "2026-09-01", "days": 3}\'',
            },
            {
              t: 'Step 2 — Assert response matches documented schema',
              p: 'Compare HTTP 201 response JSON with published docs example.',
              c: 'Documented Schema: { "id": "LV-104", "status": "PENDING" }\nActual Server Response: { "id": "LV-104", "status": "PENDING" } -> 100% MATCH (PASS)',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Verbatim Documentation Sample Execution',
          body: 'Copy and execute every code snippet, cURL command, and onboarding step from documentation verifying 100% accuracy.',
          doThis: 'Execute all cURL commands from API documentation portal against staging.',
          code: 'npx dredd api-spec.yaml https://staging.hrms.com/api',
        },
      ],
      checklist: ['Executed all cURL commands and code samples verbatim', 'Audited all UI screenshots against current design system', 'Tested all hyperlinks and cross-references for 404 broken links'],
      practice: { title: 'API documentation testing audit', brief: 'Follow an onboarding QuickStart guide from scratch on a clean VM and log every point of friction.' },
      resources: [
        r('guide', 'Dredd HTTP API Testing Framework', 'https://dredd.org', 'EN'),
        r('guide', 'Documentation Testing Explained', 'https://www.guru99.com/software-testing-documentation.html', 'EN'),
      ],
    }),

    ch({
      id: 'tt-compliance-testing',
      kind: 'guide',
      phase: 'Part 16 · Governance, Deployment Strategies & Integration',
      level: 'intermediate',
      title: 'Compliance / Regulatory Testing',
      minutes: 20,
      durationLabel: 'Chapter 61',
      overviewText:
        'Compliance testing verifies that an application meets the specific legal, regulatory, or industry-standard requirements it\'s obligated to follow — data privacy laws (GDPR, CCPA), industry standards (PCI-DSS for payment data, HIPAA for health data), or accessibility mandates — checking against externally defined rules the organization doesn\'t get to choose, rather than internal requirements it wrote itself.',
      why:
        'Non-compliance carries consequences beyond a typical bug: legal liability, regulatory fines, loss of the ability to operate in a given market or industry, and serious reputational damage — none of which a standard functional bug report typically triggers. Because compliance requirements are set externally and often carry legal weight, verifying them can\'t be treated as optional polish; it\'s frequently a hard requirement for the application to legally operate at all in its intended market.',
      when:
        'Early in design (since some compliance requirements, like data residency or consent flows, are far cheaper to build in from the start than retrofit), and then verified again before any release touching regulated data or functionality — often involving legal or compliance specialists alongside the testing team, not testing alone.',
      practical: {
        app: 'HRMS Employee Data Deletion (GDPR)',
        scenario:
          'The HRMS\'s "right to erasure" feature is compliance-tested against GDPR\'s requirement that a user\'s personal data be genuinely and completely removed on request.',
        pass: 'A proper cascading deletion (or documented anonymization) removes personal data across all relevant tables and is reflected in the next backup cycle, with the process documented as evidence for compliance audits.',
        fail: 'Deleting an employee\'s record removes them from the active employee list, but their personal data remains fully intact in the payroll history table and in backup snapshots taken before the deletion — not a genuine erasure, just a UI-level hide.',
      },
      advantages: [
        'Directly protects the organization from legal liability, regulatory fines, and license revocation',
        'Mandatory gating requirement for operating in regulated markets (FinTech, HealthTech, EU GDPR)',
        'Building compliance in during early architecture avoids massive retrofit costs later',
        'Documented testing evidence directly satisfies external compliance and security audits',
      ],
      limitations: [
        'Requires specialized legal and regulatory expertise to interpret evolving mandates accurately',
        'Regulations vary widely across geographic jurisdictions (GDPR vs CCPA vs APPI)',
        'Passing internal checklists does not guarantee passing external regulatory audits',
        'Many compliance rules are organizational policies (data access workflows) rather than code-only checks',
      ],
      tools: [
        {
          name: 'Manual Regulatory Checklist & Evidence Audit',
          sub: 'GDPR, HIPAA & PCI-DSS Verification Matrix',
          url: 'https://hearth-learn.vercel.app/manuals/testing-types',
          seeChapter: 5,
          desc: 'Structured checklist audit (see Chapter 5) mapping legal clauses to concrete technical assertions and timestamped evidence logs.',
          adv: [
            'Creates audit-ready evidence trail for regulatory bodies',
            'Audits data encryption at rest (AES-256) and in transit (TLS 1.3)',
          ],
          lim: [
            'Requires periodic updating as statutory frameworks evolve',
          ],
          steps: [
            {
              t: 'Step 1 — Verify GDPR Article 17 (Right to Erasure) Technical Flow',
              p: 'Execute employee deletion request and query raw PostgreSQL tables.',
              c: 'DELETE FROM employees WHERE id = \'EMP-9021\';\nAudit Check:\nSELECT * FROM payroll_records WHERE employee_id = \'EMP-9021\';\nResult: 0 rows returned (Cascaded anonymization verified)',
            },
            {
              t: 'Step 2 — Verify Cookie Consent & Tracking Prevention',
              p: 'Inspect browser network traffic before user accepts cookie banner.',
              c: 'Network Inspection: 0 analytics beacons fired before consent -> GDPR Compliant (PASS)',
            },
          ],
        },
        {
          name: 'axe DevTools Accessibility Compliance Suite',
          sub: 'Section 508 / ADA / WCAG 2.1 AA Regulatory Engine',
          url: 'https://www.deque.com/axe/devtools/',
          seeChapter: 21,
          desc: 'Automated engine (see Chapter 21) asserting compliance against statutory accessibility mandates (ADA, European Accessibility Act, Section 508).',
          adv: [
            'Directly maps automated scan violations to WCAG 2.1 success criteria',
            'Zero false-positive rule set ensures actionable legal compliance reports',
          ],
          lim: [
            'Must be supplemented with manual screen reader testing for full compliance coverage',
          ],
          steps: [
            {
              t: 'Step 1 — Run automated WCAG AA compliance audit in CI',
              p: 'Scan public employee portal for Section 508 compliance violations.',
              c: 'npx @axe-core/cli https://staging.hrms.com/login --tags wcag2aa,section508\nResult: 0 Critical / 0 Serious Violations -> ADA COMPLIANCE VERIFIED',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Regulatory Clause Verification & Cryptographic Audit',
          body: 'Verify statutory mandates (GDPR Article 17 erasure, HIPAA audit logging, PCI-DSS encryption) against database tables.',
          doThis: 'Execute automated compliance test suite validating tokenization and encryption standards.',
          code: 'npx jest tests/compliance/gdpr-erasure.test.ts',
        },
      ],
      checklist: ['Verified complete data removal across primary tables and backups', 'Audited AES-256 encryption at rest and TLS 1.3 in transit', 'Logged timestamped test evidence for external compliance auditors'],
      practice: { title: 'GDPR Right to Erasure verification test', brief: 'Design an automated test that triggers an account deletion and audits 6 downstream tables for PII leaks.' },
      resources: [
        r('guide', 'Official GDPR Legal Text', 'https://gdpr-info.eu', 'EN'),
        r('tool', 'axe DevTools Accessibility Engine', 'https://www.deque.com/axe/devtools/', 'EN'),
      ],
    }),

    ch({
      id: 'tt-pilot-testing',
      kind: 'guide',
      phase: 'Part 16 · Governance, Deployment Strategies & Integration',
      level: 'intermediate',
      title: 'Pilot Testing',
      minutes: 20,
      durationLabel: 'Chapter 62',
      overviewText:
        'Pilot testing deploys the actual, real production system to a small, real, live subset of the intended user base — not a separate test build like beta testing, but the genuine live system used in genuine day-to-day operation by a limited group — before rolling it out to the full user base.',
      why:
        'Beta testing (Chapter 30) typically tests a pre-release build under real users\' informal, exploratory usage. Pilot testing goes a step further: it\'s the actual production rollout, used for genuine, real, ongoing work by a limited group, revealing exactly how the system holds up under real operational usage and real organizational processes — not just whether real users can find bugs while poking around a preview build.',
      when:
        'After beta testing has confirmed the build is stable, specifically before committing to a full-scale rollout across an entire organization or user base — particularly valuable for internal enterprise systems (like an HRMS) being rolled out department by department, or for a new customer-facing product being launched in one market before others.',
      practical: {
        app: 'HRMS Department Rollout',
        scenario:
          'Before rolling the new HRMS out company-wide, it\'s piloted with the 25-person Finance department for one full month of real, live usage.',
        pass: 'A bulk-approval improvement is built and verified with the same pilot group before the company-wide rollout proceeds, avoiding a much larger, harder-to-manage problem if every department had hit the same issue simultaneously.',
        fail: 'The pilot reveals that Finance\'s month-end payroll close process, which involves a specific bulk-approval workflow rarely used elsewhere, takes noticeably longer in the new system than the old one — a real operational regression invisible in earlier beta testing, which hadn\'t exercised that specific real workflow at real volume.',
      },
      advantages: [
        'Verifies real operational workflows under genuine daily production business usage',
        'Limits organizational business risk to a small, controlled user group before full rollout',
        'Surfaces employee training, onboarding, and documentation bottlenecks alongside software defects',
        'Provides empirical telemetry and user feedback to plan the pacing of full rollout',
      ],
      limitations: [
        'Plays out over real calendar weeks/months, making it slower than synthetic test runs',
        'Workflows unique to the pilot group may not uncover issues in other specialized departments',
        'Requires dedicated user support bandwidth during the active pilot phase',
        'Cannot completely replace full-scale load testing for high-concurrency sitewide launches',
      ],
      tools: [
        {
          name: 'Manual Pilot Group Supervision & Analytics',
          sub: 'Live Departmental Rollout & Operational Telemetry',
          url: 'https://hearth-learn.vercel.app/manuals/testing-types',
          seeChapter: 5,
          desc: 'Structured rollout methodology (see Chapter 5) monitoring real user satisfaction, task completion times, and support escalation tickets in production.',
          adv: [
            'Identifies business process friction before full organizational release',
            'Builds internal champions and super-users across pilot departments',
          ],
          lim: [
            'Requires dedicated customer support triage channel',
          ],
          steps: [
            {
              t: 'Step 1 — Scope Pilot Cohort and Provision Production Access',
              p: 'Select 25 Finance department users and provision live HRMS production accounts.',
              c: 'Pilot Parameters:\n- Cohort: Finance Dept (25 Users)\n- Duration: 30 Days\n- Authoritative Work: Real monthly payroll cycle',
            },
            {
              t: 'Step 2 — Track daily operational metrics & ticket escalations',
              p: 'Monitor task completion latency and support ticket volume in Jira Service Desk.',
              c: 'Telemetry:\n- Total Submissions: 1,420\n- Bulk Approval Latency: Identified 4.2s delay on 50+ batch sizes\n- Resolution: Added database index on approval status',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Live Production Cohort Observation & Metrics Tracking',
          body: 'Deploy production build to an isolated business unit cohort tracking task completion rates and support escalation frequency.',
          doThis: 'Enable feature flag for 10% pilot user segment and audit error logs.',
          code: 'launchdarkly-cli flags update-targeting hrms-v2 --rollout 10%',
        },
      ],
      checklist: ['Established clear escalation communication channels for pilot users', 'Monitored support ticket volume and resolution turnaround time', 'Resolved critical operational bottlenecks before widening release to 100%'],
      practice: { title: 'Pilot rollout plan design', brief: 'Create a 4-week pilot deployment plan for introducing an expense tracking tool to a sales team.' },
      resources: [
        r('guide', 'Pilot Testing in Software Engineering', 'https://www.geeksforgeeks.org/pilot-testing-software-testing/', 'EN'),
        r('guide', 'Phased Rollout Strategies', 'https://martinfowler.com/bliki/PhasedRelease.html', 'EN'),
      ],
    }),

    ch({
      id: 'tt-parallel-testing',
      kind: 'guide',
      phase: 'Part 16 · Governance, Deployment Strategies & Integration',
      level: 'intermediate',
      title: 'Parallel Testing',
      minutes: 25,
      durationLabel: 'Chapter 63',
      overviewText:
        'Parallel testing runs the old and new versions of a system side by side, processing the exact same real input through both simultaneously, and directly compares their outputs — verifying the new system produces correct, equivalent results before fully cutting over and retiring the old one.',
      why:
        'When replacing a critical system — especially one handling financial calculations, payroll, or other high-stakes logic — trusting the new system\'s correctness based on its own tests alone can be risky if the old system has years of real-world-proven behavior, including undocumented edge-case handling nobody fully wrote down. Parallel testing sidesteps that risk entirely: instead of trusting the new system\'s tests in isolation, it directly proves the new system produces the same results as the trusted old one, using real production input, before the old system is ever turned off.',
      when:
        'When replacing a critical, high-stakes system with real financial, legal, or safety consequences if the replacement gets something subtly wrong — run for a defined period processing real, live input through both systems before fully committing to the cutover and decommissioning the old system.',
      practical: {
        app: 'HRMS Payroll Calculation Migration',
        scenario:
          'The new HRMS\'s payroll calculation engine is run in parallel with the legacy system for two full monthly payroll cycles, with the legacy system\'s output remaining the one actually used to pay employees.',
        pass: 'The new system\'s rounding logic is corrected to match the legacy system\'s documented (and legally required) rounding rule, a repeat parallel run shows zero discrepancies across two full cycles, and the team proceeds to cut over with genuine confidence.',
        fail: 'A comparison script flags a discrepancy for 8 employees with overtime hours — the new system calculates overtime pay using a slightly different rounding rule than the legacy system, a subtle difference invisible in the new system\'s own unit tests, which had rounded consistently but not identically to the old system\'s real behavior.',
      },
      advantages: [
        'Directly proves correctness against a battle-tested legacy system using real production payloads',
        'Catches subtle arithmetic, rounding, and business logic discrepancies invisible in standalone unit tests',
        'Zero business risk during evaluation since legacy system remains the authoritative source of truth',
        'Gives executive stakeholders empirical mathematical proof before authorizing legacy retirement',
      ],
      limitations: [
        'High infrastructure and operational cost maintaining two live systems simultaneously',
        'Comparison script is only as good as the assertions it encodes — uncompared fields can harbor bugs',
        'Intended feature changes require manual triage so expected improvements aren\'t flagged as errors',
        'Significantly extends migration timelines by requiring multiple parallel billing/payroll cycles',
      ],
      tools: [
        {
          name: 'Custom Dual-Run Comparison Scripts',
          sub: 'Automated Python & SQL Discrepancy Diffing',
          url: 'https://hearth-learn.vercel.app/manuals/testing-types',
          desc: 'Automated scripts that feed identical input batches to legacy and modern systems simultaneously, diffing every resulting field in milliseconds.',
          adv: [
            'Compares thousands of financial records down to the cent in seconds',
            'Generates granular CSV discrepancy logs for accounting teams',
          ],
          lim: [
            'Requires writing custom diffing scripts tailored to both schemas',
          ],
          steps: [
            {
              t: 'Step 1 — Feed identical monthly timesheet batch to both engines',
              p: 'Execute payroll calculation in Legacy HRMS and New Cloud HRMS simultaneously.',
              c: 'python3 run_parallel_payroll.py --month=2026-08 --employees=14250',
            },
            {
              t: 'Step 2 — Execute automated SQL diff query in DBeaver',
              p: 'Audit net_salary, tax_deduction, and overtime_pay across both calculation tables.',
              c: 'SELECT l.emp_id, l.net_pay AS legacy_pay, n.net_pay AS new_pay, (n.net_pay - l.net_pay) AS diff\nFROM legacy_payroll l\nJOIN new_payroll n ON l.emp_id = n.emp_id\nWHERE abs(n.net_pay - l.net_pay) > 0.001;',
            },
            {
              t: 'Step 3 — Analyze discrepancy output',
              p: 'Confirm 0 discrepancies across all 14,250 records across 2 consecutive months.',
              c: 'Result: 0 rows returned | 100.00% Net Salary Match -> AUTHORIZED FOR CUTOVER',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Dual-Engine Output Comparison & Diff Auditing',
          body: 'Feed identical input transaction streams to legacy and replacement engines asserting identical calculated values.',
          doThis: 'Execute automated comparison script diffing monthly calculation outputs.',
          code: 'python3 scripts/diff_parallel_runs.py --legacy-output=old.csv --new-output=new.csv',
        },
      ],
      checklist: ['Processed live inputs through both systems concurrently for multiple cycles', 'Audited every output field discrepancy down to precision rounding decimals', 'Retained legacy engine as authoritative source until 100% parity verified'],
      practice: { title: 'Parallel testing comparison suite', brief: 'Write a Python script that diffs output JSON from legacy and modern invoice calculation endpoints.' },
      resources: [
        r('tool', 'DBeaver SQL Comparison Tools', 'https://dbeaver.io', 'EN'),
        r('guide', 'Parallel Testing Explained', 'https://www.guru99.com/parallel-testing.html', 'EN'),
      ],
    }),

    ch({
      id: 'tt-bigbang-vs-incremental-testing',
      kind: 'guide',
      phase: 'Part 16 · Governance, Deployment Strategies & Integration',
      level: 'intermediate',
      title: 'Big Bang vs. Incremental Integration Testing',
      minutes: 25,
      durationLabel: 'Chapter 64',
      overviewText:
        'Big Bang integration testing combines all modules or components at once and tests the fully assembled system together in a single pass, while incremental integration testing combines and tests modules gradually, one (or a few) at a time, verifying each newly added piece works correctly with what\'s already been integrated before adding the next.',
      why:
        'These represent two fundamentally different strategies for the same underlying goal — verifying that independently developed modules work correctly together — with very different trade-offs. Big Bang is simpler to set up but makes failures far harder to isolate (with everything combined at once, a single bug could be anywhere), while incremental integration takes more discipline to sequence but makes exactly where a new problem was introduced immediately obvious, since only one new piece was added at each step.',
      when:
        'Incremental integration is generally preferred for any system with clearly separable modules and enough time to integrate gradually — it\'s the far more common, more disciplined approach in modern development. Big Bang is sometimes used (often out of necessity rather than choice) when modules genuinely can\'t be meaningfully integrated separately, or under significant time pressure where a full incremental sequence isn\'t feasible.',
      practical: {
        app: 'HRMS Modules (Auth, Leave, Payroll)',
        scenario:
          'The HRMS\'s authentication, leave management, and payroll modules are integrated using an incremental approach: authentication first, then leave management against verified authentication, then payroll against both.',
        pass: 'Incremental result: When a bug appears during payroll integration (an authorization check incorrectly denies managers access to their team\'s payroll data), it\'s immediately clear the issue lies specifically in the newly added payroll module\'s own authorization logic, since authentication and leave management were both already fully verified working correctly beforehand.',
        fail: 'Contrast (hypothetical Big Bang): Had all three modules been combined and tested together at once from the start, the same bug would have required checking all three modules and their interactions from scratch to determine where the actual fault lay — a meaningfully slower diagnosis for the exact same underlying bug.',
      },
      advantages: [
        'Incremental: Pinpoints defect locations instantly to the single newly added component',
        'Incremental: Progressively builds system confidence without waiting for all modules to be completed',
        'Big Bang: Simple initial setup with no requirement for stubs, drivers, or sequenced scheduling',
        'Big Bang: Can be convenient when all modules finish development concurrently in small projects',
      ],
      limitations: [
        'Incremental: Requires architectural planning, dependency graphing, and maintaining test stubs/mocks',
        'Incremental: Takes more total calendar time as integration moves through structured stages',
        'Big Bang: Root-cause debugging is slow and painful when multiple interconnected components fail simultaneously',
        'Big Bang: Discovers integration defects late in the release cycle when fixes are most disruptive',
      ],
      tools: [
        {
          name: 'Playwright / Selenium Incremental Suite',
          sub: 'Sequenced Component Integration & Mocking Driver',
          url: 'https://playwright.dev',
          seeChapter: 6,
          desc: 'Automates incremental module integration testing (see Chapter 6), using API route mocking and staged component drivers to test modules in order of architectural dependency.',
          adv: [
            'Enables top-down (stubs) or bottom-up (drivers) incremental integration pipelines',
            'Pinpoints failing network boundaries immediately in automated CI reports',
          ],
          lim: [
            'Requires maintaining stub definitions until dependent modules are implemented',
          ],
          steps: [
            {
              t: 'Step 1 — Phase 1: Test Auth Module in Isolation',
              p: 'Verify JWT token generation and session expiration.',
              c: 'npx playwright test tests/integration/phase1-auth.spec.ts -> PASS',
            },
            {
              t: 'Step 2 — Phase 2: Integrate Leave Management with verified Auth',
              p: 'Verify leave request submission using authenticated JWT context.',
              c: 'npx playwright test tests/integration/phase2-auth-leave.spec.ts -> PASS',
            },
            {
              t: 'Step 3 — Phase 3: Integrate Payroll Module with Auth + Leave',
              p: 'Verify payroll calculation accurately reflects approved leave days.',
              c: 'npx playwright test tests/integration/phase3-auth-leave-payroll.spec.ts -> PASS (All 3 Modules Integrated)',
            },
          ],
        },
      ],
      steps: [
        {
          title: 'Top-Down / Bottom-Up Sequenced Module Assembly',
          body: 'Integrate modules in progressive sequence using test stubs and drivers, isolating defect locations to the single active boundary.',
          doThis: 'Execute Playwright staged integration pipeline in CI.',
          code: 'npx playwright test tests/incremental-integration/',
        },
      ],
      checklist: ['Defined dependency DAG (directed acyclic graph) for module integration order', 'Created lightweight mocks/stubs for downstream modules pending completion', 'Executed integration regression assertions at each component addition phase'],
      practice: { title: 'Incremental integration sequence plan', brief: 'Map out a 4-stage incremental integration plan for an E-commerce store (Auth -> Catalog -> Cart -> Payment).' },
      resources: [
        r('tool', 'Playwright API Mocking Docs', 'https://playwright.dev/docs/mock', 'EN'),
        r('guide', 'Integration Testing Strategies (ISTQB)', 'https://www.istqb.org', 'EN'),
      ],
    }),
  ],
}












