# 0012 — Magnesium — Mg

```yaml
mat_id: MAT:0012
record_name: Magnesium
symbol: Mg
record_class: CHEMICAL_ELEMENT
atomic_number: 12
parent_id: MAT:0000
schema_version: 1.0.0
record_version: 1.0.0
status: RESEARCHED-IN-PROGRESS
legacy_id: G0012
legacy_name: Magnesium

reference_implementation:
  - MAT:0001
  - MAT:0002
  - MAT:0003
  - MAT:0004
  - MAT:0005
  - MAT:0006
  - MAT:0007
  - MAT:0008
  - MAT:0009
  - MAT:0010
  - MAT:0011
```

> **Imported research — review pending.** Recovered from [50.txt, line 7](../../archive/source-intake/mat-42-52/50.txt). Source assertions of validation are historical statements, not independent test results. See the intake ledger for duplicates and unresolved references.

# 0. Record Navigation

Previous:

```text
MAT:0011
0011-Sodium-Na
```

Current:

```text
MAT:0012
0012-Magnesium-Mg
```

---

# 1. Elemental Identity

| Property                  | Value            |
| ------------------------- | ---------------- |
| Element                   | Magnesium        |
| Symbol                    | Mg               |
| Atomic number             | 12               |
| Protons                   | 12               |
| Neutral electrons         | 12               |
| Period                    | 3                |
| Group                     | 2                |
| Block                     | s                |
| Ground configuration      | [Ne]3s²          |
| Ground level              | ¹S₀              |
| Standard atomic weight    | [24.304, 24.307] |
| Stable isotopes           | ²⁴Mg, ²⁵Mg, ²⁶Mg |
| Common oxidation state    | +2               |
| State near 20 °C          | solid metal      |
| Ambient crystal structure | hcp              |

Primary sources:

```text
SRC-000242
SRC-000243
SRC-000244
SRC-000245
```

---

# 2. Period-3 Second Position

Sodium begins period 3:

$$
Na=[Ne]3s^1
$$

Magnesium gives:

$$
Mg=[Ne]3s^2
$$

Thus:

$$
\boxed{
3s^1\rightarrow3s^2
}
$$

and completes the first subshell segment of period 3.

---

# 3. Beryllium–Magnesium Periodic Relationship

Beryllium:

$$
Be=[He]2s^2
$$

Magnesium:

$$
Mg=[Ne]3s^2
$$

Therefore:

```text
MAT:0004
↔
MAT:0012
```

is a direct group-2 periodic analogue.

Shared:

```text
outer_s_electrons: 2
common_formal_oxidation_state: +2
group: 2
```

Different:

```text
principal_shell
atomic_radius
ionic_radius
density
crystal_mechanics
toxicity
corrosion
alloying
compound_energetics
biological_role
```

Core rule:

$$
\boxed{
\text{same valence pattern}
\neq
\text{same material behaviour}
}
$$

---

# 4. Periodic Repetition Plus Radial Expansion

MAT preserves the legacy Genesis principle:

```text
Be → Mg
```

as:

$$
\boxed{
\text{periodic repetition}
+
\text{radial expansion}
}
$$

The same nominal \(ns^2\) architecture reappears at a larger principal quantum number.

It is recurrence of electronic pattern, not duplication of the complete system.

---

# 5. Atomic Ground State

Neutral Magnesium:

$$
[Ne]3s^2
$$

Ground level:

$$
{}^1S_0
$$

Therefore the isolated neutral ground-state atom is closed-shell in the two outer \(3s\) electrons.

Canonical object:

```text
MAT:0012:ATOM:Mg
```

---

# 6. First Ionisation

$$
Mg\rightarrow Mg^+ + e^-
$$

NIST ASD:

$$
E_{I1}
=
7.646236\pm0.000004\ {\rm eV}
$$

Canonical ion:

```text
MAT:0012:ION:Mg+1
```

Electronic configuration:

$$
Mg^+=[Ne]3s^1
$$

which is Sodium-like in electron count/configuration.

---

# 7. Second Ionisation

$$
Mg^+\rightarrow Mg^{2+}+e^-
$$

