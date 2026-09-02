import type { ChapterRecord } from "../../../types";

/** 8. How to Use This Manual */
export const chapter = {
  id: "pw-8-how-to-use",
  title: "8. How to Use This Manual",
  minutes: 18,
  level: "beginner",
  phase: "Part 0 · Background & Context",
  partName: "Part 0 · Background & Context",
  overviewText: "Every part ships in Expanded (learn) and Summarized (review) formats. Parts 1–4 are sequential foundation; Parts 5–8 are reference material. Bizlevate HRM anchors practical examples throughout.",
  why: "Understanding the manual's structure prevents skipping foundations or drowning in reference chapters too early.",
  when: "Read first. Revisit when jumping between parts or preparing for interviews.",
  practical: { app: "Self-study plan", scenario: "You have two weeks before an interview.", pass: "Complete Parts 0–1 expanded, then review summarized versions for Parts 2–4.", fail: "Jump straight to Part 7 career chapters without hands-on practice." },
  advantages: ["Dual format supports both deep learning and quick review","Sequential Parts 1–4 build skills in correct order","Reference Parts 5–8 available without linear reading","Bizlevate examples ground theory in real HRM workflows","Addendums are core content — not optional footnotes","Part-by-part delivery matches incremental study pace"],
  limitations: ["Non-linear reading risks missing prerequisite concepts","Summarized versions omit nuance needed for deep interviews","Bizlevate examples may not map to every reader's domain","Manual scope is Playwright/Python only — no Cypress parity yet","Addendum chapters increase total reading volume","Self-paced study requires discipline without external deadlines"],
  tools: [],
  contentMarkdown: "## 8. How to Use This Manual\n\nTwo formats per part, always. An Expanded version (full explanation, reasoning, context, and practical ties to your Bizlevate work) and a Summarized version (tight, scannable, revision-friendly). Use Expanded for first-pass learning; use Summarized for quick review before interviews or when you just need a refresher. Sequential but not rigid. Parts 1–4 build on each other (Foundations → Core Interactions → Test Structure → Advanced Techniques) and are best read in order the first time. Parts 5–7 and Part 8 can be treated more as reference material to dip into as needed once the fundamentals are solid. Addendums are gap-fills, not optional extras. Sections marked \"(+ addendum: ...)\" throughout the outline were added specifically to cover practical topics that a first-pass syllabus tends to miss (e.g., cookie management, DB-level assertions, OAuth popup handling). Treat these with equal weight to the numbered sections around them. Bizlevate framing throughout. Where relevant, sections tie back to your actual work context (HRM system: Employee Management, Attendance, Leave, Payroll, Onboarding/Offboarding, Appraisal; plus TADA) so the manual isn't purely academic. Part-by-part delivery. You provide raw notes/data for each part in chat, and each part gets fully expanded (with gaps filled in, clearly reasoned from standard Playwright practice) and then condensed into the summarized version.",
  customSummary: "## 8. How to Use This Manual\n\n- Every part delivered in two formats: Expanded (learn) and Summarized (review).\n- Parts 1–4 = sequential foundation; Parts 5–8 = reference material, dip in as needed.\n- Addendums are core content, not optional footnotes.\n- Bizlevate work (HRM modules + TADA) used as the practical anchor throughout.\n- Process: you send raw data per part → gets expanded + summarized here, one part at a time.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
