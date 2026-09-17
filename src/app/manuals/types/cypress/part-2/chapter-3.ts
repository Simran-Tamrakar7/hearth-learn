import type { ChapterRecord } from "../../../types";

/** 2.3 Chaining & the Command Queue */
export const chapter = {
  "id": "cy-2-3-chaining-the-command-queue",
  "title": "2.3 Chaining & the Command Queue",
  "minutes": 34,
  "level": "beginner",
  "phase": "Part 2 · Core Syntax & Commands",
  "partName": "Part 2 · Core Syntax & Commands",
  "overviewText": "Cypress is a two-phase engine: phase 1 runs your it() body synchronously and enqueues Chainables; phase 2 executes the queue in order, passing a subject down the chain. Chaining is how get().find().should().click() shares one query-and-retry pipeline. You must never await cy.* and never treat a Chainable as a resolved value. .then() hops into a callback when a command finishes; it does not turn Cypress into Promises.",
  "why": "Almost every 'Cypress is broken' Slack thread is a queue misunderstanding: awaiting, assigning, or breaking the chain so retries stop. If you can draw enqueue vs execute on a whiteboard, you can debug anything in Parts 3–6.",
  "when": "Writing any spec, converting Playwright tests, using .then to read text, and whenever you are tempted to put Cypress commands inside Promise.all or a for-loop of awaits.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You need the leave balance text, then type a date, then click Submit — and a teammate's PR uses await cy.get and const text = cy.get('.balance').invoke('text').",
    "pass": "You chain or use .then(($el) => { ... cy.wrap / further cy commands }); you explain two-phase enqueue/execute; you reject await cy.get.",
    "fail": "You await cy.get('.balance'), or store the chainable in a const and read .text() immediately, or mix async/await with the queue."
  },
  "tools": [],
  "customSummary": "- Two-phase: (1) it() runs sync and enqueues commands; (2) Cypress executes the queue with retry.\n- Never await cy.* — Chainables are not Promises you should await (manual rule even where thenable).\n- A chain passes a subject: get → find → should → click. Breaking the chain starts a new root command (cy.get).\n- .then(cb) runs when the previous command yields; commands inside then are also enqueued. .then itself does not retry (2.4).\n- Synchronous JS loops enqueue N commands immediately; they do not wait between iterations unless you chain.\n- Playwright await is correct there; copying that pattern into Cypress is the migration bug.",
  "contentMarkdown": "## Two-phase execution (draw this)\n\n```ts\nit('submits leave', () => {\n  cy.visit('/leave/new');                          // enqueue 1\n  cy.get('[data-cy=leave-form]').find('[name=startDate]').type('2026-09-21'); // 2–4\n  cy.contains('button', 'Submit').click();         // 5–6\n});\n```\n\n**Phase 1 — enqueue (milliseconds):** Mocha invokes `it`. Each `cy.*` / `.find` / `.type` **pushes a command object** onto Cypress's queue and returns a **Chainable**. The function body finishes. No visit has happened yet.\n\n**Phase 2 — execute (seconds):** Cypress pops commands in order. `visit` navigates and waits for load. `get` retries until the form exists. `find` retries inside that subject. `type` waits for **actionability**, then types. `contains` + `click` follow.\n\nIf phase 1 throws (`const x = undefined.foo`), **no Cypress command runs**. If phase 2 times out, the test fails on that command — the Command Log shows how far the queue got.\n\n## Never `await cy.*`\n\n```ts\nit('wrong', async () => {\n  await cy.visit('/leave');     // do not\n  const btn = await cy.get('button'); // do not\n});\n```\n\nOfficial mental model: **commands are not Promises**. Recent Cypress makes chainables *thenable* so some `await`s appear to work; they still fight hooks, aliases, and custom commands. **This manual forbids `await cy.*`.** Playwright code that is 90% `await` must be rewritten, not pasted.\n\nTo sequence on a value:\n\n```ts\ncy.get('[data-cy=balance]').invoke('text').then((text) => {\n  expect(text).to.match(/\\d+ days/);\n  cy.log(text);\n});\n```\n\n## Subjects: what a chain passes\n\nEach command **yields** a subject to the next:\n\n```text\ncy.get('table')          → jQuery collection of tables\n  .find('tr')            → rows inside the previous subject\n  .should('have.length', 3) → same rows, after assertion passes\n  .last()                → last row\n  .click()               → still that row (click yields the DOM)\n```\n\nStarting `cy.` again is a **new root**:\n\n```ts\ncy.get('form').find('input'); // find is relative\ncy.get('form');\ncy.get('input');              // input is GLOBAL, not in the form\n```\n\n`.should` yields the **same subject** (so you can continue). `.then` yields whatever you **return** (or the previous subject if you return nothing — be explicit with `cy.wrap`).\n\n## `.then` vs continuing the chain\n\n```ts\ncy.get('[data-cy=leave-id]')\n  .invoke('text')\n  .then((id) => {\n    cy.visit(`/leave/${id}`);\n    cy.contains('h1', id).should('be.visible');\n  });\n```\n\nInside `.then`:\n\n- You may run **synchronous** JS (`expect`, `console.log`, parse ints).\n- You may start **new** `cy.*` commands; they enqueue as part of the same test queue.\n- Returning a **Promise** is allowed; Cypress waits. Returning a **raw DOM / jQuery** continues the chain. Returning a primitive: wrap it if the next command expects a subject (`cy.wrap`).\n\n**Do not** `return cy.get(...)` thinking you created a Promise of an element for the outer test. Stay inside the queue.\n\n## Commands inside `.then` still enqueue\n\n```ts\ncy.get('li').then(($lis) => {\n  const n = $lis.length;\n  cy.log(`rows ${n}`);\n  cy.wrap(n).should('be.gt', 0);\n});\n```\n\nThe callback runs **during phase 2** when `get` has a subject. Nested `cy.log` / `cy.wrap` are additional queue items. This is how you branch:\n\n```ts\ncy.get('body').then(($body) => {\n  if ($body.find('[data-cy=empty-state]').length) {\n    cy.contains('Create your first request').click();\n  } else {\n    cy.get('[data-cy=leave-table]').should('be.visible');\n  }\n});\n```\n\nBranching on the DOM must happen **inside** `.then` (or `.should` with a function — 2.6). An `if` in phase 1 sees an empty page that has not loaded.\n\n## Loops: they enqueue immediately\n\n```ts\nconst names = ['Ada', 'Grace', 'Edsger'];\nnames.forEach((name) => {\n  cy.contains('tr', name).should('be.visible');\n});\n```\n\nPhase 1 enqueues **three** `contains` commands. That is OK. This is **not** OK:\n\n```ts\nfor (const name of names) {\n  const text = cy.contains('tr', name).invoke('text'); // Chainable, not string\n}\n```\n\nFor async iteration over unknown length, prefer `.each`:\n\n```ts\ncy.get('tbody tr').each(($row) => {\n  cy.wrap($row).find('[data-cy=status]').should('not.eq', '');\n});\n```\n\n## Breaking the queue on purpose\n\nUse `cy.wrap` (2.7) to put a non-Cypress value back on the queue. Use `.as` (2.5) to save a subject. Use `Cypress.Promise` only if you must — most HRM tests never should.\n\n`cy.wait(500)` is a timed queue item, not a substitute for an assertion. Prefer `should` / `cy.wait('@alias')`.\n\n## Playwright / Selenium comparison\n\n| | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Test body | Sync enqueue | `async` + `await` | Sync or async bindings |\n| Element object | jQuery subject on chain | Locator (lazy) | WebElement (eager, stale) |\n| Read text | `.invoke('text').then` or `.should('contain.text')` | `await locator.textContent()` | `element.getText()` |\n| Parallel commands | No — one queue | `Promise.all` possible | Multiple drivers possible |\n\n**Migration rule:** Playwright `const t = await page.locator('.x').textContent()` becomes Cypress `cy.get('.x').should('have.text', ...)` or `.invoke('text').then(...)`. Do not force the `const`.\n\n## Debug trick\n\n```ts\ncy.get('[data-cy=leave-form]').then(($form) => {\n  debugger; // pause with DevTools; $form is live jQuery\n});\n```\n\nOr click the command in **open** mode — time-travel shows the subject. The queue is visible as the Command Log: one line per executed command.\n\n## Anti-patterns recap\n\n```ts\nconst $el = cy.get('.btn');     // $el is a Chainable\nexpect($el).to.have.text('x');  // never true the way you think\n\ncy.get('.btn').then(async ($el) => {\n  await fetch('/no');           // extra async outside Cypress control — avoid\n});\n\nit('x', async () => {\n  await cy.get('.btn').click();\n});\n```\n\nCorrect shape:\n\n```ts\nit('x', () => {\n  cy.get('.btn').should('have.text', 'Submit').click();\n});\n```\n\nNext: **retry-ability** — what the queue retries, what actionability means, and why `.then` does not retry.\n## Command Log is the queue made visible\n\nEach line is a command that **already ran** (or is retrying). Nested lines show yielded subjects (e.g. get matched 3). If you expected 10 commands and see 2, phase 2 never reached them because command 2 timed out.\n\n## `Cypress.log` vs `cy.log`\n\n```ts\ncy.log('seed done');\n```\n\n`cy.log` is a queue command (appears in order). `console.log` in phase 1 runs **before** visits. That is why \"my log shows undefined\" happens: you logged a Chainable in phase 1.\n\n## Mixing `fetch` in `.then`\n\n```ts\ncy.visit('/leave').then(() => {\n  return fetch('/api/leave').then((r) => r.json());\n}).then((data) => {\n  cy.wrap(data).its('length').should('be.gt', 0);\n});\n```\n\nThis works but bypasses `cy.intercept`. Prefer `cy.request` / intercepts. If you return a Promise from `.then`, Cypress waits — that is wrap-adjacent (2.7).\n\n## Recursion and dynamic length\n\nUnknown row count: `.each`. Known list from fixture: `forEach` enqueueing `cy.contains`. Do not `await` inside the loop.\n\n## Custom commands are queue fragments\n\n```ts\nCypress.Commands.add('fillDates', (start: string, end: string) => {\n  cy.get('[name=startDate]').clear().type(start);\n  cy.get('[name=endDate]').clear().type(end);\n});\n\ncy.get('[data-cy=leave-form]').within(() => {\n  cy.fillDates('2026-09-21', '2026-09-21');\n});\n```\n\nThe custom command **enqueues** its inner commands when it runs in phase 2. You still never await `cy.fillDates`.\n\n## Interview drill\n\nExplain phase 1 vs 2 with a 3-line spec. Why does `const t = cy.get('h1').invoke('text')` fail? What does `.then` do to the queue? Why is Playwright `await` not portable here?\n## Subject-changing commands\n\n| Command | Yields |\n|---|---|\n| `cy.get` | matched elements |\n| `.find` | descendants |\n| `.should` | same subject |\n| `.click` | the clicked element |\n| `.invoke('text')` | the string |\n| `.its('body')` | that property |\n| `.then(fn)` | return value of fn (or previous if none) |\n| `cy.wrap(x)` | `x` |\n\nIf you `.invoke('text').click()`, you are trying to click a string. Re-query:\n\n```ts\ncy.get('[data-cy=open]').should('contain.text', 'View').click();\n```\n\n## `cy.then` vs Promise `.then`\n\nCypress's `.then` is a **command**. JS Promise `.then` is not. Returning a Promise from Cypress `.then` is supported (Cypress waits). Returning a Chainable is a gray area — nest `cy.*` without returning them.\n\n## `Promise.all` with Cypress\n\n```ts\nawait Promise.all([cy.get('a'), cy.get('b')]); // wrong\n```\n\nThere is one queue. Two gets already run sequentially. Playwright can race two locators; Cypress does not need to.\n\n## Error: \"Cypress detected that you returned a promise\"\n\nUsually an `async` callback on `it` or `.then(async () => await cy.get())`. Remove `async`/`await`. That error is the queue defending itself.\n## `cy.then` alias\n\n`.then` on a chain is the same family as `cy.then` (rarely used as a root). Root `cy.then` still waits for the queue to reach it. Prefer chaining off a real query so the Command Log has a subject.\n\n## Debugging with `.pause()`\n\n```ts\ncy.get('[data-cy=leave-form]').pause().find('input').type('x');\n```\n\nOpen mode only. The queue stops; you inspect the iframe, then resume. This is better than `cy.wait(5000)` while writing chains.\n\n## `invoke` sits on the queue\n\n```ts\ncy.get('input').invoke('val', '').type('ada@bizlevate.test');\n```\n\n`invoke('val', '')` is a jQuery call as a command. It retries until it succeeds. Do not `input.value = ''` in phase 1.\n## `cy.wrap().then()` vs `cy.then()`\n\nBoth schedule callbacks on the queue. Starting from `wrap` makes the subject obvious in the log. Starting from `cy.then` is easy to hide. Team style: chain off `get`/`visit`/`wrap`, do not sprinkle root `cy.then`.\n\n## Commands are serial, even when the app is not\n\nHRM may fire three APIs in parallel. Your test still queues `wait('@a')` then `wait('@b')` then `wait('@c')` unless you `cy.wait(['@a','@b','@c'])`. The **app** is concurrent; the **queue** is not. That is not a bug.\n## `spread` (rare)\n\n```ts\ncy.get('input').then(($i) => [$i.eq(0), $i.eq(1)]).spread(($a, $b) => {\n  cy.wrap($a).type('x');\n  cy.wrap($b).type('y');\n});\n```\n\n`spread` is a one-shot like `then`. Prefer `eq(0)` / `eq(1)` chains or `within`. Included so you do not confuse it with retrying `should`.\n## `cy.queue` is not a public API\n\nDo not inspect internal queues in specs. The Command Log is the supported visualization. If you think a command 'did not enqueue,' you returned early from `it` with a thrown error in phase 1 — fix the throw.\n\n## `done` callback (legacy Mocha)\n\n```ts\nit('legacy', (done) => { done(); });\n```\n\nDo not mix Mocha `done` with Cypress commands. Cypress manages async via the queue. `done` is how people used to write Mocha + Selenium. Here it races the queue.\n",
  "blocks": [
    {
      "id": "cy-2-3-md-0",
      "type": "overview",
      "heading": "Two-phase execution (draw this)",
      "content": "```ts\nit('submits leave', () => {\n  cy.visit('/leave/new');                          // enqueue 1\n  cy.get('[data-cy=leave-form]').find('[name=startDate]').type('2026-09-21'); // 2–4\n  cy.contains('button', 'Submit').click();         // 5–6\n});\n```\n\n**Phase 1 — enqueue (milliseconds):** Mocha invokes `it`. Each `cy.*` / `.find` / `.type` **pushes a command object** onto Cypress's queue and returns a **Chainable**. The function body finishes. No visit has happened yet.\n\n**Phase 2 — execute (seconds):** Cypress pops commands in order. `visit` navigates and waits for load. `get` retries until the form exists. `find` retries inside that subject. `type` waits for **actionability**, then types. `contains` + `click` follow.\n\nIf phase 1 throws (`const x = undefined.foo`), **no Cypress command runs**. If phase 2 times out, the test fails on that command — the Command Log shows how far the queue got.",
      "order": 0
    },
    {
      "id": "cy-2-3-md-1",
      "type": "overview",
      "heading": "Never `await cy.*`",
      "content": "```ts\nit('wrong', async () => {\n  await cy.visit('/leave');     // do not\n  const btn = await cy.get('button'); // do not\n});\n```\n\nOfficial mental model: **commands are not Promises**. Recent Cypress makes chainables *thenable* so some `await`s appear to work; they still fight hooks, aliases, and custom commands. **This manual forbids `await cy.*`.** Playwright code that is 90% `await` must be rewritten, not pasted.\n\nTo sequence on a value:\n\n```ts\ncy.get('[data-cy=balance]').invoke('text').then((text) => {\n  expect(text).to.match(/\\d+ days/);\n  cy.log(text);\n});\n```",
      "order": 1
    },
    {
      "id": "cy-2-3-md-2",
      "type": "overview",
      "heading": "Subjects: what a chain passes",
      "content": "Each command **yields** a subject to the next:\n\n```text\ncy.get('table')          → jQuery collection of tables\n  .find('tr')            → rows inside the previous subject\n  .should('have.length', 3) → same rows, after assertion passes\n  .last()                → last row\n  .click()               → still that row (click yields the DOM)\n```\n\nStarting `cy.` again is a **new root**:\n\n```ts\ncy.get('form').find('input'); // find is relative\ncy.get('form');\ncy.get('input');              // input is GLOBAL, not in the form\n```\n\n`.should` yields the **same subject** (so you can continue). `.then` yields whatever you **return** (or the previous subject if you return nothing — be explicit with `cy.wrap`).",
      "order": 2
    },
    {
      "id": "cy-2-3-md-3",
      "type": "overview",
      "heading": "`.then` vs continuing the chain",
      "content": "```ts\ncy.get('[data-cy=leave-id]')\n  .invoke('text')\n  .then((id) => {\n    cy.visit(`/leave/${id}`);\n    cy.contains('h1', id).should('be.visible');\n  });\n```\n\nInside `.then`:\n\n- You may run **synchronous** JS (`expect`, `console.log`, parse ints).\n- You may start **new** `cy.*` commands; they enqueue as part of the same test queue.\n- Returning a **Promise** is allowed; Cypress waits. Returning a **raw DOM / jQuery** continues the chain. Returning a primitive: wrap it if the next command expects a subject (`cy.wrap`).\n\n**Do not** `return cy.get(...)` thinking you created a Promise of an element for the outer test. Stay inside the queue.",
      "order": 3
    },
    {
      "id": "cy-2-3-md-4",
      "type": "overview",
      "heading": "Commands inside `.then` still enqueue",
      "content": "```ts\ncy.get('li').then(($lis) => {\n  const n = $lis.length;\n  cy.log(`rows ${n}`);\n  cy.wrap(n).should('be.gt', 0);\n});\n```\n\nThe callback runs **during phase 2** when `get` has a subject. Nested `cy.log` / `cy.wrap` are additional queue items. This is how you branch:\n\n```ts\ncy.get('body').then(($body) => {\n  if ($body.find('[data-cy=empty-state]').length) {\n    cy.contains('Create your first request').click();\n  } else {\n    cy.get('[data-cy=leave-table]').should('be.visible');\n  }\n});\n```\n\nBranching on the DOM must happen **inside** `.then` (or `.should` with a function — 2.6). An `if` in phase 1 sees an empty page that has not loaded.",
      "order": 4
    },
    {
      "id": "cy-2-3-md-5",
      "type": "overview",
      "heading": "Loops: they enqueue immediately",
      "content": "```ts\nconst names = ['Ada', 'Grace', 'Edsger'];\nnames.forEach((name) => {\n  cy.contains('tr', name).should('be.visible');\n});\n```\n\nPhase 1 enqueues **three** `contains` commands. That is OK. This is **not** OK:\n\n```ts\nfor (const name of names) {\n  const text = cy.contains('tr', name).invoke('text'); // Chainable, not string\n}\n```\n\nFor async iteration over unknown length, prefer `.each`:\n\n```ts\ncy.get('tbody tr').each(($row) => {\n  cy.wrap($row).find('[data-cy=status]').should('not.eq', '');\n});\n```",
      "order": 5
    },
    {
      "id": "cy-2-3-md-6",
      "type": "overview",
      "heading": "Breaking the queue on purpose",
      "content": "Use `cy.wrap` (2.7) to put a non-Cypress value back on the queue. Use `.as` (2.5) to save a subject. Use `Cypress.Promise` only if you must — most HRM tests never should.\n\n`cy.wait(500)` is a timed queue item, not a substitute for an assertion. Prefer `should` / `cy.wait('@alias')`.",
      "order": 6
    },
    {
      "id": "cy-2-3-md-7",
      "type": "overview",
      "heading": "Playwright / Selenium comparison",
      "content": "| | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Test body | Sync enqueue | `async` + `await` | Sync or async bindings |\n| Element object | jQuery subject on chain | Locator (lazy) | WebElement (eager, stale) |\n| Read text | `.invoke('text').then` or `.should('contain.text')` | `await locator.textContent()` | `element.getText()` |\n| Parallel commands | No — one queue | `Promise.all` possible | Multiple drivers possible |\n\n**Migration rule:** Playwright `const t = await page.locator('.x').textContent()` becomes Cypress `cy.get('.x').should('have.text', ...)` or `.invoke('text').then(...)`. Do not force the `const`.",
      "order": 7
    },
    {
      "id": "cy-2-3-md-8",
      "type": "overview",
      "heading": "Debug trick",
      "content": "```ts\ncy.get('[data-cy=leave-form]').then(($form) => {\n  debugger; // pause with DevTools; $form is live jQuery\n});\n```\n\nOr click the command in **open** mode — time-travel shows the subject. The queue is visible as the Command Log: one line per executed command.",
      "order": 8
    },
    {
      "id": "cy-2-3-md-9",
      "type": "overview",
      "heading": "Anti-patterns recap",
      "content": "```ts\nconst $el = cy.get('.btn');     // $el is a Chainable\nexpect($el).to.have.text('x');  // never true the way you think\n\ncy.get('.btn').then(async ($el) => {\n  await fetch('/no');           // extra async outside Cypress control — avoid\n});\n\nit('x', async () => {\n  await cy.get('.btn').click();\n});\n```\n\nCorrect shape:\n\n```ts\nit('x', () => {\n  cy.get('.btn').should('have.text', 'Submit').click();\n});\n```\n\nNext: **retry-ability** — what the queue retries, what actionability means, and why `.then` does not retry.",
      "order": 9
    },
    {
      "id": "cy-2-3-md-10",
      "type": "overview",
      "heading": "Command Log is the queue made visible",
      "content": "Each line is a command that **already ran** (or is retrying). Nested lines show yielded subjects (e.g. get matched 3). If you expected 10 commands and see 2, phase 2 never reached them because command 2 timed out.",
      "order": 10
    },
    {
      "id": "cy-2-3-md-11",
      "type": "overview",
      "heading": "`Cypress.log` vs `cy.log`",
      "content": "```ts\ncy.log('seed done');\n```\n\n`cy.log` is a queue command (appears in order). `console.log` in phase 1 runs **before** visits. That is why \"my log shows undefined\" happens: you logged a Chainable in phase 1.",
      "order": 11
    },
    {
      "id": "cy-2-3-md-12",
      "type": "overview",
      "heading": "Mixing `fetch` in `.then`",
      "content": "```ts\ncy.visit('/leave').then(() => {\n  return fetch('/api/leave').then((r) => r.json());\n}).then((data) => {\n  cy.wrap(data).its('length').should('be.gt', 0);\n});\n```\n\nThis works but bypasses `cy.intercept`. Prefer `cy.request` / intercepts. If you return a Promise from `.then`, Cypress waits — that is wrap-adjacent (2.7).",
      "order": 12
    },
    {
      "id": "cy-2-3-md-13",
      "type": "overview",
      "heading": "Recursion and dynamic length",
      "content": "Unknown row count: `.each`. Known list from fixture: `forEach` enqueueing `cy.contains`. Do not `await` inside the loop.",
      "order": 13
    },
    {
      "id": "cy-2-3-md-14",
      "type": "overview",
      "heading": "Custom commands are queue fragments",
      "content": "```ts\nCypress.Commands.add('fillDates', (start: string, end: string) => {\n  cy.get('[name=startDate]').clear().type(start);\n  cy.get('[name=endDate]').clear().type(end);\n});\n\ncy.get('[data-cy=leave-form]').within(() => {\n  cy.fillDates('2026-09-21', '2026-09-21');\n});\n```\n\nThe custom command **enqueues** its inner commands when it runs in phase 2. You still never await `cy.fillDates`.",
      "order": 14
    },
    {
      "id": "cy-2-3-md-15",
      "type": "overview",
      "heading": "Interview drill",
      "content": "Explain phase 1 vs 2 with a 3-line spec. Why does `const t = cy.get('h1').invoke('text')` fail? What does `.then` do to the queue? Why is Playwright `await` not portable here?",
      "order": 15
    },
    {
      "id": "cy-2-3-md-16",
      "type": "overview",
      "heading": "Subject-changing commands",
      "content": "| Command | Yields |\n|---|---|\n| `cy.get` | matched elements |\n| `.find` | descendants |\n| `.should` | same subject |\n| `.click` | the clicked element |\n| `.invoke('text')` | the string |\n| `.its('body')` | that property |\n| `.then(fn)` | return value of fn (or previous if none) |\n| `cy.wrap(x)` | `x` |\n\nIf you `.invoke('text').click()`, you are trying to click a string. Re-query:\n\n```ts\ncy.get('[data-cy=open]').should('contain.text', 'View').click();\n```",
      "order": 16
    },
    {
      "id": "cy-2-3-md-17",
      "type": "overview",
      "heading": "`cy.then` vs Promise `.then`",
      "content": "Cypress's `.then` is a **command**. JS Promise `.then` is not. Returning a Promise from Cypress `.then` is supported (Cypress waits). Returning a Chainable is a gray area — nest `cy.*` without returning them.",
      "order": 17
    },
    {
      "id": "cy-2-3-md-18",
      "type": "overview",
      "heading": "`Promise.all` with Cypress",
      "content": "```ts\nawait Promise.all([cy.get('a'), cy.get('b')]); // wrong\n```\n\nThere is one queue. Two gets already run sequentially. Playwright can race two locators; Cypress does not need to.",
      "order": 18
    },
    {
      "id": "cy-2-3-md-19",
      "type": "overview",
      "heading": "Error: \"Cypress detected that you returned a promise\"",
      "content": "Usually an `async` callback on `it` or `.then(async () => await cy.get())`. Remove `async`/`await`. That error is the queue defending itself.",
      "order": 19
    },
    {
      "id": "cy-2-3-md-20",
      "type": "overview",
      "heading": "`cy.then` alias",
      "content": "`.then` on a chain is the same family as `cy.then` (rarely used as a root). Root `cy.then` still waits for the queue to reach it. Prefer chaining off a real query so the Command Log has a subject.",
      "order": 20
    },
    {
      "id": "cy-2-3-md-21",
      "type": "overview",
      "heading": "Debugging with `.pause()`",
      "content": "```ts\ncy.get('[data-cy=leave-form]').pause().find('input').type('x');\n```\n\nOpen mode only. The queue stops; you inspect the iframe, then resume. This is better than `cy.wait(5000)` while writing chains.",
      "order": 21
    },
    {
      "id": "cy-2-3-md-22",
      "type": "overview",
      "heading": "`invoke` sits on the queue",
      "content": "```ts\ncy.get('input').invoke('val', '').type('ada@bizlevate.test');\n```\n\n`invoke('val', '')` is a jQuery call as a command. It retries until it succeeds. Do not `input.value = ''` in phase 1.",
      "order": 22
    },
    {
      "id": "cy-2-3-md-23",
      "type": "overview",
      "heading": "`cy.wrap().then()` vs `cy.then()`",
      "content": "Both schedule callbacks on the queue. Starting from `wrap` makes the subject obvious in the log. Starting from `cy.then` is easy to hide. Team style: chain off `get`/`visit`/`wrap`, do not sprinkle root `cy.then`.",
      "order": 23
    },
    {
      "id": "cy-2-3-md-24",
      "type": "overview",
      "heading": "Commands are serial, even when the app is not",
      "content": "HRM may fire three APIs in parallel. Your test still queues `wait('@a')` then `wait('@b')` then `wait('@c')` unless you `cy.wait(['@a','@b','@c'])`. The **app** is concurrent; the **queue** is not. That is not a bug.",
      "order": 24
    },
    {
      "id": "cy-2-3-md-25",
      "type": "overview",
      "heading": "`spread` (rare)",
      "content": "```ts\ncy.get('input').then(($i) => [$i.eq(0), $i.eq(1)]).spread(($a, $b) => {\n  cy.wrap($a).type('x');\n  cy.wrap($b).type('y');\n});\n```\n\n`spread` is a one-shot like `then`. Prefer `eq(0)` / `eq(1)` chains or `within`. Included so you do not confuse it with retrying `should`.",
      "order": 25
    },
    {
      "id": "cy-2-3-md-26",
      "type": "overview",
      "heading": "`cy.queue` is not a public API",
      "content": "Do not inspect internal queues in specs. The Command Log is the supported visualization. If you think a command 'did not enqueue,' you returned early from `it` with a thrown error in phase 1 — fix the throw.",
      "order": 26
    },
    {
      "id": "cy-2-3-md-27",
      "type": "overview",
      "heading": "`done` callback (legacy Mocha)",
      "content": "```ts\nit('legacy', (done) => { done(); });\n```\n\nDo not mix Mocha `done` with Cypress commands. Cypress manages async via the queue. `done` is how people used to write Mocha + Selenium. Here it races the queue.",
      "order": 27
    }
  ],
  "advantages": [
    "2.3 Chaining & the Command Queue — Almost every 'Cypress is broken' Slack thread is a queue misunderstanding: awaiting, assigning, or breaking the chain so retries stop."
  ],
  "limitations": [
    "2.3 Chaining & the Command Queue is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
