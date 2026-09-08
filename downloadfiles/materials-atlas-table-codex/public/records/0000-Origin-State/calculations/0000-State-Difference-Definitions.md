# MAT 0000 State-Difference Definitions

## 1. Scalar Difference

For a property \(q\):

$$
\Delta q_i^{(r)}
=
q_i-q_r
$$

where \(q_r\) is the value associated with the selected reference.

---

## 2. Pairwise Difference

$$
\Delta q_{ij}
=
q_i-q_j
$$

Applicable only when:

* both values describe the same physical quantity;
* units are compatible;
* states are sufficiently defined for the comparison.

---

## 3. Unit Conversion

If:

$$
q_i
$$

and:

$$
q_j
$$

use different compatible units, convert them into one canonical unit before subtraction.

---

## 4. Incompatible Dimensions

The expression:

$$
T-P
$$

has no ordinary physical interpretation simply because MAT stores both temperature and pressure.

Likewise a raw state vector:

$$
[T,P,B,\rho]
$$

must not be treated as a Euclidean vector of directly comparable numbers.

---

## 5. Dimensionless Transformation

Define:

$$
z_q
=
N_q(q)
$$

where \(N_q\) is stored explicitly.

A possible reference-scaled transform is:

$$
z_q
=
\frac{q-q_r}{s_q}
$$

with:

$$
s_q\neq0
$$

and \(s_q\) having the same physical dimension as \(q\).

Then \(z_q\) is dimensionless.

---

## 6. Normalized State

$$
\mathbf z_i
=
[
z_{i1},
z_{i2},
\dots,
z_{in}
]
$$

Only then can a generalized difference such as:

$$
\Delta\mathbf z_{ij}
=
\mathbf z_i-\mathbf z_j
$$

be interpreted consistently within that chosen normalization.

---

## 7. Distance

A generic state distance:

$$
d_{ij}
=
d(\mathbf z_i,\mathbf z_j)
$$

requires a declared metric.

A simple Euclidean metric:

$$
d_{ij}
=
\sqrt{
\sum_k
(z_{ik}-z_{jk})^2
}
$$

must not automatically be assumed scientifically optimal.

Alternative metrics may weight:

* uncertainty;
* covariance;
* scientific relevance;
* property class;
* causal importance.

---

## 8. Weighted Metric

Example:

$$
d_{ij}
=
\sqrt{
\sum_k
w_k
(z_{ik}-z_{jk})^2
}
$$

where:

$$
w_k\ge0
$$

The origin and justification of every \(w_k\) must be documented.

---

## 9. Covariance-Aware Comparison

For correlated variables, a future MAT implementation may use covariance-aware distance measures.

These must preserve the covariance model and data provenance.

---

## 10. Reference Difference Versus Change

Important distinction:

$$
q-q_r
$$

is a difference from a reference.

It does not automatically prove that the reference state physically transformed into the measured state.

A causal/process relationship requires additional evidence.

---

## 11. Time Difference

$$
\Delta t=t-t_0
$$

uses:

```text
MAT:0000:REF:TIME0
```

---

## 12. Process Difference

A processing transition is represented:

$$
X_0
\xrightarrow{P}
X_1
$$

The causal attribution:

```text
P CAUSED X1
```

requires an appropriate experiment/model rather than being inferred merely because \(X_1\) followed \(X_0\).

---

## 13. Causali E Mapping

Causali E may define:

$$
A=\text{intervention}
$$

$$
B=\text{constraints/reference state}
$$

$$
C=\text{candidate resulting state}
$$

but arithmetic expressions such as:

$$
A+B=C
$$

must not be interpreted as ordinary numerical addition unless the variables and operator make that mathematically valid.

Preferred general expression:

$$
C=F(A,B,S,E,t)
$$

---
