import type { ChapterRecord } from "../../types";

/** 5. Locators Deep Dive */
export const chapter = {
  "id": "pw-2-locators",
  "title": "5. Locators Deep Dive",
  "minutes": 60,
  "level": "beginner",
  "phase": "Part 2 · Core Interactions",
  "partName": "Part 2 · Core Interactions",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "The most important chapter in the manual. Prefer user-facing locators (role, label, text) over brittle CSS/XPath so tests survive markup refactors.\n\n## Why locators are the whole game\n\nThis is the most important chapter in the entire manual — nearly everything else builds on writing good locators.\n\nThese are “user-facing” locators — they find elements the way a real user (or screen reader) would identify them, rather than by internal implementation details like CSS classes. This is deliberate philosophy, not just convenience: implementation details (class names, DOM structure) change often as developers refactor CSS/markup, but the role and visible text of a button rarely change. Locators built on them break far less often.\n\n## get_by_role — ARIA role + accessible name\n\nFinds an element by its ARIA role and optionally its accessible name. Best-practice default — matches how screen readers see the page, so it doubles as a light accessibility check.\n\nCommon roles: button, link, checkbox, textbox, heading, listitem, row. Optional name can be a string or regex (e.g. re.compile(\"Delete.*\")). Use exact=True when substring matching is too loose. For headings, level=1..6 narrows to a specific level. For checkboxes/radios, checked=True/False filters by state.\n\n```\npage.get_by_role(\"button\", name=\"Submit\").click()\npage.get_by_role(\"link\", name=\"Home\").click()\npage.get_by_role(\"checkbox\", name=\"Remember me\").check()\npage.get_by_role(\"heading\", name=\"Dashboard\", level=1)\n```\n\n## get_by_text, get_by_label, get_by_placeholder\n\nget_by_text finds an element containing specific visible text. Good for non-interactive content checks (confirmation messages). Can be ambiguous when text repeats — combine with .filter() or a parent scope.\n\nget_by_label finds a form input by its associated <label> text. Requires proper label markup; if the app skips labels, this won’t work and you’ll need placeholder or CSS.\n\nget_by_placeholder finds an input by its placeholder attribute. Handy when labels are missing, but placeholders are weaker a11y signals than real labels.\n\n```\npage.get_by_text(\"Welcome back\").is_visible()\npage.get_by_label(\"Email address\").fill(\"user@example.com\")\npage.get_by_placeholder(\"Search products...\").fill(\"laptop\")\n```\n\n## CSS, XPath, chaining, and strictness\n\nCSS and XPath still work via page.locator(...) when you must target implementation details — treat them as escapes, not defaults.\n\nChaining and filtering let you narrow: locate a section, then a button inside it. Playwright locators are strict by default when an action would hit multiple elements — that’s a feature. Tighten the locator instead of grabbing .first unless you truly mean “any of these.”\n\nLocators auto-retry until timeout while waiting for the element to become actionable — which is why good locators plus auto-waiting beat sleep-based scripts.\n\n```\nform = page.get_by_role(\"form\", name=\"Login\")\nform.get_by_label(\"Password\").fill(\"secret\")\nform.get_by_role(\"button\", name=\"Sign in\").click()\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
