import type { ChapterRecord } from "../../../types";

/** 0.3 What Cypress Can Do */
export const chapter = {
  "id": "cy-0-3-what-cypress-can-do",
  "title": "0.3 What Cypress Can Do",
  "minutes": 28,
  "level": "beginner",
  "phase": "Part 0 · Orientation",
  "partName": "Part 0 · Orientation",
  "overviewText": "Cypress runs inside the browser, so cy.get() returns a queued chainable, not a Promise. Time-travel debugging restores a real DOM snapshot per command. Retry-ability wraps mid-chain assertions. Network stubbing uses named aliases (cy.wait('@alias')). Videos/screenshots on cypress run are on by default historically — but video defaulted to false in Cypress 13.",
  "why": "The command-queue vs Promise misunderstanding is the most common first-week Cypress bug. Time-travel, retry-ability, and named intercept waits are the capabilities that actually differentiate Cypress in interviews.",
  "when": "Before writing your first spec, and whenever you catch yourself trying to await cy.get() or assign a command result to a variable.",
  "practical": {
    "app": "Leave list page",
    "scenario": "You need to wait for three items, then click the last one, after stubbing GET /api/users.",
    "pass": "You write cy.get('.item-list').find('.item').should('have.length', 3).last().click() and cy.intercept().as('getUsers') + cy.wait('@getUsers').",
    "fail": "You await cy.get(), or use a fixed cy.wait(2000), or expect cy.get().text() to be a string outside .then()."
  },
  "tools": [],
  "customSummary": "- cy.get() returns a queued chainable, not a Promise — cannot await it or read its value outside .then().\n- Time-travel: every command logs a real DOM snapshot; hovering restores exact DOM state, inspectable in DevTools — live and built-in vs Playwright's post-hoc Trace Viewer.\n- Retry-ability wraps mid-chain assertions (should have.length 3 then last().click()) — a distinctly Cypress pattern.\n- Network idiom: cy.intercept().as('alias') + cy.wait('@alias') — named-alias waiting with no one-line Playwright equivalent.\n- Videos/screenshots: historically captured by default on cypress run; Cypress 13 changed video default to false — check your version.",
  "contentMarkdown": "## Runs inside the browser — the async/promise confusion\n\nIn Playwright (or plain async JS):\n\n```js\nconst value = await page.locator('.total').textContent();\nconsole.log(value);\n```\n\nIn Cypress the equivalent looks similar but works completely differently:\n\n```js\ncy.get('.total').invoke('text').then((value) => {\n  console.log(value);\n});\n```\n\n`cy.get()` does **not** return a Promise you can await. It returns a Cypress \"chainable\" — an object representing a queued, not-yet-executed command. Cypress internally builds up a queue of these commands as your test function runs synchronously top-to-bottom, then executes them one at a time afterward, each waiting for the previous to finish and retrying internally as needed.\n\nThis is why you cannot do `const value = cy.get('.total').text()` and expect `value` to hold anything meaningful outside a `.then()` callback — the command hasn't actually run yet at the point your synchronous test function returns control. This single misunderstanding is probably the most common source of confused first-week Cypress bugs.\n\n## Time-travel debugging\n\nWhen the Test Runner executes your test, each command in the log is backed by an actual DOM snapshot taken at that moment. Hovering over (or clicking) a command restores the application's DOM in the browser preview pane to exactly how it looked right before and right after that command ran. Because this is a real DOM, not a screenshot image, you can open DevTools and inspect it: computed CSS, event listeners, accessibility tree.\n\nPlaywright's Trace Viewer achieves something conceptually similar via recorded DOM snapshots, but it's a separate post-hoc viewer you open after the fact from a `.zip` trace file. Cypress's version is live, integrated into the same window you're already watching, with zero extra setup.\n\n## Automatic waiting / retry-ability\n\nIn Playwright, `expect(locator).to_have_text(\"3\")` re-queries the locator and re-checks the assertion together as one atomic retry loop — conceptually similar. The Cypress difference shows up in command chains that aren't pure assertions:\n\n```js\ncy.get('.item-list').find('.item').should('have.length', 3).last().click();\n```\n\nRetry-ability wraps the `.should()` in the middle of the chain — Cypress will re-run `cy.get('.item-list').find('.item')` repeatedly until the length assertion passes, and only once it passes does it continue to `.last().click()`. This \"retry until the assertion embedded mid-chain passes, then proceed\" behavior is a distinctly Cypress pattern. Playwright's equivalent is typically two separate statements (an `expect()` call, then a follow-up action).\n\n## Network stubbing — `cy.wait('@alias')`\n\n```js\ncy.intercept('GET', '/api/users').as('getUsers');\ncy.visit('/users');\ncy.wait('@getUsers');  // pause until this specific network call completes\n```\n\nThis \"name the intercepted route, then explicitly wait on that name\" pattern is idiomatic Cypress and doesn't have a one-line equivalent in Playwright, where you'd more typically wait on a UI state or use `page.wait_for_response()` matching a URL pattern directly. Full treatment in Part 5.\n\n## Built-in dashboard/videos/screenshots\n\nRunning `cypress run` (headless CI mode) can record a full video of the spec file to `cypress/videos/`. Important version nuance: video recording was on by default historically, but **Cypress 13 changed `video` to default to `false`**. If you want videos, set `video: true` explicitly. Don't assume the default — check with `npx cypress info` or read your config.\n\nPlaywright's philosophy leans toward explicit configuration for anything with a storage/performance cost (`--video=retain-on-failure`). Cypress's historically \"just works, capture everything\" approach is friendlier to a newcomer's first CI setup but can bloat CI artifact storage if a team never revisits the default (Part 11.8, Part 12.4).",
  "blocks": [
    {
      "id": "cy-0-3-md-0",
      "type": "overview",
      "heading": "Runs inside the browser — the async/promise confusion",
      "content": "In Playwright (or plain async JS):\n\n```js\nconst value = await page.locator('.total').textContent();\nconsole.log(value);\n```\n\nIn Cypress the equivalent looks similar but works completely differently:\n\n```js\ncy.get('.total').invoke('text').then((value) => {\n  console.log(value);\n});\n```\n\n`cy.get()` does **not** return a Promise you can await. It returns a Cypress \"chainable\" — an object representing a queued, not-yet-executed command. Cypress internally builds up a queue of these commands as your test function runs synchronously top-to-bottom, then executes them one at a time afterward, each waiting for the previous to finish and retrying internally as needed.\n\nThis is why you cannot do `const value = cy.get('.total').text()` and expect `value` to hold anything meaningful outside a `.then()` callback — the command hasn't actually run yet at the point your synchronous test function returns control. This single misunderstanding is probably the most common source of confused first-week Cypress bugs.",
      "order": 0
    },
    {
      "id": "cy-0-3-md-1",
      "type": "overview",
      "heading": "Time-travel debugging",
      "content": "When the Test Runner executes your test, each command in the log is backed by an actual DOM snapshot taken at that moment. Hovering over (or clicking) a command restores the application's DOM in the browser preview pane to exactly how it looked right before and right after that command ran. Because this is a real DOM, not a screenshot image, you can open DevTools and inspect it: computed CSS, event listeners, accessibility tree.\n\nPlaywright's Trace Viewer achieves something conceptually similar via recorded DOM snapshots, but it's a separate post-hoc viewer you open after the fact from a `.zip` trace file. Cypress's version is live, integrated into the same window you're already watching, with zero extra setup.",
      "order": 1
    },
    {
      "id": "cy-0-3-md-2",
      "type": "overview",
      "heading": "Automatic waiting / retry-ability",
      "content": "In Playwright, `expect(locator).to_have_text(\"3\")` re-queries the locator and re-checks the assertion together as one atomic retry loop — conceptually similar. The Cypress difference shows up in command chains that aren't pure assertions:\n\n```js\ncy.get('.item-list').find('.item').should('have.length', 3).last().click();\n```\n\nRetry-ability wraps the `.should()` in the middle of the chain — Cypress will re-run `cy.get('.item-list').find('.item')` repeatedly until the length assertion passes, and only once it passes does it continue to `.last().click()`. This \"retry until the assertion embedded mid-chain passes, then proceed\" behavior is a distinctly Cypress pattern. Playwright's equivalent is typically two separate statements (an `expect()` call, then a follow-up action).",
      "order": 2
    },
    {
      "id": "cy-0-3-md-3",
      "type": "overview",
      "heading": "Network stubbing — `cy.wait('@alias')`",
      "content": "```js\ncy.intercept('GET', '/api/users').as('getUsers');\ncy.visit('/users');\ncy.wait('@getUsers');  // pause until this specific network call completes\n```\n\nThis \"name the intercepted route, then explicitly wait on that name\" pattern is idiomatic Cypress and doesn't have a one-line equivalent in Playwright, where you'd more typically wait on a UI state or use `page.wait_for_response()` matching a URL pattern directly. Full treatment in Part 5.",
      "order": 3
    },
    {
      "id": "cy-0-3-md-4",
      "type": "overview",
      "heading": "Built-in dashboard/videos/screenshots",
      "content": "Running `cypress run` (headless CI mode) can record a full video of the spec file to `cypress/videos/`. Important version nuance: video recording was on by default historically, but **Cypress 13 changed `video` to default to `false`**. If you want videos, set `video: true` explicitly. Don't assume the default — check with `npx cypress info` or read your config.\n\nPlaywright's philosophy leans toward explicit configuration for anything with a storage/performance cost (`--video=retain-on-failure`). Cypress's historically \"just works, capture everything\" approach is friendlier to a newcomer's first CI setup but can bloat CI artifact storage if a team never revisits the default (Part 11.8, Part 12.4).",
      "order": 4
    }
  ],
  "advantages": [
    "0.3 What Cypress Can Do — The command-queue vs Promise misunderstanding is the most common first-week Cypress bug."
  ],
  "limitations": [
    "0.3 What Cypress Can Do is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
