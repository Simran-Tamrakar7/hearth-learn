import type { ChapterRecord } from "../../../types";

/** 9.4 Shadow DOM Support */
export const chapter = {
  "id": "cy-9-4-shadow-dom-support",
  "title": "9.4 Shadow DOM Support",
  "minutes": 22,
  "level": "advanced",
  "phase": "Part 9 · Advanced Topics",
  "partName": "Part 9 · Advanced Topics",
  "overviewText": "Open Shadow DOM is reachable in Cypress only when you opt in: per-query .shadow() or the global/test includeShadowDom flag. Closed shadow roots stay closed — no test tool gets a free pass. Playwright pierces open shadow trees by default; Selenium requires getShadowRoot() / ShadowRoot.cy.",
  "why": "Design-system buttons, date pickers, and third-party web components hide their internals in shadow trees. A cy.get('.inner-label') that works in DevTools-on-the-flattened-tree will timeout in Cypress until you pierce.",
  "when": "Any control implemented as a custom element (leave-type dropdown, file chip, design-system Modal). Also when a test 'sees' an element in the browser but Cypress reports 0 matches.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "The Leave Type control is <hrm-select> with an open shadow root containing input.native-input. You must type 'Annual' and choose the option.",
    "pass": "You use cy.get('hrm-select').shadow().find('input.native-input') or set includeShadowDom: true for that get, then type and assert.",
    "fail": "You cy.get('input.native-input') as if the shadow tree were a normal descendant, or you assume Playwright-style automatic piercing."
  },
  "tools": [],
  "customSummary": "- Default Cypress queries do not cross shadow boundaries.\n- Pierce with .shadow() on a host, or includeShadowDom: true (config, cy.get options, or Cypress.config).\n- Closed mode shadow roots are not queryable — test via published API, slots, or accessibility tree, not internals.\n- Playwright: open shadow pierced by default. Selenium: explicit getShadowRoot().\n- Prefer page objects that encapsulate the host + shadow find so specs do not leak internals.",
  "contentMarkdown": "## The default that surprises people\n\n```js\ncy.get('input.native-input'); // 0 matches — it lives under <hrm-select>'s shadow root\n```\n\nLight DOM `querySelector` does not enter shadow trees. Cypress uses that same model unless you opt in. Playwright's locator engine *does* pierce open shadow DOM by default, which is why a copied Playwright selector can fail in Cypress even when \"the element is obviously there.\"\n\n## Per-element pierce\n\n```js\ncy.get('[data-cy=leave-type-host]')\n  .shadow()\n  .find('input.native-input')\n  .type('Annual{enter}');\n```\n\n`.shadow()` yields the shadow root of the current subject (must be a host element). Then `.find()` / `.contains()` run inside that root.\n\n## Opt-in globally or per command\n\n```js\n// cypress.config.ts\nexport default defineConfig({\n  e2e: { includeShadowDom: true },\n});\n\n// or one query\ncy.get('hrm-select', { includeShadowDom: true })\n  .find('input.native-input')\n  .type('Annual');\n```\n\nGlobal `includeShadowDom: true` is convenient for a design-system-heavy HRM. It also makes selectors more expensive and can match *through* components you did not intend. Prefer host-then-`.shadow()` in shared commands (`cy.getLeaveType()` ) so the pierce is named.\n\n## Closed shadow roots\n\nIf the component was created with `{ mode: 'closed' }`, neither Cypress, Playwright, nor honest Selenium tests should scrape internals. Drive it like a user: slots, visible text, `data-cy` on the host, or the component's public events. If you cannot, that is a testability bug in the component, not a Cypress gap.\n\n## Versus Playwright and Selenium\n\n| | Cypress | Playwright | Selenium 4 |\n|---|---|---|---|\n| Open shadow | Opt-in (`.shadow()` / `includeShadowDom`) | Pierced by default | `element.getShadowRoot()` then find |\n| Closed shadow | No | No (by design) | No |\n| Nested shadows | Chain `.shadow()` | Locator still pierces open trees | Chain getShadowRoot |\n\nInterview line: \"Cypress does not pierce shadow by default. I `.shadow()` from the host or set `includeShadowDom`. Closed roots stay a contract with the component, not a locator problem.\"",
  "blocks": [
    {
      "id": "cy-9-4-md-0",
      "type": "overview",
      "heading": "The default that surprises people",
      "content": "```js\ncy.get('input.native-input'); // 0 matches — it lives under <hrm-select>'s shadow root\n```\n\nLight DOM `querySelector` does not enter shadow trees. Cypress uses that same model unless you opt in. Playwright's locator engine *does* pierce open shadow DOM by default, which is why a copied Playwright selector can fail in Cypress even when \"the element is obviously there.\"",
      "order": 0
    },
    {
      "id": "cy-9-4-md-1",
      "type": "overview",
      "heading": "Per-element pierce",
      "content": "```js\ncy.get('[data-cy=leave-type-host]')\n  .shadow()\n  .find('input.native-input')\n  .type('Annual{enter}');\n```\n\n`.shadow()` yields the shadow root of the current subject (must be a host element). Then `.find()` / `.contains()` run inside that root.",
      "order": 1
    },
    {
      "id": "cy-9-4-md-2",
      "type": "overview",
      "heading": "Opt-in globally or per command",
      "content": "```js\n// cypress.config.ts\nexport default defineConfig({\n  e2e: { includeShadowDom: true },\n});\n\n// or one query\ncy.get('hrm-select', { includeShadowDom: true })\n  .find('input.native-input')\n  .type('Annual');\n```\n\nGlobal `includeShadowDom: true` is convenient for a design-system-heavy HRM. It also makes selectors more expensive and can match *through* components you did not intend. Prefer host-then-`.shadow()` in shared commands (`cy.getLeaveType()` ) so the pierce is named.",
      "order": 2
    },
    {
      "id": "cy-9-4-md-3",
      "type": "overview",
      "heading": "Closed shadow roots",
      "content": "If the component was created with `{ mode: 'closed' }`, neither Cypress, Playwright, nor honest Selenium tests should scrape internals. Drive it like a user: slots, visible text, `data-cy` on the host, or the component's public events. If you cannot, that is a testability bug in the component, not a Cypress gap.",
      "order": 3
    },
    {
      "id": "cy-9-4-md-4",
      "type": "overview",
      "heading": "Versus Playwright and Selenium",
      "content": "| | Cypress | Playwright | Selenium 4 |\n|---|---|---|---|\n| Open shadow | Opt-in (`.shadow()` / `includeShadowDom`) | Pierced by default | `element.getShadowRoot()` then find |\n| Closed shadow | No | No (by design) | No |\n| Nested shadows | Chain `.shadow()` | Locator still pierces open trees | Chain getShadowRoot |\n\nInterview line: \"Cypress does not pierce shadow by default. I `.shadow()` from the host or set `includeShadowDom`. Closed roots stay a contract with the component, not a locator problem.\"",
      "order": 4
    }
  ],
  "advantages": [
    "9.4 Shadow DOM Support — Design-system buttons, date pickers, and third-party web components hide their internals in shadow trees."
  ],
  "limitations": [
    "9.4 Shadow DOM Support is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
