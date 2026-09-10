# 0009 — Fluorine — F

```yaml
mat_id: MAT:0009
record_name: Fluorine
symbol: F
record_class: CHEMICAL_ELEMENT
atomic_number: 9
parent_id: MAT:0000
schema_version: 1.0.0
record_version: 1.0.0
status: RESEARCHED
legacy_id: G0009
legacy_name: Fluorine
reference_implementation:
  - MAT:0001
  - MAT:0002
  - MAT:0003
  - MAT:0004
  - MAT:0005
  - MAT:0006
  - MAT:0007
  - MAT:0008
```

# 0. Record Navigation

Previous:

```text
MAT:0008
0008-Oxygen-O
```

Current:

```text
MAT:0009
0009-Fluorine-F
```

---

# 1. Elemental Identity

| Property                           | Value           |
| ---------------------------------- | --------------- |
| Element                            | Fluorine        |
| Symbol                             | F               |
| Atomic number                      | 9               |
| Protons                            | 9               |
| Neutral electrons                  | 9               |
| Period                             | 2               |
| Group                              | 17              |
| Block                              | p               |
| Ground configuration               | 1s²2s²2p⁵       |
| Ground level                       | ²P°₃/₂          |
| Standard atomic weight             | 18.998403163(6) |
| Stable isotope                     | ¹⁹F             |
| Ordinary elemental molecular state | F₂              |
| State near 20 °C                   | gas             |
| Common compound oxidation state    | −1              |

Primary sources:

```text
SRC-000157
SRC-000158
SRC-000159
SRC-000160
SRC-000161
```

---

# 2. Second-Period Electronic Progression

The sequence now reaches:

$$
\mathrm{O}:2p^4
$$

$$
\mathrm{F}:2p^5
$$

Fluorine requires one additional electron to reach the closed-shell configuration:

$$
2p^6
$$

corresponding to the Neon-like valence shell.

Thus Fluorine becomes MAT's principal second-period example of:

```text
ONE-ELECTRON-BELOW-CLOSED-SHELL
```

---

# 3. Atomic Ground State

Neutral atomic Fluorine:

$$
1s^22s^22p^5
$$

Ground level:

$$
{}^2P^\circ_{3/2}
$$

The neutral atom is therefore open-shell.

Canonical state:

```text
MAT:0009:ATOM:F
```

---

# 4. First Ionisation

$$
F\rightarrow F^+ +e^-
$$

NIST ASD:

$$
E_{I1}
=
17.42282\pm0.00005\ {\rm eV}
$$

Canonical child:

```text
MAT:0009:ION:F+1
```

---

# 5. Ionisation Ladder

NIST ASD v5.12 gives:

$$
E_{I1}
=
17.42282\pm0.00005\ {\rm eV}
$$

$$
E_{I2}
=
34.97081\pm0.00012\ {\rm eV}
$$

$$
E_{I3}
=
[62.70798]\pm0.00025\ {\rm eV}
$$

$$
E_{I4}
=
[87.175]\pm0.017\ {\rm eV}
$$

$$
E_{I5}
=
[114.249]\pm0.006\ {\rm eV}
$$

$$
E_{I6}
=
157.16311\pm0.00025\ {\rm eV}
$$

$$
E_{I7}
=
185.1868\pm0.0006\ {\rm eV}
$$

$$
E_{I8}
=
(953.8983)\pm0.0003\ {\rm eV}
$$

$$
E_{I9}
=
(1103.1175302)\pm0.0000019\ {\rm eV}
$$

Square brackets and parentheses are retained as source evaluation qualifiers.

Canonical states:

```text
MAT:0009:ATOM:F

MAT:0009:ION:F+1
MAT:0009:ION:F+2
MAT:0009:ION:F+3
MAT:0009:ION:F+4
MAT:0009:ION:F+5
MAT:0009:ION:F+6
MAT:0009:ION:F+7
MAT:0009:ION:F+8
MAT:0009:ION:F+9
```

---

# 6. Electron Affinity

Selected NIST WebBook determination:

$$
EA(F)
=
3.401191\pm0.000026\ {\rm eV}
$$

Electron attachment:

$$
F+e^-
\rightarrow
F^-
$$

Canonical ion:

```text
MAT:0009:ION:F-1
```

The resulting electron configuration is Neon-like:

$$
1s^22s^22p^6
$$

---

