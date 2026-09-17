import type { ChapterRecord } from "../../../types";

/** 2.1 Test Structure Syntax */
export const chapter = {
  "id": "cy-2-1-test-structure-syntax",
  "title": "2.1 Test Structure Syntax",
  "minutes": 30,
  "level": "beginner",
  "phase": "Part 2 · Core Syntax & Commands",
  "partName": "Part 2 · Core Syntax & Commands",
  "overviewText": "Cypress specs are Mocha: describe/context group tests, it/specify name cases, and before/beforeEach/after/afterEach run hooks. Because testIsolation defaults to true since Cypress 12, shared login belongs in beforeEach (later: cy.session), not a one-shot before. Use a function () callback—not an arrow—when you need Mocha's this.skip() or this.aliasName. This chapter is the grammar of every HRM spec you will write.",
  "why": "Arrow functions silently break this.skip and alias access via this. Isolation makes before-only login a false pattern that flakes or fails after Cypress 12. Interviewers watch whether your skeleton would survive a second it() in the same file.",
  "when": "Starting every spec, when a second test 'cannot see' the dashboard, when you want to skip on a condition, and when migrating suites that logged in once in before().",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You need two tests: employee submits leave, manager sees it pending. Both require a logged-in session, and one should skip if Cypress.env('featureLeave') is false.",
    "pass": "You use describe/it, beforeEach to visit/login (isolation), and a function () { if (!flag) this.skip(); } — not an arrow, not a single before() that the second test depends on.",
    "fail": "You login in before() only, write async () => { await cy.visit }, or this.skip() inside an arrow function and wonder why this is empty."
  },
  "tools": [],
  "customSummary": "- Mocha: describe/context, it/specify, before, beforeEach, after, afterEach — Cypress does not use Jest's test() as the primary API.\n- testIsolation true (Cypress 12+): cookies/storage cleared between tests → beforeEach (or cy.session) is required for login, not optional style.\n- Use function () {} when you need this.skip(), this.timeout(), or this.alias from .as().\n- Arrows are fine when you do not use Mocha this — most HRM tests can stay arrows until they need skip/alias-on-this.\n- only/skip: it.only, it.skip, describe.skip — never leave only on main.\n- Hooks run in a defined order; avoid cy.visit in afterEach unless you are cleaning a side effect you own.",
  "contentMarkdown": "## Mocha is the test runner inside Cypress\n\nCypress did not invent `describe` / `it`. It embeds **Mocha**. If you have used Jest, the names look familiar; the `this` binding and hook semantics follow **Mocha**, not Jest.\n\n```ts\ndescribe('Leave requests', () => {\n  context('as an employee', () => {\n    specify('shows the empty state', () => {\n      cy.visit('/leave');\n      cy.contains('No leave requests').should('be.visible');\n    });\n  });\n});\n```\n\n| Mocha name | Alias | Role |\n|---|---|---|\n| `describe` | `context` | Suite / grouping. Can nest. |\n| `it` | `specify` | One test. Cypress reports each `it` separately. |\n| `before` | | Once per `describe`, before its tests |\n| `beforeEach` | | Before **every** `it` in that describe (and nested) |\n| `afterEach` | | After every `it` |\n| `after` | | Once after the suite |\n\nCypress also exposes `Cypress.currentTest` and the Command Log, but **structure** is Mocha.\n\nJest users: prefer `it`, not `test`. `test` may exist depending on version; this manual standardizes on `describe`/`it`. Playwright users: Playwright's `test.describe` / `test` is a different runner — do not mix APIs in a `.cy.ts` file.\n\n## The skeleton of an HRM spec\n\n```ts\ndescribe('Leave request submission', () => {\n  beforeEach(() => {\n    cy.login(Cypress.env('employeeEmail'));\n    cy.visit('/leave/new');\n  });\n\n  it('validates required dates', () => {\n    cy.contains('button', 'Submit').click();\n    cy.contains('Start date is required').should('be.visible');\n  });\n\n  it('submits a one-day request', () => {\n    cy.get('[data-cy=start-date]').type('2026-09-21');\n    cy.get('[data-cy=end-date]').type('2026-09-21');\n    cy.contains('button', 'Submit').click();\n    cy.contains('Pending').should('be.visible');\n  });\n});\n```\n\nTwo `it`s. One `beforeEach`. That is the default shape after Cypress 12.\n\n## Why `beforeEach` is required: `testIsolation`\n\nSince **Cypress 12**, `testIsolation` defaults to **`true`**. Between tests Cypress:\n\n- Clears cookies, `localStorage`, `sessionStorage` for the AUT\n- Navigates the AUT to `about:blank`\n\nSo this Cypress 9 habit is **wrong** on current Cypress:\n\n```ts\nbefore(() => {\n  cy.login('ada@bizlevate.test'); // once\n});\n\nit('submits leave', () => { cy.visit('/leave/new'); /* ... */ });\nit('sees pending row', () => { cy.visit('/leave'); /* no session */ });\n```\n\nThe second `it` starts logged **out**. Failures look like \"redirected to /login\" and are not flake — they are isolation working.\n\n| Hook | When it is the right tool |\n|---|---|\n| `beforeEach` | Login, `cy.session`, visit the page under test, intercepts for that test |\n| `before` | Expensive **Node** seed via `cy.task` that is safe to reuse *if the tests do not mutate that data* — still re-check isolation |\n| `afterEach` | Rare; Cypress already snapshots failures. Do not `cy.visit` here \"to reset\" |\n| `after` | Stop a mock server you started in `before` |\n\nLater: `cy.session` inside `beforeEach` so login is cached **across tests** without sharing dirty UI state. Until then, **login in `beforeEach`**.\n\nPlaywright analog: `test.describe.configure({ mode: 'serial' })` vs isolated tests; Playwright's storageState is the session analog. Selenium: `@Before` vs `@BeforeClass` — same isolation lesson.\n\n## `function` vs arrow — `this.skip` and `this.alias`\n\nMocha sets `this` on **function** callbacks. Arrow functions **do not bind Mocha's `this`**.\n\n```ts\nit('skips when the flag is off', function () {\n  if (!Cypress.env('featureLeave')) {\n    this.skip();\n  }\n  cy.visit('/leave/new');\n});\n```\n\n```ts\nit('broken skip', () => {\n  this.skip(); // this is not Mocha's context — TypeError or no-op\n});\n```\n\nThe same rule applies to hooks:\n\n```ts\nbeforeEach(function () {\n  if (!Cypress.env('adminPassword')) {\n    this.skip(); // skip remaining tests in this suite when env missing\n  }\n});\n```\n\nAliases registered with `.as('user')` are also available as `this.user` **only** in `function ()` callbacks, and only **after** the alias command has executed (typically in a subsequent `it`/`beforeEach` `function`, or inside `.then` — Part 2.5).\n\n```ts\nbeforeEach(function () {\n  cy.fixture('employees').as('employees');\n});\n\nit('uses the alias via this', function () {\n  cy.visit('/login');\n  cy.get('#email').type(this.employees[0].email);\n});\n```\n\nIf you used arrows for that `it`, `this.employees` is undefined. `cy.get('@employees')` works with arrows (queue-based) and is often clearer — chapter 2.5.\n\n**Rule:** default to arrows for consistency with the rest of the HRM TS codebase; switch that one callback to `function ()` when you need `this.skip()`, `this.timeout(10000)`, or `this.someAlias`.\n\n`this.timeout(ms)` changes Mocha's test timeout (not Cypress `defaultCommandTimeout`). Cypress tests can hang until Mocha's timeout if the queue never finishes.\n\n## `.only` and `.skip`\n\n```ts\ndescribe.skip('WIP payroll', () => { /* ... */ });\nit.skip('flaky until data-cy exists', () => { /* ... */ });\nit.only('debug this one', () => { /* ... */ });\n```\n\n`it.only` is a scalpel for local debugging. **Never commit it** — CI will run a subset and lie that main is green.\n\nPlaywright: `test.only` / `test.skip`. Selenium/JUnit: `@Ignore`. Same social rule: do not land exclusive filters.\n\n## Nesting and hook order\n\n```ts\ndescribe('A', () => {\n  beforeEach(() => cy.log('A'));\n  describe('B', () => {\n    beforeEach(() => cy.log('B'));\n    it('t', () => cy.log('t'));\n  });\n});\n```\n\nOrder: `A` beforeEach → `B` beforeEach → `t`. Outer hooks wrap inner. Put `cy.login` on the outermost describe that needs auth; do not repeat it in every nested `context` unless roles differ.\n\n```ts\ndescribe('HRM', () => {\n  describe('employee', () => {\n    beforeEach(() => cy.login(Cypress.env('employeeEmail')));\n    it('submits leave', () => { /* ... */ });\n  });\n  describe('manager', () => {\n    beforeEach(() => cy.login(Cypress.env('managerEmail')));\n    it('approves leave', () => { /* ... */ });\n  });\n});\n```\n\n## What not to put in the structure\n\n1. **`async` `it` + `await cy`** — Part 1.4 / 2.3. The callback should be synchronous enqueue.\n2. **Logic that depends on test order** — `it` A creates a leave, `it` B approves \"the\" leave. Isolation + parallel spec files will break this. Seed in `beforeEach` or `cy.task`.\n3. **Giant `describe` with 40 `it`s sharing one visit** — isolation resets the page anyway; split files by journey.\n4. **`afterEach(() => cy.screenshot())`** — Cypress already screenshots on failure in run mode.\n\n## Exclusive syntax Cypress adds on top of Mocha\n\n- `cy.pause()` — freeze the GUI (open mode).\n- `cy.debug()` — like pause with debugger.\n- `{ tags: ... }` — only if you install a grep plugin; not core Mocha.\n\nDo not expect Jest's `expect.assertions(2)`. Cypress assertions live on the command queue (`should`) or in `.then` (`expect`).\n\n## Copy-paste starter (HRM)\n\n```ts\ndescribe('Module name', () => {\n  beforeEach(() => {\n    cy.login(Cypress.env('employeeEmail'));\n  });\n\n  it('does the primary journey', () => {\n    cy.visit('/path');\n    cy.get('[data-cy=primary]').should('be.visible');\n  });\n});\n```\n\nAdd `function ()` only when `this` is required. Next: the four commands you will type most — `visit`, `get`, `contains`, `find`.\n## Hook order lab\n\n```ts\ndescribe('outer', () => {\n  before(() => cy.log('O before'));\n  beforeEach(() => cy.log('O beforeEach'));\n  afterEach(() => cy.log('O afterEach'));\n  after(() => cy.log('O after'));\n\n  describe('inner', () => {\n    beforeEach(() => cy.log('I beforeEach'));\n    it('t1', () => cy.log('t1'));\n    it('t2', () => cy.log('t2'));\n  });\n});\n```\n\nExpect: O before once; for t1: O beforeEach, I beforeEach, t1, I none, O afterEach; same for t2; O after once. Login belongs on the describe that matches the **role**, as `beforeEach`.\n\n## `this.timeout` vs Cypress timeouts\n\n```ts\nit('slow seed', function () {\n  this.timeout(120000);\n  cy.task('rebuildSearchIndex', { timeout: 110000 });\n});\n```\n\nMocha's timeout kills the **whole test** if the queue never finishes. Cypress command timeouts fail a **command**. You usually raise the command timeout, not Mocha's. Know both exist.\n\n## Conditional skip for missing env\n\n```ts\nbeforeEach(function () {\n  if (!Cypress.env('managerEmail')) {\n    this.skip();\n  }\n});\n```\n\nBetter: fail CI if secrets are missing (`if (!pwd) throw new Error('CYPRESS_managerEmail required')`) so skip does not hide a misconfigured pipeline.\n\n## `it.only` hygiene\n\n```bash\ngit grep -n 'it.only' cypress\n```\n\nAdd this to a pre-commit hook later. Playwright has the same trap with `test.only`.\n\n## Isolation vs `before` seed\n\nA `cy.task('seedLeaveBoard')` in `before` can run once **per spec file** if tests only read that data. If test 1 **approves** a leave, test 2 cannot assume it is still pending — isolation does not roll back your **database**. Reset in `beforeEach` or give each test unique IDs.\n\n## Interview drill\n\nWhy is `beforeEach` required after Cypress 12? When must the callback be `function ()`? What does `testIsolation` clear? Why is login-in-`before` wrong?\n## `context` as role grouping\n\n```ts\ndescribe('Leave approval', () => {\n  context('employee', () => {\n    beforeEach(() => cy.login(Cypress.env('employeeEmail')));\n    it('cannot see Approve', () => {\n      cy.visit('/leave/lv_1');\n      cy.contains('button', 'Approve').should('not.exist');\n    });\n  });\n  context('manager', () => {\n    beforeEach(() => cy.login(Cypress.env('managerEmail')));\n    it('can approve', () => {\n      cy.visit('/leave/lv_1');\n      cy.contains('button', 'Approve').click();\n      cy.contains('Approved').should('be.visible');\n    });\n  });\n});\n```\n\n`context` is `describe`. Using it for **roles** matches how HRM is talked about.\n\n## Pending tests\n\n```ts\nit('exports payroll CSV'); // no callback — Mocha pending\n```\n\nUseful as a backlog in the spec. CI reporters show pending, not pass. Prefer a ticket over a year-old pending `it`.\n\n## `only` on describe\n\n`describe.only` runs nested tests and skips siblings. Same git-grep rule. Playwright `test.describe.only` is the twin.\n\n## Hooks must enqueue, not await\n\n```ts\nbeforeEach(async () => {\n  await cy.login('x'); // still forbidden\n});\n```\n\nHooks are the same queue. `beforeEach(() => { cy.login(...); })` is correct.\n## `afterEach` screenshots are redundant\n\nCypress already screenshots on failure in `run` (when `screenshotOnRunFailure` is true). `afterEach(() => { cy.screenshot() })` floods `cypress/screenshots` on **passes** too. Don't.\n\n## Nested `only`\n\nIf an inner `it.only` is inside `describe.skip`, you still skip. Unskip the parent when debugging. Mocha's rules are easy to forget at 5pm.\n## `this.retries` (Mocha) vs config retries\n\nMocha `this.retries(2)` inside a `function` test is a different retry from `retries.runMode` in `cypress.config`. Prefer config-level runMode for CI consistency. Do not mix both unless you can explain which wins on your Cypress major.\n",
  "blocks": [
    {
      "id": "cy-2-1-md-0",
      "type": "overview",
      "heading": "Mocha is the test runner inside Cypress",
      "content": "Cypress did not invent `describe` / `it`. It embeds **Mocha**. If you have used Jest, the names look familiar; the `this` binding and hook semantics follow **Mocha**, not Jest.\n\n```ts\ndescribe('Leave requests', () => {\n  context('as an employee', () => {\n    specify('shows the empty state', () => {\n      cy.visit('/leave');\n      cy.contains('No leave requests').should('be.visible');\n    });\n  });\n});\n```\n\n| Mocha name | Alias | Role |\n|---|---|---|\n| `describe` | `context` | Suite / grouping. Can nest. |\n| `it` | `specify` | One test. Cypress reports each `it` separately. |\n| `before` | | Once per `describe`, before its tests |\n| `beforeEach` | | Before **every** `it` in that describe (and nested) |\n| `afterEach` | | After every `it` |\n| `after` | | Once after the suite |\n\nCypress also exposes `Cypress.currentTest` and the Command Log, but **structure** is Mocha.\n\nJest users: prefer `it`, not `test`. `test` may exist depending on version; this manual standardizes on `describe`/`it`. Playwright users: Playwright's `test.describe` / `test` is a different runner — do not mix APIs in a `.cy.ts` file.",
      "order": 0
    },
    {
      "id": "cy-2-1-md-1",
      "type": "overview",
      "heading": "The skeleton of an HRM spec",
      "content": "```ts\ndescribe('Leave request submission', () => {\n  beforeEach(() => {\n    cy.login(Cypress.env('employeeEmail'));\n    cy.visit('/leave/new');\n  });\n\n  it('validates required dates', () => {\n    cy.contains('button', 'Submit').click();\n    cy.contains('Start date is required').should('be.visible');\n  });\n\n  it('submits a one-day request', () => {\n    cy.get('[data-cy=start-date]').type('2026-09-21');\n    cy.get('[data-cy=end-date]').type('2026-09-21');\n    cy.contains('button', 'Submit').click();\n    cy.contains('Pending').should('be.visible');\n  });\n});\n```\n\nTwo `it`s. One `beforeEach`. That is the default shape after Cypress 12.",
      "order": 1
    },
    {
      "id": "cy-2-1-md-2",
      "type": "overview",
      "heading": "Why `beforeEach` is required: `testIsolation`",
      "content": "Since **Cypress 12**, `testIsolation` defaults to **`true`**. Between tests Cypress:\n\n- Clears cookies, `localStorage`, `sessionStorage` for the AUT\n- Navigates the AUT to `about:blank`\n\nSo this Cypress 9 habit is **wrong** on current Cypress:\n\n```ts\nbefore(() => {\n  cy.login('ada@bizlevate.test'); // once\n});\n\nit('submits leave', () => { cy.visit('/leave/new'); /* ... */ });\nit('sees pending row', () => { cy.visit('/leave'); /* no session */ });\n```\n\nThe second `it` starts logged **out**. Failures look like \"redirected to /login\" and are not flake — they are isolation working.\n\n| Hook | When it is the right tool |\n|---|---|\n| `beforeEach` | Login, `cy.session`, visit the page under test, intercepts for that test |\n| `before` | Expensive **Node** seed via `cy.task` that is safe to reuse *if the tests do not mutate that data* — still re-check isolation |\n| `afterEach` | Rare; Cypress already snapshots failures. Do not `cy.visit` here \"to reset\" |\n| `after` | Stop a mock server you started in `before` |\n\nLater: `cy.session` inside `beforeEach` so login is cached **across tests** without sharing dirty UI state. Until then, **login in `beforeEach`**.\n\nPlaywright analog: `test.describe.configure({ mode: 'serial' })` vs isolated tests; Playwright's storageState is the session analog. Selenium: `@Before` vs `@BeforeClass` — same isolation lesson.",
      "order": 2
    },
    {
      "id": "cy-2-1-md-3",
      "type": "overview",
      "heading": "`function` vs arrow — `this.skip` and `this.alias`",
      "content": "Mocha sets `this` on **function** callbacks. Arrow functions **do not bind Mocha's `this`**.\n\n```ts\nit('skips when the flag is off', function () {\n  if (!Cypress.env('featureLeave')) {\n    this.skip();\n  }\n  cy.visit('/leave/new');\n});\n```\n\n```ts\nit('broken skip', () => {\n  this.skip(); // this is not Mocha's context — TypeError or no-op\n});\n```\n\nThe same rule applies to hooks:\n\n```ts\nbeforeEach(function () {\n  if (!Cypress.env('adminPassword')) {\n    this.skip(); // skip remaining tests in this suite when env missing\n  }\n});\n```\n\nAliases registered with `.as('user')` are also available as `this.user` **only** in `function ()` callbacks, and only **after** the alias command has executed (typically in a subsequent `it`/`beforeEach` `function`, or inside `.then` — Part 2.5).\n\n```ts\nbeforeEach(function () {\n  cy.fixture('employees').as('employees');\n});\n\nit('uses the alias via this', function () {\n  cy.visit('/login');\n  cy.get('#email').type(this.employees[0].email);\n});\n```\n\nIf you used arrows for that `it`, `this.employees` is undefined. `cy.get('@employees')` works with arrows (queue-based) and is often clearer — chapter 2.5.\n\n**Rule:** default to arrows for consistency with the rest of the HRM TS codebase; switch that one callback to `function ()` when you need `this.skip()`, `this.timeout(10000)`, or `this.someAlias`.\n\n`this.timeout(ms)` changes Mocha's test timeout (not Cypress `defaultCommandTimeout`). Cypress tests can hang until Mocha's timeout if the queue never finishes.",
      "order": 3
    },
    {
      "id": "cy-2-1-md-4",
      "type": "overview",
      "heading": "`.only` and `.skip`",
      "content": "```ts\ndescribe.skip('WIP payroll', () => { /* ... */ });\nit.skip('flaky until data-cy exists', () => { /* ... */ });\nit.only('debug this one', () => { /* ... */ });\n```\n\n`it.only` is a scalpel for local debugging. **Never commit it** — CI will run a subset and lie that main is green.\n\nPlaywright: `test.only` / `test.skip`. Selenium/JUnit: `@Ignore`. Same social rule: do not land exclusive filters.",
      "order": 4
    },
    {
      "id": "cy-2-1-md-5",
      "type": "overview",
      "heading": "Nesting and hook order",
      "content": "```ts\ndescribe('A', () => {\n  beforeEach(() => cy.log('A'));\n  describe('B', () => {\n    beforeEach(() => cy.log('B'));\n    it('t', () => cy.log('t'));\n  });\n});\n```\n\nOrder: `A` beforeEach → `B` beforeEach → `t`. Outer hooks wrap inner. Put `cy.login` on the outermost describe that needs auth; do not repeat it in every nested `context` unless roles differ.\n\n```ts\ndescribe('HRM', () => {\n  describe('employee', () => {\n    beforeEach(() => cy.login(Cypress.env('employeeEmail')));\n    it('submits leave', () => { /* ... */ });\n  });\n  describe('manager', () => {\n    beforeEach(() => cy.login(Cypress.env('managerEmail')));\n    it('approves leave', () => { /* ... */ });\n  });\n});\n```",
      "order": 5
    },
    {
      "id": "cy-2-1-md-6",
      "type": "overview",
      "heading": "What not to put in the structure",
      "content": "1. **`async` `it` + `await cy`** — Part 1.4 / 2.3. The callback should be synchronous enqueue.\n2. **Logic that depends on test order** — `it` A creates a leave, `it` B approves \"the\" leave. Isolation + parallel spec files will break this. Seed in `beforeEach` or `cy.task`.\n3. **Giant `describe` with 40 `it`s sharing one visit** — isolation resets the page anyway; split files by journey.\n4. **`afterEach(() => cy.screenshot())`** — Cypress already screenshots on failure in run mode.",
      "order": 6
    },
    {
      "id": "cy-2-1-md-7",
      "type": "overview",
      "heading": "Exclusive syntax Cypress adds on top of Mocha",
      "content": "- `cy.pause()` — freeze the GUI (open mode).\n- `cy.debug()` — like pause with debugger.\n- `{ tags: ... }` — only if you install a grep plugin; not core Mocha.\n\nDo not expect Jest's `expect.assertions(2)`. Cypress assertions live on the command queue (`should`) or in `.then` (`expect`).",
      "order": 7
    },
    {
      "id": "cy-2-1-md-8",
      "type": "overview",
      "heading": "Copy-paste starter (HRM)",
      "content": "```ts\ndescribe('Module name', () => {\n  beforeEach(() => {\n    cy.login(Cypress.env('employeeEmail'));\n  });\n\n  it('does the primary journey', () => {\n    cy.visit('/path');\n    cy.get('[data-cy=primary]').should('be.visible');\n  });\n});\n```\n\nAdd `function ()` only when `this` is required. Next: the four commands you will type most — `visit`, `get`, `contains`, `find`.",
      "order": 8
    },
    {
      "id": "cy-2-1-md-9",
      "type": "overview",
      "heading": "Hook order lab",
      "content": "```ts\ndescribe('outer', () => {\n  before(() => cy.log('O before'));\n  beforeEach(() => cy.log('O beforeEach'));\n  afterEach(() => cy.log('O afterEach'));\n  after(() => cy.log('O after'));\n\n  describe('inner', () => {\n    beforeEach(() => cy.log('I beforeEach'));\n    it('t1', () => cy.log('t1'));\n    it('t2', () => cy.log('t2'));\n  });\n});\n```\n\nExpect: O before once; for t1: O beforeEach, I beforeEach, t1, I none, O afterEach; same for t2; O after once. Login belongs on the describe that matches the **role**, as `beforeEach`.",
      "order": 9
    },
    {
      "id": "cy-2-1-md-10",
      "type": "overview",
      "heading": "`this.timeout` vs Cypress timeouts",
      "content": "```ts\nit('slow seed', function () {\n  this.timeout(120000);\n  cy.task('rebuildSearchIndex', { timeout: 110000 });\n});\n```\n\nMocha's timeout kills the **whole test** if the queue never finishes. Cypress command timeouts fail a **command**. You usually raise the command timeout, not Mocha's. Know both exist.",
      "order": 10
    },
    {
      "id": "cy-2-1-md-11",
      "type": "overview",
      "heading": "Conditional skip for missing env",
      "content": "```ts\nbeforeEach(function () {\n  if (!Cypress.env('managerEmail')) {\n    this.skip();\n  }\n});\n```\n\nBetter: fail CI if secrets are missing (`if (!pwd) throw new Error('CYPRESS_managerEmail required')`) so skip does not hide a misconfigured pipeline.",
      "order": 11
    },
    {
      "id": "cy-2-1-md-12",
      "type": "overview",
      "heading": "`it.only` hygiene",
      "content": "```bash\ngit grep -n 'it.only' cypress\n```\n\nAdd this to a pre-commit hook later. Playwright has the same trap with `test.only`.",
      "order": 12
    },
    {
      "id": "cy-2-1-md-13",
      "type": "overview",
      "heading": "Isolation vs `before` seed",
      "content": "A `cy.task('seedLeaveBoard')` in `before` can run once **per spec file** if tests only read that data. If test 1 **approves** a leave, test 2 cannot assume it is still pending — isolation does not roll back your **database**. Reset in `beforeEach` or give each test unique IDs.",
      "order": 13
    },
    {
      "id": "cy-2-1-md-14",
      "type": "overview",
      "heading": "Interview drill",
      "content": "Why is `beforeEach` required after Cypress 12? When must the callback be `function ()`? What does `testIsolation` clear? Why is login-in-`before` wrong?",
      "order": 14
    },
    {
      "id": "cy-2-1-md-15",
      "type": "overview",
      "heading": "`context` as role grouping",
      "content": "```ts\ndescribe('Leave approval', () => {\n  context('employee', () => {\n    beforeEach(() => cy.login(Cypress.env('employeeEmail')));\n    it('cannot see Approve', () => {\n      cy.visit('/leave/lv_1');\n      cy.contains('button', 'Approve').should('not.exist');\n    });\n  });\n  context('manager', () => {\n    beforeEach(() => cy.login(Cypress.env('managerEmail')));\n    it('can approve', () => {\n      cy.visit('/leave/lv_1');\n      cy.contains('button', 'Approve').click();\n      cy.contains('Approved').should('be.visible');\n    });\n  });\n});\n```\n\n`context` is `describe`. Using it for **roles** matches how HRM is talked about.",
      "order": 15
    },
    {
      "id": "cy-2-1-md-16",
      "type": "overview",
      "heading": "Pending tests",
      "content": "```ts\nit('exports payroll CSV'); // no callback — Mocha pending\n```\n\nUseful as a backlog in the spec. CI reporters show pending, not pass. Prefer a ticket over a year-old pending `it`.",
      "order": 16
    },
    {
      "id": "cy-2-1-md-17",
      "type": "overview",
      "heading": "`only` on describe",
      "content": "`describe.only` runs nested tests and skips siblings. Same git-grep rule. Playwright `test.describe.only` is the twin.",
      "order": 17
    },
    {
      "id": "cy-2-1-md-18",
      "type": "overview",
      "heading": "Hooks must enqueue, not await",
      "content": "```ts\nbeforeEach(async () => {\n  await cy.login('x'); // still forbidden\n});\n```\n\nHooks are the same queue. `beforeEach(() => { cy.login(...); })` is correct.",
      "order": 18
    },
    {
      "id": "cy-2-1-md-19",
      "type": "overview",
      "heading": "`afterEach` screenshots are redundant",
      "content": "Cypress already screenshots on failure in `run` (when `screenshotOnRunFailure` is true). `afterEach(() => { cy.screenshot() })` floods `cypress/screenshots` on **passes** too. Don't.",
      "order": 19
    },
    {
      "id": "cy-2-1-md-20",
      "type": "overview",
      "heading": "Nested `only`",
      "content": "If an inner `it.only` is inside `describe.skip`, you still skip. Unskip the parent when debugging. Mocha's rules are easy to forget at 5pm.",
      "order": 20
    },
    {
      "id": "cy-2-1-md-21",
      "type": "overview",
      "heading": "`this.retries` (Mocha) vs config retries",
      "content": "Mocha `this.retries(2)` inside a `function` test is a different retry from `retries.runMode` in `cypress.config`. Prefer config-level runMode for CI consistency. Do not mix both unless you can explain which wins on your Cypress major.",
      "order": 21
    }
  ],
  "advantages": [
    "2.1 Test Structure Syntax — Arrow functions silently break this."
  ],
  "limitations": [
    "2.1 Test Structure Syntax is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
