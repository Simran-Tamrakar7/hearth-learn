---
id: "tt-performance-testing"
title: "Performance Testing"
minutes: 25
partName: "Part 4 · Non-Functional"
level: "intermediate"
---

Performance testing measures how fast and efficiently an application responds under normal conditions — page load time, server response time, time to first byte, rendering speed — establishing whether the software is fast enough for real users, independent of whether its features are functionally correct.

## Web Vitals & Performance Benchmarking

Benchmark Time to First Byte (TTFB), Largest Contentful Paint (LCP), and Interaction to Next Paint (INP).

```
npx lighthouse-ci collect --url=https://staging.hrms-app.com
```