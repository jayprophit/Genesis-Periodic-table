# Archived one-off migration scripts

Executed once during the 2026-09 integrity pass; preserved as migration history.
Do not re-run against current data (guards will skip, but intent matters).

- `fix-registry-layout.mjs` — moved ~1250 lines of stranded source entries
  (SRC-000091+) back into the `sources:` list of `data/registries/sources.yaml`.
- `fix-canonical-remap.mjs` — remapped `SRC-000164` → `SRC-000008` (same NUBASE2020
  publication) in 17 Fluorine files and `SRC-000154-PSII` → `SRC-000155` in Oxygen.
- `apply-hydrogen-resolutions.mjs` — flipped 4 stale RESERVED markers to RESOLVED
  (B/C/N/O published) and fixed the last `ION:H0` in Protium data.
- `fix-alias-indent.mjs` — repaired continuation-indent of inserted `source_alias` lines.
- `scan-rel-shape.mjs` — debug scan for relationship manifest dialects.

Reusable tooling stays in `scripts/` root: `normalize-source-ids.mjs`
(registry-driven alias normalization, safe to re-run).
