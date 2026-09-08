# MAT Codex publication UI upgrade

This patch upgrades the existing MAT reader without altering canonical scientific records.

## Adds
- layered Codex chapter overview panels
- cascading chapter map and information boxes
- media/data placeholders for images, diagrams, charts, graphs, tables, 3D, video and audio
- evidence/citation/resource panels
- Wikipedia / Scholar / community / video discovery links clearly labelled as supplementary resources
- private chapter notes and working highlights in IndexedDB
- wider browser TTS/translation language support and read-selection control
- reading modes: Codex, Book, Focus
- publication previews: Web/PWA, reflowable EPUB/Kindle, 6x9 paperback, A4 technical PDF
- responsive/mobile and print-specific layout rules

## Fixes
- imports missing highlight functions into the base reader
- unifies manual offline cache to mat-codex-v4
- service worker removes only old MAT caches, never unrelated origin caches
- includes new Codex files in offline-index generation

## Apply
From the MAT repository root, copy this patch folder's `book/` and `scripts/` files into the matching folders, then run:

```bash
node scripts/apply-codex-upgrade.mjs
npm run build:book
npm run validate
npm test
```

The current repository has pre-existing Carbon source-registry validation failures (SRC-000084 through SRC-000090). Do not fabricate sources merely to make CI green.
