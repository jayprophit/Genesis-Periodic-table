# MAT Record Index

## Purpose

This file lists the primary MAT record structure and the relationship between a record and its child records, associated measurements, and evidence objects.

---

## 1. Record Index Structure

The MAT record system is based on a hierarchy such as:

- primary record;
- child record;
- measurement object;
- process object;
- relationship object;
- evidence attachment;
- provenance object.

---

## 2. Primary Record Pattern

Primary records follow a numbered pattern:

```text
0000
0001
0002
...
```

Each record should eventually be listed as:

```text
MAT:0001 — Hydrogen
MAT:0002 — Helium
```

with a corresponding child record or state hierarchy as needed.

---

## 3. Record Relationship Model

Examples of valid record relations include:

- material to isotope;
- material to phase;
- material to process;
- material to application;
- phase to property measurement;
- material to evidence record.

---

## 4. Indexing Practice

The record index should remain concise and structural, while the detailed content lives in the actual record files and measurement objects.
