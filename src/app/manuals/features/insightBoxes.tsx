"use client";

import type { ReactNode } from "react";
import { AlertTriangle, Code, GitCompare } from "lucide-react";
import type { ChapterHighlight } from "@/app/manuals/features/highlights";
import { MarkedText } from "@/app/manuals/features/highlights";
import type {
  CodeReference as CodeReferenceData,
  ComparisonRow,
  PracticalExample,
} from "@/app/manuals/types";
import { COLUMN_TONES, resolvePracticalColumns } from "@/app/manuals/features/blocks/types";

/** Shared card chrome — keep visual language identical across insight types. */
function InsightShell({
  children,
  className = "border-[#E7E0D3] bg-[#FAF7F2]",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-4 sm:p-5 rounded-xl border space-y-2 shadow-2xs ${className}`}>{children}</div>
  );
}

function InsightLabel({
  colorClass,
  dotClass,
  children,
}: {
  colorClass: string;
  dotClass: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider ${colorClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      <span>{children}</span>
    </div>
  );
}

export function WhyItMatters({
  content,
  highlights,
  heading,
  accent,
  fontClassName,
}: {
  content: string;
  highlights: ChapterHighlight[];
  heading?: string;
  accent?: { text: string; dot: string };
  fontClassName?: string;
}) {
  return (
    <InsightShell>
      <InsightLabel colorClass={accent?.text || "text-[#D97706]"} dotClass={accent?.dot || "bg-[#D97706]"}>
        {heading || "Why it matters"}
      </InsightLabel>
      <p className={`text-xs sm:text-[13px] text-[#52635E] leading-relaxed ${fontClassName || ""}`}>
        <MarkedText text={content} highlights={highlights} />
      </p>
    </InsightShell>
  );
}

export function WhenToUseIt({
  content,
  highlights,
  heading,
  accent,
  fontClassName,
}: {
  content: string;
  highlights: ChapterHighlight[];
  heading?: string;
  accent?: { text: string; dot: string };
  fontClassName?: string;
}) {
  return (
    <InsightShell>
      <InsightLabel colorClass={accent?.text || "text-[#D97706]"} dotClass={accent?.dot || "bg-[#D97706]"}>
        {heading || "When to use it"}
      </InsightLabel>
      <p className={`text-xs sm:text-[13px] text-[#52635E] leading-relaxed ${fontClassName || ""}`}>
        <MarkedText text={content} highlights={highlights} />
      </p>
    </InsightShell>
  );
}

export function PracticalExampleBox({
  practical,
  highlights,
  heading,
  accentClass,
  fontClassName,
}: {
  practical: PracticalExample;
  highlights: ChapterHighlight[];
  heading?: string;
  accentClass?: { text: string; dot: string };
  fontClassName?: string;
}) {
  const hasApp = Boolean(practical.app?.trim());
  const hasScenario = Boolean(practical.scenario?.trim());
  const columns = resolvePracticalColumns(practical as import("@/app/manuals/features/blocks/types").PracticalExample);
  if (!hasApp && !hasScenario && !columns.some((c) => c.content.trim())) return null;

  const labelColor = accentClass?.text || "text-[#0062D2]";
  const dotColor = accentClass?.dot || "bg-[#0062D2]";

  return (
    <InsightShell className="border-[#D0E2FF] bg-[#F4F8FF] space-y-3">
      <div className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider ${labelColor}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
        <span>{heading || "Practical Example"}</span>
      </div>
      {hasApp || hasScenario ? (
        <p className={`text-xs sm:text-sm text-[#1C2A26] leading-relaxed ${fontClassName || ""}`}>
          {hasApp ? (
            <strong className="font-bold text-[#0F172A]">
              <MarkedText text={practical.app} highlights={highlights} />
            </strong>
          ) : null}
          {hasApp && hasScenario ? " — " : null}
          {hasScenario ? <MarkedText text={practical.scenario} highlights={highlights} /> : null}
        </p>
      ) : null}
      {columns.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {columns
            .filter((c) => c.content.trim() || c.label.trim())
            .map((col) => {
              const tone = COLUMN_TONES.find((t) => t.id === (col.tone || "neutral")) || COLUMN_TONES[4];
              return (
                <div
                  key={col.id}
                  className={`p-3.5 rounded-xl border border-t-2 bg-white space-y-1 shadow-2xs ${tone.border} ${tone.top}`}
                >
                  <span className={`block font-mono text-[10px] uppercase tracking-wider font-bold ${tone.text}`}>
                    {col.label || "Column"}
                  </span>
                  <p className={`text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed ${fontClassName || ""}`}>
                    <MarkedText text={col.content} highlights={highlights} />
                  </p>
                </div>
              );
            })}
        </div>
      ) : null}
    </InsightShell>
  );
}

