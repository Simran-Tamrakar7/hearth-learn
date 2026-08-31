import type { ManualChapter } from "@/app/manuals/_lib/manualsData";
import { TESTING_TYPES_OUTLINE } from "@/app/manuals/_content/testing-types/outline";

export { TESTING_TYPES_OUTLINE } from "@/app/manuals/_content/testing-types/outline";

function partSlug(name: string): string {
  return `tt-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function indexByTypeNo(pathwise: ManualChapter[]): Map<number, ManualChapter> {
  const m = new Map<number, ManualChapter>();
  for (const p of pathwise) {
    if (p.typeNo != null) m.set(p.typeNo, p);
  }
  return m;
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

/** One TOC row from outline + compiled MD (lookup by typeNo). */
function chapterFromOutline(
  compiled: ManualChapter | undefined,
  title: string,
  subtitle: string,
  partKey: string,
  parentId: string | undefined,
  order: number,
  typeNo: number
): ManualChapter {
  return {
    ...(compiled || { exercises: [], resourceLinks: [] }),
    id: compiled?.id || `tt-ch-${typeNo}`,
    order,
    slug: `ch-${typeNo}`,
    title,
    estimatedMinutes: compiled?.estimatedMinutes || 25,
    subtitle,
    partKey,
    parentId,
    typeNo,
    overviewText: compiled?.overviewText,
    why: compiled?.why,
    when: compiled?.when,
    practical: compiled?.practical,
    tools: compiled?.tools,
    advantages: compiled?.advantages,
    limitations: compiled?.limitations,
    contentMarkdown: compiled?.contentMarkdown?.trim() || compiled?.overviewText || "",
    exercises: compiled?.exercises || [],
    resourceLinks: compiled?.resourceLinks || [],
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

/** Build reader chapters: outline TOC order + compiled MD bodies (by typeNo). */
export function readerChaptersFromOutline(pathwise: ManualChapter[]): ManualChapter[] {
  const byNo = indexByTypeNo(pathwise);
  const out: ManualChapter[] = [];
  for (const part of TESTING_TYPES_OUTLINE) {
    const subtitle = part.name;
    const partKey = partSlug(part.name);
    for (const item of part.items) {
      let parent: ManualChapter;
      if (item.no != null) {
        parent = chapterFromOutline(
          byNo.get(item.no),
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
        out.push(
          chapterFromOutline(
            byNo.get(child.no),
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

/** @deprecated use readerChaptersFromOutline */
export const readerChaptersFromOverlay = readerChaptersFromOutline;
