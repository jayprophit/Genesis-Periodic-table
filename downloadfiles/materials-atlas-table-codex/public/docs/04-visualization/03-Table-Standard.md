# MAT Table Standard

## 1. Purpose

Tables are primary scientific data containers.

They should remain usable by both humans and software.

---

# 2. Markdown Versus Structured Data

Human-readable table:

```text
.md
```

Machine-readable equivalent:

```text
.csv
.json
.yaml
```

should be maintained where the table contains substantial structured data.

---

# 3. Required Table Metadata

```yaml
table_id:
title:
record_id:
data_type:
units:
conditions:
source_ids:
evidence:
version:
```

---

# 4. Unit Columns

Preferred:

| Property | Value | Unit |
|---|---:|---|

rather than embedding units inside every number.

---

# 5. Conditions

If each row has different conditions, store explicit columns.

Example:

| Temperature | Pressure | Conductivity | Unit |
|---:|---:|---:|---|

---

# 6. Null States

Use MAT null values:

```text
UNKNOWN
NOT-MEASURED
NOT-AVAILABLE
NOT-APPLICABLE
BELOW-DETECTION-LIMIT
```

Do not leave ambiguous blank cells.

---

# 7. Sorting

Canonical data should use a predictable sort.

Examples:

- isotopes by mass number;
- spectra by frequency/energy;
- processes by process ID;
- citations by source ID.

---

# 8. Table IDs

```text
MAT:0001:TABLE:001
```

Filename:

```text
0001-Hydrogen-H-TABLE-001.csv
```

---

# 9. Precision

Do not standardize all values to the same number of decimal places if source precision differs.

---

# 10. Source-Level Data

When several sources report different values, preserve them as separate rows.

Do not overwrite them with one chosen figure.

An evaluated value can be added separately.

---
