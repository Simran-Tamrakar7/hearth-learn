import type { ChapterRecord } from "../../../types";

/** 2.3 Running and Reading Basic Results */
export const chapter = {
  "id": "jm-2-3-running-and-reading-basic-results",
  "title": "2.3 Running and Reading Basic Results",
  "minutes": 24,
  "level": "beginner",
  "phase": "Part 2 · Building Your First Test",
  "partName": "Part 2 · Building Your First Test",
  "overviewText": "Validate with 1 thread, 1 loop, 0 ramp-up, and View Results Tree. JMeter's default pass is 2xx/3xx only — a green check can hide {\"error\": \"employeeId not found\"}. Prove one user works before you scale.",
  "why": "Skipping the one-user proof wastes full load runs on typos. Default green is not 'leave was created.'",
  "when": "Every new sampler, every auth change, before you ever set 100 threads.",
  "practical": {
    "app": "Submit Leave Request + View Results Tree",
    "scenario": "First GUI run of the leave POST.",
    "pass": "You inspect Request and Response tabs, confirm body success not just 200, and only then raise thread count.",
    "fail": "You jump to 200 users because the sample was green on status code with an error JSON body."
  },
  "tools": [],
  "customSummary": "- Validate first with trivial settings: 1 thread, 1 loop, 0 ramp-up, View Results Tree attached.\n- Request tab = exactly what was sent (debug typos, missing headers here); Response tab = status code, headers, body.\n- Default pass/fail is status-code-only (2xx/3xx = green) — does NOT verify response body content.\n- Always pair samplers with explicit Assertions (Part 4) checking body content, since a green checkmark can still hide a functionally wrong response.\n- Rule: validate correctness for 1 user first, only then scale to real load — never skip straight to high thread counts.",
  "contentMarkdown": "## Trivial first run\n\nWith a sampler built, the natural next step is to actually run it and make sense of what comes back — and this chapter is deliberately about the simplest possible run, using GUI mode with a tiny thread count, purely to validate correctness before any real load discussion happens (that's Part 8 onward).\n\nSet your Thread Group to something trivial for this validation stage — 1 thread, 1 loop count, 0 ramp-up — since the goal right now is just \"does this request work at all,\" not performance measurement. Add a View Results Tree listener (from Chapter 4 of Part 1) directly under the Thread Group, then click the green \"Start\" (play) button in the toolbar.\n\n## Request tab vs Response tab\n\nWhen the run completes, click into View Results Tree and select your sampler node. You'll see it's split into a Request tab and a Response tab, plus a top-level pass/fail indicator (a green checkmark or red X, small icon before the sample name). The Request tab shows exactly what JMeter sent — method, full URL, headers, and body — which is your first line of debugging if something's wrong; a shockingly common beginner mistake is a typo'd path or a body that didn't get the Content-Type header it needed, both immediately visible here.\n\nThe Response tab shows what came back: the HTTP status code (200, 201, 400, 401, 500, etc.), response headers, and the response body itself, viewable as raw text, as \"Text\" (JMeter's attempt to pretty-print it), or as a rendered HTML/JSON tree depending on content type.\n\n## Green is not 'the leave was created'\n\nA critical concept to internalize immediately: JMeter, by default, only considers a sample \"successful\" (green) based on the HTTP status code being in the 2xx/3xx range — it does not automatically verify that the response body contains what you expect. This is a meaningfully different default than Playwright, where `expect(response.status()).toBe(200)` and body content checks are things you write explicitly every time, but the mental trap in JMeter is assuming a green checkmark means \"the leave request was actually created correctly\" when it might just mean \"the server responded with a 200, even if the body says `{\"error\": \"employeeId not found\"}`\" (some APIs badly return 200 with an error payload).\n\nThis is exactly why Part 4's Assertions exist — a Response Assertion or JSON Assertion added as a child of the sampler lets you explicitly check the body content, and without one, your \"passing\" test may be silently meaningless. Get in the habit, from this very first test onward, of always pairing a sampler with at least one assertion that checks something in the actual response body, not just relying on the default status-code-only pass/fail.\n\n## One user, then a thousand\n\nOnce you've confirmed a single-user run produces the correct request and a genuinely correct response (verified via the response body, not just the green checkmark), you have a validated base test — and only then does it make sense to start scaling thread count, adding ramp-up, and thinking about it as a load test rather than a functional smoke check. This \"prove it works for one user before testing it for a thousand\" discipline is the single most important habit for avoiding wasted load-test runs later in this manual.",
  "blocks": [
    {
      "id": "jm-2-3-md-0",
      "type": "overview",
      "heading": "Trivial first run",
      "content": "With a sampler built, the natural next step is to actually run it and make sense of what comes back — and this chapter is deliberately about the simplest possible run, using GUI mode with a tiny thread count, purely to validate correctness before any real load discussion happens (that's Part 8 onward).\n\nSet your Thread Group to something trivial for this validation stage — 1 thread, 1 loop count, 0 ramp-up — since the goal right now is just \"does this request work at all,\" not performance measurement. Add a View Results Tree listener (from Chapter 4 of Part 1) directly under the Thread Group, then click the green \"Start\" (play) button in the toolbar.",
      "order": 0
    },
    {
      "id": "jm-2-3-md-1",
      "type": "overview",
      "heading": "Request tab vs Response tab",
      "content": "When the run completes, click into View Results Tree and select your sampler node. You'll see it's split into a Request tab and a Response tab, plus a top-level pass/fail indicator (a green checkmark or red X, small icon before the sample name). The Request tab shows exactly what JMeter sent — method, full URL, headers, and body — which is your first line of debugging if something's wrong; a shockingly common beginner mistake is a typo'd path or a body that didn't get the Content-Type header it needed, both immediately visible here.\n\nThe Response tab shows what came back: the HTTP status code (200, 201, 400, 401, 500, etc.), response headers, and the response body itself, viewable as raw text, as \"Text\" (JMeter's attempt to pretty-print it), or as a rendered HTML/JSON tree depending on content type.",
      "order": 1
    },
    {
      "id": "jm-2-3-md-2",
      "type": "overview",
      "heading": "Green is not 'the leave was created'",
      "content": "A critical concept to internalize immediately: JMeter, by default, only considers a sample \"successful\" (green) based on the HTTP status code being in the 2xx/3xx range — it does not automatically verify that the response body contains what you expect. This is a meaningfully different default than Playwright, where `expect(response.status()).toBe(200)` and body content checks are things you write explicitly every time, but the mental trap in JMeter is assuming a green checkmark means \"the leave request was actually created correctly\" when it might just mean \"the server responded with a 200, even if the body says `{\"error\": \"employeeId not found\"}`\" (some APIs badly return 200 with an error payload).\n\nThis is exactly why Part 4's Assertions exist — a Response Assertion or JSON Assertion added as a child of the sampler lets you explicitly check the body content, and without one, your \"passing\" test may be silently meaningless. Get in the habit, from this very first test onward, of always pairing a sampler with at least one assertion that checks something in the actual response body, not just relying on the default status-code-only pass/fail.",
      "order": 2
    },
    {
      "id": "jm-2-3-md-3",
      "type": "overview",
      "heading": "One user, then a thousand",
      "content": "Once you've confirmed a single-user run produces the correct request and a genuinely correct response (verified via the response body, not just the green checkmark), you have a validated base test — and only then does it make sense to start scaling thread count, adding ramp-up, and thinking about it as a load test rather than a functional smoke check. This \"prove it works for one user before testing it for a thousand\" discipline is the single most important habit for avoiding wasted load-test runs later in this manual.",
      "order": 3
    }
  ],
  "advantages": [
    "2.3 Running and Reading Basic Results — Skipping the one-user proof wastes full load runs on typos."
  ],
  "limitations": [
    "2.3 Running and Reading Basic Results is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
