# Seaborgium — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 23 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Seaborgium record](0106-Seaborgium-Sg.md)
- [Structured evaluation](data/isotopes/0106-Seaborgium-Sg-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 258Sg | 152 | 105300# keV (unc. 410#) | 2.7 ms (unc. 0.5) | 0+ | SF~100;A ? | 5626 |
| 259Sg | 153 | 106520# keV (unc. 180#) | 402 ms (unc. 56) | (11/2-) | A~100;SF ?;B+ ? | 5637 |
| 259Sg · m [1] | 153 | 106610# keV (unc. 180#) | 226 ms (unc. 27) | (1/2+) | A~97 1;SF~3 1;B+ ? | 5638 |
| 260Sg | 154 | 106547 keV (unc. 21) | 4.95 ms (unc. 0.33) | 0+ | SF=71 3;A=29 3 | 5646 |
| 261Sg | 155 | 108005 keV (unc. 18) | 183 ms (unc. 5) | (3/2+) | A=98.1 4;B+=1.3 3;SF=0.6 2 | 5656 |
| 261Sg · m [1] | 155 | 108110# keV (unc. 50#) | 9.3 us (unc. 1.8) | 7/2+# | IT=100 | 5657 |
| 262Sg | 156 | 108369 keV (unc. 22) | 10.3 ms (unc. 1.7) | 0+ | SF=94 6;A ? | 5666 |
| 262Sg · p [3] | 156 | 109230 keV (unc. 110) | UNAVAILABLE | 9-# | UNAVAILABLE | 5667 |
| 263Sg | 157 | 110200# keV (unc. 100#) | 940 ms (unc. 140) | 3/2+# | A=87 8;SF=13 8 | 5676 |
| 263Sg · m [1] | 157 | 110250# keV (unc. 100#) | 420 ms (unc. 100) | 7/2+# | A~100;SF ?;IT ? | 5677 |
| 263Sg · p [3] | 157 | 110290# keV (unc. 100#) | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | 5678 |
| 264Sg | 158 | 110780# keV (unc. 280#) | 78 ms (unc. 25) | 0+ | SF>80;A ? | 5686 |
| 265Sg | 159 | 112790# keV (unc. 140#) | 9.2 s (unc. 1.6) | 11/2-# | A>50;SF ? | 5693 |
| 265Sg · m [1] | 159 | 112790# keV (unc. 130#) | 16.4 s (unc. 2.4) | UNAVAILABLE | A>50;SF ? | 5694 |
| 266Sg | 160 | 113620# keV (unc. 250#) | 390 ms (unc. 110) | 0+ | SF>90 | 5702 |
| 267Sg | 161 | 115810# keV (unc. 260#) | 1.8 m (unc. 0.7) | UNAVAILABLE | SF=83;A=17 | 5711 |
| 267Sg · p [3] | 161 | 115830# keV (unc. 270#) | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | 5712 |
| 268Sg | 162 | 116800# keV (unc. 470#) | 2# m | 0+ | A ?;SF ? | 5721 |
| 269Sg | 163 | 119690# keV (unc. 370#) | 5 m (unc. 2) | UNAVAILABLE | A~100;SF ? | 5727 |
| 270Sg | 164 | 121430# keV (unc. 460#) | 3# m | 0+ | A ?;SF ? | 5733 |
| 271Sg | 165 | 124620# keV (unc. 590#) | 2.2 m (unc. 1.1) | UNAVAILABLE | A=42 23;SF=58 23 | 5740 |
| 272Sg | 166 | 126520# keV (unc. 690#) | 4# m | 0+ | A ?;SF ? | 5746 |
| 273Sg | 167 | 129920# keV (unc. 400#) | 5# m | UNAVAILABLE | SF ? | 5752 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
