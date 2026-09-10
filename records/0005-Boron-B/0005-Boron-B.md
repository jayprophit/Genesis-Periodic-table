
# 0005 — Boron — B

---
mat_id: MAT:0005
record_name: Boron
symbol: B
record_class: CHEMICAL_ELEMENT
atomic_number: 5
parent_id: MAT:0000
schema_version: 1.0.0
record_version: 1.0.0
status: RESEARCHED
legacy_id: G0005
legacy_name: Boron
reference_implementation:
  - MAT:0001
  - MAT:0002
  - MAT:0003
  - MAT:0004
---

# 0. Record Navigation

Previous primary record:

MAT:0004
0004-Beryllium-Be

Current record:

MAT:0005
0005-Boron-B

---

# 1. Elemental Identity

| Property | Value |
|---|---|
| MAT ID | MAT:0005 |
| Element | Boron |
| Symbol | B |
| Atomic number | 5 |
| Proton count | 5 |
| Neutral electron count | 5 |
| Period | 2 |
| Group | 13 |
| Block | p |
| Ground configuration | 1s²2s²2p¹ |
| Ground level | ²P°₁/₂ |
| Standard atomic weight | [10.806, 10.821] |
| Ordinary state near room conditions | solid |
| Common classification | metalloid / covalent elemental solid |

Primary sources:

SRC-000005
SRC-000063
SRC-000065

---

# 2. First MAT p-Block Element

Boron is the first MAT element with a ground-state electron occupying a p orbital:

\[
1s^22s^22p^1
\]

The transition from Beryllium is:

\[
2s^2
\rightarrow
2s^22p^1
\]

This introduces a major new schema branch:

- directional p-orbital participation;
- electron-deficient bonding;
- multicentre bonding;
- cluster structures;
- allotrope-dependent electronic behavior;
- complex covalent elemental solids.

---

# 3. Open-Shell Atomic State

The ground level is:

\[
{}^2P^\circ_{1/2}
\]

The isolated neutral atom therefore has an open-shell electronic state.

This must remain separate from the magnetic/electronic properties of bulk crystalline Boron.

Atomic state:

MAT:0005:ATOM:B

---

# 4. First Ionisation

\[
B\rightarrow B^+ + e^-
\]

NIST ASD:

\[
E_{I1}
=
8.298019\pm0.000003\ {\rm eV}
\]

Canonical ion:

MAT:0005:ION:B+1

---

# 5. Ionisation Ladder

Second ionisation:

\[
B^+\rightarrow B^{2+}+e^-
\]

\[
E_{I2}
=
25.15483\pm0.00005\ {\rm eV}
\]

Third:

\[
B^{2+}\rightarrow B^{3+}+e^-
\]

\[
E_{I3}
=
37.93059\pm0.00007\ {\rm eV}
\]

Higher core-electron removal requires much larger energies:

\[
E_{I4}\approx259.374379\ {\rm eV}
\]

\[
E_{I5}\approx340.2260225\ {\rm eV}
\]

Canonical states:

MAT:0005:ATOM:B
MAT:0005:ION:B+1
MAT:0005:ION:B+2
MAT:0005:ION:B+3
MAT:0005:ION:B+4
MAT:0005:ION:B+5

The large jump after removal of the valence electrons distinguishes:

VALENCE-ELECTRON IONISATION

from:

CORE-ELECTRON IONISATION

---

# 6. Electron Affinity

A precision experimental electron-affinity determination gives:

\[
EA
=
0.279743\pm0.000044\ {\rm eV}
\]

for atomic Boron.

Source:

SRC-000064

This is an atomic-state property.

It must not be confused with electron acceptance in a Boron-containing solid, semiconductor or compound.

---

# 7. Ordinary Material State

Representative room-condition properties include approximately:

| Property | Reference |
|---|---:|
| Density | 2.34 g cm⁻³ |
| Melting point | 2350 K |
| Boiling point | 4273 K |

These are summary reference values.

Boron is not represented as one universal crystalline state.

---

# 8. Elemental Boron Is an Allotrope Family

Important elemental forms include:

- α-rhombohedral Boron;
- β-rhombohedral Boron;
- γ-B₂₈;
- tetragonal Boron phases;
- amorphous Boron.

