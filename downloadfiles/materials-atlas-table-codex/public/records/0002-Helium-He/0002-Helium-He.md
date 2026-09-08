# 0002 — Helium — He

```yaml
mat_id: MAT:0002
record_name: Helium
symbol: He
record_class: CHEMICAL_ELEMENT
atomic_number: 2
parent_id: MAT:0000
schema_version: 1.0.0
record_version: 1.0.0
status: RESEARCHED
legacy_id: G0002
legacy_name: Helium
reference_implementation: MAT:0001
```

# 0. Record Navigation

## MAT Reference

```text
MAT:0000
```

## Previous Primary Record

```text
MAT:0001
0001-Hydrogen-H
```

## Current Record

```text
MAT:0002
0002-Helium-He
```

---

# 1. Elemental Identity

| Property                      |       Value | Unit / Status |
| ----------------------------- | ----------: | ------------- |
| MAT ID                        |    MAT:0002 | —             |
| Element                       |      Helium | —             |
| Symbol                        |          He | —             |
| Atomic number                 |           2 | dimensionless |
| Proton count                  |           2 | proton        |
| Neutral electron count        |           2 | electron      |
| Period                        |           1 | —             |
| Group                         |          18 | noble gas     |
| Block                         |           s | —             |
| Ground electron configuration |         1s² | —             |
| Ground electronic level       | \(^{1}S_0\) | —             |
| Standard atomic weight        | 4.002602(2) | —             |

Primary sources:

```text
SRC-000005
SRC-000019
```

---

# 2. Closed-Shell Ground State

Neutral ground-state helium has:

$$
1s^2
$$

with ground level:

$$
{}^1S_0
$$

The two electrons occupy the 1s orbital with opposite spin projection in the ground-state configuration.

This produces a closed electronic shell.

Helium is therefore chemically much less reactive under ordinary conditions than Hydrogen.

This does **not** mean that Helium can never participate in:

* ions;
* excited states;
* excimers;
* molecular ions;
* plasma states;
* high-pressure interactions.

---

# 3. First Ionisation

For neutral helium:

$$
He
\rightarrow
He^+
+
e^-
$$

NIST evaluated ionization energy:

$$
E_{I1}
=
24.587389011\ \mathrm{eV}
$$

with uncertainty:

$$
2.5\times10^{-8}\ \mathrm{eV}
$$

Canonical ion:

```text
MAT:0002:ION:He+1
```

---

# 4. Second Ionisation

For singly ionized helium:

$$
He^+
\rightarrow
He^{2+}
+
e^-
$$

NIST evaluated ionization energy:

$$
E_{I2}
=
54.4177655282\ \mathrm{eV}
$$

Canonical fully stripped ion:

```text
MAT:0002:ION:He+2
```

---

# 5. Charge-State Family

Canonical primary charge states:

```text
MAT:0002:ATOM:He
MAT:0002:ION:He+1
MAT:0002:ION:He+2
```

They correspond conceptually to:

```text
He
He+
He2+
```

The fully ionized ⁴He nucleus is also an alpha particle:

$$
{}^4He^{2+}
\equiv
\alpha
$$

when nuclear identity is explicitly ⁴He.

The generic identifier:

```text
MAT:0002:ION:He+2
```

must therefore retain isotope identity when nuclear properties matter.

---

# 6. Neutral Helium Is Monatomic

Unlike Hydrogen under ordinary conditions, neutral elemental Helium is predominantly monatomic.

Therefore the ordinary material manifestation is:

$$
He
$$

rather than a stable neutral:

$$
He_2
$$

ground-state molecule analogous to H₂.

However specialized species can exist, including:

```text
He2+
excited helium dimers / excimers
cluster ions
helium plasma
```

These are dedicated child states and must not be confused with ordinary ground-state gaseous Helium.

---

# 7. Isotope Family

Current MAT evaluated isotope branch:

$$
{}^3He
$$

through:

$$
{}^{10}He
$$

