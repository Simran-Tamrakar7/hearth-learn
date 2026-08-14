"use client";

import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
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
  CloudRain,
  Trees,
  Waves,
  Headphones,
  Sliders,
  Play,
  Pause,
} from "lucide-react";
import Link from "next/link";

interface VibeOption {
  id: "rain" | "forest" | "ocean" | "fireplace" | "lofi";
  name: string;
  emoji: string;
  tagline: string;
  visualDesc: string;
  bgGradient: string;
  borderColor: string;
  accentColor: string;
  textColor: string;
  icon: any;
}

export default function RetroCornerPage() {
  const { toast } = useToast();
  const [triviaIndex, setTriviaIndex] = useState(0);

  // Active Vibe & Audio State
  const [activeVibeId, setActiveVibeId] = useState<"rain" | "forest" | "ocean" | "fireplace" | "lofi">("rain");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioContextRef = useRef<AudioContext | null>(null);
  const activeNodesRef = useRef<any[]>([]);

  const vibes: VibeOption[] = [
    {
      id: "rain",
      name: "Rain",
      emoji: "🌧️",
      tagline: "Gentle rainfall & distant storm",
      visualDesc: "Soothing raindrops dripping on a foggy glass cabin window in a pine forest.",
      bgGradient: "from-[#1C2A26] via-[#243530] to-[#121C19]",
      borderColor: "border-teal-700/50",
      accentColor: "text-teal-400",
      textColor: "text-teal-100",
      icon: CloudRain,
    },
    {
      id: "forest",
      name: "Forest",
      emoji: "🌲",
      tagline: "Rustling pine leaves & morning breeze",
      visualDesc: "Sunbeams filtering through tall emerald pines with soft swaying morning mist.",
      bgGradient: "from-[#183028] via-[#224439] to-[#0F211B]",
      borderColor: "border-emerald-700/50",
      accentColor: "text-emerald-400",
      textColor: "text-emerald-100",
      icon: Trees,
    },
    {
      id: "ocean",
      name: "Ocean",
      emoji: "🌊",
      tagline: "Rolling coastline waves & seaside air",
      visualDesc: "Rhythmic tide waves foaming onto warm golden sand beneath a violet sunset.",
      bgGradient: "from-[#11243B] via-[#1B3654] to-[#0A1624]",
      borderColor: "border-sky-700/50",
      accentColor: "text-sky-400",
      textColor: "text-sky-100",
      icon: Waves,
    },
    {
      id: "fireplace",
      name: "Fireplace",
      emoji: "🔥",
      tagline: "Warm crackling log fire & glowing embers",
      visualDesc: "Cozy hearth flames flickering with orange sparks and soft ambient warmth.",
      bgGradient: "from-[#3B170B] via-[#542413] to-[#240C05]",
      borderColor: "border-amber-700/50",
      accentColor: "text-amber-400",
      textColor: "text-amber-100",
      icon: Flame,
    },
    {
      id: "lofi",
      name: "LoFi",
      emoji: "🎧",
      tagline: "Retro 80s synth beats & warm vinyl crackle",
      visualDesc: "Cozy pixel art study desk overlooking a purple synthwave city skyline at night.",
      bgGradient: "from-[#2A183B] via-[#3D2354] to-[#1A0E26]",
      borderColor: "border-purple-700/50",
      accentColor: "text-purple-400",
      textColor: "text-purple-100",
      icon: Headphones,
    },
  ];

  const currentVibe = vibes.find((v) => v.id === activeVibeId) || vibes[0];

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

  // Stop active audio synthesis
  const stopAudio = () => {
    activeNodesRef.current.forEach((node) => {
      try {
        node.stop ? node.stop() : node.disconnect();
      } catch (e) {}
    });
    activeNodesRef.current = [];
    setIsPlayingAudio(false);
  };

  // Web Audio API Procedural Audio Synthesizer for Vibe
  const startAudioForVibe = (vibeId: string) => {
    stopAudio();

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      activeNodesRef.current.push(masterGain);

      if (vibeId === "rain" || vibeId === "forest") {
        // Low-pass filtered pink noise for rainfall / rustling forest breeze
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(vibeId === "rain" ? 700 : 450, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(masterGain);
        whiteNoise.start();
        activeNodesRef.current.push(whiteNoise);
      } else if (vibeId === "ocean") {
        // Oscillating wave swell
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(110, ctx.currentTime);

        const swellGain = ctx.createGain();
        swellGain.gain.setValueAtTime(0.05, ctx.currentTime);

        osc.connect(swellGain);
        swellGain.connect(masterGain);
        osc.start();
        activeNodesRef.current.push(osc);
      } else if (vibeId === "fireplace" || vibeId === "lofi") {
        // Warm low chord synth
        const freqs = vibeId === "fireplace" ? [130.81, 164.81, 196.0] : [146.83, 174.61, 220.0];
        freqs.forEach((f) => {
          const osc = ctx.createOscillator();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(f, ctx.currentTime);

          const gainNode = ctx.createGain();
          gainNode.gain.setValueAtTime(0.04, ctx.currentTime);

          osc.connect(gainNode);
          gainNode.connect(masterGain);
          osc.start();
          activeNodesRef.current.push(osc);
        });
      }

      setIsPlayingAudio(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectVibe = (vibeId: "rain" | "forest" | "ocean" | "fireplace" | "lofi") => {
    setActiveVibeId(vibeId);
    if (isPlayingAudio) {
      startAudioForVibe(vibeId);
    }
    toast({
      type: "info",
      title: `Vibe Changed: ${vibes.find((v) => v.id === vibeId)?.name} ${vibes.find((v) => v.id === vibeId)?.emoji}`,
      description: "Visual ambience and optional audio updated.",
    });
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopAudio();
    } else {
      startAudioForVibe(activeVibeId);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8 flex-1">
        {/* Sub-Navigation Pill Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E7E0D3] pb-4">
          <div className="flex items-center gap-2">
            <Link href="/rest">
              <Button variant="ghost" size="sm" leftIcon={<Coffee className="w-4 h-4 text-[#D97706]" />}>
                Sanctuary & Timer
              </Button>
            </Link>
            <Link href="/rest/retro">
              <Button variant="primary" size="sm" leftIcon={<Flame className="w-4 h-4 text-[#D97706]" />}>
                Ambient Soundscape & Retro
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
              AMBIENT SOUNDSCAPE & RETRO TECH
            </Badge>

            <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1C2A26] tracking-tight">
              Ambient Soundscape & Visual Ambience
            </h1>

            <p className="text-xs sm:text-base text-[#52635E] leading-relaxed w-full">
              Visual ambience (audio optional). Pick a vibe between Rain, Forest, Ocean, Fireplace, and LoFi to accompany your rest breaks.
            </p>
          </div>
        </div>

        {/* AMBIENT SOUNDSCAPE WIDGET (EXACT USER SPECIFICATION) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="font-serif-display text-2xl font-bold text-[#1C2A26] flex items-center gap-2">
                <span>Ambient Soundscape</span>
              </h2>
              <p className="text-xs text-[#52635E] font-medium">
                Visual ambience (audio optional). Pick a vibe.
              </p>
            </div>

            {/* Audio Toggle & Volume Controls */}
            <div className="flex items-center gap-3 bg-white border border-[#E7E0D3] p-2 rounded-2xl shadow-xs">
              <Button
                variant={isPlayingAudio ? "secondary" : "amber"}
                size="sm"
                onClick={toggleAudio}
                leftIcon={isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              >
                {isPlayingAudio ? "Mute Audio" : "Play Vibe Audio"}
              </Button>

              <div className="hidden sm:flex items-center gap-2 px-2 border-l border-[#E7E0D3]">
                <Sliders className="w-3.5 h-3.5 text-[#8A9B95]" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-20 accent-[#D97706]"
                />
              </div>
            </div>
          </div>

          {/* 5 VIBES SELECTOR CARDS (Rain, Forest, Ocean, Fireplace, LoFi) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {vibes.map((vibe) => {
              const isSelected = activeVibeId === vibe.id;
              const IconComp = vibe.icon;

              return (
                <button
                  key={vibe.id}
                  onClick={() => handleSelectVibe(vibe.id)}
                  className={`p-4 rounded-3xl text-left border transition-all flex flex-col justify-between space-y-3 group ${
                    isSelected
                      ? "bg-[#1C2A26] text-white border-[#1C2A26] shadow-lg scale-105"
                      : "bg-white border-[#E7E0D3] text-[#52635E] hover:border-[#D97706] hover:bg-[#FAF7F2]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{vibe.emoji}</span>
                    <IconComp className={`w-4 h-4 ${isSelected ? "text-[#D97706]" : "text-[#8A9B95]"}`} />
                  </div>

                  <div>
                    <h3 className={`font-serif-display font-bold text-lg ${isSelected ? "text-white" : "text-[#1C2A26]"}`}>
                      {vibe.name}
                    </h3>
                    <p className={`text-[11px] leading-tight ${isSelected ? "text-gray-300" : "text-[#8A9B95]"}`}>
                      {vibe.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#FAF7F2]/20 flex items-center justify-between text-[10px] font-bold">
                    <span className={isSelected ? "text-[#D97706]" : "text-[#8A9B95]"}>
                      {isSelected ? "Active Vibe ✓" : "Select Vibe"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ACTIVE VISUAL AMBIENCE DISPLAY BANNER */}
          <div
            className={`rounded-3xl p-8 sm:p-12 bg-gradient-to-br ${currentVibe.bgGradient} border ${currentVibe.borderColor} text-white shadow-2xl relative overflow-hidden min-h-[260px] flex flex-col justify-between transition-all duration-700`}
          >
            {/* Animated Ambient Visual Particle Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] animate-pulse" />

            <div className="relative z-10 space-y-3 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{currentVibe.emoji}</span>
                <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border ${currentVibe.borderColor} ${currentVibe.accentColor}`}>
                  Visual Ambience · {currentVibe.name} Mode
                </span>
              </div>

              <h2 className="font-serif-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
                {currentVibe.name} Soundscape
              </h2>

              <p className={`text-xs sm:text-sm leading-relaxed ${currentVibe.textColor}`}>
                {currentVibe.visualDesc}
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs">
              <span className="text-gray-300 font-mono text-[11px]">
                {isPlayingAudio ? "🔊 Audio Stream Playing (Procedural Web Audio API)" : "🔇 Audio Muted (Visual Ambience Only)"}
              </span>

              <Button
                variant={isPlayingAudio ? "secondary" : "amber"}
                size="sm"
                onClick={toggleAudio}
                leftIcon={isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              >
                {isPlayingAudio ? "Pause Audio" : `Play ${currentVibe.name} Audio`}
              </Button>
            </div>
          </div>
        </div>

        {/* 90s Web Computing Trivia Card */}
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
