# MAT Relationships and Knowledge Graph

## Purpose

A material is not only a single record. It sits in a graph of relationships.

MAT relations should represent how entities connect in a scientifically meaningful and machine-readable way.

---

# 1. Core Relationship Types

Recommended relationship categories:

- `is_a`;
- `part_of`;
- `contains`;
- `derived_from`;
- `transforms_into`;
- `has_state`;
- `has_measurement`;
- `has_source`;
- `supports_claim`;
- `contradicts_claim`;
- `same_as`;
- `related_to`;
- `depends_on`;
- `occurs_under`;
- `has_process`;
- `influences`;
- `is_observed_in`;
- `is_applied_in`;
- `precedes`;
- `follows`;
- `is_child_of`;
- `is_parent_of`.

---

# 2. Relationship Object

A relationship object should at minimum contain:

```yaml
relation_id:
source_record_id:
target_record_id:
relation_type:
confidence:
source_id:
conditions:
notes:
```

---

# 3. Hierarchical Structures

Parent-child relationships are common in MAT.

Examples:

```text
Material -> Phase -> Structure -> Measurement
Element -> Isotope -> Ion -> State
Compound -> Polymorph -> Crystal Structure
```

---

# 4. Material-to-Process Relationships

Examples:

- material `is_processed_by` process;
- process `produces` material;
- material `decomposes_under` condition;
- material `transforms_to` other material.

---

# 5. State-to-Measurement Relationships

Examples:

```text
Material-State -> has_measurement -> Thermal-Conductivity
Material-State -> has_measurement -> Magnetic-Susceptibility
```

Each measured value must refer back to the applicable state and conditions.

---

# 6. Source-to-Claim Relationships

Examples:

```text
Paper -> supports_claim -> Property value
Dataset -> supports_claim -> Observed phase transition
```

This allows MAT to evaluate evidence quality and provenance separately from the material state itself.

---

# 7. Contradiction Graphs

Where different sources disagree, the relationship graph should preserve conflict rather than auto-resolve it.

```text
Claim A -> contradicts -> Claim B
```

A separate recommended/consensus value may be attached to the record without deleting the disagreement graph.

---

# 8. Edge Semantics

A relationship edge should explain the meaning of the connection, not just provide a label.

Example:

```yaml
relation_type: transforms_into
source: MAT:0007
target: MAT:0008
conditions:
  temperature: 1200
  temperature_unit: K
  atmosphere: ARGON
```

This is more informative than a vague `related_to` edge.

---

# 9. Graph Responsibilities

The graph is responsible for:

- linking records;
- representing dependencies;
- tracking evidence flow;
- storing process history;
- mapping contradictions;
- representing state transitions;
- preserving lineage.

It should not replace the structured record fields.

---

# 10. Relationship Validation

Each relationship should be checked for:

- source existence;
- target existence;
- valid relation type;
- conditions compatibility;
- confidence;
- source quality;
- date/version.

---

# 11. Temporal Graphs

Some relationships are time-dependent.

Example:

```text
A -> transforms_into -> B
at time t = 1200 K
```

Temporal edges are distinct from static structural edges.

---

# 12. Knowledge Graph Principles

MAT graph rules:

- keep edges typed and explicit;
- preserve provenance of each edge;
- never infer a relationship without evidence or a stated theoretical model;
- keep historical, hypothetical and confirmed relations distinct;
- do not hide conflicting relationships.
