import type { ChapterRecord } from "../../../types";

/** 6.2 Route Details (Patterns) */
export const chapter = {
  id: "hm-6-2",
  title: "6.2 Route Details (Patterns)",
  minutes: 20,
  level: "intermediate",
  phase: "Part 6 · API Reference",
  partName: "Part 6 · API Reference",
  overviewText: "Routes use Next.js App Router route.ts exports. Session via getServerSession(authOptions). Admin routes check role. AI routes check permissions.canUseAI and OPENAI_API_KEY. Several routes demo-fallback to demo@hearth.study without session.",
  why: "Patterns repeat across routes — learn once, apply everywhere.",
  when: "Read when adding a new authenticated API route.",
  practical: {"app":"New POST route","scenario":"You add /api/my-feature.","pass":"Copy session check from /api/notes/route.ts, return NextResponse.json.","fail":"You skip auth on a route that mutates user data."},
  tools: [],
  contentMarkdown: "## Auth pattern\n\n```typescript\nimport { getServerSession } from \"next-auth\";\nimport { authOptions } from \"@/lib/auth\";\nconst session = await getServerSession(authOptions);\nif (!session?.user?.id) return NextResponse.json({ error: \"Unauthorized\" }, { status: 401 });\n```\n\n## Admin pattern\n\nCheck session.user.role === \"ADMIN\" (see /api/admin/users/route.ts).\n\n## Demo fallback\n\n/api/user/dashboard and /api/progress/toggle fall back to demo user — see route files.\n\n⚠️ Needs confirmation: full OpenAPI spec not generated.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
