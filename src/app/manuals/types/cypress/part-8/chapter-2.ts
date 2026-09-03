import type { ChapterRecord } from "../../../types";

/** 52. Blogs & Written Tutorials */
export const chapter = {
  id: "cy-52-blogs",
  title: "52. Blogs & Written Tutorials",
  minutes: 18,
  level: "beginner",
  phase: "Part 8 · Resources, Citations & Reference Library",
  partName: "Part 8 · Resources, Citations & Reference Library",
  overviewText: "Official Cypress blog for releases; community blogs for flake/CI war stories; company engineering blogs for scale patterns.",
  why: "Real failure writeups teach what docs omit.",
  when: "Tracking new APIs or researching CI patterns.",
  practical: {"app":"Learning plan","scenario":"Need Cloud parallel deep dive.","pass":"Official blog + one scale case study.","fail":"Random SEO tutorial with deprecated API."},
  advantages: ["official blog","practitioner war stories","scale case studies","changelog context","guest posts","searchable SO"],
  limitations: ["outdated tutorials","SEO junk","version mismatch","Cloud sales tilt","incomplete examples","copy-paste debt"],
  tools: [],
  customSummary: "- https://www.cypress.io/blog — official releases & patterns\n- https://glebbahmutov.com/blog — deep Cypress practitioner posts\n- Company eng blogs for Cypress-at-scale CI stories",
  contentMarkdown: "## Sources\n\n- [Cypress Blog](https://www.cypress.io/blog)\n- Gleb Bahmutov’s blog — advanced recipes\n- Engineering blogs from teams running large Cypress suites (parallel, flake, CT)",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
