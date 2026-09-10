# 0003 — Lithium — Li

```yaml
mat_id: MAT:0003
record_name: Lithium
symbol: Li
record_class: CHEMICAL_ELEMENT
atomic_number: 3
parent_id: MAT:0000
schema_version: 1.0.0
record_version: 1.0.0
status: RESEARCHED
legacy_id: G0003
legacy_name: Lithium
reference_implementation:
  - MAT:0001
  - MAT:0002
```

# 0. Record Navigation

Previous primary record:

```text
MAT:0002
0002-Helium-He
```

Current record:

```text
MAT:0003
0003-Lithium-Li
```

---

# 1. Elemental Identity

| Property               |           Value | Unit / Status |
| ---------------------- | --------------: | ------------- |
| MAT ID                 |        MAT:0003 | —             |
| Element                |         Lithium | —             |
| Symbol                 |              Li | —             |
| Atomic number          |               3 | dimensionless |
| Proton count           |               3 | proton        |
| Neutral electron count |               3 | electron      |
| Period                 |               2 | —             |
| Group                  |               1 | alkali metal  |
| Block                  |               s | —             |
| Ground configuration   |          1s²2s¹ | —             |
| Ground level           | \(^{2}S_{1/2}\) | —             |
| Standard atomic weight |  [6.938, 6.997] | interval      |

Primary sources:

```text
SRC-000005
SRC-000035
```

---

# 2. First Alkali-Metal Record

Lithium is the first MAT record whose ordinary elemental manifestation is a conventional metallic solid.

This activates record branches including:

```text
METALLIC BONDING
CRYSTAL STRUCTURE
ELECTRICAL CONDUCTIVITY
THERMAL CONDUCTIVITY
ELASTICITY
PLASTIC DEFORMATION
SURFACE OXIDATION
CORROSION
ELECTROCHEMISTRY
ALLOYING
BATTERY MATERIAL RELATIONSHIPS
```

This distinguishes Lithium fundamentally from:

```text
Hydrogen → ordinary molecular gas
Helium   → ordinary monatomic noble gas
Lithium  → metallic solid
```

---

# 3. Valence Structure

Ground-state neutral Lithium:

$$
1s^22s^1
$$

The outer:

$$
2s^1
$$

electron is comparatively weakly bound relative to the closed \(1s^2\) core.

This strongly influences Lithium's:

* low first ionization energy;
* alkali-metal chemistry;
* metallic bonding;
* common \(+1\) oxidation state;
* electrochemical behavior.

---

# 4. First Ionisation

$$
Li
\rightarrow
Li^+
+
e^-
$$

NIST evaluated value:

$$
E_{I1}
=
5.391714996\ \mathrm{eV}
$$

with uncertainty:

$$
2.2\times10^{-8}\ \mathrm{eV}
$$

Canonical ion:

```text
MAT:0003:ION:Li+1
```

---

# 5. Higher Ionisation

Second ionisation:

$$
Li^+
\rightarrow
Li^{2+}
+
e^-
$$

$$
E_{I2}
\approx
75.6400970\ \mathrm{eV}
$$

Third ionisation:

$$
Li^{2+}
\rightarrow
Li^{3+}
+
e^-
$$

$$
E_{I3}
\approx
122.45435913\ \mathrm{eV}
$$

The large jump after removing the valence electron reflects removal from the closed \(1s^2\) core.

Canonical states:

```text
MAT:0003:ATOM:Li
MAT:0003:ION:Li+1
MAT:0003:ION:Li+2
MAT:0003:ION:Li+3
```

---

# 6. Ordinary Material State

At ordinary room conditions Lithium is:

```text
SOLID
METALLIC
SOFT
SILVERY
HIGHLY REACTIVE
```

The free metal is not normally found uncombined in nature because of its chemical reactivity.

---

# 7. Room-Temperature Crystal Structure

At approximately room temperature, metallic Lithium adopts a body-centred cubic structure.

Canonical phase:

```text
MAT:0003:PHASE:BCC
```

Reference crystallographic form:

```text
structure: BCC
space_group: Im-3m
space_group_number: 229
```

Representative lattice parameter near room temperature:

$$
a\approx3.51\ \text{\AA}
$$

This value must retain measurement temperature and source.

Lithium also has additional low-temperature and high-pressure structural phases.

Therefore:

```text
Li crystal structure = BCC
```

is valid only with the appropriate state conditions.

---

# 8. Density and Bulk Material Identity

Representative room-temperature density:

$$
\rho\approx0.534\text{–}0.535\ \mathrm{g\,cm^{-3}}
$$