The proton number remains:

$$
Z=2
$$

while neutron number changes:

$$
N=A-2
$$

---

# 8. Helium-3 — ³He

Canonical ID:

```text
MAT:0002:ISO:He-3
```

Composition:

```text
protons: 2
neutrons: 1
```

Relative atomic mass:

$$
3.0160293201(25)\ \mathrm u
$$

Status:

```text
STABLE
```

Nuclear spin/parity:

$$
\frac12^+
$$

Representative isotopic composition:

$$
0.00000134(3)
$$

This number is not universal for every terrestrial or extraterrestrial helium source.

³He has half-integer nuclear spin and is a **fermionic isotope**.

This distinction becomes critically important at ultralow temperatures.

---

# 9. Helium-4 — ⁴He

Canonical ID:

```text
MAT:0002:ISO:He-4
```

Composition:

```text
protons: 2
neutrons: 2
```

Relative atomic mass:

$$
4.00260325413(6)\ \mathrm u
$$

Status:

```text
STABLE
```

Nuclear spin/parity:

$$
0^+
$$

Representative isotopic composition:

$$
0.99999866(3)
$$

⁴He is a **bosonic isotope** because the nucleus has integer spin.

Its low-temperature collective behavior is therefore fundamentally different from ³He.

---

# 10. Stable-Isotope Quantum Statistics

The contrast:

$$
{}^3He
$$

versus:

$$
{}^4He
$$

is one of MAT's clearest examples of isotope identity producing emergent macroscopic differences.

### ³He

```text
nuclear spin: 1/2
statistics: fermionic
```

### ⁴He

```text
nuclear spin: 0
statistics: bosonic
```

This difference contributes directly to their very different quantum-fluid behavior.

The element name alone:

```text
Helium
```

is therefore insufficient to specify all cryogenic properties.

---

# 11. Helium-5 — ⁵He

Canonical ID:

```text
MAT:0002:ISO:He-5
```

Composition:

```text
protons: 2
neutrons: 3
```

Relative atomic mass:

$$
5.012057(21)\ \mathrm u
$$

Status:

```text
EXTREMELY-SHORT-LIVED
```

Evaluated lifetime:

$$
t_{1/2}
=
602\pm22\ \mathrm{ys}
$$

where:

$$
1\ \mathrm{ys}=10^{-24}\ \mathrm s
$$

Spin/parity:

$$
\frac32^-
$$

Principal decay:

```text
NEUTRON EMISSION
```

---

# 12. Helium-6 — ⁶He

Canonical ID:

```text
MAT:0002:ISO:He-6
```

Composition:

```text
protons: 2
neutrons: 4
```

Relative atomic mass:

$$
6.018885891(57)\ \mathrm u
$$

Status:

```text
RADIOACTIVE
```

Evaluated half-life:

$$
t_{1/2}
=
806.92\pm0.24\ \mathrm{ms}
$$

Spin/parity:

$$
0^+
$$

Principal decay class:

```text
BETA-MINUS
```

Canonical daughter family:

```text
MAT:0003:ISO:Li-6
```

The ⁶He nucleus is also an important neutron-rich nuclear-structure research system.

Detailed halo-nucleus properties belong to its child nuclear record rather than the parent element summary.

---

# 13. Helium-7 — ⁷He

Canonical ID:

```text
MAT:0002:ISO:He-7
```

Composition:

```text
protons: 2
neutrons: 5
```

Relative atomic mass:

$$
7.0279907(81)\ \mathrm u
$$

Evaluated lifetime:

$$
t_{1/2}
=
2.51\pm0.07\ \mathrm{zs}
$$

where:

$$
1\ \mathrm{zs}=10^{-21}\ \mathrm s
$$

Adopted spin/parity:

$$
\left(\frac32\right)^-
$$

Principal decay:

```text
NEUTRON EMISSION
```

---

# 14. Helium-8 — ⁸He

Canonical ID:

