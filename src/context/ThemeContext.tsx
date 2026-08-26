"use client";

/* ============================================================================
 * HEADING: SHARED — ThemeContext
 * Not a page. These pages all use this same file:
 *   EVERY page (via Providers). Settings UI: /settings. Navbar reads room toggles.
 * Map: ./CODE-FOR-THIS.md
 * Changing this file changes all of those pages at once.
 * ========================================================================== */

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import {
  DEFAULT_HIGHLIGHT_LEGEND,
  DEFAULT_SITE_FEATURES,
  parseSiteFeatures,
  type SiteFeatures,
} from "@/lib/prefs";

export type ThemeId =
  | "pathwise"
  | "dusk"
  | "parchment"
  | "slate"
  | "ocean"
  | "rose"
  | "matcha"
  | "ink"
  | "sand"
  | "berry"
  | "aurora"
  | "copper"
  | "fog"
  | "citrus"
  | "ember"
  | "glacier"
  | "moss"
  | "blush"
  | "midnight"
  | "violet"
  | "cyberpunk"
  | "nordic"
  | "espresso"
  | "lavender";

export type AccentId =
  | "forest"
  | "mint"
  | "clay"
  | "gold"
  | "sky"
  | "ocean"
  | "rose"
  | "copper"
  | "matcha"
  | "berry"
  | "ink"
  | "violet";

export type RoomFeatures = SiteFeatures;
export type FontSize = "small" | "medium" | "large";
export type LineHeight = "tight" | "normal" | "loose";

