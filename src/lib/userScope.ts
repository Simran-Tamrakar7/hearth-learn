const SCOPE_EVENT = "hearth_user_scope";
const PINS_EVENT = "hearth_pins_updated";

let current: string | null = null;

export function setAppUserId(id: string | null | undefined) {
  const next = id || "anon";
  if (current === next) return;
  current = next;
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(SCOPE_EVENT));
  window.dispatchEvent(new Event(PINS_EVENT));
}

export function isScopeReady() {
  return current !== null;
}

export function appUserId() {
  return current || "anon";
}

export function scopedKey(base: string) {
  return `${base}::${appUserId()}`;
}

function migratedFlag(base: string) {
  return `${base}::__migrated`;
}

export function readScopedRaw(base: string): string | null {
  if (typeof window === "undefined" || !isScopeReady()) return null;
  const mine = localStorage.getItem(scopedKey(base));
  if (mine != null) return mine;
  const flag = localStorage.getItem(migratedFlag(base));
  const legacy = localStorage.getItem(base);
  if (legacy != null && !flag) {
    localStorage.setItem(scopedKey(base), legacy);
    localStorage.setItem(migratedFlag(base), appUserId());
    return legacy;
  }
  return null;
}

export function writeScopedRaw(base: string, value: string) {
  if (typeof window === "undefined" || !isScopeReady()) return;
  localStorage.setItem(scopedKey(base), value);
}

export function removeScopedRaw(base: string) {
  if (typeof window === "undefined" || !isScopeReady()) return;
  localStorage.removeItem(scopedKey(base));
}

export function subscribeUserScope(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(SCOPE_EVENT, onChange);
  return () => window.removeEventListener(SCOPE_EVENT, onChange);
}

export function pinsStoreKey() {
  return "hearth_pinned_items_v2";
}

export function librarySavedStoreKey() {
  return "hearth_library_saved";
}

export function progressStoreKey(manualId: string) {
  return `hearth_manual_progress_${manualId}`;
}

export function highlightsStoreKey(manualId: string) {
  return `hearth_manual_highlights_${manualId}`;
}
