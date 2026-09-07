# MAT Foundations

## Materials Atlas Table Codex

The Materials Atlas Table Codex — MAT — is founded on the principle that matter should be represented as a collection of identifiable states, properties, relationships, processes and evidence rather than only as entries in a conventional periodic table.

---

# 1. Fundamental MAT Object

The most general MAT object is a state:

\[
S_i
\]

A state may describe:

- an atom;
- isotope;
- ion;
- molecule;
- compound;
- crystal;
- material;
- phase;
- plasma;
- engineered structure;
- process state;
- environmental state.

---

# 2. State Description

A sufficiently detailed material state may depend on:

\[
S =
F(
C,
I,
Q,
E,
R,
X,
T,
P,
\mathbf E,
\mathbf B,
G,
H,
t,
s
)
\]

where:

- \(C\) = composition;
- \(I\) = isotopic state;
- \(Q\) = quantum state;
- \(E\) = electronic state;
- \(R\) = radiation state;
- \(X\) = structure;
- \(T\) = temperature;
- \(P\) = pressure;
- \(\mathbf E\) = electric field;
- \(\mathbf B\) = magnetic field;
- \(G\) = geometry;
- \(H\) = history/process path;
- \(t\) = time;
- \(s\) = scale.

This is conceptual notation rather than one universal physical equation.

---

# 3. State Transition

Processes connect states:

\[
S_i
\xrightarrow{P}
S_j
\]

where \(P\) represents a process or interaction.

Examples include:

- heating;
- cooling;
- compression;
- reaction;
- deformation;
- irradiation;
- deposition;
- annealing;
- ionisation;
- radioactive decay;
- nuclear transformation.

---

# 4. MAT Knowledge Structure

MAT contains four primary object types:

## Entity

Something scientifically identifiable.

Examples:

- hydrogen;
- carbon-12;
- diamond;
- water;
- graphene.

## State

A particular condition of an entity.

Example:

`graphite at 300 K and 1 atm`

## Property

A measurable or calculable feature.

Example:

`thermal conductivity`

## Relationship

A scientifically meaningful connection.

Example:

`graphite TRANSFORMS-TO diamond under defined conditions`

---

# 5. Evidence

Every scientifically meaningful MAT assertion should ultimately connect to evidence.

Conceptually:

\[
\text{Claim}
\rightarrow
\text{Evidence}
\rightarrow
\text{Source}
\]

Evidence and source are distinct.

A paper is a source.

The measurement described by the paper is evidence.

---

# 6. Conditions

A MAT value is incomplete when materially relevant conditions are missing.

Therefore:

\[
V \neq V_\text{context-free}
\]

for many real properties.

Instead:

\[
V =
V(T,P,s,\text{phase},\text{frequency},\text{history},\ldots)
\]

---

# 7. Measurement and Model Separation

MAT distinguishes:

```text
OBSERVATION
MEASUREMENT
DERIVATION
MODEL
PREDICTION
HYPOTHESIS
```

These objects may be related but are not interchangeable.

---

# 8. Scientific Principle Library

MAT maintains a reusable library of scientific principles.

Principle categories include:

```text
MAT-MATH
MAT-PHYS
MAT-CHEM
MAT-MATSCI
MAT-QM
MAT-NUC
MAT-THERMO
MAT-SYS
MAT-INFO
MAT-CAUSAL
```

Example:

```text
MAT-THERMO-003
```

may identify a thermodynamic principle.

---

# 9. Principle Object

Each principle may eventually contain:

```yaml
principle_id:
name:
domain:
classification:
equation:
variables:
units:
assumptions:
boundary_conditions:
validity_range:
inputs:
outputs:
related_properties:
related_principles:
sources:
notes:
```

---

# 10. Domain of Validity

No law or model should automatically be assumed valid under every possible condition.

A principle may be:

```text
FUNDAMENTAL
APPROXIMATE
EMPIRICAL
PHENOMENOLOGICAL
STATISTICAL
CLASSICAL
RELATIVISTIC
QUANTUM
CONTINUUM
MICROSCOPIC
MACROSCOPIC
```

and may require a specific domain.

---

# 11. Scientific Hierarchy

MAT does not assume one discipline supersedes all others.

Instead:

```text
MATHEMATICS
       ↓
PHYSICAL LAWS
       ↓
CHEMICAL BEHAVIOUR
       ↓
MATERIAL STRUCTURE
       ↓
ENGINEERING PROPERTIES
       ↓
PROCESS
       ↓
APPLICATION
```

This is a useful dependency map, not a strict philosophical hierarchy.

---

# 12. Cross-Domain Relationships

The same property may involve several scientific domains.

Example:

Electrical conductivity can involve:

- quantum mechanics;
- solid-state physics;
- statistical mechanics;
- materials science;
- microstructure;
- temperature;
- defects.

MAT therefore permits multiple governing principles for one field.

---

# 13. Causali E Position

Causali E sits alongside the established scientific framework as a developing causal/state-space research framework.

Its outputs must pass through the same:

- mathematics;
- dimensional analysis;
- physical constraints;
- evidence;
- validation;

as any other MAT-generated hypothesis.

---

# 14. Core Scientific Rule

MAT does not ask:

> Which theory do we want the data to support?

MAT asks:

> What does the evidence show, what model explains it, and under what conditions does that model work?

---
