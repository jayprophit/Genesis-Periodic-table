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

---

## APPEND — Identifier System Extension 1

# Additional Controlled Namespaces

The Hydrogen production audit identified several object types that require explicit namespaces.

Add the following permanent namespaces.

| Namespace | Meaning                      | Example                      |
| --------- | ---------------------------- | ---------------------------- |
| ATOM      | atomic state/family          | `MAT:0001:ATOM:H`            |
| PLASMA    | plasma state/family          | `MAT:0001:PLASMA:H`          |
| SPEC      | spectrum/spectral feature    | `MAT:0001:SPEC:HF:001`       |
| EVAL      | formal evaluated-data object | `MAT:0001:EVAL:NUBASE2020`   |
| REG       | record-local registry        | `MAT:0001:REG:RELATIONSHIPS` |
| DIAGRAM   | visual diagram object        | `MAT:0001:DIAGRAM:001`       |

These namespaces are now reserved and must not be reused for another meaning.

---

# Atomic State

Use:

```text
MAT:NNNN:ATOM:<state>
```

for a neutral atomic-state family.

Example:

```text
MAT:0001:ATOM:H
```

Do **not** encode a neutral atom as:

```text
MAT:0001:ION:H0
```

because:

```text
ION
```

is reserved for nonzero ionic charge states.

For Hydrogen:

```text
MAT:0001:ATOM:H
MAT:0001:ION:H-1
MAT:0001:ION:H+1
```

are distinct objects.

Where isotope identity matters, the object must also reference its nuclear state.

Example:

```yaml
atomic_state_id: "MAT:0001:ATOM:H"
nuclear_state_id: "MAT:0001:ISO:H-2"
charge: 0
```

---

# Molecular Ions

Molecular ions may remain in the `ION` namespace while retaining their molecular formula.

Examples:

```text
MAT:0001:ION:H2+1
MAT:0001:ION:H3+1
```

The formula and charge are stored separately:

```yaml
id: "MAT:0001:ION:H2+1"
formula: "H2"
charge: 1
```

---

# Plasma

Use:

```text
MAT:NNNN:PLASMA:<name>
```

Example:

```text
MAT:0001:PLASMA:H
```

A plasma object is a **state family** and requires fields such as:

```text
electron temperature
ion temperature
species distribution
electron density
ion density
degree of ionisation
pressure
fields
time
```

It must not be treated as one fixed elemental property.

---

# Spectral Objects

Use:

```text
MAT:NNNN:SPEC:<mechanism>:<number>
```

Examples:

```text
MAT:0001:SPEC:HF:001
MAT:0001:SPEC:ELEC:001
MAT:0001:SPEC:VIB:001
MAT:0001:SPEC:ROT:001
```

Recommended mechanism codes:

```text
ELEC
FINE
HF
VIB
ROT
RAMAN
NMR
NUC
PLASMA
ACOUSTIC
```

The mechanism code is mandatory.

This enforces the MAT rule:

```text
NO UNIVERSAL SINGLE ELEMENT FREQUENCY
```

---

# Evaluation Objects

Use:

```text
MAT:NNNN:EVAL:<evaluation>
```

Examples:

```text
MAT:0001:EVAL:NUBASE2020
MAT:0001:EVAL:NIST-ASD
```

An evaluation is not the same as an individual experiment.

The relationship may be:

```text
EXPERIMENTS
↓
EVALUATION
↓
ADOPTED MAT VALUE
```

A newer experiment may exist without yet being incorporated into the current evaluation.

---

# Registry IDs

Record-local registries use:

```text
MAT:NNNN:REG:<registry-name>
```

Examples:

```text
MAT:0001:REG:ISOTOPES
MAT:0001:REG:SOURCES
MAT:0001:REG:EXPERIMENTS
MAT:0001:REG:RELATIONSHIPS
MAT:0001:REG:PEOPLE
MAT:0001:REG:VISUALS
MAT:0001:REG:GRAPHS
MAT:0001:REG:TABLES
MAT:0001:REG:PROCESSES
MAT:0001:REG:MATERIAL-INTERACTIONS
```

Older experimental identifiers such as:

```text
MAT:0001:REL-REGISTRY
MAT:0001:SOURCE-REGISTRY
MAT:0001:EXP-REGISTRY
MAT:0001:PEOPLE
```

are deprecated.

They should be migrated to `REG`.

---

# Diagram IDs

Diagram objects use:

```text
MAT:NNNN:DIAGRAM:<number>
```

or, when tied explicitly to a visual slot:

```text
MAT:NNNN:DIAGRAM:VNN:<number>
```

Examples:

```text
MAT:0000:DIAGRAM:001
MAT:0001:DIAGRAM:V13:001
```

Both forms are legal.

The first identifies a general diagram.

The second additionally indicates its visual slot.

---

# Forward References

MAT permits relationships to records that have canonical identities but have not yet been constructed.

Example:

```yaml
target: "MAT:0002:ISO:He-3"
target_status: "RESERVED-PENDING-RECORD"
```

This is not treated as a broken relationship.

Once the target is constructed:

```yaml
target_status: "RESOLVED"
```

Forward references are particularly important while MAT is being built sequentially.

---

# Source IDs

The canonical global source identifier remains:

```text
SRC-NNNNNN
```

Example:

```text
SRC-000008
```

Record-local mnemonic IDs such as:

```text
SRC-H-004
```

may exist only as:

```text
source_alias
```

They are not the permanent canonical source identity.

---

# Filename Rule

Internal IDs may contain:

```text
:
+
-
```

where the identifier grammar requires them.

Filenames must continue using:

```text
letters
numbers
hyphens
extension period
```

Therefore:

```text
MAT:0001:ION:H+1
```

is legal internally, but a filename should use a safe form such as:

```text
0001-Hydrogen-H-Ion-Positive-1.yaml
```

---

# Identifier Stability

After an identifier is published as canonical:

```text
DO NOT RECYCLE IT
```

If semantics change substantially, create a new identifier and use:

```yaml
status: "SUPERSEDED"
superseded_by:
```

## Hydrogen correction patch

These are exact corrections to the files you have just created.
