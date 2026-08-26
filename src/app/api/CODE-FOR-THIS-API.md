# APIs (`/api/...`)

These are server routes, not screens. Each `route.ts` has a `API:` comment at the top. The **page** that calls it is listed below.

| API file | Called from / used by |
|---|---|
| `auth/[...nextauth]/route.ts` | `/login` (next-auth) |
| `auth/register/route.ts` | `/login` sign-up |
| `notes/route.ts` | `/notes`, `/tags` |
| `user/dashboard/route.ts` | `/dashboard` |
| `user/profile/route.ts` | `/profile` |
| `settings/route.ts` | exists; `/settings` page does **not** call it |
| `showcase/route.ts` | `/showcase-wall` |
| `trails/route.ts` | notes/dashboard trail pickers |
| `trails/[slug]/route.ts` | trail detail JSON (reader UI redirects to manuals) |
| `progress/toggle/route.ts` | Prisma trail checkboxes on dashboard |
| `certificates/generate/route.ts` | `/certificates/[id]` |
| `quote/daily/route.ts` | `/dashboard` quote |
| `manuals/generate/route.ts` | AI notes → manual (needs `OPENAI_API_KEY`) |
| `chapters/feedback/route.ts` | manual reader feedback |
| `chapters/margin-notes/route.ts` | manual reader margin notes |
| `highlights/route.ts` | `/manuals/[slug]` chapter highlights (Full Content / Summary / AI Summary) |
