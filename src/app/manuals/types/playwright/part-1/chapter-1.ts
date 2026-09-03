import type { ChapterRecord } from "../../../types";

/** 9. Introduction to Playwright — tool comparison chapter. */
export const chapter = {
  id: "pw-9-intro",
  title: "9. Introduction to Playwright",
  minutes: 30,
  level: "beginner",
  phase: "Part 1 · Foundations",
  partName: "Part 1 · Foundations",
  overviewText:
    "Part 1 begins hands-on learning: Playwright vs Selenium vs Cypress comparison, supported browsers and languages, and the mental shift from why to how.",
  why: "The comparison table is an interview staple — architectural differences matter more than feature checklists.",
  when: "Read after Part 0 before installing your environment.",
  practical: {
    app: "QA tool committee",
    scenario: "Pick between three tools for React SPA with Python backend team.",
    pass: "Present table with scenario-based reasoning favoring Playwright Python bindings.",
    fail: "Recommend based on Stack Overflow popularity alone.",
  },
  comparisonHeaders: { lever: "Capability", equivalent: "Cypress" },
  comparisons: [
    {
      lever: "Protocol",
      equivalent: "Runs inside the browser",
      verdict: "Playwright: CDP/WebSocket (external) — Selenium: WebDriver HTTP",
    },
    {
      lever: "Browsers",
      equivalent: "Chromium-family (+ experimental Firefox/WebKit)",
      verdict: "Playwright: Chromium, Firefox, WebKit natively",
    },
    {
      lever: "Auto-waiting",
      equivalent: "Yes",
      verdict: "Playwright: Yes — Selenium: No (manual waits)",
    },
    {
      lever: "Multi-tab / multi-origin",
      equivalent: "Weak (architectural limitation)",
      verdict: "Playwright: Native support — Selenium: Clunky",
    },
    {
      lever: "Language support",
      equivalent: "JS/TS only",
      verdict: "Playwright: JS/TS, Python, Java, .NET — Selenium: many",
    },
  ],
  keyDifferences: [
    "Cypress executes test code inside the browser (fast DOM visibility, same-origin and multi-tab ceilings). Playwright drives the browser from outside via CDP — which is why multi-tab and cross-origin flows are first-class.",
  ],
  tools: [],
  contentMarkdown: `## 9. Introduction to Playwright

What is Playwright, why it exists. This chapter restates the origin story from Part 0 but frames it as the entry point to hands-on learning — the point where you stop reading about the tool and start touching it. The key mental shift here: everything in Part 0 was "why should I care," Part 1 onward is "how do I actually use this."

Supported browsers & languages. Browsers: Chromium (covers Chrome + Edge), Firefox, WebKit (Safari engine — testable without a Mac). Languages: JavaScript/TypeScript, Python, Java, and .NET/C#. Python's API is a near-complete mirror of the JS one (snake_case vs camelCase) — translating JS examples is usually mechanical.`,
  customSummary: `## 9. Introduction to Playwright

- Part 1 shifts from "why Playwright" (Part 0) to "how to actually use it."
- Playwright vs Selenium vs Cypress: Playwright uses direct CDP/WebSocket, auto-waits, native multi-tab/cross-origin support, and covers JS/TS, Python, Java, .NET.
- Cypress runs inside the browser (fast, but weak on multi-tab/cross-origin); Selenium uses WebDriver HTTP calls (no auto-waiting, slower).
- Browsers: Chromium (Chrome+Edge), Firefox, WebKit (Safari engine, testable without a Mac).
- Python's API mirrors the JS API almost exactly (snake_case vs camelCase) — JS examples translate mechanically`,
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
