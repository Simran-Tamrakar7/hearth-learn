import type { ChapterRecord } from "../../../types";

/** 43. Building a Scalable Framework from Scratch (Cypress) */
export const chapter = {
  id: "cy-43-framework",
  title: "43. Building a Scalable Framework from Scratch (Cypress)",
  minutes: 35,
  level: "advanced",
  phase: "Part 6 · Pro-Level Practices",
  partName: "Part 6 · Pro-Level Practices",
  overviewText: "Prefer custom commands and App Actions over heavy Page Object Model ports. Wrap API clients for setup/teardown. Apply DRY and SRP across support files and specs.",
  why: "Playwright POM habits over-abstract Cypress. Framework shape should follow the command queue and cy.session strengths.",
  when: "Suite grows past ~30 specs or multiple engineers contribute.",
  practical: {"app":"Multi-module product","scenario":"Duplicated login and API seed in every file.","pass":"App Actions + cy.session + API wrappers in support/.","fail":"Deep POM class hierarchy fighting cy chains."},
  advantages: ["custom commands","App Actions pattern","API client wrappers","DRY support files","SRP per helper","cy.session roles"],
  limitations: ["over-commanding obscures","POM mismatch Cypress","global commands clash","TS types for commands","support bloat","abstraction lag"],
  tools: [],
  customSummary: "- custom commands App Actions; API client wrappers; DRY/SRP",
  contentMarkdown: "## Custom commands & App Actions\n\nCypress community often prefers **App Actions** (functions that drive flows via UI or API) over classical POM classes. Register thin `Cypress.Commands.add` wrappers for repeated flows.\n\n## API client wrappers\n\nPut `cy.request` helpers in `cypress/support` for seeding users, cleaning data, and bypassing UI setup — keep E2E focused on user-visible paths.\n\n## DRY / SRP\n\n- One concern per support module (auth, billing API, selectors)\n- Specs describe scenarios; helpers own mechanics\n- Avoid a god `commands.js` that imports the world",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
