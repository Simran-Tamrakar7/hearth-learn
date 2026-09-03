import type { ChapterRecord } from "../../../types";

/** 48. Portfolio Building (Cypress) */
export const chapter = {
  id: "cy-48-portfolio",
  title: "48. Portfolio Building (Cypress)",
  minutes: 28,
  level: "intermediate",
  phase: "Part 7 · Real-World Project & Job Readiness",
  partName: "Part 7 · Real-World Project & Job Readiness",
  overviewText: "Portfolio README with CI badge, linked Mochawesome report, writeup of App Actions vs POM, and a when-to-choose Cypress vs Playwright section.",
  why: "Hiring managers skim README and CI first. Narrative about tradeoffs signals seniority.",
  when: "Publishing GitHub projects or preparing applications.",
  practical: {"app":"GitHub public repo","scenario":"Make Cypress project interview-ready.","pass":"Badge + report sample + architecture notes.","fail":"Code only, no green CI or explanation."},
  tools: [],
  customSummary: "- README CI badge; Mochawesome report; App Actions vs POM writeup; Cypress+Playwright when-to-choose",
  contentMarkdown: "## Portfolio package\n\n- README with **CI status badge**\n- Sample **Mochawesome** HTML (or screenshot) from a green run\n- Short writeup: **App Actions vs POM** and why you chose one\n- Explicit **when Cypress vs Playwright** (WebKit, multi-tab, in-browser DX)\n\nLink issues/PRs that show flake fixes — process evidence beats more specs.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
