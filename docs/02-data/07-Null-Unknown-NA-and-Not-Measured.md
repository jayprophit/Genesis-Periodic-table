# MAT Null, Unknown, NA and Not Measured

## Purpose

MAT requires explicit handling for missing or inapplicable values.

Blank fields are not permitted to mean ambiguous physical absence.

A missing value must resolve to a defined MAT state.

---

# 1. Canonical Null States

Recommended canonical set:

```text
UNKNOWN
NOT-MEASURED
NOT-AVAILABLE
NOT-APPLICABLE
NOT-ESTABLISHED
```

Additional domain-specific states may be defined if needed, but all must be explicit and stable.

---

# 2. Distinctions

## UNKNOWN

The value is not known, but the property may be meaningful in principle.

## NOT-MEASURED

The value was not measured in the reported context.

## NOT-AVAILABLE

The value is not available from the source or data pipeline at the time of recording.

## NOT-APPLICABLE

The property is not relevant for the object or state.

## NOT-ESTABLISHED

The property may be relevant, but there is no accepted or sufficiently reliable determination.

---

# 3. Zero is not the Same as Missing

A numeric zero is a valid physical value when it is physically meaningful.

Examples:

- zero charge;
- zero defect concentration in a defined model;
- zero applied field within a specified calibration;
- zero diffusion in a modelled ideal case.

But a blank or omitted value is not the same as zero.

---

# 4. Null State Examples

```yaml
temperature: UNKNOWN
magnetic_field: NOT-MEASURED
spectral_data: NOT-AVAILABLE
orbital_count: NOT-APPLICABLE
phase_transition: NOT-ESTABLISHED
```

---

# 5. Provenance of Null State

Null states should still include provenance where possible.

Example:

```yaml
pressure_state: NOT-MEASURED
reason: experiment did not report pressure
source_id: SRC-00412
```

---

# 6. Legacy `NA` Handling

Legacy data may use:

```text
NA
N/A
null
blank
```

These must be migrated to one of the MAT canonical states rather than retained as ambiguous placeholders.

---

# 7. Null-State Migration Rule

When migrating old records:

- `blank` ⇒ `NOT-MEASURED` unless historical context requires `NOT-AVAILABLE`;
- `N/A` for a property that is irrelevant ⇒ `NOT-APPLICABLE`;
- `N/A` for a property that may exist but is uncertain ⇒ `NOT-ESTABLISHED`;
- missing value from a dataset or OCR extraction ⇒ `NOT-AVAILABLE`;
- unspecified but likely relevant value ⇒ `UNKNOWN`.

---

# 8. Half-Life and Stable/Infinite Cases

For radioactive isotopes:

- finite measured half-life should be stored numerically;
- stable isotope should be marked as `STABLE` if appropriate;
- effectively unobserved or theoretically indefinite behaviour must not be falsified into a numeric zero or a meaningless blank.

This is not a null-value issue only; it is a semantics issue.

---

# 9. Half-Life Semantics

Example:

```yaml
half_life: "STABLE"
status: STABLE-ISOTOPE
```

or:

```yaml
half_life: 1.5e20
unit: y
status: RADIOACTIVE
```

The difference between “stable”, “not measured”, and “not established” must remain explicit.

---

# 10. Explicit State Logic

A MAT rule is:

```text
missing value ≠ zero value
missing value ≠ not applicable
not applicable ≠ unknown
unknown ≠ not measured
```

These definitions must be maintained in record validation.

---

# 11. Recommended Validation Pattern

Every field should pass one of these tests:

```text
value is defined and valid;
OR value is explicit MAT null state;
OR value is intentionally absent and justified as not applicable.
```
