"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Play, ExternalLink, ChevronLeft, ChevronRight, Video } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  channel: string;
  why: string;
  youtubeUrl: string;
  thumbnail: string;
  category: string;
}

export function WatchDesk() {
  const videos: VideoItem[] = [
    {
      id: "GmTmPHXJR6k",
      title: "Playwright — Getting Started",
      channel: "Microsoft Playwright",
      why: "Official vibe check before you drown in docs.",
      youtubeUrl: "https://www.youtube.com/watch?v=GmTmPHXJR6k",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
      category: "Automation",
    },
    {
      id: "cHYq1eUxYv4",
      title: "pytest in 30 minutes (or less)",
      channel: "Python Community",
      why: "Fixtures & asserts — the spine of Playwright Python.",
      youtubeUrl: "https://www.youtube.com/watch?v=cHYq1eUxYv4",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
      category: "Quality Craft",
    },
    {
      id: "RGOj5yH7evk",
      title: "Git & GitHub Crash Course",
      channel: "freeCodeCamp",
      why: "Commit something tonight. Progress equals history.",
      youtubeUrl: "https://www.youtube.com/watch?v=RGOj5yH7evk",
      thumbnail: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=600&q=80",
      category: "Foundations",
    },
    {
      id: "FTFaQWZBqQ8",
      title: "Figma Auto Layout Deep Dive",
      channel: "Figma Official",
      why: "Spacing systems & auto layout constraints made clear.",
      youtubeUrl: "https://www.youtube.com/watch?v=FTFaQWZBqQ8",
      thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
      category: "Design",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D97706] uppercase tracking-wider">
            <Video className="w-4 h-4" /> Watch Desk Desk (Eyes First, Hands Second)
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C2A26] mt-1">
            Curated Short Video Essentials
          </h2>
          <p className="text-xs text-[#52635E] mt-1">
            Short, focused walkthroughs to build your mental model before jumping into manual chapters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={prevVideo} className="p-2 h-9 w-9">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-xs font-mono font-semibold text-[#52635E]">
            {currentIndex + 1} / {videos.length}
          </span>
          <Button variant="outline" size="sm" onClick={nextVideo} className="p-2 h-9 w-9">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((vid, idx) => {
          const isCurrent = idx === currentIndex;
          return (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={isCurrent ? "ring-2 ring-[#D97706] rounded-2xl" : ""}
            >
              <Card imageSrc={vid.thumbnail} imageAlt={vid.title} className="h-full flex flex-col justify-between p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Badge variant="category">{vid.category}</Badge>
                    <span className="text-[11px] font-semibold text-[#8A9B95]">{vid.channel}</span>
                  </div>

                  <h3 className="font-serif-display font-bold text-lg text-[#1C2A26] group-hover:text-[#D97706] transition-colors">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-[#52635E] leading-relaxed italic">
                    &ldquo;{vid.why}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E7E0D3] flex justify-between items-center">
                  <a
                    href={vid.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#D97706] hover:underline"
                  >
                    <Play className="w-4 h-4 fill-[#D97706]" /> Watch Video on YouTube <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
