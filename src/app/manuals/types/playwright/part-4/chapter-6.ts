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
  "contentMarkdown": "## Why Parallel Execution?\n\nA 200-test suite running sequentially at 30 seconds each takes 100 minutes. Run those same tests across four workers and the wall-clock time drops to roughly 25 minutes. **pytest-xdist** distributes tests across multiple CPU cores or machines.\n\n## Installing and Running with xdist\n\n```bash\npip install pytest-xdist\npytest -n auto          # one worker per CPU core\npytest -n 4             # exactly 4 workers\n```\n\nEach worker is a separate Python process with its own browser instance. Tests must be **isolated** — no shared mutable state, no hard-coded emails that collide.\n\n## Test Isolation Requirements\n\nParallel-safe tests:\n\n- Create unique data per test (Faker, UUID suffixes).\n- Clean up after themselves (yield fixtures).\n- Do not depend on test execution order.\n- Do not write to shared files without locks.\n\n```python\n@pytest.fixture\ndef unique_user(fake):\n  return {\"email\": fake.unique.email(), \"name\": fake.name()}\n```\n\n## Combining xdist with Markers\n\nRun smoke tests in parallel on every PR; reserve full regression for nightly:\n\n```bash\npytest -n auto -m smoke\npytest -n 4 -m regression\n```\n\n## Sharding — Split Across CI Machines\n\nWhen one machine is not enough, **shard** the suite across multiple CI jobs. Each job runs a slice of the test collection:\n\n```bash\n# Job 1 of 4\npytest --shard=1/4 -n 2\n\n# Job 2 of 4\npytest --shard=2/4 -n 2\n\n# Job 3 of 4\npytest --shard=3/4 -n 2\n\n# Job 4 of 4\npytest --shard=4/4 -n 2\n```\n\nSharding requires pytest-playwright 0.4+ or the `pytest-shard` plugin. Each shard runs a disjoint subset — no test runs twice.\n\n## CI Matrix Example\n\n```yaml\njobs:\n  test:\n    strategy:\n      matrix:\n        shard: [1, 2, 3, 4]\n    steps:\n      - run: pytest --shard=${{ matrix.shard }}/4 -n 2 --browser chromium\n```\n\nFour machines × two workers each = eight concurrent browsers.\n\n## Reporting Across Workers\n\nxdist collects results from all workers into a single report. For HTML reports:\n\n```bash\npip install pytest-html\npytest -n auto --html=report.html --self-contained-html\n```\n\nEach worker writes partial results; pytest merges them at the end.\n\n## Debugging Parallel Failures\n\nParallel failures are often data-collision issues, not timing bugs:\n\n1. Re-run the failing test alone: `pytest tests/test_foo.py::test_bar`.\n2. If it passes in isolation, suspect shared state — duplicate emails, un-cleaned records, file locks.\n3. Add `--dist loadscope` to group tests from the same file on one worker (slower but safer during debugging).\n\n```bash\npytest -n 4 --dist loadscope   # same-file tests stay on one worker\n```\n\n## Playwright-Specific Considerations\n\n- Each worker launches its own browser — budget RAM accordingly (≈300 MB per Chromium instance).\n- Use `scope=\"session\"` browser fixtures carefully; they are per-worker, not global.\n- Traces and screenshots from parallel runs include the worker ID in the filename.\n\n## Key Takeaways\n\n- `pytest -n auto` runs tests in parallel across CPU cores.\n- Tests must use unique data and clean up after themselves.\n- `--shard=N/M` splits the suite across CI machines for massive suites.\n- Failures that pass in isolation usually mean shared-state collisions.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
