"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Checkmark } from "@/components/ui/Checkmark";
import { useToast } from "@/components/ui/Toast";
import {
  Flame,
  Sparkles,
  BookOpen,
  ArrowRight,
  Compass,
  CheckCircle2,
  Bell,
  RotateCcw,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function ShowcasePage() {
  const { toast } = useToast();
  const [progressVal, setProgressVal] = useState(45);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(true);
  const [badgeUnlockKey, setBadgeUnlockKey] = useState(0);

  const toggleLoading = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 2500);
  };

  const triggerToast = (type: "success" | "achievement" | "info" | "error") => {
    if (type === "achievement") {
      toast({
        type: "achievement",
        title: "5-Day Streak Reached! 🔥",
        description: "You've maintained your daily focus loop. Keep the fire burning!",
      });
    } else if (type === "success") {
      toast({
        type: "success",
        title: "Chapter Completed",
        description: "Mental Models of Server vs Client Components is marked done.",
      });
    } else if (type === "info") {
      toast({
        type: "info",
        title: "Rest Mode Suggested",
        description: "You've completed 25 mins of deep focus. Take a 5-min breather.",
      });
    } else {
      toast({
        type: "error",
        title: "Network Reconnection",
        description: "Retrying progress sync with local storage...",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#1C2A26] p-6 md:p-12 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <header className="border-b border-[#E7E0D3] pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D97706] tracking-wider uppercase mb-2">
            <Flame className="w-4 h-4" /> Hearth Design System
          </div>
          <h1 className="font-serif-display text-3xl md:text-4xl font-bold text-[#1C2A26]">
            Cabin Component Showcase
          </h1>
          <p className="text-[#52635E] text-sm mt-1">
            Interactive, tactile, micro-animated UI components operating in isolation.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/">
            <Button variant="outline" size="sm">
              Home Landing
            </Button>
          </Link>
          <Link href="/trails">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore Trails
            </Button>
          </Link>
        </div>
      </header>

      {/* 1. Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-serif-display font-semibold text-[#1C2A26] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
          1. Buttons & Tactile Feedback
        </h2>
        <Card className="space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A9B95] mb-3">
              Variants & Hover/Press Feedback (Click to test spring press)
            </h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary">Primary Button</Button>
              <Button variant="amber" leftIcon={<Flame className="w-4 h-4" />}>
                Amber Accent
              </Button>
              <Button variant="secondary">Secondary Card</Button>
              <Button variant="outline">Outline Hairline</Button>
              <Button variant="ghost">Ghost Button</Button>
            </div>
          </div>

          <div className="border-t border-[#E7E0D3] pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A9B95] mb-3">
              Sizes & Dynamic Width-Preserving Loading State
            </h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button variant="primary" size="md">
                Medium
              </Button>
              <Button variant="primary" size="lg">
                Large
              </Button>
              <Button
                variant="amber"
                isLoading={btnLoading}
                onClick={toggleLoading}
              >
                {btnLoading ? "Saving..." : "Click to Test Loading State"}
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* 2. Cards */}
      <section className="space-y-4">
        <h2 className="text-xl font-serif-display font-semibold text-[#1C2A26] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
          2. Cards (4px Lift & Thumbnail Zoom)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            imageSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
            imageAlt="Next.js Trail"
          >
            <Badge variant="category" className="mb-3">
              Engineering
            </Badge>
            <h3 className="text-lg font-serif-display font-semibold text-[#1C2A26] group-hover:text-[#D97706] transition-colors">
              Next.js & Server Components
            </h3>
            <p className="text-xs text-[#52635E] mt-2 line-clamp-2">
              Master the mental model shift from client rendering to React Server Components.
            </p>
            <div className="mt-4 pt-4 border-t border-[#E7E0D3] flex items-center justify-between text-xs text-[#8A9B95]">
              <span>4 Chapters</span>
              <span>3 Hours</span>
            </div>
          </Card>

          <Card variant="subtle">
            <div className="flex justify-between items-start mb-3">
              <Badge variant="pine">Architecture</Badge>
              <span className="text-xs font-semibold text-[#D97706]">Active Trail</span>
            </div>
            <h3 className="text-lg font-serif-display font-semibold text-[#1C2A26]">
              System Design Fundamentals
            </h3>
            <p className="text-xs text-[#52635E] mt-2">
              Learn scalable distributed systems, read replicas, and Redis cache placement.
            </p>
            <div className="mt-6">
              <ProgressBar value={66} showLabel labelPosition="top" />
            </div>
          </Card>

          <Card variant="glass" className="bg-[#FAF7F2]/90">
            <Badge variant="amber" icon={<Sparkles className="w-3 h-3" />} className="mb-3">
              Daily Ritual
            </Badge>
            <h3 className="text-lg font-serif-display font-semibold text-[#1C2A26]">
              Study Cabin Habit Loop
            </h3>
            <p className="text-xs text-[#52635E] mt-2">
              No pressure, bite-sized chapters. 15 minutes a day builds lasting mastery.
            </p>
            <Button variant="outline" size="sm" className="mt-4 w-full">
              Resume Chapter 2
            </Button>
          </Card>
        </div>
      </section>

      {/* 3. Progress & Streaks */}
      <section className="space-y-4">
        <h2 className="text-xl font-serif-display font-semibold text-[#1C2A26] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
          3. Progress Bars (600ms Smooth Fill) & Checkmarks
        </h2>
        <Card className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-[#1C2A26]">Interactive Progress Slider Test</span>
              <span className="font-mono font-bold text-[#D97706]">{progressVal}%</span>
            </div>
            <ProgressBar value={progressVal} size="lg" showLabel={false} />
            <div className="flex items-center gap-3 pt-2">
              <input
                type="range"
                min="0"
                max="100"
                value={progressVal}
                onChange={(e) => setProgressVal(Number(e.target.value))}
                className="w-full accent-[#D97706] cursor-pointer"
              />
              <Button variant="secondary" size="sm" onClick={() => setProgressVal(100)}>
                Set 100%
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setProgressVal(0)}>
                Reset
              </Button>
            </div>
          </div>

          <div className="border-t border-[#E7E0D3] pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A9B95] mb-3">
                SVG Stroke-Dashoffset Checkmark Animations
              </h3>
              <div className="space-y-3">
                <div
                  onClick={() => setIsChecked1(!isChecked1)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-[#E7E0D3] bg-[#F5EFE6]/50 cursor-pointer hover:bg-[#F5EFE6] transition-colors"
                >
                  <Checkmark checked={isChecked1} />
                  <span className="text-sm font-medium text-[#1C2A26]">
                    Chapter 1: Mental Models of RSC (Click to complete)
                  </span>
                </div>

                <div
                  onClick={() => setIsChecked2(!isChecked2)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-[#E7E0D3] bg-[#F5EFE6]/50 cursor-pointer hover:bg-[#F5EFE6] transition-colors"
                >
                  <Checkmark checked={isChecked2} />
                  <span className="text-sm font-medium text-[#1C2A26]">
                    Chapter 2: Data Fetching Patterns (Completed)
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A9B95] mb-3">
                Vertical Trail Progress Line
              </h3>
              <div className="h-28 flex items-center gap-4 p-4 rounded-xl border border-[#E7E0D3] bg-white">
                <ProgressBar value={progressVal} vertical size="md" showLabel />
                <div className="text-xs text-[#52635E] space-y-1">
                  <p className="font-semibold text-[#1C2A26]">Trail Trailhead</p>
                  <p>Step-by-step progress fills the path as you complete chapters.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* 4. Badges & Toasts */}
      <section className="space-y-4">
        <h2 className="text-xl font-serif-display font-semibold text-[#1C2A26] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
          4. Badges & Toast Notifications
        </h2>
        <Card className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A9B95]">
                Badges & Soft Glow Unlock Animation
              </h3>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                onClick={() => setBadgeUnlockKey((k) => k + 1)}
              >
                Re-trigger Unlock Animation
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="category">Engineering</Badge>
              <Badge variant="pine">Architecture</Badge>
              <Badge variant="amber" icon={<Flame className="w-3.5 h-3.5" />}>
                5-Day Streak
              </Badge>
              <Badge
                key={badgeUnlockKey}
                variant="amber"
                animateUnlock
                icon={<Sparkles className="w-3.5 h-3.5" />}
              >
                Pathfinder Unlocked!
              </Badge>
            </div>
          </div>

          <div className="border-t border-[#E7E0D3] pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A9B95] mb-3">
              Trigger Toast Notifications (Slide-in from bottom right)
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={() => triggerToast("achievement")}>
                Streak Achievement Toast 🔥
              </Button>
              <Button variant="secondary" onClick={() => triggerToast("success")}>
                Chapter Done Toast ✅
              </Button>
              <Button variant="secondary" onClick={() => triggerToast("info")}>
                Rest Mode Toast ☕
              </Button>
              <Button variant="secondary" onClick={() => triggerToast("error")}>
                Network Alert Toast ⚠️
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
