# Carbon Schema Validation

```yaml
record_id: "MAT:0006"
overall: "PASS"

validation:

  identity: "PASS"
  atomic_structure: "PASS"
  isotope_namespace: "PASS"
  isotope_bounds: "PASS"
  carbon12_metrology: "PASS"
  radiocarbon_convention_separation: "PASS"
  nuclear_state_namespace: "PASS"

  allotrope_architecture: "PASS"
  nanostructure_architecture: "PASS"
  molecular_cage_architecture: "PASS"
  engineered_material_architecture: "PASS"

  dimensionality: "PASS"
  topology: "PASS"
  chirality: "PASS"
  direction_resolved_properties: "PASS"

  atomic_vs_raman_spectrum: "PASS"
  no_universal_frequency: "PASS"

  compound_material_separation: "PASS"
  organic_chemistry_architecture: "PASS"
  biological_architecture: "PASS"
  planetary_cycle_architecture: "PASS"

  evidence_architecture: "PASS"
  people_lineage: "PASS"

scientific_core: "CORE-VALIDATED"
exhaustive_content: false
```

## Resolved references

```text
MAT:0001
MAT:0002
MAT:0003
MAT:0004
MAT:0005

MAT:0002:ISO:He-4
MAT:0004:ISO:Be-8
MAT:0004:ISO:Be-10
MAT:0005:ISO:B-10

MAT:0006:ISO:C-12
MAT:0006:ALLOTROPE:GRAPHITE
MAT:0006:ALLOTROPE:DIAMOND
MAT:0006:ALLOTROPE:GRAPHENE
```

## Forward references

```text
MAT:0007 Nitrogen
MAT:0008 Oxygen
MAT:0014 Silicon
MAT:0022 Titanium
MAT:0026 Iron
MAT:0072 Hafnium
MAT:0073 Tantalum
MAT:0074 Tungsten
```

Status:

```text
RESERVED-PENDING-RECORD
```

# FINAL STATUS

```yaml
status: "RESEARCHED"
completeness: "RESEARCHED"

migration_status: "MIGRATED-PENDING-ARCHIVE"

validation:
  schema: "PASS"
  identifiers: "PASS"
  isotope_semantics: "PASS"
  nuclear_architecture: "PASS"
  metrology_architecture: "PASS"
  allotrope_architecture: "PASS"
  topology_architecture: "PASS"
  dimensionality_architecture: "PASS"
  nanocarbon_architecture: "PASS"
  organic_architecture: "PASS"
  transport_architecture: "PASS"
  spectral_architecture: "PASS"
  biological_architecture: "PASS"
  carbon_cycle_architecture: "PASS"
  evidence_architecture: "PASS"
  scientific_core: "CORE-VALIDATED"
  exhaustive_content: false

visuals:
  specification: "LOCKED"
  generated: false
```

# INDEX PATCHES

Update:

```text
docs/05-index/01-Record-Index.md
```

to:

```text
0006 | Carbon | C | 6 | CORE-VALIDATED
```

Update:

```text
docs/07-migration/01-Legacy-File-Map.md
```

to:

```text
G0006 | records/0006-Carbon-C/ | MIGRATED-PENDING-ARCHIVE
