import type { ChapterRecord } from "../../../types";

/** 17. Checkboxes, Radio Buttons, Dropdowns */
export const chapter = {
  id: "cy-17-checkboxes",
  title: "17. Checkboxes, Radio Buttons, Dropdowns",
  minutes: 25,
  level: "intermediate",
  phase: "Part 3 · Actions",
  partName: "Part 3 · Actions",
  overviewText: "Comprehensive coverage of Checkboxes, Radio Buttons, Dropdowns in Cypress with code examples, Playwright comparisons, and interview-ready depth paired with the Playwright manual.",
  why: "Mastering Checkboxes, Radio Buttons, Dropdowns in Cypress's command-queue model prevents flaky specs and wrong Playwright ports.",
  when: "Read when implementing or debugging checkboxes, radio buttons, dropdowns in your suite.",
  practical: { app: "Web application under test", scenario: "Spec fails around checkboxes, radio buttons, dropdowns — need Cypress-native pattern.", pass: "Apply chapter patterns with retry semantics not bare cy.wait(ms).", fail: "Port Playwright await code or fixed delays." },
  advantages: ["check uncheck","radio check groups","cy.select native","custom dropdown clicks","indeterminate invoke","hidden force caution"],
  limitations: ["custom dropdowns not select","dynamic radio names","MUI overlays specific","wrong type check fails","same name needs eq","CSS only not a11y tree"],
  tools: [],
  contentMarkdown: "## check()/uncheck() — go deeper on targeting specific checkboxes among several\n\n```javascript\ncy.get('[data-cy=remote-checkbox]').check();\ncy.get('[data-cy=newsletter-checkbox]').uncheck();\n\n// Checking specific checkboxes by value, when several share a selector\ncy.get('[data-cy=skills]').check(['Python', 'Playwright']);\n\n// Checking every checkbox matching a selector\ncy.get('input[type=\"checkbox\"]').check();\nLike Playwright's .check()/.uncheck() (Part 2, Ch. 6 of your Playwright manual), Cypress's versions are idempotent — calling .check() on an already-checked box doesn't toggle it off, unlike .click(), which would. The array-argument form (.check(['Python', 'Playwright'])) is genuinely convenient for multi-select checkbox groups sharing a common selector but distinguished by their value attribute — worth knowing this exists rather than writing a separate .check() call per checkbox.\n```\n\n## Radio buttons — go deeper, since they behave slightly differently from checkboxes conceptually\n\n```javascript\ncy.get('[data-cy=employment-type]').check('full-time');\nRadio buttons within the same name group are mutually exclusive by browser-native behavior — checking one automatically unchecks any sibling in the same group, so you don't need (and can't meaningfully call) .uncheck() on a radio button the way you can on a checkbox; selecting a different radio button in the group is the only way to \"uncheck\" a previously selected one.\n```\n\n## select() — go deeper on native <select> limitations, same fundamental boundary as Playwright\n\n```javascript\ncy.get('[data-cy=department]').select('Quality Assurance');  // by visible text\ncy.get('[data-cy=department]').select('qa');                  // by value attribute\ncy.get('[data-cy=skills-multiselect]').select(['Python', 'Cypress']); // multi-select\nSame fundamental boundary as Playwright's .select_option() (Part 2, Ch. 6 of your Playwright manual): .select() only works on native HTML <select> elements. A custom-built dropdown (a styled <div> with a click-to-open list of <li> options — extremely common in modern component libraries, including most React-based design systems) isn't a real <select> at all, so .select() will simply fail to find a matching option. For those, treat it like any other clickable UI: click to open the dropdown, then cy.contains('.dropdown-option', 'Quality Assurance').click() to pick the visible option — this is worth anticipating specifically for an HRM system's likely component library (custom dropdowns are near-universal in modern admin dashboards) rather than assuming .select() will just work.\n```",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
