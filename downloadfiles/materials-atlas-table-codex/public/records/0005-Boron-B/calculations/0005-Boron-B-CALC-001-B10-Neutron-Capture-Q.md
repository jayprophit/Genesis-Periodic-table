# CALC-001 — Boron-10 Neutron Capture Ground-State Q-Value

Reaction:

$$
{}^{10}B+n
\rightarrow
{}^7Li+{}^4He
$$

Atomic masses:

$$
m({}^{10}B)
=
10.01293695\ {\rm u}
$$

$$
m_n
=
1.00866491595\ {\rm u}
$$

$$
m({}^7Li)
=
7.0160034366\ {\rm u}
$$

$$
m({}^4He)
=
4.00260325413\ {\rm u}
$$

The atomic-electron count balances between reactants and products.

Mass difference:

$$
\Delta m
=
m({}^{10}B)+m_n-m({}^7Li)-m({}^4He)
$$

$$
\Delta m
\approx
0.00299541462\ {\rm u}
$$

Using:

$$
1u\,c^2
=
931.49410372\ {\rm MeV}
$$

gives:

$$
\boxed{
Q
\approx
2.7899881\ {\rm MeV}
}
$$

This is the total ground-state reaction Q-value.

```yaml
calculation_id: "MAT:0005:CALC:001"
classification: "DERIVED"

reaction:
  reactants:
    - "MAT:0005:ISO:B-10"
    - "NEUTRON"

  products:
    - "MAT:0003:ISO:Li-7"
    - "MAT:0002:ISO:He-4"

q_value:
  value: 2.7899881
  unit: "MeV"

source_ids:
  - "SRC-000063"
  - "SRC-000035"
  - "SRC-000019"
  - "SRC-000018"
```

---
