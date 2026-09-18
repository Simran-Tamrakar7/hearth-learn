import type { ChapterRecord } from "../../../types";

/** 1.2 Thread Groups (Users, Ramp-Up, Loop Count) */
export const chapter = {
  "id": "jm-1-2-thread-groups-users-ramp-up-loop-count",
  "title": "1.2 Thread Groups (Users, Ramp-Up, Loop Count)",
  "minutes": 28,
  "level": "beginner",
  "phase": "Part 1 · Core Building Blocks",
  "partName": "Part 1 · Core Building Blocks",
  "overviewText": "The Thread Group is where you define how much load you're generating and how it ramps in over time — arguably the single most important configuration in any performance test, because getting this wrong produces meaningless results even if every other part of your test is perfect.",
  "why": "Thread count without ramp-up and duration is not a load profile. Forever + Duration is the backbone of soak/load holds; ramp-up 0 is a spike, not 'normal traffic.'",
  "when": "Every time you set users for an HRM morning check-in, a TADA month-end spike, or a 5-minute steady-state run.",
  "practical": {
    "app": "HRM attendance API",
    "scenario": "Design 100 concurrent users for a 5-minute hold without slamming login in one millisecond.",
    "pass": "You set 100 threads, 60s ramp-up, Forever + Duration 300s, and know Setup Thread Group exists for a one-time token fetch.",
    "fail": "You set ramp-up 0 for a 'normal' load test, or Loop Count 1 and call it a soak."
  },
  "tools": [],
  "customSummary": "- Number of Threads = concurrent virtual users.\n- Ramp-Up Period = seconds to gradually start all threads (0 = simultaneous spike, longer = realistic trickle).\n- Loop Count = iterations per thread; \"Forever\" + Duration/Startup Delay = standard pattern for sustained/soak tests.\n- Setup/Teardown Thread Groups exist for one-time pre/post actions (e.g., fetching an auth token).\n- Plugin-based thread groups (Ultimate/Concurrency) allow staged non-linear ramp patterns (Appendix D).",
  "contentMarkdown": "## Number of Threads (users)\n\nNumber of Threads (users) is exactly what it sounds like: how many concurrent virtual users JMeter will simulate. Each thread runs completely independently through the sampler tree, with its own variables and cookies (unless you explicitly share state, which is a more advanced pattern). If you set this to 50, JMeter will eventually have 50 simultaneous threads hammering your target — though \"simultaneously\" depends heavily on the next setting.\n\n## Ramp-Up Period\n\nRamp-Up Period (in seconds) controls how long JMeter takes to start all the threads. If you set 50 threads with a 50-second ramp-up, JMeter starts one new thread per second. This matters enormously for realism: real traffic to your HR system doesn't arrive as 50 people clicking \"log in\" in the exact same millisecond — it trickles in over a check-in window.\n\nA ramp-up of 0 means JMeter tries to fire every thread at once, which is useful specifically for spike testing (Part 8) but unrealistic for normal load simulation. A common rule of thumb: ramp-up seconds should roughly equal or exceed the number of threads for a gentle ramp (1 user/sec), though this is entirely dependent on what real-world pattern you're trying to model.\n\n## Loop Count, Forever, and Duration\n\nLoop Count decides how many times each thread repeats its entire set of samplers. Setting it to 5 means each of your 50 users will run through the full script 5 times before finishing (producing 250 total iterations). Setting it to \"Forever\" (a checkbox, not a number) makes it run indefinitely, which is typically combined with a Duration and Startup Delay setting (found by expanding the Thread Group's scheduler section) to instead run for, say, 10 minutes regardless of loop count — this is the standard pattern for sustained load/soak tests (Part 8), since you usually care about \"hold X users active for Y minutes\" rather than \"each user does exactly N iterations.\"\n\nExample Thread Group config for a moderate load test:\n\n```\nNumber of Threads: 100\nRamp-Up Period: 60 (seconds)\nLoop Count: Forever\nDuration: 300 (seconds, i.e. 5 min steady-state)\nStartup Delay: 0\n```\n\nThis configuration means: over the first 60 seconds, JMeter gradually brings 100 users online (~1.67 users/sec), then holds all 100 active and looping continuously for 5 minutes total (including the ramp-up), then stops. This ramp-up + duration pattern is the backbone of nearly every real load test you'll build, and it directly sets up the load-profile design concepts in Part 8 (load vs. stress vs. soak).\n\n## Other Thread Group types\n\nIt's also worth knowing there are multiple types of Thread Groups beyond the standard one — Setup Thread Group (runs once before the main test, useful for one-time setup like fetching an auth token), Teardown Thread Group (runs after, for cleanup), and plugin-provided ones like the Ultimate/Concurrency Thread Group (which allow non-linear, staged ramp patterns — e.g., ramp up, hold, ramp down, hold at a different level — and are covered in Appendix D since they require the Plugins Manager).",
  "blocks": [
    {
      "id": "jm-1-2-md-0",
      "type": "overview",
      "heading": "Number of Threads (users)",
      "content": "Number of Threads (users) is exactly what it sounds like: how many concurrent virtual users JMeter will simulate. Each thread runs completely independently through the sampler tree, with its own variables and cookies (unless you explicitly share state, which is a more advanced pattern). If you set this to 50, JMeter will eventually have 50 simultaneous threads hammering your target — though \"simultaneously\" depends heavily on the next setting.",
      "order": 0
    },
    {
      "id": "jm-1-2-md-1",
      "type": "overview",
      "heading": "Ramp-Up Period",
      "content": "Ramp-Up Period (in seconds) controls how long JMeter takes to start all the threads. If you set 50 threads with a 50-second ramp-up, JMeter starts one new thread per second. This matters enormously for realism: real traffic to your HR system doesn't arrive as 50 people clicking \"log in\" in the exact same millisecond — it trickles in over a check-in window.\n\nA ramp-up of 0 means JMeter tries to fire every thread at once, which is useful specifically for spike testing (Part 8) but unrealistic for normal load simulation. A common rule of thumb: ramp-up seconds should roughly equal or exceed the number of threads for a gentle ramp (1 user/sec), though this is entirely dependent on what real-world pattern you're trying to model.",
      "order": 1
    },
    {
      "id": "jm-1-2-md-2",
      "type": "overview",
      "heading": "Loop Count, Forever, and Duration",
      "content": "Loop Count decides how many times each thread repeats its entire set of samplers. Setting it to 5 means each of your 50 users will run through the full script 5 times before finishing (producing 250 total iterations). Setting it to \"Forever\" (a checkbox, not a number) makes it run indefinitely, which is typically combined with a Duration and Startup Delay setting (found by expanding the Thread Group's scheduler section) to instead run for, say, 10 minutes regardless of loop count — this is the standard pattern for sustained load/soak tests (Part 8), since you usually care about \"hold X users active for Y minutes\" rather than \"each user does exactly N iterations.\"\n\nExample Thread Group config for a moderate load test:\n\n```\nNumber of Threads: 100\nRamp-Up Period: 60 (seconds)\nLoop Count: Forever\nDuration: 300 (seconds, i.e. 5 min steady-state)\nStartup Delay: 0\n```\n\nThis configuration means: over the first 60 seconds, JMeter gradually brings 100 users online (~1.67 users/sec), then holds all 100 active and looping continuously for 5 minutes total (including the ramp-up), then stops. This ramp-up + duration pattern is the backbone of nearly every real load test you'll build, and it directly sets up the load-profile design concepts in Part 8 (load vs. stress vs. soak).",
      "order": 2
    },
    {
      "id": "jm-1-2-md-3",
      "type": "overview",
      "heading": "Other Thread Group types",
      "content": "It's also worth knowing there are multiple types of Thread Groups beyond the standard one — Setup Thread Group (runs once before the main test, useful for one-time setup like fetching an auth token), Teardown Thread Group (runs after, for cleanup), and plugin-provided ones like the Ultimate/Concurrency Thread Group (which allow non-linear, staged ramp patterns — e.g., ramp up, hold, ramp down, hold at a different level — and are covered in Appendix D since they require the Plugins Manager).",
      "order": 3
    }
  ],
  "advantages": [
    "1.2 Thread Groups (Users, Ramp-Up, Loop Count) — Thread count without ramp-up and duration is not a load profile."
  ],
  "limitations": [
    "1.2 Thread Groups (Users, Ramp-Up, Loop Count) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
