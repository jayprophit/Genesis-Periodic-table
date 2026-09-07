# 0005 Boron — Locked Visual Specification

## Core Visual Rule

Boron visuals must distinguish:

```text
ATOM
ISOTOPE
ALLOTROPE
B12 CLUSTER
MULTICENTRE BONDING
HIGH-PRESSURE PHASE
DOPED HOST
COMPOUND
CERAMIC
NUCLEAR FUNCTION
```

No single diagram should imply that one Boron structure represents every Boron state.

---

# V01 — Natural / Material Manifestation

```text
images/natural/0005-Boron-B-FIG-001-Material-Manifestation.png
```

Preferred comparison:

```text
crystalline elemental Boron
amorphous Boron
Boron-containing mineral reference
```

Required caption:

```text
ELEMENTAL BORON MUST BE DISTINGUISHED
FROM BORATE MINERALS AND BORON COMPOUNDS
```

Status:

```text
SOURCE-IMAGE-REQUIRED
```

---

# V02 — Conventional 2D Scientific Representation

```text
images/scientific/0005-Boron-B-FIG-002-Atomic-Identity.svg
```

Show:

```text
B
Z = 5
1s2 2s2 2p1
2P°1/2
standard atomic weight [10.806, 10.821]
```

---

# V03 — Bonding / Cluster / Lattice

Primary:

```text
diagrams/bonding/0005-Boron-B-DIAGRAM-001-Multicentre-Bonding.svg
```

Show:

```text
2c-2e
versus
3c-2e
```

Secondary:

```text
diagrams/bonding/0005-Boron-B-DIAGRAM-002-B12-Icosahedral-Motif.svg
```

Required rule:

```text
REAL B12 CLUSTERS ARE QUANTUM-MECHANICAL STRUCTURES
NOT PERFECT RIGID MATHEMATICAL ICOSAHEDRA
```

---

# V04 — Atomic / Electron Probability

Primary:

```text
images/quantum/0005-Boron-B-FIG-003-Electron-Probability.svg
```

Show:

```text
1s2 core
2s2
2p1
```

Secondary:

```text
images/quantum/0005-Boron-B-FIG-004-Valence-Bonding-Transition.svg
```

Illustrate:

```text
ATOM
↓ bonding
CLUSTER / SOLID ELECTRONIC STATE
```

without implying classical orbital paths.

---

# V05 — Isotope / Nuclear

```text
images/isotope/0005-Boron-B-FIG-005-Isotope-Map.svg
```

Show ⁶B–²¹B.

Highlight:

```text
10B → stable / neutron capture
11B → stable / proton-fusion research
```

Represent separately:

```text
exact lifetime
lower bound
upper bound
stable
unbound
```

---

# V06 — Spectral / Frequency

```text
images/spectral/0005-Boron-B-FIG-006-Spectral-Fingerprint.svg
```

Panels:

```text
B I
B II
fine structure
isotope shifts
10B NMR
11B NMR
Raman
phonons
molecular vibrations
plasma spectra
```

Representative B I lines:

```text
182.5894 nm
182.6400 nm
208.8889 nm
208.9570 nm
249.6769 nm
249.7722 nm
```

Required rule:

```text
NO SINGLE UNIVERSAL BORON FREQUENCY
```

---

# V07 — Physical / Electronic Property Dashboard

```text
images/properties/0005-Boron-B-FIG-007-State-Dependent-Properties.svg
```

Instead of one generic dashboard, show columns for:

```text
alpha-B12
beta-B106
gamma-B28
amorphous B
```

Possible metrics:

```text
density
band gap/electronic class
hardness
conductivity
thermal behavior
pressure stability
```

Use only sourced state-resolved values.

---

# V08 — Electrical / Semiconductor / Doping

```text
diagrams/fields/0005-Boron-B-DIAGRAM-003-Electronic-and-Doping-State.svg
```

Separate:

```text
elemental Boron electronic state
B as acceptor in Si
B as dopant in diamond
high-pressure metallic B
```

Required equation concept:

$$
\text{host}
+
\text{B concentration}
+
\text{process}
\rightarrow
\text{carrier state}
$$

---

# V09 — Magnetic / Nuclear Spin

```text
diagrams/fields/0005-Boron-B-DIAGRAM-004-Isotope-Spin-and-NMR.svg
```

Show:

```text
10B: I = 3
11B: I = 3/2
```

NMR frequency must be shown as:

$$
\nu=
\frac{\gamma}{2\pi}B
$$

so field dependence is explicit.

---

# V10 — Thermal / Combustion

