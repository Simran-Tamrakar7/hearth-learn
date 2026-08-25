import type { CatalogStatus } from "../types";

import { pathwiseManual as testingTypes } from "./testing-types/data.js";
import { pathwiseManual as cypress } from "./cypress/data.js";
import { pathwiseManual as playwright } from "./playwright/data.js";
import { pathwiseManual as apiTesting } from "./api-testing/data.js";
import { pathwiseManual as selenium } from "./selenium/data.js";
import { pathwiseManual as cicd } from "./cicd/data.js";
import { pathwiseManual as accessibility } from "./accessibility/data.js";
import { pathwiseManual as securityTesting } from "./security-testing/data.js";
import { pathwiseManual as mobileTesting } from "./mobile-testing/data.js";
import { pathwiseManual as dockerQa } from "./docker-qa/data.js";
import { pathwiseManual as exploratoryTesting } from "./exploratory-testing/data.js";
import { pathwiseManual as testPlanning } from "./test-planning/data.js";
import { pathwiseManual as bugAdvocacy } from "./bug-advocacy/data.js";
import { pathwiseManual as performanceTesting } from "./performance-testing/data.js";
import { pathwiseManual as agileScrum } from "./agile-scrum/data.js";
import { pathwiseManual as projectManagement } from "./project-management/data.js";
import { pathwiseManual as productSense } from "./product-sense/data.js";
import { pathwiseManual as jiraWork } from "./jira-work/data.js";
import { pathwiseManual as graphicDesign } from "./graphic-design/data.js";
import { pathwiseManual as figma } from "./figma/data.js";
import { pathwiseManual as uiux } from "./uiux/data.js";
import { pathwiseManual as designThinking } from "./design-thinking/data.js";
import { pathwiseManual as motionDesign } from "./motion-design/data.js";
import { pathwiseManual as presentationDesign } from "./presentation-design/data.js";
import { pathwiseManual as promptEngineering } from "./prompt-engineering/data.js";
import { pathwiseManual as aiCoding } from "./ai-coding/data.js";
import { pathwiseManual as javascript } from "./javascript/data.js";
import { pathwiseManual as typescript } from "./typescript/data.js";
import { pathwiseManual as python } from "./python/data.js";
import { pathwiseManual as sql } from "./sql/data.js";
import { pathwiseManual as gitVersionControl } from "./git-version-control/data.js";
import { pathwiseManual as linuxCli } from "./linux-cli/data.js";
import { pathwiseManual as observability } from "./observability/data.js";
import { pathwiseManual as cloudBasics } from "./cloud-basics/data.js";
import { pathwiseManual as dataLiteracy } from "./data-literacy/data.js";
import { pathwiseManual as documentationSystems } from "./documentation-systems/data.js";
import { pathwiseManual as resumeLinkedin } from "./resume-linkedin/data.js";
import { pathwiseManual as portfolio } from "./portfolio/data.js";
import { pathwiseManual as jobHunt } from "./job-hunt/data.js";
import { pathwiseManual as communication } from "./communication/data.js";
import { pathwiseManual as problemSolving } from "./problem-solving/data.js";
import { pathwiseManual as interviewCraft } from "./interview-craft/data.js";
import { pathwiseManual as focus } from "./focus/data.js";
import { pathwiseManual as emotionalIntelligence } from "./emotional-intelligence/data.js";
import { pathwiseManual as conflictCollaboration } from "./conflict-collaboration/data.js";
import { pathwiseManual as stakeholderManagement } from "./stakeholder-management/data.js";
import { pathwiseManual as techWriting } from "./tech-writing/data.js";
import { pathwiseManual as publicSpeaking } from "./public-speaking/data.js";
import { pathwiseManual as networkingCareer } from "./networking-career/data.js";
import { pathwiseManual as reactBasics } from "./react-basics/data.js";
import { pathwiseManual as cssLayout } from "./css-layout/data.js";
import { pathwiseManual as postmanApi } from "./postman-api/data.js";
import { pathwiseManual as excelData } from "./excel-data/data.js";
import { pathwiseManual as chatgptWorkflows } from "./chatgpt-workflows/data.js";
import { pathwiseManual as linuxShellDaily } from "./linux-shell-daily/data.js";
import { pathwiseManual as nocodeAutomation } from "./nocode-automation/data.js";
import { pathwiseManual as aiAgentsWorkflows } from "./ai-agents-workflows/data.js";
import { pathwiseManual as dataVizBasics } from "./data-viz-basics/data.js";
import { pathwiseManual as productivitySystems } from "./productivity-systems/data.js";
import { pathwiseManual as documentationWriting } from "./documentation-writing/data.js";
import { pathwiseManual as uxResearchBasics } from "./ux-research-basics/data.js";
import { pathwiseManual as gitForHumans } from "./git-for-humans/data.js";
import { pathwiseManual as apiBasicsNondev } from "./api-basics-nondev/data.js";
import { pathwiseManual as emailMarketingAutomation } from "./email-marketing-automation/data.js";
import { pathwiseManual as personalBrandingPortfolio } from "./personal-branding-portfolio/data.js";

