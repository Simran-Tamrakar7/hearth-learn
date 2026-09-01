import type { ChapterRecord } from "../../../types";

/** 5. Locators Deep Dive */
export const chapter = {
  "id": "pw-2-locators",
  "title": "5. Locators Deep Dive",
  "minutes": 60,
  "level": "beginner",
  "phase": "Part 2 · Core Interactions",
  "partName": "Part 2 · Core Interactions",
  "overviewText": "Locators are the most important skill in Playwright — nearly every flake, timeout, and maintenance burden traces back to how elements are found. User-facing locators (get_by_role, get_by_label, get_by_text, get_by_placeholder) match how real users and screen readers identify elements, surviving CSS refactors that break class-based selectors. CSS and XPath via page.locator() remain available as escape hatches. Locators are strict by default (failing when multiple elements match an action), auto-retry until timeout, and support chaining/filtering to narrow scope within forms or sections.",
  "why": "Bad locators are the root cause of most 'Playwright is flaky' complaints. A CSS selector tied to .btn-primary-v2 breaks on the next Tailwind refactor; get_by_role('button', name='Submit') survives because the button's purpose and label rarely change. Mastering locators here pays dividends across every subsequent chapter and every test you ever write.",
  "when": "This is the first chapter of Part 2 — study it thoroughly before Actions, Assertions, or Waits. Revisit whenever a test fails with 'strict mode violation' (locator matched N elements) or when refactoring tests after a UI redesign — usually the fix is a better locator, not a longer timeout.",
  "practical": {
    "app": "SaaS login form — locator refactor",
    "scenario": "A developer renames CSS classes from login-btn to submit-action as part of a design system migration. Tests using page.locator('.login-btn') all fail simultaneously. Tests using page.get_by_role('button', name='Sign in') inside page.get_by_role('form', name='Login') continue passing — the accessible name and role didn't change.",
    "pass": "Post-refactor CI run: role-based locators pass; team deletes brittle CSS selectors from the suite.",
    "fail": "QA adds .submit-action to every test manually — next refactor repeats the same fire drill."
  },
  "advantages": [
    "get_by_role aligns with accessibility — locators double as lightweight a11y checks",
    "Strict mode catches ambiguous locators at development time, not in production user confusion",
    "Auto-retry on locators pairs with auto-waiting on actions — resilient to slow renders",
    "Chaining (form.get_by_label('Password')) scopes searches and reduces accidental matches",
    "Regex name matching handles dynamic labels ('Delete item 42') without index-based fragility",
    "Shadow DOM piercing built in — no special syntax for web component libraries"
  ],
  "limitations": [
    "get_by_label fails when apps skip proper <label> associations — common in hastily built forms",
    "get_by_text is ambiguous when the same string appears multiple times — needs .filter() or parent scope",
    "get_by_placeholder is weaker accessibility — prefer label when markup allows",
    "CSS/XPath escapes tempt teams into implementation-coupled selectors under deadline pressure",
    "Strict mode frustrates beginners who reach for .first instead of tightening the locator",
    "Role/name locators require developers to maintain accessible markup — bad a11y means bad locators"
  ],
  "tools": [
    {
      "name": "Playwright Locators",
      "sub": "User-facing element discovery",
      "url": "https://playwright.dev/python/docs/locators",
      "desc": "Playwright locators are lazy, auto-waiting handles to elements. Created via page.get_by_role(), get_by_label(), get_by_text(), get_by_placeholder(), or page.locator() for CSS/XPath. Each locator re-queries the DOM on every action — stale element references from Selenium-era automation don't exist. Locators can be chained, filtered, and combined with expect() for assertions.",
      "adv": [
        "User-facing locators survive CSS and DOM structure refactors",
        "Built-in strictness prevents clicking the wrong element silently",
        "Auto-retry until timeout — no manual polling loops",
        "Codegen and VS Code extension suggest get_by_role locators from recorded actions"
      ],
      "lim": [
        "Requires accessible markup — broken a11y means broken locators",
        "CSS/XPath still needed for elements without roles or labels",
        "Complex dynamic lists may need .filter(has_text=...) or nth() — easy to overcomplicate",
        "Learning curve from Selenium find_element_by_* habits — discipline required"
      ],
      "steps": [
        {
          "t": "Step 1 — Prefer get_by_role for interactive elements",
          "p": "Buttons, links, checkboxes:",
          "c": "page.get_by_role(\"button\", name=\"Submit\").click()\npage.get_by_role(\"checkbox\", name=\"Remember me\").check()\npage.get_by_role(\"heading\", name=\"Dashboard\", level=1)"
        },
        {
          "t": "Step 2 — Use get_by_label for form fields",
          "p": "Finds input by associated label text:",
          "c": "page.get_by_label(\"Email address\").fill(\"user@example.com\")\npage.get_by_label(\"Password\").fill(\"secret123\")"
        },
        {
          "t": "Step 3 — Chain locators to narrow scope",
          "p": "Scope within a form section:",
          "c": "form = page.get_by_role(\"form\", name=\"Login\")\nform.get_by_label(\"Password\").fill(\"secret\")\nform.get_by_role(\"button\", name=\"Sign in\").click()"
        },
        {
          "t": "Step 4 — Handle ambiguous text with filter",
          "p": "When get_by_text matches multiple elements:",
          "c": "page.get_by_role(\"listitem\").filter(has_text=\"Pending\").get_by_role(\"button\", name=\"Approve\").click()"
        },
        {
          "t": "Step 5 — Escape to CSS only when necessary",
          "p": "Last resort for elements without accessible names:",
          "c": "page.locator(\"[data-testid='legacy-widget']\").click()\n# Prefer data-testid over auto-generated CSS classes"
        }
      ]
    }
  ],
  "contentMarkdown": "The most important chapter in the manual. Prefer user-facing locators (role, label, text) over brittle CSS/XPath so tests survive markup refactors.\n\n## Why locators are the whole game\n\nThis is the most important chapter in the entire manual — nearly everything else builds on writing good locators.\n\nThese are “user-facing” locators — they find elements the way a real user (or screen reader) would identify them, rather than by internal implementation details like CSS classes. This is deliberate philosophy, not just convenience: implementation details (class names, DOM structure) change often as developers refactor CSS/markup, but the role and visible text of a button rarely change. Locators built on them break far less often.\n\n## get_by_role — ARIA role + accessible name\n\nFinds an element by its ARIA role and optionally its accessible name. Best-practice default — matches how screen readers see the page, so it doubles as a light accessibility check.\n\nCommon roles: button, link, checkbox, textbox, heading, listitem, row. Optional name can be a string or regex (e.g. re.compile(\"Delete.*\")). Use exact=True when substring matching is too loose. For headings, level=1..6 narrows to a specific level. For checkboxes/radios, checked=True/False filters by state.\n\n```\npage.get_by_role(\"button\", name=\"Submit\").click()\npage.get_by_role(\"link\", name=\"Home\").click()\npage.get_by_role(\"checkbox\", name=\"Remember me\").check()\npage.get_by_role(\"heading\", name=\"Dashboard\", level=1)\n```\n\n## get_by_text, get_by_label, get_by_placeholder\n\nget_by_text finds an element containing specific visible text. Good for non-interactive content checks (confirmation messages). Can be ambiguous when text repeats — combine with .filter() or a parent scope.\n\nget_by_label finds a form input by its associated <label> text. Requires proper label markup; if the app skips labels, this won’t work and you’ll need placeholder or CSS.\n\nget_by_placeholder finds an input by its placeholder attribute. Handy when labels are missing, but placeholders are weaker a11y signals than real labels.\n\n```\npage.get_by_text(\"Welcome back\").is_visible()\npage.get_by_label(\"Email address\").fill(\"user@example.com\")\npage.get_by_placeholder(\"Search products...\").fill(\"laptop\")\n```\n\n## CSS, XPath, chaining, and strictness\n\nCSS and XPath still work via page.locator(...) when you must target implementation details — treat them as escapes, not defaults.\n\nChaining and filtering let you narrow: locate a section, then a button inside it. Playwright locators are strict by default when an action would hit multiple elements — that’s a feature. Tighten the locator instead of grabbing .first unless you truly mean “any of these.”\n\nLocators auto-retry until timeout while waiting for the element to become actionable — which is why good locators plus auto-waiting beat sleep-based scripts.\n\n```\nform = page.get_by_role(\"form\", name=\"Login\")\nform.get_by_label(\"Password\").fill(\"secret\")\nform.get_by_role(\"button\", name=\"Sign in\").click()\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
