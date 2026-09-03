"use client";

import type { ReactNode } from "react";
import { useCallback } from "react";
import { Code, Plus, Trash2, Undo2 } from "lucide-react";
import type { ManualChapter, ManualExercise } from "@/app/manuals/types";
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

const emptyExercise = (): ManualExercise => ({ prompt: "", solutionCode: "" });

export function ChapterContentEditor({
  chapter,
  viewMode,
  onPatch,
  renderMarkdown,
}: {
  chapter: ManualChapter;
  viewMode: "full" | "summary" | "activities";
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
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            Advantages (optional — trade-offs only)
          </span>
          {linesField(
            chapter.advantages,
            (advantages) => patchField("advantages", { advantages: chapter.advantages }, { advantages }),
            "One advantage per line — leave empty if not a trade-off chapter"
          )}
        </label>
        <label className="block space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
            Limitations (optional — trade-offs only)
          </span>
          {linesField(
            chapter.limitations,
            (limitations) => patchField("limitations", { limitations: chapter.limitations }, { limitations }),
            "One limitation per line — leave empty if not a trade-off chapter"
          )}
        </label>
      </div>

      <label className="block space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
          Key differences (one per line — optional)
        </span>
        {linesField(
          chapter.keyDifferences,
          (keyDifferences) =>
            patchField("keyDifferences", { keyDifferences: chapter.keyDifferences }, { keyDifferences }),
          "Cypress-specific facts with no direct equivalent, etc."
        )}
      </label>

      <label className="block space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
          Comparison rows (JSON array — optional)
        </span>
        <textarea
          value={JSON.stringify(chapter.comparisons || [], null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value || "[]");
              if (!Array.isArray(parsed)) return;
              patchField(
                "comparisons",
                { comparisons: chapter.comparisons },
                { comparisons: parsed as ManualChapter["comparisons"] }
              );
            } catch {
              /* ignore mid-edit JSON */
            }
          }}
          rows={6}
          className="w-full p-3 text-xs font-mono bg-[#F0FDFA] border border-teal-200 rounded-xl focus:outline-none focus:border-teal-600"
          placeholder='[{"lever":"...","equivalent":"...","verdict":"..."}]'
        />
      </label>

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
