import type { ChapterRecord } from "../../../types";

/** 3.7 File Uploads */
export const chapter = {
  "id": "cy-3-7-file-uploads",
  "title": "3.7 File Uploads",
  "minutes": 24,
  "level": "intermediate",
  "phase": "Part 3 · Interacting with Elements",
  "partName": "Part 3 · Interacting with Elements",
  "overviewText": ".selectFile() is a core Cypress command since 9.3 — you do not need cypress-file-upload for new work. Pass a fixture path, an array of files, or an in-memory contents object. { action: 'drag-drop' } fires drop events for drop-zone UIs; the default action sets the hidden <input type=file>.",
  "why": "Older Stack Overflow answers still prescribe cypress-file-upload's .attachFile(). Interviewers notice whether you know the built-in command and the version floor. Drop-zones that only listen for drop will ignore a default selectFile.",
  "when": "Resume upload, expense receipts, bulk employee CSV import. Revisit when a drop-zone ignores the file or when a tutorial tells you to install cypress-file-upload on Cypress 13.",
  "practical": {
    "app": "Bizlevate HRM — onboarding resume + TADA receipt drop-zone",
    "scenario": "Attach resume.pdf via a hidden file input, then drop a receipt PNG onto a drag-and-drop zone.",
    "pass": "You .selectFile('cypress/fixtures/resume.pdf') on the input and .selectFile(..., { action: 'drag-drop' }) on the zone. You assert the filename chip / upload success, not only that the command queued.",
    "fail": "You add cypress-file-upload on a 9.3+ project as if it were required, or you default-selectFile a drop-zone that only handles drop events."
  },
  "tools": [],
  "customSummary": "- .selectFile() is built-in since Cypress 9.3; cypress-file-upload is legacy.\n- Paths are relative to the project root (typically cypress/fixtures/...).\n- { action: 'drag-drop' } for drop zones; default action for <input type=file>.\n- contents + fileName + mimeType for in-memory files without a fixture on disk.\n- Assert the UI result (chip, preview, POST via intercept) after the select.",
  "contentMarkdown": "## `.selectFile()` since 9.3\n\nFor years Cypress had no upload command; `cypress-file-upload` (`.attachFile()`) was universal. **Cypress 9.3 added `.selectFile()` to core.** New tests should use the built-in. Recognize `.attachFile` in old code; do not add the plugin on a modern Cypress just because a blog post says so.\n\n```js\ncy.get('[data-cy=resume-upload]').selectFile('cypress/fixtures/resume.pdf');\n\ncy.get('[data-cy=attachments]').selectFile([\n  'cypress/fixtures/id-front.png',\n  'cypress/fixtures/id-back.png',\n]);\n```\n\nPaths are from the project root (where `cypress.config` lives), not from the spec file.\n\n## Drop-zones vs file inputs\n\nDefault action: set files on an `<input type=\"file\">` (including `display:none` inputs — this is a legitimate `{ force: true }` / hidden-input case; `.selectFile` can target the input directly).\n\nIf the UI is a big \"drop files here\" surface whose JS listens for `drop` and **does not** wire a hidden input, the default action never runs the app code:\n\n```js\ncy.get('[data-cy=receipt-dropzone]').selectFile(\n  'cypress/fixtures/taxi-receipt.png',\n  { action: 'drag-drop' },\n);\n```\n\n`action: 'select'` (default) vs `'drag-drop'` is the difference between setting `input.files` and dispatching drag events. Match the widget.\n\n## In-memory files\n\n```js\ncy.get('[data-cy=csv-import]').selectFile({\n  contents: Cypress.Buffer.from('employeeId,name\\n1,Simran Tamrakar\\n'),\n  fileName: 'employees.csv',\n  mimeType: 'text/csv',\n});\n```\n\nUseful when you do not want a fixture on disk, or when the file must include today's date. `Cypress.Buffer` is the bundled buffer helper.\n\n## What to assert\n\nSelecting a file is not a complete test. Assert the filename chip, a preview thumbnail, disabled Submit until upload finishes, or:\n\n```js\ncy.intercept('POST', '/api/employees/*/resume').as('resumeUpload');\ncy.get('[data-cy=resume-upload]').selectFile('cypress/fixtures/resume.pdf');\ncy.wait('@resumeUpload').its('response.statusCode').should('eq', 201);\n```\n\n## vs Playwright\n\nPlaywright `locator.set_input_files()` is the analogue. Cypress's `{ action: 'drag-drop' }` is the extra knob for drop-zones. Both should use fixtures, not production PII files.",
  "advantages": [
    "3.7 File Uploads — Older Stack Overflow answers still prescribe cypress-file-upload's."
  ],
  "limitations": [
    "3.7 File Uploads is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
