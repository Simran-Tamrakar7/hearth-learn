# Local development

```bash
npm install
npx prisma generate
npx prisma db seed    # optional; wipes local SQLite and loads demo user + 8 Prisma trails
npm run dev
```

Open http://localhost:3000 (or the port Next prints).

## Environment

| Variable | Used for |
|---|---|
| `DATABASE_URL` | Prisma SQLite (see `.env`) |
| `NEXTAUTH_SECRET` / `NEXTAUTH_URL` | Auth |
| `OPENAI_API_KEY` | Optional `POST /api/manuals/generate` |

Copy from `.env` if a teammate has one. Gitignores `.env*`. A typical local file:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="any-long-string"
```

The app still runs much of the catalog without a signed-in user (demo fallbacks). Auth has a built-in fallback secret; Google login needs `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`.

## Checks (no extra test runner)

```bash
node --experimental-strip-types content/registry.check.ts
node --experimental-strip-types src/app/manuals/_lib/manualParts.check.ts
node --experimental-strip-types src/app/manuals/_lib/testing-types-reader.check.ts
node --experimental-strip-types src/app/manuals/_lib/userManuals.check.ts
node --experimental-strip-types scripts/check-library.ts
```
