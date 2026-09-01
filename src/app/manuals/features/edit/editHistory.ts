"use client";

import { useCallback, useRef, useState } from "react";
import type { ManualChapter } from "@/app/manuals/types";

export type EditHistoryKind = "edit" | "add";

export type EditHistoryEntry = {
  kind: EditHistoryKind;
  field: string;
  before: Partial<ManualChapter>;
  after: Partial<ManualChapter>;
};

const MAX = 50;

/** In-memory undo stack for one chapter edit session (lost on reload). */
export function useChapterEditHistory(chapter: ManualChapter) {
  const stack = useRef<EditHistoryEntry[]>([]);
  const [len, setLen] = useState(0);
  const chapterId = useRef(chapter.id);

  if (chapterId.current !== chapter.id) {
    chapterId.current = chapter.id;
    stack.current = [];
    setLen(0);
  }

  const push = useCallback((entry: EditHistoryEntry) => {
    stack.current.push(entry);
    if (stack.current.length > MAX) stack.current.shift();
    setLen(stack.current.length);
  }, []);

  const undo = useCallback((): Partial<ManualChapter> | null => {
    const entry = stack.current.pop();
    if (!entry) return null;
    setLen(stack.current.length);
    return entry.before;
  }, []);

  return { push, undo, canUndo: len > 0, undoCount: len };
}
