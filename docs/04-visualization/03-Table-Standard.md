# MAT Table Standard

## Purpose

MAT tables are the primary machine-readable scientific communication format for values, conditions, and metadata.

---

## 1. Required Structure

Each table should define:

- property or quantity;
- value;
- unit;
- uncertainty where relevant;
- conditions;
- source or provenance;
- evidence type;
- date or version;
- notes or qualifiers.

---

## 2. Unit Rules

Units must be stored explicitly and consistently.

A numeric value in a table should not be read as self-contained unless the units are visible and traceable.

---

## 3. Null and Missing Values

Blank cells are not permitted for scientific entries unless the cell is explicitly marked by a MAT null-state value such as:

- UNKNOWN;
- NOT-MEASURED;
- NOT-AVAILABLE;
- NOT-APPLICABLE;
- NOT-ESTABLISHED.

---

## 4. Evidence Column

Every table carrying scientific meaning should include an evidence or status column so that the table reflects whether a value is:

- measured;
- derived;
- calculated;
- theoretical;
- historical;
- hypothetical.

---

## 5. Formatting

MAT tables should be:

- readable in plain text and markdown;
- stable in ordering;
- consistent in naming convention;
- careful with precision and rounding;
- annotated when values are processed or normalised.

---

## 6. Legacy Data Tables

Legacy tables may be preserved as historical data, but should not be treated as validated contemporary values without explicit migration status.
