# Architecture

## Stack

- **Next.js 16** (App Router), **React 19**, **Tailwind 4**
- **Prisma + SQLite** for users, notes, Prisma-trails, showcase posts, certificates, streaks/badges
- **next-auth** for sessions
- Catalog learning content is **imported TypeScript/JavaScript**, not a CMS and not MDX. There is no glob indexer: each `_registry.ts` is an explicit array you edit by hand.

## Top-level folders

```
/content          Catalog data. Map: content/CODE-FOR-THIS.md
/docs             How the site is put together. Start: docs/where-to-edit.md
/prisma           Schema + seed. Map: prisma/CODE-FOR-THIS.md
/src/app          One folder per URL (`PAGE:` comment + CODE-FOR-THIS-PAGE.md)
/src/app/api      Server routes (`API:` comment). Map: src/app/api/CODE-FOR-THIS-API.md
/src/app/manuals  All Manuals code: page.tsx, _ui/, _lib/ (including chapter JS)
/src/components   Shared UI. Map: src/components/CODE-FOR-SHARED.md
/src/lib          Shared auth/prisma + shims. Map: src/lib/CODE-FOR-SHARED.md
/public           Static assets
```

## Routing map

| URL | What it is |
|---|---|
| `/` | Marketing home |
| `/dashboard` | Hub: Prisma trail progress, pins, quote |
| `/manuals` | Manual catalog |
| `/manuals/[slug]` | Manual reader / TOC editor |
| `/trails` | Redirect → `/manuals` |
| `/trails/[slug]` | Redirect → `/manuals/[slug]` |
| `/library` | Outbound book list |
| `/life-simulator` | Life Lab arenas |
| `/notes` | User notes (Prisma) |
| `/ai` | Coach + CV maker (session UI) |
| `/rest` | Break-room timer |
| `/rest/games` | Games shelf |
| `/rest/retro` | Ambient + trivia |
| `/rest/cookbook` | Recipes |
| `/toolkits` | Cheat sheets |
| `/showcase-wall` | Featured GitHub + user posts |
| `/showcase` | Component demo |
| `/profile` | Streak / badges |
| `/settings` | Theme + room toggles |
| `/tags` | Note tags |
| `/certificates/[id]` | Printable certificate |
| `/login` | Auth |

Navbar: Manuals, Library, Life Lab, Notes, AI, Break Room, Showcase Wall, Profile, Settings. Dashboard is the logo target. Toolkits is linked from home, not the nav.

## What is not split yet

Manual chapter bodies live in `src/app/manuals/_lib/pathwise-data/manuals/*.js` (65 manuals, 635 chapters). Listing uses `content/manuals/_registry.ts`. Splitting into `content/manuals/<slug>/` is still a follow-up, without changing ids.

