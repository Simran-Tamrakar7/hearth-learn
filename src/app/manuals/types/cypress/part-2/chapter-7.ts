import type { ChapterRecord } from "../../../types";

/** 2.7 cy.wrap() */
export const chapter = {
  "id": "cy-2-7-cy-wrap",
  "title": "2.7 cy.wrap()",
  "minutes": 26,
  "level": "beginner",
  "phase": "Part 2 · Core Syntax & Commands",
  "partName": "Part 2 · Core Syntax & Commands",
  "overviewText": "cy.wrap(value) puts an arbitrary value onto the Cypress command queue so you can .should, .its, .then, or alias it. The six uses you must be able to list: wrap a primitive, wrap a plain object, wrap a Promise, wrap jQuery/DOM nodes (especially in .each), yield a value from a custom command, and re-wrap inside .then so a following .should can retry. wrap is not a query — it does not find elements in the document by selector.",
  "why": "Without wrap, .each, custom commands, and Promise interop fall off the queue. With wrap misused, people think wrap('#id') queries the DOM (it does not). Interviews often ask for several wrap use cases, not just one.",
  "when": "Inside .each, when asserting a leftover JS value, when a plugin returns a Promise, when writing Commands.add that must yield, and when bridging .then to a retrying .should.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "For each leave row, assert status text; plus assert a computed remaining-days number; plus wrap a Promise from a small helper that reads Cypress.env.",
    "pass": "You cy.get('tr').each(($row) => { cy.wrap($row).find('[data-cy=status]').should('be.visible'); }); you wrap primitives/objects/promises; you do not cy.wrap('[data-cy=status]') expecting a query.",
    "fail": "You cy.wrap('tbody tr') hoping it acts like cy.get, or you skip wrap in each and call $row.find as if Cypress would retry it."
  },
  "tools": [],
  "customSummary": "- cy.wrap(x) yields x on the queue — it is not cy.get(x).\n- Six uses: (1) primitive for should/expect, (2) plain object + its/should, (3) Promise so Cypress waits, (4) jQuery/DOM in .each or callbacks, (5) yield from custom commands, (6) re-wrap in .then to continue a retrying should.\n- Wrapped DOM/jQuery + should can retry commands on that subject; wrapped snapshots may not re-query the live document — prefer cy.get for page elements.\n- Return null from tasks; wrap in the browser for Chainable APIs.\n- Playwright does not need wrap — you already hold values with await. Selenium neither.",
  "contentMarkdown": "## What `wrap` is\n\n```ts\ncy.wrap('Pending').should('eq', 'Pending');\ncy.wrap({ days: 12 }).its('days').should('eq', 12);\n```\n\n`cy.wrap` takes a JavaScript value and makes it the **current subject**. The next chained command receives that subject. It does **not** interpret a string as a CSS selector:\n\n```ts\ncy.wrap('[data-cy=status]');        // subject is a string\ncy.get('[data-cy=status]');         // subject is a DOM element\n```\n\nThat distinction is the first trap.\n\n## Six uses (memorize)\n\n### 1. Wrap a primitive — assert a value on the queue\n\n```ts\nconst remaining = 12; // e.g. computed in a then, or a constant\ncy.wrap(remaining).should('be.gt', 0).and('be.lte', 30);\n```\n\nWhy not `expect(remaining).to.be.gt(0)`? You can — that is explicit and fine for a **already final** number. `wrap` is useful when you want the assertion **in the Command Log** as its own step, or to chain `.should` after other commands.\n\n```ts\ncy.get('[data-cy=balance]')\n  .invoke('text')\n  .then((text) => parseInt(text, 10))\n  .should('be.within', 0, 30); // invoke yields the text; parse in then + wrap if needed\n```\n\nIf you parse in `.then` and want retry, parse inside `.should(fn)` instead (2.6). Wrap shines when the primitive is **done**.\n\n### 2. Wrap a plain object — `.its` / nested `should`\n\n```ts\nconst payload = { user: { email: 'ada@bizlevate.test', role: 'employee' } };\ncy.wrap(payload).its('user.email').should('include', '@bizlevate.test');\ncy.wrap(payload).should('have.nested.property', 'user.role', 'employee');\n```\n\nUseful after `JSON.parse`, after picking fields off a `cy.request` body, or after a task (already serialized) to keep asserting in Cypress style.\n\n```ts\ncy.request('/api/me').its('body').then((body) => {\n  cy.wrap(body).should('deep.include', { role: 'manager' });\n});\n```\n\n(`its('body').should('deep.include', ...)` also works without wrap.)\n\n### 3. Wrap a Promise — Cypress waits for it\n\n```ts\nfunction loadToken(): Promise<string> {\n  return Promise.resolve(Cypress.env('adminPassword') as string);\n}\n\ncy.wrap(loadToken()).then((token) => {\n  expect(token).to.be.a('string');\n});\n```\n\nCypress unwraps thenable subjects: the queue waits for resolution, then yields the resolved value. Prefer this over mixing `async/await` in `it`.\n\nDo not wrap a Cypress Chainable (`cy.wrap(cy.get('.x'))`) — you already have a chain.\n\nNode-side work still belongs in `cy.task` (serializable). Wrap Promises that exist **in the browser** (WebCrypto, a small helper).\n\n### 4. Wrap jQuery / DOM — `.each`, event callbacks, non-Cypress queries\n\n```ts\ncy.get('tbody tr').each(($row, index) => {\n  cy.wrap($row).find('[data-cy=status]').should('not.be.empty');\n  cy.wrap($row).find('[data-cy=open]').should('be.visible');\n});\n```\n\n`$row` is a jQuery object. jQuery's `$row.find` is **not** retryable. `cy.wrap($row).find(...)` puts it back on the queue so `.find` / `.should` behave like Cypress commands.\n\nOther times you hold a node:\n\n```ts\ncy.get('[data-cy=leave-form]').then(($form) => {\n  const submit = $form.find('button[type=submit]');\n  cy.wrap(submit).click();\n});\n```\n\nPrefer `cy.get('[data-cy=leave-form]').find('button[type=submit]').click()` when you can — fewer snapshots. Wrap is the escape hatch when you already have `$form`.\n\n### 5. Yield from a custom command\n\n```ts\nCypress.Commands.add('getLeaveRows', () => {\n  cy.get('[data-cy=leave-table] tbody tr');\n});\n\nCypress.Commands.add('todayIso', () => {\n  const iso = new Date().toISOString().slice(0, 10);\n  return cy.wrap(iso); // yield a string as the subject\n});\n```\n\n```ts\ncy.todayIso().then((iso) => {\n  cy.get('[name=startDate]').type(iso);\n});\n```\n\nIf a custom command computes a plain value and you `return iso`, Cypress may not put it on the chain. **`return cy.wrap(value)`** (or `cy.wrap(value)` as the last command) is the documented yield.\n\nFor commands that should yield a DOM element, end with `cy.get(...)` — that already yields. Wrap when the yield is **not** from a Cypress query.\n\n### 6. Re-wrap inside `.then` so a following `.should` can retry\n\n`.then` does not retry (2.4). Sometimes you drop off the chain with JS, then want Cypress assertions again:\n\n```ts\ncy.get('[data-cy=ids]').invoke('text').then((text) => {\n  const ids = text.split(',').map((s) => s.trim());\n  cy.wrap(ids).should('have.length', 3).its('0').should('match', /^lv_/);\n});\n```\n\nAnother variant — keep retrying a **function** by wrapping a getter (advanced; easy to abuse):\n\n```ts\ncy.wrap(null).should(() => {\n  expect(localStorage.getItem('hrm.flash')).to.eq('saved');\n});\n```\n\nThis retries the `should` fn until `expect` passes or timeout — a known pattern for non-DOM conditions. Prefer intercepts / UI text when possible. Named here because it is still **wrap + should**.\n\n## What wrap is not\n\n| Temptation | Do this instead |\n|---|---|\n| `cy.wrap('#email')` as query | `cy.get('#email')` |\n| Wrap to \"make await work\" | Do not await; chain |\n| Wrap a task result that is already the subject of `cy.task` | `cy.task('seed').its('id')` |\n| Wrap to retry a stale detached node | `cy.get` again |\n\n## Actionability and wrapped DOM\n\n`cy.wrap($button).click()` still checks actionability if `$button` is attached. If the app re-rendered and `$button` is detached, click fails. **Re-query with `cy.get`.** Wrap in `.each` is safe when you wrap the current iteration's element and act immediately.\n\n## Playwright / Selenium\n\nPlaywright: `const n = await locator.count(); expect(n).toBe(3)` — values are already in hand. No wrap.\n\nSelenium: you hold `WebElement` and `Assert`. No queue, no wrap.\n\n`cy.wrap` exists because Cypress **hid the values inside a queue**. It is the on-ramp back onto that queue.\n\n## Six-use flashcard (say it out loud)\n\n1. **Primitive** — `cy.wrap(12).should('eq', 12)`\n2. **Object** — `cy.wrap(obj).its('role').should('eq', 'manager')`\n3. **Promise** — `cy.wrap(promise).then(...)` waits\n4. **jQuery/DOM** — `each(($el) => { cy.wrap($el).click() })`\n5. **Custom command yield** — `return cy.wrap(value)`\n6. **After `.then` JS** — wrap computed arrays/objects for `.should` / `.its`\n\n## Tiny HRM spec\n\n```ts\nit('every row is pending and ids look like lv_*', () => {\n  cy.visit('/leave?filter=pending');\n  cy.get('[data-cy=leave-table] tbody tr').should('have.length.at.least', 1);\n  cy.get('[data-cy=leave-table] tbody tr').each(($row) => {\n    cy.wrap($row).should('contain.text', 'Pending');\n    cy.wrap($row)\n      .find('[data-cy=leave-id]')\n      .invoke('text')\n      .then((id) => {\n        cy.wrap(id.trim()).should('match', /^lv_/);\n      });\n  });\n});\n```\n\nUses 4 and 6 in one test; 1–3 and 5 show up as soon as you add helpers and tasks.\n\nPart 2 complete: structure, queries, queue, retry, aliases, assertions, wrap. Part 3 will build on these without re-explaining `await`.\n## Six uses, six HRM one-liners\n\n```ts\n// 1 primitive\ncy.wrap(18).should('be.a', 'number');\n\n// 2 object\ncy.wrap({ role: 'manager' }).its('role').should('eq', 'manager');\n\n// 3 Promise\ncy.wrap(Promise.resolve('ok')).should('eq', 'ok');\n\n// 4 jQuery in each\ncy.get('tr').each(($r) => { cy.wrap($r).should('be.visible'); });\n\n// 5 custom command yield\nCypress.Commands.add('isoToday', () => cy.wrap('2026-09-16'));\n\n// 6 after then\ncy.get('[data-cy=tags]').invoke('text').then((t) => {\n  cy.wrap(t.split(',')).should('include', 'pending');\n});\n```\n\nIf you can write those six from memory, you pass the wrap question.\n\n## `wrap` and logging\n\nWrapped objects appear in the Command Log. Do not wrap huge fixture arrays if you only need `.its('0.email')` — log noise. Prefer `cy.fixture().its('0.email')`.\n\n## `null` vs wrap\n\n`cy.wrap(null)` is valid (subject null). Tasks return `null` in Node; in the browser you wrap values you want to assert. Do not `cy.wrap(undefined)` as a substitute for skipping — skip with `this.skip()` instead.\n\n## When wrap + should retries a function (use 6, variant)\n\n```ts\ncy.wrap({}).should(() => {\n  expect(window.localStorage.getItem('flash')).to.eq('saved');\n});\n```\n\nRetries until localStorage matches. Prefer asserting a toast in the DOM. This pattern is for values Cypress does not query by default.\n\n## Interview drill\n\n\"List six uses of `cy.wrap`.\" Primitive, object, Promise, jQuery/DOM, custom-command yield, re-enter the queue after `.then`. \"Does `cy.wrap('#id')` find an element?\" No.\n\n## Part 2 close\n\nYou can structure suites, query the DOM, explain the queue, wait via assertions, name aliases, pick should vs expect, and put values back on the chain with wrap. Stop using `await cy` and `cy.wait(ms)` as your default tools.\n## Wrap vs get vs contains (selector confusion)\n\n```ts\ncy.wrap('Submit');                 // subject is the string \"Submit\"\ncy.contains('Submit');             // subject is a DOM node\ncy.wrap(Cypress.$('button'));      // jQuery now, no initial retry to find it\ncy.get('button');                  // retries until found\n```\n\n`Cypress.$` + wrap is a smell for finding elements. Use `get`.\n\n## Custom command anti-pattern\n\n```ts\nCypress.Commands.add('badToday', () => {\n  return new Date().toISOString().slice(0, 10); // not on the queue\n});\n```\n\n```ts\nCypress.Commands.add('goodToday', () => {\n  cy.wrap(new Date().toISOString().slice(0, 10));\n});\n```\n\nUse 5.\n\n## Wrapping `undefined`\n\n`cy.wrap(undefined)` yields undefined; following `.should('eq', 1)` fails. Tasks cannot return undefined; wrap can wrap it. Still prefer not to.\n\n## Performance\n\nWrapping giant DOM trees in `.each` is normal. Wrapping 10,000-row JSON and `should('deep.equal')` is slow and a bad assertion. Slice first.\n\n## Recite-and-write exercise\n\nClose the notes. Write a spec that: wraps `3`, wraps `{ n: 3 }.its('n')`, wraps `Promise.resolve(3)`, wraps each `tr`, adds `cy.three()` that yields 3 via wrap, parses ids in `.then` and wraps the array. That is the chapter.\n## Wrap a list for `.each`\n\n```ts\ncy.wrap(['Ada', 'Grace']).each((name) => {\n  cy.contains('tr', name as string).should('be.visible');\n});\n```\n\nHere wrap's subject is an array; `.each` iterates. That is use 2 + 4 adjacent. You could `forEach` and enqueue `contains` instead (2.3). Both are valid.\n\n## Do not wrap Chainables\n\n```ts\ncy.wrap(cy.get('tr')); // confusing, unsupported as a pattern\n```\n\nJust `cy.get('tr')`.\n\n## `its` after wrap\n\n```ts\ncy.wrap({ user: { email: 'a@b.c' } }).its('user.email').should('eq', 'a@b.c');\n```\n\n`its` retries property access on objects that might get filled later (rare for wrap of a fresh literal; useful for wrapped refs). For literals, it still documents the path in the log.\n## Wrap + alias (kinds meet)\n\n```ts\ncy.wrap({ email: 'ada@bizlevate.test' }).as('actor');\ncy.get('@actor').its('email').then((email) => cy.login(email));\n```\n\nThat is wrap use 2 plus a **data** alias. DOM aliases still start with `cy.get(selector).as`.\n\n## Wrap file contents\n\n```ts\ncy.readFile('cypress/fixtures/employees.json').then((data) => {\n  cy.wrap(data).should('be.an', 'array').its('length').should('be.gt', 0);\n});\n```\n\n`readFile` already yields the parsed JSON; wrap is optional. Shown so you see wrap is about **queue membership**, not about reading files.\n## Wrap `Cypress.$(...)` is a snapshot\n\n```ts\ncy.get('body').then(() => {\n  cy.wrap(Cypress.$('[data-cy=leave-table] tr')).should('have.length', 3);\n});\n```\n\n`Cypress.$` is now. If length is 0, `should` may retry **on the same empty jQuery object** and never see new rows. Use `cy.get('[data-cy=leave-table] tr').should('have.length', 3)` instead. Wrap use 4 is for elements you **already** have from a Cypress query (`each`), not for a second query engine.\n",
  "blocks": [
    {
      "id": "cy-2-7-md-0",
      "type": "overview",
      "heading": "What `wrap` is",
      "content": "```ts\ncy.wrap('Pending').should('eq', 'Pending');\ncy.wrap({ days: 12 }).its('days').should('eq', 12);\n```\n\n`cy.wrap` takes a JavaScript value and makes it the **current subject**. The next chained command receives that subject. It does **not** interpret a string as a CSS selector:\n\n```ts\ncy.wrap('[data-cy=status]');        // subject is a string\ncy.get('[data-cy=status]');         // subject is a DOM element\n```\n\nThat distinction is the first trap.",
      "order": 0
    },
    {
      "id": "cy-2-7-md-1",
      "type": "overview",
      "heading": "Six uses (memorize)",
      "content": "Six uses (memorize)",
      "order": 1
    },
    {
      "id": "cy-2-7-md-2",
      "type": "overview",
      "heading": "1. Wrap a primitive — assert a value on the queue",
      "content": "```ts\nconst remaining = 12; // e.g. computed in a then, or a constant\ncy.wrap(remaining).should('be.gt', 0).and('be.lte', 30);\n```\n\nWhy not `expect(remaining).to.be.gt(0)`? You can — that is explicit and fine for a **already final** number. `wrap` is useful when you want the assertion **in the Command Log** as its own step, or to chain `.should` after other commands.\n\n```ts\ncy.get('[data-cy=balance]')\n  .invoke('text')\n  .then((text) => parseInt(text, 10))\n  .should('be.within', 0, 30); // invoke yields the text; parse in then + wrap if needed\n```\n\nIf you parse in `.then` and want retry, parse inside `.should(fn)` instead (2.6). Wrap shines when the primitive is **done**.",
      "order": 2
    },
    {
      "id": "cy-2-7-md-3",
      "type": "overview",
      "heading": "2. Wrap a plain object — `.its` / nested `should`",
      "content": "```ts\nconst payload = { user: { email: 'ada@bizlevate.test', role: 'employee' } };\ncy.wrap(payload).its('user.email').should('include', '@bizlevate.test');\ncy.wrap(payload).should('have.nested.property', 'user.role', 'employee');\n```\n\nUseful after `JSON.parse`, after picking fields off a `cy.request` body, or after a task (already serialized) to keep asserting in Cypress style.\n\n```ts\ncy.request('/api/me').its('body').then((body) => {\n  cy.wrap(body).should('deep.include', { role: 'manager' });\n});\n```\n\n(`its('body').should('deep.include', ...)` also works without wrap.)",
      "order": 3
    },
    {
      "id": "cy-2-7-md-4",
      "type": "overview",
      "heading": "3. Wrap a Promise — Cypress waits for it",
      "content": "```ts\nfunction loadToken(): Promise<string> {\n  return Promise.resolve(Cypress.env('adminPassword') as string);\n}\n\ncy.wrap(loadToken()).then((token) => {\n  expect(token).to.be.a('string');\n});\n```\n\nCypress unwraps thenable subjects: the queue waits for resolution, then yields the resolved value. Prefer this over mixing `async/await` in `it`.\n\nDo not wrap a Cypress Chainable (`cy.wrap(cy.get('.x'))`) — you already have a chain.\n\nNode-side work still belongs in `cy.task` (serializable). Wrap Promises that exist **in the browser** (WebCrypto, a small helper).",
      "order": 4
    },
    {
      "id": "cy-2-7-md-5",
      "type": "overview",
      "heading": "4. Wrap jQuery / DOM — `.each`, event callbacks, non-Cypress queries",
      "content": "```ts\ncy.get('tbody tr').each(($row, index) => {\n  cy.wrap($row).find('[data-cy=status]').should('not.be.empty');\n  cy.wrap($row).find('[data-cy=open]').should('be.visible');\n});\n```\n\n`$row` is a jQuery object. jQuery's `$row.find` is **not** retryable. `cy.wrap($row).find(...)` puts it back on the queue so `.find` / `.should` behave like Cypress commands.\n\nOther times you hold a node:\n\n```ts\ncy.get('[data-cy=leave-form]').then(($form) => {\n  const submit = $form.find('button[type=submit]');\n  cy.wrap(submit).click();\n});\n```\n\nPrefer `cy.get('[data-cy=leave-form]').find('button[type=submit]').click()` when you can — fewer snapshots. Wrap is the escape hatch when you already have `$form`.",
      "order": 5
    },
    {
      "id": "cy-2-7-md-6",
      "type": "overview",
      "heading": "5. Yield from a custom command",
      "content": "```ts\nCypress.Commands.add('getLeaveRows', () => {\n  cy.get('[data-cy=leave-table] tbody tr');\n});\n\nCypress.Commands.add('todayIso', () => {\n  const iso = new Date().toISOString().slice(0, 10);\n  return cy.wrap(iso); // yield a string as the subject\n});\n```\n\n```ts\ncy.todayIso().then((iso) => {\n  cy.get('[name=startDate]').type(iso);\n});\n```\n\nIf a custom command computes a plain value and you `return iso`, Cypress may not put it on the chain. **`return cy.wrap(value)`** (or `cy.wrap(value)` as the last command) is the documented yield.\n\nFor commands that should yield a DOM element, end with `cy.get(...)` — that already yields. Wrap when the yield is **not** from a Cypress query.",
      "order": 6
    },
    {
      "id": "cy-2-7-md-7",
      "type": "overview",
      "heading": "6. Re-wrap inside `.then` so a following `.should` can retry",
      "content": "`.then` does not retry (2.4). Sometimes you drop off the chain with JS, then want Cypress assertions again:\n\n```ts\ncy.get('[data-cy=ids]').invoke('text').then((text) => {\n  const ids = text.split(',').map((s) => s.trim());\n  cy.wrap(ids).should('have.length', 3).its('0').should('match', /^lv_/);\n});\n```\n\nAnother variant — keep retrying a **function** by wrapping a getter (advanced; easy to abuse):\n\n```ts\ncy.wrap(null).should(() => {\n  expect(localStorage.getItem('hrm.flash')).to.eq('saved');\n});\n```\n\nThis retries the `should` fn until `expect` passes or timeout — a known pattern for non-DOM conditions. Prefer intercepts / UI text when possible. Named here because it is still **wrap + should**.",
      "order": 7
    },
    {
      "id": "cy-2-7-md-8",
      "type": "overview",
      "heading": "What wrap is not",
      "content": "| Temptation | Do this instead |\n|---|---|\n| `cy.wrap('#email')` as query | `cy.get('#email')` |\n| Wrap to \"make await work\" | Do not await; chain |\n| Wrap a task result that is already the subject of `cy.task` | `cy.task('seed').its('id')` |\n| Wrap to retry a stale detached node | `cy.get` again |",
      "order": 8
    },
    {
      "id": "cy-2-7-md-9",
      "type": "overview",
      "heading": "Actionability and wrapped DOM",
      "content": "`cy.wrap($button).click()` still checks actionability if `$button` is attached. If the app re-rendered and `$button` is detached, click fails. **Re-query with `cy.get`.** Wrap in `.each` is safe when you wrap the current iteration's element and act immediately.",
      "order": 9
    },
    {
      "id": "cy-2-7-md-10",
      "type": "overview",
      "heading": "Playwright / Selenium",
      "content": "Playwright: `const n = await locator.count(); expect(n).toBe(3)` — values are already in hand. No wrap.\n\nSelenium: you hold `WebElement` and `Assert`. No queue, no wrap.\n\n`cy.wrap` exists because Cypress **hid the values inside a queue**. It is the on-ramp back onto that queue.",
      "order": 10
    },
    {
      "id": "cy-2-7-md-11",
      "type": "overview",
      "heading": "Six-use flashcard (say it out loud)",
      "content": "1. **Primitive** — `cy.wrap(12).should('eq', 12)`\n2. **Object** — `cy.wrap(obj).its('role').should('eq', 'manager')`\n3. **Promise** — `cy.wrap(promise).then(...)` waits\n4. **jQuery/DOM** — `each(($el) => { cy.wrap($el).click() })`\n5. **Custom command yield** — `return cy.wrap(value)`\n6. **After `.then` JS** — wrap computed arrays/objects for `.should` / `.its`",
      "order": 11
    },
    {
      "id": "cy-2-7-md-12",
      "type": "overview",
      "heading": "Tiny HRM spec",
      "content": "```ts\nit('every row is pending and ids look like lv_*', () => {\n  cy.visit('/leave?filter=pending');\n  cy.get('[data-cy=leave-table] tbody tr').should('have.length.at.least', 1);\n  cy.get('[data-cy=leave-table] tbody tr').each(($row) => {\n    cy.wrap($row).should('contain.text', 'Pending');\n    cy.wrap($row)\n      .find('[data-cy=leave-id]')\n      .invoke('text')\n      .then((id) => {\n        cy.wrap(id.trim()).should('match', /^lv_/);\n      });\n  });\n});\n```\n\nUses 4 and 6 in one test; 1–3 and 5 show up as soon as you add helpers and tasks.\n\nPart 2 complete: structure, queries, queue, retry, aliases, assertions, wrap. Part 3 will build on these without re-explaining `await`.",
      "order": 12
    },
    {
      "id": "cy-2-7-md-13",
      "type": "overview",
      "heading": "Six uses, six HRM one-liners",
      "content": "```ts\n// 1 primitive\ncy.wrap(18).should('be.a', 'number');\n\n// 2 object\ncy.wrap({ role: 'manager' }).its('role').should('eq', 'manager');\n\n// 3 Promise\ncy.wrap(Promise.resolve('ok')).should('eq', 'ok');\n\n// 4 jQuery in each\ncy.get('tr').each(($r) => { cy.wrap($r).should('be.visible'); });\n\n// 5 custom command yield\nCypress.Commands.add('isoToday', () => cy.wrap('2026-09-16'));\n\n// 6 after then\ncy.get('[data-cy=tags]').invoke('text').then((t) => {\n  cy.wrap(t.split(',')).should('include', 'pending');\n});\n```\n\nIf you can write those six from memory, you pass the wrap question.",
      "order": 13
    },
    {
      "id": "cy-2-7-md-14",
      "type": "overview",
      "heading": "`wrap` and logging",
      "content": "Wrapped objects appear in the Command Log. Do not wrap huge fixture arrays if you only need `.its('0.email')` — log noise. Prefer `cy.fixture().its('0.email')`.",
      "order": 14
    },
    {
      "id": "cy-2-7-md-15",
      "type": "overview",
      "heading": "`null` vs wrap",
      "content": "`cy.wrap(null)` is valid (subject null). Tasks return `null` in Node; in the browser you wrap values you want to assert. Do not `cy.wrap(undefined)` as a substitute for skipping — skip with `this.skip()` instead.",
      "order": 15
    },
    {
      "id": "cy-2-7-md-16",
      "type": "overview",
      "heading": "When wrap + should retries a function (use 6, variant)",
      "content": "```ts\ncy.wrap({}).should(() => {\n  expect(window.localStorage.getItem('flash')).to.eq('saved');\n});\n```\n\nRetries until localStorage matches. Prefer asserting a toast in the DOM. This pattern is for values Cypress does not query by default.",
      "order": 16
    },
    {
      "id": "cy-2-7-md-17",
      "type": "overview",
      "heading": "Interview drill",
      "content": "\"List six uses of `cy.wrap`.\" Primitive, object, Promise, jQuery/DOM, custom-command yield, re-enter the queue after `.then`. \"Does `cy.wrap('#id')` find an element?\" No.",
      "order": 17
    },
    {
      "id": "cy-2-7-md-18",
      "type": "overview",
      "heading": "Part 2 close",
      "content": "You can structure suites, query the DOM, explain the queue, wait via assertions, name aliases, pick should vs expect, and put values back on the chain with wrap. Stop using `await cy` and `cy.wait(ms)` as your default tools.",
      "order": 18
    },
    {
      "id": "cy-2-7-md-19",
      "type": "overview",
      "heading": "Wrap vs get vs contains (selector confusion)",
      "content": "```ts\ncy.wrap('Submit');                 // subject is the string \"Submit\"\ncy.contains('Submit');             // subject is a DOM node\ncy.wrap(Cypress.$('button'));      // jQuery now, no initial retry to find it\ncy.get('button');                  // retries until found\n```\n\n`Cypress.$` + wrap is a smell for finding elements. Use `get`.",
      "order": 19
    },
    {
      "id": "cy-2-7-md-20",
      "type": "overview",
      "heading": "Custom command anti-pattern",
      "content": "```ts\nCypress.Commands.add('badToday', () => {\n  return new Date().toISOString().slice(0, 10); // not on the queue\n});\n```\n\n```ts\nCypress.Commands.add('goodToday', () => {\n  cy.wrap(new Date().toISOString().slice(0, 10));\n});\n```\n\nUse 5.",
      "order": 20
    },
    {
      "id": "cy-2-7-md-21",
      "type": "overview",
      "heading": "Wrapping `undefined`",
      "content": "`cy.wrap(undefined)` yields undefined; following `.should('eq', 1)` fails. Tasks cannot return undefined; wrap can wrap it. Still prefer not to.",
      "order": 21
    },
    {
      "id": "cy-2-7-md-22",
      "type": "overview",
      "heading": "Performance",
      "content": "Wrapping giant DOM trees in `.each` is normal. Wrapping 10,000-row JSON and `should('deep.equal')` is slow and a bad assertion. Slice first.",
      "order": 22
    },
    {
      "id": "cy-2-7-md-23",
      "type": "overview",
      "heading": "Recite-and-write exercise",
      "content": "Close the notes. Write a spec that: wraps `3`, wraps `{ n: 3 }.its('n')`, wraps `Promise.resolve(3)`, wraps each `tr`, adds `cy.three()` that yields 3 via wrap, parses ids in `.then` and wraps the array. That is the chapter.",
      "order": 23
    },
    {
      "id": "cy-2-7-md-24",
      "type": "overview",
      "heading": "Wrap a list for `.each`",
      "content": "```ts\ncy.wrap(['Ada', 'Grace']).each((name) => {\n  cy.contains('tr', name as string).should('be.visible');\n});\n```\n\nHere wrap's subject is an array; `.each` iterates. That is use 2 + 4 adjacent. You could `forEach` and enqueue `contains` instead (2.3). Both are valid.",
      "order": 24
    },
    {
      "id": "cy-2-7-md-25",
      "type": "overview",
      "heading": "Do not wrap Chainables",
      "content": "```ts\ncy.wrap(cy.get('tr')); // confusing, unsupported as a pattern\n```\n\nJust `cy.get('tr')`.",
      "order": 25
    },
    {
      "id": "cy-2-7-md-26",
      "type": "overview",
      "heading": "`its` after wrap",
      "content": "```ts\ncy.wrap({ user: { email: 'a@b.c' } }).its('user.email').should('eq', 'a@b.c');\n```\n\n`its` retries property access on objects that might get filled later (rare for wrap of a fresh literal; useful for wrapped refs). For literals, it still documents the path in the log.",
      "order": 26
    },
    {
      "id": "cy-2-7-md-27",
      "type": "overview",
      "heading": "Wrap + alias (kinds meet)",
      "content": "```ts\ncy.wrap({ email: 'ada@bizlevate.test' }).as('actor');\ncy.get('@actor').its('email').then((email) => cy.login(email));\n```\n\nThat is wrap use 2 plus a **data** alias. DOM aliases still start with `cy.get(selector).as`.",
      "order": 27
    },
    {
      "id": "cy-2-7-md-28",
      "type": "overview",
      "heading": "Wrap file contents",
      "content": "```ts\ncy.readFile('cypress/fixtures/employees.json').then((data) => {\n  cy.wrap(data).should('be.an', 'array').its('length').should('be.gt', 0);\n});\n```\n\n`readFile` already yields the parsed JSON; wrap is optional. Shown so you see wrap is about **queue membership**, not about reading files.",
      "order": 28
    },
    {
      "id": "cy-2-7-md-29",
      "type": "overview",
      "heading": "Wrap `Cypress.$(...)` is a snapshot",
      "content": "```ts\ncy.get('body').then(() => {\n  cy.wrap(Cypress.$('[data-cy=leave-table] tr')).should('have.length', 3);\n});\n```\n\n`Cypress.$` is now. If length is 0, `should` may retry **on the same empty jQuery object** and never see new rows. Use `cy.get('[data-cy=leave-table] tr').should('have.length', 3)` instead. Wrap use 4 is for elements you **already** have from a Cypress query (`each`), not for a second query engine.",
      "order": 29
    }
  ],
  "advantages": [
    "2.7 cy.wrap() — Without wrap,."
  ],
  "limitations": [
    "2.7 cy.wrap() is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
