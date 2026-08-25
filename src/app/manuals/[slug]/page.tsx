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
import { getUserManual, saveUserManual, deleteUserManual } from "@/lib/userManuals";
import { isTestingTypesSlug, TestingTypesGuide } from "@/components/manuals/TestingTypesGuide";
import { PLAYWRIGHT_ROADMAP_PHASES, downloadRoadmapSVG } from "@/lib/roadmapData";
import { stripLeadingNumber } from "@/lib/pathwise-data/helpers.js";
import { PinButton, getPinnedItems, PinnedItemMetadata, manualPinId } from "@/components/ui/PinButton";
import { ToolSwitcher } from "@/components/manuals/ToolSwitcher";
import { readerChaptersFromOverlay, testingOverlayForChapter } from "@/components/manuals/testing-types-reader";
import {
  chapterIndexAfter,
  createPart,
  createSubchapter,
  deleteChaptersWithSubs,
  deleteParts,
  displayPartTitle,
  groupChaptersIntoParts,
  isSubchapter,
  mergeChapters,
  mergeParts,
  moveChapterBlock,
  moveChapterToPart,
  moveParts,
  parentIndexOf,
  renamePart,
  tocNumbersForPart,
} from "@/lib/manualParts";

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
  ArrowUp,
  ArrowDown,
  Combine,
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
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const builtin = slug ? findHearthManual(slug) : undefined;
  const [userManual, setUserManual] = useState<ManualItem | undefined>(undefined);
  const [ready, setReady] = useState(() => Boolean(slug && findHearthManual(slug)));

  useEffect(() => {
    if (!slug || findHearthManual(slug)) {
      setReady(true);
      return;
    }
    setUserManual(getUserManual(slug));
    setReady(true);
  }, [slug]);

  if (!ready) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
        <Navbar />
        <main className="max-w-[1440px] mx-auto px-6 py-16 w-full">
          <p className="text-[#52635E]">Loading manual…</p>
        </main>
      </div>
    );
  }

  const seeded = builtin ?? userManual;
  if (!seeded) {
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

  return <GenericManualDetailPage key={seeded.slug} seeded={seeded} />;
}


