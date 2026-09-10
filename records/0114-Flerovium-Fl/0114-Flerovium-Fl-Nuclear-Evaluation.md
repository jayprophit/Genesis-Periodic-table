# Flerovium — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 9 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Flerovium record](0114-Flerovium-Fl.md)
- [Structured evaluation](data/isotopes/0114-Flerovium-Fl-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 284Fl | 170 | 168780# keV (unc. 660#) | 3.1 ms (unc. 1.3) | 0+ | SF~100;A ? | 5828 |
| 285Fl | 171 | 170930# keV (unc. 400#) | 210 ms (unc. 100) | UNAVAILABLE | A~100;SF<20 | 5833 |
| 286Fl | 172 | 171610# keV (unc. 550#) | 130 ms (unc. 30) | 0+ | A=59 11;SF=41 11 | 5837 |
| 287Fl | 173 | 173930# keV (unc. 620#) | 510 ms (unc. 120) | UNAVAILABLE | A~100; SF ? | 5840 |
| 288Fl | 174 | 174920# keV (unc. 760#) | 653 ms (unc. 113) | 0+ | A~100; SF ? | 5844 |
| 289Fl | 175 | 177470# keV (unc. 510#) | 2.1 s (unc. 0.6) | UNAVAILABLE | A~100;SF ? | 5847 |
| 289Fl · m [1] | 175 | 178220# keV (unc. 470#) | 1.1 s (unc. 0.8) | UNAVAILABLE | A=100 | 5848 |
| 290Fl | 176 | 178730# keV (unc. 700#) | 80 s (unc. 60) | 0+ | A~100; SF ?; B+<50 | 5852 |
| 291Fl | 177 | 181500# keV (unc. 700#) | 10# s | UNAVAILABLE | A ?;SF ? | 5855 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
