"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import type { ManualChapter } from "@/app/manuals/types";
import type { ChapterHighlight } from "@/app/manuals/features/highlights";
import { MarkedText } from "@/app/manuals/features/highlights";
import { ToolSwitcher, testingTypesMdSections } from "@/app/manuals/features/reader";
import { ChapterBlockView } from "@/app/manuals/features/blocks/BlockViews";
import { chapterBlocksForRender, legacyFieldsToBlocks } from "@/app/manuals/features/blocks/types";
import {
  AdvantagesLimitations,
  CodeReferenceBox,
  ComparisonTable,
  KeyDifferenceCallout,
  PracticalExampleBox,
  WhenToUseIt,
  WhyItMatters,
} from "@/app/manuals/features/insightBoxes";

/**
 * One full-content layout for every manual slug.
 * Prefer `chapter.blocks[]` when set; otherwise legacy field presence.
 */
export function ChapterFullContent({
  chapter,
  highlights,
  renderMarkdown,
  isTestingTypesManual,
  onNavigateChapter,
}: {
  chapter: ManualChapter;
  highlights: ChapterHighlight[];
  renderMarkdown: (text: string) => ReactNode;
  isTestingTypesManual: boolean;
  onNavigateChapter: (idx: number) => void;
}) {
  const mdBody = isTestingTypesManual
    ? testingTypesMdSections(chapter, chapter.overviewText)
    : (chapter.contentMarkdown || "").trim();

  const explicitBlocks = chapterBlocksForRender(chapter);
  const blocks = explicitBlocks ?? legacyFieldsToBlocks(chapter);
  const usingBlocks = Array.isArray(chapter.blocks);
  const hasBlocks = blocks.length > 0;

  // Legacy-only path (no blocks array): keep overview outside the insight list for parity
  // when synthesizing — overview is included in legacyFieldsToBlocks as an overview block.
  const showLegacyOverview =
    !usingBlocks && !blocks.some((b) => b.type === "overview") && Boolean(chapter.overviewText?.trim());

  return (
    <motion.div initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {showLegacyOverview ? (
        <p className="text-xs sm:text-sm text-[#52635E] leading-relaxed font-sans">
          <MarkedText text={chapter.overviewText || ""} highlights={highlights} />
        </p>
      ) : null}

      {hasBlocks ? (
        <div className="space-y-3.5">
          {blocks.map((block) => (
            <ChapterBlockView key={block.id} block={block} highlights={highlights} />
          ))}
        </div>
      ) : !usingBlocks ? (
        <LegacyInsightFields chapter={chapter} highlights={highlights} />
      ) : null}

      {chapter.tools?.length ? (
        <div className="pt-1">
          <ToolSwitcher tools={chapter.tools} onNavigateChapter={onNavigateChapter} />
        </div>
      ) : null}

      {mdBody ? (
        <div className={hasBlocks || showLegacyOverview ? "pt-3 border-t border-[#E7E0D3] space-y-3" : "space-y-3"}>
          {hasBlocks || showLegacyOverview ? (
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A9B95]">Lesson content</p>
          ) : null}
          {renderMarkdown(mdBody)}
        </div>
      ) : null}

      {chapter.sections?.length ? (
        <div className="space-y-3 pt-3.5 border-t border-[#E7E0D3]">
          {chapter.sections.map((sec, sIdx) => (
            <div key={sIdx} className="p-3.5 sm:p-4 rounded-xl bg-[#FAF7F2] border border-[#E7E0D3] space-y-1.5">
              <h4 className="font-serif-display font-bold text-sm sm:text-base text-[#1C2A26] flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#D97706]" /> {sec.title}
              </h4>
              <div className="text-xs sm:text-[13px] text-[#52635E] leading-relaxed whitespace-pre-line font-sans">
                <MarkedText text={sec.body} highlights={highlights} />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </motion.div>
  );
}

/** Fallback if synthesis returned empty but legacy fields somehow exist without going through bridge. */
function LegacyInsightFields({
  chapter,
  highlights,
}: {
  chapter: ManualChapter;
  highlights: ChapterHighlight[];
}) {
  const why = chapter.why?.trim() || "";
  const when = chapter.when?.trim() || "";
  const showWhy = Boolean(why);
  const showWhen = Boolean(when);
  const hasPractical = Boolean(chapter.practical?.scenario?.trim() || chapter.practical?.app?.trim());
  const hasTradeoffs = Boolean(chapter.advantages?.length || chapter.limitations?.length);
  const hasComparisons = Boolean(chapter.comparisons?.length);
  const hasKeyDiffs = Boolean(chapter.keyDifferences?.length);
  const codeRefs = chapter.codeReferences?.filter((c) => c.code?.trim()) ?? [];
  const legacyCode = chapter.codeSnippet?.trim() || "";

  return (
    <>
      {showWhy || showWhen ? (
        <div className={`grid grid-cols-1 gap-3.5 ${showWhy && showWhen ? "md:grid-cols-2" : ""}`}>
          {showWhy ? <WhyItMatters content={why} highlights={highlights} /> : null}
          {showWhen ? <WhenToUseIt content={when} highlights={highlights} /> : null}
        </div>
      ) : null}
      {hasPractical && chapter.practical ? (
        <PracticalExampleBox practical={chapter.practical} highlights={highlights} />
      ) : null}
      {hasComparisons ? (
        <ComparisonTable
          rows={chapter.comparisons!}
          highlights={highlights}
          leverHeader={chapter.comparisonHeaders?.lever || "Cypress lever"}
          equivalentHeader={chapter.comparisonHeaders?.equivalent || "Playwright equivalent"}
        />
      ) : null}
      {hasKeyDiffs
        ? chapter.keyDifferences!.map((kd, i) => (
            <KeyDifferenceCallout key={i} content={kd} highlights={highlights} />
          ))
        : null}
      {hasTradeoffs ? (
        <AdvantagesLimitations
          advantages={chapter.advantages}
          limitations={chapter.limitations}
          highlights={highlights}
        />
      ) : null}
      {codeRefs.map((item, i) => (
        <CodeReferenceBox key={`cref-${i}`} item={item} highlights={highlights} />
      ))}
      {legacyCode && !codeRefs.length ? (
        <CodeReferenceBox item={{ label: "Code example", code: legacyCode }} highlights={highlights} />
      ) : null}
    </>
  );
}
