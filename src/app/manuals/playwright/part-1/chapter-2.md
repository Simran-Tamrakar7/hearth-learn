---
id: "pw-1-setup"
title: "2. Environment Setup"
minutes: 45
partName: "Part 1 · Foundations"
level: "beginner"
---

venv hygiene, install pytest-playwright + browser binaries, and a starter folder structure that won’t fight you when POM arrives.

## Python, pip, and virtual environments

Assuming Python is installed, the critical habit here is virtual environments (venv). Every project should get its own isolated environment.

```
python -m venv venv
source venv/bin/activate      # Mac/Linux
venv\Scripts\activate         # Windows
```

## Installing Playwright + browser binaries

Two separate steps that beginners often miss the distinction between.

## Project folder structure

Even a simple starting structure pays off later (preview of Chapter 14’s POM and Chapter 29’s scalable architecture). Starting with this loose structure — rather than dumping every test file flat in one folder — means you won’t need a painful reorganization once the suite grows past a handful of tests.

```
project/
├── tests/
├── pages/          # page object classes — comes later
├── conftest.py
├── pytest.ini
└── requirements.txt
```