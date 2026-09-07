# MAT Time, Scale and Environment

## Purpose

MAT treats time, scale and environment as first-class variables, not optional metadata.

A material cannot be represented only by composition and formula without context.

---

# 1. Time

Every material state should be associated with the relevant time context.

Possible values include:

- observation time;
- elapsed time;
- measurement duration;
- exposure time;
- ageing time;
- reaction time;
- relaxation time;
- lifetime;
- service time;
- process time;
- thermal history duration.

---

## Time States

Examples:

```yaml
time:
  start: 0
  end: 30
  unit: min
  context: annealing
```

or:

```yaml
age: 3.2
age_unit: years
```

---

## Dynamic Behaviour

If a system evolves over time, MAT should retain:

- initial state;
- transition rule;
- final state;
- time series where available;
- rate of change;
- mechanism;
- duration;
- boundary conditions.

---

# 2. Scale

Scale is not a decorative label; it is a physically meaningful variable.

Possible classes include:

- atomic scale;
- molecular scale;
- nanoscopic scale;
- microscopic scale;
- mesoscopic scale;
- macroscopic scale;
- bulk scale;
- device scale;
- system scale;
- planetary scale;
- astrophysical scale.

---

## Scale Fields

Recommended scale metadata:

```yaml
scale_class:
length:
length_unit:
feature_size:
feature_size_unit:
geometry:
resolution:
```

---

# 3. Environment

Environment defines the context in which a material exists or is observed.

Examples:

- vacuum;
- inert atmosphere;
- oxygen-rich atmosphere;
- aqueous environment;
- acid environment;
- saline environment;
- cryogenic environment;
- high-temperature environment;
- radiation environment;
- pressure environment;
- magnetic environment;
- electric-field environment;
- gravitational environment.

---

# 4. Temperature Environment

Temperature is explicitly recorded as part of the state.

```yaml
temperature: 298.15
temperature_unit: K
```

Do not assume room temperature or ambient conditions unless clearly specified.

---

# 5. Pressure Environment

Pressure is a state variable.

```yaml
pressure: 1e5
pressure_unit: Pa
```

This must be retained because phase and reaction behaviour may change dramatically with pressure.

---

# 6. Atmosphere and Chemical Environment

If atmosphere matters, store it explicitly.

Examples:

```yaml
atmosphere: N2
atmosphere: Ar
atmosphere: O2
atmosphere: vacuum
```

For chemical conditions:

```yaml
pH: 7.4
solute: NaCl
solvent: water
ionic_strength: 0.15
```

---

# 7. Electric Field

Example:

```yaml
electric_field: 1e6
electric_field_unit: V/m
```

Where field direction matters, include orientation and frame of reference.

---

# 8. Magnetic Field

Example:

```yaml
magnetic_field: 1.5
magnetic_field_unit: T
```

The field may be applied, residual, intrinsic or measured externally.

These need separate labels when the distinction matters.

---

# 9. Radiation Environment

Radiation should identify:

- particle or photon type;
- energy;
- spectrum;
- flux;
- fluence;
- dose;
- dose rate;
- direction;
- duration.

Possible classes include:

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

# 10. Gravity and Acceleration

MAT may distinguish:

- microgravity;
- terrestrial gravity;
- reduced gravity;
- elevated acceleration.

Store numerical acceleration where meaningful.

---

# 11. Mechanical Environment

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

# 12. Chemical Environment

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

# 13. Biological Environment

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

# 14. Combined Environment

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

# 15. State Equality

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
\text{time},
\text{scale},
\text{environment},
\text{history}
\}
\]

---

# 16. MAT State Signature

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

These changes are consistent with the strongest parts of the present `G0000`: it already separates multiple reference modes instead of treating zero as literal physical nothingness, distinguishes several different spectral/frequency mechanisms, separates ordinary material synthesis from nuclear transformation, and explicitly treats failed experiments, time and scale as data.

There is also one deliberate upgrade from the old evidence system: `E0-E6` is retained for migration, but new MAT uses descriptive evidence types plus independent confidence and replication fields. That will make the database much easier to audit and eventually use with AI or a materials-search engine.

---

## Technical Note

This section closes the MAT universal schema and standards layer. The next work should keep these rules stable while migrating legacy material records into their new structured form.
