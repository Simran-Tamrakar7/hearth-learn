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
  "contentMarkdown": "## Ch5 Locators Deep Dive\n\nLocators are the foundation of every Playwright test. A well-chosen locator survives CSS refactors, reads like user intent, and pairs with auto-retry so you rarely need manual waits. This chapter covers user-facing locators first, then CSS/XPath escapes, chaining, strictness, and the retry model.\n\n### Why user-facing locators win\n\n`get_by_role`, `get_by_label`, `get_by_text`, and `get_by_placeholder` query the accessibility tree — the same information screen readers use. Class names like `.btn-primary-v2` change every sprint; a button's role and visible label rarely do. Default to user-facing locators; reach for `page.locator()` only when no accessible hook exists.\n\n---\n\n### get_by_role\n\n**What it does:** Finds an element by its ARIA role and optional accessible name. The recommended default for buttons, links, headings, checkboxes, and other interactive controls.\n\n**Types/params:**\n- `role` (str): ARIA role — `\"button\"`, `\"link\"`, `\"textbox\"`, `\"checkbox\"`, `\"heading\"`, `\"listitem\"`, `\"row\"`, etc.\n- `name` (str | Pattern): Accessible name — visible text or `aria-label`. Supports regex via `re.compile(...)`.\n- `exact` (bool): When `True`, name must match exactly, not as substring. Default `False`.\n- `checked` (bool): For checkboxes/radios — filter by checked state.\n- `level` (int): For headings — restrict to `h1`–`h6` via `level=1` etc.\n\n**Pointers:**\n- Prefer over CSS for anything with a meaningful role.\n- Regex names handle dynamic labels: `name=re.compile(r\"Delete item \\d+\")`.\n- If strict mode fires, tighten with a parent scope or `.filter()` — don't blindly add `.first`.\n\n```python\npage.get_by_role(\"button\", name=\"Submit\").click()\npage.get_by_role(\"checkbox\", name=\"Remember me\").check()\npage.get_by_role(\"heading\", name=\"Dashboard\", level=1)\npage.get_by_role(\"link\", name=re.compile(r\"View order #\\d+\"))\n```\n\n---\n\n### get_by_text\n\n**What it does:** Finds an element containing specific visible text. Good for static content, status messages, and table cells.\n\n**Types/params:**\n- `text` (str | Pattern): Text to match. Substring by default.\n- `exact` (bool): Require full text match when `True`.\n\n**Pointers:**\n- Ambiguous on pages where the same string appears twice — scope with a parent locator or use `.filter(has_text=...)`.\n- Pair with `expect(...).to_contain_text()` for assertions; use `get_by_text` when you need to click or interact.\n\n```python\npage.get_by_text(\"Payment confirmed\").is_visible()\npage.get_by_text(\"Pending\", exact=True)\n```\n\n---\n\n### get_by_label\n\n**What it does:** Finds a form control by its associated `<label>` text. The best locator for inputs when markup is correct.\n\n**Types/params:**\n- `text` (str | Pattern): Label text (or `aria-label` on the input).\n- `exact` (bool): Full label match when `True`.\n\n**Pointers:**\n- Requires proper `<label for=\"...\">` or wrapping label markup. Broken labels mean this won't work — fall back to placeholder or `data-testid`.\n- Chain inside a form scope to avoid cross-form collisions.\n\n```python\npage.get_by_label(\"Email address\").fill(\"user@example.com\")\nform = page.get_by_role(\"form\", name=\"Login\")\nform.get_by_label(\"Password\").fill(\"secret\")\n```\n\n---\n\n### get_by_placeholder\n\n**What it does:** Finds an input by its `placeholder` attribute.\n\n**Types/params:**\n- `text` (str | Pattern): Placeholder string.\n- `exact` (bool): Full match when `True`.\n\n**Pointers:**\n- Weaker accessibility signal than a real label — use only when labels are missing.\n- Placeholders disappear once the user types; don't rely on them for post-fill assertions.\n\n```python\npage.get_by_placeholder(\"Search products...\").fill(\"laptop\")\n```\n\n---\n\n### page.locator\n\n**What it does:** Creates a locator from a CSS selector, XPath string, or existing locator. Escape hatch when role/label/text aren't available.\n\n**Types/params:**\n- `selector` (str): CSS (`\"#id\"`, `\"[data-testid='x']\"`) or XPath (`\"xpath=//div[@class='foo']\"`).\n- Chaining: `parent_locator.locator(\".child\")` scopes the search.\n\n**Pointers:**\n- Prefer `data-testid` over auto-generated CSS classes.\n- XPath is powerful but brittle — last resort.\n- `page.locator(\"text=Submit\")` exists but `get_by_text` is clearer.\n\n```python\npage.locator(\"[data-testid='legacy-widget']\").click()\nrow = page.locator(\"tr\", has_text=\"Jane Doe\")\nrow.locator(\"button\", has_text=\"Edit\").click()\n```\n\n---\n\n### filter, nth, first, last\n\n**What it does:** Narrows a locator set to one element or a subset.\n\n**Types/params:**\n- `.filter(has_text=..., has=...)`: Keep elements matching extra criteria or containing a child.\n- `.nth(index)`: Zero-based index into the match set.\n- `.first` / `.last`: Shorthand for index 0 and final match.\n\n**Pointers:**\n- `.first` silences strict-mode errors but may click the wrong row — prefer `.filter()` with unique text.\n- `.nth(2)` is fragile when list order changes; filter by stable content instead.\n\n```python\npage.get_by_role(\"listitem\").filter(has_text=\"Pending\").get_by_role(\"button\", name=\"Approve\").click()\npage.get_by_role(\"row\").filter(has=page.get_by_text(\"john@example.com\")).get_by_role(\"button\", name=\"Delete\").click()\n```\n\n---\n\n### Strictness\n\n**What it does:** By default, an action on a locator that matches multiple elements raises a strict mode violation instead of picking one silently.\n\n**Types/params:**\n- Strict mode is on by default for actions (`click`, `fill`, etc.).\n- Disable per-call with `force=True` (skips actionability too — avoid unless intentional).\n\n**Pointers:**\n- Strict mode is a feature: it catches ambiguous locators at dev time.\n- Fix by scoping, filtering, or using a more specific `name` — not by sprinkling `.first`.\n\n```python\n# Fails if two \"Submit\" buttons exist — good\npage.get_by_role(\"button\", name=\"Submit\").click()\n```\n\n---\n\n### Auto-retry\n\n**What it does:** Locators re-query the DOM on every action and assertion until the element is found and actionable, or the timeout expires.\n\n**Types/params:**\n- Default timeout: 30 seconds (configurable via `page.set_default_timeout()` or test config).\n- Applies to actions and `expect()` assertions — not bare Python `assert`.\n\n**Pointers:**\n- No stale-element exceptions — locators are lazy handles, not cached DOM nodes.\n- Flaky tests with good locators usually mean a real timing/overlay bug, not \"Playwright needs more wait.\"\n\n```python\n# Re-queries until visible and enabled, then clicks\npage.get_by_role(\"button\", name=\"Save\").click()\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
