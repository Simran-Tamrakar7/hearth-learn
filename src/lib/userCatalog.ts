import { readScopedRaw, subscribeUserScope, writeScopedRaw } from "./userScope";

export function readUserList<T>(baseKey: string): T[] {
  try {
    const raw = readScopedRaw(baseKey);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function writeUserList<T>(baseKey: string, items: T[]) {
  writeScopedRaw(baseKey, JSON.stringify(items));
}

export function readHiddenIds(baseKey: string): Set<string> {
  try {
    const raw = readScopedRaw(baseKey);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

export function writeHiddenIds(baseKey: string, ids: Set<string>) {
  writeScopedRaw(baseKey, JSON.stringify([...ids]));
}

export function subscribeUserCatalog(onChange: () => void) {
  return subscribeUserScope(onChange);
}

export function slugifyId(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || "item";
}
