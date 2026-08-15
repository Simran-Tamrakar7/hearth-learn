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
  RotateCcw,
  ListOrdered,
  Tag,
  Code,
  FileText,
} from "lucide-react";

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

export default function DashboardPage() {
  const { toast } = useToast();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [streakCount, setStreakCount] = useState(1);

  useEffect(() => {
    fetchDashboard();
  }, []);

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
            <Link href="/rest">
              <Button variant="secondary" size="sm" leftIcon={<Coffee className="w-4 h-4" />}>
                Take a Breather
              </Button>
            </Link>
            <Link href="/trails">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Browse All Trails
              </Button>
            </Link>
          </div>
        </div>

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

        {/* Continue Where You Left Off Card (With Idle Breathing Glow) */}
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

        {/* Feature #20: "Jump Back In" Smart List */}
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
    </div>
  );
}
