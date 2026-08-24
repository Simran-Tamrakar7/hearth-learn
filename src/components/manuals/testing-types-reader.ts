import type { ManualChapter } from "@/lib/manualsData";
import { TESTING_TYPES_CHAPTERS } from "@/components/manuals/TestingTypesInteractiveManual";

/** Map chapter number → TOC part label when pathwise metadata is missing. */
export function testingTypesPartFromNo(n: number): string {
  if (n <= 4) return "Part 1 · By Level";
  if (n <= 6) return "Part 2 · Execution Method";
  if (n <= 8) return "Part 2 · Functional";
  if (n <= 12) return "Part 3 · Functional";
  if (n <= 16) return "Part 4 · Non-Functional";
  if (n <= 20) return "Part 5 · Non-Functional";
  if (n <= 24) return "Part 6 · Other Testing Types";
  if (n <= 28) return "Part 7 · By Knowledge";
  if (n <= 32) return "Part 8 · Release & Quality";
  if (n <= 36) return "Part 9 · Modern Engineering & Integrations";
  if (n <= 40) return "Part 10 · Device, Platform & Security";
  if (n <= 44) return "Part 11 · Operational, Infrastructure & Site Health";
  if (n <= 48) return "Part 12 · Code Quality, Techniques & Visual UI";
  if (n <= 52) return "Part 13 · Test Design Techniques & Partitioning";
  if (n <= 56) return "Part 14 · Advanced Resilience, Chaos & Contracts";
  if (n <= 60) return "Part 15 · Environment, Migration & Disaster Recovery";
  if (n <= 64) return "Part 16 · Governance, Deployment Strategies & Integration";
  if (n <= 68) return "Part 17 · Data-Driven, Keyword, Model & Risk";
  if (n <= 72) return "Part 18 · Backend, Network, Snapshot & Soak";
  if (n <= 76) return "Part 19 · Continuous, Interop, Conformance & Globalization";
  if (n <= 80) return "Part 20 · Baseline, Comparative, Domain & Error Guessing";
  if (n <= 84) return "Part 21 · Coverage, OAT, Cloud & Golden Master";
  if (n <= 88) return "Part 22 · Content, Session, OO & PWA";
  return "Part 23 · Incremental Integration, Spike, Session & Voice";
}

/** TOC + body always follow TESTING_TYPES_CHAPTERS — never a shorter localStorage snapshot. */
export function readerChaptersFromOverlay(pathwise: ManualChapter[]): ManualChapter[] {
  if (!TESTING_TYPES_CHAPTERS.length) return pathwise;
  return TESTING_TYPES_CHAPTERS.map((tt, i) => {
    const pw = pathwise[i];
    const no = Number(tt.no) || i + 1;
    if (pw) {
      return {
        ...pw,
        title: tt.title,
        overviewText: tt.desc || pw.overviewText,
        why: tt.why ?? pw.why,
        when: tt.when ?? pw.when,
        practical: tt.practical ?? pw.practical,
        tools: tt.tools ?? pw.tools,
        subtitle: pw.subtitle || testingTypesPartFromNo(no),
      };
    }
    return {
      id: `tt-ch-${tt.no}`,
      order: i + 1,
      slug: `ch-${tt.no}`,
      title: tt.title,
      estimatedMinutes: 25,
      subtitle: testingTypesPartFromNo(no),
      overviewText: tt.desc,
      why: tt.why,
      when: tt.when,
      practical: tt.practical,
      tools: tt.tools,
      contentMarkdown: tt.desc,
      exercises: [],
      resourceLinks: [],
    };
  });
}
