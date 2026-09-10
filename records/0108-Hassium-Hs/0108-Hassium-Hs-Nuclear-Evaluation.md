# Hassium — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 26 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Hassium record](0108-Hassium-Hs.md)
- [Structured evaluation](data/isotopes/0108-Hassium-Hs-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 263Hs | 155 | 119680# keV (unc. 200#) | 0.9 ms (unc. 0.4) | 3/2+# | A~100;SF ? | 5680 |
| 263Hs · m [1] | 155 | 120000# keV (unc. 200#) | 1# ms | 11/2-# | A~100;SF ? | 5681 |
| 264Hs | 156 | 119563 keV (unc. 29) | 0.7 s (unc. 0.3) | 0+ | A=70 30;SF=30 30 | 5689 |
| 265Hs | 157 | 120900 keV (unc. 24) | 1.96 ms (unc. 0.16) | 3/2+# | A~100;SF ? | 5696 |
| 265Hs · m [1] | 157 | 121130 keV (unc. 24) | 360 us (unc. 150) | 11/2-# | A~100;IT ? | 5697 |
| 266Hs | 158 | 121140 keV (unc. 27) | 3.0 ms (unc. 0.6) | 0+ | A=76 9;SF=24 9 | 5704 |
| 266Hs · m [1] | 158 | 122240 keV (unc. 90) | 280 ms (unc. 220) | 9-# | A~100 | 5705 |
| 267Hs | 159 | 122660# keV (unc. 100#) | 55 ms (unc. 11) | UNAVAILABLE | A>80;SF ? | 5714 |
| 267Hs · m [1] | 159 | 122700# keV (unc. 100#) | 990 us (unc. 90) | UNAVAILABLE | A=?;IT ? | 5715 |
| 268Hs | 160 | 122970# keV (unc. 300#) | 1.4 s (unc. 1.1) | 0+ | A~100 | 5723 |
| 269Hs | 161 | 124490# keV (unc. 130#) | 15 s (unc. 7) | 9/2+# | A=100 | 5729 |
| 270Hs | 162 | 125110# keV (unc. 250#) | 9 s (unc. 4) | 0+ | A~100;SF ? | 5736 |
| 271Hs | 163 | 127690# keV (unc. 280#) | 10# s | UNAVAILABLE | A ?;SF ? | 5742 |
| 272Hs | 164 | 129000# keV (unc. 510#) | 10# s | 0+ | A ?;SF ? | 5748 |
| 273Hs | 165 | 131770# keV (unc. 370#) | 1060 ms (unc. 500) | UNAVAILABLE | A~100; SF ? | 5754 |
| 273Hs · p [3] | 165 | 131970# keV (unc. 390#) | UNAVAILABLE | UNAVAILABLE | A ?;SF ? | 5755 |
| 274Hs | 166 | 133410# keV (unc. 470#) | 500# ms | 0+ | A ?;SF ? | 5761 |
| 275Hs | 167 | 136490# keV (unc. 590#) | 280 ms (unc. 130) | UNAVAILABLE | A=100 | 5766 |
| 275Hs · p [3] | 167 | 136750# keV (unc. 600#) | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | 5767 |
| 276Hs | 168 | 138190# keV (unc. 720#) | 100# ms | 0+ | A ?;SF ? | 5772 |
| 277Hs | 169 | 141380# keV (unc. 450#) | 12 ms (unc. 9) | UNAVAILABLE | SF~100; A ? | 5779 |
| 277Hs · m [1] | 169 | 141480# keV (unc. 460#) | 130 s (unc. 100) | UNAVAILABLE | SF=100 | 5780 |
| 277Hs · p [3] | 169 | 142000# keV (unc. 490#) | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | 5781 |
| 278Hs | 170 | 143220# keV (unc. 300#) | 2# s | 0+ | SF~100; A ? | 5787 |
| 279Hs | 171 | 146500# keV (unc. 600#) | 1# s | UNAVAILABLE | A ?;SF ? | 5794 |
| 280Hs | 172 | 148420# keV (unc. 600#) | 100# ms | 0+ | A ?;SF ? | 5802 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
