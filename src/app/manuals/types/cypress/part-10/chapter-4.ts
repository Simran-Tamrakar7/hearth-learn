import type { ChapterRecord } from "../../../types";

/** 10.4 Headless vs Headed Runs, Viewport/Device Testing */
export const chapter = {
  "id": "cy-10-4-headless-vs-headed-runs-viewport-device-testing",
  "title": "10.4 Headless vs Headed Runs, Viewport/Device Testing",
  "minutes": 26,
  "level": "advanced",
  "phase": "Part 10 · Test Organization & Execution",
  "partName": "Part 10 · Test Organization & Execution",
  "overviewText": "cypress open is headed and interactive. cypress run is headless by default (no GUI, suitable for CI) and can be --headed. Viewport comes from config viewportWidth/Height, cy.viewport(), or presets like iphone-x — it resizes the app iframe, it does not start iOS. Pair with 9.9/9.17: Chrome headless is not Safari, and a phone preset is not a device lab.",
  "why": "People debug in open mode at 1500px then CI fails at the default 1280×720, or they think --headed on Actions gives them the Cypress App. Those are different surfaces.",
  "when": "Writing the first CI job, reproducing a CI-only layout bug, and adding a mobile-width spec.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "Dashboard cards wrap in CI but not on your laptop. You need a headed local run at the CI viewport, then a mobile-width check for the leave form.",
    "pass": "You match viewportWidth/Height to CI, reproduce with cypress run --headed, and add cy.viewport('iphone-x') only for responsive specs — without claiming native mobile.",
    "fail": "You only use cypress open at fullscreen and you set headed: true in CI expecting the App UI Mode."
  },
  "tools": [],
  "customSummary": "- cypress open = App GUI. cypress run = CI runner; default headless; --headed is still not the App.\n- Pin viewportWidth/Height in config so local run matches CI.\n- cy.viewport() per spec for responsive cases; presets ≠ real devices (9.17).\n- Headless Chrome ≠ headed Chrome for a few CSS/video bugs — reproduce with --headed before blaming Cypress.\n- Playwright: --headed / devices project. Selenium: ChromeOptions headless.",
  "contentMarkdown": "## The three ways you see a browser\n\n```bash\nnpx cypress open                 # Cypress App + visible browser (UI Mode, 9.11)\nnpx cypress run                  # headless, CI default\nnpx cypress run --headed         # visible browser, no App sidebar, still \"run\" semantics (videos, retries runMode)\n```\n\nCI should call `cypress run` (or `cypress-io/github-action`, which does). `cypress open` on a runner is wrong (no display, or a stuck GUI).\n\nElectron vs Chrome: `cypress run` without `--browser` uses Electron. If you develop in Chrome and CI uses Electron, you will \"see\" differences. Pin `--browser chrome` in CI to match.\n\n## Viewport is config, then command\n\n```js\nexport default defineConfig({\n  viewportWidth: 1280,\n  viewportHeight: 720,\n});\n\ncy.viewport(390, 844);\ncy.viewport('iphone-x');\n```\n\nIf your laptop App is stretched to 1800px, you are not running the same test as CI. Reproduce CI with `npx cypress run --headed --browser chrome` at the config viewport.\n\nDevice presets change **size** (and sometimes user-agent in some tools — in Cypress, treat it as size). They do not load WebKit (9.9).\n\n## Headless quirks worth knowing\n\n- Headless Chrome is close to headed Chromium; remaining gaps are usually video codecs, focus, or `window.screen`.\n- Firefox headed vs headless can differ more than Chrome.\n- `video: true` (11.8) costs CPU in headless CI — a flake source if the runner is tiny (12.4).\n\n## Versus Playwright and Selenium\n\nPlaywright: `headless: true` default in CI; `devices['iPhone 13']` sets viewport **and** user-agent; WebKit still available. Selenium 4: `--headless=new`. Cypress: be explicit about browser name + viewport numbers.\n\nInterview line: \"`cypress run` is headless CI; `--headed` is not UI Mode. I pin viewport in config. `iphone-x` is a size, not a phone.\"",
  "advantages": [
    "10.4 Headless vs Headed Runs, Viewport/Device Testing — People debug in open mode at 1500px then CI fails at the default 1280×720, or they think --headed on Actions gives them the Cypress App."
  ],
  "limitations": [
    "10.4 Headless vs Headed Runs, Viewport/Device Testing is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