export function AdvantagesLimitations({
  advantages,
  limitations,
  highlights,
}: {
  advantages?: string[];
  limitations?: string[];
  highlights: ChapterHighlight[];
}) {
  const showAdv = Boolean(advantages?.length);
  const showLim = Boolean(limitations?.length);
  if (!showAdv && !showLim) return null;

  return (
    <div className={`grid grid-cols-1 gap-3.5 ${showAdv && showLim ? "md:grid-cols-2" : ""}`}>
      {showAdv ? (
        <InsightShell>
          <InsightLabel colorClass="text-emerald-700" dotClass="bg-emerald-600">
            Advantages
          </InsightLabel>
          <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#52635E] pl-4 list-disc marker:text-emerald-600/70 leading-relaxed">
            {advantages!.map((adv, ai) => (
              <li key={ai}>
                <MarkedText text={adv} highlights={highlights} />
              </li>
            ))}
          </ul>
        </InsightShell>
      ) : null}
      {showLim ? (
        <InsightShell>
          <InsightLabel colorClass="text-rose-700" dotClass="bg-rose-600">
            Limitations
          </InsightLabel>
          <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#52635E] pl-4 list-disc marker:text-rose-600/70 leading-relaxed">
            {limitations!.map((lim, li) => (
              <li key={li}>
                <MarkedText text={lim} highlights={highlights} />
              </li>
            ))}
          </ul>
        </InsightShell>
      ) : null}
    </div>
  );
}

export function ComparisonTable({
  rows,
  highlights,
  leverHeader = "Lever",
  equivalentHeader = "Equivalent",
}: {
  rows: ComparisonRow[];
  highlights: ChapterHighlight[];
  leverHeader?: string;
  equivalentHeader?: string;
}) {
  if (!rows.length) return null;

  return (
    <InsightShell className="border-teal-200 bg-[#F0FDFA] space-y-3">
      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-teal-800">
        <GitCompare className="w-3.5 h-3.5" />
        <span>Comparison</span>
      </div>
      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-w-[28rem] text-left border-collapse">
          <thead>
            <tr className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-800/80">
              <th className="pb-2 pr-3 font-bold">{leverHeader}</th>
              <th className="pb-2 pr-3 font-bold">{equivalentHeader}</th>
              <th className="pb-2 font-bold">Verdict</th>
            </tr>
          </thead>
          <tbody className="text-xs sm:text-[13px] text-[#1C2A26]">
            {rows.map((row, i) => (
              <tr key={i} className="border-t border-teal-100 align-top">
                <td className="py-2.5 pr-3 leading-relaxed">
                  <MarkedText text={row.lever} highlights={highlights} />
                </td>
                <td className="py-2.5 pr-3 leading-relaxed text-[#52635E]">
                  <MarkedText text={row.equivalent} highlights={highlights} />
                </td>
                <td className="py-2.5 leading-relaxed">
                  <span className="inline-block rounded-md bg-white/80 border border-teal-200 px-2 py-0.5 text-[11px] font-medium text-teal-900">
                    <MarkedText text={row.verdict} highlights={highlights} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </InsightShell>
  );
}

export function KeyDifferenceCallout({
  content,
  highlights,
  heading,
}: {
  content: string;
  highlights: ChapterHighlight[];
  heading?: string;
}) {
  if (!content.trim()) return null;

  return (
    <InsightShell className="border-amber-300/80 bg-amber-50/80 space-y-2">
      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
        <AlertTriangle className="w-3.5 h-3.5" />
        <span>{heading || "Key difference"}</span>
      </div>
      <p className="text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed">
        <MarkedText text={content} highlights={highlights} />
      </p>
    </InsightShell>
  );
}

export function CodeReferenceBox({
  item,
  highlights,
}: {
  item: CodeReferenceData;
  highlights: ChapterHighlight[];
}) {
  if (!item.code?.trim()) return null;

  return (
    <div className="space-y-1.5">
      <span className="text-[10px] font-bold uppercase tracking-wider text-[#52635E] flex items-center gap-1.5 font-sans">
        <Code className="w-3 h-3 text-[#D97706]" />
        {item.label?.trim() || "Code example"}
      </span>
      <div className="p-3.5 sm:p-4 bg-[#1C2A26] text-[#A7F3D0] rounded-xl font-mono text-xs sm:text-[13px] overflow-x-auto leading-relaxed border border-[#2D3F3A] shadow-inner">
        <pre>{item.code}</pre>
      </div>
    </div>
  );
}
