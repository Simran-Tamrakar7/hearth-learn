import type { ChapterRecord } from "../../../types";

/** 57. Conferences & Talks */
export const chapter = {
  id: "pw-57-conferences",
  title: "57. Conferences & Talks",
  minutes: 20,
  level: "beginner",
  phase: "Part 8 · Resources",
  partName: "Part 8 · Resources",
  overviewText: "SeleniumConf, Ministry of Testing events, Playwright meetups, and recorded talks on YouTube. Part 6-level content often appears first at conferences.",
  why: "Conference talks preview where the industry is heading. Recorded sessions are free archives of senior practitioners' best material.",
  when: "Browse recordings when tackling Part 6 topics; attend live for networking during job search.",
  practical: { app: "Professional networking", scenario: "Want to meet hiring managers at companies using Playwright.", pass: "Attend local meetup; watch Playwright team talks from recent conferences on YouTube.", fail: "Pay conference fee expecting beginner syntax tutorials only." },
  advantages: ["Recorded talks free on YouTube indefinitely","Playwright team presentations announce roadmap direction","Networking at live events surfaces unposted job openings","Advanced topics (sharding, framework design) appear in talks first","Community events lower barrier than international conferences","Q&A sessions address problems docs do not cover"],
  limitations: ["Conference tickets expensive for individual contributors","Talks optimized for inspiration not step-by-step learning","Recorded sessions may demo deprecated APIs","Virtual attendance reduces networking value","Travel and time cost for in-person events","Beginner content rare at practitioner-focused conferences"],
  tools: [],
  contentMarkdown: "## Conferences & Talks\n\nDedicated testing/QA conferences (e.g., TestBash-style events, Selenium/Playwright-adjacent conferences) are a strong source of both technical talks and networking. These events typically include framework-architecture talks, case studies from companies running large suites, and hands-on workshops — directly relevant to Part 6-level material — and recorded talks from past years are usually available afterward even without attending live, which is a low-cost way to access the content.\n\nMicrosoft's own developer conference ecosystem occasionally features Playwright content, given Microsoft's ownership of the project. Worth checking Microsoft's broader developer-conference content (and the Playwright team's own conference talks/YouTube presence specifically) as a source, since talks from the actual maintaining team tend to explain design rationale with an authority and depth other sources can't match.\n\nConference talks are especially valuable for architecture-level and future-direction content that written docs lag behind on. A talk given at a conference often previews thinking or upcoming direction before it's fully reflected in written documentation — useful specifically for staying ahead on things like the Playwright MCP direction flagged in Chapter 50, where the written ecosystem is still catching up to the pace of development.",
  customSummary: "## Conferences & Talks\n\nTesting conferences (TestBash-style, Selenium/Playwright-adjacent) offer architecture talks and case studies relevant to Part 6; recordings are usually available after the fact.\nMicrosoft's own developer-conference content and the Playwright team's own talks carry unique design-rationale authority.\nTalks often preview direction (e.g. Playwright MCP) ahead of written docs.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
