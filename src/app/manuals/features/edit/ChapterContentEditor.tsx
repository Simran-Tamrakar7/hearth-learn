"use client";

import type { ReactNode } from "react";
import { useCallback } from "react";
import { Plus, Trash2, Undo2 } from "lucide-react";
import type { BlockType, ManualChapter, ManualExercise } from "@/app/manuals/types";
import { LessonContentEditor } from "@/app/manuals/features/edit/LessonContentEditor";
import { useChapterEditHistory } from "@/app/manuals/features/edit/editHistory";
import { ChapterBlocksEditor } from "@/app/manuals/features/blocks/BlockEditor";
import { chapterBlocksForEdit } from "@/app/manuals/features/blocks/types";

const emptyExercise = (): ManualExercise => ({ prompt: "", solutionCode: "" });

export function ChapterContentEditor({
  chapter,
  viewMode,
  onPatch,
  renderMarkdown,
  allowedBlockTypes,
}: {
  chapter: ManualChapter;
  viewMode: "full" | "summary" | "activities";
  onPatch: (patch: Partial<ManualChapter>) => void;
  renderMarkdown: (text: string) => ReactNode;
  allowedBlockTypes?: BlockType[] | null;
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
        <LessonContentEditor
          label="Summary"
          value={chapter.customSummary || ""}
          onChange={(next) =>
            patchField("customSummary", { customSummary: chapter.customSummary }, { customSummary: next })
          }
          onAdd={(next) =>
            patchField(
              "customSummary",
              { customSummary: chapter.customSummary },
              { customSummary: next },
              "add"
            )
          }
          preview={renderMarkdown}
        />
        {canUndo ? (
          <button type="button" onClick={handleUndo} className="text-xs font-bold text-[#52635E] flex items-center gap-1">
            <Undo2 className="w-3.5 h-3.5" /> Undo ({undoCount})
          </button>
        ) : null}
      </div>
    );
  }

  if (viewMode === "activities") {
    const exercises = chapter.exercises?.length ? chapter.exercises : [emptyExercise()];

    const setExercises = (next: ManualExercise[]) => {
      patchField("exercises", { exercises: chapter.exercises }, { exercises: next });
    };

    return (
      <div className="space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#52635E]">Quiz &amp; activities</p>
        {exercises.map((ex, idx) => (
          <fieldset key={idx} className="p-3 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] space-y-2">
            <legend className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] px-1">
              Activity {idx + 1}
            </legend>
            <textarea
              value={ex.prompt}
              onChange={(e) => {
                const next = exercises.map((row, i) => (i === idx ? { ...row, prompt: e.target.value } : row));
                setExercises(next);
              }}
              rows={3}
              placeholder="Question or activity prompt"
              className="w-full p-2.5 text-sm bg-white border border-[#E7E0D3] rounded-lg focus:outline-none focus:border-[#D97706]"
            />
            <textarea
              value={ex.solutionCode}
              onChange={(e) => {
                const next = exercises.map((row, i) => (i === idx ? { ...row, solutionCode: e.target.value } : row));
                setExercises(next);
              }}
              rows={2}
              placeholder="Answer or expected outcome"
              className="w-full p-2.5 text-sm bg-white border border-[#E7E0D3] rounded-lg focus:outline-none focus:border-[#D97706]"
            />
            {exercises.length > 1 ? (
              <button
                type="button"
                onClick={() => setExercises(exercises.filter((_, i) => i !== idx))}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            ) : null}
          </fieldset>
        ))}
        <button
          type="button"
          onClick={() => setExercises([...exercises, emptyExercise()])}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C2A26] px-3 py-2 rounded-xl border border-dashed border-[#E7E0D3] hover:border-[#D97706]"
        >
          <Plus className="w-3.5 h-3.5 text-[#D97706]" /> Add activity
        </button>
        {canUndo ? (
          <button type="button" onClick={handleUndo} className="text-xs font-bold text-[#52635E] flex items-center gap-1">
            <Undo2 className="w-3.5 h-3.5" /> Undo ({undoCount})
          </button>
        ) : null}
      </div>
    );
  }

  const blocks = chapterBlocksForEdit(chapter);

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

      <ChapterBlocksEditor
        blocks={blocks}
        allowedBlockTypes={allowedBlockTypes}
        onChange={(next) => patchField("blocks", { blocks: chapter.blocks }, { blocks: next })}
      />

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
    </div>
  );
}
