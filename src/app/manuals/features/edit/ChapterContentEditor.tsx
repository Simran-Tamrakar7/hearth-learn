"use client";

import type { ReactNode } from "react";
import { Code } from "lucide-react";
import type { ManualChapter } from "@/app/manuals/_lib/manualsData";
import { chapterAiSummary, chapterCustomSummary } from "@/app/manuals/_lib/manualsData";
import { LessonContentEditor } from "@/app/manuals/features/edit/LessonContentEditor";

function linesField(value: string[] | undefined, onChange: (next: string[]) => void, placeholder: string) {
  return (
    <textarea
      value={(value || []).join("\n")}
      onChange={(e) =>
        onChange(
          e.target.value
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean)
        )
      }
      rows={4}
      placeholder={placeholder}
      className="w-full p-3 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706] font-mono"
    />
  );
}

export function ChapterContentEditor({
  chapter,
  viewMode,
  onPatch,
  renderMarkdown,
}: {
  chapter: ManualChapter;
  viewMode: "full" | "summary" | "aiSummary";
  onPatch: (patch: Partial<ManualChapter>) => void;
  renderMarkdown: (text: string) => ReactNode;
}) {
  if (viewMode === "summary") {
    return (
      <textarea
        value={chapterCustomSummary(chapter)}
        onChange={(e) => onPatch({ customSummary: e.target.value })}
        rows={10}
        placeholder="Write your summary for this chapter."
        className="w-full p-3.5 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
      />
    );
  }

  if (viewMode === "aiSummary") {
    return (
      <textarea
        value={chapterAiSummary(chapter)}
        onChange={(e) => onPatch({ aiSummary: e.target.value, summaryMarkdown: e.target.value })}
        rows={10}
        placeholder="AI summary"
        className="w-full p-3.5 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
      />
    );
  }

  const practical = chapter.practical || { app: "", scenario: "", pass: "", fail: "" };

  return (
    <div className="space-y-3">
      <label className="block space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#52635E]">Overview</span>
        <textarea
          value={chapter.overviewText || ""}
          onChange={(e) => onPatch({ overviewText: e.target.value })}
          rows={4}
          className="w-full p-3 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#52635E]">Why it matters</span>
          <textarea
            value={chapter.why || ""}
            onChange={(e) => onPatch({ why: e.target.value })}
            rows={5}
            className="w-full p-3 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#52635E]">When to use it</span>
          <textarea
            value={chapter.when || ""}
            onChange={(e) => onPatch({ when: e.target.value })}
            rows={5}
            className="w-full p-3 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
          />
        </label>
      </div>

      <fieldset className="p-3 rounded-xl border border-[#D0E2FF] bg-[#F4F8FF] space-y-2">
        <legend className="text-[10px] font-bold uppercase tracking-wider text-[#0062D2] px-1">Practical example</legend>
        <input
          value={practical.app}
          onChange={(e) => onPatch({ practical: { ...practical, app: e.target.value } })}
          placeholder="App / context"
          className="w-full p-2 text-sm bg-white border border-[#E7E0D3] rounded-lg"
        />
        <textarea
          value={practical.scenario}
          onChange={(e) => onPatch({ practical: { ...practical, scenario: e.target.value } })}
          placeholder="Scenario"
          rows={2}
          className="w-full p-2 text-sm bg-white border border-[#E7E0D3] rounded-lg"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <textarea
            value={practical.fail}
            onChange={(e) => onPatch({ practical: { ...practical, fail: e.target.value } })}
            placeholder="Fail condition"
            rows={3}
            className="w-full p-2 text-sm bg-white border border-rose-200 rounded-lg"
          />
          <textarea
            value={practical.pass}
            onChange={(e) => onPatch({ practical: { ...practical, pass: e.target.value } })}
            placeholder="Pass condition"
            rows={3}
            className="w-full p-2 text-sm bg-white border border-emerald-200 rounded-lg"
          />
        </div>
      </fieldset>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Advantages (one per line)</span>
          {linesField(chapter.advantages, (advantages) => onPatch({ advantages }), "One advantage per line")}
        </label>
        <label className="block space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">Limitations (one per line)</span>
          {linesField(chapter.limitations, (limitations) => onPatch({ limitations }), "One limitation per line")}
        </label>
      </div>

      <label className="block space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#52635E]">Lesson body (markdown)</span>
        <LessonContentEditor
          value={chapter.contentMarkdown || ""}
          onChange={(next) => onPatch({ contentMarkdown: next })}
          preview={renderMarkdown}
        />
      </label>

      <div className="space-y-1.5 pt-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#52635E] flex items-center gap-1.5 font-sans">
          <Code className="w-3 h-3 text-[#D97706]" /> Code example
        </span>
        <textarea
          value={chapter.codeSnippet || ""}
          onChange={(e) => onPatch({ codeSnippet: e.target.value })}
          rows={4}
          className="w-full p-3.5 sm:p-4 bg-[#1C2A26] text-[#A7F3D0] rounded-xl font-mono text-xs sm:text-[13px] leading-relaxed border border-[#2D3F3A] focus:outline-none focus:border-[#D97706]"
        />
      </div>
    </div>
  );
}
