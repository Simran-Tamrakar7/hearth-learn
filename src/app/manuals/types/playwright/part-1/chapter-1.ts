import type { ChapterRecord } from "../../../types";

/** 9. Introduction to Playwright */
export const chapter = {
  id: "pw-9-intro",
  title: "9. Introduction to Playwright",
  minutes: 30,
  level: "beginner",
  phase: "Part 1 · Foundations",
  partName: "Part 1 · Foundations",
  overviewText: "Part 1 begins hands-on learning: Playwright vs Selenium vs Cypress comparison table, supported browsers and languages, and the mental shift from why to how.",
  why: "The comparison table is an interview staple — architectural differences matter more than feature checklists.",
  when: "Read after Part 0 before installing your environment.",
  practical: { app: "QA tool committee", scenario: "Pick between three tools for React SPA with Python backend team.", pass: "Present table with scenario-based reasoning favoring Playwright Python bindings.", fail: "Recommend based on Stack Overflow popularity alone." },
  advantages: ["15-row comparison table covers protocol, browsers, and debugging","Cypress in-browser limitation explained architecturally not memorized","Browser matrix includes WebKit for Safari-like CI testing","Python API mirrors JS — mechanical translation from official docs","Mental shift framing separates Part 0 context from Part 1 practice","Multi-tab and cross-origin rows decisive for SSO-heavy apps"],
  limitations: ["Comparison table ages as tools ship new features quarterly","Python bindings occasionally lag newest JS-only APIs","Table can't replace a hands-on spike in your actual app","Cypress component testing advantage not fully explored here","Selenium Grid enterprise inertia not quantified in table","Intro restates Part 0 — some content overlap is intentional"],
  tools: [],
  contentMarkdown: "## 9. Introduction to Playwright\n\nWhat is Playwright, why it exists. This chapter restates the origin story from Part 0 but frames it as the entry point to hands-on learning — the point where you stop reading about the tool and start touching it. The key mental shift here: everything in Part 0 was \"why should I care,\" Part 1 onward is \"how do I actually use this.\" Playwright vs Selenium vs Cypress. Worth having a clear mental table for this, since it's a near-guaranteed interview question:\n\n| | Selenium | Cypress | Playwright |\n|---|---|---|---|\n| **Protocol** | WebDriver (HTTP) | Runs inside browser | CDP/WebSocket (direct) |\n| **Browsers** | Most, via separate drivers | Chromium-family (+ experimental Firefox/WebKit) | Chromium, Firefox, WebKit natively |\n| **Auto-waiting** | No (manual waits) | Yes | Yes |\n| **Multi-tab/multi-origin** | Clunky | Weak (architectural limitation) | Native support |\n| **Language support** | Many (Java, Python, C#, JS...) | JS/TS only | JS/TS, Python, Java, .NET |\n| **Speed** | Slower | Fast | Fast |\n\n\nThe Cypress limitation is worth understanding, not just memorizing: Cypress executes its test code inside the browser itself, in the same run loop as the page. This is why it's fast, but it also means it historically struggled with things like multiple tabs or cross-origin navigation (testing a flow that goes from your site to a third-party payment page and back) — because it's architecturally tied to a single browser tab/origin. Playwright runs outside the browser and drives it externally, which is why it doesn't have that constraint. Supported browsers & languages. Browsers: Chromium (covers Chrome + Edge, since both are Chromium-based), Firefox, WebKit (the engine behind Safari — meaning you can test Safari-like behavior on Linux/Windows CI machines without owning a Mac). Languages: JavaScript/TypeScript (the original, most complete), Python, Java, and .NET/C#. Python's API is a near-complete mirror of the JS one, which is why translating JS examples you find online is usually mechanical rather than conceptual — the method names and behavior are almost identical, just wrapped in Python syntax (snake_case instead of camelCase, for instance: get_by_role instead of getByRole).",
  customSummary: "## 9. Introduction to Playwright\n\n- Part 1 shifts from \"why Playwright\" (Part 0) to \"how to actually use it.\"\n- Playwright vs Selenium vs Cypress: Playwright uses direct CDP/WebSocket, auto-waits, native multi-tab/cross-origin support, and covers JS/TS, Python, Java, .NET.\n- Cypress runs inside the browser (fast, but weak on multi-tab/cross-origin); Selenium uses WebDriver HTTP calls (no auto-waiting, slower).\n- Browsers: Chromium (Chrome+Edge), Firefox, WebKit (Safari engine, testable without a Mac).\n- Python's API mirrors the JS API almost exactly (snake_case vs camelCase) — JS examples translate mechanically",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
