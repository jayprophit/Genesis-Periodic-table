# CALC-001 — Tritium Decay Constant

## Calculation ID

```text
MAT:0001:CALC:001
```

## Source Quantity

$$
t_{1/2}
=
12.32\pm0.02\ {\rm y}
$$

Source:

```text
SRC-H-004
```

## Equation

$$
\lambda
=
\frac{\ln2}{t_{1/2}}
$$

Therefore:

$$
\lambda
=
0.05626195\ {\rm y^{-1}}
$$

Using a Julian year:

$$
1\ {\rm y}
=
365.25\times86400
=
31\,557\,600\ {\rm s}
$$

gives:

$$
t_{1/2}
=
388\,789\,632\ {\rm s}
$$

and:

$$
\lambda
=
1.78283\times10^{-9}\ {\rm s^{-1}}
$$

Approximate propagated uncertainty:

$$
u(\lambda)
\approx
2.89\times10^{-12}\ {\rm s^{-1}}
$$

## Result

```yaml
calculation_id: "MAT:0001:CALC:001"
input_half_life_year: 12.32
input_uncertainty_year: 0.02

decay_constant:
  per_year: 0.05626195
  per_second: 1.78283e-9
  approximate_uncertainty_per_second: 2.89e-12

classification: "DERIVED"
source_id: "SRC-H-004"
```

---
