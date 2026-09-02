import type { ChapterRecord } from "../../../types";

/** 59. Browser Extensions & Developer Tools */
export const chapter = {
  id: "pw-59-extensions",
  title: "59. Browser Extensions & Developer Tools",
  minutes: 15,
  level: "beginner",
  phase: "Part 8 · Resources",
  partName: "Part 8 · Resources",
  overviewText: "Chrome DevTools, axe DevTools, Playwright Inspector, Pick Locator tool, and extensions that accelerate locator building before writing tests.",
  why: "Most locator debugging happens in DevTools before pytest runs. Extensions bridge browser inspection and test authoring.",
  when: "Use daily from Part 1 onward; Pick Locator when converting manual exploration to code.",
  practical: { app: "Locator authoring", scenario: "Complex table row needs scoped locator — unsure of best strategy.", pass: "DevTools accessibility tree + Playwright Pick Locator + verify with PWDEBUG.", fail: "Copy full XPath from DevTools into page.locator() permanently." },
  advantages: ["DevTools accessibility tree reveals get_by_role candidates","Playwright Pick Locator generates Python locator syntax","axe DevTools catches a11y issues before automation","PWDEBUG integrates Inspector with running pytest test","Network tab diagnoses API timing issues mocks should cover","Extensions free — no additional license cost"],
  limitations: ["Pick Locator output needs human review for stability","axe DevTools not a replacement for automated axe scan in CI","Extension recommendations change with browser updates","DevTools skills separate from pytest framework skills","Over-reliance on CSS selectors from DevTools copy","Some corporate environments block extension installs"],
  tools: [],
  contentMarkdown: "## Browser Extensions & Developer Tools\n\nBrowser DevTools themselves (Chrome/Firefox/Edge DevTools) remain essential alongside Playwright's own tooling, not replaced by it. Even with Playwright's Inspector, UI Mode, and Trace Viewer (Chapter 35–37), directly inspecting a page's DOM, network tab, and console in a real browser DevTools panel is still frequently the fastest way to understand what a page is actually doing before writing a locator or diagnosing a failure — the two toolsets complement rather than replace each other.\n\nAccessibility-checking browser extensions complement the axe-core integration from Chapter 29. Browser extensions that surface accessibility issues interactively while manually browsing a page (rather than via an automated scan) are a useful complement to the automated axe-core checks from Chapter 29 — automated scans catch a broad first pass, but manually exploring a page with an accessibility-focused extension active often surfaces context (is this alt text actually meaningful, not just present) that automated tooling structurally can't judge.\n\nLocator-picking and selector-generation extensions can speed up initial locator discovery, with the same caveat as Codegen. Similar in spirit to Playwright's own Codegen (Part 1, Chapter 4) and Pick-locator (Chapter 36), various browser extensions offer element-inspection/selector-suggestion features — useful for quickly getting a starting-point locator, but worth applying the same discipline from Chapter 13: verify the suggested selector against the locator-strategy priority order rather than accepting whatever a tool suggests by default, since generic browser extensions have no awareness of Playwright's specific locator philosophy (role/label/test-id first).",
  customSummary: "## Browser Extensions & Developer Tools\n\nNative browser DevTools complement (not replace) Playwright's own Inspector/UI Mode/Trace Viewer.\nAccessibility-checking extensions complement Ch. 29's automated axe-core scans with human judgment on things like alt-text meaningfulness.\nLocator-picker extensions speed up discovery but need the same Ch. 13 priority-order discipline applied before accepting a suggestion.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
