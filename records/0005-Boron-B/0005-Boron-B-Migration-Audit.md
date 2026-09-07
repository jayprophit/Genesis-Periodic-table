# G0005 → MAT:0005 Migration Audit

## Legacy

```text
G0005 — Boron
```

## Replacement

```text
MAT:0005
records/0005-Boron-B/
```

## Result

```text
CONTENT-MIGRATED
```

---

# AUDIT-001 — Atomic Identity

Legacy:

```text
1s2 2s2 2p1
2P°1/2
```

Status:

```text
MIGRATED
```

Boron becomes MAT's first p-block reference implementation.

---

# AUDIT-002 — Electron Deficiency

Legacy identifies electron-deficient bonding as central.

Status:

```text
PRESERVED + FORMALIZED
```

MAT represents:

```text
electron count
multicentre bonding
cluster topology
material structure
```

as linked but separate fields.

---

# AUDIT-003 — Multicentre Bonding

Legacy:

```text
multicentre bonding
```

Status:

```text
PRESERVED
```

MAT explicitly supports:

```text
3c-2e
```

but does not claim that every Boron bond is three-centre/two-electron.

---

# AUDIT-004 — B12 Geometry

Legacy identifies:

```text
B12 icosahedral organisation
```

as a major Boron geometry.

Status:

```text
PRESERVED-AS-CORE-STRUCTURAL-MOTIF
```

Correction:

```text
IDEAL ICOSAHEDRAL DESCRIPTOR
!=
PERFECT RIGID REGULAR ICOSAHEDRON
```

---

# AUDIT-005 — Geometry as Material Variable

Legacy proposes that real Boron geometry should influence MAT's relationship geometry rather than being manually forced.

Status:

```text
PRESERVED
```

This is an important MAT principle:

$$
\text{physical geometry data}
\rightarrow
\text{relationship weighting input}
$$

not:

$$
\text{designer preference}
\rightarrow
\text{forced geometry}
$$

---

# AUDIT-006 — Multiple Allotropes

Legacy:

```text
rhombohedral
tetragonal
high-pressure
```

Status:

```text
PRESERVED + EXPANDED
```

MAT explicitly distinguishes:

```text
alpha-B12
beta-B106
gamma-B28
tetragonal families
amorphous B
```

---

# AUDIT-007 — gamma-B28

Legacy high-pressure phase:

```text
gamma-B28
```

Status:

```text
PRESERVED + SOURCED
```

Its B12/B2 structural organization and partial charge-transfer description remain state-specific.

---

# AUDIT-008 — Metallisation / Superconductivity

Legacy:

```text
pressure-induced metallisation
superconductivity
```

Status:

```text
PRESERVED + CONDITIONED
```

Correction:

```text
EXTREME-PRESSURE PROPERTY
!=
AMBIENT ELEMENTAL PROPERTY
```

---

# AUDIT-009 — Boron-10

Legacy identifies ¹⁰B as:

```text
high neutron-capture isotope
```

Status:

```text
PRESERVED + QUANTIFIED
```

MAT adds:

```text
reference neutron speed
cross section
reaction products
branching
Q-value
```

---

# AUDIT-010 — Boron-11

Legacy:

```text
p + 11B -> 3 alpha
```

Status:

```text
PRESERVED + QUANTIFIED
```

MAT derived:

$$
Q\approx8.682112\ {\rm MeV}
$$

and explicitly separates:

```text
ESTABLISHED NUCLEAR REACTION
```

from:

```text
MATURE COMMERCIAL FUSION SYSTEM
```

---

# AUDIT-011 — Isotope Functional Divergence

Legacy main result:

```text
10B → neutron capture
11B → proton-fusion research
```

Status:

```text
PRESERVED-AS-CORE-ISOTOPE-RULE
```

This strongly validates MAT's isotope-first architecture.

---

# AUDIT-012 — H-B Dual Relationship

Legacy contains both:

```text
BORANES
```

and:

```text
p-11B NUCLEAR REACTION
```

Status:

```text
PRESERVED-AS-SEPARATE-EDGE-TYPES
```

Chemical and nuclear adjacency are not merged.

---

# AUDIT-013 — B4C

Legacy Boron-carbide relationship:

```text
PRESERVED
```

Hardness and neutron behavior remain properties of B₄C material states.

They are not copied into elemental Boron.

---

# AUDIT-014 — BN

Legacy Boron-nitride relationship:

```text
PRESERVED + EXPANDED
```

MAT distinguishes:

```text
h-BN
c-BN
w-BN
nanostructured BN
```

rather than assigning one BN property set.

---

# AUDIT-015 — B2O3 / Borosilicate

Legacy glass relationship:

```text
PRESERVED
```

MAT represents:

```text
B
Si
O
composition
network topology
thermal expansion
processing
```

as the complete material state.

---

# AUDIT-016 — Borides / MgB2

Legacy:

```text
metal borides
MgB2
```

Status:

```text
PRESERVED
```

Superconductivity of MgB₂ belongs to the compound.

It does not make ordinary elemental Boron a conventional ambient superconductor.

---

# AUDIT-017 — Doping

Legacy Boron-doped semiconductor/carbon relationship:

```text
PRESERVED + FORMALIZED
```

MAT uses:

$$
\text{host}
+
\text{B concentration}
+
\text{process}
+
\text{defects}
\rightarrow
\text{electronic state}
$$

---

# AUDIT-018 — Combustion

Legacy distinguishes theoretical combustion energy from practical burn behavior.

Status:

```text
PRESERVED
```

MAT adds:

```text
particle size
oxide layer
ignition
temperature
oxidizer
kinetics
residence time
```

---

# AUDIT-019 — Plant Biology

Legacy:

```text
essential micronutrient in plants
```

Status:

```text
PRESERVED
```

MAT does not automatically extrapolate this to equivalent human essentiality.

---

# AUDIT-020 — Nuclear Network

Legacy identifies:

```text
H-He-Li-Be-B-C
```

as an emerging nuclear transformation structure.

Status:

```text
PRESERVED-AS-TYPED-KNOWLEDGE-GRAPH
```

Edges now specify mechanisms:

```text
fusion
capture
decay
transient intermediate
```

rather than one undifferentiated "relationship."

---

# AUDIT-021 — Legacy Geometry Engine

Legacy proposes:

$$
\Gamma_{\rm geometry}(B)
=
\{
\text{icosahedral},
\text{rhombohedral},
\text{polyhedral},
\text{cluster-based}
\}
$$

Status:

```text
PRESERVED-AS-DATA-DESCRIPTOR
```

The visual/table geometry engine may consume these descriptors.

It must not claim they define a unique global periodic-table geometry.

---

# AUDIT-022 — Historical Locked Status

Legacy:

```text
PRODUCTION ELEMENT — LOCKED
```

Status:

```text
HISTORICAL-ONLY
```

MAT validation is independent.

---
