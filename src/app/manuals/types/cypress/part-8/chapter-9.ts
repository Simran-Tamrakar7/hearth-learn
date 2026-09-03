import type { ChapterRecord } from "../../../types";

/** 59. Browser Extensions & Developer Tools */
export const chapter = {
  id: "cy-59-extensions",
  title: "59. Browser Extensions & Developer Tools",
  minutes: 16,
  level: "beginner",
  phase: "Part 8 · Resources, Citations & Reference Library",
  partName: "Part 8 · Resources, Citations & Reference Library",
  overviewText: "Browser DevTools complement Cypress Command Log; a11y extensions aid judgment; locator helpers need data-cy discipline.",
  why: "Extensions speed authoring but can teach bad selectors if unchecked.",
  when: "Writing specs locally with open runner.",
  practical: {"app":"Local authoring","scenario":"Need quicker selector discovery.","pass":"Playground + DevTools + a11y extension review.","fail":"Auto-generated brittle CSS from extension."},
  tools: [],
  customSummary: "- Chrome/Firefox DevTools alongside cypress open\n- axe / Accessibility insights extensions for manual checks\n- Prefer data-cy over extension-generated CSS selectors",
  contentMarkdown: "## Tooling\n\nUse native DevTools while `cypress open` runs — Network/Console apply to the app under test. Pair axe browser extensions with automated axe in specs (Ch. 25). Never paste extension CSS as long-term locators.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
