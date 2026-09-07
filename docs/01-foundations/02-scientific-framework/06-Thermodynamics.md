# MAT Thermodynamics Framework

## Purpose

Thermodynamics determines constraints on energy, equilibrium, phase stability and accessible transformations.

It is essential to MAT state analysis.

---

# MAT-THERMO-001 — Zeroth Law

If two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with one another.

This provides the conceptual foundation for temperature.

---

# MAT-THERMO-002 — First Law

For a closed system under a common sign convention:

\[
\Delta U=Q-W
\]

where:

- \(U\) = internal energy;
- \(Q\) = heat transferred into the system;
- \(W\) = work performed by the system.

MAT must state sign conventions.

---

# MAT-THERMO-003 — Internal Energy

Internal energy is a state function.

It can include microscopic:

- kinetic;
- interaction;
- electronic;
- vibrational;
- rotational;
- other internal contributions.

---

# MAT-THERMO-004 — Enthalpy

\[
H=U+PV
\]

---

# MAT-THERMO-005 — Entropy

For a reversible heat transfer:

\[
dS=\frac{\delta Q_\text{rev}}{T}
\]

Statistical interpretation:

\[
S=k_B\ln\Omega
\]

for suitable ensembles.

---

# MAT-THERMO-006 — Second Law

For an isolated system:

\[
\Delta S_\text{total}\ge0
\]

within standard thermodynamic treatment.

---

# MAT-THERMO-007 — Third Law

As a perfect crystal approaches absolute zero, entropy approaches a limiting value conventionally taken as zero for the perfect crystal under the standard idealized formulation.

Real materials can include residual entropy and other complications.

---

# MAT-THERMO-008 — Helmholtz Free Energy

\[
F=U-TS
\]

useful particularly for fixed \(T,V\) conditions.

---

# MAT-THERMO-009 — Gibbs Free Energy

\[
G=H-TS
\]

useful particularly for fixed \(T,P\) conditions.

---

# MAT-THERMO-010 — Gibbs Criterion

For a process at constant \(T,P\):

\[
\Delta G<0
\]

indicates spontaneous thermodynamic direction under corresponding assumptions.

This does not establish kinetic rate.

---

# MAT-THERMO-011 — Chemical Potential

\[
\mu_i=
\left(
\frac{\partial G}
{\partial n_i}
\right)_{T,P,n_j}
\]

---

# MAT-THERMO-012 — Phase Equilibrium

At equilibrium between phases:

\[
\mu_i^\alpha
=
\mu_i^\beta
\]

for each component present in equilibrium.

---

# MAT-THERMO-013 — Heat Capacity

At constant pressure:

\[
C_P=
\left(
\frac{\partial H}{\partial T}
\right)_P
\]

At constant volume:

\[
C_V=
\left(
\frac{\partial U}{\partial T}
\right)_V
\]

---

# MAT-THERMO-014 — Specific Heat Capacity

Heat capacity normalized by mass.

Must retain:

- temperature;
- phase;
- pressure;
- measurement condition.

---

# MAT-THERMO-015 — Latent Heat

Phase transitions may absorb or release energy without the ordinary sensible-temperature change expected within a single phase.

---

# MAT-THERMO-016 — Thermal Expansion

\[
\alpha
=
\frac{1}{L}
\left(
\frac{\partial L}{\partial T}
\right)
\]

for linear expansion coefficient.

---

# MAT-THERMO-017 — Compressibility

Isothermal compressibility:

\[
\kappa_T
=
-\frac1V
\left(
\frac{\partial V}{\partial P}
\right)_T
\]

---

# MAT-THERMO-018 — Thermal Conductivity

Fourier model:

\[
\mathbf q=-k\nabla T
\]

Thermal conductivity \(k\) can depend strongly on:

- temperature;
- direction;
- structure;
- defects;
- scale.

---

# MAT-THERMO-019 — Thermal Diffusivity

\[
\alpha=
\frac{k}{\rho c_p}
\]

for common continuum definitions.

---

# MAT-THERMO-020 — Ideal Gas

\[
PV=nRT
\]

