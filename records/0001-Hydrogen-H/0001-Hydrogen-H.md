# 0001 — Hydrogen — H

```yaml
mat_id: MAT:0001
record_name: Hydrogen
symbol: H
record_class: CHEMICAL_ELEMENT
atomic_number: 1
parent_id: MAT:0000
schema_version: 1.0.0
record_version: 1.0.0
status: RESEARCHED
legacy_id: G0001
legacy_name: Hydrogen
```

# 0. Record Navigation

## MAT Reference

`MAT:0000`

## Current Record

`MAT:0001`

```text
0001-Hydrogen-H
```

## Primary Child Classes

```text
MAT:0001
│
├── ISO       isotopes / nuclides
├── NUC       nuclear states
├── QSTATE    quantum states
├── ESTATE    electronic states
├── ION       ionic states
├── MOL       molecular states
├── CMP       compounds
├── PHASE     phases
├── MAT       material states
├── PROC      processes
├── RXN       reactions
├── ENV       environments
├── APP       applications
├── EXP       experiments
├── GRAPH     graphs
├── MODEL     models
└── SRC       sources
```

Hydrogen is therefore not represented by one single undifferentiated point.

Its canonical elemental identity remains:

$$
\boxed{
H,\quad Z=1
}
$$

while its accessible physical states form a much larger network.

---

# 1. Elemental Identity

| Property                        |              Value | Unit / Status                         |
| ------------------------------- | -----------------: | ------------------------------------- |
| MAT ID                          |           MAT:0001 | —                                     |
| Element                         |           Hydrogen | —                                     |
| Symbol                          |                  H | —                                     |
| Atomic number                   |                  1 | dimensionless                         |
| Proton count                    |                  1 | neutral nucleus identity              |
| Neutral electron count          |                  1 | electron                              |
| Period                          |                  1 | —                                     |
| Group                           |                  1 | conventional periodic-table placement |
| Block                           |                  s | —                                     |
| Ground electron configuration   |                1s¹ | —                                     |
| Ground electronic term          |    \(^{2}S_{1/2}\) | —                                     |
| First ionization energy         |    13.598434599702 | eV                                    |
| Standard atomic-weight interval | [1.00784, 1.00811] | —                                     |

Primary sources:

```text
SRC-H-001
SRC-H-002
```

---

# 2. Element Versus Material State

The elemental identity:

$$
Z=1
$$

does not specify whether hydrogen currently exists as:

```text
¹H
²H
³H
H
H⁻
H⁺
H₂
HD
D₂
T₂
HT
DT
excited H
adsorbed H
interstitial H
hydride
liquid H₂
solid H₂
dense high-pressure hydrogen
ionized hydrogen plasma
```

The MAT record therefore distinguishes:

$$
\text{element identity}
$$

from:

$$
\text{physical state}
$$

and:

$$
\text{material manifestation}
$$

---

# 3. Standard Atomic Weight

Natural terrestrial hydrogen does not require one universally exact decimal atomic weight.

MAT records the standard atomic-weight interval:

$$
[1.00784,\ 1.00811]
$$

because isotopic composition varies among normal terrestrial materials.

This is distinct from the relative atomic mass of an individual isotope.

For example:

$$
m(^{1}H)
=
1.00782503223\ \mathrm u
$$

while:

$$
m(^{2}H)
=
2.01410177812\ \mathrm u
$$

These are different concepts.

---

# 4. First Ionization

For neutral atomic hydrogen:

$$
H\rightarrow H^+ + e^-
$$

with ionization energy:

$$
E_\mathrm{ion}
=
13.598434599702\ \mathrm{eV}
$$

for the ground-state atom.

Governing principles include:

```yaml
governed_by:
  - MAT-QM-001
  - MAT-QM-006
  - MAT-QM-016
  - MAT-PHYS-010
```

Evidence classification:

```yaml
evidence_type: MEASURED
confidence: A
```

---

# 5. Electron Attachment and H⁻

Hydrogen can bind an additional electron:

$$
H+e^-
\rightarrow
H^-
$$

creating the hydride anion.

High-precision photodetachment measurements give an atomic hydrogen electron affinity close to:

$$
0.754195\ \mathrm{eV}
$$

with the precise value depending on the selected evaluated measurement/source.

MAT therefore stores electron-affinity measurements individually rather than pretending all historical determinations are identical.

Canonical child:

```text
MAT:0001:ION:H-1
```

---

# 6. Charge-State Branch

The simplest hydrogen charge-state branch is:

```text
H⁻
H⁰
H⁺
```

These represent fundamentally different electronic states.

## Neutral

$$
H^0
$$

contains:

```text
1 proton
1 electron
```

for protium.

## Positive Ion

$$
H^+
$$

for ordinary protium corresponds to a bare proton.

For deuterium:

$$
D^+
$$

corresponds to a deuteron.

For tritium:

$$
T^+
$$

corresponds to a triton.

The isotope identity must therefore remain attached to the ionic state.

## Negative Ion

$$
H^-
$$

contains two electrons associated with one hydrogen nucleus.

---

# 7. Complete Evaluated Isotope Branch

MAT currently records mass-number states:

$$
{}^1H
$$

through:

$$
{}^7H
$$

in the evaluated mass datasets used for this record.

They share:

$$
Z=1
$$

but differ in neutron number:

$$
N=A-Z
$$

---

## 7.1 Protium — ¹H

Canonical ID:

```text
MAT:0001:ISO:H-1
```

Nuclide:

$$
{}^1_1H
$$

Composition:

```text
protons: 1
neutrons: 0
```

Relative atomic mass:

$$
1.00782503223(9)\ \mathrm u
$$

Status:

```text
STABLE
```

Approximate representative natural isotopic composition in the NIST table:

$$
0.999885(70)
$$

This abundance is not a universal fixed number for every sample.

---

## 7.2 Deuterium — ²H — D

Canonical ID:

```text
MAT:0001:ISO:H-2
```

Nuclide:

$$
{}^2_1H
$$

Common symbol:

$$
D
$$

Composition:

```text
protons: 1
neutrons: 1
```

Relative atomic mass:

$$
2.01410177812(12)\ \mathrm u
$$

Status:

```text
STABLE
```

Representative natural isotopic composition in the NIST table:

$$
0.000115(70)
$$

Deuterium has nuclear spin:

$$
I=1
$$

and therefore differs from protium in nuclear-spin-dependent behaviour.

---

## 7.3 Tritium — ³H — T

Canonical ID:

```text
MAT:0001:ISO:H-3
```

Nuclide:

