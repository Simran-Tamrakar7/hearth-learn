export interface GoDeeperResource {
  title: string;
  url: string;
  description: string;
}

export interface ManualExercise {
  prompt: string;
  starterCode?: string;
  solutionCode: string;
}

export interface ManualChapter {
  id: string;
  order: number;
  slug: string;
  title: string;
  estimatedMinutes: number;
  subtitle?: string;
  contentMarkdown: string;
  summaryMarkdown?: string;
  sections?: { title: string; body: string }[];
  codeSnippet?: string;
  exercises: ManualExercise[];
  resourceLinks: GoDeeperResource[];
}

export interface ManualItem {
  id: string;
  slug: string;
  title: string;
  category:
    | "Automation & Testing"
    | "Quality Craft"
    | "Delivery & Process"
    | "Design"
    | "AI & Prompting"
    | "Foundations"
    | "Ops & Systems"
    | "Career"
    | "Soft Skills";
  description: string;
  chapterCount: number;
  estimatedTime: string;
  icon: string;
  coverImage: string;
  chapters: ManualChapter[];
}

export { PATHWISE_HEARTH_MANUALS as MANUALS_DATA, findHearthManual } from "./pathwiseToHearth";
