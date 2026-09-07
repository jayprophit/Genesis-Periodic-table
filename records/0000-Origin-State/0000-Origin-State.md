# 0000 — Origin State

```yaml
mat_id: MAT:0000
record_name: Origin State
symbol: null
record_class: FOUNDATION_REFERENCE
chemical_element: false
atomic_number: NOT-APPLICABLE
parent_id: null
schema_version: 1.0.0
record_version: 1.0.0
status: RESEARCHED
legacy_id: G0000
legacy_name: Universal Reference / Origin State
```

# 0. Record Role

`MAT:0000` is the root reference record of the Materials Atlas Table Codex.

It is **not a chemical element**.

It does not represent a newly proposed particle, substance, atom, field or physical material.

It provides the formal reference architecture against which MAT states can be compared.

Conceptually:

$$
\boxed{
MAT:0000
=
\text{reference origin for MAT state comparison}
}
$$

The term **Origin State** refers primarily to an informational and mathematical origin.

It does not mean literal physical nothingness.

---

# 1. Why 0000 Exists

Most physical measurements are comparisons.

Examples include:

$$
\Delta T=T-T_\mathrm{ref}
$$

$$
\Delta P=P-P_\mathrm{ref}
$$

$$
\Delta V=V-V_\mathrm{ref}
$$

$$
\Delta B=B-B_\mathrm{ref}
$$

MAT therefore requires explicit reference states.

Without a defined reference, the statement:

```text
difference = 5
```

is scientifically incomplete.

MAT asks:

```text
5 WHAT?
relative to WHAT?
under WHICH CONDITIONS?
using WHICH UNIT?
```

---

# 2. 0000 Is Not Literal Nothing

MAT does not define `0000` as an experimentally demonstrated state of absolute nothingness.

Several physically different concepts are sometimes described informally as "zero" or "empty":

* zero on a coordinate axis;
* zero applied electric field;
* zero applied magnetic field;
* zero gauge potential;
* vacuum;
* thermodynamic absolute zero;
* quantum ground state;
* quantum vacuum;
* absence of added reactant;
* zero mechanical strain;
* time origin;
* process-start condition.

These concepts are not interchangeable.

MAT therefore uses separate reference channels.

---

# 3. Mathematical Origin

For a dimensionless normalized MAT state vector:

$$
\mathbf z
=
(z_1,z_2,\ldots,z_n)
$$

the computational reference origin may be represented:

$$
\mathbf z_0
=
(0,0,\ldots,0)
$$

and differences calculated:

$$
\Delta\mathbf z_i
=
\mathbf z_i-\mathbf z_0
$$

or between two states:

$$
\Delta\mathbf z_{ij}
=
\mathbf z_i-\mathbf z_j
$$

This representation is valid only after the coordinates have been defined consistently.

A raw vector containing incompatible physical dimensions must **not** be subtracted as though every component had the same unit.

For example:

```text
temperature in K
pressure in Pa
magnetic field in T
density in kg/m^3
```

cannot simply be numerically combined without a defined transformation or normalization.

---

# 4. Typed Physical Difference

For an individual physical quantity \(q\):

$$
\Delta q
=
q-q_\mathrm{ref}
$$

Examples:

$$
\Delta T
=
T-T_\mathrm{ref}
$$

$$
\Delta P
=
P-P_\mathrm{ref}
$$

$$
\Delta B
=
B-B_\mathrm{ref}
$$

$$
\Delta E_\mathrm{field}
=
E_\mathrm{field}-E_{\mathrm{field,ref}}
$$

The reference used must be identified.

---

# 5. Dimensionless Normalized Coordinate

When MAT eventually compares unlike properties within a common multidimensional state space, each quantity should first be transformed.

A generic form is:

$$
z_q
=
N_q(q,q_\mathrm{ref},s_q)
$$

A simple example is:

$$
z_q
=
\frac{q-q_\mathrm{ref}}{s_q}
$$

where \(s_q\) is a scientifically defined scale for quantity \(q\).

The transformation \(N_q\) must be stored.

This prevents arbitrary mixing of incompatible units.

---

# 6. Reference-State Channels

`MAT:0000` contains multiple reference channels rather than one claimed universal physical zero.

Canonical channels are:

