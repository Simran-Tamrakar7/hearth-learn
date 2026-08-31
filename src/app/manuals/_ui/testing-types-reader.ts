import type { ManualChapter } from "@/app/manuals/_lib/manualsData";
import { TESTING_TYPES_CHAPTERS, type TestingChapterData } from "@/app/manuals/_content/testing-types/overlay";
import { TESTING_TYPES_OUTLINE } from "@/app/manuals/_content/testing-types/outline";

export { TESTING_TYPES_OUTLINE } from "@/app/manuals/_content/testing-types/outline";

function overlayByNo(n: number): TestingChapterData | undefined {
  return TESTING_TYPES_CHAPTERS.find((t) => Number(t.no) === n);
}

function partSlug(name: string): string {
  return `tt-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

/** Match compiled MD row — outline TOC label often differs from catalog/overlay title. */
function findPathwise(
  pathwise: ManualChapter[],
  tt: TestingChapterData,
  outlineTitle?: string
): ManualChapter | undefined {
  const wants = [tt.title, outlineTitle]
    .filter(Boolean)
    .map((t) => t!.trim().toLowerCase());
  for (const want of wants) {
    const exact = pathwise.find((p) => p.title.trim().toLowerCase() === want);
    if (exact) return exact;
  }
  const primary = wants[0];
  if (primary) {
    const fuzzy = pathwise.find((p) => {
      const pt = p.title.trim().toLowerCase();
      return pt.includes(primary) || primary.includes(pt);
    });
    if (fuzzy) return fuzzy;
  }
  return pathwise.find((p) => p.id === `tt-ch-${tt.no}` || p.slug === `ch-${tt.no}`);
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

/** One complete chapter row — overlay + MD merged onto ManualChapter. */
function chapterFromOverlay(
  tt: TestingChapterData,
  pathwise: ManualChapter[],
  title: string,
  subtitle: string,
  partKey: string,
  parentId: string | undefined,
  order: number
): ManualChapter {
  const pw = findPathwise(pathwise, tt, title);
  const md = pw?.contentMarkdown?.trim();
  return {
    ...(pw || {
      exercises: [],
      resourceLinks: [],
    }),
    id: pw?.id || `tt-ch-${tt.no}`,
    order,
    slug: `ch-${tt.no}`,
    title,
    estimatedMinutes: pw?.estimatedMinutes || 25,
    subtitle,
    partKey,
    parentId,
    overviewText: tt.desc || pw?.overviewText,
    why: tt.why ?? pw?.why,
    when: tt.when ?? pw?.when,
    practical: tt.practical ?? pw?.practical,
    tools: tt.tools?.length ? tt.tools : pw?.tools,
    advantages: tt.advantages?.length ? tt.advantages : pw?.advantages,
    limitations: tt.limitations?.length ? tt.limitations : pw?.limitations,
    contentMarkdown: md || tt.desc,
    exercises: pw?.exercises || [],
    resourceLinks: pw?.resourceLinks || [],
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

export function testingOverlayForChapter(ch: { id?: string; slug?: string; title?: string }): TestingChapterData | undefined {
  const fromSlug = /^ch-(\d+)$/.exec(ch.slug || "");
  const fromId = /(?:^|-)ch-(\d+)$/.exec(ch.id || "");
  const n = Number(fromSlug?.[1] || fromId?.[1] || 0);
  if (n) {
    const hit = overlayByNo(n);
    if (hit) return hit;
  }
  return TESTING_TYPES_CHAPTERS.find((t) => t.title === ch.title);
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

export function readerChaptersFromOverlay(pathwise: ManualChapter[]): ManualChapter[] {
  if (!TESTING_TYPES_CHAPTERS.length) return pathwise;
  const out: ManualChapter[] = [];
  for (const part of TESTING_TYPES_OUTLINE) {
    const subtitle = part.name;
    const partKey = partSlug(part.name);
    for (const item of part.items) {
      const tt = item.no != null ? overlayByNo(item.no) : undefined;
      let parent: ManualChapter;
      if (tt) {
        parent = chapterFromOverlay(tt, pathwise, item.title, subtitle, partKey, undefined, out.length + 1);
      } else {
        parent = folderChapter("tt-folder-quality-attributes", item.title, subtitle, partKey, out.length + 1, pathwise);
      }
      out.push(parent);
      for (const child of item.children || []) {
        const childTt = overlayByNo(child.no);
        if (!childTt) continue;
        out.push(
          chapterFromOverlay(childTt, pathwise, child.title, subtitle, partKey, parent.id, out.length + 1)
        );
      }
    }
  }
  return out;
}
