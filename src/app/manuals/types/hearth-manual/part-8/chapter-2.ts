import type { ChapterRecord } from "../../../types";

/** 9.2 When to Run It */
export const chapter = {
  id: "hm-9-2",
  title: "9.2 When to Run It",
  minutes: 20,
  level: "intermediate",
  phase: "Part 9 · Meta",
  partName: "Part 9 · Meta",
  overviewText: "Re-run documentation generation after major features ship, before onboarding a new developer, or periodically (e.g. monthly) to catch drift between docs and code.",
  why: "Maintenance schedule for keeping manual accurate.",
  when: "Calendar reminder for doc owners.",
  practical: {"app":"Big feature merge","scenario":"Life Lab v2 ships.","pass":"Update Part 4.7, Part 6 API index, run diff against previous manual version.","fail":"You never update docs and manual diverges silently."},
  tools: [],
  contentMarkdown: "## When to regenerate\n\n1. **After major feature ships** — new routes, models, or catalogs\n2. **Before onboarding** — new developer or contributor\n3. **Periodically** — monthly or each release\n4. **After registry refactor** — e.g. manuals/_content → types/\n\nPriority updates: Part 3 (codebase map), Part 6 (API), Part 4 feature chapters touched.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
