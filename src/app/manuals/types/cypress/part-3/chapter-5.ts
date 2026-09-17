import type { ChapterRecord } from "../../../types";

/** 3.5 Tables, Lists & Dynamic Content */
export const chapter = {
  "id": "cy-3-5-tables-lists-dynamic-content",
  "title": "3.5 Tables, Lists & Dynamic Content",
  "minutes": 26,
  "level": "intermediate",
  "phase": "Part 3 · Interacting with Elements",
  "partName": "Part 3 · Interacting with Elements",
  "overviewText": "The Cypress row-finding idiom is cy.contains(rowSelector, text).find(actionSelector) — contains scoped to the row yields the <tr> (or list item), then find() acts inside it. cy.get('tr').contains(text) yields the cell instead, so a following .click() hits the wrong element. Dynamic lists belong behind intercept aliases, not fixed waits.",
  "why": "HRM UIs are tables: leave queues, employee directories, payroll registers. Wrong yield (cell vs row) is the classic 'clicked the name, not Approve'. Interviewers listen for the contains(selector, text) idiom by name.",
  "when": "Any grid, queue, or virtualized list. Revisit when a test clicks the first row's button instead of the matching employee's, or when rows appear after a fetch.",
  "practical": {
    "app": "Bizlevate HRM — manager leave-approval table",
    "scenario": "Approve Simran Tamrakar's Annual Leave row among many pending requests that load from GET /api/leave-requests.",
    "pass": "You cy.wait('@leaveList'), then cy.contains('tr', 'Simran Tamrakar').find('[data-cy=approve]').click(), then assert that row shows Approved.",
    "fail": "You cy.get('tr').eq(0) or cy.get('tr').contains('Simran').click() (clicks the cell), or you cy.wait(2000) for the table to fill."
  },
  "tools": [],
  "customSummary": "- Idiom: cy.contains('tr', 'Simran Tamrakar').find('[data-cy=approve]') — contains(selector, text) yields the row.\n- cy.get('tr').contains(text) yields the matching cell, not the row — chaining .find()/.click() then acts on the wrong node.\n- Filter, sort, pagination: assert row count and a named cell, not visual position alone.\n- Dynamic/virtualized lists: intercept + wait, then query; do not eq(n) on a still-loading tbody.",
  "contentMarkdown": "## The row-finding idiom\n\n```js\ncy.contains('tr', 'Simran Tamrakar')\n  .find('[data-cy=approve]')\n  .click();\n\ncy.contains('tr', 'Simran Tamrakar')\n  .should('contain', 'Approved');\n```\n\n`cy.contains(selector, text)` means: find an element matching `selector` that contains this text (possibly in a descendant). The **yielded subject is the `tr`**, so `.find()` looks at cells inside that row. This is the Cypress-idiomatic way to \"act on the row for employee X\".\n\nThe version people write first is wrong in a subtle way:\n\n```js\n// Yields the <td> that contains the name, not the <tr>\ncy.get('tr').contains('Simran Tamrakar').click();\n```\n\n`.click()` then hits the name cell. `.find('[data-cy=approve]')` off that cell finds nothing (the button is a sibling cell). `cy.get('tbody tr').eq(0)` is worse: it couples the test to sort order.\n\nWorks the same for lists:\n\n```js\ncy.contains('[data-cy=employee-card]', 'Simran Tamrakar')\n  .find('[data-cy=view-profile]')\n  .click();\n```\n\n## Tables: headers, counts, empty states\n\n```js\ncy.get('[data-cy=leave-table] thead').should('contain', 'Employee');\ncy.get('[data-cy=leave-table] tbody tr').should('have.length', 3);\ncy.contains('No pending requests').should('be.visible');\n```\n\nAssert a named cell, not \"the third column of the second row,\" unless you are specifically testing column order. For computed payroll amounts, `cy.contains('tr', 'Simran').find('[data-cy=net-pay]').should('contain', '85,000')`.\n\n## Dynamic content\n\nRows that appear after `GET /api/leave-requests` need a wait strategy from 3.11:\n\n```js\ncy.intercept('GET', '/api/leave-requests').as('leaveList');\ncy.visit('/leave/approvals');\ncy.wait('@leaveList');\ncy.contains('tr', 'Simran Tamrakar').should('be.visible');\n```\n\nAlternatively, skip the alias and let `.should('have.length', 3)` retry until the tbody fills — fine when you only care about UI. Use the alias when you must assert payload or when the empty state and the loaded table are easy to confuse.\n\n**Virtualized tables** (react-window) unmount off-screen rows. `cy.contains('tr', 'Name at row 500')` will not find a DOM node that was recycled. Scroll the container (3.4) until the row mounts, or assert via search/filter instead of raw scroll-to-index unless virtualization itself is under test.\n\n**Live updates** (new leave request appears without reload): intercept the poll/websocket-adjacent fetch, or assert with a long-retrying `cy.contains` after the triggering action. Do not `cy.wait(5000)`.\n\n## vs Playwright\n\nPlaywright `get_by_role('row', { name: 'Simran Tamrakar' }).get_by_role('button', { name: 'Approve' })` is the accessibility-shaped version of the same idea. Cypress's `contains(sel, text).find()` is the jQuery-shaped version. Both beat nth-child.",
  "blocks": [
    {
      "id": "cy-3-5-md-0",
      "type": "overview",
      "heading": "The row-finding idiom",
      "content": "```js\ncy.contains('tr', 'Simran Tamrakar')\n  .find('[data-cy=approve]')\n  .click();\n\ncy.contains('tr', 'Simran Tamrakar')\n  .should('contain', 'Approved');\n```\n\n`cy.contains(selector, text)` means: find an element matching `selector` that contains this text (possibly in a descendant). The **yielded subject is the `tr`**, so `.find()` looks at cells inside that row. This is the Cypress-idiomatic way to \"act on the row for employee X\".\n\nThe version people write first is wrong in a subtle way:\n\n```js\n// Yields the <td> that contains the name, not the <tr>\ncy.get('tr').contains('Simran Tamrakar').click();\n```\n\n`.click()` then hits the name cell. `.find('[data-cy=approve]')` off that cell finds nothing (the button is a sibling cell). `cy.get('tbody tr').eq(0)` is worse: it couples the test to sort order.\n\nWorks the same for lists:\n\n```js\ncy.contains('[data-cy=employee-card]', 'Simran Tamrakar')\n  .find('[data-cy=view-profile]')\n  .click();\n```",
      "order": 0
    },
    {
      "id": "cy-3-5-md-1",
      "type": "overview",
      "heading": "Tables: headers, counts, empty states",
      "content": "```js\ncy.get('[data-cy=leave-table] thead').should('contain', 'Employee');\ncy.get('[data-cy=leave-table] tbody tr').should('have.length', 3);\ncy.contains('No pending requests').should('be.visible');\n```\n\nAssert a named cell, not \"the third column of the second row,\" unless you are specifically testing column order. For computed payroll amounts, `cy.contains('tr', 'Simran').find('[data-cy=net-pay]').should('contain', '85,000')`.",
      "order": 1
    },
    {
      "id": "cy-3-5-md-2",
      "type": "overview",
      "heading": "Dynamic content",
      "content": "Rows that appear after `GET /api/leave-requests` need a wait strategy from 3.11:\n\n```js\ncy.intercept('GET', '/api/leave-requests').as('leaveList');\ncy.visit('/leave/approvals');\ncy.wait('@leaveList');\ncy.contains('tr', 'Simran Tamrakar').should('be.visible');\n```\n\nAlternatively, skip the alias and let `.should('have.length', 3)` retry until the tbody fills — fine when you only care about UI. Use the alias when you must assert payload or when the empty state and the loaded table are easy to confuse.\n\n**Virtualized tables** (react-window) unmount off-screen rows. `cy.contains('tr', 'Name at row 500')` will not find a DOM node that was recycled. Scroll the container (3.4) until the row mounts, or assert via search/filter instead of raw scroll-to-index unless virtualization itself is under test.\n\n**Live updates** (new leave request appears without reload): intercept the poll/websocket-adjacent fetch, or assert with a long-retrying `cy.contains` after the triggering action. Do not `cy.wait(5000)`.",
      "order": 2
    },
    {
      "id": "cy-3-5-md-3",
      "type": "overview",
      "heading": "vs Playwright",
      "content": "Playwright `get_by_role('row', { name: 'Simran Tamrakar' }).get_by_role('button', { name: 'Approve' })` is the accessibility-shaped version of the same idea. Cypress's `contains(sel, text).find()` is the jQuery-shaped version. Both beat nth-child.",
      "order": 3
    }
  ],
  "advantages": [
    "3.5 Tables, Lists & Dynamic Content — HRM UIs are tables: leave queues, employee directories, payroll registers."
  ],
  "limitations": [
    "3.5 Tables, Lists & Dynamic Content is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
