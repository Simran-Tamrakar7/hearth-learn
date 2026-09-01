import type { ChapterRecord } from "../../types";

/** 7. Assertions with expect() */
export const chapter = {
  "id": "pw-2-expect",
  "title": "7. Assertions with expect()",
  "minutes": 40,
  "level": "beginner",
  "phase": "Part 2 · Core Interactions",
  "partName": "Part 2 · Core Interactions",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "Playwright expect() auto-retries assertions until they pass or time out — pair it with locators instead of instant assert.\n\n## Retrying assertions\n\nA bare assert page.title() == \"…\" fails immediately if the title hasn’t updated yet. expect() from playwright.sync_api keeps polling until the condition is true or the timeout expires — the same philosophy as auto-waiting for actions.\n\nUse expect on locators for visibility, text content, CSS, and attributes. Use expect(page) for URL and title.\n\n```\nfrom playwright.sync_api import expect\n\nexpect(page.get_by_role(\"heading\", name=\"Dashboard\")).to_be_visible()\nexpect(page.get_by_text(\"Saved\")).to_be_visible()\nexpect(page).to_have_url(\"**/dashboard\")\nexpect(page).to_have_title(\"Dashboard\")\n```\n\n## Useful matchers\n\nto_be_visible / to_be_hidden, to_have_text / to_contain_text, to_have_value, to_be_checked, to_have_attribute, to_have_count for lists. Soft assertions exist in some runners; with pytest you’ll usually fail fast on the first expect timeout — that’s fine for learning.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
