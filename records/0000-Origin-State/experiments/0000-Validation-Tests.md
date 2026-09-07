# 0000 Validation Tests

## TEST-0000-001 — Null Versus Zero

### Requirement

Verify that:

```text
ZERO
UNKNOWN
NOT-MEASURED
NOT-AVAILABLE
NOT-APPLICABLE
MAT:0000
```

remain separate machine-readable values.

### Pass

No parser or schema maps these categories automatically to the same value.

---

## TEST-0000-002 — Dimensional Compatibility

### Test

Attempt:

$$
300\ \mathrm K
-
100000\ \mathrm{Pa}
$$

### Expected

```text
REJECT
```

Reason:

Incompatible physical dimensions.

---

## TEST-0000-003 — Compatible Unit Conversion

Input:

```text
1 bar
100 kPa
```

After unit normalization:

$$
100000\ \mathrm{Pa}
-
100000\ \mathrm{Pa}
=
0\ \mathrm{Pa}
$$

### Expected

```text
PASS
```

---

## TEST-0000-004 — T0 Semantics

Input:

```yaml
reference: MAT:0000:REF:T0
value: 293.15
unit: K
```

### Expected

MAT must not replace this automatically with:

```text
0 K
```

---

## TEST-0000-005 — B0 Semantics

Input:

```yaml
reference: MAT:0000:REF:B0
nominal_external_field: 0
unit: T
```

### Expected

System description must not claim:

```text
all magnetic phenomena are absent
```

---

## TEST-0000-006 — Vacuum Separation

Verify:

```text
MAT:0000:REF:VAC
```

and:

```text
MAT:0000:REF:QV
```

are separate objects.

### Expected

```text
PASS
```

---

## TEST-0000-007 — Quantum-Vacuum Qualification

Any QV entry lacking a specified theory/model should be flagged:

```text
INCOMPLETE-REFERENCE
```

---

## TEST-0000-008 — Reference Difference

For:

```yaml
T: 350
T0: 300
unit: K
```

expected:

$$
\Delta T=50\ \mathrm K
$$

---

## TEST-0000-009 — No Causal Inference From Difference Alone

Input:

```text
State A differs from State B.
```

Expected:

```text
DIFFERENCE CONFIRMED
CAUSATION NOT ESTABLISHED
```

---

## TEST-0000-010 — Legacy Mapping

Every legacy `G0000-*` reference should either:

1. map to a MAT reference ID; or
2. be explicitly deprecated.

---
