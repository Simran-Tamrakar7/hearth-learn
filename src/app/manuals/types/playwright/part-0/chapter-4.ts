import type { ChapterRecord } from "../../types";

/** 3. Why Companies Choose Playwright Over Alternatives */
export const chapter = {
  "id": "pw-0-why",
  "title": "3. Why Companies Choose Playwright Over Alternatives",
  "minutes": 30,
  "level": "beginner",
  "phase": "Part 0 · Background",
  "partName": "Part 0 · Background",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "Speed and reliability vs Selenium, modern SPA/shadow DOM support, lower flakiness from auto-waiting, and rising job-market demand.\n\n## Speed and reliability vs Selenium\n\nTwo distinct claims worth separating.\n\nSpeed: Playwright communicates with the browser directly over CDP/WebSocket (see Part 1, Chapter 3), which is a lower-overhead path than Selenium’s WebDriver protocol, which adds an extra HTTP layer (the WebDriver server) between your test code and the browser.\n\nReliability: this comes almost entirely from auto-waiting. A Selenium suite without carefully hand-tuned explicit waits will produce intermittent failures that have nothing to do with real bugs — just timing. Teams that migrate to Playwright commonly report their flaky-test rate dropping substantially, simply because the waiting problem is handled by the framework instead of by every individual test author remembering to do it right.\n\n## Modern web app support\n\nSelenium and older Puppeteer-era approaches were designed before SPAs (React/Angular/Vue apps that don’t do full page reloads) and shadow DOM (encapsulated web components) were the norm. Playwright’s locator engine was built with these patterns in mind — it can pierce shadow DOM by default and has first-class frame_locator() support for iframes (Part 2, Chapter 9), rather than requiring the workarounds these patterns demanded in older tools.\n\n## Lower flakiness — the recurring theme\n\nRestating this because it’s genuinely the recurring theme across the entire manual — it comes up again in Chapters 5, 7, and 8. If there’s one concept to have rock-solid before moving past Part 2, it’s this one.\n\n## Growing job market demand\n\nPlaywright adoption has grown fast over the last few years, and job postings mentioning it (versus Selenium-only postings) have been trending upward. This isn’t just a “nice tool” — it’s increasingly what QA automation job descriptions actually ask for, which is part of why this manual exists in your learning path.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
