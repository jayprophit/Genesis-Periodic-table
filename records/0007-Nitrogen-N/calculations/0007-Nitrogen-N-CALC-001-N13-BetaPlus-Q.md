# CALC-001 — Nitrogen-13 Positron-Decay Q-Value

Reaction:

$$
{}^{13}N
\rightarrow
{}^{13}C+e^++\nu_e
$$

Using neutral atomic masses:

$$
m({}^{13}N)=13.00573861\ u
$$

$$
m({}^{13}C)=13.00335483507\ u
$$

For positron decay using atomic masses:

$$
Q_{\beta^+}
=
[
M({}^{13}N)
-
M({}^{13}C)
-
2m_e
]c^2
$$

giving approximately:

$$
\boxed{
Q_{\beta^+}
\approx
1.19847\ {\rm MeV}
}
$$

```yaml
calculation_id: "MAT:0007:CALC:001"
classification: "DERIVED"

parent: "MAT:0007:ISO:N-13"
daughter: "MAT:0006:ISO:C-13"

q_value:
  value: 1.19847
  unit: "MeV"

source_ids:
  - "SRC-000101"
  - "SRC-000080"
  - "SRC-000018"
```
