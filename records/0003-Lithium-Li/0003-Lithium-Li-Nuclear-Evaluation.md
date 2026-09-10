# Lithium — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 16 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Lithium record](0003-Lithium-Li.md)
- [Structured evaluation](data/isotopes/0003-Lithium-Li-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 3Li | 0 | 28670# keV (unc. 2000#) | p-unst | 3/2-# | p ? | 31 |
| 4Li | 1 | 25320 keV (unc. 210) | 91 ys (unc. 9) | 2- | p=100 | 34 |
| 5Li | 2 | 11680 keV (unc. 50) | 370 ys (unc. 30) | 3/2- | p=100 | 37 |
| 6Li | 3 | 14086.8804 keV (unc. 0.0014) | stbl | 1+* | IS=4.85 171 | 41 |
| 6Li · i [8] | 3 | 17649.76 keV (unc. 0.10) | 56 as (unc. 14) | 0+      T=1 | IT=100 | 42 |
| 7Li | 4 | 14907.105 keV (unc. 0.004) | stbl | 3/2-* | IS=95.15 171 | 47 |
| 7Li · i [8] | 4 | 26150 keV (unc. 30) | UNAVAILABLE | 3/2-    T=3/2 | UNAVAILABLE | 48 |
| 8Li | 5 | 20945.80 keV (unc. 0.05) | 838.7 ms (unc. 0.3) | 2+ | B-=100;B-A=100 | 53 |
| 8Li · i [8] | 5 | 31768 keV (unc. 5) | UNAVAILABLE | 0+      T=2 | UNAVAILABLE | 54 |
| 9Li | 6 | 24954.91 keV (unc. 0.19) | 178.2 ms (unc. 0.4) | 3/2- | B-=100;B-n=50.5 10 | 62 |
| 10Li | 7 | 33053 keV (unc. 13) | 2.0 zs (unc. 0.5) | (1-,2-) | n=100 | 69 |
| 10Li · m [1] | 7 | 33250 keV (unc. 40) | 3.7 zs (unc. 1.5) | 1+ | IT=100 | 70 |
| 10Li · n [2] | 7 | 33530 keV (unc. 40) | 1.35 zs (unc. 0.24) | (2+) | IT=100 | 71 |
| 11Li | 8 | 40728.3 keV (unc. 0.6) | 8.75 ms (unc. 0.06) | 3/2-* | B-=100;B-n=86.3 9;B-2n=4.1 4;B-3n=1.9 2;B-A=1.7 3;B-d=0.0130 13;B-t=0.0093 8 | 78 |
| 12Li | 9 | 49010 keV (unc. 30) | UNAVAILABLE | (1-,2-) | n ? | 89 |
| 13Li | 10 | 56980 keV (unc. 70) | 3.3 zs (unc. 1.2) | 3/2-# | 2n=100 | 100 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
