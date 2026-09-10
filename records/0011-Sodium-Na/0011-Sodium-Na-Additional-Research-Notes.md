# Sodium — Additional Research Notes

> Imported research; scientific review pending. These cross-domain notes were supplied after the Sodium-24 calculation in [42.txt](../../archive/source-intake/mat-42-52/42.txt). They retain conversation provenance, not independent validation.

For ²³Na itself, the nuclear spin is \(I=3/2\), so it is both NMR-active and quadrupolar; its Larmor frequency scales with magnetic field rather than being a fixed “Sodium frequency.” The ground-state atomic hyperfine constant is about **885.813 MHz**, while the D-line excited states introduce additional magnetic-dipole and electric-quadrupole structure. That makes Sodium a particularly useful bridge between atomic spectroscopy and condensed/biological NMR.

Liquid Sodium is similarly state-specific. Argonne's current Cardinal implementation derives density, enthalpy, heat capacity and thermal conductivity from the Fink–Leibowitz Sodium correlations rather than treating these as fixed constants.  The NaK implementation likewise treats eutectic NaK with a potassium mass fraction of **0.778**, reinforcing the legacy point that alloying can dramatically alter the accessible liquid range.
