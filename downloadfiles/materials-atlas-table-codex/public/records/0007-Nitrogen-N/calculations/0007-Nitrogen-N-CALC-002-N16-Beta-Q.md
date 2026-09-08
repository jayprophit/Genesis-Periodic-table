# CALC-002 — Nitrogen-16 Beta-Minus Total Q-Value

Reaction:

$$
{}^{16}N
\rightarrow
{}^{16}O+e^-+\bar\nu_e
$$

Using neutral atomic masses:

$$
m({}^{16}N)=16.0061019\ u
$$

$$
m({}^{16}O)=15.99491461957\ u
$$

gives:

$$
\boxed{
Q_{\beta^-}
\approx
10.4209\ {\rm MeV}
}
$$

This is the total decay-energy window.

It is **not** the energy of every beta particle or every gamma photon.

The important 6.12863 MeV gamma belongs to a particular daughter-state de-excitation branch.

```yaml
calculation_id: "MAT:0007:CALC:002"
classification: "DERIVED"

parent: "MAT:0007:ISO:N-16"
daughter: "MAT:0008:ISO:O-16"
daughter_status: "RESERVED-PENDING-OXYGEN"

q_value:
  value: 10.4209
  unit: "MeV"

source_ids:
  - "SRC-000101"
  - "SRC-000018"
```
