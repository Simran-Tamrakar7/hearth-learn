# Shared code (not a page)

Auth and the database client. Catalog data lives in each page folder (`_content`), not here.

| File | What it is | Used by |
|---|---|---|
| `auth.ts` | next-auth options | `/login` + session APIs |
| `mail.ts` | Resend email helper (approvals + reset codes) | auth forgot / admin notify |
| `passwordReset.ts` | 6-digit code helpers + rate limits | `/api/auth/forgot`, verify-code |
| `prisma.ts` | database client | every Prisma API |
| `permissions.ts` | roles + granular perms | admin, nav kebabs |
| `prefs.ts` | account prefs + site feature flags | settings, admin, `/api/me/prefs` |
| `readerMemory.ts` | recently viewed / resume / dual-write prefs | manuals catalog + reader |
| `openai.ts` | chat completions helper | coach, CV, life lab, quiz |
| `_unused/` | dead code. Not imported. | — |
