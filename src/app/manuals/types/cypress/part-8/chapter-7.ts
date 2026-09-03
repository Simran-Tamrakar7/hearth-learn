import type { ChapterRecord } from "../../../types";

/** 57. Conferences & Talks */
export const chapter = {
  id: "cy-57-conferences",
  title: "57. Conferences & Talks",
  minutes: 16,
  level: "beginner",
  phase: "Part 8 · Resources, Citations & Reference Library",
  partName: "Part 8 · Resources, Citations & Reference Library",
  overviewText: "CypressConf talks, TestBash, and recorded meetups preview roadmap and real architecture stories.",
  why: "Talks often show design rationale before docs catch up.",
  when: "Researching patterns or Cloud features.",
  practical: {"app":"Learning","scenario":"Need flake management case study.","pass":"Watch CypressConf + MoT recordings.","fail":"Ignore talks until stuck inventing alone."},
  tools: [],
  customSummary: "- https://cypress.io — CypressConf / event listings\n- Ministry of Testing TestBash recordings\n- YouTube: Cypress.io channel for official talks",
  contentMarkdown: "## Where to look\n\nCypressConf, Cypress.io YouTube, and Ministry of Testing archives. Prefer case-study talks on parallelization and component testing.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
