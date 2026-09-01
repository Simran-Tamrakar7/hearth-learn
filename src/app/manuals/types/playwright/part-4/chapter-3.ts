import type { ChapterRecord } from "../../../types";

/** 19. Visual & Accessibility Testing */
export const chapter = {
  "id": "pw-4-visual",
  "title": "19. Visual & Accessibility Testing",
  "minutes": 45,
  "level": "advanced",
  "phase": "Part 4 · Advanced Techniques",
  "partName": "Part 4 · Advanced Techniques",
  "overviewText": "Visual testing compares screenshots of the current page against saved baseline images — expect(page).to_have_screenshot('homepage.png') fails if pixels differ beyond a tolerance threshold. The first run creates the baseline; subsequent runs compare against it. Baselines must be committed to version control and regenerated deliberately when UI changes are intentional. Dynamic content (timestamps, ads, avatars) causes false-positive failures unless masked with the mask parameter or stabilized via API mocking (Chapter 17). Accessibility testing integrates axe-core via axe-playwright-python: Axe().run(page) scans the DOM for violations (missing alt text, poor color contrast, missing ARIA labels) and returns a report triaged by impact level (critical, serious, moderate, minor).",
  "why": "Functional tests verify that a button click navigates to the right page — they do not catch that the page layout broke, colors shifted, or text overflows its container. Visual regression catches CSS changes, font loading failures, and responsive layout breaks that assertion-based tests miss entirely. Accessibility violations block real users — especially in healthcare and finance where compliance requirements (WCAG, ADA, Section 508) make a11y testing a legal obligation, not just best practice.",
  "when": "Add screenshot comparison for pages with stable layouts after major CSS or component library upgrades. Run axe scans on every page with user-facing forms or navigation — critical and serious violations should block release. Mask dynamic elements before the first baseline capture, not after the first false failure. Regenerate baselines in a dedicated PR, never by blindly accepting failures.",
  "practical": {
    "app": "HRMS — Dashboard and login page",
    "scenario": "A CSS refactor changes dashboard card spacing from 16px to 24px. Functional tests still pass — all buttons work, data loads. A visual test fails because the screenshot diff shows shifted cards. The team reviews the diff, confirms the change is intentional, and regenerates the baseline. Separately, an axe scan catches that the new date-picker lacks an aria-label — a critical violation blocking keyboard users.",
    "pass": "expect(page).to_have_screenshot('dashboard.png', mask=[page.locator('.timestamp')]) — stable comparison; axe scan returns zero critical violations.",
    "fail": "No visual tests — spacing regression ships to production; no axe scan — form is unusable for screen reader users."
  },
  "advantages": [
    "Catches visual regressions that functional assertions cannot detect",
    "Screenshot baselines provide pixel-level evidence of UI changes in PR reviews",
    "axe-core covers dozens of WCAG rules automatically in seconds",
    "mask parameter excludes dynamic content for stable comparisons",
    "Accessibility violations triaged by impact — focus on what blocks real users"
  ],
  "limitations": [
    "Visual tests are brittle across OS/browser rendering differences — run in consistent CI environment",
    "Baselines require deliberate regeneration — blind acceptance hides real regressions",
    "axe-core catches automated rules only — manual keyboard testing still needed for full WCAG",
    "Screenshot storage grows with suite size — manage baseline images in version control carefully",
    "Dynamic SPAs need API mocking or masking before visual tests are reliable"
  ],
  "tools": [
    {
      "name": "expect().to_have_screenshot()",
      "sub": "Visual regression",
      "url": "https://playwright.dev/python/docs/test-snapshots",
      "desc": "Playwright's built-in visual comparison assertion captures a screenshot of the page or element and compares it against a saved baseline image. Accepts optional max_diff_pixels for tolerance and mask to exclude dynamic regions from comparison. Baseline images are stored alongside tests and must be committed to version control. The first run creates the baseline; subsequent runs diff against it and fail on mismatch.",
      "adv": [
        "Built into Playwright — no external visual testing service needed",
        "Element-level screenshots via locator.to_have_screenshot() for component testing",
        "mask parameter excludes timestamps, ads, and avatars from comparison",
        "max_diff_pixels tolerance handles anti-aliasing differences across environments"
      ],
      "lim": [
        "Rendering differs across OS and browser versions — CI must use consistent environment",
        "First run creates baseline with nothing to compare — must be intentional",
        "Large pages produce large baseline files",
        "Does not replace human judgment for subjective design quality"
      ],
      "steps": [
        {
          "t": "Step 1 — Capture a full-page baseline",
          "p": "First run creates the reference screenshot:",
          "c": "def test_homepage_visual(page):\n    page.goto(\"https://app.example.com\")\n    expect(page).to_have_screenshot(\"homepage.png\")"
        },
        {
          "t": "Step 2 — Mask dynamic content",
          "p": "Exclude elements that change every run:",
          "c": "def test_dashboard_visual(page):\n    page.goto(\"https://app.example.com/dashboard\")\n    expect(page).to_have_screenshot(\"dashboard.png\", mask=[\n        page.locator(\".timestamp\"),\n        page.locator(\".ad-banner\"),\n    ])"
        },
        {
          "t": "Step 3 — Update baselines after intentional changes",
          "p": "Regenerate when UI change is confirmed:",
          "c": "pytest --update-snapshots test_dashboard_visual.py"
        }
      ]
    },
    {
      "name": "axe-playwright-python",
      "sub": "Accessibility scanning",
      "url": "https://github.com/nickcolley/axe-playwright-python",
      "desc": "axe-playwright-python integrates the industry-standard axe-core accessibility engine with Playwright. Axe().run(page) scans the current page DOM against WCAG 2.x rules and returns violations grouped by impact level (critical, serious, moderate, minor). Each violation includes the rule ID, description, and target selectors for the failing elements. assert len(results.violations) == 0 with results.generate_report() produces a human-readable failure message.",
      "adv": [
        "Industry-standard axe-core ruleset — same engine used by Chrome DevTools",
        "Runs in seconds against any Playwright page",
        "Violations include CSS selectors for precise element identification",
        "Impact-level triage focuses fixes on what blocks real users"
      ],
      "lim": [
        "Automated rules cover ~30-40% of WCAG criteria — manual testing still required",
        "Does not test keyboard navigation flow — only static DOM analysis",
        "Dynamic content loaded after scan may be missed",
        "False positives possible on custom components with non-standard ARIA"
      ],
      "steps": [
        {
          "t": "Step 1 — Install and run basic scan",
          "p": "Scan a page for accessibility violations:",
          "c": "pip install axe-playwright-python\n\nfrom axe_playwright_python.sync_playwright import Axe\n\ndef test_homepage_accessibility(page):\n    page.goto(\"https://app.example.com\")\n    axe = Axe()\n    results = axe.run(page)\n    assert len(results.violations) == 0, results.generate_report()"
        },
        {
          "t": "Step 2 — Triage by impact level",
          "p": "Filter to critical and serious violations first:",
          "c": "def test_login_page_a11y(page):\n    page.goto(\"https://app.example.com/login\")\n    results = Axe().run(page)\n    critical = [v for v in results.violations if v.impact in (\"critical\", \"serious\")]\n    assert len(critical) == 0, f\"Critical a11y violations: {[v.id for v in critical]}\""
        }
      ]
    }
  ],
  "contentMarkdown": "Screenshot comparison expect(page).to_have_screenshot(\"homepage.png\") expect(page).to_have_screenshot(name, max_diff_pixels=..., mask=...) What it does: Compares a screenshot of the current page (or element) against a saved baseline image; fails if they differ beyond a tolerance threshold. Types/params: ● name (string, optional) — filename for the baseline image; auto-generated from the test name \n\n## expect(page).to_have_screenshot(\"homepage.png\")\n\nmask=...)\n\nWhat it does: Compares a screenshot of the current page (or element) against a saved baseline image; fails if they differ beyond a tolerance threshold.\n\nTypes/params:\n\n(see dynamic content handling below)\n\nPointers: The first run creates the baseline image (nothing to compare against yet) — subsequent runs compare against it. Baselines need to be committed to version control and regenerated deliberately when a UI change is intentional, not just whenever a test fails.\n\n```\nexpect(page).to_have_screenshot(name, max_diff_pixels=...,\n```\n\n## Handling dynamic content in visual diffs\n\n])\n\nPointers: Timestamps, ads, and other constantly-changing content will cause false-positive failures on every single run unless masked out or otherwise stabilized (e.g., mocking the API that provides the timestamp, per Chapter 17, so it's always the same value).\n\n```\nexpect(page).to_have_screenshot(\"dashboard.png\", mask=[\n    page.locator(\".timestamp\"),\n    page.locator(\".ad-banner\"),\n```\n\n## Integrating axe-core for accessibility checks\n\naxe = Axe() results = axe.run(page)\n\n```\n# pip install axe-playwright-python\nfrom axe_playwright_python.sync_playwright import Axe\n\nassert len(results.violations_count) == 0, results.generate_report()\n```\n\n## Axe().run(page)\n\nWhat it does: Scans the current page's DOM for accessibility violations using the axe-core ruleset (missing alt text, poor color contrast, missing ARIA labels, etc.).\n\nTypes/params:\n\n(dict to include/exclude specific rule sets)\n\nPointers: Increasingly a compliance requirement, not just best practice — especially relevant for healthcare/finance-adjacent apps (tying back to Part 0's industry list).\n\n## A typical violation object includes: id (the rule that failed, e.g. \"color-contrast\"),\n\nimpact (\"minor\", \"moderate\", \"serious\", \"critical\"), description, and\n\nnodes (the specific HTML elements that failed, with a target selector for each).\n\nPointers: Triage by impact level first — \"critical\" and \"serious\" violations (often things like missing form labels or unusable keyboard navigation) block real users from completing tasks and deserve priority over \"minor\" cosmetic issues.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
