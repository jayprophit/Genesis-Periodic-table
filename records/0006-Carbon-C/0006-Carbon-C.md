# 0006 — Carbon — C

```yaml
mat_id: MAT:0006
record_name: Carbon
symbol: C
record_class: CHEMICAL_ELEMENT
atomic_number: 6
parent_id: MAT:0000
schema_version: 1.0.0
record_version: 1.0.0
status: RESEARCHED
legacy_id: G0006
legacy_name: Carbon
reference_implementation:
  - MAT:0001
  - MAT:0002
  - MAT:0003
  - MAT:0004
  - MAT:0005
```

# 0. Record Navigation

Previous:

```text
MAT:0005
0005-Boron-B
```

Current:

```text
MAT:0006
0006-Carbon-C
```

---

# 1. Elemental Identity

| Property                       | Value              |
| ------------------------------ | ------------------ |
| Element                        | Carbon             |
| Symbol                         | C                  |
| Atomic number                  | 6                  |
| Protons                        | 6                  |
| Neutral electrons              | 6                  |
| Period                         | 2                  |
| Group                          | 14                 |
| Block                          | p                  |
| Ground configuration           | 1s²2s²2p²          |
| Ground level                   | ³P₀                |
| Standard atomic weight         | [12.0096, 12.0116] |
| Principal stable isotopes      | ¹²C, ¹³C           |
| Important natural radionuclide | ¹⁴C                |

Primary sources:

```text
SRC-000005
SRC-000080
```

---

# 2. First Four-Valence-Electron Reference

Carbon has:

$$
1s^22s^22p^2
$$

with four valence electrons.

This produces enormous bonding flexibility.

MAT therefore activates a particularly broad bonding state space:

```text
single bonds
double bonds
triple bonds
aromatic / delocalized systems
extended covalent networks
conjugated systems
cluster/cage structures
layered networks
linear chains
```

---

# 3. First Ionisation

$$
C\rightarrow C^+ +e^-
$$

NIST ASD:

$$
E_{I1}
=
11.2602880\pm0.0000011\ {\rm eV}
$$

Canonical child:

```text
MAT:0006:ION:C+1
```

---

# 4. Ionisation Ladder

NIST evaluated ionisation energies include:

$$
C^+\rightarrow C^{2+}
$$

$$
24.383143\pm0.000012\ {\rm eV}
$$

$$
C^{2+}\rightarrow C^{3+}
$$

$$
47.88778\pm0.00025\ {\rm eV}
$$

$$
C^{3+}\rightarrow C^{4+}
$$

$$
64.49352\pm0.00019\ {\rm eV}
$$

Higher removal from the 1s shell requires approximately:

$$
392.09056\ {\rm eV}
$$

and:

$$
489.99320779\ {\rm eV}
$$

Canonical states:

```text
MAT:0006:ATOM:C
MAT:0006:ION:C+1
MAT:0006:ION:C+2
MAT:0006:ION:C+3
MAT:0006:ION:C+4
MAT:0006:ION:C+5
MAT:0006:ION:C+6
```

---

# 5. Standard Atomic Weight

Carbon has a standard atomic-weight interval:

$$
[12.0096,\ 12.0116]
$$

because natural isotope ratios can vary.

Representative compositions:

$$
{}^{12}C=0.9893(8)
$$

$$
{}^{13}C=0.0107(8)
$$

These are representative values, not universal isotope ratios for every Carbon sample.

---

# 6. Carbon-12 — Mass Reference

Canonical ID:

```text
MAT:0006:ISO:C-12
```

For the unified atomic mass unit / dalton:

$$
1u
=
\frac1{12}
m({}^{12}C)
$$

where the reference is a free neutral Carbon-12 atom at rest and in its ground state.

Consequently:

$$
m_r({}^{12}C)=12
$$

exactly in unified atomic mass units.

This makes Carbon-12 a special MAT **measurement-reference node**.

Source:

```text
SRC-000081
```

---

# 7. Carbon-13 — Nuclear-Spin Tool

Canonical ID:

```text
MAT:0006:ISO:C-13
```

Relative atomic mass:

$$
13.00335483507(23)\ u
$$

