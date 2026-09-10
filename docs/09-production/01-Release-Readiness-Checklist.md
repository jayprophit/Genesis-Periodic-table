# MAT Release Readiness Checklist

Use this checklist before publishing a MAT reader, Studio build, or print edition.

## Scientific and content gates

- [x] All referenced sources are registered with canonical IDs.
- [ ] No placeholder, fabricated, or source-free measured values remain.
- [ ] `0000` foundation validation is complete and its findings are classified.
- [ ] Legacy Genesis records are either migrated, explicitly archived, or listed as out of scope.
- [ ] Every changed record has a review date, evidence status, and change note.
- [ ] Historical, speculative, calculated, predicted, and measured content remain visibly distinct.

## Data and build gates

- [x] `npm run validate`
- [x] `npm run validate:elements`
- [x] `npm run build:book`
- [x] `npm test`
- [ ] Generated indexes and publication files are unchanged after a clean rebuild.
- [ ] Charts identify their dataset version, provenance, and last-updated date.
- [x] Offline resources include every referenced local image, chart, stylesheet and script in the generated edition.

## Reader and Studio gates

- [x] Element search works by name, symbol, and atomic number.
- [ ] Periodic, Russell, and overlay views fit desktop and narrow screens.
- [x] Element names remain visible below symbols in the home atlas.
- [ ] Favorites, bookmarks, notes, export, and import work after a fresh reload.
- [ ] Visual dialogs support keyboard close, zoom, fit, download, and new-tab actions.
- [ ] Headings, labels, focus order, contrast, and dialog names pass a complete accessibility review. Automated WCAG 2.2 AA checks and keyboard flows pass for tested reader pages; cross-browser assistive-technology review remains open.
- [x] Studio build, unit tests, and end-to-end tests pass.

## Publication gates

- [x] Web reader preview checked in Chromium and a 390 × 844 narrow viewport.
- [x] Representative A4 PDF proof checked for clipped tables, equations and headings; complete 507-chapter press proof remains open.
- [ ] EPUB/Kindle or other requested exports open successfully.
- [ ] Release version, date, changelog, attribution, and known limitations are recorded.
- [ ] The release artifact is reproducible from a clean checkout.

## Known blockers

Content blockers must be recorded here rather than bypassed:

- Completion of the `0000` foundation validation pass.
- Remaining authored-record publication and legacy Genesis migration.
