import type { ManualChapter } from "@/lib/manualsData";
import { TESTING_TYPES_CHAPTERS, type TestingChapterData } from "@/app/manuals/_ui/TestingTypesInteractiveManual";
import { TESTING_TYPES_OUTLINE } from "@/lib/testing-types-outline";

export { TESTING_TYPES_OUTLINE } from "@/lib/testing-types-outline";

function overlayByNo(n: number): TestingChapterData | undefined {
  return TESTING_TYPES_CHAPTERS.find((t) => Number(t.no) === n);
}

function partSlug(name: string): string {
  return `tt-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function findPathwise(pathwise: ManualChapter[], tt: TestingChapterData): ManualChapter | undefined {
  return pathwise.find((p) => p.title === tt.title);
}

function chapterFromOverlay(
  tt: TestingChapterData,
  pathwise: ManualChapter[],
  title: string,
  subtitle: string,
  partKey: string,
  parentId: string | undefined,
  order: number
): ManualChapter {
  const pw = findPathwise(pathwise, tt);
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
    tools: tt.tools ?? pw?.tools,
    contentMarkdown: pw?.contentMarkdown || tt.desc,
    exercises: pw?.exercises || [],
    resourceLinks: pw?.resourceLinks || [],
  };
}

function folderChapter(
  id: string,
  title: string,
  subtitle: string,
  partKey: string,
  order: number
): ManualChapter {
  const overview =
    "Quality attributes beside functional correctness: usability, accessibility, compliance, SEO / site health, and security.";
  return {
    id,
    order,
    slug: "quality-attributes",
    title,
    estimatedMinutes: 5,
    subtitle,
    partKey,
    overviewText: overview,
    contentMarkdown: overview,
    exercises: [],
    resourceLinks: [],
  };
}

/** Overlay body for a TOC row — by `ch-{no}` slug, then title. */
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

/** TOC + body follow the 15-chapter outline, not pathwise order or a shorter localStorage snapshot. */
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
        parent = folderChapter("tt-folder-quality-attributes", item.title, subtitle, partKey, out.length + 1);
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
