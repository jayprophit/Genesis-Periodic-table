# MAT Codex — Advanced Data and Readiness Review

Review completed over 9–10 September 2026. This continues the existing MAT checkout, its templates, source archives and history.

## Genesis template reconciliation

The named conversations **Continue MAT Architecture Prompt** and **Generate Folder Structure** were paginated to their beginning: 42 and 47 turns respectively. The connector truncates 55 long messages, so this is a bounded view rather than a complete conversation export. The [path reconciliation](../../data/intake/genesis-template-reconciliation.json) compares file-labelled blocks with the current checkout. Existing files were not replaced by older conversation copies. The former How-to-Use filename is an intentional rename; isotope data already held in NUBASE catalogues were not copied into duplicate child files.

Twelve complete missing Neon and Aluminium research blocks are retained in an [addition review queue](../../data/intake/genesis-recovered-additions.json), with exact block hashes and archive paths. Their original bibliography identifiers still need recovery and claim-level checking. The list includes metastable spectroscopy, isotope geochemistry, matrix isolation, high-pressure inclusion compounds, aluminium elasticity, plasticity and alloy families. These are concrete pending data, not completed scientific coverage. Truncated blocks were not reconstructed by guessing.

## Relationship and identifier corrections

The relationship registries now use canonical edge identities while retaining legacy IDs. Seventy-eight explicit identities were assigned; this includes entries the old extractor counted differently. The 107 previously empty registries now contain 5,614 links from dated evaluated nuclear states to their parent elements. These links describe catalogue membership, not new chemical or decay mechanisms. Tests match every new edge to its exact source entry and line.

Sixty non-record endpoint labels are registered in a [concept vocabulary](../../data/registries/relationship-concepts.yaml), with classification and content-review status. Registering a label such as an author framework or material family does not certify the corresponding claim. [Migration provenance](../../data/quality/relationship-reconciliation.json) retains prior IDs and file hashes.

The old identifier parser truncated mixed-case chemical symbols, for example reading `He-3` as `H`. Extraction now preserves complete chemical symbols, charges and isomer suffixes. Documented references to children in other records resolve normally; genuinely missing targets remain warnings. Three missing targets were defined in their owning records: neutral Neon, formal oxide and formal nitride. Formal electron counts explicitly do not assert isolated gas-phase stability.

## Advanced nuclear calculations across all elements

All 118 evaluated nuclear datasets now include a derived decay constant and mean lifetime where the source half-life supports calculation. Of 5,842 states, 4,803 have results derived from evaluated numeric half-lives and 441 from explicitly estimated half-lives. The remaining 598 carry no numeric result.

The model is single exponential decay:

\[
\lambda=\frac{\ln 2}{T_{1/2}},\qquad \tau=\frac{T_{1/2}}{\ln 2}.
\]

The original time unit is retained, avoiding an implicit calendar-year conversion. Reciprocal inequalities reverse. Stable states do not acquire artificial finite lifetimes. Symmetric uncertainty is propagated to first order; asymmetric uncertainties and unavailable values remain explicit. These are calculations, not new measurements or additional significant figures. Existing specialist calculations remain in place.

## Selected primary-source review

The missing [Neon optical reference](../../records/0010-Neon-Ne/0010-Neon-Ne-Optical-Reference.md) now distinguishes the NIST atomic line in air from the CIPM conventional He–Ne laser reference in vacuum. Ten selected wavelengths were checked against the primary NIST table. The wavelength convention and the laser reference's uncertainty were checked against the primary metrology recommendation. Source identifiers through 299 were reserved for the recovered Genesis bibliography; the new accessions use 300 and 301 to avoid reassigning pending identifiers.

This is a scoped source check performed during implementation. It is not independent peer review of the full catalogue.

## Model descriptions and reader access

All seven previously undescribed generated-model slots now have bounded text alternatives and [model-description provenance](../../data/quality/model-description-review.json). Binary meshes were inspected and hashed without modification. Their lack of scientific calibration is explicit.

The tour now has a visible skip button on its welcome screen, a labelled dialog, keyboard focus containment and focus return. The tour launcher is separate from the brand link and has a 44-pixel minimum height. The test suite exercises cascading contents, saved desktop preference, narrow-screen keyboard operation, themes and selected reading routes in Chromium, Firefox and WebKit. Automated accessibility scans cover the open desktop sidebar and the mobile cover; they do not substitute for testing with actual assistive-technology users.

## Five-star assessment rubric

The [current acceptance score](../../data/quality/acceptance-rating.json) is an **internal engineering assessment**, calculated from five explicit gates:

1. Automated data and reader invariants pass.
2. Structural validators report no errors or warnings.
3. Local search p95 meets the stated 100 ms budget.
4. Selected reader content works in all three tested browser engines.
5. Cascading navigation, keyboard journeys and scoped automated accessibility checks pass in those engines.

One passing gate earns one star. The result can reach 5/5 for this stated local scope. It is not a whole-product rating or an independent industry certification. [Benchmark evidence](../../data/quality/benchmark.json) and [browser evidence](../../data/quality/reader-browser-results.json) retain the actual results, including failures when a run fails.

## Remaining release work

The unresolved research bibliography and advanced material-state/engineering fields remain visible in the review queue and [coverage matrix](../05-index/Record-Coverage.md). The next release work is recovery of complete source definitions, source-by-source assessment of the pending blocks, specialist scientific review, real screen-reader testing, real-user performance, production-load testing, visual rights review and a tagged full-book PDF. No score on the local rubric closes those gaps.
