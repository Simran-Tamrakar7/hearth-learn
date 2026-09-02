import type { ChapterRecord } from "../../../types";

/** 54. Podcasts */
export const chapter = {
  id: "pw-54-podcasts",
  title: "54. Podcasts",
  minutes: 15,
  level: "beginner",
  phase: "Part 8 · Resources",
  partName: "Part 8 · Resources",
  overviewText: "Testing and engineering podcasts discuss quality culture, CI strategy, and career paths. Less Playwright-specific syntax, more strategic framing.",
  why: "Podcasts expose how senior engineers think about quality — useful for interview narrative and team influence beyond writing tests.",
  when: "Listen during commute; not a primary learning path for syntax.",
  practical: { app: "Commute learning", scenario: "Want to understand how FAANG teams structure QA without reading whitepapers.", pass: "Listen to Test Guild or Ministry of Testing episodes on CI and culture.", fail: "Expect step-by-step Playwright coding instruction from audio." },
  advantages: ["Strategic framing for test culture and team structure","Guest practitioners share real organizational war stories","Commute-friendly format for continuous exposure","Interview preparation for 'how would you improve QA?' questions","Cross-tool perspective prevents Playwright tunnel vision","Archived episodes searchable by topic"],
  limitations: ["No code examples — cannot learn syntax from audio","Episode quality varies with guest preparation","Advice may reflect speaker's company context not yours","Time investment without hands-on practice yields little skill gain","Few Playwright-specific deep-dive episodes","Outdated episodes may reference deprecated tooling"],
  tools: [],
  contentMarkdown: "## Podcasts\n\nSoftware testing and QA-focused podcasts are a good fit for passive learning during commute/routine tasks. Look specifically for episodes or shows covering test automation strategy, framework design, and interviews with practitioners at companies running large-scale test suites — the conversational format is particularly good for picking up the judgment-and-reasoning layer of this field (why a team made a specific tradeoff) rather than pure technical syntax, which is better learned by doing.\n\nGeneral software-engineering podcasts occasionally cover testing deeply and shouldn't be overlooked in favor of QA-only shows. Some of the best practical content on topics like CI/CD philosophy (Part 5) and framework architecture (Part 6) comes from general engineering podcasts discussing testing as part of a broader engineering-practices conversation, not exclusively from QA-branded shows — worth casting a slightly wider net than \"testing podcasts\" specifically.",
  customSummary: "## Podcasts\n\nGood for passive learning of judgment/reasoning (why teams made a tradeoff), less suited to hands-on syntax learning.\nDon't limit to QA-only shows — general engineering podcasts often cover CI/CD and framework-architecture topics just as well.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
