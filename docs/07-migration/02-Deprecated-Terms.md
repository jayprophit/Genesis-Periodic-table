# MAT Deprecated Terms

## Purpose

This file prevents old terminology from becoming mixed with the new architecture.

---

# Genesis Periodic Table

Deprecated project name.

Replacement:

```text
Materials Atlas Table Codex
```

Abbreviation:

```text
MAT
```

Historical references may still use the old name when describing project origin.

---

# G0000 / G0001 / etc.

Deprecated filename prefix.

Replacement:

```text
0000
0001
0002
```

---

# N/A

Deprecated as a universal missing-data state.

Replace with:

```text
NOT-APPLICABLE
UNKNOWN
NOT-MEASURED
NOT-AVAILABLE
NOT-ESTABLISHED
```

---

# Element Frequency

Deprecated when used as though every element has one universal scalar frequency.

Replace with mechanism-specific terms such as:

```text
electronic-transition-frequency
vibrational-frequency
rotational-frequency
hyperfine-frequency
nuclear-transition-frequency
phonon-frequency
plasma-frequency
acoustic-resonance
```

---

# Atomic Orbit

Avoid as a literal description of modern quantum electron motion.

Use:

```text
orbital
electron-probability-density
quantum-state
```

where scientifically appropriate.

---

# Infinite Half-Life

Avoid for stable isotopes unless explicitly used as a mathematical idealization.

Preferred:

```text
STABLE
half_life: NOT-APPLICABLE
```

or an experimentally justified lower limit.

---

# Magnetic Property

Too broad when engineered magnetization is involved.

Distinguish:

```text
intrinsic magnetic property
engineered magnetization state
applied magnetic field
resulting field topology
```

---

# Zero Field

Avoid interpreting laboratory `0 T` as absolute universal absence of all electromagnetic fields.

Use:

```text
zero specified externally applied field
```

within the stated reference condition.

---
