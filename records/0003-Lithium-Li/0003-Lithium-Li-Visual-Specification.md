# 0003 Lithium — Locked Visual Specification

## V01 — Natural / Material Manifestation

```text
images/natural/0003-Lithium-Li-FIG-001-Metallic-Lithium.png
```

Show metallic Lithium under a controlled atmosphere/storage context.

Required label:

```text
REACTIVE ELEMENTAL METAL
SURFACE APPEARANCE DEPENDS ON EXPOSURE HISTORY
```

---

## V02 — Conventional 2D Scientific Representation

```text
images/scientific/0003-Lithium-Li-FIG-002-Atomic-Identity.svg
```

Include:

```text
Li
Z = 3
[He]2s1
2S1/2
standard atomic weight [6.938, 6.997]
```

---

## V03 — Bonding / Lattice

```text
diagrams/bonding/0003-Lithium-Li-DIAGRAM-001-BCC-Metallic-Bonding.svg
```

Show:

```text
BCC lattice
delocalized valence-electron concept
```

Required warning:

```text
METALLIC BONDING SCHEMATIC
NOT DISCRETE Li-Li MOLECULES
```

---

## V04 — Atomic / Electron Probability

```text
images/quantum/0003-Lithium-Li-FIG-003-Core-Valence-Probability.svg
```

Show:

```text
1s2 core
2s valence state
```

Optional second asset:

```text
images/quantum/0003-Lithium-Li-FIG-004-Energy-Level-Structure.svg
```

---

## V05 — Isotope / Nuclear

```text
images/isotope/0003-Lithium-Li-FIG-005-Isotope-Map.svg
```

Distinguish:

```text
stable
radioactive
proton-unbound
neutron-unbound
halo nucleus
uncertain state
```

Do not visually treat every mass-table entry as an ordinary bound isotope.

---

## V06 — Spectral / Frequency

```text
images/spectral/0003-Lithium-Li-FIG-006-Spectral-Fingerprint.svg
```

Include separate panels:

```text
Li I electronic
670.8 nm resonance doublet
fine structure
hyperfine
isotope shift
Li II / Li III
solid phonons
plasma emission
NMR
```

Required rule:

```text
NO SINGLE UNIVERSAL LITHIUM FREQUENCY
```

---

## V07 — Physical Property Dashboard

```text
images/properties/0003-Lithium-Li-FIG-007-Bulk-Property-Dashboard.svg
```

Include:

```text
density
melting point
thermal conductivity
electrical resistivity
elastic moduli
thermal expansion
```

All with explicit reference conditions.

---

## V08 — Electrical / Electrochemical State

```text
diagrams/fields/0003-Lithium-Li-DIAGRAM-002-Electronic-and-Ionic-Transport.svg
```

Separate:

```text
electron conduction in Li metal
Li+ migration in electrolyte
Li+ migration in solid host
electron flow through external circuit
```

---

## V09 — Magnetic State

```text
diagrams/fields/0003-Lithium-Li-DIAGRAM-003-Atomic-vs-Bulk-Magnetic-State.svg
```

Show:

```text
isolated Li atom → unpaired 2s electron
bulk Li → collective metallic magnetic response
6Li nuclear spin
7Li nuclear spin
```

No permanent-magnet pole geometry unless a specific engineered material justifies it.

---

## V10 — Thermal

```text
images/properties/0003-Lithium-Li-FIG-008-Thermal-State.svg
```

Show:

```text
solid
melting at 453.61 K
liquid
high-temperature vapor regime
```

---

## V11 — Mechanical / Structural

```text
images/properties/0003-Lithium-Li-FIG-009-Mechanical-Crystal-State.svg
```

Show:

```text
BCC lattice
elasticity
plastic deformation
grain/defect structure
pressure-dependent transformations
```

---

## V12 — Pressure / Phase

```text
images/properties/0003-Lithium-Li-FIG-010-Pressure-Phase-Map.svg
```

Axes:

```text
pressure
temperature
```

Use actual phase data before rendering final boundaries.

Status:

```text
DATASET-REQUIRED
```

---

## V13 — Process / Transformation Network

```text
diagrams/processes/0003-Lithium-Li-DIAGRAM-004-Transformation-Network.svg
```

Branches:

```text
Li metal
├── ionization → Li+
├── melting → liquid Li
├── water → LiOH + H2
├── H2 → LiH
├── N2 → Li3N
├── electrochemical plating/stripping
├── host insertion
├── alloying
└── neutron reactions
```

Keep chemical and nuclear branches visually distinct.

---

## V14 — Knowledge Graph

```text
diagrams/relationships/0003-Lithium-Li-DIAGRAM-005-Knowledge-Graph.svg
```

Clusters:

```text
ISOTOPES
ALKALI PERIODICITY
H / He NUCLEAR
C / Si HOSTS
O / N / H CHEMISTRY
BATTERIES
ALLOYS
FUSION
BIOLOGICAL / MEDICAL
PEOPLE
SOURCES
```

This visual should explicitly demonstrate **multiple relationship dimensions**.

---

## V15 — Scientific 3D

Model 1:

```text
models/scientific/0003-Lithium-Li-MODEL-SCI-001-BCC-Lattice.glb
```

Model 2:

```text
models/scientific/0003-Lithium-Li-MODEL-SCI-002-Atomic-Probability.glb
```

Optional later:

```text
models/scientific/0003-Lithium-Li-MODEL-SCI-003-Li11-Halo-Schematic.glb
```

The halo model must be labelled:

```text
NUCLEAR DISTRIBUTION SCHEMATIC
NOT ELECTRON-CLOUD GEOMETRY
```

---

## V16 — Data-Extruded 3D

```text
models/data-extruded/0003-Lithium-Li-MODEL-DATA-001.glb
```

Must use exactly the same MAT normalization transform as Hydrogen and Helium.

---

## V17 — Applications

```text
images/applications/0003-Lithium-Li-FIG-011-Applications.svg
```

Clusters:

```text
BATTERIES
LIGHT ALLOYS
CERAMICS
GLASS
LUBRICANTS
ORGANIC SYNTHESIS
MEDICINES
FUSION BREEDING
NUCLEAR DETECTION / REACTIONS
LIQUID-METAL RESEARCH
```

---

## V18 — Evidence / Provenance

```text
diagrams/relationships/0003-Lithium-Li-DIAGRAM-006-Evidence-Provenance.svg
```

Show:

```text
NIST ASD
→ atomic data

NIST isotope data + NUBASE
→ isotope/nuclear data

NIST TN 2273
→ thermal reference

crystallography/material references
→ bulk material

Nobel / primary papers
→ battery lineage

IAEA / fusion references
→ breeding context
```

---
