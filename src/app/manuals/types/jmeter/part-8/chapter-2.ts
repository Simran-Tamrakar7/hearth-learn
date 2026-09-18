import type { ChapterRecord } from "../../../types";

/** 8.2 Designing Realistic Load Profiles (Ramp-Up, Steady State, Ramp-Down) */
export const chapter = {
  "id": "jm-8-2-designing-realistic-load-profiles-ramp-up-steady",
  "title": "8.2 Designing Realistic Load Profiles (Ramp-Up, Steady State, Ramp-Down)",
  "minutes": 24,
  "level": "intermediate",
  "phase": "Part 8 · Load Testing Concepts",
  "partName": "Part 8 · Load Testing Concepts",
  "overviewText": "A profile is ramp-up → steady state → ramp-down, not 'set N threads and go.' Ramp-up shows where degradation starts. Steady state must last long enough for caches and pools to settle. Ramp-down shows recovery; abrupt kills add connection-reset noise.",
  "why": "Ramping up and immediately down measures flux, not capacity. Round-number thread counts without analytics are precise but not meaningful.",
  "when": "Writing the Thread Group numbers for any load or stress run you will report.",
  "practical": {
    "app": "200-user HRM load for a client report",
    "scenario": "Need a 30-minute shape that is interpretable.",
    "pass": "You ramp 0→200 over 5 min, hold 20 min, ramp down 5 min, grounded in peak concurrent estimates — not 200 because it looks round.",
    "fail": "You set 200 threads, duration 30s, ramp 0, and present the average as capacity."
  },
  "tools": [],
  "customSummary": "- Three-phase shape: ramp-up → steady state → ramp-down.\n- Ramp-up: gradual user onboarding; also useful diagnostically to spot the exact concurrency point where degradation begins.\n- Steady state: must be held long enough for transient startup effects (cache warming, connection pooling) to settle — this is where usable, stable data comes from.\n- Ramp-down: reveals recovery behavior (does system return to baseline?); avoid abrupt cutoffs that introduce artificial noise/errors unrelated to real system behavior.\n- Ground target numbers in real analytics/estimated usage, not arbitrary round numbers.",
  "contentMarkdown": "## Not just N threads\n\nKnowing which test type you're running (Chapter 1) still leaves the concrete question of how to actually shape the Thread Group's numbers over time — and a well-designed load profile is rarely just \"set N threads and go.\" The standard shape most load and stress tests follow has three distinct phases, each serving a specific purpose in producing meaningful, interpretable results.\n\n## Ramp-up\n\nRamp-up — covered mechanically back in Part 1 — is the phase where virtual users gradually come online rather than all firing at once. Beyond just realism (Part 1's point that real traffic trickles in), ramp-up serves an important diagnostic purpose: by watching your Aggregate Report or a live graph (Part 10) during ramp-up, you can often see the exact point at which response times start degrading as concurrent load increases — giving you a rough sense of your system's practical capacity ceiling before you even reach full target load, which is valuable information you'd miss entirely if you just slammed straight to peak concurrency.\n\n## Steady state\n\nSteady state is the plateau — once ramp-up completes and your full target thread count is active, holding it there for a meaningful duration (not just a few seconds) is what lets you gather statistically stable results. A test that ramps up and immediately ramps back down without holding steady state gives you almost no usable data, because you're measuring a system in constant flux rather than its behavior at a sustained, settled load level.\n\nHow long \"meaningful\" is depends on the goal — a basic load test might hold steady state for 5–10 minutes, while a soak test (Chapter 1) might hold it for many hours — but the general principle is that steady state needs to be long enough for transient startup effects (connection pool warming, cache population, JIT compilation on the server side) to settle out, so your measured numbers reflect genuine ongoing capacity rather than cold-start artifacts.\n\n## Ramp-down\n\nRamp-down — often overlooked by beginners who just let a test's duration setting cut threads off abruptly — is the phase where load tapers back off, and it matters for two reasons. First, some tests specifically want to observe recovery behavior: does the system's response times and resource usage return to baseline promptly once load drops, or does it stay degraded (a sign of a leak or a stuck-resource problem, tying back to soak testing considerations)? Second, an abrupt cutoff (rather than a graceful ramp-down) can itself introduce artifacts in your results or logs that have nothing to do with genuine system behavior — a burst of connection-reset errors purely because JMeter's threads were killed mid-request, for instance, muddying your error-rate analysis with noise unrelated to your actual research question.\n\nExample load profile for a moderate load test:\n\n```\nRamp-up:      0 → 200 users over 5 minutes\nSteady state: 200 users held for 20 minutes\nRamp-down:    200 → 0 users over 5 minutes\nTotal test duration: 30 minutes\n```\n\nDesigning this profile well requires grounding the target numbers in something real wherever possible — actual peak concurrent user counts from analytics/monitoring if the system already has production traffic, or reasonable estimates based on total employee count and realistic usage patterns for a new system — rather than picking round numbers arbitrarily, since a load test's conclusions are only as meaningful as how well its profile actually represents genuine or plausible real-world usage.",
  "blocks": [
    {
      "id": "jm-8-2-md-0",
      "type": "overview",
      "heading": "Not just N threads",
      "content": "Knowing which test type you're running (Chapter 1) still leaves the concrete question of how to actually shape the Thread Group's numbers over time — and a well-designed load profile is rarely just \"set N threads and go.\" The standard shape most load and stress tests follow has three distinct phases, each serving a specific purpose in producing meaningful, interpretable results.",
      "order": 0
    },
    {
      "id": "jm-8-2-md-1",
      "type": "overview",
      "heading": "Ramp-up",
      "content": "Ramp-up — covered mechanically back in Part 1 — is the phase where virtual users gradually come online rather than all firing at once. Beyond just realism (Part 1's point that real traffic trickles in), ramp-up serves an important diagnostic purpose: by watching your Aggregate Report or a live graph (Part 10) during ramp-up, you can often see the exact point at which response times start degrading as concurrent load increases — giving you a rough sense of your system's practical capacity ceiling before you even reach full target load, which is valuable information you'd miss entirely if you just slammed straight to peak concurrency.",
      "order": 1
    },
    {
      "id": "jm-8-2-md-2",
      "type": "overview",
      "heading": "Steady state",
      "content": "Steady state is the plateau — once ramp-up completes and your full target thread count is active, holding it there for a meaningful duration (not just a few seconds) is what lets you gather statistically stable results. A test that ramps up and immediately ramps back down without holding steady state gives you almost no usable data, because you're measuring a system in constant flux rather than its behavior at a sustained, settled load level.\n\nHow long \"meaningful\" is depends on the goal — a basic load test might hold steady state for 5–10 minutes, while a soak test (Chapter 1) might hold it for many hours — but the general principle is that steady state needs to be long enough for transient startup effects (connection pool warming, cache population, JIT compilation on the server side) to settle out, so your measured numbers reflect genuine ongoing capacity rather than cold-start artifacts.",
      "order": 2
    },
    {
      "id": "jm-8-2-md-3",
      "type": "overview",
      "heading": "Ramp-down",
      "content": "Ramp-down — often overlooked by beginners who just let a test's duration setting cut threads off abruptly — is the phase where load tapers back off, and it matters for two reasons. First, some tests specifically want to observe recovery behavior: does the system's response times and resource usage return to baseline promptly once load drops, or does it stay degraded (a sign of a leak or a stuck-resource problem, tying back to soak testing considerations)? Second, an abrupt cutoff (rather than a graceful ramp-down) can itself introduce artifacts in your results or logs that have nothing to do with genuine system behavior — a burst of connection-reset errors purely because JMeter's threads were killed mid-request, for instance, muddying your error-rate analysis with noise unrelated to your actual research question.\n\nExample load profile for a moderate load test:\n\n```\nRamp-up:      0 → 200 users over 5 minutes\nSteady state: 200 users held for 20 minutes\nRamp-down:    200 → 0 users over 5 minutes\nTotal test duration: 30 minutes\n```\n\nDesigning this profile well requires grounding the target numbers in something real wherever possible — actual peak concurrent user counts from analytics/monitoring if the system already has production traffic, or reasonable estimates based on total employee count and realistic usage patterns for a new system — rather than picking round numbers arbitrarily, since a load test's conclusions are only as meaningful as how well its profile actually represents genuine or plausible real-world usage.",
      "order": 3
    }
  ],
  "advantages": [
    "8.2 Designing Realistic Load Profiles (Ramp-Up, Steady State, Ramp-Down) — Ramping up and immediately down measures flux, not capacity."
  ],
  "limitations": [
    "8.2 Designing Realistic Load Profiles (Ramp-Up, Steady State, Ramp-Down) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
