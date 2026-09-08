# MAT Mathematics Framework

## Purpose

Mathematics provides the formal language used throughout MAT.

This document identifies major mathematical tools rather than attempting to reproduce the entirety of mathematics.

---

# MAT-MATH-001 — Arithmetic and Algebra

Used for:

- property calculations;
- ratios;
- stoichiometry;
- unit conversions;
- equation manipulation.

General relationship:

\[
y=f(x)
\]

---

# MAT-MATH-002 — Dimensional Analysis

Every physically meaningful equation must respect dimensional compatibility.

For:

\[
A=B+C
\]

the dimensions must satisfy:

\[
[A]=[B]=[C]
\]

when `+` is ordinary addition.

Applications:

- unit checking;
- equation validation;
- scale analysis.

---

# MAT-MATH-003 — Ratios and Proportions

\[
r=\frac{A}{B}
\]

Applications:

- composition;
- isotope ratios;
- density;
- efficiency;
- surface-to-volume ratio.

---

# MAT-MATH-004 — Percentage and Fraction

\[
x_\%=100\frac{x}{x_\text{total}}
\]

Applications:

- composition;
- abundance;
- yield;
- porosity;
- efficiency.

---

# MAT-MATH-005 — Scientific Notation

\[
x=a\times10^n
\]

Important across:

- atomic dimensions;
- astronomical quantities;
- nuclear lifetimes;
- cross-sections;
- concentrations.

---

# MAT-MATH-006 — Logarithms

\[
y=\log_b x
\]

Applications include:

- pH;
- decibels;
- exponential processes;
- Arrhenius relationships;
- orders of magnitude.

---

# MAT-MATH-007 — Exponentials

\[
y=Ae^{kx}
\]

Applications include:

- radioactive decay;
- attenuation;
- relaxation;
- thermal activation;
- population dynamics.

---

# MAT-MATH-008 — Power Laws

\[
y=Ax^n
\]

Applications:

- scaling;
- mechanical behaviour;
- transport;
- critical phenomena.

---

# MAT-MATH-009 — Differential Calculus

\[
\frac{dy}{dx}
\]

Measures local rate of change.

Applications include:

- velocity;
- reaction rates;
- thermal gradients;
- property sensitivity.

---

# MAT-MATH-010 — Integral Calculus

\[
\int_a^b f(x)\,dx
\]

Applications:

- energy;
- work;
- spectral integration;
- probability;
- accumulated dose;
- transport.

---

# MAT-MATH-011 — Ordinary Differential Equations

General form:

\[
\frac{dx}{dt}=F(x,t)
\]

Applications:

- reaction kinetics;
- thermal evolution;
- decay;
- dynamic systems.

---

# MAT-MATH-012 — Partial Differential Equations

General form:

\[
F\left(
x,
t,
u,
\frac{\partial u}{\partial x},
\frac{\partial u}{\partial t},
\dots
\right)=0
\]

Applications:

- heat transfer;
- diffusion;
- electromagnetism;
- fluid flow;
- quantum mechanics.

---

# MAT-MATH-013 — Linear Algebra

Vector:

\[
\mathbf x=
\begin{bmatrix}
x_1\\
x_2\\
\vdots\\
x_n
\end{bmatrix}
\]

Matrix transformation:

\[
\mathbf y=A\mathbf x
\]

Applications:

- quantum mechanics;
- crystallography;
- tensor properties;
- data analysis.

---

# MAT-MATH-014 — Exponential Decay

\[
N(t)=N_0e^{-\lambda t}
\]

and:

\[
t_{1/2}=\frac{\ln 2}{\lambda}
\]

Applications:

- radioactive decay;
- relaxation;
- first-order kinetics.

---

# MAT-MATH-015 — Probability

Discrete:

\[
\sum_iP_i=1
\]

Continuous:

\[
\int p(x)\,dx=1
\]

Applications:

- quantum measurement;
- uncertainty;
- statistical mechanics;
- probabilistic prediction.

---

# MAT-MATH-016 — Conditional Probability

\[
P(A|B)=\frac{P(A\cap B)}{P(B)}
\]

Applications:

- evidence assessment;
- causal inference;
- diagnostic reasoning.

---

# MAT-MATH-017 — Bayes' Theorem

\[
P(A|B)=
\frac{P(B|A)P(A)}
{P(B)}
\]

Applications:

- inverse problems;
- model selection;
- uncertainty updating.

---

# MAT-MATH-018 — Statistics

MAT may use:

- mean;
- median;
- variance;
- standard deviation;
- confidence intervals;
- regression;
- hypothesis tests;
- robust statistics.

Mean:

\[
\bar{x}=\frac{1}{n}\sum_i x_i
\]

---

# MAT-MATH-019 — Weighted Mean

\[
\bar{x}
=
\frac{\sum_i w_ix_i}
{\sum_iw_i}
\]

Useful when measurements have different uncertainty.

---

# MAT-MATH-020 — Error Propagation

For independent variables:

\[
\sigma_f^2
\approx
\sum_i
\left(
\frac{\partial f}{\partial x_i}
\right)^2\sigma_i^2
\]

with covariance terms added where required.

---

# MAT-MATH-021 — Vectors

\[
\mathbf v=(v_x,v_y,v_z)
\]

Applications:

- electric field;
- magnetic field;
- force;
- momentum;
- crystallographic direction.

---

# MAT-MATH-022 — Dot Product

\[
\mathbf A\cdot\mathbf B
=
|\mathbf A||\mathbf B|\cos\theta
\]

Applications:

- work;
- projection;
- crystallographic and electromagnetic calculations.

---

# MAT-MATH-023 — Cross Product

\[
\mathbf A\times\mathbf B
\]

Applications:

