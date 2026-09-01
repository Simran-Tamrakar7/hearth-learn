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
  "contentMarkdown": "## 4. What This Manual Will NOT Cover\n\nSetting boundaries early prevents wasted learning time and stops you from proposing Playwright for problems it was never designed to solve.\n\n### JavaScript/TypeScript and @playwright/test\n\nA huge amount of Playwright's official documentation and community content is **JS/TS-first** — because that is where the built-in test runner (`@playwright/test`) lives. You will frequently read JS examples online and translate syntax to Python:\n\n| JavaScript | Python |\n|------------|--------|\n| `page.getByRole('button')` | `page.get_by_role('button')` |\n| `await page.click()` | `page.click()` (sync API) |\n| `playwright.config.ts` | `pytest.ini` / `conftest.py` |\n\nThis manual **sticks to Python + pytest-playwright** throughout. It will not teach Node.js setup, `playwright.config.ts`, or JS fixture patterns. You will learn to translate — not to write TypeScript test suites.\n\n### Native mobile app testing (Appium)\n\n**Mobile web emulation** (device descriptors, viewport, touch) is in scope — testing a website as it renders in a mobile browser.\n\n**Native iOS/Android apps** (compiled apps installed from an app store) are **out of scope**. That requires **Appium**, which automates the OS-level app through XCUITest (iOS) or UiAutomator (Android) — a fundamentally different problem than browser automation.\n\nDo not confuse the two when scoping work or interviews:\n\n- \"Test our responsive checkout on mobile Safari\" → Playwright WebKit + device descriptor\n- \"Test our Flutter/React Native app login flow\" → Appium\n\n### Load and performance testing (k6, JMeter, Locust)\n\nPlaywright automates **one browser session behaving like one real user**. It is not built to simulate thousands of concurrent users measuring throughput, latency percentiles, or server capacity under stress.\n\nThat is a separate discipline:\n\n| Tool | Strength |\n|------|----------|\n| **k6** | Modern, scriptable, popular in CI, Grafana integration |\n| **JMeter** | GUI-heavy, enterprise familiarity, broad protocol support |\n| **Locust** | Python-based, code-first, good for teams already on Python |\n\nRunning 50 parallel Playwright tests and calling it \"load testing\" measures browser overhead and CI capacity — not whether your API survives Black Friday traffic. Scope Playwright for **functional E2E**; scope k6 (or similar) for **performance**.\n\n### What you will learn instead\n\nParts 1–8 cover Python environment setup, locators, actions, assertions, pytest fixtures, Page Object Model, CI integration, and advanced patterns — everything needed to build and maintain a production Playwright test suite for web applications.\n\nIf a job posting asks for Appium or k6, treat those as **complementary skills**, not gaps in this manual.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
