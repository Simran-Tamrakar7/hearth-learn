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
  "contentMarkdown": "One API for Chromium, Firefox, and WebKit; mobile web emulation; auto-waiting; network mocking; multi-context users; headed/headless; traces; parallel runs via pytest-xdist.\n\n## Multi-browser and mobile web emulation\n\nAutomate Chromium, Firefox, WebKit — one API, all browsers. You write your test logic once, and swap the browser_type (chromium, firefox, webkit) to run the exact same test against a different engine — no rewriting locators or logic per browser. This is a genuinely rare capability; most tools require separate driver setups per browser at minimum, and Selenium historically required different WebDriver binaries per browser with occasional locator inconsistencies between them.\n\nMobile web emulation (no real device needed): Playwright ships built-in device descriptors (e.g., “iPhone 13”, “Pixel 5”) that set the right viewport size, user-agent string, touch support, and device pixel ratio automatically. You get realistic mobile-web testing without owning a device lab.\n\n## Auto-waiting, network, multi-user, headed/headless\n\nAuto-waiting is the single most-cited reason teams switch to Playwright. Before every action (click, fill, etc.), Playwright automatically waits for the target element to be attached to the DOM, visible, stable (not mid-animation), enabled, and able to receive events. If any of those conditions isn’t met within the timeout, it fails with a clear error explaining which condition wasn’t met — dramatically easier to debug than a generic Selenium “element not interactable” error.\n\nNetwork interception & mocking: page.route() lets you intercept any request the page makes and respond however you want — fulfill it, modify it, abort it, or let it pass through unchanged. This unlocks testing scenarios that are otherwise very hard to trigger reliably: simulating a server error, a slow/timing-out API, or an empty-data state, all without needing the actual backend to cooperate. Deep dive in Chapter 17.\n\nMulti-tab, multi-context, multi-user simulation: because each BrowserContext is fully isolated (separate cookies, storage, cache), you can open two contexts in the same test to simulate two different logged-in users interacting with the same feature simultaneously. This would require running two completely separate browser sessions in older tools.\n\nHeadless & headed: headless means the browser runs without a visible UI window — faster, and required in most CI environments. Headed means you see the actual browser window — invaluable while writing and debugging. The same test code runs in either mode; you just flip a launch option.\n\n## Runner, traces, and parallel execution (Python)\n\nBuilt-in test runner (JS/TS) — Python uses pytest-playwright instead. Playwright’s official JS/TS package includes its own test runner (@playwright/test) with built-in parallelization, fixtures, and reporting. The Python version does not include an equivalent built-in runner — instead, the community-maintained pytest-playwright plugin fills that role, wiring Playwright into the pytest ecosystem you’ll cover starting in Part 3. This is why Part 3 leans so heavily on pytest concepts (fixtures, conftest.py) rather than a Playwright-native config system.\n\nTrace/video/screenshot capture out of the box: no third-party plugin needed — Playwright can record a full trace (DOM snapshots, network activity, console logs, screenshots at each step) of a test run, plus optionally save a video and screenshots on failure. Covered practically in Chapter 24 (Trace Viewer) and Chapter 28 (capture-on-failure).\n\nParallel test execution: tests can run across multiple worker processes simultaneously. In Python this is handled via pytest-xdist (Chapter 22) rather than anything Playwright-specific.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