Nuclear spin:

$$
I=\frac12
$$

Therefore ¹³C is NMR active.

Important uses include:

```text
molecular structure determination
metabolic tracing
isotope labeling
reaction-mechanism studies
materials characterization
```

By contrast:

$$
{}^{12}C:\ I=0
$$

in its nuclear ground state.

Thus:

$$
\boxed{
\text{one neutron difference}
\rightarrow
\text{new measurement capability}
}
$$

without fundamentally changing ordinary Carbon chemistry.

---

# 8. Carbon-14

Canonical ID:

```text
MAT:0006:ISO:C-14
```

Relative atomic mass:

$$
14.0032419884(40)\ u
$$

Decay:

$$
{}^{14}C
\rightarrow
{}^{14}N
+
e^-
+
\bar\nu_e
$$

Classification:

```text
BETA-MINUS RADIOACTIVE
COSMOGENIC
LONG-LIVED
```

---

# 9. Carbon-14 Half-Life Convention

MAT must not silently merge different radiocarbon conventions.

An IAEA reference-material value uses:

$$
t_{1/2}
=
5700\pm30\ {\rm y}
$$

while modern explanatory sources commonly quote approximately:

$$
5730\ {\rm y}
$$

Separately, traditional **conventional radiocarbon ages** historically use the Libby half-life:

$$
5568\ {\rm y}
$$

as a dating convention.

Therefore MAT stores:

```yaml
physical_half_life:
  value: 5700
  uncertainty: 30
  unit: y
  source_id: SRC-000082

radiocarbon_age_convention:
  libby_half_life:
    value: 5568
    unit: y
    classification: METHOD-CONVENTION
```

Core rule:

$$
\boxed{
\text{physical decay parameter}
\neq
\text{historical dating convention}
}
$$

---

# 10. Radiocarbon Clock

Radioactive decay may be written:

$$
N(t)=N_0e^{-\lambda t}
$$

with:

$$
\lambda=\frac{\ln2}{t_{1/2}}
$$

or equivalently:

$$
N(t)
=
N_0\,2^{-t/t_{1/2}}
$$

Carbon-14 therefore provides MAT with a geological, archaeological and environmental time coordinate.

---

# 11. Carbon-11

Canonical ID:

```text
MAT:0006:ISO:C-11
```

Carbon-11 is a short-lived positron-emitting radionuclide with a half-life of roughly 20 minutes.

Applications include:

```text
PET imaging
radiotracing
biochemical studies
```

This creates a strong functional contrast:

```text
11C → short timescale / high temporal activity / imaging

14C → long timescale / dating / tracing
```

Same element.

Different nuclear tools.

---

# 12. Isotope Architecture

Current NIST mass tables list Carbon nuclides from:

$$
{}^8C
$$

through:

$$
{}^{23}C
$$

in the present dataset.

Only:

```text
12C
13C
```

are stable.

The remaining mass numbers include combinations of:

```text
beta emitters
positron emitters
proton-rich states
neutron-rich states
unbound resonances
very short-lived nuclei
```

The full registry will keep those semantics explicit.

---

# 13. Triple-Alpha Closure

Beryllium's nuclear forward reference now closes.

First:

$$
{}^4He+{}^4He
\rightleftharpoons
{}^8Be
$$

then:

$$
{}^8Be+{}^4He
\rightarrow
{}^{12}C^*
$$

followed by electromagnetic de-excitation toward:

$$
{}^{12}C
$$

This gives:

```text
MAT:0002 Helium
→ MAT:0004 Beryllium
→ MAT:0006 Carbon
```

a resolved nuclear pathway.

---

# 14. Hoyle-State Relationship

An important excited state of Carbon-12 occurs near:

$$
7.654\ {\rm MeV}
$$

and plays a major role in stellar triple-alpha Carbon production.

Canonical future state:

```text
MAT:0006:QSTATE:C12-HOYLE
```

It is an excited **nuclear state**, not an atomic electron state.

---

# 15. Nuclear Geometry

Models of ¹²C nuclear structure can involve alpha-cluster organization.

MAT must distinguish:

```text
NUCLEAR CLUSTER GEOMETRY
```

from:

```text
ATOMIC ORBITAL GEOMETRY
MOLECULAR GEOMETRY
CRYSTAL GEOMETRY
```

Carbon will ultimately contain geometric descriptors across all four scales.

---

# 16. Bonding Geometry

A useful chemical bonding model distinguishes:

### sp-like coordination

$$
\theta\approx180^\circ
$$

Linear.

### sp²-like coordination

$$
\theta\approx120^\circ
$$

Trigonal planar.

### sp³-like coordination

$$
\theta\approx109.47^\circ
$$

Tetrahedral.

These are idealized local bonding descriptors.

MAT does not treat hybrid orbitals as rigid classical objects.

---

# 17. Dimensionality

Carbon is the first MAT element to strongly occupy all major structural dimensionalities.

### 0D

```text
fullerenes
carbon quantum dots
molecular cages
```

### 1D

```text
carbon nanotubes
nanoribbons / chains
```

### 2D

```text
graphene
few-layer graphene systems
```

### 3D

```text
diamond
graphite crystals
amorphous networks
porous carbon
engineered composites
```

Important classification correction:

```text
carbon fibre
activated carbon
porous carbon
```

are engineered material/morphology families and should not automatically be labeled fundamental crystalline allotropes.

---

# 18. Diamond

Canonical allotrope:

```text
MAT:0006:ALLOTROPE:DIAMOND
```

Principal bonding descriptor:

```text
sp3-like tetrahedral network
```

Important properties include:

```text
wide band gap
extreme hardness
high thermal conductivity in suitable high-purity states
electrical insulation when sufficiently pure
broad optical transmission
```

A familiar first-order Raman feature lies near:

$$
1332\ {\rm cm^{-1}}
$$

under appropriate conditions.

---

# 19. Graphite

Canonical allotrope:

```text
MAT:0006:ALLOTROPE:GRAPHITE
```

Principal structure:

```text
stacked sp2-bonded carbon sheets
```

Graphite introduces strong anisotropy:

$$
\sigma_\parallel\neq\sigma_\perp
$$

and:

$$
\kappa_\parallel\neq\kappa_\perp
$$

Therefore:

$$
\boxed{
\text{property value}
+
\text{measurement direction}
}
$$

must be stored together.

---

# 20. Graphene

Canonical material/allotrope state:

```text
MAT:0006:ALLOTROPE:GRAPHENE
```

Graphene is a one-atom-thick honeycomb Carbon sheet.

Relevant characteristics include:

```text
two-dimensional structure
sp2 bonding
Dirac-like electronic dispersion
high in-plane strength
high in-plane thermal transport
high surface area
strong dependence on defects/doping/substrate
```

Graphene properties must specify:

```text
layer number
strain
defects
doping
substrate
temperature
measurement method
```

---

# 21. Carbon Nanotubes

Canonical family:

```text
MAT:0006:MAT:CNT
```

A nanotube can be described using a chiral vector:

$$
(n,m)
$$

Electronic character can change with chirality.

Thus:

$$
\boxed{
\text{similar composition}
+
\text{different topology}
\rightarrow
\text{different electronic behaviour}
}
$$

This is one of MAT's strongest topology examples.

---

# 22. Fullerenes

Canonical family:

```text
MAT:0006:MOL:FULLERENE
```

Examples include:

```text
C60
C70
higher fullerene cages
```

These are finite molecular cage structures.

They should not be assigned graphite or graphene bulk properties merely because every atom is Carbon.

---

# 23. Amorphous Carbon

Canonical material family:

```text
MAT:0006:MAT:AMORPHOUS-CARBON
```

Amorphous Carbon does not possess the long-range translational order of a crystal.

Its properties depend strongly on:

```text
sp2/sp3 fraction
hydrogen content
density
defects
processing
temperature
deposition conditions
```

Subclasses may later include:

```text
diamond-like carbon
hydrogenated amorphous carbon
glassy carbon
soot-related structures
```

as separate states.

---

# 24. Electronic-State Spectrum

Carbon is perhaps MAT's clearest proof that atomic identity alone does not determine bulk conductivity.

Examples:

