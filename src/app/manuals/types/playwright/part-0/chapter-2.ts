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
  "contentMarkdown": "Primary use case: web UI automation (functional, regression, E2E). Also API testing, visual regression, scraping, and cross-browser checks — across industries that ship web apps.\n\n## Web UI test automation\n\nWeb UI test automation (functional, regression, E2E) is the primary use case and the one this manual focuses on almost entirely.\n\nFunctional testing asks whether a specific feature works as intended (e.g., does the “add to cart” button add an item?). Regression testing asks whether previously-working features still work after a code change — this is where automation earns its keep, since re-running the same checks manually after every deploy doesn’t scale. End-to-end (E2E) testing simulates a full real user journey across multiple pages/features (e.g., search → add to cart → checkout → confirmation), rather than testing one isolated piece.\n\n## API, visual, scraping, and cross-browser\n\nAPI testing: Playwright isn’t just a browser tool — it ships APIRequestContext, letting you send raw HTTP requests (GET/POST/PUT/DELETE) without a browser at all. That means one tool can cover both your UI layer and your backend API layer, instead of maintaining Playwright for UI and a separate tool (like Postman/requests) for APIs. You’ll get the full picture in Part 4, Chapter 18.\n\nVisual regression testing asks “does the page still look right?” Playwright can take a screenshot and pixel-diff it against a saved baseline image, catching things functional tests would completely miss — like a CSS change that accidentally makes text invisible, or a layout shift that pushes a button off-screen. Covered in depth in Chapter 19.\n\nWeb scraping / data extraction: because Playwright can fully render JavaScript-heavy pages (unlike simple HTTP-request-based scrapers), it’s also popular for scraping sites that load content dynamically. This is a side use case — not the manual’s focus — but worth knowing it exists since it sometimes comes up in interviews or side projects.\n\nCross-browser compatibility testing runs the identical test suite against Chromium, Firefox, and WebKit to catch browser-specific rendering or behavior bugs before real users do. Covered practically in Chapter 23.\n\n## Industries and how to pitch value\n\nIndustries: e-commerce, SaaS, banking, healthcare — anywhere with a web app needing automated QA.\n\nE-commerce — checkout and payment flows are directly tied to revenue; a broken “Buy Now” button costs money by the minute. SaaS — ships UI changes constantly (sometimes daily), so manual regression testing alone can’t keep pace. Banking — heavy compliance and audit requirements mean documented, repeatable, automated test evidence is often mandatory, not optional. Healthcare — similar compliance pressure, plus accessibility requirements (tying into Chapter 19’s a11y content) are often legally required, not just nice-to-have.\n\nIf you work on internal tooling (HRM, payroll, attendance, leave), the pitch is the same: fewer manual regression passes on critical modules every release cycle.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
