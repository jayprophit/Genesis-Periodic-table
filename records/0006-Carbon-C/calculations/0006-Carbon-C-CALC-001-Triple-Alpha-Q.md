# CALC-001 — Triple-Alpha Net Q-Value

Net reaction:

\[
3\,{}^4He
\rightarrow
{}^{12}C
\]

Using:

\[
m({}^4He)=4.00260325413\ u
\]

and:

\[
m({}^{12}C)=12\ u
\]

the mass difference is:

\[
\Delta m
=
3m({}^4He)-m({}^{12}C)
\]

\[
=
0.00780976239\ u
\]

Using:

\[
1u\,c^2=931.49410372\ {\rm MeV}
\]

gives:

\[
\boxed{
Q
=
7.274748\ {\rm MeV}
}
\]

The stellar reaction proceeds through intermediate nuclear states,
especially transient 8Be and the resonant 12C Hoyle state.

The net Q-value must not be confused with the Hoyle-state excitation energy.

```yaml
calculation_id: "MAT:0006:CALC:001"
classification: "DERIVED"

reaction:
  reactants:
    - "MAT:0002:ISO:He-4"
    - "MAT:0002:ISO:He-4"
    - "MAT:0002:ISO:He-4"

  product:
    - "MAT:0006:ISO:C-12"

q_value:
  value: 7.274748
  unit: "MeV"

source_ids:
  - "SRC-000019"
  - "SRC-000080"
  - "SRC-000018"
````