```text
MAT:0000:REF:ORIGIN
MAT:0000:REF:LAB
MAT:0000:REF:THERMO
MAT:0000:REF:T0
MAT:0000:REF:P0
MAT:0000:REF:E0
MAT:0000:REF:B0
MAT:0000:REF:R0
MAT:0000:REF:N0
MAT:0000:REF:C0
MAT:0000:REF:S0
MAT:0000:REF:X0
MAT:0000:REF:TIME0
MAT:0000:REF:VAC
MAT:0000:REF:QV
```

---

# 7. ORIGIN — Computational Coordinate Origin

```yaml
reference_id: MAT:0000:REF:ORIGIN
type: COMPUTATIONAL
```

Purpose:

Defines the zero coordinate used after MAT properties have been transformed into a compatible normalized representation.

It is not asserted to be a physical material state.

---

# 8. LAB — Laboratory Baseline

```yaml
reference_id: MAT:0000:REF:LAB
type: EXPERIMENTAL_REFERENCE
```

A laboratory baseline must explicitly define applicable quantities such as:

* temperature;
* pressure;
* humidity;
* atmosphere;
* electric field;
* magnetic field;
* radiation background;
* vibration;
* gravity;
* sample geometry;
* instrument state.

`LAB` without its associated conditions is incomplete.

---

# 9. THERMO — Thermodynamic / Chemical Reference

```yaml
reference_id: MAT:0000:REF:THERMO
type: THERMODYNAMIC_REFERENCE
```

This reference is used for thermodynamic or chemical comparison.

It must specify:

* temperature;
* pressure;
* composition;
* phase;
* standard/reference-state convention.

A "standard state" is therefore not treated as a physically universal state independent of convention.

---

# 10. T0 — Temperature Reference

```yaml
reference_id: MAT:0000:REF:T0
type: TEMPERATURE_REFERENCE
quantity: thermodynamic_temperature
canonical_unit: K
```

Defines:

$$
\Delta T=T-T_0
$$

`T0` means a **selected reference temperature**.

It does not automatically mean:

$$
T_0=0\ \mathrm K
$$

unless explicitly defined that way.

---

# 11. Absolute Zero

Thermodynamic zero is:

$$
T=0\ \mathrm K
$$

within the thermodynamic temperature scale.

MAT does not equate:

```text
0 K
```

with:

```text
zero energy
```

or:

```text
absence of quantum motion
```

or:

```text
literal nothingness
```

These are different concepts.

---

# 12. P0 — Pressure Reference

```yaml
reference_id: MAT:0000:REF:P0
type: PRESSURE_REFERENCE
canonical_unit: Pa
```

Defines:

$$
\Delta P=P-P_0
$$

The selected pressure must be recorded numerically.

---

# 13. VAC — Laboratory Vacuum Reference

```yaml
reference_id: MAT:0000:REF:VAC
type: VACUUM_REFERENCE
```

A laboratory vacuum is defined through measurable physical conditions rather than simply:

```text
vacuum = nothing
```

Store where relevant:

* pressure;
* residual gas composition;
* temperature;
* chamber geometry;
* pumping state;
* outgassing;
* electromagnetic environment.

`VAC` is separate from `QV`.

---

# 14. E0 — Zero Specified Externally Applied Electric Field

```yaml
reference_id: MAT:0000:REF:E0
type: ELECTRIC_FIELD_REFERENCE
nominal_external_field: 0
canonical_unit: V/m
```

This means:

```text
no specified externally applied electric field
```

within a defined experimental frame.

It does **not** mean that all microscopic or fluctuating electromagnetic fields everywhere are physically absent.

---

# 15. B0 — Zero Specified Externally Applied Magnetic Field

```yaml
reference_id: MAT:0000:REF:B0
type: MAGNETIC_FIELD_REFERENCE
nominal_external_flux_density: 0
canonical_unit: T
```

Defines, where appropriate:

$$
\Delta B=B-B_0
$$

This is an applied-field reference.

It must not be confused with:

* intrinsic magnetic moments;
* internal magnetic fields;
* remanent magnetization;
* magnetic domains;
* environmental background fields;
* quantum-field fluctuations.

---

# 16. R0 — Radiation Reference

```yaml
reference_id: MAT:0000:REF:R0
type: RADIATION_REFERENCE
```

`R0` means no **specified added radiation source** above the defined reference environment.

