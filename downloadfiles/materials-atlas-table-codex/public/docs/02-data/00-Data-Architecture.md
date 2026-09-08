# MAT Data Architecture

## Core Architecture

MAT uses a hierarchical and relational architecture.

The primary hierarchy is:

\[
\text{MAT}
\rightarrow
\text{Primary Record}
\rightarrow
\text{Child Record}
\rightarrow
\text{Measurement}
\rightarrow
\text{Evidence}
\]

Records also form relationships with other records.

---

## Primary Record

A primary record represents a major MAT identity such as an element or another top-level material class.

Each receives a permanent MAT identifier.

Example:

`0001-Hydrogen-H`

---

## Child Records

A primary record may contain child nodes representing:

- isotopes;
- nuclear states;
- ionisation states;
- electronic states;
- molecular states;
- compounds;
- allotropes;
- material structures;
- phases;
- processes;
- energy pathways;
- environmental states;
- applications.

Child nodes prevent one record from becoming an undifferentiated collection of unrelated values.

---

## Measurements

A measurement object should eventually contain at minimum:

```text
property
value
unit
uncertainty
condition
temperature
pressure
environment
state
method
source
evidence-status
date
notes
```

Not every field will contain a value.

Missing information must use MAT's explicit null-state vocabulary rather than being silently omitted.

---

## State Representation

A material measurement is meaningful only in context.

Conceptually:

\[
D =
D(M,S,E,t,s)
\]

where:

- \(M\) = material identity;
- \(S\) = physical state;
- \(E\) = environment;
- \(t\) = time;
- \(s\) = scale.

Processing history may also affect the state.

Therefore two samples with identical chemical composition are not automatically considered physically identical MAT states.

---

## Provenance

Each scientifically meaningful claim should be traceable to one or more provenance objects.

A provenance object may reference:

- journal article;
- standard;
- database;
- handbook;
- patent;
- thesis;
- government dataset;
- institutional dataset;
- experimental record;
- calculation;
- simulation.

---

## Relationship Graph

MAT relationships may eventually be represented as edges:

```text
SOURCE-RECORD
RELATIONSHIP
TARGET-RECORD
CONDITIONS
EVIDENCE
SOURCE
```

Examples:

```text
Hydrogen
FORMS-COMPOUND-WITH
Oxygen
```

```text
Graphite
TRANSFORMS-TO
Diamond
high-pressure-high-temperature
```

```text
Material-A
MANUFACTURED-BY
Process-X
```

This architecture allows MAT to evolve into a scientific knowledge graph.

---
