# MAT Identifier System

## Purpose

MAT identifiers provide permanent references that remain usable even if folders or presentation formats change.

---

# 1. Primary Records

Primary MAT records use four digits.

```text
0000
0001
0002
...
```

Examples:

```text
0000-Origin-State
0001-Hydrogen-H
0002-Helium-He
```

`0000` is reserved for the MAT foundation/reference record.

---

# 2. Primary Record Filenames

Element record format:

```text
NNNN-ElementName-Symbol.md
```

Example:

```text
0001-Hydrogen-H.md
```

Do not add `MAT-`, `Genesis-`, `G-`, or another project prefix to individual primary record filenames.

---

# 3. Canonical Record IDs

Machine-readable canonical identifier:

```text
MAT:0001
```

This canonical ID may appear inside metadata even though the filename has no MAT prefix.

---

# 4. Child Object IDs

Child objects use namespaces.

Examples:

```text
MAT:0001:ISO:H-1
MAT:0001:ISO:H-2
MAT:0001:ISO:H-3

MAT:0001:ION:H+1
MAT:0001:MOL:H2

MAT:0006:ALLOTROPE:DIAMOND
MAT:0006:ALLOTROPE:GRAPHITE
MAT:0006:MATERIAL:GRAPHENE
```

---

# 5. Namespace Classes

Recommended namespaces:

```text
ISO       isotope
NUC       nuclear state
ION       ion
QSTATE    quantum state
ESTATE    electronic state
MOL       molecule
CMP       compound
ALLOTROPE allotrope
PHASE     phase
MAT       material
PROC      process
RXN       reaction
ENV       environment
APP       application
EXP       experiment
CALC      calculation
SRC       source
FIG       figure
GRAPH     graph
TABLE     table
MODEL     model
REL       relationship
```

---

# 6. Property IDs

Properties use hierarchical dot notation.

Examples:

```text
identity.atomic-number
nuclear.half-life
electronic.ionization-energy.first
thermal.melting-point
mechanical.youngs-modulus
magnetic.saturation-magnetization
spectral.electronic-transition
```

Property IDs should be stable even if display labels change.

---

# 7. Source IDs

Sources receive identifiers such as:

```text
SRC-000001
SRC-000002
SRC-000003
```

One source may support many records.

---

# 8. Measurement IDs

Individual measurement objects may use:

```text
MEAS-0001-000001
```

where:

- `0001` identifies the primary record;
- the final sequence identifies the measurement.

---

# 9. Relationship IDs

Example:

```text
REL-0001-000001
```

A relationship contains explicit source and target IDs.

---

# 10. Asset IDs

Recommended asset format:

```text
0001-Hydrogen-H-FIG-001.png
0001-Hydrogen-H-GRAPH-001.svg
0001-Hydrogen-H-TABLE-001.csv
0001-Hydrogen-H-MODEL-001.glb
```

---

# 11. Versioning

Record identity and record version are separate.

Example:

```yaml
mat_id: MAT:0001
record_version: 1.4.0
schema_version: 1.0.0
```

Changing information does not normally change the MAT identifier.

---

# 12. Deleted or Superseded IDs

Permanent IDs should not normally be recycled.

A superseded object should retain its identifier and contain:

```yaml
status: SUPERSEDED
superseded_by:
```

This preserves citation integrity.

---
