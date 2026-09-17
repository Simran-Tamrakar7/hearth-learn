import type { ChapterRecord } from "../../../types";

/** 4.2 cy.contains() vs cy.get() */
export const chapter = {
  "id": "cy-4-2-cy-contains-vs-cy-get",
  "title": "4.2 cy.contains() vs cy.get()",
  "minutes": 24,
  "level": "intermediate",
  "phase": "Part 4 · Locator Strategy",
  "partName": "Part 4 · Locator Strategy",
  "overviewText": "cy.get() takes a CSS/jQuery selector only — it never searches text. cy.contains() finds elements by text content, defaulting to substring match (case-sensitive). cy.contains(selector, text) scopes text to a matching ancestor — the row idiom from 3.5. Use regex for exact match; do not confuse the two commands.",
  "why": "cy.get('Submit') is invalid CSS and a common typo. cy.contains('Leave') matching 'Leave Request' and 'Sick Leave' is the substring footgun. Interviews often pair this with the row-finding idiom.",
  "when": "Any time you reach for text. Revisit when a spec clicks the wrong 'Leave' link in the nav, or when someone wraps user-facing copy in cy.get.",
  "practical": {
    "app": "Bizlevate HRM — nav with Leave, Leave Policy, and a table of leave types",
    "scenario": "Click the Leave nav item, then find the table row for 'Annual Leave' without matching 'Annual Leave Encashment'.",
    "pass": "You cy.get('[data-cy=nav-leave]') or cy.contains('a', /^Leave$/) for nav; you cy.contains('tr', /^Annual Leave$/) for the row. You know get does not accept a text argument.",
    "fail": "You cy.get('Leave') or cy.contains('Leave').click() and hit 'Leave Policy', or you assume contains is exact-match like Playwright get_by_text(exact=True) default."
  },
  "tools": [],
  "customSummary": "- cy.get(selector): CSS/jQuery only — no text search.\n- cy.contains(text): substring, matchCase true by default; regex for exact.\n- cy.contains(selector, text): yield the selector that contains the text (row idiom).\n- Options: matchCase; timeout. Prefer data-cy when copy is volatile or translated.",
  "contentMarkdown": "## `cy.get` never looks at text\n\n```js\ncy.get('[data-cy=submit-leave]');\ncy.get('button[type=submit]');\n// cy.get('Submit') — looks for a <Submit> tag, not the word Submit\n```\n\n`cy.get` is a querySelector/jQuery `$()` analogue. User-visible strings do not belong in it unless they appear in an attribute (`[aria-label=\"Submit\"]`).\n\n## `cy.contains` — text, and substring by default\n\n```js\ncy.contains('Submit leave');\ncy.contains('leave', { matchCase: false });\ncy.contains(/^Submit leave$/); // exact\ncy.contains('[data-cy=banner]', 'onboarded successfully');\n```\n\nDefault behavior: **substring**, **case-sensitive**. `cy.contains('Leave')` matches \"Leave\", \"Leave Request\", \"Sick Leave\", \"Leave Policy\". The first match in document order wins — often the wrong nav item.\n\nPlaywright's `get_by_text('Leave')` is substring too unless `exact=True`. Neither tool makes exact the default. Use `/^Leave$/` or a `data-cy` on the nav item.\n\n## `cy.contains(selector, text)` — the useful overload\n\n```js\ncy.contains('a', 'Leave Policy').click();\ncy.contains('tr', 'Simran Tamrakar').find('[data-cy=approve]').click();\n```\n\nThis is \"find a `tr` whose descendant text includes Simran Tamrakar\" and **yield the `tr`**. That is why it is the table idiom (3.5). Contrast:\n\n```js\ncy.get('tr').contains('Simran Tamrakar'); // yields the <td> or inner element\ncy.contains('Simran Tamrakar');           // yields the deepest matching element\n```\n\nYielded subject drives the next command. Get this wrong and you click a cell instead of a button.\n\n## Regex, timeout, and emptiness\n\n```js\ncy.contains('[data-cy=status]', /approved/i, { timeout: 10000 });\n```\n\n`cy.contains` retries until the text exists (command timeout). To assert text is **gone**, prefer `cy.contains('Saving...').should('not.exist')` — still a contains, with a negation assertion.\n\nDo not use contains as a replacement for `data-cy` on icon buttons with no text. Use `aria-label` or a test hook.\n\n## vs Playwright\n\n| Need | Cypress | Playwright |\n|---|---|---|\n| CSS | `cy.get` | `locator(css)` |\n| Text | `cy.contains` | `get_by_text` |\n| Role + name | plugin / `contains('button', 'Save')` | `get_by_role('button', { name: 'Save' })` |\n| Exact text | `/^Save$/` | `exact=True` |\n\nInterview-safe: \"`get` is CSS; `contains` is text and substring; `contains(sel, text)` yields the row. I regex-anchor when substring would over-match.\"\"",
  "blocks": [
    {
      "id": "cy-4-2-md-0",
      "type": "overview",
      "heading": "`cy.get` never looks at text",
      "content": "```js\ncy.get('[data-cy=submit-leave]');\ncy.get('button[type=submit]');\n// cy.get('Submit') — looks for a <Submit> tag, not the word Submit\n```\n\n`cy.get` is a querySelector/jQuery `$()` analogue. User-visible strings do not belong in it unless they appear in an attribute (`[aria-label=\"Submit\"]`).",
      "order": 0
    },
    {
      "id": "cy-4-2-md-1",
      "type": "overview",
      "heading": "`cy.contains` — text, and substring by default",
      "content": "```js\ncy.contains('Submit leave');\ncy.contains('leave', { matchCase: false });\ncy.contains(/^Submit leave$/); // exact\ncy.contains('[data-cy=banner]', 'onboarded successfully');\n```\n\nDefault behavior: **substring**, **case-sensitive**. `cy.contains('Leave')` matches \"Leave\", \"Leave Request\", \"Sick Leave\", \"Leave Policy\". The first match in document order wins — often the wrong nav item.\n\nPlaywright's `get_by_text('Leave')` is substring too unless `exact=True`. Neither tool makes exact the default. Use `/^Leave$/` or a `data-cy` on the nav item.",
      "order": 1
    },
    {
      "id": "cy-4-2-md-2",
      "type": "overview",
      "heading": "`cy.contains(selector, text)` — the useful overload",
      "content": "```js\ncy.contains('a', 'Leave Policy').click();\ncy.contains('tr', 'Simran Tamrakar').find('[data-cy=approve]').click();\n```\n\nThis is \"find a `tr` whose descendant text includes Simran Tamrakar\" and **yield the `tr`**. That is why it is the table idiom (3.5). Contrast:\n\n```js\ncy.get('tr').contains('Simran Tamrakar'); // yields the <td> or inner element\ncy.contains('Simran Tamrakar');           // yields the deepest matching element\n```\n\nYielded subject drives the next command. Get this wrong and you click a cell instead of a button.",
      "order": 2
    },
    {
      "id": "cy-4-2-md-3",
      "type": "overview",
      "heading": "Regex, timeout, and emptiness",
      "content": "```js\ncy.contains('[data-cy=status]', /approved/i, { timeout: 10000 });\n```\n\n`cy.contains` retries until the text exists (command timeout). To assert text is **gone**, prefer `cy.contains('Saving...').should('not.exist')` — still a contains, with a negation assertion.\n\nDo not use contains as a replacement for `data-cy` on icon buttons with no text. Use `aria-label` or a test hook.",
      "order": 3
    },
    {
      "id": "cy-4-2-md-4",
      "type": "overview",
      "heading": "vs Playwright",
      "content": "| Need | Cypress | Playwright |\n|---|---|---|\n| CSS | `cy.get` | `locator(css)` |\n| Text | `cy.contains` | `get_by_text` |\n| Role + name | plugin / `contains('button', 'Save')` | `get_by_role('button', { name: 'Save' })` |\n| Exact text | `/^Save$/` | `exact=True` |\n\nInterview-safe: \"`get` is CSS; `contains` is text and substring; `contains(sel, text)` yields the row. I regex-anchor when substring would over-match.\"\"",
      "order": 4
    }
  ],
  "advantages": [
    "4.2 cy.contains() vs cy.get() — cy."
  ],
  "limitations": [
    "4.2 cy.contains() vs cy.get() is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
