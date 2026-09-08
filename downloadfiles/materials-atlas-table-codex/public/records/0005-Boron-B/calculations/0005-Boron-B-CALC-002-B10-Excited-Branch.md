# CALC-002 — Dominant Boron-10 Capture Branch

A dominant thermal-neutron capture branch produces excited Lithium-7:

$$
{}^{10}B+n
\rightarrow
{}^7Li^*+\alpha
$$

followed by:

$$
{}^7Li^*
\rightarrow
{}^7Li+\gamma
$$

with the gamma energy approximately:

$$
E_\gamma
\approx
0.478\ {\rm MeV}
$$

The available kinetic energy before gamma emission is therefore approximately:

$$
Q_{\rm kinetic}
\approx
2.790-0.478
$$

$$
\boxed{
Q_{\rm kinetic}
\approx
2.312\ {\rm MeV}
}
$$

while the complete final-state energy release remains the full reaction Q-value:

$$
\approx2.790\ {\rm MeV}
$$

Reference branching fraction near the thermal-neutron standard region:

$$
f_{\rm excited}
\approx
0.937
$$

The branch fraction is neutron-energy dependent and must retain its reference conditions.

```yaml
calculation_id: "MAT:0005:CALC:002"
classification: "DERIVED-PLUS-EVALUATED-BRANCH"

parent_calculation: "MAT:0005:CALC:001"

gamma:
  approximate_energy:
    value: 0.478
    unit: "MeV"

excited_branch_fraction:
  approximate_value: 0.937
  neutron_regime: "THERMAL / LOW-ENERGY REFERENCE"
  source_id: "SRC-000067"

rules:
  branch_fraction_is_universal: false
  gamma_energy_equals_total_q_value: false
```

---
