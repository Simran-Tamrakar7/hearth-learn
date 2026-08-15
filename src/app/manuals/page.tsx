"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MANUALS_DATA, ManualItem } from "@/lib/manualsData";
import { genres } from "@/lib/pathwise-data/helpers.js";
import { Compass, Search, Clock, BookOpen, ArrowRight } from "lucide-react";

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

function ManualCard({ manual }: { manual: ManualItem }) {
  return (
    <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Link href={`/manuals/${manual.slug}`} className="block h-full">
        <Card
          variant="default"
          hoverable={true}
          className="h-full border-[#E7E0D3] bg-white rounded-3xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl transition-all group p-0"
        >
          <div>
            <div className="h-48 relative overflow-hidden bg-[#FAF7F2]">
              <img
                src={manual.coverImage}
                alt={manual.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#1C2A26] text-[#D97706] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                {manual.category}
              </span>
            </div>
            <div className="p-7 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#8A9B95] font-semibold">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#D97706]" /> {manual.chapterCount} Chapters
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#D97706]" /> {manual.estimatedTime}
                </span>
              </div>
              <div className="space-y-2">
                <h2 className="font-serif-display text-xl font-bold text-[#1C2A26] group-hover:text-[#D97706] transition-colors leading-tight">
                  {manual.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#52635E] line-clamp-3 leading-relaxed">{manual.description}</p>
              </div>
            </div>
          </div>
          <div className="p-7 pt-0 border-t border-transparent group-hover:border-[#FAF7F2] transition-colors">
            <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#1C2A26] group-hover:text-[#D97706]">
              <span>Open Master Manual</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

export default function ManualsCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredManuals = MANUALS_DATA.filter((manual) => {
    const matchesCategory = selectedCategory === "All" || manual.category === selectedCategory;
    const needle = searchQuery.trim().toLowerCase();
    const matchesSearch =
      needle === "" ||
      manual.title.toLowerCase().includes(needle) ||
      manual.description.toLowerCase().includes(needle) ||
      manual.category.toLowerCase().includes(needle);
    return matchesCategory && matchesSearch;
  });

  const grouped = useMemo(() => {
    return CATALOG_GENRES.filter((g) => g.id !== "all")
      .map((g) => ({
        ...g,
        items: filteredManuals.filter((m) => m.category === g.category),
      }))
      .filter((g) => g.items.length > 0);
  }, [filteredManuals]);

  const sections = selectedCategory === "All" ? grouped : grouped.filter((g) => g.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-12 w-full space-y-10 flex-1">
        <div className="bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EFE6] border border-[#E7E0D3] rounded-3xl p-8 sm:p-12 space-y-6 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="space-y-4 w-full">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="amber" icon={<Compass className="w-3.5 h-3.5" />}>
                  COURSE CATALOGUE · FULL INSTRUCTIONAL MANUALS
                </Badge>
                <span className="text-xs font-semibold text-[#8A9B95]">
                  {MANUALS_DATA.length} Manuals • {CATALOG_GENRES.length - 1} Categories
                </span>
              </div>

              <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1C2A26] tracking-tight leading-tight">
                Manuals
              </h1>

              <p className="text-[1.05rem] leading-[1.72] text-[#52635E]">
                Pathwise paths, grouped by craft — open a category, then work it chapter by chapter.
              </p>
            </div>
          </div>

          <div className="pt-2 sm:max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8A9B95] absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Cypress, agile, design, soft skills…"
                className="w-full h-11 pl-11 pr-4 text-xs sm:text-sm bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706] shadow-xs"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 border-b border-[#E7E0D3] pb-6 overflow-x-auto" role="tablist" aria-label="Genres">
          {CATALOG_GENRES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat.category
                  ? "bg-[#1C2A26] text-[#FAF7F2] shadow-xs scale-105"
                  : "bg-white border border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26] hover:bg-[#FAF7F2]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {sections.length === 0 ? (
          <p className="text-[#52635E]">Nothing matches — try another word.</p>
        ) : (
          sections.map((g) => (
            <section key={g.id} className="space-y-5">
              <div className="space-y-1">
                <h2 className="font-serif-display text-2xl font-bold text-[#1C2A26]">{g.label}</h2>
                <p className="text-sm text-[#52635E]">{g.blurb}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {g.items.map((manual) => (
                  <ManualCard key={manual.id} manual={manual} />
                ))}
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
}
