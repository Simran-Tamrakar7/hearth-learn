import type { ChapterRecord } from "../../types";

/** 9. Tabs, Windows, iFrames */
export const chapter = {
  "id": "pw-2-tabs",
  "title": "9. Tabs, Windows, iFrames",
  "minutes": 40,
  "level": "intermediate",
  "phase": "Part 2 · Core Interactions",
  "partName": "Part 2 · Core Interactions",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "with page.context.expect_page() as new_page_info: page.get_by_role(\"link\", name=\"Open in new tab\").click() new_page = new_page_info.value new_page.wait_for_load_state() print(new_page.title()) The with ... expect_page() pattern registers the listener for the new page event before the click happens, avoiding a race condition where the new tab opens before you started listening for it.\n\n## Overview\n\nnew_page = new_page_info.value\n\nThe with ... expect_page() pattern registers the listener for the new page event before the click happens, avoiding a race condition where the new tab opens before you started listening for it.\n\n```\nwith page.context.expect_page() as new_page_info:\n\npage.get_by_role(\"link\", name=\"Open in new tab\").click()\n\nnew_page.wait_for_load_state()\n\nprint(new_page.title())\n```\n\n## page.context.expect_page()\n\nWhat it does: Context manager that captures a reference to a newly opened tab/page.\n\nTypes/params:\n\nPointers: Must wrap the action that triggers the new tab — registering after the click risks missing the event.\n\nOnce you have references to multiple pages, you simply call actions on whichever page object represents the tab you want — there's no \"switch to window\" concept like Selenium's\n\ntimes.\n\n```\noriginal_page.bring_to_front()   # optional — brings a page to the foreground visually\n\nnew_page.get_by_role(\"button\", name=\"Confirm\").click()\n\ndriver.switch_to.window(), since each Page object is independently addressable at all\n```\n\n## page.bring_to_front()\n\nWhat it does: Brings a specific page/tab to the visual foreground.\n\nTypes/params: No parameters.\n\nPointers: Mostly cosmetic for headed debugging — not required to interact with a background tab programmatically.\n\nframe = page.frame_locator(\"#payment-iframe\")\n\nCommon real-world case: third-party payment widgets (Stripe, PayPal) are almost always embedded via iframe for security/PCI-compliance reasons.\n\n```\nframe.get_by_label(\"Card number\").fill(\"4242 4242 4242 4242\")\n\nframe.get_by_role(\"button\", name=\"Pay\").click()\n```\n\n## page.frame_locator(selector)\n\nWhat it does: Returns a locator scoped inside a specific iframe.\n\nTypes/params:\n\ncontents)\n\nPointers: Required any time content lives inside an <iframe>. Chain for nested iframes: .frame_locator(\"#outer\").frame_locator(\"#inner\").",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
