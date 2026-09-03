import type { ChapterRecord } from "../../../types";

/** 45. Code Review & Best Practices (Cypress) */
export const chapter = {
  id: "cy-45-code-review",
  title: "45. Code Review & Best Practices (Cypress)",
  minutes: 28,
  level: "intermediate",
  phase: "Part 6 · Pro-Level Practices",
  partName: "Part 6 · Pro-Level Practices",
  overviewText: "Review for data-cy usage, unjustified force, numeric waits, should vs expect, narrow uncaught handlers, and eslint-plugin-cypress.",
  why: "Most Cypress flake debt is introduced in PRs that look \"green locally.\" Review checklists catch anti-patterns early.",
  when: "Establishing team PR standards or onboarding reviewers.",
  practical: {"app":"Team Cypress repo","scenario":"PR adds cy.wait(3000) and force:true clicks.","pass":"Request retrying assertions; data-cy; eslint cypress rules.","fail":"Merge because CI was green once."},
  advantages: ["data-cy standard","ban unjustified force","ban numeric wait","should retrying","eslint-plugin-cypress","narrow uncaught"],
  limitations: ["review fatigue","legacy exceptions","eslint false positives","force sometimes needed","expect non-retrying","docs lag"],
  tools: [],
  customSummary: "- data-cy; no unjustified force; no numeric wait; should vs expect; narrow uncaught; eslint-plugin-cypress",
  contentMarkdown: "## Review checklist\n\n1. **data-cy** (or stable roles) — not CSS/text tied to copy\n2. No `{ force: true }` without a written reason\n3. No `cy.wait(ms)` — wait on aliases/routes/assertions\n4. Prefer **`.should`** (retries) over bare `expect` on DOM\n5. `uncaught:exception` handlers are narrow allowlists\n6. Enable **eslint-plugin-cypress** in CI lint\n\n## should vs expect\n\n`.should('be.visible')` retries. `expect(x).to.eq(y)` inside `.then` does not retry the query — know which you are using.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
