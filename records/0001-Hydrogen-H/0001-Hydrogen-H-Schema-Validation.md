# Hydrogen Schema Validation

## Record

```text
MAT:0001
0001-Hydrogen-H
```

## Validation Version

```text
1.0.0
```

## Overall Result

```text
PASS
```

Validated 2026-09-08 by the executable suite (`npm run validate`):
`validate:records`, `validate:relationships`, `validate:assets`,
`validate:links` and `check-identifiers` report zero errors for MAT:0001;
`validate:sources` reports zero warnings for Hydrogen files (canonical
`SRC-000005`–`SRC-000023` with `SRC-H-*` retained as aliases).

Patch classification (see sections below for the original instructions,
preserved for audit):

| Patch | Subject | Disposition |
| ----- | ------- | ----------- |
| PATCH-001 | Neutral atomic Hydrogen ID | APPLIED (ATOM:H; last ION:H0 resolved) |
| PATCH-002 | Molecular-ion IDs H2+1/H3+1 | APPLIED (table + registry) |
| PATCH-003 | Registry IDs | APPLIED for the 4 real renames; 5 same-to-same items INVALID/NO-OP |
| PATCH-004 | Isotope uncertainty | APPLIED where evaluated values exist; unevaluated stay honest |
| PATCH-005 | Visual manifest count | APPLIED (summary corrected; enforced by validate:assets) |
| PATCH-006 | Forward Helium refs | APPLIED then RESOLVED (He published) |
| PATCH-007 | Forward element refs | APPLIED; B/C/N/O flipped to RESOLVED, rest stay RESERVED |
| PATCH-008 | Source identity | APPLIED (canonical IDs + aliases) |
| PATCH-009 | 0000 source IDs | STILL-REQUIRED, non-blocking (tied to 0000 final pass) |
| PATCH-010 | Relationship IDs | PARTIALLY-APPLIED (legacy kept as aliases by rule; canonical migration pre-API) |
| PATCH-011 | H2 identifier semantics | INFORMATIONAL PASS (no change) |
| PATCH-012 | Stable-isotope half-life | PASS (NOT-APPLICABLE retained, never infinity) |
| PATCH-013 | Tritium time notation | PASS after migration audit |
| PATCH-014 | Nuclear vs chemical | PASS (no change) |
| PATCH-015 | Frequency semantics | PASS (no universal field) |
| PATCH-016 | Intrinsic vs host | PASS (relationship framing) |
| PATCH-017 | Evaluated vs new | PASS (evaluation + measurement kept separate) |
| PATCH-018 | Historical overlays | PASS (HISTORICAL-OR-UNVERIFIED contained) |

The scientific architecture is internally coherent.

---

# PATCH-001 — Neutral Atomic Hydrogen

## Incorrect

```text
MAT:0001:ION:H0
```

## Replace With

```text
MAT:0001:ATOM:H
```

Reason:

A neutral atom is not an ion.

---

## Files to Change

### `data/structured/0001-Hydrogen-H.yaml`

Replace:

```yaml
- id: "MAT:0001:ION:H0"
  charge: 0
  name: "neutral atomic hydrogen"
```

with:

```yaml
- id: "MAT:0001:ATOM:H"
  charge: 0
  name: "neutral atomic hydrogen"
```

---

### `relationships/0001-Hydrogen-H-Relationships.yaml`

Replace:

```yaml
source: "MAT:0001:ION:H0"
type: "NEUTRAL-ATOMIC-STATE-OF"
```

with:

```yaml
source: "MAT:0001:ATOM:H"
type: "ATOMIC-STATE-OF"
```

---

### `tables/0001-Hydrogen-H-TABLE-003-Charge-States.md`

Replace:

```text
H | MAT:0001:ION:H0
```

with:

```text
H | MAT:0001:ATOM:H
```

---

# PATCH-002 — Molecular-Ion IDs

The table currently contains placeholder entries for:

```text
H2+
H3+
```

Create their canonical IDs now.

