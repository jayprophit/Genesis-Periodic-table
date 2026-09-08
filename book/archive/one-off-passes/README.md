# Archived one-off generation passes

These scripts generated record visuals/CSVs for elements 0001–0009 in passes 3–7
plus a pass-7 integrity fix. Their outputs are checked in under `records/`; the
scripts are superseded by the canonical pipeline and are preserved here for
migration history only.

Canonical replacements:

- record SVG/CSV generation → re-run the documented asset pipeline only when
  regenerating from changed record data (see `docs/04-visualization/06-Asset-Generation-Pipeline.md`);
- manifests/search/reader indexes → `npm run build:book` (`book/build/book.mjs`);
- 3D scenes/models → `node book/build-scenes.mjs`, `node book/gen3d.mjs`.

Do not run these passes against current records; they would duplicate checked-in assets.
