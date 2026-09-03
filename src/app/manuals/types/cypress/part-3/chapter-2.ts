import type { ChapterRecord } from "../../../types";

/** 16. Forms & Inputs */
export const chapter = {
  id: "cy-16-forms",
  title: "16. Forms & Inputs",
  minutes: 28,
  level: "intermediate",
  phase: "Part 3 · Actions",
  partName: "Part 3 · Actions",
  overviewText: "Comprehensive coverage of Forms & Inputs in Cypress with code examples, Playwright comparisons, and interview-ready depth paired with the Playwright manual.",
  tools: [],
  customSummary: "- Good form tests assert the actual post-submit outcome, not just \"click didn't error.\"\n- Every form needs both a happy-path test and a validation-failure test.\n- 'have.value' (input's current value) vs 'have.text'/'contain' (rendered text) — common early mix-up.",
  contentMarkdown: "## A representative full-form test — worth walking through end to end rather than isolated snippets\n\n```javascript\ndescribe('Employee Onboarding Form', () => {\n  it('submits successfully with valid data', () => {\n    cy.visit('/onboarding/new');\n\n    cy.get('[data-cy=first-name]').type('Simran');\n    cy.get('[data-cy=last-name]').type('Tamrakar');\n    cy.get('[data-cy=email]').type('simran@bizlevate.com');\n    cy.get('[data-cy=department]').select('Quality Assurance');\n    cy.get('[data-cy=start-date]').type('2026-09-01');\n    cy.get('[data-cy=remote-checkbox]').check();\n    cy.get('[data-cy=submit]').click();\n\n    cy.get('[data-cy=success-banner]').should('be.visible')\n      .and('contain', 'Employee onboarded successfully');\n  });\n});\nWorth calling out what makes this a good form test versus a shallow one: it asserts on the actual post-submit outcome (a visible success banner with specific text), not merely that the click didn't throw an error. A form test that only checks \"the submit button was clickable\" gives false confidence — the meaningful assertion is always about what happened as a result of the submission.\n```\n\n## Validation error states — a second, equally important test shape for any form\n\n```javascript\nit('shows validation errors when required fields are empty', () => {\n  cy.visit('/onboarding/new');\n  cy.get('[data-cy=submit]').click();\n\n  cy.get('[data-cy=first-name-error]').should('contain', 'First name is required');\n  cy.get('[data-cy=email-error]').should('contain', 'Email is required');\n});\nEvery form worth testing at all deserves at least one happy-path test and at least one validation-failure test — a form module (Leave requests, Onboarding, Appraisal forms in an HRM context) that only has happy-path coverage is a common, real gap worth deliberately avoiding.\n```\n\n## Reading back a form's current values — useful for testing pre-filled/edit forms\n\n```javascript\ncy.get('[data-cy=email]').should('have.value', 'simran@bizlevate.com');\n'have.value' (a Chai-jQuery assertion, Chapter 14) is specifically for form input values — distinct from 'have.text' or 'contain', which check rendered text content, not an input's current value attribute. Mixing these up (asserting 'contain' on an <input>, expecting it to check the typed value) is a common early mistake, since <input> elements don't render their value as visible child text content the way a <div> does.\n```",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
