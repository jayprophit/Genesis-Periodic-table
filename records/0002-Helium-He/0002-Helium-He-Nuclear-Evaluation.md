# Helium — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 8 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Helium record](0002-Helium-He.md)
- [Structured evaluation](data/isotopes/0002-Helium-He-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 3He | 1 | 14931.21888 keV (unc. 0.00006) | stbl | 1/2+* | IS=0.0002 2 | 30 |
| 4He | 2 | 2424.91587 keV (unc. 0.00015) | stbl | 0+ | IS=99.9998 2 | 33 |
| 5He | 3 | 11231 keV (unc. 20) | 602 ys (unc. 22) | 3/2- | n=100 | 36 |
| 6He | 4 | 17592.10 keV (unc. 0.05) | 806.92 ms (unc. 0.24) | 0+ | B-=100;B-d=0.000278 18 | 40 |
| 7He | 5 | 26073 keV (unc. 8) | 2.51 zs (unc. 0.07) | (3/2)- | n=100 | 46 |
| 8He | 6 | 31609.68 keV (unc. 0.09) | 119.5 ms (unc. 1.5) | 0+ | B-=100;B-n=16 1;B-t=0.9 1 | 52 |
| 9He | 7 | 40940 keV (unc. 50) | 2.5 zs (unc. 2.3) | 1/2(+) | n=100 | 61 |
| 10He | 8 | 49200 keV (unc. 90) | 260 ys (unc. 40) | 0+ | 2n=100 | 68 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