$$
E_{I2}
=
15.035271\pm0.000006\ {\rm eV}
$$

After removal:

$$
\boxed{
Mg^{2+}=[Ne]
}
$$

Canonical ion:

```text
MAT:0012:ION:Mg+2
```

---

# 8. Third-Ionisation Jump

Third ionisation:

$$
E_{I3}
=
80.1436\pm0.0006\ {\rm eV}
$$

Compare:

$$
15.035271
\rightarrow
80.1436\ {\rm eV}
$$

Ratio:

$$
\frac{80.1436}{15.035271}
\approx5.33
$$

The third electron must be removed from the Neon-like closed shell.

Therefore:

$$
\boxed{
Mg^{2+}
\text{ is an energetically important shell boundary}
}
$$

---

# 9. Full Ionisation Ladder

NIST ASD gives:

$$
E_{I1}
=
7.646236\pm0.000004\ {\rm eV}
$$

$$
E_{I2}
=
15.035271\pm0.000006\ {\rm eV}
$$

$$
E_{I3}
=
80.1436\pm0.0006\ {\rm eV}
$$

$$
E_{I4}
=
[109.2654]\pm0.0012\ {\rm eV}
$$

$$
E_{I5}
=
[141.33]\pm0.03\ {\rm eV}
$$

$$
E_{I6}
=
[186.76]\pm0.06\ {\rm eV}
$$

$$
E_{I7}
=
[225.02]\pm0.06\ {\rm eV}
$$

$$
E_{I8}
=
[265.924]\pm0.019\ {\rm eV}
$$

$$
E_{I9}
=
[327.99]\pm0.04\ {\rm eV}
$$

$$
E_{I10}
=
(367.489)\pm0.007\ {\rm eV}
$$

$$
E_{I11}
=
(1761.8049)\pm0.0010\ {\rm eV}
$$

$$
E_{I12}
=
(1962.663889)\pm0.000007\ {\rm eV}
$$

Source qualifiers are preserved.

---

# 10. Mg²⁺ as a Closed-Shell Ion

Mg²⁺ contains:

$$
10\ e^-
$$

and is isoelectronic with:

$$
Ne
$$

and:

$$
Na^+
$$

Thus the ten-electron series is now complete through Magnesium:

$$
N^{3-}
$$

$$
O^{2-}
$$

$$
F^-
$$

$$
Ne
$$

$$
Na^+
$$

$$
Mg^{2+}
$$

---

# 11. Isoelectronic-Series Principle

Electron count remains:

$$
10
$$

while nuclear charge rises:

$$
Z=7\rightarrow12
$$

Therefore:

$$
\boxed{
\text{same electron count}
+
\text{different nuclear charge}
\rightarrow
\text{different size, binding and chemistry}
}
$$

This is a core MAT relationship rather than a decorative periodic-table line.

---

# 12. Natural Stable Isotopes

Natural Magnesium contains:

$$
{}^{24}Mg
$$

$$
{}^{25}Mg
$$

$$
{}^{26}Mg
$$

Representative NIST compositions:

$$
{}^{24}Mg=0.7899(4)
$$

$$
{}^{25}Mg=0.1000(1)
$$

$$
{}^{26}Mg=0.1101(3)
$$

These are representative natural-composition values, not universal ratios for every geological or extraterrestrial sample.

---

# 13. Magnesium-24

Canonical ID:

```text
MAT:0012:ISO:Mg-24
```

Mass:

$$
23.985041697(14)\ u
$$

Spin/parity:

$$
0^+
$$

Status:

```text
STABLE
```

It is the dominant natural Magnesium isotope.

---

# 14. Magnesium-25

Canonical ID:

```text
MAT:0012:ISO:Mg-25
```

Mass:

$$
24.985836976(50)\ u
$$

Spin/parity:

$$
\frac52^+
$$

Status:

```text
STABLE
```

²⁵Mg is the naturally occurring Magnesium isotope with nonzero nuclear spin.

---

# 15. Magnesium-25 NMR

$$
I=\frac52
$$

Therefore ²⁵Mg is:

```text
NMR-ACTIVE
QUADRUPOLAR
```

Applications include:

