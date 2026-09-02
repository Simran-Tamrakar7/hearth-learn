import type { ChapterRecord } from "../../../types";

/** 51. Books & Long-Form Reading */
export const chapter = {
  id: "pw-51-books",
  title: "51. Books & Long-Form Reading",
  minutes: 25,
  level: "beginner",
  phase: "Part 8 · Resources",
  partName: "Part 8 · Resources",
  overviewText: "QA strategy books (Agile Testing, Explore It!) age slower than tool-specific titles. Playwright deep dives currently live in docs and blogs more than print.",
  why: "Strategy books build judgment; tool docs build syntax. Both matter — but strategy survives version upgrades.",
  when: "Dip into when building testing philosophy; not required before writing first test.",
  practical: { app: "Professional development", scenario: "Want structured learning beyond tutorials before architecting team strategy.", pass: "Read Explore It! for exploratory testing mindset; use playwright.dev for syntax.", fail: "Buy outdated Selenium book expecting Playwright API coverage." },
  advantages: ["Strategy books (Explore It!, Agile Testing) transcend tool versions","Long-form builds mental models tutorials skip","Foundational testing theory applies to any automation stack","Reading signals continuous learning to hiring managers","Books provide interview vocabulary for quality advocacy","Complements hands-on practice with deliberate theory"],
  limitations: ["Playwright-specific print books lag behind release cadence","Published examples may use deprecated APIs","Books cannot replace hands-on debugging experience","Strategy books feel abstract without project context","Reading time competes with portfolio building","Some classics predate modern SPA testing challenges"],
  tools: [],
  contentMarkdown: "## Books & Long-Form Reading\n\nGeneral test automation and QA strategy books remain relevant even though few are Playwright-specific, since most of what they cover is framework/strategy-level, not tool-specific. Titles worth knowing about in this category include general software-testing foundations texts and books specifically on test automation strategy and the testing pyramid concept referenced throughout this manual — worth treating book selection here as \"does this deepen strategy/judgment,\" since tool-specific books age quickly given Playwright's fast release cadence (Part 0, Chapter 0), while strategy books age much more slowly.\n\nPlaywright-specific long-form content is thinner than Selenium's, reflecting the tool's relative youth (Part 0). Most deep Playwright learning in long-form written format currently lives in official documentation and community blog writeups (Chapter 52) rather than published books, precisely because the tool is young (first released January 2020) relative to how long book publishing cycles take — worth setting the expectation that \"the docs are the book\" for Playwright specifically, more than is typical for older, more established tools.\n\nOfficial documentation deserves to be treated as primary long-form reading, not just a lookup reference. Playwright's own documentation (playwright.dev) includes substantial conceptual guides beyond simple API reference — reading through the \"Guides\" sections in full at least once, rather than only consulting docs reactively when stuck, surfaces context and reasoning (the \"why,\" not just the \"how\") that this manual has tried to front-load but that official docs will always be first to reflect for newly-added features.",
  customSummary: "## Books & Long-Form Reading\n\nGeneral QA-strategy books stay relevant longer than tool-specific ones, since strategy ages slower than API details.\nPlaywright-specific long-form content is thin (young tool) — official docs (playwright.dev \"Guides\") function as the closest thing to \"the book,\" worth reading in full once, not just consulted reactively.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
