# 0004 — Beryllium — Be

```yaml
mat_id: MAT:0004
record_name: Beryllium
symbol: Be
record_class: CHEMICAL_ELEMENT
atomic_number: 4
parent_id: MAT:0000
schema_version: 1.0.0
record_version: 1.0.0
status: RESEARCHED
legacy_id: G0004
legacy_name: Beryllium
reference_implementation:
  - MAT:0001
  - MAT:0002
  - MAT:0003
```

# 0. Record Navigation

Previous primary record:

```text
MAT:0003
0003-Lithium-Li
```

Current record:

```text
MAT:0004
0004-Beryllium-Be
```

---

# 1. Elemental Identity

| Property                           |        Value | Unit / Status         |
| ---------------------------------- | -----------: | --------------------- |
| MAT ID                             |     MAT:0004 | —                     |
| Element                            |    Beryllium | —                     |
| Symbol                             |           Be | —                     |
| Atomic number                      |            4 | dimensionless         |
| Proton count                       |            4 | proton                |
| Neutral electron count             |            4 | electron              |
| Period                             |            2 | —                     |
| Group                              |            2 | alkaline-earth family |
| Block                              |            s | —                     |
| Ground electron configuration      |       1s²2s² | —                     |
| Ground level                       |  \(^{1}S_0\) | —                     |
| Standard atomic weight             | 9.0121831(5) | —                     |
| Naturally occurring stable isotope |          ⁹Be | —                     |
| Common oxidation state             |           +2 | —                     |

Primary sources:

```text
SRC-000005
SRC-000048
```

---

# 2. Filled Subshell Is Not Filled Shell

Neutral Beryllium has:

$$
1s^22s^2
$$

This creates a useful MAT distinction.

The outer:

$$
2s
$$

subshell is filled.

However the complete principal shell:

$$
n=2
$$

is not filled because the \(2p\) states remain unoccupied and accessible.

Therefore:

$$
\boxed{
\text{filled subshell}
\neq
\text{closed principal shell}
}
$$

This explains why Beryllium is not chemically inert like Helium despite both having singlet \(S\)-state ground configurations.

---

# 3. First Ionisation

$$
Be
\rightarrow
Be^+
+
e^-
$$

NIST evaluated ionization energy:

$$
E_{I1}
=
9.322699\pm0.000007\ \mathrm{eV}
$$

Canonical child:

```text
MAT:0004:ION:Be+1
```

---

# 4. Second Ionisation

$$
Be^+
\rightarrow
Be^{2+}
+
e^-
$$

NIST evaluated value:

$$
E_{I2}
=
18.21115\pm0.00004\ \mathrm{eV}
$$

Canonical chemical ion:

```text
MAT:0004:ION:Be+2
```

The \(+2\) state dominates conventional Beryllium chemistry.

---

# 5. Higher Ionisation

Further ionization removes electrons from the \(1s^2\) core.

NIST gives approximately:

$$
E_{I3}
=
153.896205\ \mathrm{eV}
$$

and:

$$
E_{I4}
=
217.71858459\ \mathrm{eV}
$$

Canonical states:

```text
MAT:0004:ION:Be+3
MAT:0004:ION:Be+4
```

These highly ionized states belong primarily to plasma, atomic and high-energy environments rather than ordinary chemistry.

---

# 6. Ordinary Material State

At ordinary conditions elemental Beryllium is a metallic solid.

Representative properties:

```text
state: SOLID
material_class: LIGHT-METAL
appearance: SILVERY-WHITE
density: approximately 1.85 g/cm3
```

The engineering state differs strongly from Lithium.

Lithium combines:

```text
very low density
+
low stiffness
```

while Beryllium combines:

```text
low density
+
very high stiffness
```

This activates the MAT **specific-property** branch.

---

# 7. Crystal Structure

Ordinary metallic Beryllium adopts a:

```text
HEXAGONAL-CLOSE-PACKED
```

structure.

Canonical phase:

```text
MAT:0004:PHASE:HCP
```

Crystallographic reference:

```yaml
structure: HCP
space_group: P63/mmc
space_group_number: 194

cell:
  a: 228.58
  c: 358.43
  unit: pm
```

Equivalent approximate values:

$$
a=2.2858\ \text{\AA}
$$

$$
c=3.5843\ \text{\AA}
$$

This is MAT's first validated HCP elemental-metal reference state.

---

# 8. Structural Anisotropy

