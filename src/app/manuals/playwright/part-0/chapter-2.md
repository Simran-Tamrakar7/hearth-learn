---
id: "pw-0-where"
title: "1. Where Playwright is Used"
minutes: 30
partName: "Part 0 · Background"
level: "beginner"
---

Primary use case: web UI automation (functional, regression, E2E). Also API testing, visual regression, scraping, and cross-browser checks — across industries that ship web apps.

## Web UI test automation

Web UI test automation (functional, regression, E2E) is the primary use case and the one this manual focuses on almost entirely.

Functional testing asks whether a specific feature works as intended (e.g., does the “add to cart” button add an item?). Regression testing asks whether previously-working features still work after a code change — this is where automation earns its keep, since re-running the same checks manually after every deploy doesn’t scale. End-to-end (E2E) testing simulates a full real user journey across multiple pages/features (e.g., search → add to cart → checkout → confirmation), rather than testing one isolated piece.

## API, visual, scraping, and cross-browser

API testing: Playwright isn’t just a browser tool — it ships APIRequestContext, letting you send raw HTTP requests (GET/POST/PUT/DELETE) without a browser at all. That means one tool can cover both your UI layer and your backend API layer, instead of maintaining Playwright for UI and a separate tool (like Postman/requests) for APIs. You’ll get the full picture in Part 4, Chapter 18.

Visual regression testing asks “does the page still look right?” Playwright can take a screenshot and pixel-diff it against a saved baseline image, catching things functional tests would completely miss — like a CSS change that accidentally makes text invisible, or a layout shift that pushes a button off-screen. Covered in depth in Chapter 19.

Web scraping / data extraction: because Playwright can fully render JavaScript-heavy pages (unlike simple HTTP-request-based scrapers), it’s also popular for scraping sites that load content dynamically. This is a side use case — not the manual’s focus — but worth knowing it exists since it sometimes comes up in interviews or side projects.

Cross-browser compatibility testing runs the identical test suite against Chromium, Firefox, and WebKit to catch browser-specific rendering or behavior bugs before real users do. Covered practically in Chapter 23.

## Industries and how to pitch value

Industries: e-commerce, SaaS, banking, healthcare — anywhere with a web app needing automated QA.

E-commerce — checkout and payment flows are directly tied to revenue; a broken “Buy Now” button costs money by the minute. SaaS — ships UI changes constantly (sometimes daily), so manual regression testing alone can’t keep pace. Banking — heavy compliance and audit requirements mean documented, repeatable, automated test evidence is often mandatory, not optional. Healthcare — similar compliance pressure, plus accessibility requirements (tying into Chapter 19’s a11y content) are often legally required, not just nice-to-have.

If you work on internal tooling (HRM, payroll, attendance, leave), the pitch is the same: fewer manual regression passes on critical modules every release cycle.