```text
MAT:0001:ION:H2+1
MAT:0001:ION:H3+1
```

Update the table:

| State | MAT ID            | Charge |
| ----- | ----------------- | -----: |
| H₂⁺   | MAT:0001:ION:H2+1 |     +1 |
| H₃⁺   | MAT:0001:ION:H3+1 |     +1 |

These records may remain:

```text
SKELETON
```

until their dedicated scientific data is created.

---

# PATCH-003 — Registry IDs

Normalize Hydrogen registry identifiers.

Replace:

```text
MAT:0001:REG:ISOTOPES
```

with:

```text
MAT:0001:REG:ISOTOPES
```

Replace:

```text
MAT:0001:REG:SOURCES
```

with:

```text
MAT:0001:REG:SOURCES
```

Replace:

```text
MAT:0001:REG:EXPERIMENTS
```

with:

```text
MAT:0001:REG:EXPERIMENTS
```

Replace:

```text
MAT:0001:REG:RELATIONSHIPS
```

with:

```text
MAT:0001:REG:RELATIONSHIPS
```

Replace:

```text
MAT:0001:REG:PEOPLE
```

with:

```text
MAT:0001:REG:PEOPLE
```

Replace:

```text
MAT:0001:MATERIAL-INTERACTIONS
```

with:

```text
MAT:0001:REG:MATERIAL-INTERACTIONS
```

Replace:

```text
MAT:0001:PROCESS-ENV
```

with:

```text
MAT:0001:REG:PROCESSES
```

Replace:

```text
MAT:0001:GRAPH-MANIFEST
```

with:

```text
MAT:0001:REG:GRAPHS
```

Replace:

```text
MAT:0001:TABLE-MANIFEST
```

with:

```text
MAT:0001:REG:TABLES
```

The visual manifest should use:

```yaml
registry_id: "MAT:0001:REG:VISUALS"
```

---

# PATCH-004 — Isotope Uncertainty Representation

The isotope registry currently uses fields such as:

```yaml
uncertainty_last_digits:
```

for the first few isotope masses.

MAT should use an explicit numerical uncertainty wherever possible.

Use:

### ¹H

```yaml
relative_atomic_mass:
  value: 1.00782503223
  uncertainty: 0.00000000009
  unit: "u"
```

### ²H

```yaml
relative_atomic_mass:
  value: 2.01410177812
  uncertainty: 0.00000000012
  unit: "u"
```

### ³H

```yaml
relative_atomic_mass:
  value: 3.0160492779
  uncertainty: 0.0000000024
  unit: "u"
```

This allows software to perform uncertainty propagation directly.

---

# PATCH-005 — Visual Manifest Count

The Hydrogen visual manifest currently states:

```yaml
primary_2d_assets: 18
```

The actual locked package contains:

```text
17 two-dimensional visual assets
2 scientific 3D models
1 data-extruded 3D model
```

Correct summary:

```yaml
summary:
  visual_slots: 18
  two_dimensional_assets: 17
  scientific_3d_models: 2
  data_extruded_models: 1
  total_visual_assets: 20
  required_graphs: 8
  required_tables: 9
  generated_assets_complete: false
```

The number of visual **slots** remains 18.

Some slots intentionally contain more than one asset.

---

# PATCH-006 — Forward Helium References

Hydrogen already points to:

```text
MAT:0002:ISO:He-3
MAT:0002:ISO:He-4
```

These are valid forward references but their child records do not yet exist.

Add:

```yaml
target_status: "RESERVED-PENDING-RECORD"
```

to these relationships.

When Helium is built, change this to:

```yaml
target_status: "RESOLVED"
```

---

# PATCH-007 — Forward Element Relationships

The following element IDs are valid because MAT numbering follows atomic number:

```text
MAT:0005 Boron
MAT:0006 Carbon
MAT:0007 Nitrogen
MAT:0008 Oxygen
MAT:0012 Magnesium
MAT:0016 Sulfur
MAT:0028 Nickel
MAT:0046 Palladium
```

