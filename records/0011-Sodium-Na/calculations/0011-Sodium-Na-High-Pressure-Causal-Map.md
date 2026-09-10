> **Imported research — review pending.** Recovered from [42.txt, line 1716](../../../archive/source-intake/mat-42-52/42.txt). Source assertions of validation are historical statements, not independent test results. See the intake ledger for duplicates and unresolved references.

# Sodium High-Pressure Causal Map

Low pressure:

$$
Na_{\rm bcc}
$$

Apply:

$$
P\uparrow
$$

Observed structural sequence:

$$
bcc
\rightarrow
fcc
\rightarrow
cI16
\rightarrow
oP8
\rightarrow
tI19
\rightarrow
hP4
$$

At hP4:

$$
\text{core overlap}
+
p-d\ \text{hybridization}
+
\text{interstitial electron localization}
$$

leads to:

$$
\boxed{
\text{transparent insulating electride state}
}
$$

This is a direct Causali E example:

```yaml
initial_state:
  composition: Na
  electronic_class: METAL

intervention:
  pressure: EXTREME

retained:
  elemental_identity: Na

changed:
  - crystal_structure
  - electron_density_topology
  - optical_response
  - electronic_transport

candidate_state:
  structure: hP4
  class:
    - TRANSPARENT
    - INSULATING
    - ELECTRIDE

evidence:
  structure: MEASURED
  optical_transition: MEASURED
  interstitial_electron_localization: EXPERIMENTALLY-SUPPORTED
```
