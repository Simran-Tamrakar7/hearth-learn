"use client";

/* ============================================================================
 * HEADING: SHARED — pathwise JS → Hearth manuals
 * Not a page. Used by:
 *   /manuals  /manuals/[slug]  /dashboard   (via manualsData.ts)
 * Chapter bodies: src/app/manuals/testing-types|playwright/part-N/chapter-M.md (compiled via registry.ts)
 * User manuals: localStorage — disk shape is <slug>/toc.ts + part-0/chapter-1.md when scaffolded to repo
 * ========================================================================== */

import React, { useState } from "react";
import { ExternalLink, ChevronRight, Copy, Check, Terminal, ArrowRight, BookOpen } from "lucide-react";
import { MANUALS, stripLeadingNumber } from "@/app/manuals/registry";
import type { ManualChapter, ManualItem, ToolItem } from "@/app/manuals/types";
import {
  TESTING_TYPES_TOC,
  type TestingTypesTocPart,
  type TestingTypesTocNode,
} from "@/app/manuals/testing-types/toc";

export {
  TESTING_TYPES_TOC,
  TESTING_TYPES_TOC_VERSION,
  restoreTestingTypesToc,
  flattenTestingTypesToc as flattenTestingTypesOutline,
  type TestingTypesTocPart,
  type TestingTypesTocNode,
} from "@/app/manuals/testing-types/toc";

export {
  type PartishChapter,
  type PartGroup,
  type TestingTypesTocRow,
  stripPartNumber,
  displayPartTitle,
  groupChaptersIntoParts,
  createPart,
  deleteParts,
  renamePart,
  moveParts,
  mergeParts,
  moveChapterToPart,
  moveChapters,
  mergeChapters,
  chapterIndexAfter,
  isSubchapter,
  parentIndexOf,
  tocNumbersForPart,
  createSubchapter,
  deleteChaptersWithSubs,
  moveChapterBlock,
} from "../testing-types/toc";

const CATEGORY: Record<string, ManualItem["category"]> = {
  automation: "Automation & Testing",
  quality: "Quality Craft",
  delivery: "Delivery & Process",
  design: "Design",
  ai: "AI & Prompting",
  foundations: "Foundations",
  ops: "Ops & Systems",
  career: "Career",
  "soft-skills": "Soft Skills",
};

const ICON: Record<string, string> = {
  automation: "Compass",
  quality: "CheckCircle2",
  delivery: "Layers",
  design: "Sparkles",
  ai: "Sparkles",
  foundations: "GitBranch",
  ops: "Cpu",
  career: "BookOpen",
  "soft-skills": "Sparkles",
};

const MANUAL_COVER_POOL = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1531403009284-44017170a722?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
];

