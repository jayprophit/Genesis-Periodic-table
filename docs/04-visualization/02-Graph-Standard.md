# MAT Graph Standard

## 1. Purpose

Graphs must expose scientific information rather than merely make records visually attractive.

---

# 2. Required Graph Components

Every graph should normally contain:

- graph ID;
- title;
- x-axis name;
- x-axis unit;
- y-axis name;
- y-axis unit;
- legend where required;
- conditions;
- source;
- evidence status.

---

# 3. Raw Data Separation

Graph source data should be stored separately.

Example:

```text
graphs/
├── 0001-Hydrogen-H-GRAPH-001.svg
└── data/
    └── 0001-Hydrogen-H-GRAPH-001.csv
```

The rendered plot should be reproducible from its data.

---

# 4. Measured Versus Fitted

Measured data points and fitted/model curves must be distinguishable.

Metadata:

```yaml
measured_data:
fit:
fit_equation:
fit_parameters:
fit_uncertainty:
```

---

# 5. Interpolation

Interpolation must not be confused with measurement.

---

# 6. Extrapolation

Extrapolated regions should be explicitly identified.

---

# 7. Error Bars

Where source uncertainty exists, include it when scientifically useful.

Error bars must state what they represent:

```text
STANDARD-DEVIATION
STANDARD-ERROR
CONFIDENCE-INTERVAL
MEASUREMENT-UNCERTAINTY
RANGE
```

---

# 8. Logarithmic Axes

Log scales must be visibly labelled.

Do not use a logarithmic scale merely to dramatize differences.

---

# 9. Frequency Graphs

Spectral plots must identify the independent axis correctly.

Possible axes:

```text
Hz
THz
cm^-1
eV
nm
um
```

Conversions may be provided but the original measurement convention should remain available.

---

# 10. Temperature Graphs

State temperature scale:

```text
K
°C
```

MAT canonical comparison uses K where appropriate.

---

# 11. Phase Diagrams

Phase diagrams must identify:

- variables;
- phase labels;
- pressure/composition axes;
- data/model status;
- metastable states where known.

---

# 12. Property Comparison Charts

When comparing materials, ensure values refer to compatible:

- conditions;
- units;
- phases;
- orientations;
- purity.

Otherwise the comparison must state the differences.

---

# 13. No Invented Continuity

Do not draw a smooth continuous curve through sparse measurements unless the interpolation/model is explicitly identified.

---

# 14. Graph IDs

Format:

```text
MAT:0001:GRAPH:001
```

Filename:

```text
0001-Hydrogen-H-GRAPH-001.svg
```

---

# 15. Calculation Link

If a graph is computed:

```yaml
calculation_id:
script:
software:
version:
```

should be retained.

---
