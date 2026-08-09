import assert from "node:assert/strict";
import test from "node:test";

import { validateText } from "./validate-public-content.mjs";

test("rejects Kubernetes build and operations claims", () => {
  const findings = validateText(
    "Kubernetes 클러스터 구축 및 워크로드 운영을 담당했습니다.",
    "src/data/example.ts",
  );

  assert.ok(findings.some((finding) => finding.rule === "career-claim"));
});

test("rejects private addresses and accepts documentation addresses", () => {
  const privateAddress = ["10", "20", "30", "40"].join(".");
  const rejected = validateText(`service = ${privateAddress}`, "src/data/example.ts");
  const accepted = validateText("service = 192.0.2.10", "src/data/example.ts");

  assert.ok(rejected.some((finding) => finding.rule === "ip-address"));
  assert.equal(accepted.length, 0);
});

test("rejects private keys and Windows source paths", () => {
  const privateKeyHeader = ["BEGIN", "OPENSSH", "PRIVATE", "KEY"].join(" ");
  const findings = validateText(
    `${privateKeyHeader}\nsource = D:\\\\Client\\\\design.xlsx`,
    "src/data/example.ts",
  );

  assert.ok(findings.some((finding) => finding.rule === "secret"));
  assert.ok(findings.some((finding) => finding.rule === "local-path"));
});

test("rejects third-party source-analysis narration", () => {
  const samples = [
    "경력 자료에는 Fibre Channel 운영 이력이 나타납니다.",
    "경력 자료에서 직접 확인되는 범위는 Oracle single·RAC 유지보수입니다.",
    "자료에서 확인한 것은 폴더명보다 리소스 경계였습니다.",
    "The source evidence for this article is a recurring report structure.",
  ];

  for (const sample of samples) {
    const findings = validateText(sample, "src/data/blogPosts.ts");
    assert.ok(findings.some((finding) => finding.rule === "author-voice"));
  }
});
