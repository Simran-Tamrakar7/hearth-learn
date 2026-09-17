import type { ChapterRecord } from "../../../types";

/** 9.12 Trace Viewer & Post-Mortem Debugging */
export const chapter = {
  "id": "cy-9-12-trace-viewer-post-mortem-debugging",
  "title": "9.12 Trace Viewer & Post-Mortem Debugging",
  "minutes": 28,
  "level": "advanced",
  "phase": "Part 9 · Advanced Topics",
  "partName": "Part 9 · Advanced Topics",
  "overviewText": "Cypress has no Trace Viewer and no trace.zip. Post-mortem on CI is videos, screenshots, the terminal error, Cypress Cloud Test Replay / Debug if you pay, and whatever you log with cy.task. Playwright records a zip you open with playwright show-trace. Do not tell a team to 'open the Cypress trace' — that sentence is a category error.",
  "why": "CI-only failures are the whole point of post-mortem tooling. Importing Playwright's mental model into Cypress Cloud sales calls — or worse, into a root-cause meeting — wastes hours.",
  "when": "When a spec fails on GitHub Actions but passes on your laptop, and whenever someone asks where the Cypress equivalent of Trace Viewer is.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "leave-approve.cy.ts failed on CI at cy.get('[data-cy=approve]'). You were not watching. You need to see DOM + network at that step.",
    "pass": "You collect screenshot/video artifacts (11.8), use Cloud Test Replay if the project records, and use cy.task logs. You explicitly say there is no trace.zip / Trace Viewer in open-source Cypress.",
    "fail": "You look for a traces/ folder or run npx cypress show-trace."
  },
  "tools": [],
  "customSummary": "- Cypress OSS: no Trace Viewer, no trace.zip, no playwright show-trace equivalent.\n- Local interactive: Command Log time-travel (not portable to CI).\n- CI post-mortem: screenshots, videos (video defaulted to false in Cypress 13+), stdout, cy.task logs.\n- Closest paid analog: Cypress Cloud Test Replay / Debug — not a zip you open offline.\n- Playwright: portable trace zip. Selenium: vendor recordings or raw logs.",
  "contentMarkdown": "## Two debugging times\n\n**While you watch** (`cypress open`): click the failed command, inspect the restored DOM, read the intercept. That is time-travel. It requires the App. It does not produce a file for Slack.\n\n**After CI already died:** you need artifacts that *survived the machine*. Cypress's open-source answers are:\n\n- PNG via `screenshotOnRunFailure` (still true)\n- MP4 via `video: true` (Cypress 13 changed the default to **false** — set it if you want videos)\n- the Mocha error + any `cy.task('log', ...)` lines in the job log\n\nThere is **no** `playwright show-trace trace.zip` analog in `npm install cypress`.\n\n## Cypress Cloud Debug / Test Replay\n\nPaid Cloud can reconstruct a replay of the recorded run (DOM snapshots, console, network) in the dashboard. That is the closest *experience* to Trace Viewer, with two differences you must name:\n\n1. It is **hosted and licensed**, not a zip in the repo.\n2. It is not the Playwright Trace Viewer UI; do not teach Cloud as \"Cypress Trace Viewer.\"\n\nIf the org will not pay, your post-mortem design is artifacts + logging (11.7, 11.8), not wishful tracing.\n\n## Make CI failures diagnosable without Cloud\n\n```js\n// noisy but honest\nafterEach(function () {\n  if (this.currentTest.state === 'failed') {\n    cy.task('log', {\n      title: this.currentTest.title,\n      error: this.currentTest.err?.message,\n    });\n  }\n});\n```\n\nPrefer `cy.task` over `cy.log` for CI: `cy.log` is a Command Log pretty-print; many CI terminals never show it (11.7).\n\n## Versus Playwright and Selenium\n\n| | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Live | App time-travel | Inspector / UI Mode | IDE debugger |\n| Portable post-mortem | video/screenshot; Cloud Replay (paid) | **trace.zip** | vendor video / logs |\n| Open offline | video player | `show-trace` | depends |\n\nInterview line: \"Cypress has no Trace Viewer. OSS post-mortem is screenshots/videos plus logs. Cloud Debug/Test Replay is the paid cousin of Playwright's zip, not the same artifact.\"",
  "blocks": [
    {
      "id": "cy-9-12-md-0",
      "type": "overview",
      "heading": "Two debugging times",
      "content": "**While you watch** (`cypress open`): click the failed command, inspect the restored DOM, read the intercept. That is time-travel. It requires the App. It does not produce a file for Slack.\n\n**After CI already died:** you need artifacts that *survived the machine*. Cypress's open-source answers are:\n\n- PNG via `screenshotOnRunFailure` (still true)\n- MP4 via `video: true` (Cypress 13 changed the default to **false** — set it if you want videos)\n- the Mocha error + any `cy.task('log', ...)` lines in the job log\n\nThere is **no** `playwright show-trace trace.zip` analog in `npm install cypress`.",
      "order": 0
    },
    {
      "id": "cy-9-12-md-1",
      "type": "overview",
      "heading": "Cypress Cloud Debug / Test Replay",
      "content": "Paid Cloud can reconstruct a replay of the recorded run (DOM snapshots, console, network) in the dashboard. That is the closest *experience* to Trace Viewer, with two differences you must name:\n\n1. It is **hosted and licensed**, not a zip in the repo.\n2. It is not the Playwright Trace Viewer UI; do not teach Cloud as \"Cypress Trace Viewer.\"\n\nIf the org will not pay, your post-mortem design is artifacts + logging (11.7, 11.8), not wishful tracing.",
      "order": 1
    },
    {
      "id": "cy-9-12-md-2",
      "type": "overview",
      "heading": "Make CI failures diagnosable without Cloud",
      "content": "```js\n// noisy but honest\nafterEach(function () {\n  if (this.currentTest.state === 'failed') {\n    cy.task('log', {\n      title: this.currentTest.title,\n      error: this.currentTest.err?.message,\n    });\n  }\n});\n```\n\nPrefer `cy.task` over `cy.log` for CI: `cy.log` is a Command Log pretty-print; many CI terminals never show it (11.7).",
      "order": 2
    },
    {
      "id": "cy-9-12-md-3",
      "type": "overview",
      "heading": "Versus Playwright and Selenium",
      "content": "| | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Live | App time-travel | Inspector / UI Mode | IDE debugger |\n| Portable post-mortem | video/screenshot; Cloud Replay (paid) | **trace.zip** | vendor video / logs |\n| Open offline | video player | `show-trace` | depends |\n\nInterview line: \"Cypress has no Trace Viewer. OSS post-mortem is screenshots/videos plus logs. Cloud Debug/Test Replay is the paid cousin of Playwright's zip, not the same artifact.\"",
      "order": 3
    }
  ],
  "advantages": [
    "9.12 Trace Viewer & Post-Mortem Debugging — CI-only failures are the whole point of post-mortem tooling."
  ],
  "limitations": [
    "9.12 Trace Viewer & Post-Mortem Debugging is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
