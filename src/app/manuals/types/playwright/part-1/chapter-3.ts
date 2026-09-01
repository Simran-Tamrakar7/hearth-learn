import type { ChapterRecord } from "../../../types";

/** 3. Playwright Architecture */
export const chapter = {
  "id": "pw-1-arch",
  "title": "3. Playwright Architecture",
  "minutes": 40,
  "level": "beginner",
  "phase": "Part 1 · Foundations",
  "partName": "Part 1 · Foundations",
  "overviewText": "Playwright's architecture rests on a three-level hierarchy: Browser (one expensive browser process per session), BrowserContext (cheap isolated session — own cookies, storage, cache — like an incognito window), and Page (one tab within a context). The recommended pattern is one browser launch per test session, one fresh context per test for isolation, and one or more pages per context for multi-tab scenarios. Python offers sync (default for pytest-playwright) and async APIs; Playwright connects to browsers over CDP via WebSocket, giving it deep access to network events, DOM state, and console logs that Selenium's HTTP WebDriver layer cannot match.",
  "why": "Misunderstanding Browser vs Context vs Page causes the two most common beginner bugs: launching a new browser per test (slow, memory-heavy) and sharing cookies between tests (state leakage). Knowing CDP/WebSocket explains both Playwright's speed and its superpowers (network interception, traces) — answers that go beyond 'it's newer than Selenium.'",
  "when": "Internalize this before writing multi-tab tests (Part 2, Chapter 9), multi-user scenarios (Part 0, Chapter 3), or customizing conftest.py fixtures (Part 3). Revisit when debugging cookie bleed between tests or when deciding sync vs async for a non-test automation script.",
  "practical": {
    "app": "HRMS leave portal — test isolation bug",
    "scenario": "Two tests run sequentially: test_login_as_admin sets cookies; test_employee_cannot_approve_leave reuses the same BrowserContext without cleanup. The second test passes incorrectly because the admin session leaked — the employee 'cannot approve' assertion never runs against an unauthenticated user.",
    "pass": "Each test gets a fresh context via pytest-playwright's default function-scoped context fixture — employee test genuinely lacks admin cookies.",
    "fail": "Shared context across tests — CI shows intermittent passes depending on execution order, classic test pollution."
  },
  "advantages": [
    "BrowserContext isolation is cheap — fresh session per test without launching a new browser process",
    "Multi-tab testing uses multiple Pages in one Context — no Selenium-style window handle switching",
    "Sync API (no await) keeps test code readable for Python developers new to async",
    "CDP/WebSocket connection enables real-time network interception impossible over HTTP WebDriver",
    "Playwright ships patched Firefox/WebKit with equivalent protocol support — not dependent on system browsers",
    "One browser, many contexts pattern simulates multiple users efficiently in a single test"
  ],
  "limitations": [
    "Launching one Browser per test instead of per session wastes 2–5 seconds and hundreds of MB per test",
    "Async API required for integration into existing asyncio apps — sync tests can't mix freely inside async loops",
    "CDP is Chromium-native — Firefox/WebKit use Playwright's patched builds, not stock system installs",
    "Deep hierarchy concepts don't help until you hit multi-tab or multi-user scenarios — abstract until then",
    "Context-per-test increases total session count on parallel CI — still cheaper than browser-per-test",
    "Understanding CDP internals is optional for writing tests — necessary for advanced debugging only"
  ],
  "tools": [
    {
      "name": "Playwright Sync API",
      "sub": "Python synchronous binding",
      "url": "https://playwright.dev/python/docs/library",
      "desc": "The sync_api module wraps Playwright's async core in a synchronous interface using greenlets. Code reads top-to-bottom: with sync_playwright() as p: browser = p.chromium.launch(). pytest-playwright uses this by default. Every sync method blocks until the browser responds — no async/await keywords. For pure test automation, this is the recommended path; the async API exists for scrapers and services already running on asyncio.",
      "adv": [
        "Reads like normal Python — no async learning curve for test authors",
        "Identical capabilities to async API — same locators, actions, and assertions",
        "Works seamlessly with synchronous pytest test functions",
        "sync_playwright() context manager guarantees clean browser shutdown"
      ],
      "lim": [
        "Cannot be called from inside an running asyncio event loop without conflicts",
        "Blocking calls in async services will freeze the event loop — use async API there",
        "Slightly higher overhead than native async due to greenlet bridging",
        "Some online examples use async def — must translate, not copy-paste"
      ]
    }
  ],
  "contentMarkdown": "Browser → BrowserContext → Page is the backbone. Sync vs async APIs, and how CDP/WebSocket gives Playwright its depth.\n\n## Browser, BrowserContext, Page hierarchy\n\nThis is the conceptual backbone of the entire tool — internalize it precisely.\n\nBrowser — one actual browser process (e.g., one Chromium instance). Launching a browser is relatively expensive (time and memory), so you typically launch one per test session, not one per test.\n\nBrowserContext — an isolated session within that browser, roughly equivalent to an incognito window. Each context has its own cookies, local storage, cache, and permissions — completely separate from other contexts in the same browser. Creating a new context is cheap and fast, which is why the recommended pattern is: one browser launch per session, one new context per test (for isolation), and reuse the browser itself.\n\nPage — one tab within a context. A context can have multiple pages open simultaneously (this is how multi-tab testing in Chapter 9 works).\n\nWhy this hierarchy matters: Playwright can cheaply simulate multiple independent users without launching multiple full browser processes — you open multiple contexts within one browser. It’s also why test isolation is easy by default: if every test gets a fresh context, cookies/login state from one test can’t leak into another.\n\n## Sync API vs Async API\n\nPython Playwright offers two flavors.\n\nSync API — code reads top-to-bottom, no await keywords. This is what pytest-playwright uses by default and what most tutorials (including this one) use, since it’s simpler to read and write, especially if you’re newer to Python.\n\nAsync API — uses async/await, needed if you’re integrating Playwright into an existing asyncio-based application (e.g., an async web scraper or an async FastAPI service). For pure test-automation work, you’ll rarely need this — but it’s worth knowing it exists so you’re not confused when you see async def in some code examples online.\n\n## How Playwright talks to browsers (CDP, WebSocket)\n\nPlaywright launches a browser process and connects to it over the Chrome DevTools Protocol (CDP) via a WebSocket connection. CDP is the same protocol Chrome’s own DevTools panel uses internally — meaning Playwright has access to genuinely deep browser internals (network events, DOM state, console messages, performance data), not just “click here, type there” surface-level commands. This direct, persistent WebSocket connection (versus Selenium’s request-response HTTP calls to a separate WebDriver server) is the concrete technical reason Playwright is both faster and capable of things Selenium structurally can’t do, like real-time network interception.\n\nFor Firefox and WebKit, Playwright uses patched versions of those browsers with equivalent protocol support built in, since neither natively speaks CDP — another reason Playwright ships its own browser binaries rather than using your system browsers.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
