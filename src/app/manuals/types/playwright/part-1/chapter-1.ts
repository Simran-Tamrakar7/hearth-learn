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
  "contentMarkdown": "## 1. Introduction to Playwright\n\nPart 1 is where reading stops and doing starts. Part 0 explained *why* Playwright exists; from here forward, every chapter teaches *how* to use it with Python and pytest-playwright.\n\n### What is Playwright (hands-on framing)\n\nPlaywright is a browser automation library that controls Chromium, Firefox, and WebKit through one API. You write Python code that launches a browser, opens pages, finds elements, performs actions, and asserts outcomes. The same conceptual model applies whether you are writing a one-off script or a thousand-test CI suite.\n\nThe mental shift entering Part 1: stop evaluating tools, start touching the tool.\n\n### Playwright vs Selenium vs Cypress\n\nThis comparison is a near-guaranteed interview question. Internalize the architectural differences, not just the feature checklist.\n\n| Dimension | Selenium | Cypress | Playwright |\n|-----------|----------|---------|------------|\n| **Protocol** | WebDriver over HTTP | In-browser JS execution | CDP over WebSocket |\n| **Browsers** | Many via separate drivers | Chromium-family primary | Chromium, Firefox, WebKit native |\n| **Auto-waiting** | Manual (explicit waits) | Yes (assertion retry) | Yes (actions + expect) |\n| **Multi-tab** | Clunky window handles | Weak by architecture | Native Page objects |\n| **Languages** | Java, Python, C#, Ruby, JS… | JavaScript/TypeScript only | JS/TS, Python, Java, .NET |\n| **Speed** | Slower (HTTP round-trips) | Fast (shared event loop) | Fast (persistent WebSocket) |\n\n**Why Cypress struggles with multi-tab:** Cypress executes test code *inside* the browser, in the same JavaScript context as the page. That gives zero-latency DOM access and time-travel debugging — but binds tests to same-origin rules and makes true multi-tab workflows structurally awkward. Playwright runs *outside* the browser and drives it externally — holding references to multiple `Page` objects in one process is trivial.\n\n**Why Selenium flakes:** WebDriver requires the test author to manage timing. Miss a wait and you click before the SPA finishes rendering. Playwright auto-waits on every action and `expect()` assertion.\n\n### Supported browsers\n\n| Engine | Covers | Notes |\n|--------|--------|-------|\n| **Chromium** | Chrome, Edge, Opera | Default for most teams |\n| **Firefox** | Firefox | Patched build via `playwright install` |\n| **WebKit** | Safari's engine | Test Safari-like behavior on Linux/Windows CI |\n\nPlaywright ships its own browser binaries — version-matched to the library. You are not automating the user's installed Chrome; you are automating Playwright's pinned Chromium. That trades \"exact user browser\" for consistency across machines.\n\n### Supported languages\n\n- **JavaScript/TypeScript** — original binding, hosts `@playwright/test` runner\n- **Python** — this manual's language; near-complete API mirror of JS\n- **Java** and **.NET/C#** — enterprise adoption\n\nPython's API maps one-to-one to JavaScript with mechanical translation:\n\n```javascript\n// JavaScript\nawait page.getByRole('button', { name: 'Submit' }).click();\n```\n\n```python\n# Python (sync)\npage.get_by_role(\"button\", name=\"Submit\").click()\n```\n\nSnake_case instead of camelCase. No `await` in the sync API. The behavior is identical — which means the official Playwright docs (JS-first) are usable with minimal mental translation throughout this manual.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
