---
id: "pw-2-actions"
title: "6. Actions"
minutes: 45
partName: "Part 2 · Core Interactions"
level: "beginner"
---

Click, fill, check, select, hover, keyboard — every action auto-waits for actionability before running.

## Clicks and fills

click() waits until the target is actionable, then clicks the center (or a position you specify). Prefer role/name locators so you’re clicking what the user sees.

fill() clears the field and sets the value in one shot — usually what you want for forms. type() / press_sequentially() send keystrokes and are better when the app listens to individual input events.

```
page.get_by_role("button", name="Submit").click()
page.get_by_label("Email").fill("you@example.com")
```

## Checks, selects, hover, keyboard

check() / uncheck() are for checkboxes and radios. select_option() works with <select> by value, label, or index. hover() is useful before menus that only appear on mouseover.

keyboard.press and locator.press cover shortcuts (Control+A, Enter). Prefer locator-targeted presses when focus matters.

```
page.get_by_label("Remember me").check()
page.get_by_label("Country").select_option(label="Nepal")
page.get_by_role("button", name="Account").hover()
page.get_by_placeholder("Search").press("Enter")
```