import type { ChapterRecord } from "../../../types";

/** 14.6 Certifications */
export const chapter = {
  "id": "cy-14-6-certifications",
  "title": "14.6 Certifications",
  "minutes": 14,
  "level": "advanced",
  "phase": "Part 14 · Resources, Citations & Reference Library",
  "partName": "Part 14 · Resources, Citations & Reference Library",
  "overviewText": "There is no industry-standard Cypress certificate that substitutes for a repo. Cypress has offered vendor training/certification at times; ISTQB is process, not Cypress. Hiring for Bizlevate-like roles looks at GitHub, CI, and architecture answers (13.3). Do not wait on a cert to apply. Playwright and Appium similarly care more about evidence than badges.",
  "why": "Candidates hide behind badges when they cannot explain cy.origin args. Interviewers know.",
  "when": "When a bootcamp sells a 'certified Cypress engineer' package, and when HR screening filters on ISTQB.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "A recruiter asks if you are Cypress-certified.",
    "pass": "You say you have a CI-gated HRM suite and can whiteboard origin vs Playwright, and that vendor certs are optional.",
    "fail": "You delay the job search until a vendor exam, or you claim ISTQB proves Cypress multi-tab skill."
  },
  "tools": [],
  "customSummary": "- No must-have Cypress cert; portfolio > badge.\n- ISTQB ≠ Cypress architecture.\n- Vendor certs optional if employer-paid.\n- Same for Playwright/Appium — evidence first.\n- Do not fake certs.",
  "contentMarkdown": "## How to answer the recruiter\n\n\"I'm not blocked on a Cypress certificate. Here's a GitHub repo with GitHub Actions, `cy.origin`, component tests, and a README that lists what Cypress cannot do. Happy to walk through it.\"\n\nIf they require ISTQB Foundation, take it as a **process** exam — it will not mention `includeShadowDom`, grep plugins, or Mochawesome two-part reports.\n\n## What exists\n\n- Cypress.io has offered vendor training/certification at times. Useful if a consultancy needs a badge to staff a project. Still keep the capstone; the client lead will code-review you on Monday.\n- ISTQB / similar: methodology, not Cypress.\n- Playwright does not have a universally respected paid cert either; Microsoft Learn modules exist — same rule: evidence > badge.\n- Selenium: old \"Selenium certification\" mills are a red flag.\n- Appium: vendor/device-farm certs — optional.\n\n## When a cert hurts\n\nWaiting six weeks to apply. Faking a badge. Claiming ISTQB proves you can do Cypress multi-tab (you cannot — 9.3) or native iOS (Appium — 9.17).\n\nInterview line: \"Certification is optional. I demonstrate Cypress with a real suite and honest limits. Playwright, Selenium, and Appium are the same: repos beat PDFs.\"",
  "blocks": [
    {
      "id": "cy-14-6-md-0",
      "type": "overview",
      "heading": "How to answer the recruiter",
      "content": "\"I'm not blocked on a Cypress certificate. Here's a GitHub repo with GitHub Actions, `cy.origin`, component tests, and a README that lists what Cypress cannot do. Happy to walk through it.\"\n\nIf they require ISTQB Foundation, take it as a **process** exam — it will not mention `includeShadowDom`, grep plugins, or Mochawesome two-part reports.",
      "order": 0
    },
    {
      "id": "cy-14-6-md-1",
      "type": "overview",
      "heading": "What exists",
      "content": "- Cypress.io has offered vendor training/certification at times. Useful if a consultancy needs a badge to staff a project. Still keep the capstone; the client lead will code-review you on Monday.\n- ISTQB / similar: methodology, not Cypress.\n- Playwright does not have a universally respected paid cert either; Microsoft Learn modules exist — same rule: evidence > badge.\n- Selenium: old \"Selenium certification\" mills are a red flag.\n- Appium: vendor/device-farm certs — optional.",
      "order": 1
    },
    {
      "id": "cy-14-6-md-2",
      "type": "overview",
      "heading": "When a cert hurts",
      "content": "Waiting six weeks to apply. Faking a badge. Claiming ISTQB proves you can do Cypress multi-tab (you cannot — 9.3) or native iOS (Appium — 9.17).\n\nInterview line: \"Certification is optional. I demonstrate Cypress with a real suite and honest limits. Playwright, Selenium, and Appium are the same: repos beat PDFs.\"",
      "order": 2
    }
  ],
  "advantages": [
    "14.6 Certifications — Candidates hide behind badges when they cannot explain cy."
  ],
  "limitations": [
    "14.6 Certifications is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
