
/* Cypress manual TOC — ordering only. Content lives in part-N/chapter-M.ts */

export const CYPRESS_TOC_VERSION = 1;

export type CypressTocPart = {
  partNo: number;
  name: string;
  items: { title: string }[];
};

export const CYPRESS_TOC: CypressTocPart[] = [
  {
    partNo: 0,
    name: "Getting Started",
    items: [{ title: "1. Introduction to Cypress" }],
  },
];
