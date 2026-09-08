# 0001 Hydrogen — Visual Specification

## Record

```text
MAT:0001
0001-Hydrogen-H
```

## Visual Rule

Hydrogen cannot be represented correctly by one picture.

The visual package must distinguish:

```text
ELEMENT IDENTITY
ATOMIC STATE
ISOTOPE
MOLECULE
PHASE
PLASMA
HOST-MATERIAL INTERACTION
NUCLEAR PROCESS
```

---

# V01 — Natural / Material Manifestation

Asset:

```text
images/natural/0001-Hydrogen-H-FIG-001-Natural-Material-State.png
```

Asset ID:

```text
MAT:0001:FIG:V01:001
```

Required concept:

Show molecular hydrogen as a real physical material manifestation.

Preferred context:

```text
cryogenic liquid hydrogen
or
scientifically documented hydrogen gas/discharge context
```

Required caption:

```text
Hydrogen under ordinary chemical conditions is predominantly molecular H2,
not a macroscopic sample of isolated H atoms.
```

Classification:

```text
PHOTOGRAPHIC / REFERENCE
```

Status:

```text
SOURCE-IMAGE-REQUIRED
```

---

# V02 — Conventional 2D Scientific Representation

Filename:

```text
images/scientific/0001-Hydrogen-H-FIG-002-Atomic-Identity.svg
```

Show:

```text
H
Atomic number 1
Standard atomic weight [1.00784, 1.00811]
1s1
```

Include a small Bohr-style educational schematic only if labelled:

```text
SCHEMATIC — NOT LITERAL ELECTRON ORBIT
```

Status:

```text
READY-FOR-GENERATION
```

---

# V03 — Bonding / Molecular View

Filename:

```text
diagrams/bonding/0001-Hydrogen-H-DIAGRAM-001-H2-Bonding.svg
```

Show:

$$
H-H
$$

and:

$$
r_e\approx0.74144\ \AA
$$

Include:

```text
H2 ground state: X 1Sigma_g+
```

Also show:

```text
H2
HD
D2
HT
DT
T2
```

as isotopologue branches.

Status:

```text
READY-FOR-GENERATION
```

---

# V04 — Electron Probability / Atomic Structure

Primary filename:

```text
images/quantum/0001-Hydrogen-H-FIG-003-1s-Probability-Density.svg
```

Secondary filename:

```text
images/quantum/0001-Hydrogen-H-FIG-004-Energy-Level-Structure.svg
```

Show:

* proton/nuclear origin;
* 1s electron probability density;
* radial probability;
* selected energy levels;
* ionization continuum.

Required warning:

```text
Probability density is not a classical orbital path.
```

Classification:

```text
SCIENTIFIC-SCHEMATIC / COMPUTATIONAL
```

---

# V05 — Isotope / Nuclear Variants

Filename:

```text
images/isotope/0001-Hydrogen-H-FIG-005-Isotope-Map.svg
```

Show:

```text
1H   1p 0n   STABLE
2H   1p 1n   STABLE
3H   1p 2n   12.32 y
4H   1p 3n   ~139 ys
5H   1p 4n   ~86 ys
6H   1p 5n   ~294 ys evaluated
7H   1p 6n   highly uncertain
```

Short-lived nuclear drawings must be labelled:

```text
NUCLEAR SCHEMATIC
NOT LITERAL FIXED NUCLEON POSITIONS
```

Include an evidence marker on ⁶H noting:

```text
2025 POST-NUBASE2020 MEASUREMENT AVAILABLE
```

---

# V06 — Spectral / Frequency Fingerprint

Filename:

```text
images/spectral/0001-Hydrogen-H-FIG-006-Spectral-Fingerprint.svg
```

Multi-panel figure containing separate domains:

```text
ATOMIC ELECTRONIC
FINE STRUCTURE
HYPERFINE
H2 ROTATIONAL
H2 VIBRATIONAL
MOLECULAR ELECTRONIC
PLASMA
MAGNETIC RESONANCE
```

Prominent rule:

```text
HYDROGEN DOES NOT HAVE ONE UNIVERSAL FREQUENCY
```

Include:

$$
\nu_{\rm HF}
=
1420.405751768\ {\rm MHz}
$$

and label it:

```text
ATOMIC 1H GROUND-STATE HYPERFINE TRANSITION
```

not:

```text
HYDROGEN FREQUENCY
```

---

# V07 — Physical Property Dashboard

Filename:

```text
images/properties/0001-Hydrogen-H-FIG-007-Physical-Property-Dashboard.svg
```

Separate property cards by state.

Examples:

```text
ATOMIC H
MOLECULAR H2
NORMAL H2
PARA-H2
ORTHO-H2
LIQUID H2
SOLID H2
PLASMA
```

Do not place one generic density or boiling point beside "Hydrogen" without identifying the state.

---

# V08 — Electrical / Charge-State Visualization

Filename:

```text
diagrams/fields/0001-Hydrogen-H-DIAGRAM-002-Charge-and-Electrical-State.svg
```

Show:

```text
H-
H
H+
H2
H2+
H3+
electron
hydrogen plasma
```

Show ionization threshold:

$$
13.598434599702\ {\rm eV}
$$

Rule:

```text
Electrical behavior is state-dependent.
Neutral H2 gas and ionized plasma must not share one generic conductivity value.
```

---

# V09 — Magnetic / Spin / Field Visualization

Filename:

```text
diagrams/fields/0001-Hydrogen-H-DIAGRAM-003-Magnetic-Spin-Field-State.svg
```

Show separately:

```text
electron spin
proton nuclear spin
deuteron spin
triton spin
hyperfine coupling
Zeeman splitting
ortho-H2
para-H2
```

Do not depict Hydrogen as a permanent bar magnet.

Engineered magnetization fields:

```text
NOT-APPLICABLE TO FREE HYDROGEN AS A PERMANENT-MAGNET MATERIAL
```

---

# V10 — Thermal / Cryogenic Visualization

Filename:

```text
images/properties/0001-Hydrogen-H-FIG-008-Thermal-Cryogenic-State.svg
```

Show:

```text
gas
liquid
solid
normal-H2
ortho-H2
para-H2
```

Reference point:

$$
T_b(e-H_2)\approx20.271\ {\rm K}
$$

under the normal-boiling-point reference convention.

Include:

```text
ORTHO/PARA COMPOSITION AFFECTS THERMODYNAMIC PROPERTIES
```

---

# V11 — Mechanical / Host-Material Interaction

Filename:

```text
diagrams/processes/0001-Hydrogen-H-DIAGRAM-004-Host-Material-Interaction.svg
```

Hydrogen has no single useful conventional bulk mechanical-property dashboard comparable with a structural metal.

Instead show:

```text
H2 gas
↓
surface adsorption
↓
atomic H
↓
absorption / diffusion
↓
trapping
↓
possible hydride / material degradation
```

Include:

```text
HYDROGEN EMBRITTLEMENT IS HOST-, STATE-, STRESS-,
TEMPERATURE- AND HISTORY-DEPENDENT
```

Do not present embrittlement as an intrinsic scalar Hydrogen property.

---

# V12 — Phase / Pressure / Environment Visualization

Filename:

```text
images/properties/0001-Hydrogen-H-FIG-009-Phase-Environment-Map.svg
```

Axes/branches may include:

```text
temperature
pressure
molecular/atomic state
ionization
solid/liquid/gas
high-pressure states
plasma
```

Underlying phase curves should eventually come from:

```text
SRC-H-008
```

rather than artistic invention.

---

# V13 — Process / Transformation Diagram

Filename:

```text
diagrams/processes/0001-Hydrogen-H-DIAGRAM-005-Transformation-Network.svg
```

Show major pathways:

```text
H2
├── cooling → liquid H2
├── compression → compressed H2
├── dissociation → atomic H
├── ionization → plasma
├── adsorption → H(surface)
├── absorption → H(host)
├── chemical reaction → compounds
├── electrolysis pathway ← H2O
└── fuel-cell / oxidation pathway → H2O
```

Nuclear branch separately:

```text
D + T
↓
FUSION
↓
4He + n
```

Do not merge chemical and nuclear transformation arrows.

