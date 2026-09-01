import type { ChapterRecord } from "../../../types";

/** 6.1 Route Index */
export const chapter = {
  id: "hm-6-1",
  title: "6.1 Route Index",
  minutes: 20,
  level: "intermediate",
  phase: "Part 6 · API Reference",
  partName: "Part 6 · API Reference",
  overviewText: "28 API routes under src/app/api/: auth (NextAuth + register/forgot/reset/change-password), user (dashboard, profile), trails, progress, notes, showcase, highlights, chapters feedback/margin-notes, manuals generate/chapter, ai coach/cv/quiz, life-lab, me/prefs, settings, admin features/users, certificates, quote/daily.",
  why: "Complete route inventory for integrators and backend devs.",
  when: "First stop for any HTTP behavior question.",
  practical: {"app":"Find highlight API","scenario":"Manual reader saves highlights.","pass":"GET/POST/DELETE /api/highlights — see src/app/api/highlights/route.ts.","fail":"You create a new route without checking existing highlights API."},
  advantages: ["Index in src/app/api/page_details-code_routes.md","Methods vary per route"],
  limitations: ["/settings route may be unused by UI"],
  tools: [],
  contentMarkdown: "## Route index\n\n| Path | Methods | Auth |\n|------|---------|------|\n| /api/auth/[...nextauth] | * | — |\n| /api/auth/register | POST | Public |\n| /api/auth/forgot, verify-code, reset | POST | Public |\n| /api/auth/change-password | POST | Session |\n| /api/user/dashboard | GET | Session |\n| /api/user/profile | GET, PATCH | Session |\n| /api/trails | GET | Session |\n| /api/trails/[slug] | GET | Session |\n| /api/progress/toggle | POST | Session |\n| /api/notes | GET, POST, DELETE | Session |\n| /api/showcase | GET, POST, PATCH, DELETE | Session |\n| /api/highlights | GET, POST, DELETE | Session |\n| /api/chapters/feedback | POST | Session |\n| /api/chapters/margin-notes | GET, POST | Session |\n| /api/manuals/generate | POST | Session+AI |\n| /api/manuals/chapter | POST | Builtin slugs |\n| /api/ai/coach, cv, quiz | POST | Session+AI |\n| /api/life-lab | GET, POST | Session |\n| /api/me/prefs | GET, POST | Session |\n| /api/settings | GET, POST | Session |\n| /api/admin/features | GET, POST | Admin |\n| /api/admin/users | GET, PATCH | Admin |\n| /api/certificates/generate | POST | Session |\n| /api/quote/daily | GET | — |\n\nFull detail: src/app/api/page_details-code_routes.md",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