Lithium is exceptionally low-density for a metal.

The exact property object must retain:

```text
temperature
sample purity
phase
pressure
```

---

# 9. Melting Point

A recent NIST critical evaluation recommends:

$$
T_m
=
453.61\pm0.14\ \mathrm K
$$

for Lithium.

This should replace unsourced rounded values when MAT requires a canonical recommended value.

Equivalent Celsius value is approximately:

$$
180.46^\circ\mathrm C
$$

---

# 10. Boiling Region

A commonly reported normal boiling temperature is approximately:

$$
1615\ \mathrm K
$$

but MAT will store the exact recommended NIST boiling-point result from the alkali-metal evaluation in the detailed thermal table rather than using a rounded secondary value as the final canonical property.

---

# 11. Metallic Bonding

Lithium metal is described by delocalized electronic bonding rather than discrete Li-Li covalent molecules.

Conceptually:

```text
Li nuclei / ionic cores
+
delocalized valence electrons
↓
metallic solid
```

Bulk metallic properties emerge from the collective electronic and lattice state.

Therefore:

```text
isolated Li atom
```

and:

```text
bulk metallic Lithium
```

must remain separate MAT states.

---

# 12. Electrical Branch

Metallic Lithium is electrically conducting.

Conductivity depends on:

* temperature;
* purity;
* crystal defects;
* phase;
* pressure;
* strain;
* sample history.

A representative room-temperature resistivity is on the order of:

$$
10^{-7}\ \Omega\,\mathrm m
$$

The final value must be stored with its specific source and temperature rather than as a condition-free constant.

---

# 13. Thermal Branch

Lithium metal is also a substantial thermal conductor.

Thermal transport depends on:

```text
temperature
electronic contribution
phonon contribution
purity
defects
phase
```

This activates MAT's coupled:

```text
electronic transport
+
thermal transport
+
crystal structure
```

branches.

---

# 14. Mechanical Branch

Lithium metal is soft and relatively low-modulus.

Relevant future properties include:

```text
Young modulus
bulk modulus
shear modulus
yield behavior
hardness
creep
ductility
fracture
temperature dependence
```

These must be measured on specified material states.

They are not atomic properties.

---

# 15. Chemical Reactivity

Lithium is a highly reactive alkali metal.

Important reaction families include:

```text
oxygen
water
nitrogen
hydrogen
halogens
carbon-containing compounds
electrolytes
host materials
```

Common oxidation state:

$$
+1
$$

because loss of the \(2s\) valence electron produces a closed-shell Li⁺ ion.

---

# 16. Lithium and Water

A simplified reaction is:

$$
2Li+2H_2O
\rightarrow
2LiOH+H_2
$$

This is an exothermic chemical reaction.

The resulting Hydrogen link creates a direct relationship:

```text
MAT:0003
CHEMICALLY-GENERATES
MAT:0001:MOL:H2
```

under appropriate reaction conditions.

---

# 17. Lithium and Oxygen

Lithium reacts with oxygen-containing environments.

Possible products depend on conditions and chemistry.

A common oxide relationship is:

$$
Li_2O
$$

but Lithium chemistry must not be reduced to one oxide state.

Relevant compound families include:

```text
oxide
peroxide-related chemistry
hydroxide
carbonate
nitride
hydride
halides
organolithium compounds
battery salts
```

---

# 18. Lithium Nitride

Lithium has a notable direct relationship with Nitrogen:

$$
6Li+N_2
\rightarrow
2Li_3N
$$

This makes Lithium unusual among alkali metals in its strong direct nitride-forming behavior.

Canonical future compound:

```text
MAT:CMP:Li3N
```

---

# 19. Lithium Hydride

Lithium combines with Hydrogen to form Lithium hydride:

$$
2Li+H_2
\rightarrow
2LiH
$$

Future compound node:

```text
MAT:CMP:LiH
```

Relationship:

```text
MAT:0003
FORMS-HYDRIDE-WITH
MAT:0001
```

This joins Hydrogen's hydride branch directly to the Lithium record.

---

# 20. Electrochemical Importance

Lithium has an exceptionally important electrochemical role because Lithium ions can be transferred reversibly between host materials in suitable electrochemical systems.

The core battery abstraction is not:

```text
Lithium = battery
```

but:

```text
Li-containing active material
+
electrolyte
+
separator
+
counter-electrode
+
current collectors
+
controlled redox reactions
=
electrochemical cell
```

Lithium's element record therefore stores relationships to battery systems rather than assigning complete battery properties to the element itself.

---

