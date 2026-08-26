# Architecture

## Stack

- **Next.js 16** (App Router), **React 19**, **Tailwind 4**
- **Prisma + SQLite** for users, notes, Prisma-trails, showcase portfolio, certificates, streaks/badges, **manual chapter highlights**, Life Lab attempts, site feature flags
- **next-auth** for sessions
- Catalog learning content is **imported TypeScript/JavaScript**, not a CMS and not MDX. There is no glob indexer: each `_registry.ts` is an explicit array you edit by hand.

## Top-level folders

```
/docs             How the site is put together. Start: docs/where-to-edit.md
/prisma           Schema + seed. Map: prisma/CODE-FOR-THIS.md
/src/app          One folder per URL. Screen is page.tsx; that page’s copy is _content (not a route)
/src/app/api      Server routes (`API:` comment). Map: src/app/api/CODE-FOR-THIS-API.md
/src/components   Shared UI. Map: src/components/CODE-FOR-SHARED.md
/src/lib          Auth + Prisma only. Map: src/lib/CODE-FOR-SHARED.md
/public           Static assets
```

Find a page: open `src/app/<url>/`. Example: dashboard is `src/app/dashboard/`. Manuals UI **and** chapter text are both under `src/app/manuals/`.

## Routing map

| URL | What it is |
|---|---|
| `/` | Marketing home |
| `/dashboard` | Hub: Prisma trail progress, pins, quote |
| `/manuals` | Manual catalog |
| `/manuals/[slug]` | Manual reader / TOC editor |
| `/trails` | Redirect → `/manuals` |
| `/trails/[slug]` | Redirect → `/manuals/[slug]` |
| `/library` | Outbound book list (add / pin / kebab). Manuals live on `/manuals` only. |
| `/admin` | Signup approvals, user table, permissions, site feature flags, manage categories |
| `/life-simulator` | Life Lab arenas (AI scenarios + past attempts) |
| `/notes` | User notes (Prisma) + due highlight reviews |
| `/ai` | Coach + CV maker (OpenAI) |
| `/showcase-wall` | Per-user portfolio (public/private) + featured GitHub |
| `/rest` | Break-room timer |
| `/rest/games` | Games shelf |
| `/rest/retro` | Ambient + trivia |
| `/rest/cookbook` | Recipes |
| `/toolkits` | Cheat sheets |
| `/showcase` | Component demo |
| `/profile` | Avatar, stats, badges, edit profile, account |
| `/settings` | Theme, type, highlight legend (account prefs) |
| `/tags` | Note tags |
| `/certificates/[id]` | Printable certificate |
| `/login` | Auth |

Navbar: Manuals, Library, Life Lab, Notes, AI, Break Room, Showcase Wall, Settings, circular profile avatar. Dashboard is the logo target. Rest mode is the labeled coffee control. `/admin` is admin-only.

## Manual bodies

65 manuals live in `src/app/manuals/_content/<slug>/data.js` (635 chapters). Listing + those imports are `_content/_registry.ts`. Playwright is one file; Testing Types keeps overlay + outline in that same folder. Ids/slugs are unchanged. One reader at `/manuals/[slug]` serves every book.
