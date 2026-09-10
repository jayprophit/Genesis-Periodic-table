# Boron — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 23 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Boron record](0005-Boron-B.md)
- [Structured evaluation](data/isotopes/0005-Boron-B-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 6B | 1 | 47320# keV (unc. 2000#) | p-unst | 2-# | 2p ? | 44 |
| 7B | 2 | 27677 keV (unc. 25) | 570 ys (unc. 14) | (3/2-) | p=100 | 51 |
| 8B | 3 | 22921.6 keV (unc. 1.0) | 771.9 ms (unc. 0.9) | 2+ | B+=100;B+A=100 | 58 |
| 8B · i [8] | 3 | 33546 keV (unc. 8) | UNAVAILABLE | 0+      T=2 | UNAVAILABLE | 59 |
| 9B | 4 | 12416.5 keV (unc. 0.9) | 800 zs (unc. 300) | 3/2- | p=100 | 65 |
| 9B · i [8] | 4 | 27071.0 keV (unc. 2.3) | UNAVAILABLE | 3/2-    T=3/2 | UNAVAILABLE | 66 |
| 10B | 5 | 12050.611 keV (unc. 0.015) | stbl | 3+* | IS=19.65 44 | 74 |
| 10B · i [8] | 5 | 13790.66 keV (unc. 0.04) | UNAVAILABLE | 0+      T=1 | IT=100 | 75 |
| 11B | 6 | 8667.708 keV (unc. 0.012) | stbl | 3/2-* | IS=80.35 44 | 81 |
| 11B · i [8] | 6 | 21228 keV (unc. 9) | UNAVAILABLE | 1/2+,(3/2+) | UNAVAILABLE | 82 |
| 11B · j [9] | 6 | 42230 keV (unc. 80) | UNAVAILABLE | 3/2-    T=5/2 | UNAVAILABLE | 83 |
| 12B | 7 | 13369.4 keV (unc. 1.3) | 20.20 ms (unc. 0.02) | 1+* | B-=100;B-A=0.60 2 | 92 |
| 12B · i [8] | 7 | 26088 keV (unc. 19) | UNAVAILABLE | 0+      T=2 | UNAVAILABLE | 93 |
| 13B | 8 | 16561.9 keV (unc. 1.0) | 17.16 ms (unc. 0.18) | 3/2- | B-=100;B-n=0.266 36 | 103 |
| 14B | 9 | 23664 keV (unc. 21) | 12.36 ms (unc. 0.29) | 2- | B-=100;B-n=6.04 23;B-2n ? | 112 |
| 14B · i [8] | 9 | 40728 keV (unc. 20) | 4.15 zs (unc. 1.9) | 0+      T=3 | IT ? | 113 |
| 15B | 10 | 28957 keV (unc. 21) | 10.18 ms (unc. 0.35) | 3/2- | B-=100;B-n=98.7 10;B-2n<1.5 | 121 |
| 16B | 11 | 37112 keV (unc. 25) | >4.6 zs | 0-# | n ? | 130 |
| 17B | 12 | 43720 keV (unc. 200) | 5.08 ms (unc. 0.05) | (3/2-) | B-=100;B-n=63 1;B-2n=12 2;B-3n=3.5 7;B-4n=0.4 3 | 141 |
| 18B | 13 | 51790 keV (unc. 200) | UNAVAILABLE | (2-) | n=100 | 150 |
| 19B | 14 | 59770 keV (unc. 530) | 2.92 ms (unc. 0.13) | (3/2-) | B-=100;B-n=71 9;B-2n=17 5;B-3n<9.1 | 160 |
| 20B | 15 | 69400 keV (unc. 550) | >912.4 ys | (1-,2-) | n=100;B-n ?;B-2n ? | 170 |
| 21B | 16 | 78380 keV (unc. 560) | >760 ys | (3/2-) | 2n=100 | 182 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
