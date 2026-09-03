import type { ChapterRecord } from "../../../types";

/** 18. iframes */
export const chapter = {
  id: "cy-18-iframes",
  title: "18. iframes",
  minutes: 28,
  level: "intermediate",
  phase: "Part 3 · Actions",
  partName: "Part 3 · Actions",
  overviewText: "Comprehensive coverage of iframes in Cypress with code examples, Playwright comparisons, and interview-ready depth paired with the Playwright manual.",
  tools: [],
  customSummary: "- Cypress's in-browser execution model means cy.get() cannot see inside iframes at all by default — more restrictive than Playwright's native frame_locator().\n- cypress-iframe plugin (cy.frameLoaded() + cy.iframe()) patches around it for same-origin iframes; cross-origin iframes (Stripe/PayPal payment widgets) are dramatically harder or untestable — a concrete case favoring Playwright.",
  contentMarkdown: "The core limitation, explained plainly before the workaround\nCypress's in-browser execution model (Part 0) means its test code runs in the top-level page's JavaScript context — an iframe is, by browser design, a genuinely separate document with its own isolated JS context, even when same-origin. Cypress's own cy.get() and friends cannot see inside an iframe by default at all — this is a more restrictive starting position than Playwright, which has first-class frame_locator() support built directly into its core API (Part 2, Ch. 9 of your Playwright manual) precisely because Playwright's external-driver architecture doesn't have this same-JS-context constraint to begin with.\n## cypress-iframe plugin — the standard workaround\n\n```javascript\n// npm install -D cypress-iframe\n// in cypress/support/e2e.js:\nimport 'cypress-iframe';\n\n// in a test:\ncy.frameLoaded('#payment-iframe');\ncy.iframe('#payment-iframe').find('[data-cy=card-number]').type('4242424242424242');\ncypress-iframe is a community plugin (not built into Cypress core) that patches around the limitation by using jQuery to reach into the iframe's contentDocument directly. cy.frameLoaded() waits for the iframe's content to finish loading before you interact with it; cy.iframe() then gives you a jQuery-wrapped entry point into that frame's DOM you can chain further Cypress-style commands onto.\nWorth being honest about the trade-off here, directly tying back to Part 0's framing\nThis is exactly the kind of scenario flagged back in Part 0 as a case worth recognizing when Cypress is fighting its own architecture: same-origin iframes work reasonably with cypress-iframe, but cross-origin iframes (a real third-party payment widget like Stripe or PayPal embedded via iframe, which is extremely common specifically because of PCI-compliance requirements) are dramatically harder to reach reliably from Cypress, sometimes requiring additional workarounds or simply being untestable end-to-end through Cypress at all — versus Playwright's frame_locator(), which handles same-origin and cross-origin iframes with identical, unremarkable syntax. If Bizlevate's TADA expense system or HRM payroll module ever integrates a real third-party payment iframe, this is a concrete, decisive point in Playwright's favor worth remembering.\n```",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
