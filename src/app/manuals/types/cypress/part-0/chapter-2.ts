import type { ChapterRecord } from "../../../types";

/** 0.2 Where Cypress is Used */
export const chapter = {
  "id": "cy-0-2-where-cypress-is-used",
  "title": "0.2 Where Cypress is Used",
  "minutes": 22,
  "level": "beginner",
  "phase": "Part 0 · Orientation",
  "partName": "Part 0 · Orientation",
  "overviewText": "The bread-and-butter Cypress use case is E2E tests that mirror real user journeys — login, navigate, act, verify — with Cypress idioms (chained commands, cy.get() instead of page.locator()). Cypress also has mature component testing, simpler same-session API testing via cy.request(), and visual regression only via plugins. It clusters in 'you build it, you test it' developer-owned teams.",
  "why": "Knowing where Cypress actually fits — and where dedicated automation orgs lean Playwright/Selenium — is the real answer to 'when would you recommend Cypress?'",
  "when": "When choosing a tool for a team, scoping an HRM E2E suite, or explaining component testing vs E2E in interviews.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You must recommend Cypress vs Playwright for a frontend-heavy team that also has a dedicated QA automation function.",
    "pass": "You map E2E journeys (leave submit/approve, payroll, onboarding), explain CT as a supplement not a replacement, and name the culture fit: dev-owned teams gravitate to Cypress; dedicated automation orgs often lean Playwright/Selenium.",
    "fail": "You treat Cypress as a generic E2E tool with no culture, CT, or visual-testing distinction from Playwright."
  },
  "tools": [],
  "customSummary": "- E2E: multi-step user journeys visualized step by step in the Test Runner — Cypress's core strength.\n- Component testing: mounts one component in isolation — faster, easier edge-case props; does not verify real integration.\n- API testing: cy.request() uses the existing test session — simpler than Playwright's isolated APIRequestContext, less flexible for multiple simultaneous identities.\n- Visual regression: no built-in diffing — always a plugin (cypress-image-snapshot) or paid SaaS (Percy, Applitools).\n- Culture fit: 'you build it, you test it' frontend teams; dedicated automation-engineering orgs often prefer Playwright/Selenium.",
  "contentMarkdown": "## E2E testing — what it looks like day to day\n\nThe bread-and-butter Cypress use case is writing tests that mirror real user journeys: log in, navigate to a specific module, perform an action, verify the result — the same shape as Playwright E2E tests, but with Cypress idioms (chained commands instead of awaited calls, `cy.get()` instead of `page.locator()`).\n\nFor something like Bizlevate's HRM system, a representative E2E suite might cover: logging in as different role types (admin, employee, manager), submitting a leave request and having a manager approve it, running payroll and verifying calculated amounts, onboarding a new employee record end to end. These are exactly the kinds of multi-step, stateful flows Cypress is built to express clearly, since the Test Runner shows you each step visually as it executes.\n\n## Component testing — architecturally distinctive\n\nCypress Component Testing mounts a single component — say, a `<LeaveRequestForm />` React component — directly into a real, empty browser page, completely outside your actual running application. You then interact with it using the exact same Cypress commands (`cy.get`, `.click()`, `.type()`) you'd use in a full E2E test, but the \"app\" being tested is just that one component with whatever props/mock data you feed it.\n\nPractical payoff: no login/navigation just to test a date picker's edge cases; tests run dramatically faster; you can pass empty/error/500-row props directly. Trade-off: a component test can pass while the actual page using that component is broken due to real data/routing. Component testing *supplements* E2E, it does not replace it. Part 9.5 covers the balance in depth.\n\nPlaywright added component testing later and less centrally. Cypress treated CT as a first-class testing type earlier.\n\n## API testing — scope vs Playwright\n\n`cy.request()` (Part 6) is simpler in scope than Playwright's `APIRequestContext`. There is no separate context object you create and manage with its own isolated cookies/headers — `cy.request()` runs within your existing test's session context directly. Simpler for the common case (seed data before a UI test); less flexible for several independent authenticated identities simultaneously within one test — an area where Playwright's context model has a genuine architectural edge.\n\n## Visual regression — always third-party\n\nUnlike Playwright, which ships `expect(page).to_have_screenshot()` as a built-in first-party API, Cypress has no built-in visual diffing at all. Every visual testing approach is a plugin (`cypress-image-snapshot`) or a paid SaaS (Percy, Applitools). Interview-safe: \"Does Cypress have visual testing?\" — technically no, not without an add-on.\n\n## Industries and the developer-adoption angle\n\nBeyond e-commerce/SaaS/banking/healthcare, Cypress specifically clusters in teams practicing \"you build it, you test it\" — frontend developers write tests for their own features. Organizations with a dedicated, separate automation-engineering function (common in larger enterprises, closer to a Bizlevate QA-specialist role) more often lean toward Playwright or Selenium because those tools' external-driver architecture supports more complex, multi-system, multi-language infrastructure. Neither pattern is a hard rule, but it is an observable trend worth knowing when asked \"when would you recommend Cypress over Playwright to a team?\"",
  "blocks": [
    {
      "id": "cy-0-2-md-0",
      "type": "overview",
      "heading": "E2E testing — what it looks like day to day",
      "content": "The bread-and-butter Cypress use case is writing tests that mirror real user journeys: log in, navigate to a specific module, perform an action, verify the result — the same shape as Playwright E2E tests, but with Cypress idioms (chained commands instead of awaited calls, `cy.get()` instead of `page.locator()`).\n\nFor something like Bizlevate's HRM system, a representative E2E suite might cover: logging in as different role types (admin, employee, manager), submitting a leave request and having a manager approve it, running payroll and verifying calculated amounts, onboarding a new employee record end to end. These are exactly the kinds of multi-step, stateful flows Cypress is built to express clearly, since the Test Runner shows you each step visually as it executes.",
      "order": 0
    },
    {
      "id": "cy-0-2-md-1",
      "type": "overview",
      "heading": "Component testing — architecturally distinctive",
      "content": "Cypress Component Testing mounts a single component — say, a `<LeaveRequestForm />` React component — directly into a real, empty browser page, completely outside your actual running application. You then interact with it using the exact same Cypress commands (`cy.get`, `.click()`, `.type()`) you'd use in a full E2E test, but the \"app\" being tested is just that one component with whatever props/mock data you feed it.\n\nPractical payoff: no login/navigation just to test a date picker's edge cases; tests run dramatically faster; you can pass empty/error/500-row props directly. Trade-off: a component test can pass while the actual page using that component is broken due to real data/routing. Component testing *supplements* E2E, it does not replace it. Part 9.5 covers the balance in depth.\n\nPlaywright added component testing later and less centrally. Cypress treated CT as a first-class testing type earlier.",
      "order": 1
    },
    {
      "id": "cy-0-2-md-2",
      "type": "overview",
      "heading": "API testing — scope vs Playwright",
      "content": "`cy.request()` (Part 6) is simpler in scope than Playwright's `APIRequestContext`. There is no separate context object you create and manage with its own isolated cookies/headers — `cy.request()` runs within your existing test's session context directly. Simpler for the common case (seed data before a UI test); less flexible for several independent authenticated identities simultaneously within one test — an area where Playwright's context model has a genuine architectural edge.",
      "order": 2
    },
    {
      "id": "cy-0-2-md-3",
      "type": "overview",
      "heading": "Visual regression — always third-party",
      "content": "Unlike Playwright, which ships `expect(page).to_have_screenshot()` as a built-in first-party API, Cypress has no built-in visual diffing at all. Every visual testing approach is a plugin (`cypress-image-snapshot`) or a paid SaaS (Percy, Applitools). Interview-safe: \"Does Cypress have visual testing?\" — technically no, not without an add-on.",
      "order": 3
    },
    {
      "id": "cy-0-2-md-4",
      "type": "overview",
      "heading": "Industries and the developer-adoption angle",
      "content": "Beyond e-commerce/SaaS/banking/healthcare, Cypress specifically clusters in teams practicing \"you build it, you test it\" — frontend developers write tests for their own features. Organizations with a dedicated, separate automation-engineering function (common in larger enterprises, closer to a Bizlevate QA-specialist role) more often lean toward Playwright or Selenium because those tools' external-driver architecture supports more complex, multi-system, multi-language infrastructure. Neither pattern is a hard rule, but it is an observable trend worth knowing when asked \"when would you recommend Cypress over Playwright to a team?\"",
      "order": 4
    }
  ],
  "advantages": [
    "0.2 Where Cypress is Used — Knowing where Cypress actually fits — and where dedicated automation orgs lean Playwright/Selenium — is the real answer to 'when would you recommend Cypress?'."
  ],
  "limitations": [
    "0.2 Where Cypress is Used is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
