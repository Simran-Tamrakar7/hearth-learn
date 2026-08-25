# Where to edit

Open `src/app/<url>/`. That folder **is** the page: `page.tsx` (the screen) plus `_content` (copy/data for that page). `_content` is not a URL — underscore folders are private in the App Router.

If **several pages share one file**, that file starts with `HEADING: SHARED` and lists every page that uses it (Navbar, Button, auth). Changing a SHARED file changes all of those pages.

Server **APIs** stay under `src/app/api/` (URLs). Shared chrome is `src/components/`.

## Screens

| URL | Folder |
|---|---|
| `/` | `src/app/` (`page.tsx`) |
| `/manuals` | `src/app/manuals/` |
| `/manuals/<slug>` | `src/app/manuals/[slug]/` |
| `/library` | `src/app/library/` |
| `/life-simulator` | `src/app/life-simulator/` |
| `/toolkits` | `src/app/toolkits/` |
| `/notes` | `src/app/notes/` |
| `/ai` | `src/app/ai/` |
| `/rest` | `src/app/rest/` |
| `/rest/games` | `src/app/rest/games/` |
| `/rest/cookbook` | `src/app/rest/cookbook/` |
| `/rest/retro` | `src/app/rest/retro/` |
| `/showcase-wall` | `src/app/showcase-wall/` |
| `/showcase` | `src/app/showcase/` |
| `/dashboard` | `src/app/dashboard/` |
| `/profile` | `src/app/profile/` |
| `/settings` | `src/app/settings/` |
| `/login` | `src/app/login/` |
| `/tags` | `src/app/tags/` |
| `/certificates/[id]` | `src/app/certificates/[id]/` |
| `/trails` | `src/app/trails/` (redirects to manuals) |

Each of those folders has `CODE-FOR-THIS-PAGE.md`.

## Other maps

| Kind | Open |
|---|---|
| APIs | `src/app/api/CODE-FOR-THIS-API.md` |
| Shared UI | `src/components/CODE-FOR-SHARED.md` |
| Auth / Prisma | `src/lib/CODE-FOR-SHARED.md` |
| Theme | `src/context/CODE-FOR-THIS.md` |
| Database schema | `prisma/CODE-FOR-THIS.md` |
