import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const GITHUB_FEATURED_PROJECTS = [
  {
    id: "gh-hearth-learn",
    title: "hearth-learn",
    description: "Next.js 16 + Tailwind Playwright Learning & Cabin Sanctuary platform with 54 Playwright lessons, 520+ web games, 530+ global recipes, 6-Arena AI Life Lab, and interactive toolkits.",
    linkUrl: "https://github.com/Simran-Tamrakar7/hearth-learn",
    createdAt: "2026-08-14T00:00:00Z",
    language: "TypeScript",
    category: "Full Stack & QA",
    stars: 14,
    forks: 5,
    trail: { title: "Playwright Automation & Next.js 16", category: "Full Stack" },
  },
  {
    id: "gh-simran-portfolio-react",
    title: "simran-portfolio-react",
    description: "Modern interactive QA Automation & Full Stack Portfolio built with React, Vite, Framer Motion, and Tailwind CSS.",
    linkUrl: "https://github.com/Simran-Tamrakar7/simran-portfolio-react",
    createdAt: "2026-08-10T00:00:00Z",
    language: "TypeScript",
    category: "Full Stack & React",
    stars: 9,
    forks: 3,
    trail: { title: "React & Modern Web UI", category: "Frontend" },
  },
  {
    id: "gh-simran-portfolio",
    title: "simran-portfolio",
    description: "Personal Developer Portfolio highlighting QA Automation, Playwright, Cypress, Selenium, and Web Development.",
    linkUrl: "https://github.com/Simran-Tamrakar7/simran-portfolio",
    createdAt: "2026-07-28T00:00:00Z",
    language: "JavaScript",
    category: "Full Stack & React",
    stars: 6,
    forks: 1,
    trail: { title: "Developer Portfolio", category: "Frontend" },
  },
  {
    id: "gh-lumina-learn",
    title: "lumina-learn",
    description: "Interactive visual learning platform & course runner for automated testing & full stack development.",
    linkUrl: "https://github.com/Simran-Tamrakar7/lumina-learn",
    createdAt: "2026-07-15T00:00:00Z",
    language: "TypeScript",
    category: "Full Stack & React",
    stars: 8,
    forks: 3,
    trail: { title: "Interactive Course Runner", category: "Education" },
  },
  {
    id: "gh-teachdesk",
    title: "teachdesk",
    description: "Teacher-desk classroom management tool with attendance, student grade tracking, and lesson planner.",
    linkUrl: "https://github.com/Simran-Tamrakar7/teachdesk",
    createdAt: "2026-06-20T00:00:00Z",
    language: "TypeScript",
    category: "Full Stack & React",
    stars: 10,
    forks: 2,
    trail: { title: "Classroom Management", category: "Productivity" },
  },
  {
    id: "gh-hrms-mvp",
    title: "hrms-mvp",
    description: "Human Resource Management System MVP featuring employee portal, leave management, payroll preview, and performance reviews.",
    linkUrl: "https://github.com/Simran-Tamrakar7/hrms-mvp",
    createdAt: "2026-05-12T00:00:00Z",
    language: "TypeScript",
    category: "Full Stack & React",
    stars: 12,
    forks: 4,
    trail: { title: "HR Management System", category: "Enterprise App" },
  },
  {
    id: "gh-lifeos",
    title: "lifeos",
    description: "Personal productivity operating system dashboard with habit tracker, daily focus timer, and goal planning.",
    linkUrl: "https://github.com/Simran-Tamrakar7/lifeos",
    createdAt: "2026-04-18T00:00:00Z",
    language: "React",
    category: "Full Stack & React",
    stars: 15,
    forks: 6,
    trail: { title: "Productivity OS", category: "Personal Tool" },
  },
  {
    id: "gh-pathwise",
    title: "Pathwise",
    description: "Career trajectory mapping & skills growth tracker for software engineers and QA automation professionals.",
    linkUrl: "https://github.com/Simran-Tamrakar7/Pathwise",
    createdAt: "2026-03-30T00:00:00Z",
    language: "JavaScript",
    category: "Full Stack & React",
    stars: 7,
    forks: 2,
    trail: { title: "Career Mapping Tool", category: "Career Tech" },
  },
  {
    id: "gh-tada-sample",
    title: "TADA-Sample-PrimeSales360",
    description: "Sales analytics & CRM dashboard prototype with revenue forecasting and lead tracking.",
    linkUrl: "https://github.com/Simran-Tamrakar7/TADA-Sample-PrimeSales360",
    createdAt: "2026-03-10T00:00:00Z",
    language: "React",
    category: "Full Stack & React",
    stars: 5,
    forks: 1,
    trail: { title: "Sales CRM Dashboard", category: "Analytics" },
  },
  {
    id: "gh-mac-cypress",
    title: "Mac-Cypress_Automation",
    description: "E-Commerce web automation framework with Cypress, Page Object Model (POM), custom commands, and Mocha HTML reporting.",
    linkUrl: "https://github.com/Simran-Tamrakar7/Mac-Cypress_Automation",
    createdAt: "2026-02-25T00:00:00Z",
    language: "JavaScript",
    category: "QA Automation",
    stars: 11,
    forks: 4,
    trail: { title: "Cypress E-Commerce POM", category: "QA Automation" },
  },
  {
    id: "gh-student-mgmt",
    title: "Student_Management_System",
    description: "Full-featured student record & academic management application with enrollment tracking and transcripts.",
    linkUrl: "https://github.com/Simran-Tamrakar7/Student_Management_System",
    createdAt: "2026-02-05T00:00:00Z",
    language: "Python / Django",
    category: "Python / CLI & Tools",
    stars: 9,
    forks: 2,
    trail: { title: "Student Management System", category: "Backend" },
  },
  {
    id: "gh-bank-mgmt",
    title: "Bank_Management_Project-Execute_Only_In_Terminal",
    description: "CLI Bank Account Simulator for terminal execution supporting account opening, deposits, withdrawals, and interest calculation.",
    linkUrl: "https://github.com/Simran-Tamrakar7/Bank_Management_Project-Execute_Only_In_Terminal",
    createdAt: "2026-01-20T00:00:00Z",
    language: "C++ / Python",
    category: "Python / CLI & Tools",
    stars: 6,
    forks: 1,
    trail: { title: "Terminal Bank CLI", category: "CLI Tool" },
  },
  {
    id: "gh-kasthakarobar",
    title: "Kasthakarobar",
    description: "Wooden furniture & handcrafted timber marketplace tailored for authentic Nepal artisans and custom orders.",
    linkUrl: "https://github.com/Simran-Tamrakar7/Kasthakarobar",
    createdAt: "2026-01-10T00:00:00Z",
    language: "PHP / MySQL",
    category: "Full Stack & React",
    stars: 8,
    forks: 2,
    trail: { title: "Timber Furniture Marketplace", category: "E-Commerce" },
  },
  {
    id: "gh-cypress-learning",
    title: "Cypress-Learning",
    description: "Comprehensive Cypress end-to-end testing suite with stubbed API mocks, fixture datasets, and CI GitHub Actions workflow.",
    linkUrl: "https://github.com/Simran-Tamrakar7/Cypress-Learning",
    createdAt: "2025-12-15T00:00:00Z",
    language: "JavaScript",
    category: "QA Automation",
    stars: 10,
    forks: 3,
    trail: { title: "Cypress Testing Suite", category: "QA Automation" },
  },
  {
    id: "gh-qa-selenium",
    title: "QA-Task2-Selenium",
    description: "Selenium WebDriver test suite with Java, TestNG, and ExtentReports for cross-browser regression testing.",
    linkUrl: "https://github.com/Simran-Tamrakar7/QA-Task2-Selenium",
    createdAt: "2025-11-30T00:00:00Z",
    language: "Java",
    category: "QA Automation",
    stars: 7,
    forks: 2,
    trail: { title: "Selenium TestNG Suite", category: "QA Automation" },
  },
  {
    id: "gh-kasthakarobar-ecom",
    title: "Kasthakarobar-Ecommerce_Project",
    description: "Full-stack timber & furniture e-commerce platform with cart management, order history, and payment gateway integration.",
    linkUrl: "https://github.com/Simran-Tamrakar7/Kasthakarobar-Ecommerce_Project",
    createdAt: "2025-11-10T00:00:00Z",
    language: "React / Node.js",
    category: "Full Stack & React",
    stars: 9,
    forks: 3,
    trail: { title: "Kasthakarobar E-Commerce", category: "Full Stack" },
  },
  {
    id: "gh-ecommerce",
    title: "Ecommerce",
    description: "Modern e-commerce web storefront featuring product filtering, shopping cart, and customer checkout flow.",
    linkUrl: "https://github.com/Simran-Tamrakar7/Ecommerce",
    createdAt: "2025-10-25T00:00:00Z",
    language: "JavaScript",
    category: "Full Stack & React",
    stars: 5,
    forks: 1,
    trail: { title: "E-Commerce Web Storefront", category: "Frontend" },
  },
];

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    let userId: string | null = null;
    if (session?.user) {
      userId = (session.user as any).id;
    } else {
      const demoUser = await prisma.user.findUnique({
        where: { email: "demo@hearth.study" },
      });
      if (demoUser) userId = demoUser.id;
    }

    let dbItems: any[] = [];
    if (userId) {
      dbItems = await prisma.showcaseItem.findMany({
        where: { userId },
        include: { trail: true },
        orderBy: { createdAt: "desc" },
      });
    }

    // Merge DB items and all 17 public GitHub featured projects
    const combinedItems = [...dbItems, ...GITHUB_FEATURED_PROJECTS];

    return NextResponse.json({ items: combinedItems });
  } catch (error) {
    return NextResponse.json({ items: GITHUB_FEATURED_PROJECTS });
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, linkUrl, trailId } = await req.json();
    const session = await getServerSession(authOptions);

    let userId: string | null = null;
    if (session?.user) {
      userId = (session.user as any).id;
    } else {
      const demoUser = await prisma.user.findUnique({
        where: { email: "demo@hearth.study" },
      });
      if (demoUser) userId = demoUser.id;
    }

    if (!userId || !title || !linkUrl) {
      return NextResponse.json({ error: "Title and link URL are required" }, { status: 400 });
    }

    const item = await prisma.showcaseItem.create({
      data: {
        userId,
        title,
        description: description || "",
        linkUrl,
        trailId: trailId || null,
      },
      include: { trail: true },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to log showcase project" }, { status: 500 });
  }
}
