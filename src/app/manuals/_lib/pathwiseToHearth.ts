/* ============================================================================
 * HEADING: SHARED — pathwise JS → Hearth manuals
 * Not a page. Used by:
 *   /manuals  /manuals/[slug]  /dashboard   (via manualsData.ts)
 * Chapter files: src/app/manuals/_content/<slug>/data.js
 * ========================================================================== */

import { MANUALS } from "../_content/_registry.ts";
import { stripLeadingNumber } from "../_content/_helpers.js";
import type { ManualChapter, ManualItem } from "./manualsData";

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


