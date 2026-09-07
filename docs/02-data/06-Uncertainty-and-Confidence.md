# MAT Uncertainty and Confidence

## Purpose

MAT distinguishes between:

- measurement uncertainty;
- modelling uncertainty;
- confidence in the claim;
- quality of the underlying evidence;
- replication status.

A single number is not enough.

---

# 1. Uncertainty Types

Possible categories include:

- statistical uncertainty;
- systematic uncertainty;
- calibration uncertainty;
- rounding uncertainty;
- interpolation uncertainty;
- extrapolation uncertainty;
- model-form uncertainty;
- sampling uncertainty;
- environmental uncertainty;
- hidden-variable uncertainty;
- classification uncertainty;
- transcription uncertainty.

---

# 2. Measurement Uncertainty

Measurement uncertainty should include:

```yaml
value:
unit:
uncertainty_value:
uncertainty_unit:
uncertainty_type:
confidence_interval:
confidence_level:
method:
```

Examples:

```yaml
uncertainty_type: ONE_SIGMA
confidence_level: 0.68
```

or:

```yaml
uncertainty_type: 95_PERCENT_CONFIDENCE
confidence_level: 0.95
```

---

# 3. Standard Deviation and Distribution

Where a value is distributional rather than single-value, record:

- mean;
- median;
- variance;
- standard deviation;
- confidence interval;
- full distribution when necessary;
- skewness;
- kurtosis;
- sample size.

---

# 4. Systematic Error

Systematic error must be distinguished from statistical noise.

Examples:

- calibration drift;
- instrument offset;
- temperature bias;
- beam misalignment;
- sample contamination;
- reference mismatch.

---

# 5. Model Uncertainty

A theoretical or computational estimate may be uncertain because the model itself is incomplete.

This should be recorded separately from statistical error.

Examples:

- approximations in the model;
- omitted variables;
- hidden assumptions;
- unknown boundary conditions;
- numerically converged but physically unvalidated result.

---

# 6. Confidence

Confidence is a qualitative and separate evaluation from uncertainty.

Recommended values:

```text
VERY-LOW
LOW
MODERATE
HIGH
VERY-HIGH
```

The confidence field describes trust in the relevant claim, under the stated conditions.

---

# 7. Confidence is Not Provenance

High confidence does not automatically mean:

- high certainty;
- original-source status;
- independent replication;
- universal validity.

These are different dimensions.

---

# 8. Evidence Weighting

A value may carry:

- evidence strength;
- expert review status;
- number of independent sources;
- degree of agreement across sources;
- presence of contradiction.

---

# 9. Contradiction and Consensus

If multiple sources disagree, MAT should not collapse them automatically.

Instead store:

```yaml
consensus_status: CONFLICTING
supporting_sources:
contradictory_sources:
preferred_value:
```

The recommended value, if present, must remain explicitly labelled as a synthesis or evaluation.

---

# 10. Sensitivity

A property may be sensitive to:

- temperature;
- pressure;
- geometry;
- sample history;
- field orientation;
- scale;
- environment;
- defect density;
- preparation route.

Sensitivity should be explicit when it affects interpretation.

---

# 11. Outlier Handling

Outliers should not be silently removed.

Store:

- source reference;
- measurement conditions;
- reason for flagging;
- whether it was included or excluded;
- who/what flagged it;
- whether it was later replicated.

---

# 12. Uncertainty Propagation

When calculations derive a value from multiple variables, record the propagation method.

Examples:

- linear propagation;
- Monte Carlo propagation;
- analytically derived uncertainty;
- finite-difference sensitivity analysis;
- Bayesian inference.

---

# 13. Confidence in Models

Models may also carry confidence in their assumptions.

Example:

```yaml
model_confidence: MODERATE
assumption_list:
known_limitations:
```

This is different from confidence in the measured observation.

---

# 14. Experimental Reproducibility

Reproducibility should not be conflated with a property's physical truth.

A hard-to-repeat measurement may still be valid; a repeatable measurement may still be wrong.

---

# 15. Null-State and Uncertainty

An unknown or not-measured state is not equivalent to a numerical zero or uncertainty-free value.

A blank field should be converted to one of the explicit MAT null states.

---

# 16. Quality Tiers

Possible quality tiers include:

```text
EXPLORATORY
PRELIMINARY
ROUTINE
REPRODUCIBLE
VALIDATED
STANDARDISED
```

These are operational quality labels and do not replace quantitative uncertainty.
