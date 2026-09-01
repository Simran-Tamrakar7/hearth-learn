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
  "contentMarkdown": "## Visual Regression Testing\n\nVisual regression catches unintended UI changes — a shifted button, wrong color, missing icon — that functional assertions miss. Playwright's `to_have_screenshot()` compares the current render against a committed baseline image.\n\n## First Run — Generate Baselines\n\n```python\nfrom playwright.sync_api import Page, expect\n\ndef test_homepage_looks_correct(page: Page):\n    page.goto(\"/\")\n    expect(page).to_have_screenshot(\"homepage.png\")\n```\n\nOn first run, Playwright saves `homepage.png` to a `test_<name>_chromium_` snapshot directory. Commit these baselines to version control. Subsequent runs compare pixel-by-pixel.\n\nUpdate baselines when changes are intentional:\n\n```bash\npytest --update-snapshots\n```\n\n## Element-Level Screenshots\n\nCapture a single component instead of the full page:\n\n```python\ndef test_login_form_appearance(page):\n    page.goto(\"/login\")\n    card = page.locator(\".login-card\")\n    expect(card).to_have_screenshot(\"login-card.png\")\n```\n\nElement screenshots are less flaky than full-page captures because they ignore unrelated layout shifts elsewhere on the page.\n\n## Masking Dynamic Content\n\nTimestamps, avatars, and ads change every run. **Mask** regions so they are ignored during comparison:\n\n```python\ndef test_dashboard_with_masked_clock(page):\n    page.goto(\"/dashboard\")\n    expect(page).to_have_screenshot(\n        \"dashboard.png\",\n        mask=[page.locator(\".live-clock\"), page.locator(\".user-avatar\")],\n    )\n```\n\nMasked areas are painted pink in diff reports, making it obvious what was excluded.\n\n## Screenshot Options\n\n```python\nexpect(page).to_have_screenshot(\n    \"footer.png\",\n    full_page=True,           # capture below the fold\n    max_diff_pixels=100,      # allow small anti-aliasing differences\n    threshold=0.2,            # per-pixel color tolerance (0.0–1.0)\n    animations=\"disabled\",    # stop CSS animations before capture\n)\n```\n\nTune `max_diff_pixels` and `threshold` to reduce false positives on different CI machines. Start strict; loosen only when diffs are clearly environmental (font rendering, sub-pixel rounding).\n\n## Accessibility Testing with axe-core\n\nFunctional tests verify behavior; accessibility tests verify everyone can use the app. Integrate **axe-core** via the `axe-playwright-python` package:\n\n```bash\npip install axe-playwright-python\n```\n\n```python\nfrom axe_playwright_python.sync_playwright import Axe\n\ndef test_homepage_has_no_a11y_violations(page):\n    page.goto(\"/\")\n    axe = Axe()\n    results = axe.run(page)\n    assert results.violations == [], format_violations(results.violations)\n\ndef format_violations(violations):\n    return \"\\n\".join(\n        f\"{v['id']}: {v['description']} ({len(v['nodes'])} nodes)\"\n        for v in violations\n    )\n```\n\naxe checks WCAG rules: missing alt text, insufficient color contrast, missing form labels, improper heading hierarchy, and dozens more.\n\n## Scoped Accessibility Scans\n\nScan a single component or exclude third-party widgets:\n\n```python\ndef test_modal_accessibility(page):\n    page.goto(\"/settings\")\n    page.get_by_role(\"button\", name=\"Delete account\").click()\n    modal = page.locator(\"[role='dialog']\")\n\n    axe = Axe()\n    results = axe.run(page, context=modal)\n    assert results.violations == []\n```\n\n## Combining Visual and Accessibility\n\nA page can pass all functional assertions, fail visual regression, and still have accessibility violations. Layer all three:\n\n1. **Functional** — `expect(element).to_be_visible()`\n2. **Visual** — `expect(page).to_have_screenshot()`\n3. **Accessibility** — `axe.run(page)` with zero violations\n\n## CI Considerations\n\n- Commit snapshot baselines; review image diffs in PRs.\n- Run visual tests on a consistent OS and browser in CI (Linux + Chromium is standard).\n- Use `mask` aggressively for dynamic content.\n- Accessibility scans are fast and deterministic — run them on every PR.\n\n## Key Takeaways\n\n- `to_have_screenshot()` compares renders against committed baselines.\n- Use `mask` for dynamic regions; tune `max_diff_pixels` for CI stability.\n- axe-core finds WCAG violations that functional tests miss.\n- Layer functional, visual, and accessibility checks for comprehensive coverage.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
