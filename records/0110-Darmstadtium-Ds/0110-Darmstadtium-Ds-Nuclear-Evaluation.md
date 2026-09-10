# Darmstadtium — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 24 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Darmstadtium record](0110-Darmstadtium-Ds.md)
- [Structured evaluation](data/isotopes/0110-Darmstadtium-Ds-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 267Ds | 157 | 133880# keV (unc. 200#) | 10 us (unc. 8) | 3/2+# | A=100 | 5717 |
| 268Ds | 158 | 133650# keV (unc. 300#) | 100# us | 0+ | A ? | 5725 |
| 269Ds | 159 | 134830 keV (unc. 30) | 230 us (unc. 110) | UNAVAILABLE | A=100 | 5731 |
| 270Ds | 160 | 134680 keV (unc. 40) | 205 us (unc. 48) | 0+ | A~100;SF ? | 5738 |
| 270Ds · m [1] | 160 | 136070 keV (unc. 60) | 4.3 ms (unc. 1.2) | 10-# | A~70;IT~30 | 5739 |
| 271Ds | 161 | 135950# keV (unc. 100#) | 144 ms (unc. 53) | UNAVAILABLE | SF=75;A=25 | 5744 |
| 271Ds · m [1] | 161 | 136020# keV (unc. 100#) | 1.7 ms (unc. 0.4) | UNAVAILABLE | A=100 | 5745 |
| 272Ds | 162 | 136080# keV (unc. 420#) | 200# ms | 0+ | SF ? | 5750 |
| 273Ds | 163 | 138290# keV (unc. 140#) | 240 us (unc. 100) | UNAVAILABLE | A~100 | 5757 |
| 273Ds · m [1] | 163 | 138490# keV (unc. 140#) | 120 ms | UNAVAILABLE | A=100 | 5758 |
| 274Ds | 164 | 139200# keV (unc. 390#) | 10# ms | 0+ | A ?;SF ? | 5763 |
| 275Ds | 165 | 141670# keV (unc. 340#) | 10# ms | UNAVAILABLE | A ?;SF ? | 5769 |
| 276Ds | 166 | 142540# keV (unc. 550#) | 16# ms | 0+ | A ?;SF ? | 5775 |
| 277Ds | 167 | 145090# keV (unc. 390#) | 6 ms (unc. 3) | UNAVAILABLE | A~100;SF ? | 5783 |
| 278Ds | 168 | 146250# keV (unc. 510#) | 270# ms | 0+ | A ?;SF ? | 5790 |
| 279Ds | 169 | 149020# keV (unc. 610#) | 210 ms (unc. 40) | UNAVAILABLE | SF=88 5;A=12 5 | 5796 |
| 279Ds · p [3] | 169 | 149250# keV (unc. 610#) | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | 5797 |
| 280Ds | 170 | 150320# keV (unc. 750#) | 25 ms (unc. 20) | 0+ | SF=100 | 5804 |
| 281Ds | 171 | 153270# keV (unc. 490#) | 14 s (unc. 3) | UNAVAILABLE | SF=90 7;A=10 7 | 5809 |
| 281Ds · m [1] | 171 | 153350# keV (unc. 460#) | 0.9 s (unc. 0.7) | UNAVAILABLE | A=100 | 5810 |
| 281Ds · p [3] | 171 | 153340# keV (unc. 500#) | UNAVAILABLE | UNAVAILABLE | UNAVAILABLE | 5811 |
| 282Ds | 172 | 154790# keV (unc. 300#) | 4.2 m (unc. 3.3) | 0+ | A~100; SF ? | 5816 |
| 283Ds | 173 | 157830# keV (unc. 500#) | 1# m | UNAVAILABLE | A ?;SF ? | 5820 |
| 284Ds | 174 | 159460# keV (unc. 500#) | 1# m | 0+ | A ?;SF ? | 5824 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
