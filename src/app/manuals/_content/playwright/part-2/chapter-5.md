---
id: "pw-2-tabs"
title: "9. Tabs, Windows, iFrames"
minutes: 40
partName: "Part 2 · Core Interactions"
level: "intermediate"
---

with page.context.expect_page() as new_page_info: page.get_by_role("link", name="Open in new tab").click() new_page = new_page_info.value new_page.wait_for_load_state() print(new_page.title()) The with ... expect_page() pattern registers the listener for the new page event before the click happens, avoiding a race condition where the new tab opens before you started listening for it.

## Overview

new_page = new_page_info.value

The with ... expect_page() pattern registers the listener for the new page event before the click happens, avoiding a race condition where the new tab opens before you started listening for it.

```
with page.context.expect_page() as new_page_info:

page.get_by_role("link", name="Open in new tab").click()

new_page.wait_for_load_state()

print(new_page.title())
```

## page.context.expect_page()

What it does: Context manager that captures a reference to a newly opened tab/page.

Types/params:

Pointers: Must wrap the action that triggers the new tab — registering after the click risks missing the event.

Once you have references to multiple pages, you simply call actions on whichever page object represents the tab you want — there's no "switch to window" concept like Selenium's

times.

```
original_page.bring_to_front()   # optional — brings a page to the foreground visually

new_page.get_by_role("button", name="Confirm").click()

driver.switch_to.window(), since each Page object is independently addressable at all
```

## page.bring_to_front()

What it does: Brings a specific page/tab to the visual foreground.

Types/params: No parameters.

Pointers: Mostly cosmetic for headed debugging — not required to interact with a background tab programmatically.

frame = page.frame_locator("#payment-iframe")

Common real-world case: third-party payment widgets (Stripe, PayPal) are almost always embedded via iframe for security/PCI-compliance reasons.

```
frame.get_by_label("Card number").fill("4242 4242 4242 4242")

frame.get_by_role("button", name="Pay").click()
```

## page.frame_locator(selector)

What it does: Returns a locator scoped inside a specific iframe.

Types/params:

contents)

Pointers: Required any time content lives inside an <iframe>. Chain for nested iframes: .frame_locator("#outer").frame_locator("#inner").