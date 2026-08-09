import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("Cloudflare Workers routes direct requests through the SPA entry point", async () => {
  let configSource = "{}";
  try {
    configSource = await readFile(resolve(projectRoot, "wrangler.json"), "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const config = JSON.parse(configSource);
  assert.equal(config.assets?.directory, "./dist");
  assert.equal(config.assets?.not_found_handling, "single-page-application");
  await assert.rejects(
    access(resolve(projectRoot, "public", "_redirects")),
    { code: "ENOENT" },
    "Cloudflare Workers rejects the Pages-style catch-all redirect as a loop",
  );
});
