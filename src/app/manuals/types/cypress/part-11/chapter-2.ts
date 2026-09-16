import type { ChapterRecord } from "../../../types";

/** 11.2 Docker Images for Cypress */
export const chapter = {
  "id": "cy-11-2-docker-images-for-cypress",
  "title": "11.2 Docker Images for Cypress",
  "minutes": 24,
  "level": "advanced",
  "phase": "Part 11 · CI/CD Integration",
  "partName": "Part 11 · CI/CD Integration",
  "overviewText": "Official images: cypress/base (Node + OS deps, you install Cypress), cypress/browsers (base + Chrome/Firefox/Edge), cypress/included (browsers + the Cypress binary ready to cypress run). Pin a tag that matches your Cypress major. Mount the project; write screenshots/videos to a volume. Playwright has microsoft/playwright images; Selenium has standalone Chrome images — same idea, different contents.",
  "why": "CI 'Cypress failed to start' is usually a missing system library or a Chrome version mismatch. Using cypress/browsers instead of a random node:22 image is the boring fix.",
  "when": "GitLab/Jenkins Docker agents, local parity with CI, and when GitHub's ubuntu-latest Chrome drifts from your laptop.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "GitLab runners must run the HRM suite in Docker with Chrome, without installing Cypress globally on the host.",
    "pass": "You pick cypress/browsers (or included) pinned to a version, npm ci inside the project mount, and cypress run --browser chrome.",
    "fail": "You use node:alpine, skip dependencies, and wonder why Electron cannot launch."
  },
  "tools": [],
  "customSummary": "- cypress/base = OS deps + Node; you npm install cypress.\n- cypress/browsers = + preinstalled browsers — usual CI choice.\n- cypress/included = + Cypress binary — useful for 'just run', watch version drift vs package.json.\n- Pin tags; mount artifacts. Not a substitute for Appium images.\n- Playwright/Selenium have their own official images — do not mix binaries casually.",
  "contentMarkdown": "## Which image\n\n| Image | Contains | Use |\n|---|---|---|\n| `cypress/base` | Node, Xvfb, libraries | You need a custom Node and will `npm ci` Cypress |\n| `cypress/browsers` | base + Chrome/Firefox/Edge | **Default CI recommendation** |\n| `cypress/included` | browsers + Cypress already installed | Quick jobs; keep the image tag aligned with `package.json` Cypress version |\n\n```bash\ndocker run --rm -it -v $PWD:/e2e -w /e2e cypress/browsers:node-22.14.0-chrome-134.0.0\nnpm ci\nnpx cypress run --browser chrome\n```\n\n`cypress/included` can skip `npm ci`'s Cypress download **if** versions match. If `package.json` says Cypress 14 and the image bundled 13, you will get mysterious binary errors — pin both.\n\n## Compose with the app\n\n```yaml\nservices:\n  web:\n    build: .\n    healthcheck: { test: ['CMD', 'curl', '-f', 'http://localhost:3000'], interval: 5s }\n  e2e:\n    image: cypress/browsers:node-22.14.0-chrome-134.0.0\n    depends_on:\n      web: { condition: service_healthy }\n    working_dir: /e2e\n    volumes: [ '.:/e2e' ]\n    command: npx cypress run --browser chrome\n    environment:\n      CYPRESS_BASE_URL: http://web:3000\n```\n\nFrom the e2e container, localhost is not the web service — use the Compose DNS name.\n\n## Versus Playwright and Selenium\n\n`mcr.microsoft.com/playwright` includes browsers **and** WebKit. `selenium/standalone-chrome` is a Grid node. `cypress/browsers` still has **no first-class WebKit** (9.9). Native mobile is a different image/stack (Appium).\n\nInterview line: \"I use official `cypress/browsers` (or `included` with matching versions). Alpine Node images are how you get 'Cypress failed to start'.\"",
  "advantages": [
    "11.2 Docker Images for Cypress — CI 'Cypress failed to start' is usually a missing system library or a Chrome version mismatch."
  ],
  "limitations": [
    "11.2 Docker Images for Cypress is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
