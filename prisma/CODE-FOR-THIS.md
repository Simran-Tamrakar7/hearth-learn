# Database (not a page)

| File | What |
|---|---|
| `schema.prisma` | models (User prefs/lastActive, ManualHighlight reviewLater, LifeLabAttempt, SiteConfig, ShowcaseItem portfolio fields, …) |
| `seed.ts` | demo user + 8 Prisma trails |

Pages that **read** this: `/notes`, `/profile`, `/dashboard`, `/showcase-wall`, `/admin`, `/life-simulator` attempts, `/manuals/[slug]` highlights. Manuals catalog listing does **not** use Prisma. Manual **content** (parts/chapters) stays in `_content`, shared globally.
