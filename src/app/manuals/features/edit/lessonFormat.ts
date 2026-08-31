export type LessonFormatKind =
  | "h1"
  | "h2"
  | "h3"
  | "bold"
  | "list"
  | "num"
  | "quote"
  | "code"
  | "inline";

const MAP: Record<LessonFormatKind, { pre: string; post: string; ph: string }> = {
  h1: { pre: "# ", post: "", ph: "Heading" },
  h2: { pre: "## ", post: "", ph: "Heading" },
  h3: { pre: "### ", post: "", ph: "Heading" },
  bold: { pre: "**", post: "**", ph: "bold" },
  list: { pre: "- ", post: "", ph: "List item" },
  num: { pre: "1. ", post: "", ph: "Step" },
  quote: { pre: "> ", post: "", ph: "Note" },
  code: { pre: "```\n", post: "\n```", ph: "code here" },
  inline: { pre: "`", post: "`", ph: "code" },
};

/** Wrap selected text (or a placeholder) with a markdown snippet. */
export function applyLessonFormat(
  value: string,
  start: number,
  end: number,
  kind: LessonFormatKind
): { next: string; innerStart: number; innerLen: number } {
  const selected = value.slice(start, end);
  const { pre, post, ph } = MAP[kind];
  const inner = selected || ph;
  const block = kind !== "bold" && kind !== "inline";
  const lead = block && start > 0 && value[start - 1] !== "\n" ? "\n" : "";
  const insert = lead + pre + inner + post;
  return {
    next: value.slice(0, start) + insert + value.slice(end),
    innerStart: start + lead.length + pre.length,
    innerLen: inner.length,
  };
}
