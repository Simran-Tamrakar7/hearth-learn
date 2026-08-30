# Architecture

## Stack

- **Next.js 16** (App Router), **React 19**, **Tailwind 4**
- **Prisma + SQLite** for users, notes, Prisma-trails, showcase portfolio, certificates, streaks/badges, **manual chapter highlights**, Life Lab attempts, site feature flags
- **next-auth** for sessions (credentials + Google). Password reset codes and signup approval emails go through **Resend** (`RESEND_API_KEY` / `EMAIL_FROM` in `src/lib/mail.ts`).
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
| `/profile` | User data only (name, avatar, change password, stats, badges) — open from avatar menu |
| `/settings` | Sidebar settings menu (appearance, reading, data); admins also get cabin rooms + categories |
| `/admin` | Users & approvals — avatar menu (admins), not main nav |
| `/rest` | Break Room — opened via Rest button in the header |
| `/tags` | Note tags |
| `/certificates/[id]` | Printable certificate |
| `/login` | Auth (credentials + Google) |
| `/forgot-password` | Reset via emailed 6-digit code (Resend), then new password |
| `/signup` | Request account (admin approval) |

Navbar: Manuals, Library, Life Lab, Notes, AI, Showcase Wall, Settings. Rest opens Break Room. Avatar menu: Profile, Admin (admins), Settings, Sign out.

## Manual bodies

65 manuals live in `src/app/manuals/_content/<slug>/data.js` (635 chapters). Listing + those imports are `_content/_registry.ts`. Playwright is one file; Testing Types keeps overlay + outline in that same folder. Ids/slugs are unchanged. One reader at `/manuals/[slug]` serves every book.
