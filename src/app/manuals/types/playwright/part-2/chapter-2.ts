import type { ChapterRecord } from "../../../types";

/** 6. Actions */
export const chapter = {
  "id": "pw-2-actions",
  "title": "6. Actions",
  "minutes": 45,
  "level": "beginner",
  "phase": "Part 2 · Core Interactions",
  "partName": "Part 2 · Core Interactions",
  "overviewText": "Playwright actions — click, fill, check, select_option, hover, and keyboard presses — all auto-wait for actionability before executing. fill() clears and sets an input value in one call; type() and press_sequentially() send individual keystrokes for apps that listen to input events. check()/uncheck() handle checkboxes and radios; select_option() works with native <select> elements; hover() reveals menus that appear on mouseover; keyboard.press() and locator.press() cover shortcuts like Enter and Control+A.",
  "why": "Actions are how tests interact with the app — but the critical insight is that Playwright waits automatically. You don't call click() and hope the button is ready; Playwright verifies attached, visible, stable, enabled, and not obscured first. Knowing when to use fill vs type, or hover before click, prevents the most common interaction failures on real-world UIs.",
  "when": "Apply this chapter immediately after mastering locators (Chapter 5). Reference it when a click times out (usually a locator or overlay issue, not a missing wait), when a React form doesn't respond to fill() (try press_sequentially), or when dropdown menus require hover before the target option appears.",
  "practical": {
    "app": "HRMS attendance — filter dropdown",
    "scenario": "An attendance report page has a 'Department' dropdown that only renders options after hovering the filter icon. A naive click on 'Engineering' fails because the menu isn't open. The test hovers the filter trigger, then clicks the option — Playwright auto-waits for actionability at each step.",
    "pass": "hover() on filter icon → click('Engineering') → table filters to engineering rows within timeout.",
    "fail": "Direct click on hidden menu item times out with 'element is not visible' — developer adds time.sleep(2) instead of hover()."
  },
  "advantages": [
    "Every action runs the full actionability checklist before executing — no separate wait calls",
    "fill() is faster and more reliable than simulating keystrokes for standard form inputs",
    "press_sequentially() and type() handle autocomplete and masked inputs that ignore fill()",
    "select_option() accepts value, label, or index — flexible for legacy <select> elements",
    "locator.press('Enter') submits forms without locating a submit button",
    "hover() unlocks menus, tooltips, and reveal-on-hover UI patterns common in admin dashboards"
  ],
  "limitations": [
    "fill() doesn't trigger input/change events some React controlled components require — use press_sequentially",
    "Custom dropdown components (not native <select>) need click-based interaction, not select_option",
    "hover()-dependent UI won't work in touch-only mobile emulation — design tests accordingly",
    "keyboard.press sends to focused element — wrong focus causes actions on unexpected fields",
    "Double-click, drag, and right-click exist but aren't covered here — see Playwright input docs",
    "Actions on obscured elements fail even if 'visible' in DOM — spinner overlays are a common culprit"
  ],
  "tools": [
    {
      "name": "Playwright Actions API",
      "sub": "Interaction methods",
      "url": "https://playwright.dev/python/docs/input",
      "desc": "Playwright's action methods live on Locator objects. click(), dblclick(), fill(), press_sequentially(), check(), uncheck(), select_option(), hover(), and press() each wait for actionability, perform the interaction, and trigger appropriate DOM events. force=True skips actionability checks — use only when you genuinely intend to click hidden elements.",
      "adv": [
        "Auto-wait built into every action — no manual WebDriverWait equivalent",
        "fill() clears existing value before typing — idempotent form resets",
        "Position clicks (click(position={x,y})) for canvas or custom widgets",
        "Modifier keys (Shift, Control, Meta) supported in press() strings"
      ],
      "lim": [
        "force=True clicks through overlays — hides real UX bugs users would hit",
        "No native file-picker dialog interaction — use set_input_files (Chapter 10)",
        "Drag-and-drop API separate from click — complex DnD needs dedicated methods",
        "Touch actions (tap) require mobile emulation context for realistic behavior"
      ],
      "steps": [
        {
          "t": "Step 1 — Click and fill basics",
          "p": "Standard form interaction:",
          "c": "page.get_by_role(\"button\", name=\"Submit\").click()\npage.get_by_label(\"Email\").fill(\"you@example.com\")"
        },
        {
          "t": "Step 2 — Checkbox and select",
          "p": "Boolean and dropdown controls:",
          "c": "page.get_by_label(\"Remember me\").check()\npage.get_by_label(\"Country\").select_option(label=\"Nepal\")"
        },
        {
          "t": "Step 3 — Hover for reveal menus",
          "p": "Open menu before clicking item:",
          "c": "page.get_by_role(\"button\", name=\"Account\").hover()\npage.get_by_role(\"menuitem\", name=\"Settings\").click()"
        },
        {
          "t": "Step 4 — Keyboard shortcuts",
          "p": "Submit search or select-all:",
          "c": "page.get_by_placeholder(\"Search\").press(\"Enter\")\npage.get_by_label(\"Notes\").press(\"Control+A\")"
        },
        {
          "t": "Step 5 — When fill() fails, try keystrokes",
          "p": "React controlled inputs that ignore programmatic value set:",
          "c": "page.get_by_label(\"Phone\").click()\npage.get_by_label(\"Phone\").press_sequentially(\"9801234567\", delay=50)"
        }
      ]
    }
  ],
  "contentMarkdown": "## Ch6 Actions\n\nPlaywright actions run the full actionability checklist before executing: attached, visible, stable, enabled, and not obscured. You rarely call a separate wait before `click()` — trust auto-waiting unless you have a specific state to poll for (Chapter 8).\n\n---\n\n### click\n\n**What it does:** Performs a single left-click on the element.\n\n**Types/params:**\n- `button` (str): `\"left\"`, `\"right\"`, or `\"middle\"`. Default `\"left\"`.\n- `click_count` (int): Number of clicks. Default 1.\n- `delay` (float): Milliseconds between mousedown and mouseup.\n- `force` (bool): Skip actionability checks. Default `False`.\n- `position` (dict): `{\"x\": 10, \"y\": 5}` offset from top-left for canvas/custom widgets.\n- `modifiers` (list): `[\"Shift\"]`, `[\"Control\"]`, etc.\n\n**Pointers:**\n- Timeouts usually mean wrong locator or an overlay — not \"needs more sleep.\"\n- `force=True` hides real UX bugs; use only for hidden inputs or known-safe cases.\n\n```python\npage.get_by_role(\"button\", name=\"Submit\").click()\npage.get_by_role(\"button\", name=\"Options\").click(button=\"right\")\n```\n\n---\n\n### dblclick\n\n**What it does:** Double-clicks the element.\n\n**Types/params:** Same options as `click` (minus `click_count`).\n\n**Pointers:** Uncommon in modern web apps — verify the UI actually uses dblclick before writing tests for it.\n\n```python\npage.get_by_text(\"Rename\").dblclick()\n```\n\n---\n\n### fill vs type (press_sequentially)\n\n**What it does:**\n- `fill(value)`: Clears the field, then sets the value in one shot. Fast and reliable for standard inputs.\n- `press_sequentially(text)` (formerly `type`): Sends individual keystrokes with optional delay — triggers `input`/`keydown` events per character.\n\n**Types/params:**\n- `fill`: `value` (str), optional `force`, `timeout`.\n- `press_sequentially`: `text` (str), optional `delay` (ms between keys).\n\n**Pointers:**\n- Default to `fill` for forms.\n- Use `press_sequentially` when React/Vue controlled components ignore `fill`, or for autocomplete/typeahead that listens per keystroke.\n- `fill` does not press Enter — call `press(\"Enter\")` separately to submit.\n\n```python\npage.get_by_label(\"Email\").fill(\"user@example.com\")\npage.get_by_label(\"Search\").press_sequentially(\"play\", delay=100)  # autocomplete\n```\n\n---\n\n### press\n\n**What it does:** Presses a key or key combination on the element (or focused element).\n\n**Types/params:**\n- `key` (str): `\"Enter\"`, `\"Tab\"`, `\"Control+A\"`, `\"Meta+Shift+P\"`, etc.\n\n**Pointers:**\n- Submits forms: `locator.press(\"Enter\")` without finding the submit button.\n- Clears fields: `press(\"Control+A\")` then `fill(\"new value\")`.\n\n```python\npage.get_by_label(\"Password\").fill(\"secret\")\npage.get_by_label(\"Password\").press(\"Enter\")\n```\n\n---\n\n### check / uncheck\n\n**What it does:** Sets checkbox or radio state. `check` ensures checked; `uncheck` ensures unchecked.\n\n**Types/params:**\n- `force`, `timeout`, `position` — same as click.\n\n**Pointers:**\n- Prefer `get_by_role(\"checkbox\", name=\"...\")` over raw input selectors.\n- Radios: `check` selects; you don't `uncheck` a radio — click a different one.\n\n```python\npage.get_by_role(\"checkbox\", name=\"Accept terms\").check()\npage.get_by_role(\"checkbox\", name=\"Newsletter\").uncheck()\n```\n\n---\n\n### select_option\n\n**What it does:** Selects option(s) in a native `<select>` element.\n\n**Types/params:**\n- `value` (str | list): Match `value` attribute.\n- `label` (str | list): Match visible option text.\n- `index` (int | list): Zero-based option index.\n\n**Pointers:**\n- Only works on native `<select>` — custom dropdowns need click-based interaction.\n- Multi-select: pass a list: `select_option(label=[\"Red\", \"Blue\"])`.\n\n```python\npage.get_by_label(\"Country\").select_option(label=\"Canada\")\npage.get_by_label(\"Tags\").select_option(value=[\"js\", \"python\"])\n```\n\n---\n\n### hover\n\n**What it does:** Moves the mouse over the element. Required for menus and tooltips that appear on mouseover.\n\n**Types/params:**\n- `force`, `timeout`, `position` — same as click.\n\n**Pointers:**\n- Hover the trigger, then click the revealed item — two separate locator actions.\n- Touch-only mobile emulation may not support hover-dependent UI.\n\n```python\npage.get_by_role(\"button\", name=\"More\").hover()\npage.get_by_role(\"menuitem\", name=\"Export CSV\").click()\n```\n\n---\n\n### drag_to\n\n**What it does:** Drags the source locator to the target locator.\n\n**Types/params:**\n- `target` (Locator): Destination element.\n- `source_position`, `target_position` (dict): Optional offsets.\n- `force`, `timeout`.\n\n**Pointers:** Kanban boards and sortable lists are the common case. Verify the app uses HTML5 drag or a library that responds to Playwright's drag simulation.\n\n```python\npage.locator(\"#task-42\").drag_to(page.locator(\"#column-done\"))\n```\n\n---\n\n### Keyboard and mouse low-level\n\n**What it does:** `page.keyboard` and `page.mouse` expose raw input for cases locators don't cover.\n\n**Types/params:**\n- `page.keyboard.press(key)`, `.type(text)`, `.down(key)`, `.up(key)`.\n- `page.mouse.move(x, y)`, `.click(x, y)`, `.down()`, `.up()`, `.wheel(delta_x, delta_y)`.\n\n**Pointers:**\n- Sends to whatever element currently has focus — wrong focus = wrong target.\n- Prefer locator methods; low-level API is for canvas, games, or exotic widgets.\n\n```python\npage.keyboard.press(\"Control+K\")  # command palette\npage.mouse.wheel(0, 500)          # scroll down\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
