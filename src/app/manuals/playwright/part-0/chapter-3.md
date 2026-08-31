---
id: "pw-0-cando"
title: "2. What Playwright Can Do"
minutes: 35
partName: "Part 0 · Background"
level: "beginner"
---

One API for Chromium, Firefox, and WebKit; mobile web emulation; auto-waiting; network mocking; multi-context users; headed/headless; traces; parallel runs via pytest-xdist.

## Multi-browser and mobile web emulation

Automate Chromium, Firefox, WebKit — one API, all browsers. You write your test logic once, and swap the browser_type (chromium, firefox, webkit) to run the exact same test against a different engine — no rewriting locators or logic per browser. This is a genuinely rare capability; most tools require separate driver setups per browser at minimum, and Selenium historically required different WebDriver binaries per browser with occasional locator inconsistencies between them.

Mobile web emulation (no real device needed): Playwright ships built-in device descriptors (e.g., “iPhone 13”, “Pixel 5”) that set the right viewport size, user-agent string, touch support, and device pixel ratio automatically. You get realistic mobile-web testing without owning a device lab.

## Auto-waiting, network, multi-user, headed/headless

Auto-waiting is the single most-cited reason teams switch to Playwright. Before every action (click, fill, etc.), Playwright automatically waits for the target element to be attached to the DOM, visible, stable (not mid-animation), enabled, and able to receive events. If any of those conditions isn’t met within the timeout, it fails with a clear error explaining which condition wasn’t met — dramatically easier to debug than a generic Selenium “element not interactable” error.

Network interception & mocking: page.route() lets you intercept any request the page makes and respond however you want — fulfill it, modify it, abort it, or let it pass through unchanged. This unlocks testing scenarios that are otherwise very hard to trigger reliably: simulating a server error, a slow/timing-out API, or an empty-data state, all without needing the actual backend to cooperate. Deep dive in Chapter 17.

Multi-tab, multi-context, multi-user simulation: because each BrowserContext is fully isolated (separate cookies, storage, cache), you can open two contexts in the same test to simulate two different logged-in users interacting with the same feature simultaneously. This would require running two completely separate browser sessions in older tools.

Headless & headed: headless means the browser runs without a visible UI window — faster, and required in most CI environments. Headed means you see the actual browser window — invaluable while writing and debugging. The same test code runs in either mode; you just flip a launch option.

## Runner, traces, and parallel execution (Python)

Built-in test runner (JS/TS) — Python uses pytest-playwright instead. Playwright’s official JS/TS package includes its own test runner (@playwright/test) with built-in parallelization, fixtures, and reporting. The Python version does not include an equivalent built-in runner — instead, the community-maintained pytest-playwright plugin fills that role, wiring Playwright into the pytest ecosystem you’ll cover starting in Part 3. This is why Part 3 leans so heavily on pytest concepts (fixtures, conftest.py) rather than a Playwright-native config system.

Trace/video/screenshot capture out of the box: no third-party plugin needed — Playwright can record a full trace (DOM snapshots, network activity, console logs, screenshots at each step) of a test run, plus optionally save a video and screenshots on failure. Covered practically in Chapter 24 (Trace Viewer) and Chapter 28 (capture-on-failure).

Parallel test execution: tests can run across multiple worker processes simultaneously. In Python this is handled via pytest-xdist (Chapter 22) rather than anything Playwright-specific.