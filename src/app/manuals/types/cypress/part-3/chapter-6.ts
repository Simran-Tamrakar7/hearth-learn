import type { ChapterRecord } from "../../../types";

/** 3.6 Handling iframes */
export const chapter = {
  "id": "cy-3-6-handling-iframes",
  "title": "3.6 Handling iframes",
  "minutes": 28,
  "level": "intermediate",
  "phase": "Part 3 · Interacting with Elements",
  "partName": "Part 3 · Interacting with Elements",
  "overviewText": "cy.get() cannot see into an iframe's document by default — Cypress commands run against the AUT's top document. Same-origin iframes use the contentDocument.body wrap pattern (or cypress-iframe). Cross-origin iframes (Stripe, Okta widgets) hit the same-origin policy; cy.origin() may help a full-page navigation, not a foreign iframe you do not control.",
  "why": "Payment and e-signature widgets are iframes. Playwright's frame_locator is first-class; Cypress requires a documented recipe. Knowing the same-origin pattern vs 'this iframe is untestable in Cypress' is the honest architecture answer from Part 0.",
  "when": "Embedded HTML editors, same-origin preview panes, third-party payment/signature widgets. Revisit when cy.get('[data-cy=card-number]') times out and the field is visibly inside an iframe in DevTools.",
  "practical": {
    "app": "Bizlevate TADA / payroll — same-origin policy iframe vs Stripe card widget",
    "scenario": "Fill a same-origin policy-acknowledgement iframe, then decide how far to test a Stripe Elements card iframe.",
    "pass": "You use the contentDocument.body + cy.wrap pattern (or cypress-iframe) for same-origin. For Stripe you treat the widget as out of scope or use Stripe test APIs — you do not expect cy.get to pierce cross-origin.",
    "fail": "You cy.get the card number in the parent document, or you assume cy.origin() magically enters a nested third-party iframe."
  },
  "tools": [],
  "customSummary": "- Cypress does not query iframe documents by default — more ceremony than Playwright frame_locator().\n- Same-origin pattern: cy.get('iframe').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap).find(...).\n- cypress-iframe: cy.frameLoaded() + cy.iframe() is a plugin convenience over the same idea.\n- Cross-origin iframes are blocked by the browser; Cypress cannot honestly E2E a Stripe inner form.",
  "contentMarkdown": "## Why `cy.get` misses iframe contents\n\nAn iframe is a nested browsing context with its own `document`. Cypress commands target the application's document (the AUT inside Cypress's runner iframe). They do not automatically recurse into child frames. Playwright's external driver enumerates frames as first-class objects (`frame_locator`); Cypress's in-page model starts more restrictive even for **same-origin** frames.\n\nOpen DevTools on a failing test: if the input lives under `#payment-iframe` → `#document` → `input`, your parent-document selector will never retry successfully.\n\n## Same-origin pattern (core Cypress)\n\nOfficial recipe — no plugin required when the iframe `src` is same-origin (or `srcdoc`):\n\n```js\ncy.get('[data-cy=policy-iframe]')\n  .its('0.contentDocument.body')\n  .should('not.be.empty')\n  .then(cy.wrap)\n  .find('[data-cy=acknowledge]')\n  .check();\n\ncy.get('[data-cy=policy-iframe]')\n  .its('0.contentDocument.body')\n  .then(cy.wrap)\n  .find('[data-cy=policy-accept]')\n  .click();\n```\n\nWalkthrough: `.its('0.contentDocument.body')` reaches the iframe's DOM (jQuery collection index 0). `.should('not.be.empty')` retries until the inner document has loaded. `cy.wrap` turns the raw body back into a Cypress subject so `.find()` is a Cypress command with retry-ability.\n\nIf you skip `should('not.be.empty')`, you race the iframe load. If you skip `cy.wrap`, you cannot chain Cypress commands on a naked DOM node.\n\n## `cypress-iframe` plugin\n\n```js\n// npm i -D cypress-iframe\n// support/e2e.js: import 'cypress-iframe';\n\ncy.frameLoaded('[data-cy=policy-iframe]');\ncy.iframe('[data-cy=policy-iframe]')\n  .find('[data-cy=acknowledge]')\n  .check();\n```\n\nThis is sugar over the same `contentDocument` access. Use it if the team wants readable specs; know the core pattern for interviews and for environments that ban extra plugins.\n\n## Cross-origin iframes\n\nThe browser's same-origin policy blocks reading `contentDocument` of `https://js.stripe.com` from your app origin. Cypress cannot patch around that any more than your app's own JavaScript can. `cy.origin()` re-injects test code for a **top-level** navigation to another origin (Part 9.1). It is not a general \"enter this nested Stripe iframe\" API.\n\nPractical options for a Stripe/PayPal widget:\n\n- Do not E2E the inner PAN field; assert your app opened the widget and complete payment via test tokens / API stubs (Part 5).\n- If the third party offers a same-origin test harness, use that in a dedicated spec.\n- If the suite *must* drive the inner iframe, that is a concrete Playwright reason (Part 0.4).\n\n## Nested iframes and multiple frames\n\nChain `.its('0.contentDocument.body').then(cy.wrap).find('iframe')` again for same-origin nesting. Prefer `data-cy` on the outer iframe element so you do not grab the wrong frame when the page has several.\n\n## vs Playwright\n\n```js\n// Playwright (conceptual): page.frame_locator('#policy').get_by_label('I agree')\n```\n\nSame test, less ceremony, including many cross-origin cases. Cypress: same-origin recipe or plugin; cross-origin nested widgets are an architecture stop sign, not a missing import.",
  "blocks": [
    {
      "id": "cy-3-6-md-0",
      "type": "overview",
      "heading": "Why `cy.get` misses iframe contents",
      "content": "An iframe is a nested browsing context with its own `document`. Cypress commands target the application's document (the AUT inside Cypress's runner iframe). They do not automatically recurse into child frames. Playwright's external driver enumerates frames as first-class objects (`frame_locator`); Cypress's in-page model starts more restrictive even for **same-origin** frames.\n\nOpen DevTools on a failing test: if the input lives under `#payment-iframe` → `#document` → `input`, your parent-document selector will never retry successfully.",
      "order": 0
    },
    {
      "id": "cy-3-6-md-1",
      "type": "overview",
      "heading": "Same-origin pattern (core Cypress)",
      "content": "Official recipe — no plugin required when the iframe `src` is same-origin (or `srcdoc`):\n\n```js\ncy.get('[data-cy=policy-iframe]')\n  .its('0.contentDocument.body')\n  .should('not.be.empty')\n  .then(cy.wrap)\n  .find('[data-cy=acknowledge]')\n  .check();\n\ncy.get('[data-cy=policy-iframe]')\n  .its('0.contentDocument.body')\n  .then(cy.wrap)\n  .find('[data-cy=policy-accept]')\n  .click();\n```\n\nWalkthrough: `.its('0.contentDocument.body')` reaches the iframe's DOM (jQuery collection index 0). `.should('not.be.empty')` retries until the inner document has loaded. `cy.wrap` turns the raw body back into a Cypress subject so `.find()` is a Cypress command with retry-ability.\n\nIf you skip `should('not.be.empty')`, you race the iframe load. If you skip `cy.wrap`, you cannot chain Cypress commands on a naked DOM node.",
      "order": 1
    },
    {
      "id": "cy-3-6-md-2",
      "type": "overview",
      "heading": "`cypress-iframe` plugin",
      "content": "```js\n// npm i -D cypress-iframe\n// support/e2e.js: import 'cypress-iframe';\n\ncy.frameLoaded('[data-cy=policy-iframe]');\ncy.iframe('[data-cy=policy-iframe]')\n  .find('[data-cy=acknowledge]')\n  .check();\n```\n\nThis is sugar over the same `contentDocument` access. Use it if the team wants readable specs; know the core pattern for interviews and for environments that ban extra plugins.",
      "order": 2
    },
    {
      "id": "cy-3-6-md-3",
      "type": "overview",
      "heading": "Cross-origin iframes",
      "content": "The browser's same-origin policy blocks reading `contentDocument` of `https://js.stripe.com` from your app origin. Cypress cannot patch around that any more than your app's own JavaScript can. `cy.origin()` re-injects test code for a **top-level** navigation to another origin (Part 9.1). It is not a general \"enter this nested Stripe iframe\" API.\n\nPractical options for a Stripe/PayPal widget:\n\n- Do not E2E the inner PAN field; assert your app opened the widget and complete payment via test tokens / API stubs (Part 5).\n- If the third party offers a same-origin test harness, use that in a dedicated spec.\n- If the suite *must* drive the inner iframe, that is a concrete Playwright reason (Part 0.4).",
      "order": 3
    },
    {
      "id": "cy-3-6-md-4",
      "type": "overview",
      "heading": "Nested iframes and multiple frames",
      "content": "Chain `.its('0.contentDocument.body').then(cy.wrap).find('iframe')` again for same-origin nesting. Prefer `data-cy` on the outer iframe element so you do not grab the wrong frame when the page has several.",
      "order": 4
    },
    {
      "id": "cy-3-6-md-5",
      "type": "overview",
      "heading": "vs Playwright",
      "content": "```js\n// Playwright (conceptual): page.frame_locator('#policy').get_by_label('I agree')\n```\n\nSame test, less ceremony, including many cross-origin cases. Cypress: same-origin recipe or plugin; cross-origin nested widgets are an architecture stop sign, not a missing import.",
      "order": 5
    }
  ],
  "advantages": [
    "3.6 Handling iframes — Payment and e-signature widgets are iframes."
  ],
  "limitations": [
    "3.6 Handling iframes is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
