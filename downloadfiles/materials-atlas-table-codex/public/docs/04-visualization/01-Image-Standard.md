# MAT Image Standard

## 1. Image Categories

Primary image categories are:

```text
NATURAL
SCHEMATIC
ATOMIC
QUANTUM
MOLECULAR
CRYSTAL
ISOTOPE
SPECTRAL
PROPERTY
FIELD
PROCESS
APPLICATION
HISTORICAL
REFERENCE
```

---

# 2. Natural-State Image

The natural/material image should show a scientifically plausible manifestation.

Metadata should include:

```yaml
phase:
temperature:
pressure:
purity:
sample_form:
environment:
```

where known.

---

# 3. False Colour

False colour is acceptable when it improves scientific interpretation.

It must be labelled:

```text
FALSE-COLOUR
```

and preferably state what the colour scale represents.

---

# 4. Microscopy

Microscopy images should state:

- technique;
- magnification;
- scale bar;
- sample;
- preparation;
- imaging conditions.

Possible methods include:

```text
OPTICAL
SEM
TEM
AFM
STM
X-RAY
NEUTRON
```

---

# 5. Atomic Images

Claims that an image shows individual atoms should identify the imaging/reconstruction technique.

A rendered atom graphic is:

```text
SCIENTIFIC-SCHEMATIC
```

or:

```text
COMPUTATIONAL
```

not a photograph.

---

# 6. Quantum Probability Images

Electron probability images should identify, where applicable:

- orbital/state;
- quantum numbers;
- probability or density convention;
- isosurface threshold;
- calculation method.

---

# 7. Molecular Images

Specify representation:

```text
BALL-AND-STICK
SPACE-FILLING
WIRE
SURFACE
ELECTRON-DENSITY
ELECTROSTATIC-POTENTIAL
```

---

# 8. Crystal Images

Specify:

- crystal system;
- space group;
- unit-cell dimensions;
- orientation;
- scale;
- atomic occupancy where relevant.

---

# 9. Isotope Visuals

Avoid representing isotope nuclei as though exact nucleon positions are known classical objects.

Use:

```text
NUCLEAR-SCHEMATIC
```

unless a more advanced nuclear-density calculation is being shown.

---

# 10. Field Images

Magnetic and electric field maps should include:

- magnitude;
- direction;
- coordinate system;
- scale;
- boundary conditions;
- measurement or simulation status.

---

# 11. Generated Images

Computer-generated scientific images must state whether they are:

```text
DATA-DRIVEN
MODEL-DRIVEN
SCHEMATIC
CONCEPTUAL
```

---

# 12. Image Placeholder

If an image has not yet been generated, preserve the slot:

```markdown
<!-- MAT-VISUAL: V04 -->
<!-- STATUS: PLACEHOLDER -->
<!-- ASSET-ID: MAT:0001:FIG:V04:001 -->
<!-- DESCRIPTION: Electron probability representation -->
```

This enables automated generation later.

---

# 13. Captions

Each caption should answer:

1. What is shown?
2. Under what conditions?
3. Is it measured, calculated or conceptual?
4. What source/data generated it?

---

# 14. Cropping

Do not crop away:

- axes;
- legends;
- scale bars;
- labels;
- uncertainty;
- scientifically important boundaries.

---

# 15. Image Manipulation

Scientific images must not be altered in a manner that changes the scientific interpretation without disclosure.

---

# 16. Historical Visuals

Historical models may be shown if explicitly labelled.

Example:

```text
HISTORICAL ATOMIC MODEL
NOT MODERN ELECTRON-PROBABILITY DESCRIPTION
```

---

# 17. Standard Aspect Roles

MAT may use:

```text
1:1    record tile / property tile
4:3    scientific diagram
16:9   overview / process
3:4    page illustration
```

Scientific clarity takes priority over rigid aspect ratio.
