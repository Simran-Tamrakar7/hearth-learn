import type { ChapterRecord } from "../../../types";

/** 9.3 Multi-Tab / New Window Limitations & Workarounds */
export const chapter = {
  "id": "cy-9-3-multi-tab-new-window-limitations-workarounds",
  "title": "9.3 Multi-Tab / New Window Limitations & Workarounds",
  "minutes": 30,
  "level": "advanced",
  "phase": "Part 9 · Advanced Topics",
  "partName": "Part 9 · Advanced Topics",
  "overviewText": "There is no cy.switchToTab(), no Page-object handle for a second window, and no supported way to drive two live tab DOMs in one Cypress test. target=_blank and window.open still happen at the OS level in headed mode — Cypress simply cannot address the new document. Workarounds verify intent (href/target), fetch the resource with cy.request, stub window.open, or visit the URL in the same tab.",
  "why": "Payslips, tax forms, and 'open in new tab' help articles are everywhere in HRM. Interviewers use 'how do you test a PDF that opens in a new tab' to see if you know the architectural ceiling.",
  "when": "Any click that sets target=_blank, calls window.open, or uses rel=noopener. Design the assertion before you write the click.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "On the compensation page, View Payslip opens /api/payslips/42.pdf in a new tab. You must prove the employee gets the right document.",
    "pass": "You assert the link href and target, then cy.request the href with the session cookie and check status/content-type/body. You never call switchToTab.",
    "fail": "You look for cy.switchToWindow() or copy a Selenium window-handle loop into a Cypress spec."
  },
  "tools": [],
  "customSummary": "- There is no cy.switchToTab() / switchToWindow() — that API does not exist because Cypress has one privileged iframe.\n- Headed runs may visually open a second tab; the command log still talks to the original tab.\n- Substitutes: assert href+target, cy.request the URL, stub window.open, strip target and cy.visit in-tab.\n- Playwright: page.waitForEvent('popup') / context.new_page(). Selenium: window handles + switchTo().window.\n- If the test's job is two live DOMs interacting, that test belongs in Playwright.",
  "contentMarkdown": "## What actually happens on click\n\n```html\n<a data-cy=\"view-payslip\" href=\"/api/payslips/42.pdf\" target=\"_blank\" rel=\"noopener\">\n  View payslip\n</a>\n```\n\nIn Playwright you wait for a popup Page and assert on it. In Selenium you snapshot `getWindowHandles()` before click, diff after, `switchTo().window(newHandle)`. In Cypress the second tab may appear in the real Chrome window, but the command queue is still bound to the original iframe. There is **no** `cy.switchToTab()`. Commands after the click that look for PDF DOM will time out against the HRM page you already had.\n\n## Workaround 1 — assert intent (often enough)\n\n```js\ncy.get('[data-cy=view-payslip]')\n  .should('have.attr', 'target', '_blank')\n  .and('have.attr', 'href')\n  .and('match', /\\/api\\/payslips\\/\\d+\\.pdf$/);\n```\n\nThis is the right test when the product requirement is \"this control opens the payslip resource in a new tab,\" not \"render the PDF plugin.\"\n\n## Workaround 2 — `cy.request` the same resource\n\n```js\ncy.get('[data-cy=view-payslip]').invoke('attr', 'href').then((href) => {\n  cy.request({ url: href, encoding: 'binary' }).then((res) => {\n    expect(res.status).to.eq(200);\n    expect(res.headers['content-type']).to.match(/pdf/i);\n    expect(res.body.byteLength).to.be.greaterThan(1000);\n  });\n});\n```\n\nYou reuse the Cypress session cookies automatically on same-origin `cy.request`. That is closer to \"the employee is allowed to download this payslip\" than a screenshot of a PDF viewer.\n\n## Workaround 3 — stub `window.open`\n\n```js\ncy.window().then((win) => {\n  cy.stub(win, 'open').as('open');\n});\ncy.get('[data-cy=compare-employees]').click();\ncy.get('@open').should('have.been.called');\ncy.get('@open').its('args.0.0').should('include', '/employees/99');\n```\n\nYou proved the app *tried* to open the URL. You did not test the other page.\n\n## Workaround 4 — same-tab visit\n\nRemove `target` in the test (or have the app honor a query flag) and `cy.visit` the href. Useful for HTML help articles. Awkward for binary PDFs.\n\n## When to stop workarounding\n\nTwo-tab \"mark notification read here, see badge update there\" is not an href check. Playwright holds two Pages. Say so. Do not invent a Cypress plugin that \"does tabs\" by screenshotting the OS chrome.\n\nInterview line: \"Cypress has no switchToTab. I assert the link or request the resource. If the business process is two live windows, I use Playwright for that spec.\"",
  "advantages": [
    "9.3 Multi-Tab / New Window Limitations & Workarounds — Payslips, tax forms, and 'open in new tab' help articles are everywhere in HRM."
  ],
  "limitations": [
    "9.3 Multi-Tab / New Window Limitations & Workarounds is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
