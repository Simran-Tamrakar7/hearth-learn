import type { ChapterRecord } from "../../../types";

/** 40. Test Reporting (Cypress) */
export const chapter = {
  id: "cy-40-reporting",
  title: "40. Test Reporting (Cypress)",
  minutes: 28,
  level: "advanced",
  phase: "Part 5 · CI/CD & Reporting",
  partName: "Part 5 · CI/CD & Reporting",
  overviewText: "No built-in HTML reporter. Mochawesome + mochawesome-merge is the common free path; Cypress Cloud dashboard for hosted runs; JUnit via multi-reporters; organize reports by product module.",
  why: "Stakeholders need readable history beyond terminal exit codes. Reporting choices affect CI integration and audit trails.",
  when: "Adding PR comments, Slack, or enterprise JUnit consumers.",
  practical: {"app":"CI + QA dashboard","scenario":"Need HTML report artifact + JUnit for Jenkins.","pass":"mochawesome-merge + junit via cypress-multi-reporters.","fail":"Raw mocha JSON dumped unreadably."},
  tools: [],
  customSummary: "- no built-in HTML; Mochawesome + merge; Cloud dashboard; JUnit via multi-reporters; organize by product module",
  contentMarkdown: "## No built-in HTML report\n\nCypress uses Mocha under the hood but does not ship a polished HTML report. Community standard:\n\n1. `mochawesome` reporter per run\n2. `mochawesome-merge` when parallel jobs emit multiple JSON files\n3. `marge` to HTML\n\n## Cypress Cloud\n\nHosted run history, videos, and Test Replay — strongest \"batteries included\" reporting if budget allows.\n\n## JUnit / enterprise\n\n`cypress-multi-reporters` + `mocha-junit-reporter` for Jenkins/Azure DevOps consumers.\n\n## Organize by module\n\nMirror product areas in `cypress/e2e/{billing,auth,...}` so reports and `--spec` filters stay human-readable.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
