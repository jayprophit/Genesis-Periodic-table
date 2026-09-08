# 0008 — Oxygen — O

```yaml
mat_id: MAT:0008
record_name: Oxygen
symbol: O
record_class: CHEMICAL_ELEMENT
atomic_number: 8
parent_id: MAT:0000
schema_version: 1.0.0
record_version: 1.0.0
status: RESEARCHED
legacy_id: G0008
legacy_name: Oxygen
reference_implementation:
  - MAT:0001
  - MAT:0002
  - MAT:0003
  - MAT:0004
  - MAT:0005
  - MAT:0006
  - MAT:0007
```

# 0. Record Navigation

Previous:

```text
MAT:0007
0007-Nitrogen-N
```

Current:

```text
MAT:0008
0008-Oxygen-O
```

---

# 1. Elemental Identity

| Property                           | Value                |
| ---------------------------------- | -------------------- |
| Element                            | Oxygen               |
| Symbol                             | O                    |
| Atomic number                      | 8                    |
| Protons                            | 8                    |
| Neutral electrons                  | 8                    |
| Period                             | 2                    |
| Group                              | 16                   |
| Block                              | p                    |
| Ground configuration               | 1s²2s²2p⁴            |
| Ground level                       | ³P₂                  |
| Standard atomic weight             | [15.99903, 15.99977] |
| Stable isotopes                    | ¹⁶O, ¹⁷O, ¹⁸O        |
| Ordinary elemental molecular state | O₂                   |
| State near 20 °C, 1 atm            | gas                  |

Primary sources:

```text
SRC-000005
SRC-000126
SRC-000127
SRC-000128
SRC-000129
```

---

# 2. Electronic Progression

Nitrogen:

$$
2p^3
$$

becomes Oxygen:

$$
2p^4
$$

In the simple orbital-occupancy representation, the added electron creates the first paired p-orbital occupancy while two unpaired p electrons remain.

Neutral atomic Oxygen therefore has an open-shell ground state:

$$
{}^3P_2
$$

This atomic state must remain separate from molecular \(O_2\).

---

# 3. First Ionisation

$$
O\rightarrow O^+ +e^-
$$

NIST ASD:

$$
E_{I1}
=
13.618055\pm0.000007\ {\rm eV}
$$

Canonical state:

```text
MAT:0008:ION:O+1
```

---

# 4. Ionisation Ladder

NIST ASD currently lists:

$$
E_{I1}=13.618055\pm0.000007\ {\rm eV}
$$

$$
E_{I2}=35.12112\pm0.00006\ {\rm eV}
$$

$$
E_{I3}=[54.93554]\pm0.00012\ {\rm eV}
$$

$$
E_{I4}=77.41350\pm0.00025\ {\rm eV}
$$

$$
E_{I5}=113.8990\pm0.0005\ {\rm eV}
$$

$$
E_{I6}=[138.1189]\pm0.0021\ {\rm eV}
$$

$$
E_{I7}=(739.32697)\pm0.00015\ {\rm eV}
$$

$$
E_{I8}=(871.4099138)\pm0.0000012\ {\rm eV}
$$

Square brackets and parentheses are retained as NIST evaluation qualifiers rather than silently discarded.

Canonical states:

```text
MAT:0008:ATOM:O
MAT:0008:ION:O+1
MAT:0008:ION:O+2
MAT:0008:ION:O+3
MAT:0008:ION:O+4
MAT:0008:ION:O+5
MAT:0008:ION:O+6
MAT:0008:ION:O+7
MAT:0008:ION:O+8
```

---

# 5. Stable Isotope Family

Natural Oxygen is dominated by:

$$
{}^{16}O
$$

with smaller amounts of:

$$
{}^{17}O
$$

and:

$$
{}^{18}O
$$

Representative NIST compositions:

$$
{}^{16}O=0.99757(16)
$$

$$
{}^{17}O=0.00038(1)
$$

$$
{}^{18}O=0.00205(14)
$$

The isotope ratios vary naturally and can also be deliberately altered.

---

# 6. Oxygen-16

Canonical ID:

```text
MAT:0008:ISO:O-16
```

Relative atomic mass:

$$
15.99491461957(17)\ u
$$

Status:

```text
STABLE
```

Spin/parity:

$$
0^+
$$

Nuclear spin:

$$
I=0
$$

¹⁶O dominates ordinary terrestrial Oxygen.

---

# 7. Oxygen-17

Canonical ID:

```text
MAT:0008:ISO:O-17
```

Relative atomic mass:

$$
16.99913175650(69)\ u
$$

Status:

```text
STABLE
```

