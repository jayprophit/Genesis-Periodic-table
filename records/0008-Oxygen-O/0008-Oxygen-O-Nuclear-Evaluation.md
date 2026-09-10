# Oxygen — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 24 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Oxygen record](0008-Oxygen-O.md)
- [Structured evaluation](data/isotopes/0008-Oxygen-O-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 11O | 3 | 47740 keV (unc. 60) | 198 ys (unc. 12) | (3/2-) | 2p=100 | 88 |
| 12O | 4 | 32013 keV (unc. 12) | 8.9 zs (unc. 3.3) | 0+ | 2p=100 | 99 |
| 13O | 5 | 23115 keV (unc. 10) | 8.58 ms (unc. 0.05) | (3/2-) | B+=100;B+p=10.9 2 | 108 |
| 14O | 6 | 8007.781 keV (unc. 0.025) | 70.621 s (unc. 0.011) | 0+ | B+=100 | 118 |
| 15O | 7 | 2855.6 keV (unc. 0.5) | 122.266 s (unc. 0.043) | 1/2-* | B+=100 | 125 |
| 15O · i [8] | 7 | 14020# keV (unc. 40#) | UNAVAILABLE | (1/2+)  T=3/2 | p=100 | 126 |
| 16O | 8 | -4737.0021 keV (unc. 0.0003) | stbl | 0+ | IS=99.757 11 | 135 |
| 16O · p [3] | 8 | 8231.60 keV (unc. 0.27) | UNAVAILABLE | 2- | p=78 4;A=22 4;IT=0.28 3 | 136 |
| 16O · i [8] | 8 | 8059 keV (unc. 4) | UNAVAILABLE | 0-      T=1 | IT=100 | 137 |
| 16O · j [9] | 8 | 17984 keV (unc. 4) | UNAVAILABLE | 0+      T=2 | UNAVAILABLE | 138 |
| 17O | 9 | -808.7642 keV (unc. 0.0006) | stbl | 5/2+* | IS=0.03835 96 | 144 |
| 17O · i [8] | 9 | 10270.02 keV (unc. 0.17) | UNAVAILABLE | 1/2-    T=3/2 | B- ?;n ?;IT=0.42 14 | 145 |
| 18O | 10 | -782.8163 keV (unc. 0.0006) | stbl | 0+ | IS=0.2045 102 | 153 |
| 18O · i [8] | 10 | 15495 keV (unc. 20) | UNAVAILABLE | 1-      T=2 | UNAVAILABLE | 154 |
| 19O | 11 | 3332.9 keV (unc. 2.6) | 26.470 s (unc. 0.006) | 5/2+ | B-=100 | 163 |
| 20O | 12 | 3796.2 keV (unc. 0.9) | 13.51 s (unc. 0.05) | 0+ | B-=100 | 173 |
| 21O | 13 | 8062 keV (unc. 12) | 3.42 s (unc. 0.10) | (5/2+) | B-=100;B-n ? | 185 |
| 22O | 14 | 9280 keV (unc. 60) | 2.25 s (unc. 0.09) | 0+ | B-=100;B-n<22 | 195 |
| 23O | 15 | 14620 keV (unc. 120) | 97 ms (unc. 8) | 1/2+ | B-=100;B-n=7 2 | 208 |
| 24O | 16 | 18500 keV (unc. 160) | 77.4 ms (unc. 4.5) | 0+ | B-=100;B-n=43 4 | 220 |
| 25O | 17 | 27330 keV (unc. 170) | 5.18 zs (unc. 0.35) | 3/2+# | n=100 | 235 |
| 26O | 18 | 34660 keV (unc. 160) | 4.2 ps (unc. 3.3) | 0+ | 2n=100 | 245 |
| 27O | 19 | 44670# keV (unc. 500#) | UNAVAILABLE | 3/2+# | n ?;2n ? | 259 |
| 28O | 20 | 52080# keV (unc. 700#) | UNAVAILABLE | 0+ | 2n ?;B-=0 | 271 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
