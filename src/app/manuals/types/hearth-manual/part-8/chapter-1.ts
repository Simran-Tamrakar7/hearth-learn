import type { ChapterRecord } from "../../../types";

/** 9.1 What This Process Is */
export const chapter = {
  id: "hm-9-1",
  title: "9.1 What This Process Is",
  minutes: 20,
  level: "intermediate",
  phase: "Part 9 · Meta",
  partName: "Part 9 · Meta",
  overviewText: "An AI-assisted method for turning a live codebase into a three-audience manual (users, developers, creators) by reading the repository directly rather than working from memory or an outdated spec.",
  why: "Explains why this hearth-manual exists and how it was produced.",
  when: "Read before re-running documentation generation.",
  practical: {"app":"Onboard developer","scenario":"They ask where docs live.","pass":"Point to /manuals/hearth-manual in app AND docs/README.md in repo.","fail":"You tell them to read only stale architecture.md."},
  tools: [],
  contentMarkdown: "## One paragraph\n\nInstead of writing documentation from a template filled with guesses, the generator (human or AI) reads package.json, prisma/schema.prisma, src/app routes, and registries, then writes Parts 1–8 with file-path citations. Uncertain behavior is marked ⚠️ Needs confirmation rather than invented.\n\nThis hearth-manual was generated with that process in Cursor on the hearth-learn repository.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
