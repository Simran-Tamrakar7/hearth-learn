import type { ChapterRecord } from "../../../types";

/** 10.1 Key Metrics — Response Time, Throughput, Error Rate, Percentiles */
export const chapter = {
  "id": "jm-10-1-key-metrics-response-time-throughput-error-rate-",
  "title": "10.1 Key Metrics — Response Time, Throughput, Error Rate, Percentiles",
  "minutes": 28,
  "level": "advanced",
  "phase": "Part 10 · Results Analysis & Reporting",
  "partName": "Part 10 · Results Analysis & Reporting",
  "overviewText": "Raw samples are not an answer. Report response-time distribution (not one number), throughput with response-time context, error rate only as trustworthy as assertions, and 90/95/99th percentiles because averages hide the unhappy slice. A 340ms average next to a 2100ms 99th is the story.",
  "why": "Stakeholders remember the average. Performance work is percentile work. Error % without JSON assertions is a false 0%.",
  "when": "Reading Aggregate Report, writing a client readout, or setting CI gates (Part 11).",
  "practical": {
    "app": "Submit Leave Request aggregate row",
    "scenario": "5000 samples, avg 340ms, 99th 2100ms, 0.4% errors, 42.3/sec.",
    "pass": "You lead with the 6× average-vs-99th gap and error %, not '340ms is fine.'",
    "fail": "You report only the average and throughput."
  },
  "tools": [],
  "customSummary": "- Response Time: meaningful only as a distribution, not a single figure; distinct from stricter \"latency\" (time to first byte).\n- Throughput: requests/sec — can mask degrading response times if thread count compensates; steady throughput at target pacing is a healthy sign, not a warning.\n- Error Rate: clearest signal of approaching breaking point under stress testing — only as trustworthy as the assertions defining \"failure.\"\n- Percentiles (90/95/99th): correct the \"averages hide outliers\" problem — a large average-vs-99th-percentile gap reveals a meaningful slice of bad user experiences an average alone conceals.",
  "contentMarkdown": "## Response time as a distribution\n\nEvery load test ultimately produces a large volume of raw sample data — but raw data alone isn't an answer, and this chapter covers the specific metrics that actually let you interpret what happened and communicate it meaningfully, whether to yourself, your team, or a client like Vatsalya reviewing a system's readiness.\n\nResponse Time is the most intuitive metric — how long a single request took, from the moment JMeter sent it to the moment the full response arrived. But a single response time number is close to meaningless on its own; what matters is the distribution of response times across all your samples, which is why this metric almost always gets reported alongside percentiles (covered below) rather than as one raw figure. It's also worth distinguishing response time from latency in the stricter technical sense (time to first byte, versus total time to receive the full response) — JMeter's default \"response time\" measurement is closer to the full round-trip, though some listeners and configurations let you separate \"connect time\" from total time, useful if you specifically suspect network/connection-establishment issues rather than server processing time as your bottleneck.\n\n## Throughput\n\nThroughput measures the rate of completed requests — typically expressed as requests per second (or per minute), and it's the metric most directly tied to the pacing discussion from Part 8 Chapter 3. Throughput and response time have an important, sometimes counterintuitive relationship: throughput can look fine (a healthy requests/second number) even while individual response times are creeping up, if your thread count is high enough to compensate — meaning throughput alone, without response time context, can mask real degradation. Conversely, a dip in throughput isn't automatically bad news; if you're running a paced load test (Constant Throughput Timer, Part 8) and throughput is holding steady at your configured target while response times stay flat, that's actually the expected, healthy outcome, not a warning sign.\n\n## Error rate\n\nError Rate is exactly what it sounds like — the percentage of samples that failed, based on whatever pass/fail criteria your assertions defined (Part 4). A rising error rate under increasing load is often the clearest, most unambiguous signal of a system approaching its breaking point (directly relevant to stress testing, Part 8 Chapter 1) — but it's worth remembering the Part 2 lesson that a \"pass\" without a real assertion checking response content can hide functional failures even while technically reporting 0% errors, so error rate is only as trustworthy as the assertions underlying it.\n\n## Percentiles — why averages lie\n\nPercentiles are the metric most worth dwelling on, because they correct the single biggest misunderstanding beginners bring to performance testing: that averages tell you enough. They don't. If 95 requests out of 100 return in a snappy 200ms but 5 take 8 full seconds, the average sits around 590ms — technically accurate, but it actively conceals the fact that a meaningful chunk of real users had a genuinely bad experience. This is precisely why performance testing conventionally reports 90th, 95th, and 99th percentiles instead of (or alongside) averages: the 95th percentile figure means \"95% of requests were at least this fast\" — equivalently, \"5% of your users experienced this response time or worse.\" A system with a great average but a terrible 99th percentile is one where most users are happy but a real, non-trivial slice are having a bad time — exactly the kind of nuance an average alone destroys.\n\n```\nExample Aggregate Report row:\n  Label: Submit Leave Request\n  Samples: 5000\n  Average: 340ms\n  90th pct: 610ms\n  95th pct: 890ms\n  99th pct: 2100ms\n  Error %: 0.4%\n  Throughput: 42.3/sec\n```\n\nReading a row like this properly means noticing the gap between average (340ms) and 99th percentile (2100ms) — a 6× spread — as the real story, not just glancing at the average and calling it \"fast.\" This distribution-first mindset, established here, is exactly what makes Aggregate Report (Part 1 Chapter 4) the listener you'll return to constantly, and it's the foundation for reading the HTML dashboard report covered next.",
  "blocks": [
    {
      "id": "jm-10-1-md-0",
      "type": "overview",
      "heading": "Response time as a distribution",
      "content": "Every load test ultimately produces a large volume of raw sample data — but raw data alone isn't an answer, and this chapter covers the specific metrics that actually let you interpret what happened and communicate it meaningfully, whether to yourself, your team, or a client like Vatsalya reviewing a system's readiness.\n\nResponse Time is the most intuitive metric — how long a single request took, from the moment JMeter sent it to the moment the full response arrived. But a single response time number is close to meaningless on its own; what matters is the distribution of response times across all your samples, which is why this metric almost always gets reported alongside percentiles (covered below) rather than as one raw figure. It's also worth distinguishing response time from latency in the stricter technical sense (time to first byte, versus total time to receive the full response) — JMeter's default \"response time\" measurement is closer to the full round-trip, though some listeners and configurations let you separate \"connect time\" from total time, useful if you specifically suspect network/connection-establishment issues rather than server processing time as your bottleneck.",
      "order": 0
    },
    {
      "id": "jm-10-1-md-1",
      "type": "overview",
      "heading": "Throughput",
      "content": "Throughput measures the rate of completed requests — typically expressed as requests per second (or per minute), and it's the metric most directly tied to the pacing discussion from Part 8 Chapter 3. Throughput and response time have an important, sometimes counterintuitive relationship: throughput can look fine (a healthy requests/second number) even while individual response times are creeping up, if your thread count is high enough to compensate — meaning throughput alone, without response time context, can mask real degradation. Conversely, a dip in throughput isn't automatically bad news; if you're running a paced load test (Constant Throughput Timer, Part 8) and throughput is holding steady at your configured target while response times stay flat, that's actually the expected, healthy outcome, not a warning sign.",
      "order": 1
    },
    {
      "id": "jm-10-1-md-2",
      "type": "overview",
      "heading": "Error rate",
      "content": "Error Rate is exactly what it sounds like — the percentage of samples that failed, based on whatever pass/fail criteria your assertions defined (Part 4). A rising error rate under increasing load is often the clearest, most unambiguous signal of a system approaching its breaking point (directly relevant to stress testing, Part 8 Chapter 1) — but it's worth remembering the Part 2 lesson that a \"pass\" without a real assertion checking response content can hide functional failures even while technically reporting 0% errors, so error rate is only as trustworthy as the assertions underlying it.",
      "order": 2
    },
    {
      "id": "jm-10-1-md-3",
      "type": "overview",
      "heading": "Percentiles — why averages lie",
      "content": "Percentiles are the metric most worth dwelling on, because they correct the single biggest misunderstanding beginners bring to performance testing: that averages tell you enough. They don't. If 95 requests out of 100 return in a snappy 200ms but 5 take 8 full seconds, the average sits around 590ms — technically accurate, but it actively conceals the fact that a meaningful chunk of real users had a genuinely bad experience. This is precisely why performance testing conventionally reports 90th, 95th, and 99th percentiles instead of (or alongside) averages: the 95th percentile figure means \"95% of requests were at least this fast\" — equivalently, \"5% of your users experienced this response time or worse.\" A system with a great average but a terrible 99th percentile is one where most users are happy but a real, non-trivial slice are having a bad time — exactly the kind of nuance an average alone destroys.\n\n```\nExample Aggregate Report row:\n  Label: Submit Leave Request\n  Samples: 5000\n  Average: 340ms\n  90th pct: 610ms\n  95th pct: 890ms\n  99th pct: 2100ms\n  Error %: 0.4%\n  Throughput: 42.3/sec\n```\n\nReading a row like this properly means noticing the gap between average (340ms) and 99th percentile (2100ms) — a 6× spread — as the real story, not just glancing at the average and calling it \"fast.\" This distribution-first mindset, established here, is exactly what makes Aggregate Report (Part 1 Chapter 4) the listener you'll return to constantly, and it's the foundation for reading the HTML dashboard report covered next.",
      "order": 3
    }
  ],
  "advantages": [
    "10.1 Key Metrics — Response Time, Throughput, Error Rate, Percentiles — Stakeholders remember the average."
  ],
  "limitations": [
    "10.1 Key Metrics — Response Time, Throughput, Error Rate, Percentiles is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
