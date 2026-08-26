# Database (not a page)

| File | What |
|---|---|
| `schema.prisma` | models (User, Note, Trail, ShowcaseItem, …) |
| `seed.ts` | demo user + 8 Prisma trails |

Pages that **read** this: `/notes`, `/profile`, `/dashboard`, `/showcase-wall` (user posts), notes trail picker, `/manuals/[slug]` highlights (`ManualHighlight`). Manuals catalog listing does **not** use Prisma.
