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
  "contentMarkdown": "## Ch10 File Uploads and Downloads\n\nFile inputs and download links are common in HR portals, document managers, and reporting tools. Playwright bypasses the OS file picker for uploads and intercepts browser downloads without touching the filesystem dialog.\n\n---\n\n### locator.set_input_files()\n\n**What it does:** Sets file(s) on an `<input type=\"file\">` element directly, without opening the native OS file picker.\n\n**Types/params:**\n- `files` (str | Path | list): File path(s) relative to test dir or absolute. Pass `[]` to clear.\n- `timeout` (float): Action timeout.\n\n**Pointers:**\n- Works on **hidden** file inputs — the common pattern of a styled \"Upload\" button triggering a hidden `<input type=\"file\">`.\n- Use absolute paths or paths relative to the test file when files live in a `fixtures/` folder.\n- Multiple files: pass a list for `<input multiple>`.\n- No OS-level automation needed — CI-friendly.\n\n```python\n# Single file\npage.get_by_label(\"Upload resume\").set_input_files(\"fixtures/resume.pdf\")\n\n# Multiple files\npage.get_by_label(\"Attach files\").set_input_files([\"fixtures/doc1.png\", \"fixtures/doc2.png\"])\n\n# Clear selection\npage.get_by_label(\"Upload resume\").set_input_files([])\n\n# Hidden input behind a custom button\npage.locator(\"input[type='file']\").set_input_files(\"fixtures/avatar.jpg\")\npage.get_by_role(\"button\", name=\"Upload\").click()\nexpect(page.get_by_text(\"Upload complete\")).to_be_visible()\n```\n\n---\n\n### page.expect_download()\n\n**What it does:** Context manager that captures a file download triggered by a subsequent action (click on a download link/button).\n\n**Types/params:**\n- `predicate` (callable, optional): Filter downloads by URL or suggested filename.\n- `timeout` (float): Max wait for download to start.\n\n**Pointers:**\n- **Must wrap the triggering click** — same race-condition rule as `expect_page()`.\n- Returns a `Download` object via `.value`.\n- Download may still be in progress when captured — use `save_as` or `path()` to wait for completion.\n\n```python\nwith page.expect_download() as download_info:\n    page.get_by_role(\"button\", name=\"Download report\").click()\ndownload = download_info.value\nprint(download.suggested_filename)\ndownload.save_as(\"output/report.pdf\")\n```\n\n---\n\n### download.save_as() and related APIs\n\n**What it does:**\n- `save_as(path)`: Writes the downloaded file to a specified path on disk.\n- `suggested_filename`: Browser-suggested name (from `Content-Disposition` or link).\n- `path()`: Waits for download to finish and returns temp path (auto-deleted when object is garbage-collected).\n\n**Types/params:**\n- `save_as(path)`: `str` or `Path` — destination file path.\n\n**Pointers:**\n- Assert `suggested_filename` to verify naming logic without reading file bytes.\n- `save_as` then open/parse the file when content matters (CSV rows, PDF text).\n- Clean up saved files in test teardown or use pytest `tmp_path`.\n\n```python\nwith page.expect_download() as download_info:\n    page.get_by_role(\"link\", name=\"Export CSV\").click()\ndownload = download_info.value\n\nassert download.suggested_filename == \"employees-2026-09.csv\"\ndownload.save_as(tmp_path / \"employees.csv\")\n\ncontent = (tmp_path / \"employees.csv\").read_text()\nassert \"email,department\" in content\n```\n\n---\n\n### End-to-end upload + verify pattern\n\n```python\ndef test_bulk_import(page):\n    page.goto(\"/admin/import\")\n    page.get_by_label(\"CSV file\").set_input_files(\"fixtures/employees.csv\")\n    page.get_by_role(\"button\", name=\"Import\").click()\n    expect(page.get_by_role(\"alert\")).to_contain_text(\"42 records imported\")\n    expect(page.get_by_role(\"row\")).to_have_count(42)\n```\n\n**Pointers:** Upload tests need fixture files committed to the repo. Download tests need a writable temp directory — `tmp_path` in pytest is ideal.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