interface ThemeContextType {
  theme: ThemeId;
  accent: AccentId;
  fontSize: FontSize;
  lineHeight: LineHeight;
  highlightColor: string;
  highlightLegend: Record<string, string>;
  features: RoomFeatures;
  setTheme: (t: ThemeId) => void;
  setAccent: (a: AccentId) => void;
  setFontSize: (s: FontSize) => void;
  setLineHeight: (s: LineHeight) => void;
  setHighlightColor: (c: string) => void;
  setHighlightLegend: (legend: Record<string, string>) => void;
  toggleFeature: (key: keyof RoomFeatures) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const THEME_CONFIGS: Record<
  ThemeId,
  { bg: string; text: string; primary: string; accent: string }
> = {
  pathwise: { bg: "#FBF8F3", text: "#1C2A26", primary: "#1C2A26", accent: "#D97706" },
  dusk: { bg: "#141C1A", text: "#E2E8F0", primary: "#2A3633", accent: "#34D399" },
  parchment: { bg: "#F6ECD8", text: "#451A03", primary: "#78350F", accent: "#D97706" },
  slate: { bg: "#E6ECEC", text: "#0F172A", primary: "#1E293B", accent: "#0EA5E9" },
  ocean: { bg: "#E0F2FE", text: "#0C4A6E", primary: "#0369A1", accent: "#38BDF8" },
  rose: { bg: "#FFF1F2", text: "#881337", primary: "#9F1239", accent: "#F43F5E" },
  matcha: { bg: "#F7FEE7", text: "#1E293B", primary: "#3F6212", accent: "#84CC16" },
  ink: { bg: "#0F172A", text: "#F8FAFC", primary: "#1E293B", accent: "#38BDF8" },
  sand: { bg: "#FEF3C7", text: "#78350F", primary: "#92400E", accent: "#F59E0B" },
  berry: { bg: "#FFF1F2", text: "#881337", primary: "#881337", accent: "#E11D48" },
  aurora: { bg: "#ECFDF5", text: "#064E3B", primary: "#065F46", accent: "#34D399" },
  copper: { bg: "#FFF7ED", text: "#7C2D12", primary: "#7C2D12", accent: "#F97316" },
  fog: { bg: "#F1F5F9", text: "#1E293B", primary: "#475569", accent: "#64748B" },
  citrus: { bg: "#FEFCE8", text: "#713F12", primary: "#854D0E", accent: "#EAB308" },
  ember: { bg: "#1C1917", text: "#FAFAF9", primary: "#292524", accent: "#F97316" },
  glacier: { bg: "#ECFEFF", text: "#164E63", primary: "#155E75", accent: "#06B6D4" },
  moss: { bg: "#F0FDF4", text: "#14532D", primary: "#166534", accent: "#22C55E" },
  blush: { bg: "#FFF7ED", text: "#7C2D12", primary: "#9A3412", accent: "#FB923C" },
  midnight: { bg: "#0F172A", text: "#EEF2FF", primary: "#1E1B4B", accent: "#6366F1" },
  violet: { bg: "#FAF5FF", text: "#581C87", primary: "#6B21A8", accent: "#A855F7" },
  cyberpunk: { bg: "#09090B", text: "#F43F5E", primary: "#18181B", accent: "#06B6D4" },
  nordic: { bg: "#F8FAFC", text: "#0F172A", primary: "#334155", accent: "#38BDF8" },
  espresso: { bg: "#1C1412", text: "#FEF3C7", primary: "#2A1D1A", accent: "#D97706" },
  lavender: { bg: "#F3E8FF", text: "#3B0764", primary: "#581C87", accent: "#C084FC" },
};

const LINE_HEIGHT: Record<LineHeight, string> = { tight: "1.45", normal: "1.7", loose: "1.95" };

function applySkin(theme: ThemeId, fontSize: FontSize, lineHeight: LineHeight) {
  const config = THEME_CONFIGS[theme];
  if (config) {
    document.body.style.backgroundColor = config.bg;
    document.body.style.color = config.text;
  }
  document.documentElement.style.setProperty("--hearth-lh", LINE_HEIGHT[lineHeight]);
  document.documentElement.style.fontSize = fontSize === "small" ? "15px" : fontSize === "large" ? "18px" : "16px";
}

function persistAccount(prefs: Record<string, unknown>) {
  void fetch("/api/me/prefs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prefs }),
  }).catch(() => {});
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [theme, setThemeState] = useState<ThemeId>("pathwise");
  const [accent, setAccentState] = useState<AccentId>("gold");
  const [fontSize, setFontSizeState] = useState<FontSize>("medium");
  const [lineHeight, setLineHeightState] = useState<LineHeight>("normal");
  const [highlightColor, setHighlightColorState] = useState("yellow");
  const [highlightLegend, setHighlightLegendState] = useState<Record<string, string>>(DEFAULT_HIGHLIGHT_LEGEND);
  const [features, setFeaturesState] = useState<RoomFeatures>(DEFAULT_SITE_FEATURES);
  const ready = useRef(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("hearth_theme") as ThemeId;
    const savedAccent = localStorage.getItem("hearth_accent") as AccentId;
    const savedFontSize = localStorage.getItem("hearth_fontSize") as FontSize;
    const savedLh = localStorage.getItem("hearth_lineHeight") as LineHeight;
    const savedColor = localStorage.getItem("hearth_highlightColor");
    const savedLegend = localStorage.getItem("hearth_highlightLegend");
    if (savedTheme && THEME_CONFIGS[savedTheme]) setThemeState(savedTheme);
    if (savedAccent) setAccentState(savedAccent);
    if (savedFontSize) setFontSizeState(savedFontSize);
    if (savedLh) setLineHeightState(savedLh);
    if (savedColor) setHighlightColorState(savedColor);
    if (savedLegend) {
      try {
        setHighlightLegendState({ ...DEFAULT_HIGHLIGHT_LEGEND, ...JSON.parse(savedLegend) });
      } catch {
        /* keep default */
      }
    }
    applySkin(savedTheme && THEME_CONFIGS[savedTheme] ? savedTheme : "pathwise", savedFontSize || "medium", savedLh || "normal");
    ready.current = true;

    void fetch("/api/me/prefs", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.features) setFeaturesState(parseSiteFeatures(JSON.stringify(data.features)));
        const prefs = data.prefs || {};
        if (prefs.theme && THEME_CONFIGS[prefs.theme as ThemeId]) {
          setThemeState(prefs.theme);
          localStorage.setItem("hearth_theme", prefs.theme);
        }
        if (prefs.accent) {
          setAccentState(prefs.accent);
          localStorage.setItem("hearth_accent", prefs.accent);
        }
        if (prefs.fontSize) {
          setFontSizeState(prefs.fontSize);
          localStorage.setItem("hearth_fontSize", prefs.fontSize);
        }
        if (prefs.lineHeight) {
          setLineHeightState(prefs.lineHeight);
          localStorage.setItem("hearth_lineHeight", prefs.lineHeight);
        }
        if (prefs.highlightColor) {
          setHighlightColorState(prefs.highlightColor);
          localStorage.setItem("hearth_highlightColor", prefs.highlightColor);
        }
        if (prefs.highlightLegend) {
          const legend = { ...DEFAULT_HIGHLIGHT_LEGEND, ...prefs.highlightLegend };
          setHighlightLegendState(legend);
          localStorage.setItem("hearth_highlightLegend", JSON.stringify(legend));
        }
        applySkin(
          (prefs.theme && THEME_CONFIGS[prefs.theme as ThemeId] ? prefs.theme : savedTheme) || "pathwise",
          prefs.fontSize || savedFontSize || "medium",
          prefs.lineHeight || savedLh || "normal"
        );
      })
      .catch(() => {});
  }, [status]);

  const setTheme = (t: ThemeId) => {
    setThemeState(t);
    localStorage.setItem("hearth_theme", t);
    applySkin(t, fontSize, lineHeight);
    persistAccount({ theme: t });
  };

  const setAccent = (a: AccentId) => {
    setAccentState(a);
    localStorage.setItem("hearth_accent", a);
    persistAccount({ accent: a });
  };

  const setFontSize = (s: FontSize) => {
    setFontSizeState(s);
    localStorage.setItem("hearth_fontSize", s);
    applySkin(theme, s, lineHeight);
    persistAccount({ fontSize: s });
  };

  const setLineHeight = (s: LineHeight) => {
    setLineHeightState(s);
    localStorage.setItem("hearth_lineHeight", s);
    applySkin(theme, fontSize, s);
    persistAccount({ lineHeight: s });
  };

  const setHighlightColor = (c: string) => {
    setHighlightColorState(c);
    localStorage.setItem("hearth_highlightColor", c);
    persistAccount({ highlightColor: c });
  };

  const setHighlightLegend = (legend: Record<string, string>) => {
    setHighlightLegendState(legend);
    localStorage.setItem("hearth_highlightLegend", JSON.stringify(legend));
    persistAccount({ highlightLegend: legend });
  };

  const toggleFeature = (_key: keyof RoomFeatures) => {
    /* ponytail: room flags are Admin global via /api/admin/features, not per-device */
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        accent,
        fontSize,
        lineHeight,
        highlightColor,
        highlightLegend,
        features,
        setTheme,
        setAccent,
        setFontSize,
        setLineHeight,
        setHighlightColor,
        setHighlightLegend,
        toggleFeature,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
