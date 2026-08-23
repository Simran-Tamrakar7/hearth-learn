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
  ],
}





