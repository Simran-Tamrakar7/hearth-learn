"use client";

import Link from "next/link";
import { Compass, ArrowRight, Sparkles, Layers, Terminal, CheckCircle2 } from "lucide-react";

export function TestingTypesCatalogCard() {
  return (
    <section className="w-full">
      <Link
        href="/manuals/testing-types"
        className="group block overflow-hidden rounded-3xl border border-[#E7E0D3] bg-gradient-to-br from-white via-[#FAF7F2] to-[#FEF3C7]/30 p-6 sm:p-8 transition-all hover:border-[#D97706] hover:shadow-md relative"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#D97706]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
              <span>Interactive Master Manual · Parts 1–23</span>
            </div>

            <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C2A26] tracking-tight group-hover:text-[#D97706] transition-colors">
              Software Testing Types & Levels
            </h2>

            <p className="text-xs sm:text-sm text-[#52635E] leading-relaxed">
              From unit isolation through voice/conversational UI — 92 types with free tools, how-to steps, and Bizlevate HRMS practicals. Gap-fill: incremental integration, spike, session-based, and voice/conversational testing.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E7E0D3] text-xs font-mono font-semibold text-[#1C2A26] shadow-2xs">
                <span className="text-[#D97706] font-bold">92</span> Chapters
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E7E0D3] text-xs font-mono font-semibold text-[#1C2A26] shadow-2xs">
                <span className="text-[#D97706] font-bold">23</span> Parts
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white border border-[#E7E0D3] text-xs font-mono font-semibold text-[#1C2A26] shadow-2xs">
                <span className="text-[#D97706] font-bold">100%</span> Free Tools
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono font-semibold text-emerald-800 shadow-2xs">
                Interactive Code Switcher
              </div>
            </div>
          </div>

          <div className="shrink-0 flex items-center">
            <span className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#1C2A26] text-[#FAF7F2] font-semibold text-xs sm:text-sm group-hover:bg-[#D97706] group-hover:text-white transition-all shadow-xs">
              <span>Open Master Manual</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
