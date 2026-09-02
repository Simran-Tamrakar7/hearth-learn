import type { ChapterRecord } from "../../../types";

/** 56. Certifications */
export const chapter = {
  id: "pw-56-certs",
  title: "56. Certifications",
  minutes: 20,
  level: "beginner",
  phase: "Part 8 · Resources",
  partName: "Part 8 · Resources",
  overviewText: "ISTQB, AWS/Azure certs, and the current lack of widely recognized Playwright-specific certification. What employers actually weight vs resume keywords.",
  why: "Certification value varies by employer and region. Knowing the landscape prevents wasting money on credentials that do not open doors.",
  when: "Research when employer job posting explicitly mentions ISTQB or cloud certs.",
  practical: { app: "Job application", scenario: "Posting requires ISTQB Foundation — debating whether to invest.", pass: "Get ISTQB if required locally; prioritize portfolio and live coding for Playwright roles.", fail: "Assume certification replaces demonstrated framework project." },
  advantages: ["ISTQB recognized in enterprise and regulated industries","Cloud certs (AWS/Azure) valued for CI infrastructure roles","Structured study fills gaps in testing theory","Resume keyword pass-through for HR screening","Employer-sponsored cert programs reduce personal cost","Foundation cert relatively quick to obtain"],
  limitations: ["No mature Playwright-specific certification program yet","ISTQB content skews theory over modern automation practice","Certs expire — maintenance cost over career","Senior hires judged on portfolio not certificates","Exam dumps undermine actual learning","Regional employer weight varies enormously"],
  tools: [],
  contentMarkdown: "## Certifications\n\nTesting-industry certifications (e.g., ISTQB) provide broad QA-methodology credibility, not Playwright-specific skill validation. ISTQB-style certifications are widely recognized in QA hiring generally and demonstrate grounding in testing terminology, methodology, and the testing pyramid concepts this manual has referenced throughout — but they don't test Playwright specifically, so they complement rather than substitute for the hands-on, tool-specific skill this manual builds.\n\nTool-specific certification options for Playwright itself are less established than for older tools like Selenium. Given Playwright's relative youth (Part 0), a mature, widely-recognized Playwright-specific certification program is less established in the market than certifications exist for older automation tools — worth checking current availability directly rather than assuming a specific program exists or remains current, since this is exactly the kind of fast-changing detail this reference section flags at the top as needing verification.\n\nA strong portfolio (Chapter 48) currently carries more practical weight than certifications for Playwright specifically, given the above. In the absence of a dominant, well-recognized Playwright certification, demonstrable project work is likely to matter more to hiring managers evaluating Playwright skill specifically than a certificate would — certifications are more valuable for the broader QA-methodology credibility they provide alongside a strong project portfolio, not as a substitute for one.",
  customSummary: "## Certifications\n\nISTQB-style certs validate broad QA methodology, not Playwright-specific skill.\nNo dominant Playwright-specific certification is well-established yet (young tool) — verify current availability rather than assume.\nA strong project portfolio currently outweighs certification for demonstrating Playwright skill specifically.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
