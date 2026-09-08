# 0000 Sources

## Internal Historical Source

### SRC-0000-001

**Title:** G0000 — Universal Reference / Origin State
**Project:** Genesis Periodic Table / early MAT repository
**Type:** PROJECT-HISTORICAL-SOURCE
**Purpose:** Preserves the original concept of a computational origin with multiple physical reference channels.

---

# Scientific / Metrological Foundations

## SRC-0000-002

**Organization:** National Institute of Standards and Technology — NIST
**Topic:** International System of Units and thermodynamic temperature
**Type:** AUTHORITATIVE-METROLOGY
**Supports:** Kelvin reference, thermodynamic-temperature semantics, SI units.

---

## SRC-0000-003

**Organization:** International Union of Pure and Applied Chemistry — IUPAC
**Work:** Green Book / Quantities, Units and Symbols in Physical Chemistry
**Type:** AUTHORITATIVE-SCIENTIFIC-REFERENCE
**Supports:** Standard/reference-state conventions and standard pressure.

---

## SRC-0000-004

**Organization:** American Physical Society
**Topic:** Quantum vacuum and vacuum fluctuations
**Type:** SCIENTIFIC-REFERENCE
**Supports:** Distinction between quantum vacuum and classical empty space.

---

# Source Policy

The following ideas do not require `0000` to claim a new physical discovery:

```text
coordinate origin
difference from reference
unit normalization
laboratory baseline
thermodynamic reference
field reference
```

These are components of the MAT information architecture built using established mathematics, metrology and physics.

Original Causali E interpretations remain separately identified as author-framework material.

Two scientifically important choices in this new version are deliberate. First, `0 K` remains a genuine thermodynamic zero but is **not equated with zero-point energy or the absence of quantum motion**; NIST explicitly discusses zero-point motion at absolute zero. ([NIST][2]) Second, the legacy `STP` channel is now a typed thermodynamic reference requiring explicit conditions: IUPAC recommends a standard-state pressure of 100 kPa for common thermodynamic tabulation but also notes that the chosen reference state must be specified. ([IUPAC][3])

Likewise, keeping `VAC` separate from `QV` matters: quantum-vacuum fluctuations have observable consequences, so a QFT vacuum should not be encoded as an empty classical container or as a generic database zero. ([Physics][4])
