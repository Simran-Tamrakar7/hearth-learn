import type { ChapterRecord } from "../../../types";

/** 10. File Uploads & Downloads */
export const chapter = {
  "id": "pw-2-files",
  "title": "10. File Uploads & Downloads",
  "minutes": 35,
  "level": "intermediate",
  "phase": "Part 2 · Core Interactions",
  "partName": "Part 2 · Core Interactions",
  "overviewText": "Playwright uploads files by calling set_input_files() directly on <input type=\"file\"> elements — bypassing the OS-native file picker dialog entirely. Pass a single path, a list for multi-file inputs, or an empty list to clear. Downloads are captured with page.expect_download() as a context manager (same race-prevention pattern as expect_page): wrap the click that triggers the download, then call save_as() to persist the file and suggested_filename to verify naming logic.",
  "why": "Native file dialogs and download prompts are OS-level UI that browser automation cannot reliably interact with — Playwright sidesteps both by setting files programmatically and intercepting download events. Getting expect_download() registration order wrong loses the download event, producing 'timeout waiting for download' errors that look like app bugs.",
  "when": "Use set_input_files when testing resume uploads, attachment fields, bulk import CSV features, or profile photo changes. Use expect_download for export-to-PDF, report download, and CSV export buttons. Revisit when a hidden file input is triggered by a styled button — set_input_files works even when the input is display:none.",
  "practical": {
    "app": "HRMS — bulk employee import",
    "scenario": "An admin uploads employees.csv via a hidden file input behind a styled 'Import' button. set_input_files('testdata/employees.csv') sets the file without opening the OS picker. After processing, clicking 'Download error report' triggers a CSV download — expect_download() captures it, suggested_filename asserts 'import_errors_2026.csv', and save_as() writes it for content inspection.",
    "pass": "Upload processes 50 rows; error report downloads with correct filename; saved file contains expected error rows.",
    "fail": "Test tries to automate the native macOS file picker with keyboard shortcuts — fails on CI Linux agents with no GUI."
  },
  "advantages": [
    "set_input_files bypasses OS file picker — works headless on CI without GUI",
    "Works on hidden file inputs triggered by custom upload buttons",
    "Multi-file upload via list argument — one call for batch attachments",
    "expect_download captures downloads without browser download-folder configuration",
    "suggested_filename verifies server-side naming logic without parsing Content-Disposition manually",
    "save_as() writes to any path — easy temp-file inspection in tests"
  ],
  "limitations": [
    "set_input_files only works on <input type=\"file\"> — drag-and-drop upload zones need separate API",
    "Large files slow test runs — use minimal fixtures, not production-sized datasets",
    "Download path in CI must be writable — temp directories differ across agents",
    "expect_download must wrap triggering click — same race as expect_page",
    "Virus-scanning middleware on corporate downloads may delay or block expect_download",
    "Content validation requires opening saved file separately — Playwright doesn't parse CSV/PDF"
  ],
  "tools": [
    {
      "name": "Playwright File Upload & Download",
      "sub": "set_input_files / expect_download",
      "url": "https://playwright.dev/python/docs/downloads",
      "desc": "Locator.set_input_files() sets files on file input elements. page.expect_download() returns a Download object with suggested_filename, save_as(path), and path() methods. Both APIs work in headless mode. File paths can be relative to the test file or absolute. Empty list clears a previously selected file.",
      "adv": [
        "No OS dialog automation needed — reliable on all CI platforms",
        "Hidden inputs supported — common pattern for styled upload buttons",
        "Download capture works without configuring browser download directory",
        "suggested_filename available immediately after download event"
      ],
      "lim": [
        "Drag-and-drop file upload requires page.dispatch_event or dedicated drop API",
        "Cannot test 'Cancel' on native save dialog — bypassed entirely",
        "Download content not auto-validated — manual file read required",
        "Very large downloads may timeout expect_download default window"
      ],
      "steps": [
        {
          "t": "Step 1 — Single file upload",
          "p": "Set file on labeled input:",
          "c": "page.get_by_label(\"Upload resume\").set_input_files(\"resume.pdf\")"
        },
        {
          "t": "Step 2 — Multiple files",
          "p": "Pass a list for multi-attach inputs:",
          "c": "page.get_by_label(\"Attach files\").set_input_files([\"file1.png\", \"file2.png\"])"
        },
        {
          "t": "Step 3 — Clear selected file",
          "p": "Empty list resets input:",
          "c": "page.get_by_label(\"Upload resume\").set_input_files([])"
        },
        {
          "t": "Step 4 — Capture download",
          "p": "Wrap triggering click:",
          "c": "with page.expect_download() as download_info:\n    page.get_by_role(\"button\", name=\"Download report\").click()\ndownload = download_info.value"
        },
        {
          "t": "Step 5 — Assert filename and save",
          "p": "Verify naming and persist for inspection:",
          "c": "assert download.suggested_filename == \"report.pdf\"\ndownload.save_as(\"/tmp/report.pdf\")"
        }
      ]
    }
  ],
  "contentMarkdown": "# Single file page.get_by_label(\"Upload resume\").set_input_files(\"resume.pdf\") # Multiple files page.get_by_label(\"Attach files\").set_input_files([\"file1.png\", \"file2.png\"]) # Clear a selected file page.get_by_label(\"Upload resume\").set_input_files([]) This directly sets file(s) on an <input type=\"file\"> element without touching the OS-level native file picker dialog at all. .set_input_files(paths\n\n## Overview\n\nThis directly sets file(s) on an <input type=\"file\"> element without touching the OS-level native file picker dialog at all.\n\n.set_input_files(paths)\n\nWhat it does: Sets file(s) on a file input element directly, bypassing the native OS file picker dialog.\n\nTypes/params:\n\nPointers: Works even on hidden file inputs (a styled \"Upload\" button triggering a hidden <input type=\"file\">) — no OS-level automation needed.\n\ndownload = download_info.value\n\nAs with new-tab handling, the with ... expect_download() pattern registers the listener before the triggering click.\n\n```\n# Single file\n\npage.get_by_label(\"Upload resume\").set_input_files(\"resume.pdf\")\n\n# Multiple files\n\npage.get_by_label(\"Attach files\").set_input_files([\"file1.png\", \"file2.png\"])\n\n# Clear a selected file\n\npage.get_by_label(\"Upload resume\").set_input_files([])\n\nwith page.expect_download() as download_info:\n\npage.get_by_role(\"button\", name=\"Download report\").click()\n\nprint(download.suggested_filename)\n\ndownload.save_as(\"/path/to/save/report.pdf\")\n```\n\n## page.expect_download()\n\nWhat it does: Context manager that captures a triggered file download.\n\nTypes/params:\n\nPointers: Must wrap the triggering click, same race-condition reasoning as expect_page().\n\nWhat it does: Saves the downloaded file to a chosen path / exposes the browser's suggested filename.\n\nTypes/params:\n\nPointers: Check suggested_filename to assert naming logic; save and inspect contents when you need to verify actual file data, not just that a download happened.\n\n```\ndownload.save_as(path) / download.suggested_filename\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
