# MAT Systems, Causality and Information Framework

## Purpose

MAT contains large networks of interconnected states.

Systems science, causal inference and information theory provide useful tools for analysing these relationships.

---

# Part A — Systems

# MAT-SYS-001 — System

A system is represented by:

- state;
- inputs;
- outputs;
- environment;
- dynamics.

---

# MAT-SYS-002 — State Vector

\[
\mathbf x(t)
=
[x_1,x_2,\ldots,x_n]^T
\]

A MAT material state can be treated as a high-dimensional state vector.

---

# MAT-SYS-003 — State Transition

Continuous:

\[
\dot{\mathbf x}
=
F(\mathbf x,\mathbf u,t)
\]

Discrete:

\[
\mathbf x_{k+1}
=
F(\mathbf x_k,\mathbf u_k)
\]

---

# MAT-SYS-004 — Input

An input may represent:

- heat;
- force;
- pressure;
- voltage;
- current;
- field;
- radiation;
- chemical feed;
- process action.

---

# MAT-SYS-005 — Output

An output may represent:

- measured property;
- product;
- phase;
- energy;
- signal;
- deformation.

---

# MAT-SYS-006 — Feedback

A system may use its output to modify subsequent input.

\[
u(t)=F(y(t))
\]

Applications include:

- process control;
- material growth;
- temperature regulation.

---

# MAT-SYS-007 — Stability

A stable system tends to remain near or return toward an equilibrium/attractor under sufficiently small disturbances, according to a specified mathematical definition.

No single definition of stability covers all MAT systems.

---

# MAT-SYS-008 — Linear System

\[
\dot x=Ax+Bu
\]

is a useful model under linear approximation.

Real materials are frequently nonlinear.

---

# MAT-SYS-009 — Nonlinear System

\[
\dot x=F(x,u)
\]

may exhibit:

- multiple equilibria;
- bifurcation;
- hysteresis;
- chaotic dynamics.

---

# MAT-SYS-010 — Path Dependence

\[
S_f
\neq
F(S_i)
\]

alone if the route matters.

Instead:

\[
S_f=
F(S_i,H)
\]

where \(H\) is history.

---

# MAT-SYS-011 — Hysteresis

Output can depend on previous state as well as present input.

This connects directly to MAT process-history storage.

---

# MAT-SYS-012 — Network

\[
G=(V,E)
\]

MAT can represent materials knowledge as a graph.

---

# MAT-SYS-013 — Transition Network

Edges may encode:

- reaction;
- phase change;
- process;
- decay;
- manufacturing transformation.

---

# MAT-SYS-014 — Reachability

A state is reachable when a valid path exists through the permitted transition network.

\[
S_i\rightsquigarrow S_j
\]

---

# MAT-SYS-015 — Controllability Concept

A system is controllable in a formal control-theory sense when permitted inputs can drive it between specified states under the model.

A material-processing analogue asks:

> Can available manufacturing controls move this material to the target state?

---

# MAT-SYS-016 — Observability Concept

Can the underlying state be reconstructed from available measurements?

This directly supports Causali E backward inference.

---

# MAT-SYS-017 — Multiscale System

Material behaviour may require coupled models across:

```text
ELECTRONIC
ATOMIC
MICROSTRUCTURAL
MACROSCOPIC
```

No one scale should automatically substitute for all others.

---

# MAT-SYS-018 — Emergence

Macroscopic properties may arise from interactions among lower-level components.

Examples:

- elasticity;
- magnetism;
- superconductivity;
- collective phase behaviour.

"Emergent" should describe a level relationship, not serve as an unexplained causal mechanism.

---

# MAT-SYS-019 — Sensitivity

\[
\frac{\partial y}{\partial x_i}
\]

measures local response of an output to a variable under the model.

Useful for identifying important material variables.

---

# MAT-SYS-020 — Robustness

A material or process is robust when performance remains acceptable despite specified variations.

---

# Part B — Causality

# MAT-CAUSAL-001 — Correlation Is Not Causation

Statistical association alone does not establish causal direction.

---

# MAT-CAUSAL-002 — Causal Graph

A directed acyclic graph may represent causal assumptions:

\[
A\rightarrow B\rightarrow C
\]

where appropriate.

Not every physical system is adequately represented by a simple DAG.

---

# MAT-CAUSAL-003 — Confounding

If:

\[
Z\rightarrow A
\]

and:

\[
Z\rightarrow C
\]

an observed association between \(A\) and \(C\) may be confounded by \(Z\).

---

# MAT-CAUSAL-004 — Intervention

Causal effect may be studied by comparing:

\[
P(Y|do(X=x))
\]

with alternative interventions.

---

# MAT-CAUSAL-005 — Counterfactual

A counterfactual asks what would have occurred under an alternative intervention.

This can be useful for:

- manufacturing optimisation;
- failure analysis;
- process design.

It is an inferential construct and does not imply alternate physical timelines exist.

---

# MAT-CAUSAL-006 — Forward Causal Prediction

\[
P(S_{t+1}|S_t,A_t)
\]

predicts downstream consequences.

---

# MAT-CAUSAL-007 — Backward Causal Inference

\[
P(A|C)
\]

estimates plausible causes from an observed effect.

---

# MAT-CAUSAL-008 — Causal Identifiability

Some causal relationships cannot be determined uniquely from observational data alone.

Experiments or additional assumptions may be required.

---

# MAT-CAUSAL-009 — Intervention Versus Observation

