---
id: "pw-1-arch"
title: "3. Playwright Architecture"
minutes: 40
partName: "Part 1 · Foundations"
level: "beginner"
---

Browser → BrowserContext → Page is the backbone. Sync vs async APIs, and how CDP/WebSocket gives Playwright its depth.

## Browser, BrowserContext, Page hierarchy

This is the conceptual backbone of the entire tool — internalize it precisely.

Browser — one actual browser process (e.g., one Chromium instance). Launching a browser is relatively expensive (time and memory), so you typically launch one per test session, not one per test.

BrowserContext — an isolated session within that browser, roughly equivalent to an incognito window. Each context has its own cookies, local storage, cache, and permissions — completely separate from other contexts in the same browser. Creating a new context is cheap and fast, which is why the recommended pattern is: one browser launch per session, one new context per test (for isolation), and reuse the browser itself.

Page — one tab within a context. A context can have multiple pages open simultaneously (this is how multi-tab testing in Chapter 9 works).

Why this hierarchy matters: Playwright can cheaply simulate multiple independent users without launching multiple full browser processes — you open multiple contexts within one browser. It’s also why test isolation is easy by default: if every test gets a fresh context, cookies/login state from one test can’t leak into another.

## Sync API vs Async API

Python Playwright offers two flavors.

Sync API — code reads top-to-bottom, no await keywords. This is what pytest-playwright uses by default and what most tutorials (including this one) use, since it’s simpler to read and write, especially if you’re newer to Python.

Async API — uses async/await, needed if you’re integrating Playwright into an existing asyncio-based application (e.g., an async web scraper or an async FastAPI service). For pure test-automation work, you’ll rarely need this — but it’s worth knowing it exists so you’re not confused when you see async def in some code examples online.

## How Playwright talks to browsers (CDP, WebSocket)

Playwright launches a browser process and connects to it over the Chrome DevTools Protocol (CDP) via a WebSocket connection. CDP is the same protocol Chrome’s own DevTools panel uses internally — meaning Playwright has access to genuinely deep browser internals (network events, DOM state, console messages, performance data), not just “click here, type there” surface-level commands. This direct, persistent WebSocket connection (versus Selenium’s request-response HTTP calls to a separate WebDriver server) is the concrete technical reason Playwright is both faster and capable of things Selenium structurally can’t do, like real-time network interception.

For Firefox and WebKit, Playwright uses patched versions of those browsers with equivalent protocol support built in, since neither natively speaks CDP — another reason Playwright ships its own browser binaries rather than using your system browsers.