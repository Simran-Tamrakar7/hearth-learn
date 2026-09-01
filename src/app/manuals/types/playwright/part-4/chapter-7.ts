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
  "contentMarkdown": "## Cross-Browser Testing\n\nPlaywright ships three browser engines: **Chromium**, **Firefox**, and **WebKit** (Safari's engine). A test that passes in Chromium may fail in Firefox due to CSS differences, missing APIs, or timing variations. Run critical paths across all three.\n\n## Browser Selection via CLI\n\n```bash\npytest --browser chromium     # default\npytest --browser firefox\npytest --browser webkit\npytest --browser chromium --browser firefox --browser webkit  # all three\n```\n\nWhen multiple browsers are specified, pytest parametrizes each test across them — tripling the test count.\n\n## Parametrizing Browser in conftest.py\n\nFor finer control, override the browser fixture:\n\n```python\nimport pytest\n\n@pytest.fixture(params=[\"chromium\", \"firefox\", \"webkit\"], scope=\"session\")\ndef browser_name(request):\n    return request.param\n```\n\nMark browser-specific tests:\n\n```python\n@pytest.mark.skip_browser(\"webkit\")  # WebKit lacks a specific API\ndef test_file_upload(page):\n    page.set_input_files(\"input[type='file']\", \"fixtures/doc.pdf\")\n```\n\n## Device Descriptors\n\nMobile testing uses preset device profiles with viewport, user agent, and touch settings:\n\n```python\nimport pytest\n\n@pytest.fixture\ndef mobile_context(browser, base_url):\n    iphone = browser.new_context(**pytest.playwright.devices[\"iPhone 13\"])\n    yield iphone\n    iphone.close()\n\ndef test_mobile_navigation(mobile_context):\n    page = mobile_context.new_page()\n    page.goto(\"/\")\n    expect(page.get_by_role(\"navigation\")).to_be_visible()\n```\n\nBuilt-in devices include iPhone, Pixel, iPad, and Galaxy profiles. List them:\n\n```python\nfrom playwright.sync_api import sync_playwright\nwith sync_playwright() as p:\n    print(p.devices.keys())\n```\n\n## Custom Device Profiles\n\n```python\n@pytest.fixture\ndef tablet_context(browser):\n    context = browser.new_context(\n        viewport={\"width\": 1024, \"height\": 768},\n        is_mobile=True,\n        has_touch=True,\n        user_agent=\"Mozilla/5.0 (iPad; ...)\",\n    )\n    yield context\n    context.close()\n```\n\n## Geolocation and Permissions\n\nTest location-aware features by granting permissions and setting coordinates:\n\n```python\ndef test_nearby_stores(page, context):\n    context.grant_permissions([\"geolocation\"])\n    context.set_geolocation({\"latitude\": 27.7172, \"longitude\": 85.3240})  # Kathmandu\n    page.goto(\"/stores/nearby\")\n    expect(page.get_by_text(\"Showing stores near you\")).to_be_visible()\n```\n\nOther grantable permissions: `notifications`, `camera`, `microphone`, `clipboard-read`.\n\n```python\ncontext.grant_permissions([\"notifications\"])\ncontext.grant_permissions([\"clipboard-read\", \"clipboard-write\"])\n```\n\n## Locale and Timezone\n\n```python\n@pytest.fixture\ndef browser_context_args(browser_context_args):\n    return {\n        **browser_context_args,\n        \"locale\": \"ne-NP\",\n        \"timezone_id\": \"Asia/Kathmandu\",\n    }\n```\n\nVerify date formatting and translated strings match the target locale.\n\n## CI Strategy\n\nRunning all tests × three browsers × two devices is expensive. A pragmatic approach:\n\n| Suite | Browsers | Devices | When |\n|-------|----------|---------|------|\n| Smoke | Chromium | Desktop | Every PR |\n| Regression | Chromium + Firefox | Desktop | Nightly |\n| Full matrix | All three | Desktop + mobile | Pre-release |\n\n```bash\n# PR check — fast\npytest -m smoke --browser chromium\n\n# Nightly — broader\npytest -m regression --browser chromium --browser firefox\n\n# Release candidate\npytest --browser chromium --browser firefox --browser webkit\n```\n\n## Key Takeaways\n\n- Pass `--browser firefox` or `--browser webkit` to test across engines.\n- Use device descriptors for mobile and tablet viewports.\n- Grant geolocation and other permissions via `context.grant_permissions()`.\n- Run the full browser matrix pre-release; stick to Chromium for fast PR feedback.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
