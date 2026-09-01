#!/usr/bin/env node
/** One-shot generator for hearth-manual chapter files. Run once, then commit output. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const manualDir = path.join(root, "src/app/manuals/types/hearth-manual");

function esc(s) {
  return JSON.stringify(s);
}

function writeChapter(partDir, chapterNum, data) {
  const dir = path.join(manualDir, partDir);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `chapter-${chapterNum}.ts`);
  const body = Object.entries(data)
    .map(([k, v]) => `  ${k}: ${esc(v)},`)
    .join("\n");
  const content = `import type { ChapterRecord } from "../../../types";

/** ${data.title} */
export const chapter = {
${body}
} as ChapterRecord;
`;
  fs.writeFileSync(file, content);
  return `${partDir}/chapter-${chapterNum}.ts`;
}

const base = (id, title, phase, partName, overviewText, why, when, practical, advantages, limitations, contentMarkdown) => ({
  id,
  title,
  minutes: 20,
  level: "intermediate",
  phase,
  partName,
  overviewText,
  why,
  when,
  practical,
  advantages,
  limitations,
  tools: [],
  contentMarkdown,
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
});

const practical = (app, scenario, pass, fail) => ({ app, scenario, pass, fail });

// --- meta.json ---
fs.mkdirSync(manualDir, { recursive: true });
fs.writeFileSync(
  path.join(manualDir, "meta.json"),
  JSON.stringify(
    {
      id: "hearth-manual",
      title: "Hearth — Repository Manual",
      tagline: "Single source of truth for users, developers, and contributors.",
      category: "foundations",
      who: "Anyone using, building, or contributing to Hearth (hearth-learn.vercel.app).",
      outcomes: [
        "Find where any feature lives in the codebase",
        "Set up local dev and understand env vars from real code",
        "Add manuals, trails, or content without breaking conventions",
      ],
      duration: "Reference — read as needed",
      levelSpan: "User → Contributor",
    },
    null,
    2
  ) + "\n"
);

const chapters = [];

// Part 1 — Overview (part-0)
chapters.push(
  writeChapter(
    "part-0",
    1,
    base(
      "hm-1-1",
      "1.1 What Hearth Is",
      "Part 1 · Overview",
      "Part 1 · Overview",
      "Hearth is a personal skill-trail and daily learning-habit app deployed at hearth-learn.vercel.app. The landing page frames it as learning technical skills in bite-sized trails, quietly every day — a study cabin metaphor with trails, streaks, manuals, and rest breaks.",
      "This chapter orients all three audiences: users learning the vocabulary, developers mapping concepts to code, and contributors understanding product scope before editing.",
      "Read first if you are new to the repo or onboarding someone. Revisit when UI copy uses a term you do not recognize.",
      practical(
        "Onboarding a friend",
        "They ask what Hearth does versus a generic LMS.",
        "You explain: structured manuals (Playwright, Testing Types), a dashboard with streaks, notes, AI coach, library links, toolkits, Life Lab scenarios, and a Break Room — all in one Next.js app.",
        "You describe features that do not exist (courses marketplace, mobile app) because you did not read the codebase."
      ),
      ["Covers real UI terms from src/app/page.tsx and navbar", "Distinguishes Prisma trails from TypeScript manuals", "Points to live deployment URL"],
      ["Two parallel trail systems can confuse newcomers — see Part 4.3", "Some marketing copy on / still references demo trail slugs not in the manual catalog"],
      `## Plain-language description

Hearth is a **study cabin** for technical learning: read structured **manuals**, track **streaks** on the **dashboard**, take **notes**, use **AI Coach**, browse a **library** of external books, copy **toolkit** snippets, practice in **Life Lab**, and take breaks in the **Break Room**.

## Core vocabulary (from UI + code)

| Term | Meaning | Where defined |
|------|---------|---------------|
| **Manual** | Structured multi-chapter lesson (Playwright, Testing Types, this manual) | \`src/app/manuals/registry.ts\`, \`types/<slug>/part-N/chapter-M.ts\` |
| **Trail (Prisma)** | Seeded SQLite course with chapters + progress checkboxes | \`prisma/schema.prisma\` → \`Trail\`, \`Chapter\`, \`Progress\` |
| **Trail (URL)** | \`/trails/*\` redirects to \`/manuals/*\` — manual slugs only | \`src/app/trails/[slug]/page.tsx\` |
| **Streak** | Daily check-in count when completing Prisma trail chapters | \`Streak\` model, \`/api/progress/toggle\` |
| **Session / Cabin** | Signed-in study context; dashboard is the hub | \`/dashboard\`, \`/api/user/dashboard\` |
| **Pin** | Pinned manual or item on dashboard | localStorage via \`/api/me/prefs\` |
| **Highlight** | Text marked in manual reader | \`ManualHighlight\` + localStorage |
| **Break Room** | Rest timer, games, cookbook, retro | \`/rest\` |
| **Showcase Wall** | Portfolio of projects | \`/showcase-wall\`, \`ShowcaseItem\` |

## What Hearth is NOT (verified from code)

- Not a hosted video course platform
- Not a native mobile app
- Library books are **outbound links**, not in-app readers (see \`src/app/library/_content/_registry.ts\`)`
    )
  )
);

chapters.push(
  writeChapter(
    "part-0",
    2,
    base(
      "hm-1-2",
      "1.2 Architecture",
      "Part 1 · Overview",
      "Part 1 · Overview",
      "Hearth is a Next.js 16 App Router application with React 19, SQLite via Prisma, NextAuth JWT sessions, optional OpenAI and Resend integrations, and static-plus-server-rendered pages. Auth gating lives in src/proxy.ts (not middleware.ts).",
      "Developers need the one-page mental model before diving into Part 3. Hosting is Vercel; build runs prisma db push.",
      "Read before changing routing, auth, or deployment. Pair with Chapter 1.3 for versions.",
      practical(
        "Debugging auth redirect loop",
        "Every page sends you to /login.",
        "You check src/proxy.ts protected paths, NEXTAUTH_SECRET, and session strategy in src/lib/auth.ts.",
        "You edit middleware.ts which does not exist in this repo."
      ),
      ["All layers traceable to package.json and src/ layout", "Single SQLite file — simple local dev", "Feature modules colocated under src/app/<feature>/"],
      ["SQLite on Vercel uses /tmp — ephemeral unless configured", "No separate BFF — API routes colocated in src/app/api/"],
      `## High-level diagram

\`\`\`
Browser
  ↓
Next.js 16 App Router (src/app/)
  ├── Pages (dashboard, manuals, library, …)
  ├── API routes (src/app/api/*)
  └── proxy.ts → JWT session check → redirect /login
  ↓
Prisma → SQLite (DATABASE_URL, default file:./dev.db)
  ↓
External: OpenAI (AI features), Resend (email), Google OAuth (optional)
Hosting: Vercel (hearth-learn.vercel.app)
\`\`\`

## Key paths

| Layer | Path |
|-------|------|
| Pages | \`src/app/<route>/page.tsx\` |
| API | \`src/app/api/<name>/route.ts\` |
| Shared UI | \`src/components/\` |
| Auth | \`src/lib/auth.ts\`, \`src/proxy.ts\` |
| DB client | \`src/lib/prisma.ts\` |
| Manual catalog | \`src/app/manuals/registry.ts\` |
| Content registries | \`src/app/*/_content/_registry.ts\` |

See also: \`docs/architecture.md\` (partially stale on manual count).`
    )
  )
);

