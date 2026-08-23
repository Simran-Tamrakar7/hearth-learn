"use client";

import React, { useState } from "react";
import { ExternalLink, ChevronRight, Copy, Check, Terminal } from "lucide-react";
import { ToolItem } from "@/lib/manualsData";

interface ToolSwitcherProps {
  tools: ToolItem[];
  className?: string;
}

export function ToolSwitcher({ tools, className = "" }: ToolSwitcherProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [isStepsOpen, setIsStepsOpen] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!tools || tools.length === 0) return null;

  const currentTool = tools[activeTab] || tools[0];

  const handleCopy = (codeText: string, index: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 1800);
  };

  return (
    <div
      className={`my-4 rounded-2xl overflow-hidden border border-[#E7E0D3] bg-white shadow-2xs ${className}`}
    >
      {/* Top Tab Bar matching screenshot layout in Hearth theme */}
      <div className="flex flex-wrap items-end gap-2 px-4 sm:px-6 pt-3 pb-0 bg-[#FAF7F2] border-b border-[#E7E0D3]">
        {tools.map((tool, idx) => {
          const isActive = idx === activeTab;
          return (
            <button
              key={tool.name + idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`font-mono text-xs sm:text-[13px] px-4 py-2 transition-all duration-150 relative cursor-pointer select-none flex items-center gap-2 ${
                isActive
                  ? "bg-white text-[#1C2A26] border-t border-x border-[#E7E0D3] border-b-2 border-b-white rounded-t-xl font-bold shadow-2xs z-10 -mb-[1px]"
                  : "bg-transparent text-[#52635E] border border-[#E7E0D3] rounded-xl mb-1.5 hover:bg-white hover:text-[#1C2A26] hover:border-[#D4CBBB]"
              }`}
            >
              <span
                className={`font-semibold text-[11px] font-mono ${
                  isActive ? "text-[#D97706]" : "text-[#8B9894]"
                }`}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className={isActive ? "text-[#1C2A26] font-bold" : "text-[#52635E]"}>
                {tool.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tool Content Body */}
      <div className="p-5 sm:p-7 bg-white space-y-5 animate-in fade-in duration-200">
        {/* Tool Header: Title & URL */}
        <div className="flex flex-wrap items-baseline justify-between gap-3 pb-1 border-b border-[#E7E0D3]/60">
          <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-[#1C2A26] flex items-baseline gap-2">
            <span>{currentTool.name}</span>
            {currentTool.sub && (
              <span className="text-xs sm:text-sm font-sans font-medium text-[#52635E]">
                — {currentTool.sub}
              </span>
            )}
          </h4>

          {currentTool.url && (
            <a
              href={currentTool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-[#D97706] hover:text-amber-800 border-b border-dashed border-[#D97706]/50 hover:border-solid transition-colors"
            >
              <span>{currentTool.url.replace(/^https?:\/\//, "")}</span>
              <span className="text-[10px]">↗</span>
            </a>
          )}
        </div>

        {/* Tool Description */}
        <p className="text-xs sm:text-[14px] leading-relaxed text-[#52635E] max-w-4xl font-sans">
          {currentTool.desc}
        </p>

        {/* Advantages & Limitations 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Advantages Box */}
          <div className="rounded-xl border border-emerald-200 border-t-2 border-t-emerald-500 bg-emerald-50/30 p-4 sm:p-5 shadow-2xs flex flex-col space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs uppercase tracking-wider font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
              <span>Advantages</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed pl-4 list-disc marker:text-emerald-600 font-sans">
              {currentTool.adv.map((item, i) => (
                <li key={i} className="pl-0.5">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations Box */}
          <div className="rounded-xl border border-rose-200 border-t-2 border-t-rose-500 bg-rose-50/30 p-4 sm:p-5 shadow-2xs flex flex-col space-y-2">
            <div className="flex items-center gap-2 text-rose-800 font-mono text-xs uppercase tracking-wider font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 inline-block" />
              <span>Limitations</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed pl-4 list-disc marker:text-rose-600 font-sans">
              {currentTool.lim.map((item, i) => (
                <li key={i} className="pl-0.5">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* How to use — step by step accordion */}
        {currentTool.steps && currentTool.steps.length > 0 && (
          <div className="rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] overflow-hidden">
            <button
              type="button"
              onClick={() => setIsStepsOpen(!isStepsOpen)}
              className="w-full px-5 py-3.5 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-[#1C2A26] hover:bg-[#F5EFE6] transition-colors cursor-pointer select-none font-bold"
            >
              <span className="tracking-wider flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#D97706]" />
                <span>How to use — step by step ({currentTool.steps.length} steps)</span>
              </span>
              <ChevronRight
                className={`w-4 h-4 text-[#D97706] transition-transform duration-200 ${
                  isStepsOpen ? "rotate-90" : ""
                }`}
              />
            </button>

            {isStepsOpen && (
              <div className="px-5 pb-5 pt-2 border-t border-[#E7E0D3] bg-white space-y-4">
                {currentTool.steps.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="pt-3.5 pb-2 border-b border-[#E7E0D3]/60 last:border-b-0 space-y-2"
                  >
                    <div className="flex items-baseline gap-2 text-sm font-bold text-[#1C2A26]">
                      <span className="font-mono text-xs text-[#D97706] font-bold">
                        {String(sIdx + 1).padStart(2, "0")}
                      </span>
                      <span>{step.t}</span>
                    </div>

                    {step.p && (
                      <p className="text-xs sm:text-[13px] text-[#52635E] leading-relaxed font-sans">
                        {step.p}
                      </p>
                    )}

                    {step.c && (
                      <div className="relative group/code mt-2">
                        <button
                          type="button"
                          onClick={() => handleCopy(step.c!, sIdx)}
                          className="absolute right-2.5 top-2.5 px-2.5 py-1 rounded bg-[#2D3F3A] hover:bg-[#3D524C] border border-[#3D524C] text-[#E7E0D3] font-mono text-[11px] flex items-center gap-1 opacity-90 group-hover/code:opacity-100 transition-all cursor-pointer shadow-xs"
                          title="Copy snippet"
                        >
                          {copiedIndex === sIdx ? (
                            <>
                              <Check className="w-3 h-3 text-[#A7F3D0]" />
                              <span className="text-[#A7F3D0]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                        <pre className="p-3.5 sm:p-4 rounded-xl bg-[#1C2A26] text-[#A7F3D0] border border-[#2D3F3A] overflow-x-auto text-xs font-mono leading-relaxed shadow-inner">
                          <code>{step.c}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
