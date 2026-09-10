# Roentgenium — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 16 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Roentgenium record](0111-Roentgenium-Rg.md)
- [Structured evaluation](data/isotopes/0111-Roentgenium-Rg-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 272Rg | 161 | 142770# keV (unc. 230#) | 4.2 ms (unc. 1.1) | UNAVAILABLE | A=100 | 5751 |
| 273Rg | 162 | 142890# keV (unc. 400#) | 2# ms | UNAVAILABLE | A ? | 5759 |
| 274Rg | 163 | 144610# keV (unc. 210#) | 20 ms (unc. 11) | UNAVAILABLE | A~100 | 5764 |
| 275Rg | 164 | 145400# keV (unc. 450#) | 5# ms | UNAVAILABLE | A ? | 5770 |
| 276Rg | 165 | 147390# keV (unc. 630#) | 10# ms | UNAVAILABLE | A ?;SF ? | 5776 |
| 277Rg | 166 | 148410# keV (unc. 470#) | 4# ms | UNAVAILABLE | A ?;SF ? | 5784 |
| 278Rg | 167 | 150520# keV (unc. 390#) | 8 ms (unc. 5) | UNAVAILABLE | A=100 | 5791 |
| 279Rg | 168 | 151720# keV (unc. 420#) | 170 ms (unc. 110) | UNAVAILABLE | A=100 | 5798 |
| 279Rg · p [3] | 168 | 151760# keV (unc. 430#) | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | 5799 |
| 280Rg | 169 | 153890# keV (unc. 530#) | 4.3 s (unc. 0.5) | UNAVAILABLE | A=100 | 5805 |
| 281Rg | 170 | 155330# keV (unc. 770#) | 19 s (unc. 5) | UNAVAILABLE | SF=87 8;A=13 8 | 5812 |
| 282Rg | 171 | 157740# keV (unc. 590#) | 130 s (unc. 50) | UNAVAILABLE | A=100 | 5817 |
| 283Rg | 172 | 159380# keV (unc. 680#) | 2# m | UNAVAILABLE | A ?;SF ? | 5821 |
| 284Rg | 173 | 161970# keV (unc. 500#) | 1# m | UNAVAILABLE | A ?;SF ? | 5825 |
| 285Rg | 174 | 163730# keV (unc. 600#) | 30# s | UNAVAILABLE | A ?;SF ? | 5829 |
| 286Rg | 175 | 166510# keV (unc. 460#) | 10# s | UNAVAILABLE | A~100;SF ? | 5834 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
