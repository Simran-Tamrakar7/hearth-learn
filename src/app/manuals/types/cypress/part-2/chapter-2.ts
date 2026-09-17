import type { ChapterRecord } from "../../../types";

/** 2.2 cy.visit, cy.get, cy.contains, cy.find */
export const chapter = {
  "id": "cy-2-2-cy-visit-cy-get-cy-contains-cy-find",
  "title": "2.2 cy.visit, cy.get, cy.contains, cy.find",
  "minutes": 32,
  "level": "beginner",
  "phase": "Part 2 · Core Syntax & Commands",
  "partName": "Part 2 · Core Syntax & Commands",
  "overviewText": "cy.visit loads a URL in the AUT iframe. cy.get queries from the document root by selector. cy.contains finds by text (optionally scoped to a selector). cy.find searches descendants of the previous subject and cannot be used as cy.find from a blank chain. Choosing among get/contains/find is the daily locator skill; mixing them wrong yields 'must be chained' errors or overly broad matches.",
  "why": "get vs find is the first Cypress-specific locator question in interviews. contains is how you click 'Submit' without a brittle CSS class. visit without baseUrl or without waiting via a following assertion is how smoke tests lie.",
  "when": "Every spec. Revisit when cy.find throws, when contains matches a hidden template, and when you are tempted to CSS-select by text.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "On /leave, click the Submit button inside the request form without matching a different Submit in the nav, then assert a table row that contains Ada Lovelace.",
    "pass": "cy.visit('/leave'); cy.get('form[data-cy=leave-form]').find('button[type=submit]').click(); cy.contains('tr', 'Ada Lovelace').should('be.visible').",
    "fail": "You call cy.find('button') with no parent, or cy.get('button') and click the first of six, or cy.contains('Ada') matching a toast and a row."
  },
  "tools": [],
  "customSummary": "- cy.visit(path|url) uses baseUrl for relative paths; waits for load (pageLoadTimeout), not for your SPA fetch.\n- cy.get(selector) queries the whole document (or within a cy.within); retries until it exists.\n- cy.contains(text) or cy.contains(selector, text) queries by content; more user-like than CSS.\n- cy.find(selector) must be chained off a subject — descendants only. Never cy.find() at the root.\n- Prefer get(form).find(button) or contains('button', 'Submit') over get('button') when duplicates exist.\n- Playwright: page.goto / locator / getByText / locator.locator. Selenium: get / findElement / XPath contains().",
  "contentMarkdown": "## `cy.visit` — enter the app\n\n```ts\ncy.visit('/leave/new');                 // baseUrl + path\ncy.visit('https://staging.example/leave/new'); // absolute, ignores baseUrl prefix\ncy.visit('/leave', { qs: { tab: 'pending' } });\ncy.visit('/leave', {\n  onBeforeLoad(win) {\n    // too early for most tests; intercepts are usually enough\n  },\n});\n```\n\n`visit` waits for the window **`load`** event (see `pageLoadTimeout`, default 60s). A React HRM page can `load` while a spinner still shows. **The next assertion** is what waits for UI readiness:\n\n```ts\ncy.visit('/leave');\ncy.get('[data-cy=leave-table]').should('be.visible');\n```\n\nDo not follow visit with `cy.wait(3000)`.\n\nOptions you will actually use:\n\n| Option | Why |\n|---|---|\n| `failOnStatusCode: false` | Visit an expected 404 page |\n| `timeout` | One slow cold compile |\n| `headers` | Rare; prefer `cy.session` / intercept |\n| `qs` | Query string object |\n\nPlaywright: `page.goto` waits for `load`/`domcontentloaded`/`networkidle` by option. Cypress does not have `networkidle` as a visit wait — use intercepts (`cy.wait('@alias')`) or UI assertions.\n\nSelenium: `driver.get` — no SPA wait at all unless you add WebDriverWait.\n\n## `cy.get` — CSS/selector from the root\n\n```ts\ncy.get('[data-cy=leave-table]');\ncy.get('#email');\ncy.get('.btn-primary'); // brittle; last resort\n```\n\n`cy.get` always starts from the **root document** of the AUT (unless you are inside `cy.within`). It is **not** \"get relative to last element\" — that is `find`.\n\n```ts\ncy.get('form').get('button'); // second get is STILL the whole document's buttons\ncy.get('form').find('button'); // buttons inside that form\n```\n\nThis is the #1 `get` vs `find` bug.\n\n`cy.get` retries until at least one element matches or `defaultCommandTimeout` (4s) elapses. It yields a **jQuery collection** (all matches, not only the first) as the subject. Actions like `.click()` use the **first** matched element unless you `.eq(n)` / `.last()`.\n\n```ts\ncy.get('button');              // might match 12 buttons\ncy.get('button').eq(0).click(); // explicit first\ncy.get('button').should('have.length', 1).click(); // fail if duplicates\n```\n\nPrefer unique `data-cy` in HRM components:\n\n```html\n<button data-cy=\"leave-submit\" type=\"submit\">Submit</button>\n```\n\n```ts\ncy.get('[data-cy=leave-submit]').click();\n```\n\n## `cy.contains` — by text\n\n```ts\ncy.contains('Sign in');\ncy.contains('button', 'Sign in');\ncy.contains(/pending/i);\ncy.contains('[data-cy=status]', 'Pending');\n```\n\nSignatures:\n\n- `cy.contains(content)`\n- `cy.contains(selector, content)`\n- Chained: `cy.get('table').contains('td', 'Ada Lovelace')`\n\n`contains` finds the **deepest** element that has the text, which is usually what you want for a click. It still retries.\n\n**Scope it** when the string appears twice:\n\n```ts\ncy.contains('Submit'); // nav + form + modal?\ncy.get('[data-cy=leave-form]').contains('button', 'Submit').click();\ncy.contains('[data-cy=leave-form] button', 'Submit').click();\n```\n\n`cy.contains('button', 'Submit')` is \"a button whose content includes Submit\" — better than `cy.get('button').contains('Submit')` in some chains; both appear in the wild.\n\nHidden text: `contains` can match elements that are not visible. Follow with `.should('be.visible')` before clicking, or the click will retry on **actionability** (2.4).\n\nPlaywright: `getByText`, `getByRole('button', { name: 'Submit' })`. Cypress 12+ has `cy.get` + selector playground; `cy.contains` is still the text tool. There is no first-class `getByRole` in core Cypress (Testing Library plugins exist — optional).\n\nSelenium: `By.xpath(\"//button[contains(., 'Submit')]\")` — `contains` is the readable version of that.\n\n## `cy.find` — descendants of the current subject\n\n```ts\ncy.get('[data-cy=leave-form]').find('input[name=startDate]');\ncy.get('table tbody').find('tr').should('have.length', 3);\n```\n\n**`cy.find` cannot start a chain.**\n\n```ts\ncy.find('button'); // CypressError: must be chained off a previous command\n```\n\n`find` uses jQuery `.find()`: descendants, not the subject element itself. If the subject *is* the button, `find('button')` is empty. Use `.filter` / `.closest` / get the parent first.\n\n| Command | Starts from | Relative? | Root OK? |\n|---|---|---|---|\n| `cy.get` | Document (or `within` root) | No | Yes `cy.get` |\n| `cy.contains` | Document or previous subject if chained | Optional | Yes `cy.contains` |\n| `.find` | Previous subject | Yes, descendants | **No** |\n\n## `cy.within` — temporary root for `get`\n\n```ts\ncy.get('[data-cy=leave-form]').within(() => {\n  cy.get('input[name=startDate]').type('2026-09-21');\n  cy.get('input[name=endDate]').type('2026-09-21');\n  cy.contains('button', 'Submit').click();\n});\n```\n\nInside `within`, `cy.get` is scoped to that element. `find` is still chained. `within` is how you avoid repeating the form selector. Do not nest `within` deeply — readability dies.\n\n## Decision table (HRM)\n\n| Intent | Command |\n|---|---|\n| Load the leave page | `cy.visit('/leave')` |\n| Unique `data-cy` | `cy.get('[data-cy=leave-table]')` |\n| Click labeled button | `cy.contains('button', 'Approve')` |\n| CSS inside a known parent | `cy.get('[data-cy=row-12]').find('.status')` |\n| Several fields in one card | `cy.get('[data-cy=leave-form]').within(() => { ... })` |\n| Row that shows a name | `cy.contains('tr', 'Ada Lovelace')` |\n\n## Playwright / Selenium mapping\n\n| Cypress | Playwright | Selenium |\n|---|---|---|\n| `cy.visit` | `page.goto` | `driver.get` |\n| `cy.get(sel)` | `page.locator(sel)` | `findElement(By.css)` |\n| `cy.contains(text)` | `getByText` / `getByRole` | XPath text |\n| `.find(sel)` | `locator.locator(sel)` | `element.findElement` |\n| `.within` | `locator` scoped variable | search context element |\n\nPlaywright locators are **lazy** and re-query; Cypress `get` also re-queries while retrying. Selenium `WebElement` goes **stale**. Cypress/Playwright win here.\n\n## Common errors\n\n1. **`cy.find` at root** — use `cy.get`.\n2. **`cy.get('form').get('input')`** — second get is global; use `find` or `within`.\n3. **`cy.contains('Ada')` on a page listing Ada in nav, toast, and table** — scope to `tr` or `data-cy`.\n4. **Visit and immediately `cy.get` a list that is fetched** — assertion retries; if 4s is tight, intercept + `cy.wait('@alias')` (Part 5), not a longer global timeout.\n5. **`.get('div')`** — too wide; Command Log will show 200 matches.\n\n## Small HRM example combining all four\n\n```ts\nit('submits leave from the new-request page', () => {\n  cy.visit('/leave/new');\n  cy.get('[data-cy=leave-form]').within(() => {\n    cy.get('[name=startDate]').type('2026-09-21');\n    cy.find('[name=endDate]').type('2026-09-21'); // chained inside within's subject\n    cy.contains('button', 'Submit').click();\n  });\n  cy.contains('[data-cy=toast]', 'Request submitted').should('be.visible');\n});\n```\n\nNext: how these commands **chain**, and why the queue is two-phase.\n## `cy.visit` options you will touch later\n\n```ts\ncy.visit('/login', {\n  failOnStatusCode: true,\n  retryOnStatusCodeFailure: false,\n  retryOnNetworkFailure: true,\n});\n```\n\nAuth cookies: prefer `cy.session` (later) over stuffing `onBeforeLoad` with `localStorage.setItem('token')` unless the app truly stores tokens that way.\n\nQuery strings:\n\n```ts\ncy.visit({ url: '/leave', qs: { filter: 'pending', page: '2' } });\n```\n\n## `cy.get` vs jQuery vs `Cypress.$`\n\n`Cypress.$('button')` is **synchronous jQuery** with **no retry**. Only use it inside `.then` after the page is ready. Day-to-day: `cy.get`.\n\n```ts\ncy.get('body').then(($body) => {\n  const n = $body.find('[data-cy=row]').length; // snapshot\n});\n```\n\n## `contains` regex and whitespace\n\n```ts\ncy.contains(/sign\\s*in/i);\ncy.contains('button', /^Submit$/);\n```\n\nHRM copy that includes extra spaces or NBSP fails exact `'have.text'`. `contains` is more forgiving. Still scope to a selector when the word \"Submit\" is everywhere.\n\n## `find` vs `children` vs `eq`\n\n```ts\ncy.get('tr').eq(2);          // 3rd row, 0-based, among all tr\ncy.get('tbody').find('tr').eq(2);\ncy.get('ul').children('li'); // direct children only\n```\n\n`find` is descendants (all depths). `children` is one level. Wrong one is a common \"element not found\" on nested HRM tables.\n\n## `within` gotcha\n\n```ts\ncy.get('[data-cy=leave-form]').within(() => {\n  cy.visit('/other'); // AUT navigates; within scope is now nonsense\n});\n```\n\nDo not visit inside `within`. Keep `within` to filling a form.\n\n## Interview drill\n\nWhy is `cy.get('form').get('input')` wrong? When does `cy.find` throw? How do you click the Submit that is in the form, not the nav? What does `visit` wait for, and what does it not wait for?\n## `cy.get` alias of jQuery selectors\n\n```ts\ncy.get('input[name=email]');\ncy.get('.modal:visible');      // :visible is jQuery — works, but prefer should('be.visible')\ncy.get('[data-cy^=leave-]');   // prefix match\n```\n\n`:visible` in the selector is a snapshot of CSS, not the same retry story as `.should('be.visible')`. Prefer assertion.\n\n## Contains + get combo errors\n\n```ts\ncy.get('button').contains('Submit').click();\n```\n\nThis works (chain contains off get). It clicks a button among the matched buttons that has that text. Equivalent scoped form:\n\n```ts\ncy.contains('button', 'Submit').click();\n```\n\nPrefer the latter; fewer ways to accidentally click a `div` that contains a button.\n\n## Visiting `about:blank` between tests\n\nWith isolation, you always `visit` in the test or `beforeEach`. A helper `cy.login` should end on a known page or not visit until the test asks. Double visit (login visits `/`, test visits `/leave`) is OK and clearer than clever reuse.\n\n## `cy.go` and `cy.reload`\n\n```ts\ncy.go('back');\ncy.reload();\n```\n\nBoth are load-ish commands (`pageLoadTimeout`). They are not substitutes for `visit` in smoke tests. Use reload when testing \"refetch on refresh.\"\n\n## Selector Playground vs `data-cy`\n\nPlayground may suggest `nth-child`. Do not paste that into HRM specs. Add `data-cy=\"leave-submit\"` on the component. Playwright's `getByTestId` is the same idea (`data-testid`). Selenium has no standard; teams invent `data-test`.\n## `cy.root()` inside `within`\n\n```ts\ncy.get('[data-cy=leave-form]').within(() => {\n  cy.root().should('have.attr', 'data-cy', 'leave-form');\n  cy.get('input').should('have.length.at.least', 2);\n});\n```\n\n`cy.root()` is the current within subject. `cy.get` stays scoped. `cy.find` still needs a previous chained subject (`cy.root().find('input')` is equivalent to `cy.get('input')` here).\n\n## `prev`, `next`, `parent` (use sparingly)\n\n```ts\ncy.contains('td', 'Ada Lovelace').parent('tr').find('[data-cy=status]');\n```\n\nThis is a valid alternative to `cy.contains('tr', 'Ada Lovelace')`. Prefer the latter. Traversal commands (`parent`, `next`, `siblings`) retry as part of the chain when followed by `should`.\n## `cy.get` timeout vs visit timeout\n\nA visit that never `load`s fails with `pageLoadTimeout` (60s), not 4s. A get that never matches fails at 4s. Reading the error title tells you which layer (Part 1.5) to touch — still prefer a better assertion over a bigger number.\n\n## Contains from a previous subject\n\n```ts\ncy.get('[data-cy=leave-table]').contains('tr', 'Ada Lovelace');\n```\n\nThis is `contains` **chained**, scoped to the table. Equivalent spirit to `get(table).find('tr').contains('Ada')` but `contains('tr', text)` finds a `tr` that has the text, which is usually the row you wanted.\n## `hash` visits\n\n```ts\ncy.visit('/leave#pending');\ncy.hash().should('eq', '#pending');\n```\n\nIf HRM routing is path-based (Next.js), you will use `pathname` more than `hash`. Visit still waits for `load`; the client router may then replace the URL — assert `location` after.\n",
  "blocks": [
    {
      "id": "cy-2-2-md-0",
      "type": "overview",
      "heading": "`cy.visit` — enter the app",
      "content": "```ts\ncy.visit('/leave/new');                 // baseUrl + path\ncy.visit('https://staging.example/leave/new'); // absolute, ignores baseUrl prefix\ncy.visit('/leave', { qs: { tab: 'pending' } });\ncy.visit('/leave', {\n  onBeforeLoad(win) {\n    // too early for most tests; intercepts are usually enough\n  },\n});\n```\n\n`visit` waits for the window **`load`** event (see `pageLoadTimeout`, default 60s). A React HRM page can `load` while a spinner still shows. **The next assertion** is what waits for UI readiness:\n\n```ts\ncy.visit('/leave');\ncy.get('[data-cy=leave-table]').should('be.visible');\n```\n\nDo not follow visit with `cy.wait(3000)`.\n\nOptions you will actually use:\n\n| Option | Why |\n|---|---|\n| `failOnStatusCode: false` | Visit an expected 404 page |\n| `timeout` | One slow cold compile |\n| `headers` | Rare; prefer `cy.session` / intercept |\n| `qs` | Query string object |\n\nPlaywright: `page.goto` waits for `load`/`domcontentloaded`/`networkidle` by option. Cypress does not have `networkidle` as a visit wait — use intercepts (`cy.wait('@alias')`) or UI assertions.\n\nSelenium: `driver.get` — no SPA wait at all unless you add WebDriverWait.",
      "order": 0
    },
    {
      "id": "cy-2-2-md-1",
      "type": "overview",
      "heading": "`cy.get` — CSS/selector from the root",
      "content": "```ts\ncy.get('[data-cy=leave-table]');\ncy.get('#email');\ncy.get('.btn-primary'); // brittle; last resort\n```\n\n`cy.get` always starts from the **root document** of the AUT (unless you are inside `cy.within`). It is **not** \"get relative to last element\" — that is `find`.\n\n```ts\ncy.get('form').get('button'); // second get is STILL the whole document's buttons\ncy.get('form').find('button'); // buttons inside that form\n```\n\nThis is the #1 `get` vs `find` bug.\n\n`cy.get` retries until at least one element matches or `defaultCommandTimeout` (4s) elapses. It yields a **jQuery collection** (all matches, not only the first) as the subject. Actions like `.click()` use the **first** matched element unless you `.eq(n)` / `.last()`.\n\n```ts\ncy.get('button');              // might match 12 buttons\ncy.get('button').eq(0).click(); // explicit first\ncy.get('button').should('have.length', 1).click(); // fail if duplicates\n```\n\nPrefer unique `data-cy` in HRM components:\n\n```html\n<button data-cy=\"leave-submit\" type=\"submit\">Submit</button>\n```\n\n```ts\ncy.get('[data-cy=leave-submit]').click();\n```",
      "order": 1
    },
    {
      "id": "cy-2-2-md-2",
      "type": "overview",
      "heading": "`cy.contains` — by text",
      "content": "```ts\ncy.contains('Sign in');\ncy.contains('button', 'Sign in');\ncy.contains(/pending/i);\ncy.contains('[data-cy=status]', 'Pending');\n```\n\nSignatures:\n\n- `cy.contains(content)`\n- `cy.contains(selector, content)`\n- Chained: `cy.get('table').contains('td', 'Ada Lovelace')`\n\n`contains` finds the **deepest** element that has the text, which is usually what you want for a click. It still retries.\n\n**Scope it** when the string appears twice:\n\n```ts\ncy.contains('Submit'); // nav + form + modal?\ncy.get('[data-cy=leave-form]').contains('button', 'Submit').click();\ncy.contains('[data-cy=leave-form] button', 'Submit').click();\n```\n\n`cy.contains('button', 'Submit')` is \"a button whose content includes Submit\" — better than `cy.get('button').contains('Submit')` in some chains; both appear in the wild.\n\nHidden text: `contains` can match elements that are not visible. Follow with `.should('be.visible')` before clicking, or the click will retry on **actionability** (2.4).\n\nPlaywright: `getByText`, `getByRole('button', { name: 'Submit' })`. Cypress 12+ has `cy.get` + selector playground; `cy.contains` is still the text tool. There is no first-class `getByRole` in core Cypress (Testing Library plugins exist — optional).\n\nSelenium: `By.xpath(\"//button[contains(., 'Submit')]\")` — `contains` is the readable version of that.",
      "order": 2
    },
    {
      "id": "cy-2-2-md-3",
      "type": "overview",
      "heading": "`cy.find` — descendants of the current subject",
      "content": "```ts\ncy.get('[data-cy=leave-form]').find('input[name=startDate]');\ncy.get('table tbody').find('tr').should('have.length', 3);\n```\n\n**`cy.find` cannot start a chain.**\n\n```ts\ncy.find('button'); // CypressError: must be chained off a previous command\n```\n\n`find` uses jQuery `.find()`: descendants, not the subject element itself. If the subject *is* the button, `find('button')` is empty. Use `.filter` / `.closest` / get the parent first.\n\n| Command | Starts from | Relative? | Root OK? |\n|---|---|---|---|\n| `cy.get` | Document (or `within` root) | No | Yes `cy.get` |\n| `cy.contains` | Document or previous subject if chained | Optional | Yes `cy.contains` |\n| `.find` | Previous subject | Yes, descendants | **No** |",
      "order": 3
    },
    {
      "id": "cy-2-2-md-4",
      "type": "overview",
      "heading": "`cy.within` — temporary root for `get`",
      "content": "```ts\ncy.get('[data-cy=leave-form]').within(() => {\n  cy.get('input[name=startDate]').type('2026-09-21');\n  cy.get('input[name=endDate]').type('2026-09-21');\n  cy.contains('button', 'Submit').click();\n});\n```\n\nInside `within`, `cy.get` is scoped to that element. `find` is still chained. `within` is how you avoid repeating the form selector. Do not nest `within` deeply — readability dies.",
      "order": 4
    },
    {
      "id": "cy-2-2-md-5",
      "type": "overview",
      "heading": "Decision table (HRM)",
      "content": "| Intent | Command |\n|---|---|\n| Load the leave page | `cy.visit('/leave')` |\n| Unique `data-cy` | `cy.get('[data-cy=leave-table]')` |\n| Click labeled button | `cy.contains('button', 'Approve')` |\n| CSS inside a known parent | `cy.get('[data-cy=row-12]').find('.status')` |\n| Several fields in one card | `cy.get('[data-cy=leave-form]').within(() => { ... })` |\n| Row that shows a name | `cy.contains('tr', 'Ada Lovelace')` |",
      "order": 5
    },
    {
      "id": "cy-2-2-md-6",
      "type": "overview",
      "heading": "Playwright / Selenium mapping",
      "content": "| Cypress | Playwright | Selenium |\n|---|---|---|\n| `cy.visit` | `page.goto` | `driver.get` |\n| `cy.get(sel)` | `page.locator(sel)` | `findElement(By.css)` |\n| `cy.contains(text)` | `getByText` / `getByRole` | XPath text |\n| `.find(sel)` | `locator.locator(sel)` | `element.findElement` |\n| `.within` | `locator` scoped variable | search context element |\n\nPlaywright locators are **lazy** and re-query; Cypress `get` also re-queries while retrying. Selenium `WebElement` goes **stale**. Cypress/Playwright win here.",
      "order": 6
    },
    {
      "id": "cy-2-2-md-7",
      "type": "overview",
      "heading": "Common errors",
      "content": "1. **`cy.find` at root** — use `cy.get`.\n2. **`cy.get('form').get('input')`** — second get is global; use `find` or `within`.\n3. **`cy.contains('Ada')` on a page listing Ada in nav, toast, and table** — scope to `tr` or `data-cy`.\n4. **Visit and immediately `cy.get` a list that is fetched** — assertion retries; if 4s is tight, intercept + `cy.wait('@alias')` (Part 5), not a longer global timeout.\n5. **`.get('div')`** — too wide; Command Log will show 200 matches.",
      "order": 7
    },
    {
      "id": "cy-2-2-md-8",
      "type": "overview",
      "heading": "Small HRM example combining all four",
      "content": "```ts\nit('submits leave from the new-request page', () => {\n  cy.visit('/leave/new');\n  cy.get('[data-cy=leave-form]').within(() => {\n    cy.get('[name=startDate]').type('2026-09-21');\n    cy.find('[name=endDate]').type('2026-09-21'); // chained inside within's subject\n    cy.contains('button', 'Submit').click();\n  });\n  cy.contains('[data-cy=toast]', 'Request submitted').should('be.visible');\n});\n```\n\nNext: how these commands **chain**, and why the queue is two-phase.",
      "order": 8
    },
    {
      "id": "cy-2-2-md-9",
      "type": "overview",
      "heading": "`cy.visit` options you will touch later",
      "content": "```ts\ncy.visit('/login', {\n  failOnStatusCode: true,\n  retryOnStatusCodeFailure: false,\n  retryOnNetworkFailure: true,\n});\n```\n\nAuth cookies: prefer `cy.session` (later) over stuffing `onBeforeLoad` with `localStorage.setItem('token')` unless the app truly stores tokens that way.\n\nQuery strings:\n\n```ts\ncy.visit({ url: '/leave', qs: { filter: 'pending', page: '2' } });\n```",
      "order": 9
    },
    {
      "id": "cy-2-2-md-10",
      "type": "overview",
      "heading": "`cy.get` vs jQuery vs `Cypress.$`",
      "content": "`Cypress.$('button')` is **synchronous jQuery** with **no retry**. Only use it inside `.then` after the page is ready. Day-to-day: `cy.get`.\n\n```ts\ncy.get('body').then(($body) => {\n  const n = $body.find('[data-cy=row]').length; // snapshot\n});\n```",
      "order": 10
    },
    {
      "id": "cy-2-2-md-11",
      "type": "overview",
      "heading": "`contains` regex and whitespace",
      "content": "```ts\ncy.contains(/sign\\s*in/i);\ncy.contains('button', /^Submit$/);\n```\n\nHRM copy that includes extra spaces or NBSP fails exact `'have.text'`. `contains` is more forgiving. Still scope to a selector when the word \"Submit\" is everywhere.",
      "order": 11
    },
    {
      "id": "cy-2-2-md-12",
      "type": "overview",
      "heading": "`find` vs `children` vs `eq`",
      "content": "```ts\ncy.get('tr').eq(2);          // 3rd row, 0-based, among all tr\ncy.get('tbody').find('tr').eq(2);\ncy.get('ul').children('li'); // direct children only\n```\n\n`find` is descendants (all depths). `children` is one level. Wrong one is a common \"element not found\" on nested HRM tables.",
      "order": 12
    },
    {
      "id": "cy-2-2-md-13",
      "type": "overview",
      "heading": "`within` gotcha",
      "content": "```ts\ncy.get('[data-cy=leave-form]').within(() => {\n  cy.visit('/other'); // AUT navigates; within scope is now nonsense\n});\n```\n\nDo not visit inside `within`. Keep `within` to filling a form.",
      "order": 13
    },
    {
      "id": "cy-2-2-md-14",
      "type": "overview",
      "heading": "Interview drill",
      "content": "Why is `cy.get('form').get('input')` wrong? When does `cy.find` throw? How do you click the Submit that is in the form, not the nav? What does `visit` wait for, and what does it not wait for?",
      "order": 14
    },
    {
      "id": "cy-2-2-md-15",
      "type": "overview",
      "heading": "`cy.get` alias of jQuery selectors",
      "content": "```ts\ncy.get('input[name=email]');\ncy.get('.modal:visible');      // :visible is jQuery — works, but prefer should('be.visible')\ncy.get('[data-cy^=leave-]');   // prefix match\n```\n\n`:visible` in the selector is a snapshot of CSS, not the same retry story as `.should('be.visible')`. Prefer assertion.",
      "order": 15
    },
    {
      "id": "cy-2-2-md-16",
      "type": "overview",
      "heading": "Contains + get combo errors",
      "content": "```ts\ncy.get('button').contains('Submit').click();\n```\n\nThis works (chain contains off get). It clicks a button among the matched buttons that has that text. Equivalent scoped form:\n\n```ts\ncy.contains('button', 'Submit').click();\n```\n\nPrefer the latter; fewer ways to accidentally click a `div` that contains a button.",
      "order": 16
    },
    {
      "id": "cy-2-2-md-17",
      "type": "overview",
      "heading": "Visiting `about:blank` between tests",
      "content": "With isolation, you always `visit` in the test or `beforeEach`. A helper `cy.login` should end on a known page or not visit until the test asks. Double visit (login visits `/`, test visits `/leave`) is OK and clearer than clever reuse.",
      "order": 17
    },
    {
      "id": "cy-2-2-md-18",
      "type": "overview",
      "heading": "`cy.go` and `cy.reload`",
      "content": "```ts\ncy.go('back');\ncy.reload();\n```\n\nBoth are load-ish commands (`pageLoadTimeout`). They are not substitutes for `visit` in smoke tests. Use reload when testing \"refetch on refresh.\"",
      "order": 18
    },
    {
      "id": "cy-2-2-md-19",
      "type": "overview",
      "heading": "Selector Playground vs `data-cy`",
      "content": "Playground may suggest `nth-child`. Do not paste that into HRM specs. Add `data-cy=\"leave-submit\"` on the component. Playwright's `getByTestId` is the same idea (`data-testid`). Selenium has no standard; teams invent `data-test`.",
      "order": 19
    },
    {
      "id": "cy-2-2-md-20",
      "type": "overview",
      "heading": "`cy.root()` inside `within`",
      "content": "```ts\ncy.get('[data-cy=leave-form]').within(() => {\n  cy.root().should('have.attr', 'data-cy', 'leave-form');\n  cy.get('input').should('have.length.at.least', 2);\n});\n```\n\n`cy.root()` is the current within subject. `cy.get` stays scoped. `cy.find` still needs a previous chained subject (`cy.root().find('input')` is equivalent to `cy.get('input')` here).",
      "order": 20
    },
    {
      "id": "cy-2-2-md-21",
      "type": "overview",
      "heading": "`prev`, `next`, `parent` (use sparingly)",
      "content": "```ts\ncy.contains('td', 'Ada Lovelace').parent('tr').find('[data-cy=status]');\n```\n\nThis is a valid alternative to `cy.contains('tr', 'Ada Lovelace')`. Prefer the latter. Traversal commands (`parent`, `next`, `siblings`) retry as part of the chain when followed by `should`.",
      "order": 21
    },
    {
      "id": "cy-2-2-md-22",
      "type": "overview",
      "heading": "`cy.get` timeout vs visit timeout",
      "content": "A visit that never `load`s fails with `pageLoadTimeout` (60s), not 4s. A get that never matches fails at 4s. Reading the error title tells you which layer (Part 1.5) to touch — still prefer a better assertion over a bigger number.",
      "order": 22
    },
    {
      "id": "cy-2-2-md-23",
      "type": "overview",
      "heading": "Contains from a previous subject",
      "content": "```ts\ncy.get('[data-cy=leave-table]').contains('tr', 'Ada Lovelace');\n```\n\nThis is `contains` **chained**, scoped to the table. Equivalent spirit to `get(table).find('tr').contains('Ada')` but `contains('tr', text)` finds a `tr` that has the text, which is usually the row you wanted.",
      "order": 23
    },
    {
      "id": "cy-2-2-md-24",
      "type": "overview",
      "heading": "`hash` visits",
      "content": "```ts\ncy.visit('/leave#pending');\ncy.hash().should('eq', '#pending');\n```\n\nIf HRM routing is path-based (Next.js), you will use `pathname` more than `hash`. Visit still waits for `load`; the client router may then replace the URL — assert `location` after.",
      "order": 24
    }
  ],
  "advantages": [
    "2.2 cy.visit, cy.get, cy.contains, cy.find — get vs find is the first Cypress-specific locator question in interviews."
  ],
  "limitations": [
    "2.2 cy.visit, cy.get, cy.contains, cy.find is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
