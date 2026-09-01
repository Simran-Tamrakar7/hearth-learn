import type { ChapterRecord } from "../../../types";

/** 22. Parallel Execution & Sharding */
export const chapter = {
  "id": "pw-4-parallel",
  "title": "22. Parallel Execution & Sharding",
  "minutes": 40,
  "level": "advanced",
  "phase": "Part 4 · Advanced Techniques",
  "partName": "Part 4 · Advanced Techniques",
  "overviewText": "pytest-xdist distributes tests across multiple worker processes running in parallel instead of sequentially — pytest -n 4 uses four workers, pytest -n auto picks based on CPU cores. Speed gains are significant but not linear: too many workers on too few cores causes contention. Tests must be properly isolated (no shared mutable state, no fixed ports or files) or parallel execution surfaces race conditions invisible in sequential runs. Sharding splits the suite across entirely separate machines — four CI jobs each running a quarter of the suite — for suites too large for single-machine parallelism. Most CI platforms (GitHub Actions matrix jobs) configure sharding idiomatically rather than via a single universal flag.",
  "why": "A 400-test suite running sequentially at 30 seconds each takes 3.3 hours. Four parallel workers cut that to ~50 minutes. Without parallelism, teams skip running the full suite on every commit, letting regressions slip through. But parallel execution also exposes hidden coupling — tests that depend on execution order or shared files pass sequentially and fail randomly in parallel, which is actually valuable: it reveals tests that were never truly isolated.",
  "when": "Install pytest-xdist when sequential suite time exceeds 15 minutes or when smoke runs need to finish under 5 minutes. Start with pytest -n auto and tune down if workers contend for CPU. Ensure every test creates its own data (Faker, Chapter 16) and cleans up after itself before enabling parallelism. Shard across CI machines when single-machine parallelism still exceeds your time budget.",
  "practical": {
    "app": "HRMS — Full regression suite",
    "scenario": "The HRMS regression suite has 380 tests averaging 25 seconds each — 2.6 hours sequential. pytest -n 4 on a 4-core CI runner finishes in 42 minutes. Two tests that shared a hardcoded username start failing randomly in parallel; fixing them to use Faker-generated unique emails stabilizes the parallel run.",
    "pass": "pytest -n auto completes 380 tests in under 45 minutes; each test uses unique Faker data and cleans up via API teardown.",
    "fail": "pytest -n 8 on a 2-core machine causes CPU thrashing and slower results than sequential; tests sharing /tmp/test-output.txt corrupt each other's files."
  },
  "advantages": [
    "Near-linear speedup for properly isolated test suites",
    "pytest -n auto requires zero configuration tuning on most machines",
    "Exposes hidden test coupling that sequential runs mask",
    "Combines with markers — pytest -n 4 -m smoke for fast parallel smoke runs",
    "Sharding scales beyond single-machine limits for very large suites"
  ],
  "limitations": [
    "Not linear speedup — worker overhead and resource contention cap gains",
    "Tests sharing state, files, or fixed ports fail randomly in parallel",
    "Browser instances per worker consume significant RAM — 4 workers × 200MB each",
    "Debugging parallel failures is harder — failures may not reproduce sequentially",
    "Sharding requires CI platform configuration — not a single pytest flag"
  ],
  "tools": [
    {
      "name": "pytest-xdist",
      "sub": "Parallel test execution",
      "url": "https://github.com/pytest-dev/pytest-xdist",
      "desc": "pytest-xdist is a pytest plugin that runs tests across multiple CPU cores using worker processes. Each worker is an independent pytest process that receives a subset of tests via load balancing. Install with pip install pytest-xdist and invoke with pytest -n <count> or pytest -n auto. Workers are isolated processes — they do not share memory, but they do share the filesystem and network, which is where isolation bugs surface.",
      "adv": [
        "Drop-in parallelism — add -n flag to existing pytest command",
        "auto mode detects CPU cores without manual tuning",
        "Load balancing distributes tests dynamically across workers",
        "Works with all pytest features — markers, fixtures, parametrize"
      ],
      "lim": [
        "Workers share filesystem — file-based test state causes race conditions",
        "Each worker launches its own browser — RAM usage scales with worker count",
        "Failure reproduction may require running with -n 0 (sequential)",
        "Does not help with a single slow test — only parallelizes across tests"
      ],
      "steps": [
        {
          "t": "Step 1 — Install pytest-xdist",
          "p": "Add to project dependencies:",
          "c": "pip install pytest-xdist"
        },
        {
          "t": "Step 2 — Run with parallel workers",
          "p": "Use -n flag to specify worker count:",
          "c": "pytest -n 4                    # 4 parallel workers\npytest -n auto                 # auto-detect CPU cores\npytest -n 4 -m smoke           # parallel smoke subset"
        },
        {
          "t": "Step 3 — Verify test isolation before parallelizing",
          "p": "Ensure unique data and cleanup in every test:",
          "c": "# Each test must create its own data\n@pytest.fixture\ndef unique_user():\n    fake = Faker()\n    user = {\"email\": fake.email(), \"name\": fake.name()}\n    yield user\n    api_delete_user(user[\"email\"])  # cleanup even on failure"
        },
        {
          "t": "Step 4 — Shard across CI machines",
          "p": "Split suite across matrix jobs (GitHub Actions example):",
          "c": "# .github/workflows/test.yml\nstrategy:\n  matrix:\n    shard: [1, 2, 3, 4]\nsteps:\n  - run: pytest --shard-id=${{ matrix.shard }} --num-shards=4"
        }
      ]
    }
  ],
  "contentMarkdown": "pytest-xdist for parallel runs pip install pytest-xdist pytest -n 4 # run using 4 parallel workers pytest -n auto # auto-detect CPU core count pytest -n <count> What it does: Distributes tests across multiple worker processes running in parallel instead of sequentially. Types/params: ● <count> (integer or \"auto\") — number of parallel workers; \"auto\" picks based on available CPU cores Pointers: Spe\n\n## Overview\n\nWhat it does: Distributes tests across multiple worker processes running in parallel instead of sequentially.\n\nTypes/params:\n\nPointers: Speed gains are significant but not linear — too many workers on too few CPU cores causes contention that can actually slow things down (ties into Chapter 32's performance tuning). Tests must be properly isolated (no shared mutable state, no fixed ports/files) or parallel execution surfaces race conditions that don't show up running sequentially.\n\n```\npytest-xdist for parallel runs\n\npip install pytest-xdist\npytest -n 4        # run using 4 parallel workers\npytest -n auto     # auto-detect CPU core count\n\npytest -n <count>\n```\n\n## Sharding tests across machines/CI runners\n\nPointers: Sharding splits the suite across entirely separate machines (e.g., 4 parallel CI jobs each running a quarter of the suite), which matters once a suite is large enough that even pytest-xdist on one machine isn't fast enough. Most CI platforms (GitHub Actions matrix jobs, for instance) have their own idiomatic way to configure this rather than a single universal flag.\n\n```\npytest --shard-id=1 --num-shards=4    # syntax varies by plugin/CI setup\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