chapters.push(
  writeChapter(
    "part-0",
    3,
    base(
      "hm-1-3",
      "1.3 Tech Stack",
      "Part 1 · Overview",
      "Part 1 · Overview",
      "The stack is defined in package.json: Next 16.3.0, React 19.2.8, Prisma 5.22, NextAuth 4.24, Tailwind 4, TypeScript 5, plus docx/html2pdf for manual export and framer-motion for landing animations.",
      "Contributors need exact versions when debugging compatibility or upgrading dependencies.",
      "Reference when adding packages or explaining stack choices in PRs.",
      practical(
        "Adding a date library",
        "You need formatting on the dashboard.",
        "You check package.json — no date lib yet; pick one compatible with React 19 / Next 16.",
        "You assume Next 14 patterns from blog posts without reading node_modules/next/dist/docs/."
      ),
      ["Pinned versions in package.json", "Prisma + SQLite = zero external DB for local dev", "Tailwind 4 via @tailwindcss/postcss"],
      ["No test runner in package.json scripts — validation is check scripts", "eslint only — no prettier in package.json"],
      `## Stack table (from package.json)

| Technology | Version | Role in Hearth |
|------------|---------|----------------|
| Next.js | 16.3.0 | App Router, SSR, API routes |
| React | 19.2.8 | UI |
| TypeScript | ^5 | Type safety |
| Prisma | ^5.22.0 | ORM → SQLite |
| next-auth | ^4.24.15 | Credentials + optional Google OAuth |
| bcryptjs | ^3.0.3 | Password hashing |
| Tailwind CSS | ^4 | Styling |
| framer-motion | ^13.1.0 | Landing page motion |
| lucide-react | ^1.31.0 | Icons |
| docx + html2pdf.js | ^9.7 / ^0.14 | Manual PDF/DOCX export |
| canvas-confetti | ^1.9.4 | Celebration UI |
| eslint + eslint-config-next | ^9 / 16.3.0 | Lint |

## Scripts

| Script | Command |
|--------|---------|
| dev | \`next dev\` |
| build | prisma generate + db push + next build |
| start | \`next start\` |
| lint | \`eslint\` |`
    )
  )
);

// Part 2 — Getting Started (part-1)
chapters.push(
  writeChapter(
    "part-1",
    1,
    base(
      "hm-2-1",
      "2.1 Prerequisites & Local Setup",
      "Part 2 · Getting Started",
      "Part 2 · Getting Started",
      "Local setup requires Node.js (20+ per @types/node), npm, and git. Clone the repo, run npm install, prisma generate, optional prisma db seed, then npm run dev on http://localhost:3000.",
      "Every developer and contributor starts here. Skipping seed still works — demo fallbacks exist in several APIs.",
      "First step on a fresh machine. See docs/local-dev.md for the canonical short version.",
      practical(
        "New laptop setup",
        "You clone hearth-learn and open localhost:3000.",
        "npm install && npx prisma generate && npx prisma db seed && npm run dev — login with seeded admin/admin.",
        "You skip prisma generate and wonder why @prisma/client is missing."
      ),
      ["Documented in docs/local-dev.md", "Seed creates demo user + 8 Prisma trails", "No Docker required"],
      ["No .env.example file — copy template from docs/local-dev.md", "⚠️ Needs confirmation: minimum Node version not enforced in engines field"],
      `## Tools needed

- **Node.js** + **npm**
- **Git**
- Optional: **OpenAI** key for AI features, **Resend** for email, **Google OAuth** credentials

## Install steps

\`\`\`bash
git clone https://github.com/Simran-Tamrakar7/hearth-learn.git
cd hearth-learn
npm install
npx prisma generate
npx prisma db seed   # optional — wipes local DB
npm run dev
\`\`\`

Open http://localhost:3000.

## Seed admin

\`prisma/seed.ts\` creates admin user (email \`admin\`, password \`admin\`) via \`ensureSeedAdmin()\` in auth flow. See \`src/lib/auth.ts\`.`
    )
  )
);

chapters.push(
  writeChapter(
    "part-1",
    2,
    base(
      "hm-2-2",
      "2.2 Environment Variables",
      "Part 2 · Getting Started",
      "Part 2 · Getting Started",
      "There is no .env.example in the repo. Variables are documented in docs/local-dev.md and referenced in src/lib/auth.ts, src/lib/mail.ts, src/lib/openai.ts, src/lib/databaseUrl.ts, and src/lib/permissions.ts.",
      "Never invent env vars — only document what code reads. Missing keys disable features gracefully (Google hidden, AI returns errors, email logs devCode locally).",
      "Reference when deploying to Vercel or debugging auth/email/AI.",
      practical(
        "Google sign-in 401",
        "Sign in with Google fails on Vercel.",
        "You set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET and add callback URL {NEXTAUTH_URL}/api/auth/callback/google.",
        "You enable Google with placeholder demo-google-client-id."
      ),
      ["Every var traced to a source file", "Sensible local defaults for DATABASE_URL and NEXTAUTH"],
      ["No .env.example — drift risk vs docs/local-dev.md"],
      `## Environment variables (verified in code)

| Variable | Purpose | Source |
|----------|---------|--------|
| DATABASE_URL | SQLite path | prisma/schema.prisma, src/lib/databaseUrl.ts — default file:./dev.db; Vercel: file:/tmp/hearth.db |
| NEXTAUTH_SECRET | JWT signing | src/lib/auth.ts, src/proxy.ts |
| NEXTAUTH_URL | Auth + email links | src/lib/mail.ts |
| OPENAI_API_KEY | AI coach, CV, quiz, life-lab, manual generate | src/lib/openai.ts |
| RESEND_API_KEY | Signup approval + password reset | src/lib/mail.ts |
| EMAIL_FROM | From header | src/lib/mail.ts — default Hearth <noreply@hearth.study> |
| GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET | Optional OAuth | src/lib/auth.ts |
| ADMIN_EMAIL | Extra admin account | src/lib/permissions.ts |
| NEXT_PUBLIC_BASE_PATH | Asset URLs for GitHub Pages | src/app/manuals/registry.ts |
| VERCEL | DB path selection | src/lib/databaseUrl.ts |

## Local template (from docs/local-dev.md)

\`\`\`
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="any-long-string"
\`\`\``
    )
  )
);

chapters.push(
  writeChapter(
    "part-1",
    3,
    base(
      "hm-2-3",
      "2.3 Running the Project",
      "Part 2 · Getting Started",
      "Part 2 · Getting Started",
      "Development uses npm run dev. Production build runs prisma generate, prisma db push, and next build. Lint is npm run lint (eslint). There is no npm test script — validation uses node/tsx check scripts listed in docs/local-dev.md.",
      "Contributors must know what to run before opening a PR.",
      "Run checks locally before pushing; CI expectations mirror docs/local-dev.md.",
      practical(
        "Pre-PR validation",
        "You edited registry.ts.",
        "You run node --experimental-strip-types scripts/check-registry.ts and npx tsx scripts/check-chapter-independence.ts.",
        "You only run npm run lint and miss registry drift."
      ),
      ["Check scripts catch manual registry errors", "build script ensures schema synced"],
      ["No automated test suite in package.json"],
      `## Commands

| Task | Command |
|------|---------|
| Dev server | \`npm run dev\` |
| Production build | \`npm run build\` |
| Start prod | \`npm run start\` |
| Lint | \`npm run lint\` |
| Regenerate manual index | \`node scripts/generate-chapter-index.mjs\` |

## Validation (no test runner)

\`\`\`bash
node --experimental-strip-types scripts/check-registry.ts
npx tsx scripts/check-chapter-independence.ts
node --experimental-strip-types scripts/check-library.ts
\`\`\`

Full list: \`docs/local-dev.md\`.`
    )
  )
);

