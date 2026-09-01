"use client";

import type { ReactNode } from "react";
import { useCallback } from "react";
import { Code, Undo2 } from "lucide-react";
import type { ManualChapter } from "@/app/manuals/types";
import { chapterAiSummary, chapterCustomSummary } from "@/app/manuals/types";
import { LessonContentEditor } from "@/app/manuals/features/edit/LessonContentEditor";
import { useChapterEditHistory } from "@/app/manuals/features/edit/editHistory";

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
  const { push, undo, canUndo, undoCount } = useChapterEditHistory(chapter);

  const patchField = useCallback(
    (field: string, before: Partial<ManualChapter>, after: Partial<ManualChapter>, kind: "edit" | "add" = "edit") => {
      push({ kind, field, before, after });
      onPatch(after);
    },
    [onPatch, push]
  );

  const handleUndo = () => {
    const prev = undo();
    if (prev) onPatch(prev);
  };

  if (viewMode === "summary") {
    return (
      <div className="space-y-2">
        <textarea
          value={chapterCustomSummary(chapter)}
          onChange={(e) =>
            patchField("customSummary", { customSummary: chapterCustomSummary(chapter) }, { customSummary: e.target.value })
          }
          rows={10}
          placeholder="Write your summary for this chapter."
          className="w-full p-3.5 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
        />
        {canUndo ? (
          <button type="button" onClick={handleUndo} className="text-xs font-bold text-[#52635E] flex items-center gap-1">
            <Undo2 className="w-3.5 h-3.5" /> Undo ({undoCount})
          </button>
        ) : null}
      </div>
    );
  }

  if (viewMode === "aiSummary") {
    return (
      <div className="space-y-2">
        <textarea
          value={chapterAiSummary(chapter)}
          onChange={(e) =>
            patchField(
              "aiSummary",
              { aiSummary: chapterAiSummary(chapter), summaryMarkdown: chapterAiSummary(chapter) },
              { aiSummary: e.target.value, summaryMarkdown: e.target.value }
            )
          }
          rows={10}
          placeholder="AI summary"
          className="w-full p-3.5 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
        />
        {canUndo ? (
          <button type="button" onClick={handleUndo} className="text-xs font-bold text-[#52635E] flex items-center gap-1">
            <Undo2 className="w-3.5 h-3.5" /> Undo ({undoCount})
          </button>
        ) : null}
      </div>
    );
  }

  const practical = chapter.practical || { app: "", scenario: "", pass: "", fail: "" };

  return (
    <div className="space-y-3">
      {canUndo ? (
        <button
          type="button"
          onClick={handleUndo}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#52635E] px-2.5 py-1.5 rounded-lg border border-[#E7E0D3] hover:border-[#D97706]"
        >
          <Undo2 className="w-3.5 h-3.5" /> Undo ({undoCount})
        </button>
      ) : null}

      <label className="block space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#52635E]">Overview</span>
        <textarea
          value={chapter.overviewText || ""}
          onChange={(e) =>
            patchField("overviewText", { overviewText: chapter.overviewText || "" }, { overviewText: e.target.value })
          }
          rows={4}
          className="w-full p-3 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#52635E]">Why it matters</span>
          <textarea
            value={chapter.why || ""}
            onChange={(e) => patchField("why", { why: chapter.why || "" }, { why: e.target.value })}
            rows={5}
            className="w-full p-3 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#52635E]">When to use it</span>
          <textarea
            value={chapter.when || ""}
            onChange={(e) => patchField("when", { when: chapter.when || "" }, { when: e.target.value })}
            rows={5}
            className="w-full p-3 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
          />
        </label>
      </div>

      <fieldset className="p-3 rounded-xl border border-[#D0E2FF] bg-[#F4F8FF] space-y-2">
        <legend className="text-[10px] font-bold uppercase tracking-wider text-[#0062D2] px-1">Practical example</legend>
        <input
          value={practical.app}
          onChange={(e) =>
            patchField("practical.app", { practical }, { practical: { ...practical, app: e.target.value } })
          }
          placeholder="App / context"
          className="w-full p-2 text-sm bg-white border border-[#E7E0D3] rounded-lg"
        />
        <textarea
          value={practical.scenario}
          onChange={(e) =>
            patchField("practical.scenario", { practical }, { practical: { ...practical, scenario: e.target.value } })
          }
          placeholder="Scenario"
          rows={2}
          className="w-full p-2 text-sm bg-white border border-[#E7E0D3] rounded-lg"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <textarea
            value={practical.fail}
            onChange={(e) =>
              patchField("practical.fail", { practical }, { practical: { ...practical, fail: e.target.value } })
            }
            placeholder="Fail condition"
            rows={3}
            className="w-full p-2 text-sm bg-white border border-rose-200 rounded-lg"
          />
          <textarea
            value={practical.pass}
            onChange={(e) =>
              patchField("practical.pass", { practical }, { practical: { ...practical, pass: e.target.value } })
            }
            placeholder="Pass condition"
            rows={3}
            className="w-full p-2 text-sm bg-white border border-emerald-200 rounded-lg"
          />
        </div>
      </fieldset>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Advantages (one per line)</span>
          {linesField(
            chapter.advantages,
            (advantages) => patchField("advantages", { advantages: chapter.advantages }, { advantages }),
            "One advantage per line"
          )}
        </label>
        <label className="block space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">Limitations (one per line)</span>
          {linesField(
            chapter.limitations,
            (limitations) => patchField("limitations", { limitations: chapter.limitations }, { limitations }),
            "One limitation per line"
          )}
        </label>
      </div>

      <label className="block space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#52635E]">Lesson body (markdown)</span>
        <LessonContentEditor
          value={chapter.contentMarkdown || ""}
          onChange={(next) =>
            patchField("contentMarkdown", { contentMarkdown: chapter.contentMarkdown || "" }, { contentMarkdown: next })
          }
          onAdd={(next) =>
            patchField("contentMarkdown", { contentMarkdown: chapter.contentMarkdown || "" }, { contentMarkdown: next }, "add")
          }
          preview={renderMarkdown}
        />
      </label>

      <div className="space-y-1.5 pt-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#52635E] flex items-center gap-1.5 font-sans">
          <Code className="w-3 h-3 text-[#D97706]" /> Code example
        </span>
        <textarea
          value={chapter.codeSnippet || ""}
          onChange={(e) =>
            patchField("codeSnippet", { codeSnippet: chapter.codeSnippet || "" }, { codeSnippet: e.target.value })
          }
          rows={4}
          className="w-full p-3.5 sm:p-4 bg-[#1C2A26] text-[#A7F3D0] rounded-xl font-mono text-xs sm:text-[13px] leading-relaxed border border-[#2D3F3A] focus:outline-none focus:border-[#D97706]"
        />
      </div>
    </div>
  );
}
