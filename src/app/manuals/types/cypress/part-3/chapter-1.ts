import type { ChapterRecord } from "../../../types";

/** 3.1 Clicks, Typing, Clearing, Checkboxes/Radios, Selects */
export const chapter = {
  "id": "cy-3-1-clicks-typing-clearing-checkboxes-radios-selects",
  "title": "3.1 Clicks, Typing, Clearing, Checkboxes/Radios, Selects",
  "minutes": 32,
  "level": "intermediate",
  "phase": "Part 3 · Interacting with Elements",
  "partName": "Part 3 · Interacting with Elements",
  "overviewText": "Every Cypress action (.click, .type, .check, .select) runs an actionability checklist first: visible, non-zero size, not disabled, not animating, not covered. .type() always appends — it never replaces existing text — and {tab} is unsupported. .select() only works on native HTML <select> elements.",
  "why": "Actionability errors are the most common 'the element is right there' failures in Cypress. Interviewers distinguish engineers who diagnose coverage/disabled/hidden from those who reach for { force: true }. Knowing that .type() appends and that {tab} does not work prevents two first-week bugs that look like product defects.",
  "when": "Before writing any form or button interaction. Revisit whenever a click times out with 'covered by another element', a field keeps concatenating values, or Tab-based focus tests fail.",
  "practical": {
    "app": "Bizlevate HRM — leave request form",
    "scenario": "Fill an already-populated employee search box, tick remote-work, pick a department from a native <select>, and submit while a loading overlay is fading out.",
    "pass": "You .clear() before .type(), use .check() not .click() for the checkbox, .select('Quality Assurance') on the native select, and wait for the overlay to disappear instead of { force: true }.",
    "fail": "You .type() into a pre-filled field (text concatenates), click a covered Submit with { force: true }, or try .type('{tab}') to move focus."
  },
  "tools": [],
  "customSummary": "- Actionability: visible, not hidden, non-zero size, not disabled, not animating, not covered — Cypress retries then names the failed check.\n- { force: true } skips the checklist — legitimate for by-design hidden inputs, not a default fix.\n- .type() always appends; .clear() first to replace. Fires real keydown/keypress/keyup/input per character.\n- {tab} is unsupported in .type(); {enter}, {backspace}, {selectall}, {esc}, modifiers work.\n- .check()/.uncheck() are idempotent; radios use .check(value); .select() is native <select> only.",
  "contentMarkdown": "## Actionability — what Cypress checks before it acts\n\nBefore `.click()`, `.type()`, `.clear()`, `.check()`, `.uncheck()`, or `.select()`, Cypress runs an actionability checklist on the subject. Conceptually parallel to Playwright's actionability checks, Cypress's specific criteria are:\n\n- the element is not `display: none` / `visibility: hidden` / `opacity: 0`\n- it has non-zero width and height\n- it is not `disabled` (or `readonly` for typing)\n- it is not currently animating\n- it is not covered by another element (modal, spinner, sticky header)\n\nIf any check fails, Cypress retries until `defaultCommandTimeout` (4s by default), then fails with a diagnostic that names the check — e.g. \"this element is being covered by another element\". Hover the failed command in the Test Runner and inspect the restored DOM: you will usually see the covering overlay.\n\n```js\ncy.get('[data-cy=submit-leave]').click();\ncy.get('[data-cy=leave-card]').dblclick();\ncy.get('[data-cy=attachment-row]').rightclick();\n\ncy.get('[data-cy=grid-cell]').click(40, 12); // x, y inside the element\ncy.get('[data-cy=skill-chip]').click({ multiple: true });\n```\n\n`{ force: true }` skips **all** actionability checks and is available on essentially every action command, not just click. Legitimate use: a custom checkbox that visually hides the real `<input>` and styles a sibling — the real input is invisible *by design*. Illegitimate use: a loading spinner that never disappeared. Forcing the click papers over a product bug and a flaky test.\n\n## `.type()` always appends\n\nThis is the first-week Cypress bug. Playwright's `.fill()` replaces the value; Cypress `.type()` **appends** to whatever is already in the field.\n\n```js\n// Wrong if the search box already contains last week's query:\ncy.get('[data-cy=employee-search]').type('Simran Tamrakar');\n// → \"oldquerySimran Tamrakar\"\n\n// Right:\ncy.get('[data-cy=employee-search]').clear().type('Simran Tamrakar');\ncy.get('[data-cy=notes]').type('Hello{enter}World');\ncy.get('[data-cy=search]').type('{selectall}{backspace}');\ncy.get('[data-cy=search]').type('slow', { delay: 150 });\n```\n\n`.type()` fires real per-character keyboard events (`keydown`, `keypress`, `keyup`, `input`). There is no first-class \"instant fill\" the way Playwright splits `.fill()` vs `.type()`. The workaround for a huge string with no live keystroke listeners is `.invoke('val', longString).trigger('input')` so React/Vue still notice the change.\n\n## `{tab}` is unsupported\n\nCypress special-character sequences include `{enter}`, `{backspace}`, `{del}`, `{esc}`, `{selectall}`, `{uparrow}` / `{downarrow}`, `{home}` / `{end}`, and modifiers (`{ctrl+a}`, `{shift+enter}`). **`{tab}` is not supported.** `.type('{tab}')` will not move focus. Cypress's documented position is that Tab-order is a browser concern you assert differently (focus the next field directly, or check `document.activeElement` after a real user-like click). If you truly need native Tab, `cypress-real-events` (`.realPress('Tab')`) is the community escape hatch — a plugin, not core.\n\n## Checkboxes, radios, native selects\n\n```js\ncy.get('[data-cy=remote-checkbox]').check();\ncy.get('[data-cy=newsletter]').uncheck();\ncy.get('[data-cy=skills]').check(['Python', 'Cypress']); // by value\ncy.get('[data-cy=employment-type]').check('full-time');  // radio by value\n\ncy.get('[data-cy=department]').select('Quality Assurance'); // visible text\ncy.get('[data-cy=department]').select('qa');                // value\ncy.get('[data-cy=department]').select(2);                   // 0-based index\ncy.get('[data-cy=skills-native]').select(['Python', 'Cypress']);\n```\n\n`.check()` / `.uncheck()` are **idempotent** — unlike `.click()`, which toggles. Radios in the same `name` group are mutually exclusive; there is no meaningful `.uncheck()` for a radio. `.select()` **only works on native `<select>`**. A styled `<div>` combobox from Ant Design, MUI, or React Select will fail `.select()` with \"found no `<select>`\". Custom dropdowns are the entire next chapter.\n\n## vs Playwright\n\n| | Cypress | Playwright |\n|---|---|---|\n| Replace field value | `.clear().type()` | `.fill()` |\n| Event-accurate typing | `.type()` (the default) | `.type()` (opt-in vs fill) |\n| Tab | unsupported in `.type()` | `page.keyboard.press('Tab')` |\n| Actionability skip | `{ force: true }` | `force=True` |\n| Native select | `.select()` | `select_option()` |\n\nInterview-safe: \"Cypress actions retry actionability until timeout and tell you *which* check failed. I do not default to `force`. I always `.clear()` before `.type()` because type appends. I never send `{tab}`. I only call `.select()` on a real `<select>.`\"",
  "blocks": [
    {
      "id": "cy-3-1-md-0",
      "type": "overview",
      "heading": "Actionability — what Cypress checks before it acts",
      "content": "Before `.click()`, `.type()`, `.clear()`, `.check()`, `.uncheck()`, or `.select()`, Cypress runs an actionability checklist on the subject. Conceptually parallel to Playwright's actionability checks, Cypress's specific criteria are:\n\n- the element is not `display: none` / `visibility: hidden` / `opacity: 0`\n- it has non-zero width and height\n- it is not `disabled` (or `readonly` for typing)\n- it is not currently animating\n- it is not covered by another element (modal, spinner, sticky header)\n\nIf any check fails, Cypress retries until `defaultCommandTimeout` (4s by default), then fails with a diagnostic that names the check — e.g. \"this element is being covered by another element\". Hover the failed command in the Test Runner and inspect the restored DOM: you will usually see the covering overlay.\n\n```js\ncy.get('[data-cy=submit-leave]').click();\ncy.get('[data-cy=leave-card]').dblclick();\ncy.get('[data-cy=attachment-row]').rightclick();\n\ncy.get('[data-cy=grid-cell]').click(40, 12); // x, y inside the element\ncy.get('[data-cy=skill-chip]').click({ multiple: true });\n```\n\n`{ force: true }` skips **all** actionability checks and is available on essentially every action command, not just click. Legitimate use: a custom checkbox that visually hides the real `<input>` and styles a sibling — the real input is invisible *by design*. Illegitimate use: a loading spinner that never disappeared. Forcing the click papers over a product bug and a flaky test.",
      "order": 0
    },
    {
      "id": "cy-3-1-md-1",
      "type": "overview",
      "heading": "`.type()` always appends",
      "content": "This is the first-week Cypress bug. Playwright's `.fill()` replaces the value; Cypress `.type()` **appends** to whatever is already in the field.\n\n```js\n// Wrong if the search box already contains last week's query:\ncy.get('[data-cy=employee-search]').type('Simran Tamrakar');\n// → \"oldquerySimran Tamrakar\"\n\n// Right:\ncy.get('[data-cy=employee-search]').clear().type('Simran Tamrakar');\ncy.get('[data-cy=notes]').type('Hello{enter}World');\ncy.get('[data-cy=search]').type('{selectall}{backspace}');\ncy.get('[data-cy=search]').type('slow', { delay: 150 });\n```\n\n`.type()` fires real per-character keyboard events (`keydown`, `keypress`, `keyup`, `input`). There is no first-class \"instant fill\" the way Playwright splits `.fill()` vs `.type()`. The workaround for a huge string with no live keystroke listeners is `.invoke('val', longString).trigger('input')` so React/Vue still notice the change.",
      "order": 1
    },
    {
      "id": "cy-3-1-md-2",
      "type": "overview",
      "heading": "`{tab}` is unsupported",
      "content": "Cypress special-character sequences include `{enter}`, `{backspace}`, `{del}`, `{esc}`, `{selectall}`, `{uparrow}` / `{downarrow}`, `{home}` / `{end}`, and modifiers (`{ctrl+a}`, `{shift+enter}`). **`{tab}` is not supported.** `.type('{tab}')` will not move focus. Cypress's documented position is that Tab-order is a browser concern you assert differently (focus the next field directly, or check `document.activeElement` after a real user-like click). If you truly need native Tab, `cypress-real-events` (`.realPress('Tab')`) is the community escape hatch — a plugin, not core.",
      "order": 2
    },
    {
      "id": "cy-3-1-md-3",
      "type": "overview",
      "heading": "Checkboxes, radios, native selects",
      "content": "```js\ncy.get('[data-cy=remote-checkbox]').check();\ncy.get('[data-cy=newsletter]').uncheck();\ncy.get('[data-cy=skills]').check(['Python', 'Cypress']); // by value\ncy.get('[data-cy=employment-type]').check('full-time');  // radio by value\n\ncy.get('[data-cy=department]').select('Quality Assurance'); // visible text\ncy.get('[data-cy=department]').select('qa');                // value\ncy.get('[data-cy=department]').select(2);                   // 0-based index\ncy.get('[data-cy=skills-native]').select(['Python', 'Cypress']);\n```\n\n`.check()` / `.uncheck()` are **idempotent** — unlike `.click()`, which toggles. Radios in the same `name` group are mutually exclusive; there is no meaningful `.uncheck()` for a radio. `.select()` **only works on native `<select>`**. A styled `<div>` combobox from Ant Design, MUI, or React Select will fail `.select()` with \"found no `<select>`\". Custom dropdowns are the entire next chapter.",
      "order": 3
    },
    {
      "id": "cy-3-1-md-4",
      "type": "overview",
      "heading": "vs Playwright",
      "content": "| | Cypress | Playwright |\n|---|---|---|\n| Replace field value | `.clear().type()` | `.fill()` |\n| Event-accurate typing | `.type()` (the default) | `.type()` (opt-in vs fill) |\n| Tab | unsupported in `.type()` | `page.keyboard.press('Tab')` |\n| Actionability skip | `{ force: true }` | `force=True` |\n| Native select | `.select()` | `select_option()` |\n\nInterview-safe: \"Cypress actions retry actionability until timeout and tell you *which* check failed. I do not default to `force`. I always `.clear()` before `.type()` because type appends. I never send `{tab}`. I only call `.select()` on a real `<select>.`\"",
      "order": 4
    }
  ],
  "advantages": [
    "3.1 Clicks, Typing, Clearing, Checkboxes/Radios, Selects — Actionability errors are the most common 'the element is right there' failures in Cypress."
  ],
  "limitations": [
    "3.1 Clicks, Typing, Clearing, Checkboxes/Radios, Selects is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
