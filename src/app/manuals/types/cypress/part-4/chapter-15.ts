import type { ChapterRecord } from "../../../types";

/** 37. Trace Viewer & Post-Mortem Debugging (Cypress) */
export const chapter = {
  id: "cy-37-trace",
  title: "37. Trace Viewer & Post-Mortem Debugging (Cypress)",
  minutes: 26,
  level: "advanced",
  phase: "Part 4 · Advanced",
  partName: "Part 4 · Advanced",
  overviewText: "Videos and screenshots are on by default. Cypress Cloud Test Replay is the Trace Viewer equivalent. Free-tier post-mortem is more manual than Playwright's portable trace.zip.",
  why: "CI failures need artifacts. Knowing free vs Cloud replay options sets realistic debugging expectations.",
  when: "Configuring CI artifacts; comparing Cypress post-mortem story to Playwright traces in interviews.",
  practical: {"app":"CI pipeline","scenario":"Flaky checkout fails only on CI.","pass":"Retain video/screenshots; Cloud Test Replay if available.","fail":"video: false everywhere with no other artifact strategy."},
  tools: [],
  customSummary: "- video+screenshots default; Cloud Test Replay = Trace Viewer; free tier more manual than Playwright trace.zip",
  contentMarkdown: "## Default artifacts\n\nCypress records **video** of the run and **screenshots** on failure by default (`video`, `screenshotOnRunFailure` in config). Tune these down in CI for cost/storage.\n\n## Cloud Test Replay ≈ Trace Viewer\n\nCypress Cloud **Test Replay** reconstructs the failed run interactively — the closest equivalent to Playwright Trace Viewer. It is a Cloud feature, not a free local `trace.zip`.\n\n## Free-tier post-mortem\n\nWithout Cloud: download CI videos/screenshots, reproduce with `cypress open`, use Command Log time-travel locally. More manual than attaching a single Playwright trace file to a ticket.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
