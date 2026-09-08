# CALC-004 — Reference Ammonia Formation Enthalpy

Reaction:

$$
N_2(g)+3H_2(g)
\rightarrow
2NH_3(g)
$$

NIST CODATA review value for gaseous ammonia:

$$
\Delta_fH^\circ_{298.15}(NH_3)
=
-45.94\pm0.35\ {\rm kJ\,mol^{-1}}
$$

For two moles:

$$
\Delta_rH^\circ
=
2(-45.94)
$$

$$
\boxed{
\Delta_rH^\circ
\approx
-91.88\ {\rm kJ}
}
$$

for the reaction as written.

The reverse decomposition:

$$
2NH_3
\rightarrow
N_2+3H_2
$$

therefore requires approximately:

$$
\boxed{
+91.88\ {\rm kJ}
}
$$

under the same standard-state reference convention.

This does **not** represent the total real-system energy needed to synthesize or crack ammonia.

Real systems additionally depend on:

```text
temperature
pressure
catalyst
conversion
separation
compression
heat integration
hydrogen production route
```

```yaml
calculation_id: "MAT:0007:CALC:004"
classification: "DERIVED-FROM-EVALUATED-THERMOCHEMISTRY"

reaction: "N2(g) + 3H2(g) -> 2NH3(g)"

standard_reaction_enthalpy:
  value: -91.88
  unit: "kJ"
  stoichiometric_basis: "2 mol NH3"
  temperature:
    value: 298.15
    unit: "K"

reverse_decomposition:
  value: 91.88
  unit: "kJ"

source_id: "SRC-000118"
