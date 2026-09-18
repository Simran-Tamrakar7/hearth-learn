import type { ChapterRecord } from "../../../types";

/** 4.2 Timers (Constant, Uniform Random, Gaussian) */
export const chapter = {
  "id": "jm-4-2-timers-constant-uniform-random-gaussian",
  "title": "4.2 Timers (Constant, Uniform Random, Gaussian)",
  "minutes": 24,
  "level": "intermediate",
  "phase": "Part 4 · Controllers & Logic",
  "partName": "Part 4 · Controllers & Logic",
  "overviewText": "Without a timer, JMeter fires the next sampler the instant the previous response arrives — useful for stress, not for people. Think time is Constant, Uniform Random, or Gaussian. Too little think time overloads the server vs real users; too much can hide rapid-fire bottlenecks.",
  "why": "Throughput math is wrong if 100 'users' have zero pause. Lockstep Constant timers create artificial waves. Base pauses on analytics when you can.",
  "when": "Any load test meant to model humans; skip or minimize timers only for breaking-point stress.",
  "practical": {
    "app": "Leave form think time before submit",
    "scenario": "100 users filling a leave form — not slamming submit at wire speed.",
    "pass": "You add Uniform Random (e.g. 1–3s) at Thread Group; you know Gaussian is for tighter human-like clustering; you don't use only Constant for a 'realistic' test.",
    "fail": "You omit timers on a 'load' test and report the server failed at a request rate real users would never generate."
  },
  "tools": [],
  "customSummary": "- Without a timer, requests fire back-to-back as fast as possible — unrealistic except for stress/breaking-point tests.\n- Constant Timer: fixed pause every time — simple but produces artificial \"lockstep\" synchronized traffic.\n- Uniform Random Timer: random pause between a min and max — breaks lockstep, more realistic variety.\n- Gaussian Random Timer: bell-curve-distributed pauses around a mean — highest behavioral realism, used for more rigorous modeling.\n- Think time directly affects throughput math — too little = false-negative overload, too much = may mask real rapid-fire bottlenecks; base durations on real observed user behavior where possible.",
  "contentMarkdown": "## Why think time exists\n\nWithout any timer, JMeter fires each thread's next sampler the instant the previous one's response arrives — as fast as physically possible. This is useful for pure stress/breaking-point testing (Part 8), but it does not represent how real users actually behave: real people pause to read a page, think about what to click next, or fill out a form, before triggering the next request. Timers exist to insert these realistic pauses, collectively referred to as \"think time,\" between samplers.\n\n## Constant Timer\n\nConstant Timer is the simplest — it pauses for a fixed number of milliseconds before every sampler in its scope. Setting a Constant Timer to 2000ms under a Thread Group means every single request across every thread waits exactly 2 seconds before firing. This is easy to configure but somewhat artificial, since real users don't pause for the exact same duration every single time — everyone reading a leave-request form and clicking submit doesn't take precisely 2.000 seconds, so tests using only Constant Timers can produce unnaturally uniform, \"lockstep\" traffic patterns where all your virtual users hit the server in suspicious synchronized waves.\n\n## Uniform Random Timer\n\nUniform Random Timer addresses this by pausing for a random duration between a minimum and a random-range maximum you configure — e.g., a constant base of 1000ms plus a random additional 0–2000ms, producing pause times uniformly distributed between 1 and 3 seconds across different requests and threads. This breaks the lockstep pattern and is a substantial realism improvement over Constant Timer for the same reason randomized data in CSV Data Set Config (Part 3) was an improvement over hardcoded values — variety prevents artificial, non-representative synchronization in your simulated traffic.\n\n## Gaussian Random Timer\n\nGaussian Random Timer goes a step further, producing pause durations following a bell-curve (normal) distribution around a configured mean, rather than a flat uniform spread — meaning most pauses cluster close to the average \"think time,\" with progressively fewer very-short or very-long pauses the further you get from that mean, similar to how real human response times to, say, \"how long before you click submit after the page loads\" actually tend to cluster statistically. For most everyday load tests, Uniform Random Timer is sufficient and simpler to reason about; Gaussian is reached for when you specifically want to model human behavioral realism with more statistical fidelity, such as in academic-grade or highly polished performance benchmarking work.\n\n## Think time changes the question you answered\n\nIt's worth being explicit about why timers matter beyond \"realism\" as an abstract goal: think time directly affects your throughput math. If 100 users hit your server with zero think time, you might generate far more requests per second than 100 real users ever would in practice, which could make your server look like it's failing under a load level that would never actually occur in production — a false negative in the \"is my system ready for real traffic\" sense. Conversely, way too much artificial think time could mask a genuine bottleneck that only appears under rapid-fire real conditions (e.g., a mobile app's background sync hitting an endpoint every few hundred milliseconds, not seconds). Choosing the right timer type and duration is a modeling decision tied directly to actual observed user behavior for the system under test — ideally informed by real analytics data (average time between actions) rather than a guess.",
  "blocks": [
    {
      "id": "jm-4-2-md-0",
      "type": "overview",
      "heading": "Why think time exists",
      "content": "Without any timer, JMeter fires each thread's next sampler the instant the previous one's response arrives — as fast as physically possible. This is useful for pure stress/breaking-point testing (Part 8), but it does not represent how real users actually behave: real people pause to read a page, think about what to click next, or fill out a form, before triggering the next request. Timers exist to insert these realistic pauses, collectively referred to as \"think time,\" between samplers.",
      "order": 0
    },
    {
      "id": "jm-4-2-md-1",
      "type": "overview",
      "heading": "Constant Timer",
      "content": "Constant Timer is the simplest — it pauses for a fixed number of milliseconds before every sampler in its scope. Setting a Constant Timer to 2000ms under a Thread Group means every single request across every thread waits exactly 2 seconds before firing. This is easy to configure but somewhat artificial, since real users don't pause for the exact same duration every single time — everyone reading a leave-request form and clicking submit doesn't take precisely 2.000 seconds, so tests using only Constant Timers can produce unnaturally uniform, \"lockstep\" traffic patterns where all your virtual users hit the server in suspicious synchronized waves.",
      "order": 1
    },
    {
      "id": "jm-4-2-md-2",
      "type": "overview",
      "heading": "Uniform Random Timer",
      "content": "Uniform Random Timer addresses this by pausing for a random duration between a minimum and a random-range maximum you configure — e.g., a constant base of 1000ms plus a random additional 0–2000ms, producing pause times uniformly distributed between 1 and 3 seconds across different requests and threads. This breaks the lockstep pattern and is a substantial realism improvement over Constant Timer for the same reason randomized data in CSV Data Set Config (Part 3) was an improvement over hardcoded values — variety prevents artificial, non-representative synchronization in your simulated traffic.",
      "order": 2
    },
    {
      "id": "jm-4-2-md-3",
      "type": "overview",
      "heading": "Gaussian Random Timer",
      "content": "Gaussian Random Timer goes a step further, producing pause durations following a bell-curve (normal) distribution around a configured mean, rather than a flat uniform spread — meaning most pauses cluster close to the average \"think time,\" with progressively fewer very-short or very-long pauses the further you get from that mean, similar to how real human response times to, say, \"how long before you click submit after the page loads\" actually tend to cluster statistically. For most everyday load tests, Uniform Random Timer is sufficient and simpler to reason about; Gaussian is reached for when you specifically want to model human behavioral realism with more statistical fidelity, such as in academic-grade or highly polished performance benchmarking work.",
      "order": 3
    },
    {
      "id": "jm-4-2-md-4",
      "type": "overview",
      "heading": "Think time changes the question you answered",
      "content": "It's worth being explicit about why timers matter beyond \"realism\" as an abstract goal: think time directly affects your throughput math. If 100 users hit your server with zero think time, you might generate far more requests per second than 100 real users ever would in practice, which could make your server look like it's failing under a load level that would never actually occur in production — a false negative in the \"is my system ready for real traffic\" sense. Conversely, way too much artificial think time could mask a genuine bottleneck that only appears under rapid-fire real conditions (e.g., a mobile app's background sync hitting an endpoint every few hundred milliseconds, not seconds). Choosing the right timer type and duration is a modeling decision tied directly to actual observed user behavior for the system under test — ideally informed by real analytics data (average time between actions) rather than a guess.",
      "order": 4
    }
  ],
  "advantages": [
    "4.2 Timers (Constant, Uniform Random, Gaussian) — Throughput math is wrong if 100 'users' have zero pause."
  ],
  "limitations": [
    "4.2 Timers (Constant, Uniform Random, Gaussian) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
