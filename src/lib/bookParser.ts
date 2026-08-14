// Book Parser Engine for Project Gutenberg & Standard Ebooks
// Parses raw public domain texts into chapters and paginated text blocks

export interface BookChapterData {
  chapterNumber: number;
  title: string;
  startPage: number;
  pagesCount: number;
  content: string;
}

export interface ParsedBook {
  id: string;
  title: string;
  author: string;
  source: "Project Gutenberg" | "Standard Ebooks" | "DOAJ Open Access" | "User Upload / PDF";
  format: "EPUB" | "PDF";
  coverUrl: string;
  description: string;
  category: "Classics & Fiction" | "Technical Handbooks" | "Open Access Journals" | "My Uploads";
  rating: number;
  downloadCount: string;
  chapters: BookChapterData[];
  flatPages: {
    globalPageNumber: number;
    chapterTitle: string;
    chapterNumber: number;
    text: string;
  }[];
}

// Helper to chunk long chapter prose into paginated pages (~1000-1400 chars per page)
export function paginateChapterProse(prose: string, pageSize: number = 1100): string[] {
  const paragraphs = prose.split(/\n\n+/);
  const pages: string[] = [];
  let currentPage = "";

  for (const para of paragraphs) {
    if ((currentPage + "\n\n" + para).length > pageSize && currentPage.trim() !== "") {
      pages.push(currentPage.trim());
      currentPage = para;
    } else {
      currentPage = currentPage ? currentPage + "\n\n" + para : para;
    }
  }

  if (currentPage.trim() !== "") {
    pages.push(currentPage.trim());
  }

  return pages.length > 0 ? pages : [prose];
}

// Parse raw Gutenberg plain text splitting on "CHAPTER I", "CHAPTER 1", etc.
export function parseGutenbergRawText(
  rawText: string,
  bookMetadata: {
    id: string;
    title: string;
    author: string;
    source: "Project Gutenberg" | "Standard Ebooks" | "DOAJ Open Access" | "User Upload / PDF";
    format: "EPUB" | "PDF";
    coverUrl: string;
    description: string;
    category: "Classics & Fiction" | "Technical Handbooks" | "Open Access Journals" | "My Uploads";
    rating: number;
    downloadCount: string;
  }
): ParsedBook {
  // Strip Gutenberg header and footer headers
  const startMarkerIdx = rawText.search(/\*\*\* START OF TH(IS|E) PROJECT GUTENBERG EBOOK/i);
  const endMarkerIdx = rawText.search(/\*\*\* END OF TH(IS|E) PROJECT GUTENBERG EBOOK/i);

  let cleanText = rawText;
  if (startMarkerIdx !== -1) {
    cleanText = cleanText.substring(cleanText.indexOf("\n", startMarkerIdx) + 1);
  }
  if (endMarkerIdx !== -1) {
    cleanText = cleanText.substring(0, endMarkerIdx);
  }

  // Regex pattern matching "CHAPTER I", "CHAPTER 1", "CHAPTER ONE", "LETTER I", etc.
  const chapterRegex = /(?:\r?\n){2,}(CHAPTER\s+[0-9IVXLCDM]+|CHAPTER\s+[A-Z]+|LETTER\s+[0-9IVXLCDM]+)[^\r\n]*/gi;

  const matches = Array.from(cleanText.matchAll(chapterRegex));
  const chapters: BookChapterData[] = [];
  const flatPages: ParsedBook["flatPages"] = [];

  let currentGlobalPage = 1;

  if (matches.length === 0) {
    // Single chapter fallback
    const pages = paginateChapterProse(cleanText);
    chapters.push({
      chapterNumber: 1,
      title: "Full Text",
      startPage: 1,
      pagesCount: pages.length,
      content: cleanText,
    });

    pages.forEach((pText) => {
      flatPages.push({
        globalPageNumber: currentGlobalPage++,
        chapterTitle: "Full Text",
        chapterNumber: 1,
        text: pText,
      });
    });
  } else {
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const title = match[0].trim();
      const startIdx = match.index! + match[0].length;
      const endIdx = i < matches.length - 1 ? matches[i + 1].index! : cleanText.length;
      const chapterBody = cleanText.substring(startIdx, endIdx).trim();

      const pages = paginateChapterProse(chapterBody);

      chapters.push({
        chapterNumber: i + 1,
        title: title,
        startPage: currentGlobalPage,
        pagesCount: pages.length,
        content: chapterBody,
      });

      pages.forEach((pText) => {
        flatPages.push({
          globalPageNumber: currentGlobalPage++,
          chapterTitle: title,
          chapterNumber: i + 1,
          text: pText,
        });
      });
    }
  }

  return {
    ...bookMetadata,
    chapters,
    flatPages,
  };
}
