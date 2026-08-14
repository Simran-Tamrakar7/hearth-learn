"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles,
  Terminal as TerminalIcon,
  Volume2,
  VolumeX,
  ArrowLeft,
  RotateCcw,
  Coffee,
  Radio,
  Flame,
  Gamepad2,
  Utensils,
} from "lucide-react";
import Link from "next/link";

export default function RetroCornerPage() {
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSynth, setAudioSynth] = useState<any>(null);

  const retroTrivia = [
    {
      year: "1994",
      title: "The First Web Banner Ad",
      fact: "AT&T purchased the first online banner ad on HotWired.com in October 1994. It achieved an astounding 44% click-through rate!",
    },
    {
      year: "1995",
      title: "JavaScript Written in 10 Days",
      fact: "Brendan Eich created the first version of JavaScript in just 10 days in May 1995 while working at Netscape under the name Mocha.",
    },
    {
      year: "1999",
      title: "The Original Emoji Set",
      fact: "Shigetaka Kurita designed the world's first set of 176 emojis for NTT DOCOMO's mobile internet service in 12x12 pixel grids.",
    },
    {
      year: "2001",
      title: "The Birth of Wikipedia",
      fact: "Jimmy Wales and Larry Sanger launched Wikipedia on January 15, 2001. The first article ever created was titled 'HomePage'.",
    },
  ];

  // Ambient Cabin Synth Rain Sound Generator via Web Audio API
  const toggleAmbientAudio = () => {
    if (isPlayingAudio) {
      if (audioSynth) {
        audioSynth.stop();
        setAudioSynth(null);
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const bufferSize = audioCtx.sampleRate * 2;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = audioCtx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800, audioCtx.currentTime);

        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        whiteNoise.start();
        setAudioSynth(whiteNoise);
        setIsPlayingAudio(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8 flex-1">
        {/* Sub-Navigation Pill Bar (Consistent Across All Rest Pages) */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E7E0D3] pb-4">
          <div className="flex items-center gap-2">
            <Link href="/rest">
              <Button variant="ghost" size="sm" leftIcon={<Coffee className="w-4 h-4 text-[#D97706]" />}>
                Sanctuary & Timer
              </Button>
            </Link>
            <Link href="/rest/retro">
              <Button variant="primary" size="sm" leftIcon={<Flame className="w-4 h-4 text-[#D97706]" />}>
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

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EFE6] border border-[#E7E0D3] rounded-3xl p-6 sm:p-10 space-y-4 shadow-sm relative overflow-hidden">
          <div className="space-y-2 w-full">
            <Badge variant="amber" icon={<Radio className="w-3.5 h-3.5" />}>
              NOSTALGIC BREAK CORNER
            </Badge>

            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1C2A26] tracking-tight">
              Retro Tech Shelf & Cabin Audio
            </h1>

            <p className="text-xs sm:text-base text-[#52635E] leading-relaxed">
              A whimsical break corner with 90s web trivia, ambient cabin rain synth, and retro computing history.
            </p>
          </div>
        </div>

        {/* 1. Ambient Cabin Rain Audio Synthesizer */}
        <Card variant="glass" hoverable={false} className="p-6 sm:p-8 space-y-4 border-[#E7E0D3] bg-white">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider block">
                CABIN SOUNDSCAPE
              </span>
              <h3 className="font-serif-display font-bold text-xl text-[#1C2A26]">
                Procedural Cabin Rain Synthesizer
              </h3>
              <p className="text-xs text-[#52635E]">
                Synthetic low-pass pink noise generated directly via Web Audio API. No external stream downloads.
              </p>
            </div>

            <Button
              variant={isPlayingAudio ? "secondary" : "amber"}
              size="md"
              onClick={toggleAmbientAudio}
              leftIcon={isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            >
              {isPlayingAudio ? "Mute Rain Audio" : "Play Rain Synth"}
            </Button>
          </div>
        </Card>

        {/* 2. 90s Web Computing Trivia Card */}
        <Card variant="default" hoverable={false} className="p-6 sm:p-8 space-y-6 border-[#E7E0D3] bg-white rounded-3xl">
          <div className="flex justify-between items-center pb-4 border-b border-[#E7E0D3]">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-5 h-5 text-[#D97706]" />
              <h3 className="font-serif-display font-bold text-lg text-[#1C2A26]">
                Retro Computing Trivia ({retroTrivia[triviaIndex].year})
              </h3>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setTriviaIndex((prev) => (prev + 1) % retroTrivia.length)}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Next Fact
            </Button>
          </div>

          <div className="space-y-2 p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3]">
            <h4 className="font-serif-display font-bold text-xl text-[#1C2A26]">
              {retroTrivia[triviaIndex].title}
            </h4>
            <p className="text-xs sm:text-sm text-[#52635E] leading-relaxed font-sans-body">
              {retroTrivia[triviaIndex].fact}
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}
