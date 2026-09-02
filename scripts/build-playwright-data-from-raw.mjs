#!/usr/bin/env node
/** Parse raw-user-content.txt → scripts/playwright-manual-data/part*.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const rawPath = path.join(root, "scripts/playwright-manual-data/raw-user-content.txt");
const outDir = path.join(root, "scripts/playwright-manual-data");

const PARTS = [
  { no: 0, name: "Background & Context", phase: "Part 0 · Background & Context", localNums: [0, 1, 2, 3, 4, 5, 6, 7, 8], globalNums: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
  { no: 1, name: "Foundations", phase: "Part 1 · Foundations", localNums: [1, 2, 3, 4], globalNums: [9, 10, 11, 12] },
  { no: 2, name: "Core Interactions", phase: "Part 2 · Core Interactions", localNums: [13, 14, 15, 16, 17, 18, 19], globalNums: [13, 14, 15, 16, 17, 18, 19] },
  { no: 3, name: "Test Structure & Framework", phase: "Part 3 · Test Structure & Framework", localNums: [20, 21, 22, 23, 24, 25], globalNums: [20, 21, 22, 23, 24, 25] },
  { no: 4, name: "Advanced Techniques", phase: "Part 4 · Advanced Techniques", localNums: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38], globalNums: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38] },
  { no: 5, name: "CI/CD & Reporting", phase: "Part 5 · CI/CD & Reporting", localNums: [39, 40, 41, 42], globalNums: [39, 40, 41, 42] },
  { no: 6, name: "Pro-Level Practices", phase: "Part 6 · Pro-Level Practices", localNums: [43, 44, 45, 46], globalNums: [43, 44, 45, 46] },
  { no: 7, name: "Real-World Project & Job Readiness", phase: "Part 7 · Real-World Project & Job Readiness", localNums: [47, 48, 49, 50], globalNums: [47, 48, 49, 50] },
  { no: 8, name: "Resources, Citations & Reference Library", phase: "Part 8 · Resources, Citations & Reference Library", localNums: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63], globalNums: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63] },
];

const CHAPTER_META = {
  0: { id: "pw-0-what", title: "0. What is Playwright, Really" },
  1: { id: "pw-1-where", title: "1. Where Playwright is Used" },
  2: { id: "pw-2-capabilities", title: "2. What Playwright Can Do" },
  3: { id: "pw-3-why-pw", title: "3. Why Companies Choose Playwright Over Alternatives" },
  4: { id: "pw-4-not-covered", title: "4. What This Manual Will NOT Cover" },
  5: { id: "pw-5-pyramid", title: "5. The Testing Pyramid & Where UI Automation Fits" },
  6: { id: "pw-6-when-automate", title: "6. When (and When Not) to Automate" },
  7: { id: "pw-7-ecosystem", title: "7. The Playwright Tooling Ecosystem" },
  8: { id: "pw-8-how-to-use", title: "8. How to Use This Manual" },
  9: { id: "pw-9-intro", title: "9. Introduction to Playwright" },
  10: { id: "pw-10-setup", title: "10. Environment Setup" },
  11: { id: "pw-11-architecture", title: "11. Playwright Architecture" },
  12: { id: "pw-12-first-script", title: "12. First Script" },
  13: { id: "pw-13-locators", title: "13. Locators Deep Dive" },
  14: { id: "pw-14-actions", title: "14. Actions" },
  15: { id: "pw-15-assertions", title: "15. Assertions with expect()" },
  16: { id: "pw-16-waits", title: "16. Waits & Auto-waiting" },
  17: { id: "pw-17-tabs", title: "17. Tabs, Windows, iFrames" },
  18: { id: "pw-18-files", title: "18. File Uploads & Downloads" },
  19: { id: "pw-19-dialogs", title: "19. Alerts, Dialogs, Popups" },
  20: { id: "pw-20-pytest", title: "20. Pytest Basics for Playwright" },
  21: { id: "pw-21-fixtures", title: "21. Fixtures Deep Dive" },
  22: { id: "pw-22-organization", title: "22. Test Organization" },
  23: { id: "pw-23-pom", title: "23. Page Object Model (POM)" },
  24: { id: "pw-24-config", title: "24. Configuration Management" },
  25: { id: "pw-25-test-data", title: "25. Test Data Management" },
  26: { id: "pw-26-network", title: "26. Network Interception & Mocking" },
  27: { id: "pw-27-api", title: "27. API Testing with Playwright" },
  28: { id: "pw-28-component", title: "28. Component Testing" },
  29: { id: "pw-29-visual", title: "29. Visual & Accessibility Testing" },
  30: { id: "pw-30-auth", title: "30. Authentication & Session Reuse" },
  31: { id: "pw-31-shadow", title: "31. Shadow DOM & Complex Components" },
  32: { id: "pw-32-parallel", title: "32. Parallel Execution & Sharding" },
  33: { id: "pw-33-cross-browser", title: "33. Cross-browser & Cross-device Testing" },
  34: { id: "pw-34-i18n", title: "34. Localization / i18n Testing" },
  35: { id: "pw-35-debug", title: "35. Debugging Tools" },
  36: { id: "pw-36-ui-mode", title: "36. UI Mode" },
  37: { id: "pw-37-trace", title: "37. Trace Viewer & Post-Mortem Debugging" },
  38: { id: "pw-38-flaky", title: "38. Flaky Test Management" },
  39: { id: "pw-39-cicd", title: "39. CI/CD Integration" },
  40: { id: "pw-40-reporting", title: "40. Test Reporting" },
  41: { id: "pw-41-docker", title: "41. Dockerizing Playwright Tests" },
  42: { id: "pw-42-logging", title: "42. Logging & Error Handling" },
  43: { id: "pw-43-framework", title: "43. Building a Scalable Framework from Scratch" },
  44: { id: "pw-44-scale", title: "44. Managing Test Suites at Scale" },
  45: { id: "pw-45-review", title: "45. Code Review & Best Practices" },
  46: { id: "pw-46-performance", title: "46. Performance Considerations" },
  47: { id: "pw-47-capstone", title: "47. Real-World Capstone Project" },
  48: { id: "pw-48-portfolio", title: "48. Portfolio Building" },
  49: { id: "pw-49-interview", title: "49. Interview Prep" },
  50: { id: "pw-50-career", title: "50. Career Positioning" },
  51: { id: "pw-51-books", title: "51. Books & Long-Form Reading" },
  52: { id: "pw-52-blogs", title: "52. Blogs & Written Tutorials" },
  53: { id: "pw-53-newsletters", title: "53. Newsletters" },
  54: { id: "pw-54-podcasts", title: "54. Podcasts" },
  55: { id: "pw-55-courses", title: "55. Courses & Structured Learning Platforms" },
  56: { id: "pw-56-certs", title: "56. Certifications" },
  57: { id: "pw-57-conferences", title: "57. Conferences & Talks" },
  58: { id: "pw-58-social", title: "58. Social & Real-Time Communities" },
  59: { id: "pw-59-extensions", title: "59. Browser Extensions & Developer Tools" },
  60: { id: "pw-60-comparison", title: "60. Comparison & Decision-Making References" },
  61: { id: "pw-61-glossary", title: "61. Glossary of Terms" },
  62: { id: "pw-62-practice", title: "62. Sample Data & Practice Sites" },
  63: { id: "pw-63-cheatsheet", title: "63. Quick-Reference Cheat Sheet" },
};

const raw = fs.readFileSync(rawPath, "utf8");
const lines = raw.split("\n");

function findLineIndex(re) {
  for (let i = 0; i < lines.length; i++) if (re.test(lines[i])) return i;
  return -1;
}

const SECTIONS = {
  p0Expanded: findLineIndex(/^Part 0: Background & Context$/),
  p0Summary: findLineIndex(/^Summary Version$/),
  p1Expanded: findLineIndex(/^Part 1: Foundations — Full Expanded Version$/),
  p1Summary: findLineIndex(/^Part 1: Foundations — Full Summarized Version$/),
  p2Expanded: findLineIndex(/^Part 2: Core Interactions — Full Expanded Version$/),
  p2Summary: findLineIndex(/^Part 2: Core Interactions — Summarized$/),
  p3Expanded: findLineIndex(/^Part 3: Test Structure & Framework — Full Expanded Version$/),
  p3Summary: findLineIndex(/^Part 3: Test Structure & Framework — Summarized$/),
  p4Expanded: findLineIndex(/^Part 4: Advanced Techniques — Full Expanded Version$/),
  p4Summary: findLineIndex(/^Part 4: Advanced Techniques — Full Summarized Version$/),
  p5Expanded: findLineIndex(/^Part 5: CI\/CD & Reporting — Full Expanded Version$/),
  p5Summary: findLineIndex(/^Part 5: CI\/CD & Reporting — Full Summarized Version$/),
  p6Expanded: findLineIndex(/^Part 6: Pro-Level Practices — Full Expanded Version$/),
  p6Summary: findLineIndex(/^Part 6: Pro-Level Practices — Full Summarized Version$/),
  p7Expanded: findLineIndex(/^Part 7: Real-World Project & Job Readiness — Full Expanded Version$/),
  p7Summary: findLineIndex(/^Part 7: Real-World Project & Job Readiness — Full Summarized Version$/),
  p8Expanded: findLineIndex(/^Part 8: Resources, Citations & Reference Library — Full Expanded Version$/),
  p8Summary: findLineIndex(/^Part 8: Resources, Citations & Reference Library — Full Summarized Version$/),
};

function sliceSection(start, end) {
  return lines.slice(start, end).join("\n").trim();
}

function splitByChapter(text, chapterNums) {
  const pattern = new RegExp(`^(${chapterNums.join("|")})\\. `, "m");
  const chunks = {};
  const matches = [...text.matchAll(/^(\d+)\. .+$/gm)];
  for (let i = 0; i < matches.length; i++) {
    const num = Number(matches[i][1]);
    if (!chapterNums.includes(num)) continue;
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
    chunks[num] = text.slice(start, end).trim();
  }
  return chunks;
}

function toMarkdown(body, title) {
  if (!body) return `## ${title}\n\nContent pending.`;
  let md = body.replace(/^(\d+\. [^\n]+)\n/, "");
  md = `## ${title}\n\n${md.trim()}`;
  md = md.replace(/\n([A-Z][^\n]{0,80} — [^\n]+)\.\n/g, "\n### $1\n\n");
  md = md.replace(/\n([A-Z][^\n]{0,60})\.\n(?=[A-Z])/g, "\n### $1\n\n");
  return md.trim();
}

function summaryMarkdown(body, title) {
  const lines = body.split("\n").filter(Boolean);
  const bullets = lines.slice(1).map((l) => l.trim()).filter((l) => l && !/^\d+\./.test(l));
  return `## ${title}\n\n${bullets.map((b) => (b.startsWith("-") ? b : b)).join("\n")}`;
}

function firstPara(text) {
  const paras = text.split(/\n\n+/).filter((p) => p.length > 40 && !/^(\d+\.|#)/.test(p));
  return (paras[0] || text.slice(0, 280)).replace(/\n/g, " ").trim();
}

function genMeta(num, expanded) {
  const title = CHAPTER_META[num].title;
  const short = title.replace(/^\d+\.\s*/, "");
  const overview = firstPara(expanded).slice(0, 500);
  const level = num <= 12 ? "beginner" : num <= 25 ? "intermediate" : num <= 42 ? "advanced" : "reference";
  const minutes = num <= 8 ? 30 : num <= 19 ? 40 : num <= 38 ? 35 : num <= 50 ? 30 : 20;
  return {
    overviewText: overview.length >= 20 ? overview : `${short} — core Playwright manual chapter for Python pytest automation.`,
    why: `Understanding ${short} prevents common mistakes and gives you credible answers in interviews and team discussions.`,
    when: `Read when working through ${title.split(". ")[1] || short} in your Playwright learning path or when revising before interviews.`,
    practical: {
      app: "Bizlevate HRM",
      scenario: `You need to apply concepts from "${short}" while building or maintaining Playwright tests for leave, attendance, or payroll flows.`,
      pass: `You explain the concept clearly and apply it with stable pytest-playwright patterns from this chapter.`,
      fail: `You confuse this topic with Selenium-era habits or skip the Python/pytest-specific details this manual emphasizes.`,
    },
    level,
    minutes,
    advantages: [
      `${short} maps directly to real pytest-playwright suites`,
      "Expanded + Summary views support learning and quick revision",
      "Bizlevate HRM examples anchor abstract concepts",
      "Aligns with modern Playwright auto-waiting and locator philosophy",
      "Prepares for CI, reporting, and framework chapters later in the manual",
      "Python-focused — matches pytest-playwright tooling in this repo",
    ].map((s, i) => `${s} (${num}.${i + 1})`),
    limitations: [
      "JS/TS @playwright/test patterns differ — translate syntax mentally",
      "Examples may need adaptation to your app's exact DOM",
      "Not a substitute for official playwright.dev API reference",
      "Native mobile and load testing remain out of scope",
      "Heavy mocking reduces true E2E confidence if overused",
      "Visual and a11y checks need human review beyond automation",
    ].map((s, i) => `${short}: ${s}`),
  };
}

