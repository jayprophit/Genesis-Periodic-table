# 0007 — Nitrogen — N

```yaml
mat_id: MAT:0007
record_name: Nitrogen
symbol: N
record_class: CHEMICAL_ELEMENT
atomic_number: 7
parent_id: MAT:0000
schema_version: 1.0.0
record_version: 1.0.0
status: RESEARCHED
legacy_id: G0007
legacy_name: Nitrogen
reference_implementation:
  - MAT:0001
  - MAT:0002
  - MAT:0003
  - MAT:0004
  - MAT:0005
  - MAT:0006
```

# 0. Record Navigation

Previous:

```text
MAT:0006
0006-Carbon-C
```

Current:

```text
MAT:0007
0007-Nitrogen-N
```

---

# 1. Elemental Identity

| Property                          | Value                |
| --------------------------------- | -------------------- |
| Element                           | Nitrogen             |
| Symbol                            | N                    |
| Atomic number                     | 7                    |
| Protons                           | 7                    |
| Neutral electrons                 | 7                    |
| Period                            | 2                    |
| Group                             | 15                   |
| Block                             | p                    |
| Ground configuration              | 1s²2s²2p³            |
| Ground level                      | ⁴S°₃/₂               |
| Standard atomic weight            | [14.00643, 14.00728] |
| Principal natural isotopes        | ¹⁴N, ¹⁵N             |
| Ordinary elemental molecular form | N₂                   |
| Ordinary state near 20 °C         | gas                  |

Primary sources:

```text
SRC-000005
SRC-000101
SRC-000102
SRC-000104
```

---

# 2. Half-Filled p Subshell

Neutral Nitrogen has:

$$
1s^22s^22p^3
$$

The \(2p^3\) configuration gives one electron in each of the three p orbitals in the simple atomic model.

Ground level:

$$
{}^4S^\circ_{3/2}
$$

This makes Nitrogen a useful MAT example of:

```text
ATOMIC OPEN-SHELL SPIN STATE
```

that differs strongly from the closed-shell electronic state of ordinary molecular \(N_2\).

---

# 3. First Ionisation

$$
N\rightarrow N^++e^-
$$

NIST ASD gives:

$$
E_{I1}
=
14.53413\pm0.00004\ {\rm eV}
$$

Canonical child:

```text
MAT:0007:ION:N+1
```

---

# 4. Ionisation Ladder

NIST evaluated values include:

$$
E_{I2}
=
29.60125\pm0.00009\ {\rm eV}
$$

$$
E_{I3}
=
47.4453\pm0.0025\ {\rm eV}
$$

$$
E_{I4}
=
77.4735\pm0.0004\ {\rm eV}
$$

$$
E_{I5}
=
97.8901\pm0.0004\ {\rm eV}
$$

with substantially higher core-electron removal energies beyond these.

Canonical states:

```text
MAT:0007:ATOM:N
MAT:0007:ION:N+1
MAT:0007:ION:N+2
MAT:0007:ION:N+3
MAT:0007:ION:N+4
MAT:0007:ION:N+5
MAT:0007:ION:N+6
MAT:0007:ION:N+7
```

---

# 5. Standard Atomic Weight

NIST gives:

$$
A_r(N)
=
[14.00643,\ 14.00728]
$$

Representative natural isotope compositions:

$$
{}^{14}N
=
0.99636(20)
$$

$$
{}^{15}N
=
0.00364(20)
$$

These compositions are not universal for every natural, processed or isotopically enriched Nitrogen sample.

---

# 6. Nitrogen-14

Canonical ID:

```text
MAT:0007:ISO:N-14
```

Relative atomic mass:

$$
14.00307400443(20)\ u
$$

Status:

```text
STABLE
```

Nuclear spin:

$$
I=1
$$

¹⁴N is therefore NMR active.

It is the overwhelmingly dominant natural isotope in ordinary terrestrial Nitrogen.

---

# 7. Nitrogen-15

Canonical ID:

```text
MAT:0007:ISO:N-15
```

Relative atomic mass:

$$
15.00010889888(64)\ u
$$

Status:

```text
STABLE
```

Nuclear spin:

$$
I=\frac12
$$

Important uses include:

```text
NMR
stable-isotope tracing
metabolic studies
nitrogen-cycle tracing
reaction-mechanism studies
```

Thus:

$$
\boxed{
\text{same electronic element}
+
\text{different nucleus}
=
\text{different measurement channel}
}
$$

---

# 8. Nitrogen-13

Canonical ID:

```text
MAT:0007:ISO:N-13
```

Relative atomic mass:

$$
13.00573861(29)\ u
$$

Evaluated half-life is approximately:

$$
9.965\ {\rm min}
$$

Decay:

$$
{}^{13}N
\rightarrow
{}^{13}C
+
e^+
+
\nu_e
$$