chapters.push(
  writeChapter(
    "part-1",
    4,
    base(
      "hm-2-4",
      "2.4 Local Data",
      "Part 2 · Getting Started",
      "Part 2 · Getting Started",
      "Local data lives in SQLite at DATABASE_URL (default ./dev.db). prisma db seed wipes and reloads demo user, 8 Prisma trails with chapters, streaks, and badges. Manual content is TypeScript files — not in the DB. User manuals and progress use localStorage keys prefixed hearth_.",
      "Developers need to know what seed affects vs what is file-based.",
      "Run seed when DB is corrupted; never expect seed to reset manual chapter files.",
      practical(
        "Empty dashboard trails",
        "Dashboard shows no trail progress after experiments.",
        "npx prisma db seed — reloads 8 trails from prisma/seed.ts.",
        "You delete src/app/manuals/types/ expecting seed to restore manuals."
      ),
      ["Clear separation: Prisma data vs TS manual files vs localStorage"],
      ["Seed wipes ALL SQLite data", "Vercel /tmp DB is ephemeral"],
      `## SQLite (Prisma)

- **Reset:** \`npx prisma db seed\` (see prisma/seed.ts)
- **Schema push:** \`npx prisma db push\`
- **8 seeded trails:** slugs like nextjs-server-components — listed in src/app/trails/_content/_registry.ts

## File-based content

- Manual chapters: \`src/app/manuals/types/<slug>/part-N/chapter-M.ts\`
- Library books: \`src/app/library/_content/_registry.ts\`
- Toolkits: \`src/app/toolkits/_content/\`

## localStorage (browser)

Keys via src/lib/userScope.ts — manual progress, pins, user-created manuals, library saves. Not cleared by prisma seed.`
    )
  )
);

// Part 3 — Codebase Map (part-2) — abbreviated in generator for length; key chapters
chapters.push(
  writeChapter(
    "part-2",
    1,
    base(
      "hm-3-1",
      "3.1 Folder-Level Map",
      "Part 3 · Codebase Map",
      "Part 3 · Codebase Map",
      "Top-level layout: docs/ for author docs, prisma/ for schema+seed, scripts/ for validators, src/app/ for routes and features, src/components/ shared UI, src/lib/ server utilities, public/ static assets.",
      "The most-used lookup for developers. Start any what lives where question here.",
      "Keep open while navigating the repo. Update this chapter when adding top-level folders.",
      practical(
        "Where do I add an API route?",
        "You need POST /api/widgets.",
        "Create src/app/api/widgets/route.ts following existing route.ts patterns.",
        "You add pages/api/widgets.js (Pages Router — not used here)."
      ),
      ["One folder per URL under src/app/", "Colocated page_details-code_routes.md in many folders"],
      ["docs/ still mentions 65 manuals in places — stale"],
      `## Top-level folders

| Folder | Purpose |
|--------|---------|
| docs/ | Architecture, content model, local dev, where-to-edit |
| prisma/ | schema.prisma, seed.ts |
| scripts/ | Registry checks, chapter-index generator |
| src/app/ | Next.js App Router pages + api/ |
| src/components/ | Navbar, Button, Card, etc. |
| src/context/ | ThemeContext |
| src/lib/ | auth, prisma, mail, openai, prefs, permissions |
| src/types/ | next-auth.d.ts |
| public/ | Static assets |

## src/app/ feature folders

| Folder | Route |
|--------|-------|
| dashboard/ | /dashboard |
| manuals/ | /manuals, /manuals/[slug] |
| library/ | /library |
| life-simulator/ | /life-simulator |
| toolkits/ | /toolkits |
| notes/, tags/ | /notes, /tags |
| ai/ | /ai |
| showcase-wall/ | /showcase-wall |
| rest/ | /rest, /rest/games, /rest/cookbook, /rest/retro |
| login/ | /login/* |
| admin/ | /admin |
| profile/, settings/ | /profile, /settings |
| certificates/ | /certificates/[id] |
| trails/ | redirects → /manuals |`
    )
  )
);

chapters.push(
  writeChapter(
    "part-2",
    2,
    base(
      "hm-3-2",
      "3.2 File-Level Reference (Key Files)",
      "Part 3 · Codebase Map",
      "Part 3 · Codebase Map",
      "Critical files: src/proxy.ts (auth gate), src/lib/auth.ts (NextAuth config), src/app/manuals/registry.ts (manual catalog), src/app/manuals/features/reader.tsx (reader UI), prisma/schema.prisma (all models). Each feature folder often has page_details-code_routes.md.",
      "Deep reference for files you touch repeatedly.",
      "Use when implementing a feature change, not for first-day orientation.",
      practical(
        "Change streak logic",
        "Streak should not increment twice same day.",
        "Edit src/app/api/progress/toggle/route.ts — read Streak model update logic.",
        "You search for streak in a non-existent src/lib/streaks.ts."
      ),
      ["page_details-code_routes.md co-located with routes", "registry.ts is single manual listing source"],
      ["Too many files for one chapter — see per-feature Part 4 chapters"],
      `## Core files

| File | Exports / role | Depends on |
|------|----------------|------------|
| src/proxy.ts | Auth middleware | next-auth/jwt |
| src/lib/auth.ts | authOptions, providers | prisma, bcrypt |
| src/lib/prisma.ts | prisma client singleton | DATABASE_URL |
| src/app/manuals/registry.ts | MANUALS, genres, helpers | chapters-manifest imports |
| src/app/manuals/features/reader.tsx | Reader UI, MANUALS_DATA | registry |
| src/app/manuals/types.ts | ChapterRecord type | — |
| prisma/schema.prisma | All DB models | — |

## API route pattern

Each \`src/app/api/<name>/route.ts\` exports HTTP handlers (GET, POST, …). Index: Part 6.

## Per-page maps

Search for \`page_details-code_routes.md\` under src/ — 25+ files.`
    )
  )
);

chapters.push(
  writeChapter(
    "part-2",
    3,
    base(
      "hm-3-3",
      "3.3 Dead Code & TODOs",
      "Part 3 · Codebase Map",
      "Part 3 · Codebase Map",
      "Known stale areas: docs referencing 65 manuals and manuals/_content/, Book/ReadingProgress Prisma models unused in src/, /api/settings unused by settings page, /showcase route documented but missing (use /showcase-wall), Prisma trail slugs 404 on /manuals/[slug] redirect.",
      "Prevents wasted time debugging ghost features.",
      "Check before building on documented-but-removed paths.",
      practical(
        "Wire library reading progress",
        "Schema has ReadingProgress model.",
        "You find no prisma.readingProgress in src/ — UI uses localStorage hearth_library_saved only.",
        "You assume schema = implemented UI."
      ),
      ["Explicit ⚠️ flags reduce wrong assumptions", "audit-findings.md has historical context"],
      ["TODO comments not exhaustively listed — run ripgrep TODO for fresh scan"],
      `## Stale or unused (verified)

| Item | Status |
|------|--------|
| docs/architecture.md "65 manuals" | **Stale** — 2 active: playwright, testing-types (+ hearth-manual when added) |
| src/app/manuals/_content/ | **Removed** — use types/<slug>/ |
| Book, ReadingProgress, Bookmark, Highlight models | **Schema only** — no src/ usage found |
| /api/settings | **Exists** — settings page uses /api/me/prefs instead |
| /showcase | **No page** — use /showcase-wall |
| /trails/[slug] → /manuals/[slug] | **404** for Prisma trail slugs |

## Recommended scan

\`\`\`bash
rg "TODO|FIXME" src/ --glob "*.ts" --glob "*.tsx"
\`\`\`

⚠️ Needs confirmation: full dead-code pass not run in CI.`
    )
  )
);