# 7. Electron Affinity Versus Electronegativity

These are related but different concepts.

Electron affinity concerns a process such as:

$$
F(g)+e^-\rightarrow F^-(g)
$$

whereas electronegativity describes the tendency of an atom in a bonded environment to attract electron density.

Therefore:

$$
\boxed{
EA
\neq
\chi
}
$$

MAT stores them in separate namespaces.

---

# 8. Electronegativity

Pauling electronegativity:

$$
\chi_F=3.98
$$

Fluorine is the highest-valued element on the conventional Pauling scale.

This produces an important MAT electronic coordinate:

```text
STRONG-BOND-POLARIZATION
```

but does not mean every bond to Fluorine is purely ionic.

---

# 9. Central Fluorine Principle

The strongest functional effect of Fluorine may occur through changing another material's electronic structure.

General pattern:

$$
X
\rightarrow
X-F
$$

can change:

```text
charge distribution
bond polarity
formal oxidation state
surface energy
chemical stability
ion transport
electronic structure
molecular conformation
reaction pathway
```

Therefore:

$$
\boxed{
\text{small compositional addition}
\rightarrow
\text{large functional change}
}
$$

is a legitimate MAT design relationship.

---

# 10. Natural Isotope Simplicity

Natural Fluorine has one stable isotope:

$$
{}^{19}F
$$

Representative NIST isotopic composition:

$$
1
$$

Thus standard terrestrial Fluorine is effectively monoisotopic in the conventional atomic-weight treatment.

---

# 11. Fluorine-19

Canonical ID:

```text
MAT:0009:ISO:F-19
```

Relative atomic mass:

$$
18.99840316273(92)\ u
$$

Status:

```text
STABLE
```

Spin/parity:

$$
\frac12^+
$$

Nuclear spin:

$$
I=\frac12
$$

Natural isotopic composition:

$$
1
$$

Important applications:

```text
19F NMR
MRI/MR spectroscopy of fluorinated systems
materials characterization
reaction tracing
molecular imaging research
```

---

# 12. Fluorine-19 NMR

¹⁹F combines:

```text
spin = 1/2
natural abundance ≈ 100%
high magnetic sensitivity
wide chemical-shift range
```

This makes it an unusually useful magnetic-resonance nucleus.

MAT rule:

```text
ONE STABLE ISOTOPE
```

does not imply:

```text
LOW SPECTROSCOPIC INFORMATION
```

---

# 13. Fluorine-18

Canonical ID:

```text
MAT:0009:ISO:F-18
```

Relative atomic mass:

$$
18.00093733(50)\ u
$$

Principal decay family:

```text
BETA-PLUS
+
ELECTRON-CAPTURE
```

Daughter:

```text
MAT:0008:ISO:O-18
```

Important use:

```text
POSITRON-EMISSION-TOMOGRAPHY
```

A modern evaluated half-life is approximately:

$$
109.7\ {\rm min}
$$

Exact adopted decay constants and branch fractions belong in the isotope-child file.

---

# 14. Diagnostic Versus Power Isotope

¹⁸F releases nuclear decay energy.

However its approximately 110-minute half-life makes it unsuitable for long-duration radioisotope power.

MAT therefore separates:

```text
DECAY ENERGY          = PRESENT
MEDICAL UTILITY       = VERY HIGH
LONG-TERM POWER       = VERY LOW
LONG-TERM STORAGE     = VERY LOW
```

Core rule:

$$
\boxed{
\text{radioactive}
\neq
\text{useful radioisotope power source}
}
$$

---

# 15. Fluorine Isotope Family

The current NIST atomic-mass table spans:

$$
{}^{14}F
$$

through:

$$
{}^{31}F
$$

in its listed dataset.

Only ¹⁹F is stable.

Other entries include:

```text
proton-unbound states
beta-plus emitters
beta-minus emitters
beta-delayed neutron emitters
neutron-rich nuclei
estimated masses
```

Mass-table presence alone does not define bound-state stability.

---

# 16. Atomic Fluorine

Atomic Fluorine:

$$
2p^5
$$

contains one unpaired electron.

Therefore isolated neutral F is:

```text
OPEN-SHELL
PARAMAGNETIC
HIGHLY REACTIVE
```

But ordinary elemental Fluorine is principally molecular:

$$
F_2
$$

Thus:

$$
\boxed{
F
\neq
F_2
}
$$

---