Future daughter:

```text
MAT:0006:ISO:C-13
```

Target status:

```text
RESOLVED
```

Applications include:

```text
PET
short-duration radiotracing
biochemical studies
```

---

# 9. Nitrogen-16

Canonical ID:

```text
MAT:0007:ISO:N-16
```

Relative atomic mass:

$$
16.0061019(25)\ u
$$

Half-life:

$$
t_{1/2}
\approx
7.13\ {\rm s}
$$

Decay:

```text
BETA-MINUS
```

with prominent high-energy gamma emission in its decay scheme.

This isotope is important in radiation monitoring around water-cooled nuclear systems.

MAT interpretation:

```text
HIGH INDIVIDUAL DECAY ENERGY
+
VERY SHORT HALF-LIFE
```

means:

```text
USEFUL DIAGNOSTIC / RADIATION NODE
```

not:

```text
USEFUL LONG-TERM ENERGY STORAGE
```

---

# 10. Nitrogen-17

Canonical ID:

```text
MAT:0007:ISO:N-17
```

Relative atomic mass:

$$
17.008449(16)\ u
$$

Half-life:

$$
t_{1/2}
\approx
4.173\ {\rm s}
$$

Important decay class:

```text
BETA-MINUS
+
BETA-DELAYED-NEUTRON
```

This adds another MAT nuclear relationship:

$$
\boxed{
\text{radioactive decay}
\rightarrow
\text{secondary neutron emission}
}
$$

---

# 11. Planetary Reservoir

Dry terrestrial atmosphere contains approximately:

$$
\boxed{
78.084\%\,N_2
}
$$

by volume.

Therefore Nitrogen is a major:

```text
PLANETARY-RESERVOIR NODE
```

MAT must distinguish:

```text
ABUNDANCE
```

from:

```text
CHEMICAL ACCESSIBILITY
```

because atmospheric \(N_2\) is abundant but chemically difficult to activate under ordinary conditions.

---

# 12. Molecular Nitrogen

Canonical molecular state:

```text
MAT:0007:MOL:N2
```

Ground electronic state:

$$
X\,{}^1\Sigma_g^+
$$

Geometry:

```text
LINEAR
```

Bonding representation:

$$
N\equiv N
$$

Equilibrium bond length:

$$
r_e
=
1.097685\ {\rm \AA}
$$

approximately.

NIST molecular constants give:

$$
\omega_e
=
2358.57\ {\rm cm^{-1}}
$$

and:

$$
B_e
=
1.998241\ {\rm cm^{-1}}
$$

for the ground electronic state.

---

# 13. Strong Molecular Bond

The ordinary \(N_2\) state is stabilized by an exceptionally strong N–N triple bond.

This helps explain why:

```text
ATMOSPHERIC N2
```

is abundant while biologically and industrially useful fixed-Nitrogen compounds require activation.

MAT principle:

$$
\boxed{
\text{large reservoir}
\neq
\text{easy chemical feedstock}
}
$$

---

# 14. Frequency Architecture

There is no universal:

```text
nitrogen_frequency
```

Nitrogen contains mechanism-specific spectral branches:

```text
atomic electronic transitions
N2 vibration
N2 rotation
Raman scattering
plasma emission
14N NMR
15N NMR
solid-state lattice modes
molecular-compound vibrations
nuclear transitions
```

Representative N₂ ground-state constants:

$$
\omega_e
=
2358.57\ {\rm cm^{-1}}
$$

$$
B_e
=
1.998241\ {\rm cm^{-1}}
$$

These are molecular spectroscopic parameters, not intrinsic frequencies of the element itself.

---

# 15. Atomic Versus Molecular Magnetism

An isolated ground-state Nitrogen atom has three unpaired p electrons.

Therefore its atomic state is spin-active and paramagnetic.

Ordinary ground-state \(N_2\) has all electrons paired and is diamagnetic.

Thus:

$$
\boxed{
M_{N({\rm atom})}
\neq
M_{N_2({\rm molecule})}
}
$$

Element identity alone does not specify magnetic behavior.

---

# 16. Ordinary Physical States

At atmospheric pressure Nitrogen changes among:

```text
N2(g)
N2(l)
N2(s)
```

Representative phase temperatures:

Melting point:

$$
T_m
\approx
63.2\ {\rm K}
$$

Normal boiling point:

$$
T_b
=
77.355\ {\rm K}
$$

These phase temperatures apply to specified pressure/state conditions.

---

# 17. Liquid Nitrogen

Canonical phase:

```text
MAT:0007:PHASE:LIQUID-N2
```

Liquid Nitrogen is important primarily because it provides a convenient cryogenic thermal environment near:

$$
77\ {\rm K}
$$

at its normal boiling condition.

Applications include:

```text
cryogenic cooling
cold trapping
material testing
sample preservation
freeze processing
thermal experiments
```

