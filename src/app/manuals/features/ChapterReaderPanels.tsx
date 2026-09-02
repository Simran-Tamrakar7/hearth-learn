"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import type { ManualChapter } from "@/app/manuals/types";

export function ChapterSummaryPanel({
  customSummary,
  renderMarkdown,
}: {
  customSummary?: string;
  renderMarkdown: (text: string) => ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3] space-y-2.5 shadow-2xs"
    >
      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#D97706]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
        <span>Summary</span>
      </div>
      <div className="text-xs sm:text-sm leading-relaxed text-[#1C2A26] font-sans font-normal">
        {customSummary?.trim() ? renderMarkdown(customSummary) : <p className="text-[#8A9B95] font-normal">No summary yet.</p>}
      </div>
    </motion.div>
  );
}

export function ChapterActivitiesPanel({
  chapter,
  quizText,
  quizBusy,
  onGenerateQuiz,
}: {
  chapter: ManualChapter;
  quizText: string;
  quizBusy: boolean;
  onGenerateQuiz: () => void;
}) {
  const exercises = (chapter.exercises || []).filter((ex) => ex.prompt.trim());

  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-4 shadow-2xs"
    >
      <div className="flex items-center gap-2 text-amber-900 font-serif-display font-bold text-base">
        <HelpCircle className="w-4 h-4 text-[#D97706]" />
        <span>Quiz &amp; Activities</span>
      </div>

      {exercises.length > 0 ? (
        <ol className="space-y-3 list-decimal pl-5 marker:text-[#D97706] marker:font-bold">
          {exercises.map((ex, idx) => (
            <li key={idx} className="space-y-1">
              <p className="text-xs sm:text-sm text-[#1C2A26] font-medium leading-relaxed">{ex.prompt}</p>
              {ex.solutionCode.trim() ? (
                <p className="text-xs text-[#52635E] pl-3 border-l-2 border-[#D97706]/40">
                  <span className="font-bold text-[#D97706] mr-1">Answer:</span>
                  {ex.solutionCode}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-xs text-[#8A9B95]">No activities yet. Edit this chapter to add quiz questions.</p>
      )}

      <div className="pt-2 space-y-2 border-t border-amber-200/80">
        <button
          type="button"
          className="text-[11px] font-bold px-3 py-1.5 rounded-lg border border-[#E7E0D3] bg-white hover:border-[#D97706] disabled:opacity-50"
          disabled={quizBusy}
          onClick={onGenerateQuiz}
        >
          {quizBusy ? "Writing quiz…" : "Generate chapter quiz"}
        </button>
        {quizText ? (
          <pre className="text-xs whitespace-pre-wrap p-3 rounded-xl bg-white border border-[#E7E0D3]">{quizText}</pre>
        ) : null}
      </div>
    </motion.div>
  );
}