# 17. Molecular Fluorine

Canonical molecule:

```text
MAT:0009:MOL:F2
```

Ground electronic state:

$$
X\,{}^1\Sigma_g^+
$$

Geometry:

```text
LINEAR
```

Equilibrium bond distance:

$$
r_e\approx1.412\ {\rm \AA}
$$

Representative vibrational constant:

$$
\omega_e\approx916.93\ {\rm cm^{-1}}
$$

Representative equilibrium rotational constant:

$$
B_e\approx0.8893\ {\rm cm^{-1}}
$$

---

# 18. Atomic Versus Molecular Magnetism

Atomic F:

```text
OPEN-SHELL
PARAMAGNETIC
```

Ground-state \(F_2\):

```text
CLOSED-SHELL
SINGLET
DIAMAGNETIC
```

Therefore:

$$
\boxed{
M_{F({\rm atom})}
\neq
M_{F_2({\rm molecule})}
}
$$

Again, assembly changes magnetic behavior without changing elemental identity.

---

# 19. Frequency Architecture

There is no universal Fluorine frequency.

Separate mechanisms include:

```text
F I atomic electronic transitions
F II ionic transitions
F2 molecular vibration
F2 molecular rotation
F2 electronic transitions
19F NMR
HF vibration
C-F molecular vibrations
solid fluoride phonons
plasma emission
```

Required MAT rule:

```text
NO UNIVERSAL FLUORINE FREQUENCY
```

---

# 20. F–F Bond Counterexample

RSC's representative bond-enthalpy table gives approximately:

$$
D(F-F)\sim155\ {\rm kJ\,mol^{-1}}
$$

while representative heteroatomic bond enthalpies include:

$$
H-F\sim565\ {\rm kJ\,mol^{-1}}
$$

$$
C-F\sim485\ {\rm kJ\,mol^{-1}}
$$

These are tabulated bond-enthalpy references, not universal exact dissociation energies for every molecular environment.

The important result is:

$$
\boxed{
\text{extreme reactivity}
\neq
\text{extreme reactant bond strength}
}
$$

---

# 21. Full Reaction-Energy Principle

Fluorination cannot be understood by examining only the F–F bond.

A reaction depends on:

$$
\Delta E
\sim
\sum E_{\rm bonds\ broken}
-
\sum E_{\rm bonds\ formed}
$$

plus:

```text
entropy
phase
solvation
surface energy
activation barriers
electronic-state effects
```

MAT therefore evaluates:

```text
BEFORE STATE
+
PATH
+
AFTER STATE
```

rather than assigning reactivity from one bond.

---

# 22. Physical State

Near ordinary conditions, elemental Fluorine is a very pale yellow reactive gas.

Representative RSC phase temperatures:

$$
T_m=53.48\ {\rm K}
$$

$$
T_b=85.04\ {\rm K}
$$

State path:

$$
F_2(g)
\rightarrow
F_2(l)
\rightarrow
F_2(s)
$$

Low temperature does not automatically mean chemical inertness.

---

# 23. Oxidation-State Architecture

Elemental:

$$
F_2
$$

has formal oxidation state:

$$
0
$$

In ordinary compounds Fluorine is assigned:

$$
\boxed{-1}
$$

Because Fluorine is the most electronegative conventional element, it does not take a positive oxidation state in normal compound formalism.

This makes Fluorine an unusually clean oxidation-state anchor.

---

# 24. Hydrogen Relationship

Resolved parent relationship:

```text
MAT:0001
↔
MAT:0009
```

Important compound:

```text
MAT:CMP:HF
```

Molecular HF is linear.

Important relationship classes:

```text
chemical bonding
acid-base chemistry
hydrogen bonding
mineral chemistry
surface processing
silica/glass chemistry
spectroscopy
```

HF properties remain compound-specific.

---

# 25. HF State Dependence

MAT must separate:

```text
HF(g)
anhydrous HF(l)
concentrated HF solutions
dilute aqueous fluoride/HF systems
fluoride salts
```

because:

$$
\boxed{
\text{same elemental pair}
+
\text{different environment}
=
\text{different chemistry}
}
$$

---

# 26. Silicon / Glass Relationship

Future parent relationship:

```text
MAT:0009
↔
MAT:0014
```

Target status:

```text
RESERVED-PENDING-SILICON
```

Important Si–F products include:

