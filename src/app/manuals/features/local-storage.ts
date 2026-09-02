/* ============================================================================
 * HEADING: SHARED — User/AI manuals storage
 * Not a page. These pages all use this same file:
 *   /manuals  /manuals/[slug]
 * localStorage. Not a page.
 * Changing this file changes all of those pages at once.
 * ========================================================================== */

import { KEPT_BUILTIN_SLUGS } from "@/app/manuals/registry";
import type { ManualChapter, ManualItem } from "@/app/manuals/types";
import { pinsStoreKey, progressStoreKey, readScopedRaw, removeScopedRaw, writeScopedRaw } from "../../../lib/userScope.ts";

const STORE = "hearth_user_manuals_v1";
const HIDDEN = "hearth_hidden_manual_slugs";
const EVENT = "hearth_user_manuals_updated";

const COVERS = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
];

export function slugifyTitle(title: string): string {
  const s = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return s || "manual";
}

function hoursLabel(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  return `${Math.round((minutes / 60) * 10) / 10} hours`;
}

function splitBlocks(text: string): { heading: string; level: number; body: string }[] {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: { heading: string; level: number; body: string }[] = [];
  let heading = "";
  let level = 0;
  let body: string[] = [];
  const flush = () => {
    const b = body.join("\n").trim();
    if (!heading && !b) return;
    blocks.push({ heading: heading || "Untitled", level: level || 2, body: b });
    heading = "";
    level = 0;
    body = [];
  };
  for (const line of lines) {
    const m = /^(#{1,3})\s+(.+)$/.exec(line.trim());
    const part = /^Part\s+\d+\s*[·•:\-–—]\s*(.+)$/i.exec(line.trim());
    const numbered = /^\[?(\d+)\.(\d+)\]?\s+(.+)$/.exec(line.trim());
    if (m) {
      flush();
      level = m[1].length;
      heading = m[2].trim();
    } else if (part) {
      flush();
      level = 1;
      heading = part[1].trim();
    } else if (numbered) {
      flush();
      level = 2;
      heading = numbered[3].trim();
    } else {
      body.push(line);
    }
  }
  flush();
  return blocks;
}

function chapterFrom(title: string, subtitle: string, body: string, order: number, parentId?: string): ManualChapter {
  const paras = body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const overview = paras[0] || body.slice(0, 400) || `Notes on ${title}.`;
  const why = paras[1] || `Why it matters: ${title} is part of this manual so the notes stay usable as a lesson.`;
  const when = paras[2] || "Use this chapter when you need the details captured in the source notes.";
  const rest = paras.slice(3).join("\n\n");
  const md = [`# ${title}`, overview, rest ? `## Notes\n\n${rest}` : "", `## Why it matters\n\n${why}`, `## When to use it\n\n${when}`]
    .filter(Boolean)
    .join("\n\n");
  const minutes = Math.max(8, Math.min(40, Math.round(body.split(/\s+/).length / 40) || 15));
  return {
    id: `ai-ch-${order}-${slugifyTitle(title)}`,
    order,
    slug: `ch-${order}`,
    title,
    subtitle,
    estimatedMinutes: minutes,
    overviewText: overview,
    why,
    when,
    contentMarkdown: md,
    summaryMarkdown: overview.slice(0, 280),
    aiSummary: overview.slice(0, 280),
    customSummary: "",
    exercises: [],
    resourceLinks: [],
    ...(parentId ? { parentId } : {}),
  };
}

function isPartHeading(heading: string) {
  return /^Part\s+\d+\b/i.test(heading.trim());
}

function partLabel(heading: string) {
  const m = /^Part\s+\d+\s*[·•:\-–—]\s*(.+)$/i.exec(heading.trim());
  return (m?.[1] || heading.replace(/^Part\s+\d+\s*/, "") || heading).trim();
}

/** If the paste has no headings, split paragraphs into Part 1 chapters. */
export function ensureManualHeadings(raw: string, forcedTitle?: string): string {
  const text = raw.trim();
  if (/^#{1,3}\s+/m.test(text) || /^Part\s+\d+/im.test(text)) {
    if (forcedTitle && !/^#\s+/m.test(text)) return `# ${forcedTitle}\n\n${text}`;
    return text;
  }
  const paras = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const title =
    forcedTitle ||
    paras[0]?.split(/[.!?\n]/)[0].slice(0, 80).trim() ||
    "Untitled manual";
  const bodyParas = !forcedTitle && paras[0] && paras[0].length < 100 && paras.length > 1 ? paras.slice(1) : paras;
  if (bodyParas.length === 0) return `# ${title}\n\n${text}`;
  const chapters = bodyParas.map((p) => {
    const h = p.split(/[.!?\n]/)[0].slice(0, 70).trim() || "Notes";
    return `## ${h}\n\n${p}`;
  });
  return [`# ${title}`, `Part 1 · Notes`, ...chapters].join("\n\n");
}

/** Turn pasted notes into a Hearth manual (parts + chapters, same shape as catalog entries). */
export function notesToManual(raw: string, forcedTitle?: string): ManualItem {
  if (!raw.trim()) {
    throw new Error("Paste some notes first.");
  }
  const text = ensureManualHeadings(raw.trim(), forcedTitle);

  const blocks = splitBlocks(text);
  const first = blocks[0];
  const titleFromH1 = first && first.level === 1 ? first.heading : "";
  const title = (forcedTitle || titleFromH1 || first?.heading || "Untitled manual").replace(/^#+\s*/, "");
  const start = titleFromH1 ? 1 : 0;

  const chapters: ManualChapter[] = [];
  let partName = "Part 1 · Notes";
  let order = 1;

  const rest = blocks.slice(start);
  if (rest.length === 0) {
    chapters.push(chapterFrom(title, partName, text, 1));
  } else {
    for (const b of rest) {
      if (b.level === 1 || isPartHeading(b.heading)) {
        partName = partLabel(b.heading);
        if (b.body.trim()) {
          const body = b.body.trim();
          const isSummaryOnly = !body.includes("\n") && body.length < 200;
          if (!isSummaryOnly) {
            const chapTitle = isPartHeading(b.heading) ? partName : b.heading;
            chapters.push(chapterFrom(chapTitle, partName, b.body, order++));
          }
        }
      } else if (b.level >= 3 && chapters.length > 0) {
        const last = chapters[chapters.length - 1];
        const parentId = last.parentId || last.id;
        chapters.push(chapterFrom(b.heading, partName, b.body || b.heading, order++, parentId));
      } else {
        chapters.push(chapterFrom(b.heading, partName, b.body || b.heading, order++));
      }
    }
  }

  if (chapters.length === 0) {
    chapters.push(chapterFrom(title, partName, text, 1));
  }

  const minutes = chapters.reduce((n, c) => n + c.estimatedMinutes, 0);
  const slugBase = `ai-${slugifyTitle(title)}`;
  const cover = COVERS[Math.abs(title.length) % COVERS.length];
  return {
    id: `manual-${slugBase}`,
    slug: slugBase,
    title,
    category: "AI & Prompting",
    description: chapters[0]?.overviewText?.slice(0, 220) || `AI-generated manual from notes: ${title}`,
    chapterCount: chapters.length,
    estimatedTime: hoursLabel(minutes),
    icon: "Sparkles",
    coverImage: cover,
    chapters,
  };
}

export function getUserManuals(): ManualItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORE);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getUserManual(slug: string): ManualItem | undefined {
  return getUserManuals().find((m) => m.slug === slug || m.id === slug || m.id === `manual-${slug}`);
}

export function emptyManual(title: string, opts?: { category?: string; tags?: string[]; coverImage?: string }): ManualItem {
  const t = title.trim() || "Untitled manual";
  const slug = `user-${slugifyTitle(t)}`;
  const chapter: ManualChapter = {
    id: `ch-${slug}`,
    order: 1,
    slug: "ch-1",
    title: "Untitled chapter",
    subtitle: "Part 1 · Getting started",
    partKey: "part-0",
    estimatedMinutes: 15,
    contentMarkdown: "",
    customSummary: "",
    aiSummary: "",
    overviewText: "",
    why: "",
    when: "",
    exercises: [],
    resourceLinks: [],
  };
  return {
    id: `manual-${slug}`,
    slug,
    title: t,
    category: opts?.category?.trim() || "Foundations",
    tags: (opts?.tags || []).map((x) => x.trim()).filter(Boolean),
    description: "",
    chapterCount: 1,
    estimatedTime: "15 min",
    icon: "BookOpen",
    coverImage: opts?.coverImage?.trim() || COVERS[Math.abs(t.length) % COVERS.length],
    chapters: [chapter],
  };
}

const CUSTOM_PREFIX = "hearth_manual_custom_data_";

/** Overlay category/tags/title from the reader’s custom-data blob onto a catalog row. */
export function applyManualOverlay(manual: ManualItem): ManualItem {
  if (typeof window === "undefined") return { ...manual, tags: manual.tags || [] };
  try {
    const raw = localStorage.getItem(`${CUSTOM_PREFIX}${manual.id}`);
    if (!raw) return { ...manual, tags: manual.tags || [] };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return { ...manual, tags: manual.tags || [] };
    return {
      ...manual,
      title: typeof parsed.title === "string" && parsed.title ? parsed.title : manual.title,
      description: typeof parsed.description === "string" ? parsed.description : manual.description,
      category: typeof parsed.category === "string" && parsed.category ? parsed.category : manual.category,
      tags: Array.isArray(parsed.tags)
        ? parsed.tags.filter((t: unknown) => typeof t === "string" && t.trim()).map((t: string) => t.trim())
        : manual.tags || [],
      coverImage:
        typeof parsed.coverImage === "string" && parsed.coverImage.trim()
          ? parsed.coverImage.trim()
          : manual.coverImage,
    };
  } catch {
    return { ...manual, tags: manual.tags || [] };
  }
}

export function mergeHiddenSlug(ids: string[], slug: string): string[] {
  const s = slug.trim();
  if (!s || ids.includes(s)) return ids;
  return [...ids, s];
}

export function hiddenManualSlugs(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(HIDDEN);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : []);
  } catch {
    return new Set();
  }
}

