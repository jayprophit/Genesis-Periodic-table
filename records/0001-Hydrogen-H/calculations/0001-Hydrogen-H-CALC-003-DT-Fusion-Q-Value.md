# CALC-003 — D-T Fusion Q-Value

## Calculation ID

```text
MAT:0001:CALC:003
```

Reaction:

$$
{}^2H+{}^3H
\rightarrow
{}^4He+n
$$

Using atomic masses:

$$
m_D
=
2.01410177812\ {\rm u}
$$

$$
m_T
=
3.0160492779\ {\rm u}
$$

$$
m_{^4He}
=
4.00260325413\ {\rm u}
$$

and neutron mass:

$$
m_n
=
1.00866491595\ {\rm u}
$$

The atomic electrons balance between the initial D+T atoms and final neutral He atom.

Mass difference:

$$
\Delta m
=
m_D+m_T-m_{^4He}-m_n
$$

$$
\Delta m
=
0.01888288594\ {\rm u}
$$

Using the CODATA 2022 atomic-mass energy equivalent:

$$
1\ {\rm u}\,c^2
=
931.49410372\ {\rm MeV}
$$

gives:

$$
Q
=
17.5892969\ {\rm MeV}
$$

or conventionally:

$$
\boxed{
Q\approx17.6\ {\rm MeV}
}
$$

The formal uncertainty from the listed mass uncertainties is only of order:

$$
2.3\times10^{-6}\ {\rm MeV}
$$

before considering source covariance and evaluation details.

```yaml
calculation_id: "MAT:0001:CALC:003"
reaction: "2H + 3H -> 4He + n"

mass_difference:
  value: 0.01888288594
  unit: "u"

q_value:
  value: 17.5892969
  unit: "MeV"

classification: "DERIVED"
source_ids:
  - "SRC-H-002"
  - "SRC-H-014"
  - "SRC-H-015"
```

---
