import type { ChapterRecord } from "../../types";

/** 22. Parallel Execution & Sharding */
export const chapter = {
  "id": "pw-4-parallel",
  "title": "22. Parallel Execution & Sharding",
  "minutes": 40,
  "level": "advanced",
  "phase": "Part 4 · Advanced Techniques",
  "partName": "Part 4 · Advanced Techniques",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "pytest-xdist for parallel runs pip install pytest-xdist pytest -n 4 # run using 4 parallel workers pytest -n auto # auto-detect CPU core count pytest -n <count> What it does: Distributes tests across multiple worker processes running in parallel instead of sequentially. Types/params: ● <count> (integer or \"auto\") — number of parallel workers; \"auto\" picks based on available CPU cores Pointers: Spe\n\n## Overview\n\nWhat it does: Distributes tests across multiple worker processes running in parallel instead of sequentially.\n\nTypes/params:\n\nPointers: Speed gains are significant but not linear — too many workers on too few CPU cores causes contention that can actually slow things down (ties into Chapter 32's performance tuning). Tests must be properly isolated (no shared mutable state, no fixed ports/files) or parallel execution surfaces race conditions that don't show up running sequentially.\n\n```\npytest-xdist for parallel runs\n\npip install pytest-xdist\npytest -n 4        # run using 4 parallel workers\npytest -n auto     # auto-detect CPU core count\n\npytest -n <count>\n```\n\n## Sharding tests across machines/CI runners\n\nPointers: Sharding splits the suite across entirely separate machines (e.g., 4 parallel CI jobs each running a quarter of the suite), which matters once a suite is large enough that even pytest-xdist on one machine isn't fast enough. Most CI platforms (GitHub Actions matrix jobs, for instance) have their own idiomatic way to configure this rather than a single universal flag.\n\n```\npytest --shard-id=1 --num-shards=4    # syntax varies by plugin/CI setup\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
