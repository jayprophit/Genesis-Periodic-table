# G0004 → MAT:0004 Migration Audit

## Legacy

```text
G0004 — Beryllium
```

## Replacement

```text
MAT:0004
records/0004-Beryllium-Be/
```

## Result

```text
CONTENT-MIGRATED
```

---

# AUDIT-001 — Atomic Identity

Legacy elemental identity and electronic structure:

```text
MIGRATED
```

MAT resolves:

$$
1s^22s^2
$$

with:

$$
{}^1S_0
$$

and explicitly distinguishes:

```text
FILLED 2s SUBSHELL
```

from:

```text
CLOSED n=2 SHELL
```

---

# AUDIT-002 — HCP Metal

Legacy Beryllium-as-light-structural-metal concept:

```text
MIGRATED + EXPANDED
```

MAT adds:

```text
P63/mmc
lattice parameters
anisotropy
direction-dependent mechanics
```

---

# AUDIT-003 — High Stiffness / Low Mass

Legacy high structural-performance concept:

```text
PRESERVED
```

Undefined structural scores are replaced by:

$$
E/\rho
$$

plus explicit:

```text
strength
fracture
fatigue
density
thermal behavior
manufacturability
safety
```

---

# AUDIT-004 — X-Ray Transparency

Legacy:

```text
X-RAY TRANSPARENT
```

is scientifically tightened to:

```text
RELATIVELY LOW X-RAY ATTENUATION
AT SPECIFIED PHOTON ENERGY AND THICKNESS
```

Status:

```text
CORRECTED
```

Uses:

$$
I=I_0e^{-\mu\rho x}
$$

---

# AUDIT-005 — Beryllium Oxide

Legacy BeO material relationship:

```text
PRESERVED + EXPANDED
```

MAT distinguishes:

```text
Be metal
```

from:

```text
BeO ceramic
```

and stores the ceramic's emergent thermal/electrical properties separately.

---

# AUDIT-006 — He → Be → C Bridge

Legacy nuclear geometry:

```text
He ↔ Be ↔ C
```

Status:

```text
PRESERVED
```

MAT mechanisms:

```text
4He + 4He ↔ 8Be
8Be + 4He → 12C + gamma
```

This is nuclear geometry, not periodic-table adjacency.

---

# AUDIT-007 — ⁸Be Transient State

Legacy recognition of ⁸Be as a short-lived bridge:

```text
PRESERVED
```

MAT adds evaluated lifetime and derived Q-value.

Core rule:

```text
REAL STATE
≠
LONG-LIVED STATE
```

---

# AUDIT-008 — Neutron Science

Legacy Beryllium neutron relationship:

```text
PRESERVED + EXPANDED
```

Includes:

```text
9Be(alpha,n)12C
neutron multiplication
neutron discovery history
fusion multiplier systems
```

---

# AUDIT-009 — Lithium–Beryllium Fusion Relationship

Legacy:

```text
Li breeder
+
Be multiplier
```

Status:

```text
PRESERVED-AS-SYSTEM-RELATIONSHIP
```

Neither element alone is assigned the performance of the entire blanket.

---

# AUDIT-010 — FLiBe

Legacy FLiBe relationship:

```text
PRESERVED
```

MAT explicitly stores:

```text
Li
Be
F
composition
temperature
phase
system application
```

The molten-salt properties are not copied onto elemental Be.

---

# AUDIT-011 — Be–Cu / Be–Al

Legacy alloy relationships:

```text
PRESERVED
```

MAT classifies these as:

```text
ALLOY / MATERIAL EDGES
```

rather than intrinsic element properties.

---

# AUDIT-012 — ¹⁰Be Clock

Legacy cosmogenic-clock concept:

```text
PRESERVED
```

The long half-life is interpreted as a functional advantage for chronology rather than an energy-system disadvantage alone.

---

# AUDIT-013 — Toxicity

Legacy Beryllium hazard branch:

```text
PRESERVED + EXPANDED
```

MAT links:

```text
material form
process
particle generation
exposure
health effect
control
```

rather than simply storing:

```text
beryllium = toxic
```

---

# AUDIT-014 — Regulation

Exposure limits are explicitly tagged:

```text
JURISDICTION-SPECIFIC
TIME-DEPENDENT
REGULATORY
```

They are not universal scientific constants.

---

# AUDIT-015 — Spectral Frequency

Legacy frequency/spectral concepts:

```text
MIGRATED
```

The 234.8610 nm line is now identified as one specific atomic transition.

No:

```text
beryllium_frequency
```

scalar exists.

---

# AUDIT-016 — Multiple Geometry

Legacy Beryllium relationship geometry:

```text
nuclear
fusion
materials
ceramics
periodicity
applications
```

Status:

```text
PRESERVED-AS-MULTILAYER-KNOWLEDGE-GRAPH
```

---

# AUDIT-017 — Legacy Locked Status

Any historical:

```text
PRODUCTION ELEMENT — LOCKED
```

statement in G0004 remains a Genesis-era status only.

MAT validation is independent.

---
