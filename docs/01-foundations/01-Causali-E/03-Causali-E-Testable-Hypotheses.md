# Causali E Testable Hypotheses

## Purpose

This document identifies which parts of the original Causali E framework can be converted into testable scientific hypotheses and which parts remain conceptual or historical.

The central rule is simple:

- if a claim is testable, it may be evaluated as a scientific proposition;
- if it is not testable, it remains a conceptual or philosophical statement;
- if its evidence is incomplete, it must remain provisional and explicitly labelled.

---

## 1. Candidate Hypotheses

### H1. State-transition determinism under fixed constraints

If a system state \(S_t\) and a fixed set of constraints \(B\) are known, then a defined intervention \(A\) will produce a predictable distribution of outcomes \(C\) within defined uncertainty bounds.

This can be tested in controlled experiments using materials processing, electromagnetic fields, thermal profiles, chemical environments, or mechanical loading.

### H2. Process history matters

Two materials with nearly identical nominal composition may yield different observable properties if their process history, environment, or time-dependent state differs.

This hypothesis is directly compatible with MAT's requirement that time, scale, environment, and process history are first-class variables.

### H3. Causal mapping can improve material state prediction

A graph or state-space representation of process conditions and outcomes can improve prediction relative to composition-only description.

This claim is testable using regression, causal modelling, state-space inference, or multivariate analysis across a sufficiently rich dataset.

### H4. Negative or failed results are informative

Failed syntheses, absent reactions, unstable states, and unsuccessful replicates carry scientific value when conditions are documented.

This is consistent with MAT's null-state and negative-result rules.

### H5. Context and environment must be explicit

A material property is not a single invariant if it varies with temperature, pressure, scale, field, atmosphere, history, or processing.

This is testable by measuring property sensitivity across conditions.

---

## 2. Hypothesis Structure Required for MAT

Each MAT hypothesis should define:

1. system or object under study;
2. independent variable or intervention;
3. fixed conditions or constraints;
4. response variable or outcome;
5. measurement method;
6. uncertainty model;
7. expected relationship;
8. falsification criteria;
9. evidence threshold for acceptance.

If these elements are not defined, the statement is not yet a valid scientific hypothesis.

---

## 3. Falsifiability Rules

A hypothesis is not scientifically useful unless it can be falsified.

Examples of valid falsification conditions:

- the observed outcome differs significantly from the predicted distribution;
- the proposed state transition fails under replicated conditions;
- a dependency is not reproducible across independent labs or datasets;
- the claimed relation does not persist when environmental variables are controlled;
- the outcome is explained equally well by a simpler model without the proposed causal structure.

---

## 4. Boundaries of the Framework

Certain formulations within the original theory may remain conceptual rather than empirically testable at this stage, for example:

- broad symbolic analogies;
- highly abstract causal narratives;
- claims that rely on unmeasured metaphysical assumptions;
- statements that do not specify variable domains, units, or measurement processes.

These may remain in the historical archive and formalization documents, but they should not be treated as accepted MAT science.

---

## 5. Evidence Standard

A hypothesis may be considered provisional if it has any of the following:

- a single unreplicated result;
- a promising computational prediction with no experimental confirmation;
- an untested theoretical mechanism;
- a weak but suggestive correlation with incomplete state variables.

A claim may be elevated only when it satisfies the MAT evidence, replication, and uncertainty standards.

---

## 6. Example of a Valid MAT Test

```yaml
hypothesis_id: H1-001
subject: material-state
intervention: thermal_cycle
constraints:
  composition: fixed
  phase: fixed
  geometry: fixed
response: electrical_resistivity
measurement_method: four_point_probe
expected_relation: resistivity changes as function of annealing history
falsification: no significant change after controlling temperature/time
confidence_required: MODERATE
```

This is testable because it defines the intervention, conditions, measurement, and rejection logic.

---

## 7. Conclusion

Causali E is best treated in MAT as a framework for disciplined causal reasoning and state-transition analysis, not as a finished physical law.

The correct scientific posture is:

- preserve history;
- formalize carefully;
- test repeatedly;
- reject or revise when evidence fails;
- keep provisional claims visibly provisional.
