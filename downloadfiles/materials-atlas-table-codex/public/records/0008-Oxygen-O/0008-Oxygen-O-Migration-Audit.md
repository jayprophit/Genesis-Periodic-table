# G0008 → MAT:0008 Migration Audit

## Result

```text
CONTENT-MIGRATED
```

### AUDIT-001 — Atomic Oxygen

```text
PRESERVED + STATE-TYPED
```

Atomic O is not flattened into O₂.

### AUDIT-002 — Triplet O₂

```text
PRESERVED + MOLECULAR-ELECTRONIC-STATE
```

Paramagnetism is connected to molecular-orbital occupancy.

### AUDIT-003 — Singlet Oxygen

```text
PRESERVED + ELECTRONIC-STATE-ID
```

Same molecular formula does not imply same reactivity.

### AUDIT-004 — Ozone

```text
PRESERVED + MOLECULAR-CHILD
```

O₃ geometry and vibration are separate from O₂.

### AUDIT-005 — Ozone Cycle

```text
PRESERVED + CHAPMAN-LINEAGE
```

Correction:

```text
CHAPMAN MECHANISM
!=
COMPLETE MODERN OZONE CHEMISTRY
```

### AUDIT-006 — Frequency

Legacy frequency branch:

```text
PRESERVED
```

but no:

```text
oxygen_frequency
```

scalar is permitted.

### AUDIT-007 — Aurora / Airglow

Atomic visible-line concept:

```text
PRESERVED + TRANSITION-RESOLVED
```

557.7 and 630.0 nm are typed as metastable atomic transitions.

### AUDIT-008 — Liquid Oxygen

```text
PRESERVED + PHASE/SAFETY FORMALIZED
```

Correction:

```text
OXIDIZER != FUEL
```

### AUDIT-009 — Solid Oxygen Magnetism

```text
PRESERVED + EXPANDED
```

MAT distinguishes:

```text
alpha
beta
gamma
delta
epsilon
zeta
```

and their differing magnetic/electronic behavior.

### AUDIT-010 — High-Pressure Oxygen

```text
PRESERVED + EXPANDED
```

Adds:

```text
O8 clusters
metallicity
superconductivity
```

with conditions.

### AUDIT-011 — Isotopes

```text
PRESERVED + FULL CHILD ARCHITECTURE
```

### AUDIT-012 — 27O / 28O

Older unobserved/limit status:

```text
SUPERSEDED
```

Current:

```text
OBSERVED NEUTRON-UNBOUND RESONANCES
```

Source:

```text
SRC-000132
```

### AUDIT-013 — Water

```text
PRESERVED-AS-EMERGENT-COMPOUND
```

Water properties are not copied to elemental H or O.

### AUDIT-014 — Oxidation / Combustion

```text
PRESERVED + ELECTRON-TRANSFER/BOND-REARRANGEMENT MODEL
```

### AUDIT-015 — Oxides

```text
PRESERVED + FAMILY-REGISTRY
```

### AUDIT-016 — Peroxide / Superoxide

```text
PRESERVED + ELECTRON-COUNT-SEPARATED
```

### AUDIT-017 — Oxygen Vacancies

Legacy vacancy concept:

```text
PRESERVED-AS-FIRST-CLASS-STATE-VARIABLE
```

### AUDIT-018 — Semiconductor / Conductive Oxides

```text
PRESERVED
```

Correction:

```text
OXIDE != AUTOMATIC INSULATOR
```

### AUDIT-019 — Superconducting Oxides

```text
PRESERVED-AS-MATERIAL-RELATIONSHIP
```

Oxygen stoichiometry is explicitly state-resolved.

### AUDIT-020 — Solid-Oxide Electrochemistry

```text
PRESERVED + TRANSPORT-SPECIES-TYPED
```

### AUDIT-021 — Battery Oxygen Redox

```text
PRESERVED + MODERN-EVIDENCE-EXPANDED
```

Includes trapped molecular O₂ in specific Li-rich cathodes.

### AUDIT-022 — Corrosion

```text
PRESERVED + ENVIRONMENT-DEPENDENT
```

Correction:

```text
OXIDATION != ALL CORROSION
```

### AUDIT-023 — Respiration

```text
PRESERVED + BIOCHEMICAL-PROCESS-SEPARATION
```

### AUDIT-024 — Photosynthesis

```text
PRESERVED + WATER-OXIDATION-MECHANISM
```

The O₂ product is connected to water oxidation at PSII.

### AUDIT-025 — Reactive Oxygen Species

```text
PRESERVED + BIOLOGICAL-STATE-SEPARATION
```

Correction:

```text
ROS != ONLY DAMAGE
```

### AUDIT-026 — Space Atomic Oxygen

```text
PRESERVED + ENVIRONMENT-FIRST
```

Low-Earth-orbit atomic O is a specific degradation environment.

### AUDIT-027 — Geometry

Legacy geometry concepts:

```text
linear O2
bent O3
oxide lattices
defect structures
solid-Oxygen clusters
```

are:

```text
PRESERVED + EXPANDED
```

### AUDIT-028 — Legacy Locked Status

Any old:

```text
PRODUCTION ELEMENT — LOCKED
```

is historical only.

MAT validation is independent.