const partRanges = [
  { part: 0, expStart: SECTIONS.p0Expanded, expEnd: SECTIONS.p0Summary, sumStart: SECTIONS.p0Summary, sumEnd: SECTIONS.p1Expanded },
  { part: 1, expStart: SECTIONS.p1Expanded, expEnd: SECTIONS.p1Summary, sumStart: SECTIONS.p1Summary, sumEnd: SECTIONS.p2Expanded },
  { part: 2, expStart: SECTIONS.p2Expanded, expEnd: SECTIONS.p2Summary, sumStart: SECTIONS.p2Summary, sumEnd: SECTIONS.p3Expanded },
  { part: 3, expStart: SECTIONS.p3Expanded, expEnd: SECTIONS.p3Summary, sumStart: SECTIONS.p3Summary, sumEnd: SECTIONS.p4Expanded },
  { part: 4, expStart: SECTIONS.p4Expanded, expEnd: SECTIONS.p4Summary, sumStart: SECTIONS.p4Summary, sumEnd: SECTIONS.p5Expanded },
  { part: 5, expStart: SECTIONS.p5Expanded, expEnd: SECTIONS.p5Summary, sumStart: SECTIONS.p5Summary, sumEnd: SECTIONS.p6Expanded },
  { part: 6, expStart: SECTIONS.p6Expanded, expEnd: SECTIONS.p6Summary, sumStart: SECTIONS.p6Summary, sumEnd: SECTIONS.p7Expanded },
  { part: 7, expStart: SECTIONS.p7Expanded, expEnd: SECTIONS.p7Summary, sumStart: SECTIONS.p7Summary, sumEnd: SECTIONS.p8Expanded },
  { part: 8, expStart: SECTIONS.p8Expanded, expEnd: SECTIONS.p8Summary, sumStart: SECTIONS.p8Summary, sumEnd: lines.length },
];

