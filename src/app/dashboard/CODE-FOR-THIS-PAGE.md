# Code for this page: `/dashboard`

This folder **is** the dashboard. It also reads lists that belong to other pages (pins, a game, a recipe).

| What you want to change | Open this file |
|---|---|
| Dashboard layout, quote, pin picker UI | `page.tsx` ← **this is the `/dashboard` screen** |
| Which manuals appear in the pin picker | `src/app/manuals/_content/_registry.ts` (`pinnable: true`) |
| Games / recipes shown on the hub | `src/app/rest/games/_content.ts` / `src/app/rest/cookbook/_content.ts` |
| Dashboard API (streaks, Prisma trails) | `src/app/api/user/dashboard/route.ts` |
