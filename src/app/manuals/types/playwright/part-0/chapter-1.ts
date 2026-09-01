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
  "contentMarkdown": "## 0. What is Playwright, Really\n\nPlaywright's origin story matters more than trivia. The engineers who built it came from Puppeteer — and designed a second attempt for modern multi-browser web apps.\n\n### History — Puppeteer team, Microsoft, January 2020\n\nThe core engineers behind Playwright — most notably Andrey Lushnikov, Pavel Feldman, and Boris Yankov — previously built and maintained **Puppeteer** at Google: a Node.js library for controlling headless Chrome via the Chrome DevTools Protocol (CDP). When they moved to **Microsoft**, they did not iterate on Puppeteer's codebase. They started fresh, applying everything they had learned about where browser automation breaks at scale.\n\nThis \"second attempt by the same people\" is why Playwright feels deliberately engineered rather than patched together. Puppeteer was built specifically for Chromium. Its creators knew exactly where that architecture failed — it could not reliably control Firefox or Safari/WebKit through one API. Playwright was designed from day one for **multi-browser control** through a single surface.\n\nPlaywright was first released publicly in **January 2020**. That makes it young next to Selenium (2004), but the youth is a selling point: the tool was designed with full knowledge of SPAs, shadow DOM, and async rendering — not retrofitted onto assumptions from the mid-2000s web.\n\n### Open-source, actively maintained, Microsoft-backed\n\nPlaywright is **MIT-licensed** and fully open-source on GitHub. \"Backed by Microsoft\" means a dedicated, funded engineering team — not a side project maintained in spare time — and a fast release cadence (minor versions roughly every 2–4 weeks, typically adding real capabilities). Integration with VS Code, Azure DevOps, and the broader Microsoft dev ecosystem is first-class.\n\nPractically: when you hit a rough edge, the chance of a fix or workaround shipping soon is higher than with a stagnant tool. It also matters for career relevance — companies are less nervous adopting a tool with strong institutional backing.\n\n### Three gaps that drove Playwright's creation\n\n**1. Selenium's flakiness problem**\n\nSelenium's WebDriver protocol requires you to manually manage waits — `time.sleep()`, explicit waits for specific conditions, polling loops. Miss a wait and your test either fails randomly or clicks the wrong element because the page had not finished rendering. This remains the single biggest source of pain in Selenium-based suites.\n\n**2. Puppeteer's Chrome-only limitation**\n\nPuppeteer only ever fully supported Chromium. Cross-browser testing meant maintaining an entirely separate toolchain for Firefox and Safari — which most teams simply did not do. Bugs specific to non-Chrome browsers shipped to production undetected.\n\n**3. Poor support for modern web patterns**\n\nBoth older tools struggled with patterns that are now completely normal: single-page apps with client-side routing, shadow DOM (design systems and web components), deeply nested iframes, and apps that fire dozens of async network calls before finishing render.\n\n### Playwright's answer\n\n| Gap | Playwright's response |\n|-----|----------------------|\n| Flakiness | Auto-waiting built into the core engine — not bolted on by each test author |\n| Chrome-only | Native Chromium, Firefox, and WebKit from day one |\n| Modern web | Locators and APIs designed to pierce shadow DOM and handle iframes without ceremony |\n\nUnderstanding this origin explains why Playwright ships its own browser binaries, why auto-waiting is non-negotiable in the API design, and why teams migrating from Selenium often report fewer flakes **without changing application code**.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