Ground-state spin:

$$
I=\frac52
$$

Therefore ¹⁷O is NMR-active.

Important functions:

```text
oxygen NMR
isotope tracing
water chemistry
oxide characterization
biological chemistry
reaction mechanisms
```

---

# 8. Oxygen-18

Canonical ID:

```text
MAT:0008:ISO:O-18
```

Relative atomic mass:

$$
17.99915961286(76)\ u
$$

Status:

```text
STABLE
```

Spin:

$$
I=0
$$

Important functions:

```text
stable isotope tracing
hydrological-cycle studies
palaeoclimate
ice-core science
oceanography
metabolism
reaction-mechanism studies
```

The isotope ratio:

$$
{}^{18}O/{}^{16}O
$$

can preserve environmental/process history.

---

# 9. Oxygen-15

Canonical future child:

```text
MAT:0008:ISO:O-15
```

¹⁵O is a short-lived positron emitter.

Principal relationship:

$$
{}^{15}O
\rightarrow
{}^{15}N+e^++\nu_e
$$

Important role:

```text
PET / SHORT-DURATION-RADIOTRACING
```

It is a diagnostic isotope, not a useful long-duration stored-energy system.

Detailed evaluated lifetime and decay data belong in the isotope-child pass.

---

# 10. Isotope Range

The current NIST mass table spans:

$$
{}^{12}O
$$

through:

$$
{}^{28}O
$$

in its present Oxygen dataset.

This does **not** mean every listed mass number is a conventional bound isotope.

MAT separately stores:

```text
measured bound nuclide
radioactive nuclide
particle-unbound resonance/state
upper/lower lifetime bound
mass extrapolation
unobserved/limit state
```

---

# 11. Atomic Oxygen

Canonical state:

```text
MAT:0008:ATOM:O
```

Atomic Oxygen is chemically much more reactive than ordinary ground-state \(O_2\).

Relevant environments include:

```text
upper atmosphere
low-Earth orbit
plasma
combustion
plasma cleaning
semiconductor processing
surface oxidation
```

Core rule:

$$
\boxed{
O\neq O_2
}
$$

NASA identifies atomic Oxygen as an important reactive species in low-Earth orbit capable of oxidizing and eroding exposed spacecraft materials.

---

# 12. Molecular Oxygen

Canonical state:

```text
MAT:0008:MOL:O2
```

Ground state:

$$
X\,{}^3\Sigma_g^-
$$

Geometry:

```text
LINEAR
```

Equilibrium bond distance for \(^{16}O_2\):

$$
r_e=1.20752\ {\rm \AA}
$$

Harmonic vibrational constant:

$$
\omega_e=1580.193\ {\rm cm^{-1}}
$$

Equilibrium rotational constant:

$$
B_e=1.4376766\ {\rm cm^{-1}}
$$

---

# 13. Molecular Orbital Magnetism

Ground-state \(O_2\) contains two unpaired electrons associated with antibonding \(\pi^*\) molecular orbitals.

Therefore ordinary molecular Oxygen is:

```text
PARAMAGNETIC
```

This must not be inferred from a simple Lewis structure alone.

MAT stores:

$$
\text{molecular-orbital occupancy}
\rightarrow
\text{spin state}
\rightarrow
\text{magnetic response}
$$

---

# 14. Atomic Versus Molecular Magnetism

Atomic Oxygen:

```text
OPEN-SHELL
```

Ground molecular \(O_2\):

```text
TRIPLET / PARAMAGNETIC
```

Many oxide solids:

```text
MATERIAL-STATE-DEPENDENT
```

Therefore no universal:

```text
oxygen_magnetism
```

scalar exists.

---

# 15. Singlet Oxygen

Important electronically excited molecular state:

```text
MAT:0008:ESTATE:O2-a1DeltaG
```

State:

$$
a\,{}^1\Delta_g
$$

NIST molecular constants place its term origin near:

$$
7918.1\ {\rm cm^{-1}}
$$

above the \(O_2\) ground state.

This is approximately a 0.98 eV electronic excitation.

Triplet \(O_2\) and singlet \(O_2\) therefore have:

```text
same nuclei
same molecular formula
different electronic spin state
different reactivity
```

---

# 16. Oxygen Electronic-State Rule

$$
O_2(X\,{}^3\Sigma_g^-)
\neq
O_2(a\,{}^1\Delta_g)
$$

Canonical distinction:

```text
MOLECULE ID
+
ELECTRONIC STATE ID
```

rather than creating an entirely different chemical element record.

---

# 17. Ozone

Canonical molecular state:

```text
MAT:0008:MOL:O3
```

