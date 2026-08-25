import type { ToolItem } from "@/app/manuals/_lib/manualsData";

export interface PracticalExample {
  app: string;
  scenario: string;
  pass: string;
  fail: string;
  value?: string;
  passLabel?: string;
  failLabel?: string;
}

export interface TestingChapterData {
  no: string;
  title: string;
  category: string;
  desc: string;
  why: string;
  when: string;
  practical: PracticalExample;
  advantages?: string[];
  limitations?: string[];
  tools: ToolItem[];
}
