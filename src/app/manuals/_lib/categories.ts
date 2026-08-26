/* ============================================================================
 * HEADING: SHARED — Manual categories
 * Not a page. These pages all use this same file:
 *   /manuals  /manuals/[slug]  /library  /admin
 * localStorage. Changing this file changes all of those pages at once.
 * ========================================================================== */

import { mapUserManuals } from "./userManuals.ts";

export const UNCATEGORIZED = "Uncategorized";

export const DEFAULT_CATEGORIES = [
  "Foundations",
  "Automation & Testing",
  "Quality Craft",
  "Delivery & Process",
  "Design",
  "AI & Prompting",
  "Ops & Systems",
  "Career",
  "Soft Skills",
  UNCATEGORIZED,
];

const STORE = "hearth_manual_categories";
const EVENT = "hearth_manual_categories_updated";
const CUSTOM_PREFIX = "hearth_manual_custom_data_";

export function normalizeCategoryName(name: string) {
  return name.replace(/\s+/g, " ").trim();
}

export function withUncategorized(list: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const raw of [...list, UNCATEGORIZED]) {
    const n = normalizeCategoryName(raw);
    if (!n) continue;
    const key = n.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(n);
  }
  return out;
}

export function renameInList(list: string[], from: string, to: string): string[] {
  const next = normalizeCategoryName(to);
  if (!next) return withUncategorized(list);
  return withUncategorized(list.map((c) => (c === from ? next : c)));
}

export function removeFromList(list: string[], name: string): string[] {
  if (name === UNCATEGORIZED) return withUncategorized(list);
  return withUncategorized(list.filter((c) => c !== name));
}

function readList(): string[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORE);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : null;
  } catch {
    return null;
  }
}

function writeList(list: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORE, JSON.stringify(withUncategorized(list)));
  window.dispatchEvent(new Event(EVENT));
}

export function listedCategories(): string[] {
  return withUncategorized(readList() || DEFAULT_CATEGORIES);
}

export function addCategory(name: string): string | null {
  const n = normalizeCategoryName(name);
  if (!n) return null;
  const list = listedCategories();
  if (list.some((c) => c.toLowerCase() === n.toLowerCase())) return n;
  writeList([...list, n]);
  return n;
}

function retargetCustomData(from: string, to: string) {
  if (typeof window === "undefined") return;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith(CUSTOM_PREFIX)) continue;
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "null");
      if (!parsed || typeof parsed !== "object" || parsed.category !== from) continue;
      localStorage.setItem(key, JSON.stringify({ ...parsed, category: to }));
    } catch {
      /* skip bad rows */
    }
  }
}

function retargetUserManuals(from: string, to: string) {
  mapUserManuals((m) => (m.category === from ? { ...m, category: to } : m));
}

export function renameCategory(from: string, to: string): string | null {
  const next = normalizeCategoryName(to);
  if (!from || !next || from === UNCATEGORIZED) return null;
  writeList(renameInList(listedCategories(), from, next));
  retargetUserManuals(from, next);
  retargetCustomData(from, next);
  return next;
}

export function deleteCategory(name: string): boolean {
  if (!name || name === UNCATEGORIZED) return false;
  writeList(removeFromList(listedCategories(), name));
  retargetUserManuals(name, UNCATEGORIZED);
  retargetCustomData(name, UNCATEGORIZED);
  return true;
}

export function subscribeCategories(onChange: (items: string[]) => void) {
  if (typeof window === "undefined") return () => {};
  const emit = () => onChange(listedCategories());
  emit();
  window.addEventListener(EVENT, emit);
  window.addEventListener("storage", emit);
  return () => {
    window.removeEventListener(EVENT, emit);
    window.removeEventListener("storage", emit);
  };
}
