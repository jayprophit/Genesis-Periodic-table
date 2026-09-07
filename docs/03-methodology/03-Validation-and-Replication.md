# MAT Validation and Replication

## Purpose

MAT requires a disciplined process for validating whether a recorded fact is reliable enough to support scientific interpretation.

Validation is not the same as:

- publication status;
- agreement by a single lab;
- consensus across a field;
- historical prominence;
- theoretical elegance.

---

## 1. Validation Requirements

A value or model should be validated against the following questions:

- Was the measurement method appropriate?
- Were conditions documented?
- Was the uncertainty described?
- Was the source reproducible or traceable?
- Was the result replicated independently?
- Did a competing model explain the same data equally well?
- Were negative or failed results retained?

---

## 2. Replication Levels

MAT distinguishes between:

- no replication;
- replication by same group;
- replication by different group;
- independent replication across environments;
- meta-analysis or consensus evaluation.

The stronger the replication, the higher the evidential weight, but this must remain explicit rather than assumed.

---

## 3. Internal Consistency Checks

Before a value is promoted, check for:

- unit consistency;
- dimensional consistency;
- condition compatibility;
- source continuity;
- uncertainty reasonableness;
- compatibility with known phase or chemistry boundaries;
- contradiction with nearby measurements.

---

## 4. Cross-Validation

A measurement may be cross-validated against:

- independent instruments;
- different labs;
- different model frameworks;
- standards bodies;
- historical datasets;
- alternative measurement methods.

Cross-validation improves confidence but does not prove truth by itself.

---

## 5. Failure and Disagreement

Validation must also handle disagreement.

When sources conflict, MAT should record:

- which values disagree;
- under what conditions;
- whether the disagreement is methodological, environmental, or conceptual;
- whether the discrepancy is unresolved or has been resolved by later work.

Conflicting observations are not invalid by default; they are a sign that the state space may be under-specified.

---

## 6. Review and Promotion

A value may be moved to a stronger evidential tier only after:

- the source is checked;
- measurement or derivation is documented;
- uncertainty is described;
- replication or comparison is recorded;
- null states and caveats are explicit.

The promotion is a process status, not a claim that all uncertainty has disappeared.

---

## 7. Good Practice

Examples of good validation metadata:

```yaml
validation_status: REPLICATED
replication_status: INDEPENDENTLY-REPLICATED
uncertainty_type: ONE_SIGMA
confidence: HIGH
source_count: 4
review_status: PEER-REVIEWED
```

This makes the record auditable and comparable.

---

## 8. Conclusion

MAT treats validation as a continuous and explicit process.

A value becomes stronger only when the supporting evidence, conditions, and uncertainty are all visible and consistent.
