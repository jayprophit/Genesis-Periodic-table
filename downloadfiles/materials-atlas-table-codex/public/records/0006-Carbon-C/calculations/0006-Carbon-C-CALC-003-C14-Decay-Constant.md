# CALC-003 — Carbon-14 Decay Constant

Using the adopted MAT reference:

$$
t_{1/2}
=
5700\ {\rm y}
$$

the decay constant is:

$$
\lambda
=
\frac{\ln2}{t_{1/2}}
$$

giving approximately:

$$
\boxed{
\lambda
\approx
1.216\times10^{-4}\ {\rm y^{-1}}
}
$$

The activity relationship is:

$$
A=\lambda N
$$

and radioactive population evolves as:

$$
N(t)=N_0e^{-\lambda t}
$$

The conventional Libby radiocarbon age scale must use its own
method-defined half-life rather than silently replacing the physical
half-life in this calculation.

```yaml
calculation_id: "MAT:0006:CALC:003"
classification: "DERIVED"

half_life:
  value: 5700
  unit: "y"

decay_constant:
  approximate_value: 1.216e-4
  unit: "1/y"

source_id: "SRC-000082"
```