```text
coordination chemistry
solid-state materials
minerals
biological Mg sites
electrolytes
battery materials
```

Required rule:

```text
25Mg NMR FREQUENCY
=
MAGNETIC-FIELD-DEPENDENT
```

---

# 16. Magnesium-26

Canonical ID:

```text
MAT:0012:ISO:Mg-26
```

Mass:

$$
25.982592968(31)\ u
$$

Spin/parity:

$$
0^+
$$

Status:

```text
STABLE
```

Important relationships include:

```text
stable-isotope geochemistry
stellar nucleosynthesis
26Al → 26Mg daughter relationships
meteorite chronology
```

The detailed isotope-geochemistry layer belongs in a later pass.

---

# 17. Radioactive Magnesium

Important shorter-lived isotopes include:

```text
27Mg
28Mg
proton-rich Mg isotopes
neutron-rich Mg isotopes
```

Legacy key branches:

$$
{}^{27}Mg
\rightarrow
{}^{27}Al+\beta^-+\bar\nu_e
$$

and:

$$
{}^{28}Mg
\rightarrow
{}^{28}Al+\beta^-+\bar\nu_e
$$

Exact modern evaluated nuclear semantics will be generated in the full isotope-child pass.

---

# 18. Nuclear versus Chemical Magnesium

Chemical transformation:

$$
Mg\rightarrow Mg^{2+}+2e^-
$$

does not change atomic number.

Nuclear decay:

$$
{}^{27}Mg\rightarrow{}^{27}Al+\beta^-
$$

does.

Therefore:

$$
\boxed{
\text{ionisation}
\neq
\text{transmutation}
}
$$

---

# 19. NIST Isotope-Mass Range

The current NIST atomic-mass table contains Magnesium entries from:

$$
{}^{19}Mg
$$

through:

$$
{}^{40}Mg
$$

within its present dataset.

Mass-table presence does not itself prove:

```text
particle-bound ground state
long lifetime
experimental precision
```

Exact status is assigned from evaluated nuclear data.

---

# 20. Ambient Metallic Structure

Elemental Magnesium adopts:

```text
HEXAGONAL-CLOSE-PACKED
HCP
```

with:

```text
space_group: P63/mmc
Pearson: hP2
```

Canonical phase:

```text
MAT:0012:PHASE:HCP-MG
```

---

# 21. HCP Geometry and Anisotropy

Representative room-temperature lattice parameters are approximately:

$$
a\approx0.3209\ {\rm nm}
$$

$$
c\approx0.5211\ {\rm nm}
$$

giving:

$$
c/a\approx1.624
$$

near the ideal HCP value:

$$
1.633
$$

The HCP structure creates direction-dependent deformation behavior.

Therefore:

$$
\boxed{
\text{metallic}
\neq
\text{mechanically isotropic}
}
$$

---

# 22. Lightweight Structural Metal

Representative density:

$$
\rho\approx1.74\ {\rm g\,cm^{-3}}
$$

Melting point:

$$
T_m\approx650^\circ C
$$

Boiling point:

$$
T_b\approx1090^\circ C
$$

Magnesium therefore occupies:

```text
LOW-DENSITY-STRUCTURAL-METAL
```

space.

---

# 23. Structural-Material Evaluation

The legacy record correctly rejected one-dimensional material ranking.

Useful engineering evaluation includes:

```text
density
specific stiffness
strength
ductility
formability
fatigue
creep
corrosion
toxicity
cost
abundance
joining
manufacturability
recyclability
temperature
environment
```

Thus:

$$
\boxed{
\text{best material}
\neq
\arg\max(\text{one property})
}
$$

---

# 24. Magnesium Alloys

Important alloy relationships include:

```text
Mg-Al
Mg-Zn
Mg-Mn
Mg-Si
Mg-rare-earth
```

Possible design outputs include:

```text
strength
castability
creep resistance
corrosion response
formability
temperature capability
```

The property belongs to the alloy state, not elemental Magnesium alone.

---

# 25. Combustion

A major oxidation route is:

$$
2Mg+O_2\rightarrow2MgO
$$

with strong heat and optical emission.

