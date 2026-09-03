import type { ChapterRecord } from "../../../types";

/** 63. Quick-Reference Cheat Sheet */
export const chapter = {
  id: "pw-63-cheatsheet",
  title: "63. Quick-Reference Cheat Sheet",
  minutes: 30,
  level: "beginner",
  phase: "Part 8 · Resources",
  partName: "Part 8 · Resources",
  overviewText: "Single-page syntax lookup: launch, locators, actions, assertions, waiting, auth, network, and CLI flags — code-only, no prose.",
  why: "During live coding and debugging you need syntax in seconds, not chapter navigation. Cheat sheet complements glossary definitions with copy-paste patterns.",
  when: "Keep open during interviews, live coding, and daily test authoring after Part 2.",
  practical: { app: "Daily test authoring", scenario: "Forgot exact syntax for storage_state save during interview live coding.", pass: "Cheat sheet context.storage_state(path='auth.json') line ready.", fail: "Guess API from memory and waste interview time on syntax errors." },
  tools: [],
  contentMarkdown: "## Quick-Reference Cheat Sheet\n\nPurpose: a single-page, syntax-first lookup — deliberately distinct from the Glossary's definitions. Where Chapter 61 explains what a term means, this chapter exists purely to answer \"what's the exact syntax for X\" at a glance, without needing to search back through the relevant chapter — the two are complementary, not redundant.\n\n```python\n# Launch & navigate\nbrowser = p.chromium.launch(headless=True)\npage = browser.new_page()\npage.goto(\"https://example.com\")\n\n# Locators (preferred order)\npage.get_by_role(\"button\", name=\"Submit\")\npage.get_by_label(\"Email\")\npage.get_by_test_id(\"submit-btn\")\npage.get_by_text(\"Welcome\")\npage.locator(\"css=.class\")          # last resort\n\n# Actions\nlocator.click()\nlocator.fill(\"text\")\nlocator.type(\"text\", delay=100)\nlocator.press(\"Enter\")\nlocator.check() / .uncheck()\nlocator.select_option(label=\"Nepal\")\nlocator.hover()\nlocator.drag_to(target_locator)\n\n# Assertions\nexpect(locator).to_be_visible()\nexpect(locator).to_have_text(\"text\")\nexpect(locator).to_have_value(\"value\")\nexpect(page).to_have_url(\"https://...\")\nexpect(locator).to_have_count(5)\nexpect.soft(locator).to_be_visible()\n\n# Waiting\npage.wait_for_selector(\".spinner\", state=\"hidden\")\npage.wait_for_load_state(\"networkidle\")\n\n# Multi-context / auth\ncontext = browser.new_context(storage_state=\"auth.json\")\ncontext.storage_state(path=\"auth.json\")\n\n# Network\npage.route(\"**/api/**\", handler)\nroute.fulfill(status=200, body=\"...\")\nroute.abort()\n\n# CLI\npytest --headed --browser firefox --slowmo 500\npytest -m smoke\npytest -k \"login\"\npytest -n auto              # pytest-xdist\npytest --tracing on\nPWDEBUG=1 pytest\n```",
  customSummary: "## Quick-Reference Cheat Sheet\n\nA single-page, code-only syntax lookup — deliberately distinct from the Glossary's definitions (what vs. how).\nCovers: launch/navigate, locators in priority order, actions, assertions, waiting, multi-context/auth, network interception, and key CLI flags.\nShould stay code-only — any prose explanation belongs back in its originating chapter, not here.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
