import type { ChapterRecord } from "../../../types";

/** 3. Why Companies Choose Playwright Over Alternatives */
export const chapter = {
  id: "pw-3-why-pw",
  title: "3. Why Companies Choose Playwright Over Alternatives",
  minutes: 28,
  level: "beginner",
  phase: "Part 0 · Background & Context",
  partName: "Part 0 · Background & Context",
  overviewText: "Teams choose Playwright for CDP speed, auto-waiting reliability, native cross-browser support, modern web patterns, and strong debugging — with honest trade-offs for Cypress-invested JS teams and Selenium Grid enterprises.",
  why: "Tool selection answers need scenario-based reasoning, not abstract Playwright is more flexible.",
  when: "Read before tool-selection meetings or interviews.",
  practical: { app: "Enterprise HRM with Okta SSO", scenario: "Login redirects through Okta domain and back.", pass: "Note Playwright handles cross-origin transparently — weigh team Python skills.", fail: "Claim identical cross-origin handling to Cypress cy.origin()." },
  tools: [],
  contentMarkdown: "## 3. Why Companies Choose Playwright Over Alternatives\n\nSpeed vs Selenium. Playwright talks to the browser directly over CDP/WebSocket, a lower-overhead path than Selenium's WebDriver protocol, which adds an extra HTTP layer (the WebDriver server) between your test code and the browser. Reliability vs Selenium. This comes almost entirely from auto-waiting. A Selenium suite without carefully hand-tuned explicit waits produces intermittent failures unrelated to real bugs — just timing. Teams migrating to Playwright commonly report their flaky-test rate dropping substantially, simply because the waiting problem is handled by the framework instead of by every individual test author. Modern web app support (SPAs, shadow DOM, iframes) vs older tools. Selenium and older Puppeteer-era approaches predate SPAs (React/Angular/Vue apps without full page reloads) and shadow DOM (encapsulated web components) being the norm. Playwright's locator engine was built with these patterns in mind — it pierces shadow DOM by default and has first-class frame_locator() support for iframes, rather than needing the workarounds older tools demanded. Lower flakiness due to auto-waiting. Worth repeating deliberately — it's the recurring theme of the whole manual. If there's one concept to have rock-solid early on, it's this one. Growing job market demand. Playwright adoption has grown fast in recent years, and job postings mentioning it (vs. Selenium-only postings) have trended upward. It's increasingly what QA automation job descriptions actually ask for, which is part of why this manual exists in your learning path. Setup simplicity.\n\n```bash\npip install pytest-playwright && playwright install\n```\n\ngets you a fully working multi-browser environment in minutes — no separate driver downloads, no version-matching browser-to-driver headaches (a classic Selenium pain point where WebDriver version had to exactly match the installed browser version).\n\nConsistent, unified API across languages. Playwright supports Python, JS/TS, Java, and .NET with a near-identical API shape across all of them, so teams with mixed-language stacks can share testing knowledge/patterns more easily than with Selenium, where idioms vary more by language binding. Cost. Fully free and open-source, with no paid tier required to access core functionality — cloud execution grids like BrowserStack are optional add-ons, not a requirement to use Playwright itself.",
  customSummary: "## 3. Why Companies Choose Playwright Over Alternatives\n\n- Faster than Selenium (direct CDP vs WebDriver's extra HTTP layer).\n### More reliable due to built-in auto-waiting — fewer timing-based flaky failures\n- Better native support for SPAs, shadow DOM, iframes than older tools.\n### Rising job market demand — increasingly a named requirement in QA postings\n- Easier setup (no driver/version matching), consistent API across Python/JS/Java/.NET, fully free/open-source.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
