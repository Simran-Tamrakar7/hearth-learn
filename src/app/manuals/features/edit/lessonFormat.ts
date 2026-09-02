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

function stripListPrefix(line: string) {
  return line.trim().replace(/^[-*•]\s+/, "").replace(/^\d+[.)]\s+/, "");
}

/** Prefix every non-empty selected line — used for List and Steps toolbar actions. */
function formatLinesAsList(selected: string, kind: "list" | "num") {
  const lines = selected.split("\n");
  let step = 1;
  return lines
    .map((line) => {
      const indent = line.match(/^\s*/)?.[0] ?? "";
      const trimmed = line.trim();
      if (!trimmed) return line;
      const body = stripListPrefix(line);
      if (kind === "list") return `${indent}- ${body}`;
      const out = `${indent}${step}. ${body}`;
      step += 1;
      return out;
    })
    .join("\n");
}

/** Wrap selected text (or a placeholder) with a markdown snippet. */
export function applyLessonFormat(
  value: string,
  start: number,
  end: number,
  kind: LessonFormatKind
): { next: string; innerStart: number; innerLen: number } {
  const selected = value.slice(start, end);
  const { pre, post, ph } = MAP[kind];

  if (kind === "list" || kind === "num") {
    const raw = selected || ph;
    const formatted =
      selected && selected.includes("\n") ? formatLinesAsList(selected, kind) : pre + raw + post;
    const lead = start > 0 && value[start - 1] !== "\n" ? "\n" : "";
    const insert = lead + formatted;
    return {
      next: value.slice(0, start) + insert + value.slice(end),
      innerStart: start + lead.length,
      innerLen: formatted.length,
    };
  }

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
