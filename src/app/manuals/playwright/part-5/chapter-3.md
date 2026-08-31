---
id: "pw-5-docker"
title: "27. Dockerizing Playwright Tests"
minutes: 40
partName: "Part 5 · CI/CD & Reporting"
level: "advanced"
---

Official Playwright Docker image Microsoft publishes a pre-built image with browsers and all system dependencies already installed, avoiding "works on my machine" issues caused by missing OS libraries. docker run -it --rm mcr.microsoft.com/playwright/python:v1.48.0-jammy /bin/bash Pointers: The version tag (v1.48.0 here) should match your installed playwright pip package version — a mismatch betwe

## Official Playwright Docker image

Microsoft publishes a pre-built image with browsers and all system dependencies already installed, avoiding "works on my machine" issues caused by missing OS libraries.

Pointers: The version tag (v1.48.0 here) should match your installed playwright

Python package's expected protocol version can cause obscure failures, so pin both deliberately rather than always pulling :latest.

```
docker run -it --rm mcr.microsoft.com/playwright/python:v1.48.0-jammy /bin/bash

pip package version — a mismatch between the image's browser version and your
```

## WORKDIR /app



```
COPY requirements.txt .
```

## RUN pip install -r requirements.txt



```
COPY . .
```

## FROM <image>

What it does: Sets the base image the rest of the Dockerfile builds on top of.

Types/params: <image> (string) — image name and tag, e.g.

mcr.microsoft.com/playwright/python:v1.48.0-jammy.

Pointers: Starting from the official Playwright image (rather than a plain Python image plus manually installing browsers) is strongly preferred — it guarantees all the OS-level dependencies (fonts, codecs, etc.) that browsers need are already correctly present.

## WORKDIR, COPY, RUN, CMD (standard Dockerfile instructions)

What they do:

installing pip packages)

Pointers: Copying requirements.txt and running pip install before copying the rest of the source code (as shown above) is a deliberate ordering — Docker caches each layer, so if only your test code changes (not dependencies), the dependency-install layer is reused from cache instead of re-running, meaningfully speeding up repeated builds.