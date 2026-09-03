import type { ChapterRecord } from "../../../types";

/** 47. Real-World Capstone Project (Cypress) */
export const chapter = {
  id: "cy-47-capstone",
  title: "47. Real-World Capstone Project (Cypress)",
  minutes: 40,
  level: "advanced",
  phase: "Part 7 · Real-World Project & Job Readiness",
  partName: "Part 7 · Real-World Project & Job Readiness",
  overviewText: "Ship a capstone with 3–5 critical flows, one component test, multi-role cy.session, network intercept, CI+Docker, and a README of architectural decisions.",
  why: "Employers hire demonstrated judgment. A small complete system beats a tutorial folder of isolated commands.",
  when: "After Parts 0–6; as portfolio centerpiece.",
  practical: {"app":"Sample HR/SaaS clone","scenario":"Portfolio project deadline.","pass":"Flows + CT + session + intercept + CI green + README.","fail":"Only login.spec without CI or decisions doc."},
  advantages: ["3-5 real flows","component test","session multi-role","intercept demos","CI+Docker","README decisions"],
  limitations: ["scope creep","public API limits","Docker time sink","secrets in demos","flake under pressure","over-polish UI"],
  tools: [],
  customSummary: "- 3-5 flows; component test; session multi-role; intercept; CI+Docker; README decisions",
  contentMarkdown: "## Capstone checklist\n\n1. **3–5 E2E flows** that matter (auth, core create/update, negative path)\n2. **One component test** proving CT setup works\n3. **cy.session** for at least two roles\n4. **cy.intercept** for stub and/or wait-on-request\n5. **CI + Docker** (or official action) with artifacts\n6. **README** explaining why App Actions, why Cloud or not, known limits vs Playwright\n\nTreat the README decisions section as the interview artifact.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