chapters.push(
  writeChapter(
    "part-2",
    4,
    base(
      "hm-3-4",
      "3.4 Start Here Lookup Table",
      "Part 3 · Codebase Map",
      "Part 3 · Codebase Map",
      "Quick routing table from intent to first file to open. Covers streaks, new manuals, auth, AI, notes, admin, and content registries.",
      "The fastest on-ramp for experienced devs who know what they want to change.",
      "Bookmark this chapter.",
      practical(
        "Add a new builtin manual",
        "You want a Cypress manual.",
        "types/cypress/meta.json + toc.ts + part-0/chapter-1.ts → generate-chapter-index.mjs → registry.ts → check-registry.ts.",
        "You only edit registry.ts without chapter files."
      ),
      ["Action-oriented", "Links to Part 4 feature chapters"],
      ["Table cannot cover every edge case"],
      `## I want to… → Start in…

| I want to… | Start in… |
|------------|-----------|
| Change streak calculation | src/app/api/progress/toggle/route.ts |
| Add a new manual | src/app/manuals/types/<slug>/, scripts/generate-chapter-index.mjs, registry.ts |
| Change login / signup | src/lib/auth.ts, src/app/login/, src/app/api/auth/ |
| Edit manual reader UI | src/app/manuals/features/reader.tsx, [slug]/page.tsx |
| Add library book | src/app/library/_content/_registry.ts |
| Add toolkit | src/app/toolkits/_content/<id>/meta.ts + _registry.ts |
| Life Lab arena | src/app/life-simulator/_content/<arena>/meta.ts |
| Admin approve users | src/app/admin/page.tsx, /api/admin/users |
| Global feature flags | /api/admin/features, SiteConfig model |
| Password reset email | src/lib/mail.ts, /api/auth/forgot |
| AI coach prompt | src/app/api/ai/coach/route.ts |
| Navbar links | src/components/layout/Navbar.tsx |
| Theme / prefs | /api/me/prefs, src/lib/prefs.ts |`
    )
  )
);

// Part 4 — Features (part-3) — one chapter each, template sub-sections in markdown
const features = [
  {
    n: 1,
    id: "hm-4-1",
    name: "Manuals",
    user: "Browse structured lessons (Playwright, Testing Types, Hearth Manual). Read chapters, highlight text, export PDF/DOCX, take AI quiz, add margin notes.",
    dev: "src/app/manuals/page.tsx, [slug]/page.tsx, features/reader.tsx, export.tsx, highlights.tsx. APIs: /api/highlights, /api/manuals/generate, /api/manuals/chapter, /api/ai/quiz.",
    data: "Chapter TS files (not Prisma). ManualHighlight model + localStorage dual-write.",
    edge: "Only KEPT_BUILTIN_SLUGS save to disk via /api/manuals/chapter. User manuals in localStorage.",
    related: "Part 8.2, hm-3-4, hm-6-1",
  },
  {
    n: 2,
    id: "hm-4-2",
    name: "Dashboard",
    user: "Hub after login: Prisma trail progress, streak, badges, pins, daily quote.",
    dev: "src/app/dashboard/page.tsx, /api/user/dashboard, /api/quote/daily.",
    data: "Progress, Streak, Badge, Trail, Chapter (Prisma). Pins: localStorage.",
    edge: "Demo fallback to demo@hearth.study when no session.",
    related: "hm-4-3, hm-4-4",
  },
  {
    n: 3,
    id: "hm-4-3",
    name: "Prisma Trails & Progress",
    user: "Eight seeded courses with chapter checkboxes on dashboard (not the manual reader).",
    dev: "prisma/seed.ts, /api/trails, /api/progress/toggle, src/app/trails/_content/_registry.ts.",
    data: "Trail, Chapter, Progress models.",
    edge: "/trails/[slug] redirects to /manuals/[slug] — Prisma slugs 404 there. ⚠️ Two systems coexist.",
    related: "hm-4-2, hm-5-2",
  },
  {
    n: 4,
    id: "hm-4-4",
    name: "Streaks & Badges",
    user: "Streak increments when you complete a Prisma chapter on a new day. Badges like first_chapter, streak_5.",
    dev: "/api/progress/toggle/route.ts, /api/user/dashboard.",
    data: "Streak (1:1 User), Badge.",
    edge: "Manual reading does NOT update Prisma streak — localStorage only for manual progress.",
    related: "hm-7-3",
  },
  {
    n: 5,
    id: "hm-4-5",
    name: "Library",
    user: "Outbound bibliography of ~78 books with save-to-shelf in localStorage. Also lists manuals.",
    dev: "src/app/library/page.tsx, library/_content/_registry.ts.",
    data: "localStorage hearth_library_saved. Prisma Book models unused.",
    edge: "Not an in-app book reader.",
    related: "hm-3-3",
  },
  {
    n: 6,
    id: "hm-4-6",
    name: "Toolkits",
    user: "Four cheat sheets with copy-to-clipboard snippets.",
    dev: "src/app/toolkits/page.tsx, toolkits/_content/_registry.ts, 4 meta.ts folders.",
    data: "None — static TS content.",
    edge: "None significant.",
    related: "hm-8-2",
  },
  {
    n: 7,
    id: "hm-4-7",
    name: "Life Lab",
    user: "Six scenario arenas (interview, bughunt, founder, crisis, negotiation, refactor) with AI-generated prompts and scoring.",
    dev: "src/app/life-simulator/, /api/life-lab, LifeLabAttempt model.",
    data: "LifeLabAttempt in SQLite.",
    edge: "Requires OPENAI_API_KEY and canUseAI permission.",
    related: "hm-6-1",
  },
  {
    n: 8,
    id: "hm-4-8",
    name: "Break Room",
    user: "Rest timer, games shelf, cookbook, retro vibes at /rest/*.",
    dev: "src/app/rest/, games/_content.ts, cookbook/_content.ts.",
    data: "SiteConfig feature flags breakRoom, cookbook.",
    edge: "Games/recipes are procedurally generated datasets, not individually curated files.",
    related: "hm-4-2",
  },
  {
    n: 9,
    id: "hm-4-9",
    name: "Notes & Tags",
    user: "Personal notes optionally linked to a Prisma trail. Tag filtering page.",
    dev: "src/app/notes/page.tsx, /api/notes, Note model.",
    data: "Note (optional trailId FK).",
    edge: "Notes are not manual-chapter-specific in schema.",
    related: "hm-4-1",
  },
  {
    n: 10,
    id: "hm-4-10",
    name: "AI Coach & CV",
    user: "AI study coach and CV maker at /ai.",
    dev: "src/app/ai/page.tsx, /api/ai/coach, /api/ai/cv, src/lib/openai.ts.",
    data: "No persistent model — session requests only.",
    edge: "Gated by permissions.canUseAI.",
    related: "hm-2-2",
  },
  {
    n: 11,
    id: "hm-4-11",
    name: "Showcase Wall",
    user: "Portfolio gallery: 17 featured GitHub repos + user-submitted items.",
    dev: "src/app/showcase-wall/page.tsx, showcase-wall/_content/_registry.ts, /api/showcase.",
    data: "ShowcaseItem model.",
    edge: "No /showcase route — only /showcase-wall.",
    related: "hm-3-3",
  },
  {
    n: 12,
    id: "hm-4-12",
    name: "Auth & Profile",
    user: "Email/password login, optional Google, signup approval, password reset, profile editing.",
    dev: "src/lib/auth.ts, src/proxy.ts, login/*, /api/auth/*, profile/page.tsx.",
    data: "User, PasswordResetToken.",
    edge: "New signups PENDING until admin approves.",
    related: "hm-7-1",
  },
  {
    n: 13,
    id: "hm-4-13",
    name: "Settings & Admin",
    user: "Settings: theme, reading prefs. Admin: user approval, permissions, site feature toggles.",
    dev: "settings/page.tsx → /api/me/prefs. admin/page.tsx → /api/admin/users, /api/admin/features.",
    data: "User.prefs, SiteConfig.features JSON.",
    edge: "/api/settings exists but settings page does not call it.",
    related: "hm-6-1",
  },
  {
    n: 14,
    id: "hm-4-14",
    name: "Certificates",
    user: "Generate certificate when completing a Prisma trail.",
    dev: "certificates/[id]/page.tsx, /api/certificates/generate.",
    data: "TrailCertificate.",
    edge: "Prisma trails only — not manuals.",
    related: "hm-4-3",
  },
];

