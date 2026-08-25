import type { CatalogStatus } from "../types";

/** Builtin manuals. Listing/nav reads this file. Chapter bodies: ./<id>/data.js via _bodies.js. */
export type ManualRegistryEntry = {
  id: string;
  title: string;
  tool: string;
  status: CatalogStatus;
  order: number;
  tags: string[];
  featured?: boolean;
  pinnable?: boolean;
  pinIcon?: string;
};

export const MANUALS: ManualRegistryEntry[] = [
  {
    id: "testing-types",
    title: "Testing Types & Levels",
    tool: "testing-types",
    status: "active",
    order: 1,
    tags: [
      "automation"
    ],
    featured: true,
    pinnable: true,
    pinIcon: "🧪"
  },
  {
    id: "cypress",
    title: "Cypress",
    tool: "cypress",
    status: "active",
    order: 2,
    tags: [
      "automation"
    ],
    featured: false,
    pinnable: true,
    pinIcon: "🌲"
  },
  {
    id: "playwright",
    title: "Playwright with Python",
    tool: "playwright",
    status: "active",
    order: 3,
    tags: [
      "automation"
    ],
    featured: false,
    pinnable: true,
    pinIcon: "🎭"
  },
  {
    id: "api-testing",
    title: "API Testing",
    tool: "api-testing",
    status: "active",
    order: 4,
    tags: [
      "automation"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "selenium",
    title: "Selenium WebDriver",
    tool: "selenium",
    status: "active",
    order: 5,
    tags: [
      "automation"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "cicd",
    title: "CI/CD Pipelines",
    tool: "cicd",
    status: "active",
    order: 6,
    tags: [
      "automation"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "accessibility",
    title: "Accessibility Testing",
    tool: "accessibility",
    status: "active",
    order: 7,
    tags: [
      "quality"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "security-testing",
    title: "Security Testing Basics",
    tool: "security-testing",
    status: "active",
    order: 8,
    tags: [
      "quality"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "mobile-testing",
    title: "Mobile Testing",
    tool: "mobile-testing",
    status: "active",
    order: 9,
    tags: [
      "quality"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "docker-qa",
    title: "Docker for QA",
    tool: "docker-qa",
    status: "active",
    order: 10,
    tags: [
      "quality"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "exploratory-testing",
    title: "Exploratory Testing",
    tool: "exploratory-testing",
    status: "active",
    order: 11,
    tags: [
      "quality"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "test-planning",
    title: "Test Planning & Strategy",
    tool: "test-planning",
    status: "active",
    order: 12,
    tags: [
      "quality"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "bug-advocacy",
    title: "Bug Reporting & Advocacy",
    tool: "bug-advocacy",
    status: "active",
    order: 13,
    tags: [
      "quality"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "performance-testing",
    title: "Performance Testing Basics",
    tool: "performance-testing",
    status: "active",
    order: 14,
    tags: [
      "quality"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "agile-scrum",
    title: "Agile & Scrum",
    tool: "agile-scrum",
    status: "active",
    order: 15,
    tags: [
      "delivery"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "project-management",
    title: "Project Management for Tech",
    tool: "project-management",
    status: "active",
    order: 16,
    tags: [
      "delivery"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "product-sense",
    title: "Product Thinking",
    tool: "product-sense",
    status: "active",
    order: 17,
    tags: [
      "delivery"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "jira-work",
    title: "Work Tracking",
    tool: "jira-work",
    status: "active",
    order: 18,
    tags: [
      "delivery"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    tool: "graphic-design",
    status: "active",
    order: 19,
    tags: [
      "design"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "figma",
    title: "Figma",
    tool: "figma",
    status: "active",
    order: 20,
    tags: [
      "design"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "uiux",
    title: "UI/UX Foundations",
    tool: "uiux",
    status: "active",
    order: 21,
    tags: [
      "design"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "design-thinking",
    title: "Design Thinking",
    tool: "design-thinking",
    status: "active",
    order: 22,
    tags: [
      "design"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "motion-design",
    title: "Motion for Product",
    tool: "motion-design",
    status: "active",
    order: 23,
    tags: [
      "design"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "presentation-design",
    title: "Presentation Design",
    tool: "presentation-design",
    status: "active",
    order: 24,
    tags: [
      "design"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    tool: "prompt-engineering",
    status: "active",
    order: 25,
    tags: [
      "ai"
    ],
    featured: false,
    pinnable: true,
    pinIcon: "✨"
  },
  {
    id: "ai-coding",
    title: "AI Coding with Cursor",
    tool: "ai-coding",
    status: "active",
    order: 26,
    tags: [
      "ai"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "javascript",
    title: "JavaScript",
    tool: "javascript",
    status: "active",
    order: 27,
    tags: [
      "foundations"
    ],
    featured: false,
    pinnable: true,
    pinIcon: "📘"
  },
  {
    id: "typescript",
    title: "TypeScript",
    tool: "typescript",
    status: "active",
    order: 28,
    tags: [
      "foundations"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "python",
    title: "Python",
    tool: "python",
    status: "active",
    order: 29,
    tags: [
      "foundations"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "sql",
    title: "SQL",
    tool: "sql",
    status: "active",
    order: 30,
    tags: [
      "foundations"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "git-version-control",
    title: "Git & GitHub",
    tool: "git-version-control",
    status: "active",
    order: 31,
    tags: [
      "foundations"
    ],
    featured: false,
    pinnable: true,
    pinIcon: "🐙"
  },
  {
    id: "linux-cli",
    title: "Linux & CLI for Testers",
    tool: "linux-cli",
    status: "active",
    order: 32,
    tags: [
      "ops"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "observability",
    title: "Observability Basics",
    tool: "observability",
    status: "active",
    order: 33,
    tags: [
      "ops"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "cloud-basics",
    title: "Cloud Basics for QA",
    tool: "cloud-basics",
    status: "active",
    order: 34,
    tags: [
      "ops"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "data-literacy",
    title: "Data Literacy",
    tool: "data-literacy",
    status: "active",
    order: 35,
    tags: [
      "ops"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "documentation-systems",
    title: "Documentation Systems",
    tool: "documentation-systems",
    status: "active",
    order: 36,
    tags: [
      "ops"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "resume-linkedin",
    title: "Resume & LinkedIn",
    tool: "resume-linkedin",
    status: "active",
    order: 37,
    tags: [
      "career"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "portfolio",
    title: "Portfolio That Hires",
    tool: "portfolio",
    status: "active",
    order: 38,
    tags: [
      "career"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "job-hunt",
    title: "Job Hunt System",
    tool: "job-hunt",
    status: "active",
    order: 39,
    tags: [
      "career"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "communication",
    title: "Communication",
    tool: "communication",
    status: "active",
    order: 40,
    tags: [
      "soft-skills"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "problem-solving",
    title: "Problem Solving",
    tool: "problem-solving",
    status: "active",
    order: 41,
    tags: [
      "soft-skills"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "interview-craft",
    title: "Interview Craft",
    tool: "interview-craft",
    status: "active",
    order: 42,
    tags: [
      "soft-skills"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "focus",
    title: "Focus & Time",
    tool: "focus",
    status: "active",
    order: 43,
    tags: [
      "soft-skills"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "emotional-intelligence",
    title: "Emotional Intelligence",
    tool: "emotional-intelligence",
    status: "active",
    order: 44,
    tags: [
      "soft-skills"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "conflict-collaboration",
    title: "Conflict & Collaboration",
    tool: "conflict-collaboration",
    status: "active",
    order: 45,
    tags: [
      "soft-skills"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "stakeholder-management",
    title: "Stakeholder Management",
    tool: "stakeholder-management",
    status: "active",
    order: 46,
    tags: [
      "soft-skills"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "tech-writing",
    title: "Technical Writing",
    tool: "tech-writing",
    status: "active",
    order: 47,
    tags: [
      "soft-skills"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "public-speaking",
    title: "Public Speaking & Demo Skills",
    tool: "public-speaking",
    status: "active",
    order: 48,
    tags: [
      "soft-skills"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "networking-career",
    title: "Professional Networking",
    tool: "networking-career",
    status: "active",
    order: 49,
    tags: [
      "soft-skills"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "react-basics",
    title: "React Basics",
    tool: "react-basics",
    status: "active",
    order: 50,
    tags: [
      "foundations"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "css-layout",
    title: "CSS Layout",
    tool: "css-layout",
    status: "active",
    order: 51,
    tags: [
      "design"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "postman-api",
    title: "Postman & API Exploration",
    tool: "postman-api",
    status: "active",
    order: 52,
    tags: [
      "automation"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "excel-data",
    title: "Spreadsheets for QA & Analysis",
    tool: "excel-data",
    status: "active",
    order: 53,
    tags: [
      "foundations"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "chatgpt-workflows",
    title: "ChatGPT Workflows for Learners",
    tool: "chatgpt-workflows",
    status: "active",
    order: 54,
    tags: [
      "ai"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "linux-shell-daily",
    title: "Linux Shell Daily",
    tool: "linux-shell-daily",
    status: "active",
    order: 55,
    tags: [
      "ops"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "nocode-automation",
    title: "No-code Automation",
    tool: "nocode-automation",
    status: "active",
    order: 56,
    tags: [
      "automation"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "ai-agents-workflows",
    title: "AI Agents & Workflows",
    tool: "ai-agents-workflows",
    status: "active",
    order: 57,
    tags: [
      "ai"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "data-viz-basics",
    title: "Data Visualization Basics",
    tool: "data-viz-basics",
    status: "active",
    order: 58,
    tags: [
      "foundations"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "productivity-systems",
    title: "Personal Productivity Systems",
    tool: "productivity-systems",
    status: "active",
    order: 59,
    tags: [
      "soft-skills"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "documentation-writing",
    title: "Writing Better Documentation",
    tool: "documentation-writing",
    status: "active",
    order: 60,
    tags: [
      "ops"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "ux-research-basics",
    title: "Basic UX Research Methods",
    tool: "ux-research-basics",
    status: "active",
    order: 61,
    tags: [
      "design"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "git-for-humans",
    title: "Version Control (Git) for Non-Engineers",
    tool: "git-for-humans",
    status: "active",
    order: 62,
    tags: [
      "foundations"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "api-basics-nondev",
    title: "API Basics for Non-Developers",
    tool: "api-basics-nondev",
    status: "active",
    order: 63,
    tags: [
      "foundations"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "email-marketing-automation",
    title: "Email & Marketing Automation",
    tool: "email-marketing-automation",
    status: "active",
    order: 64,
    tags: [
      "delivery"
    ],
    featured: false,
    pinnable: false
  },
  {
    id: "personal-branding-portfolio",
    title: "Personal Branding & Portfolio Building",
    tool: "personal-branding-portfolio",
    status: "active",
    order: 65,
    tags: [
      "career"
    ],
    featured: false,
    pinnable: false
  }
];

export const activeManuals = () => MANUALS.filter((m) => m.status === "active");
export const activeManualSlugs = () => new Set(activeManuals().map((m) => m.id));
export const featuredManualIds = () => new Set(activeManuals().filter((m) => m.featured).map((m) => m.id));
export const pinnableManuals = () =>
  activeManuals()
    .filter((m) => m.pinnable)
    .map((m) => ({
      id: `man-${m.id === "git-version-control" ? "git" : m.id}`,
      title: m.title,
      slug: m.id,
      icon: m.pinIcon || "📘",
    }));
