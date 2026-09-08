// Repository invariant tests. Run: npm test
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import YAML from "yaml";
import Ajv from "ajv/dist/2020.js";

const root = join(import.meta.dirname, "..", "..");
const load = (p) => JSON.parse(readFileSync(join(root, p), "utf8"));
const loadYaml = (p) => YAML.parse(readFileSync(join(root, p), "utf8"));

describe("schemas", () => {
  it("all versioned schemas compile", () => {
    const ajv = new Ajv({ strict: false });
    for (const f of ["mat-record", "mat-measurement", "mat-source-registry", "mat-relationship", "mat-visual-manifest", "mat-table-manifest", "mat-graph-manifest"]) {
      ajv.compile(load(`data/schema/1.0.0/${f}.schema.json`));
    }
  });
  it("hydrogen header validates", () => {
    const ajv = new Ajv({ strict: false });
    const v = ajv.compile(load("data/schema/1.0.0/mat-record.schema.json"));
    assert.equal(v({ mat_id: "MAT:0001", record_name: "Hydrogen", record_class: "CHEMICAL_ELEMENT", atomic_number: 1, status: "RESEARCHED" }), true);
  });
  it("null states are not coerced", () => {
    const ajv = new Ajv({ strict: false });
    const v = ajv.compile(load("data/schema/1.0.0/mat-record.schema.json"));
    assert.equal(v({ mat_id: "MAT:0000", record_name: "Origin State", record_class: "FOUNDATION_REFERENCE", atomic_number: "NOT-APPLICABLE", status: "RESEARCHED" }), true);
  });
});

describe("source registry", () => {
  const reg = loadYaml("data/registries/sources.yaml");
  it("canonical IDs match pattern and aliases resolve", () => {
    const seen = new Set(), aliases = new Map();
    for (const s of reg.sources) {
      assert.match(s.source_id, /^SRC-\d{6}$/, s.source_id);
      assert.ok(!seen.has(s.source_id), "duplicate " + s.source_id);
      seen.add(s.source_id);
      for (const a of s.source_aliases || []) {
        assert.ok(!aliases.has(a), "alias double-mapped " + a);
        aliases.set(a, s.source_id);
      }
    }
    assert.ok(seen.has("SRC-000005") && aliases.get("SRC-H-001") === "SRC-000005");
  });
  it("registry rules forbid alias-as-identity", () => {
    assert.equal(reg.rules.alias_is_canonical_identity, false);
  });
});

describe("periodic navigation", () => {
  const nav = load("data/navigation/periodic-table.json");
  const per = load("book/periodic.json");
  it("covers Z 1-118 exactly once", () => {
    const zs = nav.elements.map((e) => e.z).sort((a, b) => a - b);
    assert.deepEqual(zs, Array.from({ length: 118 }, (_, i) => i + 1));
  });
  it("published cells match elements index", () => {
    const els = load("book/elements.json").elements.filter((e) => e.z);
    const pub = per.cells.filter((c) => c.published);
    assert.equal(pub.length, els.length);
    for (const c of pub) assert.ok(c.chapter && c.mat, "published cell needs chapter + mat");
  });
});

describe("book sync", () => {
  it("manifest has atlas section and renamed chapter", () => {
    const man = load("book/manifest.json");
    const secs = man.chapters.map((c) => c.section);
    assert.ok(secs.includes("Material Atlas Table"));
    const ids = man.chapters.flatMap((c) => c.items.map((i) => i.id));
    assert.ok(ids.includes("docs/00-front-matter/03-How-to-Use-MAT-Codex.md"));
  });
});
