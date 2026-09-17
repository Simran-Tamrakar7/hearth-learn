import type { ChapterRecord } from "../../../types";

/** 0.4 Why Companies Choose Cypress Over Alternatives */
export const chapter = {
  "id": "cy-0-4-why-companies-choose-cypress-over-alternatives",
  "title": "0.4 Why Companies Choose Cypress Over Alternatives",
  "minutes": 30,
  "level": "beginner",
  "phase": "Part 0 · Orientation",
  "partName": "Part 0 · Orientation",
  "overviewText": "Cypress is built around frontend engineers testing their own features live, mid-development — not just a dedicated automation engineer running headless CI. Failures show the exact DOM snapshot at fault. Cypress sidesteps WebDriver binary/version matching. Versus Playwright, Cypress bites on SSO/cross-origin (needs cy.origin()), multi-tab, and JS/TS-only language support.",
  "why": "Framing interview answers around concrete scenarios (SSO, two-tab compare, Python-only teams) signals real judgment rather than a memorized comparison chart.",
  "when": "Tool-selection discussions, architecture reviews, and 'when would you not choose Cypress?' interview questions.",
  "practical": {
    "app": "HRM with Okta SSO and a compare-payslips-in-two-tabs feature",
    "scenario": "Stakeholder asks why the team should pick Cypress over Playwright or stay on Selenium.",
    "pass": "You name DX persona (frontend mid-feature), Selenium driver-management pain, and three Playwright bite points: SSO wrapping, no clean multi-tab, no Python bindings.",
    "fail": "You recite 'Playwright is more flexible' with no scenario, or claim Cypress is universally better."
  },
  "tools": [],
  "customSummary": "- DX: built around frontend engineers testing live mid-development, not only dedicated automation engineers in CI.\n- Debuggability: failure shows the exact DOM snapshot, not just StaleElementReferenceException.\n- vs Selenium: bundles/manages browsers — skips chromedriver version-matching pain.\n- vs Playwright bite points: SSO needs cy.origin(); no clean two-tab control; JS/TS only.\n- Debugging timing differs: Cypress time-travel is live; Playwright Trace Viewer is post-hoc and more portable for CI.",
  "contentMarkdown": "## Dev-experience focus\n\nAsk who is expected to open the test runner and watch a test execute live, day to day. In a Cypress-centric team, it's often frontend engineers themselves, mid-feature-development, using Cypress almost like an extension of their own browser DevTools. In a Playwright/Selenium-centric team, it's more often a dedicated automation engineer running headless suites in CI and only occasionally launching a visible browser to debug a specific failure. Neither workflow is \"correct\" — but Cypress's GUI-first design bet makes far more sense around the first persona.\n\n## Debuggability — the same failure in both tools\n\nIn Selenium, a failed `.click()` on a stale element typically produces `StaleElementReferenceException: element is not attached to the page document` — technically accurate, but it tells you that something changed, not what the page actually looked like.\n\nIn Cypress, the same category of failure shows you the exact command log entry that failed, and clicking it restores the literal DOM as it existed at that instant — you can immediately see whether the element was covered by a loading spinner, whether it had been removed and replaced by a re-render, or whether your selector matched the wrong element. The diagnostic loop is \"look at the snapshot\" rather than \"read an exception message and reason about what probably happened.\"\n\n## vs Selenium — setup friction\n\nSelenium historically required you to download and manage a separate WebDriver binary per browser, matched carefully to your installed browser's exact version. Tools like Selenium Manager have improved this, but Cypress (and Playwright) sidestepped the entire category from day one by bundling/managing browser binaries themselves. A lot of real tool-migration decisions come down to unglamorous maintenance burden, not just flakiness rates.\n\n## vs Playwright — when it actually bites\n\n- **SSO / cross-origin:** if login redirects through Okta/Azure AD/Google Workspace and back, Cypress can handle this via `cy.origin()` (Part 9.1), but you must wrap third-party-domain steps in a special block. Playwright handles the same navigation transparently.\n- **Multi-tab:** \"compare two documents side by side\" or \"mark a notification read in one tab and see it live in another\" — Playwright opens two Page objects; Cypress has no clean native way to hold and interact with two tabs simultaneously.\n- **Language:** if the broader automation team is strong in Python but limited in JS/TS, Playwright's Python bindings mean they can write API and UI automation in the language they're strongest in. Cypress simply isn't an option there.\n\n## Comparison table (unpacked in Appendix A)\n\n| | Selenium | Cypress | Playwright |\n|---|---|---|---|\n| Execution model | External → WebDriver (HTTP) | Runs inside the browser | External → CDP (WebSocket) |\n| Browsers | Most, via drivers | Chromium-family natively; Firefox/Edge; no first-class WebKit | Chromium, Firefox, WebKit natively |\n| Auto-waiting | No (manual waits) | Yes (retry-ability wraps assertions) | Yes (actionability checks) |\n| Multi-tab / multi-origin | Clunky | Weak (architectural) | Native |\n| Languages | Many | JS/TS only | JS/TS, Python, Java, .NET |\n| Debugging | Stack traces | Time-travel, live DOM snapshots | Trace Viewer (post-hoc), Inspector (live) |\n| Component testing | No | Yes, mature | Yes, newer/less central |\n| Visual testing | No built-in | Plugin/SaaS only | Built-in (`to_have_screenshot`) |\n| API testing | No built-in | `cy.request()`, same-session | `APIRequestContext`, isolated |\n| Session reuse | Manual cookies | `cy.session()` | `storage_state` |\n| Parallelization | Third-party | Cloud (paid) or free plugin | pytest-xdist / CI matrix, free |\n| Origin | Open community | Cypress.io (VC-funded) | Microsoft |\n| First release | 2004 | 2017 | January 2020 |\n\n**Debugging row:** Cypress time-travel is live while the test runs in the GUI. Playwright's Trace Viewer is post-hoc from a saved `.zip` — actually more useful specifically for CI failures you weren't watching. For local iterative development, Cypress's live experience tends to feel faster; for a CI machine you weren't watching, Playwright's trace file is arguably just as good, if not more portable.\n\n**Origin/company row:** Cypress's roadmap is set by a smaller company whose commercial interest is the paid Cloud product. Playwright's roadmap is set by a Microsoft team without that same direct monetization pressure on the tool itself — which partly explains faster expansion into API, component, and visual testing as built-in capabilities rather than plugin territory.",
  "blocks": [
    {
      "id": "cy-0-4-md-0",
      "type": "overview",
      "heading": "Dev-experience focus",
      "content": "Ask who is expected to open the test runner and watch a test execute live, day to day. In a Cypress-centric team, it's often frontend engineers themselves, mid-feature-development, using Cypress almost like an extension of their own browser DevTools. In a Playwright/Selenium-centric team, it's more often a dedicated automation engineer running headless suites in CI and only occasionally launching a visible browser to debug a specific failure. Neither workflow is \"correct\" — but Cypress's GUI-first design bet makes far more sense around the first persona.",
      "order": 0
    },
    {
      "id": "cy-0-4-md-1",
      "type": "overview",
      "heading": "Debuggability — the same failure in both tools",
      "content": "In Selenium, a failed `.click()` on a stale element typically produces `StaleElementReferenceException: element is not attached to the page document` — technically accurate, but it tells you that something changed, not what the page actually looked like.\n\nIn Cypress, the same category of failure shows you the exact command log entry that failed, and clicking it restores the literal DOM as it existed at that instant — you can immediately see whether the element was covered by a loading spinner, whether it had been removed and replaced by a re-render, or whether your selector matched the wrong element. The diagnostic loop is \"look at the snapshot\" rather than \"read an exception message and reason about what probably happened.\"",
      "order": 1
    },
    {
      "id": "cy-0-4-md-2",
      "type": "overview",
      "heading": "vs Selenium — setup friction",
      "content": "Selenium historically required you to download and manage a separate WebDriver binary per browser, matched carefully to your installed browser's exact version. Tools like Selenium Manager have improved this, but Cypress (and Playwright) sidestepped the entire category from day one by bundling/managing browser binaries themselves. A lot of real tool-migration decisions come down to unglamorous maintenance burden, not just flakiness rates.",
      "order": 2
    },
    {
      "id": "cy-0-4-md-3",
      "type": "overview",
      "heading": "vs Playwright — when it actually bites",
      "content": "- **SSO / cross-origin:** if login redirects through Okta/Azure AD/Google Workspace and back, Cypress can handle this via `cy.origin()` (Part 9.1), but you must wrap third-party-domain steps in a special block. Playwright handles the same navigation transparently.\n- **Multi-tab:** \"compare two documents side by side\" or \"mark a notification read in one tab and see it live in another\" — Playwright opens two Page objects; Cypress has no clean native way to hold and interact with two tabs simultaneously.\n- **Language:** if the broader automation team is strong in Python but limited in JS/TS, Playwright's Python bindings mean they can write API and UI automation in the language they're strongest in. Cypress simply isn't an option there.",
      "order": 3
    },
    {
      "id": "cy-0-4-md-4",
      "type": "overview",
      "heading": "Comparison table (unpacked in Appendix A)",
      "content": "| | Selenium | Cypress | Playwright |\n|---|---|---|---|\n| Execution model | External → WebDriver (HTTP) | Runs inside the browser | External → CDP (WebSocket) |\n| Browsers | Most, via drivers | Chromium-family natively; Firefox/Edge; no first-class WebKit | Chromium, Firefox, WebKit natively |\n| Auto-waiting | No (manual waits) | Yes (retry-ability wraps assertions) | Yes (actionability checks) |\n| Multi-tab / multi-origin | Clunky | Weak (architectural) | Native |\n| Languages | Many | JS/TS only | JS/TS, Python, Java, .NET |\n| Debugging | Stack traces | Time-travel, live DOM snapshots | Trace Viewer (post-hoc), Inspector (live) |\n| Component testing | No | Yes, mature | Yes, newer/less central |\n| Visual testing | No built-in | Plugin/SaaS only | Built-in (`to_have_screenshot`) |\n| API testing | No built-in | `cy.request()`, same-session | `APIRequestContext`, isolated |\n| Session reuse | Manual cookies | `cy.session()` | `storage_state` |\n| Parallelization | Third-party | Cloud (paid) or free plugin | pytest-xdist / CI matrix, free |\n| Origin | Open community | Cypress.io (VC-funded) | Microsoft |\n| First release | 2004 | 2017 | January 2020 |\n\n**Debugging row:** Cypress time-travel is live while the test runs in the GUI. Playwright's Trace Viewer is post-hoc from a saved `.zip` — actually more useful specifically for CI failures you weren't watching. For local iterative development, Cypress's live experience tends to feel faster; for a CI machine you weren't watching, Playwright's trace file is arguably just as good, if not more portable.\n\n**Origin/company row:** Cypress's roadmap is set by a smaller company whose commercial interest is the paid Cloud product. Playwright's roadmap is set by a Microsoft team without that same direct monetization pressure on the tool itself — which partly explains faster expansion into API, component, and visual testing as built-in capabilities rather than plugin territory.",
      "order": 4
    }
  ],
  "advantages": [
    "0.4 Why Companies Choose Cypress Over Alternatives — Framing interview answers around concrete scenarios (SSO, two-tab compare, Python-only teams) signals real judgment rather than a memorized comparison chart."
  ],
  "limitations": [
    "0.4 Why Companies Choose Cypress Over Alternatives is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
