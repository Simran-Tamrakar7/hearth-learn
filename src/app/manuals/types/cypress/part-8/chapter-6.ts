import type { ChapterRecord } from "../../../types";

/** 56. Certifications */
export const chapter = {
  id: "cy-56-certs",
  title: "56. Certifications",
  minutes: 15,
  level: "beginner",
  phase: "Part 8 · Resources, Citations & Reference Library",
  partName: "Part 8 · Resources, Citations & Reference Library",
  overviewText: "ISTQB-style certs validate methodology, not Cypress skill. Portfolio and Cloud/CI experience outweigh Cypress cert marketing.",
  why: "Avoid over-investing in certs that do not prove automation judgment.",
  when: "Employer requires ISTQB; otherwise prefer projects.",
  practical: {"app":"Job applications","scenario":"Wonder if Cypress cert needed.","pass":"Portfolio + CI badge; ISTQB only if required.","fail":"Cert farm with no public suite."},
  tools: [],
  customSummary: "- ISTQB Foundation = methodology, not Cypress\n- No dominant must-have Cypress-only cert — verify current vendor offerings\n- Prefer public Cypress portfolio + CI over cert badges",
  contentMarkdown: "## Reality check\n\nCertifications rarely differentiate Cypress practitioners. A green CI portfolio with intercept/session/CT examples carries more signal.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