function unpinSlug(slug: string) {
  try {
    const raw = readScopedRaw(pinsStoreKey());
    if (!raw) return;
    const pins = JSON.parse(raw);
    if (!Array.isArray(pins)) return;
    const ids = new Set([`man-${slug}`]);
    if (slug === "git-version-control") ids.add("man-git");
    const next = pins.filter(
      (p: { id?: string; url?: string }) =>
        !ids.has(String(p.id || "")) && !String(p.url || "").includes(`/manuals/${slug}`)
    );
    writeScopedRaw(pinsStoreKey(), JSON.stringify(next));
    window.dispatchEvent(new Event("hearth_pins_updated"));
  } catch {
    /* pin cleanup is best-effort */
  }
}

/** Remove user manuals + orphaned local data for deleted builtin slugs. Call once on /manuals mount. */
export function purgeRemovedManualCatalog() {
  if (typeof window === "undefined") return;
  const keptIds = KEPT_BUILTIN_SLUGS.map((s) => `manual-${s}`);
  localStorage.setItem(STORE, JSON.stringify([]));
  const hidden = [...hiddenManualSlugs()].filter((s) => KEPT_BUILTIN_SLUGS.includes(s as (typeof KEPT_BUILTIN_SLUGS)[number]));
  localStorage.setItem(HIDDEN, JSON.stringify(hidden));
  try {
    const raw = readScopedRaw(pinsStoreKey());
    if (raw) {
      const pins = JSON.parse(raw);
      if (Array.isArray(pins)) {
        const next = pins.filter((p: { url?: string }) =>
          KEPT_BUILTIN_SLUGS.some((s) => String(p.url || "").includes(`/manuals/${s}`))
        );
        writeScopedRaw(pinsStoreKey(), JSON.stringify(next));
        window.dispatchEvent(new Event("hearth_pins_updated"));
      }
    }
  } catch {
    /* best-effort */
  }
  const removeKeys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k?.startsWith("hearth_manual_")) continue;
    if (keptIds.some((id) => k.includes(id))) continue;
    removeKeys.push(k);
  }
  for (const k of removeKeys) {
    if (k.includes("::")) removeScopedRaw(k.split("::")[0]!);
    else localStorage.removeItem(k);
  }
  window.dispatchEvent(new Event(EVENT));
}

