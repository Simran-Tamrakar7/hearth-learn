export interface GoDeeperResource {
  title: string;
  url: string;
  description: string;
}

export interface ManualExercise {
  prompt: string;
  starterCode?: string;
  solutionCode: string;
}

export interface ManualChapter {
  id: string;
  order: number;
  slug: string;
  title: string;
  estimatedMinutes: number;
  subtitle?: string;
  contentMarkdown: string;
  summaryMarkdown?: string;
  sections?: { title: string; body: string }[];
  codeSnippet?: string;
  exercises: ManualExercise[];
  resourceLinks: GoDeeperResource[];
}

export interface ManualItem {
  id: string;
  slug: string;
  title: string;
  category:
    | "Automation & Testing"
    | "Quality Craft"
    | "Delivery & Process"
    | "Design"
    | "AI & Prompting"
    | "Foundations"
    | "Ops & Systems"
    | "Career"
    | "Soft Skills";
  description: string;
  chapterCount: number;
  estimatedTime: string;
  icon: string;
  coverImage: string;
  chapters: ManualChapter[];
}

export const MANUALS_DATA: ManualItem[] = [
  // MANUAL 1: GIT & VERSION CONTROL
  {
    id: "manual-git-version-control",
    slug: "git-version-control",
    title: "Git & Version Control Mastery",
    category: "Foundations",
    description: "Master DAG commits, branching strategies, interactive rebase, reflog recovery, and team workflows from scratch.",
    chapterCount: 8,
    estimatedTime: "3.5 hours",
    icon: "GitBranch",
    coverImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=800&q=80",
    chapters: [
      {
        id: "git-ch-1",
        order: 1,
        slug: "git-mental-model",
        title: "Chapter 1: The Core Mental Model of Git Objects & DAG",
        subtitle: "The Directed Acyclic Graph (DAG)",
        estimatedMinutes: 20,
        contentMarkdown: `Most developers view Git as a series of file deltas or snapshots over time. While practically useful, Git is fundamentally a Content-Addressable Key-Value Database built on a Directed Acyclic Graph (DAG).

Every commit object in Git points to a root tree object (which represents directory structure), which in turn points to blob objects (which contain raw file contents).`,
        summaryMarkdown: `Key Takeaways:
- Git is a Content-Addressable Key-Value Database on a DAG.
- Blobs store raw contents, Trees store directory listings, Commits store tree SHAs and parent commit hashes.`,
        sections: [
          {
            title: "Four Primary Git Object Types",
            body: "1. Blobs: Store pure raw binary or text content.\n2. Trees: Store directory listings linking filenames and permissions to Blob SHAs.\n3. Commits: Store tree SHA, parent commit SHAs, author timestamp, and commit log message.\n4. Annotated Tags: Reference specific commit SHAs.",
          },
        ],
        codeSnippet: `git cat-file -t HEAD\ngit cat-file -p HEAD`,
        exercises: [
          {
            prompt: "Use git cat-file to inspect the tree SHA referenced by your current HEAD commit.",
            solutionCode: "git cat-file -p HEAD | grep tree",
          },
        ],
        resourceLinks: [
          {
            title: "Git Internals - Plumbing and Porcelain",
            url: "https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain",
            description: "Official Git SCM documentation detailing blob objects, tree indices, and commit hashes.",
          },
        ],
      },
    ],
  },

  // MANUAL 2: PLAYWRIGHT TEST AUTOMATION MASTER MANUAL (54 FULL EXHAUSTIVE CHAPTERS)
  {
    id: "manual-playwright-automation",
    slug: "playwright-test-automation",
    title: "Playwright Test Automation Master Manual",
    category: "Automation & Testing",
    description: "The complete, end-to-end 54-chapter master curriculum for Playwright with Python. Covers CDP architecture, role locators, POM, pytest, API testing, visual regression, auth reuse, CI/CD pipelines, Docker, performance tuning, and career interview prep.",
    chapterCount: 54,
    estimatedTime: "8.5 hours",
    icon: "Compass",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    chapters: [
      {
        id: "pw-ch-0",
        order: 1,
        slug: "what-is-playwright",
        title: "Ch 0: What is Playwright, Really",
        subtitle: "History — built by Microsoft, evolved from the Puppeteer team",
        estimatedMinutes: 10,
        contentMarkdown: `## History — built by Microsoft, evolved from the Puppeteer team

Playwright's origin story matters more than it seems on the surface. The core engineers who built Playwright — most notably Andrey Lushnikov, Pavel Feldman, and Boris Yankov — were previously on the team at Google that built and maintained Puppeteer, the Node.js library for controlling headless Chrome. When they moved to Microsoft, they took everything they'd learned from Puppeteer's limitations and built something new instead of iterating on the old codebase.

This "second attempt by the same people" origin is why Playwright feels less like a patched-together tool and more like a deliberately designed one. Puppeteer was built specifically for Chrome/Chromium via the Chrome DevTools Protocol (CDP). Its creators knew intimately where that architecture broke down — mainly, it couldn't reliably control Firefox or Safari/WebKit. Playwright was designed from day one to solve that: a single API surface that talks to all three major browser engines.

First released publicly in January 2020, Playwright is comparatively young next to Selenium (which dates back to 2004). That youth is actually a selling point in interviews — it means the tool was designed with full knowledge of modern web apps (SPAs, shadow DOM, complex async behavior) rather than retrofitted onto assumptions from the mid-2000s web.

## Open-source, actively maintained, backed by Microsoft

Playwright is MIT-licensed and fully open-source on GitHub. "Backed by Microsoft" isn't just marketing — it means:
- A dedicated, funded engineering team (not a side project maintained by volunteers in their spare time)
- A fast release cadence — new minor versions ship roughly every 2–4 weeks, each typically adding real capabilities (not just bug fixes)
- Integration hooks with the broader Microsoft dev ecosystem (VS Code extension, Azure DevOps pipeline support)

This matters practically: when you hit a rough edge with Playwright, the chance it gets fixed or has a workaround shipped soon is much higher than with a stagnant tool. It's also a plus for job security in your skillset — companies are less nervous adopting a tool with strong backing versus something that might get abandoned.

## Why it was created (gaps in Selenium/Puppeteer)

Three concrete gaps drove Playwright's creation:
1. Selenium's flakiness problem. Selenium's WebDriver protocol requires you to manually manage waits — time.sleep(), explicit waits for specific conditions, etc. Miss a wait condition and your test either fails randomly or clicks the wrong thing because the page hadn't finished rendering. This was (and still is) the single biggest source of pain in Selenium-based suites.
2. Puppeteer's Chrome-only limitation. Puppeteer only ever fully supported Chromium. Cross-browser testing meant maintaining an entirely separate toolchain for Firefox/Safari, which most teams simply didn't do — meaning bugs specific to non-Chrome browsers shipped to production undetected.
3. Poor support for modern web patterns. Both older tools struggled with things that are now completely normal on the web: single-page apps with heavy client-side routing, shadow DOM (used by design systems and web components), iframes nested multiple levels deep, and apps that make dozens of async network calls before finishing rendering.

Playwright's answer to all three: auto-waiting built into the core engine (not bolted on by the test author), native multi-browser support from the start, and locators/APIs specifically designed to pierce shadow DOM and handle iframes without special ceremony.`,
        summaryMarkdown: `⚡ Quick AI Summary:
- **Origin**: Built by former Google Puppeteer core engineers after moving to Microsoft.
- **Why Created**: Solves Selenium's flakiness (manual sleep hacks) and Puppeteer's Chrome-only limitation.
- **Key Advantage**: Single bi-directional WebSocket CDP protocol supporting Chromium, Firefox, and WebKit natively.`,
        exercises: [{ prompt: "Verify Playwright version via CLI", solutionCode: "playwright --version" }],
        resourceLinks: [{ title: "Playwright GitHub Repo", url: "https://github.com/microsoft/playwright-python", description: "Official source code." }],
      },

      {
        id: "pw-ch-1",
        order: 2,
        slug: "where-playwright-is-used",
        title: "Ch 1: Where Playwright is Used",
        subtitle: "Web UI, API, Visual Regression, Scraping & Industry Applications",
        estimatedMinutes: 10,
        contentMarkdown: `## Web UI test automation (functional, regression, E2E)
This is the primary use case and the one this manual focuses on almost entirely.
- Functional testing — does a specific feature work as intended (e.g., does the "add to cart" button add an item?).
- Regression testing — after a code change, do previously-working features still work? This is where automation earns its keep, since re-running the same checks manually after every deploy doesn't scale.
- End-to-end (E2E) testing — simulating a full real user journey across multiple pages/features (e.g., search → add to cart → checkout → confirmation), rather than testing one isolated piece.

## API testing
Playwright isn't just a browser tool — it ships APIRequestContext, letting you send raw HTTP requests (GET/POST/PUT/DELETE) without a browser at all. This means one tool can cover both your UI layer and your backend API layer, instead of maintaining Playwright for UI and a separate tool (like Postman/requests) for APIs. You'll get the full picture of this in Part 4, Chapter 18.

## Visual regression testing
Beyond "does the button work," this asks "does the page still look right?" Playwright can take a screenshot and pixel-diff it against a saved baseline image, catching things functional tests would completely miss — like a CSS change that accidentally makes text invisible, or a layout shift that pushes a button off-screen. Covered in depth in Chapter 19.

## Web scraping / data extraction
Because Playwright can fully render JavaScript-heavy pages (unlike simple HTTP-request-based scrapers), it's also popular for scraping sites that load content dynamically. This is a side use case — not the manual's focus — but worth knowing it exists since it sometimes comes up in interviews or side projects.

## Cross-browser compatibility testing
Running the identical test suite against Chromium, Firefox, and WebKit to catch browser-specific rendering or behavior bugs before real users do. Covered practically in Chapter 23.

## Industries: e-commerce, SaaS, banking, healthcare — anywhere with a web app needing automated QA
Worth understanding why each industry leans on this kind of testing heavily:
- E-commerce — checkout and payment flows are directly tied to revenue; a broken "Buy Now" button costs money by the minute.
- SaaS — ships UI changes constantly (sometimes daily), so manual regression testing alone can't keep pace.
- Banking — heavy compliance and audit requirements mean documented, repeatable, automated test evidence is often mandatory, not optional.
- Healthcare — similar compliance pressure, plus accessibility requirements (tying into Chapter 19's a11y content) are often legally required, not just nice-to-have.`,
        summaryMarkdown: `⚡ Quick AI Summary:
- **Primary Uses**: UI E2E, API testing (via APIRequestContext), Visual Regression pixel-diffing, and Web Scraping.
- **Industry Value**: Prevents revenue loss in E-commerce checkout, scales daily SaaS deploys, and provides compliance audit evidence for Banking & Healthcare.`,
        exercises: [{ prompt: "Identify the primary benefit of Playwright's APIRequestContext", solutionCode: "Runs raw HTTP requests without launching a browser window." }],
        resourceLinks: [{ title: "Playwright API Reference", url: "https://playwright.dev/python/docs/api/class-apirequestcontext", description: "Official API docs." }],
      },

      {
        id: "pw-ch-2",
        order: 3,
        slug: "what-playwright-can-do",
        title: "Ch 2: What Playwright Can Do",
        subtitle: "Automate Chromium, Firefox, WebKit, Mobile Emulation & Network Mocking",
        estimatedMinutes: 10,
        contentMarkdown: `## Automate Chromium, Firefox, WebKit — one API, all browsers
You write your test logic once, and swap the browser_type (chromium, firefox, webkit) to run the exact same test against a different engine — no rewriting locators or logic per browser. This is a genuinely rare capability; most tools require separate driver setups per browser at minimum, and Selenium historically required different WebDriver binaries per browser with occasional locator inconsistencies between them.

## Mobile web emulation (no real device needed)
Playwright ships built-in device descriptors (e.g., "iPhone 13", "Pixel 5") that set the right viewport size, user-agent string, touch support, and device pixel ratio automatically. You get realistic mobile-web testing without owning a device lab. Note the important boundary: this emulates mobile web browsers, not native mobile apps — that distinction matters (see Chapter 4 below, "What This Manual Will NOT Cover").

## Auto-waiting (no manual sleep/wait hacks)
Already covered under "why it was created" above — worth repeating because it's the single most-cited reason teams switch to Playwright. Before every action (click, fill, etc.), Playwright automatically waits for the target element to be attached to the DOM, visible, stable (not mid-animation), enabled, and able to receive events. If any of those conditions isn't met within the timeout, it fails with a clear error explaining which condition wasn't met — dramatically easier to debug than a generic Selenium "element not interactable" error.

## Network interception & mocking
page.route() lets you intercept any request the page makes and respond however you want — fulfill it, modify it, abort it, or let it pass through unchanged. This unlocks testing scenarios that are otherwise very hard to trigger reliably: simulating a server error, a slow/timing-out API, or an empty-data state, all without needing the actual backend to cooperate. Deep dive in Chapter 17.

## Multi-tab, multi-context, multi-user simulation in one test
Recall the Browser → BrowserContext → Page hierarchy from Part 1. Because each BrowserContext is fully isolated (separate cookies, storage, cache), you can open two contexts in the same test to simulate two different logged-in users interacting with the same feature simultaneously — e.g., testing a real-time chat or a shared document editor. This would require running two completely separate browser sessions/processes in older tools.

## Headless & headed execution
Headless means the browser runs without a visible UI window — faster, and required in most CI environments (no display server available). Headed means you see the actual browser window — invaluable while writing and debugging a new test. The same test code runs in either mode; you just flip a launch option.

## Built-in test runner (JS/TS) — Python uses pytest-playwright instead
Important scope note: Playwright's official JS/TS package includes its own test runner (@playwright/test) with built-in parallelization, fixtures, and reporting. The Python version does not include an equivalent built-in runner — instead, the community-maintained pytest-playwright plugin fills that role, wiring Playwright into the pytest ecosystem you'll cover starting in Part 3.

## Trace/video/screenshot capture out of the box
No third-party plugin needed — Playwright can record a full trace (DOM snapshots, network activity, console logs, screenshots at each step) of a test run, plus optionally save a video and screenshots on failure. This built-in observability is a major reason debugging CI failures in Playwright is noticeably less painful than in older tools where you'd have to add this instrumentation yourself.

## Parallel test execution
Tests can run across multiple worker processes simultaneously rather than one after another, cutting total suite runtime significantly. In Python this is handled via pytest-xdist (Chapter 22) rather than anything Playwright-specific.`,
        summaryMarkdown: `⚡ Quick AI Summary:
- **5-Point Actionability**: Attached, Visible, Stable, Enabled, Receives Events.
- **Multi-User Contexts**: Isolated sessions within 1 browser process enable testing 2 live users simultaneously.
- **Observability**: Built-in trace viewer captures DOM snapshots, console logs, and network activity per step.`,
        exercises: [{ prompt: "List the 5 actionability checklist conditions", solutionCode: "Attached, Visible, Stable, Enabled, Receives Events" }],
        resourceLinks: [{ title: "Playwright Auto-Waiting Docs", url: "https://playwright.dev/python/docs/actionability", description: "Actionability checks guide." }],
      },

      {
        id: "pw-ch-3",
        order: 4,
        slug: "why-companies-choose-playwright",
        title: "Ch 3: Why Companies Choose Playwright Over Alternatives",
        subtitle: "Speed and reliability vs Selenium & Cypress",
        estimatedMinutes: 10,
        contentMarkdown: `## Speed and reliability vs Selenium
Two distinct claims worth separating:
- Speed: Playwright communicates with the browser directly over CDP/WebSocket (see Part 1, Chapter 3), which is a lower-overhead path than Selenium's WebDriver protocol, which adds an extra HTTP layer (the WebDriver server) between your test code and the browser.
- Reliability: this comes almost entirely from auto-waiting. A Selenium suite without carefully hand-tuned explicit waits will produce intermittent failures that have nothing to do with real bugs — just timing. Teams that migrate to Playwright commonly report their flaky-test rate dropping substantially, simply because the waiting problem is handled by the framework instead of by every individual test author remembering to do it right.

## Modern web app support (SPAs, shadow DOM, iframes) vs older tools
Selenium and older Puppeteer-era approaches were designed before SPAs (React/Angular/Vue apps that don't do full page reloads) and shadow DOM (encapsulated web components) were the norm. Playwright's locator engine was built with these patterns in mind — it can pierce shadow DOM by default and has first-class frame_locator() support for iframes (Part 2, Chapter 9), rather than requiring the workarounds these patterns demanded in older tools.

## Lower flakiness due to auto-waiting
Restating this because it's genuinely the recurring theme across the entire manual — it comes up again in Chapters 5, 7, and 8. If there's one concept to have rock-solid before moving past Part 2, it's this one.

## Growing job market demand
Practically relevant to you specifically: Playwright adoption has grown fast over the last few years, and job postings mentioning it (versus Selenium-only postings) have been trending upward. This isn't just a "nice tool" — it's increasingly what QA automation job descriptions actually ask for, which is part of why this manual exists in your learning path.`,
        summaryMarkdown: `⚡ Quick AI Summary:
- **Direct WebSocket CDP**: Bypasses Selenium's HTTP WebDriver proxy layer for maximum execution speed.
- **Built for SPAs**: Native shadow DOM piercing and iframe frame_locator() handling without hacks.
- **Job Demand**: Fast-growing industry preference over legacy Selenium frameworks.`,
        exercises: [{ prompt: "Why does Playwright handle multi-tab testing better than Cypress?", solutionCode: "Playwright runs outside the browser and drives it via WebSocket CDP externally." }],
        resourceLinks: [{ title: "Playwright vs Selenium Comparison", url: "https://playwright.dev/python/docs/intro", description: "Official comparison overview." }],
      },

      {
        id: "pw-ch-4",
        order: 5,
        slug: "what-this-manual-will-not-cover",
        title: "Ch 4: What This Manual Will NOT Cover",
        subtitle: "Scope Boundaries & Out-of-Scope Domains",
        estimatedMinutes: 10,
        contentMarkdown: `## JavaScript/TypeScript Playwright (this manual is Python-focused)
Worth flagging early: a huge amount of Playwright's own official documentation and community content is written JS/TS-first (since that's Playwright's native language and where the built-in test runner lives). You'll frequently find yourself reading JS examples online and needing to mentally translate syntax to Python (e.g., page.click() stays similar, but async/await patterns, config files, and the test runner itself differ). This manual won't teach you that translation — it sticks to Python + pytest-playwright throughout.

## Mobile native app testing (Appium territory)
Mobile web emulation (Chapter 2, above) is in scope — testing a website as it renders in a mobile browser. Testing an actual native iOS/Android app (a compiled app installed from an app store) is a fundamentally different problem requiring Appium, which automates the OS-level app itself rather than a browser. Don't confuse the two when scoping out future learning — they're different tools solving different problems.

## Load/performance testing (that's k6/JMeter/Locust)
Playwright automates one browser session behaving like one real user — it's not built to simulate thousands of concurrent users hitting a server to measure throughput/latency under load. That's a separate discipline (performance/load testing) with its own dedicated tools: k6 (modern, scriptable, popular in CI pipelines), JMeter (older, GUI-heavy, still widely used in enterprises), and Locust (Python-based, code-first).`,
        summaryMarkdown: `⚡ Quick AI Summary:
- **Python Focus**: Excludes Node.js / TypeScript syntax to stick strictly to Python + pytest-playwright.
- **No Native Mobile**: Mobile web is emulated, but compiled APK/IPA testing belongs to Appium.
- **No Load Testing**: Concurrent traffic simulation belongs to k6 / Locust / JMeter.`,
        exercises: [{ prompt: "Which tool should be used for testing native Android APKs?", solutionCode: "Appium" }],
        resourceLinks: [{ title: "Appium Documentation", url: "http://appium.io/", description: "Native mobile app automation." }],
      },

      {
        id: "pw-ch-5",
        order: 6,
        slug: "introduction-to-playwright-and-comparisons",
        title: "Ch 5: Introduction to Playwright & Comparisons",
        subtitle: "Architecture Matrix (Selenium vs Cypress vs Playwright)",
        estimatedMinutes: 12,
        contentMarkdown: `## What is Playwright, why it exists
This chapter restates the origin story from Part 0 but frames it as the entry point to hands-on learning — the point where you stop reading about the tool and start touching it. The key mental shift here: everything in Part 0 was "why should I care," Part 1 onward is "how do I actually use this."

## Playwright vs Selenium vs Cypress
- Protocol: Selenium uses WebDriver (HTTP); Cypress runs inside browser; Playwright uses CDP/WebSocket (direct).
- Browsers: Selenium supports most via separate drivers; Cypress supports Chromium + exp Firefox/WebKit; Playwright natively supports Chromium, Firefox, WebKit.
- Auto-waiting: Selenium = No (manual); Cypress = Yes; Playwright = Yes.
- Multi-tab / Multi-origin: Selenium = Clunky; Cypress = Weak architectural limitation; Playwright = Native support.
- Language Support: Selenium = Java/Python/C#/JS; Cypress = JS/TS only; Playwright = JS/TS, Python, Java, .NET.

The Cypress limitation is worth understanding, not just memorizing: Cypress executes its test code inside the browser itself, in the same run loop as the page. This is why it's fast, but it also means it historically struggled with things like multiple tabs or cross-origin navigation — because it's architecturally tied to a single browser tab/origin. Playwright runs outside the browser and drives it externally.`,
        summaryMarkdown: `⚡ Quick AI Summary:
- **Cypress Architecture**: Cypress runs inside the browser run-loop (struggles with tabs/cross-origin).
- **Playwright Architecture**: Runs outside the browser over bi-directional WebSocket CDP.
- **Python Syntax**: Uses snake_case methods (e.g. get_by_role) matching Pythonic conventions.`,
        exercises: [{ prompt: "Launch WebKit browser in Python", solutionCode: "browser = p.webkit.launch()" }],
        resourceLinks: [{ title: "Playwright Python API", url: "https://playwright.dev/python/docs/api/class-playwright", description: "API reference." }],
      },

      {
        id: "pw-ch-6",
        order: 7,
        slug: "environment-setup",
        title: "Ch 6: Environment Setup & Virtual Environments",
        subtitle: "Virtual Environments, pip install & playwright install",
        estimatedMinutes: 12,
        contentMarkdown: `## Installing Python, pip, virtual environments
Assuming Python is installed, the critical habit here is virtual environments (venv). Every project should get its own isolated environment:
python -m venv venv
source venv/bin/activate # Mac/Linux
venv\\Scripts\\activate # Windows

Why this matters beyond "best practice" advice: different projects may need different Playwright/pytest versions, and installing everything globally eventually causes version conflicts that are painful to debug.

## Installing Playwright + browser binaries
Two separate steps that beginners often miss the distinction between:
pip install pytest-playwright
playwright install

The first installs the Python package (the API you write code against). The second downloads the actual browser binaries (Chromium, Firefox, WebKit) — Playwright doesn't use your system-installed Chrome; it ships its own pinned browser builds. This is deliberate: it guarantees every developer and every CI machine runs the exact same browser version, eliminating "works on my machine" bugs caused by browser version drift.`,
        summaryMarkdown: `⚡ Quick AI Summary:
- **Two-Step Setup**: pip install pytest-playwright (Python package) + playwright install (browser binaries).
- **Pinned Browsers**: Playwright downloads its own browser binaries to prevent version drift between dev and CI.`,
        exercises: [{ prompt: "Command to install Playwright Python package", solutionCode: "pip install pytest-playwright" }],
        resourceLinks: [{ title: "Playwright Installation Guide", url: "https://playwright.dev/python/docs/intro#installation", description: "Installation instructions." }],
      },

      {
        id: "pw-ch-7",
        order: 8,
        slug: "playwright-architecture-hierarchy",
        title: "Ch 7: Playwright Architecture & Hierarchy",
        subtitle: "Browser, BrowserContext & Page Hierarchy Explained",
        estimatedMinutes: 12,
        contentMarkdown: `## Browser, BrowserContext, Page hierarchy
This is the conceptual backbone of the entire tool, so it's worth internalizing precisely:
- Browser — one actual browser process (e.g., one Chromium instance). Launching a browser is relatively expensive (time and memory), so you typically launch one per test session, not one per test.
- BrowserContext — an isolated session within that browser, roughly equivalent to an incognito window. Each context has its own cookies, local storage, cache, and permissions — completely separate from other contexts in the same browser. Creating a new context is cheap and fast (~2ms), which is why the recommended pattern is: one browser launch per session, one new context per test (for isolation between tests), and reuse the browser itself.
- Page — one tab within a context. A context can have multiple pages open simultaneously.

## Sync API vs Async API
- Sync API — code reads top-to-bottom, no await keywords. Used by pytest-playwright by default.
- Async API — uses async/await, needed if integrating Playwright into an asyncio-based application.

## How Playwright talks to browsers (CDP, WebSocket)
Playwright launches a browser process and connects to it over the Chrome DevTools Protocol (CDP) via a WebSocket connection. CDP is the same protocol Chrome's own DevTools panel uses internally — meaning Playwright has access to genuinely deep browser internals (network events, DOM state, console messages, performance data), not just surface-level commands.`,
        summaryMarkdown: `⚡ Quick AI Summary:
- **Browser**: Expensive process launched once per test session.
- **BrowserContext**: Cheap (~2ms) incognito-like isolated session per test for 100% test isolation.
- **Page**: Individual tab within a context.`,
        exercises: [{ prompt: "Create a new BrowserContext in Python", solutionCode: "context = browser.new_context()" }],
        resourceLinks: [{ title: "BrowserContext API Docs", url: "https://playwright.dev/python/docs/api/class-browsercontext", description: "BrowserContext reference." }],
      },

      {
        id: "pw-ch-8",
        order: 9,
        slug: "first-script",
        title: "Ch 8: First Script & Resource Cleanup",
        subtitle: "Headless vs Headed Execution & Clean Shutdown",
        estimatedMinutes: 15,
        contentMarkdown: `## Launching a browser (headless vs headed)
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False) # headed — visible window
    page = browser.new_page()
    page.goto("https://example.com")
    print(page.title())
    browser.close()

headless=True (the default) runs with no visible window — faster and what CI environments require. headless=False opens an actual visible browser window — invaluable while writing and debugging a new test.

## Closing browser/context properly
Using the with sync_playwright() as p: context manager handles Playwright's own startup/shutdown automatically, but you're still responsible for closing the browser/context you opened within it. Forgetting this in a real test suite with fixtures will leak memory and eventually crash CI runners.`,
        summaryMarkdown: `⚡ Quick AI Summary:
- **Headed vs Headless**: Use headless=False during dev debugging; use default headless=True in CI.
- **Resource Cleanup**: Always call browser.close() to prevent memory leaks in CI runners.`,
        exercises: [{ prompt: "Launch Chromium in non-headless (visible) mode", solutionCode: "p.chromium.launch(headless=False)" }],
        resourceLinks: [{ title: "Playwright First Test", url: "https://playwright.dev/python/docs/writing-tests", description: "Writing tests guide." }],
      },
    ],
  },
];
