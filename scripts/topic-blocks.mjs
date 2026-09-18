/** Shared ##-section splitting for Cypress/JMeter rebuilds. ### stays in the parent. */

function isSep(line) {
  const t = line.trim();
  if (!t.includes("|") || !/-/.test(t)) return false;
  const inner = t.replace(/^\|/, "").replace(/\|$/, "");
  const cells = inner.split("|").map((c) => c.trim());
  return cells.length >= 2 && cells.every((c) => /^:?-{2,}:?$/.test(c));
}

function isRow(line) {
  const t = line.trim();
  return t.includes("|") && (t.startsWith("|") || t.split("|").length >= 3);
}

function splitCells(line) {
  let t = line.trim();
  if (t.startsWith("|")) t = t.slice(1);
  if (t.endsWith("|")) t = t.slice(0, -1);
  return t.split("|").map((c) => c.trim());
}

function consumeMdTable(lines, start) {
  const headerLine = lines[start] ?? "";
  const sepLine = lines[start + 1] ?? "";
  if (!isRow(headerLine) || !isSep(sepLine)) return null;
  const headers = splitCells(headerLine);
  if (headers.length < 2) return null;
  const rows = [];
  let j = start + 2;
  while (j < lines.length) {
    const t = (lines[j] ?? "").trim();
    if (!t || !isRow(t)) break;
    if (isSep(t)) {
      j += 1;
      continue;
    }
    const row = splitCells(t);
    while (row.length < headers.length) row.push("");
    rows.push(row.slice(0, headers.length));
    j += 1;
  }
  return { headers, rows, next: j };
}

function tableOnly(md) {
  const lines = String(md || "").split("\n");
  let i = 0;
  while (i < lines.length && !(lines[i] ?? "").trim()) i += 1;
  if (i >= lines.length) return null;
  const tbl = consumeMdTable(lines, i);
  if (!tbl) return null;
  for (let k = tbl.next; k < lines.length; k++) {
    if ((lines[k] ?? "").trim()) return null;
  }
  return { headers: tbl.headers, rows: tbl.rows };
}

function oneOverview(heading, content, makeId, n) {
  return {
    id: makeId(n.i++),
    type: "overview",
    heading: heading || undefined,
    content: content || heading || "",
    order: n.i - 1,
  };
}

function oneTable(heading, table, makeId, n) {
  return {
    id: makeId(n.i++),
    type: "table",
    headers: table.headers,
    rows: table.rows,
    caption: heading || undefined,
    order: n.i - 1,
  };
}

function sectionBlocks(heading, content, makeId, n) {
  const only = tableOnly(content);
  if (only) return [oneTable(heading, only, makeId, n)];
  if (!heading && !content) return [];
  return [oneOverview(heading, content, makeId, n)];
}

/**
 * One overview per ## section. ### stays inside that section.
 * A heading whose body is only a pipe table becomes one table block.
 */
export function topicBlocks(md, makeId) {
  const text = String(md || "").trim();
  if (!text) return undefined;
  const n = { i: 0 };
  const out = [];
  if (!/^##\s+/m.test(text)) {
    const only = tableOnly(text);
    if (!only) return undefined;
    out.push(oneTable(undefined, only, makeId, n));
    return out;
  }
  const chunks = text.split(/^##\s+/m);
  const lead = chunks[0].trim();
  if (lead) out.push(...sectionBlocks(undefined, lead, makeId, n));
  for (const chunk of chunks.slice(1)) {
    const nl = chunk.indexOf("\n");
    const heading = (nl < 0 ? chunk : chunk.slice(0, nl)).trim();
    const content = (nl < 0 ? "" : chunk.slice(nl + 1)).trim();
    if (!heading && !content) continue;
    out.push(...sectionBlocks(heading || undefined, content, makeId, n));
  }
  return out.length ? out : undefined;
}