HCP geometry means mechanical response may depend on crystallographic direction.

Relevant variables include:

```text
grain orientation
texture
basal planes
slip systems
grain size
impurities
temperature
strain rate
```

Therefore one scalar:

```text
beryllium strength
```

cannot fully describe the material.

The structural state must include microstructure.

---

# 9. Specific Stiffness

Historical `G0004` identified Beryllium as an important:

```text
stiffness / mass
```

material.

MAT formalizes this as:

$$
S_{\rm specific}
=
\frac{E}{\rho}
$$

where:

* \(E\) = specified elastic modulus;
* \(\rho\) = density.

This allows Beryllium to be compared with:

```text
Al
Mg
Ti
C composites
other lightweight structural systems
```

without inventing a subjective "structural score."

---

# 10. Thermal State

Representative phase points include approximately:

$$
T_m
\approx1560\ \mathrm K
$$

and:

$$
T_b
\approx2741\ \mathrm K
$$

for conventional reference conditions.

Detailed thermophysical objects must preserve:

```text
pressure
sample state
purity
measurement source
uncertainty
```

---

# 11. Thermal Conductivity

Beryllium has relatively high thermal conductivity for a lightweight structural metal.

This creates an engineering combination:

$$
\boxed{
\text{low density}
+
\text{high stiffness}
+
\text{useful thermal conductivity}
}
$$

The exact conductivity value will be stored in the detailed property table with specified temperature and material condition.

---

# 12. Ground-State Magnetism

For the isolated atomic ground state:

$$
{}^1S_0
$$

there is:

$$
S=0
$$

$$
L=0
$$

$$
J=0
$$

so there is no permanent ground-state electronic magnetic moment.

Bulk metallic Beryllium is a different collective state and must be represented separately.

No conventional permanent engineered magnetisation is assigned automatically.

---

# 13. Frequency and Spectroscopy

MAT again prohibits:

```text
beryllium_frequency
```

as a universal scalar.

Beryllium has separate frequency mechanisms including:

```text
atomic electronic transitions
fine structure
isotope shifts
plasma spectra
solid-state phonons
acoustic modes
NMR where nuclear spin permits
```

A historically important strong neutral-Be ultraviolet line occurs near:

$$
234.861\ \mathrm{nm}
$$

but this is **one atomic transition**, not "the frequency of Beryllium."

---

# 14. X-Ray Interaction

Beryllium's low atomic number and useful mechanical properties make thin Beryllium material relatively transparent to X-rays compared with many structural metals.

This creates a distinctive application relationship:

$$
\boxed{
\text{mechanically useful window}
+
\text{low X-ray attenuation}
}
$$

Relevant applications include:

```text
X-ray tube windows
detector windows
synchrotron/instrumentation windows
X-ray optical systems
```

This is **X-ray transmission**, not ordinary visible-light transparency.

---

# 15. Isotope Family

Current mass tables contain Beryllium states from:

$$
{}^5Be
$$

through:

$$
{}^{16}Be
$$

The stable natural element is overwhelmingly:

$$
{}^9Be
$$

with isotopic composition:

$$
1
$$

in the NIST standard table.

The isotope branch contains several very different physical classes:

```text
proton-unbound
extremely short-lived
radioactive
stable
long-lived cosmogenic
neutron-rich
multi-neutron emitters
```

---

# 16. Beryllium-5 — ⁵Be

Canonical ID:

```text
MAT:0004:ISO:Be-5
```

Composition:

```text
protons: 4
neutrons: 1
```

Relative atomic mass:

