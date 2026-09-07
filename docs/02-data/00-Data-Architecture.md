# MAT Data Architecture

## Core Architecture
MAT uses a hierarchical and relational architecture.

The primary hierarchy is:

[
\text{MAT} \rightarrow \text{Primary Record} \rightarrow \text{Child Record} \rightarrow \text{Measurement} \rightarrow \text{Evidence}
]

Records also form relationships with other records.

---

## Primary Record
A primary record represents a major MAT identity such as an element or another top-level material class.

Each receives a permanent MAT identifier.

Example:

`0001-Hydrogen-H`

---

## Child Records
A primary record may contain child nodes representing isotopes, ionisation states, electronic states, molecules, compounds, allotropes, phases, processes, energy pathways and applications.

Child nodes prevent one record from becoming an undifferentiated collection of unrelated values.

---

## Measurements
A measurement object should eventually contain at minimum:

```
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

[
D = D(M,S,E,t,s)
]

where:

- (M) = material identity;
- (S) = physical state;
- (E) = environment;
- (t) = time;
- (s) = scale.

Therefore two samples with identical chemical composition are not automatically considered physically identical MAT states.

---

## Provenance
Each scientifically meaningful claim should be traceable to one or more provenance objects.

A provenance object may reference journal articles, standards, databases, handbooks, patents, theses, datasets and simulations.

---

## Relationship Graph
MAT relationships may eventually be represented as edges:

```
SOURCE-RECORD
RELATIONSHIP
TARGET-RECORD
CONDITIONS
EVIDENCE
SOURCE
```

This architecture allows MAT to evolve into a scientific knowledge graph.