```text
MAT:0002:ISO:He-8
```

Composition:

```text
protons: 2
neutrons: 6
```

Relative atomic mass:

$$
8.033934390(95)\ \mathrm u
$$

Evaluated half-life:

$$
t_{1/2}
=
119.5\pm1.5\ \mathrm{ms}
$$

Spin/parity:

$$
0^+
$$

Dominant decay family:

```text
BETA-MINUS
```

with evaluated delayed-particle branches also present.

These branches should be represented explicitly in the dedicated isotope object.

---

# 15. Helium-9 — ⁹He

Canonical ID:

```text
MAT:0002:ISO:He-9
```

Composition:

```text
protons: 2
neutrons: 7
```

Relative atomic mass:

$$
9.043946(50)\ \mathrm u
$$

Evaluated lifetime:

$$
t_{1/2}
\approx
2.5\pm2.3\ \mathrm{zs}
$$

Adopted spin/parity:

$$
\frac12^{(+)}
$$

Principal decay:

```text
NEUTRON EMISSION
```

Large relative lifetime uncertainty must remain visible.

---

# 16. Helium-10 — ¹⁰He

Canonical ID:

```text
MAT:0002:ISO:He-10
```

Composition:

```text
protons: 2
neutrons: 8
```

Relative atomic mass:

$$
10.05279(11)\ \mathrm u
$$

Evaluated lifetime:

$$
t_{1/2}
=
260\pm40\ \mathrm{ys}
$$

Spin/parity:

$$
0^+
$$

Principal evaluated decay:

```text
TWO-NEUTRON EMISSION
```

Status:

```text
EXTREMELY-SHORT-LIVED
```

---

# 17. Nuclear-State Summary

| Isotope |  p |  n | Stability / Half-Life | Spin-Parity |
| ------- | -: | -: | --------------------- | ----------- |
| ³He     |  2 |  1 | STABLE                | 1/2+        |
| ⁴He     |  2 |  2 | STABLE                | 0+          |
| ⁵He     |  2 |  3 | 602 ± 22 ys           | 3/2−        |
| ⁶He     |  2 |  4 | 806.92 ± 0.24 ms      | 0+          |
| ⁷He     |  2 |  5 | 2.51 ± 0.07 zs        | (3/2)−      |
| ⁸He     |  2 |  6 | 119.5 ± 1.5 ms        | 0+          |
| ⁹He     |  2 |  7 | 2.5 ± 2.3 zs          | 1/2(+)      |
| ¹⁰He    |  2 |  8 | 260 ± 40 ys           | 0+          |

Stable isotopes use:

```text
half_life: NOT-APPLICABLE
```

rather than:

```text
infinity
```

---

# 18. Atomic Excitation

Selected neutral-helium excitation energies include approximately:

| Transition Family | Excitation Energy |
| ----------------- | ----------------: |
| 1s² → 1s2p        |        21.2180 eV |
| 1s² → 1s3p        |        23.0870 eV |
| 1s² → 1s4p        |        23.7421 eV |
| 1s² → 1s5p        |        24.0458 eV |
| 1s² → 1s6p        |        24.2110 eV |

The excitation series approaches the first ionization threshold.

These simplified transition labels do not replace full singlet/triplet and fine-structure-resolved spectroscopy.

---

# 19. Singlet and Triplet Electronic Structure

Helium's two-electron system introduces behavior absent from one-electron Hydrogen.

Electronic states may be classified into:

```text
SINGLET
TRIPLET
```

spin families.

This provides an important MAT progression:

```text
Hydrogen
→ one-electron benchmark

Helium
→ interacting two-electron benchmark
```

Electron-electron interaction means Helium is no longer exactly described by the simplest one-electron Coulomb solution.

Approximation and numerical methods become much more important.

---

# 20. Quantum-Mechanical Importance

Helium is a fundamental test system for:

* electron correlation;
* variational methods;
* perturbation theory;
* quantum electrodynamics;
* precision spectroscopy;
* many-body approximations.

