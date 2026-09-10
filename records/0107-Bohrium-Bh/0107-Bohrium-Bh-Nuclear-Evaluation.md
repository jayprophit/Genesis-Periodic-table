# Bohrium — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 22 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Bohrium record](0107-Bohrium-Bh.md)
- [Structured evaluation](data/isotopes/0107-Bohrium-Bh-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 260Bh | 153 | 113120# keV (unc. 200#) | 41 ms (unc. 14) | UNAVAILABLE | A~100;B+ ?;SF ? | 5647 |
| 261Bh | 154 | 113080 keV (unc. 180) | 12.8 ms (unc. 3.2) | (5/2-) | A~100;SF ? | 5658 |
| 262Bh | 155 | 114250 keV (unc. 90) | 84 ms (unc. 11) | UNAVAILABLE | A~100;SF<20 | 5668 |
| 262Bh · m [1] | 155 | 114470 keV (unc. 110) | 9.5 ms (unc. 1.6) | UNAVAILABLE | A~100;SF ? | 5669 |
| 263Bh | 156 | 114500# keV (unc. 310#) | 200# ms | 5/2-# | A ? | 5679 |
| 264Bh | 157 | 115960# keV (unc. 180#) | 1.07 s (unc. 0.21) | UNAVAILABLE | A~86;SF~14;B+ ? | 5687 |
| 264Bh · p [3] | 157 | 116290# keV (unc. 230#) | UNAVAILABLE | am | UNAVAILABLE | 5688 |
| 265Bh | 158 | 116400# keV (unc. 240#) | 1.19 s (unc. 0.52) | 5/2-# | A=? | 5695 |
| 266Bh | 159 | 118100# keV (unc. 160#) | 10.6 s (unc. 2.2) | UNAVAILABLE | A~100;B+ ?;SF ? | 5703 |
| 267Bh | 160 | 118770# keV (unc. 260#) | 22 s (unc. 10) | 5/2-# | A=100 | 5713 |
| 268Bh | 161 | 120710# keV (unc. 380#) | 190# s | UNAVAILABLE | A ?;SF ? | 5722 |
| 269Bh | 162 | 121480# keV (unc. 370#) | 1# m | 5/2-# | A ? | 5728 |
| 270Bh | 163 | 124230# keV (unc. 300#) | 3.8 m (unc. 3.0) | UNAVAILABLE | A=100 | 5734 |
| 270Bh · p [3] | 163 | 124920# keV (unc. 360#) | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | 5735 |
| 271Bh | 164 | 125860# keV (unc. 380#) | 2.9 s (unc. 1.9) | UNAVAILABLE | A=100 | 5741 |
| 272Bh | 165 | 128790# keV (unc. 530#) | 11.3 s (unc. 1.8) | UNAVAILABLE | A~100 | 5747 |
| 273Bh | 166 | 130680# keV (unc. 660#) | 1# m | UNAVAILABLE | A ?;SF ? | 5753 |
| 274Bh | 167 | 133760# keV (unc. 580#) | 57 s (unc. 27) | UNAVAILABLE | A=100 | 5760 |
| 275Bh | 168 | 135780# keV (unc. 600#) | 1# m | 5/2-# | SF ? | 5765 |
| 276Bh | 169 | 138950# keV (unc. 600#) | 60# s | UNAVAILABLE | A ?;SF ? | 5771 |
| 277Bh | 170 | 141100# keV (unc. 600#) | 10# s | UNAVAILABLE | A ?;SF ? | 5778 |
| 278Bh | 171 | 144370# keV (unc. 400#) | 2# s | UNAVAILABLE | SF~100; A ? | 5786 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
