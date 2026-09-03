import type { ChapterRecord } from "../../../types";

/** 51. Books & Long-Form Reading */
export const chapter = {
  id: "cy-51-books",
  title: "51. Books & Long-Form Reading",
  minutes: 20,
  level: "beginner",
  phase: "Part 8 · Resources, Citations & Reference Library",
  partName: "Part 8 · Resources, Citations & Reference Library",
  overviewText: "Strategy books age better than tool manuals. Official Cypress docs are the primary long-form reference; pair with general testing classics.",
  why: "Judgment from strategy texts outlasts API churn.",
  when: "Building philosophy alongside hands-on practice.",
  practical: {"app":"Professional development","scenario":"Want depth beyond docs.","pass":"Docs guides + one strategy book.","fail":"Only outdated Selenium print books."},
  advantages: ["docs as book","strategy longevity","interview vocabulary","pyramid mental models","community books","official changelogs"],
  limitations: ["few Cypress print books","API drift","time cost","abstract without practice","marketing titles","version screenshots"],
  tools: [],
  customSummary: "- https://docs.cypress.io — primary long-form Guides\n- Prefer QA strategy books (Agile Testing, Explore It!) over tool cookbooks\n- Treat release blog + migration guides as living chapters",
  contentMarkdown: "## Primary reading\n\n- [Cypress Docs — Guides](https://docs.cypress.io) — conceptual guides, not only API lookup\n- General QA strategy: *Agile Testing*, *Explore It!*, testing pyramid literature\n\nCypress-specific print books lag the release cadence; official docs remain authoritative.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