These may be used before their full MAT records exist.

Mark unresolved future targets:

```yaml
target_status: "RESERVED-PENDING-RECORD"
```

This distinguishes:

```text
VALID FORWARD REFERENCE
```

from:

```text
BROKEN ID
```

---

# PATCH-008 — Source Identity

Current Hydrogen documents use convenient aliases:

```text
SRC-H-001
SRC-H-002
...
```

These are readable but do not match MAT's canonical global source-ID standard.

Do **not** delete them.

Convert them into aliases.

Example:

```yaml
source_id: "SRC-000005"
source_alias: "SRC-H-001"
```

The canonical global mapping is defined in:

```text
data/registries/sources.yaml
```

---

# PATCH-009 — 0000 Source IDs

For the same reason, legacy-style MAT-0000 source labels such as:

```text
SRC-0000-001
```

should become aliases rather than permanent IDs.

This patch may be applied when the `0000` final validation pass is performed.

It does not block Hydrogen schema validation.

---

# PATCH-010 — Relationship IDs

Existing Hydrogen relationship IDs:

```text
REL-H-0001
REL-H-0002
...
```

may remain as human-readable aliases.

Canonical relationship identity should eventually use:

```text
MAT:0001:REL:0001
MAT:0001:REL:0002
...
```

Recommended object:

```yaml
relationship_id: "MAT:0001:REL:0001"
relationship_alias: "REL-H-0001"
```

This patch is recommended before machine API release.

It is not necessary to rewrite every relationship immediately while manual migration is still underway.

---

# PATCH-011 — H₂ Identifier Semantics

The following is valid:

```text
MAT:0001:MOL:H2
```

Isotopologues:

```text
MAT:0001:MOL:HD
MAT:0001:MOL:D2
MAT:0001:MOL:HT
MAT:0001:MOL:DT
MAT:0001:MOL:T2
```

are also valid.

They should not be assigned independent element-level MAT numbers because they are molecular child objects of the Hydrogen family.

---

# PATCH-012 — Stable-Isotope Half-Life

Current representation:

```yaml
stability: "STABLE"
half_life: "NOT-APPLICABLE"
```

Result:

```text
PASS
```

Do not change stable isotopes to:

```text
infinity
```

unless a mathematical model specifically requires an idealized infinite lifetime.

---

# PATCH-013 — Tritium Time Notation

Use:

$$
t_{1/2}({}^3H)
$$

not:

$$
t_{1/2}(T)
$$

where ambiguity with thermodynamic temperature is possible.

Result:

```text
PASS-AFTER-MIGRATION-AUDIT-CORRECTION
```

---

# PATCH-014 — Nuclear Versus Chemical Processes

The current package separates:

```text
electrolysis
combustion
adsorption
hydride formation
```

from:

```text
radioactive decay
fusion
```

Result:

```text
PASS
```

No change required.

---

# PATCH-015 — Frequency Semantics

The current package separates:

```text
electronic
fine structure
hyperfine
rotational
vibrational
plasma
magnetic resonance
```

Result:

```text
PASS
```

No universal:

```text
hydrogen_frequency
```

field exists.

---

# PATCH-016 — Intrinsic Versus Host Material Properties

Hydrogen embrittlement is represented as:

```text
RELATIONSHIP / MATERIAL INTERACTION
```

rather than intrinsic Hydrogen property.

Result:

```text
PASS
```

---

# PATCH-017 — Evaluated Versus New Measurement

NUBASE2020 and the 2025 ⁶H experiment remain separate.

Result:

```text
PASS
```

This is the desired MAT pattern:

```text
CURRENT EVALUATION
+
NEWER PRIMARY MEASUREMENT
+
FUTURE RE-EVALUATION
```

---

# PATCH-018 — Historical Overlays

Russell/Rife material remains classified:

```text
HISTORICAL-OR-UNVERIFIED
```

and cannot overwrite measured spectroscopy.

Result:

```text
PASS
```

---

