import type { CatalogStatus } from "../_catalog";
import testingMeta from "./testing-types/meta.json";
import playwrightMeta from "./playwright/meta.json";
import { CHAPTER_RECORDS as testingTypeChapters } from "./testing-types/chapters-index";
import { CHAPTER_RECORDS as playwrightChapters } from "./playwright/chapters-index";
import { CHAPTER_PATHS as testingTypePaths } from "./testing-types/chapter-paths";
import { CHAPTER_PATHS as playwrightPaths } from "./playwright/chapter-paths";
import type { ChapterRecord } from "./types";

/** Builtin manuals kept in the catalog (all others removed). */
export const KEPT_BUILTIN_SLUGS = ["playwright", "testing-types"] as const;
export const KEPT_MANUAL_SLUGS = KEPT_BUILTIN_SLUGS;

export function isKeptBuiltinSlug(slug: string) {
  return (KEPT_BUILTIN_SLUGS as readonly string[]).includes(slug);
}

/** Path helpers for GitHub Pages / Next basePath. */
export const asset = (path: string) => {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
  return `${base}/${String(path).replace(/^\//, "")}`;
};

export const genres = [
  { id: "all", label: "All", blurb: "Every path in the library.", color: "#0B3D2E" },
  { id: "automation", label: "Automation", blurb: "QA, E2E, APIs, pipelines.", color: "#0F766E" },
  { id: "quality", label: "Quality Craft", blurb: "Testing craft, a11y, perf, security.", color: "#0369A1" },
  { id: "delivery", label: "Delivery", blurb: "Agile, PM, product, work tracking.", color: "#C2410C" },
  { id: "design", label: "Design", blurb: "Visual craft, Figma, product UI.", color: "#B45309" },
  { id: "ai", label: "AI & Prompts", blurb: "Talk to models like a pro.", color: "#0D9488" },
  { id: "foundations", label: "Foundations", blurb: "Languages, Git, data.", color: "#A16207" },
  { id: "ops", label: "Ops & Systems", blurb: "CLI, cloud, observability, docs.", color: "#1D4ED8" },
  { id: "career", label: "Career", blurb: "Resume, portfolio, job hunt.", color: "#BE123C" },
  { id: "soft-skills", label: "Soft Skills", blurb: "Communicate, lead, collaborate.", color: "#15803D" },
];

/** Normalize a lesson-step resource pill. */
export function stepResource(label: string, url: string, kind = "Docs") {
  return { label, url, kind };
}

/** Split long-form body text into readable paragraphs. */
export function bodyParagraphs(body: string) {
  if (!body) return [];
  return String(body)
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean);
}

/** Build a book-style chapter from a compact definition. */
export function ch(def: Record<string, unknown>) {
  return {
    ...def,
    id: def.id,
    level: def.level,
    title: def.title,
    minutes: def.minutes ?? 20,
    durationLabel: def.durationLabel ?? null,
    phase: def.phase ?? null,
    kind: def.kind ?? "chapter",
    parentId: def.parentId ?? null,
    overview: def.overview,
    overviewText: def.overviewText ?? def.overview,
    why: def.why ?? null,
    when: def.when ?? null,
    practical: def.practical ?? null,
    tools: def.tools ?? [],
    learn: def.learn ?? [],
    steps: (Array.isArray(def.steps) ? def.steps : []).map((s, i) => normalizeStep(s, i)),
    checklist: def.checklist ?? [],
    practice: def.practice ?? null,
    links: def.links ?? [],
    citations: def.citations ?? [],
    resources: def.resources ?? [],
    note: def.note ?? null,
    partIntro: def.partIntro ?? null,
  };
}

/** Normalize one lesson step to the shared schema (string or object). */
export function normalizeStep(s: unknown, i: number) {
  if (typeof s === "string") {
    return {
      title: `Step ${i + 1}`,
      body: s,
      learnMore: null,
      image: null,
      resources: [],
      quiz: null,
      tryIt: null,
      doThis: null,
      tip: null,
      code: null,
      codeTitle: null,
      items: null,
      callout: null,
      aside: null,
    };
  }
  const step = s as Record<string, unknown>;
  const image = step.image as { src?: string; alt?: string; stickies?: unknown[] } | string | undefined;
  const callout = step.callout as { label?: string; body?: string; tone?: string } | string | undefined;
  const quiz = step.quiz as { question?: string; options?: string[]; answer?: number; explain?: string } | undefined;
  const tryIt = step.tryIt as { prompt?: string; code?: string; result?: string } | undefined;
  return {
    title: step.title ?? `Step ${i + 1}`,
    body: step.body ?? "",
    learnMore: step.learnMore ?? null,
    image: image
      ? {
          src: typeof image === "object" ? image.src ?? image : image,
          alt: typeof image === "object" ? image.alt ?? step.title ?? `Step ${i + 1}` : String(step.title ?? `Step ${i + 1}`),
          stickies: typeof image === "object" && Array.isArray(image.stickies) ? image.stickies : null,
        }
      : null,
    resources: (Array.isArray(step.resources) ? step.resources : []).map((r) => {
      const res = r as { label?: string; name?: string; url?: string; kind?: string; type?: string };
      return typeof r === "string"
        ? { label: "Link", url: r, kind: "Link" }
        : { label: res.label ?? res.name ?? "Link", url: res.url, kind: res.kind ?? res.type ?? "Docs" };
    }),
    quiz: quiz
      ? {
          question: quiz.question,
          options: quiz.options ?? [],
          answer: quiz.answer ?? 0,
          explain: quiz.explain ?? null,
        }
      : null,
    tryIt: tryIt
      ? {
          prompt: tryIt.prompt ?? "Try it",
          code: tryIt.code ?? "",
          result: tryIt.result ?? "",
        }
      : null,
    doThis: step.doThis ?? null,
    tip: step.tip ?? null,
    code: step.code ?? null,
    codeTitle: step.codeTitle ?? null,
    items: step.items ?? null,
    callout: callout
      ? {
          label: typeof callout === "object" ? callout.label ?? "Note" : "Note",
          body: typeof callout === "object" ? callout.body ?? "" : String(callout),
          tone: typeof callout === "object" ? callout.tone ?? "note" : "note",
        }
      : null,
    aside: step.aside ?? null,
  };
}

