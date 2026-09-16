import type { ChapterRecord } from "../../../types";

/** 0.8 What This Manual Will NOT Cover */
export const chapter = {
  "id": "cy-0-8-what-this-manual-will-not-cover",
  "title": "0.8 What This Manual Will NOT Cover",
  "minutes": 14,
  "level": "beginner",
  "phase": "Part 0 · Orientation",
  "partName": "Part 0 · Orientation",
  "overviewText": "This manual does not cover Cypress internals, general plugin authorship, testing-philosophy treatises, native mobile apps, load testing, or non-JS bindings. Heavy multi-tab/cross-origin suites are a legitimate signal to consider Playwright — not a sign you're using Cypress wrong. Cypress (JS/TS) plus Playwright (Python) is portfolio breadth, not a tool switch.",
  "why": "Scoping what you will not claim to know — and when to walk away from a tool — is itself a senior automation-engineer signal in interviews.",
  "when": "Before expecting Cypress to replace Appium, k6, or a Python-only automation org. Revisit Part 9.2 if a large fraction of scenarios fight the architecture.",
  "practical": {
    "app": "Future native HRM mobile app + 500-user load test + Python API team",
    "scenario": "Someone asks you to cover all three with Cypress because 'we already picked it for E2E.'",
    "pass": "You send native apps to Appium, load to k6/Locust, and keep Playwright/Python for multi-language and multi-tab suites — Cypress stays the JS/TS E2E/CT tool.",
    "fail": "You promise Cypress can do native apps, 500 concurrent users, and Python bindings."
  },
  "tools": [],
  "customSummary": "- Not covering: Cypress internals/Electron packaging, publishing general-purpose plugins, general testing-pyramid theory (except where CT needs it).\n- Native mobile apps are Appium's domain — Cypress tests mobile-viewport web, not compiled store apps.\n- Load/performance testing is a hard architectural no (single browser JS engine).\n- Heavy multi-tab/cross-origin suites: after trying cy.origin() workarounds, switching that suite to Playwright is a legitimate senior call.\n- Non-JS/TS bindings: Cypress + Playwright (Python) together is a broader skill portfolio than either alone.",
  "contentMarkdown": "## Internals, plugin authorship, and testing theory\n\nThis manual won't walk through Cypress's own internal source code, Electron packaging internals, or how the Cypress binary is built and distributed — that's maintainer detail, not user-facing skill. Part 1 covers basics of `setupNodeEvents` (Cypress's Node-side plugin hook), but this manual doesn't teach authoring and publishing a general-purpose Cypress plugin for the ecosystem.\n\nIt also doesn't attempt to be a general treatise on software testing philosophy — the testing pyramid, unit-vs-integration-vs-E2E tradeoffs in the abstract, TDD/BDD debates — except at the specific point in Part 9 where Component Testing is introduced, since a little of that context becomes directly relevant there.\n\n## Native mobile app testing (Appium territory)\n\nCypress can test a website rendered in a mobile-sized viewport (useful for responsive-design verification, Part 9.9/9.17), and it can even run inside some mobile browser automation setups in narrow, non-standard configurations — but it fundamentally cannot automate a compiled native app installed from an app store, because there's no \"browser\" for its in-page JavaScript execution model to live inside. If Bizlevate ever ships a native mobile HRM app (as opposed to a mobile-responsive web version), that remains squarely Appium's domain, not Cypress's, regardless of how deep your Cypress skills go.\n\n## Load/performance testing — a hard no\n\nIt's not merely that this manual chooses not to cover it — Cypress is architecturally unsuited. Because Cypress test code runs inside a single browser instance's JS engine, generating \"500 concurrent simulated users\" would mean somehow running 500 simultaneous in-browser JS contexts on one machine, which isn't how Cypress (or any browser-based UI tool) is built to scale. Load testing tools like k6 or Locust don't render a real browser or DOM at all for most of their work — they're optimized purely for firing enormous volumes of raw HTTP requests efficiently, which is a completely different engineering problem than \"does clicking this button do the right thing.\"\n\n## Heavy multi-tab/cross-origin suites — when to walk away\n\nIf, after actually attempting the `cy.origin()` workarounds in Part 9.1, your team finds that a large fraction of your critical test scenarios are fighting against Cypress's architecture rather than working with it, that's a legitimate signal to reconsider Playwright for that specific suite — not a sign you're using Cypress wrong. Recognizing when a tool's limitations outweigh its strengths for your specific application is itself a mark of a senior automation engineer, and it's worth being comfortable saying so in an interview rather than defending whichever tool you happen to know best as universally correct.\n\n## Non-JS/TS bindings — skill portfolio\n\nIf you already have real Playwright + Python experience, this manual is not a \"switch.\" Your automation skill set is genuinely broader with Playwright (Python) + Cypress (JS/TS) combined than either alone — adding a second, differently-shaped tool for situations (frontend-heavy dev teams, component-testing needs, organizations already standardized on Cypress) where it's the better organizational fit, while keeping Playwright/Python for situations needing cross-language flexibility or deeper cross-origin/multi-tab support. Framing it as portfolio breadth rather than \"which one is better\" is both more accurate and a stronger positioning story for interviews (Part 13.4).",
  "advantages": [
    "0.8 What This Manual Will NOT Cover — Scoping what you will not claim to know — and when to walk away from a tool — is itself a senior automation-engineer signal in interviews."
  ],
  "limitations": [
    "0.8 What This Manual Will NOT Cover is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
