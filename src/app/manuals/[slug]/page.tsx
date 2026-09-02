"use client";

/* PAGE: /manuals/[slug]  — reader for one manual (this file). Catalog: ../page.tsx. Map: ../page_details-code_routes.md */

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { MANUALS_DATA, findHearthManual, chapterCustomSummary, type ManualItem, type ManualChapter } from "@/app/manuals/types";
import { getUserManual, saveUserManual, removeCatalogManual } from "@/app/manuals/features/local-storage";
import { isTestingTypesSlug } from "@/app/manuals/types/testing-types/TestingTypesManual";
import { PLAYWRIGHT_ROADMAP_PHASES, downloadRoadmapSVG } from "@/app/manuals/types/playwright/roadmapData";
import { stripLeadingNumber } from "@/app/manuals/registry";
import { PinButton, getPinnedItems, PinnedItemMetadata, manualPinId } from "@/components/ui/PinButton";
import { ManualExportMenu } from "@/app/manuals/features/export";
import { ChapterContentEditor } from "@/app/manuals/features/edit/ChapterContentEditor";
import { ChapterFullContent } from "@/app/manuals/features/ChapterFullContent";
import { ChapterActivitiesPanel, ChapterSummaryPanel } from "@/app/manuals/features/ChapterReaderPanels";
import { kebabItems, KebabMenu } from "@/app/manuals/features/catalog";
import { Highlightable, addHighlight, deleteManualHighlight, fetchManualHighlights, highlightsForField, lastAdded, mergeHighlightStores, parseHighlightStore, postManualHighlight, removeHighlight, wrapHighlightHtml, type HighlightStore } from "@/app/manuals/features/highlights";
import { listedCategories, subscribeCategories, TagInput } from "@/app/manuals/features/categorization";
import { usePermissions, useAppUserId } from "@/lib/useAuthz";
import { highlightsStoreKey, isScopeReady, progressStoreKey, readScopedRaw, writeScopedRaw } from "@/lib/userScope";
import { getResume, pushAccountProgress, setResume, touchRecentManual } from "@/lib/readerMemory";
import { saveChapterToDisk } from "@/app/manuals/features/edit/chapterDisk";
import { KEPT_BUILTIN_SLUGS } from "@/app/manuals/registry";
import {
  readerChaptersFromToc,
  mergeCustomTestingTypesChapters,
  mergeTestingTypesSavedEdits,
  getBuiltinTocVersion,
  restoreTocCatalog,
  tocCatalogSaveFields,
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
} from "@/app/manuals/features/reader";

