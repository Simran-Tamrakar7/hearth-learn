import assert from "node:assert/strict";
import {
  addHighlight,
  fieldToTabType,
  mergeHighlightStores,
  parseHighlightStore,
  removeHighlight,
  storeFromRows,
  tabTypeToField,
  wrapHighlightHtml,
} from "./highlights.ts";

const added = addHighlight({}, "ch-1", "hello world", "yellow", "full", 4);
assert.equal(added["ch-1"].length, 1);
assert.equal(added["ch-1"][0].text, "hello world");
assert.equal(added["ch-1"][0].start, 4);
assert.equal(fieldToTabType("full"), "fullContent");
assert.equal(tabTypeToField("fullContent"), "full");

const html = wrapHighlightHtml("Say hello world today", added["ch-1"]);
assert.match(html, /<mark data-hl="/);
assert.match(html, />hello world<\/mark>/);

const parsed = parseHighlightStore(JSON.stringify(added));
assert.equal(parsed["ch-1"][0].color, "yellow");
assert.equal(parsed["ch-1"][0].start, 4);

const gone = removeHighlight(parsed, "ch-1", parsed["ch-1"][0].id);
assert.equal(gone["ch-1"], undefined);

const merged = mergeHighlightStores(added, storeFromRows([{ ...added["ch-1"][0], id: "other", chapterId: "ch-2", text: "later", field: "summary" }]));
assert.equal(merged["ch-1"].length, 1);
assert.equal(merged["ch-2"][0].field, "summary");

console.log("highlights.check: ok");
