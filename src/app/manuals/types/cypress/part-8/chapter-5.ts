import type { ChapterRecord } from "../../../types";

/** 55. Courses & Structured Learning Platforms */
export const chapter = {
  id: "cy-55-courses",
  title: "55. Courses & Structured Learning Platforms",
  minutes: 18,
  level: "beginner",
  phase: "Part 8 · Resources, Citations & Reference Library",
  partName: "Part 8 · Resources, Citations & Reference Library",
  overviewText: "Use courses to fill gaps; official Cypress Real World App and docs courses stay most current.",
  why: "Structured paths help beginners; seniors should verify API currency.",
  when: "Bootstrapping or filling a specific gap (CT, Cloud).",
  practical: {"app":"Learning path","scenario":"Need CT intro fast.","pass":"Official CT guide + RWA repo.","fail":"Udemy course on Cypress 5 APIs uncritically."},
  advantages: ["official RWA","Test Automation University","structured paths","CT workshops","Cloud labs","certificate optional"],
  limitations: ["stale Udemy","paywalls","shallow CI coverage","marketing Cloud","time sink","duplicate this manual"],
  tools: [],
  customSummary: "- https://learn.cypress.io — official learning\n- https://github.com/cypress-io/cypress-realworld-app — end-to-end reference app\n- Test Automation University Cypress courses for free structured paths",
  contentMarkdown: "## Recommended\n\n- [learn.cypress.io](https://learn.cypress.io)\n- [cypress-realworld-app](https://github.com/cypress-io/cypress-realworld-app)\n- Test Automation University — Cypress courses",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
