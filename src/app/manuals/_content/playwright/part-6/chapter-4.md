---
id: "pw-6-perf"
title: "32. Performance Considerations"
minutes: 40
partName: "Part 6 · Pro-Level Practices"
level: "pro"
---

Reducing test execution time The biggest wins, roughly in order of impact: 1. Auth session reuse (storage_state, Chapter 20) — skip repeated UI logins across the suite.

## Reducing test execution time

The biggest wins, roughly in order of impact:

1. Auth session reuse (storage_state, Chapter 20) — skip repeated UI logins
 across the suite.

## 2. API-based test data setup (Chapter 18) — skip slow UI flows for state that

isn't the thing being tested.
 3. Parallel execution (pytest-xdist, Chapter 22) — run independent tests
 concurrently.
 4. Blocking unnecessary resources (images/fonts/ads, Chapter 17) — skip
 network weight the test doesn't need.

## Optimizing locators and waits

# Slower — CSS selector requiring more DOM traversal, less resilient

# Faster and clearer — role-based, resilient

Pointers: Role-based locators aren't just more resilient (Chapter 5) — they're also generally faster to resolve than deeply nested CSS selectors, since Playwright's accessibility-tree lookup avoids walking a long DOM chain. Avoid unnecessary explicit waits stacked on top of already-auto-waiting actions (Chapter 8) — redundant waits (wait_for_timeout() "just in case" before a click that already auto-waits) add pure dead time across a whole suite for zero benefit.

```
page.locator("div.container > ul.list > li:nth-child(3) > button").click()

page.get_by_role("button", name="Delete").nth(2).click()
```

## Worker/parallelization tuning

Pointers: More workers isn't strictly better past a certain point — CPU core count, memory available for multiple simultaneous browser instances, and any shared external resource (a rate-limited test API, a shared staging database) all impose real ceilings. The right worker count is something to measure on your actual CI hardware (try a few values, compare total suite time) rather than guess — a common mistake is assuming worker count should always match CPU core count exactly, when memory pressure from many simultaneous browser instances is often the tighter constraint in practice.

```
pytest -n 4     # 4 workers

pytest -n 8     # 8 workers — not necessarily 2x faster
```

## Part 7: Real-World Project & Job

(Explanations + Function Reference)