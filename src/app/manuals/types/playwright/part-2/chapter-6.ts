import type { ChapterRecord } from "../../../types";

/** 18. File Uploads & Downloads */
export const chapter = {
  id: "pw-18-files",
  title: "18. File Uploads & Downloads",
  minutes: 32,
  level: "intermediate",
  phase: "Part 2 · Core Interactions",
  partName: "Part 2 · Core Interactions",
  overviewText: "set_input_files() for uploads (single, multiple, directory), expect_download() for capturing downloads, and verifying suggested_filename and save_as().",
  why: "File upload/download flows appear in HRMS document modules, expense receipts, and export features — common interview and real-project scenarios.",
  when: "Read when testing CSV import, profile photo upload, or PDF export download.",
  practical: { app: "HRMS document upload", scenario: "Upload employee CSV and verify import confirmation.", pass: "page.set_input_files('input[type=file]', 'fixtures/employees.csv') then expect success message.", fail: "Try to type file path into a text input instead of using file chooser." },
  advantages: ["set_input_files() bypasses OS file dialog — headless-safe","Multiple files via list argument","Directory upload with path to folder","expect_download() captures without disk clutter","save_as() writes to specific path for content verification","Works identically in headed and headless CI"],
  limitations: ["Drag-and-drop file upload needs separate evaluate() approach","Custom file-picker UI may hide real input[type=file]","Large files slow upload tests — use small fixtures","Download path permissions differ across CI agents","Some browsers prompt on download — expect_download handles it","Cloud storage direct-upload flows bypass input[type=file]"],
  tools: [],
  contentMarkdown: "## 18. File Uploads & Downloads\n\n.set_input_files() sets files on an input directly, bypassing the OS picker.\n```python\npage.get_by_label(\"Upload resume\").set_input_files(\"resume.pdf\")\npage.get_by_label(\"Attach files\").set_input_files([\"file1.png\", \"file2.png\"])\npage.get_by_label(\"Upload resume\").set_input_files([])  # clear selection\n```\n\n\npaths accepts a single string path (uploads one file), a list of string paths (uploads multiple, if the input supports it), or an empty list (clears the current selection). This works even on hidden file inputs — a styled \"Upload\" button triggering a hidden <input type=\"file\"> — with no OS-level file-picker automation needed at all, since it sets the value directly on the element.\n```python\npage.expect_download() captures a triggered file download.\nwith page.expect_download() as download_info:\n    page.get_by_role(\"button\", name=\"Download report\").click()\n\ndownload = download_info.value\nprint(download.suggested_filename)\ndownload.save_as(\"/path/to/save/report.pdf\")\n```\n\n\nUsed as a context manager, with info.value giving the Download object after the block. As with new-tab handling, this must wrap the triggering click, for the same race-condition reasoning as expect_page(). download.save_as(path) takes a required destination string path; download.suggested_filename is a read-only string property exposing the browser's suggested filename. Check suggested_filename to assert naming logic, and save + inspect contents when you need to verify actual file data, not just that a download happened.",
  customSummary: "## 18. File Uploads & Downloads\n\n.set_input_files(paths) sets file(s) directly on an input — works even on hidden inputs, no OS picker needed; empty list clears selection.\npage.expect_download() (context manager) captures a download — must wrap the triggering click.\ndownload.save_as(path) saves the file; download.suggested_filename exposes the browser's suggested name for naming-logic checks.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