```text
SiF4
fluorosilicate species
surface-bound Si-F states
```

The selective reactivity of HF/fluoride chemistry with silica creates a major:

```text
CHEMISTRY
→
MATERIAL-PROCESSING
```

relationship.

---

# 27. Lithium Relationship

Resolved:

```text
MAT:0003
↔
MAT:0009
```

Important material:

```text
MAT:CMP:LiF
```

Relationship classes:

```text
ionic solid
battery interphase
molten salt
electrochemical material
optical/ceramic material
```

---

# 28. FLiBe Relationship Closure

Earlier MAT relationships contained:

```text
Li
+
Be
+
future F
```

for FLiBe-type salts.

Fluorine now resolves the parent-element triad:

```text
MAT:0003 Lithium
MAT:0004 Beryllium
MAT:0009 Fluorine
```

Representative components:

$$
LiF+BeF_2
$$

This becomes a resolved three-parent materials relationship.

Specific salt compositions and thermophysical properties remain separate material records.

---

# 29. Boron Relationship

Resolved:

```text
MAT:0005
↔
MAT:0009
```

Important species:

```text
BF3
BF4-
boron fluorides
fluoroborate families
```

BF₃:

```text
TRIGONAL-PLANAR
```

approximately:

$$
120^\circ
$$

It is a classic Lewis-acid system.

---

# 30. Carbon Relationship

Resolved:

```text
MAT:0006
↔
MAT:0009
```

Important families include:

```text
C-F bonds
fluorocarbons
fluoropolymers
fluorinated pharmaceuticals
surface fluorination
fluorinated electrolytes
```

Major material example:

$$
(-CF_2-CF_2-)_n
$$

or PTFE.

---

# 31. PTFE / Fluoropolymer Architecture

PTFE and related fluoropolymers demonstrate:

```text
strong C-F bonding
low surface energy
chemical resistance
electrical insulation
different wetting behavior
```

These are polymer/material properties.

They are not intrinsic bulk properties of elemental Fluorine.

---

# 32. Surface Fluorination

A thin fluorinated surface layer can change:

```text
wetting
adhesion
surface energy
chemical compatibility
electrical behavior
biological interaction
```

without changing most of the object's bulk composition.

Core rule:

$$
\boxed{
\text{surface chemistry}
\neq
\text{bulk chemistry}
}
$$

---

# 33. Nitrogen Relationship

Resolved:

```text
MAT:0007
↔
MAT:0009
```

Important compound:

```text
NF3
```

Applications can include electronics-manufacturing and plasma-processing chemistry.

The compound itself is not equivalent to atomic F or F₂.

---

# 34. Oxygen Relationship

Resolved:

```text
MAT:0008
↔
MAT:0009
```

Important oxygen fluorides include:

```text
OF2
O2F2
```

These provide a valuable formal-oxidation-state exception.

Because F is more electronegative than O, Oxygen can receive positive formal oxidation states in Oxygen–Fluorine compounds.

Therefore:

$$
\boxed{
O\approx-2
}
$$

is not universal.

---

# 35. Relative Electronegativity Principle

Formal oxidation assignment depends on the relative electronegativities of bonded atoms.

Thus:

```text
O-H
```

and:

```text
O-F
```

do not assign the same formal oxidation sign to Oxygen.

MAT therefore avoids element-wide oxidation-state defaults when compound context changes the assignment.

---

# 36. Semiconductor Plasma Processing

Fluorine-containing precursor families include:

```text
CF4
NF3
SF6
other fluorocarbons
```

Plasma excitation can produce reactive species including:

```text
F radicals
molecular radicals
positive ions
negative ions
excited fragments
```

General transformation:

$$
\boxed{
\text{stable precursor}
+
\text{plasma energy}
\rightarrow
\text{reactive processing state}
}
$$

---

# 37. Silicon Etching Architecture

Representative path:

```text
Si-containing surface
+
activated F chemistry
→
volatile Si-F products
→
material removal
```

The complete process depends on:

```text
precursor
plasma power
pressure
surface material
temperature
ion energy
radical flux
mask chemistry
reactor geometry
```

MAT stores this as process/environment data rather than as an intrinsic elemental property.

---

# 38. Nuclear-Processing Relationship

Future relationship:

```text
MAT:0009
↔
MAT:0092 Uranium
```

Important compound:

```text
UF6
```

Its volatility enables processing of Uranium in molecular form.

