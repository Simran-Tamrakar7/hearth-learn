import type { ChapterRecord } from "../../types";

/** 1. Introduction to Playwright */
export const chapter = {
  "id": "pw-1-intro",
  "title": "1. Introduction to Playwright",
  "minutes": 40,
  "level": "beginner",
  "phase": "Part 1 · Foundations",
  "partName": "Part 1 · Foundations",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "Hands-on entry point: Playwright vs Selenium vs Cypress, then supported browsers and languages — with Python as a near-complete API mirror of JS.\n\n## What is Playwright, why it exists (hands-on framing)\n\nThis chapter restates the origin story from Part 0 but frames it as the entry point to hands-on learning — the point where you stop reading about the tool and start touching it. The key mental shift: everything in Part 0 was “why should I care,” Part 1 onward is “how do I actually use this.”\n\n## Playwright vs Selenium vs Cypress\n\nWorth having a clear mental table for this — it’s a near-guaranteed interview question.\n\nProtocol: Selenium uses WebDriver over HTTP; Cypress runs inside the browser; Playwright talks CDP/WebSocket directly.\n\nBrowsers: Selenium supports many via separate drivers; Cypress is Chromium-family (with experimental Firefox/WebKit historically weak); Playwright supports Chromium, Firefox, and WebKit natively.\n\nAuto-waiting: Selenium no (manual waits); Cypress yes; Playwright yes.\n\nMulti-tab / multi-origin: Selenium clunky; Cypress weak by architecture; Playwright native support.\n\nLanguages: Selenium many; Cypress JS/TS only; Playwright JS/TS, Python, Java, .NET.\n\nSpeed: Selenium slower; Cypress fast; Playwright fast.\n\nThe Cypress limitation is worth understanding, not just memorizing: Cypress executes its test code inside the browser itself, in the same run loop as the page. That’s why it’s fast, but it also historically struggled with multiple tabs or cross-origin navigation. Playwright runs outside the browser and drives it externally, which is why it doesn’t have that constraint.\n\n## Supported browsers & languages\n\nBrowsers: Chromium (covers Chrome + Edge), Firefox, WebKit (the engine behind Safari — meaning you can test Safari-like behavior on Linux/Windows CI machines without owning a Mac).\n\nLanguages: JavaScript/TypeScript (the original, most complete), Python, Java, and .NET/C#. Python’s API is a near-complete mirror of the JS one, which is why translating JS examples you find online is usually mechanical rather than conceptual — the method names and behavior are almost identical, just wrapped in Python syntax (snake_case instead of camelCase, for instance: get_by_role instead of getByRole).",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
