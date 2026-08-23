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
  ],
}
