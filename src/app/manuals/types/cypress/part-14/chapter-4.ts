import type { ChapterRecord } from "../../../types";

/** 14.4 Podcasts */
export const chapter = {
  "id": "cy-14-4-podcasts",
  "title": "14.4 Podcasts",
  "minutes": 12,
  "level": "advanced",
  "phase": "Part 14 · Resources, Citations & Reference Library",
  "partName": "Part 14 · Resources, Citations & Reference Library",
  "overviewText": "Podcasts will not teach cy.origin args. Use them for war stories: flake culture, CI, tool choice. Test Guild, Ministry of Testing, and occasional Cypress.io appearances are enough. Prefer episodes with practitioners who admit Playwright/Appium boundaries over vendor podcasts that never say 'no Trace Viewer.'",
  "why": "Commutes are for judgment, not API trivia. A good episode on flake (9.13) is worth more than a command recap.",
  "when": "When you already write tests and need other teams' process stories.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You want one listening list that will not teach deprecated APIs as current.",
    "pass": "You pick practitioner podcasts and you verify any command you hear against current docs.",
    "fail": "You implement something you only heard, like 'Cypress Trace Viewer' or 'just use WebKit.'"
  },
  "tools": [],
  "customSummary": "- Test Guild / MoT-style podcasts for process.\n- Official Cypress interviews for roadmap context (Cloud vs OSS).\n- Verify commands in docs — audio lags majors.\n- Playwright/Appium episodes for contrast.\n- Not a substitute for the capstone (13.1).",
  "contentMarkdown": "## How to listen like an engineer\n\nWhen a guest says \"we parallelize Cypress,\" pause and ask: machines or browsers (9.8)? When they say \"dashboard,\" Cloud or Sorry Cypress (11.5)? When they say \"mobile,\" viewport or Appium (9.17)? When they say \"trace,\" do they mean Playwright `trace.zip` (Cypress does not have one — 9.12)?\n\nIf they cannot answer, the episode is entertainment.\n\n## A short list\n\n- Test Guild (Joe Colantonio) — tool-agnostic practitioner interviews; Cypress, Playwright, Selenium, Appium guests.\n- Ministry of Testing podcast / Talks — quality process, not API trivia.\n- Occasional Cypress.io conference recordings (14.7) — treat as roadmap, separate OSS vs Cloud.\n- JS-focused shows (JS Party, Syntax) when they cover testing — fact-check Cypress claims.\n\nPodcasts will not teach `cy.origin` `{ args }` serialization. Use them for war stories: flake culture, CI politics, tool choice.\n\n## Pairing with other tools\n\nA Playwright episode on Trace Viewer plus this manual's 9.12 makes you bilingual in post-mortem debugging. A Selenium Grid episode makes 9.8's \"machines not browsers\" sentence sharper. An Appium episode keeps 9.17 honest.\n\nInterview line: \"Podcasts for process. Docs for APIs. I fact-check anything that sounds like a feature we don't have — Trace Viewer, WebKit, tabs, native.\"",
  "advantages": [
    "14.4 Podcasts — Commutes are for judgment, not API trivia."
  ],
  "limitations": [
    "14.4 Podcasts is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
