# MAT Data Acquisition

## Purpose

This document defines how MAT obtains, records, and validates scientific information from multiple sources.

Data may originate from:

- experiments;
- journal articles;
- standards documents;
- databases;
- technical reports;
- theses and dissertations;
- patents;
- historical notes;
- computational models;
- legacy Genesis records;
- direct instrument output.

---

## 1. Source Hierarchy

MAT distinguishes between:

- primary sources;
- secondary sources;
- derived sources;
- model outputs;
- archival or legacy documentation.

Primary sources are the strongest evidence when directly relevant and sufficiently documented.

Secondary sources and summaries are useful, but they must be flagged as such.

---

## 2. Acquisition Rules

Each acquisition step must capture:

- source identity;
- date of capture;
- source type;
- extraction method;
- whether the data was copied, digitised, parsed, or inferred;
- confidence in extraction;
- whether the source was directly verified.

If a value is copied from a graph or table, the method matters.

---

## 3. Extraction Quality

MAT does not treat all data extraction equally.

A value extracted from an original table is different from:

- a value read from a plot;
- a value inferred from a diagram;
- a value extracted by AI assistance;
- a value transcribed from OCR output;
- a value summarised in a review article.

The extraction method must be recorded.

---

## 4. Legacy Record Handling

Legacy Genesis materials are important historical sources, but they are not automatically equivalent to current experimental standards.

When using legacy records:

- preserve original wording where required;
- classify historical status explicitly;
- note when values are uncertain or incomplete;
- avoid allowing legacy context to overwrite present evidence without a clear migration record.

---

## 5. Data Provenance Minimums

Every imported dataset or note should carry at least:

```yaml
source_id:
source_type:
source_title:
author_or_team:
publication_year:
url_or_archive:
extraction_method:
verification_status:
notes:
```

This is the minimum information needed to make claims auditable.

---

## 6. Data Quality Triage

Before a datum enters a final MAT record, it should be checked for:

- completeness;
- units;
- conditions;
- relevance to the state being described;
- provenance;
- uncertainty;
- ambiguity in original wording;
- possibility of transcription error.

---

## 7. Missing and Ambiguous Data

Missing data is not the same as zero.

When the original source is unclear or incomplete, use a formal null state such as:

- `UNKNOWN`;
- `NOT-MEASURED`;
- `NOT-AVAILABLE`;
- `NOT-APPLICABLE`;
- `NOT-ESTABLISHED`.

---

## 8. Multi-Source Merging

When multiple sources disagree, MAT stores and distinguishes the sources rather than erasing the disagreement.

The data acquisition workflow should preserve:

- source-specific values;
- context-specific conditions;
- evidence weights;
- conflict status;
- preferred or consensus value if one is later designated.

---

## 9. Data Acquisition Standard

A record may be considered acquired when:

- the source is identified;
- the relevant measurements or statements are captured;
- conditions are recorded;
- provenance is attached;
- the data is structured for downstream validation and comparison.

This is the minimum threshold for conversion into a traced MAT entry.