used only within its applicable approximation.

---

# MAT-THERMO-021 — Real Gas

Real gases require more advanced equations of state where interactions and finite molecular size matter.

---

# MAT-THERMO-022 — Equation of State

General:

\[
F(P,V,T,n,\ldots)=0
\]

An equation of state is model-specific.

---

# MAT-THERMO-023 — Critical Point

At the liquid-gas critical point, the distinction between the two phases terminates.

Material-specific critical parameters should be stored.

---

# MAT-THERMO-024 — Triple Point

A triple point represents equilibrium coexistence of three phases under specific conditions.

---

# MAT-THERMO-025 — Phase Rule

For suitable equilibrium systems:

\[
F=C-P+2
\]

where:

- \(F\) = degrees of freedom;
- \(C\) = components;
- \(P\) = phases.

Special constraints can modify usage.

---

# MAT-THERMO-026 — Clausius-Clapeyron-Type Relation

For phase boundaries:

\[
\frac{dP}{dT}
=
\frac{\Delta S}{\Delta V}
=
\frac{\Delta H}{T\Delta V}
\]

for equilibrium phase coexistence under relevant assumptions.

---

# MAT-THERMO-027 — Boltzmann Factor

\[
P_i
\propto
e^{-E_i/(k_BT)}
\]

for canonical-equilibrium occupation.

---

# MAT-THERMO-028 — Partition Function

\[
Z=
\sum_i e^{-E_i/(k_BT)}
\]

for discrete canonical states.

Thermodynamic quantities can be derived from \(Z\) within statistical mechanics.

---

# MAT-THERMO-029 — Maxwell-Boltzmann Distribution

Applicable to appropriate classical dilute systems.

Quantum gases require Fermi-Dirac or Bose-Einstein statistics.

---

# MAT-THERMO-030 — Arrhenius Thermal Activation

\[
k=Ae^{-E_a/(RT)}
\]

is frequently useful for thermally activated processes.

---

# MAT-THERMO-031 — Metastable State

A state may persist because of an activation barrier even when it is not the global free-energy minimum.

This explains why:

```text
THERMODYNAMICALLY FAVOURABLE
```

does not imply:

```text
IMMEDIATE TRANSFORMATION
```

---

# MAT-THERMO-032 — Equilibrium Versus Kinetics

MAT keeps these concepts separate:

```text
THERMODYNAMICS
→ which states are favoured/allowed energetically

KINETICS
→ how rapidly pathways are traversed
```

---

# MAT-THERMO-033 — Open Systems

Systems exchanging:

- energy;
- matter;

with their surroundings require corresponding open-system thermodynamics.

---

# MAT-THERMO-034 — Nonequilibrium Thermodynamics

Many manufactured and biological materials operate away from equilibrium.

MAT must not force equilibrium models onto intrinsically nonequilibrium states.

---

# MAT-THERMO-035 — Thermal History

Because transitions may be kinetic:

\[
S_f
=
F(
T(t),
P(t),
\text{cooling rate},
\text{heating rate}
)
\]

not merely final temperature.

---

# MAT-THERMO-036 — Energy Efficiency

For a defined conversion:

\[
\eta=
\frac{E_\text{useful output}}
{E_\text{input}}
\]

System boundaries must be identified.

---

# MAT-THERMO-037 — Exergy

Future MAT energy analysis may include useful-work potential relative to a defined environment.

Reference environment must be explicit.

---

# MAT-THERMO-038 — Thermodynamic Cycle

Cyclic processes can be represented:

\[
S_1\rightarrow S_2\rightarrow\dots\rightarrow S_1
\]

Useful for:

- engines;
- refrigerators;
- heat pumps;
- energy storage.

---

# MAT-THERMO-039 — Stability Map

A future MAT engine may compute:

\[
G(C,T,P)
\]

or equivalent thermodynamic potentials to identify candidate stable phases.

---

# MAT-THERMO-040 — Thermodynamic Constraint Filter

Candidate Causali E/MAT transitions should be checked against appropriate thermodynamic constraints before being presented as physically plausible pathways.

---
