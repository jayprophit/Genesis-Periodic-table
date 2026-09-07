# Materials Atlas Table Codex — MAT

## A Structured Atlas of Matter, Materials, States and Transformations
The **Materials Atlas Table Codex (MAT)** is a structured scientific knowledge system for describing matter beyond the limits of a conventional periodic table.

A conventional periodic table primarily organises chemical elements by atomic number and periodic chemical behaviour.

MAT extends this concept into a multidimensional atlas containing relationships between:

- elements;
- isotopes;
- ions;
- atomic and electronic states;
- molecules;
- compounds;
- allotropes;
- crystals;
- amorphous materials;
- composites;
- plasmas;
- phases;
- nanostructures;
- manufactured materials;
- biological material relationships;
- environments;
- processes;
- transformations;
- energy pathways;
- spectra;
- fields;
- time-dependent behaviour;
- applications;
- evidence;
- experiments;
- sources.
MAT is intended to be both human-readable and machine-readable.

Its long-term purpose is to create a structured representation in which known materials can be compared, related, simulated and eventually searched backwards from desired properties toward candidate compositions, structures and manufacturing conditions.

---

## Core Principle
A material is not adequately described by its chemical composition alone.

A MAT state is therefore treated conceptually as a function of multiple variables:

[
M_i =
F(
\text{composition},
\text{isotope},
\text{structure},
\text{electronic-state},
\text{fields},
\text{temperature},
\text{pressure},
\text{environment},
\text{process},
\text{time},
\text{scale}
)
]

Changing one or more of these variables may produce a materially different state even when elemental composition remains unchanged.

---

## MAT Data Rules
Every MAT record follows several fundamental rules.

1. A property must include its conditions when those conditions materially affect the value.
2. Units must be explicit.
3. Measured values must be distinguishable from calculated, predicted and hypothetical values.
4. Unknown, not measured, not applicable and unavailable are separate states.
5. Sources and provenance must be traceable.
6. Uncertainty must be retained where known.
7. Time is treated as a first-class variable.
8. Physical scale is treated as a first-class variable.
9. Environment is treated as a first-class variable.
10. Material history and manufacturing history may be part of the material state.
11. Failed experiments and negative results may be recorded where reliable information exists.
12. Scientific evidence and speculative ideas must never be silently merged.

---

## Record Architecture
Each primary MAT record is a parent node.

A parent record may contain child records representing:

- isotopes;
- nuclear states;
- electronic states;
- ions;
- molecules;
- compounds;
- allotropes;
- material phases;
- structures;
- processes;
- environments;
- energy pathways;
- applications;
- experimental states.
This allows MAT to describe relationships without attempting to compress all behaviour into one row of a table.

---

## MAT Record Numbering
The MAT sequence begins at:

`0000`

Record `0000` is reserved for the MAT reference and foundation state.

Chemical element records begin after the reference record.

Individual element filenames use the format:

`NNNN-ElementName-Symbol.md`

Example:

`0001-Hydrogen-H.md`

The record number identifies the primary MAT record.

Child identifiers are defined separately by the MAT Identifier System.

---

## Scientific Status
MAT contains several kinds of information.

### Established scientific data
Measurements, accepted constants, evaluated datasets, established equations and reproducible experimental results.

### Derived information
Values calculated from documented equations and traceable source data.

### Computational predictions
Results produced by simulations or computational models.

### Experimental or emerging findings
Results that may not yet have broad independent replication.

### Historical models
Historically important theories, interpretations and scientific models.

### Author hypotheses
Original conceptual or theoretical work associated with MAT.

These categories must remain distinguishable.

---

## Causali E
MAT preserves an original conceptual framework developed by the project author concerning:

- causality;
- constants;
- differences;
- potential states;
- transformations;
- branching outcomes;
- forward and backward inference.
This framework is documented under:

`docs/01-foundations/01-Causali-E/`

The original text is preserved separately from its later mathematical formalisation.

Causali E is not automatically treated as established physical law. Individual statements must be tested against mathematics, experiment and existing scientific knowledge.

---

## Navigation
Start here:

`docs/00-front-matter/00-Front-Page.md`

Project background:

`docs/00-front-matter/01-Project-Context.md`

Purpose and scope:

`docs/00-front-matter/02-Purpose-and-Scope.md`

Data architecture:

`docs/02-data/00-Data-Architecture.md`

Universal schema:

`docs/02-data/01-Universal-Schema.md`

Scientific methodology:

`docs/03-methodology/00-Research-Method.md`

Master index:

`docs/05-index/00-Master-Index.md`

Causali E:

`docs/01-foundations/01-Causali-E/00-Causali-E-Overview.md`

---

## Development Status
MAT is a living research and data-engineering project.

Records may be expanded as:

- better measurements become available;
- additional scientific fields are identified;
- new relationships are discovered;
- uncertainties are resolved;
- new materials are characterised;
- experimental evidence changes;
- data standards improve.
No MAT record should be regarded as permanently complete.

The objective is not static completeness.

The objective is traceable improvement.

---
