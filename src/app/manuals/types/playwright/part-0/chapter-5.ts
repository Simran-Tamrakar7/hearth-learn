import type { ChapterRecord } from "../../../types";

/** 4. What This Manual Will NOT Cover */
export const chapter = {
  "id": "pw-0-not",
  "title": "4. What This Manual Will NOT Cover",
  "minutes": 20,
  "level": "beginner",
  "phase": "Part 0 · Background",
  "partName": "Part 0 · Background",
  "overviewText": "This manual teaches Playwright through Python and pytest-playwright — not JavaScript/TypeScript or the @playwright/test runner. It also excludes native mobile app testing (Appium's domain) and load/performance testing (k6, JMeter, Locust). Mobile web emulation via device descriptors is in scope; testing a compiled iOS/Android app is not. Setting these boundaries early prevents wasted learning time and stops you from proposing Playwright for problems it was never designed to solve.",
  "why": "Scope clarity saves weeks. Beginners often copy JS examples from Playwright docs and struggle with async patterns, config files, and fixture syntax that don't apply to Python. Others propose Playwright for 10,000-user load tests or native app flows — setting wrong expectations with stakeholders. Knowing what's out of scope lets you recommend the right tool (Appium, k6) without dismissing Playwright's strengths.",
  "when": "Read this before Part 1 setup so you know you'll install pytest-playwright, not npm init @playwright/test. Revisit when evaluating adjacent skills — if a job posting asks for Appium or k6, that's a separate learning path, not a gap in this manual.",
  "practical": {
    "app": "QA team — test strategy workshop",
    "scenario": "A product manager asks the QA lead to 'use Playwright for load testing the checkout API under Black Friday traffic.' Because you read this chapter, you explain that Playwright simulates one browser user at a time — load testing needs k6 or Locust — while Playwright covers the functional checkout E2E path. The team splits scope correctly instead of forcing Playwright into the wrong role.",
    "pass": "Strategy doc lists Playwright for E2E UI regression and k6 for load — each tool owns its lane.",
    "fail": "Team runs 50 parallel Playwright checkout tests and calls it 'load testing' — results show browser overhead, not server capacity, and miss real concurrency bugs."
  },
  "advantages": [
    "Python + pytest-playwright focus means one language for tests, fixtures, and CI scripts — no context-switching to Node",
    "Clear boundaries prevent tool misuse that produces misleading results (Playwright-as-load-tester)",
    "Knowing Appium vs mobile-web emulation avoids scoping native app work into a browser automation project",
    "JS/TS awareness lets you translate official docs without expecting this manual to teach Node patterns",
    "Honest scope builds credibility with engineers who know the difference between E2E and performance testing",
    "Leaves room in your learning path for k6/Locust and Appium as complementary skills"
  ],
  "limitations": [
    "You won't learn @playwright/test, playwright.config.ts, or JS fixture patterns from this manual",
    "Official Playwright docs and most blog posts are JS-first — translation overhead is real",
    "No coverage of native mobile automation — HRMS mobile apps need a separate Appium investment",
    "No load/performance methodology — you must learn k6 or JMeter separately for capacity planning",
    "Mobile web emulation doesn't catch OS-level bugs (push notifications, deep links) visible only on real devices",
    "Teams standardized on JS/TS may find Python-only training misaligned with their repo conventions"
  ],
  "tools": [],
  "contentMarkdown": "Out of scope: JS/TS Playwright as the teaching language, native mobile (Appium), and load/performance testing (k6/JMeter/Locust).\n\n## JavaScript/TypeScript Playwright\n\nWorth flagging early: a huge amount of Playwright’s own official documentation and community content is written JS/TS-first (since that’s Playwright’s native language and where the built-in test runner lives). You’ll frequently find yourself reading JS examples online and needing to mentally translate syntax to Python (e.g., page.click() stays similar, but async/await patterns, config files, and the test runner itself differ). This manual won’t teach you that translation — it sticks to Python + pytest-playwright throughout.\n\n## Native mobile and load testing\n\nMobile native app testing is Appium territory. Mobile web emulation (Chapter 2) is in scope — testing a website as it renders in a mobile browser. Testing an actual native iOS/Android app (a compiled app installed from an app store) is a fundamentally different problem requiring Appium, which automates the OS-level app itself rather than a browser. Don’t confuse the two when scoping future learning.\n\nLoad/performance testing is k6 / JMeter / Locust. Playwright automates one browser session behaving like one real user — it’s not built to simulate thousands of concurrent users hitting a server to measure throughput/latency under load. That’s a separate discipline with its own dedicated tools: k6 (modern, scriptable, popular in CI), JMeter (older, GUI-heavy, still widely used), and Locust (Python-based, code-first).",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
