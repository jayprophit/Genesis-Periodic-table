# MAT People, Contributors and Intellectual Lineage

## Purpose

MAT should preserve credit for the people responsible for the scientific knowledge it contains.

It should also distinguish those historical contributors from contributors who build MAT itself.

---

# 1. Scientific and Engineering Contributors

This class includes people connected to:

- discoveries;
- experiments;
- mathematical theories;
- physical laws;
- equations;
- chemical discoveries;
- material inventions;
- manufacturing processes;
- instruments;
- databases;
- standards.

---

# 2. MAT Contributors

This class includes people who contribute directly to:

- MAT architecture;
- records;
- data extraction;
- calculations;
- software;
- visualisation;
- scientific review;
- corrections;
- documentation.

---

# 3. Contributor Object

```yaml
person_id:
canonical_name:
alternate_names:
birth_year:
death_year:
organizations:
fields:
contribution_type:
related_principle_ids:
related_record_ids:
related_source_ids:
references:
notes:
```

---

# 4. Contribution Types

```text
DISCOVERED
MEASURED
FORMULATED
DERIVED
PROPOSED
INVENTED
DEMONSTRATED
ENGINEERED
STANDARDIZED
REVIEWED
CONTRIBUTED-TO-MAT
```

---

# 5. Intellectual Lineage

Science is cumulative.

MAT may represent:

```text
EARLIER OBSERVATION
↓
THEORY
↓
REFINEMENT
↓
EXPERIMENTAL TEST
↓
MODERN MODEL
```

rather than attributing a complex scientific field to only one individual.

---

# 6. Multiple Discovery

Where discoveries were made independently by several people or teams, MAT should record that rather than forcing a single inventor/discoverer attribution.

---

# 7. Historical Context

Historical credit should be evaluated using reliable historical sources.

Popular simplified attribution may differ from documented scientific history.

---

# 8. Author Theory

Causali E should identify its author separately from scientists whose established work is referenced during formalization.

Similarity between Causali E and an established concept does not transfer authorship of the established concept.

Likewise, references to established theories do not erase authorship of the independently written original Causali E text.

---

# 9. Contributor IDs

Recommended format:

```text
PERSON-000001
PERSON-000002
```

---

# 10. Institution IDs

Recommended:

```text
ORG-000001
```

---

# 11. Future Knowledge Graph

A person may be linked as:

```text
PERSON
→ PROPOSED
→ THEORY

PERSON
→ MEASURED
→ PROPERTY

PERSON
→ INVENTED
→ PROCESS

PERSON
→ AUTHORED
→ SOURCE
```

---