It does not automatically imply absolute zero radiation.

The background must be specified where scientifically relevant.

---

# 17. N0 — No Added Species Reference

```yaml
reference_id: MAT:0000:REF:N0
type: SPECIES_ADDITION_REFERENCE
```

This means:

```text
no additional specified atomic or nuclear species introduced
```

relative to a stated starting composition.

It does not mean the universe or experimental chamber contains no particles.

---

# 18. C0 — No Added Chemical Reactant

```yaml
reference_id: MAT:0000:REF:C0
type: CHEMICAL_ADDITION_REFERENCE
```

Defines the starting chemical composition before a selected reagent or reactant is introduced.

---

# 19. S0 — Unstrained Structural Reference

```yaml
reference_id: MAT:0000:REF:S0
type: MECHANICAL_REFERENCE
```

For a suitable deformation measure:

$$
\epsilon_0=0
$$

may define the selected unstrained configuration.

This reference depends on the chosen stress/strain model and reference geometry.

---

# 20. X0 — Process-Start State

```yaml
reference_id: MAT:0000:REF:X0
type: PROCESS_REFERENCE
```

Represents the complete recorded state immediately before a process or intervention.

Conceptually:

$$
X_0
\xrightarrow{P}
X_1
$$

where \(P\) is the applied process.

`X0` is particularly important for:

* heat treatment;
* synthesis;
* deformation;
* irradiation;
* magnetization;
* chemical reaction;
* phase transformation;
* experimental tests.

---

# 21. TIME0 — Time Origin

```yaml
reference_id: MAT:0000:REF:TIME0
type: TEMPORAL_REFERENCE
```

Defines:

$$
\Delta t=t-t_0
$$

The choice of \(t_0\) depends on the experiment or model.

Examples:

```text
start of heating
start of irradiation
sample manufacture
start of measurement
reaction initiation
```

---

# 22. QV — Quantum-Vacuum Reference

```yaml
reference_id: MAT:0000:REF:QV
type: THEORETICAL_PHYSICAL_REFERENCE
```

The quantum-vacuum reference represents a vacuum state defined within a specified quantum-field-theory model.

It is not defined as classical empty nothingness.

A QV record must identify:

* theory/model;
* fields included;
* spacetime/background assumptions;
* boundary conditions;
* observer/frame dependence where relevant;
* renormalization convention where relevant;
* calculated quantity;
* evidence.

MAT does not assume that one unqualified `QV` object acts as a universal absolute zero for every physical theory.

---

# 23. Zero Energy

MAT distinguishes several concepts:

```text
zero potential-energy reference
zero Hamiltonian eigenvalue
ground-state energy
zero-point energy
vacuum-energy reference
zero measured energy transfer
```

They are not interchangeable.

A shift of energy reference:

$$
E'=E+C
$$

may leave many observable energy differences unchanged:

$$
\Delta E
=
E_2-E_1
$$

Therefore a recorded numerical energy zero must state its physical and mathematical convention.

---

# 24. Ground State

The ground state of a particular physical system is its lowest-energy state under the specified Hamiltonian/model.

It is not automatically:

```text
MAT:0000
```

An atom, molecule, crystal or field can possess its own ground-state object.

---

# 25. Quantum Zero-Point State

Quantum systems can retain nonzero ground-state fluctuations.

Therefore:

```text
thermodynamic zero
```

and:

```text
classical absence of motion
```

must not be treated as universally equivalent.

---

# 26. Origin Versus Cosmological Origin

The name **Origin State** does not assert that `MAT:0000` is the experimentally established physical state from which the universe originated.

Cosmological-origin models belong to:

```text
COSMOLOGY
```

and must carry their own:

* evidence;
* equations;
* observations;
* uncertainties;
* theoretical status.

`MAT:0000` is primarily the root of the **MAT coordinate and reference system**.

---

# 27. Origin Versus Physical Singularity

MAT does not define:

$$
MAT:0000
=
\text{physical singularity}
$$

A mathematical coordinate origin and a gravitational/cosmological singularity are separate concepts.

---

# 28. State Comparison

For two physically comparable states \(i\) and \(j\):

$$
\Delta q_{ij}
=
q_i-q_j
$$

for each meaningful quantity \(q\).

A MAT comparison object should therefore contain:

