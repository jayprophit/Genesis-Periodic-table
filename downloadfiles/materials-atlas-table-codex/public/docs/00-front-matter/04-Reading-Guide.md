# MAT Reading Guide

## Purpose

The Materials Atlas Table Codex can be read at several levels.

A reader does not need to understand every layer to use MAT.

---

# 1. Quick Reference

For a quick scientific overview, open the main numbered record:

```text
records/NNNN-Name-Symbol/NNNN-Name-Symbol.md
```

Read:

- identity;
- scientific summary;
- principal properties;
- isotopes;
- chemistry;
- applications;
- safety.

---

# 2. Scientific Deep Dive

For a more detailed investigation, continue into:

- isotope data;
- spectra;
- property tables;
- graphs;
- calculations;
- relationships;
- sources;
- experiments.

---

# 3. Machine-Readable Data

Structured information is stored separately from narrative text.

Typical locations include:

```text
data/
tables/
graphs/data/
relationships/
sources/
```

These are intended to support:

- scripts;
- databases;
- APIs;
- knowledge graphs;
- AI systems;
- simulation;
- search;
- analysis.

---

# 4. Evidence

When interpreting a MAT value, inspect:

```text
evidence_type
confidence
replication
uncertainty
source
conditions
```

A number without its conditions may be scientifically incomplete.

---

# 5. Theory Versus Measurement

MAT deliberately separates:

```text
MEASUREMENT
ESTABLISHED SCIENCE
CALCULATION
COMPUTATIONAL PREDICTION
HYPOTHESIS
SPECULATION
HISTORICAL MODEL
```

Do not assume that every statement within MAT has the same scientific status.

---

# 6. Causali E

The author's original Causali E work is preserved separately from its mathematical formalization.

Read in this order:

```text
00-Causali-E-Overview.md
01-Causali-E-Original-Text.md
02-Causali-E-Formalization.md
03-Causali-E-Testable-Hypotheses.md
04-Causali-E-Scientific-Status.md
```

This preserves the development history while keeping hypothesis distinct from established science.

---

# 7. Governing Scientific Principles

Instead of repeating every equation in every record, MAT uses reusable principle identifiers.

Example:

```yaml
governed_by:
  - MAT-QM-001
  - MAT-PHYS-016
```

These identifiers link to the scientific-framework documentation.

---

# 8. Visuals

Standard visual slots range from:

```text
V01
```

through:

```text
V18
```

They include:

- natural manifestation;
- atomic representation;
- quantum structure;
- isotope data;
- spectra;
- field maps;
- property plots;
- processes;
- 3D models.

---

# 9. Record Completeness

A MAT record may be scientifically useful while still incomplete.

Typical statuses:

```text
SKELETON
PARTIAL
RESEARCHED
VALIDATED
REVIEWED
SUPERSEDED
```

---

# 10. Unknown Values

MAT distinguishes:

```text
UNKNOWN
NOT-MEASURED
NOT-AVAILABLE
NOT-APPLICABLE
NOT-ESTABLISHED
BELOW-DETECTION-LIMIT
```

These must not be treated as equivalent.

---

# 11. Recommended Reading Order

For a complete understanding of MAT:

```text
README
↓
Front Matter
↓
MAT Foundations
↓
Scientific Framework
↓
Data Architecture
↓
Methodology
↓
Visual Standards
↓
Indexes
↓
Numbered Records
↓
Back Matter
```

---
