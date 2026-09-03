import type { ChapterRecord } from "../../../types";

/** 62. Sample Data & Practice Sites */
export const chapter = {
  id: "cy-62-sample-sites",
  title: "62. Sample Data & Practice Sites",
  minutes: 18,
  level: "beginner",
  phase: "Part 8 · Resources, Citations & Reference Library",
  partName: "Part 8 · Resources, Citations & Reference Library",
  overviewText: "Practice on public automation sandboxes, Cypress Real World App, and small local mocks that mirror your domain.",
  why: "Safe sandboxes teach commands without risking production.",
  when: "Learning new APIs or interviewing live-coding prep.",
  practical: {"app":"Skill practice","scenario":"Drill intercept + session.","pass":"RWA + one public sandbox + local mock.","fail":"Only production staging thrash."},
  advantages: ["RWA official","public sandboxes","local mocks","safe failure","interview drills","iframe/shadow demos"],
  limitations: ["toy domains","uptime flaky","CAPTCHA walls","not your RBAC","rate limits","outdated demos"],
  tools: [],
  customSummary: "- https://github.com/cypress-io/cypress-realworld-app\n- https://example.cypress.io — Kitchen Sink\n- https://the-internet.herokuapp.com — classic practice app\n- https://demo.playwright.dev / similar public sandboxes for cross-tool drills\n- Build a tiny local mock for your domain RBAC",
  contentMarkdown: "## Practice targets\n\n- [Cypress Real World App](https://github.com/cypress-io/cypress-realworld-app)\n- [Cypress Kitchen Sink](https://example.cypress.io)\n- [the-internet.herokuapp.com](https://the-internet.herokuapp.com)\n- A small local app mirroring your product’s roles beats generic sites for portfolio depth",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