$$
5.0399(22\#)\ \mathrm u
$$

NUBASE2020 classification:

```text
PROTON-UNSTABLE
```

No adopted numerical half-life is assigned.

MAT therefore stores:

```yaml
stability: "PROTON-UNSTABLE"
half_life: "NOT-ESTABLISHED"
```

rather than fabricating a lifetime.

---

# 17. Beryllium-6 — ⁶Be

Canonical ID:

```text
MAT:0004:ISO:Be-6
```

Composition:

```text
protons: 4
neutrons: 2
```

Relative atomic mass:

$$
6.0197264(58)\ \mathrm u
$$

Evaluated lifetime:

$$
t_{1/2}
=
5.0\pm0.3\ \mathrm{zs}
$$

Spin/parity:

$$
0^+
$$

Principal decay:

```text
TWO-PROTON EMISSION
```

---

# 18. Beryllium-7 — ⁷Be

Canonical ID:

```text
MAT:0004:ISO:Be-7
```

Composition:

```text
protons: 4
neutrons: 3
```

Relative atomic mass:

$$
7.016928717(76)\ \mathrm u
$$

Evaluated half-life:

$$
t_{1/2}
=
53.22\pm0.06\ \mathrm d
$$

Spin/parity:

$$
\frac32^-
$$

Decay:

```text
ELECTRON-CAPTURE
```

Daughter:

```text
MAT:0003:ISO:Li-7
```

which is already a resolved MAT record.

---

# 19. Beryllium-8 — ⁸Be

Canonical ID:

```text
MAT:0004:ISO:Be-8
```

Relative atomic mass:

$$
8.005305102(37)\ \mathrm u
$$

Evaluated lifetime:

$$
t_{1/2}
=
81.9\pm3.7\ \mathrm{as}
$$

Spin/parity:

$$
0^+
$$

Decay:

$$
{}^8Be
\rightarrow
{}^4He+{}^4He
$$

Canonical daughters:

```text
MAT:0002:ISO:He-4
MAT:0002:ISO:He-4
```

⁸Be is therefore an important MAT example of:

```text
PHYSICALLY-REALIZED
+
EXTREMELY-TRANSIENT
```

It is neither stable nor "impossible."

---

# 20. Helium → Beryllium → Carbon Bridge

The transient ⁸Be state is central to the stellar triple-alpha pathway.

First:

$$
{}^4He+{}^4He
\rightleftharpoons
{}^8Be
$$

followed by:

$$
{}^8Be+{}^4He
\rightarrow
{}^{12}C+\gamma
$$

This creates a future nuclear knowledge-graph path:

```text
MAT:0002 Helium
↓
MAT:0004 Beryllium
↓
MAT:0006 Carbon
```

This is a nuclear relationship, not ordinary chemical periodicity.

---

# 21. Beryllium-9 — ⁹Be

Canonical ID:

```text
MAT:0004:ISO:Be-9
```

Composition:

```text
protons: 4
neutrons: 5
```

Relative atomic mass:

$$
9.012183065(82)\ \mathrm u
$$

Status:

```text
STABLE
```

Spin/parity:

$$
\frac32^-
$$

Natural isotopic composition in the standard NIST table:

$$
1
$$

⁹Be is the principal nucleus relevant to ordinary Beryllium engineering.

---

# 22. Alpha–Beryllium Neutron Relationship

An important nuclear reaction is:

$$
{}^9Be+{}^4He
\rightarrow
{}^{12}C+n
$$

This produces a direct typed relationship:

```text
Helium-4
+
Beryllium-9
↓
Carbon-12
+
neutron
```

Historically this reaction class has been important in neutron-source science.

It must remain separate from Beryllium's chemical behavior.

---

# 23. Beryllium-10 — ¹⁰Be

Canonical ID:

```text
MAT:0004:ISO:Be-10
```

Relative atomic mass:

$$
10.013534695(86)\ \mathrm u
$$

Evaluated half-life:

$$
t_{1/2}
=
1.387\pm0.012\ \mathrm{My}
$$

Spin/parity:

$$
0^+
$$

Principal decay:

```text
BETA-MINUS
```

Future daughter:

```text
MAT:0005:ISO:B-10
```

Status:

```text
RESERVED-PENDING-BORON
```

---

# 24. Cosmogenic Clock

¹⁰Be demonstrates an important MAT principle.

Its long half-life makes it poorly suited to high-specific-power radioactive energy applications.

However the same property makes it useful as a:

```text
COSMOGENIC TRACER
ENVIRONMENTAL CLOCK
GEOLOGICAL / EXPOSURE-DATING NUCLIDE
```

Thus:

$$
\boxed{
\text{poor for one function}
\neq
\text{poor universally}
}
$$

Function must always be explicit.

---

# 25. Beryllium-11 — ¹¹Be

Canonical ID:

```text
MAT:0004:ISO:Be-11
```

Relative atomic mass:

$$
11.02166108(26)\ \mathrm u
$$

Evaluated half-life:

$$
t_{1/2}
=
13.76\pm0.07\ \mathrm s
$$

Spin/parity:

$$
\frac12^+
$$

Principal decay:

```text
BETA-MINUS
```

with evaluated minor delayed-particle branches.

¹¹Be is also an important neutron-rich nuclear-structure system.

---

# 26. Beryllium-12 — ¹²Be

Canonical ID:

```text
MAT:0004:ISO:Be-12
```

Relative atomic mass:

$$
12.0269221(20)\ \mathrm u
$$

Evaluated half-life:

$$
21.46\pm0.05\ \mathrm{ms}
$$

Spin/parity:

$$
0^+
$$

Principal decay:

```text
BETA-MINUS
```

with a beta-delayed-neutron branch.

---

# 27. Beryllium-13 — ¹³Be

Canonical ID:

```text
MAT:0004:ISO:Be-13
```

Relative atomic mass:

$$
13.036135(11)\ \mathrm u
$$

Evaluated lifetime:

$$
1.0\pm0.7\ \mathrm{zs}
$$

Adopted spin/parity:

$$
\left(\frac12^-\right)
$$

Classification:

```text
EXTREMELY-SHORT-LIVED / NEUTRON-UNBOUND
```

---

# 28. Beryllium-14 — ¹⁴Be

Canonical ID:

```text
MAT:0004:ISO:Be-14
```

Relative atomic mass:

$$
14.04289(14)\ \mathrm u
$$

Evaluated half-life:

$$
4.53\pm0.27\ \mathrm{ms}
$$

Spin/parity:

$$
0^+
$$

Principal decay:

```text
BETA-MINUS
```

with large beta-delayed-neutron branching.

---

# 29. Beryllium-15 — ¹⁵Be

Canonical ID:

```text
MAT:0004:ISO:Be-15
```

Relative atomic mass:

$$
15.05342(43\#)\ \mathrm u
$$

Evaluated lifetime:

$$
790\pm270\ \mathrm{ys}
$$

Adopted spin/parity:

$$
\left(\frac52^+\right)
$$

Principal decay:

```text
NEUTRON EMISSION
```

---

# 30. Beryllium-16 — ¹⁶Be

Canonical ID:

```text
MAT:0004:ISO:Be-16
```

Relative atomic mass:

$$
16.06167(18)\ \mathrm u
$$

Evaluated lifetime:

$$
650\pm130\ \mathrm{ys}
$$

Spin/parity:

$$
0^+
$$

Principal evaluated decay:

```text
TWO-NEUTRON EMISSION
```

---

# 31. Nuclear-State Lesson

The Beryllium branch now contains:

```text
5Be   proton-unstable
6Be   two-proton emitter
7Be   electron-capture radionuclide
8Be   alpha-decaying transient bridge
9Be   stable engineering nucleus
10Be  long-lived cosmogenic radionuclide
11Be  neutron-rich beta emitter
12Be  short-lived beta emitter
13Be  neutron-unbound
14Be  neutron-rich beta emitter
15Be  neutron emitter
16Be  two-neutron emitter
```

This makes Beryllium one of the clearest early demonstrations that:

$$
\boxed{
\text{same element}
\neq
\text{same nuclear function}
}
$$

---

# 32. Nuclear Neutron-Management Role

⁹Be can participate in neutron-producing and neutron-multiplying reactions.

Relevant application classes include:

```text
neutron sources
neutron reflectors
neutron management
fusion neutron multipliers
nuclear instrumentation
```

The element is therefore better represented as:

```text
NUCLEAR-REACTION / NEUTRON-MANAGEMENT MATERIAL
```

than as a conventional nuclear fuel.

---

# 33. Lithium–Beryllium Fusion Relationship

MAT now has:

```text
MAT:0003 Lithium
MAT:0004 Beryllium
```

with complementary fusion-material roles.

Conceptually:

```text
Lithium-containing breeder
→ captures neutrons
→ generates Tritium

Beryllium / beryllide multiplier
→ increases available neutron population
```

This produces a systems-level edge:

```text
MAT:0003
FUSION-SYSTEM-COOPERATES-WITH
MAT:0004
```

The relationship belongs to the blanket system, not to either element alone.

---

# 34. FLiBe Relationship

An important multi-element material family is based on:

$$
LiF+BeF_2
$$

producing FLiBe-type molten salts.

Future relationship cluster:

```text
MAT:0003 Lithium
MAT:0004 Beryllium
MAT:0009 Fluorine
↓
FLiBe material system
```

Relevant domains include:

```text
molten-salt systems
high-temperature heat transfer
fusion research
nuclear technology
tritium-management research
```

The actual properties belong to the defined molten-salt composition rather than to elemental Beryllium.

---

# 35. Beryllium Oxide — BeO

Future compound:

```text
MAT:CMP:BeO
```

BeO demonstrates an important emergent-material combination:

```text
ELECTRICAL INSULATION
+
HIGH THERMAL CONDUCTIVITY
+
REFRACTORY CERAMIC BEHAVIOR
```

This property combination does not exist in elemental Beryllium in the same form.

It is therefore a strong MAT inverse-design example.

---

# 36. Copper Relationship

Future edge:

```text
MAT:0004
ALLOYS-WITH
MAT:0029
```

Beryllium-copper alloys can provide combinations involving:

```text
strength
spring behavior
electrical conductivity
thermal conductivity
fatigue resistance
non-sparking tooling
```

These are alloy properties.

They must never be copied into elemental Beryllium's intrinsic-property table.

---

# 37. Aluminium Relationship

Future edge:

```text
MAT:0004
MATERIAL-RELATIONSHIP-WITH
MAT:0013
```

Be–Al systems are relevant to lightweight structural engineering.

The design trade space may include:

```text
density
specific stiffness
strength
manufacturability
thermal expansion
thermal conductivity
cost
toxicity
```

---

# 38. Chemical Character

The common oxidation state is:

$$
+2
$$

However Beryllium chemistry is not merely a scaled version of heavier Group-2 chemistry.

Because Be²⁺ is small and has high charge density, Beryllium bonding can have substantial covalent character.

MAT therefore distinguishes:

```text
PERIODIC GROUP RELATIONSHIP
```

from:

```text
CHEMICAL SIMILARITY DISTANCE
```

Beryllium may be periodic-table-near Magnesium while still being chemically distinctive.

---

# 39. Biological Context

No established essential biological role is assigned to Beryllium.

Instead the biological/occupational relationship is primarily:

```text
TOXICITY
IMMUNE SENSITIZATION
RESPIRATORY DISEASE
CARCINOGENIC HAZARD
```

This is a major distinction from:

```text
BIOLOGICALLY ESSENTIAL ELEMENT
```

---

# 40. Occupational Exposure

Airborne Beryllium dust, fume and mist are serious occupational hazards.

Documented health outcomes include:

```text
beryllium sensitization
chronic beryllium disease
acute beryllium disease at sufficiently high exposure
lung-cancer risk
```

Machining and powder processing must therefore be linked directly to occupational-exposure controls.

Safety is not a detachable footnote to manufacturing.

---

# 41. Manufacturing

Important manufacturing/process classes include:

```text
powder metallurgy
hot pressing
sintering
machining
controlled-atmosphere processing
alloying
ceramic processing
thin foil / window fabrication
nuclear component manufacture
```

For Beryllium:

$$
\boxed{
\text{manufacturing feasibility}
+
\text{worker exposure control}
}
$$

must be evaluated together.

---

# 42. Combustion / Oxidation

Beryllium can oxidize and form BeO.

A simplified relationship is:

$$
Be+O
\rightarrow
BeO
$$

under suitable reaction conditions.

The existence of reaction energy does **not** imply that Beryllium is an attractive practical fuel.

MAT keeps separate:

```text
combustion/reaction energy
```

and:

```text
practical fuel utility
```

---

# 43. Causali E — Transient Nuclear State

Initial components:

$$
S_0=
{}^4He+{}^4He
$$

Interaction:

$$
A=
\text{allowed nuclear collision state}
$$

Candidate:

$$
C=
{}^8Be
$$

but:

$$
C(t)
\rightarrow
{}^4He+{}^4He
$$

on an attosecond timescale.

This demonstrates:

```text
VALID CANDIDATE STATE
≠
LONG-LIVED STATE
```

---

# 44. Causali E — Emergent Ceramic

Starting states:

$$
A=Be
$$

$$
B=O
$$

Candidate compound:

$$
C=BeO
$$

The resulting material can exhibit a property combination not represented by either elemental parent alone.

This is a strong example of:

$$
\boxed{
\text{composition + structure}
\rightarrow
\text{emergent material properties}
}
$$

---

# 45. Relationship Geometry

Beryllium has several distinct relationship directions.

### Nuclear

```text
He ↔ Be ↔ C
```

### Fusion Engineering

```text
Li ↔ Be
```

### Molten-Salt Technology

```text
Li ↔ Be ↔ F
```

### Structural Materials

```text
Be ↔ Al
Be ↔ Ti
Be ↔ composite systems
```

### Conductive Alloys

```text
Be ↔ Cu
```

### Ceramics

```text
Be ↔ O
```

### Periodicity

```text
Be ↔ Mg ↔ Ca ↔ Sr ↔ Ba ↔ Ra
```

A single nearest-neighbour distance cannot represent all of these.

---

# 46. MAT Geometry Result

`MAT:0004` reinforces the need for:

$$
\boxed{
\text{multiple coupled relationship layers}
}
$$

or:

$$
\boxed{
\text{higher-dimensional graph projected into visual space}
}
$$

The same element can simultaneously occupy:

```text
nuclear geometry
chemical geometry
periodic geometry
materials geometry
application geometry
safety geometry
```

---

# 47. Initial Visual Placeholders

```markdown
<!-- MAT-VISUAL: V01 -->
<!-- DESCRIPTION: Metallic Beryllium material manifestation -->

<!-- MAT-VISUAL: V03 -->
<!-- DESCRIPTION: HCP Beryllium lattice -->

<!-- MAT-VISUAL: V05 -->
<!-- DESCRIPTION: 5Be through 16Be isotope map -->

<!-- MAT-VISUAL: V06 -->
<!-- DESCRIPTION: Mechanism-separated Beryllium spectrum -->

<!-- MAT-VISUAL: V07 -->
<!-- DESCRIPTION: Density / stiffness / thermal dashboard -->

<!-- MAT-VISUAL: V11 -->
<!-- DESCRIPTION: HCP mechanics and specific stiffness -->

<!-- MAT-VISUAL: V12 -->
<!-- DESCRIPTION: Temperature-pressure phase structure -->

<!-- MAT-VISUAL: V14 -->
<!-- DESCRIPTION: He-Be-C, Li-Be, Be-Cu, Be-O relationship graph -->

<!-- MAT-VISUAL: V17 -->
<!-- DESCRIPTION: X-ray, aerospace, nuclear, ceramic and alloy applications -->

<!-- MAT-VISUAL: V18 -->
<!-- DESCRIPTION: Evidence plus occupational-safety provenance -->
```

---

# 48. Current Record Status

```yaml
status: "RESEARCHED"
migration_status: "CONTENT-CORE-MIGRATED"
schema_validation_status: "PENDING"
visual_specification: "NOT-YET-LOCKED"
visual_assets: "NOT-GENERATED"
```

NIST currently gives neutral Be as `1s²2s²`, \(^{1}S_0\), with first ionization energy `9.322699 ± 0.000007 eV`; its standard atomic-weight table gives `9.0121831(5)` and ⁹Be abundance `1`. ([NIST][1]) Beryllium's ordinary metal structure is HCP, `P6₃/mmc`, with approximately `a = 228.58 pm`, `c = 358.43 pm`. ([WebElements][2])

The isotope semantics above follow NUBASE2020 rather than treating every mass-table entry as a normal isotope: for example, ⁵Be is proton-unstable, ⁷Be is `53.22 ± 0.06 d`, ⁸Be is only `81.9 ± 3.7 as`, ⁹Be is stable, and ¹⁰Be is `1.387 ± 0.012 My`. ([Nuclear Data Section][3])

---

# 49. Bulk Material Property Layer

Beryllium activates a much stronger structural-material branch than Lithium.

Representative bulk reference values include:

| Property                 |  Representative Value | Unit      |
| ------------------------ | --------------------: | --------- |
| Density                  |                  1848 | kg m⁻³    |
| Young's modulus          |                   287 | GPa       |
| Shear modulus            |                   132 | GPa       |
| Bulk modulus             |                   130 | GPa       |
| Poisson ratio            |                 0.032 | —         |
| Electrical resistivity   |  \(3.8\times10^{-8}\) | Ω m       |
| Thermal conductivity     |                   190 | W m⁻¹ K⁻¹ |
| Linear thermal expansion | \(11.3\times10^{-6}\) | K⁻¹       |
| Sound velocity           |                ~13000 | m s⁻¹     |

These are reference values.

Final measurement objects must retain:

```text
temperature
pressure
crystallographic direction
texture
purity
grain structure
manufacturing route
measurement method
uncertainty
source
```

---

# 50. Elastic Anisotropy

Beryllium is HCP.

Therefore:

$$
E=E(\mathbf n)
$$

where:

$$
\mathbf n
$$

represents crystallographic/loading direction.

Reported Young's modulus values vary with orientation.

MAT therefore distinguishes:

```text
POLYCRYSTALLINE REFERENCE MODULUS
```

from:

```text
DIRECTION-RESOLVED SINGLE-CRYSTAL MODULUS
```

A single value such as:

$$
287\ {\rm GPa}
$$

must not erase anisotropy.

---

# 51. Specific Stiffness

Define:

$$
S_E=\frac{E}{\rho}
$$

Using:

$$
E=287\times10^9\ {\rm Pa}
$$

and:

$$
\rho=1848\ {\rm kg\,m^{-3}}
$$

gives:

$$
\boxed{
S_E
\approx
1.553\times10^8\ {\rm m^2\,s^{-2}}
}
$$

This is a derived **specific Young's modulus**.

It is not a universal structural ranking.

Real component performance also depends on:

```text
strength
fracture toughness
fatigue
geometry
anisotropy
joining
temperature
toxicity
manufacturing
cost
```

---

# 52. Electrical Transport

Using the representative resistivity:

$$
\rho_e
=
3.8\times10^{-8}\ \Omega m
$$

the corresponding conductivity is:

$$
\sigma
=
\frac{1}{\rho_e}
$$

giving:

$$
\boxed{
\sigma
\approx
2.63\times10^7\ S\,m^{-1}
}
$$

Classification:

```text
DERIVED REFERENCE VALUE
```

This applies to the specified metallic state.

It does not apply automatically to:

```text
BeO
BeF2
Be-Cu alloy
plasma Be
Be2+
```

---

# 53. Thermal Transport

Representative metallic-Beryllium thermal conductivity:

$$
k\approx190\ W\,m^{-1}K^{-1}
$$

The engineering combination is therefore:

$$
\boxed{
\text{low density}
+
\text{high stiffness}
+
\text{high thermal conductivity}
}
$$

But the final MAT property remains:

$$
k=k(T,P,S,\mu,\text{history})
$$

where \(S\) represents material state and \(\mu\) microstructure.

---

# 54. Acoustic Relationship

Representative longitudinal/material sound velocity is of order:

$$
v_s\approx1.3\times10^4\ {\rm m\,s^{-1}}
$$

Acoustic response belongs to the bulk elastic medium.

It is **not** a single intrinsic atomic "Beryllium vibration frequency."

Frequency still requires:

```text
mode
wavelength
geometry
boundary conditions
crystal direction
temperature
```

---

# 55. Beryllium Oxide Material Branch

Canonical future child:

```text
MAT:CMP:BeO
```

BeO is a ceramic, not a metallic Beryllium state.

NIST structural-ceramics data show that BeO can combine:

```text
electrical insulation
high thermal conductivity
high elastic modulus
ceramic/refractory behaviour
```

For one typical polycrystalline reference:

```text
density ≈ 3.01 g/cm3
elastic modulus ≈ 378 GPa
thermal conductivity ≈ 240 W/(m*K) near room temperature
```

These values are material/process dependent.

For a measured single crystal, NIST reports approximately:

$$
k(300\,K)\approx370\ W\,m^{-1}K^{-1}
$$

with substantially larger conductivity at lower temperatures.

Thus:

$$
\boxed{
k_{\rm BeO}
\neq
\text{one universal BeO constant}
}
$$

---

# 56. BeO Inverse-Design Example

Suppose the target is:

```text
electrical insulation
+
high thermal conduction
+
ceramic stability
```

Elemental Be alone does not satisfy that property vector.

But:

$$
Be+O
\rightarrow
BeO
$$

creates a candidate material.

In MAT inverse-search form:

$$
Y^*
=
\{
\sigma_{\rm electrical}\downarrow,
k_{\rm thermal}\uparrow,
T_{\rm service}\uparrow
\}
$$

may return:

```text
BeO-containing ceramic systems
```

subject to the severe toxicity/manufacturing constraints associated with Beryllium.

---

# 57. X-Ray Window Relationship

Beryllium's low atomic number reduces X-ray attenuation relative to many structural metals.

Thin Be foil can therefore combine:

```text
mechanical support
+
vacuum boundary capability
+
relatively low X-ray attenuation
```

This relationship depends on:

$$
I=I_0e^{-\mu(E)\rho x}
$$

where:

* \(E\) = photon energy;
* \(\mu\) = energy-dependent mass attenuation coefficient;
* \(\rho\) = material density;
* \(x\) = thickness.

Therefore:

```text
X-RAY TRANSPARENT
```

must always mean:

```text
RELATIVELY TRANSMISSIVE
AT SPECIFIED PHOTON ENERGY AND THICKNESS
```

not perfectly transparent.

---

# 58. ⁸Be Decay Energy

For:

$$
{}^8Be
\rightarrow
{}^4He+{}^4He
$$

using atomic masses:

$$
m({}^8Be)=8.005305102\ u
$$

$$
m({}^4He)=4.00260325413\ u
$$

gives:

$$
\Delta m
=
m({}^8Be)-2m({}^4He)
$$

and:

$$
\boxed{
Q\approx0.09184\ {\rm MeV}
}
$$

The positive value is consistent with ⁸Be being unbound relative to two alpha particles.

---

# 59. ⁹Be Alpha-Neutron Reaction

Reaction:

$$
{}^9Be+{}^4He
\rightarrow
{}^{12}C+n
$$

Using atomic masses:

$$
m({}^9Be)=9.012183065\ u
$$

$$
m({}^4He)=4.00260325413\ u
$$

$$
m({}^{12}C)=12\ u
$$

$$
m_n=1.00866491595\ u
$$

gives:

$$
\boxed{
Q\approx+5.70205\ {\rm MeV}
}
$$

This reaction is historically important in neutron physics.

---

# 60. ⁹Be Neutron-Multiplication Relationship

A representative neutron-multiplication channel is:

$$
{}^9Be+n
\rightarrow
{}^8Be+2n
$$

Using evaluated masses gives:

$$
\boxed{
Q\approx-1.66454\ {\rm MeV}
}
$$

The negative Q-value means sufficient incident kinetic energy is required.

MAT stores:

```text
reaction energetics
```

separately from:

```text
device geometry
neutron spectrum
blanket design
reaction rate
engineering performance
```

---

# 61. Current Fusion-System Role

Current fusion blanket research still includes Beryllium and Beryllium-based materials as:

```text
NEUTRON MULTIPLIERS
```

alongside Lithium-containing breeder materials.

A systems representation is:

```text
fusion neutron field
↓
beryllium / beryllide multiplier zone
↓ increased neutron availability
lithium-containing breeder zone
↓
tritium production
```

This is a cooperative material system.

It is not accurately represented as:

```text
Beryllium produces fusion fuel by itself
```

---

# 62. Beryllides

Fusion research also includes intermetallic Beryllium-rich materials such as:

```text
TiBe12
CrBe12
```

These can have performance differences relative to pure Be, including:

```text
mechanical strength
swelling behaviour
manufacturability
irradiation response
```

Therefore:

```text
PURE Be
```

and:

```text
BERYLLIDE
```

must remain different material records.

---

# 63. Occupational Safety as Process State

For Beryllium the exposure pathway is critical.

High-concern states include:

```text
airborne dust
machining particles
fume
mist
contaminated surfaces
powders
```

The hazard cannot be represented only by bulk composition.

MAT safety state:

$$
H=
F(
\text{chemical form},
\text{particle size},
C_{\rm air},
t,
\text{exposure route},
\text{work process},
\text{controls}
)
$$

---

# 64. Regulatory Exposure Fields

Jurisdiction-specific exposure limits may be stored as regulatory objects.

For example, the current OSHA United States standard includes:

```text
8-hour TWA PEL: 0.2 microgram/m3
15-minute STEL: 2.0 microgram/m3
```

These are:

```text
REGULATORY LIMITS
```

not physical constants.

Every such field requires:

```text
jurisdiction
regulator
rule
effective/current status
access date
```

---

# 65. Manufacturing-Safety Coupling

For Beryllium:

```text
machining
grinding
powder metallurgy
sintering
finishing
recycling
```

must connect to:

```text
dust generation
air monitoring
containment
ventilation
PPE/respiratory protection where required
decontamination
waste control
```

MAT therefore uses:

$$
\boxed{
\text{PROCESS}
\leftrightarrow
\text{EXPOSURE}
\leftrightarrow
\text{CONTROL}
}
$$

---

# 66. Updated Record State

```yaml
status: "RESEARCHED"
migration_status: "CONTENT-MIGRATED"
material_performance: "CORE-COMPLETE"
nuclear_calculations: "CORE-COMPLETE"
safety_architecture: "CORE-COMPLETE"
isotope_children: "COMPLETE"
schema_validation_status: "PENDING"
visual_specification: "NOT-YET-LOCKED"
visual_assets: "NOT-GENERATED"
```
