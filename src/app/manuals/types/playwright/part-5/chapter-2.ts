import type { ChapterRecord } from "../../types";

/** 26. Test Reporting */
export const chapter = {
  "id": "pw-5-report",
  "title": "26. Test Reporting",
  "minutes": 40,
  "level": "advanced",
  "phase": "Part 5 · CI/CD & Reporting",
  "partName": "Part 5 · CI/CD & Reporting",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "HTML report (pytest-html) pip install pytest-html pytest --html=report.html --self-contained-html pytest --html=<path> --self-contained-html What it does: Generates a single-file HTML report summarizing pass/fail/skip results after a test run. Types/params: ● --html=<path> (string, required) — output file location ● --self-contained-html (flag, optional) — embeds CSS/JS directly in the file so it'\n\n## HTML report (pytest-html)\n\nWhat it does: Generates a single-file HTML report summarizing pass/fail/skip results after a test run.\n\nTypes/params:\n\nPointers: Good baseline reporting with minimal setup. Lacks the richer history-tracking and screenshot/trace attachment support that Allure offers — reach for Allure once a team needs more than a quick pass/fail summary.\n\n```\npip install pytest-html\n\npytest --html=report.html --self-contained-html\n\npytest --html=<path> --self-contained-html\n```\n\n## Allure reporting setup\n\nallure serve allure-results # opens an interactive report locally\n\nWhat it does: Writes raw result data (in Allure's format) to a directory during the test run, to be rendered into a report afterward.\n\nTypes/params:\n\nPointers: Requires the separate Allure command-line tool (allure serve / allure\n\ngenerate) to actually render the raw results into a viewable report — the allure-pytest package alone only produces the raw data.\n\n@allure.step(\"Log in as test user\")\n\n...\n\n@allure.attach(name=\"screenshot\", attachment_type=allure.attachment_type.PNG)\n\n@allure.step(description)\n\nWhat it does: Marks a function as a named step in the Allure report, so the report shows a readable step-by-step breakdown of what a test did, not just pass/fail.\n\nTypes/params:\n\nPointers: Especially valuable for longer tests/flows — a failed test's Allure report will show exactly which named step failed, rather than requiring someone to read raw code to figure out where things went wrong.\n\n```\ndef login(page):\n\npage.get_by_label(\"Username\").fill(\"testuser\")\n\npip install allure-pytest\n\npytest --alluredir=allure-results\n\ndef attach_screenshot(page):\n\nreturn page.screenshot()\n```\n\n## Publishing reports as CI artifacts\n\n- name: Upload test report\n\nwith:\n\npath: report.html\n\nactions/upload-artifact (GitHub Actions built-in action)\n\nWhat it does: Saves specified files/directories from the CI run so they're downloadable after the workflow finishes, instead of only existing in ephemeral CI logs.\n\nTypes/params:\n\nPointers: if: always() is important here — without it, the upload step is skipped whenever the test step itself fails, which is exactly the case where you most need the report/trace artifacts to debug what went wrong.\n\n```\nif: always()\n\nuses: actions/upload-artifact@v4\n\nname: playwright-report\n\n# GitHub Actions step\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
