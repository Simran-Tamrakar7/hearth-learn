import type { ChapterRecord } from "../../../types";

/** 4.1 Logic Controllers (Loop, If, While, Runtime, Transaction) */
export const chapter = {
  "id": "jm-4-1-logic-controllers-loop-if-while-runtime-transact",
  "title": "4.1 Logic Controllers (Loop, If, While, Runtime, Transaction)",
  "minutes": 28,
  "level": "intermediate",
  "phase": "Part 4 · Controllers & Logic",
  "partName": "Part 4 · Controllers & Logic",
  "overviewText": "Logic Controllers don't generate requests — they govern order, conditions, and repetition of nested samplers. Loop vs Thread Group loop, If/While for branching and polling, Runtime for time-boxed hammering, Transaction Controller for stakeholder-readable combined timings like Dashboard Load.",
  "why": "A flat linear plan cannot model 'login once, refresh attendance 5 times, logout.' Transaction Controller is how you report 'Dashboard Load p95' instead of five raw rows.",
  "when": "Nested repeats, login-success branching, payroll job polling, or grouping login+dashboard as one metric for Vatsalya.",
  "practical": {
    "app": "HRM dashboard after login",
    "scenario": "Login once, poll attendance 5 times, report dashboard as one transaction.",
    "pass": "You wrap attendance in Loop 5, use If on ${loginStatus}, Transaction Controller named Dashboard Load around the GETs.",
    "fail": "You set Thread Group loop 5 and accidentally re-login 5 times when you only wanted refreshes."
  },
  "tools": [],
  "customSummary": "- Loop Controller: repeats its nested children N times — independent of/nested inside the Thread Group's own loop count.\n- If Controller: conditionally executes children based on a boolean expression/variable check (e.g., branch only if login succeeded).\n- While Controller: repeats children until a condition becomes false — used for polling patterns (e.g., \"check job status\" until complete).\n- Runtime Controller: repeats children for a fixed number of seconds rather than a fixed count.\n- Transaction Controller: groups multiple samplers into one named combined-timing result for cleaner, stakeholder-readable reporting (e.g., \"Dashboard Load\" instead of 5 separate endpoint rows).",
  "contentMarkdown": "## Loop Controller vs Thread Group loop\n\nLogic Controllers, as previewed in Part 1, don't generate requests themselves — they govern the order, conditions, and repetition of the samplers nested beneath them. This is JMeter's equivalent of control-flow statements in code, and understanding each type properly is what lets you move from a flat, linear test plan to one that actually models realistic branching user behavior.\n\nLoop Controller repeats everything nested inside it a fixed number of times, independent of the Thread Group's own Loop Count. This distinction matters: the Thread Group's loop count repeats the entire test for that thread, while a Loop Controller lets you repeat just a portion of the flow. A realistic example: a user logs in once, then checks their attendance status 5 times in a row (simulating someone refreshing a dashboard), then logs out once. You'd wrap only the \"check attendance\" sampler in a Loop Controller set to 5, while login and logout sit outside it at the normal flow level, executing just once per thread iteration.\n\n## If Controller\n\nIf Controller executes its child elements only when a condition (a JavaScript-like boolean expression, or a JMeter variable check) evaluates true. A common pattern: after a login sampler, you check `${loginStatus}` (a variable set via a Post-Processor reading the response) and only proceed into the \"submit leave request\" branch if login actually succeeded — mirroring the defensive branching you might write in a Playwright test with `if (await page.locator('.error').isVisible()) { ... }`, except here it governs whether a whole block of samplers fires at all, not just a UI check.\n\n```\nIf Controller condition example:\n  ${__jexl3(\"${loginStatus}\" == \"success\")}\n```\n\n## While Controller and Runtime Controller\n\nWhile Controller repeats its children as long as a condition remains true, checked at the start of each loop — useful for polling patterns, e.g., repeatedly hitting a \"check job status\" endpoint until the response says `\"status\": \"completed\"`, which is a very real pattern for testing something like an async payroll-processing job in the HRM system, where the initial request just kicks off a background job and you need to poll for completion rather than getting an immediate synchronous result.\n\nRuntime Controller is simpler and time-based rather than condition-based: it executes its children repeatedly for a specified number of seconds, then stops, regardless of how many iterations that ends up being — useful when you care about \"hammer this specific action for exactly 30 seconds\" rather than a fixed count.\n\n## Transaction Controller — reporting, not branching\n\nTransaction Controller is different in kind from the others above — it doesn't control conditional logic or repetition at all. Instead, it groups multiple samplers together and reports their combined response time as a single named \"transaction\" in your results, in addition to (not instead of) each individual sampler's own timing.\n\nThis is enormously valuable for meaningful reporting: instead of your Aggregate Report (Part 1, Part 10) showing 5 disconnected rows for \"Login,\" \"Get Dashboard,\" \"Get Notifications,\" \"Get Leave Balance,\" and \"Render Complete\" — none of which alone represents what a user actually experiences — a Transaction Controller named \"Dashboard Load\" wrapping all five gives you one clean row showing the total time a real user waited for their dashboard to be usable. This maps closely to grouping related steps into a single named step in a test report, and it's the standard practice for making load test results readable to non-technical stakeholders (like presenting results to Vatsalya or another client, where \"Dashboard Load: 95th percentile 1.2s\" is far more meaningful than five raw endpoint timings).",
  "blocks": [
    {
      "id": "jm-4-1-md-0",
      "type": "overview",
      "heading": "Loop Controller vs Thread Group loop",
      "content": "Logic Controllers, as previewed in Part 1, don't generate requests themselves — they govern the order, conditions, and repetition of the samplers nested beneath them. This is JMeter's equivalent of control-flow statements in code, and understanding each type properly is what lets you move from a flat, linear test plan to one that actually models realistic branching user behavior.\n\nLoop Controller repeats everything nested inside it a fixed number of times, independent of the Thread Group's own Loop Count. This distinction matters: the Thread Group's loop count repeats the entire test for that thread, while a Loop Controller lets you repeat just a portion of the flow. A realistic example: a user logs in once, then checks their attendance status 5 times in a row (simulating someone refreshing a dashboard), then logs out once. You'd wrap only the \"check attendance\" sampler in a Loop Controller set to 5, while login and logout sit outside it at the normal flow level, executing just once per thread iteration.",
      "order": 0
    },
    {
      "id": "jm-4-1-md-1",
      "type": "overview",
      "heading": "If Controller",
      "content": "If Controller executes its child elements only when a condition (a JavaScript-like boolean expression, or a JMeter variable check) evaluates true. A common pattern: after a login sampler, you check `${loginStatus}` (a variable set via a Post-Processor reading the response) and only proceed into the \"submit leave request\" branch if login actually succeeded — mirroring the defensive branching you might write in a Playwright test with `if (await page.locator('.error').isVisible()) { ... }`, except here it governs whether a whole block of samplers fires at all, not just a UI check.\n\n```\nIf Controller condition example:\n  ${__jexl3(\"${loginStatus}\" == \"success\")}\n```",
      "order": 1
    },
    {
      "id": "jm-4-1-md-2",
      "type": "overview",
      "heading": "While Controller and Runtime Controller",
      "content": "While Controller repeats its children as long as a condition remains true, checked at the start of each loop — useful for polling patterns, e.g., repeatedly hitting a \"check job status\" endpoint until the response says `\"status\": \"completed\"`, which is a very real pattern for testing something like an async payroll-processing job in the HRM system, where the initial request just kicks off a background job and you need to poll for completion rather than getting an immediate synchronous result.\n\nRuntime Controller is simpler and time-based rather than condition-based: it executes its children repeatedly for a specified number of seconds, then stops, regardless of how many iterations that ends up being — useful when you care about \"hammer this specific action for exactly 30 seconds\" rather than a fixed count.",
      "order": 2
    },
    {
      "id": "jm-4-1-md-3",
      "type": "overview",
      "heading": "Transaction Controller — reporting, not branching",
      "content": "Transaction Controller is different in kind from the others above — it doesn't control conditional logic or repetition at all. Instead, it groups multiple samplers together and reports their combined response time as a single named \"transaction\" in your results, in addition to (not instead of) each individual sampler's own timing.\n\nThis is enormously valuable for meaningful reporting: instead of your Aggregate Report (Part 1, Part 10) showing 5 disconnected rows for \"Login,\" \"Get Dashboard,\" \"Get Notifications,\" \"Get Leave Balance,\" and \"Render Complete\" — none of which alone represents what a user actually experiences — a Transaction Controller named \"Dashboard Load\" wrapping all five gives you one clean row showing the total time a real user waited for their dashboard to be usable. This maps closely to grouping related steps into a single named step in a test report, and it's the standard practice for making load test results readable to non-technical stakeholders (like presenting results to Vatsalya or another client, where \"Dashboard Load: 95th percentile 1.2s\" is far more meaningful than five raw endpoint timings).",
      "order": 3
    }
  ],
  "advantages": [
    "4.1 Logic Controllers (Loop, If, While, Runtime, Transaction) — A flat linear plan cannot model 'login once, refresh attendance 5 times, logout."
  ],
  "limitations": [
    "4.1 Logic Controllers (Loop, If, While, Runtime, Transaction) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
