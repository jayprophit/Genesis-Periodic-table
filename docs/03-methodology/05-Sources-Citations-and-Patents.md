# MAT Sources, Citations and Patents

## Purpose

MAT requires clear attribution and provenance for all scientific claims.

This document defines how sources are classified, cited, and distinguished from speculation, review summaries, and patent claims.

---

## 1. Source Types

MAT may encounter:

- original journal articles;
- review articles;
- books and textbooks;
- handbooks;
- standards bodies;
- government and technical reports;
- theses and dissertations;
- laboratory records;
- patents;
- databases;
- simulation outputs;
- historical documents;
- legacy or archived material.

---

## 2. Citation Rules

Every factual claim should be traceable to a source or to a clearly documented derivation.

At minimum, a citation should include:

- author or authoring body;
- year;
- title;
- publication or database name;
- DOI, URL, or archive reference where possible;
- relevant section or page;
- whether the source is primary or secondary.

---

## 3. Primary vs Secondary Sources

Primary sources are direct disclosures of experiments, measurements, standards, or methods.

Secondary sources summarise or interpret primary work.

A review article may help locate the primary source, but it is not automatically a substitute for the original evidence.

---

## 4. Patents

Patents are important, but they require special handling.

A patent may establish:

- a disclosure;
- a claimed process;
- a claimed material composition;
- an application domain;
- a timeline for invention or publication.

However, patent claims are not automatically validated scientific fact.

A patent claim should therefore be marked separately from experimentally demonstrated performance.

---

## 5. Standards and Handbooks

Standards bodies, national labs, and technical handbooks can be highly authoritative, especially when they define units, reference conditions, or accepted methods.

However, even standards are context-bound and should remain attached to their relevant scope, revision, and date.

---

## 6. Legacy Citation Handling

Historical or legacy materials may not have modern citation practices.

When working with such records, MAT should preserve:

- the original source name or label;
- the document context;
- the extraction method;
- any uncertainty around provenance;
- whether the source is historical rather than current evidence.

---

## 7. Citation Integrity

MAT values citation integrity over citation convenience.

A claim should not be attached to a vague source list without a clear relation between source and claim.

Each claim should be linked to:

- the relevant source;
- the relevant quotation or extracted statement;
- the relevant condition set;
- the relevant record or measurement entry.

---

## 8. Recommended Metadata

Example source metadata:

```yaml
source_id: SRC-00042
source_type: PRIMARY_JOURNAL_ARTICLE
title: "Example study of thermal conductivity in phase-stable composites"
authors: ["Author A", "Author B"]
publication_year: 2024
doi: "10.1234/example.2024.0001"
url: "https://example.org/article"
accessed: 2026-01-14
verification_status: VERIFIED
```

---

## 9. Conclusion

Good source handling is not merely bibliographic hygiene.

It is a scientific requirement, because MAT's value lies in how well it can separate evidence from interpretation, claim from summary, and historical record from current established science.
