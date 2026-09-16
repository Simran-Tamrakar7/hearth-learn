import type { ChapterRecord } from "../../../types";

/** 9.6 Visual Regression Testing */
export const chapter = {
  "id": "cy-9-6-visual-regression-testing",
  "title": "9.6 Visual Regression Testing",
  "minutes": 28,
  "level": "advanced",
  "phase": "Part 9 · Advanced Topics",
  "partName": "Part 9 · Advanced Topics",
  "overviewText": "Cypress has no built-in visual diff API. cy.screenshot() captures pixels; it does not compare them. Visual regression is always a plugin (cypress-image-snapshot and similar) or a paid SaaS (Percy, Applitools, Chromatic). Playwright ships expect(page).to_have_screenshot() / toHaveScreenshot() as first-party. Selenium has nothing built-in either.",
  "why": "Dashboard and payslip layout regressions are real HRM bugs. Claiming 'Cypress does visual testing' in an interview is false unless you name the add-on. Knowing the free vs paid split prevents a surprise procurement conversation.",
  "when": "When pixel layout of a page or component is a requirement, or when a designer asks for screenshot diffs in PRs. Not as a substitute for role/permission assertions.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "A CSS change shifts the payroll summary cards by 8px. You want CI to fail before employees see a broken dashboard.",
    "pass": "You say Cypress has no built-in visual matcher, add cypress-image-snapshot or Percy, commit baselines, and review diffs. You do not treat cy.screenshot() as a comparison.",
    "fail": "You call cy.screenshot() and assume the next run will fail on pixel drift, or you say Cypress includes Playwright-style toHaveScreenshot."
  },
  "tools": [],
  "customSummary": "- No first-party visual matcher in Cypress — unlike Playwright's toHaveScreenshot.\n- cy.screenshot() is capture (and CI artifact), not regression.\n- Free path: cypress-image-snapshot (pixel diff, baselines in git).\n- Paid path: Percy / Applitools / Chromatic — noise-tolerant diff, hosted review.\n- Selenium: also plugin/SaaS territory. Visual tests are flake magnets (fonts, anti-aliasing, animation) — stabilize viewport, fonts, and data first.",
  "contentMarkdown": "## The interview trap\n\n\"Does Cypress support visual testing?\" Accurate answer: **not built-in.** `cy.screenshot()` writes a PNG. Comparison, thresholding, and baseline management live in a plugin or a vendor. Playwright's `toHaveScreenshot()` is the contrast case — first-party, snapshot directory, threshold options. Selenium matches Cypress here: bring your own.\n\n## Free plugin path\n\n```bash\nnpm install -D cypress-image-snapshot\n```\n\n```js\n// cypress/support/e2e.ts\nimport { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';\naddMatchImageSnapshotCommand({\n  failureThreshold: 0.02,\n  failureThresholdType: 'percent',\n});\n\n// spec\ncy.visit('/payroll/summary');\ncy.get('[data-cy=summary-cards]').matchImageSnapshot('payroll-summary-cards');\n```\n\nFirst run writes a baseline (commit it). Later runs fail when pixels move beyond the threshold. Same git-baseline discipline as Playwright screenshots.\n\n## Paid SaaS path\n\nPercy, Applitools, Chromatic (for component-centric UIs) add: hosted baselines, PR comments with diffs, reviewers who are not engineers, and algorithms that ignore anti-aliasing / sub-pixel font noise that wrecks raw pixel diffs across CI machines vs laptops.\n\n```js\ncy.visit('/dashboard');\ncy.percySnapshot('HRM dashboard — manager');\n```\n\nWorth paying once visual review is an organizational workflow, not once you have three pages.\n\n## Why visual tests flake\n\n- Animations and spinners — wait for idle, or disable motion in test env.\n- Dynamic data (clock, \"3 pending requests\") — freeze time (`cy.clock`) and stub APIs.\n- Fonts not loaded — wait on `document.fonts.ready` via `cy.document()`.\n- Viewport and OS DPI differences — pin `viewportWidth/Height`; prefer Docker `cypress/browsers` for CI parity (11.2).\n\n## Versus Playwright and Selenium\n\n| | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Capture | `cy.screenshot()` | `page.screenshot()` | `TakesScreenshot` |\n| Compare | Plugin/SaaS only | Built-in snapshot matcher | Plugin/SaaS only |\n| Component visual | CT + plugin/Chromatic | CT/screenshot | N/A |\n\nInterview line: \"Cypress has no built-in visual regression. I screenshot for artifacts; I compare with a plugin or Percy. Playwright is the one with a first-party matcher.\"",
  "advantages": [
    "9.6 Visual Regression Testing — Dashboard and payslip layout regressions are real HRM bugs."
  ],
  "limitations": [
    "9.6 Visual Regression Testing is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
