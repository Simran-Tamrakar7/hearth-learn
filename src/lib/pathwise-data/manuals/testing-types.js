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
  ],
}

