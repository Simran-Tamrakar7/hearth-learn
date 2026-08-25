"use client";

/* PAGE: /manuals  — catalog grid (this file). Reader: ./[slug]/page.tsx. Map: ./CODE-FOR-THIS-PAGE.md */

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { MANUALS_DATA, findHearthManual, ManualItem } from "@/app/manuals/_lib/manualsData";
import { activeManualSlugs } from "@/app/manuals/_content/_registry";
import { genres } from "@/app/manuals/_content/_helpers.js";
import { Compass, Search, Clock, BookOpen, ArrowRight, Pin, ExternalLink, Code2, Sparkles, X, Trash2 } from "lucide-react";
import {
  PinButton,
  subscribePinnedItems,
  isManualsCatalogPin,
  isShowcaseCatalogPin,
  PinnedItemMetadata,
  manualPinId,
} from "@/components/ui/PinButton";
import { emptyManual, getUserManual, hiddenManualSlugs, notesToManual, removeCatalogManual, saveUserManual, subscribeUserManuals } from "@/app/manuals/_lib/userManuals";

const GENRE_CATEGORY: Record<string, ManualItem["category"] | "All"> = {
  all: "All",
  automation: "Automation & Testing",
  quality: "Quality Craft",
  delivery: "Delivery & Process",
  design: "Design",
  ai: "AI & Prompting",
  foundations: "Foundations",
  ops: "Ops & Systems",
  career: "Career",
  "soft-skills": "Soft Skills",
};

type GenreRow = {
  id: string;
  label: string;
  blurb: string;
  color: string;
  category: ManualItem["category"] | "All";
};

const CATALOG_GENRES: GenreRow[] = (genres as { id: string; label: string; blurb: string; color: string }[]).map(
  (g) => ({
    id: g.id,
    label: g.label,
    blurb: g.blurb,
    color: g.color,
    category: GENRE_CATEGORY[g.id] || "Foundations",
  })
);

