"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Code, Layers } from "lucide-react";
import type { ManualChapter } from "@/app/manuals/types";
import type { ChapterHighlight } from "@/app/manuals/features/highlights";
import { MarkedText } from "@/app/manuals/features/highlights";
import { ToolSwitcher, testingTypesMdSections } from "@/app/manuals/features/reader";

/** One full-content layout for every manual slug — cards when fields exist, markdown body always. */
export function ChapterFullContent({
  chapter,
  highlights,
  renderMarkdown,
  isTestingTypesManual,
  onNavigateChapter,
}: {
  chapter: ManualChapter;
  highlights: ChapterHighlight[];
  renderMarkdown: (text: string) => ReactNode;
  isTestingTypesManual: boolean;
  onNavigateChapter: (idx: number) => void;
}) {
  const mdBody = isTestingTypesManual
    ? testingTypesMdSections(chapter, chapter.overviewText)
    : (chapter.contentMarkdown || "").trim();

  const showWhy = Boolean(chapter.why?.trim());
  const showWhen = Boolean(chapter.when?.trim());
  const showAdv = Boolean(chapter.advantages?.length);
  const showLim = Boolean(chapter.limitations?.length);

  return (
    <motion.div initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {chapter.overviewText?.trim() ? (
        <p className="text-xs sm:text-sm text-[#52635E] leading-relaxed font-sans">
          <MarkedText text={chapter.overviewText} highlights={highlights} />
        </p>
      ) : null}

      {showWhy || showWhen ? (
        <div className={`grid grid-cols-1 gap-3.5 ${showWhy && showWhen ? "md:grid-cols-2" : ""}`}>
          {showWhy ? (
            <div className="p-4 sm:p-5 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#D97706]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                <span>Why it matters</span>
              </div>
              <p className="text-xs sm:text-[13px] text-[#52635E] leading-relaxed">
                <MarkedText text={chapter.why || ""} highlights={highlights} />
              </p>
            </div>
          ) : null}
          {showWhen ? (
            <div className="p-4 sm:p-5 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#D97706]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                <span>When to use it</span>
              </div>
              <p className="text-xs sm:text-[13px] text-[#52635E] leading-relaxed">
                <MarkedText text={chapter.when || ""} highlights={highlights} />
              </p>
            </div>
          ) : null}
        </div>
      ) : null}

      {chapter.practical?.scenario?.trim() || chapter.practical?.app?.trim() ? (
        <div className="p-4 sm:p-5 rounded-xl border border-[#D0E2FF] bg-[#F4F8FF] space-y-3 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0062D2]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0062D2]" />
            <span>Practical Example</span>
          </div>
          <p className="text-xs sm:text-sm text-[#1C2A26] leading-relaxed">
            {chapter.practical.app?.trim() ? (
              <strong className="font-bold text-[#0F172A]">
                <MarkedText text={chapter.practical.app} highlights={highlights} />
              </strong>
            ) : null}
            {chapter.practical.app?.trim() && chapter.practical.scenario?.trim() ? " — " : null}
            {chapter.practical.scenario?.trim() ? (
              <MarkedText text={chapter.practical.scenario} highlights={highlights} />
            ) : null}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {chapter.practical.fail?.trim() ? (
              <div className="p-3.5 rounded-xl border border-rose-200 border-t-2 border-t-rose-500 bg-white space-y-1 shadow-2xs">
                <span className="block font-mono text-[10px] uppercase tracking-wider font-bold text-rose-700">
                  {chapter.practical.failLabel || "Fail Condition"}
                </span>
                <p className="text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed">
                  <MarkedText text={chapter.practical.fail} highlights={highlights} />
                </p>
              </div>
            ) : null}
            {chapter.practical.pass?.trim() ? (
              <div className="p-3.5 rounded-xl border border-emerald-200 border-t-2 border-t-emerald-500 bg-white space-y-1 shadow-2xs">
                <span className="block font-mono text-[10px] uppercase tracking-wider font-bold text-emerald-700">
                  {chapter.practical.passLabel || "Pass Condition"}
                </span>
                <p className="text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed">
                  <MarkedText text={chapter.practical.pass} highlights={highlights} />
                </p>
              </div>
            ) : null}
            {chapter.practical.value?.trim() ? (
              <div className="p-3.5 rounded-xl border border-sky-200 border-t-2 border-t-sky-500 bg-white space-y-1 shadow-2xs sm:col-span-2">
                <span className="block font-mono text-[10px] uppercase tracking-wider font-bold text-sky-700">
                  Value delivered
                </span>
                <p className="text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed">
                  <MarkedText text={chapter.practical.value} highlights={highlights} />
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {showAdv || showLim ? (
        <div className={`grid grid-cols-1 gap-3.5 ${showAdv && showLim ? "md:grid-cols-2" : ""}`}>
          {showAdv ? (
            <div className="p-4 sm:p-5 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Advantages</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#52635E] pl-4 list-disc marker:text-emerald-600/70 leading-relaxed">
                {chapter.advantages!.map((adv, ai) => (
                  <li key={ai}>
                    <MarkedText text={adv} highlights={highlights} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {showLim ? (
            <div className="p-4 sm:p-5 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-700">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                <span>Limitations</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#52635E] pl-4 list-disc marker:text-rose-600/70 leading-relaxed">
                {chapter.limitations!.map((lim, li) => (
                  <li key={li}>
                    <MarkedText text={lim} highlights={highlights} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      {chapter.tools?.length ? (
        <div className="pt-1">
          <ToolSwitcher tools={chapter.tools} onNavigateChapter={onNavigateChapter} />
        </div>
      ) : null}

      {mdBody ? (
        <div className={showWhy || showWhen || chapter.practical ? "pt-3 border-t border-[#E7E0D3] space-y-3" : "space-y-3"}>
          {showWhy || showWhen || chapter.practical ? (
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A9B95]">Lesson content</p>
          ) : null}
          {renderMarkdown(mdBody)}
        </div>
      ) : null}

      {chapter.sections?.length ? (
        <div className="space-y-3 pt-3.5 border-t border-[#E7E0D3]">
          {chapter.sections.map((sec, sIdx) => (
            <div key={sIdx} className="p-3.5 sm:p-4 rounded-xl bg-[#FAF7F2] border border-[#E7E0D3] space-y-1.5">
              <h4 className="font-serif-display font-bold text-sm sm:text-base text-[#1C2A26] flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#D97706]" /> {sec.title}
              </h4>
              <div className="text-xs sm:text-[13px] text-[#52635E] leading-relaxed whitespace-pre-line font-sans">
                <MarkedText text={sec.body} highlights={highlights} />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {chapter.codeSnippet?.trim() ? (
        <div className="space-y-1.5 pt-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#52635E] block flex items-center gap-1.5 font-sans">
            <Code className="w-3 h-3 text-[#D97706]" /> CODE EXAMPLE
          </span>
          <div className="p-3.5 sm:p-4 bg-[#1C2A26] text-[#A7F3D0] rounded-xl font-mono text-xs sm:text-[13px] overflow-x-auto leading-relaxed border border-[#2D3F3A] shadow-inner">
            <pre>{chapter.codeSnippet}</pre>
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}
