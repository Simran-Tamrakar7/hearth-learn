import { ch, r } from '../helpers.js'

/** Testing by level — unit → integration → system → UAT, with free tools teams actually use. */
export const testingLevelsManual = {
  id: 'testing-by-level',
  title: 'Testing by Level',
  tagline:
    'The four levels that carry an application from a single function to a signed-off release — each with the free tools teams actually use.',
  category: 'quality',
  accent: '#0F766E',
  cover: 'covers/test-automation-cover.png',
  duration: '2–3 weeks',
  levelSpan: 'Beginner → Intermediate',
  who: 'QA and builders who need a clear map of unit, integration, system, and acceptance testing — and which tools belong on each rung.',
  outcomes: [
    'Name the four testing levels and what each one is allowed to miss',
    'Pick a free tool for unit, integration, system, and UAT work',
    'Argue advantages vs limitations without treating any tool as the default',
  ],
  chapters: [
    ch({
      id: 'tbl-guide',
      kind: 'guide',
      phase: 'Start',
      level: 'beginner',
      title: 'The four rungs',
      minutes: 20,
      durationLabel: 'Day 0',
      overview:
        'Software Testing Reference · Part 1 of N. Tests are not a pile of cases — they are levels. A unit test cannot sign off a release. A UAT session cannot prove a function is correct in isolation. This path walks the four levels that carry an application from a single function to a signed-off release, with the free tools teams actually use and how those tools stack up against each other.',
      learn: ['Unit vs integration vs system vs UAT', 'What each level is allowed to miss', 'Free-tool posture'],
      steps: [
        {
          title: 'Read the stack bottom-up',
          body: 'Unit tests the smallest piece of code in isolation. Integration verifies that combined modules keep their contracts. System tests the fully wired product the way a user would. Acceptance (UAT) is the business gate: does this fit how the work actually happens?',
          items: [
            'Unit — a function, method, or class; dependencies mocked',
            'Integration — interfaces, data flow, and contracts between modules',
            'System — black-box, end to end, real user path',
            'Acceptance — stakeholders confirm fitness for the business, not just the spec',
          ],
          doThis: 'Write one sentence for each level using a product you know. If two sentences sound the same, you don’t have the distinction yet.',
        },
        {
          title: 'Tools are not levels',
          body: 'PyTest can run unit, API, and UI tests. Selenium can sit at integration or system. The level is the question you are asking, not the logo on the runner. This manual groups tools by the question they usually answer — then shows where they leak into other levels.',
          tip: 'If a tool can do three levels, still pick one question per test. Mixed-purpose suites rot fast.',
        },
      ],
      checklist: [
        'I can name the four levels in order',
        'I can say what a unit test is not allowed to prove',
        'I picked a product to map examples onto',
      ],
      practice: {
        title: 'Level map',
        brief: 'For one feature (login, checkout, or leave request), list one test you’d run at each of the four levels.',
      },
    }),

    ch({
      id: 'tbl-unit',
      phase: 'A · By level',
      level: 'beginner',
      title: 'Unit Testing',
      minutes: 35,
      overview:
        'Testing the smallest piece of code in isolation — a single function, method, or class — with every external dependency mocked out. JUnit, PyTest, and Jest are the free defaults in Java, Python, and JavaScript.',
      learn: ['Isolation and mocks', 'JUnit', 'PyTest', 'Jest'],
      steps: [
        {
          title: 'What isolation means',
          body: 'A unit test fails because this function is wrong — not because the database is down, the network is slow, or a sibling class changed. Mock anything you do not own in this test. If you need a running server, you have left the unit level.',
          doThis: 'Pick one function in your stack. Name what you would mock to keep it a unit test.',
        },
        {
          title: 'JUnit — Java',
          body: 'The standard unit testing framework for Java, built around annotations (@Test, @BeforeEach, @ParameterizedTest) and wired directly into Maven and Gradle build lifecycles.',
          items: [
            'Advantage: Deep IDE integration — pass/fail shows inline in IntelliJ and Eclipse',
            'Advantage: Runs automatically as part of the Maven/Gradle build, no extra wiring',
            'Advantage: Modular Platform/Jupiter/Vintage design supports legacy and modern code side by side',
            'Advantage: Rich annotation model (@Nested, @ParameterizedTest) keeps large suites organized',
            'Limitation: Java-only — no use outside the JVM ecosystem',
            'Limitation: More boilerplate than PyTest or Jest for the same test',
            'Limitation: No built-in mocking — Mockito or similar has to be added separately',
            'Limitation: Parameterized data sources need extra annotations most teams have to look up each time',
          ],
          resources: [{ label: 'junit.org', url: 'https://junit.org', kind: 'Docs' }],
        },
        {
          title: 'PyTest — Python',
          body: "Python's default testing framework — plain functions prefixed test_, discovered and run with no class inheritance or special imports required.",
          items: [
            'Advantage: Almost zero boilerplate — a plain function is a valid test',
            'Advantage: One of the richest plugin ecosystems (coverage, parallel runs, HTML reports, mocking, Playwright)',
            'Advantage: Same framework can cover unit, API/integration, and UI tests',
            'Advantage: Failure output shows both sides of a failed assertion clearly',
            'Limitation: Python-only',
            'Limitation: Heavy plugin use can make a suite fragile if plugin versions drift',
            'Limitation: Fixture scoping (function/class/module/session) has a learning curve',
            'Limitation: Loose structure means teams need their own conventions to stay consistent',
          ],
          resources: [{ label: 'pytest.org', url: 'https://pytest.org', kind: 'Docs' }],
          code: `def test_discount_applies():
    assert apply_discount(100, 10) == 90`,
          codeTitle: 'A valid PyTest unit test',
        },
        {
          title: 'Jest — JavaScript / TypeScript',
          body: "Meta's zero-configuration testing framework for JavaScript and TypeScript — runner, assertions, mocking, coverage, and snapshot testing bundled into one package.",
          items: [
            'Advantage: Zero-config — install and run, no separate assertion or mocking library needed',
            'Advantage: Parallel test execution by default via worker threads',
            'Advantage: Watch mode re-runs only affected tests for instant feedback',
            'Advantage: Snapshot testing catches unintended UI changes without writing new assertions',
            'Limitation: Snapshot tests get rubber-stamped if diffs are not actually reviewed',
            'Limitation: Config gets complex fast for ESM or monorepo setups',
            'Limitation: Slower cold-start on very large suites than newer runners like Vitest',
            'Limitation: Full TypeScript support needs the ts-jest wrapper, not native',
          ],
          resources: [{ label: 'jestjs.io', url: 'https://jestjs.io', kind: 'Docs' }],
          tip: 'Review every snapshot diff. Unreviewed snapshots are not tests.',
        },
      ],
      checklist: [
        'I can explain isolation vs a running system',
        'I know which unit runner matches my language',
        'I listed one limitation of that runner I will have to live with',
      ],
      practice: {
        title: 'One unit test',
        brief: 'Write one isolated test for a pure function. No network, no database, no UI.',
      },
      links: [
        { name: 'JUnit', url: 'https://junit.org', kind: 'doc' },
        { name: 'PyTest', url: 'https://pytest.org', kind: 'doc' },
        { name: 'Jest', url: 'https://jestjs.io', kind: 'doc' },
      ],
      resources: [
        r('doc', 'JUnit', 'https://junit.org', 'EN'),
        r('doc', 'PyTest', 'https://pytest.org', 'EN'),
        r('doc', 'Jest', 'https://jestjs.io', 'EN'),
      ],
    }),

    ch({
      id: 'tbl-integration',
      phase: 'A · By level',
      level: 'beginner',
      title: 'Integration Testing',
      minutes: 35,
      overview:
        'Verifying that components work correctly once combined — the interfaces, contracts, and data flow between modules that unit tests cannot see. Postman and PyTest hit APIs; Selenium can confirm the UI-to-backend path when the integration actually touches the browser.',
      learn: ['Contracts and data flow', 'Postman', 'PyTest for APIs', 'Selenium at this level'],
      steps: [
        {
          title: 'What unit tests cannot see',
          body: 'Serialization, auth headers, status codes, and “does this module’s output match the next module’s input?” live here. You are not proving a single function. You are proving a seam.',
          doThis: 'Name one seam in your product (login token → protected route, cart → inventory, form → email). That is an integration test target.',
        },
        {
          title: 'Postman — API client',
          body: 'An HTTP client built around Collections — grouped, chained API requests with variables passed between them and JavaScript assertions on every response.',
          items: [
            'Advantage: GUI-based, so non-developers can build and run requests without code',
            'Advantage: Collections + variables make chaining requests (e.g. login → use token) simple',
            'Advantage: Newman CLI runs full collections in CI/CD with JUnit-style reports',
            'Advantage: One-click environment switching between dev, staging, and production',
            'Limitation: Test scripts are JavaScript-only inside the Tests tab — awkward for complex logic',
            'Limitation: Large collections get hard to navigate and maintain over time',
            'Limitation: Free tier has workspace and monthly request limits at scale',
            'Limitation: Not built for direct database checks — HTTP only',
          ],
          resources: [{ label: 'postman.com', url: 'https://postman.com', kind: 'Docs' }],
        },
        {
          title: 'PyTest — API integration',
          body: "Used with the requests library, PyTest becomes an API integration tool that can add real logic — database checks, data manipulation — that Postman's scripts cannot easily do.",
          items: [
            'Advantage: Full Python logic available in tests — DB queries, complex assertions',
            'Advantage: Same framework and CI config as unit and UI tests, if already used elsewhere',
            'Advantage: Session-scoped fixtures share an auth token across an entire suite',
            'Advantage: pytest-html produces shareable, professional reports',
            'Limitation: Requires Python fluency — not approachable for manual/business testers',
            'Limitation: No GUI for quickly exploring an endpoint ad hoc, unlike Postman',
            'Limitation: Test data cleanup has to be handled manually in code',
            'Limitation: Less visual — harder to demo results to non-technical stakeholders',
          ],
          resources: [{ label: 'pytest.org', url: 'https://pytest.org', kind: 'Docs' }],
          tip: 'Use Postman to explore; use PyTest to lock the contract in CI.',
        },
        {
          title: 'Selenium — browser-backend flow',
          body: 'Used at the integration level to click real UI elements and confirm the correct data actually reaches the backend and comes back, rather than testing the API directly.',
          items: [
            'Advantage: Mature, 20+ years in production — huge documentation and community',
            'Advantage: WebDriver protocol works natively with every major browser',
            'Advantage: Selenium Grid distributes tests across machines and browsers in parallel',
            'Advantage: Validates the real frontend-to-backend path, not just the API contract',
            'Limitation: No built-in auto-waiting — flakier than Playwright without careful WebDriverWait usage',
            'Limitation: Slower to author tests than a pure API approach',
            'Limitation: Heavier setup and maintenance overhead than Postman or PyTest',
            'Limitation: Overkill when the integration in question does not touch the UI at all',
          ],
          resources: [{ label: 'selenium.dev', url: 'https://selenium.dev', kind: 'Docs' }],
        },
      ],
      checklist: [
        'I named one seam unit tests cannot see',
        'I know when Postman is enough vs when I need code',
        'I will not use a browser for an HTTP-only contract',
      ],
      practice: {
        title: 'One seam check',
        brief: 'Hit one API with Postman or requests. Assert status + one field. No UI unless the seam is the UI.',
      },
      links: [
        { name: 'Postman', url: 'https://postman.com', kind: 'doc' },
        { name: 'PyTest', url: 'https://pytest.org', kind: 'doc' },
        { name: 'Selenium', url: 'https://selenium.dev', kind: 'doc' },
      ],
    }),

    ch({
      id: 'tbl-system',
      phase: 'A · By level',
      level: 'intermediate',
      title: 'System Testing',
      minutes: 30,
      overview:
        'Testing the fully integrated application as a black box, end to end, exactly the way a real user would experience it. Playwright and Selenium are the free browser-automation pair to compare here.',
      learn: ['Black-box E2E', 'Playwright', 'Selenium'],
      steps: [
        {
          title: 'User path, not module path',
          body: 'System tests do not care how the code is split. They care that a user can finish the job: sign in, complete checkout, submit leave. If a unit test already covers the discount formula, do not re-prove the formula here — prove the path.',
          doThis: 'Write one happy-path and one failure-path as a user would say them. Those are system tests.',
        },
        {
          title: 'Playwright — modern browser automation',
          body: "Microsoft's browser automation library, built by former Puppeteer engineers, with auto-waiting and a Trace Viewer designed to remove the flakiness that plagued older tools.",
          items: [
            'Advantage: Auto-waiting removes most timing-related flaky failures automatically',
            'Advantage: One API drives Chromium, Firefox, and WebKit — no per-browser rewrites',
            'Advantage: Trace Viewer replays a failed run step-by-step with screenshots and network calls',
            'Advantage: Network interception mocks specific states without touching the real database',
            'Limitation: Newer tool — smaller long-tail community and fewer legacy integrations than Selenium',
            'Limitation: Teams migrating from Selenium have a real API and mental-model switch to make',
            'Limitation: Best support is in modern language bindings; older stacks may not be first-class',
            'Limitation: Trace files can get large on long test runs, adding storage overhead',
          ],
          resources: [{ label: 'playwright.dev', url: 'https://playwright.dev', kind: 'Docs' }],
        },
        {
          title: 'Selenium — veteran browser automation',
          body: 'The longest-standing browser automation tool, still widely deployed in enterprise frameworks, with WebDriver support in effectively every browser and CI system.',
          items: [
            'Advantage: 20+ years of maturity — the largest documentation base and community in the space',
            'Advantage: Integrates with virtually every CI/CD and test management tool that exists',
            'Advantage: Selenium Grid scales to large cross-browser, cross-machine test suites',
            'Advantage: Strong fit for teams with existing Java or C# Selenium frameworks',
            'Limitation: No auto-waiting — tests are more flaky by default without careful explicit waits',
            'Limitation: Test authoring is more verbose and slower than Playwright',
            'Limitation: Falling behind on developer experience — weaker debugging tools out of the box',
            'Limitation: Higher long-term maintenance cost as the UI under test evolves',
          ],
          resources: [{ label: 'selenium.dev', url: 'https://selenium.dev', kind: 'Docs' }],
          tip: 'Greenfield UI automation: start Playwright. Existing Java/C# Grid estate: stay on Selenium until you have a migration reason.',
        },
      ],
      checklist: [
        'I can state a system test as a user goal',
        'I know Playwright’s auto-wait vs Selenium’s explicit waits',
        'I will not duplicate unit logic inside an E2E',
      ],
      practice: {
        title: 'One user path',
        brief: 'Automate or manually walk one complete user job on staging. Note where waits or environment data broke the path.',
      },
      links: [
        { name: 'Playwright', url: 'https://playwright.dev', kind: 'doc' },
        { name: 'Selenium', url: 'https://selenium.dev', kind: 'doc' },
      ],
    }),

    ch({
      id: 'tbl-uat',
      phase: 'A · By level',
      level: 'intermediate',
      title: 'Acceptance Testing (UAT)',
      minutes: 30,
      overview:
        'The final gate before release, performed by real business stakeholders to confirm the software fits how the business actually works — not just the written spec. Manual sessions stay primary; TestRail and Jira keep the cycle visible.',
      learn: ['Business fitness', 'Manual UAT', 'TestRail', 'Jira'],
      steps: [
        {
          title: 'Spec-correct can still be wrong',
          body: 'UAT asks whether payroll, leave, or checkout matches how people actually do the job. Automation cannot substitute for that judgment. Your job is to give stakeholders scenarios, a place to mark pass/fail, and a loop for findings.',
          doThis: 'Write one UAT scenario in business language with no locators, no URLs, no “click the button.”',
        },
        {
          title: 'Manual testing — primary UAT method',
          body: 'Business users work through real scenarios — not scripted steps — applying job knowledge no automated check can substitute for.',
          items: [
            'Advantage: Applies real business judgment automation structurally cannot replicate',
            'Advantage: Scenarios are business-driven, surfacing exceptions a spec never anticipated',
            'Advantage: Catches requirement drift and specification gaps before go-live',
            'Advantage: Produces the formal, signed acceptance record required for sign-off',
            'Limitation: Business users are not trained testers — coverage can be inconsistent',
            'Limitation: Scheduling time with busy stakeholders is a recurring bottleneck',
            'Limitation: Feedback is often vague and needs a QA engineer to turn into an actionable bug',
            'Limitation: Does not scale to frequent releases the way automated levels do',
          ],
        },
        {
          title: 'TestRail — test case management',
          body: 'A web-based test case manager where UAT scenarios are assigned to specific business testers, who click through and mark pass/fail with comments — no technical skill needed.',
          items: [
            'Advantage: Structured scenario tracking that non-technical testers can execute unaided',
            'Advantage: Real-time dashboards show UAT progress without chasing anyone for status',
            'Advantage: Direct Jira integration turns a failed case into a bug ticket automatically',
            'Advantage: Free tier is workable for a typical small UAT cycle',
            'Limitation: Free tier caps users and projects — a constraint on larger UAT rounds',
            'Limitation: Someone still has to author good business-language scenarios up front',
            'Limitation: One more tool for already-busy stakeholders to get oriented in',
            'Limitation: Limited value on its own without a bug tracker connected to it',
          ],
          resources: [{ label: 'testrail.com', url: 'https://testrail.com', kind: 'Docs' }],
        },
        {
          title: 'Jira — bug and feedback tracking',
          body: 'The bug and feedback repository for a UAT cycle — testers log what they saw, developers pick it up, fix it, and hand it back for retest.',
          items: [
            'Advantage: Industry-standard issue tracking most teams already know',
            'Advantage: Kanban board gives a visual read on every open UAT finding at a glance',
            'Advantage: Free tier covers up to 10 users, enough for most UAT teams',
            'Advantage: Clear fix loop: open → fixed → ready for retest → closed',
            'Limitation: Not a test case manager by itself — needs TestRail or similar alongside it',
            'Limitation: 10-user free cap can be limiting once stakeholders are added in',
            'Limitation: Can get cluttered and noisy without disciplined ticket hygiene',
            'Limitation: UAT-specific workflows and fields need to be configured, not default',
          ],
          resources: [{ label: 'Jira', url: 'https://atlassian.com/software/jira', kind: 'Docs' }],
          tip: 'TestRail holds the scenarios. Jira holds the findings. Mixing both into one ticket pile hides coverage.',
        },
      ],
      checklist: [
        'I wrote one scenario with no UI jargon',
        'I know why UAT stays mostly manual',
        'I can split scenarios (TestRail) from bugs (Jira)',
      ],
      practice: {
        title: 'UAT packet',
        brief: 'Three business scenarios + a one-line pass/fail log. Ask a non-engineer if they could run them without you.',
      },
      links: [
        { name: 'TestRail', url: 'https://testrail.com', kind: 'doc' },
        { name: 'Jira', url: 'https://atlassian.com/software/jira', kind: 'doc' },
      ],
    }),

    ch({
      id: 'tbl-checkpoint',
      kind: 'checkpoint',
      phase: 'B · Gate',
      level: 'intermediate',
      title: 'Checkpoint: pick the right level',
      minutes: 25,
      durationLabel: 'Gate',
      overview:
        'Prove you can assign a test to a level and a tool without inflating the pyramid. Four levels, ten tools, free tier — use them on purpose.',
      learn: ['Level selection', 'Tool tradeoffs', 'Pyramid hygiene'],
      steps: [
        {
          title: 'Assign four tests',
          body: 'Take one feature. Write four tests — one per level — and name the tool you would use, plus one limitation you accept.',
          doThis: 'Publish a one-pager: feature, four tests, four tools, four limitations.',
          items: [
            'Unit — JUnit, PyTest, or Jest',
            'Integration — Postman, PyTest, or Selenium',
            'System — Playwright or Selenium',
            'UAT — manual + TestRail + Jira',
          ],
        },
        {
          title: 'Kill one redundant E2E',
          body: 'If you already have a unit test for the calculation and an API test for the contract, the browser path should only prove the user can finish the job. Cut anything else.',
          quiz: {
            question: 'A discount formula is wrong. Which level should catch it first?',
            options: ['Unit', 'Integration', 'System', 'UAT'],
            answer: 0,
            explain: 'A formula is a unit. System and UAT may still fail, but they are the expensive place to learn that math is wrong.',
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
