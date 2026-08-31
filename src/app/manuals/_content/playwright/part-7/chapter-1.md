---
id: "pw-7-capstone"
title: "33. Real-World Capstone Project"
minutes: 90
partName: "Part 7 · Real-World Project & Job Readiness"
level: "pro"
---

End-to-end framework build (login, CRUD flow, API validation) The capstone ties together nearly every prior chapter into one cohesive project rather than isolated exercises. A solid scope for a portfolio-worthy capstone: ● Login — using POM (Chapter 14), with a session-reuse fixture (Chapter 20) so login only happens once per run, not once per test.

## End-to-end framework build (login, CRUD flow, API validation)

The capstone ties together nearly every prior chapter into one cohesive project rather than isolated exercises. A solid scope for a portfolio-worthy capstone:

login only happens once per run, not once per test.

cover Create, Read, Update, Delete end-to-end through the UI.

correctly server-side, not just that the UI looked right.

tasks_page = TasksPage(authenticated_page)

response = request.get("/api/tasks?title=Finish QA report")

task_id = response.json()["tasks"][0]["id"]

follow_up = request.get(f"/api/tasks/{task_id}")

Pointers: The API-validation steps are what elevate this from "a UI clicker" to a genuine full-stack test — it's a detail interviewers specifically listen for, since it demonstrates you understand that UI success and data-layer success are two different things worth verifying independently.

```
assert response.json()["tasks"][0]["due_date"] == "2026-08-10"

# Update

tasks_page.edit_task("Finish QA report", new_title="Finish QA report v2")

expect(authenticated_page.get_by_text("Finish QA report v2")).to_be_visible()

# Delete

tasks_page.delete_task("Finish QA report v2")

expect(authenticated_page.get_by_text("Finish QA report v2")).not_to_be_visible()

# API validation of deletion

# Create

tasks_page.create_task("Finish QA report", due_date="2026-08-10")

expect(authenticated_page.get_by_text("Finish QA report")).to_be_visible()

# API validation of creation

# tests/test_task_crud.py

from pages.tasks_page import TasksPage

def test_create_read_update_delete_task(authenticated_page, request):
```

## Combining UI + API + auth + CI/CD in one suite

The full picture: conftest.py wires together the session-scoped auth fixture (Chapter

20), the request fixture for API calls (Chapter 18), and the whole thing runs automatically via a GitHub Actions workflow (Chapter 25) on every push, publishing an HTML or Allure report as an artifact (Chapter 26).

Pointers: Getting this pipeline green end-to-end — not just passing locally — is the real milestone. A huge amount of practical learning happens specifically in the friction of getting something to run correctly in CI that worked fine locally (missing --with-deps, environment variable differences, headless-only quirks) — don't skip actually pushing this to GitHub and watching Actions run it.

## Code review and refactor pass

Once the capstone works, deliberately revisit it against Chapter 31's anti-patterns checklist:

Pointers: This refactor pass is itself a valuable, showable skill — if you're asked in an interview "tell me about a time you improved code quality," a concrete before/after from this exact refactor pass is a strong, specific answer.