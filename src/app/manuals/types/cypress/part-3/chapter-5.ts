import type { ChapterRecord } from "../../../types";

/** 19. File Uploads & Downloads */
export const chapter = {
  id: "cy-19-files",
  title: "19. File Uploads & Downloads",
  minutes: 30,
  level: "intermediate",
  phase: "Part 3 · Actions",
  partName: "Part 3 · Actions",
  overviewText: "Comprehensive coverage of File Uploads & Downloads in Cypress with code examples, Playwright comparisons, and interview-ready depth paired with the Playwright manual.",
  why: "Mastering File Uploads & Downloads in Cypress's command-queue model prevents flaky specs and wrong Playwright ports.",
  when: "Read when implementing or debugging file uploads & downloads in your suite.",
  practical: { app: "Web application under test", scenario: "Spec fails around file uploads & downloads — need Cypress-native pattern.", pass: "Apply chapter patterns with retry semantics not bare cy.wait(ms).", fail: "Port Playwright await code or fixed delays." },
  advantages: ["selectFile upload","fixtures path","downloads folder verify","MIME drag-drop","readFile assertion","stub window.open"],
  limitations: ["download timing wait","large uploads slow CI","native prompts untestable","needs file input DOM","no WebKit downloads","blob URLs different"],
  tools: [],
  contentMarkdown: "## File uploads — go deeper on the built-in vs plugin history\n\n```javascript\n// Cypress 9.3+ has a built-in .selectFile() command — no plugin needed\ncy.get('[data-cy=resume-upload]').selectFile('cypress/fixtures/resume.pdf');\n\n// Multiple files\ncy.get('[data-cy=attachments]').selectFile([\n  'cypress/fixtures/file1.png',\n  'cypress/fixtures/file2.png',\n]);\n\n// Drag-and-drop style upload zones\ncy.get('[data-cy=drop-zone]').selectFile('cypress/fixtures/resume.pdf', { action: 'drag-drop' });\nWorth knowing the history briefly since older tutorials/StackOverflow answers reference it: for a long time, Cypress had no built-in file-upload command at all, and the community plugin cypress-file-upload was the standard, near-universal workaround — you'll still see it referenced constantly in older content. Cypress added .selectFile() as a genuine built-in core command starting at version 9.3, making the plugin no longer necessary for most use cases — worth using the built-in version going forward rather than adding an unnecessary extra dependency, but recognizing the plugin syntax when you encounter it in older material.\nThe { action: 'drag-drop' } option specifically simulates a drag-and-drop file upload interaction (common for modern \"drop your file here\" upload zones) rather than the default behavior of setting the file directly on a hidden <input type=\"file\">, which matters if the upload zone's JavaScript specifically listens for drop events rather than a plain input change event.\n```\n\n## File downloads — go deeper on Cypress's fundamentally different (and more limited) approach vs Playwright\n\nThis is worth being direct about as a real architectural gap: Cypress has no first-class \"wait for and inspect a download\" API the way Playwright's page.expect_download() (Part 2, Ch. 10 of your Playwright manual) does. Because Cypress runs inside the browser, and browser-native file downloads happen at the OS/browser-chrome level (outside the page's own JS context entirely), Cypress's visibility into an in-progress download is inherently limited.\nThe practical workaround pattern most Cypress suites use:\n```javascript\nconst downloadsFolder = 'cypress/downloads';\nconst path = require('path');\n\nit('downloads a payroll report', () => {\n  cy.get('[data-cy=download-report]').click();\n\n  const filePath = path.join(downloadsFolder, 'payroll-report.csv');\n  cy.readFile(filePath, { timeout: 10000 }).should('exist');\n  cy.readFile(filePath).should('contain', 'Employee ID');\n});\nRather than intercepting a \"download\" event the way Playwright does, Cypress's approach is: let the browser actually save the file to its configured downloads folder (cypress/downloads/ by default, Chapter 6), then use cy.readFile() to poll for that file's existence and inspect its actual contents directly from disk. cy.readFile() itself has retry-ability built in (the { timeout: 10000 } option extends how long it'll keep checking for the file to appear), which covers the \"wait for the download to finish\" need reasonably well in practice, even without a dedicated download-event API.\n```",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
