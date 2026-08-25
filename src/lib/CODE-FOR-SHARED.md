# Shared code (not a page)

Auth and the database client. Catalog data lives in each page folder (`_content`), not here.

| File | What it is | Used by |
|---|---|---|
| `auth.ts` | next-auth options | `/login` + session APIs |
| `prisma.ts` | database client | every Prisma API |
| `_unused/` | dead code. Not imported. | — |
