# APIs (`/api/...`)

These are server routes, not screens. Each `route.ts` has a `API:` comment at the top. The **page** that calls it is listed below.

| API file | Called from / used by |
|---|---|
| `auth/[...nextauth]/route.ts` | `/login` (next-auth) |
| `auth/register/route.ts` | `/signup` |
| `auth/change-password/route.ts` | `/profile` |
| `auth/forgot/route.ts` | `/forgot-password` (email verification code) |
| `auth/verify-code/route.ts` | `/forgot-password` |
| `auth/reset/route.ts` | `/forgot-password` (set password after code) |
| `user/profile/route.ts` | `/profile` (GET + PATCH name/avatar; password is `auth/change-password`) |
| `notes/route.ts` | `/notes`, `/tags` |
| `user/dashboard/route.ts` | `/dashboard` |
| `settings/route.ts` | exists; `/settings` page does **not** call it |
| `showcase/route.ts` | `/showcase-wall` |
| `trails/route.ts` | notes/dashboard trail pickers |
| `trails/[slug]/route.ts` | trail detail JSON (reader UI redirects to manuals) |
| `progress/toggle/route.ts` | Prisma trail checkboxes on dashboard |
| `certificates/generate/route.ts` | `/certificates/[id]` |
| `quote/daily/route.ts` | `/dashboard` quote |
| `manuals/generate/route.ts` | AI notes → manual (needs `OPENAI_API_KEY`) |
| `ai/coach/route.ts` | `/ai` Coach modes |
| `ai/cv/route.ts` | `/ai` CV Maker |
| `ai/quiz/route.ts` | chapter quiz on `/manuals/[slug]` |
| `life-lab/route.ts` | `/life-simulator` generate / evaluate / history |
| `me/prefs/route.ts` | account theme, resume, recent, legend |
| `admin/features/route.ts` | Admin global room flags |
| `admin/users/route.ts` | `/admin` users + bulk + activity |
| `chapters/feedback/route.ts` | manual reader feedback |
| `chapters/margin-notes/route.ts` | manual reader margin notes |
| `highlights/route.ts` | `/manuals/[slug]` chapter highlights (Full Content / Summary / AI Summary; `?due=1` for review later) |
