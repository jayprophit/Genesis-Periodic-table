# MAT Physics Framework

## Purpose

This document identifies major physical laws and models relevant to MAT.

The equations listed here are not automatically applicable to every material or scale.

---

# MAT-PHYS-001 — Newton's First Law

A body remains in uniform motion unless acted upon by a net external force.

Applicable principally in classical mechanics.

---

# MAT-PHYS-002 — Newton's Second Law

\[
\mathbf F
=
\frac{d\mathbf p}{dt}
\]

For constant mass in nonrelativistic mechanics:

\[
\mathbf F=m\mathbf a
\]

---

# MAT-PHYS-003 — Newton's Third Law

Mechanical interactions obey momentum-transfer relationships consistent with total momentum conservation for appropriately defined closed systems.

---

# MAT-PHYS-004 — Momentum

Classically:

\[
\mathbf p=m\mathbf v
\]

Relativistic corrections are required at high velocities.

---

# MAT-PHYS-005 — Conservation of Momentum

For an isolated system:

\[
\mathbf P_\text{total}
=
\text{constant}
\]

---

# MAT-PHYS-006 — Angular Momentum

\[
\mathbf L=\mathbf r\times\mathbf p
\]

Conservation applies where net external torque is zero.

---

# MAT-PHYS-007 — Work

\[
W=
\int
\mathbf F\cdot d\mathbf r
\]

---

# MAT-PHYS-008 — Kinetic Energy

Nonrelativistic:

\[
K=\frac12mv^2
\]

---

# MAT-PHYS-009 — Potential Energy

Potential energy depends on the physical interaction.

Examples include:

- gravitational;
- electrostatic;
- elastic;
- chemical.

---

# MAT-PHYS-010 — Conservation of Energy

Energy is conserved in an isolated system when all relevant forms are included.

This does not mean each particular form of energy remains constant.

---

# MAT-PHYS-011 — Mass-Energy Relation

\[
E_0=mc^2
\]

Rest mass corresponds to rest energy.

Important in nuclear and particle processes.

---

# MAT-PHYS-012 — Force from Potential

For suitable conservative systems:

\[
\mathbf F=-\nabla U
\]

---

# MAT-PHYS-013 — Hooke's Law

For linear elastic response:

\[
F=-kx
\]

or in simple stress-strain form:

\[
\sigma=E\epsilon
\]

within the linear elastic regime.

---

# MAT-PHYS-014 — Pressure

\[
P=\frac{F}{A}
\]

for normal force distributed over area.

---

# MAT-PHYS-015 — Density

\[
\rho=\frac{m}{V}
\]

---

# MAT-PHYS-016 — Wave Relationship

\[
v=f\lambda
\]

For electromagnetic radiation in vacuum:

\[
c=f\lambda
\]

---

# MAT-PHYS-017 — Angular Frequency

\[
\omega=2\pi f
\]

---

# MAT-PHYS-018 — Harmonic Oscillator

\[
m\frac{d^2x}{dt^2}+kx=0
\]

with:

\[
\omega_0=\sqrt{\frac{k}{m}}
\]

for the ideal undamped oscillator.

---

# MAT-PHYS-019 — Damped Oscillation

\[
m\ddot x+c\dot x+kx=0
\]

Applications include:

- vibration;
- mechanical damping;
- resonance.

---

# MAT-PHYS-020 — Resonance

Resonance occurs when driving conditions couple strongly to natural modes.

A resonant frequency is a property of a particular physical mode/system, not a universal single frequency of an element.

---

# MAT-PHYS-021 — Coulomb's Law

For two point charges in vacuum:

\[
F=
\frac{1}{4\pi\epsilon_0}
\frac{q_1q_2}{r^2}
\]

---

# MAT-PHYS-022 — Electric Field

\[
\mathbf E=\frac{\mathbf F}{q}
\]

---

# MAT-PHYS-023 — Electric Potential

\[
\mathbf E=-\nabla V
\]

under electrostatic conditions.

---

# MAT-PHYS-024 — Current

\[
I=\frac{dQ}{dt}
\]

---

# MAT-PHYS-025 — Ohm-Type Relation

For an ohmic element:

\[
V=IR
\]

Material conductivity may also be represented:

\[
\mathbf J=\sigma\mathbf E
\]

in simple isotropic linear form.

---

# MAT-PHYS-026 — Resistance

For a uniform conductor:

\[
R=\rho_e\frac{L}{A}
\]

where \(\rho_e\) is electrical resistivity.

---

# MAT-PHYS-027 — Electrical Power

\[
P=IV
\]

and for ohmic systems:

\[
P=I^2R
\]

---

# MAT-PHYS-028 — Capacitance

\[
C=\frac{Q}{V}
\]

---

# MAT-PHYS-029 — Magnetic Lorentz Force

\[
\mathbf F
=
q(
\mathbf E+\mathbf v\times\mathbf B
)
\]

---

# MAT-PHYS-030 — Magnetic Flux

\[
\Phi_B
=
\int
\mathbf B\cdot d\mathbf A
\]

---

# MAT-PHYS-031 — Faraday's Law

\[
\mathcal E
=
-\frac{d\Phi_B}{dt}
\]

for the simple loop formulation.

---

# MAT-PHYS-032 — Maxwell Equations

Differential vacuum/material-general form includes:

\[
\nabla\cdot\mathbf D=\rho_f
\]

\[
\nabla\cdot\mathbf B=0
\]

\[
\nabla\times\mathbf E
=
-\frac{\partial\mathbf B}{\partial t}
\]

\[
\nabla\times\mathbf H
=
\mathbf J_f+
\frac{\partial\mathbf D}{\partial t}
\]

