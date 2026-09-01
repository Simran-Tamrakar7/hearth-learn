import type { ChapterRecord } from "../../../types";

/** 21. Shadow DOM & Complex Components */
export const chapter = {
  "id": "pw-4-shadow",
  "title": "21. Shadow DOM & Complex Components",
  "minutes": 40,
  "level": "advanced",
  "phase": "Part 4 · Advanced Techniques",
  "partName": "Part 4 · Advanced Techniques",
  "overviewText": "Shadow DOM encapsulates a component's internal DOM behind a shadow root boundary — the inner elements are not visible to standard document.querySelector calls. Playwright's locators automatically pierce open shadow DOM by default: page.locator('custom-button').get_by_text('Submit').click() works transparently even when custom-button uses shadow DOM internally. For custom web components built with Lit, Stencil, or native Web Components (common in design systems), role and text-based locators from Chapter 5 still apply because they operate on the accessibility tree, not raw DOM structure. The one exception is closed shadow roots — a deliberate encapsulation mode that Playwright cannot pierce, requiring the application to expose accessible hooks instead.",
  "why": "Modern design systems increasingly ship as web components with shadow DOM. Test tools that cannot reach shadow DOM content force teams to execute JavaScript to access .shadowRoot manually — brittle and framework-specific. Playwright's automatic piercing means the same get_by_role and get_by_text locators that work on regular pages work inside shadow DOM without special syntax. This is a genuine advantage over older tools and a reason to prefer user-facing locators over CSS selectors that break when shadow boundaries shift.",
  "when": "Use standard Playwright locators (get_by_role, get_by_text, get_by_label) for custom components first — they pierce open shadow DOM automatically. Fall back to page.locator('component-tag').locator('inner-element') chaining only when role/text locators cannot find the target. If you encounter closed shadow roots, escalate to the development team to expose ARIA attributes or test hooks — there is no Playwright workaround.",
  "practical": {
    "app": "HRMS — Design system date picker",
    "scenario": "The HRMS replaces its native date input with a custom <hrms-date-picker> web component using open shadow DOM. A test using page.get_by_label('Start date') still works because Playwright pierces the shadow boundary via the accessibility tree. A test using page.locator('#start-date-input') breaks because the input ID lives inside the shadow root.",
    "pass": "page.get_by_role('button', name='Save changes').click() — works inside custom component via accessibility tree piercing.",
    "fail": "page.locator('#shadow-internal-btn').click() — selector cannot cross shadow root boundary; test fails with 'element not found'."
  },
  "advantages": [
    "Automatic open shadow DOM piercing — no special syntax or JavaScript injection",
    "Role and text locators work inside web components via accessibility tree",
    "Chained locators (component.locator('inner')) provide explicit shadow boundary crossing",
    "Same locator philosophy as non-shadow pages — no separate testing strategy needed"
  ],
  "limitations": [
    "Closed shadow roots are impenetrable — no workaround except app-level changes",
    "Deeply nested shadow DOM (shadow inside shadow) can slow locator resolution",
    "CSS selectors do not cross shadow boundaries — must use Playwright locators",
    "Custom components without ARIA roles may lack accessible names for get_by_role"
  ],
  "tools": [
    {
      "name": "Shadow DOM locators",
      "sub": "Playwright built-in",
      "url": "https://playwright.dev/python/docs/locators",
      "desc": "Playwright locators automatically traverse open shadow root boundaries when resolving elements. page.locator('custom-element').get_by_text('Submit') chains through the component's shadow DOM to find the inner button. get_by_role and get_by_label operate on the composed accessibility tree, which flattens shadow DOM content for assistive technologies — making them the preferred approach for shadow DOM components.",
      "adv": [
        "Zero configuration — piercing works out of the box for open shadow roots",
        "Accessibility-tree locators are shadow-DOM-agnostic by design",
        "Chained locators give explicit control over shadow boundary crossing",
        "No JavaScript execution needed to access shadowRoot"
      ],
      "lim": [
        "Closed shadow roots block all Playwright locator strategies",
        "Components without proper ARIA may be unfindable by role/text locators",
        "Very deep shadow nesting can impact locator performance",
        "Cannot use standard CSS selectors across shadow boundaries"
      ],
      "steps": [
        {
          "t": "Step 1 — Interact with a shadow DOM component via role",
          "p": "Accessibility locators pierce shadow automatically:",
          "c": "# custom-button uses open shadow DOM internally\npage.get_by_role(\"button\", name=\"Submit\").click()"
        },
        {
          "t": "Step 2 — Chain through a component tag",
          "p": "Explicit shadow boundary crossing:",
          "c": "page.locator(\"custom-date-picker\").get_by_label(\"Month\").select_option(\"January\")"
        },
        {
          "t": "Step 3 — Verify nested shadow content",
          "p": "Assert on text inside a web component:",
          "c": "page.locator(\"hrms-dashboard-widget\").get_by_text(\"3 pending approvals\").is_visible()"
        }
      ]
    }
  ],
  "contentMarkdown": "Piercing shadow DOM Playwright's locators automatically pierce open shadow DOM by default — no special syntax needed in most cases: # Works transparently even if \"custom-button\" uses shadow DOM internally page.locator(\"custom-button\").get_by_text(\"Submit\").click() Pointers: This \"just works\" behavior is a genuine advantage over older tools, which often required manually accessing .shadowRoot via J\n\n## Piercing shadow DOM\n\nPlaywright's locators automatically pierce open shadow DOM by default — no special syntax needed in most cases:\n\nPointers: This \"just works\" behavior is a genuine advantage over older tools, which often required manually accessing .shadowRoot via JavaScript execution to reach shadow DOM content at all.\n\n```\n# Works transparently even if \"custom-button\" uses shadow DOM internally\npage.locator(\"custom-button\").get_by_text(\"Submit\").click()\n```\n\n## Handling custom web components\n\nFor components built with frameworks like Lit or native Web Components (common in design systems), the same role/text-based locators from Chapter 5 generally still apply, since they operate on the accessibility tree rather than raw DOM structure:\n\ncustom <my-button> element\n\nPointers: Closed shadow roots (a stricter encapsulation mode some components use deliberately to prevent external access) are the one case Playwright genuinely cannot pierce — this is a rare, deliberate choice by component authors, and if you hit it, there's no workaround short of the app changing that setting.\n\n```\npage.get_by_role(\"button\", name=\"Save changes\").click()  # works even inside a\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
