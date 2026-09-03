import type { ChapterRecord } from "../../../types";

/** 9.3 What the Prompt Must Specify */
export const chapter = {
  id: "hm-9-3",
  title: "9.3 What the Prompt Must Specify",
  minutes: 20,
  level: "intermediate",
  phase: "Part 9 · Meta",
  partName: "Part 9 · Meta",
  overviewText: "Every documentation prompt must specify three audiences, read-actual-code instruction, ⚠️ flag for uncertainty, Part 1–8 structure, output path, codebase-map-first priority, and diff-against-previous when updating.",
  why: "Checklist for writing or reviewing a doc-generation prompt.",
  when: "Use when adapting Chapter 9.4 template.",
  practical: {"app":"Doc regen","scenario":"You paste prompt into Cursor.","pass":"Prompt includes {{PROJECT_NAME}}, three audiences, and do not guess rule.","fail":"Generic write docs for my app prompt produces hallucinated API routes."},
  tools: [],
  contentMarkdown: "## Required prompt elements\n\n1. **Three audiences** — user FAQ, developer map, creator guide (do not collapse)\n2. **Read code first** — package.json, schema, routes, registries\n3. **Flag uncertainty** — ⚠️ Needs confirmation, never invent env vars or routes\n4. **Structure** — Parts 1–8 (+ Part 9 meta), Part 4 one chapter per feature with 5 sub-sections\n5. **Output path** — /docs + in-app manual at types/hearth-manual/\n6. **Update order** — codebase map + API reference first\n7. **Diff mode** — if manual exists, call out what changed\n\nSee Chapter 9.4 for full copy-paste template from the original thread.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
