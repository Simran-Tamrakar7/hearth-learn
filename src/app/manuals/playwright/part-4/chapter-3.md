---
id: "pw-4-visual"
title: "19. Visual & Accessibility Testing"
minutes: 45
partName: "Part 4 · Advanced Techniques"
level: "advanced"
---

Screenshot comparison expect(page).to_have_screenshot("homepage.png") expect(page).to_have_screenshot(name, max_diff_pixels=..., mask=...) What it does: Compares a screenshot of the current page (or element) against a saved baseline image; fails if they differ beyond a tolerance threshold. Types/params: ● name (string, optional) — filename for the baseline image; auto-generated from the test name 

## expect(page).to_have_screenshot("homepage.png")

mask=...)

What it does: Compares a screenshot of the current page (or element) against a saved baseline image; fails if they differ beyond a tolerance threshold.

Types/params:

(see dynamic content handling below)

Pointers: The first run creates the baseline image (nothing to compare against yet) — subsequent runs compare against it. Baselines need to be committed to version control and regenerated deliberately when a UI change is intentional, not just whenever a test fails.

```
expect(page).to_have_screenshot(name, max_diff_pixels=...,
```

## Handling dynamic content in visual diffs

])

Pointers: Timestamps, ads, and other constantly-changing content will cause false-positive failures on every single run unless masked out or otherwise stabilized (e.g., mocking the API that provides the timestamp, per Chapter 17, so it's always the same value).

```
expect(page).to_have_screenshot("dashboard.png", mask=[
    page.locator(".timestamp"),
    page.locator(".ad-banner"),
```

## Integrating axe-core for accessibility checks

axe = Axe() results = axe.run(page)

```
# pip install axe-playwright-python
from axe_playwright_python.sync_playwright import Axe

assert len(results.violations_count) == 0, results.generate_report()
```

## Axe().run(page)

What it does: Scans the current page's DOM for accessibility violations using the axe-core ruleset (missing alt text, poor color contrast, missing ARIA labels, etc.).

Types/params:

(dict to include/exclude specific rule sets)

Pointers: Increasingly a compliance requirement, not just best practice — especially relevant for healthcare/finance-adjacent apps (tying back to Part 0's industry list).

## A typical violation object includes: id (the rule that failed, e.g. "color-contrast"),

impact ("minor", "moderate", "serious", "critical"), description, and

nodes (the specific HTML elements that failed, with a target selector for each).

Pointers: Triage by impact level first — "critical" and "serious" violations (often things like missing form labels or unusable keyboard navigation) block real users from completing tasks and deserve priority over "minor" cosmetic issues.