# Neon — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 25 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Neon record](0010-Neon-Ne.md)
- [Structured evaluation](data/isotopes/0010-Neon-Ne-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 15Ne | 5 | 40220 keV (unc. 70) | 770 ys (unc. 300) | (3/2-) | 2p=100 | 128 |
| 16Ne | 6 | 23987 keV (unc. 20) | >5.7 zs | 0+ | 2p=100 | 140 |
| 17Ne | 7 | 16500.5 keV (unc. 0.4) | 109.2 ms (unc. 0.6) | 1/2-* | B+=100;B+p=94.4 29;B+A=3.51 1;B+pA=0.014 4 | 148 |
| 18Ne | 8 | 5317.6 keV (unc. 0.4) | 1664.20 ms (unc. 0.47) | 0+ | B+=100 | 158 |
| 19Ne | 9 | 1752.05 keV (unc. 0.16) | 17.2569 s (unc. 0.0019) | 1/2+* | B+=100 | 166 |
| 19Ne · i [8] | 9 | 9253 keV (unc. 9) | UNAVAILABLE | (5/2)+  T=3/2 | UNAVAILABLE | 167 |
| 20Ne | 10 | -7041.9322 keV (unc. 0.0015) | stbl | 0+ | IS=90.48 3 | 176 |
| 20Ne · i [8] | 10 | 3230.5 keV (unc. 2.0) | UNAVAILABLE | 2+      T=1 | IT=100 | 177 |
| 20Ne · j [9] | 10 | 9690.9 keV (unc. 2.8) | UNAVAILABLE | 0+      T=2 | IT=100 | 178 |
| 21Ne | 11 | -5731.78 keV (unc. 0.04) | stbl | 3/2+* | IS=0.27 1 | 187 |
| 21Ne · i [8] | 11 | 3129.0 keV (unc. 0.3) | UNAVAILABLE | 5/2+    T=3/2 | UNAVAILABLE | 188 |
| 22Ne | 12 | -8024.716 keV (unc. 0.018) | stbl | 0+ | IS=9.25 3 | 197 |
| 22Ne · i [8] | 12 | 5855 keV (unc. 10) | UNAVAILABLE | 4+      T=2 | UNAVAILABLE | 198 |
| 23Ne | 13 | -5154.05 keV (unc. 0.10) | 37.15 s (unc. 0.03) | 5/2+* | B-=100 | 210 |
| 24Ne | 14 | -5951.6 keV (unc. 0.5) | 3.38 m (unc. 0.02) | 0+ | B-=100[gs=0,m=100] | 222 |
| 25Ne | 15 | -2036 keV (unc. 29) | 602 ms (unc. 8) | 1/2+* | B-=100 | 237 |
| 26Ne | 16 | 481 keV (unc. 18) | 197 ms (unc. 2) | 0+ | B-=100;B-n=0.13 3 | 248 |
| 27Ne | 17 | 7050 keV (unc. 90) | 30.9 ms (unc. 1.1) | (3/2+) | B-=100;B-n=2.0 5;B-2n ? | 261 |
| 28Ne | 18 | 11300 keV (unc. 130) | 18.8 ms (unc. 0.2) | 0+ | B-=100;B-n=12 1;B-2n=3.7 5 | 273 |
| 29Ne | 19 | 18400 keV (unc. 150) | 14.7 ms (unc. 0.4) | (3/2-) | B-=100;B-n=28 5;B-2n=4 1 | 287 |
| 30Ne | 20 | 23280 keV (unc. 250) | 7.22 ms (unc. 0.18) | 0+ | B-=100;B-n=13 4;B-2n=8.9 23 | 299 |
| 31Ne | 21 | 31180 keV (unc. 270) | 3.4 ms (unc. 0.8) | (3/2-) | B-=100;B-n ?;B-2n ? | 310 |
| 32Ne | 22 | 37000# keV (unc. 500#) | 3.5 ms (unc. 0.9) | 0+ | B-=100;B-n ?;B-2n ? | 323 |
| 33Ne | 23 | 46130# keV (unc. 600#) | UNAVAILABLE | 7/2-# | n ? | 339 |
| 34Ne | 24 | 52840# keV (unc. 510#) | 2# ms (unc. >1.5us) | 0+ | B- ?;B-2n ?;B-n ? | 352 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
