import { ch, r } from '../helpers.js'

export const automationManuals = [
  {
    id: 'test-automation',
    title: 'Test Automation',
    tagline: 'Zero → job-ready strategy path — pyramid, risk, structure, CI, and framework design.',
    category: 'automation',
    accent: '#0B6E4F',
    cover: 'covers/test-automation-cover.png',
    duration: '8–10 weeks (part-time)',
    levelSpan: 'Beginner → Job-ready',
    who: 'Anyone starting QA automation with zero background — manual testers, career switchers, junior devs.',
    outcomes: [
      'Design a risk-based automation strategy and defend it in an interview',
      'Explain the test pyramid, choose layers, and avoid duplicate coverage',
      'Structure maintainable checks with POM, data isolation, and CI artifacts',
    ],
    pace: {
      hoursPerDay: '1–1.5 hours/day (≈ 7–10 hrs/week)',
      recommended: '~8–10 weeks',
      accelerated: '~5–6 weeks at 2–3 hrs/day',
      slow: '~12–14 weeks if busy',
    },
    chapters: [
      ch({
        id: 'ta-how',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this roadmap',
        minutes: 25,
        overview:
          'This is a strategy-first curriculum, not a tool tutorial. You will learn how to think like an automation engineer before you pick Playwright, Cypress, or Selenium. Follow the order, pass checkpoints, and build a public strategy repo employers can review.',
        learn: [
          'How to pace 8–10 weeks part-time',
          'Why strategy beats tool-hopping',
          'What job-ready means for automation strategy roles',
        ],
        steps: [
          {
            title: 'Study pace',
            body: 'Plan 1–1.5 hours most days (≈ 7–10 hrs/week). Accelerated learners at 2–3 hrs/day can finish in ~5–6 weeks. Busy schedule? Stretch to 12–14 weeks — consistency beats speed.',
            doThis: 'Block calendar slots for the next 7 days. Write your target finish date in a README.',
            items: [
              'Recommended: ~8–10 weeks at 7–10 hrs/week',
              'Accelerated: ~5–6 weeks at 2–3 hrs/day',
              'Slow track: ~12–14 weeks — still valid',
            ],
          },
          {
            title: 'Rules of the road',
            body: 'Follow chapters in order. Strategy before scripts. Checkpoints are gates — do not skip. Prefer writing artifacts (memos, pyramids, standards) over collecting bookmarks.',
            doThis: 'Create a GitHub repo named test-automation-strategy today. You will push artifacts starting Chapter 1.',
            tip: 'Pick one practice site (Sauce Demo or the-internet.herokuapp.com) and reuse it all path.',
          },
          {
            title: 'Checkpoints are contracts',
            body: 'Each checkpoint lists pass criteria. Treat them like exam requirements. If you fail, fix gaps before advancing — interviewers probe the same judgment.',
            doThis: 'Read both checkpoint chapters now. Copy their pass criteria into your repo README.',
          },
          {
            title: 'Job-ready definition',
            body: 'You are job-ready when you can: draw a test pyramid for a product, write a one-page automation strategy, explain why a check belongs at API vs UI layer, demo a green CI run, and walk through your public repo live.',
            doThis: 'Write a one-paragraph “done looks like…” note in your repo README.',
          },
        ],
        checklist: [
          'Calendar blocks set for this week',
          'GitHub repo created',
          'I read all checkpoint pass criteria',
          'I know my target timeline',
        ],
        practice: {
          title: 'Day zero setup',
          brief: 'Create the repo, add README with goal and timeline, make the first commit. Install nothing yet except Git and an editor.',
        },
        resources: [
          r('doc', 'Ministry of Testing', 'https://www.ministryoftesting.com/', 'EN'),
          r('doc', 'Test Automation University (Applitools)', 'https://testautomationu.applitools.com/', 'EN'),
        ],
        note: 'Stuck? Re-read the step’s doThis box — it is the smallest next action.',
      }),

      ch({
        id: 'ta-mindset',
        phase: 'A · Foundations',
        level: 'beginner',
        title: 'Testing vs automation mindset',
        minutes: 45,
        durationLabel: 'Week 1',
        overview:
          'Manual testing explores. Automation repeats certainty. This chapter builds the judgment to know which tool to pick — and why “automate everything” is a trap that burns teams.',
        learn: [
          'The job of testing vs the job of automation',
          'When automation pays for itself',
          'How to talk about risk without jargon',
        ],
        steps: [
          {
            title: 'Separate discovery from repetition',
            body: 'Exploration finds bugs and questions. Automation locks in answers you already trust. If you automate while still discovering, you freeze the wrong behavior.',
            doThis: 'Write two columns: “I still need to learn…” and “I need this checked every commit.” Move items ruthlessly.',
            tip: 'If a flow changes weekly, automate the stable core — not the fashion.',
          },
          {
            title: 'Cost of a check',
            body: 'Every automated check has write cost, wait cost, and flake cost. UI checks are the most expensive. Prefer fast feedback closer to the code when you can.',
            doThis: 'Pick one product feature. List 5 checks. Label each Unit / API / UI. Defend one label out loud.',
          },
          {
            title: 'Define “done” for an automated test',
            body: 'A good test fails for the right reason, reads like a story, and leaves an artifact (log, screenshot, trace) when it fails.',
            doThis: 'Write a one-sentence acceptance for your first future test: “Given… when… then…”',
          },
          {
            title: 'Manual skills still matter',
            body: 'Automation engineers who cannot explore manually write brittle scripts. Your manual charter (exploratory notes, charters, session sheets) feeds what to automate.',
            doThis: 'Spend 30 minutes exploring Sauce Demo manually. Write 10 observations automation would miss on first pass.',
          },
        ],
        checklist: [
          'I can explain testing vs automation to a non-engineer',
          'I have a risk list for one feature',
          'I know which layer my first check belongs to',
        ],
        practice: {
          title: 'Risk map',
          brief: 'For a demo login page, list 8 risks. Circle the 3 worth automating first. Share why the other 5 wait.',
        },
        resources: [
          r('doc', 'Practical Test Pyramid (Fowler)', 'https://martinfowler.com/articles/practical-test-pyramid.html', 'EN'),
          r('doc', 'Agile Testing — Crispin & Gregory', 'https://agiletester.ca/', 'EN'),
          r('lab', 'Sauce Demo (practice site)', 'https://www.saucedemo.com/', 'EN'),
        ],
      }),

      ch({
        id: 'ta-pyramid',
        phase: 'A · Foundations',
        level: 'beginner',
        title: 'The test pyramid in practice',
        minutes: 50,
        durationLabel: 'Week 1–2',
        overview:
          'The pyramid is a budget. Most checks should be fast and close to logic. A few UI journeys prove the seams. This chapter turns the diagram into daily decisions and written policy.',
        learn: ['Unit, integration, API, UI tradeoffs', 'How to spot duplicate coverage', 'Smoke vs deep suites'],
        steps: [
          {
            title: 'Draw your real pyramid',
            body: 'Ideal pyramids are rare. Start with what you have, then rebalance. Count tests by layer and by runtime.',
            doThis: 'Sketch three layers. Estimate count and minutes for each. Circle the top-heavy parts.',
          },
          {
            title: 'Kill vanity coverage',
            body: 'A 200-test UI suite that duplicates API checks wastes CI. Prefer one clear owner per risk.',
            doThis: 'Find two tests that assert the same thing. Delete or demote one on paper.',
            tip: 'Coverage % without risk context is a vanity metric.',
          },
          {
            title: 'Smoke pack definition',
            body: 'A 5–10 minute smoke suite should prove “the product boots and money paths work.” Deep suites run less often or in parallel shards.',
            doThis: 'Name 5 smoke scenarios for an e-commerce site. Estimate runtime per scenario.',
          },
          {
            title: 'Shift-left in plain language',
            body: 'Shift-left means finding bugs where they are cheapest to fix — in unit/API layers before UI. It is not “skip manual testing.”',
            doThis: 'For checkout flow, list what devs can unit-test, what QA automates at API, what needs one UI journey.',
          },
        ],
        checklist: [
          'I can defend a pyramid for my product',
          'I drafted a smoke pack with runtime budget',
          'I know what NOT to put in UI',
        ],
        practice: {
          title: 'Pyramid memo',
          brief: 'One page: current pyramid, ideal pyramid, 3 rebalancing moves this month. Commit to your repo as PYRAMID.md.',
        },
        resources: [
          r('doc', 'Test Pyramid (Fowler)', 'https://martinfowler.com/bliki/TestPyramid.html', 'EN'),
          r('doc', 'Google Testing Blog', 'https://testing.googleblog.com/', 'EN'),
        ],
      }),

      ch({
        id: 'ta-risk',
        phase: 'A · Foundations',
        level: 'beginner',
        title: 'Risk-based test selection',
        minutes: 55,
        durationLabel: 'Week 2',
        overview:
          'Pro automation is risk management with code. Learn to score features by impact × likelihood, map risks to layers, and say “no” to low-value checks with evidence.',
        learn: [
          'Impact × likelihood scoring',
          'Revenue and trust paths first',
          'Automation ROI conversations with PMs',
        ],
        steps: [
          {
            title: 'Build a risk matrix',
            body: 'List features. Score impact (1–5) and likelihood of failure (1–5). Multiply. High scores get automation priority.',
            doThis: 'Score 8 features on Sauce Demo or a fictional SaaS. Automate the top 3 risks first on paper.',
          },
          {
            title: 'Trust paths vs edge cases',
            body: 'Login, pay, save data, permissions — automate early. Obscure edge cases may stay manual or get API-only checks.',
            doThis: 'Identify 3 trust paths for any app you use daily. Write one automated check idea per path.',
          },
          {
            title: 'Say no with data',
            body: 'When stakeholders ask for “automate everything,” respond with pyramid, runtime, and flake cost — not opinion.',
            doThis: 'Draft a 3-sentence reply to “Can we automate all 500 manual cases?”',
            tip: 'Offer a smoke pack + quarterly expansion plan instead of a flat no.',
          },
          {
            title: 'Regression vs change detection',
            body: 'Regression proves old behavior still works. Change detection catches new bugs. Your suite mix should do both.',
            doThis: 'Label your planned checks as regression or change-detection. Adjust if one type dominates.',
          },
        ],
        checklist: [
          'Risk matrix with 8+ items',
          'Top 3 automation candidates identified',
          'I can explain ROI to a PM',
        ],
        practice: {
          title: 'Risk charter',
          brief: 'Write a 1-page RISK.md: matrix, top risks, proposed automation layers, and what stays manual.',
        },
        resources: [
          r('doc', 'Rapid Software Testing — James Bach', 'https://www.satisfice.com/blog/archives/408', 'EN'),
          r('doc', 'Heuristic Test Strategy Model', 'https://www.satisfice.com/download/heuristic-test-strategy-model', 'EN'),
        ],
      }),

      ch({
        id: 'ta-selectors',
        phase: 'B · Technical Basics',
        level: 'beginner',
        title: 'Selectors, the DOM, and stable locators',
        minutes: 55,
        durationLabel: 'Week 2–3',
        overview:
          'Flaky tests often start with brittle locators. Learn to read the DOM, prefer roles and test IDs, and treat selectors as product contracts — before you depend on any framework.',
        learn: ['DOM basics for testers', 'Role / label / test-id hierarchy', 'Why XPath spaghetti dies'],
        steps: [
          {
            title: 'Tour DevTools',
            body: 'Elements, Console, Network. You will live here. Practice selecting nodes and reading accessibility names.',
            doThis: 'Open any form. Find the accessible name of the submit button in DevTools Accessibility pane.',
          },
          {
            title: 'Locator preference order',
            body: 'Prefer getByRole / label text → test id → CSS → XPath last. User-facing queries survive redesigns better.',
            doThis: 'Rewrite three CSS selectors as role or test-id queries on paper.',
            tip: 'Ask eng for data-testid on critical controls — it is a feature, not a cheat.',
          },
          {
            title: 'Assert outcomes, not pixels',
            body: 'Assert URL, text, enabled state, API response — not “div.x is red” unless visual risk is the point.',
            doThis: 'For a login success, write 2 good asserts and 1 bad assert. Explain why the bad one is brittle.',
          },
          {
            title: 'Selector policy doc',
            body: 'Teams that survive have a written locator standard. One page beats tribal knowledge.',
            doThis: 'Draft SELECTORS.md: preference order, banned patterns, when to request test ids from dev.',
          },
        ],
        checklist: [
          'I can find roles in DevTools',
          'I have a locator style rule written',
          'I know when test ids are OK',
        ],
        practice: {
          title: 'Locator lab',
          brief: 'On the-internet.herokuapp.com, list locators for 5 controls using roles first. Commit LOCATOR-LAB.md.',
        },
        resources: [
          r('lab', 'The Internet (Herokuapp)', 'https://the-internet.herokuapp.com/', 'EN'),
          r('doc', 'MDN — Accessibility', 'https://developer.mozilla.org/en-US/docs/Web/Accessibility', 'EN'),
          r('doc', 'Playwright — Locators', 'https://playwright.dev/docs/locators', 'EN'),
        ],
      }),

      ch({
        id: 'ta-first-script',
        phase: 'B · Technical Basics',
        level: 'beginner',
        title: 'Your first automated script',
        minutes: 60,
        durationLabel: 'Week 3',
        overview:
          'Ship the loop: open → act → assert → see it fail → see it pass. Clean structure comes after the dopamine of green. Pick one stack for this chapter only.',
        learn: ['Install a runner', 'Write one happy path', 'Read a failure calmly'],
        steps: [
          {
            title: 'Pick a stack for this week',
            body: 'Playwright or Cypress are both fine starts. Commit to one for 7 days so tool-hopping does not steal learning.',
            doThis: 'Install one tool. Run their sample test. Screenshot the green result.',
          },
          {
            title: 'Automate login happy path',
            body: 'Visit, type, click, assert landing. Keep it ugly but clear. Names matter more than cleverness.',
            doThis: 'Automate Sauce Demo login. Commit the file to your strategy repo under tests/exploratory/.',
            code: '// Playwright example (concept applies to any tool)\nawait page.goto("https://www.saucedemo.com/");\nawait page.getByPlaceholder("Username").fill("standard_user");\nawait page.getByPlaceholder("Password").fill("secret_sauce");\nawait page.getByRole("button", { name: "Login" }).click();\nawait expect(page).toHaveURL(/inventory/);',
          },
          {
            title: 'Break it on purpose',
            body: 'Change an assertion so it fails. Read the error. Fix. This trains debugging muscle.',
            doThis: 'Fail → read → fix → note what the error taught you in 2 sentences in DEBUG-NOTES.md.',
          },
          {
            title: 'Negative path',
            body: 'Wrong password, empty fields, locked user — one negative case proves you assert errors, not just happy paths.',
            doThis: 'Add a locked_out_user test. Assert error message text.',
          },
        ],
        checklist: [
          'Green test committed locally',
          'I can explain my test to a friend',
          'I saved a failure artifact or screenshot',
        ],
        practice: {
          title: 'Happy + negative pair',
          brief: 'Two tests: valid login and locked user. Both isolated — no shared state.',
        },
        resources: [
          r('lab', 'Sauce Demo', 'https://www.saucedemo.com/', 'EN'),
          r('doc', 'Playwright — Getting Started', 'https://playwright.dev/docs/intro', 'EN'),
          r('doc', 'Cypress — Getting Started', 'https://docs.cypress.io/guides/getting-started/installing-cypress', 'EN'),
        ],
      }),

      ch({
        id: 'ta-checkpoint-a',
        kind: 'checkpoint',
        phase: 'B · Technical Basics',
        level: 'beginner',
        title: 'Checkpoint A — Strategy artifacts + first script',
        minutes: 35,
        durationLabel: 'Gate',
        overview:
          'Prove Phase A–B before structure chapters. Your repo should show judgment (strategy docs) and execution (one green script) — not empty folders.',
        learn: ['Checkpoint pass criteria', 'Self-review before advancing'],
        steps: [
          {
            title: 'Pass criteria',
            body: 'All must be true before Chapter 8.',
            doThis: 'Open your repo and verify each item. Fix gaps today.',
            items: [
              'PYRAMID.md and RISK.md committed with real content',
              'SELECTORS.md with locator preference order',
              'At least one green UI test (login happy path)',
              'One negative test (locked user or wrong password)',
              'README explains repo purpose and how to run tests',
              '5+ meaningful commits with clear messages',
            ],
          },
          {
            title: 'Self-review',
            body: 'Clone your repo in a fresh folder. Follow README from scratch. If you cannot, fix README.',
            doThis: 'Ask: “Can a hiring manager understand my strategy in 3 minutes?”',
          },
        ],
        checklist: [
          'All 6 pass criteria verified',
          'Repo is public on GitHub',
          'I can explain pyramid choices aloud',
        ],
        practice: {
          title: 'Peer review',
          brief: 'Ask a friend or future-you to read RISK.md and attack one assumption. Revise.',
        },
        resources: [
          r('doc', 'GitHub — README guide', 'https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes', 'EN'),
        ],
      }),

      ch({
        id: 'ta-structure',
        phase: 'C · Structure',
        level: 'intermediate',
        title: 'Page objects, data, and waits',
        minutes: 65,
        durationLabel: 'Week 4–5',
        overview:
          'Structure is kindness to future-you. Hide selectors behind intent, seed data via API, and wait for conditions — never sleep.',
        learn: ['POM / screenplay ideas', 'Fixture data', 'Deterministic waits'],
        steps: [
          {
            title: 'Extract a page object',
            body: 'Methods named like user intent: loginAs(user), addItem(name). Selectors live in one place.',
            doThis: 'Refactor your login test into a LoginPage with loginAs(username, password) method.',
            code: '// Conceptual POM\nclass LoginPage {\n  constructor(page) { this.page = page; }\n  async loginAs(user, pass) {\n    await this.page.getByPlaceholder("Username").fill(user);\n    await this.page.getByPlaceholder("Password").fill(pass);\n    await this.page.getByRole("button", { name: "Login" }).click();\n  }\n}',
          },
          {
            title: 'Data without shared pollution',
            body: 'Unique emails, API create/delete, or transactional resets. Shared “admin” users create ghosts.',
            doThis: 'Generate a unique user per run (timestamp or uuid). Document data strategy in DATA.md.',
            tip: 'Prefer API setup + UI assert for speed.',
          },
          {
            title: 'Ban hard sleeps',
            body: 'Wait for network idle, element visible, or response. Sleeps hide races until CI load exposes them.',
            doThis: 'Find any waitForTimeout/sleep/Thread.sleep. Replace with a condition wait. Zero tolerance policy.',
          },
          {
            title: 'Test isolation',
            body: 'Each test should setup and teardown its own state. Order-dependent suites are debt.',
            doThis: 'Run your tests in random order. Fix any that fail when shuffled.',
          },
        ],
        checklist: [
          'POM for login flow',
          'Unique test data strategy documented',
          'Zero hard sleeps in my suite',
        ],
        practice: {
          title: 'Stabilize a flake',
          brief: 'Reproduce a flake 5 times. Fix root cause. Document in FLAKES.md with cause and fix.',
        },
        resources: [
          r('doc', 'Playwright — Page Object Model', 'https://playwright.dev/docs/pom', 'EN'),
          r('doc', 'xUnit Test Patterns — Meszaros', 'http://xunitpatterns.com/', 'EN'),
        ],
      }),

      ch({
        id: 'ta-reporting',
        phase: 'C · Structure',
        level: 'intermediate',
        title: 'Reporting, artifacts, and debugging',
        minutes: 50,
        durationLabel: 'Week 5',
        overview:
          'Green tests are silent. Red tests must scream with context. Learn traces, screenshots, videos, and report formats that make triage fast.',
        learn: ['Failure artifacts', 'HTML/Allure reports', 'Triage workflow'],
        steps: [
          {
            title: 'Artifact on failure',
            body: 'Screenshot, trace, video, console log — configure your runner to capture on fail only to save disk.',
            doThis: 'Trigger a failure. Confirm artifact exists and shows the broken state.',
          },
          {
            title: 'Readable test names',
            body: 'test_login_with_locked_user_shows_error_message beats test_3. Names are documentation.',
            doThis: 'Rename all tests to describe behavior. No test1, test2.',
          },
          {
            title: 'Report for humans',
            body: 'HTML report or Allure gives PMs and devs a dashboard. JSON logs alone do not scale teams.',
            doThis: 'Generate an HTML report locally. Open it and find a failed test in under 30 seconds.',
          },
          {
            title: 'Triage ritual',
            body: 'Define: who owns red builds, SLA for fix, flake vs bug classification.',
            doThis: 'Write TRIAGE.md — 5 lines: owner, SLA, artifact location, flake definition, escalation.',
          },
        ],
        checklist: [
          'Artifacts on failure configured',
          'All tests descriptively named',
          'TRIAGE.md written',
        ],
        practice: {
          title: 'Debug drill',
          brief: 'Break a test intentionally. Use trace/screenshot to find root cause in under 10 minutes. Document steps.',
        },
        resources: [
          r('doc', 'Playwright — Trace Viewer', 'https://playwright.dev/docs/trace-viewer', 'EN'),
          r('doc', 'Allure Report', 'https://allurereport.org/docs/', 'EN'),
        ],
      }),

      ch({
        id: 'ta-ci',
        phase: 'D · Delivery',
        level: 'intermediate',
        title: 'CI, artifacts, and ownership',
        minutes: 60,
        durationLabel: 'Week 6',
        overview:
          'Tests that only run on your laptop are hobbies. Wire CI, fail loud with traces/videos, and assign owners to red builds.',
        learn: ['PR checks', 'Artifacts in CI', 'Flake budgets'],
        steps: [
          {
            title: 'Run on every PR',
            body: 'GitHub Actions on pull_request. Keep smoke fast (<10 min) so people do not skip.',
            doThis: 'Add a workflow that runs your suite and uploads artifacts on failure.',
            code: 'name: UI Tests\non: [pull_request, push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n      - run: npm ci && npx playwright install --with-deps\n      - run: npx playwright test\n      - uses: actions/upload-artifact@v4\n        if: failure()\n        with:\n          name: test-results\n          path: test-results/',
          },
          {
            title: 'Own the red',
            body: 'Dashboards without owners are wallpaper. Define who triages within 24h.',
            doThis: 'Write a 5-line “red build ritual” for your team (even if the team is just you).',
          },
          {
            title: 'Flake budget',
            body: 'Allow 0–2% flake rate. Above that, stop adding tests until stability improves.',
            doThis: 'Track last 20 CI runs. Count flakes. If >1, list top 3 suspects in FLAKES.md.',
          },
          {
            title: 'Branch protection',
            body: 'Required status checks on main prevent merging broken code. Configure when you have a green baseline.',
            doThis: 'Enable required check for your test workflow on main (or document plan if solo).',
          },
        ],
        checklist: [
          'CI green on main',
          'Artifact uploaded on fail',
          'Triage ritual written',
          'Flake count tracked',
        ],
        practice: {
          title: 'Actions pipeline',
          brief: 'Ship workflow + README section “How to debug CI fails.” Screenshot green run in docs/ci-green.png.',
        },
        resources: [
          r('doc', 'GitHub Actions — Quickstart', 'https://docs.github.com/en/actions/quickstart', 'EN'),
          r('doc', 'Playwright — CI', 'https://playwright.dev/docs/ci', 'EN'),
        ],
      }),

      ch({
        id: 'ta-strategy',
        phase: 'D · Delivery',
        level: 'advanced',
        title: 'Risk-based strategy & framework design',
        minutes: 70,
        durationLabel: 'Week 7–8',
        overview:
          'Pro craft is judgment under constraints. Cover revenue and trust paths, design frameworks teams can extend, and mentor standards.',
        learn: ['Strategy one-pager', 'Multi-layer design', 'Onboarding docs'],
        steps: [
          {
            title: 'Write the strategy one-pager',
            body: 'Goals, layers, smoke vs deep, flake budget, ownership, tools. One page beats a wiki novel.',
            doThis: 'Draft STRATEGY.md for a fictional checkout product. Include pyramid, smoke pack, and 6-month roadmap.',
          },
          {
            title: 'Framework for humans',
            body: 'Helpers, env configs, secrets handling, plugins. Optimize for onboarding time — not clever abstractions.',
            doThis: 'List 5 “golden path” docs a new hire needs on day 1. Create stubs in docs/onboarding/.',
          },
          {
            title: 'Multi-tool coexistence',
            body: 'Real teams run Selenium legacy + Playwright new + API in Postman. Strategy explains boundaries.',
            doThis: 'Write a paragraph: when to add Playwright vs extend Selenium vs stay API-only.',
          },
          {
            title: 'Interview defense',
            body: 'Prepare to walk through strategy, demo CI, explain a flake fix, and justify pyramid choices.',
            doThis: 'Record a 5-minute Loom (or voice memo) walking through your repo. Watch it — fix gaps.',
          },
        ],
        checklist: [
          'STRATEGY.md complete',
          'Flake budget defined',
          'Onboarding checklist exists',
          'I can defend tradeoffs aloud',
        ],
        practice: {
          title: 'Mock interview',
          brief: 'Friend asks: “Why not automate everything?” “Why UI for login?” “Show me a flake fix.” Answer from your repo.',
        },
        resources: [
          r('doc', 'Ministry of Testing — Automation articles', 'https://www.ministryoftesting.com/articles', 'EN'),
          r('doc', 'Continuous Delivery — Humble & Farley', 'https://continuousdelivery.com/', 'EN'),
        ],
      }),

      ch({
        id: 'ta-checkpoint-b',
        kind: 'checkpoint',
        phase: 'D · Delivery',
        level: 'advanced',
        title: 'Checkpoint B — Job-ready strategy portfolio',
        minutes: 40,
        durationLabel: 'Gate',
        overview:
          'Final gate. Your public repo should read like a junior automation engineer’s strategy portfolio — docs, structure, CI, and interview readiness.',
        learn: ['Job-ready portfolio criteria'],
        steps: [
          {
            title: 'Pass criteria',
            body: 'All must be true to mark this path complete.',
            doThis: 'Verify every item on GitHub live.',
            items: [
              'STRATEGY.md, PYRAMID.md, RISK.md, SELECTORS.md committed',
              'POM-refactored test suite (3+ flows)',
              'GitHub Actions green on main with artifact on failure',
              'FLAKES.md and TRIAGE.md show operational maturity',
              'README with setup, run instructions, and portfolio summary',
              'Can demo repo + CI in under 5 minutes on a call',
            ],
          },
          {
            title: 'Next steps',
            body: 'Strategy without depth in a tool is incomplete. Pick Playwright, Cypress, or API Testing path next for hands-on depth.',
            doThis: 'Add NEXT-STEPS.md linking to your chosen tool path and capstone project idea.',
          },
        ],
        checklist: [
          'All 6 pass criteria verified',
          'Repo linked in resume or LinkedIn',
          'Mock interview completed',
        ],
        practice: {
          title: 'Capstone pitch',
          brief: 'Write 3 sentences for a cover letter: what you built, what it proves, link to repo.',
        },
        resources: [
          r('doc', 'Test Automation University — Career', 'https://testautomationu.applitools.com/', 'EN'),
        ],
      }),
    ],
  },

  {
    id: 'cypress',
    title: 'Cypress',
    tagline: 'Multi-week Cypress path — setup → selectors → intercept → POM → CI → a11y → team standards.',
    category: 'automation',
    accent: '#2E7D32',
    cover: 'covers/cypress-cover.png',
    duration: '10–12 weeks (part-time)',
    levelSpan: 'Beginner → Job-ready',
    who: 'Developers and QA who want fast, debuggable UI tests with Cypress — no prior E2E experience required.',
    outcomes: [
      'Write reliable Cypress specs with stable selectors and network control',
      'Build POM structure with cy.session, cy.intercept, and custom commands',
      'Ship Cypress in GitHub Actions with artifacts, a11y checks, and team standards',
    ],
    pace: {
      hoursPerDay: '1.5–2 hours/day (≈ 10–12 hrs/week)',
      recommended: '~10–12 weeks',
      accelerated: '~7–8 weeks at 3 hrs/day',
      slow: '~14–16 weeks if busy',
    },
    chapters: [
      ch({
        id: 'cy-how',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this roadmap',
        minutes: 25,
        overview:
          'Cypress is not a weekend install — this path takes you from zero to job-ready: real selectors, network stubbing, POM, CI, accessibility, and team standards. Follow order, pass checkpoints, push to a public repo.',
        learn: [
          '10–12 week pacing plan',
          'Cypress strengths and limits (same-origin, browser support)',
          'Job-ready Cypress portfolio definition',
        ],
        steps: [
          {
            title: 'Study pace',
            body: 'Plan 1.5–2 hours most days. Cypress rewards daily practice — the command log becomes muscle memory.',
            doThis: 'Block calendar slots. Create cypress-journey repo on GitHub today.',
            items: [
              'Recommended: ~10–12 weeks at 10–12 hrs/week',
              'Accelerated: ~7–8 weeks at 3 hrs/day',
              'Slow: ~14–16 weeks — consistency wins',
            ],
          },
          {
            title: 'Prerequisites',
            body: 'Basic JavaScript (variables, functions, async/await intuition). Basic Git. HTML/CSS reading helps but is learnable along the way.',
            doThis: 'If rusty on JS, spend 2 days on freeCodeCamp JS basics before Chapter 2.',
          },
          {
            title: 'Practice app',
            body: 'You will use Sauce Demo, example.cypress.io, and optionally Cypress Real World App. Stick to one primary app per phase.',
            doThis: 'Bookmark Sauce Demo. Create cypress/e2e/ folder structure in your repo.',
          },
          {
            title: 'Checkpoints',
            body: 'Three gates: first green suite, intercept + POM, CI + a11y + standards. Do not skip.',
            doThis: 'Read all checkpoint chapters. Copy pass criteria to README.',
          },
        ],
        checklist: [
          'Repo created',
          'Calendar blocked',
          'Checkpoint criteria copied',
          'Node.js 18+ installed',
        ],
        practice: {
          title: 'Day zero',
          brief: 'npm init, git init, README with goal and timeline, first commit.',
        },
        resources: [
          r('doc', 'Cypress Documentation', 'https://docs.cypress.io/', 'EN'),
          r('video', 'Cypress YouTube Channel', 'https://www.youtube.com/c/Cypressio', 'EN'),
        ],
      }),

      ch({
        id: 'cy-setup',
        phase: 'A · Setup',
        level: 'beginner',
        title: 'Install, project layout, first green',
        minutes: 50,
        durationLabel: 'Week 1',
        overview:
          'Know where config, specs, and support files live. Get one green test before you decorate the suite. Understand the Cypress App and command log.',
        learn: ['cypress.config', 'e2e folder', 'Runner time-travel', 'cy.visit / get / type / click / should'],
        steps: [
          {
            title: 'Scaffold project',
            body: 'npm init, install cypress, open Cypress App. Default e2e structure appears.',
            doThis: 'Run npm install cypress --save-dev && npx cypress open. Run the included example spec.',
            code: 'npm init -y\nnpm install cypress --save-dev\nnpx cypress open',
          },
          {
            title: 'Config essentials',
            body: 'cypress.config.js sets baseUrl, viewport, retries, video. Keep config minimal until you need more.',
            doThis: 'Set baseUrl to https://www.saucedemo.com in cypress.config.js.',
            code: 'const { defineConfig } = require("cypress");\nmodule.exports = defineConfig({\n  e2e: {\n    baseUrl: "https://www.saucedemo.com",\n    setupNodeEvents(on, config) {},\n  },\n});',
          },
          {
            title: 'Your first spec',
            body: 'cy.visit, cy.get, cy.type, cy.click, cy.should. Prefer data-cy or getByRole-style queries.',
            doThis: 'Write login.cy.js: visit /, login as standard_user, assert inventory page.',
          },
          {
            title: 'Command log superpower',
            body: 'Hover each command in the runner — snapshots show DOM at every step. This is why Cypress debugs faster than many tools.',
            doThis: 'Fail a test on purpose. Step through the log to find where state diverged.',
          },
        ],
        checklist: [
          'Cypress App opens',
          'baseUrl configured',
          'One custom green spec committed',
          'I used should() not ad-hoc ifs',
        ],
        practice: {
          title: 'Login happy path',
          brief: 'Spec: fill credentials → submit → assert URL contains inventory and cart icon visible.',
        },
        resources: [
          r('doc', 'Cypress — Installing Cypress', 'https://docs.cypress.io/guides/getting-started/installing-cypress', 'EN'),
          r('lab', 'example.cypress.io', 'https://example.cypress.io', 'EN'),
          r('lab', 'Sauce Demo', 'https://www.saucedemo.com/', 'EN'),
        ],
      }),

      ch({
        id: 'cy-selectors',
        phase: 'A · Setup',
        level: 'beginner',
        title: 'Selectors & assertions that stick',
        minutes: 55,
        durationLabel: 'Week 1–2',
        overview:
          'Retry-ability is Cypress’s gift. Do not fight it with arbitrary waits. Choose locators the app can keep stable and assert what users care about.',
        learn: ['data-cy / roles / labels', 'should vs and / then', 'Debugging failures'],
        steps: [
          {
            title: 'Selector rules',
            body: 'data-cy / data-testid / roles over brittle CSS. Avoid nth-child and deep DOM chains.',
            doThis: 'Add data-cy attributes to a local HTML toy page. Select them from Cypress.',
            tip: 'Document selector policy in SELECTORS.md — same as any pro team.',
          },
          {
            title: 'Chaining and should',
            body: 'cy.get(...).should("be.visible").and("contain", "text") — assertions retry automatically.',
            doThis: 'Write 5 assertions for inventory page: title, item count, sort dropdown, cart badge, footer.',
          },
          {
            title: 'Ban cy.wait(ms)',
            body: 'cy.wait(3000) hides races. Use cy.intercept aliases or should with timeout instead.',
            doThis: 'Search your specs for cy.wait(number). Replace every instance.',
          },
          {
            title: 'Negative assertions',
            body: 'should("not.exist"), should("be.disabled") — prove error states, not just happy paths.',
            doThis: 'Test locked_out_user login shows error message and stays on login page.',
          },
        ],
        checklist: [
          'SELECTORS.md in repo',
          'No cy.wait(ms) in specs',
          'Positive and negative login tests',
        ],
        practice: {
          title: 'Selector refactor',
          brief: 'Take 3 brittle CSS selectors. Rewrite with data-cy or contains. Commit before/after in PR.',
        },
        resources: [
          r('doc', 'Cypress — Best Practices', 'https://docs.cypress.io/guides/references/best-practices', 'EN'),
          r('doc', 'Cypress — Selecting Elements', 'https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Selecting-elements', 'EN'),
        ],
      }),

      ch({
        id: 'cy-commands',
        phase: 'B · Core',
        level: 'intermediate',
        title: 'Custom commands & reusable flows',
        minutes: 55,
        durationLabel: 'Week 2–3',
        overview:
          'DRY with intent. Custom commands wrap repeated flows without hiding too much. Keep parameters visible in specs.',
        learn: ['cy.commands.add', 'Support file', 'Type definitions for IDE'],
        steps: [
          {
            title: 'login custom command',
            body: 'Wrap auth in cy.login(user, pass). Specs stay readable; implementation lives in cypress/support/commands.js.',
            doThis: 'Create cy.login and use it in two specs.',
            code: 'Cypress.Commands.add("login", (username, password) => {\n  cy.visit("/");\n  cy.get("[data-test=username]").type(username);\n  cy.get("[data-test=password]").type(password);\n  cy.get("[data-test=login-button]").click();\n});',
          },
          {
            title: 'Command boundaries',
            body: 'Do not hide assertions inside commands unless they are universal (e.g. login always lands on inventory).',
            doThis: 'Review commands — each should do one thing. Split overloaded commands.',
          },
          {
            title: 'Fixtures for test data',
            body: 'cy.fixture("users.json") loads static data. Combine with dynamic ids for isolation.',
            doThis: 'Create fixtures/users.json with standard_user, locked_out_user, problem_user.',
          },
          {
            title: 'beforeEach hygiene',
            body: 'Reset state before each test. cy.visit or session restore — never assume prior test left clean state.',
            doThis: 'Add beforeEach that visits baseUrl or restores session. Verify tests pass in isolation.',
          },
        ],
        checklist: [
          'cy.login command used in 2+ specs',
          'Fixtures for user data',
          'Tests pass when run individually',
        ],
        practice: {
          title: 'Add to cart command',
          brief: 'cy.addItem("Sauce Labs Backpack") — reusable across cart and checkout specs.',
        },
        resources: [
          r('doc', 'Cypress — Custom Commands', 'https://docs.cypress.io/api/cypress/custom-commands', 'EN'),
          r('doc', 'Cypress — Fixtures', 'https://docs.cypress.io/api/commands/fixture', 'EN'),
        ],
      }),

      ch({
        id: 'cy-intercept',
        phase: 'B · Core',
        level: 'intermediate',
        title: 'cy.intercept — stub, spy, and wait',
        minutes: 65,
        durationLabel: 'Week 3–4',
        overview:
          'Network control separates junior from mid-level Cypress. Stub slow or flaky APIs, simulate errors, and assert request payloads — without leaving the browser.',
        learn: ['Route matching', 'Aliases @getItems', 'Stub vs spy', 'Fixture responses'],
        steps: [
          {
            title: 'Spy on GET',
            body: 'cy.intercept("GET", "/inventory.json").as("getInventory"); cy.wait("@getInventory") ensures data loaded before assert.',
            doThis: 'Add intercept + wait to inventory test. Assert 6 items render after @getInventory.',
          },
          {
            title: 'Stub a failure',
            body: 'Force 500 on POST checkout. Assert error toast or message — UI resilience test.',
            doThis: 'Stub checkout POST with statusCode: 500. Assert user-visible error.',
            code: 'cy.intercept("POST", "/checkout", { statusCode: 500, body: { error: "Server error" } }).as("checkoutFail");\n// ... trigger checkout ...\ncy.wait("@checkoutFail");\ncy.get("[data-test=error]").should("be.visible");',
          },
          {
            title: 'Fixture stub',
            body: 'Serve static JSON from fixtures/ for consistent test data regardless of backend state.',
            doThis: 'Stub GET /inventory with fixture inventory-small.json (2 items). Assert UI shows 2.',
          },
          {
            title: 'When to stub vs real API',
            body: 'Happy path: real API when stable. Edge cases and error UI: stub. Document policy in NETWORK.md.',
            doThis: 'Write NETWORK.md: 3 rules for when your suite stubs vs hits real backend.',
          },
        ],
        checklist: [
          'One spy + wait test',
          'One stubbed error test',
          'NETWORK.md policy written',
        ],
        practice: {
          title: 'Slow network simulation',
          brief: 'Use intercept delay to test loading spinner. Assert spinner visible then hidden.',
        },
        resources: [
          r('doc', 'cy.intercept', 'https://docs.cypress.io/api/commands/intercept', 'EN'),
          r('doc', 'Cypress — Network Requests', 'https://docs.cypress.io/guides/guides/network-requests', 'EN'),
        ],
      }),

      ch({
        id: 'cy-session',
        phase: 'B · Core',
        level: 'intermediate',
        title: 'cy.session — fast auth without re-login',
        minutes: 50,
        durationLabel: 'Week 4',
        overview:
          'Logging in every test wastes minutes in CI. cy.session caches authenticated state across specs while keeping tests isolated.',
        learn: ['Session cache', 'validate callback', 'Multi-user sessions'],
        steps: [
          {
            title: 'Basic session',
            body: 'cy.session([user, pass], () => { ... login steps ... }) runs login once, restores cookies/localStorage after.',
            doThis: 'Wrap login in cy.session. Run suite — second spec should skip UI login.',
            code: 'cy.session([username, password], () => {\n  cy.visit("/");\n  cy.get("[data-test=username]").type(username);\n  cy.get("[data-test=password]").type(password);\n  cy.get("[data-test=login-button]").click();\n});',
          },
          {
            title: 'validate option',
            body: 'validate checks session still valid — re-runs setup if cookies expired.',
            doThis: 'Add validate: () => cy.getCookie("session-token") or visit /inventory and check URL.',
          },
          {
            title: 'Session per role',
            body: 'Different sessions for admin vs user — cache key includes role identifier.',
            doThis: 'If app has roles, create cy.session for standard_user and problem_user separately.',
          },
        ],
        checklist: [
          'cy.session used for login',
          'Suite runtime noticeably faster',
          'Tests still isolated (no order dependency)',
        ],
        practice: {
          title: 'Session + intercept combo',
          brief: 'Session login + intercept inventory — full pattern for CI speed.',
        },
        resources: [
          r('doc', 'cy.session', 'https://docs.cypress.io/api/commands/session', 'EN'),
          r('doc', 'Cypress — Authentication Best Practices', 'https://docs.cypress.io/guides/end-to-end-testing/testing-your-app#Logging-in', 'EN'),
        ],
      }),

      ch({
        id: 'cy-checkpoint-a',
        kind: 'checkpoint',
        phase: 'B · Core',
        level: 'intermediate',
        title: 'Checkpoint A — Core Cypress suite',
        minutes: 35,
        durationLabel: 'Gate',
        overview:
          'Prove Phase A–B: stable selectors, custom commands, intercept, and session — flat structure OK, POM comes next.',
        learn: ['Core suite pass criteria'],
        steps: [
          {
            title: 'Pass criteria',
            body: 'All must pass before POM chapter.',
            doThis: 'Run npx cypress run and verify.',
            items: [
              '8+ specs covering login, inventory, cart, checkout start',
              'cy.login custom command + cy.session',
              'At least 2 cy.intercept tests (spy + stub)',
              'Zero cy.wait(milliseconds)',
              'All tests green headless locally',
              'README: how to open and run Cypress',
            ],
          },
        ],
        checklist: [
          'All 6 criteria met',
          'Green cypress run screenshot in docs/',
        ],
        practice: {
          title: 'Tag release',
          brief: 'Git tag v0.1-cypress-core on GitHub.',
        },
        resources: [
          r('doc', 'Cypress — Command Line', 'https://docs.cypress.io/guides/guides/command-line', 'EN'),
        ],
      }),

      ch({
        id: 'cy-pom',
        phase: 'C · Structure',
        level: 'intermediate',
        title: 'Page Object Model in Cypress',
        minutes: 60,
        durationLabel: 'Week 5–6',
        overview:
          'POM in Cypress uses plain classes or modules — not inheritance magic. Encapsulate selectors and intent methods; keep specs as user stories.',
        learn: ['Page classes', 'Composition over deep hierarchies', 'cypress/e2e/pages/ layout'],
        steps: [
          {
            title: 'LoginPage class',
            body: 'Methods: visit(), login(user, pass), assertError(msg). Selectors private to the class.',
            doThis: 'Create cypress/e2e/pages/LoginPage.js. Refactor login specs to use it.',
            code: 'class LoginPage {\n  visit() { cy.visit("/"); }\n  login(user, pass) {\n    cy.get("[data-test=username]").type(user);\n    cy.get("[data-test=password]").type(pass);\n    cy.get("[data-test=login-button]").click();\n  }\n  assertError(msg) { cy.get("[data-test=error]").should("contain", msg); }\n}\nexport default LoginPage;',
          },
          {
            title: 'InventoryPage + CartPage',
            body: 'addItem(name), getCartCount(), proceedToCheckout() — specs read like scenarios.',
            doThis: 'Build InventoryPage and CartPage. One spec: login → add 2 items → assert cart badge "2".',
          },
          {
            title: 'Avoid over-abstraction',
            body: 'POM methods should match user intent, not every click. Three meaningful methods beat twenty one-liners.',
            doThis: 'Review pages — merge methods that always run together.',
          },
          {
            title: 'ARCHITECTURE.md',
            body: 'Document folder layout, naming, when to add a page vs a command.',
            doThis: 'Write ARCHITECTURE.md with folder tree and conventions.',
          },
        ],
        checklist: [
          'LoginPage, InventoryPage, CartPage exist',
          'Specs use POM exclusively for Sauce Demo',
          'ARCHITECTURE.md committed',
        ],
        practice: {
          title: 'Checkout flow POM',
          brief: 'CheckoutPage: fillShipping(), fillPayment(), assertConfirmation(). End-to-end purchase spec.',
        },
        resources: [
          r('doc', 'Cypress — Real World App', 'https://github.com/cypress-io/cypress-realworld-app', 'EN'),
          r('doc', 'Filip Hric — Cypress blog', 'https://filiphric.com/', 'EN'),
        ],
      }),

      ch({
        id: 'cy-ci',
        phase: 'D · Delivery',
        level: 'intermediate',
        title: 'CI, parallelization, and artifacts',
        minutes: 65,
        durationLabel: 'Week 7–8',
        overview:
          'Cypress in GitHub Actions with video/screenshot upload, caching, and optional Cypress Cloud parallelism. Retries are signal — not normalized flake acceptance.',
        learn: ['cypress-io/github-action', 'Artifact upload', 'Retries config', 'Record key optional'],
        steps: [
          {
            title: 'GitHub Actions workflow',
            body: 'Use cypress-io/github-action for install, cache, run, and artifact upload in one step.',
            doThis: 'Add .github/workflows/cypress.yml. Green run on push to main.',
            code: 'name: Cypress\non: [push, pull_request]\njobs:\n  cypress-run:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: cypress-io/github-action@v6\n        with:\n          browser: chrome\n          config-file: cypress.config.js',
          },
          {
            title: 'Artifacts on failure',
            body: 'Videos and screenshots upload automatically with github-action when configured. Verify download works.',
            doThis: 'Break a test on a branch. Confirm CI uploads artifacts. Fix and merge.',
          },
          {
            title: 'Retries in config',
            body: 'retries: { runMode: 2 } in CI only — flakes get second chance; chronic flakes still get fixed.',
            doThis: 'Configure retries for runMode. Document flake budget in FLAKES.md.',
          },
          {
            title: 'Parallel shards (awareness)',
            body: 'Cypress Cloud or manual matrix splits specs across machines. Know the concept for interviews even if solo project skips it.',
            doThis: 'Read Cypress parallelization docs. Write 2 sentences in README on how you would shard 50 specs.',
          },
        ],
        checklist: [
          'CI green on main',
          'Artifacts verified on failure',
          'Retries configured',
          'README CI section complete',
        ],
        practice: {
          title: 'PR check',
          brief: 'Open PR that adds CI. Required check before merge (if repo settings allow).',
        },
        resources: [
          r('doc', 'Cypress — Continuous Integration', 'https://docs.cypress.io/guides/continuous-integration/introduction', 'EN'),
          r('doc', 'cypress-io/github-action', 'https://github.com/cypress-io/github-action', 'EN'),
        ],
      }),

      ch({
        id: 'cy-a11y',
        phase: 'D · Delivery',
        level: 'intermediate',
        title: 'Accessibility testing with cypress-axe',
        minutes: 50,
        durationLabel: 'Week 8–9',
        overview:
          'Critical flows should not ship a11y regressions. cypress-axe runs axe-core rules inside Cypress — fast smoke for WCAG violations on key pages.',
        learn: ['axe-core rules', 'cy.injectAxe / checkA11y', 'Excluding third-party nodes'],
        steps: [
          {
            title: 'Install cypress-axe',
            body: 'npm install cypress-axe axe-core. Import in support/e2e.js.',
            doThis: 'Add axe to support file. Run checkA11y on login page after load.',
            code: 'import "cypress-axe";\n// In spec:\ncy.visit("/");\ncy.injectAxe();\ncy.checkA11y();',
          },
          {
            title: 'Scope checks',
            body: 'Run a11y on critical pages only — login, checkout, settings. Not every spec (too slow).',
            doThis: 'Create a11y/login.cy.js and a11y/checkout.cy.js — dedicated a11y specs.',
          },
          {
            title: 'Handle known violations',
            body: 'Exclude nodes or rules with documented ticket links — never silent ignore.',
            doThis: 'If violation exists, add // TODO JIRA-123 comment and exclusion with reason.',
          },
          {
            title: 'A11y in CI',
            body: 'Run a11y specs in same or separate job. Fail build on serious/critical violations.',
            doThis: 'Add a11y folder to CI workflow. Confirm failure on injected violation (then fix).',
          },
        ],
        checklist: [
          'cypress-axe on login + one other page',
          'A11Y.md documents scope and exclusions',
          'A11y specs in CI',
        ],
        practice: {
          title: 'Violation fix drill',
          brief: 'Introduce missing label on toy page. Axe catches it. Fix. Green again.',
        },
        resources: [
          r('doc', 'cypress-axe', 'https://github.com/component-driven/cypress-axe', 'EN'),
          r('doc', 'Deque axe-core rules', 'https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md', 'EN'),
          r('doc', 'WCAG 2.1 Quick Reference', 'https://www.w3.org/WAI/WCAG21/quickref/', 'EN'),
        ],
      }),

      ch({
        id: 'cy-standards',
        phase: 'E · Team Craft',
        level: 'advanced',
        title: 'Team standards & flake governance',
        minutes: 60,
        durationLabel: 'Week 9–10',
        overview:
          'Senior Cypress work is standards: folder layout, naming, PR checklist, selector policy, and flake ownership — so the suite survives beyond one author.',
        learn: ['Coding standard doc', 'PR template', 'Flake registry', 'Plugin tasks for seed data'],
        steps: [
          {
            title: 'Cypress standard one-pager',
            body: 'Folder layout, spec naming (*.cy.js), selector rules, no cy.wait(ms), intercept policy, session usage.',
            doThis: 'Write CYPRESS-STANDARD.md. Apply to entire suite in one refactor PR.',
          },
          {
            title: 'PR template',
            body: 'Checklist: new tests isolated, selectors stable, no sleeps, CI green, a11y if new page.',
            doThis: 'Add .github/pull_request_template.md with Cypress checklist.',
          },
          {
            title: 'Flake registry',
            body: 'FLAKES.md: date, spec name, root cause, fix, owner. Review monthly.',
            doThis: 'Add at least one real or simulated flake entry with fix documentation.',
          },
          {
            title: 'cy.task for DB seed (awareness)',
            body: 'Node tasks in setupNodeEvents can seed DB via API. Know the pattern for full-stack apps.',
            doThis: 'Read Cypress task docs. Sketch how you would seed a user via API in setupNodeEvents.',
          },
        ],
        checklist: [
          'CYPRESS-STANDARD.md committed',
          'PR template with test checklist',
          'FLAKES.md started',
        ],
        practice: {
          title: 'Standards PR',
          brief: 'Open PR that only applies standard (renames, selector fixes, doc). Review your own diff like a tech lead.',
        },
        resources: [
          r('doc', 'Cypress — Best Practices', 'https://docs.cypress.io/guides/references/best-practices', 'EN'),
          r('lab', 'Cypress Real World App', 'https://github.com/cypress-io/cypress-realworld-app', 'EN'),
        ],
      }),

      ch({
        id: 'cy-checkpoint-b',
        kind: 'checkpoint',
        phase: 'E · Team Craft',
        level: 'advanced',
        title: 'Checkpoint B — Job-ready Cypress portfolio',
        minutes: 40,
        durationLabel: 'Gate',
        overview:
          'Final gate. Public repo with POM, intercept, session, CI artifacts, a11y, and team standards — demo-ready for interviews.',
        learn: ['Portfolio pass criteria'],
        steps: [
          {
            title: 'Pass criteria',
            body: 'Verify live on GitHub before marking path complete.',
            doThis: 'Demo to camera or friend in under 5 minutes.',
            items: [
              'POM suite: 15+ tests across login, inventory, cart, checkout',
              'cy.session + 3+ intercept patterns',
              'GitHub Actions green with video/screenshot on failure',
              'cypress-axe on 2+ critical pages',
              'CYPRESS-STANDARD.md + ARCHITECTURE.md + FLAKES.md',
              'Can explain intercept vs stub vs spy in interview',
            ],
          },
          {
            title: 'Interview prep',
            body: 'Common questions: Cypress vs Selenium, same-origin limit, when not to use Cypress, flake debug with command log.',
            doThis: 'Add INTERVIEW.md with 10 Q&A from your repo experience.',
          },
        ],
        checklist: [
          'All 6 pass criteria met',
          'INTERVIEW.md committed',
          'Repo linked on resume',
        ],
        practice: {
          title: 'Live demo rehearsal',
          brief: 'Screen record: clone repo → npm ci → cypress run → show CI → walk ARCHITECTURE.md. Under 5 min.',
        },
        resources: [
          r('doc', 'Cypress — FAQ', 'https://docs.cypress.io/faq', 'EN'),
          r('book', 'UI Testing with Cypress — Filip Hric', 'https://filiphric.com/cypress-book', 'EN'),
        ],
      }),
    ],
  },
]
