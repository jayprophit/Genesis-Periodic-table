# MAT Changelog

All significant changes to the Materials Atlas Table Codex are recorded here.

---

# Unreleased

## Added

- Materials Atlas Table Codex project identity.
- MAT root documentation architecture.
- MAT front matter.
- MAT foundations.
- Causali E original-text preservation system.
- Causali E formalization framework.
- Causali E testable-hypothesis registry.
- Universal MAT schema.
- Field dictionary.
- Identifier system.
- Units and reference-condition standard.
- Evidence and provenance standard.
- Uncertainty and confidence standard.
- Null and missing-data standard.
- Knowledge-graph relationship system.
- Time, scale and environment model.
- MAT research methodology.
- Validation and replication methodology.
- Source, citation and patent methodology.
- Safety and dual-use standard.
- Scientific-principle library.
- Mathematics framework.
- Physics framework.
- Chemistry framework.
- Materials-science framework.
- Quantum-mechanics framework.
- Nuclear-science framework.
- Thermodynamics framework.
- Systems, causality and information framework.
- MAT visual system.
- Graph, image, table and 3D standards.
- Asset naming system.
- Reusable record templates.
- Master indexes.
- Contributor and intellectual-lineage system.
- Project governance.
- Data-quality rules.
- Genesis-to-MAT migration system.
- Glossary and symbol registry.
- Versioned machine-enforced JSON Schemas (`data/schema/1.0.0/`).
- Executable validation suite (`npm run validate`: records, sources, relationships, assets, links, identifiers, book sync).
- Canonical source-ID normalization (aliases retained, e.g. `SRC-H-*`, `SRC-000164`).
- Hydrogen record validated PASS (patches classified in its validation document).
- Element records 0001–0009 published with visual galleries, 3D scenes and search indexes.
- Reader regrouped: Material Atlas Table dominant; guide sections under one parent.

## Changed

- Project evolved from Genesis Periodic Table to Materials Atlas Table Codex.
- Primary record filenames no longer use the `G` prefix.
- `0000` reserved as MAT foundation/reference record.
- Project-level schema removed conceptually from numbered-record content and relocated into `docs/`.
- Legacy E0–E6 evidence classes replaced for new records by descriptive evidence types plus separate confidence and replication fields.
- Generic `N/A` replaced by explicit MAT null states.
- Generic "element frequency" concept replaced by mechanism-specific frequency/spectral categories.
- Intrinsic magnetic properties separated from engineered magnetization and field topology.

## Preserved

- Original Causali E text.
- Legacy Genesis records pending migration.
- Historical evidence classifications for migration traceability.

## Pending

- Register Carbon sources SRC-000084–SRC-000090 (referenced but unregistered; titles absent from record).
- Complete People and Intellectual Lineage records.
- Migrate remaining legacy Genesis records.
- 0000 final validation pass (record exists and is RESEARCHED; PATCH-009 tied to it).
- Publish element records 0010+.
- Canonical relationship-ID migration (pre-API; legacy REL-* kept as aliases).
