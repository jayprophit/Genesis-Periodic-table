#!/usr/bin/env node
/* MAT Codex: apply-codex-upgrade.mjs
 * Verifies that all Codex UI upgrade changes are in place.
 * Run: node scripts/apply-codex-upgrade.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
let pass = 0, fail = 0;

function check(label, ok, detail) {
  if (ok) { pass++; console.log(`  ✔ ${label}`); }
  else { fail++; console.log(`  ✘ ${label}${detail ? " — " + detail : ""}`); }
}

function has(file, pattern) {
  if (!existsSync(join(root, file))) return false;
  const content = readFileSync(join(root, file), "utf8");
  return pattern instanceof RegExp ? pattern.test(content) : content.includes(pattern);
}

console.log("\n=== MAT Codex Upgrade Verification ===\n");

/* --- CSS modules --- */
console.log("CSS Modules:");
check("styles/reading-modes.css exists", existsSync(join(root, "book/styles/reading-modes.css")));
check("styles/codex-panels.css exists", existsSync(join(root, "book/styles/codex-panels.css")));
check("reading-modes in CSS_MODULES", has("book/book.js", "reading-modes.css"));
check("codex-panels in CSS_MODULES", has("book/build/offline-index.mjs", "codex-panels.css"));

/* --- Reading modes --- */
console.log("\nReading Modes:");
check("initReadingModes defined", has("book/book.js", "initReadingModes"));
check("mode-codex class", has("book/styles/reading-modes.css", "mode-codex"));
check("mode-book class", has("book/styles/reading-modes.css", "mode-book"));
check("mode-focus class", has("book/styles/reading-modes.css", "mode-focus"));
check("mode-bar in HTML", has("book/index.html", "mode-bar"));
check("data-mode buttons in HTML", has("book/index.html", "data-mode"));

/* --- Read-selection TTS --- */
console.log("\nRead-Selection TTS:");
check("initReadSelection defined", has("book/book.js", "initReadSelection"));
check("read-sel-controls in HTML", has("book/index.html", "read-sel-controls"));
check("read-sel-btn in HTML", has("book/index.html", "read-sel-btn"));

/* --- Codex overview --- */
console.log("\nCodex Overview Panels:");
check("renderCodexOverview defined", has("book/book.js", "renderCodexOverview"));
check("codex-overview in HTML", has("book/index.html", "codex-overview"));
check("codex-map in HTML", has("book/index.html", "codex-map"));
check("info-boxes in HTML", has("book/index.html", "info-boxes"));

/* --- Media placeholders --- */
console.log("\nMedia Placeholders:");
check("renderMediaPlaceholders defined", has("book/book.js", "renderMediaPlaceholders"));
check("media-placeholders in HTML", has("book/index.html", "media-placeholders"));

/* --- Evidence panel --- */
console.log("\nEvidence Panel:");
check("renderEvidencePanel defined", has("book/book.js", "renderEvidencePanel"));
check("evidence-panel in HTML", has("book/index.html", "evidence-panel"));

/* --- Discovery links --- */
console.log("\nDiscovery Links:");
check("renderDiscoveryLinks defined", has("book/book.js", "renderDiscoveryLinks"));
check("discovery-panel in HTML", has("book/index.html", "discovery-panel"));

/* --- Publication previews --- */
console.log("\nPublication Previews:");
check("initPubPreviews defined", has("book/book.js", "initPubPreviews"));
check("preview-web in HTML", has("book/index.html", "preview-web"));
check("preview-epub in HTML", has("book/index.html", "preview-epub"));
check("preview-6x9 in HTML", has("book/index.html", "preview-6x9"));
check("preview-a4 in HTML", has("book/index.html", "preview-a4"));

/* --- Bug fixes --- */
console.log("\nBug Fixes:");
check("addHighlight imported", has("book/book.js", "addHighlight, removeHighlight"));
check("Cache name unified (mat-codex-v3)", has("book/book.js", "mat-codex-v3"));
check("sw.js cache prefix filter", has("book/sw.js", 'k.startsWith("mat-")'));
check("Scroll restore uses #reader", has("book/book.js", "reader.scrollTop = Math.round"));
check("Publication metadata.json exists", existsSync(join(root, "book/data/publication/metadata.json")));
check("elements-118 has referenceRecords", has("book/data/elements-118.json", "referenceRecords"));
check("Chart provenance field", has("book/data/chart-datasets.json", "provenance_note"));
check("Noble gas en=null (not 0)", has("book/data/chart-datasets.json", '"en":null'));

/* --- Init calls --- */
console.log("\nInit Integration:");
check("initReadingModes() called", has("book/book.js", "initReadingModes()"));
check("initReadSelection() called", has("book/book.js", "initReadSelection()"));
check("initPubPreviews() called", has("book/book.js", "initPubPreviews()"));
check("renderCodexOverview called in showChapter", has("book/book.js", "renderCodexOverview(doc)"));
check("renderMediaPlaceholders called in showChapter", has("book/book.js", "renderMediaPlaceholders(doc)"));
check("renderEvidencePanel called in showChapter", has("book/book.js", "renderEvidencePanel(doc)"));
check("renderDiscoveryLinks called in showChapter", has("book/book.js", "renderDiscoveryLinks(doc)"));

console.log(`\n=== Results: ${pass} passed, ${fail} failed ===\n`);
process.exitCode = fail > 0 ? 1 : 0;
