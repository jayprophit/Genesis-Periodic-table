# Boron Schema Validation

```yaml
record_id: "MAT:0005"
validation_version: "1.0.0"
overall: "PASS"
```

## Atomic Identity

```text
MAT:0005
MAT:0005:ATOM:B
```

PASS.

---

## Ionic States

```text
MAT:0005:ION:B+1
MAT:0005:ION:B+2
MAT:0005:ION:B+3
MAT:0005:ION:B+4
MAT:0005:ION:B+5
```

PASS.

---

## Isotope Namespace

```text
MAT:0005:ISO:B-6
...
MAT:0005:ISO:B-21
```

PASS.

---

## Stable Isotopes

```text
B-10:
  half_life: NOT-APPLICABLE

B-11:
  half_life: NOT-APPLICABLE
```

PASS.

---

## Bound Semantics

Examples:

```text
B-16 → lower-bound lifetime
B-18 → upper-bound lifetime
B-20 → lower-bound lifetime
B-21 → lower-bound lifetime
```

PASS.

Bounds remain bounds.

---

## Standard Atomic Weight

Stored as:

```text
[10.806, 10.821]
```

not silently collapsed to one fixed atomic weight.

PASS.

---

## Allotrope Namespace

Canonical states include:

```text
MAT:0005:ALLOTROPE:ALPHA-B12
MAT:0005:ALLOTROPE:BETA-B106
MAT:0005:ALLOTROPE:GAMMA-B28
MAT:0005:ALLOTROPE:T-B52
MAT:0005:ALLOTROPE:T-B192
MAT:0005:ALLOTROPE:AMORPHOUS
```

PASS.

---

## Geometry Semantics

MAT distinguishes:

```text
IDEALIZED ICOSAHEDRAL DESCRIPTOR
```

from:

```text
ACTUAL QUANTUM-MECHANICAL B12 STRUCTURE
```

PASS.

---

## Bonding Semantics

MAT supports:

```text
2c-2e
3c-2e
multicentre
electron-deficient
```

without claiming one model universally describes every bond.

PASS.

---

## Nuclear Function

Separated:

```text
10B neutron capture
11B proton-fusion research
```

PASS.

Isotope roles are not interchangeable.

---

## Chemical / Nuclear Separation

Separated:

```text
B-H boranes
```

from:

```text
H + 11B fusion reaction
```

PASS.

---

## Element / Compound Separation

Separated:

```text
B
B4C
BN
B2O3
MgB2
boranes
metal borides
borosilicate glass
```

PASS.

---

## Dopant / Host Separation

Separated:

```text
elemental B
B-doped Si
B-doped diamond
```

PASS.

---

## Pressure-State Semantics

Separated:

```text
ambient Boron
gamma-B28
metallic high-pressure B
superconducting high-pressure B
```

PASS.

---

## Frequency Semantics

No universal:

```text
boron_frequency
```

exists.

PASS.

---

## Nuclear Magnetic Resonance

NMR fields require:

```text
isotope
magnetic field
gyromagnetic ratio
environment
```

PASS.

---

## Biological Semantics

```text
plant essentiality: ESTABLISHED
human essentiality: NOT-EQUIVALENTLY-ESTABLISHED
```

PASS.

---

## Safety Semantics

Separated:

```text
elemental Boron
boric acid
borates
boranes
B4C
BN
borides
```

PASS.

---

## Resolved Cross-References

```text
MAT:0001 Hydrogen
MAT:0002 Helium
MAT:0003 Lithium
MAT:0004 Beryllium
MAT:0003:ISO:Li-7
MAT:0002:ISO:He-4
MAT:0004:ISO:Be-10
```

RESOLVED.

---

## Legal Forward References

```text
MAT:0006 Carbon
MAT:0007 Nitrogen
MAT:0008 Oxygen
MAT:0012 Magnesium
MAT:0013 Aluminium
MAT:0014 Silicon
MAT:0022 Titanium
MAT:0040 Zirconium
MAT:0072 Hafnium
```

Status:

```text
RESERVED-PENDING-RECORD
```

PASS.

---

## Visual Architecture

```yaml
visual_slots: 18
two_dimensional_assets: 19
scientific_3d_models: 2
data_extruded_models: 1
total_core_visual_assets: 22
```

PASS.

---

# Final Boron Status

After this package is pasted:

```yaml
status: "RESEARCHED"
completeness: "RESEARCHED"

migration_status: "MIGRATED-PENDING-ARCHIVE"

validation:
  schema: "PASS"
  identifiers: "PASS"
  isotope_semantics: "PASS"
  allotrope_architecture: "PASS"
  multicentre_bonding_architecture: "PASS"
  geometry_architecture: "PASS"
  nuclear_architecture: "PASS"
  material_relationship_architecture: "PASS"
  pressure_state_architecture: "PASS"
  dopant_host_architecture: "PASS"
  biological_architecture: "PASS"
  evidence_architecture: "PASS"
  scientific_core: "CORE-VALIDATED"
  exhaustive_content: false

visuals:
  specification: "LOCKED"
  generated: false
```

---

# INDEX PATCH

Update:

```text
docs/05-index/01-Record-Index.md
```

to:

```text
0005 | Boron | B | 5 | CORE-VALIDATED
```

Update:

```text
docs/07-migration/01-Legacy-File-Map.md
```

to:

```text
G0005 | records/0005-Boron-B/ | MIGRATED-PENDING-ARCHIVE
```

Do not delete the historical `G0005`.

---
