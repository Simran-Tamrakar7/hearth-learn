import type { ChapterRecord } from "../../../types";

/** 9.17 Mobile Testing — Real Limitations */
export const chapter = {
  "id": "cy-9-17-mobile-testing-real-limitations",
  "title": "9.17 Mobile Testing — Real Limitations",
  "minutes": 26,
  "level": "advanced",
  "phase": "Part 9 · Advanced Topics",
  "partName": "Part 9 · Advanced Topics",
  "overviewText": "Cypress can emulate a mobile viewport and, with plugins, closer pointer events. It cannot automate a compiled iOS/Android HRM app from the store — that is Appium (or Detox/Espresso/XCUITest). It also cannot honestly claim Safari/iOS web coverage because there is no first-class WebKit. 'We test mobile with Cypress' only means 'responsive web in a skinny Chromium iframe' unless you add other tools.",
  "why": "Product will ask why the native app has no Cypress tests after a successful web rollout. The precise boundary protects you from promising Appium work in Cypress, and it is an interview staple.",
  "when": "When the roadmap includes an iOS app, when a bug is 'only on my iPhone,' and when designing the test pyramid for a 'mobile-first' HRM.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "Bizlevate plans a native iOS app for leave submit plus the existing responsive web app. Leadership asks to 'just point Cypress at iOS.'",
    "pass": "You keep Cypress for responsive web (viewport, maybe a cloud mobile Chrome), and you name Appium (or vendor device cloud with real Safari) for native and real iOS web. You do not say Cypress runs in the App Store binary.",
    "fail": "You set cy.viewport('iphone-x') and report mobile native coverage as done."
  },
  "tools": [],
  "customSummary": "- Cypress = web in a browser you launched. Viewport ≠ iPhone.\n- No first-class WebKit ⇒ weak iOS Safari story (9.9).\n- Native store apps: Appium (or platform-native frameworks), not Cypress.\n- Playwright: better iOS-web via WebKit, still not native Appium.\n- Real devices: vendor labs (BrowserStack/Sauce) or Appium grid.",
  "contentMarkdown": "## Three different products people collapse into \"mobile\"\n\n1. **Responsive web** — CSS at 390px. Cypress: `cy.viewport('iphone-x')`. Valid, cheap, Chromium/Firefox only.\n2. **Mobile web on real iOS Safari** — WebKit + iOS chrome + real touch. Cypress: not first-class. Playwright WebKit or Sauce Safari.\n3. **Native app** — `Bizlevate.app` / Play Store APK. **Appium** (or Espresso/XCUITest). Cypress has no WebView to live inside unless you wrap a web app in a browser.\n\nIf Bizlevate ships (3), Cypress skill does not transfer as \"the same tests.\" You write new native tests. Web CT/E2E still protect the web.\n\n## What Cypress *can* do for (1)\n\n```js\ndescribe('leave form on mobile width', () => {\n  beforeEach(() => {\n    cy.viewport('iphone-x');\n    cy.visit('/leave/new');\n  });\n  it('does not clip the submit bar', () => {\n    cy.get('[data-cy=submit]').should('be.visible');\n  });\n});\n```\n\nOptional: `cypress-real-events` for `realTouch`-ish behavior — still not iOS.\n\n## Appium is the native answer\n\nAppium drives UIAutomator2 / XCUITest over WebDriver. That is the same *external driver* philosophy as Selenium, which is why native mobile never fit Cypress's in-page model (Part 0.8). A complete automation résumé for Bizlevate is often **Cypress (web) + Appium (native)**, or Playwright web + Appium.\n\n## Versus Playwright and Selenium\n\n| Need | Cypress | Playwright | Selenium/Appium |\n|---|---|---|---|\n| Responsive web | Viewport | Viewport + devices | Chrome options |\n| iOS Safari engine | No first-class WebKit | WebKit yes | SafariDriver / cloud |\n| Native iOS/Android | No — use **Appium** | No — use **Appium** | **Appium** |\n\nInterview line: \"Cypress does not test native apps. Viewport is responsive web. Real iOS web needs WebKit elsewhere. Native is Appium.\"",
  "advantages": [
    "9.17 Mobile Testing — Real Limitations — Product will ask why the native app has no Cypress tests after a successful web rollout."
  ],
  "limitations": [
    "9.17 Mobile Testing — Real Limitations is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
