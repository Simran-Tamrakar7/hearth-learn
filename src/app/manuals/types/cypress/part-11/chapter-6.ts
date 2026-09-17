import type { ChapterRecord } from "../../../types";

/** 11.6 Test Reporting */
export const chapter = {
  "id": "cy-11-6-test-reporting",
  "title": "11.6 Test Reporting",
  "minutes": 26,
  "level": "advanced",
  "phase": "Part 11 · CI/CD Integration",
  "partName": "Part 11 · CI/CD Integration",
  "overviewText": "Each Cypress spec runs in a separate Mocha process, so a naive 'reporter: mochawesome' overwrites the JSON every spec. The two-part Mochawesome pattern is: (1) write one JSON per spec into a folder, (2) mochawesome-merge + marge (or cypress-mochawesome-reporter, which wraps that pipeline). JUnit XML is for Jenkins. Cypress Cloud is a reporter of a different kind (11.3).",
  "why": "A CI job that prints 'All specs passed' with no HTML is unreadable for a non-engineer PM. The overwrite bug is a rite of passage — interviewers have seen empty reports.",
  "when": "When you need a shareable HTML report without Cloud, or a JUnit file for Jenkins gates.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "Jenkins must display a pass/fail trend and an HTML report for the full HRM suite after a parallel matrix.",
    "pass": "You configure a per-spec JSON reporter, merge after all shards, and generate HTML. You do not set reporter: mochawesome once and trust the last spec's file.",
    "fail": "You open a report that only contains the last spec file and ship it."
  },
  "tools": [],
  "customSummary": "- Specs = separate Mocha runs ⇒ one reporter file gets overwritten unless you use a per-spec output dir.\n- Mochawesome two-part: JSON per spec, then mochawesome-merge + report generator (marge).\n- cypress-mochawesome-reporter packages that pipeline.\n- JUnit XML for Jenkins; HTML for humans; Cloud for recorded analytics.\n- Playwright HTML reporter is first-party; Cypress HTML is plugin territory.",
  "contentMarkdown": "## Why a single mochawesome file lies\n\nCypress launches a new runner per spec file. Mocha's default reporter writes `mochawesome.json` then the next spec **overwrites** it. The HTML shows one spec. This is the two-part problem.\n\n## Two-part plugin pipeline\n\nPart 1 — **during the run**, each spec writes its own JSON:\n\n```js\n// cypress.config.ts\nreporter: 'cypress-multi-reporters',\nreporterOptions: {\n  reporterEnabled: 'mochawesome',\n  mochawesomeReporterOptions: {\n    reportDir: 'cypress/results',\n    overwrite: false,\n    html: false,\n    json: true,\n  },\n},\n```\n\nPart 2 — **after all specs (and after all parallel jobs download artifacts)**:\n\n```bash\nnpx mochawesome-merge cypress/results/*.json > cypress/results/merged.json\nnpx marge cypress/results/merged.json --reportDir cypress/report --inline\n```\n\n`cypress-mochawesome-reporter` is a convenience plugin that wires this so you are not assembling multi-reporters by hand. Either path is valid; **both are two stages: emit JSON, then merge/generate**.\n\n## Parallel jobs\n\nEach GitHub shard uploads `cypress/results`. A final job downloads all, merges, publishes HTML. If you merge too early, you only report one shard.\n\n## JUnit\n\n`junit` reporter (or mocha-junit-reporter) for Jenkins \"test result\" trend. Same overwrite rule — unique files per spec, then a Jenkins glob.\n\n## Versus Playwright and Selenium\n\nPlaywright: built-in HTML reporter + blob reports you merge with `playwright merge-reports` — same *shape* as Mochawesome two-part. Selenium: Allure, Extent, ReportNG. Cypress does not bundle a first-party HTML report comparable to Playwright's.\n\nInterview line: \"Mochawesome is two-part because each spec is a new Mocha. I write JSON per spec, merge, then marge. A single report file only contains the last spec.\"",
  "blocks": [
    {
      "id": "cy-11-6-md-0",
      "type": "overview",
      "heading": "Why a single mochawesome file lies",
      "content": "Cypress launches a new runner per spec file. Mocha's default reporter writes `mochawesome.json` then the next spec **overwrites** it. The HTML shows one spec. This is the two-part problem.",
      "order": 0
    },
    {
      "id": "cy-11-6-md-1",
      "type": "overview",
      "heading": "Two-part plugin pipeline",
      "content": "Part 1 — **during the run**, each spec writes its own JSON:\n\n```js\n// cypress.config.ts\nreporter: 'cypress-multi-reporters',\nreporterOptions: {\n  reporterEnabled: 'mochawesome',\n  mochawesomeReporterOptions: {\n    reportDir: 'cypress/results',\n    overwrite: false,\n    html: false,\n    json: true,\n  },\n},\n```\n\nPart 2 — **after all specs (and after all parallel jobs download artifacts)**:\n\n```bash\nnpx mochawesome-merge cypress/results/*.json > cypress/results/merged.json\nnpx marge cypress/results/merged.json --reportDir cypress/report --inline\n```\n\n`cypress-mochawesome-reporter` is a convenience plugin that wires this so you are not assembling multi-reporters by hand. Either path is valid; **both are two stages: emit JSON, then merge/generate**.",
      "order": 1
    },
    {
      "id": "cy-11-6-md-2",
      "type": "overview",
      "heading": "Parallel jobs",
      "content": "Each GitHub shard uploads `cypress/results`. A final job downloads all, merges, publishes HTML. If you merge too early, you only report one shard.",
      "order": 2
    },
    {
      "id": "cy-11-6-md-3",
      "type": "overview",
      "heading": "JUnit",
      "content": "`junit` reporter (or mocha-junit-reporter) for Jenkins \"test result\" trend. Same overwrite rule — unique files per spec, then a Jenkins glob.",
      "order": 3
    },
    {
      "id": "cy-11-6-md-4",
      "type": "overview",
      "heading": "Versus Playwright and Selenium",
      "content": "Playwright: built-in HTML reporter + blob reports you merge with `playwright merge-reports` — same *shape* as Mochawesome two-part. Selenium: Allure, Extent, ReportNG. Cypress does not bundle a first-party HTML report comparable to Playwright's.\n\nInterview line: \"Mochawesome is two-part because each spec is a new Mocha. I write JSON per spec, merge, then marge. A single report file only contains the last spec.\"",
      "order": 4
    }
  ],
  "advantages": [
    "11.6 Test Reporting — A CI job that prints 'All specs passed' with no HTML is unreadable for a non-engineer PM."
  ],
  "limitations": [
    "11.6 Test Reporting is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
