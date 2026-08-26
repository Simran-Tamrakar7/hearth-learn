# Architecture

## Stack

- **Next.js 16** (App Router), **React 19**, **Tailwind 4**
- **Prisma + SQLite** for users, notes, Prisma-trails, showcase posts, certificates, streaks/badges, **manual chapter highlights**
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
| `/library` | Outbound book list **and** manuals catalog (add / pin / kebab) |
| `/admin` | Signup approvals, permissions, manage categories |
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

Navbar: Manuals, Library, Life Lab, Notes, AI, Break Room, Showcase Wall, Profile, Settings. Dashboard is the logo target. Toolkits is linked from home, not the nav. `/admin` is admin-only.

## Manual bodies

65 manuals live in `src/app/manuals/_content/<slug>/data.js` (635 chapters). Listing + those imports are `_content/_registry.ts`. Playwright is one file; Testing Types keeps overlay + outline in that same folder. Ids/slugs are unchanged. One reader at `/manuals/[slug]` serves every book.