# 21. Li⁺ Transport

A major electrochemical state is:

$$
Li^+
$$

Transport may occur through:

```text
liquid electrolyte
solid electrolyte
crystal host
polymer host
interphase
electrode structure
```

Possible transport laws include diffusion and migration under electrochemical potential gradients.

A simple diffusion approximation may use:

$$
\mathbf J
=
-D\nabla C
$$

but real electrochemical transport requires electrochemical-potential and field effects.

---

# 22. Intercalation / Host Relationship

In many rechargeable battery materials, Lithium ions occupy or leave sites in a host structure.

Generic representation:

$$
Host+xLi^++xe^-
\rightleftharpoons
Li_xHost
$$

This must be stored as a:

```text
HOST-MATERIAL RELATIONSHIP
```

not as a standalone intrinsic property of Lithium.

Important variables include:

```text
host composition
crystal structure
Li occupancy
state of charge
temperature
current
cycle history
particle size
defects
electrolyte
```

---

# 23. Isotope Family

Current evaluated Lithium mass branch extends from:

$$
{}^3Li
$$

through:

$$
{}^{13}Li
$$

but these states do not all have the same scientific status.

Critical distinction:

```text
6Li, 7Li
→ stable isotopes

8Li, 9Li, 11Li
→ radioactive nuclides

4Li, 5Li, 10Li, 13Li
→ extremely short-lived/unbound states

3Li
→ proton-unstable evaluated/uncertain state

12Li
→ neutron-unbound resonance without adopted half-life in NUBASE2020
```

---

# 24. Lithium-6 — ⁶Li

Canonical ID:

```text
MAT:0003:ISO:Li-6
```

Composition:

```text
protons: 3
neutrons: 3
```

Relative atomic mass:

$$
6.0151228874(16)\ \mathrm u
$$

Status:

```text
STABLE
```

Spin/parity:

$$
1^+
$$

Representative isotopic composition:

$$
0.0759(4)
$$

This abundance is not universal for every Lithium material because isotopic fractionation and intentional isotope processing can alter it.

---

# 25. Lithium-7 — ⁷Li

Canonical ID:

```text
MAT:0003:ISO:Li-7
```

Composition:

```text
protons: 3
neutrons: 4
```

Relative atomic mass:

$$
7.0160034366(45)\ \mathrm u
$$

Status:

```text
STABLE
```

Spin/parity:

$$
\frac32^-
$$

Representative isotopic composition:

$$
0.9241(4)
$$

---

# 26. Unstable and Unbound Lithium States

## ³Li

```text
MAT:0003:ISO:Li-3
```

NUBASE2020 class:

```text
PROTON-UNSTABLE
IDENTIFICATION-UNCERTAIN
```

Estimated relative atomic mass:

