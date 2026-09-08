# G0002 → MAT:0002 Migration Audit

## Legacy

```text
G0002 — Helium
```

## Replacement

```text
MAT:0002
records/0002-Helium-He/
```

## Audit Principle

Every major legacy concept must be:

```text
MIGRATED
FORMALIZED
CORRECTED
EXPANDED
MOVED-TO-CHILD
MOVED-TO-RELATIONSHIP
DEPRECATED
```

---

# Legacy Section Mapping

| Legacy | Topic                                | MAT Status                 |
| -----: | ------------------------------------ | -------------------------- |
|      1 | Atomic identity                      | MIGRATED                   |
|      2 | Isotope/nuclear branch               | MIGRATED                   |
|      3 | ³He / ⁴He isotope surprise           | EXPANDED                   |
|      4 | Fusion pathways                      | MIGRATED                   |
|      5 | Alpha-particle relationship          | MIGRATED                   |
|      6 | ⁶He / ⁸He radioactive branch         | MIGRATED                   |
|      7 | Two-electron quantum structure       | MIGRATED                   |
|      8 | Pauli / closed-shell structure       | MIGRATED                   |
|      9 | Excited states                       | MIGRATED                   |
|     10 | Spectral channels                    | MIGRATED / DATASET-PENDING |
|     11 | Difference from Hydrogen             | CORRECTED                  |
|     12 | ³He magnetic channel                 | MIGRATED                   |
|     13 | Thermal-state structure              | MIGRATED                   |
|     14 | He-II                                | MIGRATED                   |
|     15 | Pressure-dependent freezing          | MIGRATED                   |
|     16 | Superfluid ³He                       | MIGRATED                   |
|     17 | Helium chemistry                     | EXPANDED / CORRECTED       |
|     18 | A-B-C examples                       | FORMALIZED                 |
|     19 | Process/environment matrix           | MIGRATED                   |
|     20 | Organic/inorganic/biological context | MIGRATED                   |
|     21 | Technology                           | MIGRATED                   |
|     22 | Energy role                          | MIGRATED                   |
|     23 | Geometry                             | MIGRATED                   |
|     24 | H ↔ He multidimensional relationship | FORMALIZED                 |
|     25 | Relationship vector                  | MIGRATED                   |
|     26 | Evidence state                       | EXPANDED                   |

---

# AUDIT-001 — Closed Shell

Legacy:

```text
first closed-shell anchor
```

Status:

```text
PRESERVED
```

Scientific formulation:

```text
1s²
¹S₀
closed electronic shell
```

The phrase "anchor" remains a MAT architectural description rather than a separate physical observable.

---

# AUDIT-002 — ³He / ⁴He Quantum Statistics

Legacy core result:

$$
{}^3He
\rightarrow
\text{fermionic atom}
$$

$$
{}^4He
\rightarrow
\text{bosonic atom}
$$

Status:

```text
PRESERVED + EXPANDED
```

This becomes a first-class isotope-state relationship.

---

# AUDIT-003 — Nuclear Energy Paths

Legacy includes:

```text
D-T
D-3He
3He-3He
```

Status:

```text
PRESERVED AS NUCLEAR RELATIONSHIPS
```

These must remain separate from ordinary chemical energy.

No fusion reaction is treated as an intrinsic ordinary material property of Helium.

---

# AUDIT-004 — Alpha Particle

Legacy:

$$
\alpha={}^4He^{2+}
$$

Status:

```text
PRESERVED
```

MAT requires explicit isotope identity:

```text
4He nucleus
```

A generic `He2+` label alone is insufficient when discussing alpha decay.

---

# AUDIT-005 — Radioactive Helium Energy

Legacy recognizes ⁶He and ⁸He as short-lived beta emitters but poor long-duration energy-storage isotopes.

Status:

```text
PRESERVED
```

MAT removes any undefined universal:

```text
energy-harvesting utility score
```

unless a formal scoring system is later defined.

Use explicit metrics instead:

```text
half-life
Q-value
activity
specific power
conversion method
efficiency
```

---

# AUDIT-006 — Many-Body Physics

Legacy identifies electron-electron repulsion as the new feature relative to Hydrogen.

Status:

```text
PRESERVED
```

Helium becomes MAT's first major two-electron correlation benchmark.

---

# AUDIT-007 — Ground-State Magnetism

Legacy describes neutral ground-state Helium as electronically diamagnetic with no permanent electronic magnetic moment.

Status:

```text
PRESERVED WITH STATE QUALIFICATION
```

This applies to the specified ground electronic state.

It must not erase isotope-specific nuclear magnetism, especially ³He.

---

# AUDIT-008 — Spectroscopy

Legacy correctly rejects a single Helium frequency.

Status:

```text
PRESERVED
```

MAT separates:

```text
electronic
fine structure
metastable
isotope shift
3He hyperfine
NMR
plasma
excimer
collective-fluid excitation
```

