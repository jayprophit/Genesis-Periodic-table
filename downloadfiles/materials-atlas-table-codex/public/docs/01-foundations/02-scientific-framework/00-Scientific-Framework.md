# MAT Scientific Framework

## Purpose

This directory defines scientific principles that may govern MAT properties and transformations.

Instead of repeating entire theories within each material record, MAT records reference reusable principle IDs.

---

# 1. Principle Naming

Recommended prefixes:

```text
MAT-MATH    Mathematics
MAT-PHYS    General physics
MAT-CHEM    Chemistry
MAT-MATSCI  Materials science
MAT-QM      Quantum mechanics
MAT-NUC     Nuclear science
MAT-THERMO  Thermodynamics
MAT-SYS     Systems and dynamics
MAT-INFO    Information
MAT-CAUSAL  Causal inference
```

---

# 2. Example Principle Reference

```yaml
property_id: nuclear.half-life
governed_by:
  - MAT-NUC-004
  - MAT-MATH-014
```

---

# 3. Principle Classification

Possible classifications:

```text
DEFINITION
LAW
THEORY
MODEL
APPROXIMATION
EMPIRICAL-RELATION
NUMERICAL-METHOD
STATISTICAL-METHOD
CONSERVATION-LAW
SYMMETRY-PRINCIPLE
```

---

# 4. Required Principle Fields

```yaml
principle_id:
name:
classification:
domain:
equation:
variables:
input_units:
output_units:
assumptions:
validity:
limitations:
related_mat_fields:
references:
```

---

# 5. Equations as Data

Equations should eventually be machine-readable rather than existing only as rendered text.

Possible future forms:

- LaTeX;
- MathML;
- symbolic-expression trees;
- executable functions.

---

# 6. Multiple Models

A property may have more than one applicable model.

Example:

Electrical conduction may use:

- classical Drude-type models;
- band theory;
- hopping models;
- ballistic transport;
- superconducting models.

MAT should store the model actually relevant to the state.

---

# 7. Model Competition

When multiple scientific models exist:

```text
MODEL-A
MODEL-B
MODEL-C
```

MAT should record:

- applicable conditions;
- accuracy;
- assumptions;
- experimental support;
- limitations.

Do not force one model into domains where another performs better.

---

# 8. Principle Versioning

Established scientific equations can still have different:

- conventions;
- parameterisations;
- reference values;
- computational implementations.

Principles may therefore carry versions.

---

# 9. Calculation Pipeline

A future MAT calculation engine may operate:

```text
MAT PROPERTY REQUEST
        ↓
IDENTIFY STATE
        ↓
IDENTIFY GOVERNING PRINCIPLES
        ↓
CHECK REQUIRED INPUTS
        ↓
CHECK DOMAIN OF VALIDITY
        ↓
CALCULATE
        ↓
PROPAGATE UNCERTAINTY
        ↓
COMPARE WITH MEASUREMENT
        ↓
STORE RESULT
```

---

# 10. Scientific Domains

The initial framework includes:

1. Mathematics
2. Physics
3. Chemistry
4. Materials Science
5. Quantum and Nuclear Science
6. Thermodynamics
7. Systems, Causality and Information

Additional discipline-specific libraries may be added later.

---
