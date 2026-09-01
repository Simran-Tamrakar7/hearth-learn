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
  "contentMarkdown": "Click, fill, check, select, hover, keyboard — every action auto-waits for actionability before running.\n\n## Clicks and fills\n\nclick() waits until the target is actionable, then clicks the center (or a position you specify). Prefer role/name locators so you’re clicking what the user sees.\n\nfill() clears the field and sets the value in one shot — usually what you want for forms. type() / press_sequentially() send keystrokes and are better when the app listens to individual input events.\n\n```\npage.get_by_role(\"button\", name=\"Submit\").click()\npage.get_by_label(\"Email\").fill(\"you@example.com\")\n```\n\n## Checks, selects, hover, keyboard\n\ncheck() / uncheck() are for checkboxes and radios. select_option() works with <select> by value, label, or index. hover() is useful before menus that only appear on mouseover.\n\nkeyboard.press and locator.press cover shortcuts (Control+A, Enter). Prefer locator-targeted presses when focus matters.\n\n```\npage.get_by_label(\"Remember me\").check()\npage.get_by_label(\"Country\").select_option(label=\"Nepal\")\npage.get_by_role(\"button\", name=\"Account\").hover()\npage.get_by_placeholder(\"Search\").press(\"Enter\")\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
