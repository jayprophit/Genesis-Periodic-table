# Genesis to MAT Migration

## Purpose

The Materials Atlas Table Codex developed from the earlier Genesis Periodic Table project.

This document defines how legacy Genesis material is migrated without losing historical work.

---

# 1. Migration Principle

Migration is:

```text
PRESERVE
↓
EXTRACT
↓
CLASSIFY
↓
NORMALIZE
↓
RESTRUCTURE
↓
VALIDATE
↓
SUPERSEDE
```

not:

```text
DELETE
↓
REWRITE FROM MEMORY
```

---

# 2. Legacy Archive

Create:

```text
archive/
└── legacy-genesis/
```

The archive should eventually contain preserved copies of legacy Genesis project files once the new MAT versions have been verified.

Do not delete the active legacy records until migration is complete.

---

# 3. Legacy README

The original theory text from the legacy README should be preserved in:

```text
docs/01-foundations/01-Causali-E/01-Causali-E-Original-Text.md
```

The wording of this historical copy should not be silently corrected.

---

# 4. Legacy G Prefix

Legacy record examples:

```text
G0000
G0001
G0002
```

New primary record names become:

```text
0000-Origin-State.md
0001-Hydrogen-H.md
0002-Helium-He.md
```

The `G` prefix is deprecated.

---

# 5. Record Migration

For each legacy record:

```text
LEGACY RECORD
↓
IDENTITY
↓
EXTRACT PROPERTY DATA
↓
EXTRACT SOURCES
↓
EXTRACT EQUATIONS
↓
EXTRACT THEORY
↓
EXTRACT RELATIONSHIPS
↓
EXTRACT VISUAL REQUIREMENTS
↓
MAP TO MAT SCHEMA
↓
VALIDATE
↓
CREATE NEW RECORD PACKAGE
```

---

# 6. Do Not Blindly Copy

Legacy values should be checked for:

- units;
- source;
- scientific status;
- precision;
- conditions;
- contradictory values.

---

# 7. Legacy N/A

Legacy:

```text
N/A
```

must be mapped where possible to:

```text
NOT-APPLICABLE
UNKNOWN
NOT-MEASURED
NOT-AVAILABLE
```

---

# 8. Legacy Evidence

Legacy E0–E6 evidence codes remain preserved for migration history but are mapped to descriptive MAT evidence fields.

---

# 9. Legacy 0000

The old `G0000` contains both:

- origin/reference concepts;
- project architecture/schema.

MAT separates these.

Project architecture belongs in:

```text
docs/
```

Record-specific origin/reference material belongs in:

```text
records/0000-Origin-State/
```

---

# 10. Scientific Separation

During migration distinguish:

```text
ESTABLISHED SCIENCE
```

from:

```text
AUTHOR THEORY
```

and:

```text
SPECULATION
```

without deleting any historically relevant author material.

---

# 11. Migration Status

Each old file may use:

```text
NOT-STARTED
IN-PROGRESS
MIGRATED
VALIDATED
ARCHIVED
```

---

# 12. Migration Completion

A legacy file is considered migrated only after:

- data extracted;
- sources retained;
- relationships mapped;
- theories classified;
- new folder created;
- new record validated.

---
