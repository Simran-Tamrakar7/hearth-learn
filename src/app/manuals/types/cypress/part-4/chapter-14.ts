import type { ChapterRecord } from "../../../types";

/** 36. UI Mode (Cypress) */
export const chapter = {
  id: "cy-36-ui-mode",
  title: "36. UI Mode (Cypress)",
  minutes: 22,
  level: "intermediate",
  phase: "Part 4 · Advanced",
  partName: "Part 4 · Advanced",
  overviewText: "cypress open IS Cypress UI mode — Launchpad, live reload, Selector Playground, and Command Log. Nameable DX advantage versus headless-only workflows.",
  why: "Interview and onboarding answers should map Cypress open features to Playwright UI Mode without claiming identical tooling.",
  when: "Local authoring, selector discovery, and explaining Cypress DX in interviews.",
  practical: {"app":"Any Cypress project","scenario":"New hire asks where UI Mode is.","pass":"Explain cypress open → Launchpad, playground, time-travel Command Log.","fail":"Say Cypress has no interactive runner."},
  advantages: ["cypress open = UI mode","Launchpad project pick","Selector Playground","Command Log time-travel","live reload specs","DX interview story"],
  limitations: ["not headless CI","playground CSS bias","open slower large suites","no PW-style watch all","GUI only local","electron chrome diff"],
  tools: [],
  customSummary: "- cypress open IS the UI mode; maps to Launchpad/reload/Selector Playground/Command Log; nameable DX advantage",
  contentMarkdown: "## cypress open is UI Mode\n\nUnlike Playwright's separate `ui` flag, Cypress's interactive experience **is** `npx cypress open`.\n\n## Feature map\n\n| Cypress open | Role |\n|---|---|\n| Launchpad | Pick E2E vs Component, browser, config |\n| Spec list + reload | Rerun on save |\n| Selector Playground | Click DOM → suggested selector |\n| Command Log | Time-travel snapshots per command |\n\n## DX advantage\n\nBeing able to name Launchpad, Playground, and Command Log time-travel is a concrete interview answer for \"why do teams love Cypress locally?\" — the GUI is first-class, not an afterthought.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
