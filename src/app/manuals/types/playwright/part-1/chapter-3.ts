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
  "contentMarkdown": "## 3. Playwright Architecture\n\nBrowser → BrowserContext → Page is the conceptual backbone of the entire tool. Misunderstanding this hierarchy causes the two most common beginner bugs: launching a new browser per test (slow, memory-heavy) and sharing cookies between tests (state leakage).\n\n### The three-level hierarchy\n\n```text\nBrowser                    # One browser process (expensive to launch)\n └── BrowserContext        # Isolated session (cheap — like incognito)\n      └── Page             # One tab within a context\n```\n\n**Browser** — one actual browser process (e.g., one Chromium instance). Launching is relatively expensive (2–5 seconds, hundreds of MB). Launch **one per test session**, not one per test.\n\n**BrowserContext** — an isolated session within that browser. Each context has its own cookies, local storage, cache, and permissions — completely separate from other contexts in the same browser. Creating a context is fast. The recommended pattern: **one browser per session, one fresh context per test** for isolation.\n\n**Page** — one tab within a context. A context can hold multiple pages simultaneously — this is how multi-tab testing works (Part 2, Chapter 9).\n\n### Why the hierarchy matters\n\nPlaywright can simulate multiple independent users without launching multiple browser processes — open multiple contexts in one browser. Test isolation is easy by default: if every test gets a fresh context, login state from one test cannot leak into another.\n\n```python\nfrom playwright.sync_api import sync_playwright\n\nwith sync_playwright() as p:\n    browser = p.chromium.launch()\n\n    # Two isolated users in one browser\n    admin_context = browser.new_context()\n    employee_context = browser.new_context()\n\n    admin_page = admin_context.new_page()\n    employee_page = employee_context.new_page()\n\n    admin_page.goto(\"https://app.example.com/admin\")\n    employee_page.goto(\"https://app.example.com/dashboard\")\n\n    browser.close()\n```\n\n### Sync API vs Async API\n\nPython Playwright offers two flavors:\n\n**Sync API** — code reads top-to-bottom, no `await`. This is what pytest-playwright uses by default and what this manual uses throughout. Ideal for test automation.\n\n```python\nfrom playwright.sync_api import sync_playwright\n\nwith sync_playwright() as p:\n    browser = p.chromium.launch()\n    page = browser.new_page()\n    page.goto(\"https://example.com\")\n    browser.close()\n```\n\n**Async API** — uses `async def` and `await`. Required for integration into existing asyncio applications (scrapers, FastAPI services). For pure test work, you rarely need it — but recognize it when reading online examples.\n\n```python\nfrom playwright.async_api import async_playwright\nimport asyncio\n\nasync def main():\n    async with async_playwright() as p:\n        browser = await p.chromium.launch()\n        page = await browser.new_page()\n        await page.goto(\"https://example.com\")\n        await browser.close()\n\nasyncio.run(main())\n```\n\n### How Playwright talks to browsers (CDP, WebSocket)\n\nPlaywright launches a browser process and connects via the **Chrome DevTools Protocol (CDP)** over a persistent **WebSocket** connection. CDP is the same protocol Chrome DevTools uses internally — Playwright has access to deep browser internals: network events, DOM mutations, console messages, performance data.\n\nThis is structurally different from Selenium's HTTP request/response to a WebDriver server. The persistent WebSocket is why Playwright is faster and capable of real-time network interception that Selenium cannot match.\n\nFor **Firefox** and **WebKit**, Playwright uses patched browser builds with equivalent protocol support — neither natively speaks CDP. That is why `playwright install` downloads its own binaries rather than using system browsers.\n\n### pytest-playwright defaults\n\nThe pytest-playwright plugin handles hierarchy for you:\n\n| Fixture | Scope | What you get |\n|---------|-------|--------------|\n| `browser` | session | One launched browser |\n| `context` | function | Fresh context per test |\n| `page` | function | One page in that context |\n\nYou write `def test_login(page):` — the plugin launches, isolates, and tears down. Understanding the hierarchy underneath helps when customizing `conftest.py` in Part 3.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