Critical distinction:

```text
FLUORINE
=
PROCESS-ENABLING CHEMISTRY
```

not:

```text
FLUORINE
=
URANIUM NUCLEAR ENERGY SOURCE
```

No operational enrichment or device parameters belong in the Fluorine element record.

---

# 39. High Oxidation-State Stabilisation

Strongly electronegative Fluorine ligands can stabilize high formal oxidation states in other elements.

Future examples include families associated with:

```text
SF6
UF6
Pt fluorides
transition-metal fluorides
```

MAT principle:

$$
\boxed{
\text{ligand identity}
\rightarrow
\text{accessible electronic/oxidation state}
}
$$

---

# 40. Noble-Gas Chemistry Preview

Future Xenon relationships include:

```text
XeF2
XeF4
XeF6
```

These demonstrate:

$$
\boxed{
\text{chemical inertness}
\neq
\text{absolute impossibility of compound formation}
}
$$

The relationship remains:

```text
RESERVED-PENDING-XENON
```

---

# 41. Coordination Geometry Generator

Fluorine participates in diverse geometries depending on the central atom.

Examples:

```text
HF   → linear
BF3  → trigonal planar
CF4  → tetrahedral
SF6  → octahedral
XeF2 → linear
XeF4 → square planar
```

Therefore:

$$
\boxed{
\text{Fluorine ligand}
\neq
\text{one universal geometry}
}
$$

Geometry emerges from the whole electronic structure.

---

# 42. Fluoride Ion

Canonical object:

```text
MAT:0009:ION:F-1
```

Electronic configuration:

$$
1s^22s^22p^6
$$

Fluoride is not merely the endpoint of electron capture.

In suitable solids it may be a mobile charge carrier.

---

# 43. Fluoride-Ion Conduction

General transport:

$$
F^-
\rightarrow
F^-
$$

between lattice sites.

Candidate material families include:

```text
alkaline-earth fluorides
rare-earth fluorides
fluorite-structure materials
mixed fluorides
fluoride solid electrolytes
```

State variables include:

```text
vacancies
interstitials
dopants
temperature
crystal phase
grain boundaries
defect concentration
```

This adds another MAT mobile-ion family:

```text
H+
Li+
O2-
F-
```

---

# 44. Battery / Electrochemical Branch

Fluorine occurs in:

```text
electrolyte salts
solid electrolytes
interphases
fluorinated solvents/additives
metal fluorides
conversion electrodes
LiF-rich surface layers
```

Strong bonding can sometimes improve stability.

But:

$$
\boxed{
\text{high stability}
\not\Rightarrow
\text{easy reversibility}
}
$$

This creates a materials-design trade-off.

---

# 45. Organic Molecular Design

Substitution of H or another group by F can change:

```text
dipole distribution
metabolic stability
conformation
lipophilicity
acidity/basicity
protein binding
reaction selectivity
```

The effect is molecular-context dependent.

Therefore:

$$
\boxed{
\text{single-atom substitution}
\rightarrow
\text{potentially large molecular-function change}
}
$$

without implying that fluorination always improves a molecule.

---

# 46. Biological State Separation

Elemental F₂:

```text
HIGHLY REACTIVE
HIGHLY HAZARDOUS
NO NORMAL BIOLOGICAL ROLE
```

Fluoride ion in minerals/biological systems:

```text
CONTEXT-DEPENDENT
DOSE-DEPENDENT
CHEMICAL-FORM-DEPENDENT
```

Organofluorines:

```text
MOLECULE-SPECIFIC
```

Therefore there is no scientifically useful scalar:

```text
BIOLOGICAL VALUE OF FLUORINE
```

---

# 47. Environmental State Separation

Elemental F₂ does not persist as a major free natural reservoir because of its reactivity.

Natural Fluorine occurs largely as fluoride-containing minerals.

Important examples:

```text
fluorite
fluorapatite
cryolite
other fluoride minerals
```

Persistence of synthetic fluorinated compounds must be evaluated compound by compound.

Elemental electronegativity does not by itself determine environmental persistence.

---

# 48. Elemental-Fluorine Production Principle

The stable natural chemical state is generally fluoride, not free F₂.

Producing F₂ therefore requires external energy.

Historical/industrial electrochemical concept:

$$
F^-
\xrightarrow{\rm electrical\ energy}
F_2
$$

