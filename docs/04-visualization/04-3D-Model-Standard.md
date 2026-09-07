# MAT 3D Model Standard

## Purpose

MAT supports two fundamentally different 3D model families.

They must never be confused.

---

# 1. Scientific 3D Models

Scientific models attempt to represent known physical structure.

Examples:

- molecule;
- crystal lattice;
- unit cell;
- electron probability isosurface;
- reconstructed microstructure;
- measured geometry.

Classification:

```text
SCIENTIFIC-3D
```

---

# 2. Data-Extruded 3D Models

A MAT data-extruded model converts selected numerical metrics into visual geometry.

Classification:

```text
DATA-EXTRUDED-3D
```

It does not claim to show literal physical atomic shape.

---

# 3. Scientific Model Metadata

```yaml
model_id:
record_id:
model_type:
source_structure:
coordinate_system:
scale:
units:
calculation_method:
source_ids:
scientific_status:
```

---

# 4. Atomic / Molecular Models

Possible representation:

- nuclei;
- bond topology;
- electron-density surface;
- molecular surface.

Avoid assigning arbitrary atomic radii without identifying the radius model.

Possible choices include:

- covalent radius;
- van der Waals radius;
- calculated radius.

---

# 5. Crystal Models

Include:

- lattice vectors;
- atomic coordinates;
- occupancy;
- space group;
- supercell dimensions if used.

---

# 6. Probability Models

Probability-density surfaces should state:

- wavefunction/orbital;
- calculation;
- isovalue;
- phase colouring where used.

---

# 7. Magnetic Field Models

3D magnetic visualization may show:

- vector field;
- field lines;
- flux density;
- magnet geometry;
- pole structure.

Specify:

```text
MEASURED
```

or:

```text
SIMULATED
```

---

# 8. Data-Extruded Geometry

A standard MAT data model may encode normalized metrics such as:

```text
radius             atomic/material scale
height             density
segment count      isotope count
surface modulation spectral complexity
axial extrusion    thermal metric
radial extrusion   electrical metric
orientation        magnetic anisotropy
texture            mechanical metric
```

This mapping is illustrative until a final MAT visualization transform is formally locked.

---

# 9. Normalisation

Different physical quantities have incompatible units and scales.

Therefore data extrusion requires normalized inputs:

\[
x'_i=N_i(x_i)
\]

Each normalization function must be recorded.

Possible methods:

```text
MIN-MAX
LOG-SCALE
Z-SCORE
DOMAIN-BOUND
REFERENCE-RATIO
```

---

# 10. Missing Values

Missing metrics must never be encoded as zero unless zero is the actual value.

Instead the model may:

- omit a visual channel;
- use a neutral placeholder;
- flag incomplete data.

---

# 11. Comparison Mode

The greatest value of the data-extruded model is consistency.

The same transform:

\[
G=F(\mathbf x)
\]

should be applied to every comparable record.

This allows visual differences between materials to correspond to actual data differences.

---

# 12. File Formats

Preferred distribution formats may include:

```text
GLB
GLTF
OBJ
STL
PLY
```

Use:

```text
GLB
```

as a strong general-purpose interactive default when appropriate.

STL should not be the only master format because it does not retain rich metadata/material information.

---

# 13. 3D Printing

A scientifically useful interactive model and a printable mesh are different outputs.

Printable versions should be separately identified:

```text
PRINT-MODEL
```

---

# 14. Model IDs

Scientific:

```text
MAT:0001:MODEL:SCI:001
```

Data-extruded:

```text
MAT:0001:MODEL:DATA:001
```

---