```text
diamond
→ wide-gap insulating/semiconducting state

graphite
→ semimetallic / conducting state

graphene
→ Dirac-like zero-gap electronic system

CNT
→ metallic or semiconducting depending on chirality

amorphous carbon
→ strongly process-dependent
```

Therefore:

$$
E_C
=
F(
\text{structure},
\text{bonding},
\text{defects},
\text{dopants},
\text{dimension},
T,
P
)
$$

---

# 25. Frequency Architecture

Carbon has no single inherent frequency.

Mechanisms include:

```text
atomic transitions
molecular vibrations
Raman modes
phonons
electronic excitations
nuclear magnetic resonance
plasma emission
acoustic modes
```

Graphitic Raman features often include the families commonly called:

```text
D
G
2D
```

but their exact positions depend on:

```text
strain
defects
doping
temperature
layer number
excitation wavelength
```

Therefore spectra are state fingerprints, not universal element frequencies.

---

# 26. Spectroscopy as Feedback

Carbon strongly validates a MAT feedback loop:

$$
\boxed{
\text{process material}
\rightarrow
\text{measure spectrum}
\rightarrow
\text{infer structure/state}
}
$$

This can connect:

```text
Raman
IR
XPS
NMR
optical spectroscopy
diffraction
```

to process history and material state.

---

# 27. Magnetic Architecture

Carbon again prohibits one magnetic label.

Examples may include:

```text
diamond → predominantly diamagnetic bulk response
graphite → strongly anisotropic magnetic response
defect-rich carbon → possible local magnetic moments
doped carbon → altered electronic/spin states
```

Therefore:

$$
M_C
=
F(
\text{allotrope},
\text{defects},
\text{dopants},
\text{orientation},
T,
B
)
$$

---

# 28. Organic Chemistry Hub

Carbon's ability to form strong C–C and heteroatom bonds creates enormous molecular diversity.

Important families include:

```text
hydrocarbons
alcohols
carbonyl compounds
carboxylic acids
amines
carbohydrates
lipids
peptides/proteins
nucleic-acid components
polymers
pharmaceuticals
organic semiconductors
```

These belong to compound/molecular records rather than being flattened into the elemental record.

---

# 29. Carbon–Hydrogen Relationship

Canonical relationship:

```text
MAT:0006
CHEMICAL-BONDS-WITH
MAT:0001
```

C–H bonds are foundational to organic chemistry.

Other H–C mechanisms include:

```text
H2 adsorption on porous carbon
hydrocarbon chemistry
hydrogenated amorphous carbon
polymer chemistry
biological molecules
plasma-surface interactions
```

Legacy speculative H–C harmonic/octave ideas remain in a separate historical/hypothesis layer.

Measured C–H chemistry does **not** prove an octave mechanism.

---

# 30. Carbon–Lithium Relationship

Graphitic Carbon can host Lithium.

A highly lithiated ideal graphite composition is:

$$
LiC_6
$$

Relationship:

```text
MAT:0003 Lithium
↔
MAT:0006:ALLOTROPE:GRAPHITE
```

Mechanism:

```text
INTERCALATION
```

This resolves Lithium's earlier Carbon forward reference once the Carbon record exists.

---

# 31. Carbon–Boron Relationship

Important families include:

```text
B4C
boron-doped diamond
boron-doped graphitic carbon
boron-containing carbon networks
```

Therefore:

```text
MAT:0005
↔
MAT:0006
```

contains separate:

```text
ceramic
dopant
electronic
structural
superconductivity-related
```

edges.

---

# 32. Carbon–Oxygen Chemistry

Complete oxidation:

$$
C+O_2
\rightarrow
CO_2
$$

Oxygen-limited chemistry may produce:

$$
2C+O_2
\rightarrow
2CO
$$

These products have radically different biological and safety profiles.

Thus:

```text
CARBON OXIDATION
```

must include product identity and environment.

---

# 33. Transformation, Not Disappearance

Combustion illustrates:

$$
C_{\rm solid}
\rightarrow
CO_2
$$

The Carbon nuclei remain Carbon.

The system changes:

```text
bonding
oxidation state
phase
molecular identity
location
energy distribution
```

subject to full conservation and mass-energy accounting.