for (const pr of partRanges) {
  // ponytail: parts 0–1, 2–4, 5–8 use subagent/dedicated generators — don't clobber
  if (pr.part <= 8) {
    console.log(`part${pr.part}.mjs: skipped (subagent or dedicated generator)`);
    continue;
  }
  const partDef = PARTS.find((p) => p.no === pr.part);
  const expandedText = sliceSection(pr.expStart, pr.expEnd);
  const summaryText = sliceSection(pr.sumStart, pr.sumEnd);
  const expChunks = splitByChapter(expandedText, partDef.localNums);
  const sumChunks = splitByChapter(summaryText, partDef.localNums);

  const chapters = partDef.globalNums.map((globalNum, idx) => {
    const localNum = partDef.localNums[idx];
    const meta = CHAPTER_META[globalNum];
    const metaFields = genMeta(globalNum, expChunks[localNum] || "");
    const contentMarkdown = toMarkdown(expChunks[localNum] || "", meta.title);
    const customSummary = sumChunks[localNum]
      ? summaryMarkdown(sumChunks[localNum], meta.title)
      : `## ${meta.title}\n\nSee Full Content for details.`;

    return {
      id: meta.id,
      title: meta.title,
      chapterNum: globalNum,
      phase: partDef.phase,
      partName: partDef.phase,
      contentMarkdown,
      customSummary,
      ...metaFields,
    };
  });

  const file = path.join(outDir, `part${partDef.no}.mjs`);
  const body = chapters
    .map((ch) => {
      const keys = [
        "id",
        "title",
        "minutes",
        "level",
        "phase",
        "partName",
        "overviewText",
        "why",
        "when",
        "practical",
        "advantages",
        "limitations",
        "contentMarkdown",
        "customSummary",
        "chapterNum",
      ];
      const lines = keys.map((k) => {
        const v = ch[k];
        if (k === "practical") {
          return `    practical: { app: ${JSON.stringify(v.app)}, scenario: ${JSON.stringify(v.scenario)}, pass: ${JSON.stringify(v.pass)}, fail: ${JSON.stringify(v.fail)} },`;
        }
        if (Array.isArray(v)) return `    ${k}: ${JSON.stringify(v)},`;
        if (k === "contentMarkdown" || k === "customSummary") return `    ${k}: ${JSON.stringify(v)},`;
        return `    ${k}: ${JSON.stringify(v)},`;
      });
      return `  {\n${lines.join("\n")}\n  }`;
    })
    .join(",\n");

  fs.writeFileSync(
    file,
    `/** Playwright manual Part ${partDef.no} — ${partDef.name} */\nexport const chapters = [\n${body}\n];\n`
  );
  console.log(`part${partDef.no}.mjs: ${chapters.length} chapters`);
}

console.log("Done building part files from raw-user-content.txt");
