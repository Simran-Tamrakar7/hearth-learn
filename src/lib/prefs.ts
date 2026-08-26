export type UserPrefs = {
  theme?: string;
  accent?: string;
  fontSize?: "small" | "medium" | "large";
  lineHeight?: "tight" | "normal" | "loose";
  highlightColor?: string;
  highlightLegend?: Record<string, string>;
  recent?: { slug: string; title: string; at: number }[];
  resume?: Record<string, { chapterId?: string; chapterIndex?: number; scroll?: number }>;
  progress?: Record<string, string[]>;
  pins?: unknown[];
};

export type SiteFeatures = {
  watchDesk: boolean;
  library: boolean;
  lifeLab: boolean;
  notes: boolean;
  aiCoach: boolean;
  breakRoom: boolean;
  cookbook: boolean;
  onboarding: boolean;
  analytics: boolean;
  chapterStudio: boolean;
};

export const FEATURE_KEYS = [
  "watchDesk",
  "library",
  "lifeLab",
  "notes",
  "aiCoach",
  "breakRoom",
  "cookbook",
  "onboarding",
  "analytics",
  "chapterStudio",
] as const;

export type FeatureKey = (typeof FEATURE_KEYS)[number];

export const FEATURE_LABELS: Record<FeatureKey, string> = {
  watchDesk: "Watch desk",
  library: "Library",
  lifeLab: "Life Lab",
  notes: "Notes",
  aiCoach: "AI Coach",
  breakRoom: "Break Room",
  cookbook: "Cookbook",
  onboarding: "Onboarding",
  analytics: "Analytics",
  chapterStudio: "Chapter studio",
};

export const DEFAULT_SITE_FEATURES: SiteFeatures = {
  watchDesk: true,
  library: true,
  lifeLab: true,
  notes: true,
  aiCoach: true,
  breakRoom: true,
  cookbook: true,
  onboarding: true,
  analytics: true,
  chapterStudio: true,
};

export const DEFAULT_HIGHLIGHT_LEGEND: Record<string, string> = {
  yellow: "Key idea",
  green: "Do this",
  pink: "Question",
  blue: "Reference",
};

export function parsePrefs(raw: string | null | undefined): UserPrefs {
  try {
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function mergePrefs(base: UserPrefs, patch: UserPrefs): UserPrefs {
  return {
    ...base,
    ...patch,
    highlightLegend: { ...DEFAULT_HIGHLIGHT_LEGEND, ...base.highlightLegend, ...patch.highlightLegend },
    resume: { ...base.resume, ...patch.resume },
    progress: { ...base.progress, ...patch.progress },
    recent: patch.recent ?? base.recent,
    pins: patch.pins ?? base.pins,
  };
}

export function parseSiteFeatures(raw: string | null | undefined): SiteFeatures {
  const base = { ...DEFAULT_SITE_FEATURES };
  try {
    const parsed = raw ? JSON.parse(raw) : {};
    if (!parsed || typeof parsed !== "object") return base;
    for (const key of FEATURE_KEYS) {
      if (typeof parsed[key] === "boolean") base[key] = parsed[key];
    }
  } catch {
    /* keep defaults */
  }
  return base;
}
