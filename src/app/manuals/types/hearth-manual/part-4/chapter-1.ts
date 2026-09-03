import type { ChapterRecord } from "../../../types";

/** 5.1 Entities */
export const chapter = {
  id: "hm-5-1",
  title: "5.1 Entities",
  minutes: 20,
  level: "intermediate",
  phase: "Part 5 · Data Model",
  partName: "Part 5 · Data Model",
  overviewText: "Prisma schema at prisma/schema.prisma defines User, Trail, Chapter, Progress, Note, Streak, Badge, ShowcaseItem, TrailCertificate, ManualHighlight, LifeLabAttempt, SiteConfig, PasswordResetToken, and unused library models Book/ReadingProgress/Bookmark/Highlight.",
  why: "Authoritative entity list for backend changes.",
  when: "Read before migrations or new API routes touching DB.",
  practical: {"app":"Add user preference field","scenario":"You need favoriteManual on User.","pass":"Add column to User in schema.prisma, db push, update /api/user/profile.","fail":"You store it only in localStorage without documenting split."},
  tools: [],
  contentMarkdown: "## Entities (prisma/schema.prisma)\n\n| Model | Key fields |\n|-------|------------|\n| User | email, passwordHash, role, status, permissions (JSON), prefs (JSON), theme |\n| Trail | slug, title, category, description, difficulty |\n| Chapter | trailId, title, order, content (markdown string) |\n| Progress | userId + chapterId, completedAt |\n| Note | userId, title, body, tags, trailId? |\n| Streak | userId, currentCount, longestCount, lastCheckIn |\n| Badge | userId, name, title, earnedAt |\n| ShowcaseItem | title, linkUrl, trailId?, visibility |\n| TrailCertificate | userId, trailId, certificateCode |\n| ManualHighlight | chapterId, tabType, text, color, reviewLater |\n| LifeLabAttempt | arenaId, prompt, answer, scores, xp |\n| SiteConfig | id=site, features JSON |\n| PasswordResetToken | token, kind, expiresAt |\n\n⚠️ Book, ReadingProgress, Bookmark, Highlight — defined but not wired in src/.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
