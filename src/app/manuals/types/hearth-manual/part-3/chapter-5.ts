import type { ChapterRecord } from "../../../types";

/** 4.5 Library */
export const chapter = {
  id: "hm-4-5",
  title: "4.5 Library",
  minutes: 20,
  level: "intermediate",
  phase: "Part 4 · Features",
  partName: "Part 4 · Features",
  overviewText: "Library: Public-domain and study books by shelf tag. User can add/edit books (cover URL, link). Manuals are on /manuals — not listed here.",
  when: "Open when changing Library behavior or documenting it for users.",
  practical: {"app":"Library bug report","scenario":"User says Library behaves unexpectedly.","pass":"You read 4.5.2 for file paths and 4.5.4 for known limitations before coding.","fail":"You grep randomly without checking the feature chapter."},
  tools: [],
  contentMarkdown: "## 4.5.1 What It Does (User View)\n\nBrowse books by shelf (fiction, classics, study guides, etc.). Save titles to your shelf. **Add book** / **Edit** (pencil) for user entries: title, author, URL, cover image URL, blurb, shelf. Built-in titles can be hidden. Manuals are separate at `/manuals`.\n\n## 4.5.2 How It's Implemented (Dev View)\n\nsrc/app/library/page.tsx, library/_content/_registry.ts, library/user-books.ts, src/lib/userCatalog.ts.\n\n## 4.5.3 Data Touched\n\nlocalStorage `hearth_user_library_books`, `hearth_library_saved`, hidden built-in ids.\n\n## 4.5.4 Edge Cases & Known Limitations\n\nOpens external URLs — not an in-app EPUB reader. Prisma Book models unused in UI.\n\n## 4.5.5 Related Chapters\n\nhm-4-1, hm-3-3",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
