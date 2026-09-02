import type { ChapterRecord } from "../../../types";

/** 4.13 Settings & Admin */
export const chapter = {
  id: "hm-4-13",
  title: "4.13 Settings & Admin",
  minutes: 20,
  level: "intermediate",
  phase: "Part 4 · Features",
  partName: "Part 4 · Features",
  overviewText: "Settings & Admin: Settings: theme, reading prefs. Admin: user approval, permissions, site feature toggles. (see sub-chapters below for user/dev/data/edge/related views).",
  why: "Feature chapters use a fixed template so you can compare implementation patterns across Hearth.",
  when: "Open when changing Settings & Admin behavior or documenting it for users.",
  practical: {"app":"Settings & Admin bug report","scenario":"User says Settings & Admin behaves unexpectedly.","pass":"You read 4.13.2 for file paths and 4.13.4 for known limitations before coding.","fail":"You grep randomly without checking the feature chapter."},
  advantages: ["Dedicated chapter for Settings & Admin with cited file paths","Five-part template matches other features"],
  limitations: ["Some Settings & Admin edge cases may need product confirmation"],
  tools: [],
  contentMarkdown: "## 4.13.1 What It Does (User View)\n\nSettings (theme, reading prefs, categories for admins) — open from **avatar menu → Settings**, not a top navbar link. Admin: user approval, permissions, feature toggles.\n\n## 4.13.2 How It's Implemented (Dev View)\n\nsettings/page.tsx → /api/me/prefs. Navbar avatar dropdown: src/components/layout/Navbar.tsx. admin/page.tsx → /api/admin/*.\n\n## 4.13.3 Data Touched\n\nUser.prefs, SiteConfig.features JSON.\n\n## 4.13.4 Edge Cases & Known Limitations\n\nTheme primary color drives Add buttons on manuals catalog via ThemeContext.\n\n## 4.13.5 Related Chapters\n\nhm-4-12, hm-6-1",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
