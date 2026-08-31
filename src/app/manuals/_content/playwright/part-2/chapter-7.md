---
id: "pw-2-dialogs"
title: "11. Alerts, Dialogs, Popups"
minutes: 35
partName: "Part 2 · Core Interactions"
level: "intermediate"
---

page.on("dialog", lambda dialog: dialog.accept()) page.get_by_role("button", name="Delete account").click() # triggers confirm() Native browser dialogs (alert(), confirm(), prompt()) block all further JavaScript execution until dismissed. You must register a handler before triggering the action that opens the dialog — if you forget, the dialog blocks the page indefinitely and your test times out w

## Overview

Native browser dialogs (alert(), confirm(), prompt()) block all further JavaScript execution until dismissed. You must register a handler before triggering the action that opens the dialog — if you forget, the dialog blocks the page indefinitely and your test times out waiting.

```
page.on("dialog", lambda dialog: dialog.accept())

page.get_by_role("button", name="Delete account").click()  # triggers confirm()
```

## page.on("dialog", handler)

What it does: Registers a persistent listener that fires whenever a native browser dialog appears.

Types/params:

Pointers: Must be registered before the triggering action, or the dialog blocks the page and the test times out.

# For prompt() dialogs — accept with a specific input value

```
page.on("dialog", lambda dialog: dialog.accept("my input text"))

# Reading the dialog's message before deciding

def handle_dialog(dialog):

print(dialog.message)   # e.g., "Are you sure you want to delete this?"

dialog.accept()

# Accept (click OK)

page.on("dialog", lambda dialog: dialog.accept())

# Dismiss (click Cancel)

page.on("dialog", lambda dialog: dialog.dismiss())
```

## page.on("dialog", handle_dialog)

one action — if you only want to handle a single occurrence, use page.once("dialog", ...) instead.

```
page.on("dialog", ...) registers a persistent listener for the whole page session, not just
```

## page.once("dialog", handler)

What it does: Same as .on(), but auto-unregisters after firing once.

Types/params: Same as .on() above.

Pointers: Use when you expect/want to handle only a single dialog occurrence rather than every dialog for the rest of the session.

What it does: Accepts (clicks OK) or dismisses (clicks Cancel) the dialog.

Types/params:

Pointers: Exactly one of accept/dismiss must be called per dialog, or the page stays blocked indefinitely.

dialog.message

What it does: Read-only property exposing the dialog's displayed text.

Types/params: No parameters — read-only string property.

Pointers: Useful to log or branch logic on (e.g., accept only if the confirm text matches expected, otherwise fail intentionally).

Claude ﬁnished the response Reorganized documentation structure with granular parameter breakdowns Reorganized documentation structure with granular parameter breakdowns

```
dialog.accept(prompt_text=None) / dialog.dismiss()

prompt() dialogs, supplies the "typed" input value
```