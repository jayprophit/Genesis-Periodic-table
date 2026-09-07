# MAT Units, Constants and Reference Conditions

## 1. Canonical Unit System

MAT uses SI as its canonical comparison system.

Base SI units:

| Quantity | Unit | Symbol |
|---|---|---|
| time | second | s |
| length | metre | m |
| mass | kilogram | kg |
| electric current | ampere | A |
| temperature | kelvin | K |
| amount | mole | mol |
| luminous intensity | candela | cd |

---

# 2. Common Derived Units

Examples include:

- joule — J;
- electronvolt — eV;
- pascal — Pa;
- hertz — Hz;
- watt — W;
- coulomb — C;
- volt — V;
- ohm — Ω;
- siemens — S;
- tesla — T;
- weber — Wb;
- farad — F;
- henry — H;
- becquerel — Bq;
- gray — Gy;
- sievert — Sv.

---

# 3. Atomic and Materials Units

MAT may retain domain-standard units such as:

- eV;
- keV;
- MeV;
- GeV;
- atomic mass unit / dalton;
- ångström;
- nm;
- μm;
- barns;
- cm⁻¹ in spectroscopy.

A canonical SI equivalent may also be stored when useful.

---

# 4. Source Units

Never destroy original source units.

Example:

```yaml
original_value: 1.42
original_unit: g/cm^3
normalized_value: 1420
normalized_unit: kg/m^3
```

---

# 5. Dimensional Consistency

Equations stored in MAT should be checked for dimensional compatibility.

For an equation:

\[
A=B+C
\]

\(A\), \(B\), and \(C\) must have compatible dimensions if `+` represents ordinary mathematical addition.

If an operator represents a conceptual Causali E transformation rather than arithmetic, it must use a separately defined transformation function or operator.

---

# 6. Temperature

Canonical temperature unit:

```text
K
```

Source values in °C or °F may be retained.

Absolute temperature calculations should use kelvin where physically required.

---

# 7. Pressure

Canonical unit:

```text
Pa
```

Common retained units may include:

- kPa;
- MPa;
- GPa;
- bar;
- atm;
- Torr.

---

# 8. Frequency and Wavelength

Frequency:

```text
Hz
```

Angular frequency:

\[
\omega=2\pi\nu
\]

Wavelength:

```text
m
```

Photon relation:

\[
E=h\nu
\]

and:

\[
c=\lambda\nu
\]

when propagation in vacuum is intended.

---

# 9. Physical Constants

Physical constants must not be manually retyped throughout individual records.

They belong in:

```text
data/constants/
```

Each constant should contain:

```yaml
constant_id:
name:
symbol:
value:
unit:
uncertainty:
source:
reference_version:
```

Constants should be associated with the version of the authoritative constant set from which they were obtained.

---

# 10. Reference Conditions

MAT does not assume that one undefined "standard condition" applies everywhere.

Reference conditions must be named explicitly.

Possible classes include:

```text
REF-LAB
REF-STP
REF-SATP
REF-AMBIENT
REF-VACUUM
REF-UHV
REF-CRYO
REF-HIGH-P
REF-E0
REF-B0
REF-R0
```

---

# 11. Zero Applied Field

A value such as:

```text
B = 0 T
```

means zero specified externally applied magnetic field within the selected experimental model.

It does not mean an absolute absence of all electromagnetic fields everywhere in the physical universe.

Similarly:

```text
E = 0 V/m
```

should be interpreted within its defined experimental frame.

---

# 12. Reference Baselines

A MAT measurement may identify:

```yaml
reference_condition_id:
temperature:
pressure:
atmosphere:
electric_field:
magnetic_field:
radiation:
sample_state:
```

This allows differences such as:

\[
\Delta T=T-T_0
\]

\[
\Delta B=B-B_0
\]

\[
\Delta P=P-P_0
\]

to have explicit physical meaning.

---

# 13. Conversion Records

Unit conversion should preserve:

```yaml
conversion_source:
conversion_formula:
conversion_factor:
software:
software_version:
date:
```

where appropriate.

---

# 14. Precision

Converted values must not imply greater measurement precision than the original observation.

---

# 15. Orientation and Coordinate Systems

Vectors and tensors must identify their coordinate system.

Possible systems include:

- Cartesian;
- cylindrical;
- spherical;
- crystallographic;
- sample-fixed;
- laboratory-fixed.

For example:

\[
\mathbf B=(B_x,B_y,B_z)
\]

is incomplete unless the coordinate frame is known.
