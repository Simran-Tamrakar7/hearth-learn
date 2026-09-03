import type { ChapterRecord } from "../../../types";

/** 4. What This Manual Will NOT Cover */
export const chapter = {
  id: "pw-4-not-covered",
  title: "4. What This Manual Will NOT Cover",
  minutes: 20,
  level: "beginner",
  phase: "Part 0 · Background & Context",
  partName: "Part 0 · Background & Context",
  overviewText: "This manual excludes @playwright/test JS runner, native mobile (Appium), and load testing (k6/JMeter). Python + pytest-playwright only; mobile web emulation is in scope.",
  why: "Scope honesty prevents mis-selling Playwright for Appium or k6 workloads.",
  when: "Read at start. Revisit when asked for mobile app or load tests.",
  practical: { app: "Native mobile HRM app", scenario: "Product wants iOS App Store automation in Playwright.", pass: "Explain viewport emulation vs native — recommend Appium.", fail: "Attempt native mobile automation in Playwright." },
  tools: [],
  contentMarkdown: "## 4. What This Manual Will NOT Cover\n\nJavaScript/TypeScript Playwright. This manual is Python-focused. A huge amount of Playwright's own official docs and community content is written JS/TS-first, since that's Playwright's native language and where the built-in test runner lives. You'll often find JS examples online and need to mentally translate syntax to Python — this manual sticks to Python + pytest-playwright throughout, with no translation guide included. Mobile native app testing. Mobile web emulation is in scope — testing a website as it renders in a mobile browser. Testing an actual native iOS/Android app is a fundamentally different problem requiring Appium, which automates the OS-level app itself rather than a browser. Relevant since you've already completed a full Appium roadmap separately. Load/performance testing. Playwright automates one browser session behaving like one real user — it's not built to simulate thousands of concurrent users hitting a server to measure throughput/latency under load. That's a separate discipline with its own dedicated tools: k6 (modern, scriptable, popular in CI pipelines), JMeter (older, GUI-heavy, still widely used in enterprises), and Locust (Python-based, code-first). If load testing comes up in your Bizlevate work, treat it as a separate learning track. Deep security/penetration testing. Playwright can be used in support of some security-adjacent checks (e.g., verifying an auth bypass doesn't work, checking headers), but it's not a security scanning tool — dedicated tools like OWASP ZAP or Burp Suite cover that discipline properly. Unit testing / component-level testing frameworks. Playwright operates at the browser/E2E layer. Testing an individual function or a UI component in isolation is typically the job of tools like pytest (for backend units), Jest, or React Testing Library — Playwright complements these rather than replacing them. Non-Playwright MCP/AI-agent browser automation tools. The manual's addendum on Playwright MCP is scoped narrowly to Playwright's own MCP server — general AI-agent browser tooling outside that isn't covered.",
  customSummary: "## 4. What This Manual Will NOT Cover\n\n### Python + pytest-playwright only — no JS/TS Playwright coverage\n### No native mobile app testing — that's Appium's domain (already covered separately)\n### No load/performance testing — that's k6/JMeter/Locust's domain, treat as separate track\n- Also out of scope: deep security/pen testing (ZAP/Burp), unit/component testing (pytest/Jest/RTL), general AI-agent browser tooling beyond Playwright's own MCP server.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