/** Builtin manuals. Listing + bodies. A folder is invisible until this file imports its data.js. */
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
  /** Chapter body from ./<id>/data.js — this import is what makes the folder exist to Next. */
  body: Record<string, unknown>;
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
    pinIcon: "🧪",
    body: testingTypes,
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
    pinIcon: "🌲",
    body: cypress,
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
    pinIcon: "🎭",
    body: playwright,
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
    pinnable: false,
    body: apiTesting,
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
    pinnable: false,
    body: selenium,
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
    pinnable: false,
    body: cicd,
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
    pinnable: false,
    body: accessibility,
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
    pinnable: false,
    body: securityTesting,
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
    pinnable: false,
    body: mobileTesting,
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
    pinnable: false,
    body: dockerQa,
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
    pinnable: false,
    body: exploratoryTesting,
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
    pinnable: false,
    body: testPlanning,
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
    pinnable: false,
    body: bugAdvocacy,
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
    pinnable: false,
    body: performanceTesting,
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
    pinnable: false,
    body: agileScrum,
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
    pinnable: false,
    body: projectManagement,
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
    pinnable: false,
    body: productSense,
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
    pinnable: false,
    body: jiraWork,
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
    pinnable: false,
    body: graphicDesign,
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
    pinnable: false,
    body: figma,
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
    pinnable: false,
    body: uiux,
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
    pinnable: false,
    body: designThinking,
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
    pinnable: false,
    body: motionDesign,
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
    pinnable: false,
    body: presentationDesign,
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
    pinIcon: "✨",
    body: promptEngineering,
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
    pinnable: false,
    body: aiCoding,
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
    pinIcon: "📘",
    body: javascript,
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
    pinnable: false,
    body: typescript,
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
    pinnable: false,
    body: python,
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
    pinnable: false,
    body: sql,
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
    pinIcon: "🐙",
    body: gitVersionControl,
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
    pinnable: false,
    body: linuxCli,
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
    pinnable: false,
    body: observability,
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
    pinnable: false,
    body: cloudBasics,
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
    pinnable: false,
    body: dataLiteracy,
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
    pinnable: false,
    body: documentationSystems,
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
    pinnable: false,
    body: resumeLinkedin,
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
    pinnable: false,
    body: portfolio,
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
    pinnable: false,
    body: jobHunt,
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
    pinnable: false,
    body: communication,
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
    pinnable: false,
    body: problemSolving,
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
    pinnable: false,
    body: interviewCraft,
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
    pinnable: false,
    body: focus,
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
    pinnable: false,
    body: emotionalIntelligence,
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
    pinnable: false,
    body: conflictCollaboration,
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
    pinnable: false,
    body: stakeholderManagement,
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
    pinnable: false,
    body: techWriting,
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
    pinnable: false,
    body: publicSpeaking,
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
    pinnable: false,
    body: networkingCareer,
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
    pinnable: false,
    body: reactBasics,
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
    pinnable: false,
    body: cssLayout,
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
    pinnable: false,
    body: postmanApi,
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
    pinnable: false,
    body: excelData,
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
    pinnable: false,
    body: chatgptWorkflows,
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
    pinnable: false,
    body: linuxShellDaily,
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
    pinnable: false,
    body: nocodeAutomation,
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
    pinnable: false,
    body: aiAgentsWorkflows,
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
    pinnable: false,
    body: dataVizBasics,
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
    pinnable: false,
    body: productivitySystems,
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
    pinnable: false,
    body: documentationWriting,
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
    pinnable: false,
    body: uxResearchBasics,
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
    pinnable: false,
    body: gitForHumans,
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
    pinnable: false,
    body: apiBasicsNondev,
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
    pinnable: false,
    body: emailMarketingAutomation,
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
    pinnable: false,
    body: personalBrandingPortfolio,
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
