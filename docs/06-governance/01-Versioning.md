# MAT Versioning Standard

## Purpose

MAT uses versioning at several levels.

---

# Project Version

Recommended:

```text
MAJOR.MINOR.PATCH
```

Example:

```text
1.4.2
```

---

# MAJOR

Increment when architecture changes incompatibly.

Examples:

- identifier system redesign;
- incompatible schema redesign;
- major record architecture change.

---

# MINOR

Increment for backwards-compatible extensions.

Examples:

- new schema fields;
- new principle classes;
- new visualization slots.

---

# PATCH

Increment for:

- corrections;
- typo fixes;
- source updates;
- small data fixes.

---

# Schema Version

Separate field:

```yaml
schema_version:
```

A record may use:

```yaml
record_version: 2.1.0
schema_version: 1.3.0
```

---

# Record Version

Each numbered record carries its own version.

---

# Asset Version

Assets may use metadata:

```yaml
asset_version:
```

without embedding excessive version numbers into filenames unless required.

---

# Scientific Data Version

External evaluated datasets should preserve the dataset/release version.

---

# Principle Version

Principles may also have versions where definitions or references are refined.

---

# Historical Preservation

Previous published states should remain available through Git history or formal archival releases.

---
