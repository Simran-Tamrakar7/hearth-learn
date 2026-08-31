---
id: "tt-seo-site-health-testing"
title: "SEO / Site Health Testing"
minutes: 15
partName: "Part 11 · Operational, Infrastructure & Site Health"
level: "beginner"
---

SEO and site health testing checks how well an application's public-facing pages are structured for search engine crawling and indexing — proper metadata, valid sitemaps, crawlable links, mobile-friendliness, and the absence of broken links or crawl errors — verifying discoverability rather than functionality.

## Technical Crawlability & Metadata Audit

Verify public-facing HTML documents contain valid canonical links, schema markup, and zero 4xx errors.

```
screamingfrogseospider --crawl https://staging.hrms.internal --headless --output-folder ./reports
```