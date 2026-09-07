# MAT Project Context

## Origin

The Materials Atlas Table Codex developed from an earlier project known as the Genesis Periodic Table.

The original project began by expanding conventional elemental records with substantially more information than normally appears in a periodic table.

As the dataset expanded, it became clear that an element could not adequately be represented as one static object.

Different isotopes behave differently.

The same element may form different ions, molecules, allotropes, phases, compounds and materials.

The properties of a material may also change with temperature, pressure, electromagnetic fields, radiation, scale, defects, geometry, processing history and time.

The project therefore evolved from an expanded periodic table into a broader materials knowledge architecture.

This architecture is the Materials Atlas Table Codex.

---

## Why MAT Exists

Scientific information about matter is distributed across many disciplines and databases.

Atomic spectroscopy may be stored separately from nuclear data.

Crystal structures may be stored separately from mechanical properties.

Chemical reactions may be separated from manufacturing processes.

Manufacturing data may be separated from electronic behaviour.

Biological effects may be stored separately again.

MAT attempts to connect these domains through structured records and relationships.

The aim is not to replace specialist scientific databases.

The aim is to provide an architecture capable of linking their information.

---

## From Tables to State Space

MAT treats a material as occupying a position within a multidimensional state space.

For a state \(M_i\):

\[
M_i =
F(C,I,Q,S,E,B,T,P,R,t,s,\Pi)
\]

where the variables may represent quantities such as:

- composition \(C\);
- isotope state \(I\);
- quantum/electronic state \(Q\);
- structure \(S\);
- electric field \(E\);
- magnetic field \(B\);
- temperature \(T\);
- pressure \(P\);
- radiation/environment \(R\);
- time \(t\);
- scale \(s\);
- processing history \(\Pi\).

The exact MAT schema contains many individual fields rather than relying on this compressed equation.

The expression exists only as a conceptual description of the architecture.

---

## Relationship Model

MAT records are connected.

An element may connect to:

\[
\text{Element}
\rightarrow
\text{Isotope}
\rightarrow
\text{Atomic State}
\rightarrow
\text{Bond}
\rightarrow
\text{Compound}
\rightarrow
\text{Material}
\rightarrow
\text{Process}
\rightarrow
\text{Application}
\]

Other paths are possible.

For example:

\[
\text{Material}
+
\text{Temperature}
+
\text{Pressure}
\rightarrow
\text{Phase}
\]

or:

\[
\text{Material}
+
\text{Manufacturing Process}
\rightarrow
\text{Microstructure}
\rightarrow
\text{Properties}
\]

MAT therefore behaves more like a scientific knowledge graph than a conventional flat periodic table.

---

## Long-Term Objective

The eventual objective is to allow a desired property specification to be expressed as a target:

\[
Y =
\{\text{required properties}\}
\]

and then search MAT for candidate combinations of:

\[
\{
\text{composition},
\text{isotope},
\text{structure},
\text{geometry},
\text{process},
\text{environment}
\}
\]

that could satisfy those requirements.

This makes MAT not only an atlas of known materials but potentially a foundation for computational materials exploration.

---