The basic Hamiltonian includes:

```text
electron-nucleus attraction
+
electron-nucleus attraction
+
electron-electron repulsion
```

The electron-electron term is what prevents simple separation into two completely independent Hydrogen-like electrons.

---

# 21. Ordinary Chemical State

Under ordinary conditions Helium is a noble gas with very low chemical reactivity.

Canonical ordinary state:

```text
monatomic neutral He
```

Helium therefore differs fundamentally from Hydrogen's ordinary molecular state:

```text
H2
```

Ordinary bulk elemental Helium is monatomic.

However, neutral \(^{4}He_2\) does possess an extraordinarily weak
van-der-Waals bound state.

Therefore:

\[
\boxed{
\text{He}_2\text{ exists as a fragile quantum dimer}
\neq
\text{ordinary bulk Helium is molecular}
}
\]

This differs fundamentally from Hydrogen, whose ordinary elemental
gas is predominantly \(H_2\).

---

# 22. Excited Molecular and Ionic Helium

Specialized Helium species can nevertheless include:

```text
He2+
excited He2*
cluster ions
excited atomic He*
```

These states matter in:

* electrical discharges;
* plasma;
* spectroscopy;
* excimer physics;
* ion chemistry.

They must remain separate from the ordinary neutral atomic state.

---

# 23. Cryogenic ⁴He Branch

Canonical branch:

```text
MAT:0002:ISO:He-4
    ↓
MAT:0002:PHASE:He4-LIQUID
```

Important reference values include:

### Normal boiling point

$$
T_b
=
4.2221\ \mathrm K
$$

at:

$$
P=101325\ \mathrm{Pa}
$$

### Critical point

$$
T_c
=
5.1953\ \mathrm K
$$

$$
P_c
=
227460\ \mathrm{Pa}
$$

### Lower lambda point

$$
T_\lambda
=
2.1768\ \mathrm K
$$

The lambda transition separates:

```text
He I
normal liquid
```

from:

```text
He II
superfluid liquid
```

under the specified pressure/state conditions.

---

# 24. He I and He II

For ⁴He:

```text
He I
```

denotes the normal liquid phase above the lambda transition within the relevant liquid region.

```text
He II
```

denotes the superfluid phase below the lambda transition.

This is an emergent collective quantum state.

It is not a change in chemical element identity.

$$
{}^4He
$$

remains ⁴He on both sides of the phase transition.

---

# 25. Helium-3 Quantum Fluid

Liquid ³He also develops superfluid phases, but at temperatures far below the ordinary ⁴He lambda transition.

The exact transition depends on:

* pressure;
* phase;
* magnetic conditions.

Therefore MAT does **not** assign one universal:

```text
helium_superfluid_temperature
```

property.

Instead:

```text
3He superfluid state
```

and:

```text
4He He-II state
```

are separate phase records.

---

# 26. Solidification

Helium has an unusual phase diagram.

At low pressure, ordinary cooling does not produce the conventional liquid-solid triple-point sequence found in many substances.

Solid Helium requires elevated pressure.

MAT will therefore store:

```text
melting pressure
temperature
isotope
phase
```

together.

A generic:

```text
helium melting point
```

without pressure is scientifically incomplete.

---

# 27. Frequency and Spectral Structure

Helium has many distinct spectral mechanisms.

Relevant categories include:

```text
atomic electronic transitions
fine structure
metastable-state transitions
isotope shifts
hyperfine structure in 3He
plasma emission
ion spectra
excimer spectra
NMR for 3He
collective excitations in liquid helium
```

There is no universal scalar:

```text
helium_frequency
```

---

# 28. Magnetic-State Distinction

Ground-state ⁴He has:

$$
I=0
$$

while ³He has:

$$
I=\frac12
$$

Therefore magnetic-resonance and nuclear-spin behavior are isotope-dependent.

Helium is **not** represented as a conventional permanent-magnet material.

