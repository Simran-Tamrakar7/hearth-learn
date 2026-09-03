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
}: {
  content: string;
  highlights: ChapterHighlight[];
}) {
  return (
    <InsightShell>
      <InsightLabel colorClass="text-[#D97706]" dotClass="bg-[#D97706]">
        Why it matters
      </InsightLabel>
      <p className="text-xs sm:text-[13px] text-[#52635E] leading-relaxed">
        <MarkedText text={content} highlights={highlights} />
      </p>
    </InsightShell>
  );
}

export function WhenToUseIt({
  content,
  highlights,
}: {
  content: string;
  highlights: ChapterHighlight[];
}) {
  return (
    <InsightShell>
      <InsightLabel colorClass="text-[#D97706]" dotClass="bg-[#D97706]">
        When to use it
      </InsightLabel>
      <p className="text-xs sm:text-[13px] text-[#52635E] leading-relaxed">
        <MarkedText text={content} highlights={highlights} />
      </p>
    </InsightShell>
  );
}

export function PracticalExampleBox({
  practical,
  highlights,
}: {
  practical: PracticalExample;
  highlights: ChapterHighlight[];
}) {
  const hasApp = Boolean(practical.app?.trim());
  const hasScenario = Boolean(practical.scenario?.trim());
  if (!hasApp && !hasScenario) return null;

  return (
    <InsightShell className="border-[#D0E2FF] bg-[#F4F8FF] space-y-3">
      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0062D2]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0062D2]" />
        <span>Practical Example</span>
      </div>
      <p className="text-xs sm:text-sm text-[#1C2A26] leading-relaxed">
        {hasApp ? (
          <strong className="font-bold text-[#0F172A]">
            <MarkedText text={practical.app} highlights={highlights} />
          </strong>
        ) : null}
        {hasApp && hasScenario ? " — " : null}
        {hasScenario ? <MarkedText text={practical.scenario} highlights={highlights} /> : null}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {practical.fail?.trim() ? (
          <div className="p-3.5 rounded-xl border border-rose-200 border-t-2 border-t-rose-500 bg-white space-y-1 shadow-2xs">
            <span className="block font-mono text-[10px] uppercase tracking-wider font-bold text-rose-700">
              {practical.failLabel || "Fail Condition"}
            </span>
            <p className="text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed">
              <MarkedText text={practical.fail} highlights={highlights} />
            </p>
          </div>
        ) : null}
        {practical.pass?.trim() ? (
          <div className="p-3.5 rounded-xl border border-emerald-200 border-t-2 border-t-emerald-500 bg-white space-y-1 shadow-2xs">
            <span className="block font-mono text-[10px] uppercase tracking-wider font-bold text-emerald-700">
              {practical.passLabel || "Pass Condition"}
            </span>
            <p className="text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed">
              <MarkedText text={practical.pass} highlights={highlights} />
            </p>
          </div>
        ) : null}
        {practical.value?.trim() ? (
          <div className="p-3.5 rounded-xl border border-sky-200 border-t-2 border-t-sky-500 bg-white space-y-1 shadow-2xs sm:col-span-2">
            <span className="block font-mono text-[10px] uppercase tracking-wider font-bold text-sky-700">
              Value delivered
            </span>
            <p className="text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed">
              <MarkedText text={practical.value} highlights={highlights} />
            </p>
          </div>
        ) : null}
      </div>
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
}: {
  content: string;
  highlights: ChapterHighlight[];
}) {
  if (!content.trim()) return null;

  return (
    <InsightShell className="border-amber-300/80 bg-amber-50/80 space-y-2">
      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
        <AlertTriangle className="w-3.5 h-3.5" />
        <span>Key difference</span>
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
