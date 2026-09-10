# Neon — Optical Wavelength Reference

**MAT Core Data · selected primary-reference check.**

[Parent Neon record](0010-Neon-Ne.md) · [Structured wavelength correction](data/spectra/0010-Neon-Ne-HeNe-633nm-Correction.yaml) · [Selected optical lines](data/spectra/0010-Neon-Ne-Selected-Optical-Lines.yaml)

## Air and vacuum are different measurement contexts

NIST lists the Ne I atomic line at 6328.1646 angstrom in its air-wavelength table: 632.81646 nm after exact unit conversion. The table does not provide an uncertainty for that entry. [NIST strong-line table](https://physics.nist.gov/PhysRefData/Handbook/Tables/neontable2.htm), SRC-000300.

The CIPM gives a conventional vacuum wavelength of 632.9908 nm, with relative standard uncertainty 1.5 × 10⁻⁶, for an unstabilised He–Ne laser operating solely on the specified 633 nm transition. The recommendation is not a calibration result for a particular instrument. [CIPM Recommendation 2 (2007)](https://www.bipm.org/en/committees/ci/cipm/96-2007/resolution-2), SRC-000301.

## Selected Ne I lines

| Air wavelength / nm | Source wavelength / angstrom |
|---:|---:|
| 540.05618 | 5400.5618 |
| 585.24879 | 5852.4879 |
| 602.99969 | 6029.9969 |
| 607.43377 | 6074.3377 |
| 614.30626 | 6143.0626 |
| 632.81646 | 6328.1646 |
| 640.2248 | 6402.248 |
| 650.65281 | 6506.5281 |
| 692.94673 | 6929.4673 |
| 703.24131 | 7032.4131 |

## Review boundary

The missing correction was identified in Generate Folder Structure, message 6c99f77c-dcaa-445b-bb7f-50af016ea817. This recovery checks the selected wavelengths, units and laser-reference uncertainty. Excited-state assignments, absolute radiative lifetimes and the wider Neon research package still require their own sources and review. Values in this table must not be interpreted as a universal Neon frequency.