```yaml
source_state:
target_state:
property:
source_value:
target_value:
unit:
difference:
uncertainty:
conditions:
```

---

# 29. Vector State Comparison

When several quantities have been normalized:

$$
\mathbf z_i
=
(z_{i1},z_{i2},\ldots,z_{in})
$$

then:

$$
\Delta\mathbf z_{ij}
=
\mathbf z_i-\mathbf z_j
$$

may be calculated.

A distance metric may later be introduced:

$$
d(i,j)
=
d(\mathbf z_i,\mathbf z_j)
$$

but MAT currently assumes **no universal material-state distance metric**.

The metric must be selected for the scientific problem.

---

# 30. Reference Transform

A future MAT comparison engine may use:

$$
\mathcal R_q:
q
\rightarrow
(q-q_\mathrm{ref})
$$

followed by normalization:

$$
\mathcal N_q:
(q-q_\mathrm{ref})
\rightarrow
z_q
$$

and then state construction:

$$
\mathbf z
=
[
z_1,z_2,\ldots,z_n
]
$$

Every transformation must remain reconstructable.

---

# 31. Causali E Mapping

`MAT:0000` also provides a clean reference interface for exploring Causali E.

A developing formal mapping is:

$$
A=\text{intervention/change}
$$

$$
B=\text{current/reference state plus retained constraints}
$$

$$
C=\text{resulting or accessible state}
$$

which can be represented more rigorously as:

$$
C
=
F(S_0,A,B,E,t)
$$

or probabilistically:

$$
P(C\mid S_0,A,B,E)
$$

This is a MAT/Causali E research interpretation.

It does not replace established physical equations governing the process.

---

# 32. Branching Accessible States

From state \(S_0\):

$$
S_0
\rightarrow
\{
S_1,S_2,\ldots,S_n
\}
$$

may represent multiple candidate outcomes.

MAT then applies:

```text
MATHEMATICAL CONSISTENCY
↓
CONSERVATION LAWS
↓
PHYSICS
↓
CHEMISTRY
↓
THERMODYNAMICS
↓
KINETICS
↓
EVIDENCE
↓
SAFETY
```

before treating a candidate pathway as physically credible.

---

# 33. Null-State Separation

`0000` must not become the null value for the database.

These are different:

```text
MAT:0000
UNKNOWN
NOT-MEASURED
NOT-AVAILABLE
NOT-APPLICABLE
NOT-ESTABLISHED
ZERO
```

For example:

```yaml
half_life: NOT-APPLICABLE
```

does not mean:

```yaml
half_life: 0
```

and does not mean:

```yaml
half_life: MAT:0000
```

---

# 34. Atomic Identity

```yaml
atomic_number: NOT-APPLICABLE
proton_count: NOT-APPLICABLE
neutron_count: NOT-APPLICABLE
electron_count: NOT-APPLICABLE
atomic_mass: NOT-APPLICABLE
electron_configuration: NOT-APPLICABLE
```

`MAT:0000` is not a zeroth chemical element.

---

# 35. Nuclear Identity

```yaml
isotopes: NOT-APPLICABLE
nuclear_spin: NOT-APPLICABLE
half_life: NOT-APPLICABLE
decay_mode: NOT-APPLICABLE
```

---

# 36. Chemical Identity

```yaml
chemical_formula: NOT-APPLICABLE
oxidation_state: NOT-APPLICABLE
bonding: NOT-APPLICABLE
```

---

# 37. Mechanical / Material Identity

`MAT:0000` has no intrinsic:

* Young's modulus;
* hardness;
* density;
* crystal structure;
* thermal conductivity;
* tensile strength.

Those properties belong to physical material records.

---

# 38. Frequency

`MAT:0000` has no universal intrinsic scalar frequency.

Reference frequencies may be selected for:

* spectral calculations;
* Fourier analysis;
* instrument calibration;
* transition comparison;

but they belong to the corresponding reference channel or experiment.

---

# 39. Magnetic Identity

`MAT:0000` is not intrinsically:

```text
diamagnetic
paramagnetic
ferromagnetic
antiferromagnetic
ferrimagnetic
```

`B0` is a field-reference convention, not a material magnetic phase.

---

# 40. Electrical Identity

Likewise, `E0` is a reference condition.

It does not make `MAT:0000` a conductor, insulator, semiconductor or dielectric.

---

