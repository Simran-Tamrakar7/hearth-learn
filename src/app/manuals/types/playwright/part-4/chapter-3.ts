import type { ChapterRecord } from "../../types";

/** 19. Visual & Accessibility Testing */
export const chapter = {
  "id": "pw-4-visual",
  "title": "19. Visual & Accessibility Testing",
  "minutes": 45,
  "level": "advanced",
  "phase": "Part 4 · Advanced Techniques",
  "partName": "Part 4 · Advanced Techniques",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "Screenshot comparison expect(page).to_have_screenshot(\"homepage.png\") expect(page).to_have_screenshot(name, max_diff_pixels=..., mask=...) What it does: Compares a screenshot of the current page (or element) against a saved baseline image; fails if they differ beyond a tolerance threshold. Types/params: ● name (string, optional) — filename for the baseline image; auto-generated from the test name \n\n## expect(page).to_have_screenshot(\"homepage.png\")\n\nmask=...)\n\nWhat it does: Compares a screenshot of the current page (or element) against a saved baseline image; fails if they differ beyond a tolerance threshold.\n\nTypes/params:\n\n(see dynamic content handling below)\n\nPointers: The first run creates the baseline image (nothing to compare against yet) — subsequent runs compare against it. Baselines need to be committed to version control and regenerated deliberately when a UI change is intentional, not just whenever a test fails.\n\n```\nexpect(page).to_have_screenshot(name, max_diff_pixels=...,\n```\n\n## Handling dynamic content in visual diffs\n\n])\n\nPointers: Timestamps, ads, and other constantly-changing content will cause false-positive failures on every single run unless masked out or otherwise stabilized (e.g., mocking the API that provides the timestamp, per Chapter 17, so it's always the same value).\n\n```\nexpect(page).to_have_screenshot(\"dashboard.png\", mask=[\n    page.locator(\".timestamp\"),\n    page.locator(\".ad-banner\"),\n```\n\n## Integrating axe-core for accessibility checks\n\naxe = Axe() results = axe.run(page)\n\n```\n# pip install axe-playwright-python\nfrom axe_playwright_python.sync_playwright import Axe\n\nassert len(results.violations_count) == 0, results.generate_report()\n```\n\n## Axe().run(page)\n\nWhat it does: Scans the current page's DOM for accessibility violations using the axe-core ruleset (missing alt text, poor color contrast, missing ARIA labels, etc.).\n\nTypes/params:\n\n(dict to include/exclude specific rule sets)\n\nPointers: Increasingly a compliance requirement, not just best practice — especially relevant for healthcare/finance-adjacent apps (tying back to Part 0's industry list).\n\n## A typical violation object includes: id (the rule that failed, e.g. \"color-contrast\"),\n\nimpact (\"minor\", \"moderate\", \"serious\", \"critical\"), description, and\n\nnodes (the specific HTML elements that failed, with a target selector for each).\n\nPointers: Triage by impact level first — \"critical\" and \"serious\" violations (often things like missing form labels or unusable keyboard navigation) block real users from completing tasks and deserve priority over \"minor\" cosmetic issues.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
