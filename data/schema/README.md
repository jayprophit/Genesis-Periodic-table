# MAT Schema

Machine-enforced contracts for MAT canonical data. Versioned: `1.0.0/`.

- `mat-record.schema.json` — record header fields (`mat_id`, names, classes, versions, status).
- `mat-measurement.schema.json` — shared measurement object (value/unit/uncertainty/conditions/evidence/confidence/source/method/reference). `$ref` target.
- `mat-source-registry.schema.json` — global source registry shape.
- `mat-relationship.schema.json` — relationship registry entries.
- `mat-visual-manifest.schema.json` — V-slot visual manifests (both H-style and Li-style).
- `mat-table-manifest.schema.json` — table manifests.
- `mat-graph-manifest.schema.json` — graph manifests.

Deliberately permissive (`additionalProperties: true`, open status enums): schemas
guard identity, vocabulary and structure, not the evolving scientific payload.
Null states (`UNKNOWN`, `NOT-MEASURED`, `NOT-AVAILABLE`, `NOT-APPLICABLE`,
`NOT-ESTABLISHED`, `BELOW-DETECTION-LIMIT`) must stay distinguishable — never
coerced to generic null. Run `npm run validate`.
