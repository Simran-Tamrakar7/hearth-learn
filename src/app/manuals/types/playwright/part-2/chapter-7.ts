import type { ChapterRecord } from "../../../types";

/** 11. Alerts, Dialogs, Popups */
export const chapter = {
  "id": "pw-2-dialogs",
  "title": "11. Alerts, Dialogs, Popups",
  "minutes": 35,
  "level": "intermediate",
  "phase": "Part 2 · Core Interactions",
  "partName": "Part 2 · Core Interactions",
  "overviewText": "Native browser dialogs — alert(), confirm(), and prompt() — block all JavaScript execution until dismissed. Playwright requires registering a dialog handler via page.on('dialog', handler) or page.once('dialog', handler) before the action that triggers the dialog. The handler must call dialog.accept() or dialog.dismiss() — otherwise the page hangs indefinitely and the test times out. prompt() dialogs accept optional input text via dialog.accept('my answer'). dialog.message exposes the displayed text for assertion or conditional handling.",
  "why": "Undhandled dialogs are the #1 cause of 'test timed out with page frozen' mysteries. Unlike custom modal components (which are regular DOM elements), native dialogs are OS-level blocks that Playwright can't click through — only accept or dismiss programmatically. Registering the handler after the click is always too late.",
  "when": "Use page.on('dialog') for delete confirmations, unsaved-changes warnings, and legacy apps still using native confirm(). Use page.once() when exactly one dialog is expected. Switch to regular locators for custom React/Vue modals — those are not native dialogs and should use get_by_role('dialog') instead.",
  "practical": {
    "app": "Admin panel — delete account confirmation",
    "scenario": "Clicking 'Delete account' triggers browser confirm('Are you sure?'). Without a handler, the test hangs 30 seconds and fails with timeout. page.on('dialog', lambda d: d.accept()) registered before the click dismisses the dialog instantly. A test verifying cancel behavior uses dialog.dismiss() and asserts the account row still exists.",
    "pass": "Accept handler: account deleted, row gone. Dismiss handler: account persists, confirm text matched via dialog.message.",
    "fail": "Handler registered after click — dialog blocks page, test times out, logs show no useful error about the dialog."
  },
  "advantages": [
    "page.on() handles every dialog for the session — set once in fixture for delete-heavy suites",
    "page.once() auto-unregisters — clean for single-dialog tests",
    "dialog.message readable for asserting confirm text matches expected warning",
    "dialog.accept('text') handles prompt() input in one call",
    "No OS-level dialog automation needed — works headless on CI",
    "Lambda handlers sufficient for simple accept/dismiss — no class boilerplate"
  ],
  "limitations": [
    "Only native alert/confirm/prompt — custom modal divs need regular locators, not dialog events",
    "Forgotten handler freezes test with unhelpful timeout message",
    "page.on() persists for all subsequent dialogs — may accept unintended confirms if overused",
    "Conditional logic in handlers (accept only if message matches) adds complexity",
    "Multiple simultaneous dialogs are impossible in browsers — but rapid sequential dialogs need once vs on judgment",
    "prompt() dialogs increasingly rare in modern SPAs — chapter skill applies mainly to legacy apps"
  ],
  "tools": [
    {
      "name": "Playwright Dialog Handler",
      "sub": "Native alert/confirm/prompt",
      "url": "https://playwright.dev/python/docs/dialogs",
      "desc": "Register page.on('dialog', callback) or page.once('dialog', callback) before triggering actions. The Dialog object provides accept(prompt_text=None), dismiss(), message (read-only string), and type ('alert', 'confirm', 'prompt'). Until accept or dismiss is called, all page JavaScript is blocked — the test will hang.",
      "adv": [
        "Clean API for legacy native dialogs — no coordinate clicking",
        "dialog.message enables assertion on warning text",
        "once() prevents handler leaking into unrelated tests",
        "Works identically headless and headed"
      ],
      "lim": [
        "Does not apply to HTML modal components — those are normal DOM elements",
        "Handler must be registered before trigger — order is mandatory",
        "Persistent on() handler may accidentally accept wrong dialog in long tests",
        "No 'click Cancel button' — only programmatic dismiss()"
      ],
      "steps": [
        {
          "t": "Step 1 — Accept all dialogs (simple case)",
          "p": "Register before triggering action:",
          "c": "page.on(\"dialog\", lambda dialog: dialog.accept())\npage.get_by_role(\"button\", name=\"Delete account\").click()"
        },
        {
          "t": "Step 2 — Dismiss (cancel) a confirm",
          "p": "Verify cancel path:",
          "c": "page.on(\"dialog\", lambda dialog: dialog.dismiss())\npage.get_by_role(\"button\", name=\"Delete account\").click()\nexpect(page.get_by_text(\"Account active\")).to_be_visible()"
        },
        {
          "t": "Step 3 — Handle prompt() with input",
          "p": "Supply text for prompt dialogs:",
          "c": "page.on(\"dialog\", lambda dialog: dialog.accept(\"my input text\"))"
        },
        {
          "t": "Step 4 — Read message before deciding",
          "p": "Conditional accept based on dialog text:",
          "c": "def handle_dialog(dialog):\n    assert \"Are you sure\" in dialog.message\n    dialog.accept()\npage.on(\"dialog\", handle_dialog)"
        },
        {
          "t": "Step 5 — Single occurrence with once()",
          "p": "Auto-unregister after first dialog:",
          "c": "page.once(\"dialog\", lambda dialog: dialog.accept())"
        }
      ]
    }
  ],
  "contentMarkdown": "page.on(\"dialog\", lambda dialog: dialog.accept()) page.get_by_role(\"button\", name=\"Delete account\").click() # triggers confirm() Native browser dialogs (alert(), confirm(), prompt()) block all further JavaScript execution until dismissed. You must register a handler before triggering the action that opens the dialog — if you forget, the dialog blocks the page indefinitely and your test times out w\n\n## Overview\n\nNative browser dialogs (alert(), confirm(), prompt()) block all further JavaScript execution until dismissed. You must register a handler before triggering the action that opens the dialog — if you forget, the dialog blocks the page indefinitely and your test times out waiting.\n\n```\npage.on(\"dialog\", lambda dialog: dialog.accept())\n\npage.get_by_role(\"button\", name=\"Delete account\").click()  # triggers confirm()\n```\n\n## page.on(\"dialog\", handler)\n\nWhat it does: Registers a persistent listener that fires whenever a native browser dialog appears.\n\nTypes/params:\n\nPointers: Must be registered before the triggering action, or the dialog blocks the page and the test times out.\n\n# For prompt() dialogs — accept with a specific input value\n\n```\npage.on(\"dialog\", lambda dialog: dialog.accept(\"my input text\"))\n\n# Reading the dialog's message before deciding\n\ndef handle_dialog(dialog):\n\nprint(dialog.message)   # e.g., \"Are you sure you want to delete this?\"\n\ndialog.accept()\n\n# Accept (click OK)\n\npage.on(\"dialog\", lambda dialog: dialog.accept())\n\n# Dismiss (click Cancel)\n\npage.on(\"dialog\", lambda dialog: dialog.dismiss())\n```\n\n## page.on(\"dialog\", handle_dialog)\n\none action — if you only want to handle a single occurrence, use page.once(\"dialog\", ...) instead.\n\n```\npage.on(\"dialog\", ...) registers a persistent listener for the whole page session, not just\n```\n\n## page.once(\"dialog\", handler)\n\nWhat it does: Same as .on(), but auto-unregisters after firing once.\n\nTypes/params: Same as .on() above.\n\nPointers: Use when you expect/want to handle only a single dialog occurrence rather than every dialog for the rest of the session.\n\nWhat it does: Accepts (clicks OK) or dismisses (clicks Cancel) the dialog.\n\nTypes/params:\n\nPointers: Exactly one of accept/dismiss must be called per dialog, or the page stays blocked indefinitely.\n\ndialog.message\n\nWhat it does: Read-only property exposing the dialog's displayed text.\n\nTypes/params: No parameters — read-only string property.\n\nPointers: Useful to log or branch logic on (e.g., accept only if the confirm text matches expected, otherwise fail intentionally).\n\nClaude ﬁnished the response Reorganized documentation structure with granular parameter breakdowns Reorganized documentation structure with granular parameter breakdowns\n\n```\ndialog.accept(prompt_text=None) / dialog.dismiss()\n\nprompt() dialogs, supplies the \"typed\" input value\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
