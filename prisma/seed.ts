import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Hearth database with expanded Pathwise manuals...");

  // Delete existing data to ensure clean state
  await prisma.progress.deleteMany();
  await prisma.note.deleteMany();
  await prisma.chapterMarginNote.deleteMany();
  await prisma.chapterFeedback.deleteMany();
  await prisma.showcaseItem.deleteMany();
  await prisma.trailCertificate.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.trail.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.streak.deleteMany();
  await prisma.user.deleteMany();

  // Create demo user
  const user = await prisma.user.create({
    data: {
      email: "demo@hearth.study",
      name: "Rowan Vance",
      role: "ADMIN",
      streak: {
        create: {
          currentCount: 5,
          longestCount: 12,
          lastCheckIn: new Date(),
        },
      },
      badges: {
        create: [
          {
            name: "first_trail",
            title: "Pathfinder",
            description: "Completed your first learning trail chapter",
            icon: "Compass",
          },
          {
            name: "streak_5",
            title: "Flame Keeper",
            description: "Maintained a 5-day uninterrupted learning streak",
            icon: "Flame",
          },
          {
            name: "notes_master",
            title: "Quiet Chronicler",
            description: "Authored study notes during your cabin sessions",
            icon: "PenTool",
          },
        ],
      },
    },
  });

  // 1. Next.js & Server Components
  const trail1 = await prisma.trail.create({
    data: {
      slug: "nextjs-server-components",
      title: "Modern Web Architecture with Next.js & Server Components",
      category: "Engineering",
      description: "Master the mental model shift from client rendering to React Server Components, streaming SSR, and server actions.",
      difficulty: "Intermediate",
      estimatedHours: 3,
      icon: "Layers",
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      chapters: {
        create: [
          {
            order: 1,
            title: "Mental Models of Server vs Client Components",
            estimatedMinutes: 12,
            content: `### Why Server Components Change Everything\nReact Server Components (RSC) run **exclusively on the server**, compiling into a lightweight streamable format.\n\n#### Key Principles:\n1. **Zero Bundle Impact**: Dependencies imported in Server Components stay on the server.\n2. **Direct DB Access**: Query your database directly without REST/GraphQL boilerplate.`,
          },
          {
            order: 2,
            title: "Data Fetching Patterns & Suspense Boundaries",
            estimatedMinutes: 15,
            content: `### Parallel Fetching & Granular Streaming\nAvoid waterfall requests by using parallel promises and wrapping async components in \`<Suspense>\`.`,
          },
        ],
      },
    },
  });

  // 2. Playwright E2E Automation
  const trail2 = await prisma.trail.create({
    data: {
      slug: "playwright-e2e-automation",
      title: "Playwright E2E Test Automation",
      category: "Automation",
      description: "Learn resilient locators, auto-waiting mechanics, page object models, and CI pipeline automation.",
      difficulty: "Intermediate",
      estimatedHours: 4,
      icon: "Compass",
      coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      chapters: {
        create: [
          {
            order: 1,
            title: "Playwright Architecture & Resilient Locators",
            estimatedMinutes: 15,
            content: `### Locators That Never Flake\nPlaywright auto-waits for elements to be actionable before performing clicks. Prefer user-facing role locators over brittle CSS paths.`,
          },
        ],
      },
    },
  });

  // 3. System Design
  const trail3 = await prisma.trail.create({
    data: {
      slug: "system-design-fundamentals",
      title: "System Design for Software Engineers",
      category: "Architecture",
      description: "Learn how to design scalable, fault-tolerant distributed systems, cache placement, and database indexing strategies.",
      difficulty: "Advanced",
      estimatedHours: 5,
      icon: "Cpu",
      coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      chapters: {
        create: [
          {
            order: 1,
            title: "Estimating Scale & Latency Bottlenecks",
            estimatedMinutes: 15,
            content: `### Back-of-the-Envelope Calculations\nQuantify your scale requirements: DAU, QPS, L1 cache (0.5ns), RAM (100ns), SSD read (150µs), Network RTT (150ms).`,
          },
        ],
      },
    },
  });

  // 4. Figma & Design Tokens
  const trail4 = await prisma.trail.create({
    data: {
      slug: "figma-design-tokens",
      title: "Figma Auto Layout & Design System Tokens",
      category: "Design",
      description: "Master responsive auto layout constraints, color token variables, and component properties.",
      difficulty: "Beginner",
      estimatedHours: 2,
      icon: "Sparkles",
      coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      chapters: {
        create: [
          {
            order: 1,
            title: "Spatial Hierarchy & The 8px Grid",
            estimatedMinutes: 10,
            content: `### Spatial Proportions\nConsistent 8px grid spacing creates visual harmony across screen sizes.`,
          },
        ],
      },
    },
  });

  // 5. Python 3.14 & Async Programming
  await prisma.trail.create({
    data: {
      slug: "python-async-mastery",
      title: "Python 3.14 Async & Concurrent Programming",
      category: "Engineering",
      description: "Deep dive into asyncio event loops, coroutines, TaskGroups, and parallel multi-threading vs multi-processing.",
      difficulty: "Intermediate",
      estimatedHours: 4,
      icon: "Cpu",
      coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      chapters: {
        create: [
          {
            order: 1,
            title: "Asyncio Event Loop & Non-Blocking I/O",
            estimatedMinutes: 15,
            content: `### Coroutines vs Blocking Calls\nUnderstand async/await execution loops and avoiding CPU-bound loop blocking.`,
          },
        ],
      },
    },
  });

  // 6. AI Engineering & LLM Architecture
  await prisma.trail.create({
    data: {
      slug: "ai-llm-application-architecture",
      title: "AI Engineering & LLM Application Architecture",
      category: "AI & ML",
      description: "Learn RAG (Retrieval-Augmented Generation), vector databases, embedding spaces, and prompt chaining pipelines.",
      difficulty: "Advanced",
      estimatedHours: 5,
      icon: "Sparkles",
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
      chapters: {
        create: [
          {
            order: 1,
            title: "Vector Embeddings & Semantic Search",
            estimatedMinutes: 20,
            content: `### High-Dimensional Vector Search\nCosine similarity vs Euclidian distance search in Pinecone and pgvector.`,
          },
        ],
      },
    },
  });

  // 7. Docker & Container Security
  await prisma.trail.create({
    data: {
      slug: "docker-container-security",
      title: "Docker & Container Security Fundamentals",
      category: "Architecture",
      description: "Build multi-stage lightweight Docker images, enforce non-root user permissions, and audit container vulnerabilities.",
      difficulty: "Intermediate",
      estimatedHours: 3,
      icon: "Layers",
      coverImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=800&q=80",
      chapters: {
        create: [
          {
            order: 1,
            title: "Multi-Stage Dockerfiles & Minimal Alpine Images",
            estimatedMinutes: 15,
            content: `### Reducing Attack Surfaces\nSeparate build environments from production runtime layers for 90% smaller image sizes.`,
          },
        ],
      },
    },
  });

  // 8. REST & GraphQL API Design
  await prisma.trail.create({
    data: {
      slug: "rest-graphql-schema-design",
      title: "REST & GraphQL API Schema Design",
      category: "Engineering",
      description: "Design clean resource endpoints, OpenAPI contracts, rate limiting, and GraphQL resolver batching with DataLoader.",
      difficulty: "Intermediate",
      estimatedHours: 4,
      icon: "Compass",
      coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      chapters: {
        create: [
          {
            order: 1,
            title: "RESTful Resource Naming & HTTP Status Codes",
            estimatedMinutes: 15,
            content: `### Idiomatic API Contracts\nDesigning predictable JSON APIs with proper HTTP verbs and pagination headers.`,
          },
        ],
      },
    },
  });

  console.log("Database seeded successfully with 8 manuals!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
