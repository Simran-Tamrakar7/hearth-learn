"use client";

import type { ComponentType } from "react";
import type { BlockCategory, BlockType, ChapterBlock } from "@/app/manuals/features/blocks/types";
import { BLOCK_CATALOG } from "@/app/manuals/features/blocks/types";
import {
  CodeBody,
  ColumnsBody,
  CuratedResourcesBody,
  DefinitionBody,
  GapBody,
  ImageBody,
  ListBody,
  QuoteReferenceBody,
  ResourcesBody,
  RichTextBody,
  TableBody,
  TierBody,
  TipNoteBody,
  TreeBody,
  VideoBody,
  type BlockBodyProps,
} from "@/app/manuals/features/blocks/BlockBodies";

type Entry = {
  label: string;
  category: BlockCategory;
  description: string;
  Body: ComponentType<BlockBodyProps>;
};

const BODIES: Record<BlockType, ComponentType<BlockBodyProps>> = {
  overview: RichTextBody,
  why: RichTextBody,
  when: RichTextBody,
  tip: TipNoteBody,
  warning: TipNoteBody,
  definition: DefinitionBody,
  quote: QuoteReferenceBody,
  bullets: ListBody,
  gap: GapBody,
  tier: TierBody,
  practical: ColumnsBody,
  tradeoffs: ColumnsBody,
  comparison: ColumnsBody,
  featureMapping: ColumnsBody,
  keyDifference: ColumnsBody,
  steps: ColumnsBody,
  checklist: ListBody,
  code: CodeBody,
  resources: ResourcesBody,
  curatedResources: CuratedResourcesBody,
  tree: TreeBody,
  image: ImageBody,
  table: TableBody,
  video: VideoBody,
};

export const BLOCK_REGISTRY: Record<BlockType, Entry> = Object.fromEntries(
  BLOCK_CATALOG.map((meta) => [
    meta.type,
    { label: meta.label, category: meta.category, description: meta.description, Body: BODIES[meta.type] },
  ])
) as Record<BlockType, Entry>;

export function BlockBody({ block, onChange }: { block: ChapterBlock; onChange: (next: ChapterBlock) => void }) {
  const Body = BLOCK_REGISTRY[block.type]?.Body;
  return Body ? <Body block={block} onChange={onChange} /> : null;
}
