# Hydrogen — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 7 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Hydrogen record](0001-Hydrogen-H.md)
- [Structured evaluation](data/isotopes/0001-Hydrogen-H-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 1H | 0 | 7288.971064 keV (unc. 0.000013) | stbl | 1/2+* | IS=99.9855 78 | 27 |
| 2H | 1 | 13135.722895 keV (unc. 0.000015) | stbl | 1+* | IS=0.0145 78 | 28 |
| 3H | 2 | 14949.81090 keV (unc. 0.00008) | 12.32 y (unc. 0.02) | 1/2+* | B-=100 | 29 |
| 4H | 3 | 24620 keV (unc. 100) | 139 ys (unc. 10) | 2- | n=100 | 32 |
| 5H | 4 | 32890 keV (unc. 90) | 86 ys (unc. 6) | (1/2+) | 2n=100 | 35 |
| 6H | 5 | 41880 keV (unc. 250) | 294 ys (unc. 67) | 2-# | n ?;3n ? | 39 |
| 7H | 6 | 49140# keV (unc. 1000#) | 652 ys (unc. 558) | 1/2+# | 2n ? | 45 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
