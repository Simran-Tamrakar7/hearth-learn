import assert from "node:assert/strict";
import { addHighlight, parseHighlightStore, removeHighlight, wrapHighlightHtml } from "./highlights.ts";

const added = addHighlight({}, "ch-1", "hello world", "yellow", "full");
assert.equal(added["ch-1"].length, 1);
assert.equal(added["ch-1"][0].text, "hello world");

const html = wrapHighlightHtml("Say hello world today", added["ch-1"]);
assert.match(html, /<mark data-hl="/);
assert.match(html, />hello world<\/mark>/);

const parsed = parseHighlightStore(JSON.stringify(added));
assert.equal(parsed["ch-1"][0].color, "yellow");

const gone = removeHighlight(parsed, "ch-1", parsed["ch-1"][0].id);
assert.equal(gone["ch-1"], undefined);

console.log("highlights.check: ok");
