import type { ChapterRecord } from "../../types";

/** 6. Actions */
export const chapter = {
  "id": "pw-2-actions",
  "title": "6. Actions",
  "minutes": 45,
  "level": "beginner",
  "phase": "Part 2 · Core Interactions",
  "partName": "Part 2 · Core Interactions",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "Click, fill, check, select, hover, keyboard — every action auto-waits for actionability before running.\n\n## Clicks and fills\n\nclick() waits until the target is actionable, then clicks the center (or a position you specify). Prefer role/name locators so you’re clicking what the user sees.\n\nfill() clears the field and sets the value in one shot — usually what you want for forms. type() / press_sequentially() send keystrokes and are better when the app listens to individual input events.\n\n```\npage.get_by_role(\"button\", name=\"Submit\").click()\npage.get_by_label(\"Email\").fill(\"you@example.com\")\n```\n\n## Checks, selects, hover, keyboard\n\ncheck() / uncheck() are for checkboxes and radios. select_option() works with <select> by value, label, or index. hover() is useful before menus that only appear on mouseover.\n\nkeyboard.press and locator.press cover shortcuts (Control+A, Enter). Prefer locator-targeted presses when focus matters.\n\n```\npage.get_by_label(\"Remember me\").check()\npage.get_by_label(\"Country\").select_option(label=\"Nepal\")\npage.get_by_role(\"button\", name=\"Account\").hover()\npage.get_by_placeholder(\"Search\").press(\"Enter\")\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
