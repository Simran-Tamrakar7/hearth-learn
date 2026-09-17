import type { ChapterRecord } from "../../../types";

/** A. Cypress vs Playwright vs Selenium — comparison table */
export const chapter = {
  "id": "cy-15-1-cypress-vs-playwright-vs-selenium-comparison-tab",
  "title": "A. Cypress vs Playwright vs Selenium — comparison table",
  "minutes": 28,
  "level": "advanced",
  "phase": "Part 15 · Appendices",
  "partName": "Part 15 · Appendices",
  "overviewText": "This appendix is the interview table: execution model, browsers (no first-class WebKit in Cypress), waiting, tabs/origin, languages, debugging (no Cypress Trace Viewer), CT, visual (no Cypress built-in), API, sessions, parallel (machines vs workers), mobile (Appium for native), commercial Cloud vs OSS. Use it with Parts 0 and 9 — do not memorize rows without the architecture sentence.",
  "why": "Almost every senior screen starts here. A table without 'why' is a junior answer; this chapter supplies both.",
  "when": "Before interviews (13.3), when choosing a tool for a new Bizlevate surface, and when a PM asks 'can Cypress replace everything.'",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You must recommend a stack for web HRM, Safari-critical marketing, and a native iOS app.",
    "pass": "You put Cypress on JS web+CT, Playwright on Safari/multi-tab/trace-heavy CI, Appium on native, Selenium only if the org is already JVM-deep.",
    "fail": "You pick one tool for all three surfaces."
  },
  "tools": [],
  "customSummary": "- Cypress: in-page, JS/TS, CT strength, GUI; weak tabs/WebKit/trace zip.\n- Playwright: external CDP, WebKit, trace.zip, workers, languages.\n- Selenium: WebDriver, broad languages/browsers, Grid; more assembly.\n- Native mobile: Appium for all three (not Cypress/Playwright).\n- Parallel in Cypress = machines sharding specs.",
  "contentMarkdown": "## Master table\n\n| Topic | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Execution | In-browser, command queue | External, CDP/WebSocket | External, WebDriver HTTP |\n| Languages | JS/TS only | JS/TS, Python, Java, .NET | Many |\n| Browsers | Electron, Chrome, Edge, Firefox; **no first-class WebKit** | Chromium, Firefox, **WebKit** | Most, via drivers (incl. SafariDriver) |\n| Auto-wait | Command + assertion retry-ability | Actionability + expect retries | Historically manual; improving |\n| Cross-origin | `cy.origin({ args })` | Transparent | Transparent |\n| Multi-tab | **No switchToTab**; href/request/stubs | Pages/popups | Window handles |\n| Shadow DOM | Opt-in `includeShadowDom` / `.shadow()` | Open shadow pierced by default | `getShadowRoot()` |\n| Debugging live | App time-travel / UI Mode | Inspector / UI Mode | IDE debugger |\n| Post-mortem | Screenshots/videos; **no Trace Viewer**; Cloud Replay paid | **trace.zip** | Vendor video/logs |\n| Component testing | **First-class `cy.mount`** | Exists, less central (esp. Python) | None |\n| Visual regression | **No built-in** (plugin/SaaS) | Built-in screenshot matcher | Plugin/SaaS |\n| a11y | **cypress-axe** (axe-core) | axe-core wrappers | axe-core wrappers |\n| API | `cy.request` same session | Isolated APIRequestContext | REST libs |\n| Session | `cy.session` | storageState / context | cookies by hand |\n| Parallel | **Machines × spec shards** (Cloud smart split paid) | Workers + shard | Grid nodes |\n| CI helper | **cypress-io/github-action**; **cypress/browsers** images | playwright install / Microsoft images | driver/Grid images |\n| Dashboard | Cloud; **Sorry Cypress / Currents** | OSS HTML+trace; vendor clouds | Vendor clouds |\n| Reports | **Mochawesome two-part** (JSON then merge) | First-party HTML + blob merge | Allure/Extent/JUnit |\n| Logging | **cy.task** (Node) vs **cy.log** (GUI) | console in Node test | framework logs |\n| Native mobile | **No — Appium** | **No — Appium** | Appium (WebDriver family) |\n| Device emulation | `cy.viewport` (size) | viewport + UA + WebKit | Chrome options |\n| Origin company | Cypress.io, Cloud revenue | Microsoft | Open community + vendors |\n| First public | 2017 | 2020 | 2004 |\n\n## How to say it in 30 seconds\n\n\"Cypress runs inside the page — best GUI and CT for a JS HRM, but I wrap SSO in `cy.origin`, I don't do tabs, I don't have WebKit or a trace zip, and parallel means more CI machines. Playwright is the external driver with WebKit and traces. Selenium is the WebDriver ecosystem. Native is Appium.\"\n\n## Decision cheat\n\n- Frontend-owned React HRM, Chromium-majority users → **Cypress**.\n- Must catch Safari engine bugs or drive two tabs → **Playwright** (or add it).\n- Java org, existing Grid → **Selenium** until a rewrite is funded.\n- Store apps → **Appium** always.\n\nInterview line: \"I can fill this table and explain every Cypress 'no' as architecture, not as missing homework.\"",
  "blocks": [
    {
      "id": "cy-15-1-md-0",
      "type": "overview",
      "heading": "Master table",
      "content": "| Topic | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Execution | In-browser, command queue | External, CDP/WebSocket | External, WebDriver HTTP |\n| Languages | JS/TS only | JS/TS, Python, Java, .NET | Many |\n| Browsers | Electron, Chrome, Edge, Firefox; **no first-class WebKit** | Chromium, Firefox, **WebKit** | Most, via drivers (incl. SafariDriver) |\n| Auto-wait | Command + assertion retry-ability | Actionability + expect retries | Historically manual; improving |\n| Cross-origin | `cy.origin({ args })` | Transparent | Transparent |\n| Multi-tab | **No switchToTab**; href/request/stubs | Pages/popups | Window handles |\n| Shadow DOM | Opt-in `includeShadowDom` / `.shadow()` | Open shadow pierced by default | `getShadowRoot()` |\n| Debugging live | App time-travel / UI Mode | Inspector / UI Mode | IDE debugger |\n| Post-mortem | Screenshots/videos; **no Trace Viewer**; Cloud Replay paid | **trace.zip** | Vendor video/logs |\n| Component testing | **First-class `cy.mount`** | Exists, less central (esp. Python) | None |\n| Visual regression | **No built-in** (plugin/SaaS) | Built-in screenshot matcher | Plugin/SaaS |\n| a11y | **cypress-axe** (axe-core) | axe-core wrappers | axe-core wrappers |\n| API | `cy.request` same session | Isolated APIRequestContext | REST libs |\n| Session | `cy.session` | storageState / context | cookies by hand |\n| Parallel | **Machines × spec shards** (Cloud smart split paid) | Workers + shard | Grid nodes |\n| CI helper | **cypress-io/github-action**; **cypress/browsers** images | playwright install / Microsoft images | driver/Grid images |\n| Dashboard | Cloud; **Sorry Cypress / Currents** | OSS HTML+trace; vendor clouds | Vendor clouds |\n| Reports | **Mochawesome two-part** (JSON then merge) | First-party HTML + blob merge | Allure/Extent/JUnit |\n| Logging | **cy.task** (Node) vs **cy.log** (GUI) | console in Node test | framework logs |\n| Native mobile | **No — Appium** | **No — Appium** | Appium (WebDriver family) |\n| Device emulation | `cy.viewport` (size) | viewport + UA + WebKit | Chrome options |\n| Origin company | Cypress.io, Cloud revenue | Microsoft | Open community + vendors |\n| First public | 2017 | 2020 | 2004 |",
      "order": 0
    },
    {
      "id": "cy-15-1-md-1",
      "type": "overview",
      "heading": "How to say it in 30 seconds",
      "content": "\"Cypress runs inside the page — best GUI and CT for a JS HRM, but I wrap SSO in `cy.origin`, I don't do tabs, I don't have WebKit or a trace zip, and parallel means more CI machines. Playwright is the external driver with WebKit and traces. Selenium is the WebDriver ecosystem. Native is Appium.\"",
      "order": 1
    },
    {
      "id": "cy-15-1-md-2",
      "type": "overview",
      "heading": "Decision cheat",
      "content": "- Frontend-owned React HRM, Chromium-majority users → **Cypress**.\n- Must catch Safari engine bugs or drive two tabs → **Playwright** (or add it).\n- Java org, existing Grid → **Selenium** until a rewrite is funded.\n- Store apps → **Appium** always.\n\nInterview line: \"I can fill this table and explain every Cypress 'no' as architecture, not as missing homework.\"",
      "order": 2
    }
  ],
  "advantages": [
    "A. Cypress vs Playwright vs Selenium — comparison table — Almost every senior screen starts here."
  ],
  "limitations": [
    "A. Cypress vs Playwright vs Selenium — comparison table is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
