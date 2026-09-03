import type { ChapterRecord } from "../../../types";

/** 46. Performance Considerations (Cypress) */
export const chapter = {
  id: "cy-46-performance",
  title: "46. Performance Considerations (Cypress)",
  minutes: 26,
  level: "advanced",
  phase: "Part 6 · Pro-Level Practices",
  partName: "Part 6 · Pro-Level Practices",
  overviewText: "Fewer well-sized specs, cy.session for auth, App Actions over heavy UI setup, video off in CI, and RBAC coverage via session-per-role.",
  why: "Cypress launch and auth overhead dominate wall-clock time long before assertion cost does.",
  when: "Optimizing CI minutes after correctness is stable.",
  practical: {"app":"RBAC SaaS","scenario":"Each test full UI login; videos blow artifact store.","pass":"cy.session per role; video false CI; API seed.","fail":"Login UI × N tests × browsers."},
  advantages: ["fewer specs overhead","cy.session cache","App Actions speed","video off CI","RBAC sessions","API setup"],
  limitations: ["session invalidation","over-merge specs","API≠UI gaps","parallel resource","browser cold start","component vs e2e mix"],
  tools: [],
  customSummary: "- fewer specs; cy.session; App Actions; video off; RBAC with session",
  contentMarkdown: "## Launch overhead\n\nEach spec file pays Cypress boot cost. Prefer cohesive mid-size specs over micro-files.\n\n## cy.session\n\nCache authenticated state per role — biggest single speed win for suites with login walls.\n\n## App Actions + API\n\nSkip repetitive UI setup via API seed + short UI verification.\n\n## CI media\n\nTurn **video off** in CI when not debugging; keep failure screenshots.\n\n## RBAC\n\n`cy.session('admin', ...)` / `cy.session('viewer', ...)` to cover permissions without N full logins.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
