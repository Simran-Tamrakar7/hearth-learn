import type { ChapterRecord } from "../../types";

/** 4. What This Manual Will NOT Cover */
export const chapter = {
  "id": "pw-0-not",
  "title": "4. What This Manual Will NOT Cover",
  "minutes": 20,
  "level": "beginner",
  "phase": "Part 0 · Background",
  "partName": "Part 0 · Background",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "Out of scope: JS/TS Playwright as the teaching language, native mobile (Appium), and load/performance testing (k6/JMeter/Locust).\n\n## JavaScript/TypeScript Playwright\n\nWorth flagging early: a huge amount of Playwright’s own official documentation and community content is written JS/TS-first (since that’s Playwright’s native language and where the built-in test runner lives). You’ll frequently find yourself reading JS examples online and needing to mentally translate syntax to Python (e.g., page.click() stays similar, but async/await patterns, config files, and the test runner itself differ). This manual won’t teach you that translation — it sticks to Python + pytest-playwright throughout.\n\n## Native mobile and load testing\n\nMobile native app testing is Appium territory. Mobile web emulation (Chapter 2) is in scope — testing a website as it renders in a mobile browser. Testing an actual native iOS/Android app (a compiled app installed from an app store) is a fundamentally different problem requiring Appium, which automates the OS-level app itself rather than a browser. Don’t confuse the two when scoping future learning.\n\nLoad/performance testing is k6 / JMeter / Locust. Playwright automates one browser session behaving like one real user — it’s not built to simulate thousands of concurrent users hitting a server to measure throughput/latency under load. That’s a separate discipline with its own dedicated tools: k6 (modern, scriptable, popular in CI), JMeter (older, GUI-heavy, still widely used), and Locust (Python-based, code-first).",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
