import type { ChapterRecord } from "../../../types";

/** 11.5 Cypress Cloud Alternatives */
export const chapter = {
  "id": "cy-11-5-cypress-cloud-alternatives",
  "title": "11.5 Cypress Cloud Alternatives",
  "minutes": 24,
  "level": "advanced",
  "phase": "Part 11 · CI/CD Integration",
  "partName": "Part 11 · CI/CD Integration",
  "overviewText": "If you want a dashboard and parallel coordination without Cypress.io billing, the historical OSS answer is Sorry Cypress; the commercial successor from that lineage is Currents. You still run OSS Cypress; you point recording at another ingest URL. Other options: report-only (Mochawesome, 11.6) with no dashboard, or generic CI artifacts. Playwright does not need this as badly because traces and shards are OSS.",
  "why": "Not every company will send videos of payroll screens to a US SaaS. Knowing Sorry Cypress / Currents is the practical answer to 'we cannot use Cypress Cloud.'",
  "when": "When Cloud is blocked by procurement/privacy, when you only need HTML reports, and when comparing TCO to Playwright.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "Legal forbids Cypress Cloud. You still want a run history URL for the QA manager.",
    "pass": "You name Sorry Cypress (self-host) or Currents as the record-protocol alternatives, or you fall back to Mochawesome + screenshot artifacts with no record key.",
    "fail": "You pirate a Cloud key or claim OSS Cypress includes the dashboard."
  },
  "tools": [],
  "customSummary": "- Sorry Cypress: OSS dashboard compatible with Cypress recording protocol (self-host).\n- Currents: commercial successor/alternative in that ecosystem.\n- You can skip recording entirely: Mochawesome + CI artifacts.\n- Pointing record to a third party still needs privacy review (payroll PII in videos).\n- Playwright OSS traces reduce the need for a Cypress-like Cloud.",
  "contentMarkdown": "## Sorry Cypress\n\nSorry Cypress is the well-known **open-source** stand-in for the Cypress Dashboard: it implements the recording API so `cypress run --record` can talk to *your* server instead of Cypress.io. You host director/API/dashboard, set the env vars the project documents (typically a record key and API URL override).\n\nOperational truth: you now own Mongo/storage/upgrade. For a small Bizlevate team, that cost can exceed Cloud. For a bank that cannot leave the VPC, it is justified.\n\n## Currents\n\nCurrents.dev (and related commercial offerings from the same problem-space) sell a hosted dashboard that speaks Cypress recording, with parallelization helpers. Think \"Cloud-shaped product not billed by Cypress.io.\" Always verify current protocol compatibility with *your* Cypress major before promising a migration weekend.\n\n## When you should not record anywhere\n\nPayroll videos contain compensation. If legal says no third party and you will not self-host, **do not `--record`**. Use 11.6 HTML reports + 11.8 artifacts on GitHub (retention 7 days, restrict who can download). `blackout` on screenshots (9.15).\n\n## Versus Playwright and Selenium\n\nPlaywright: `trace.zip` + HTML reporter in OSS. Selenium: ReportPortal, Allure, vendor clouds. Cypress is the tool whose *best* timeline debugger is behind a dashboard — hence this alternatives chapter.\n\nInterview line: \"Cloud alternatives are Sorry Cypress (self-host) and Currents (hosted). Or no record at all — Mochawesome plus artifacts.\"",
  "blocks": [
    {
      "id": "cy-11-5-md-0",
      "type": "overview",
      "heading": "Sorry Cypress",
      "content": "Sorry Cypress is the well-known **open-source** stand-in for the Cypress Dashboard: it implements the recording API so `cypress run --record` can talk to *your* server instead of Cypress.io. You host director/API/dashboard, set the env vars the project documents (typically a record key and API URL override).\n\nOperational truth: you now own Mongo/storage/upgrade. For a small Bizlevate team, that cost can exceed Cloud. For a bank that cannot leave the VPC, it is justified.",
      "order": 0
    },
    {
      "id": "cy-11-5-md-1",
      "type": "overview",
      "heading": "Currents",
      "content": "Currents.dev (and related commercial offerings from the same problem-space) sell a hosted dashboard that speaks Cypress recording, with parallelization helpers. Think \"Cloud-shaped product not billed by Cypress.io.\" Always verify current protocol compatibility with *your* Cypress major before promising a migration weekend.",
      "order": 1
    },
    {
      "id": "cy-11-5-md-2",
      "type": "overview",
      "heading": "When you should not record anywhere",
      "content": "Payroll videos contain compensation. If legal says no third party and you will not self-host, **do not `--record`**. Use 11.6 HTML reports + 11.8 artifacts on GitHub (retention 7 days, restrict who can download). `blackout` on screenshots (9.15).",
      "order": 2
    },
    {
      "id": "cy-11-5-md-3",
      "type": "overview",
      "heading": "Versus Playwright and Selenium",
      "content": "Playwright: `trace.zip` + HTML reporter in OSS. Selenium: ReportPortal, Allure, vendor clouds. Cypress is the tool whose *best* timeline debugger is behind a dashboard — hence this alternatives chapter.\n\nInterview line: \"Cloud alternatives are Sorry Cypress (self-host) and Currents (hosted). Or no record at all — Mochawesome plus artifacts.\"",
      "order": 3
    }
  ],
  "advantages": [
    "11.5 Cypress Cloud Alternatives — Not every company will send videos of payroll screens to a US SaaS."
  ],
  "limitations": [
    "11.5 Cypress Cloud Alternatives is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