---

# V14 — Relationship / Knowledge Graph

Filename:

```text
diagrams/relationships/0001-Hydrogen-H-DIAGRAM-006-Knowledge-Graph.svg
```

Central node:

```text
MAT:0001 Hydrogen
```

Primary clusters:

```text
ISOTOPES
IONS
MOLECULES
COMPOUNDS
MATERIAL HOSTS
NUCLEAR REACTIONS
BIOLOGICAL CONTEXT
ENERGY
APPLICATIONS
SOURCES
PEOPLE
```

Use edge labels from:

```text
0001-Hydrogen-H-Relationships.yaml
```

---

# V15 — Scientific 3D Models

Scientific model 1:

```text
models/scientific/0001-Hydrogen-H-MODEL-SCI-001-1s-Probability.glb
```

Classification:

```text
QUANTUM PROBABILITY ISOSURFACE
```

Scientific model 2:

```text
models/scientific/0001-Hydrogen-H-MODEL-SCI-002-H2-Molecule.glb
```

Classification:

```text
MOLECULAR STRUCTURE MODEL
```

Required metadata for H₂:

```text
representation radius convention
equilibrium bond distance
coordinate system
source
```

---

# V16 — MAT Data-Extruded Model

Filename:

```text
models/data-extruded/0001-Hydrogen-H-MODEL-DATA-001.glb
```

Purpose:

Convert normalized MAT metrics into standardized geometry.

Candidate visual channels:

```text
central index             atomic number
radial segments           isotope branch
vertical dimension        normalized mass metric
ring structure            spectral domains
surface extrusion         thermal metrics
secondary extrusion       electrical metrics
orientation channel       magnetic/spin metrics
satellite nodes           major compounds/process relationships
```

Required label:

```text
MAT DATA-EXTRUDED MODEL
NOT LITERAL ATOMIC GEOMETRY
```

The exact transform must remain identical for comparable element records.

---

# V17 — Applications / Context

Filename:

```text
images/applications/0001-Hydrogen-H-FIG-010-Applications.svg
```

Application clusters:

```text
CHEMICAL FEEDSTOCK
AMMONIA
REFINING
FUEL CELLS
ENERGY STORAGE
ROCKET PROPULSION
MATERIAL PROCESSING
CRYOGENICS
SPECTROSCOPY
ASTRONOMY
FUSION RESEARCH
ISOTOPE SCIENCE
```

Each application should indicate relevant state where practical.

Examples:

```text
H2 → fuel / feedstock
2H / 3H → fusion research
3H → isotope applications
atomic H → spectroscopy / plasma processes
```

---

# V18 — Evidence / Provenance

Filename:

```text
diagrams/relationships/0001-Hydrogen-H-DIAGRAM-007-Evidence-Provenance.svg
```

Show:

```text
NIST ASD
↓
atomic properties

NIST isotope database
↓
mass data

NUBASE2020
↓
evaluated nuclear properties

2025 MAMI-A1
↓
new 6H measurement
↓
retained separately pending future evaluation

NIST WebBook
↓
molecular / atomic data

DOE
↓
engineering storage / safety context
```

Critical visual rule:

```text
NEW MEASUREMENT
DOES NOT SILENTLY REWRITE
EVALUATED DATA
```

---

# Hydrogen Visual Completion Target

```text
V01 SOURCE-IMAGE-REQUIRED
V02 READY-FOR-GENERATION
V03 READY-FOR-GENERATION
V04 READY-FOR-GENERATION
V05 READY-FOR-GENERATION
V06 DATA-EXTRACTION-PARTIAL
V07 DATASET-PARTIAL
V08 READY-FOR-GENERATION
V09 READY-FOR-GENERATION
V10 DATASET-PARTIAL
V11 READY-FOR-GENERATION
V12 EOS-DATA-REQUIRED
V13 READY-FOR-GENERATION
V14 READY-FOR-GENERATION
V15 READY-FOR-GENERATION
V16 TRANSFORM-DEFINITION-REQUIRED
V17 READY-FOR-GENERATION
V18 READY-FOR-GENERATION
```

No missing visual slot may be silently ignored.

---
