import type { ChapterRecord } from "../../types";

/** 27. Dockerizing Playwright Tests */
export const chapter = {
  "id": "pw-5-docker",
  "title": "27. Dockerizing Playwright Tests",
  "minutes": 40,
  "level": "advanced",
  "phase": "Part 5 · CI/CD & Reporting",
  "partName": "Part 5 · CI/CD & Reporting",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "Official Playwright Docker image Microsoft publishes a pre-built image with browsers and all system dependencies already installed, avoiding \"works on my machine\" issues caused by missing OS libraries. docker run -it --rm mcr.microsoft.com/playwright/python:v1.48.0-jammy /bin/bash Pointers: The version tag (v1.48.0 here) should match your installed playwright pip package version — a mismatch betwe\n\n## Official Playwright Docker image\n\nMicrosoft publishes a pre-built image with browsers and all system dependencies already installed, avoiding \"works on my machine\" issues caused by missing OS libraries.\n\nPointers: The version tag (v1.48.0 here) should match your installed playwright\n\nPython package's expected protocol version can cause obscure failures, so pin both deliberately rather than always pulling :latest.\n\n```\ndocker run -it --rm mcr.microsoft.com/playwright/python:v1.48.0-jammy /bin/bash\n\npip package version — a mismatch between the image's browser version and your\n```\n\n## WORKDIR /app\n\n\n\n```\nCOPY requirements.txt .\n```\n\n## RUN pip install -r requirements.txt\n\n\n\n```\nCOPY . .\n```\n\n## FROM <image>\n\nWhat it does: Sets the base image the rest of the Dockerfile builds on top of.\n\nTypes/params: <image> (string) — image name and tag, e.g.\n\nmcr.microsoft.com/playwright/python:v1.48.0-jammy.\n\nPointers: Starting from the official Playwright image (rather than a plain Python image plus manually installing browsers) is strongly preferred — it guarantees all the OS-level dependencies (fonts, codecs, etc.) that browsers need are already correctly present.\n\n## WORKDIR, COPY, RUN, CMD (standard Dockerfile instructions)\n\nWhat they do:\n\ninstalling pip packages)\n\nPointers: Copying requirements.txt and running pip install before copying the rest of the source code (as shown above) is a deliberate ordering — Docker caches each layer, so if only your test code changes (not dependencies), the dependency-install layer is reused from cache instead of re-running, meaningfully speeding up repeated builds.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