export function buildRoadmap(chapters: Record<string, unknown>[]) {
  return chapters.map((c, i) => ({
    id: c.id,
    n: c.displayNum ?? i + 1,
    title: c.title,
    level: c.level,
    minutes: c.minutes,
    phase: c.phase,
    kind: c.kind,
    parentId: c.parentId ?? null,
    durationLabel: c.durationLabel,
  }));
}

export function r(type: string, name: string, url: string, lang = "EN", free = true) {
  return { type, name, url, lang, free };
}

const LEADING_NUM = /^(?:§\s*)?\d+(?:\.\d+)*[.)]\s+/u;

export function titleHasLeadingNumber(title: string) {
  return LEADING_NUM.test(String(title || ""));
}

export function stripLeadingNumber(title: string) {
  return String(title || "")
    .replace(LEADING_NUM, "")
    .trim();
}

export function chapterHeading(n: number, title: string) {
  const t = String(title || "").trim();
  if (titleHasLeadingNumber(t)) return t;
  return `${n}. ${t}`;
}

export function chapterNumber(n: number, title: string) {
  const m = String(title || "").match(/^(?:§\s*)?(\d+)(?:\.\d+)*[.)]\s+/u);
  if (m) return Number(m[1]);
  return n;
}

export function stepLabel(chapterNum: number, stepIndex: number, title: string) {
  return {
    num: `${chapterNum}.${stepIndex + 1}`,
    title: stripLeadingNumber(title) || String(title || "").trim(),
  };
}

export function assertManualNumberingOk() {
  if (chapterHeading(1, "1. Introduction") !== "1. Introduction") {
    throw new Error("should not double-prefix numbered titles");
  }
  if (chapterHeading(3, "Setup") !== "3. Setup") throw new Error("plain titles need prefix");
  if (chapterNumber(6, "5. Locators") !== 5) throw new Error("parse title number");
  if (stepLabel(5, 0, "History").num !== "5.1") throw new Error("expected 5.1");
  if (stepLabel(1, 1, "2. Nested").title !== "Nested") throw new Error("strip step title");
  return true;
}

function manualBody(
  meta: Record<string, unknown>,
  chapters: ChapterRecord[],
  paths: Record<string, string>
) {
  return {
    ...meta,
    chapters: chapters.map((c) => ({ ...c, sourceFile: paths[c.id] })),
  };
}

const testingTypesBody = manualBody(testingMeta as Record<string, unknown>, testingTypeChapters, testingTypePaths);
const playwrightBody = manualBody(playwrightMeta as Record<string, unknown>, playwrightChapters, playwrightPaths);

/** Builtin manuals. Listing + bodies. A folder is invisible until this file imports its chapters. */
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
  body: Record<string, unknown>;
};

export const MANUALS: ManualRegistryEntry[] = [
  {
    id: "testing-types",
    title: "Testing Types & Levels",
    tool: "testing-types",
    status: "active",
    order: 1,
    tags: ["automation"],
    featured: false,
    pinnable: true,
    pinIcon: "🧪",
    body: testingTypesBody,
  },
  {
    id: "playwright",
    title: "Playwright with Python",
    tool: "playwright",
    status: "active",
    order: 2,
    tags: ["automation"],
    featured: true,
    pinnable: true,
    pinIcon: "🎭",
    body: playwrightBody,
  },
];

export const activeManuals = () => MANUALS.filter((m) => m.status === "active");
export const activeManualSlugs = () => new Set(activeManuals().map((m) => m.id));
export const pinnableManuals = () =>
  activeManuals()
    .filter((m) => m.pinnable)
    .map((m) => ({
      id: `man-${m.id}`,
      title: m.title,
      slug: m.id,
      icon: m.pinIcon || "📘",
    }));