This is a scientifically useful Causali E transformation example.

---

# 34. Planetary Carbon Cycle

Carbon requires a planetary-scale process layer.

Simplified network:

```text
atmospheric CO2
↔ photosynthesis
↔ biomass
↔ respiration / decomposition
↔ CO2
```

plus:

```text
oceanic dissolved carbon
carbonate chemistry
sediments
carbonate minerals
fossil carbon
soil carbon
mantle/geological carbon
anthropogenic emissions
```

The Carbon cycle therefore spans:

```text
molecular
biological
ecosystem
oceanic
atmospheric
geological
planetary
```

scales.

---

# 35. Biological Architecture

Carbon is a central structural element of known terrestrial organic life.

The major biological network includes:

$$
C-H-O-N-P-S
$$

Carbon appears in:

```text
carbohydrates
lipids
amino acids
proteins
nucleic acids
metabolites
signalling molecules
structural biomolecules
```

This does not imply that every Carbon material is biologically compatible.

---

# 36. Material Engineering Hub

Important future Carbon material relationships include:

```text
C + Si → SiC
C + Fe → steels / cast irons
C + Ti → TiC
C + W → WC
C + Ta → TaC
C + Hf → HfC
C + B → B4C
```

The effect of Carbon can be large even at small concentration.

This creates a canonical materials-design principle:

$$
\boxed{
\text{small composition change}
\rightarrow
\text{large phase/property change}
}
$$

---

# 37. Porous Carbon

Porous/activated Carbon demonstrates:

$$
\text{composition nearly unchanged}
+
\text{microstructure redesigned}
\rightarrow
\text{large surface-area change}
$$

Applications can include:

```text
adsorption
filtration
electrodes
supercapacitors
catalyst supports
gas storage
battery systems
```

Surface area and pore distribution must be explicit material metrics.

---

# 38. Main Carbon Result

Carbon gives MAT its strongest structure–property demonstration yet:

$$
\boxed{
\text{element}
+
\text{bonding}
+
\text{geometry}
+
\text{dimension}
+
\text{defects}
+
\text{process}
=
\text{material behaviour}
}
$$

Changing no proton count while rearranging Carbon can produce:

```text
diamond
graphite
graphene
nanotube
fullerene
amorphous carbon
porous carbon
carbon fibre
```

with radically different macroscopic properties.

This is foundational for future inverse material design.

---

# 39. Current Status

```yaml
status: "RESEARCHED"
completeness: "RESEARCHED"

migration_status: "MIGRATED-PENDING-ARCHIVE"

validation:
  schema: "PASS"
  identifiers: "PASS"
  isotope_semantics: "PASS"
  nuclear_architecture: "PASS"
  metrology_architecture: "PASS"
  allotrope_architecture: "PASS"
  topology_architecture: "PASS"
  dimensionality_architecture: "PASS"
  nanocarbon_architecture: "PASS"
  organic_architecture: "PASS"
  transport_architecture: "PASS"
  spectral_architecture: "PASS"
  biological_architecture: "PASS"
  carbon_cycle_architecture: "PASS"
  evidence_architecture: "PASS"
  scientific_core: "CORE-VALIDATED"
  exhaustive_content: false

visuals:
  specification: "LOCKED"
  generated: false
```

The atomic values above are from NIST ASD: Carbon is `1s²2s²2p²`, \(^{3}P_0\), with first ionisation energy **11.2602880 ± 0.0000011 eV** and the higher ionisation ladder shown above. ([NIST][1]) NIST gives ¹²C abundance `0.9893(8)`, ¹³C `0.0107(8)`, and the standard atomic-weight interval `[12.0096,12.0116]`. ([NIST][2])

The SI Brochure still defines the dalton/unified atomic mass unit as **one twelfth of the mass of a free Carbon-12 atom at rest in its ground state**, so the legacy Carbon-12 measurement-reference idea remains scientifically valid. ([BIPM][3])

## Evaluated nuclear data and review

The [NUBASE2020 nuclear state catalogue](0006-Carbon-C-Nuclear-Evaluation.md) provides 21 evaluated states with uncertainties, qualifiers and source-line provenance. This dated evaluation does not make the whole material record complete.
