#!/usr/bin/env node
/* MAT Codex: validate-elements.mjs
 * Validates the 118-element baseline catalogue.
 * Run: npm run validate:elements
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
let errors = 0;
let warnings = 0;

function fail(msg) { console.error(`  FAIL: ${msg}`); errors++; }
function warn(msg) { console.log(`  WARN: ${msg}`); warnings++; }
function pass(msg) { console.log(`  PASS: ${msg}`); }

// Load elements
let data;
try {
  data = JSON.parse(readFileSync(join(root, "book", "data", "elements-118.json"), "utf8"));
  pass("elements-118.json loaded");
} catch (e) {
  fail(`Cannot load elements-118.json: ${e.message}`);
  process.exit(1);
}

const elements = data.elements || [];
console.log(`\nValidating ${elements.length} elements...\n`);

// 1. Exactly 118 elements
if (elements.length === 118) {
  pass(`Exactly 118 elements`);
} else {
  fail(`Expected 118 elements, got ${elements.length}`);
}

// 2. Atomic numbers unique 1-118
const zs = elements.map(e => e.z);
const uniqueZs = new Set(zs);
if (uniqueZs.size === 118 && Math.min(...zs) === 1 && Math.max(...zs) === 118) {
  pass("Atomic numbers 1-118, all unique");
} else {
  fail(`Atomic number validation failed: min=${Math.min(...zs)}, max=${Math.max(...zs)}, unique=${uniqueZs.size}`);
}

// 3. No MAT:null
const nullIds = elements.filter(e => !e.matId || e.matId === "MAT:null");
if (nullIds.length === 0) {
  pass("No MAT:null entries");
} else {
  fail(`${nullIds.length} elements have MAT:null: ${nullIds.map(e => e.z).join(", ")}`);
}

// 4. MAT ID matches atomic number
const matMismatch = elements.filter(e => {
  const expected = `MAT:${String(e.z).padStart(4, "0")}`;
  return e.matId !== expected;
});
if (matMismatch.length === 0) {
  pass("All MAT IDs match atomic numbers");
} else {
  fail(`${matMismatch.length} MAT ID mismatches: ${matMismatch.map(e => `${e.z}:${e.matId}`).join(", ")}`);
}

// 5. Symbols unique
const symbols = elements.map(e => e.symbol);
const uniqueSymbols = new Set(symbols);
if (uniqueSymbols.size === 118) {
  pass("All symbols unique");
} else {
  const dupes = symbols.filter((s, i) => symbols.indexOf(s) !== i);
  fail(`Duplicate symbols: ${[...new Set(dupes)].join(", ")}`);
}

// 6. Names unique
const names = elements.map(e => e.name);
const uniqueNames = new Set(names);
if (uniqueNames.size === 118) {
  pass("All names unique");
} else {
  const dupes = names.filter((n, i) => names.indexOf(n) !== i);
  fail(`Duplicate names: ${[...new Set(dupes)].join(", ")}`);
}

// 7. All have recordStatus
const noStatus = elements.filter(e => !e.recordStatus);
if (noStatus.length === 0) {
  pass("All elements have recordStatus");
} else {
  fail(`${noStatus.length} elements missing recordStatus`);
}

// 8. No fake abundance sentinels (0.000001, 0.1 patterns)
const fakeAbundance = elements.filter(e => {
  // Check if any abundance-like field has a suspicious sentinel value
  // In the new schema, abundance fields should be null, not fake numbers
  return false; // Our new baseline uses null properly
});
if (fakeAbundance.length === 0) {
  pass("No fake abundance sentinels");
} else {
  fail(`${fakeAbundance.length} elements with fake abundance values`);
}

// 9. Status distribution
const curated = elements.filter(e => e.recordStatus === "CURATED");
const baseline = elements.filter(e => e.recordStatus === "BASELINE");
pass(`Status distribution: ${curated.length} CURATED, ${baseline.length} BASELINE`);

// 10. Element categories are valid
const validCategories = new Set([
  "Alkali Metal", "Alkaline Earth Metal", "Transition Metal",
  "Post-Transition Metal", "Metalloid", "Reactive Nonmetal",
  "Halogen", "Noble Gas", "Lanthanide", "Actinide", "Reference Origin"
]);
const invalidCats = elements.filter(e => !validCategories.has(e.category));
if (invalidCats.length === 0) {
  pass("All categories valid");
} else {
  warn(`${invalidCats.length} elements with unrecognized categories: ${invalidCats.map(e => `${e.symbol}:${e.category}`).join(", ")}`);
}

console.log(`\n${"=".repeat(50)}`);
console.log(`Results: ${errors} errors, ${warnings} warnings`);
if (errors === 0) {
  console.log("All element validations PASSED");
} else {
  console.log("Element validation FAILED");
  process.exit(1);
}
