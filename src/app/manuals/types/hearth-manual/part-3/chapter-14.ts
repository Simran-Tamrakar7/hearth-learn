import type { ChapterRecord } from "../../../types";

/** 4.14 Certificates */
export const chapter = {
  id: "hm-4-14",
  title: "4.14 Certificates",
  minutes: 20,
  level: "intermediate",
  phase: "Part 4 · Features",
  partName: "Part 4 · Features",
  overviewText: "Certificates: Generate certificate when completing a Prisma trail. (see sub-chapters below for user/dev/data/edge/related views).",
  why: "Feature chapters use a fixed template so you can compare implementation patterns across Hearth.",
  when: "Open when changing Certificates behavior or documenting it for users.",
  practical: {"app":"Certificates bug report","scenario":"User says Certificates behaves unexpectedly.","pass":"You read 4.14.2 for file paths and 4.14.4 for known limitations before coding.","fail":"You grep randomly without checking the feature chapter."},
  advantages: ["Dedicated chapter for Certificates with cited file paths","Five-part template matches other features"],
  limitations: ["Some Certificates edge cases may need product confirmation"],
  tools: [],
  contentMarkdown: "## 4.14.1 What It Does (User View)\n\nGenerate certificate when completing a Prisma trail.\n\n## 4.14.2 How It's Implemented (Dev View)\n\ncertificates/[id]/page.tsx, /api/certificates/generate.\n\n## 4.14.3 Data Touched\n\nTrailCertificate.\n\n## 4.14.4 Edge Cases & Known Limitations\n\nPrisma trails only — not manuals.\n\n## 4.14.5 Related Chapters\n\nhm-4-3",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