Engineered magnetization fields such as:

```text
axial
radial
multipole permanent magnetisation
```

are:

```text
NOT-APPLICABLE
```

to free bulk Helium as a conventional permanent magnetic solid.

---

# 29. Plasma Branch

Canonical family:

```text
MAT:0002:PLASMA:He
```

Possible species include:

```text
He
He*
He+
He2+
electrons
molecular/cluster ions
```

A Helium plasma record requires:

```yaml
electron_temperature:
ion_temperature:
electron_density:
ion_density:
neutral_density:
species_distribution:
pressure:
electric_field:
magnetic_field:
frequency:
time:
```

---

# 30. Material Interaction

Helium can interact with materials through:

* implantation;
* diffusion;
* trapping;
* bubble formation;
* irradiation damage coupling;
* leak/permeation behavior;
* cryogenic thermal contact.

These are host-material relationships.

They are not intrinsic mechanical properties of elemental Helium.

---

# 31. Nuclear Relationship to Hydrogen

The Hydrogen record already contains:

$$
{}^3H
\rightarrow
{}^3He
+
e^-
+
\bar{\nu}_e
$$

Therefore:

```text
MAT:0002:ISO:He-3
```

is the daughter nucleus of tritium beta decay.

Likewise the D-T fusion branch produces:

$$
{}^4He
$$

plus a neutron.

These forward relationships should now be changed from:

```text
RESERVED-PENDING-RECORD
```

to:

```text
RESOLVED
```

once the corresponding Helium isotope child files exist.

---

# 32. Applications

Major Helium application relationships include:

```text
CRYOGENICS
SUPERCONDUCTING MAGNET COOLING
LOW-TEMPERATURE PHYSICS
LEAK DETECTION
PRESSURIZATION / PURGING
INERT ATMOSPHERES
SEMICONDUCTOR PROCESSING
SHIELDING GAS
BALLOONS / LIFT
MASS SPECTROMETRY
GAS CHROMATOGRAPHY
PLASMA / SPECTROSCOPY
NUCLEAR SCIENCE
NEUTRON DETECTION WITH 3He
QUANTUM RESEARCH
```

Each application should eventually specify the relevant isotope and material state.

---

# 33. Safety

Helium is not ordinarily a flammable gas.

Important hazards are primarily physical and state-dependent:

```text
COMPRESSED-GAS HAZARD
CRYOGENIC HAZARD
OXYGEN-DISPLACEMENT / ASPHYXIATION
PRESSURE BUILDUP
MATERIAL BRITTLENESS AT CRYOGENIC TEMPERATURE
```

Cryogenic Helium also requires consideration of very high expansion from liquid to gas and appropriate ventilation/pressure-relief design.

³He and ⁴He are stable and nonradioactive.

Short-lived artificial Helium isotopes require isotope-specific nuclear/radiological treatment.

---

# 34. MAT State Cloud

The Helium parent should eventually resolve to a state network such as:

$$
\{
{}^3He,
{}^4He,
{}^5He,
{}^6He,
{}^7He,
{}^8He,
{}^9He,
{}^{10}He,
He,
He^+,
He^{2+},
He^*,
He_2^+,
He_2^*,
He_{\rm I},
He_{\rm II},
{}^3He_{\rm liquid},
{}^3He_{\rm superfluid},
He_{\rm solid},
He_{\rm plasma},
\dots
\}
$$

This demonstrates again:

$$
\boxed{
\text{element identity}
\neq
\text{complete state identity}
}
$$

---

# 35. Initial Visual Placeholders