Under suitable conditions Magnesium can also react with Nitrogen:

$$
3Mg+N_2\rightarrow Mg_3N_2
$$

This gives:

$$
\boxed{
\text{chemical transformation}
\rightarrow
\text{thermal + optical output}
}
$$

---

# 26. Bright Magnesium Emission

Burning Magnesium produces intense broadband/line-rich optical radiation.

This should not be confused with the isolated-atom Mg I spectrum.

Separate:

```text
atomic Mg I lines
Mg II ionic lines
molecular/oxide emission
hot-particle continuum
plasma emission
```

---

# 27. Mg I Spectroscopic Reference

One of the strongest persistent neutral-Magnesium lines is:

$$
285.21251\ {\rm nm}
$$

corresponding to a transition from the:

$$
3s^2\,{}^1S_0
$$

ground state.

Canonical spectral object:

```text
MAT:0012:SPEC:MG-I
```

---

# 28. Mg II h/k Doublet

Important singly-ionized Magnesium resonance lines include approximately:

$$
279.55301\ {\rm nm}
$$

and:

$$
280.27056\ {\rm nm}
$$

These arise from Mg⁺ electronic transitions.

They are important in:

```text
laboratory spectroscopy
solar spectroscopy
stellar atmospheres
astrophysical plasmas
```

---

# 29. No Universal Magnesium Frequency

Mechanisms include:

```text
Mg I electronic transitions
Mg II electronic transitions
25Mg NMR
metallic collective response
MgO phonons
MgH2 vibrational modes
MgB2 phonons
superconducting energy scales
plasma frequencies
```

Therefore:

```text
NO UNIVERSAL MAGNESIUM FREQUENCY
```

---

# 30. Mg / Mg²⁺ State Separation

Metallic Magnesium:

```text
electrical conductor
structural material
alloying element
reducing agent
sacrificial electrode
```

Mg²⁺:

```text
biological ion
electrolyte species
mineral ion
ceramic constituent
battery charge carrier
coordination centre
```

Therefore:

$$
\boxed{
Mg^0
\neq
Mg^{2+}
}
$$

as functional material states.

---

# 31. Oxygen Relationship — MgO

Resolved parent edge:

```text
MAT:0008
↔
MAT:0012
```

Important child:

```text
MAT:CMP:MgO
```

MgO is a refractory ionic ceramic.

Transformation:

$$
Mg_{\rm metal}
+
O
\rightarrow
MgO_{\rm ceramic}
$$

changes:

```text
electronic structure
electrical conductivity
melting behavior
mechanics
chemical stability
```

---

# 32. Nitrogen Relationship — Mg₃N₂

Resolved parent edge:

```text
MAT:0007
↔
MAT:0012
```

Compound:

```text
MAT:CMP:Mg3N2
```

This demonstrates that stable atmospheric \(N_2\) can enter a solid compound when sufficient reaction conditions are supplied.

---

# 33. Hydrogen Relationship — MgH₂

Resolved parent edge:

```text
MAT:0001
↔
MAT:0012
```

Hydride transformation:

$$
Mg+H_2
\rightleftharpoons
MgH_2
$$

Theoretical gravimetric Hydrogen capacity is approximately:

$$
\boxed{
7.6\ {\rm wt\%}
}
$$

for ideal MgH₂. The 2026 literature still reports that theoretical capacity and identifies thermodynamic stability and slow kinetics as central practical constraints. ([ScienceDirect][3])

---

# 34. Hydrogen Storage Is a Phase Transformation

Hydrogen uptake involves more than filling empty space.

Relevant steps can include:

```text
H2 transport
surface adsorption
H2 dissociation
H diffusion
nucleation
MgH2 phase growth
interface motion
```

Therefore:

$$
\boxed{
\text{chemical storage}
=
\text{composition + structure + kinetics}
}
$$

---

# 35. MgH₂ Practical Constraint

MgH₂ combines high theoretical Hydrogen content with:

```text
strong Mg-H bonding
high thermodynamic stability
slow bulk kinetics
elevated desorption temperature
cycling/interface constraints
```

Current 2026 research remains focused on:

```text
catalysts
nanostructuring
alloying
defects
interfaces
composites
phase engineering
```

