import type { ChapterRecord } from "../../../types";

/** 8.3 Think Time and Pacing */
export const chapter = {
  "id": "jm-8-3-think-time-and-pacing",
  "title": "8.3 Think Time and Pacing",
  "minutes": 24,
  "level": "intermediate",
  "phase": "Part 8 · Load Testing Concepts",
  "partName": "Part 8 · Load Testing Concepts",
  "overviewText": "Pacing is overall iteration rate, distinct from per-request think time. The same 100 threads can produce wildly different RPS. Constant Throughput Timer (and plugin Throughput Shaping Timer) target samples/minute. Load tests pace to reality; stress tests pace past it. Thread count alone is a misleading description of a test.",
  "why": "'100 users for 10 minutes' is incomplete. Stakeholders care about requests/sec the system can sustain, not open tabs.",
  "when": "After timers (Part 4) when you need a target RPS, or a ramping rate for stress.",
  "practical": {
    "app": "HRM analytics show ~50 req/s at peak",
    "scenario": "Design a load test that matches production rate, then a stress that exceeds it.",
    "pass": "You use Constant Throughput Timer (~50/s) for load; for stress you raise or shape the target over time — you don't equate 100 threads with 50 RPS.",
    "fail": "You report '100 users' with zero think time as the production-like load test."
  },
  "tools": [],
  "customSummary": "- Pacing = overall iteration/throughput rate, distinct from per-request think time (Part 4) — same thread count can produce very different real throughput depending on pacing.\n- Constant Throughput Timer (built-in) / Throughput Shaping Timer (plugin) target a specific samples-per-minute rate, decoupling \"thread count\" from \"actual load generated.\"\n- Load tests: pace to match real/realistic observed request rates.\n- Stress tests: pace deliberately beyond realistic rates, sometimes ramping the target rate itself, to find breaking points.\n- Key principle: thread count alone is a misleading way to describe a test — actual throughput rate is what matters.",
  "contentMarkdown": "## Pacing vs think time\n\nThink time was introduced mechanically in Part 4 (Timers) as a way to insert pauses between samplers — this chapter revisits it from the strategic load-design angle, specifically the concept of pacing: controlling not just individual pauses between requests within one user's flow, but the overall rate at which iterations happen, which is a subtly different and equally important lever for producing a realistic load profile.\n\nConsider the difference between two ways of achieving \"100 users generating load for 10 minutes.\" In the first, 100 threads loop continuously with zero or minimal think time — each thread finishes one full iteration and immediately starts the next, as fast as the server responds. In the second, 100 threads use realistic think time (Part 4) between actions and a deliberate pacing mechanism ensuring each thread only starts a new iteration once per, say, 2 minutes — modeling a real user who checks the HR portal, does one thing, then doesn't come back for a while. These two setups can produce wildly different actual throughput (requests per second hitting your server) despite having the \"same\" 100 users, and only one of them may actually represent your real expected traffic pattern.\n\n## Throughput timers\n\nJMeter provides a Constant Throughput Timer and, via the Plugins Manager (Appendix D), a more flexible Throughput Shaping Timer, specifically for this pacing-level control — rather than just pausing a fixed or random duration between each individual sampler (Part 4's timers), these elements let you target an overall samples-per-minute rate across the whole thread group, and JMeter dynamically adjusts pacing across all threads to hit that target rate regardless of how many threads you've configured.\n\nThis decouples \"how many virtual users are active\" from \"how much actual throughput is being generated\" — a genuinely important distinction, since in real systems, the meaningful capacity question is usually framed in terms of requests-per-second or transactions-per-second the system can sustain, not literally how many browser tabs are theoretically open, and a Constant Throughput Timer lets you design a test around that more directly relevant target number.\n\n## Match the test type\n\nGetting pacing right connects directly back to Chapter 1's test-type distinctions: for a genuine load test, pacing should be tuned to match real observed or realistically estimated request rates — if your analytics show the HRM system genuinely receives about 50 requests/second at typical peak, your load test should target that figure, not an arbitrary number derived purely from \"100 threads with a 1-second timer.\" For a stress test, by contrast, you may deliberately want pacing to scale beyond realistic rates specifically to find the breaking point (Chapter 1), so a Constant Throughput Timer might be used with a steadily increasing target rate over the test's duration rather than a single fixed value, explicitly probing past what real traffic would ever generate.\n\nThe core takeaway is that thread count alone is an incomplete/misleading way to describe or design a load test — the actual throughput rate, shaped by both individual think time and overall pacing controls, is what determines whether your test is measuring something real and useful or an artificial pattern that happens to involve the number 100.",
  "blocks": [
    {
      "id": "jm-8-3-md-0",
      "type": "overview",
      "heading": "Pacing vs think time",
      "content": "Think time was introduced mechanically in Part 4 (Timers) as a way to insert pauses between samplers — this chapter revisits it from the strategic load-design angle, specifically the concept of pacing: controlling not just individual pauses between requests within one user's flow, but the overall rate at which iterations happen, which is a subtly different and equally important lever for producing a realistic load profile.\n\nConsider the difference between two ways of achieving \"100 users generating load for 10 minutes.\" In the first, 100 threads loop continuously with zero or minimal think time — each thread finishes one full iteration and immediately starts the next, as fast as the server responds. In the second, 100 threads use realistic think time (Part 4) between actions and a deliberate pacing mechanism ensuring each thread only starts a new iteration once per, say, 2 minutes — modeling a real user who checks the HR portal, does one thing, then doesn't come back for a while. These two setups can produce wildly different actual throughput (requests per second hitting your server) despite having the \"same\" 100 users, and only one of them may actually represent your real expected traffic pattern.",
      "order": 0
    },
    {
      "id": "jm-8-3-md-1",
      "type": "overview",
      "heading": "Throughput timers",
      "content": "JMeter provides a Constant Throughput Timer and, via the Plugins Manager (Appendix D), a more flexible Throughput Shaping Timer, specifically for this pacing-level control — rather than just pausing a fixed or random duration between each individual sampler (Part 4's timers), these elements let you target an overall samples-per-minute rate across the whole thread group, and JMeter dynamically adjusts pacing across all threads to hit that target rate regardless of how many threads you've configured.\n\nThis decouples \"how many virtual users are active\" from \"how much actual throughput is being generated\" — a genuinely important distinction, since in real systems, the meaningful capacity question is usually framed in terms of requests-per-second or transactions-per-second the system can sustain, not literally how many browser tabs are theoretically open, and a Constant Throughput Timer lets you design a test around that more directly relevant target number.",
      "order": 1
    },
    {
      "id": "jm-8-3-md-2",
      "type": "overview",
      "heading": "Match the test type",
      "content": "Getting pacing right connects directly back to Chapter 1's test-type distinctions: for a genuine load test, pacing should be tuned to match real observed or realistically estimated request rates — if your analytics show the HRM system genuinely receives about 50 requests/second at typical peak, your load test should target that figure, not an arbitrary number derived purely from \"100 threads with a 1-second timer.\" For a stress test, by contrast, you may deliberately want pacing to scale beyond realistic rates specifically to find the breaking point (Chapter 1), so a Constant Throughput Timer might be used with a steadily increasing target rate over the test's duration rather than a single fixed value, explicitly probing past what real traffic would ever generate.\n\nThe core takeaway is that thread count alone is an incomplete/misleading way to describe or design a load test — the actual throughput rate, shaped by both individual think time and overall pacing controls, is what determines whether your test is measuring something real and useful or an artificial pattern that happens to involve the number 100.",
      "order": 2
    }
  ],
  "advantages": [
    "8.3 Think Time and Pacing — '100 users for 10 minutes' is incomplete."
  ],
  "limitations": [
    "8.3 Think Time and Pacing is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
