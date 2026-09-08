# 0002 Helium — Visual Specification

## Core Rule

Helium visuals must distinguish:

```text
neutral atom
isotope
ion
excited state
plasma
4He normal liquid
4He superfluid
3He quantum fluid
solid high-pressure state
host-material interaction
```

---

# V01 — Natural / Material Manifestation

Filename:

```text
images/natural/0002-Helium-He-FIG-001-Natural-Material-State.png
```

Preferred scientific context:

```text
liquid helium cryogenic system
or
helium gas/discharge reference
```

Required caption:

```text
Ordinary elemental Helium is monatomic; visible glow in a discharge
comes from excited atomic/ionic states and is not the natural colour of the gas.
```

Status:

```text
SOURCE-IMAGE-REQUIRED
```

---

# V02 — Conventional 2D Representation

Filename:

```text
images/scientific/0002-Helium-He-FIG-002-Atomic-Identity.svg
```

Show:

```text
He
Z = 2
1s2
1S0
standard atomic weight 4.002602(2)
```

---

# V03 — Bonding / Molecular / Excimer View

Filename:

```text
diagrams/bonding/0002-Helium-He-DIAGRAM-001-Atomic-and-Excimer-States.svg
```

Central rule:

```text
ORDINARY BULK HELIUM = MONATOMIC
```

with separate branches:

```text
4He2     weak van-der-Waals dimer
He2+     molecular ion
He2*     excited dimer / excimer
HeH+     molecular ion
```

Do not label He₂ as nonexistent.

Do not depict ordinary bulk gas as stable neutral He₂ molecules.

---

# V04 — Quantum / Electron Probability

Primary:

```text
images/quantum/0002-Helium-He-FIG-003-Two-Electron-Probability.svg
```

Secondary:

```text
images/quantum/0002-Helium-He-FIG-004-Singlet-Triplet-Energy-Structure.svg
```

Show electron correlation conceptually.

Required label:

```text
TWO-ELECTRON QUANTUM SYSTEM
ELECTRON-ELECTRON INTERACTION INCLUDED
```

---

# V05 — Isotope Variants

Filename:

```text
images/isotope/0002-Helium-He-FIG-005-Isotope-Map.svg
```

Show:

```text
3He  FERMION  STABLE
4He  BOSON    STABLE
5He  ~602 ys
6He  ~806.92 ms
7He  ~2.51 zs
8He  ~119.5 ms
9He  high uncertainty
10He ~260 ys
```

Highlight:

```text
NUCLEAR SPIN
↓
QUANTUM STATISTICS
↓
MACROSCOPIC LOW-TEMPERATURE BEHAVIOR
```

---

# V06 — Spectral / Frequency Fingerprint

Filename:

```text
images/spectral/0002-Helium-He-FIG-006-Spectral-Fingerprint.svg
```

Separate:

```text
neutral-He electronic spectrum
singlet states
triplet states
metastable states
He+ spectrum
3He hyperfine/isotope structure
plasma emission
excimer emission
```

Required rule:

```text
NO SINGLE UNIVERSAL HELIUM FREQUENCY
```

---

# V07 — Physical Property Dashboard

Filename:

```text
images/properties/0002-Helium-He-FIG-007-Physical-Property-Dashboard.svg
```

Separate cards:

```text
4He gas
4He liquid He-I
4He liquid He-II
3He gas
3He liquid
solid helium under pressure
helium plasma
```

No generic density card without state conditions.

---

# V08 — Electrical / Ionization

Filename:

```text
diagrams/fields/0002-Helium-He-DIAGRAM-002-Ionization-State.svg
```

Show:

$$
He\rightarrow He^+\rightarrow He^{2+}
$$

with:

$$
E_{I1}=24.587389011\ {\rm eV}
$$

$$
E_{I2}=54.4177655282\ {\rm eV}
$$

---

# V09 — Magnetic / Spin

Filename:

```text
diagrams/fields/0002-Helium-He-DIAGRAM-003-Isotope-Spin-Magnetic-State.svg
```

Contrast:

```text
3He: I = 1/2
4He: I = 0
```

Show ³He NMR relationship.

Permanent engineered magnetization:

```text
NOT-APPLICABLE
```

for free bulk Helium.

---