Constitutive relationships depend on the material.

---

# MAT-PHYS-033 — Permittivity

For simple linear isotropic media:

\[
\mathbf D=\epsilon\mathbf E
\]

Real materials may require tensors and frequency dependence.

---

# MAT-PHYS-034 — Magnetic Constitutive Relation

For simple linear isotropic media:

\[
\mathbf B=\mu\mathbf H
\]

This relation is inadequate for many nonlinear, hysteretic or anisotropic magnetic materials.

---

# MAT-PHYS-035 — Electromagnetic Energy

Energy density in simple linear media may involve:

\[
u
=
\frac12
(
\mathbf E\cdot\mathbf D
+
\mathbf B\cdot\mathbf H
)
\]

subject to material assumptions.

---

# MAT-PHYS-036 — Poynting Vector

\[
\mathbf S
=
\mathbf E\times\mathbf H
\]

represents electromagnetic energy flux in common formulations.

---

# MAT-PHYS-037 — Snell's Law

\[
n_1\sin\theta_1
=
n_2\sin\theta_2
\]

---

# MAT-PHYS-038 — Refractive Index

\[
n=\frac{c}{v_p}
\]

where \(v_p\) is phase velocity.

Frequency dependence must be retained.

---

# MAT-PHYS-039 — Beer-Lambert-Type Attenuation

\[
I=I_0e^{-\alpha x}
\]

for suitable homogeneous attenuation models.

---

# MAT-PHYS-040 — Diffusion Equation

\[
\frac{\partial C}{\partial t}
=
D\nabla^2C
\]

for simple Fickian diffusion with constant \(D\).

---

# MAT-PHYS-041 — Fick's First Law

\[
\mathbf J=-D\nabla C
\]

---

# MAT-PHYS-042 — Fourier Heat Conduction

\[
\mathbf q=-k\nabla T
\]

for ordinary local heat conduction.

---

# MAT-PHYS-043 — Heat Equation

\[
\rho c_p
\frac{\partial T}{\partial t}
=
k\nabla^2T
\]

under simplified assumptions.

---

# MAT-PHYS-044 — Fluid Continuity

\[
\frac{\partial\rho}{\partial t}
+
\nabla\cdot(\rho\mathbf v)
=0
\]

expresses mass continuity in continuum fluid mechanics.

---

# MAT-PHYS-045 — Navier-Stokes Framework

For Newtonian fluids:

\[
\rho
\left(
\frac{\partial\mathbf v}{\partial t}
+
\mathbf v\cdot\nabla\mathbf v
\right)
=
-\nabla p
+
\mu\nabla^2\mathbf v
+
\mathbf f
\]

under corresponding assumptions.

---

# MAT-PHYS-046 — Buoyancy

Archimedean buoyancy:

\[
F_b=\rho_fVg
\]

for the displaced-fluid approximation.

---

# MAT-PHYS-047 — Gravitation

Newtonian:

\[
F=
G\frac{m_1m_2}{r^2}
\]

Appropriate only where Newtonian gravity is sufficient.

---

# MAT-PHYS-048 — Special Relativity

Lorentz factor:

\[
\gamma=
\frac{1}
{\sqrt{1-v^2/c^2}}
\]

Relevant when velocities approach \(c\).

---

# MAT-PHYS-049 — Relativistic Energy-Momentum

\[
E^2
=
p^2c^2+m^2c^4
\]

---

# MAT-PHYS-050 — General Relativity Domain

Strong gravitational systems require spacetime geometry rather than Newtonian gravitation.

Detailed relativistic material modelling may be added later where MAT covers astrophysical matter.

---

# MAT-PHYS-051 — Radiation Pressure

For electromagnetic radiation, momentum transfer can create pressure.

Exact relation depends on absorption/reflection geometry.

---

# MAT-PHYS-052 — Blackbody Radiation

Planck's law governs ideal blackbody spectral radiance.

This will be indexed more fully under quantum/thermal physics.

---

# MAT-PHYS-053 — Plasma Frequency

For a simple electron plasma:

\[
\omega_p
=
\sqrt{
\frac{n_ee^2}
{\epsilon_0m_e}
}
\]

This is one example of why "frequency of a material" requires identification of the underlying physical mechanism.

---

# MAT-PHYS-054 — Debye Screening

For appropriate plasma/electrolyte approximations, electrostatic influence is screened over a characteristic length.

Exact formulation depends on the system.

---

# MAT-PHYS-055 — Hall Effect

In simplified conductor models:

\[
R_H=\frac{E_y}{J_xB_z}
\]

with carrier interpretation dependent on the material.

---

# MAT-PHYS-056 — Piezoelectric Coupling

Certain non-centrosymmetric materials couple mechanical and electrical variables.

Tensor form is required for general systems.

---

# MAT-PHYS-057 — Magnetostriction

Magnetic ordering may couple to mechanical strain.

No universal scalar coefficient applies to all geometries.

---

# MAT-PHYS-058 — Magnetoresistance

Electrical resistance may depend on magnetic field:

\[
R=R(B,T,\text{orientation},\ldots)
\]

---

# MAT-PHYS-059 — Hysteresis

Some physical responses depend on system history.

Generic:

\[
Y(t)
\neq
F[X(t)]
\]

alone;

past \(X\) values may also be required.

Important in:

- magnetism;
- ferroelectrics;
- shape-memory materials;
- mechanical plasticity.

---

# MAT-PHYS-060 — Scale Dependence

Physical models may change regime as characteristic length, time or energy scale changes.

MAT must therefore retain:

```text
scale
time
energy
```

when relevant.
