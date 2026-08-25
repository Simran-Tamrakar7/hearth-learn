"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useToast } from "@/components/ui/Toast";
import {
  Flame,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  Coffee,
  CheckCircle2,
  Trophy,
  Zap,
  ListOrdered,
  Pin,
  Plus,
  X,
  Compass,
  Gamepad2,
  UtensilsCrossed,
  Sun,
  Moon,
  Quote as QuoteIcon,
  RefreshCw,
  ExternalLink,
  Star,
} from "lucide-react";
import { COOKBOOK_DISHES } from "@/lib/cookbookData";
import { ARCADIA_GAMES } from "@/lib/gamesData";
import { findHearthManual } from "@/lib/manualsData";
import { pinnableManuals } from "@content/manuals/_registry";
import { PinButton, getPinnedItems, savePinnedItems, PinnedItemMetadata } from "@/components/ui/PinButton";

interface DashboardData {
  user: {
    id: string;
    name: string;
    email: string;
    streak: {
      currentCount: number;
      longestCount: number;
    };
    badgesCount: number;
  };
  activeTrails: any[];
  continueTrail: any;
}

const PINNABLE_MANUALS = pinnableManuals().map((m) => ({
  ...m,
  category: findHearthManual(m.slug)?.category ?? "",
}));

// Zodiac Signs Data
const ZODIAC_SIGNS = [
  { id: "aries", name: "Aries", symbol: "♈", dates: "Mar 21 - Apr 19" },
  { id: "taurus", name: "Taurus", symbol: "♉", dates: "Apr 20 - May 20" },
  { id: "gemini", name: "Gemini", symbol: "♊", dates: "May 21 - Jun 20" },
  { id: "cancer", name: "Cancer", symbol: "♋", dates: "Jun 21 - Jul 22" },
  { id: "leo", name: "Leo", symbol: "♌", dates: "Jul 23 - Aug 22" },
  { id: "virgo", name: "Virgo", symbol: "♍", dates: "Aug 23 - Sep 22" },
  { id: "libra", name: "Libra", symbol: "♎", dates: "Sep 23 - Oct 22" },
  { id: "scorpio", name: "Scorpio", symbol: "♏", dates: "Oct 23 - Nov 21" },
  { id: "sagittarius", name: "Sagittarius", symbol: "♐", dates: "Nov 22 - Dec 21" },
  { id: "capricorn", name: "Capricorn", symbol: "♑", dates: "Dec 22 - Jan 19" },
  { id: "aquarius", name: "Aquarius", symbol: "♒", dates: "Jan 20 - Feb 18" },
  { id: "pisces", name: "Pisces", symbol: "♓", dates: "Feb 19 - Mar 20" },
];