$$
3.0308(21\#)\ \mathrm u
$$

Do not assign a fabricated half-life.

---

## ⁴Li

```text
MAT:0003:ISO:Li-4
```

$$
t_{1/2}
=
91\pm9\ \mathrm{ys}
$$

Spin/parity:

$$
2^-
$$

Principal decay:

```text
PROTON EMISSION
```

---

## ⁵Li

```text
MAT:0003:ISO:Li-5
```

$$
t_{1/2}
=
370\pm30\ \mathrm{ys}
$$

Spin/parity:

$$
\frac32^-
$$

Principal decay:

```text
PROTON EMISSION
```

---

## ⁸Li

```text
MAT:0003:ISO:Li-8
```

$$
t_{1/2}
=
838.7\pm0.3\ \mathrm{ms}
$$

Spin/parity:

$$
2^+
$$

Principal decay family:

```text
BETA-MINUS
```

with strong alpha-producing decay pathways through daughter-state breakup.

---

## ⁹Li

```text
MAT:0003:ISO:Li-9
```

$$
t_{1/2}
=
178.2\pm0.4\ \mathrm{ms}
$$

Spin/parity:

$$
\frac32^-
$$

Decay:

```text
BETA-MINUS
```

with substantial beta-delayed neutron emission.

---

## ¹⁰Li

```text
MAT:0003:ISO:Li-10
```

$$
t_{1/2}
=
2.0\pm0.5\ \mathrm{zs}
$$

Principal decay:

```text
NEUTRON EMISSION
```

Adopted spin/parity remains uncertain:

```text
(1-,2-)
```

---

## ¹¹Li

```text
MAT:0003:ISO:Li-11
```

$$
t_{1/2}
=
8.75\pm0.06\ \mathrm{ms}
$$

Spin/parity:

$$
\frac32^-
$$

Decay family:

```text
BETA-MINUS
BETA-DELAYED-NEUTRON
MULTI-PARTICLE BRANCHES
```

¹¹Li is also a major neutron-halo research nucleus.

---

## ¹²Li

```text
MAT:0003:ISO:Li-12
```

NUBASE2020 describes this as a neutron-unbound state/resonance.

No adopted half-life is given in the evaluation table.

Therefore MAT stores:

```yaml
stability: "NEUTRON-UNBOUND-RESONANCE"
half_life: "NOT-ESTABLISHED"
```

rather than inferring one.

---

## ¹³Li

```text
MAT:0003:ISO:Li-13
```

$$
t_{1/2}
=
3.3\pm1.2\ \mathrm{zs}
$$

Spin/parity:

```text
3/2-#
```

Principal decay:

```text
TWO-NEUTRON EMISSION
```

---

# 27. Isotope Architecture Lesson

Lithium adds another important MAT principle:

$$
\boxed{
\text{mass-table entry}
\neq
\text{ordinary bound isotope}
}
$$

The database must distinguish:

```text
stable nuclide
radioactive nuclide
unbound resonance
estimated state
uncertain identification
```

rather than placing every mass number in the same semantic category.

---

# 28. Initial Material-State Cloud

$$
\{
{}^6Li,
{}^7Li,
Li,
Li^+,
Li^{2+},
Li^{3+},
Li_{\rm metal},
Li_{\rm liquid},
Li_{\rm BCC},
Li_{\rm pressure\ phase},
LiH,
Li_2O,
LiOH,
Li_3N,
Li^+_{\rm electrolyte},
Li_{\rm host},
Li_{\rm alloy},
\dots
\}
$$

Lithium therefore becomes MAT's first strong demonstration of:

```text
ATOM
→ METAL
→ ION
→ COMPOUND
→ HOST MATERIAL
→ ELECTROCHEMICAL SYSTEM
```

all belonging to one elemental family while remaining separate data objects.

---

# 29. Initial Visual Placeholders

```markdown
<!-- MAT-VISUAL: V01 -->
<!-- DESCRIPTION: Metallic Lithium physical specimen under controlled environment -->

<!-- MAT-VISUAL: V03 -->
<!-- DESCRIPTION: BCC metallic lattice and bonding -->

<!-- MAT-VISUAL: V05 -->
<!-- DESCRIPTION: Lithium isotope map 3Li through 13Li -->

<!-- MAT-VISUAL: V07 -->
<!-- DESCRIPTION: Bulk metallic physical properties -->

<!-- MAT-VISUAL: V08 -->
<!-- DESCRIPTION: Li / Li+ electrochemical charge-state map -->

<!-- MAT-VISUAL: V11 -->
<!-- DESCRIPTION: Mechanical crystal/material behavior -->

<!-- MAT-VISUAL: V13 -->
<!-- DESCRIPTION: Lithium reaction/electrochemical transformation network -->

<!-- MAT-VISUAL: V17 -->
<!-- DESCRIPTION: Batteries, alloys, ceramics, nuclear and industrial applications -->
```

---

# 30. Current Record Status

```yaml
status: RESEARCHED
migration_status: IN-PROGRESS
schema_validation_status: PENDING
scientific_core: RESEARCHED
visual_specification: NOT-YET-LOCKED
visual_assets: NOT-GENERATED
```

The NUBASE2020 evaluation gives ⁴Li `91 ± 9 ys`, ⁵Li `370 ± 30 ys`, stable ⁶Li/⁷Li, ⁸Li `838.7 ± 0.3 ms`, ⁹Li `178.2 ± 0.4 ms`, ¹⁰Li `2.0 ± 0.5 zs`, ¹¹Li `8.75 ± 0.06 ms`, and ¹³Li `3.3 ± 1.2 zs`; it does not provide an adopted half-life for ¹²Li.

---

# 31. Bulk Physical Property Layer

Lithium is MAT's first ordinary elemental metal with a complete conventional bulk-property branch.

Representative reference values for solid Lithium include approximately:

| Property                 | Representative Value | Unit      |
| ------------------------ | -------------------: | --------- |
| Density                  |                  535 | kg m⁻³    |
| Young's modulus          |                  4.9 | GPa       |
| Shear modulus            |                  4.2 | GPa       |
| Bulk modulus             |                   11 | GPa       |
| Electrical resistivity   | \(9.5\times10^{-8}\) | Ω m       |
| Thermal conductivity     |                   85 | W m⁻¹ K⁻¹ |
| Linear thermal expansion |  \(46\times10^{-6}\) | K⁻¹       |

These are reference material values rather than condition-free universal constants.

Each final property object must retain:

```text
temperature
pressure
phase
sample purity
microstructure
measurement method
uncertainty
source
```

---

# 32. Electrical Transport

Bulk metallic Lithium supports electronic conduction.

A simple conductivity relation is:

$$
\sigma=\frac{1}{\rho_e}
$$

where:

* \(\sigma\) = electrical conductivity;
* \(\rho_e\) = electrical resistivity.

Using the representative resistivity:

$$
\rho_e
\approx
9.5\times10^{-8}\ \Omega\,m
$$

gives an approximate conductivity:

$$
\sigma
\approx
1.05\times10^7\ S\,m^{-1}
$$

for the corresponding reference state.

This is a **derived reference value**.

It must not be copied to:

```text
Li+
electrolyte
molten salt
oxide
battery electrode
```

because those are different transport systems.

---

# 33. Thermal Transport

Representative thermal conductivity:

$$
k
\approx
85\ W\,m^{-1}K^{-1}
$$

for metallic Lithium under the associated reference conditions.

Both electronic carriers and lattice excitations can contribute to thermal transport.

MAT therefore links:

```text
electrical state
crystal phase
temperature
defects
thermal transport
```

rather than storing thermal conductivity as an isolated number.

---

# 34. Mechanical State

Representative elastic values include:

$$
E\approx4.9\ GPa
$$

$$
G\approx4.2\ GPa
$$

$$
K\approx11\ GPa
$$

for reference bulk Lithium.

Lithium is mechanically soft relative to many engineering metals.

However:

```text
SOFT METAL
```

does not imply:

```text
ZERO STRUCTURAL COMPLEXITY
```

because mechanical response changes with:

* temperature;
* strain rate;
* crystal orientation;
* purity;
* phase;
* pressure;
* grain structure;
* cycling history.

---

# 35. Atomic Versus Bulk Magnetism

An isolated neutral Lithium atom has the configuration:

$$
1s^22s^1
$$

and therefore contains one unpaired valence electron.

Atomic-state magnetic description:

```text
PARAMAGNETIC ATOMIC STATE
```

Bulk metallic Lithium must be treated separately as a collective electronic material.

MAT rule:

$$
\boxed{
M_{\rm atom}
\neq
M_{\rm bulk}
}
$$

No engineered permanent-magnet pole geometry is assigned to ordinary Lithium metal unless an actual engineered composite/material state justifies it.

---

# 36. Electrochemical State Space

Lithium's main electrochemical carrier is:

$$
Li^+
$$

but the complete electrochemical state is:

$$
S_{\rm electrochem}
=
F(
\text{host},
x_{Li},
T,
P,
V,
I,
\mu_{Li},
D_{Li},
\sigma_{\rm ion},
\text{electrolyte},
t,
\text{history}
)
$$

where:

* \(x_{Li}\) = Lithium occupancy or stoichiometric fraction;
* \(V\) = electrochemical potential difference;
* \(I\) = current;
* \(D_{Li}\) = Lithium diffusion coefficient;
* \(\sigma_{\rm ion}\) = ionic conductivity.

---

# 37. Lithium-Ion Cell Architecture

MAT explicitly separates:

```text
LITHIUM ELEMENT
```

from:

```text
LITHIUM-ION BATTERY
```

A general rechargeable Li-ion architecture includes:

```text
negative electrode / host
electrolyte
separator
positive electrode / host
current collectors
Li+ transport
electron transport through external circuit
```

During operation, Li⁺ migrates between host materials while electrons travel through the external circuit.

Battery performance belongs to the **whole cell system**.

---

# 38. Host Insertion

Generic relationship:

$$
Host+xLi^++xe^-
\rightleftharpoons
Li_xHost
$$

A host record must specify:

```text
composition
crystal structure
site geometry
Li occupancy
voltage
diffusion pathway
phase transition
cycle history
mechanical strain
temperature
```

This directly preserves the legacy insight:

$$
\boxed{
\text{geometry enables electrochemistry}
}
$$

---

# 39. Carbon Relationship

Canonical future edge:

```text
MAT:0003
INTERCALATES-IN
MAT:0006
```

for suitable graphitic carbon structures.

The relevant material object is not generic elemental Carbon alone.

It is a particular:

```text
GRAPHITE / CARBON HOST STRUCTURE
```

with defined stacking, defects, particle structure and electrochemical environment.

---

# 40. Silicon Relationship

Canonical future edge:

```text
MAT:0003
ALLOYS-WITH / LITHIATES
MAT:0014
```

Silicon can accommodate large Lithium contents.

However lithiation may produce substantial structural and volume change.

Therefore MAT records simultaneously:

```text
capacity
Li content
volume change
stress
fracture
cycle retention
particle geometry
```

This becomes an important multi-objective materials-design example.

---

# 41. Oxygen Relationship

Lithium has strong relationships with Oxygen through compounds including:

```text
Li2O
LiOH
Li2O2-related systems
Li2CO3
transition-metal oxides containing Li
```

These relationships span:

```text
ordinary inorganic chemistry
surface films
ceramics
electrochemistry
battery cathodes
fusion materials
```

No single `Li-O` property can represent all of these systems.

---

# 42. Nitrogen Relationship

Direct nitride formation:

$$
6Li+N_2
\rightarrow
2Li_3N
$$

Future child:

```text
MAT:CMP:Li3N
```

Lithium nitride also belongs to the solid-state ionics branch because Lithium-ion transport can occur through suitable Li-containing solids.

---

# 43. Hydrogen Relationship

Chemical:

$$
2Li+H_2
\rightarrow
2LiH
$$

Future child:

```text
MAT:CMP:LiH
```

The Li–H relationship also includes isotope-specific nuclear technology involving Lithium and Tritium production.

Therefore:

```text
Li-H CHEMICAL EDGE
```

and:

```text
Li-H NUCLEAR EDGE
```

remain separate.

---

# 44. Alloying Layer

Lithium forms alloys and intermetallic/material systems with many elements.

Important engineering relationship classes include:

```text
Li-Al
Li-Mg
Li-Si
Li-Pb
```

Applications and functions differ substantially.

Examples:

### Aluminium-Lithium

Potential roles:

```text
low-density structural alloys
aerospace materials
```

### Magnesium-Lithium

Potential roles:

```text
very-low-density metallic alloys
structural research
```

### Lead-Lithium

Potential roles:

```text
fusion breeding blanket systems
liquid-metal breeder concepts
```

The properties belong to the alloy/material record, not elemental Lithium.

---

# 45. Lithium-6 Neutron Reaction

A central nuclear relationship is:

$$
{}^6Li+n
\rightarrow
{}^4He+{}^3H
$$

Derived Q-value:

$$
Q
\approx
4.7835\ MeV
$$

This reaction links the first three MAT element families directly:

```text
MAT:0003:ISO:Li-6
+
NEUTRON
↓
MAT:0002:ISO:He-4
+
MAT:0001:ISO:H-3
```

This is a nuclear transformation.

It is not ordinary Lithium chemistry.

---

# 46. Lithium-7 Tritium-Breeding Branch

An important high-energy-neutron channel is:

$$
{}^7Li+n
\rightarrow
{}^4He+{}^3H+n
$$

with:

$$
Q
\approx
-2.4676\ MeV
$$

The negative Q-value means the reaction requires sufficient incident energy.

The ⁶Li and ⁷Li branches therefore have substantially different neutron-energy dependence.

---

# 47. Fusion Fuel-Cycle Role

Lithium is not itself the primary D-T plasma fuel.

Instead it can act as a **fuel-cycle enabling material**.

Conceptual sequence:

```text
Lithium breeder
↓ neutron interaction
Tritium
↓ fuel processing
D + T plasma
↓ fusion
He-4 + neutron
```

Current fusion blanket concepts may use:

```text
lithium-containing ceramics
lead-lithium
other lithium-bearing breeder materials
neutron multipliers
coolants
structural materials
```

The blanket is therefore a system, not an elemental Lithium property.

---

# 48. Liquid Lithium and MHD Context

Molten Lithium is electrically conducting.

Where electrically conducting liquid metal moves through magnetic fields:

$$
\mathbf J
$$

and:

$$
\mathbf B
$$

may couple through electromagnetic forces.

This can make magnetohydrodynamic effects relevant in certain fusion/liquid-metal systems.

MAT stores this only when:

```text
state = LIQUID
conductivity = specified
velocity = specified
field = specified
geometry = specified
```

Ordinary solid Lithium is not automatically an MHD system.

---

# 49. Manufacturing and Process Matrix

Important Lithium process families include:

## Electrochemical

```text
Li plating
Li stripping
Li+ insertion
Li+ extraction
battery cycling
electrolysis
```

## Thermal

```text
melting
solidification
alloying
annealing
heat treatment
```

## Chemical

```text
oxidation
hydride formation
nitride formation
salt formation
organolithium synthesis
```

## Ceramic

```text
Li oxide processing
Li phosphate processing
Li silicate processing
solid electrolyte processing
```

## Nuclear

```text
neutron irradiation
tritium breeding
isotope-specific reactions
```

## Vacuum / Thin Film

```text
evaporation
deposition
controlled Li surfaces
```

## Plasma

```text
plasma-facing Li states
Li-containing plasma
surface conditioning
```

---

# 50. Surface and Interphase Layer

Lithium electrochemistry introduces a major new MAT object class:

```text
INTERPHASE
```

In many electrochemical systems the Lithium-containing interface evolves chemically during use.

Relevant data can include:

```text
composition
thickness
ionic conductivity
electronic conductivity
mechanical integrity
formation cycle
temperature
electrolyte
potential history
```

The solid-electrolyte interphase, where applicable, is therefore not merely "surface contamination."

It can be a functional material layer.

---

# 51. Dendrite and Morphology Branch

In Lithium-metal electrochemical systems, deposition can become spatially nonuniform.

Possible morphologies include:

```text
smooth deposit
mossy lithium
porous lithium
filamentary growth
dendritic structures
```

These depend on:

```text
current density
electrolyte
interface
pressure
temperature
surface state
time
cycle history
```

The word:

```text
dendrite
```

must therefore describe a morphology/process result rather than an intrinsic property of the element.

---

# 52. Battery Safety Separation

MAT distinguishes:

```text
ELEMENTAL LITHIUM METAL HAZARD
```

from:

```text
LITHIUM-ION CELL HAZARD
```

Elemental Lithium metal is strongly water-reactive and can generate:

$$
H_2
$$

and caustic Lithium hydroxide during reaction with water.

Battery-system hazards may instead involve:

```text
internal short circuit
separator failure
electrolyte decomposition
gas generation
thermal runaway
mechanical abuse
overcharge
cell chemistry
```

A conventional Li-ion battery may contain no bulk metallic-Lithium electrode during normal operation.

---

# 53. Biological / Medical Context

Lithium is not a primary structural biological element.

However:

$$
Li^+
$$

is biologically active.

Certain Lithium salts are established medicines.

MAT therefore distinguishes:

```text
elemental Li metal
Li+ in biological fluid
lithium carbonate medicine
other lithium salts
```

These are different chemical and biological objects.

Current pharmaceutical labeling treats Lithium/Lithium carbonate as a mood-stabilizing medicine for bipolar I disorder and also carries a specific toxicity warning.

Medical dose, serum concentration and clinical treatment data belong to dedicated medical/pharmaceutical records rather than the elemental property table.

---

# 54. Safety Layer

## Elemental Metal

Hazard classes include:

```text
WATER-REACTIVE
AIR / MOISTURE REACTIVE
FLAMMABLE
CORROSIVE REACTION PRODUCTS
```

A key reaction is:

$$
2Li+2H_2O
\rightarrow
2LiOH+H_2
$$

The generated Hydrogen introduces an additional fire/explosion pathway.

---

## Molten Lithium

Molten Lithium requires separate high-temperature materials and containment considerations.

Do not infer safe handling from room-temperature solid properties.

---

## Lithium Salts

Safety varies by compound.

For example:

```text
LiCl
Li2CO3
LiOH
LiPF6-containing systems
```

have different hazards.

---

## Battery Systems

Battery hazards belong to the full cell architecture and operating state.

---

# 55. Energy Roles

Lithium now has at least four distinct energy relationships.

### Electrochemical

$$
\text{chemical free energy}
\leftrightarrow
\text{electrical energy}
$$

### Nuclear Fuel-Cycle Support

$$
n+Li
\rightarrow
T+He
$$

### Thermal / Liquid-Metal Systems

Lithium may serve as a working or functional material in specialized high-temperature engineering contexts.

### Lightweight Materials Enabler

Lithium-containing alloys may reduce structural mass in suitable applications.

These four roles must remain separately searchable.

---

# 56. Theoretical Lithium-Metal Specific Capacity

For the reaction:

$$
Li
\rightarrow
Li^+
+
e^-
$$

one mole of Lithium transfers one mole of electrons.

Using Faraday's constant:

$$
F
=
96485.33212\ C\,mol^{-1}
$$

the theoretical specific charge capacity is:

$$
Q_s
=
\frac{F}{3.6M}
$$

in:

$$
mAh\,g^{-1}
$$

where \(M\) is molar mass in g mol⁻¹.

Because MAT uses the standard atomic-weight interval:

$$
M\in[6.938,\ 6.997]
$$

the theoretical capacity lies approximately between:

$$
3830
$$

and:

$$
3863\ mAh\,g^{-1}
$$

for compositions spanning that interval.

The commonly cited value near:

$$
3860\ mAh\,g^{-1}
$$

therefore implicitly assumes a particular effective molar mass.

This is another example of isotope composition affecting a derived engineering metric.

---

# 57. Causali E Lithium Examples

## Electrochemical Transfer

Initial state:

$$
S_0=Li_xHost_A
$$

Intervention:

$$
A=
\text{electrochemical potential/current}
$$

Possible result:

$$
C=
Li_yHost_B
$$

subject to electrochemistry, kinetics and material constraints.

---

## Melting

$$
S_0=Li_{\rm BCC}
$$

$$
A=T\uparrow
$$

When the appropriate phase boundary is crossed:

$$
C=Li_{\rm liquid}
$$

---

## Nuclear Transformation

$$
S_0={}^6Li
$$

$$
A=n
$$

under an allowed nuclear interaction:

$$
C={}^3H+{}^4He
$$

---

## Oxidation

$$
S_0=Li_{\rm metal}
$$

$$
A=\text{oxidizing environment}
$$

Possible result family:

```text
oxide
hydroxide
carbonate-containing surface
other reaction products
```

depending on environment.

---

# 58. Multidimensional Relationship Geometry

Lithium reinforces the legacy insight that one element can have several unrelated "nearest neighbors."

Nuclear:

```text
Li ↔ H
Li ↔ He
```

Electronic periodicity:

```text
Li ↔ Na ↔ K ↔ Rb ↔ Cs ↔ Fr
```

Battery/material:

```text
Li ↔ C
Li ↔ Si
Li ↔ O
Li ↔ P
Li ↔ Fe
Li ↔ Ni
Li ↔ Mn
Li ↔ Co
```

Fusion materials:

```text
Li ↔ Pb
Li ↔ Be
```

A single linear or Euclidean relationship cannot preserve all of these equally.

---

# 59. Updated Migration State

```yaml
legacy_record: "G0003"

migration:
  atomic_identity: COMPLETE
  isotopes: CORE-COMPLETE
  nuclear: CORE-COMPLETE
  bulk_metal: CORE-COMPLETE
  crystal_structure: CORE-COMPLETE
  electrical_transport: CORE-COMPLETE
  thermal_transport: CORE-COMPLETE
  mechanical: CORE-COMPLETE
  magnetism: CORE-COMPLETE
  electrochemistry: CORE-COMPLETE
  battery_architecture: CORE-COMPLETE
  host_relationships: CORE-COMPLETE
  chemistry: CORE-COMPLETE
  alloys: CORE-COMPLETE
  fusion_breeding: CORE-COMPLETE
  process_environment: CORE-COMPLETE
  biological_context: CORE-COMPLETE
  safety: CORE-COMPLETE

remaining:
  - isotope_child_files
  - detailed_spectral_dataset
  - detailed_phase_dataset
  - detailed_high_pressure_dataset
  - experiment_registry
  - graph_manifest
  - table_manifest
  - people_and_intellectual_lineage
  - visual_specification
  - migration_audit
  - schema_validation
```

# 60. Current Status

```yaml
status: "RESEARCHED"
completeness: "RESEARCHED"
migration_status: "MIGRATED-PENDING-ARCHIVE"
validation:
  schema: "PASS"
  identifiers: "PASS"
  source_architecture: "PASS"
  isotope_semantics: "PASS"
  bulk_material_architecture: "PASS"
  electrochemical_architecture: "PASS"
  nuclear_architecture: "PASS"
  evidence_architecture: "PASS"
  scientific_core: "CORE-VALIDATED"
  exhaustive_content: false
visuals:
  specification: "LOCKED"
  generated: false
```

The bulk reference values above are consistent with current-accessible WebElements data: about `535 kg/m³`, `4.9 GPa` Young's modulus, `9.5×10⁻⁸ Ω·m` resistivity and `85 W·m⁻¹·K⁻¹` thermal conductivity. ([WebElements][1]) DOE also describes Li-ion batteries in terms of lithium ions moving between electrodes while electrons move through the external circuit, so keeping the **ion, host and whole-cell objects separate** is the right architecture. ([The Department of Energy's Energy.gov][2])

## Individual Lithium isotope child records

## Evaluated nuclear data and review

The [NUBASE2020 nuclear state catalogue](0003-Lithium-Li-Nuclear-Evaluation.md) provides 16 evaluated states with uncertainties, qualifiers and source-line provenance. This dated evaluation does not make the whole material record complete.
