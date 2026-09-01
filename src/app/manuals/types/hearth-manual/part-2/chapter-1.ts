import type { ChapterRecord } from "../../../types";

/** 3.1 Folder-Level Map */
export const chapter = {
  id: "hm-3-1",
  title: "3.1 Folder-Level Map",
  minutes: 20,
  level: "intermediate",
  phase: "Part 3 · Codebase Map",
  partName: "Part 3 · Codebase Map",
  overviewText: "Top-level layout: docs/ for author docs, prisma/ for schema+seed, scripts/ for validators, src/app/ for routes and features, src/components/ shared UI, src/lib/ server utilities, public/ static assets.",
  why: "The most-used lookup for developers. Start any what lives where question here.",
  when: "Keep open while navigating the repo. Update this chapter when adding top-level folders.",
  practical: {"app":"Where do I add an API route?","scenario":"You need POST /api/widgets.","pass":"Create src/app/api/widgets/route.ts following existing route.ts patterns.","fail":"You add pages/api/widgets.js (Pages Router — not used here)."},
  advantages: ["One folder per URL under src/app/","Colocated page_details-code_routes.md in many folders"],
  limitations: ["docs/ still mentions 65 manuals in places — stale"],
  tools: [],
  contentMarkdown: "## Top-level folders\n\n| Folder | Purpose |\n|--------|---------|\n| docs/ | Architecture, content model, local dev, where-to-edit |\n| prisma/ | schema.prisma, seed.ts |\n| scripts/ | Registry checks, chapter-index generator |\n| src/app/ | Next.js App Router pages + api/ |\n| src/components/ | Navbar, Button, Card, etc. |\n| src/context/ | ThemeContext |\n| src/lib/ | auth, prisma, mail, openai, prefs, permissions |\n| src/types/ | next-auth.d.ts |\n| public/ | Static assets |\n\n## src/app/ feature folders\n\n| Folder | Route |\n|--------|-------|\n| dashboard/ | /dashboard |\n| manuals/ | /manuals, /manuals/[slug] |\n| library/ | /library |\n| life-simulator/ | /life-simulator |\n| toolkits/ | /toolkits |\n| notes/, tags/ | /notes, /tags |\n| ai/ | /ai |\n| showcase-wall/ | /showcase-wall |\n| rest/ | /rest, /rest/games, /rest/cookbook, /rest/retro |\n| login/ | /login/* |\n| admin/ | /admin |\n| profile/, settings/ | /profile, /settings |\n| certificates/ | /certificates/[id] |\n| trails/ | redirects → /manuals |",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