for (const f of features) {
  chapters.push(
    writeChapter(
      "part-3",
      f.n,
      base(
        f.id,
        `4.${f.n} ${f.name}`,
        "Part 4 · Features",
        "Part 4 · Features",
        `${f.name}: ${f.user} (see sub-chapters below for user/dev/data/edge/related views).`,
        `Feature chapters use a fixed template so you can compare implementation patterns across Hearth.`,
        `Open when changing ${f.name} behavior or documenting it for users.`,
        practical(
          `${f.name} bug report`,
          `User says ${f.name} behaves unexpectedly.`,
          `You read 4.${f.n}.2 for file paths and 4.${f.n}.4 for known limitations before coding.`,
          `You grep randomly without checking the feature chapter.`
        ),
        [`Dedicated chapter for ${f.name} with cited file paths`, "Five-part template matches other features"],
        [`Some ${f.name} edge cases may need product confirmation`],
        `## 4.${f.n}.1 What It Does (User View)

${f.user}

## 4.${f.n}.2 How It's Implemented (Dev View)

${f.dev}

## 4.${f.n}.3 Data Touched

${f.data}

## 4.${f.n}.4 Edge Cases & Known Limitations

${f.edge}

## 4.${f.n}.5 Related Chapters

${f.related}`
      )
    )
  );
}

// Part 5 — Data Model (part-4)
chapters.push(
  writeChapter(
    "part-4",
    1,
    base(
      "hm-5-1",
      "5.1 Entities",
      "Part 5 · Data Model",
      "Part 5 · Data Model",
      "Prisma schema at prisma/schema.prisma defines User, Trail, Chapter, Progress, Note, Streak, Badge, ShowcaseItem, TrailCertificate, ManualHighlight, LifeLabAttempt, SiteConfig, PasswordResetToken, and unused library models Book/ReadingProgress/Bookmark/Highlight.",
      "Authoritative entity list for backend changes.",
      "Read before migrations or new API routes touching DB.",
      practical(
        "Add user preference field",
        "You need favoriteManual on User.",
        "Add column to User in schema.prisma, db push, update /api/user/profile.",
        "You store it only in localStorage without documenting split."
      ),
      ["Single schema file", "SQLite — simple local inspect with prisma studio"],
      ["Library models appear unused in app code"],
      `## Entities (prisma/schema.prisma)

| Model | Key fields |
|-------|------------|
| User | email, passwordHash, role, status, permissions (JSON), prefs (JSON), theme |
| Trail | slug, title, category, description, difficulty |
| Chapter | trailId, title, order, content (markdown string) |
| Progress | userId + chapterId, completedAt |
| Note | userId, title, body, tags, trailId? |
| Streak | userId, currentCount, longestCount, lastCheckIn |
| Badge | userId, name, title, earnedAt |
| ShowcaseItem | title, linkUrl, trailId?, visibility |
| TrailCertificate | userId, trailId, certificateCode |
| ManualHighlight | chapterId, tabType, text, color, reviewLater |
| LifeLabAttempt | arenaId, prompt, answer, scores, xp |
| SiteConfig | id=site, features JSON |
| PasswordResetToken | token, kind, expiresAt |

⚠️ Book, ReadingProgress, Bookmark, Highlight — defined but not wired in src/.`
    )
  )
);

chapters.push(
  writeChapter(
    "part-4",
    2,
    base(
      "hm-5-2",
      "5.2 Relationships",
      "Part 5 · Data Model",
      "Part 5 · Data Model",
      "Trail has many Chapters (cascade delete). User has many Progress, Notes, Badges; one Streak. Progress links User+Chapter uniquely. Notes optionally link Trail. ShowcaseItem optionally links Trail. TrailCertificate unique per user+trail.",
      "Foreign keys determine what deletes cascade and what APIs can join.",
      "Reference when writing Prisma queries with include/select.",
      practical(
        "Delete a trail",
        "Admin removes a trail from seed.",
        "Cascade deletes Chapters, Progress, certificates referencing it.",
        "You delete Trail row without checking ShowcaseItem.trailId orphans."
      ),
      ["Relationships explicit in schema @relation directives", "onDelete: Cascade on Chapter→Trail"],
      ["Manual chapters are NOT in Prisma — no FK to manuals"],
      `## Relationship diagram (text)

\`\`\`
User 1──* Progress *──1 Chapter *──1 Trail
User 1──1 Streak
User 1──* Badge
User 1──* Note ──?──1 Trail
User 1──* ShowcaseItem ──?──1 Trail
User 1──* TrailCertificate *──1 Trail
User 1──* ManualHighlight (chapterId is string — manual chapter id, not Prisma Chapter)
User 1──* LifeLabAttempt
\`\`\`

## Uniques worth knowing

- Progress: @@unique([userId, chapterId])
- Chapter: @@unique([trailId, order])
- TrailCertificate: @@unique([userId, trailId])
- Streak: userId @unique`
    )
  )
);

// Part 6 — API (part-5)
chapters.push(
  writeChapter(
    "part-5",
    1,
    base(
      "hm-6-1",
      "6.1 Route Index",
      "Part 6 · API Reference",
      "Part 6 · API Reference",
      "28 API routes under src/app/api/: auth (NextAuth + register/forgot/reset/change-password), user (dashboard, profile), trails, progress, notes, showcase, highlights, chapters feedback/margin-notes, manuals generate/chapter, ai coach/cv/quiz, life-lab, me/prefs, settings, admin features/users, certificates, quote/daily.",
      "Complete route inventory for integrators and backend devs.",
      "First stop for any HTTP behavior question.",
      practical(
        "Find highlight API",
        "Manual reader saves highlights.",
        "GET/POST/DELETE /api/highlights — see src/app/api/highlights/route.ts.",
        "You create a new route without checking existing highlights API."
      ),
      ["Index in src/app/api/page_details-code_routes.md", "Methods vary per route"],
      ["/settings route may be unused by UI"],
      `## Route index

| Path | Methods | Auth |
|------|---------|------|
| /api/auth/[...nextauth] | * | — |
| /api/auth/register | POST | Public |
| /api/auth/forgot, verify-code, reset | POST | Public |
| /api/auth/change-password | POST | Session |
| /api/user/dashboard | GET | Session |
| /api/user/profile | GET, PATCH | Session |
| /api/trails | GET | Session |
| /api/trails/[slug] | GET | Session |
| /api/progress/toggle | POST | Session |
| /api/notes | GET, POST, DELETE | Session |
| /api/showcase | GET, POST, PATCH, DELETE | Session |
| /api/highlights | GET, POST, DELETE | Session |
| /api/chapters/feedback | POST | Session |
| /api/chapters/margin-notes | GET, POST | Session |
| /api/manuals/generate | POST | Session+AI |
| /api/manuals/chapter | POST | Builtin slugs |
| /api/ai/coach, cv, quiz | POST | Session+AI |
| /api/life-lab | GET, POST | Session |
| /api/me/prefs | GET, POST | Session |
| /api/settings | GET, POST | Session |
| /api/admin/features | GET, POST | Admin |
| /api/admin/users | GET, PATCH | Admin |
| /api/certificates/generate | POST | Session |
| /api/quote/daily | GET | — |

Full detail: src/app/api/page_details-code_routes.md`
    )
  )
);

