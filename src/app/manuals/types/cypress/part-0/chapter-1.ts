import type { ChapterRecord } from "../../../types";

/** 0.1 What is Cypress, Really */
export const chapter = {
  "id": "cy-0-1-what-is-cypress-really",
  "title": "0.1 What is Cypress, Really",
  "minutes": 35,
  "level": "beginner",
  "phase": "Part 0 · Orientation",
  "partName": "Part 0 · Orientation",
  "overviewText": "Cypress is a JavaScript/TypeScript-native end-to-end testing platform, not a thin wrapper around a browser automation protocol. Installing cypress gives you a bundled test runner, Chai (with Chai-jQuery and Sinon-Chai), Sinon.js, a built-in network-mocking layer, and a full desktop GUI — all pre-integrated. Contrast this with Selenium, where you typically assemble WebDriver bindings, a separate test runner, a separate assertion library, and a separate reporter yourself.",
  "why": "Interviewers expect you to explain Cypress's in-browser architecture and the free vs Cypress Cloud boundary — not just list commands. Being able to articulate why the trade-off exists (not just that Cypress cannot do multi-tab) is a stronger answer than a memorized comparison chart.",
  "when": "Read before installing Cypress or comparing it to Playwright/Selenium. Revisit when explaining why Cypress handles network stubbing differently or why cross-origin flows need cy.origin().",
  "practical": {
    "app": "Bizlevate HRM — tool evaluation",
    "scenario": "A senior engineer asks what you actually pay for with Cypress, and why Cypress commands are not real Promises.",
    "pass": "You explain the all-in-one stack, Brian Mann's visibility-at-failure motivation, the Cloud orchestration paywall, and Position 2 (test lives in the same JS event loop as the app).",
    "fail": "You say Cypress is 'faster Selenium' without naming the execution-model difference or what's behind the paywall."
  },
  "tools": [],
  "customSummary": "- All-in-one JS/TS platform: bundled runner, Chai, Sinon, network mocking, GUI — vs Selenium's assemble-it-yourself stack.\n- Founded by Brian Mann (~2014–2015); core runner open-sourced 2017 (MIT) — ~3 years before Playwright's Jan 2020 release.\n- Cypress.io is VC-funded, revenue tied to Cloud; Playwright is Microsoft-backed for platform adoption — explains differing feature-expansion pace.\n- Free: Test Runner GUI, all commands, cy.intercept(), cy.request(), component testing, cy.session(), headless run, local video/screenshots.\n- Paid (Cypress Cloud): hosted artifacts, intelligent parallelization orchestration, flaky-test analytics, PR/Slack integrations — not extra testing capability.\n- Two philosophies: (1) Selenium/Playwright — external observer via a protocol; (2) Cypress — test runs inside the same world as the app.",
  "contentMarkdown": "## Origin architecture\n\nCypress is a JavaScript/TypeScript-native end-to-end testing platform, not a thin wrapper around a browser automation protocol. Installing `cypress` gives you a bundled test runner, Chai (assertions, extended with Chai-jQuery and Sinon-Chai), Sinon.js (spies/stubs/mocks), a built-in network-mocking layer, and a full desktop GUI — all pre-integrated.\n\nContrast this with Selenium, where you typically assemble WebDriver bindings, a separate test runner (JUnit/TestNG/pytest), a separate assertion library, and a separate reporter yourself.\n\n## History — built by Cypress.io, first released publicly in 2017\n\nCypress was founded by Brian Mann, who began building it around 2014–2015. His stated motivation was that he'd spent years writing Selenium/WebDriver-based tests professionally and kept hitting the same wall: the test code itself had almost no visibility into what the application was actually doing at the moment of failure. You'd get a stack trace pointing at your test framework, not at your app's actual state. He wanted a tool where the test and the application lived in the same execution context, so a test failure could show you the app's real, live state — not a reconstructed guess.\n\nCypress was initially released as a semi-commercial product (free to use locally, paid for recording/dashboard features), then the core test runner was fully open-sourced in 2017 under the MIT license. Cypress predates Playwright's January 2020 public release by about three years, giving Cypress a multi-year head start in community adoption, plugin ecosystem maturity, and \"de facto standard for JS-first teams\" mindshare.\n\n## Commercial model shapes the roadmap\n\nCypress.io raised venture funding and built a genuine business around the Cloud/Dashboard product. Playwright is funded by Microsoft as part of a much larger platform (Azure DevOps, VS Code, etc.). Cypress's release cadence is driven by a smaller company whose revenue depends on teams paying for Cloud. Playwright has expanded more aggressively into adjacent territory (API testing, component testing, visual comparisons) as a Microsoft-backed team with more resources. Neither model is inherently better, but it explains behavioral differences you will notice.\n\n## Open-source vs Cypress Cloud (paid)\n\n**Fully free, in `npm install cypress`:**\n- The entire Test Runner GUI (`cypress open`)\n- All core commands, locators, and assertions\n- `cy.intercept()`, `cy.request()`, component testing, `cy.session()`\n- Headless execution (`cypress run`)\n- Local video/screenshot capture on failure\n- Local Mochawesome/JUnit style reporting via your own plugins\n\n**Paid, via Cypress Cloud:**\n- Centralized hosted storage of recorded run videos/screenshots\n- Parallelization orchestration (the big one) — intelligent spec assignment across CI machines based on historical run times. Without Cloud you can still parallelize manually (`cypress-parallel`, covered in Part 9/11) but you do your own load-balancing.\n- Flaky test detection/analytics across many runs\n- GitHub/GitLab PR status checks and Slack integration\n\nInterview-safe framing: \"Cypress Cloud doesn't unlock testing capability you can't otherwise access — it's an orchestration and visibility layer for running Cypress at scale in CI. A solo developer or small team can get 100% of the actual test-writing and running power for free.\"\n\n## Why it was created — two philosophical positions\n\n**Position 1 (Selenium/WebDriver lineage, including Playwright):** \"A test is an external observer that remote-controls a browser.\" The test process and the browser process are separate; they talk over a protocol (WebDriver HTTP, or CDP WebSocket). This is architecturally clean and gives enormous flexibility — multiple browsers, multiple contexts, multiple tabs, cross-origin navigation — because nothing about the test process is tied to any single page or origin.\n\n**Position 2 (Cypress's founding bet):** \"A test should live inside the same world as the application, so it can see everything the application sees, live.\" Cypress test code executes inside the browser, in the same event loop as your application's JavaScript. This is why Cypress commands aren't real async/await Promises the way Playwright's are — they're built on a custom internal command queue.\n\nConsequence of Position 2: zero-latency DOM/network visibility, the ability to mock `window` methods directly — but also same-origin security restrictions. That is exactly why cross-origin testing needed `cy.origin()` (Part 9) bolted on later, and why true multi-tab support remains structurally awkward: a single Cypress test's JS execution context cannot simply \"be\" two different tabs simultaneously the way an external Playwright process trivially can hold two Page objects.\n\nBeing able to articulate *why* the trade-off exists is a stronger interview answer than reciting \"Cypress can't do multi-tab\" as an isolated fact.",
  "blocks": [
    {
      "id": "cy-0-1-md-0",
      "type": "overview",
      "heading": "Origin architecture",
      "content": "Cypress is a JavaScript/TypeScript-native end-to-end testing platform, not a thin wrapper around a browser automation protocol. Installing `cypress` gives you a bundled test runner, Chai (assertions, extended with Chai-jQuery and Sinon-Chai), Sinon.js (spies/stubs/mocks), a built-in network-mocking layer, and a full desktop GUI — all pre-integrated.\n\nContrast this with Selenium, where you typically assemble WebDriver bindings, a separate test runner (JUnit/TestNG/pytest), a separate assertion library, and a separate reporter yourself.",
      "order": 0
    },
    {
      "id": "cy-0-1-md-1",
      "type": "overview",
      "heading": "History — built by Cypress.io, first released publicly in 2017",
      "content": "Cypress was founded by Brian Mann, who began building it around 2014–2015. His stated motivation was that he'd spent years writing Selenium/WebDriver-based tests professionally and kept hitting the same wall: the test code itself had almost no visibility into what the application was actually doing at the moment of failure. You'd get a stack trace pointing at your test framework, not at your app's actual state. He wanted a tool where the test and the application lived in the same execution context, so a test failure could show you the app's real, live state — not a reconstructed guess.\n\nCypress was initially released as a semi-commercial product (free to use locally, paid for recording/dashboard features), then the core test runner was fully open-sourced in 2017 under the MIT license. Cypress predates Playwright's January 2020 public release by about three years, giving Cypress a multi-year head start in community adoption, plugin ecosystem maturity, and \"de facto standard for JS-first teams\" mindshare.",
      "order": 1
    },
    {
      "id": "cy-0-1-md-2",
      "type": "overview",
      "heading": "Commercial model shapes the roadmap",
      "content": "Cypress.io raised venture funding and built a genuine business around the Cloud/Dashboard product. Playwright is funded by Microsoft as part of a much larger platform (Azure DevOps, VS Code, etc.). Cypress's release cadence is driven by a smaller company whose revenue depends on teams paying for Cloud. Playwright has expanded more aggressively into adjacent territory (API testing, component testing, visual comparisons) as a Microsoft-backed team with more resources. Neither model is inherently better, but it explains behavioral differences you will notice.",
      "order": 2
    },
    {
      "id": "cy-0-1-md-3",
      "type": "overview",
      "heading": "Open-source vs Cypress Cloud (paid)",
      "content": "**Fully free, in `npm install cypress`:**\n- The entire Test Runner GUI (`cypress open`)\n- All core commands, locators, and assertions\n- `cy.intercept()`, `cy.request()`, component testing, `cy.session()`\n- Headless execution (`cypress run`)\n- Local video/screenshot capture on failure\n- Local Mochawesome/JUnit style reporting via your own plugins\n\n**Paid, via Cypress Cloud:**\n- Centralized hosted storage of recorded run videos/screenshots\n- Parallelization orchestration (the big one) — intelligent spec assignment across CI machines based on historical run times. Without Cloud you can still parallelize manually (`cypress-parallel`, covered in Part 9/11) but you do your own load-balancing.\n- Flaky test detection/analytics across many runs\n- GitHub/GitLab PR status checks and Slack integration\n\nInterview-safe framing: \"Cypress Cloud doesn't unlock testing capability you can't otherwise access — it's an orchestration and visibility layer for running Cypress at scale in CI. A solo developer or small team can get 100% of the actual test-writing and running power for free.\"",
      "order": 3
    },
    {
      "id": "cy-0-1-md-4",
      "type": "overview",
      "heading": "Why it was created — two philosophical positions",
      "content": "**Position 1 (Selenium/WebDriver lineage, including Playwright):** \"A test is an external observer that remote-controls a browser.\" The test process and the browser process are separate; they talk over a protocol (WebDriver HTTP, or CDP WebSocket). This is architecturally clean and gives enormous flexibility — multiple browsers, multiple contexts, multiple tabs, cross-origin navigation — because nothing about the test process is tied to any single page or origin.\n\n**Position 2 (Cypress's founding bet):** \"A test should live inside the same world as the application, so it can see everything the application sees, live.\" Cypress test code executes inside the browser, in the same event loop as your application's JavaScript. This is why Cypress commands aren't real async/await Promises the way Playwright's are — they're built on a custom internal command queue.\n\nConsequence of Position 2: zero-latency DOM/network visibility, the ability to mock `window` methods directly — but also same-origin security restrictions. That is exactly why cross-origin testing needed `cy.origin()` (Part 9) bolted on later, and why true multi-tab support remains structurally awkward: a single Cypress test's JS execution context cannot simply \"be\" two different tabs simultaneously the way an external Playwright process trivially can hold two Page objects.\n\nBeing able to articulate *why* the trade-off exists is a stronger interview answer than reciting \"Cypress can't do multi-tab\" as an isolated fact.",
      "order": 4
    }
  ],
  "advantages": [
    "0.1 What is Cypress, Really — Interviewers expect you to explain Cypress's in-browser architecture and the free vs Cypress Cloud boundary — not just list commands."
  ],
  "limitations": [
    "0.1 What is Cypress, Really is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
