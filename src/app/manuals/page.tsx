"use client";

/* PAGE: /manuals  — catalog grid (this file). Reader: ./[slug]/page.tsx. Map: ./CODE-FOR-THIS-PAGE.md */

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { MANUALS_DATA, findHearthManual, ManualItem } from "@/app/manuals/_lib/manualsData";
import { activeManualSlugs } from "@/app/manuals/_content/_registry";
import { genres } from "@/app/manuals/_content/_helpers.js";
import { Compass, Search, BookOpen, ArrowRight, Pin, ExternalLink, Code2 } from "lucide-react";
import {
  PinButton,
  subscribePinnedItems,
  isManualsCatalogPin,
  isShowcaseCatalogPin,
  PinnedItemMetadata,
  manualPinId,
} from "@/components/ui/PinButton";
import { applyManualOverlay, getUserManual, hiddenManualSlugs, purgeRemovedManualCatalog, removeCatalogManual, subscribeUserManuals } from "@/app/manuals/_lib/userManuals";
import { subscribeCategories } from "@/app/manuals/_lib/categories";
import { AddManualControl } from "@/app/manuals/_ui/AddManualControl";
import { ManualCard } from "@/app/manuals/_ui/ManualCard";
import { RecentlyViewed } from "@/app/manuals/_ui/RecentlyViewed";
import { usePermissions } from "@/lib/useAuthz";

const GENRE_CATEGORY: Record<string, string> = {
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
  category: string;
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

export default function ManualsCatalogPage() {
  const { toast } = useToast();
  const perms = usePermissions();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pinnedManuals, setPinnedManuals] = useState<ReturnType<typeof resolvePinnedManual>[]>([]);
  const [pinnedShowcase, setPinnedShowcase] = useState<PinnedItemMetadata[]>([]);
  const [userManuals, setUserManuals] = useState<ManualItem[]>([]);
  const [hiddenSlugs, setHiddenSlugs] = useState<Set<string>>(new Set());
  const [categories, setCategories] = useState<string[]>([]);
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    purgeRemovedManualCatalog();
    return subscribeUserManuals((items) => {
      setUserManuals(items);
      setHiddenSlugs(hiddenManualSlugs());
    });
  }, []);

  useEffect(() => subscribeCategories(setCategories), []);

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
  const catalogSource = useMemo(
    () => [...userManuals, ...builtinCatalog].map(applyManualOverlay),
    [userManuals, builtinCatalog]
  );

  const filteredManuals = catalogSource.filter((manual) => {
    const matchesCategory = selectedCategory === "All" || manual.category === selectedCategory;
    const matchesTag = !selectedTag || (manual.tags || []).includes(selectedTag);
    const needle = searchQuery.trim().toLowerCase();
    const hay = `${manual.title} ${manual.description} ${manual.category} ${(manual.tags || []).join(" ")} ${manual.slug}`.toLowerCase();
    const matchesSearch = needle === "" || hay.includes(needle);
    return matchesCategory && matchesTag && matchesSearch;
  });
  const catalogManuals = filteredManuals;

  const genreByCategory = useMemo(
    () => Object.fromEntries(CATALOG_GENRES.filter((g) => g.id !== "all").map((g) => [g.category, g])),
    []
  );

  const grouped = useMemo(() => {
    const known = new Set(categories);
    const fromList = categories
      .map((c) => {
        const g = genreByCategory[c];
        return {
          id: g?.id || c,
          label: g?.label || c,
          blurb: g?.blurb || "",
          category: c,
          items: catalogManuals.filter((m) => m.category === c),
        };
      })
      .filter((g) => g.items.length > 0);
    const leftover = catalogManuals.filter((m) => !known.has(m.category));
    if (leftover.length) {
      fromList.push({ id: "other", label: "Other", blurb: "", category: "Other", items: leftover });
    }
    return fromList;
  }, [catalogManuals, categories, genreByCategory]);

  const sections = selectedCategory === "All" ? grouped : grouped.filter((g) => g.category === selectedCategory);
  const totalCount = catalogSource.length;
  const categoryTabs = [{ id: "all", label: "All", category: "All" }, ...categories.map((c) => ({ id: c, label: genreByCategory[c]?.label || c, category: c }))];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-12 w-full space-y-10 flex-1">
        <RecentlyViewed />
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
                  {totalCount} Manuals • {categories.length} Categories
                </span>
              </div>

              <h1 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#1C2A26] tracking-tight leading-tight">
                Manuals
              </h1>

              <p className="text-xs sm:text-sm text-[#52635E] leading-relaxed">
                Pathwise paths, grouped by craft — open a category, then work it chapter by chapter.
              </p>
            </div>
            {perms.canCreate ? <AddManualControl /> : null}
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

        <div className="flex flex-wrap items-center gap-2 border-b border-[#E7E0D3] pb-3 overflow-x-auto" role="tablist" aria-label="Categories">
          {categoryTabs.map((cat) => (
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
        {selectedTag ? (
          <div className="flex items-center gap-2 -mt-6">
            <span className="text-xs text-[#52635E]">Filtered by tag</span>
            <button
              type="button"
              onClick={() => setSelectedTag("")}
              className="px-2 py-0.5 rounded-full bg-[#1C2A26] text-[#FAF7F2] text-[10px] font-bold"
            >
              {selectedTag} ×
            </button>
          </div>
        ) : null}

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
                    canEdit={perms.canEdit}
                    canDelete={perms.canDelete}
                    onTagClick={setSelectedTag}
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
    </div>
  );
}
