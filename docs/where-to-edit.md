# Where to edit (page → file)

Every URL has a folder under `src/app/`. That folder holds a `CODE-FOR-THIS-PAGE.md` map and a `page.tsx` whose first comment says **PAGE: /that-url**.

Want to change how a screen looks? Open that `page.tsx`. Want to change catalog **data** (add a book, hide a manual)? Open `/content`, not the page.

| URL | Code for this page |
|---|---|
| `/` | `src/app/page.tsx` |
| `/manuals` | `src/app/manuals/page.tsx` |
| `/manuals/cypress` (any manual) | `src/app/manuals/[slug]/page.tsx` |
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
| `/trails` | redirect only — `src/app/trails/page.tsx` |

Shared (not a page): `src/components/ui/` (Button, Card, pins), `src/components/layout/Navbar.tsx`.

Manuals-only pieces now live **inside** `src/app/manuals/_ui/` so they sit next to the manuals screens.