$$
{}^3_1H
$$

Common symbol:

$$
T
$$

Composition:

```text
protons: 1
neutrons: 2
```

Relative atomic mass:

$$
3.0160492779(24)\ \mathrm u
$$

Nuclear spin/parity:

$$
\frac12^+
$$

Status:

```text
RADIOACTIVE
```

Evaluated half-life:

$$
t_{1/2}
=
12.32\pm0.02\ \mathrm{y}
$$

Principal decay:

$$
{}^3H
\rightarrow
{}^3He
+
e^-
+
\bar{\nu}_e
$$

Decay class:

```text
BETA-MINUS
```

---

## 7.4 Hydrogen-4 — ⁴H

Canonical ID:

```text
MAT:0001:ISO:H-4
```

Composition:

```text
protons: 1
neutrons: 3
```

Relative atomic mass:

$$
4.02643(11)\ \mathrm u
$$

Evaluated lifetime scale:

$$
t_{1/2}
\approx
139\pm10\ \mathrm{ys}
$$

where:

$$
1\ \mathrm{ys}
=
10^{-24}\ \mathrm{s}
$$

Principal evaluated decay:

```text
neutron emission
```

into tritium.

Status:

```text
EXTREMELY-SHORT-LIVED
```

---

## 7.5 Hydrogen-5 — ⁵H

Canonical ID:

```text
MAT:0001:ISO:H-5
```

Composition:

```text
protons: 1
neutrons: 4
```

Relative atomic mass:

$$
5.035311(96)\ \mathrm u
$$

NUBASE2020 evaluated half-life:

$$
t_{1/2}
\approx
86\pm6\ \mathrm{ys}
$$

Principal decay classification:

```text
2-NEUTRON BREAKUP / EMISSION
```

Status:

```text
EXTREMELY-SHORT-LIVED
```

---

## 7.6 Hydrogen-6 — ⁶H

Canonical ID:

```text
MAT:0001:ISO:H-6
```

Composition:

```text
protons: 1
neutrons: 5
```

Relative atomic mass in the NIST isotope table:

$$
6.04496(27)\ \mathrm u
$$

NUBASE2020 evaluated half-life:

$$
t_{1/2}
\approx
294\pm67\ \mathrm{ys}
$$

Status:

```text
EXTREMELY-SHORT-LIVED
```

Hydrogen-6 remains an active nuclear-research subject; later measurements may refine its evaluated ground-state parameters.

MAT therefore retains:

```text
evaluation_version
measurement_source
uncertainty
```

rather than treating one historical estimate as permanent.

---

## 7.7 Hydrogen-7 — ⁷H

Canonical ID:

```text
MAT:0001:ISO:H-7
```

Composition:

```text
protons: 1
neutrons: 6
```

Relative atomic mass:

