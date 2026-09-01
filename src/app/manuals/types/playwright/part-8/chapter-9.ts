import type { ChapterRecord } from "../../../types";

/** 60. Browser Extensions & Developer Tools */
export const chapter = {
  "id": "pw-8-extensions",
  "title": "60. Browser Extensions & Developer Tools",
  "minutes": 15,
  "level": "reference",
  "phase": "Part 8 · Resources",
  "partName": "Part 8 · Resources",
  "overviewText": "Browser extensions and built-in developer tools are the daily workbench for Playwright engineers — used to inspect elements, build locators, debug network requests, and validate accessibility before a single line of test code is written. Chrome and Firefox DevTools (Elements, Console, Network tabs) let you experiment with selectors, observe auto-waiting behaviour, and diagnose why a locator fails in CI but passes locally. Accessibility inspector extensions like axe DevTools pair directly with axe-core assertions in your Playwright test suite. Locator-picker extensions complement Playwright's own Codegen tool by letting you explore the DOM interactively. For a QA career, fluency with DevTools separates engineers who write brittle CSS selectors from those who build resilient role-based locators that survive UI refactors.",
  "why": "Playwright tests are only as stable as their locators, and locators are only as good as your understanding of the DOM. DevTools let you see the accessibility tree, test get_by_role queries in the console, and identify dynamic attributes before you commit a locator to code. When a test fails in CI, DevTools help you reproduce the failure state — inspect network waterfalls, check for race conditions, and verify element visibility. Accessibility extensions bridge manual inspection and automated axe-core checks, letting you catch WCAG violations during test authoring rather than in a separate audit cycle. Engineers who skip DevTools write tests blind and spend hours debugging locators that a five-minute Elements panel inspection would have prevented.",
  "when": "Open DevTools before writing any new locator — experiment with get_by_role, get_by_label, and get_by_test_id in the Console panel first. Use the Network tab when debugging tests that fail due to slow API responses or missing resources. Install axe DevTools when your team adopts accessibility testing with axe-core. Use Playwright Codegen for bootstrapping new test files, then refine locators in DevTools before committing. Keep DevTools docked during test development — not just during debugging.",
  "practical": {
    "app": "QA career — Writing stable locators for a redesigned checkout flow",
    "scenario": "The product team ships a checkout redesign. Your old CSS selectors (#btn-submit, .checkout-form > div:nth-child(3)) all break. Before rewriting tests, you open DevTools, inspect the new form's accessibility tree, and discover every interactive element has proper ARIA roles and labels. You rewrite locators using get_by_role and get_by_label — the new tests survive the next minor UI tweak without changes.",
    "pass": "Checkout tests pass on first CI run after the redesign. Developers notice your role-based locators and start adding data-testid attributes proactively.",
    "fail": "You copy old CSS selectors and add !important overrides. Tests pass locally but flake in CI due to timing differences. Three sprints later, another CSS change breaks the same tests again."
  },
  "advantages": [
    "DevTools are free, built into every browser Playwright controls",
    "Accessibility tree inspection leads to more resilient role-based locators",
    "Network tab diagnoses API-dependent test failures without adding logging",
    "axe DevTools bridges manual a11y review and automated axe-core assertions",
    "Codegen and locator-picker tools accelerate initial test scaffolding"
  ],
  "limitations": [
    "DevTools show the DOM at inspection time — dynamic content may differ during test execution",
    "Extensions can behave differently in headed vs headless Playwright runs",
    "axe DevTools is a manual scan — it does not replace automated axe-core in CI",
    "Over-reliance on Codegen produces verbose, brittle scripts that need manual refactoring",
    "DevTools skills are browser-specific — Firefox and Chrome panels differ slightly"
  ],
  "tools": [
    {
      "name": "Chrome / Firefox DevTools",
      "sub": "Built-in browser inspector",
      "url": "https://developer.chrome.com/docs/devtools",
      "desc": "The essential daily tool for every Playwright engineer. Elements panel shows the DOM and accessibility tree. Console lets you test Playwright-style queries: document.querySelector, $$('[role=button]'), and $x XPath expressions. Network panel reveals API calls, response times, and failed requests that cause test timeouts. Sources panel supports breakpoints for debugging JavaScript in the application under test. Playwright's headed mode (--headed) opens the same DevTools you use during manual exploration.",
      "adv": [
        "Free and always available — no installation beyond the browser",
        "Accessibility tree view directly informs get_by_role locator strategy",
        "Network waterfall explains timeout and race-condition failures",
        "Same tools work in Playwright headed mode during test debugging"
      ],
      "lim": [
        "Shows static snapshot — SPAs may render differently during Playwright auto-wait",
        "Console queries do not replicate Playwright's strict mode or frame traversal",
        "Performance profiling adds overhead — not for routine locator work",
        "Panel layout differs between Chrome and Firefox"
      ],
      "steps": [
        {
          "t": "Step 1 — Inspect accessibility tree before choosing a locator",
          "p": "In Elements panel, switch to Accessibility tab:",
          "c": "# Chrome DevTools > Elements > Accessibility\n# Check: role, name, states\n# Prefer: get_by_role('button', name='Submit')\n# Avoid: page.locator('.btn-primary.submit-btn')"
        },
        {
          "t": "Step 2 — Test locators in Console before writing test code",
          "p": "Verify element count and visibility:",
          "c": "// In DevTools Console:\n$$('[role=\"button\"]').length\n$$('[aria-label=\"Add to cart\"]')[0].click()\n// If count > 1, your locator is ambiguous — refine before coding"
        },
        {
          "t": "Step 3 — Use Network tab for API-dependent test failures",
          "p": "Run the test in headed mode with DevTools open:",
          "c": "pytest --headed --slowmo 1000 tests/test_checkout.py\n# Watch Network tab: identify slow/failed API calls causing timeout"
        }
      ]
    },
    {
      "name": "axe DevTools Browser Extension",
      "sub": "Deque · accessibility scanning",
      "url": "https://www.deque.com/axe/devtools",
      "desc": "A browser extension from Deque Systems that runs axe-core accessibility scans on any page with one click. Shows WCAG violations with element highlights and remediation guidance. Pairs directly with @axe-core/playwright in your test suite — scan manually during test authoring to know what violations to assert, then automate with axe-core in CI. The free version covers most WCAG 2.1 AA rules; the pro version adds intelligent guided tests.",
      "adv": [
        "Same engine (axe-core) used in Playwright automated tests",
        "Instant visual feedback on accessibility violations during test authoring",
        "Teaches WCAG rules with remediation guidance per violation",
        "Free tier sufficient for most QA team needs"
      ],
      "lim": [
        "Manual scan — does not run automatically in CI without axe-core integration",
        "Full-page scans can be slow on complex SPAs",
        "Pro features require paid license",
        "Extension results may differ slightly from programmatic axe-core due to timing"
      ],
      "steps": [
        {
          "t": "Step 1 — Install axe DevTools and scan the page under test",
          "p": "Before writing a11y assertions, scan manually:",
          "c": "# Install: chrome.google.com/webstore (search axe DevTools)\n# Open page > axe DevTools > Scan ALL of my page\n# Note violations to assert in Playwright:"
        },
        {
          "t": "Step 2 — Mirror manual findings in Playwright axe-core tests",
          "p": "Automate the violations you found manually:",
          "c": "from axe_playwright_python.sync_playwright import Axe\n\ndef test_homepage_accessibility(page):\n    page.goto('/')\n    axe = Axe()\n    results = axe.run(page)\n    assert results.violations_count == 0"
        }
      ]
    },
    {
      "name": "Playwright Codegen",
      "sub": "Built-in locator recorder",
      "url": "https://playwright.dev/python/docs/codegen",
      "desc": "Playwright's built-in code generator records your browser interactions and outputs Python test code with locators. Run via playwright codegen <url> to open a browser and Inspector side-by-side. Every click, fill, and navigation generates Playwright API calls. Use Codegen to bootstrap new test files quickly, then refactor the output — replace verbose locators with role-based alternatives identified in DevTools, extract page objects, and add assertions Codegen does not generate.",
      "adv": [
        "Built into Playwright — no separate extension to install",
        "Generates Python code with correct Playwright API syntax",
        "Shows locator picker with multiple strategies (role, text, CSS)",
        "Fastest way to scaffold a new test file from scratch"
      ],
      "lim": [
        "Output is verbose and needs refactoring before production use",
        "Does not generate assertions — only actions",
        "Recorded locators may be brittle CSS selectors, not role-based",
        "No fixture or POM structure — flat script output"
      ],
      "steps": [
        {
          "t": "Step 1 — Record a flow with Codegen",
          "p": "Generate initial test code, then refactor:",
          "c": "playwright codegen https://your-app.example.com/login\n# Perform login flow in browser\n# Copy generated Python to tests/test_login.py"
        },
        {
          "t": "Step 2 — Refactor Codegen output into maintainable tests",
          "p": "Replace CSS locators, add assertions, extract page objects:",
          "c": "# Before (Codegen output):\n# page.locator('#username').fill('admin')\n\n# After (refactored):\n# login_page = LoginPage(page)\n# login_page.login('admin', 'password')\n# expect(page).to_have_url('/dashboard')"
        }
      ]
    },
    {
      "name": "Locator-Picker Extensions",
      "sub": "Third-party selector tools",
      "url": "https://playwright.dev/python/docs/locators",
      "desc": "Third-party browser extensions (SelectorHub, ChroPath, and similar) generate CSS and XPath selectors from clicked elements. These complement — but do not replace — Playwright's built-in locator strategies and Codegen. Use them to explore the DOM and understand element structure, then translate findings into Playwright's recommended get_by_role, get_by_label, or get_by_test_id locators. Avoid copying raw XPath from extensions directly into tests.",
      "adv": [
        "Quick CSS/XPath generation for DOM exploration",
        "Helps understand complex DOM structures before choosing a locator strategy",
        "Some extensions highlight all matching elements for ambiguity detection"
      ],
      "lim": [
        "Encourages brittle CSS/XPath selectors — contradicts Playwright best practices",
        "Generated selectors break on minor UI changes",
        "No awareness of Playwright's auto-waiting or strict mode",
        "Playwright Codegen and DevTools accessibility tree are generally sufficient"
      ],
      "steps": [
        {
          "t": "Step 1 — Use picker extensions for exploration only",
          "p": "Generate a selector, then translate to Playwright best practice:",
          "c": "# Extension generates: div.checkout-form > button:nth-child(3)\n# DevTools accessibility tree shows: role=button, name=\"Place Order\"\n# Playwright locator: page.get_by_role('button', name='Place Order')"
        }
      ]
    }
  ],
  "contentMarkdown": "## 60. Browser Extensions & Developer Tools\n\nThe right browser tools make writing and debugging Playwright tests faster.\n\n### Accessibility testing\n\n- **axe DevTools** (Deque) — run accessibility scans in-browser; pairs with `axe-playwright-python` for automated a11y checks in CI.\n\n### Built-in DevTools\n\n- **Chrome DevTools** — inspect elements, network tab, console, and performance. Essential for writing locators and understanding why a test fails.\n- **Playwright Inspector** — launched via `PWDEBUG=1 pytest` or `--headed --slowmo=500`; step through tests interactively.\n\n### Locator discovery workflow\n\n1. Open app in browser → DevTools → inspect element\n2. Note role, label, text, or test-id\n3. Translate to Playwright: `page.get_by_role(\"button\", name=\"Submit\")`\n4. Verify in Playwright Inspector before committing to the test",
  "exercises": [],
  "resourceLinks": [
    {
      "title": "axe DevTools Browser Extension",
      "url": "https://www.deque.com/axe/devtools/",
      "description": "In-browser accessibility scanning — pairs with axe-playwright for CI."
    },
    {
      "title": "Chrome DevTools Documentation",
      "url": "https://developer.chrome.com/docs/devtools/",
      "description": "Official guide to Elements, Network, Console, and Performance panels."
    },
    {
      "title": "Playwright Inspector",
      "url": "https://playwright.dev/python/docs/debug",
      "description": "Interactive test debugging — step through, pick locators, edit live."
    },
    {
      "title": "axe-core (open source engine)",
      "url": "https://github.com/dequelabs/axe-core",
      "description": "The accessibility engine behind axe DevTools and axe-playwright."
    },
    {
      "title": "Playwright Trace Viewer",
      "url": "https://trace.playwright.dev/",
      "description": "Web-based trace inspector — open CI failure traces without local setup."
    }
  ],
  "steps": [],
  "learn": []
} as ChapterRecord;
