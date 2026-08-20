import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("home hero includes security solution operations in both languages", async () => {
  const source = await readFile(new URL("../src/data/localization.ts", import.meta.url), "utf8");
  assert.match(source, /Cloud · 보안 솔루션 운영/);
  assert.match(source, /Cloud · Security Solution Operations/);
});

test("site links to the public GitHub profile", async () => {
  const source = await readFile(new URL("../src/data/site.ts", import.meta.url), "utf8");
  assert.match(source, /https:\/\/github\.com\/david-devsecops/);
});

test("site head loads the approved AdSense ownership script once", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
  const adsenseScripts =
    head.match(
      /<script(?=[^>]*\basync\b)(?=[^>]*\bsrc="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-2898972256894696")(?=[^>]*\bcrossorigin="anonymous")[^>]*><\/script>/g,
    ) ?? [];

  assert.equal(adsenseScripts.length, 1);
});
