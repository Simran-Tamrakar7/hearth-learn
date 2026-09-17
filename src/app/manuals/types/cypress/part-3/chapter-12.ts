import type { ChapterRecord } from "../../../types";

/** 3.12 Mocking Dates & Timers */
export const chapter = {
  "id": "cy-3-12-mocking-dates-timers",
  "title": "3.12 Mocking Dates & Timers",
  "minutes": 26,
  "level": "intermediate",
  "phase": "Part 3 · Interacting with Elements",
  "partName": "Part 3 · Interacting with Elements",
  "overviewText": "cy.clock() replaces Date, setTimeout, setInterval, and (optionally) requestAnimationFrame in the AUT. Install the clock BEFORE cy.visit() so the app's first Date.now() is already frozen. cy.tick(ms) advances fake time without waiting on the wall clock — leave-balance year boundaries and toast dismissals become deterministic.",
  "why": "Leave accrues on calendar year; toasts die after 5s; 'overdue' badges use Date. Sleeping 5s is how suites get slow and flaky. Interviewers listen for 'clock before visit' — clock after visit misses constructors that already ran.",
  "when": "Anything that reads today's date or schedules a timer. Revisit when toasts, countdowns, or fiscal-year logic flake around midnight or in CI timezones.",
  "practical": {
    "app": "Bizlevate HRM — leave year remaining + auto-dismiss toast",
    "scenario": "Freeze date at 2026-12-31, assert '0 days remaining this year', submit leave, tick 5s, assert toast gone — without a real 5s wait.",
    "pass": "You cy.clock(Date.UTC(2026, 11, 31)) then cy.visit, interact, cy.tick(5000), assert. You restore with cy.clock().invoke('restore') only if needed.",
    "fail": "You cy.visit then cy.clock (app already read Date), or you cy.wait(5000) for the toast, or you freeze Date and break an analytics SDK without narrowing the stubbed methods."
  },
  "tools": [],
  "customSummary": "- cy.clock() before cy.visit() (or in onBeforeLoad) so the app boots under fake time.\n- cy.tick(ms) advances timers and Date together without wall-clock wait.\n- Default stubs: setTimeout, setInterval, Date; pass a method list if stubbing Date breaks a third party.\n- cy.clock(now) sets the starting epoch; month in Date.UTC is 0-based.",
  "contentMarkdown": "## Clock before visit\n\n`cy.clock()` monkey-patches the iframe's `Date` and timer functions (Part 0.5 — Cypress can do this because it shares a JS realm). If you `cy.visit` first, the bundle already ran `new Date()` for \"today\" and scheduled timeouts. Installing the clock afterward does not rewind those.\n\n```js\ncy.clock(Date.UTC(2026, 11, 31), ['Date', 'setTimeout', 'setInterval']);\ncy.visit('/leave');\ncy.get('[data-cy=days-remaining-year]').should('contain', '0');\n```\n\n`Date.UTC(2026, 11, 31)` is 31 Dec 2026 — month is **0-based**. Passing a list of methods lets you stub timers but leave `Date` real (or vice versa) when a third-party script crashes under a fake `Date`.\n\nEquivalent timing: `cy.visit('/leave', { onBeforeLoad(win) { cy.stub(win, 'Date') } })` — `cy.clock` is the supported wrapper.\n\n## `cy.tick` — fake milliseconds\n\n```js\ncy.clock();\ncy.visit('/leave');\ncy.get('[data-cy=submit]').click();\ncy.get('[data-cy=toast]').should('be.visible');\ncy.tick(5000);\ncy.get('[data-cy=toast]').should('not.exist');\n```\n\nNo `cy.wait(5000)`. Animations that use `requestAnimationFrame` may need `{ tick: true }` options or including `requestAnimationFrame` in the clock's method list (check your Cypress version docs). CSS-only transitions still need real time or an assertion that does not depend on the animation finishing.\n\n## What clock does not do\n\n- It does not freeze **server** time. If the API computes \"today\" , stub the API (Part 5) or you will mix 2026-12-31 in the UI with 2026-09-16 in JSON.\n- It does not change the Node process time (`cy.task`, your spec's `new Date()` outside `cy.window()`).\n- Some apps compare `performance.now()`; clock does not fake that unless you stub it yourself.\n\n## Restore\n\nA new test with `testIsolation` loads a new document — you usually get a fresh clock. If you installed a clock mid-spec and then need real timers: `cy.clock().then((clock) => clock.restore())` or `cy.tick` enough to flush queues. Prefer one clock policy per test: freeze at the top, tick explicitly, done.\n\n## vs Playwright\n\nPlaywright `page.clock` / `setFixedTime` (newer) is the analogue; older tests used `page.add_init_script` to patch `Date`. Same rule: install before app code runs. Cypress's `cy.tick` is everyday syntax in this ecosystem.",
  "blocks": [
    {
      "id": "cy-3-12-md-0",
      "type": "overview",
      "heading": "Clock before visit",
      "content": "`cy.clock()` monkey-patches the iframe's `Date` and timer functions (Part 0.5 — Cypress can do this because it shares a JS realm). If you `cy.visit` first, the bundle already ran `new Date()` for \"today\" and scheduled timeouts. Installing the clock afterward does not rewind those.\n\n```js\ncy.clock(Date.UTC(2026, 11, 31), ['Date', 'setTimeout', 'setInterval']);\ncy.visit('/leave');\ncy.get('[data-cy=days-remaining-year]').should('contain', '0');\n```\n\n`Date.UTC(2026, 11, 31)` is 31 Dec 2026 — month is **0-based**. Passing a list of methods lets you stub timers but leave `Date` real (or vice versa) when a third-party script crashes under a fake `Date`.\n\nEquivalent timing: `cy.visit('/leave', { onBeforeLoad(win) { cy.stub(win, 'Date') } })` — `cy.clock` is the supported wrapper.",
      "order": 0
    },
    {
      "id": "cy-3-12-md-1",
      "type": "overview",
      "heading": "`cy.tick` — fake milliseconds",
      "content": "```js\ncy.clock();\ncy.visit('/leave');\ncy.get('[data-cy=submit]').click();\ncy.get('[data-cy=toast]').should('be.visible');\ncy.tick(5000);\ncy.get('[data-cy=toast]').should('not.exist');\n```\n\nNo `cy.wait(5000)`. Animations that use `requestAnimationFrame` may need `{ tick: true }` options or including `requestAnimationFrame` in the clock's method list (check your Cypress version docs). CSS-only transitions still need real time or an assertion that does not depend on the animation finishing.",
      "order": 1
    },
    {
      "id": "cy-3-12-md-2",
      "type": "overview",
      "heading": "What clock does not do",
      "content": "- It does not freeze **server** time. If the API computes \"today\" , stub the API (Part 5) or you will mix 2026-12-31 in the UI with 2026-09-16 in JSON.\n- It does not change the Node process time (`cy.task`, your spec's `new Date()` outside `cy.window()`).\n- Some apps compare `performance.now()`; clock does not fake that unless you stub it yourself.",
      "order": 2
    },
    {
      "id": "cy-3-12-md-3",
      "type": "overview",
      "heading": "Restore",
      "content": "A new test with `testIsolation` loads a new document — you usually get a fresh clock. If you installed a clock mid-spec and then need real timers: `cy.clock().then((clock) => clock.restore())` or `cy.tick` enough to flush queues. Prefer one clock policy per test: freeze at the top, tick explicitly, done.",
      "order": 3
    },
    {
      "id": "cy-3-12-md-4",
      "type": "overview",
      "heading": "vs Playwright",
      "content": "Playwright `page.clock` / `setFixedTime` (newer) is the analogue; older tests used `page.add_init_script` to patch `Date`. Same rule: install before app code runs. Cypress's `cy.tick` is everyday syntax in this ecosystem.",
      "order": 4
    }
  ],
  "advantages": [
    "3.12 Mocking Dates & Timers — Leave accrues on calendar year; toasts die after 5s; 'overdue' badges use Date."
  ],
  "limitations": [
    "3.12 Mocking Dates & Timers is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
