import type { ChapterRecord } from "../../types";

/** 23. Cross-browser & Cross-device Testing */
export const chapter = {
  "id": "pw-4-cross",
  "title": "23. Cross-browser & Cross-device Testing",
  "minutes": 40,
  "level": "advanced",
  "phase": "Part 4 · Advanced Techniques",
  "partName": "Part 4 · Advanced Techniques",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "Running on Chromium, Firefox, WebKit pytest --browser chromium pytest --browser firefox pytest --browser webkit Or parametrized directly in code/config to run against all three in one CI pipeline run. --browser (pytest-playwright CLI flag) What it does: Selects which browser engine the test session launches.\n\n## Running on Chromium, Firefox, WebKit\n\nOr parametrized directly in code/config to run against all three in one CI pipeline run.\n\n--browser (pytest-playwright CLI flag)\n\nWhat it does: Selects which browser engine the test session launches.\n\nTypes/params: \"chromium\" (default), \"firefox\", \"webkit\".\n\nPointers: Running the full suite three times (once per browser) in CI catches engine-specific bugs before real users do — a common setup is a CI matrix job that runs the same suite once per browser value in parallel.\n\n```\npytest --browser chromium\npytest --browser firefox\npytest --browser webkit\n```\n\n## Mobile emulation (device descriptors, viewport, geolocation)\n\niphone = p.devices[\"iPhone 13\"] context = browser.new_context(**iphone) page = context.new_page()\n\n## page.goto(\"https://app.example.com\")\n\ncontext = browser.new_context(\n\nviewport={\"width\": 390, \"height\": 844},\n geolocation={\"latitude\": 27.7172, \"longitude\": 85.3240},\n permissions=[\"geolocation\"],\n\n)\n\nplaywright.devices[\"<device name>\"]\n\nWhat it does: A dictionary of preset settings (viewport, user-agent, touch support, device pixel ratio) for a named real device.\n\nTypes/params: String key matching a supported device name, e.g. \"iPhone 13\",\n\n\"Pixel 5\", \"iPad Pro 11\".\n\nPointers: Unpack it directly into new_context(**device_dict) — no need to set each property manually. Full list of supported devices is in Playwright's own source/docs since it's updated over time.\n\npermissions=...)\n\nWhat it does: Sets custom device-like properties without using a full preset.\n\nTypes/params:\n\nPointers: Forgetting permissions=[\"geolocation\"] is a common gotcha — setting geolocation alone does nothing if the page's geolocation request isn't permitted.\n\n```\n# Custom viewport and geolocation, without a full device descriptor\n\nbrowser.new_context(viewport=..., geolocation=...,\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
