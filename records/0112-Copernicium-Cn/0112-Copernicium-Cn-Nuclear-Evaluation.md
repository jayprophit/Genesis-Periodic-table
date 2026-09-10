# Copernicium — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 14 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Copernicium record](0112-Copernicium-Cn.md)
- [Structured evaluation](data/isotopes/0112-Copernicium-Cn-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 276Cn | 164 | 150360# keV (unc. 500#) | 100# us | 0+ | A ?;SF ? | 5777 |
| 277Cn | 165 | 152330# keV (unc. 150#) | 790 us (unc. 330) | UNAVAILABLE | A=100 | 5785 |
| 278Cn | 166 | 152840# keV (unc. 440#) | 2# ms | 0+ | A ?;SF ? | 5792 |
| 279Cn | 167 | 155020# keV (unc. 400#) | 60# us | UNAVAILABLE | A ?;SF ? | 5800 |
| 280Cn | 168 | 155650# keV (unc. 580#) | 5# ms | 0+ | A ?;SF ? | 5806 |
| 281Cn | 169 | 157950# keV (unc. 400#) | 180 ms (unc. 80) | UNAVAILABLE | A~100;SF ? | 5813 |
| 282Cn | 170 | 158830# keV (unc. 550#) | 1.1 ms (unc. 0.3) | 0+ | SF~100; A ? | 5818 |
| 283Cn | 171 | 161340# keV (unc. 620#) | 4.7 s (unc. 0.8) | UNAVAILABLE | A=81;SF=19 | 5822 |
| 284Cn | 172 | 162420# keV (unc. 760#) | 102 ms (unc. 17) | 0+ | SF=100 | 5826 |
| 285Cn | 173 | 165090# keV (unc. 510#) | 30 s (unc. 8) | UNAVAILABLE | A=100 | 5830 |
| 285Cn · m [1] | 173 | 165620# keV (unc. 460#) | 15 s (unc. 12) | UNAVAILABLE | A=100 | 5831 |
| 286Cn | 174 | 166450# keV (unc. 700#) | 30 s (unc. 30) | 0+ | A~100;SF ? | 5835 |
| 287Cn | 175 | 169370# keV (unc. 700#) | 30# s | UNAVAILABLE | A ?;SF ? | 5838 |
| 288Cn | 176 | 170930# keV (unc. 700#) | 10# s | 0+ | A ?;SF ? | 5842 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
