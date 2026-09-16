import type { ChapterRecord } from "../../../types";

/** 0.6 Supported Browsers & Core Limitations */
export const chapter = {
  "id": "cy-0-6-supported-browsers-core-limitations",
  "title": "0.6 Supported Browsers & Core Limitations",
  "minutes": 26,
  "level": "beginner",
  "phase": "Part 0 · Orientation",
  "partName": "Part 0 · Orientation",
  "overviewText": "Electron ships bundled (zero-setup default). Chrome, Edge, and Firefox are detected from local installs. WebKit has never had first-class official support. No true multi-tab command interface. No cross-origin by default (cy.origin() is the escape hatch). 'Parallel' means multiple CI machines each running one browser against a subset of specs — not multiple browsers in one process.",
  "why": "Safari/iOS-web-view needs, SSO, and 'View PDF in new tab' are the concrete reasons a team might choose Playwright. Knowing what 'parallel' actually means prevents a broken CI design.",
  "when": "Browser-matrix planning, SSO test design, and any feature that opens target=_blank.",
  "practical": {
    "app": "HRM payslip PDF (target=_blank) + Okta login",
    "scenario": "Write a test plan that does not require switching tabs or silently dying after the SSO redirect.",
    "pass": "You assert href/target on the payslip link (or cy.request the PDF), and wrap Okta steps in cy.origin('https://login.okta.com', ...). You schedule Chrome and Firefox as separate cypress run invocations.",
    "fail": "You look for cy.switchToTab(), or assume one cypress run covers Chrome and Firefox concurrently."
  },
  "tools": [],
  "customSummary": "- Chromium family + bundled Electron + Firefox; WebKit historically limited vs Playwright's full WebKit support.\n- No true multi-tab: second tab opens at OS level but Cypress cannot address its DOM (workarounds in Part 9.3).\n- No cross-origin by default: navigating away breaks the shared iframe context; cy.origin() is the deliberate escape hatch.\n- Single browser per test run: multi-browser coverage needs separate runs (sequential, CI matrix, or Cloud parallelization).",
  "contentMarkdown": "## Browser support in practical detail\n\nElectron ships bundled with the `cypress` npm package itself — no separate download, no version-matching concerns, which is why it's the silent default in a lot of getting-started tutorials and CI configs that never explicitly set a browser.\n\nChrome, Edge, and Chromium itself are supported by pointing Cypress at browsers already installed on the machine. Cypress detects and lists them in the browser dropdown, or you target them by name via `--browser`. Firefox support was added later and works similarly — detected from the local install rather than bundled.\n\nWebKit — the engine behind Safari — has never had first-class, officially supported status in Cypress the way it does in Playwright. Experimental community WebKit runners have existed, but it's not something you'd rely on for a production suite. If Safari-specific rendering bugs or iOS-web-view-specific behavior matter to your product, this is a genuine, concrete reason a team might choose Playwright over Cypress.\n\n## Multi-tab — a real scenario\n\nImagine an HRM system where clicking \"View Payslip PDF\" opens the PDF in a new browser tab via `target=\"_blank\"`. In Playwright, you'd listen for a new page event, grab a handle to that new Page object, and assert on its content — two live page objects, both fully controllable, in the same test.\n\nIn Cypress, that second tab genuinely opens at the OS/browser level (you'd see it if running headed), but Cypress's command interface has no way to address it — there's no `cy.switchToTab()`. The idiomatic workaround is to avoid needing to interact with the second tab's content at all: assert that the triggering link has the correct `href` and `target=\"_blank\"` attributes, or restructure the test to request that same resource directly via `cy.request()` and assert on the response. Part 9.3 walks through substitution patterns in depth.\n\n## Cross-origin — a real scenario\n\nPicture a login flow that redirects to Okta (or Azure AD, Google Workspace) then back. Without special handling, the moment Cypress's iframe navigates to `login.okta.com`, Cypress loses its privileged access — later commands fail to find elements because Cypress is still listening to the original origin.\n\n```js\ncy.origin('https://login.okta.com', () => {\n  cy.get('#username').type('user@example.com');\n  cy.get('#password').type('secret');\n  cy.get('button[type=\"submit\"]').click();\n});\n```\n\nEverything inside that callback executes as if freshly injected into the Okta origin; everything outside it resumes assuming your original app's origin. More ceremony than Playwright (which requires none), but a deliberate, learnable pattern rather than an unsolvable gap. Part 9.1 builds a full working SSO-style test.\n\n## Single browser per test run — what \"parallel\" actually means\n\nWhen people say \"Cypress runs tests in parallel,\" they don't mean one test run juggling multiple browsers simultaneously. They mean: multiple independent CI machines each run `cypress run` against their own single browser, each machine handling a different subset of your spec files, and (if using Cypress Cloud) the Cloud service coordinates which machine gets which spec based on historical timing data.\n\nLocally, without Cloud, running your full suite against Chrome and then again against Firefox is two entirely separate, sequential invocations of `cypress run --browser <name>` — there's no single command that spins up several browsers concurrently within one Cypress process. This distinction matters when you're setting up a CI pipeline in Part 11: \"parallelization\" in Cypress's vocabulary is about splitting spec files across machines, not about multi-browser concurrency within one machine.",
  "advantages": [
    "0.6 Supported Browsers & Core Limitations — Safari/iOS-web-view needs, SSO, and 'View PDF in new tab' are the concrete reasons a team might choose Playwright."
  ],
  "limitations": [
    "0.6 Supported Browsers & Core Limitations is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