Therefore:

\[
B
\rightarrow
\{
B_\alpha,
B_\beta,
B_\gamma,
B_T,
B_{\rm amorphous},
...
\}
\]

Canonical phase children will use individual `PHASE` or `ALLOTROPE` IDs.

No one density, band structure, conductivity or hardness is universal across every allotrope.

---

# 9. Electron-Deficient Bonding

Boron has three valence electrons:

\[
2s^22p^1
\]

Yet many Boron structures contain connectivity that cannot be described adequately using only conventional isolated two-centre/two-electron bonds.

Boron therefore activates the MAT multicentre-bonding layer.

Important class:

\[
3c-2e
\]

three-centre/two-electron bonding.

MAT rule:

\[
\boxed{
\text{bond}
\neq
\text{always one electron pair between two atoms}
}
\]

---

# 10. B₁₂ Icosahedral Motif

One of Boron's most important structural motifs is:

\[
B_{12}
\]

organized approximately as an icosahedral cluster.

This is not an artistic geometry imposed on the data.

It is a structure arising from real Boron bonding physics.

MAT geometric descriptor:

```yaml
geometry_family:
  - ICOSAHEDRAL
  - POLYHEDRAL
  - CLUSTER-BASED
````

---

# 11. Geometry–Electronic Feedback

Boron provides a particularly strong demonstration that:

$$
\text{electron count}
+
\text{bonding constraints}
\rightarrow
\text{cluster geometry}
$$

and:

$$
\text{cluster geometry}
\rightarrow
\text{electronic/material stability}
$$

Thus geometry is not merely a visualization output.

It can become part of the causal material-state representation.

---

# 12. Material-State Principle

For Boron:

$$
M_B=
F(
\text{allotrope},
\text{cluster topology},
\text{bonding},
\text{isotope},
T,
P,
\text{defects},
\text{dopants},
\text{history}
)
$$

The element name alone is insufficient to define its bulk behavior.

---

# 13. Semiconductor-Like Behavior

Several elemental Boron states exhibit semiconducting behavior.

However MAT does not use:

```text
boron_is_semiconductor: true
```

as an unconditional property.

Instead electronic character must specify:

* allotrope;
* pressure;
* temperature;
* defect density;
* impurity concentration;
* carrier state.

---

# 14. Boron as Dopant

Boron is widely used as an acceptor/p-type dopant in suitable semiconductor hosts.

Important future relationships include:

MAT:0014 Silicon

MAT:0006 Carbon

and other semiconductor systems.

The doped-host properties belong to:

HOST + BORON + CONCENTRATION + PROCESS HISTORY

rather than elemental Boron alone.

---

# 15. Isotope Family

Current NIST mass data cover:

$$
{}^6B
$$

through:

$$
{}^{21}B
$$

within the present table.

Natural Boron contains two stable isotopes:

$$
{}^{10}B
$$

and:

$$
{}^{11}B
$$

with representative NIST isotopic compositions:

$$
{}^{10}B
=
0.199\pm0.007
$$

$$
{}^{11}B
=
0.801\pm0.007
$$

These proportions are not universal constants for every natural or enriched Boron sample.

---

# 16. Standard Atomic Weight Interval

Because Boron isotope ratios vary naturally:

$$
A_r(B)
=
[10.806,\ 10.821]
$$

MAT stores the interval itself rather than silently converting it to one fixed decimal.

This follows the same isotope-sensitive architecture used for Hydrogen and Lithium.

---

# 17. Boron-10

Canonical ID:

MAT:0005:ISO:B-10

Nucleus:

* 5 protons;
* 5 neutrons.

Relative atomic mass:

$$
10.01293695(41)\ {\rm u}
$$

Status:

STABLE

Spin/parity:

$$
3^+
$$

Representative composition:

$$
0.199(7)
$$

¹⁰B is especially important because of its strong neutron-capture behavior.

---

# 18. Boron-11

Canonical ID:

MAT:0005:ISO:B-11

Nucleus:

* 5 protons;
* 6 neutrons.

Relative atomic mass:

$$
11.00930536(45)\ {\rm u}
$$

Status:

STABLE

Spin/parity:

$$
\frac32^-
$$

Representative composition:

$$
0.801(7)
$$

¹¹B is the more abundant natural isotope and has important nuclear-research relationships including proton–Boron fusion.

---

# 19. Nuclear Spin and Magnetic Resonance

Both stable isotopes possess nonzero nuclear spin:

$$
{}^{10}B:\ I=3
$$

$$
{}^{11}B:\ I=\frac32
$$

Therefore both are NMR-active.

MAT must distinguish:

* ¹⁰B NMR;
* ¹¹B NMR;
* abundance;
* gyromagnetic behavior;
* local chemical environment;
* field strength;
* resonance mechanism.

There is no universal:

```text
boron_NMR_frequency
```

without field and isotope.

---

# 20. Boron-10 Neutron Capture

A central Boron nuclear relationship is:

$$
{}^{10}B+n
\rightarrow
{}^7Li+\alpha
$$

with branch-dependent energy release.

This links:

MAT:0005 Boron

to:

MAT:0003 Lithium

and:

MAT:0002 Helium

through one isotope-specific nuclear reaction.

The detailed capture cross section, product branching and Q-values will be stored in the nuclear-calculation layer.

---

# 21. Boron-11 Proton-Fusion Research

A major research reaction is:

$$
p+{}^{11}B
\rightarrow
3\alpha
$$

where:

$$
p={}^1H^+
$$

This creates a nuclear relationship:

MAT:0001 Hydrogen
↔
MAT:0005 Boron

with Helium-4 products.

This is an advanced fusion-research pathway.

It must not be represented as a commercially mature energy process.

---

# 22. Chemical and Nuclear H–B Relationships

Hydrogen and Boron have at least two very different relationship families.

Chemical:

$$
B_xH_y
$$

boranes.

Nuclear:

$$
p+{}^{11}B
\rightarrow
3\alpha
$$

Therefore:

$$
\boxed{
H-B_{\rm chemical}
\neq
H-B_{\rm nuclear}
}
$$

---

# 23. Boranes

Boron forms a rich family of Hydrogen-containing compounds:

$$
B_xH_y
$$

Many exhibit:

* multicentre bonding;
* cage structures;
* cluster geometry;
* electron-deficient bonding.

Boranes therefore become a major MAT test of molecular topology beyond simple chain/ring chemistry.

---

# 24. Boron Carbide

Future material/compound family:

$$
B_4C
$$

Canonical relationship:

MAT:0005
↔
MAT:0006

Target status:

RESERVED-PENDING-CARBON

Important emergent properties can include:

* high hardness;
* low density;
* wear resistance;
* neutron absorption;
* ceramic behavior.

Those belong to B₄C, not elemental Boron.

---

# 25. Boron Nitride

Future relationship:

MAT:0005
↔
MAT:0007

with BN material families including:

* hexagonal BN;
* cubic BN;
* layered/nanoscale forms.

A particularly useful MAT comparison will be:

$$
B-N
\leftrightarrow
C-C
$$

because lattice topology and electron count can produce analogous but chemically distinct material structures.

---

# 26. Boron Oxide and Glass Networks

Important future compound:

$$
B_2O_3
$$

Boron oxide can participate with silica-rich systems to form borosilicate glasses.

Potential material objectives include:

* thermal-shock resistance;
* chemical durability;
* controlled expansion;
* optical transparency.

Thus a future design triangle is:

$$
B+Si+O
$$

---

# 27. Borides

Boron forms numerous metal borides.

Examples include future records such as:

$$
TiB_2
$$

$$
ZrB_2
$$

$$
HfB_2
$$

and Magnesium diboride:

$$
MgB_2
$$

Possible emergent properties include:

* extreme-temperature capability;
* hardness;
* electrical conduction;
* superconductivity;
* chemical resistance.

Again:

$$
\boxed{
\text{compound property}
\neq
\text{element property}
}
$$

---

# 28. Pressure as a State Variable

Historical G0005 correctly identifies pressure as capable of profoundly changing Boron's electronic and structural state.

High-pressure Boron requires dedicated:

```text
phase
pressure
temperature
structure
electronic_state
```

objects.

No simple:

```text
boron_high_pressure_property
```

field is sufficient.

---

# 29. γ-B₂₈

One important high-pressure elemental Boron phase is:

$$
\gamma-B_{28}
$$

Its structure contains Boron cluster units including B₁₂ icosahedra and B₂ pairs.

This is an especially important MAT example of:

$$
\text{same elemental composition}
+
\text{different pressure/geometry}
\rightarrow
\text{different electronic state}
$$

---

# 30. Pressure-Induced Metallisation and Superconductivity

Boron has been experimentally driven into metallic/superconducting states under extreme pressure.

MAT therefore distinguishes:

```text
ambient elemental Boron
```

from:

```text
extreme-pressure metallic Boron
```

and:

```text
extreme-pressure superconducting Boron
```

These are state-dependent properties.

They are not ordinary ambient properties of elemental Boron.

---

# 31. Chemical-Energy Branch

Boron oxidation can release substantial chemical energy.

However legacy G0005 correctly identified that:

$$
\boxed{
\text{high theoretical energy release}
\neq
\text{easy practical combustion}
}
$$

Relevant engineering constraints include:

* ignition;
* oxide layers;
* reaction kinetics;
* incomplete combustion;
* condensed products;
* particle size;
* temperature;
* oxidizer;
* residence time.

---

# 32. Biological Context

Boron has an established essential micronutrient role in plants.

For human biology, MAT must avoid equating this directly with established essentiality at the same evidential level.

Use:

```yaml
plant_essentiality: ESTABLISHED
human_essentiality: NOT-EQUIVALENTLY-ESTABLISHED
biological_effects: COMPOUND-AND-DOSE-DEPENDENT
```

---

# 33. Safety Architecture

Boron cannot receive one universal hazard rating.

Separate:

* elemental Boron;
* boric acid;
* borates;
* boranes;
* B₄C;
* BN;
* borides;
* enriched ¹⁰B/¹¹B material;
* process-generated dust/fume.

Safety therefore remains:

$$
H=
F(
\text{compound},
\text{material form},
\text{dose},
\text{route},
\text{process},
t
)
$$

---

# 34. Relationship Geometry

Boron creates several independent geometry layers.

Nuclear:

H ↔ B → He

B → Li + He

Be → B through radioactive decay

Chemical:

B ↔ H

B ↔ C

B ↔ N

B ↔ O

Material:

B ↔ Si

B ↔ Mg

B ↔ transition metals

Geometric:

B₁₂ icosahedra

cages

polyhedra

cluster solids

The same element can therefore have several unrelated nearest neighbors.

---

# 35. Main MAT Boron Result

Boron introduces one of MAT's strongest causal structure chains yet:

$$
\boxed{
\text{electron count}
\rightarrow
\text{electron deficiency}
\rightarrow
\text{multicentre bonding}
\rightarrow
\text{polyhedral/icosahedral organization}
\rightarrow
\text{emergent material behavior}
}
$$

It also demonstrates isotope functional divergence:

$$
{}^{10}B
\rightarrow
\text{neutron-capture tool}
$$

$$
{}^{11}B
\rightarrow
\text{proton-fusion research tool}
$$

while both remain chemically Boron.

---

# 36. Current Status

```yaml
status: "RESEARCHED"
completeness: "RESEARCHED"

migration_status: "MIGRATED-PENDING-ARCHIVE"

validation:
  schema: "PASS"
  identifiers: "PASS"
  isotope_semantics: "PASS"
  allotrope_architecture: "PASS"
  multicentre_bonding_architecture: "PASS"
  geometry_architecture: "PASS"
  nuclear_architecture: "PASS"
  material_relationship_architecture: "PASS"
  pressure_state_architecture: "PASS"
  dopant_host_architecture: "PASS"
  biological_architecture: "PASS"
  evidence_architecture: "PASS"
  scientific_core: "CORE-VALIDATED"
  exhaustive_content: false

visuals:
  specification: "LOCKED"
  generated: false
```

## Evaluated nuclear data and review

The [NUBASE2020 nuclear state catalogue](0005-Boron-B-Nuclear-Evaluation.md) provides 23 evaluated states with uncertainties, qualifiers and source-line provenance. This dated evaluation does not make the whole material record complete.
