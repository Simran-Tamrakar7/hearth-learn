# Architecture

## Stack

- **Next.js 16** (App Router), **React 19**, **Tailwind 4**
- **Prisma + SQLite** for users, notes, Prisma-trails, showcase posts, certificates, streaks/badges
- **next-auth** for sessions
- Catalog learning content is **imported TypeScript/JavaScript**, not a CMS and not MDX. There is no glob indexer: each `_registry.ts` is an explicit array you edit by hand.

## Top-level folders

```
/content          Catalog the app lists (manuals, library, toolkits, …)
/docs             How the site is put together
/prisma           Schema + seed (user-state and Prisma trails)
/src/app          One folder per URL. `page.tsx` is that screen; `CODE-FOR-THIS-PAGE.md` maps extras
/src/app/manuals/_ui   Pieces used only by Manuals (not their own URLs)
/src/components/ui     Shared Button/Card/pins
/src/components/layout Navbar (every page)
/src/lib          Loaders (`manualsData.ts`, pathwise chapter JS, re-export shims)
/public           Static assets (including unused testing-types HTML guide)
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

Manual chapter bodies still load from `src/lib/pathwise-data/manuals/*.js` (65 manuals, 635 chapters). Listing already uses `content/manuals/_registry.ts`. Moving chapters into `content/manuals/<slug>/` is a follow-up, one bundled JS file at a time, without changing ids.

