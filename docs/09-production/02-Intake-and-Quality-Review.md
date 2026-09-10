# MAT Codex — Source Intake and Quality Review

This working edition extends the existing MAT repository. Original author material, Causali E, contributor attribution and the three evidence collections remain part of the book. The latest supplied conversations are reference material; embedded instructions and claims of validation were not executed or treated as evidence.

## Material recovered

| Source | Destination and interpretation |
|---|---|
| 42–43 | Sodium isotopes, nuclear references, engineering and final research sections |
| 44–47 | Magnesium source history, including partial and duplicate batches |
| 50–52 | Recovered Magnesium parent and completed batches; selected over shorter duplicates |
| 48–49 | Aluminium core, isotope and isomer data, spectra, NMR and calculation records |
| 41 | Referenced Sodium predecessor located locally to resolve missing source accessions |

The [intake ledger](../../data/intake/mat-42-52.json) records 12 original source files, SHA-256 hashes, source lines, version selection and 157 file-level operations. The original text files and prior baseline versions are archived. Seventy-four source accessions were recovered; registration does not establish claim support. The import command preserves subsequent edits when replayed.

- [Sodium intake and bibliography](../../records/0011-Sodium-Na/0011-Sodium-Na-Research-Intake.md)
- [Magnesium intake and bibliography](../../records/0012-Magnesium-Mg/0012-Magnesium-Mg-Research-Intake.md)
- [Aluminium intake and bibliography](../../records/0013-Aluminium-Al/0013-Aluminium-Al-Research-Intake.md)
- [Claims and reconciliation ledger](../../data/intake/mat-42-52-claims.json)

Genesis context was a bounded selection of project conversations and locally available material, not a complete project export. Its local synced sources folder was empty. The separately supplied files above are the traceable accession for this expansion.

## Extension to the remaining elements

All 118 elements now link to a structured and readable nuclear state catalogue. The retained [NUBASE2020 snapshot](../../data/catalog/sources/nubase_4.mas20.txt), published in 2021, supplies 5,842 states after excluding the free neutron from the chemical-element catalogue. The [coverage index](../../data/catalog/nuclear-evaluation-index.json) records each element's files and source hash. This is a dated primary evaluation, not a claim that later nuclear research is complete.

Mass excess, excitation, half-life, uncertainty text, estimates, inequalities, spin/parity and decay notation retain their raw source fields and line numbers. Stable or missing values are not replaced with zero. Isomers and ground states remain distinct. Forty-eight comparable numeric half-lives from the supplied isotope files agree with the snapshot; this narrow comparison does not validate all uncertainties, decay branches or engineering claims.

The earlier Sodium parent used a historical Sodium-24 half-life. Its primary value was reconciled to **14.9560 ± 0.0015 hours** from NUBASE2020. The prior value and the separate DDEP evaluation remain identified as history rather than averaged together.

## Improvements implemented

| Area | Result |
|---|---|
| Book hierarchy | Material Atlas Table retains all element records; the ten guide sections share one collapsible parent. Production guidance is indexed under Governance. |
| Search | The full chapter text is indexed, including content beyond the former 4,000-character cutoff. Single-letter symbols work and filter changes refresh results. |
| Cross-links | Heading entities are decoded before building fragment identifiers. Links are checked against parsed Markdown and actual rendered headings. The renamed How to Use MAT Codex route remains compatible. |
| Offline reading | Versioned caches include runtime modules, chapter sources, nuclear datasets, linked provenance, figures, 3D scenes and the linear print edition. Failed saves report partial coverage. |
| Startup | CSS modules are assembled during the build, removing the sequential stylesheet downloads that delayed navigation. |
| Keyboard and mobile | The closed mobile sidebar is removed from keyboard navigation. Escape can close it without a script error. Search and periodic navigation retain explicit controls. |
| Charts | Existing overview charts remain available with source-review labels, readable data tables and theme-aware text. The incorrect cosmic abundance citation to NUBASE is retained only as a historical source assertion. |
| Print | The linear HTML edition includes all manifest chapters, unique section anchors, internal links, local equation rendering and repeated table headers. |

## Reproducible acceptance checks

Run `npm run build:book`, `npm run build:publication`, `npm run check:studio`, `npm run test:studio`, `npm run test:e2e` and `npm run benchmark` from the repository. `npm run sync:nuclear` reproduces the evaluation files from the retained snapshot. `npm run build:intake-review` regenerates review navigation without promoting scientific status.

The [machine-readable benchmark](../../data/quality/benchmark.json) records the actual environment, pass/fail results, coverage and local search timing. Its 100 ms p95 search budget is a project acceptance target, not a published industry standard. Browser, offline and print observations are recorded in the [verification record](03-Local-Verification.md).

Accessibility work is guided by [WCAG 2.2](https://www.w3.org/TR/WCAG22/). Automated checks cover only part of conformance; keyboard and assistive-technology review remain necessary. [Core Web Vitals](https://web.dev/articles/vitals) require appropriate real-user measurement; a local search timing is not a substitute. No independent five-star rating is asserted.

## Remaining work and useful source suggestions

| Priority | Work | Acceptance evidence needed |
|---|---|---|
| Before scientific release | Review each new claim against the actual cited publication; complete vague bibliography entries | Source locator, units, conditions, uncertainty and reviewer decision for each accepted value |
| Before scientific release | Continue Aluminium engineering and the other elements' condition-specific properties | Source-backed phase, purity, temperature, pressure, alloy or specimen information; explicit unavailable states |
| Before public publishing | Resolve figure reuse rights and contributor consent where needed | Rights/provenance records and approved attribution |
| Before a broad accessibility claim | Test all representative flows with screen readers and across browsers, including speech and translation | Recorded manual and automated findings, not an inferred certification |
| Next content pass | Reconcile later evaluations, spectroscopy, mechanical properties and experiments | Dated source comparisons; conflicting evaluations stay separately attributable |
| Next visualization pass | Turn existing figure, graph and model specifications into scientific visuals | Dataset, transformations, axes, units, uncertainty, caption and rights attached to each visual |
| Later platform work | Evaluate source-file suggestions for richer search graphs, import/export and collaboration | A concrete MAT use case, bounded design and tests before implementation |

The large software phase list embedded in 47.txt is preserved as source history. It does not authorize unrelated system changes. Useful themes—provenance, typed data, reproducible builds, evidence review and accessible publication—are implemented or mapped above. No mass AI image generation was performed.
