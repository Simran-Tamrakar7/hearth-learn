---
id: "pw-2-waits"
title: "8. Waits & Auto-waiting"
minutes: 40
partName: "Part 2 · Core Interactions"
level: "beginner"
---

Actionability checklist, explicit waits for spinner/load states, and why time.sleep is a lose-lose.

## The actionability checklist

Before performing most actions, Playwright runs through an actionability checklist on the target element:

1. Attached — is it in the DOM at all?
2. Visible — non-zero size, not display:none / visibility:hidden?
3. Stable — stopped moving/animating (checked across at least two animation frames)?
4. Enabled — not disabled?
5. Receives events — not covered by another element (e.g., a loading spinner overlay)?

Playwright re-checks this list repeatedly until all conditions pass or the timeout is hit. This is exactly why you rarely need manual waits.

## Explicit waits when you need them

Use state-based waits for cases auto-waiting doesn’t cover directly — e.g., waiting for a spinner to hit “hidden” before checking results underneath.

wait_for_load_state covers load, domcontentloaded, and networkidle (no network for ~500ms). networkidle is handy after actions that trigger background calls with no specific element to target — but avoid it on pages with continuous polling (dashboards), since it’ll never go idle and will time out.

```
page.wait_for_selector(".spinner", state="hidden")
page.wait_for_selector(".results", state="visible")
page.wait_for_load_state("domcontentloaded")
```

## Avoid time.sleep

A hard sleep() is a lose-lose: too short and the test is flaky; too long and every run wastes time even when the app responded instantly. Auto-waiting solves both problems simultaneously. The only legitimate reasons to add explicit waits are the state-based cases above — never as a blanket “just in case” habit.

```
# Avoid:
# time.sleep(3)
# page.click(".submit-button")

# Prefer:
page.get_by_role("button", name="Submit").click()  # auto-waits already
```