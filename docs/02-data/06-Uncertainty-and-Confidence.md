# MAT Uncertainty and Confidence

## Purpose

Uncertainty and confidence describe different things.

### Uncertainty

Quantifies limits or spread associated with a value.

### Confidence

Represents MAT's assessment of how securely the claim is supported.

They must not be merged into one field.

---

# 1. Measurement Uncertainty

Example:

\[
x = 5.32 \pm 0.04\ \text{mm}
\]

Store:

```yaml
value: 5.32
unit: mm
uncertainty: 0.04
uncertainty_type: standard
```

---

# 2. Uncertainty Types

Possible classifications:

```text
STANDARD
EXPANDED
STATISTICAL
SYSTEMATIC
COMBINED
RANGE
CONFIDENCE-INTERVAL
SOURCE-REPORTED
ESTIMATED
UNKNOWN
```

---

# 3. Confidence Grades

Recommended MAT confidence classes:

```text
A — HIGH
B — MODERATE
C — LOW
D — SPECULATIVE
U — UNASSESSED
```

---

## A — HIGH

Typically:

- strong source quality;
- appropriate methodology;
- compatible independent evidence;
- no major unresolved contradiction.

---

## B — MODERATE

Generally supported, but one or more limitations remain.

---

## C — LOW

Limited evidence, poor replication, large uncertainty or important unresolved disagreement.

---

## D — SPECULATIVE

Primarily theoretical, exploratory or hypothetical where empirical support is currently insufficient.

---

## U — UNASSESSED

MAT has not yet evaluated confidence.

---

# 4. Confidence Is Not Evidence Type

Example:

A computational prediction can have:

```text
evidence_type: COMPUTATIONAL
confidence: A
```

if a well-established computational method predicts a narrowly defined quantity accurately.

Another simulation might be:

```text
evidence_type: COMPUTATIONAL
confidence: D
```

if assumptions dominate the result.

Likewise, one experimental measurement may still have low confidence.

---

# 5. Agreement Between Sources

Where multiple measurements exist, MAT may calculate:

- mean;
- median;
- standard deviation;
- weighted mean;
- between-study variance;
- confidence interval.

The raw observations must remain available.

---

# 6. Model Uncertainty

Computational values should distinguish:

- numerical error;
- model-form uncertainty;
- parameter uncertainty;
- input-data uncertainty;
- convergence uncertainty.

---

# 7. Prediction Intervals

Predictions should state ranges where practical.

Avoid presenting:

```text
predicted value = 123.456789
```

when the model cannot justify that precision.

---

# 8. Disagreement Flag

Possible states:

```text
CONSISTENT
MINOR-DISAGREEMENT
SIGNIFICANT-DISAGREEMENT
CONTRADICTORY
INSUFFICIENT-DATA
```

---

# 9. Uncertainty Propagation

For derived quantities:

\[
y=f(x_1,x_2,\ldots,x_n)
\]

uncertainty should be propagated using an appropriate mathematical method when sufficient input uncertainty information is available.

The calculation method should be documented.

---
