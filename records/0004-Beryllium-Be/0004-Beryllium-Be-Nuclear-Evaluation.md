# Beryllium — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 21 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Beryllium record](0004-Beryllium-Be.md)
- [Structured evaluation](data/isotopes/0004-Beryllium-Be-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 5Be | 1 | 37140# keV (unc. 2000#) | p-unst | 1/2+# | p ? | 38 |
| 6Be | 2 | 18375 keV (unc. 5) | 5.0 zs (unc. 0.3) | 0+ | 2p=100 | 43 |
| 7Be | 3 | 15769.00 keV (unc. 0.07) | 53.22 d (unc. 0.06) | 3/2- | EC=100 | 49 |
| 7Be · i [8] | 3 | 26750 keV (unc. 30) | UNAVAILABLE | 3/2-    T=3/2 | p ?;3He ?;A ? | 50 |
| 8Be | 4 | 4941.67 keV (unc. 0.04) | 81.9 as (unc. 3.7) | 0+ | A=100 | 55 |
| 8Be · i [8] | 4 | 21568 keV (unc. 3) | UNAVAILABLE | 2+  frg T=1 | A~100 | 56 |
| 8Be · j [9] | 4 | 32436.0 keV (unc. 2.0) | UNAVAILABLE | 0+      T=2 | n=39.4;d=27.0;3H=11.7;A=7.9;p=6.9;3He=6.6;IT=0.60 | 57 |
| 9Be | 5 | 11348.45 keV (unc. 0.08) | stbl | 3/2-* | IS=100 | 63 |
| 9Be · i [8] | 5 | 25738.8 keV (unc. 1.7) | 1.25 as (unc. 0.10) | 3/2-    T=3/2 | UNAVAILABLE | 64 |
| 10Be | 6 | 12607.49 keV (unc. 0.08) | 1.387 My (unc. 0.012) | 0+ | B-=100 | 72 |
| 10Be · i [8] | 6 | 33787 keV (unc. 21) | UNAVAILABLE | (2-)    T=2 | n ?;p ?;3H ? | 73 |
| 11Be | 7 | 20177.17 keV (unc. 0.24) | 13.76 s (unc. 0.07) | 1/2+* | B-=100;B-A=3.3 1;B-p=0.0013 3;B-n ? | 79 |
| 11Be · i [8] | 7 | 41336 keV (unc. 20) | 0.93 zs (unc. 0.13) | 3/2-    T=5/2 | IT ? | 80 |
| 12Be | 8 | 25077.8 keV (unc. 1.9) | 21.46 ms (unc. 0.05) | 0+ | B-=100;B-n=0.50 3 | 90 |
| 12Be · m [1] | 8 | 27328.8 keV (unc. 2.1) | 233 ns (unc. 7) | 0+ | IT=100 | 91 |
| 13Be | 9 | 33659 keV (unc. 10) | 1.0 zs (unc. 0.7) | (1/2-) | n ? | 101 |
| 13Be · p [3] | 9 | 35160 keV (unc. 50) | UNAVAILABLE | (5/2+) | UNAVAILABLE | 102 |
| 14Be | 10 | 39950 keV (unc. 130) | 4.53 ms (unc. 0.27) | 0+ | B-=100;B-n=86 6;B-2n=5 2;B-t=0.02 1;B-A<0.004 | 110 |
| 14Be · p [3] | 10 | 41470 keV (unc. 60) | UNAVAILABLE | (2+) | UNAVAILABLE | 111 |
| 15Be | 11 | 49830 keV (unc. 170) | 790 ys (unc. 270) | (5/2+) | n=100 | 120 |
| 16Be | 12 | 57450 keV (unc. 170) | 650 ys (unc. 130) | 0+ | 2n=100 | 129 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
