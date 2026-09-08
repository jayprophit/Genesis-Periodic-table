# MAT Visual System

## Purpose

The Materials Atlas Table Codex uses a standardized visual system so that scientific records can be compared consistently.

A MAT visual is not decoration.

Where possible, every visual should represent:

- scientific structure;
- measured data;
- calculated data;
- relationships;
- process;
- state;
- uncertainty;
- or clearly labelled conceptual information.

---

# 1. Core Visual Principle

Every primary MAT record should use the same visual sequence.

The master sequence is:

```text
V01  Natural / Material Manifestation
V02  Conventional 2D Scientific Representation
V03  Bonding / Molecular / Lattice Structure
V04  Atomic / Electron Probability Representation
V05  Isotope and Nuclear Variants
V06  Spectral / Frequency Fingerprint
V07  Physical Property Dashboard
V08  Electrical Property Visualization
V09  Magnetic Property and Field Visualization
V10  Thermal Property Visualization
V11  Mechanical / Structural Property Visualization
V12  Phase / Pressure / Environment Visualization
V13  Transformation / Process Diagram
V14  Relationship / Knowledge-Graph Diagram
V15  Scientifically Grounded 3D Model
V16  Data-Extruded 3D Model
V17  Application / Context Visualization
V18  Evidence / Provenance Visualization
```

Not every visual applies to every record.

When a visual is not applicable:

```text
NOT-APPLICABLE
```

must be recorded rather than silently deleting the category.

---

# 2. Visual Classes

Every asset receives one classification.

```text
MEASURED-DATA
DERIVED-DATA
COMPUTATIONAL
SCIENTIFIC-SCHEMATIC
SCIENTIFIC-RECONSTRUCTION
CONCEPTUAL
HISTORICAL
PHOTOGRAPHIC
REFERENCE
```

---

# 3. Scientific Versus Conceptual

Scientific visuals must not be confused with artistic representations.

For example:

A coloured electron cloud may be a probability-density visualization.

It is not a photograph of an electron.

A nucleus represented as coloured spheres is a schematic model.

It is not a literal image of individual nucleons.

A data-extruded MAT model represents numerical metrics.

It is not necessarily the literal physical geometry of the atom or material.

Every conceptual visualization must state this.

---

# 4. Master Record Visual Order

Each record should preferably display visuals in this order.

## V01 — Natural / Material Manifestation

Show the record in an experimentally meaningful physical manifestation.

Examples:

- elemental sample;
- gas discharge;
- liquid state;
- crystal;
- mineral;
- manufactured material;
- plasma where appropriate.

For substances not naturally photographable in isolation, use a properly labelled scientific or laboratory-context visualization.

---

## V02 — Conventional 2D Scientific Representation

May include:

- periodic-table tile;
- atomic number;
- symbol;
- atomic mass;
- electron-shell schematic;
- Lewis representation;
- structural formula.

A Bohr-style shell diagram may be included as a **schematic educational model**, but must not be presented as the literal contemporary quantum description of the atom.

---

## V03 — Bonding / Molecular / Lattice View

Use as applicable:

- molecular structure;
- bond lengths;
- bond angles;
- coordination geometry;
- crystal lattice;
- unit cell;
- space group;
- polymer chain;
- network structure;
- interface.

---

## V04 — Quantum / Atomic Structure

Use scientifically relevant representations such as:

- orbital probability density;
- radial probability;
- energy levels;
- electron configuration;
- density of states;
- band structure.

A literal planetary-orbit depiction must not substitute for the quantum representation.

---

## V05 — Isotope and Nuclear Variants

Show:

- stable isotopes;
- radioactive isotopes;
- proton/neutron counts;
- nuclear spin;
- half-life where relevant;
- decay modes;
- daughter pathways.

The visual should distinguish:

```text
NUCLEAR STATE
```

from:

```text
ELECTRONIC STATE
```

---

## V06 — Spectral / Frequency Fingerprint

There is no universal single "frequency of an element."

MAT therefore separates frequency mechanisms.

Possible visual panels:

```text
Electronic spectrum
IR / vibrational spectrum
Raman spectrum
Rotational spectrum
Hyperfine spectrum
Nuclear transition spectrum
Phonon spectrum
Acoustic resonances
Plasma frequency
Magnetic resonance
```

Only physically applicable mechanisms are shown.

