import type { ChapterRecord } from "../../../types";

/** 53. Newsletters */
export const chapter = {
  id: "cy-53-newsletters",
  title: "53. Newsletters",
  minutes: 15,
  level: "beginner",
  phase: "Part 8 · Resources, Citations & Reference Library",
  partName: "Part 8 · Resources, Citations & Reference Library",
  overviewText: "Newsletters are the sustainable way to track Cypress releases and curated testing links.",
  why: "Release cadence is easy to miss without a digest.",
  when: "Weekly habit for staying current.",
  practical: {"app":"Inbox triage","scenario":"Keep up without Twitter doomscroll.","pass":"One testing + Cypress digest.","fail":"Zero update channel until breakages."},
  advantages: ["release digests","curated links","low time cost","discover talks","tool comparisons","community pulse"],
  limitations: ["inbox noise","promo content","lag vs Discord","paywalls","unsubscribe churn","duplicate links"],
  tools: [],
  customSummary: "- https://cypress.io — product updates / blog RSS\n- Testing newsletters (Ministry of Testing, Software Testing Weekly) for broader QA signal\n- Use digests to catch Cypress minor releases",
  contentMarkdown: "## Stay current\n\nSubscribe to Cypress blog/RSS and a general testing newsletter (e.g. Ministry of Testing). Use digests to notice breaking config defaults early.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
