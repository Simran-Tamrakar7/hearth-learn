/** Overlay catalog: user rows + hidden builtins + field patches. localStorage. */

export function slugId(raw: string) {
  const s = raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return s || "item";
}

export function mergeCatalog<T extends { id: string }>(
  user: T[],
  builtin: T[],
  hidden: Iterable<string>,
  overlays: Record<string, Partial<T>>
): T[] {
  const hide = hidden instanceof Set ? hidden : new Set(hidden);
  return [
    ...user,
    ...builtin.filter((b) => !hide.has(b.id)).map((b) => ({ ...b, ...(overlays[b.id] || {}) })),
  ];
}

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown, event: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(event));
}

export function subscribeEvent(event: string, onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(event, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(event, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function makeOverlayCatalog<T extends { id: string }>(keys: {
  list: string;
  hidden: string;
  overlay: string;
  event: string;
}) {
  const list = (): T[] => {
    const parsed = readJson<unknown>(keys.list, []);
    return Array.isArray(parsed) ? (parsed.filter((x) => x && typeof x === "object" && "id" in x) as T[]) : [];
  };
  const hidden = (): Set<string> => {
    const parsed = readJson<unknown>(keys.hidden, []);
    return new Set(Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : []);
  };
  const overlays = (): Record<string, Partial<T>> => {
    const parsed = readJson<unknown>(keys.overlay, {});
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, Partial<T>>)
      : {};
  };
  const emit = (which: string, value: unknown) => writeJson(which, value, keys.event);

  return {
    list,
    hidden,
    overlays,
    upsert(item: T) {
      const next = list().filter((x) => x.id !== item.id);
      next.unshift(item);
      emit(keys.list, next);
      return item;
    },
    remove(id: string) {
      emit(
        keys.list,
        list().filter((x) => x.id !== id)
      );
    },
    hide(id: string) {
      const set = hidden();
      set.add(id);
      emit(keys.hidden, [...set]);
    },
    overlay(id: string, patch: Partial<T>) {
      emit(keys.overlay, { ...overlays(), [id]: { ...overlays()[id], ...patch } });
    },
    merge(builtin: T[]) {
      return mergeCatalog(list(), builtin, hidden(), overlays());
    },
    subscribe(onChange: () => void) {
      const stop = subscribeEvent(keys.event, onChange);
      onChange();
      return stop;
    },
  };
}
