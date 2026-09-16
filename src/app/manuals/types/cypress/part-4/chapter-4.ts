import type { ChapterRecord } from "../../../types";

/** 4.4 Custom Selectors / Testing Library Plugin */
export const chapter = {
  "id": "cy-4-4-custom-selectors-testing-library-plugin",
  "title": "4.4 Custom Selectors / Testing Library Plugin",
  "minutes": 26,
  "level": "intermediate",
  "phase": "Part 4 · Locator Strategy",
  "partName": "Part 4 · Locator Strategy",
  "overviewText": "@testing-library/cypress adds findByRole, findByLabelText, findByPlaceholderText, findByText, findByTestId — queries that fail if the UI is not accessible. The practical Cypress style is hybrid: findByRole when the accessible name is stable, data-cy/data-testid for icon-only or ambiguous controls. Configure testIdAttribute if the team standardized on data-cy instead of data-testid.",
  "why": "Role queries catch missing labels (a product bug) instead of papering over them with CSS. Interviewers like 'I use Testing Library in Cypress for a11y queries and data-cy where roles collide.' Custom commands (Part 8) wrap the team's chosen query, not a new selector engine.",
  "when": "Forms with proper labels, buttons with accessible names, and teams already on Testing Library for unit/CT. Revisit when findByRole('button', { name: 'Submit' }) matches two submits — then add data-cy or tighten name.",
  "practical": {
    "app": "Bizlevate HRM — labeled onboarding form plus icon-only approve in a table",
    "scenario": "Fill email via its label, click Submit via role, approve a row via data-cy on the icon button.",
    "pass": "You findByLabelText('Email'), findByRole('button', { name: 'Submit' }), and cy.contains('tr', 'Simran').find('[data-cy=approve]'). You configure testIdAttribute if using data-cy with findByTestId.",
    "fail": "You install Testing Library then still cy.get('.btn') everywhere, or you findByTestId('approve') without setting testIdAttribute while the markup is data-cy, or you use findByRole without a name and match 40 buttons."
  },
  "tools": [],
  "customSummary": "- Plugin: @testing-library/cypress — findByRole / Label / Placeholder / Text / TestId (and get/query variants).\n- Hybrid: roles+labels for accessible, labeled UI; data-cy for icon-only, duplicates, and implementation hooks.\n- findByTestId reads data-testid by default — map testIdAttribute to data-cy if that is the convention.\n- Custom commands wrap queries; they do not replace a locator strategy.",
  "contentMarkdown": "## What the plugin adds\n\n```js\n// npm i -D @testing-library/cypress\n// support/e2e.js\nimport '@testing-library/cypress/add-commands';\n\ncy.findByLabelText('Email').type('simran@bizlevate.com');\ncy.findByRole('button', { name: 'Submit' }).click();\ncy.findByPlaceholderText('Search employees').type('Simran');\ncy.findByText('Employee onboarded successfully').should('be.visible');\ncy.findByTestId('submit-leave').click();\n```\n\n`findBy*` retries (async, like Cypress commands). `getBy*` is immediate and throws if missing — usually the wrong default inside Cypress. `queryBy*` returns null for absence assertions.\n\n`findByRole('button', { name: 'Submit' })` uses the **accessible name** (visible text, `aria-label`, labelled-by). If Submit is an icon with no name, the query fails — that is a gift: fix the button for users, or add `aria-label` / `data-cy` deliberately.\n\n## Hybrid strategy (recommended)\n\nTesting Library in Cypress is not \"instead of `data-cy`.\" It is a second query API:\n\n- **Use `findByRole` / `findByLabelText`** when the control has a unique accessible name you would bet on (Submit on a single-form page, Email label).\n- **Use `data-cy` / `data-testid`** when names collide (two Submit buttons), when the control is icon-only (approve checkmark), when the accessible name is dynamic (\"Approve Simran Tamrakar\" in 50 rows — then the **row idiom** plus `data-cy=approve` is clearer), or when i18n would force you to parametrize every role name.\n\n```js\ncy.findByLabelText('First name').type('Simran');\ncy.contains('tr', 'Simran Tamrakar').find('[data-cy=approve]').click();\n```\n\nThat hybrid is how you get a11y pressure *and* stable tables.\n\n## `data-cy` vs `findByTestId`\n\n`findByTestId('submit-leave')` looks up **`data-testid`** by default. If the Cypress team standardized on `data-cy` (4.1):\n\n```js\nimport { configure } from '@testing-library/cypress';\nconfigure({ testIdAttribute: 'data-cy' });\n```\n\nWithout that, `findByTestId` and `[data-cy=...]` silently disagree. Pick one attribute (4.1) and configure the plugin to match.\n\n## Custom commands are not a selector strategy\n\n```js\nCypress.Commands.add('getCy', (id) => cy.get(`[data-cy=${id}]`));\n```\n\nA one-liner wrapper is fine (Part 8). It does not fix a policy of targeting `.btn-primary`. Do not invent a parallel query language (`cy.tada()`, `cy.hrmButton()`) until the team actually repeats the same 5-step sequence.\n\nShadow DOM and iframes are still their own chapters (9.4, 3.6). Testing Library queries the document you give it; they will not pierce an iframe without the wrap pattern.\n\n## vs Playwright\n\nPlaywright built `get_by_role` / `get_by_label` / `get_by_test_id` into core. Cypress kept `cy.get` as CSS and let Testing Library remain a plugin. The hybrid answer is how you talk about both manuals in one interview: \"Playwright leads with role; Cypress leads with `cy.get` + `data-cy`; I add Testing Library to Cypress when I want the same role queries.\"\"",
  "advantages": [
    "4.4 Custom Selectors / Testing Library Plugin — Role queries catch missing labels (a product bug) instead of papering over them with CSS."
  ],
  "limitations": [
    "4.4 Custom Selectors / Testing Library Plugin is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
