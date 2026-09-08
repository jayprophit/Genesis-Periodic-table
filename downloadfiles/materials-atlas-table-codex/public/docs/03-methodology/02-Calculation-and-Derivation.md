# MAT Calculation and Derivation

## Purpose

MAT must distinguish between:

- direct measurement;
- observed value;
- derived value;
- calculated estimate;
- interpolated value;
- simulated value;
- theoretical prediction.

These are not interchangeable.

---

## 1. Direct Measurement

A direct measurement is an observed quantity obtained from a measurement process, instrument, or observation procedure.

It should retain:

- instrument or method;
- calibration;
- uncertainty;
- sample conditions;
- source provenance;
- timestamps or time interval when relevant.

---

## 2. Derived Value

A derived value arises from a mathematical relationship between directly measured quantities.

Examples:

- density from mass and volume;
- conductivity from resistance, geometry, and area;
- strain from displacement and original length;
- activation energy from rate data.

Derived values should always retain references to their underlying inputs.

---

## 3. Calculated Value

A calculated value may arise from:

- theoretical equations;
- simulation output;
- numerical approximation;
- optimisation or fitting.

A calculated result must contain:

- equation ID or model ID;
- inputs used;
- constants and assumptions;
- software or computational method;
- version information;
- uncertainty estimate when available.

---

## 4. Interpolation and Extrapolation

Interpolation and extrapolation are not the same as direct measurement.

They require explicit notes on:

- method used;
- model assumptions;
- domain of validity;
- uncertainty introduced by the estimate.

Example:

```yaml
value_estimate: 175
unit: K
method: INTERPOLATION
assumption: linear relation between 150 K and 200 K
confidence: MODERATE
```

---

## 5. Simulation and Model Outputs

Simulation data may be useful but must be classified separately from measured data.

A simulation value should include:

- model type;
- software and version;
- input parameters;
- validation status;
- uncertainty or sensitivity notes;
- whether it was compared to experiment.

---

## 6. Theoretical Prediction

A theoretical prediction is not equivalent to an observed value.

It may be powerful and useful, but it must be labelled as theoretical unless independently validated.

---

## 7. Equation and Model Tracking

Every equation used in a MAT record should be traceable.

At minimum store:

- equation label;
- symbols and definitions;
- assumptions;
- units;
- parameter values;
- source or derivation.

---

## 8. Calculation Integrity Rules

MAT should not collapse these categories into one field.

A data pipeline must keep at least these distinctions:

```yaml
value_type: MEASURED | DERIVED | CALCULATED | INTERPOLATED | SIMULATED | THEORETICAL
```

This prevents false confidence and false precision.

---

## 9. Good Practice

When presenting a value, MAT should prefer:

```yaml
value: 2.31
unit: g/cm^3
value_type: MEASURED
uncertainty: 0.05
```

over a vague single number with no provenance or context.

---

## 10. Conclusion

A derived or calculated value may be immensely valuable, but it must remain visibly derivational and context-bound.

MAT keeps the distinction explicit so that scientific conclusions remain auditable and reproducible.
