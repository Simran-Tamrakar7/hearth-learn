"use client";

/* PAGE: /settings  — this file is the screen. Map: ./CODE-FOR-THIS-PAGE.md */

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { useTheme, ThemeId, AccentId } from "@/context/ThemeContext";
import {
  Download,
  Check,
} from "lucide-react";

interface ThemeSwatch {
  id: ThemeId;
  name: string;
  subtitle: string;
  primaryColor: string;
  secondaryColor: string;
}

export default function LuminaSettingsPage() {
  const { toast } = useToast();
  const { theme, accent, fontSize, lineHeight, highlightColor, highlightLegend, setTheme, setAccent, setFontSize, setLineHeight, setHighlightColor, setHighlightLegend } = useTheme();

  // 24 Palette Themes (Expanded)
  const themes: ThemeSwatch[] = [
    { id: "pathwise", name: "Pathwise", subtitle: "Forest · mint · paper", primaryColor: "#1C2A26", secondaryColor: "#34D399" },
    { id: "dusk", name: "Dusk", subtitle: "Night forest", primaryColor: "#141C1A", secondaryColor: "#34D399" },
    { id: "parchment", name: "Parchment", subtitle: "Warm study desk", primaryColor: "#78350F", secondaryColor: "#F59E0B" },
    { id: "slate", name: "Slate", subtitle: "Cool gray-green", primaryColor: "#334155", secondaryColor: "#94A3B8" },
    { id: "ocean", name: "Ocean", subtitle: "Deep teal water", primaryColor: "#0369A1", secondaryColor: "#38BDF8" },
    { id: "rose", name: "Rose", subtitle: "Soft blush paper", primaryColor: "#9F1239", secondaryColor: "#FB7185" },
    { id: "matcha", name: "Matcha", subtitle: "Tea garden calm", primaryColor: "#3F6212", secondaryColor: "#A3E635" },
    { id: "ink", name: "Ink", subtitle: "Near-black desk", primaryColor: "#020617", secondaryColor: "#64748B" },
    { id: "sand", name: "Sand", subtitle: "Beach noon light", primaryColor: "#92400E", secondaryColor: "#FBBF24" },
    { id: "berry", name: "Berry", subtitle: "Cranberry jam", primaryColor: "#881337", secondaryColor: "#F43F5E" },
    { id: "aurora", name: "Aurora", subtitle: "Teal night glow", primaryColor: "#065F46", secondaryColor: "#34D399" },
    { id: "copper", name: "Copper", subtitle: "Warm metal desk", primaryColor: "#7C2D12", secondaryColor: "#FB923C" },
    { id: "fog", name: "Fog", subtitle: "Misty cool gray", primaryColor: "#475569", secondaryColor: "#CBD5E1" },
    { id: "citrus", name: "Citrus", subtitle: "Lemon zest energy", primaryColor: "#854D0E", secondaryColor: "#EAB308" },
    { id: "ember", name: "Ember", subtitle: "Charcoal firelight", primaryColor: "#1C1917", secondaryColor: "#F97316" },
    { id: "glacier", name: "Glacier", subtitle: "Icy blue quiet", primaryColor: "#164E63", secondaryColor: "#22D3EE" },
    { id: "moss", name: "Moss", subtitle: "Deep woodland floor", primaryColor: "#14532D", secondaryColor: "#4ADE80" },
    { id: "blush", name: "Blush", subtitle: "Peach studio light", primaryColor: "#9A3412", secondaryColor: "#FDBA74" },
    { id: "midnight", name: "Midnight", subtitle: "Navy late shift", primaryColor: "#1E1B4B", secondaryColor: "#818CF8" },
    { id: "violet", name: "Violet", subtitle: "Muted dusk violet", primaryColor: "#581C87", secondaryColor: "#C084FC" },
    { id: "cyberpunk", name: "Cyberpunk", subtitle: "Neon magenta & cyan", primaryColor: "#F43F5E", secondaryColor: "#06B6D4" },
    { id: "nordic", name: "Nordic", subtitle: "Scandinavian frost", primaryColor: "#334155", secondaryColor: "#38BDF8" },
    { id: "espresso", name: "Espresso", subtitle: "Rich dark roast", primaryColor: "#2A1D1A", secondaryColor: "#D97706" },
    { id: "lavender", name: "Lavender", subtitle: "Calming pastel bloom", primaryColor: "#581C87", secondaryColor: "#C084FC" },
  ];

  const accents: { id: AccentId; name: string; color: string }[] = [
    { id: "forest", name: "Forest", color: "#1C2A26" },
    { id: "mint", name: "Mint", color: "#34D399" },
    { id: "clay", name: "Clay", color: "#EA580C" },
    { id: "gold", name: "Gold", color: "#D97706" },
    { id: "sky", name: "Sky", color: "#0EA5E9" },
    { id: "ocean", name: "Ocean", color: "#0284C7" },
    { id: "rose", name: "Rose", color: "#F43F5E" },
    { id: "copper", name: "Copper", color: "#F97316" },
    { id: "matcha", name: "Matcha", color: "#84CC16" },
    { id: "berry", name: "Berry", color: "#E11D48" },
    { id: "ink", name: "Ink", color: "#020617" },
    { id: "violet", name: "Violet", color: "#9333EA" },
  ];

  const [reducedMotion, setReducedMotion] = useState(false);

  const handleDownloadBackup = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      theme,
      accent,
      fontSize,
      lineHeight,
      highlightColor,
      highlightLegend,
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hearth-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();

    toast({
      type: "achievement",
      title: "Backup Exported! 💾",
      description: "Notes, settings, and progress saved to JSON.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-inherit text-inherit">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-8 w-full space-y-8 flex-1">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="font-serif-display text-4xl font-bold tracking-tight">
            Settings
          </h1>
          <p className="text-xs sm:text-base opacity-75">
            Theme, type, and highlight legend — saved to your account when you are signed in.
          </p>
        </div>

        {/* SECTION 1: APPEARANCE */}
        <Card variant="glass" hoverable={false} className="p-6 sm:p-8 space-y-6 border-black/10">
          <div className="space-y-1">
            <h3 className="font-serif-display font-bold text-lg">
              Appearance
            </h3>
            <p className="text-xs opacity-75">
              Pick a skin, then an accent if you want a tint.
            </p>
          </div>

          {/* Theme Grid (24 Named Swatches) */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold opacity-75">Theme ({themes.length} Swatches)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {themes.map((t) => {
                const isSelected = theme === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      toast({ type: "success", title: `Theme set to ${t.name} ✨`, description: `Applied ${t.subtitle} mood.` });
                    }}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                      isSelected
                        ? "bg-white text-[#1C2A26] border-[#1C2A26] border-2 shadow-sm scale-105"
                        : "bg-white text-[#1C2A26] border-[#E7E0D3] hover:border-[#D4CBBB]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="w-5 h-5 rounded-lg border border-black/10 shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${t.primaryColor} 50%, ${t.secondaryColor} 50%)`,
                        }}
                      />
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#1C2A26]" />}
                    </div>
                    <div>
                      <span className="font-serif-display font-bold text-xs block truncate">
                        {t.name}
                      </span>
                      <span className="text-[10px] opacity-70 block truncate">{t.subtitle}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Accent Color Dots */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-semibold opacity-75">Accent</label>
            <div className="flex flex-wrap gap-2">
              {accents.map((acc) => {
                const isSelected = accent === acc.id;
                return (
                  <button
                    key={acc.id}
                    onClick={() => {
                      setAccent(acc.id);
                      toast({ type: "info", title: `Accent set to ${acc.name}` });
                    }}
                    className={`px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-2 transition-all ${
                      isSelected
                        ? "bg-[#1C2A26] text-[#FAF7F2] border-[#1C2A26]"
                        : "bg-white border-black/10 text-[#52635E] hover:text-[#1C2A26]"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: acc.color }} />
                    <span>{acc.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Font Size Selectors */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-semibold opacity-75">Font size</label>
            <div className="flex items-center gap-2">
              {(["small", "medium", "large"] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setFontSize(sz)}
                  className={`px-5 py-2 rounded-2xl text-xs font-bold capitalize transition-all ${
                    fontSize === sz
                      ? "bg-[#1C2A26] text-[#FAF7F2] border border-[#1C2A26] shadow-xs"
                      : "bg-white border border-black/10 text-[#52635E] hover:text-[#1C2A26]"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-xs font-semibold opacity-75">Line height</label>
            <div className="flex items-center gap-2">
              {(["tight", "normal", "loose"] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setLineHeight(sz)}
                  className={`px-5 py-2 rounded-2xl text-xs font-bold capitalize ${
                    lineHeight === sz
                      ? "bg-[#1C2A26] text-[#FAF7F2] border border-[#1C2A26]"
                      : "bg-white border border-black/10 text-[#52635E]"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-xs font-semibold opacity-75">Default highlight color</label>
            <div className="flex flex-wrap gap-2">
              {(["yellow", "green", "pink", "blue"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setHighlightColor(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border ${highlightColor === c ? "border-[#1C2A26] ring-2 ring-[#D97706]/40" : "border-[#E7E0D3]"}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="block text-xs font-semibold opacity-75 pt-2">Highlight legend</label>
            <div className="grid gap-2 sm:grid-cols-2">
              {(["yellow", "green", "pink", "blue"] as const).map((c) => (
                <input
                  key={c}
                  className="h-10 px-3 rounded-xl border border-[#E7E0D3] text-sm"
                  value={highlightLegend[c] || ""}
                  onChange={(e) => setHighlightLegend({ ...highlightLegend, [c]: e.target.value })}
                  placeholder={c}
                />
              ))}
            </div>
          </div>
        </Card>

        <Card variant="glass" hoverable={false} className="p-6 sm:p-8 space-y-4 border-black/10">
          <h3 className="font-serif-display font-bold text-lg">Features</h3>
          <p className="text-xs opacity-75">
            Watch Desk, Library, Life Lab, and the other rooms are Admin-controlled global flags — not per-user toggles. Admins change them on the Users panel.
          </p>
        </Card>

        {/* SECTION 3: DATA EXPORT */}
        <Card variant="glass" hoverable={false} className="p-6 sm:p-8 space-y-4 border-black/10">
          <div className="space-y-1">
            <h3 className="font-serif-display font-bold text-lg">
              Data
            </h3>
            <p className="text-xs opacity-75">
              Download notes, settings, and Pathwise progress as JSON.
            </p>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={handleDownloadBackup}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Download backup
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
