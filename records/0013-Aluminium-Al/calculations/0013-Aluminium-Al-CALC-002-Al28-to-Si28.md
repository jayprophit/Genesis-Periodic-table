> **Imported research — review pending.** Recovered from [49.txt, line 827](../../../archive/source-intake/mat-42-52/49.txt). Source assertions of validation are historical statements, not independent test results. See the intake ledger for duplicates and unresolved references.

# Aluminium-28 → Silicon-28

\[
{}^{28}\mathrm{Al}
\rightarrow
{}^{28}\mathrm{Si}
+
e^-
+
\bar{\nu}_e
\]

Using neutral atomic mass excesses:

\[
ME(^{28}\mathrm{Al})
=
-16850.72\ \mathrm{keV}
\]

\[
ME(^{28}\mathrm{Si})
=
-21492.7971\ \mathrm{keV}
\]

For beta-minus decay using neutral atomic masses:

\[
Q_{\beta^-}
=
ME_p-ME_d
\]

Thus:

\[
Q_{\beta^-}
=
-16850.72
-
(-21492.7971)
\]

\[
\boxed{
Q_{\beta^-}
=
4642.0771\ \mathrm{keV}
}
\]

Approximate propagated uncertainty:

\[
\sigma_Q
\approx
0.050\ \mathrm{keV}
\]

Full chain:

\[
\boxed{
{}^{28}\mathrm{Mg}
\rightarrow
{}^{28}\mathrm{Al}
\rightarrow
{}^{28}\mathrm{Si}
}
\]

These remain two distinct nuclear transformations.

```yaml
calculation_id: "MAT:0013:CALC:002"

parent: "MAT:0013:ISO:Al-28"
daughter: "MAT:0014:ISO:Si-28"

q_beta_minus:
  value: 4.6420771
  uncertainty: 0.000050
  unit: "MeV"

prior_chain_parent:
  id: "MAT:0012:ISO:Mg-28"
  status: "RESOLVED"

source_id: "SRC-000278"

[1]: https://cpc.ihep.ac.cn/article/doi/10.1088/1674-1137/abddae "https://cpc.ihep.ac.cn/article/doi/10.1088/1674-1137/abddae"
[2]: https://fsunuc.physics.fsu.edu/git/rtang/PtolemyGUI/src/commit/939b63a79f354795f6202c1eed0619f48504d579/frecsoTools/nubase_4.mas20.txt "https://fsunuc.physics.fsu.edu/git/rtang/PtolemyGUI/src/commit/939b63a79f354795f6202c1eed0619f48504d579/frecsoTools/nubase_4.mas20.txt"
[3]: https://pmc.ncbi.nlm.nih.gov/articles/PMC10784626/ "https://pmc.ncbi.nlm.nih.gov/articles/PMC10784626/"
[4]: https://physics.nist.gov/PhysRefData/Handbook/Tables/aluminumtable3.htm "https://physics.nist.gov/PhysRefData/Handbook/Tables/aluminumtable3.htm"
[5]: https://www.aanda.org/articles/aa/pdf/2017/05/aa29854-16.pdf "https://www.aanda.org/articles/aa/pdf/2017/05/aa29854-16.pdf"
[6]: https://physics.nist.gov/cgi-bin/ASD/lines_hold.pl?el=Al "https://physics.nist.gov/cgi-bin/ASD/lines_hold.pl?el=Al"