function resolvePinnedManual(pin: PinnedItemMetadata, userManuals: ManualItem[]) {
  const fromUrl = pin.url?.match(/\/manuals\/([^/?#]+)/)?.[1];
  const fromId = String(pin.id || "").replace(/^man-/, "");
  const slug = fromUrl || fromId;
  const builtin = slug ? findHearthManual(slug) : undefined;
  const generated = slug ? userManuals.find((m) => m.slug === slug || m.id === `manual-${slug}`) || getUserManual(slug) : undefined;
  const manual = builtin || generated;
  return {
    ...pin,
    title: manual?.title || pin.title,
    category: pin.category || manual?.category,
    url: manual ? `/manuals/${manual.slug}` : pin.url || (slug ? `/manuals/${slug}` : "/manuals"),
    coverImage: manual?.coverImage,
  };
}

function ManualCard({
  manual,
  pinned,
  onDelete,
}: {
  manual: ManualItem;
  pinned?: boolean;
  onDelete?: () => void;
}) {
  return (
    <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <div className="relative h-full">
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1">
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (window.confirm(`Delete “${manual.title}”? This cannot be undone.`)) onDelete();
              }}
              className="p-2 rounded-xl bg-white/90 text-[#8A9B95] hover:text-rose-700 hover:bg-rose-50 border border-[#E7E0D3]"
              title="Delete manual"
              aria-label={`Delete ${manual.title}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <PinButton
            itemId={manualPinId(manual.slug)}
            itemTitle={manual.title}
            itemCategory={manual.category}
            itemType="manual"
            itemUrl={`/manuals/${manual.slug}`}
            variant="icon"
          />
        </div>
        <Link href={`/manuals/${manual.slug}`} className="block h-full">
          <Card
            variant="default"
            hoverable={true}
            className={`h-full border-[#E7E0D3] bg-white rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-lg transition-all group p-0 ${
              pinned ? "ring-2 ring-[#D97706]/70 border-[#D97706]" : ""
            }`}
          >
            <div>
              <div className="h-40 relative overflow-hidden bg-[#FAF7F2]">
                <img
                  src={manual.coverImage}
                  alt={manual.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#1C2A26] text-[#D97706] text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                  {manual.category}
                </span>
                {pinned && (
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] text-[10px] font-bold uppercase tracking-wider">
                    <Pin className="w-3 h-3 fill-current" /> Pinned
                  </span>
                )}
              </div>
            <div className="p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-[#8A9B95] font-semibold">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#D97706]" /> {manual.chapterCount} Chapters
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D97706]" /> {manual.estimatedTime}
                </span>
              </div>
              <div className="space-y-1">
                <h2 className="font-serif-display text-lg font-bold text-[#1C2A26] group-hover:text-[#D97706] transition-colors leading-snug">
                  {manual.title}
                </h2>
                <p className="text-xs text-[#52635E] line-clamp-2 leading-relaxed">{manual.description}</p>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-5 pt-0 border-t border-transparent group-hover:border-[#FAF7F2] transition-colors">
            <div className="pt-2.5 flex items-center justify-between text-xs font-bold text-[#1C2A26] group-hover:text-[#D97706]">
              <span>Open Manual</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Card>
      </Link>
    </div>
    </motion.div>
  );
}

function GenerateManualModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (manual: ManualItem) => void;
}) {
  const { toast } = useToast();
  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  async function generate() {
    setBusy(true);
    try {
      const titleTrim = title.trim();
      const notesTrim = notes.trim();
      if (!titleTrim && !notesTrim) {
        throw new Error("Add a title or paste some notes.");
      }
      let saved;
      if (!notesTrim) {
        saved = saveUserManual(emptyManual(titleTrim));
      } else {
        let markdown = notes;
        try {
          const res = await fetch("/api/manuals/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ notes, title: titleTrim || undefined }),
          });
          const data = await res.json();
          if (typeof data.markdown === "string" && data.markdown.trim()) markdown = data.markdown;
          if (data.error) throw new Error(data.error);
        } catch (err) {
          if (err instanceof Error && (err.message === "Paste some notes first." || err.message === "Add a title or paste some notes.")) throw err;
        }
        saved = saveUserManual(notesToManual(markdown, titleTrim || undefined));
      }
      onCreated(saved);
      setNotes("");
      setTitle("");
      onClose();
      toast({
        type: "success",
        title: "Manual added",
        description: `"${saved.title}" is now on your Manuals list.`,
      });
    } catch (e) {
      toast({
        type: "error",
        title: "Could not create",
        description: e instanceof Error ? e.message : "Add a title or paste some notes.",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-[#1C2A26]/40">
      <div className="w-full max-w-2xl bg-[#FAF7F2] border border-[#E7E0D3] rounded-3xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E7E0D3]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D97706]" />
            <h2 className="font-serif-display text-lg font-bold text-[#1C2A26]">New manual with AI</h2>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-xl text-[#8A9B95] hover:text-[#1C2A26]" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-3">
          <p className="text-xs text-[#52635E] leading-relaxed">
            Paste notes for AI to structure into parts, chapters, and sub-chapters — or just a title to start a blank manual you can edit.
          </p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title (optional)"
            className="w-full h-11 px-4 text-sm bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706]"
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste notes, meeting dump, or markdown…"
            rows={12}
            className="w-full px-4 py-3 text-sm bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706] resize-y min-h-[12rem]"
          />
        </div>
        <div className="px-5 py-4 border-t border-[#E7E0D3] flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-4 rounded-xl text-xs font-semibold border border-[#E7E0D3] bg-white text-[#52635E] hover:text-[#1C2A26]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={generate}
            className="h-10 px-4 rounded-xl text-xs font-semibold bg-[#1C2A26] text-[#FAF7F2] hover:bg-[#243530] disabled:opacity-50 inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {busy ? "Creating…" : notes.trim() ? "Generate & add to list" : "Create blank manual"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ManualsCatalogPage() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pinnedManuals, setPinnedManuals] = useState<ReturnType<typeof resolvePinnedManual>[]>([]);
  const [pinnedShowcase, setPinnedShowcase] = useState<PinnedItemMetadata[]>([]);
  const [userManuals, setUserManuals] = useState<ManualItem[]>([]);
  const [hiddenSlugs, setHiddenSlugs] = useState<Set<string>>(new Set());
  const [generateOpen, setGenerateOpen] = useState(false);
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    return subscribeUserManuals((items) => {
      setUserManuals(items);
      setHiddenSlugs(hiddenManualSlugs());
    });
  }, []);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("new") === "1") setGenerateOpen(true);
  }, []);

  useEffect(() => {
    return subscribePinnedItems((allPins) => {
      setPinnedManuals(allPins.filter(isManualsCatalogPin).map((pin) => resolvePinnedManual(pin, userManuals)));
      setPinnedShowcase(allPins.filter(isShowcaseCatalogPin));
      setPinnedIds(new Set(allPins.filter(isManualsCatalogPin).map((p) => p.id)));
    });
  }, [userManuals]);

  const builtinCatalog = useMemo(
    () => MANUALS_DATA.filter((m) => activeManualSlugs().has(m.slug) && !hiddenSlugs.has(m.slug)),
    [hiddenSlugs]
  );
  const catalogSource = useMemo(() => [...userManuals, ...builtinCatalog], [userManuals, builtinCatalog]);

  const filteredManuals = catalogSource.filter((manual) => {
    const matchesCategory = selectedCategory === "All" || manual.category === selectedCategory;
    const needle = searchQuery.trim().toLowerCase();
    const hay = `${manual.title} ${manual.description} ${manual.category} ${manual.slug}`.toLowerCase();
    const matchesSearch = needle === "" || hay.includes(needle);
    return matchesCategory && matchesSearch;
  });
  const catalogManuals = filteredManuals;

  const grouped = useMemo(() => {
    return CATALOG_GENRES.filter((g) => g.id !== "all")
      .map((g) => ({
        ...g,
        items: catalogManuals.filter((m) => m.category === g.category),
      }))
      .filter((g) => g.items.length > 0);
  }, [catalogManuals]);

  const sections = selectedCategory === "All" ? grouped : grouped.filter((g) => g.category === selectedCategory);
  const totalCount = catalogSource.length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-12 w-full space-y-10 flex-1">
        {pinnedManuals.length > 0 && (
          <div className="space-y-4 bg-gradient-to-br from-white via-[#FAF7F2] to-[#FEF3C7]/40 border border-[#E7E0D3] rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="font-serif-display text-xl font-bold text-[#1C2A26] flex items-center gap-2">
                <Pin className="w-5 h-5 text-[#D97706]" />
                <span>Your Pinned Manuals ({pinnedManuals.length})</span>
              </h2>
              <span className="text-xs text-[#8A9B95] font-semibold">Open the course</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pinnedManuals.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#E7E0D3] rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs hover:border-[#1C2A26] transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      {item.coverImage ? (
                        <img src={item.coverImage} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      ) : (
                        <BookOpen className="w-4 h-4 text-[#D97706]" />
                      )}
                      <PinButton
                        itemId={item.id}
                        itemTitle={item.title}
                        itemCategory={item.category}
                        itemType="manual"
                        itemUrl={item.url}
                        itemIcon={item.icon}
                        variant="icon"
                      />
                    </div>
                    <h3 className="font-serif-display font-bold text-base text-[#1C2A26] line-clamp-1 pt-1">
                      {item.title}
                    </h3>
                    {item.category && (
                      <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider block">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <Link href={item.url || `/manuals/${item.id.replace(/^man-/, "")}`} className="block w-full">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-1.5 w-full h-9 px-3 rounded-xl bg-[#1C2A26] text-[#FAF7F2] text-xs font-semibold hover:bg-[#243530] transition-colors"
                    >
                      Open Manual
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {pinnedShowcase.length > 0 && (
          <div className="space-y-4 bg-gradient-to-br from-white via-[#FAF7F2] to-[#FEF3C7]/40 border border-[#E7E0D3] rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="font-serif-display text-xl font-bold text-[#1C2A26] flex items-center gap-2">
                <Pin className="w-5 h-5 text-[#D97706]" />
                <span>Pinned Showcase Links ({pinnedShowcase.length})</span>
              </h2>
              <span className="text-xs text-[#8A9B95] font-semibold">Opens in a new tab</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pinnedShowcase.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#E7E0D3] rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs hover:border-[#1C2A26] transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Code2 className="w-4 h-4 text-[#D97706]" />
                      <PinButton
                        itemId={item.id}
                        itemTitle={item.title}
                        itemCategory={item.category}
                        itemType="showcase"
                        itemUrl={item.url}
                        itemIcon={item.icon}
                        variant="icon"
                      />
                    </div>
                    <h3 className="font-serif-display font-bold text-base text-[#1C2A26] truncate pt-1">
                      {item.title}
                    </h3>
                    {item.category && (
                      <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider block">
                        {item.category}
                      </span>
                    )}
                    <p className="text-[11px] font-semibold text-[#D97706] truncate">
                      {item.url.replace(/^https?:\/\//, "")}
                    </p>
                  </div>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full h-9 px-3 rounded-xl bg-[#D97706] text-white text-xs font-semibold hover:bg-[#b45309] transition-colors"
                  >
                    Open Link
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EFE6] border border-[#E7E0D3] rounded-3xl p-8 sm:p-12 space-y-6 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="space-y-4 w-full">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="amber" icon={<Compass className="w-3.5 h-3.5" />}>
                  COURSE CATALOGUE · MASTER MANUALS
                </Badge>
                <span className="text-xs font-semibold text-[#8A9B95]">
                  {totalCount} Manuals • {CATALOG_GENRES.length - 1} Categories
                </span>
              </div>

              <h1 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#1C2A26] tracking-tight leading-tight">
                Manuals
              </h1>

              <p className="text-xs sm:text-sm text-[#52635E] leading-relaxed">
                Pathwise paths, grouped by craft — open a category, then work it chapter by chapter.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setGenerateOpen(true)}
              className="shrink-0 inline-flex items-center gap-2 h-11 px-4 rounded-2xl bg-[#1C2A26] text-[#FAF7F2] text-xs font-semibold hover:bg-[#243530] shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#D97706]" />
              New with AI
            </button>
          </div>

          <div className="pt-1 sm:max-w-md">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8A9B95] absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Testing Types, Cypress, agile, design…"
                className="w-full h-11 pl-11 pr-4 text-xs sm:text-sm bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706] shadow-xs"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-b border-[#E7E0D3] pb-3 overflow-x-auto" role="tablist" aria-label="Genres">
          {CATALOG_GENRES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat.category
                  ? "bg-[#1C2A26] text-[#FAF7F2] shadow-xs"
                  : "bg-white border border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26] hover:bg-[#FAF7F2]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {sections.length === 0 && pinnedManuals.length === 0 ? (
          <p className="text-[#52635E]">Nothing matches — try another word.</p>
        ) : (
          sections.map((g) => (
            <section key={g.id} className="space-y-3.5">
              <div className="space-y-0.5">
                <h2 className="font-serif-display text-lg sm:text-xl font-bold text-[#1C2A26]">{g.label}</h2>
                <p className="text-xs text-[#52635E]">{g.blurb}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {g.items.map((manual) => (
                  <ManualCard
                    key={manual.id}
                    manual={manual}
                    pinned={pinnedIds.has(manualPinId(manual.slug))}
                    onDelete={() => {
                      const kind = removeCatalogManual(manual.slug);
                      if (!kind) return;
                      toast({
                        type: "info",
                        title: kind === "deleted" ? "Manual deleted" : "Removed from catalog",
                        description: `Removed “${manual.title}”.`,
                      });
                    }}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      <GenerateManualModal
        open={generateOpen}
        onClose={() => setGenerateOpen(false)}
        onCreated={() => {
          /* subscribeUserManuals already refreshes the list */
        }}
      />
    </div>
  );
}
