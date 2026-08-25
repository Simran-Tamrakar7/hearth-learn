export const meta = {
  id: "interview",
  title: "STAR Interview Radar",
  description: "Pick a role, paste a STAR answer, get a scored breakdown.",
  icon: "mic",
};

export const interviewQuestion =
  "Tell me about a time you resolved a critical test automation suite flakiness or performance bottleneck.";

export const sampleAnswers: Record<string, string> = {
  "Senior QA Automation Engineer":
    "In my previous role, our nightly Playwright suite took 45 minutes with a 15% flakiness rate. I introduced storageState session reuse and mocked 3rd party endpoints via page.route, dropping runtime to 8 min and flakiness under 1%.",
  "Lead SDET Architect":
    "Our multi-repo team lacked standardized E2E testing. I architected a shared Playwright TypeScript framework with custom fixtures, automatic video artifact uploads, and parallel sharding on GitHub Actions, cutting developer feedback loops from 2 hours to 6 minutes.",
  "DevOps / Infrastructure Engineer":
    "During peak traffic, K8s pods hit memory limits due to unindexed DB queries. I implemented Redis caching, established autoscaling policies, and set up Prometheus alert triggers, maintaining 99.99% uptime through Cyber Monday.",
  "Engineering Manager":
    "Two senior developers disagreed on migrating from REST to GraphQL. I organized a 2-day proof-of-concept sprint to evaluate latency and developer ergonomics empirical data, reaching alignment on a hybrid gateway approach.",
};

export const interviewRoles = Object.keys(sampleAnswers);