Axes must have explicit units.

---

## V07 — Physical Property Dashboard

Possible metrics:

- density;
- atomic dimensions;
- phase;
- melting point;
- boiling point;
- critical point;
- pressure behaviour;
- refractive index.

Values must state conditions where required.

---

## V08 — Electrical Properties

Possible plots:

- resistivity versus temperature;
- conductivity versus temperature;
- dielectric response versus frequency;
- carrier concentration;
- Hall behaviour;
- bandgap.

---

## V09 — Magnetic Properties

Intrinsic and engineered magnetic states must be separated.

### Intrinsic panel

May show:

- susceptibility;
- permeability;
- magnetic ordering;
- Curie/Néel temperature;
- atomic/electronic moments.

### Engineered panel

May show:

- magnetisation vector;
- domain orientation;
- pole geometry;
- axial magnetisation;
- radial magnetisation;
- diametric magnetisation;
- multipole pattern;
- measured field map;
- field gradient;
- remanence.

An engineered permanent-magnet field configuration must not be presented as an intrinsic atomic property.

---

## V10 — Thermal Properties

Possible visualizations:

- conductivity versus temperature;
- heat capacity;
- thermal expansion;
- thermal diffusivity;
- phase transitions;
- heat-flow pathways.

---

## V11 — Mechanical / Structural Properties

Possible:

- stress-strain curve;
- hardness;
- fracture toughness;
- elastic modulus;
- fatigue;
- creep;
- grain structure;
- defects;
- porosity.

---

## V12 — Phase / Pressure / Environment

Possible:

- phase diagram;
- pressure-temperature diagram;
- composition-phase diagram;
- magnetic-field phase diagram;
- environmental stability region.

---

## V13 — Process / Transformation

Represent:

```text
INPUT STATE
↓
PROCESS
↓
INTERMEDIATE STATE
↓
PROCESS
↓
OUTPUT STATE
```

Every process arrow may contain:

- temperature;
- pressure;
- time;
- atmosphere;
- field;
- energy;
- equipment.

---

## V14 — Relationship Graph

Show connections to:

- isotopes;
- compounds;
- materials;
- processes;
- applications;
- scientists;
- sources.

Relationship type should be labelled on graph edges.

---

## V15 — Scientific 3D Model

May represent:

- molecule;
- unit cell;
- crystal;
- electron probability surface;
- microstructure;
- field geometry.

Model type must be stated.

---

## V16 — Data-Extruded 3D Model

MAT may create a standardized three-dimensional data object whose geometry is driven by selected numerical metrics.

This is a data visualization.

It must be labelled:

```text
MAT DATA-EXTRUDED MODEL
NOT LITERAL PHYSICAL ATOMIC GEOMETRY
```

---

## V17 — Applications

Show evidence-based uses and application contexts.

Applications must distinguish:

```text
DEMONSTRATED
COMMERCIAL
RESEARCH
PROPOSED
HYPOTHETICAL
```

---

## V18 — Evidence and Provenance

Optional visualization showing:

```text
CLAIM
↓
MEASUREMENT
↓
SOURCE
↓
REPLICATION
↓
MAT RECORD
```

Useful for heavily researched or disputed topics.

---

# 5. Visual Metadata

Every visual asset should have metadata:

```yaml
asset_id:
record_id:
visual_class:
visual_slot:
title:
description:
scientific_status:
data_source:
source_ids:
generated_from:
units:
conditions:
software:
software_version:
created:
reviewed:
license:
alt_text:
notes:
```

---

# 6. Accessibility

Every meaningful image must include:

```text
ALT TEXT
```

Charts must not depend solely on colour.

Scientific symbols must also have readable labels.

---

# 7. Resolution

Maintain:

1. source-quality master;
2. web-compatible export where appropriate.

Do not repeatedly recompress the only master copy.

---

# 8. Vector Preference

Prefer vector formats for:

- diagrams;
- plots;
- graphs;
- equations;
- line drawings.

Recommended:

```text
SVG
```

Raster formats are appropriate for:

- photographs;
- rendered scenes;
- microscope imagery.

---

# 9. Scientific Integrity

Never fabricate a measurement to fill an empty graph.

If no data exists:

```text
NOT-MEASURED
```

or:

```text
DATA-NOT-AVAILABLE
```

must remain visible.

---