chapters.push(
  writeChapter(
    "part-5",
    2,
    base(
      "hm-6-2",
      "6.2 Route Details (Patterns)",
      "Part 6 · API Reference",
      "Part 6 · API Reference",
      "Routes use Next.js App Router route.ts exports. Session via getServerSession(authOptions). Admin routes check role. AI routes check permissions.canUseAI and OPENAI_API_KEY. Several routes demo-fallback to demo@hearth.study without session.",
      "Patterns repeat across routes — learn once, apply everywhere.",
      "Read when adding a new authenticated API route.",
      practical(
        "New POST route",
        "You add /api/my-feature.",
        "Copy session check from /api/notes/route.ts, return NextResponse.json.",
        "You skip auth on a route that mutates user data."
      ),
      ["Consistent NextResponse.json patterns", "authOptions centralized"],
      ["Per-route request bodies not fully documented here — read each route.ts"],
      `## Auth pattern

\`\`\`typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
const session = await getServerSession(authOptions);
if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
\`\`\`

## Admin pattern

Check session.user.role === "ADMIN" (see /api/admin/users/route.ts).

## Demo fallback

/api/user/dashboard and /api/progress/toggle fall back to demo user — see route files.

⚠️ Needs confirmation: full OpenAPI spec not generated.`
    )
  )
);

// Part 7 — FAQ (part-6)
chapters.push(
  writeChapter(
    "part-6",
    1,
    base(
      "hm-7-1",
      "7.1 Account & Access",
      "Part 7 · User FAQ",
      "Part 7 · User FAQ",
      "Q&A for login, signup approval, Google OAuth, password reset, and admin accounts — answered from auth code behavior.",
      "User-facing answers without jargon.",
      "Link users here from support threads.",
      practical(
        "Signup stuck",
        "User cannot log in after registering.",
        "Explain PENDING status until admin approves in /admin.",
        "You say account is broken without checking User.status."
      ),
      ["Based on src/lib/auth.ts and login pages", "Password reset via 6-digit email code"],
      ["Email delivery requires RESEND_API_KEY on production"],
      `## Q: How do I sign up?
**A:** /login/signup → POST /api/auth/register. New users get status PENDING until an admin approves (src/app/admin/page.tsx).

## Q: Can I use Google sign-in?
**A:** Only if GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are configured (src/lib/auth.ts). Otherwise the button is hidden.

## Q: I forgot my password.
**A:** /login/forgot-password → 6-digit code via email (or devCode locally without Resend).

## Q: Who is admin?
**A:** Seeded admin/admin, demo@hearth.study, and optional ADMIN_EMAIL env (src/lib/permissions.ts).

⚠️ Needs confirmation from product owner: exact approval SLA messaging in UI.`
    )
  )
);

chapters.push(
  writeChapter(
    "part-6",
    2,
    base(
      "hm-7-2",
      "7.2 Manuals & Progress",
      "Part 7 · User FAQ",
      "Part 7 · User FAQ",
      "Manuals are long-form TypeScript lessons at /manuals/<slug>. Progress for manuals is stored in browser localStorage. Dashboard checkboxes track separate Prisma seed trails — not the same progress system.",
      "Clarifies the two progress systems users may confuse.",
      "Essential FAQ for support.",
      practical(
        "Progress lost",
        "User cleared browser data.",
        "Manual progress in localStorage is gone; Prisma trail progress on server remains if logged in.",
        "You promise manual progress syncs to cloud — it does not (except highlights via API)."
      ),
      ["Honest about localStorage vs server", "Highlights can sync via ManualHighlight API"],
      ["Dual systems are confusing — product may unify later"],
      `## Q: Where are the learning trails?
**A:** /manuals lists builtin manuals. /trails redirects to /manuals.

## Q: How is manual progress saved?
**A:** Mostly localStorage (keys via src/lib/userScope.ts). Highlights also POST to /api/highlights when signed in.

## Q: What are dashboard checkboxes?
**A:** Prisma seed trails (8 courses) — different from manual chapters.

## Q: Can I export a manual?
**A:** Yes — PDF, DOCX, Print from reader header (ManualExportMenu in features/export.tsx).

⚠️ Needs confirmation: exact localStorage key names if documenting for users.`
    )
  )
);

chapters.push(
  writeChapter(
    "part-6",
    3,
    base(
      "hm-7-3",
      "7.3 Streaks & Habit Tracking",
      "Part 7 · User FAQ",
      "Part 7 · User FAQ",
      "Streaks increment when you complete a Prisma trail chapter via /api/progress/toggle on a new calendar day. Reading manual chapters does not increment the server streak.",
      "Sets correct expectations for habit features.",
      "Answer streak questions from this chapter.",
      practical(
        "Streak did not increase",
        "User read a manual chapter all day.",
        "Explain streak ties to dashboard Prisma chapter completion, not manual reader.",
        "You change code without explaining two progress systems."
      ),
      ["Behavior verified in progress/toggle route", "Badges: first_chapter, streak_5, etc. in seed"],
      ["Manual daily habit not tied to streak — ⚠️ product gap?"],
      `## Q: What happens if I miss a day?
**A:** Streak logic in /api/progress/toggle compares lastCheckIn date. Missing a day resets currentCount (read route for exact rules).

## Q: Do manual chapters count for streaks?
**A:** No — only Prisma Progress completions via dashboard toggle.

## Q: Where do I see my streak?
**A:** Dashboard and profile (/api/user/dashboard).

⚠️ Needs confirmation from product owner: whether manual reading should future-count toward streaks.`
    )
  )
);

// Part 8 — Contributing (part-7)
chapters.push(
  writeChapter(
    "part-7",
    1,
    base(
      "hm-8-1",
      "8.1 Conventions",
      "Part 8 · Contributing",
      "Part 8 · Contributing",
      "Conventions: App Router colocation, one page.tsx per route, registries for catalogs, chapter independence for manuals, page_details-code_routes.md co-located docs, eslint without prettier, ponytail comments for intentional shortcuts.",
      "Keeps contributions consistent with existing code.",
      "Read before first PR.",
      practical(
        "New page",
        "You add /widgets.",
        "Create src/app/widgets/page.tsx + optional page_details-code_routes.md.",
        "You add components/widgets at repo root outside src/."
      ),
      ["docs/where-to-edit.md maps URLs to folders", "AGENTS.md notes Next 16 breaking changes"],
      ["Not all conventions enforced by CI"],
      `## Naming & placement

- Routes: \`src/app/<segment>/page.tsx\`
- API: \`src/app/api/<name>/route.ts\`
- Manual chapters: \`types/<slug>/part-N/chapter-M.ts\`
- Catalog registries: \`*_content/_registry.ts\` or \`manuals/registry.ts\`

## Manual chapter rules

- Exactly one import: \`ChapterRecord\` type only
- All content inline in chapter file
- Run \`npx tsx scripts/check-chapter-independence.ts\`

## Lint

\`npm run lint\` — eslint.config.mjs + eslint-config-next`
    )
  )
);

chapters.push(
  writeChapter(
    "part-7",
    2,
    base(
      "hm-8-2",
      "8.2 Adding Manuals & Content Types",
      "Part 8 · Contributing",
      "Part 8 · Contributing",
      "Builtin manual: types/<slug>/meta.json, toc.ts, part-N/chapter-M.ts, add slug to generate-chapter-index.mjs, registry.ts, check-registry count. Library/toolkit/trail: edit respective _registry.ts. User manuals: localStorage only.",
      "Creator guide for content — the steps you followed for Cypress and this manual.",
      "Follow when adding Cypress, hearth-manual updates, or new catalogs.",
      practical(
        "Add Cypress manual",
        "Contributor adds automation manual.",
        "Folder cypress/ not file Cypress; run generate-chapter-index; wire registry.",
        "Create file named Cypress at types/ root."
      ),
      ["docs/content-model.md is canonical", "This manual Part 9.4 has full prompt template"],
      ["Markdown compile scripts exist but chapters are TS-first now"],
      `## New builtin manual

1. \`src/app/manuals/types/<slug>/meta.json\`
2. \`toc.ts\` + \`part-0/chapter-1.ts\` (etc.)
3. \`scripts/generate-chapter-index.mjs\` — add slug
4. \`node scripts/generate-chapter-index.mjs\`
5. \`registry.ts\` — import + MANUALS row + KEPT_BUILTIN_SLUGS
6. \`scripts/check-registry.ts\` — bump count
7. Run checks

## Other content types

| Type | Registry |
|------|----------|
| Library book | library/_content/_registry.ts |
| Toolkit | toolkits/_content/_registry.ts |
| Life Lab arena | life-simulator/_content/ |
| Showcase featured | showcase-wall/_content/_registry.ts |
| Prisma trail | prisma/seed.ts |`
    )
  )
);