# V10 — Thermal / Quantum Fluid

Filename:

```text
images/properties/0002-Helium-He-FIG-008-Quantum-Fluid-Phase.svg
```

Primary ⁴He branch:

```text
GAS
↓ 4.2221 K at 1 atm
LIQUID He-I
↓ lambda line
LIQUID He-II
```

Reference lower lambda point:

$$
2.1768\ {\rm K}
$$

Also show separately:

```text
3He SUPERFLUID
MILLIKELVIN SCALE
DIFFERENT PHASE STRUCTURE
```

---

# V11 — Mechanical / Host Interaction

Filename:

```text
diagrams/processes/0002-Helium-He-DIAGRAM-004-Implantation-Bubble-Formation.svg
```

Show:

```text
incoming He / alpha
↓
implantation
↓
diffusion / trapping
↓
vacancy interaction
↓
He cluster
↓
bubble formation
```

Required warning:

```text
HOST-MATERIAL RELATIONSHIP
NOT INTRINSIC MECHANICAL PROPERTY OF HELIUM
```

---

# V12 — Phase / Pressure / Environment

Filename:

```text
images/properties/0002-Helium-He-FIG-009-Phase-Diagram.svg
```

Required axes:

```text
temperature
pressure
```

Include:

```text
gas
liquid
He-I
He-II
solid
critical point
lambda line
```

Use actual thermophysical datasets rather than an artistic curve.

---

# V13 — Transformation Network

Filename:

```text
diagrams/processes/0002-Helium-He-DIAGRAM-005-Transformation-Network.svg
```

Show:

```text
He
├── ionization → He+
│                └── ionization → He2+
├── excitation → He*
├── plasma → mixed charged/excited species
├── cooling → liquid He-I
│             └── lambda transition → He-II
└── pressure + cooling → solid helium
```

Nuclear relationships separately:

```text
3H → 3He
D + T → 4He + n
```

---

# V14 — Knowledge Graph

Filename:

```text
diagrams/relationships/0002-Helium-He-DIAGRAM-006-Knowledge-Graph.svg
```

Clusters:

```text
ISOTOPES
ATOMIC STATES
IONS
QUANTUM FLUIDS
CRYOGENICS
NUCLEAR RELATIONSHIPS
MATERIAL INTERACTIONS
APPLICATIONS
PEOPLE
SOURCES
```

---

# V15 — Scientific 3D

Model 1:

```text
models/scientific/0002-Helium-He-MODEL-SCI-001-Electron-Density.glb
```

Classification:

```text
QUANTUM ELECTRON-DENSITY VISUALIZATION
```

Model 2:

```text
models/scientific/0002-Helium-He-MODEL-SCI-002-Isotope-Nuclear-Schematic.glb
```

Classification:

```text
NUCLEAR SCHEMATIC
NOT LITERAL FIXED NUCLEON GEOMETRY
```

---

# V16 — Data-Extruded Model

Filename:

```text
models/data-extruded/0002-Helium-He-MODEL-DATA-001.glb
```

Use the **same transformation system as Hydrogen** once that transformation is finalized.

No Helium-specific arbitrary geometry is permitted.

---

# V17 — Applications

Filename:

```text
images/applications/0002-Helium-He-FIG-010-Applications.svg
```

Clusters:

```text
MRI / SUPERCONDUCTING MAGNET CRYOGENICS
LOW-TEMPERATURE RESEARCH
DILUTION REFRIGERATION
NEUTRON DETECTION
LEAK DETECTION
INERT PROCESS GAS
SEMICONDUCTOR PROCESSING
WELDING / SHIELDING
MASS SPECTROMETRY
GAS CHROMATOGRAPHY
SPACE / PRESSURIZATION
BALLOONS
QUANTUM RESEARCH
```

---

# V18 — Evidence / Provenance

Filename:

```text
diagrams/relationships/0002-Helium-He-DIAGRAM-007-Evidence-Provenance.svg
```

Show:

```text
NIST ASD
→ atomic/ionization

NIST isotope tables
→ isotope masses

NUBASE2020
→ unstable nuclear states

NIST TN 1334
→ 4He thermophysics

NIST 3He EOS
→ 3He thermophysics

historical experiments
→ liquefaction / superfluid discoveries
```

---
