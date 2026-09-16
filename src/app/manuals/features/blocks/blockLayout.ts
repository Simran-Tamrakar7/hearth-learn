/**
 * Per-row chapter layout (1–3 columns). Independent of the block-type catalog.
 * Existing chapters without `blockLayout` hydrate to one block per row.
 */
import { newBlockId, type BlockLayout, type BlockRow, type RowColumns } from "@/app/manuals/features/blocks/types";

export type { BlockLayout, BlockRow, RowColumns };

export function asRowColumns(n: number): RowColumns {
  if (n >= 3) return 3;
  if (n === 2) return 2;
  return 1;
}

function cloneLayout(layout: BlockLayout): BlockLayout {
  return { rows: layout.rows.map((r) => ({ ...r, blockIds: [...r.blockIds] })) };
}

function autoRow(blockId: string, columns: RowColumns = 1): BlockRow {
  return { id: `row-${blockId}`, columns, blockIds: [blockId] };
}

/** One block per row when no layout is saved. Row ids are stable across renders. */
export function stackedLayout(blockIds: string[]): BlockLayout {
  return { rows: blockIds.map((id) => autoRow(id)) };
}

export function parseBlockLayout(v: unknown): BlockLayout | undefined {
  if (!v || typeof v !== "object") return undefined;
  if (!Array.isArray((v as { rows?: unknown }).rows)) return undefined;
  return v as BlockLayout;
}

/** Drop unknown ids, append orphans as 1-col rows, keep empty rows. */
export function sanitizeLayout(layout: BlockLayout | undefined | null, blockIds: string[]): BlockLayout {
  if (!layout?.rows?.length) return stackedLayout(blockIds);
  const known = new Set(blockIds);
  const seen = new Set<string>();
  const rows: BlockRow[] = [];
  for (const row of layout.rows) {
    const ids = (row.blockIds || []).filter((id) => known.has(id) && !seen.has(id));
    ids.forEach((id) => seen.add(id));
    const columns = asRowColumns(Number(row.columns) || Math.max(1, ids.length));
    rows.push({
      id: row.id || (ids[0] ? `row-${ids[0]}` : newBlockId("row")),
      columns: columns < ids.length ? asRowColumns(ids.length) : columns,
      blockIds: ids,
    });
  }
  for (const id of blockIds) {
    if (!seen.has(id)) rows.push(autoRow(id));
  }
  return { rows };
}

export function layoutBlockOrder(layout: BlockLayout): string[] {
  return layout.rows.flatMap((r) => r.blockIds);
}

export function blocksInLayoutOrder<T extends { id: string }>(
  blocks: T[],
  layout?: BlockLayout | null
): T[] {
  const ids = blocks.map((b) => b.id);
  const order = layoutBlockOrder(sanitizeLayout(layout, ids));
  const byId = new Map(blocks.map((b) => [b.id, b]));
  return order.map((id) => byId.get(id)).filter((b): b is T => Boolean(b));
}

/** True when layout is still the implicit one-block-per-row default. */
export function isDefaultStacked(layout: BlockLayout, blockIds: string[]): boolean {
  if (layout.rows.length !== blockIds.length) return false;
  return layout.rows.every(
    (r, i) => r.columns === 1 && r.blockIds.length === 1 && r.blockIds[0] === blockIds[i]
  );
}

export function persistableLayout(
  saved: BlockLayout | undefined | null,
  next: BlockLayout,
  blockIds: string[]
): BlockLayout | undefined {
  if (saved?.rows?.length) return next;
  if (isDefaultStacked(next, blockIds)) return undefined;
  return next;
}

export function rowGridClass(columns: RowColumns, collapseOnMobile = true): string {
  if (!collapseOnMobile) {
    if (columns === 3) return "grid grid-cols-3 gap-3";
    if (columns === 2) return "grid grid-cols-2 gap-3";
    return "grid grid-cols-1 gap-3";
  }
  if (columns === 3) return "grid grid-cols-1 md:grid-cols-3 gap-3";
  if (columns === 2) return "grid grid-cols-1 md:grid-cols-2 gap-3";
  return "grid grid-cols-1 gap-3";
}

