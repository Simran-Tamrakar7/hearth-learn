/* JMeter manual TOC — ordering only. Content lives in part-N/chapter-M.ts */

/** Bump when chapter catalog changes so stale browser localStorage is not restored. */
export const JMETER_TOC_VERSION = 2;

export type JmeterTocPart = {
  partNo: number;
  name: string;
  items: { title: string }[];
};

export const JMETER_TOC: JmeterTocPart[] = [
  {
    partNo: 0,
    name: "Orientation",
    items: [
      { title: "0.1 What JMeter Is and When to Use It" },
      { title: "0.2 Installing JMeter" },
      { title: "0.3 JMeter's Execution Model — Thread Groups, Samplers, Listeners, Controllers" },
    ],
  },
  {
    partNo: 1,
    name: "Core Building Blocks",
    items: [
      { title: "1.1 Test Plan Structure and Hierarchy" },
      { title: "1.2 Thread Groups (Users, Ramp-Up, Loop Count)" },
      { title: "1.3 Samplers (HTTP Request Being the Main One)" },
      { title: "1.4 Listeners (View Results Tree, Summary Report, Aggregate Report)" },
    ],
  },
  {
    partNo: 2,
    name: "Building Your First Test",
    items: [
      { title: "2.1 Recording a Test with the HTTP(S) Test Script Recorder" },
      { title: "2.2 Manually Building an HTTP Request" },
      { title: "2.3 Running and Reading Basic Results" },
    ],
  },
  {
    partNo: 3,
    name: "Configuration Elements",
    items: [
      { title: "3.1 HTTP Request Defaults" },
      { title: "3.2 HTTP Header Manager" },
      { title: "3.3 HTTP Cookie Manager" },
      { title: "3.4 CSV Data Set Config (Parameterization)" },
      { title: "3.5 User Defined Variables" },
    ],
  },
  {
    partNo: 4,
    name: "Controllers & Logic",
    items: [
      { title: "4.1 Logic Controllers (Loop, If, While, Runtime, Transaction)" },
      { title: "4.2 Timers (Constant, Uniform Random, Gaussian)" },
      { title: "4.3 Assertions (Response, Duration, Size, JSON)" },
    ],
  },
  {
    partNo: 5,
    name: "Correlation & Dynamic Data",
    items: [
      { title: "5.1 Extracting Values — Regular Expression, JSON, and XPath Extractors" },
      { title: "5.2 Passing Extracted Values Between Requests" },
      { title: "5.3 Handling Tokens and Session IDs (Login Flows)" },
    ],
  },
  {
    partNo: 6,
    name: "Scripting in JMeter",
    items: [
      { title: "6.1 BeanShell vs JSR223 (Groovy) — Why Groovy Is Preferred" },
      { title: "6.2 Pre-Processors and Post-Processors" },
      { title: "6.3 Custom Logic with JSR223 Sampler" },
    ],
  },
  {
    partNo: 7,
    name: "API & Protocol-Specific Testing",
    items: [
      { title: "7.1 REST API Testing (JSON Body, Headers, Auth)" },
      { title: "7.2 SOAP/XML Requests" },
      { title: "7.3 Testing with Authentication (Bearer Tokens, Basic Auth, OAuth)" },
    ],
  },
  {
    partNo: 8,
    name: "Load Testing Concepts",
    items: [
      { title: "8.1 Load vs Stress vs Spike vs Soak Testing" },
      { title: "8.2 Designing Realistic Load Profiles (Ramp-Up, Steady State, Ramp-Down)" },
      { title: "8.3 Think Time and Pacing" },
    ],
  },
  {
    partNo: 9,
    name: "Distributed Testing",
    items: [
      { title: "9.1 Master-Slave (Controller-Agent) Setup" },
      { title: "9.2 Running Tests from CLI (Non-GUI Mode)" },
      { title: "9.3 Why GUI Mode Is Bad for Actual Load Generation" },
    ],
  },
  {
    partNo: 10,
    name: "Results Analysis & Reporting",
    items: [
      { title: "10.1 Key Metrics — Response Time, Throughput, Error Rate, Percentiles" },
      { title: "10.2 Aggregate Report vs Summary Report Interpretation" },
      { title: "10.3 Generating HTML Dashboard Reports (CLI + -e -o)" },
    ],
  },
  {
    partNo: 11,
    name: "CI/CD Integration",
    items: [
      { title: "11.1 Running JMeter from Command Line in Pipelines" },
      { title: "11.2 Integrating with Jenkins and GitHub Actions" },
      { title: "11.3 Failing Builds on Performance Thresholds" },
    ],
  },
  {
    partNo: 12,
    name: "Appendices",
    items: [
      { title: "A. Common errors & troubleshooting" },
      { title: "B. JMeter vs other tools (k6, Gatling, Locust)" },
      { title: "C. Best practices & common mistakes" },
      { title: "D. Useful plugins" },
    ],
  },
];
