/** Chapter body for /manuals/playwright. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "playwright",
  "title": "Playwright with Python",
  "tagline": "Complete Beginner-to-Pro Manual — background through job-ready capstone, plus a full resources library.",
  "category": "automation",
  "accent": "#1B4D3E",
  "cover": "covers/playwright-cover.png",
  "duration": "4–6 months (1–2 hrs/day)",
  "levelSpan": "Zero → Job-ready",
  "who": "Beginners and manual QAs aiming to become Playwright Automation Engineers with Python.",
  "outcomes": [
    "Automate Chromium/Firefox/WebKit with sync Playwright + pytest",
    "Build POM frameworks with data, mocking, auth reuse, and CI reporting",
    "Ship a capstone portfolio and interview-ready stories",
    "Know where to keep learning — books, communities, and ecosystem signals"
  ],
  "pace": {
    "hoursPerDay": "1–2 hours/day",
    "recommended": "~4–6 months",
    "accelerated": "~3 months at 3–4 hrs/day",
    "slow": "~7–9 months if busy"
  },
  "chapters": [
    {
      "id": "pw-0-what",
      "phase": "Part 0 · Background",
      "level": "beginner",
      "title": "0. What is Playwright, Really",
      "minutes": 35,
      "durationLabel": "Day 1",
      "overview": "Playwright’s origin story matters more than it seems. The engineers who built it came from Puppeteer — and designed a second attempt for modern multi-browser web apps.",
      "learn": [
        "History — Microsoft, Puppeteer lineage, Jan 2020 public release",
        "Open-source, MIT, funded engineering cadence",
        "Why it was created: Selenium flakiness, Chrome-only Puppeteer, modern web gaps"
      ],
      "steps": [
        {
          "title": "History — built by Microsoft, evolved from the Puppeteer team",
          "body": "Playwright’s origin story matters more than it seems on the surface. The core engineers who built Playwright — most notably Andrey Lushnikov, Pavel Feldman, and Boris Yankov — were previously on the team at Google that built and maintained Puppeteer, the Node.js library for controlling headless Chrome. When they moved to Microsoft, they took everything they’d learned from Puppeteer’s limitations and built something new instead of iterating on the old codebase.\n\nThis “second attempt by the same people” origin is why Playwright feels less like a patched-together tool and more like a deliberately designed one. Puppeteer was built specifically for Chrome/Chromium via the Chrome DevTools Protocol (CDP). Its creators knew intimately where that architecture broke down — mainly, it couldn’t reliably control Firefox or Safari/WebKit. Playwright was designed from day one to solve that: a single API surface that talks to all three major browser engines.\n\nFirst released publicly in January 2020, Playwright is comparatively young next to Selenium (which dates back to 2004). That youth is actually a selling point in interviews — it means the tool was designed with full knowledge of modern web apps (SPAs, shadow DOM, complex async behavior) rather than retrofitted onto assumptions from the mid-2000s web.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Playwright’s core engineers previously built which tool?",
            "options": [
              "Selenium IDE",
              "Puppeteer",
              "Cypress",
              "Watir"
            ],
            "answer": 1,
            "explain": "Andrey Lushnikov, Pavel Feldman, and Boris Yankov came from the Puppeteer team at Google."
          },
          "tryIt": null,
          "doThis": "Write one sentence: “Playwright exists because ___.”",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": "Why the origin story shows up in interviews"
        },
        {
          "title": "Open-source, actively maintained, backed by Microsoft",
          "body": "Playwright is MIT-licensed and fully open-source on GitHub. “Backed by Microsoft” isn’t just marketing — it means a dedicated, funded engineering team (not a side project maintained by volunteers in their spare time); a fast release cadence — new minor versions ship roughly every 2–4 weeks, each typically adding real capabilities (not just bug fixes); and integration hooks with the broader Microsoft dev ecosystem (VS Code extension, Azure DevOps pipeline support).\n\nThis matters practically: when you hit a rough edge with Playwright, the chance it gets fixed or has a workaround shipped soon is much higher than with a stagnant tool. It’s also a plus for job security in your skillset — companies are less nervous adopting a tool with strong backing versus something that might get abandoned.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Dedicated funded engineering team",
            "Minor releases roughly every 2–4 weeks",
            "VS Code extension and Azure DevOps hooks"
          ],
          "callout": {
            "label": "Practical takeaway",
            "body": "Adoption risk is lower when the vendor ships fixes on a predictable cadence — mention that when pitching Playwright at work.",
            "tone": "tip"
          },
          "aside": null
        },
        {
          "title": "Why it was created (gaps in Selenium / Puppeteer)",
          "body": "Three concrete gaps drove Playwright’s creation.\n\nSelenium’s flakiness problem: Selenium’s WebDriver protocol requires you to manually manage waits — time.sleep(), explicit waits for specific conditions, etc. Miss a wait condition and your test either fails randomly or clicks the wrong thing because the page hadn’t finished rendering. This was (and still is) the single biggest source of pain in Selenium-based suites.\n\nPuppeteer’s Chrome-only limitation: Puppeteer only ever fully supported Chromium. Cross-browser testing meant maintaining an entirely separate toolchain for Firefox/Safari, which most teams simply didn’t do — meaning bugs specific to non-Chrome browsers shipped to production undetected.\n\nPoor support for modern web patterns: Both older tools struggled with things that are now completely normal on the web: single-page apps with heavy client-side routing, shadow DOM (used by design systems and web components), iframes nested multiple levels deep, and apps that make dozens of async network calls before finishing rendering.\n\nPlaywright’s answer to all three: auto-waiting built into the core engine (not bolted on by the test author), native multi-browser support from the start, and locators/APIs specifically designed to pierce shadow DOM and handle iframes without special ceremony.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Remember this triad",
            "body": "Auto-waiting · multi-browser · modern DOM support. If you can explain those three, you can explain why Playwright exists.",
            "tone": "note"
          },
          "aside": null
        }
      ],
      "checklist": [
        "I can tell the Puppeteer → Playwright origin in two sentences",
        "I can name the three gaps Playwright was built to close",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "Origin note",
        "brief": "In LEARNING.md, write a short paragraph a hiring manager would accept: why Playwright over Selenium for a modern SPA."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Playwright’s origin story matters more than it seems. The engineers who built it came from Puppeteer — and designed a second attempt for modern multi-browser web apps.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-0-where",
      "phase": "Part 0 · Background",
      "level": "beginner",
      "title": "1. Where Playwright is Used",
      "minutes": 30,
      "overview": "Primary use case: web UI automation (functional, regression, E2E). Also API testing, visual regression, scraping, and cross-browser checks — across industries that ship web apps.",
      "learn": [
        "Functional, regression, and E2E UI testing",
        "APIRequestContext for API coverage in the same tool",
        "Visual regression, scraping, cross-browser",
        "Industry framing: e-commerce, SaaS, banking, healthcare"
      ],
      "steps": [
        {
          "title": "Web UI test automation",
          "body": "Web UI test automation (functional, regression, E2E) is the primary use case and the one this manual focuses on almost entirely.\n\nFunctional testing asks whether a specific feature works as intended (e.g., does the “add to cart” button add an item?). Regression testing asks whether previously-working features still work after a code change — this is where automation earns its keep, since re-running the same checks manually after every deploy doesn’t scale. End-to-end (E2E) testing simulates a full real user journey across multiple pages/features (e.g., search → add to cart → checkout → confirmation), rather than testing one isolated piece.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Functional — does this feature work?",
            "Regression — did we break something that used to work?",
            "E2E — does the full user journey hold together?"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "API, visual, scraping, and cross-browser",
          "body": "API testing: Playwright isn’t just a browser tool — it ships APIRequestContext, letting you send raw HTTP requests (GET/POST/PUT/DELETE) without a browser at all. That means one tool can cover both your UI layer and your backend API layer, instead of maintaining Playwright for UI and a separate tool (like Postman/requests) for APIs. You’ll get the full picture in Part 4, Chapter 18.\n\nVisual regression testing asks “does the page still look right?” Playwright can take a screenshot and pixel-diff it against a saved baseline image, catching things functional tests would completely miss — like a CSS change that accidentally makes text invisible, or a layout shift that pushes a button off-screen. Covered in depth in Chapter 19.\n\nWeb scraping / data extraction: because Playwright can fully render JavaScript-heavy pages (unlike simple HTTP-request-based scrapers), it’s also popular for scraping sites that load content dynamically. This is a side use case — not the manual’s focus — but worth knowing it exists since it sometimes comes up in interviews or side projects.\n\nCross-browser compatibility testing runs the identical test suite against Chromium, Firefox, and WebKit to catch browser-specific rendering or behavior bugs before real users do. Covered practically in Chapter 23.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Scope note",
            "body": "This manual prioritizes UI E2E with Python. API and visual chapters come later — don’t skip the core locator/action/assert loop to chase them early.",
            "tone": "scope"
          },
          "aside": null
        },
        {
          "title": "Industries and how to pitch value",
          "body": "Industries: e-commerce, SaaS, banking, healthcare — anywhere with a web app needing automated QA.\n\nE-commerce — checkout and payment flows are directly tied to revenue; a broken “Buy Now” button costs money by the minute. SaaS — ships UI changes constantly (sometimes daily), so manual regression testing alone can’t keep pace. Banking — heavy compliance and audit requirements mean documented, repeatable, automated test evidence is often mandatory, not optional. Healthcare — similar compliance pressure, plus accessibility requirements (tying into Chapter 19’s a11y content) are often legally required, not just nice-to-have.\n\nIf you work on internal tooling (HRM, payroll, attendance, leave), the pitch is the same: fewer manual regression passes on critical modules every release cycle.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write three bullets pitching Playwright to your team for one release-critical flow.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can distinguish functional / regression / E2E",
        "I know APIRequestContext exists for API work",
        "I can pitch automation value for my domain"
      ],
      "practice": {
        "title": "Use-case map",
        "brief": "List two UI journeys and one API check you’d eventually cover with Playwright on a product you know."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Primary use case: web UI automation (functional, regression, E2E). Also API testing, visual regression, scraping, and cross-browser checks — across industries that ship web apps.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-0-cando",
      "phase": "Part 0 · Background",
      "level": "beginner",
      "title": "2. What Playwright Can Do",
      "minutes": 35,
      "overview": "One API for Chromium, Firefox, and WebKit; mobile web emulation; auto-waiting; network mocking; multi-context users; headed/headless; traces; parallel runs via pytest-xdist.",
      "learn": [
        "Multi-browser one API",
        "Mobile web emulation vs native apps",
        "Auto-waiting, route mocking, multi-context",
        "Python uses pytest-playwright (not @playwright/test)"
      ],
      "steps": [
        {
          "title": "Multi-browser and mobile web emulation",
          "body": "Automate Chromium, Firefox, WebKit — one API, all browsers. You write your test logic once, and swap the browser_type (chromium, firefox, webkit) to run the exact same test against a different engine — no rewriting locators or logic per browser. This is a genuinely rare capability; most tools require separate driver setups per browser at minimum, and Selenium historically required different WebDriver binaries per browser with occasional locator inconsistencies between them.\n\nMobile web emulation (no real device needed): Playwright ships built-in device descriptors (e.g., “iPhone 13”, “Pixel 5”) that set the right viewport size, user-agent string, touch support, and device pixel ratio automatically. You get realistic mobile-web testing without owning a device lab.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Boundary",
            "body": "This emulates mobile web browsers, not native mobile apps. Native iOS/Android automation is Appium territory — see Chapter 4 (out of scope).",
            "tone": "warn"
          },
          "aside": null
        },
        {
          "title": "Auto-waiting, network, multi-user, headed/headless",
          "body": "Auto-waiting is the single most-cited reason teams switch to Playwright. Before every action (click, fill, etc.), Playwright automatically waits for the target element to be attached to the DOM, visible, stable (not mid-animation), enabled, and able to receive events. If any of those conditions isn’t met within the timeout, it fails with a clear error explaining which condition wasn’t met — dramatically easier to debug than a generic Selenium “element not interactable” error.\n\nNetwork interception & mocking: page.route() lets you intercept any request the page makes and respond however you want — fulfill it, modify it, abort it, or let it pass through unchanged. This unlocks testing scenarios that are otherwise very hard to trigger reliably: simulating a server error, a slow/timing-out API, or an empty-data state, all without needing the actual backend to cooperate. Deep dive in Chapter 17.\n\nMulti-tab, multi-context, multi-user simulation: because each BrowserContext is fully isolated (separate cookies, storage, cache), you can open two contexts in the same test to simulate two different logged-in users interacting with the same feature simultaneously. This would require running two completely separate browser sessions in older tools.\n\nHeadless & headed: headless means the browser runs without a visible UI window — faster, and required in most CI environments. Headed means you see the actual browser window — invaluable while writing and debugging. The same test code runs in either mode; you just flip a launch option.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Runner, traces, and parallel execution (Python)",
          "body": "Built-in test runner (JS/TS) — Python uses pytest-playwright instead. Playwright’s official JS/TS package includes its own test runner (@playwright/test) with built-in parallelization, fixtures, and reporting. The Python version does not include an equivalent built-in runner — instead, the community-maintained pytest-playwright plugin fills that role, wiring Playwright into the pytest ecosystem you’ll cover starting in Part 3. This is why Part 3 leans so heavily on pytest concepts (fixtures, conftest.py) rather than a Playwright-native config system.\n\nTrace/video/screenshot capture out of the box: no third-party plugin needed — Playwright can record a full trace (DOM snapshots, network activity, console logs, screenshots at each step) of a test run, plus optionally save a video and screenshots on failure. Covered practically in Chapter 24 (Trace Viewer) and Chapter 28 (capture-on-failure).\n\nParallel test execution: tests can run across multiple worker processes simultaneously. In Python this is handled via pytest-xdist (Chapter 22) rather than anything Playwright-specific.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": "Don’t memorize every capability now — know the map so later chapters have a place to land.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Python scope",
            "body": "When docs show @playwright/test, translate mentally to pytest + pytest-playwright. Method names are close; the runner is different.",
            "tone": "scope"
          },
          "aside": null
        }
      ],
      "checklist": [
        "I can explain auto-waiting in one sentence",
        "I know Python uses pytest-playwright, not @playwright/test",
        "I know mobile web ≠ native app testing"
      ],
      "practice": {
        "title": "Capability checklist",
        "brief": "Star the three capabilities you’ll use first on your project; strike through anything out of scope."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "One API for Chromium, Firefox, and WebKit; mobile web emulation; auto-waiting; network mocking; multi-context users; headed/headless; traces; parallel runs via pytest-xdist.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-0-why",
      "phase": "Part 0 · Background",
      "level": "beginner",
      "title": "3. Why Companies Choose Playwright Over Alternatives",
      "minutes": 30,
      "overview": "Speed and reliability vs Selenium, modern SPA/shadow DOM support, lower flakiness from auto-waiting, and rising job-market demand.",
      "learn": [
        "Speed (CDP/WebSocket) vs reliability (auto-waiting)",
        "SPA / shadow DOM / iframe advantages",
        "Why flakiness drops after migration",
        "Job-market signal"
      ],
      "steps": [
        {
          "title": "Speed and reliability vs Selenium",
          "body": "Two distinct claims worth separating.\n\nSpeed: Playwright communicates with the browser directly over CDP/WebSocket (see Part 1, Chapter 3), which is a lower-overhead path than Selenium’s WebDriver protocol, which adds an extra HTTP layer (the WebDriver server) between your test code and the browser.\n\nReliability: this comes almost entirely from auto-waiting. A Selenium suite without carefully hand-tuned explicit waits will produce intermittent failures that have nothing to do with real bugs — just timing. Teams that migrate to Playwright commonly report their flaky-test rate dropping substantially, simply because the waiting problem is handled by the framework instead of by every individual test author remembering to do it right.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "A common reason teams leave Selenium is…",
            "options": [
              "Playwright cannot open URLs",
              "High flakiness and slow feedback loops",
              "Selenium supports more browsers than Playwright",
              "Selenium has no language bindings"
            ],
            "answer": 1,
            "explain": "Manual waits and protocol overhead made Selenium suites flaky and slow."
          },
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Speed → protocol path (CDP/WebSocket vs WebDriver HTTP)",
            "Reliability → auto-waiting owned by the framework"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Modern web app support",
          "body": "Selenium and older Puppeteer-era approaches were designed before SPAs (React/Angular/Vue apps that don’t do full page reloads) and shadow DOM (encapsulated web components) were the norm. Playwright’s locator engine was built with these patterns in mind — it can pierce shadow DOM by default and has first-class frame_locator() support for iframes (Part 2, Chapter 9), rather than requiring the workarounds these patterns demanded in older tools.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Lower flakiness — the recurring theme",
          "body": "Restating this because it’s genuinely the recurring theme across the entire manual — it comes up again in Chapters 5, 7, and 8. If there’s one concept to have rock-solid before moving past Part 2, it’s this one.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Gate concept",
            "body": "Master auto-waiting before you invent custom sleep helpers. Sleeps fight the framework.",
            "tone": "tip"
          },
          "aside": null
        },
        {
          "title": "Growing job market demand",
          "body": "Playwright adoption has grown fast over the last few years, and job postings mentioning it (versus Selenium-only postings) have been trending upward. This isn’t just a “nice tool” — it’s increasingly what QA automation job descriptions actually ask for, which is part of why this manual exists in your learning path.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Skim two job posts that mention Playwright; note which skills they cluster with (pytest, CI, POM).",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can separate speed vs reliability arguments",
        "I can explain why SPA/shadow DOM favor Playwright",
        "I treat auto-waiting as non-negotiable knowledge"
      ],
      "practice": {
        "title": "Elevator pitch",
        "brief": "Record a 60-second voice note: why your team should prefer Playwright over Selenium for a React app."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Speed and reliability vs Selenium, modern SPA/shadow DOM support, lower flakiness from auto-waiting, and rising job-market demand.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-0-not",
      "phase": "Part 0 · Background",
      "level": "beginner",
      "title": "4. What This Manual Will NOT Cover",
      "minutes": 20,
      "overview": "Out of scope: JS/TS Playwright as the teaching language, native mobile (Appium), and load/performance testing (k6/JMeter/Locust).",
      "learn": [
        "Python + pytest-playwright only",
        "Mobile web ≠ native apps",
        "Load testing is a separate discipline"
      ],
      "steps": [
        {
          "title": "JavaScript/TypeScript Playwright",
          "body": "Worth flagging early: a huge amount of Playwright’s own official documentation and community content is written JS/TS-first (since that’s Playwright’s native language and where the built-in test runner lives). You’ll frequently find yourself reading JS examples online and needing to mentally translate syntax to Python (e.g., page.click() stays similar, but async/await patterns, config files, and the test runner itself differ). This manual won’t teach you that translation — it sticks to Python + pytest-playwright throughout.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Reading tip",
            "body": "When you hit a JS snippet, translate camelCase → snake_case and ignore @playwright/test config — look for the page/locator/expect ideas.",
            "tone": "note"
          },
          "aside": null
        },
        {
          "title": "Native mobile and load testing",
          "body": "Mobile native app testing is Appium territory. Mobile web emulation (Chapter 2) is in scope — testing a website as it renders in a mobile browser. Testing an actual native iOS/Android app (a compiled app installed from an app store) is a fundamentally different problem requiring Appium, which automates the OS-level app itself rather than a browser. Don’t confuse the two when scoping future learning.\n\nLoad/performance testing is k6 / JMeter / Locust. Playwright automates one browser session behaving like one real user — it’s not built to simulate thousands of concurrent users hitting a server to measure throughput/latency under load. That’s a separate discipline with its own dedicated tools: k6 (modern, scriptable, popular in CI), JMeter (older, GUI-heavy, still widely used), and Locust (Python-based, code-first).",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a one-line “not this manual” sticky for your desk: no Appium, no k6, no JS runner.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": "Keep your learning track honest"
        }
      ],
      "checklist": [
        "I know this path is Python-first",
        "I won’t confuse mobile web with native apps",
        "I won’t expect Playwright to replace load tools"
      ],
      "practice": {
        "title": "Scope card",
        "brief": "Create a 3-bullet “in / out / later” card for your personal study plan."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Out of scope: JS/TS Playwright as the teaching language, native mobile (Appium), and load/performance testing (k6/JMeter/Locust).",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-1-intro",
      "phase": "Part 1 · Foundations",
      "level": "beginner",
      "title": "1. Introduction to Playwright",
      "minutes": 40,
      "durationLabel": "Week 1",
      "overview": "Hands-on entry point: Playwright vs Selenium vs Cypress, then supported browsers and languages — with Python as a near-complete API mirror of JS.",
      "learn": [
        "Mental shift from “why” to “how”",
        "Compare Selenium, Cypress, Playwright",
        "Browsers and language bindings"
      ],
      "steps": [
        {
          "title": "What is Playwright, why it exists (hands-on framing)",
          "body": "This chapter restates the origin story from Part 0 but frames it as the entry point to hands-on learning — the point where you stop reading about the tool and start touching it. The key mental shift: everything in Part 0 was “why should I care,” Part 1 onward is “how do I actually use this.”",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Playwright vs Selenium vs Cypress",
          "body": "Worth having a clear mental table for this — it’s a near-guaranteed interview question.\n\nProtocol: Selenium uses WebDriver over HTTP; Cypress runs inside the browser; Playwright talks CDP/WebSocket directly.\n\nBrowsers: Selenium supports many via separate drivers; Cypress is Chromium-family (with experimental Firefox/WebKit historically weak); Playwright supports Chromium, Firefox, and WebKit natively.\n\nAuto-waiting: Selenium no (manual waits); Cypress yes; Playwright yes.\n\nMulti-tab / multi-origin: Selenium clunky; Cypress weak by architecture; Playwright native support.\n\nLanguages: Selenium many; Cypress JS/TS only; Playwright JS/TS, Python, Java, .NET.\n\nSpeed: Selenium slower; Cypress fast; Playwright fast.\n\nThe Cypress limitation is worth understanding, not just memorizing: Cypress executes its test code inside the browser itself, in the same run loop as the page. That’s why it’s fast, but it also historically struggled with multiple tabs or cross-origin navigation. Playwright runs outside the browser and drives it externally, which is why it doesn’t have that constraint.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Interview table",
            "body": "Lead with protocol + auto-waiting + multi-tab. Those three differences land cleanly with interviewers.",
            "tone": "tip"
          },
          "aside": null
        },
        {
          "title": "Supported browsers & languages",
          "body": "Browsers: Chromium (covers Chrome + Edge), Firefox, WebKit (the engine behind Safari — meaning you can test Safari-like behavior on Linux/Windows CI machines without owning a Mac).\n\nLanguages: JavaScript/TypeScript (the original, most complete), Python, Java, and .NET/C#. Python’s API is a near-complete mirror of the JS one, which is why translating JS examples you find online is usually mechanical rather than conceptual — the method names and behavior are almost identical, just wrapped in Python syntax (snake_case instead of camelCase, for instance: get_by_role instead of getByRole).",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Open the Python docs intro page and skim the first code sample; note sync_playwright.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can fill a Selenium / Cypress / Playwright comparison from memory",
        "I know Python mirrors JS APIs in snake_case",
        "I’m ready to set up a venv next"
      ],
      "practice": {
        "title": "Comparison card",
        "brief": "Draw the comparison table on paper once without looking."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Hands-on entry point: Playwright vs Selenium vs Cypress, then supported browsers and languages — with Python as a near-complete API mirror of JS.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-1-setup",
      "phase": "Part 1 · Foundations",
      "level": "beginner",
      "title": "2. Environment Setup",
      "minutes": 45,
      "overview": "venv hygiene, install pytest-playwright + browser binaries, and a starter folder structure that won’t fight you when POM arrives.",
      "learn": [
        "Always use a virtual environment",
        "pip install vs playwright install",
        "Starter project layout"
      ],
      "steps": [
        {
          "title": "Python, pip, and virtual environments",
          "body": "Assuming Python is installed, the critical habit here is virtual environments (venv). Every project should get its own isolated environment.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "python -m venv venv\nsource venv/bin/activate      # Mac/Linux\nvenv\\Scripts\\activate         # Windows",
          "codeTitle": "Create and activate a venv",
          "items": null,
          "callout": {
            "label": "Why bother",
            "body": "Different projects need different Playwright/pytest versions. Global installs become painful version conflicts. Get the habit now.",
            "tone": "tip"
          },
          "aside": null
        },
        {
          "title": "Installing Playwright + browser binaries",
          "body": "Two separate steps that beginners often miss the distinction between.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Install the Python package and browser binaries",
            "code": "pip install pytest-playwright\nplaywright install",
            "result": "pytest-playwright is importable; Chromium/Firefox/WebKit binaries land in Playwright’s cache."
          },
          "doThis": null,
          "tip": "Playwright ships its own browsers on purpose — same version on every laptop and CI machine.",
          "code": null,
          "codeTitle": "Package, then browsers",
          "items": null,
          "callout": {
            "label": "Two steps",
            "body": "pip installs the API. playwright install downloads pinned browser builds. Skip the second step and tests fail immediately — browsers not found.",
            "tone": "warn"
          },
          "aside": null
        },
        {
          "title": "Project folder structure",
          "body": "Even a simple starting structure pays off later (preview of Chapter 14’s POM and Chapter 29’s scalable architecture). Starting with this loose structure — rather than dumping every test file flat in one folder — means you won’t need a painful reorganization once the suite grows past a handful of tests.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create this folder skeleton in a new repo and commit an empty tests/.gitkeep.",
          "tip": null,
          "code": "project/\n├── tests/\n├── pages/          # page object classes — comes later\n├── conftest.py\n├── pytest.ini\n└── requirements.txt",
          "codeTitle": "Starter layout",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "venv created and activated",
        "pytest-playwright installed",
        "playwright install completed",
        "Folder skeleton committed"
      ],
      "practice": {
        "title": "Day-zero repo",
        "brief": "Push a GitHub repo with requirements.txt pinning pytest-playwright and a README with setup commands."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "venv hygiene, install pytest-playwright + browser binaries, and a starter folder structure that won’t fight you when POM arrives.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-1-arch",
      "phase": "Part 1 · Foundations",
      "level": "beginner",
      "title": "3. Playwright Architecture",
      "minutes": 40,
      "overview": "Browser → BrowserContext → Page is the backbone. Sync vs async APIs, and how CDP/WebSocket gives Playwright its depth.",
      "learn": [
        "Browser / Context / Page hierarchy",
        "Sync API vs Async API",
        "CDP over WebSocket"
      ],
      "steps": [
        {
          "title": "Browser, BrowserContext, Page hierarchy",
          "body": "This is the conceptual backbone of the entire tool — internalize it precisely.\n\nBrowser — one actual browser process (e.g., one Chromium instance). Launching a browser is relatively expensive (time and memory), so you typically launch one per test session, not one per test.\n\nBrowserContext — an isolated session within that browser, roughly equivalent to an incognito window. Each context has its own cookies, local storage, cache, and permissions — completely separate from other contexts in the same browser. Creating a new context is cheap and fast, which is why the recommended pattern is: one browser launch per session, one new context per test (for isolation), and reuse the browser itself.\n\nPage — one tab within a context. A context can have multiple pages open simultaneously (this is how multi-tab testing in Chapter 9 works).\n\nWhy this hierarchy matters: Playwright can cheaply simulate multiple independent users without launching multiple full browser processes — you open multiple contexts within one browser. It’s also why test isolation is easy by default: if every test gets a fresh context, cookies/login state from one test can’t leak into another.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Browser — expensive; one per session",
            "BrowserContext — cheap isolation; one per test",
            "Page — a tab inside a context"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Sync API vs Async API",
          "body": "Python Playwright offers two flavors.\n\nSync API — code reads top-to-bottom, no await keywords. This is what pytest-playwright uses by default and what most tutorials (including this one) use, since it’s simpler to read and write, especially if you’re newer to Python.\n\nAsync API — uses async/await, needed if you’re integrating Playwright into an existing asyncio-based application (e.g., an async web scraper or an async FastAPI service). For pure test-automation work, you’ll rarely need this — but it’s worth knowing it exists so you’re not confused when you see async def in some code examples online.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Default for this manual",
            "body": "Sync API + pytest-playwright. Ignore async samples unless you’re integrating into asyncio.",
            "tone": "scope"
          },
          "aside": null
        },
        {
          "title": "How Playwright talks to browsers (CDP, WebSocket)",
          "body": "Playwright launches a browser process and connects to it over the Chrome DevTools Protocol (CDP) via a WebSocket connection. CDP is the same protocol Chrome’s own DevTools panel uses internally — meaning Playwright has access to genuinely deep browser internals (network events, DOM state, console messages, performance data), not just “click here, type there” surface-level commands. This direct, persistent WebSocket connection (versus Selenium’s request-response HTTP calls to a separate WebDriver server) is the concrete technical reason Playwright is both faster and capable of things Selenium structurally can’t do, like real-time network interception.\n\nFor Firefox and WebKit, Playwright uses patched versions of those browsers with equivalent protocol support built in, since neither natively speaks CDP — another reason Playwright ships its own browser binaries rather than using your system browsers.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": "This is the “why it’s faster” answer"
        }
      ],
      "checklist": [
        "I can draw Browser → Context → Page",
        "I know sync is the default for pytest-playwright",
        "I can explain CDP/WebSocket vs WebDriver HTTP"
      ],
      "practice": {
        "title": "Hierarchy sketch",
        "brief": "Sketch the hierarchy and annotate where cookies live (hint: context)."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Browser → BrowserContext → Page is the backbone. Sync vs async APIs, and how CDP/WebSocket gives Playwright its depth.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-1-first",
      "phase": "Part 1 · Foundations",
      "level": "beginner",
      "title": "4. First Script",
      "minutes": 45,
      "overview": "Launch headed/headless, open a page, navigate, locate, click/fill, assert — the smallest complete Playwright loop in Python.",
      "learn": [
        "sync_playwright launch options",
        "goto, locators, actions",
        "A minimal assert you can trust"
      ],
      "steps": [
        {
          "title": "Launching a browser (headless vs headed)",
          "body": "headless=True (the default) runs with no visible window — faster and what CI environments require. headless=False opens an actual visible browser window — invaluable while you’re first writing a test and want to watch what’s happening. A common workflow: write and debug with headless=False, then flip to True (or just remove the argument) once the test is stable and you’re ready to commit it.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run this script once headed and watch the window open.",
          "tip": null,
          "code": "from playwright.sync_api import sync_playwright\n\nwith sync_playwright() as p:\n    browser = p.chromium.launch(headless=False)  # headed — visible window\n    page = browser.new_page()\n    page.goto(\"https://example.com\")\n    print(page.title())\n    browser.close()",
          "codeTitle": "Headed Chromium launch",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Navigate, locate, act",
          "body": "page.goto opens a URL and waits for a load state. Locators find elements the way users perceive them — prefer get_by_role and get_by_text over brittle CSS when you can. Actions like click and fill auto-wait for actionability.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": "If a locator is ambiguous, Playwright fails loudly — tighten the name/role instead of adding sleeps.",
          "code": "page.get_by_role(\"link\", name=\"More information\").click()\n# or on a form-like page:\n# page.get_by_label(\"Email\").fill(\"you@example.com\")\n# page.get_by_role(\"button\", name=\"Submit\").click()",
          "codeTitle": "Locate and fill",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Assert something true",
          "body": "A script that only clicks isn’t a test. Assert on URL, title, or visible text so failures mean something. In pytest you’ll use expect() from playwright.sync_api — Part 2 covers that in depth.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "assert \"Example\" in page.title()",
          "codeTitle": "Simple title assert (script style)",
          "items": null,
          "callout": {
            "label": "Next up",
            "body": "After the foundations checkpoint, Part 2 rebuilds this loop with proper locators, expect(), and auto-waiting mental models.",
            "tone": "note"
          },
          "aside": null
        }
      ],
      "checklist": [
        "I ran a headed script successfully",
        "I used at least one get_by_role locator",
        "I asserted on title or URL"
      ],
      "practice": {
        "title": "First green run",
        "brief": "Commit first_script.py that prints the title of example.com and asserts a substring."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Launch headed/headless, open a page, navigate, locate, click/fill, assert — the smallest complete Playwright loop in Python.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-cp-foundations",
      "phase": "Part 1 · Foundations",
      "kind": "checkpoint",
      "level": "beginner",
      "title": "Checkpoint · Foundations",
      "minutes": 25,
      "overview": "Gate before Part 2: origin story, setup, hierarchy, and a working first script. Don’t skip — later chapters assume this floor.",
      "learn": [
        "Explain Playwright in interview terms",
        "Reproduce setup from memory",
        "Draw the architecture"
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "You are ready for Part 2 when you can do all of the following without notes.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Explain Puppeteer lineage + three creation gaps in under two minutes",
            "Create a venv, install pytest-playwright, run playwright install",
            "Draw Browser → BrowserContext → Page and say where cookies live",
            "Run a headed script that goto’s a URL and asserts the title"
          ],
          "callout": {
            "label": "Honest gate",
            "body": "If any bullet fails, re-read that chapter. Locators will feel arbitrary without this floor.",
            "tone": "warn"
          },
          "aside": null
        },
        {
          "title": "Self-check quiz",
          "body": "Use this as a cold check before you open Part 2.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": {
            "question": "Where should per-test cookies/login state live?",
            "options": [
              "Browser process",
              "BrowserContext",
              "The OS user profile",
              "pytest.ini"
            ],
            "answer": 1,
            "explain": "Contexts isolate storage; pages are tabs inside a context."
          },
          "tryIt": null,
          "doThis": "Close the docs. Reinstall in a fresh folder from memory. Time yourself.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All pass criteria checked",
        "First script committed",
        "LEARNING.md updated with Part 0–1 notes"
      ],
      "practice": {
        "title": "Foundations sign-off",
        "brief": "Paste your pass-criteria checklist into LEARNING.md with today’s date."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Gate before Part 2: origin story, setup, hierarchy, and a working first script. Don’t skip — later chapters assume this floor.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-2-locators",
      "phase": "Part 2 · Core Interactions",
      "level": "beginner",
      "title": "5. Locators Deep Dive",
      "minutes": 60,
      "overview": "The most important chapter in the manual. Prefer user-facing locators (role, label, text) over brittle CSS/XPath so tests survive markup refactors.",
      "learn": [
        "User-facing locator philosophy",
        "get_by_role / text / label / placeholder",
        "CSS/XPath as escapes",
        "Chaining, filtering, strictness"
      ],
      "steps": [
        {
          "title": "Why locators are the whole game",
          "body": "This is the most important chapter in the entire manual — nearly everything else builds on writing good locators.\n\nThese are “user-facing” locators — they find elements the way a real user (or screen reader) would identify them, rather than by internal implementation details like CSS classes. This is deliberate philosophy, not just convenience: implementation details (class names, DOM structure) change often as developers refactor CSS/markup, but the role and visible text of a button rarely change. Locators built on them break far less often.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/locators",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Preferred Playwright locator style is…",
            "options": [
              "Deep XPath only",
              "User-facing get_by_role / label / text",
              "Random CSS hashes",
              "Sleep then click coords"
            ],
            "answer": 1,
            "explain": "User-facing locators track how users and assistive tech see the page."
          },
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Default habit",
            "body": "Reach for get_by_role first. Fall back to label/placeholder/text. Use CSS/XPath only when the page gives you no accessible hook.",
            "tone": "tip"
          },
          "aside": "Everything else builds on this"
        },
        {
          "title": "get_by_role — ARIA role + accessible name",
          "body": "Finds an element by its ARIA role and optionally its accessible name. Best-practice default — matches how screen readers see the page, so it doubles as a light accessibility check.\n\nCommon roles: button, link, checkbox, textbox, heading, listitem, row. Optional name can be a string or regex (e.g. re.compile(\"Delete.*\")). Use exact=True when substring matching is too loose. For headings, level=1..6 narrows to a specific level. For checkboxes/radios, checked=True/False filters by state.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/locators",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": "If get_by_role fails, the app may be missing accessible names — that’s a product bug worth filing, not just a test problem.",
          "code": "page.get_by_role(\"button\", name=\"Submit\").click()\npage.get_by_role(\"link\", name=\"Home\").click()\npage.get_by_role(\"checkbox\", name=\"Remember me\").check()\npage.get_by_role(\"heading\", name=\"Dashboard\", level=1)",
          "codeTitle": "Role locators",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "get_by_text, get_by_label, get_by_placeholder",
          "body": "get_by_text finds an element containing specific visible text. Good for non-interactive content checks (confirmation messages). Can be ambiguous when text repeats — combine with .filter() or a parent scope.\n\nget_by_label finds a form input by its associated <label> text. Requires proper label markup; if the app skips labels, this won’t work and you’ll need placeholder or CSS.\n\nget_by_placeholder finds an input by its placeholder attribute. Handy when labels are missing, but placeholders are weaker a11y signals than real labels.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/locators",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "page.get_by_text(\"Welcome back\").is_visible()\npage.get_by_label(\"Email address\").fill(\"user@example.com\")\npage.get_by_placeholder(\"Search products...\").fill(\"laptop\")",
          "codeTitle": "Text, label, placeholder",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "CSS, XPath, chaining, and strictness",
          "body": "CSS and XPath still work via page.locator(...) when you must target implementation details — treat them as escapes, not defaults.\n\nChaining and filtering let you narrow: locate a section, then a button inside it. Playwright locators are strict by default when an action would hit multiple elements — that’s a feature. Tighten the locator instead of grabbing .first unless you truly mean “any of these.”\n\nLocators auto-retry until timeout while waiting for the element to become actionable — which is why good locators plus auto-waiting beat sleep-based scripts.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/locators",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Rewrite one CSS-heavy locator in a practice site to get_by_role + name.",
          "tip": null,
          "code": "form = page.get_by_role(\"form\", name=\"Login\")\nform.get_by_label(\"Password\").fill(\"secret\")\nform.get_by_role(\"button\", name=\"Sign in\").click()",
          "codeTitle": "Scope a locator",
          "items": null,
          "callout": {
            "label": "Strict mode",
            "body": "Ambiguous locators fail loudly. Don’t silence that with .first — fix the selector.",
            "tone": "warn"
          },
          "aside": null
        }
      ],
      "checklist": [
        "I default to get_by_role",
        "I can explain when label vs placeholder is appropriate",
        "I treat strict-mode failures as locator bugs"
      ],
      "practice": {
        "title": "Locator drill",
        "brief": "On a public demo site, automate login or search using only user-facing locators — no CSS classes."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Locators",
          "url": "https://playwright.dev/python/docs/locators",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "The most important chapter in the manual. Prefer user-facing locators (role, label, text) over brittle CSS/XPath so tests survive markup refactors.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-2-actions",
      "phase": "Part 2 · Core Interactions",
      "level": "beginner",
      "title": "6. Actions",
      "minutes": 45,
      "overview": "Click, fill, check, select, hover, keyboard — every action auto-waits for actionability before running.",
      "learn": [
        "click / fill / type differences",
        "check, select_option, hover",
        "keyboard and modifier chords"
      ],
      "steps": [
        {
          "title": "Clicks and fills",
          "body": "click() waits until the target is actionable, then clicks the center (or a position you specify). Prefer role/name locators so you’re clicking what the user sees.\n\nfill() clears the field and sets the value in one shot — usually what you want for forms. type() / press_sequentially() send keystrokes and are better when the app listens to individual input events.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/input",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "page.get_by_role(\"button\", name=\"Submit\").click()\npage.get_by_label(\"Email\").fill(\"you@example.com\")",
          "codeTitle": "Click and fill",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Checks, selects, hover, keyboard",
          "body": "check() / uncheck() are for checkboxes and radios. select_option() works with <select> by value, label, or index. hover() is useful before menus that only appear on mouseover.\n\nkeyboard.press and locator.press cover shortcuts (Control+A, Enter). Prefer locator-targeted presses when focus matters.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/input",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Automate a small form: fill, select, check, submit — all user-facing locators.",
          "tip": "If click flakes because something overlays the button, fix the wait for that overlay — don’t add time.sleep.",
          "code": "page.get_by_label(\"Remember me\").check()\npage.get_by_label(\"Country\").select_option(label=\"Nepal\")\npage.get_by_role(\"button\", name=\"Account\").hover()\npage.get_by_placeholder(\"Search\").press(\"Enter\")",
          "codeTitle": "Common actions",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I know fill vs press_sequentially",
        "I can select_option by label",
        "I didn’t introduce a sleep to make a click pass"
      ],
      "practice": {
        "title": "Form actions",
        "brief": "Write one test that fills a multi-field form and asserts the success message."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Actions",
          "url": "https://playwright.dev/python/docs/input",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Click, fill, check, select, hover, keyboard — every action auto-waits for actionability before running.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-2-expect",
      "phase": "Part 2 · Core Interactions",
      "level": "beginner",
      "title": "7. Assertions with expect()",
      "minutes": 40,
      "overview": "Playwright expect() auto-retries assertions until they pass or time out — pair it with locators instead of instant assert.",
      "learn": [
        "expect(locator).to_be_visible()",
        "Text, URL, and attribute asserts",
        "Why expect beats bare assert"
      ],
      "steps": [
        {
          "title": "Retrying assertions",
          "body": "A bare assert page.title() == \"…\" fails immediately if the title hasn’t updated yet. expect() from playwright.sync_api keeps polling until the condition is true or the timeout expires — the same philosophy as auto-waiting for actions.\n\nUse expect on locators for visibility, text content, CSS, and attributes. Use expect(page) for URL and title.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/test-assertions",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "from playwright.sync_api import expect\n\nexpect(page.get_by_role(\"heading\", name=\"Dashboard\")).to_be_visible()\nexpect(page.get_by_text(\"Saved\")).to_be_visible()\nexpect(page).to_have_url(\"**/dashboard\")\nexpect(page).to_have_title(\"Dashboard\")",
          "codeTitle": "expect patterns",
          "items": null,
          "callout": {
            "label": "Habit",
            "body": "If you wrote assert + sleep, rewrite it as expect(...). The sleep is almost always unnecessary.",
            "tone": "tip"
          },
          "aside": null
        },
        {
          "title": "Useful matchers",
          "body": "to_be_visible / to_be_hidden, to_have_text / to_contain_text, to_have_value, to_be_checked, to_have_attribute, to_have_count for lists. Soft assertions exist in some runners; with pytest you’ll usually fail fast on the first expect timeout — that’s fine for learning.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/test-assertions",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Replace three raw asserts in your practice repo with expect().",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I import expect from playwright.sync_api",
        "I assert visibility/text with expect, not sleep",
        "I can assert URL with expect(page)"
      ],
      "practice": {
        "title": "Expect rewrite",
        "brief": "Take yesterday’s script and convert every success check to expect()."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Assertions",
          "url": "https://playwright.dev/python/docs/test-assertions",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Playwright expect() auto-retries assertions until they pass or time out — pair it with locators instead of instant assert.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-2-waits",
      "phase": "Part 2 · Core Interactions",
      "level": "beginner",
      "title": "8. Waits & Auto-waiting",
      "minutes": 40,
      "overview": "Actionability checklist, explicit waits for spinner/load states, and why time.sleep is a lose-lose.",
      "learn": [
        "Actionability conditions",
        "wait_for_selector / wait_for_load_state",
        "Never sleep “just in case”"
      ],
      "steps": [
        {
          "title": "The actionability checklist",
          "body": "Before performing most actions, Playwright runs through an actionability checklist on the target element:\n\n1. Attached — is it in the DOM at all?\n2. Visible — non-zero size, not display:none / visibility:hidden?\n3. Stable — stopped moving/animating (checked across at least two animation frames)?\n4. Enabled — not disabled?\n5. Receives events — not covered by another element (e.g., a loading spinner overlay)?\n\nPlaywright re-checks this list repeatedly until all conditions pass or the timeout is hit. This is exactly why you rarely need manual waits.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/actionability",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": {
            "label": "Gate concept",
            "body": "If one idea must be rock-solid before leaving Part 2, it’s this checklist.",
            "tone": "note"
          },
          "aside": null
        },
        {
          "title": "Explicit waits when you need them",
          "body": "Use state-based waits for cases auto-waiting doesn’t cover directly — e.g., waiting for a spinner to hit “hidden” before checking results underneath.\n\nwait_for_load_state covers load, domcontentloaded, and networkidle (no network for ~500ms). networkidle is handy after actions that trigger background calls with no specific element to target — but avoid it on pages with continuous polling (dashboards), since it’ll never go idle and will time out.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/api/class-page",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "page.wait_for_selector(\".spinner\", state=\"hidden\")\npage.wait_for_selector(\".results\", state=\"visible\")\npage.wait_for_load_state(\"domcontentloaded\")",
          "codeTitle": "State waits",
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Avoid time.sleep",
          "body": "A hard sleep() is a lose-lose: too short and the test is flaky; too long and every run wastes time even when the app responded instantly. Auto-waiting solves both problems simultaneously. The only legitimate reasons to add explicit waits are the state-based cases above — never as a blanket “just in case” habit.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/actionability",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "grep your practice repo for sleep( and delete or replace each hit.",
          "tip": null,
          "code": "# Avoid:\n# time.sleep(3)\n# page.click(\".submit-button\")\n\n# Prefer:\npage.get_by_role(\"button\", name=\"Submit\").click()  # auto-waits already",
          "codeTitle": "Prefer auto-wait",
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can recite the five actionability checks",
        "I know when networkidle is dangerous",
        "Zero unjustified sleeps in my practice code"
      ],
      "practice": {
        "title": "Spinner wait",
        "brief": "Write a flow that waits for a loading indicator to hide, then expects results — no sleep."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Actionability",
          "url": "https://playwright.dev/python/docs/actionability",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Actionability checklist, explicit waits for spinner/load states, and why time.sleep is a lose-lose.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-2-tabs",
      "phase": "Part 2 · Core Interactions",
      "level": "intermediate",
      "title": "9. Tabs, Windows, iFrames",
      "minutes": 40,
      "overview": "with page.context.expect_page() as new_page_info: page.get_by_role(\"link\", name=\"Open in new tab\").click() new_page = new_page_info.value new_page.wait_for_load_state() print(new_page.title()) The with ... expect_page() pattern registers the listener for the new page event before the click happens, avoiding a race condition where the new tab opens before you started listening for it.",
      "learn": [
        "with page.context.expect_page() as new_page_info: page.get_by_role(\"link\", name=",
        "expect_page() pattern registers the listener for the new page event before the c",
        "page.context."
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "new_page = new_page_info.value\n\nThe with ... expect_page() pattern registers the listener for the new page event before the click happens, avoiding a race condition where the new tab opens before you started listening for it.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "with page.context.expect_page() as new_page_info:",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "with page.context.expect_page() as new_page_info:\n\npage.get_by_role(\"link\", name=\"Open in new tab\").click()\n\nnew_page.wait_for_load_state()\n\nprint(new_page.title())",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "page.context.expect_page()",
          "body": "What it does: Context manager that captures a reference to a newly opened tab/page.\n\nTypes/params:\n\nPointers: Must wrap the action that triggers the new tab — registering after the click risks missing the event.\n\nOnce you have references to multiple pages, you simply call actions on whichever page object represents the tab you want — there's no \"switch to window\" concept like Selenium's\n\ntimes.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "page.context.expect_page()",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "original_page.bring_to_front()   # optional — brings a page to the foreground visually",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "original_page.bring_to_front()   # optional — brings a page to the foreground visually\n\nnew_page.get_by_role(\"button\", name=\"Confirm\").click()\n\ndriver.switch_to.window(), since each Page object is independently addressable at all",
          "codeTitle": null,
          "items": [
            "Used as a context manager: with page.context.expect_page() as info:",
            "info.value (accessed after the block) → the new Page object"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "page.bring_to_front()",
          "body": "What it does: Brings a specific page/tab to the visual foreground.\n\nTypes/params: No parameters.\n\nPointers: Mostly cosmetic for headed debugging — not required to interact with a background tab programmatically.\n\nframe = page.frame_locator(\"#payment-iframe\")\n\nCommon real-world case: third-party payment widgets (Stripe, PayPal) are almost always embedded via iframe for security/PCI-compliance reasons.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "page.bring_to_front()",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "frame.get_by_label(\"Card number\").fill(\"4242 4242 4242 4242\")",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "frame.get_by_label(\"Card number\").fill(\"4242 4242 4242 4242\")\n\nframe.get_by_role(\"button\", name=\"Pay\").click()",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "page.frame_locator(selector)",
          "body": "What it does: Returns a locator scoped inside a specific iframe.\n\nTypes/params:\n\ncontents)\n\nPointers: Required any time content lives inside an <iframe>. Chain for nested iframes: .frame_locator(\"#outer\").frame_locator(\"#inner\").",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "page.frame_locator(selector)",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I practiced: page.context.expect_page()",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "9. Tabs, Windows, iFrames deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "with page.context.expect_page() as new_page_info: page.get_by_role(\"link\", name=\"Open in new tab\").click() new_page = new_page_info.value new_page.wait_for_load_state() print(new_page.title()) The with ... expect_page() pattern registers the listener for the new page event before the click happens, avoiding a race condition where the new tab opens before you started listening for it.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-2-files",
      "phase": "Part 2 · Core Interactions",
      "level": "intermediate",
      "title": "10. File Uploads & Downloads",
      "minutes": 35,
      "overview": "# Single file page.get_by_label(\"Upload resume\").set_input_files(\"resume.pdf\") # Multiple files page.get_by_label(\"Attach files\").set_input_files([\"file1.png\", \"file2.png\"]) # Clear a selected file page.get_by_label(\"Upload resume\").set_input_files([]) This directly sets file(s) on an <input type=\"file\"> element without touching the OS-level native file picker dialog at all. .set_input_files(paths",
      "learn": [
        "# Single file page.get_by_label(\"Upload resume\").set_input_files(\"resume.pdf\") #",
        ".set_input_files(paths"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "This directly sets file(s) on an <input type=\"file\"> element without touching the OS-level native file picker dialog at all.\n\n.set_input_files(paths)\n\nWhat it does: Sets file(s) on a file input element directly, bypassing the native OS file picker dialog.\n\nTypes/params:\n\nPointers: Works even on hidden file inputs (a styled \"Upload\" button triggering a hidden <input type=\"file\">) — no OS-level automation needed.\n\ndownload = download_info.value\n\nAs with new-tab handling, the with ... expect_download() pattern registers the listener before the triggering click.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "# Single file",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "# Single file\n\npage.get_by_label(\"Upload resume\").set_input_files(\"resume.pdf\")\n\n# Multiple files\n\npage.get_by_label(\"Attach files\").set_input_files([\"file1.png\", \"file2.png\"])\n\n# Clear a selected file\n\npage.get_by_label(\"Upload resume\").set_input_files([])\n\nwith page.expect_download() as download_info:\n\npage.get_by_role(\"button\", name=\"Download report\").click()\n\nprint(download.suggested_filename)\n\ndownload.save_as(\"/path/to/save/report.pdf\")",
          "codeTitle": null,
          "items": [
            "paths — one of:",
            "A single string path → uploads one file",
            "A list of string paths → uploads multiple files (if the input supports multiple)",
            "An empty list [] → clears the current selection"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "page.expect_download()",
          "body": "What it does: Context manager that captures a triggered file download.\n\nTypes/params:\n\nPointers: Must wrap the triggering click, same race-condition reasoning as expect_page().\n\nWhat it does: Saves the downloaded file to a chosen path / exposes the browser's suggested filename.\n\nTypes/params:\n\nPointers: Check suggested_filename to assert naming logic; save and inspect contents when you need to verify actual file data, not just that a download happened.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "page.expect_download()",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "download.save_as(path) / download.suggested_filename",
          "codeTitle": null,
          "items": [
            "Used as a context manager: with page.expect_download() as info:",
            "info.value (after the block) → the Download object",
            ".save_as(path) → path (string, required) — destination file path on disk",
            ".suggested_filename → no params, read-only string property"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I practiced: page.expect_download()",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "10. File Uploads & Downloads deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "# Single file page.get_by_label(\"Upload resume\").set_input_files(\"resume.pdf\") # Multiple files page.get_by_label(\"Attach files\").set_input_files([\"file1.png\", \"file2.png\"]) # Clear a selected file page.get_by_label(\"Upload resume\").set_input_files([]) This directly sets file(s) on an <input type=\"file\"> element without touching the OS-level native file picker dialog at all. .set_input_files(paths",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-2-dialogs",
      "phase": "Part 2 · Core Interactions",
      "level": "intermediate",
      "title": "11. Alerts, Dialogs, Popups",
      "minutes": 35,
      "overview": "page.on(\"dialog\", lambda dialog: dialog.accept()) page.get_by_role(\"button\", name=\"Delete account\").click() # triggers confirm() Native browser dialogs (alert(), confirm(), prompt()) block all further JavaScript execution until dismissed. You must register a handler before triggering the action that opens the dialog — if you forget, the dialog blocks the page indefinitely and your test times out w",
      "learn": [
        "page.on(\"dialog\", lambda dialog: dialog.accept()) page.get_by_role(\"button\", nam",
        "You must register a handler before triggering the action that opens the dialog —"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "Native browser dialogs (alert(), confirm(), prompt()) block all further JavaScript execution until dismissed. You must register a handler before triggering the action that opens the dialog — if you forget, the dialog blocks the page indefinitely and your test times out waiting.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "page.on(\"dialog\", lambda dialog: dialog.accept())",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "page.on(\"dialog\", lambda dialog: dialog.accept())\n\npage.get_by_role(\"button\", name=\"Delete account\").click()  # triggers confirm()",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "page.on(\"dialog\", handler)",
          "body": "What it does: Registers a persistent listener that fires whenever a native browser dialog appears.\n\nTypes/params:\n\nPointers: Must be registered before the triggering action, or the dialog blocks the page and the test times out.\n\n# For prompt() dialogs — accept with a specific input value",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "page.on(\"dialog\", handler)",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "page.on(\"dialog\", lambda dialog: dialog.accept(\"my input text\"))",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "page.on(\"dialog\", lambda dialog: dialog.accept(\"my input text\"))\n\n# Reading the dialog's message before deciding\n\ndef handle_dialog(dialog):\n\nprint(dialog.message)   # e.g., \"Are you sure you want to delete this?\"\n\ndialog.accept()\n\n# Accept (click OK)\n\npage.on(\"dialog\", lambda dialog: dialog.accept())\n\n# Dismiss (click Cancel)\n\npage.on(\"dialog\", lambda dialog: dialog.dismiss())",
          "codeTitle": null,
          "items": [
            "\"dialog\" (string, required) — the event name being listened for",
            "handler (function, required) — receives the dialog object as its argument"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "page.on(\"dialog\", handle_dialog)",
          "body": "one action — if you only want to handle a single occurrence, use page.once(\"dialog\", ...) instead.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "page.on(\"dialog\", handle_dialog)",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "page.on(\"dialog\", ...) registers a persistent listener for the whole page session, not just",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "page.once(\"dialog\", handler)",
          "body": "What it does: Same as .on(), but auto-unregisters after firing once.\n\nTypes/params: Same as .on() above.\n\nPointers: Use when you expect/want to handle only a single dialog occurrence rather than every dialog for the rest of the session.\n\nWhat it does: Accepts (clicks OK) or dismisses (clicks Cancel) the dialog.\n\nTypes/params:\n\nPointers: Exactly one of accept/dismiss must be called per dialog, or the page stays blocked indefinitely.\n\ndialog.message\n\nWhat it does: Read-only property exposing the dialog's displayed text.\n\nTypes/params: No parameters — read-only string property.\n\nPointers: Useful to log or branch logic on (e.g., accept only if the confirm text matches expected, otherwise fail intentionally).\n\nClaude ﬁnished the response Reorganized documentation structure with granular parameter breakdowns Reorganized documentation structure with granular parameter breakdowns",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "page.once(\"dialog\", handler)",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "dialog.accept(prompt_text=None) / dialog.dismiss()",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "dialog.accept(prompt_text=None) / dialog.dismiss()\n\nprompt() dialogs, supplies the \"typed\" input value",
          "codeTitle": null,
          "items": [
            ".accept(prompt_text) → prompt_text (string, optional) — only meaningful for",
            ".dismiss() → no parameters"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I practiced: page.on(\"dialog\", handler)",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "11. Alerts, Dialogs, Popups deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "page.on(\"dialog\", lambda dialog: dialog.accept()) page.get_by_role(\"button\", name=\"Delete account\").click() # triggers confirm() Native browser dialogs (alert(), confirm(), prompt()) block all further JavaScript execution until dismissed. You must register a handler before triggering the action that opens the dialog — if you forget, the dialog blocks the page indefinitely and your test times out w",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-cp-core",
      "phase": "Part 2 · Core Interactions",
      "kind": "checkpoint",
      "level": "beginner",
      "title": "Checkpoint · Core Interactions",
      "minutes": 25,
      "overview": "Gate before frameworks: locators, actions, expect, and auto-waiting without sleeps.",
      "learn": [
        "Locator defaults",
        "expect fluency",
        "No sleep habit"
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "You are ready for Part 3 when you can do all of the following on a practice site.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Automate a multi-step UI flow using only user-facing locators",
            "Assert with expect() on visibility, text, and URL",
            "Explain the actionability checklist without notes",
            "Show a grep proving no time.sleep in your suite"
          ],
          "callout": {
            "label": "Honest gate",
            "body": "POM and pytest fixtures will not save flaky locators. Fix Part 2 before scaling structure.",
            "tone": "warn"
          },
          "aside": null
        },
        {
          "title": "Self-check",
          "body": "Cold quiz before opening Part 3.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": {
            "question": "Auto-waiting checks that an element can receive events. That mainly means…",
            "options": [
              "It has a CSS id",
              "It isn’t covered by another element",
              "The browser is headed",
              "pytest collected the test"
            ],
            "answer": 1,
            "explain": "Overlays/spinners block events even when the element exists in the DOM."
          },
          "tryIt": null,
          "doThis": "Record a 2-minute loom of your green Part 2 flow.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Pass criteria met",
        "Demo recorded or peer-reviewed",
        "LEARNING.md updated for Part 2"
      ],
      "practice": {
        "title": "Core sign-off",
        "brief": "Paste pass criteria into LEARNING.md with links to your practice commits."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Locators",
          "url": "https://playwright.dev/python/docs/locators",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Gate before frameworks: locators, actions, expect, and auto-waiting without sleeps.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-3-pytest",
      "phase": "Part 3 · Test Structure & Framework",
      "level": "intermediate",
      "title": "12. Pytest Basics for Playwright",
      "minutes": 50,
      "overview": "This is where scripts stop being one-off files and start becoming a real test framework. Everything in this chapter is pytest itself — Playwright plugs into it via pytest-playwright, it doesn't replace it.",
      "learn": [
        "This is where scripts stop being one-off files and start becoming a real test fr",
        "Everything in this chapter is pytest itself — Playwright plugs into it via pytes",
        "Fixtures A fixture is a reusable block of setup (and optional teardown) code tha"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "This is where scripts stop being one-off files and start becoming a real test framework. Everything in this chapter is pytest itself — Playwright plugs into it via\n\nFixtures A fixture is a reusable block of setup (and optional teardown) code that a test can request just by naming it as a parameter. Instead of copy-pasting login steps into every test function, you write it once as a fixture and every test that needs a logged-in user just asks for it. python",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "import pytest",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "import pytest\n\n@pytest.fixture\n\ndef logged_in_page(page):\n\npytest-playwright, it doesn't replace it.",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "page.goto(\"https://app.example.com/login\")",
          "body": "# teardown (runs after the test finishes) — anything after yield\n\ntestuser\")).to_be_visible()\n\nWhat it does: Marks a function as a reusable setup/teardown block that tests can request by parameter name. Types/params:\n\nPointers: Code after yield is teardown — it runs after the test completes (pass or fail), making fixtures the right place for cleanup logic (logging out, deleting test data) rather than scattering try/finally blocks through every test. conftest.py and fixture scope conftest.py is a special pytest file — fixtures defined there are automatically available to every test file in the same folder (and subfolders) without any import statement. This is how shared setup (like a logged_in_page fixture used across dozens of test files) gets centralized in one place instead of duplicated or manually imported everywhere. python",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "page.goto(\"https://app.example.com/login\")",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "# conftest.py",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "# conftest.py\n\nimport pytest\n\n@pytest.fixture(scope=\"session\")\n\ndef api_base_url():\n\nreturn \"https://api.example.com\"\n\n@pytest.fixture(scope=\"function\")\n\ndef clean_page(page):\n\npage.get_by_label(\"Username\").fill(\"testuser\")\n\npage.get_by_label(\"Password\").fill(\"testpass\")\n\npage.get_by_role(\"button\", name=\"Log in\").click()\n\nyield page\n\npage.get_by_role(\"button\", name=\"Log out\").click()\n\ndef test_dashboard_shows_welcome_message(logged_in_page):\n\nexpect(logged_in_page.get_by_text(\"Welcome,",
          "codeTitle": null,
          "items": [
            "scope (string, optional, default \"function\")",
            "\"function\" — re-runs for every single test that uses it",
            "\"class\" — runs once per test class",
            "\"module\" — runs once per test file",
            "\"session\" — runs once for the entire test run",
            "autouse (boolean, optional, default False)",
            "True → fixture runs automatically for every applicable test without being explicitly requested",
            "False → must be named as a test parameter to be used",
            "params (list, optional) — turns the fixture into a parametrized fixture; the test using it runs once per value in the list"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "page.goto(\"https://app.example.com\")",
          "body": "Scope choice matters for speed: a session-scoped login fixture (log in once, reuse the saved session for every test — tying into storage_state in Chapter 20) can save enormous amounts of time versus a function-scoped one that logs in fresh before every single test. But scope should match reality — if tests mutate shared state (e.g., one test changes a setting another test depends on being default), a broader scope than function can cause tests to interfere with each other in ways that are painful to debug.\n\nconftest.py (concept, not a function) What it does: A special filename pytest auto-discovers; fixtures defined here are shared across all test files in that directory and below, with no import needed. Types/params: N/A — it's a file location convention, not a callable. Pointers: Put widely-shared fixtures (base URL, login, browser context config) here. Test-file-specific fixtures can stay local to that file instead, to avoid a bloated global conftest.py.\n\nInstalling pytest-playwright automatically gives you a page fixture (and browser, context) ready to use in any test, with no setup code required: python",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "page.goto(\"https://app.example.com\")",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "pytest-playwright plugin basics",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "pytest-playwright plugin basics\n\ndef test_homepage_title(page):\n\nyield page",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "expect(page).to_have_title(\"Example Domain\")",
          "body": "The plugin also adds useful command-line flags: bash\n\nChromium\n\nwatching a test run\n\npage, browser, context (pytest-playwright built-in fixtures) What it does: Automatically provided fixtures giving you a ready-to-use Page/Browser/BrowserContext in any test function, without manual setup. Types/params: N/A — request by naming them as test function parameters, e.g. def\n\nPointers: page is by far the most commonly used — it comes with a fresh BrowserContext per test by default, giving you test isolation automatically (see Part 1, Chapter 3 on the Browser/Context/Page hierarchy).",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "expect(page).to_have_title(\"Example Domain\")",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "pytest --headed              # run visibly instead of headless",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "pytest --headed              # run visibly instead of headless\n\npytest --browser firefox     # run against Firefox instead of default\n\npytest --slowmo 500          # slow down actions by 500ms, helpful for\n\ntest_x(page):.",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I practiced: page.goto(\"https://app.example.com/login\")",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "12. Pytest Basics for Playwright deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "This is where scripts stop being one-off files and start becoming a real test framework. Everything in this chapter is pytest itself — Playwright plugs into it via pytest-playwright, it doesn't replace it.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-3-org",
      "phase": "Part 3 · Test Structure & Framework",
      "level": "intermediate",
      "title": "13. Test Organization",
      "minutes": 40,
      "overview": "Markers Markers tag tests so you can selectively run subsets instead of the entire suite every time. python import pytest @pytest.mark.smoke def test_login_works(): ...",
      "learn": [
        "Overview (2)"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "Markers Markers tag tests so you can selectively run subsets instead of the entire suite every time. python\n\n...\n\n...\n\nbash\n\nCustom markers need to be registered in pytest.ini (Chapter 15) or pytest will emit a warning about unknown markers.\n\nWhat it does: Attaches a tag to a test function, usable later to filter which tests run. Types/params:\n\nPointers: Use consistent, small marker vocabulary across the team (smoke, regression, critical) rather than ad-hoc one-off tags — otherwise -m filtering becomes unreliable. Parametrized tests Instead of writing near-identical test functions for different inputs, parametrize one test function to run multiple times with different data. python\n\n(\"\", \"validpass\", \"Username is required\"),\n\n(\"validuser\", \"\", \"Password is required\"),\n\n(\"validuser\", \"wrongpass\", \"Invalid credentials\"),\n\n])\n\nThis runs as three separate test cases in the report, each clearly showing which input combination passed/failed — far more maintainable than three nearly-identical copy-pasted test functions.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Overview (2)",
          "body": "What it does: Runs the same test function once per set of provided argument values. Types/params:\n\nfunction will receive, e.g. \"username,password,expected_error\"\n\nPointers: Each parameter set shows up as a distinct test in reports (e.g., test_login_validation[validuser-wrongpass-Invalid credentials]), making failures easy to pinpoint to a specific data combination. Grouping/tagging tests (smoke, regression) Beyond individual markers, teams typically organize entire folders by test type or feature area:\n\ntests/\n\n├── smoke/\n\n│ └── test_critical_paths.py\n\n├── regression/\n\n│ └── test_edge_cases.py\n\n└── modules/\n\n├── test_leave_management.py\n\n└── test_attendance.py\n\nCombined with markers, this gives two independent ways to slice the suite — by folder (pytest tests/smoke/) or by tag (pytest -m smoke) — useful since a \"smoke\" test might live logically inside a feature folder but still need to run as part of a fast pre-deploy check.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview (2)",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Overview",
          "body": "",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "def test_login_validation(page, username, password, expected_error):\n\npage.get_by_label(\"Username\").fill(username)\n\npage.get_by_label(\"Password\").fill(password)\n\npage.get_by_role(\"button\", name=\"Log in\").click()\n\nexpect(page.get_by_text(expected_error)).to_be_visible()\n\npytest -m smoke        # run only smoke-tagged tests\n\npytest -m \"not regression\"   # run everything except regression tests\n\n@pytest.mark.regression\n\ndef test_edge_case_special_characters_in_username():",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I practiced: Overview (2)",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "13. Test Organization deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Markers Markers tag tests so you can selectively run subsets instead of the entire suite every time. python import pytest @pytest.mark.smoke def test_login_works(): ...",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-3-pom",
      "phase": "Part 3 · Test Structure & Framework",
      "level": "intermediate",
      "title": "14. Page Object Model (POM)",
      "minutes": 55,
      "overview": "Why POM, folder structure Without POM, locators get written directly inside test functions — meaning if the UI changes (a button's text, an ID), you have to hunt down and fix every test that touches that element. POM solves this by centralizing each page's locators and actions into a dedicated class, so a UI change means fixing one class, not dozens of tests.",
      "learn": [
        "Why POM, folder structure Without POM, locators get written directly inside test",
        "POM solves this by centralizing each page's locators and actions into a dedicate",
        "project/ ├── pages/ │ ├── base_page.py"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "Why POM, folder structure Without POM, locators get written directly inside test functions — meaning if the UI changes (a button's text, an ID), you have to hunt down and fix every test that touches that element. POM solves this by centralizing each page's locators and actions into a dedicated class, so a UI change means fixing one class, not dozens of tests.\n\nproject/\n\n├── pages/\n\n│ ├── base_page.py\n\n│ ├── login_page.py\n\n│ └── dashboard_page.py\n\n├── tests/\n\n│ ├── test_login.py\n\n│ └── test_dashboard.py\n\n└── conftest.py Base Page class A BasePage holds behavior common to every page — navigation, generic waits — so individual page classes don't repeat it. python",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "pages/base_page.py",
          "body": "self.page = page\n\nBasePage.__init__(self, page) What it does: Stores a reference to the Playwright page object so every method in the class (and its subclasses) can use it. Types/params:\n\nPointers: Every page class should inherit from this and call",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "pages/base_page.py",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "def navigate(self, path):",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "def navigate(self, path):\n\nself.page.goto(f\"https://app.example.com{path}\")\n\ndef wait_for_load(self):\n\nself.page.wait_for_load_state(\"networkidle\")\n\nsuper().__init__(page) to get this shared setup for free.\n\nclass BasePage:\n\ndef __init__(self, page):",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "pages/login_page.py",
          "body": "self.username_input = page.get_by_label(\"Username\")\n\nself.password_input = page.get_by_label(\"Password\")\n\nself.login_button = page.get_by_role(\"button\", name=\"Log in\")\n\npython\n\nlogin_page = LoginPage(page)\n\nLoginPage.login(self, username, password) (example custom page method — pattern, not a Playwright API) What it does: Encapsulates the full \"log in\" user flow as one method call, hiding the individual locator/action steps from the test itself. Types/params:\n\nPointers: The test file itself should read almost like plain English (login_page.login(...)) — if a test file is full of raw locators and .fill()/.click() calls, that's a signal POM isn't being followed consistently.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "pages/login_page.py",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "def login(self, username, password):",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "def login(self, username, password):\n\nself.navigate(\"/login\")\n\nself.username_input.fill(username)\n\nself.password_input.fill(password)\n\nself.login_button.click()\n\nfrom pages.base_page import BasePage\n\nclass LoginPage(BasePage):\n\ndef __init__(self, page):\n\nsuper().__init__(page)\n\nlogin_page.login(\"testuser\", \"testpass\")\n\nexpect(page.get_by_text(\"Welcome, testuser\")).to_be_visible()",
          "codeTitle": null,
          "items": [
            "username (string, required)",
            "password (string, required)"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I practiced: pages/base_page.py",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "14. Page Object Model (POM) deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Why POM, folder structure Without POM, locators get written directly inside test functions — meaning if the UI changes (a button's text, an ID), you have to hunt down and fix every test that touches that element. POM solves this by centralizing each page's locators and actions into a dedicated class, so a UI change means fixing one class, not dozens of tests.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-3-config",
      "phase": "Part 3 · Test Structure & Framework",
      "level": "intermediate",
      "title": "15. Configuration Management",
      "minutes": 40,
      "overview": "pytest.ini / conftest.py as config equivalent Since Python Playwright has no built-in config file (unlike the JS test runner's playwright.config.ts), pytest.ini fills that role for pytest-level settings, and conftest.py handles anything needing actual code (like environment-based fixture values). ini # pytest.ini [pytest] markers = smoke: quick critical-path tests regression: full regression suite",
      "learn": [
        "ENVIRONMENTS = {"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "Since Python Playwright has no built-in config file (unlike the JS test runner's playwright.config.ts), pytest.ini fills that role for pytest-level settings, and conftest.py handles anything needing actual code (like environment-based fixture values). ini\n\n[pytest]\n\nmarkers =\n\nsmoke: quick critical-path tests\n\nregression: full regression suite\n\naddopts = --headed --browser chromium\n\nWhat it does: Central place for pytest-level settings: registered markers, default command-line options, test discovery rules. Types/params:\n\nPointers: Registering markers here (Chapter 13) is what keeps @pytest.mark.smoke from producing warnings and documents what each marker means for the rest of the team. Environment variables, base URLs python\n\nbash BASE_URL=https://prod.example.com pytest\n\nWhat it does: Reads an environment variable, falling back to a default if it isn't set. Types/params:\n\nPointers: This is the standard pattern for making a test suite environment-aware without hardcoding URLs, so the exact same test code runs against dev, staging, or prod depending on how it's invoked. Managing multiple environments (dev/staging/prod) A common pattern is separate .env-style files or a small config dictionary keyed by environment name: python",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "# conftest.py",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "# conftest.py\n\nimport os\n\nimport pytest\n\n@pytest.fixture(scope=\"session\")\n\ndef base_url():\n\nreturn os.environ.get(\"BASE_URL\", \"https://staging.example.com\")\n\npytest.ini [pytest] section (config file, not a function)\n\npytest.ini / conftest.py as config equivalent",
          "codeTitle": null,
          "items": [
            "markers — list of name: description pairs, required to avoid \"unknown marker\" warnings",
            "addopts — string of default CLI flags applied to every pytest run automatically",
            "key (string, required) — the environment variable name",
            "default (any, optional) — the value to return if the variable isn't set"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "ENVIRONMENTS = {",
          "body": "\"dev\": \"https://dev.example.com\",\n\n\"staging\": \"https://staging.example.com\",\n\n\"prod\": \"https://app.example.com\",\n\n}\n\nenv = os.environ.get(\"TEST_ENV\", \"staging\")\n\nbash TEST_ENV=prod pytest # careful — running full suites against prod is usually restricted to read-only smoke tests Pointer worth flagging: running write-heavy tests (creating/deleting data) against production is a common real-world mistake — most teams restrict prod runs to smoke-tagged, non-destructive tests only, enforced by combining TEST_ENV with markers from Chapter 13.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "ENVIRONMENTS = {",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "@pytest.fixture(scope=\"session\")",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "@pytest.fixture(scope=\"session\")\n\ndef base_url():\n\nreturn ENVIRONMENTS[env]",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I practiced: ENVIRONMENTS = {",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "15. Configuration Management deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "pytest.ini / conftest.py as config equivalent Since Python Playwright has no built-in config file (unlike the JS test runner's playwright.config.ts), pytest.ini fills that role for pytest-level settings, and conftest.py handles anything needing actual code (like environment-based fixture values). ini # pytest.ini [pytest] markers = smoke: quick critical-path tests regression: full regression suite",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-3-data",
      "phase": "Part 3 · Test Structure & Framework",
      "level": "intermediate",
      "title": "16. Test Data Management",
      "minutes": 40,
      "overview": "Static fixtures (JSON/CSV/YAML) For predictable, reusable test data, store it in a file rather than hardcoding it inline across tests. json // test_data/users.json { \"valid_user\": {\"username\": \"testuser\", \"password\": \"testpass\"}, \"invalid_user\": {\"username\": \"baduser\", \"password\": \"wrongpass\"} } python import json @pytest.fixture def user_data(): with open(\"test_data/users.json\") as f: return json",
      "learn": [
        "Overview (2)"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "Static fixtures (JSON/CSV/YAML) For predictable, reusable test data, store it in a file rather than hardcoding it inline across tests. json\n\n// test_data/users.json\n\n{\n\n\"valid_user\": {\"username\": \"testuser\", \"password\": \"testpass\"},\n\n\"invalid_user\": {\"username\": \"baduser\", \"password\": \"wrongpass\"}\n\n} python\n\ncreds = user_data[\"valid_user\"]\n\nWhat it does: Parses a JSON file into a Python dictionary/list. Types/params:\n\nPointers: Keep test data files separate from test logic — this lets non-engineers (or future you) update test data without touching test code, and keeps large data sets from cluttering test files. Using faker for dynamic data For tests needing unique data every run (signup flows that reject duplicate emails, for example), generate realistic fake data on the fly instead of relying on static fixtures. python\n\nfake = Faker()\n\n\"email\": fake.email(),\n\n\"name\": fake.name(),\n\n\"phone\": fake.phone_number(),",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Overview (2)",
          "body": "}\n\nFaker() and its generator methods (.email(), .name(), .phone_number(), etc.) What it does: Instantiates a fake-data generator; each method call produces a realistic random value of that type. Types/params:\n\ntheir name (.email() → string email, .name() → string full name)\n\nPointers: Each call to a generator method returns a new random value — call it once and store the result in a variable if you need the same value used consistently across multiple steps in a test. Data cleanup strategies Tests that create data (a new user, a new leave request) need a plan for removing it afterward, or repeated test runs accumulate junk that can eventually cause unrelated failures (e.g., a \"list should show exactly 3 items\" test failing because 200 leftover test users are also in the list). python\n\nPointers: Cleanup via API (fast, direct) is generally preferable to cleanup via UI (slow, another thing that can flake) — this is a preview of the UI+API combination covered fully in Chapter 18. Using a fixture's yield pattern (Chapter 12) guarantees cleanup runs even if the test itself fails partway through, which a cleanup step placed only at the end of a test function would not guarantee.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview (2)",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Overview",
          "body": "",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "@pytest.fixture\n\ndef created_user(page, random_user):\n\n# setup: create the user via UI or API\n\napi_create_user(random_user)\n\nyield random_user\n\n# teardown: clean up after the test, regardless of pass/fail\n\napi_delete_user(random_user[\"email\"])\n\ndef test_signup(page, random_user):\n\npage.get_by_label(\"Email\").fill(random_user[\"email\"])\n\npage.get_by_label(\"Name\").fill(random_user[\"name\"])\n\nimport json\n\n@pytest.fixture\n\ndef user_data():\n\nwith open(\"test_data/users.json\") as f:\n\nreturn json.load(f)\n\ndef test_login(page, user_data):",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I practiced: Overview (2)",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "16. Test Data Management deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Static fixtures (JSON/CSV/YAML) For predictable, reusable test data, store it in a file rather than hardcoding it inline across tests. json // test_data/users.json { \"valid_user\": {\"username\": \"testuser\", \"password\": \"testpass\"}, \"invalid_user\": {\"username\": \"baduser\", \"password\": \"wrongpass\"} } python import json @pytest.fixture def user_data(): with open(\"test_data/users.json\") as f: return json",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-cp-framework",
      "phase": "Part 3 · Framework",
      "level": "checkpoint",
      "kind": "checkpoint",
      "title": "Checkpoint — Framework",
      "minutes": 45,
      "overview": "Pytest fixtures, markers, POM pages, config, and data-driven tests form a maintainable suite.",
      "learn": [
        "Pytest fixtures, markers, POM pages, config, and data-driven tests form a maintainable suite."
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "Pytest fixtures, markers, POM pages, config, and data-driven tests form a maintainable suite.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Pass criteria",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "A checkpoint is done when…",
            "options": [
              "You bookmarked the docs",
              "You can demo the criteria without notes",
              "You skipped practice",
              "You only watched a video"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Record a 2-minute Loom/demo proving the criteria.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Pytest fixtures, markers, POM pages, config, and data-driven tests form a maintainable suite.",
        "Demo recorded or peer-reviewed"
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Pytest fixtures, markers, POM pages, config, and data-driven tests form a maintainable suite.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-4-network",
      "phase": "Part 4 · Advanced Techniques",
      "level": "advanced",
      "title": "17. Network Interception & Mocking",
      "minutes": 50,
      "overview": "page.route() basics page.route() intercepts network requests matching a URL pattern before they reach the server, letting you inspect, modify, block, or fully replace the response. def handle_route(route): route.continue_() # let it through unchanged page.route(\"**/*.png\", handle_route) page.route(url_pattern, handler) What it does: Registers an interceptor for any request matching a URL pattern.",
      "learn": [
        "Mocking API responses",
        "500 for error-state testing",
        "Blocking resources (images, ads) for speed"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "the server, letting you inspect, modify, block, or fully replace the response.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "page.route() basics",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "page.route() basics\n\npage.route() intercepts network requests matching a URL pattern before they reach\n\ndef handle_route(route):\n    route.continue_()   # let it through unchanged",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "page.route(url_pattern, handler)",
          "body": "What it does: Registers an interceptor for any request matching a URL pattern.\n\nTypes/params:\n\nPointers: Every matched request must be resolved by the handler (continue/fulfill/abort) or the request hangs indefinitely. Register routes before the navigation/action that triggers the request.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "page.route(url_pattern, handler)",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "route.continue_(), route.fulfill(), or route.abort()",
          "codeTitle": null,
          "items": [
            "url_pattern (string or regex, required)",
            "Glob string, e.g. \"**/api/users\", \"**/*.png\" — ** matches any path segment",
            "Regex, e.g. re.compile(r\".*/api/.*\") for more complex matching",
            "handler (function, required) — receives a route object; must call exactly one of"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Mocking API responses",
          "body": "This lets you test UI behavior for scenarios that are hard to trigger naturally — server errors, empty states, slow responses — without needing the actual backend to cooperate.\n\nWhat it does: Responds to the intercepted request with custom data instead of letting it reach the real server.\n\nTypes/params:",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Mocking API responses",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "def mock_users_api(route):\n    route.fulfill(\n        status=200,\n        content_type=\"application/json\",\n        body='{\"users\": [{\"id\": 1, \"name\": \"Test User\"}]}'\n    )",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "def mock_users_api(route):\n    route.fulfill(\n        status=200,\n        content_type=\"application/json\",\n        body='{\"users\": [{\"id\": 1, \"name\": \"Test User\"}]}'\n    )\n\npage.route(\"**/api/users\", mock_users_api)\npage.goto(\"https://app.example.com/users\")\n\nroute.fulfill(status=..., content_type=..., body=...)",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "500 for error-state testing",
          "body": "Pointers: Use json= instead of manually building a body JSON string where possible\n\n— less error-prone. Mocking error statuses (500, 403) is one of the highest-value uses here, since these are notoriously hard to trigger from a real backend on demand.\n\nWhat it does: Lets the request proceed to the real server, optionally with modifications.\n\nTypes/params:\n\nPointers: Use this when you only want to observe or slightly tweak a request (e.g., inject a test header) rather than fully replace the response.\n\nWhat it does: Blocks the request entirely, simulating a network failure.\n\nTypes/params:\n\n\"timedout\", \"connectionrefused\"\n\nPointers: Useful for testing how the UI handles total network failure (not just an error response, but no response at all) — a distinct code path from a mocked 500.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "500 for error-state testing",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "route.abort(error_code=...)",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "route.abort(error_code=...)\n\nroute.continue_(...)",
          "codeTitle": null,
          "items": [
            "content_type (string, optional) — MIME type, e.g. \"application/json\", \"text/html\"",
            "body (string, optional) — the response body content, typically a JSON string for API mocks",
            "json (dict, optional alternative to body) — pass a Python dict directly and Playwright serializes it to JSON automatically",
            "headers (dict, optional) — override or add request headers",
            "method (string, optional) — override the HTTP method",
            "post_data (string, optional) — override the request body",
            "error_code (string, optional, default \"failed\") — e.g. \"failed\","
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Blocking resources (images, ads) for speed",
          "body": "",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Blocking resources (images, ads) for speed",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "def block_images(route):\n    if route.request.resource_type == \"image\":\n        route.abort()\n    else:\n        route.continue_()",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "def block_images(route):\n    if route.request.resource_type == \"image\":\n        route.abort()\n    else:\n        route.continue_()",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "route.request.resource_type",
          "body": "What it does: Read-only property identifying the category of the intercepted request.\n\nTypes/params:\n\n\"xhr\", \"fetch\", \"font\", \"media\"\n\nPointers: Blocking images/fonts/ad-tracker scripts on tests that don't need to visually verify them can meaningfully speed up a large suite — but don't block resources your test actually depends on rendering correctly (defeats visual regression testing in Chapter 19).",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "route.request.resource_type",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I practiced: page.route(url_pattern, handler)",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "17. Network Interception & Mocking deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "page.route() basics page.route() intercepts network requests matching a URL pattern before they reach the server, letting you inspect, modify, block, or fully replace the response. def handle_route(route): route.continue_() # let it through unchanged page.route(\"**/*.png\", handle_route) page.route(url_pattern, handler) What it does: Registers an interceptor for any request matching a URL pattern.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-4-api",
      "phase": "Part 4 · Advanced Techniques",
      "level": "advanced",
      "title": "18. API Testing with Playwright",
      "minutes": 50,
      "overview": "request context (APIRequestContext) Playwright ships a full HTTP client independent of any browser — meaning you can make API calls without opening a page at all, useful both for pure API testing and for fast test-data setup (create data via API instead of clicking through slow UI forms). import pytest from playwright.sync_api import sync_playwright with sync_playwright() as p: request_context = p",
      "learn": [
        "GET/POST/PUT/DELETE calls — full detail",
        "Content-Type: application/json header for you",
        "POST new_user = response.json()",
        "Shared response object reference (response)",
        "Combining UI + API tests"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "request context (APIRequestContext)\n\nPlaywright ships a full HTTP client independent of any browser — meaning you can make API calls without opening a page at all, useful both for pure API testing and for fast test-data setup (create data via API instead of clicking through slow UI forms).\n\nOr via the pytest-playwright plugin's built-in request fixture:\n\nextra_http_headers=...)\n\nWhat it does: Creates an APIRequestContext — an isolated HTTP client session for making API calls.\n\nTypes/params:\n\ncalls, e.g. set once instead of repeating the full domain every call\n\nthis context, commonly used for auth tokens: {\"Authorization\": \"Bearer\n\n<token>\"}\n\ndirectly into Chapter 20)\n\nPointers: Like BrowserContext, an APIRequestContext is isolated — separate contexts don't share cookies/headers, letting you cleanly simulate different authenticated users in the same test file.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "import pytest\nfrom playwright.sync_api import sync_playwright",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "import pytest\nfrom playwright.sync_api import sync_playwright\n\nwith sync_playwright() as p:\n    request_context = p.request.new_context(base_url=\"https://api.example.com\")\n\ndef test_api_example(request):\n    response = request.get(\"/users/1\")\n\nplaywright.request.new_context(base_url=...,",
          "codeTitle": null,
          "items": [
            "base_url (string, optional) — prefix applied to relative URLs in subsequent",
            "extra_http_headers (dict, optional) — headers sent with every request from",
            "storage_state (string or dict, optional) — reuse saved cookies/auth state (ties"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "GET/POST/PUT/DELETE calls — full detail",
          "body": "What it does: Sends an HTTP GET request — used to retrieve data without modifying anything on the server.\n\nTypes/params:\n\n\"limit\": 10} becomes ?page=1&limit=10\n\nresponse = request.get(\"/users\", params={\"page\": 1, \"limit\": 10})\n\ndata = response.json()\n\nPointers: GET requests should be idempotent and side-effect-free by REST convention — a well-behaved API should let you call GET repeatedly with zero risk of changing data.\n\nIf a \"GET\" endpoint you're testing does change server state, that's worth flagging as a design smell, not something to just work around in your test.\n\nWhat it does: Sends an HTTP POST request — used to create a new resource or trigger an action on the server.\n\nTypes/params:",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "GET/POST/PUT/DELETE calls — full detail",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "request.post(url, data=..., json=..., headers=...)",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "request.post(url, data=..., json=..., headers=...)\n\nrequest.get(url, params=..., headers=...)\n\nassert len(data[\"users\"]) <= 10",
          "codeTitle": null,
          "items": [
            "url (string, required) — full URL, or relative path if base_url was set on the context",
            "params (dict, optional) — query string parameters, e.g. {\"page\": 1,",
            "headers (dict, optional) — per-request headers, merged with (or overriding) any context-level extra_http_headers",
            "url (string, required)",
            "data (dict or string, optional) — form-encoded body data",
            "json (dict, optional) — JSON body; Playwright auto-serializes and sets the"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Content-Type: application/json header for you",
          "body": "response = request.post(\"/users\", data={ \"name\": \"Test User\",\n\n\"email\": \"testuser@example.com\"\n\n})",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Content-Type: application/json header for you",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "assert response.status == 201   # 201 Created is the conventional success status for",
          "codeTitle": null,
          "items": [
            "multipart (dict, optional) — for file upload requests via multipart form data",
            "headers (dict, optional)"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "POST new_user = response.json()",
          "body": "Pointers: A successful POST conventionally returns 201 Created (not 200 OK) along with the newly created resource's data (including its generated ID) — worth asserting on that ID since you'll typically need it for cleanup (Chapter 16) or for follow-up requests (e.g., GET that same user to verify persistence). POST is not\n\nidempotent by default — calling it twice with the same data typically creates two separate resources, which matters when writing retry logic around it.\n\nWhat it does: Sends an HTTP PUT request — used to replace an existing resource entirely with the data provided.\n\nTypes/params: Same shape as .post() — url, data/json, headers.\n\nresponse = request.put(f\"/users/{user_id}\", json={ \"name\": \"Updated Name\",\n\n\"email\": \"updated@example.com\"\n\n})\n\nPointers: PUT is conventionally idempotent — sending the exact same PUT request multiple times should leave the resource in the same final state each time (unlike POST). PUT typically expects the full resource representation in the body — if you omit a field the resource currently has, a strictly RESTful API may null it out, since PUT means \"replace,\" not \"merge.\" This is the detail that most often trips people up moving from POST to PUT.\n\nWhat it does: Sends an HTTP PATCH request — used to make a partial update to an existing resource (only the fields provided change; everything else stays as-is).\n\nTypes/params: Same shape as .post()/.put().\n\nresponse = request.patch(f\"/users/{user_id}\", json={\"email\": \"newemail@example.com\"})\n\nPointers: Worth knowing alongside PUT even though it wasn't explicitly listed in your TOC, since real-world APIs frequently offer PATCH specifically to avoid PUT's \"must send the whole object\" requirement — and mixing the two up in tests is a common source of confusing failures (a PATCH-shaped body sent to a PUT endpoint wiping out fields you didn't intend to touch).\n\nWhat it does: Sends an HTTP DELETE request — used to remove a resource from the server.\n\nTypes/params:\n\nallows one)\n\nresponse = request.delete(f\"/users/{user_id}\")\n\ndeletes\n\nfollow_up = request.get(f\"/users/{user_id}\")\n\nPointers: A successful DELETE commonly returns 204 No Content (success, but no\n\nbody to return) rather than 200 — check your specific API's convention rather than assuming. DELETE is conventionally idempotent too — deleting an already-deleted resource should ideally return a 404 (not found) rather than erroring in a confusing way, and that's worth testing as its own case, not just the \"happy path\" single delete.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "POST new_user = response.json()",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "assert response.status == 200",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "assert response.status == 200\n\n# Other fields like \"name\" remain untouched, unlike a PUT with the same partial body\n\nassert response.status in (200, 204)   # 204 No Content is common for successful\n\nrequest.patch(url, data=..., json=..., headers=...)",
          "codeTitle": null,
          "items": [
            "url (string, required)",
            "headers (dict, optional)",
            "(DELETE requests typically don't carry a body, though the method technically"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Shared response object reference (response)",
          "body": "Every call above (.get(), .post(), .put(), .patch(), .delete()) returns an\n\nAPIResponse object with the same interface:\n\nWhat it does: Exposes the numeric HTTP status code, and a boolean shortcut for \"was it successful.\"\n\nTypes/params:\n\nPointers: .ok is a convenient quick check, but explicit status code assertions (assert\n\nexpected behavior rather than just \"some success code.\"\n\nWhat it does: Parses the response body as JSON and returns it as a Python dict/list.\n\nTypes/params: No parameters.\n\nPointers: Will raise an error if the response body isn't valid JSON (e.g., an HTML error page returned instead) — worth wrapping in a try/except or checking content_type first if you're testing error scenarios where the response shape might vary.\n\nWhat it does: .text() returns the raw response body as a string; .headers exposes response headers as a dict.\n\nTypes/params: No parameters for .text(); .headers is a plain dict-like property.\n\nPointers: Use .text() for non-JSON responses (HTML, plain text errors); check\n\n.headers when testing things like caching behavior, rate-limit headers, or content-type correctness.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Shared response object reference (response)",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "response.status == 201) are usually better in tests since they pin down the exact",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "response.status == 201) are usually better in tests since they pin down the exact\n\nresponse.text() / response.headers\n\nresponse.status / response.ok",
          "codeTitle": null,
          "items": [
            ".status → integer, e.g. 200, 404, 500",
            ".ok → boolean, True for status codes in the 200–299 range"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Combining UI + API tests",
          "body": "The powerful pattern: use the API to quickly set up state (create a user, seed data) instead of a slow UI flow, then test the UI layer on top of that pre-seeded state — and optionally clean up via API afterward too.\n\n\"jane@example.com\"})\n\nuser_id = response.json()[\"id\"]\n\n# Cleanup via API — fast, doesn't depend on UI delete flow working correctly\n\nPointers: This pattern dramatically speeds up test suites where the thing you actually want to test is deep in the app (e.g., \"does an admin see the user in a list\") but getting there via pure UI would require a slow, flake-prone signup flow every single test run.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Combining UI + API tests",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "def test_new_user_appears_in_admin_list(page, request):",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "def test_new_user_appears_in_admin_list(page, request):\n\n# Fast setup via API instead of clicking through a signup form\n    response = request.post(\"/users\", json={\"name\": \"Jane Doe\", \"email\":\n\n# Now test the actual UI behavior\n    page.goto(\"https://app.example.com/admin/users\")\n    expect(page.get_by_text(\"Jane Doe\")).to_be_visible()\n\nrequest.delete(f\"/users/{user_id}\")",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I practiced: GET/POST/PUT/DELETE calls — full detail",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "18. API Testing with Playwright deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "request context (APIRequestContext) Playwright ships a full HTTP client independent of any browser — meaning you can make API calls without opening a page at all, useful both for pure API testing and for fast test-data setup (create data via API instead of clicking through slow UI forms). import pytest from playwright.sync_api import sync_playwright with sync_playwright() as p: request_context = p",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-4-visual",
      "phase": "Part 4 · Advanced Techniques",
      "level": "advanced",
      "title": "19. Visual & Accessibility Testing",
      "minutes": 45,
      "overview": "Screenshot comparison expect(page).to_have_screenshot(\"homepage.png\") expect(page).to_have_screenshot(name, max_diff_pixels=..., mask=...) What it does: Compares a screenshot of the current page (or element) against a saved baseline image; fails if they differ beyond a tolerance threshold. Types/params: ● name (string, optional) — filename for the baseline image; auto-generated from the test name ",
      "learn": [
        "Handling dynamic content in visual diffs",
        "Integrating axe-core for accessibility checks",
        "Axe().run(page)"
      ],
      "steps": [
        {
          "title": "expect(page).to_have_screenshot(\"homepage.png\")",
          "body": "mask=...)\n\nWhat it does: Compares a screenshot of the current page (or element) against a saved baseline image; fails if they differ beyond a tolerance threshold.\n\nTypes/params:\n\n(see dynamic content handling below)\n\nPointers: The first run creates the baseline image (nothing to compare against yet) — subsequent runs compare against it. Baselines need to be committed to version control and regenerated deliberately when a UI change is intentional, not just whenever a test fails.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "expect(page).to_have_screenshot(\"homepage.png\")",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "expect(page).to_have_screenshot(name, max_diff_pixels=...,",
          "codeTitle": null,
          "items": [
            "name (string, optional) — filename for the baseline image; auto-generated from the test name if omitted",
            "max_diff_pixels (integer, optional) — allowed pixel difference before failing, useful for minor anti-aliasing differences across environments",
            "mask (list of Locators, optional) — regions to exclude from comparison entirely",
            "full_page (boolean, optional) — capture the entire scrollable page vs just the viewport"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Handling dynamic content in visual diffs",
          "body": "])\n\nPointers: Timestamps, ads, and other constantly-changing content will cause false-positive failures on every single run unless masked out or otherwise stabilized (e.g., mocking the API that provides the timestamp, per Chapter 17, so it's always the same value).",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Handling dynamic content in visual diffs",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "expect(page).to_have_screenshot(\"dashboard.png\", mask=[\n    page.locator(\".timestamp\"),\n    page.locator(\".ad-banner\"),",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "expect(page).to_have_screenshot(\"dashboard.png\", mask=[\n    page.locator(\".timestamp\"),\n    page.locator(\".ad-banner\"),",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Integrating axe-core for accessibility checks",
          "body": "axe = Axe() results = axe.run(page)",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Integrating axe-core for accessibility checks",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "# pip install axe-playwright-python\nfrom axe_playwright_python.sync_playwright import Axe",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "# pip install axe-playwright-python\nfrom axe_playwright_python.sync_playwright import Axe\n\nassert len(results.violations_count) == 0, results.generate_report()",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Axe().run(page)",
          "body": "What it does: Scans the current page's DOM for accessibility violations using the axe-core ruleset (missing alt text, poor color contrast, missing ARIA labels, etc.).\n\nTypes/params:\n\n(dict to include/exclude specific rule sets)\n\nPointers: Increasingly a compliance requirement, not just best practice — especially relevant for healthcare/finance-adjacent apps (tying back to Part 0's industry list).",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Axe().run(page)",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "page (Page object, required)",
            "Some wrappers support context (CSS selector to scope the scan) and options"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "A typical violation object includes: id (the rule that failed, e.g. \"color-contrast\"),",
          "body": "impact (\"minor\", \"moderate\", \"serious\", \"critical\"), description, and\n\nnodes (the specific HTML elements that failed, with a target selector for each).\n\nPointers: Triage by impact level first — \"critical\" and \"serious\" violations (often things like missing form labels or unusable keyboard navigation) block real users from completing tasks and deserve priority over \"minor\" cosmetic issues.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "A typical violation object includes: id (the rule that failed, e.g. \"color-contrast\"),",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: expect(page).to_have_screenshot(\"homepage.png\")",
        "I practiced: Handling dynamic content in visual diffs",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "19. Visual & Accessibility Testing deliverable",
        "brief": "Apply one idea from “expect(page).to_have_screenshot(\"homepage.png\")” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Screenshot comparison expect(page).to_have_screenshot(\"homepage.png\") expect(page).to_have_screenshot(name, max_diff_pixels=..., mask=...) What it does: Compares a screenshot of the current page (or element) against a saved baseline image; fails if they differ beyond a tolerance threshold. Types/params: ● name (string, optional) — filename for the baseline image; auto-generated from the test name ",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-4-auth",
      "phase": "Part 4 · Advanced Techniques",
      "level": "advanced",
      "title": "20. Authentication & Session Reuse",
      "minutes": 45,
      "overview": "storage_state — saving/reusing login sessions # Log in once, save the resulting session context = browser.new_context() page = context.new_page() page.goto(\"https://app.example.com/login\") page.get_by_label(\"Username\").fill(\"testuser\") page.get_by_label(\"Password\").fill(\"testpass\") page.get_by_role(\"button\", name=\"Log in\").click() context.storage_state(path=\"auth_state.json\") # Reuse the saved ses",
      "learn": [
        "Global setup for auth (login once, reuse everywhere)"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "storage_state — saving/reusing login sessions\n\ncontext = browser.new_context() page = context.new_page()\n\n# Reuse the saved session — no login steps needed context = browser.new_context(storage_state=\"auth_state.json\") page = context.new_page()\n\nWhat it does: Saves the current context's cookies and localStorage to a JSON file (or returns it as a dict if no path given).\n\nTypes/params:\n\nPointers: Only captures cookies/localStorage — not sessionStorage or IndexedDB, so if an app's auth relies on those, this approach needs adjustment.\n\nWhat it does: Creates a new context pre-loaded with previously saved cookies/localStorage, skipping the need to log in via UI again.\n\nTypes/params:\n\nstate from a prior context.storage_state() call\n\nPointers: This is a major speed win across a large suite — logging in via UI once and reusing the state across hundreds of tests versus repeating a slow UI login flow every single test.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "page.goto(\"https://app.example.com/login\")\npage.get_by_label(\"Username\").fill(\"testuser\")\npage.get_by_label(\"Password\").fill(\"testpass\")\npage.get_by_role(\"button\", name=\"Log in\").click()",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "page.goto(\"https://app.example.com/login\")\npage.get_by_label(\"Username\").fill(\"testuser\")\npage.get_by_label(\"Password\").fill(\"testpass\")\npage.get_by_role(\"button\", name=\"Log in\").click()\n\ncontext.storage_state(path=\"auth_state.json\")\n\npage.goto(\"https://app.example.com/dashboard\")   # already logged in\n\ncontext.storage_state(path=...)\n\n# Log in once, save the resulting session",
          "codeTitle": null,
          "items": [
            "path (string, optional) — file path to write the state to; if omitted, returns the state as a dict instead",
            "storage_state (string path or dict, required for this use case) — the saved"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Global setup for auth (login once, reuse everywhere)",
          "body": "A common pattern with pytest is a session-scoped fixture that performs the login exactly once per test run and hands out the saved state file path to every test that needs it:\n\nPointers: Note the two different scopes working together — auth_state is\n\nsession-scoped (login happens once for the whole run), while authenticated_page\n\nis function-scoped (a fresh context per test, for isolation) — reusing the saved state, not the context itself, across tests. This combination gets you both speed and isolation simultaneously.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Global setup for auth (login once, reuse everywhere)",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "# conftest.py\n@pytest.fixture(scope=\"session\")\ndef auth_state(browser):\n    context = browser.new_context()\n    page = context.new_page()\n    page.goto(\"https://app.example.com/login\")\n    page.get_by_label(\"Username\").fill(\"testuser\")\n    page.get_by_label(\"Password\").fill(\"testpass\")\n    page.get_by_role(\"button\", name=\"Log in\").click()\n    state_path = \"auth_state.json\"\n    context.storage_state(path=state_path)\n    context.close()\n    return state_path\n\n@pytest.fixture\ndef authenticated_page(browser, auth_state):\n    context = browser.new_context(storage_state=auth_state)\n    page = context.new_page()\n    yield page\n    context.close()",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I practiced: Global setup for auth (login once, reuse everywhere)",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "20. Authentication & Session Reuse deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "storage_state — saving/reusing login sessions # Log in once, save the resulting session context = browser.new_context() page = context.new_page() page.goto(\"https://app.example.com/login\") page.get_by_label(\"Username\").fill(\"testuser\") page.get_by_label(\"Password\").fill(\"testpass\") page.get_by_role(\"button\", name=\"Log in\").click() context.storage_state(path=\"auth_state.json\") # Reuse the saved ses",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-4-shadow",
      "phase": "Part 4 · Advanced Techniques",
      "level": "advanced",
      "title": "21. Shadow DOM & Complex Components",
      "minutes": 40,
      "overview": "Piercing shadow DOM Playwright's locators automatically pierce open shadow DOM by default — no special syntax needed in most cases: # Works transparently even if \"custom-button\" uses shadow DOM internally page.locator(\"custom-button\").get_by_text(\"Submit\").click() Pointers: This \"just works\" behavior is a genuine advantage over older tools, which often required manually accessing .shadowRoot via J",
      "learn": [
        "Piercing shadow DOM",
        "Handling custom web components"
      ],
      "steps": [
        {
          "title": "Piercing shadow DOM",
          "body": "Playwright's locators automatically pierce open shadow DOM by default — no special syntax needed in most cases:\n\nPointers: This \"just works\" behavior is a genuine advantage over older tools, which often required manually accessing .shadowRoot via JavaScript execution to reach shadow DOM content at all.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Piercing shadow DOM",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "# Works transparently even if \"custom-button\" uses shadow DOM internally\npage.locator(\"custom-button\").get_by_text(\"Submit\").click()",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "# Works transparently even if \"custom-button\" uses shadow DOM internally\npage.locator(\"custom-button\").get_by_text(\"Submit\").click()",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Handling custom web components",
          "body": "For components built with frameworks like Lit or native Web Components (common in design systems), the same role/text-based locators from Chapter 5 generally still apply, since they operate on the accessibility tree rather than raw DOM structure:\n\ncustom <my-button> element\n\nPointers: Closed shadow roots (a stricter encapsulation mode some components use deliberately to prevent external access) are the one case Playwright genuinely cannot pierce — this is a rare, deliberate choice by component authors, and if you hit it, there's no workaround short of the app changing that setting.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Handling custom web components",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "page.get_by_role(\"button\", name=\"Save changes\").click()  # works even inside a",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Piercing shadow DOM",
        "I practiced: Handling custom web components",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "21. Shadow DOM & Complex Components deliverable",
        "brief": "Apply one idea from “Piercing shadow DOM” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Piercing shadow DOM Playwright's locators automatically pierce open shadow DOM by default — no special syntax needed in most cases: # Works transparently even if \"custom-button\" uses shadow DOM internally page.locator(\"custom-button\").get_by_text(\"Submit\").click() Pointers: This \"just works\" behavior is a genuine advantage over older tools, which often required manually accessing .shadowRoot via J",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-4-parallel",
      "phase": "Part 4 · Advanced Techniques",
      "level": "advanced",
      "title": "22. Parallel Execution & Sharding",
      "minutes": 40,
      "overview": "pytest-xdist for parallel runs pip install pytest-xdist pytest -n 4 # run using 4 parallel workers pytest -n auto # auto-detect CPU core count pytest -n <count> What it does: Distributes tests across multiple worker processes running in parallel instead of sequentially. Types/params: ● <count> (integer or \"auto\") — number of parallel workers; \"auto\" picks based on available CPU cores Pointers: Spe",
      "learn": [
        "Sharding tests across machines/CI runners"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "What it does: Distributes tests across multiple worker processes running in parallel instead of sequentially.\n\nTypes/params:\n\nPointers: Speed gains are significant but not linear — too many workers on too few CPU cores causes contention that can actually slow things down (ties into Chapter 32's performance tuning). Tests must be properly isolated (no shared mutable state, no fixed ports/files) or parallel execution surfaces race conditions that don't show up running sequentially.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "pytest-xdist for parallel runs",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "pytest-xdist for parallel runs\n\npip install pytest-xdist\npytest -n 4        # run using 4 parallel workers\npytest -n auto     # auto-detect CPU core count\n\npytest -n <count>",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Sharding tests across machines/CI runners",
          "body": "Pointers: Sharding splits the suite across entirely separate machines (e.g., 4 parallel CI jobs each running a quarter of the suite), which matters once a suite is large enough that even pytest-xdist on one machine isn't fast enough. Most CI platforms (GitHub Actions matrix jobs, for instance) have their own idiomatic way to configure this rather than a single universal flag.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Sharding tests across machines/CI runners",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "pytest --shard-id=1 --num-shards=4    # syntax varies by plugin/CI setup",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I practiced: Sharding tests across machines/CI runners",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "22. Parallel Execution & Sharding deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "pytest-xdist for parallel runs pip install pytest-xdist pytest -n 4 # run using 4 parallel workers pytest -n auto # auto-detect CPU core count pytest -n <count> What it does: Distributes tests across multiple worker processes running in parallel instead of sequentially. Types/params: ● <count> (integer or \"auto\") — number of parallel workers; \"auto\" picks based on available CPU cores Pointers: Spe",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-4-cross",
      "phase": "Part 4 · Advanced Techniques",
      "level": "advanced",
      "title": "23. Cross-browser & Cross-device Testing",
      "minutes": 40,
      "overview": "Running on Chromium, Firefox, WebKit pytest --browser chromium pytest --browser firefox pytest --browser webkit Or parametrized directly in code/config to run against all three in one CI pipeline run. --browser (pytest-playwright CLI flag) What it does: Selects which browser engine the test session launches.",
      "learn": [
        "Running on Chromium, Firefox, WebKit",
        "Mobile emulation (device descriptors, viewport, geolocation)"
      ],
      "steps": [
        {
          "title": "Running on Chromium, Firefox, WebKit",
          "body": "Or parametrized directly in code/config to run against all three in one CI pipeline run.\n\n--browser (pytest-playwright CLI flag)\n\nWhat it does: Selects which browser engine the test session launches.\n\nTypes/params: \"chromium\" (default), \"firefox\", \"webkit\".\n\nPointers: Running the full suite three times (once per browser) in CI catches engine-specific bugs before real users do — a common setup is a CI matrix job that runs the same suite once per browser value in parallel.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Running on Chromium, Firefox, WebKit",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "pytest --browser chromium\npytest --browser firefox\npytest --browser webkit",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "pytest --browser chromium\npytest --browser firefox\npytest --browser webkit",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Mobile emulation (device descriptors, viewport, geolocation)",
          "body": "iphone = p.devices[\"iPhone 13\"] context = browser.new_context(**iphone) page = context.new_page()",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Mobile emulation (device descriptors, viewport, geolocation)",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "page.goto(\"https://app.example.com\")",
          "body": "context = browser.new_context(\n\nviewport={\"width\": 390, \"height\": 844},\n geolocation={\"latitude\": 27.7172, \"longitude\": 85.3240},\n permissions=[\"geolocation\"],\n\n)\n\nplaywright.devices[\"<device name>\"]\n\nWhat it does: A dictionary of preset settings (viewport, user-agent, touch support, device pixel ratio) for a named real device.\n\nTypes/params: String key matching a supported device name, e.g. \"iPhone 13\",\n\n\"Pixel 5\", \"iPad Pro 11\".\n\nPointers: Unpack it directly into new_context(**device_dict) — no need to set each property manually. Full list of supported devices is in Playwright's own source/docs since it's updated over time.\n\npermissions=...)\n\nWhat it does: Sets custom device-like properties without using a full preset.\n\nTypes/params:\n\nPointers: Forgetting permissions=[\"geolocation\"] is a common gotcha — setting geolocation alone does nothing if the page's geolocation request isn't permitted.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "page.goto(\"https://app.example.com\")",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "# Custom viewport and geolocation, without a full device descriptor",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "# Custom viewport and geolocation, without a full device descriptor\n\nbrowser.new_context(viewport=..., geolocation=...,",
          "codeTitle": null,
          "items": [
            "viewport (dict {width, height}, optional)",
            "geolocation (dict {latitude, longitude}, optional)",
            "permissions (list of strings, optional) — must explicitly grant \"geolocation\" or the browser will block the geolocation API regardless of the coordinates provided"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Running on Chromium, Firefox, WebKit",
        "I practiced: Mobile emulation (device descriptors, viewport, geolocation)",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "23. Cross-browser & Cross-device Testing deliverable",
        "brief": "Apply one idea from “Running on Chromium, Firefox, WebKit” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Running on Chromium, Firefox, WebKit pytest --browser chromium pytest --browser firefox pytest --browser webkit Or parametrized directly in code/config to run against all three in one CI pipeline run. --browser (pytest-playwright CLI flag) What it does: Selects which browser engine the test session launches.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-4-debug",
      "phase": "Part 4 · Advanced Techniques",
      "level": "advanced",
      "title": "24. Debugging Tools",
      "minutes": 45,
      "overview": "Playwright Inspector PWDEBUG=1 pytest test_login.py What it does: Opens a GUI tool that pauses test execution and lets you step through actions one at a time, inspect the current page state, and even generate locator code by pointing at elements live. Pointers: Invaluable while first writing a new test or diagnosing exactly where an existing one breaks — far faster than repeatedly adding print sta",
      "learn": [
        "PWDEBUG=1 pytest test_login.py",
        "Trace Viewer"
      ],
      "steps": [
        {
          "title": "PWDEBUG=1 pytest test_login.py",
          "body": "What it does: Opens a GUI tool that pauses test execution and lets you step through actions one at a time, inspect the current page state, and even generate locator code by pointing at elements live.\n\nPointers: Invaluable while first writing a new test or diagnosing exactly where an existing one breaks — far faster than repeatedly adding print statements and re-running.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "PWDEBUG=1 pytest test_login.py",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Trace Viewer",
          "body": "sources=...)\n\nWhat it does: Begins recording a full timeline of the test session — DOM snapshots, network activity, console logs, and optionally screenshots at each step.\n\nTypes/params:\n\nWhat it does: Stops recording and saves the trace to a .zip file.\n\nTypes/params:\n\nPointers: Essential once tests run in CI where you can't watch them live — a failed CI run's trace file, opened locally with playwright show-trace, lets you replay exactly what happened step by step, including hovering over any point in time to see the DOM as it was at that instant. A common pattern is only saving traces on failure (context.tracing.stop() conditionally, or via a pytest hook) to avoid massive artifact storage costs across an entire suite.\n\nCodegen\n\nWhat it does: Opens a browser and records your manual clicks/typing as generated Playwright code in real time, in your language/framework of choice.\n\nPointers: Genuinely useful for quickly drafting locators for a new page, especially when you're unsure exactly what selector Playwright would generate for a tricky element — but the generated code usually needs cleanup afterward to fit your POM structure (Chapter 14) rather than being committed as-is; codegen optimizes for \"works right now,\" not for long-term maintainability.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Trace Viewer",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "context.tracing.start(screenshots=True, snapshots=True, sources=True)",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "context.tracing.start(screenshots=True, snapshots=True, sources=True)\n\n# ... test steps ...\ncontext.tracing.stop(path=\"trace.zip\")\n\nplaywright show-trace trace.zip\n\ncontext.tracing.start(screenshots=..., snapshots=...,\n\nplaywright codegen https://app.example.com\n\ncontext.tracing.stop(path=...)",
          "codeTitle": null,
          "items": [
            "screenshots (boolean, optional) — capture a screenshot at each action",
            "snapshots (boolean, optional) — capture full DOM snapshots, enabling the trace viewer's time-travel DOM inspection",
            "sources (boolean, optional) — include your test's source code in the trace, so the viewer can show exactly which line triggered each action",
            "path (string, required) — where to save the trace archive"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: PWDEBUG=1 pytest test_login.py",
        "I practiced: Trace Viewer",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "24. Debugging Tools deliverable",
        "brief": "Apply one idea from “PWDEBUG=1 pytest test_login.py” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Playwright Inspector PWDEBUG=1 pytest test_login.py What it does: Opens a GUI tool that pauses test execution and lets you step through actions one at a time, inspect the current page state, and even generate locator code by pointing at elements live. Pointers: Invaluable while first writing a new test or diagnosing exactly where an existing one breaks — far faster than repeatedly adding print sta",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-cp-advanced",
      "phase": "Part 4 · Advanced",
      "level": "checkpoint",
      "kind": "checkpoint",
      "title": "Checkpoint — Advanced",
      "minutes": 45,
      "overview": "You can mock network, hit APIs, reuse auth, run parallel/cross-browser, and debug with traces.",
      "learn": [
        "You can mock network, hit APIs, reuse auth, run parallel/cross-browser, and debug with traces."
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "You can mock network, hit APIs, reuse auth, run parallel/cross-browser, and debug with traces.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Pass criteria",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "A checkpoint is done when…",
            "options": [
              "You bookmarked the docs",
              "You can demo the criteria without notes",
              "You skipped practice",
              "You only watched a video"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Record a 2-minute Loom/demo proving the criteria.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "You can mock network, hit APIs, reuse auth, run parallel/cross-browser, and debug with traces.",
        "Demo recorded or peer-reviewed"
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "You can mock network, hit APIs, reuse auth, run parallel/cross-browser, and debug with traces.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-5-ci",
      "phase": "Part 5 · CI/CD & Reporting",
      "level": "advanced",
      "title": "25. CI/CD Integration",
      "minutes": 50,
      "overview": "GitHub Actions workflow setup A GitHub Actions workflow is a YAML file living in .github/workflows/ that defines when tests run (e.g., on every pull request) and what steps to execute. # .github/workflows/playwright.yml name: Playwright Tests on: push: branches: [main] pull_request: branches: [main] jobs: test: runs-on: ubuntu-latest steps: - uses: actions/checkout@v4 - uses: actions/setup-python@",
      "learn": [
        "GitHub Actions workflow setup",
        "Jenkins pipeline basics",
        "Running headless in CI"
      ],
      "steps": [
        {
          "title": "GitHub Actions workflow setup",
          "body": "A GitHub Actions workflow is a YAML file living in .github/workflows/ that defines when tests run (e.g., on every pull request) and what steps to execute.\n\npush:\n\nbranches: [main]\n\npull_request:\n\nbranches: [main]\n\ntest:\n\nruns-on: ubuntu-latest\n\nwith:\n\npython-version: '3.11'\n\n- name: Install dependencies\n\n- name: Run tests\n\nWhat it does: Defines which events cause the workflow to run.\n\nTypes/params:\n\nPointers: Running on pull_request is the most common setup for catching\n\nregressions before merge; schedule is useful for a nightly full-regression run separate from a fast pull_request smoke-test run.\n\nWhat it does: Installs browser binaries plus the OS-level system dependencies (fonts, libraries) those browsers need to actually run on a fresh CI machine.\n\nTypes/params: No required params; --with-deps is the key flag for CI environments specifically.\n\nPointers: On a fresh CI runner (unlike your local dev machine), the OS-level dependencies genuinely aren't present — skipping --with-deps is a very common cause of \"works locally, fails in CI\" browser launch errors.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "GitHub Actions workflow setup",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "run: |",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "run: |\n\npip install -r requirements.txt\n\nplaywright install --with-deps\n\nsteps:\n\n- uses: actions/checkout@v4\n\n- uses: actions/setup-python@v5\n\n# .github/workflows/playwright.yml\n\nname: Playwright Tests\n\non:",
          "codeTitle": null,
          "items": [
            "push (dict, optional) — runs on pushes to specified branches",
            "pull_request (dict, optional) — runs when a PR is opened/updated against specified branches",
            "schedule (list, optional) — cron-based scheduled runs, e.g. nightly regression suites"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Jenkins pipeline basics",
          "body": "Jenkins uses a Jenkinsfile (Groovy-based) to define pipeline stages, more common in traditional enterprise environments than GitHub Actions.\n\n// Jenkinsfile\n\npipeline {\n\nagent any\n\nstages {\n\nsteps {\n\nsh 'pip install -r requirements.txt'\n\nsh 'playwright install --with-deps'\n\n}\n\n}\n\nsteps {\n\nsh 'pytest --browser chromium --junitxml=results.xml'\n\n}\n\n}\n\n}\n\npost {\n\nalways {\n\njunit 'results.xml'\n\n}\n\n}\n\n}\n\npipeline { agent ... stages { ... } post { ... } } (Jenkinsfile structure)\n\nWhat it does: Defines the overall pipeline: where it runs (agent), what steps execute\n\nin order (stages), and cleanup/reporting actions that always run afterward (post).\n\nTypes/params:\n\nplugin calls)\n\nPointers: --junitxml=results.xml produces a report format Jenkins natively\n\nunderstands and can render as pass/fail trends over time via the junit post-step — this is Jenkins' equivalent of GitHub Actions' built-in test summary UI.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Jenkins pipeline basics",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "stage('Install') {",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "stage('Install') {\n\nstage('Test') {",
          "codeTitle": null,
          "items": [
            "agent — any (run on any available Jenkins worker) or a specific labeled machine/Docker image",
            "stages — ordered list of named stages, each with steps (shell commands or",
            "post { always {...} } — actions that run regardless of pass/fail, commonly used to publish test result reports"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Running headless in CI",
          "body": "Pointers: CI runners have no display server, so headless isn't optional — attempting to run headed (--headed) on a typical CI machine will fail outright unless a virtual display (like xvfb) is specifically configured, which is rarely worth the added complexity when headless works and is faster anyway.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Running headless in CI",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "# pytest-playwright defaults to headless=True already, but explicit is safer:",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "# pytest-playwright defaults to headless=True already, but explicit is safer:\n\npytest --browser chromium  # headless by default",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: GitHub Actions workflow setup",
        "I practiced: Jenkins pipeline basics",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "25. CI/CD Integration deliverable",
        "brief": "Apply one idea from “GitHub Actions workflow setup” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "GitHub Actions workflow setup A GitHub Actions workflow is a YAML file living in .github/workflows/ that defines when tests run (e.g., on every pull request) and what steps to execute. # .github/workflows/playwright.yml name: Playwright Tests on: push: branches: [main] pull_request: branches: [main] jobs: test: runs-on: ubuntu-latest steps: - uses: actions/checkout@v4 - uses: actions/setup-python@",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-5-report",
      "phase": "Part 5 · CI/CD & Reporting",
      "level": "advanced",
      "title": "26. Test Reporting",
      "minutes": 40,
      "overview": "HTML report (pytest-html) pip install pytest-html pytest --html=report.html --self-contained-html pytest --html=<path> --self-contained-html What it does: Generates a single-file HTML report summarizing pass/fail/skip results after a test run. Types/params: ● --html=<path> (string, required) — output file location ● --self-contained-html (flag, optional) — embeds CSS/JS directly in the file so it'",
      "learn": [
        "HTML report (pytest-html)",
        "Allure reporting setup",
        "Publishing reports as CI artifacts"
      ],
      "steps": [
        {
          "title": "HTML report (pytest-html)",
          "body": "What it does: Generates a single-file HTML report summarizing pass/fail/skip results after a test run.\n\nTypes/params:\n\nPointers: Good baseline reporting with minimal setup. Lacks the richer history-tracking and screenshot/trace attachment support that Allure offers — reach for Allure once a team needs more than a quick pass/fail summary.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "HTML report (pytest-html)",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "pip install pytest-html",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "pip install pytest-html\n\npytest --html=report.html --self-contained-html\n\npytest --html=<path> --self-contained-html",
          "codeTitle": null,
          "items": [
            "--html=<path> (string, required) — output file location",
            "--self-contained-html (flag, optional) — embeds CSS/JS directly in the file so it's viewable standalone without needing internet access or separate asset files"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Allure reporting setup",
          "body": "allure serve allure-results # opens an interactive report locally\n\nWhat it does: Writes raw result data (in Allure's format) to a directory during the test run, to be rendered into a report afterward.\n\nTypes/params:\n\nPointers: Requires the separate Allure command-line tool (allure serve / allure\n\ngenerate) to actually render the raw results into a viewable report — the allure-pytest package alone only produces the raw data.\n\n@allure.step(\"Log in as test user\")\n\n...\n\n@allure.attach(name=\"screenshot\", attachment_type=allure.attachment_type.PNG)\n\n@allure.step(description)\n\nWhat it does: Marks a function as a named step in the Allure report, so the report shows a readable step-by-step breakdown of what a test did, not just pass/fail.\n\nTypes/params:\n\nPointers: Especially valuable for longer tests/flows — a failed test's Allure report will show exactly which named step failed, rather than requiring someone to read raw code to figure out where things went wrong.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Allure reporting setup",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "def login(page):",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "def login(page):\n\npage.get_by_label(\"Username\").fill(\"testuser\")\n\npip install allure-pytest\n\npytest --alluredir=allure-results\n\ndef attach_screenshot(page):\n\nreturn page.screenshot()",
          "codeTitle": null,
          "items": [
            "--alluredir=<path> (string, required) — directory to write raw result files to",
            "description (string, required) — human-readable label shown in the report"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Publishing reports as CI artifacts",
          "body": "- name: Upload test report\n\nwith:\n\npath: report.html\n\nactions/upload-artifact (GitHub Actions built-in action)\n\nWhat it does: Saves specified files/directories from the CI run so they're downloadable after the workflow finishes, instead of only existing in ephemeral CI logs.\n\nTypes/params:\n\nPointers: if: always() is important here — without it, the upload step is skipped whenever the test step itself fails, which is exactly the case where you most need the report/trace artifacts to debug what went wrong.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Publishing reports as CI artifacts",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "if: always()",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "if: always()\n\nuses: actions/upload-artifact@v4\n\nname: playwright-report\n\n# GitHub Actions step",
          "codeTitle": null,
          "items": [
            "name (string) — artifact name shown in the GitHub UI",
            "path (string) — file or directory to upload"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: HTML report (pytest-html)",
        "I practiced: Allure reporting setup",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "26. Test Reporting deliverable",
        "brief": "Apply one idea from “HTML report (pytest-html)” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "HTML report (pytest-html) pip install pytest-html pytest --html=report.html --self-contained-html pytest --html=<path> --self-contained-html What it does: Generates a single-file HTML report summarizing pass/fail/skip results after a test run. Types/params: ● --html=<path> (string, required) — output file location ● --self-contained-html (flag, optional) — embeds CSS/JS directly in the file so it'",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-5-docker",
      "phase": "Part 5 · CI/CD & Reporting",
      "level": "advanced",
      "title": "27. Dockerizing Playwright Tests",
      "minutes": 40,
      "overview": "Official Playwright Docker image Microsoft publishes a pre-built image with browsers and all system dependencies already installed, avoiding \"works on my machine\" issues caused by missing OS libraries. docker run -it --rm mcr.microsoft.com/playwright/python:v1.48.0-jammy /bin/bash Pointers: The version tag (v1.48.0 here) should match your installed playwright pip package version — a mismatch betwe",
      "learn": [
        "Official Playwright Docker image",
        "WORKDIR /app",
        "RUN pip install -r requirements.txt",
        "FROM <image>",
        "WORKDIR, COPY, RUN, CMD (standard Dockerfile instructions)"
      ],
      "steps": [
        {
          "title": "Official Playwright Docker image",
          "body": "Microsoft publishes a pre-built image with browsers and all system dependencies already installed, avoiding \"works on my machine\" issues caused by missing OS libraries.\n\nPointers: The version tag (v1.48.0 here) should match your installed playwright\n\nPython package's expected protocol version can cause obscure failures, so pin both deliberately rather than always pulling :latest.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Official Playwright Docker image",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "docker run -it --rm mcr.microsoft.com/playwright/python:v1.48.0-jammy /bin/bash",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "docker run -it --rm mcr.microsoft.com/playwright/python:v1.48.0-jammy /bin/bash\n\npip package version — a mismatch between the image's browser version and your",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "WORKDIR /app",
          "body": "",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "WORKDIR /app",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "COPY requirements.txt .",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "RUN pip install -r requirements.txt",
          "body": "",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "RUN pip install -r requirements.txt",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "COPY . .",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "FROM <image>",
          "body": "What it does: Sets the base image the rest of the Dockerfile builds on top of.\n\nTypes/params: <image> (string) — image name and tag, e.g.\n\nmcr.microsoft.com/playwright/python:v1.48.0-jammy.\n\nPointers: Starting from the official Playwright image (rather than a plain Python image plus manually installing browsers) is strongly preferred — it guarantees all the OS-level dependencies (fonts, codecs, etc.) that browsers need are already correctly present.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "FROM <image>",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "WORKDIR, COPY, RUN, CMD (standard Dockerfile instructions)",
          "body": "What they do:\n\ninstalling pip packages)\n\nPointers: Copying requirements.txt and running pip install before copying the rest of the source code (as shown above) is a deliberate ordering — Docker caches each layer, so if only your test code changes (not dependencies), the dependency-install layer is reused from cache instead of re-running, meaningfully speeding up repeated builds.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "WORKDIR, COPY, RUN, CMD (standard Dockerfile instructions)",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "WORKDIR <path> — sets the working directory inside the container for subsequent instructions",
            "COPY <src> <dest> — copies files from your local machine into the image",
            "RUN <command> — executes a shell command during the image build (e.g.,",
            "CMD [...] — the default command run when a container starts from this image"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Official Playwright Docker image",
        "I practiced: WORKDIR /app",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "27. Dockerizing Playwright Tests deliverable",
        "brief": "Apply one idea from “Official Playwright Docker image” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Official Playwright Docker image Microsoft publishes a pre-built image with browsers and all system dependencies already installed, avoiding \"works on my machine\" issues caused by missing OS libraries. docker run -it --rm mcr.microsoft.com/playwright/python:v1.48.0-jammy /bin/bash Pointers: The version tag (v1.48.0 here) should match your installed playwright pip package version — a mismatch betwe",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-5-logging",
      "phase": "Part 5 · CI/CD & Reporting",
      "level": "advanced",
      "title": "28. Logging & Error Handling",
      "minutes": 35,
      "overview": "Custom logging setup import logging logging.basicConfig( level=logging.INFO, format=\"%(asctime)s - %(levelname)s - %(message)s\" ) logger = logging.getLogger(__name__) def test_login(page): logger.info(\"Starting login test\") page.goto(\"https://app.example.com/login\") logger.info(\"Navigated to login page\") logging.basicConfig(level=..., format=...) What it does: Configures the root logger's minimum ",
      "learn": [
        "Custom logging setup",
        "Screenshot/video capture on failure",
        "Retry logic for flaky tests"
      ],
      "steps": [
        {
          "title": "Custom logging setup",
          "body": "level=logging.INFO,\n\nformat=\"%(asctime)s - %(levelname)s - %(message)s\"\n\n)\n\nlogger = logging.getLogger(__name__)",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Custom logging setup",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "def test_login(page):",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "def test_login(page):\n\nlogger.info(\"Starting login test\")\n\nimport logging\n\nlogging.basicConfig(",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "page.goto(\"https://app.example.com/login\")",
          "body": "What it does: Configures the root logger's minimum severity level and output format\n\nTypes/params:\n\nlogging.ERROR) — messages below this level are suppressed\n\n(timestamp, level, message, etc.)\n\nPointers: INFO level is a reasonable default for test runs — enough to trace what a test\n\nwas doing without the noise of DEBUG-level internals. Custom logging like this gives\n\nreadable output beyond raw pytest console output, especially useful when a CI failure needs a narrative of \"what happened right before it broke,\" not just a stack trace.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "page.goto(\"https://app.example.com/login\")",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "logger.info(\"Navigated to login page\")",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "logger.info(\"Navigated to login page\")\n\nlogging.basicConfig(level=..., format=...)\n\nfor the whole test run.",
          "codeTitle": null,
          "items": [
            "level (constant, e.g. logging.DEBUG, logging.INFO, logging.WARNING,",
            "format (string, optional) — template controlling what each log line includes"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Screenshot/video capture on failure",
          "body": "--screenshot / --video (pytest-playwright CLI flags)\n\nWhat it does: Automatically captures a screenshot and/or video for each test, controllable by outcome.\n\nTypes/params:\n\nPointers: only-on-failure / retain-on-failure are the right defaults for most\n\nsuites — capturing on every single test (\"on\") generates large amounts of storage for passing tests you'll likely never look at, while still giving you full debugging evidence exactly when you need it (a failure).",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Screenshot/video capture on failure",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "# pytest-playwright supports this via CLI flags directly:",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "# pytest-playwright supports this via CLI flags directly:\n\npytest --screenshot=only-on-failure --video=retain-on-failure",
          "codeTitle": null,
          "items": [
            "--screenshot: \"off\", \"on\", \"only-on-failure\"",
            "--video: \"off\", \"on\", \"retain-on-failure\""
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Retry logic for flaky tests",
          "body": "What it does: Automatically re-runs a failed test up to a specified number of times before marking it as a genuine failure.\n\nTypes/params:\n\nPointers: Retry logic should be used carefully — it's meant for genuine environmental flakiness (a network blip, a race condition in test setup), not as a way to paper over a real, reproducible bug. A test that only passes 1-in-3 tries even with retries almost always indicates a real problem worth fixing rather than retrying around indefinitely; tracking which tests need reruns over time (tying back to Chapter 30's flaky-test diagnosis) is more valuable long-term than just cranking up the rerun count.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Retry logic for flaky tests",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "pip install pytest-rerunfailures",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "pip install pytest-rerunfailures\n\npytest --reruns 2 --reruns-delay 1\n\npytest --reruns <count> --reruns-delay <seconds>",
          "codeTitle": null,
          "items": [
            "--reruns <count> (integer) — max number of retry attempts",
            "--reruns-delay <seconds> (number, optional) — pause between retry attempts, useful if the failure might be due to a transient backend issue that needs a moment to resolve"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Custom logging setup",
        "I practiced: page.goto(\"https://app.example.com/login\")",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "28. Logging & Error Handling deliverable",
        "brief": "Apply one idea from “Custom logging setup” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Custom logging setup import logging logging.basicConfig( level=logging.INFO, format=\"%(asctime)s - %(levelname)s - %(message)s\" ) logger = logging.getLogger(__name__) def test_login(page): logger.info(\"Starting login test\") page.goto(\"https://app.example.com/login\") logger.info(\"Navigated to login page\") logging.basicConfig(level=..., format=...) What it does: Configures the root logger's minimum ",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-cp-cicd",
      "phase": "Part 5 · CI/CD",
      "level": "checkpoint",
      "kind": "checkpoint",
      "title": "Checkpoint — CI/CD",
      "minutes": 45,
      "overview": "Suite runs in CI with reports, optional Docker, and useful failure logs.",
      "learn": [
        "Suite runs in CI with reports, optional Docker, and useful failure logs."
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "Suite runs in CI with reports, optional Docker, and useful failure logs.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Pass criteria",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "A checkpoint is done when…",
            "options": [
              "You bookmarked the docs",
              "You can demo the criteria without notes",
              "You skipped practice",
              "You only watched a video"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Record a 2-minute Loom/demo proving the criteria.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Suite runs in CI with reports, optional Docker, and useful failure logs.",
        "Demo recorded or peer-reviewed"
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Suite runs in CI with reports, optional Docker, and useful failure logs.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-6-framework",
      "phase": "Part 6 · Pro-Level Practices",
      "level": "pro",
      "title": "29. Building a Scalable Framework from Scratch",
      "minutes": 60,
      "overview": "Folder architecture for enterprise-grade projects Past a certain size, a flat tests/ + pages/ structure (Chapter 14) stops being enough. An enterprise-grade layout separates concerns clearly so new contributors can navigate it without a guided tour: project/ ├── tests/ │ ├── smoke/ │ ├── regression/ │ └── modules/ │ ├── test_leave.py │ ├── test_attendance.py │ └── test_payroll.py ├── pages/ │ ├── ",
      "learn": [
        "Folder architecture for enterprise-grade projects",
        "Utilities/helpers layer",
        "Utility function pattern (utils/*.py — convention, not a Playwright API)",
        "Config-driven test execution",
        "BASE_URL = {"
      ],
      "steps": [
        {
          "title": "Folder architecture for enterprise-grade projects",
          "body": "Past a certain size, a flat tests/ + pages/ structure (Chapter 14) stops being enough. An enterprise-grade layout separates concerns clearly so new contributors can navigate it without a guided tour:\n\nproject/\n\n├── tests/\n\n│ ├── smoke/\n\n│ ├── regression/\n\n│ └── modules/\n\n│ ├── test_leave.py\n\n│ ├── test_attendance.py\n\n│ └── test_payroll.py\n\n├── pages/\n\n│ ├── base_page.py\n\n│ └── modules/\n\n│ ├── leave_page.py\n\n│ └── attendance_page.py\n\n├── utils/\n\n│ ├── api_helpers.py\n\n│ ├── data_generators.py\n\n│ └── wait_helpers.py\n\n├── config/\n\n│ ├── environments.py\n\n│ └── settings.py\n\n├── test_data/\n\n│ └── users.json\n\n├── conftest.py\n\n├── pytest.ini\n\n└── requirements.txt\n\nPointers: The organizing principle is \"a new engineer should be able to guess where something lives before searching for it.\" Grouping page objects and tests by feature module (mirroring your actual application's modules — e.g., matching Bizlevate's Leave/Attendance/Payroll structure) rather than by arbitrary file order keeps the mapping between app and test suite obvious.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Folder architecture for enterprise-grade projects",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Utilities/helpers layer",
          "body": "A utils/ layer holds logic that doesn't belong in a page object (which should only know about its own page) or a test (which should read like a scenario, not implementation detail).\n\nresponse = request.post(\"/users\", json={\"name\": name, \"email\": email})",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Utilities/helpers layer",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "return response.json()[\"id\"]",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "return response.json()[\"id\"]\n\ndef delete_test_user(request, user_id):\n\nrequest.delete(f\"/users/{user_id}\")\n\n# utils/wait_helpers.py\n\ndef wait_for_toast_to_disappear(page, timeout=5000):\n\n# utils/api_helpers.py\n\ndef create_test_user(request, name, email):",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Utility function pattern (utils/*.py — convention, not a Playwright API)",
          "body": "What it does: Groups reusable, cross-cutting logic (API setup helpers, custom wait conditions, data generation) that multiple page objects or test files need, without duplicating it in each.\n\nTypes/params: N/A — plain Python functions, organized by concern (e.g., api_helpers.py, wait_helpers.py, data_generators.py).\n\nPointers: A good test for whether something belongs in utils/ versus a page object: does it know about a specific page's UI? If yes, it's a page object method. Does it know about the API or a generic wait pattern usable across many pages? That's a utility.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Utility function pattern (utils/*.py — convention, not a Playwright API)",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Config-driven test execution",
          "body": "Behavior (which environment, which browser, headless/headed) should be controlled by configuration, not hardcoded into test files, so the same framework runs anywhere without code changes.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Config-driven test execution",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "# config/settings.py",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "# config/settings.py\n\nimport os\n\nclass Settings:",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "BASE_URL = {",
          "body": "\"dev\": \"https://dev.example.com\",\n\n\"staging\": \"https://staging.example.com\",\n\n\"prod\": \"https://app.example.com\",\n\n}[ENV]",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "BASE_URL = {",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Settings class pattern (convention, not a Playwright API)",
          "body": "What it does: Centralizes all environment/execution configuration into one importable object, read once from environment variables at import time.\n\nTypes/params: N/A — a plain Python class with class-level attributes, typically populated via os.environ.get() (Chapter 15).\n\nPointers: Import Settings wherever configuration is needed (conftest.py, page objects, utilities) instead of scattering separate os.environ.get() calls throughout the codebase — one clear source of truth is easier to audit and change later.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Settings class pattern (convention, not a Playwright API)",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Folder architecture for enterprise-grade projects",
        "I practiced: Utilities/helpers layer",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "29. Building a Scalable Framework from Scratch deliverable",
        "brief": "Apply one idea from “Folder architecture for enterprise-grade projects” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Folder architecture for enterprise-grade projects Past a certain size, a flat tests/ + pages/ structure (Chapter 14) stops being enough. An enterprise-grade layout separates concerns clearly so new contributors can navigate it without a guided tour: project/ ├── tests/ │ ├── smoke/ │ ├── regression/ │ └── modules/ │ ├── test_leave.py │ ├── test_attendance.py │ └── test_payroll.py ├── pages/ │ ├── ",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-6-scale",
      "phase": "Part 6 · Pro-Level Practices",
      "level": "pro",
      "title": "30. Managing Test Suites at Scale",
      "minutes": 45,
      "overview": "Test tagging and selective execution across large suites Building directly on Chapter 13's markers, at scale you typically layer multiple tagging dimensions rather than one flat list: @pytest.mark.smoke @pytest.mark.module_leave @pytest.mark.critical def test_leave_request_approval_flow(): ... pytest -m \"smoke and module_leave\" # only smoke tests for the Leave module pytest -m \"critical and not sl",
      "learn": [
        "Test tagging and selective execution across large suites",
        "Diagnosing and managing flaky tests systematically",
        "Writing custom reporters/plugins",
        "Integrating with test management tools (TestRail, Xray)"
      ],
      "steps": [
        {
          "title": "Test tagging and selective execution across large suites",
          "body": "Building directly on Chapter 13's markers, at scale you typically layer multiple tagging dimensions rather than one flat list:\n\n...\n\nPointers: Combine markers with boolean expressions (and, or, not) for precise slicing — e.g., running just the critical-path tests for one module before a targeted deploy, without running the entire suite.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Test tagging and selective execution across large suites",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "pytest -m \"smoke and module_leave\"        # only smoke tests for the Leave module",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "pytest -m \"smoke and module_leave\"        # only smoke tests for the Leave module\n\npytest -m \"critical and not slow\"          # critical tests, excluding known-slow ones\n\n@pytest.mark.smoke\n\n@pytest.mark.module_leave\n\n@pytest.mark.critical\n\ndef test_leave_request_approval_flow():",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Diagnosing and managing flaky tests systematically",
          "body": "Rather than just re-running a failing test until it passes, track flakiness data over time to distinguish \"genuinely flaky\" from \"actually broken.\"\n\nPointers: A dedicated flaky-test dashboard (many teams build this from CI history, or use a plugin/tool that tracks pass rate per test over many runs) is the professional approach — a test with an 80% pass rate over the last 50 runs is a real signal worth investigating (race condition, bad wait, shared test data), not something to just keep re-running around. Quarantining chronically flaky tests (marking them separately so\n\nthey don't block CI while being actively fixed) is a common practice rather than letting them erode trust in the whole suite.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Diagnosing and managing flaky tests systematically",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "# A simple pattern: log every retry attempt with pytest-rerunfailures",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "# A simple pattern: log every retry attempt with pytest-rerunfailures\n\npytest --reruns 2 --reruns-delay 1 -v",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Writing custom reporters/plugins",
          "body": "Pytest's plugin system (hooks) lets you customize behavior beyond built-in options — e.g., posting results to a team Slack channel, or reshaping output for a specific tool.\n\nWhat it does: A hook function pytest automatically calls after each test phase (setup/call/teardown), letting you react to results programmatically.\n\nTypes/params:\n\n(\"setup\"/\"call\"/\"teardown\"), .outcome, .passed/.failed/.skipped,\n\n.nodeid (the test's identifier)\n\nPointers: Custom hooks are pytest's extension mechanism — worth knowing they exist even if you don't write one immediately, since they're how most third-party pytest plugins (including pytest-html, pytest-rerunfailures themselves) are actually built.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Writing custom reporters/plugins",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "# conftest.py",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "# conftest.py\n\ndef pytest_runtest_logreport(report):\n\nif report.when == \"call\" and report.failed:\n\n# e.g., send a Slack notification, log to a custom system, etc.\n\nprint(f\"FAILED: {report.nodeid}\")\n\npytest_runtest_logreport(report) (pytest hook)",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Integrating with test management tools (TestRail, Xray)",
          "body": "These tools track manually-written test cases and requirements; integration links automated test results back to that tracking, so a stakeholder can see \"requirement X is covered by automated test Y, currently passing.\"\n\n...\n\nPointers: This is a strong area to lean into given your QA documentation background — the mapping between manual test cases (which you likely already know how to write well) and automated test IDs is often the piece automation-only engineers overlook, and it's exactly the kind of cross-functional value a QA-background-plus-automation-skills profile brings to a team.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Integrating with test management tools (TestRail, Xray)",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "# Common pattern: tag tests with the TestRail/Xray case ID",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "# Common pattern: tag tests with the TestRail/Xray case ID\n\n@pytest.mark.testrail_id(\"C1234\")\n\ndef test_leave_request_approval_flow():",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Test tagging and selective execution across large suites",
        "I practiced: Diagnosing and managing flaky tests systematically",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "30. Managing Test Suites at Scale deliverable",
        "brief": "Apply one idea from “Test tagging and selective execution across large suites” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Test tagging and selective execution across large suites Building directly on Chapter 13's markers, at scale you typically layer multiple tagging dimensions rather than one flat list: @pytest.mark.smoke @pytest.mark.module_leave @pytest.mark.critical def test_leave_request_approval_flow(): ... pytest -m \"smoke and module_leave\" # only smoke tests for the Leave module pytest -m \"critical and not sl",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-6-review",
      "phase": "Part 6 · Pro-Level Practices",
      "level": "pro",
      "title": "31. Code Review & Best Practices",
      "minutes": 40,
      "overview": "Naming conventions, DRY principles # Avoid: def test1(page): ... # Prefer: descriptive, scenario-revealing names def test_login_fails_with_incorrect_password(page): ...",
      "learn": [
        "Naming conventions, DRY principles",
        "Common anti-patterns in automation",
        "Documentation standards for shared frameworks"
      ],
      "steps": [
        {
          "title": "Naming conventions, DRY principles",
          "body": "...\n\n...\n\nPointers: A test name should describe the scenario and expected outcome well enough that a failure notification alone (just the test name, no need to open the code) tells a reader roughly what broke. DRY (Don't Repeat Yourself) in this context mainly means:\n\nobject method (Chapter 14) or a utility function (Chapter 29), not copy-pasted.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Naming conventions, DRY principles",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "# Prefer: descriptive, scenario-revealing names",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "# Prefer: descriptive, scenario-revealing names\n\ndef test_login_fails_with_incorrect_password(page):\n\nif the same locator or action sequence appears in three or more tests, it belongs in a page\n\n# Avoid:\n\ndef test1(page):",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Common anti-patterns in automation",
          "body": "explicit state-based waits (Chapter 8).\n\nevery minor markup refactor.\n\n(e.g., relying on data another test created). This breaks under parallel execution\n\n(Chapter 22) and makes debugging a failure much harder, since the \"real\" cause\n\nmight be in an unrelated test file.\n\ncorrect behavior.\n\nlogical grouping, instead of organized-by-feature files (Chapter 29's folder\n architecture).",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Common anti-patterns in automation",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Hardcoded waits (time.sleep()) instead of relying on auto-waiting or",
            "Brittle CSS selectors instead of role-based locators (Chapter 5), breaking on",
            "Order-dependent tests — a test that only passes if a different test ran first",
            "Overly broad assertions — asserting page.url != \"\" instead of asserting the actual expected URL, giving false confidence that doesn't actually verify",
            "God test files — one enormous test file covering an entire module with no"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Documentation standards for shared frameworks",
          "body": "A framework other engineers will onboard onto needs:\n\nonly this file.\n\nshopping cart as a side effect\").\n\npatterns, and folder structure decisions — so contributors don't reinvent or\n\ndiverge from established patterns.\n\nPointers: This chapter plays directly to your existing QA documentation strength — a framework with excellent test coverage but no documentation is nearly as hard to maintain as one with poor coverage, since new contributors can't safely extend what they don't understand.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Documentation standards for shared frameworks",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "A root README.md explaining setup steps (environment, install, first test run) — someone should be able to go from a fresh clone to a passing test run following",
            "Docstrings on non-obvious utility functions and page object methods, especially ones with side effects worth knowing about (e.g., \"this method also clears the",
            "A short \"conventions\" doc covering marker vocabulary (Chapter 13), naming"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Naming conventions, DRY principles",
        "I practiced: Common anti-patterns in automation",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "31. Code Review & Best Practices deliverable",
        "brief": "Apply one idea from “Naming conventions, DRY principles” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Naming conventions, DRY principles # Avoid: def test1(page): ... # Prefer: descriptive, scenario-revealing names def test_login_fails_with_incorrect_password(page): ...",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-6-perf",
      "phase": "Part 6 · Pro-Level Practices",
      "level": "pro",
      "title": "32. Performance Considerations",
      "minutes": 40,
      "overview": "Reducing test execution time The biggest wins, roughly in order of impact: 1. Auth session reuse (storage_state, Chapter 20) — skip repeated UI logins across the suite.",
      "learn": [
        "Reducing test execution time",
        "2. API-based test data setup (Chapter 18) — skip slow UI flows for state that",
        "Optimizing locators and waits",
        "Worker/parallelization tuning",
        "Part 7: Real-World Project & Job"
      ],
      "steps": [
        {
          "title": "Reducing test execution time",
          "body": "The biggest wins, roughly in order of impact:\n\n1. Auth session reuse (storage_state, Chapter 20) — skip repeated UI logins\n across the suite.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Reducing test execution time",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "2. API-based test data setup (Chapter 18) — skip slow UI flows for state that",
          "body": "isn't the thing being tested.\n 3. Parallel execution (pytest-xdist, Chapter 22) — run independent tests\n concurrently.\n 4. Blocking unnecessary resources (images/fonts/ads, Chapter 17) — skip\n network weight the test doesn't need.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "2. API-based test data setup (Chapter 18) — skip slow UI flows for state that",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Optimizing locators and waits",
          "body": "# Slower — CSS selector requiring more DOM traversal, less resilient\n\n# Faster and clearer — role-based, resilient\n\nPointers: Role-based locators aren't just more resilient (Chapter 5) — they're also generally faster to resolve than deeply nested CSS selectors, since Playwright's accessibility-tree lookup avoids walking a long DOM chain. Avoid unnecessary explicit waits stacked on top of already-auto-waiting actions (Chapter 8) — redundant waits (wait_for_timeout() \"just in case\" before a click that already auto-waits) add pure dead time across a whole suite for zero benefit.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Optimizing locators and waits",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "page.locator(\"div.container > ul.list > li:nth-child(3) > button\").click()",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "page.locator(\"div.container > ul.list > li:nth-child(3) > button\").click()\n\npage.get_by_role(\"button\", name=\"Delete\").nth(2).click()",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Worker/parallelization tuning",
          "body": "Pointers: More workers isn't strictly better past a certain point — CPU core count, memory available for multiple simultaneous browser instances, and any shared external resource (a rate-limited test API, a shared staging database) all impose real ceilings. The right worker count is something to measure on your actual CI hardware (try a few values, compare total suite time) rather than guess — a common mistake is assuming worker count should always match CPU core count exactly, when memory pressure from many simultaneous browser instances is often the tighter constraint in practice.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Worker/parallelization tuning",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "pytest -n 4     # 4 workers",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "pytest -n 4     # 4 workers\n\npytest -n 8     # 8 workers — not necessarily 2x faster",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Part 7: Real-World Project & Job",
          "body": "(Explanations + Function Reference)",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Part 7: Real-World Project & Job",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Reducing test execution time",
        "I practiced: 2. API-based test data setup (Chapter 18) — skip slow UI flows for state that",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "32. Performance Considerations deliverable",
        "brief": "Apply one idea from “Reducing test execution time” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Reducing test execution time The biggest wins, roughly in order of impact: 1. Auth session reuse (storage_state, Chapter 20) — skip repeated UI logins across the suite.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-cp-pro",
      "phase": "Part 6 · Pro",
      "level": "checkpoint",
      "kind": "checkpoint",
      "title": "Checkpoint — Pro Practices",
      "minutes": 45,
      "overview": "Framework layout, suite governance, review habits, and performance tradeoffs are intentional.",
      "learn": [
        "Framework layout, suite governance, review habits, and performance tradeoffs are intentional."
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "Framework layout, suite governance, review habits, and performance tradeoffs are intentional.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Pass criteria",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "A checkpoint is done when…",
            "options": [
              "You bookmarked the docs",
              "You can demo the criteria without notes",
              "You skipped practice",
              "You only watched a video"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Record a 2-minute Loom/demo proving the criteria.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Framework layout, suite governance, review habits, and performance tradeoffs are intentional.",
        "Demo recorded or peer-reviewed"
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Framework layout, suite governance, review habits, and performance tradeoffs are intentional.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-7-capstone",
      "phase": "Part 7 · Real-World Project & Job Readiness",
      "level": "pro",
      "title": "33. Real-World Capstone Project",
      "minutes": 90,
      "overview": "End-to-end framework build (login, CRUD flow, API validation) The capstone ties together nearly every prior chapter into one cohesive project rather than isolated exercises. A solid scope for a portfolio-worthy capstone: ● Login — using POM (Chapter 14), with a session-reuse fixture (Chapter 20) so login only happens once per run, not once per test.",
      "learn": [
        "End-to-end framework build (login, CRUD flow, API validation)",
        "Combining UI + API + auth + CI/CD in one suite",
        "Code review and refactor pass"
      ],
      "steps": [
        {
          "title": "End-to-end framework build (login, CRUD flow, API validation)",
          "body": "The capstone ties together nearly every prior chapter into one cohesive project rather than isolated exercises. A solid scope for a portfolio-worthy capstone:\n\nlogin only happens once per run, not once per test.\n\ncover Create, Read, Update, Delete end-to-end through the UI.\n\ncorrectly server-side, not just that the UI looked right.\n\ntasks_page = TasksPage(authenticated_page)\n\nresponse = request.get(\"/api/tasks?title=Finish QA report\")\n\ntask_id = response.json()[\"tasks\"][0][\"id\"]\n\nfollow_up = request.get(f\"/api/tasks/{task_id}\")\n\nPointers: The API-validation steps are what elevate this from \"a UI clicker\" to a genuine full-stack test — it's a detail interviewers specifically listen for, since it demonstrates you understand that UI success and data-layer success are two different things worth verifying independently.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "End-to-end framework build (login, CRUD flow, API validation)",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "assert response.json()[\"tasks\"][0][\"due_date\"] == \"2026-08-10\"\n\n# Update\n\ntasks_page.edit_task(\"Finish QA report\", new_title=\"Finish QA report v2\")\n\nexpect(authenticated_page.get_by_text(\"Finish QA report v2\")).to_be_visible()\n\n# Delete\n\ntasks_page.delete_task(\"Finish QA report v2\")\n\nexpect(authenticated_page.get_by_text(\"Finish QA report v2\")).not_to_be_visible()\n\n# API validation of deletion\n\n# Create\n\ntasks_page.create_task(\"Finish QA report\", due_date=\"2026-08-10\")\n\nexpect(authenticated_page.get_by_text(\"Finish QA report\")).to_be_visible()\n\n# API validation of creation\n\n# tests/test_task_crud.py\n\nfrom pages.tasks_page import TasksPage\n\ndef test_create_read_update_delete_task(authenticated_page, request):",
          "codeTitle": null,
          "items": [
            "Login — using POM (Chapter 14), with a session-reuse fixture (Chapter 20) so",
            "CRUD flow — pick one feature (e.g., a \"tasks\" or \"leave requests\" module) and",
            "API validation — for at least the Create and Delete steps, verify the result via a direct API call (Chapter 18) as well as the UI, proving the data actually persisted"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Combining UI + API + auth + CI/CD in one suite",
          "body": "The full picture: conftest.py wires together the session-scoped auth fixture (Chapter\n\n20), the request fixture for API calls (Chapter 18), and the whole thing runs automatically via a GitHub Actions workflow (Chapter 25) on every push, publishing an HTML or Allure report as an artifact (Chapter 26).\n\nPointers: Getting this pipeline green end-to-end — not just passing locally — is the real milestone. A huge amount of practical learning happens specifically in the friction of getting something to run correctly in CI that worked fine locally (missing --with-deps, environment variable differences, headless-only quirks) — don't skip actually pushing this to GitHub and watching Actions run it.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Combining UI + API + auth + CI/CD in one suite",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Code review and refactor pass",
          "body": "Once the capstone works, deliberately revisit it against Chapter 31's anti-patterns checklist:\n\nPointers: This refactor pass is itself a valuable, showable skill — if you're asked in an interview \"tell me about a time you improved code quality,\" a concrete before/after from this exact refactor pass is a strong, specific answer.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Code review and refactor pass",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Any hardcoded waits sneak in while you were focused on \"just get it working\"?",
            "Any locators that should be role-based but ended up as brittle CSS?",
            "Any test that secretly depends on another test's leftover data?",
            "Is cleanup happening reliably via fixture teardown (Chapter 16), even on failure?"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: End-to-end framework build (login, CRUD flow, API validation)",
        "I practiced: Combining UI + API + auth + CI/CD in one suite",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "33. Real-World Capstone Project deliverable",
        "brief": "Apply one idea from “End-to-end framework build (login, CRUD flow, API validation)” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "End-to-end framework build (login, CRUD flow, API validation) The capstone ties together nearly every prior chapter into one cohesive project rather than isolated exercises. A solid scope for a portfolio-worthy capstone: ● Login — using POM (Chapter 14), with a session-reuse fixture (Chapter 20) so login only happens once per run, not once per test.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-7-portfolio",
      "phase": "Part 7 · Real-World Project & Job Readiness",
      "level": "pro",
      "title": "34. Portfolio Building",
      "minutes": 45,
      "overview": "Structuring a GitHub repo for recruiters your-playwright-framework/ ├── .github/workflows/playwright.yml ├── pages/ ├── tests/ ├── utils/ ├── config/ ├── conftest.py ├── pytest.ini ├── requirements.txt ├── README.md └── docs/ └── architecture.md Pointers: A recruiter or hiring manager typically skims a repo for under a minute before deciding whether to look closer — a clean, familiar structure (ma",
      "learn": [
        "GitHub repo for recruiters",
        "Writing a README that showcases the framework",
        "3. `pytest --browser chromium --html=report.html`",
        "Recording a short demo walkthrough"
      ],
      "steps": [
        {
          "title": "GitHub repo for recruiters",
          "body": "your-playwright-framework/\n\n├── .github/workflows/playwright.yml\n\n├── pages/\n\n├── tests/\n\n├── utils/\n\n├── config/\n\n├── conftest.py\n\n├── pytest.ini\n\n├── requirements.txt\n\n├── README.md\n\n└── docs/\n\n└── architecture.md\n\nPointers: A recruiter or hiring manager typically skims a repo for under a minute before deciding whether to look closer — a clean, familiar structure (matching the enterprise-grade layout from Chapter 29) signals competence immediately, before they've read a single line of actual test code.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "GitHub repo for recruiters",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Writing a README that showcases the framework",
          "body": "A strong README answers, in order: what this project demonstrates, how to run it, and why it's built the way it is — not just \"how to run tests.\"\n\nA full-stack UI + API test automation framework built with Playwright and pytest,\n\ndemonstrating Page Object Model architecture, CI/CD integration, and\n\ncombined UI/API validation.\n\n- Page Object Model with a shared base page\n\n- Auth session reuse via storage_state (fast, no repeated logins)\n\n- Combined UI + API testing for full-stack validation\n\n- GitHub Actions CI pipeline with HTML reporting\n\n- Data-driven tests via pytest parametrize",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Writing a README that showcases the framework",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "# Playwright + Python Test Automation Framework",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "# Playwright + Python Test Automation Framework\n\n## What this demonstrates\n\n## Running locally",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "3. `pytest --browser chromium --html=report.html`",
          "body": "See `docs/architecture.md` for folder structure and design decisions.\n\nPointers: Explicitly naming the patterns demonstrated (POM, session reuse, CI integration) in the README does real work — it's often the first and only place a time-pressed reviewer looks to judge whether you understand the \"why,\" not just the \"how.\"",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "3. `pytest --browser chromium --html=report.html`",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": "## Architecture",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Recording a short demo walkthrough",
          "body": "A 2–3 minute screen recording showing: the suite running in the terminal, a quick look at the folder structure, and maybe the HTML/Allure report it produces.\n\nPointers: This is a low-effort, high-impact addition — most candidate repos don't include one, so it's a genuine differentiator, and it lets a reviewer \"see it work\" without needing to clone and set the project up themselves.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Recording a short demo walkthrough",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: GitHub repo for recruiters",
        "I practiced: Writing a README that showcases the framework",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "34. Portfolio Building deliverable",
        "brief": "Apply one idea from “GitHub repo for recruiters” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Structuring a GitHub repo for recruiters your-playwright-framework/ ├── .github/workflows/playwright.yml ├── pages/ ├── tests/ ├── utils/ ├── config/ ├── conftest.py ├── pytest.ini ├── requirements.txt ├── README.md └── docs/ └── architecture.md Pointers: A recruiter or hiring manager typically skims a repo for under a minute before deciding whether to look closer — a clean, familiar structure (ma",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-7-interview",
      "phase": "Part 7 · Real-World Project & Job Readiness",
      "level": "pro",
      "title": "35. Interview Prep",
      "minutes": 50,
      "overview": "Common Playwright/automation interview questions A representative set worth being able to answer fluently, not memorized verbatim: ● \"Why Playwright over Selenium?\" — auto-waiting, native multi-browser support, modern web app compatibility (Part 0/1). ● \"What's the Browser/Context/Page hierarchy, and why does it matter?\" (Part 1, Chapter 3).",
      "learn": [
        "Common Playwright/automation interview questions",
        "Scenario-based problem solving",
        "Explaining POM, fixtures, and CI setup to interviewers"
      ],
      "steps": [
        {
          "title": "Common Playwright/automation interview questions",
          "body": "A representative set worth being able to answer fluently, not memorized verbatim:\n\nmodern web app compatibility (Part 0/1).\n\nChapter 3).\n\nhardcoded sleeps, and systematic flaky-test tracking (Chapter 30) rather than \"I\n just add retries.\"\n\n17).\n\nsetup (Chapter 32).",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Common Playwright/automation interview questions",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "\"Why Playwright over Selenium?\" — auto-waiting, native multi-browser support,",
            "\"What's the Browser/Context/Page hierarchy, and why does it matter?\" (Part 1,",
            "\"How do you handle flaky tests?\" — distinguish auto-waiting/explicit waits from",
            "\"Explain the Page Object Model and why you'd use it\" (Chapter 14).",
            "\"How would you test [X] without a real backend?\" — network mocking (Chapter",
            "\"How do you speed up a slow test suite?\" — parallelization, auth reuse, API-based"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Scenario-based problem solving",
          "body": "Interviewers often prefer live scenarios over recited definitions:\n\nViewer (Chapter 24) as the concrete tool.\n\nwhere you'd add both UI and API assertions.\n\nPointers: The strongest answers connect a general principle to a specific tool/method by name (e.g., \"I'd check the Trace Viewer output first\" rather than \"I'd look into it\") — it signals hands-on experience rather than surface-level familiarity.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Scenario-based problem solving",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "\"This test passes locally but fails in CI — how do you debug it?\" — walk through: headless-specific behavior, missing --with-deps, environment variable differences, timing differences on a slower CI machine, and reach for Trace",
            "\"How would you design tests for a multi-step checkout flow?\" — talk through POM per step/page, API-based cart setup to skip repetitive earlier steps, and"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Explaining POM, fixtures, and CI setup to interviewers",
          "body": "Practice a tight, concrete explanation for each rather than a textbook definition:\n\nupdating one file instead of every test that touches that element.\"\n\nin fresh before every test.\"\n\ndebuggable without re-running locally.\"\n\nPointers: Being able to explain why a decision was made (not just what it does) is consistently what separates a strong interview answer from a shallow one — this mirrors the \"explain the why\" thread running through this entire manual.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Explaining POM, fixtures, and CI setup to interviewers",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "POM: \"Each page's locators and actions live in one class, so a UI change means",
            "Fixtures: \"Reusable setup/teardown — for example, a session-scoped fixture that logs in once and shares that session across the whole suite, instead of logging",
            "CI setup: \"Tests run automatically on every pull request via GitHub Actions, with the HTML report published as a downloadable artifact so failures are"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Common Playwright/automation interview questions",
        "I practiced: Scenario-based problem solving",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "35. Interview Prep deliverable",
        "brief": "Apply one idea from “Common Playwright/automation interview questions” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Common Playwright/automation interview questions A representative set worth being able to answer fluently, not memorized verbatim: ● \"Why Playwright over Selenium?\" — auto-waiting, native multi-browser support, modern web app compatibility (Part 0/1). ● \"What's the Browser/Context/Page hierarchy, and why does it matter?\" (Part 1, Chapter 3).",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-7-career",
      "phase": "Part 7 · Real-World Project & Job Readiness",
      "level": "pro",
      "title": "36. Career Positioning",
      "minutes": 40,
      "overview": "Framing manual QA experience alongside automation skills Your manual QA background isn't a gap to work around — it's the foundation automation skill sits on top of. Concretely: ● You already understand test design (edge cases, boundary conditions, negative testing) — automation is a new execution mechanism for that same skill, not a replacement for it.",
      "learn": [
        "Framing manual QA experience alongside automation skills",
        "Resume bullet points for automation projects",
        "Weak: \"Used Playwright and Python for testing.\"",
        "Page Object Model architecture, combining UI and API validation and"
      ],
      "steps": [
        {
          "title": "Framing manual QA experience alongside automation skills",
          "body": "Your manual QA background isn't a gap to work around — it's the foundation automation skill sits on top of. Concretely:\n\ntesting) — automation is a new execution mechanism for that same skill, not a\n\nreplacement for it.\n\nskills that directly inform writing clear test assertions and failure messages.\n\ndifferentiator — many automation-only engineers write poorly documented\n\nframeworks; you're positioned to avoid that specific weakness.\n\nPointers: In interviews and on a resume, frame it as addition, not transition — \"manual QA tester who added automation skills\" reads as a more complete profile than trying to present as a from-scratch automation engineer with no other context, since the latter invites direct comparison against candidates with more raw coding experience than you may currently have.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Framing manual QA experience alongside automation skills",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "You already understand test design (edge cases, boundary conditions, negative",
            "You already understand bug reporting, reproduction steps, and severity triage —",
            "Experience with QA documentation (your Bizlevate background) is a genuine"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Resume bullet points for automation projects",
          "body": "Effective bullets focus on concrete outcomes and named techniques, not just tool lists:",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Resume bullet points for automation projects",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Weak: \"Used Playwright and Python for testing.\"",
          "body": "Strong: \"Built a Playwright + Python + pytest automation framework using",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Weak: \"Used Playwright and Python for testing.\"",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Page Object Model architecture, combining UI and API validation and",
          "body": "integrating with GitHub Actions CI, reducing manual regression testing\n\ntime for [X module] by [Y].\"\n\nPointers: Where you have real numbers (time saved, defects caught, test count), use them — but don't fabricate metrics you don't actually have; a specific, honest description of scope (\"built an end-to-end framework covering login, CRUD, and API validation for a [type] application\") is more credible and interview-defensible than an inflated, vague claim that falls apart under a follow-up question.\n\nContinuing the reference library — additional categories worth bookmarking as your automation practice matures.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Page Object Model architecture, combining UI and API validation and",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Framing manual QA experience alongside automation skills",
        "I practiced: Resume bullet points for automation projects",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "36. Career Positioning deliverable",
        "brief": "Apply one idea from “Framing manual QA experience alongside automation skills” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Framing manual QA experience alongside automation skills Your manual QA background isn't a gap to work around — it's the foundation automation skill sits on top of. Concretely: ● You already understand test design (edge cases, boundary conditions, negative testing) — automation is a new execution mechanism for that same skill, not a replacement for it.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-cp-career",
      "phase": "Part 7 · Career",
      "level": "checkpoint",
      "kind": "checkpoint",
      "title": "Checkpoint — Job Ready",
      "minutes": 45,
      "overview": "Capstone README + demo link + three interview stories written.",
      "learn": [
        "Capstone README + demo link + three interview stories written."
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "Capstone README + demo link + three interview stories written.",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Pass criteria",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "A checkpoint is done when…",
            "options": [
              "You bookmarked the docs",
              "You can demo the criteria without notes",
              "You skipped practice",
              "You only watched a video"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Record a 2-minute Loom/demo proving the criteria.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Capstone README + demo link + three interview stories written.",
        "Demo recorded or peer-reviewed"
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Capstone README + demo link + three interview stories written.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-8-books",
      "phase": "Part 8 · Resources",
      "level": "reference",
      "title": "52. Books & Long-Form Reading",
      "minutes": 20,
      "overview": "● \"Python Testing with pytest\" by Brian Okken — foundational pytest knowledge that underpins pytest-playwright ● \"Fluent Python\" — for writing cleaner, more idiomatic framework code ● General test-automation architecture books (POM, design patterns for QA) — not Playwright-specific but transferable ● Whitepapers/case studies published by companies who migrated to Playwright at scale",
      "learn": [
        "● \"Python Testing with pytest\" by Brian Okken — foundational pytest knowledge th"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "Key points:",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "\"Python Testing with pytest\" by Brian Okken — foundational pytest knowledge that underpins pytest-playwright",
            "\"Fluent Python\" — for writing cleaner, more idiomatic framework code",
            "General test-automation architecture books (POM, design patterns for QA) — not Playwright-specific but transferable",
            "Whitepapers/case studies published by companies who migrated to Playwright at scale"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "52. Books & Long-Form Reading deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "● \"Python Testing with pytest\" by Brian Okken — foundational pytest knowledge that underpins pytest-playwright ● \"Fluent Python\" — for writing cleaner, more idiomatic framework code ● General test-automation architecture books (POM, design patterns for QA) — not Playwright-specific but transferable ● Whitepapers/case studies published by companies who migrated to Playwright at scale",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-8-blogs",
      "phase": "Part 8 · Resources",
      "level": "reference",
      "title": "53. Blogs & Written Tutorials",
      "minutes": 15,
      "overview": "● Official Playwright blog (release announcements, feature rationale) ● Individual QA engineer blogs on Medium/Dev.to/Hashnode tagged \"playwright-python\" ● Company engineering blogs (e.g., from teams that document their migration or scaling journey) ● Personal portfolio blogs from automation leads — often show real POM structures",
      "learn": [
        "● Official Playwright blog (release announcements, feature rationale) ● Individu"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "scaling journey)",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Official Playwright blog (release announcements, feature rationale)",
            "Individual QA engineer blogs on Medium/Dev.to/Hashnode tagged \"playwright-python\"",
            "Company engineering blogs (e.g., from teams that document their migration or",
            "Personal portfolio blogs from automation leads — often show real POM structures"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "53. Blogs & Written Tutorials deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "● Official Playwright blog (release announcements, feature rationale) ● Individual QA engineer blogs on Medium/Dev.to/Hashnode tagged \"playwright-python\" ● Company engineering blogs (e.g., from teams that document their migration or scaling journey) ● Personal portfolio blogs from automation leads — often show real POM structures",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-8-newsletters",
      "phase": "Part 8 · Resources",
      "level": "reference",
      "title": "54. Newsletters",
      "minutes": 10,
      "overview": "● Software testing-focused newsletters (e.g., Ministry of Testing's newsletter) that regularly cover Playwright updates ● Python Weekly / PyCoder's Weekly — occasional Playwright-Python coverage ● Browser engine/web platform newsletters — useful for understanding what's changing under the hood",
      "learn": [
        "● Software testing-focused newsletters (e.g., Ministry of Testing's newsletter) "
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "Key points:",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Software testing-focused newsletters (e.g., Ministry of Testing's newsletter) that regularly cover Playwright updates",
            "Python Weekly / PyCoder's Weekly — occasional Playwright-Python coverage",
            "Browser engine/web platform newsletters — useful for understanding what's changing under the hood"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "54. Newsletters deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "● Software testing-focused newsletters (e.g., Ministry of Testing's newsletter) that regularly cover Playwright updates ● Python Weekly / PyCoder's Weekly — occasional Playwright-Python coverage ● Browser engine/web platform newsletters — useful for understanding what's changing under the hood",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-8-podcasts",
      "phase": "Part 8 · Resources",
      "level": "reference",
      "title": "55. Podcasts",
      "minutes": 10,
      "overview": "● Testing-focused podcasts (e.g., \"TestGuild,\" \"The Testing Show\") with Playwright-specific episodes ● General Python podcasts that occasionally cover test automation tooling ● Maintainer interviews/AMAs on software testing podcasts",
      "learn": [
        "● Testing-focused podcasts (e.g., \"TestGuild,\" \"The Testing Show\") with Playwrig"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "Key points:",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Testing-focused podcasts (e.g., \"TestGuild,\" \"The Testing Show\") with Playwright-specific episodes",
            "General Python podcasts that occasionally cover test automation tooling",
            "Maintainer interviews/AMAs on software testing podcasts"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "55. Podcasts deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "● Testing-focused podcasts (e.g., \"TestGuild,\" \"The Testing Show\") with Playwright-specific episodes ● General Python podcasts that occasionally cover test automation tooling ● Maintainer interviews/AMAs on software testing podcasts",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-8-courses",
      "phase": "Part 8 · Resources",
      "level": "reference",
      "title": "56. Courses & Structured Learning Platforms",
      "minutes": 20,
      "overview": "● Udemy/Coursera Playwright with Python courses (structured, project-based) ● LinkedIn Learning automation testing tracks ● Test Automation University (free, vendor-agnostic courses including Playwright modules) ● Official Microsoft Learn modules referencing Playwright (if available)",
      "learn": [
        "● Udemy/Coursera Playwright with Python courses (structured, project-based) ● Li"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "modules)",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Udemy/Coursera Playwright with Python courses (structured, project-based)",
            "LinkedIn Learning automation testing tracks",
            "Test Automation University (free, vendor-agnostic courses including Playwright",
            "Official Microsoft Learn modules referencing Playwright (if available)"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "56. Courses & Structured Learning Platforms deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "● Udemy/Coursera Playwright with Python courses (structured, project-based) ● LinkedIn Learning automation testing tracks ● Test Automation University (free, vendor-agnostic courses including Playwright modules) ● Official Microsoft Learn modules referencing Playwright (if available)",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-8-certs",
      "phase": "Part 8 · Resources",
      "level": "reference",
      "title": "57. Certifications",
      "minutes": 15,
      "overview": "● ISTQB (general testing foundation — not Playwright-specific, but often expected alongside tool skills) ● Vendor/community-issued Playwright certificates of completion (from course platforms above) ● Internal company certification tracks, if your organization has one",
      "learn": [
        "● ISTQB (general testing foundation — not Playwright-specific, but often expecte"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "alongside tool skills)\n\nplatforms above)",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "ISTQB (general testing foundation — not Playwright-specific, but often expected",
            "Vendor/community-issued Playwright certificates of completion (from course",
            "Internal company certification tracks, if your organization has one"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "57. Certifications deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "● ISTQB (general testing foundation — not Playwright-specific, but often expected alongside tool skills) ● Vendor/community-issued Playwright certificates of completion (from course platforms above) ● Internal company certification tracks, if your organization has one",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-8-conferences",
      "phase": "Part 8 · Resources",
      "level": "reference",
      "title": "58. Conferences & Talks",
      "minutes": 15,
      "overview": "● SeleniumConf / TestJS Summit — cross-tool automation conference talks ● PyCon talks on testing and automation (search \"playwright\" in PyCon archives) ● Ministry of Testing's TestBash conference sessions ● Recorded keynote/AMA sessions from Playwright maintainers at Microsoft Build or similar events",
      "learn": [
        "● SeleniumConf / TestJS Summit — cross-tool automation conference talks ● PyCon "
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "Key points:",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "SeleniumConf / TestJS Summit — cross-tool automation conference talks",
            "PyCon talks on testing and automation (search \"playwright\" in PyCon archives)",
            "Ministry of Testing's TestBash conference sessions",
            "Recorded keynote/AMA sessions from Playwright maintainers at Microsoft Build or similar events"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "58. Conferences & Talks deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "● SeleniumConf / TestJS Summit — cross-tool automation conference talks ● PyCon talks on testing and automation (search \"playwright\" in PyCon archives) ● Ministry of Testing's TestBash conference sessions ● Recorded keynote/AMA sessions from Playwright maintainers at Microsoft Build or similar events",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-8-social",
      "phase": "Part 8 · Resources",
      "level": "reference",
      "title": "59. Social & Real-Time Communities",
      "minutes": 15,
      "overview": "● X/Twitter accounts of Playwright maintainers and core contributors — early signal on roadmap ● LinkedIn groups for QA automation professionals ● Playwright's official Discord (real-time help, maintainer presence) ● Slack communities for test automation (Ministry of Testing Slack, regional QA meetup Slacks)",
      "learn": [
        "● X/Twitter accounts of Playwright maintainers and core contributors — early sig"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "meetup Slacks)",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "X/Twitter accounts of Playwright maintainers and core contributors — early signal on roadmap",
            "LinkedIn groups for QA automation professionals",
            "Playwright's official Discord (real-time help, maintainer presence)",
            "Slack communities for test automation (Ministry of Testing Slack, regional QA"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "59. Social & Real-Time Communities deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "● X/Twitter accounts of Playwright maintainers and core contributors — early signal on roadmap ● LinkedIn groups for QA automation professionals ● Playwright's official Discord (real-time help, maintainer presence) ● Slack communities for test automation (Ministry of Testing Slack, regional QA meetup Slacks)",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-8-extensions",
      "phase": "Part 8 · Resources",
      "level": "reference",
      "title": "60. Browser Extensions & Developer Tools",
      "minutes": 15,
      "overview": "● Chrome/Firefox DevTools (Elements, Network tabs) — essential for building locators and debugging ● Accessibility inspector extensions (axe DevTools browser extension) — pairs with axe-core testing ● Locator-picker style extensions that complement Playwright's own Codegen tool",
      "learn": [
        "● Chrome/Firefox DevTools (Elements, Network tabs) — essential for building loca"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "Key points:",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Chrome/Firefox DevTools (Elements, Network tabs) — essential for building locators and debugging",
            "Accessibility inspector extensions (axe DevTools browser extension) — pairs with axe-core testing",
            "Locator-picker style extensions that complement Playwright's own Codegen tool"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "60. Browser Extensions & Developer Tools deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "● Chrome/Firefox DevTools (Elements, Network tabs) — essential for building locators and debugging ● Accessibility inspector extensions (axe DevTools browser extension) — pairs with axe-core testing ● Locator-picker style extensions that complement Playwright's own Codegen tool",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-8-comparisons",
      "phase": "Part 8 · Resources",
      "level": "reference",
      "title": "61. Comparison & Decision-Making References",
      "minutes": 15,
      "overview": "● State of JS / State of Testing surveys — annual data on tool adoption trends ● Vendor-neutral comparison articles (Playwright vs Cypress vs Selenium vs WebdriverIO) ● Framework benchmark repositories (community-run speed/reliability comparisons)",
      "learn": [
        "● State of JS / State of Testing surveys — annual data on tool adoption trends ●"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "WebdriverIO)\n\ncomparisons)",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "State of JS / State of Testing surveys — annual data on tool adoption trends",
            "Vendor-neutral comparison articles (Playwright vs Cypress vs Selenium vs",
            "Framework benchmark repositories (community-run speed/reliability"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "61. Comparison & Decision-Making References deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "● State of JS / State of Testing surveys — annual data on tool adoption trends ● Vendor-neutral comparison articles (Playwright vs Cypress vs Selenium vs WebdriverIO) ● Framework benchmark repositories (community-run speed/reliability comparisons)",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-8-glossary",
      "phase": "Part 8 · Resources",
      "level": "reference",
      "title": "62. Glossary of Terms",
      "minutes": 20,
      "overview": "● A living glossary of terms used throughout this manual: locator, fixture, flaky test, auto-waiting, storage state, trace, sharding, POM, etc. ● Recommend maintaining this as a one-page internal reference for onboarding new team members ● Update it whenever the team adopts new Playwright terminology (e.g., new API additions)",
      "learn": [
        "● A living glossary of terms used throughout this manual: locator, fixture, flak",
        "● Recommend maintaining this as a one-page internal reference for onboarding new"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "auto-waiting, storage state, trace, sharding, POM, etc.\n\nadditions)",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "A living glossary of terms used throughout this manual: locator, fixture, flaky test,",
            "Recommend maintaining this as a one-page internal reference for onboarding new team members",
            "Update it whenever the team adopts new Playwright terminology (e.g., new API"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "62. Glossary of Terms deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "● A living glossary of terms used throughout this manual: locator, fixture, flaky test, auto-waiting, storage state, trace, sharding, POM, etc. ● Recommend maintaining this as a one-page internal reference for onboarding new team members ● Update it whenever the team adopts new Playwright terminology (e.g., new API additions)",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-8-practice",
      "phase": "Part 8 · Resources",
      "level": "reference",
      "title": "63. Sample Data & Practice Sites",
      "minutes": 15,
      "overview": "● Public \"practice\" websites built for automation training (e.g., demo e-commerce sites, form-heavy test sites) ● Playwright's own test fixtures/demo apps used in their official examples repo ● Open API sandboxes (e.g., public REST test APIs) for practicing the API-testing chapters",
      "learn": [
        "● Public \"practice\" websites built for automation training (e.g., demo e-commerc"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "sites, form-heavy test sites)",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Public \"practice\" websites built for automation training (e.g., demo e-commerce",
            "Playwright's own test fixtures/demo apps used in their official examples repo",
            "Open API sandboxes (e.g., public REST test APIs) for practicing the API-testing chapters"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "63. Sample Data & Practice Sites deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "● Public \"practice\" websites built for automation training (e.g., demo e-commerce sites, form-heavy test sites) ● Playwright's own test fixtures/demo apps used in their official examples repo ● Open API sandboxes (e.g., public REST test APIs) for practicing the API-testing chapters",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pw-8-ecosystem",
      "phase": "Part 8 · Resources",
      "level": "reference",
      "title": "64. Staying Plugged Into the Ecosystem",
      "minutes": 15,
      "overview": "● GitHub \"Watch\" the Playwright repo for release notifications ● Follow the Python Package Index (PyPI) page for playwright and pytest-playwright version history ● Bookmark the \"Migration guides\" section of official docs — reviewed every major version bump ● Set a recurring calendar reminder (quarterly) to review this entire resource list for dead links or better replacements",
      "learn": [
        "● GitHub \"Watch\" the Playwright repo for release notifications ● Follow the Pyth"
      ],
      "steps": [
        {
          "title": "Overview",
          "body": "Key points:",
          "learnMore": null,
          "image": {
            "src": "covers/playwright-cover.png",
            "alt": "Overview",
            "stickies": null
          },
          "resources": [
            {
              "label": "Docs",
              "url": "https://playwright.dev/python/docs/intro",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Run / study this snippet",
            "code": "for dead links or better replacements",
            "result": "Matches the manual’s example behavior when the page under test cooperates."
          },
          "doThis": null,
          "tip": null,
          "code": "for dead links or better replacements\n\npytest-playwright version history",
          "codeTitle": null,
          "items": [
            "GitHub \"Watch\" the Playwright repo for release notifications",
            "Follow the Python Package Index (PyPI) page for playwright and",
            "Bookmark the \"Migration guides\" section of official docs — reviewed every major version bump",
            "Set a recurring calendar reminder (quarterly) to review this entire resource list"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain: Overview",
        "I noted one takeaway in LEARNING.md"
      ],
      "practice": {
        "title": "64. Staying Plugged Into the Ecosystem deliverable",
        "brief": "Apply one idea from “Overview” in a small script or note."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright Python Docs",
          "url": "https://playwright.dev/python/docs/intro",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "● GitHub \"Watch\" the Playwright repo for release notifications ● Follow the Python Package Index (PyPI) page for playwright and pytest-playwright version history ● Bookmark the \"Migration guides\" section of official docs — reviewed every major version bump ● Set a recurring calendar reminder (quarterly) to review this entire resource list for dead links or better replacements",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    }
  ]
};
