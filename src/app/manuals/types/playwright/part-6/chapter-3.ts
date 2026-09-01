import type { ChapterRecord } from "../../types";

/** 31. Code Review & Best Practices */
export const chapter = {
  "id": "pw-6-review",
  "title": "31. Code Review & Best Practices",
  "minutes": 40,
  "level": "pro",
  "phase": "Part 6 · Pro-Level Practices",
  "partName": "Part 6 · Pro-Level Practices",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "Naming conventions, DRY principles # Avoid: def test1(page): ... # Prefer: descriptive, scenario-revealing names def test_login_fails_with_incorrect_password(page): ...\n\n## Naming conventions, DRY principles\n\n...\n\n...\n\nPointers: A test name should describe the scenario and expected outcome well enough that a failure notification alone (just the test name, no need to open the code) tells a reader roughly what broke. DRY (Don't Repeat Yourself) in this context mainly means:\n\nobject method (Chapter 14) or a utility function (Chapter 29), not copy-pasted.\n\n```\n# Prefer: descriptive, scenario-revealing names\n\ndef test_login_fails_with_incorrect_password(page):\n\nif the same locator or action sequence appears in three or more tests, it belongs in a page\n\n# Avoid:\n\ndef test1(page):\n```\n\n## Common anti-patterns in automation\n\nexplicit state-based waits (Chapter 8).\n\nevery minor markup refactor.\n\n(e.g., relying on data another test created). This breaks under parallel execution\n\n(Chapter 22) and makes debugging a failure much harder, since the \"real\" cause\n\nmight be in an unrelated test file.\n\ncorrect behavior.\n\nlogical grouping, instead of organized-by-feature files (Chapter 29's folder\n architecture).\n\n## Documentation standards for shared frameworks\n\nA framework other engineers will onboard onto needs:\n\nonly this file.\n\nshopping cart as a side effect\").\n\npatterns, and folder structure decisions — so contributors don't reinvent or\n\ndiverge from established patterns.\n\nPointers: This chapter plays directly to your existing QA documentation strength — a framework with excellent test coverage but no documentation is nearly as hard to maintain as one with poor coverage, since new contributors can't safely extend what they don't understand.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
