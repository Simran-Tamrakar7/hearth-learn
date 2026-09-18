import type { ChapterRecord } from "../../../types";

/** 2.5 Aliases */
export const chapter = {
  "id": "cy-2-5-aliases",
  "title": "2.5 Aliases",
  "minutes": 28,
  "level": "beginner",
  "phase": "Part 2 · Core Syntax & Commands",
  "partName": "Part 2 · Core Syntax & Commands",
  "overviewText": "Aliases are Cypress's answer to const. There are three kinds: DOM (cy.get(...).as('rows')), intercept/route (cy.intercept(...).as('getLeave')), and data (cy.wrap/fixture().as('user')). You retrieve with cy.get('@name') or, in function () callbacks after the alias command has run, this.name. Aliases are not JavaScript variables; they are named slots on the queue.",
  "why": "Saving cy.get in a const does not work (queue). Aliases are the supported pattern for reuse, for cy.wait('@alias'), and for fixtures. Mixing up the three kinds — waiting on a DOM alias, or this.user in an arrow function — is a frequent live-coding miss.",
  "when": "When you need the same element twice, when stubbing/waiting on XHR, when loading fixtures, and when sharing data between beforeEach and it via this.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "Stub GET /api/leave as getLeave, fixture employees as employees, and reuse the leave table rows to assert length then click the last row.",
    "pass": "You use three aliases: intercept.as('getLeave') + cy.wait('@getLeave'); cy.fixture('employees.json').as('employees') + function () { this.employees }; cy.get('tr').as('rows') + cy.get('@rows').should('have.length', 3).",
    "fail": "You const rows = cy.get('tr'), or cy.wait('@rows') on a DOM alias, or this.employees inside an arrow it()."
  },
  "tools": [],
  "customSummary": "- Three alias kinds: (1) DOM subjects, (2) intercept/route aliases for cy.wait('@name'), (3) data (fixtures, wrap, request bodies).\n- Create with .as('camelCase'). Read DOM/data with cy.get('@camelCase'); wait on intercepts with cy.wait('@camelCase').\n- this.alias works only in function () callbacks after the alias command has executed (typically next hook/test).\n- DOM aliases re-query when used with cy.get('@name') in modern Cypress (avoid stale elements).\n- Do not cy.wait on a DOM alias. Do not treat .as as assigning a JS const.\n- Playwright: no exact alias; use variables + await, waitForResponse, fixtures file API.",
  "contentMarkdown": "## Why aliases exist\n\nThis does not work:\n\n```ts\nconst $rows = cy.get('tbody tr');\n$rows.should('have.length', 3); // $rows is a Chainable queued, not rows\n```\n\nThis does:\n\n```ts\ncy.get('tbody tr').as('rows');\ncy.get('@rows').should('have.length', 3);\ncy.get('@rows').last().click();\n```\n\n`.as('rows')` stores the **name** on the test context. `cy.get('@rows')` is a command that retrieves it (for DOM aliases, Cypress **re-queries** the elements so they stay fresh — that is the point versus a stale jQuery snapshot).\n\n## The three kinds\n\n### 1. DOM aliases\n\n```ts\ncy.get('[data-cy=leave-table] tbody tr').as('leaveRows');\ncy.get('@leaveRows').should('have.length.at.least', 1);\ncy.get('@leaveRows').eq(0).find('[data-cy=status]').should('contain', 'Pending');\n```\n\nUse when you would otherwise repeat a long selector, or when a `within` is too large.\n\n`cy.get('@leaveRows')` — **at-prefix**. Forgetting `@` looks for a CSS tag `<leaveRows>`.\n\nDo **not**:\n\n```ts\ncy.wait('@leaveRows'); // wait is for intercepts / numbered waits, not DOM\n```\n\n### 2. Intercept (route) aliases\n\n```ts\ncy.intercept('GET', '/api/leave*').as('getLeave');\ncy.visit('/leave');\ncy.wait('@getLeave').its('response.statusCode').should('eq', 200);\ncy.get('[data-cy=leave-table] tbody tr').should('have.length', 3);\n```\n\nThis is the **idiomatic Cypress network wait**. Playwright uses `page.waitForResponse`. There is no `@` in Playwright.\n\n`cy.wait('@getLeave')` yields the interception object (`request`, `response`). You can `.as` again or `.its('response.body')`.\n\nMultiple calls: `cy.wait(['@getLeave', '@getMe'])`. Aliases can be waited more than once if multiple matching requests occur — match count matters; Part 5 covers `times` and `cy.wait` pitfalls.\n\n### 3. Data aliases\n\n```ts\ncy.fixture('employees.json').as('employees');\ncy.wrap({ role: 'manager' }).as('session');\ncy.request('POST', '/api/test/seed').its('body').as('seed');\n```\n\nConsume with `cy.get('@employees')` (queue) or `this.employees` (Mocha `this`).\n\n```ts\nbeforeEach(function () {\n  cy.fixture('employees.json').as('employees');\n});\n\nit('logs in the first fixture user', function () {\n  const user = this.employees[0];\n  cy.login(user.email);\n});\n```\n\n`this.employees` is populated **after** the `as` command runs. In `beforeEach`, the `it` runs later in the queue lifecycle — Mocha injects aliases onto `this` between hooks and tests when you use `function`. **Arrow `it(() => this.employees)` is undefined.**\n\nEquivalent without `this`:\n\n```ts\ncy.get('@employees').then((employees) => {\n  cy.login(employees[0].email);\n});\n```\n\nWorks with arrows. Prefer this if the team standard is arrows.\n\n## `this` vs `cy.get('@')` vs `.then`\n\n| Access | Needs `function ()` | Good for |\n|---|---|---|\n| `cy.get('@employees')` | No | Always safe on the queue |\n| `this.employees` | Yes | Fixtures/data in the next `it`/`beforeEach` |\n| `.then((x) => ...)` | No | Immediate use of yielded subject |\n\nDOM + `this`:\n\n```ts\nbeforeEach(function () {\n  cy.visit('/leave');\n  cy.get('tbody tr').as('rows');\n});\n\nit('has rows', function () {\n  // this.rows may be a jQuery object snapshot — prefer cy.get('@rows') for retry\n  cy.get('@rows').should('have.length', 3);\n});\n```\n\n**Prefer `cy.get('@domAlias')` for DOM** so retry-ability still applies. Use `this` for JSON fixtures.\n\n## Naming\n\nUse camelCase, no `@` in the `.as()` argument:\n\n```ts\n.as('getLeave');     // yes\n.as('@getLeave');    // no — double @@\n.as('get-leave');    // avoid\n```\n\nConvention: intercepts `verbNoun` (`getLeave`, `postLeave`); DOM `leaveRows`; data `employees`.\n\n## Sharing across tests?\n\nAliases do **not** replace `testIsolation`. They live on the **current test context**. A DOM alias from `it` A is not your session in `it` B. Re-create intercepts in `beforeEach`. Data fixtures can be loaded in `beforeEach` every time (cheap).\n\n`cy.session` (later) is how you share **browser auth**, not `.as`.\n\n## Playwright / Selenium comparison\n\n| Need | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Reuse locator | `.as` + `cy.get('@')` | `const rows = page.locator('tr')` (lazy) | `@FindBy` page objects |\n| Wait for HTTP | `intercept` + `wait('@')` | `waitForResponse` / `route` | proxy / BrowserMob, not built-in |\n| Fixture JSON | `cy.fixture` + `.as` | `fs.readFile` / test data objects | resource files |\n\nPlaywright can `const rows = page.locator('tr')` because locators are lazy and `await` is real. Cypress forbids that `const` pattern for commands; aliases are the substitute.\n\n## HRM spec using all three kinds\n\n```ts\ndescribe('Leave list', () => {\n  beforeEach(() => {\n    cy.intercept('GET', '/api/leave*').as('getLeave');\n    cy.fixture('employees.json').as('employees');\n    cy.login(Cypress.env('managerEmail'));\n  });\n\n  it('renders a row per fixture employee', () => {\n    cy.visit('/leave');\n    cy.wait('@getLeave');\n    cy.get('[data-cy=leave-table] tbody tr').as('leaveRows');\n    cy.get('@leaveRows').should('have.length.at.least', 1);\n    cy.get('@employees').then((employees) => {\n      cy.get('@leaveRows').first().should('contain', employees[0].email);\n    });\n  });\n});\n```\n\nThree kinds, one test, no `await`.\n\nNext: **assertions** — implicit `should` vs explicit `expect`, and which one retries.\n## DOM alias freshness\n\nModern Cypress re-queries DOM aliases with `cy.get('@rows')`. That is why they beat `const $rows = ...` even inside `.then` if the table re-rendered. Still, if the **selector** should change (filter applied), set a new alias.\n\n```ts\ncy.get('tbody tr').as('rows');\ncy.contains('button', 'Pending only').click();\ncy.get('tbody tr').as('rows'); // refresh the meaning of rows\ncy.get('@rows').should('have.length', 2);\n```\n\n## Intercept alias mistakes\n\n```ts\ncy.intercept('GET', '/api/leave').as('getLeave');\ncy.visit('/leave');\ncy.wait('@getLeave');\ncy.wait('@getLeave'); // may timeout — no second request\n```\n\nWait once per expected request, or use intercept `times`. Part 5.\n\nStarting the intercept **after** visit races: the request already happened. Aliases for intercepts must be registered **before** the action that triggers the network.\n\n## Data alias timing with arrows\n\n```ts\nbeforeEach(() => {\n  cy.fixture('employees.json').as('employees');\n});\n\nit('arrow', () => {\n  // this.employees === undefined\n  cy.get('@employees').should('have.length.at.least', 1);\n});\n```\n\nAlways works. Teach both; require `function` only when using `this`.\n\n## Aliasing `cy.request`\n\n```ts\ncy.request('GET', '/api/leave').as('leaveApi');\ncy.get('@leaveApi').its('status').should('eq', 200);\n```\n\nThis is a **data** alias (the response object), not an intercept. You cannot `cy.wait('@leaveApi')` to wait for a later XHR. Different kind.\n\n## TypeScript and aliases\n\n`this.employees` is untyped unless you extend Mocha's context. Many HRM teams skip `this` and use `cy.get('@employees')` to avoid `any`. Fine.\n\n## Interview drill\n\nName the **three kinds** of aliases. How do you retrieve each? Why `this.x` fails in arrows? Why `const el = cy.get` is not an alias?\n## All three kinds in a 20-line HRM spec (annotated)\n\n```ts\nit('manager list', function () {\n  // kind 2 — intercept\n  cy.intercept('GET', '/api/leave*').as('getLeave');\n  // kind 3 — data\n  cy.fixture('employees.json').as('employees');\n  cy.login(Cypress.env('managerEmail'));\n  cy.visit('/leave');\n  cy.wait('@getLeave'); // wait ONLY works for intercept aliases\n  // kind 1 — DOM\n  cy.get('[data-cy=leave-table] tbody tr').as('rows');\n  cy.get('@rows').should('have.length.at.least', 1);\n  cy.get('@employees').then((employees) => {\n    cy.get('@rows').should('contain', employees[0].email);\n  });\n});\n```\n\nSay out loud while pairing: \"getLeave is intercept, employees is data, rows is DOM.\"\n\n## `as` after intercept vs `as` after wait\n\n```ts\ncy.wait('@getLeave').its('response.body').as('leavePayload');\ncy.get('@leavePayload').should('be.an', 'array');\n```\n\n`leavePayload` is **data** (the body), even though it came from a network alias. `cy.wait('@leavePayload')` would be wrong.\n\n## Stale `this.rows`\n\nIf you use `this.rows` from a DOM alias, you may hold a jQuery snapshot. `cy.get('@rows')` is the retrying path. Interview answer: \"I retrieve DOM aliases with `cy.get('@name')`, not `this`, so retry-ability remains.\"\n\n## Alias names and `cy.get`\n\n`cy.get('@rows')` is special-cased. `cy.contains('@rows')` looks for the text `\"@rows\"`. Only `get`/`wait` (and a few others) treat `@` as alias lookup. Check docs when using `@` with a new command.\n## `cy.get('@alias')` type in TypeScript\n\nYield type is often `any`. Narrow in `.then`:\n\n```ts\ncy.get<Employee[]>('@employees').then((employees) => {\n  expect(employees[0].email).to.include('@');\n});\n```\n\n## Re-aliasing intercepts in `beforeEach`\n\nAlways. Isolation does not keep intercepts from the previous `it` in a way you should rely on. Register `cy.intercept().as('getLeave')` in `beforeEach` so every test has a clean waiter.\n\n## `as` with `{ type: 'static' }` (advanced)\n\nCypress can store a static jQuery snapshot vs re-query. Default re-query is what you want for DOM. If a blog post sets static, know it can go stale like Selenium. Prefer defaults.\n## Why three kinds exist (architecture)\n\nDOM aliases recover **elements**. Intercept aliases recover **network** events (`wait`). Data aliases recover **JSON/values** you computed. One `.as` API, three retrieval styles (`get('@')`, `wait('@')`, `this` / `get('@')`). Mixing retrieval is the bug: waiting on DOM, getting an intercept as if it were a row.\n\n## `beforeEach` + fixture alias without `this`\n\n```ts\nbeforeEach(() => {\n  cy.fixture('employees.json').as('employees');\n});\nit('uses fixture', () => {\n  cy.get('@employees').its('0.email').then((email) => cy.login(email));\n});\n```\n\nNo `function`, no `this`. This is the HRM default style unless you need `this.skip()`.\n\n## Alias and isolation\n\nAliases do not survive into the next `it` as a way to skip login. Test B does not get Test A's `@rows`. Re-create intercepts and visits per test. That is isolation plus alias lifetime.\n## Route alias vs DOM alias in the Command Log\n\nIntercept aliases show as blue route lines (`(XHR)` / `(fetch)`). DOM aliases show as get/find. If you `wait('@rows')` you will see Cypress look for a **request** named rows and hang. Read the log color/shape.\n\n## `as` naming collisions\n\nDo not `.as('getLeave')` on both an intercept and a DOM element. The second write wins for that name. Prefix DOM (`leaveRows`) vs intercept (`getLeave`) vs data (`employees`) as a team convention — that is why the three kinds have three naming styles in this chapter.\n## `cy.get('@alias')` vs `cy.wait('@alias')` decision\n\n- Name refers to **elements or JSON** → `cy.get('@name')`\n- Name refers to **intercept** and you need the request to happen → `cy.wait('@name')`\n- After `wait`, you may `.as('body')` on `its('response.body')` and then `get('@body')` (data)\n\nIf you remember only one retrieval rule, remember that. The three kinds are DOM, intercept, data.\n\n## Aliases are per-test, not per-file\n\n`beforeEach` is where intercept and fixture aliases belong so every `it` gets them. Putting `cy.intercept().as('getLeave')` only in the first `it` is why the second test times out on `wait`.\n\n\n## `cy.get('@alias')` inside `within`\n\n`within` scopes `cy.get(selector)`. `cy.get('@employees')` is alias lookup, not a CSS selector — it still works inside `within` because `@` is special. `cy.get('employees')` would look for a tag. Keep the `@`.\n",
  "blocks": [
    {
      "id": "cy-2-5-md-0",
      "type": "overview",
      "heading": "Why aliases exist",
      "content": "This does not work:\n\n```ts\nconst $rows = cy.get('tbody tr');\n$rows.should('have.length', 3); // $rows is a Chainable queued, not rows\n```\n\nThis does:\n\n```ts\ncy.get('tbody tr').as('rows');\ncy.get('@rows').should('have.length', 3);\ncy.get('@rows').last().click();\n```\n\n`.as('rows')` stores the **name** on the test context. `cy.get('@rows')` is a command that retrieves it (for DOM aliases, Cypress **re-queries** the elements so they stay fresh — that is the point versus a stale jQuery snapshot).",
      "order": 0
    },
    {
      "id": "cy-2-5-md-1",
      "type": "overview",
      "heading": "The three kinds",
      "content": "### 1. DOM aliases\n\n```ts\ncy.get('[data-cy=leave-table] tbody tr').as('leaveRows');\ncy.get('@leaveRows').should('have.length.at.least', 1);\ncy.get('@leaveRows').eq(0).find('[data-cy=status]').should('contain', 'Pending');\n```\n\nUse when you would otherwise repeat a long selector, or when a `within` is too large.\n\n`cy.get('@leaveRows')` — **at-prefix**. Forgetting `@` looks for a CSS tag `<leaveRows>`.\n\nDo **not**:\n\n```ts\ncy.wait('@leaveRows'); // wait is for intercepts / numbered waits, not DOM\n```\n\n### 2. Intercept (route) aliases\n\n```ts\ncy.intercept('GET', '/api/leave*').as('getLeave');\ncy.visit('/leave');\ncy.wait('@getLeave').its('response.statusCode').should('eq', 200);\ncy.get('[data-cy=leave-table] tbody tr').should('have.length', 3);\n```\n\nThis is the **idiomatic Cypress network wait**. Playwright uses `page.waitForResponse`. There is no `@` in Playwright.\n\n`cy.wait('@getLeave')` yields the interception object (`request`, `response`). You can `.as` again or `.its('response.body')`.\n\nMultiple calls: `cy.wait(['@getLeave', '@getMe'])`. Aliases can be waited more than once if multiple matching requests occur — match count matters; Part 5 covers `times` and `cy.wait` pitfalls.\n\n### 3. Data aliases\n\n```ts\ncy.fixture('employees.json').as('employees');\ncy.wrap({ role: 'manager' }).as('session');\ncy.request('POST', '/api/test/seed').its('body').as('seed');\n```\n\nConsume with `cy.get('@employees')` (queue) or `this.employees` (Mocha `this`).\n\n```ts\nbeforeEach(function () {\n  cy.fixture('employees.json').as('employees');\n});\n\nit('logs in the first fixture user', function () {\n  const user = this.employees[0];\n  cy.login(user.email);\n});\n```\n\n`this.employees` is populated **after** the `as` command runs. In `beforeEach`, the `it` runs later in the queue lifecycle — Mocha injects aliases onto `this` between hooks and tests when you use `function`. **Arrow `it(() => this.employees)` is undefined.**\n\nEquivalent without `this`:\n\n```ts\ncy.get('@employees').then((employees) => {\n  cy.login(employees[0].email);\n});\n```\n\nWorks with arrows. Prefer this if the team standard is arrows.",
      "order": 1
    },
    {
      "id": "cy-2-5-md-2",
      "type": "overview",
      "heading": "`this` vs `cy.get('@')` vs `.then`",
      "content": "| Access | Needs `function ()` | Good for |\n|---|---|---|\n| `cy.get('@employees')` | No | Always safe on the queue |\n| `this.employees` | Yes | Fixtures/data in the next `it`/`beforeEach` |\n| `.then((x) => ...)` | No | Immediate use of yielded subject |\n\nDOM + `this`:\n\n```ts\nbeforeEach(function () {\n  cy.visit('/leave');\n  cy.get('tbody tr').as('rows');\n});\n\nit('has rows', function () {\n  // this.rows may be a jQuery object snapshot — prefer cy.get('@rows') for retry\n  cy.get('@rows').should('have.length', 3);\n});\n```\n\n**Prefer `cy.get('@domAlias')` for DOM** so retry-ability still applies. Use `this` for JSON fixtures.",
      "order": 2
    },
    {
      "id": "cy-2-5-md-3",
      "type": "overview",
      "heading": "Naming",
      "content": "Use camelCase, no `@` in the `.as()` argument:\n\n```ts\n.as('getLeave');     // yes\n.as('@getLeave');    // no — double @@\n.as('get-leave');    // avoid\n```\n\nConvention: intercepts `verbNoun` (`getLeave`, `postLeave`); DOM `leaveRows`; data `employees`.",
      "order": 3
    },
    {
      "id": "cy-2-5-md-4",
      "type": "overview",
      "heading": "Sharing across tests?",
      "content": "Aliases do **not** replace `testIsolation`. They live on the **current test context**. A DOM alias from `it` A is not your session in `it` B. Re-create intercepts in `beforeEach`. Data fixtures can be loaded in `beforeEach` every time (cheap).\n\n`cy.session` (later) is how you share **browser auth**, not `.as`.",
      "order": 4
    },
    {
      "id": "cy-2-5-md-5",
      "type": "overview",
      "heading": "Playwright / Selenium comparison",
      "content": "| Need | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Reuse locator | `.as` + `cy.get('@')` | `const rows = page.locator('tr')` (lazy) | `@FindBy` page objects |\n| Wait for HTTP | `intercept` + `wait('@')` | `waitForResponse` / `route` | proxy / BrowserMob, not built-in |\n| Fixture JSON | `cy.fixture` + `.as` | `fs.readFile` / test data objects | resource files |\n\nPlaywright can `const rows = page.locator('tr')` because locators are lazy and `await` is real. Cypress forbids that `const` pattern for commands; aliases are the substitute.",
      "order": 5
    },
    {
      "id": "cy-2-5-md-6",
      "type": "overview",
      "heading": "HRM spec using all three kinds",
      "content": "```ts\ndescribe('Leave list', () => {\n  beforeEach(() => {\n    cy.intercept('GET', '/api/leave*').as('getLeave');\n    cy.fixture('employees.json').as('employees');\n    cy.login(Cypress.env('managerEmail'));\n  });\n\n  it('renders a row per fixture employee', () => {\n    cy.visit('/leave');\n    cy.wait('@getLeave');\n    cy.get('[data-cy=leave-table] tbody tr').as('leaveRows');\n    cy.get('@leaveRows').should('have.length.at.least', 1);\n    cy.get('@employees').then((employees) => {\n      cy.get('@leaveRows').first().should('contain', employees[0].email);\n    });\n  });\n});\n```\n\nThree kinds, one test, no `await`.\n\nNext: **assertions** — implicit `should` vs explicit `expect`, and which one retries.",
      "order": 6
    },
    {
      "id": "cy-2-5-md-7",
      "type": "overview",
      "heading": "DOM alias freshness",
      "content": "Modern Cypress re-queries DOM aliases with `cy.get('@rows')`. That is why they beat `const $rows = ...` even inside `.then` if the table re-rendered. Still, if the **selector** should change (filter applied), set a new alias.\n\n```ts\ncy.get('tbody tr').as('rows');\ncy.contains('button', 'Pending only').click();\ncy.get('tbody tr').as('rows'); // refresh the meaning of rows\ncy.get('@rows').should('have.length', 2);\n```",
      "order": 7
    },
    {
      "id": "cy-2-5-md-8",
      "type": "overview",
      "heading": "Intercept alias mistakes",
      "content": "```ts\ncy.intercept('GET', '/api/leave').as('getLeave');\ncy.visit('/leave');\ncy.wait('@getLeave');\ncy.wait('@getLeave'); // may timeout — no second request\n```\n\nWait once per expected request, or use intercept `times`. Part 5.\n\nStarting the intercept **after** visit races: the request already happened. Aliases for intercepts must be registered **before** the action that triggers the network.",
      "order": 8
    },
    {
      "id": "cy-2-5-md-9",
      "type": "overview",
      "heading": "Data alias timing with arrows",
      "content": "```ts\nbeforeEach(() => {\n  cy.fixture('employees.json').as('employees');\n});\n\nit('arrow', () => {\n  // this.employees === undefined\n  cy.get('@employees').should('have.length.at.least', 1);\n});\n```\n\nAlways works. Teach both; require `function` only when using `this`.",
      "order": 9
    },
    {
      "id": "cy-2-5-md-10",
      "type": "overview",
      "heading": "Aliasing `cy.request`",
      "content": "```ts\ncy.request('GET', '/api/leave').as('leaveApi');\ncy.get('@leaveApi').its('status').should('eq', 200);\n```\n\nThis is a **data** alias (the response object), not an intercept. You cannot `cy.wait('@leaveApi')` to wait for a later XHR. Different kind.",
      "order": 10
    },
    {
      "id": "cy-2-5-md-11",
      "type": "overview",
      "heading": "TypeScript and aliases",
      "content": "`this.employees` is untyped unless you extend Mocha's context. Many HRM teams skip `this` and use `cy.get('@employees')` to avoid `any`. Fine.",
      "order": 11
    },
    {
      "id": "cy-2-5-md-12",
      "type": "overview",
      "heading": "Interview drill",
      "content": "Name the **three kinds** of aliases. How do you retrieve each? Why `this.x` fails in arrows? Why `const el = cy.get` is not an alias?",
      "order": 12
    },
    {
      "id": "cy-2-5-md-13",
      "type": "overview",
      "heading": "All three kinds in a 20-line HRM spec (annotated)",
      "content": "```ts\nit('manager list', function () {\n  // kind 2 — intercept\n  cy.intercept('GET', '/api/leave*').as('getLeave');\n  // kind 3 — data\n  cy.fixture('employees.json').as('employees');\n  cy.login(Cypress.env('managerEmail'));\n  cy.visit('/leave');\n  cy.wait('@getLeave'); // wait ONLY works for intercept aliases\n  // kind 1 — DOM\n  cy.get('[data-cy=leave-table] tbody tr').as('rows');\n  cy.get('@rows').should('have.length.at.least', 1);\n  cy.get('@employees').then((employees) => {\n    cy.get('@rows').should('contain', employees[0].email);\n  });\n});\n```\n\nSay out loud while pairing: \"getLeave is intercept, employees is data, rows is DOM.\"",
      "order": 13
    },
    {
      "id": "cy-2-5-md-14",
      "type": "overview",
      "heading": "`as` after intercept vs `as` after wait",
      "content": "```ts\ncy.wait('@getLeave').its('response.body').as('leavePayload');\ncy.get('@leavePayload').should('be.an', 'array');\n```\n\n`leavePayload` is **data** (the body), even though it came from a network alias. `cy.wait('@leavePayload')` would be wrong.",
      "order": 14
    },
    {
      "id": "cy-2-5-md-15",
      "type": "overview",
      "heading": "Stale `this.rows`",
      "content": "If you use `this.rows` from a DOM alias, you may hold a jQuery snapshot. `cy.get('@rows')` is the retrying path. Interview answer: \"I retrieve DOM aliases with `cy.get('@name')`, not `this`, so retry-ability remains.\"",
      "order": 15
    },
    {
      "id": "cy-2-5-md-16",
      "type": "overview",
      "heading": "Alias names and `cy.get`",
      "content": "`cy.get('@rows')` is special-cased. `cy.contains('@rows')` looks for the text `\"@rows\"`. Only `get`/`wait` (and a few others) treat `@` as alias lookup. Check docs when using `@` with a new command.",
      "order": 16
    },
    {
      "id": "cy-2-5-md-17",
      "type": "overview",
      "heading": "`cy.get('@alias')` type in TypeScript",
      "content": "Yield type is often `any`. Narrow in `.then`:\n\n```ts\ncy.get<Employee[]>('@employees').then((employees) => {\n  expect(employees[0].email).to.include('@');\n});\n```",
      "order": 17
    },
    {
      "id": "cy-2-5-md-18",
      "type": "overview",
      "heading": "Re-aliasing intercepts in `beforeEach`",
      "content": "Always. Isolation does not keep intercepts from the previous `it` in a way you should rely on. Register `cy.intercept().as('getLeave')` in `beforeEach` so every test has a clean waiter.",
      "order": 18
    },
    {
      "id": "cy-2-5-md-19",
      "type": "overview",
      "heading": "`as` with `{ type: 'static' }` (advanced)",
      "content": "Cypress can store a static jQuery snapshot vs re-query. Default re-query is what you want for DOM. If a blog post sets static, know it can go stale like Selenium. Prefer defaults.",
      "order": 19
    },
    {
      "id": "cy-2-5-md-20",
      "type": "overview",
      "heading": "Why three kinds exist (architecture)",
      "content": "DOM aliases recover **elements**. Intercept aliases recover **network** events (`wait`). Data aliases recover **JSON/values** you computed. One `.as` API, three retrieval styles (`get('@')`, `wait('@')`, `this` / `get('@')`). Mixing retrieval is the bug: waiting on DOM, getting an intercept as if it were a row.",
      "order": 20
    },
    {
      "id": "cy-2-5-md-21",
      "type": "overview",
      "heading": "`beforeEach` + fixture alias without `this`",
      "content": "```ts\nbeforeEach(() => {\n  cy.fixture('employees.json').as('employees');\n});\nit('uses fixture', () => {\n  cy.get('@employees').its('0.email').then((email) => cy.login(email));\n});\n```\n\nNo `function`, no `this`. This is the HRM default style unless you need `this.skip()`.",
      "order": 21
    },
    {
      "id": "cy-2-5-md-22",
      "type": "overview",
      "heading": "Alias and isolation",
      "content": "Aliases do not survive into the next `it` as a way to skip login. Test B does not get Test A's `@rows`. Re-create intercepts and visits per test. That is isolation plus alias lifetime.",
      "order": 22
    },
    {
      "id": "cy-2-5-md-23",
      "type": "overview",
      "heading": "Route alias vs DOM alias in the Command Log",
      "content": "Intercept aliases show as blue route lines (`(XHR)` / `(fetch)`). DOM aliases show as get/find. If you `wait('@rows')` you will see Cypress look for a **request** named rows and hang. Read the log color/shape.",
      "order": 23
    },
    {
      "id": "cy-2-5-md-24",
      "type": "overview",
      "heading": "`as` naming collisions",
      "content": "Do not `.as('getLeave')` on both an intercept and a DOM element. The second write wins for that name. Prefix DOM (`leaveRows`) vs intercept (`getLeave`) vs data (`employees`) as a team convention — that is why the three kinds have three naming styles in this chapter.",
      "order": 24
    },
    {
      "id": "cy-2-5-md-25",
      "type": "overview",
      "heading": "`cy.get('@alias')` vs `cy.wait('@alias')` decision",
      "content": "- Name refers to **elements or JSON** → `cy.get('@name')`\n- Name refers to **intercept** and you need the request to happen → `cy.wait('@name')`\n- After `wait`, you may `.as('body')` on `its('response.body')` and then `get('@body')` (data)\n\nIf you remember only one retrieval rule, remember that. The three kinds are DOM, intercept, data.",
      "order": 25
    },
    {
      "id": "cy-2-5-md-26",
      "type": "overview",
      "heading": "Aliases are per-test, not per-file",
      "content": "`beforeEach` is where intercept and fixture aliases belong so every `it` gets them. Putting `cy.intercept().as('getLeave')` only in the first `it` is why the second test times out on `wait`.",
      "order": 26
    },
    {
      "id": "cy-2-5-md-27",
      "type": "overview",
      "heading": "`cy.get('@alias')` inside `within`",
      "content": "`within` scopes `cy.get(selector)`. `cy.get('@employees')` is alias lookup, not a CSS selector — it still works inside `within` because `@` is special. `cy.get('employees')` would look for a tag. Keep the `@`.",
      "order": 27
    }
  ],
  "advantages": [
    "2.5 Aliases — Saving cy."
  ],
  "limitations": [
    "2.5 Aliases is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
