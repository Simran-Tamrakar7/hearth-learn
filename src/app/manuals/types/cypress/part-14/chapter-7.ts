import type { ChapterRecord } from "../../../types";

/** 14.7 Conferences & Talks */
export const chapter = {
  "id": "cy-14-7-conferences-talks",
  "title": "14.7 Conferences & Talks",
  "minutes": 14,
  "level": "advanced",
  "phase": "Part 14 · Resources, Citations & Reference Library",
  "partName": "Part 14 · Resources, Citations & Reference Library",
  "overviewText": "Watch talks for architecture stories (flake, CT, CI), not live-coding of cy.get. Cypress Conf (when held), TestJS Summit, SeleniumConf, STAR, and Ministry of Testing events. Talks from 2019 about 'Cypress cannot do cross-origin' are historical — we have cy.origin now. Prefer talks that admit Playwright/Appium.",
  "why": "A 20-minute talk on why a bank self-hosted Sorry Cypress (11.5) is more useful than a keynote about AI (11.4).",
  "when": "When a conference playlist is available, and when you need stories for interviews.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You have a weekend to watch two talks that will improve Bizlevate's suite design.",
    "pass": "You pick a recent talk on Cypress CI/flake/CT and one Playwright trace/WebKit talk for contrast.",
    "fail": "You watch only vendor keynotes that claim one tool covers native, Safari, and tabs."
  },
  "tools": [],
  "customSummary": "- Prefer practitioner talks on flake, CT, CI, origin.\n- Date-check: pre-origin talks are incomplete.\n- SeleniumConf/Appium talks for the limits Cypress will not cover.\n- Recorded > FOMO travel unless your employer sends you.\n- Steal stories, not deprecated APIs.",
  "contentMarkdown": "## What to extract from a talk\n\nWrite three bullets: problem, Cypress-shaped solution, remaining gap (tabs / WebKit / native / no Trace Viewer). That becomes interview gold (13.3).\n\n## Where to look\n\n- Cypress Conf (when held) and Cypress meetup recordings — CT, origin, Cloud vs OSS.\n- TestJS Summit — JS testing including Cypress and Playwright.\n- SeleniumConf / AppiumConf — Grid, drivers, native; use them to stay honest about 9.8 and 9.17.\n- STAR / Ministry of Testing / QCon quality tracks — flake and CI culture, tool-agnostic.\n\nTalks from 2019 about \"Cypress cannot do cross-origin\" are historical — we have `cy.origin` now. Talks that never mention Playwright or Selenium are usually vendor keynotes.\n\n## Search terms that work\n\n\"Cypress component testing\", \"cy.origin SSO\", \"Cypress GitHub Actions\", \"Sorry Cypress\", \"Cypress flake\". Avoid \"Cypress vs Selenium 2018\". Prefer 2023+ for session/origin/CT.\n\nRecorded > FOMO travel unless your employer sends you. Steal stories, not deprecated APIs.\n\nInterview line: \"I watch dated-recent practitioner talks for CI and flake. I ignore anything that says Cypress can drive native iOS or includes a Trace Viewer. I use SeleniumConf/Appium talks for the gaps.\"",
  "advantages": [
    "14.7 Conferences & Talks — A 20-minute talk on why a bank self-hosted Sorry Cypress (11."
  ],
  "limitations": [
    "14.7 Conferences & Talks is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
