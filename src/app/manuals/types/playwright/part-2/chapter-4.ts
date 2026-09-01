import type { ChapterRecord } from "../../types";

/** 8. Waits & Auto-waiting */
export const chapter = {
  "id": "pw-2-waits",
  "title": "8. Waits & Auto-waiting",
  "minutes": 40,
  "level": "beginner",
  "phase": "Part 2 · Core Interactions",
  "partName": "Part 2 · Core Interactions",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "Actionability checklist, explicit waits for spinner/load states, and why time.sleep is a lose-lose.\n\n## The actionability checklist\n\nBefore performing most actions, Playwright runs through an actionability checklist on the target element:\n\n1. Attached — is it in the DOM at all?\n2. Visible — non-zero size, not display:none / visibility:hidden?\n3. Stable — stopped moving/animating (checked across at least two animation frames)?\n4. Enabled — not disabled?\n5. Receives events — not covered by another element (e.g., a loading spinner overlay)?\n\nPlaywright re-checks this list repeatedly until all conditions pass or the timeout is hit. This is exactly why you rarely need manual waits.\n\n## Explicit waits when you need them\n\nUse state-based waits for cases auto-waiting doesn’t cover directly — e.g., waiting for a spinner to hit “hidden” before checking results underneath.\n\nwait_for_load_state covers load, domcontentloaded, and networkidle (no network for ~500ms). networkidle is handy after actions that trigger background calls with no specific element to target — but avoid it on pages with continuous polling (dashboards), since it’ll never go idle and will time out.\n\n```\npage.wait_for_selector(\".spinner\", state=\"hidden\")\npage.wait_for_selector(\".results\", state=\"visible\")\npage.wait_for_load_state(\"domcontentloaded\")\n```\n\n## Avoid time.sleep\n\nA hard sleep() is a lose-lose: too short and the test is flaky; too long and every run wastes time even when the app responded instantly. Auto-waiting solves both problems simultaneously. The only legitimate reasons to add explicit waits are the state-based cases above — never as a blanket “just in case” habit.\n\n```\n# Avoid:\n# time.sleep(3)\n# page.click(\".submit-button\")\n\n# Prefer:\npage.get_by_role(\"button\", name=\"Submit\").click()  # auto-waits already\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
