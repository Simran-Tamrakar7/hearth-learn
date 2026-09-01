import type { ChapterRecord } from "../../../types";

/** Cross-browser Testing */
export const chapter = {
  "id": "tt-cross-browser-testing",
  "overlayNo": 37,
  "title": "Cross-browser Testing",
  "minutes": 20,
  "level": "intermediate",
  "phase": "Part 10 · Device, Platform & Security",
  "partName": "Part 10 · Device, Platform & Security",
  "overviewText": "Cross-browser testing verifies that an application renders and functions correctly across the different browsers real users actually use — Chrome, Firefox, Safari, Edge, and their various versions — checking specifically for browser-engine differences rather than device or screen-size differences (that's compatibility testing's broader scope, Chapter 19).",
  "why": "Different browsers use different rendering engines (Blink, Gecko, WebKit) with different levels of CSS and JavaScript support, and even the same engine can behave differently across versions — a flexbox layout that renders perfectly in Chrome can break in Safari, or a JavaScript feature can silently fail in an older browser version still used by a real portion of the audience. Without deliberate cross-browser testing, these gaps only surface as confusing, hard-to-reproduce bug reports from specific users.",
  "when": "Throughout development on any UI-facing feature, and definitely before release — checked against the specific browsers and versions the actual user base analytics show are actually in use, rather than testing exhaustively against every browser that has ever existed.",
  "practical": {
    "app": "HRMS Leave Calendar Widget (Revisited)",
    "scenario": "The same leave calendar widget from Chapter 19 is run through LambdaTest's automated grid across Chrome, Firefox, Safari, and Edge simultaneously, using the existing Playwright suite.",
    "pass": "A Safari-specific CSS adjustment resolves the misalignment, confirmed by re-running the same automated suite across all four browsers in parallel.",
    "fail": "The calendar's date-picker overlay renders correctly in Chrome, Firefox, and Edge, but is subtly misaligned in Safari specifically — a WebKit-specific CSS quirk that a single-browser local test run would never have surfaced."
  },
  "advantages": [
    "Covers real browser engines and versions without needing to install and maintain each one locally",
    "Existing Selenium/Playwright/Cypress suites can be reused directly against the cloud grid without rewriting",
    "Parallel execution across many browsers is dramatically faster than testing each one sequentially by hand",
    "Screenshot comparison makes visual, engine-specific rendering bugs immediately obvious"
  ],
  "limitations": [
    "Free tier limits test minutes, concurrent sessions, or browser combinations available",
    "Testing every possible browser/version combination is impractical — prioritization by analytics is essential",
    "Cloud-based execution can be slower than a local browser for quick iterative dev checks",
    "Doesn't cover mobile-specific browser quirks as deeply as dedicated mobile testing (Chapter 38)"
  ],
  "tools": [
    {
      "name": "LambdaTest",
      "sub": "Cloud Cross-Browser Testing Cloud & Real-Device Farm",
      "url": "https://lambdatest.com",
      "desc": "A cloud-based cross-browser testing platform offering real and emulated browsers across many OS/browser/version combinations, supporting both manual, live interactive testing and automated Selenium/Playwright/Cypress test execution across that same browser matrix.",
      "adv": [
        "Over 3000+ real browser and operating system combinations",
        "Automated visual regression and screenshot comparison across browsers",
        "Direct integration with Playwright, Cypress, and Selenium test runners",
        "Local tunnel testing (UnderPass) for localhost and staging environments"
      ],
      "lim": [
        "Free tier limits monthly live testing minutes and parallel executions"
      ],
      "steps": [
        {
          "t": "Step 1 — Configure Playwright project for LambdaTest cloud grid",
          "p": "Set capabilities and authentication credentials in playwright.config.ts.",
          "c": "const capabilities = {\n  'browserName': 'Safari',\n  'browserVersion': '17.0',\n  'LT:Options': {\n    'platform': 'macOS Sonoma',\n    'build': 'HRMS Build #104',\n    'user': process.env.LT_USERNAME,\n    'accessKey': process.env.LT_ACCESS_KEY\n  }\n};"
        },
        {
          "t": "Step 2 — Connect Playwright test to LambdaTest CDP endpoint",
          "p": "Execute tests remotely over secure websocket connection.",
          "c": "const browser = await chromium.connect({\n  wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`\n});"
        },
        {
          "t": "Step 3 — Run cross-browser visual snapshot comparisons",
          "p": "Capture rendered calendar component and assert pixel tolerance across WebKit and Blink.",
          "c": "await page.goto('/leave-calendar');\nawait expect(page).toHaveScreenshot('calendar-widget.png', { maxDiffPixelRatio: 0.01 });"
        },
        {
          "t": "Step 4 — Review cross-browser execution report in LambdaTest dashboard",
          "p": "Inspect video recordings, console logs, and network telemetry for Safari failures.",
          "c": "Report:\n- Chrome 122 (Win 11): PASS (1.2s)\n- Firefox 123 (macOS): PASS (1.4s)\n- Safari 17 (macOS): FAIL (WebKit CSS alignment offset detected -> Fixed in PR #88)"
        }
      ]
    }
  ],
  "contentMarkdown": "## Cloud Parallel Multi-Browser Automation\n\nExecute Playwright/Selenium suites simultaneously across Blink, Gecko, and WebKit cloud instances.\n\n```\nnpx playwright test --config=playwright.lambdatest.config.ts\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