function getManualCoverImage(id: string, cat: string, title: string): string {
  const key = `${id}-${title}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % MANUAL_COVER_POOL.length;
  return MANUAL_COVER_POOL[index];
}

const SLUG: Record<string, string> = {
  playwright: "playwright",
};

function hoursLabel(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.round((minutes / 60) * 10) / 10;
  return `${h} hours`;
}

function resourcesFrom(ch: {
  resources?: { name?: string; title?: string; url?: string; type?: string }[];
  links?: { name?: string; url?: string }[];
  steps?: { resources?: { label?: string; name?: string; url?: string; kind?: string }[] }[];
}) {
  const out: ManualChapter["resourceLinks"] = [];
  for (const r of ch.resources || []) {
    if (!r.url) continue;
    out.push({
      title: r.name || r.title || "Resource",
      url: r.url,
      description: r.type || "Docs",
    });
  }
  for (const r of ch.links || []) {
    if (!r.url) continue;
    out.push({ title: r.name || "Link", url: r.url, description: "Link" });
  }
  for (const s of ch.steps || []) {
    for (const r of s.resources || []) {
      if (!r.url) continue;
      out.push({
        title: r.label || r.name || "Docs",
        url: r.url,
        description: r.kind || "Docs",
      });
    }
  }
  const seen = new Set<string>();
  return out.filter((r) => {
    if (seen.has(r.url)) return false;
    seen.add(r.url);
    return true;
  });
}

function chapterToHearth(ch: Record<string, unknown>, order: number): ManualChapter {
  const steps = (Array.isArray(ch.steps) ? ch.steps : []) as Record<string, unknown>[];
  const learn = (Array.isArray(ch.learn) ? ch.learn : []) as string[];
  const overview = String(ch.overview || "");
  const mdBody = ch.contentMarkdown ? String(ch.contentMarkdown) : "";

  const parts = mdBody
    ? [mdBody]
    : [
        overview,
        ...steps.map((s) => {
          const title = String(s.title || "Step");
          const body = String(s.body || "");
          const items = Array.isArray(s.items) ? (s.items as string[]) : [];
          const tip = s.tip ? `\n\nPro tip: ${s.tip}` : "";
          const doThis = s.doThis ? `\n\nDo this now: ${s.doThis}` : "";
          const list = items.length ? "\n\n" + items.map((i) => `- ${i}`).join("\n") : "";
          const code = s.code
            ? `\n\n${s.codeTitle ? `#### ${s.codeTitle}\n\n` : ""}` + "```\n" + String(s.code) + "\n```"
            : "";
          return `## ${title}\n\n${body}${list}${code}${tip}${doThis}`.trim();
        }),
      ].filter(Boolean);

  const firstCode = steps.find((s) => s.code)?.code;
  const exercises: ManualChapter["exercises"] = [];
  for (const s of steps) {
    const quiz = s.quiz as { question?: string; options?: string[]; answer?: number } | undefined;
    if (quiz?.question) {
      const ans = quiz.options?.[quiz.answer ?? 0] || "";
      exercises.push({ prompt: quiz.question, solutionCode: ans });
    } else if (s.doThis) {
      exercises.push({ prompt: String(s.doThis), solutionCode: String(s.code || s.doThis) });
    }
  }

  const sections =
    learn.length > 0
      ? learn.map((title) => {
          const match = steps.find((s) => String(s.title) === title);
          return { title, body: String(match?.body || title) };
        })
      : steps.slice(0, 4).map((s) => ({
          title: String(s.title || "Section"),
          body: String(s.body || "").slice(0, 600),
        }));

  return {
    id: String(ch.id),
    order,
    slug: String(ch.id),
    title: stripLeadingNumber(String(ch.title || `Chapter ${order}`)),
    subtitle: ch.phase ? String(ch.phase) : undefined,
    estimatedMinutes: Number(ch.minutes) || 20,
    contentMarkdown: parts.join("\n\n"),
    summaryMarkdown: learn.length
      ? `Key takeaways:\n${learn.map((l) => `- ${l}`).join("\n")}`
      : overview.slice(0, 400),
    sections: sections.filter((s) => s.body),
    codeSnippet: firstCode ? String(firstCode) : undefined,
    overlayNo: ch.overlayNo != null ? Number(ch.overlayNo) : undefined,
    sourceFile: ch.sourceFile ? String(ch.sourceFile) : undefined,
    overviewText: ch.overviewText ? String(ch.overviewText) : overview || undefined,
    why: ch.why ? String(ch.why) : undefined,
    when: ch.when ? String(ch.when) : undefined,
    practical: ch.practical ? (ch.practical as ManualChapter["practical"]) : undefined,
    tools: Array.isArray(ch.tools) ? (ch.tools as ManualChapter["tools"]) : undefined,
    advantages: Array.isArray(ch.advantages) ? (ch.advantages as string[]) : undefined,
    limitations: Array.isArray(ch.limitations) ? (ch.limitations as string[]) : undefined,
    exercises,
    resourceLinks: resourcesFrom(ch as Parameters<typeof resourcesFrom>[0]),
  };
}

export function pathwiseToHearth(raw: Record<string, unknown>): ManualItem {
  const id = String(raw.id);
  const cat = String(raw.category || "foundations");
  const chaptersIn = (Array.isArray(raw.chapters) ? raw.chapters : []) as Record<string, unknown>[];
  const chapters = chaptersIn.map((c, i) => chapterToHearth(c, i + 1));
  const minutes = chapters.reduce((n, c) => n + c.estimatedMinutes, 0);

  return {
    id: `manual-${id}`,
    slug: SLUG[id] || id,
    title: String(raw.title || id),
    category: CATEGORY[cat] || "Foundations",
    description: String(raw.tagline || raw.who || ""),
    chapterCount: chapters.length,
    estimatedTime: hoursLabel(minutes),
    icon: ICON[cat] || "BookOpen",
    coverImage: getManualCoverImage(id, cat, String(raw.title || id)),
    chapters,
  };
}

