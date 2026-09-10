# Nitrogen — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 23 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Nitrogen record](0007-Nitrogen-N.md)
- [Structured evaluation](data/isotopes/0007-Nitrogen-N-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 10N | 3 | 38800 keV (unc. 400) | 143 ys (unc. 36) | 1-,2- | p ? | 77 |
| 11N | 4 | 24366 keV (unc. 5) | 585 ys (unc. 7) | 1/2+ | p=100 | 86 |
| 11N · m [1] | 4 | 25110 keV (unc. 60) | 690 ys (unc. 80) | 1/2- | p=100 | 87 |
| 12N | 5 | 17338.1 keV (unc. 1.0) | 11.000 ms (unc. 0.016) | 1+* | B+=100;B+A=1.93 4 | 97 |
| 12N · i [8] | 5 | 29580 keV (unc. 4) | >5 zs | (0+)    T=2 | UNAVAILABLE | 98 |
| 13N | 6 | 5345.48 keV (unc. 0.27) | 9.965 m (unc. 0.004) | 1/2-* | B+=100 | 106 |
| 13N · i [8] | 6 | 20410.59 keV (unc. 0.18) | UNAVAILABLE | 3/2-    T=3/2 | IT=4.9 3;p ?;A ? | 107 |
| 14N | 7 | 2863.4168 keV (unc. 0.0002) | stbl | 1+* | IS=99.6205 247 | 116 |
| 14N · i [8] | 7 | 5176.007 keV (unc. 0.010) | UNAVAILABLE | 0+      T=1 | IT=100 | 117 |
| 15N | 8 | 101.4381 keV (unc. 0.0006) | stbl | 1/2-* | IS=0.3795 247 | 123 |
| 15N · i [8] | 8 | 11717 keV (unc. 4) | UNAVAILABLE | 1/2+    T=3/2 | n ?;p ?;IT=0.00523 19 | 124 |
| 16N | 9 | 5683.9 keV (unc. 2.3) | 7.13 s (unc. 0.02) | 2- | B-=100;B-A=0.00154 5 | 132 |
| 16N · m [1] | 9 | 5804.3 keV (unc. 2.3) | 5.25 us (unc. 0.06) | 0-      T=1 | IT~100;B-=0.000389 25 | 133 |
| 16N · i [8] | 9 | 15613 keV (unc. 7) | UNAVAILABLE | 0+      T=2 | UNAVAILABLE | 134 |
| 17N | 10 | 7870 keV (unc. 15) | 4.173 s (unc. 0.004) | 1/2- | B-=100;B-n=95.1 7;B-A=0.0025 4 | 143 |
| 18N | 11 | 13113 keV (unc. 19) | 619.2 ms (unc. 1.9) | 1- | B-=100;B-n=7.0 15;B-A=12.2 6;B-2n ? | 152 |
| 19N | 12 | 15856 keV (unc. 16) | 336 ms (unc. 3) | 1/2- | B-=100;B-n=41.8 9 | 162 |
| 20N | 13 | 21770 keV (unc. 80) | 136 ms (unc. 3) | (2-) | B-=100;B-n=42.9 14;B-2n ? | 172 |
| 21N | 14 | 25230 keV (unc. 130) | 85 ms (unc. 5) | (1/2-) | B-=100;B-n=87 3;B-2n ? | 184 |
| 22N | 15 | 31760 keV (unc. 210) | 23 ms (unc. 3) | 0-# | B-=100;B-n=34 3;B-2n=12 3 | 194 |
| 23N | 16 | 36720 keV (unc. 420) | 13.9 ms (unc. 1.4) | 1/2-# | B-=100;B-n=42 6;B-2n=8 4;B-3n<3.4 | 207 |
| 24N | 17 | 46940# keV (unc. 400#) | UNAVAILABLE | UNAVAILABLE | n ? | 219 |
| 25N | 18 | 55980# keV (unc. 500#) | UNAVAILABLE | 1/2-# | n ?;2n ?;B- ? | 234 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
