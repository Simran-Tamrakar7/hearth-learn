import type { ChapterRecord } from "../../../types";

/** 1. Where Playwright is Used */
export const chapter = {
  "id": "pw-0-where",
  "title": "1. Where Playwright is Used",
  "minutes": 30,
  "level": "beginner",
  "phase": "Part 0 · Background",
  "partName": "Part 0 · Background",
  "overviewText": "Playwright's primary job is web UI test automation — functional checks, regression suites, and end-to-end user journeys — but it also covers API testing via APIRequestContext, visual regression via screenshot diffing, web scraping of JavaScript-rendered pages, and cross-browser compatibility runs. Industries that ship revenue-critical web apps — e-commerce checkout, SaaS dashboards, banking portals, healthcare patient portals — adopt it because manual regression after every deploy does not scale. For internal tools like HRMS, payroll, and leave management, the pitch is identical: automate the flows that break every release cycle and free QA time for exploratory testing.",
  "why": "Knowing where Playwright fits prevents scope confusion — you won't propose it for load testing or native iOS apps, and you won't maintain a separate Postman suite when Playwright can hit APIs in the same project. Understanding industry use cases also helps you articulate ROI: a broken checkout button costs revenue by the minute; a flaky Selenium suite costs developer hours chasing false failures.",
  "when": "Reference this chapter when scoping a new automation project, writing a test strategy document, or answering 'what can Playwright do for us?' in a standup. Return to it before Part 4 (API testing, visual regression) and Part 8 (cross-browser runs) since those chapters expand on capabilities introduced here at a high level.",
  "practical": {
    "app": "E-commerce — checkout regression",
    "scenario": "After a frontend deploy, the QA lead needs to verify search → add to cart → checkout → confirmation still works across Chrome and Safari-like WebKit. A Playwright E2E suite runs the full journey in CI; a separate visual regression check catches a CSS change that made the 'Pay Now' button invisible — something a functional click test alone would miss because the button still exists in the DOM.",
    "pass": "E2E test completes checkout in under 90 seconds; screenshot diff flags the invisible button before release.",
    "fail": "Team runs only manual smoke tests post-deploy; invisible button ships to production and support tickets spike within an hour."
  },
  "advantages": [
    "One tool covers UI E2E, API requests, visual regression, and cross-browser runs — fewer dependencies to maintain",
    "APIRequestContext lets you seed test data or verify backend state without a separate HTTP client library",
    "Screenshot comparison catches layout and CSS regressions functional assertions miss entirely",
    "Fully renders JavaScript-heavy SPAs for scraping — unlike requests/httpx which see empty shells",
    "Device descriptors (iPhone 13, Pixel 5) enable mobile-web testing without a physical device lab",
    "Documented, repeatable test runs satisfy banking and healthcare audit requirements for regression evidence"
  ],
  "limitations": [
    "E2E UI tests are slower and more brittle than unit or API tests — over-automating every edge case does not scale",
    "Visual regression baselines need careful maintenance when intentional design changes ship",
    "Scraping use case is a side path — Playwright's test-runner features (fixtures, parallel workers) don't apply to one-off scrapers",
    "Cross-browser runs triple CI time unless you parallelize with pytest-xdist or shard by browser",
    "Cannot replace accessibility audits or performance profiling — it complements, not replaces, specialized tools",
    "Internal HRMS modules with low change frequency may not justify full E2E coverage — prioritize revenue-critical flows first"
  ],
  "tools": [
    {
      "name": "Playwright APIRequestContext",
      "sub": "HTTP without a browser",
      "url": "https://playwright.dev/python/docs/api/class-apirequestcontext",
      "desc": "Playwright's APIRequestContext sends raw HTTP requests (GET, POST, PUT, DELETE) independently of any browser page. In a mixed test suite, you can create a user via API, then open the UI already authenticated — avoiding slow login flows in every test. It shares cookies and storage with browser contexts when configured, making it a first-class citizen in Playwright projects rather than a bolt-on. Covered in depth in Part 4, Chapter 18 of this manual.",
      "adv": [
        "Same project, same fixtures — no separate Postman or requests library for setup/teardown",
        "Can share authentication state with browser contexts for hybrid API+UI tests",
        "Faster than UI-only setup for creating test data (users, orders, leave requests)",
        "Request/response logging integrates with Playwright trace viewer"
      ],
      "lim": [
        "Not a full API testing framework — no built-in contract testing or OpenAPI validation",
        "Overkill if your project needs API tests only with zero UI coverage",
        "Does not replace dedicated load tools (k6, JMeter) for throughput measurement"
      ]
    }
  ],
  "contentMarkdown": "## 1. Where Playwright is Used\n\nKnowing *where* Playwright fits prevents recommending it for problems it was never designed to solve — and helps you scope a test strategy that matches real team workflows.\n\n### End-to-end (E2E) testing\n\nThe bread-and-butter use case: tests that mirror real user journeys. Log in, navigate to a module, perform an action, verify the result. For an HRMS system, representative E2E coverage might include logging in as different roles (admin, employee, manager), submitting and approving leave requests, running payroll and verifying calculated amounts, or onboarding a new employee record end to end.\n\nPlaywright's auto-waiting and accessibility-first locators make these multi-step, stateful flows less brittle than equivalent Selenium suites — especially on React/Vue SPAs where DOM structure shifts between deploys.\n\n### Regression testing\n\nRegression suites re-run critical paths after every deploy to catch breakage early. Playwright's speed (CDP over WebSocket vs WebDriver over HTTP), parallel execution via pytest-xdist, and trace-on-failure capture make it a strong fit for CI pipelines that must complete in minutes, not hours.\n\nTeams often start with a smoke subset (login, checkout, core CRUD) and expand toward full regression as confidence grows.\n\n### API testing\n\nPlaywright includes `APIRequestContext` for HTTP calls with isolated cookies and headers — useful for seeding data before a UI test, validating backend contracts, or running API-only suites alongside browser tests in one pytest project. It is not a replacement for dedicated API frameworks (REST Assured, httpx test suites), but it eliminates context-switching when your E2E test needs a setup call.\n\n### Visual regression testing\n\nPlaywright ships `expect(page).to_have_screenshot()` as a first-party assertion — baseline comparison with configurable thresholds. No third-party plugin required (unlike Cypress, where visual diffing is always layered on). Visual tests supplement functional E2E; they catch CSS/layout regressions that assertions on text alone miss.\n\n### Web scraping and automation scripts\n\nBeyond testing, teams use Playwright for data extraction from JavaScript-heavy sites that defeat simple HTTP clients. The same Browser → Context → Page model applies. Scraping is not this manual's focus, but the skill transfers directly — locators, network interception, and headless launch work identically.\n\n### Cross-browser testing\n\nOne test file, three engines: Chromium (Chrome + Edge), Firefox, and WebKit (Safari's engine — testable on Linux/Windows CI without Mac hardware). Cross-browser is not a separate toolchain; it is a CLI flag or pytest parameter.\n\n### Industries and team shapes\n\nPlaywright adoption clusters in:\n\n- **SaaS and e-commerce** — fast deploy cycles, SPA-heavy UIs, CI-first culture\n- **Fintech and banking** — regulated environments that still need reliable regression on web portals\n- **Healthcare portals** — complex forms, iframe embeds, multi-step workflows\n- **Dedicated QA automation teams** — external-driver architecture supports multi-language stacks, Page Object Model, and parallel CI grids\n\nOrganizations with polyglot backends (Python data teams, Java services) often prefer Playwright's Python bindings over Cypress's JS-only model — relevant because this manual teaches **pytest-playwright**, not the Node.js test runner.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
