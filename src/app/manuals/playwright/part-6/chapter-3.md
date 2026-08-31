---
id: "pw-6-review"
title: "31. Code Review & Best Practices"
minutes: 40
partName: "Part 6 · Pro-Level Practices"
level: "pro"
---

Naming conventions, DRY principles # Avoid: def test1(page): ... # Prefer: descriptive, scenario-revealing names def test_login_fails_with_incorrect_password(page): ...

## Naming conventions, DRY principles

...

...

Pointers: A test name should describe the scenario and expected outcome well enough that a failure notification alone (just the test name, no need to open the code) tells a reader roughly what broke. DRY (Don't Repeat Yourself) in this context mainly means:

object method (Chapter 14) or a utility function (Chapter 29), not copy-pasted.

```
# Prefer: descriptive, scenario-revealing names

def test_login_fails_with_incorrect_password(page):

if the same locator or action sequence appears in three or more tests, it belongs in a page

# Avoid:

def test1(page):
```

## Common anti-patterns in automation

explicit state-based waits (Chapter 8).

every minor markup refactor.

(e.g., relying on data another test created). This breaks under parallel execution

(Chapter 22) and makes debugging a failure much harder, since the "real" cause

might be in an unrelated test file.

correct behavior.

logical grouping, instead of organized-by-feature files (Chapter 29's folder
 architecture).

## Documentation standards for shared frameworks

A framework other engineers will onboard onto needs:

only this file.

shopping cart as a side effect").

patterns, and folder structure decisions — so contributors don't reinvent or

diverge from established patterns.

Pointers: This chapter plays directly to your existing QA documentation strength — a framework with excellent test coverage but no documentation is nearly as hard to maintain as one with poor coverage, since new contributors can't safely extend what they don't understand.