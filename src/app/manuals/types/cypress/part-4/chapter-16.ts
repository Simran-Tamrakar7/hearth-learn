import type { ChapterRecord } from "../../../types";

/** 38. Flaky Test Management (Cypress) */
export const chapter = {
  id: "cy-38-flaky",
  title: "38. Flaky Test Management (Cypress)",
  minutes: 30,
  level: "advanced",
  phase: "Part 4 · Advanced",
  partName: "Part 4 · Advanced",
  overviewText: "Flaky detection is manual or via Cypress Cloud analytics. Cypress-specific causes (command queue misuse, force:true, numeric waits). Retries via runMode/openMode; quarantine with cypress-grep; debug with time-travel / Test Replay.",
  why: "Flakes erode CI trust. Cypress teams need config-level retries and quarantine patterns that match the command-queue model.",
  when: "CI shows intermittent reds; before expanding parallelization which amplifies flakes.",
  practical: {"app":"Large Cypress suite","scenario":"3 specs fail ~20% on CI only.","pass":"Cloud flaky metrics or history; retries temporary; fix root cause; grep quarantine.","fail":"retries: 5 forever with no owner."},
  advantages: ["retries runMode/openMode","Cloud flaky analytics","cypress-grep quarantine","time-travel debug","Test Replay CI","detect force/wait smells"],
  limitations: ["detection manual free","retries hide bugs","grep not built-in","parallel flake amplify","video-only CI debug","no auto quarantine"],
  tools: [],
  customSummary: "- detection manual or Cloud; Cypress-specific causes; retries in config runMode/openMode; quarantine via cypress-grep; time-travel / Test Replay",
  contentMarkdown: "## Detection\n\nTrack pass/fail history in CI dashboards, or use **Cypress Cloud** flaky-test analytics. Open-source Cypress has no built-in flaky detector.\n\n## Cypress-specific causes\n\n- Assertions not chained on retrying commands\n- `{ force: true }` masking actionability\n- `cy.wait(ms)` races\n- Shared state across specs under parallel\n- Unhandled `uncaught:exception` from app noise\n\n## Retries\n\n```javascript\n// cypress.config.js\nretries: { runMode: 2, openMode: 0 }\n```\n\nUse sparingly — retries are a safety net, not a fix.\n\n## Quarantine\n\nTag known flakes with `cypress-grep` (`@flaky`) and exclude from the merge gate while an owner fixes them.\n\n## Root-cause tools\n\nCommand Log time-travel locally; Cloud Test Replay for CI-only failures.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
