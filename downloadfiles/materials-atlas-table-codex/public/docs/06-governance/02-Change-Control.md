# MAT Change Control

## Purpose

Every meaningful MAT change should be traceable.

---

# Change Types

```text
ADD
CORRECT
EXPAND
DEPRECATE
SUPERSEDE
RESTRUCTURE
RENAME
SOURCE-UPDATE
SCHEMA-UPDATE
VISUAL-UPDATE
```

---

# Change Record

```yaml
change_id:
date:
author:
change_type:
affected_ids:
previous_state:
new_state:
reason:
evidence:
breaking_change:
reviewed:
```

---

# Breaking Changes

A change is potentially breaking if it alters:

- identifiers;
- field semantics;
- folder contracts;
- API representations;
- schema interpretation.

Breaking changes require explicit migration notes.

---

# Data Correction

A corrected value should identify:

```text
OLD VALUE
NEW VALUE
WHY
SOURCE
```

where practical.

---

# Deprecated Fields

Deprecated fields should be marked:

```yaml
status: DEPRECATED
replacement:
```

before removal.

---
