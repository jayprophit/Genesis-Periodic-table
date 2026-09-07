# G0000 Migration Audit

## Legacy Record

```text
G0000 — Universal Reference / Origin State
```

## New Record

```text
MAT:0000
records/0000-Origin-State/
```

## Purpose

This audit verifies that concepts introduced in legacy `G0000` are either:

1. retained in `MAT:0000`;
2. moved into permanent project documentation;
3. formalized under Causali E;
4. explicitly deprecated;
5. or identified for further migration.

The legacy record must not be deleted until every row in this audit has been resolved.

---

# Audit Status Codes

```text
PRESERVED
MOVED-TO-DOCS
FORMALIZED
EXPANDED
DEPRECATED
PATCH-REQUIRED
VALIDATION-REQUIRED
```

---

# Section 1 — Reference Modes

Legacy concepts:

```text
G0000-QV
G0000-LAB
G0000-STP
G0000-E0
G0000-B0
G0000-P0
G0000-T0
G0000-N0
G0000-R0
G0000-S0
G0000-C0
G0000-X0
```

MAT status:

```text
PRESERVED + EXPANDED
```

New MAT channels:

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

Important change:

`G0000-STP` is no longer treated as one generic universal reference.

MAT uses a typed thermodynamic reference whose actual conditions must be stated.

---

# Section 2 — Universal Record Schema

Legacy status:

```text
MOVED-TO-DOCS
```

Destination:

```text
docs/02-data/01-Universal-Schema.md
templates/Record-Template.md
```

The complete element/material schema no longer lives inside `0000`.

Correct architectural separation achieved.

---

# Section 3 — Isotope and Nuclear Layer

Status:

```text
PRESERVED + EXPANDED
```

Destinations:

```text
docs/02-data/01-Universal-Schema.md
docs/01-foundations/02-scientific-framework/05-Quantum-and-Nuclear.md
templates/Isotope-Template.md
```

Includes:

* isotope identity;
* nuclear spin;
* parity;
* half-life;
* decay modes;
* branching;
* nuclear excited states;
* binding;
* cross-sections;
* capture;
* fusion;
* fission relevance.

---

# Section 4 — Decay-Energy Utilisation

Legacy concepts include:

```text
alpha kinetic energy
beta kinetic energy
gamma radiation
conversion electrons
spontaneous-fission fragments
neutron emission
decay heat
betavoltaic conversion
radioluminescence
thermoelectric conversion
specific power
shielding burden
thermal burden
radiation damage
```

Status:

```text
PRESERVED GENERALLY
PATCH-REQUIRED FOR EXPLICIT BRANCH
```

MAT must retain radioactive energy production separately from generic energy generation.

Recommended property namespace:

```text
energy.decay.total
energy.decay.specific-power
energy.decay.heat
energy.decay.alpha
energy.decay.beta
energy.decay.gamma
energy.decay.neutron
energy.decay.conversion-electron

energy.decay-conversion.thermal
energy.decay-conversion.thermoelectric
energy.decay-conversion.betavoltaic
energy.decay-conversion.radioluminescent
```

---

# Section 5 — Electronic Structure

Status:

```text
PRESERVED + EXPANDED
```

Includes:

* electron configuration;
* valence;
* orbital occupations;
* ionisation;
* affinity;
* work function;
* bands;
* Fermi level;
* density of states;
* mobility.

---

# Section 6 — Full Quantum Layer

Status:

```text
PRESERVED + EXPANDED
```

Includes:

$$
|\psi\rangle
$$

and:

$$
\rho
$$

where appropriate.

Additional MAT treatment includes explicit distinction between:

* pure state;
* mixed state;
* measurement;
* computational state;
* conceptual orbital visualization.

---

# Section 7 — Genesis A-B-C Layer

Status:

```text
FORMALIZED
```

Legacy:

```text
A = causality / difference
B = existing constant/constrained state
C = accessible resulting potential
```

MAT developing mapping:

```text
A = intervention/change
B = current/reference state and retained constraints
C = candidate/resulting accessible state
```

General representation:

$$
C=F(S,A,B,E,t)
$$

This is preserved as Causali E rather than silently treated as established physics.

---

# Section 8 — Four Operators

Legacy operations:

```text
combination / addition / superposition
removal / opposition / depletion
coupling / interaction / amplification
ratio / distribution / normalisation / partition
```

Status:

```text
FORMALIZED
```

Causali E should not assume conventional arithmetic unless mathematically valid.

Recommended conceptual operators:

$$
\oplus
$$

combination

$$
\ominus
$$

removal/opposition

$$
\otimes
$$

coupling

$$
\oslash
$$

