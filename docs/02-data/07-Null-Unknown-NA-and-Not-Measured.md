# MAT Null, Unknown, N/A and Missing-Data Standard

## Purpose

Blank fields are ambiguous.

MAT therefore avoids undefined empty values wherever practical.

---

# 1. Canonical Null States

Use the following controlled states.

## UNKNOWN

The information may exist, but MAT does not currently know it.

```text
UNKNOWN
```

---

## NOT-MEASURED

The quantity is meaningful but has not been measured or no measurement has been identified.

```text
NOT-MEASURED
```

---

## NOT-AVAILABLE

The information is believed to exist but is unavailable to MAT.

```text
NOT-AVAILABLE
```

---

## NOT-APPLICABLE

The field has no meaningful application to this record/state.

```text
NOT-APPLICABLE
```

---

## NOT-ESTABLISHED

A proposed phenomenon/value has not been scientifically established.

```text
NOT-ESTABLISHED
```

---

## BELOW-DETECTION-LIMIT

The measurement method did not detect a value above its detection threshold.

```text
BELOW-DETECTION-LIMIT
```

This is not the same as zero.

---

## NOT-DETECTED

No signal/event was detected under the reported conditions.

```text
NOT-DETECTED
```

Again, this does not prove absolute absence.

---

## ZERO

Use numerical `0` only when zero is an actual quantitative result.

Never use zero as a substitute for missing information.

---

# 2. Examples

Incorrect:

```yaml
magnetic_moment: 0
```

when no value was found.

Correct:

```yaml
magnetic_moment: UNKNOWN
```

---

Incorrect:

```yaml
half_life:
```

for a stable isotope.

Preferred:

```yaml
half_life: NOT-APPLICABLE
stability: STABLE
```

---

# 3. Stable Versus Infinite Half-Life

Do not casually encode the half-life of a stable isotope as mathematical infinity.

Use:

```text
STABLE
```

with:

```text
half_life: NOT-APPLICABLE
```

unless a scientific context explicitly requires a lower bound or lifetime constraint.

---

# 4. Estimated Values

Estimated values are still values.

Use:

```yaml
value:
value_status: ESTIMATED
```

not `UNKNOWN`.

---

# 5. Predicted Values

Likewise:

```yaml
value:
evidence_type: COMPUTATIONAL
```

or:

```yaml
value:
evidence_type: THEORETICAL
```

---

# 6. Missing Source

A value without a known source should be flagged:

```text
SOURCE-UNKNOWN
```

rather than silently accepted.

---

# 7. Legacy N/A

Existing Genesis records may contain `N/A`.

During migration:

```text
N/A
```

must be interpreted and replaced with the specific MAT state whenever possible.

For example:

```text
NOT-APPLICABLE
NOT-MEASURED
UNKNOWN
```

are not interchangeable.
