# MAT Record Index

## Purpose

This file is the canonical human-readable index of MAT primary records.

Machine-readable indexing may later exist under:

```text
data/indexes/
```

---

# Record Sequence

## 0000

```text
0000-Origin-State
```

Classification:

```text
MAT FOUNDATION / REFERENCE RECORD
```

Status:

```text
IN-PROGRESS
```

---

## Chemical Elements

The element sequence begins after `0000`.

Canonical filename format:

```text
NNNN-ElementName-Symbol.md
```

Initial mapping:

| MAT | Element | Symbol | Atomic Number | Status |
|---|---|---|---:|---|
| 0001 | Hydrogen | H | 1 | IN-PROGRESS |
| 0002 | Helium | He | 2 | IN-PROGRESS |
| 0003 | Lithium | Li | 3 | CORE-VALIDATED |
| 0004 | Beryllium | Be | 4 | IN-PROGRESS |
| 0005 | Boron | B | 5 | CORE-VALIDATED |
| 0006 | Carbon | C | 6 |
| 0007 | Nitrogen | N | 7 |
| 0008 | Oxygen | O | 8 |
| 0009 | Fluorine | F | 9 |
| 0010 | Neon | Ne | 10 |
| 0011 | Sodium | Na | 11 |
| 0012 | Magnesium | Mg | 12 |
| 0013 | Aluminium | Al | 13 |
| 0014 | Silicon | Si | 14 |
| 0015 | Phosphorus | P | 15 |
| 0016 | Sulfur | S | 16 |
| 0017 | Chlorine | Cl | 17 |
| 0018 | Argon | Ar | 18 |
| 0019 | Potassium | K | 19 |
| 0020 | Calcium | Ca | 20 |
| 0021 | Scandium | Sc | 21 |
| 0022 | Titanium | Ti | 22 |
| 0023 | Vanadium | V | 23 |
| 0024 | Chromium | Cr | 24 |
| 0025 | Manganese | Mn | 25 |
| 0026 | Iron | Fe | 26 |
| 0027 | Cobalt | Co | 27 |
| 0028 | Nickel | Ni | 28 |
| 0029 | Copper | Cu | 29 |
| 0030 | Zinc | Zn | 30 |
| 0031 | Gallium | Ga | 31 |
| 0032 | Germanium | Ge | 32 |
| 0033 | Arsenic | As | 33 |
| 0034 | Selenium | Se | 34 |
| 0035 | Bromine | Br | 35 |
| 0036 | Krypton | Kr | 36 |

Continue sequentially through all confirmed chemical elements.

---

# Record Status Fields

Each entry should eventually include:

```text
record_id
record_name
class
status
version
last_reviewed
completeness
```

---

# Future Record Classes

MAT may later include primary records for classes beyond individual elements.

Any expansion of primary numbering must be documented before IDs are allocated.

Permanent identifiers must not be recycled.

---
