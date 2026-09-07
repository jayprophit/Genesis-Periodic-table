# 0000 Origin State — Visual Specification

## Record

```text
MAT:0000
0000-Origin-State
```

## Principle

`0000` is a reference architecture rather than a physical substance.

Therefore visuals should represent:

* reference coordinates;
* state differences;
* reference channels;
* experimental baselines;
* state transitions;
* evidence classes;
* Causali E relationships;

rather than pretending that `0000` has a literal physical appearance.

---

# V01 — Natural / Material Manifestation

Status:

```text
NOT-APPLICABLE
```

Reason:

`MAT:0000` is not a material specimen.

No image should be generated.

---

# V02 — Conventional Scientific Representation

Asset ID:

```text
MAT:0000:DIAGRAM:001
```

Filename:

```text
diagrams/reference-frames/0000-Origin-State-DIAGRAM-001-Reference-Origin.svg
```

Title:

```text
MAT 0000 Reference Origin
```

Required content:

* central node `MAT:0000`;
* dimensionless normalized coordinate origin:

$$
\mathbf z_0=(0,0,\ldots,0)
$$

* scalar difference:

$$
\Delta q=q-q_\mathrm{ref}
$$

* pairwise difference:

$$
\Delta q_{ij}=q_i-q_j
$$

* clear label:

```text
MATHEMATICAL / INFORMATION REFERENCE
NOT LITERAL PHYSICAL NOTHINGNESS
```

Classification:

```text
SCIENTIFIC-SCHEMATIC
```

---

# V03 — Bonding / Molecular / Lattice

Status:

```text
NOT-APPLICABLE
```

No asset.

---

# V04 — Quantum Reference

Asset ID:

```text
MAT:0000:DIAGRAM:002
```

Filename:

```text
diagrams/reference-frames/0000-Origin-State-DIAGRAM-002-Quantum-Vacuum-Reference.svg
```

Title:

```text
Quantum Vacuum Reference Versus Classical Empty Space
```

Required content:

Three separated concepts:

```text
CLASSICAL EMPTY-SPACE IDEALIZATION
QUANTUM VACUUM STATE
MAT COMPUTATIONAL ORIGIN
```

Show explicitly:

```text
THESE ARE NOT IDENTICAL
```

The QV node should include:

```text
model
fields
boundary conditions
reference convention
```

Classification:

```text
SCIENTIFIC-SCHEMATIC
```

No artistic depiction of "nothingness" should be presented as measured science.

---

# V05 — Isotope / Nuclear Variants

Status:

```text
NOT-APPLICABLE
```

No asset.

---

# V06 — Frequency Reference Axes

Asset ID:

```text
MAT:0000:DIAGRAM:003
```

Filename:

```text
diagrams/reference-frames/0000-Origin-State-DIAGRAM-003-Frequency-Reference-Axes.svg
```

Title:

```text
MAT Frequency and Resonance Reference Channels
```

Required branches:

```text
NUCLEAR
HYPERFINE
ELECTRONIC
ROTATIONAL
VIBRATIONAL
PHONON
PLASMA
ACOUSTIC
MAGNETIC RESONANCE
```

Central warning:

```text
NO UNIVERSAL SINGLE ELEMENT FREQUENCY
```

Show conversion relationships:

$$
\omega=2\pi\nu
$$

$$
E=h\nu
$$

and, where electromagnetic radiation in vacuum applies:

$$
c=\lambda\nu
$$

Classification:

```text
SCIENTIFIC-SCHEMATIC
```

---

# V07 — Reference-Channel Dashboard

Asset ID:

```text
MAT:0000:FIG:001
```

Filename:

```text
images/reference/0000-Origin-State-FIG-001-Reference-Channels.svg
```

Title:

```text
MAT 0000 Reference Channel Dashboard
```

Show all:

```text
ORIGIN
LAB
THERMO
T0
P0
E0
B0
R0
N0
C0
S0
X0
TIME0
VAC
QV
```

Each tile should state:

```text
reference type
physical / computational status
required conditions
```

---

# V08 — Electric-Field Reference

Asset ID:

```text
MAT:0000:DIAGRAM:004
```

Filename:

```text
diagrams/reference-frames/0000-Origin-State-DIAGRAM-004-Electric-Field-Reference.svg
```

Show:

$$
\Delta \mathbf E
=
\mathbf E-\mathbf E_0
$$

with:

```text
E0 = zero specified externally applied electric field
```

Do not label this as:

```text
absence of all electromagnetic activity
```

---

# V09 — Magnetic-Field Reference

Asset ID:

```text
MAT:0000:DIAGRAM:005
```

Filename:

```text
diagrams/reference-frames/0000-Origin-State-DIAGRAM-005-Magnetic-Field-Reference.svg
```

Show separated:

```text
APPLIED FIELD
INTERNAL FIELD
INTRINSIC MAGNETIC MOMENT
REMANENT MAGNETIZATION
ENVIRONMENTAL FIELD
```

Reference:

$$
\Delta\mathbf B
=
\mathbf B-\mathbf B_0
$$

This diagram establishes the MAT rule that intrinsic magnetism and engineered magnetization are different data objects.

---

# V10 — Temperature Reference

Asset ID:

```text
MAT:0000:DIAGRAM:006
```

Filename:

```text
diagrams/reference-frames/0000-Origin-State-DIAGRAM-006-Temperature-Reference.svg
```

Show:

$$
\Delta T=T-T_0
$$

with:

```text
T0 = SELECTED REFERENCE TEMPERATURE
```

and a separate node:

```text
ABSOLUTE ZERO = 0 K
```

Show:

```text
T0 DOES NOT AUTOMATICALLY MEAN 0 K
```

Also distinguish:

```text
0 K
```

from:

