import type { ChapterRecord } from "../../../types";

/** 22. Waiting Strategies */
export const chapter = {
  id: "cy-22-waiting",
  title: "22. Waiting Strategies",
  minutes: 30,
  level: "intermediate",
  phase: "Part 3 · Actions",
  partName: "Part 3 · Actions",
  overviewText: "Comprehensive coverage of Waiting Strategies in Cypress with code examples, Playwright comparisons, and interview-ready depth paired with the Playwright manual.",
  why: "Mastering Waiting Strategies in Cypress's command-queue model prevents flaky specs and wrong Playwright ports.",
  when: "Read when implementing or debugging waiting strategies in your suite.",
  practical: { app: "Web application under test", scenario: "Spec fails around waiting strategies — need Cypress-native pattern.", pass: "Apply chapter patterns with retry semantics not bare cy.wait(ms).", fail: "Port Playwright await code or fixed delays." },
  advantages: ["should retry first","wait @alias network","intercept prerequisite","never wait ms first","route vs UI tree","Playwright parallel principle"],
  limitations: ["wait ms hides perf","alias after visit fails","UI-network race","over-wait slows CI","misdiagnosed flakes","polling needs intercept"],
  tools: [],
  contentMarkdown: "The core anti-pattern, stated plainly upfront\n```javascript\n// Avoid this:\ncy.get('[data-cy=submit]').click();\ncy.wait(3000);   // hope 3 seconds is enough\ncy.get('[data-cy=success-message]').should('be.visible');\ncy.wait(<number>) — waiting a fixed, arbitrary number of milliseconds — is Cypress's version of the exact same anti-pattern flagged in Playwright's manual (Part 2, Ch. 8): too short and the test is flaky, too long and every run wastes time even when the app responded instantly. It's worth being extra clear that this applies to cy.wait() only when passed a plain number — the exact same command name has a completely different, legitimate meaning when passed an alias (covered next), which is a real source of confusion for newcomers skimming code and seeing cy.wait(...) used in two apparently contradictory ways.\n```\n\n## The correct pattern — aliased network waits, tying directly back to Chapter 13\n\n```javascript\ncy.intercept('GET', '/api/dashboard-data').as('dashboardData');\ncy.visit('/dashboard');\n```\n\n## cy.wait('@dashboardData');   // waits for this specific network call to complete — not a fixed duration\n\ncy.get('[data-cy=success-message]').should('be.visible');\ncy.wait('@alias') — passed a string alias rather than a number — behaves completely differently: it pauses the test until the specific aliased network request actually completes, however long that genuinely takes, then continues immediately. This is the Cypress-idiomatic replacement for \"just wait a few seconds and hope\" — instead of guessing at a duration, you wait for the actual event (a specific API call finishing) that indicates the page is truly ready to interact with. Full cy.intercept()/cy.wait('@alias') reference lives in Chapter 23, but the core waiting-strategy principle belongs here alongside the anti-pattern it replaces.\n## Leaning on built-in retry-ability instead of any explicit wait at all — the actual best default\n\n```javascript\n// No wait needed at all — .should() already retries until the element/text appears:\ncy.get('[data-cy=submit]').click();\ncy.get('[data-cy=success-message]').should('be.visible');\nFor the very common case where you're simply waiting for some element to eventually appear/change after an action — not specifically needing to inspect the network call itself — Cypress's built-in retry-ability (Chapter 12) on .should() already handles this with no explicit wait needed at all, exactly mirroring Playwright's \"auto-waiting means you rarely need manual waits\" principle (Part 2, Ch. 8 of your Playwright manual). The decision tree worth internalizing: if you just need to wait for UI to reflect a change, lean on .should()'s built-in retry and add no explicit wait; if you specifically need to assert on or synchronize with the underlying network call itself (status code, response payload, or genuinely flaky timing tied to a slow backend), reach for cy.intercept().as() + cy.wait('@alias'); never reach for a bare numeric cy.wait() as a first resort.\n\nPart 4: Advanced Techniques (Expanded)\n```",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