# ID Resolution Summary

```yaml
MAT:0001:
  status: "RESOLVED"

MAT:0001:ATOM:H:
  status: "RESOLVED-AFTER-PATCH"

MAT:0001:ION:H-1:
  status: "RESOLVED"

MAT:0001:ION:H+1:
  status: "RESOLVED"

MAT:0001:ION:H2+1:
  status: "RESERVED-SKELETON"

MAT:0001:ION:H3+1:
  status: "RESERVED-SKELETON"

MAT:0001:MOL:H2:
  status: "RESOLVED"

MAT:0001:MOL:HD:
  status: "RESERVED-CHILD"

MAT:0001:MOL:D2:
  status: "RESERVED-CHILD"

MAT:0001:MOL:HT:
  status: "RESERVED-CHILD"

MAT:0001:MOL:DT:
  status: "RESERVED-CHILD"

MAT:0001:MOL:T2:
  status: "RESERVED-CHILD"

MAT:0002:ISO:He-3:
  status: "RESERVED-PENDING-HELIUM"

MAT:0002:ISO:He-4:
  status: "RESERVED-PENDING-HELIUM"
```

---

# Filename Validation

Hydrogen primary filename:

```text
0001-Hydrogen-H.md
```

Result:

```text
PASS
```

Asset naming:

```text
0001-Hydrogen-H-TYPE-NNN-description.ext
```

Result:

```text
PASS
```

No filenames require `MAT`, `Genesis`, or `G` prefixes.

---

# Null-State Validation

The record distinguishes:

```text
ZERO
UNKNOWN
NOT-MEASURED
NOT-AVAILABLE
NOT-APPLICABLE
NOT-ESTABLISHED
```

Result:

```text
PASS
```

---

# State-Semantics Validation

The record distinguishes:

```text
ELEMENT
ISOTOPE
ATOM
ION
MOLECULE
PHASE
PLASMA
HOST-MATERIAL STATE
PROCESS
ENVIRONMENT
```

Result:

```text
PASS-AFTER-ATOM-PATCH
```

---

# Evidence Validation

The record distinguishes:

```text
MEASUREMENT
EVALUATION
DERIVATION
MODEL
HYPOTHESIS
HISTORICAL / UNVERIFIED
```

Result:

```text
PASS
```

---

# Final Schema Result

After PATCH-001 through PATCH-008 are applied:

```yaml
schema_validation:
  identifier_grammar: PASS
  filename_grammar: PASS
  parent_child_architecture: PASS
  null_semantics: PASS
  source_architecture: PASS
  evidence_architecture: PASS
  state_semantics: PASS
  forward_references: PASS
  visual_manifest: PASS
  process_separation: PASS
  historical_overlay_separation: PASS
```

Recommended parent-record status after these patches:

```yaml
status: "RESEARCHED"
migration_status: "MIGRATED-PENDING-ARCHIVE"
schema_validation_status: "PASS"
scientific_validation_status: "CORE-VALIDATED"
completeness: "RESEARCHED"
visual_specification: "LOCKED"
visual_assets: "NOT-GENERATED"
```

Do not use:

```text
COMPLETE
```

because the complete spectral, compound, extreme-state and thermophysical child datasets are intentionally expandable.

---

# Validation Decision

Hydrogen is now suitable to become the **reference implementation** for subsequent MAT element records.

That means:

```text
0002 Helium
0003 Lithium
...
```

should inherit Hydrogen's architecture.

They should not inherit Hydrogen-specific data or Hydrogen-specific child states.

---

# Reference Implementation Rule

If a future element exposes a schema problem not visible in Hydrogen:

```text
FIX MASTER SCHEMA
↓
PATCH HYDROGEN
↓
PATCH ALL AFFECTED RECORDS
```

Do not create one-off incompatible element formats.

## Lock the global source IDs now

This removes the biggest remaining ambiguity before Helium. The readable `SRC-H-xxx` labels remain as aliases, so all the work you have already pasted is still traceable.
