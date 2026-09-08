# MAT Compound and Material Index

## Purpose

This index links primary MAT records to compounds, allotropes and engineered materials.

---

# Compound Registry

Recommended entry:

```yaml
compound_id:
name:
formula:
constituent_mat_ids:
record_location:
status:
```

---

# Material Registry

Recommended entry:

```yaml
material_id:
name:
class:
composition:
constituent_ids:
record_location:
status:
```

---

# Material Classes

Possible classes include:

```text
ELEMENTAL
ALLOY
CERAMIC
POLYMER
COMPOSITE
SEMICONDUCTOR
SUPERCONDUCTOR
GLASS
MINERAL
BIOMATERIAL
NANOMATERIAL
METAMATERIAL
MOLECULAR-MATERIAL
POROUS-MATERIAL
MAGNETIC-MATERIAL
ENERGY-MATERIAL
```

---

# Allotropes

Allotropes remain linked to the corresponding element.

Example:

```text
MAT:0006
├── diamond
├── graphite
├── graphene
└── fullerene-family
```

Each may require distinct state/property records.

---

# Compound Relationships

Recommended edges:

```text
COMPOSED-OF
FORMS-COMPOUND
CONSTITUENT-OF
DECOMPOSES-TO
REACTS-WITH
TRANSFORMS-TO
```

---