```markdown
<!-- MAT-VISUAL: V01 -->
<!-- ASSET-ID: MAT:0002:FIG:V01:001 -->
<!-- DESCRIPTION: Physical manifestation of liquid/gaseous Helium -->

<!-- MAT-VISUAL: V02 -->
<!-- ASSET-ID: MAT:0002:FIG:V02:001 -->
<!-- DESCRIPTION: Conventional Helium atomic identity -->

<!-- MAT-VISUAL: V04 -->
<!-- ASSET-ID: MAT:0002:FIG:V04:001 -->
<!-- DESCRIPTION: Two-electron Helium ground-state probability representation -->

<!-- MAT-VISUAL: V05 -->
<!-- ASSET-ID: MAT:0002:FIG:V05:001 -->
<!-- DESCRIPTION: Helium isotope map 3He through 10He -->

<!-- MAT-VISUAL: V06 -->
<!-- ASSET-ID: MAT:0002:FIG:V06:001 -->
<!-- DESCRIPTION: Mechanism-resolved Helium spectral fingerprint -->

<!-- MAT-VISUAL: V10 -->
<!-- ASSET-ID: MAT:0002:FIG:V10:001 -->
<!-- DESCRIPTION: He-I / He-II / cryogenic phase visualization -->
```

---

# 36. Governing Principle Families

```yaml
governed_by:

  atomic_structure:
    - MAT-QM-003
    - MAT-QM-006
    - MAT-QM-010
    - MAT-QM-011
    - MAT-QM-026

  electron_correlation:
    - MAT-QM-034
    - MAT-QM-035

  ionization:
    - MAT-QM-016

  isotope_nuclear_state:
    - MAT-NUC-001
    - MAT-NUC-002
    - MAT-NUC-003
    - MAT-NUC-006
    - MAT-NUC-007

  phase_behavior:
    - MAT-THERMO-010
    - MAT-THERMO-012
    - MAT-THERMO-023
    - MAT-THERMO-024

  quantum_statistics:
    - MAT-QM-011
    - MAT-QM-030
    - MAT-QM-031

  field_response:
    - MAT-PHYS-021
    - MAT-QM-019
```

---

# 37. Evidence Summary

```yaml
atomic_identity:
  evidence_type: REPLICATED
  confidence: A

ionization_energies:
  evidence_type: EVALUATED
  confidence: A

stable_isotope_masses:
  evidence_type: EVALUATED
  confidence: A

short_lived_isotope_states:
  evidence_type: EVALUATED-NUCLEAR-DATA
  confidence: A-B

helium4_thermophysics:
  evidence_type: EVALUATED
  confidence: A

helium3_quantum_fluid:
  evidence_type: ESTABLISHED-EXPERIMENTAL-FIELD
  confidence: A

high_pressure_and_extreme_states:
  evidence_type: MIXED
  confidence: VARIABLE
```

---

# 38. Migration Status

```yaml
legacy_record: G0002

migration:
  identity: CORE-COMPLETE
  electronic: CORE-COMPLETE
  ionization: CORE-COMPLETE
  isotope_branch: CORE-COMPLETE
  nuclear: CORE-COMPLETE
  quantum_fluid: CORE-COMPLETE
  cryogenic: CORE-COMPLETE
  spectroscopy: PARTIAL
  chemistry: CORE-COMPLETE
  plasma: CORE-COMPLETE
  material_interactions: CORE-COMPLETE
  applications: CORE-COMPLETE
  safety: CORE-COMPLETE

remaining:
  - full spectral dataset
  - detailed He3 thermophysical data
  - detailed He4 thermophysical data
  - phase diagrams
  - molecular ion children
  - excimer children
  - calculations
  - experiment registry
  - relationship registry
  - people and intellectual lineage
  - visual manifest
  - graph manifest
  - table manifest
  - legacy G0002 audit
```

---

# 39. Current Record Status

```yaml
status: "RESEARCHED"
completeness: "RESEARCHED"
migration_status: "MIGRATED-PENDING-ARCHIVE"
validation:
  schema: "PASS"
  identifiers: "PASS"
  source_registry: "PASS"
  relationship_architecture: "PASS"
  evidence_architecture: "PASS"
  scientific_core: "CORE-VALIDATED"
  exhaustive_content: false
visuals:
  specification: "LOCKED"
  generated: false
```