```text
images/properties/0005-Boron-B-FIG-008-Thermal-and-Combustion-State.svg
```

Show separately:

```text
solid Boron
melting
high-temperature liquid/vapor regime
oxidation
oxide-layer-limited ignition
```

Required rule:

```text
HIGH THEORETICAL REACTION ENERGY
DOES NOT MEAN EASY PRACTICAL COMBUSTION
```

---

# V11 — Mechanical / Structural Geometry

```text
images/properties/0005-Boron-B-FIG-009-Cluster-Structural-Geometry.svg
```

Show:

```text
B12 icosahedra
rhombohedral connectivity
beta-B complexity
gamma-B28 B12 + B2
```

This is Boron's principal geometry visual.

---

# V12 — Pressure / Phase

```text
images/properties/0005-Boron-B-FIG-010-Pressure-Phase-Map.svg
```

Axes:

```text
pressure
temperature
```

Include when sourced:

```text
alpha-B12
beta-B106
gamma-B28
tetragonal phases
high-pressure metallic region
superconducting observations
```

Status:

```text
DATA-EXTRACTION-REQUIRED
```

Do not invent phase boundaries.

---

# V13 — Transformation Network

```text
diagrams/processes/0005-Boron-B-DIAGRAM-005-Transformation-Network.svg
```

Show:

```text
B
├── pressure → gamma-B28
├── extreme pressure → metallic/superconducting state
├── H → boranes
├── C → B4C
├── N → BN
├── O → B2O3
├── Si host → p-type doped semiconductor
├── Mg → MgB2
├── transition metals → borides
├── neutron + 10B → Li + He
└── proton + 11B → 3 He-4
```

Use separate colors/classes for:

```text
CHEMICAL
MATERIAL
ELECTRONIC
STRUCTURAL
NUCLEAR
```

---

# V14 — Relationship / Knowledge Graph

```text
diagrams/relationships/0005-Boron-B-DIAGRAM-006-Knowledge-Graph.svg
```

Major clusters:

```text
H-B CHEMISTRY
H-B NUCLEAR
B-Li-He NEUTRON CAPTURE
Be-B DECAY
B-C MATERIALS
B-N MATERIALS
B-O GLASS
B-Si DOPING
B-Mg SUPERCONDUCTOR
B-METAL BORIDES
B12 GEOMETRY
PEOPLE / SOURCES
```

This should make the legacy result visible:

```text
H-He-Li-Be-B-C
```

is already a connected nuclear transformation network before Carbon's own record is complete.

---

# V15 — Scientific 3D

Model 1:

```text
models/scientific/0005-Boron-B-MODEL-SCI-001-B12-Icosahedral-Cluster.glb
```

Classification:

```text
SCIENTIFIC-STRUCTURAL-SCHEMATIC
```

Model 2:

```text
models/scientific/0005-Boron-B-MODEL-SCI-002-Gamma-B28-Cell.glb
```

Show:

```text
B12 units
B2 pairs
Pnnm arrangement
```

Optional later:

```text
models/scientific/0005-Boron-B-MODEL-SCI-003-Beta-Boron-Complex-Cell.glb
```

Do not simplify β-Boron into a perfect occupancy model if the real structure contains partial occupancy/disorder.

---

# V16 — Data-Extruded 3D

```text
models/data-extruded/0005-Boron-B-MODEL-DATA-001.glb
```

Must use the identical universal MAT transformation applied to H, He, Li and Be.

Geometry-driven Boron must **not** receive a hand-tuned transform merely because its physical structures are visually distinctive.

---

# V17 — Applications

```text
images/applications/0005-Boron-B-FIG-011-Applications.svg
```

Clusters:

```text
NEUTRON DETECTION / ABSORPTION
B4C CERAMICS
BN MATERIALS
BOROSILICATE GLASS
SEMICONDUCTOR DOPING
BORIDES
MgB2
BORANES / CLUSTER CHEMISTRY
PLANT NUTRITION
FUSION RESEARCH
```

Isotope-specific labels must accompany nuclear applications.

---

# V18 — Evidence / Provenance

```text
diagrams/relationships/0005-Boron-B-DIAGRAM-007-Evidence-Provenance.svg
```

Show:

```text
NIST ASD
→ atomic / spectroscopy

NIST isotope tables + NUBASE
→ isotope branch

NIST neutron data
→ 10B capture

Oganov et al.
→ gamma-B28

Eremets et al.
→ pressure superconductivity

NIST ceramics
→ B4C / BN

NASA
→ combustion

Nobel / Wade
→ borane bonding lineage
```

Historical/unverified overlays must remain outside the core evidence path.

---
