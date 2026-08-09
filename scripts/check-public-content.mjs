import { access, lstat, readdir, readFile } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ignoredDirectories = new Set([".git", ".terraform", ".wrangler", "dist", "node_modules"]);
const forbiddenExtensions = new Set([
  ".7z",
  ".doc",
  ".docx",
  ".gz",
  ".jks",
  ".key",
  ".p12",
  ".pdf",
  ".pem",
  ".ppt",
  ".pptx",
  ".tar",
  ".xls",
  ".xlsx",
  ".zip",
]);
const textExtensions = new Set([
  ".css",
  ".example",
  ".hcl",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".pseudocode",
  ".svg",
  ".tf",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml",
]);
const secretPatterns = [
  /BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/,
  /AKIA[0-9A-Z]{16}/,
  /github_pat_[A-Za-z0-9_]{20,}/,
  /gh[oprsu]_[A-Za-z0-9]{20,}/,
  /(?:password|secret|token)\s*[:=]\s*["'][^"']+["']/i,
];
const markdownLink = /!?\[[^\]]*\]\(([^)]+)\)/g;
const ipv4 = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;

function displayPath(root, path) {
  return relative(root, path).replaceAll("\\", "/");
}

function isPrivateAddress(address) {
  const [first, second] = address.split(".").map(Number);
  return (
    first === 10 ||
    first === 127 ||
    (first === 169 && second === 254) ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168)
  );
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function repositoryFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) files.push(...(await repositoryFiles(path)));
    } else {
      files.push(path);
    }
  }
  return files;
}

export async function scanRepository(root) {
  const repositoryRoot = resolve(root);
  const findings = [];

  for (const file of await repositoryFiles(repositoryRoot)) {
    const path = displayPath(repositoryRoot, file);
    const extension = extname(file).toLowerCase();
    const { size } = await lstat(file);

    if (size > 2 * 1024 * 1024) findings.push({ path, reason: "file larger than 2 MiB" });
    if (forbiddenExtensions.has(extension)) {
      findings.push({ path, reason: "forbidden file type" });
      continue;
    }
    if (!textExtensions.has(extension) && ![".gitignore", "LICENSE"].includes(path)) continue;

    const text = await readFile(file, "utf8");
    const isScanner = path.endsWith("scripts/check-public-content.mjs");

    if (/\b[A-Za-z]:\\Users\\[^\s"']+/i.test(text)) {
      findings.push({ path, reason: "personal path" });
    }
    if ((text.match(ipv4) ?? []).some(isPrivateAddress)) {
      findings.push({ path, reason: "private address" });
    }
    if (/\b[a-z0-9._-]+\.(?:local|corp|internal)\b/i.test(text)) {
      findings.push({ path, reason: "internal hostname" });
    }
    if (!isScanner && secretPatterns.some((pattern) => pattern.test(text))) {
      findings.push({ path, reason: "secret-shaped content" });
    }

    if (extension !== ".md") continue;
    for (const match of text.matchAll(markdownLink)) {
      const target = match[1].trim().split(/\s+["']/)[0];
      if (/^(?:https?:|mailto:|#)/i.test(target)) continue;
      const relativeTarget = decodeURIComponent(target.split("#")[0].split("?")[0]);
      if (!relativeTarget) continue;
      if (!(await exists(resolve(file, "..", relativeTarget)))) {
        findings.push({ path, reason: "broken link" });
      }
    }
  }

  return findings;
}

async function main() {
  const root = process.argv[2] ?? ".";
  const findings = await scanRepository(root);
  if (findings.length > 0) {
    for (const finding of findings) console.error(`${finding.path}: ${finding.reason}`);
    process.exitCode = 1;
    return;
  }
  console.log("public content check passed");
}

const executedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : "";
if (executedPath === import.meta.url) await main();
