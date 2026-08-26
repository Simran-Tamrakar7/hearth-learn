"use client";

/* PAGE: /rest/games  — this file is the screen. Catalog: ./_content.ts. Map: ./CODE-FOR-THIS-PAGE.md */

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ARCADIA_CATEGORIES,
  ARCADIA_GENRES,
  ArcadiaGame,
  gamePinId,
} from "@/app/rest/games/_content";
import { emptyGame, listedGames, patchGame, removeGame, saveGame, subscribeGames, type UserGame, isUserGame, catalogGames } from "@/app/rest/games/_lib/userGames";
import { kebabItems, KebabMenu } from "@/app/manuals/_ui/KebabMenu";
import { ImageField } from "@/components/ui/ImageField";
import { usePermissions } from "@/lib/useAuthz";
import { PinButton, getPinnedItems, PinnedItemMetadata, togglePinnedItem } from "@/components/ui/PinButton";
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
  ArrowRight,
  Flame,
  Globe,
  Pin,
} from "lucide-react";

export default function ArcadiaGamesShelfPage() {
  const perms = usePermissions();
  const [activeCat, setActiveCat] = useState<string>("all");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [fabDrawerOpen, setFabDrawerOpen] = useState<boolean>(false);
  const [pinnedGames, setPinnedGames] = useState<PinnedItemMetadata[]>([]);
  const [games, setGames] = useState<UserGame[]>(catalogGames);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<UserGame | null>(null);
  const [draft, setDraft] = useState({
    title: "",
    url: "",
    cat: "arcade" as ArcadiaGame["cat"],
    genre: "Arcade",
    description: "",
    emoji: "🎮",
    imageUrl: "",
  });

  useEffect(() => subscribeGames(() => setGames(listedGames())), []);

  useEffect(() => {
    const updatePins = () => {
      const allPins = getPinnedItems();
      setPinnedGames(allPins.filter((p) => p.type === "game"));
    };
    updatePins();
    window.addEventListener("hearth_pins_updated", updatePins);
    return () => window.removeEventListener("hearth_pins_updated", updatePins);
  }, []);

  function openAdd() {
    setEditing(null);
    setDraft({ title: "", url: "", cat: "arcade", genre: "Arcade", description: "", emoji: "🎮", imageUrl: "" });
    setFormOpen(true);
  }

  function openEdit(g: UserGame) {
    setEditing(g);
    setDraft({
      title: g.t,
      url: g.u,
      cat: g.cat,
      genre: g.genre,
      description: g.d,
      emoji: g.e,
      imageUrl: g.imageUrl || "",
    });
    setFormOpen(true);
  }

  function submitGame(e: React.FormEvent) {
    e.preventDefault();
    const title = draft.title.trim();
    if (!title) return;
    const fields = {
      t: title,
      u: draft.url.trim() || "https://",
      cat: draft.cat,
      genre: draft.genre,
      d: draft.description.trim(),
      e: draft.emoji.trim() || "🎮",
      imageUrl: draft.imageUrl.trim(),
    };
    if (editing) {
      if (isUserGame(editing.id)) saveGame({ ...editing, ...fields });
      else patchGame(editing.id, fields);
    } else {
      saveGame(emptyGame({ title, url: draft.url, cat: draft.cat, genre: draft.genre, description: draft.description, emoji: draft.emoji, imageUrl: draft.imageUrl }));
    }
    setFormOpen(false);
    setEditing(null);
  }

  const categories = ARCADIA_CATEGORIES;
  const genres = ARCADIA_GENRES;

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
            {perms.canCreate ? (
              <button
                type="button"
                aria-label="Add game"
                onClick={openAdd}
                className="inline-flex items-center justify-center h-11 w-11 rounded-2xl bg-[#1C2A26] text-[#FAF7F2] hover:bg-[#243530] shadow-xs"
              >
                <Plus className="w-5 h-5" />
              </button>
            ) : null}
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

          {formOpen ? (
            <form onSubmit={submitGame} className="max-w-xl space-y-2 pt-2">
              <input
                value={draft.title}
                onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                placeholder="Game name"
                aria-label="Game name"
                className="w-full h-11 px-3 text-sm bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706]"
              />
              <input
                value={draft.url}
                onChange={(e) => setDraft((d) => ({ ...d, url: e.target.value }))}
                placeholder="Play URL"
                aria-label="Game URL"
                className="w-full h-10 px-3 text-xs bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706]"
              />
              <div className="flex gap-2">
                <select
                  value={draft.cat}
                  onChange={(e) => setDraft((d) => ({ ...d, cat: e.target.value as ArcadiaGame["cat"] }))}
                  aria-label="Category"
                  className="h-10 flex-1 px-3 text-xs bg-white border border-[#E7E0D3] rounded-2xl"
                >
                  {categories.filter((c) => c.id !== "all").map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <select
                  value={draft.genre}
                  onChange={(e) => setDraft((d) => ({ ...d, genre: e.target.value }))}
                  aria-label="Genre"
                  className="h-10 flex-1 px-3 text-xs bg-white border border-[#E7E0D3] rounded-2xl"
                >
                  {genres.filter((g) => g.id !== "all").map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                rows={2}
                value={draft.description}
                onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                placeholder="Short description"
                className="w-full px-3 py-2 text-xs bg-white border border-[#E7E0D3] rounded-2xl resize-none"
              />
              <ImageField value={draft.imageUrl} onChange={(imageUrl) => setDraft((d) => ({ ...d, imageUrl }))} label="Card image" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => { setFormOpen(false); setEditing(null); }} className="h-10 px-3 text-xs font-semibold text-[#52635E]">
                  Cancel
                </button>
                <button type="submit" className="h-10 px-4 rounded-2xl bg-[#1C2A26] text-[#FAF7F2] text-xs font-semibold">
                  {editing ? "Save" : "Add game"}
                </button>
              </div>
            </form>
          ) : null}

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

        {/* 📌 PINNED FAVORITE GAMES SHELF */}
        {pinnedGames.length > 0 && (
          <div className="space-y-4 bg-gradient-to-br from-white via-[#FAF7F2] to-[#FEF3C7]/40 border border-[#E7E0D3] rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="font-serif-display text-xl font-bold text-[#1C2A26] flex items-center gap-2">
                <Pin className="w-5 h-5 text-[#D97706]" />
                <span>Your Pinned Favorite Games ({pinnedGames.length})</span>
              </h2>
              <span className="text-xs text-[#8A9B95] font-semibold">1-Click Launch</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pinnedGames.map((game) => (
                <div
                  key={game.id}
                  className="bg-white border border-[#E7E0D3] rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs hover:border-[#1C2A26] transition-all group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{game.icon || "🎮"}</span>
                      <PinButton
                        itemId={game.id}
                        itemTitle={game.title}
                        itemCategory={game.category}
                        itemType="game"
                        itemUrl={game.url}
                        itemIcon={game.icon}
                        variant="icon"
                      />
                    </div>
                    <h3 className="font-serif-display font-bold text-base text-[#1C2A26] truncate pt-1">
                      {game.title}
                    </h3>
                    {game.category && (
                      <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider block">
                        {game.category}
                      </span>
                    )}
                  </div>

                  <Button
                    variant="amber"
                    size="sm"
                    onClick={() => window.open(game.url, "_blank", "noopener,noreferrer")}
                    className="w-full text-xs"
                    rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                  >
                    Play Game Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

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
                  {catGames.map((game) => (
                    <motion.div
                      key={game.id}
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="group bg-white border border-[#E7E0D3] rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-lg transition-all"
                    >
                      {game.imageUrl ? (
                        <img src={game.imageUrl} alt="" className="h-28 w-full object-cover rounded-xl border border-[#E7E0D3]" />
                      ) : null}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{game.e}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#8A9B95] border border-[#E7E0D3]">
                              {game.genre}
                            </span>
                            <PinButton
                              itemId={gamePinId(game)}
                              itemTitle={game.t}
                              itemCategory={game.genre}
                              itemType="game"
                              itemUrl={game.u}
                              itemIcon={game.imageUrl || game.e}
                              variant="icon"
                            />
                            <KebabMenu
                              compact
                              label={`Actions for ${game.t}`}
                              items={kebabItems([
                                perms.canEdit && { label: "Edit", onClick: () => openEdit(game) },
                                {
                                  label: "Pin",
                                  onClick: () =>
                                    togglePinnedItem({
                                      id: gamePinId(game),
                                      title: game.t,
                                      category: game.genre,
                                      type: "game",
                                      url: game.u,
                                      icon: game.imageUrl || game.e,
                                    }),
                                },
                                perms.canDelete && {
                                  label: "Delete",
                                  danger: true,
                                  onClick: () => {
                                    if (!window.confirm(`Remove “${game.t}”?`)) return;
                                    removeGame(game.id);
                                  },
                                },
                              ])}
                            />
                          </div>
                        </div>

                        <a href={game.u} target="_blank" rel="noopener noreferrer" className="block">
                          <h3 className="font-serif-display font-bold text-base text-[#1C2A26] group-hover:text-[#D97706] transition-colors leading-tight">
                            {game.t}
                          </h3>
                          <p className="text-xs text-[#52635E] line-clamp-2 leading-relaxed font-sans mt-1">
                            {game.d}
                          </p>
                        </a>
                      </div>

                      <a
                        href={game.u}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pt-2 border-t border-[#FAF7F2] flex items-center justify-between text-[11px] font-bold text-[#1C2A26] group-hover:text-[#D97706]"
                      >
                        <span>Play Now</span>
                        <span>→</span>
                      </a>
                    </motion.div>
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
