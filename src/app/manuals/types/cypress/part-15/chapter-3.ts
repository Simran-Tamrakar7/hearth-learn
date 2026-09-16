import type { ChapterRecord } from "../../../types";

/** C. Cheat sheet of commands */
export const chapter = {
  "id": "cy-15-3-cheat-sheet-of-commands",
  "title": "C. Cheat sheet of commands",
  "minutes": 20,
  "level": "advanced",
  "phase": "Part 15 · Appendices",
  "partName": "Part 15 · Appendices",
  "overviewText": "A one-page command map for day-to-day HRM specs: visit/get/contains/find, click/type/select/selectFile, should/and, intercept/wait/request, session/origin, mount, screenshot/viewport, task/log, grep tags. It is not the API docs. Playwright equivalents are listed so you do not type page.locator in a Cypress file.",
  "why": "Pairing interviews and code review go faster with a sheet that includes the dangerous ones (origin args, no switchToTab, task vs log).",
  "when": "While writing specs, and the night before a pairing interview.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You need to write a leave-submit spec from memory including intercept and session.",
    "pass": "You produce session → intercept → visit → wait → get data-cy → click → assert, and you never await cy.get.",
    "fail": "You write driver.findElement or await cy.get('.btn')."
  },
  "tools": [],
  "customSummary": "- Query: get/contains/find; chain should.\n- Network: intercept before trigger; wait @alias; request for API.\n- Auth: session; SSO: origin + args.\n- CT: mount. Artifacts: screenshot. CI log: task.\n- There is no switchToTab / show-trace.",
  "contentMarkdown": "## Queries and actions\n\n```js\ncy.visit('/leave');\ncy.get('[data-cy=new-request]').click();\ncy.contains('button', 'Submit').click();\ncy.get('tr').find('[data-cy=status]');\ncy.get('[data-cy=note]').clear().type('flu');\ncy.get('[data-cy=type]').select('Sick');\ncy.get('[data-cy=file]').selectFile('cypress/fixtures/note.pdf');\ncy.get('[data-cy=ok]').check();\ncy.viewport('iphone-x');\n```\n\n## Assertions (retry)\n\n```js\ncy.get('[data-cy=rows]').should('have.length', 3).and('be.visible');\ncy.get('[data-cy=submit]').should('be.enabled');\ncy.url().should('include', '/leave');\n```\n\n## Network and API\n\n```js\ncy.intercept('GET', '/api/leave*').as('leave');\ncy.visit('/leave');\ncy.wait('@leave');\ncy.request('POST', '/api/test-login', { role: 'manager' });\n```\n\n## Session, origin, shadow, CT\n\n```js\ncy.session('emp', () => { /* login */ });\ncy.origin('https://idp.example', { args: { user, pass } }, ({ user, pass }) => {\n  cy.get('#user').type(user);\n  cy.get('#pass').type(pass);\n  cy.get('#submit').click();\n});\ncy.get('hrm-select').shadow().find('input'); // or includeShadowDom: true\ncy.mount(<LeaveRequestForm remainingBalance={0} />);\n```\n\n## Debug, log, artifacts\n\n```js\ncy.log('gui only');\ncy.task('log', { ci: true });\ncy.screenshot('step', { blackout: ['[data-cy=iban]'] });\ncy.pause(); // open mode\n```\n\n## Run / CI\n\n```bash\nnpx cypress open\nnpx cypress run --browser chrome --env grepTags=@smoke\nnpx cypress run --record --parallel --key \"$CYPRESS_RECORD_KEY\"\n```\n\n## Do not look for\n\n`cy.switchToTab()`, `await cy.get`, `page.locator`, `driver.switchTo()`, `playwright show-trace`, built-in `toHaveScreenshot`, `--browser webkit` as first-class.\n\n## Tiny Playwright / Selenium translation\n\n| Cypress | Playwright | Selenium |\n|---|---|---|\n| `cy.get(sel)` | `locator(sel)` | `findElement` |\n| `.should('be.visible')` | `expect(loc).toBeVisible()` | waits + asserts |\n| `cy.intercept` | `page.route` | not built-in |\n| `cy.origin` | (none needed) | (none needed) |\n| `cy.mount` | CT (JS) | — |\n| `cy.task` | Node `console.log` | JVM log |\n\nInterview line: \"I can write session, intercept-before-visit, origin-with-args, and task logging without opening the docs.\"",
  "advantages": [
    "C. Cheat sheet of commands — Pairing interviews and code review go faster with a sheet that includes the dangerous ones (origin args, no switchToTab, task vs log)."
  ],
  "limitations": [
    "C. Cheat sheet of commands is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