Ozone has:

```text
3 Oxygen atoms
bent geometry
C2v symmetry
```

NIST experimental geometry:

$$
r_{OO}\approx1.278\ {\rm \AA}
$$

$$
\angle OOO\approx116.8^\circ
$$

Compare:

$$
O_2:\ 180^\circ
$$

with:

$$
O_3:\ 116.8^\circ
$$

Thus:

$$
\boxed{
\text{same element}
+
\text{different atom count/topology}
=
\text{different molecule}
}
$$

---

# 18. Ozone Vibrational Modes

NIST selected gas-phase fundamental modes include approximately:

Symmetric stretch:

$$
1103\ {\rm cm^{-1}}
$$

Bend:

$$
701\ {\rm cm^{-1}}
$$

Antisymmetric stretch:

$$
1042\ {\rm cm^{-1}}
$$

Therefore even one Oxygen-only molecule contains multiple independent vibrational frequencies.

---

# 19. Atmospheric Ozone Formation

Simplified photochemical architecture:

$$
O_2+h\nu
\rightarrow
2O
$$

followed by:

$$
O+O_2+M
\rightarrow
O_3+M
$$

where \(M\) removes excess energy.

MAT therefore treats:

```text
collision partner
pressure
altitude
photon field
temperature
```

as part of the reaction environment.

---

# 20. Ozone Recycling

Atmospheric Oxygen chemistry can be represented as a transformation network:

$$
O_2
\leftrightarrow
O
\leftrightarrow
O_3
$$

with photochemical and catalytic pathways.

Matter is transformed between states rather than disappearing.

---

# 21. Frequency Architecture

Oxygen does not possess one universal frequency.

Required mechanism classes include:

```text
atomic electronic
O2 rotational
O2 vibrational
O2 electronic
singlet-triplet transitions
O3 vibrational
plasma emission
17O NMR
oxide phonons
lattice vibration
surface vibration
```

This is a direct continuation of the MAT frequency rule.

---

# 22. Atmospheric Reservoir

NOAA reference dry air contains approximately:

$$
20.946\%\,O_2
$$

by volume.

Nitrogen and Oxygen therefore become MAT's two dominant atmospheric elemental/molecular nodes.

Unlike \(N_2\), however, \(O_2\) is strongly connected to oxidation and aerobic metabolism.

---

# 23. Ordinary Phase Temperatures

Representative Oxygen phase values:

Melting point:

$$
54.36\ {\rm K}
$$

Normal boiling point:

$$
90.188\ {\rm K}
$$

The cryogenic liquid is:

```text
MAT:0008:PHASE:LIQUID-O2
```

These values require pressure/state context.

---

# 24. Liquid Oxygen

Liquid Oxygen is a cryogenic molecular Oxygen phase.

Important properties/functions include:

```text
cryogenic oxidizer
paramagnetic liquid
industrial oxygen storage
laboratory magnetic demonstration
rocket-propellant oxidizer systems
```

Important MAT distinction:

```text
OXIDIZER
!=
FUEL
```

Liquid Oxygen strongly supports combustion but is not itself a conventional chemical fuel.

---

# 25. Oxygen and Combustion

Representative transformations:

Carbon:

$$
C+O_2\rightarrow CO_2
$$

Hydrogen:

$$
2H_2+O_2\rightarrow2H_2O
$$

Metals:

$$
M+O_2\rightarrow M_xO_y
$$

Oxygen therefore becomes a major:

```text
CHEMICAL-ENERGY-CONVERSION HUB
```

---

# 26. Oxidation as Electron Redistribution

Combustion is not treated as a separate mysterious phenomenon.

General MAT representation:

$$
\boxed{
\text{reactants}
+
\text{electron redistribution}
+
\text{bond rearrangement}
\rightarrow
\text{products}
+
\text{energy change}
}
$$

Oxidation state, structure and products must all be retained.

---

# 27. Hydrogen Relationship — Water

Resolved elemental relationship:

```text
MAT:0001
↔
MAT:0008
```

Important product:

```text
MAT:CMP:H2O
```

Reaction:

$$
2H_2+O_2\rightarrow2H_2O
$$

Water has an experimental gas-phase bond angle near:

$$
104.5^\circ
$$

This is an emergent molecular geometry.

---

# 28. Water as Emergent Material

Water possesses properties not attributable to elemental H or O separately.

Important classes include:

```text
hydrogen bonding
high heat capacity
solvation
surface tension
density anomaly
proton transport
multiple ice phases
biological solvent behavior
```

MAT principle:

