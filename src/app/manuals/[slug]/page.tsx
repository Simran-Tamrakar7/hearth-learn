"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { findHearthManual, ManualItem, ManualChapter } from "@/lib/manualsData";
import { isTestingTypesSlug, TestingTypesGuide } from "@/components/manuals/TestingTypesGuide";
import { PLAYWRIGHT_ROADMAP_PHASES, downloadRoadmapSVG } from "@/lib/roadmapData";
import { stripLeadingNumber } from "@/lib/pathwise-data/helpers.js";
import { PinButton, getPinnedItems, PinnedItemMetadata } from "@/components/ui/PinButton";
import { ToolSwitcher } from "@/components/manuals/ToolSwitcher";
import { TestingTypesInteractiveManual, TESTING_TYPES_CHAPTERS } from "@/components/manuals/TestingTypesInteractiveManual";
import { readerChaptersFromOverlay } from "@/components/manuals/testing-types-reader";

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
  Heading1,
  Heading2,
  Heading3,
  Bold,
  List,
  ListOrdered,
  Quote,
  Eye,
  Zap,
  Download,
  MapPin,
  CheckSquare,
  Search,
  Target,
  Award,
  Info,
  Pin,
} from "lucide-react";

export default function ManualDetailPage() {
  return <GenericManualDetailPage />;
}


function GenericManualDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const slug = params?.slug as string;
  const foundManual = findHearthManual(slug);
  const initialManual = foundManual ?? {
    id: "manual-missing",
    slug: slug || "missing",
    title: "Manual not found",
    category: "Quality Craft" as const,
    description: "",
    chapterCount: 0,
    estimatedTime: "—",
    icon: "BookOpen",
    coverImage: "",
    chapters: [],
  };

  // State for editable manual details
  const [manualTitle, setManualTitle] = useState<string>(initialManual.title);
  const [manualDescription, setManualDescription] = useState<string>(initialManual.description);
  const [manualCategory, setManualCategory] = useState<string>(initialManual.category);
  const [manualEstimatedTime, setManualEstimatedTime] = useState<string>(initialManual.estimatedTime);

  const isTestingTypesManual =
    slug === "testing-types" ||
    slug === "testing-types-manual" ||
    isTestingTypesSlug(slug);

  // Testing Types TOC must follow TESTING_TYPES_CHAPTERS, not a stale localStorage snapshot (was freezing at 64).
  const catalogChapters = isTestingTypesManual
    ? readerChaptersFromOverlay(initialManual.chapters)
    : initialManual.chapters;

  // State for editable chapters list
  const [chapters, setChapters] = useState<ManualChapter[]>(catalogChapters);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [prevChapterIndex, setPrevChapterIndex] = useState<number | null>(null);
  const [completedChapterIds, setCompletedChapterIds] = useState<string[]>([]);

  const handleNavigateChapter = (targetIdx: number) => {
    if (targetIdx >= 0 && targetIdx < chapters.length) {
      setPrevChapterIndex(activeChapterIndex);
      setActiveChapterIndex(targetIdx);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 120, behavior: "smooth" });
      }
    }
  };

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
  const [contentView, setContentView] = useState<"write" | "preview">("write");
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [pinnedShowcase, setPinnedShowcase] = useState<PinnedItemMetadata[]>([]);

  useEffect(() => {
    const updatePins = () => {
      setPinnedShowcase(getPinnedItems().filter((p) => p.type === "showcase"));
    };
    updatePins();
    window.addEventListener("hearth_pins_updated", updatePins);
    return () => window.removeEventListener("hearth_pins_updated", updatePins);
  }, []);

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
        if (parsed.chapters && Array.isArray(parsed.chapters) && !isTestingTypesManual) {
          setChapters(parsed.chapters);
        }
      } catch (e) {}
    }
    if (isTestingTypesManual) {
      setChapters(readerChaptersFromOverlay(initialManual.chapters));
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
      ...(isTestingTypesManual ? {} : { chapters }),
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
    setContentView("write");
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
    setContentView("write");
    setIsChapterModalOpen(true);
  };

  function applyContentFormat(
    kind: "h1" | "h2" | "h3" | "bold" | "list" | "num" | "quote" | "code" | "inline"
  ) {
    const el = contentRef.current;
    const value = formChapterContent;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    const selected = value.slice(start, end);
    const map = {
      h1: { pre: "# ", post: "", ph: "Heading" },
      h2: { pre: "## ", post: "", ph: "Heading" },
      h3: { pre: "### ", post: "", ph: "Heading" },
      bold: { pre: "**", post: "**", ph: "bold" },
      list: { pre: "- ", post: "", ph: "List item" },
      num: { pre: "1. ", post: "", ph: "Step" },
      quote: { pre: "> ", post: "", ph: "Note" },
      code: { pre: "```\n", post: "\n```", ph: "code here" },
      inline: { pre: "`", post: "`", ph: "code" },
    } as const;
    const { pre, post, ph } = map[kind];
    const inner = selected || ph;
    const block = kind !== "bold" && kind !== "inline";
    const lead = block && start > 0 && value[start - 1] !== "\n" ? "\n" : "";
    const insert = lead + pre + inner + post;
    setFormChapterContent(value.slice(0, start) + insert + value.slice(end));
    requestAnimationFrame(() => {
      const node = contentRef.current;
      if (!node) return;
      node.focus();
      const innerStart = start + lead.length + pre.length;
      node.setSelectionRange(innerStart, innerStart + inner.length);
    });
  }

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
      if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
        const inner = part.slice(2, -2);
        return (
          <strong key={idx} className="font-bold text-[#1C2A26]">
            {inner}
          </strong>
        );
      }

      const codeParts = part.split(/(`.*?`)/g);
      return codeParts.map((cPart, cIdx) => {
        if (cPart.startsWith("`") && cPart.endsWith("`") && cPart.length >= 2) {
          const cInner = cPart.slice(1, -1);
          return (
            <code
              key={cIdx}
              className="px-1.5 py-0.5 rounded-md bg-[#FAF7F2] text-[#D97706] border border-[#E7E0D3] font-mono text-[11px]"
            >
              {cInner}
            </code>
          );
        }
        return cPart;
      });
    });
  };

  // Renders Markdown with clean compact spacing, proportional headings, and structured callouts
  const renderFormattedMarkdown = (text: string) => {
    if (!text) return null;

    const codeBlockRegex = /```([\s\S]*?)```/g;
    const rawParts = text.split(codeBlockRegex);

    return rawParts.map((part, pIdx) => {
      if (pIdx % 2 === 1) {
        return (
          <div
            key={pIdx}
            className="my-3 p-4 sm:p-5 bg-[#1C2A26] text-[#A7F3D0] rounded-xl font-mono text-xs sm:text-[13px] overflow-x-auto leading-relaxed border border-[#2D3F3A] shadow-2xs"
          >
            <pre>{part.trim()}</pre>
          </div>
        );
      }

      const lines = part.split("\n");
      const elements: React.ReactNode[] = [];
      let listItems: string[] = [];
      let listType: "bullet" | "numbered" | null = null;
      let paragraphLines: string[] = [];

      const flushParagraph = () => {
        if (paragraphLines.length > 0) {
          const fullText = paragraphLines.join(" ").trim();
          if (fullText) {
            const doThisMatch = fullText.match(/^(Do this now:?|Action:?)\s*(.*)/i);
            const tipMatch = fullText.match(/^(Pro tip:?|Tip:?|Hint:?)\s*(.*)/i);
            const noteMatch = fullText.match(/^(Note:?|Important:?|Warning:?)\s*(.*)/i);

            if (doThisMatch) {
              elements.push(
                <div
                  key={`do-${elements.length}`}
                  className="my-2 p-3 sm:p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-[#1C2A26] flex items-start gap-2.5 leading-relaxed"
                >
                  <Target className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#D97706] mr-1.5">{doThisMatch[1]}</span>
                    <span>{parseInlineFormatting(doThisMatch[2] || fullText)}</span>
                  </div>
                </div>
              );
            } else if (tipMatch) {
              elements.push(
                <div
                  key={`tip-${elements.length}`}
                  className="my-2 p-3 sm:p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm text-[#1C2A26] flex items-start gap-2.5 leading-relaxed"
                >
                  <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-emerald-800 mr-1.5">{tipMatch[1]}</span>
                    <span>{parseInlineFormatting(tipMatch[2] || fullText)}</span>
                  </div>
                </div>
              );
            } else if (noteMatch) {
              elements.push(
                <div
                  key={`note-${elements.length}`}
                  className="my-2 p-3 sm:p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E7E0D3] text-xs sm:text-sm text-[#1C2A26] flex items-start gap-2.5 leading-relaxed"
                >
                  <Info className="w-4 h-4 text-[#52635E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1C2A26] mr-1.5">{noteMatch[1]}</span>
                    <span>{parseInlineFormatting(noteMatch[2] || fullText)}</span>
                  </div>
                </div>
              );
            } else {
              elements.push(
                <p
                  key={`p-${elements.length}`}
                  className="text-xs sm:text-sm leading-relaxed text-[#1C2A26] my-1.5 text-left"
                >
                  {parseInlineFormatting(fullText)}
                </p>
              );
            }
          }
          paragraphLines = [];
        }
      };

      const flushList = () => {
        if (listItems.length > 0 && listType) {
          if (listType === "bullet") {
            elements.push(
              <ul
                key={`ul-${elements.length}`}
                className="my-1.5 space-y-1 pl-5 list-disc text-xs sm:text-sm leading-relaxed text-[#1C2A26]"
              >
                {listItems.map((item, idx) => (
                  <li key={idx} className="pl-0.5">
                    {parseInlineFormatting(item)}
                  </li>
                ))}
              </ul>
            );
          } else {
            elements.push(
              <ol
                key={`ol-${elements.length}`}
                className="my-1.5 space-y-1 pl-5 list-decimal text-xs sm:text-sm leading-relaxed text-[#1C2A26]"
              >
                {listItems.map((item, idx) => (
                  <li key={idx} className="pl-0.5 font-medium">
                    {parseInlineFormatting(item)}
                  </li>
                ))}
              </ol>
            );
          }
          listItems = [];
          listType = null;
        }
      };

      for (const line of lines) {
        const trimmed = line.trim();

        if (!trimmed) {
          flushParagraph();
          flushList();
          continue;
        }

        if (trimmed.startsWith("# ")) {
          flushParagraph();
          flushList();
          elements.push(
            <h1
              key={`h1-${elements.length}`}
              className="font-serif-display text-lg sm:text-xl font-bold text-[#1C2A26] pt-3 pb-1 border-b border-[#E7E0D3] mt-3.5 flex items-center gap-2"
            >
              <span className="w-1.5 h-4 bg-[#D97706] rounded-full inline-block shrink-0" />
              {parseInlineFormatting(trimmed.replace(/^#\s+/, ""))}
            </h1>
          );
        } else if (trimmed.startsWith("## ")) {
          flushParagraph();
          flushList();
          elements.push(
            <h2
              key={`h2-${elements.length}`}
              className="font-serif-display text-base sm:text-lg font-bold text-[#1C2A26] pt-3 pb-1 mt-2.5 flex items-center gap-2"
            >
              <span className="w-1 h-4 bg-[#1C2A26] rounded-full inline-block shrink-0" />
              {parseInlineFormatting(trimmed.replace(/^##\s+/, ""))}
            </h2>
          );
        } else if (trimmed.startsWith("### ")) {
          flushParagraph();
          flushList();
          elements.push(
            <h3
              key={`h3-${elements.length}`}
              className="font-serif-display text-sm sm:text-base font-bold text-[#1C2A26] pt-2 pb-0.5 mt-2 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] inline-block shrink-0" />
              {parseInlineFormatting(trimmed.replace(/^###\s+/, ""))}
            </h3>
          );
        } else if (trimmed.startsWith("#### ")) {
          flushParagraph();
          flushList();
          elements.push(
            <h4
              key={`h4-${elements.length}`}
              className="font-sans text-xs font-bold text-[#2A3B35] tracking-wider uppercase pt-2 pb-0.5 mt-1.5"
            >
              {parseInlineFormatting(trimmed.replace(/^####\s+/, ""))}
            </h4>
          );
        } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          flushParagraph();
          const itemText = trimmed.replace(/^[-*]\s+/, "");
          if (listType === "bullet") {
            listItems.push(itemText);
          } else {
            flushList();
            listType = "bullet";
            listItems = [itemText];
          }
        } else if (/^\d+\.\s+/.test(trimmed)) {
          flushParagraph();
          const itemText = trimmed.replace(/^\d+\.\s+/, "");
          if (listType === "numbered") {
            listItems.push(itemText);
          } else {
            flushList();
            listType = "numbered";
            listItems = [itemText];
          }
        } else {
          flushList();
          paragraphLines.push(trimmed);
        }
      }

      flushParagraph();
      flushList();

      return (
        <div key={pIdx} className="font-sans space-y-1">
          {elements}
        </div>
      );
    });
  };

  if (!foundManual) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
        <Navbar />
        <main className="max-w-[1440px] mx-auto px-6 py-16 w-full space-y-4">
          <h1 className="font-serif-display text-3xl font-bold">Manual not found</h1>
          <p className="text-[#52635E]">That slug is not in the catalogue. Open Testing Types from Manuals.</p>
          <Link href="/manuals">
            <Button variant="outline" size="sm" leftIcon={<ChevronLeft className="w-4 h-4" />}>
              Back to Manuals
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full space-y-8 flex-1">
        {/* MANUAL HEADER CARD — TIGHT & PROPORTIONED WITHOUT GAP TRUNCATION */}
        <div className="bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EFE6] border border-[#E7E0D3] rounded-3xl p-6 sm:p-8 shadow-sm">

          {/* Top Bar Navigation */}
          <div className="flex justify-between items-center mb-2.5">
            <Link href="/manuals">
              <Button variant="outline" size="sm" leftIcon={<ChevronLeft className="w-4 h-4" />}>
                Back to Manuals
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <PinButton
                itemId={`man-${slug}`}
                itemTitle={manualTitle}
                itemCategory={manualCategory}
                itemType="manual"
                itemUrl={`/manuals/${slug}`}
                variant="button"
              />
              <Badge variant="amber">{manualCategory}</Badge>
            </div>
          </div>

          {/* Title & Description Block */}
          <div className="space-y-1 mb-3 w-full">
            <h1 className="font-serif-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C2A26] leading-tight">
              {manualTitle}
            </h1>
            <p className="text-xs sm:text-sm text-[#52635E] leading-relaxed w-full">
              {manualDescription}
            </p>
          </div>

          {/* Metadata Footer Row */}
          <div className="border-t border-[#E7E0D3] pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsRoadmapModalOpen(true)}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#1C2A26] text-white hover:bg-[#243530] transition-all shadow-xs"
              >
                <Compass className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>Learning Roadmap</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#52635E] bg-white px-3 py-1 rounded-lg border border-[#E7E0D3] shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>{partCount} Parts</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#52635E] bg-white px-3 py-1 rounded-lg border border-[#E7E0D3] shadow-2xs">
                <BookOpen className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>{totalChapters} Chapters</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#52635E] bg-white px-3 py-1 rounded-lg border border-[#E7E0D3] shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>{manualEstimatedTime} Total</span>
              </div>

              <button
                type="button"
                onClick={() => setIsEditManualModalOpen(true)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#52635E] bg-white px-3 py-1 rounded-lg border border-[#E7E0D3] hover:text-[#1C2A26] hover:border-[#D4CBBB] transition-all shadow-2xs"
              >
                <SquarePen className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>Edit Manual</span>
              </button>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-60">
              <div className="flex-1">
                <div className="flex justify-between text-[11px] font-bold text-[#52635E] mb-1">
                  <span>Course Progress</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#E7E0D3] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D97706] to-amber-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {pinnedShowcase.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 bg-white border border-[#E7E0D3] rounded-2xl px-4 py-3">
            <span className="text-xs font-bold text-[#8A9B95] uppercase tracking-wider flex items-center gap-1.5 mr-1">
              <Pin className="w-3.5 h-3.5 text-[#D97706]" />
              Pinned showcase
            </span>
            {pinnedShowcase.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#E7E0D3] text-xs font-semibold text-[#1C2A26] hover:border-[#D97706] hover:text-[#D97706] transition-colors"
              >
                <span className="truncate max-w-[180px]">{item.title}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            ))}
          </div>
        )}

        {/* 2-COLUMN LAYOUT: TOC SIDEBAR + CHAPTER CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT COLUMN: TABLE OF CONTENTS SIDEBAR */}

          <div className="lg:col-span-4 xl:col-span-4 sticky top-24 max-h-[82vh] min-h-0">
            <div className="rounded-2xl border border-[#E7E0D3] bg-[#FAF7F2] shadow-xs overflow-hidden flex flex-col max-h-[82vh]">
              <div className="flex items-center justify-between gap-2 px-2.5 pt-2.5 pb-2 border-b border-[#E7E0D3]">
                <div className="flex items-center gap-1.5 text-xs font-serif-display font-bold text-[#1C2A26] tracking-wider uppercase min-w-0">
                  <BookOpen className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span className="truncate">Table of Contents</span>
                </div>

                <button
                  type="button"
                  onClick={openAddChapterModal}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D97706] hover:text-[#B45309] shrink-0 px-1 py-0.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Chapter
                </button>
              </div>

              <div className="relative px-2 pt-2">
                <Search className="w-3.5 h-3.5 text-[#8A9B95] absolute left-4 top-[1.125rem] pointer-events-none" />
                <input
                  type="search"
                  value={tocQuery}
                  onChange={(e) => setTocQuery(e.target.value)}
                  placeholder="Search parts and chapters…"
                  className="w-full pl-8 pr-7 py-2 bg-white border border-[#E7E0D3] rounded-lg text-xs text-[#1C2A26] placeholder-[#8A9B95] focus:outline-none focus:border-[#D97706]"
                />
                {tocQuery && (
                  <button
                    type="button"
                    onClick={() => setTocQuery("")}
                    className="absolute right-3.5 top-[1.125rem] text-[#8A9B95] hover:text-[#1C2A26]"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="px-1.5 pt-2 pb-2 space-y-3 overflow-y-auto min-h-0 flex-1 scrollbar-thin">
                {filteredParts.length === 0 && (
                  <p className="text-xs text-[#8A9B95] px-1.5">No matching chapters.</p>
                )}
                {filteredParts.map((part) => (
                  <div key={part.id} className="space-y-0.5">
                    <p className="px-1.5 pt-1 pb-0.5 text-[10px] font-bold uppercase tracking-wider text-[#D97706]">
                      {part.title}
                    </p>
                    {part.nodes.map((node) => {
                      const idx = node.chapterIndex;
                      const chap = chapters[idx];
                      if (!chap) return null;
                      const isActive = idx === activeChapterIndex;
                      const displayTitle = stripLeadingNumber(
                        chap.title.replace(/^Chapter\s+\d+:\s*/i, "")
                      );

                      return (
                        <div
                          key={chap.id || idx}
                          className={`group flex items-center gap-0.5 rounded-lg ${
                            isActive ? "bg-[#1C2A26]" : "hover:bg-[#F3EDE2]"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveChapterIndex(idx)}
                            className={`flex-1 min-w-0 text-left px-2 py-2 text-xs sm:text-sm transition-colors flex items-center gap-2 ${
                              isActive
                                ? "text-[#FAF7F2] font-semibold"
                                : "text-[#3D4D47] hover:text-[#1C2A26] font-normal"
                            }`}
                            title={displayTitle}
                          >
                            <span className={`font-mono text-[11px] font-bold shrink-0 w-5 ${isActive ? "text-[#D97706]" : "text-[#8A9B95]"}`}>
                              {idx + 1}.
                            </span>
                            <span className="truncate whitespace-nowrap flex-1 min-w-0">
                              {displayTitle}
                            </span>
                          </button>

                          <div className="flex items-center shrink-0 pr-1">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveChapterIndex(idx);
                                openEditChapterModal();
                              }}
                              className={`p-1 rounded-md transition-colors ${
                                isActive
                                  ? "text-amber-400 hover:text-white"
                                  : "text-[#8A9B95] hover:text-[#D97706]"
                              }`}
                              title="Edit Chapter"
                            >
                              <Edit className="w-3 h-3" />
                            </button>


                            <button
                              type="button"
                              onClick={() => handleDeleteChapter(idx)}
                              className={`p-1 rounded-md transition-colors ${
                                isActive
                                  ? "text-amber-400 hover:text-red-400"
                                  : "text-[#8A9B95] hover:text-red-600"
                              }`}
                              title="Delete Chapter"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CHAPTER CONTENT VIEW */}
          <div className="lg:col-span-8 xl:col-span-8 space-y-4">
            <Card variant="default" hoverable={false} className="p-4 sm:p-6 space-y-4 border-[#E7E0D3] bg-white shadow-xs rounded-2xl">
              {/* HEADER ROW WITH VIEW MODE TOGGLE BUTTONS */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E7E0D3]">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-serif-display font-bold text-[#D97706]">
                    Lesson {activeChapterIndex + 1} of {totalChapters}
                  </span>

                  <div className="flex items-center bg-[#FAF7F2] border border-[#E7E0D3] rounded-lg p-0.5 text-xs">
                    <button
                      onClick={() => setViewMode("full")}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                        viewMode === "full"
                          ? "bg-[#1C2A26] text-white shadow-2xs"
                          : "text-[#52635E] hover:text-[#1C2A26]"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Full Content</span>
                    </button>

                    <button
                      onClick={() => setViewMode("summary")}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                        viewMode === "summary"
                          ? "bg-[#D97706] text-white shadow-2xs"
                          : "text-[#52635E] hover:text-[#1C2A26]"
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>AI Summary</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
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
                    leftIcon={completedChapterIds.includes(activeChapter.id) ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <CheckCircle2 className="w-3.5 h-3.5 text-[#D97706]" />}
                  >
                    {completedChapterIds.includes(activeChapter.id) ? "Completed" : "Mark Complete"}
                  </Button>
                </div>
              </div>

              {/* Cross-Chapter Navigation Back Banner */}
              {prevChapterIndex !== null && prevChapterIndex !== activeChapterIndex && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      const p = prevChapterIndex;
                      setPrevChapterIndex(null);
                      setActiveChapterIndex(p);
                      if (typeof window !== "undefined") {
                        window.scrollTo({ top: 120, behavior: "smooth" });
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-300/80 text-[#B45309] text-xs font-bold font-sans transition-all shadow-2xs group cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-[#D97706]" />
                    <span>← Return to Chapter {String(prevChapterIndex + 1).padStart(2, "0")}: {chapters[prevChapterIndex]?.title.replace(/^Chapter\s+\d+:\s*/i, "")}</span>
                  </button>
                </div>
              )}

              {/* Title & Subtitle */}
              <div className="space-y-1 pb-1">
                <h1 className="font-serif-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C2A26] leading-tight">
                  {stripLeadingNumber(activeChapter.title.replace(/^Chapter\s+\d+:\s*/i, ""))}
                </h1>
                {activeChapter.subtitle && (
                  <p className="font-serif-display text-xs sm:text-sm font-semibold text-[#D97706]">
                    {activeChapter.subtitle}
                  </p>
                )}
              </div>


              {/* CONTENT VIEW OR AI SUMMARY VIEW */}
              {viewMode === "summary" ? (
                <motion.div
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2.5 shadow-2xs"
                >
                  <div className="flex items-center gap-2 text-amber-900 font-serif-display font-bold text-base">
                    <Zap className="w-4 h-4 text-[#D97706]" />
                    <span>AI Key Takeaways & Summary</span>
                  </div>

                  <div className="text-xs sm:text-sm leading-relaxed text-[#1C2A26] font-sans space-y-2">
                    {renderFormattedMarkdown(activeChapter.summaryMarkdown || activeChapter.contentMarkdown)}
                  </div>
                </motion.div>
              ) : (slug === "testing-types" || slug === "testing-types-manual" || activeChapter.why || activeChapter.practical) ? (
                <motion.div
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Overview Text */}
                  {(TESTING_TYPES_CHAPTERS[activeChapterIndex]?.desc || activeChapter.overviewText) && (
                    <p className="text-xs sm:text-sm text-[#52635E] leading-relaxed font-sans">
                      {TESTING_TYPES_CHAPTERS[activeChapterIndex]?.desc || activeChapter.overviewText}
                    </p>
                  )}

                  {/* Why it matters & When to use it Strip (8080 Format) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="p-4 sm:p-5 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] space-y-2 shadow-2xs">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#D97706]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                        <span>Why it matters</span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#52635E] leading-relaxed">
                        {TESTING_TYPES_CHAPTERS[activeChapterIndex]?.why || activeChapter.why}
                      </p>
                    </div>

                    <div className="p-4 sm:p-5 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] space-y-2 shadow-2xs">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#D97706]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                        <span>When to use it</span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#52635E] leading-relaxed">
                        {TESTING_TYPES_CHAPTERS[activeChapterIndex]?.when || activeChapter.when}
                      </p>
                    </div>
                  </div>

                  {/* Practical Example Block (8080 Format) */}
                  {(TESTING_TYPES_CHAPTERS[activeChapterIndex]?.practical || activeChapter.practical) && (
                    <div className="p-4 sm:p-5 rounded-xl border border-[#D0E2FF] bg-[#F4F8FF] space-y-3 shadow-2xs">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0062D2]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0062D2]" />
                        <span>Practical Example</span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#1C2A26] leading-relaxed">
                        <strong className="font-bold text-[#0F172A]">
                          {(TESTING_TYPES_CHAPTERS[activeChapterIndex]?.practical || activeChapter.practical)?.app}
                        </strong> — {(TESTING_TYPES_CHAPTERS[activeChapterIndex]?.practical || activeChapter.practical)?.scenario}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {(TESTING_TYPES_CHAPTERS[activeChapterIndex]?.practical || activeChapter.practical)?.fail ? (
                        <div className="p-3.5 rounded-xl border border-rose-200 border-t-2 border-t-rose-500 bg-white space-y-1 shadow-2xs">
                          <span className="block font-mono text-[10px] uppercase tracking-wider font-bold text-rose-700">
                            {(TESTING_TYPES_CHAPTERS[activeChapterIndex]?.practical as { failLabel?: string } | undefined)?.failLabel || "Fail Condition"}
                          </span>
                          <p className="text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed">
                            {(TESTING_TYPES_CHAPTERS[activeChapterIndex]?.practical || activeChapter.practical)?.fail}
                          </p>
                        </div>
                        ) : null}

                        {(TESTING_TYPES_CHAPTERS[activeChapterIndex]?.practical || activeChapter.practical)?.pass ? (
                        <div className="p-3.5 rounded-xl border border-emerald-200 border-t-2 border-t-emerald-500 bg-white space-y-1 shadow-2xs">
                          <span className="block font-mono text-[10px] uppercase tracking-wider font-bold text-emerald-700">
                            {(TESTING_TYPES_CHAPTERS[activeChapterIndex]?.practical as { passLabel?: string } | undefined)?.passLabel || "Pass Condition"}
                          </span>
                          <p className="text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed">
                            {(TESTING_TYPES_CHAPTERS[activeChapterIndex]?.practical || activeChapter.practical)?.pass}
                          </p>
                        </div>
                        ) : null}

                        {(TESTING_TYPES_CHAPTERS[activeChapterIndex]?.practical as { value?: string } | undefined)?.value ? (
                        <div className="p-3.5 rounded-xl border border-sky-200 border-t-2 border-t-sky-500 bg-white space-y-1 shadow-2xs sm:col-span-2">
                          <span className="block font-mono text-[10px] uppercase tracking-wider font-bold text-sky-700">
                            Value delivered
                          </span>
                          <p className="text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed">
                            {(TESTING_TYPES_CHAPTERS[activeChapterIndex]?.practical as { value?: string }).value}
                          </p>
                        </div>
                        ) : null}
                      </div>
                    </div>
                  )}

                  {/* General Level Advantages & Limitations */}
                  {TESTING_TYPES_CHAPTERS[activeChapterIndex]?.advantages && TESTING_TYPES_CHAPTERS[activeChapterIndex]?.limitations && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className="p-4 sm:p-5 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] space-y-2 shadow-2xs">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          <span>Advantages</span>
                        </div>
                        <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#52635E] pl-4 list-disc marker:text-emerald-600/70 leading-relaxed">
                          {TESTING_TYPES_CHAPTERS[activeChapterIndex].advantages!.map((adv, ai) => (
                            <li key={ai}>{adv}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 sm:p-5 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] space-y-2 shadow-2xs">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                          <span>Limitations</span>
                        </div>
                        <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#52635E] pl-4 list-disc marker:text-rose-600/70 leading-relaxed">
                          {TESTING_TYPES_CHAPTERS[activeChapterIndex].limitations!.map((lim, li) => (
                            <li key={li}>{lim}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Interactive Tool Switcher (Exact 8080 Design) */}
                  {(TESTING_TYPES_CHAPTERS[activeChapterIndex]?.tools || activeChapter.tools) && (
                    <div className="pt-1">
                      <ToolSwitcher
                        tools={TESTING_TYPES_CHAPTERS[activeChapterIndex]?.tools || activeChapter.tools!}
                        onNavigateChapter={handleNavigateChapter}
                      />
                    </div>
                  )}


                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {renderFormattedMarkdown(activeChapter.contentMarkdown)}

                  {/* Structured Sections Cards (Fallback only) */}
                  {activeChapter.sections && activeChapter.sections.length > 0 && (
                    <div className="space-y-3 pt-3.5 border-t border-[#E7E0D3]">
                      {activeChapter.sections.map((sec, sIdx) => (
                        <div key={sIdx} className="p-3.5 sm:p-4 rounded-xl bg-[#FAF7F2] border border-[#E7E0D3] space-y-1.5">
                          <h4 className="font-serif-display font-bold text-sm sm:text-base text-[#1C2A26] flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5 text-[#D97706]" /> {sec.title}
                          </h4>
                          <div className="text-xs sm:text-[13px] text-[#52635E] leading-relaxed whitespace-pre-line font-sans">
                            {sec.body}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Code Snippet Box (Fallback only) */}
                  {activeChapter.codeSnippet && (
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#52635E] block flex items-center gap-1.5 font-sans">
                        <Code className="w-3 h-3 text-[#D97706]" /> CODE EXAMPLE
                      </span>

                      <div className="p-3.5 sm:p-4 bg-[#1C2A26] text-[#A7F3D0] rounded-xl font-mono text-xs sm:text-[13px] overflow-x-auto leading-relaxed border border-[#2D3F3A] shadow-inner">
                        <pre>{activeChapter.codeSnippet}</pre>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}


              {/* Bottom Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E7E0D3]">
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
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full space-y-6 shadow-2xl border border-[#E7E0D3] my-8"
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
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <label className="block font-bold text-[#1C2A26]">Lesson Content</label>
                    <div className="flex items-center bg-[#FAF7F2] border border-[#E7E0D3] rounded-lg p-0.5 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setContentView("write")}
                        className={`px-2.5 py-1 rounded-md font-bold ${
                          contentView === "write" ? "bg-[#1C2A26] text-white" : "text-[#52635E]"
                        }`}
                      >
                        Write
                      </button>
                      <button
                        type="button"
                        onClick={() => setContentView("preview")}
                        className={`px-2.5 py-1 rounded-md font-bold flex items-center gap-1 ${
                          contentView === "preview" ? "bg-[#1C2A26] text-white" : "text-[#52635E]"
                        }`}
                      >
                        <Eye className="w-3 h-3" />
                        Preview
                      </button>
                    </div>
                  </div>

                  {contentView === "write" ? (
                    <>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {(
                          [
                            { kind: "h1", label: "H1", Icon: Heading1 },
                            { kind: "h2", label: "H2", Icon: Heading2 },
                            { kind: "h3", label: "H3", Icon: Heading3 },
                            { kind: "bold", label: "Bold", Icon: Bold },
                            { kind: "list", label: "List", Icon: List },
                            { kind: "num", label: "Steps", Icon: ListOrdered },
                            { kind: "quote", label: "Note", Icon: Quote },
                            { kind: "code", label: "Code block", Icon: Code },
                            { kind: "inline", label: "Inline code", Icon: FileText },
                          ] as const
                        ).map(({ kind, label, Icon }) => (
                          <button
                            key={kind}
                            type="button"
                            title={label}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => applyContentFormat(kind)}
                            className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg border border-[#E7E0D3] bg-white text-[11px] font-bold text-[#52635E] hover:border-[#D97706] hover:text-[#1C2A26]"
                          >
                            <Icon className="w-3.5 h-3.5" />
                            {label}
                          </button>
                        ))}
                      </div>
                      <textarea
                        ref={contentRef}
                        rows={14}
                        value={formChapterContent}
                        onChange={(e) => setFormChapterContent(e.target.value)}
                        placeholder={"# Heading\n\nLesson text…\n\n```\ncode\n```"}
                        className="w-full p-3 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] font-sans text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-[#D97706]"
                      />
                    </>
                  ) : (
                    <div className="min-h-[16rem] p-4 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2]">
                      {formChapterContent.trim()
                        ? renderFormattedMarkdown(formChapterContent)
                        : (
                          <p className="text-xs text-[#8A9B95]">Nothing to preview yet.</p>
                        )}
                    </div>
                  )}
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
                <Button variant="outline" size="sm" onClick={() => setIsChapterModalOpen(false)}>
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
