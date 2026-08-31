import type { ManualChapter } from "@/app/manuals/_lib/manualsData";
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
