# Code for this page: `/showcase-wall`

| What you want to change | Open this file |
|---|---|
| How the wall **looks** (personal portfolio + public gallery) | `page.tsx` ← **this is the `/showcase-wall` screen** |
| Featured GitHub repos (public gallery only) | `_content/_registry.ts` |
| CRUD API | `src/app/api/showcase/route.ts` |
| Thumbnail (URL or upload) | `src/components/ui/ImageField.tsx` |
| Card kebab (Edit / Delete / Pin / reorder) | `page.tsx` + `src/app/manuals/_ui/KebabMenu.tsx` |
| Component-kit demo (not the wall) | `src/app/showcase/page.tsx` (`/showcase`) |

Entries are per logged-in user. Public items show author name/avatar.