export function hideManual(slug: string): boolean {
  if (typeof window === "undefined") return false;
  const next = mergeHiddenSlug([...hiddenManualSlugs()], slug);
  localStorage.setItem(HIDDEN, JSON.stringify(next));
  unpinSlug(slug);
  window.dispatchEvent(new Event(EVENT));
  return true;
}

/** User manuals are deleted. Builtin manuals are hidden from this browser’s catalog. */
export function removeCatalogManual(slug: string): "deleted" | "hidden" | false {
  if (getUserManual(slug)) return deleteUserManual(slug) ? "deleted" : false;
  return hideManual(slug) ? "hidden" : false;
}

export function deleteUserManual(slug: string): boolean {
  if (typeof window === "undefined") return false;
  const found = getUserManual(slug);
  if (!found) return false;
  const remaining = getUserManuals().filter((m) => m.slug !== found.slug);
  localStorage.setItem(STORE, JSON.stringify(remaining));
  try {
    localStorage.removeItem(`hearth_manual_custom_data_${found.id}`);
    removeScopedRaw(progressStoreKey(found.id));
    unpinSlug(found.slug);
  } catch {
    /* pin cleanup is best-effort */
  }
  window.dispatchEvent(new Event(EVENT));
  return true;
}

export function mapUserManuals(fn: (m: ManualItem) => ManualItem) {
  if (typeof window === "undefined") return;
  const next = getUserManuals().map(fn);
  localStorage.setItem(STORE, JSON.stringify(next));
  window.dispatchEvent(new Event(EVENT));
}

export function saveUserManual(manual: ManualItem): ManualItem {
  const all = getUserManuals().filter((m) => m.slug !== manual.slug);
  let slug = manual.slug;
  if (all.some((m) => m.slug === slug)) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
  const next = { ...manual, slug, id: `manual-${slug}`, chapterCount: manual.chapters.length };
  all.unshift(next);
  localStorage.setItem(STORE, JSON.stringify(all));
  window.dispatchEvent(new Event(EVENT));
  return next;
}

export function subscribeUserManuals(onChange: (items: ManualItem[]) => void) {
  if (typeof window === "undefined") return () => {};
  const emit = () => onChange(getUserManuals());
  emit();
  window.addEventListener(EVENT, emit);
  window.addEventListener("storage", emit);
  return () => {
    window.removeEventListener(EVENT, emit);
    window.removeEventListener("storage", emit);
  };
}
