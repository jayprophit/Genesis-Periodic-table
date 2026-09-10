# Carbon — Evaluated Nuclear States

<!-- generated-by: sync-nuclear-evaluation.mjs -->

**MAT Core Data · dated evaluation.** 21 nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.

- [Parent Carbon record](0006-Carbon-C.md)
- [Structured evaluation](data/isotopes/0006-Carbon-C-NUBASE2020-Evaluation.yaml)
- [Retained original source](../../data/catalog/sources/nubase_4.mas20.txt)
- [Evaluation paper](https://doi.org/10.1088/1674-1137/abddae) · SRC-000008

## How to read this table

A is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A `#` means an estimate from systematics; `?`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. `stbl` means stable in this evaluation, `p-unst` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.

## Nuclear state catalogue

| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |
|---|---:|---|---|---|---|---:|
| 8C | 2 | 35064 keV (unc. 18) | 3.5 zs (unc. 1.4) | 0+ | 2p=100 | 60 |
| 9C | 3 | 28911.0 keV (unc. 2.1) | 126.5 ms (unc. 0.9) | 3/2- | B+=100;B+p=7.5 6;B+A=38.4 16 | 67 |
| 10C | 4 | 15698.67 keV (unc. 0.07) | 19.3011 s (unc. 0.0015) | 0+ | B+=100 | 76 |
| 11C | 5 | 10649.40 keV (unc. 0.06) | 20.3402 m (unc. 0.0053) | 3/2-* | B+=100 | 84 |
| 11C · i [8] | 5 | 22810 keV (unc. 40) | UNAVAILABLE | 1/2+    T=3/2 | p=? | 85 |
| 12C | 6 | 0.0 keV (unc. 0.0) | stbl | 0+ | IS=98.94 6 | 94 |
| 12C · i [8] | 6 | 15108 keV (unc. 3) | UNAVAILABLE | 1+      T=1 | IT=?;A ? | 95 |
| 12C · j [9] | 6 | 27595.0 keV (unc. 2.4) | UNAVAILABLE | 0+      T=2 | UNAVAILABLE | 96 |
| 13C | 7 | 3125.0093 keV (unc. 0.0002) | stbl | 1/2-* | IS=1.06 6 | 104 |
| 13C · i [8] | 7 | 18233.8 keV (unc. 1.1) | UNAVAILABLE | 3/2-    T=3/2 | IT=0.82 7;n ?;A ? | 105 |
| 14C | 8 | 3019.893 keV (unc. 0.004) | 5.70 ky (unc. 0.03) | 0+ | B-=100 | 114 |
| 14C · i [8] | 8 | 25120 keV (unc. 100) | UNAVAILABLE | (2-)    T=2 | IT=100 | 115 |
| 15C | 9 | 9873.1 keV (unc. 0.8) | 2.449 s (unc. 0.005) | 1/2+ | B-=100 | 122 |
| 16C | 10 | 13694 keV (unc. 4) | 750 ms (unc. 6) | 0+ | B-=100;B-n=99.0 3 | 131 |
| 17C | 11 | 21032 keV (unc. 17) | 193 ms (unc. 6) | 3/2+ | B-=100;B-n=28.4 13;B-2n ? | 142 |
| 18C | 12 | 24920 keV (unc. 30) | 92 ms (unc. 2) | 0+ | B-=100;B-n=31.5 15;B-2n ? | 151 |
| 19C | 13 | 32410 keV (unc. 100) | 46.2 ms (unc. 2.3) | 1/2+ | B-=100;B-n=47 3;B-2n=7 3 | 161 |
| 20C | 14 | 37500 keV (unc. 230) | 16 ms (unc. 3) | 0+ | B-=100;B-n=70 11;B-2n<18.6 | 171 |
| 21C | 15 | 45640# keV (unc. 600#) | UNAVAILABLE | 1/2+# | n ? | 183 |
| 22C | 16 | 53610 keV (unc. 230) | 6.2 ms (unc. 1.3) | 0+ | B-=100;B-n=61 14;B-2n<37 | 193 |
| 23C | 17 | 64170# keV (unc. 1000#) | UNAVAILABLE | 3/2+# | n ? | 206 |

## Provenance and review

Source snapshot SHA-256: `1585a5eea86c5e17e90307c7e6e786d060049c4039e392a261ff6db977df9859`. Retrieved 2026-09-08. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.

## Derived decay metrics

The structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \(\lambda=\ln(2)/T_{1/2}\) and \(\tau=T_{1/2}/\ln(2)\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.
