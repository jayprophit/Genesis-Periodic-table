# MAT Relationships and Knowledge Graph

## Purpose

MAT is not merely a collection of independent documents.

It is a network of entities connected by scientifically meaningful relationships.

The general graph model is:

\[
G=(V,E)
\]

where:

- \(V\) = MAT entities/nodes;
- \(E\) = relationships/edges.

---

# 1. Node Types

Nodes may represent:

- element;
- isotope;
- ion;
- atomic state;
- nuclear state;
- molecule;
- compound;
- allotrope;
- crystal;
- material;
- phase;
- property;
- process;
- reaction;
- environment;
- experiment;
- calculation;
- source;
- person;
- institution;
- equation;
- theory;
- application.

---

# 2. Relationship Object

Every relationship should contain:

```yaml
relationship_id:
source_id:
relationship_type:
target_id:
conditions:
direction:
evidence_type:
confidence:
source_ids:
notes:
```

---

# 3. Core Relationship Types

## Composition

```text
CONTAINS
CONSTITUENT-OF
COMPOSED-OF
HAS-ISOTOPE
IS-ISOTOPE-OF
```

---

## Chemistry

```text
BONDS-WITH
FORMS-COMPOUND
REACTS-WITH
CATALYSES
OXIDISES-TO
REDUCES-TO
DISSOLVES-IN
ADSORBS
ABSORBS
```

---

## Structure

```text
HAS-PHASE
HAS-ALLOTROPE
CRYSTALLISES-AS
TRANSFORMS-TO
HAS-DEFECT
HAS-INTERFACE
```

---

## Process

```text
PRODUCED-BY
PROCESSED-BY
ANNEALED-BY
DEPOSITED-BY
SYNTHESISED-BY
MACHINED-BY
TRANSFORMED-BY
```

---

## Nuclear

```text
DECAYS-TO
CAPTURES-NEUTRON
FUSES-WITH
FISSION-PRODUCES
TRANSMUTES-TO
```

---

## Energy

```text
GENERATES
STORES
CONDUCTS
CONVERTS
ABSORBS-ENERGY
EMITS-ENERGY
```

---

## Evidence

```text
SUPPORTED-BY
CONTRADICTED-BY
MEASURED-BY
CALCULATED-BY
PREDICTED-BY
REPORTED-IN
```

---

## People and History

```text
DISCOVERED-BY
PROPOSED-BY
MEASURED-BY-PERSON
DEVELOPED-BY
NAMED-AFTER
```

---

## Application

```text
USED-IN
CANDIDATE-FOR
UNSUITABLE-FOR
```

---

# 4. Direction

Some relationships are symmetric.

Example:

```text
BONDS-WITH
```

may be treated as bidirectional in certain graph contexts.

Others are directional:

```text
DECAYS-TO
```

because:

```text
A DECAYS-TO B
```

does not imply:

```text
B DECAYS-TO A
```

---

# 5. Conditional Relationships

A relationship may only exist under certain conditions.

Example:

```yaml
source: graphite
relationship: TRANSFORMS-TO
target: diamond
conditions:
  pressure: high
  temperature: elevated
```

Therefore the relationship edge itself may contain state information.

---

# 6. Multi-Step Paths

A MAT transformation pathway can be represented:

\[
A
\xrightarrow{P_1}
B
\xrightarrow{P_2}
C
\xrightarrow{P_3}
D
\]

Each edge must retain process conditions.

---

# 7. Reverse Search

MAT should eventually support queries such as:

```text
Find materials with:
high thermal conductivity
low density
electrical insulation
temperature stability > target
```

The system can traverse:

```text
TARGET PROPERTY
↓
MATERIAL
↓
STRUCTURE
↓
COMPOSITION
↓
PROCESS
```

This makes the knowledge graph useful for materials design rather than merely reference lookup.

---

# 8. Causali E Relationship

Causali E may operate over MAT graph states conceptually as:

\[
C=F(A,B,E)
\]

where:

- \(A\) = intervention/change;
- \(B\) = starting or constrained state;
- \(E\) = environment;
- \(C\) = resulting accessible state.

All generated candidate pathways must still be tested against established physics, chemistry and evidence.

---

# 9. Forbidden and Unresolved Paths

MAT may record:

```text
OBSERVED
PREDICTED
POSSIBLE
CONDITIONALLY-POSSIBLE
KINETICALLY-INACCESSIBLE
THERMODYNAMICALLY-UNFAVOURABLE
FORBIDDEN
FAILED
UNKNOWN
HYPOTHETICAL
```

A pathway failing under one condition does not automatically establish impossibility under every physically meaningful condition.

Conversely, mathematical generation of a candidate state does not establish that the state is physically possible.

---

# 10. Relationship Evidence

Every relationship should ultimately be traceable to:

- experimental observation;
- established theory;
- computation;
- historical source;
- hypothesis.

---
