import type { CatalogStatus } from "../types";

export type TrailRegistryEntry = {
  id: string;
  title: string;
  tool: string;
  status: CatalogStatus;
  order: number;
  tags: string[];
};

/** Prisma-seeded trails (SQLite). Not the same catalog as /manuals. */
export const TRAILS: TrailRegistryEntry[] = [
  { id: "nextjs-server-components", title: "Next.js Server Components", tool: "nextjs", status: "active", order: 1, tags: ["web"] },
  { id: "playwright-e2e-automation", title: "Playwright E2E Automation", tool: "playwright", status: "active", order: 2, tags: ["qa"] },
  { id: "system-design-fundamentals", title: "System Design Fundamentals", tool: "architecture", status: "active", order: 3, tags: ["architecture"] },
  { id: "figma-design-tokens", title: "Figma Design Tokens", tool: "figma", status: "active", order: 4, tags: ["design"] },
  { id: "python-async-mastery", title: "Python Async Mastery", tool: "python", status: "active", order: 5, tags: ["python"] },
  { id: "ai-llm-application-architecture", title: "AI / LLM Application Architecture", tool: "llm", status: "active", order: 6, tags: ["ai"] },
  { id: "docker-container-security", title: "Docker Container Security", tool: "docker", status: "active", order: 7, tags: ["ops"] },
  { id: "rest-graphql-schema-design", title: "REST & GraphQL Schema Design", tool: "api", status: "active", order: 8, tags: ["api"] },
];

export function listedTrails() {
  return TRAILS.filter((t) => t.status === "active").sort((a, b) => a.order - b.order);
}
