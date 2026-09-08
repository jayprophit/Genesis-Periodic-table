// Shared helpers for MAT validators. Run via: npm run validate
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, sep } from "node:path";
import YAML from "yaml";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

export const root = join(import.meta.dirname, "..");
export const R = (p) => readFileSync(join(root, p), "utf8").replace(/\r\n/g, "\n");
export const exists = (p) => existsSync(join(root, p));

export const MAT_ID = /^MAT:(0000|00\d\d)(:[A-Za-z0-9+-]+)+$/;
export const MAT_ID_OR_PARENT = /^MAT:(0000|00\d\d)(:[A-Za-z0-9+-]+)*$/;
export const MAT_PARENT = /^MAT:(0000|00\d\d)$/;
export const SRC_CANON = /^SRC-\d{6}$/;
export const SRC_ALIAS = /^SRC-[A-Z0-9]+-\d+$/;
export const RESERVED = "RESERVED-PENDING-RECORD";

const issues = [];
export function issue(file, record, path, problem, expected, level = "error") {
  issues.push({ file, record, path, problem, expected, level });
}
export function warn(file, record, path, problem, expected) {
  issue(file, record, path, problem, expected, "warning");
}
export function summary(name) {
  const errs = issues.filter((i) => i.level === "error");
  const warns = issues.filter((i) => i.level === "warning");
  for (const i of issues)
    console.log(`[${i.level.toUpperCase()}] ${i.file}${i.record ? " :: " + i.record : ""}${i.path ? " :: " + i.path : ""}\n  problem: ${i.problem}\n  expected: ${i.expected}`);
  console.log(`${name}: ${errs.length} error(s), ${warns.length} warning(s)`);
  return errs.length;
}

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const schemaCache = new Map();
export function validateSchema(schemaPath, data) {
  if (!schemaCache.has(schemaPath)) {
    const s = JSON.parse(readFileSync(join(root, schemaPath), "utf8"));
    schemaCache.set(schemaPath, ajv.compile(s));
  }
  const v = schemaCache.get(schemaPath);
  const ok = v(data);
  return ok ? [] : (v.errors || []).map((e) => `${e.instancePath || "/"} ${e.message}`);
}

export function loadYaml(rel) {
  return YAML.parse(R(rel));
}
export function walkFiles(dir, test) {
  const out = [];
  const walk = (d) => {
    for (const en of readdirSync(join(root, d))) {
      const rel = (d ? d + "/" : "") + en;
      const st = statSync(join(root, rel));
      if (st.isDirectory()) walk(rel);
      else if (!test || test(en)) out.push(rel.split(sep).join("/"));
    }
  };
  walk(dir);
  return out.sort();
}
export function recordDirs() {
  return readdirSync(join(root, "records"))
    .filter((e) => /^\d{4}-/.test(e) && statSync(join(root, "records", e)).isDirectory())
    .sort();
}
// Front-matter: fenced yaml before first heading, else unfenced keys after title.
export function frontMatter(src) {
  const fenceIdx = src.indexOf("```yaml");
  const headIdx = src.search(/^# /m);
  let block = "";
  if (fenceIdx !== -1 && (headIdx === -1 || fenceIdx < headIdx)) {
    const fence = src.match(/```yaml\n([\s\S]*?)\n```/);
    block = fence ? fence[1] : "";
  }
  if (!block) {
    const m2 = src.match(/^#[^\n]*\n([\s\S]*?)(?=^# |\Z)/m);
    block = m2 ? m2[1] : "";
  }
  const fm = {};
  if (block) for (const lm of block.matchAll(/^([a-z_]+):\s*(.+?)\s*$/gm)) {
    let v = lm[2].replace(/^"|"$/g, "").trim();
    if (!v || /^null$/i.test(v)) continue;
    // Coerce scalars; MAT null-state strings (NOT-APPLICABLE, …) stay strings.
    if (/^-?\d+$/.test(v)) fm[lm[1]] = parseInt(v, 10);
    else if (/^-?\d*\.\d+$/.test(v)) fm[lm[1]] = parseFloat(v);
    else if (/^(true|false)$/i.test(v)) fm[lm[1]] = v.toLowerCase() === "true";
    else fm[lm[1]] = v;
  }
  return fm;
}
