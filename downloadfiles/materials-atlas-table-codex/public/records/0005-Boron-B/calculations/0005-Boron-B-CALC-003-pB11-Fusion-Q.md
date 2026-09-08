# CALC-003 — Proton–Boron-11 Reaction Q-Value

Reaction:

$$
{}^1H+{}^{11}B
\rightarrow
3\,{}^4He
$$

Using atomic masses:

$$
m({}^1H)
=
1.00782503223\ {\rm u}
$$

$$
m({}^{11}B)
=
11.00930536\ {\rm u}
$$

$$
m({}^4He)
=
4.00260325413\ {\rm u}
$$

Electron accounting balances when neutral atomic masses are used.

Mass difference:

$$
\Delta m
=
m({}^1H)+m({}^{11}B)-3m({}^4He)
$$

giving:

$$
\boxed{
Q
\approx
8.682112\ {\rm MeV}
}
$$

The principal reaction products are three alpha particles.

Scientific interpretation:

```text
ESTABLISHED NUCLEAR REACTION
```

Engineering interpretation:

```text
ADVANCED FUSION RESEARCH
NOT COMMERCIALLY MATURE
```

DOE notes that proton–Boron fusion requires substantially higher ion temperatures than D–T fusion.

```yaml
calculation_id: "MAT:0005:CALC:003"
classification: "DERIVED"

reaction:
  reactants:
    - "MAT:0001:ISO:H-1"
    - "MAT:0005:ISO:B-11"

  products:
    - "MAT:0002:ISO:He-4"
    - "MAT:0002:ISO:He-4"
    - "MAT:0002:ISO:He-4"

q_value:
  value: 8.682112
  unit: "MeV"

scientific_status:
  reaction: "ESTABLISHED"
  practical_energy_system: "RESEARCH"

source_ids:
  - "SRC-000063"
  - "SRC-000019"
  - "SRC-000014"
  - "SRC-000068"
```

---