partition/ratio operation

Each operator must eventually have:

```text
input domain
output domain
definition
constraints
identity
inverse if any
commutativity status
associativity status
physical interpretation
test cases
```

before becoming executable MAT mathematics.

---

# Section 9 — Electromagnetic Layer

Status:

```text
PRESERVED + EXPANDED
```

Important MAT extension:

Intrinsic magnetic behavior and engineered magnetization are now separate.

---

# Section 10 — Frequency / Resonance Layer

Status:

```text
PRESERVED + EXPANDED
```

The legacy decision to eliminate a generic single:

```text
element frequency
```

is retained.

MAT separates:

```text
nuclear
hyperfine
electronic
rotational
vibrational
phonon
plasma
acoustic
magnetic-resonance
```

mechanisms.

---

# Section 11 — Light / Photonic Layer

Status:

```text
PRESERVED
```

Includes:

* absorption;
* emission;
* Raman;
* IR;
* UV;
* X-ray;
* nonlinear optics;
* photoelectric response;
* photoconductivity;
* photovoltaic response;
* plasmonics.

---

# Section 12 — Thermal Layer

Status:

```text
PRESERVED + EXPANDED
```

Thermal history is now explicitly part of material state.

---

# Section 13 — Pressure Layer

Status:

```text
PRESERVED
```

Includes:

* compression;
* pressure phases;
* metallisation;
* superconductivity under pressure;
* shock;
* dynamic compression.

---

# Section 14 — Chemical Layer

Status:

```text
PRESERVED
```

---

# Section 15 — Organic / Inorganic / Biological Context

Status:

```text
PRESERVED GENERALLY
PATCH-REQUIRED FOR EXPLICIT CONTEXT TAGS
```

Recommended MAT context namespaces:

```text
context.organic
context.inorganic
context.biological
context.biofabrication
```

These are contextual relationships rather than intrinsic element properties.

For example:

Carbon does not possess one intrinsic:

```text
organic = true
```

property.

Instead particular compounds and applications create organic-chemistry relationships.

---

# Section 16 — Structural / Material Layer

Status:

```text
PRESERVED + EXPANDED
```

Allotropes and material variants are child/related objects.

---

# Section 17 — Mechanical Layer

Status:

```text
PRESERVED
```

---

# Section 18 — Extreme-State Layer

Status:

```text
PRESERVED + EXPANDED
```

Includes:

```text
vacuum
ultra-high vacuum
cryogenic
high temperature
high pressure
plasma
strong magnetic field
strong electric field
intense optical field
radiation
microgravity
high acceleration
shock
```

---

# Section 19 — Manufacturing / Process Layer

Status:

```text
PRESERVED + EXPANDED
```

Process history is now first-class MAT data.

Important distinction retained:

```text
material processing
```

is separate from:

```text
nuclear transformation
```

---

# Section 20 — Nuclear Transformation

Status:

```text
PRESERVED
```

Includes:

* fusion;
* fission;
* neutron capture;
* proton capture;
* alpha capture;
* particle bombardment;
* spallation;
* nucleosynthesis.

---

# Section 21 — Energy Layer

Status:

```text
PRESERVED + EXPANDED
```

MAT separates:

```text
generation
storage
transport
conversion
```

---

# Section 22 — Combustion / Reaction Energy

Legacy treats combustion independently from generic thermal processing.

Status:

```text
PATCH-REQUIRED FOR EXPLICIT BRANCH
```

Recommended namespace:

```text
energy.combustion.heat
energy.combustion.ignition-temperature
energy.combustion.flame-temperature
energy.combustion.oxygen-demand
energy.combustion.products
energy.combustion.rate
energy.combustion.recoverable-heat
energy.combustion.reversibility
```

Combustion should remain a chemical reaction process, not simply be classified as "heating."

---

# Section 23 — Cold Energy / Low-Temperature Layer

Status:

```text
PATCH-REQUIRED FOR EXPLICIT BRANCH
```

Recommended namespace:

```text
cryogenic.phase-transition
cryogenic.superconductivity
cryogenic.superfluidity
cryogenic.thermal-contraction
cryogenic.brittleness
cryogenic.quantum-coherence
cryogenic.heat-capacity
cryogenic.magnetic-response
cryogenic.carrier-mobility
```

Cryogenic behavior is strongly condition-dependent.

It is not an intrinsic room-temperature material property.

---

# Section 24 — Environment and Sustainability

Status:

```text
PRESERVED + EXPANDED
```

---

# Section 25 — Technology / Application

Status:

```text
PRESERVED
```

Applications are evidence-backed relationships.

They are not inferred merely because a property sounds useful.

