---
id: "pw-2-files"
title: "10. File Uploads & Downloads"
minutes: 35
partName: "Part 2 · Core Interactions"
level: "intermediate"
---

# Single file page.get_by_label("Upload resume").set_input_files("resume.pdf") # Multiple files page.get_by_label("Attach files").set_input_files(["file1.png", "file2.png"]) # Clear a selected file page.get_by_label("Upload resume").set_input_files([]) This directly sets file(s) on an <input type="file"> element without touching the OS-level native file picker dialog at all. .set_input_files(paths

## Overview

This directly sets file(s) on an <input type="file"> element without touching the OS-level native file picker dialog at all.

.set_input_files(paths)

What it does: Sets file(s) on a file input element directly, bypassing the native OS file picker dialog.

Types/params:

Pointers: Works even on hidden file inputs (a styled "Upload" button triggering a hidden <input type="file">) — no OS-level automation needed.

download = download_info.value

As with new-tab handling, the with ... expect_download() pattern registers the listener before the triggering click.

```
# Single file

page.get_by_label("Upload resume").set_input_files("resume.pdf")

# Multiple files

page.get_by_label("Attach files").set_input_files(["file1.png", "file2.png"])

# Clear a selected file

page.get_by_label("Upload resume").set_input_files([])

with page.expect_download() as download_info:

page.get_by_role("button", name="Download report").click()

print(download.suggested_filename)

download.save_as("/path/to/save/report.pdf")
```

## page.expect_download()

What it does: Context manager that captures a triggered file download.

Types/params:

Pointers: Must wrap the triggering click, same race-condition reasoning as expect_page().

What it does: Saves the downloaded file to a chosen path / exposes the browser's suggested filename.

Types/params:

Pointers: Check suggested_filename to assert naming logic; save and inspect contents when you need to verify actual file data, not just that a download happened.

```
download.save_as(path) / download.suggested_filename
```