# 41. Temperature Identity

`T0` is a selected temperature reference.

`MAT:0000` itself does not possess one intrinsic material temperature.

---

# 42. Pressure Identity

`P0` is a selected pressure reference.

`MAT:0000` itself does not possess one intrinsic physical pressure.

---

# 43. Reference Hierarchy

Conceptually:

```text
MAT:0000
│
├── ORIGIN
│   └── normalized computational origin
│
├── LAB
│   └── laboratory baseline
│
├── THERMO
│   └── thermodynamic / chemical reference
│
├── T0
│   └── temperature reference
│
├── P0
│   └── pressure reference
│
├── E0
│   └── applied electric-field reference
│
├── B0
│   └── applied magnetic-field reference
│
├── R0
│   └── radiation reference
│
├── N0
│   └── species-addition reference
│
├── C0
│   └── chemical-addition reference
│
├── S0
│   └── mechanical reference
│
├── X0
│   └── process-start reference
│
├── TIME0
│   └── temporal origin
│
├── VAC
│   └── laboratory vacuum reference
│
└── QV
    └── model-defined quantum-vacuum reference
```

---

# 44. Visual System

## V01 — Natural / Material Manifestation

```text
NOT-APPLICABLE
```

`MAT:0000` is not a sample of matter.

---

## V02 — Conventional Scientific Representation

Planned asset:

```text
0000-Origin-State-DIAGRAM-001-Reference-Origin.svg
```

Show the MAT coordinate origin and reference channels.

---

## V03 — Bonding / Molecular / Lattice

```text
NOT-APPLICABLE
```

---

## V04 — Quantum Representation

Planned:

```text
0000-Origin-State-DIAGRAM-002-Quantum-Vacuum-Reference.svg
```

Classification:

```text
SCIENTIFIC-SCHEMATIC
```

It must explicitly state that a quantum vacuum is not classical empty space.

---

## V05 — Isotope / Nuclear Variants

```text
NOT-APPLICABLE
```

---

## V06 — Spectral / Frequency

Planned:

```text
0000-Origin-State-DIAGRAM-003-Frequency-Reference-Axes.svg
```

This shows frequency as a measurement coordinate rather than assigning an intrinsic frequency to `0000`.

---

## V07 — Physical Reference Dashboard

Planned:

```text
0000-Origin-State-FIG-001-Reference-Channels.svg
```

---

## V08 — Electrical Reference

Show:

$$
E_\mathrm{applied}=0
$$

as a selected external-field reference.

---

## V09 — Magnetic Reference

Show:

$$
B_\mathrm{applied}=0
$$

as a selected external-field reference.

---

## V10 — Thermal Reference

Show:

$$
T-T_0
$$

without implying \(T_0=0\ \mathrm K\) unless explicitly selected.

---

## V11 — Mechanical Reference

Show:

$$
\epsilon-\epsilon_0
$$

with selected unstrained state.

---

## V12 — Pressure / Environment

Show:

* `P0`;
* `VAC`;
* `LAB`;
* `THERMO`.

---

## V13 — Process

Show:

$$
X_0
\rightarrow
P
\rightarrow
X_1
$$

---

## V14 — Relationship Graph

Show `MAT:0000` connected to every reference channel.

---

## V15 — Scientific 3D Model

```text
NOT-APPLICABLE
```

There is no scientifically literal 3D physical object represented by `0000`.

---

## V16 — Data-Extruded 3D Model

Optional conceptual model:

```text
0000-Origin-State-MODEL-DATA-001.glb
```

It must be labelled:

```text
DATA VISUALIZATION — NOT PHYSICAL ORIGIN GEOMETRY
```

---

## V17 — Application

Primary application:

```text
MAT REFERENCE AND COMPARISON SYSTEM
```

---

## V18 — Evidence / Provenance

Show distinction between:

```text
MATHEMATICAL CONVENTION
PHYSICAL REFERENCE
MEASUREMENT
THEORETICAL MODEL
HYPOTHESIS
```

---

# 45. Governing Principles

Primary MAT principle families:

```yaml
governed_by:
  - MAT-MATH-002
  - MAT-MATH-021
  - MAT-MATH-025
  - MAT-MATH-034
  - MAT-MATH-047
  - MAT-PHYS-022
  - MAT-PHYS-032
  - MAT-THERMO-001
  - MAT-THERMO-005
  - MAT-QM-003
  - MAT-QM-005
  - MAT-SYS-002
  - MAT-SYS-003
  - MAT-INFO-011
  - MAT-CAUSAL-004
```

