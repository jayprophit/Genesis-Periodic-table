// Checks internal Markdown links resolve to real files/anchors.
// Run: npm run validate:links
import { R, walkFiles, exists, issue, warn, summary } from "./lib.mjs";

let failed = 0;
const mdFiles = [...walkFiles("docs", (f) => f.endsWith(".md")), ...walkFiles("records", (f) => f.endsWith(".md")), "README.md", "CHANGELOG.md"];
const linkRe = /!?\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
for (const f of mdFiles) {
  let src;
  try { src = R(f); } catch { continue; }
  const base = f.split("/").slice(0, -1).join("/");
  for (const m of src.matchAll(linkRe)) {
    const href = m[2];
    if (/^(https?:|mailto:|#|data:)/.test(href)) continue;
    const [pathPart, anchor] = href.split("#");
    if (!pathPart) continue;
    if (/\.(png|svg|glb|csv|json|yaml|html|js|css)$/i.test(pathPart)) {
      const target = (base ? base + "/" : "") + pathPart;
      if (!exists(target)) { issue(f, null, href, "linked asset missing", "link must resolve to a file on disk"); failed++; }
      continue;
    }
    if (!/\.md$/i.test(pathPart)) continue;
    const target = (base ? base + "/" : "") + pathPart;
    const norm = target.split("/").filter((p) => p !== ".").join("/").replace(/\/[^/]+\/\.\./, "");
    if (!exists(target) && !exists(norm)) { issue(f, null, href, "linked chapter missing", "cross-links must resolve"); failed++; }
  }
}
process.exitCode = summary("validate:links") || failed ? 1 : 0;
