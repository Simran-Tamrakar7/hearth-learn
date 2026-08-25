import { ch, r } from '../helpers.js'

export const automationManuals = [
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
