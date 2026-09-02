# Hearth documentation

Table of contents for the repository manual. **In-app reader:** [/manuals/hearth-manual](https://hearth-learn.vercel.app/manuals/hearth-manual).

Also see: [architecture.md](./architecture.md), [content-model.md](./content-model.md), [local-dev.md](./local-dev.md), [where-to-edit.md](./where-to-edit.md), [feature-status.md](./feature-status.md) (user-facing feature checklist).

---

## Part 1 — Overview

| Chapter | Summary |
|---------|---------|
| **1.1 What Hearth Is** | Skill-trail / study-cabin app vocabulary: manuals, Prisma trails, streaks, dashboard. Real terms from UI and code. |
| **1.2 Architecture** | Next.js 16 App Router, Prisma/SQLite, NextAuth, proxy.ts auth gate, Vercel hosting. |
| **1.3 Tech Stack** | Versions from package.json: React 19, Prisma 5, Tailwind 4, etc. |

## Part 2 — Getting Started (developers)

| Chapter | Summary |
|---------|---------|
| **2.1 Prerequisites & Local Setup** | Node, npm, clone, prisma generate, optional seed, npm run dev. |
| **2.2 Environment Variables** | DATABASE_URL, NEXTAUTH_*, OPENAI, RESEND, Google OAuth — from code, not invented. |
| **2.3 Running the Project** | dev / build / lint; validation check scripts (no npm test). |
| **2.4 Local Data** | SQLite seed vs TypeScript manual files vs localStorage. |

## Part 3 — Codebase Map

| Chapter | Summary |
|---------|---------|
| **3.1 Folder-Level Map** | docs/, prisma/, scripts/, src/app/, src/lib/, per-feature routes. |
| **3.2 File-Level Reference** | proxy.ts, auth.ts, registry.ts, reader.tsx, schema.prisma, page_details maps. |
| **3.3 Dead Code & TODOs** | Stale docs (65 manuals), unused Book models, /api/settings, trail/manual slug mismatch. |
| **3.4 Start Here Lookup Table** | I want to… → first file to open (streaks, manuals, auth, AI, …). |

## Part 4 — Features

Each feature has one chapter with five sub-sections: User View, Dev View, Data, Edge Cases, Related.

| Chapter | Feature |
|---------|---------|
| 4.1 | Manuals |
| 4.2 | Dashboard |
| 4.3 | Prisma Trails & Progress |
| 4.4 | Streaks & Badges |
| 4.5 | Library |
| 4.6 | Toolkits |
| 4.7 | Life Lab |
| 4.8 | Break Room |
| 4.9 | Notes & Tags |
| 4.10 | AI Coach & CV |
| 4.11 | Showcase Wall |
| 4.12 | Auth & Profile |
| 4.13 | Settings & Admin |
| 4.14 | Certificates |

## Part 5 — Data Model

| Chapter | Summary |
|---------|---------|
| **5.1 Entities** | All Prisma models from schema.prisma; flags unused library models. |
| **5.2 Relationships** | Trail→Chapter→Progress, User→Streak, FK diagram. |

## Part 6 — API Reference

| Chapter | Summary |
|---------|---------|
| **6.1 Route Index** | All 28 routes under src/app/api/ with methods and auth. |
| **6.2 Route Details** | Session/admin/AI patterns; demo fallback behavior. |

## Part 7 — User FAQ

| Chapter | Summary |
|---------|---------|
| **7.1 Account & Access** | Signup approval, Google OAuth, password reset, admin accounts. |
| **7.2 Manuals & Progress** | Manual vs Prisma progress; localStorage vs server; export. |
| **7.3 Streaks & Habit Tracking** | Streak via dashboard Prisma chapters; manual reading does not count. |

## Part 8 — Contributing

| Chapter | Summary |
|---------|---------|
| **8.1 Conventions** | App Router layout, registries, chapter independence, eslint. |
| **8.2 Adding Manuals & Content** | Builtin manual steps; library/toolkit/trail registries. |
| **8.3 PR Checklist** | lint, check-registry, check-chapter-independence, no secrets. |

## Part 9 — Meta (documentation process)

| Chapter | Summary |
|---------|---------|
| **9.1 What This Process Is** | AI reads repo → three-audience manual; code-first, no guessing. |
| **9.2 When to Run It** | After features ship, before onboarding, periodic drift catch-up. |
| **9.3 What the Prompt Must Specify** | Audiences, structure, ⚠️ flags, output paths, diff mode. |
| **9.4 Reusable Prompt Template** | **Full original Cursor thread** as sub-chapters 9.4.1–9.4.12 (includes Cypress manual steps). |
| **9.5 Maintenance Notes** | How to report stale sections and regenerate. |

---

## Regenerating

Builtin manual chapter content lives in `src/app/manuals/types/<slug>/part-N/chapter-M.ts` — edit those files directly.

```bash
node scripts/generate-chapter-index.mjs   # after adding/removing chapter files
npx tsx scripts/check-chapter-independence.ts
node scripts/generate-hearth-manual.mjs   # optional: rewrite hearth-manual from embedded generator
```
