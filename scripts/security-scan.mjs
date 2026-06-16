import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const trackedFiles = execFileSync("git", ["ls-files"], { encoding: "utf8" })
  .split(/\r?\n/)
  .filter(Boolean);

const skippedExtensions = /\.(png|jpe?g|gif|webp|ico|pdf|xlsx?|docx?|pptx?|zip|gz|tar|7z|woff2?|ttf|eot)$/i;
const rules = [
  {
    name: "JWT/API key-looking token",
    pattern: /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b/g,
  },
  {
    name: "Supabase project URL",
    pattern: /https:\/\/[a-z0-9]{20}\.supabase\.co\b/g,
  },
  {
    name: "Database connection string",
    pattern: /\bpostgres(?:ql)?:\/\/[^\s"'<>]+/gi,
  },
  {
    name: "GitHub personal access token",
    pattern: /\bgh[pousr]_[A-Za-z0-9_]{36,}\b/g,
  },
  {
    name: "AWS access key",
    pattern: /\bAKIA[0-9A-Z]{16}\b/g,
  },
  {
    name: "Google API key",
    pattern: /\bAIza[0-9A-Za-z_-]{35}\b/g,
  },
  {
    name: "Private key block",
    pattern: /-----BEGIN (?:RSA |EC |OPENSSH |DSA |)?PRIVATE KEY-----/g,
  },
];

const findings = [];

for (const file of trackedFiles) {
  if (skippedExtensions.test(file)) continue;

  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }

  for (const rule of rules) {
    for (const match of text.matchAll(rule.pattern)) {
      const line = text.slice(0, match.index).split(/\r?\n/).length;
      findings.push(`${file}:${line} ${rule.name}`);
    }
  }
}

if (findings.length) {
  console.error("Possiveis segredos encontrados em arquivos versionados:");
  for (const finding of findings) console.error(`- ${finding}`);
  console.error("Remova o valor real do codigo e use variaveis de ambiente/secrets da plataforma.");
  process.exit(1);
}

console.log("Security scan OK: nenhum segredo obvio em arquivos versionados.");
