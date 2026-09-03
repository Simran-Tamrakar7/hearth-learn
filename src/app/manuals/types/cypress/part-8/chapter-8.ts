import type { ChapterRecord } from "../../../types";

/** 58. Social & Real-Time Communities */
export const chapter = {
  id: "cy-58-communities",
  title: "58. Social & Real-Time Communities",
  minutes: 15,
  level: "beginner",
  phase: "Part 8 · Resources, Citations & Reference Library",
  partName: "Part 8 · Resources, Citations & Reference Library",
  overviewText: "Discord/Spectrum history, GitHub Discussions, Stack Overflow, and social follows for fast troubleshooting.",
  why: "Obscure CI + browser issues often only exist as Discord folklore.",
  when: "Blocked after docs; or watching release chatter.",
  practical: {"app":"Debugging","scenario":"Firefox-only flake.","pass":"SO search + Discord/GitHub discussions.","fail":"Open issue without minimal repro."},
  tools: [],
  customSummary: "- https://github.com/cypress-io/cypress/discussions — official discussions\n- Stack Overflow tag [cypress]\n- Discord/community slacks listed on cypress.io",
  contentMarkdown: "## Communities\n\n- GitHub Discussions for Cypress\n- Stack Overflow `[cypress]`\n- Community Discord/Slack via cypress.io links\n- Follow core contributors for tip-sized updates",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