function getDailyHoroscope(signId: string) {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const seed = dateStr.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) + signId.length * 17;

  const luckyNumbers = [3, 7, 11, 14, 21, 27, 33, 42, 88];
  const powerColors = ["Amber Gold", "Deep Forest Green", "Royal Crimson", "Sapphire Blue", "Emerald", "Violet Slate"];
  const luckyTimes = ["9:15 AM", "11:30 AM", "2:45 PM", "4:20 PM", "7:10 PM", "9:00 PM"];

  const horoscopes: Record<string, string[]> = {
    aries: [
      "Your natural momentum is surging today. Channel your fierce focus into solving one complex architecture or study milestone before noon.",
      "Courage is your superpower today. Don't hesitate to refactor complex code or tackle difficult concepts—clarity follows decisive action.",
    ],
    taurus: [
      "Patience and steady craftsmanship bring extraordinary progress today. Focus on foundational study guides and deliberate practice.",
      "Ground yourself in calm routine. Small, consistent study steps today build undeniable mastery for the long run.",
    ],
    gemini: [
      "Your curious mind is operating at peak speed today. Great time for deep reading, exploring new technical manuals, or connecting ideas.",
      "Synthesis is your theme today. Bridge insights between different subjects and let your versatile intellect lead the way.",
    ],
    cancer: [
      "Intuition aligns with logic today. Trust your gut when organizing notes, designing workflows, or taking a restorative break.",
      "Protect your sanctuary and create a peaceful learning environment. Quiet focus will yield your best breakthroughs today.",
    ],
    leo: [
      "Your creative confidence is shining brightly. Share your learning build on the Showcase Wall or inspire a peer today.",
      "Lead by example today. Your enthusiasm for learning radiates energy to your surrounding environment.",
    ],
    virgo: [
      "Precision and attention to detail are your competitive edge today. Perfect day for code reviews, testing, or refining notes.",
      "Clarity comes from structure. Systematize your daily schedule and enjoy the satisfaction of clean execution.",
    ],
    libra: [
      "Harmony and balance bring mental flow today. Balance intense technical study with cozy rest and restorative breaks.",
      "Collaborative ideas flourish today. Seek elegant solutions and balanced perspectives in your study session.",
    ],
    scorpio: [
      "Deep focus and intense determination power your session today. Unravel hard problems and dive straight to core principles.",
      "Transformative insight is available today. Dig beneath the surface of complex manuals to unlock true understanding.",
    ],
    sagittarius: [
      "Expansive vision and optimism fuel your curiosity today. Explore brand new topics, study guides, or distant horizon goals.",
      "Embrace the adventure of learning today. Every new concept opens a portal to broader possibilities.",
    ],
    capricorn: [
      "Disciplined focus and master planning yield tangible results today. Stack another day onto your streak with pride.",
      "Your ambition is matched by your grit today. Methodical progress leads directly to your highest learning peak.",
    ],
    aquarius: [
      "Innovative thinking and original ideas spark today. Experiment with new digital tools, workflows, or creative projects.",
      "Think outside conventional boxes today. Your unique perspective leads to breakthrough problem-solving.",
    ],
    pisces: [
      "Imaginative clarity and calm flow guide your mind today. Let your intuition rhythmically digest new information.",
      "Subtle insights surface when you relax into the flow. Combine structured study with peaceful reflection.",
    ],
  };

  const signHoroscopes = horoscopes[signId] || horoscopes["aries"];
  const text = signHoroscopes[seed % signHoroscopes.length];
  const luckyNum = luckyNumbers[seed % luckyNumbers.length];
  const powerColor = powerColors[seed % powerColors.length];
  const luckyTime = luckyTimes[seed % luckyTimes.length];

  return { text, luckyNum, powerColor, luckyTime, dateStr };
}