$$
\boxed{
\text{composition}
+
\text{bonding}
+
\text{geometry}
\rightarrow
\text{emergent properties}
}
$$

---

# 29. Carbon Relationship

Resolved parent edge:

```text
MAT:0006
↔
MAT:0008
```

Major product/relationship classes:

```text
CO
CO2
carbonate
carbonyl chemistry
carboxyl chemistry
alcohols
ethers
combustion
respiration
carbon cycle
fuel cells
catalysis
```

The C–O relationship is one of MAT's highest-connectivity chemical edges.

---

# 30. Nitrogen Relationship

Resolved parent edge:

```text
MAT:0007
↔
MAT:0008
```

Important species:

```text
NO
NO2
N2O
NO2-
NO3-
other NOx
```

These remain separate compound/species records.

---

# 31. Boron Relationship

Resolved parent edge:

```text
MAT:0005
↔
MAT:0008
```

Important material:

$$
B_2O_3
$$

Future network:

$$
B-O-Si
$$

creates major borate/borosilicate material families.

---

# 32. Lithium Relationship

Resolved parent edge:

```text
MAT:0003
↔
MAT:0008
```

Important future materials/species include:

```text
Li2O
Li2O2
oxygen-containing lithium electrode materials
solid-electrolyte/interphase species
```

MAT must distinguish:

```text
oxide
peroxide
superoxide
```

because their O–O bonding and electron counts differ.

---

# 33. Beryllium Oxide

Resolved parent edge:

```text
MAT:0004
↔
MAT:0008
```

Important compound:

```text
MAT:CMP:BeO
```

Key emergent combination:

```text
ELECTRICAL INSULATION
+
HIGH THERMAL CONDUCTIVITY
```

Those are BeO properties, not properties of elemental Be or O separately.

---

# 34. Oxide Universe

Oxygen forms material families with a very large fraction of the periodic table.

Examples include:

```text
simple oxides
mixed oxides
silicates
aluminates
ferrites
spinels
garnets
perovskites
cuprates
transparent conducting oxides
solid electrolytes
oxide-ion conductors
```

Oxygen will therefore become one of MAT's highest-degree knowledge-graph nodes.

---

# 35. Oxidation State as First-Class Coordinate

A metal can form multiple Oxygen-containing compounds with different formal oxidation states.

Future Iron example:

$$
FeO
$$

$$
Fe_2O_3
$$

$$
Fe_3O_4
$$

These differ in:

```text
stoichiometry
crystal structure
electronic structure
magnetism
conductivity
chemical behavior
```

MAT pathway:

$$
\boxed{
\text{O stoichiometry}
\rightarrow
\text{oxidation state}
\rightarrow
\text{electronic structure}
\rightarrow
\text{material behavior}
}
$$

---

# 36. Oxygen Vacancies

Real oxide crystals can deviate from ideal stoichiometry.

Canonical defect:

```text
V_O
```

Oxygen vacancies can alter:

```text
charge balance
carrier concentration
ionic conductivity
electronic conductivity
magnetism
optical properties
catalytic activity
phase stability
```

Therefore vacancy concentration is a first-class state variable.

---

# 37. Defect-State Principle

An oxide must not be represented only by nominal formula.

More complete state:

$$
M_{\rm oxide}
=
F(
\text{composition},
\text{oxygen stoichiometry},
V_O,
\text{cation valence},
\text{crystal structure},
T,
P,
\text{field},
\text{history}
)
$$

This becomes essential for fuel cells, sensors, batteries, catalysts and superconducting oxides.

---

# 38. Peroxide / Superoxide Architecture

Important Oxygen species include:

Peroxide:

$$
O_2^{2-}
$$

Superoxide:

$$
O_2^-
$$

Oxide ion:

$$
O^{2-}
$$

Neutral dioxygen:

$$
O_2
$$

These must receive independent molecular/electronic objects.

Core rule:

$$
\boxed{
\text{same element and similar formula}
\neq
\text{same electronic species}
}
$$

---

# 39. Semiconductor Oxides

Future material relationships include:

```text
ZnO
TiO2
SnO2
In2O3
IGZO-type systems
```

Possible functions include:

```text
semiconductivity
transparency
photocatalysis
gas sensing
piezoelectricity
optoelectronics
```

Properties belong to the oxide material state.

---

# 40. Transparent Conducting Oxides

An important multifunctional branch contains materials combining:

```text
OPTICAL TRANSPARENCY
+
ELECTRICAL CONDUCTIVITY
```

Example future family:

```text
ITO
```

This demonstrates that Oxygen-containing compounds are not necessarily electrically insulating.

---

# 41. Superconducting Oxides

Future cuprate example:

