# MAT Changelog

All significant changes to the Materials Atlas Table Codex are recorded here.

---

# Unreleased

## 10 September 2026 — advanced data and reader review

- Reconciled both named Genesis conversations against existing paths; retained twelve complete missing research blocks in a source-recovery queue without duplicating the evaluated isotope catalogues.
- Added derived decay constants and mean lifetimes across all 118 nuclear datasets, preserving original units, estimates, bounds and unpropagated asymmetric uncertainty.
- Added the reviewed Neon air/vacuum wavelength correction and ten selected NIST optical lines with two primary-source accessions.
- Assigned canonical relationship identities with legacy aliases, added 5,614 evaluated-state membership links to 107 previously empty registries, and registered explicit concept endpoint labels with review limits.
- Fixed mixed-case identifier parsing and supplied three missing formal atomic/ionic reference targets.
- Described all seven previously undescribed generated-model slots without changing the binary meshes.
- Added a visible tour-skip control, dialog semantics, keyboard focus handling and a separate 44-pixel tour launcher.
- Added Chromium, Firefox and WebKit reader tests and a transparent five-gate internal engineering rating; independent scientific and industry ratings remain unassigned.

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
- Canonical Carbon source registrations SRC-000084–SRC-000090 (Hoyle state, thermochemistry, graphene, Raman, LiC6, fullerene, CNT).
- Byte-preserved intake of supplied MAT files 41–52, with source-line provenance, duplicate selection, claims ledger and 74 new bibliography accessions.
- Dated NUBASE2020 catalogues for all 118 elements: 5,842 nuclear states with raw source lines, uncertainty text, state indices and explicit null semantics.
- Machine-generated record coverage, source review, local benchmark and review-brief reconciliation artifacts.
- Five-page A4 publishing proof covering guide text, precision data, equations, evaluated nuclear states and explicit review gaps.

## Changed

- Project evolved from Genesis Periodic Table to Materials Atlas Table Codex.
- Primary record filenames no longer use the `G` prefix.
- `0000` reserved as MAT foundation/reference record.
- Project-level schema removed conceptually from numbered-record content and relocated into `docs/`.
- Legacy E0–E6 evidence classes replaced for new records by descriptive evidence types plus separate confidence and replication fields.
- Generic `N/A` replaced by explicit MAT null states.
- Generic "element frequency" concept replaced by mechanism-specific frequency/spectral categories.
- Intrinsic magnetic properties separated from engineered magnetization and field topology.
- The interactive reader now indexes full chapters, distinguishes three evidence collections, groups guide material under one parent and exposes all 118 element records as the dominant atlas.
- Baseline isotope sections link to their dated nuclear catalogues and remain PARTIAL rather than implying complete records.
- Offline saving now versions 2,315 local resources, including provenance, figures, 3D scenes, datasets and the linear edition.
- Existing image descriptions are surfaced in galleries; unregistered visuals and missing model descriptions remain visibly reviewable.

## Fixed

- Renamed How to Use MAT Codex routing, heading anchors, single-letter element search and generated-index references.
- Mobile sidebar focus, Escape handling, narrow-layout overflow and minimum control target sizes.
- Print expansion of collapsed chapter sections, repeated table headers and restored reading state after printing.
- Blank rendering of legacy 3D scene coordinates; all 24 retained scenes now pass structure checks.
- Publication rebuilds avoid rewriting identical chapters and use atomic replacement for changed generated files.
- Slow chapter requests can no longer overwrite a newer reader selection.
- The cascading contents tree now stays in document order, and a persistent burger control collapses or opens the sidebar on desktop and mobile.

## Preserved

- Original Causali E text.
- Legacy Genesis records pending migration.
- Historical evidence classifications for migration traceability.

## Pending

- Complete People and Intellectual Lineage records.
- Migrate remaining legacy Genesis records.
- 0000 final validation pass (record exists and is RESEARCHED; PATCH-009 tied to it).
- Curate the baseline prose and condition-specific engineering fields for records 0010–0118; their selectable identities and dated nuclear evaluations are published.
- Canonical relationship-ID migration (pre-API; legacy REL-* kept as aliases).
