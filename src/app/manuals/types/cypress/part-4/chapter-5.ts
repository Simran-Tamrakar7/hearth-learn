import type { ChapterRecord } from "../../../types";

/** 27. Working Around Cypress's Architectural Limits — comparison + key gaps. */
export const chapter = {
  id: "cy-27-limits",
  title: "27. Working Around Cypress's Architectural Limits",
  minutes: 35,
  level: "advanced",
  phase: "Part 4 · Advanced",
  partName: "Part 4 · Advanced",
  overviewText:
    "cy.origin for cross-origin steps, honest multi-tab ceilings, and explicit Shadow DOM piercing — mapped against what Playwright does natively.",
  comparisons: [
    {
      lever: "cy.origin(url, { args }, callback)",
      equivalent: "Native multi-origin navigation / new page in same context",
      verdict: "Partial equivalent — Cypress escape hatch with isolated callback + args serialization",
    },
    {
      lever: "Multi-tab (target=_blank / window.open)",
      equivalent: "context.expect_page() / Page objects for each tab",
      verdict: "No real Cypress equivalent — verify intent only, or use Playwright",
    },
    {
      lever: ".shadow() or includeShadowDom: true",
      equivalent: "Open shadow DOM pierced by default",
      verdict: "Same capability — Cypress needs explicit opt-in",
    },
  ],
  keyDifferences: [
    "True multi-tab control does not exist in Cypress — stubs and href checks only verify intent. If new-tab content is a critical path, that suite belongs in Playwright.",
  ],
  codeReferences: [
    {
      label: "cy.origin with args — SSO callback isolation",
      code: `const ssoCredentials = { username: 'testuser@example.com', password: 'testpass' };

cy.origin('https://sso-provider.example.com', { args: ssoCredentials }, ({ username, password }) => {
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('#submit').click();
});`,
    },
  ],
  tools: [],
  customSummary:
    "- cy.origin(url, { args }, callback) is the escape hatch for cross-origin steps — callback runs in an isolated context, so outer-scope variables must be passed explicitly via args.\n- True multi-tab control genuinely doesn't exist in Cypress — closest substitutes only verify intent (checking href, stubbing window.open), not actual new-tab content; this is a legitimate \"use Playwright instead\" case.\n- Shadow DOM requires explicit .shadow() or the global includeShadowDom: true config (Playwright pierces automatically by default).",
  contentMarkdown: `## cy.origin()

Cypress test code runs in-browser and is bound by same-origin rules. cy.origin() is the escape hatch for a different origin; the callback runs in an isolated context — pass data via \`{ args }\`.

## Multi-tab

There is no real simultaneous multi-tab control. Closest substitutes: assert \`href\`, or stub \`window.open\`. Neither tests the new tab's content.

## Shadow DOM

\`\`\`javascript
cy.get('custom-button').shadow().find('.internal-button').click();
// or includeShadowDom: true in cypress.config.js
\`\`\`

Playwright pierces open shadow DOM by default; Cypress requires explicit opt-in.`,
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
