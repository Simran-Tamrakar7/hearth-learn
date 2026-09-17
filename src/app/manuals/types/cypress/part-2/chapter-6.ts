import type { ChapterRecord } from "../../../types";

/** 2.6 Assertions — implicit vs explicit */
export const chapter = {
  "id": "cy-2-6-assertions-implicit-vs-explicit",
  "title": "2.6 Assertions — implicit vs explicit",
  "minutes": 30,
  "level": "beginner",
  "phase": "Part 2 · Core Syntax & Commands",
  "partName": "Part 2 · Core Syntax & Commands",
  "overviewText": "Implicit assertions are .should() / .and() on a chain — they retry with the query. Explicit assertions are expect(...) from Chai, typically inside .then() or a should(callback) — expect by itself does not retry a cy.get. Cypress ships Chai, Chai-jQuery, and Sinon-Chai. Prefer should for anything that waits on the DOM; use expect for already-resolved values (status codes, parsed JSON, math).",
  "why": "Writing expect($el.text()).to.eq('Pending') inside .then is the classic flake. Writing should('exist') on every line is noise. Interviews want: should retries, expect does not (unless wrapped in should(fn)).",
  "when": "After every command that needs a pass/fail meaning, when asserting API bodies, and when a teammate's Chai-jQuery chain fails to compile in TS.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "Assert the leave table has 3 visible rows labeled Pending, and that a cy.request to /api/health returned { ok: true }.",
    "pass": "DOM: cy.get('tr').should('have.length', 3).and('be.visible'); rows cy.contains('Pending'). Request: .its('body').should('deep.include', { ok: true }) or .then((r) => expect(r.body.ok).to.eq(true)).",
    "fail": "You cy.get('tr').then($tr => expect($tr).to.have.length(3)) as the only wait, or you expect in the it body before visit."
  },
  "tools": [],
  "customSummary": "- Implicit: .should('be.visible') / .and(...) — retries with the previous query.\n- Explicit: expect(value).to.eq(...) — Chai; no retry unless inside .should(fn).\n- Chai-jQuery: have.class, have.attr, contain.text, be.checked, have.length.\n- should('exist') is often redundant after get; prefer user-visible assertions (text, length, enabled).\n- .should(fn) retries; do not nest cy.* inside it. .then + expect does not retry.\n- Playwright expect(locator) retries; Selenium Assert does not wait.",
  "contentMarkdown": "## Implicit vs explicit\n\n**Implicit (Cypress-style):** the assertion is a **command** on the queue.\n\n```ts\ncy.get('[data-cy=status]').should('contain.text', 'Pending');\ncy.get('button[type=submit]').should('be.enabled').and('be.visible');\n```\n\n`.and` is an alias of `.should` for readability.\n\n**Explicit (Chai-style):** you call `expect` on a **value you already have**.\n\n```ts\ncy.request('/api/health').then((resp) => {\n  expect(resp.status).to.eq(200);\n  expect(resp.body).to.deep.include({ ok: true });\n});\n```\n\n`expect` does not know how to re-query the DOM. If the value is still \"Loading\", you fail now.\n\n| | Implicit `.should` | Explicit `expect` |\n|---|---|---|\n| Retries with `cy.get` | Yes | No (unless inside `.should(fn)`) |\n| Reads like Cypress docs | Yes | Yes for HTTP/math |\n| BDD chain | `'have.class', 'x'` | `to.have.class('x')` on jQuery |\n| Typical use | DOM, URL, intercept from chain | Parsed numbers, plain objects in `.then` |\n\n## Chai, Chai-jQuery, Sinon-Chai\n\nCypress bundles:\n\n- **Chai** — `expect(1).to.equal(1)`, `assert`, `should` (the Chai object `should`, which you will rarely use as `foo.should.equal` in Cypress — too easy to confuse with `.should()`)\n- **Chai-jQuery** — assertions that understand jQuery subjects: `have.class`, `have.attr`, `be.visible`, `be.checked`, `have.length`\n- **Sinon-Chai** — `have.been.calledWith` for `cy.stub` / `cy.spy`\n\nStick to **`cy.*.should('assertion', args)`** for DOM. The string names are Chai-jQuery BDD:\n\n```ts\ncy.get('input').should('have.value', 'Ada');\ncy.get('input').should('have.attr', 'aria-invalid', 'true');\ncy.get('.modal').should('not.exist');\ncy.url().should('include', '/leave/');\ncy.title().should('eq', 'Leave — Bizlevate HRM');\ncy.document().its('readyState').should('eq', 'complete');\n```\n\n## Common implicit assertions (HRM cheat sheet)\n\n| Intent | Assertion |\n|---|---|\n| Visible to a user | `'be.visible'` |\n| Gone from DOM | `'not.exist'` |\n| Present (maybe hidden) | `'exist'` |\n| N matches | `'have.length', n` / `'have.length.at.least', 1` |\n| Text | `'contain.text', 'Pending'` / `'have.text', 'Pending'` |\n| Class | `'have.class', 'is-selected'` |\n| Disabled button | `'be.disabled'` |\n| Checkbox | `'be.checked'` |\n| URL | `cy.url().should('include', '/payroll')` |\n\n`have.text` is exact (trimmed per Cypress/jQuery rules); `contain.text` is substring. Prefer `contain` for i18n-ish UI; exact when the copy is a contract.\n\n`'exist'` after `cy.get` is often redundant: `get` already retries until the element exists. Prefer `'be.visible'` or a text assertion so you do not pass on a `display:none` node.\n\n## `.should(callback)` — retrying explicit\n\nWhen Chai-jQuery strings are not enough:\n\n```ts\ncy.get('[data-cy=balance]').should(($el) => {\n  const days = parseInt($el.text(), 10);\n  expect(days).to.be.within(0, 30);\n});\n```\n\nIf `expect` throws, Cypress **retries the `get`**. That is how you retry **computed** values.\n\nRules:\n\n- Throw or fail `expect` to retry\n- **Do not** call `cy.*` inside this function\n- Keep it fast and side-effect free\n\n## `.then` + `expect` — non-retrying explicit\n\n```ts\ncy.get('[data-cy=balance]').invoke('text').then((text) => {\n  const days = parseInt(text, 10);\n  expect(days).to.be.a('number');\n});\n```\n\nSafe **after** you have already `.should('match', /\\d+/)` or equivalent. Otherwise you parse `\"--\"` once and fail.\n\nHTTP:\n\n```ts\ncy.request('GET', '/api/leave').then((res) => {\n  expect(res.status).to.eq(200);\n  expect(res.body).to.be.an('array');\n});\n```\n\nOr stay implicit:\n\n```ts\ncy.request('GET', '/api/leave')\n  .its('status')\n  .should('eq', 200);\n```\n\n`.its` + `.should` retries `.its` access; for `cy.request` the HTTP call is already done, so retry does not re-hit the network. That is OK for asserting a finished response.\n\n## Negative assertions\n\n```ts\ncy.contains('Error').should('not.exist');\n```\n\nNegative assertions are easy to get **too fast**: \"Error\" is not there at t=0, test passes, then an error toast appears. For \"no error after submit\":\n\n```ts\ncy.contains('button', 'Submit').click();\ncy.contains('[data-cy=toast]', 'Saved').should('be.visible');\ncy.contains('[data-cy=toast]', 'Error').should('not.exist');\n```\n\nAssert the **positive** outcome first, then the negative.\n\n## `assert` vs `expect` vs `should`\n\nYou may see `assert.equal(a, b)`. Prefer `expect` in `.then` and `.should('...')` on chains. Avoid Chai's `object.should.equal` — it conflicts mentally with Cypress `.should()`.\n\n## Playwright / Selenium\n\nPlaywright:\n\n```ts\nawait expect(page.getByTestId('status')).toHaveText('Pending');\nexpect(body.ok).toBe(true); // generic, no retry\n```\n\nLocator expects retry; generic `expect` does not. Same split as Cypress should vs expect.\n\nSelenium: `Assert.assertEquals` — never waits. Always wrap with `WebDriverWait` if the DOM is async.\n\n## TS notes\n\nChai-jQuery types come from the Cypress package. If `'be.visible'` errors, your `cypress/tsconfig.json` `types` array is wrong (Part 1.8).\n\nCustom assertion messages:\n\n```ts\ncy.get('tr').should((($rows) => {\n  expect($rows.length, 'leave rows after seed').to.eq(3);\n}) as any); // prefer should('have.length', 3)\n```\n\nKeep it simple: `should('have.length', 3)`.\n\n## HRM combined example\n\n```ts\nit('manager sees three pending leaves', () => {\n  cy.visit('/leave?filter=pending');\n  cy.get('[data-cy=leave-table] tbody tr')\n    .should('have.length', 3)\n    .and('be.visible')\n    .each(($row) => {\n      cy.wrap($row).should('contain.text', 'Pending');\n    });\n});\n```\n\n`each` + `cy.wrap` leads into the next chapter: **`cy.wrap` six uses**.\n## `.and` chains are still one retry unit\n\n```ts\ncy.get('[data-cy=submit]')\n  .should('be.visible')\n  .and('be.enabled')\n  .and('contain.text', 'Submit');\n```\n\nAll three must pass; Cypress retries the command as a bundle. If you need \"visible now, enabled later,\" split into two commands (usually unnecessary).\n\n## `should('not.exist')` vs `should('not.be.visible')`\n\n| Assertion | DOM node |\n|---|---|\n| `not.exist` | No matching node |\n| `not.be.visible` | Node may exist but hidden |\n\nA closed modal might remain in the DOM (`not.be.visible`) or be unmounted (`not.exist`). Assert what the framework does. HRM React often unmounts.\n\n## Multiple subjects and `.should('have.length')`\n\n```ts\ncy.get('[data-cy=chip]').should('have.length', 3);\n```\n\nRetries until 3 chips. `eq(3)` is the 4th element (0-based) and will retry existence of that index — different meaning.\n\n## Asserting the URL after submit\n\n```ts\ncy.contains('button', 'Submit').click();\ncy.location('pathname').should('match', /\\/leave\\/lv_/);\ncy.contains('[data-cy=toast]', 'submitted').should('be.visible');\n```\n\n`cy.url()` returns the full URL string. `cy.hash()`, `cy.location('search')` are siblings. All retry.\n\n## Chai `deep.equal` vs `deep.include`\n\n```ts\nexpect(body).to.deep.equal({ ok: true });       // exact keys\nexpect(body).to.deep.include({ ok: true });     // subset\ncy.wrap(body).should('deep.include', { ok: true });\n```\n\nAPI bodies grow fields; `include` is kinder. Snapshots of entire payloads flake.\n\n## Interview drill\n\nShould vs expect — which retries? Show a should(fn). Why is expect in `.then` flaky for DOM? Name three Chai-jQuery assertions you use on a button.\n## Table: pick the assertion\n\n| You want to know | Write |\n|---|---|\n| Button can be pressed | `.should('be.enabled').and('be.visible')` |\n| Table finished loading | `.should('have.length', n)` or intercept wait + length |\n| Copy contract | `.should('contain.text', 'Pending')` |\n| Attribute | `.should('have.attr', 'href', '/leave/new')` |\n| HTTP status | `.its('status').should('eq', 200)` or `expect(res.status).to.eq(200)` in then |\n| Parsed number | `.should(($el) => { expect(parseInt($el.text(), 10)).to.be.gt(0); })` |\n\n## `assert` from Chai\n\n```ts\ncy.get('tr').then(($tr) => {\n  assert.isAbove($tr.length, 0);\n});\n```\n\nStill non-retrying. Team style: `should` on DOM, `expect` in then for HTTP. Skip `assert` unless you like it.\n\n## Sinon-Chai (preview)\n\n```ts\ncy.window().then((win) => {\n  cy.stub(win.console, 'error').as('consoleError');\n});\ncy.visit('/leave');\ncy.get('@consoleError').should('not.have.been.called');\n```\n\n`have.been.called` is Sinon-Chai. The stub alias is a **data/sinon** alias, not DOM. Part 7 covers stubs; know assertions exist.\n\n## Soft vs hard\n\nCypress does not have Playwright's `expect.soft`. One failed `should` stops the test. That is OK. Do not wrap everything in try/catch.\n\n## Interview closer\n\n\"Implicit `should` retries with the query. Explicit `expect` does not, unless I put it in `should(fn)`. I never `expect` in the `it` body before the queue runs.\"\n## `should('have.value')` vs `invoke('val')`\n\n```ts\ncy.get('#email').should('have.value', 'ada@bizlevate.test');\n```\n\nRetries until the input shows that value (useful after autofill). `invoke('val').then(expect)` does not retry. Same lesson, form fields edition.\n\n## `include` vs `eq` on URLs\n\n```ts\ncy.url().should('include', '/leave/');     // extra query string OK\ncy.location('pathname').should('eq', '/leave/new'); // exact path\n```\n\nHRM often adds `?tab=`. `include` on full URL still works; `pathname` + `eq` is stricter.\n\n## Chai `throw`\n\n```ts\nexpect(() => JSON.parse('nope')).to.throw();\n```\n\nExplicit, no retry, no DOM. Fine in `.then` after `cy.readFile`.\n## `and('have.focus')` after type\n\n```ts\ncy.get('#email').type('ada@bizlevate.test').should('have.value', 'ada@bizlevate.test');\n```\n\nValue assertion retries until typing finished and React re-rendered. `expect(el.val())` in a `then` right after `type` can still see the previous value. Implicit wins on form fields.\n\n## `not.be.disabled` vs `be.enabled`\n\nPrefer `'be.enabled'` for controls. Some elements are not disabled but also not enabled in the Chai-jQuery sense (non-form nodes). Assert on `button`/`input`.\n\n## Deep equal flake\n\n```ts\ncy.request('/api/leave/lv_1').its('body').should('deep.equal', entireSnapshot);\n```\n\nThe API adds `updatedAt`. Use `deep.include` for the fields you own (`status`, `employeeId`) or `expect(body.status).to.eq('PENDING')` in then after the request finished (HTTP does not need retry).\n## `should('match', regex)` on invoke text\n\n```ts\ncy.get('[data-cy=balance]').invoke('text').should('match', /\\d+\\s*days/i);\n```\n\nRetries until the text matches. Equivalent to `should(($el) => expect($el.text()).to.match(...))` with less code. Prefer this over `then` + `expect`.\n## Chai-jQuery `contain` vs `include` vs `have.text`\n\n```ts\ncy.get('[data-cy=status]').should('contain', 'Pending');      // substring, DOM text\ncy.get('[data-cy=status]').should('include.text', 'Pending'); // similar\ncy.get('[data-cy=status]').should('have.text', 'Pending');    // exact\n```\n\n`contain`/`include.text` retry until the substring appears (loading skeleton → Pending). `have.text` retries until exact equality — extra whitespace fails. Start with `contain.text` for HRM chips.\n\n## `expect` in phase 1 is always wrong for the DOM\n\n```ts\nit('wrong', () => {\n  expect(Cypress.$('h1').text()).to.eq('Sign in'); // page not visited yet\n});\n```\n\nPhase 1 runs before `visit`. Explicit assertions belong **inside** `.then` after a command, or better, be rewritten as implicit `should`.\n\n\n## Default Chai `equal` vs `eq`\n\n`.should('eq', 200)` and `.should('equal', 200)` are Chai aliases. Cypress docs use `eq` heavily. `eql` is deep equality for objects — prefer `deep.equal` / `deep.include` by name so readers know it is deep.\n\n## Retry budget\n\nEvery implicit assertion spends up to `defaultCommandTimeout`. A spec with twenty `should('exist')` lines can still be fast when they pass on the first try. They get expensive when selectors are wrong. Unique `data-cy` plus one strong assertion beats five weak ones that each retry 4s on failure.\n",
  "blocks": [
    {
      "id": "cy-2-6-md-0",
      "type": "overview",
      "heading": "Implicit vs explicit",
      "content": "**Implicit (Cypress-style):** the assertion is a **command** on the queue.\n\n```ts\ncy.get('[data-cy=status]').should('contain.text', 'Pending');\ncy.get('button[type=submit]').should('be.enabled').and('be.visible');\n```\n\n`.and` is an alias of `.should` for readability.\n\n**Explicit (Chai-style):** you call `expect` on a **value you already have**.\n\n```ts\ncy.request('/api/health').then((resp) => {\n  expect(resp.status).to.eq(200);\n  expect(resp.body).to.deep.include({ ok: true });\n});\n```\n\n`expect` does not know how to re-query the DOM. If the value is still \"Loading\", you fail now.\n\n| | Implicit `.should` | Explicit `expect` |\n|---|---|---|\n| Retries with `cy.get` | Yes | No (unless inside `.should(fn)`) |\n| Reads like Cypress docs | Yes | Yes for HTTP/math |\n| BDD chain | `'have.class', 'x'` | `to.have.class('x')` on jQuery |\n| Typical use | DOM, URL, intercept from chain | Parsed numbers, plain objects in `.then` |",
      "order": 0
    },
    {
      "id": "cy-2-6-md-1",
      "type": "overview",
      "heading": "Chai, Chai-jQuery, Sinon-Chai",
      "content": "Cypress bundles:\n\n- **Chai** — `expect(1).to.equal(1)`, `assert`, `should` (the Chai object `should`, which you will rarely use as `foo.should.equal` in Cypress — too easy to confuse with `.should()`)\n- **Chai-jQuery** — assertions that understand jQuery subjects: `have.class`, `have.attr`, `be.visible`, `be.checked`, `have.length`\n- **Sinon-Chai** — `have.been.calledWith` for `cy.stub` / `cy.spy`\n\nStick to **`cy.*.should('assertion', args)`** for DOM. The string names are Chai-jQuery BDD:\n\n```ts\ncy.get('input').should('have.value', 'Ada');\ncy.get('input').should('have.attr', 'aria-invalid', 'true');\ncy.get('.modal').should('not.exist');\ncy.url().should('include', '/leave/');\ncy.title().should('eq', 'Leave — Bizlevate HRM');\ncy.document().its('readyState').should('eq', 'complete');\n```",
      "order": 1
    },
    {
      "id": "cy-2-6-md-2",
      "type": "overview",
      "heading": "Common implicit assertions (HRM cheat sheet)",
      "content": "| Intent | Assertion |\n|---|---|\n| Visible to a user | `'be.visible'` |\n| Gone from DOM | `'not.exist'` |\n| Present (maybe hidden) | `'exist'` |\n| N matches | `'have.length', n` / `'have.length.at.least', 1` |\n| Text | `'contain.text', 'Pending'` / `'have.text', 'Pending'` |\n| Class | `'have.class', 'is-selected'` |\n| Disabled button | `'be.disabled'` |\n| Checkbox | `'be.checked'` |\n| URL | `cy.url().should('include', '/payroll')` |\n\n`have.text` is exact (trimmed per Cypress/jQuery rules); `contain.text` is substring. Prefer `contain` for i18n-ish UI; exact when the copy is a contract.\n\n`'exist'` after `cy.get` is often redundant: `get` already retries until the element exists. Prefer `'be.visible'` or a text assertion so you do not pass on a `display:none` node.",
      "order": 2
    },
    {
      "id": "cy-2-6-md-3",
      "type": "overview",
      "heading": "`.should(callback)` — retrying explicit",
      "content": "When Chai-jQuery strings are not enough:\n\n```ts\ncy.get('[data-cy=balance]').should(($el) => {\n  const days = parseInt($el.text(), 10);\n  expect(days).to.be.within(0, 30);\n});\n```\n\nIf `expect` throws, Cypress **retries the `get`**. That is how you retry **computed** values.\n\nRules:\n\n- Throw or fail `expect` to retry\n- **Do not** call `cy.*` inside this function\n- Keep it fast and side-effect free",
      "order": 3
    },
    {
      "id": "cy-2-6-md-4",
      "type": "overview",
      "heading": "`.then` + `expect` — non-retrying explicit",
      "content": "```ts\ncy.get('[data-cy=balance]').invoke('text').then((text) => {\n  const days = parseInt(text, 10);\n  expect(days).to.be.a('number');\n});\n```\n\nSafe **after** you have already `.should('match', /\\d+/)` or equivalent. Otherwise you parse `\"--\"` once and fail.\n\nHTTP:\n\n```ts\ncy.request('GET', '/api/leave').then((res) => {\n  expect(res.status).to.eq(200);\n  expect(res.body).to.be.an('array');\n});\n```\n\nOr stay implicit:\n\n```ts\ncy.request('GET', '/api/leave')\n  .its('status')\n  .should('eq', 200);\n```\n\n`.its` + `.should` retries `.its` access; for `cy.request` the HTTP call is already done, so retry does not re-hit the network. That is OK for asserting a finished response.",
      "order": 4
    },
    {
      "id": "cy-2-6-md-5",
      "type": "overview",
      "heading": "Negative assertions",
      "content": "```ts\ncy.contains('Error').should('not.exist');\n```\n\nNegative assertions are easy to get **too fast**: \"Error\" is not there at t=0, test passes, then an error toast appears. For \"no error after submit\":\n\n```ts\ncy.contains('button', 'Submit').click();\ncy.contains('[data-cy=toast]', 'Saved').should('be.visible');\ncy.contains('[data-cy=toast]', 'Error').should('not.exist');\n```\n\nAssert the **positive** outcome first, then the negative.",
      "order": 5
    },
    {
      "id": "cy-2-6-md-6",
      "type": "overview",
      "heading": "`assert` vs `expect` vs `should`",
      "content": "You may see `assert.equal(a, b)`. Prefer `expect` in `.then` and `.should('...')` on chains. Avoid Chai's `object.should.equal` — it conflicts mentally with Cypress `.should()`.",
      "order": 6
    },
    {
      "id": "cy-2-6-md-7",
      "type": "overview",
      "heading": "Playwright / Selenium",
      "content": "Playwright:\n\n```ts\nawait expect(page.getByTestId('status')).toHaveText('Pending');\nexpect(body.ok).toBe(true); // generic, no retry\n```\n\nLocator expects retry; generic `expect` does not. Same split as Cypress should vs expect.\n\nSelenium: `Assert.assertEquals` — never waits. Always wrap with `WebDriverWait` if the DOM is async.",
      "order": 7
    },
    {
      "id": "cy-2-6-md-8",
      "type": "overview",
      "heading": "TS notes",
      "content": "Chai-jQuery types come from the Cypress package. If `'be.visible'` errors, your `cypress/tsconfig.json` `types` array is wrong (Part 1.8).\n\nCustom assertion messages:\n\n```ts\ncy.get('tr').should((($rows) => {\n  expect($rows.length, 'leave rows after seed').to.eq(3);\n}) as any); // prefer should('have.length', 3)\n```\n\nKeep it simple: `should('have.length', 3)`.",
      "order": 8
    },
    {
      "id": "cy-2-6-md-9",
      "type": "overview",
      "heading": "HRM combined example",
      "content": "```ts\nit('manager sees three pending leaves', () => {\n  cy.visit('/leave?filter=pending');\n  cy.get('[data-cy=leave-table] tbody tr')\n    .should('have.length', 3)\n    .and('be.visible')\n    .each(($row) => {\n      cy.wrap($row).should('contain.text', 'Pending');\n    });\n});\n```\n\n`each` + `cy.wrap` leads into the next chapter: **`cy.wrap` six uses**.",
      "order": 9
    },
    {
      "id": "cy-2-6-md-10",
      "type": "overview",
      "heading": "`.and` chains are still one retry unit",
      "content": "```ts\ncy.get('[data-cy=submit]')\n  .should('be.visible')\n  .and('be.enabled')\n  .and('contain.text', 'Submit');\n```\n\nAll three must pass; Cypress retries the command as a bundle. If you need \"visible now, enabled later,\" split into two commands (usually unnecessary).",
      "order": 10
    },
    {
      "id": "cy-2-6-md-11",
      "type": "overview",
      "heading": "`should('not.exist')` vs `should('not.be.visible')`",
      "content": "| Assertion | DOM node |\n|---|---|\n| `not.exist` | No matching node |\n| `not.be.visible` | Node may exist but hidden |\n\nA closed modal might remain in the DOM (`not.be.visible`) or be unmounted (`not.exist`). Assert what the framework does. HRM React often unmounts.",
      "order": 11
    },
    {
      "id": "cy-2-6-md-12",
      "type": "overview",
      "heading": "Multiple subjects and `.should('have.length')`",
      "content": "```ts\ncy.get('[data-cy=chip]').should('have.length', 3);\n```\n\nRetries until 3 chips. `eq(3)` is the 4th element (0-based) and will retry existence of that index — different meaning.",
      "order": 12
    },
    {
      "id": "cy-2-6-md-13",
      "type": "overview",
      "heading": "Asserting the URL after submit",
      "content": "```ts\ncy.contains('button', 'Submit').click();\ncy.location('pathname').should('match', /\\/leave\\/lv_/);\ncy.contains('[data-cy=toast]', 'submitted').should('be.visible');\n```\n\n`cy.url()` returns the full URL string. `cy.hash()`, `cy.location('search')` are siblings. All retry.",
      "order": 13
    },
    {
      "id": "cy-2-6-md-14",
      "type": "overview",
      "heading": "Chai `deep.equal` vs `deep.include`",
      "content": "```ts\nexpect(body).to.deep.equal({ ok: true });       // exact keys\nexpect(body).to.deep.include({ ok: true });     // subset\ncy.wrap(body).should('deep.include', { ok: true });\n```\n\nAPI bodies grow fields; `include` is kinder. Snapshots of entire payloads flake.",
      "order": 14
    },
    {
      "id": "cy-2-6-md-15",
      "type": "overview",
      "heading": "Interview drill",
      "content": "Should vs expect — which retries? Show a should(fn). Why is expect in `.then` flaky for DOM? Name three Chai-jQuery assertions you use on a button.",
      "order": 15
    },
    {
      "id": "cy-2-6-md-16",
      "type": "overview",
      "heading": "Table: pick the assertion",
      "content": "| You want to know | Write |\n|---|---|\n| Button can be pressed | `.should('be.enabled').and('be.visible')` |\n| Table finished loading | `.should('have.length', n)` or intercept wait + length |\n| Copy contract | `.should('contain.text', 'Pending')` |\n| Attribute | `.should('have.attr', 'href', '/leave/new')` |\n| HTTP status | `.its('status').should('eq', 200)` or `expect(res.status).to.eq(200)` in then |\n| Parsed number | `.should(($el) => { expect(parseInt($el.text(), 10)).to.be.gt(0); })` |",
      "order": 16
    },
    {
      "id": "cy-2-6-md-17",
      "type": "overview",
      "heading": "`assert` from Chai",
      "content": "```ts\ncy.get('tr').then(($tr) => {\n  assert.isAbove($tr.length, 0);\n});\n```\n\nStill non-retrying. Team style: `should` on DOM, `expect` in then for HTTP. Skip `assert` unless you like it.",
      "order": 17
    },
    {
      "id": "cy-2-6-md-18",
      "type": "overview",
      "heading": "Sinon-Chai (preview)",
      "content": "```ts\ncy.window().then((win) => {\n  cy.stub(win.console, 'error').as('consoleError');\n});\ncy.visit('/leave');\ncy.get('@consoleError').should('not.have.been.called');\n```\n\n`have.been.called` is Sinon-Chai. The stub alias is a **data/sinon** alias, not DOM. Part 7 covers stubs; know assertions exist.",
      "order": 18
    },
    {
      "id": "cy-2-6-md-19",
      "type": "overview",
      "heading": "Soft vs hard",
      "content": "Cypress does not have Playwright's `expect.soft`. One failed `should` stops the test. That is OK. Do not wrap everything in try/catch.",
      "order": 19
    },
    {
      "id": "cy-2-6-md-20",
      "type": "overview",
      "heading": "Interview closer",
      "content": "\"Implicit `should` retries with the query. Explicit `expect` does not, unless I put it in `should(fn)`. I never `expect` in the `it` body before the queue runs.\"",
      "order": 20
    },
    {
      "id": "cy-2-6-md-21",
      "type": "overview",
      "heading": "`should('have.value')` vs `invoke('val')`",
      "content": "```ts\ncy.get('#email').should('have.value', 'ada@bizlevate.test');\n```\n\nRetries until the input shows that value (useful after autofill). `invoke('val').then(expect)` does not retry. Same lesson, form fields edition.",
      "order": 21
    },
    {
      "id": "cy-2-6-md-22",
      "type": "overview",
      "heading": "`include` vs `eq` on URLs",
      "content": "```ts\ncy.url().should('include', '/leave/');     // extra query string OK\ncy.location('pathname').should('eq', '/leave/new'); // exact path\n```\n\nHRM often adds `?tab=`. `include` on full URL still works; `pathname` + `eq` is stricter.",
      "order": 22
    },
    {
      "id": "cy-2-6-md-23",
      "type": "overview",
      "heading": "Chai `throw`",
      "content": "```ts\nexpect(() => JSON.parse('nope')).to.throw();\n```\n\nExplicit, no retry, no DOM. Fine in `.then` after `cy.readFile`.",
      "order": 23
    },
    {
      "id": "cy-2-6-md-24",
      "type": "overview",
      "heading": "`and('have.focus')` after type",
      "content": "```ts\ncy.get('#email').type('ada@bizlevate.test').should('have.value', 'ada@bizlevate.test');\n```\n\nValue assertion retries until typing finished and React re-rendered. `expect(el.val())` in a `then` right after `type` can still see the previous value. Implicit wins on form fields.",
      "order": 24
    },
    {
      "id": "cy-2-6-md-25",
      "type": "overview",
      "heading": "`not.be.disabled` vs `be.enabled`",
      "content": "Prefer `'be.enabled'` for controls. Some elements are not disabled but also not enabled in the Chai-jQuery sense (non-form nodes). Assert on `button`/`input`.",
      "order": 25
    },
    {
      "id": "cy-2-6-md-26",
      "type": "overview",
      "heading": "Deep equal flake",
      "content": "```ts\ncy.request('/api/leave/lv_1').its('body').should('deep.equal', entireSnapshot);\n```\n\nThe API adds `updatedAt`. Use `deep.include` for the fields you own (`status`, `employeeId`) or `expect(body.status).to.eq('PENDING')` in then after the request finished (HTTP does not need retry).",
      "order": 26
    },
    {
      "id": "cy-2-6-md-27",
      "type": "overview",
      "heading": "`should('match', regex)` on invoke text",
      "content": "```ts\ncy.get('[data-cy=balance]').invoke('text').should('match', /\\d+\\s*days/i);\n```\n\nRetries until the text matches. Equivalent to `should(($el) => expect($el.text()).to.match(...))` with less code. Prefer this over `then` + `expect`.",
      "order": 27
    },
    {
      "id": "cy-2-6-md-28",
      "type": "overview",
      "heading": "Chai-jQuery `contain` vs `include` vs `have.text`",
      "content": "```ts\ncy.get('[data-cy=status]').should('contain', 'Pending');      // substring, DOM text\ncy.get('[data-cy=status]').should('include.text', 'Pending'); // similar\ncy.get('[data-cy=status]').should('have.text', 'Pending');    // exact\n```\n\n`contain`/`include.text` retry until the substring appears (loading skeleton → Pending). `have.text` retries until exact equality — extra whitespace fails. Start with `contain.text` for HRM chips.",
      "order": 28
    },
    {
      "id": "cy-2-6-md-29",
      "type": "overview",
      "heading": "`expect` in phase 1 is always wrong for the DOM",
      "content": "```ts\nit('wrong', () => {\n  expect(Cypress.$('h1').text()).to.eq('Sign in'); // page not visited yet\n});\n```\n\nPhase 1 runs before `visit`. Explicit assertions belong **inside** `.then` after a command, or better, be rewritten as implicit `should`.",
      "order": 29
    },
    {
      "id": "cy-2-6-md-30",
      "type": "overview",
      "heading": "Default Chai `equal` vs `eq`",
      "content": "`.should('eq', 200)` and `.should('equal', 200)` are Chai aliases. Cypress docs use `eq` heavily. `eql` is deep equality for objects — prefer `deep.equal` / `deep.include` by name so readers know it is deep.",
      "order": 30
    },
    {
      "id": "cy-2-6-md-31",
      "type": "overview",
      "heading": "Retry budget",
      "content": "Every implicit assertion spends up to `defaultCommandTimeout`. A spec with twenty `should('exist')` lines can still be fast when they pass on the first try. They get expensive when selectors are wrong. Unique `data-cy` plus one strong assertion beats five weak ones that each retry 4s on failure.",
      "order": 31
    }
  ],
  "advantages": [
    "2.6 Assertions — implicit vs explicit — Writing expect($el."
  ],
  "limitations": [
    "2.6 Assertions — implicit vs explicit is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
