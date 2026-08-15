"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ARCADIA_GAMES,
  ARCADIA_CATEGORIES,
  ARCADIA_GENRES,
  ArcadiaGame,
} from "@/lib/gamesData";
import {
  Gamepad2,
  Search,
  ExternalLink,
  Plus,
  Coffee,
  X,
  Sparkles,
  Filter,
  Layers,
  Utensils,
  Radio,
} from "lucide-react";

export default function ArcadiaGamesShelfPage() {
  const [activeCat, setActiveCat] = useState<string>("all");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [fabDrawerOpen, setFabDrawerOpen] = useState<boolean>(false);

  const categories = ARCADIA_CATEGORIES;
  const genres = ARCADIA_GENRES;
  const games = ARCADIA_GAMES;

  const filteredCategories =
    activeCat === "all"
      ? categories.filter((c) => c.id !== "all")
      : categories.filter((c) => c.id === activeCat);

  // Calculate total games currently matching category, genre, and search query
  let totalShownCount = 0;
  filteredCategories.forEach((cat) => {
    let catGames = games.filter((g) => g.cat === cat.id);

    if (selectedGenre !== "all") {
      catGames = catGames.filter((g) => g.genre === selectedGenre);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      catGames = catGames.filter(
        (g) => g.t.toLowerCase().includes(q) || g.d.toLowerCase().includes(q)
      );
    }
    totalShownCount += catGames.length;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26] relative">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-8 w-full space-y-8 flex-1 pb-24">
        {/* TOP BAR / BREADCRUMB */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/rest">
              <Button variant="outline" size="sm" leftIcon={<Coffee className="w-4 h-4 text-[#D97706]" />}>
                Rest Sanctuary
              </Button>
            </Link>

            <Link href="/rest/cookbook">
              <Button variant="ghost" size="sm" leftIcon={<Utensils className="w-4 h-4 text-[#D97706]" />}>
                Cabin Cookbook
              </Button>
            </Link>

            <Link href="/rest/retro">
              <Button variant="ghost" size="sm" leftIcon={<Radio className="w-4 h-4 text-[#D97706]" />}>
                Retro Tech
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#52635E]">
            <Badge variant="amber" icon={<Gamepad2 className="w-3.5 h-3.5" />}>
              ARCADIA GAMES LIBRARY · {games.length} GAMES
            </Badge>
          </div>
        </div>

        {/* HERO HEADER */}
        <div className="bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EFE6] border border-[#E7E0D3] rounded-3xl p-6 sm:p-10 space-y-4 shadow-sm relative overflow-hidden">
          <div className="space-y-2 w-full">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#8A9B95]">
                {games.length}+ Free Web Games • Zero Installs • Filter by Genre
              </span>
            </div>

            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1C2A26] tracking-tight">
              Arcadia Web Games
            </h1>

            <p className="text-xs sm:text-base text-[#52635E] leading-relaxed w-full">
              Hand-curated collection of over {games.length} browser games spanning web portals, multiplayer .io arenas, retro arcade classics, digital sandboxes, and relaxing chill games.
            </p>
          </div>

          {/* SEARCH & GENRE DRAWER TRIGGER */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8A9B95] absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${games.length} games: Poki, Slither, 2048, Tetris, Chess...`}
                className="w-full h-11 pl-11 pr-4 text-xs sm:text-sm bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706] shadow-xs"
              />
            </div>

            <Button
              variant="outline"
              size="md"
              onClick={() => setFabDrawerOpen(true)}
              leftIcon={<Filter className="w-4 h-4 text-[#D97706]" />}
            >
              Filter Genre {selectedGenre !== "all" ? `(${selectedGenre})` : ""}
            </Button>
          </div>
        </div>

        {/* TOP HORIZONTAL BAR: 6 MAIN CATEGORIES */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E7E0D3] pb-4">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeCat === c.id
                  ? "bg-[#1C2A26] text-[#FAF7F2] shadow-xs scale-105"
                  : "bg-white border border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26] hover:bg-[#FAF7F2]"
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        {/* ACTIVE FILTERS SUMMARY BAR */}
        <div className="flex items-center justify-between text-xs text-[#8A9B95] font-semibold pt-1">
          <div className="flex items-center gap-2">
            <span>Showing {totalShownCount} of {games.length} games</span>
            {selectedGenre !== "all" && (
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px] flex items-center gap-1">
                Genre: {selectedGenre}
                <button onClick={() => setSelectedGenre("all")} className="hover:text-red-700 ml-1">
                  ×
                </button>
              </span>
            )}
          </div>
        </div>

        {/* SECTIONS FOR CATEGORIES */}
        <div className="space-y-12">
          {filteredCategories.map((cat) => {
            let catGames = games.filter((g) => g.cat === cat.id);

            if (selectedGenre !== "all") {
              catGames = catGames.filter((g) => g.genre === selectedGenre);
            }

            if (searchQuery.trim()) {
              const q = searchQuery.toLowerCase();
              catGames = catGames.filter(
                (g) => g.t.toLowerCase().includes(q) || g.d.toLowerCase().includes(q)
              );
            }

            if (catGames.length === 0) return null;

            return (
              <section key={cat.id} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#E7E0D3]">
                  <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-[#1C2A26] flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </h2>
                  <span className="text-xs font-mono text-[#8A9B95]">{catGames.length} Games</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {catGames.map((game, idx) => (
                    <motion.a
                      key={idx}
                      href={game.u}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="group bg-white border border-[#E7E0D3] rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-lg transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{game.e}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#8A9B95] border border-[#E7E0D3]">
                              {game.genre}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#8A9B95] group-hover:text-[#D97706] transition-colors" />
                          </div>
                        </div>

                        <h3 className="font-serif-display font-bold text-base text-[#1C2A26] group-hover:text-[#D97706] transition-colors leading-tight">
                          {game.t}
                        </h3>

                        <p className="text-xs text-[#52635E] line-clamp-2 leading-relaxed font-sans">
                          {game.d}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#FAF7F2] flex items-center justify-between text-[11px] font-bold text-[#1C2A26] group-hover:text-[#D97706]">
                        <span>Play Now</span>
                        <span>→</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      {/* RIGHT-SIDE FAB BUTTON FOR GENRE TYPE DRAWER */}
      <div className="fixed right-6 bottom-6 z-40">
        <button
          onClick={() => setFabDrawerOpen(true)}
          className="bg-[#1C2A26] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group border border-[#3E6259]"
        >
          <Sparkles className="w-5 h-5 text-[#D97706]" />
          <span className="font-bold text-xs pr-1 hidden sm:inline">Genres</span>
        </button>
      </div>

      {/* RIGHT SLIDE-OUT GENRE DRAWER */}
      <AnimatePresence>
        {fabDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
            onClick={() => setFabDrawerOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-[#1C2A26] text-[#FAF7F2] h-full p-6 space-y-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#2D3F3A]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#D97706]" />
                    <h3 className="font-serif-display font-bold text-xl text-white">Filter by Genre</h3>
                  </div>
                  <button onClick={() => setFabDrawerOpen(false)} className="text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1.5">
                  {genres.map((g) => {
                    const isSelected = selectedGenre === g.id;
                    return (
                      <button
                        key={g.id}
                        onClick={() => {
                          setSelectedGenre(g.id);
                          setFabDrawerOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-[#D97706] text-white shadow-md"
                            : "bg-[#273732] text-gray-300 hover:bg-[#344842] hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-base">{g.icon}</span>
                          <span>{g.label}</span>
                        </div>
                        {isSelected && <span>✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-[#2D3F3A]">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-white border-gray-600 hover:bg-[#273732]"
                  onClick={() => {
                    setSelectedGenre("all");
                    setFabDrawerOpen(false);
                  }}
                >
                  Reset All Genre Filters
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