\[
P(Y|X=x)
\]

need not equal:

\[
P(Y|do(X=x))
\]

This distinction is critical for automated MAT reasoning.

---

# MAT-CAUSAL-010 — Causali E Mapping

A possible formal interpretation is:

```text
A = intervention/change
B = retained constraints
C = resulting state
```

leading to:

\[
C=F(S,A,B,E)
\]

This remains a developing interpretation of the original framework.

---

# Part C — Information

# MAT-INFO-001 — Information Entropy

\[
H(X)
=
-\sum_xp(x)\log p(x)
\]

measures uncertainty in a probability distribution.

---

# MAT-INFO-002 — Mutual Information

\[
I(X;Y)
=
\sum_{x,y}
p(x,y)
\log
\frac{p(x,y)}
{p(x)p(y)}
\]

measures statistical dependence.

Mutual information does not by itself establish causality.

---

# MAT-INFO-003 — Conditional Entropy

\[
H(X|Y)
\]

represents remaining uncertainty in \(X\) given \(Y\).

---

# MAT-INFO-004 — Information Gain

New measurements may reduce uncertainty about material state.

Conceptually:

\[
IG
=
H(S_\text{before})
-
H(S_\text{after})
\]

---

# MAT-INFO-005 — Measurement Selection

A future MAT experiment engine might select measurements expected to maximize information gain.

---

# MAT-INFO-006 — Compression

Structured laws and relationships may allow a knowledge base to represent large data spaces more efficiently than enumerating every possible combination.

This relates directly to the Causali E causal-network compression hypothesis.

---

# MAT-INFO-007 — Redundancy

Multiple measurements may contain overlapping information.

Redundancy can improve robustness but should not be confused with independent evidence.

---

# MAT-INFO-008 — Signal and Noise

Observed data may be represented:

\[
y=s+n
\]

where:

- \(s\) = signal;
- \(n\) = noise.

Real measurement error can be more complex than simple additive noise.

---

# MAT-INFO-009 — Signal-to-Noise Ratio

SNR must specify its definition and measurement domain.

Useful for:

- spectroscopy;
- sensors;
- imaging;
- detection.

---

# MAT-INFO-010 — Detection Limit

A nondetection below instrumental sensitivity is not equivalent to physical zero.

This maps directly to MAT:

```text
BELOW-DETECTION-LIMIT
```

---

# MAT-INFO-011 — Metadata

Scientific values require contextual information.

MAT therefore treats metadata such as:

- units;
- conditions;
- source;
- uncertainty;

as part of the scientific object.

---

# MAT-INFO-012 — Provenance Graph

Information lineage can itself be represented:

```text
MEASUREMENT
↓
PAPER
↓
DATABASE
↓
MAT IMPORT
↓
DERIVED CALCULATION
↓
MAT RECORD
```

This allows derived values to be audited.

---

# MAT-INFO-013 — Knowledge Graph

MAT knowledge may eventually form:

\[
G_\text{MAT}
=
(V,E,A)
\]

where:

- \(V\) = entities;
- \(E\) = relationships;
- \(A\) = attributes/evidence.

---

# MAT-INFO-014 — Semantic Identity

Human-readable names can vary.

Canonical identifiers therefore remain independent of display labels.

Example:

```text
MAT:0001
```

remains stable even if descriptive text changes.

---

# MAT-INFO-015 — Uncertainty Is Information

An uncertainty range is not a defect to remove.

It communicates knowledge about limitations of the measurement/model.

---

# MAT-INFO-016 — Negative Results Are Information

A failed experiment can reduce the plausible state/path space.

Therefore:

\[
\Omega_\text{after failed test}
\subseteq
\Omega_\text{before}
\]

when the test meaningfully eliminates candidate conditions.

---

# MAT-INFO-017 — Model Residual

\[
r=y_\text{measured}-y_\text{predicted}
\]

Systematic residual patterns may identify:

- missing variables;
- incorrect assumptions;
- model failure;
- measurement bias.

---

# MAT-INFO-018 — Model Comparison

Competing models may be compared using:

- prediction error;
- likelihood;
- information criteria;
- held-out performance;
- physical consistency.

---

# MAT-INFO-019 — Active Learning

A future MAT research engine may choose the next experiment based on which measurement is expected to reduce uncertainty most efficiently.

---

# MAT-INFO-020 — Scientific Search Loop

Future MAT/Causali E reasoning may operate:

```text
KNOWN STATE
↓
GENERATE CANDIDATES
↓
APPLY MATHEMATICAL CONSTRAINTS
↓
APPLY PHYSICAL CONSTRAINTS
↓
APPLY CHEMICAL CONSTRAINTS
↓
APPLY THERMODYNAMICS
↓
APPLY KINETICS
↓
APPLY EVIDENCE
↓
RANK CANDIDATES
↓
IDENTIFY MOST INFORMATIVE TEST
↓
EXPERIMENT / SIMULATION
↓
UPDATE MAT
```

---

# Final Framework Rule

MAT should use scientific theory as a constraint and explanatory tool, not as a substitute for measurement.

Likewise, measurements should be interpreted through valid scientific models rather than stored without context.

The long-term system therefore combines:

\[
\boxed{
\text{DATA}
+
\text{MATHEMATICS}
+
\text{PHYSICAL LAW}
+
\text{EVIDENCE}
+
\text{CAUSAL RELATIONSHIPS}
}
\]

to build an increasingly precise map of accessible material states.
