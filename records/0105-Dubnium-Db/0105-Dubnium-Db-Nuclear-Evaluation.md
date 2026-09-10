# Dubnium — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 24 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Dubnium record](0105-Dubnium-Db.md)
- [Structured evaluation](data/isotopes/0105-Dubnium-Db-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 255Db | 150 | 99600# keV (unc. 280#) | 54 ms | 9/2+# | SF~67;A ? | 5584 |
| 255Db · m [1] | 150 | 99700# keV (unc. 300#) | 2.8 ms | 1/2-# | SF~100;A ? | 5585 |
| 256Db | 151 | 100300# keV (unc. 190#) | 1.7 s (unc. 0.4) | 9-# | A=70 11;B+=30 11;SF ? | 5600 |
| 257Db | 152 | 100150 keV (unc. 160) | 2.3 s (unc. 0.2) | 9/2+# | A>94;SF<6;B+ ? | 5612 |
| 257Db · m [1] | 152 | 100290# keV (unc. 200#) | 670 ms (unc. 60) | (1/2-) | A>87;SF<13;B+ ? | 5613 |
| 258Db | 153 | 101510 keV (unc. 90) | 2.17 s (unc. 0.36) | 0-# | A=64 10;B+=36 10 | 5624 |
| 258Db · m [1] | 153 | 101560 keV (unc. 90) | 4.41 s (unc. 0.21) | 5+# | A=77 8;B+=23 8;SF ? | 5625 |
| 259Db | 154 | 101990 keV (unc. 60) | 510 ms (unc. 160) | 9/2+# | A=100 | 5636 |
| 260Db | 155 | 103670# keV (unc. 90#) | 1.52 s (unc. 0.13) | UNAVAILABLE | A=90.4 6;SF=9.6 6;B+ ? | 5644 |
| 260Db · p [3] | 155 | 103770# keV (unc. 180#) | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | 5645 |
| 261Db | 156 | 104310# keV (unc. 110#) | 4.7 s (unc. 1.0) | 9/2+# | SF=73 11;A=27 11 | 5654 |
| 261Db · p [3] | 156 | 104590# keV (unc. 230#) | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | 5655 |
| 262Db | 157 | 106250# keV (unc. 140#) | 34 s (unc. 4) | UNAVAILABLE | SF=52 4;A=48 4;B+ ? | 5664 |
| 262Db · p [3] | 157 | 106300# keV (unc. 160#) | UNAVAILABLE | UNAVAILABLE | A ? | 5665 |
| 263Db | 158 | 107110# keV (unc. 170#) | 29 s (unc. 9) | 9/2+# | SF=56 14;A=37 14;B+=6.9 16 | 5674 |
| 263Db · p [3] | 158 | 107370# keV (unc. 260#) | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | 5675 |
| 264Db | 159 | 109260# keV (unc. 240#) | 3# m | UNAVAILABLE | A ? | 5685 |
| 265Db | 160 | 110380# keV (unc. 220#) | 15# m | 9/2+# | A ? | 5692 |
| 266Db | 161 | 112740# keV (unc. 280#) | 80 m (unc. 70) | UNAVAILABLE | A ?;SF=?;B+ ? | 5701 |
| 267Db | 162 | 114010# keV (unc. 370#) | 2.0 h (unc. 1.1) | 9/2+# | SF=100 | 5710 |
| 268Db | 163 | 117060# keV (unc. 530#) | 29 h (unc. 3) | UNAVAILABLE | SF~100;B+ ?; A ? | 5719 |
| 268Db · p [3] | 163 | 117210# keV (unc. 540#) | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | 5720 |
| 269Db | 164 | 119150# keV (unc. 620#) | 3# h | 9/2+# | A ?;SF ? | 5726 |
| 270Db | 165 | 122400# keV (unc. 580#) | 1.7 h (unc. 1.0) | UNAVAILABLE | SF~87; A~13 | 5732 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
