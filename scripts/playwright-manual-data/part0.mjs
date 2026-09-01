/** Playwright manual Part 0 — Background */
export const chapters = [
  {
    contentMarkdown: `## 0. What is Playwright, Really

Playwright's origin story matters more than trivia. The engineers who built it came from Puppeteer — and designed a second attempt for modern multi-browser web apps.

### History — Puppeteer team, Microsoft, January 2020

The core engineers behind Playwright — most notably Andrey Lushnikov, Pavel Feldman, and Boris Yankov — previously built and maintained **Puppeteer** at Google: a Node.js library for controlling headless Chrome via the Chrome DevTools Protocol (CDP). When they moved to **Microsoft**, they did not iterate on Puppeteer's codebase. They started fresh, applying everything they had learned about where browser automation breaks at scale.

This "second attempt by the same people" is why Playwright feels deliberately engineered rather than patched together. Puppeteer was built specifically for Chromium. Its creators knew exactly where that architecture failed — it could not reliably control Firefox or Safari/WebKit through one API. Playwright was designed from day one for **multi-browser control** through a single surface.

Playwright was first released publicly in **January 2020**. That makes it young next to Selenium (2004), but the youth is a selling point: the tool was designed with full knowledge of SPAs, shadow DOM, and async rendering — not retrofitted onto assumptions from the mid-2000s web.

### Open-source, actively maintained, Microsoft-backed

Playwright is **MIT-licensed** and fully open-source on GitHub. "Backed by Microsoft" means a dedicated, funded engineering team — not a side project maintained in spare time — and a fast release cadence (minor versions roughly every 2–4 weeks, typically adding real capabilities). Integration with VS Code, Azure DevOps, and the broader Microsoft dev ecosystem is first-class.

Practically: when you hit a rough edge, the chance of a fix or workaround shipping soon is higher than with a stagnant tool. It also matters for career relevance — companies are less nervous adopting a tool with strong institutional backing.

### Three gaps that drove Playwright's creation

**1. Selenium's flakiness problem**

Selenium's WebDriver protocol requires you to manually manage waits — \`time.sleep()\`, explicit waits for specific conditions, polling loops. Miss a wait and your test either fails randomly or clicks the wrong element because the page had not finished rendering. This remains the single biggest source of pain in Selenium-based suites.

**2. Puppeteer's Chrome-only limitation**

Puppeteer only ever fully supported Chromium. Cross-browser testing meant maintaining an entirely separate toolchain for Firefox and Safari — which most teams simply did not do. Bugs specific to non-Chrome browsers shipped to production undetected.

**3. Poor support for modern web patterns**

Both older tools struggled with patterns that are now completely normal: single-page apps with client-side routing, shadow DOM (design systems and web components), deeply nested iframes, and apps that fire dozens of async network calls before finishing render.

### Playwright's answer

| Gap | Playwright's response |
|-----|----------------------|
| Flakiness | Auto-waiting built into the core engine — not bolted on by each test author |
| Chrome-only | Native Chromium, Firefox, and WebKit from day one |
| Modern web | Locators and APIs designed to pierce shadow DOM and handle iframes without ceremony |

Understanding this origin explains why Playwright ships its own browser binaries, why auto-waiting is non-negotiable in the API design, and why teams migrating from Selenium often report fewer flakes **without changing application code**.`,
  },
  {
    contentMarkdown: `## 1. Where Playwright is Used

Knowing *where* Playwright fits prevents recommending it for problems it was never designed to solve — and helps you scope a test strategy that matches real team workflows.

### End-to-end (E2E) testing

The bread-and-butter use case: tests that mirror real user journeys. Log in, navigate to a module, perform an action, verify the result. For an HRMS system, representative E2E coverage might include logging in as different roles (admin, employee, manager), submitting and approving leave requests, running payroll and verifying calculated amounts, or onboarding a new employee record end to end.

Playwright's auto-waiting and accessibility-first locators make these multi-step, stateful flows less brittle than equivalent Selenium suites — especially on React/Vue SPAs where DOM structure shifts between deploys.

### Regression testing

Regression suites re-run critical paths after every deploy to catch breakage early. Playwright's speed (CDP over WebSocket vs WebDriver over HTTP), parallel execution via pytest-xdist, and trace-on-failure capture make it a strong fit for CI pipelines that must complete in minutes, not hours.

Teams often start with a smoke subset (login, checkout, core CRUD) and expand toward full regression as confidence grows.

### API testing

Playwright includes \`APIRequestContext\` for HTTP calls with isolated cookies and headers — useful for seeding data before a UI test, validating backend contracts, or running API-only suites alongside browser tests in one pytest project. It is not a replacement for dedicated API frameworks (REST Assured, httpx test suites), but it eliminates context-switching when your E2E test needs a setup call.

### Visual regression testing

Playwright ships \`expect(page).to_have_screenshot()\` as a first-party assertion — baseline comparison with configurable thresholds. No third-party plugin required (unlike Cypress, where visual diffing is always layered on). Visual tests supplement functional E2E; they catch CSS/layout regressions that assertions on text alone miss.

### Web scraping and automation scripts

Beyond testing, teams use Playwright for data extraction from JavaScript-heavy sites that defeat simple HTTP clients. The same Browser → Context → Page model applies. Scraping is not this manual's focus, but the skill transfers directly — locators, network interception, and headless launch work identically.

### Cross-browser testing

One test file, three engines: Chromium (Chrome + Edge), Firefox, and WebKit (Safari's engine — testable on Linux/Windows CI without Mac hardware). Cross-browser is not a separate toolchain; it is a CLI flag or pytest parameter.

### Industries and team shapes

Playwright adoption clusters in:

- **SaaS and e-commerce** — fast deploy cycles, SPA-heavy UIs, CI-first culture
- **Fintech and banking** — regulated environments that still need reliable regression on web portals
- **Healthcare portals** — complex forms, iframe embeds, multi-step workflows
- **Dedicated QA automation teams** — external-driver architecture supports multi-language stacks, Page Object Model, and parallel CI grids

Organizations with polyglot backends (Python data teams, Java services) often prefer Playwright's Python bindings over Cypress's JS-only model — relevant because this manual teaches **pytest-playwright**, not the Node.js test runner.`,
  },
  {
    contentMarkdown: `## 2. What Playwright Can Do

This chapter catalogs capabilities at a high level. Parts 1–8 teach each one hands-on. Use it as a map — not a tutorial.

### Multi-browser support

Launch and control **Chromium**, **Firefox**, and **WebKit** through one API. Switch engines with a single argument:

\`\`\`python
# pytest-playwright CLI
pytest --browser firefox

# Standalone script
browser = p.chromium.launch()   # or p.firefox, p.webkit
\`\`\`

Playwright ships patched browser binaries matched to the library version — you test Playwright's browsers, not necessarily the user's exact Chrome build. That trade-off buys consistent behavior across CI agents.

### Mobile emulation

Device descriptors emulate viewport size, user agent, touch events, and device scale factor — testing how a site renders on iPhone or Pixel without a physical device:

\`\`\`python
iphone = playwright.devices["iPhone 13"]
context = browser.new_context(**iphone)
page = context.new_page()
\`\`\`

This is **mobile web** emulation (website in a mobile browser), not native app testing. Native iOS/Android apps require Appium — covered in Part 0, Chapter 4 (scope boundaries).

### Auto-waiting

Every action (\`click\`, \`fill\`, \`check\`) and every \`expect()\` assertion automatically retries until the element is actionable or a timeout expires. Playwright checks visibility, stability, enabled state, and unobstructed hit-target before acting. You should rarely write \`time.sleep()\` — and when you do, it is a smell worth investigating.

### Network interception

Mock, block, or modify HTTP requests and responses in real time:

\`\`\`python
page.route("**/api/users", lambda route: route.fulfill(
    status=200,
    body='[{"id": 1, "name": "Test User"}]'
))
page.goto("https://app.example.com/users")
\`\`\`

This enables testing edge cases (empty lists, 500 errors, slow responses) without backend changes — impossible over Selenium's HTTP WebDriver layer.

### Multi-tab and multi-context

A \`BrowserContext\` can hold multiple \`Page\` objects (tabs). Playwright's external-driver architecture makes multi-tab flows native — open a link in a new tab, switch pages, return to the original. Multiple contexts in one browser simulate independent users (separate cookies, storage) without launching separate browser processes.

### Headless and headed modes

\`\`\`python
browser = p.chromium.launch(headless=True)   # CI, no display
browser = p.chromium.launch(headless=False)  # watch while learning/debugging
\`\`\`

Headless is the default and runs on typical Linux CI agents. Headed mode (\`headless=False\`) is invaluable while learning — you see exactly what Playwright targets.

### Test runner note (Python vs JS)

The official **@playwright/test** runner (JavaScript/TypeScript) ships parallel execution, HTML reporting, and trace viewer integration out of the box. **Python** uses **pytest-playwright** — same browser capabilities, different test harness. This manual teaches pytest throughout; translate JS docs mechanically (snake_case, sync API).

### Trace and video

Record a full execution trace (DOM snapshots, network log, screenshots per step) for post-mortem debugging:

\`\`\`bash
pytest --tracing on
\`\`\`

Video capture is opt-in (\`--video=on\`) — unlike some tools that record everything by default and bloat CI artifacts.

### Parallel execution

Run tests across workers with pytest-xdist:

\`\`\`bash
pip install pytest-xdist
pytest -n auto
\`\`\`

Each worker gets isolated browser contexts. Parallelism is a pytest concern, not a Playwright limitation — the library itself supports concurrent contexts within one process.`,
  },
  {
    contentMarkdown: `## 3. Why Companies Choose Playwright Over Alternatives

Tool selection is rarely about "best in absolute terms" — it is about fit for team skills, application architecture, and CI constraints. Playwright wins specific scenarios decisively; knowing which ones makes you credible in architecture reviews and interviews.

### Speed and reliability vs Selenium

Selenium communicates with browsers over the **WebDriver protocol** — HTTP request/response to a separate driver process. Every command serializes, waits, deserializes. Playwright holds a persistent **WebSocket** connection via CDP — lower overhead, faster round-trips, and real-time event streams (network, console, DOM mutations).

The reliability gap is larger than the speed gap. Selenium leaves wait management to the test author. Playwright's auto-waiting eliminates the most common flake source: acting on elements before they are ready. Teams migrating from Selenium often report **50–80% reduction in flaky failures** in the first quarter — without rewriting application code, only test code.

Trade-off: teams with years of Selenium Grid infrastructure face migration cost. Playwright is not a drop-in replacement for WebDriver-based frameworks — it is a deliberate upgrade path.

### Modern web support

SPAs, shadow DOM, nested iframes, and client-side routing are first-class concerns in Playwright's locator design:

- \`get_by_role\`, \`get_by_label\`, \`get_by_text\` query the accessibility tree — survive CSS refactors
- \`frame_locator()\` handles iframes without window-handle switching
- Shadow piercing is built into locators — no special "pierce shadow root" ceremony

Selenium can do many of these things — with more code, more waits, and more maintenance. Cypress handles SPAs well but historically struggled with multi-tab and cross-origin flows due to its in-browser execution model.

### Cross-browser without separate toolchains

One API, three engines. Selenium requires separate drivers (chromedriver, geckodriver, safaridriver) with version-matching headaches. Cypress historically centered on Chromium. Playwright downloads matched binaries with \`playwright install\` — one command, consistent versions.

WebKit support matters for Safari-like testing on Linux CI — catching Safari-specific layout bugs without Mac hardware in the pipeline.

### Developer experience and debugging

- **Trace Viewer** — step-through DOM snapshots, network timeline, and screenshots after failure
- **Codegen** — record interactions, export Python/JS/Java/C# locators
- **VS Code extension** — pick locators from the page, run tests from the editor
- **Headed debugging** — watch the browser while stepping through a failing test

These reduce mean-time-to-diagnose compared to parsing Selenium stack traces that point at the framework, not the application state.

### Job market and career relevance

Playwright job postings have grown steadily since 2020 — particularly for QA automation engineers, SDETs, and full-stack teams owning their own E2E suites. Interviewers increasingly ask "why Playwright over Selenium/Cypress?" expecting architectural answers, not "it is newer."

Python + Playwright is a strong combination for teams where the backend, data pipeline, and test automation share one language. Knowing how to translate JS-first official docs into pytest-playwright is a practical skill this manual builds throughout.

### When Playwright is not the obvious pick

- **JS-only frontend teams** deeply invested in Cypress component testing may not gain enough from switching
- **Native mobile apps** — Appium, not Playwright
- **Load/performance testing** — k6, JMeter, Locust
- **Legacy enterprises** with Selenium Grid, BrowserStack contracts, and hundreds of existing specs — migration ROI must be calculated

The honest answer in interviews: "Playwright for browser E2E and API setup; k6 for load; Appium for native mobile." Scoped correctly, Playwright is often the best tool in its lane.`,
  },
  {
    contentMarkdown: `## 4. What This Manual Will NOT Cover

Setting boundaries early prevents wasted learning time and stops you from proposing Playwright for problems it was never designed to solve.

### JavaScript/TypeScript and @playwright/test

A huge amount of Playwright's official documentation and community content is **JS/TS-first** — because that is where the built-in test runner (\`@playwright/test\`) lives. You will frequently read JS examples online and translate syntax to Python:

| JavaScript | Python |
|------------|--------|
| \`page.getByRole('button')\` | \`page.get_by_role('button')\` |
| \`await page.click()\` | \`page.click()\` (sync API) |
| \`playwright.config.ts\` | \`pytest.ini\` / \`conftest.py\` |

This manual **sticks to Python + pytest-playwright** throughout. It will not teach Node.js setup, \`playwright.config.ts\`, or JS fixture patterns. You will learn to translate — not to write TypeScript test suites.

### Native mobile app testing (Appium)

**Mobile web emulation** (device descriptors, viewport, touch) is in scope — testing a website as it renders in a mobile browser.

**Native iOS/Android apps** (compiled apps installed from an app store) are **out of scope**. That requires **Appium**, which automates the OS-level app through XCUITest (iOS) or UiAutomator (Android) — a fundamentally different problem than browser automation.

Do not confuse the two when scoping work or interviews:

- "Test our responsive checkout on mobile Safari" → Playwright WebKit + device descriptor
- "Test our Flutter/React Native app login flow" → Appium

### Load and performance testing (k6, JMeter, Locust)

Playwright automates **one browser session behaving like one real user**. It is not built to simulate thousands of concurrent users measuring throughput, latency percentiles, or server capacity under stress.

That is a separate discipline:

| Tool | Strength |
|------|----------|
| **k6** | Modern, scriptable, popular in CI, Grafana integration |
| **JMeter** | GUI-heavy, enterprise familiarity, broad protocol support |
| **Locust** | Python-based, code-first, good for teams already on Python |

Running 50 parallel Playwright tests and calling it "load testing" measures browser overhead and CI capacity — not whether your API survives Black Friday traffic. Scope Playwright for **functional E2E**; scope k6 (or similar) for **performance**.

### What you will learn instead

Parts 1–8 cover Python environment setup, locators, actions, assertions, pytest fixtures, Page Object Model, CI integration, and advanced patterns — everything needed to build and maintain a production Playwright test suite for web applications.

If a job posting asks for Appium or k6, treat those as **complementary skills**, not gaps in this manual.`,
  },
];
