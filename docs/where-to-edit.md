# Where to edit

Rule: the file that **is** a screen is `src/app/<url>/page.tsx`. It starts with `PAGE: /that-url`. The folder also has `CODE-FOR-THIS-PAGE.md`.

Catalog **data** is `/content`. Server **APIs** are `src/app/api/` (`API:` comment). Shared chrome is `src/components/` (`SHARED:`).

## Screens

| URL | Code for this page |
|---|---|
| `/` | `src/app/page.tsx` |
| `/manuals` | `src/app/manuals/page.tsx` |
| `/manuals/<slug>` | `src/app/manuals/[slug]/page.tsx` |
| `/library` | `src/app/library/page.tsx` |
| `/life-simulator` | `src/app/life-simulator/page.tsx` |
| `/toolkits` | `src/app/toolkits/page.tsx` |
| `/notes` | `src/app/notes/page.tsx` |
| `/ai` | `src/app/ai/page.tsx` |
| `/rest` | `src/app/rest/page.tsx` |
| `/rest/games` | `src/app/rest/games/page.tsx` |
| `/rest/cookbook` | `src/app/rest/cookbook/page.tsx` |
| `/rest/retro` | `src/app/rest/retro/page.tsx` |
| `/showcase-wall` | `src/app/showcase-wall/page.tsx` |
| `/showcase` | `src/app/showcase/page.tsx` |
| `/dashboard` | `src/app/dashboard/page.tsx` |
| `/profile` | `src/app/profile/page.tsx` |
| `/settings` | `src/app/settings/page.tsx` |
| `/login` | `src/app/login/page.tsx` |
| `/tags` | `src/app/tags/page.tsx` |
| `/certificates/[id]` | `src/app/certificates/[id]/page.tsx` |
| `/trails` | redirect — `src/app/trails/page.tsx` |

## Manuals (all of it, in one folder)

`src/app/manuals/` — UI in `_ui/`, loaders + chapter JS in `_lib/`. Map: `src/app/manuals/CODE-FOR-THIS-PAGE.md`.

## Other maps

| Kind | Open |
|---|---|
| Catalog data | `content/CODE-FOR-THIS.md` |
| APIs | `src/app/api/CODE-FOR-THIS-API.md` |
| Shared UI | `src/components/CODE-FOR-SHARED.md` |
| Shared lib (auth, prisma, shims) | `src/lib/CODE-FOR-SHARED.md` |
| Theme | `src/context/CODE-FOR-THIS.md` |
| Database schema | `prisma/CODE-FOR-THIS.md` |
