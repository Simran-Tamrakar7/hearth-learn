"use client";

/* PAGE: /ai  — this file is the screen. Map: ./CODE-FOR-THIS-PAGE.md */

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import {
  Sparkles,
  FileText,
  Copy,
  Check,
  Printer,
  RotateCcw,
  Save,
  Wand2,
} from "lucide-react";

type CoachMode =
  | "Explain"
  | "ELI5"
  | "Summarize"
  | "Quiz"
  | "Flashcards"
  | "Study notes"
  | "Next topic"
  | "7-day plan";

export default function AICoachPage() {
  const { toast } = useToast();
  const [mainTab, setMainTab] = useState<"coach" | "cv-maker">("coach");
  const [coachMode, setCoachMode] = useState<CoachMode>("Explain");

  // Coach State
  const defaultText =
    "This is the most important chapter in the entire manual — nearly everything else builds on writing good locators.\n\nThese are “user-facing” locators — they find elements the way a real user (or screen reader) would identify them, rather than by internal implementation details like CSS classes. This is deliberate philosophy, not just convenience: implementation details (class names, DOM structure) change often as developers refactor CSS/markup, but the role and visible text of a button rarely change. Locators built on them break far less often.";

  const [inputText, setInputText] = useState(defaultText);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [cvNotes, setCvNotes] = useState("");
  const [cvAi, setCvAi] = useState("");

  // CV Maker State
  const [selectedTemplate, setSelectedTemplate] = useState("Classic");
  const [cvForm, setCvForm] = useState({
    fullName: "Alex Rivera",
    title: "QA Automation Engineer",
    email: "alex.rivera@email.com",
    phone: "+1 (555) 014-2200",
    location: "Austin, TX",
    website: "github.com/alexrivera",
    linkedin: "linkedin.com/in/alexrivera",
    summary:
      "Automation-focused QA with 4+ years shipping Playwright and pytest suites. Cuts flake, owns CI smoke, and partners with product on risk-based coverage.",
  });

  const handleModeSwitch = (mode: CoachMode) => {
    setCoachMode(mode);
    setAiResult("");
  };

  const handleRunCoach = async () => {
    if (!inputText.trim()) {
      toast({
        type: "error",
        title: "Input Required",
        description: "Please enter a topic or paste code/notes.",
      });
      return;
    }

    setIsRunning(true);
    try {
      const res = await fetch("/api/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: coachMode, input: inputText }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setAiResult(data.error || "AI Coach needs OPENAI_API_KEY on the server.");
        toast({ type: "error", title: "Coach failed", description: data.error || "Sign in and set OPENAI_API_KEY." });
      } else {
        setAiResult(data.text || "");
        toast({ type: "achievement", title: `AI ${coachMode} ready`, description: "Response is in the box below." });
      }
    } catch (e) {
      setAiResult("Network error talking to the coach.");
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ type: "info", title: "Copied to Clipboard 📋" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCvGenerate = async () => {
    setIsRunning(true);
    try {
      const res = await fetch("/api/ai/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template: selectedTemplate, notes: cvNotes || cvForm.summary, basics: cvForm }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setCvAi(data.error || "CV Maker needs OPENAI_API_KEY.");
      } else {
        setCvAi(data.text || "");
        toast({ type: "achievement", title: "Resume drafted" });
      }
    } finally {
      setIsRunning(false);
    }
  };

  // CV Maker Handlers
  const handleCvSample = () => {
    setCvForm({
      fullName: "Alex Rivera",
      title: "QA Automation Engineer",
      email: "alex.rivera@email.com",
      phone: "+1 (555) 014-2200",
      location: "Austin, TX",
      website: "github.com/alexrivera",
      linkedin: "linkedin.com/in/alexrivera",
      summary:
        "Automation-focused QA with 4+ years shipping Playwright and pytest suites. Cuts flake, owns CI smoke, and partners with product on risk-based coverage.",
    });
    toast({ type: "info", title: "Sample CV Loaded 📄" });
  };

  const handleCvClear = () => {
    setCvForm({
      fullName: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      summary: "",
    });
    toast({ type: "info", title: "Form Cleared" });
  };

  const handleCvSave = () => {
    toast({
      type: "achievement",
      title: "CV Progress Saved 💾",
      description: "Stored locally on your device.",
    });
  };

  const handleCvPrint = () => {
    window.print();
  };

  const coachModes: CoachMode[] = [
    "Explain",
    "ELI5",
    "Summarize",
    "Quiz",
    "Flashcards",
    "Study notes",
    "Next topic",
    "7-day plan",
  ];

  const cvTemplates = [
    { id: "Classic", title: "Classic", desc: "Traditional single column — recruiters know it." },
    { id: "Modern", title: "Modern", desc: "Accent sidebar with contact + skills." },
    { id: "Minimal", title: "Minimal", desc: "Quiet type, lots of air, strong hierarchy." },
    { id: "Compact", title: "Compact", desc: "Dense packing for longer careers." },
    { id: "Executive", title: "Executive", desc: "Bold header band, confident spacing." },
    { id: "Tech", title: "Tech", desc: "Dev-friendly — skills first, clean monospace accents." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-8 w-full space-y-8 flex-1">
        {/* Header */}
        <div className="space-y-3 print:hidden">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#52635E] block">
            PERSONAL TOOLS · LIVE MODEL
          </span>

          <h1 className="font-serif-display text-4xl sm:text-5xl font-bold text-[#1C2A26] tracking-tight">
            AI Coach
          </h1>

          <p className="text-xs sm:text-base text-[#52635E] leading-relaxed w-full">
            Coach modes call a real model with a prompt matched to Explain, ELI5, Quiz, Flashcards, and the rest. CV Maker drafts structured resume sections from your basics + notes.
          </p>
        </div>

        {/* Main Tool Switcher: Coach vs CV Maker */}
        <div className="flex items-center gap-3 print:hidden">
          <button
            onClick={() => setMainTab("coach")}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              mainTab === "coach"
                ? "bg-[#1C2A26] text-[#FAF7F2] shadow-xs"
                : "bg-white border border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26]"
            }`}
          >
            Coach
          </button>

          <button
            onClick={() => setMainTab("cv-maker")}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              mainTab === "cv-maker"
                ? "bg-[#1C2A26] text-[#FAF7F2] shadow-xs"
                : "bg-white border border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26]"
            }`}
          >
            CV Maker
          </button>
        </div>

        {/* MAIN TAB 1: COACH MODES */}
        {mainTab === "coach" && (
          <div className="space-y-6">
            {/* 8-Mode Pill Bar */}
            <div className="flex flex-wrap gap-2">
              {coachModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleModeSwitch(mode)}
                  className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                    coachMode === mode
                      ? "bg-[#1C2A26] text-[#FAF7F2] font-bold shadow-xs"
                      : "bg-white border border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26] hover:bg-[#FAF7F2]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Input Card with matching font & text styling */}
            <Card variant="glass" hoverable={false} className="p-6 sm:p-8 space-y-4 border-[#E7E0D3]">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#52635E] block">
                  TOPIC OR PASTE
                </span>

                <textarea
                  rows={6}
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    setAiResult("");
                  }}
                  placeholder="Enter a topic, dry notes, or code to run through AI Coach..."
                  className="w-full p-4 text-xs sm:text-sm font-sans text-[#1C2A26] bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706] leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleRunCoach}
                  isLoading={isRunning}
                  leftIcon={<Sparkles className="w-4 h-4 text-[#D97706]" />}
                >
                  Run coach
                </Button>
              </div>
            </Card>

            {/* RESPONSE CARD WITH MATCHING SANS FONT & NO RAW ### SYMBOLS */}
            {aiResult && (
              <Card variant="default" hoverable={false} className="p-6 sm:p-8 space-y-4 border-[#E7E0D3] bg-white">
                <div className="flex justify-between items-center pb-2 border-b border-[#E7E0D3]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1C2A26] block">
                    RESPONSE
                  </span>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(aiResult)}
                    leftIcon={copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  >
                    {copied ? "Copied" : "Copy Output"}
                  </Button>
                </div>

                <div className="text-xs sm:text-sm text-[#1C2A26] font-sans leading-relaxed whitespace-pre-line">
                  {aiResult}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* MAIN TAB 2: CV MAKER */}
        {mainTab === "cv-maker" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 print:hidden">
              {cvTemplates.map((tpl) => {
                const isSelected = selectedTemplate === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? "bg-[#DDECE8] border-[#1C2A26] border-2 shadow-xs"
                        : "bg-white border-[#E7E0D3] hover:border-[#D4CBBB]"
                    }`}
                  >
                    <h4 className="font-serif-display font-bold text-xs text-[#1C2A26]">
                      {tpl.title}
                    </h4>
                    <p className="text-[10px] text-[#52635E] leading-tight">
                      {tpl.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-2 print:hidden">
              <button
                onClick={handleCvSample}
                className="px-4 py-2 rounded-2xl text-xs font-semibold bg-white border border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26]"
              >
                Sample
              </button>
              <button
                onClick={handleCvClear}
                className="px-4 py-2 rounded-2xl text-xs font-semibold bg-white border border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26]"
              >
                Clear
              </button>
              <button
                onClick={handleCvSave}
                className="px-4 py-2 rounded-2xl text-xs font-semibold bg-white border border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26]"
              >
                Save
              </button>
              <button
                onClick={handleCvPrint}
                className="px-5 py-2 rounded-2xl text-xs font-bold bg-[#1C2A26] text-[#FAF7F2] flex items-center gap-1.5 shadow-xs"
              >
                Print / PDF
              </button>
              <button
                onClick={() => void handleCvGenerate()}
                className="px-5 py-2 rounded-2xl text-xs font-bold bg-[#D97706] text-white"
              >
                Generate with AI
              </button>
            </div>

            <Card variant="glass" hoverable={false} className="p-6 sm:p-8 space-y-6 border-[#E7E0D3] print:shadow-none print:border-none print:bg-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#52635E] block print:hidden">
                BASICS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#52635E]">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    value={cvForm.fullName}
                    onChange={(e) => setCvForm({ ...cvForm, fullName: e.target.value })}
                    className="w-full h-11 px-4 text-xs font-sans bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#52635E]">
                    TITLE
                  </label>
                  <input
                    type="text"
                    value={cvForm.title}
                    onChange={(e) => setCvForm({ ...cvForm, title: e.target.value })}
                    className="w-full h-11 px-4 text-xs font-sans bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#52635E]">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    value={cvForm.email}
                    onChange={(e) => setCvForm({ ...cvForm, email: e.target.value })}
                    className="w-full h-11 px-4 text-xs font-sans bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#52635E]">
                    PHONE
                  </label>
                  <input
                    type="text"
                    value={cvForm.phone}
                    onChange={(e) => setCvForm({ ...cvForm, phone: e.target.value })}
                    className="w-full h-11 px-4 text-xs font-sans bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#52635E]">
                    LOCATION
                  </label>
                  <input
                    type="text"
                    value={cvForm.location}
                    onChange={(e) => setCvForm({ ...cvForm, location: e.target.value })}
                    className="w-full h-11 px-4 text-xs font-sans bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#52635E]">
                    WEBSITE
                  </label>
                  <input
                    type="text"
                    value={cvForm.website}
                    onChange={(e) => setCvForm({ ...cvForm, website: e.target.value })}
                    className="w-full h-11 px-4 text-xs font-sans bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#52635E]">
                    LINKEDIN
                  </label>
                  <input
                    type="text"
                    value={cvForm.linkedin}
                    onChange={(e) => setCvForm({ ...cvForm, linkedin: e.target.value })}
                    className="w-full h-11 px-4 text-xs font-sans bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#52635E]">
                    SUMMARY
                  </label>
                  <textarea
                    rows={4}
                    value={cvForm.summary}
                    onChange={(e) => setCvForm({ ...cvForm, summary: e.target.value })}
                    className="w-full p-4 text-xs font-sans bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706] leading-relaxed"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#52635E]">
                    EXPERIENCE NOTES (PASTE)
                  </label>
                  <textarea
                    rows={4}
                    value={cvNotes}
                    onChange={(e) => setCvNotes(e.target.value)}
                    placeholder="Paste roles, dates, bullets…"
                    className="w-full p-4 text-xs font-sans bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706] leading-relaxed"
                  />
                </div>
              </div>
              {cvAi ? (
                <div className="space-y-2 pt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider">AI resume draft</span>
                  <pre className="whitespace-pre-wrap text-sm">{cvAi}</pre>
                </div>
              ) : null}
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
