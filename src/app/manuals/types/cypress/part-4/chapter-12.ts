import type { ChapterRecord } from "../../../types";

/** 34. Localization / i18n Testing (Cypress) */
export const chapter = {
  id: "cy-34-i18n",
  title: "34. Localization / i18n Testing (Cypress)",
  minutes: 26,
  level: "advanced",
  phase: "Part 4 · Advanced",
  partName: "Part 4 · Advanced",
  overviewText: "Cypress has no built-in locale or timezone helpers. Stub locale via onBeforeLoad or cookies; prefer data-cy over translated text; cover RTL with visual regression; unit-test date/number formats.",
  why: "Hard-coding English copy in selectors breaks every locale switch. i18n suites need stable hooks and clear split between E2E and unit format tests.",
  when: "Multi-locale products, RTL languages, or timezone-sensitive UI (deadlines, calendars).",
  practical: {"app":"Multi-locale dashboard","scenario":"Assert UI in FR/AR without brittle text selectors.","pass":"data-cy everywhere; locale cookie/onBeforeLoad; RTL screenshot check.","fail":"cy.contains('Submit') for every language."},
  tools: [],
  customSummary: "- no built-in locale/timezone; onBeforeLoad stub or cookie; data-cy mandatory for i18n; RTL via visual regression; unit-test date formats",
  contentMarkdown: "## No built-in locale / timezone\n\nCypress does not ship `locale` or `timezoneId` launch options like Playwright. Set language via app mechanisms:\n\n```javascript\ncy.visit('/app', {\n  onBeforeLoad(win) {\n    Object.defineProperty(win.navigator, 'language', { value: 'fr-FR' });\n  },\n});\n// or: cy.setCookie('locale', 'fr');\n```\n\n## data-cy is mandatory for i18n\n\nPrefer `[data-cy=submit]` over `cy.contains('Submit')` so the same spec runs under every locale.\n\n## RTL\n\nExercise Arabic/Hebrew layouts with visual regression (Percy, Applitools, or screenshot diffs) — structural assertions alone miss mirroring bugs.\n\n## Dates & numbers\n\nAssert formatting in unit tests (`Intl`, date-fns). Reserve E2E for \"user picks locale → UI switches,\" not every currency pattern.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
