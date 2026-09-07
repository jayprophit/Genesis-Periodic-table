# Legacy File Map

## Purpose

This document tracks the relationship between legacy Genesis files and their MAT successors or archival locations.

---

## 1. Mapping Model

Every legacy record should eventually carry:

- original path;
- original record identifier;
- current MAT destination or status;
- archival or retained status;
- migration notes;
- whether the file is preserved unchanged, transformed, or superseded.

---

## 2. Typical Mapping Pattern

Legacy Genesis record:

```text
G0001
```

becomes:

```text
records/0001-.../
```

or remains in:

```text
archive/legacy-genesis/
```

depending on whether it is being re-expressed as a MAT record or preserved as historical context.

---

## 3. Migration Status Categories

Use categories such as:

- preserved-only;
- mapped-to-MAT;
- migrated-in-part;
- archived-as-reference;
- superseded;
- not-yet-processed.

---

## 4. Practical Rule

Do not delete or rewrite the original legacy record during migration. Preserve a traceable link to the historical version.
