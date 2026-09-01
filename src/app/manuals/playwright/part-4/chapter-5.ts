import type { ChapterRecord } from "../../types";

/** 21. Shadow DOM & Complex Components */
export const chapter = {
  "id": "pw-4-shadow",
  "title": "21. Shadow DOM & Complex Components",
  "minutes": 40,
  "level": "advanced",
  "phase": "Part 4 · Advanced Techniques",
  "partName": "Part 4 · Advanced Techniques",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "Piercing shadow DOM Playwright's locators automatically pierce open shadow DOM by default — no special syntax needed in most cases: # Works transparently even if \"custom-button\" uses shadow DOM internally page.locator(\"custom-button\").get_by_text(\"Submit\").click() Pointers: This \"just works\" behavior is a genuine advantage over older tools, which often required manually accessing .shadowRoot via J\n\n## Piercing shadow DOM\n\nPlaywright's locators automatically pierce open shadow DOM by default — no special syntax needed in most cases:\n\nPointers: This \"just works\" behavior is a genuine advantage over older tools, which often required manually accessing .shadowRoot via JavaScript execution to reach shadow DOM content at all.\n\n```\n# Works transparently even if \"custom-button\" uses shadow DOM internally\npage.locator(\"custom-button\").get_by_text(\"Submit\").click()\n```\n\n## Handling custom web components\n\nFor components built with frameworks like Lit or native Web Components (common in design systems), the same role/text-based locators from Chapter 5 generally still apply, since they operate on the accessibility tree rather than raw DOM structure:\n\ncustom <my-button> element\n\nPointers: Closed shadow roots (a stricter encapsulation mode some components use deliberately to prevent external access) are the one case Playwright genuinely cannot pierce — this is a rare, deliberate choice by component authors, and if you hit it, there's no workaround short of the app changing that setting.\n\n```\npage.get_by_role(\"button\", name=\"Save changes\").click()  # works even inside a\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
