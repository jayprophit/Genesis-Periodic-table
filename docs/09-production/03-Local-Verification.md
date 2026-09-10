# MAT Codex — Local Verification

> This records the earlier 9 September implementation pass. The [advanced-data and readiness review](05-Advanced-Data-and-Readiness-Review.md) records the subsequent warning fixes, added data, browser coverage and current acceptance rubric.

**Verification date:** 2026-09-09  
**Scope:** local engineering acceptance of the source intake, nuclear catalogue, generated publication, Studio and reader  
**Repository:** `jayprophit/Materials-Atlas-Table-Codex---MAT`  
**Revision checked:** `6c557c361c8b099fbc9d1b3f51c2737fca744056`

The local checkout and the fetched `origin/main` revision matched before this work began. The remote fetch and push URLs both resolve to `https://github.com/jayprophit/Materials-Atlas-Table-Codex---MAT.git`. Existing history and pre-existing working-tree changes were retained; no history rewrite, commit or push was performed during this implementation pass.

## Reproducible checks

The machine-readable [benchmark result](../../data/quality/benchmark.json) records the environment, elapsed time, result and declared limits for each acceptance check.

| Check | Result | Evidence |
|---|---:|---|
| Publication build | Pass | 507 chapters; 119 record packages; Origin State plus 118 selectable elements |
| Reader unit suite | Pass | 29 of 29 tests covering reader, navigation, search, evidence-lane, scene-data and source-identity behaviour |
| Record validation | Pass | 0 errors; 0 warnings |
| Source validation | Pass | 0 errors; 0 warnings across 261 registered sources |
| Relationship validation | Pass with review items | 0 errors; 250 warnings |
| Asset validation | Pass with review items | 0 errors; 7 warnings |
| Internal link and anchor check | Pass | 0 errors; 0 warnings |
| Identifier check | Pass with review items | 0 errors; 180 warnings |
| Generated-book synchronisation | Pass | 0 errors; 0 warnings |
| Element coverage validation | Pass | all 118 elements selectable |
| Studio production build | Pass | 294 modules transformed |
| Studio unit tests | Pass | 5 of 5 tests |
| Studio Chromium journeys | Pass | 4 of 4 journeys, including the 118-element catalogue, persistence/export, keyboard/mobile/accessibility and Carbon citation/retry paths |
| Local search benchmark | Pass | 270 samples; 8.36 ms p50; 14.65 ms p95; 31.79 ms maximum; 100 ms p95 budget |

The relationship warnings preserve 72 legacy relationship identifiers, 107 baseline records without asserted graph edges and 71 concept endpoints outside the MAT record namespace. The identifier warnings mark 180 cross-record child identifiers for later governance review. The seven asset warnings are missing written descriptions for retained GLB models of Hydrogen, Helium, Lithium, Beryllium, Boron, Oxygen and Fluorine. They remain visible because a warning-free label would conceal real editorial work.

The search timing measures the local JavaScript search engine on this machine. It does not measure rendering, network transfer, mobile throttling or field Core Web Vitals.

## Browser and interaction checks

The generated reader was exercised in its local Chromium surface at desktop and mobile sizes.

- The header burger control opens and collapses the cascading sidebar at every viewport size. On desktop, the preference survives reload. When closed, the contents are removed from the focus order; reopening restores the full reader width.
- At 390 × 844, the sidebar behaves as a drawer without horizontal overflow. `Enter` opens it, `Escape` closes it, and focus returns to the burger control.
- The contents tree exposes the Material Atlas Table first and keeps it visually dominant. It contains Origin State, all 118 elements and ten guide groups beneath **Guide, Reference & Book Information**.
- The rendered tree contains 291 disclosure controls. Element records and guide chapters cascade independently without moving the footer into the middle of the contents.
- A targeted mobile accessibility scan reported 30 passed rules and 0 detected violations. Keyboard traversal, visible focus, labels, expanded state and focus return were also checked manually.
- Searching for `H` ranks Hydrogen as the element parent rather than an incidental text match. Evidence-lane filters update the result set immediately.
- Direct element navigation, chapter cross-links, previous/next chapter navigation and previous/next element navigation resolve inside the generated book.
- The light and dark themes retain readable content, controls and evidence badges in the checked Chromium layouts.
- Before printing, a collapsed Hydrogen chapter expanded from 1 to 56 open sections; after printing, the reader restored the original single-open-section state.
- All 24 retained 3D scenes pass the scene-structure tests. A legacy nested-coordinate scene was opened and rendered, confirming that the corrected parser produces geometry rather than a blank canvas.
- The offline command saved 2,315 versioned local resources: 507 chapters, 304 figures, 24 three-dimensional scenes and their supporting reader/data files. The cover and Hydrogen remained readable after the preview server was stopped. A request token prevents a slower earlier chapter request from replacing a newer selection.

## Print proof

The representative [print-proof source](../../dist/MAT-print-proof.html) covers the front matter, Hydrogen precision table, Sodium equations, Magnesium nuclear evaluation and Aluminium coverage boundary. The five-page A4 PDF at `output/pdf/MAT-print-proof.pdf` was rendered page by page and inspected for clipping, table legibility, headings, captions, page numbering and scientific symbols.

This is a representative print proof rather than a 507-chapter release PDF. The available local PDF route does not produce tagged-PDF structure, so PDF/UA or assistive-technology conformance has not been established.

## Evidence and coverage boundary

The generated publication includes 5,842 element-associated NUBASE2020 states. The retained source snapshot, line locators and parser output make that transformation reproducible. A state-count result does not make each element chapter a complete scientific monograph. Baseline, curated, emerging and historical/claims material retain separate status and provenance.

The imported MAT 42–52 bundle contains 157 file-level operations and 74 source accessions. Forty-eight narrowly comparable half-life claims agreed with the retained NUBASE source in the automated comparison. That comparison does not validate every narrative, equation, source interpretation or historical claim in the supplied material. See the [intake and quality review](02-Intake-and-Quality-Review.md) and [review-brief reconciliation](04-Review-Brief-Reconciliation.md).

## Checks that still require independent work

These local results do not establish:

- independent scientific peer review of every record;
- real-user performance or Core Web Vitals;
- production-load, adoption or five-star market benchmarks;
- conformance in Firefox, Safari or assistive-technology combinations;
- a screen-reader audit by disabled readers;
- accuracy of browser-provided translation or speech voices;
- rights clearance for every retained visual and 3D asset;
- a tagged, press-ready or archival PDF release.

Passing software checks therefore establishes a reproducible local build and tested reader behaviour. It does not constitute scientific certification, WCAG certification, publishing accreditation or proof of mass-adoption readiness.
