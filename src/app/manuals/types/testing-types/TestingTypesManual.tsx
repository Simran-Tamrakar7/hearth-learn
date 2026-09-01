"use client";

export const TESTING_TYPES_SLUGS = new Set([
  "testing-by-level",
  "testing-types",
  "testing-types-by-level",
  "testing-guide-part1",
]);

export function isTestingTypesSlug(slug?: string | null) {
  return Boolean(slug && TESTING_TYPES_SLUGS.has(slug));
}

/** Pixel-faithful host for the Part 1 HTML guide (static iframe). */
export function TestingTypesGuide() {
  return (
    <div className="min-h-screen bg-[#12151b]">
      <iframe
        src="/guides/testing-types.html"
        title="Testing Types — Part 1: By Level"
        className="block w-full border-0 bg-[#12151b]"
        style={{ minHeight: "100vh", height: "100vh" }}
        onLoad={(e) => {
          const frame = e.currentTarget;
          const doc = frame.contentDocument;
          if (!doc) return;
          const apply = () => {
            frame.style.height = `${Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight, window.innerHeight)}px`;
          };
          apply();
          const ro = new ResizeObserver(apply);
          ro.observe(doc.documentElement);
        }}
      />
    </div>
  );
}

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Search, Copy, Check, ChevronRight } from "lucide-react";
import { MANUALS } from "@/app/manuals/registry";
import type { PracticalExample, ToolItem } from "@/app/manuals/types";

const pathwiseManual = MANUALS.find((m) => m.id === "testing-types")!.body;
const rawChapters = pathwiseManual.chapters as Record<string, unknown>[];

type TestingChapterView = {
  no: string;
  title: string;
  category: string;
  desc: string;
  why: string;
  when: string;
  practical?: PracticalExample;
  advantages?: string[];
  limitations?: string[];
  tools: ToolItem[];
};

export const TESTING_TYPES_CHAPTERS: TestingChapterView[] = rawChapters.map((ch) => ({
  no: String(ch.overlayNo ?? "").padStart(2, "0"),
  title: String(ch.title ?? ""),
  category: String(ch.phase ?? "").replace(/^Part \d+\s*[·•:\-–—]\s*/, ""),
  desc: String(ch.overviewText ?? ""),
  why: String(ch.why ?? ""),
  when: String(ch.when ?? ""),
  practical: ch.practical as PracticalExample | undefined,
  advantages: Array.isArray(ch.advantages) ? (ch.advantages as string[]) : undefined,
  limitations: Array.isArray(ch.limitations) ? (ch.limitations as string[]) : undefined,
  tools: (Array.isArray(ch.tools) ? ch.tools : []) as ToolItem[],
}));

export type { TestingChapterView as TestingChapterData };

