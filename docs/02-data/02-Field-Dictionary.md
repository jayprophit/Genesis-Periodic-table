# MAT Field Dictionary

## Purpose

The Field Dictionary defines how individual values are stored and interpreted.

A MAT field is more than:

`property = value`

A scientific property should normally be represented as:

\[
D =
(P,V,U,\Delta,C,M,S,E,T)
\]

where:

- \(P\) = property;
- \(V\) = value;
- \(U\) = unit;
- \(\Delta\) = uncertainty;
- \(C\) = conditions;
- \(M\) = measurement/calculation method;
- \(S\) = source;
- \(E\) = evidence status;
- \(T\) = time/context.

---

## Minimum Measurement Object

Recommended structure:

```yaml
property_id:
property_name:
value:
unit:
uncertainty:
uncertainty_type:
temperature:
pressure:
environment:
physical_state:
sample_state:
orientation:
frequency:
wavelength:
time:
scale:
method:
evidence_type:
confidence:
source_id:
notes:
```

Fields not required for a measurement use formal MAT null states.

---

## Canonical Field Rules

### property_id

Permanent machine-readable identifier.

Example:

```text
thermal.conductivity
```

### property_name

Human-readable name.

Example:

```text
Thermal conductivity
```

### value

Numerical, categorical or structured value.

Do not include units inside numeric values.

Incorrect:

```text
237 W/mK
```

Preferred:

```yaml
value: 237
unit: W/(m*K)
```

---

## value_type

Allowed conceptual types include:

- integer;
- floating-point;
- decimal;
- scientific notation;
- boolean;
- string;
- enumeration;
- vector;
- tensor;
- interval;
- distribution;
- spectrum;
- time series;
- function;
- equation;
- structured object.

---

## Unit

Units must be stored separately from the numerical value.

SI is the canonical MAT comparison system.

Original source units should also be retained when conversion occurs.

---

## Conditions

Properties whose values depend on conditions should retain those conditions.

Examples:

- temperature;
- pressure;
- phase;
- orientation;
- frequency;
- wavelength;
- applied field;
- atmosphere;
- composition;
- purity;
- grain size;
- strain rate;
- sample geometry.

---

## Range Values

Ranges should not be compressed into a single midpoint unless specifically needed for a calculation.

Store:

```yaml
minimum:
maximum:
unit:
```

and, if relevant:

```yaml
recommended_value:
```

---

## Direction-Dependent Values

Anisotropic properties must include direction or crystallographic orientation.

Example:

```yaml
property: thermal.conductivity
direction: "[001]"
```

---

## Frequency-Dependent Values

Store the frequency axis explicitly.

Do not write:

```text
dielectric constant = 4.2
```

without frequency when frequency materially affects the value.

---

## Temperature-Dependent Values

Where a property varies strongly with temperature, store:

- individual data points;
- a table;
- an equation;
- or a referenced curve.

---

## Values Extracted from Graphs

Values digitised from plots must include:

```yaml
acquisition_method: GRAPH_DIGITIZATION
```

and must not be presented as if copied from an original numerical table.

---

## Calculated Values

Calculated values must contain:

- equation identifier;
- input data identifiers;
- constants used;
- calculation method;
- software if applicable;
- version;
- result;
- propagated uncertainty where possible.

---

## Derived Values

Example:

\[
\rho = \frac{m}{V}
\]

A derived density should retain links to the mass and volume measurements from which it was calculated.

---

## Significant Figures

Do not create false precision.

The number of reported digits should reflect:

- source precision;
- measurement precision;
- uncertainty;
- calculation precision.

---

## Original Value Preservation

If MAT converts or normalises source data, retain:

```yaml
original_value:
original_unit:
normalized_value:
normalized_unit:
conversion_method:
```

The original evidence must remain reconstructable.

---
