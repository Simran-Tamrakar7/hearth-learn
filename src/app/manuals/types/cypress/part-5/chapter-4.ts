import type { ChapterRecord } from "../../../types";

/** 42. Logging & Error Handling (Cypress) */
export const chapter = {
  id: "cy-42-logging",
  title: "42. Logging & Error Handling (Cypress)",
  minutes: 24,
  level: "intermediate",
  phase: "Part 5 · CI/CD & Reporting",
  partName: "Part 5 · CI/CD & Reporting",
  overviewText: "cy.log for Command Log narrative; Cypress commands are not Promises; video on by default — tune down in CI; handle uncaught:exception narrowly.",
  why: "Wrong mental model (await cy.get) and blanket exception swallowing create silent false greens.",
  when: "Writing helpers, CI noise from third-party scripts, or artifact cost reviews.",
  practical: {"app":"SPA with analytics noise","scenario":"ResizeObserver errors fail every test.","pass":"Narrow uncaught:exception allowlist; cy.log milestones.","fail":"return false for all uncaught exceptions."},
  advantages: ["cy.log timeline","video default evidence","screenshot fail","narrow exception filter","task for structured logs","Command Log clarity"],
  limitations: ["commands ≠ Promises","video cost","blanket catch hides bugs","console.log invisible CI","async anti-patterns","verbose log clutter"],
  tools: [],
  customSummary: "- cy.log; commands not Promises; video on by default tune down; uncaught:exception narrowly",
  contentMarkdown: "## cy.log\n\n`cy.log('Submitting leave request')` appears in the Command Log — prefer over `console.log` for CI narratives.\n\n## Commands are not Promises\n\nDo not `await cy.get(...)` expecting thenables like Playwright. Use chains / `.then()` correctly; wrapping commands in async/await anti-patterns causes races.\n\n## Video defaults\n\nVideo is **on** by default. For CI cost: disable video, keep failure screenshots, or retain video only on failure via hooks/scripts.\n\n## uncaught:exception\n\n```javascript\nCypress.on('uncaught:exception', (err) => {\n  if (err.message.includes('ResizeObserver')) return false;\n  // do not blanket-return false\n});\n```\n\nAllowlist known third-party noise only — never swallow all errors.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
