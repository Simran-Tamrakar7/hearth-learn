---
id: "tt-continuous-testing-cicd"
overlayNo: 73
title: "Continuous Testing (CI/CD)"
minutes: 25
partName: "Part 19 · Continuous, Interop, Conformance & Globalization"
level: "intermediate"
overviewText: "Continuous testing wires automated tests into the CI/CD pipeline so they run on every commit, pull request, or deployment — a delivery strategy for when every other test type actually executes."
why: "A suite that only runs manually before a release leaves bugs buried under later commits. Automatic execution shrinks that gap to minutes."
when: "From the start of a project — fast tests on every commit; slower suites nightly or before release."
practical: {"app":"HRMS Payroll Calculation Regression","scenario":"The regression suite is wired into GitHub Actions on every Payroll PR.","pass":"The rounding bug is caught within four minutes of the PR opening, blocking merge while the change is still fresh.","fail":"The same bug is only caught two weeks later in pre-release testing, after six other commits have touched the file."}
---

## Wire the suite into CI

Fail the check on red; block merge with branch protection.
