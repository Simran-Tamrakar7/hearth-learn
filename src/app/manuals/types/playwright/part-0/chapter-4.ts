import type { ChapterRecord } from "../../../types";

/** 3. Why Companies Choose Playwright Over Alternatives */
export const chapter = {
  "id": "pw-0-why",
  "title": "3. Why Companies Choose Playwright Over Alternatives",
  "minutes": 30,
  "level": "beginner",
  "phase": "Part 0 · Background",
  "partName": "Part 0 · Background",
  "overviewText": "Companies choose Playwright over Selenium and Cypress for three recurring reasons: speed and reliability from direct CDP/WebSocket communication plus built-in auto-waiting; first-class support for modern web patterns like SPAs, shadow DOM, and nested iframes; and a job market that increasingly lists Playwright alongside or instead of Selenium. The flakiness reduction after migration is often dramatic — not because applications got faster, but because the framework stopped requiring every test author to hand-craft wait conditions correctly.",
  "why": "This is the chapter you cite in stakeholder conversations and interviews. 'Playwright is faster' is vague; 'Playwright talks CDP over WebSocket instead of HTTP WebDriver, and auto-waits on actionability so our flaky-test rate dropped' is actionable. The modern-web-app argument (shadow DOM, client-side routing) explains why a Selenium suite written in 2018 struggles on a 2024 React app without any application bugs.",
  "when": "Use this framing when pitching a migration, writing a business case for tooling change, or preparing for interview comparisons (Playwright vs Selenium vs Cypress). Revisit alongside Chapters 5, 7, and 8 in Part 2 — auto-waiting is the recurring theme that connects this chapter to hands-on practice.",
  "practical": {
    "app": "Fintech web app — Selenium migration pilot",
    "scenario": "A team runs 400 Selenium tests with a 12% flake rate on CI — mostly 'element not interactable' and stale element references after React re-renders. They port 50 critical-path tests to Playwright over two sprints. Flake rate on the ported subset drops below 2% with no application changes, only framework swap and locator updates to get_by_role.",
    "pass": "Pilot report shows 85% flake reduction on ported tests; stakeholders approve full migration timeline.",
    "fail": "Team adds more time.sleep() calls to the Selenium suite instead of evaluating Playwright — flake rate climbs to 18% as the app adds async components."
  },
  "advantages": [
    "CDP/WebSocket path is lower overhead than Selenium's HTTP WebDriver server hop",
    "Auto-waiting eliminates the single biggest Selenium pain point — manual explicit waits",
    "frame_locator() and shadow-piercing locators handle iframe and web-component UIs Selenium needs workarounds for",
    "Multi-tab and cross-origin navigation work natively — Cypress historically struggled here by design",
    "Python, Java, .NET, and JS bindings mean teams aren't locked to one language",
    "Rising job-posting frequency makes Playwright a career-relevant skill, not a niche experiment"
  ],
  "limitations": [
    "Migration from Selenium has upfront cost — locators, wait patterns, and Grid infrastructure don't port automatically",
    "Cypress's in-browser execution model is genuinely faster for single-tab Chromium-only suites — Playwright wins on breadth, not every micro-benchmark",
    "'Lower flakiness' assumes locators are written well — bad get_by_text on ambiguous strings will still flake",
    "Enterprise Selenium Grid investments (BrowserStack, Sauce Labs integrations) may already be amortized",
    "Job market trend doesn't mean every company has switched — Selenium still dominates legacy codebases",
    "Auto-waiting can hide performance regressions — tests pass while users wait on slow SPAs"
  ],
  "tools": [],
  "contentMarkdown": "Speed and reliability vs Selenium, modern SPA/shadow DOM support, lower flakiness from auto-waiting, and rising job-market demand.\n\n## Speed and reliability vs Selenium\n\nTwo distinct claims worth separating.\n\nSpeed: Playwright communicates with the browser directly over CDP/WebSocket (see Part 1, Chapter 3), which is a lower-overhead path than Selenium’s WebDriver protocol, which adds an extra HTTP layer (the WebDriver server) between your test code and the browser.\n\nReliability: this comes almost entirely from auto-waiting. A Selenium suite without carefully hand-tuned explicit waits will produce intermittent failures that have nothing to do with real bugs — just timing. Teams that migrate to Playwright commonly report their flaky-test rate dropping substantially, simply because the waiting problem is handled by the framework instead of by every individual test author remembering to do it right.\n\n## Modern web app support\n\nSelenium and older Puppeteer-era approaches were designed before SPAs (React/Angular/Vue apps that don’t do full page reloads) and shadow DOM (encapsulated web components) were the norm. Playwright’s locator engine was built with these patterns in mind — it can pierce shadow DOM by default and has first-class frame_locator() support for iframes (Part 2, Chapter 9), rather than requiring the workarounds these patterns demanded in older tools.\n\n## Lower flakiness — the recurring theme\n\nRestating this because it’s genuinely the recurring theme across the entire manual — it comes up again in Chapters 5, 7, and 8. If there’s one concept to have rock-solid before moving past Part 2, it’s this one.\n\n## Growing job market demand\n\nPlaywright adoption has grown fast over the last few years, and job postings mentioning it (versus Selenium-only postings) have been trending upward. This isn’t just a “nice tool” — it’s increasingly what QA automation job descriptions actually ask for, which is part of why this manual exists in your learning path.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
