import type { ChapterRecord } from "../../types";

/** 28. Logging & Error Handling */
export const chapter = {
  "id": "pw-5-logging",
  "title": "28. Logging & Error Handling",
  "minutes": 35,
  "level": "advanced",
  "phase": "Part 5 · CI/CD & Reporting",
  "partName": "Part 5 · CI/CD & Reporting",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "Custom logging setup import logging logging.basicConfig( level=logging.INFO, format=\"%(asctime)s - %(levelname)s - %(message)s\" ) logger = logging.getLogger(__name__) def test_login(page): logger.info(\"Starting login test\") page.goto(\"https://app.example.com/login\") logger.info(\"Navigated to login page\") logging.basicConfig(level=..., format=...) What it does: Configures the root logger's minimum \n\n## Custom logging setup\n\nlevel=logging.INFO,\n\nformat=\"%(asctime)s - %(levelname)s - %(message)s\"\n\n)\n\nlogger = logging.getLogger(__name__)\n\n```\ndef test_login(page):\n\nlogger.info(\"Starting login test\")\n\nimport logging\n\nlogging.basicConfig(\n```\n\n## page.goto(\"https://app.example.com/login\")\n\nWhat it does: Configures the root logger's minimum severity level and output format\n\nTypes/params:\n\nlogging.ERROR) — messages below this level are suppressed\n\n(timestamp, level, message, etc.)\n\nPointers: INFO level is a reasonable default for test runs — enough to trace what a test\n\nwas doing without the noise of DEBUG-level internals. Custom logging like this gives\n\nreadable output beyond raw pytest console output, especially useful when a CI failure needs a narrative of \"what happened right before it broke,\" not just a stack trace.\n\n```\nlogger.info(\"Navigated to login page\")\n\nlogging.basicConfig(level=..., format=...)\n\nfor the whole test run.\n```\n\n## Screenshot/video capture on failure\n\n--screenshot / --video (pytest-playwright CLI flags)\n\nWhat it does: Automatically captures a screenshot and/or video for each test, controllable by outcome.\n\nTypes/params:\n\nPointers: only-on-failure / retain-on-failure are the right defaults for most\n\nsuites — capturing on every single test (\"on\") generates large amounts of storage for passing tests you'll likely never look at, while still giving you full debugging evidence exactly when you need it (a failure).\n\n```\n# pytest-playwright supports this via CLI flags directly:\n\npytest --screenshot=only-on-failure --video=retain-on-failure\n```\n\n## Retry logic for flaky tests\n\nWhat it does: Automatically re-runs a failed test up to a specified number of times before marking it as a genuine failure.\n\nTypes/params:\n\nPointers: Retry logic should be used carefully — it's meant for genuine environmental flakiness (a network blip, a race condition in test setup), not as a way to paper over a real, reproducible bug. A test that only passes 1-in-3 tries even with retries almost always indicates a real problem worth fixing rather than retrying around indefinitely; tracking which tests need reruns over time (tying back to Chapter 30's flaky-test diagnosis) is more valuable long-term than just cranking up the rerun count.\n\n```\npip install pytest-rerunfailures\n\npytest --reruns 2 --reruns-delay 1\n\npytest --reruns <count> --reruns-delay <seconds>\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
