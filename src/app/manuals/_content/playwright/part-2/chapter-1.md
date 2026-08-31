---
id: "pw-2-locators"
title: "5. Locators Deep Dive"
minutes: 60
partName: "Part 2 · Core Interactions"
level: "beginner"
---

The most important chapter in the manual. Prefer user-facing locators (role, label, text) over brittle CSS/XPath so tests survive markup refactors.

## Why locators are the whole game

This is the most important chapter in the entire manual — nearly everything else builds on writing good locators.

These are “user-facing” locators — they find elements the way a real user (or screen reader) would identify them, rather than by internal implementation details like CSS classes. This is deliberate philosophy, not just convenience: implementation details (class names, DOM structure) change often as developers refactor CSS/markup, but the role and visible text of a button rarely change. Locators built on them break far less often.

## get_by_role — ARIA role + accessible name

Finds an element by its ARIA role and optionally its accessible name. Best-practice default — matches how screen readers see the page, so it doubles as a light accessibility check.

Common roles: button, link, checkbox, textbox, heading, listitem, row. Optional name can be a string or regex (e.g. re.compile("Delete.*")). Use exact=True when substring matching is too loose. For headings, level=1..6 narrows to a specific level. For checkboxes/radios, checked=True/False filters by state.

```
page.get_by_role("button", name="Submit").click()
page.get_by_role("link", name="Home").click()
page.get_by_role("checkbox", name="Remember me").check()
page.get_by_role("heading", name="Dashboard", level=1)
```

## get_by_text, get_by_label, get_by_placeholder

get_by_text finds an element containing specific visible text. Good for non-interactive content checks (confirmation messages). Can be ambiguous when text repeats — combine with .filter() or a parent scope.

get_by_label finds a form input by its associated <label> text. Requires proper label markup; if the app skips labels, this won’t work and you’ll need placeholder or CSS.

get_by_placeholder finds an input by its placeholder attribute. Handy when labels are missing, but placeholders are weaker a11y signals than real labels.

```
page.get_by_text("Welcome back").is_visible()
page.get_by_label("Email address").fill("user@example.com")
page.get_by_placeholder("Search products...").fill("laptop")
```

## CSS, XPath, chaining, and strictness

CSS and XPath still work via page.locator(...) when you must target implementation details — treat them as escapes, not defaults.

Chaining and filtering let you narrow: locate a section, then a button inside it. Playwright locators are strict by default when an action would hit multiple elements — that’s a feature. Tighten the locator instead of grabbing .first unless you truly mean “any of these.”

Locators auto-retry until timeout while waiting for the element to become actionable — which is why good locators plus auto-waiting beat sleep-based scripts.

```
form = page.get_by_role("form", name="Login")
form.get_by_label("Password").fill("secret")
form.get_by_role("button", name="Sign in").click()
```