- torque;
- magnetic force;
- angular momentum.

---

# MAT-MATH-024 — Tensors

Used for direction-dependent properties such as:

- stress;
- strain;
- conductivity;
- permittivity;
- elasticity.

Example:

\[
\sigma_{ij}=C_{ijkl}\epsilon_{kl}
\]

---

# MAT-MATH-025 — Coordinate Systems

MAT may use:

- Cartesian;
- cylindrical;
- spherical;
- crystallographic coordinates.

Coordinate frame must be stated for vectors/tensors.

---

# MAT-MATH-026 — Geometry

Includes:

- area;
- volume;
- curvature;
- topology;
- shape descriptors.

Important for:

- surface phenomena;
- mechanical properties;
- electromagnetic fields.

---

# MAT-MATH-027 — Surface-to-Volume Ratio

For characteristic scale \(L\):

\[
\frac{A}{V}\propto\frac{1}{L}
\]

for many geometrically similar objects.

Important in nanoscale material behaviour.

---

# MAT-MATH-028 — Fourier Analysis

A signal may be decomposed into frequency components.

Continuous form:

\[
F(\omega)=
\int_{-\infty}^{\infty}
f(t)e^{-i\omega t}\,dt
\]

Applications:

- spectra;
- vibrations;
- signal processing;
- diffraction;
- quantum mechanics.

---

# MAT-MATH-029 — Eigenvalue Problems

\[
A\mathbf v=\lambda\mathbf v
\]

Applications:

- quantum energy states;
- normal modes;
- stability;
- principal material axes.

---

# MAT-MATH-030 — Optimization

General:

\[
\min_x f(x)
\]

subject to constraints:

\[
g_i(x)\le 0
\]

Applications:

- materials design;
- manufacturing;
- composition optimisation.

---

# MAT-MATH-031 — Multi-Objective Optimization

\[
\min
[
f_1(x),
f_2(x),
\dots,
f_n(x)
]
\]

Relevant when balancing:

- strength;
- mass;
- cost;
- toxicity;
- conductivity;
- recyclability.

---

# MAT-MATH-032 — Graph Theory

\[
G=(V,E)
\]

Used for:

- reaction networks;
- material relationships;
- process pathways;
- knowledge graphs.

---

# MAT-MATH-033 — Path Finding

Find a path:

\[
S_0\rightsquigarrow S_f
\]

Applications:

- reaction routes;
- material processing;
- reverse material search.

---

# MAT-MATH-034 — State Spaces

\[
\mathbf S=
(x_1,x_2,\ldots,x_n)
\]

Provides a mathematical basis for representing MAT state variables.

---

# MAT-MATH-035 — Numerical Methods

Used when analytic solutions are unavailable.

Includes:

- root finding;
- interpolation;
- integration;
- differential-equation solvers;
- eigenvalue solvers.

Algorithm, precision and convergence must be recorded.

---

# MAT-MATH-036 — Interpolation

Estimate values between measured points.

Interpolation must be distinguished from extrapolation.

---

# MAT-MATH-037 — Extrapolation

Estimate beyond measured range.

Extrapolated values require explicit warning because uncertainty can increase rapidly.

---

# MAT-MATH-038 — Dimensionality Reduction

Possible future use for:

- visualising high-dimensional MAT state spaces;
- materials clustering.

Methods may include:

- PCA;
- manifold methods;
- learned embeddings.

Derived representations must not replace raw scientific variables.

---

# MAT-MATH-039 — Differential Geometry

May be useful for:

- curved surfaces;
- crystal geometry;
- continuum mechanics;
- general relativistic extensions.

---

# MAT-MATH-040 — Symmetry and Group Theory

Important in:

- crystallography;
- molecular symmetry;
- quantum mechanics;
- particle physics.

Symmetry may restrict physically permitted states and transitions.

---

# MAT-MATH-041 — Complex Numbers

\[
z=a+ib
\]

Used in:

- quantum mechanics;
- wave physics;
- AC circuits;
- impedance;
- Fourier analysis.

---

# MAT-MATH-042 — Complex Exponentials

\[
e^{i\theta}
=
\cos\theta+i\sin\theta
\]

Useful for waves and oscillations.

---

# MAT-MATH-043 — Differential Operators

Gradient:

\[
\nabla f
\]

Divergence:

\[
\nabla\cdot\mathbf F
\]

Curl:

\[
\nabla\times\mathbf F
\]

Laplacian:

\[
\nabla^2 f
\]

Central to field theory, diffusion and quantum mechanics.

---

# MAT-MATH-044 — Optimization Under Uncertainty

Future MAT searches may seek:

\[
x^*
=
\arg\max_x
E[U(x)]
\]

while considering uncertainty and risk.

---

# MAT-MATH-045 — Monte Carlo Methods

Repeated random sampling may estimate:

- uncertainty;
- distributions;
- transport;
- reaction processes;
- optimisation outcomes.

Random seed and sampling scheme should be retained.

---

# MAT-MATH-046 — Information Measures

Entropy-like information measure:

\[
H(X)=
-\sum_xp(x)\log p(x)
\]

This is information-theoretic entropy and must not be casually equated with thermodynamic entropy without defining the mapping.

---

# MAT-MATH-047 — Similarity Metrics

MAT may compare material states using:

\[
d(S_i,S_j)
\]

No universal state-distance metric is assumed.

Metrics must match the scientific purpose.

---

# MAT-MATH-048 — Constraint Satisfaction

Candidate states may be filtered through:

\[
g_i(S)=0
\]

and:

\[
h_j(S)\le0
\]

This provides a formal basis for physical-law filters in MAT.

---

# Principle Expansion

New mathematical methods can be appended without altering existing IDs.

Principle IDs should never be reused for a different mathematical concept.

---
