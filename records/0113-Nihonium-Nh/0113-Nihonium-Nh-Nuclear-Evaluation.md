# Nihonium — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 13 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Nihonium record](0113-Nihonium-Nh.md)
- [Structured evaluation](data/isotopes/0113-Nihonium-Nh-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 278Nh | 165 | 159030# keV (unc. 220#) | 2.3 ms (unc. 1.3) | UNAVAILABLE | A~100 | 5793 |
| 279Nh | 166 | 159460# keV (unc. 600#) | 1# ms | UNAVAILABLE | A ?;SF ? | 5801 |
| 280Nh | 167 | 161240# keV (unc. 400#) | 10# ms | UNAVAILABLE | A ?;SF ? | 5807 |
| 281Nh | 168 | 161810# keV (unc. 300#) | 100# ms | UNAVAILABLE | A ?;SF ? | 5814 |
| 282Nh | 169 | 163730# keV (unc. 400#) | 140 ms (unc. 90) | UNAVAILABLE | A=100 | 5819 |
| 283Nh | 170 | 164560# keV (unc. 440#) | 140 ms (unc. 90) | UNAVAILABLE | A=100 | 5823 |
| 284Nh | 171 | 166590# keV (unc. 530#) | 0.97 s (unc. 0.11) | UNAVAILABLE | A=100 | 5827 |
| 285Nh | 172 | 167770# keV (unc. 780#) | 4.6 s (unc. 1.1) | UNAVAILABLE | A=100 | 5832 |
| 286Nh | 173 | 169960# keV (unc. 590#) | 12 s (unc. 5) | UNAVAILABLE | A=100 | 5836 |
| 287Nh | 174 | 171460# keV (unc. 710#) | 20# s | UNAVAILABLE | A ?;SF ? | 5839 |
| 288Nh | 175 | 173970# keV (unc. 700#) | 20# s | UNAVAILABLE | A ?;SF ? | 5843 |
| 289Nh | 176 | 175550# keV (unc. 500#) | 30# s | UNAVAILABLE | A ?;SF ? | 5846 |
| 290Nh | 177 | 178320# keV (unc. 470#) | 8 s (unc. 6) | UNAVAILABLE | A~100; SF<50 | 5851 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
