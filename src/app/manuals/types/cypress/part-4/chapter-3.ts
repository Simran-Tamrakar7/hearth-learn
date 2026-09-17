import type { ChapterRecord } from "../../../types";

/** 4.3 DOM Traversal */
export const chapter = {
  "id": "cy-4-3-dom-traversal",
  "title": "4.3 DOM Traversal",
  "minutes": 28,
  "level": "intermediate",
  "phase": "Part 4 · Locator Strategy",
  "partName": "Part 4 · Locator Strategy",
  "overviewText": "Cypress traversal (.find, .parent, .children, .closest, .eq, .filter, .within) is jQuery-shaped and retryable while chained with .should. .within() scopes later get/contains to a subtree — until a React portal renders the dropdown or modal on document.body, outside that subtree. Prefer contains(sel, text).find() over long parent().parent() chains.",
  "why": "Traversal chains rot when markup gains a wrapper div. The portal + within gotcha is the one that looks like a Cypress bug. Interviews may ask you to refactor a .parent().parent().next() into a row idiom or a data-cy.",
  "when": "Scoped forms, tables, nested cards. Revisit when .within() cannot see an open Select/Modal that you can see on screen.",
  "practical": {
    "app": "Bizlevate HRM — onboarding form card + Ant Design department Select",
    "scenario": "Fill first name inside the onboarding card using .within(), then choose a department whose options portal to body.",
    "pass": "You .within() the card for in-flow fields; you query the portaled list from body (3.3). You do not parent() chains to reach Approve.",
    "fail": "You wrap the whole test in .within('[data-cy=onboarding-card]') and look for .ant-select-item inside it, or you .eq(4).parent().parent().find('button')."
  },
  "tools": [],
  "customSummary": "- .find / .children / .parent / .parents / .closest / .siblings / .next / .prev / .eq / .first / .last / .filter / .not — jQuery traversal, Cypress-retrying on the chain.\n- .within() scopes cy.get/contains to the subject — excellent for forms; blind to portals.\n- Portal gotcha: menus/modals on document.body are outside .within() roots.\n- Prefer data-cy + contains(row, text).find() over walking the tree.",
  "contentMarkdown": "## Traversal is jQuery, with retries\n\n```js\ncy.get('[data-cy=leave-table]').find('tbody tr');\ncy.get('[data-cy=approve]').closest('tr');\ncy.get('[data-cy=wizard]').children('[data-cy=step]');\ncy.get('[data-cy=tabs]').eq(1).click();\ncy.get('[data-cy=errors]').filter('.critical');\ncy.contains('tr', 'Simran Tamrakar').next(); // next row — usually too brittle\n```\n\n`.find()` is descendant (the one you want constantly). `.children()` is one level. `.closest()` walks up to the first matching ancestor (row from a button). `.eq(n)` is 0-based index — couple it to a stable sort or do not use it.\n\nThese commands retry with the query behind them when followed by `.should`, same as Part 2 retry-ability. A chain that ends in `.then(($el) => $el.parent())` does **not** retry. Stay on Cypress commands.\n\n## `.within()` — scoped queries\n\n```js\ncy.get('[data-cy=onboarding-card]').within(() => {\n  cy.get('[data-cy=first-name]').type('Simran');\n  cy.get('[data-cy=last-name]').type('Tamrakar');\n  cy.get('[data-cy=submit]').click();\n});\n```\n\nInside the callback, `cy.get` and `cy.contains` are rooted at the card. That prevents matching a *different* first-name on the page (employee search in the header). Nested `.within()` is legal and easy to overuse.\n\n## Portal gotcha\n\n`.within()` cannot see nodes that are not descendants of its subject. React `createPortal`, MUI `Modal`, Ant Design `Select` dropdowns, and many date pickers mount under `document.body`.\n\n```js\ncy.get('[data-cy=onboarding-card]').within(() => {\n  cy.get('[data-cy=department]').click();\n  cy.contains('Quality Assurance').click(); // 0 matches — list is on body\n});\n```\n\nFix: close `.within()` before interacting with the overlay, or never wrap the open-dropdown step:\n\n```js\ncy.get('[data-cy=onboarding-card]').within(() => {\n  cy.get('[data-cy=first-name]').type('Simran');\n});\ncy.get('[data-cy=department]').click();\ncy.get('.ant-select-dropdown:visible').contains('Quality Assurance').click();\n```\n\nSame bug with `.find()` off the card. If DevTools shows the node under `body > div.ant-select-dropdown`, your within-root is wrong, not Cypress \"failing to retry.\"\n\n## Anti-patterns\n\n```js\ncy.get('button').parent().parent().parent().find('span').eq(2);\n```\n\nOne extra wrapper from a design-system upgrade breaks this. Replace with `data-cy` or `cy.contains('tr', name).find('[data-cy=approve]')`.\n\n`.shadow()` exists for shadow DOM (Part 9.4) — another boundary `.within()` does not cross unless configured.\n\n## vs Playwright\n\nPlaywright locators are lazy and chain `locator.get_by_role` inside a parent locator — similar to within, and they have the **same** portal issue if you scope to a locator that does not include the portal. Playwright's default `page.get_by_role('option')` searches the page, which often *helps* with portals. Cypress `.within` is opt-in narrowing; remember to opt out for overlays.",
  "blocks": [
    {
      "id": "cy-4-3-md-0",
      "type": "overview",
      "heading": "Traversal is jQuery, with retries",
      "content": "```js\ncy.get('[data-cy=leave-table]').find('tbody tr');\ncy.get('[data-cy=approve]').closest('tr');\ncy.get('[data-cy=wizard]').children('[data-cy=step]');\ncy.get('[data-cy=tabs]').eq(1).click();\ncy.get('[data-cy=errors]').filter('.critical');\ncy.contains('tr', 'Simran Tamrakar').next(); // next row — usually too brittle\n```\n\n`.find()` is descendant (the one you want constantly). `.children()` is one level. `.closest()` walks up to the first matching ancestor (row from a button). `.eq(n)` is 0-based index — couple it to a stable sort or do not use it.\n\nThese commands retry with the query behind them when followed by `.should`, same as Part 2 retry-ability. A chain that ends in `.then(($el) => $el.parent())` does **not** retry. Stay on Cypress commands.",
      "order": 0
    },
    {
      "id": "cy-4-3-md-1",
      "type": "overview",
      "heading": "`.within()` — scoped queries",
      "content": "```js\ncy.get('[data-cy=onboarding-card]').within(() => {\n  cy.get('[data-cy=first-name]').type('Simran');\n  cy.get('[data-cy=last-name]').type('Tamrakar');\n  cy.get('[data-cy=submit]').click();\n});\n```\n\nInside the callback, `cy.get` and `cy.contains` are rooted at the card. That prevents matching a *different* first-name on the page (employee search in the header). Nested `.within()` is legal and easy to overuse.",
      "order": 1
    },
    {
      "id": "cy-4-3-md-2",
      "type": "overview",
      "heading": "Portal gotcha",
      "content": "`.within()` cannot see nodes that are not descendants of its subject. React `createPortal`, MUI `Modal`, Ant Design `Select` dropdowns, and many date pickers mount under `document.body`.\n\n```js\ncy.get('[data-cy=onboarding-card]').within(() => {\n  cy.get('[data-cy=department]').click();\n  cy.contains('Quality Assurance').click(); // 0 matches — list is on body\n});\n```\n\nFix: close `.within()` before interacting with the overlay, or never wrap the open-dropdown step:\n\n```js\ncy.get('[data-cy=onboarding-card]').within(() => {\n  cy.get('[data-cy=first-name]').type('Simran');\n});\ncy.get('[data-cy=department]').click();\ncy.get('.ant-select-dropdown:visible').contains('Quality Assurance').click();\n```\n\nSame bug with `.find()` off the card. If DevTools shows the node under `body > div.ant-select-dropdown`, your within-root is wrong, not Cypress \"failing to retry.\"",
      "order": 2
    },
    {
      "id": "cy-4-3-md-3",
      "type": "overview",
      "heading": "Anti-patterns",
      "content": "```js\ncy.get('button').parent().parent().parent().find('span').eq(2);\n```\n\nOne extra wrapper from a design-system upgrade breaks this. Replace with `data-cy` or `cy.contains('tr', name).find('[data-cy=approve]')`.\n\n`.shadow()` exists for shadow DOM (Part 9.4) — another boundary `.within()` does not cross unless configured.",
      "order": 3
    },
    {
      "id": "cy-4-3-md-4",
      "type": "overview",
      "heading": "vs Playwright",
      "content": "Playwright locators are lazy and chain `locator.get_by_role` inside a parent locator — similar to within, and they have the **same** portal issue if you scope to a locator that does not include the portal. Playwright's default `page.get_by_role('option')` searches the page, which often *helps* with portals. Cypress `.within` is opt-in narrowing; remember to opt out for overlays.",
      "order": 4
    }
  ],
  "advantages": [
    "4.3 DOM Traversal — Traversal chains rot when markup gains a wrapper div."
  ],
  "limitations": [
    "4.3 DOM Traversal is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