$$
7.0527(11\#)\ \mathrm u
$$

The `#` indicates estimated/evaluated character in the source mass table.

NUBASE2020 gives an extremely uncertain lifetime on the order of:

$$
652\pm558\ \mathrm{ys}
$$

Status:

```text
EXTREMELY-SHORT-LIVED
HIGH-UNCERTAINTY
```

The uncertainty is sufficiently large that MAT must not present `652 ys` as an exact physical constant.

---

# 8. Nuclear Coordinate

A useful isotope-state representation is:

$$
\Gamma_N
=
(
Z,
N,
A,
J^\pi,
t_{1/2},
Q,
D,
B
)
$$

where terms may include:

* proton number \(Z\);
* neutron number \(N\);
* mass number \(A\);
* spin/parity \(J^\pi\);
* half-life;
* reaction or decay Q-values;
* decay modes;
* binding information.

For hydrogen:

$$
Z=1
$$

remains fixed while:

$$
N=0,1,2,\ldots
$$

changes.

This provides a good demonstration of why:

```text
chemical-element identity
```

and:

```text
nuclear-state distance
```

are different concepts.

Two isotopes can be chemically closely related while having dramatically different nuclear stability.

---

# 9. Tritium Decay-Energy Branch

Tritium provides MAT's first practical radioactive-energy child object.

Canonical branch:

```text
MAT:0001:ISO:H-3
    ↓
energy.decay.*
```

Reaction:

$$
{}^3H
\rightarrow
{}^3He
+
e^-
+
\bar{\nu}_e
$$

Radioactive population evolves approximately as:

$$
N(t)
=
N_0e^{-\lambda t}
$$

where:

$$
\lambda
=
\frac{\ln2}{t_{1/2}}
$$

and activity is:

$$
A(t)=\lambda N(t)
$$

For a fixed decay-energy distribution and suitable system definition, decay power likewise decreases exponentially with population.

MAT must distinguish:

```text
total decay energy
```

from:

```text
recoverable electrical energy
```

and:

```text
conversion efficiency
```

because they are not equal.

Possible conversion relationships include:

```text
beta particle
→ semiconductor charge generation
→ electricity
```

```text
beta particle
→ radioluminescent material
→ light
```

and:

```text
decay energy
→ heat
→ thermoelectric conversion
```

These are separate process/application relationships rather than intrinsic definitions of tritium itself.

---

# 10. Fusion Relationship Branch

Hydrogen isotopes participate in nuclear fusion reactions.

A major technologically studied channel is:

$$
{}^2H+{}^3H
\rightarrow
{}^4He+n
$$

with total reaction energy approximately:

$$
17.6\ \mathrm{MeV}
$$

distributed predominantly between:

```text
neutron: approximately 14.1 MeV
helium-4 nucleus: approximately 3.5 MeV
```

This is an **induced nuclear transformation**.

It must remain separate from spontaneous tritium radioactive decay.

Canonical relationship:

```text
MAT:0001:ISO:H-2
FUSES-WITH
MAT:0001:ISO:H-3
```

producing:

```text
MAT:0002:ISO:He-4
+
neutron
```

under appropriate fusion conditions.

MAT must not describe this as an ordinary chemical reaction.

---

# 11. Atomic Quantum Structure

Hydrogen is the simplest neutral atom and provides a fundamental quantum-mechanical benchmark.

The nonrelativistic Coulomb model gives approximately:

$$
E_n
=
-\frac{13.6\ \mathrm{eV}}{n^2}
$$

for the idealized hydrogenic level sequence.

This is an approximation to the full measured hydrogen spectrum.

Higher-precision treatment requires effects including:

* reduced nuclear mass;
* relativistic corrections;
* fine structure;
* Lamb shift;
* hyperfine interactions;
* external fields.

---

## 11.1 Ground State

Ground electronic configuration:

$$
1s^1
$$

Term:

$$
{}^2S_{1/2}
$$

For the ideal nonrelativistic 1s state, the electron probability density is spherically symmetric about the nucleus.

This is the correct meaning of the spherical ground-state geometry.

It does **not** mean the electron is a classical sphere orbiting the proton.

---

# 12. Selected Excitation Energies

NIST atomic collision/spectroscopic data list approximate excitation energies including:

| Transition | Excitation Energy |
| ---------- | ----------------: |
| 1s → 2p    |        10.1988 eV |
| 1s → 3p    |        12.0875 eV |
| 1s → 4p    |        12.7485 eV |
| 1s → 5p    |        13.0545 eV |
| 1s → 6p    |        13.2207 eV |

The sequence approaches the ground-state ionization threshold.

Causali E may represent this exploratorily as:

```text
starting state:
H(1s)

intervention:
energy input

possible outcomes:
excited H
ionized H
other coupled states
```

but each actual transition remains governed by quantum mechanics and selection rules.

---

# 13. Quantum-State Fields

Applicable MAT fields include:

```text
principal quantum number
orbital angular momentum
magnetic quantum number
electron spin
nuclear spin
total angular momentum
hyperfine quantum state
wavefunction
probability density
energy level
transition probability
selection rule
lifetime
coherence
decoherence
field response
tunnelling
```

Not every field has one single value for "hydrogen."

Values belong to a specified state.

---

# 14. Hydrogen Hyperfine Transition

The ground-state hyperfine interaction of atomic protium produces the famous 21-cm transition.

Measured unperturbed transition frequency:

$$
\nu_H
=
1\,420\,405\,751.768\ \mathrm{Hz}
$$

or:

$$
1420.405751768\ \mathrm{MHz}
$$

Historically measured uncertainty in the cited precision measurement:

$$
\approx2\times10^{-3}\ \mathrm{Hz}
$$

at one standard deviation.

Canonical spectral ID:

```text
MAT:0001:SPEC:HF:001
```

This is:

```text
A hyperfine transition frequency of atomic hydrogen
```

not:

```text
THE frequency of hydrogen
```

---

# 15. Electronic Spectrum

Hydrogen has many atomic spectral transitions.

Important examples include the Lyman and Balmer series.

Representative wavelengths include approximately:

```text
Lyman-alpha ≈ 121.6 nm
H-alpha      ≈ 656.3 nm
H-beta       ≈ 486.1 nm
```

Exact component wavelengths depend on:

* isotope;
* fine structure;
* hyperfine structure;
* measurement convention;
* environmental perturbations.

Therefore MAT stores individual spectral lines rather than one master scalar wavelength.

The general hydrogen spectral object is:

$$
\boldsymbol{\nu}_H
=
\{
\nu_1,
\nu_2,
\dots,
\nu_n
\}
$$

where every member has a mechanism tag.

---

# 16. Frequency Mechanisms

For hydrogen, relevant frequency classes may include:

```text
electronic transitions
fine structure
hyperfine transitions
H2 rotational transitions
H2 vibrational transitions
Raman transitions
molecular electronic transitions
plasma oscillations
magnetic resonance
nuclear magnetic resonance
acoustic/macroscopic resonances
```

Each is physically different.

MAT therefore prohibits the unsupported compression:

$$
\nu_H=\text{one universal frequency}
$$

---

# 17. Molecular Hydrogen — H₂

Canonical molecular child:

```text
MAT:0001:MOL:H2
```

Molecular formation:

$$
2H
\rightarrow
H_2
$$

does not imply that the molecule behaves like two isolated atomic-H records.

It is an emergent molecular state with its own:

* bond;
* rotational states;
* vibrational states;
* electronic states;
* nuclear-spin isomers;
* thermodynamics.

---

# 18. H₂ Ground Electronic State

Ground molecular electronic state:

$$
X\,{}^1\Sigma_g^+
$$

Selected NIST/Huber-Herzberg spectroscopic constants include approximately:

$$
\omega_e
=
4401.21\ \mathrm{cm^{-1}}
$$

$$
B_e
=
60.8530\ \mathrm{cm^{-1}}
$$

and equilibrium internuclear distance:

$$
r_e
=
0.74144\ \text{\AA}
$$

These quantities describe different aspects of the molecule:

```text
r_e
→ equilibrium nuclear geometry

ω_e
→ vibrational spectroscopic constant

B_e
→ rotational spectroscopic constant
```

They must not be collapsed into one frequency or one geometry metric.

---

# 19. Ortho- and Para-Hydrogen

Molecular hydrogen branches into nuclear-spin isomers.

Canonical children:

```text
MAT:0001:MOL:H2:ORTHO
MAT:0001:MOL:H2:PARA
```

Normal hydrogen at ordinary room-temperature preparation is approximately:

```text
75% ortho-H2
25% para-H2
```

while equilibrium hydrogen near 20 K becomes overwhelmingly parahydrogen.

This means:

$$
\boxed{
H_2\neq\text{one unique quantum/thermodynamic state}
}
$$

Nuclear-spin composition affects thermodynamic properties and must therefore remain part of state identity where relevant.

---

# 20. Phase Branch

Molecular hydrogen can exist in ordinary macroscopic phases including:

```text
H2 gas
H2 liquid
H2 solid
```

and in additional dense/high-pressure regimes under extreme conditions.

MAT also distinguishes:

```text
atomic H gas
molecular H2 gas
ionized H plasma
dense molecular hydrogen
high-pressure atomic/metallic candidate states
```

because they do not share identical properties.

---

# 21. Normal Boiling Point

For **equilibrium hydrogen**, the 2026 NIST compilation recommends a normal boiling point close to:

$$
20.271\ \mathrm K
$$

at the standard atmospheric pressure convention used for the normal boiling point.

The same NIST compilation distinguishes this from normal and orthohydrogen values.

Therefore the property must be stored as:

```yaml
material_state: equilibrium-H2
property: thermal.normal-boiling-point
value: 20.271
unit: K
```

rather than simply:

```text
hydrogen boiling point = 20.271 K
```

without identifying spin composition.

---

# 22. Record-State Principle

Hydrogen demonstrates the core MAT rule:

$$
\boxed{
\text{element}
\neq
\text{isotope}
\neq
\text{atom state}
\neq
\text{molecule}
\neq
\text{phase}
\neq
\text{material state}
}
$$

All may be related to:

```text
MAT:0001
```

while remaining separate data objects.

---

# 23. Visual Placeholders — Initial

```markdown
<!-- MAT-VISUAL: V01 -->
<!-- ASSET-ID: MAT:0001:FIG:V01:001 -->
<!-- DESCRIPTION: Physical manifestation of molecular hydrogen -->

<!-- MAT-VISUAL: V02 -->
<!-- ASSET-ID: MAT:0001:FIG:V02:001 -->
<!-- DESCRIPTION: Conventional element / atomic representation -->

<!-- MAT-VISUAL: V04 -->
<!-- ASSET-ID: MAT:0001:FIG:V04:001 -->
<!-- DESCRIPTION: Hydrogen 1s probability density -->

<!-- MAT-VISUAL: V05 -->
<!-- ASSET-ID: MAT:0001:FIG:V05:001 -->
<!-- DESCRIPTION: Hydrogen isotope map 1H through 7H -->

<!-- MAT-VISUAL: V06 -->
<!-- ASSET-ID: MAT:0001:GRAPH:V06:001 -->
<!-- DESCRIPTION: Mechanism-resolved Hydrogen spectral fingerprint -->
```

---

# 24. Core Governing Principles

```yaml
governed_by:
  atomic_identity:
    - MAT-QM-010
    - MAT-QM-011

  ionization:
    - MAT-QM-001
    - MAT-QM-006
    - MAT-QM-016

  spectral_transitions:
    - MAT-QM-001
    - MAT-QM-006
    - MAT-QM-016
    - MAT-QM-017
    - MAT-PHYS-016

  hyperfine:
    - MAT-QM-019
    - MAT-QM-023

  radioactive_decay:
    - MAT-NUC-006
    - MAT-NUC-007
    - MAT-NUC-008
    - MAT-MATH-007
    - MAT-MATH-014

  fusion:
    - MAT-NUC-004
    - MAT-NUC-016
    - MAT-NUC-017
    - MAT-NUC-020
    - MAT-NUC-021
    - MAT-NUC-022

  molecular_structure:
    - MAT-QM-026
    - MAT-CHEM-022
    - MAT-CHEM-026
```

---

# 25. Evidence Summary

```yaml
identity:
  evidence_type: REPLICATED
  confidence: A

isotope_masses:
  evidence_type: REPLICATED
  confidence: A

short_lived_isotope_lifetimes:
  evidence_type: MEASURED
  confidence: B
  note: "Large uncertainty for several neutron-rich hydrogen states."

tritium_decay:
  evidence_type: REPLICATED
  confidence: A

atomic_spectrum:
  evidence_type: REPLICATED
  confidence: A

H2_spectroscopic_constants:
  evidence_type: REPLICATED
  confidence: A

extreme_high_pressure_states:
  evidence_type: MIXED
  confidence: VARIABLE
```

---

# 26. Migration Status

Legacy source:

```text
G0001 — Hydrogen.md
```

Current migration:

```text
CORE-IDENTITY-MIGRATED
ISOTOPE-BRANCH-MIGRATED
QUANTUM-CORE-MIGRATED
SPECTRAL-CORE-MIGRATED
MOLECULAR-CORE-MIGRATED
THERMAL-CORE-IN-PROGRESS
```

Still to migrate:

```text
complete ionic/plasma branch
chemistry
organic context
inorganic context
biological context
materials interactions
hydrogen storage
processes
environment matrix
energy conversion
time
scale
safety
applications
relationships
unconventional overlays
visual manifest
calculations
experiments
sources
people/intellectual lineage
```

Do not mark:

```text
MIGRATED
```

yet.

---

# 27. Revision History

| Version | Status     | Change                                         |
| ------- | ---------- | ---------------------------------------------- |
| 1.0.0   | RESEARCHED | Initial MAT restructuring of the Hydrogen core |

The quantitative core above is grounded in current-accessible NIST data: the NIST ASD v5.12 gives the ground configuration/term and `13.598434599702 eV` ionization energy; NIST's isotope table gives the atomic-weight interval and masses through ⁷H; NIST's Chemistry WebBook gives the H₂ ground-state spectroscopic constants; and the 2026 NIST boiling-point compilation explicitly distinguishes equilibrium H₂, normal H₂ and ortho-H₂. ([NIST][2])

The 21-cm number is also worth storing with its full provenance rather than rounded to `1420 MHz`: the NBS/NIST precision measurement reported `1,420,405,751.768 Hz`. ([NIST][3])

---

---

# 28. Ionisation and Plasma Branch

Hydrogen changes physical regime dramatically as ionisation increases.

A simplified progression is:

$$
H_2
\rightarrow
2H
\rightarrow
H^+ + e^-
$$

but real plasmas may contain mixtures of:

```text
H2
H2+
H3+
H
H+
H-
electrons
excited H
excited H2
```

depending on:

* temperature;
* pressure;
* electron energy distribution;
* radiation;
* electric field;
* RF/microwave excitation;
* residence time;
* surface interactions.

Canonical state families:

```text
MAT:0001:MOL:H2
MAT:0001:ION:H2+
MAT:0001:ION:H3+
MAT:0001:ATOM:H
MAT:0001:ION:H+1
MAT:0001:ION:H-1
MAT:0001:PLASMA:H
```

---

## 28.1 Charged-Particle Dynamics

For a charged particle:

$$
\mathbf F
=
q(
\mathbf E+
\mathbf v\times\mathbf B
)
$$

becomes directly relevant.

This activates relationships with:

* electric acceleration;
* magnetic deflection;
* plasma confinement;
* plasma waves;
* RF heating;
* microwave heating;
* magnetohydrodynamics;
* fusion plasmas.

These relationships do not apply in the same way to neutral molecular H₂.

---

## 28.2 Plasma State Is Not a Single State

A hydrogen plasma requires additional descriptors:

```yaml
electron_temperature:
ion_temperature:
neutral_temperature:
electron_density:
ion_density:
neutral_density:
degree_of_ionization:
pressure:
electric_field:
magnetic_field:
frequency:
species_distribution:
confinement:
time:
```

Therefore:

$$
H_{\rm plasma}
$$

is a state family, not one fixed material property.

---

# 29. Chemical Relationship Classes

Hydrogen participates in several chemically distinct relationship classes.

---

## 29.1 Covalent Hydrogen

Examples include:

```text
C-H
N-H
O-H
S-H
Si-H
B-H
```

Bond properties depend on molecular environment.

MAT must not assign one universal:

```text
H-X bond energy
```

without specifying \(X\), molecular state and dissociation process.

---

## 29.2 Ionic Hydrides

Hydrogen may exist formally as hydride:

$$
H^-
$$

in compounds such as:

```text
NaH
KH
CaH2
MgH2
```

The isolated atomic hydride ion and hydrogen inside a crystalline hydride are related but not identical physical states.

---

## 29.3 Covalent Hydrides

Examples include:

```text
CH4
NH3
H2O
H2S
SiH4
boranes
```

Each compound becomes its own linked MAT node.

Hydrogen's parent element record stores the relationship rather than duplicating every compound property.

---

## 29.4 Interstitial and Metallic Hydrogen

Atomic hydrogen can occupy interstitial positions within some metallic lattices.

Possible states include:

```text
dissolved interstitial H
trapped H
hydride phase
surface H
grain-boundary-associated H
defect-associated H
```

These must be distinguished because their mechanical and transport effects can differ greatly.

---

## 29.5 Surface Adsorption

Molecular hydrogen may interact with a surface through adsorption.

A common process sequence is:

$$
H_2(g)
\rightarrow
H_2({\rm ads})
$$

and, where dissociative adsorption occurs:

$$
H_2
\rightarrow
2H_{\rm ads}
$$

The outcome depends on:

* surface material;
* crystallographic face;
* defects;
* temperature;
* pressure;
* coverage;
* catalyst state.

---

## 29.6 Absorption

Hydrogen can also enter a bulk host.

MAT distinguishes:

```text
ADSORPTION
```

from:

```text
ABSORPTION
```

and:

```text
CHEMICAL HYDRIDE FORMATION
```

These are different storage/material mechanisms.

---

## 29.7 Proton Transfer

Hydrogen chemistry frequently involves proton-transfer processes.

A generic acid-base form is:

$$
HA+B
\rightleftharpoons
A^-+BH^+
$$

Actual proton transfer in solution is mediated by the molecular/solvent environment rather than by an isolated free proton moving through empty space.

---

## 29.8 Hydrogen Bonding

Hydrogen participates in directional intermolecular or intramolecular interactions such as:

$$
O-H\cdots O
$$

and:

$$
N-H\cdots O
$$

Hydrogen bonding strongly influences:

* water;
* proteins;
* nucleic acids;
* molecular crystals;
* polymers;
* solvents.

Hydrogen bonding is not the same physical interaction as an ordinary covalent H-X bond.

---

# 30. Organic Context

Context classification:

```text
context.organic
```

Hydrogen has extensive relationships with carbon-based chemistry.

Major classes include:

* hydrocarbons;
* alcohols;
* aldehydes;
* ketones;
* carboxylic acids;
* amines;
* amino acids;
* carbohydrates;
* lipids;
* proteins;
* nucleic acids;
* polymers.

Primary element relationships include:

```text
H ↔ C
H ↔ O
H ↔ N
H ↔ S
H ↔ P
```

These relationships do not mean elemental atomic hydrogen itself has all biological or organic properties of those compounds.

---

# 31. Inorganic Context

Context:

```text
context.inorganic
```

Important families include:

* water;
* mineral acids;
* bases involving proton transfer;
* ionic hydrides;
* covalent hydrides;
* metallic hydrides;
* ammonia;
* hydrogen sulfide;
* silanes;
* boranes;
* complex hydrides.

Example graph:

```text
MAT:0001 Hydrogen
+
MAT:0008 Oxygen
        ↓
COMPOUND NODE
        ↓
H2O
```

Compound properties belong primarily to the compound record.

---

# 32. Biological Context

Context:

```text
context.biological
```

Hydrogen participates in biological systems through:

* water;
* proton-transfer chemistry;
* acid-base regulation;
* proton gradients;
* hydrogen bonding;
* biomolecular structure;
* redox chemistry;
* metabolic energy transfer.

The relevant hydrogen state may be:

```text
covalently bound H
proton-transfer state
water-associated H
hydrogen-bonded H
biomolecular H
```

rather than isolated neutral atomic hydrogen.

Scale must therefore remain explicit.

---

# 33. Hydrogen as a Material Modifier

At ordinary ambient conditions hydrogen is not a conventional structural engineering solid.

However, hydrogen can substantially alter other materials.

Important processes include:

```text
surface adsorption
dissociative adsorption
bulk absorption
diffusion
trapping
hydride formation
phase change
embrittlement
permeation
desorption
```

A host-material interaction may be represented:

$$
M+
H
\rightarrow
M(H)
$$

where \(M(H)\) denotes a hydrogen-containing state of the host rather than necessarily a unique chemical compound.

---

# 34. Hydrogen Diffusion

A simple continuum approximation may use Fick's law:

$$
\mathbf J_H
=
-D_H\nabla C_H
$$

and:

$$
\frac{\partial C_H}{\partial t}
=
D_H\nabla^2C_H
$$

under suitable assumptions.

In real solids:

$$
D_H
=
F(
T,
\text{phase},
\text{defects},
\text{traps},
\text{stress},
\text{composition}
)
$$

so one universal diffusion coefficient is not valid.

---

# 35. Hydrogen Embrittlement

Canonical relationship:

```text
MAT:0001
AFFECTS-MECHANICAL-BEHAVIOUR-OF
HOST MATERIAL
```

Hydrogen exposure can reduce useful mechanical performance in susceptible materials through mechanisms involving hydrogen transport, trapping, microstructure and stress.

Possible observed effects include:

* loss of ductility;
* reduced fracture resistance;
* accelerated fatigue crack growth;
* hydrogen-assisted cracking;
* degradation under sustained stress.

Hydrogen embrittlement is **not** encoded as:

```text
hydrogen.embrittlement = true
```

for every metal.

Instead:

$$
HE
=
F(
M,
S,
T,
P_H,
C_H,
\sigma,
\dot\epsilon,
t,
\text{microstructure},
\text{history}
)
$$

where:

* \(M\) = host material;
* \(S\) = material state;
* \(P_H\) = hydrogen pressure or chemical potential;
* \(C_H\) = hydrogen concentration;
* \(\sigma\) = stress;
* \(\dot\epsilon\) = strain rate;
* \(t\) = exposure time.

---

## 35.1 Embrittlement Data Object

```yaml
host_material_id:
hydrogen_state:
hydrogen_pressure:
hydrogen_concentration:
temperature:
stress_state:
strain_rate:
microstructure:
exposure_time:
fracture_metric:
fatigue_metric:
result:
source:
```

This is a **relationship measurement**, not an intrinsic elemental constant.

---

# 36. Hydrogen Storage Relationship Layer

Hydrogen storage is divided into major mechanism families.

```text
PHYSICAL STORAGE
MATERIALS-BASED STORAGE
CHEMICAL-CARRIER STORAGE
```

---

## 36.1 Compressed Gas

Canonical state:

```text
H2(g), elevated pressure
```

Relevant properties:

* pressure;
* temperature;
* vessel volume;
* hydrogen mass;
* density;
* permeation;
* vessel material;
* cycling;
* safety.

Current practical systems may use very high pressures, including vehicle systems around the 700-bar class.

---

## 36.2 Liquid Hydrogen

Canonical state:

```text
H2(l), cryogenic
```

Important variables:

* temperature;
* pressure;
* ortho/para composition;
* density;
* boil-off;
* heat leak;
* insulation;
* storage duration.

Liquid hydrogen storage is not equivalent to compressed ambient-temperature gas storage.

---

## 36.3 Cryo-Compressed Hydrogen

Combines:

```text
low temperature
+
elevated pressure
```

to increase stored density.

The state must retain both variables.

---

## 36.4 Metal Hydrides

Examples of important relationship families include:

```text
H-Mg
H-Ti
H-La-Ni systems
H-complex hydrides
```

A simplified relationship may be:

$$
M+xH_2
\rightleftharpoons
MH_{2x}
$$

but actual stoichiometry and phase behavior are material-specific.

Important metrics:

```text
gravimetric capacity
volumetric capacity
absorption pressure
desorption pressure
temperature
reaction enthalpy
reaction kinetics
cycle life
hysteresis
impurities
```

---

## 36.5 Palladium Relationship

Palladium is an important example of hydrogen uptake into a metallic lattice.

Canonical relationship class:

```text
ABSORBS-HYDROGEN
```

Relevant variables:

* pressure;
* temperature;
* H/Pd ratio;
* phase;
* diffusion;
* lattice expansion;
* cycling history.

---

## 36.6 Catalytic Metals

Metals such as nickel and platinum-group materials may catalyse hydrogen reactions.

Canonical relationship:

```text
CATALYSES-HYDROGEN-REACTION
```

This is different from:

```text
STORES-HYDROGEN
```

even if both functions occur in some systems.

---

## 36.7 Carbon and Porous Hosts

Porous materials may store molecular hydrogen through adsorption.

Examples of research classes include:

* activated carbons;
* porous carbons;
* metal-organic frameworks;
* other high-surface-area sorbents.

Important variables include:

* surface area;
* pore volume;
* pore-size distribution;
* binding energy;
* temperature;
* pressure.

---

## 36.8 Boron and Complex Hydrides

Boron-containing compounds appear in chemical/complex-hydride storage families.

MAT represents:

```text
element relationship
```

separately from:

```text
specific storage compound
```

so storage capacity is not falsely assigned directly to elemental boron or hydrogen.

---

# 37. Storage State Function

Hydrogen-storage performance is generally:

$$
S_H
=
F(
M,
C,
X,
T,
P,
t,
\text{cycle},
\text{geometry}
)
$$

where:

* \(M\) = storage material/system;
* \(C\) = composition;
* \(X\) = structure;
* \(T\) = temperature;
* \(P\) = pressure;
* \(t\) = time;
* `cycle` = cycling history.

This means storage capacity without conditions is scientifically incomplete.

---

# 38. Process Routes

Hydrogen participates in many process families.

---

## 38.1 Thermal

Examples:

$$
H_2
\xrightarrow{\Delta T}
2H
$$

at sufficient thermal excitation.

At still higher energy:

$$
H
\rightarrow
H^+ + e^-
$$

becomes possible.

The actual populations are determined by thermodynamic and kinetic conditions.

---

## 38.2 Cryogenic

$$
H_2(g)
\rightarrow
H_2(l)
\rightarrow
H_2(s)
$$

with ortho/para conversion also relevant to cryogenic thermodynamics.

---

## 38.3 Electrolysis

Generic water electrolysis:

$$
2H_2O
\rightarrow
2H_2+O_2
$$

driven by electrical energy through an electrochemical system.

MAT distinguishes:

```text
electrical energy input
electrochemical device
feed material
hydrogen product
oxygen coproduct
efficiency
```

---

## 38.4 Fuel-Cell Conversion

A hydrogen fuel-cell process may convert:

```text
chemical free energy
→
electrical output
+
heat
```

The simplified overall reaction for hydrogen and oxygen is:

$$
2H_2+O_2
\rightarrow
2H_2O
$$

Actual performance depends on cell chemistry, temperature, catalysts and operating conditions.

---

## 38.5 Photonic

Photons may:

* excite H;
* excite H₂;
* dissociate H₂;
* ionise H/H₂;

when energy and selection conditions permit.

---

## 38.6 Plasma

A simplified progression:

$$
H_2
\rightarrow
H
\rightarrow
H^++e^-
$$

may occur in discharge/plasma systems.

Actual plasma chemistry is more complex.

---

## 38.7 Catalytic

Surface process:

$$
H_2
\rightarrow
2H_{\rm ads}
$$

may be catalysed by suitable surfaces.

The reverse process:

$$
2H_{\rm ads}
\rightarrow
H_2
$$

may also occur.

---

## 38.8 High Pressure

High pressure changes:

* intermolecular spacing;
* phase stability;
* molecular orientation;
* bonding;
* electronic behavior.

High-pressure hydrogen therefore requires dedicated phase/state records.

---

## 38.9 Nuclear

Nuclear processes include:

* D-D fusion;
* D-T fusion;
* proton reactions;
* neutron interactions;
* tritium decay.

These are not chemical processing routes.

---

# 39. Environment Matrix

| Environment        | Important Hydrogen Response                              |
| ------------------ | -------------------------------------------------------- |
| Vacuum             | desorption, free atomic/molecular behavior               |
| Cryogenic          | liquid/solid states, ortho/para equilibrium              |
| High temperature   | dissociation and increasing ionisation                   |
| High pressure      | dense phases and altered electronic structure            |
| Electric field     | Stark response; charged-particle acceleration            |
| Magnetic field     | Zeeman/hyperfine/spin/plasma response                    |
| RF / microwave     | state-dependent excitation and plasma heating            |
| Optical            | excitation, dissociation, ionisation                     |
| Plasma confinement | charged-particle transport and fusion relevance          |
| Radiation          | excitation, ionisation and possible nuclear interactions |
| Microgravity       | changed macroscopic fluid behavior                       |
| Metal host         | absorption, diffusion, trapping, hydride formation       |
| Porous host        | adsorption                                               |
| Biological         | proton-transfer and hydrogen-bond networks               |

Environment effects must be linked to the specific hydrogen state.

---

# 40. Frequency / Field Response Engine

A field-response input should contain:

$$
I=
(
\nu,
A,
\phi,
\theta,
T,
P,
t,
S
)
$$

where:

* \(\nu\) = frequency;
* \(A\) = field amplitude;
* \(\phi\) = phase;
* \(\theta\) = orientation;
* \(T\) = temperature;
* \(P\) = pressure;
* \(t\) = duration;
* \(S\) = hydrogen state.

Response:

$$
R_H
=
F(I)
$$

This is more physically meaningful than asking for:

```text
the frequency of hydrogen
```

without specifying the mechanism.

---

# 41. Causali E Hydrogen Test Case

Hydrogen provides a useful controlled example for Causali E.

Starting state:

$$
B=H_2
$$

Possible interventions:

$$
A=
\{
T,
P,
h\nu,
\mathbf E,
\mathbf B,
\text{catalyst},
\text{surface}
\}
$$

Candidate outcomes might include:

$$
C_1=H_2^*
$$

$$
C_2=2H
$$

$$
C_3=H^++e^-+H
$$

$$
C_4=H_{\rm ads}
$$

$$
C_5=H_{\rm host}
$$

$$
C_6=MH_x
$$

$$
C_7=H_{\rm plasma}
$$

The scientifically safer general form is:

$$
C_i
=
F(
S_0,
A,
B,
E,
t
)
$$

rather than assuming a single universal output.

All generated outcomes remain subject to:

```text
quantum mechanics
thermodynamics
kinetics
conservation
material constraints
evidence
```

---

# 42. Energy Input / Output Matrix

| Input               | Possible Hydrogen-Related Output                 |
| ------------------- | ------------------------------------------------ |
| electrical          | chemical H₂ through electrolysis                 |
| chemical H₂         | heat through combustion/reaction                 |
| chemical H₂         | electrical energy through fuel-cell conversion   |
| D/T nuclear states  | fusion products and nuclear energy               |
| radioactive tritium | beta decay products and heat                     |
| optical             | excited, dissociated or ionised states           |
| RF / microwave      | plasma excitation/heating                        |
| electric field      | charged-particle acceleration                    |
| magnetic field      | charged-particle trajectory/spin response        |
| thermal             | excitation, dissociation and eventual ionisation |

System efficiency must be recorded separately from theoretical energy availability.

---

# 43. Chemical Energy

Hydrogen possesses high specific chemical energy when reacted with an oxidant.

For comparison purposes, hydrogen's lower heating value is approximately:

$$
120\ \mathrm{MJ\,kg^{-1}}
$$

but its low volumetric density creates storage challenges.

The value belongs to a defined chemical reaction and energy convention.

It is not a generic intrinsic "energy stored inside an isolated H atom."

---

# 44. Time Dependence

Hydrogen contains many distinct characteristic times.

---

## 44.1 Electronic Lifetime

$$
\tau_{\rm electronic}
$$

for excited atomic/molecular states.

---

## 44.2 Molecular Collision and Reaction Time

$$
\tau_{\rm chemical}
$$

depending on:

* temperature;
* pressure;
* concentrations;
* mechanism.

---

## 44.3 Diffusion Time

A characteristic diffusion scale may behave approximately as:

$$
t_D
\sim
\frac{L^2}{D}
$$

for appropriate simple diffusion geometries.

---

## 44.4 Tritium Radioactive Clock

$$
t_{1/2}
\approx
12.32\ {\rm y}
$$

---

## 44.5 Material-Degradation Clock

Hydrogen exposure may alter materials gradually over:

```text
seconds
hours
days
cycles
years
```

depending on system and conditions.

Therefore:

$$
MAT:0001
=
MAT:0001(t)
$$

for state-dependent properties.

---

# 45. Scale Dependence

Hydrogen demonstrates MAT's multiscale architecture particularly clearly.

```text
NUCLEAR
→ isotope stability, decay, fusion

ATOMIC
→ ionisation, spin, spectrum

MOLECULAR
→ H2 bonding, vibration, rotation

NANOSCALE
→ adsorption, surface diffusion

MICROSCALE
→ trapping, defects, microstructure interaction

BULK HOST
→ permeation, hydride formation, embrittlement

PLASMA
→ collective charged-particle behavior

BIOLOGICAL
→ proton transfer, water and hydrogen bonding

INDUSTRIAL
→ production, storage, transport and conversion
```

A model valid at one scale must not automatically be transferred to another.

---

# 46. Safety

Hydrogen is not inherently toxic in the conventional chemical-toxicity sense, but hydrogen systems can present substantial physical hazards.

Major safety classes include:

```text
FLAMMABLE GAS
IGNITION HAZARD
PRESSURIZED GAS
CRYOGENIC HAZARD
OXYGEN-DISPLACEMENT / ASPHYXIATION HAZARD
MATERIAL-COMPATIBILITY HAZARD
NEARLY INVISIBLE FLAME
LEAK / PERMEATION HAZARD
```

---

## 46.1 Fire and Ignition

Hydrogen forms flammable mixtures with air over a broad concentration range and has relatively low ignition-energy requirements.

Safe systems therefore require appropriate:

* ventilation;
* leak detection;
* ignition control;
* flame detection;
* pressure relief;
* engineering design.

---

## 46.2 Flame Visibility

Hydrogen flames can be difficult to see.

Specialized flame detection may therefore be required in industrial systems.

---

## 46.3 High Pressure

Compressed hydrogen requires pressure-rated:

* vessels;
* valves;
* piping;
* fittings;
* regulators;
* seals.

Stored mechanical energy in the pressure system represents a hazard independently of combustion.

---

## 46.4 Cryogenic Hydrogen

Liquid hydrogen introduces additional hazards including:

* extreme cold;
* material thermal contraction;
* cold burns;
* boil-off;
* pressure rise;
* condensation/freezing of atmospheric gases;
* cryogenic material compatibility.

---

## 46.5 Material Compatibility

Hydrogen can affect mechanical behavior in susceptible alloys.

Material selection must therefore consider:

```text
hydrogen compatibility
pressure
temperature
stress
fatigue
fracture
permeation
cycling
```

---

## 46.6 Tritium

Tritium introduces a separate:

```text
RADIOACTIVE
```

safety class.

Its radiological controls must remain separate from ordinary H₂ fuel safety.

---

# 47. Application Domains

Hydrogen-related applications include:

```text
chemical feedstock
ammonia production
methanol production
petroleum processing
reduction chemistry
fuel cells
combustion
energy storage
rocket propulsion
metallurgy
semiconductor processing
plasma processing
cryogenics
fusion research
isotope tracing
neutron-related research
spectroscopy
atomic physics
astronomy
```

Each application must identify the relevant state.

For example:

```text
H2
```

may be relevant to fuel or chemical processing while:

```text
3H
```

may be relevant to isotope/fusion/radiotracer applications.

---

# 48. Sustainability and Environmental Context

Hydrogen is an **energy carrier and chemical feedstock**, not automatically a primary energy source.

Environmental impact depends strongly on production pathway.

Relevant MAT process fields therefore include:

```text
feedstock
energy source
electricity source
production efficiency
water requirement
carbon emissions
methane leakage
carbon capture
transport
storage losses
hydrogen leakage
end use
```

The same chemical product:

$$
H_2
$$

can therefore have very different lifecycle impacts.

---

# 49. Storage and Transport Sustainability

Hydrogen's high specific energy but low ambient volumetric density means storage and transport may require:

* compression;
* liquefaction;
* conversion into a carrier;
* adsorption;
* hydride formation.

Energy consumed by storage and delivery must therefore be included in full-system analysis.

---

# 50. Evidence Hierarchy for Hydrogen

## High-confidence measured/evaluated core

```text
atomic number
atomic/isotopic masses
stable isotope identity
tritium decay
ionisation energy
electron affinity
atomic spectra
hyperfine structure
H2 spectroscopy
ordinary phase behaviour
conventional chemistry
```

---

## Established theoretical frameworks

```text
quantum atomic structure
molecular quantum mechanics
thermodynamics
chemical kinetics
diffusion
electromagnetism
plasma physics
nuclear reaction physics
```

---

## Computational / active research

Examples include:

```text
novel hydrogen storage materials
new high-pressure phases
new catalysts
nanostructured adsorption systems
extreme-state predictions
```

These must retain model and validation status.

---

# 51. Historical and Unconventional Overlays

The legacy Genesis record intentionally preserved non-mainstream frequency schemes such as historical/community "Rife" or Russell-related mappings.

MAT does **not** delete them from project history.

However they must reside outside the measured scientific core.

Recommended future structure:

```text
relationships/
└── historical-overlays/
    ├── 0001-Hydrogen-H-Russell-Overlay.yaml
    └── 0001-Hydrogen-H-Rife-Overlay.yaml
```

Classification:

```yaml
scientific_status: HISTORICAL_OR_UNVERIFIED
evidence_type: UNVERIFIED
core_property: false
```

They may be compared against measured spectra, but they must never overwrite:

```text
MEASURED SPECTRAL DATA
```

unless reproducible evidence establishes a valid physical relationship.

---

# 52. Primary Hydrogen Relationship Vector

Hydrogen's strongest relationship groups include:

## Direct Chemistry

```text
O
C
N
S
halogens
many metals
```

---

## Storage / Transport

```text
Mg
Pd
Ni
B
C
porous hosts
complex hydrides
```

The relationship mechanism must be labelled.

---

## Nuclear

```text
1H
2H
3H
He isotopes
neutrons
```

---

## Semiconductor / Materials Processing

Hydrogen may interact with:

```text
Si
C
Ga-containing semiconductors
metals
oxides
```

through processes including:

* passivation;
* plasma treatment;
* etching chemistry;
* defect interaction;
* surface chemistry.

---

## Biological

Major graph neighbors include:

```text
C
O
N
P
S
```

through biomolecular chemistry.

---

## Plasma / MHD

These relationships are often driven primarily by:

```text
charge state
electron density
fields
temperature
confinement
```

rather than proximity to one neighboring element.

---

# 53. Hydrogen State Cloud

The parent node should eventually render conceptually as:

$$
\boxed{
H,\quad Z=1
}
$$

surrounded by state classes:

$$
\{
{}^1H,
{}^2H,
{}^3H,
{}^4H,
{}^5H,
{}^6H,
{}^7H,
H^-,
H,
H^+,
H_2,
HD,
D_2,
HT,
DT,
T_2,
H_2^*,
H_{\rm ads},
H_{\rm host},
MH_x,
H_{\rm plasma},
\dots
\}
$$

This is one of the defining examples of why MAT is an atlas rather than a conventional periodic table.

---

# 54. Updated Migration Status

```yaml
legacy_record: "G0001"

migration:
  identity: COMPLETE
  isotopes: CORE-COMPLETE
  nuclear: CORE-COMPLETE
  quantum: CORE-COMPLETE
  spectroscopy: CORE-COMPLETE
  molecular_hydrogen: CORE-COMPLETE
  ionization: COMPLETE
  plasma: CORE-COMPLETE
  chemistry: CORE-COMPLETE
  organic_context: COMPLETE
  inorganic_context: COMPLETE
  biological_context: COMPLETE
  materials_interactions: CORE-COMPLETE
  embrittlement: CORE-COMPLETE
  storage: CORE-COMPLETE
  processes: CORE-COMPLETE
  environments: CORE-COMPLETE
  energy: CORE-COMPLETE
  time: COMPLETE
  scale: COMPLETE
  safety: CORE-COMPLETE
  sustainability: CORE-COMPLETE
  applications: CORE-COMPLETE

remaining:
  - individual compound records
  - detailed thermophysical property tables
  - phase datasets
  - plasma species tables
  - people/intellectual-lineage
  - generated assets
  - final audit
```

---

# 55. Current Record Status

```yaml
status: "RESEARCHED"
completeness: "RESEARCHED"
migration_status: "MIGRATED-PENDING-ARCHIVE"
schema_validation_status: "PASS"
scientific_validation_status: "CORE-VALIDATED"
validation:
  schema: "PASS"
  identifiers: "PASS"
  filenames: "PASS"
  evidence_architecture: "PASS"
  source_registry: "PASS"
  forward_references: "PASS"
  scientific_core: "VALIDATED"
  exhaustive_content: false
visuals:
  specification: "LOCKED"
  generated: false
```

Do not yet mark the legacy `G0001` file archived or fully migrated.

The storage and safety wording above follows DOE's current split between compressed/cryogenic storage and material-based approaches such as metal hydrides, chemical storage materials and sorbents. DOE also explicitly treats hydrogen embrittlement/material compatibility, leak detection, ventilation and flame detection as important engineering concerns. ([The Department of Energy's Energy.gov][1])

NIST's hydrogen thermophysical work also supports keeping **parahydrogen, normal hydrogen and orthohydrogen as distinguishable thermodynamic models**, instead of putting every H₂ property into one generic table. ([NIST][2])
