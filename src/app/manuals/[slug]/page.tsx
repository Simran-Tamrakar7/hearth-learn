"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { MANUALS_DATA, findHearthManual, ManualItem, ManualChapter } from "@/lib/manualsData";
import { PLAYWRIGHT_ROADMAP_PHASES, downloadRoadmapSVG } from "@/lib/roadmapData";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  BookOpen,
  ExternalLink,
  Code,
  Sparkles,
  Check,
  RotateCcw,
  Compass,
  HelpCircle,
  ChevronDown,
  Layers,
  Edit,
  SquarePen,
  Trash2,
  Plus,
  X,
  Save,
  FileText,
  Zap,
  Download,
  MapPin,
  CheckSquare,
  Search,
  Target,
  Award,
  Info,
} from "lucide-react";

export default function ManualDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const slug = params?.slug as string;
  const initialManual = findHearthManual(slug) || MANUALS_DATA[0];

  // State for editable manual details
  const [manualTitle, setManualTitle] = useState<string>(initialManual.title);
  const [manualDescription, setManualDescription] = useState<string>(initialManual.description);
  const [manualCategory, setManualCategory] = useState<string>(initialManual.category);
  const [manualEstimatedTime, setManualEstimatedTime] = useState<string>(initialManual.estimatedTime);

  // State for editable chapters list
  const [chapters, setChapters] = useState<ManualChapter[]>(initialManual.chapters);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [completedChapterIds, setCompletedChapterIds] = useState<string[]>([]);

  const isPlaywright = slug === "playwright" || slug === "playwright-test-automation";
  const [expandedPhases, setExpandedPhases] = useState<string[]>(() => {
    const seen = new Set<string>();
    const ids: string[] = [];
    for (const ch of initialManual.chapters) {
      const id = ch.subtitle || "Main";
      if (seen.has(id)) continue;
      seen.add(id);
      if (ids.length < 5) ids.push(id);
    }
    if (slug === "playwright" || slug === "playwright-test-automation") {
      ids.push("p0", "p1", "p2", "p3", "p4");
    }
    return ids;
  });
  const [roadmapSearch, setRoadmapSearch] = useState<string>("");
  const [tocQuery, setTocQuery] = useState<string>("");
  const [levelFilter, setLevelFilter] = useState<"All" | "Beginner" | "Mid" | "Advanced">("All");
  const [selectedRoadmapNode, setSelectedRoadmapNode] = useState<any | null>(null);

  // View Mode State: 'full' (exhaustive content) vs 'summary' (AI quick summary)
  const [viewMode, setViewMode] = useState<"full" | "summary">("full");

  // Modals State
  const [isEditManualModalOpen, setIsEditManualModalOpen] = useState<boolean>(false);
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState<boolean>(false);
  const [isChapterModalOpen, setIsChapterModalOpen] = useState<boolean>(false);
  const [chapterModalMode, setChapterModalMode] = useState<"add" | "edit">("add");

  // Form State for Chapter Modal
  const [formChapterTitle, setFormChapterTitle] = useState<string>("");
  const [formChapterSubtitle, setFormChapterSubtitle] = useState<string>("");
  const [formChapterMinutes, setFormChapterMinutes] = useState<number>(15);
  const [formChapterContent, setFormChapterContent] = useState<string>("");
  const [formChapterCode, setFormChapterCode] = useState<string>("");
  const [formChapterRank, setFormChapterRank] = useState<number>(1);

  // Load saved progress & custom manual edits from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(`hearth_manual_progress_${initialManual.id}`);
    if (savedProgress) {
      try {
        setCompletedChapterIds(JSON.parse(savedProgress));
      } catch (e) {}
    }

    const savedCustomData = localStorage.getItem(`hearth_manual_custom_data_${initialManual.id}`);
    if (savedCustomData) {
      try {
        const parsed = JSON.parse(savedCustomData);
        if (parsed.title) setManualTitle(parsed.title);
        if (parsed.description) setManualDescription(parsed.description);
        if (parsed.category) setManualCategory(parsed.category);
        if (parsed.estimatedTime) setManualEstimatedTime(parsed.estimatedTime);
        if (parsed.chapters && Array.isArray(parsed.chapters)) setChapters(parsed.chapters);
      } catch (e) {}
    }
  }, [initialManual.id]);

  // Persist edits to localStorage
  const saveCustomDataToStorage = (updatedData: any) => {
    localStorage.setItem(
      `hearth_manual_custom_data_${initialManual.id}`,
      JSON.stringify(updatedData)
    );
  };

  const activeChapter: ManualChapter = chapters[activeChapterIndex] || chapters[0] || {
    id: "empty",
    order: 1,
    slug: "empty",
    title: "No Chapter Selected",
    estimatedMinutes: 0,
    contentMarkdown: "No content available. Click 'Add Chapter' to create one.",
    exercises: [],
    resourceLinks: [],
  };

  const totalChapters = chapters.length;
  const completedCount = completedChapterIds.filter((id) => chapters.some((c) => c.id === id)).length;
  const progressPercent = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;
  const roadmapParts = React.useMemo(() => {
    const map = new Map<
      string,
      {
        id: string;
        phaseNum: string;
        title: string;
        nodes: { num: string; title: string; chapterIndex: number; time: string; description?: string; level?: string }[];
      }
    >();
    chapters.forEach((ch, idx) => {
      const title = ch.subtitle || "Main";
      if (!map.has(title)) {
        map.set(title, { id: title, phaseNum: `P${map.size}`, title, nodes: [] });
      }
      map.get(title)!.nodes.push({
        num: String(idx + 1),
        title: ch.title,
        chapterIndex: idx,
        time: `${ch.estimatedMinutes} min`,
        level: "All",
      });
    });
    return [...map.values()].map((p, i) => ({ ...p, phaseNum: `P${i}` }));
  }, [chapters]);
  const phasesForRoadmap = isPlaywright ? PLAYWRIGHT_ROADMAP_PHASES : roadmapParts;
  const partCount = phasesForRoadmap.length;
  const tocQueryNorm = tocQuery.trim().toLowerCase();
  const filteredParts = React.useMemo(() => {
    if (!tocQueryNorm) return roadmapParts;
    return roadmapParts
      .map((part) => {
        const partHit = part.title.toLowerCase().includes(tocQueryNorm);
        const nodes = partHit
          ? part.nodes
          : part.nodes.filter((n) => {
              const chap = chapters[n.chapterIndex];
              const title = (chap?.title || n.title).toLowerCase();
              return title.includes(tocQueryNorm) || String(n.num).includes(tocQueryNorm);
            });
        return { ...part, nodes };
      })
      .filter((p) => p.nodes.length > 0);
  }, [roadmapParts, chapters, tocQueryNorm]);

  const toggleMarkComplete = (chapterId: string) => {
    const exists = completedChapterIds.includes(chapterId);
    let updated: string[];

    if (exists) {
      updated = completedChapterIds.filter((id) => id !== chapterId);
      toast({ type: "info", title: "Chapter Reset", description: "Marked as uncompleted." });
    } else {
      updated = [...completedChapterIds, chapterId];
      toast({
        type: "achievement",
        title: "Chapter Complete! 🎉",
        description: `Logged progress for ${activeChapter.title}.`,
      });
    }

    setCompletedChapterIds(updated);
    localStorage.setItem(`hearth_manual_progress_${initialManual.id}`, JSON.stringify(updated));
  };

  // Handle Manual Details Edit
  const handleSaveManualEdits = () => {
    const updated = {
      title: manualTitle,
      description: manualDescription,
      category: manualCategory,
      estimatedTime: manualEstimatedTime,
      chapters,
    };
    saveCustomDataToStorage(updated);
    setIsEditManualModalOpen(false);
    toast({ type: "success", title: "Manual Updated", description: "Saved header metadata." });
  };

  // Open Chapter Modal for Adding
  const openAddChapterModal = () => {
    setChapterModalMode("add");
    setFormChapterTitle(`Chapter ${chapters.length + 1}: New Chapter`);
    setFormChapterSubtitle("Chapter Overview");
    setFormChapterMinutes(15);
    setFormChapterContent("# New Chapter Title\n\nWrite your lesson content here...");
    setFormChapterCode("# Example code snippet\nprint('Hello Playwright!')");
    setFormChapterRank(chapters.length + 1);
    setIsChapterModalOpen(true);
  };

  // Open Chapter Modal for Editing
  const openEditChapterModal = () => {
    setChapterModalMode("edit");
    setFormChapterTitle(activeChapter.title);
    setFormChapterSubtitle(activeChapter.subtitle || "");
    setFormChapterMinutes(activeChapter.estimatedMinutes || 15);
    setFormChapterContent(activeChapter.contentMarkdown || "");
    setFormChapterCode(activeChapter.codeSnippet || "");
    setFormChapterRank(activeChapterIndex + 1);
    setIsChapterModalOpen(true);
  };

  // Save Chapter (Add or Edit)
  const handleSaveChapter = () => {
    let updatedChapters: ManualChapter[];
    const placeAt = (list: ManualChapter[], from: number, rank: number) => {
      const to = Math.max(0, Math.min(list.length - 1, Math.round(rank) - 1));
      if (from === to) return { list, to };
      const next = [...list];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return { list: next.map((c, i) => ({ ...c, order: i + 1 })), to };
    };

    if (chapterModalMode === "add") {
      const newChap: ManualChapter = {
        id: `custom-ch-${Date.now()}`,
        order: chapters.length + 1,
        slug: `ch-${chapters.length + 1}`,
        title: formChapterTitle,
        subtitle: formChapterSubtitle,
        estimatedMinutes: formChapterMinutes,
        contentMarkdown: formChapterContent,
        codeSnippet: formChapterCode,
        exercises: [],
        resourceLinks: [],
      };
      const inserted = [...chapters, newChap];
      const placed = placeAt(inserted, inserted.length - 1, formChapterRank);
      updatedChapters = placed.list;
      setActiveChapterIndex(placed.to);
      toast({ type: "success", title: "Chapter Created", description: `Added ${newChap.title}.` });
    } else {
      updatedChapters = chapters.map((chap, idx) => {
        if (idx === activeChapterIndex) {
          return {
            ...chap,
            title: formChapterTitle,
            subtitle: formChapterSubtitle,
            estimatedMinutes: formChapterMinutes,
            contentMarkdown: formChapterContent,
            codeSnippet: formChapterCode,
          };
        }
        return chap;
      });
      const placed = placeAt(updatedChapters, activeChapterIndex, formChapterRank);
      updatedChapters = placed.list;
      setActiveChapterIndex(placed.to);
      toast({ type: "success", title: "Chapter Updated", description: "Saved chapter changes." });
    }

    setChapters(updatedChapters);
    saveCustomDataToStorage({
      title: manualTitle,
      description: manualDescription,
      category: manualCategory,
      estimatedTime: manualEstimatedTime,
      chapters: updatedChapters,
    });
    setIsChapterModalOpen(false);
  };

  // Handle Delete Chapter
  const handleDeleteChapter = (idxToDelete: number) => {
    if (chapters.length <= 1) {
      toast({ type: "error", title: "Cannot Delete", description: "Manual must have at least one chapter." });
      return;
    }

    const chapToDelete = chapters[idxToDelete];
    const updated = chapters.filter((_, idx) => idx !== idxToDelete);

    setChapters(updated);
    if (activeChapterIndex >= updated.length) {
      setActiveChapterIndex(updated.length - 1);
    }

    saveCustomDataToStorage({
      title: manualTitle,
      description: manualDescription,
      category: manualCategory,
      estimatedTime: manualEstimatedTime,
      chapters: updated,
    });
    toast({ type: "info", title: "Chapter Deleted", description: `Removed ${chapToDelete.title}.` });
  };

  // Inline formatting helper for **bold** and `code` without raw Markdown tokens
  const parseInlineFormatting = (text: string) => {
    if (!text) return "";
    let clean = text.replace(/^#+\s*/, "").replace(/^[-*]\s+/, "");

    const boldParts = clean.split(/(\*\*.*?\*\*)/g);

    return boldParts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const inner = part.slice(2, -2);
        return (
          <strong key={idx} className="font-bold text-[#1C2A26]">
            {inner}
          </strong>
        );
      }

      const codeParts = part.split(/(`.*?`)/g);
      return codeParts.map((cPart, cIdx) => {
        if (cPart.startsWith("`") && cPart.endsWith("`")) {
          const cInner = cPart.slice(1, -1);
          return (
            <code
              key={cIdx}
              className="px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#D97706] border border-[#E7E0D3] font-mono text-[11px]"
            >
              {cInner}
            </code>
          );
        }
        return cPart;
      });
    });
  };

  // Renders Markdown with clean spacing, margins, line-heights and zero raw symbols
  const renderFormattedMarkdown = (text: string) => {
    if (!text) return null;

    const codeBlockRegex = /```([\s\S]*?)```/g;
    const parts = text.split(codeBlockRegex);

    return parts.map((part, pIdx) => {
      if (pIdx % 2 === 1) {
        return (
          <div key={pIdx} className="my-6 p-5 sm:p-6 bg-[#1C2A26] text-[#A7F3D0] rounded-2xl font-mono text-xs sm:text-[13px] overflow-x-auto leading-relaxed border border-[#2D3F3A] shadow-md">
            <pre>{part.trim()}</pre>
          </div>
        );
      }

      const lines = part.split("\n");
      return (
        <div key={pIdx} className="space-y-4 my-4 font-sans">
          {lines.map((line, lIdx) => {
            const trimmed = line.trim();
            if (!trimmed) return <div key={lIdx} className="h-2" />;

            if (trimmed.startsWith("# ")) {
              return (
                <h1
                  key={lIdx}
                  className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C2A26] pt-8 pb-3 border-b-2 border-[#E7E0D3] mt-6 flex items-center gap-3"
                >
                  <span className="w-1.5 h-6 bg-[#D97706] rounded-full inline-block shrink-0" />
                  {parseInlineFormatting(trimmed.replace("# ", ""))}
                </h1>
              );
            }

            if (trimmed.startsWith("## ")) {
              return (
                <h2
                  key={lIdx}
                  className="font-serif-display text-[clamp(1.2rem,2.4vw,1.45rem)] font-bold text-[#1C2A26] pt-6 pb-2 mt-5 flex items-center gap-2.5"
                >
                  <span className="w-1.5 h-5 bg-[#1C2A26] rounded-full inline-block shrink-0" />
                  {parseInlineFormatting(trimmed.replace("## ", ""))}
                </h2>
              );
            }

            if (trimmed.startsWith("### ")) {
              return (
                <h3
                  key={lIdx}
                  className="font-serif-display text-[1.15rem] font-bold text-[#1C2A26] pt-5 pb-1.5 mt-3.5 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#D97706] inline-block shrink-0" />
                  {parseInlineFormatting(trimmed.replace("### ", ""))}
                </h3>
              );
            }

            if (trimmed.startsWith("#### ")) {
              return (
                <h4
                  key={lIdx}
                  className="font-sans text-[0.95rem] font-bold text-[#2A3B35] pt-4 pb-1 tracking-wide uppercase"
                >
                  {parseInlineFormatting(trimmed.replace("#### ", ""))}
                </h4>
              );
            }

            if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
              return (
                <li key={lIdx} className="ml-6 list-disc text-[1.05rem] leading-[1.72] text-[#1C2A26] pl-1">
                  {parseInlineFormatting(trimmed.replace(/^[-*]\s+/, ""))}
                </li>
              );
            }

            if (/^\d+\.\s+/.test(trimmed)) {
              return (
                <div key={lIdx} className="ml-5 text-[1.05rem] leading-[1.72] text-[#1C2A26] font-semibold flex items-start gap-2.5 my-1">
                  <span className="text-[#D97706] font-mono shrink-0">{trimmed.match(/^\d+\./)?.[0]}</span>
                  <span>{parseInlineFormatting(trimmed.replace(/^\d+\.\s+/, ""))}</span>
                </div>
              );
            }

            return (
              <p key={lIdx} className="text-[1.05rem] leading-[1.72] text-[#1C2A26]">
                {parseInlineFormatting(trimmed)}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full space-y-8 flex-1">
        {/* MANUAL HEADER CARD — TIGHT & PROPORTIONED WITHOUT GAP TRUNCATION */}
        <div className="bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EFE6] border border-[#E7E0D3] rounded-3xl p-6 sm:p-8 shadow-sm">
          {/* Top Bar Navigation */}
          <div className="flex justify-between items-center mb-4">
            <Link href="/manuals">
              <Button variant="outline" size="sm" leftIcon={<ChevronLeft className="w-4 h-4" />}>
                Back to Manuals
              </Button>
            </Link>

            <Badge variant="amber">{manualCategory}</Badge>
          </div>

          {/* Title & Description Block */}
          <div className="space-y-2.5 mb-5 w-full">
            <h1 className="font-serif-display text-2xl sm:text-4xl lg:text-4xl font-bold text-[#1C2A26] leading-tight">
              {manualTitle}
            </h1>
            <p className="text-xs sm:text-base text-[#52635E] leading-relaxed w-full">
              {manualDescription}
            </p>
          </div>

          {/* Metadata Footer Row */}
          <div className="border-t border-[#E7E0D3] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsRoadmapModalOpen(true)}
                className="flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full bg-[#1C2A26] text-white hover:bg-[#243530] transition-all shadow-xs"
              >
                <Compass className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>Learning Roadmap</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#52635E] bg-white px-3.5 py-1.5 rounded-xl border border-[#E7E0D3] shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>{partCount} Parts</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#52635E] bg-white px-3.5 py-1.5 rounded-xl border border-[#E7E0D3] shadow-2xs">
                <BookOpen className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>{totalChapters} Chapters</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#52635E] bg-white px-3.5 py-1.5 rounded-xl border border-[#E7E0D3] shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>{manualEstimatedTime} Total</span>
              </div>

              <button
                type="button"
                onClick={() => setIsEditManualModalOpen(true)}
                className="flex items-center gap-2 text-xs font-semibold text-[#52635E] bg-white px-3.5 py-1.5 rounded-xl border border-[#E7E0D3] hover:text-[#1C2A26] hover:border-[#D4CBBB] transition-all shadow-2xs"
              >
                <SquarePen className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>Edit Manual</span>
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-64">
              <div className="flex-1">
                <div className="flex justify-between text-[11px] font-bold text-[#52635E] mb-1">
                  <span>Course Progress</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="h-2 w-full bg-[#E7E0D3] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D97706] to-amber-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-COLUMN LAYOUT: TOC SIDEBAR + CHAPTER CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: ROADMAP + CHAPTERS */}
          <div className="lg:col-span-4 space-y-4 sticky top-24 max-h-[82vh] overflow-y-auto pr-1 scrollbar-thin">
            <Card variant="default" hoverable={false} className="p-5 border-[#E7E0D3] bg-[#EEF2F0] space-y-4 shadow-2xs rounded-3xl">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#D8E2DD]">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsRoadmapModalOpen(true)}
                    className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full bg-[#1C2A26] text-white hover:bg-[#243530] transition-all"
                  >
                    <Compass className="w-3 h-3 text-[#D97706] shrink-0" />
                    <span>Roadmap</span>
                  </button>
                  <span className="text-[11px] font-semibold text-[#52635E] bg-white px-2.5 py-1 rounded-lg border border-[#E7E0D3]">
                    {totalChapters} Chapters
                  </span>
                  <span className="text-[11px] font-semibold text-[#52635E] bg-white px-2.5 py-1 rounded-lg border border-[#E7E0D3]">
                    {partCount} Parts
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={openAddChapterModal}
                  leftIcon={<Plus className="w-3 h-3 text-[#D97706]" />}
                  className="text-[11px] text-[#52635E] hover:text-[#1C2A26] px-2 py-1 h-auto"
                >
                  Add Chapter
                </Button>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#8A9B95] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="search"
                  value={tocQuery}
                  onChange={(e) => setTocQuery(e.target.value)}
                  placeholder="Search parts and chapters…"
                  className="w-full pl-9 pr-8 py-2 bg-white border border-[#E7E0D3] rounded-xl text-xs text-[#1C2A26] placeholder-[#8A9B95] focus:outline-none focus:border-[#D97706]"
                />
                {tocQuery && (
                  <button
                    type="button"
                    onClick={() => setTocQuery("")}
                    className="absolute right-2.5 top-2 text-[#8A9B95] hover:text-[#1C2A26]"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="space-y-4 max-h-[62vh] overflow-y-auto pr-1 scrollbar-thin">
                {filteredParts.length === 0 && (
                  <p className="text-xs text-[#8A9B95] px-1">No matching chapters.</p>
                )}
                {filteredParts.map((part) => (
                  <div key={part.id} className="space-y-1">
                    <p className="px-1 text-[10px] font-bold uppercase tracking-wider text-[#D97706]">
                      {part.title}
                    </p>
                    {part.nodes.map((node) => {
                      const idx = node.chapterIndex;
                      const chap = chapters[idx];
                      if (!chap) return null;
                      const isActive = idx === activeChapterIndex;
                      const displayTitle = chap.title.replace(/^Chapter\s+\d+:\s*/i, "");

                      return (
                        <div key={chap.id || idx} className="group relative">
                          <button
                            onClick={() => setActiveChapterIndex(idx)}
                            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-sm transition-all ${
                              isActive
                                ? "bg-[#CBD7D2] text-[#1C2A26] font-bold shadow-2xs"
                                : "text-[#2F413B] hover:bg-white/70 hover:text-[#1C2A26] font-normal"
                            }`}
                          >
                            <span className="truncate pr-12 block">
                              <span className="font-semibold mr-1.5">{idx + 1}.</span>
                              {displayTitle}
                            </span>
                          </button>

                          <div className="absolute right-2 top-2.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            <button
                              onClick={() => {
                                setActiveChapterIndex(idx);
                                openEditChapterModal();
                              }}
                              className="p-1 text-[#52635E] hover:text-[#D97706]"
                              title="Edit Chapter"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteChapter(idx)}
                              className="p-1 text-[#52635E] hover:text-red-600"
                              title="Delete Chapter"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN: CHAPTER CONTENT VIEW */}
          <div className="lg:col-span-8 space-y-6">
            <Card variant="default" hoverable={false} className="p-8 sm:p-10 space-y-8 border-[#E7E0D3] bg-white shadow-sm">
              {/* HEADER ROW WITH VIEW MODE TOGGLE BUTTONS */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#E7E0D3]">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-xs font-serif-display font-bold text-[#D97706]">
                    Lesson {activeChapterIndex + 1} of {totalChapters}
                  </span>

                  <div className="flex items-center bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl p-1 text-xs">
                    <button
                      onClick={() => setViewMode("full")}
                      className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                        viewMode === "full"
                          ? "bg-[#1C2A26] text-white shadow-xs"
                          : "text-[#52635E] hover:text-[#1C2A26]"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Full Content</span>
                    </button>

                    <button
                      onClick={() => setViewMode("summary")}
                      className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                        viewMode === "summary"
                          ? "bg-[#D97706] text-white shadow-xs"
                          : "text-[#52635E] hover:text-[#1C2A26]"
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>AI Summary</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openEditChapterModal}
                    leftIcon={<Edit className="w-3.5 h-3.5 text-[#D97706]" />}
                  >
                    Edit
                  </Button>

                  <Button
                    variant={completedChapterIds.includes(activeChapter.id) ? "outline" : "primary"}
                    size="sm"
                    onClick={() => toggleMarkComplete(activeChapter.id)}
                    leftIcon={completedChapterIds.includes(activeChapter.id) ? <Check className="w-4 h-4 text-emerald-600" /> : <CheckCircle2 className="w-4 h-4 text-[#D97706]" />}
                  >
                    {completedChapterIds.includes(activeChapter.id) ? "Completed" : "Mark Complete"}
                  </Button>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-3 pb-2">
                <h1 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#1C2A26] leading-tight">
                  {activeChapter.title}
                </h1>
                {activeChapter.subtitle && (
                  <p className="font-serif-display text-base sm:text-lg font-bold text-[#D97706]">
                    {activeChapter.subtitle}
                  </p>
                )}
              </div>

              {/* CONTENT VIEW OR AI SUMMARY VIEW */}
              {viewMode === "summary" ? (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-7 sm:p-8 rounded-3xl bg-amber-50/70 border border-amber-200/80 space-y-4 shadow-xs"
                >
                  <div className="flex items-center gap-2.5 text-amber-900 font-serif-display font-bold text-lg">
                    <Zap className="w-5 h-5 text-[#D97706]" />
                    <span>AI Key Takeaways & Summary</span>
                  </div>

                  <div className="text-[1.05rem] leading-[1.72] text-[#1C2A26] font-sans space-y-3">
                    {renderFormattedMarkdown(activeChapter.summaryMarkdown || activeChapter.contentMarkdown)}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose prose-stone max-w-none space-y-6"
                >
                  {renderFormattedMarkdown(activeChapter.contentMarkdown)}
                </motion.div>
              )}

              {/* Structured Sections Cards */}
              {activeChapter.sections && activeChapter.sections.length > 0 && (
                <div className="space-y-5 pt-6 border-t border-[#E7E0D3]">
                  {activeChapter.sections.map((sec, sIdx) => (
                    <div key={sIdx} className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3] space-y-3">
                      <h4 className="font-serif-display font-bold text-base text-[#1C2A26] flex items-center gap-2.5">
                        <Layers className="w-4 h-4 text-[#D97706]" /> {sec.title}
                      </h4>
                      <div className="text-xs sm:text-sm text-[#52635E] leading-relaxed whitespace-pre-line font-sans">
                        {sec.body}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Code Snippet Box */}
              {activeChapter.codeSnippet && (
                <div className="space-y-3 pt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#52635E] block flex items-center gap-2 font-sans">
                    <Code className="w-3.5 h-3.5 text-[#D97706]" /> CODE EXAMPLE
                  </span>

                  <div className="p-5 sm:p-6 bg-[#1C2A26] text-[#A7F3D0] rounded-2xl font-mono text-xs sm:text-[13px] overflow-x-auto leading-relaxed border border-[#2D3F3A] shadow-inner">
                    <pre>{activeChapter.codeSnippet}</pre>
                  </div>
                </div>
              )}

              {/* Bottom Navigation Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-[#E7E0D3]">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={activeChapterIndex === 0}
                  onClick={() => setActiveChapterIndex((prev) => Math.max(0, prev - 1))}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Previous Chapter
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  disabled={activeChapterIndex === totalChapters - 1}
                  onClick={() => setActiveChapterIndex((prev) => Math.min(totalChapters - 1, prev + 1))}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  Next Chapter
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* EDIT MANUAL MODAL */}
      <AnimatePresence>
        {isEditManualModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setIsEditManualModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl border border-[#E7E0D3]"
            >
              <div className="flex justify-between items-center pb-3 border-b border-[#E7E0D3]">
                <h3 className="font-serif-display font-bold text-xl text-[#1C2A26] flex items-center gap-2">
                  <Edit className="w-5 h-5 text-[#D97706]" />
                  <span>Edit Manual Metadata</span>
                </h3>
                <button onClick={() => setIsEditManualModalOpen(false)} className="text-[#8A9B95] hover:text-[#1C2A26]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 font-sans text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-[#1C2A26] mb-1">Manual Title</label>
                  <input
                    type="text"
                    value={manualTitle}
                    onChange={(e) => setManualTitle(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1C2A26] mb-1">Category</label>
                  <input
                    type="text"
                    value={manualCategory}
                    onChange={(e) => setManualCategory(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1C2A26] mb-1">Total Estimated Time</label>
                  <input
                    type="text"
                    value={manualEstimatedTime}
                    onChange={(e) => setManualEstimatedTime(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] focus:outline-none focus:border-[#D97706]"
                    placeholder="e.g. 8.5 hours"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1C2A26] mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={manualDescription}
                    onChange={(e) => setManualDescription(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] focus:outline-none focus:border-[#D97706]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#E7E0D3]">
                <Button variant="outline" size="sm" onClick={() => setIsEditManualModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleSaveManualEdits} leftIcon={<Save className="w-4 h-4" />}>
                  Save Manual Changes
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADD / EDIT CHAPTER MODAL */}
      <AnimatePresence>
        {isChapterModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setIsChapterModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl border border-[#E7E0D3] my-8"
            >
              <div className="flex justify-between items-center pb-3 border-b border-[#E7E0D3]">
                <h3 className="font-serif-display font-bold text-xl text-[#1C2A26] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#D97706]" />
                  <span>{chapterModalMode === "add" ? "Add New Chapter" : "Edit Chapter"}</span>
                </h3>
                <button onClick={() => setIsChapterModalOpen(false)} className="text-[#8A9B95] hover:text-[#1C2A26]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 font-sans text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-[#1C2A26] mb-1">Chapter Title</label>
                    <input
                      type="text"
                      value={formChapterTitle}
                      onChange={(e) => setFormChapterTitle(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#1C2A26] mb-1">Minutes</label>
                    <input
                      type="number"
                      value={formChapterMinutes}
                      onChange={(e) => setFormChapterMinutes(Number(e.target.value))}
                      className="w-full p-3 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#1C2A26] mb-1">Chapter number</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="px-3 py-2 rounded-xl border border-[#E7E0D3] bg-white text-[#52635E] disabled:opacity-40"
                      disabled={formChapterRank <= 1}
                      onClick={() => setFormChapterRank((n) => Math.max(1, n - 1))}
                    >
                      Move up
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={chapterModalMode === "add" ? chapters.length + 1 : chapters.length}
                      value={formChapterRank}
                      onChange={(e) => setFormChapterRank(Number(e.target.value) || 1)}
                      className="w-24 p-3 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] focus:outline-none focus:border-[#D97706]"
                    />
                    <button
                      type="button"
                      className="px-3 py-2 rounded-xl border border-[#E7E0D3] bg-white text-[#52635E] disabled:opacity-40"
                      disabled={formChapterRank >= (chapterModalMode === "add" ? chapters.length + 1 : chapters.length)}
                      onClick={() =>
                        setFormChapterRank((n) =>
                          Math.min(chapterModalMode === "add" ? chapters.length + 1 : chapters.length, n + 1)
                        )
                      }
                    >
                      Move down
                    </button>
                    <span className="text-[11px] text-[#8A9B95]">
                      Put this chapter in front of another — e.g. 4 → 3.
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#1C2A26] mb-1">Subtitle (Optional)</label>
                  <input
                    type="text"
                    value={formChapterSubtitle}
                    onChange={(e) => setFormChapterSubtitle(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1C2A26] mb-1">Lesson Content</label>
                  <textarea
                    rows={8}
                    value={formChapterContent}
                    onChange={(e) => setFormChapterContent(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] font-sans text-xs focus:outline-none focus:border-[#D97706]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1C2A26] mb-1">Code Snippet (Optional)</label>
                  <textarea
                    rows={3}
                    value={formChapterCode}
                    onChange={(e) => setFormChapterCode(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E7E0D3] bg-[#1C2A26] text-[#A7F3D0] font-mono text-xs focus:outline-none focus:border-[#D97706]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#E7E0D3]">
                <Button variant="outline" size="sm" onClick={() => setIsEditManualModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleSaveChapter} leftIcon={<Save className="w-4 h-4" />}>
                  {chapterModalMode === "add" ? "Create Chapter" : "Save Chapter"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {/* LEARNING ROADMAP MODAL */}
        {isRoadmapModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1C2A26]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setIsRoadmapModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-[#E7E0D3] rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[88vh] overflow-y-auto space-y-6 shadow-2xl relative"
            >
              {/* Modal Header */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-[#E7E0D3]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#D97706] text-white">
                      {manualEstimatedTime} Total
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-[#52635E]">
                      {totalChapters} Nodes across {partCount} Parts
                    </span>
                  </div>
                  <h3 className="font-serif-display font-bold text-xl text-[#1C2A26] flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#D97706]" />
                    <span>Learning Roadmap</span>
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {isPlaywright && (
                    <Button
                      variant="amber"
                      size="sm"
                      onClick={downloadRoadmapSVG}
                      leftIcon={<Download className="w-4 h-4" />}
                    >
                      Download playwright-roadmap.svg
                    </Button>
                  )}

                  <button
                    onClick={() => setIsRoadmapModalOpen(false)}
                    className="p-2 rounded-xl bg-[#FAF7F2] text-[#52635E] hover:text-[#1C2A26] hover:bg-[#E7E0D3] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Interactive Search & Level Filter Controls */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#8A9B95] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder={`Search ${totalChapters} nodes...`}
                    value={roadmapSearch}
                    onChange={(e) => setRoadmapSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] border border-[#E7E0D3] rounded-2xl text-xs text-[#1C2A26] placeholder-[#8A9B95] focus:outline-none focus:border-[#D97706] transition-colors"
                  />
                  {roadmapSearch && (
                    <button
                      onClick={() => setRoadmapSearch("")}
                      className="absolute right-3 top-2.5 text-[#8A9B95] hover:text-[#1C2A26]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  {isPlaywright ? (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {(["All", "Beginner", "Mid", "Advanced"] as const).map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => setLevelFilter(lvl)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                            levelFilter === lvl
                              ? "bg-[#1C2A26] text-white shadow-2xs"
                              : "bg-[#FAF7F2] text-[#52635E] border border-[#E7E0D3] hover:border-[#D97706]"
                          }`}
                        >
                          {lvl === "All" ? "All Levels" : lvl}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div />
                  )}

                  <span className="text-[11px] font-mono text-[#8A9B95]">
                    Click any node to jump directly to chapter
                  </span>
                </div>
              </div>

              {/* Node Detail Inspector Banner */}
              <AnimatePresence>
                {selectedRoadmapNode && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="p-4 rounded-2xl bg-[#1C2A26] text-white space-y-2 border border-[#D97706]/40 shadow-md relative"
                  >
                    <button
                      onClick={() => setSelectedRoadmapNode(null)}
                      className="absolute right-3 top-3 text-[#8A9B95] hover:text-white p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#D97706] text-white font-mono text-xs font-bold">
                        Node {selectedRoadmapNode.num}
                      </span>
                      <span className="text-xs font-mono text-teal-200">
                        {selectedRoadmapNode.time}
                      </span>
                    </div>

                    <h5 className="font-serif-display font-bold text-sm text-white">
                      {selectedRoadmapNode.title}
                    </h5>

                    {selectedRoadmapNode.description && (
                      <p className="text-xs text-teal-100/90 leading-relaxed">
                        {selectedRoadmapNode.description}
                      </p>
                    )}

                    {selectedRoadmapNode.keyObjective && (
                      <div className="p-2.5 rounded-xl bg-[#243530] text-xs text-amber-200 flex items-start gap-2 border border-[#2D3F3A]">
                        <Target className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                        <span><strong>Key Objective:</strong> {selectedRoadmapNode.keyObjective}</span>
                      </div>
                    )}

                    <div className="pt-1 flex justify-end">
                      <Button
                        variant="amber"
                        size="sm"
                        onClick={() => {
                          const targetIdx = selectedRoadmapNode.chapterIndex !== undefined ? selectedRoadmapNode.chapterIndex : 0;
                          if (targetIdx < chapters.length) {
                            setActiveChapterIndex(targetIdx);
                            setIsRoadmapModalOpen(false);
                            toast({
                              type: "info",
                              title: `Opened Node ${selectedRoadmapNode.num}`,
                              description: selectedRoadmapNode.title,
                            });
                          }
                        }}
                      >
                        Open Chapter Lesson →
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 14 Collapsible Stepper Pipeline Phases */}
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1 scrollbar-thin">
                {phasesForRoadmap.map((phase) => {
                  const isExpanded = expandedPhases.includes(phase.id);

                  const matchingNodes = phase.nodes.filter((n) => {
                    const matchesSearch =
                      !roadmapSearch ||
                      n.title.toLowerCase().includes(roadmapSearch.toLowerCase()) ||
                      n.num.includes(roadmapSearch) ||
                      (n.description && n.description.toLowerCase().includes(roadmapSearch.toLowerCase()));
                    const matchesLevel = levelFilter === "All" || n.level === levelFilter;
                    return matchesSearch && matchesLevel;
                  });

                  if (matchingNodes.length === 0 && (roadmapSearch || levelFilter !== "All")) {
                    return null;
                  }

                  return (
                    <div key={phase.id} className="border border-[#E7E0D3] rounded-2xl overflow-hidden bg-white shadow-2xs">
                      <button
                        onClick={() => {
                          if (isExpanded) {
                            setExpandedPhases((prev) => prev.filter((id) => id !== phase.id));
                          } else {
                            setExpandedPhases((prev) => [...prev, phase.id]);
                          }
                        }}
                        className="w-full text-left p-3.5 bg-[#FAF7F2] hover:bg-[#F5EFE6] transition-colors flex items-center justify-between border-b border-[#E7E0D3]"
                      >
                        <div className="flex items-center gap-2.5 truncate pr-2">
                          <span className="px-2 py-0.5 rounded-lg bg-[#1C2A26] text-[#D97706] font-mono font-bold text-xs shadow-2xs">
                            {phase.phaseNum}
                          </span>
                          <span className="font-serif-display font-bold text-sm text-[#1C2A26] truncate">
                            {phase.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-mono text-[#8A9B95] bg-white px-2.5 py-0.5 rounded-md border border-[#E7E0D3]">
                            {matchingNodes.length} steps
                          </span>
                          <ChevronDown className={`w-4 h-4 text-[#52635E] transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-3 space-y-2 relative"
                          >
                            <div className="absolute left-[26px] top-5 bottom-5 w-0.5 bg-[#E7E0D3] pointer-events-none" />

                            {matchingNodes.map((node) => {
                              const targetIdx = node.chapterIndex !== undefined && node.chapterIndex < chapters.length ? node.chapterIndex : 0;
                              const isActive = activeChapterIndex === targetIdx;
                              const isDone = completedChapterIds.includes(chapters[targetIdx]?.id || "");

                              return (
                                <div key={node.num} className="relative flex items-center gap-3">
                                  <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 z-10 transition-all ${
                                      isDone
                                        ? "bg-emerald-500 text-white shadow-2xs"
                                        : isActive
                                        ? "bg-[#D97706] text-white ring-2 ring-[#D97706]/40 shadow-xs"
                                        : "bg-[#FAF7F2] text-[#52635E] border border-[#E7E0D3]"
                                    }`}
                                  >
                                    {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : node.num}
                                  </div>

                                  <button
                                    onClick={() => {
                                      setSelectedRoadmapNode(node);
                                      if (targetIdx < chapters.length) {
                                        setActiveChapterIndex(targetIdx);
                                        setIsRoadmapModalOpen(false);
                                      }
                                    }}
                                    className={`flex-1 text-left p-3 rounded-xl transition-all flex items-center justify-between border text-xs ${
                                      isActive
                                        ? "bg-[#1C2A26] text-white border-[#1C2A26] shadow-xs font-bold"
                                        : "bg-white border-[#E7E0D3] text-[#52635E] hover:border-[#D97706] hover:bg-[#FAF7F2]"
                                    }`}
                                  >
                                    <div className="truncate pr-2">
                                      <span className="truncate block font-semibold">{node.title}</span>
                                      {node.description && (
                                        <span className={`text-[11px] truncate block opacity-75 ${isActive ? "text-teal-200" : "text-[#8A9B95]"}`}>
                                          {node.description}
                                        </span>
                                      )}
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                      {node.level && node.level !== "All" && (
                                        <span
                                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                                            node.level === "Beginner"
                                              ? "bg-emerald-100 text-emerald-800"
                                              : node.level === "Mid"
                                              ? "bg-amber-100 text-amber-800"
                                              : "bg-purple-100 text-purple-800"
                                          }`}
                                        >
                                          {node.level}
                                        </span>
                                      )}
                                      <span className="text-[10px] font-mono text-[#8A9B95]">
                                        {node.time}
                                      </span>
                                    </div>
                                  </button>
                                </div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
