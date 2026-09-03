import type { ChapterRecord } from "../../../types";

/** 30. Cross-browser Testing */
export const chapter = {
  id: "cy-30-cross-browser",
  title: "30. Cross-browser Testing",
  minutes: 25,
  level: "advanced",
  phase: "Part 4 · Advanced",
  partName: "Part 4 · Advanced",
  overviewText: "Comprehensive coverage of Cross-browser Testing in Cypress with code examples, Playwright comparisons, and interview-ready depth paired with the Playwright manual.",
  why: "Mastering Cross-browser Testing in Cypress's command-queue model prevents flaky specs and wrong Playwright ports.",
  when: "Read when implementing or debugging cross-browser testing in your suite.",
  practical: { app: "Web application under test", scenario: "Spec fails around cross-browser testing — need Cypress-native pattern.", pass: "Apply chapter patterns with retry semantics not bare cy.wait(ms).", fail: "Port Playwright await code or fixed delays." },
  advantages: ["browser chrome firefox edge","WebKit permanently absent","Electron vs Chrome CI","Launchpad detection","Firefox 2020 Edge Chromium","per-browser rendering"],
  limitations: ["no Safari ever","Electron not Chrome","Firefox less mature","triples CI time","agent browser version","emulation not device"],
  tools: [],
  customSummary: "- --browser chrome/firefox/edge/electron; before:browser:launch hook for browser-specific launch flags.\n- No --browser webkit, ever — a permanent architectural absence, not a missing config option. Concrete, decisive fact for interviews if Safari traffic matters.",
  contentMarkdown: "## Chrome, Edge, Firefox, Electron — go deeper on real config differences per browser\n\n```bash\nnpx cypress run --browser chrome\nnpx cypress run --browser firefox\nnpx cypress run --browser edge\nnpx cypress run --browser electron   # default if --browser omitted\njavascript\n```\n\n## // cypress.config.js — browser-specific launch options if needed\n\nmodule.exports = defineConfig({\n  e2e: {\n    setupNodeEvents(on, config) {\n      on('before:browser:launch', (browser, launchOptions) => {\n        if (browser.name === 'chrome') {\n          launchOptions.args.push('--disable-gpu');\n        }\n        return launchOptions;\n      });\n    },\n  },\n});\nThe before:browser:launch event (registered inside setupNodeEvents, previewed here, full depth in Chapter 33's plugin coverage) is worth knowing exists — it's the hook point for passing browser-specific command-line flags, useful for things like disabling GPU acceleration in a headless CI environment prone to rendering-related flakiness, or adjusting Chrome's memory limits on a resource-constrained CI runner.\nWorth restating the permanent WebKit gap here in a practical context\nSince this chapter is explicitly about the cross-browser story, it's worth restating plainly one more time in this concrete context: there is no --browser webkit option, ever, in Cypress — this isn't a missing config value you're overlooking, it's a permanent architectural absence. If Safari-specific behavior genuinely matters for your application's real user base (worth actually checking your analytics for Safari traffic percentage before assuming this doesn't matter), a Cypress-only cross-browser suite has a structural blind spot no configuration change can close — this is the single most concrete, decisive technical fact worth having ready in an interview question about Cypress's limitations.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
