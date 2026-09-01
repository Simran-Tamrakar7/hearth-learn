import type { ChapterRecord } from "../../../types";

/** 23. Cross-browser & Cross-device Testing */
export const chapter = {
  "id": "pw-4-cross",
  "title": "23. Cross-browser & Cross-device Testing",
  "minutes": 40,
  "level": "advanced",
  "phase": "Part 4 · Advanced Techniques",
  "partName": "Part 4 · Advanced Techniques",
  "overviewText": "Cross-browser testing runs the same Playwright test suite against Chromium, Firefox, and WebKit — the three engines Playwright supports natively. pytest --browser chromium (or firefox, webkit) selects the engine for the entire session. A CI matrix job running the same suite once per browser in parallel catches engine-specific rendering bugs, CSS differences, and JavaScript compatibility issues before real users hit them. Mobile emulation uses Playwright's device descriptor presets (playwright.devices['iPhone 13']) unpacked into browser.new_context(**device) to set viewport, user-agent, touch support, and device pixel ratio. Custom viewport and geolocation settings work without a full device preset, but geolocation requires permissions=['geolocation'] or the page's location request is denied.",
  "why": "A layout that renders correctly in Chrome may break in Safari due to WebKit-specific CSS handling. A JavaScript API available in Chromium may be missing in Firefox. Testing only in Chrome means shipping bugs to 30–40% of users on other browsers. Mobile emulation catches responsive layout failures and touch-interaction bugs that desktop-only testing misses entirely — especially for HRMS and field-service apps used on phones.",
  "when": "Run the full suite against all three browsers in CI at least nightly; smoke subset against all three on every PR. Add mobile emulation tests for any page expected to be used on phones or tablets. Use device presets for realistic mobile testing; custom viewport for specific breakpoint testing. Always set permissions=['geolocation'] when testing location-aware features.",
  "practical": {
    "app": "HRMS — Leave request form",
    "scenario": "The leave request date picker renders correctly in Chromium but overflows its container in WebKit (Safari engine). A CI matrix running pytest --browser webkit catches the overflow before iOS users report it. Separately, the mobile-emulated test on iPhone 13 reveals the submit button is below the fold and requires scrolling — invisible in desktop tests.",
    "pass": "CI matrix runs smoke tests against chromium, firefox, and webkit in parallel; iPhone 13 emulation test confirms submit button is reachable.",
    "fail": "All tests run only against default Chromium; Safari layout bug and mobile usability issue ship to production."
  },
  "advantages": [
    "Three browser engines from one test codebase — no separate WebDriver setup",
    "CI matrix parallelism runs all browsers concurrently",
    "Device presets provide realistic mobile viewport, touch, and user-agent",
    "Geolocation emulation tests location-aware features without physical GPS",
    "Same locators and assertions work across all browsers — no browser-specific code"
  ],
  "limitations": [
    "Triples CI execution time (or cost) if not parallelized via matrix jobs",
    "WebKit on Linux is close but not identical to real Safari on macOS/iOS",
    "Device emulation is not a substitute for real device testing",
    "Some browser-specific bugs only appear on specific OS versions",
    "Geolocation requires explicit permissions — easy to forget"
  ],
  "tools": [
    {
      "name": "pytest-playwright --browser",
      "sub": "Cross-browser CLI",
      "url": "https://playwright.dev/python/docs/browsers",
      "desc": "The pytest-playwright plugin adds a --browser CLI flag that selects which browser engine to launch for the test session. Supported values are chromium (default, covers Chrome and Edge), firefox, and webkit (Safari engine). In CI, a matrix job runs the same test command with different --browser values in parallel, catching engine-specific regressions without maintaining separate test suites.",
      "adv": [
        "Single flag switches browser engine — no code changes needed",
        "All three engines installed via playwright install",
        "CI matrix pattern is well-documented for GitHub Actions, GitLab CI",
        "Same test code, same locators, same assertions across engines"
      ],
      "lim": [
        "One browser per test session — cannot compare browsers side-by-side in one test",
        "WebKit on Linux differs from Safari on Apple hardware",
        "Triples run time if browsers execute sequentially instead of in parallel matrix",
        "Some engine-specific workarounds may eventually be needed for edge cases"
      ],
      "steps": [
        {
          "t": "Step 1 — Run against each browser locally",
          "p": "Verify tests pass on all three engines:",
          "c": "pytest --browser chromium\npytest --browser firefox\npytest --browser webkit"
        },
        {
          "t": "Step 2 — Configure CI matrix",
          "p": "GitHub Actions example running browsers in parallel:",
          "c": "# .github/workflows/cross-browser.yml\nstrategy:\n  matrix:\n    browser: [chromium, firefox, webkit]\nsteps:\n  - run: pytest --browser ${{ matrix.browser }} -m smoke"
        }
      ]
    },
    {
      "name": "Device emulation",
      "sub": "Mobile viewport presets",
      "url": "https://playwright.dev/python/docs/emulation",
      "desc": "Playwright provides preset device descriptors via playwright.devices dictionary containing viewport size, user agent, device scale factor, and touch support for real devices like iPhone 13, Pixel 5, and iPad Pro. Unpack a preset into browser.new_context(**device) for realistic mobile testing. Custom viewport and geolocation can be set individually without a full preset. Geolocation emulation requires permissions=['geolocation'] in the context options.",
      "adv": [
        "Real device presets — viewport, user-agent, touch, pixel ratio in one line",
        "Custom viewport for testing specific responsive breakpoints",
        "Geolocation emulation for location-aware feature testing",
        "No physical device or cloud device farm needed for basic mobile testing"
      ],
      "lim": [
        "Emulation is not identical to real device behavior (touch inertia, OS keyboard)",
        "Device list changes between Playwright versions",
        "Geolocation without permissions silently does nothing",
        "Cannot emulate device-specific features (camera, biometrics)"
      ],
      "steps": [
        {
          "t": "Step 1 — Emulate iPhone 13",
          "p": "Use a device preset for mobile testing:",
          "c": "iphone = playwright.devices[\"iPhone 13\"]\ncontext = browser.new_context(**iphone)\npage = context.new_page()\npage.goto(\"https://app.example.com\")\nexpect(page.get_by_role(\"button\", name=\"Submit\")).to_be_visible()"
        },
        {
          "t": "Step 2 — Custom viewport and geolocation",
          "p": "Set individual properties without a full preset:",
          "c": "context = browser.new_context(\n    viewport={\"width\": 390, \"height\": 844},\n    geolocation={\"latitude\": 27.7172, \"longitude\": 85.3240},\n    permissions=[\"geolocation\"],\n)\npage = context.new_page()\npage.goto(\"https://app.example.com/nearby-offices\")\nexpect(page.get_by_text(\"Kathmandu Office\")).to_be_visible()"
        }
      ]
    }
  ],
  "contentMarkdown": "Running on Chromium, Firefox, WebKit pytest --browser chromium pytest --browser firefox pytest --browser webkit Or parametrized directly in code/config to run against all three in one CI pipeline run. --browser (pytest-playwright CLI flag) What it does: Selects which browser engine the test session launches.\n\n## Running on Chromium, Firefox, WebKit\n\nOr parametrized directly in code/config to run against all three in one CI pipeline run.\n\n--browser (pytest-playwright CLI flag)\n\nWhat it does: Selects which browser engine the test session launches.\n\nTypes/params: \"chromium\" (default), \"firefox\", \"webkit\".\n\nPointers: Running the full suite three times (once per browser) in CI catches engine-specific bugs before real users do — a common setup is a CI matrix job that runs the same suite once per browser value in parallel.\n\n```\npytest --browser chromium\npytest --browser firefox\npytest --browser webkit\n```\n\n## Mobile emulation (device descriptors, viewport, geolocation)\n\niphone = p.devices[\"iPhone 13\"] context = browser.new_context(**iphone) page = context.new_page()\n\n## page.goto(\"https://app.example.com\")\n\ncontext = browser.new_context(\n\nviewport={\"width\": 390, \"height\": 844},\n geolocation={\"latitude\": 27.7172, \"longitude\": 85.3240},\n permissions=[\"geolocation\"],\n\n)\n\nplaywright.devices[\"<device name>\"]\n\nWhat it does: A dictionary of preset settings (viewport, user-agent, touch support, device pixel ratio) for a named real device.\n\nTypes/params: String key matching a supported device name, e.g. \"iPhone 13\",\n\n\"Pixel 5\", \"iPad Pro 11\".\n\nPointers: Unpack it directly into new_context(**device_dict) — no need to set each property manually. Full list of supported devices is in Playwright's own source/docs since it's updated over time.\n\npermissions=...)\n\nWhat it does: Sets custom device-like properties without using a full preset.\n\nTypes/params:\n\nPointers: Forgetting permissions=[\"geolocation\"] is a common gotcha — setting geolocation alone does nothing if the page's geolocation request isn't permitted.\n\n```\n# Custom viewport and geolocation, without a full device descriptor\n\nbrowser.new_context(viewport=..., geolocation=...,\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
