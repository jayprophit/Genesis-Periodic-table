# 0011 — Sodium — Na

```yaml
mat_id: MAT:0011
record_name: Sodium
symbol: Na
record_class: CHEMICAL_ELEMENT
atomic_number: 11
parent_id: MAT:0000
schema_version: 1.0.0
record_version: 1.0.0
status: RESEARCHED-IN-PROGRESS
legacy_id: G0011
legacy_name: Sodium

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
```

> **Imported research — review pending.** Recovered from [41.txt, line 7](../../archive/source-intake/mat-42-52/41.txt). Source assertions of validation are historical statements, not independent test results. See the intake ledger for duplicates and unresolved references.

# 0. Record Navigation

Previous:

```text
MAT:0010
0010-Neon-Ne
```

Current:

```text
MAT:0011
0011-Sodium-Na
```

---

# 1. Elemental Identity

| Property               | Value          |
| ---------------------- | -------------- |
| Element                | Sodium         |
| Symbol                 | Na             |
| Atomic number          | 11             |
| Protons                | 11             |
| Neutral electrons      | 11             |
| Period                 | 3              |
| Group                  | 1              |
| Block                  | s              |
| Ground configuration   | [Ne]3s¹        |
| Ground level           | ²S₁/₂          |
| Standard atomic weight | 22.98976928(2) |
| Stable natural isotope | ²³Na           |
| Common oxidation state | +1             |
| State near 20 °C       | solid metal    |

Primary sources:

```text
SRC-000214
SRC-000215
SRC-000216
SRC-000217
```

---

# 2. Period-3 Shell Restart

Neon closes the second period:

$$
Ne=[He]2s^22p^6
$$

Sodium begins the third:

$$
Na=[Ne]3s^1
$$

Thus:

$$
\boxed{
2p^6\rightarrow3s^1
}
$$

This is MAT's first explicit:

```text
CLOSED-SHELL
→
NEW-VALENCE-SHELL
```

transition.

---

# 3. Historical Genesis Cycle → MAT Periodic Repetition

The legacy record correctly compared:

$$
Li=[He]2s^1
$$

with:

$$
Na=[Ne]3s^1
$$

MAT formalizes this as:

```text
SAME OUTER-ELECTRON COUNT
+
DIFFERENT PRINCIPAL SHELL
```

or:

$$
\boxed{
\text{periodic repetition}
+
\text{radial expansion}
}
$$

It is not exact physical repetition.

---

# 4. Lithium–Sodium Periodic Relationship

Resolved elemental relationship:

```text
MAT:0003
↔
MAT:0011
```

Shared:

```text
group_1: true
outer_s_electrons: 1
common_cation_charge: +1
metallic_elemental_state: true
```

Different:

```text
principal_valence_shell:
  Li: 2
  Na: 3

ionic_radius:
  identical: false

metallic_radius:
  identical: false

ionization_energy:
  identical: false

host_material_compatibility:
  identical: false
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

# 5. Atomic Ground State

Neutral Sodium:

$$
[Ne]3s^1
$$

Ground level:

$$
{}^2S_{1/2}
$$

Canonical object:

```text
MAT:0011:ATOM:Na
```

The single \(3s\) valence electron makes neutral atomic Sodium open-shell.

---

# 6. First Ionisation

$$
Na\rightarrow Na^++e^-
$$

NIST ASD:

$$
E_{I1}
=
5.13907696\pm0.00000025\ {\rm eV}
$$

Canonical ion:

```text
MAT:0011:ION:Na+1
```

---

# 7. Closed-Shell Sodium Ion

Removing the \(3s\) electron gives:

$$
Na^+
=
[Ne]
$$

Therefore:

$$
\boxed{
Na^+
\text{ is isoelectronic with }
Ne
}
$$

Electron count:

$$
10
$$

But:

$$
Z_{Na}=11
$$

while:

$$
Z_{Ne}=10
$$

so the systems remain physically distinct.

---

# 8. First-to-Second Ionisation Jump

First ionization:

$$
5.13907696\ {\rm eV}
$$

Second ionization:

$$
47.28636\ {\rm eV}
$$

Ratio:

$$
\frac{47.28636}{5.13907696}
\approx9.20
$$

The large jump reflects the transition from removing:

```text
OUTER 3s VALENCE ELECTRON
```

to disrupting:

```text
NEON-LIKE CLOSED SHELL
```

This is one of MAT's cleanest electronic-shell energy signatures.

---

# 9. Ionisation Ladder

NIST ASD:

$$
E_{I1}=5.13907696\ {\rm eV}
$$

$$
E_{I2}=47.28636\ {\rm eV}
$$

$$
E_{I3}=[71.6200]\ {\rm eV}
$$

$$
E_{I4}=[98.936]\ {\rm eV}
$$

$$
E_{I5}=138.404\ {\rm eV}
$$

$$
E_{I6}=[172.23]\ {\rm eV}
$$

$$
E_{I7}=[208.504]\ {\rm eV}
$$

$$
E_{I8}=[264.192]\ {\rm eV}
$$

$$
E_{I9}=(299.856)\ {\rm eV}
$$

$$
E_{I10}=(1465.0992)\ {\rm eV}
$$

$$
E_{I11}=(1648.702285)\ {\rm eV}
$$

Source evaluation brackets/parentheses are retained.

---

# 10. Dominant Chemical State

Ordinary Sodium chemistry overwhelmingly favours:

$$
Na^+
$$

rather than:

$$
Na^{2+}
$$

because the first ionization removes a single outer electron and the next begins disrupting the closed shell.

This makes Na⁺ an important MAT reference for:

```text
MOBILE-MONOVALENT-CATION
```

---

# 11. Natural Isotope Simplicity

Natural Sodium is conventionally monoisotopic:

$$
{}^{23}Na
$$

NIST composition:

$$
1
$$

Relative atomic mass:

$$
22.9897692820(19)\ u
$$

Canonical isotope:

```text
MAT:0011:ISO:Na-23
```

---

# 12. Sodium-23

Nucleus:

```text
Z = 11
N = 12
A = 23
```

Status:

```text
STABLE
```

Spin/parity:

$$
\frac32^+
$$

Nuclear spin:

$$
I=\frac32
$$

Therefore naturally occurring Sodium is intrinsically NMR-active.

---

# 13. Sodium-23 NMR

Because:

$$
I=\frac32
$$

²³Na is a quadrupolar NMR nucleus.

Relevant domains:

```text
solution chemistry
electrolytes
glasses
ceramics
solid electrolytes
battery electrodes
biological tissues
ion transport
```

Unlike ¹³C studies, natural Sodium does not require rare-isotope enrichment simply to obtain a spin-active nucleus.

Required rule:

```text
23Na NMR FREQUENCY
=
MAGNETIC-FIELD-DEPENDENT
```

There is no universal Sodium NMR frequency.

---

# 14. Sodium-22

Canonical child:

```text
MAT:0011:ISO:Na-22
```

NUBASE2020 evaluated half-life (SRC-000008 / SRC-000223):

$$
t_{1/2}
\approx2.6018\ {\rm y}
$$

Principal daughter:

```text
MAT:0010:ISO:Ne-22
```

Decay family:

```text
BETA-PLUS
ELECTRON-CAPTURE
```

Important photon:

$$
1274.537\ {\rm keV}
$$

with positron annihilation radiation also present following β⁺ decay.

Primary roles:

```text
calibration
tracing
nuclear metrology
research
```

---

# 15. Decay Energy ≠ Practical Battery

²²Na contains usable nuclear decay energy.

That does not automatically make it a useful general-purpose power source.

Required engineering variables would include:

```text
isotope availability
specific activity
conversion efficiency
radiation shielding
thermal management
radiation damage
system mass
cost
regulation
```

Therefore:

$$
\boxed{
\text{available decay energy}
\neq
\text{practical energy-storage device}
}
$$

The historical energy-harvesting idea is retained as a conceptual comparison only.

---

# 16. Sodium-24 Activation Branch

Stable:

$$
{}^{23}Na
$$

can undergo neutron capture:

$$
{}^{23}Na+n
\rightarrow
{}^{24}Na
$$

²⁴Na then beta-decays principally to:

$$
{}^{24}Mg
$$

Reference half-life:

$$
14.9560\pm0.0015\ {\rm h}
$$

The earlier 14.997 ± 0.012 h evaluation is retained as historical provenance, rather than used as the working NUBASE value. The [individual Na-24 record](data/isotopes/0011-Sodium-Na-Isotope-24-Sodium-24.yaml) also retains the separately attributed DDEP value; the two evaluations are not averaged.

Strong gamma lines include approximately:

$$
1368.630\ {\rm keV}
$$

and:

$$
2754.049\ {\rm keV}
$$

This establishes a future resolved nuclear edge:

```text
Na
→
Mg
```

once Magnesium child records exist.

---

# 17. Nuclear versus Chemical Sodium

Compare:

Chemical:

$$
Na\rightarrow Na^++e^-
$$

Nuclear:

$$
{}^{24}Na\rightarrow{}^{24}Mg+\beta^-+\bar\nu_e+\gamma
$$

These are categorically different transformations.

Required MAT rule:

```text
IONIZATION
!=
NUCLEAR TRANSMUTATION
```

---

# 18. Isotope Architecture

Current NIST atomic-mass table spans:

$$
{}^{18}Na
$$

through:

$$
{}^{37}Na
$$

within its present dataset.

This includes:

```text
proton-rich states
radioactive bound nuclides
stable 23Na
neutron-rich states
estimated masses
particle-unbound states
```

Exact binding/lifetime semantics belong in the full isotope-child pass.

---

# 19. Sodium D Lines

The most recognizable neutral-Sodium transitions are:

$$
588.995095\ {\rm nm}
$$

and:

$$
589.5924\ {\rm nm}
$$

They arise from:

$$
3s\,{}^2S_{1/2}
\rightarrow
3p\,{}^2P^\circ_{3/2}
$$

and:

$$
3s\,{}^2S_{1/2}
\rightarrow
3p\,{}^2P^\circ_{1/2}
$$

respectively.

---

# 20. Fine Structure Matters

The familiar yellow Sodium feature is a doublet rather than a single electronic line.

Thus:

$$
\boxed{
\text{apparently one colour}
\neq
\text{one atomic transition}
}
$$

Spin–orbit splitting creates distinct upper \(3p\) levels.

---

# 21. Excitation to Light

General path:

$$
Na+E
\rightarrow
Na^*
$$

followed by:

$$
Na^*
\rightarrow
Na+h\nu
$$

Possible excitation inputs:

```text
thermal
flame
electron collision
electrical discharge
photon absorption
plasma
```

This produces the strong Sodium spectral signature.

---

# 22. Flame Emission

Volatile/excited Sodium species can generate intense yellow emission in a flame.

This provides a classic analytical relationship:

```text
CHEMICAL SAMPLE
→
THERMAL EXCITATION
→
ATOMIC SPECTRUM
→
ELEMENT IDENTIFICATION
```

Flame colour is not a bulk ground-state property of solid metallic Sodium or sodium salts.

---

# 23. No Universal Sodium Frequency

Mechanisms must remain separated:

```text
Na I electronic spectrum
Na II spectrum
fine-structure splitting
23Na NMR
NaCl lattice phonons
battery-ion hopping
biological Na+ transport
plasma collision frequencies
metallic electron response
```

Therefore no valid scalar:

```text
sodium_frequency
```

exists.

---

# 24. Metallic Sodium

At ordinary conditions elemental Sodium is a soft metallic solid.

Representative properties:

Density:

$$
\rho\approx0.97\ {\rm g\,cm^{-3}}
$$

Melting point:

$$
97.794^\circ{\rm C}
$$

Boiling point:

$$
882.940^\circ{\rm C}
$$

Elemental-metal properties must remain distinct from Na⁺ compounds.

---

# 25. Liquid Sodium

Above its melting point:

$$
Na(s)\rightarrow Na(l)
$$

Liquid Sodium retains metallic electronic conduction while gaining fluid transport.

This enables:

```text
heat transfer
electromagnetic pumping
conductive-fluid experiments
MHD research
specialized reactor coolant systems
```

---

# 26. Magnetohydrodynamic State

For conducting liquid metal, one important force-density term is:

$$
\mathbf f=\mathbf J\times\mathbf B
$$

The behavior depends on:

```text
electrical conductivity
fluid velocity
magnetic field
current density
geometry
temperature
surface chemistry
```

Thus:

$$
\boxed{
Na(l)
\neq
NaCl(s)
\neq
Na^+_{\rm biological}
}
$$

even though all contain Sodium.

---

# 27. Sodium–Potassium Future Relationship

Future:

```text
MAT:0011
↔
MAT:0019
```

Relevant material family:

```text
NaK
```

Alloying can produce compositions liquid over wider temperature ranges than either pure elemental metal.

This creates:

$$
\boxed{
\text{composition}
\rightarrow
\text{melting-range engineering}
}
$$

---

# 28. Sodium and Water

Simplified reaction:

$$
2Na+2H_2O
\rightarrow
2NaOH+H_2
$$

This is an energetic redox reaction.

Relevant outputs include:

```text
Na+ formation
OH- chemistry
H2 generation
heat release
phase change
possible ignition
```

It is a material-safety relationship, not merely a stoichiometric equation.

---

# 29. Causali E — Multi-Output Water Reaction

Initial state:

$$
B=Na^0
$$

Intervention:

$$
A=H_2O
$$

Candidate outputs include:

$$
C_1=Na^+
$$

$$
C_2=OH^-
$$

$$
C_3=H_2
$$

$$
C_4=\text{thermal-energy redistribution}
$$

Thus one intervention can produce multiple chemically and energetically distinct state changes.

---

# 30. Chlorine Relationship

Future parent:

```text
MAT:0017
```

Relationship:

```text
MAT:0011
↔
MAT:0017
```

Important material:

```text
MAT:CMP:NaCl
```

Idealized electron-transfer picture:

$$
Na\rightarrow Na^++e^-
$$

$$
Cl+e^-\rightarrow Cl^-
$$

Solid NaCl then forms an extended ionic lattice.

Important qualification:

```text
IONIC BOND MODEL
!=
LITERAL LOCALIZED CLASSICAL ELECTRON TRANSFER AT ALL TIMES
```

The crystal electronic structure is collective.

---

# 31. Oxygen Relationship

Resolved parent:

```text
MAT:0008
↔
MAT:0011
```

Important Sodium–Oxygen chemical states include:

```text
Na2O
Na2O2
NaO2
NaOH
Na2CO3
NaHCO3
sodium silicates
sodium phosphates
```

These must remain independent material/species children.

---

# 32. Oxide / Peroxide / Superoxide Separation

Sodium provides a useful extension of the Oxygen species registry:

Oxide:

$$
Na_2O
$$

Peroxide:

$$
Na_2O_2
$$

Superoxide:

$$
NaO_2
$$

The Oxygen electronic species differ:

```text
O2-
O2^2-
O2^-
```

respectively.

Thus:

$$
\boxed{
\text{same two elements}
+
\text{different stoichiometry}
=
\text{different electronic species}
}
$$

---

# 33. Carbon Relationship

Resolved parent:

```text
MAT:0006
↔
MAT:0011
```

Important materials:

```text
Na2CO3
NaHCO3
sodium carboxylates
hard-carbon battery hosts
```

This forms a high-connectivity:

```text
Na-C-O
```

chemical/material network.

---

# 34. Fluorine Relationship

Resolved parent:

```text
MAT:0009
↔
MAT:0011
```

Important material:

$$
NaF
$$

Comparison:

$$
LiF
\leftrightarrow
NaF
$$

provides:

```text
same anion
same nominal cation charge
different cation size
different lattice energetics
different transport/material properties
```

---

# 35. Nitrogen Relationship

Resolved parent:

```text
MAT:0007
↔
MAT:0011
```

Important species include:

```text
NaNO3
NaNO2
NaN3
NaNH2
```

Core rule:

$$
\boxed{
\text{same Na}^+
\neq
\text{same compound behaviour}
}
$$

The partner ion and structure remain decisive.

---

# 36. Sodium-Ion Energy Storage

Na⁺ is MAT's second major mobile alkali-metal battery ion after Li⁺.

Current principal material families include:

```text
hard-carbon anodes
layered-oxide cathodes
polyanionic cathodes
Prussian-blue / Prussian-white analogues
liquid electrolytes
solid electrolytes
```

Battery behavior depends on:

```text
host structure
defects
surface state
electrolyte
interface
temperature
state of charge
cycling history
```

---

# 37. Lithium-Ion versus Sodium-Ion

Both ions have:

$$
q=+1
$$

but their size and energetics differ.

Therefore:

$$
\boxed{
\text{same charge}
+
\text{different ion size}
\rightarrow
\text{different host compatibility}
}
$$

Possible consequences include:

```text
different diffusion barriers
different interlayer spacing requirements
different host strain
different preferred phases
different interfacial chemistry
```

---

# 38. Graphite versus Hard Carbon

A major Li/Na comparison is:

```text
Li+ + graphite
```

versus:

```text
Na+ + hard carbon
```

Conventional graphite does not provide the same broadly useful Sodium-storage pathway found for Lithium under ordinary commercial Li-ion conditions.

Hard carbon therefore occupies a central Sodium-ion anode role.

Important hard-carbon variables include:

```text
interlayer spacing
micropore structure
closed-pore volume
defects
surface functional groups
heteroatoms
particle morphology
electrolyte
SEI
```

---

# 39. Layered Sodium Oxides

Important structural families include:

```text
P2
O3
other stacking / transition variants
```

Performance can depend on:

```text
Na site geometry
transition-metal substitution
oxygen stacking
phase transitions
air stability
vacancies
redox mechanism
```

Thus:

$$
\boxed{
\text{crystal geometry}
\rightarrow
\text{ion mobility and phase behaviour}
}
$$

---

# 40. Prussian-Blue-Type Frameworks

Open-framework Sodium cathodes provide cavities and channels for Na⁺.

Relevant state variables include:

```text
framework vacancies
coordinated water
interstitial water
transition-metal composition
Na occupancy
particle size
defect distribution
```

This reinforces:

$$
\boxed{
\text{void topology}
\rightarrow
\text{ion accessibility}
}
$$

---

# 41. Current Technology Context

By 2026 Sodium-ion batteries have moved beyond purely laboratory research into early commercial/mass-production contexts.

MAT does not encode this as:

```text
SODIUM-ION HAS REPLACED LITHIUM-ION
```

Instead:

```text
technology_state: COMMERCIALIZING
application_fit: CONTEXT-DEPENDENT
```

Lithium-ion and Sodium-ion remain distinct engineering systems with different trade-offs.

---

# 42. Biological Sodium

In animal physiology, Sodium functions primarily as:

$$
Na^+
$$

Key roles include:

```text
membrane potential
action potentials
secondary active transport
osmotic balance
fluid balance
muscle function
nerve signalling
```

These are ionic-system properties, not properties of metallic Na.

---

# 43. Sodium–Potassium ATPase

Canonical biological relationship:

```text
MAT:0011
↔
MAT:0019
```

A common pump stoichiometry is:

$$
3Na^+_{\rm in}
+
2K^+_{\rm out}
+
ATP
$$

leading to transport of:

$$
3Na^+
$$

outward and:

$$
2K^+
$$

inward per ATP hydrolysed.

The process is electrogenic because one net positive charge moves outward per cycle.

---

# 44. Biological Electrochemical Potential

A membrane may maintain:

$$
\Delta[Na^+]
$$

together with:

$$
\Delta V
$$

The electrochemical potential combines concentration and electric-potential terms.

This provides a rigorous conceptual connection between:

```text
biological membranes
battery electrolytes
solid ion conductors
electrochemical cells
```

without claiming the systems are mechanically identical.

---

# 45. Natural Sodium

Free elemental Sodium is not a major natural terrestrial reservoir because it is chemically reactive.

Natural Sodium occurs chiefly as ionic compounds.

Important geological/environmental reservoirs include:

```text
seawater
halite
evaporites
silicates
feldspars
clays
dissolved salts
```

Therefore:

```text
NATURAL SODIUM
!=
METALLIC Na
```

---

# 46. High-Pressure Sodium

At sufficiently high pressure Sodium departs dramatically from the ordinary nearly-free-electron metal picture.

Experiment around:

$$
\sim200\ {\rm GPa}
$$

identified an optically transparent, wide-bandgap insulating phase.

The structure is commonly described as:

```text
hP4
```

with electrons displaced toward lattice interstitial regions.

---

# 47. Electride-Type High-Pressure State

At extreme compression, core overlap pushes valence-electron density into interstitial regions.

The resulting high-pressure state can be described using an electride-like picture:

```text
atomic cores
+
interstitial localized electron density
```

Thus:

$$
\boxed{
\text{compression of a metal}
\not\Rightarrow
\text{monotonically more metallic behaviour}
}
$$

This is one of Sodium's most important counterintuitive condensed-matter results.

---

# 48. Pressure as Electronic-Structure Control

Initial state:

```text
ordinary metallic Na
```

Intervention:

```text
extreme compression
```

Candidate state:

```text
transparent insulating dense Na
```

Same element.

Different structure.

Different electron localization.

Different optical/electronic properties.

Therefore:

$$
\boxed{
P
\rightarrow
\text{structure}
\rightarrow
\text{electron localization}
\rightarrow
\text{electronic phase}
}
$$

---

# 49. Sodium–Neon Isoelectronic Edge

Resolved parent elements:

```text
MAT:0010
↔
MAT:0011
```

Specific state relation:

```text
MAT:0011:ION:Na+1
↔
MAT:0010:ATOM:Ne
```

Status:

```text
RESERVED-PENDING-Na+-CHILD-FILE
```

Shared electron count:

$$
10
$$

---

# 50. Ten-Electron Series Extension

The sequence now includes:

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

with:

$$
Mg^{2+}
$$

to follow.

This lets MAT compare nuclear charge at nearly fixed electron configuration.

---

# 51. Causali E — Ionisation

Initial:

$$
B=Na
$$

Intervention:

$$
A=E
$$

Candidate:

$$
C=Na^++e^-
$$

The unusually low first ionization threshold relative to the second provides a measurable shell-boundary response.

---

# 52. Causali E — Battery Insertion

Initial host:

$$
H_0
$$

Ion:

$$
Na^+
$$

Intervention:

```text
electrochemical potential
```

Candidate:

$$
H(Na_x)
$$

Possible changed variables include:

```text
lattice parameter
electronic state
oxidation state
phase
stress
diffusion pathway
interfacial state
```

---

# 53. Causali E — Membrane Transport

Initial:

```text
Na+ concentration gradient
+
membrane potential
```

Intervention:

```text
channel opening
or
ATP-driven transport
```

Candidate outputs:

```text
ion flux
membrane-voltage change
osmotic response
secondary transport
```

This is a multi-output causal network.

---

# 54. Causali E — High Pressure

Initial:

$$
B=Na_{\rm metal}
$$

Intervention:

$$
A=P
$$

Candidate near extreme compression:

$$
C=Na_{\rm insulating/electride-like}
$$

This demonstrates:

$$
\boxed{
\text{same composition}
+
\text{different pressure}
=
\text{different electronic phase}
}
$$

---

# 55. Main Sodium Result

Sodium introduces several major MAT principles:

$$
\boxed{
\text{periodic repetition}
\neq
\text{exact physical repetition}
}
$$

$$
\boxed{
\text{same ion charge}
\neq
\text{same host compatibility}
}
$$

$$
\boxed{
\text{same element}
+
\text{different physical state}
=
\text{different field physics}
}
$$

$$
\boxed{
\text{compression}
\not\Rightarrow
\text{monotonically greater metallicity}
}
$$

and:

$$
\boxed{
\text{biological ion transport}
\text{ and }
\text{engineered electrochemistry}
\text{ share electrochemical principles}
}
$$

without being the same system.

---

# 56. Current Status

```yaml
status: RESEARCHED
migration_status: CONTENT-CORE-MIGRATED
schema_validation_status: PENDING
scientific_core: RESEARCHED
visual_specification: NOT-YET-LOCKED
visual_assets: NOT-GENERATED
```

The high-pressure branch is particularly valuable: experimentally, Sodium becomes optically transparent near **200 GPa**, with a wide-bandgap insulating hP4 phase attributed to core overlap, \(p\)-\(d\) hybridization and valence-electron density being pushed into interstitial regions. That gives MAT a direct counterexample to the naive rule “compression always makes a metal more metallic.” ([Nature][3])

The battery material branch is also current rather than historical. A January 2026 *Nature Reviews Chemistry* review treats structure, substitution, redox behavior and phase evolution in layered Sodium oxides as central design variables; a March 2026 review likewise identifies hard carbon, layered oxides, polyanionic compounds and Prussian-blue analogues among the major Sodium-ion material families. ([Nature][4])

[1]: https://physics.nist.gov/cgi-bin/Elements/elInfo.pl?context=text&element=11&utm_source=chatgpt.com "physics.nist.gov Elemental Data Index: 11 Sodium"
[2]: https://physics.nist.gov/PhysRefData/Handbook/Tables/sodiumtable3_a.htm?utm_source=chatgpt.com "Persistent Lines of Neutral Sodium ( Na I )"
[3]: https://www.nature.com/articles/nature07786?utm_source=chatgpt.com "Transparent dense sodium | Nature"
[4]: https://www.nature.com/articles/s41570-025-00795-3?utm_source=chatgpt.com "Substitution and electrochemistry in layered oxide cathode materials for sodium-ion batteries | Nature Reviews Chemistry"
[5]: https://www-nds.iaea.org/index-meeting-crp/TM_IRDFF_Dosimetry/docs/NDS-IRDFF-II.pdf?utm_source=chatgpt.com "IRDFF-II: An Updated Neutron Metrology LibraryA. Trkov,<sup>1</sup> P.J. Griffin,<sup>2</sup> S.P. Simakov,<sup>3</sup> L.R. Greenwood,<sup>4</sup> K.I. Zolotarev,<sup>5</sup> R. Capote,<sup>1</sup>"
[6]: https://pubmed.ncbi.nlm.nih.gov/30725773/?utm_source=chatgpt.com "Physiology, Sodium Potassium Pump - PubMed"

## Evaluated nuclear data and review

The [NUBASE2020 nuclear state catalogue](0011-Sodium-Na-Nuclear-Evaluation.md) provides 32 evaluated states with uncertainties, qualifiers and source-line provenance. See the [research intake and claims review](0011-Sodium-Na-Research-Intake.md) for the supplied expansion. This dated evaluation does not make the whole material record complete.
