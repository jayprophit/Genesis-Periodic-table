# Meitnerium — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 21 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Meitnerium record](0109-Meitnerium-Mt.md)
- [Structured evaluation](data/isotopes/0109-Meitnerium-Mt-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 265Mt | 156 | 126620# keV (unc. 440#) | 2# ms | UNAVAILABLE | A ? | 5698 |
| 266Mt | 157 | 127670 keV (unc. 100) | 2.0 ms (unc. 0.5) | UNAVAILABLE | A~100;SF ? | 5706 |
| 266Mt · m [1] | 157 | 128810 keV (unc. 120) | 6 ms (unc. 3) | UNAVAILABLE | A=100 | 5707 |
| 267Mt | 158 | 127790# keV (unc. 500#) | 10# ms | UNAVAILABLE | A ? | 5716 |
| 268Mt | 159 | 129150# keV (unc. 230#) | 23 ms (unc. 7) | UNAVAILABLE | A=100 | 5724 |
| 269Mt | 160 | 129300# keV (unc. 310#) | 100# ms | UNAVAILABLE | A ? | 5730 |
| 270Mt | 161 | 130710# keV (unc. 190#) | 800 ms (unc. 400) | UNAVAILABLE | A~100 | 5737 |
| 271Mt | 162 | 131100# keV (unc. 330#) | 400# ms | UNAVAILABLE | A ? | 5743 |
| 272Mt | 163 | 133480# keV (unc. 490#) | 400# ms | UNAVAILABLE | A ?;SF ? | 5749 |
| 273Mt | 164 | 134780# keV (unc. 420#) | 800# ms | UNAVAILABLE | A ?;SF ? | 5756 |
| 274Mt | 165 | 137250# keV (unc. 380#) | 850 ms (unc. 540) | UNAVAILABLE | A=100 | 5762 |
| 275Mt | 166 | 138770# keV (unc. 390#) | 31 ms (unc. 17) | UNAVAILABLE | A=100 | 5768 |
| 276Mt | 167 | 141310# keV (unc. 530#) | 700 ms (unc. 80) | UNAVAILABLE | A=100 | 5773 |
| 276Mt · m [1] | 167 | 141560# keV (unc. 540#) | 7 s (unc. 3) | UNAVAILABLE | A=100 | 5774 |
| 277Mt | 168 | 143010# keV (unc. 660#) | 9 s (unc. 6) | UNAVAILABLE | SF=100;A ? | 5782 |
| 278Mt | 169 | 145770# keV (unc. 580#) | 6 s (unc. 3) | UNAVAILABLE | A=100 | 5788 |
| 278Mt · p [3] | 169 | 146160# keV (unc. 590#) | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | 5789 |
| 279Mt | 170 | 147590# keV (unc. 670#) | 20# s | UNAVAILABLE | A ?;SF ? | 5795 |
| 280Mt | 171 | 150510# keV (unc. 600#) | 10# s | UNAVAILABLE | A ?;SF ? | 5803 |
| 281Mt | 172 | 152400# keV (unc. 600#) | 1# s | UNAVAILABLE | A ?;SF ? | 5808 |
| 282Mt | 173 | 155460# keV (unc. 450#) | 100# ms | UNAVAILABLE | A~100; SF ? | 5815 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