function GenericManualDetailPage({ seeded }: { seeded: ManualItem }) {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const slug = params?.slug as string;
  const initialManual = seeded;

  // State for editable manual details
  const [manualTitle, setManualTitle] = useState<string>(initialManual.title);
  const [manualDescription, setManualDescription] = useState<string>(initialManual.description);
  const [manualCategory, setManualCategory] = useState<string>(initialManual.category);
  const [manualEstimatedTime, setManualEstimatedTime] = useState<string>(initialManual.estimatedTime);

  const isTestingTypesManual =
    slug === "testing-types" ||
    slug === "testing-types-manual" ||
    isTestingTypesSlug(slug);

  const groupTitle = (index: number, name: string) =>
    displayPartTitle(index, name, isTestingTypesManual ? "chapter" : "part");

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
  const [chapterModalMode, setChapterModalMode] = useState<"add" | "edit" | "add-sub">("add");
  const [editingChapterIndex, setEditingChapterIndex] = useState<number>(0);
  const [selectedPartIndices, setSelectedPartIndices] = useState<number[]>([]);
  const [selectedChapterIndices, setSelectedChapterIndices] = useState<number[]>([]);
  const [isEditingParts, setIsEditingParts] = useState<boolean>(false);
  const [isEditingChapters, setIsEditingChapters] = useState<boolean>(false);
  const [editingPartIndex, setEditingPartIndex] = useState<number | null>(null);
  const [editingPartName, setEditingPartName] = useState<string>("");

  // Form State for Chapter Modal
  const [formChapterTitle, setFormChapterTitle] = useState<string>("");
  const [formChapterSubtitle, setFormChapterSubtitle] = useState<string>("");
  const [formChapterMinutes, setFormChapterMinutes] = useState<number>(15);
  const [formChapterContent, setFormChapterContent] = useState<string>("");
  const [formChapterCode, setFormChapterCode] = useState<string>("");
  const [formChapterRank, setFormChapterRank] = useState<number>(1);
  const [formChapterPartIndex, setFormChapterPartIndex] = useState<number>(0);
  const [contentView, setContentView] = useState<"write" | "preview">("write");
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const chapterEditBackup = useRef<{
    title: string;
    subtitle: string;
    minutes: number;
    content: string;
    code: string;
    rank: number;
    partIndex: number;
  } | null>(null);
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
        if (parsed.chapters && Array.isArray(parsed.chapters) && parsed.chapters.length > 0 && (parsed.tocManaged || !isTestingTypesManual)) {
          setChapters(parsed.chapters);
        }
      } catch (e) {}
    }
    if (isTestingTypesManual) {
      const saved = localStorage.getItem(`hearth_manual_custom_data_${initialManual.id}`);
      let tocManaged = false;
      if (saved) {
        try {
          tocManaged = Boolean(JSON.parse(saved).tocManaged);
        } catch (e) {}
      }
      if (!tocManaged) {
        setChapters(readerChaptersFromOverlay(initialManual.chapters));
      }
    }
  }, [initialManual.id]);

  // Persist edits to localStorage
  const saveCustomDataToStorage = (updatedData: any) => {
    localStorage.setItem(
      `hearth_manual_custom_data_${initialManual.id}`,
      JSON.stringify(updatedData)
    );
  };

  const persistUserManual = (patch: Partial<ManualItem> & { chapters?: ManualChapter[] }) => {
    const um = getUserManual(slug);
    if (!um) return;
    saveUserManual({
      ...um,
      ...patch,
      chapterCount: (patch.chapters || um.chapters).length,
    });
  };

  const persistChapters = (updated: ManualChapter[], keepId?: string) => {
    const id = keepId ?? chapters[activeChapterIndex]?.id;
    setChapters(updated);
    setActiveChapterIndex((prev) => chapterIndexAfter(updated, id, prev));
    saveCustomDataToStorage({
      title: manualTitle,
      description: manualDescription,
      category: manualCategory,
      estimatedTime: manualEstimatedTime,
      chapters: updated,
      tocManaged: true,
    });
    persistUserManual({
      title: manualTitle,
      description: manualDescription,
      category: manualCategory as ManualItem["category"],
      estimatedTime: manualEstimatedTime,
      chapters: updated,
    });
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
  const partGroups = React.useMemo(() => groupChaptersIntoParts(chapters), [chapters]);
  const overlayChapter = React.useMemo(() => {
    if (!isTestingTypesManual) return undefined;
    return testingOverlayForChapter(activeChapter);
  }, [isTestingTypesManual, activeChapter]);
  const activePartGroup = partGroups.find((g) => g.chapterIndices.includes(activeChapterIndex));
  const roadmapParts = React.useMemo(() => {
    return partGroups.map((g) => ({
      id: g.partKey,
      phaseNum: `P${g.index + 1}`,
      title: groupTitle(g.index, g.name),
      nodes: g.chapterIndices.map((idx) => {
        const ch = chapters[idx];
        return {
          num: String(idx + 1),
          title: ch.title,
          chapterIndex: idx,
          time: `${ch.estimatedMinutes} min`,
          level: "All" as string | undefined,
          description: undefined as string | undefined,
        };
      }),
    }));
  }, [partGroups, chapters]);
  const phasesForRoadmap = isPlaywright ? PLAYWRIGHT_ROADMAP_PHASES : roadmapParts;
  const partCount = isPlaywright ? phasesForRoadmap.length : partGroups.length;
  const tocQueryNorm = tocQuery.trim().toLowerCase();
  const filteredPartGroups = React.useMemo(() => {
    if (!tocQueryNorm) return partGroups;
    return partGroups
      .map((g) => {
        const label = groupTitle(g.index, g.name).toLowerCase();
        const partHit = label.includes(tocQueryNorm) || g.name.toLowerCase().includes(tocQueryNorm);
        const chapterIndices = partHit
          ? g.chapterIndices
          : (() => {
              const matched = g.chapterIndices.filter((idx) => {
                const chap = chapters[idx];
                const title = (chap?.title || "").toLowerCase();
                return title.includes(tocQueryNorm) || String(idx + 1).includes(tocQueryNorm);
              });
              const parentIds = new Set(matched.map((i) => chapters[i]?.parentId).filter(Boolean) as string[]);
              const withParents = g.chapterIndices.filter(
                (idx) => matched.includes(idx) || parentIds.has(chapters[idx]?.id || "")
              );
              return withParents;
            })();
        return { ...g, chapterIndices };
      })
      .filter((g) => g.chapterIndices.length > 0);
  }, [partGroups, chapters, tocQueryNorm]);

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
    let prev: Record<string, unknown> = {};
    try {
      prev = JSON.parse(localStorage.getItem(`hearth_manual_custom_data_${initialManual.id}`) || "{}");
    } catch (e) {}
    saveCustomDataToStorage({
      ...prev,
      title: manualTitle,
      description: manualDescription,
      category: manualCategory,
      estimatedTime: manualEstimatedTime,
    });
    persistUserManual({
      title: manualTitle,
      description: manualDescription,
      category: manualCategory as ManualItem["category"],
      estimatedTime: manualEstimatedTime,
    });
    setIsEditManualModalOpen(false);
    toast({ type: "success", title: "Manual Updated", description: "Saved header metadata." });
  };

  // Open Chapter Modal for Adding
  const openAddChapterModal = () => {
    const host = partGroups.find((g) => g.chapterIndices.includes(activeChapterIndex)) || partGroups[partGroups.length - 1];
    setChapterModalMode("add");
    setFormChapterTitle(`Chapter ${chapters.length + 1}: New Chapter`);
    setFormChapterSubtitle(host?.name || "New Part");
    setFormChapterMinutes(15);
    setFormChapterContent("# New Chapter Title\n\nWrite your lesson content here...");
    setFormChapterCode("# Example code snippet\nprint('Hello Playwright!')");
    setFormChapterRank(chapters.length + 1);
    setFormChapterPartIndex(host?.index ?? partGroups.length);
    setContentView("write");
    chapterEditBackup.current = {
      title: `Chapter ${chapters.length + 1}: New Chapter`,
      subtitle: host?.name || "New Part",
      minutes: 15,
      content: "# New Chapter Title\n\nWrite your lesson content here...",
      code: "# Example code snippet\nprint('Hello Playwright!')",
      rank: chapters.length + 1,
      partIndex: host?.index ?? partGroups.length,
    };
    setIsChapterModalOpen(true);
  };

  const openAddSubchapterModal = (parentIdx?: number) => {
    const idx = parentIdx ?? parentIndexOf(chapters, activeChapterIndex);
    const parent = chapters[idx] || chapters[activeChapterIndex];
    if (!parent) return;
    const hostIdx = parent.parentId ? parentIndexOf(chapters, idx) : idx;
    const host = chapters[hostIdx];
    setChapterModalMode("add-sub");
    setEditingChapterIndex(hostIdx);
    setFormChapterTitle("New Sub-chapter");
    setFormChapterSubtitle(host.subtitle || "");
    setFormChapterMinutes(10);
    setFormChapterContent("# New Sub-chapter\n\nWrite the nested lesson here...");
    setFormChapterCode("");
    setFormChapterRank(hostIdx + 2);
    const hostPart = partGroups.find((g) => g.chapterIndices.includes(hostIdx));
    setFormChapterPartIndex(hostPart?.index ?? 0);
    setContentView("write");
    chapterEditBackup.current = {
      title: "New Sub-chapter",
      subtitle: host.subtitle || "",
      minutes: 10,
      content: "# New Sub-chapter\n\nWrite the nested lesson here...",
      code: "",
      rank: hostIdx + 2,
      partIndex: hostPart?.index ?? 0,
    };
    setIsChapterModalOpen(true);
  };

  // Open Chapter Modal for Editing — bind to the clicked chapter, not the expanded one.
  const openEditChapterModal = (idx: number) => {
    const chap = chapters[idx];
    if (!chap) return;
    setChapterModalMode("edit");
    setEditingChapterIndex(idx);
    setActiveChapterIndex(idx);
    setFormChapterTitle(chap.title);
    setFormChapterSubtitle(chap.subtitle || "");
    setFormChapterMinutes(chap.estimatedMinutes || 15);
    setFormChapterContent(chap.contentMarkdown || "");
    setFormChapterCode(chap.codeSnippet || "");
    setFormChapterRank(idx + 1);
    const host = partGroups.find((g) => g.chapterIndices.includes(idx));
    setFormChapterPartIndex(host?.index ?? 0);
    setContentView("write");
    chapterEditBackup.current = {
      title: chap.title,
      subtitle: chap.subtitle || "",
      minutes: chap.estimatedMinutes || 15,
      content: chap.contentMarkdown || "",
      code: chap.codeSnippet || "",
      rank: idx + 1,
      partIndex: host?.index ?? 0,
    };
    setIsChapterModalOpen(true);
  };

  const handleCancelChapterEdit = () => {
    const snap = chapterEditBackup.current;
    if (snap) {
      setFormChapterTitle(snap.title);
      setFormChapterSubtitle(snap.subtitle);
      setFormChapterMinutes(snap.minutes);
      setFormChapterContent(snap.content);
      setFormChapterCode(snap.code);
      setFormChapterRank(snap.rank);
      setFormChapterPartIndex(snap.partIndex);
    }
    chapterEditBackup.current = null;
    setIsChapterModalOpen(false);
    setContentView("write");
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
    let keepId: string | undefined;
    const placeAt = (list: ManualChapter[], from: number, rank: number) => {
      const to = Math.max(0, Math.min(list.length - 1, Math.round(rank) - 1));
      if (from === to) return { list, to };
      const next = [...list];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return { list: next.map((c, i) => ({ ...c, order: i + 1 })), to };
    };

    if (chapterModalMode === "add") {
      const destPart = partGroups[formChapterPartIndex];
      const newChap: ManualChapter = {
        id: `custom-ch-${Date.now()}`,
        order: chapters.length + 1,
        slug: `ch-${chapters.length + 1}`,
        title: formChapterTitle,
        subtitle: destPart?.name || formChapterSubtitle || "New Part",
        partKey: destPart?.partKey || `part-${Date.now()}`,
        estimatedMinutes: formChapterMinutes,
        contentMarkdown: formChapterContent,
        codeSnippet: formChapterCode,
        exercises: [],
        resourceLinks: [],
      };
      const inserted = [...chapters, newChap];
      updatedChapters = moveChapterToPart(inserted, inserted.length - 1, formChapterPartIndex);
      keepId = newChap.id;
      toast({ type: "success", title: "Chapter Created", description: `Added ${newChap.title}.` });
    } else if (chapterModalMode === "add-sub") {
      const parentIdx = editingChapterIndex;
      const parent = chapters[parentIdx];
      const newChap: ManualChapter = {
        id: `custom-sub-${Date.now()}`,
        order: chapters.length + 1,
        slug: `sub-${chapters.length + 1}`,
        title: formChapterTitle,
        subtitle: parent?.subtitle,
        partKey: parent?.partKey,
        parentId: parent?.id,
        estimatedMinutes: formChapterMinutes,
        contentMarkdown: formChapterContent,
        codeSnippet: formChapterCode,
        exercises: [],
        resourceLinks: [],
      };
      updatedChapters = createSubchapter(chapters, parentIdx, newChap);
      keepId = newChap.id;
      toast({ type: "success", title: "Sub-chapter Created", description: `Added ${newChap.title} under ${parent?.title || "chapter"}.` });
    } else {
      const targetIdx = editingChapterIndex;
      const destPart = partGroups[formChapterPartIndex];
      const editing = chapters[targetIdx];
      updatedChapters = chapters.map((chap, idx) => {
        if (idx === targetIdx) {
          return {
            ...chap,
            title: formChapterTitle,
            subtitle: chap.parentId ? chap.subtitle : destPart?.name || formChapterSubtitle,
            estimatedMinutes: formChapterMinutes,
            contentMarkdown: formChapterContent,
            codeSnippet: formChapterCode,
          };
        }
        return chap;
      });
      const currentPart = partGroups.find((g) => g.chapterIndices.includes(targetIdx));
      if (!editing?.parentId && formChapterPartIndex !== (currentPart?.index ?? -1)) {
        updatedChapters = moveChapterToPart(updatedChapters, targetIdx, formChapterPartIndex);
      } else if (!editing?.parentId) {
        const placed = placeAt(updatedChapters, targetIdx, formChapterRank);
        updatedChapters = placed.list;
      }
      keepId = editing?.id;
      toast({ type: "success", title: editing?.parentId ? "Sub-chapter Updated" : "Chapter Updated", description: "Saved changes." });
    }

    persistChapters(updatedChapters, keepId);
    setIsChapterModalOpen(false);
  };

  // Handle Delete Chapter
  const handleDeleteChapter = (idxToDelete: number) => {
    const chapToDelete = chapters[idxToDelete];
    const updated = deleteChaptersWithSubs(chapters, [idxToDelete]);
    if (updated.length === 0) {
      toast({ type: "error", title: "Cannot Delete", description: "Manual must have at least one chapter." });
      return;
    }
    persistChapters(updated, activeChapter.id);
    toast({ type: "info", title: chapToDelete?.parentId ? "Sub-chapter Deleted" : "Chapter Deleted", description: `Removed ${chapToDelete.title}.` });
  };

  const emptyChapter = (): ManualChapter => ({
    id: `custom-ch-${Date.now()}`,
    order: 1,
    slug: "ch-1",
    title: "New Chapter",
    subtitle: "New Part",
    partKey: `part-${Date.now()}`,
    estimatedMinutes: 15,
    contentMarkdown: "# New Chapter\n\nWrite your lesson content here...",
    exercises: [],
    resourceLinks: [],
  });

  const handleCreatePart = () => {
    const after = selectedPartIndices.length ? Math.max(...selectedPartIndices) : partGroups.length - 1;
    const newChap = emptyChapter();
    const updated = createPart(chapters, newChap, after);
    persistChapters(updated, newChap.id);
    setSelectedPartIndices([]);
    setEditingPartIndex(null);
    toast({ type: "success", title: "Part Created", description: `Added ${groupTitle(after + 1, "New Part")}.` });
  };

  const handleDeleteSelectedParts = (indices: number[]) => {
    if (indices.length === 0) return;
    const removing = new Set(indices);
    const gone = partGroups.filter((g) => removing.has(g.index)).reduce((n, g) => n + g.chapterIndices.length, 0);
    if (gone >= chapters.length) {
      const kept = emptyChapter();
      persistChapters([kept], kept.id);
    } else {
      persistChapters(deleteParts(chapters, indices), activeChapter.id);
    }
    setSelectedPartIndices([]);
    setEditingPartIndex(null);
    toast({ type: "info", title: "Part Deleted", description: `Removed ${indices.length} part${indices.length === 1 ? "" : "s"}.` });
  };

  const handleMoveSelectedParts = (direction: -1 | 1) => {
    const ids = selectedPartIndices.length ? selectedPartIndices : [];
    if (ids.length === 0) return;
    const result = moveParts(chapters, ids, direction);
    persistChapters(result.chapters, activeChapter.id);
    setSelectedPartIndices(result.selected);
  };

  const handleMergeSelectedParts = () => {
    if (selectedPartIndices.length < 2) {
      toast({ type: "error", title: "Select parts to merge", description: "Pick two or more parts." });
      return;
    }
    const first = Math.min(...selectedPartIndices);
    const updated = mergeParts(chapters, selectedPartIndices);
    persistChapters(updated, activeChapter.id);
    setSelectedPartIndices([first]);
    setEditingPartIndex(null);
    toast({ type: "success", title: "Parts Merged", description: `Combined into ${groupTitle(first, partGroups[first]?.name || "Part")}.` });
  };

  const handleSavePartRename = () => {
    if (editingPartIndex == null) return;
    persistChapters(renamePart(chapters, editingPartIndex, editingPartName), activeChapter.id);
    setEditingPartIndex(null);
    toast({ type: "success", title: "Part Updated", description: groupTitle(editingPartIndex, editingPartName) });
  };

  const handleCancelPartRename = () => {
    setEditingPartIndex(null);
    setEditingPartName("");
  };

  const togglePartSelected = (index: number) => {
    setSelectedPartIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index].sort((a, b) => a - b)
    );
  };

  const toggleChapterSelected = (index: number) => {
    setSelectedChapterIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index].sort((a, b) => a - b)
    );
  };

  const toggleEditParts = () => {
    if (isEditingParts) {
      setSelectedPartIndices([]);
      setEditingPartIndex(null);
      setIsEditingParts(false);
    } else {
      setIsEditingParts(true);
    }
  };

  const toggleEditChapters = () => {
    if (isEditingChapters) {
      setSelectedChapterIndices([]);
      setIsEditingChapters(false);
    } else {
      setIsEditingChapters(true);
    }
  };

  const handleMoveSelectedChapters = (direction: -1 | 1) => {
    if (selectedChapterIndices.length === 0) return;
    const ids = selectedChapterIndices
      .map((i) => chapters[i]?.id)
      .filter((id): id is string => Boolean(id));
    const skip = new Set(
      ids.filter((id) => {
        const row = chapters.find((c) => c.id === id);
        return Boolean(row?.parentId && ids.includes(row.parentId));
      })
    );
    let next = chapters;
    const walk = direction === -1 ? ids : [...ids].reverse();
    for (const id of walk) {
      if (skip.has(id)) continue;
      const idx = next.findIndex((c) => c.id === id);
      if (idx < 0) continue;
      next = moveChapterBlock(next, idx, direction).chapters;
    }
    persistChapters(next, activeChapter.id);
    setSelectedChapterIndices(ids.map((id) => next.findIndex((c) => c.id === id)).filter((i) => i >= 0).sort((a, b) => a - b));
  };

  const handleMergeSelectedChapters = () => {
    if (selectedChapterIndices.length < 2) {
      toast({ type: "error", title: "Select chapters to merge", description: "Pick two or more chapters." });
      return;
    }
    const keepId = chapters[Math.min(...selectedChapterIndices)]?.id;
    persistChapters(mergeChapters(chapters, selectedChapterIndices), keepId);
    setSelectedChapterIndices([]);
    toast({ type: "success", title: "Chapters Merged", description: "Combined into the first selected chapter." });
  };

  const handleDeleteSelectedChapters = (indices: number[]) => {
    if (indices.length === 0) return;
    const updated = deleteChaptersWithSubs(chapters, indices);
    if (updated.length === 0) {
      const kept = emptyChapter();
      persistChapters([kept], kept.id);
    } else {
      persistChapters(updated, activeChapter.id);
    }
    setSelectedChapterIndices([]);
    toast({ type: "info", title: "Chapter Deleted", description: `Removed ${indices.length} item${indices.length === 1 ? "" : "s"}.` });
  };

  const renderTocChapterRow = (idx: number, nested: boolean, nums: Map<number, string>) => {
    const chap = chapters[idx];
    if (!chap) return null;
    const isActive = idx === activeChapterIndex;
    const displayTitle = stripLeadingNumber(chap.title.replace(/^Chapter\s+\d+:\s*/i, ""));
    const overlayNo = isTestingTypesManual ? /^ch-(\d+)$/.exec(chap.slug || "") : null;
    const tocTitle = overlayNo ? `${displayTitle} (#${Number(overlayNo[1])})` : displayTitle;
    const label = nums.get(idx) || String(idx + 1);
    const sibs = chap.parentId
      ? chapters.map((_, i) => i).filter((i) => chapters[i].parentId === chap.parentId)
      : [];
    let blockEnd = idx + 1;
    while (!chap.parentId && blockEnd < chapters.length && chapters[blockEnd].parentId === chap.id) blockEnd += 1;
    const canUp = chap.parentId ? sibs[0] !== idx : idx > 0;
    const canDown = chap.parentId ? sibs[sibs.length - 1] !== idx : blockEnd < chapters.length;

    return (
      <div
        key={chap.id || idx}
        className={`group flex items-center gap-0.5 rounded-lg ${nested ? "ml-4" : ""} ${
          isActive ? "bg-[#1C2A26]" : "hover:bg-[#F3EDE2]"
        }`}
      >
        {isEditingChapters && (
          <input
            type="checkbox"
            checked={selectedChapterIndices.includes(idx)}
            onChange={() => toggleChapterSelected(idx)}
            className="ml-1 rounded border-[#D4CBBB] text-[#D97706] focus:ring-[#D97706] w-3.5 h-3.5 shrink-0"
            aria-label={`Select ${tocTitle}`}
          />
        )}
        <button
          type="button"
          onClick={() => setActiveChapterIndex(idx)}
          className={`flex-1 min-w-0 text-left px-2 py-2 text-xs sm:text-sm transition-colors flex items-center gap-2 ${
            isActive ? "text-[#FAF7F2] font-semibold" : "text-[#3D4D47] hover:text-[#1C2A26] font-normal"
          } ${nested ? "py-1.5" : ""}`}
          title={tocTitle}
        >
          <span className={`font-mono text-[11px] font-bold shrink-0 min-w-[2.85rem] ${isActive ? "text-[#D97706]" : "text-[#8A9B95]"}`}>
            {label}.
          </span>
          <span className="truncate whitespace-nowrap flex-1 min-w-0">{tocTitle}</span>
        </button>

        {isEditingChapters && (
          <div className="flex items-center shrink-0 pr-1">
            {!nested && (
              <button
                type="button"
                onClick={() => openAddSubchapterModal(idx)}
                className={`p-1 rounded-md transition-colors ${
                  isActive ? "text-amber-400 hover:text-white" : "text-[#8A9B95] hover:text-[#D97706]"
                }`}
                title="Add sub-chapter"
              >
                <Plus className="w-3 h-3" />
              </button>
            )}
            <button
              type="button"
              disabled={!canUp}
              onClick={() => {
                const result = moveChapterBlock(chapters, idx, -1);
                persistChapters(result.chapters, chapters[activeChapterIndex]?.id);
                setSelectedChapterIndices(result.selected);
              }}
              className={`p-1 rounded-md transition-colors disabled:opacity-30 ${
                isActive ? "text-amber-400 hover:text-white" : "text-[#8A9B95] hover:text-[#D97706]"
              }`}
              title={nested ? "Move sub-chapter up" : "Move chapter up"}
            >
              <ArrowUp className="w-3 h-3" />
            </button>
            <button
              type="button"
              disabled={!canDown}
              onClick={() => {
                const result = moveChapterBlock(chapters, idx, 1);
                persistChapters(result.chapters, chapters[activeChapterIndex]?.id);
                setSelectedChapterIndices(result.selected);
              }}
              className={`p-1 rounded-md transition-colors disabled:opacity-30 ${
                isActive ? "text-amber-400 hover:text-white" : "text-[#8A9B95] hover:text-[#D97706]"
              }`}
              title={nested ? "Move sub-chapter down" : "Move chapter down"}
            >
              <ArrowDown className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => openEditChapterModal(idx)}
              className={`p-1 rounded-md transition-colors ${
                isActive ? "text-amber-400 hover:text-white" : "text-[#8A9B95] hover:text-[#D97706]"
              }`}
              title={nested ? "Edit Sub-chapter" : "Edit Chapter"}
            >
              <Edit className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => handleDeleteChapter(idx)}
              className={`p-1 rounded-md transition-colors ${
                isActive ? "text-amber-400 hover:text-red-400" : "text-[#8A9B95] hover:text-red-600"
              }`}
              title={nested ? "Delete Sub-chapter" : "Delete Chapter"}
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    );
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
              <Link href="/manuals?new=1">
                <Button variant="outline" size="sm" leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#D97706]" />}>
                  New with AI
                </Button>
              </Link>
              {getUserManual(slug) && (
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Trash2 className="w-3.5 h-3.5 text-rose-600" />}
                  onClick={() => {
                    if (!window.confirm(`Delete “${manualTitle}”? This cannot be undone.`)) return;
                    if (!deleteUserManual(slug)) {
                      toast({ type: "error", title: "Could not delete", description: "Only manuals you created can be removed." });
                      return;
                    }
                    toast({ type: "info", title: "Manual deleted", description: `Removed “${manualTitle}”.` });
                    router.push("/manuals");
                  }}
                >
                  Delete
                </Button>
              )}
              <PinButton
                itemId={manualPinId(slug)}
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
                <span>{partCount} {isTestingTypesManual ? "Chapters" : "Parts"}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#52635E] bg-white px-3 py-1 rounded-lg border border-[#E7E0D3] shadow-2xs">
                <BookOpen className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>
                  {isTestingTypesManual
                    ? `${chapters.filter((c) => /^ch-\d+$/.test(c.slug || "")).length} Types`
                    : `${totalChapters} Chapters`}
                </span>
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
              <div className="flex flex-wrap items-center justify-between gap-2 px-2.5 pt-2.5 pb-2 border-b border-[#E7E0D3]">
                <div className="flex items-center gap-1.5 text-xs font-serif-display font-bold text-[#1C2A26] tracking-wider uppercase min-w-0">
                  <BookOpen className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span className="truncate">Table of Contents</span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 shrink-0 justify-end">
                  <button
                    type="button"
                    onClick={toggleEditParts}
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg ${
                      isEditingParts
                        ? "text-white bg-[#1C2A26]"
                        : "text-[#1C2A26] bg-white border border-[#E7E0D3] hover:border-[#D97706]"
                    }`}
                    title="Edit parts"
                  >
                    <SquarePen className="w-3.5 h-3.5 text-[#D97706]" />
                    Edit Part
                  </button>
                  <button
                    type="button"
                    onClick={toggleEditChapters}
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg ${
                      isEditingChapters
                        ? "text-white bg-[#1C2A26]"
                        : "text-[#D97706] bg-white border border-[#E7E0D3] hover:border-[#D97706]"
                    }`}
                    title="Edit chapters"
                  >
                    <SquarePen className="w-3.5 h-3.5" />
                    Edit Chapter
                  </button>
                  <button
                    type="button"
                    onClick={openAddChapterModal}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D97706] bg-white border border-[#E7E0D3] hover:border-[#D97706] px-2 py-1 rounded-lg"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Chapter
                  </button>
                  <button
                    type="button"
                    onClick={() => openAddSubchapterModal()}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D97706] bg-white border border-[#E7E0D3] hover:border-[#D97706] px-2 py-1 rounded-lg"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Sub-chapter
                  </button>
                </div>
              </div>

              {isEditingParts && (
              <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-[#E7E0D3] bg-white">
                <span className="text-[10px] font-bold text-[#52635E] mr-1">
                  {selectedPartIndices.length > 0 ? `${selectedPartIndices.length} parts` : "Select parts"}
                </span>
                <button type="button" onClick={handleCreatePart} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-[#E7E0D3] bg-[#1C2A26] text-white" title="Add part">
                  <Plus className="w-3 h-3 text-[#D97706]" /> Part
                </button>
                <button type="button" onClick={() => handleMoveSelectedParts(-1)} disabled={selectedPartIndices.length === 0} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-[#E7E0D3] bg-[#FAF7F2] hover:border-[#D97706] disabled:opacity-40" title="Move up">
                  <ArrowUp className="w-3 h-3" /> Up
                </button>
                <button type="button" onClick={() => handleMoveSelectedParts(1)} disabled={selectedPartIndices.length === 0} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-[#E7E0D3] bg-[#FAF7F2] hover:border-[#D97706] disabled:opacity-40" title="Move down">
                  <ArrowDown className="w-3 h-3" /> Down
                </button>
                <button
                  type="button"
                  onClick={handleMergeSelectedParts}
                  disabled={selectedPartIndices.length < 2}
                  className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-[#E7E0D3] bg-[#FAF7F2] hover:border-[#D97706] disabled:opacity-40"
                  title="Merge selected parts"
                >
                  <Combine className="w-3 h-3" /> Merge
                </button>
                <button type="button" onClick={() => handleDeleteSelectedParts(selectedPartIndices)} disabled={selectedPartIndices.length === 0} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 disabled:opacity-40" title="Delete selected">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
                {selectedPartIndices.length > 0 && (
                  <button type="button" onClick={() => setSelectedPartIndices([])} className="ml-auto text-[10px] font-bold text-[#8A9B95] hover:text-[#1C2A26]">
                    Clear
                  </button>
                )}
              </div>
              )}

              {isEditingChapters && (
              <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-[#E7E0D3] bg-white">
                <span className="text-[10px] font-bold text-[#52635E] mr-1">
                  {selectedChapterIndices.length > 0 ? `${selectedChapterIndices.length} chapters` : "Select chapters"}
                </span>
                <button type="button" onClick={() => handleMoveSelectedChapters(-1)} disabled={selectedChapterIndices.length === 0} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-[#E7E0D3] bg-[#FAF7F2] hover:border-[#D97706] disabled:opacity-40" title="Move up">
                  <ArrowUp className="w-3 h-3" /> Up
                </button>
                <button type="button" onClick={() => handleMoveSelectedChapters(1)} disabled={selectedChapterIndices.length === 0} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-[#E7E0D3] bg-[#FAF7F2] hover:border-[#D97706] disabled:opacity-40" title="Move down">
                  <ArrowDown className="w-3 h-3" /> Down
                </button>
                <button
                  type="button"
                  onClick={handleMergeSelectedChapters}
                  disabled={selectedChapterIndices.length < 2}
                  className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-[#E7E0D3] bg-[#FAF7F2] hover:border-[#D97706] disabled:opacity-40"
                  title="Merge selected chapters"
                >
                  <Combine className="w-3 h-3" /> Merge
                </button>
                <button type="button" onClick={() => handleDeleteSelectedChapters(selectedChapterIndices)} disabled={selectedChapterIndices.length === 0} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 disabled:opacity-40" title="Delete selected">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
                {selectedChapterIndices.length > 0 && (
                  <button type="button" onClick={() => setSelectedChapterIndices([])} className="ml-auto text-[10px] font-bold text-[#8A9B95] hover:text-[#1C2A26]">
                    Clear
                  </button>
                )}
              </div>
              )}

              <div className="relative px-2 pt-2">
                <Search className="w-3.5 h-3.5 text-[#8A9B95] absolute left-4 top-[1.125rem] pointer-events-none" />
                <input
                  type="search"
                  value={tocQuery}
                  onChange={(e) => setTocQuery(e.target.value)}
                  placeholder="Search parts, chapters, sub-chapters…"
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
                {filteredPartGroups.length === 0 && (
                  <p className="text-xs text-[#8A9B95] px-1.5">No matching chapters.</p>
                )}
                {filteredPartGroups.map((part) => (
                  <div key={part.partKey} className="space-y-0.5">
                    <div className={`flex items-center gap-1 px-1.5 py-1 rounded-lg ${isEditingParts ? "bg-white border border-[#E7E0D3]" : ""}`}>
                      {isEditingParts && (
                      <input
                        type="checkbox"
                        checked={selectedPartIndices.includes(part.index)}
                        onChange={() => togglePartSelected(part.index)}
                        className="rounded border-[#D4CBBB] text-[#D97706] focus:ring-[#D97706] w-3.5 h-3.5 shrink-0"
                        aria-label={`Select ${groupTitle(part.index, part.name)}`}
                      />
                      )}
                      {editingPartIndex === part.index ? (
                        <div className="flex items-center gap-1 flex-1 min-w-0">
                          <input
                            autoFocus
                            value={editingPartName}
                            onChange={(e) => setEditingPartName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSavePartRename();
                              if (e.key === "Escape") handleCancelPartRename();
                            }}
                            className="flex-1 min-w-0 px-1.5 py-0.5 rounded border border-[#D97706] bg-white text-[10px] font-bold text-[#1C2A26]"
                          />
                          <button type="button" onClick={handleSavePartRename} className="p-0.5 text-emerald-700" title="Save part name">
                            <Check className="w-3 h-3" />
                          </button>
                          <button type="button" onClick={handleCancelPartRename} className="p-0.5 text-[#8A9B95]" title="Cancel">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="flex-1 min-w-0 px-1 text-[11px] font-bold tracking-wide text-[#D97706] truncate" title={groupTitle(part.index, part.name)}>
                            {groupTitle(part.index, part.name)}
                          </p>
                          {isEditingParts && (
                          <>
                          <button
                            type="button"
                            disabled={part.index === 0}
                            onClick={() => {
                              const result = moveParts(chapters, [part.index], -1);
                              persistChapters(result.chapters, chapters[activeChapterIndex]?.id);
                              setSelectedPartIndices((prev) => {
                                if (!prev.length) return prev;
                                const next = new Set(prev);
                                if (next.has(part.index)) {
                                  next.delete(part.index);
                                  result.selected.forEach((i) => next.add(i));
                                }
                                return [...next].sort((a, b) => a - b);
                              });
                            }}
                            className="p-1 rounded-md bg-[#FAF7F2] text-[#52635E] hover:text-[#D97706] hover:bg-[#F5EFE6] disabled:opacity-30"
                            title="Move part up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={part.index === partGroups.length - 1}
                            onClick={() => {
                              const result = moveParts(chapters, [part.index], 1);
                              persistChapters(result.chapters, chapters[activeChapterIndex]?.id);
                              setSelectedPartIndices((prev) => {
                                if (!prev.length) return prev;
                                const next = new Set(prev);
                                if (next.has(part.index)) {
                                  next.delete(part.index);
                                  result.selected.forEach((i) => next.add(i));
                                }
                                return [...next].sort((a, b) => a - b);
                              });
                            }}
                            className="p-1 rounded-md bg-[#FAF7F2] text-[#52635E] hover:text-[#D97706] hover:bg-[#F5EFE6] disabled:opacity-30"
                            title="Move part down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingPartIndex(part.index);
                              setEditingPartName(part.name);
                            }}
                            className="p-1 rounded-md bg-[#FAF7F2] text-[#52635E] hover:text-[#D97706] hover:bg-[#F5EFE6]"
                            title="Edit part name"
                          >
                            <SquarePen className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSelectedParts([part.index])}
                            className="p-1 rounded-md bg-[#FAF7F2] text-[#52635E] hover:text-red-600 hover:bg-rose-50"
                            title="Delete part"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          </>
                          )}
                        </>
                      )}
                    </div>
                    {(() => {
                      const nums = tocNumbersForPart(
                        chapters,
                        part.chapterIndices,
                        isTestingTypesManual ? part.index + 1 : undefined
                      );
                      return part.chapterIndices.map((idx) => {
                        const chap = chapters[idx];
                        if (!chap || chap.parentId) return null;
                        const subs = part.chapterIndices.filter((i) => chapters[i]?.parentId === chap.id);
                        return (
                          <div key={chap.id || idx} className="space-y-0.5">
                            {renderTocChapterRow(idx, false, nums)}
                            {subs.map((sIdx) => renderTocChapterRow(sIdx, true, nums))}
                          </div>
                        );
                      });
                    })()}
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
                    {isSubchapter(activeChapter) ? "Sub-chapter" : "Lesson"} {activeChapterIndex + 1} of {totalChapters}
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
                    onClick={() => openEditChapterModal(activeChapterIndex)}
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
                {activePartGroup ? (
                  <p className="font-serif-display text-xs sm:text-sm font-semibold text-[#D97706]">
                    {groupTitle(activePartGroup.index, activePartGroup.name)}
                  </p>
                ) : activeChapter.subtitle ? (
                  <p className="font-serif-display text-xs sm:text-sm font-semibold text-[#D97706]">
                    {activeChapter.subtitle}
                  </p>
                ) : null}
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
                  {(overlayChapter?.desc || activeChapter.overviewText) && (
                    <p className="text-xs sm:text-sm text-[#52635E] leading-relaxed font-sans">
                      {overlayChapter?.desc || activeChapter.overviewText}
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
                        {overlayChapter?.why || activeChapter.why}
                      </p>
                    </div>

                    <div className="p-4 sm:p-5 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] space-y-2 shadow-2xs">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#D97706]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                        <span>When to use it</span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#52635E] leading-relaxed">
                        {overlayChapter?.when || activeChapter.when}
                      </p>
                    </div>
                  </div>

                  {/* Practical Example Block (8080 Format) */}
                  {(overlayChapter?.practical || activeChapter.practical) && (
                    <div className="p-4 sm:p-5 rounded-xl border border-[#D0E2FF] bg-[#F4F8FF] space-y-3 shadow-2xs">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0062D2]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0062D2]" />
                        <span>Practical Example</span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#1C2A26] leading-relaxed">
                        <strong className="font-bold text-[#0F172A]">
                          {(overlayChapter?.practical || activeChapter.practical)?.app}
                        </strong> — {(overlayChapter?.practical || activeChapter.practical)?.scenario}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {(overlayChapter?.practical || activeChapter.practical)?.fail ? (
                        <div className="p-3.5 rounded-xl border border-rose-200 border-t-2 border-t-rose-500 bg-white space-y-1 shadow-2xs">
                          <span className="block font-mono text-[10px] uppercase tracking-wider font-bold text-rose-700">
                            {(overlayChapter?.practical as { failLabel?: string } | undefined)?.failLabel || "Fail Condition"}
                          </span>
                          <p className="text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed">
                            {(overlayChapter?.practical || activeChapter.practical)?.fail}
                          </p>
                        </div>
                        ) : null}

                        {(overlayChapter?.practical || activeChapter.practical)?.pass ? (
                        <div className="p-3.5 rounded-xl border border-emerald-200 border-t-2 border-t-emerald-500 bg-white space-y-1 shadow-2xs">
                          <span className="block font-mono text-[10px] uppercase tracking-wider font-bold text-emerald-700">
                            {(overlayChapter?.practical as { passLabel?: string } | undefined)?.passLabel || "Pass Condition"}
                          </span>
                          <p className="text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed">
                            {(overlayChapter?.practical || activeChapter.practical)?.pass}
                          </p>
                        </div>
                        ) : null}

                        {(overlayChapter?.practical as { value?: string } | undefined)?.value ? (
                        <div className="p-3.5 rounded-xl border border-sky-200 border-t-2 border-t-sky-500 bg-white space-y-1 shadow-2xs sm:col-span-2">
                          <span className="block font-mono text-[10px] uppercase tracking-wider font-bold text-sky-700">
                            Value delivered
                          </span>
                          <p className="text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed">
                            {(overlayChapter?.practical as { value?: string }).value}
                          </p>
                        </div>
                        ) : null}
                      </div>
                    </div>
                  )}

                  {/* General Level Advantages & Limitations */}
                  {overlayChapter?.advantages && overlayChapter?.limitations && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className="p-4 sm:p-5 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] space-y-2 shadow-2xs">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          <span>Advantages</span>
                        </div>
                        <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#52635E] pl-4 list-disc marker:text-emerald-600/70 leading-relaxed">
                          {overlayChapter.advantages!.map((adv, ai) => (
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
                          {overlayChapter.limitations!.map((lim, li) => (
                            <li key={li}>{lim}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Interactive Tool Switcher (Exact 8080 Design) */}
                  {(overlayChapter?.tools || activeChapter.tools) && (
                    <div className="pt-1">
                      <ToolSwitcher
                        tools={overlayChapter?.tools || activeChapter.tools!}
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
            onClick={handleCancelChapterEdit}
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
                  <span>
                    {chapterModalMode === "add"
                      ? "Add New Chapter"
                      : chapterModalMode === "add-sub"
                        ? "Add Sub-chapter"
                        : isSubchapter(chapters[editingChapterIndex])
                          ? "Edit Sub-chapter"
                          : "Edit Chapter"}
                  </span>
                </h3>
                <button onClick={handleCancelChapterEdit} className="text-[#8A9B95] hover:text-[#1C2A26]" title="Cancel">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 font-sans text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-[#1C2A26] mb-1">
                      {chapterModalMode === "add-sub" || isSubchapter(chapters[editingChapterIndex])
                        ? "Sub-chapter Title"
                        : "Chapter Title"}
                    </label>
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

                {chapterModalMode === "add-sub" || isSubchapter(chapters[editingChapterIndex]) ? (
                  <p className="text-xs text-[#52635E] leading-relaxed">
                    Nested under{" "}
                    <span className="font-bold text-[#1C2A26]">
                      {chapters[chapterModalMode === "add-sub" ? editingChapterIndex : parentIndexOf(chapters, editingChapterIndex)]?.title}
                    </span>
                  </p>
                ) : (
                <>
                <div>
                  <label className="block font-bold text-[#1C2A26] mb-1">Part</label>
                  <select
                    value={formChapterPartIndex}
                    onChange={(e) => {
                      const next = Number(e.target.value);
                      setFormChapterPartIndex(next);
                      const dest = partGroups[next];
                      setFormChapterSubtitle(dest?.name || "New Part");
                    }}
                    className="w-full p-3 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] focus:outline-none focus:border-[#D97706]"
                  >
                    {partGroups.map((g) => (
                      <option key={g.partKey} value={g.index}>
                        {groupTitle(g.index, g.name)}
                      </option>
                    ))}
                    <option value={partGroups.length}>New part</option>
                  </select>
                  <p className="mt-1 text-[11px] text-[#8A9B95]">
                    Move this chapter into another part. Numbers update from the new order.
                  </p>
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
                </>
                )}

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
                <Button variant="outline" size="sm" onClick={handleCancelChapterEdit} title="Discard unsaved changes">
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleSaveChapter} leftIcon={<Save className="w-4 h-4" />}>
                  {chapterModalMode === "add"
                    ? "Create Chapter"
                    : chapterModalMode === "add-sub"
                      ? "Create Sub-chapter"
                      : "Save"}
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
