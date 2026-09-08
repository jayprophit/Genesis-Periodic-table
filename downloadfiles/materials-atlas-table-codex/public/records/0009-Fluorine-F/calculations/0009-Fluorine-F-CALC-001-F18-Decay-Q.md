# CALC-001 — Fluorine-18 Decay Energetics

Parent:

$$
{}^{18}F
$$

Daughter:

$$
{}^{18}O
$$

Neutral atomic masses:

$$
M({}^{18}F)=18.00093733\ u
$$

$$
M({}^{18}O)=17.99915961286\ u
$$

Atomic-mass difference:

$$
Q_{\rm EC}
=
[M({}^{18}F)-M({}^{18}O)]c^2
$$

$$
\boxed{
Q_{\rm EC}
\approx1.65593\ {\rm MeV}
}
$$

For positron emission:

$$
Q_{\beta^+}
=
[M({}^{18}F)-M({}^{18}O)-2m_e]c^2
$$

giving:

$$
\boxed{
Q_{\beta^+}
\approx0.63394\ {\rm MeV}
}
$$

This corresponds to the approximate positron endpoint before nuclear recoil corrections.

Decay branches:

```yaml
beta_plus_percent:
  value: 96.86
  uncertainty: 0.16

electron_capture_percent:
  value: 3.14
  approximate: true
```

Important distinction:

```text
1.65593 MeV
=
TOTAL ATOMIC MASS-DIFFERENCE ENERGY

0.63394 MeV
=
POSITRON-EMISSION AVAILABLE ENERGY AFTER 2m_e c^2
```

The positron subsequently annihilates with an electron, typically producing two approximately:

$$
511\ {\rm keV}
$$

photons.

```yaml
calculation_id: "MAT:0009:CALC:001"
classification: "DERIVED-FROM-EVALUATED-MASSES"

parent: "MAT:0009:ISO:F-18"
daughter: "MAT:0008:ISO:O-18"

q_EC:
  value: 1.65593
  unit: "MeV"

q_beta_plus:
  value: 0.63394
  unit: "MeV"

source_ids:
  - "SRC-000158"
  - "SRC-000126"
  - "SRC-000167"
```

The ¹⁸F decay branch used above is supported by radionuclide standardization work: roughly **96.86% β⁺ and 3.14% electron capture**; TUNL’s dedicated half-life evaluation recommends **109.732 ± 0.011 min**. ([ScienceDirect][2])

The F₂ counterexample also becomes stronger numerically: modern work gives \(D_0(F_2)\) around **154.92 ± 0.10 kJ/mol**, reinforcing the original conclusion that Fluorine's extraordinary chemical reactivity does not originate from an exceptionally strong F–F bond. ([ACS Publications][3]) HF, by comparison, has \(r_e=0.916808\) Å, \(\omega_e=4138.32\ {\rm cm^{-1}}\), and \(B_e=20.9557\ {\rm cm^{-1}}\) in the NIST diatomic compilation. ([NIST WebBook][4])
