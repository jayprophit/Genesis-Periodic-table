# 0004 Beryllium — Locked Visual Specification

## Core Visual Rule

The Beryllium package must distinguish:

```text
ATOM
HCP METAL
ISOTOPE
NUCLEAR REACTION
CERAMIC
ALLOY
X-RAY WINDOW
FUSION MATERIAL
OCCUPATIONAL EXPOSURE STATE
```

---

# V01 — Natural / Material Manifestation

```text
images/natural/0004-Beryllium-Be-FIG-001-Metallic-Beryllium.png
```

Show a documented Beryllium metal specimen or engineered form.

Caption must distinguish:

```text
ELEMENTAL METAL
```

from:

```text
BERYL / EMERALD / Be-CONTAINING MINERAL
```

Classification:

```text
PHOTOGRAPHIC / REFERENCE
```

---

# V02 — Conventional 2D Scientific Representation

```text
images/scientific/0004-Beryllium-Be-FIG-002-Atomic-Identity.svg
```

Show:

```text
Be
Z = 4
1s2 2s2
1S0
9.0121831(5)
```

---

# V03 — Bonding / Lattice

```text
diagrams/bonding/0004-Beryllium-Be-DIAGRAM-001-HCP-Lattice.svg
```

Show:

```text
HCP unit cell
P63/mmc
a ≈ 2.2858 Å
c ≈ 3.5843 Å
```

Required label:

```text
CRYSTAL STRUCTURE
NOT MOLECULAR Be-Be BONDS
```

---

# V04 — Atomic / Electron Probability

Primary:

```text
images/quantum/0004-Beryllium-Be-FIG-003-Electron-Probability.svg
```

Secondary:

```text
images/quantum/0004-Beryllium-Be-FIG-004-Energy-Level-Structure.svg
```

Show:

```text
1s2 core
2s2 outer subshell
```

and distinguish:

```text
FILLED 2s SUBSHELL
≠
CLOSED n=2 SHELL
```

---

# V05 — Isotope / Nuclear

```text
images/isotope/0004-Beryllium-Be-FIG-005-Isotope-Map.svg
```

Show ⁵Be through ¹⁶Be.

Highlight:

```text
8Be → transient triple-alpha bridge
9Be → stable engineering isotope
10Be → long-lived cosmogenic clock
```

Use distinct symbols for:

```text
stable
radioactive
proton-unbound
neutron-unbound
multi-particle emitter
```

---

# V06 — Spectral / Frequency

```text
images/spectral/0004-Beryllium-Be-FIG-006-Spectral-Fingerprint.svg
```

Panels:

```text
Be I
Be II
fine structure
isotope effects
plasma spectra
phonons
acoustics
9Be NMR
```

Feature:

$$
\lambda=234.8610\ {\rm nm}
$$

for the strong Be I transition.

Required rule:

```text
NO SINGLE UNIVERSAL BERYLLIUM FREQUENCY
```

---

# V07 — Physical Property Dashboard

```text
images/properties/0004-Beryllium-Be-FIG-007-Bulk-Property-Dashboard.svg
```

Include:

```text
density
Young modulus
thermal conductivity
electrical resistivity
thermal expansion
sound velocity
```

with reference-state labels.

---

# V08 — Electrical / Charge State

```text
diagrams/fields/0004-Beryllium-Be-DIAGRAM-002-Charge-and-Electronic-State.svg
```

Show:

```text
Be
Be+
Be2+
Be3+
Be4+
```

and separately:

```text
metallic electronic conduction
```

Do not assign bulk-metal conductivity to isolated Be ions.

---

# V09 — Magnetic / Nuclear Spin

```text
diagrams/fields/0004-Beryllium-Be-DIAGRAM-003-Magnetic-and-Spin-State.svg
```

Show:

```text
neutral ground-state Be: J = 0
9Be nucleus: I = 3/2
10Be nucleus: I = 0
```

Distinguish:

```text
atomic electronic magnetism
bulk response
nuclear spin
NMR
```

Permanent engineered magnetization:

```text
NOT-APPLICABLE
```

to ordinary bulk Be unless part of a specifically engineered composite.

