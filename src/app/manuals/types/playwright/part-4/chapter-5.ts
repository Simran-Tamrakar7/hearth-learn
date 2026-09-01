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
  "contentMarkdown": "## What Is Shadow DOM?\n\nMany modern component libraries (Lit, Stencil, Shoelace, some Angular and Web Components) encapsulate their markup inside a **Shadow DOM** — a hidden subtree attached to a host element. Styles and structure inside the shadow root are isolated from the main document.\n\nPlaywright's locators **automatically pierce open shadow roots**. You do not need special syntax for most components.\n\n## Auto-Pierce with Standard Locators\n\n```python\ndef test_shoelace_button(page):\n    page.goto(\"/components\")\n    # Playwright pierces the open shadow root automatically\n    page.get_by_role(\"button\", name=\"Save\").click()\n    expect(page.get_by_text(\"Saved successfully\")).to_be_visible()\n```\n\nRole, text, and label locators traverse open shadow boundaries transparently. Write tests the same way you would for light DOM.\n\n## Custom Web Components\n\nA typical web component renders inside `#shadow-root (open)`:\n\n```html\n<user-card data-testid=\"card-1\">\n  #shadow-root (open)\n    <div class=\"card\">\n      <h2>Alice</h2>\n      <button>View profile</button>\n    </div>\n</user-card>\n```\n\nTest it with familiar locators:\n\n```python\ndef test_user_card(page):\n    page.goto(\"/team\")\n    card = page.get_by_test_id(\"card-1\")\n    expect(card.get_by_role(\"heading\", name=\"Alice\")).to_be_visible()\n    card.get_by_role(\"button\", name=\"View profile\").click()\n```\n\nScoping locators to the host element (`card.get_by_role(...)`) narrows the search and avoids matching similar elements elsewhere on the page.\n\n## Piercing Nested Shadow Roots\n\nComponents can nest shadow roots (a card inside a list inside a panel). Playwright pierces all open shadow boundaries in the chain:\n\n```python\ndef test_nested_components(page):\n    page.goto(\"/dashboard\")\n    panel = page.locator(\"dashboard-panel\")\n    expect(panel.get_by_text(\"Revenue\")).to_be_visible()\n    panel.get_by_role(\"button\", name=\"Refresh\").click()\n```\n\n## Closed Shadow Roots\n\nSome components use `mode: 'closed'` in `attachShadow()`. Closed roots are intentionally hidden from `element.shadowRoot` and cannot be pierced by any automation tool — this is by design in the Web Components spec.\n\nStrategies for closed shadow DOM:\n\n1. **Ask the development team** to switch to `mode: 'open'` for testability — the most sustainable fix.\n2. **Use wrapper attributes** — if the team adds `data-testid` on the host element, interact via events on the host itself.\n3. **Test via API or public methods** — some components expose a JavaScript API on the host element.\n4. **Avoid testing implementation details** — test the component's observable output (text, events, ARIA attributes on the host) rather than internal shadow markup.\n\n```python\n# closed shadow — pierce fails; interact with the host\ndef test_closed_component_via_host(page):\n    page.goto(\"/app\")\n    host = page.locator(\"secure-input\")\n    host.click()  # focuses the host; keyboard events may propagate inside\n    page.keyboard.type(\"hello\")\n    expect(host).to_have_attribute(\"value\", \"hello\")\n```\n\n## locator() vs pierce Selector\n\nFor advanced cases, CSS `>>>` and `>>` pierce shadow DOM in selector strings:\n\n```python\npage.locator(\"user-card\").locator(\"css=button.save\").click()\n```\n\nPrefer role and label locators over deep CSS chains — they survive internal refactors.\n\n## iframe + Shadow DOM\n\nIf a component lives inside an iframe **and** uses shadow DOM, combine `frame_locator` with standard locators:\n\n```python\nframe = page.frame_locator(\"#widget-iframe\")\nframe.get_by_role(\"button\", name=\"Submit\").click()\n```\n\nPlaywright pierces shadow roots inside frames automatically.\n\n## Key Takeaways\n\n- Open shadow DOM is transparent — use normal `get_by_role`, `get_by_text`, and `get_by_test_id` locators.\n- Scope locators to the host element for precision in complex pages.\n- Closed shadow roots cannot be pierced — negotiate `mode: 'open'` or test via the host element.\n- Combine `frame_locator` with shadow-piercing locators for iframe-embedded components.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