export function findRowIndex(layout: BlockLayout, blockId: string): number {
  return layout.rows.findIndex((r) => r.blockIds.includes(blockId));
}

export function blockMoveFlags(layout: BlockLayout, blockId: string) {
  const rowIdx = findRowIndex(layout, blockId);
  if (rowIdx < 0) return { up: false, down: false, left: false, right: false };
  const row = layout.rows[rowIdx];
  const col = row.blockIds.indexOf(blockId);
  return {
    left: col > 0,
    right: col >= 0 && col < row.blockIds.length - 1,
    up: rowIdx > 0,
    down: rowIdx < layout.rows.length - 1,
  };
}

export function addRow(layout: BlockLayout, columns: RowColumns, afterRowId?: string): BlockLayout {
  const next = cloneLayout(layout);
  const row: BlockRow = { id: newBlockId("row"), columns, blockIds: [] };
  const idx = afterRowId ? next.rows.findIndex((r) => r.id === afterRowId) : -1;
  if (idx >= 0) next.rows.splice(idx + 1, 0, row);
  else next.rows.push(row);
  return next;
}

export function removeRow(layout: BlockLayout, rowId: string): BlockLayout {
  const next = cloneLayout(layout);
  const row = next.rows.find((r) => r.id === rowId);
  if (!row) return next;
  if (row.blockIds.length) {
    // ponytail: emptying an occupied row would orphan blocks — refuse
    return next;
  }
  next.rows = next.rows.filter((r) => r.id !== rowId);
  return next;
}

/** Shrink overflows into new 1-col rows after this one. Never drops blocks. */
export function setRowColumns(layout: BlockLayout, rowId: string, columns: RowColumns): BlockLayout {
  const next = cloneLayout(layout);
  const idx = next.rows.findIndex((r) => r.id === rowId);
  if (idx < 0) return next;
  const row = next.rows[idx];
  row.columns = columns;
  if (row.blockIds.length > columns) {
    const extra = row.blockIds.splice(columns);
    const extras: BlockRow[] = extra.map((id) => autoRow(id));
    next.rows.splice(idx + 1, 0, ...extras);
  }
  return next;
}

function stripBlock(layout: BlockLayout, blockId: string): { layout: BlockLayout; fromIndex: number } {
  const next = cloneLayout(layout);
  let fromIndex = -1;
  next.rows = next.rows.filter((row, i) => {
    const at = row.blockIds.indexOf(blockId);
    if (at < 0) return true;
    fromIndex = i;
    row.blockIds.splice(at, 1);
    return row.blockIds.length > 0;
  });
  return { layout: next, fromIndex };
}

/**
 * Move a block into a row at `index`. Auto-expands the row up to 3 columns.
 * A 4th block overflows into a new 1-col row after the target.
 */
export function moveBlockToRow(
  layout: BlockLayout,
  blockId: string,
  destRowId: string,
  index: number
): BlockLayout {
  const stripped = stripBlock(layout, blockId);
  const next = stripped.layout;
  const destIdx = next.rows.findIndex((r) => r.id === destRowId);
  if (destIdx < 0) {
    next.rows.push({ id: destRowId, columns: 1, blockIds: [blockId] });
    return next;
  }
  const row = next.rows[destIdx];
  const insertAt = Math.max(0, Math.min(index, row.blockIds.length));
  row.blockIds.splice(insertAt, 0, blockId);
  if (row.blockIds.length > 3) {
    row.columns = 3;
    const extra = row.blockIds.splice(3);
    const extras: BlockRow[] = extra.map((id) => autoRow(id));
    next.rows.splice(destIdx + 1, 0, ...extras);
  } else if (row.blockIds.length > row.columns) {
    row.columns = asRowColumns(row.blockIds.length);
  }
  return next;
}

