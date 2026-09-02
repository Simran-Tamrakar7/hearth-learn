import type { ChapterRecord } from "../../../types";

/** 55. Courses & Structured Learning Platforms */
export const chapter = {
  id: "pw-55-courses",
  title: "55. Courses & Structured Learning Platforms",
  minutes: 25,
  level: "beginner",
  phase: "Part 8 · Resources",
  partName: "Part 8 · Resources",
  overviewText: "Udemy, Coursera, LinkedIn Learning Playwright+Python courses. Official Microsoft Learn modules. Evaluate for project-based curriculum vs video-only passive watching.",
  why: "Structured courses provide deadlines and exercises — valuable if self-directed doc reading stalls.",
  when: "Consider alongside this manual if you learn better with video; skip if already building capstone project.",
  practical: { app: "Structured learning", scenario: "Stuck in tutorial loop — watching videos without writing tests.", pass: "Pick course with hands-on projects; code along every lesson.", fail: "Complete course certificates without building independent project." },
  advantages: ["Video demonstrates debugging workflow docs cannot show","Exercises provide external accountability and deadlines","Udemy sales make comprehensive courses affordable","Official Microsoft Learn integrates with certification paths","Instructor Q&A forums answer stuck points","Curriculum ordering saves 'what to learn next' decisions"],
  limitations: ["Courses lag Playwright release cadence","Python-specific courses fewer than JavaScript ones","Passive watching without coding yields false confidence","Certificate alone does not impress senior interviewers","Course project != portfolio-ready capstone","Instructor mistakes propagate to thousands of students"],
  tools: [],
  contentMarkdown: "## Courses & Structured Learning Platforms\n\nStructured courses are most valuable for filling specific, known gaps rather than as a primary learning path once you're past fundamentals. Given this manual's own depth, a full beginner-to-advanced course is likely to duplicate material already covered here — courses become more valuable when targeted at a specific gap (a deep-dive on CI/CD platforms generally, a Python-specific advanced course, a course on a testing discipline like accessibility auditing that intersects with but isn't the same as this manual's Chapter 29).\n\nGeneral platforms (Udemy, Coursera, Pluralsight, LinkedIn Learning, Test Automation University) host Playwright-specific and adjacent content worth searching directly. Test Automation University specifically (a free platform historically associated with the broader test-automation community) is worth checking directly for Playwright-Python-specific courses, given how narrowly this manual's own scope sits (Python + pytest-playwright) compared to the broader JS/TS-first Playwright content ecosystem.\n\nVendor/official learning paths, where they exist, are worth prioritizing for accuracy and currency over third-party content. Given how quickly Playwright's own API evolves, official or vendor-adjacent structured learning content is less likely to have gone stale on specific API details than a third-party course recorded a year or two prior — worth checking directly rather than assuming third-party content is current.",
  customSummary: "## Courses & Structured Learning Platforms\n\nMost valuable for filling specific gaps, not as a primary path once past fundamentals (this manual already covers that depth).\nCheck Test Automation University and general platforms directly for Python-specific Playwright content; prioritize official/vendor content for currency.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