```text
zero energy
```

---

# V11 — Structural / Mechanical Reference

Asset ID:

```text
MAT:0000:DIAGRAM:007
```

Filename:

```text
diagrams/reference-frames/0000-Origin-State-DIAGRAM-007-Structural-Reference.svg
```

Show:

```text
REFERENCE GEOMETRY
↓
APPLIED LOAD / DEFORMATION
↓
CURRENT GEOMETRY
```

with:

$$
\epsilon_0=0
$$

only for the specifically defined reference strain state.

---

# V12 — Environment Reference Map

Asset ID:

```text
MAT:0000:DIAGRAM:008
```

Filename:

```text
diagrams/reference-frames/0000-Origin-State-DIAGRAM-008-Environment-Reference-Map.svg
```

Show environment as a structured object containing:

```text
temperature
pressure
atmosphere
humidity
electric field
magnetic field
radiation
gravity
mechanical loading
chemical environment
```

Show separate reference objects:

```text
LAB
THERMO
VAC
```

---

# V13 — Process Start and Transformation

Asset ID:

```text
MAT:0000:DIAGRAM:009
```

Filename:

```text
diagrams/state-space/0000-Origin-State-DIAGRAM-009-Process-State-Transition.svg
```

Show:

$$
X_0
\xrightarrow{P_1}
X_1
\xrightarrow{P_2}
X_2
$$

Each arrow contains example condition fields:

```text
temperature
pressure
time
field
atmosphere
energy
```

Below the pathway:

```text
FINAL STATE MAY DEPEND ON PROCESS HISTORY
```

---

# V14 — Reference Knowledge Graph

Asset ID:

```text
MAT:0000:DIAGRAM:010
```

Filename:

```text
diagrams/relationships/0000-Origin-State-DIAGRAM-010-Reference-Knowledge-Graph.svg
```

Central node:

```text
MAT:0000
```

Edges:

```text
HAS-REFERENCE-CHANNEL
REFERENCE-FRAME-FOR
LEGACY-SUCCESSOR-OF
CONCEPTUALLY-LINKED-TO
```

Show relationship to:

```text
MAT numbered records
Causali E
G0000 legacy record
reference channels
```

---

# V15 — Scientific 3D Model

Status:

```text
NOT-APPLICABLE
```

Reason:

There is no scientifically literal three-dimensional physical object corresponding to `MAT:0000`.

---

# V16 — Data-Extruded Reference Model

Asset ID:

```text
MAT:0000:MODEL:DATA:001
```

Filename:

```text
models/data-extruded/0000-Origin-State-MODEL-DATA-001-Reference-State.glb
```

Purpose:

Interactive conceptual visualization of MAT reference dimensions.

Suggested geometry:

```text
central origin
+
radial reference axes
+
named reference channels
```

Required label:

```text
MAT DATA VISUALIZATION
NOT A PHYSICAL MODEL OF NOTHINGNESS OR THE ORIGIN OF THE UNIVERSE
```

Classification:

```text
DATA-EXTRUDED-3D
```

---

# V17 — MAT Comparison Workflow

Asset ID:

```text
MAT:0000:DIAGRAM:011
```

Filename:

```text
diagrams/state-space/0000-Origin-State-DIAGRAM-011-MAT-Comparison-Workflow.svg
```

Show:

```text
RAW PROPERTY
↓
SELECT REFERENCE
↓
UNIT NORMALIZATION
↓
CALCULATE DIFFERENCE
↓
NORMALIZE IF REQUIRED
↓
BUILD STATE VECTOR
↓
COMPARE STATE
```

Equations:

$$
\Delta q=q-q_\mathrm{ref}
$$

$$
z_q=N_q(q,q_\mathrm{ref},s_q)
$$

---

# V18 — Evidence and Provenance

Asset ID:

```text
MAT:0000:DIAGRAM:012
```

Filename:

```text
diagrams/relationships/0000-Origin-State-DIAGRAM-012-Evidence-Provenance-Map.svg
```

Show distinct routes:

```text
MEASUREMENT
↓
SOURCE
↓
MAT DATA OBJECT
```

```text
THEORETICAL MODEL
↓
CALCULATION
↓
MAT DATA OBJECT
```

```text
HYPOTHESIS
↓
TEST
↓
SUPPORTED / NOT-SUPPORTED / INCONCLUSIVE
```

Show separately:

```text
AI-ASSISTED EXTRACTION
```

as acquisition methodology rather than scientific source.

---

# Graph Folder

No mandatory scientific graphs are required for `0000`.

Reason:

There is no intrinsic measured property curve for a computational reference record.

Do not generate artificial plots merely to populate:

```text
graphs/
```

The folder remains reserved for future validation or comparison datasets.

---

# Tables

Existing required table:

```text
tables/0000-Reference-Modes.md
```

Future optional:

```text
tables/0000-Reference-Channel-Requirements.csv
```

---

# Scientific Images

No natural-state photograph is required.

No artificial photograph of "the origin," "vacuum," or "nothingness" should be presented as scientific evidence.

---

# Visual Completion Standard

`MAT:0000` is visually complete when:

```text
V01 NOT-APPLICABLE
V02 COMPLETE
V03 NOT-APPLICABLE
V04 COMPLETE
V05 NOT-APPLICABLE
V06 COMPLETE
V07 COMPLETE
V08 COMPLETE
V09 COMPLETE
V10 COMPLETE
V11 COMPLETE
V12 COMPLETE
V13 COMPLETE
V14 COMPLETE
V15 NOT-APPLICABLE
V16 COMPLETE
V17 COMPLETE
V18 COMPLETE
```

Required generated assets:

```text
11 SVG diagrams
1 SVG dashboard
1 GLB data model
```

Total:

```text
13 assets
```
