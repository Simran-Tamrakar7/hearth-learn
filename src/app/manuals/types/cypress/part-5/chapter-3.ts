import type { ChapterRecord } from "../../../types";

/** 41. Dockerizing Cypress Tests */
export const chapter = {
  id: "cy-41-docker",
  title: "41. Dockerizing Cypress Tests",
  minutes: 28,
  level: "advanced",
  phase: "Part 5 · CI/CD & Reporting",
  partName: "Part 5 · CI/CD & Reporting",
  overviewText: "Official cypress/base, cypress/browsers, and cypress/included images. Volume-mount videos/screenshots; compose with app dependencies for realistic CI.",
  why: "Docker freezes browser + Node versions so \"works on my machine\" dies. Official images skip painful dependency installs.",
  when: "CI needs reproducible browsers; local parity with pipeline.",
  practical: {"app":"API + web + Cypress","scenario":"Compose stack for e2e against real services.","pass":"cypress/included + volume mounts + wait-on deps.","fail":"Custom image missing XVFB/deps forever debugging."},
  advantages: ["official base/browsers/included","pinned browser versions","volume mount artifacts","compose with deps","CI reproducibility","included has Cypress preinstalled"],
  limitations: ["image size large","GPU/headless quirks","permission volume mounts","Apple Silicon tags","pull time cold CI","version pin drift"],
  tools: [],
  customSummary: "- base/browsers/included images; volume mount videos; compose with deps",
  contentMarkdown: "## Official images\n\n| Image | Use |\n|---|---|\n| `cypress/base` | Node + OS deps; you install Cypress |\n| `cypress/browsers` | + browsers preinstalled |\n| `cypress/included` | Cypress + browsers ready to `cypress run` |\n\n## Artifacts\n\n```bash\ndocker run -v $PWD:/e2e -w /e2e cypress/included:latest\n# videos/screenshots land in mounted cypress/ folders\n```\n\n## Compose\n\nRun app DB/API/web services in Compose; Cypress service `depends_on` + healthchecks/`wait-on` before `cypress run`.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
