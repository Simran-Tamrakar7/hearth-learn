import type { ChapterRecord } from "../../../types";

/** 27. Dockerizing Playwright Tests */
export const chapter = {
  "id": "pw-5-docker",
  "title": "27. Dockerizing Playwright Tests",
  "minutes": 40,
  "level": "advanced",
  "phase": "Part 5 · CI/CD & Reporting",
  "partName": "Part 5 · CI/CD & Reporting",
  "overviewText": "Dockerizing Playwright tests means packaging your test suite, Python dependencies, and browser binaries into a container image that runs identically on any machine — your laptop, a colleague's Windows machine, a GitHub Actions runner, or a Jenkins agent. Microsoft publishes an official Playwright Docker image (mcr.microsoft.com/playwright/python) with browsers and all OS-level system dependencies pre-installed, eliminating the most common cause of \"works on my machine, fails in CI\" failures. A Dockerfile layers your test code and pip dependencies on top of that base image. The key discipline is version pinning: the Docker image tag (e.g., v1.48.0-jammy) must match your installed playwright pip package version, or browser protocol mismatches cause obscure failures.",
  "why": "Environment inconsistency is the silent killer of test automation reliability. A developer's Mac has different font libraries, screen resolutions, and browser versions than a Linux CI runner — and both differ from a colleague's Windows machine. Docker eliminates that variance by shipping the exact same runtime everywhere. For teams that can't use GitHub-hosted runners (internal network requirements, specific hardware), a Docker image is the portable CI environment. It also makes onboarding new team members trivial: docker run and the suite runs, no local browser installation required.",
  "when": "Dockerize when your team has more than one developer running the suite, when CI failures are caused by environment differences rather than test logic, or when you need to run tests against internal staging environments that require a specific network configuration. Start from the official Playwright image rather than a plain Python image — manually installing browsers and OS dependencies in a Dockerfile is error-prone and almost always slower than using Microsoft's pre-built base.",
  "practical": {
    "app": "Bizlevate HRMS — Cross-platform QA team",
    "scenario": "A QA engineer on Windows clones the repo and runs docker build -t pw-tests . && docker run pw-tests. The same Docker image runs in GitHub Actions via a container job, producing identical results on both platforms.",
    "pass": "All 47 tests pass in the Docker container on both the Windows developer machine and the GitHub Actions Linux runner. Browser version, OS libraries, and Python dependencies are identical — no environment-specific failures.",
    "fail": "A developer builds a Dockerfile from python:3.11-slim, manually runs playwright install, but skips system dependency installation. Tests pass locally on their Mac (which already has the libraries) but fail in the Docker container with 'Browser closed unexpectedly' — the exact problem the official Playwright image exists to prevent."
  },
  "advantages": [
    "Identical runtime on every machine — eliminates environment-specific test failures",
    "Official Playwright image includes browsers and all OS dependencies pre-installed",
    "New team members run the suite with docker run — no local browser setup required",
    "Docker layer caching speeds up repeated CI builds when only test code changes",
    "Portable across GitHub Actions container jobs, Jenkins agents, and local development",
    "Version pinning (image tag = pip package version) prevents browser protocol mismatches"
  ],
  "limitations": [
    "Docker adds build time overhead — first build downloads the base image (~1–2 GB)",
    "Debugging inside a container is harder than running tests directly on the host",
    "Image tag must be updated whenever the playwright pip package is upgraded — easy to forget",
    "Running headed (non-headless) tests in Docker requires xvfb configuration",
    "Docker Desktop licensing applies on Windows and Mac for commercial use",
    "Network access to internal staging environments may require custom Docker network configuration"
  ],
  "tools": [
    {
      "name": "Docker",
      "sub": "Containerization",
      "url": "https://www.docker.com",
      "desc": "Docker packages applications and their dependencies into portable container images that run consistently across any host with Docker installed. For Playwright test suites, Docker eliminates the 'works on my machine' problem by shipping the exact Python version, pip packages, browser binaries, and OS-level libraries together. Dockerfiles define the build steps; docker run executes the container. In CI, GitHub Actions supports container jobs that run steps inside a specified Docker image.",
      "adv": [
        "Identical environment on developer laptops, CI runners, and staging servers",
        "Layer caching reuses unchanged dependency-install layers across builds",
        "GitHub Actions container jobs run workflows inside a specified image natively",
        "docker run is a one-command way for new team members to execute the full suite"
      ],
      "lim": [
        "First build downloads the base image — can take several minutes",
        "Headed browser mode requires xvfb inside the container",
        "Docker Desktop has licensing requirements for commercial use on Mac/Windows",
        "Debugging test failures inside a container requires docker exec or volume mounts"
      ],
      "steps": [
        {
          "t": "Step 1 — Write a Dockerfile using the official Playwright image",
          "p": "Pin the image tag to match your playwright pip package version:",
          "c": "FROM mcr.microsoft.com/playwright/python:v1.48.0-jammy\n\nWORKDIR /app\n\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\n\nCOPY . .\n\nCMD [\"pytest\", \"--browser\", \"chromium\"]"
        },
        {
          "t": "Step 2 — Build the image locally",
          "p": "Build from the repo root:",
          "c": "docker build -t pw-tests ."
        },
        {
          "t": "Step 3 — Run tests in the container",
          "p": "Execute the test suite inside the container:",
          "c": "docker run --rm pw-tests\n\n# Or interactively for debugging:\ndocker run -it --rm pw-tests /bin/bash"
        },
        {
          "t": "Step 4 — Use in GitHub Actions as a container job",
          "p": "Run the workflow inside the built image:",
          "c": "jobs:\n  test:\n    runs-on: ubuntu-latest\n    container:\n      image: mcr.microsoft.com/playwright/python:v1.48.0-jammy\n    steps:\n      - uses: actions/checkout@v4\n      - run: pip install -r requirements.txt\n      - run: pytest --browser chromium"
        }
      ]
    },
    {
      "name": "Official Playwright Docker Image",
      "sub": "Microsoft Container Registry",
      "url": "https://playwright.dev/docs/docker",
      "desc": "Microsoft publishes pre-built Docker images at mcr.microsoft.com/playwright/python with Playwright browsers and all required OS-level system dependencies (fonts, codecs, libraries) already installed. Available tags combine a Playwright version (v1.48.0) with an Ubuntu base (jammy). Using this image as your Dockerfile base eliminates the need to run playwright install --with-deps manually and guarantees all browser dependencies are correctly present — the most common cause of CI browser launch failures.",
      "adv": [
        "Browsers and all OS dependencies pre-installed — no playwright install --with-deps needed",
        "Version tags match Playwright pip package versions for predictable compatibility",
        "Maintained by Microsoft alongside Playwright releases",
        "Available for Python, Node.js, and Java Playwright bindings"
      ],
      "lim": [
        "Image size is large (~1–2 GB) due to bundled browsers",
        "Tag must be updated manually when upgrading the playwright pip package",
        "Only Ubuntu-based images available — no Alpine or other minimal bases",
        "Custom OS packages beyond Playwright's defaults require additional RUN apt-get steps"
      ],
      "steps": [
        {
          "t": "Step 1 — Check your playwright pip version",
          "p": "The image tag must match:",
          "c": "pip show playwright | grep Version\n# Version: 1.48.0  →  use tag v1.48.0-jammy"
        },
        {
          "t": "Step 2 — Pull and inspect the image",
          "p": "Verify browsers are present:",
          "c": "docker run -it --rm mcr.microsoft.com/playwright/python:v1.48.0-jammy /bin/bash\npython -c \"from playwright.sync_api import sync_playwright; print('OK')\""
        },
        {
          "t": "Step 3 — Use as Dockerfile base",
          "p": "Replace a plain Python base with the Playwright image:",
          "c": "# Instead of:\n# FROM python:3.11-slim\n# RUN pip install playwright && playwright install --with-deps\n\n# Use:\nFROM mcr.microsoft.com/playwright/python:v1.48.0-jammy"
        }
      ]
    }
  ],
  "contentMarkdown": "Official Playwright Docker image Microsoft publishes a pre-built image with browsers and all system dependencies already installed, avoiding \"works on my machine\" issues caused by missing OS libraries. docker run -it --rm mcr.microsoft.com/playwright/python:v1.48.0-jammy /bin/bash Pointers: The version tag (v1.48.0 here) should match your installed playwright pip package version — a mismatch betwe\n\n## Official Playwright Docker image\n\nMicrosoft publishes a pre-built image with browsers and all system dependencies already installed, avoiding \"works on my machine\" issues caused by missing OS libraries.\n\nPointers: The version tag (v1.48.0 here) should match your installed playwright\n\nPython package's expected protocol version can cause obscure failures, so pin both deliberately rather than always pulling :latest.\n\n```\ndocker run -it --rm mcr.microsoft.com/playwright/python:v1.48.0-jammy /bin/bash\n\npip package version — a mismatch between the image's browser version and your\n```\n\n## WORKDIR /app\n\n\n\n```\nCOPY requirements.txt .\n```\n\n## RUN pip install -r requirements.txt\n\n\n\n```\nCOPY . .\n```\n\n## FROM <image>\n\nWhat it does: Sets the base image the rest of the Dockerfile builds on top of.\n\nTypes/params: <image> (string) — image name and tag, e.g.\n\nmcr.microsoft.com/playwright/python:v1.48.0-jammy.\n\nPointers: Starting from the official Playwright image (rather than a plain Python image plus manually installing browsers) is strongly preferred — it guarantees all the OS-level dependencies (fonts, codecs, etc.) that browsers need are already correctly present.\n\n## WORKDIR, COPY, RUN, CMD (standard Dockerfile instructions)\n\nWhat they do:\n\ninstalling pip packages)\n\nPointers: Copying requirements.txt and running pip install before copying the rest of the source code (as shown above) is a deliberate ordering — Docker caches each layer, so if only your test code changes (not dependencies), the dependency-install layer is reused from cache instead of re-running, meaningfully speeding up repeated builds.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
