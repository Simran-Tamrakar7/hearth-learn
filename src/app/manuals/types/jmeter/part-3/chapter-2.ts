import type { ChapterRecord } from "../../../types";

/** 3.2 HTTP Header Manager */
export const chapter = {
  "id": "jm-3-2-http-header-manager",
  "title": "3.2 HTTP Header Manager",
  "minutes": 20,
  "level": "intermediate",
  "phase": "Part 3 · Configuration Elements",
  "partName": "Part 3 · Configuration Elements",
  "overviewText": "HTTP Header Manager attaches name-value headers (Content-Type, Accept, Authorization) to samplers in scope. ${authToken} is substituted at request time — the login extractor must run first. Thread-group headers merge with sampler-specific ones; the closer manager wins on overlaps.",
  "why": "401s from a 'missing' Bearer header are usually tree scope, not a broken login. Layer common JSON headers high, multipart only on the upload sampler.",
  "when": "Every JSON REST plan, and whenever one call needs a different Content-Type than the rest.",
  "practical": {
    "app": "REST leave API plus a file-upload sampler",
    "scenario": "All calls need JSON headers; upload needs multipart.",
    "pass": "You put Content-Type/Accept/Authorization: Bearer ${authToken} at Thread Group; child Header Manager overrides Content-Type on upload only.",
    "fail": "You put the Bearer header only on login, or after the samplers that need it."
  },
  "tools": [],
  "customSummary": "- Attaches consistent name-value header pairs (Content-Type, Accept, Authorization) to samplers in scope.\n- Commonly holds Authorization: Bearer ${authToken} — token must be extracted/set by an earlier request first (Part 5).\n- Scope stacking: Thread-Group-level headers + sampler-specific Header Manager merge, with more specific one winning on overlaps.\n- Comparable to setting extraHTTPHeaders once in Playwright's request context, then overriding per-call as needed.",
  "contentMarkdown": "## Name-value headers\n\nHTTP headers carry critical metadata on every request — content type, authentication tokens, custom API keys, accepted response formats — and the HTTP Header Manager is the config element responsible for attaching a consistent set of these to your samplers, the same way HTTP Request Defaults handles server/port/protocol.\n\nYou add an HTTP Header Manager and populate it with name-value pairs. A typical setup for testing a JSON REST API looks like:\n\n```\nHTTP Header Manager:\n  Content-Type: application/json\n  Accept: application/json\n  Authorization: Bearer ${authToken}\n```\n\n## Token substitution order\n\nNotice the `${authToken}` variable reference — this is the pattern you'll use constantly once authentication enters the picture (fully covered with extraction mechanics in Part 5). The Header Manager itself doesn't know or care where `authToken` came from; it just substitutes whatever value that variable currently holds at request time, which is why the order of elements in the tree matters — the login request that sets `authToken` via a Post-Processor must execute before any sampler relying on a Header Manager that references it.\n\n## Layered scope\n\nJust like HTTP Request Defaults, scope matters: a Header Manager placed under the Thread Group applies to all samplers beneath it, while one placed as a direct child of a single HTTP Request sampler applies only to that request — and if both exist, JMeter merges them, with the more specific (child-level) header manager's values taking precedence on any overlapping header name.\n\nA practical use case for this layered approach: put common headers like Content-Type and Accept at the Thread-Group level since every request needs them, but attach a request-specific Header Manager only to, say, a file-upload sampler that needs a different `Content-Type: multipart/form-data` for that one call.\n\nThis maps directly to something you already do in API testing with Playwright's request fixture, where you might set default headers once via `extraHTTPHeaders` in the request context, then override specific headers on individual calls — same underlying idea, different tool, different level of GUI-vs-code explicitness.",
  "blocks": [
    {
      "id": "jm-3-2-md-0",
      "type": "overview",
      "heading": "Name-value headers",
      "content": "HTTP headers carry critical metadata on every request — content type, authentication tokens, custom API keys, accepted response formats — and the HTTP Header Manager is the config element responsible for attaching a consistent set of these to your samplers, the same way HTTP Request Defaults handles server/port/protocol.\n\nYou add an HTTP Header Manager and populate it with name-value pairs. A typical setup for testing a JSON REST API looks like:\n\n```\nHTTP Header Manager:\n  Content-Type: application/json\n  Accept: application/json\n  Authorization: Bearer ${authToken}\n```",
      "order": 0
    },
    {
      "id": "jm-3-2-md-1",
      "type": "overview",
      "heading": "Token substitution order",
      "content": "Notice the `${authToken}` variable reference — this is the pattern you'll use constantly once authentication enters the picture (fully covered with extraction mechanics in Part 5). The Header Manager itself doesn't know or care where `authToken` came from; it just substitutes whatever value that variable currently holds at request time, which is why the order of elements in the tree matters — the login request that sets `authToken` via a Post-Processor must execute before any sampler relying on a Header Manager that references it.",
      "order": 1
    },
    {
      "id": "jm-3-2-md-2",
      "type": "overview",
      "heading": "Layered scope",
      "content": "Just like HTTP Request Defaults, scope matters: a Header Manager placed under the Thread Group applies to all samplers beneath it, while one placed as a direct child of a single HTTP Request sampler applies only to that request — and if both exist, JMeter merges them, with the more specific (child-level) header manager's values taking precedence on any overlapping header name.\n\nA practical use case for this layered approach: put common headers like Content-Type and Accept at the Thread-Group level since every request needs them, but attach a request-specific Header Manager only to, say, a file-upload sampler that needs a different `Content-Type: multipart/form-data` for that one call.\n\nThis maps directly to something you already do in API testing with Playwright's request fixture, where you might set default headers once via `extraHTTPHeaders` in the request context, then override specific headers on individual calls — same underlying idea, different tool, different level of GUI-vs-code explicitness.",
      "order": 2
    }
  ],
  "advantages": [
    "3.2 HTTP Header Manager — 401s from a 'missing' Bearer header are usually tree scope, not a broken login."
  ],
  "limitations": [
    "3.2 HTTP Header Manager is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
