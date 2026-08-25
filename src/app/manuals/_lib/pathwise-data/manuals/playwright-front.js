import { ch } from '../helpers.js'

const docs = [{ label: 'Docs', url: 'https://playwright.dev/python/docs/intro', kind: 'Docs' }]
const resDoc = {
  type: 'doc',
  name: 'Playwright Python Docs',
  url: 'https://playwright.dev/python/docs/intro',
  lang: 'EN',
  free: true,
}

/**
 * Part 0–1 front matter rewritten from the exhaustive Playwright PDF.
 * Stable chapter IDs — merged over the generated stubs in playwright-python.js.
 */
export const playwrightFrontChapters = [
  ch({
    id: 'pw-0-what',
    phase: 'Part 0 · Background',
    level: 'beginner',
    title: '0. What is Playwright, Really',
    minutes: 35,
    durationLabel: 'Day 1',
    overview:
      'Playwright’s origin story matters more than it seems. The engineers who built it came from Puppeteer — and designed a second attempt for modern multi-browser web apps.',
    learn: [
      'History — Microsoft, Puppeteer lineage, Jan 2020 public release',
      'Open-source, MIT, funded engineering cadence',
      'Why it was created: Selenium flakiness, Chrome-only Puppeteer, modern web gaps',
    ],
    steps: [
      {
        title: 'History — built by Microsoft, evolved from the Puppeteer team',
        aside: 'Why the origin story shows up in interviews',
        body: 'Playwright’s origin story matters more than it seems on the surface. The core engineers who built Playwright — most notably Andrey Lushnikov, Pavel Feldman, and Boris Yankov — were previously on the team at Google that built and maintained Puppeteer, the Node.js library for controlling headless Chrome. When they moved to Microsoft, they took everything they’d learned from Puppeteer’s limitations and built something new instead of iterating on the old codebase.\n\nThis “second attempt by the same people” origin is why Playwright feels less like a patched-together tool and more like a deliberately designed one. Puppeteer was built specifically for Chrome/Chromium via the Chrome DevTools Protocol (CDP). Its creators knew intimately where that architecture broke down — mainly, it couldn’t reliably control Firefox or Safari/WebKit. Playwright was designed from day one to solve that: a single API surface that talks to all three major browser engines.\n\nFirst released publicly in January 2020, Playwright is comparatively young next to Selenium (which dates back to 2004). That youth is actually a selling point in interviews — it means the tool was designed with full knowledge of modern web apps (SPAs, shadow DOM, complex async behavior) rather than retrofitted onto assumptions from the mid-2000s web.',
        resources: docs,
        quiz: {
          question: 'Playwright’s core engineers previously built which tool?',
          options: ['Selenium IDE', 'Puppeteer', 'Cypress', 'Watir'],
          answer: 1,
          explain: 'Andrey Lushnikov, Pavel Feldman, and Boris Yankov came from the Puppeteer team at Google.',
        },
        doThis: 'Write one sentence: “Playwright exists because ___.”',
      },
      {
        title: 'Open-source, actively maintained, backed by Microsoft',
        body: 'Playwright is MIT-licensed and fully open-source on GitHub. “Backed by Microsoft” isn’t just marketing — it means a dedicated, funded engineering team (not a side project maintained by volunteers in their spare time); a fast release cadence — new minor versions ship roughly every 2–4 weeks, each typically adding real capabilities (not just bug fixes); and integration hooks with the broader Microsoft dev ecosystem (VS Code extension, Azure DevOps pipeline support).\n\nThis matters practically: when you hit a rough edge with Playwright, the chance it gets fixed or has a workaround shipped soon is much higher than with a stagnant tool. It’s also a plus for job security in your skillset — companies are less nervous adopting a tool with strong backing versus something that might get abandoned.',
        items: [
          'Dedicated funded engineering team',
          'Minor releases roughly every 2–4 weeks',
          'VS Code extension and Azure DevOps hooks',
        ],
        callout: {
          label: 'Practical takeaway',
          tone: 'tip',
          body: 'Adoption risk is lower when the vendor ships fixes on a predictable cadence — mention that when pitching Playwright at work.',
        },
        resources: docs,
      },
      {
        title: 'Why it was created (gaps in Selenium / Puppeteer)',
        body: 'Three concrete gaps drove Playwright’s creation.\n\nSelenium’s flakiness problem: Selenium’s WebDriver protocol requires you to manually manage waits — time.sleep(), explicit waits for specific conditions, etc. Miss a wait condition and your test either fails randomly or clicks the wrong thing because the page hadn’t finished rendering. This was (and still is) the single biggest source of pain in Selenium-based suites.\n\nPuppeteer’s Chrome-only limitation: Puppeteer only ever fully supported Chromium. Cross-browser testing meant maintaining an entirely separate toolchain for Firefox/Safari, which most teams simply didn’t do — meaning bugs specific to non-Chrome browsers shipped to production undetected.\n\nPoor support for modern web patterns: Both older tools struggled with things that are now completely normal on the web: single-page apps with heavy client-side routing, shadow DOM (used by design systems and web components), iframes nested multiple levels deep, and apps that make dozens of async network calls before finishing rendering.\n\nPlaywright’s answer to all three: auto-waiting built into the core engine (not bolted on by the test author), native multi-browser support from the start, and locators/APIs specifically designed to pierce shadow DOM and handle iframes without special ceremony.',
        callout: {
          label: 'Remember this triad',
          tone: 'note',
          body: 'Auto-waiting · multi-browser · modern DOM support. If you can explain those three, you can explain why Playwright exists.',
        },
        resources: docs,
      },
    ],
    checklist: [
      'I can tell the Puppeteer → Playwright origin in two sentences',
      'I can name the three gaps Playwright was built to close',
      'I noted one takeaway in LEARNING.md',
    ],
    practice: {
      title: 'Origin note',
      brief: 'In LEARNING.md, write a short paragraph a hiring manager would accept: why Playwright over Selenium for a modern SPA.',
    },
    resources: [resDoc],
  }),

  ch({
    id: 'pw-0-where',
    phase: 'Part 0 · Background',
    level: 'beginner',
    title: '1. Where Playwright is Used',
    minutes: 30,
    overview:
      'Primary use case: web UI automation (functional, regression, E2E). Also API testing, visual regression, scraping, and cross-browser checks — across industries that ship web apps.',
    learn: [
      'Functional, regression, and E2E UI testing',
      'APIRequestContext for API coverage in the same tool',
      'Visual regression, scraping, cross-browser',
      'Industry framing: e-commerce, SaaS, banking, healthcare',
    ],
    steps: [
      {
        title: 'Web UI test automation',
        body: 'Web UI test automation (functional, regression, E2E) is the primary use case and the one this manual focuses on almost entirely.\n\nFunctional testing asks whether a specific feature works as intended (e.g., does the “add to cart” button add an item?). Regression testing asks whether previously-working features still work after a code change — this is where automation earns its keep, since re-running the same checks manually after every deploy doesn’t scale. End-to-end (E2E) testing simulates a full real user journey across multiple pages/features (e.g., search → add to cart → checkout → confirmation), rather than testing one isolated piece.',
        items: [
          'Functional — does this feature work?',
          'Regression — did we break something that used to work?',
          'E2E — does the full user journey hold together?',
        ],
        resources: docs,
      },
      {
        title: 'API, visual, scraping, and cross-browser',
        body: 'API testing: Playwright isn’t just a browser tool — it ships APIRequestContext, letting you send raw HTTP requests (GET/POST/PUT/DELETE) without a browser at all. That means one tool can cover both your UI layer and your backend API layer, instead of maintaining Playwright for UI and a separate tool (like Postman/requests) for APIs. You’ll get the full picture in Part 4, Chapter 18.\n\nVisual regression testing asks “does the page still look right?” Playwright can take a screenshot and pixel-diff it against a saved baseline image, catching things functional tests would completely miss — like a CSS change that accidentally makes text invisible, or a layout shift that pushes a button off-screen. Covered in depth in Chapter 19.\n\nWeb scraping / data extraction: because Playwright can fully render JavaScript-heavy pages (unlike simple HTTP-request-based scrapers), it’s also popular for scraping sites that load content dynamically. This is a side use case — not the manual’s focus — but worth knowing it exists since it sometimes comes up in interviews or side projects.\n\nCross-browser compatibility testing runs the identical test suite against Chromium, Firefox, and WebKit to catch browser-specific rendering or behavior bugs before real users do. Covered practically in Chapter 23.',
        callout: {
          label: 'Scope note',
          tone: 'scope',
          body: 'This manual prioritizes UI E2E with Python. API and visual chapters come later — don’t skip the core locator/action/assert loop to chase them early.',
        },
        resources: docs,
      },
      {
        title: 'Industries and how to pitch value',
        body: 'Industries: e-commerce, SaaS, banking, healthcare — anywhere with a web app needing automated QA.\n\nE-commerce — checkout and payment flows are directly tied to revenue; a broken “Buy Now” button costs money by the minute. SaaS — ships UI changes constantly (sometimes daily), so manual regression testing alone can’t keep pace. Banking — heavy compliance and audit requirements mean documented, repeatable, automated test evidence is often mandatory, not optional. Healthcare — similar compliance pressure, plus accessibility requirements (tying into Chapter 19’s a11y content) are often legally required, not just nice-to-have.\n\nIf you work on internal tooling (HRM, payroll, attendance, leave), the pitch is the same: fewer manual regression passes on critical modules every release cycle.',
        doThis: 'Write three bullets pitching Playwright to your team for one release-critical flow.',
        resources: docs,
      },
    ],
    checklist: [
      'I can distinguish functional / regression / E2E',
      'I know APIRequestContext exists for API work',
      'I can pitch automation value for my domain',
    ],
    practice: {
      title: 'Use-case map',
      brief: 'List two UI journeys and one API check you’d eventually cover with Playwright on a product you know.',
    },
    resources: [resDoc],
  }),

  ch({
    id: 'pw-0-cando',
    phase: 'Part 0 · Background',
    level: 'beginner',
    title: '2. What Playwright Can Do',
    minutes: 35,
    overview:
      'One API for Chromium, Firefox, and WebKit; mobile web emulation; auto-waiting; network mocking; multi-context users; headed/headless; traces; parallel runs via pytest-xdist.',
    learn: [
      'Multi-browser one API',
      'Mobile web emulation vs native apps',
      'Auto-waiting, route mocking, multi-context',
      'Python uses pytest-playwright (not @playwright/test)',
    ],
    steps: [
      {
        title: 'Multi-browser and mobile web emulation',
        body: 'Automate Chromium, Firefox, WebKit — one API, all browsers. You write your test logic once, and swap the browser_type (chromium, firefox, webkit) to run the exact same test against a different engine — no rewriting locators or logic per browser. This is a genuinely rare capability; most tools require separate driver setups per browser at minimum, and Selenium historically required different WebDriver binaries per browser with occasional locator inconsistencies between them.\n\nMobile web emulation (no real device needed): Playwright ships built-in device descriptors (e.g., “iPhone 13”, “Pixel 5”) that set the right viewport size, user-agent string, touch support, and device pixel ratio automatically. You get realistic mobile-web testing without owning a device lab.',
        callout: {
          label: 'Boundary',
          tone: 'warn',
          body: 'This emulates mobile web browsers, not native mobile apps. Native iOS/Android automation is Appium territory — see Chapter 4 (out of scope).',
        },
        resources: docs,
      },
      {
        title: 'Auto-waiting, network, multi-user, headed/headless',
        body: 'Auto-waiting is the single most-cited reason teams switch to Playwright. Before every action (click, fill, etc.), Playwright automatically waits for the target element to be attached to the DOM, visible, stable (not mid-animation), enabled, and able to receive events. If any of those conditions isn’t met within the timeout, it fails with a clear error explaining which condition wasn’t met — dramatically easier to debug than a generic Selenium “element not interactable” error.\n\nNetwork interception & mocking: page.route() lets you intercept any request the page makes and respond however you want — fulfill it, modify it, abort it, or let it pass through unchanged. This unlocks testing scenarios that are otherwise very hard to trigger reliably: simulating a server error, a slow/timing-out API, or an empty-data state, all without needing the actual backend to cooperate. Deep dive in Chapter 17.\n\nMulti-tab, multi-context, multi-user simulation: because each BrowserContext is fully isolated (separate cookies, storage, cache), you can open two contexts in the same test to simulate two different logged-in users interacting with the same feature simultaneously. This would require running two completely separate browser sessions in older tools.\n\nHeadless & headed: headless means the browser runs without a visible UI window — faster, and required in most CI environments. Headed means you see the actual browser window — invaluable while writing and debugging. The same test code runs in either mode; you just flip a launch option.',
        resources: docs,
      },
      {
        title: 'Runner, traces, and parallel execution (Python)',
        body: 'Built-in test runner (JS/TS) — Python uses pytest-playwright instead. Playwright’s official JS/TS package includes its own test runner (@playwright/test) with built-in parallelization, fixtures, and reporting. The Python version does not include an equivalent built-in runner — instead, the community-maintained pytest-playwright plugin fills that role, wiring Playwright into the pytest ecosystem you’ll cover starting in Part 3. This is why Part 3 leans so heavily on pytest concepts (fixtures, conftest.py) rather than a Playwright-native config system.\n\nTrace/video/screenshot capture out of the box: no third-party plugin needed — Playwright can record a full trace (DOM snapshots, network activity, console logs, screenshots at each step) of a test run, plus optionally save a video and screenshots on failure. Covered practically in Chapter 24 (Trace Viewer) and Chapter 28 (capture-on-failure).\n\nParallel test execution: tests can run across multiple worker processes simultaneously. In Python this is handled via pytest-xdist (Chapter 22) rather than anything Playwright-specific.',
        callout: {
          label: 'Python scope',
          tone: 'scope',
          body: 'When docs show @playwright/test, translate mentally to pytest + pytest-playwright. Method names are close; the runner is different.',
        },
        tip: 'Don’t memorize every capability now — know the map so later chapters have a place to land.',
        resources: docs,
      },
    ],
    checklist: [
      'I can explain auto-waiting in one sentence',
      'I know Python uses pytest-playwright, not @playwright/test',
      'I know mobile web ≠ native app testing',
    ],
    practice: {
      title: 'Capability checklist',
      brief: 'Star the three capabilities you’ll use first on your project; strike through anything out of scope.',
    },
    resources: [resDoc],
  }),

  ch({
    id: 'pw-0-why',
    phase: 'Part 0 · Background',
    level: 'beginner',
    title: '3. Why Companies Choose Playwright Over Alternatives',
    minutes: 30,
    overview:
      'Speed and reliability vs Selenium, modern SPA/shadow DOM support, lower flakiness from auto-waiting, and rising job-market demand.',
    learn: [
      'Speed (CDP/WebSocket) vs reliability (auto-waiting)',
      'SPA / shadow DOM / iframe advantages',
      'Why flakiness drops after migration',
      'Job-market signal',
    ],
    steps: [
      {
        title: 'Speed and reliability vs Selenium',
        body: 'Two distinct claims worth separating.\n\nSpeed: Playwright communicates with the browser directly over CDP/WebSocket (see Part 1, Chapter 3), which is a lower-overhead path than Selenium’s WebDriver protocol, which adds an extra HTTP layer (the WebDriver server) between your test code and the browser.\n\nReliability: this comes almost entirely from auto-waiting. A Selenium suite without carefully hand-tuned explicit waits will produce intermittent failures that have nothing to do with real bugs — just timing. Teams that migrate to Playwright commonly report their flaky-test rate dropping substantially, simply because the waiting problem is handled by the framework instead of by every individual test author remembering to do it right.',
        items: [
          'Speed → protocol path (CDP/WebSocket vs WebDriver HTTP)',
          'Reliability → auto-waiting owned by the framework',
        ],
        quiz: {
          question: 'A common reason teams leave Selenium is…',
          options: [
            'Playwright cannot open URLs',
            'High flakiness and slow feedback loops',
            'Selenium supports more browsers than Playwright',
            'Selenium has no language bindings',
          ],
          answer: 1,
          explain: 'Manual waits and protocol overhead made Selenium suites flaky and slow.',
        },
        resources: docs,
      },
      {
        title: 'Modern web app support',
        body: 'Selenium and older Puppeteer-era approaches were designed before SPAs (React/Angular/Vue apps that don’t do full page reloads) and shadow DOM (encapsulated web components) were the norm. Playwright’s locator engine was built with these patterns in mind — it can pierce shadow DOM by default and has first-class frame_locator() support for iframes (Part 2, Chapter 9), rather than requiring the workarounds these patterns demanded in older tools.',
        resources: docs,
      },
      {
        title: 'Lower flakiness — the recurring theme',
        body: 'Restating this because it’s genuinely the recurring theme across the entire manual — it comes up again in Chapters 5, 7, and 8. If there’s one concept to have rock-solid before moving past Part 2, it’s this one.',
        callout: {
          label: 'Gate concept',
          tone: 'tip',
          body: 'Master auto-waiting before you invent custom sleep helpers. Sleeps fight the framework.',
        },
        resources: docs,
      },
      {
        title: 'Growing job market demand',
        body: 'Playwright adoption has grown fast over the last few years, and job postings mentioning it (versus Selenium-only postings) have been trending upward. This isn’t just a “nice tool” — it’s increasingly what QA automation job descriptions actually ask for, which is part of why this manual exists in your learning path.',
        doThis: 'Skim two job posts that mention Playwright; note which skills they cluster with (pytest, CI, POM).',
        resources: docs,
      },
    ],
    checklist: [
      'I can separate speed vs reliability arguments',
      'I can explain why SPA/shadow DOM favor Playwright',
      'I treat auto-waiting as non-negotiable knowledge',
    ],
    practice: {
      title: 'Elevator pitch',
      brief: 'Record a 60-second voice note: why your team should prefer Playwright over Selenium for a React app.',
    },
    resources: [resDoc],
  }),

  ch({
    id: 'pw-0-not',
    phase: 'Part 0 · Background',
    level: 'beginner',
    title: '4. What This Manual Will NOT Cover',
    minutes: 20,
    overview:
      'Out of scope: JS/TS Playwright as the teaching language, native mobile (Appium), and load/performance testing (k6/JMeter/Locust).',
    learn: [
      'Python + pytest-playwright only',
      'Mobile web ≠ native apps',
      'Load testing is a separate discipline',
    ],
    steps: [
      {
        title: 'JavaScript/TypeScript Playwright',
        body: 'Worth flagging early: a huge amount of Playwright’s own official documentation and community content is written JS/TS-first (since that’s Playwright’s native language and where the built-in test runner lives). You’ll frequently find yourself reading JS examples online and needing to mentally translate syntax to Python (e.g., page.click() stays similar, but async/await patterns, config files, and the test runner itself differ). This manual won’t teach you that translation — it sticks to Python + pytest-playwright throughout.',
        callout: {
          label: 'Reading tip',
          tone: 'note',
          body: 'When you hit a JS snippet, translate camelCase → snake_case and ignore @playwright/test config — look for the page/locator/expect ideas.',
        },
        resources: docs,
      },
      {
        title: 'Native mobile and load testing',
        body: 'Mobile native app testing is Appium territory. Mobile web emulation (Chapter 2) is in scope — testing a website as it renders in a mobile browser. Testing an actual native iOS/Android app (a compiled app installed from an app store) is a fundamentally different problem requiring Appium, which automates the OS-level app itself rather than a browser. Don’t confuse the two when scoping future learning.\n\nLoad/performance testing is k6 / JMeter / Locust. Playwright automates one browser session behaving like one real user — it’s not built to simulate thousands of concurrent users hitting a server to measure throughput/latency under load. That’s a separate discipline with its own dedicated tools: k6 (modern, scriptable, popular in CI), JMeter (older, GUI-heavy, still widely used), and Locust (Python-based, code-first).',
        aside: 'Keep your learning track honest',
        doThis: 'Write a one-line “not this manual” sticky for your desk: no Appium, no k6, no JS runner.',
        resources: docs,
      },
    ],
    checklist: [
      'I know this path is Python-first',
      'I won’t confuse mobile web with native apps',
      'I won’t expect Playwright to replace load tools',
    ],
    practice: {
      title: 'Scope card',
      brief: 'Create a 3-bullet “in / out / later” card for your personal study plan.',
    },
    resources: [resDoc],
  }),

  ch({
    id: 'pw-1-intro',
    phase: 'Part 1 · Foundations',
    level: 'beginner',
    title: '1. Introduction to Playwright',
    minutes: 40,
    durationLabel: 'Week 1',
    overview:
      'Hands-on entry point: Playwright vs Selenium vs Cypress, then supported browsers and languages — with Python as a near-complete API mirror of JS.',
    learn: [
      'Mental shift from “why” to “how”',
      'Compare Selenium, Cypress, Playwright',
      'Browsers and language bindings',
    ],
    steps: [
      {
        title: 'What is Playwright, why it exists (hands-on framing)',
        body: 'This chapter restates the origin story from Part 0 but frames it as the entry point to hands-on learning — the point where you stop reading about the tool and start touching it. The key mental shift: everything in Part 0 was “why should I care,” Part 1 onward is “how do I actually use this.”',
        resources: docs,
      },
      {
        title: 'Playwright vs Selenium vs Cypress',
        body: 'Worth having a clear mental table for this — it’s a near-guaranteed interview question.\n\nProtocol: Selenium uses WebDriver over HTTP; Cypress runs inside the browser; Playwright talks CDP/WebSocket directly.\n\nBrowsers: Selenium supports many via separate drivers; Cypress is Chromium-family (with experimental Firefox/WebKit historically weak); Playwright supports Chromium, Firefox, and WebKit natively.\n\nAuto-waiting: Selenium no (manual waits); Cypress yes; Playwright yes.\n\nMulti-tab / multi-origin: Selenium clunky; Cypress weak by architecture; Playwright native support.\n\nLanguages: Selenium many; Cypress JS/TS only; Playwright JS/TS, Python, Java, .NET.\n\nSpeed: Selenium slower; Cypress fast; Playwright fast.\n\nThe Cypress limitation is worth understanding, not just memorizing: Cypress executes its test code inside the browser itself, in the same run loop as the page. That’s why it’s fast, but it also historically struggled with multiple tabs or cross-origin navigation. Playwright runs outside the browser and drives it externally, which is why it doesn’t have that constraint.',
        callout: {
          label: 'Interview table',
          tone: 'tip',
          body: 'Lead with protocol + auto-waiting + multi-tab. Those three differences land cleanly with interviewers.',
        },
        resources: docs,
      },
      {
        title: 'Supported browsers & languages',
        body: 'Browsers: Chromium (covers Chrome + Edge), Firefox, WebKit (the engine behind Safari — meaning you can test Safari-like behavior on Linux/Windows CI machines without owning a Mac).\n\nLanguages: JavaScript/TypeScript (the original, most complete), Python, Java, and .NET/C#. Python’s API is a near-complete mirror of the JS one, which is why translating JS examples you find online is usually mechanical rather than conceptual — the method names and behavior are almost identical, just wrapped in Python syntax (snake_case instead of camelCase, for instance: get_by_role instead of getByRole).',
        doThis: 'Open the Python docs intro page and skim the first code sample; note sync_playwright.',
        resources: docs,
      },
    ],
    checklist: [
      'I can fill a Selenium / Cypress / Playwright comparison from memory',
      'I know Python mirrors JS APIs in snake_case',
      'I’m ready to set up a venv next',
    ],
    practice: {
      title: 'Comparison card',
      brief: 'Draw the comparison table on paper once without looking.',
    },
    resources: [resDoc],
  }),

  ch({
    id: 'pw-1-setup',
    phase: 'Part 1 · Foundations',
    level: 'beginner',
    title: '2. Environment Setup',
    minutes: 45,
    overview:
      'venv hygiene, install pytest-playwright + browser binaries, and a starter folder structure that won’t fight you when POM arrives.',
    learn: [
      'Always use a virtual environment',
      'pip install vs playwright install',
      'Starter project layout',
    ],
    steps: [
      {
        title: 'Python, pip, and virtual environments',
        body: 'Assuming Python is installed, the critical habit here is virtual environments (venv). Every project should get its own isolated environment.',
        codeTitle: 'Create and activate a venv',
        code: 'python -m venv venv\nsource venv/bin/activate      # Mac/Linux\nvenv\\Scripts\\activate         # Windows',
        callout: {
          label: 'Why bother',
          tone: 'tip',
          body: 'Different projects need different Playwright/pytest versions. Global installs become painful version conflicts. Get the habit now.',
        },
        resources: docs,
      },
      {
        title: 'Installing Playwright + browser binaries',
        body: 'Two separate steps that beginners often miss the distinction between.',
        codeTitle: 'Package, then browsers',
        tryIt: {
          prompt: 'Install the Python package and browser binaries',
          code: 'pip install pytest-playwright\nplaywright install',
          result: 'pytest-playwright is importable; Chromium/Firefox/WebKit binaries land in Playwright’s cache.',
        },
        callout: {
          label: 'Two steps',
          tone: 'warn',
          body: 'pip installs the API. playwright install downloads pinned browser builds. Skip the second step and tests fail immediately — browsers not found.',
        },
        tip: 'Playwright ships its own browsers on purpose — same version on every laptop and CI machine.',
        resources: docs,
      },
      {
        title: 'Project folder structure',
        body: 'Even a simple starting structure pays off later (preview of Chapter 14’s POM and Chapter 29’s scalable architecture). Starting with this loose structure — rather than dumping every test file flat in one folder — means you won’t need a painful reorganization once the suite grows past a handful of tests.',
        codeTitle: 'Starter layout',
        code: 'project/\n├── tests/\n├── pages/          # page object classes — comes later\n├── conftest.py\n├── pytest.ini\n└── requirements.txt',
        doThis: 'Create this folder skeleton in a new repo and commit an empty tests/.gitkeep.',
        resources: docs,
      },
    ],
    checklist: [
      'venv created and activated',
      'pytest-playwright installed',
      'playwright install completed',
      'Folder skeleton committed',
    ],
    practice: {
      title: 'Day-zero repo',
      brief: 'Push a GitHub repo with requirements.txt pinning pytest-playwright and a README with setup commands.',
    },
    resources: [resDoc],
  }),

  ch({
    id: 'pw-1-arch',
    phase: 'Part 1 · Foundations',
    level: 'beginner',
    title: '3. Playwright Architecture',
    minutes: 40,
    overview:
      'Browser → BrowserContext → Page is the backbone. Sync vs async APIs, and how CDP/WebSocket gives Playwright its depth.',
    learn: [
      'Browser / Context / Page hierarchy',
      'Sync API vs Async API',
      'CDP over WebSocket',
    ],
    steps: [
      {
        title: 'Browser, BrowserContext, Page hierarchy',
        body: 'This is the conceptual backbone of the entire tool — internalize it precisely.\n\nBrowser — one actual browser process (e.g., one Chromium instance). Launching a browser is relatively expensive (time and memory), so you typically launch one per test session, not one per test.\n\nBrowserContext — an isolated session within that browser, roughly equivalent to an incognito window. Each context has its own cookies, local storage, cache, and permissions — completely separate from other contexts in the same browser. Creating a new context is cheap and fast, which is why the recommended pattern is: one browser launch per session, one new context per test (for isolation), and reuse the browser itself.\n\nPage — one tab within a context. A context can have multiple pages open simultaneously (this is how multi-tab testing in Chapter 9 works).\n\nWhy this hierarchy matters: Playwright can cheaply simulate multiple independent users without launching multiple full browser processes — you open multiple contexts within one browser. It’s also why test isolation is easy by default: if every test gets a fresh context, cookies/login state from one test can’t leak into another.',
        items: [
          'Browser — expensive; one per session',
          'BrowserContext — cheap isolation; one per test',
          'Page — a tab inside a context',
        ],
        resources: docs,
      },
      {
        title: 'Sync API vs Async API',
        body: 'Python Playwright offers two flavors.\n\nSync API — code reads top-to-bottom, no await keywords. This is what pytest-playwright uses by default and what most tutorials (including this one) use, since it’s simpler to read and write, especially if you’re newer to Python.\n\nAsync API — uses async/await, needed if you’re integrating Playwright into an existing asyncio-based application (e.g., an async web scraper or an async FastAPI service). For pure test-automation work, you’ll rarely need this — but it’s worth knowing it exists so you’re not confused when you see async def in some code examples online.',
        callout: {
          label: 'Default for this manual',
          tone: 'scope',
          body: 'Sync API + pytest-playwright. Ignore async samples unless you’re integrating into asyncio.',
        },
        resources: docs,
      },
      {
        title: 'How Playwright talks to browsers (CDP, WebSocket)',
        body: 'Playwright launches a browser process and connects to it over the Chrome DevTools Protocol (CDP) via a WebSocket connection. CDP is the same protocol Chrome’s own DevTools panel uses internally — meaning Playwright has access to genuinely deep browser internals (network events, DOM state, console messages, performance data), not just “click here, type there” surface-level commands. This direct, persistent WebSocket connection (versus Selenium’s request-response HTTP calls to a separate WebDriver server) is the concrete technical reason Playwright is both faster and capable of things Selenium structurally can’t do, like real-time network interception.\n\nFor Firefox and WebKit, Playwright uses patched versions of those browsers with equivalent protocol support built in, since neither natively speaks CDP — another reason Playwright ships its own browser binaries rather than using your system browsers.',
        aside: 'This is the “why it’s faster” answer',
        resources: docs,
      },
    ],
    checklist: [
      'I can draw Browser → Context → Page',
      'I know sync is the default for pytest-playwright',
      'I can explain CDP/WebSocket vs WebDriver HTTP',
    ],
    practice: {
      title: 'Hierarchy sketch',
      brief: 'Sketch the hierarchy and annotate where cookies live (hint: context).',
    },
    resources: [resDoc],
  }),

  ch({
    id: 'pw-1-first',
    phase: 'Part 1 · Foundations',
    level: 'beginner',
    title: '4. First Script',
    minutes: 45,
    overview:
      'Launch headed/headless, open a page, navigate, locate, click/fill, assert — the smallest complete Playwright loop in Python.',
    learn: [
      'sync_playwright launch options',
      'goto, locators, actions',
      'A minimal assert you can trust',
    ],
    steps: [
      {
        title: 'Launching a browser (headless vs headed)',
        body: 'headless=True (the default) runs with no visible window — faster and what CI environments require. headless=False opens an actual visible browser window — invaluable while you’re first writing a test and want to watch what’s happening. A common workflow: write and debug with headless=False, then flip to True (or just remove the argument) once the test is stable and you’re ready to commit it.',
        codeTitle: 'Headed Chromium launch',
        code: 'from playwright.sync_api import sync_playwright\n\nwith sync_playwright() as p:\n    browser = p.chromium.launch(headless=False)  # headed — visible window\n    page = browser.new_page()\n    page.goto("https://example.com")\n    print(page.title())\n    browser.close()',
        doThis: 'Run this script once headed and watch the window open.',
        resources: docs,
      },
      {
        title: 'Navigate, locate, act',
        body: 'page.goto opens a URL and waits for a load state. Locators find elements the way users perceive them — prefer get_by_role and get_by_text over brittle CSS when you can. Actions like click and fill auto-wait for actionability.',
        codeTitle: 'Locate and fill',
        code: 'page.get_by_role("link", name="More information").click()\n# or on a form-like page:\n# page.get_by_label("Email").fill("you@example.com")\n# page.get_by_role("button", name="Submit").click()',
        tip: 'If a locator is ambiguous, Playwright fails loudly — tighten the name/role instead of adding sleeps.',
        resources: docs,
      },
      {
        title: 'Assert something true',
        body: 'A script that only clicks isn’t a test. Assert on URL, title, or visible text so failures mean something. In pytest you’ll use expect() from playwright.sync_api — Part 2 covers that in depth.',
        codeTitle: 'Simple title assert (script style)',
        code: 'assert "Example" in page.title()',
        callout: {
          label: 'Next up',
          tone: 'note',
          body: 'After the foundations checkpoint, Part 2 rebuilds this loop with proper locators, expect(), and auto-waiting mental models.',
        },
        resources: docs,
      },
    ],
    checklist: [
      'I ran a headed script successfully',
      'I used at least one get_by_role locator',
      'I asserted on title or URL',
    ],
    practice: {
      title: 'First green run',
      brief: 'Commit first_script.py that prints the title of example.com and asserts a substring.',
    },
    resources: [resDoc],
  }),

  ch({
    id: 'pw-cp-foundations',
    phase: 'Part 1 · Foundations',
    kind: 'checkpoint',
    level: 'beginner',
    title: 'Checkpoint · Foundations',
    minutes: 25,
    overview:
      'Gate before Part 2: origin story, setup, hierarchy, and a working first script. Don’t skip — later chapters assume this floor.',
    learn: [
      'Explain Playwright in interview terms',
      'Reproduce setup from memory',
      'Draw the architecture',
    ],
    steps: [
      {
        title: 'Pass criteria',
        body: 'You are ready for Part 2 when you can do all of the following without notes.',
        items: [
          'Explain Puppeteer lineage + three creation gaps in under two minutes',
          'Create a venv, install pytest-playwright, run playwright install',
          'Draw Browser → BrowserContext → Page and say where cookies live',
          'Run a headed script that goto’s a URL and asserts the title',
        ],
        callout: {
          label: 'Honest gate',
          tone: 'warn',
          body: 'If any bullet fails, re-read that chapter. Locators will feel arbitrary without this floor.',
        },
      },
      {
        title: 'Self-check quiz',
        body: 'Use this as a cold check before you open Part 2.',
        quiz: {
          question: 'Where should per-test cookies/login state live?',
          options: ['Browser process', 'BrowserContext', 'The OS user profile', 'pytest.ini'],
          answer: 1,
          explain: 'Contexts isolate storage; pages are tabs inside a context.',
        },
        doThis: 'Close the docs. Reinstall in a fresh folder from memory. Time yourself.',
      },
    ],
    checklist: [
      'All pass criteria checked',
      'First script committed',
      'LEARNING.md updated with Part 0–1 notes',
    ],
    practice: {
      title: 'Foundations sign-off',
      brief: 'Paste your pass-criteria checklist into LEARNING.md with today’s date.',
    },
    resources: [resDoc],
  }),
]
