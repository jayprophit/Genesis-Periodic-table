# MAT Asset Generation Pipeline

## Rule

Every new MAT record with a graph, table, or visual manifest receives the same
treatment: data in, validated visuals out. No hand-drawn numbers. No invented
continuity. Missing data stays visibly `NOT-MEASURED` / `DATA-NOT-AVAILABLE`.

## How it works

1. Record data lands in `records/NNNN-Name/` (`data/`, `calculations/`,
   `tables/`, manifests under `data/structured/`).
2. `book/generate-assets.mjs` parses the record files, computes derived
   quantities (decay constants, wavelengths, Q-values, normalized coordinates),
   and writes SVG + CSV sidecars using the exact filenames in the manifests.
   `book/generate-schematics.mjs` renders the visual-spec schematics
   (identity cards, isotope maps, level diagrams, flows, knowledge graphs)
   from the same record data.
3. The script throws on missing inputs rather than guessing. A manifest entry
   stays `PLANNED` / `DATA-EXTRACTION-REQUIRED` until its inputs exist.
4. Manifest statuses flip to `GENERATED` only when the file on disk was
   produced from traceable inputs.

## Internal and external linking

- Inside the e-book (`book/`), relative `.md` links resolve to chapters;
  `http(s)` links open in a new tab. Record IDs (`MAT:0001`, `SRC-H-004`)
  are stable anchors across formats.
- The single-file edition (`node book/export-single.mjs` → `dist/`) keeps
  the same anchors, so citations survive Print-to-PDF, Calibre EPUB, and
  Kindle Previewer conversion.

## Adding a new record

1. Copy the `records/0001-Hydrogen-H/` package layout (names per
   `docs/04-visualization/05-Asset-Naming.md`).
2. Fill manifests first, data second, generator support third.
3. Run `node book/generate-assets.mjs`, then `node book/build-manifest.mjs`.
4. Never fabricate a measurement to fill an empty graph.