This is an:

```text
ENVIRONMENT-ENABLING ROLE
```

rather than a new chemical identity.

---

# 18. Nitrogen Versus Helium Cryogenics

MAT now distinguishes two cryogenic branches.

Helium:

```text
much lower-temperature cryogenics
quantum-fluid regimes
```

Nitrogen:

```text
higher-temperature cryogenics
easier bulk cooling applications
```

Therefore:

$$
\boxed{
\text{cryogenic utility}
=
F(T_{\rm target},P,\text{system},\text{cost},\text{material compatibility})
}
$$

not simply:

```text
coldest fluid wins
```

---

# 19. Extreme-Pressure Nitrogen

Ordinary Nitrogen is molecular.

Under extreme pressure and temperature, Nitrogen can transform into non-molecular polymeric phases.

The experimentally identified cubic-gauche form is:

```text
MAT:0007:ALLOTROPE:CG-N
```

or:

```text
CUBIC-GAUCHE POLYMERIC NITROGEN
```

---

# 20. Cubic-Gauche Nitrogen

Eremets and collaborators synthesized single-bonded cubic Nitrogen from molecular Nitrogen at conditions above approximately:

$$
110\ {\rm GPa}
$$

and:

$$
2000\ {\rm K}
$$

The structure is an extended covalent network in which Nitrogen atoms are connected mainly through single bonds rather than remaining as isolated \(N_2\) molecules.

This is a real material transformation:

$$
N\equiv N
\rightarrow
-N-N-N-
$$

at high pressure/temperature.

---

# 21. Bond Topology as Energy State

Molecular \(N_2\) occupies a strongly bound low-energy configuration.

Polymeric Nitrogen forces the same atoms into a higher-energy single-bonded network.

Therefore:

$$
\boxed{
\text{same elemental composition}
+
\text{different bond topology}
=
\text{different stored chemical energy}
}
$$

This is one of MAT's strongest structure-energy examples.

---

# 22. Metastability

Cubic-gauche Nitrogen is not an ordinary ambient allotrope comparable to room-pressure graphite or diamond.

Its state requires:

```text
pressure
temperature
formation history
metastability
decompression path
```

MAT therefore stores:

```text
SYNTHESIS CONDITION
```

and:

```text
AMBIENT STABILITY
```

as different fields.

---

# 23. Redox-State Diversity

Nitrogen chemistry spans formal oxidation states approximately:

$$
-3
\rightarrow
+5
$$

Representative chemical environments include:

```text
NH3
NH4+
N2
NO
NO2
NO2-
NO3-
organic amines
amides
nitriles
azo compounds
nitrides
```

One oxidation-state scalar cannot represent all Nitrogen chemistry.

---

# 24. Hydrogen Relationship

A major chemical relationship is:

$$
N_2+3H_2
\rightleftharpoons
2NH_3
$$

This connects:

```text
MAT:0001 Hydrogen
↔
MAT:0007 Nitrogen
```

through ammonia production and Nitrogen fixation.

The properties of ammonia belong to:

```text
MAT:CMP:NH3
```

not to elemental Nitrogen.

---

# 25. Nitrogen Fixation

Atmospheric molecular Nitrogen must often be converted into chemically accessible fixed-Nitrogen species.

Important pathways include:

```text
biological nitrogen fixation
industrial ammonia synthesis
lightning chemistry
plasma chemistry
high-temperature NOx formation
```

General MAT transformation:

$$
\boxed{
N_2({\rm reservoir})
\rightarrow
\text{reactive/fixed Nitrogen}
}
$$

---

# 26. Biological Nitrogen

Nitrogen is fundamental to terrestrial biology.

Major molecular roles include:

```text
amino acids
proteins
nucleobases
DNA
RNA
ATP-related chemistry
cofactors
signalling compounds
```

Biological systems generally require fixed Nitrogen rather than being able to use atmospheric \(N_2\) directly.

---

# 27. Carbon Relationship

The Carbon–Nitrogen relationship is one of MAT's densest chemical networks.

Important bonding families include:

```text
C-N
C=N
C#N
amide
amine
nitrile
imine
heteroaromatic
peptide
nucleobase
```

Canonical relationship:

```text
MAT:0006
↔
MAT:0007
```

Target status:

```text
RESOLVED
```

---

# 28. Boron-Nitrogen Relationship

The Boron forward reference now activates.

$$
B+N
\rightarrow
BN
$$

Important material families include:

```text
h-BN
c-BN
w-BN
nanostructured BN
```

A useful electron-count comparison is:

$$
\frac{3+5}{2}=4
$$

for the average B/N valence-electron count per atom in BN, matching Carbon's four valence electrons.

This helps explain why some BN geometries are structural analogues of Carbon networks.

---

# 29. BN Versus Carbon Geometry

