import { pathwiseManuals } from "./pathwise-data/catalog.js";
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

const COVER: Record<string, string> = {
  automation: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
  quality: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  delivery: "https://images.unsplash.com/photo-1531403009284-44017170a722?auto=format&fit=crop&w=800&q=80",
  design: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
  ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  foundations: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=800&q=80",
  ops: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  career: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
  "soft-skills": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
};

const SLUG: Record<string, string> = {
  git: "git-version-control",
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

  const parts = [
    overview,
    ...steps.map((s) => {
      const title = String(s.title || "Step");
      const body = String(s.body || "");
      const items = Array.isArray(s.items) ? (s.items as string[]) : [];
      const tip = s.tip ? `\n\nPro tip: ${s.tip}` : "";
      const doThis = s.doThis ? `\n\nDo this now: ${s.doThis}` : "";
      const list = items.length ? "\n\n" + items.map((i) => `- ${i}`).join("\n") : "";
      return `## ${title}\n\n${body}${list}${tip}${doThis}`.trim();
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
    title: String(ch.title || `Chapter ${order}`),
    subtitle: ch.phase ? String(ch.phase) : undefined,
    estimatedMinutes: Number(ch.minutes) || 20,
    contentMarkdown: parts.join("\n\n"),
    summaryMarkdown: learn.length
      ? `Key takeaways:\n${learn.map((l) => `- ${l}`).join("\n")}`
      : overview.slice(0, 400),
    sections: sections.filter((s) => s.body),
    codeSnippet: firstCode ? String(firstCode) : undefined,
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
    coverImage: COVER[cat] || COVER.foundations,
    chapters,
  };
}

export const PATHWISE_HEARTH_MANUALS: ManualItem[] = (pathwiseManuals as Record<string, unknown>[]).map(
  pathwiseToHearth
);

export function findHearthManual(slug: string): ManualItem | undefined {
  const aliases: Record<string, string> = {
    "playwright-test-automation": "playwright",
    git: "git-version-control",
  };
  const want = aliases[slug] || slug;
  return PATHWISE_HEARTH_MANUALS.find((m) => m.slug === want);
}
