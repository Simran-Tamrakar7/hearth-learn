import type { ChapterRecord } from "../../../types";

/** 3.8 File Downloads & Verification */
export const chapter = {
  "id": "cy-3-8-file-downloads-verification",
  "title": "3.8 File Downloads & Verification",
  "minutes": 26,
  "level": "intermediate",
  "phase": "Part 3 · Interacting with Elements",
  "partName": "Part 3 · Interacting with Elements",
  "overviewText": "Cypress has no expect_download() API. The browser writes files to downloadsFolder (cypress/downloads/ by default). Poll with cy.readFile({ timeout }) for text/CSV; use cy.task to parse XLSX/PDF in Node. You are verifying a file on disk, not a download event.",
  "why": "Payslip PDFs and payroll CSVs are core HRM artifacts. Playwright waits on a download event; Cypress checks the folder. Knowing downloadsFolder + retrying readFile + task-based binary parse is the complete Cypress answer.",
  "when": "Export payroll, download payslip, CSV dump of the employee directory. Revisit when readFile flakes (file not finished) or when you need to assert Excel sheets.",
  "practical": {
    "app": "Bizlevate HRM — payroll CSV export and payslip PDF",
    "scenario": "Click Export, then prove the CSV contains Employee ID and Simran's row; optionally parse a PDF payslip.",
    "pass": "You click export, cy.readFile the path under Cypress.config('downloadsFolder') with a timeout, assert contents, and cy.task a parser for XLSX/PDF. You do not look for a Playwright-style download event.",
    "fail": "You only assert the button click, or you cy.readFile immediately with no timeout while the file is still writing, or you try to parse XLSX in the browser with cy.readFile alone."
  },
  "tools": [],
  "customSummary": "- No first-class download event; files land in downloadsFolder (default cypress/downloads/).\n- cy.readFile(path, { timeout }) retries until the file exists — that is the wait.\n- Text/CSV: assert with should('contain') / parse in .then().\n- XLSX/PDF: cy.task in setupNodeEvents (SheetJS, pdf-parse) — Node, not the browser.\n- Prefer cy.request the export URL when you only need bytes, not the click-to-download chrome.",
  "contentMarkdown": "## Why Cypress cannot `expect_download`\n\nFile downloads are handled by browser chrome (OS save dialog / automatic save), outside the page JS Cypress lives in. Playwright, as an external driver, intercepts the download as a protocol event. Cypress lets Chromium save into a folder it controls, then you inspect the disk.\n\nDefault folder: `cypress/downloads/` (`downloadsFolder` in config). Override in `cypress.config.js` if CI needs a known path.\n\n```js\nconst path = require('path');\n\nit('exports a payroll CSV', () => {\n  const filePath = path.join(Cypress.config('downloadsFolder'), 'payroll-report.csv');\n\n  cy.get('[data-cy=export-payroll]').click();\n\n  cy.readFile(filePath, { timeout: 15000 })\n    .should('contain', 'Employee ID')\n    .and('contain', 'Simran Tamrakar');\n});\n```\n\n`cy.readFile` is retryable. The `timeout` is how long Cypress polls for the file to appear and become readable — this *is* the download wait. A too-small timeout flakes; a huge timeout hides a broken export.\n\n## Binary and structured formats — `cy.task`\n\n`cy.readFile` on a `.xlsx` yields garbage / encoding issues if you treat it as UTF-8 text. PDF text extraction does not belong in the browser either. Register a Node task (Part 1.9 `setupNodeEvents`):\n\n```js\n// cypress.config.js (sketch)\non('task', {\n  parseCsv(filePath) {\n    const fs = require('fs');\n    const text = fs.readFileSync(filePath, 'utf8');\n    return text.split('\\n').map((line) => line.split(','));\n  },\n});\n```\n\n```js\ncy.get('[data-cy=export-payroll]').click();\ncy.task('parseCsv', filePath).should((rows) => {\n  expect(rows[0]).to.include('Employee ID');\n  expect(rows.some((r) => r.includes('Simran Tamrakar'))).to.eq(true);\n});\n```\n\nSame idea with SheetJS for `.xlsx` or `pdf-parse` for payslips. Keep secrets and production payroll files out of fixtures; generate or use sanitized samples.\n\n## Headers and `cy.request` substitution\n\nIf the test only needs to prove the export payload — not that the *button* wired `href` correctly — `cy.request('/api/payroll/export')` and assert the body (Part 6) is simpler and avoids the downloads folder. Still assert `href` / `download` attributes if the click-to-file path is the risk.\n\nIf the export opens `target=_blank` (Part 0.6), you may never get a file in `downloadsFolder` from that tab. Assert the URL or request the resource directly.\n\n## Cleanup\n\nDownloads persist on disk. Delete in `afterEach` via `cy.task` if names collide across tests (`payroll-report.csv` written twice). Unique filenames from the app make this easier.\n\n## vs Playwright\n\n```python\n# Playwright: with page.expect_download() as dl: page.click(...)\n# path = dl.value.path()\n```\n\nCypress: click → folder → `readFile` / `task`. Same verification goal, different handle.",
  "advantages": [
    "3.8 File Downloads & Verification — Payslip PDFs and payroll CSVs are core HRM artifacts."
  ],
  "limitations": [
    "3.8 File Downloads & Verification is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
