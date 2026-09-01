import type { ChapterRecord } from "../../../types";

/** 1. Introduction to Playwright */
export const chapter = {
  "id": "pw-1-intro",
  "title": "1. Introduction to Playwright",
  "minutes": 40,
  "level": "beginner",
  "phase": "Part 1 · Foundations",
  "partName": "Part 1 · Foundations",
  "overviewText": "Part 1 is where reading stops and doing starts. This chapter reframes Playwright's origin story for hands-on learners, then lays out the definitive comparison table against Selenium and Cypress — protocol, browsers, auto-waiting, multi-tab support, languages, and speed. It also catalogs supported browsers (Chromium, Firefox, WebKit) and languages, emphasizing that Python's API is a near-complete mirror of JavaScript's: snake_case method names, same behavior, mechanical translation when reading online JS examples.",
  "why": "The Selenium-vs-Cypress-vs-Playwright table is a near-guaranteed interview question. Understanding why Cypress runs inside the browser (fast but multi-tab weak) versus Playwright driving externally (multi-tab native) shows architectural literacy, not memorization. Knowing Python mirrors JS means you can leverage the entire Playwright doc site instead of waiting for Python-specific tutorials.",
  "when": "Study this chapter at the start of Part 1, immediately before environment setup. Return to the comparison table when interviewing, when choosing a tool for a greenfield project, or when a teammate asks why this manual uses Python instead of the JS test runner.",
  "practical": {
    "app": "Job interview — QA automation role",
    "scenario": "The interviewer asks: 'We use Cypress today. Why would we switch to Playwright?' You explain Cypress executes test code inside the browser's run loop — fast for single-tab Chromium flows but historically weak on multi-tab and cross-origin. Playwright drives the browser externally via CDP, supports Firefox and WebKit natively, and offers Python bindings that mirror the JS API — relevant because their backend team already writes Python.",
    "pass": "Interviewer nods at the architectural distinction and asks about your Python pytest experience — conversation moves to practical setup.",
    "fail": "You say 'Playwright is just newer and better' without naming the in-browser vs external-driver difference — follow-up questions expose a gap."
  },
  "advantages": [
    "Clear mental model shift from Part 0 ('why care') to Part 1 ('how to use')",
    "Comparison table covers protocol, browsers, waits, multi-tab, languages, and speed in one place",
    "Cypress in-browser architecture explanation goes beyond buzzwords — explains the tradeoff",
    "WebKit support enables Safari-like testing on Linux/Windows CI without Mac hardware",
    "Python API parity with JS means official docs are usable with minimal translation",
    "Sets expectations for snake_case (get_by_role) versus camelCase (getByRole) before first script"
  ],
  "limitations": [
    "Comparison snapshots age — Cypress Firefox/WebKit support has improved since early versions",
    "Table simplifies speed claims — real suite performance depends on locator quality and test design",
    "Python binding occasionally lags JS for brand-new Playwright features by one release cycle",
    "Doesn't replace hands-on setup — knowing browsers exist doesn't install them",
    "Multi-language support doesn't mean identical plugin ecosystems — pytest-playwright ≠ @playwright/test plugins",
    "Interview answers need tailoring — a Chromium-only startup may not care about WebKit"
  ],
  "tools": [
    {
      "name": "Playwright Python",
      "sub": "Python bindings",
      "url": "https://playwright.dev/python",
      "desc": "The official Python package (playwright on PyPI) exposes sync and async APIs for browser automation. Method names use snake_case (page.get_by_role, page.wait_for_load_state) but map one-to-one to the JavaScript API. pytest-playwright wraps these into pytest fixtures (page, browser, context) so tests receive ready-made browser objects. This is the language binding used throughout this manual — not the Node.js @playwright/test package.",
      "adv": [
        "Near-complete API mirror of JavaScript — translate docs mechanically",
        "Sync API reads top-to-bottom without async/await — ideal for test beginners",
        "Same browser binaries and capabilities as JS — no second-class features",
        "Integrates with existing Python QA stacks (pytest, allure, pytest-xdist)"
      ],
      "lim": [
        "No built-in test runner — requires pytest-playwright plugin",
        "Community examples skew JS/TS — Python-specific tutorials are scarcer",
        "Async API needed only for asyncio-integrated apps — adds complexity most test suites don't need"
      ]
    }
  ],
  "contentMarkdown": "Hands-on entry point: Playwright vs Selenium vs Cypress, then supported browsers and languages — with Python as a near-complete API mirror of JS.\n\n## What is Playwright, why it exists (hands-on framing)\n\nThis chapter restates the origin story from Part 0 but frames it as the entry point to hands-on learning — the point where you stop reading about the tool and start touching it. The key mental shift: everything in Part 0 was “why should I care,” Part 1 onward is “how do I actually use this.”\n\n## Playwright vs Selenium vs Cypress\n\nWorth having a clear mental table for this — it’s a near-guaranteed interview question.\n\nProtocol: Selenium uses WebDriver over HTTP; Cypress runs inside the browser; Playwright talks CDP/WebSocket directly.\n\nBrowsers: Selenium supports many via separate drivers; Cypress is Chromium-family (with experimental Firefox/WebKit historically weak); Playwright supports Chromium, Firefox, and WebKit natively.\n\nAuto-waiting: Selenium no (manual waits); Cypress yes; Playwright yes.\n\nMulti-tab / multi-origin: Selenium clunky; Cypress weak by architecture; Playwright native support.\n\nLanguages: Selenium many; Cypress JS/TS only; Playwright JS/TS, Python, Java, .NET.\n\nSpeed: Selenium slower; Cypress fast; Playwright fast.\n\nThe Cypress limitation is worth understanding, not just memorizing: Cypress executes its test code inside the browser itself, in the same run loop as the page. That’s why it’s fast, but it also historically struggled with multiple tabs or cross-origin navigation. Playwright runs outside the browser and drives it externally, which is why it doesn’t have that constraint.\n\n## Supported browsers & languages\n\nBrowsers: Chromium (covers Chrome + Edge), Firefox, WebKit (the engine behind Safari — meaning you can test Safari-like behavior on Linux/Windows CI machines without owning a Mac).\n\nLanguages: JavaScript/TypeScript (the original, most complete), Python, Java, and .NET/C#. Python’s API is a near-complete mirror of the JS one, which is why translating JS examples you find online is usually mechanical rather than conceptual — the method names and behavior are almost identical, just wrapped in Python syntax (snake_case instead of camelCase, for instance: get_by_role instead of getByRole).",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