import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  BookOpen,
  ExternalLink,
  Sparkles,
  Check,
  Compass,
  HelpCircle,
  ChevronDown,
  Layers,
  SquarePen,
  Trash2,
  Plus,
  X,
  ArrowUp,
  ArrowDown,
  Combine,
  FileText,
  Download,
  MapPin,
  CheckSquare,
  Search,
  Target,
  Award,
  Info,
  Pin,
  Undo2,
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
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const perms = usePermissions();
  const userId = useAppUserId();

  const slug = params?.slug as string;
  const initialManual = seeded;

  // State for editable manual details
  const [manualTitle, setManualTitle] = useState<string>(initialManual.title);
  const [manualDescription, setManualDescription] = useState<string>(initialManual.description);
  const [manualCategory, setManualCategory] = useState<string>(initialManual.category);
  const [manualTags, setManualTags] = useState<string[]>(initialManual.tags || []);
  const [manualEstimatedTime, setManualEstimatedTime] = useState<string>(initialManual.estimatedTime);
  const [manualCoverImage, setManualCoverImage] = useState<string>(initialManual.coverImage || "");
  const [categoryOptions, setCategoryOptions] = useState<string[]>(() => listedCategories());

  const isTestingTypesManual =
    slug === "testing-types" ||
    slug === "testing-types-manual" ||
    isTestingTypesSlug(slug);

  const groupTitle = (index: number, name: string) =>
    displayPartTitle(index, name, isTestingTypesManual ? "chapter" : "part");

  // Testing Types TOC must follow TESTING_TYPES_CHAPTERS, not a stale localStorage snapshot (was freezing at 64).
  const catalogChapters = isTestingTypesManual
    ? readerChaptersFromToc(initialManual.chapters)
    : initialManual.chapters;

  // State for editable chapters list
  const [chapters, setChapters] = useState<ManualChapter[]>(catalogChapters);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [prevChapterIndex, setPrevChapterIndex] = useState<number | null>(null);
  const [completedChapterIds, setCompletedChapterIds] = useState<string[]>([]);
  const [quizText, setQuizText] = useState("");
  const [quizBusy, setQuizBusy] = useState(false);
  const resumeOnce = useRef(false);

  useEffect(() => {
    setQuizText("");
  }, [activeChapterIndex]);

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
  const [viewMode, setViewMode] = useState<"full" | "summary" | "activities">("full");

  // Overlay + chapter edit (no dialogs)
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState<boolean>(false);
  const [chapterEdit, setChapterEdit] = useState(false);
  const [saveHint, setSaveHint] = useState<"" | "Saving…" | "Saved" | "Undone">("");
  const [selectedPartIndices, setSelectedPartIndices] = useState<number[]>([]);
  const [selectedChapterIndices, setSelectedChapterIndices] = useState<number[]>([]);
  const [tocEdit, setTocEdit] = useState<null | "part" | "chapter" | "sub">(null);
  const [tocEditOpen, setTocEditOpen] = useState(false);
  const [editingPartIndex, setEditingPartIndex] = useState<number | null>(null);
  const [editingPartName, setEditingPartName] = useState<string>("");
  const isEditingParts = tocEdit === "part";
  const isEditingChapters = tocEdit === "chapter";
  const isEditingSubs = tocEdit === "sub";

  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingSave = useRef<ManualChapter[] | null>(null);
  const pendingMeta = useRef<{ title: string; description: string; category: string; estimatedTime: string; tags: string[]; coverImage: string } | null>(null);
  const chapterEditSnapshot = useRef<{
    chapters: ManualChapter[];
    meta: { title: string; description: string; category: string; estimatedTime: string; tags: string[]; coverImage: string };
  } | null>(null);
  type EditSnapshot = {
    chapters: ManualChapter[];
    meta: { title: string; description: string; category: string; estimatedTime: string; tags: string[]; coverImage: string };
    activeChapterIndex: number;
    selectedChapterIndices: number[];
    selectedPartIndices: number[];
  };
  const editUndoStack = useRef<EditSnapshot[]>([]);
  const contentUndoPushed = useRef(false);
  const metaUndoPushed = useRef(false);
  const [undoStackLen, setUndoStackLen] = useState(0);
  const [pinnedShowcase, setPinnedShowcase] = useState<PinnedItemMetadata[]>([]);
  const [highlights, setHighlights] = useState<HighlightStore>({});

  useEffect(() => subscribeCategories(setCategoryOptions), []);

  useEffect(() => {
    const updatePins = () => {
      setPinnedShowcase(getPinnedItems().filter((p) => p.type === "showcase"));
    };
    updatePins();
    window.addEventListener("hearth_pins_updated", updatePins);
    return () => window.removeEventListener("hearth_pins_updated", updatePins);
  }, []);

  // Builtin manuals: disk catalog is source of truth — purge stale localStorage even when logged out
  useEffect(() => {
    const tocVersion = getBuiltinTocVersion(slug);
    if (tocVersion == null) return;

    const storageKey = `hearth_manual_custom_data_${initialManual.id}`;
    let parsed: Record<string, unknown> | null = null;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) parsed = JSON.parse(raw);
    } catch {
      parsed = null;
    }

    const versionOk = parsed ? restoreTocCatalog(parsed, tocVersion) : false;
    if (parsed && !versionOk) {
      // ponytail: full wipe — old snapshots stored title, tagline, hours, and all 57 chapters
      localStorage.removeItem(storageKey);
      parsed = null;
      setManualTitle(initialManual.title);
      setManualDescription(initialManual.description);
      setManualCategory(initialManual.category);
      setManualTags(initialManual.tags || []);
      setManualEstimatedTime(initialManual.estimatedTime);
      setManualCoverImage(initialManual.coverImage || "");
    } else if (parsed) {
      if (parsed.title) setManualTitle(String(parsed.title));
      if (parsed.description) setManualDescription(String(parsed.description));
      if (parsed.category) setManualCategory(String(parsed.category));
      if (Array.isArray(parsed.tags)) setManualTags(parsed.tags.filter((t) => typeof t === "string"));
      if (parsed.estimatedTime) setManualEstimatedTime(String(parsed.estimatedTime));
      if (parsed.coverImage) setManualCoverImage(String(parsed.coverImage));
    }

    let next = isTestingTypesManual
      ? readerChaptersFromToc(initialManual.chapters)
      : catalogChapters;
    const saved = parsed && Array.isArray(parsed.chapters) ? (parsed.chapters as ManualChapter[]) : [];
    if (saved.length && versionOk) {
      next = mergeTestingTypesSavedEdits(next, saved);
      if (isTestingTypesManual) next = mergeCustomTestingTypesChapters(next, saved);
    }
    setChapters(next);
  }, [slug, initialManual.id, initialManual.title, initialManual.description, initialManual.category, initialManual.tags, initialManual.estimatedTime, initialManual.chapters, catalogChapters, isTestingTypesManual]);

  // Progress & highlights (scoped per signed-in user)
  useEffect(() => {
    if (!isScopeReady() || !userId) return;
    const savedProgress = readScopedRaw(progressStoreKey(initialManual.id));
    if (savedProgress) {
      try {
        setCompletedChapterIds(JSON.parse(savedProgress));
      } catch (e) {}
    } else {
      setCompletedChapterIds([]);
    }
    setHighlights(parseHighlightStore(readScopedRaw(highlightsStoreKey(initialManual.id))));
    void fetchManualHighlights(catalogChapters.map((c) => c.id).concat(chapters.map((c) => c.id))).then((remote) => {
      if (Object.keys(remote).length === 0) return;
      setHighlights((local) => {
        const merged = mergeHighlightStores(local, remote);
        writeScopedRaw(highlightsStoreKey(initialManual.id), JSON.stringify(merged));
        return merged;
      });
    });
  }, [initialManual.id, userId, catalogChapters, chapters]);

  useEffect(() => {
    if (!slug) return;
    touchRecentManual(slug, manualTitle || initialManual.title);
  }, [slug, manualTitle, initialManual.title]);

  useEffect(() => {
    if (resumeOnce.current || !chapters.length) return;
    const resume = getResume(slug);
    if (resume?.chapterIndex != null && resume.chapterIndex >= 0 && resume.chapterIndex < chapters.length) {
      setActiveChapterIndex(resume.chapterIndex);
      if (resume.scroll) window.scrollTo({ top: resume.scroll, behavior: "instant" as ScrollBehavior });
    }
    resumeOnce.current = true;
  }, [slug, chapters.length]);

  useEffect(() => {
    if (!resumeOnce.current || !slug) return;
    const chap = chapters[activeChapterIndex];
    setResume(slug, { chapterId: chap?.id, chapterIndex: activeChapterIndex, scroll: typeof window !== "undefined" ? window.scrollY : 0 });
  }, [slug, activeChapterIndex]);

  useEffect(() => {
    const onScroll = () => {
      const chap = chapters[activeChapterIndex];
      setResume(slug, { chapterId: chap?.id, chapterIndex: activeChapterIndex, scroll: window.scrollY });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug, activeChapterIndex, chapters]);

  useEffect(() => {
    document.querySelector(`[data-toc-idx="${activeChapterIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [activeChapterIndex]);

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

  const isEditSession = () => chapterEdit || tocEditOpen || tocEdit != null;
  const inAnyEditMode = chapterEdit || tocEditOpen;

  const captureEditSnapshot = (): EditSnapshot => ({
    chapters: JSON.parse(JSON.stringify(chapters)),
    meta: {
      title: manualTitle,
      description: manualDescription,
      category: manualCategory,
      estimatedTime: manualEstimatedTime,
      tags: manualTags,
      coverImage: manualCoverImage,
    },
    activeChapterIndex,
    selectedChapterIndices: [...selectedChapterIndices],
    selectedPartIndices: [...selectedPartIndices],
  });

  const clearEditUndo = () => {
    editUndoStack.current = [];
    contentUndoPushed.current = false;
    metaUndoPushed.current = false;
    setUndoStackLen(0);
  };

  const pushEditUndo = () => {
    if (!isEditSession()) return;
    editUndoStack.current.push(captureEditSnapshot());
    // ponytail: cap at 50 steps; older entries drop off
    if (editUndoStack.current.length > 50) editUndoStack.current.shift();
    setUndoStackLen(editUndoStack.current.length);
  };

  const undoLastEdit = () => {
    const snap = editUndoStack.current.pop();
    if (!snap) return;
    setUndoStackLen(editUndoStack.current.length);
    contentUndoPushed.current = false;
    metaUndoPushed.current = false;
    if (persistTimer.current) {
      clearTimeout(persistTimer.current);
      persistTimer.current = null;
    }
    pendingSave.current = null;
    pendingMeta.current = null;
    setManualTitle(snap.meta.title);
    setManualDescription(snap.meta.description);
    setManualCategory(snap.meta.category);
    setManualEstimatedTime(snap.meta.estimatedTime);
    setManualTags(snap.meta.tags || []);
    setManualCoverImage(snap.meta.coverImage || "");
    setSelectedChapterIndices(snap.selectedChapterIndices);
    setSelectedPartIndices(snap.selectedPartIndices);
    setActiveChapterIndex(snap.activeChapterIndex);
    setChapters(snap.chapters);
    saveCustomDataToStorage({
      title: snap.meta.title,
      description: snap.meta.description,
      category: snap.meta.category,
      estimatedTime: snap.meta.estimatedTime,
      tags: snap.meta.tags,
      coverImage: snap.meta.coverImage,
      chapters: snap.chapters,
      ...tocCatalogSaveFields(slug),
    });
    persistUserManual({
      title: snap.meta.title,
      description: snap.meta.description,
      category: snap.meta.category,
      estimatedTime: snap.meta.estimatedTime,
      tags: snap.meta.tags,
      coverImage: snap.meta.coverImage,
      chapters: snap.chapters,
    });
    setSaveHint("Undone");
  };

  const persistChapters = (updated: ManualChapter[], keepId?: string, opts?: { skipUndo?: boolean }) => {
    if (!perms.canStructure) return;
    if (!opts?.skipUndo) pushEditUndo();
    if (persistTimer.current) {
      clearTimeout(persistTimer.current);
      persistTimer.current = null;
    }
    pendingSave.current = null;
    const meta = pendingMeta.current;
    pendingMeta.current = null;
    const id = keepId ?? chapters[activeChapterIndex]?.id;
    setChapters(updated);
    setActiveChapterIndex((prev) => chapterIndexAfter(updated, id, prev));
    const title = meta?.title ?? manualTitle;
    const description = meta?.description ?? manualDescription;
    const category = meta?.category ?? manualCategory;
    const estimatedTime = meta?.estimatedTime ?? manualEstimatedTime;
    const tags = meta?.tags ?? manualTags;
    const coverImage = meta?.coverImage ?? manualCoverImage;
    saveCustomDataToStorage({
      title,
      description,
      category,
      estimatedTime,
      tags,
      coverImage,
      chapters: updated,
      ...tocCatalogSaveFields(slug),
    });
    persistUserManual({
      title,
      description,
      category,
      estimatedTime,
      tags,
      coverImage,
      chapters: updated,
    });
    setSaveHint("Saved");
  };

  const commitPending = () => {
    if (persistTimer.current) {
      clearTimeout(persistTimer.current);
      persistTimer.current = null;
    }
    const nextChapters = pendingSave.current;
    const meta = pendingMeta.current;
    pendingSave.current = null;
    pendingMeta.current = null;
    if (!nextChapters && !meta) return;
    contentUndoPushed.current = false;
    metaUndoPushed.current = false;
    const ch = nextChapters || chapters;
    const m = meta || {
      title: manualTitle,
      description: manualDescription,
      category: manualCategory,
      estimatedTime: manualEstimatedTime,
      tags: manualTags,
      coverImage: manualCoverImage,
    };
    saveCustomDataToStorage({
      ...m,
      chapters: ch,
      ...tocCatalogSaveFields(slug),
    });
    persistUserManual({
      title: m.title,
      description: m.description,
      category: m.category,
      estimatedTime: m.estimatedTime,
      tags: m.tags,
      coverImage: m.coverImage,
      chapters: ch,
    });
    setSaveHint("Saved");
    if ((KEPT_BUILTIN_SLUGS as readonly string[]).includes(slug)) {
      const savedCh = ch[activeChapterIndex];
      if (savedCh?.sourceFile) void saveChapterToDisk(slug, savedCh);
    }
  };

  const scheduleChapterSave = (updated: ManualChapter[]) => {
    pendingSave.current = updated;
    setSaveHint("Saving…");
    if (persistTimer.current) clearTimeout(persistTimer.current);
    persistTimer.current = setTimeout(() => {
      persistTimer.current = null;
      commitPending();
    }, 400);
  };

  const patchActiveChapter = (patch: Partial<ManualChapter>) => {
    if (chapterEdit && !contentUndoPushed.current) {
      pushEditUndo();
      contentUndoPushed.current = true;
    }
    const idx = activeChapterIndex;
    const updated = chapters.map((chap, i) => (i === idx ? { ...chap, ...patch } : chap));
    setChapters(updated);
    scheduleChapterSave(updated);
  };

  const setChapterEditMode = (on: boolean) => {
    if (on) {
      enterChapterEdit(activeChapterIndex);
      return;
    }
    commitPending();
    chapterEditSnapshot.current = null;
    clearEditUndo();
    setChapterEdit(false);
  };

  const cancelChapterEdit = () => {
    if (persistTimer.current) {
      clearTimeout(persistTimer.current);
      persistTimer.current = null;
    }
    pendingSave.current = null;
    pendingMeta.current = null;
    const snap = chapterEditSnapshot.current;
    if (snap) {
      setManualTitle(snap.meta.title);
      setManualDescription(snap.meta.description);
      setManualCategory(snap.meta.category);
      setManualEstimatedTime(snap.meta.estimatedTime);
      setManualTags(snap.meta.tags || []);
      persistChapters(snap.chapters, snap.chapters[activeChapterIndex]?.id, { skipUndo: true });
    }
    chapterEditSnapshot.current = null;
    clearEditUndo();
    setChapterEdit(false);
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
  const activePartGroup = partGroups.find((g) => g.chapterIndices.includes(activeChapterIndex));
  const activeChapterNumber = React.useMemo(() => {
    if (!activePartGroup) return null;
    const nums = tocNumbersForPart(chapters, activePartGroup.chapterIndices, activePartGroup.index + 1);
    return nums.get(activeChapterIndex) ?? null;
  }, [chapters, activeChapterIndex, activePartGroup]);
  const activeChapterTitle = stripLeadingNumber(activeChapter.title.replace(/^Chapter\s+\d+:\s*/i, ""));
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
  const partCount = partGroups.length;
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
    writeScopedRaw(progressStoreKey(initialManual.id), JSON.stringify(updated));
    pushAccountProgress(slug, updated);
  };

  const persistManualMeta = (
    title: string,
    description: string,
    category: string,
    estimatedTime: string,
    tags: string[] = manualTags,
    coverImage: string = manualCoverImage
  ) => {
    if (!perms.canEdit) return;
    if (chapterEdit && !metaUndoPushed.current) {
      pushEditUndo();
      metaUndoPushed.current = true;
    }
    pendingMeta.current = { title, description, category, estimatedTime, tags, coverImage };
    setSaveHint("Saving…");
    if (persistTimer.current) clearTimeout(persistTimer.current);
    persistTimer.current = setTimeout(() => {
      persistTimer.current = null;
      commitPending();
    }, 400);
  };

  const persistHighlights = (next: HighlightStore) => {
    setHighlights(next);
    writeScopedRaw(highlightsStoreKey(initialManual.id), JSON.stringify(next));
  };

  const applyHighlight = (text: string, color: Parameters<typeof addHighlight>[3], start: number) => {
    const field = viewMode === "activities" ? "activities" : viewMode === "summary" ? "summary" : "full";
    const next = addHighlight(highlights, activeChapter.id, text, color, field, start);
    persistHighlights(next);
    const row = lastAdded(next, activeChapter.id);
    if (row) void postManualHighlight(row);
  };

  const dropHighlight = (row: { id: string; chapterId: string }) => {
    persistHighlights(removeHighlight(highlights, row.chapterId, row.id));
    void deleteManualHighlight(row.id);
  };

  const enterChapterEdit = (idx: number) => {
    if (!perms.canEdit) return;
    commitPending();
    chapterEditSnapshot.current = {
      chapters: JSON.parse(JSON.stringify(chapters)),
      meta: {
        title: manualTitle,
        description: manualDescription,
        category: manualCategory,
        estimatedTime: manualEstimatedTime,
        tags: manualTags,
        coverImage: manualCoverImage,
      },
    };
    clearEditUndo();
    setActiveChapterIndex(idx);
    setChapterEdit(true);
  };

  useEffect(() => {
    if (!isEditSession() || undoStackLen === 0) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undoLastEdit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterEdit, tocEditOpen, tocEdit, undoStackLen]);

  useEffect(() => {
    if (perms.canEdit && searchParams.get("edit") === "1") enterChapterEdit(0);
    // ponytail: open edit once when arriving from catalog kebab
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perms.canEdit]);

  const addChapterInPart = (partIndex?: number) => {
    if (!perms.canStructure) {
      toast({
        type: "error",
        title: "Cannot add chapter",
        description: "Sign in with edit permissions, or open Edit mode from the chapter menu first.",
      });
      return;
    }
    const host =
      partIndex != null
        ? partGroups[partIndex]
        : partGroups.find((g) => g.chapterIndices.includes(activeChapterIndex)) || partGroups[partGroups.length - 1];
    const newChap: ManualChapter = {
      id: `custom-ch-${Date.now()}`,
      order: chapters.length + 1,
      slug: `ch-${chapters.length + 1}`,
      title: "New Chapter",
      subtitle: host?.name || "New Part",
      partKey: host?.partKey || `part-${Date.now()}`,
      estimatedMinutes: 15,
    contentMarkdown: "# New Chapter\n\nWrite your lesson content here...",
    customSummary: "",
    aiSummary: "",
    codeSnippet: "",
      exercises: [],
      resourceLinks: [],
    };
    const inserted = [...chapters, newChap];
    const dest = host?.index ?? partGroups.length;
    const updated = moveChapterToPart(inserted, inserted.length - 1, dest);
    persistChapters(updated, newChap.id);
    setChapterEdit(true);
    toast({ type: "success", title: "Chapter Created", description: `Added ${newChap.title}.` });
  };

  const addSubchapter = (parentIdx?: number) => {
    if (!perms.canStructure) {
      toast({
        type: "error",
        title: "Cannot add sub-chapter",
        description: "Sign in with edit permissions to add sub-chapters.",
      });
      return;
    }
    const idx = parentIdx ?? parentIndexOf(chapters, activeChapterIndex);
    const parent = chapters[idx] || chapters[activeChapterIndex];
    if (!parent) return;
    const hostIdx = parent.parentId ? parentIndexOf(chapters, idx) : idx;
    const host = chapters[hostIdx];
    const newChap: ManualChapter = {
      id: `custom-sub-${Date.now()}`,
      order: chapters.length + 1,
      slug: `sub-${chapters.length + 1}`,
      title: "New Sub-chapter",
      subtitle: host.subtitle,
      partKey: host.partKey,
      parentId: host.id,
      estimatedMinutes: 10,
      contentMarkdown: "# New Sub-chapter\n\nWrite the nested lesson here...",
      codeSnippet: "",
      exercises: [],
      resourceLinks: [],
    };
    const updated = createSubchapter(chapters, hostIdx, newChap);
    persistChapters(updated, newChap.id);
    setChapterEdit(true);
    toast({ type: "success", title: "Sub-chapter Created", description: `Added ${newChap.title} under ${host?.title || "chapter"}.` });
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
    customSummary: "",
    aiSummary: "",
    exercises: [],
    resourceLinks: [],
  });

  const handleCreatePart = () => {
    if (!perms.canStructure) {
      toast({ type: "error", title: "Cannot add part", description: "Sign in with edit permissions to add parts." });
      return;
    }
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

  const enterTocEdit = (mode: "part" | "chapter" | "sub") => {
    setSelectedPartIndices([]);
    setSelectedChapterIndices([]);
    setEditingPartIndex(null);
    setTocEdit(mode);
    setTocEditOpen(true);
  };

  const exitTocEdit = () => {
    setSelectedPartIndices([]);
    setSelectedChapterIndices([]);
    setEditingPartIndex(null);
    setTocEdit(null);
    setTocEditOpen(false);
    if (!chapterEdit) clearEditUndo();
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
    const label = nums.get(idx) || String(idx + 1);
    const sibs = chap.parentId
      ? chapters.map((_, i) => i).filter((i) => chapters[i].parentId === chap.parentId)
      : [];
    let blockEnd = idx + 1;
    while (!chap.parentId && blockEnd < chapters.length && chapters[blockEnd].parentId === chap.id) blockEnd += 1;
    const canUp = chap.parentId ? sibs[0] !== idx : idx > 0;
    const canDown = chap.parentId ? sibs[sibs.length - 1] !== idx : blockEnd < chapters.length;

    const showChapterTools = !nested && tocEdit === "chapter";
    const showSubTools = nested && tocEdit === "sub";
    const showRowTools = showChapterTools || showSubTools;

    return (
      <div
        key={chap.id || idx}
        className={`group flex items-center gap-0.5 rounded-lg ${nested ? "ml-4" : ""} ${
          isActive ? "bg-[#1C2A26]" : "hover:bg-[#F3EDE2]"
        }`}
      >
        {showRowTools && (
          <input
            type="checkbox"
            checked={selectedChapterIndices.includes(idx)}
            onChange={() => toggleChapterSelected(idx)}
            className="ml-1 rounded border-[#D4CBBB] text-[#D97706] focus:ring-[#D97706] w-3.5 h-3.5 shrink-0"
            aria-label={`Select ${displayTitle}`}
          />
        )}
        <button
          type="button"
          onClick={() => setActiveChapterIndex(idx)}
          className={`flex-1 min-w-0 text-left px-2 py-2 text-xs sm:text-sm transition-colors flex items-center gap-2 ${
            isActive ? "text-[#FAF7F2] font-semibold" : "text-[#3D4D47] hover:text-[#1C2A26] font-normal"
          } ${nested ? "py-1.5" : ""}`}
          title={displayTitle}
          data-toc-idx={idx}
        >
          <span className={`font-mono text-[11px] font-bold shrink-0 min-w-[2.85rem] ${isActive ? "text-[#D97706]" : "text-[#8A9B95]"}`}>
            {label}.
          </span>
          <span className="truncate whitespace-nowrap flex-1 min-w-0">{displayTitle}</span>
          <span className={`text-[10px] font-mono shrink-0 ${isActive ? "text-amber-200" : "text-[#8A9B95]"}`}>
            {chap.estimatedMinutes || 15}m
          </span>
        </button>

        {(showRowTools || (!nested && tocEdit === "sub")) && (
          <div className="flex items-center shrink-0 pr-1">
            {!nested && tocEdit === "sub" && perms.canEdit && (
              <button
                type="button"
                onClick={() => addSubchapter(idx)}
                className={`p-1 rounded-md transition-colors ${
                  isActive ? "text-amber-400 hover:text-white" : "text-[#8A9B95] hover:text-[#D97706]"
                }`}
                title="Add sub-chapter"
              >
                <Plus className="w-3 h-3" />
              </button>
            )}
            {showRowTools && (
            <KebabMenu
              compact
              label={nested ? "Sub-chapter actions" : "Chapter actions"}
              items={kebabItems([
                perms.canReorder && {
                  label: "Move Up",
                  disabled: !canUp,
                  onClick: () => {
                    const result = moveChapterBlock(chapters, idx, -1);
                    persistChapters(result.chapters, chapters[activeChapterIndex]?.id);
                    setSelectedChapterIndices(result.selected);
                  },
                },
                perms.canReorder && {
                  label: "Move Down",
                  disabled: !canDown,
                  onClick: () => {
                    const result = moveChapterBlock(chapters, idx, 1);
                    persistChapters(result.chapters, chapters[activeChapterIndex]?.id);
                    setSelectedChapterIndices(result.selected);
                  },
                },
                perms.canMerge && { label: "Merge", disabled: selectedChapterIndices.length < 2, onClick: handleMergeSelectedChapters },
                perms.canDelete && { label: "Delete", danger: true, onClick: () => handleDeleteChapter(idx) },
              ])}
            />
            )}
          </div>
        )}
      </div>
    );
  };

  // Inline formatting helper for **bold** and `code` without raw Markdown tokens
  const parseInlineFormatting = (text: string) => {
    if (!text) return "";
    let clean = text.replace(/^#+\s*/, "").replace(/^[-*]\s+/, "");
    const markParts = clean.split(/(<mark data-hl="[^"]*" data-c="[^"]*">[\s\S]*?<\/mark>)/g);

    return markParts.map((chunk, markIdx) => {
      const mark = /^<mark data-hl="([^"]*)" data-c="([^"]*)">([\s\S]*?)<\/mark>$/.exec(chunk);
      if (mark) {
        const color =
          mark[2] === "green"
            ? "#BBF7D0"
            : mark[2] === "pink"
              ? "#FBCFE8"
              : mark[2] === "blue"
                ? "#BFDBFE"
                : "#FEF08A";
        return (
          <mark key={`m-${markIdx}`} data-hl={mark[1]} className="rounded-sm px-0.5" style={{ backgroundColor: color }}>
            {mark[3]}
          </mark>
        );
      }

    const boldParts = chunk.split(/(\*\*.*?\*\*)/g);

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
    });
  };

  // Renders Markdown with clean compact spacing, proportional headings, and structured callouts
  const activeFieldHighlights = highlightsForField(
    highlights[activeChapter.id],
    viewMode === "activities" ? "activities" : viewMode === "summary" ? "summary" : "full"
  );

  const renderFormattedMarkdown = (text: string) => {
    if (!text) return null;
    const marked = wrapHighlightHtml(text, activeFieldHighlights);

    const codeBlockRegex = /```([\s\S]*?)```/g;
    const rawParts = marked.split(codeBlockRegex);

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
              <ManualExportMenu
                slug={slug}
                manual={{
                  ...initialManual,
                  title: manualTitle,
                  description: manualDescription,
                  chapters,
                }}
              />
              <PinButton
                itemId={manualPinId(slug)}
                itemTitle={manualTitle}
                itemCategory={manualCategory}
                itemType="manual"
                itemUrl={`/manuals/${slug}`}
                variant="button"
              />
              {chapterEdit ? (
                <select
                  value={manualCategory}
                  onChange={(e) => {
                    const category = e.target.value;
                    setManualCategory(category);
                    persistManualMeta(manualTitle, manualDescription, category, manualEstimatedTime, manualTags);
                  }}
                  aria-label="Category"
                  className="h-8 px-2 text-[11px] font-bold uppercase tracking-wider bg-[#FEF3C7] border border-[#D97706]/40 rounded-lg text-[#D97706] focus:outline-none"
                >
                  {(categoryOptions.includes(manualCategory) ? categoryOptions : [manualCategory, ...categoryOptions]).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              ) : (
                <Badge variant="amber">{manualCategory}</Badge>
              )}
            </div>
          </div>

          {/* Title & Description Block */}
          <div className="space-y-1 mb-3 w-full">
            {chapterEdit ? (
              <>
                <input
                  value={manualTitle}
                  onChange={(e) => {
                    const title = e.target.value;
                    setManualTitle(title);
                    persistManualMeta(title, manualDescription, manualCategory, manualEstimatedTime);
                  }}
                  className="w-full bg-transparent font-serif-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C2A26] leading-tight focus:outline-none border-b border-transparent focus:border-[#D97706]"
                />
                <textarea
                  rows={2}
                  value={manualDescription}
                  onChange={(e) => {
                    const description = e.target.value;
                    setManualDescription(description);
                    persistManualMeta(manualTitle, description, manualCategory, manualEstimatedTime);
                  }}
                  className="w-full bg-transparent text-xs sm:text-sm text-[#52635E] leading-relaxed focus:outline-none resize-none border-b border-transparent focus:border-[#D97706]"
                />
                <TagInput
                  tags={manualTags}
                  onChange={(tags) => {
                    setManualTags(tags);
                    persistManualMeta(manualTitle, manualDescription, manualCategory, manualEstimatedTime, tags);
                  }}
                />
                <input
                  value={manualCoverImage}
                  onChange={(e) => {
                    const coverImage = e.target.value;
                    setManualCoverImage(coverImage);
                    persistManualMeta(manualTitle, manualDescription, manualCategory, manualEstimatedTime, manualTags, coverImage);
                  }}
                  placeholder="Cover image URL"
                  className="w-full h-10 px-3 text-xs bg-white border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
                />
              </>
            ) : (
              <>
                <h1 className="font-serif-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C2A26] leading-tight">
                  {manualTitle}
                </h1>
                <p className="text-xs sm:text-sm text-[#52635E] leading-relaxed w-full">
                  {manualDescription}
                </p>
                {manualTags.length > 0 ? (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {manualTags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E7E0D3] text-[10px] font-bold text-[#52635E]">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </>
            )}
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
                {chapterEdit ? (
                  <input
                    value={manualEstimatedTime}
                    onChange={(e) => {
                      const estimatedTime = e.target.value;
                      setManualEstimatedTime(estimatedTime);
                      persistManualMeta(manualTitle, manualDescription, manualCategory, estimatedTime);
                    }}
                    className="w-24 bg-transparent font-semibold focus:outline-none"
                    aria-label="Total estimated time"
                  />
                ) : (
                  <span>{manualEstimatedTime} Total</span>
                )}
              </div>
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
                  {perms.canStructure ? (
                  tocEditOpen ? (
                    <>
                      {(["part", "chapter", "sub"] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => enterTocEdit(mode)}
                          className={`inline-flex items-center text-[11px] font-bold px-2 py-1 rounded-lg ${
                            tocEdit === mode
                              ? "text-white bg-[#1C2A26]"
                              : "text-[#52635E] bg-white border border-[#E7E0D3] hover:border-[#D97706] hover:text-[#1C2A26]"
                          }`}
                        >
                          {mode === "part" ? "Part" : mode === "chapter" ? "Chapter" : "Sub-chapter"}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={undoLastEdit}
                        disabled={undoStackLen === 0}
                        className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg text-[#52635E] bg-white border border-[#E7E0D3] hover:border-[#D97706] hover:text-[#1C2A26] disabled:opacity-40 disabled:pointer-events-none"
                        title="Undo last change (⌘Z)"
                      >
                        <Undo2 className="w-3.5 h-3.5" />
                        Undo
                      </button>
                      <button
                        type="button"
                        onClick={exitTocEdit}
                        className="inline-flex items-center text-[11px] font-bold px-2 py-1 rounded-lg text-[#8A9B95] bg-white border border-[#E7E0D3] hover:text-[#1C2A26]"
                      >
                        Done
                      </button>
                      {perms.canDelete ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (!window.confirm(`Delete “${manualTitle}”? This cannot be undone.`)) return;
                            const kind = removeCatalogManual(slug);
                            if (!kind) {
                              toast({ type: "error", title: "Could not delete", description: "That manual could not be removed." });
                              return;
                            }
                            toast({
                              type: "info",
                              title: kind === "deleted" ? "Manual deleted" : "Removed from catalog",
                              description: `Removed “${manualTitle}”.`,
                            });
                            router.push("/manuals");
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg text-rose-700 bg-white border border-rose-200 hover:border-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete manual
                        </button>
                      ) : null}
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setTocEditOpen(true)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg text-[#1C2A26] bg-white border border-[#E7E0D3] hover:border-[#D97706]"
                      title="Edit table of contents"
                    >
                      <SquarePen className="w-3.5 h-3.5 text-[#D97706]" />
                      Edit
                    </button>
                  )
                  ) : null}
                </div>
              </div>

              {isEditingParts && (
              <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-[#E7E0D3] bg-white">
                <span className="text-[10px] font-bold text-[#52635E] mr-1">
                  {selectedPartIndices.length > 0 ? `${selectedPartIndices.length} parts` : "Select parts"}
                </span>
                {perms.canEdit ? (
                <button type="button" onClick={handleCreatePart} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-[#E7E0D3] bg-[#1C2A26] text-white" title="Add part">
                  <Plus className="w-3 h-3 text-[#D97706]" /> Part
                </button>
                ) : null}
                {perms.canReorder ? (
                <>
                <button type="button" onClick={() => handleMoveSelectedParts(-1)} disabled={selectedPartIndices.length === 0} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-[#E7E0D3] bg-[#FAF7F2] hover:border-[#D97706] disabled:opacity-40" title="Move up">
                  <ArrowUp className="w-3 h-3" /> Up
                </button>
                <button type="button" onClick={() => handleMoveSelectedParts(1)} disabled={selectedPartIndices.length === 0} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-[#E7E0D3] bg-[#FAF7F2] hover:border-[#D97706] disabled:opacity-40" title="Move down">
                  <ArrowDown className="w-3 h-3" /> Down
                </button>
                </>
                ) : null}
                {perms.canMerge ? (
                <button
                  type="button"
                  onClick={handleMergeSelectedParts}
                  disabled={selectedPartIndices.length < 2}
                  className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-[#E7E0D3] bg-[#FAF7F2] hover:border-[#D97706] disabled:opacity-40"
                  title="Merge selected parts"
                >
                  <Combine className="w-3 h-3" /> Merge
                </button>
                ) : null}
                {perms.canDelete ? (
                <button type="button" onClick={() => handleDeleteSelectedParts(selectedPartIndices)} disabled={selectedPartIndices.length === 0} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 disabled:opacity-40" title="Delete selected">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
                ) : null}
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
                {perms.canEdit ? (
                <button type="button" onClick={() => addChapterInPart()} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-[#E7E0D3] bg-[#1C2A26] text-white" title="Add chapter">
                  <Plus className="w-3 h-3 text-[#D97706]" /> Chapter
                </button>
                ) : null}
                {perms.canReorder ? (
                <>
                <button type="button" onClick={() => handleMoveSelectedChapters(-1)} disabled={selectedChapterIndices.length === 0} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-[#E7E0D3] bg-[#FAF7F2] hover:border-[#D97706] disabled:opacity-40" title="Move up">
                  <ArrowUp className="w-3 h-3" /> Up
                </button>
                <button type="button" onClick={() => handleMoveSelectedChapters(1)} disabled={selectedChapterIndices.length === 0} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-[#E7E0D3] bg-[#FAF7F2] hover:border-[#D97706] disabled:opacity-40" title="Move down">
                  <ArrowDown className="w-3 h-3" /> Down
                </button>
                </>
                ) : null}
                {perms.canMerge ? (
                <button
                  type="button"
                  onClick={handleMergeSelectedChapters}
                  disabled={selectedChapterIndices.length < 2}
                  className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-[#E7E0D3] bg-[#FAF7F2] hover:border-[#D97706] disabled:opacity-40"
                  title="Merge selected chapters"
                >
                  <Combine className="w-3 h-3" /> Merge
                </button>
                ) : null}
                {perms.canDelete ? (
                <button type="button" onClick={() => handleDeleteSelectedChapters(selectedChapterIndices)} disabled={selectedChapterIndices.length === 0} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 disabled:opacity-40" title="Delete selected">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
                ) : null}
                {selectedChapterIndices.length > 0 && (
                  <button type="button" onClick={() => setSelectedChapterIndices([])} className="ml-auto text-[10px] font-bold text-[#8A9B95] hover:text-[#1C2A26]">
                    Clear
                  </button>
                )}
              </div>
              )}

              {isEditingSubs && (
              <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-[#E7E0D3] bg-white">
                <span className="text-[10px] font-bold text-[#52635E] mr-1">
                  {selectedChapterIndices.length > 0 ? `${selectedChapterIndices.length} sub-chapters` : "Select sub-chapters"}
                </span>
                {perms.canEdit ? (
                <button type="button" onClick={() => addSubchapter()} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-[#E7E0D3] bg-[#1C2A26] text-white" title="Add sub-chapter">
                  <Plus className="w-3 h-3 text-[#D97706]" /> Sub-chapter
                </button>
                ) : null}
                {perms.canReorder ? (
                <>
                <button type="button" onClick={() => handleMoveSelectedChapters(-1)} disabled={selectedChapterIndices.length === 0} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-[#E7E0D3] bg-[#FAF7F2] hover:border-[#D97706] disabled:opacity-40" title="Move up">
                  <ArrowUp className="w-3 h-3" /> Up
                </button>
                <button type="button" onClick={() => handleMoveSelectedChapters(1)} disabled={selectedChapterIndices.length === 0} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-[#E7E0D3] bg-[#FAF7F2] hover:border-[#D97706] disabled:opacity-40" title="Move down">
                  <ArrowDown className="w-3 h-3" /> Down
                </button>
                </>
                ) : null}
                {perms.canDelete ? (
                <button type="button" onClick={() => handleDeleteSelectedChapters(selectedChapterIndices)} disabled={selectedChapterIndices.length === 0} className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-1 rounded-md border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 disabled:opacity-40" title="Delete selected">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
                ) : null}
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
                          <KebabMenu
                            compact
                            label="Part actions"
                            items={kebabItems([
                              perms.canEdit && {
                                label: "Edit",
                                onClick: () => {
                                  setEditingPartIndex(part.index);
                                  setEditingPartName(part.name);
                                },
                              },
                              perms.canReorder && {
                                label: "Move Up",
                                disabled: part.index === 0,
                                onClick: () => {
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
                                },
                              },
                              perms.canReorder && {
                                label: "Move Down",
                                disabled: part.index === partGroups.length - 1,
                                onClick: () => {
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
                                },
                              },
                              perms.canMerge && { label: "Merge", disabled: selectedPartIndices.length < 2, onClick: handleMergeSelectedParts },
                              perms.canDelete && { label: "Delete", danger: true, onClick: () => handleDeleteSelectedParts([part.index]) },
                            ])}
                          />
                          )}
                        </>
                      )}
                    </div>
                    {(() => {
                      const nums = tocNumbersForPart(chapters, part.chapterIndices, part.index + 1);
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
                    {(isEditingChapters || chapterEdit) && perms.canEdit && (
                      <button
                        type="button"
                        onClick={() => addChapterInPart(part.index)}
                        className="mt-1 ml-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#8A9B95] hover:text-[#D97706]"
                      >
                        <Plus className="w-3 h-3" /> Add chapter
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CHAPTER CONTENT VIEW */}
          <div className="lg:col-span-8 xl:col-span-8 space-y-4">
            <Card variant="default" hoverable={false} className="p-4 sm:p-6 space-y-4 border-[#E7E0D3] bg-white shadow-xs rounded-2xl" id={`read-${activeChapter.id}`} data-chapter-spy={activeChapter.id}>
              {/* HEADER ROW WITH VIEW MODE TOGGLE BUTTONS */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E7E0D3]">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-serif-display font-bold text-[#D97706]">
                    {activeChapterNumber ? `Chapter ${activeChapterNumber}` : `Lesson ${activeChapterIndex + 1}`} of {totalChapters}
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
                          ? "bg-[#1C2A26] text-white shadow-2xs"
                          : "text-[#52635E] hover:text-[#1C2A26]"
                      }`}
                    >
                      <span>Summary</span>
                    </button>
                    <button
                      onClick={() => setViewMode("activities")}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                        viewMode === "activities"
                          ? "bg-[#D97706] text-white shadow-2xs"
                          : "text-[#52635E] hover:text-[#1C2A26]"
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Quiz &amp; Activities</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {saveHint ? (
                    <span className="text-[11px] font-bold text-[#8A9B95]">{saveHint}</span>
                  ) : null}
                  {inAnyEditMode ? (
                    <>
                      <Button variant="outline" size="sm" onClick={undoLastEdit} disabled={undoStackLen === 0} title="Undo last change (⌘Z)" leftIcon={<Undo2 className="w-3.5 h-3.5" />}>
                        Undo
                      </Button>
                      {chapterEdit ? (
                        <>
                          <Button variant="outline" size="sm" onClick={cancelChapterEdit}>
                            Cancel
                          </Button>
                          <Button variant="primary" size="sm" onClick={() => setChapterEditMode(false)}>
                            Done editing
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" size="sm" onClick={exitTocEdit}>
                          Done editing
                        </Button>
                      )}
                    </>
                  ) : perms.canEdit ? (
                    <button
                      type="button"
                      onClick={() => enterChapterEdit(activeChapterIndex)}
                      title="Edit chapter"
                      aria-label="Edit chapter"
                      className="h-9 w-9 inline-flex items-center justify-center rounded-xl border border-[#E7E0D3] bg-white text-[#52635E] hover:text-[#1C2A26] hover:border-[#D97706] transition-colors"
                    >
                      <SquarePen className="w-4 h-4" />
                    </button>
                  ) : null}

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
                {chapterEdit ? (
                  <input
                    value={activeChapter.title}
                    onChange={(e) => patchActiveChapter({ title: e.target.value })}
                    className="w-full bg-transparent font-serif-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C2A26] leading-tight focus:outline-none border-b border-transparent focus:border-[#D97706]"
                    aria-label="Chapter title"
                  />
                ) : (
                  <h1 className="font-serif-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C2A26] leading-tight">
                    {activeChapterNumber ? `${activeChapterNumber}. ` : ""}
                    {activeChapterTitle}
                  </h1>
                )}
                {chapterEdit ? (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {!isSubchapter(activeChapter) ? (
                      <select
                        value={activePartGroup?.index ?? 0}
                        onChange={(e) => {
                          persistChapters(moveChapterToPart(chapters, activeChapterIndex, Number(e.target.value)));
                        }}
                        className="font-serif-display text-xs sm:text-sm font-semibold text-[#D97706] bg-transparent border-b border-[#E7E0D3] focus:outline-none focus:border-[#D97706] py-0.5"
                        aria-label="Part"
                      >
                        {partGroups.map((g) => (
                          <option key={g.partKey} value={g.index}>
                            {groupTitle(g.index, g.name)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="font-serif-display text-xs sm:text-sm font-semibold text-[#D97706]">
                        Nested under {chapters[parentIndexOf(chapters, activeChapterIndex)]?.title || "chapter"}
                      </p>
                    )}
                    <label className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8A9B95]">
                      <Clock className="w-3 h-3 text-[#D97706]" />
                      <input
                        type="number"
                        min={1}
                        value={activeChapter.estimatedMinutes || 15}
                        onChange={(e) => patchActiveChapter({ estimatedMinutes: Number(e.target.value) || 15 })}
                        className="w-14 bg-transparent border-b border-[#E7E0D3] focus:outline-none focus:border-[#D97706] text-[#1C2A26]"
                        aria-label="Minutes"
                      />
                      min
                    </label>
                  </div>
                ) : activePartGroup ? (
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
              {chapterEdit ? (
                <div className="space-y-3">
                  <ChapterContentEditor
                    chapter={activeChapter}
                    viewMode={viewMode}
                    onPatch={patchActiveChapter}
                    renderMarkdown={renderFormattedMarkdown}
                  />
                  <button
                    type="button"
                    onClick={() => addChapterInPart(activePartGroup?.index)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C2A26] px-3 py-2 rounded-xl border border-dashed border-[#E7E0D3] hover:border-[#D97706]"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#D97706]" /> Add chapter
                  </button>
                </div>
              ) : (
              <>
              <Highlightable onAdd={applyHighlight} onRemove={(id) => dropHighlight({ id, chapterId: activeChapter.id })}>
              {viewMode === "summary" ? (
                <ChapterSummaryPanel
                  customSummary={activeChapter.customSummary}
                  renderMarkdown={renderFormattedMarkdown}
                />
              ) : viewMode === "activities" ? (
                <ChapterActivitiesPanel
                  chapter={activeChapter}
                  quizText={quizText}
                  quizBusy={quizBusy}
                  onGenerateQuiz={async () => {
                    setQuizBusy(true);
                    setQuizText("");
                    const content = [
                      activeChapter.overviewText,
                      activeChapter.why,
                      activeChapter.contentMarkdown,
                      chapterCustomSummary(activeChapter),
                    ]
                      .filter(Boolean)
                      .join("\n");
                    const res = await fetch("/api/ai/quiz", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ title: activeChapter.title, content: content || activeChapter.title }),
                    });
                    const data = await res.json().catch(() => ({}));
                    setQuizBusy(false);
                    if (data.text) {
                      setQuizText(data.text);
                    } else {
                      setQuizText(data.error || "Could not generate quiz.");
                    }
                  }}
                />
              ) : (
                <ChapterFullContent
                  chapter={activeChapter}
                  highlights={activeFieldHighlights}
                  renderMarkdown={renderFormattedMarkdown}
                  isTestingTypesManual={isTestingTypesManual}
                  onNavigateChapter={handleNavigateChapter}
                />
              )}
              </Highlightable>
              </>
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
        {(() => {
          const related = MANUALS_DATA.filter(
            (m) =>
              m.slug !== slug &&
              (m.category === manualCategory || (m.tags || []).some((t) => manualTags.includes(t)))
          ).slice(0, 4);
          if (!related.length) return null;
          return (
            <section className="space-y-3">
              <h2 className="font-serif-display text-xl font-bold">Related manuals</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((m) => (
                  <Link key={m.slug} href={`/manuals/${m.slug}`} className="p-4 rounded-2xl bg-white border border-[#E7E0D3] hover:border-[#1C2A26]">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#D97706]">{m.category}</p>
                    <h3 className="font-serif-display font-bold mt-1">{m.title}</h3>
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}
      </main>


      <AnimatePresence>
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
