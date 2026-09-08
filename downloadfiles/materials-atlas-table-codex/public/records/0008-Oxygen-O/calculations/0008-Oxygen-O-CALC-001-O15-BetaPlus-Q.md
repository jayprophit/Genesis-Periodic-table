# CALC-001 — Oxygen-15 Positron-Decay Q-Value

Reaction:

$$
{}^{15}O
\rightarrow
{}^{15}N
+
e^+
+
\nu_e
$$

Using neutral atomic masses:

$$
m({}^{15}O)
=
15.00306562\ u
$$

$$
m({}^{15}N)
=
15.00010889888\ u
$$

For positron decay using neutral atomic masses:

$$
Q_{\beta^+}
=
\left[
M({}^{15}O)
-
M({}^{15}N)
-
2m_e
\right]c^2
$$

giving:

$$
\boxed{
Q_{\beta^+}
\approx1.73217\ {\rm MeV}
}
$$

This is the total decay-energy window.

It is not the kinetic energy of each emitted positron.

```yaml
calculation_id: "MAT:0008:CALC:001"
classification: "DERIVED"

parent: "MAT:0008:ISO:O-15"
daughter: "MAT:0007:ISO:N-15"

q_value:
  value: 1.73217
  unit: "MeV"

source_ids:
  - "SRC-000126"
  - "SRC-000101"
  - "SRC-000018"