---

# V10 — Thermal

```text
images/properties/0004-Beryllium-Be-FIG-008-Thermal-State.svg
```

Show:

```text
HCP solid
thermal expansion
melting region
liquid state
high-temperature vapor
```

---

# V11 — Mechanical / Structural

```text
images/properties/0004-Beryllium-Be-FIG-009-Specific-Stiffness.svg
```

Show:

$$
E/\rho
$$

and HCP anisotropy.

Secondary schematic may show:

```text
grain orientation
texture
slip geometry
```

Required warning:

```text
ONE ELASTIC MODULUS DOES NOT FULLY REPRESENT HCP ANISOTROPY
```

---

# V12 — Phase / Pressure / Environment

```text
images/properties/0004-Beryllium-Be-FIG-010-Pressure-Phase-Map.svg
```

Axes:

```text
temperature
pressure
```

Include only experimentally/computationally supported phase boundaries.

Status:

```text
DATASET-REQUIRED
```

---

# V13 — Process / Transformation Network

```text
diagrams/processes/0004-Beryllium-Be-DIAGRAM-004-Transformation-Network.svg
```

Show:

```text
Be metal
├── oxidation → BeO
├── alloying → Be-Cu / Be-Al / beryllides
├── machining → particulate/exposure pathway
├── heating → liquid Be
├── alpha reaction → C + n
├── neutron reaction → multiplier pathways
└── fluorides + LiF → molten-salt material systems
```

Chemical, manufacturing and nuclear branches must have separate edge classes.

---

# V14 — Knowledge Graph

```text
diagrams/relationships/0004-Beryllium-Be-DIAGRAM-005-Knowledge-Graph.svg
```

Clusters:

```text
He → Be → C NUCLEAR BRIDGE
Li ↔ Be FUSION MATERIALS
Li-Be-F FLIBE
Be-O CERAMIC
Be-Cu ALLOY
Be-Al STRUCTURAL
Be-Ti BERYLLIDE
X-RAY APPLICATIONS
OCCUPATIONAL SAFETY
PEOPLE
SOURCES
```

---

# V15 — Scientific 3D

Model 1:

```text
models/scientific/0004-Beryllium-Be-MODEL-SCI-001-HCP-Lattice.glb
```

Model 2:

```text
models/scientific/0004-Beryllium-Be-MODEL-SCI-002-Atomic-Probability.glb
```

Optional future nuclear model:

```text
models/scientific/0004-Beryllium-Be-MODEL-SCI-003-Be8-Cluster-Schematic.glb
```

If used:

```text
NUCLEAR STRUCTURE SCHEMATIC
NOT LITERAL FIXED NUCLEON POSITIONS
```

---

# V16 — Data-Extruded 3D

```text
models/data-extruded/0004-Beryllium-Be-MODEL-DATA-001.glb
```

Must use the universal MAT transform.

Do not customize the transform simply to make Beryllium visually dramatic.

---

# V17 — Applications

```text
images/applications/0004-Beryllium-Be-FIG-011-Applications.svg
```

Clusters:

```text
AEROSPACE
X-RAY WINDOWS
OPTICAL / INSTRUMENT STRUCTURES
Be-Cu ALLOYS
BeO CERAMICS
NUCLEAR / NEUTRON SCIENCE
FUSION MULTIPLIERS
COSMOGENIC 10Be SCIENCE
```

Safety marker must accompany manufacturing-intensive applications.

---

# V18 — Evidence / Provenance / Safety

```text
diagrams/relationships/0004-Beryllium-Be-DIAGRAM-006-Evidence-Provenance-Safety.svg
```

Show:

```text
NIST ASD
→ atomic/spectral

NIST isotope data + NUBASE
→ nuclear

crystallographic/material references
→ bulk HCP

NIST BeO
→ ceramic properties

IAEA / fusion engineering
→ multiplier role

OSHA
→ occupational exposure

historical sources
→ discovery and neutron lineage
```

Add a safety overlay:

```text
PROCESS
↓
AIRBORNE MATERIAL FORM
↓
EXPOSURE
↓
CONTROL
```

---
