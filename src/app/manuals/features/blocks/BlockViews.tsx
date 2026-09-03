"use client";

import type { ReactNode } from "react";
import {
  AlertTriangle,
  BookOpen,
  CheckSquare,
  CircleDot,
  ExternalLink,
  GitBranch,
  GitCompare,
  Image as ImageIcon,
  Info,
  Link2,
  List,
  ListOrdered,
  Lock,
  Quote,
  Sparkles,
  Table2,
  Video,
} from "lucide-react";
import type { ChapterHighlight } from "@/app/manuals/features/highlights";
import { MarkedText } from "@/app/manuals/features/highlights";
import {
  AdvantagesLimitations,
  CodeReferenceBox,
  ComparisonTable,
  KeyDifferenceCallout,
  PracticalExampleBox,
  WhenToUseIt,
  WhyItMatters,
} from "@/app/manuals/features/insightBoxes";
import type { ChapterBlock, TreeNode } from "@/app/manuals/features/blocks/types";

function Shell({
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

function Label({
  colorClass,
  icon,
  children,
}: {
  colorClass: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider ${colorClass}`}>
      {icon}
      <span>{children}</span>
    </div>
  );
}

function TreeBranch({ nodes, depth = 0 }: { nodes: TreeNode[]; depth?: number }) {
  return (
    <ul className={`space-y-1 ${depth ? "ml-3 border-l border-[#D4C8B8] pl-3" : ""}`}>
      {nodes.map((n, i) => (
        <li key={i} className="text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed">
          <span className="font-medium">{n.label}</span>
          {n.children?.length ? <TreeBranch nodes={n.children} depth={depth + 1} /> : null}
        </li>
      ))}
    </ul>
  );
}

function videoEmbedSrc(url: string): string | null {
  const u = url.trim();
  if (!u) return null;
  const yt = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  if (/\.(mp4|webm)(\?|$)/i.test(u)) return u;
  return u;
}

export function ChapterBlockView({
  block,
  highlights,
}: {
  block: ChapterBlock;
  highlights: ChapterHighlight[];
}) {
  switch (block.type) {
    case "overview":
      if (!block.content.trim()) return null;
      return (
        <p className="text-xs sm:text-sm text-[#52635E] leading-relaxed font-sans">
          <MarkedText text={block.content} highlights={highlights} />
        </p>
      );
    case "why":
      return block.content.trim() ? <WhyItMatters content={block.content} highlights={highlights} /> : null;
    case "when":
      return block.content.trim() ? <WhenToUseIt content={block.content} highlights={highlights} /> : null;
    case "practical":
      return <PracticalExampleBox practical={block.practical} highlights={highlights} />;
    case "tradeoffs":
      return (
        <AdvantagesLimitations
          advantages={block.advantages}
          limitations={block.limitations}
          highlights={highlights}
        />
      );
    case "comparison":
      return (
        <ComparisonTable
          rows={block.rows}
          highlights={highlights}
          leverHeader={block.headers?.lever || "Lever"}
          equivalentHeader={block.headers?.equivalent || "Equivalent"}
        />
      );
    case "keyDifference":
      return block.content.trim() ? (
        <KeyDifferenceCallout content={block.content} highlights={highlights} />
      ) : null;
    case "code":
      return <CodeReferenceBox item={{ label: block.label, code: block.code }} highlights={highlights} />;
    case "tip":
      if (!block.content.trim()) return null;
      return (
        <Shell className="border-sky-200 bg-sky-50/80 space-y-2">
          <Label colorClass="text-sky-800" icon={<Sparkles className="w-3.5 h-3.5" />}>
            {block.title?.trim() || "Tip"}
          </Label>
          <p className="text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed">
            <MarkedText text={block.content} highlights={highlights} />
          </p>
        </Shell>
      );
    case "warning":
      if (!block.content.trim()) return null;
      return (
        <Shell className="border-rose-200 bg-rose-50/70 space-y-2">
          <Label colorClass="text-rose-800" icon={<AlertTriangle className="w-3.5 h-3.5" />}>
            {block.title?.trim() || "Warning"}
          </Label>
          <p className="text-xs sm:text-[13px] text-[#1C2A26] leading-relaxed">
            <MarkedText text={block.content} highlights={highlights} />
          </p>
        </Shell>
      );
    case "steps":
      if (!block.items.some((i) => i.trim())) return null;
      return (
        <Shell>
          <Label colorClass="text-[#0F766E]" icon={<ListOrdered className="w-3.5 h-3.5" />}>
            {block.title?.trim() || "Steps"}
          </Label>
          <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-[13px] text-[#52635E] leading-relaxed">
            {block.items.filter((i) => i.trim()).map((item, i) => (
              <li key={i}>
                <MarkedText text={item} highlights={highlights} />
              </li>
            ))}
          </ol>
        </Shell>
      );
    case "definition":
      if (!block.term.trim() && !block.definition.trim()) return null;
      return (
        <Shell className="border-[#E7E0D3] bg-white space-y-2">
          <Label colorClass="text-[#52635E]" icon={<BookOpen className="w-3.5 h-3.5" />}>
            Definition
          </Label>
          <p className="text-sm font-serif-display font-bold text-[#1C2A26]">
            <MarkedText text={block.term} highlights={highlights} />
          </p>
          <p className="text-xs sm:text-[13px] text-[#52635E] leading-relaxed">
            <MarkedText text={block.definition} highlights={highlights} />
          </p>
        </Shell>
      );
    case "checklist":
      if (!block.items.some((i) => i.trim())) return null;
      return (
        <Shell>
          <Label colorClass="text-emerald-800" icon={<CheckSquare className="w-3.5 h-3.5" />}>
            {block.title?.trim() || "Checklist"}
          </Label>
          <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#52635E]">
            {block.items.filter((i) => i.trim()).map((item, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span className="mt-0.5 w-3.5 h-3.5 rounded border border-emerald-500/50 shrink-0" />
                <MarkedText text={item} highlights={highlights} />
              </li>
            ))}
          </ul>
        </Shell>
      );
    case "resources":
      if (!block.items.some((r) => r.title.trim() || r.url.trim())) return null;
      return (
        <Shell>
          <Label colorClass="text-[#52635E]" icon={<Link2 className="w-3.5 h-3.5" />}>
            Resources
          </Label>
          <ul className="space-y-2">
            {block.items
              .filter((r) => r.title.trim() || r.url.trim())
              .map((r, i) => (
                <li key={i} className="text-xs sm:text-[13px]">
                  {r.url ? (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-[#0F766E] hover:underline inline-flex items-center gap-1"
                    >
                      {r.title || r.url} <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="font-bold text-[#1C2A26]">{r.title}</span>
                  )}
                  {r.description ? (
                    <p className="text-[#52635E] mt-0.5 leading-relaxed">{r.description}</p>
                  ) : null}
                </li>
              ))}
          </ul>
        </Shell>
      );
    case "quote":
      if (!block.text.trim()) return null;
      return (
        <Shell className="border-[#E7E0D3] bg-white">
          <Label colorClass="text-[#8A9B95]" icon={<Quote className="w-3.5 h-3.5" />}>
            Quote
          </Label>
          <blockquote className="text-sm sm:text-base font-serif-display text-[#1C2A26] leading-relaxed italic border-l-2 border-[#D97706] pl-3">
            <MarkedText text={block.text} highlights={highlights} />
          </blockquote>
          {block.attribution?.trim() ? (
            <p className="text-[11px] text-[#8A9B95]">— {block.attribution}</p>
          ) : null}
        </Shell>
      );
    case "image":
      if (!block.src.trim()) return null;
      return (
        <figure className="space-y-2">
          <Label colorClass="text-[#52635E]" icon={<ImageIcon className="w-3.5 h-3.5" />}>
            {block.caption?.trim() || "Image"}
          </Label>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.alt || block.caption || ""}
            className="w-full max-h-[28rem] object-contain rounded-xl border border-[#E7E0D3] bg-[#FAF7F2]"
          />
          {block.caption?.trim() ? (
            <figcaption className="text-[11px] text-[#8A9B95] text-center">{block.caption}</figcaption>
          ) : null}
        </figure>
      );
    case "table":
      if (!block.headers.length && !block.rows.length) return null;
      return (
        <Shell className="space-y-3">
          <Label colorClass="text-[#52635E]" icon={<Table2 className="w-3.5 h-3.5" />}>
            {block.caption?.trim() || "Table"}
          </Label>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[16rem] text-left text-xs sm:text-[13px] border-collapse">
              <thead>
                <tr className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A9B95]">
                  {block.headers.map((h, i) => (
                    <th key={i} className="pb-2 pr-3 font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri} className="border-t border-[#E7E0D3] align-top">
                    {row.map((cell, ci) => (
                      <td key={ci} className="py-2 pr-3 text-[#1C2A26] leading-relaxed">
                        <MarkedText text={cell} highlights={highlights} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Shell>
      );
    case "video": {
      const src = videoEmbedSrc(block.url);
      if (!src) return null;
      const isFile = /\.(mp4|webm)(\?|$)/i.test(src);
      return (
        <div className="space-y-2">
          <Label colorClass="text-[#52635E]" icon={<Video className="w-3.5 h-3.5" />}>
            {block.caption?.trim() || "Video"}
          </Label>
          {isFile ? (
            <video src={src} controls className="w-full rounded-xl border border-[#E7E0D3] bg-black" />
          ) : (
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-[#E7E0D3] bg-black">
              <iframe title={block.caption || "Video"} src={src} className="w-full h-full" allowFullScreen />
            </div>
          )}
        </div>
      );
    }
    case "bullets":
      if (!block.items.some((i) => i.trim())) return null;
      return (
        <Shell>
          <Label colorClass="text-[#52635E]" icon={<List className="w-3.5 h-3.5" />}>
            {block.title?.trim() || "Bullets"}
          </Label>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-[13px] text-[#52635E] leading-relaxed marker:text-[#D97706]/70">
            {block.items.filter((i) => i.trim()).map((item, i) => (
              <li key={i}>
                <MarkedText text={item} highlights={highlights} />
              </li>
            ))}
          </ul>
        </Shell>
      );
    case "tree":
      if (!block.nodes.some((n) => n.label.trim())) return null;
      return (
        <Shell className="border-[#D4C8B8] bg-[#FAF7F2] space-y-3">
          <Label colorClass="text-[#78716C]" icon={<GitBranch className="w-3.5 h-3.5" />}>
            {block.title?.trim() || "Hierarchy"}
          </Label>
          <TreeBranch nodes={block.nodes.filter((n) => n.label.trim() || n.children?.length)} />
        </Shell>
      );
    case "featureMapping":
      if (!block.rows.some((r) => r.source.trim() || r.target.trim())) return null;
      return (
        <Shell className="border-teal-200 bg-[#F0FDFA] space-y-3">
          <Label colorClass="text-teal-800" icon={<GitCompare className="w-3.5 h-3.5" />}>
            {block.title?.trim() || "Feature mapping"}
          </Label>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[20rem] text-left text-xs sm:text-[13px] border-collapse">
              <thead>
                <tr className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-800/80">
                  <th className="pb-2 pr-3">{block.sourceHeader || "Source"}</th>
                  <th className="pb-2">{block.targetHeader || "Maps to"}</th>
                </tr>
              </thead>
              <tbody>
                {block.rows
                  .filter((r) => r.source.trim() || r.target.trim())
                  .map((r, i) => (
                    <tr key={i} className="border-t border-teal-100 align-top">
                      <td className="py-2 pr-3 text-[#1C2A26] leading-relaxed">
                        <MarkedText text={r.source} highlights={highlights} />
                      </td>
                      <td className="py-2 text-[#52635E] leading-relaxed">
                        <MarkedText text={r.target} highlights={highlights} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Shell>
      );
    case "gap":
      if (!block.content.trim()) return null;
      return (
        <Shell className="border-dashed border-[#C4B8A8] bg-transparent space-y-2">
          <Label colorClass="text-[#78716C]" icon={<CircleDot className="w-3.5 h-3.5" />}>
            Not available
          </Label>
          <p className="text-xs sm:text-[13px] text-[#52635E] leading-relaxed">
            <MarkedText text={block.content} highlights={highlights} />
          </p>
          {block.alternative?.trim() ? (
            <p className="text-[11px] text-[#8A9B95] leading-relaxed">
              <span className="font-bold uppercase tracking-wider">Closest alternative — </span>
              <MarkedText text={block.alternative} highlights={highlights} />
            </p>
          ) : null}
        </Shell>
      );
    case "curatedResources":
      if (!block.items.some((it) => it.name.trim())) return null;
      return (
        <Shell className="space-y-3">
          <Label colorClass="text-[#0F766E]" icon={<BookOpen className="w-3.5 h-3.5" />}>
            {block.category?.trim() || "Curated resources"}
          </Label>
          <ul className="space-y-3">
            {block.items
              .filter((it) => it.name.trim())
              .map((it, i) => (
                <li key={i} className="space-y-1">
                  <p className="text-sm font-bold text-[#1C2A26]">{it.name}</p>
                  {it.description?.trim() ? (
                    <p className="text-xs text-[#52635E] leading-relaxed">{it.description}</p>
                  ) : null}
                  <div className="flex flex-wrap gap-2">
                    {it.links
                      .filter((l) => l.url.trim())
                      .map((l, li) => (
                        <a
                          key={li}
                          href={l.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0F766E] hover:underline"
                        >
                          {l.label || l.url} <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                  </div>
                </li>
              ))}
          </ul>
        </Shell>
      );
    case "tier":
      if (!block.label.trim()) return null;
      return (
        <div
          className={`inline-flex flex-col gap-1 rounded-xl border px-3.5 py-2.5 text-xs sm:text-[13px] ${
            block.kind === "paid" || block.kind === "cloud"
              ? "border-amber-300 bg-amber-50 text-amber-950"
              : "border-emerald-200 bg-emerald-50 text-emerald-950"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 font-mono font-bold uppercase tracking-wider text-[10px]">
            {block.kind === "paid" || block.kind === "cloud" ? (
              <Lock className="w-3 h-3" />
            ) : (
              <Info className="w-3 h-3" />
            )}
            {block.label}
          </span>
          {block.detail?.trim() ? <span className="leading-relaxed opacity-90">{block.detail}</span> : null}
        </div>
      );
    default:
      return null;
  }
}
