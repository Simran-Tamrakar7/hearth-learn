import type { ChapterRecord } from "../../../types";

/** 52. Blogs & Written Tutorials */
export const chapter = {
  id: "pw-52-blogs",
  title: "52. Blogs & Written Tutorials",
  minutes: 20,
  level: "beginner",
  phase: "Part 8 · Resources",
  partName: "Part 8 · Resources",
  overviewText: "playwright.dev blog, Microsoft dev blogs, community posts on locators, CI patterns, and filtering outdated Selenium-era advice misapplied to Playwright.",
  why: "Blogs ship faster than books and cover bleeding-edge features. Knowing which sources are authoritative saves hours of outdated Stack Overflow.",
  when: "Bookmark for when stuck on a specific problem; subscribe to official Playwright blog for release notes.",
  practical: { app: "Debugging unfamiliar failure", scenario: "Google returns 2021 Selenium answer recommending WebDriverWait for Playwright.", pass: "Check playwright.dev docs first; verify post date and Playwright version.", fail: "Copy Selenium explicit wait pattern into pytest-playwright test." },
  advantages: ["Official playwright.dev blog announces features first","Community posts cover real-world edge cases docs omit","Tutorial blogs good for specific integration patterns","Searchable — faster than book index for one problem","Microsoft engineering blogs provide architectural context","GitHub issues/discussions supplement blog troubleshooting"],
  limitations: ["Blog quality varies wildly — no peer review","Outdated posts rank high in Google for popular queries","JS-first examples need mental translation to Python","Sponsored content may push specific SaaS tools","No single blog covers full manual scope systematically","Copy-paste without understanding creates fragile tests"],
  tools: [],
  contentMarkdown: "## Blogs & Written Tutorials\n\nThe Playwright official blog is the most authoritative source for what's new and why. Release announcements there typically explain not just what changed but the reasoning behind a change, which is valuable for understanding a new feature's intended use case rather than just its syntax.\n\nCommunity blogs and personal engineering blogs from QA practitioners fill in practical, battle-tested patterns official docs don't cover. These are the most likely place to find real-world writeups of exactly the kind of problem this manual has tried to anticipate — flaky-test war stories, CI setup gotchas, framework-scaling retrospectives — since they come from people who hit a specific wall in a specific real project, which official documentation (necessarily more general-purpose) tends not to cover in the same depth.\n\nCompany engineering blogs (from companies known to use Playwright at scale) are a strong source for scaling-specific content. Worth searching for and following specifically for content addressing Part 6-level concerns (framework architecture, suite performance at scale, CI cost/time tradeoffs) — these tend to reflect real production lessons learned at a scale most individual learners won't hit until later in their career, making them valuable to read even before you're facing those exact problems yourself.",
  customSummary: "## Blogs & Written Tutorials\n\nOfficial Playwright blog = authoritative \"what's new and why.\"\nCommunity/practitioner blogs = real-world battle-tested patterns (flaky-test stories, CI gotchas) official docs don't cover.\nCompany engineering blogs from Playwright-at-scale adopters are the best source for Part 6-level scaling content.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
