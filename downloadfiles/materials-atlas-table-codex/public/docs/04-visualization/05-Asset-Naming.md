# MAT Asset Naming Standard

## 1. Primary Principle

All assets belonging to a numbered record begin with that record's canonical filename stem.

Example:

```text
0001-Hydrogen-H
```

---

# 2. Image Naming

```text
0001-Hydrogen-H-FIG-001.png
0001-Hydrogen-H-FIG-002.svg
```

---

# 3. Graph Naming

```text
0001-Hydrogen-H-GRAPH-001.svg
0001-Hydrogen-H-GRAPH-001.csv
```

The same graph number links rendered graph and source data.

---

# 4. Table Naming

```text
0001-Hydrogen-H-TABLE-001.md
0001-Hydrogen-H-TABLE-001.csv
```

---

# 5. Diagram Naming

```text
0001-Hydrogen-H-DIAGRAM-001.svg
```

---

# 6. Model Naming

```text
0001-Hydrogen-H-MODEL-SCI-001.glb
0001-Hydrogen-H-MODEL-DATA-001.glb
```

---

# 7. Calculation Naming

```text
0001-Hydrogen-H-CALC-001.py
0001-Hydrogen-H-CALC-001.ipynb
```

---

# 8. Source Data

```text
0001-Hydrogen-H-DATA-001.csv
0001-Hydrogen-H-DATA-002.json
```

---

# 9. Visual Slot Suffixes

Optional descriptive suffixes may be appended.

Example:

```text
0001-Hydrogen-H-FIG-001-Natural-State.png
0001-Hydrogen-H-FIG-002-Atomic-Schematic.svg
0001-Hydrogen-H-FIG-003-Electron-Probability.png
0001-Hydrogen-H-GRAPH-001-Emission-Spectrum.svg
```

The numerical ID remains authoritative.

---

# 10. Character Rules

Use:

```text
letters
numbers
hyphens
period only for extension
```

Avoid:

```text
spaces
em dashes
slashes
colons
special filename symbols
```

Machine identifiers inside files may still use colons.

---

# 11. Asset Folder Structure

Recommended numbered-record structure:

```text
records/
└── 0001-Hydrogen-H/
    ├── 0001-Hydrogen-H.md
    │
    ├── data/
    │   ├── properties/
    │   ├── spectra/
    │   ├── isotopes/
    │   ├── phases/
    │   └── structured/
    │
    ├── images/
    │   ├── natural/
    │   ├── scientific/
    │   ├── quantum/
    │   ├── isotope/
    │   ├── spectral/
    │   ├── properties/
    │   └── applications/
    │
    ├── diagrams/
    │   ├── bonding/
    │   ├── processes/
    │   ├── relationships/
    │   └── fields/
    │
    ├── graphs/
    │   └── data/
    │
    ├── tables/
    │
    ├── models/
    │   ├── scientific/
    │   ├── data-extruded/
    │   └── printable/
    │
    ├── calculations/
    ├── relationships/
    ├── experiments/
    └── sources/
```

Use this same overall structure for `0000` and subsequent primary MAT records.

Folders may remain empty until applicable content exists.

---

# 12. Never Rename Published Asset IDs Casually

If an asset has already been cited or published, preserve its ID.

A replacement may use:

```text
revision
version
superseded_by
```

rather than reusing the identity for unrelated content.

Now create the reusable record templates.
