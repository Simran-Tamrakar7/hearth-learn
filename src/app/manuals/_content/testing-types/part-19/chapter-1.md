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
advantages: ["Shrinks the gap between a bug being introduced and being caught from days/weeks down to minutes","Makes running tests a mandatory, automatic part of delivery rather than something that depends on someone remembering to do it","Gives every pull request an objective, consistent quality gate before it can be merged","Both tools have generous free tiers well within reach of a small-to-mid-sized team"]
limitations: ["A slow, poorly-organized pipeline can itself become a bottleneck the team starts trying to work around rather than benefit from","Only as good as the underlying test suite — continuous testing amplifies a strong suite, but doesn't create test coverage that doesn't already exist","Jenkins in particular carries real setup and ongoing maintenance overhead compared to a hosted option","Flaky tests in a CI pipeline are especially costly, since they erode trust in the pipeline and get ignored/re-run rather than fixed"]
---

## Wire the suite into CI

Fail the check on red; block merge with branch protection.
