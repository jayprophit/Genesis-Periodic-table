# CALC-003 — Nitrogen-17 Beta-Minus Q-Value

$$
{}^{17}N
\rightarrow
{}^{17}O+e^-+\bar\nu_e
$$

Using atomic masses:

$$
\boxed{
Q_{\beta^-}
\approx
8.6790\ {\rm MeV}
}
$$

The daughter can be populated above its neutron separation threshold.

This enables:

$$
{}^{17}O^*
\rightarrow
{}^{16}O+n
$$

which explains the large beta-delayed-neutron branch.

NUBASE2020:

$$
P_{\beta n}
=
95.1\pm0.7\%
$$

```yaml
calculation_id: "MAT:0007:CALC:003"
classification: "DERIVED-PLUS-EVALUATED-DECAY"

parent: "MAT:0007:ISO:N-17"
daughter: "MAT:0008:ISO:O-17"
daughter_status: "RESERVED-PENDING-OXYGEN"

q_value:
  value: 8.6790
  unit: "MeV"

beta_delayed_neutron_probability:
  value: 95.1
  uncertainty: 0.7
  unit: "percent"
  source_id: "SRC-000008"
```