const DAILY_THOUGHTS = [
  { quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle", tag: "Mastery" },
  { quote: "The man who moves a mountain begins by carrying away small stones.", author: "Confucius", tag: "Momentum" },
  { quote: "Simplify, then add lightness.", author: "Colin Chapman", tag: "Design" },
  { quote: "First, solve the problem. Then, write the code.", author: "John Johnson", tag: "Engineering" },
  { quote: "Make it work, make it right, make it fast.", author: "Kent Beck", tag: "Craftsmanship" },
  { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", tag: "Persistence" },
  { quote: "The chief cause of failure and unhappiness is trading what you want most for what you want now.", author: "Zig Ziglar", tag: "Focus" },
  { quote: "Luck is what happens when preparation meets opportunity.", author: "Seneca", tag: "Preparedness" },
  { quote: "The secret of getting ahead is getting started.", author: "Mark Twain", tag: "Action" },
  { quote: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra", tag: "Clarity" },
  { quote: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma", tag: "Growth" },
  { quote: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche", tag: "Purpose" },
];

function getDailyThought(customIndex?: number) {
  if (typeof customIndex === "number") {
    return DAILY_THOUGHTS[customIndex % DAILY_THOUGHTS.length];
  }

  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];
  const hash = dateStr.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return DAILY_THOUGHTS[hash % DAILY_THOUGHTS.length];
}

export default function DashboardPage() {
  const { toast } = useToast();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [streakCount, setStreakCount] = useState(1);

  // Pinning System State
  const [pinnedItems, setPinnedItems] = useState<PinnedItemMetadata[]>([]);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  // Zodiac & Thought State
  const [selectedZodiac, setSelectedZodiac] = useState("aries");
  const [thoughtIndex, setThoughtIndex] = useState<number | undefined>(undefined);
  const [liveQuote, setLiveQuote] = useState<{ quote: string; author: string; source?: string } | null>(null);

  useEffect(() => {
    fetchDashboard();
    fetchLiveQuote();

    const loadPins = () => {
      setPinnedItems(getPinnedItems());
    };

    loadPins();
    window.addEventListener("hearth_pins_updated", loadPins);

    // Load Saved Zodiac
    try {
      const savedZodiac = localStorage.getItem("hearth_user_zodiac");
      if (savedZodiac) {
        setSelectedZodiac(savedZodiac);
      }
    } catch (e) {
      console.error("Local storage load error:", e);
    }

    return () => window.removeEventListener("hearth_pins_updated", loadPins);
  }, []);

  const fetchLiveQuote = async () => {
    try {
      const res = await fetch("/api/quote/daily");
      if (res.ok) {
        const data = await res.json();
        if (data.quote) {
          setLiveQuote(data);
        }
      }
    } catch (err) {
      console.error("Live quote fetch error:", err);
    }
  };

  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/user/dashboard");
      const result = await res.json();
      if (result.user) {
        setData(result);
        setStreakCount(result.user.streak.currentCount);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getGameId = (g: typeof ARCADIA_GAMES[0]) => {
    return `g-${g.t.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
  };

  const handleZodiacChange = (newSign: string) => {
    setSelectedZodiac(newSign);
    localStorage.setItem("hearth_user_zodiac", newSign);
    toast({
      type: "info",
      title: `Daily Horoscope Updated 🔮`,
      description: `Viewing horoscope for ${ZODIAC_SIGNS.find((z) => z.id === newSign)?.name}.`,
    });
  };

  const cycleThought = () => {
    const nextIdx = (thoughtIndex ?? 0) + 1;
    setThoughtIndex(nextIdx);
  };

  const triggerStreakCelebration = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#D97706", "#223832", "#FEF3C7"],
    });

    setStreakCount((prev) => prev + 1);
    toast({
      type: "achievement",
      title: "Streak Celebrated! 🔥",
      description: "You're keeping your personal learning hearth alive.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FBF8F3]">
        <Navbar />
        <div className="max-w-5xl mx-auto p-8 space-y-6">
          <div className="h-8 bg-[#E7E0D3] rounded w-1/3 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-white rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const user = data?.user;
  const continueTrail = data?.continueTrail;
  const activeTrails = data?.activeTrails || [];

  const horoscope = getDailyHoroscope(selectedZodiac);
  const activeZodiacObj = ZODIAC_SIGNS.find((z) => z.id === selectedZodiac) || ZODIAC_SIGNS[0];
  const currentThought = getDailyThought(thoughtIndex);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-10 w-full space-y-10 flex-1">
        {/* Header Greeting */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D97706] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Today&apos;s Sanctuary Session
            </div>
            <h1 className="font-serif-display text-3xl font-bold text-[#1C2A26]">
              Welcome back, {user?.name || "Self-Learner"}
            </h1>
            <p className="text-xs text-[#52635E]">
              15 minutes of calm, bite-sized study keeps your momentum going.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPinModalOpen(true)}
              leftIcon={<Pin className="w-3.5 h-3.5 text-[#D97706]" />}
            >
              Pin Favorites
            </Button>

            <Link href="/rest">
              <Button variant="secondary" size="sm" leftIcon={<Coffee className="w-4 h-4" />}>
                Break Room
              </Button>
            </Link>
            <Link href="/manuals">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Browse Manuals
              </Button>
            </Link>
          </div>
        </div>

        {/* DYNAMIC WIDGETS ROW: HOROSCOPE OF THE DAY + THOUGHT OF THE DAY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* DAILY HOROSCOPE WIDGET */}
          <div className="lg:col-span-7">
            <Card variant="default" hoverable={false} className="p-6 sm:p-7 space-y-5 bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EFE6] border-[#E7E0D3] shadow-sm relative overflow-hidden h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D97706]">
                    <Sparkles className="w-4 h-4" />
                    <span>Daily Horoscope</span>
                    <span className="text-[10px] text-[#8A9B95] font-mono">({horoscope.dateStr})</span>
                  </div>

                  {/* Zodiac Selector Dropdown */}
                  <select
                    value={selectedZodiac}
                    onChange={(e) => handleZodiacChange(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#E7E0D3] text-xs font-bold text-[#1C2A26] focus:outline-none focus:border-[#D97706] shadow-2xs cursor-pointer"
                  >
                    {ZODIAC_SIGNS.map((z) => (
                      <option key={z.id} value={z.id}>
                        {z.symbol} {z.name} ({z.dates})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-start gap-4 pt-1">
                  <div className="w-12 h-12 rounded-2xl bg-[#1C2A26] text-[#D97706] text-2xl flex items-center justify-center shrink-0 shadow-md">
                    {activeZodiacObj.symbol}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h3 className="font-serif-display font-bold text-lg text-[#1C2A26]">
                      {activeZodiacObj.name} Daily Guidance
                    </h3>
                    <p className="text-xs text-[#52635E] leading-relaxed italic">
                      &quot;{horoscope.text}&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Horoscope Lucky Stats */}
              <div className="pt-4 border-t border-[#E7E0D3] grid grid-cols-3 gap-3 text-center">
                <div className="bg-white/80 p-2.5 rounded-xl border border-[#E7E0D3]">
                  <span className="text-[10px] font-bold text-[#8A9B95] uppercase block">Lucky Number</span>
                  <span className="font-serif-display font-bold text-sm text-[#D97706]">{horoscope.luckyNum}</span>
                </div>
                <div className="bg-white/80 p-2.5 rounded-xl border border-[#E7E0D3]">
                  <span className="text-[10px] font-bold text-[#8A9B95] uppercase block">Power Color</span>
                  <span className="font-serif-display font-bold text-xs text-[#1C2A26] truncate block">{horoscope.powerColor}</span>
                </div>
                <div className="bg-white/80 p-2.5 rounded-xl border border-[#E7E0D3]">
                  <span className="text-[10px] font-bold text-[#8A9B95] uppercase block">Peak Energy Window</span>
                  <span className="font-serif-display font-bold text-xs text-[#1C2A26]">{horoscope.luckyTime}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* DYNAMIC THOUGHT OF THE DAY WIDGET (PULLED LIVE FROM API) */}
          <div className="lg:col-span-5">
            <Card variant="default" hoverable={false} className="p-6 sm:p-7 space-y-5 bg-[#1C2A26] text-[#FAF7F2] border-[#2D3F3A] shadow-md relative overflow-hidden h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D97706]">
                    <QuoteIcon className="w-4 h-4" />
                    <span>Thought of the Day</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      fetchLiveQuote();
                      cycleThought();
                    }}
                    className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/10 text-white/80 hover:bg-white/20 transition-all"
                    title="Fetch fresh quote from API"
                  >
                    <RefreshCw className="w-3 h-3 text-[#D97706]" />
                    <span>Fetch New</span>
                  </button>
                </div>

                <div className="space-y-2 pt-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider bg-[#D97706]/20 text-[#D97706] border border-[#D97706]/30">
                    {liveQuote?.source ? liveQuote.source.toUpperCase() : currentThought.tag.toUpperCase()}
                  </span>
                  <p className="font-serif-display text-base sm:text-lg leading-snug font-medium text-white/95 italic">
                    &quot;{liveQuote?.quote || currentThought.quote}&quot;
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-amber-200/90 font-medium">
                <span>— {liveQuote?.author || currentThought.author}</span>
                <span className="text-[10px] text-white/40 font-mono">Live Daily API</span>
              </div>
            </Card>
          </div>
        </div>

        {/* 📌 PINNED FAVORITES & QUICK ACCESS SHELF (MANUALS & TRAILS ONLY) */}
        {(() => {
          const pinnedManualsAndTrails = pinnedItems.filter(
            (item) => item.type === "manual" || item.type === "trail"
          );
          return (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif-display text-xl font-bold text-[#1C2A26] flex items-center gap-2">
                  <Pin className="w-5 h-5 text-[#D97706]" />
                  Pinned Course Manuals & Trails
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPinModalOpen(true)}
                  leftIcon={<Plus className="w-3.5 h-3.5 text-[#D97706]" />}
                  className="text-xs text-[#52635E] hover:text-[#1C2A26]"
                >
                  Manage Pins
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pinnedManualsAndTrails.length === 0 ? (
                  <div className="col-span-full bg-white border border-[#E7E0D3] rounded-3xl p-8 text-center space-y-3 shadow-xs">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3] text-[#D97706] mx-auto flex items-center justify-center text-xl">
                      📌
                    </div>
                    <h4 className="font-serif-display font-bold text-base text-[#1C2A26]">No Pinned Manuals or Trails Yet</h4>
                    <p className="text-xs text-[#52635E] max-w-md mx-auto leading-relaxed">
                      Click the 📌 pin button on any Course Manual or Learning Trail card to keep it here on your main sanctuary shelf!
                    </p>
                  </div>
                ) : (
                  pinnedManualsAndTrails.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-[#E7E0D3] rounded-2xl p-5 flex items-center justify-between gap-4 shadow-xs hover:border-[#1C2A26] transition-all group"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E7E0D3] text-xl flex items-center justify-center shrink-0">
                          {item.icon || (item.type === "trail" ? "🏔️" : "📘")}
                        </div>
                        <div className="min-w-0 space-y-0.5">
                          <span className="text-[9px] font-bold text-[#D97706] uppercase tracking-wider block">
                            {item.type.toUpperCase()} {item.category ? `· ${item.category}` : ""}
                          </span>
                          <h4 className="font-serif-display font-bold text-sm text-[#1C2A26] truncate">
                            {item.title}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <Link href={item.url}>
                          <Button variant="outline" size="sm" className="px-3 py-1.5 text-xs h-auto">
                            Read
                          </Button>
                        </Link>
                        <PinButton
                          itemId={item.id}
                          itemTitle={item.title}
                          itemCategory={item.category}
                          itemType={item.type}
                          itemUrl={item.url}
                          itemIcon={item.icon}
                          variant="icon"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })()}

        {/* Core Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Animated Streak Card */}
          <Card variant="subtle" hoverable={false} className="p-6 space-y-3 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A9B95]">
                Daily Habit Streak
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <motion.span
                key={streakCount}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="font-serif-display text-4xl font-bold text-[#1C2A26]"
              >
                {streakCount}
              </motion.span>
              <span className="text-sm font-semibold text-[#52635E]">Days Active</span>
            </div>

            <p className="text-[11px] text-[#52635E]">
              Personal Best: {Math.max(streakCount, user?.streak?.longestCount || 1)} Days
            </p>

            <Button
              variant="ghost"
              size="sm"
              onClick={triggerStreakCelebration}
              className="mt-2 w-full text-xs text-[#D97706] hover:bg-[#FEF3C7]/50"
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
            >
              Test Streak Celebration Burst
            </Button>
          </Card>

          {/* Chapters Completed Card */}
          <Card variant="default" hoverable={false} className="p-6 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A9B95]">
                Completed Progress
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#EBF3F0] text-[#1C2A26] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-[#2D4A43]" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-serif-display text-4xl font-bold text-[#1C2A26]">
                {activeTrails.reduce((acc, t) => acc + t.completedCount, 0)}
              </span>
              <span className="text-sm font-semibold text-[#52635E]">Chapters Done</span>
            </div>

            <p className="text-[11px] text-[#52635E]">
              Across {activeTrails.length} active learning trails
            </p>
          </Card>

          {/* Badges Earned Card */}
          <Card variant="default" hoverable={false} className="p-6 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A9B95]">
                Badges Unlocked
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
                <Trophy className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-serif-display text-4xl font-bold text-[#1C2A26]">
                {user?.badgesCount || 3}
              </span>
              <span className="text-sm font-semibold text-[#52635E]">Achievement Badges</span>
            </div>

            <Link href="/profile">
              <span className="text-[11px] font-semibold text-[#D97706] hover:underline inline-flex items-center gap-1">
                View Profile & Badges <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </Card>
        </div>

        {/* Continue Where You Left Off Card */}
        {continueTrail && (
          <div className="space-y-4">
            <h2 className="font-serif-display text-xl font-bold text-[#1C2A26] flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#D97706]" />
              Continue Where You Left Off
            </h2>

            <Card
              hoverable={false}
              className="animate-breathing-glow bg-white border-[#E7E0D3] p-6 sm:p-8 space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="space-y-2">
                  <Badge variant="category">{continueTrail.category}</Badge>
                  <h3 className="font-serif-display text-2xl font-bold text-[#1C2A26]">
                    {continueTrail.title}
                  </h3>
                  <p className="text-xs text-[#52635E] max-w-xl">
                    {continueTrail.nextChapter
                      ? `Next: Chapter ${continueTrail.nextChapter.order} — ${continueTrail.nextChapter.title}`
                      : "All chapters in this trail are completed! Outstanding work."}
                  </p>
                </div>

                <Link href={`/trails/${continueTrail.slug}`}>
                  <Button
                    variant="amber"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Resume Trail Session
                  </Button>
                </Link>
              </div>

              <div className="pt-4 border-t border-[#E7E0D3] space-y-2">
                <div className="flex justify-between text-xs text-[#52635E] font-medium">
                  <span>Overall Trail Completion</span>
                  <span>{continueTrail.progressPercent}%</span>
                </div>
                <ProgressBar value={continueTrail.progressPercent} size="md" />
              </div>
            </Card>
          </div>
        )}

        {/* "Jump Back In" Smart List */}
        <div className="space-y-4">
          <h2 className="font-serif-display text-xl font-bold text-[#1C2A26] flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-[#D97706]" />
            &quot;Jump Back In&quot; Smart List
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeTrails.map((trail) => (
              <div
                key={trail.id}
                className="p-4 rounded-xl bg-white border border-[#E7E0D3] flex items-center justify-between gap-3 shadow-xs hover:border-[#1C2A26] transition-colors"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider block">
                    {trail.category}
                  </span>
                  <h4 className="font-serif-display font-semibold text-sm text-[#1C2A26] truncate">
                    {trail.title}
                  </h4>
                  <p className="text-[11px] text-[#52635E] truncate">
                    {trail.nextChapter ? `Ch ${trail.nextChapter.order}: ${trail.nextChapter.title}` : "100% Completed"}
                  </p>
                </div>
                <Link href={`/trails/${trail.slug}`}>
                  <Button variant="ghost" size="sm" className="p-2 h-8">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* All Active Trails Section */}
        <div className="space-y-4">
          <h2 className="font-serif-display text-xl font-bold text-[#1C2A26] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#1C2A26]" />
            Your Learning Trails Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeTrails.map((trail) => (
              <Link key={trail.id} href={`/trails/${trail.slug}`}>
                <Card className="h-full flex flex-col justify-between p-6">
                  <div className="space-y-2">
                    <Badge variant="pine">{trail.category}</Badge>
                    <h3 className="font-serif-display font-semibold text-lg text-[#1C2A26] group-hover:text-[#D97706] transition-colors">
                      {trail.title}
                    </h3>
                    <p className="text-xs text-[#52635E] line-clamp-2">
                      {trail.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E7E0D3] space-y-2">
                    <ProgressBar value={trail.progressPercent} size="sm" />
                    <div className="flex justify-between text-[11px] text-[#8A9B95] font-medium">
                      <span>
                        {trail.completedCount} / {trail.chapters.length} Chapters
                      </span>
                      <span className="text-[#D97706] font-semibold">
                        {trail.progressPercent}%
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* MANAGE PINNED FAVORITES MODAL */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2A26]/40 backdrop-blur-xs">
          <div className="bg-white border border-[#E7E0D3] rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-[#E7E0D3]">
              <div className="flex items-center gap-2">
                <Pin className="w-5 h-5 text-[#D97706]" />
                <h3 className="font-serif-display font-bold text-xl text-[#1C2A26]">
                  Manage Pinned Quick Access Favorites
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPinModalOpen(false)}
                className="text-[#8A9B95] hover:text-[#1C2A26]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Manuals Section */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] block">
                Course Manuals
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PINNABLE_MANUALS.map((m) => {
                  const isPinned = pinnedItems.some((p) => p.id === m.id);
                  return (
                    <div
                      key={m.id}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                        isPinned
                          ? "bg-[#FAF7F2] border-[#D97706] font-semibold"
                          : "bg-white border-[#E7E0D3] hover:border-[#1C2A26]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-lg">{m.icon}</span>
                        <div className="min-w-0">
                          <h4 className="text-xs text-[#1C2A26] truncate">{m.title}</h4>
                          <span className="text-[10px] text-[#8A9B95]">{m.category}</span>
                        </div>
                      </div>
                      <PinButton
                        itemId={m.id}
                        itemTitle={m.title}
                        itemCategory={m.category}
                        itemType="manual"
                        itemUrl={`/manuals/${m.slug}`}
                        itemIcon={m.icon}
                        variant="icon"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Games Section */}
            <div className="space-y-3 pt-3 border-t border-[#E7E0D3]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1C2A26] block">
                Arcadia Games
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ARCADIA_GAMES.slice(0, 8).map((g) => {
                  const gId = getGameId(g);
                  const isPinned = pinnedItems.some((p) => p.id === gId);
                  return (
                    <div
                      key={gId}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                        isPinned
                          ? "bg-[#FAF7F2] border-[#D97706] font-semibold"
                          : "bg-white border-[#E7E0D3] hover:border-[#1C2A26]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-lg">{g.e}</span>
                        <div className="min-w-0">
                          <h4 className="text-xs text-[#1C2A26] truncate">{g.t}</h4>
                          <span className="text-[10px] text-[#8A9B95]">{g.genre}</span>
                        </div>
                      </div>
                      <PinButton
                        itemId={gId}
                        itemTitle={g.t}
                        itemCategory={g.genre}
                        itemType="game"
                        itemUrl={g.u}
                        itemIcon={g.e}
                        variant="icon"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cookbook Dishes Section */}
            <div className="space-y-3 pt-3 border-t border-[#E7E0D3]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] block">
                Cabin Cookbook Recipes
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COOKBOOK_DISHES.slice(0, 6).map((d) => {
                  const dId = `dish-${d.id}`;
                  const isPinned = pinnedItems.some((p) => p.id === dId);
                  return (
                    <div
                      key={d.id}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                        isPinned
                          ? "bg-[#FAF7F2] border-[#D97706] font-semibold"
                          : "bg-white border-[#E7E0D3] hover:border-[#1C2A26]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img src={d.imageUrl} alt="" className="w-8 h-8 rounded-lg object-cover shrink-0" />
                        <div className="min-w-0">
                          <h4 className="text-xs text-[#1C2A26] truncate">{d.title}</h4>
                          <span className="text-[10px] text-[#8A9B95]">{d.cuisine}</span>
                        </div>
                      </div>
                      <PinButton
                        itemId={dId}
                        itemTitle={d.title}
                        itemCategory={d.cuisine}
                        itemType="recipe"
                        itemUrl="/rest/cookbook"
                        itemIcon={d.imageUrl}
                        variant="icon"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7E0D3] flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setIsPinModalOpen(false)}>
                Done Managing Pins
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
