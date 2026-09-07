# MAT Evidence and Provenance

## Purpose

MAT must distinguish what is known, how it became known, and how strongly it is supported.

Evidence classification is therefore separate from:

- confidence;
- uncertainty;
- source authority;
- replication status.

---

# 1. Evidence Type

Recommended MAT evidence classes:

```text
MEASURED
REPLICATED
THEORETICAL
COMPUTATIONAL
EARLY-EXPERIMENTAL
HISTORICAL
HYPOTHESIS
UNVERIFIED
```

---

## MEASURED

A value directly obtained through observation or experiment.

This does not automatically mean independently replicated.

---

## REPLICATED

A result supported by multiple compatible measurements or independent studies.

---

## THEORETICAL

A result derived from an established theoretical model.

The equation/model must be identified.

---

## COMPUTATIONAL

A predicted or derived result generated through numerical computation or simulation.

Examples:

- DFT;
- molecular dynamics;
- Monte Carlo;
- finite-element modelling;
- ab-initio calculations.

The computational method and software should be retained.

---

## EARLY-EXPERIMENTAL

A preliminary or limited experimental result for which replication is not yet established.

---

## HISTORICAL

A historically important scientific observation, model or claim.

Historical importance does not imply present scientific acceptance.

---

## HYPOTHESIS

A proposed explanation, prediction or MAT/Causali E theoretical possibility not currently established by sufficient evidence.

---

## UNVERIFIED

A claim for which MAT has not obtained sufficient evidence to classify it more strongly.

---

# 2. Legacy Genesis Evidence Codes

The original Genesis architecture used:

```text
E0 = directly measured
E1 = repeated experimental evidence
E2 = established theoretical calculation
E3 = computational prediction
E4 = single/early experimental report
E5 = historical/unconventional hypothesis
E6 = unverified claim
```

MAT preserves these as migration metadata where required.

They map approximately to:

```text
E0 → MEASURED
E1 → REPLICATED
E2 → THEORETICAL
E3 → COMPUTATIONAL
E4 → EARLY-EXPERIMENTAL
E5 → HISTORICAL or HYPOTHESIS
E6 → UNVERIFIED
```

New MAT records should use the descriptive classification rather than relying only on E0-E6.

---

# 3. Replication Status

Replication is an independent field.

Allowed values:

```text
NOT-ASSESSED
SINGLE-SOURCE
SINGLE-LAB
MULTIPLE-MEASUREMENTS
INDEPENDENTLY-REPLICATED
META-ANALYSED
CONFLICTING
FAILED-REPLICATION
```

---

# 4. Source Type

Possible values include:

- primary journal article;
- review article;
- scientific database;
- national standards laboratory;
- international standards body;
- handbook;
- textbook;
- patent;
- dissertation/thesis;
- conference paper;
- technical report;
- manufacturer datasheet;
- government publication;
- laboratory record;
- instrument output;
- simulation output;
- historical document;
- website;
- other.

---

# 5. Provenance Chain

MAT should preserve three different concepts:

## Scientific origin

How the evidence was originally generated.

Example:

```text
physical experiment
```

## Acquisition route

How MAT obtained the information.

Examples:

```text
manual transcription
API
database export
graph digitisation
structured parser
LLM-assisted extraction
```

## Distribution source

Where MAT retrieved the information.

Example:

```text
NIST database
journal repository
institutional archive
```

These may be different.

---

# 6. Minimum Source Object

```yaml
source_id:
title:
authors:
organization:
publication:
year:
doi:
url:
accessed:
source_type:
license:
primary_or_secondary:
notes:
```

---

# 7. Claim-to-Source Linking

A source should be linked to the specific claim it supports.

Avoid simply placing dozens of sources at the bottom of a record without specifying their function.

Example:

```yaml
measurement_id: MEAS-0001-000014
source_id: SRC-000423
evidence_type: MEASURED
```

---

# 8. Patent Evidence

Patents may establish:

- disclosure;
- claimed process;
- claimed composition;
- claimed application;
- historical priority.

A patent does not automatically prove that every claimed performance value was independently validated.

Patent evidence must therefore remain separately identifiable.

---

# 9. AI-Assisted Extraction

If AI assists with extracting information, store:

```yaml
acquisition_method: AI_ASSISTED_EXTRACTION
model:
model_version:
human_reviewed:
source_verified:
```

The AI is not the scientific source.

The underlying paper, database or experimental evidence remains the source.

---

# 10. Conflicting Sources

Do not silently select one value and delete the others.

Store conflicting values with:

- separate source IDs;
- their conditions;
- uncertainty;
- methods;
- sample differences;
- evaluation notes.

An evaluated or recommended value may then be added separately.

---

# 11. Negative Results

Failed experiments and negative findings are legitimate data when:

- the procedure is known;
- conditions are known;
- the result is sufficiently documented.

Examples:

```text
FAILED-SYNTHESIS
NO-REACTION-DETECTED
UNSTABLE-PRODUCT
FAILED-REPLICATION
BELOW-DETECTION-LIMIT
```
