import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.argv[2];
if (!root) {
  console.error("usage: verify-static.mjs <exported-dir>");
  process.exit(2);
}

const hidden = /(?<![\w.-])opacity\s*:\s*0(?:\.0+)?(?![\d.])|blur\(/i;

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name.endsWith(".html")) yield full;
  }
}

const failures = [];
let count = 0;
for (const file of htmlFiles(root)) {
  count += 1;
  const html = readFileSync(file, "utf8");
  for (const [, , style] of html.matchAll(/\sstyle=(["'])(.*?)\1/gs)) {
    if (hidden.test(style)) failures.push(`${path.relative(root, file)}: style="${style}"`);
  }
}

if (failures.length) {
  console.error(`Exported HTML hides content with inline styles:\n${failures.join("\n")}`);
  process.exit(1);
}
console.log(`verify-static: ${count} HTML files have no hiding inline styles`);
