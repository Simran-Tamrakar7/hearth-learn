import type { ChapterRecord } from "../../../types";

/** 9.9 Cross-Browser & Cross-Device Testing */
export const chapter = {
  "id": "cy-9-9-cross-browser-cross-device-testing",
  "title": "9.9 Cross-Browser & Cross-Device Testing",
  "minutes": 28,
  "level": "advanced",
  "phase": "Part 9 · Advanced Topics",
  "partName": "Part 9 · Advanced Topics",
  "overviewText": "Cypress officially drives Chromium-family browsers (Chrome, Edge, Electron) and Firefox from local installs. WebKit — Safari's engine — has never had first-class official support. Device coverage is viewport emulation (cy.viewport / config), not real iPhones. Playwright includes WebKit natively; Selenium can drive SafariDriver on macOS. Real phones still want Appium or a vendor device cloud.",
  "why": "If Bizlevate's executives live in Safari, a Cypress-only matrix will not see WebKit layout bugs. Saying 'we test mobile' because you set iphone-x viewport is how teams ship broken iOS chrome.",
  "when": "When defining the CI browser matrix, when a bug is Safari-only, and when a ticket says 'mobile testing' (then read 9.17).",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You must propose a browser/device matrix for HRM: most employees on Chrome, finance on Safari, some on company iPhones.",
    "pass": "You run Cypress on Chrome and Firefox in CI, state that WebKit is not first-class so Safari risk is Playwright or Sauce/LambdaTest Safari, and you treat cy.viewport as responsive-web only.",
    "fail": "You add --browser webkit as if it were Playwright, or you call viewport iphone-x 'real device testing.'"
  },
  "tools": [],
  "customSummary": "- Official: Electron (bundled), Chrome, Edge, Firefox. No first-class WebKit/Safari.\n- --browser selects one browser per run; matrix = multiple runs/jobs (see 9.8).\n- cy.viewport / config viewportWidth+Height emulate size, not iOS WebKit or touch chrome.\n- Playwright: Chromium + Firefox + WebKit first-class. Selenium: SafariDriver possible.\n- Real devices: vendor cloud or Appium (native); Cypress is not a device lab.",
  "contentMarkdown": "## What Cypress will actually launch\n\n```bash\nnpx cypress run --browser chrome\nnpx cypress run --browser edge\nnpx cypress run --browser firefox\nnpx cypress run --browser electron   # bundled default\n```\n\nChrome/Edge/Firefox must be installed (or provided by `cypress/browsers` images, 11.2). Electron ships inside the npm package — that is why tutorials \"just work\" and why Electron-only CI misses Firefox bugs.\n\n**WebKit:** experimental community runners have existed; they are not something you stake payroll-critical Safari coverage on. Playwright's `webkit` browser is the honest answer for first-class Safari-engine tests.\n\n## Viewport is not a device\n\n```js\ncy.viewport('iphone-x');\ncy.viewport(390, 844);\n```\n\nThis resizes the iframe. It does not install iOS, does not use WebKit, does not fire real touch (there is `cypress-real-events` for closer pointer events — still desktop Chrome). Use it to catch CSS that collapses the leave calendar at 375px.\n\n## A sane Bizlevate matrix\n\n1. **PR gate:** Cypress Chrome headless (fast, majority users).\n2. **Nightly:** Cypress Firefox + Chrome, same specs.\n3. **Safari/WebKit critical journeys:** Playwright WebKit or a cloud Safari browser — *named as a different job*, not a Cypress flag you wish existed.\n4. **Responsive:** a handful of specs with `cy.viewport` at mobile width.\n5. **Native app:** Appium, if it exists (9.17).\n\n## Versus Playwright and Selenium\n\nPlaywright's project matrix (`chromium`, `firefox`, `webkit`, pixel 5 viewport) is one config file. Selenium + Sauce Labs can request iPhone Safari capabilities Cypress cannot originate. Cypress wins DX on Chromium; it loses the \"one tool, all engines\" story.\n\nInterview line: \"Cypress has no first-class WebKit. I emulate devices with viewports. Safari-engine coverage is Playwright or a cloud browser, not a Cypress checkbox.\"",
  "advantages": [
    "9.9 Cross-Browser & Cross-Device Testing — If Bizlevate's executives live in Safari, a Cypress-only matrix will not see WebKit layout bugs."
  ],
  "limitations": [
    "9.9 Cross-Browser & Cross-Device Testing is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
