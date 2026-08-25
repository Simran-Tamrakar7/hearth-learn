"use client";

/* SHARED: theme/room toggles. UI to edit: PAGE /settings. Map: ./CODE-FOR-THIS.md */

import React, { createContext, useContext, useState, useEffect } from "react";

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

export interface RoomFeatures {
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
}

interface ThemeContextType {
  theme: ThemeId;
  accent: AccentId;
  fontSize: "small" | "medium" | "large";
  features: RoomFeatures;
  setTheme: (t: ThemeId) => void;
  setAccent: (a: AccentId) => void;
  setFontSize: (s: "small" | "medium" | "large") => void;
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

const defaultFeatures: RoomFeatures = {
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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("pathwise");
  const [accent, setAccentState] = useState<AccentId>("gold");
  const [fontSize, setFontSizeState] = useState<"small" | "medium" | "large">("medium");
  const [features, setFeaturesState] = useState<RoomFeatures>(defaultFeatures);

  useEffect(() => {
    const savedTheme = localStorage.getItem("hearth_theme") as ThemeId;
    const savedAccent = localStorage.getItem("hearth_accent") as AccentId;
    const savedFontSize = localStorage.getItem("hearth_fontSize") as any;
    const savedFeatures = localStorage.getItem("hearth_features");

    if (savedTheme && THEME_CONFIGS[savedTheme]) {
      setThemeState(savedTheme);
      document.body.style.backgroundColor = THEME_CONFIGS[savedTheme].bg;
      document.body.style.color = THEME_CONFIGS[savedTheme].text;
    }
    if (savedAccent) {
      setAccentState(savedAccent);
    }
    if (savedFontSize) {
      setFontSizeState(savedFontSize);
    }
    if (savedFeatures) {
      try {
        setFeaturesState(JSON.parse(savedFeatures));
      } catch (e) {}
    }
  }, []);

  const setTheme = (t: ThemeId) => {
    setThemeState(t);
    localStorage.setItem("hearth_theme", t);
    const config = THEME_CONFIGS[t];
    if (config) {
      document.body.style.backgroundColor = config.bg;
      document.body.style.color = config.text;
    }
  };

  const setAccent = (a: AccentId) => {
    setAccentState(a);
    localStorage.setItem("hearth_accent", a);
  };

  const setFontSize = (s: "small" | "medium" | "large") => {
    setFontSizeState(s);
    localStorage.setItem("hearth_fontSize", s);
  };

  const toggleFeature = (key: keyof RoomFeatures) => {
    setFeaturesState((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem("hearth_features", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ThemeContext.Provider
      value={{ theme, accent, fontSize, features, setTheme, setAccent, setFontSize, toggleFeature }}
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
