import type { ChapterRecord } from "../../../types";

/** 4.1 Selector Strategies */
export const chapter = {
  "id": "cy-4-1-selector-strategies",
  "title": "4.1 Selector Strategies",
  "minutes": 30,
  "level": "intermediate",
  "phase": "Part 4 · Locator Strategy",
  "partName": "Part 4 · Locator Strategy",
  "overviewText": "Prefer dedicated test hooks: data-cy is Cypress's documented convention; data-testid is the Testing Library / Playwright convention. Both beat CSS classes and nth-child. Roles and labels are next for accessible UI; ids and names are acceptable when stable. Selector Playground is a starting hint, not a strategy.",
  "why": "Locator policy is how suites survive redesigns. Interviewers ask data-cy vs data-testid to see if you have worked in mixed Cypress/Playwright or Testing Library shops — the answer is 'pick one team-wide, know the ecosystem each signals,' not a religious war.",
  "when": "Before writing the first cy.get in a new app, and in every PR review. Revisit when i18n (Part 9.10) breaks text selectors or a CSS module hash changes.",
  "practical": {
    "app": "Bizlevate HRM — leave submit button restyled by design",
    "scenario": "The Submit button class goes from .btn-primary to .btn-solid; copy stays 'Submit' in EN and becomes 'पेश गर्नुहोस्' in NE.",
    "pass": "You cy.get('[data-cy=submit-leave]') (or agreed data-testid) and the spec survives CSS and locale changes. You document the attribute in a frontend convention.",
    "fail": "You cy.get('.btn-primary.mt-2 > span') from the Playground copy-paste, or you cy.contains('Submit') as the only locator in an i18n app."
  },
  "tools": [],
  "customSummary": "- Best: data-cy (Cypress docs) or data-testid (Testing Library / Playwright) — team picks one.\n- Then: role/label/placeholder, stable id/name, unique attributes.\n- Avoid: CSS classes, tag soup, nth-child, text that will be translated.\n- Selector Playground suggests a selector + match count — unique ≠ stable.\n- data-cy='submit-leave' beats data-cy='button' — namespacing matters.",
  "contentMarkdown": "## The stability ladder\n\nFrom most to least stable for Cypress E2E:\n\n1. **`data-cy` / `data-testid` / `data-test`** — attributes that exist *for tests*. Decoupled from styling and copy.\n2. **Accessible queries** — `name`, `role`, `<label for>`, placeholder when they are unique and product-owned.\n3. **Stable semantic ids** — `id=\"employee-email\"` if developers will not hash them.\n4. **CSS classes / `nth-child` / deep combinators** — last resort; they describe implementation.\n\n```js\ncy.get('[data-cy=submit-leave]').click();\ncy.get('[data-testid=submit-leave]').click(); // also fine if that is the team standard\ncy.get('#employee-email').type('simran@bizlevate.com');\ncy.get('.btn-primary.mt-2:nth-child(3)').click(); // do not\n```\n\n## `data-cy` vs `data-testid`\n\nCypress documentation and the Selector Playground historically push **`data-cy`**. Testing Library, Playwright (`get_by_test_id`), and many React codebases standardize on **`data-testid`**.\n\nThey are the same *idea*: a contract between app and tests. Differences that matter in a mixed shop:\n\n- **`data-cy`** signals \"this hook was added for Cypress.\" Frontend engineers grepping `data-cy` find Cypress-only markup.\n- **`data-testid`** is tool-agnostic — the same attribute feeds Cypress, Playwright, and Testing Library component tests.\n- Cypress `cy.get('[data-cy=...]')` vs Testing Library `findByTestId` (4.4) — `findByTestId` looks at `data-testid` by default, **not** `data-cy`, unless you configure `testIdAttribute`.\n\nPick **one** primary attribute in the project README. Dual-tagging every button is noise. If the org already has Playwright specs on `data-testid`, Cypress should join that convention rather than invent `data-cy` in parallel.\n\nValues should be **unique and intention-revealing**: `submit-leave`, `approve-row`, `employee-search`. `data-cy=\"button\"` on twelve buttons is as bad as `.btn`.\n\n## Text and CSS\n\n`cy.contains('Submit')` is readable and fails when marketing changes the label or locale switches (Part 9.10). Use text for assertions *on* copy (`should('contain', 'Employee onboarded')`), not as the primary locator for the control you must click in every locale.\n\nCSS modules and Tailwind generate unstable class names. Even BEM `.leave-form__submit` dies in a redesign. Classes are for styling; tests should not rent them.\n\n## Selector Playground\n\nThe Playground (Part 0.7) clicks an element and proposes a selector with a live match count. \"1 matched\" means unique *today*, not stable *next sprint*. Prefer rewriting Playground output to `data-cy`. Use the match count to catch accidental lists (`cy.get('.item')` → 47).\n\n## vs Playwright\n\nPlaywright's published ladder is get_by_role → label → placeholder → text → test id → CSS. Cypress culture historically inverted that (test id first) because `cy.get` is CSS-native and role queries needed a plugin (4.4). A hybrid team can still prefer roles for a11y (4.4) while keeping `data-cy` for icon-only buttons with no accessible name yet — then file a product bug for the missing name.",
  "advantages": [
    "4.1 Selector Strategies — Locator policy is how suites survive redesigns."
  ],
  "limitations": [
    "4.1 Selector Strategies is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
