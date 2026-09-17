import type { ChapterRecord } from "../../../types";

/** 3.2 Forms & Inputs */
export const chapter = {
  "id": "cy-3-2-forms-inputs",
  "title": "3.2 Forms & Inputs",
  "minutes": 26,
  "level": "intermediate",
  "phase": "Part 3 · Interacting with Elements",
  "partName": "Part 3 · Interacting with Elements",
  "overviewText": "A form test is only as good as its post-submit assertion. Happy-path plus validation-failure is the minimum pair. Use 'have.value' for inputs (they have no child text), fire real events so controlled React/Vue fields update, and prefer submitting the way the user does — click or {enter} — not form.submit() unless you are deliberately skipping UI.",
  "why": "Shallow form tests ('the button was clickable') pass while onboarding, leave, and payroll forms silently drop fields. Interviewers look for the value-vs-text distinction, controlled-input event awareness, and a validation-error spec sitting next to the happy path.",
  "when": "Any create/edit form: onboarding, leave request, payroll run, profile. Revisit when a .type() 'succeeds' but the app submits empty because the framework never saw input events.",
  "practical": {
    "app": "Bizlevate HRM — employee onboarding form",
    "scenario": "Onboard Simran Tamrakar with department, start date, and remote flag; then prove required-field errors when submitting empty.",
    "pass": "You type/select/check, click submit, assert a success banner *and* a separate spec that empty submit shows first-name and email errors. You use have.value on the email input.",
    "fail": "You only assert the submit button is enabled, or you use contain/have.text on an <input> expecting the typed value."
  },
  "tools": [],
  "customSummary": "- Assert the post-submit outcome (banner, row, URL), not merely that click did not throw.\n- Every form needs a happy-path spec and a validation-failure spec.\n- 'have.value' for input values; 'have.text'/'contain' for rendered text — <input> has no child text.\n- .type()/.check()/.select() fire real events so controlled React/Vue state updates; .invoke('val') alone may not.\n- Date/number/file inputs have extra constraints; native date often wants yyyy-mm-dd.",
  "contentMarkdown": "## A full-form test, not isolated snippets\n\n```js\ndescribe('Employee Onboarding Form', () => {\n  it('submits successfully with valid data', () => {\n    cy.visit('/onboarding/new');\n\n    cy.get('[data-cy=first-name]').type('Simran');\n    cy.get('[data-cy=last-name]').type('Tamrakar');\n    cy.get('[data-cy=email]').type('simran@bizlevate.com');\n    cy.get('[data-cy=department]').select('Quality Assurance');\n    cy.get('[data-cy=start-date]').type('2026-09-01');\n    cy.get('[data-cy=remote-checkbox]').check();\n    cy.get('[data-cy=submit]').click();\n\n    cy.get('[data-cy=success-banner]')\n      .should('be.visible')\n      .and('contain', 'Employee onboarded successfully');\n    cy.url().should('include', '/onboarding/');\n  });\n});\n```\n\nWhat makes this a *form* test rather than a click test: it asserts the actual post-submit outcome. A spec that only checks \"submit was clickable\" gives false confidence.\n\n## Validation is a second, required shape\n\n```js\nit('shows validation errors when required fields are empty', () => {\n  cy.visit('/onboarding/new');\n  cy.get('[data-cy=submit]').click();\n\n  cy.get('[data-cy=first-name-error]').should('contain', 'First name is required');\n  cy.get('[data-cy=email-error]').should('contain', 'Email is required');\n});\n```\n\nLeave, onboarding, and appraisal modules that only have happy-path coverage are a common real gap. Invalid email format, end-date before start-date, and duplicate employee ID are the next cases — still UI assertions on the error the user sees, not just HTTP 400.\n\n## Reading values: `have.value` vs `have.text`\n\n```js\ncy.get('[data-cy=email]').should('have.value', 'simran@bizlevate.com');\ncy.get('[data-cy=success-banner]').should('contain', 'onboarded');\n```\n\n`<input>` and `<textarea>` do not render their value as child text. `.should('contain', ...)` / `'have.text'` look at text nodes and will fail (or pass accidentally on a label). `'have.value'` is the Chai-jQuery assertion for the current control value — essential for edit/pre-filled forms (\"open existing employee, email is already simran@...\").\n\n## Controlled inputs and events\n\nReact/Vue/Angular typically bind `onChange`/`v-model`. `.type()` and `.check()` fire the events those bindings listen for. Directly setting the DOM with `.invoke('val', 'x')` **without** `.trigger('input')` / `'change'` often leaves framework state empty, so submit sends blanks even though the field *looks* filled in the snapshot.\n\n```js\ncy.get('[data-cy=notes]').focus().type('Approved with comments').blur();\n```\n\n`.focus()` / `.blur()` matter when the app validates on blur. Submitting with `{enter}` on the last field vs clicking Submit can exercise two handlers — cover the one users actually use, then add the other if both exist.\n\n## Input-type specifics\n\n- **date:** many browsers' native date inputs want `yyyy-mm-dd` regardless of display locale. Custom date pickers are not `<input type=\"date\">` — treat them as custom dropdowns (3.3).\n- **number:** `.type('50000')` is safer than setting value; some masks reject paste.\n- **disabled / readonly:** actionability will refuse `.type()`; that is a feature. Assert `'be.disabled'` on computed salary fields instead of forcing them.\n- **hidden file inputs:** 3.7 (`.selectFile`).\n\n## vs Playwright\n\nPlaywright `locator.fill()` sets the value and fires input events in one step; Cypress makes the append/clear split explicit. Playwright `get_by_label` pairs naturally with forms; Cypress typically uses `data-cy` plus optional Testing Library (4.4). Same rule in both tools: assert the outcome of submit, not the click.",
  "blocks": [
    {
      "id": "cy-3-2-md-0",
      "type": "overview",
      "heading": "A full-form test, not isolated snippets",
      "content": "```js\ndescribe('Employee Onboarding Form', () => {\n  it('submits successfully with valid data', () => {\n    cy.visit('/onboarding/new');\n\n    cy.get('[data-cy=first-name]').type('Simran');\n    cy.get('[data-cy=last-name]').type('Tamrakar');\n    cy.get('[data-cy=email]').type('simran@bizlevate.com');\n    cy.get('[data-cy=department]').select('Quality Assurance');\n    cy.get('[data-cy=start-date]').type('2026-09-01');\n    cy.get('[data-cy=remote-checkbox]').check();\n    cy.get('[data-cy=submit]').click();\n\n    cy.get('[data-cy=success-banner]')\n      .should('be.visible')\n      .and('contain', 'Employee onboarded successfully');\n    cy.url().should('include', '/onboarding/');\n  });\n});\n```\n\nWhat makes this a *form* test rather than a click test: it asserts the actual post-submit outcome. A spec that only checks \"submit was clickable\" gives false confidence.",
      "order": 0
    },
    {
      "id": "cy-3-2-md-1",
      "type": "overview",
      "heading": "Validation is a second, required shape",
      "content": "```js\nit('shows validation errors when required fields are empty', () => {\n  cy.visit('/onboarding/new');\n  cy.get('[data-cy=submit]').click();\n\n  cy.get('[data-cy=first-name-error]').should('contain', 'First name is required');\n  cy.get('[data-cy=email-error]').should('contain', 'Email is required');\n});\n```\n\nLeave, onboarding, and appraisal modules that only have happy-path coverage are a common real gap. Invalid email format, end-date before start-date, and duplicate employee ID are the next cases — still UI assertions on the error the user sees, not just HTTP 400.",
      "order": 1
    },
    {
      "id": "cy-3-2-md-2",
      "type": "overview",
      "heading": "Reading values: `have.value` vs `have.text`",
      "content": "```js\ncy.get('[data-cy=email]').should('have.value', 'simran@bizlevate.com');\ncy.get('[data-cy=success-banner]').should('contain', 'onboarded');\n```\n\n`<input>` and `<textarea>` do not render their value as child text. `.should('contain', ...)` / `'have.text'` look at text nodes and will fail (or pass accidentally on a label). `'have.value'` is the Chai-jQuery assertion for the current control value — essential for edit/pre-filled forms (\"open existing employee, email is already simran@...\").",
      "order": 2
    },
    {
      "id": "cy-3-2-md-3",
      "type": "overview",
      "heading": "Controlled inputs and events",
      "content": "React/Vue/Angular typically bind `onChange`/`v-model`. `.type()` and `.check()` fire the events those bindings listen for. Directly setting the DOM with `.invoke('val', 'x')` **without** `.trigger('input')` / `'change'` often leaves framework state empty, so submit sends blanks even though the field *looks* filled in the snapshot.\n\n```js\ncy.get('[data-cy=notes]').focus().type('Approved with comments').blur();\n```\n\n`.focus()` / `.blur()` matter when the app validates on blur. Submitting with `{enter}` on the last field vs clicking Submit can exercise two handlers — cover the one users actually use, then add the other if both exist.",
      "order": 3
    },
    {
      "id": "cy-3-2-md-4",
      "type": "overview",
      "heading": "Input-type specifics",
      "content": "- **date:** many browsers' native date inputs want `yyyy-mm-dd` regardless of display locale. Custom date pickers are not `<input type=\"date\">` — treat them as custom dropdowns (3.3).\n- **number:** `.type('50000')` is safer than setting value; some masks reject paste.\n- **disabled / readonly:** actionability will refuse `.type()`; that is a feature. Assert `'be.disabled'` on computed salary fields instead of forcing them.\n- **hidden file inputs:** 3.7 (`.selectFile`).",
      "order": 4
    },
    {
      "id": "cy-3-2-md-5",
      "type": "overview",
      "heading": "vs Playwright",
      "content": "Playwright `locator.fill()` sets the value and fires input events in one step; Cypress makes the append/clear split explicit. Playwright `get_by_label` pairs naturally with forms; Cypress typically uses `data-cy` plus optional Testing Library (4.4). Same rule in both tools: assert the outcome of submit, not the click.",
      "order": 5
    }
  ],
  "advantages": [
    "3.2 Forms & Inputs — Shallow form tests ('the button was clickable') pass while onboarding, leave, and payroll forms silently drop fields."
  ],
  "limitations": [
    "3.2 Forms & Inputs is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
