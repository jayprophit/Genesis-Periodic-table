# G0003 → MAT:0003 Migration Audit

## Legacy

```text
G0003 — Lithium
```

## Replacement

```text
MAT:0003
records/0003-Lithium-Li/
```

## Result

```text
CONTENT-MIGRATED
```

---

# Section Mapping

| Legacy Topic                     | MAT Treatment                         |
| -------------------------------- | ------------------------------------- |
| atomic identity                  | MIGRATED                              |
| open-shell alkali character      | MIGRATED                              |
| isotope family                   | MIGRATED + corrected status semantics |
| ⁶Li nuclear branch               | MIGRATED                              |
| ⁷Li neutron branch               | MIGRATED                              |
| nuclear fuel-cycle enabling role | MIGRATED                              |
| radioactive branches             | MIGRATED                              |
| ¹¹Li halo geometry               | MIGRATED                              |
| core + valence structure         | MIGRATED                              |
| 670.8 nm spectrum                | EXPANDED to doublet                   |
| atom/bulk magnetic separation    | MIGRATED                              |
| low-density metal                | MIGRATED                              |
| thermal state                    | MIGRATED                              |
| pressure phases                  | MIGRATED                              |
| Li⁺ electrochemistry             | MIGRATED                              |
| battery architecture             | MIGRATED                              |
| battery metrics                  | FORMALIZED                            |
| element ≠ whole battery          | PRESERVED                             |
| Li–C                             | MIGRATED                              |
| Li–Si                            | MIGRATED                              |
| Li–O                             | MIGRATED                              |
| Li–H                             | MIGRATED                              |
| Li–N                             | MIGRATED                              |
| fusion blanket system            | MIGRATED                              |
| plasma/MHD                       | CONDITIONED                           |
| biological Li⁺                   | MIGRATED                              |
| organic chemistry                | MIGRATED                              |
| inorganic compounds              | MIGRATED                              |
| manufacturing                    | MIGRATED                              |
| safety                           | MIGRATED                              |
| energy pathways                  | MIGRATED                              |
| Causali E examples               | FORMALIZED                            |
| H–He–Li triangle                 | PRESERVED AS TYPED GRAPH              |
| conventional periodic relation   | PRESERVED                             |
| multidimensional geometry        | PRESERVED                             |

---

# AUDIT-001 — Electron-Donation “Score”

Legacy:

```text
strong electron-donation tendency
```

Scientific property retained through measurable quantities such as:

```text
ionization energy
oxidation state
electrode potential of defined couple
electron affinity relationships
```

No arbitrary universal scalar score is required.

Status:

```text
FORMALIZED
```

---

# AUDIT-002 — Mass-Efficiency Score

Legacy describes Lithium as having a high mass-efficiency score.

MAT replaces this with explicit properties:

```text
density
specific capacity
specific energy of defined systems
alloy density
strength-to-weight metrics
```

Status:

```text
UNDEFINED-SCORE-DEPRECATED
CONCEPT-PRESERVED
```

---

# AUDIT-003 — Energy-System Connectivity Score

Legacy gives Lithium high energy connectivity.

MAT retains this as typed graph degree across:

```text
electrochemical
nuclear
thermal
structural
```

domains rather than one arbitrary scalar.

Status:

```text
FORMALIZED
```

---

# AUDIT-004 — Lithium-Ion Battery Distinction

Legacy explicitly states:

```text
Lithium metal
!=
Lithium-ion battery chemistry
```

Status:

```text
PRESERVED-AS-CORE-RULE
```

---

# AUDIT-005 — Geometry Enables Chemistry

Legacy identifies graphite host geometry as critical to reversible Lithium storage.

Status:

```text
PRESERVED + EXPANDED
```

MAT representation:

```text
composition
+
crystal topology
+
available sites
+
diffusion pathways
+
electrochemical state
```

---

# AUDIT-006 — Li-Si Tradeoff

Legacy:

```text
high capacity
versus
mechanical expansion/stability
```

Status:

```text
PRESERVED
```

This becomes a canonical multi-objective materials-design example.

---

# AUDIT-007 — Fusion Blanket Is a System

Legacy correctly rejects:

```text
fusion blanket = just lithium
```

Status:

```text
PRESERVED
```

Blanket state may include:

```text
Li-bearing breeder
structural material
neutron multiplier
coolant
magnetic environment
temperature
irradiation history
```

---

# AUDIT-008 — MHD

Legacy correctly conditions MHD relevance on a conducting liquid/plasma state and applied fields.

Status:

```text
PRESERVED
```

No generic:

```text
lithium has MHD property
```

field is permitted.

---

# AUDIT-009 — Biological Lithium

Legacy distinguishes:

```text
Li+
bioactive ion
```

from elemental Lithium metal.

Status:

```text
PRESERVED
```

---

# AUDIT-010 — ¹¹Li Halo Geometry

Legacy adds nuclear-halo geometry.

Status:

```text
PRESERVED
```

Required visual distinction:

```text
NUCLEAR MATTER DISTRIBUTION
!=
ATOMIC ELECTRON CLOUD
```

---

# AUDIT-011 — Lithium Spectral Vector

Legacy rounded the red resonance feature to:

```text
~670.8 nm
```

MAT resolves this into the fine-structure doublet near:

```text
670.776 nm
670.791 nm
```

Status:

```text
EXPANDED
```

---

# AUDIT-012 — Isotope Semantic Correction

Legacy grouped ³Li–¹³Li under the isotope branch.

MAT preserves all evaluated states but distinguishes:

```text
BOUND STABLE NUCLIDE
RADIOACTIVE NUCLIDE
PROTON-UNBOUND STATE
NEUTRON-UNBOUND RESONANCE
ESTIMATED / UNCERTAIN STATE
```

Status:

```text
CORRECTED
```

---

# AUDIT-013 — H–He–Li Triangle

Legacy:

```text
H ↔ He
Li ↔ H
Li ↔ He
```

Status:

```text
PRESERVED
```

But every edge now receives a mechanism:

```text
fusion
hydride chemistry
tritium breeding
neutron reaction
```

---

# AUDIT-014 — Periodic Versus Functional Geometry

Legacy observes two different Lithium relationship directions:

```text
nuclear → H / He
electronic periodicity → Na / K / Rb / Cs / Fr
```

plus technology relationships.

Status:

```text
PRESERVED-AS-MULTILAYER-KNOWLEDGE-GRAPH
```

This is an important MAT design principle.

---
