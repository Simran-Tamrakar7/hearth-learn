import type { ChapterRecord } from "../../types";

/** 10. File Uploads & Downloads */
export const chapter = {
  "id": "pw-2-files",
  "title": "10. File Uploads & Downloads",
  "minutes": 35,
  "level": "intermediate",
  "phase": "Part 2 · Core Interactions",
  "partName": "Part 2 · Core Interactions",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "# Single file page.get_by_label(\"Upload resume\").set_input_files(\"resume.pdf\") # Multiple files page.get_by_label(\"Attach files\").set_input_files([\"file1.png\", \"file2.png\"]) # Clear a selected file page.get_by_label(\"Upload resume\").set_input_files([]) This directly sets file(s) on an <input type=\"file\"> element without touching the OS-level native file picker dialog at all. .set_input_files(paths\n\n## Overview\n\nThis directly sets file(s) on an <input type=\"file\"> element without touching the OS-level native file picker dialog at all.\n\n.set_input_files(paths)\n\nWhat it does: Sets file(s) on a file input element directly, bypassing the native OS file picker dialog.\n\nTypes/params:\n\nPointers: Works even on hidden file inputs (a styled \"Upload\" button triggering a hidden <input type=\"file\">) — no OS-level automation needed.\n\ndownload = download_info.value\n\nAs with new-tab handling, the with ... expect_download() pattern registers the listener before the triggering click.\n\n```\n# Single file\n\npage.get_by_label(\"Upload resume\").set_input_files(\"resume.pdf\")\n\n# Multiple files\n\npage.get_by_label(\"Attach files\").set_input_files([\"file1.png\", \"file2.png\"])\n\n# Clear a selected file\n\npage.get_by_label(\"Upload resume\").set_input_files([])\n\nwith page.expect_download() as download_info:\n\npage.get_by_role(\"button\", name=\"Download report\").click()\n\nprint(download.suggested_filename)\n\ndownload.save_as(\"/path/to/save/report.pdf\")\n```\n\n## page.expect_download()\n\nWhat it does: Context manager that captures a triggered file download.\n\nTypes/params:\n\nPointers: Must wrap the triggering click, same race-condition reasoning as expect_page().\n\nWhat it does: Saves the downloaded file to a chosen path / exposes the browser's suggested filename.\n\nTypes/params:\n\nPointers: Check suggested_filename to assert naming logic; save and inspect contents when you need to verify actual file data, not just that a download happened.\n\n```\ndownload.save_as(path) / download.suggested_filename\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
