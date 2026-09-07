# MAT Materials Search and Design Engine

## Purpose

MAT is intended ultimately to support both forward and inverse materials reasoning.

Forward:

\[
X\rightarrow Y
\]

Given a material/state/process \(X\), estimate properties \(Y\).

Inverse:

\[
Y^*\rightarrow X^*
\]

Given desired properties \(Y^*\), search for candidate material states and processes \(X^*\).

---

## Target Property Vector

A target may be expressed:

\[
\mathbf Y^*
=
[
y_1^*,y_2^*,\ldots,y_n^*
]
\]

Examples may include:

- density;
- strength;
- thermal conductivity;
- electrical conductivity;
- temperature range;
- radiation resistance;
- corrosion resistance;
- toxicity;
- recyclability;
- cost.

Each target must contain:

```yaml
property_id:
target:
tolerance:
unit:
conditions:
priority:
hard_constraint:
````

---

## Candidate State

A candidate is not composition alone.

$$
X=
F(
C,I,S,G,P,E,t,s
)
$$

where candidate variables may include:

```text
composition
isotopic composition
bonding
phase
crystal structure
microstructure
nanostructure
geometry
manufacturing process
temperature
pressure
electric field
magnetic field
environment
time/history
scale
```

---

## Search Architecture

```text
DEFINE TARGET
↓
IDENTIFY HARD CONSTRAINTS
↓
SEARCH KNOWN MATERIALS
↓
SEARCH RELATED STRUCTURES
↓
GENERATE CANDIDATE COMPOSITIONS
↓
GENERATE PROCESS PATHWAYS
↓
APPLY MATHEMATICS
↓
APPLY CONSERVATION
↓
APPLY QUANTUM / NUCLEAR RULES
↓
APPLY CHEMISTRY
↓
APPLY THERMODYNAMICS
↓
APPLY KINETICS
↓
APPLY MANUFACTURABILITY
↓
APPLY SAFETY
↓
APPLY SUSTAINABILITY
↓
ESTIMATE UNCERTAINTY
↓
RANK CANDIDATES
↓
IDENTIFY BEST VALIDATION TEST
```

---

## Candidate Status

Every candidate receives one of:

```text
KNOWN
MEASURED
REPLICATED
COMPUTATIONALLY-PREDICTED
THEORETICALLY-POSSIBLE
EXPERIMENTALLY-UNTESTED
METASTABLE
KINETICALLY-INACCESSIBLE
THERMODYNAMICALLY-UNFAVOURABLE
FAILED
CONTRADICTED
UNKNOWN
HYPOTHETICAL
```

---

## Negative Results

Failed synthesis is part of the search space.

A failed route:

$$
X\xrightarrow{P}Y_\text{failed}
$$

can reduce future search effort when its conditions are known.

MAT therefore retains:

```text
failed synthesis
partial reaction
unstable product
unexpected product
failed replication
no reaction detected
```

---

## Multi-Objective Search

Real materials design generally requires simultaneous optimization.

$$
\min
[
f_1(X),
f_2(X),
\dots,
f_n(X)
]
$$

For example:

```text
minimise density
maximise strength
maximise recyclability
minimise toxicity
minimise cost
maintain conductivity
```

No single "best material" exists independently of objectives and constraints.

---

## Pareto Candidates

Where objectives conflict, MAT may eventually return a Pareto frontier rather than falsely selecting one universal optimum.

---

## Evidence-Aware Ranking

Candidate score should depend not only on predicted performance but also on:

```text
evidence
confidence
uncertainty
replication
manufacturability
safety
resource availability
environmental impact
```

---

## Causali E Interface

Causali E may operate as one exploratory state/path generator:

$$
\Omega=
\mathcal G(S,A,B,E)
$$

but candidate generation is not proof.

Every generated state remains subject to established scientific validation.

---

## Forward Model

$$
\hat Y=F(X)
$$

must report:

```text
prediction
uncertainty
model
domain of validity
evidence
```

---

## Inverse Problem

Find:

$$
X^*
=
\arg\min_X
D(
F(X),
Y^*
)
$$

subject to:

$$
g_i(X)=0
$$

and:

$$
h_j(X)\le0
$$

where constraints represent physical, chemical, manufacturing, environmental or safety requirements.

---

## Human-Readable Example

Target:

```text
low density
high strength
electrical conductivity
thermal insulation
radiation resistance
operating temperature range
```

MAT searches:

```text
elements
+
isotopes
+
ratios
+
bonding
+
crystal structure
+
microstructure
+
nano geometry
+
manufacturing
+
temperature
+
pressure
+
fields
```

and returns candidate pathways with evidence and uncertainty.

---

## Core Rule

$$
\boxed{
\text{candidate generated}
\neq
\text{candidate physically validated}
}
$$

and:

$$
\boxed{
\text{physically possible}
\neq
\text{practically manufacturable}
}
$$

and:

$$
\boxed{
\text{manufacturable}
\neq
\text{safe or sustainable}
}
$$

MAT must preserve all three distinctions.
