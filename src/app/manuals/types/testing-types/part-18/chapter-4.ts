import type { ChapterRecord } from "../../types";

/** Soak / Endurance Testing */
export const chapter = {
  "id": "tt-soak-endurance-testing",
  "overlayNo": 72,
  "title": "Soak / Endurance Testing",
  "minutes": 25,
  "level": "advanced",
  "phase": "Part 18 · Backend, Network, Snapshot & Soak",
  "partName": "Part 18 · Backend, Network, Snapshot & Soak",
  "overviewText": "Soak testing (also called endurance testing) is a specific, sustained form of reliability testing — running the application under a continuous, moderate, realistic load for an extended period (many hours to several days) — specifically to detect slow, cumulative degradation like memory leaks, connection exhaustion, or gradual performance decay that a short test run would never have time to reveal.",
  "why": "This is the same core practice already introduced under Reliability Testing (Chapter 20) — presented here as its own dedicated chapter because it's frequently referenced and requested as a distinct, specific test type in its own right. The core value remains the same: some problems genuinely only manifest over sustained, real-world-length usage, not in a quick pass/fail check, and soak testing is the specific technique for finding them deliberately, before real production usage does.",
  "when": "Before launch for any system expected to run continuously, and specifically after introducing any long-running process, caching layer, or connection-pooling mechanism where a slow leak is a realistic risk — run as an extended, dedicated test period, not folded into a standard, shorter load test.",
  "practical": {
    "app": "HRMS API Gateway Connection Pool",
    "scenario": "The HRMS's API gateway is soak-tested at a moderate, realistic load continuously for 48 hours.",
    "fail": "Open database connections climb steadily throughout the run and never return to baseline between request bursts, and by hour 36 new requests begin failing with connection-pool-exhausted errors — a slow connection leak invisible in any test shorter than several hours.",
    "failLabel": "Fail (before)",
    "pass": "A connection-release bug is identified and fixed; a repeat 48-hour soak test shows connection counts staying flat and stable across the entire duration, confirming the leak is genuinely resolved rather than just delayed.",
    "passLabel": "Pass (after fix)"
  },
  "advantages": [
    "The only testing type specifically designed to catch slow, cumulative problems invisible to any short test run, however thorough",
    "Builds real, evidence-based confidence that a system can run unattended for genuine production-length durations",
    "Directly targets memory leaks and resource exhaustion, a class of bug that's often expensive and disruptive to diagnose after it's already caused a real production outage",
    "Complements, and gives a specific, focused name to, the more general reliability testing practice from Chapter 20"
  ],
  "limitations": [
    "Inherently slow to run — a meaningful soak test genuinely takes hours to days, not minutes, and can't be meaningfully rushed",
    "Requires a stable, dedicated test environment tied up for the full duration of the run, unavailable for other testing meanwhile",
    "A particularly slow leak might need an even longer run than initially planned before it becomes clearly visible in the collected data",
    "Identifies that degradation occurred, not automatically why — still requires follow-up profiling or log investigation to find the specific root cause"
  ],
  "tools": [
    {
      "name": "Apache JMeter",
      "sub": "Extended-duration load",
      "url": "https://jmeter.apache.org",
      "seeChapter": 20,
      "desc": "Configured for a sustained, moderate load over many hours or days rather than a short burst — the specific technique is the same as reliability testing; this chapter names it explicitly as its own recognized type since teams often plan and request it under this specific name.",
      "adv": [
        "Catches slow leaks invisible to any short run",
        "Evidence that a system can run unattended for production-length durations",
        "Targets memory leaks and connection exhaustion before a real outage",
        "Gives a focused name to the reliability practice from Chapter 20"
      ],
      "lim": [
        "Takes hours to days — cannot be rushed",
        "Ties up a dedicated environment for the full duration",
        "Very slow leaks may need an even longer run",
        "Shows that degradation happened, not automatically why"
      ],
      "steps": [
        {
          "t": "Step 1 — Set a moderate, realistic load",
          "p": "Not a stress-test peak — the level the system should comfortably handle over an ordinary extended period."
        },
        {
          "t": "Step 2 — Run for hours to days",
          "p": "Overnight or multi-day for the strongest signal; many hours at minimum."
        },
        {
          "t": "Step 3 — Watch the whole run, not just the end",
          "p": "Response times and error rates for gradual upward drift rather than a sudden spike."
        },
        {
          "t": "Step 4 — Watch server resources in parallel",
          "p": "Memory, open connections, disk — a slow climb that never returns to baseline is the classic leak signature."
        },
        {
          "t": "Step 5 — Compare start vs end health",
          "p": "A healthy system looks essentially the same at both points."
        },
        {
          "t": "Step 6 — Fix, then soak again",
          "p": "Confirm resource usage now stays flat across the full duration."
        }
      ]
    }
  ],
  "contentMarkdown": "## Moderate load, long duration\n\nWatch drift, not just spikes.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
