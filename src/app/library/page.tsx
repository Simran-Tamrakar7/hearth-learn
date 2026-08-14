"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { getAllRealBooks } from "@/lib/realBooks";
import { ParsedBook } from "@/lib/bookParser";
import {
  BookOpen,
  Search,
  Bookmark as BookmarkIcon,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  Coffee,
  X,
  Upload,
  Library as LibraryIcon,
  Sparkles,
  Highlighter,
  Plus,
  Play,
  Check,
  RotateCcw,
  SlidersHorizontal,
  Clock,
  BookMarked,
  FileText,
} from "lucide-react";

interface HighlightItem {
  id: string;
  bookId: string;
  location: number;
  text: string;
  note?: string;
  color: string;
}

interface BookmarkItem {
  id: string;
  bookId: string;
  location: number;
  note?: string;
}

export default function FreshSpecLibraryPage() {
  const { toast } = useToast();

  const [activeGenre, setActiveGenre] = useState<string>("All Shelves");
  const [searchQuery, setSearchQuery] = useState("");
  const [inReaderSearch, setInReaderSearch] = useState("");

  // Reading Progress State (bookId -> { location: number, percentComplete: number, updatedAt: string })
  const [progressMap, setProgressMap] = useState<
    Record<string, { location: number; percentComplete: number; updatedAt: string }>
  >({});

  // Bookmarks & Highlights State
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [highlights, setHighlights] = useState<HighlightItem[]>([]);
  const [selectedHighlightColor, setSelectedHighlightColor] = useState("#FEF08A");
  const [newNoteInput, setNewNoteInput] = useState("");

  // Reader State
  const [detailModalBook, setDetailModalBook] = useState<ParsedBook | null>(null);
  const [activeBook, setActiveBook] = useState<ParsedBook | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [readingTheme, setReadingTheme] = useState<"paper" | "dark" | "sepia">("paper");
  const [fontFamily, setFontFamily] = useState<"serif" | "sans" | "mono">("serif");
  const [zoomScale, setZoomScale] = useState<number>(100);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Load Saved Reading Progress & Bookmarks on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("hearth_library_progress_map");
    const savedBookmarks = localStorage.getItem("hearth_library_bookmarks");
    const savedHighlights = localStorage.getItem("hearth_library_highlights");

    if (savedProgress) {
      try {
        setProgressMap(JSON.parse(savedProgress));
      } catch (e) {}
    }
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {}
    }
    if (savedHighlights) {
      try {
        setHighlights(JSON.parse(savedHighlights));
      } catch (e) {}
    }
  }, []);

  // Save Progress on Page Change
  useEffect(() => {
    if (activeBook) {
      const percent = Math.round((currentPage / activeBook.flatPages.length) * 100);
      const updatedMap = {
        ...progressMap,
        [activeBook.id]: {
          location: currentPage,
          percentComplete: percent,
          updatedAt: new Date().toISOString(),
        },
      };
      setProgressMap(updatedMap);
      localStorage.setItem("hearth_library_progress_map", JSON.stringify(updatedMap));
    }
  }, [activeBook, currentPage]);

  const catalogueBooks = getAllRealBooks();

  const handleOpenReader = (book: ParsedBook, initialPage?: number) => {
    setActiveBook(book);
    setDetailModalBook(null);
    const existing = progressMap[book.id];
    const pageToLoad = initialPage || existing?.location || 1;
    setCurrentPage(pageToLoad);
    toast({
      type: "info",
      title: `Reading ${book.title}`,
      description: `Loaded at Page ${pageToLoad} of ${book.flatPages.length}.`,
    });
  };

  const handleAddBookmark = () => {
    if (!activeBook) return;
    const newBookmark: BookmarkItem = {
      id: `bm-${Date.now()}`,
      bookId: activeBook.id,
      location: currentPage,
      note: newNoteInput || `Page ${currentPage} bookmark`,
    };
    const updated = [newBookmark, ...bookmarks];
    setBookmarks(updated);
    localStorage.setItem("hearth_library_bookmarks", JSON.stringify(updated));
    setNewNoteInput("");
    toast({
      type: "achievement",
      title: "Bookmark Saved 🔖",
      description: `Saved Page ${currentPage} location.`,
    });
  };

  const handleAddHighlight = (text: string) => {
    if (!activeBook || !text) return;
    const newHighlight: HighlightItem = {
      id: `hl-${Date.now()}`,
      bookId: activeBook.id,
      location: currentPage,
      text: text.slice(0, 150),
      color: selectedHighlightColor,
    };
    const updated = [newHighlight, ...highlights];
    setHighlights(updated);
    localStorage.setItem("hearth_library_highlights", JSON.stringify(updated));
    toast({
      type: "achievement",
      title: "Text Highlighted 🖍️",
      description: "Saved highlight per user/book/location.",
    });
  };

  const filteredBooks = catalogueBooks.filter((b) => {
    const matchesGenre = activeGenre === "All Shelves" || b.category.includes(activeGenre) || activeGenre.includes(b.category);
    const matchesSearch =
      searchQuery === "" ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesGenre && matchesSearch;
  });

  // "Currently Reading" Row Items
  const currentlyReadingList = catalogueBooks.filter((b) => progressMap[b.id]);

  // Real Search Matches inside active book
  const inBookMatches = activeBook && inReaderSearch.trim() !== ""
    ? activeBook.flatPages.filter((p) => p.text.toLowerCase().includes(inReaderSearch.toLowerCase()))
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      {!isFullScreen && <Navbar />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8 flex-1">
        {/* IF A BOOK IS ACTIVE -> RENDER FULL-SCREEN READER ENGINE */}
        {activeBook ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className={`space-y-4 ${isFullScreen ? "fixed inset-0 z-50 p-6 bg-[#1C2A26] text-white overflow-y-auto" : ""}`}
          >
            {/* READER TOP TOOLBAR */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-[#E7E0D3] shadow-xs text-xs">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveBook(null)}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Exit Reader
                </Button>

                <div className="hidden md:block border-l border-[#E7E0D3] pl-3">
                  <h3 className="font-serif-display font-bold text-sm text-[#1C2A26] truncate max-w-xs">
                    {activeBook.title}
                  </h3>
                  <p className="text-[10px] text-[#8A9B95]">
                    By {activeBook.author} • {activeBook.chapters.length} Real Chapters
                  </p>
                </div>
              </div>

              {/* Reader Options: Theme, Font Family, Size, Zoom, Fullscreen */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Theme Switcher: Paper | Dark | Sepia */}
                <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#E7E0D3]">
                  <button
                    onClick={() => setReadingTheme("paper")}
                    className={`p-1.5 rounded-lg flex items-center gap-1 text-[11px] font-bold ${
                      readingTheme === "paper" ? "bg-white text-[#1C2A26] shadow-xs" : "text-[#52635E]"
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5 text-[#D97706]" /> Paper
                  </button>

                  <button
                    onClick={() => setReadingTheme("dark")}
                    className={`p-1.5 rounded-lg flex items-center gap-1 text-[11px] font-bold ${
                      readingTheme === "dark" ? "bg-[#1C2A26] text-white shadow-xs" : "text-[#52635E]"
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5 text-blue-400" /> Dark
                  </button>

                  <button
                    onClick={() => setReadingTheme("sepia")}
                    className={`p-1.5 rounded-lg flex items-center gap-1 text-[11px] font-bold ${
                      readingTheme === "sepia" ? "bg-[#F4ECD8] text-[#78350F] shadow-xs" : "text-[#52635E]"
                    }`}
                  >
                    <Coffee className="w-3.5 h-3.5 text-[#78350F]" /> Sepia
                  </button>
                </div>

                {/* Typography Switcher: Serif | Sans | Mono */}
                <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#E7E0D3]">
                  {(["serif", "sans", "mono"] as const).map((ff) => (
                    <button
                      key={ff}
                      onClick={() => setFontFamily(ff)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                        fontFamily === ff ? "bg-[#1C2A26] text-white" : "text-[#52635E]"
                      }`}
                    >
                      {ff}
                    </button>
                  ))}
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#E7E0D3]">
                  <button onClick={() => setZoomScale((z) => Math.max(70, z - 10))} className="p-1 text-[#52635E] hover:text-[#1C2A26]">
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono font-bold w-9 text-center">{zoomScale}%</span>
                  <button onClick={() => setZoomScale((z) => Math.min(140, z + 10))} className="p-1 text-[#52635E] hover:text-[#1C2A26]">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAddBookmark}
                  leftIcon={<BookmarkIcon className="w-4 h-4 text-[#D97706]" />}
                >
                  Bookmark
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  leftIcon={isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                >
                  {isFullScreen ? "Exit Fullscreen" : "Fullscreen Mode"}
                </Button>
              </div>
            </div>

            {/* MAIN READER WORKSPACE (Sidebar + Paper Reader Canvas) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: TOC, Search inside text, Bookmarks & Highlights */}
              <div className="lg:col-span-4 space-y-4">
                <Card variant="glass" hoverable={false} className="p-6 space-y-6 border-[#E7E0D3]">
                  <div className="flex gap-4 items-start">
                    <img src={activeBook.coverUrl} alt={activeBook.title} className="w-20 h-28 object-cover rounded-2xl border border-[#E7E0D3] shadow-md shrink-0" />
                    <div className="space-y-1">
                      <Badge variant="amber">{activeBook.source}</Badge>
                      <h4 className="font-serif-display font-bold text-sm text-[#1C2A26] line-clamp-2">
                        {activeBook.title}
                      </h4>
                      <p className="text-[11px] text-[#8A9B95]">By {activeBook.author}</p>
                      <span className="text-[10px] text-[#34D399] font-bold block">{activeBook.flatPages.length} Total Pages</span>
                    </div>
                  </div>

                  {/* Search inside text */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] block">
                      SEARCH INSIDE TEXT
                    </span>
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-[#8A9B95] absolute left-3 top-3" />
                      <input
                        type="text"
                        value={inReaderSearch}
                        onChange={(e) => setInReaderSearch(e.target.value)}
                        placeholder="Search Elizabeth, Darcy, monster..."
                        className="w-full h-9 pl-9 pr-3 text-xs bg-white border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
                      />
                    </div>

                    {inReaderSearch.trim() !== "" && (
                      <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E7E0D3] text-xs space-y-2 max-h-48 overflow-y-auto">
                        <span className="text-[10px] font-bold text-[#D97706]">
                          Found {inBookMatches.length} matching pages:
                        </span>

                        {inBookMatches.slice(0, 8).map((match, i) => (
                          <div
                            key={i}
                            onClick={() => setCurrentPage(match.globalPageNumber)}
                            className="p-2 bg-white rounded-lg border border-[#E7E0D3] cursor-pointer hover:border-[#1C2A26] space-y-1"
                          >
                            <div className="flex justify-between font-bold text-[11px]">
                              <span>{match.chapterTitle}</span>
                              <span className="text-[#D97706]">p. {match.globalPageNumber}</span>
                            </div>
                            <p className="text-[10px] text-[#52635E] line-clamp-2 italic">
                              "{match.text.slice(0, 100)}..."
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Complete Table of Contents */}
                  <div className="space-y-2 pt-2 border-t border-[#E7E0D3]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#52635E] block">
                      TABLE OF CONTENTS ({activeBook.chapters.length} CHAPTERS)
                    </span>

                    <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                      {activeBook.chapters.map((chap, idx) => {
                        const isCurrentChapter =
                          activeBook.flatPages[currentPage - 1]?.chapterNumber === chap.chapterNumber;

                        return (
                          <button
                            key={idx}
                            onClick={() => setCurrentPage(chap.startPage)}
                            className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                              isCurrentChapter
                                ? "bg-[#1C2A26] text-[#FAF7F2] font-bold shadow-xs"
                                : "bg-white border border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26]"
                            }`}
                          >
                            <span className="truncate">{chap.title}</span>
                            <span className="text-[10px] font-mono opacity-75 shrink-0 ml-2">p. {chap.startPage}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column: Paper Reader Canvas */}
              <div className="lg:col-span-8 space-y-4">
                <Card
                  variant="default"
                  hoverable={false}
                  className={`p-8 sm:p-12 space-y-6 border-[#E7E0D3] min-h-[580px] shadow-md rounded-3xl relative flex flex-col justify-between transition-colors ${
                    readingTheme === "dark"
                      ? "bg-[#0F172A] text-slate-100 border-slate-800"
                      : readingTheme === "sepia"
                      ? "bg-[#F4ECD8] text-[#451A03] border-[#E2D4B9]"
                      : "bg-[#FAF7F2] text-[#1C2A26] border-[#E7E0D3]"
                  }`}
                  style={{ transform: `scale(${zoomScale / 100})`, transformOrigin: "top center" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex justify-between items-center pb-3 border-b border-current/10">
                        <span className="text-xs font-serif-display font-bold text-[#D97706]">
                          {activeBook.flatPages[currentPage - 1]?.chapterTitle || activeBook.title}
                        </span>

                        <span className="text-[11px] font-mono font-bold opacity-75">
                          Page {currentPage} of {activeBook.flatPages.length}
                        </span>
                      </div>

                      {/* Real Book Text Content */}
                      <div
                        onMouseUp={() => {
                          const selection = window.getSelection()?.toString();
                          if (selection && selection.trim().length > 5) {
                            handleAddHighlight(selection.trim());
                          }
                        }}
                        className={`prose prose-sm max-w-none leading-relaxed whitespace-pre-line text-inherit ${
                          fontFamily === "serif" ? "font-serif-display" : fontFamily === "mono" ? "font-mono text-xs" : "font-sans-body"
                        }`}
                      >
                        {activeBook.flatPages[currentPage - 1]?.text || "End of book content."}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Page Navigation Footer */}
                  <div className="pt-6 border-t border-current/10 flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      leftIcon={<ChevronLeft className="w-4 h-4" />}
                    >
                      Previous Page
                    </Button>

                    <div className="text-center space-y-1">
                      <span className="text-xs font-bold block">
                        Page {currentPage} of {activeBook.flatPages.length} ({Math.round((currentPage / activeBook.flatPages.length) * 100)}%)
                      </span>
                      <div className="w-36 bg-current/10 h-1.5 rounded-full overflow-hidden mx-auto">
                        <div
                          className="bg-[#D97706] h-full transition-all rounded-full"
                          style={{ width: `${(currentPage / activeBook.flatPages.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    <Button
                      variant="amber"
                      size="sm"
                      disabled={currentPage >= activeBook.flatPages.length}
                      onClick={() => setCurrentPage((p) => Math.min(activeBook.flatPages.length, p + 1))}
                      rightIcon={<ChevronRight className="w-4 h-4" />}
                    >
                      Next Page
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        ) : (
          /* MAIN BROWSING UI (STOREFRONT SHELF GRID) */
          <div className="space-y-8">
            {/* Hero Banner */}
            <div className="bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EFE6] border border-[#E7E0D3] rounded-3xl p-6 sm:p-10 space-y-4 shadow-sm relative overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-3 w-full">
                  <div className="flex items-center gap-2">
                    <Badge variant="amber" icon={<LibraryIcon className="w-3.5 h-3.5" />}>
                      LIBRARY MODULE · FRESH SPEC
                    </Badge>
                    <span className="text-xs font-semibold text-[#8A9B95]">Google Books Style Reading Experience</span>
                  </div>

                  <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1C2A26] tracking-tight">
                    The Library
                  </h1>

                  <p className="text-xs sm:text-base text-[#52635E] leading-relaxed">
                    Read complete public domain works, technical handbooks, and open access journals with full chapter reflowable pagination.
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="pt-2 sm:max-w-md">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#8A9B95] absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Pride and Prejudice, Frankenstein, Jane Austen..."
                    className="w-full h-11 pl-11 pr-4 text-xs sm:text-sm bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706] shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* 1. CURRENTLY READING ROW (TOP ROW PULLED FROM READING PROGRESS) */}
            {currentlyReadingList.length > 0 && (
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] block">
                  CONTINUE READING (SAVED PROGRESS)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentlyReadingList.map((b) => {
                    const prog = progressMap[b.id];
                    return (
                      <div
                        key={b.id}
                        onClick={() => handleOpenReader(b, prog.location)}
                        className="bg-white border border-[#E7E0D3] rounded-2xl p-4 flex gap-4 items-center cursor-pointer hover:border-[#1C2A26] transition-all shadow-xs"
                      >
                        <img src={b.coverUrl} alt={b.title} className="w-14 h-20 object-cover rounded-xl border border-[#E7E0D3] shrink-0" />
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <h4 className="font-serif-display font-bold text-xs text-[#1C2A26] truncate">
                            {b.title}
                          </h4>
                          <p className="text-[10px] text-[#8A9B95] truncate">By {b.author}</p>

                          <div className="space-y-1 pt-1">
                            <div className="flex justify-between text-[10px] font-bold text-[#52635E]">
                              <span>Page {prog.location} of {b.flatPages.length}</span>
                              <span className="text-[#D97706]">{prog.percentComplete}%</span>
                            </div>
                            <div className="w-full bg-[#FAF7F2] h-1.5 rounded-full overflow-hidden border border-[#E7E0D3]">
                              <div className="bg-[#D97706] h-full rounded-full transition-all" style={{ width: `${prog.percentComplete}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. GENRE SHELVES NAVIGATION PILLS */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[#E7E0D3] pb-4">
              {(["All Shelves", "Fiction", "Classics", "Education/Nonfiction", "Tech Guides", "Magazines"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setActiveGenre(g)}
                  className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all ${
                    activeGenre === g
                      ? "bg-[#1C2A26] text-[#FAF7F2] shadow-xs"
                      : "bg-white border border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26]"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* 3. COVER-FORWARD SHELF GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => {
                const prog = progressMap[book.id];
                return (
                  <motion.div
                    key={book.id}
                    whileHover={{ y: -6, scale: 1.02 }}
                    onClick={() => setDetailModalBook(book)}
                    className="bg-white border border-[#E7E0D3] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-64 relative overflow-hidden bg-[#FAF7F2] p-4 flex items-center justify-center">
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="h-full object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300 border border-[#E7E0D3]"
                        />

                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#1C2A26] text-[#34D399] text-[9px] font-bold uppercase tracking-wider">
                          {book.format}
                        </span>
                      </div>

                      <div className="p-5 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-[#8A9B95] font-medium">
                          <span>{book.source}</span>
                          <span>{book.chapters.length} chapters</span>
                        </div>

                        <h3 className="font-serif-display font-bold text-base text-[#1C2A26] group-hover:text-[#D97706] transition-colors leading-snug">
                          {book.title}
                        </h3>

                        <p className="text-xs text-[#52635E] leading-relaxed line-clamp-2">
                          {book.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 text-xs font-bold text-[#1C2A26] group-hover:text-[#D97706] flex items-center justify-between border-t border-[#F5EFE6]">
                      <span>{prog ? `Continue reading (${prog.percentComplete}%)` : "Start reading"}</span>
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* BOOK DETAIL MODAL (BEFORE OPENING READER) */}
        {detailModalBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2A26]/40 backdrop-blur-xs">
            <div className="bg-white border border-[#E7E0D3] rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative">
              <button
                onClick={() => setDetailModalBook(null)}
                className="absolute top-6 right-6 text-[#8A9B95] hover:text-[#1C2A26]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex gap-6 items-start">
                <img
                  src={detailModalBook.coverUrl}
                  alt={detailModalBook.title}
                  className="w-28 h-40 object-cover rounded-2xl border border-[#E7E0D3] shadow-md shrink-0"
                />

                <div className="space-y-2">
                  <Badge variant="amber">{detailModalBook.category}</Badge>
                  <h3 className="font-serif-display font-bold text-xl text-[#1C2A26]">
                    {detailModalBook.title}
                  </h3>
                  <p className="text-xs text-[#8A9B95]">By {detailModalBook.author}</p>
                  <span className="text-xs text-[#34D399] font-bold block">{detailModalBook.flatPages.length} Pages • {detailModalBook.chapters.length} Chapters</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#E7E0D3]">
                <span className="text-xs font-bold text-[#1C2A26] uppercase tracking-wider block">Description:</span>
                <p className="text-xs text-[#52635E] leading-relaxed">
                  {detailModalBook.description}
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" size="md" onClick={() => setDetailModalBook(null)}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleOpenReader(detailModalBook)}
                  leftIcon={<Play className="w-4 h-4 text-[#D97706] fill-current" />}
                >
                  {progressMap[detailModalBook.id] ? "Continue reading" : "Start reading"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
