import type { ChapterRecord } from "../../../types";

/** 8.1 Load vs Stress vs Spike vs Soak Testing */
export const chapter = {
  "id": "jm-8-1-load-vs-stress-vs-spike-vs-soak-testing",
  "title": "8.1 Load vs Stress vs Spike vs Soak Testing",
  "minutes": 26,
  "level": "intermediate",
  "phase": "Part 8 · Load Testing Concepts",
  "partName": "Part 8 · Load Testing Concepts",
  "overviewText": "Performance testing is a family of questions, not one activity. Load = expected volume. Stress = find the break and how it fails. Spike = sudden jump (ramp-up ≈ 0). Soak = moderate load for hours (leaks, token expiry). Wrong type → wrong conclusion.",
  "why": "Calling a stress test a 'load test' in a stakeholder report is how you claim production is fine after only proving the cliff.",
  "when": "Before you pick thread counts — HRM 9 AM vs a surprise all-hands portal hit vs overnight leak hunt.",
  "practical": {
    "app": "HRM portal capacity conversation",
    "scenario": "Stakeholder wants 'a load test' after a company-wide announcement risk.",
    "pass": "You split: realistic morning load; stress past forecast; spike with ramp 0; soak for leaks — and you don't mix the stories.",
    "fail": "You run one high-thread blast and call every question answered."
  },
  "tools": [],
  "customSummary": "- Load Testing: realistic, expected traffic level — \"does it perform acceptably under normal conditions?\"\n- Stress Testing: gradually increasing beyond expected levels — \"where's the breaking point, and how does it fail?\"\n- Spike Testing: sudden abrupt jump (ramp-up ≈ 0) — tests reaction to burst suddenness, not just total volume.\n- Soak Testing: sustained moderate load over long duration — catches time-based issues (memory leaks, connection pool growth, disk fill) invisible to short tests.\n- Choosing the wrong test type for your actual question leads to misinterpreted results.",
  "contentMarkdown": "## Different questions, different tests\n\nEverything built in Parts 1–7 gives you the mechanical ability to generate traffic against a system — this Part is where the conversation shifts from \"how do I build a request in JMeter\" to \"what am I actually trying to learn by running this test,\" which is a fundamentally different, strategic question. Performance testing isn't one homogeneous activity; it's a family of distinct test types, each designed to answer a different question about system behavior, and conflating them — running what's actually a stress test but calling it a load test, or vice versa — leads to misinterpreted results and wrong conclusions reported to stakeholders.\n\n## Load testing\n\nLoad Testing (in the narrow sense, as distinct from the broader umbrella term) verifies system behavior under an expected, realistic level of concurrent usage — the traffic volume you genuinely anticipate in production under normal-to-busy conditions. The question being answered is: \"does the system perform acceptably (response times, error rate) at the load we actually expect it to handle?\" For the HRM system, this might mean simulating the realistic number of employees checking in for attendance within a typical morning window, with realistic think time (Part 4) between actions — not an arbitrary large number, but a number grounded in actual expected usage, ideally informed by real user counts or analytics data if available.\n\n## Stress testing\n\nStress Testing deliberately pushes load beyond expected levels, incrementally increasing it until the system's breaking point is found — the goal isn't to confirm normal behavior, but to discover where and how the system fails: does response time degrade gracefully, or does it fall off a cliff? Does the server return proper error responses, or does it crash entirely? Does it recover cleanly once load drops back down, or does it stay degraded? This is the test type most directly analogous to intentionally trying to break something to learn its failure characteristics, and it's genuinely valuable precisely because production traffic occasionally does spike beyond forecasts (a surprise company-wide announcement causing every employee to check the HR portal simultaneously, for instance), and knowing how your system fails — rather than just knowing it eventually will — informs capacity planning and incident response.\n\n## Spike testing\n\nSpike Testing is a specific, narrower variant of stress testing focused on sudden load increases rather than gradual ramp-up — simulating an abrupt jump from normal traffic to a much higher volume nearly instantly (recall Part 1's note that a Thread Group's ramp-up period set to 0 or a very short value produces exactly this pattern), then often dropping back down, to see whether the system handles sudden bursts gracefully or whether the abruptness itself (as opposed to just the raw volume) causes problems — for example, connection pool exhaustion or auto-scaling infrastructure that can't react fast enough to an instant jump, even if it would have handled the same total load fine if it arrived gradually.\n\n## Soak testing\n\nSoak Testing (also called endurance testing) takes an entirely different axis: rather than varying load intensity, it holds a sustained, moderate load steady for an extended duration — hours, sometimes longer — specifically to catch problems that only manifest over time rather than under any single moment's load level: memory leaks, gradually growing database connection pools that never get released, log files filling up disk space, or degraded performance that creeps in slowly rather than appearing immediately. This connects directly back to Part 5 Chapter 3's note about token expiry — soak tests are exactly the scenario where a test plan's own auth-refresh logic needs to be correctly built, since a multi-hour test with a 30-minute token lifespan absolutely will hit expiry if you haven't planned for it.\n\n| Test Type | Load Pattern | Primary Question |\n|---|---|---|\n| Load | Realistic, expected volume | Does it perform acceptably under normal conditions? |\n| Stress | Gradually increasing beyond expected | Where's the breaking point, and how does it fail? |\n| Spike | Sudden, sharp jump | Does it handle abrupt bursts, not just high totals? |\n| Soak | Sustained moderate level, long duration | Do problems emerge only over time (leaks, drift)? |",
  "blocks": [
    {
      "id": "jm-8-1-md-0",
      "type": "overview",
      "heading": "Different questions, different tests",
      "content": "Everything built in Parts 1–7 gives you the mechanical ability to generate traffic against a system — this Part is where the conversation shifts from \"how do I build a request in JMeter\" to \"what am I actually trying to learn by running this test,\" which is a fundamentally different, strategic question. Performance testing isn't one homogeneous activity; it's a family of distinct test types, each designed to answer a different question about system behavior, and conflating them — running what's actually a stress test but calling it a load test, or vice versa — leads to misinterpreted results and wrong conclusions reported to stakeholders.",
      "order": 0
    },
    {
      "id": "jm-8-1-md-1",
      "type": "overview",
      "heading": "Load testing",
      "content": "Load Testing (in the narrow sense, as distinct from the broader umbrella term) verifies system behavior under an expected, realistic level of concurrent usage — the traffic volume you genuinely anticipate in production under normal-to-busy conditions. The question being answered is: \"does the system perform acceptably (response times, error rate) at the load we actually expect it to handle?\" For the HRM system, this might mean simulating the realistic number of employees checking in for attendance within a typical morning window, with realistic think time (Part 4) between actions — not an arbitrary large number, but a number grounded in actual expected usage, ideally informed by real user counts or analytics data if available.",
      "order": 1
    },
    {
      "id": "jm-8-1-md-2",
      "type": "overview",
      "heading": "Stress testing",
      "content": "Stress Testing deliberately pushes load beyond expected levels, incrementally increasing it until the system's breaking point is found — the goal isn't to confirm normal behavior, but to discover where and how the system fails: does response time degrade gracefully, or does it fall off a cliff? Does the server return proper error responses, or does it crash entirely? Does it recover cleanly once load drops back down, or does it stay degraded? This is the test type most directly analogous to intentionally trying to break something to learn its failure characteristics, and it's genuinely valuable precisely because production traffic occasionally does spike beyond forecasts (a surprise company-wide announcement causing every employee to check the HR portal simultaneously, for instance), and knowing how your system fails — rather than just knowing it eventually will — informs capacity planning and incident response.",
      "order": 2
    },
    {
      "id": "jm-8-1-md-3",
      "type": "overview",
      "heading": "Spike testing",
      "content": "Spike Testing is a specific, narrower variant of stress testing focused on sudden load increases rather than gradual ramp-up — simulating an abrupt jump from normal traffic to a much higher volume nearly instantly (recall Part 1's note that a Thread Group's ramp-up period set to 0 or a very short value produces exactly this pattern), then often dropping back down, to see whether the system handles sudden bursts gracefully or whether the abruptness itself (as opposed to just the raw volume) causes problems — for example, connection pool exhaustion or auto-scaling infrastructure that can't react fast enough to an instant jump, even if it would have handled the same total load fine if it arrived gradually.",
      "order": 3
    },
    {
      "id": "jm-8-1-md-4",
      "type": "overview",
      "heading": "Soak testing",
      "content": "Soak Testing (also called endurance testing) takes an entirely different axis: rather than varying load intensity, it holds a sustained, moderate load steady for an extended duration — hours, sometimes longer — specifically to catch problems that only manifest over time rather than under any single moment's load level: memory leaks, gradually growing database connection pools that never get released, log files filling up disk space, or degraded performance that creeps in slowly rather than appearing immediately. This connects directly back to Part 5 Chapter 3's note about token expiry — soak tests are exactly the scenario where a test plan's own auth-refresh logic needs to be correctly built, since a multi-hour test with a 30-minute token lifespan absolutely will hit expiry if you haven't planned for it.\n\n| Test Type | Load Pattern | Primary Question |\n|---|---|---|\n| Load | Realistic, expected volume | Does it perform acceptably under normal conditions? |\n| Stress | Gradually increasing beyond expected | Where's the breaking point, and how does it fail? |\n| Spike | Sudden, sharp jump | Does it handle abrupt bursts, not just high totals? |\n| Soak | Sustained moderate level, long duration | Do problems emerge only over time (leaks, drift)? |",
      "order": 4
    }
  ],
  "advantages": [
    "8.1 Load vs Stress vs Spike vs Soak Testing — Calling a stress test a 'load test' in a stakeholder report is how you claim production is fine after only proving the cliff."
  ],
  "limitations": [
    "8.1 Load vs Stress vs Spike vs Soak Testing is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
