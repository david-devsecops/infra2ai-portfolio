import assert from "node:assert/strict";
import test from "node:test";

import { populatedProjectSectionKeys } from "../src/data/projectSections.ts";

test("returns only detail sections with reader-visible content", () => {
  const keys = populatedProjectSectionKeys({
    overview: { paragraphs: ["Project overview"] },
    problem: {},
    implementation: { bullets: ["Implemented scope"] },
  });

  assert.deepEqual(keys, ["overview", "implementation"]);
});