Thus theoretical capacity must not be confused with system-level practicality. ([ScienceDirect][3])

---

# 36. History as a State Variable in MgH₂

Hydrogen-storage performance can depend on:

```text
previous hydrogenation cycles
phase history
defects
particle size
oxide layers
catalyst distribution
thermal treatment
strain
```

This is directly compatible with MAT's general state function:

$$
M_i=
F(
\text{composition},
\text{structure},
\text{environment},
\text{process},
\text{time},
\text{history}
)
$$

---

# 37. Boron Relationship — MgB₂

Resolved parent edge:

```text
MAT:0005
↔
MAT:0012
```

Compound:

```text
MAT:CMP:MgB2
```

Superconducting transition:

$$
T_c\approx39-40\ {\rm K}
$$

---

# 38. Emergent Superconductivity

Elemental Mg at ordinary conditions is not a 39-K superconductor.

Elemental B at ordinary conditions is not a 39-K superconductor.

Yet:

$$
MgB_2
$$

is.

Therefore:

$$
\boxed{
A+B
\rightarrow
C
}
$$

can create a collective quantum state absent from the ordinary parent materials.

This is a central MAT emergent-material principle.

---

# 39. Boron Isotope Effect in MgB₂

MgB₂ exhibits a measurable Boron isotope effect.

Conceptual chain:

$$
\text{isotope mass}
$$

$$
\downarrow
$$

$$
\text{phonon frequency}
$$

$$
\downarrow
$$

$$
\text{electron-phonon interaction}
$$

$$
\downarrow
$$

$$
T_c
$$

Thus isotope identity can influence a macroscopic quantum phase without changing elemental composition. NIST specifically reports agreement with the measured Boron isotope effect and strong coupling of in-plane Boron phonons in MgB₂. ([NIST][4])

---

# 40. Multiple Superconducting Gaps

MgB₂ exhibits multiband/two-gap superconducting behavior.

Therefore:

$$
\boxed{
\text{one material}
\neq
\text{one superconducting gap scale}
}
$$

MAT must support:

```text
gap_1
gap_2
...
```

when evidence requires them.

NIST measurements on MgB₂ films observed two distinct coherence peaks supporting the two-gap description. ([NIST][5])

---

# 41. Magnesium-Ion Batteries

Mg²⁺ is MAT's first major naturally common divalent battery-ion branch.

Charge:

$$
q=+2
$$

Potential advantages include:

```text
two-electron redox per Mg atom
high volumetric capacity potential
resource abundance
metal-anode interest
```

Major difficulties include:

```text
strong solvation
desolvation
interfacial passivation
high charge density
slow solid-state diffusion
cathode compatibility
electrolyte stability
```

---

# 42. Li⁺ / Na⁺ / Mg²⁺ Comparison

| Carrier | Charge |
| ------- | -----: |
| Li⁺     |     +1 |
| Na⁺     |     +1 |
| Mg²⁺    |     +2 |

Mg²⁺ does not simply provide “twice as good” storage.

Its higher charge density strengthens interactions with:

```text
solvent
anion
electrode lattice
interface
defects
```

Therefore:

$$
\boxed{
\text{higher carrier charge}
\neq
\text{easier ion transport}
}
$$

---

# 43. Current Magnesium-Battery Research

By 2026 active research includes:

```text
oxide cathodes
sulfides
polyanionic hosts
Prussian-blue-type frameworks
organic electrodes
amorphous/disordered hosts
advanced electrolytes
weakly coordinating anions
Mg-alloy anodes
interface engineering
```

Status:

```text
ACTIVE-RESEARCH
NOT-MATURE-EQUIVALENT-TO-LI-ION
```

Current 2026 reviews still emphasize electrolyte limitations, interfacial chemistry and the strong-polarization/slow-diffusion problem of Mg²⁺ cathode transport. ([Nature][6])

---

# 44. Biological Magnesium

In biology the relevant state is overwhelmingly:

$$
Mg^{2+}
$$

not metallic Mg.

Major roles include:

```text
Mg-ATP
enzyme catalysis
nucleic-acid stabilization
ion transport
muscle function
nerve physiology
bone/mineral metabolism
```

