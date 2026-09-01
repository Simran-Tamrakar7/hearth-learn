import type { ChapterRecord } from "../../../types";

/** 0. What is Playwright, Really */
export const chapter = {
  "id": "pw-0-what",
  "title": "0. What is Playwright, Really",
  "minutes": 35,
  "level": "beginner",
  "phase": "Part 0 · Background",
  "partName": "Part 0 · Background",
  "overviewText": "Playwright is a modern browser automation library built by the same engineers who created Puppeteer at Google, then rebuilt the idea from scratch at Microsoft after learning where Puppeteer and Selenium broke down. Released in January 2020, it was designed from day one for multi-browser control — Chromium, Firefox, and WebKit through one API — with auto-waiting, shadow DOM support, and deep hooks into browser internals via the Chrome DevTools Protocol. Understanding this origin is not trivia: it explains why Playwright feels deliberately engineered rather than patched together, why it ships its own browser binaries, and why teams migrating from Selenium often report fewer flaky tests without changing their application code.",
  "why": "Interviewers and hiring managers expect you to explain why Playwright exists, not just that it exists. The Puppeteer-team lineage shows you understand the tool's design philosophy — a second attempt by people who already lived through WebDriver's limitations. Knowing the three concrete gaps (Selenium flakiness, Puppeteer's Chrome-only scope, poor SPA/shadow DOM support) gives you credible answers when asked 'why not Selenium?' and helps you evaluate whether Playwright is the right fit for a project.",
  "when": "Read this chapter before writing your first line of automation code — it sets the mental model for everything in Parts 1–8. Revisit it when comparing tools in an interview, when a stakeholder asks why the team chose Playwright over Selenium or Cypress, or when debugging whether a limitation is Playwright-specific or inherited from older automation paradigms.",
  "practical": {
    "app": "SaaS dashboard — tool selection review",
    "scenario": "Your team is evaluating Playwright versus an existing Selenium suite that flakes on every React deploy. During the architecture review, a senior engineer asks why Playwright auto-waits while Selenium requires explicit waits — you explain that Playwright's core engineers built Puppeteer first, saw where manual wait management failed at scale, and designed auto-waiting into the engine rather than leaving it to each test author.",
    "pass": "You articulate the Puppeteer origin, the three gaps (flakiness, Chrome-only, modern web patterns), and how auto-waiting plus multi-browser support address them — the team green-lights a Playwright pilot.",
    "fail": "You answer 'it's faster and Microsoft backs it' without naming the WebDriver wait problem or shadow DOM support — the review stalls because nobody can explain why migration would reduce flakiness."
  },
  "advantages": [
    "Built by engineers who already solved browser automation once — design reflects known failure modes, not guesses",
    "Single API surface for Chromium, Firefox, and WebKit from day one — no separate driver toolchain per browser",
    "Auto-waiting built into the core engine eliminates the biggest source of Selenium flakiness",
    "Native shadow DOM and iframe locators designed for modern SPAs, React/Vue component libraries, and embedded widgets",
    "MIT-licensed with an actively funded Microsoft engineering team and ~2–4 week release cadence",
    "Youth (2020) means no legacy WebDriver assumptions — designed for async SPAs, not 2004-era page loads"
  ],
  "limitations": [
    "Comparatively young versus Selenium (2004) — fewer Stack Overflow answers and enterprise war stories",
    "Most official docs and community examples are JS/TS-first; Python users translate syntax mentally",
    "Ships patched browser binaries — you test Playwright's browsers, not necessarily the user's exact Chrome/Safari build",
    "Not a load-testing or native mobile tool — scope is browser automation, not thousands of concurrent users or Appium-style apps",
    "Teams deeply invested in Selenium Grid infrastructure face migration cost even when Playwright is technically superior",
    "Auto-waiting can mask slow UI — tests pass while users wait seconds for elements that should render faster"
  ],
  "tools": [
    {
      "name": "Playwright",
      "sub": "Multi-language browser automation",
      "url": "https://playwright.dev",
      "desc": "Playwright is Microsoft's open-source browser automation library, created by engineers who previously built Puppeteer at Google. It controls Chromium, Firefox, and WebKit through a unified API with auto-waiting, network interception, trace recording, and locators designed for accessibility-first element discovery. Available in Python, JavaScript/TypeScript, Java, and .NET, it communicates with browsers over the Chrome DevTools Protocol (CDP) via WebSocket — a lower-overhead, higher-capability path than Selenium's HTTP WebDriver layer. This manual uses the Python binding with pytest-playwright, but the conceptual architecture (Browser → BrowserContext → Page) is identical across languages.",
      "adv": [
        "One API for all three major browser engines — genuine cross-browser coverage without separate toolchains",
        "Auto-waiting on every action and expect() assertion — dramatically fewer timing-based flakes",
        "Deep CDP access enables network mocking, trace capture, and console log inspection Selenium cannot match",
        "Active Microsoft-backed development with frequent releases adding real capabilities",
        "Python API mirrors JS almost one-to-one — translating online examples is mechanical"
      ],
      "lim": [
        "Browser automation only — not built for load testing, API-only suites, or native mobile apps",
        "Requires downloading Playwright-managed browser binaries (~300MB per engine)",
        "JS/TS ecosystem gets the first-party test runner; Python relies on pytest-playwright plugin",
        "Patience required when reading community content written for @playwright/test syntax"
      ]
    }
  ],
  "contentMarkdown": "Playwright’s origin story matters more than it seems. The engineers who built it came from Puppeteer — and designed a second attempt for modern multi-browser web apps.\n\n## History — built by Microsoft, evolved from the Puppeteer team\n\nPlaywright’s origin story matters more than it seems on the surface. The core engineers who built Playwright — most notably Andrey Lushnikov, Pavel Feldman, and Boris Yankov — were previously on the team at Google that built and maintained Puppeteer, the Node.js library for controlling headless Chrome. When they moved to Microsoft, they took everything they’d learned from Puppeteer’s limitations and built something new instead of iterating on the old codebase.\n\nThis “second attempt by the same people” origin is why Playwright feels less like a patched-together tool and more like a deliberately designed one. Puppeteer was built specifically for Chrome/Chromium via the Chrome DevTools Protocol (CDP). Its creators knew intimately where that architecture broke down — mainly, it couldn’t reliably control Firefox or Safari/WebKit. Playwright was designed from day one to solve that: a single API surface that talks to all three major browser engines.\n\nFirst released publicly in January 2020, Playwright is comparatively young next to Selenium (which dates back to 2004). That youth is actually a selling point in interviews — it means the tool was designed with full knowledge of modern web apps (SPAs, shadow DOM, complex async behavior) rather than retrofitted onto assumptions from the mid-2000s web.\n\n## Open-source, actively maintained, backed by Microsoft\n\nPlaywright is MIT-licensed and fully open-source on GitHub. “Backed by Microsoft” isn’t just marketing — it means a dedicated, funded engineering team (not a side project maintained by volunteers in their spare time); a fast release cadence — new minor versions ship roughly every 2–4 weeks, each typically adding real capabilities (not just bug fixes); and integration hooks with the broader Microsoft dev ecosystem (VS Code extension, Azure DevOps pipeline support).\n\nThis matters practically: when you hit a rough edge with Playwright, the chance it gets fixed or has a workaround shipped soon is much higher than with a stagnant tool. It’s also a plus for job security in your skillset — companies are less nervous adopting a tool with strong backing versus something that might get abandoned.\n\n## Why it was created (gaps in Selenium / Puppeteer)\n\nThree concrete gaps drove Playwright’s creation.\n\nSelenium’s flakiness problem: Selenium’s WebDriver protocol requires you to manually manage waits — time.sleep(), explicit waits for specific conditions, etc. Miss a wait condition and your test either fails randomly or clicks the wrong thing because the page hadn’t finished rendering. This was (and still is) the single biggest source of pain in Selenium-based suites.\n\nPuppeteer’s Chrome-only limitation: Puppeteer only ever fully supported Chromium. Cross-browser testing meant maintaining an entirely separate toolchain for Firefox/Safari, which most teams simply didn’t do — meaning bugs specific to non-Chrome browsers shipped to production undetected.\n\nPoor support for modern web patterns: Both older tools struggled with things that are now completely normal on the web: single-page apps with heavy client-side routing, shadow DOM (used by design systems and web components), iframes nested multiple levels deep, and apps that make dozens of async network calls before finishing rendering.\n\nPlaywright’s answer to all three: auto-waiting built into the core engine (not bolted on by the test author), native multi-browser support from the start, and locators/APIs specifically designed to pierce shadow DOM and handle iframes without special ceremony.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
