import assert from "node:assert/strict";
import { mergeCatalog, slugId } from "./localCatalog.ts";

assert.equal(slugId("Hello World!"), "hello-world");
assert.equal(slugId("   "), "item");
assert.deepEqual(
  mergeCatalog(
    [{ id: "user-1", title: "Mine" }],
    [
      { id: "a", title: "A" },
      { id: "b", title: "B" },
    ],
    ["b"],
    { a: { title: "A2" } }
  ),
  [
    { id: "user-1", title: "Mine" },
    { id: "a", title: "A2" },
  ]
);

console.log("localCatalog.check: ok");