---

# 45. Magnesium and ATP

A major biological energy-transfer object is better represented as:

```text
Mg-ATP
```

rather than treating ATP and Mg²⁺ as unrelated.

Mg²⁺ coordinates phosphate groups and participates in the functional ATP complexes used by many enzymes.

Thus:

$$
\boxed{
\text{biological energy molecule}
+
\text{metal ion}
\rightarrow
\text{functional reaction complex}
}
$$

---

# 46. Enzyme Network

Modern biological reviews describe Mg²⁺ as participating in hundreds of enzyme systems.

MAT does not store this as a single scalar:

```text
BIOLOGICAL IMPORTANCE = HIGH
```

Instead it maps:

```text
enzyme
binding site
ligand geometry
Mg concentration
competing ions
reaction
cell compartment
```

where available.

A recent review specifically describes Mg–ATP as the active ATP complex and Mg²⁺ involvement in **more than 600 enzymatic reactions**. ([PubMed Central (PMC)][7])

---

# 47. Chlorophyll

Magnesium occupies the central metal position of the chlorophyll macrocycle.

This establishes an especially important:

```text
Mg
+
porphyrin-like ligand architecture
→
photosynthetic pigment
```

relationship.

---

# 48. Light → Chemistry Relationship

Chlorophyll links Magnesium into:

$$
\text{photon absorption}
$$

$$
\downarrow
$$

$$
\text{electronic excitation}
$$

$$
\downarrow
$$

$$
\text{charge / energy transfer}
$$

$$
\downarrow
$$

$$
\text{chemical free-energy conversion}
$$

The Mg atom is part of the molecular architecture enabling that system, not an isolated light absorber acting alone.

---

# 49. Carbon Relationship — Grignard Chemistry

Resolved elemental relationship:

```text
MAT:0006
↔
MAT:0012
```

Organomagnesium compounds are commonly represented:

$$
RMgX
$$

These Grignard reagents are major carbon–carbon bond-forming tools.

Canonical family:

```text
MAT:CMP:GRIGNARD
```

---

# 50. Grignard Principle

The same element that is a structural metal can become part of a highly reactive molecular reagent.

Therefore:

$$
\boxed{
\text{elemental identity}
\neq
\text{chemical function}
}
$$

Chemical function emerges from:

```text
oxidation state
ligands
solvent
coordination
counterion
temperature
substrate
```

---

# 51. Geochemical Magnesium

Free elemental Magnesium is not a major natural terrestrial reservoir.

USGS identifies important sources including:

```text
dolomite
magnesite
brucite
carnallite
olivine
seawater
brines
bitterns
```

Thus:

```text
NATURAL MAGNESIUM
!=
METALLIC Mg
```

USGS currently describes Magnesium as about **2% of Earth's crust** and the **third most plentiful element dissolved in seawater**, with those mineral and brine sources explicitly listed. ([USGS][8])

---

# 52. Seawater Relationship

Magnesium is among the most abundant dissolved elements in seawater.

The relevant state is predominantly dissolved:

$$
Mg^{2+}
$$

with counterions and complex aqueous chemistry.

This creates:

```text
ocean chemistry
mineral precipitation
biological uptake
industrial extraction
```

relationships.

---

# 53. Corrosion / Sacrificial Protection

Magnesium is electropositive and can preferentially oxidize when electrically coupled to more noble structural metals.

Thus it can act as:

```text
SACRIFICIAL-ANODE
```

in selected corrosion-protection systems.

This is an intentional use of corrosion rather than an elimination of corrosion.

---

# 54. Causali E — Double Ionisation

Initial state:

$$
B=Mg
$$

Intervention:

$$
A=
\text{remove two valence electrons}
$$

Candidate:

$$
C=Mg^{2+}
$$

Retained:

```text
proton_count = 12
elemental_identity = Magnesium
```

Changed:

```text
charge
electron_configuration
radius
chemical_behavior
```

---

# 55. Causali E — Hydrogen Storage

Initial:

$$
Mg+H_2
$$

Intervention:

```text
pressure
temperature
catalyst
surface state
```

