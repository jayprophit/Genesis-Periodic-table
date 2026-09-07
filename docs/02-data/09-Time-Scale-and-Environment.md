# MAT Time, Scale and Environment Standard

## Purpose

Three variables are fundamental to MAT:

\[
t=\text{time}
\]

\[
s=\text{scale}
\]

\[
E=\text{environment}
\]

A material is not always fully defined without them.

---

# 1. Time

The MAT state should be treated as potentially time-dependent:

\[
M=M(t)
\]

Examples include:

- radioactive decay;
- excited-state relaxation;
- diffusion;
- corrosion;
- oxidation;
- ageing;
- creep;
- fatigue;
- phase transformation;
- battery degradation;
- polymer degradation;
- radiation damage;
- grain growth.

---

# 2. Time Categories

Fields may include:

```text
measurement timestamp
measurement duration
process duration
sample age
time since manufacture
time since treatment
relaxation time
decay lifetime
exposure duration
service duration
cycle count
```

---

# 3. Initial and Final State

Processes should distinguish:

\[
S_0=\text{initial state}
\]

from:

\[
S_f=\text{final state}
\]

and may contain intermediate states:

\[
S_0\rightarrow S_1\rightarrow S_2\rightarrow \cdots \rightarrow S_f
\]

---

# 4. History Dependence

Two specimens with the same composition can have different properties because they experienced different histories.

Therefore:

\[
M_f =
F(
M_0,
P_1,
P_2,
\dots,
P_n
)
\]

Examples:

- heating;
- cooling;
- quenching;
- irradiation;
- deformation;
- magnetic-field treatment;
- electrical cycling;
- ageing.

---

# 5. Scale

A record may specify both qualitative and numerical scale.

Qualitative classes:

```text
SUBNUCLEAR
NUCLEAR
ATOMIC
MOLECULAR
NANO
MICRO
MESO
MACRO
BULK
PLANETARY
ASTROPHYSICAL
```

---

# 6. Characteristic Length

Where possible, store:

```yaml
characteristic_length:
unit:
```

For example:

```yaml
scale_class: NANO
characteristic_length: 20
unit: nm
```

---

# 7. Scale Effects

Properties may change with scale because of:

- surface-to-volume ratio;
- quantum confinement;
- defect density;
- grain-boundary fraction;
- finite-size effects;
- thermal transport regime;
- electromagnetic confinement;
- mechanical size effects.

A nanoscale property should not automatically be assigned to bulk material.

---

# 8. Environment

Environment is represented as a structured state.

Possible fields include:

```yaml
temperature:
pressure:
atmosphere:
gas_composition:
humidity:
electric_field:
magnetic_field:
radiation_field:
particle_flux:
gravity:
acceleration:
mechanical_load:
chemical_environment:
solvent:
pH:
biological_environment:
vacuum_level:
illumination:
frequency:
wavelength:
```

---

# 9. Atmosphere

Examples:

```text
AIR
OXYGEN
NITROGEN
ARGON
HELIUM
HYDROGEN
INERT
REDUCING
OXIDISING
VACUUM
ULTRA-HIGH-VACUUM
CUSTOM-MIXTURE
```

Gas composition should be stored numerically where relevant.

---

# 10. Vacuum

Vacuum is not simply a boolean.

Store pressure where possible.

Examples:

```yaml
environment: VACUUM
pressure:
unit: Pa
```

---

# 11. Electric Fields

Fields should include:

```yaml
electric_field:
magnitude:
unit: V/m
direction:
frequency:
phase:
waveform:
```

---

# 12. Magnetic Fields

Fields should include:

```yaml
magnetic_field:
magnitude:
unit: T
vector:
orientation:
gradient:
frequency:
phase:
field_source:
```

For manufactured permanent magnets, distinguish:

```text
applied magnetising field
```

from:

```text
resulting remanent magnetic state
```

and from:

```text
intrinsic magnetic properties
```

---

# 13. Radiation Environment

Radiation should identify:

- particle/photon type;
- energy;
- spectrum;
- flux;
- fluence;
- dose;
- dose rate;
- direction;
- duration.

Possible classes:

- ultraviolet;
- X-ray;
- gamma;
- electron;
- proton;
- neutron;
- alpha;
- ion;
- cosmic radiation.

---

# 14. Gravity and Acceleration

MAT may distinguish:

- microgravity;
- terrestrial gravity;
- reduced gravity;
- elevated acceleration.

Store numerical acceleration where meaningful.

---

# 15. Mechanical Environment

Possible fields include:

- tension;
- compression;
- shear;
- bending;
- torsion;
- vibration;
- shock;
- acoustic loading;
- cyclic loading.

Include:

- stress;
- strain;
- strain rate;
- frequency;
- direction;
- cycle count.

---

# 16. Chemical Environment

Possible information:

- solvent;
- pH;
- ionic strength;
- dissolved species;
- reactive gases;
- oxidising/reducing conditions;
- electrolyte;
- concentration.

---

# 17. Biological Environment

Where relevant:

- organism;
- tissue;
- cell type;
- temperature;
- pH;
- fluid;
- protein environment;
- exposure route.

---

# 18. Combined Environment

MAT should support multiple simultaneous conditions.

Example:

```yaml
environment:
  temperature: 1200
  temperature_unit: K
  pressure: 5
  pressure_unit: GPa
  magnetic_field: 8
  magnetic_field_unit: T
  atmosphere: ARGON
  duration: 30
  duration_unit: min
```

---

# 19. State Equality

Two records should not automatically be considered the same physical state merely because they have the same chemical formula.

More appropriately:

\[
M_a=M_b
\]

requires compatibility across all variables relevant to the comparison.

At minimum this may include:

\[
\{
\text{composition},
\text{phase},
\text{structure},
T,
P,
t,
s,
\text{environment},
\text{history}
\}
\]

---

# 20. MAT State Signature

A future machine-readable MAT state may therefore use a state signature such as:

```yaml
material_id:
composition:
isotopic_composition:
phase:
structure:
temperature:
pressure:
electric_field:
magnetic_field:
radiation:
scale:
geometry:
process_history:
age:
time:
```

This state signature becomes the context for every property attached to the material.