export const PATHWISE_HEARTH_MANUALS: ManualItem[] = MANUALS.map((m) => pathwiseToHearth(m.body));

export function findHearthManual(slug: string): ManualItem | undefined {
  const aliases: Record<string, string> = {
    "playwright-test-automation": "playwright",
    "testing-by-level": "testing-types",
    "testing-levels": "testing-types",
    "testing-types-by-level": "testing-types",
    "testing-guide-part1": "testing-types",
    "test-automation": "testing-types",
    "automation-testing": "testing-types",
  };
  const want = aliases[slug] || slug;
  return PATHWISE_HEARTH_MANUALS.find(
    (m) => m.slug === want || m.id === want || m.id === `manual-${want}`
  );
}

function overlayByNo(pathwise: ManualChapter[], n: number): ManualChapter | undefined {
  return pathwise.find(
    (p) => Number(p.overlayNo) === n || p.id === `tt-ch-${n}` || p.slug === `ch-${n}`
  );
}

function partSlug(name: string): string {
  return `tt-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

/** Match compiled MD row — TOC label may differ from catalog title. */
function findPathwise(pathwise: ManualChapter[], outlineTitle: string, overlayNo?: number): ManualChapter | undefined {
  if (overlayNo != null) {
    const byNo = overlayByNo(pathwise, overlayNo);
    if (byNo) return byNo;
  }
  const want = outlineTitle.trim().toLowerCase();
  const exact = pathwise.find((p) => p.title.trim().toLowerCase() === want);
  if (exact) return exact;
  return pathwise.find((p) => {
    const pt = p.title.trim().toLowerCase();
    return pt.includes(want) || want.includes(pt);
  });
}

function pickMarkdown(compiled?: string, saved?: string): string {
  const c = compiled?.trim() || "";
  const s = saved?.trim() || "";
  if (!s) return c;
  if (!c) return s;
  if (c.includes("##") && !s.includes("##")) return c;
  if (c.length > s.length + 40) return c;
  return s;
}

function chapterFromMd(
  pw: ManualChapter,
  title: string,
  subtitle: string,
  partKey: string,
  parentId: string | undefined,
  order: number,
  overlayNo?: number
): ManualChapter {
  return {
    ...pw,
    id: pw.id || (overlayNo != null ? `tt-ch-${overlayNo}` : `tt-ch-${order}`),
    order,
    slug: overlayNo != null ? `ch-${overlayNo}` : pw.slug || `ch-${order}`,
    title,
    subtitle,
    partKey,
    parentId,
    overviewText: pw.overviewText || "",
    why: pw.why || "",
    when: pw.when || "",
    practical: pw.practical,
    tools: pw.tools?.length ? pw.tools : [],
    advantages: pw.advantages?.length ? pw.advantages : [],
    limitations: pw.limitations?.length ? pw.limitations : [],
    contentMarkdown: pw.contentMarkdown || pw.overviewText || "",
    exercises: pw.exercises || [],
    resourceLinks: pw.resourceLinks || [],
    overlayNo,
  };
}

function folderChapter(
  id: string,
  title: string,
  subtitle: string,
  partKey: string,
  order: number,
  pathwise: ManualChapter[]
): ManualChapter {
  const pw = pathwise.find((p) => p.title.trim().toLowerCase() === title.trim().toLowerCase());
  const overview =
    pw?.overviewText ||
    pw?.contentMarkdown?.split("\n\n")[0]?.trim() ||
    "Quality attributes beside functional correctness: usability, accessibility, compliance, SEO / site health, and security.";
  return {
    id: pw?.id || id,
    order,
    slug: pw?.slug || "quality-attributes",
    title,
    estimatedMinutes: pw?.estimatedMinutes || 5,
    subtitle,
    partKey,
    overviewText: overview,
    contentMarkdown: pw?.contentMarkdown?.trim() || overview,
    exercises: pw?.exercises || [],
    resourceLinks: pw?.resourceLinks || [],
  };
}

export function testingTypesMdSections(ch: ManualChapter, overview?: string): string {
  const md = (ch.contentMarkdown || "").trim();
  if (!md) return "";
  const intro = (overview || ch.overviewText || "").trim();
  if (!intro) return md;
  if (md === intro) return "";
  if (md.startsWith(intro) && (md.length === intro.length || md[intro.length] === "\n")) {
    return md.slice(intro.length).trim();
  }
  return md;
}

function mergeSavedChapter(catalog: ManualChapter, saved: ManualChapter): ManualChapter {
  return {
    ...catalog,
    title: saved.title?.trim() || catalog.title,
    estimatedMinutes: saved.estimatedMinutes ?? catalog.estimatedMinutes,
    overviewText: saved.overviewText?.trim() || catalog.overviewText,
    why: saved.why?.trim() || catalog.why,
    when: saved.when?.trim() || catalog.when,
    practical: saved.practical?.scenario?.trim() ? saved.practical : catalog.practical,
    tools: saved.tools?.length ? saved.tools : catalog.tools,
    advantages: saved.advantages?.length ? saved.advantages : catalog.advantages,
    limitations: saved.limitations?.length ? saved.limitations : catalog.limitations,
    contentMarkdown: pickMarkdown(catalog.contentMarkdown, saved.contentMarkdown),
    customSummary: saved.customSummary?.trim() || catalog.customSummary,
    aiSummary: saved.aiSummary?.trim() || catalog.aiSummary,
    codeSnippet: saved.codeSnippet?.trim() || catalog.codeSnippet,
  };
}

export function mergeTestingTypesSavedEdits(rebuilt: ManualChapter[], saved: ManualChapter[]): ManualChapter[] {
  if (!saved.length) return rebuilt;
  const byId = new Map(saved.map((c) => [c.id, c]));
  const byTitle = new Map(saved.map((c) => [c.title.trim().toLowerCase(), c]));
  const bySlug = new Map(saved.map((c) => [c.slug, c]));
  return rebuilt.map((ch) => {
    const s = byId.get(ch.id) || bySlug.get(ch.slug) || byTitle.get(ch.title.trim().toLowerCase());
    if (!s) return ch;
    return mergeSavedChapter(ch, s);
  });
}

export function mergeCustomTestingTypesChapters(rebuilt: ManualChapter[], saved: ManualChapter[]): ManualChapter[] {
  const ids = new Set(rebuilt.map((c) => c.id));
  const extra = saved.filter(
    (c) => (c.id.startsWith("custom-") || c.slug.startsWith("sub-")) && !ids.has(c.id)
  );
  if (!extra.length) return rebuilt;
  return [...rebuilt, ...extra.map((c, i) => ({ ...c, order: rebuilt.length + i + 1 }))];
}

/** Build reader chapter list from toc.ts ordering + compiled MD chapters (no overlay merge). */
export function readerChaptersFromToc(pathwise: ManualChapter[]): ManualChapter[] {
  const out: ManualChapter[] = [];
  for (const part of TESTING_TYPES_TOC) {
    const subtitle = part.name;
    const partKey = partSlug(part.name);
    for (const item of part.items) {
      const pw = item.no != null ? findPathwise(pathwise, item.title, item.no) : undefined;
      let parent: ManualChapter;
      if (item.no != null && pw) {
        parent = chapterFromMd(pw, item.title, subtitle, partKey, undefined, out.length + 1, item.no);
      } else if (item.no != null) {
        parent = chapterFromMd(
          {
            id: `tt-ch-${item.no}`,
            order: out.length + 1,
            slug: `ch-${item.no}`,
            title: item.title,
            estimatedMinutes: 25,
            subtitle,
            partKey,
            overviewText: item.title,
            contentMarkdown: "",
            exercises: [],
            resourceLinks: [],
          },
          item.title,
          subtitle,
          partKey,
          undefined,
          out.length + 1,
          item.no
        );
      } else {
        parent = folderChapter("tt-folder-quality-attributes", item.title, subtitle, partKey, out.length + 1, pathwise);
      }
      out.push(parent);
      for (const child of item.children || []) {
        const childPw = findPathwise(pathwise, child.title, child.no);
        if (!childPw && child.no == null) continue;
        out.push(
          chapterFromMd(
            childPw || {
              id: `tt-ch-${child.no}`,
              order: out.length + 1,
              slug: `ch-${child.no}`,
              title: child.title,
              estimatedMinutes: 25,
              subtitle,
              partKey,
              parentId: parent.id,
              overviewText: child.title,
              contentMarkdown: "",
              exercises: [],
              resourceLinks: [],
            },
            child.title,
            subtitle,
            partKey,
            parent.id,
            out.length + 1,
            child.no
          )
        );
      }
    }
  }
  return out;
}

/** @deprecated use readerChaptersFromToc — alias kept for call sites during migration */
export const readerChaptersFromOverlay = readerChaptersFromToc;

interface ToolSwitcherProps {
  tools: ToolItem[];
  className?: string;
  onNavigateChapter?: (chapterIndex: number) => void;
}

export function ToolSwitcher({ tools, className = "", onNavigateChapter }: ToolSwitcherProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [isStepsOpen, setIsStepsOpen] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!tools || tools.length === 0) return null;

  const currentTool = tools[activeTab] || tools[0];

  const handleCopy = (codeText: string, index: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 1800);
  };

  const renderDescWithLinks = (text: string) => {
    if (!onNavigateChapter) return text;
    const parts = text.split(/(Chapter\s+\d+|see Chapter\s+\d+)/gi);
    return parts.map((part, pIdx) => {
      const match = part.match(/Chapter\s+(\d+)/i);
      if (match) {
        const chapNum = parseInt(match[1], 10);
        return (
          <button
            key={pIdx}
            type="button"
            onClick={() => onNavigateChapter(chapNum - 1)}
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-1 rounded-md bg-[#FAF7F2] hover:bg-[#EFE8DC] border border-[#D97706]/30 text-[#D97706] font-semibold text-xs transition-colors cursor-pointer"
            title={`Jump directly to Chapter ${chapNum}`}
          >
            <BookOpen className="w-3 h-3 text-[#D97706]" />
            <span>{part}</span>
            <ArrowRight className="w-2.5 h-2.5 text-[#D97706]" />
          </button>
        );
      }
      return part;
    });
  };

  return (
    <div
      className={`my-4 rounded-2xl overflow-hidden border border-[#E7E0D3] bg-white shadow-2xs ${className}`}
    >
      <div className="flex flex-wrap items-end gap-2 px-4 sm:px-6 pt-3 pb-0 bg-[#FAF7F2] border-b border-[#E7E0D3]">
        {tools.map((tool, idx) => {
          const isActive = idx === activeTab;
          return (
            <button
              key={tool.name + idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`font-mono text-xs sm:text-[13px] px-4 py-2 transition-all duration-150 relative cursor-pointer select-none flex items-center gap-2 ${
                isActive
                  ? "bg-white text-[#1C2A26] border-t border-x border-[#E7E0D3] border-b-2 border-b-white rounded-t-xl font-bold shadow-2xs z-10 -mb-[1px]"
                  : "bg-transparent text-[#52635E] border border-[#E7E0D3] rounded-xl mb-1.5 hover:bg-white hover:text-[#1C2A26] hover:border-[#D4CBBB]"
              }`}
            >
              <span
                className={`font-semibold text-[11px] font-mono ${
                  isActive ? "text-[#D97706]" : "text-[#8B9894]"
                }`}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className={isActive ? "text-[#1C2A26] font-bold" : "text-[#52635E]"}>
                {tool.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="p-5 sm:p-7 bg-white space-y-5 animate-in fade-in duration-200">
        <div className="flex flex-wrap items-baseline justify-between gap-3 pb-1 border-b border-[#E7E0D3]/60">
          <div className="flex flex-wrap items-baseline gap-2">
            <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-[#1C2A26] flex items-baseline gap-2">
              <span>{currentTool.name}</span>
              {currentTool.sub && (
                <span className="text-xs sm:text-sm font-sans font-medium text-[#52635E]">
                  — {currentTool.sub}
                </span>
              )}
            </h4>

            {currentTool.seeChapter && onNavigateChapter && (
              <button
                type="button"
                onClick={() => onNavigateChapter(currentTool.seeChapter! - 1)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF7F2] hover:bg-[#EFE8DC] border border-[#D97706]/40 text-[#D97706] text-xs font-bold font-mono transition-all shadow-2xs cursor-pointer ml-2"
                title={`Jump directly to Chapter ${currentTool.seeChapter}`}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Jump to Chapter {currentTool.seeChapter}</span>
                <ArrowRight className="w-3 h-3 text-[#D97706]" />
              </button>
            )}
          </div>

          {currentTool.url && (
            <a
              href={currentTool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-[#D97706] hover:text-amber-800 border-b border-dashed border-[#D97706]/50 hover:border-solid transition-colors"
            >
              <span>{currentTool.url.replace(/^https?:\/\//, "")}</span>
              <span className="text-[10px]">↗</span>
            </a>
          )}
        </div>

        <p className="text-xs sm:text-[14px] leading-relaxed text-[#52635E] max-w-4xl font-sans">
          {renderDescWithLinks(currentTool.desc)}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div className="rounded-xl border border-emerald-200 border-t-2 border-t-emerald-500 bg-emerald-50/30 p-4 sm:p-5 shadow-2xs flex flex-col space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs uppercase tracking-wider font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
              <span>Advantages</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed pl-4 list-disc marker:text-emerald-600 font-sans">
              {currentTool.adv.map((item, i) => (
                <li key={i} className="pl-0.5">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-rose-200 border-t-2 border-t-rose-500 bg-rose-50/30 p-4 sm:p-5 shadow-2xs flex flex-col space-y-2">
            <div className="flex items-center gap-2 text-rose-800 font-mono text-xs uppercase tracking-wider font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 inline-block" />
              <span>Limitations</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed pl-4 list-disc marker:text-rose-600 font-sans">
              {currentTool.lim.map((item, i) => (
                <li key={i} className="pl-0.5">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {currentTool.steps && currentTool.steps.length > 0 && (
          <div className="rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] overflow-hidden">
            <button
              type="button"
              onClick={() => setIsStepsOpen(!isStepsOpen)}
              className="w-full px-5 py-3.5 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-[#1C2A26] hover:bg-[#F5EFE6] transition-colors cursor-pointer select-none font-bold"
            >
              <span className="tracking-wider flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#D97706]" />
                <span>How to use — step by step ({currentTool.steps.length} steps)</span>
              </span>
              <ChevronRight
                className={`w-4 h-4 text-[#D97706] transition-transform duration-200 ${
                  isStepsOpen ? "rotate-90" : ""
                }`}
              />
            </button>

            {isStepsOpen && (
              <div className="px-5 pb-5 pt-2 border-t border-[#E7E0D3] bg-white space-y-4">
                {currentTool.steps.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="pt-3.5 pb-2 border-b border-[#E7E0D3]/60 last:border-b-0 space-y-2"
                  >
                    <div className="flex items-baseline gap-2 text-sm font-bold text-[#1C2A26]">
                      <span className="font-mono text-xs text-[#D97706] font-bold">
                        {String(sIdx + 1).padStart(2, "0")}
                      </span>
                      <span>{step.t}</span>
                    </div>

                    {step.p && (
                      <p className="text-xs sm:text-[13px] text-[#52635E] leading-relaxed font-sans">
                        {step.p}
                      </p>
                    )}

                    {step.c && (
                      <div className="relative group/code mt-2">
                        <button
                          type="button"
                          onClick={() => handleCopy(step.c!, sIdx)}
                          className="absolute right-2.5 top-2.5 px-2.5 py-1 rounded bg-[#2D3F3A] hover:bg-[#3D524C] border border-[#3D524C] text-[#E7E0D3] font-mono text-[11px] flex items-center gap-1 opacity-90 group-hover/code:opacity-100 transition-all cursor-pointer shadow-xs"
                          title="Copy snippet"
                        >
                          {copiedIndex === sIdx ? (
                            <>
                              <Check className="w-3 h-3 text-[#A7F3D0]" />
                              <span className="text-[#A7F3D0]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                        <pre className="p-3.5 sm:p-4 rounded-xl bg-[#1C2A26] text-[#A7F3D0] border border-[#2D3F3A] overflow-x-auto text-xs font-mono leading-relaxed shadow-inner">
                          <code>{step.c}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