Candidate:

$$
MgH_2
$$

Changed:

```text
composition
crystal structure
volume
electronic structure
mechanics
hydrogen chemical potential
```

---

# 56. Causali E — MgB₂

Initial:

$$
Mg+B
$$

Process:

```text
compound formation
crystallization
```

Candidate:

$$
MgB_2
$$

Emergent property:

```text
SUPERCONDUCTIVITY
```

This is a direct example where output properties cannot be reconstructed by simply averaging parent-element properties.

---

# 57. Main Magnesium Result

Magnesium introduces several major MAT principles:

$$
\boxed{
\text{two valence electrons}
\rightarrow
\text{stable closed-shell }Mg^{2+}
}
$$

$$
\boxed{
\text{same }ns^2\text{ periodic pattern}
\neq
\text{same material behaviour}
}
$$

$$
\boxed{
\text{higher ionic charge}
\neq
\text{easier electrochemical transport}
}
$$

$$
\boxed{
\text{compound formation}
\rightarrow
\text{emergent properties absent from parents}
}
$$

and:

$$
\boxed{
\text{history + phase + interface}
\text{ can control reaction kinetics}
}
$$

---

# 58. Current Status

```yaml
status: RESEARCHED
migration_status: CONTENT-CORE-MIGRATED
schema_validation_status: PENDING
scientific_core: RESEARCHED
visual_specification: NOT-YET-LOCKED
visual_assets: NOT-GENERATED
```

The legacy physical/material picture survives current checking: RSC gives **1.74 g cm⁻³**, **650 °C**, and **1090 °C**, and explicitly links Magnesium with chlorophyll, Grignard reagents and lightweight alloying. ([Periodic Table][2])

The MgH₂ branch likewise remains current in 2026: ideal MgH₂ is still reported at about **7.6 wt% theoretical hydrogen capacity**, while thermodynamic stability, high release temperatures, slow kinetics, catalyst design, nanostructuring, alloying and interface engineering remain active research targets. ([ScienceDirect][3])

[1]: https://physics.nist.gov/cgi-bin/ASD/ie.pl?at_num_out=1&biblio=1&e_out=0&el_name_out=1&ion_charge_out=1&spectra=magnesium&unc_out=1&units=1 "NIST Atomic Ionization Energies Output"
[2]: https://periodic-table.rsc.org/element/12/magnesiu?utm_source=chatgpt.com "Magnesium - Element information, properties and uses | Periodic Table"
[3]: https://www.sciencedirect.com/science/article/pii/S0360319926003101?utm_source=chatgpt.com "Magnesium-based hydrogen storage materials: Design and performance optimization of single-component and multi-component systems review - ScienceDirect"
[4]: https://www.nist.gov/publications/first-principles-zone-center-theory-superconductivity-mgb2?utm_source=chatgpt.com "First-Principles Zone-Center Theory of Superconductivity in MgB2 | NIST"
[5]: https://www.nist.gov/publications/effects-two-gap-nature-microwave-conductivity-polycrystalline-mgb2-films-critical?utm_source=chatgpt.com "Effects of the two-gap nature on the microwave conductivity of polycrystalline MgB2 films with a critical temperature of 39 K | NIST"
[6]: https://www.nature.com/articles/s44359-026-00153-6?utm_source=chatgpt.com "Electrolytes for rechargeable magnesium batteries | Nature Reviews Clean Technology"
[7]: https://pmc.ncbi.nlm.nih.gov/articles/PMC11648962/?utm_source=chatgpt.com "Magnesium biology - PMC"
[8]: https://www.usgs.gov/centers/national-minerals-information-center/magnesium-compounds-statistics-and-information?utm_source=chatgpt.com "Magnesium Compounds Statistics and Information | U.S. Geological Survey"

## Evaluated nuclear data and review

The [NUBASE2020 nuclear state catalogue](0012-Magnesium-Mg-Nuclear-Evaluation.md) provides 28 evaluated states with uncertainties, qualifiers and source-line provenance. See the [research intake and claims review](0012-Magnesium-Mg-Research-Intake.md) for the supplied expansion. This dated evaluation does not make the whole material record complete.
