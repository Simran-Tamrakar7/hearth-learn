"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { WatchDesk } from "@/components/ui/WatchDesk";
import {
  Flame,
  Compass,
  Sparkles,
  ArrowRight,
  BookOpen,
  Coffee,
  CheckCircle2,
  Zap,
  ShieldCheck,
  ChevronRight,
  Clock,
  Layers,
  Cpu,
  PenTool,
} from "lucide-react";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroTitle = "Learn technical skills in bite-sized trails. Quietly, every day.";
  const titleWords = heroTitle.split(" ");

  const featuredTrails = [
    {
      id: "nextjs-server-components",
      title: "Modern Web Architecture with Next.js",
      category: "Engineering",
      hours: "3 Hours",
      chaptersCount: 4,
      icon: Layers,
      description: "Master React Server Components, streaming SSR, and server actions.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "playwright-e2e-automation",
      title: "Playwright E2E Test Automation",
      category: "Automation",
      hours: "4 Hours",
      chaptersCount: 3,
      icon: Compass,
      description: "Resilient locators, codegen, Page Object Model & CI test pipelines.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "system-design-fundamentals",
      title: "System Design for Engineers",
      category: "Architecture",
      hours: "5 Hours",
      chaptersCount: 3,
      icon: Cpu,
      description: "Scalable distributed systems, cache placement & database indexing.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D97706]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2"
          >
            <Badge variant="amber" icon={<Flame className="w-3.5 h-3.5" />}>
              Lumina Pathwise Inspired Study Sanctuary
            </Badge>
          </motion.div>

          <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1C2A26] leading-[1.15] max-w-3xl mx-auto">
            {titleWords.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: idx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.28em]"
              >
                {word === "bite-sized" || word === "trails." ? (
                  <span className="text-[#D97706] underline decoration-[#D97706]/30 underline-offset-8">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          <p className="text-base sm:text-lg text-[#52635E] max-w-2xl mx-auto leading-relaxed">
            No scattered tutorials or high-pressure course deadlines. Hearth organizes self-learning into short structured paths paired with a calm daily habit loop so you actually return.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/trails">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Start Exploring Trails
              </Button>
            </Link>

            <Link href="/toolkits">
              <Button variant="secondary" size="lg">
                View Cheat Sheet Toolkits
              </Button>
            </Link>
          </motion.div>

          {/* Demo Habit Card Preview */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="pt-8 max-w-2xl mx-auto"
          >
            <Card
              hoverable={false}
              className="bg-white/90 backdrop-blur-md border-[#E7E0D3] shadow-lg shadow-[#1C2A26]/5 text-left p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E0D3]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#8A9B95] uppercase tracking-wider">
                      Today&apos;s Focus Session
                    </span>
                    <h4 className="font-serif-display font-semibold text-[#1C2A26]">
                      Chapter 2: Playwright Resilient Locators
                    </h4>
                  </div>
                </div>
                <Badge variant="amber" icon={<Clock className="w-3.5 h-3.5" />}>
                  15 Min Session
                </Badge>
              </div>

              <div className="pt-4 space-y-3">
                <ProgressBar value={66} showLabel labelPosition="top" />
                <div className="flex justify-between items-center text-xs text-[#52635E]">
                  <span>2 of 3 chapters completed today</span>
                  <span className="font-semibold text-[#D97706] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> 5-Day Streak Active
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Featured Trails Section */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#E7E0D3]">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider">
                Featured Paths
              </span>
              <h2 className="font-serif-display text-3xl font-bold text-[#1C2A26] mt-1">
                Explore Structured Skill Trails
              </h2>
            </div>
            <Link href="/trails">
              <Button variant="outline" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
                View All Trails
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTrails.map((trail) => {
              const Icon = trail.icon;
              return (
                <Link key={trail.id} href={`/trails/${trail.id}`}>
                  <Card imageSrc={trail.image} imageAlt={trail.title} className="h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <Badge variant="category">{trail.category}</Badge>
                        <span className="text-xs font-semibold text-[#8A9B95] flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {trail.hours}
                        </span>
                      </div>
                      <h3 className="font-serif-display text-lg font-semibold text-[#1C2A26] group-hover:text-[#D97706] transition-colors">
                        {trail.title}
                      </h3>
                      <p className="text-xs text-[#52635E] mt-2 leading-relaxed">
                        {trail.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E7E0D3] flex items-center justify-between text-xs text-[#52635E]">
                      <span className="flex items-center gap-1">
                        <Icon className="w-3.5 h-3.5" /> {trail.chaptersCount} Short Chapters
                      </span>
                      <span className="font-semibold text-[#D97706] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Start Trail <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pathwise-Inspired Watch Desk Video Carousel */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#E7E0D3] bg-[#F5EFE6]/50">
        <div className="max-w-6xl mx-auto">
          <WatchDesk />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 border-t border-[#E7E0D3] bg-[#F5EFE6]/30 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-[#8A9B95]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#1C2A26] text-[#D97706] flex items-center justify-center font-bold">
              <Flame className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif-display font-semibold text-[#1C2A26]">
              Hearth Study Cabin
            </span>
          </div>
          <p>© 2026 Hearth Learning. Inspired by Lumina Pathwise manuals & design system.</p>
        </div>
      </footer>
    </div>
  );
}