export function appendBlockRow(layout: BlockLayout, blockId: string): BlockLayout {
  const next = cloneLayout(layout);
  next.rows.push(autoRow(blockId));
  return next;
}

export function removeBlockFromLayout(layout: BlockLayout, blockId: string): BlockLayout {
  return stripBlock(layout, blockId).layout;
}

export function duplicateBlockInLayout(layout: BlockLayout, originalId: string, copyId: string): BlockLayout {
  const next = cloneLayout(layout);
  for (const row of next.rows) {
    const i = row.blockIds.indexOf(originalId);
    if (i < 0) continue;
    if (row.blockIds.length < 3 && row.blockIds.length < row.columns) {
      row.blockIds.splice(i + 1, 0, copyId);
      return next;
    }
    if (row.blockIds.length < 3) {
      row.blockIds.splice(i + 1, 0, copyId);
      row.columns = asRowColumns(row.blockIds.length);
      return next;
    }
    const rowIdx = next.rows.indexOf(row);
    next.rows.splice(rowIdx + 1, 0, autoRow(copyId));
    return next;
  }
  return appendBlockRow(next, copyId);
}

export function moveBlockStep(
  layout: BlockLayout,
  blockId: string,
  dir: "up" | "down" | "left" | "right"
): BlockLayout {
  const rowIdx = findRowIndex(layout, blockId);
  if (rowIdx < 0) return layout;
  const row = layout.rows[rowIdx];
  const col = row.blockIds.indexOf(blockId);

  if (dir === "left") {
    if (col <= 0) return layout;
    const next = cloneLayout(layout);
    const ids = next.rows[rowIdx].blockIds;
    [ids[col - 1], ids[col]] = [ids[col], ids[col - 1]];
    return next;
  }
  if (dir === "right") {
    if (col < 0 || col >= row.blockIds.length - 1) return layout;
    const next = cloneLayout(layout);
    const ids = next.rows[rowIdx].blockIds;
    [ids[col + 1], ids[col]] = [ids[col], ids[col + 1]];
    return next;
  }
  if (dir === "up") {
    if (rowIdx === 0) return layout;
    const dest = layout.rows[rowIdx - 1];
    return moveBlockToRow(layout, blockId, dest.id, dest.blockIds.length);
  }
  if (rowIdx >= layout.rows.length - 1) return layout;
  const dest = layout.rows[rowIdx + 1];
  return moveBlockToRow(layout, blockId, dest.id, 0);
}

export function addBlockToRow(layout: BlockLayout, blockId: string, rowId: string): BlockLayout {
  const row = layout.rows.find((r) => r.id === rowId);
  if (!row) return appendBlockRow(layout, blockId);
  return moveBlockToRow(layout, blockId, rowId, row.blockIds.length);
}

export function applyDrop(layout: BlockLayout, blockId: string, overId: string): BlockLayout {
  if (!overId || overId === blockId) return layout;
  if (overId.startsWith("row:")) {
    const destRowId = overId.slice(4);
    const row = layout.rows.find((r) => r.id === destRowId);
    if (!row) return layout;
    return moveBlockToRow(layout, blockId, destRowId, row.blockIds.length);
  }
  if (overId.startsWith("slot:")) {
    const rest = overId.slice(5);
    const colon = rest.lastIndexOf(":");
    const destRowId = rest.slice(0, colon);
    const index = Number(rest.slice(colon + 1));
    return moveBlockToRow(layout, blockId, destRowId, Number.isFinite(index) ? index : 0);
  }
  const destIdx = findRowIndex(layout, overId);
  if (destIdx < 0) return layout;
  const dest = layout.rows[destIdx];
  const index = dest.blockIds.indexOf(overId);
  return moveBlockToRow(layout, blockId, dest.id, index < 0 ? dest.blockIds.length : index);
}
