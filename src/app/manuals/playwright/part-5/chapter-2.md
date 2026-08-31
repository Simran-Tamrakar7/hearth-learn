---
id: "pw-5-report"
title: "26. Test Reporting"
minutes: 40
partName: "Part 5 · CI/CD & Reporting"
level: "advanced"
---

HTML report (pytest-html) pip install pytest-html pytest --html=report.html --self-contained-html pytest --html=<path> --self-contained-html What it does: Generates a single-file HTML report summarizing pass/fail/skip results after a test run. Types/params: ● --html=<path> (string, required) — output file location ● --self-contained-html (flag, optional) — embeds CSS/JS directly in the file so it'

## HTML report (pytest-html)

What it does: Generates a single-file HTML report summarizing pass/fail/skip results after a test run.

Types/params:

Pointers: Good baseline reporting with minimal setup. Lacks the richer history-tracking and screenshot/trace attachment support that Allure offers — reach for Allure once a team needs more than a quick pass/fail summary.

```
pip install pytest-html

pytest --html=report.html --self-contained-html

pytest --html=<path> --self-contained-html
```

## Allure reporting setup

allure serve allure-results # opens an interactive report locally

What it does: Writes raw result data (in Allure's format) to a directory during the test run, to be rendered into a report afterward.

Types/params:

Pointers: Requires the separate Allure command-line tool (allure serve / allure

generate) to actually render the raw results into a viewable report — the allure-pytest package alone only produces the raw data.

@allure.step("Log in as test user")

...

@allure.attach(name="screenshot", attachment_type=allure.attachment_type.PNG)

@allure.step(description)

What it does: Marks a function as a named step in the Allure report, so the report shows a readable step-by-step breakdown of what a test did, not just pass/fail.

Types/params:

Pointers: Especially valuable for longer tests/flows — a failed test's Allure report will show exactly which named step failed, rather than requiring someone to read raw code to figure out where things went wrong.

```
def login(page):

page.get_by_label("Username").fill("testuser")

pip install allure-pytest

pytest --alluredir=allure-results

def attach_screenshot(page):

return page.screenshot()
```

## Publishing reports as CI artifacts

- name: Upload test report

with:

path: report.html

actions/upload-artifact (GitHub Actions built-in action)

What it does: Saves specified files/directories from the CI run so they're downloadable after the workflow finishes, instead of only existing in ephemeral CI logs.

Types/params:

Pointers: if: always() is important here — without it, the upload step is skipped whenever the test step itself fails, which is exactly the case where you most need the report/trace artifacts to debug what went wrong.

```
if: always()

uses: actions/upload-artifact@v4

name: playwright-report

# GitHub Actions step
```