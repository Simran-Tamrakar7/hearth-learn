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
| `DATABASE_URL` | Optional. Defaults to `file:./dev.db` (on Vercel, `/tmp/hearth.db`) |
| `NEXTAUTH_SECRET` / `NEXTAUTH_URL` | Auth |
| `OPENAI_API_KEY` | Optional `POST /api/manuals/generate` |
| `ADMIN_EMAIL` | Optional extra admin account (demo@hearth.study is always admin) |
| `RESEND_API_KEY` | Email (approval notices + password reset codes). Without it, codes are logged and returned as `devCode` in non-production |
| `EMAIL_FROM` | Optional From header (default `Hearth <noreply@hearth.study>`) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Optional. Real Google OAuth client from Google Cloud Console. Without both, the “Sign in with Google” button is hidden (avoids `401: invalid_client`) |

Copy from `.env` if a teammate has one. Gitignores `.env*`. A typical local file:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="any-long-string"
```

The app still runs much of the catalog without a signed-in user (demo fallbacks). Auth has a built-in fallback secret.

### Google sign-in (optional)

1. Google Cloud Console → APIs & Services → Credentials → Create OAuth client ID (Web application).
2. Authorized JavaScript origins: your site origin (e.g. `http://localhost:3000`, `https://hearth-learn.vercel.app`).
3. Authorized redirect URIs: `{NEXTAUTH_URL}/api/auth/callback/google`.
4. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env` / Vercel. Redeploy.

`Error 401: invalid_client` means the client id is missing, deleted, or does not match this environment.

## Checks (no extra test runner)

```bash
node --experimental-strip-types scripts/check-registry.ts
node --experimental-strip-types src/app/manuals/_lib/manualParts.check.ts
node --experimental-strip-types src/app/manuals/_lib/testing-types-reader.check.ts
node --experimental-strip-types src/app/manuals/_lib/userManuals.check.ts
node --experimental-strip-types src/app/manuals/_lib/highlights.check.ts
node --experimental-strip-types src/app/manuals/_ui/lessonFormat.check.ts
node --experimental-strip-types scripts/check-library.ts
node --experimental-strip-types scripts/check-pathwise-manuals.ts
node --experimental-strip-types src/lib/passwordReset.check.ts
```
