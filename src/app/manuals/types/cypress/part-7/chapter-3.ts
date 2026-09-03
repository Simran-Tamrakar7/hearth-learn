import type { ChapterRecord } from "../../../types";

/** 49. Interview Prep (Cypress) */
export const chapter = {
  id: "cy-49-interview",
  title: "49. Interview Prep (Cypress)",
  minutes: 35,
  level: "advanced",
  phase: "Part 7 · Real-World Project & Job Readiness",
  partName: "Part 7 · Real-World Project & Job Readiness",
  overviewText: "Prep a Cypress vs Playwright comparison table, why dialogs auto-accept, retry-ability as whole-chain, when NOT to use Cypress, live locator exercise, and SSO cy.origin scenario.",
  why: "Interviewers probe architecture and failure modes, not cy.get syntax alone.",
  when: "Week before interviews; revisit after capstone.",
  practical: {"app":"Interview whiteboard","scenario":"Explain retry-ability and cy.origin SSO.","pass":"Clear comparison + live data-cy demo + origin story.","fail":"Only recite command list."},
  advantages: ["comparison table","dialogs auto-accept why","retry whole-chain","when NOT Cypress","live locators","cy.origin SSO"],
  limitations: ["version API drift","trick questions","live coding nerves","company stack bias","Cloud paywall nuance","overlong answers"],
  tools: [],
  customSummary: "- comparison table; auto-accept dialogs why; retry-ability whole-chain; when NOT Cypress; live locators; SSO cy.origin scenario",
  contentMarkdown: "## Comparison table (memorize)\n\n| Topic | Cypress | Playwright |\n|---|---|---|\n| Execution | In-browser | External driver |\n| WebKit | No | Yes |\n| Trace | Video/Replay | trace.zip |\n| Multi-tab | Awkward | First-class |\n\n## Auto-accept dialogs\n\n`window.alert/confirm` are stubbed/auto-handled because native dialogs would block the Cypress command queue in-page — use `cy.on('window:confirm')` to assert.\n\n## Retry-ability\n\nRetries apply to the **current command + assertion chain**, not the whole previous test. Explain querying vs acting commands.\n\n## When NOT Cypress\n\nSafari-critical traffic, true multi-tab, multi-language bindings, or heavy multi-context — choose Playwright (or both).\n\n## Live drills\n\n- Write resilient `data-cy` locators on a sample page\n- Sketch SSO: `cy.origin` + `cy.session` for IdP domain",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
