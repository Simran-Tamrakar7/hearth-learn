import type { ChapterRecord } from "../../../types";

/** 9.5 Component Testing (Cypress CT) */
export const chapter = {
  "id": "cy-9-5-component-testing-cypress-ct",
  "title": "9.5 Component Testing (Cypress CT)",
  "minutes": 35,
  "level": "advanced",
  "phase": "Part 9 · Advanced Topics",
  "partName": "Part 9 · Advanced Topics",
  "overviewText": "Cypress Component Testing mounts one component with cy.mount() into a real browser page — same cy.get/click/type as E2E, no running HRM server, router, or database. A separate component: {} config block and specs that live next to the component are the convention. CT answers 'does this piece work given these props?'; E2E answers 'does the integrated product work?' Neither replaces the other.",
  "why": "LeaveRequestForm edge cases (zero balance, 500-row cost centers, disabled submit) are expensive as E2E and cheap as CT. Interviewers want that distinction, plus the fact that Playwright CT exists but is less central, and Selenium has no equivalent.",
  "when": "When building or refactoring a React/Vue/Angular component with meaningful UI states. Not as a substitute for login→submit→approve journeys.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You must cover LeaveRequestForm: empty, valid Annual leave, remainingBalance=0, and that onSubmit receives the right payload — without seeding payroll data.",
    "pass": "You add a component config, colocate LeaveRequestForm.cy.tsx, cy.mount(<LeaveRequestForm ... />), stub onSubmit, and keep one E2E for the real submit/approve path.",
    "fail": "You only write E2E for every prop combination, or you claim CT makes E2E unnecessary."
  },
  "tools": [],
  "customSummary": "- cy.mount(component) renders isolated UI in a real browser with the same commands as E2E.\n- e2e and component are separate config blocks (devServer framework + bundler).\n- Specs conventionally sit beside the component, not only under cypress/e2e.\n- CT ≠ E2E: isolation and speed vs real routing, APIs, and cross-page state.\n- Playwright has component testing later/less central; Selenium has none — this is a Cypress strong suit.",
  "contentMarkdown": "## Setup is a second testing type, not a flag on E2E\n\n`npx cypress open` → Component Testing → framework wizard. Cypress detects React/Vue/Angular/Svelte and Vite/Webpack and writes a **separate** block:\n\n```js\nimport { defineConfig } from 'cypress';\n\nexport default defineConfig({\n  e2e: { baseUrl: 'http://localhost:3000' },\n  component: {\n    devServer: { framework: 'react', bundler: 'vite' },\n  },\n});\n```\n\nTwo launchpad choices, two spec globs, two Dev Server stories. Do not point E2E `baseUrl` at a mounted component — there is no app server in CT.\n\n## A Bizlevate example\n\n```jsx\n// src/components/LeaveRequestForm.cy.jsx\nimport LeaveRequestForm from './LeaveRequestForm';\n\ndescribe('LeaveRequestForm', () => {\n  it('keeps submit disabled until required fields are set', () => {\n    cy.mount(<LeaveRequestForm employeeId={42} remainingBalance={10} />);\n    cy.get('[data-cy=submit]').should('be.disabled');\n    cy.get('[data-cy=leave-type]').select('Annual');\n    cy.get('[data-cy=start-date]').type('2026-09-10');\n    cy.get('[data-cy=end-date]').type('2026-09-12');\n    cy.get('[data-cy=submit]').should('not.be.disabled');\n  });\n\n  it('warns when remainingBalance is 0', () => {\n    cy.mount(<LeaveRequestForm employeeId={42} remainingBalance={0} />);\n    cy.get('[data-cy=balance-warning]')\n      .should('be.visible')\n      .and('contain', 'No remaining leave balance');\n  });\n\n  it('calls onSubmit with the form payload', () => {\n    const onSubmit = cy.stub().as('onSubmit');\n    cy.mount(<LeaveRequestForm employeeId={42} remainingBalance={8} onSubmit={onSubmit} />);\n    cy.get('[data-cy=leave-type]').select('Annual');\n    cy.get('[data-cy=start-date]').type('2026-09-10');\n    cy.get('[data-cy=end-date]').type('2026-09-12');\n    cy.get('[data-cy=submit]').click();\n    cy.get('@onSubmit').should('have.been.called');\n  });\n});\n```\n\nThe zero-balance test is the teaching point: in E2E you would drain a real employee's allotment. In CT you pass a prop.\n\n## CT vs E2E (memorize this)\n\n| Question | Component test | E2E test |\n|---|---|---|\n| Does the date picker reject end < start? | Yes — cheap | Possible, slow |\n| Does manager-approve update payroll? | No — no API/DB | Yes |\n| Real router + auth cookies? | Mocked or absent | Real (or `cy.session`) |\n| Speed | Milliseconds–seconds | Seconds–minutes |\n| Failure meaning | This component, these props | Some layer in the journey |\n\nA mature Bizlevate suite uses CT for combinatorial UI and E2E for a thin set of journeys (submit leave, approve, run payroll).\n\n## Versus Playwright and Selenium\n\nPlaywright added component testing after Cypress made it first-class; the JS CT story exists, the Python Playwright manual you may already know is E2E-centric. Selenium drives a full browser against a deployed app — there is no `cy.mount` equivalent. If a hiring manager asks \"why Cypress over Selenium for a React team?\", CT is a legitimate, specific answer.\n\nInterview line: \"CT mounts one component with `cy.mount`; E2E drives the real HRM. I use CT for prop-matrix UI and E2E for integration. I do not replace one with the other.\"",
  "advantages": [
    "9.5 Component Testing (Cypress CT) — LeaveRequestForm edge cases (zero balance, 500-row cost centers, disabled submit) are expensive as E2E and cheap as CT."
  ],
  "limitations": [
    "9.5 Component Testing (Cypress CT) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