Henri Moissan isolated elemental Fluorine in 1886 through electrolysis of a fluoride/HF system.

This is a clean MAT example of:

$$
\boxed{
\text{external energy}
\rightarrow
\text{less thermodynamically favoured elemental state}
}
$$

Detailed industrial operating instructions belong outside the elemental reference record.

---

# 49. Materials Compatibility

Mechanical strength alone does not predict compatibility with Fluorine environments.

Relevant variables include:

```text
surface state
passivation
temperature
pressure
F2 concentration
HF exposure
water content
material composition
time
```

Core rule:

$$
\boxed{
\text{mechanical strength}
\neq
\text{chemical compatibility}
}
$$

---

# 50. Causali E — Electron Capture

Initial state:

$$
B=F
$$

Intervention:

$$
A=e^-
$$

Candidate state:

$$
C=F^-
$$

This yields a closed-shell anion.

---

# 51. Causali E — Surface Fluorination

Initial material:

$$
S_0=M
$$

Intervention:

```text
fluorination process
```

Candidate surface:

$$
C=M-F_{\rm surface}
$$

Potential changed outputs:

```text
surface energy
wetting
chemical resistance
electronic structure
adhesion
```

Bulk composition may remain largely unchanged.

---

# 52. Causali E — Plasma Processing

Initial state:

```text
stable fluorinated precursor
+
solid surface
```

Environment:

```text
plasma
electric field
electron-energy distribution
pressure
```

Candidate reactive state:

```text
F radical / ion / excited fragment
```

Candidate material result:

```text
surface reaction
volatile product
etching
deposition modification
cleaning
```

---

# 53. Causali E — Isotope Decay

Initial state:

$$
{}^{18}F
$$

Time evolution:

$$
{}^{18}F
\rightarrow
{}^{18}O
+
e^+
+
\nu_e
$$

This provides:

```text
known parent
known daughter
measurable half-life
detectable annihilation photons
```

and therefore a particularly strong measured causal path.

---

# 54. Main Fluorine Result

Fluorine introduces a distinct MAT design principle:

$$
\boxed{
\text{an element can exert its greatest influence by changing}
\newline
\text{the electronic state of another material}
}
$$

It also reinforces:

$$
\boxed{
\text{extreme reactivity}
\neq
\text{strong elemental bond}
}
$$

and:

$$
\boxed{
\text{bond stability}
\neq
\text{reversibility}
}
$$

These three rules make Fluorine a major materials-design node.

---

# 55. Current Status

```yaml
status: "RESEARCHED"
completeness: "RESEARCHED"

migration_status: "MIGRATED-PENDING-ARCHIVE"

validation:
  schema: "PASS"
  identifiers: "PASS"
  isotope_semantics: "PASS"
  molecular_architecture: "PASS"
  spectral_architecture: "PASS"
  NMR_architecture: "PASS"
  fluoride_material_architecture: "PASS"
  mobile_ion_architecture: "PASS"
  surface_architecture: "PASS"
  polymer_architecture: "PASS"
  process_architecture: "PASS"
  oxidation_state_architecture: "PASS"
  environmental_architecture: "PASS"
  evidence_architecture: "PASS"
  scientific_core: "CORE-VALIDATED"
  exhaustive_content: false

visuals:
  specification: "LOCKED"
  generated: false
```

The F₂ molecular layer is consistent with the NIST diatomic compilation: the ground state is \(X\,^1\Sigma_g^+\); the legacy values \(r_e\approx1.412\) Å, \(\omega_e\approx916.93\ {\rm cm^{-1}}\), and \(B_e\approx0.8893\ {\rm cm^{-1}}\) are appropriate reference constants. The RSC compilation also supports the useful comparison **F–F ≈155, C–F ≈485 and H–F ≈565 kJ/mol**, plus Pauling electronegativity **3.98**. ([NIST WebBook][2])

RSC gives elemental F₂ melting at **53.48 K** and boiling at **85.04 K**. It also credits Henri Moissan with successful isolation in **1886**, following failed attempts by Davy, Gore and others; this will become important in the later People & Intellectual Lineage file. ([Periodic Table][3])

## Evaluated nuclear data and review

The [NUBASE2020 nuclear state catalogue](0009-Fluorine-F-Nuclear-Evaluation.md) provides 25 evaluated states with uncertainties, qualifiers and source-line provenance. This dated evaluation does not make the whole material record complete.
