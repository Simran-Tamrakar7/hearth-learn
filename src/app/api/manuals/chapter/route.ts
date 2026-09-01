import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { KEPT_BUILTIN_SLUGS } from "@/app/manuals/registry";
import type { ChapterRecord } from "@/app/manuals/types";

const manualsRoot = path.join(process.cwd(), "src/app/manuals");

function chapterToTsSource(chapter: ChapterRecord): string {
  const json = JSON.stringify(chapter, null, 2);
  return `import type { ChapterRecord } from "../../../types";\n\n/** ${chapter.title} */\nexport const chapter = ${json} as ChapterRecord;\n`;
}

/** Write a single part-N/chapter-M.ts — never touches siblings or toc.ts */
export async function POST(req: Request) {
  let body: { slug?: string; sourceFile?: string; chapter?: ChapterRecord };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { slug, sourceFile, chapter } = body;
  if (!slug || !sourceFile || !chapter?.id) {
    return NextResponse.json({ error: "slug, sourceFile, and chapter.id required" }, { status: 400 });
  }
  if (!(KEPT_BUILTIN_SLUGS as readonly string[]).includes(slug)) {
    return NextResponse.json({ error: "Only builtin disk manuals can be saved here" }, { status: 403 });
  }
  if (!/^part-\d+\/chapter-\d+\.ts$/.test(sourceFile)) {
    return NextResponse.json({ error: "Invalid sourceFile path" }, { status: 400 });
  }

  const abs = path.join(manualsRoot, "types", slug, sourceFile);
  if (!abs.startsWith(path.join(manualsRoot, "types", slug) + path.sep)) {
    return NextResponse.json({ error: "Path escape blocked" }, { status: 400 });
  }

  await fs.writeFile(abs, chapterToTsSource(chapter), "utf8");
  return NextResponse.json({ ok: true, path: sourceFile });
}
