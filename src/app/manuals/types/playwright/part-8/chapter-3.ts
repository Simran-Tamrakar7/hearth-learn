import type { ChapterRecord } from "../../../types";

/** 53. Newsletters */
export const chapter = {
  id: "pw-53-newsletters",
  title: "53. Newsletters",
  minutes: 15,
  level: "beginner",
  phase: "Part 8 · Resources",
  partName: "Part 8 · Resources",
  overviewText: "Testing newsletters curate articles, tool updates, and community news. Sustainable way to stay current without daily social media scrolling.",
  why: "Playwright releases every 2–4 weeks. A good newsletter filters signal from noise so you learn what matters.",
  when: "Subscribe after completing Part 1; skim weekly during job search or active projects.",
  practical: { app: "Staying current", scenario: "Missed that pytest-playwright added new fixture — tests break after upgrade.", pass: "Subscribe to Software Testing Weekly or similar; read Playwright release notes.", fail: "Rely on annual conference talk for version awareness." },
  tools: [],
  contentMarkdown: "## Newsletters\n\nA weekly or biweekly testing-focused newsletter is a low-effort way to stay current given Playwright's fast release cadence. Given new minor Playwright versions roughly every 2–4 weeks (Part 0, Chapter 0), a dedicated newsletter is a more sustainable way to stay current than manually checking release notes — worth subscribing to at least one general software-testing newsletter and, if available, anything specifically tracking Playwright/browser-automation news.\n\nNewsletters are also a good discovery mechanism for the blogs and conference talks covered elsewhere in this part. Rather than trying to independently discover every good blog post or talk, a well-curated newsletter effectively pre-filters the noise — worth treating this as the primary discovery channel and the other categories in this part as destinations it points you toward, rather than trying to browse each category exhaustively yourself.",
  customSummary: "## Newsletters\n\nA dedicated testing newsletter is the sustainable way to track Playwright's fast (2–4 week) release cadence.\nNewsletters double as a discovery/curation layer pointing toward the blogs and talks in other chapters.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