---

# Section 26 — Safety

Status:

```text
PRESERVED + EXPANDED
```

Safety now applies to:

```text
material
state
process
environment
```

rather than only element identity.

---

# Section 27 — Evidence Layer

Status:

```text
PRESERVED + IMPROVED
```

Legacy:

```text
E0–E6
```

MAT:

```text
evidence_type
confidence
replication
uncertainty
provenance
```

Legacy codes remain migration aliases.

---

# Section 28 — Failed Experiments

Status:

```text
PRESERVED + EXPANDED
```

Negative results remain searchable data.

---

# Section 29 — Time

Status:

```text
PRESERVED + EXPANDED
```

Time is a first-class variable:

$$
S=S(t)
$$

where applicable.

---

# Section 30 — Scale

Status:

```text
PRESERVED + EXPANDED
```

MAT retains:

```text
nuclear
atomic
molecular
nano
micro
meso
macro
bulk
planetary
astrophysical
```

where relevant.

---

# Section 31 — Universal State Function

Legacy conceptual compression:

$$
G_i
=
F(
Z,I,N,Q,E,M,\nu,\lambda,C,S,T,P,t,s,R,\Gamma,\Pi,\Omega
)
$$

Status:

```text
PRESERVED-AS-ARCHITECTURAL-CONCEPT
```

MAT uses clearer named state dimensions rather than depending on ambiguous single-letter notation.

General MAT form:

$$
M_i=
F(
\text{composition},
\text{isotope},
\text{structure},
\text{quantum state},
\text{fields},
T,
P,
\text{environment},
\text{process},
t,
s
)
$$

The real implementation uses explicit fields.

---

# Section 32 — Custom Material Engine

Status:

```text
PRESERVED
EXPANDED INTO DEDICATED DOCUMENT
```

Destination:

```text
docs/02-data/10-Materials-Search-and-Design-Engine.md
```

The legacy goal is retained:

```text
DESIRED PROPERTIES
↓
SEARCH COMPOSITION
↓
SEARCH STRUCTURE
↓
SEARCH GEOMETRY
↓
SEARCH PROCESS
↓
SEARCH ENVIRONMENT
↓
FILTER BY PHYSICS
↓
RANK CANDIDATES
```

---

# Contributor References

The legacy `G0000` ends with an intellectual-lineage list containing scientists and theorists across quantum mechanics, thermodynamics, electromagnetism, nuclear science, materials science, information theory and causal inference.

Status:

```text
PRESERVED-AS-REQUIREMENT
```

Destination:

```text
docs/05-index/06-People-and-Intellectual-Lineage.md
```

Individual people must eventually receive structured records rather than remaining only a comma-separated list.

---

# Overall Audit

```yaml
legacy_record: G0000
replacement_record: MAT:0000

reference_architecture: PRESERVED
universal_schema: MOVED-TO-DOCS
causali_e: FORMALIZED
nuclear: PRESERVED
quantum: PRESERVED
electromagnetic: PRESERVED
frequency: PRESERVED
photonic: PRESERVED
thermal: PRESERVED
pressure: PRESERVED
chemical: PRESERVED
structural: PRESERVED
mechanical: PRESERVED
extreme_states: PRESERVED
manufacturing: PRESERVED
nuclear_transformations: PRESERVED
energy: PRESERVED
sustainability: PRESERVED
applications: PRESERVED
safety: PRESERVED
evidence: EXPANDED
negative_results: PRESERVED
time: PRESERVED
scale: PRESERVED
reverse_material_search: PRESERVED

explicit_patches_required:
  - decay-energy-utilisation
  - combustion-energy
  - cryogenic-behaviour
  - organic-inorganic-context-tags

explicit_patches_applied:
  - decay-energy-utilisation
  - combustion-energy
  - cryogenic-behaviour
  - organic-inorganic-context-tags

status: CONTENT-MIGRATED
```

---

# Deletion Rule

Do not delete legacy `G0000` yet.

The correct progression is:

```text
G0000
    ↓
CONTENT AUDITED
    ↓
MAT:0000 CREATED
    ↓
SCIENTIFIC REFERENCES CHECKED
    ↓
INTERNAL LINKS CHECKED
    ↓
SCHEMA VALIDATED
    ↓
VISUAL MANIFEST LOCKED
    ↓
MIGRATED
    ↓
LEGACY COPY ARCHIVED
```

Only after this sequence should the active legacy file be retired.

The legacy record explicitly preserves the four operations as a search-engine concept rather than ordinary arithmetic, separates the frequency mechanisms, and says potential states should be generated and then tested rather than discarded merely because one condition fails. ([GitHub][1])
