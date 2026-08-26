import { writeScopedRaw, readScopedRaw, isScopeReady } from "@/lib/userScope";

const RECENT_KEY = "hearth_recent_manuals";
const RESUME_KEY = "hearth_resume";

export type RecentManual = { slug: string; title: string; at: number };
export type ResumePoint = { chapterId?: string; chapterIndex?: number; scroll?: number };

function parseList(raw: string | null): RecentManual[] {
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((r) => r && typeof r.slug === "string") : [];
  } catch {
    return [];
  }
}

function parseResume(raw: string | null): Record<string, ResumePoint> {
  try {
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function pushPrefs(prefs: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  void fetch("/api/me/prefs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prefs }),
  }).catch(() => {});
}

export function getRecentManuals(): RecentManual[] {
  if (!isScopeReady()) return [];
  return parseList(readScopedRaw(RECENT_KEY)).sort((a, b) => b.at - a.at).slice(0, 8);
}

export function touchRecentManual(slug: string, title: string) {
  if (!isScopeReady() || !slug) return;
  const next = [{ slug, title, at: Date.now() }, ...getRecentManuals().filter((r) => r.slug !== slug)].slice(0, 8);
  writeScopedRaw(RECENT_KEY, JSON.stringify(next));
  pushPrefs({ recent: next });
}

export function getResumeMap(): Record<string, ResumePoint> {
  if (!isScopeReady()) return {};
  return parseResume(readScopedRaw(RESUME_KEY));
}

export function getResume(slug: string): ResumePoint | null {
  return getResumeMap()[slug] || null;
}

export function setResume(slug: string, point: ResumePoint) {
  if (!isScopeReady() || !slug) return;
  const next = { ...getResumeMap(), [slug]: point };
  writeScopedRaw(RESUME_KEY, JSON.stringify(next));
  pushPrefs({ resume: { [slug]: point } });
}

export function pushAccountProgress(slug: string, chapterIds: string[]) {
  pushPrefs({ progress: { [slug]: chapterIds } });
}

export function pushAccountPins(pins: unknown[]) {
  pushPrefs({ pins });
}
