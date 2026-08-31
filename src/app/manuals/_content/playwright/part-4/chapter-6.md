---
id: "pw-4-parallel"
title: "22. Parallel Execution & Sharding"
minutes: 40
partName: "Part 4 · Advanced Techniques"
level: "advanced"
---

pytest-xdist for parallel runs pip install pytest-xdist pytest -n 4 # run using 4 parallel workers pytest -n auto # auto-detect CPU core count pytest -n <count> What it does: Distributes tests across multiple worker processes running in parallel instead of sequentially. Types/params: ● <count> (integer or "auto") — number of parallel workers; "auto" picks based on available CPU cores Pointers: Spe

## Overview

What it does: Distributes tests across multiple worker processes running in parallel instead of sequentially.

Types/params:

Pointers: Speed gains are significant but not linear — too many workers on too few CPU cores causes contention that can actually slow things down (ties into Chapter 32's performance tuning). Tests must be properly isolated (no shared mutable state, no fixed ports/files) or parallel execution surfaces race conditions that don't show up running sequentially.

```
pytest-xdist for parallel runs

pip install pytest-xdist
pytest -n 4        # run using 4 parallel workers
pytest -n auto     # auto-detect CPU core count

pytest -n <count>
```

## Sharding tests across machines/CI runners

Pointers: Sharding splits the suite across entirely separate machines (e.g., 4 parallel CI jobs each running a quarter of the suite), which matters once a suite is large enough that even pytest-xdist on one machine isn't fast enough. Most CI platforms (GitHub Actions matrix jobs, for instance) have their own idiomatic way to configure this rather than a single universal flag.

```
pytest --shard-id=1 --num-shards=4    # syntax varies by plugin/CI setup
```