chapters.push(
  writeChapter(
    "part-7",
    3,
    base(
      "hm-8-3",
      "8.3 PR Checklist",
      "Part 8 · Contributing",
      "Part 8 · Contributing",
      "Before merge: npm run lint, check-registry, check-chapter-independence (if manuals touched), check-library (if library touched), verify dev server loads changed routes, update docs/ if conventions changed.",
      "Minimum bar for safe merges.",
      "Run before opening PR.",
      practical(
        "Manual PR",
        "You added 10 chapters.",
        "All check scripts pass; chapters-manifest regenerated and committed.",
        "You commit chapters without running generate-chapter-index.mjs."
      ),
      ["Actionable checklist", "Matches docs/local-dev.md"],
      ["No automated CI list in this chapter — ⚠️ verify .github/workflows"],
      `## PR checklist

- [ ] \`npm run lint\`
- [ ] \`node --experimental-strip-types scripts/check-registry.ts\`
- [ ] If manual chapters: \`npx tsx scripts/check-chapter-independence.ts\`
- [ ] If library: \`node --experimental-strip-types scripts/check-library.ts\`
- [ ] Regenerated \`chapters-manifest.ts\` if chapter files added
- [ ] Updated \`docs/\` if behavior or conventions changed
- [ ] No secrets in commit (.env, API keys)
- [ ] Tested affected routes in \`npm run dev\`

⚠️ Needs confirmation: exact GitHub Actions workflow names if CI exists.`
    )
  )
);

// Part 9 — Meta (part-8) — includes THE THREAD as chapter 4
chapters.push(
  writeChapter(
    "part-8",
    1,
    base(
      "hm-9-1",
      "9.1 What This Process Is",
      "Part 9 · Meta",
      "Part 9 · Meta",
      "An AI-assisted method for turning a live codebase into a three-audience manual (users, developers, creators) by reading the repository directly rather than working from memory or an outdated spec.",
      "Explains why this hearth-manual exists and how it was produced.",
      "Read before re-running documentation generation.",
      practical(
        "Onboard developer",
        "They ask where docs live.",
        "Point to /manuals/hearth-manual in app AND docs/README.md in repo.",
        "You tell them to read only stale architecture.md."
      ),
      ["Process is reproducible", "Code-first reduces hallucination"],
      ["AI pass may miss runtime-only behavior"],
      `## One paragraph

Instead of writing documentation from a template filled with guesses, the generator (human or AI) reads package.json, prisma/schema.prisma, src/app routes, and registries, then writes Parts 1–8 with file-path citations. Uncertain behavior is marked ⚠️ Needs confirmation rather than invented.

This hearth-manual was generated with that process in Cursor on the hearth-learn repository.`
    )
  )
);

chapters.push(
  writeChapter(
    "part-8",
    2,
    base(
      "hm-9-2",
      "9.2 When to Run It",
      "Part 9 · Meta",
      "Part 9 · Meta",
      "Re-run documentation generation after major features ship, before onboarding a new developer, or periodically (e.g. monthly) to catch drift between docs and code.",
      "Maintenance schedule for keeping manual accurate.",
      "Calendar reminder for doc owners.",
      practical(
        "Big feature merge",
        "Life Lab v2 ships.",
        "Update Part 4.7, Part 6 API index, run diff against previous manual version.",
        "You never update docs and manual diverges silently."
      ),
      ["Clear triggers", "Part 3 and 6 go stale fastest"],
      ["No automated drift detection yet"],
      `## When to regenerate

1. **After major feature ships** — new routes, models, or catalogs
2. **Before onboarding** — new developer or contributor
3. **Periodically** — monthly or each release
4. **After registry refactor** — e.g. manuals/_content → types/

Priority updates: Part 3 (codebase map), Part 6 (API), Part 4 feature chapters touched.`
    )
  )
);

chapters.push(
  writeChapter(
    "part-8",
    3,
    base(
      "hm-9-3",
      "9.3 What the Prompt Must Specify",
      "Part 9 · Meta",
      "Part 9 · Meta",
      "Every documentation prompt must specify three audiences, read-actual-code instruction, ⚠️ flag for uncertainty, Part 1–8 structure, output path, codebase-map-first priority, and diff-against-previous when updating.",
      "Checklist for writing or reviewing a doc-generation prompt.",
      "Use when adapting Chapter 9.4 template.",
      practical(
        "Doc regen",
        "You paste prompt into Cursor.",
        "Prompt includes {{PROJECT_NAME}}, three audiences, and do not guess rule.",
        "Generic write docs for my app prompt produces hallucinated API routes."
      ),
      ["Matches original user thread requirements", "Stable cross-references via numbered parts"],
      ["Prompt length may exceed model context — batch by Part"],
      `## Required prompt elements

1. **Three audiences** — user FAQ, developer map, creator guide (do not collapse)
2. **Read code first** — package.json, schema, routes, registries
3. **Flag uncertainty** — ⚠️ Needs confirmation, never invent env vars or routes
4. **Structure** — Parts 1–8 (+ Part 9 meta), Part 4 one chapter per feature with 5 sub-sections
5. **Output path** — /docs + in-app manual at types/hearth-manual/
6. **Update order** — codebase map + API reference first
7. **Diff mode** — if manual exists, call out what changed

See Chapter 9.4 for full copy-paste template from the original thread.`
    )
  )
);

// Chapter 9.4 — THE FULL THREAD / PROMPT as sub-chapters
const threadPrompt = `You are documenting the codebase you are currently sitting inside: "{{PROJECT_NAME}}" ({{PROJECT_URL}}), {{PROJECT_DESCRIPTION}}.

GOAL — Produce a single-source-of-truth MANUAL serving three audiences:
1. USERS — how do I do X / FAQ
2. DEVELOPERS — where does X live, how does X work
3. CREATORS — how do I add content without breaking conventions

Read actual source files before writing. Flag uncertainty as ⚠️ Needs confirmation.

OUTPUT: {{DOC_OUTPUT_PATH}} — Markdown under /docs if no doc framework exists.

STRUCTURE: Parts 1–9 with numbered chapters and sub-chapters.

Part 1 Overview | Part 2 Getting Started | Part 3 Codebase Map | Part 4 Features (one chapter per feature, 5 sub-sections each) | Part 5 Data Model | Part 6 API | Part 7 FAQ | Part 8 Contributing | Part 9 Meta (this process).

STYLE: Tables, file path citations, jargon-free user sections.

When done, list every file created or edited.`;

