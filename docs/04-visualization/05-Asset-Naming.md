# MAT Asset Naming

## Purpose

Asset names in MAT must be stable, searchable, and semantically informative.

---

## 1. Naming Rules

A MAT asset should generally follow:

```text
<record-id>-<descriptor>-<asset-type>-<sequence>.<extension>
```

Example:

```text
0001-Hydrogen-H-FIG-001.png
0001-Hydrogen-H-GRAPH-001.svg
0001-Hydrogen-H-TABLE-001.csv
0001-Hydrogen-H-MODEL-001.glb
```

---

## 2. Asset Type Codes

Recommended codes include:

- FIG = figure or image;
- GRAPH = plot or chart;
- TABLE = structured table;
- MODEL = 3D or computational model;
- DIAGRAM = schematic or process diagram;
- SPECTRUM = spectral dataset;
- MAP = spatial or field map.

---

## 3. Descriptor Rules

The descriptor should be short and descriptive, for example:

- phase-diagram;
- conductivity-curve;
- lattice-structure;
- process-flow;
- uncertainty-band.

Avoid vague names such as `image1` or `newplot`.

---

## 4. Versioning

When a figure or model is revised, the version should be maintained in metadata rather than by changing the scientific identity of the asset unless the asset is conceptually new.

---

## 5. Metadata Traces

The file name should remain readable, but the true record of provenance lives in the asset metadata and the associated MAT record.
