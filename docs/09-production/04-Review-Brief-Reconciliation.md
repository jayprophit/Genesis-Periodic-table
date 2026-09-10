# MAT Codex — Review Brief Reconciliation

Two supplied conversation reviews were accessioned on 9 September 2026. Their original bytes, source hashes and all 107 numbered recommendation sections are preserved in the [review intake ledger](../../data/intake/review-briefs-2026-09-09.json). They contain architecture and workflow proposals, not new laboratory measurements. Embedded role lists and command blocks remain reference text.

- [Architecture review — original](../../archive/source-intake/review-briefs-2026-09-09/architecture-review.txt)
- [Studio recovery review — original](../../archive/source-intake/review-briefs-2026-09-09/studio-recovery-review.txt)
- [Generated record coverage matrix](../05-index/Record-Coverage.md)
- [Proposed domain registry](../../data/registries/domains.yaml)

## Reconciliation with the current checkout

| Supplied finding or proposal | Current evidence and disposition |
|---|---|
| Studio preview and inspector are mock-ups | Historical finding. Current `studio/src/App.tsx` renders the selected publication chapter, a local manuscript overlay and actual record counts. Its live workflow was tested. |
| Studio is missing from continuous integration | Historical finding. The workflow already has separate scientific-validation, book, Studio and publication jobs, including Windows and Ubuntu Studio builds. No new remote run is claimed by this local check. |
| Carbon source IDs are missing | Resolved in existing work before this intake. The current registry and publication model resolve the IDs; independent claim-level scientific review remains open. |
| Later elements have `MAT:null` and fabricated abundance values | Resolved in the current source-backed baseline and validated catalogue. The validator rejects fabricated source-free values and invalid element identities. Predictions and unavailable values remain explicit. |
| All 118 elements should be selectable | Implemented and tested in Studio; the reader retains all 118 elements and the separate 0000 reference. |
| One canonical record with multiple specialist views | Accepted architectural direction. The proposed domain registry preserves the supplied subject vocabulary without copying facts into new profession folders. Domain-specific views remain to be authored and reviewed. |
| Measure completeness rather than guessing where depth falls | Implemented as the generated record coverage matrix, with raw counts and explicit limits. No arbitrary completeness percentage or five-star score is attached. |
| Fine-grained citations, scoped review, history and negative results | Retained as requirements. Existing source, claim, contributor and relationship records stay authoritative. Advanced source previews and a complete semantic entity graph are future work. |
| Better offline, print, search and accessibility | Implemented fixes and measured checks are documented in the local verification record. Optional web pagination and formal EPUB accessibility certification remain open. |
| Compare EbookCraft prototypes | Both reference folders exist. Their existence does not establish production capability or reuse rights; no prototype code or artwork was copied during this intake. |

## Canonical ownership

The numbered record package remains the owner. Authored Markdown carries explanations; structured record YAML and source registries carry their scientific data and provenance. `data/catalog` holds attributed baseline and evaluation snapshots. `data/publication/generated` and `book` indexes project those sources for Studio and the reader. Local bookmarks and draft overlays remain user state, not scientific authority.

Build-generated manifests, indexes, publication chapters, evaluation tables and coverage artifacts should be regenerated through their owning scripts. A generated view must retain the source identity, evidence state and review limitations. Presentation or reading depth does not change a measurement.

## Domain and depth vocabulary

The new registry is a **proposed taxonomy**, not an assertion that every domain has content. It includes the supplied disciplines and the proposed quick, foundational, academic, professional, research and data reading depths. A domain should become a visible record view only after explicit links to meaningful sections, facts or relationships exist. Adding a domain never requires a duplicate Hydrogen, density value or evidence ledger.

Medical, safety and regulatory entries require their own source jurisdiction, date, context and review; this registry supplies no clinical claims. Historical and alternative interpretations remain separately identified.

## Next scientific production work

Use the matrix to deepen the parent manuscripts and engineering data where the supplied nuclear expansion exceeds the narrative. Aluminium is a useful next integration target; Neon still warrants a dedicated curated pass. Continue source-by-source, retaining units, conditions, uncertainty, evaluation version and conflicts. Do not infer that the later elements' new nuclear catalogues complete their materials, biological or engineering records.

All other numbered suggestions remain traceable in the intake ledger. Proposed specialist views, semantic links, fact-level side citations, optional pagination, review assignments and media workflows require their own bounded implementation and validation; they are not reported as complete here.
