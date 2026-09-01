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
  "contentMarkdown": "## Ch11 Alerts and Dialogs\n\nNative browser dialogs — `alert()`, `confirm()`, `prompt()` — block all JavaScript on the page until dismissed. Playwright cannot click them with normal locators; you must register a handler **before** the action that triggers the dialog.\n\n---\n\n### page.on(\"dialog\", handler)\n\n**What it does:** Registers a persistent listener that fires whenever a native dialog appears for the lifetime of the page.\n\n**Types/params:**\n- `event` (str): `\"dialog\"`.\n- `handler` (callable): Receives a `Dialog` object. Must call `accept()` or `dismiss()`.\n\n**Pointers:**\n- If no handler is registered, the dialog blocks the page and the test times out.\n- Handler runs synchronously in the dialog callback — keep logic simple.\n- One handler handles **all** subsequent dialogs on that page until removed.\n\n```python\npage.on(\"dialog\", lambda dialog: dialog.accept())\npage.get_by_role(\"button\", name=\"Delete account\").click()  # triggers confirm()\n```\n\n---\n\n### dialog.accept() / dialog.dismiss()\n\n**What it does:**\n- `accept(prompt_text=None)`: Clicks OK. For `prompt()` dialogs, `prompt_text` supplies the typed value.\n- `dismiss()`: Clicks Cancel (for `confirm()` and `prompt()`).\n\n**Types/params:**\n- `prompt_text` (str, optional): Input value for `prompt()` dialogs only.\n\n**Pointers:**\n- Exactly one of `accept` or `dismiss` must be called per dialog — otherwise the page stays blocked forever.\n- `alert()` only supports `accept()` (no cancel button).\n\n```python\n# confirm() — accept\npage.on(\"dialog\", lambda dialog: dialog.accept())\npage.get_by_role(\"button\", name=\"Delete\").click()\n\n# confirm() — dismiss (cancel)\npage.on(\"dialog\", lambda dialog: dialog.dismiss())\npage.get_by_role(\"button\", name=\"Delete\").click()\n```\n\n---\n\n### prompt() dialogs\n\n**What it does:** `prompt()` shows a text input. Pass the desired text to `accept()`.\n\n**Types/params:**\n- `dialog.accept(\"input text\")`: Submits the prompt with that value.\n- `dialog.dismiss()`: Cancels without submitting.\n\n**Pointers:**\n- Read `dialog.default_value` if you need the pre-filled prompt text.\n- Rare in modern apps (replaced by modal components) but still appears in legacy admin tools.\n\n```python\npage.on(\"dialog\", lambda dialog: dialog.accept(\"New folder name\"))\npage.get_by_role(\"button\", name=\"Create folder\").click()\n```\n\n---\n\n### dialog.message\n\n**What it does:** Read-only property with the dialog's displayed text.\n\n**Types/params:** No parameters — `str` property.\n\n**Pointers:**\n- Assert the message matches expected copy before accepting — catches wrong dialogs.\n- Branch: accept only if message contains expected text; otherwise raise to fail intentionally.\n\n```python\ndef handle_delete(dialog):\n    assert \"permanently delete\" in dialog.message.lower()\n    dialog.accept()\n\npage.on(\"dialog\", handle_delete)\npage.get_by_role(\"button\", name=\"Delete\").click()\n```\n\n---\n\n### page.once(\"dialog\", handler)\n\n**What it does:** Same as `page.on(\"dialog\", ...)` but auto-unregisters after handling one dialog.\n\n**Types/params:** Same as `page.on`.\n\n**Pointers:**\n- Use when only one dialog is expected — avoids a stale handler firing on an unexpected later dialog.\n- Safer default for isolated delete-confirm tests.\n\n```python\npage.once(\"dialog\", lambda dialog: dialog.accept())\npage.get_by_role(\"button\", name=\"Delete row\").click()\n# handler is gone — a second dialog would block/timeout\n```\n\n---\n\n### Custom modals vs native dialogs\n\n**Pointers:** React/Vue/Angular modal components are **not** native dialogs — they are regular DOM elements. Use normal locators:\n\n```python\n# Custom modal — NOT page.on(\"dialog\")\npage.get_by_role(\"button\", name=\"Delete\").click()\nexpect(page.get_by_role(\"dialog\", name=\"Confirm deletion\")).to_be_visible()\npage.get_by_role(\"button\", name=\"Yes, delete\").click()\n```\n\nNative `alert`/`confirm`/`prompt` require `page.on`. ARIA `role=\"dialog\"` modals use `get_by_role`. Confusing the two is a common beginner mistake.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