export function TestingTypesInteractiveManual() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeToolTabs, setActiveToolTabs] = useState<Record<number, number>>({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  });
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (codeText: string, key: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 1800);
  };

  const toggleSteps = (chapterIndex: number, toolIndex: number) => {
    const key = `${chapterIndex}-${toolIndex}`;
    setExpandedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalTools = TESTING_TYPES_CHAPTERS.reduce(
    (acc, ch) => acc + (ch.tools?.length || 0),
    0
  );

  const filteredChapters = TESTING_TYPES_CHAPTERS.filter((ch) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const matchesTitle = ch.title.toLowerCase().includes(q);
    const matchesDesc = ch.desc.toLowerCase().includes(q);
    const matchesWhy = ch.why.toLowerCase().includes(q);
    const matchesTools = ch.tools.some(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.sub.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q)
    );
    return matchesTitle || matchesDesc || matchesWhy || matchesTools;
  });

  return (
    <div
      className="min-h-screen text-[#e7eaf0] pb-24 selection:bg-[#e8a33d]/40 selection:text-white"
      style={{
        background:
          "radial-gradient(1200px 600px at 15% -10%, rgba(232, 163, 61, 0.08), transparent 65%), radial-gradient(900px 500px at 85% 30%, rgba(111, 168, 255, 0.05), transparent 60%), #0f1217",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header Container */}
      <header className="max-w-[980px] mx-auto px-5 sm:px-8 pt-8 pb-6">
        {/* Navigation & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#262e3b]">
          <Link
            href="/manuals"
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#262e3b] bg-[#171b23] text-[#8b95a8] hover:text-white hover:border-[#e8a33d] transition-all w-fit"
          >
            <ChevronLeft className="w-4 h-4 text-[#e8a33d]" />
            <span>Back to Manuals</span>
          </Link>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-[#5c667a] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters, tools, or topics…"
              className="w-full pl-9 pr-4 py-2 bg-[#1c212a] border border-[#262e3b] rounded-xl text-xs text-[#e7eaf0] placeholder-[#5c667a] focus:outline-none focus:border-[#e8a33d] focus:ring-2 focus:ring-[#e8a33d]/20 transition-all font-sans"
            />
          </div>
        </div>

        {/* Eyebrow & Hero Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs tracking-wider uppercase text-[#e8a33d]">
            <span className="w-2 h-2 rounded-full bg-[#4fd68a] shadow-[0_0_0_4px_rgba(79,214,138,0.18)]" />
            <span>Software Testing Reference · 15 Chapters</span>
          </div>

          <h1 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Testing Types
          </h1>

          <p className="text-sm sm:text-base text-[#8b95a8] max-w-3xl leading-relaxed">
            Levels, techniques, and strategy — why each type matters, free tools, step-by-step usage, advantages and limitations, and real HRMS scenarios.
          </p>
        </div>

        {/* Top Statistics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 mt-6 border border-[#262e3b] rounded-xl bg-[#171b23] overflow-hidden font-mono text-xs shadow-md">
          <div className="p-3.5 sm:p-4 border-r border-b sm:border-b-0 border-[#262e3b]">
            <span className="block text-lg font-bold text-white mb-0.5">
              {String(TESTING_TYPES_CHAPTERS.length).padStart(2, "0")}
            </span>
            <span className="text-[11px] text-[#5c667a] uppercase tracking-wider">
              Types
            </span>
          </div>

          <div className="p-3.5 sm:p-4 border-b sm:border-b-0 sm:border-r border-[#262e3b]">
            <span className="block text-lg font-bold text-white mb-0.5">
              {String(totalTools).padStart(2, "0")}
            </span>
            <span className="text-[11px] text-[#5c667a] uppercase tracking-wider">
              Tools Covered
            </span>
          </div>

          <div className="p-3.5 sm:p-4 border-r border-[#262e3b]">
            <span className="block text-lg font-bold text-white mb-0.5">
              Mixed
            </span>
            <span className="text-[11px] text-[#5c667a] uppercase tracking-wider">
              Category
            </span>
          </div>

          <div className="p-3.5 sm:p-4">
            <span className="block text-lg font-bold text-[#4fd68a] mb-0.5">
              Free
            </span>
            <span className="text-[11px] text-[#5c667a] uppercase tracking-wider">
              Tool Tier
            </span>
          </div>
        </div>

        {/* Quick Table of Contents Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-2 scrollbar-none">
          {TESTING_TYPES_CHAPTERS.map((ch) => (
            <a
              key={ch.no}
              href={`#chapter-${ch.no}`}
              className="whitespace-nowrap font-mono text-xs px-3 py-1.5 rounded-full bg-[#171b23] border border-[#262e3b] text-[#8b95a8] hover:text-white hover:border-[#e8a33d] hover:bg-[#e8a33d]/10 transition-all shrink-0"
            >
              {ch.no}. {ch.title}
            </a>
          ))}
        </div>
      </header>

      {/* Main Chapters Content */}
      <main className="max-w-[980px] mx-auto px-5 sm:px-8 space-y-12">
        {filteredChapters.map((ch, ci) => {
          const activeToolIndex = activeToolTabs[ci] || 0;
          const currentTool = ch.tools[activeToolIndex] || ch.tools[0];
          const stepsKey = `${ci}-${activeToolIndex}`;
          const isStepsOpen = Boolean(expandedSteps[stepsKey]);

          return (
            <section
              key={ch.no}
              id={`chapter-${ch.no}`}
              className="border border-[#262e3b] rounded-2xl bg-gradient-to-b from-[#171b23] via-[#171b23] to-[#13161c] shadow-2xl overflow-hidden scroll-mt-6"
            >
              {/* Chapter Header */}
              <div className="p-6 sm:p-8 border-b border-[#262e3b] space-y-2.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-xs font-bold text-[#12151b] bg-[#e8a33d] px-2.5 py-0.5 rounded-md">
                    CH {ch.no}
                  </span>
                  <span className="font-mono text-[11px] tracking-wider uppercase text-[#8b95a8] border border-[#262e3b] px-2.5 py-0.5 rounded-md bg-black/20">
                    {ch.category}
                  </span>
                </div>

                <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {ch.title}
                </h2>

                <p className="text-sm sm:text-[15px] text-[#8b95a8] leading-relaxed max-w-3xl">
                  {ch.desc}
                </p>
              </div>

              {/* Info Strip: Why it matters / When to use it */}
              <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#262e3b] divide-y md:divide-y-0 md:divide-x divide-[#262e3b] bg-black/10">
                <div className="p-6 sm:p-8 space-y-2">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#e8a33d] flex items-center gap-2 font-bold">
                    <span className="w-1.5 h-1.5 rounded-sm bg-[#e8a33d]" />
                    Why it matters
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8b95a8] leading-relaxed">
                    {ch.why}
                  </p>
                </div>

                <div className="p-6 sm:p-8 space-y-2">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#e8a33d] flex items-center gap-2 font-bold">
                    <span className="w-1.5 h-1.5 rounded-sm bg-[#e8a33d]" />
                    When to use it in a project
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8b95a8] leading-relaxed">
                    {ch.when}
                  </p>
                </div>
              </div>

              {/* Practical Example Block */}
              {ch.practical ? (
              <div className="p-6 sm:p-8 border-b border-[#262e3b] bg-[#6fa8ff]/[0.03] space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#6fa8ff] flex items-center gap-2 font-bold">
                  <span className="w-1.5 h-1.5 rounded-sm bg-[#6fa8ff]" />
                  Practical Example
                </h3>

                <p className="text-xs sm:text-sm text-[#8b95a8] leading-relaxed">
                  <strong className="text-white font-semibold">{ch.practical.app}</strong> — {ch.practical.scenario}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {ch.practical.fail ? (
                  <div className="p-3.5 rounded-xl border border-[#262e3b] border-t-2 border-t-[#f0616d] bg-black/30 space-y-1">
                    <span className="block font-mono text-[10px] uppercase tracking-wider font-bold text-[#f0616d]">
                      {ch.practical.failLabel || "Fail Condition"}
                    </span>
                    <p className="text-xs sm:text-[13px] text-[#e7eaf0] leading-relaxed">
                      {ch.practical.fail}
                    </p>
                  </div>
                  ) : null}

                  {ch.practical.pass ? (
                  <div className="p-3.5 rounded-xl border border-[#262e3b] border-t-2 border-t-[#4fd68a] bg-black/30 space-y-1">
                    <span className="block font-mono text-[10px] uppercase tracking-wider font-bold text-[#4fd68a]">
                      {ch.practical.passLabel || "Pass Condition"}
                    </span>
                    <p className="text-xs sm:text-[13px] text-[#e7eaf0] leading-relaxed">
                      {ch.practical.pass}
                    </p>
                  </div>
                  ) : null}

                  {ch.practical.value ? (
                  <div className="p-3.5 rounded-xl border border-[#262e3b] border-t-2 border-t-[#6fa8ff] bg-black/30 space-y-1 sm:col-span-2">
                    <span className="block font-mono text-[10px] uppercase tracking-wider font-bold text-[#6fa8ff]">
                      Value delivered
                    </span>
                    <p className="text-xs sm:text-[13px] text-[#e7eaf0] leading-relaxed">
                      {ch.practical.value}
                    </p>
                  </div>
                  ) : null}
                </div>
              </div>
              ) : null}

              {/* General Level Advantages & Limitations */}
              {ch.advantages && ch.limitations && (
                <div className="p-6 sm:p-8 border-b border-[#262e3b] bg-black/10 space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#e8a33d] flex items-center gap-2 font-bold">
                    <span className="w-1.5 h-1.5 rounded-sm bg-[#e8a33d]" />
                    {ch.title} — Advantages &amp; Limitations
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-[#272e39] border-t-2 border-t-[#4fd68a] bg-black/25 p-4 space-y-2">
                      <span className="block font-mono text-xs uppercase tracking-wider font-bold text-[#4fd68a]">
                        ● Key Advantages
                      </span>
                      <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#e7eaf0] pl-4 list-disc marker:text-[#4fd68a]/60">
                        {ch.advantages.map((adv, ai) => (
                          <li key={ai}>{adv}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-[#272e39] border-t-2 border-t-[#f0616d] bg-black/25 p-4 space-y-2">
                      <span className="block font-mono text-xs uppercase tracking-wider font-bold text-[#f0616d]">
                        ● Key Limitations
                      </span>
                      <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#e7eaf0] pl-4 list-disc marker:text-[#f0616d]/60">
                        {ch.limitations.map((lim, li) => (
                          <li key={li}>{lim}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Tool Switcher Section */}
              {ch.tools && ch.tools.length > 0 && (
                <div>
                  {/* Tool Tabs Bar matching screenshot */}
                  <div className="flex flex-wrap items-end gap-2 px-6 pt-4 pb-0 bg-[#12151b] border-b border-[#272e39]">
                    {ch.tools.map((tool, ti) => {
                      const isActive = ti === activeToolIndex;
                      return (
                        <button
                          key={tool.name + ti}
                          type="button"
                          onClick={() =>
                            setActiveToolTabs((prev) => ({
                              ...prev,
                              [ci]: ti,
                            }))
                          }
                          className={`font-mono text-xs sm:text-[13px] px-4 py-2 transition-all duration-150 relative cursor-pointer select-none flex items-center gap-2 ${
                            isActive
                              ? "bg-[#1c2129] text-white border-t border-x border-[#272e39] border-b border-b-[#1c2129] rounded-t-lg font-semibold z-10 -mb-[1px]"
                              : "bg-transparent text-[#8a93a6] border border-[#272e39] rounded-lg mb-1.5 hover:text-white hover:border-[#3b4554] hover:bg-white/[0.02]"
                          }`}
                        >
                          <span
                            className={`font-semibold text-[11px] font-mono ${
                              isActive ? "text-[#e8a33d]" : "text-[#5c6577]"
                            }`}
                          >
                            {String(ti + 1).padStart(2, "0")}
                          </span>
                          <span className={isActive ? "text-white font-semibold" : "text-[#8a93a6]"}>
                            {tool.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Tool Body */}
                  <div className="p-6 sm:p-8 bg-[#1c2129] space-y-6">
                    {/* Tool Title & Docs Link */}
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h4 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-white flex items-baseline gap-2">
                        <span>{currentTool.name}</span>
                        {currentTool.sub && (
                          <span className="text-sm font-normal text-[#5c667a]">
                            — {currentTool.sub}
                          </span>
                        )}
                      </h4>

                      {currentTool.url && (
                        <a
                          href={currentTool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-[#6fa8ff] border-b border-dashed border-[#6fa8ff]/50 hover:border-solid hover:text-white transition-all inline-flex items-center gap-1"
                        >
                          <span>{currentTool.url.replace(/^https?:\/\//, "")}</span>
                          <span className="text-[10px]">↗</span>
                        </a>
                      )}
                    </div>

                    {/* Tool Description */}
                    <p className="text-xs sm:text-sm text-[#8b95a8] leading-relaxed max-w-3xl">
                      {currentTool.desc}
                    </p>

                    {/* Advantages & Limitations Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                      <div className="rounded-xl border border-[#272e39] border-t-2 border-t-[#4fd68a] bg-black/25 p-5 shadow-xs">
                        <div className="flex items-center gap-2 mb-3 text-[#4fd68a] font-mono text-xs uppercase tracking-wider font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4fd68a] inline-block" />
                          <span>Advantages</span>
                        </div>
                        <ul className="space-y-2 text-xs sm:text-[13.5px] text-[#e7eaf0] leading-relaxed pl-4 list-disc marker:text-[#5c667a]">
                          {currentTool.adv.map((a, i) => (
                            <li key={i} className="pl-0.5">{a}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-xl border border-[#272e39] border-t-2 border-t-[#f0616d] bg-black/25 p-5 shadow-xs">
                        <div className="flex items-center gap-2 mb-3 text-[#f0616d] font-mono text-xs uppercase tracking-wider font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f0616d] inline-block" />
                          <span>Limitations</span>
                        </div>
                        <ul className="space-y-2 text-xs sm:text-[13.5px] text-[#e7eaf0] leading-relaxed pl-4 list-disc marker:text-[#5c667a]">
                          {currentTool.lim.map((l, i) => (
                            <li key={i} className="pl-0.5">{l}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Step-by-Step Implementation Accordion */}
                    {currentTool.steps && currentTool.steps.length > 0 && (
                      <div className="rounded-xl border border-[#272e39] bg-black/20 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => toggleSteps(ci, activeToolIndex)}
                          className="w-full px-5 py-3.5 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-[#e7eaf0] hover:bg-white/[0.03] transition-colors cursor-pointer select-none"
                        >
                          <span className="font-semibold tracking-widest">
                            How to use — step by step ({currentTool.steps.length} steps)
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 text-[#e8a33d] transition-transform duration-200 ${
                              isStepsOpen ? "rotate-90" : ""
                            }`}
                          />
                        </button>

                        {isStepsOpen && (
                          <div className="px-5 pb-5 pt-2 border-t border-[#272e39] space-y-4">
                            {currentTool.steps.map((step, sIdx) => {
                              const copyKey = `${ci}-${activeToolIndex}-${sIdx}`;
                              return (
                                <div
                                  key={sIdx}
                                  className="pt-3.5 pb-2 border-b border-[#272e39]/60 last:border-b-0 space-y-2"
                                >
                                  <div className="flex items-baseline gap-2 text-sm font-semibold text-white">
                                    <span className="font-mono text-xs text-[#e8a33d] font-bold">
                                      {String(sIdx + 1).padStart(2, "0")}
                                    </span>
                                    <span>{step.t}</span>
                                  </div>

                                  {step.p && (
                                    <p className="text-xs sm:text-[13px] text-[#8b95a8] leading-relaxed">
                                      {step.p}
                                    </p>
                                  )}

                                  {step.c && (
                                    <div className="relative group/code mt-2">
                                      <button
                                        type="button"
                                        onClick={() => handleCopy(step.c!, copyKey)}
                                        className="absolute right-2.5 top-2.5 px-2 py-1 rounded bg-[#171b23] border border-[#272e39] text-[#8b95a8] hover:text-white hover:border-[#e8a33d] font-mono text-[10px] flex items-center gap-1 opacity-80 group-hover/code:opacity-100 transition-all cursor-pointer"
                                        title="Copy code"
                                      >
                                        {copiedKey === copyKey ? (
                                          <>
                                            <Check className="w-3 h-3 text-[#4fd68a]" />
                                            <span className="text-[#4fd68a]">Copied</span>
                                          </>
                                        ) : (
                                          <>
                                            <Copy className="w-3 h-3" />
                                            <span>Copy</span>
                                          </>
                                        )}
                                      </button>
                                      <pre className="p-3.5 sm:p-4 rounded-lg bg-[#12151b] border border-[#272e39] overflow-x-auto text-xs font-mono text-[#caecd7] leading-relaxed">
                                        <code>{step.c}</code>
                                      </pre>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="max-w-[980px] mx-auto px-5 sm:px-8 mt-16 pt-8 border-t border-[#262e3b] text-center font-mono text-xs text-[#5c667a] space-y-2">
        <p>Part 1: Testing by Level — Complete software testing reference with 4 chapters &amp; 10 tools.</p>
        <p className="text-[11px] text-[#5c667a]/80">Modular Architecture Ready — Part 2 &amp; future chapters can be appended seamlessly.</p>
      </footer>
    </div>
  );
}

/** Switch between static HTML guide and live registry-driven interactive manual. */
export function TestingTypesManual({ mode = "interactive" }: { mode?: "guide" | "interactive" }) {
  return mode === "guide" ? <TestingTypesGuide /> : <TestingTypesInteractiveManual />;
}
