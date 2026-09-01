import type { ChapterRecord } from "../../types";

/** 11. Alerts, Dialogs, Popups */
export const chapter = {
  "id": "pw-2-dialogs",
  "title": "11. Alerts, Dialogs, Popups",
  "minutes": 35,
  "level": "intermediate",
  "phase": "Part 2 · Core Interactions",
  "partName": "Part 2 · Core Interactions",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "page.on(\"dialog\", lambda dialog: dialog.accept()) page.get_by_role(\"button\", name=\"Delete account\").click() # triggers confirm() Native browser dialogs (alert(), confirm(), prompt()) block all further JavaScript execution until dismissed. You must register a handler before triggering the action that opens the dialog — if you forget, the dialog blocks the page indefinitely and your test times out w\n\n## Overview\n\nNative browser dialogs (alert(), confirm(), prompt()) block all further JavaScript execution until dismissed. You must register a handler before triggering the action that opens the dialog — if you forget, the dialog blocks the page indefinitely and your test times out waiting.\n\n```\npage.on(\"dialog\", lambda dialog: dialog.accept())\n\npage.get_by_role(\"button\", name=\"Delete account\").click()  # triggers confirm()\n```\n\n## page.on(\"dialog\", handler)\n\nWhat it does: Registers a persistent listener that fires whenever a native browser dialog appears.\n\nTypes/params:\n\nPointers: Must be registered before the triggering action, or the dialog blocks the page and the test times out.\n\n# For prompt() dialogs — accept with a specific input value\n\n```\npage.on(\"dialog\", lambda dialog: dialog.accept(\"my input text\"))\n\n# Reading the dialog's message before deciding\n\ndef handle_dialog(dialog):\n\nprint(dialog.message)   # e.g., \"Are you sure you want to delete this?\"\n\ndialog.accept()\n\n# Accept (click OK)\n\npage.on(\"dialog\", lambda dialog: dialog.accept())\n\n# Dismiss (click Cancel)\n\npage.on(\"dialog\", lambda dialog: dialog.dismiss())\n```\n\n## page.on(\"dialog\", handle_dialog)\n\none action — if you only want to handle a single occurrence, use page.once(\"dialog\", ...) instead.\n\n```\npage.on(\"dialog\", ...) registers a persistent listener for the whole page session, not just\n```\n\n## page.once(\"dialog\", handler)\n\nWhat it does: Same as .on(), but auto-unregisters after firing once.\n\nTypes/params: Same as .on() above.\n\nPointers: Use when you expect/want to handle only a single dialog occurrence rather than every dialog for the rest of the session.\n\nWhat it does: Accepts (clicks OK) or dismisses (clicks Cancel) the dialog.\n\nTypes/params:\n\nPointers: Exactly one of accept/dismiss must be called per dialog, or the page stays blocked indefinitely.\n\ndialog.message\n\nWhat it does: Read-only property exposing the dialog's displayed text.\n\nTypes/params: No parameters — read-only string property.\n\nPointers: Useful to log or branch logic on (e.g., accept only if the confirm text matches expected, otherwise fail intentionally).\n\nClaude ﬁnished the response Reorganized documentation structure with granular parameter breakdowns Reorganized documentation structure with granular parameter breakdowns\n\n```\ndialog.accept(prompt_text=None) / dialog.dismiss()\n\nprompt() dialogs, supplies the \"typed\" input value\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
