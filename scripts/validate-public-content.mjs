import { readdir, readFile } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const deniedClaims = [
  /Kubernetes cluster build-out and workload operations/i,
  /Kubernetes build and operations/i,
  /Built clusters/i,
  /Cluster construction/i,
  /Kubernetes 클러스터 구축 및 워크로드 운영/,
  /Kubernetes 구축 및 운영/,
  /클러스터 구축, 워크로드 운영/,
  /클러스터 구축과 워크로드 배포/,
  /클러스터를 구축하고/,
];

const thirdPartyNarrationPatterns = [
  /경력 자료에는/,
  /경력 자료에서(?: 직접)? 확인/,
  /근거 자료에는/,
  /자료에서 확인한 것은/,
  /자료에서는 .*확인할 수 있었습니다/,
  /The source evidence for this article/i,
  /The evidence behind this article/i,
  /The direct career evidence used here/i,
  /The evidence for this article/i,
];

const secretPatterns = [
  /BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/,
  /AKIA[0-9A-Z]{16}/,
  /password\s*[:=]\s*["'][^"']+["']/i,
];

const windowsAbsolutePath = /[A-Za-z]:\\{1,2}[^\s"']+/;
const ipv4 = /\b(?:\d{1,3}\.){3}\d{1,3}(?:\/\d{1,2})?\b/g;
const allowedAddressPrefixes = ["192.0.2.", "198.51.100.", "203.0.113."];
const sourceExtensions = new Set([".ts", ".tsx"]);

export function validateText(text, file = "<text>") {
  const findings = [];
  const lines = text.split(/\r?\n/);

  for (const [index, line] of lines.entries()) {
    const lineNumber = index + 1;

    if (deniedClaims.some((pattern) => pattern.test(line))) {
      findings.push({ file, line: lineNumber, rule: "career-claim" });
    }

    if (thirdPartyNarrationPatterns.some((pattern) => pattern.test(line))) {
      findings.push({ file, line: lineNumber, rule: "author-voice" });
    }

    if (secretPatterns.some((pattern) => pattern.test(line))) {
      findings.push({ file, line: lineNumber, rule: "secret" });
    }

    if (windowsAbsolutePath.test(line)) {
      findings.push({ file, line: lineNumber, rule: "local-path" });
    }

    for (const address of line.match(ipv4) ?? []) {
      if (!allowedAddressPrefixes.some((prefix) => address.startsWith(prefix))) {
        findings.push({ file, line: lineNumber, rule: "ip-address", value: address });
      }
    }
  }

  return findings;
}

async function sourceFiles(directory) {
  const files = [];

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await sourceFiles(path)));
    else if (sourceExtensions.has(extname(entry.name))) files.push(path);
  }

  return files;
}

export async function validateSourceTree(directory) {
  const files = await sourceFiles(directory);
  const findings = [];

  for (const file of files) {
    const displayPath = relative(process.cwd(), file).replaceAll("\\", "/");
    findings.push(...validateText(await readFile(file, "utf8"), displayPath));
  }

  return { files: files.length, findings };
}

async function main() {
  const sourceRoot = fileURLToPath(new URL("../src", import.meta.url));
  const result = await validateSourceTree(sourceRoot);

  if (result.findings.length > 0) {
    for (const finding of result.findings) {
      const suffix = finding.value ? ` (${finding.value})` : "";
      console.error(`${finding.file}:${finding.line}: ${finding.rule}${suffix}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`public content validation passed (${result.files} files)`);
}

const executedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : "";
if (executedPath === import.meta.url) {
  await main();
}