Not every principle applies to every reference mode.

---

# 46. Scientific Classification

The concepts inside `0000` have different statuses.

| Concept                        | Status                                              |
| ------------------------------ | --------------------------------------------------- |
| Coordinate origin              | MATHEMATICAL-CONVENTION                             |
| Difference from reference      | ESTABLISHED-MATHEMATICS                             |
| Laboratory baseline            | EXPERIMENTAL-CONVENTION                             |
| Temperature reference          | METROLOGICAL-CONVENTION                             |
| Pressure reference             | METROLOGICAL-CONVENTION                             |
| Zero applied E field           | EXPERIMENTAL-REFERENCE                              |
| Zero applied B field           | EXPERIMENTAL-REFERENCE                              |
| Quantum vacuum                 | ESTABLISHED-THEORETICAL-FRAMEWORK / MODEL-DEPENDENT |
| Absolute physical nothingness  | NOT-DEFINED-BY-MAT                                  |
| Causali E A/B/C interpretation | AUTHOR-FRAMEWORK                                    |
| Branching causal search        | DEVELOPING-MAT-METHOD                               |
| Physical retrocausality        | NOT-ESTABLISHED                                     |
| Branching physical timelines   | SPECULATIVE                                         |

---

# 47. Evidence Rule

The root record must never use its special position to bypass evidence requirements.

`MAT:0000` is governed by the same distinction between:

```text
MEASURED
REPLICATED
THEORETICAL
COMPUTATIONAL
HYPOTHESIS
UNVERIFIED
```

as every later record.

---

# 48. Relationship to 0001

The next primary chemical-element record is:

```text
MAT:0001
0001-Hydrogen-H
```

`MAT:0001` does not derive chemically from `MAT:0000`.

Rather:

```text
MAT:0000
```

provides the reference framework within which measurements and states of:

```text
MAT:0001
```

can be expressed.

---

# 49. Open Research Questions

1. Which normalization methods should MAT use for cross-property state-space visualization?

2. Should normalization be global, domain-specific or query-specific?

3. Which state-distance metrics are scientifically useful for materials comparison?

4. How should covariance between MAT dimensions be preserved?

5. How should quantum reference states be represented across incompatible physical models?

6. How should laboratory background electromagnetic/radiation conditions be standardized?

7. Which reference channels should be mandatory for different record classes?

8. Can Causali E provide useful predictive state-search capability beyond standard graph, causal and optimization methods?

---

# 50. Core 0000 Rule

$$
\boxed{
\text{ZERO VALUE}
\neq
\text{MISSING VALUE}
\neq
\text{REFERENCE VALUE}
\neq
\text{PHYSICAL NOTHINGNESS}
}
$$

This distinction is foundational to MAT.

---

# 51. Final Record Definition

```yaml
mat_id: MAT:0000
type: FOUNDATION_REFERENCE
chemical_element: false

function:
  - root reference for MAT
  - coordinate comparison
  - reference-state registry
  - state-difference definition
  - experiment/process baseline system

contains:
  - computational origin
  - laboratory reference
  - thermodynamic reference
  - temperature reference
  - pressure reference
  - electric-field reference
  - magnetic-field reference
  - radiation reference
  - species-addition reference
  - chemical-addition reference
  - mechanical reference
  - process-start reference
  - temporal reference
  - laboratory-vacuum reference
  - quantum-vacuum reference

does_not_represent:
  - chemical element
  - atom
  - isotope
  - physical particle
  - literal nothingness
  - universal quantum vacuum
  - cosmological singularity
  - universal zero energy

status: RESEARCHED
```

---

# 52. Migration Status

Legacy source:

```text
G0000 — Universal Reference / Origin State
```

Migration status:

```text
IN-PROGRESS
```

Do not mark:

```text
VALIDATED
```

until the structured registry, equations, references and internal links have been checked.

---

# 53. Revision History

| Version | Status     | Change                                                                  |
| ------- | ---------- | ----------------------------------------------------------------------- |
| 1.0.0   | RESEARCHED | First MAT restructuring of legacy G0000 into dedicated reference record |
