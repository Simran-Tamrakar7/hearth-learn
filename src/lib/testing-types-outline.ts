/** 15-chapter Testing Types TOC. Overlay `no` is TESTING_TYPES_CHAPTERS id. */

/** Bump when the catalog outline changes so an old localStorage TOC is not restored. */
export const TESTING_TYPES_TOC_VERSION = 15;

export function restoreTestingTypesToc(saved: unknown): boolean {
  if (!saved || typeof saved !== "object") return false;
  const s = saved as { tocManaged?: unknown; tocCatalogVersion?: unknown };
  return Boolean(s.tocManaged) && s.tocCatalogVersion === TESTING_TYPES_TOC_VERSION;
}

/** One TOC row: overlay type `no`, or a folder with only children (Quality Attributes). */
export type TestingTypesOutlineNode = {
  no?: number;
  title: string;
  children?: { no: number; title: string }[];
};

export type TestingTypesOutlinePart = {
  name: string;
  items: TestingTypesOutlineNode[];
};

/** 15 chapters / 92 types. `no` is TESTING_TYPES_CHAPTERS overlay id (matched by title when the printed # differed). */
export const TESTING_TYPES_OUTLINE: TestingTypesOutlinePart[] = [
  {
    name: "Testing by Level",
    items: [
      { no: 1, title: "Unit Testing" },
      {
        no: 2,
        title: "Integration Testing",
        children: [
          { no: 64, title: "Big Bang Integration Testing" },
          { no: 89, title: "Incremental Integration Testing" },
          { no: 55, title: "Contract Testing" },
        ],
      },
      {
        no: 3,
        title: "System Testing",
        children: [{ no: 36, title: "End-to-End Testing" }],
      },
      {
        no: 4,
        title: "Acceptance Testing (UAT)",
        children: [
          { no: 29, title: "Alpha Testing" },
          { no: 30, title: "Beta Testing" },
          { no: 62, title: "Pilot Testing" },
          { no: 82, title: "Operational Acceptance Testing (OAT)" },
        ],
      },
    ],
  },
  {
    name: "Execution Method",
    items: [
      { no: 5, title: "Manual Testing" },
      { no: 6, title: "Automated Testing" },
    ],
  },
  {
    name: "Functional Testing",
    items: [
      {
        no: 7,
        title: "Functional Testing",
        children: [
          { no: 8, title: "Smoke Testing" },
          { no: 9, title: "Sanity Testing" },
          { no: 10, title: "Regression Testing" },
          { no: 31, title: "Retesting (Confirmation)" },
        ],
      },
      {
        no: 11,
        title: "Interface Testing",
        children: [
          { no: 34, title: "API Testing" },
          { no: 47, title: "GUI Testing" },
          { no: 48, title: "Visual Regression Testing" },
          { no: 92, title: "Voice / Conversational UI Testing" },
          { no: 85, title: "Content Testing" },
        ],
      },
      { no: 86, title: "Business Flow Testing" },
    ],
  },
  {
    name: "Non-Functional Testing",
    items: [
      {
        no: 13,
        title: "Performance Testing",
        children: [
          { no: 14, title: "Load Testing" },
          { no: 15, title: "Stress Testing" },
          { no: 90, title: "Spike Testing" },
          { no: 17, title: "Volume Testing" },
          { no: 16, title: "Scalability Testing" },
          { no: 56, title: "Concurrency Testing" },
          { no: 72, title: "Soak / Endurance Testing" },
        ],
      },
      {
        no: 20,
        title: "Reliability Testing",
        children: [
          { no: 42, title: "Uptime / Availability Testing" },
          { no: 21, title: "Recovery Testing" },
          { no: 59, title: "Disaster Recovery Testing" },
          { no: 54, title: "Chaos Testing" },
        ],
      },
      {
        no: 19,
        title: "Compatibility Testing",
        children: [
          { no: 37, title: "Cross-browser Testing" },
          { no: 57, title: "Configuration Testing" },
          { no: 83, title: "Cloud Testing" },
          { no: 70, title: "Network Testing" },
          { no: 74, title: "Interoperability Testing" },
          { no: 75, title: "Conformance Testing" },
        ],
      },
      {
        no: 23,
        title: "Localization / i18n Testing",
        children: [{ no: 76, title: "Globalization Testing" }],
      },
      {
        title: "Quality Attributes",
        children: [
          { no: 12, title: "Usability Testing" },
          { no: 22, title: "Accessibility Testing" },
          { no: 61, title: "Compliance / Regulatory Testing" },
          { no: 41, title: "SEO / Site Health Testing" },
          { no: 18, title: "Security Testing" },
        ],
      },
    ],
  },
  {
    name: "Testing by Knowledge",
    items: [
      { no: 24, title: "Black Box Testing" },
      {
        no: 25,
        title: "White Box Testing",
        children: [
          { no: 81, title: "Statement/Branch/Path Coverage Testing" },
          { no: 87, title: "Object-Oriented Testing" },
          { no: 32, title: "Mutation Testing" },
        ],
      },
      { no: 26, title: "Gray Box Testing" },
    ],
  },
  {
    name: "Test Design Techniques",
    items: [
      { no: 50, title: "Positive Testing" },
      { no: 49, title: "Negative Testing" },
      { no: 51, title: "Boundary Value Analysis" },
      { no: 52, title: "Equivalence Partitioning" },
      { no: 79, title: "Domain Testing" },
      { no: 80, title: "Error Handling / Error Guessing Testing" },
    ],
  },
  {
    name: "Security Testing",
    items: [
      { no: 40, title: "Penetration Testing" },
      { no: 43, title: "Fuzz Testing" },
      { no: 44, title: "Vulnerability Scanning" },
    ],
  },
  {
    name: "Static & Dynamic Testing",
    items: [
      { no: 45, title: "Static Testing" },
      { no: 46, title: "Dynamic Testing" },
    ],
  },
  {
    name: "Automation Techniques",
    items: [
      { no: 65, title: "Data-Driven Testing" },
      { no: 66, title: "Keyword-Driven Testing" },
      { no: 67, title: "Model-Based Testing" },
      { no: 71, title: "Snapshot Testing" },
      { no: 84, title: "Diff / Golden Master Testing" },
    ],
  },
  {
    name: "Automation Strategy",
    items: [{ no: 73, title: "Continuous Testing (CI/CD)" }],
  },
  {
    name: "Test Strategy",
    items: [
      { no: 68, title: "Risk-Based Testing" },
      { no: 77, title: "Baseline Testing" },
      { no: 78, title: "Comparative Testing" },
      { no: 33, title: "A/B Testing" },
    ],
  },
  {
    name: "Mobile & Web",
    items: [
      { no: 38, title: "Mobile Testing" },
      { no: 88, title: "Progressive Web App (PWA) Testing" },
    ],
  },
  {
    name: "Data & Backend",
    items: [
      { no: 35, title: "Database Testing" },
      { no: 58, title: "Data Migration Testing" },
      { no: 69, title: "Backend Testing" },
    ],
  },
  {
    name: "Exploratory & Unscripted Testing",
    items: [
      { no: 27, title: "Exploratory Testing" },
      { no: 91, title: "Session-Based Testing" },
      { no: 28, title: "Ad-hoc Testing" },
      { no: 53, title: "Monkey Testing" },
    ],
  },
  {
    name: "Other Specialized Testing",
    items: [
      { no: 39, title: "Installation Testing" },
      { no: 60, title: "Documentation Testing" },
      { no: 63, title: "Parallel Testing" },
    ],
  },
];

export type TestingTypesOutlineRow = {
  part: string;
  title: string;
  no?: number;
  parentTitle?: string;
};

export function flattenTestingTypesOutline(): TestingTypesOutlineRow[] {
  const rows: TestingTypesOutlineRow[] = [];
  for (const part of TESTING_TYPES_OUTLINE) {
    for (const item of part.items) {
      rows.push({ part: part.name, title: item.title, no: item.no });
      for (const child of item.children || []) {
        rows.push({ part: part.name, title: child.title, no: child.no, parentTitle: item.title });
      }
    }
  }
  return rows;
}
