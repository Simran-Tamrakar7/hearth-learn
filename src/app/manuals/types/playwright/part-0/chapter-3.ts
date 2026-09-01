import type { ChapterRecord } from "../../../types";

/** 2. What Playwright Can Do */
export const chapter = {
  "id": "pw-0-cando",
  "title": "2. What Playwright Can Do",
  "minutes": 35,
  "level": "beginner",
  "phase": "Part 0 · Background",
  "partName": "Part 0 · Background",
  "overviewText": "Playwright can automate Chromium, Firefox, and WebKit from one API; emulate mobile viewports without real devices; auto-wait before every action; intercept and mock network traffic; simulate multiple isolated users via separate BrowserContexts; run headless in CI or headed while debugging; capture traces, videos, and screenshots; and execute tests in parallel via pytest-xdist. Python teams use pytest-playwright as the test runner (Playwright's built-in runner is JS/TS-only), but the browser capabilities are identical across languages.",
  "why": "A capabilities inventory prevents you from reinventing features Playwright already ships — and from proposing third-party plugins for trace capture or network mocking that are built in. It also clarifies the Python-specific split: pytest-playwright + pytest-xdist, not @playwright/test, which explains why Part 3 of this manual is pytest-heavy.",
  "when": "Skim this chapter when planning test infrastructure (parallel workers, trace-on-failure, mobile emulation) or when a colleague asks 'can Playwright do X?' before reaching for a separate tool. Revisit specific bullets as you hit the deep-dive chapters: network mocking (Chapter 17), traces (Chapter 24), parallel runs (Chapter 22), cross-browser (Chapter 23).",
  "practical": {
    "app": "SaaS admin panel — multi-user approval flow",
    "scenario": "A feature requires User A to submit a leave request and User B (manager) to approve it in a separate session. Using two BrowserContexts in one browser process, a single Playwright test opens both sessions simultaneously — no second browser launch, no cookie bleed between users. Network route mocking simulates a slow approval API so the test verifies the loading spinner without depending on backend latency.",
    "pass": "Both contexts authenticate independently; approval flow completes; trace file shows network mock and both user sessions.",
    "fail": "Test reuses one context for both users — User B sees User A's session and the approval step never triggers the real workflow."
  },
  "advantages": [
    "Swap browser_type between chromium, firefox, and webkit without rewriting test logic",
    "Built-in device descriptors set viewport, user-agent, touch, and DPR for realistic mobile-web tests",
    "page.route() intercepts any network request — simulate errors, delays, or empty payloads on demand",
    "BrowserContext isolation makes multi-user and multi-tab scenarios cheap and clean",
    "Trace, video, and screenshot capture need no third-party plugins — configured in pytest.ini or conftest.py",
    "pytest-xdist parallelizes across CPU cores — suite runtime drops linearly with worker count"
  ],
  "limitations": [
    "Python has no first-party @playwright/test runner — pytest-playwright adds a dependency and learning curve",
    "Mobile emulation tests mobile-web rendering, not native app behavior (that is Appium's domain)",
    "Network mocking tests your front-end's reaction to responses — not whether the real API contract is correct",
    "Parallel runs multiply browser memory usage — a 4-worker suite may need 4× RAM on CI agents",
    "Trace files grow large on long tests — storage and artifact retention policies matter in CI",
    "Headless and headed can behave differently for font rendering and GPU-accelerated animations — spot-check headed occasionally"
  ],
  "tools": [
    {
      "name": "pytest-xdist",
      "sub": "Parallel pytest execution",
      "url": "https://pypi.org/project/pytest-xdist/",
      "desc": "pytest-xdist distributes test collection across multiple worker processes, each running an independent Playwright browser session. Combined with pytest-playwright's scoped fixtures, it is the standard way Python teams parallelize Playwright suites in CI. Workers can be limited to the number of CPU cores (-n auto) or a fixed count (-n 4). Each worker gets its own browser instance — test isolation is preserved as long as tests don't share filesystem state.",
      "adv": [
        "Near-linear speedup for independent E2E tests on multi-core CI agents",
        "Integrates with pytest markers to shard by browser or test category",
        "Same -n flag locally and in CI — no separate parallel config system",
        "Works with pytest-playwright fixtures out of the box"
      ],
      "lim": [
        "Tests sharing global state (same DB row, same file) will race — requires test data isolation",
        "Each worker launches its own browser — memory usage scales with worker count",
        "Debugging parallel failures is harder than sequential — use --dist loadscope or run single-worker locally",
        "Not Playwright-specific — any pytest suite benefits, but browser tests feel the memory cost most"
      ]
    }
  ],
  "contentMarkdown": "## 2. What Playwright Can Do\n\nThis chapter catalogs capabilities at a high level. Parts 1–8 teach each one hands-on. Use it as a map — not a tutorial.\n\n### Multi-browser support\n\nLaunch and control **Chromium**, **Firefox**, and **WebKit** through one API. Switch engines with a single argument:\n\n```python\n# pytest-playwright CLI\npytest --browser firefox\n\n# Standalone script\nbrowser = p.chromium.launch()   # or p.firefox, p.webkit\n```\n\nPlaywright ships patched browser binaries matched to the library version — you test Playwright's browsers, not necessarily the user's exact Chrome build. That trade-off buys consistent behavior across CI agents.\n\n### Mobile emulation\n\nDevice descriptors emulate viewport size, user agent, touch events, and device scale factor — testing how a site renders on iPhone or Pixel without a physical device:\n\n```python\niphone = playwright.devices[\"iPhone 13\"]\ncontext = browser.new_context(**iphone)\npage = context.new_page()\n```\n\nThis is **mobile web** emulation (website in a mobile browser), not native app testing. Native iOS/Android apps require Appium — covered in Part 0, Chapter 4 (scope boundaries).\n\n### Auto-waiting\n\nEvery action (`click`, `fill`, `check`) and every `expect()` assertion automatically retries until the element is actionable or a timeout expires. Playwright checks visibility, stability, enabled state, and unobstructed hit-target before acting. You should rarely write `time.sleep()` — and when you do, it is a smell worth investigating.\n\n### Network interception\n\nMock, block, or modify HTTP requests and responses in real time:\n\n```python\npage.route(\"**/api/users\", lambda route: route.fulfill(\n    status=200,\n    body='[{\"id\": 1, \"name\": \"Test User\"}]'\n))\npage.goto(\"https://app.example.com/users\")\n```\n\nThis enables testing edge cases (empty lists, 500 errors, slow responses) without backend changes — impossible over Selenium's HTTP WebDriver layer.\n\n### Multi-tab and multi-context\n\nA `BrowserContext` can hold multiple `Page` objects (tabs). Playwright's external-driver architecture makes multi-tab flows native — open a link in a new tab, switch pages, return to the original. Multiple contexts in one browser simulate independent users (separate cookies, storage) without launching separate browser processes.\n\n### Headless and headed modes\n\n```python\nbrowser = p.chromium.launch(headless=True)   # CI, no display\nbrowser = p.chromium.launch(headless=False)  # watch while learning/debugging\n```\n\nHeadless is the default and runs on typical Linux CI agents. Headed mode (`headless=False`) is invaluable while learning — you see exactly what Playwright targets.\n\n### Test runner note (Python vs JS)\n\nThe official **@playwright/test** runner (JavaScript/TypeScript) ships parallel execution, HTML reporting, and trace viewer integration out of the box. **Python** uses **pytest-playwright** — same browser capabilities, different test harness. This manual teaches pytest throughout; translate JS docs mechanically (snake_case, sync API).\n\n### Trace and video\n\nRecord a full execution trace (DOM snapshots, network log, screenshots per step) for post-mortem debugging:\n\n```bash\npytest --tracing on\n```\n\nVideo capture is opt-in (`--video=on`) — unlike some tools that record everything by default and bloat CI artifacts.\n\n### Parallel execution\n\nRun tests across workers with pytest-xdist:\n\n```bash\npip install pytest-xdist\npytest -n auto\n```\n\nEach worker gets isolated browser contexts. Parallelism is a pytest concern, not a Playwright limitation — the library itself supports concurrent contexts within one process.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
