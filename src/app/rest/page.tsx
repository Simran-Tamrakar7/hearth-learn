"use client";

/* PAGE: /rest  — timer. Games/cookbook/retro are sibling folders. Map: ./CODE-FOR-THIS-PAGE.md */

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import {
  Coffee,
  Play,
  RotateCcw,
  Sparkles,
  Flame,
  Gamepad2,
  Utensils,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function RestSanctuaryPage() {
  const { toast } = useToast();

  const [timerMinutes, setTimerMinutes] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(5 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      toast({
        type: "achievement",
        title: "Break Sanctuary Completed! ☕",
        description: "Your mind is refreshed. Ready to return to study trails!",
      });
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const selectMode = (mins: number) => {
    setTimerMinutes(mins);
    setSecondsLeft(mins * 60);
    setIsActive(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent = Math.round(((timerMinutes * 60 - secondsLeft) / (timerMinutes * 60)) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8 flex-1">
        {/* Sub-Navigation Pill Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E7E0D3] pb-4">
          <div className="flex items-center gap-2">
            <Link href="/rest">
              <Button variant="primary" size="sm" leftIcon={<Coffee className="w-4 h-4 text-[#D97706]" />}>
                Sanctuary & Timer
              </Button>
            </Link>
            <Link href="/rest/retro">
              <Button variant="ghost" size="sm" leftIcon={<Flame className="w-4 h-4 text-[#D97706]" />}>
                Rain Synth & Retro Trivia
              </Button>
            </Link>
            <Link href="/rest/games">
              <Button variant="ghost" size="sm" leftIcon={<Gamepad2 className="w-4 h-4 text-[#D97706]" />}>
                Cabin Games Shelf
              </Button>
            </Link>
            <Link href="/rest/cookbook">
              <Button variant="ghost" size="sm" leftIcon={<Utensils className="w-4 h-4 text-[#D97706]" />}>
                Cabin Cookbook
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EFE6] border border-[#E7E0D3] rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-sm relative overflow-hidden">
          <div className="w-full space-y-3">
            <Badge variant="amber" icon={<Coffee className="w-3.5 h-3.5" />}>
              Intentional Break Sanctuary
            </Badge>

            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1C2A26] tracking-tight">
              Rest is part of the system
            </h1>

            <p className="text-xs sm:text-base text-[#52635E] leading-relaxed">
              Step away from intense study sessions. Take a 5-15 minute break with guided breathing, ambient rain synths, casual games, and focus nutrition.
            </p>
          </div>
        </div>

        {/* Interactive Timer Container */}
        <div className="max-w-md mx-auto space-y-6">
          <Card variant="glass" hoverable={false} className="p-8 text-center space-y-6 border-[#E7E0D3]">
            {/* Mode Selectors */}
            <div className="flex justify-center gap-2">
              {[5, 10, 15].map((m) => (
                <button
                  key={m}
                  onClick={() => selectMode(m)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    timerMinutes === m
                      ? "bg-[#1C2A26] text-[#FAF7F2] shadow-xs"
                      : "bg-white border border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26]"
                  }`}
                >
                  {m} Min Break
                </button>
              ))}
            </div>

            {/* Circular SVG Timer */}
            <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="#E7E0D3" strokeWidth="6" fill="transparent" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="#D97706"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * progressPercent) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center space-y-1">
                <span className="font-serif-display text-4xl sm:text-5xl font-bold text-[#1C2A26] font-mono">
                  {formatTime(secondsLeft)}
                </span>
                <span className="text-[11px] font-semibold text-[#8A9B95] uppercase tracking-wider">
                  {isActive ? "Sanctuary Active" : "Paused"}
                </span>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex justify-center gap-3">
              <Button
                variant={isActive ? "secondary" : "amber"}
                size="md"
                onClick={() => setIsActive(!isActive)}
                leftIcon={isActive ? <Coffee className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              >
                {isActive ? "Pause Break" : "Start Break Timer"}
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setSecondsLeft(timerMinutes * 60);
                  setIsActive(false);
                }}
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                Reset
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
