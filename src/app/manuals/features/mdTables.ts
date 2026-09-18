/** GFM pipe tables — parse only, no React. */

export type ParsedMdTable = { headers: string[]; rows: string[][] };

export type MdPiece = { kind: "prose"; text: string } | { kind: "table"; table: ParsedMdTable };

function isSep(line: string): boolean {
  const t = line.trim();
  if (!t.includes("|") || !/-/.test(t)) return false;
  const inner = t.replace(/^\|/, "").replace(/\|$/, "");
  const cells = inner.split("|").map((c) => c.trim());
  return cells.length >= 2 && cells.every((c) => /^:?-{2,}:?$/.test(c));
}

function isRow(line: string): boolean {
  const t = line.trim();
  return t.includes("|") && (t.startsWith("|") || t.split("|").length >= 3);
}

export function splitCells(line: string): string[] {
  let t = line.trim();
  if (t.startsWith("|")) t = t.slice(1);
  if (t.endsWith("|")) t = t.slice(0, -1);
  return t.split("|").map((c) => c.trim());
}

/** If `lines[start]` begins a markdown table, return it and the index after the last row. */
export function consumeMdTable(
  lines: string[],
  start: number
): { table: ParsedMdTable; next: number } | null {
  const headerLine = lines[start] ?? "";
  const sepLine = lines[start + 1] ?? "";
  if (!isRow(headerLine) || !isSep(sepLine)) return null;
  const headers = splitCells(headerLine);
  if (headers.length < 2) return null;
  const rows: string[][] = [];
  let j = start + 2;
  while (j < lines.length) {
    const raw = lines[j] ?? "";
    const t = raw.trim();
    if (!t) break;
    if (!isRow(t)) break;
    if (isSep(t)) {
      j += 1;
      continue;
    }
    const row = splitCells(t);
    while (row.length < headers.length) row.push("");
    rows.push(row.slice(0, headers.length));
    j += 1;
  }
  return { table: { headers, rows }, next: j };
}

/** True when `md` is exactly one GFM table (optional surrounding whitespace). */
export function parseTableOnlyMarkdown(md: string): ParsedMdTable | null {
  const pieces = splitMarkdownTables(md);
  if (pieces.length === 1 && pieces[0]?.kind === "table") return pieces[0].table;
  return null;
}

export function splitMarkdownTables(md: string): MdPiece[] {
  const lines = String(md || "").split("\n");
  const out: MdPiece[] = [];
  let prose: string[] = [];
  const flushProse = () => {
    const text = prose.join("\n").trim();
    prose = [];
    if (text) out.push({ kind: "prose", text });
  };
  let i = 0;
  while (i < lines.length) {
    const tbl = consumeMdTable(lines, i);
    if (tbl) {
      flushProse();
      out.push({ kind: "table", table: tbl.table });
      i = tbl.next;
      continue;
    }
    prose.push(lines[i] ?? "");
    i += 1;
  }
  flushProse();
  return out;
}
