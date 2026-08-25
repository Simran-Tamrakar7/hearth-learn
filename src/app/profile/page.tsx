"use client";

/* PAGE: /profile  — this file is the screen. Map: ./CODE-FOR-THIS-PAGE.md */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import {
  User,
  Flame,
  Trophy,
  Clock,
  Sparkles,
  Compass,
  CheckCircle2,
  PenTool,
  RotateCcw,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface BadgeData {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
}

interface ProfileData {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    streak: {
      currentCount: number;
      longestCount: number;
    };
    badges: BadgeData[];
    totalChaptersDone: number;
    totalHoursStudied: string;
  };
}

export default function ProfilePage() {
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [testBadgeKey, setTestBadgeKey] = useState(0);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      const data = await res.json();
      if (data.user) setProfile(data);
    } catch (err) {
      console.error("Profile fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerTestBadgeUnlock = () => {
    setTestBadgeKey((prev) => prev + 1);
    toast({
      type: "achievement",
      title: "New Badge Unlocked! 🏆",
      description: "'Architect of Habit' badge earned for continuous learning.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FBF8F3]">
        <Navbar />
        <div className="max-w-4xl mx-auto p-8 space-y-6">
          <div className="h-20 bg-white rounded-2xl animate-pulse" />
          <div className="h-64 bg-white rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  const user = profile?.user;

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full space-y-10 flex-1">
        {/* User Identity Banner */}
        <Card variant="glass" hoverable={false} className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1C2A26] text-[#D97706] flex items-center justify-center font-bold text-2xl shadow-sm">
              {user?.name ? user.name.charAt(0) : "R"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-display text-2xl font-bold text-[#1C2A26]">
                  {user?.name || "Rowan Vance"}
                </h1>
                <Badge variant="amber" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                  Active Cabin Member
                </Badge>
              </div>
              <p className="text-xs text-[#52635E] mt-0.5">{user?.email}</p>
              <p className="text-[11px] text-[#8A9B95] mt-1">
                Cabin member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={triggerTestBadgeUnlock}
            leftIcon={<Sparkles className="w-4 h-4 text-[#D97706]" />}
          >
            Test Badge Unlock Animation
          </Button>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card variant="subtle" hoverable={false} className="p-6 space-y-2 text-center">
            <Flame className="w-6 h-6 text-[#D97706] mx-auto" />
            <span className="font-serif-display text-3xl font-bold text-[#1C2A26]">
              {user?.streak.currentCount || 5} Days
            </span>
            <span className="text-xs text-[#52635E] block font-medium">Current Habit Streak</span>
          </Card>

          <Card variant="subtle" hoverable={false} className="p-6 space-y-2 text-center">
            <CheckCircle2 className="w-6 h-6 text-[#2D4A43] mx-auto" />
            <span className="font-serif-display text-3xl font-bold text-[#1C2A26]">
              {user?.totalChaptersDone || 4}
            </span>
            <span className="text-xs text-[#52635E] block font-medium">Chapters Completed</span>
          </Card>

          <Card variant="subtle" hoverable={false} className="p-6 space-y-2 text-center">
            <Clock className="w-6 h-6 text-[#D97706] mx-auto" />
            <span className="font-serif-display text-3xl font-bold text-[#1C2A26]">
              {user?.totalHoursStudied || "2.5"} Hours
            </span>
            <span className="text-xs text-[#52635E] block font-medium">Total Quiet Study Time</span>
          </Card>
        </div>

        {/* Badges Collection with Scale-In Glow Animation */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-serif-display text-xl font-bold text-[#1C2A26] flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#D97706]" />
              Unlocked Achievement Badges ({user?.badges.length || 3})
            </h2>

            <span className="text-xs text-[#8A9B95]">Earned via chapter progress & streaks</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Live Test Badge displaying spring scale + glow ring */}
            {testBadgeKey > 0 && (
              <motion.div
                key={`test-${testBadgeKey}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                <Card variant="default" hoverable={false} className="p-6 space-y-3 bg-[#FEF3C7]/40 border-[#FDE68A]">
                  <div className="flex justify-between items-start">
                    <Badge variant="amber" animateUnlock icon={<Sparkles className="w-3.5 h-3.5" />}>
                      Newly Unlocked!
                    </Badge>
                    <span className="text-[10px] text-[#8A9B95]">Just now</span>
                  </div>
                  <h3 className="font-serif-display font-bold text-lg text-[#1C2A26]">
                    Architect of Habit
                  </h3>
                  <p className="text-xs text-[#52635E] leading-relaxed">
                    Demonstrated mastery of the daily low-pressure learning habit loop.
                  </p>
                </Card>
              </motion.div>
            )}

            {user?.badges.map((b) => (
              <Card key={b.id} variant="default" hoverable={false} className="p-6 space-y-3 bg-white">
                <div className="flex justify-between items-start">
                  <Badge variant="pine">{b.title}</Badge>
                  <span className="text-[10px] text-[#8A9B95]">
                    {new Date(b.earnedAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-serif-display font-bold text-base text-[#1C2A26]">
                  {b.title}
                </h3>
                <p className="text-xs text-[#52635E] leading-relaxed">
                  {b.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
