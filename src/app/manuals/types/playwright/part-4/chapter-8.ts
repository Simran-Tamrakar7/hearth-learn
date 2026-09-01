import type { ChapterRecord } from "../../types";

/** 24. Debugging Tools */
export const chapter = {
  "id": "pw-4-debug",
  "title": "24. Debugging Tools",
  "minutes": 45,
  "level": "advanced",
  "phase": "Part 4 · Advanced Techniques",
  "partName": "Part 4 · Advanced Techniques",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "Playwright Inspector PWDEBUG=1 pytest test_login.py What it does: Opens a GUI tool that pauses test execution and lets you step through actions one at a time, inspect the current page state, and even generate locator code by pointing at elements live. Pointers: Invaluable while first writing a new test or diagnosing exactly where an existing one breaks — far faster than repeatedly adding print sta\n\n## PWDEBUG=1 pytest test_login.py\n\nWhat it does: Opens a GUI tool that pauses test execution and lets you step through actions one at a time, inspect the current page state, and even generate locator code by pointing at elements live.\n\nPointers: Invaluable while first writing a new test or diagnosing exactly where an existing one breaks — far faster than repeatedly adding print statements and re-running.\n\n## Trace Viewer\n\nsources=...)\n\nWhat it does: Begins recording a full timeline of the test session — DOM snapshots, network activity, console logs, and optionally screenshots at each step.\n\nTypes/params:\n\nWhat it does: Stops recording and saves the trace to a .zip file.\n\nTypes/params:\n\nPointers: Essential once tests run in CI where you can't watch them live — a failed CI run's trace file, opened locally with playwright show-trace, lets you replay exactly what happened step by step, including hovering over any point in time to see the DOM as it was at that instant. A common pattern is only saving traces on failure (context.tracing.stop() conditionally, or via a pytest hook) to avoid massive artifact storage costs across an entire suite.\n\nCodegen\n\nWhat it does: Opens a browser and records your manual clicks/typing as generated Playwright code in real time, in your language/framework of choice.\n\nPointers: Genuinely useful for quickly drafting locators for a new page, especially when you're unsure exactly what selector Playwright would generate for a tricky element — but the generated code usually needs cleanup afterward to fit your POM structure (Chapter 14) rather than being committed as-is; codegen optimizes for \"works right now,\" not for long-term maintainability.\n\n```\ncontext.tracing.start(screenshots=True, snapshots=True, sources=True)\n\n# ... test steps ...\ncontext.tracing.stop(path=\"trace.zip\")\n\nplaywright show-trace trace.zip\n\ncontext.tracing.start(screenshots=..., snapshots=...,\n\nplaywright codegen https://app.example.com\n\ncontext.tracing.stop(path=...)\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
