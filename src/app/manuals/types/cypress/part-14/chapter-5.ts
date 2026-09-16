import type { ChapterRecord } from "../../../types";

/** 14.5 Courses & Structured Learning Platforms */
export const chapter = {
  "id": "cy-14-5-courses-structured-learning-platforms",
  "title": "14.5 Courses & Structured Learning Platforms",
  "minutes": 16,
  "level": "advanced",
  "phase": "Part 14 · Resources, Citations & Reference Library",
  "partName": "Part 14 · Resources, Citations & Reference Library",
  "overviewText": "Official Cypress docs + this manual + a capstone beat most video courses. If you buy a course, demand Cypress 12+ (session, origin, CT), GitHub Actions, and architecture limits. TestingJavaScript, Test Automation University, Frontend Masters, and Udemy vary wildly in freshness. Playwright courses are complementary, not redundant.",
  "why": "A 2019 Udemy course will teach cy.server and ruin your instincts. Version is the buying criterion.",
  "when": "When you want a second voice after this manual, or when your employer pays for a platform.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "Your manager offers a stipend for a Cypress course.",
    "pass": "You choose a course updated for origin/session/CT/CI, and you still build the HRM capstone yourself.",
    "fail": "You complete a Cypress 8 course and skip writing a repo."
  },
  "tools": [],
  "customSummary": "- Prefer docs + capstone; courses are optional.\n- Minimum bar: cy.session, cy.origin, intercept (not cy.route), CT, CI.\n- TAU / official lessons / well-dated video.\n- A Playwright course adds WebKit/trace — useful breadth.\n- Certificate of completion ≠ job-ready (14.6, 13.2).",
  "contentMarkdown": "## A buying checklist\n\nDoes the syllabus include: command queue, `cy.intercept` (not `cy.route`), `cy.session`, `cy.origin` + args, CT vs E2E, GitHub Action, flake, and *limitations* (tabs, WebKit, visual plugin-only, no Trace Viewer)? If not, skip. A 2019 Udemy course will teach `cy.server` and ruin your instincts.\n\n## Platforms (non-exhaustive)\n\n- Official Cypress Real World App / example recipes — free, versioned with the product.\n- Test Automation University — free modules; **check dates**.\n- TestingJavaScript (Kent C. Dodds) — JS testing culture; CT sits next to Jest/RTL, not instead of Cypress E2E.\n- Frontend Masters / egghead — filter for Cypress 12+.\n- Employer LinkedIn Learning / Udemy — last-update date is the only filter that matters.\n\nPlaywright's official course/docs are worth taking *in addition* if you need WebKit and traces (13.4). Selenium Academy / TestNG courses help only if you are migrating (9.16) or joining a JVM shop. Appium courses are the native track (9.17).\n\n## After the course\n\nDelete the course project. Build 13.1 against HRM. Courses share locators; hiring managers share Google. A certificate of completion is not a portfolio (14.6).\n\nInterview line: \"I used docs and a domain capstone. If I took a course, it had origin, session, CT, and CI — not Cypress 8 video. I did not skip Playwright/Selenium/Appium literacy.\"",
  "advantages": [
    "14.5 Courses & Structured Learning Platforms — A 2019 Udemy course will teach cy."
  ],
  "limitations": [
    "14.5 Courses & Structured Learning Platforms is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