chapters.push(
  writeChapter(
    "part-8",
    4,
    base(
      "hm-9-4",
      "9.4 The Reusable Prompt Template (Original Thread)",
      "Part 9 · Meta",
      "Part 9 · Meta",
      "This chapter preserves the full documentation-generation prompt from the Cursor thread that created this manual. Sub-chapters 9.4.1–9.4.9 mirror each Part of the original spec so you can re-run or adapt it on any codebase.",
      "Copy-paste source for regenerating Hearth docs or applying the same process elsewhere.",
      "Open this chapter when setting up doc generation in a new repo.",
      practical(
        "New project docs",
        "You want the same manual for another app.",
        "Copy 9.4.10 placeholders template, replace {{PROJECT_NAME}}, run in Cursor.",
        "You reuse Hearth-specific slugs in another repo."
      ),
      ["Full thread preserved in-app", "Placeholders for reuse"],
      ["Very long prompt may need splitting by Part when running"],
      `This chapter contains the original documentation thread broken into sub-chapters.

---

## 9.4.1 Goal & Three Audiences

Produce a single-source-of-truth MANUAL for this repository serving:
1. **USERS** — "how do I do X in Hearth" / FAQ
2. **DEVELOPERS** — "where does X live, how does X work, how do I change X safely"
3. **CREATORS / CONTRIBUTORS** — "how do I add a new feature, trail, content type, or integration"

Do not write generic documentation. Read actual source files, package.json, schema, API routes, and components before writing each section.

---

## 9.4.2 Output Location

Create the manual as documentation inside the repo:
- Plain Markdown under \`/docs\` with \`docs/README.md\` as table of contents
- In-app manual at \`src/app/manuals/types/hearth-manual/\` (this manual)

Use whatever doc framework exists; if none, plain Markdown.

---

## 9.4.3 Part 1 — Overview

- **1.1 What Hearth Is** — skill trails, daily habit, study cabin framing; real UI vocabulary
- **1.2 Architecture** — frontend, API, DB, auth, hosting from config files
- **1.3 Tech Stack** — table of technology, version, why used

---

## 9.4.4 Part 2 — Getting Started

- **2.1 Prerequisites & Local Setup**
- **2.2 Environment Variables** — only vars in code or .env.example
- **2.3 Running the Project** — dev, test, lint, build
- **2.4 Local Data** — seed/reset

---

## 9.4.5 Part 3 — Codebase Map

- **3.1 Folder-Level Map**
- **3.2 File-Level Reference**
- **3.3 Dead Code & TODOs**
- **3.4 Start Here Lookup Table** — | I want to… | Start in… |

---

## 9.4.6 Part 4 — Features

Each user-facing feature gets its own chapter (4.1, 4.2, …) with identical sub-sections:
- 4.N.1 What It Does (User View)
- 4.N.2 How It's Implemented (Dev View)
- 4.N.3 Data Touched
- 4.N.4 Edge Cases & Known Limitations
- 4.N.5 Related Chapters

---

## 9.4.7 Parts 5–7

- **Part 5** Data Model — entities, relationships from schema
- **Part 6** API Reference — route index + details
- **Part 7** User FAQ — account, progress, streaks (match actual features)

---

## 9.4.8 Part 8 — Contributing

- **8.1 Conventions**
- **8.2 Adding New Trail / Content Type**
- **8.3 PR Checklist**

---

## 9.4.9 Part 9 — Meta (This Part)

Document the process itself for regeneration by Cursor or any AI tool:
- 9.1 What This Process Is
- 9.2 When to Run It
- 9.3 What the Prompt Must Specify
- 9.4 Reusable Prompt Template
- 9.5 Maintenance Notes

---

## 9.4.10 Copy-Paste Template (Generic)

\`\`\`
${threadPrompt}
\`\`\`

**Hearth-filled example:**
- {{PROJECT_NAME}} = Hearth
- {{PROJECT_URL}} = https://hearth-learn.vercel.app
- {{PROJECT_DESCRIPTION}} = a personal skill-trail / daily learning-habit app
- {{DOC_OUTPUT_PATH}} = /docs + src/app/manuals/types/hearth-manual/

---

## 9.4.11 Style Rules (from thread)

- Prefer tables and short lists
- Every claim traceable to a file path
- Jargon-free in user sections (Part 1, Part 4 user view, Part 7)
- docs/README.md lists every Part and Chapter with 2-line summaries
- List every file created or edited when done

---

## 9.4.12 Cypress Manual Thread (related)

From the same conversation series — steps to add a new manual:

1. Delete mistaken \`Cypress\` **file** if created on GitHub
2. Create folder \`cypress/\` via \`cypress/meta.json\` path trick
3. Add \`toc.ts\`, \`part-0/chapter-1.ts\`
4. Edit \`scripts/generate-chapter-index.mjs\` — add \`"cypress"\`
5. Run \`node scripts/generate-chapter-index.mjs\`
6. Wire \`registry.ts\` + \`check-registry.ts\`
7. Run validation scripts, open \`/manuals/cypress\`

See Chapter 8.2 for full detail.`
    )
  )
);

chapters.push(
  writeChapter(
    "part-8",
    5,
    base(
      "hm-9-5",
      "9.5 Maintenance Notes",
      "Part 9 · Meta",
      "Part 9 · Meta",
      "Manual ownership: contributors who touch a feature should update its Part 4 chapter and API index. Request re-run via issue labeled documentation. Report stale sections by citing chapter id (e.g. hm-4-3) and file path that changed.",
      "Long-term hygiene for this manual.",
      "Reference in CONTRIBUTING or team wiki.",
      practical(
        "Stale API list",
        "New route added without doc update.",
        "File issue: hm-6-1 missing /api/foo — or submit PR updating part-5/chapter-1.ts.",
        "Silent drift until next full regen."
      ),
      ["Chapter ids stable for issue references", "In-app manual readable by all audiences"],
      ["No assigned doc owner in repo — ⚠️ Needs confirmation"],
      `## Ownership

⚠️ Needs confirmation: assign a doc maintainer on the team.

## Request a re-run

1. Open GitHub issue: "Doc regen: [Part X]"
2. Paste Chapter 9.4 prompt with scope (full or partial)
3. Run in Cursor Agent on latest main

## Report stale content

Format: \`[hm-X-Y] Claim wrong — actual behavior in path/to/file.ts\`

## Updating this manual

Edit \`src/app/manuals/types/hearth-manual/part-N/chapter-M.ts\`, then:

\`\`\`bash
node scripts/generate-chapter-index.mjs
npx tsx scripts/check-chapter-independence.ts
\`\`\`

Mirror major changes in \`docs/README.md\`.`
    )
  )
);

// toc.ts
const tocParts = [
  { partNo: 1, name: "Overview", items: ["1.1 What Hearth Is", "1.2 Architecture", "1.3 Tech Stack"] },
  { partNo: 2, name: "Getting Started", items: ["2.1 Prerequisites & Local Setup", "2.2 Environment Variables", "2.3 Running the Project", "2.4 Local Data"] },
  { partNo: 3, name: "Codebase Map", items: ["3.1 Folder-Level Map", "3.2 File-Level Reference (Key Files)", "3.3 Dead Code & TODOs", "3.4 Start Here Lookup Table"] },
  { partNo: 4, name: "Features", items: features.map((f) => `4.${f.n} ${f.name}`) },
  { partNo: 5, name: "Data Model", items: ["5.1 Entities", "5.2 Relationships"] },
  { partNo: 6, name: "API Reference", items: ["6.1 Route Index", "6.2 Route Details (Patterns)"] },
  { partNo: 7, name: "User FAQ", items: ["7.1 Account & Access", "7.2 Manuals & Progress", "7.3 Streaks & Habit Tracking"] },
  { partNo: 8, name: "Contributing", items: ["8.1 Conventions", "8.2 Adding Manuals & Content Types", "8.3 PR Checklist"] },
  { partNo: 9, name: "Meta", items: ["9.1 What This Process Is", "9.2 When to Run It", "9.3 What the Prompt Must Specify", "9.4 The Reusable Prompt Template (Original Thread)", "9.5 Maintenance Notes"] },
];

fs.writeFileSync(
  path.join(manualDir, "toc.ts"),
  `/* Hearth repository manual TOC — ordering only. Content in part-N/chapter-M.ts */

export const HEARTH_MANUAL_TOC_VERSION = 1;

export type HearthManualTocPart = {
  partNo: number;
  name: string;
  items: { title: string }[];
};

export const HEARTH_MANUAL_TOC: HearthManualTocPart[] = ${JSON.stringify(
    tocParts.map((p) => ({ partNo: p.partNo, name: p.name, items: p.items.map((t) => ({ title: t })) })),
    null,
    2
  )};
`
);

console.log(`Generated hearth-manual: ${chapters.length} chapters`);
console.log(chapters.join("\n"));