---

# AUDIT-009 — Molecular Vibration Correction

Legacy states:

```text
ordinary monatomic helium has no molecular bond vibration
```

This remains valid for an isolated He atom and for ordinary bulk monatomic helium.

However, the broader wording must not imply:

```text
neutral He2 cannot exist
```

because the extraordinarily weak neutral ⁴He₂ van-der-Waals dimer possesses a bound quantum state.

Status:

```text
CORRECTED
```

MAT representation:

```text
bulk ordinary helium = monatomic

4He2 = weak molecular child state
```

---

# AUDIT-010 — Helium-3 Magnetic Channel

Legacy:

```text
3He I = 1/2
4He I = 0
```

Status:

```text
PRESERVED
```

³He's neutron-science and NMR relationships remain isotope-specific.

---

# AUDIT-011 — He-I / He-II

Legacy:

$$
He-I
\rightarrow
He-II
$$

Status:

```text
PRESERVED + CONDITIONED
```

Correction:

The transition belongs to a pressure-dependent lambda line.

The reference value:

```text
2.1768 K
```

must retain its corresponding pressure.

---

# AUDIT-012 — Helium Freezing

Legacy correctly states that cooling alone at low pressure does not create ordinary solid helium.

Status:

```text
PRESERVED
```

MAT therefore does not use one unqualified atmospheric-pressure:

```text
helium melting point
```

field.

---

# AUDIT-013 — Superfluid ³He

Legacy correctly separates ³He from ⁴He.

Status:

```text
PRESERVED + EXPANDED
```

A/B and field-dependent phase structure become dedicated child phase objects.

---

# AUDIT-014 — Helium Chemistry

Legacy correctly states:

```text
low ambient reactivity
≠
chemical impossibility under all conditions
```

Status:

```text
PRESERVED + EXPANDED
```

Confirmed child/relationship examples:

```text
HeH+
Na2He
4He2
He2+
He2*
```

---

# AUDIT-015 — A-B-C Examples

Legacy examples include:

```text
ionization
superfluid transition
high-pressure compound formation
nuclear transformation
```

Status:

```text
FORMALIZED-AS-CAUSALI-E
```

Preferred structure:

$$
C=
F(
S_0,
A,
B,
E,
t
)
$$

The A-B-C layer does not replace the relevant quantum, thermodynamic, chemical or nuclear equations.

---

# AUDIT-016 — Organic / Biological Fields

Legacy uses near-N/A values.

MAT makes the distinction more precise:

```text
normal biochemical structural role:
NOT-APPLICABLE

physical/medical/process environment interactions:
APPLICABLE
```

Status:

```text
CORRECTED
```

---

# AUDIT-017 — Technology Score

Legacy says Helium has a high technology-enabler score.

No universal scalar scoring model was defined.

Status:

```text
CONCEPT-PRESERVED
NUMERIC-SCORE-DEPRECATED
```

Use typed application relationships instead.

---

# AUDIT-018 — Geometry

Legacy correctly extends geometry beyond atomic ground-state symmetry into:

```text
quantized vortices
vortex arrays
interfaces
collective waves
phase boundaries
```

Status:

```text
PRESERVED
```

These are phase/material-state geometries, not literal geometry of an isolated atom.

---

# AUDIT-019 — Multiple Distances

Legacy defines different conceptual distances between Hydrogen and Helium:

```text
chemical
nuclear
cosmic-history
cryogenic/quantum
molecular bridge
```

Status:

```text
PRESERVED AS MULTI-RELATIONSHIP CONCEPT
```

MAT does not yet assign arbitrary numeric values to these distances.

---

# AUDIT-020 — Legacy Locked Status

Legacy ends:

```text
STATUS PRODUCTION ELEMENT — LOCKED
```

This is retained only as historical Genesis status.

It does not automatically mean:

```text
MAT SCIENTIFICALLY VALIDATED
```

---

# Legacy Content Decision

```yaml
legacy_record: "G0002"

migration:
  atomic_identity: PASS
  isotopes: PASS
  nuclear: PASS
  electron_correlation: PASS
  excited_states: PASS
  spectroscopy_architecture: PASS
  quantum_statistics: PASS
  helium4_quantum_fluid: PASS
  helium3_quantum_fluid: PASS
  pressure_phase_behavior: PASS
  chemistry: PASS
  process_environment: PASS
  organic_context: PASS
  inorganic_context: PASS
  biological_context: PASS
  technology_relationships: PASS
  energy_relationships: PASS
  geometry: PASS
  knowledge_graph: PASS
  evidence_architecture: PASS

corrections:
  - neutral_helium_dimer_semantics
  - pressure_condition_on_lambda_point
  - remove_undefined_technology_scores
  - separate_biological_structural_role_from_physical_effects

status: "CONTENT-MIGRATED"
```

---
