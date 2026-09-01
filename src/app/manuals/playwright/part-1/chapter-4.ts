import type { ChapterRecord } from "../../types";

/** 4. First Script */
export const chapter = {
  "id": "pw-1-first",
  "title": "4. First Script",
  "minutes": 45,
  "level": "beginner",
  "phase": "Part 1 · Foundations",
  "partName": "Part 1 · Foundations",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "Launch headed/headless, open a page, navigate, locate, click/fill, assert — the smallest complete Playwright loop in Python.\n\n## Launching a browser (headless vs headed)\n\nheadless=True (the default) runs with no visible window — faster and what CI environments require. headless=False opens an actual visible browser window — invaluable while you’re first writing a test and want to watch what’s happening. A common workflow: write and debug with headless=False, then flip to True (or just remove the argument) once the test is stable and you’re ready to commit it.\n\n```\nfrom playwright.sync_api import sync_playwright\n\nwith sync_playwright() as p:\n    browser = p.chromium.launch(headless=False)  # headed — visible window\n    page = browser.new_page()\n    page.goto(\"https://example.com\")\n    print(page.title())\n    browser.close()\n```\n\n## Navigate, locate, act\n\npage.goto opens a URL and waits for a load state. Locators find elements the way users perceive them — prefer get_by_role and get_by_text over brittle CSS when you can. Actions like click and fill auto-wait for actionability.\n\n```\npage.get_by_role(\"link\", name=\"More information\").click()\n# or on a form-like page:\n# page.get_by_label(\"Email\").fill(\"you@example.com\")\n# page.get_by_role(\"button\", name=\"Submit\").click()\n```\n\n## Assert something true\n\nA script that only clicks isn’t a test. Assert on URL, title, or visible text so failures mean something. In pytest you’ll use expect() from playwright.sync_api — Part 2 covers that in depth.\n\n```\nassert \"Example\" in page.title()\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