Examples:

```text
graphene
↔
hexagonal BN
```

and:

```text
diamond
↔
cubic BN
```

This gives MAT a powerful inverse-design principle:

$$
\boxed{
\text{similar topology}
+
\text{different composition}
=
\text{different material properties}
}
$$

---

# 30. Nitride Materials

Important future material families include:

```text
BN
AlN
GaN
Si3N4
TiN
SiNx
```

These span:

```text
ceramics
semiconductors
coatings
mechanical materials
optical materials
electronic materials
```

Nitrogen therefore develops long-distance material relationships across the periodic table.

---

# 31. Nitrogen Cycle

Nitrogen introduces a planetary biogeochemical cycle comparable in importance to Carbon.

Simplified network:

```text
atmospheric N2
↓ fixation
NH3 / NH4+
↓ nitrification
NO2-
↓
NO3-
↓ assimilation
biomass
↓ decomposition / ammonification
NH4+
↓ denitrification
N2
```

Additional pathways include:

```text
anammox
NOx chemistry
fertilizer inputs
runoff
groundwater transport
ocean cycling
sediment cycling
```

---

# 32. Environmental Engineering

Nitrogen is beneficial when supplying biologically limiting nutrients.

Excess reactive Nitrogen can contribute to:

```text
eutrophication
algal blooms
oxygen depletion
groundwater nitrate contamination
NOx air pollution
nitrous oxide emissions
ecosystem imbalance
```

Therefore:

$$
\boxed{
\text{useful nutrient}
\neq
\text{unconditionally beneficial environmental input}
}
$$

---

# 33. Causali E — Nitrogen Fixation

Initial state:

$$
S_0=N_2
$$

Constraint:

$$
B=
\text{strong triple bond + environmental conditions}
$$

Intervention:

$$
A=
\text{biological / industrial / plasma activation}
$$

Candidate products:

$$
C=
\{
NH_3,
NH_4^+,
NO_x,
NO_3^-,
...
\}
$$

This is a useful causal-network example because the output depends strongly on mechanism and environment.

---

# 34. Causali E — Topology Energy

Initial state:

$$
S_0=N_2
$$

High-pressure/high-temperature intervention:

$$
A=(P,T,\text{time})
$$

Candidate state:

$$
C=cg-N
$$

The material may store substantially more chemical energy than molecular \(N_2\).

Thus:

$$
\boxed{
\text{topological state}
\rightarrow
\text{energy-state difference}
}
$$

without changing elemental identity.

---

# 35. Main Nitrogen Result

Nitrogen gives MAT several new universal architecture tests:

```text
planetary reservoir
molecular triple-bond stability
chemical accessibility
cryogenic environment
biological fixation
industrial fixation
redox diversity
nitride materials
isotope tracing
radioactive diagnostics
high-pressure polymeric topology
biogeochemical cycling
```

Its central structure principle is:

$$
\boxed{
\text{same Nitrogen atoms}
+
\text{different bonding topology}
+
\text{different environment}
=
\text{radically different function}
}
$$

---

# 36. Current Status

```yaml
status: "RESEARCHED"
completeness: "RESEARCHED"

migration_status: "MIGRATED-PENDING-ARCHIVE"

validation:
  schema: "PASS"
  identifiers: "PASS"
  isotope_semantics: "PASS"
  molecular_architecture: "PASS"
  cryogenic_architecture: "PASS"
  polymeric_architecture: "PASS"
  topology_energy_architecture: "PASS"
  fixation_architecture: "PASS"
  reactive_nitrogen_architecture: "PASS"
  nitride_architecture: "PASS"
  biological_architecture: "PASS"
  planetary_cycle_architecture: "PASS"
  plasma_architecture: "PASS"
  spectral_architecture: "PASS"
  evidence_architecture: "PASS"
  scientific_core: "CORE-VALIDATED"
  exhaustive_content: false

visuals:
  specification: "LOCKED"
  generated: false
```
```

NIST gives neutral Nitrogen as `1s²2s²2p³`, \(^{4}S^\circ_{3/2}\), with first ionisation energy **14.53413 ± 0.00004 eV**; its isotope table gives ¹⁴N mass `14.00307400443(20) u`, ¹⁵N `15.00010889888(64) u`, representative compositions `0.99636(20)` and `0.00364(20)`, and standard atomic weight `[14.00643,14.00728]`. ([NIST][1])

The NIST molecular compilation gives ground-state \(N_2\) \(X\,^1\Sigma_g^+\) with \(\omega_e=2358.57\ {\rm cm^{-1}}\), \(B_e=1.998241\ {\rm cm^{-1}}\), and \(r_e\approx1.097685\) Å. ([NIST WebBook][2]) NOAA gives **78.084% N₂ by volume in dry atmosphere**. ([NOAA][3])
