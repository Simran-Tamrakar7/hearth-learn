# Database (not a page)

| File | What |
|---|---|
| `schema.prisma` | models (User, Note, Trail, ShowcaseItem, …) |
| `seed.ts` | demo user + 8 Prisma trails |

Pages that **read** this: `/notes`, `/profile`, `/dashboard`, `/showcase-wall` (user posts), notes trail picker. Manuals catalog does **not** use Prisma.
