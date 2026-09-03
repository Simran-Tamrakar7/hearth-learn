import type { ChapterRecord } from "../../../types";

/** 26. Authentication & Session Reuse — cy.session vs storage_state trade-offs. */
export const chapter = {
  id: "cy-26-auth",
  title: "26. Authentication & Session Reuse",
  minutes: 35,
  level: "advanced",
  phase: "Part 4 · Advanced",
  partName: "Part 4 · Advanced",
  overviewText:
    "cy.session caches cookies, localStorage, and sessionStorage by key and restores across specs — similar goal to Playwright storage_state, different mechanism.",
  when: "Any suite where login is a prerequisite, not the thing under test. Prefer API login inside session setup; reserve UI login for login-flow specs.",
  comparisons: [
    {
      lever: "cy.session(key, setup, { validate })",
      equivalent: "storage_state / storageState file load",
      verdict: "Same goal (skip UI login) — Cypress auto-caches by key; Playwright is explicit save/load",
    },
    {
      lever: "Caches cookies + localStorage + sessionStorage",
      equivalent: "storage_state: cookies + localStorage only",
      verdict: "Cypress edge when auth lives in sessionStorage",
    },
    {
      lever: "validate() re-runs setup on stale session",
      equivalent: "No built-in expiry check — build yourself",
      verdict: "Cypress-specific safety net",
    },
    {
      lever: "Programmatic login via cy.request in setup",
      equivalent: "API login + save storage_state",
      verdict: "Same technique",
    },
  ],
  keyDifferences: [
    "cy.session also caches sessionStorage; Playwright's storage_state explicitly does not — call this out when an app's auth token lives only in sessionStorage.",
  ],
  advantages: [
    "Automatic key-based cache and restore across specs in one run",
    "sessionStorage included — no extra workaround for sessionStorage-only auth",
    "validate() catches expired tokens and re-runs setup",
  ],
  limitations: [
    "Cache invalidation and key design are suite-design concerns",
    "Still Cypress-bound for multi-origin SSO (pair with cy.origin)",
    "API login skips the real login UI — wrong choice when login itself is under test",
  ],
  codeReferences: [
    {
      label: "cy.session with validate — login once per role key",
      code: `Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('/login');
    cy.get('[data-cy=username]').type(username);
    cy.get('[data-cy=password]').type(password);
    cy.get('[data-cy=submit]').click();
    cy.url().should('include', '/dashboard');
  }, {
    validate() {
      cy.getCookie('session_token').should('exist');
    },
  });
});`,
    },
  ],
  tools: [],
  customSummary:
    "- cy.session([cacheKey], setupFn, { validate }) caches cookies/localStorage/sessionStorage (a real edge over Playwright's storage_state, which only captures cookies+localStorage) — auto-restores across specs by cache key, with optional revalidation.\n- Prefer programmatic (API-based) login for most tests; reserve real UI login for tests specifically about the login flow itself.",
  contentMarkdown: `## cy.session() — go deeper on the caching mechanism and why it's a genuinely different model from Playwright's storage_state

\`\`\`javascript
Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('/login');
    cy.get('[data-cy=username]').type(username);
    cy.get('[data-cy=password]').type(password);
    cy.get('[data-cy=submit]').click();
    cy.url().should('include', '/dashboard');
  });
});

// in a test:
beforeEach(() => {
  cy.login('testuser', 'testpass');
  cy.visit('/dashboard');
});
\`\`\`

cy.session() takes a cache key and a setup function. The first time a key is used, Cypress runs setup and caches cookies/localStorage/sessionStorage. Later calls with the same key restore instantly — even across specs. Same goal as Playwright storage_state; different mechanism (automatic key cache vs explicit save/load).

## Validating a cached session

\`\`\`javascript
cy.session([username, password], () => { /* login */ }, {
  validate() {
    cy.getCookie('session_token').should('exist');
  },
});
\`\`\`

validate() runs on restore; failure re-runs setup.

## Programmatic login vs UI login

Prefer cy.request login inside session setup for speed. Reserve UI login for specs that test the login flow itself.`,
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
