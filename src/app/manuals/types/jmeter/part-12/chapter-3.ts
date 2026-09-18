import type { ChapterRecord } from "../../../types";

/** C. Best practices & common mistakes */
export const chapter = {
  "id": "jm-12-3-best-practices-common-mistakes",
  "title": "C. Best practices & common mistakes",
  "minutes": 20,
  "level": "intermediate",
  "phase": "Part 12 · Appendices",
  "partName": "Part 12 · Appendices",
  "overviewText": "Never GUI-load. Always assert bodies. Validate at 1 thread. Vary data. Name the test type. Read percentiles. Centralize config. Correlate auth. Ground numbers in reality. These are the habits the rest of the manual was building.",
  "why": "A checklist after 11 parts is how you catch the green-Start and average-only mistakes under deadline.",
  "when": "Before every reported run and every new plan review.",
  "practical": {
    "app": "Any HRM JMeter plan about to be presented",
    "scenario": "Pre-flight before sending numbers to Vatsalya.",
    "pass": "You confirm CLI, assertions, CSV/UUIDs, load-vs-stress label, p95, correlated tokens, analytics-based N.",
    "fail": "You ship GUI averages with EMP1042 × 200 threads."
  },
  "tools": [],
  "customSummary": "- Never run real load through the GUI.\n- Always pair samplers with real content assertions, not just default status-code checks.\n- Validate at 1 thread before scaling.\n- Avoid hardcoded/reused data across virtual users.\n- Know which test type (load/stress/spike/soak) you're running before designing the profile.\n- Read percentiles, not averages.\n- Centralize configuration (Defaults, UDV, CSV, CI properties) instead of hardcoding.\n- Treat correlation as mandatory for authenticated flows.\n- Ground load numbers in real/estimated traffic data, not arbitrary round numbers.",
  "contentMarkdown": "## Never run real load through the GUI\n\nNever run real load through the GUI (Part 0, Part 9) — the single most repeated rule in this manual for good reason; it's also the single most common beginner mistake, because the GUI is right there and the CLI feels like an extra step.\n\n## Assert more than status codes\n\nAlways pair samplers with real assertions, not just default status-code checks (Part 2, Part 4) — a green checkmark that only means \"got a 2xx\" can hide a functionally broken response, producing a false sense of confidence in results that are actually meaningless.\n\n## One user first\n\nValidate correctness at 1 thread before scaling to real load (Part 2) — proving a test plan is functionally correct at trivial scale before layering on concurrency, ramp-up, and pacing avoids wasting real load-test time debugging what turns out to be a basic configuration mistake, discovered only after burning 20 minutes of a full-scale run.\n\n## Vary the data\n\nDon't reuse identical hardcoded data across virtual users (Part 3, Part 7) — whether via CSV Data Set Config or dynamic functions/UUIDs, realistic per-user variation avoids both unrealistic test conditions and genuine data-pollution problems (duplicate leave requests, artificial database contention) from replaying identical payloads at volume.\n\n## Name the test type\n\nUnderstand what you're actually testing before you test it (Part 8) — knowing whether you're running a load, stress, spike, or soak test isn't a semantic nitpick; it determines your entire load profile design and what conclusions your results can actually support. A stress test's results don't tell you whether normal traffic is fine, and a load test's results don't tell you where the breaking point is — conflating them leads to wrong conclusions confidently presented.\n\n## Distrust averages\n\nDistrust averages; read percentiles (Part 10) — this is worth restating as a standalone habit, not just a metric definition: every results review should start with 95th/99th percentile numbers, not the average, since the average is the number most likely to mislead.\n\n## Centralize configuration\n\nCentralize configuration, don't hardcode (running theme across Part 3, Part 8, Part 11) — HTTP Request Defaults, User Defined Variables, CSV Data Set Config, and CI-level `-J` property overrides all serve the same underlying principle: a value that might need to change (environment, credentials, thread count) should live in exactly one place, not be copy-pasted across dozens of samplers.\n\n## Correlate auth\n\nTreat correlation as mandatory, not optional, for any authenticated flow (Part 5) — a recorded or hardcoded token will always eventually break; building proper extraction and variable-passing from the start avoids a very common category of \"my test worked yesterday and now it doesn't\" confusion.\n\n## Ground the numbers\n\nGround load numbers in reality wherever possible (Part 8) — thread counts, ramp-up durations, and pacing targets picked from real analytics or genuinely reasoned estimates produce results that mean something; round numbers picked for convenience produce results that are precise but not necessarily meaningful.",
  "blocks": [
    {
      "id": "jm-12-3-md-0",
      "type": "overview",
      "heading": "Never run real load through the GUI",
      "content": "Never run real load through the GUI (Part 0, Part 9) — the single most repeated rule in this manual for good reason; it's also the single most common beginner mistake, because the GUI is right there and the CLI feels like an extra step.",
      "order": 0
    },
    {
      "id": "jm-12-3-md-1",
      "type": "overview",
      "heading": "Assert more than status codes",
      "content": "Always pair samplers with real assertions, not just default status-code checks (Part 2, Part 4) — a green checkmark that only means \"got a 2xx\" can hide a functionally broken response, producing a false sense of confidence in results that are actually meaningless.",
      "order": 1
    },
    {
      "id": "jm-12-3-md-2",
      "type": "overview",
      "heading": "One user first",
      "content": "Validate correctness at 1 thread before scaling to real load (Part 2) — proving a test plan is functionally correct at trivial scale before layering on concurrency, ramp-up, and pacing avoids wasting real load-test time debugging what turns out to be a basic configuration mistake, discovered only after burning 20 minutes of a full-scale run.",
      "order": 2
    },
    {
      "id": "jm-12-3-md-3",
      "type": "overview",
      "heading": "Vary the data",
      "content": "Don't reuse identical hardcoded data across virtual users (Part 3, Part 7) — whether via CSV Data Set Config or dynamic functions/UUIDs, realistic per-user variation avoids both unrealistic test conditions and genuine data-pollution problems (duplicate leave requests, artificial database contention) from replaying identical payloads at volume.",
      "order": 3
    },
    {
      "id": "jm-12-3-md-4",
      "type": "overview",
      "heading": "Name the test type",
      "content": "Understand what you're actually testing before you test it (Part 8) — knowing whether you're running a load, stress, spike, or soak test isn't a semantic nitpick; it determines your entire load profile design and what conclusions your results can actually support. A stress test's results don't tell you whether normal traffic is fine, and a load test's results don't tell you where the breaking point is — conflating them leads to wrong conclusions confidently presented.",
      "order": 4
    },
    {
      "id": "jm-12-3-md-5",
      "type": "overview",
      "heading": "Distrust averages",
      "content": "Distrust averages; read percentiles (Part 10) — this is worth restating as a standalone habit, not just a metric definition: every results review should start with 95th/99th percentile numbers, not the average, since the average is the number most likely to mislead.",
      "order": 5
    },
    {
      "id": "jm-12-3-md-6",
      "type": "overview",
      "heading": "Centralize configuration",
      "content": "Centralize configuration, don't hardcode (running theme across Part 3, Part 8, Part 11) — HTTP Request Defaults, User Defined Variables, CSV Data Set Config, and CI-level `-J` property overrides all serve the same underlying principle: a value that might need to change (environment, credentials, thread count) should live in exactly one place, not be copy-pasted across dozens of samplers.",
      "order": 6
    },
    {
      "id": "jm-12-3-md-7",
      "type": "overview",
      "heading": "Correlate auth",
      "content": "Treat correlation as mandatory, not optional, for any authenticated flow (Part 5) — a recorded or hardcoded token will always eventually break; building proper extraction and variable-passing from the start avoids a very common category of \"my test worked yesterday and now it doesn't\" confusion.",
      "order": 7
    },
    {
      "id": "jm-12-3-md-8",
      "type": "overview",
      "heading": "Ground the numbers",
      "content": "Ground load numbers in reality wherever possible (Part 8) — thread counts, ramp-up durations, and pacing targets picked from real analytics or genuinely reasoned estimates produce results that mean something; round numbers picked for convenience produce results that are precise but not necessarily meaningful.",
      "order": 8
    }
  ],
  "advantages": [
    "C. Best practices & common mistakes — A checklist after 11 parts is how you catch the green-Start and average-only mistakes under deadline."
  ],
  "limitations": [
    "C. Best practices & common mistakes is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
