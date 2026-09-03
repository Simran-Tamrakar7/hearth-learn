import type { ChapterRecord } from "../../../types";

/** 58. Social & Real-Time Communities */
export const chapter = {
  id: "pw-58-social",
  title: "58. Social & Real-Time Communities",
  minutes: 15,
  level: "beginner",
  phase: "Part 8 · Resources",
  partName: "Part 8 · Resources",
  overviewText: "Playwright Discord, Stack Overflow, Reddit r/QualityAssurance, LinkedIn groups. How to ask good questions that get answered.",
  why: "Stuck on an obscure failure, community response time beats solo debugging. Giving back builds reputation.",
  when: "Join Discord after Part 2; ask questions with trace file and minimal reproduction.",
  practical: { app: "Debugging blocker", scenario: "iframe + shadow DOM issue not covered clearly in docs.", pass: "Post minimal repro, Playwright version, trace snippet to Discord #help.", fail: "Post 'my test doesn't work' with no code or error message." },
  tools: [],
  contentMarkdown: "## Social & Real-Time Communities\n\nOfficial and community Discord/Slack spaces are the fastest channel for troubleshooting a specific, immediate problem. For a genuinely stuck moment (an error message search engines don't surface a clear answer for), a real-time community channel is usually faster than waiting on a forum post reply — worth joining at least one active Playwright-focused community space specifically for this reason, distinct from newsletters/blogs which are better for passive learning than active troubleshooting.\n\nStack Overflow remains a strong resource for searchable, indexed Q&A, even as real-time chat communities have grown. Despite the rise of Discord/Slack-style communities, Stack Overflow's searchability (a well-phrased error message frequently surfaces an existing answered thread) still makes it a first stop for common, already-solved problems, reserving real-time community channels for genuinely novel or project-specific issues.\n\nFollowing the core Playwright team and prominent community contributors on social platforms surfaces announcements and practical tips faster than waiting for aggregated newsletter roundups. This is a lower-effort complement to Chapter 53's newsletters — worth doing in addition to, not instead of, a newsletter subscription, since social platforms tend to surface smaller practical tips (a lesser-known API method, a workaround for an edge case) that wouldn't necessarily warrant a full blog post or newsletter mention.",
  customSummary: "## Social & Real-Time Communities\n\nDiscord/Slack communities are fastest for live troubleshooting; Stack Overflow remains strong for searchable, already-solved problems.\nFollowing the core team/contributors on social platforms surfaces smaller tips faster than newsletters alone.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
