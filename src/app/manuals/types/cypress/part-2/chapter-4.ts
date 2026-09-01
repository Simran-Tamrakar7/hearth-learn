import type { ChapterRecord } from "../../../types";

/** 13. Aliases */
export const chapter = {
  id: "cy-13-aliases",
  title: "13. Aliases",
  minutes: 25,
  level: "intermediate",
  phase: "Part 2 · Core Commands",
  partName: "Part 2 · Core Commands",
  overviewText: "Comprehensive coverage of Aliases in Cypress with code examples, Playwright comparisons, and interview-ready depth paired with the Playwright manual.",
  why: "Mastering Aliases in Cypress's command-queue model prevents flaky specs and wrong Playwright ports.",
  when: "Read when implementing or debugging aliases in your suite.",
  practical: { app: "Web application under test", scenario: "Spec fails around aliases — need Cypress-native pattern.", pass: "Apply chapter patterns with retry semantics not bare cy.wait(ms).", fail: "Port Playwright await code or fixed delays." },
  advantages: ["DOM aliases via as()","get @alias retrieval","intercept alias + wait","per-test scope only","@ prefix convention","reduces duplicate get"],
  limitations: ["no cross-it persistence","stale after re-render","over-alias indirection","intercept name collisions","not Page Object scale","alias less visible in log"],
  tools: [],
  contentMarkdown: "## .as() — go deeper on what aliases actually store and why they're not just a naming convenience\n\n```javascript\ncy.get('.total-price').as('totalPrice');\n\n// later in the same test\ncy.get('@totalPrice').should('contain', '$49.99');\nAn alias created with .as() isn't merely a readable label — it's Cypress's mechanism for re-referencing a previously yielded subject without re-running the original query, though for DOM elements specifically, Cypress does actually re-query when you reference cy.get('@alias') (to guard against stale references if the DOM changed) — the real distinguishing power of aliases shows up with non-DOM subjects: intercepted routes (Chapter 23) and fixture data (Chapter 25), where re-fetching genuinely isn't happening and the alias is retrieving the exact stored value.\n```\n\n## Aliasing intercepted routes — the single most common and important use of aliases\n\n```javascript\ncy.intercept('GET', '/api/users').as('getUsers');\ncy.visit('/users');\ncy.wait('@getUsers').its('response.statusCode').should('eq', 200);\nThis is worth flagging as the pattern you'll use constantly (previewed briefly in Part 0, full depth in Chapter 23): cy.wait('@getUsers') doesn't wait a fixed duration — it specifically pauses the test until the network request matching that named intercept actually completes, then yields the full intercepted request/response object, letting you assert on it directly (status code, response body, request payload). This has no single-line direct equivalent in Playwright, where you'd more typically use page.wait_for_response() matching a URL pattern.\n```\n\n## Aliasing fixture data — reused across multiple test steps without re-loading the file\n\n```javascript\ncy.fixture('users.json').as('userData');\n\nit('uses fixture data', function () {\n  cy.get('@userData').then((users) => {\n    cy.get('[data-cy=username]').type(users.valid_user.username);\n  });\n});\nWorth flagging a subtlety here: when using aliases with fixture data (or any custom alias you want to reference via this.aliasName instead of cy.get('@alias')), the enclosing test must use a regular function () {} rather than an arrow function — this is because Cypress attaches aliased values to Mocha's this context, and arrow functions don't bind their own this the way regular functions do. This is a genuinely common beginner gotcha worth knowing about before you hit it: an arrow-function test silently failing to find this.userData because this doesn't point where you'd expect.\n```\n\n## Aliasing other things — elements, stubs (previewed, full depth later)\n\nAliases also work for aliasing reusable DOM element references you'll act on multiple times in one test, and for aliasing stubs/spies (a Sinon-Chai concept, Chapter 14) when testing whether a function was called correctly — same underlying .as()/cy.get('@alias') or cy.wait('@alias') mechanism applied to different kinds of subjects throughout the rest of this manual.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
