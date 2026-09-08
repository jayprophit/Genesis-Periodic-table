# CALC-004 — Graphite Combustion to Carbon Dioxide

Reference reaction:

$$
C_{\rm graphite}+O_2(g)
\rightarrow
CO_2(g)
$$

At standard reference conditions NIST-JANAF gives approximately:

$$
\Delta_fH^\circ_{298.15}(CO_2)
=
-393.522\pm0.050\ {\rm kJ\,mol^{-1}}
$$

Because elemental graphite and oxygen are reference elemental states,
this corresponds to the reaction enthalpy for complete combustion:

$$
\boxed{
\Delta_rH^\circ
\approx
-393.522\ {\rm kJ\,mol^{-1}}
}
$$

Classification:

```text
EXOTHERMIC CHEMICAL TRANSFORMATION
```

This value applies to:

```text
GRAPHITE + O2(g) -> CO2(g)
```

under the stated reference conditions.

It must not automatically be copied to:

```text
diamond combustion
amorphous carbon
CO-forming combustion
real flame systems
non-standard temperature/pressure
```

without the appropriate corrections.

```yaml
calculation_id: "MAT:0006:CALC:004"
classification: "EVALUATED-THERMOCHEMICAL-REFERENCE"

reaction: "C(graphite) + O2(g) -> CO2(g)"

standard_reaction_enthalpy:
  value: -393.522
  uncertainty: 0.050
  unit: "kJ/mol"
  temperature:
    value: 298.15
    unit: "K"

source_id: "SRC-000085"
```

````

The NIST-JANAF value for gaseous CO₂ at 298.15 K is `−393.522 ± 0.05 kJ/mol`, giving a clean reference for the graphite-combustion branch. :contentReference[oaicite:9]{index=9} The Hoyle state is a \(0^+\) Carbon-12 state near **7.65 MeV** and is central to the stellar triple-alpha process; that excitation energy is distinct from the **7.274748 MeV net Q-value** of converting three alpha particles to ground-state ¹²C. :contentReference[oaicite:10]{index=10}

Add the machine-readable nuclear and process layers:

```yaml
