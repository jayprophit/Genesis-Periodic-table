# Livermorium — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 6 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Livermorium record](0116-Livermorium-Lv.md)
- [Structured evaluation](data/isotopes/0116-Livermorium-Lv-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 289Lv | 173 | 184460# keV (unc. 500#) | 16# ms | UNAVAILABLE | A ? | 5850 |
| 290Lv | 174 | 185030# keV (unc. 550#) | 9 ms (unc. 3) | 0+ | A~100; SF ? | 5854 |
| 291Lv | 175 | 187240# keV (unc. 620#) | 26 ms (unc. 12) | UNAVAILABLE | A~100;SF ? | 5857 |
| 292Lv | 176 | 188130# keV (unc. 760#) | 16 ms (unc. 6) | 0+ | A~100; SF ? | 5860 |
| 293Lv | 177 | 190570# keV (unc. 520#) | 70 ms (unc. 30) | UNAVAILABLE | A~100; SF ? | 5862 |
| 293Lv · m [1] | 177 | 191290# keV (unc. 470#) | 80 ms (unc. 60) | UNAVAILABLE | A=100 | 5863 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
