# NNNN — RECORD NAME

```yaml
mat_id: MAT:NNNN
record_name:
symbol:
record_class:
parent_id:
schema_version:
record_version:
status: SKELETON
created:
updated:
contributors:
```

---

# 0. Record Navigation

## Parent

## Child Records

## Related Records

---

# 1. Identity

| Field | Value | Unit / Status | Source |
|---|---|---|---|
| Canonical name | | | |
| Symbol | | | |
| Record class | | | |
| Atomic number | | | |
| Standard atomic weight | | | |

Use `NOT-APPLICABLE` where fields do not apply.

---

# 2. Executive Scientific Summary

Concise description of:

- identity;
- natural occurrence;
- dominant states;
- important properties;
- major relationships;
- unusual behaviour.

---

# 3. Natural State and Manifestation

```markdown
<!-- MAT-VISUAL: V01 -->
<!-- ASSET-ID: MAT:NNNN:FIG:V01:001 -->
<!-- STATUS: PLACEHOLDER -->
```

Describe:

- physical state;
- appearance;
- occurrence;
- sample conditions.

---

# 4. Conventional Scientific Representation

```markdown
<!-- MAT-VISUAL: V02 -->
```

Include appropriate:

- symbol;
- atomic/molecular representation;
- conventional diagrams.

---

# 5. Atomic / Molecular / Crystal Structure

```markdown
<!-- MAT-VISUAL: V03 -->
```

Fields as applicable:

- bond network;
- coordination;
- lattice;
- space group;
- molecular geometry.

---

# 6. Quantum and Electronic Structure

```markdown
<!-- MAT-VISUAL: V04 -->
```

Include:

- electronic configuration;
- orbitals;
- quantum states;
- band structure;
- density of states.

### Governing Principles

```yaml
governed_by:
  -
```

---

# 7. Isotopes and Nuclear States

```markdown
<!-- MAT-VISUAL: V05 -->
```

| Isotope | Protons | Neutrons | Stability | Half-Life | Abundance |
|---|---:|---:|---|---|---|

Child isotope records should be linked where required.

---

# 8. Spectra, Frequency and Resonance

```markdown
<!-- MAT-VISUAL: V06 -->
```

Separate:

## Electronic

## Vibrational

## Rotational

## Raman

## Hyperfine

## Nuclear

## Magnetic Resonance

## Acoustic

## Plasma

Use `NOT-APPLICABLE` where physically irrelevant.

Do not assign one universal frequency to the entire record.

---

# 9. Physical Properties

| Property | Value | Unit | Conditions | Evidence | Source |
|---|---:|---|---|---|---|

---

# 10. Electrical Properties

```markdown
<!-- MAT-VISUAL: V08 -->
```

Include where applicable:

- conductivity;
- resistivity;
- permittivity;
- dielectric loss;
- breakdown;
- Hall response;
- carrier behaviour.

---

# 11. Magnetic Properties

```markdown
<!-- MAT-VISUAL: V09 -->
```

## Intrinsic / Natural Magnetic State

- susceptibility;
- ordering;
- permeability;
- magnetic moments;
- Curie/Néel temperature.

## Engineered Magnetic State

- magnetisation vector;
- pole geometry;
- field direction;
- axial/radial/tangential/multipole;
- field strength;
- field gradient;
- domain orientation;
- magnetising process;
- field history.

---

# 12. Thermal and Thermodynamic Properties

```markdown
<!-- MAT-VISUAL: V10 -->
```

Include:

- melting;
- boiling;
- heat capacity;
- conductivity;
- diffusivity;
- expansion;
- enthalpy;
- entropy;
- free energy.

---

# 13. Mechanical Properties

```markdown
<!-- MAT-VISUAL: V11 -->
```

Include:

- modulus;
- strength;
- hardness;
- toughness;
- creep;
- fatigue;
- friction;
- wear.

---

# 14. Phase, Pressure and Environment

```markdown
<!-- MAT-VISUAL: V12 -->
```

Record:

- phase transitions;
- pressure dependence;
- environmental stability;
- extreme states.

---

# 15. Chemical Behaviour

Include:

- oxidation states;
- common bonding;
- reactivity;
- redox;
- acids/bases where relevant;
- corrosion;
- solubility.

---

# 16. Compounds and Materials

Child relationships:

```text
FORMS-COMPOUND
CONSTITUENT-OF
FORMS-ALLOTROPE
USED-IN-MATERIAL
```

---

# 17. Processes and Transformations

```markdown
<!-- MAT-VISUAL: V13 -->
```

Each process includes:

```yaml
input_state:
process:
conditions:
output_state:
evidence:
```

---

# 18. Energy

Include:

- generation;
- storage;
- transport;
- conversion.

---

# 19. Biological Context

Include only scientifically supported biological relationships.

Do not infer health benefit merely from biological presence.

---

# 20. Environment and Sustainability

Include:

- occurrence;
- extraction;
- abundance;
- recycling;
- environmental fate;
- supply risk.

---

# 21. Applications

```markdown
<!-- MAT-VISUAL: V17 -->
```

Separate:

```text
COMMERCIAL
DEMONSTRATED
RESEARCH
PROPOSED
HYPOTHETICAL
```

---

# 22. Safety

Include:

- chemical;
- thermal;
- pressure;
- electrical;
- magnetic;
- radiation;
- biological;
- environmental hazards.

---

# 23. Time Dependence

Include:

- decay;
- ageing;
- corrosion;
- fatigue;
- relaxation;
- degradation;
- process history.

---

# 24. Scale Dependence

Compare where applicable:

```text
ATOMIC
MOLECULAR
NANO
MICRO
MACRO
BULK
```

---

# 25. Geometry Effects

Include:

- thickness;
- orientation;
- shape;
- surface area;
- topology.

---

# 26. Relationships

```markdown
<!-- MAT-VISUAL: V14 -->
```

Store graph edges separately in:

```text
relationships/
```

---

# 27. Scientific 3D Model

```markdown
<!-- MAT-VISUAL: V15 -->
```

---

# 28. MAT Data-Extruded 3D Model

```markdown
<!-- MAT-VISUAL: V16 -->
```

Label clearly as data visualization rather than literal physical geometry.

---

# 29. Equations and Governing Principles

| Property / Process | Principle IDs |
|---|---|
| | |

---

# 30. Calculations

Link:

```text
calculations/
```

Calculated values must link their inputs and equations.

---

# 31. Experiments and Replication

Include:

- experiment;
- conditions;
- result;
- replication;
- failed results;
- negative findings.

---

# 32. Evidence and Confidence

Summary:

```yaml
evidence_status:
confidence:
replication:
unresolved_conflicts:
```

---

# 33. Sources

Record-specific source registry:

```text
sources/
```

---

# 34. People and Intellectual Lineage

Link scientific contributions to:

- discoveries;
- measurements;
- theories;
- equations;
- processes.

---

# 35. Open Questions

List unresolved scientific questions.

---

# 36. MAT / Causali E Research Notes

Keep separate from established scientific data.

Classification:

```text
HYPOTHESIS
SPECULATION
TESTABLE
SUPPORTED
NOT-SUPPORTED
```

---

# 37. Completeness

```yaml
identity:
nuclear:
quantum:
spectral:
electrical:
magnetic:
thermal:
mechanical:
chemical:
materials:
process:
environment:
applications:
safety:
sources:
visuals:
```

---

# 38. Revision History

| Version | Date | Change |
|---|---|---|

---
