import type { ChapterRecord } from "../../../types";

/** 46. Performance Considerations (Cypress) — comparison / pattern chapter, not Adv/Lim. */
export const chapter = {
  id: "cy-46-performance",
  title: "46. Performance Considerations (Cypress)",
  minutes: 26,
  level: "advanced",
  phase: "Part 6 · Pro-Level Practices",
  partName: "Part 6 · Pro-Level Practices",
  overviewText:
    "Fewer well-sized specs, cy.session for auth, App Actions over heavy UI setup, video off in CI, and RBAC coverage via session-per-role — mapped to Playwright equivalents where they exist.",
  comparisons: [
    {
      lever: "Spec file consolidation (fewer/bigger specs)",
      equivalent: "No direct Playwright equivalent",
      verdict: "Cypress-specific — each spec = new browser launch, so fewer/bigger specs reduce overhead",
    },
    {
      lever: "cy.session()",
      equivalent: "storage_state",
      verdict: "Same impact, different API",
    },
    {
      lever: "App Actions (cy.request in beforeEach)",
      equivalent: "API setup pattern",
      verdict: "Same technique",
    },
    {
      lever: "video: false in CI",
      equivalent: "No equivalent needed (Playwright doesn't record by default)",
      verdict: "Cypress-specific cost/perf lever",
    },
    {
      lever: "Parallelization tuning",
      equivalent: "Same principle as Playwright",
      verdict:
        "Tuned at CI-machine-count level (Cloud-orchestrated or manual matrix), not per-machine worker count like pytest-xdist",
    },
  ],
  keyDifferences: [
    "Cypress's one-process-per-spec-file model means spec count/size is a real performance lever here — there's no Playwright equivalent for this.",
  ],
  codeReferences: [
    {
      label: "RBAC testing — same pattern as Playwright, adapted to cy.session",
      code: `const roles = ['admin', 'editor', 'viewer'];

roles.forEach((role) => {
  describe(\`RBAC as \${role}\`, () => {
    beforeEach(() => {
      cy.session(role, () => {
        cy.loginAs(role); // custom command / API login
      });
      cy.visit('/app');
    });

    it('sees the correct nav for the role', () => {
      cy.get('[data-cy=nav]').should('contain', role);
    });
  });
});`,
    },
  ],
  tools: [],
  customSummary: "- fewer specs; cy.session; App Actions; video off; RBAC with session",
  contentMarkdown:
    "## Launch overhead\n\nEach spec file pays Cypress boot cost. Prefer cohesive mid-size specs over micro-files.\n\n## cy.session\n\nCache authenticated state per role — biggest single speed win for suites with login walls.\n\n## App Actions + API\n\nSkip repetitive UI setup via API seed + short UI verification.\n\n## CI media\n\nTurn **video off** in CI when not debugging; keep failure screenshots.\n\n## RBAC\n\n`cy.session('admin', ...)` / `cy.session('viewer', ...)` to cover permissions without N full logins.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
