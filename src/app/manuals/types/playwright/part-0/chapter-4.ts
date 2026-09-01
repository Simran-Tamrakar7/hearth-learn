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
  "contentMarkdown": "## 3. Why Companies Choose Playwright Over Alternatives\n\nTool selection is rarely about \"best in absolute terms\" — it is about fit for team skills, application architecture, and CI constraints. Playwright wins specific scenarios decisively; knowing which ones makes you credible in architecture reviews and interviews.\n\n### Speed and reliability vs Selenium\n\nSelenium communicates with browsers over the **WebDriver protocol** — HTTP request/response to a separate driver process. Every command serializes, waits, deserializes. Playwright holds a persistent **WebSocket** connection via CDP — lower overhead, faster round-trips, and real-time event streams (network, console, DOM mutations).\n\nThe reliability gap is larger than the speed gap. Selenium leaves wait management to the test author. Playwright's auto-waiting eliminates the most common flake source: acting on elements before they are ready. Teams migrating from Selenium often report **50–80% reduction in flaky failures** in the first quarter — without rewriting application code, only test code.\n\nTrade-off: teams with years of Selenium Grid infrastructure face migration cost. Playwright is not a drop-in replacement for WebDriver-based frameworks — it is a deliberate upgrade path.\n\n### Modern web support\n\nSPAs, shadow DOM, nested iframes, and client-side routing are first-class concerns in Playwright's locator design:\n\n- `get_by_role`, `get_by_label`, `get_by_text` query the accessibility tree — survive CSS refactors\n- `frame_locator()` handles iframes without window-handle switching\n- Shadow piercing is built into locators — no special \"pierce shadow root\" ceremony\n\nSelenium can do many of these things — with more code, more waits, and more maintenance. Cypress handles SPAs well but historically struggled with multi-tab and cross-origin flows due to its in-browser execution model.\n\n### Cross-browser without separate toolchains\n\nOne API, three engines. Selenium requires separate drivers (chromedriver, geckodriver, safaridriver) with version-matching headaches. Cypress historically centered on Chromium. Playwright downloads matched binaries with `playwright install` — one command, consistent versions.\n\nWebKit support matters for Safari-like testing on Linux CI — catching Safari-specific layout bugs without Mac hardware in the pipeline.\n\n### Developer experience and debugging\n\n- **Trace Viewer** — step-through DOM snapshots, network timeline, and screenshots after failure\n- **Codegen** — record interactions, export Python/JS/Java/C# locators\n- **VS Code extension** — pick locators from the page, run tests from the editor\n- **Headed debugging** — watch the browser while stepping through a failing test\n\nThese reduce mean-time-to-diagnose compared to parsing Selenium stack traces that point at the framework, not the application state.\n\n### Job market and career relevance\n\nPlaywright job postings have grown steadily since 2020 — particularly for QA automation engineers, SDETs, and full-stack teams owning their own E2E suites. Interviewers increasingly ask \"why Playwright over Selenium/Cypress?\" expecting architectural answers, not \"it is newer.\"\n\nPython + Playwright is a strong combination for teams where the backend, data pipeline, and test automation share one language. Knowing how to translate JS-first official docs into pytest-playwright is a practical skill this manual builds throughout.\n\n### When Playwright is not the obvious pick\n\n- **JS-only frontend teams** deeply invested in Cypress component testing may not gain enough from switching\n- **Native mobile apps** — Appium, not Playwright\n- **Load/performance testing** — k6, JMeter, Locust\n- **Legacy enterprises** with Selenium Grid, BrowserStack contracts, and hundreds of existing specs — migration ROI must be calculated\n\nThe honest answer in interviews: \"Playwright for browser E2E and API setup; k6 for load; Appium for native mobile.\" Scoped correctly, Playwright is often the best tool in its lane.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