$$
YBa_2Cu_3O_{7-x}
$$

The variable:

$$
x
$$

is physically important.

Small Oxygen-content changes can alter:

```text
carrier density
crystal structure
electronic phase
superconducting properties
```

MAT therefore treats stoichiometric vacancy concentration as first-class data.

---

# 42. Biology — Respiration

Aerobic respiration uses molecular Oxygen as a terminal electron acceptor in many biological systems.

Simplified global description:

```text
reduced biological fuel
+
O2
→
oxidized products
+
usable cellular free-energy pathway
```

The detailed biological process must remain separate from simple combustion.

---

# 43. Biology — Photosynthesis Relationship

Oxygen participates in the planetary photosynthesis/respiration network.

MAT must distinguish:

```text
O2 production
CO2 fixation
water oxidation
respiration
photorespiration
```

rather than reducing photosynthesis to one reaction arrow.

---

# 44. Oxygen Cycle

Planetary Oxygen moves among:

```text
atmosphere
oceans
water
biomass
rocks/minerals
oxides
carbon dioxide
organic matter
ozone
```

This cycle intersects the Carbon, Hydrogen and Nitrogen cycles.

---

# 45. Causali E — Spin-State Example

Initial state:

$$
B=O_2(X\,{}^3\Sigma_g^-)
$$

Intervention:

$$
A=\text{electronic excitation mechanism}
$$

Candidate state:

$$
C=O_2(a\,{}^1\Delta_g)
$$

Same nuclei.

Same molecular formula.

Different electronic state.

Different chemistry.

This is a scientifically clean Causali E state-transition example.

---

# 46. Causali E — Ozone Example

Initial state:

$$
S_0=O_2
$$

Environment/intervention:

```text
UV photon field
collision partner M
pressure
temperature
```

Candidate path:

$$
O_2+h\nu\rightarrow2O
$$

$$
O+O_2+M\rightarrow O_3+M
$$

The third body affects the transformation without being consumed.

This strongly supports the MAT rule that environment can be causally necessary even when it is not incorporated into the product.

---

# 47. Causali E — Oxide Defect Example

Nominal composition:

$$
MO_x
$$

Intervention:

```text
oxygen chemical potential
temperature
pressure
electrochemical bias
processing atmosphere
```

can alter:

$$
V_O
$$

which can alter:

```text
charge carriers
ionic transport
electronic transport
magnetism
catalysis
```

Thus:

$$
\boxed{
\text{small defect change}
\rightarrow
\text{large functional change}
}
$$

---

# 48. Main Oxygen Result

Oxygen produces one of MAT's broadest state spaces:

```text
atomic O
triplet O2
singlet O2
O3
O-
O2-
O2^2-
O^2-
molecular compounds
oxide solids
defective oxides
liquid O2
plasma states
biological Oxygen
```

Its central MAT result is:

$$
\boxed{
\text{element identity}
+
\text{electron count}
+
\text{spin}
+
\text{bonding}
+
\text{stoichiometry}
+
\text{defects}
+
\text{environment}
=
\text{Oxygen-state function}
}
$$

---

# 49. Current Status

```yaml
status: "RESEARCHED"
completeness: "RESEARCHED"

migration_status: "MIGRATED-PENDING-ARCHIVE"

validation:
  schema: "PASS"
  identifiers: "PASS"
  isotope_semantics: "PASS"
  electronic_state_semantics: "PASS"
  molecular_architecture: "PASS"
  spectral_architecture: "PASS"
  magnetic_architecture: "PASS"
  high_pressure_architecture: "PASS"
  oxide_architecture: "PASS"
  defect_architecture: "PASS"
  electrochemical_architecture: "PASS"
  reactive_oxygen_architecture: "PASS"
  biological_architecture: "PASS"
  planetary_architecture: "PASS"
  evidence_architecture: "PASS"
  scientific_core: "CORE-VALIDATED"
  exhaustive_content: false

visuals:
  specification: "LOCKED"
  generated: false
```

NIST confirms the full ionization ladder used above, including the important square-bracket and parenthesis qualifiers on several higher values. ([NIST][2]) NOAA’s dry-atmosphere reference gives **20.946% O₂**, while RSC gives Oxygen’s melting and boiling points as **54.36 K** and **90.188 K**. ([NOAA][3])

The legacy ozone geometry also checks out: NIST’s CCCBDB experimental geometry gives **1.278 Å** O–O distance and **116.8°** O–O–O angle, and NIST’s WebBook lists the three principal ozone fundamentals at about **1103, 701 and 1042 cm⁻¹**. ([CCCBDB][4])
