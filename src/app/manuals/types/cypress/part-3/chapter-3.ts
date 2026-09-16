import type { ChapterRecord } from "../../../types";

/** 3.3 Dropdowns */
export const chapter = {
  "id": "cy-3-3-dropdowns",
  "title": "3.3 Dropdowns",
  "minutes": 28,
  "level": "intermediate",
  "phase": "Part 3 · Interacting with Elements",
  "partName": "Part 3 · Interacting with Elements",
  "overviewText": "Native <select> uses .select(text|value|index). Everything else — React Select, Ant Design Select, MUI Autocomplete, custom comboboxes — is a three-step interaction: open the trigger, wait for the options list, click the option. Options often render in a React portal on document.body, so querying inside the trigger's .within() finds nothing.",
  "why": "Modern HRM dashboards almost never ship a raw <select> for department, leave type, or approver. Treating custom dropdowns as .select() is a frequent interview trip. The portal caveat explains a class of 'I can see the option in the screenshot but cy.get cannot' bugs.",
  "when": "Any styled dropdown, searchable combobox, or multi-select. Revisit when options exist in the DOM but .within() on the field wrapper cannot see them.",
  "practical": {
    "app": "Bizlevate HRM — leave type and approver pickers (Ant Design / React Select)",
    "scenario": "Choose 'Annual Leave' from a custom combobox whose list renders in a portal, then a native country <select> on a tax form.",
    "pass": "You click the combobox, then cy.contains('.ant-select-item', 'Annual Leave').click() on the body-level list; you .select() only the native country field. You do not wrap the option click in .within() of the closed field.",
    "fail": "You call .select('Annual Leave') on a div combobox, or you .within() the trigger and look for options that live under document.body."
  },
  "tools": [],
  "customSummary": "- .select() is native <select> only — by text, value, or index; array for multiple.\n- Custom dropdown 3-step: (1) click trigger (2) wait for list to exist (3) click the option.\n- Portal caveat: option lists often mount on document.body — .within() on the field misses them.\n- Searchable comboboxes: type into the input, then click the filtered option — do not assume .select().\n- Assert the selected display value after close, not only that an option was clicked.",
  "contentMarkdown": "## Native `<select>` — the easy path\n\n```js\ncy.get('[data-cy=country]').select('Nepal');\ncy.get('[data-cy=country]').select('np');\ncy.get('[data-cy=country]').select(0);\ncy.get('[data-cy=multi-native]').select(['np', 'in']);\ncy.get('[data-cy=country]').should('have.value', 'np');\n```\n\n`.select()` requires a real HTML `<select>`. Cypress will retry until the option exists (useful when options load from an API). You can pass the visible text, the `value` attribute, or a numeric index. That is the entire native API.\n\n## Custom dropdowns — the 3-step pattern\n\nComponent libraries replace `<select>` with a button/input plus a list of `div`/`li` options. There is no `.select()`. The interaction is three steps:\n\n1. **Open** — click the trigger (combobox, `.ant-select-selector`, `[role=combobox]`).\n2. **Wait** — assert the options list is in the DOM (`should('be.visible')` or `should('exist')`).\n3. **Choose** — click the option by name.\n\n```js\ncy.get('[data-cy=leave-type]').click();\ncy.get('.ant-select-dropdown:visible')\n  .should('be.visible')\n  .contains('.ant-select-item', 'Annual Leave')\n  .click();\n\ncy.get('[data-cy=leave-type]').should('contain', 'Annual Leave');\n```\n\nSearchable comboboxes insert a type step:\n\n```js\ncy.get('[data-cy=approver]').click().type('Tamrakar');\ncy.contains('[role=option]', 'Simran Tamrakar').click();\n```\n\nDo not skip step 2. Clicking an option that is still mounting is a classic flake. Let retry-ability see the list first.\n\n## Portal caveat\n\nReact portals (`createPortal`) and most design-system Selects render the option list as a sibling of `#root` — typically a direct child of `document.body` — so it can escape `overflow: hidden` and sit above modals.\n\n```js\n// Fragile: options are NOT descendants of [data-cy=leave-type]\ncy.get('[data-cy=leave-type]').within(() => {\n  cy.contains('Annual Leave').click(); // never finds it\n});\n\n// Correct: query the list where it actually mounted\ncy.get('[data-cy=leave-type]').click();\ncy.get('body').find('.ant-select-dropdown:visible').contains('Annual Leave').click();\n```\n\nSame trap with `.find()` off the trigger. `.within()` is excellent for form *fields* that stay inside the wrapper (4.3); it is the wrong scope for portaled menus. If the Command Log says 0 matches while you can see the option, inspect the DOM: the list is probably under `body > .ant-select-dropdown`, not under your field.\n\n## Multi-select chips and keyboard\n\nMany custom multi-selects add a chip per choice. After each click, assert the chip exists before opening again. Escape/`{esc}` often closes the list — useful if a leftover open dropdown covers the next control (actionability: covered).\n\n## vs Playwright\n\nPlaywright `select_option` is also native-only; custom lists are click/get_by_role('option'). Playwright's `get_by_role('combobox')` + `get_by_role('option')` maps cleanly onto the 3-step pattern. Cypress Testing Library's `findByRole('option', { name: 'Annual Leave' })` (4.4) is the closest equivalent — still subject to the portal: `findByRole` searches the document, so it *helps* with portals; `.within()` does not.",
  "advantages": [
    "3.3 Dropdowns — Modern HRM dashboards almost never ship a raw <select> for department, leave type, or approver."
  ],
  "limitations": [
    "3.3 Dropdowns is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
